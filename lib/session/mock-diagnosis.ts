import { getInspectionHints, type TruckKnowledgeLookup } from "@/lib/knowledge";
import {
  getLocalizedBookmarkTypeLabel,
  translateExactText,
} from "@/lib/session/session-language";
import { buildGroundedResultHints } from "@/lib/session/grounded-inspection";
import { isTranscriptStrongForGrounding } from "@/lib/session/transcript-language";
import {
  buildEvidenceFusionContext,
  buildNormalizedGroundedRepairResult,
  type EvidenceFusionContext,
} from "@/lib/session/evidence-fusion";
import type {
  MockDiagnosisRuleId,
  RepairResult,
  ResultEvidenceItem,
} from "@/lib/types/result";
import type {
  BookmarkSessionEvent,
  BookmarkType,
  RepairSessionSnapshot,
  SessionConversationMessage,
} from "@/lib/types/session";

type DiagnosisSignal = Exclude<BookmarkType, "other">;

type DiagnosisContext = {
  activeSignals: Set<DiagnosisSignal>;
  bookmarkSignals: Set<DiagnosisSignal>;
  captureCount: number;
  fusion: EvidenceFusionContext;
  latestUserConversation?: SessionConversationMessage;
  conversationSignals: Set<DiagnosisSignal>;
  session: RepairSessionSnapshot;
};

type MockDiagnosisDraft = Omit<RepairResult, "confidence"> & {
  confidence?: RepairResult["confidence"];
};

const SIGNAL_KEYWORDS: Record<DiagnosisSignal, string[]> = {
  belt_pulley: [
    "belt",
    "pulley",
    "idler",
    "tensioner",
    "alternator",
    "wobble",
    "tracking",
    "squeal",
  ],
  connector: ["connector", "plug", "tab", "corrosion", "fitment"],
  leak: ["leak", "drip", "fluid", "coolant", "wet trail"],
  light: ["light", "bulb", "socket", "flash", "hyperflash", "turn signal"],
  rust: ["rust", "flaking", "underbody", "wheel well", "corrosion"],
  sound: ["sound", "noise", "chirp", "ticking", "tick", "rattle", "squeak"],
};

const SIGNAL_LOOKUPS: Partial<Record<DiagnosisSignal, TruckKnowledgeLookup>> = {
  belt_pulley: {
    partIds: ["belt", "tensioner", "idler_pulley", "alternator_area"],
    symptomIds: ["chirp", "wobble"],
  },
  connector: {
    partIds: ["connector"],
  },
  leak: {
    symptomIds: ["leak"],
  },
  light: {
    inspectionTargetIds: ["lamp_socket_and_harness"],
  },
  rust: {
    symptomIds: ["rust"],
  },
  sound: {
    inspectionTargetIds: ["front_accessory_drive_path"],
  },
};

function isDiagnosisSignal(bookmarkType: BookmarkType): bookmarkType is DiagnosisSignal {
  return bookmarkType !== "other";
}

function findBookmarksByType(
  session: RepairSessionSnapshot,
  bookmarkType: BookmarkType,
) {
  return session.evidence.bookmarks.filter(
    (bookmark) => bookmark.bookmarkType === bookmarkType,
  );
}

function getLatestBookmark(
  session: RepairSessionSnapshot,
  bookmarkType: BookmarkType,
) {
  return [...findBookmarksByType(session, bookmarkType)].sort((left, right) => {
    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  })[0];
}

function getLatestUserConversation(session: RepairSessionSnapshot) {
  for (
    let index = session.evidence.conversation.length - 1;
    index >= 0;
    index -= 1
  ) {
    const message = session.evidence.conversation[index];

    if (message?.role === "user") {
      return message;
    }
  }

  return undefined;
}

function buildBookmarkEvidenceItem(
  bookmark: BookmarkSessionEvent,
  session: RepairSessionSnapshot,
): ResultEvidenceItem {
  return {
    kind: "bookmark",
    label: getLocalizedBookmarkTypeLabel(
      bookmark.bookmarkType,
      session.sessionLanguage,
    ),
    detail: bookmark.note?.trim() || undefined,
  };
}

function buildCaptureEvidenceItem(
  session: RepairSessionSnapshot,
): ResultEvidenceItem | null {
  const captureCount = session.evidence.captures.length;
  const language = session.sessionLanguage;

  if (captureCount <= 0) {
    return null;
  }

  return {
    kind: "capture",
    label:
      language === "ko"
        ? `${captureCount}개 저장 프레임`
        : `${captureCount} saved frame${captureCount === 1 ? "" : "s"}`,
    detail:
      language === "ko"
        ? captureCount > 1
          ? "실시간 화면에서 여러 장을 저장했습니다."
          : "실시간 화면에서 한 장을 저장했습니다."
        : captureCount > 1
          ? "Multiple stills from the live preview."
          : "Single still from the live preview.",
  };
}

function buildConversationEvidenceItem(
  message: SessionConversationMessage | undefined,
  session: RepairSessionSnapshot,
): ResultEvidenceItem | null {
  if (!message) {
    return null;
  }

  return {
    kind: "conversation",
    label: session.sessionLanguage === "ko" ? "사용자 메모" : "User note",
    detail: message.text,
  };
}

function buildConversationText(session: RepairSessionSnapshot) {
  return session.evidence.conversation
    .filter((message) => {
      return (
        message.role === "user" &&
        isTranscriptStrongForGrounding(session.sessionLanguage, message.text)
      );
    })
    .map((message) => message.text.trim().toLowerCase())
    .join(" ");
}

function inferConversationSignals(
  session: RepairSessionSnapshot,
  fusion: EvidenceFusionContext,
): Set<DiagnosisSignal> {
  const text = buildConversationText(session);
  const signals = new Set<DiagnosisSignal>();
  const hasVisualEvidence = session.evidence.captures.length > 0;

  if (!text) {
    return signals;
  }

  if (SIGNAL_KEYWORDS.sound.some((keyword) => text.includes(keyword))) {
    signals.add("sound");
  }

  if (
    hasVisualEvidence &&
    SIGNAL_KEYWORDS.belt_pulley.some((keyword) => text.includes(keyword))
  ) {
    signals.add("belt_pulley");
  }

  if (hasVisualEvidence && SIGNAL_KEYWORDS.leak.some((keyword) => text.includes(keyword))) {
    signals.add("leak");
  }

  if (hasVisualEvidence && SIGNAL_KEYWORDS.rust.some((keyword) => text.includes(keyword))) {
    signals.add("rust");
  }

  if (hasVisualEvidence && SIGNAL_KEYWORDS.light.some((keyword) => text.includes(keyword))) {
    signals.add("light");
  }

  if (
    hasVisualEvidence &&
    SIGNAL_KEYWORDS.connector.some((keyword) => text.includes(keyword))
  ) {
    signals.add("connector");
  }

  if (
    fusion.matchedIssueAreaIds.includes("accessory_drive_belt_path") ||
    fusion.matchedPartIds.some((partId) =>
      ["belt", "tensioner", "idler_pulley", "alternator_area"].includes(partId),
    )
  ) {
    signals.add("belt_pulley");
  }

  if (
    fusion.matchedIssueAreaIds.includes("coolant_leak_source") ||
    fusion.matchedSymptomIds.some((symptomId) =>
      ["leak", "coolant_smell"].includes(symptomId),
    )
  ) {
    signals.add("leak");
  }

  if (fusion.matchedIssueAreaIds.includes("connector_and_harness_fitment")) {
    signals.add("connector");
  }

  if (fusion.matchedIssueAreaIds.includes("lighting_socket_wiring")) {
    signals.add("light");
  }

  if (fusion.matchedIssueAreaIds.includes("wheel_well_underbody_rust")) {
    signals.add("rust");
  }

  if (
    fusion.matchedIssueAreaIds.includes("ignition_misfire_path") ||
    fusion.matchedIssueAreaIds.includes("cam_phaser_tick_context") ||
    fusion.repeatedTranscriptKeywords.some((keyword) =>
      ["chirp", "squeal", "tick", "ticking", "벨트", "풀리", "코일", "실화"].includes(keyword),
    )
  ) {
    signals.add("sound");
  }

  return signals;
}

function buildDiagnosisContext(session: RepairSessionSnapshot): DiagnosisContext {
  const fusion = buildEvidenceFusionContext(session);
  const bookmarkSignals = new Set<DiagnosisSignal>(
    session.evidence.bookmarks
      .map((bookmark) => bookmark.bookmarkType)
      .filter(isDiagnosisSignal),
  );
  const conversationSignals = inferConversationSignals(session, fusion);
  const activeSignals = new Set<DiagnosisSignal>([
    ...bookmarkSignals,
    ...conversationSignals,
  ]);

  return {
    activeSignals,
    bookmarkSignals,
    captureCount: session.evidence.captures.length,
    fusion,
    latestUserConversation: getLatestUserConversation(session),
    conversationSignals,
    session,
  };
}

function hasSignal(context: DiagnosisContext, signal: DiagnosisSignal) {
  return context.activeSignals.has(signal);
}

function buildConfidence(context: DiagnosisContext): RepairResult["confidence"] {
  const groundedConfidence = context.fusion.groundedIssueAreaCandidates[0]?.confidence;

  if (groundedConfidence === "high") {
    return "high";
  }

  if (
    context.activeSignals.size >= 2 ||
    (context.activeSignals.size >= 1 && context.captureCount >= 1) ||
    context.captureCount >= 3
  ) {
    return "high";
  }

  if (groundedConfidence === "medium") {
    return "medium";
  }

  if (
    context.activeSignals.size >= 1 ||
    context.captureCount >= 1 ||
    context.latestUserConversation
  ) {
    return "medium";
  }

  return "low";
}

function finalizeDraft(
  context: DiagnosisContext,
  draft: MockDiagnosisDraft,
): RepairResult {
  return {
    ...draft,
    confidence: draft.confidence ?? buildConfidence(context),
  };
}

function dedupeEvidenceItems(items: ResultEvidenceItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = `${item.kind}:${item.label}:${item.detail ?? ""}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function buildSupportingEvidence(params: {
  context: DiagnosisContext;
  includeCapture?: boolean;
  includeConversation?: boolean;
  bookmarkTypes?: BookmarkType[];
}) {
  const items: ResultEvidenceItem[] = [];
  const session = params.context.session;

  for (const bookmarkType of params.bookmarkTypes ?? []) {
    const bookmark = getLatestBookmark(params.context.session, bookmarkType);

    if (bookmark) {
      items.push(buildBookmarkEvidenceItem(bookmark, session));
    }
  }

  if (params.includeCapture) {
    const captureItem = buildCaptureEvidenceItem(session);

    if (captureItem) {
      items.push(captureItem);
    }
  }

  if (params.includeConversation) {
    const conversationItem = buildConversationEvidenceItem(
      params.context.latestUserConversation,
      session,
    );

    if (conversationItem) {
      items.push(conversationItem);
    }
  }

  return dedupeEvidenceItems(items);
}

function mergeKnowledgeLookups(lookups: TruckKnowledgeLookup[]) {
  const inspectionTargetIds = new Set<NonNullable<TruckKnowledgeLookup["inspectionTargetIds"]>[number]>();
  const partIds = new Set<NonNullable<TruckKnowledgeLookup["partIds"]>[number]>();
  const symptomIds = new Set<NonNullable<TruckKnowledgeLookup["symptomIds"]>[number]>();

  lookups.forEach((lookup) => {
    lookup.inspectionTargetIds?.forEach((value) => inspectionTargetIds.add(value));
    lookup.partIds?.forEach((value) => partIds.add(value));
    lookup.symptomIds?.forEach((value) => symptomIds.add(value));
  });

  return {
    inspectionTargetIds:
      inspectionTargetIds.size > 0 ? [...inspectionTargetIds] : undefined,
    partIds: partIds.size > 0 ? [...partIds] : undefined,
    symptomIds: symptomIds.size > 0 ? [...symptomIds] : undefined,
  } satisfies TruckKnowledgeLookup;
}

function buildInspectNext(
  lookup: TruckKnowledgeLookup,
  fallback: string[],
  limit = 3,
) {
  const items = Array.from(
    new Set(getInspectionHints(lookup).flatMap((hint) => hint.inspectFor)),
  ).slice(0, limit);

  if (items.length > 0) {
    return items;
  }

  return fallback;
}

function buildRuleLookup(signals: DiagnosisSignal[]) {
  return mergeKnowledgeLookups(
    signals
      .map((signal) => SIGNAL_LOOKUPS[signal])
      .filter((lookup): lookup is TruckKnowledgeLookup => Boolean(lookup)),
  );
}

function matchMockDiagnosisRule(context: DiagnosisContext): MockDiagnosisRuleId {
  const riskSignalCount = context.activeSignals.size;
  const hasLeak = hasSignal(context, "leak");
  const hasSound = hasSignal(context, "sound");
  const hasRust = hasSignal(context, "rust");
  const hasConnector = hasSignal(context, "connector");
  const hasLight = hasSignal(context, "light");
  const hasBeltPulley = hasSignal(context, "belt_pulley");

  if (riskSignalCount >= 3 || (hasLeak && riskSignalCount >= 2)) {
    return "multiple_risk_signals";
  }

  if (hasLeak) {
    return "leak";
  }

  if (hasSound && hasBeltPulley) {
    return "sound_belt_pulley";
  }

  if (hasBeltPulley) {
    return "belt_pulley";
  }

  if (hasLight) {
    return "light";
  }

  if (hasConnector) {
    return "connector";
  }

  if (hasRust) {
    return "rust";
  }

  if (hasSound) {
    return "sound";
  }

  if (context.captureCount > 0) {
    return "frames_only";
  }

  return "insufficient_evidence";
}

function buildRuleResult(
  context: DiagnosisContext,
  rule: MockDiagnosisRuleId,
): MockDiagnosisDraft {
  const riskSignals = [...context.activeSignals];

  if (rule === "multiple_risk_signals") {
    const lookup = buildRuleLookup(riskSignals);
    const bookmarkTypes = riskSignals.filter((signal) => context.bookmarkSignals.has(signal));
    const includeConversation =
      bookmarkTypes.length < riskSignals.length || bookmarkTypes.length === 0;

    return {
      matchedRule: rule,
      likelyIssueArea: "Multiple issue signals from this inspection need follow-up",
      severity: "red",
      recommendation: "SHOP_REQUIRED",
      nextSafeStep:
        "This session shows more than one risk signal. Stop here, review the saved evidence, and verify the highest-risk area before driving again.",
      inspectNext: buildInspectNext(lookup, [
        "The clearest leak, wobble, or rust area from the saved evidence",
        "Any connector, light, or pulley path that also looks damaged",
        "Which issue appears most active right now before moving the truck",
      ], 4),
      disclaimer:
        "This is a limited inspection aid, not a guaranteed diagnosis. Multiple issue signals in one session should be treated more cautiously than a single isolated mark.",
      supportingEvidence: buildSupportingEvidence({
        context,
        includeCapture: true,
        includeConversation,
        bookmarkTypes,
      }),
      confidence: "high",
    };
  }

  if (rule === "leak") {
    const lookup = buildRuleLookup(["leak"]);

    return {
      matchedRule: rule,
      likelyIssueArea: "Possible fluid leak source in the engine bay or front underbody",
      severity: "red",
      recommendation: "SHOP_REQUIRED",
      nextSafeStep:
        "Inspect the fluid source before driving again. If the leak is fresh, spreading, or the fluid type is unclear, stop here and use a shop.",
      inspectNext: buildInspectNext(lookup, [
        "Fresh wet trail above the drip point",
        "Reservoir and hose connections near the leak path",
        "Fluid color and smell before topping anything off",
      ]),
      disclaimer:
        "This is a limited inspection aid, not a guaranteed diagnosis. If the leak source is unclear, do not keep driving it.",
      supportingEvidence: buildSupportingEvidence({
        context,
        includeCapture: true,
        includeConversation: !context.bookmarkSignals.has("leak"),
        bookmarkTypes: ["leak"],
      }),
    };
  }

  if (rule === "sound_belt_pulley") {
    const lookup = buildRuleLookup(["sound", "belt_pulley"]);
    const includeConversation =
      !context.bookmarkSignals.has("sound") ||
      !context.bookmarkSignals.has("belt_pulley");

    return {
      matchedRule: rule,
      likelyIssueArea: "Front accessory drive, belt tracking, or pulley wobble",
      severity: "yellow",
      recommendation: "INSPECT_ONLY",
      nextSafeStep:
        "With the engine off and cooled, inspect the front belt path for wobble, misalignment, shiny rub marks, or frayed edges.",
      inspectNext: buildInspectNext(lookup, [
        "Tensioner and idler pulley wobble",
        "Belt edge wear or belt dust around the front drive path",
        "Any pulley that feels loose, noisy, or out of line",
      ]),
      disclaimer:
        "This is a limited inspection aid, not a guaranteed diagnosis. Stop here if any pulley feels loose or the belt path looks unstable.",
      supportingEvidence: buildSupportingEvidence({
        context,
        includeCapture: true,
        includeConversation,
        bookmarkTypes: ["sound", "belt_pulley"],
      }),
    };
  }

  if (rule === "belt_pulley") {
    const lookup = buildRuleLookup(["belt_pulley"]);

    return {
      matchedRule: rule,
      likelyIssueArea: "Front accessory drive / belt and pulley path",
      severity: "yellow",
      recommendation: "INSPECT_ONLY",
      nextSafeStep:
        "Inspect the belt path with the engine off and look for cracked edges, dust, or pulley misalignment before driving further.",
      inspectNext: buildInspectNext(lookup, [
        "Belt edge wear around the accessory drive",
        "Pulley alignment across the front drive path",
        "Dust, polish marks, or wobble near the tensioner and idler",
      ]),
      disclaimer:
        "This is a limited inspection aid, not a guaranteed diagnosis. If anything looks loose or the belt path is unclear, stop here and use a shop.",
      supportingEvidence: buildSupportingEvidence({
        context,
        includeCapture: true,
        includeConversation: !context.bookmarkSignals.has("belt_pulley"),
        bookmarkTypes: ["belt_pulley"],
      }),
    };
  }

  if (rule === "light") {
    const lookup = buildRuleLookup(["light"]);

    return {
      matchedRule: rule,
      likelyIssueArea: "Exterior light, bulb, socket, or wiring connection",
      severity: "green",
      recommendation: "DIY_SAFE",
      nextSafeStep:
        "Start with a bulb and socket check. Clean light corrosion and confirm the connector is seated before replacing parts.",
      inspectNext: buildInspectNext(lookup, [
        "Bulb filament or LED unit condition",
        "Socket corrosion or heat damage",
        "Connector fitment and obvious wiring damage",
      ]),
      disclaimer:
        "This is a limited inspection aid, not a guaranteed diagnosis. Stop if you find melted wiring or repeated fuse issues.",
      supportingEvidence: buildSupportingEvidence({
        context,
        includeCapture: true,
        includeConversation: !context.bookmarkSignals.has("light"),
        bookmarkTypes: ["light"],
      }),
    };
  }

  if (rule === "connector") {
    const lookup = buildRuleLookup(["connector"]);

    return {
      matchedRule: rule,
      likelyIssueArea: "Connector fitment, corrosion, or broken retaining tab",
      severity: "green",
      recommendation: "DIY_SAFE",
      nextSafeStep:
        "Inspect the connector by hand with the engine off. Check for a loose fit, corrosion, or a broken lock tab before driving.",
      inspectNext: buildInspectNext(lookup, [
        "Green or white corrosion in the connector",
        "Loose pins or a connector that will not stay seated",
        "Broken plastic tab or strain near the wire entry",
      ]),
      disclaimer:
        "This is a limited inspection aid, not a guaranteed diagnosis. If the connector serves a critical engine function, stop and verify the fit before driving.",
      supportingEvidence: buildSupportingEvidence({
        context,
        includeCapture: true,
        includeConversation: !context.bookmarkSignals.has("connector"),
        bookmarkTypes: ["connector"],
      }),
    };
  }

  if (rule === "rust") {
    const lookup = buildRuleLookup(["rust"]);

    return {
      matchedRule: rule,
      likelyIssueArea: "Wheel well or underbody rust spot",
      severity: "yellow",
      recommendation: "INSPECT_ONLY",
      nextSafeStep:
        "Inspect the rust area closely and confirm whether it is only surface rust or if the metal is flaking, swollen, or perforated.",
      inspectNext: buildInspectNext(lookup, [
        "Wheel well lip and underbody seams",
        "Brake and fuel line nearby condition",
        "Any flaking metal or soft spot around the rust mark",
      ]),
      disclaimer:
        "This is a limited inspection aid, not a guaranteed diagnosis. Stop here if the rust is structural or close to brake or fuel hardware.",
      supportingEvidence: buildSupportingEvidence({
        context,
        includeCapture: true,
        includeConversation: !context.bookmarkSignals.has("rust"),
        bookmarkTypes: ["rust"],
      }),
    };
  }

  if (rule === "sound") {
    const includeConversation = context.conversationSignals.has("sound");

    return {
      matchedRule: rule,
      likelyIssueArea: "Unconfirmed sound source in the engine bay or front drive area",
      severity: "yellow",
      recommendation: "INSPECT_ONLY",
      nextSafeStep:
        "Add another clear frame and hold the phone steady where the sound is strongest before deciding whether it is safe to keep driving.",
      inspectNext: [
        "Whether the sound follows the belt path or a single pulley",
        "Changes in sound as the phone moves across the engine bay",
        "Any visible shake, rub mark, or loose connector near the sound",
      ],
      disclaimer:
        "This is a limited inspection aid, not a guaranteed diagnosis. If the sound is sharp, sudden, or worsening, stop here and use a shop.",
      supportingEvidence: buildSupportingEvidence({
        context,
        includeCapture: true,
        includeConversation,
        bookmarkTypes: ["sound"],
      }),
    };
  }

  if (rule === "frames_only") {
    return {
      matchedRule: rule,
      likelyIssueArea: "General visual inspection with limited evidence",
      severity: "green",
      recommendation: "INSPECT_ONLY",
      nextSafeStep:
        "Review the saved frames and add a bookmark where the issue is most obvious before deciding on a repair path.",
      inspectNext: [
        "One clear close frame of the suspected issue",
        "A wider frame for location context",
        "A bookmark for the exact area that needs follow-up",
      ],
      disclaimer:
        "This is a limited inspection aid, not a guaranteed diagnosis. Add more evidence if the problem area is still unclear.",
      supportingEvidence: buildSupportingEvidence({
        context,
        includeCapture: true,
        includeConversation: true,
      }),
    };
  }

  return {
    matchedRule: "insufficient_evidence",
    likelyIssueArea: "No evidence collected in this session",
    severity: "green",
    recommendation: "INSPECT_ONLY",
    confidence: "low",
    nextSafeStep:
      "Start a new session when you are at the truck. Point the camera at the area you want to inspect and add bookmarks for anything that looks or sounds wrong.",
    inspectNext: [
      "Open the camera and point it at the problem area",
      "Add a bookmark for what you see or hear",
      "Capture a clear frame so the buddy can help",
    ],
    disclaimer:
      "This session ended before any evidence was captured. Start a new session at the truck for a useful result.",
    supportingEvidence: buildSupportingEvidence({
      context,
      includeConversation: true,
    }),
  };
}

function localizeRepairResult(
  session: RepairSessionSnapshot,
  result: RepairResult,
): RepairResult {
  const { sessionLanguage } = session;

  if (sessionLanguage === "en") {
    return result;
  }

  return {
    ...result,
    likelyIssueArea: translateExactText(sessionLanguage, result.likelyIssueArea),
    nextSafeStep: translateExactText(sessionLanguage, result.nextSafeStep),
    inspectNext: result.inspectNext.map((item) =>
      translateExactText(sessionLanguage, item),
    ),
    disclaimer: translateExactText(sessionLanguage, result.disclaimer),
    supportingEvidence: result.supportingEvidence.map((item) => ({
      ...item,
      label: translateExactText(sessionLanguage, item.label),
      detail: item.detail
        ? translateExactText(sessionLanguage, item.detail)
        : undefined,
    })),
  };
}

function applyGroundedResultHints(
  session: RepairSessionSnapshot,
  result: RepairResult,
): RepairResult {
  const groundedHints = buildGroundedResultHints({
    result,
    session,
  });
  const mergedInspectNext = Array.from(
    new Set([...groundedHints.inspectNext, ...result.inspectNext]),
  ).slice(0, 4);
  const topReasoningNote = groundedHints.reasoningNotes[0]?.trim();
  const likelyIssueArea =
    result.matchedRule === "frames_only" ||
    result.matchedRule === "insufficient_evidence"
      ? groundedHints.likelyIssueArea ?? result.likelyIssueArea
      : result.likelyIssueArea;

  return {
    ...result,
    likelyIssueArea,
    inspectNext: mergedInspectNext.length > 0 ? mergedInspectNext : result.inspectNext,
    disclaimer:
      topReasoningNote && !result.disclaimer.includes(topReasoningNote)
        ? `${result.disclaimer} ${topReasoningNote}`
        : result.disclaimer,
  };
}

export function buildMockRepairResult(session: RepairSessionSnapshot): RepairResult {
  const context = buildDiagnosisContext(session);
  const matchedRule = matchMockDiagnosisRule(context);

  return buildNormalizedGroundedRepairResult(
    session,
    localizeRepairResult(
      session,
      applyGroundedResultHints(
        session,
        finalizeDraft(context, buildRuleResult(context, matchedRule)),
      ),
    ),
  );
}
