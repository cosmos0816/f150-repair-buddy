import {
  getIssueAreaDefinition,
  getPartDefinition,
  getSymptomDefinition,
  getTruckKnowledgeBase,
  type TruckIssueAreaId,
  type TruckPartId,
  type TruckSymptomId,
} from "@/lib/knowledge";
import { getExternalReferenceAdapters } from "@/lib/references/adapters";
import { CURATED_REFERENCE_ENTRIES } from "@/lib/references/curated-resources";
import { MANUAL_REFERENCE_ENTRIES } from "@/lib/references/manual-sections";
import { MOCK_REFERENCE_ENTRIES } from "@/lib/references/mock-references";
import { resolveSessionLanguage } from "@/lib/session/session-language";
import type { SessionLanguage } from "@/lib/types/session";
import type {
  ReferenceContentKind,
  ReferenceEntry,
  ReferenceLookupProvider,
  ReferenceSearchResult,
  ReferenceSourceDocument,
  RenderedReferenceEntry,
} from "@/lib/references/types";

export * from "@/lib/references/types";
export * from "@/lib/references/adapters";

const REFERENCE_ENTRIES = [
  ...MANUAL_REFERENCE_ENTRIES,
  ...CURATED_REFERENCE_ENTRIES,
  ...MOCK_REFERENCE_ENTRIES,
];

const MANUAL_LIKE_REFERENCE_ENTRIES = REFERENCE_ENTRIES.filter((entry) => {
  return resolveReferenceContentKind(entry) === "owner_manual";
});

const REFERENCE_SOURCE_DOCUMENTS: ReferenceSourceDocument[] = Array.from(
  new Map(
    REFERENCE_ENTRIES.map((entry) => [entry.sourceDocument.id, entry.sourceDocument]),
  ).values(),
);

function normalizeSearchValue(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeQuery(query: string) {
  const normalized = normalizeSearchValue(query);

  if (!normalized) {
    return [];
  }

  return Array.from(
    new Set(normalized.split(" ").filter((token) => token.length >= 2)),
  );
}

function resolveReferenceContentKind(entry: ReferenceEntry): ReferenceContentKind {
  if (entry.contentKind) {
    return entry.contentKind;
  }

  if (entry.sourceKind === "manual_section") {
    return "owner_manual";
  }

  if (entry.sourceKind === "knowledge_entry") {
    return "known_issue";
  }

  return "repair_note";
}

function getReferenceLocalizedValues(entry: ReferenceEntry) {
  return Object.values(entry.localized ?? {}).flatMap((fields) => {
    if (!fields) {
      return [];
    }

    return [
      fields.title,
      fields.summary,
      fields.sectionLabel,
      ...(fields.aliases ?? []),
      ...(fields.excerpts ?? []),
      ...(fields.notes ?? []),
      ...(fields.procedures ?? []),
      ...(fields.safetyWarnings ?? []),
    ].filter((value): value is string => Boolean(value));
  });
}

function getReferenceAliases(entry: ReferenceEntry) {
  return [
    ...(entry.aliases ?? []),
    ...Object.values(entry.localized ?? {}).flatMap((fields) => fields?.aliases ?? []),
  ];
}

function getReferenceRelatedLabels(entry: ReferenceEntry) {
  return [
    ...(entry.issueAreaIds ?? []).map((issueAreaId) => {
      return getIssueAreaDefinition(issueAreaId)?.label ?? issueAreaId;
    }),
    ...(entry.partIds ?? []).map((partId) => {
      return getPartDefinition(partId)?.label ?? partId;
    }),
    ...(entry.symptomIds ?? []).map((symptomId) => {
      return getSymptomDefinition(symptomId)?.label ?? symptomId;
    }),
    ...(entry.systemIds ?? []).map((systemId) => {
      return getTruckKnowledgeBase().systemGroups[systemId]?.label ?? systemId;
    }),
  ];
}

function buildReferenceCorpus(entry: ReferenceEntry) {
  return normalizeSearchValue(
    [
      resolveReferenceContentKind(entry),
      entry.sourceDocument.provider.label,
      entry.sourceDocument.title,
      entry.title,
      entry.summary,
      entry.sectionLabel,
      entry.manualSection?.sectionTitle,
      ...(entry.manualSection?.path ?? []),
      ...(entry.aliases ?? []),
      ...entry.keywords,
      ...entry.tags,
      ...entry.snippets,
      ...(entry.excerpts ?? []),
      ...(entry.notes ?? []),
      ...(entry.procedures ?? []),
      ...(entry.safetyWarnings ?? []),
      ...getReferenceLocalizedValues(entry),
      ...getReferenceRelatedLabels(entry),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function scoreEntry(entry: ReferenceEntry, query: string) {
  const normalizedQuery = normalizeSearchValue(query);
  const tokens = tokenizeQuery(query);

  if (!normalizedQuery || tokens.length === 0) {
    return null;
  }

  const corpus = buildReferenceCorpus(entry);
  const matchedTerms = tokens.filter((token) => corpus.includes(token));
  let score = 0;

  if (normalizeSearchValue(entry.title).includes(normalizedQuery)) {
    score += 8;
  }

  if ((entry.aliases ?? []).some((alias) => normalizeSearchValue(alias).includes(normalizedQuery))) {
    score += 6;
  }

  if (entry.keywords.some((keyword) => normalizeSearchValue(keyword).includes(normalizedQuery))) {
    score += 5;
  }

  if ((entry.issueAreaIds ?? []).some((issueAreaId) => {
    const label = getIssueAreaDefinition(issueAreaId)?.label ?? issueAreaId;

    return normalizeSearchValue(label).includes(normalizedQuery);
  })) {
    score += 4;
  }

  score += matchedTerms.length * 2;

  if (score <= 0) {
    return null;
  }

  return {
    entry,
    matchedTerms,
    score,
  } satisfies ReferenceSearchResult;
}

function sortResults(results: ReferenceSearchResult[]) {
  return [...results].sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }

    return left.entry.title.localeCompare(right.entry.title);
  });
}

function dedupeResults(results: ReferenceSearchResult[]) {
  return results.filter((result, index, array) => {
    return array.findIndex((candidate) => candidate.entry.id === result.entry.id) === index;
  });
}

function resolvePartIds(partName: string) {
  const normalized = normalizeSearchValue(partName);

  if (!normalized) {
    return [] as TruckPartId[];
  }

  return Object.values(getTruckKnowledgeBase().parts)
    .filter((part) => {
      return [part.id, part.label, ...part.aliases].some((value) => {
        const candidate = normalizeSearchValue(value);

        return candidate.includes(normalized) || normalized.includes(candidate);
      });
    })
    .map((part) => part.id);
}

function resolveSymptomIds(symptomName: string) {
  const normalized = normalizeSearchValue(symptomName);

  if (!normalized) {
    return [] as TruckSymptomId[];
  }

  return Object.values(getTruckKnowledgeBase().symptoms)
    .filter((symptom) => {
      return [symptom.id, symptom.label, ...symptom.aliases].some((value) => {
        const candidate = normalizeSearchValue(value);

        return candidate.includes(normalized) || normalized.includes(candidate);
      });
    })
    .map((symptom) => symptom.id);
}

function resolveIssueAreaIds(issueAreaName: string) {
  const normalized = normalizeSearchValue(issueAreaName);

  if (!normalized) {
    return [] as TruckIssueAreaId[];
  }

  return Object.values(getTruckKnowledgeBase().issueAreas)
    .filter((issueArea) => {
      return [issueArea.id, issueArea.label, ...issueArea.aliases].some((value) => {
        const candidate = normalizeSearchValue(value);

        return candidate.includes(normalized) || normalized.includes(candidate);
      });
    })
    .map((issueArea) => issueArea.id);
}

function searchEntries(entries: ReferenceEntry[], query: string) {
  return sortResults(
    entries
      .map((entry) => scoreEntry(entry, query))
      .filter((result): result is ReferenceSearchResult => Boolean(result)),
  );
}

function buildIdMatchedResults<T extends string>(
  entries: ReferenceEntry[],
  matchedIds: T[],
  matchesEntry: (entry: ReferenceEntry, id: T) => boolean,
  resolveLabel: (id: T) => string,
) {
  return entries
    .filter((entry) => {
      return matchedIds.some((matchedId) => matchesEntry(entry, matchedId));
    })
    .map((entry) => {
      const matchedTerms = matchedIds.map((matchedId) => resolveLabel(matchedId));

      return {
        entry,
        matchedTerms,
        score: 10 + matchedTerms.length,
      } satisfies ReferenceSearchResult;
    });
}

function searchByPartName(partName: string) {
  const matchedPartIds = resolvePartIds(partName);
  const partResults = buildIdMatchedResults(
    REFERENCE_ENTRIES,
    matchedPartIds,
    (entry, partId) => entry.partIds?.includes(partId) ?? false,
    (partId) => getPartDefinition(partId)?.label ?? partId,
  );

  return dedupeResults(
    sortResults([
      ...partResults,
      ...searchEntries(REFERENCE_ENTRIES, partName),
    ]),
  );
}

function searchBySymptomName(symptomName: string) {
  const matchedSymptomIds = resolveSymptomIds(symptomName);
  const symptomResults = buildIdMatchedResults(
    REFERENCE_ENTRIES,
    matchedSymptomIds,
    (entry, symptomId) => entry.symptomIds?.includes(symptomId) ?? false,
    (symptomId) => getSymptomDefinition(symptomId)?.label ?? symptomId,
  );

  return dedupeResults(
    sortResults([
      ...symptomResults,
      ...searchEntries(REFERENCE_ENTRIES, symptomName),
    ]),
  );
}

function searchByIssueAreaName(issueAreaName: string) {
  const matchedIssueAreaIds = resolveIssueAreaIds(issueAreaName);
  const issueAreaResults = buildIdMatchedResults(
    REFERENCE_ENTRIES,
    matchedIssueAreaIds,
    (entry, issueAreaId) => entry.issueAreaIds?.includes(issueAreaId) ?? false,
    (issueAreaId) => getIssueAreaDefinition(issueAreaId)?.label ?? issueAreaId,
  );

  return dedupeResults(
    sortResults([
      ...issueAreaResults,
      ...searchEntries(REFERENCE_ENTRIES, issueAreaName),
    ]),
  );
}

function searchByAlias(alias: string) {
  const normalizedAlias = normalizeSearchValue(alias);

  if (!normalizedAlias) {
    return [];
  }

  const aliasResults = REFERENCE_ENTRIES.flatMap((entry) => {
    const matchedAliases = getReferenceAliases(entry).filter((candidate) => {
      const normalizedCandidate = normalizeSearchValue(candidate);

      return (
        Boolean(normalizedCandidate) &&
        (normalizedCandidate.includes(normalizedAlias) ||
          normalizedAlias.includes(normalizedCandidate))
      );
    });

    if (matchedAliases.length === 0) {
      return [];
    }

    return [
      {
        entry,
        matchedTerms: matchedAliases,
        score: 12 + matchedAliases.length,
      } satisfies ReferenceSearchResult,
    ];
  });

  return dedupeResults(
    sortResults([
      ...aliasResults,
      ...searchEntries(REFERENCE_ENTRIES, alias),
    ]),
  );
}

function mergeLocalizedList(baseValues: string[] | undefined, localizedValues: string[] | undefined) {
  return localizedValues ?? baseValues ?? [];
}

export function renderReferenceEntry(
  entry: ReferenceEntry,
  sessionLanguage: SessionLanguage = resolveSessionLanguage(undefined),
): RenderedReferenceEntry {
  const language = resolveSessionLanguage(sessionLanguage);
  const localized = entry.localized?.[language];

  return {
    aliases: mergeLocalizedList(entry.aliases, localized?.aliases),
    contentKind: resolveReferenceContentKind(entry),
    excerpts: mergeLocalizedList(entry.excerpts, localized?.excerpts),
    id: entry.id,
    inspectionTargetIds: entry.inspectionTargetIds ?? [],
    issueAreaIds: entry.issueAreaIds ?? [],
    keywords: [...entry.keywords],
    language,
    notes: mergeLocalizedList(entry.notes, localized?.notes),
    partIds: entry.partIds ?? [],
    procedures: mergeLocalizedList(entry.procedures, localized?.procedures),
    safetyWarnings: mergeLocalizedList(entry.safetyWarnings, localized?.safetyWarnings),
    sectionLabel: localized?.sectionLabel ?? entry.sectionLabel,
    snippets: [...entry.snippets],
    sourceDocument: entry.sourceDocument,
    summary: localized?.summary ?? entry.summary,
    symptomIds: entry.symptomIds ?? [],
    tags: [...entry.tags],
    title: localized?.title ?? entry.title,
  };
}

export function renderReferenceSearchResults(
  results: ReferenceSearchResult[],
  sessionLanguage: SessionLanguage = resolveSessionLanguage(undefined),
) {
  return results.map((result) => {
    return {
      ...result,
      renderedEntry: renderReferenceEntry(result.entry, sessionLanguage),
    };
  });
}

export function lookupReferencesByPart(
  partName: string,
  sessionLanguage: SessionLanguage = resolveSessionLanguage(undefined),
) {
  return searchByPartName(partName).map((result) => {
    return renderReferenceEntry(result.entry, sessionLanguage);
  });
}

export function lookupReferencesBySymptom(
  symptomName: string,
  sessionLanguage: SessionLanguage = resolveSessionLanguage(undefined),
) {
  return searchBySymptomName(symptomName).map((result) => {
    return renderReferenceEntry(result.entry, sessionLanguage);
  });
}

export function lookupReferencesByIssueArea(
  issueAreaName: string,
  sessionLanguage: SessionLanguage = resolveSessionLanguage(undefined),
) {
  return searchByIssueAreaName(issueAreaName).map((result) => {
    return renderReferenceEntry(result.entry, sessionLanguage);
  });
}

export function lookupReferencesByAlias(
  alias: string,
  sessionLanguage: SessionLanguage = resolveSessionLanguage(undefined),
) {
  return searchByAlias(alias).map((result) => {
    return renderReferenceEntry(result.entry, sessionLanguage);
  });
}

class MockReferenceLookupProvider implements ReferenceLookupProvider {
  searchReference(query: string) {
    return searchEntries(REFERENCE_ENTRIES, query);
  }

  searchManualSections(query: string) {
    return searchEntries(MANUAL_LIKE_REFERENCE_ENTRIES, query);
  }

  searchPartHints(partName: string) {
    return searchByPartName(partName);
  }

  searchSymptomHints(symptomName: string) {
    return searchBySymptomName(symptomName);
  }

  searchIssueAreaHints(issueAreaName: string) {
    return searchByIssueAreaName(issueAreaName);
  }

  searchAliasHints(alias: string) {
    return searchByAlias(alias);
  }
}

const referenceLookupProvider = new MockReferenceLookupProvider();

export function getReferenceLookupProvider(): ReferenceLookupProvider {
  return referenceLookupProvider;
}

export function getReferenceEntries() {
  return REFERENCE_ENTRIES;
}

export function getCuratedReferenceEntries() {
  return CURATED_REFERENCE_ENTRIES;
}

export function getManualReferenceEntries() {
  return MANUAL_LIKE_REFERENCE_ENTRIES;
}

export function getReferenceSourceDocuments() {
  return REFERENCE_SOURCE_DOCUMENTS;
}

export function getConfiguredExternalReferenceAdapters() {
  return getExternalReferenceAdapters();
}

export function searchReference(query: string) {
  return referenceLookupProvider.searchReference(query);
}

export function searchManualSections(query: string) {
  return referenceLookupProvider.searchManualSections(query);
}

export function searchPartHints(partName: string) {
  return referenceLookupProvider.searchPartHints(partName);
}

export function searchSymptomHints(symptomName: string) {
  return referenceLookupProvider.searchSymptomHints(symptomName);
}

export function searchIssueAreaHints(issueAreaName: string) {
  return referenceLookupProvider.searchIssueAreaHints(issueAreaName);
}

export function searchAliasHints(alias: string) {
  return referenceLookupProvider.searchAliasHints(alias);
}
