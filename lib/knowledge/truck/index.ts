import { SUPPORTED_VEHICLE_ID } from "@/lib/config/app-config";
import type {
  TruckKnowledgeBase,
  TruckKnowledgeLookup,
  TruckPartId,
  TruckSymptomId,
  TruckSystemId,
} from "@/lib/knowledge/types";
import { TRUCK_ALIAS_INDEX } from "@/lib/knowledge/truck/aliases";
import { TRUCK_ESCALATION_RULES } from "@/lib/knowledge/truck/escalation-rules";
import { TRUCK_GUIDED_PROMPTS } from "@/lib/knowledge/truck/guided-prompts";
import { TRUCK_INSPECTION_TARGETS } from "@/lib/knowledge/truck/inspection-hints";
import { TRUCK_ISSUE_AREAS, TRUCK_ISSUE_RULES } from "@/lib/knowledge/truck/issue-rules";
import { TRUCK_PARTS } from "@/lib/knowledge/truck/parts";
import { TRUCK_SYMPTOMS } from "@/lib/knowledge/truck/symptoms";
import { TRUCK_SYSTEM_GROUPS } from "@/lib/knowledge/truck/systems";
import type {
  TruckGuidedPromptResult,
  TruckKnowledgeLibrary,
  TruckTranscriptMatch,
  TruckVisibleTargetCandidate,
} from "@/lib/knowledge/truck/types";
import { TRUCK_VISIBLE_TARGETS } from "@/lib/knowledge/truck/visible-targets";
import { resolveSessionLanguage } from "@/lib/session/session-language";
import { getTranscriptEvidenceWeight } from "@/lib/session/transcript-language";
import type { BookmarkType, SessionLanguage } from "@/lib/types/session";

export * from "@/lib/knowledge/truck/types";
export * from "@/lib/knowledge/truck/aliases";
export * from "@/lib/knowledge/truck/systems";
export * from "@/lib/knowledge/truck/parts";
export * from "@/lib/knowledge/truck/symptoms";
export * from "@/lib/knowledge/truck/inspection-hints";
export * from "@/lib/knowledge/truck/escalation-rules";
export * from "@/lib/knowledge/truck/guided-prompts";
export * from "@/lib/knowledge/truck/issue-rules";
export * from "@/lib/knowledge/truck/visible-targets";
export * from "@/lib/knowledge/truck/repair-costs";

const BOOKMARK_ISSUE_AREA_INDEX: Partial<Record<BookmarkType, string[]>> = {
  belt_pulley: ["accessory_drive_belt_path"],
  connector: ["connector_and_harness_fitment"],
  leak: ["coolant_leak_source", "cooling_reservoir_and_hose_seep"],
  light: ["lighting_socket_wiring", "lamp_housing_moisture_or_mount"],
  rust: ["wheel_well_underbody_rust", "underbody_frame_corrosion"],
  sound: ["cam_phaser_tick_context", "accessory_drive_belt_path", "ignition_misfire_path"],
};

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAlias(text: string, aliases: string[]) {
  const normalizedText = normalize(text);

  if (!normalizedText) {
    return [];
  }

  return aliases.filter((alias) => {
    const normalizedAlias = normalize(alias);
    return (
      Boolean(normalizedAlias) &&
      (normalizedText.includes(normalizedAlias) ||
        normalizedAlias.includes(normalizedText))
    );
  });
}

export const F150_2010_54_TRITON_TRUCK_KNOWLEDGE_BASE: TruckKnowledgeBase = {
  vehicleId: SUPPORTED_VEHICLE_ID,
  title: "2010 Ford F-150 5.4 Triton Structured Truck Knowledge",
  systemGroups: TRUCK_SYSTEM_GROUPS,
  issueAreas: TRUCK_ISSUE_AREAS,
  parts: TRUCK_PARTS,
  symptoms: TRUCK_SYMPTOMS,
  inspectionTargets: TRUCK_INSPECTION_TARGETS,
  escalationRules: TRUCK_ESCALATION_RULES,
  relationships: {
    bookmarkTypeLookups: {
      belt_pulley: {
        issueAreaIds: ["accessory_drive_belt_path"],
        systemIds: ["accessory_drive", "charging"],
        partIds: ["belt", "tensioner", "idler_pulley", "alternator_area"],
        symptomIds: ["chirp", "squeal", "wobble"],
        inspectionTargetIds: ["front_accessory_drive_path", "alternator_mount_and_case"],
      },
      connector: {
        issueAreaIds: ["connector_and_harness_fitment"],
        systemIds: ["connectors_harness", "electrical"],
        partIds: ["connector", "ignition_harness"],
        symptomIds: ["corrosion", "misfire"],
        inspectionTargetIds: ["connector_fitment_and_corrosion"],
      },
      leak: {
        issueAreaIds: ["coolant_leak_source", "cooling_reservoir_and_hose_seep", "drivetrain_leak_or_boot", "brake_hose_or_line_concern"],
        systemIds: ["cooling", "brakes", "drivetrain_4wd"],
        partIds: ["coolant_hose", "radiator_hose", "thermostat_housing", "brake_hose", "transfer_case_area", "differential_cover"],
        symptomIds: ["leak", "coolant_smell"],
        inspectionTargetIds: ["fluid_source_path", "coolant_hose_and_crossover", "brake_line_and_hose", "transfer_case_and_driveshaft"],
      },
      rust: {
        issueAreaIds: ["wheel_well_underbody_rust", "underbody_frame_corrosion"],
        systemIds: ["underbody", "body"],
        partIds: ["wheel_well_lip", "frame_section", "brake_line"],
        symptomIds: ["rust"],
        inspectionTargetIds: ["wheel_well_underbody", "frame_rust_and_seam"],
      },
      light: {
        issueAreaIds: ["lighting_socket_wiring", "lamp_housing_moisture_or_mount"],
        systemIds: ["lighting", "body", "electrical"],
        partIds: ["lamp_socket", "light_bulb", "headlight_housing", "taillight_housing", "connector"],
        symptomIds: ["hyperflash"],
        inspectionTargetIds: ["lamp_socket_and_harness", "headlamp_housing_and_mount", "taillamp_housing_and_mount"],
      },
      sound: {
        issueAreaIds: ["cam_phaser_tick_context", "accessory_drive_belt_path", "ignition_misfire_path", "exhaust_manifold_tick"],
        systemIds: ["timing_valvetrain", "accessory_drive", "ignition", "exhaust_emissions"],
        partIds: ["cam_phaser_area", "belt", "tensioner", "coil", "spark_plug", "exhaust_manifold"],
        symptomIds: ["ticking", "chirp", "squeal", "rattle"],
        inspectionTargetIds: ["engine_top_timing_cover", "front_accessory_drive_path", "coil_and_plug_well", "exhaust_manifold_and_heat_shield"],
      },
      other: {},
    },
  },
};

export const TRUCK_KNOWLEDGE_LIBRARY: TruckKnowledgeLibrary = {
  aliases: TRUCK_ALIAS_INDEX,
  escalationRules: TRUCK_ESCALATION_RULES,
  guidedPrompts: TRUCK_GUIDED_PROMPTS,
  inspectionTargets: TRUCK_INSPECTION_TARGETS,
  issueRules: TRUCK_ISSUE_RULES,
  issueAreas: TRUCK_ISSUE_AREAS,
  knowledgeBase: F150_2010_54_TRITON_TRUCK_KNOWLEDGE_BASE,
  parts: TRUCK_PARTS,
  symptoms: TRUCK_SYMPTOMS,
  systems: TRUCK_SYSTEM_GROUPS,
  visibleTargets: TRUCK_VISIBLE_TARGETS,
};

export function getTruckKnowledgeLibrary() {
  return TRUCK_KNOWLEDGE_LIBRARY;
}

export function identifyVisibleTargetCandidates(params: {
  bookmarkTypes?: BookmarkType[];
  recentAssistantText?: string;
  transcriptText?: string;
  sessionLanguage?: SessionLanguage;
}) {
  const language = resolveSessionLanguage(params.sessionLanguage);
  const transcriptWeight = getTranscriptEvidenceWeight(
    language,
    params.transcriptText ?? "",
  );
  const transcriptText = transcriptWeight > 0 ? params.transcriptText ?? "" : "";
  const assistantText = params.recentAssistantText ?? "";
  const bookmarkTypes = params.bookmarkTypes ?? [];

  const candidates = Object.values(TRUCK_VISIBLE_TARGETS).map((target) => {
    const matchedTerms = new Set<string>();
    let score = 0;

    const transcriptMatches = includesAlias(transcriptText, target.aliases);
    if (transcriptMatches.length > 0) {
      score += transcriptWeight * 2 + transcriptMatches.length;
      transcriptMatches.forEach((term) => matchedTerms.add(term));
    }

    const assistantMatches = includesAlias(assistantText, target.aliases);
    if (assistantMatches.length > 0) {
      score += 1;
      assistantMatches.forEach((term) => matchedTerms.add(term));
    }

    bookmarkTypes.forEach((bookmarkType) => {
      if (target.issueAreaIds.some((issueAreaId) => {
        return BOOKMARK_ISSUE_AREA_INDEX[bookmarkType]?.includes(issueAreaId);
      })) {
        score += 2;
        matchedTerms.add(bookmarkType);
      }
    });

    const confidence =
      score >= 6 ? "high" : score >= 3 ? "medium" : "low";

    return {
      id: target.id,
      label: target.label[language],
      confidence,
      identified: target.id !== "unknown" && score >= 3,
      inspectionTargetId: target.inspectionTargetId,
      matchedTerms: [...matchedTerms],
      score,
    } satisfies TruckVisibleTargetCandidate;
  });

  return candidates.sort((left, right) => right.score - left.score);
}

export function matchTranscriptToTruckTerms(
  transcriptText: string,
  sessionLanguage?: SessionLanguage,
): TruckTranscriptMatch {
  const language = resolveSessionLanguage(sessionLanguage);
  const weight = getTranscriptEvidenceWeight(language, transcriptText);

  if (weight <= 0) {
    return {
      issueAreaIds: [],
      matchedTerms: [],
      partIds: [],
      symptomIds: [],
      systemIds: [],
    };
  }

  const matchedTerms = new Set<string>();
  const partIds = new Set<TruckPartId>();
  const symptomIds = new Set<TruckSymptomId>();
  const systemIds = new Set<TruckSystemId>();
  const issueAreaIds = new Set<keyof typeof TRUCK_ISSUE_AREAS>();

  Object.values(TRUCK_PARTS).forEach((part) => {
    includesAlias(transcriptText, [part.id, part.label, ...part.aliases]).forEach((term) => {
      matchedTerms.add(term);
      partIds.add(part.id);
      systemIds.add(part.system);
    });
  });

  Object.values(TRUCK_SYMPTOMS).forEach((symptom) => {
    includesAlias(transcriptText, [symptom.id, symptom.label, ...symptom.aliases]).forEach((term) => {
      matchedTerms.add(term);
      symptomIds.add(symptom.id);
      symptom.systems.forEach((systemId) => systemIds.add(systemId));
    });
  });

  Object.values(TRUCK_ISSUE_AREAS).forEach((issueArea) => {
    includesAlias(transcriptText, [issueArea.id, issueArea.label, ...issueArea.aliases]).forEach((term) => {
      matchedTerms.add(term);
      issueAreaIds.add(issueArea.id);
      issueArea.systems.forEach((systemId) => systemIds.add(systemId));
    });
  });

  return {
    issueAreaIds: [...issueAreaIds],
    matchedTerms: [...matchedTerms],
    partIds: [...partIds],
    symptomIds: [...symptomIds],
    systemIds: [...systemIds],
  };
}

export function matchBookmarkTypesToIssueAreas(bookmarkTypes: BookmarkType[]) {
  return Array.from(
    new Set(
      bookmarkTypes.flatMap((bookmarkType) => BOOKMARK_ISSUE_AREA_INDEX[bookmarkType] ?? []),
    ),
  );
}

export function findRelevantEscalationRules(lookup: TruckKnowledgeLookup = {}) {
  const issueAreaIds = new Set(lookup.issueAreaIds ?? []);
  const partIds = new Set(lookup.partIds ?? []);
  const symptomIds = new Set(lookup.symptomIds ?? []);
  const bookmarkTypes = new Set(lookup.bookmarkTypes ?? []);

  return TRUCK_ESCALATION_RULES.filter((rule) => {
    return (
      rule.partIds?.some((partId) => partIds.has(partId)) ||
      rule.symptomIds?.some((symptomId) => symptomIds.has(symptomId)) ||
      rule.bookmarkTypes?.some((bookmarkType) => bookmarkTypes.has(bookmarkType)) ||
      rule.systemIds?.some((systemId) => (lookup.systemIds ?? []).includes(systemId)) ||
      rule.inspectionTargetIds?.some((targetId) => (lookup.inspectionTargetIds ?? []).includes(targetId)) ||
      rule.notes.some((note) => issueAreaIds.size > 0 && note.length > 0)
    );
  });
}

export function buildGuidedTruckPrompt(params: {
  issueAreaIds?: string[];
  sessionLanguage?: SessionLanguage;
  visibleTargetId?: string;
}) {
  const language = resolveSessionLanguage(params.sessionLanguage);
  const visibleTarget = params.visibleTargetId
    ? TRUCK_VISIBLE_TARGETS[params.visibleTargetId as keyof typeof TRUCK_VISIBLE_TARGETS]
    : undefined;
  const issueAreaId = params.issueAreaIds?.find((id) => id in TRUCK_ISSUE_AREAS);

  const prompt =
    TRUCK_GUIDED_PROMPTS.find((entry) => {
      return (
        entry.language === language &&
        ((visibleTarget && entry.visibleTargetId === visibleTarget.id) ||
          (issueAreaId && entry.issueAreaId === issueAreaId))
      );
    }) ??
    TRUCK_GUIDED_PROMPTS.find((entry) => {
      return entry.language === language && entry.visibleTargetId === "unknown";
    });

  return {
    confidence: visibleTarget ? "medium" : "low",
    issueAreaIds: issueAreaId ? [issueAreaId as keyof typeof TRUCK_ISSUE_AREAS] : [],
    prompt:
      prompt?.prompt ??
      (language === "ko"
        ? "부품을 아직 분명하게 식별하지 못했습니다."
        : "I cannot identify the part clearly yet."),
    targetLabel:
      visibleTarget?.label[language] ??
      (language === "ko" ? "현재 화면 부위" : "Current visible area"),
  } satisfies TruckGuidedPromptResult;
}
