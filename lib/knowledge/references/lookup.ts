import { DTC_CODE_REFERENCES } from "@/lib/knowledge/references/dtc-codes";
import { FLUID_SPEC_REFERENCES } from "@/lib/knowledge/references/fluid-specs";
import { FORD_OWNER_GUIDE_REFERENCES } from "@/lib/knowledge/references/ford-owner-guide";
import { FORD_TSB_REFERENCES } from "@/lib/knowledge/references/ford-tsbs";
import { KNOWN_ISSUE_REFERENCES } from "@/lib/knowledge/references/known-issues";
import { MAINTENANCE_SCHEDULE_REFERENCES } from "@/lib/knowledge/references/maintenance-schedule";
import { NHTSA_RECALL_REFERENCES } from "@/lib/knowledge/references/nhtsa-recalls";
import { NHTSA_TSB_SUMMARY_REFERENCES } from "@/lib/knowledge/references/nhtsa-tsb-summaries";
import { REPAIR_COST_REFERENCES } from "@/lib/knowledge/references/repair-costs";
import { REPAIR_NOTE_REFERENCES } from "@/lib/knowledge/references/repair-notes";
import { TORQUE_SPEC_REFERENCES } from "@/lib/knowledge/references/torque-specs";
import type { TruckReferenceRecord, TruckReferenceSearchResult, TruckReferenceSourceType } from "@/lib/knowledge/references/types";

const TRUCK_REFERENCE_RECORDS: TruckReferenceRecord[] = [
  ...FORD_OWNER_GUIDE_REFERENCES,
  ...FORD_TSB_REFERENCES,
  ...NHTSA_TSB_SUMMARY_REFERENCES,
  ...NHTSA_RECALL_REFERENCES,
  ...REPAIR_NOTE_REFERENCES,
  ...REPAIR_COST_REFERENCES,
  ...MAINTENANCE_SCHEDULE_REFERENCES,
  ...KNOWN_ISSUE_REFERENCES,
  ...TORQUE_SPEC_REFERENCES,
  ...FLUID_SPEC_REFERENCES,
  ...DTC_CODE_REFERENCES,
];

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(query: string) {
  const normalized = normalize(query);
  return normalized ? Array.from(new Set(normalized.split(" ").filter(Boolean))) : [];
}

function corpus(record: TruckReferenceRecord) {
  return normalize([
    record.sourceType,
    record.sourceLabel,
    record.title,
    record.excerpt,
    record.inspectionHint,
    record.safetyNote,
    ...record.aliases,
    ...record.systemTags,
    ...record.issueAreaIds,
    ...record.partTags,
    ...record.symptomTags,
  ].filter(Boolean).join(" "));
}

function scoreRecord(record: TruckReferenceRecord, query: string) {
  const normalized = normalize(query);
  const matchedTerms = tokens(query).filter((token) => corpus(record).includes(token));
  let score = matchedTerms.length * 2;

  if (normalize(record.title).includes(normalized)) {
    score += 8;
  }

  if (record.aliases.some((alias) => normalize(alias).includes(normalized))) {
    score += 6;
  }

  return score > 0
    ? {
        record,
        matchedTerms,
        score,
      } satisfies TruckReferenceSearchResult
    : null;
}

function sortResults(results: TruckReferenceSearchResult[]) {
  return [...results].sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }

    return left.record.title.localeCompare(right.record.title);
  });
}

export function getTruckReferenceRecords() {
  return TRUCK_REFERENCE_RECORDS;
}

export function searchTruckReferences(query: string) {
  return sortResults(
    TRUCK_REFERENCE_RECORDS
      .map((record) => scoreRecord(record, query))
      .filter((result): result is TruckReferenceSearchResult => Boolean(result)),
  );
}

export function searchTruckReferencesByPart(partTag: string) {
  return searchTruckReferences(partTag).filter((result) => {
    return result.record.partTags.some((tag) => normalize(tag).includes(normalize(partTag)));
  });
}

export function searchTruckReferencesBySymptom(symptomTag: string) {
  return searchTruckReferences(symptomTag).filter((result) => {
    return result.record.symptomTags.some((tag) => normalize(tag).includes(normalize(symptomTag)));
  });
}

export function searchTruckReferencesByIssueArea(issueAreaTag: string) {
  return searchTruckReferences(issueAreaTag).filter((result) => {
    return result.record.issueAreaIds.some((tag) => normalize(tag).includes(normalize(issueAreaTag)));
  });
}

export function searchTruckReferencesByAlias(alias: string) {
  return searchTruckReferences(alias).filter((result) => {
    return result.record.aliases.some((candidate) => normalize(candidate).includes(normalize(alias)));
  });
}

export function searchTruckReferencesBySourceType(sourceType: TruckReferenceSourceType) {
  return TRUCK_REFERENCE_RECORDS.filter((record) => record.sourceType === sourceType);
}
