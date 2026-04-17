import { F150_2010_54_TRITON_KNOWLEDGE_BASE } from "@/lib/knowledge/f150-2010-5.4-triton";
import { TRUCK_KNOWLEDGE_LIBRARY } from "@/lib/knowledge/truck";
import { FORUM_KNOWLEDGE_ENTRIES } from "@/lib/knowledge/truck/forum-knowledge";
import {
  getTruckRepairCostRecords,
} from "@/lib/knowledge/truck/repair-costs";
import { getTruckReferenceRecords } from "@/lib/knowledge/references";
import type {
  TruckConfidenceNote,
  TruckEscalationGuidance,
  TruckEvidenceCue,
  TruckIssueAreaDefinition,
  TruckIssueAreaId,
  TruckInspectionTargetDefinition,
  TruckInspectionTargetId,
  TruckKnowledgeBase,
  TruckKnowledgeLookup,
  TruckKnowledgeSearchResult,
  TruckPartId,
  TruckSymptomDefinition,
  TruckSymptomId,
  TruckSystemGroupDefinition,
  TruckSystemId,
} from "@/lib/knowledge/types";
import type { TruckPartRecord } from "@/lib/knowledge/truck";

export * from "@/lib/knowledge/types";
export * from "@/lib/knowledge/truck";
export * from "@/lib/knowledge/references";
export * from "@/lib/knowledge/sound";
export * from "@/lib/knowledge/truck/forum-knowledge";

const ESCALATION_RECOMMENDATION_WEIGHT = {
  SHOP_REQUIRED: 3,
  INSPECT_ONLY: 2,
  DIY_SAFE: 1,
} as const;

type SearchableKnowledgeEntry = {
  aliases: string[];
  id: string;
  label: string;
  summary: string;
};

function normalizeKnowledgeTerm(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesKnowledgeTerm(values: string[], term: string) {
  const normalizedTerm = normalizeKnowledgeTerm(term);

  if (!normalizedTerm) {
    return false;
  }

  return values.some((value) => {
    const normalizedValue = normalizeKnowledgeTerm(value);

    return (
      normalizedValue === normalizedTerm ||
      normalizedValue.includes(normalizedTerm) ||
      normalizedTerm.includes(normalizedValue)
    );
  });
}

function buildSearchScore(entry: SearchableKnowledgeEntry, term: string) {
  const normalizedTerm = normalizeKnowledgeTerm(term);

  if (!normalizedTerm) {
    return 0;
  }

  const normalizedId = normalizeKnowledgeTerm(entry.id);
  const normalizedLabel = normalizeKnowledgeTerm(entry.label);
  const normalizedAliases = entry.aliases.map((alias) => normalizeKnowledgeTerm(alias));
  const normalizedSummary = normalizeKnowledgeTerm(entry.summary);

  let score = 0;

  if (normalizedId === normalizedTerm) {
    score += 10;
  }

  if (normalizedLabel === normalizedTerm) {
    score += 12;
  }

  if (normalizedAliases.includes(normalizedTerm)) {
    score += 9;
  }

  if (normalizedLabel.includes(normalizedTerm)) {
    score += 6;
  }

  if (normalizedAliases.some((alias) => alias.includes(normalizedTerm))) {
    score += 4;
  }

  if (normalizedSummary.includes(normalizedTerm)) {
    score += 2;
  }

  return score;
}

function resolveByAlias<T extends SearchableKnowledgeEntry>(
  items: Record<string, T>,
  value: string,
) {
  const exactMatch = Object.values(items).find((item) => {
    return matchesKnowledgeTerm([item.id, item.label, ...item.aliases], value);
  });

  if (exactMatch) {
    return exactMatch;
  }

  const normalizedValue = normalizeKnowledgeTerm(value);

  if (!normalizedValue) {
    return undefined;
  }

  return Object.values(items)
    .map((item) => ({
      item,
      score: buildSearchScore(item, normalizedValue),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)[0]?.item;
}

function addValuesToSet<T>(target: Set<T>, values: T[] | undefined) {
  values?.forEach((value) => target.add(value));
}

function expandKnowledgeLookup(
  lookup: TruckKnowledgeLookup = {},
): Required<TruckKnowledgeLookup> {
  const issueAreaIds = new Set<TruckIssueAreaId>(lookup.issueAreaIds ?? []);
  const systemIds = new Set<TruckSystemId>(lookup.systemIds ?? []);
  const inspectionTargetIds = new Set<TruckInspectionTargetId>(
    lookup.inspectionTargetIds ?? [],
  );
  const partIds = new Set<TruckPartId>(lookup.partIds ?? []);
  const symptomIds = new Set<TruckSymptomId>(lookup.symptomIds ?? []);
  const bookmarkTypes = new Set(lookup.bookmarkTypes ?? []);

  bookmarkTypes.forEach((bookmarkType) => {
    const bookmarkLookup =
      F150_2010_54_TRITON_KNOWLEDGE_BASE.relationships.bookmarkTypeLookups[
        bookmarkType
      ];

    if (!bookmarkLookup) {
      return;
    }

    addValuesToSet(systemIds, bookmarkLookup.systemIds);
    addValuesToSet(issueAreaIds, bookmarkLookup.issueAreaIds);
    addValuesToSet(inspectionTargetIds, bookmarkLookup.inspectionTargetIds);
    addValuesToSet(partIds, bookmarkLookup.partIds);
    addValuesToSet(symptomIds, bookmarkLookup.symptomIds);
  });

  [...issueAreaIds].forEach((issueAreaId) => {
    const issueArea = F150_2010_54_TRITON_KNOWLEDGE_BASE.issueAreas[issueAreaId];

    if (!issueArea) {
      return;
    }

    addValuesToSet(systemIds, issueArea.systems);
    addValuesToSet(inspectionTargetIds, issueArea.inspectionTargets);
    addValuesToSet(partIds, issueArea.relatedParts);
    addValuesToSet(symptomIds, issueArea.relatedSymptoms);
  });

  [...systemIds].forEach((systemId) => {
    const systemGroup = F150_2010_54_TRITON_KNOWLEDGE_BASE.systemGroups[systemId];

    if (!systemGroup) {
      return;
    }

    addValuesToSet(partIds, systemGroup.partIds);
    addValuesToSet(symptomIds, systemGroup.symptomIds);
    addValuesToSet(inspectionTargetIds, systemGroup.inspectionTargetIds);
  });

  return {
    issueAreaIds: [...issueAreaIds],
    systemIds: [...systemIds],
    inspectionTargetIds: [...inspectionTargetIds],
    partIds: [...partIds],
    symptomIds: [...symptomIds],
    bookmarkTypes: [...bookmarkTypes],
  };
}

function pushInspectionTargetIds(
  ids: Set<TruckInspectionTargetId>,
  targetIds: TruckInspectionTargetId[],
) {
  targetIds.forEach((targetId) => ids.add(targetId));
}

export function getTruckKnowledgeBase(): TruckKnowledgeBase {
  return F150_2010_54_TRITON_KNOWLEDGE_BASE;
}

export function getSystemGroupDefinition(
  systemIdOrName: TruckSystemId | string,
): TruckSystemGroupDefinition | undefined {
  return resolveByAlias(
    F150_2010_54_TRITON_KNOWLEDGE_BASE.systemGroups,
    systemIdOrName,
  );
}

export function getIssueAreaDefinition(
  issueAreaIdOrName: TruckIssueAreaId | string,
): TruckIssueAreaDefinition | undefined {
  return resolveByAlias(
    F150_2010_54_TRITON_KNOWLEDGE_BASE.issueAreas,
    issueAreaIdOrName,
  );
}

export function getPartDefinition(
  partIdOrName: TruckPartId | string,
): TruckPartRecord | undefined {
  return resolveByAlias(TRUCK_KNOWLEDGE_LIBRARY.parts, partIdOrName);
}

/**
 * Returns a structured "is this right or wrong" view of a part for the live
 * assistant. Falls back gracefully when the new Track A fields haven't been
 * populated yet — the bot still gets warningSigns + inspectionHints + a
 * `dataCompleteness` flag so it can be honest about coverage gaps.
 */
export function getPartHealthSummary(partIdOrName: TruckPartId | string) {
  const part = getPartDefinition(partIdOrName);

  if (!part) {
    return undefined;
  }

  const hasHealthyData = Boolean(
    part.healthyAppearance &&
      Object.values(part.healthyAppearance).some((entries) => {
        return Array.isArray(entries) && entries.length > 0;
      }),
  );
  const hasFailingData = Boolean(
    part.failingAppearance &&
      Object.values(part.failingAppearance).some((entries) => {
        return Array.isArray(entries) && entries.length > 0;
      }),
  );
  const failureModeCount = part.failureModes?.length ?? 0;

  return {
    id: part.id,
    label: part.label,
    aliases: part.aliases,
    system: part.system,
    summary: part.summary,
    healthyAppearance: part.healthyAppearance ?? null,
    failingAppearance: part.failingAppearance ?? null,
    failureModes: part.failureModes ?? [],
    knownWeaknesses:
      part.failureModes?.filter((mode) => mode.knownWeakness) ?? [],
    serviceInterval: part.serviceInterval ?? null,
    factorySpec: part.factorySpec ?? null,
    /** Always-available legacy fields the bot can lean on as a fallback. */
    fallback: {
      warningSigns: part.warningSigns,
      inspectionHints: part.inspectionHints,
      likelyRecommendation: part.likelyRecommendation,
    },
    /**
     * Tells the model how much grounded data we actually have. If everything
     * is false, the bot should answer cautiously and ask for more visual
     * evidence instead of inventing detail.
     */
    dataCompleteness: {
      hasHealthyAppearance: hasHealthyData,
      hasFailingAppearance: hasFailingData,
      hasFailureModes: failureModeCount > 0,
      hasServiceInterval: Boolean(part.serviceInterval),
      hasFactorySpec: Boolean(part.factorySpec),
    },
  };
}

export function getSymptomDefinition(
  symptomIdOrName: TruckSymptomId | string,
): TruckSymptomDefinition | undefined {
  return resolveByAlias(
    F150_2010_54_TRITON_KNOWLEDGE_BASE.symptoms,
    symptomIdOrName,
  );
}

export function getInspectionTargetDefinition(
  inspectionTargetIdOrName: TruckInspectionTargetId | string,
): TruckInspectionTargetDefinition | undefined {
  return resolveByAlias(
    F150_2010_54_TRITON_KNOWLEDGE_BASE.inspectionTargets,
    inspectionTargetIdOrName,
  );
}

export function getIssueAreas(
  lookup: TruckKnowledgeLookup = {},
): TruckIssueAreaDefinition[] {
  const expandedLookup = expandKnowledgeLookup(lookup);
  const issueAreaIds = new Set<TruckIssueAreaId>(expandedLookup.issueAreaIds);

  Object.values(F150_2010_54_TRITON_KNOWLEDGE_BASE.issueAreas).forEach(
    (issueArea) => {
      const hasSystemMatch = issueArea.systems.some((systemId) =>
        expandedLookup.systemIds.includes(systemId),
      );
      const hasPartMatch = issueArea.relatedParts.some((partId) =>
        expandedLookup.partIds.includes(partId),
      );
      const hasSymptomMatch = issueArea.relatedSymptoms.some((symptomId) =>
        expandedLookup.symptomIds.includes(symptomId),
      );
      const hasTargetMatch = issueArea.inspectionTargets.some((inspectionTargetId) =>
        expandedLookup.inspectionTargetIds.includes(inspectionTargetId),
      );

      if (hasSystemMatch || hasPartMatch || hasSymptomMatch || hasTargetMatch) {
        issueAreaIds.add(issueArea.id);
      }
    },
  );

  return Array.from(issueAreaIds)
    .map((issueAreaId) => F150_2010_54_TRITON_KNOWLEDGE_BASE.issueAreas[issueAreaId])
    .filter(Boolean);
}

export function getConfidenceNotes(
  lookup: TruckKnowledgeLookup = {},
): TruckConfidenceNote[] {
  const seen = new Set<string>();

  return getIssueAreas(lookup).flatMap((issueArea) =>
    issueArea.confidenceNotes.filter((note) => {
      if (seen.has(note.id)) {
        return false;
      }

      seen.add(note.id);
      return true;
    }),
  );
}

export function getEvidenceCues(
  lookup: TruckKnowledgeLookup = {},
): TruckEvidenceCue[] {
  const seen = new Set<string>();

  return getIssueAreas(lookup).flatMap((issueArea) =>
    issueArea.evidenceCues.filter((cue) => {
      if (seen.has(cue.id)) {
        return false;
      }

      seen.add(cue.id);
      return true;
    }),
  );
}

export function getInspectionHints(
  lookup: TruckKnowledgeLookup = {},
): TruckInspectionTargetDefinition[] {
  const expandedLookup = expandKnowledgeLookup(lookup);
  const targetIds = new Set<TruckInspectionTargetId>(
    expandedLookup.inspectionTargetIds,
  );

  for (const partId of expandedLookup.partIds) {
    const part = getPartDefinition(partId);

    if (part) {
      pushInspectionTargetIds(targetIds, part.inspectionTargets);
    }
  }

  for (const symptomId of expandedLookup.symptomIds) {
    const symptom = getSymptomDefinition(symptomId);

    if (symptom) {
      pushInspectionTargetIds(targetIds, symptom.inspectionTargets);
    }
  }

  for (const systemId of expandedLookup.systemIds) {
    const systemGroup = getSystemGroupDefinition(systemId);

    if (systemGroup) {
      pushInspectionTargetIds(targetIds, systemGroup.inspectionTargetIds);
    }
  }

  return Array.from(targetIds)
    .map((targetId) => {
      return F150_2010_54_TRITON_KNOWLEDGE_BASE.inspectionTargets[targetId];
    })
    .filter(Boolean);
}

function calculateMatchScore(
  rule: TruckEscalationGuidance,
  lookup: Required<TruckKnowledgeLookup>,
) {
  let score = 0;

  for (const systemId of lookup.systemIds) {
    if (rule.systemIds?.includes(systemId)) {
      score += 1;
    }
  }

  for (const partId of lookup.partIds) {
    if (rule.partIds?.includes(partId)) {
      score += 2;
    }
  }

  for (const symptomId of lookup.symptomIds) {
    if (rule.symptomIds?.includes(symptomId)) {
      score += 3;
    }
  }

  for (const inspectionTargetId of lookup.inspectionTargetIds) {
    if (rule.inspectionTargetIds?.includes(inspectionTargetId)) {
      score += 1;
    }
  }

  for (const bookmarkType of lookup.bookmarkTypes) {
    if (rule.bookmarkTypes?.includes(bookmarkType)) {
      score += 2;
    }
  }

  return score;
}

export function getEscalationGuidance(
  lookup: TruckKnowledgeLookup = {},
): TruckEscalationGuidance[] {
  const expandedLookup = expandKnowledgeLookup(lookup);

  return [...F150_2010_54_TRITON_KNOWLEDGE_BASE.escalationRules]
    .map((rule) => ({
      rule,
      score: calculateMatchScore(rule, expandedLookup),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      const recommendationDelta =
        ESCALATION_RECOMMENDATION_WEIGHT[right.rule.recommendation] -
        ESCALATION_RECOMMENDATION_WEIGHT[left.rule.recommendation];

      if (recommendationDelta !== 0) {
        return recommendationDelta;
      }

      return right.score - left.score;
    })
    .map(({ rule }) => rule);
}

export function searchKnowledge(term: string): TruckKnowledgeSearchResult[] {
  const normalizedTerm = normalizeKnowledgeTerm(term);

  if (!normalizedTerm) {
    return [];
  }

  const results: TruckKnowledgeSearchResult[] = [];

  Object.values(F150_2010_54_TRITON_KNOWLEDGE_BASE.systemGroups).forEach(
    (systemGroup) => {
      const score = buildSearchScore(systemGroup, normalizedTerm);

      if (score <= 0) {
        return;
      }

      results.push({
        kind: "system_group",
        id: systemGroup.id,
        label: systemGroup.label,
        summary: systemGroup.summary,
        aliases: systemGroup.aliases,
        score,
      });
    },
  );

  Object.values(F150_2010_54_TRITON_KNOWLEDGE_BASE.issueAreas).forEach(
    (issueArea) => {
      const score = buildSearchScore(issueArea, normalizedTerm);

      if (score <= 0) {
        return;
      }

      results.push({
        kind: "issue_area",
        id: issueArea.id,
        label: issueArea.label,
        summary: issueArea.summary,
        aliases: issueArea.aliases,
        score,
        recommendation: issueArea.escalationRecommendation,
      });
    },
  );

  Object.values(F150_2010_54_TRITON_KNOWLEDGE_BASE.parts).forEach((part) => {
    const score = buildSearchScore(part, normalizedTerm);

    if (score <= 0) {
      return;
    }

    results.push({
      kind: "part",
      id: part.id,
      label: part.label,
      summary: part.summary,
      aliases: part.aliases,
      score,
      recommendation: part.likelyRecommendation,
    });
  });

  Object.values(F150_2010_54_TRITON_KNOWLEDGE_BASE.symptoms).forEach(
    (symptom) => {
      const score = buildSearchScore(symptom, normalizedTerm);

      if (score <= 0) {
        return;
      }

      results.push({
        kind: "symptom",
        id: symptom.id,
        label: symptom.label,
        summary: symptom.summary,
        aliases: symptom.aliases,
        score,
        recommendation: symptom.likelyRecommendation,
      });
    },
  );

  Object.values(F150_2010_54_TRITON_KNOWLEDGE_BASE.inspectionTargets).forEach(
    (inspectionTarget) => {
      const score = buildSearchScore(inspectionTarget, normalizedTerm);

      if (score <= 0) {
        return;
      }

      results.push({
        kind: "inspection_target",
        id: inspectionTarget.id,
        label: inspectionTarget.label,
        summary: inspectionTarget.summary,
        aliases: inspectionTarget.aliases,
        score,
        recommendation: inspectionTarget.likelyRecommendation,
      });
    },
  );

  F150_2010_54_TRITON_KNOWLEDGE_BASE.escalationRules.forEach((rule) => {
    const aliases = [
      ...(rule.systemIds ?? []),
      ...(rule.partIds ?? []),
      ...(rule.symptomIds ?? []),
      ...(rule.bookmarkTypes ?? []),
    ];
    const score = buildSearchScore(
      {
        id: rule.id,
        label: rule.label,
        aliases,
        summary: rule.when,
      },
      normalizedTerm,
    );

    if (score <= 0) {
      return;
    }

    results.push({
      kind: "escalation_rule",
      id: rule.id,
      label: rule.label,
      summary: rule.when,
      aliases,
      score,
      recommendation: rule.recommendation,
    });
  });

  FORUM_KNOWLEDGE_ENTRIES.forEach((entry) => {
    const score = buildSearchScore(
      {
        id: entry.id,
        label: entry.title,
        aliases: [
          entry.source,
          entry.topic,
          ...entry.aliases,
          ...entry.recommendedParts,
        ],
        summary: `${entry.summary} ${entry.consensusFix} ${entry.ownerTips.join(" ")}`,
      },
      normalizedTerm,
    );

    if (score <= 0) {
      return;
    }

    results.push({
      kind: "forum_entry",
      id: entry.id,
      label: entry.title,
      summary: `${entry.summary} ${entry.consensusFix}`,
      aliases: [
        entry.source,
        entry.topic,
        ...entry.aliases,
      ],
      score,
      recommendation: entry.recommendation,
    });
  });

  getTruckReferenceRecords().forEach((record) => {
    const score = buildSearchScore(
      {
        id: record.id,
        label: record.title,
        aliases: [
          record.sourceType,
          record.sourceLabel,
          ...record.aliases,
          ...record.systemTags,
          ...record.issueAreaIds,
          ...record.partTags,
          ...record.symptomTags,
        ],
        summary: [record.excerpt, record.inspectionHint, record.safetyNote]
          .filter(Boolean)
          .join(" "),
      },
      normalizedTerm,
    );

    if (score <= 0) {
      return;
    }

    results.push({
      kind: "reference_record",
      id: record.id,
      label: record.title,
      summary: record.excerpt,
      aliases: record.aliases,
      score,
    });
  });

  getTruckRepairCostRecords().forEach((record) => {
    const summary =
      record.totalCostRange === null
        ? `${record.repairName} cost varies. ${record.frequency}.`
        : `${record.repairName} usually runs $${record.totalCostRange[0]}-$${record.totalCostRange[1]}. ${record.frequency}.`;
    const score = buildSearchScore(
      {
        id: record.id,
        label: record.repairName,
        aliases: [...record.aliases, ...record.partIds, ...record.symptomIds],
        summary,
      },
      normalizedTerm,
    );

    if (score <= 0) {
      return;
    }

    results.push({
      kind: "repair_cost",
      id: record.id,
      label: record.repairName,
      summary,
      aliases: record.aliases,
      score,
    });
  });

  return results.sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }

    return left.label.localeCompare(right.label);
  });
}
