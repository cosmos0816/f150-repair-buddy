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
// ── EcoBoost knowledge ──
import { ECOBOOST_DTC_CODE_REFERENCES } from "@/lib/knowledge/references/ecoboost-dtc-codes";
import { ECOBOOST_FLUID_SPEC_REFERENCES } from "@/lib/knowledge/references/ecoboost-fluid-specs";
import { ECOBOOST_FORUM_REFERENCES } from "@/lib/knowledge/references/ecoboost-forum-knowledge";
import { ECOBOOST_KNOWN_ISSUE_REFERENCES } from "@/lib/knowledge/references/ecoboost-known-issues";
import { ECOBOOST_REPAIR_COST_REFERENCES } from "@/lib/knowledge/references/ecoboost-repair-costs";
import { ECOBOOST_TORQUE_SPEC_REFERENCES } from "@/lib/knowledge/references/ecoboost-torque-specs";
import { ECOBOOST_MAINTENANCE_SCHEDULE_REFERENCES } from "@/lib/knowledge/references/ecoboost-maintenance-schedule";
import { ECOBOOST_TSB_REFERENCES } from "@/lib/knowledge/references/ecoboost-tsbs";
// ── Coyote knowledge ──
import { COYOTE_KNOWN_ISSUE_REFERENCES } from "@/lib/knowledge/references/coyote-known-issues";
import { COYOTE_SPEC_REFERENCES } from "@/lib/knowledge/references/coyote-specs";
// ── Boss 6.2L knowledge ──
import { BOSS_62_REFERENCES } from "@/lib/knowledge/references/boss-62-reference";
// ── General (all-engine) knowledge ──
import { GENERAL_DTC_CODE_REFERENCES } from "@/lib/knowledge/references/general-dtc-codes";
// ── Raptor Gen 2 knowledge ──
import { RAPTOR_GEN2_REFERENCES } from "@/lib/knowledge/references/raptor-gen2-reference";
// ── Korea parts shipping ──
import { KOREA_PARTS_SHIPPING_REFERENCES } from "@/lib/knowledge/references/korea-parts-shipping";
// ── Bed & Cab knowledge ──
import { BED_CAB_REFERENCES } from "@/lib/knowledge/references/bed-cab-reference";
// ── Cross-engine comparative knowledge ──
import { ENGINE_COMPARISON_REFERENCES } from "@/lib/knowledge/references/engine-comparison";
import { MULTI_ENGINE_MAINTENANCE_REFERENCES } from "@/lib/knowledge/references/multi-engine-maintenance";
// ── Parts sourcing ──
import { PARTS_SOURCING_REFERENCES } from "@/lib/knowledge/references/parts-sourcing";
// ── Raptor (additional) ──
import { RAPTOR_MODIFICATIONS_REFERENCES } from "@/lib/knowledge/references/raptor-modifications";
import { RAPTOR_TSB_REFERENCES } from "@/lib/knowledge/references/raptor-tsbs";
// ── Performance / lift / aesthetic ──
import { PERFORMANCE_TUNING_REFERENCES } from "@/lib/knowledge/references/performance-tuning";
import { LIFT_KIT_REFERENCES } from "@/lib/knowledge/references/lift-kits";
import { AESTHETIC_ACCESSORIES_REFERENCES } from "@/lib/knowledge/references/aesthetic-accessories";
// ── Comprehensive NHTSA TSB compilation ──
import { NHTSA_COMPREHENSIVE_TSB_REFERENCES } from "@/lib/knowledge/references/nhtsa-tsbs-comprehensive";
// ── Community research codification ──
import { FORSCAN_PID_REFERENCES } from "@/lib/knowledge/references/forscan-pids";
import { WIRING_ELECTRICAL_REFERENCES } from "@/lib/knowledge/references/wiring-electrical";
import { COMMUNITY_MISDIAGNOSIS_REFERENCES } from "@/lib/knowledge/references/community-misdiagnoses";
// ── Phase 2 expansion ──
import { SVT_RAPTOR_GEN1_REFERENCES } from "@/lib/knowledge/references/svt-raptor-gen1";
import { INTERIOR_PARTS_REFERENCES } from "@/lib/knowledge/references/interior-parts";
import { COLOR_PAINT_CODE_REFERENCES } from "@/lib/knowledge/references/color-paint-codes";
import { WINDOW_STICKER_REFERENCES } from "@/lib/knowledge/vehicles/option-decoder";
// ── Phase 3 expansion: per-engine deep dives + subsystem deep dives ──
import { TRITON_46_2V_REFERENCES } from "@/lib/knowledge/references/triton-46-2v-specs";
import { TRITON_46_3V_REFERENCES } from "@/lib/knowledge/references/triton-46-3v-specs";
import { V6_37_TIVCT_REFERENCES } from "@/lib/knowledge/references/v6-37-tivct-specs";
import { RECALL_CAMPAIGNS_COMPREHENSIVE_REFERENCES } from "@/lib/knowledge/references/recall-campaigns-comprehensive";
import { HVAC_DEEP_REFERENCES } from "@/lib/knowledge/references/hvac-deep";
import { TPMS_KEYFOB_REFERENCES } from "@/lib/knowledge/references/tpms-keyfob";
import { COLD_WEATHER_PREP_REFERENCES } from "@/lib/knowledge/references/cold-weather-prep";
import { BRAKE_SYSTEM_DEEP_REFERENCES } from "@/lib/knowledge/references/brake-system-deep";
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
  // ── EcoBoost ──
  ...ECOBOOST_DTC_CODE_REFERENCES,
  ...ECOBOOST_FLUID_SPEC_REFERENCES,
  ...ECOBOOST_FORUM_REFERENCES,
  ...ECOBOOST_KNOWN_ISSUE_REFERENCES,
  ...ECOBOOST_REPAIR_COST_REFERENCES,
  ...ECOBOOST_TORQUE_SPEC_REFERENCES,
  ...ECOBOOST_MAINTENANCE_SCHEDULE_REFERENCES,
  ...ECOBOOST_TSB_REFERENCES,
  // ── Coyote ──
  ...COYOTE_KNOWN_ISSUE_REFERENCES,
  ...COYOTE_SPEC_REFERENCES,
  // ── Boss 6.2L ──
  ...BOSS_62_REFERENCES,
  // ── General (all-engine) ──
  ...GENERAL_DTC_CODE_REFERENCES,
  // ── Raptor Gen 2 ──
  ...RAPTOR_GEN2_REFERENCES,
  // ── Korea parts shipping ──
  ...KOREA_PARTS_SHIPPING_REFERENCES,
  // ── Bed & Cab ──
  ...BED_CAB_REFERENCES,
  // ── Cross-engine comparative ──
  ...ENGINE_COMPARISON_REFERENCES,
  ...MULTI_ENGINE_MAINTENANCE_REFERENCES,
  // ── Parts sourcing ──
  ...PARTS_SOURCING_REFERENCES,
  // ── Raptor (additional) ──
  ...RAPTOR_MODIFICATIONS_REFERENCES,
  ...RAPTOR_TSB_REFERENCES,
  // ── Performance / lift / aesthetic ──
  ...PERFORMANCE_TUNING_REFERENCES,
  ...LIFT_KIT_REFERENCES,
  ...AESTHETIC_ACCESSORIES_REFERENCES,
  // ── Comprehensive NHTSA TSBs ──
  ...NHTSA_COMPREHENSIVE_TSB_REFERENCES,
  // ── Community research codification ──
  ...FORSCAN_PID_REFERENCES,
  ...WIRING_ELECTRICAL_REFERENCES,
  ...COMMUNITY_MISDIAGNOSIS_REFERENCES,
  // ── Phase 2 expansion ──
  ...SVT_RAPTOR_GEN1_REFERENCES,
  ...INTERIOR_PARTS_REFERENCES,
  ...COLOR_PAINT_CODE_REFERENCES,
  ...WINDOW_STICKER_REFERENCES,
  // ── Phase 3 expansion ──
  ...TRITON_46_2V_REFERENCES,
  ...TRITON_46_3V_REFERENCES,
  ...V6_37_TIVCT_REFERENCES,
  ...RECALL_CAMPAIGNS_COMPREHENSIVE_REFERENCES,
  ...HVAC_DEEP_REFERENCES,
  ...TPMS_KEYFOB_REFERENCES,
  ...COLD_WEATHER_PREP_REFERENCES,
  ...BRAKE_SYSTEM_DEEP_REFERENCES,
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
