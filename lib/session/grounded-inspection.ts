import {
  getConfidenceNotes,
  getIssueAreas,
  getTruckKnowledgeBase,
  type TruckIssueAreaDefinition,
  type TruckIssueAreaId,
  type TruckKnowledgeLookup,
  type TruckPartId,
  type TruckSymptomId,
  type TruckInspectionTargetId,
} from "@/lib/knowledge";
import {
  lookupReferencesByIssueArea,
  lookupReferencesByPart,
  lookupReferencesBySymptom,
  type RenderedReferenceEntry,
} from "@/lib/references";
import { getTranscriptEvidenceWeight } from "@/lib/session/transcript-language";
import type { ConfidenceLevel, RepairResult } from "@/lib/types/result";
import type {
  AIResponseSessionEvent,
  BookmarkType,
  RepairSessionSnapshot,
  SessionLanguage,
} from "@/lib/types/session";

type GroundingEvidenceSource = "bookmark" | "transcript" | "capture" | "ai_response";
type GroundedReferenceMatchSource = "issue_area" | "part" | "symptom";

type EvidenceTextInput = {
  createdAt: string;
  source: GroundingEvidenceSource;
  text: string;
  weight: number;
};

export interface GroundedIssueAreaCandidate {
  confidence: ConfidenceLevel;
  confidenceNote?: string;
  issueAreaId: TruckIssueAreaId;
  label: string;
  matchedSources: GroundingEvidenceSource[];
  matchedTerms: string[];
  reasoningNote: string;
  score: number;
  targetId: TruckInspectionTargetId;
  targetLabel: string;
}

export interface GroundedInspectionPrompt {
  confidence: ConfidenceLevel;
  issueAreaId: TruckIssueAreaId;
  instruction: string;
  matchedSources: GroundingEvidenceSource[];
  referenceHints: GroundedReferenceHint[];
  reasoningNote: string;
  targetId: TruckInspectionTargetId;
  targetLabel: string;
}

export interface GroundedReferenceHint {
  entry: RenderedReferenceEntry;
  matchedBy: GroundedReferenceMatchSource[];
  score: number;
}

export interface GroundedResultHints {
  inspectNext: string[];
  issueAreaCandidates: GroundedIssueAreaCandidate[];
  likelyIssueArea?: string;
  nextSafeStepHint?: string;
  referenceHints: GroundedReferenceHint[];
  reasoningNotes: string[];
}

export interface CollectedSessionGroundingEvidence {
  bookmarkTypes: BookmarkType[];
  captureCount: number;
  evidenceTexts: EvidenceTextInput[];
  issueAreaIds: TruckIssueAreaId[];
  partIds: TruckPartId[];
  symptomIds: TruckSymptomId[];
}

const KOREAN_GROUNDING_CUES: Array<{
  issueAreaIds?: TruckIssueAreaId[];
  partIds?: TruckPartId[];
  symptomIds?: TruckSymptomId[];
  terms: string[];
}> = [
  {
    issueAreaIds: ["accessory_drive_belt_path"],
    partIds: ["belt", "tensioner", "idler_pulley", "alternator_area"],
    symptomIds: ["chirp", "wobble"],
    terms: ["벨트", "텐셔너", "아이들", "풀리", "알터네이터", "벨트 경로"],
  },
  {
    issueAreaIds: ["cam_phaser_tick_context"],
    symptomIds: ["ticking"],
    terms: ["캠 페이저", "타이밍 틱", "밸브트레인", "윗쪽 엔진 틱"],
  },
  {
    issueAreaIds: ["ignition_misfire_path"],
    partIds: ["coil", "spark_plug", "connector", "vacuum_line"],
    symptomIds: ["misfire", "ticking"],
    terms: ["실화", "부조", "코일", "코일 팩", "점화플러그", "플러그 웰"],
  },
  {
    issueAreaIds: ["coolant_leak_source"],
    partIds: ["coolant_hose"],
    symptomIds: ["leak", "coolant_smell"],
    terms: ["냉각수", "누유", "새는", "단내", "부동액", "호스"],
  },
  {
    issueAreaIds: ["connector_and_harness_fitment"],
    partIds: ["connector"],
    terms: ["커넥터", "잠금 탭", "락 탭", "핀", "하네스"],
  },
  {
    issueAreaIds: ["lighting_socket_wiring"],
    partIds: ["lamp_socket", "light_bulb", "connector"],
    symptomIds: ["hyperflash"],
    terms: ["전구", "소켓", "등화", "하이퍼플래시", "방향지시등", "배선"],
  },
  {
    issueAreaIds: ["battery_terminal_corrosion"],
    partIds: ["battery_terminal"],
    terms: ["배터리 터미널", "배터리 단자", "부식", "하얀 가루", "녹색 가루"],
  },
  {
    issueAreaIds: ["wheel_well_underbody_rust"],
    symptomIds: ["rust"],
    terms: ["녹", "휠하우스", "하부", "부식", "플레이크"],
  },
  {
    issueAreaIds: ["cam_phaser_tick_context"],
    partIds: ["cam_phaser_area", "vct_solenoid", "timing_cover"],
    symptomIds: ["rattle", "ticking"],
    terms: ["캠 페이저", "타이밍 체인", "VCT", "시동 소음", "냉간 시동", "래틀", "체인 텐셔너"],
  },
  {
    issueAreaIds: [],
    partIds: ["fuel_pump_driver_module"],
    symptomIds: ["misfire", "rough_idle"],
    terms: ["FPDM", "연료 펌프 모듈", "연료 펌프 드라이버", "시동 꺼짐", "연료 차단"],
  },
  {
    issueAreaIds: ["front_suspension_joint_play"],
    partIds: ["ball_joint", "control_arm"],
    symptomIds: ["clunk", "vibration", "pull"],
    terms: ["볼 조인트", "컨트롤 암", "로어 암", "허브 베어링", "휠 베어링", "험밍"],
  },
  {
    issueAreaIds: ["steering_linkage_wear"],
    partIds: ["tie_rod_end"],
    symptomIds: ["pull", "vibration"],
    terms: ["타이로드", "스티어링", "EPAS", "전동 파워 스티어링", "핸들 떨림"],
  },
  {
    issueAreaIds: [],
    partIds: ["throttle_body"],
    symptomIds: ["rough_idle", "hiss"],
    terms: ["스로틀 바디", "쓰로틀", "아이들 불안정", "림프 모드", "출력 제한"],
  },
  {
    issueAreaIds: ["exhaust_manifold_tick"],
    partIds: ["exhaust_manifold"],
    symptomIds: ["exhaust_tick", "ticking"],
    terms: ["배기 매니폴드", "배기 스터드", "배기 볼트", "배기 틱"],
  },
  {
    issueAreaIds: [],
    partIds: [],
    symptomIds: ["vibration"],
    terms: ["미션 셔더", "토크 컨버터", "6R80", "변속 충격", "변속기 떨림", "MERCON LV"],
  },
  {
    issueAreaIds: ["drivetrain_leak_or_boot"],
    partIds: ["iwe_solenoid_actuator"],
    symptomIds: ["vibration", "rattle"],
    terms: ["IWE", "허브 그라인딩", "4WD 소음", "프론트 허브", "진공 솔레노이드"],
  },
];

function normalizeGroundingText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function textIncludesTerm(text: string, term: string) {
  const normalizedText = normalizeGroundingText(text);
  const normalizedTerm = normalizeGroundingText(term);

  if (!normalizedText || !normalizedTerm) {
    return false;
  }

  return normalizedText.includes(normalizedTerm);
}

function pushIfDefined<T>(target: Set<T>, values: T[] | undefined) {
  values?.forEach((value) => target.add(value));
}

function getBookmarkDrivenIssueAreaIds(bookmarkType: BookmarkType) {
  return (
    getTruckKnowledgeBase().relationships.bookmarkTypeLookups[bookmarkType]?.issueAreaIds ?? []
  );
}

function getBookmarkLabelForLanguage(
  bookmarkType: BookmarkType,
  language: SessionLanguage,
) {
  if (language === "ko") {
    return {
      belt_pulley: "벨트/풀리",
      connector: "커넥터",
      leak: "누유",
      light: "등화",
      other: "기타",
      rust: "녹",
      sound: "소리",
    }[bookmarkType];
  }

  return {
    belt_pulley: "belt/pulley",
    connector: "connector",
    leak: "leak",
    light: "light",
    other: "other",
    rust: "rust",
    sound: "sound",
  }[bookmarkType];
}

function getRecentUserTranscriptText(session: RepairSessionSnapshot) {
  return session.evidence.conversation
    .filter((message) => message.role === "user")
    .slice(-6)
    .map((message) => message.text.trim())
    .filter(Boolean)
    .join(" ");
}

function getLatestConversationTimestamp(
  session: RepairSessionSnapshot,
  role: "user" | "assistant",
) {
  for (let index = session.evidence.conversation.length - 1; index >= 0; index -= 1) {
    const message = session.evidence.conversation[index];

    if (message?.role === role) {
      return message.createdAt;
    }
  }

  return undefined;
}

function getAiResponseText(session: RepairSessionSnapshot) {
  const resultEventText = session.events
    .filter((event): event is AIResponseSessionEvent => event.type === "ai_response")
    .slice(-2)
    .flatMap((event) => [event.result.likelyIssueArea, ...event.result.inspectNext])
    .map((value) => value.trim())
    .filter(Boolean);
  const assistantConversationText = session.evidence.conversation
    .filter((message) => message.role === "assistant")
    .slice(-3)
    .map((message) => message.text.trim())
    .filter(Boolean);

  return [...assistantConversationText, ...resultEventText].join(" ");
}

export function collectSessionGroundingEvidence(
  session: RepairSessionSnapshot,
  result?: RepairResult | null,
): CollectedSessionGroundingEvidence {
  const partIds = new Set<TruckPartId>();
  const symptomIds = new Set<TruckSymptomId>();
  const issueAreaIds = new Set<TruckIssueAreaId>();
  const bookmarkTypes = session.evidence.bookmarks.map((bookmark) => bookmark.bookmarkType);
  const evidenceTexts: EvidenceTextInput[] = [];
  const knowledgeBase = getTruckKnowledgeBase();
  const transcriptText = getRecentUserTranscriptText(session);
  const transcriptEvidenceWeight = getTranscriptEvidenceWeight(
    session.sessionLanguage,
    transcriptText,
  );
  const aiResponseText = [getAiResponseText(session), result?.likelyIssueArea ?? "", ...(result?.inspectNext ?? [])]
    .filter(Boolean)
    .join(" ");

  session.evidence.bookmarks.forEach((bookmark) => {
    pushIfDefined(issueAreaIds, getBookmarkDrivenIssueAreaIds(bookmark.bookmarkType));
    evidenceTexts.push({
      createdAt: bookmark.createdAt,
      source: "bookmark",
      text: `${getBookmarkLabelForLanguage(bookmark.bookmarkType, session.sessionLanguage)} ${bookmark.note ?? ""}`.trim(),
      weight: 6,
    });
  });

  session.evidence.captures.forEach((capture) => {
    if (capture.relatedBookmarkType) {
      pushIfDefined(
        issueAreaIds,
        getBookmarkDrivenIssueAreaIds(capture.relatedBookmarkType),
      );
    }

    evidenceTexts.push({
      createdAt: capture.createdAt,
      source: "capture",
      text: [
        capture.captureKind,
        capture.relatedBookmarkType
          ? getBookmarkLabelForLanguage(capture.relatedBookmarkType, session.sessionLanguage)
          : "",
      ]
        .filter(Boolean)
        .join(" "),
      weight: capture.relatedBookmarkType ? 4 : 2,
    });
  });

  if (transcriptText && transcriptEvidenceWeight > 0) {
    evidenceTexts.push({
      createdAt: getLatestConversationTimestamp(session, "user") ?? session.startedAt,
      source: "transcript",
      text: transcriptText,
      weight: transcriptEvidenceWeight,
    });
  }

  if (aiResponseText) {
    evidenceTexts.push({
      createdAt:
        getLatestConversationTimestamp(session, "assistant") ??
        session.events.at(-1)?.createdAt ??
        session.startedAt,
      source: "ai_response",
      text: aiResponseText,
      weight: 2,
    });
  }

  evidenceTexts.forEach((input) => {
    Object.values(knowledgeBase.issueAreas).forEach((issueArea) => {
      if (
        [issueArea.label, issueArea.id, ...issueArea.aliases].some((alias) =>
          textIncludesTerm(input.text, alias),
        )
      ) {
        issueAreaIds.add(issueArea.id);
      }
    });

    Object.values(knowledgeBase.parts).forEach((part) => {
      if ([part.label, part.id, ...part.aliases].some((alias) => textIncludesTerm(input.text, alias))) {
        partIds.add(part.id);
      }
    });

    Object.values(knowledgeBase.symptoms).forEach((symptom) => {
      if (
        [symptom.label, symptom.id, ...symptom.aliases].some((alias) =>
          textIncludesTerm(input.text, alias),
        )
      ) {
        symptomIds.add(symptom.id);
      }
    });

    if (session.sessionLanguage === "ko") {
      KOREAN_GROUNDING_CUES.forEach((cue) => {
        if (cue.terms.some((term) => textIncludesTerm(input.text, term))) {
          pushIfDefined(issueAreaIds, cue.issueAreaIds);
          pushIfDefined(partIds, cue.partIds);
          pushIfDefined(symptomIds, cue.symptomIds);
        }
      });
    }
  });

  return {
    bookmarkTypes,
    captureCount: session.evidence.captures.length,
    evidenceTexts,
    issueAreaIds: [...issueAreaIds],
    partIds: [...partIds],
    symptomIds: [...symptomIds],
  };
}

function buildGroundingLookup(
  session: RepairSessionSnapshot,
  result?: RepairResult | null,
): TruckKnowledgeLookup {
  const collected = collectSessionGroundingEvidence(session, result);

  return {
    bookmarkTypes: collected.bookmarkTypes,
    issueAreaIds: collected.issueAreaIds,
    partIds: collected.partIds,
    symptomIds: collected.symptomIds,
  };
}

function getCandidateTarget(area: TruckIssueAreaDefinition) {
  const target = area.inspectionTargets[0]
    ? getTruckKnowledgeBase().inspectionTargets[area.inspectionTargets[0]]
    : undefined;

  return target ?? {
    id: "engine_top_timing_cover" as const,
    label: "General engine area",
    aliases: [],
    systems: ["engine_mechanical" as const],
    summary: "General engine bay inspection — no specific target identified yet.",
    locationHint: "Open the hood and point the camera at the area of concern.",
    inspectFor: [
      "Point the camera at the area you want to inspect",
      "Describe or bookmark what you see or hear",
    ],
    warningSigns: [],
    likelyRecommendation: "INSPECT_ONLY" as const,
    relatedParts: [],
    relatedSymptoms: [],
  };
}

function dedupeStrings(values: Array<string | undefined | null>) {
  return Array.from(
    new Set(
      values
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  );
}

function getTimestampMs(value: string) {
  const timestamp = new Date(value).getTime();

  return Number.isFinite(timestamp) ? timestamp : 0;
}

function getRecencyBoost(createdAt: string, latestEvidenceTimestamp: number) {
  if (!latestEvidenceTimestamp) {
    return 0;
  }

  const ageMs = latestEvidenceTimestamp - getTimestampMs(createdAt);

  if (ageMs <= 45_000) {
    return 2;
  }

  if (ageMs <= 3 * 60_000) {
    return 1;
  }

  return 0;
}

function getReferenceContentPriority(entry: RenderedReferenceEntry) {
  if (entry.contentKind === "inspection_hint") {
    return 4;
  }

  if (entry.contentKind === "repair_note") {
    return 3;
  }

  if (entry.contentKind === "owner_manual") {
    return 2;
  }

  return 1;
}

function addGroundedReferenceHint(
  target: Map<string, GroundedReferenceHint>,
  entry: RenderedReferenceEntry,
  matchedBy: GroundedReferenceMatchSource,
  score: number,
) {
  const existing = target.get(entry.id);

  if (existing) {
    existing.score += score;

    if (!existing.matchedBy.includes(matchedBy)) {
      existing.matchedBy.push(matchedBy);
    }

    return;
  }

  target.set(entry.id, {
    entry,
    matchedBy: [matchedBy],
    score,
  });
}

function getReferenceInstruction(
  referenceHints: GroundedReferenceHint[],
  targetId: TruckInspectionTargetId,
) {
  for (const hint of referenceHints) {
    if (
      hint.entry.inspectionTargetIds.length > 0 &&
      !hint.entry.inspectionTargetIds.includes(targetId)
    ) {
      continue;
    }

    const instruction = hint.entry.procedures.find((procedure) => procedure.length <= 140);

    if (instruction) {
      return instruction;
    }
  }

  return undefined;
}

function getReferenceNextSafeStepHint(referenceHints: GroundedReferenceHint[]) {
  const riskPattern =
    /stop|do not|don’t|avoid driving|inspect before driving|멈추|주행하지 마|운행하지 마/i;

  for (const hint of referenceHints) {
    const riskLine = hint.entry.safetyWarnings.find((line) => riskPattern.test(line));

    if (riskLine) {
      return riskLine;
    }
  }

  return referenceHints[0]?.entry.summary;
}

function getReferenceReasoningNotes(referenceHints: GroundedReferenceHint[]) {
  return dedupeStrings(
    referenceHints.flatMap((hint) => [
      hint.entry.summary,
      hint.entry.notes[0],
      hint.entry.excerpts[0],
    ]),
  );
}

function getPromptInstruction(
  targetId: TruckInspectionTargetId,
  language: SessionLanguage,
  confidence: ConfidenceLevel,
  captureCount: number,
  matchedText: string,
) {
  const needsClearerView = confidence === "low" && captureCount > 0;
  const mentionsRouting = textIncludesTerm(matchedText, language === "ko" ? "경로" : "routing");

  if (targetId === "front_accessory_drive_path") {
    if (mentionsRouting) {
      return language === "ko"
        ? "벨트 경로를 따라 보여주세요."
        : "Show the routing around the belt.";
    }

    if (needsClearerView) {
      return language === "ko"
        ? "풀리 면이 더 선명하게 보이게 해주세요."
        : "I need a clearer view of the pulley face.";
    }

    return language === "ko"
      ? "벨트와 텐셔너를 보여주세요."
      : "Show me the belt and tensioner.";
  }

  if (targetId === "connector_fitment_and_corrosion") {
    if (needsClearerView) {
      return language === "ko"
        ? "커넥터 윗면과 잠금 탭을 보여주세요."
        : "Show the top of the connector and the locking tab.";
    }

    return language === "ko"
      ? "커넥터 쪽으로 더 가까이 보여주세요."
      : "Move closer to the connector.";
  }

  if (targetId === "fluid_source_path") {
    if (needsClearerView) {
      return language === "ko"
        ? "조금 더 아래쪽과 왼쪽을 보여주세요."
        : "Point lower and slightly left.";
    }

    return language === "ko"
      ? "누유가 시작되는 지점을 보여주세요."
      : "Show me where the leak starts.";
  }

  if (targetId === "wheel_well_underbody") {
    return language === "ko"
      ? "조금 더 아래쪽과 왼쪽을 보여주세요."
      : "Point lower and slightly left.";
  }

  if (targetId === "lamp_socket_and_harness") {
    return language === "ko"
      ? "전구 소켓과 짧은 하네스를 보여주세요."
      : "Show the bulb socket and short harness.";
  }

  if (targetId === "coil_and_plug_well") {
    return language === "ko"
      ? "코일과 점화플러그 쪽을 보여주세요."
      : "Show me the coil and spark plug area.";
  }

  if (targetId === "coolant_hose_and_crossover") {
    return language === "ko"
      ? "호스 경로와 연결부를 보여주세요."
      : "Show me the hose routing and connections.";
  }

  if (targetId === "battery_terminal_and_ground") {
    return language === "ko"
      ? "배터리 터미널과 접지를 보여주세요."
      : "Show me the battery terminal and ground.";
  }

  return language === "ko"
    ? "2초 정도 흔들리지 않게 고정해 주세요."
    : "Hold still for two seconds.";
}

function buildReasoningNote(
  language: SessionLanguage,
  confidence: ConfidenceLevel,
  confidenceNote: string | undefined,
) {
  if (confidence === "low") {
    return language === "ko"
      ? "아직 시야가 충분하지 않습니다. 조금 더 선명하게 확인해야 합니다."
      : "Not enough visibility yet. Inspect further before deciding.";
  }

  if (confidenceNote) {
    return confidenceNote;
  }

  return language === "ko"
    ? "현재 기록에 맞는 부위를 먼저 확인하세요."
    : "Start with the clearest matching area from the current evidence.";
}

function getConfidenceFromScore(score: number, captureCount: number): ConfidenceLevel {
  if (score >= 14 || (score >= 10 && captureCount > 0)) {
    return "high";
  }

  if (score >= 7) {
    return "medium";
  }

  return "low";
}

export function identifyLikelyIssueAreaCandidates(params: {
  result?: RepairResult | null;
  session: RepairSessionSnapshot;
}): GroundedIssueAreaCandidate[] {
  const { session, result } = params;
  const collected = collectSessionGroundingEvidence(session, result);
  const lookup = buildGroundingLookup(session, result);
  const issueAreas = getIssueAreas(lookup);
  const latestEvidenceTimestamp = Math.max(
    ...collected.evidenceTexts.map((input) => getTimestampMs(input.createdAt)),
    0,
  );

  return issueAreas
    .map((issueArea) => {
      const areaCueIds = new Set(
        issueArea.evidenceCues.flatMap((cue) => cue.issueAreaIds ?? [issueArea.id]),
      );
      const matchedTerms = new Set<string>();
      const matchedSources = new Set<GroundingEvidenceSource>();
      let score = 0;

      if (collected.issueAreaIds.includes(issueArea.id) || areaCueIds.has(issueArea.id)) {
        score += 4;
      }

      if (issueArea.relatedParts.some((partId) => collected.partIds.includes(partId))) {
        score += 3;
      }

      if (issueArea.relatedSymptoms.some((symptomId) => collected.symptomIds.includes(symptomId))) {
        score += 3;
      }

      if (
        session.evidence.bookmarks.some((bookmark) =>
          getBookmarkDrivenIssueAreaIds(bookmark.bookmarkType).includes(issueArea.id),
        )
      ) {
        matchedSources.add("bookmark");
        score += 5;
      }

      collected.evidenceTexts.forEach((input) => {
        const evidenceWeight = input.weight + getRecencyBoost(input.createdAt, latestEvidenceTimestamp);
        const areaMatches = [issueArea.label, issueArea.id, ...issueArea.aliases].filter(
          (alias) => textIncludesTerm(input.text, alias),
        );

        if (areaMatches.length > 0) {
          areaMatches.forEach((term) => matchedTerms.add(term));
          matchedSources.add(input.source);
          score += evidenceWeight;
        }

        issueArea.relatedParts.forEach((partId) => {
          const part = getTruckKnowledgeBase().parts[partId];

          if (
            [part.id, part.label, ...part.aliases].some((alias) =>
              textIncludesTerm(input.text, alias),
            )
          ) {
            matchedTerms.add(part.label);
            matchedSources.add(input.source);
            score += evidenceWeight;
          }
        });

        issueArea.relatedSymptoms.forEach((symptomId) => {
          const symptom = getTruckKnowledgeBase().symptoms[symptomId];

          if (
            [symptom.id, symptom.label, ...symptom.aliases].some((alias) =>
              textIncludesTerm(input.text, alias),
            )
          ) {
            matchedTerms.add(symptom.label);
            matchedSources.add(input.source);
            score += evidenceWeight;
          }
        });
      });

      const confidence = getConfidenceFromScore(score, collected.captureCount);
      const confidenceNote = getConfidenceNotes({ issueAreaIds: [issueArea.id] }).find(
        (note) => note.confidence === confidence,
      )?.note;
      const target = getCandidateTarget(issueArea);

      return {
        confidence,
        confidenceNote,
        issueAreaId: issueArea.id,
        label: issueArea.label,
        matchedSources: [...matchedSources],
        matchedTerms: [...matchedTerms],
        reasoningNote: buildReasoningNote(
          session.sessionLanguage,
          confidence,
          confidenceNote,
        ),
        score,
        targetId: target.id,
        targetLabel: target.label,
      } satisfies GroundedIssueAreaCandidate;
    })
    .filter((candidate) => candidate.score > 0)
    .sort((left, right) => right.score - left.score);
}

export function getGroundedReferenceHints(params: {
  candidates?: GroundedIssueAreaCandidate[];
  limit?: number;
  result?: RepairResult | null;
  session: RepairSessionSnapshot;
}) {
  const candidates =
    params.candidates ?? identifyLikelyIssueAreaCandidates(params);
  const collected = collectSessionGroundingEvidence(params.session, params.result);
  const language = params.session.sessionLanguage;
  const scoredHints = new Map<string, GroundedReferenceHint>();

  candidates.slice(0, 3).forEach((candidate) => {
    lookupReferencesByIssueArea(candidate.issueAreaId, language)
      .slice(0, 4)
      .forEach((entry) => {
        const targetScore =
          entry.inspectionTargetIds.includes(candidate.targetId) ? 2 : 0;

        addGroundedReferenceHint(
          scoredHints,
          entry,
          "issue_area",
          6 + candidate.score + targetScore + getReferenceContentPriority(entry),
        );
      });
  });

  collected.partIds.forEach((partId) => {
    const part = getTruckKnowledgeBase().parts[partId];

    lookupReferencesByPart(part.label, language)
      .slice(0, 3)
      .forEach((entry) => {
        addGroundedReferenceHint(
          scoredHints,
          entry,
          "part",
          4 + getReferenceContentPriority(entry),
        );
      });
  });

  collected.symptomIds.forEach((symptomId) => {
    const symptom = getTruckKnowledgeBase().symptoms[symptomId];

    lookupReferencesBySymptom(symptom.label, language)
      .slice(0, 3)
      .forEach((entry) => {
        addGroundedReferenceHint(
          scoredHints,
          entry,
          "symptom",
          3 + getReferenceContentPriority(entry),
        );
      });
  });

  return [...scoredHints.values()]
    .sort((left, right) => right.score - left.score)
    .slice(0, params.limit ?? 3);
}

export function buildGroundedInspectionPrompt(params: {
  result?: RepairResult | null;
  session: RepairSessionSnapshot;
}): GroundedInspectionPrompt | null {
  const candidates = identifyLikelyIssueAreaCandidates(params);
  const topCandidate = candidates[0];

  if (!topCandidate) {
    return null;
  }

  const referenceHints = getGroundedReferenceHints({
    candidates,
    result: params.result,
    session: params.session,
  });
  const matchedText = topCandidate.matchedTerms.join(" ");
  const instruction =
    getReferenceInstruction(referenceHints, topCandidate.targetId) ??
    getPromptInstruction(
      topCandidate.targetId,
      params.session.sessionLanguage,
      topCandidate.confidence,
      params.session.evidence.captures.length,
      matchedText,
    );

  return {
    confidence: topCandidate.confidence,
    issueAreaId: topCandidate.issueAreaId,
    instruction,
    matchedSources: topCandidate.matchedSources,
    referenceHints,
    reasoningNote: topCandidate.reasoningNote,
    targetId: topCandidate.targetId,
    targetLabel: topCandidate.targetLabel,
  };
}

export function buildGroundedResultHints(params: {
  result?: RepairResult | null;
  session: RepairSessionSnapshot;
}): GroundedResultHints {
  const candidates = identifyLikelyIssueAreaCandidates(params);
  const prompt = buildGroundedInspectionPrompt(params);
  const topCandidate = candidates[0];
  const language = params.session.sessionLanguage;
  const referenceHints =
    prompt?.referenceHints ??
    getGroundedReferenceHints({
      candidates,
      result: params.result,
      session: params.session,
    });

  return {
    likelyIssueArea: topCandidate?.label,
    inspectNext: dedupeStrings([
      prompt?.instruction,
      ...referenceHints.flatMap((hint) => hint.entry.procedures.slice(0, 2)),
      language === "ko"
        ? "2초 정도 흔들리지 않게 유지해 주세요."
        : "Hold still for two seconds.",
      language === "ko"
        ? "아직 불분명하면 같은 부위를 더 가까이 보여주세요."
        : "If it is still unclear, show the same area closer.",
    ]).slice(0, 4),
    issueAreaCandidates: candidates,
    nextSafeStepHint: getReferenceNextSafeStepHint(referenceHints),
    referenceHints,
    reasoningNotes: dedupeStrings([
      ...candidates.slice(0, 2).map((candidate) => candidate.reasoningNote),
      ...getReferenceReasoningNotes(referenceHints).slice(0, 2),
    ]),
  };
}
