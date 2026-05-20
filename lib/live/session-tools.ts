import type {
  FunctionCall,
  FunctionDeclaration,
  FunctionResponse,
} from "@google/genai";

import {
  getConfidenceNotes,
  getEscalationGuidance,
  getEvidenceCues,
  getInspectionHints,
  getInspectionTargetDefinition,
  getIssueAreas,
  getPartDefinition,
  getPartHealthSummary,
  getSymptomDefinition,
  getSystemGroupDefinition,
  searchKnowledge,
  type TruckKnowledgeLookup,
} from "@/lib/knowledge";
import { APP_CONFIG } from "@/lib/config/app-config";
import { findPartsForIssueClient } from "@/lib/knowledge/issue-parts-map-client";
import { searchPartsCatalogClient } from "@/lib/knowledge/parts-catalog-client";
import type { EngineId, TrimId } from "@/lib/knowledge/vehicles/types";
import { searchTruckRepairCosts } from "@/lib/knowledge/truck/repair-costs";
import { searchTruckReferences } from "@/lib/knowledge/references/lookup";
import { buildMechanicExport } from "@/lib/session/mechanic-export";
import { buildMockRepairResult } from "@/lib/session/mock-diagnosis";
import {
  buildGroundedResultHints,
  collectSessionGroundingEvidence,
  getGroundedReferenceHints,
  identifyLikelyIssueAreaCandidates,
  type GroundedReferenceHint,
} from "@/lib/session/grounded-inspection";
import {
  lookupReferencesByPart,
  lookupReferencesBySymptom,
} from "@/lib/references";
import { buildGuidedInspectionStep } from "@/lib/session/guided-inspection";
import {
  getLocalizedBookmarkTypeLabel,
  translateExactText,
} from "@/lib/session/session-language";
import { buildSessionEvidenceTimeline, getBookmarkTypeLabel } from "@/lib/session/evidence";
import type {
  BookmarkType,
  RepairSessionEvidenceTimelineItem,
  RepairSessionSnapshot,
  SessionLanguage,
} from "@/lib/types/session";

type KnowledgeLookupInput = {
  bookmarkTypes?: BookmarkType[];
  inspectionTargetNames?: string[];
  partNames?: string[];
  symptomNames?: string[];
  systemNames?: string[];
  useCurrentSession?: boolean;
};

type SummarizeSessionEvidenceInput = {
  sessionId?: string;
};

export interface LiveSessionToolRuntimeContext {
  getSessionSnapshot(): RepairSessionSnapshot;
}

const BOOKMARK_TYPE_ENUM = [
  "sound",
  "leak",
  "rust",
  "connector",
  "light",
  "belt_pulley",
  "other",
] as const;

const LOOKUP_PARAMETERS_JSON_SCHEMA = {
  type: "object",
  properties: {
    partNames: {
      type: "array",
      items: { type: "string" },
      description: "Part names or aliases like belt, idler pulley, coil, or connector.",
    },
    symptomNames: {
      type: "array",
      items: { type: "string" },
      description: "Symptoms like chirp, wobble, leak, rust, misfire, or coolant smell.",
    },
    systemNames: {
      type: "array",
      items: { type: "string" },
      description: "System names like accessory drive, ignition, cooling, or lighting.",
    },
    inspectionTargetNames: {
      type: "array",
      items: { type: "string" },
      description: "Inspection target names or aliases.",
    },
    bookmarkTypes: {
      type: "array",
      items: { type: "string", enum: [...BOOKMARK_TYPE_ENUM] },
      description: "Bookmark types already used in the app session.",
    },
    useCurrentSession: {
      type: "boolean",
      description: "When true, include the current live session bookmarks as context.",
    },
  },
  additionalProperties: false,
} as const;

function truncateText(value: string, maxLength = 120) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

function pushIfDefined<T>(target: Set<T>, value: T | undefined) {
  if (value !== undefined) {
    target.add(value);
  }
}

function getSessionLanguageLabel(language: SessionLanguage) {
  return language === "ko" ? "Korean" : "English";
}

function formatGroundedReferenceHint(referenceHint: GroundedReferenceHint) {
  return {
    id: referenceHint.entry.id,
    title: referenceHint.entry.title,
    summary: referenceHint.entry.summary,
    contentKind: referenceHint.entry.contentKind,
    matchedBy: referenceHint.matchedBy,
    score: referenceHint.score,
    sectionLabel: referenceHint.entry.sectionLabel ?? null,
    procedures: referenceHint.entry.procedures.slice(0, 2),
    safetyWarnings: referenceHint.entry.safetyWarnings.slice(0, 1),
    sourceDocument: {
      id: referenceHint.entry.sourceDocument.id,
      title: referenceHint.entry.sourceDocument.title,
      provider: referenceHint.entry.sourceDocument.provider.label,
    },
  };
}

function formatRenderedReferenceEntries<T extends { title: string; summary: string; contentKind: string; procedures: string[]; safetyWarnings: string[]; sectionLabel?: string }>(
  entries: T[],
) {
  return entries.slice(0, 3).map((entry) => ({
    title: entry.title,
    summary: entry.summary,
    contentKind: entry.contentKind,
    sectionLabel: entry.sectionLabel ?? null,
    procedures: entry.procedures.slice(0, 2),
    safetyWarnings: entry.safetyWarnings.slice(0, 1),
  }));
}

function resolveKnowledgeLookupInput(
  input: KnowledgeLookupInput | undefined,
  session: RepairSessionSnapshot,
): TruckKnowledgeLookup {
  const partIds = new Set<NonNullable<TruckKnowledgeLookup["partIds"]>[number]>();
  const symptomIds = new Set<
    NonNullable<TruckKnowledgeLookup["symptomIds"]>[number]
  >();
  const systemIds = new Set<NonNullable<TruckKnowledgeLookup["systemIds"]>[number]>();
  const inspectionTargetIds = new Set<
    NonNullable<TruckKnowledgeLookup["inspectionTargetIds"]>[number]
  >();
  const bookmarkTypes = new Set<
    NonNullable<TruckKnowledgeLookup["bookmarkTypes"]>[number]
  >();

  input?.partNames?.forEach((value) => {
    pushIfDefined(partIds, getPartDefinition(value)?.id);
  });

  input?.symptomNames?.forEach((value) => {
    pushIfDefined(symptomIds, getSymptomDefinition(value)?.id);
  });

  input?.systemNames?.forEach((value) => {
    pushIfDefined(systemIds, getSystemGroupDefinition(value)?.id);
  });

  input?.inspectionTargetNames?.forEach((value) => {
    pushIfDefined(inspectionTargetIds, getInspectionTargetDefinition(value)?.id);
  });

  input?.bookmarkTypes?.forEach((value) => {
    bookmarkTypes.add(value);
  });

  if (input?.useCurrentSession ?? true) {
    session.evidence.bookmarks.forEach((bookmark) => {
      bookmarkTypes.add(bookmark.bookmarkType);
    });
  }

  return {
    partIds: [...partIds],
    symptomIds: [...symptomIds],
    systemIds: [...systemIds],
    inspectionTargetIds: [...inspectionTargetIds],
    bookmarkTypes: [...bookmarkTypes],
  };
}

function formatTimelineItem(
  item: RepairSessionEvidenceTimelineItem,
  language: SessionLanguage,
) {
  if (item.itemType === "capture") {
    return {
      createdAt: item.createdAt,
      itemType: item.itemType,
      captureKind: item.capture.captureKind,
      summary: item.capture.sentToConversation
        ? translateExactText(language, "Captured and sent")
        : translateExactText(language, "Saved from live preview"),
      relatedBookmarkType: item.capture.relatedBookmarkType
        ? getLocalizedBookmarkTypeLabel(item.capture.relatedBookmarkType, language)
        : null,
    };
  }

  if (item.itemType === "bookmark") {
    return {
      createdAt: item.createdAt,
      itemType: item.itemType,
      bookmarkType: item.bookmark.bookmarkType,
      summary: item.bookmark.note?.trim()
        ? truncateText(item.bookmark.note)
        : language === "ko"
          ? `${getLocalizedBookmarkTypeLabel(item.bookmark.bookmarkType, language)} 저장됨`
          : `${getBookmarkTypeLabel(item.bookmark.bookmarkType)} marked.`,
    };
  }

  return {
    createdAt: item.createdAt,
    itemType: item.itemType,
    role: item.message.role,
    summary: truncateText(item.message.text),
  };
}

function summarizeSessionEvidence(
  session: RepairSessionSnapshot,
  input?: SummarizeSessionEvidenceInput,
) {
  const language = session.sessionLanguage;
  const requestedSessionId = input?.sessionId?.trim();
  const recentTimeline = buildSessionEvidenceTimeline(session.evidence)
    .slice(0, 6)
    .map((item) => formatTimelineItem(item, language));
  const nextInspectionTarget = buildGuidedInspectionStep({
    session,
  });
  const groundingEvidence = collectSessionGroundingEvidence(session);
  const groundedHints = buildGroundedResultHints({
    session,
  });

  return {
    sessionId: session.id,
    sessionLanguage: language,
    responseLanguage: getSessionLanguageLabel(language),
    vehicle: `${APP_CONFIG.vehicle.year} ${APP_CONFIG.vehicle.make} ${APP_CONFIG.vehicle.model} ${APP_CONFIG.vehicle.engine}`,
    requestedSessionId: requestedSessionId || null,
    matchedRequestedSession:
      !requestedSessionId || requestedSessionId === session.id,
    counts: {
      captures: session.evidence.captures.length,
      bookmarks: session.evidence.bookmarks.length,
      conversationLines: session.evidence.conversation.length,
      sentVisualContextFrames: session.evidence.captures.filter((capture) => {
        return capture.sentToConversation;
      }).length,
    },
    latestBookmark: session.evidence.bookmarks.at(-1)
      ? {
          createdAt: session.evidence.bookmarks.at(-1)?.createdAt ?? "",
          type: getLocalizedBookmarkTypeLabel(
            session.evidence.bookmarks.at(-1)?.bookmarkType ?? "other",
            language,
          ),
          rawType: session.evidence.bookmarks.at(-1)?.bookmarkType ?? "",
          note: session.evidence.bookmarks.at(-1)?.note ?? null,
        }
      : null,
    nextInspectionTarget: {
      instruction: nextInspectionTarget.instruction,
      targetId: nextInspectionTarget.targetId,
      targetLabel: nextInspectionTarget.targetLabel,
      locationHint: nextInspectionTarget.locationHint,
      reason: nextInspectionTarget.reason,
    },
    groundedIssueAreaCandidates: groundedHints.issueAreaCandidates
      .slice(0, 3)
      .map((candidate) => ({
        issueAreaId: candidate.issueAreaId,
        label: candidate.label,
        confidence: candidate.confidence,
        targetId: candidate.targetId,
        targetLabel: candidate.targetLabel,
        matchedSources: candidate.matchedSources,
        matchedTerms: candidate.matchedTerms,
        reasoningNote: candidate.reasoningNote,
      })),
    groundedReasoningNotes: groundedHints.reasoningNotes,
    groundedReferenceHints: groundedHints.referenceHints
      .slice(0, 2)
      .map((referenceHint) => formatGroundedReferenceHint(referenceHint)),
    groundingEvidence: {
      bookmarkTypes: groundingEvidence.bookmarkTypes,
      issueAreaIds: groundingEvidence.issueAreaIds,
      partIds: groundingEvidence.partIds,
      symptomIds: groundingEvidence.symptomIds,
    },
    recentTimeline,
  };
}

function executeGetNextInspectionTarget(session: RepairSessionSnapshot) {
  const nextInspectionTarget = buildGuidedInspectionStep({
    session,
  });
  const topIssueArea = identifyLikelyIssueAreaCandidates({
    session,
  })[0];
  const groundedReferenceHints = getGroundedReferenceHints({
    session,
    limit: 2,
  });

  return {
    sessionLanguage: session.sessionLanguage,
    responseLanguage: getSessionLanguageLabel(session.sessionLanguage),
    instruction: nextInspectionTarget.instruction,
    targetId: nextInspectionTarget.targetId,
    targetLabel: nextInspectionTarget.targetLabel,
    locationHint: nextInspectionTarget.locationHint,
    reason: nextInspectionTarget.reason,
    source: nextInspectionTarget.source,
    groundedIssueArea: topIssueArea
      ? {
          issueAreaId: topIssueArea.issueAreaId,
          label: topIssueArea.label,
          confidence: topIssueArea.confidence,
          matchedTerms: topIssueArea.matchedTerms,
        }
      : null,
    referenceHints: groundedReferenceHints.map((referenceHint) =>
      formatGroundedReferenceHint(referenceHint),
    ),
  };
}

function executeSearchKnowledge(term: string) {
  const results = searchKnowledge(term).slice(0, 6);

  return {
    vehicle: APP_CONFIG.vehicle.id,
    term,
    matches: results.map((result) => ({
      kind: result.kind,
      id: result.id,
      label: result.label,
      summary: result.summary,
      recommendation: result.recommendation ?? null,
    })),
  };
}

function executeGetPartDefinition(name: string, language: SessionLanguage) {
  const part = getPartDefinition(name);

  if (!part) {
    return {
      found: false,
      query: name,
      matches: searchKnowledge(name).slice(0, 3),
    };
  }

  return {
    found: true,
    query: name,
    part: {
      id: part.id,
      label: part.label,
      aliases: part.aliases,
      system: part.system,
      summary: part.summary,
      inspectionHints: part.inspectionHints,
      warningSigns: part.warningSigns,
      likelyRecommendation: part.likelyRecommendation,
      commonSymptoms: part.commonSymptoms,
      inspectionTargets: part.inspectionTargets,
      issueAreas: getIssueAreas({ partIds: [part.id] }).map((issueArea) => ({
        id: issueArea.id,
        label: issueArea.label,
        summary: issueArea.summary,
        escalationRecommendation: issueArea.escalationRecommendation,
      })),
      confidenceNotes: getConfidenceNotes({ partIds: [part.id] }),
      evidenceCues: getEvidenceCues({ partIds: [part.id] }),
      referenceHints: formatRenderedReferenceEntries(
        lookupReferencesByPart(part.label, language),
      ),
    },
  };
}

function executeGetSymptomDefinition(name: string, language: SessionLanguage) {
  const symptom = getSymptomDefinition(name);

  if (!symptom) {
    return {
      found: false,
      query: name,
      matches: searchKnowledge(name).slice(0, 3),
    };
  }

  return {
    found: true,
    query: name,
    symptom: {
      id: symptom.id,
      label: symptom.label,
      aliases: symptom.aliases,
      systems: symptom.systems,
      summary: symptom.summary,
      inspectionHints: symptom.inspectionHints,
      warningSigns: symptom.warningSigns,
      likelyRecommendation: symptom.likelyRecommendation,
      likelyParts: symptom.likelyParts,
      inspectionTargets: symptom.inspectionTargets,
      capturePrompts: symptom.capturePrompts,
      issueAreas: getIssueAreas({ symptomIds: [symptom.id] }).map((issueArea) => ({
        id: issueArea.id,
        label: issueArea.label,
        summary: issueArea.summary,
        escalationRecommendation: issueArea.escalationRecommendation,
      })),
      confidenceNotes: getConfidenceNotes({ symptomIds: [symptom.id] }),
      evidenceCues: getEvidenceCues({ symptomIds: [symptom.id] }),
      referenceHints: formatRenderedReferenceEntries(
        lookupReferencesBySymptom(symptom.label, language),
      ),
    },
  };
}

function executeGetInspectionHints(
  input: KnowledgeLookupInput | undefined,
  session: RepairSessionSnapshot,
) {
  const lookup = resolveKnowledgeLookupInput(input, session);
  const hints = getInspectionHints(lookup).slice(0, 6);

  return {
    lookup,
    issueAreas: getIssueAreas(lookup).map((issueArea) => ({
      id: issueArea.id,
      label: issueArea.label,
      summary: issueArea.summary,
      escalationRecommendation: issueArea.escalationRecommendation,
    })),
    hints: hints.map((hint) => ({
      id: hint.id,
      label: hint.label,
      summary: hint.summary,
      locationHint: hint.locationHint,
      inspectFor: hint.inspectFor,
      warningSigns: hint.warningSigns,
      likelyRecommendation: hint.likelyRecommendation,
      relatedParts: hint.relatedParts,
      relatedSymptoms: hint.relatedSymptoms,
    })),
    confidenceNotes: getConfidenceNotes(lookup),
    evidenceCues: getEvidenceCues(lookup),
  };
}

function executeGetEscalationGuidance(
  input: KnowledgeLookupInput | undefined,
  session: RepairSessionSnapshot,
) {
  const lookup = resolveKnowledgeLookupInput(input, session);
  const guidance = getEscalationGuidance(lookup).slice(0, 5);

  return {
    lookup,
    issueAreas: getIssueAreas(lookup).map((issueArea) => ({
      id: issueArea.id,
      label: issueArea.label,
      summary: issueArea.summary,
      escalationRecommendation: issueArea.escalationRecommendation,
    })),
    guidance: guidance.map((rule) => ({
      id: rule.id,
      label: rule.label,
      recommendation: rule.recommendation,
      when: rule.when,
      notes: rule.notes,
    })),
    confidenceNotes: getConfidenceNotes(lookup),
  };
}

type ToolExecutor = (
  args: Record<string, unknown> | undefined,
  context: LiveSessionToolRuntimeContext,
) => Record<string, unknown> | Promise<Record<string, unknown>>;

const LIVE_SESSION_TOOL_EXECUTORS: Record<string, ToolExecutor> = {
  // These helpers expose the local F-150 knowledge layer to Gemini without
  // changing the working Live transport/session path.
  searchKnowledge(args) {
    return executeSearchKnowledge(String(args?.term ?? ""));
  },
  getPartDefinition(args, context) {
    return executeGetPartDefinition(
      String(args?.name ?? ""),
      context.getSessionSnapshot().sessionLanguage,
    );
  },
  getSymptomDefinition(args, context) {
    return executeGetSymptomDefinition(
      String(args?.name ?? ""),
      context.getSessionSnapshot().sessionLanguage,
    );
  },
  getInspectionHints(args, context) {
    return executeGetInspectionHints(
      (args ?? undefined) as KnowledgeLookupInput | undefined,
      context.getSessionSnapshot(),
    );
  },
  getEscalationGuidance(args, context) {
    return executeGetEscalationGuidance(
      (args ?? undefined) as KnowledgeLookupInput | undefined,
      context.getSessionSnapshot(),
    );
  },
  summarizeSessionEvidence(args, context) {
    return summarizeSessionEvidence(
      context.getSessionSnapshot(),
      (args ?? undefined) as SummarizeSessionEvidenceInput | undefined,
    );
  },
  getNextInspectionTarget(_args, context) {
    return executeGetNextInspectionTarget(context.getSessionSnapshot());
  },
  getPartHealthSummary(args) {
    const name = String(args?.name ?? "").trim();

    if (!name) {
      return { found: false, query: name, summary: null };
    }

    const summary = getPartHealthSummary(name);

    if (!summary) {
      return {
        found: false,
        query: name,
        matches: searchKnowledge(name).slice(0, 3),
      };
    }

    return { found: true, query: name, summary };
  },
  generateMechanicReport(_args, context) {
    const session = context.getSessionSnapshot();
    const result = buildMockRepairResult(session);
    const report = buildMechanicExport(result, session);

    return {
      generated: true,
      reportText: report.fullText,
      diagnosis: report.diagnosis,
      severity: report.severity,
      recommendation: report.recommendation,
      partCount: report.partNumbers.length,
      torqueSpecCount: report.torqueSpecs.length,
      safetyNoteCount: report.safetyNotes.length,
    };
  },
  lookupMaintenanceSchedule(args) {
    const query = String(args?.query ?? "").trim().toLowerCase();
    const mileage = Number(args?.currentMileage) || 0;

    const scheduleItems = [
      { name: "Engine Oil & Filter", every: 7500, severe: 5000, part: "5W-20 + FL-820-S", note: "Per Oil Life Monitor or 6 months. NEVER use 5W-30." },
      { name: "Tire Rotation", every: 7500, severe: 7500, part: "", note: "" },
      { name: "Engine Air Filter", every: 30000, severe: 15000, part: "Motorcraft FA-1883", note: "Panel type in airbox." },
      { name: "Transmission Fluid & Filter", every: 60000, severe: 30000, part: "MERCON LV + FT-188", note: "NEVER use MERCON V or Dexron. Pan drop: ~7 qt." },
      { name: "Spark Plugs", every: 100000, severe: 60000, part: "Motorcraft SP-515", note: "25 lb-ft with anti-seize. Warm engine, penetrating oil, 1/8-turn technique." },
      { name: "Coolant Flush", every: 100000, severe: 50000, part: "Motorcraft Gold 50/50", note: "NEVER mix with green coolant. Initial: 6yr/100K." },
      { name: "Serpentine Belt", every: 90000, severe: 60000, part: "Motorcraft JK6-992", note: "Inspect every 30K. Auto-tensioner, no manual adjustment." },
      { name: "Rear Differential Fluid", every: 120000, severe: 30000, part: "80W-90 + XL-3 if LS", note: "3.5 pints, cover bolts 33 lb-ft." },
      { name: "Front Differential Fluid (4WD)", every: 120000, severe: 30000, part: "80W-90 or 75W-140", note: "2.25 pints, cover bolts 20 lb-ft." },
      { name: "Transfer Case Fluid (4WD)", every: 120000, severe: 30000, part: "MERCON LV", note: "2.0 pints, plugs 20 lb-ft." },
      { name: "Brake Fluid Flush", every: 60000, severe: 60000, part: "DOT 4 LV", note: "Flush if dark or contaminated." },
      { name: "PCV Valve", every: 90000, severe: 90000, part: "Motorcraft EV-278", note: "Replace if rattle stops or oil consumption increases." },
    ];

    // Filter by query if provided
    let filtered = scheduleItems;
    if (query) {
      filtered = scheduleItems.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.part.toLowerCase().includes(query) ||
        item.note.toLowerCase().includes(query)
      );
      if (filtered.length === 0) filtered = scheduleItems; // show all if no match
    }

    // Calculate what's due based on mileage
    const results = filtered.map(item => {
      const nextDueNormal = mileage > 0 ? Math.ceil(mileage / item.every) * item.every : item.every;
      const milesUntilDue = mileage > 0 ? nextDueNormal - mileage : null;
      const overdue = milesUntilDue !== null && milesUntilDue <= 0;
      return {
        name: item.name,
        normalInterval: `${item.every.toLocaleString()} miles`,
        severeInterval: `${item.severe.toLocaleString()} miles`,
        part: item.part,
        note: item.note,
        ...(mileage > 0 ? {
          nextDueAt: `${nextDueNormal.toLocaleString()} miles`,
          milesUntilDue: overdue ? `OVERDUE by ${Math.abs(milesUntilDue!).toLocaleString()} miles` : `${milesUntilDue!.toLocaleString()} miles`,
          status: overdue ? "OVERDUE" : milesUntilDue! <= item.every * 0.2 ? "DUE_SOON" : "OK",
        } : {}),
      };
    });

    return {
      found: true,
      query: query || "all",
      currentMileage: mileage || "not provided",
      schedule: results,
      severeConditions: [
        "Frequent towing or hauling heavy loads",
        "Extensive idling or low-speed driving",
        "Dusty or off-road conditions",
        "Extreme hot or cold temperatures",
        "Frequent short trips (under 10 miles)",
      ],
    };
  },
  lookupDTCCode(args) {
    const code = String(args?.code ?? "").trim().toUpperCase();

    if (!code) {
      return { found: false, query: code, results: [] };
    }

    const results = searchTruckReferences(code)
      .filter((r) => r.record.sourceType === "repair_note" && r.record.id.startsWith("dtc-"))
      .slice(0, 3);

    if (results.length === 0) {
      // Try broader search
      const broader = searchTruckReferences(code).slice(0, 3);
      return {
        found: broader.length > 0,
        query: code,
        results: broader.map((r) => ({
          title: r.record.title,
          excerpt: r.record.excerpt,
          inspectionHint: r.record.inspectionHint ?? null,
          safetyNote: r.record.safetyNote ?? null,
        })),
      };
    }

    return {
      found: true,
      query: code,
      results: results.map((r) => ({
        title: r.record.title,
        excerpt: r.record.excerpt,
        inspectionHint: r.record.inspectionHint ?? null,
        safetyNote: r.record.safetyNote ?? null,
      })),
    };
  },
  lookupTorqueSpec(args) {
    const query = String(args?.query ?? "").trim();

    if (!query) {
      return { found: false, query, results: [] };
    }

    const results = searchTruckReferences(query)
      .filter((r) => r.record.id.startsWith("torque-spec-") || r.record.id.startsWith("fluid-spec-"))
      .slice(0, 3);

    if (results.length === 0) {
      // Fall back to any reference that mentions torque or spec
      const broader = searchTruckReferences(`${query} torque`).slice(0, 3);
      return {
        found: broader.length > 0,
        query,
        results: broader.map((r) => ({
          title: r.record.title,
          excerpt: r.record.excerpt,
          inspectionHint: r.record.inspectionHint ?? null,
        })),
      };
    }

    return {
      found: true,
      query,
      results: results.map((r) => ({
        title: r.record.title,
        excerpt: r.record.excerpt,
        inspectionHint: r.record.inspectionHint ?? null,
      })),
    };
  },
  async searchReplacementParts(args) {
    const query = String(args?.query ?? "").trim();

    if (!query) {
      return { found: false, query, results: [], repairCosts: [] };
    }

    const [results, repairCosts] = await Promise.all([
      searchPartsCatalogClient(query, 5),
      Promise.resolve(searchTruckRepairCosts(query, 3)),
    ]);

    return {
      found: results.length > 0,
      query,
      repairCosts: repairCosts.map(({ record, summary }) => ({
        repairName: record.repairName,
        summary,
        totalCostRange: record.totalCostRange,
        laborCostRange: record.laborCostRange,
        partsCostRange: record.partsCostRange,
        timeEstimate: record.timeEstimate,
        sourceOptions: record.sourceOptions.slice(0, 3),
      })),
      results: results.map((r) => ({
        part: r.subcategory,
        category: r.category,
        priceRange: r.priceRange,
        topOptions: r.options.slice(0, 4),
        rockautoUrl: r.rockautoUrl,
      })),
    };
  },
  async findPartsForDiagnosis(args) {
    const issueId = String(args?.issueId ?? "").trim();
    const engineIdRaw = String(args?.engineId ?? "").trim();
    const trimIdRaw = String(args?.trimId ?? "").trim();

    if (!issueId) {
      return {
        found: false,
        issueId,
        message: "Missing issueId — pass an issueId from the truck knowledge layer (for example cam_phaser_rattle, spark_plug_ejection_risk, blend_door_actuator_failure).",
        results: [],
      };
    }

    const result = await findPartsForIssueClient(issueId, {
      engineId: engineIdRaw ? (engineIdRaw as EngineId) : undefined,
      trimId: trimIdRaw ? (trimIdRaw as TrimId) : undefined,
      maxResults: 5,
    });

    return {
      found: result.matched,
      issueId: result.issueId,
      issueAreaId: result.issueAreaId,
      categoryHints: result.categoryHints,
      subcategoryHints: result.subcategoryHints,
      searchTermsTried: result.searchTermsTried,
      preferredBrands: result.preferredBrands ?? [],
      verifiedPartNumbers: result.partNumbers ?? [],
      notes: result.notes ?? null,
      results: result.results.map((r) => ({
        part: r.subcategory,
        category: r.category,
        priceRange: r.priceRange,
        topOptions: r.options.slice(0, 4),
        rockautoUrl: r.rockautoUrl,
      })),
    };
  },
};

export const LIVE_SESSION_TOOL_DECLARATIONS: FunctionDeclaration[] = [
  {
    name: "searchKnowledge",
    description:
      "Search the local 2010 Ford F-150 5.4 Triton knowledge base for truck-specific parts, symptoms, inspection targets, and escalation rules.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        term: {
          type: "string",
          description: "Search term such as belt, chirp, coolant smell, rust, or connector.",
        },
      },
      required: ["term"],
      additionalProperties: false,
    },
  },
  {
    name: "getPartDefinition",
    description:
      "Get a truck-specific part definition, inspection hints, warning signs, and likely recommendation for a part name or alias.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Part name or alias like belt, tensioner, coil, spark plug, battery terminal, or light socket.",
        },
      },
      required: ["name"],
      additionalProperties: false,
    },
  },
  {
    name: "getSymptomDefinition",
    description:
      "Get a truck-specific symptom definition, likely parts, inspection hints, and warning signs for a symptom name or alias.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Symptom like chirp, wobble, leak, rust, hyperflash, misfire, or coolant smell.",
        },
      },
      required: ["name"],
      additionalProperties: false,
    },
  },
  {
    name: "getInspectionHints",
    description:
      "Return local inspection targets and practical hints using part names, symptom names, bookmark types, and current session context.",
    parametersJsonSchema: LOOKUP_PARAMETERS_JSON_SCHEMA,
  },
  {
    name: "getEscalationGuidance",
    description:
      "Return local DIY-safe vs inspect-only vs shop-required guidance using truck knowledge and the current session context.",
    parametersJsonSchema: LOOKUP_PARAMETERS_JSON_SCHEMA,
  },
  {
    name: "summarizeSessionEvidence",
    description:
      "Summarize the current live session evidence, including bookmarks, captured frames, conversation, and recent timeline items.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        sessionId: {
          type: "string",
          description: "Optional session id. If omitted, summarize the current live session.",
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: "getNextInspectionTarget",
    description:
      "Return the next specific truck area or part the assistant should ask to see, based on the current session evidence and 2010 Ford F-150 5.4 Triton knowledge.",
    parametersJsonSchema: {
      type: "object",
      additionalProperties: false,
    },
  },
  {
    name: "getPartHealthSummary",
    description:
      "Return a structured 'is this right or wrong' view of a 2010 F-150 5.4 Triton part: what healthy looks/sounds/feels/smells like, what failing looks/sounds/feels/smells like, known failure modes (with severity and DIY-vs-shop), service interval, and factory spec. Call this whenever the user asks 'is this normal', 'is this right', 'what should this look like', 'what does a bad X sound like', 'when should I replace this', or asks about a specific part by name. The response includes a dataCompleteness flag — if a field is missing, do not invent details, ask the user for a clearer view instead.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description:
            "Part name or alias like belt, tensioner, idler pulley, cam phaser, spark plug, coil, exhaust manifold, alternator, battery, coolant hose, or connector.",
        },
      },
      required: ["name"],
      additionalProperties: false,
    },
  },
  {
    name: "generateMechanicReport",
    description:
      "Generate a Korean-formatted repair report that the owner can show to a Korean mechanic. Includes diagnosis, part numbers, torque specs, cost estimates, and safety notes. Call this when the user says they want to send info to the mechanic, needs a report, or says '정비사한테 보여줘' or 'send to mechanic'.",
    parametersJsonSchema: {
      type: "object",
      additionalProperties: false,
    },
  },
  {
    name: "lookupMaintenanceSchedule",
    description:
      "Look up the maintenance schedule for the 2010 F-150 5.4L. Returns service intervals, parts needed, and whether items are overdue based on current mileage. Call this when the user asks about oil change intervals, when to change transmission fluid, what's due at a certain mileage, or any maintenance timing question.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Optional filter — service name like oil, transmission, spark plug, coolant, belt, brake, differential. Leave empty for full schedule.",
        },
        currentMileage: {
          type: "number",
          description: "Current odometer reading to calculate what's due or overdue. Optional but helpful.",
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: "lookupDTCCode",
    description:
      "Look up an OBD-II diagnostic trouble code (DTC) specific to the 2010 F-150 5.4L 3V / 6R80. Returns causes ranked by likelihood for THIS truck, estimated repair cost, and whether the owner can DIY it. Call this when the user mentions a code like P0011, P0300, P0171, or any P/B/C/U code.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "The DTC code to look up, like P0011, P0300, P0171, P2104, U0100, etc.",
        },
      },
      required: ["code"],
      additionalProperties: false,
    },
  },
  {
    name: "lookupTorqueSpec",
    description:
      "Look up torque specifications or fluid specifications for the 2010 F-150 5.4L. Call this when the user asks about torque values (spark plug torque, lug nut torque, caliper bolts), fluid types (oil type, coolant type, transmission fluid), or capacities (oil capacity, coolant capacity).",
    parametersJsonSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "What to look up — part name, fastener, or fluid. Examples: spark plug, lug nut, oil, coolant, transmission fluid, brake caliper, head bolt, exhaust manifold.",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
  },
  {
    name: "searchReplacementParts",
    description:
      "Search the RockAuto parts catalog for replacement parts for the 2010 Ford F-150 5.4L V8. Returns matching parts with brand, part number, price, and a direct RockAuto link. Call this when the user needs to buy a replacement part, asks about price, or when you identify a part that needs replacing.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Part name to search for, like control arm, belt tensioner, spark plug, brake pad, tie rod, sway bar link, alternator, water pump, etc.",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
  },
  {
    name: "findPartsForDiagnosis",
    description:
      "Given a diagnosed issueId (for example cam_phaser_rattle, spark_plug_ejection_risk, exhaust_manifold_tick, blend_door_actuator_failure, iwe_grind, fuel_pump_driver_module_failure, water_pump_internal_leak, alternator_failure, control_arm_failure, brake_caliper_seize, transmission_shudder_6r80) return the matching RockAuto parts — categories, subcategories, search terms, preferred brands, verified part numbers, and concrete catalog hits. Call this when an issue rule fires, a DTC code is identified, or a symptom is confidently diagnosed and the user needs to know exactly what to order. Prefer this over searchReplacementParts when you already know which failure mode is happening.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        issueId: {
          type: "string",
          description:
            "Issue identifier from the truck knowledge layer (see lib/knowledge/issue-parts-map.ts for the full list). Examples: cam_phaser_rattle, spark_plug_ejection_risk, exhaust_manifold_tick, blend_door_actuator_failure, iwe_grind, fuel_pump_driver_module_failure, radiator_failure_orange_coolant, water_pump_internal_leak, alternator_failure, vct_solenoid_tick, timing_chain_stretch_54, ignition_coil_failure, throttle_body_carbon, valve_cover_gasket_leak, pcv_valve_failure_54, hub_bearing_failure, imrc_stuck_butterflies, pats_no_start, epas_steering_failure, turbo_failure_ecoboost, hpfp_failure_ecoboost, boost_loss_charge_pipe, injector_failure_direct, timing_chain_stretch_ecoboost, oil_consumption_pcv, intercooler_condensation, direct_injection_carbon_buildup, control_arm_failure, tie_rod_end_failure, ball_joint_failure, sway_bar_link_failure, shock_strut_failure, brake_caliper_seize, brake_pad_wear, rotor_warp, power_steering_pump_whine, rack_pinion_leak, door_lock_actuator, window_regulator, door_ajar_sensor, thermostat_failure, fan_clutch_failure, transmission_shudder_6r80.",
        },
        engineId: {
          type: "string",
          description:
            "Optional engine identifier (4_6l_2v, 4_6l_3v, 5_4l_3v, 6_2l_boss, 3_7l_tivct, 5_0l_coyote, 3_5l_ecoboost). Layered in via the parts linker to broaden the search.",
        },
        trimId: {
          type: "string",
          description:
            "Optional trim identifier (xl, stx, xlt, fx2, fx4, lariat, king_ranch, platinum, harley_davidson, limited, svt_raptor). Used to add trim-specific catalog hints.",
        },
      },
      required: ["issueId"],
      additionalProperties: false,
    },
  },
];

function createToolErrorResponse(functionCall: FunctionCall, message: string) {
  return {
    id: functionCall.id,
    name: functionCall.name,
    response: {
      error: {
        message,
      },
    },
  } satisfies FunctionResponse;
}

export async function executeLiveSessionToolCalls(
  functionCalls: FunctionCall[],
  context: LiveSessionToolRuntimeContext,
): Promise<FunctionResponse[]> {
  if (process.env.NODE_ENV !== "production") {
    const names = functionCalls.map((c) => c.name ?? "?").join(", ");
    console.info(
      `[ToolCall] count=${functionCalls.length} names=[${names}]`,
    );
  }

  return Promise.all(functionCalls.map(async (functionCall) => {
    const toolName = functionCall.name?.trim();

    if (process.env.NODE_ENV !== "production") {
      console.info(
        `[ToolCall] → ${toolName ?? "?"} args=`,
        functionCall.args ?? {},
      );
    }

    if (!toolName) {
      return createToolErrorResponse(functionCall, "Missing tool name.");
    }

    const executor = LIVE_SESSION_TOOL_EXECUTORS[toolName];

    if (!executor) {
      return createToolErrorResponse(
        functionCall,
        `Unsupported tool: ${toolName}.`,
      );
    }

    try {
      const output = await Promise.resolve(executor(functionCall.args, context));
      return {
        id: functionCall.id,
        name: toolName,
        response: {
          output,
        },
      } satisfies FunctionResponse;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Tool execution failed.";

      return createToolErrorResponse(functionCall, message);
    }
  }));
}
