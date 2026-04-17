import {
  getEscalationGuidance,
  type TruckEscalationGuidance,
  type TruckIssueAreaId,
  type TruckKnowledgeLookup,
  type TruckPartId,
  type TruckSymptomId,
} from "@/lib/knowledge";
import {
  buildGroundedResultHints,
  collectSessionGroundingEvidence,
  identifyLikelyIssueAreaCandidates,
  type GroundedIssueAreaCandidate,
} from "@/lib/session/grounded-inspection";
import { isTranscriptStrongForGrounding } from "@/lib/session/transcript-language";
import type {
  ConfidenceLevel,
  RepairResult,
  ResultEvidenceItem,
} from "@/lib/types/result";
import type {
  BookmarkType,
  RepairSessionSnapshot,
  SessionLanguage,
} from "@/lib/types/session";

export interface EvidenceFusionContext {
  bookmarkCounts: Partial<Record<BookmarkType, number>>;
  groundedIssueAreaCandidates: GroundedIssueAreaCandidate[];
  lookup: TruckKnowledgeLookup;
  matchedIssueAreaIds: TruckIssueAreaId[];
  matchedPartIds: TruckPartId[];
  matchedSymptomIds: TruckSymptomId[];
  relatedCaptureCounts: Partial<Record<BookmarkType, number>>;
  repeatedTranscriptKeywords: string[];
  topEscalation?: TruckEscalationGuidance;
}

function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countOccurrences(text: string, term: string) {
  const normalizedText = normalizeText(text);
  const normalizedTerm = normalizeText(term);

  if (!normalizedText || !normalizedTerm) {
    return 0;
  }

  return normalizedText.split(normalizedTerm).length - 1;
}

function getResultLanguage(session: RepairSessionSnapshot) {
  return session.sessionLanguage;
}

function getIssueAreaLabel(
  language: SessionLanguage,
  issueAreaId: TruckIssueAreaId,
) {
  const english: Partial<Record<TruckIssueAreaId, string>> = {
    accessory_drive_belt_path: "Front accessory drive / belt and pulley path",
    battery_terminal_corrosion: "Battery terminal / corrosion path",
    battery_charge_and_ground_path: "Battery / alternator / ground path",
    brake_hose_or_line_concern: "Brake hose / brake line concern",
    cam_phaser_tick_context:
      "Upper engine ticking that still needs separation from the belt path",
    connector_and_harness_fitment:
      "Connector fitment, corrosion, or locking-tab path",
    coolant_leak_source: "Cooling hose / coolant leak source",
    cooling_reservoir_and_hose_seep: "Coolant reservoir / hose seep path",
    drivetrain_leak_or_boot: "Driveline / 4WD leak or boot path",
    exhaust_manifold_tick: "Exhaust manifold / heat-shield tick path",
    ignition_misfire_path: "Ignition coil / plug / misfire path",
    intake_vacuum_air_leak: "Intake / vacuum air-leak path",
    lamp_housing_moisture_or_mount: "Lamp housing moisture / mount path",
    lighting_socket_wiring: "Bulb / socket / short harness path",
    front_suspension_joint_play: "Front suspension joint / bushing path",
    steering_linkage_wear: "Steering linkage / tie-rod path",
    underbody_frame_corrosion: "Underbody frame / seam corrosion path",
    wheel_well_underbody_rust: "Wheel well / underbody rust area",
  };

  const korean: Partial<Record<TruckIssueAreaId, string>> = {
    accessory_drive_belt_path: "전면 액세서리 드라이브 / 벨트 및 풀리 경로",
    battery_terminal_corrosion: "배터리 터미널 / 부식 경로",
    battery_charge_and_ground_path: "배터리 / 알터네이터 / 접지 경로",
    brake_hose_or_line_concern: "브레이크 호스 / 라인 점검 경로",
    cam_phaser_tick_context:
      "벨트 경로와 구분이 더 필요한 상부 엔진 틱",
    connector_and_harness_fitment:
      "커넥터 체결, 부식, 또는 잠금 탭 경로",
    coolant_leak_source: "냉각수 호스 / 누유 시작 지점",
    cooling_reservoir_and_hose_seep: "냉각수 리저버 / 호스 스밈 경로",
    drivetrain_leak_or_boot: "구동계 / 4WD 누유 또는 부트 경로",
    exhaust_manifold_tick: "배기 매니폴드 / 히트실드 틱 경로",
    ignition_misfire_path: "점화 코일 / 플러그 / 실화 경로",
    intake_vacuum_air_leak: "흡기 / 진공 누설 경로",
    lamp_housing_moisture_or_mount: "등화 하우징 습기 / 마운트 경로",
    lighting_socket_wiring: "전구 / 소켓 / 짧은 하네스 경로",
    front_suspension_joint_play: "전륜 서스펜션 조인트 경로",
    steering_linkage_wear: "조향 링크 / 타이로드 경로",
    underbody_frame_corrosion: "하부 프레임 / 이음부 부식 경로",
    wheel_well_underbody_rust: "휠하우스 / 하부 녹 부위",
  };

  return (
    (language === "ko" ? korean[issueAreaId] : english[issueAreaId]) ??
    issueAreaId.replace(/_/g, " ")
  );
}

function getIssueAreaInspectNext(
  language: SessionLanguage,
  issueAreaId: TruckIssueAreaId,
) {
  const english: Partial<Record<TruckIssueAreaId, string[]>> = {
    accessory_drive_belt_path: [
      "Show the routing around the belt.",
      "I need a clearer view of the pulley face.",
      "Hold still for two seconds.",
    ],
    battery_terminal_corrosion: [
      "Show the battery terminal and clamp fit.",
      "Show the cable end and nearby ground.",
      "Hold still for two seconds.",
    ],
    cam_phaser_tick_context: [
      "Show the top front of the engine again.",
      "Then show the belt path for comparison.",
      "If it stays unclear, inspect further before driving.",
    ],
    connector_and_harness_fitment: [
      "Show the top of the connector and the locking tab.",
      "Move closer to the pin side.",
      "Hold still for two seconds.",
    ],
    coolant_leak_source: [
      "Show me where the leak starts.",
      "Trace the wet path upward.",
      "Show the hose or reservoir connection closest to the seep.",
    ],
    ignition_misfire_path: [
      "Show me the coil and spark plug area.",
      "Show the connector on the same cylinder.",
      "Hold still for two seconds.",
    ],
    lighting_socket_wiring: [
      "Show the bulb socket and short harness.",
      "Move closer to the connector side.",
      "Hold still for two seconds.",
    ],
    wheel_well_underbody_rust: [
      "Point lower into the wheel well.",
      "Show the seam and nearby mount closer.",
      "Then capture a wider underbody frame.",
    ],
  };

  const korean: Partial<Record<TruckIssueAreaId, string[]>> = {
    accessory_drive_belt_path: [
      "벨트 경로를 따라 보여주세요.",
      "풀리 면이 더 선명하게 보이게 해주세요.",
      "2초 정도 흔들리지 않게 고정해 주세요.",
    ],
    battery_terminal_corrosion: [
      "배터리 터미널과 클램프 체결을 보여주세요.",
      "케이블 끝과 가까운 접지를 보여주세요.",
      "2초 정도 흔들리지 않게 고정해 주세요.",
    ],
    cam_phaser_tick_context: [
      "엔진 윗앞쪽을 다시 보여주세요.",
      "그다음 비교를 위해 벨트 경로도 보여주세요.",
      "그래도 불분명하면 더 점검한 뒤 판단하세요.",
    ],
    connector_and_harness_fitment: [
      "커넥터 윗면과 잠금 탭을 보여주세요.",
      "핀 쪽으로 더 가까이 보여주세요.",
      "2초 정도 흔들리지 않게 고정해 주세요.",
    ],
    coolant_leak_source: [
      "누유가 시작되는 지점을 보여주세요.",
      "젖은 자국을 위쪽으로 따라가 주세요.",
      "가장 가까운 호스나 리저버 연결부를 보여주세요.",
    ],
    ignition_misfire_path: [
      "코일과 점화플러그 구역을 보여주세요.",
      "같은 실린더의 커넥터도 보여주세요.",
      "2초 정도 흔들리지 않게 고정해 주세요.",
    ],
    lighting_socket_wiring: [
      "전구 소켓과 짧은 하네스를 보여주세요.",
      "커넥터 쪽으로 더 가까이 보여주세요.",
      "2초 정도 흔들리지 않게 고정해 주세요.",
    ],
    wheel_well_underbody_rust: [
      "휠하우스 아래쪽을 향해 보여주세요.",
      "이음부와 주변 마운트를 더 가까이 보여주세요.",
      "그다음 더 넓은 하부 화면도 저장하세요.",
    ],
  };

  return (
    (language === "ko" ? korean[issueAreaId] : english[issueAreaId]) ??
    (language === "ko"
      ? [
          "현재 보이는 부위를 더 가까이 보여주세요.",
          "같은 부위를 2초 동안 흔들림 없이 유지해 주세요.",
          "필요하면 더 넓은 위치 화면도 보여주세요.",
        ]
      : [
          "Show the current visible area closer.",
          "Hold the same area steady for two seconds.",
          "Add one wider location frame if needed.",
        ])
  );
}

function getIssueAreaNextSafeStep(
  language: SessionLanguage,
  issueAreaId: TruckIssueAreaId,
  confidence: ConfidenceLevel,
) {
  if (language === "ko") {
    if (issueAreaId === "accessory_drive_belt_path") {
      return confidence === "low"
        ? "벨트 경로가 충분히 선명하지 않습니다. 엔진을 끈 상태에서 벨트, 텐셔너, 풀리 면을 더 선명하게 확인하세요."
        : "엔진을 끄고 식힌 뒤 벨트 경로, 텐셔너, 풀리 정렬을 먼저 확인하세요.";
    }

    if (issueAreaId === "coolant_leak_source") {
      return "더 주행하기 전에 냉각수 누유 시작 지점을 먼저 확인하세요.";
    }

    if (issueAreaId === "connector_and_harness_fitment") {
      return "엔진을 끈 상태에서 커넥터 체결, 부식, 잠금 탭 손상을 먼저 확인하세요.";
    }

    if (issueAreaId === "lighting_socket_wiring") {
      return "부품 교체 전에 전구, 소켓, 커넥터 체결부터 확인하세요.";
    }

    if (issueAreaId === "ignition_misfire_path") {
      return "엔진을 끈 상태에서 코일, 플러그 웰, 커넥터 체결을 먼저 확인하세요.";
    }

    if (issueAreaId === "battery_terminal_corrosion") {
      return "배터리 터미널 부식을 확인하고 클램프 체결 상태를 먼저 점검하세요.";
    }

    if (issueAreaId === "wheel_well_underbody_rust") {
      return "녹 부위가 표면 녹인지 들뜸이나 구조 손상인지 먼저 구분하세요.";
    }

    return "시야가 충분하지 않으면 더 점검한 뒤 판단하세요.";
  }

  if (issueAreaId === "accessory_drive_belt_path") {
    return confidence === "low"
      ? "Visibility on the belt path is still limited. With the engine off, get a clearer view of the belt, tensioner, and pulley faces."
      : "With the engine off and cooled, inspect the belt path, tensioner, and pulley alignment first.";
  }

  if (issueAreaId === "coolant_leak_source") {
    return "Inspect the coolant leak source before driving farther.";
  }

  if (issueAreaId === "connector_and_harness_fitment") {
    return "With the engine off, inspect connector fitment, corrosion, and locking-tab damage first.";
  }

  if (issueAreaId === "lighting_socket_wiring") {
    return "Start with the bulb, socket, and connector fit before replacing parts.";
  }

  if (issueAreaId === "ignition_misfire_path") {
    return "With the engine off, inspect coil seating, plug-well condition, and connector fitment first.";
  }

  if (issueAreaId === "battery_terminal_corrosion") {
    return "Inspect the battery terminal corrosion and clamp fit before replacing parts.";
  }

  if (issueAreaId === "wheel_well_underbody_rust") {
    return "Confirm whether the rust is only surface-level or if the metal is flaking or structural.";
  }

  return "Inspect further before deciding whether it is safe to keep driving.";
}

function getConservativeDisclaimer(
  language: SessionLanguage,
  confidence: ConfidenceLevel,
  hasWeakEvidence: boolean,
) {
  if (language === "ko") {
    if (confidence === "low" || hasWeakEvidence) {
      return "이 결과는 제한된 기록에 기반한 보조 판단입니다. 시야가 충분하지 않으면 더 점검하고, 위험이 의심되면 여기서 멈추세요.";
    }

    return "이 결과는 제한된 기록에 기반한 보조 판단입니다. 분명하지 않으면 더 점검하고 무리해서 주행하지 마세요.";
  }

  if (confidence === "low" || hasWeakEvidence) {
    return "This result is based on limited inspection evidence. If visibility is still weak, inspect further and stop here if the risk is unclear.";
  }

  return "This result is an inspection aid, not a guaranteed diagnosis. If the cause is still unclear, inspect further before driving.";
}

function mapIssueAreaToMatchedRule(issueAreaId: TruckIssueAreaId | undefined) {
  if (!issueAreaId) {
    return "insufficient_evidence" as const;
  }

  if (issueAreaId === "accessory_drive_belt_path") {
    return "belt_pulley" as const;
  }

  if (issueAreaId === "coolant_leak_source") {
    return "leak" as const;
  }

  if (issueAreaId === "connector_and_harness_fitment") {
    return "connector" as const;
  }

  if (issueAreaId === "lighting_socket_wiring") {
    return "light" as const;
  }

  if (issueAreaId === "wheel_well_underbody_rust") {
    return "rust" as const;
  }

  return "sound" as const;
}

function buildBookmarkCounts(session: RepairSessionSnapshot) {
  return session.evidence.bookmarks.reduce<Partial<Record<BookmarkType, number>>>(
    (counts, bookmark) => {
      counts[bookmark.bookmarkType] = (counts[bookmark.bookmarkType] ?? 0) + 1;
      return counts;
    },
    {},
  );
}

function buildRelatedCaptureCounts(session: RepairSessionSnapshot) {
  return session.evidence.captures.reduce<Partial<Record<BookmarkType, number>>>(
    (counts, capture) => {
      if (capture.relatedBookmarkType) {
        counts[capture.relatedBookmarkType] =
          (counts[capture.relatedBookmarkType] ?? 0) + 1;
      }

      return counts;
    },
    {},
  );
}

function getRepeatedTranscriptKeywords(session: RepairSessionSnapshot) {
  const transcriptText = session.evidence.conversation
    .filter((message) => {
      return (
        message.role === "user" &&
        isTranscriptStrongForGrounding(session.sessionLanguage, message.text)
      );
    })
    .map((message) => message.text)
    .join(" ");
  const normalizedText = normalizeText(transcriptText);
  const candidateTerms = [
    "belt",
    "pulley",
    "idler",
    "tensioner",
    "alternator",
    "chirp",
    "squeal",
    "connector",
    "tab",
    "corrosion",
    "leak",
    "coolant",
    "hose",
    "socket",
    "wiring",
    "misfire",
    "coil",
    "spark plug",
    "rust",
    "wheel well",
    "battery terminal",
    "벨트",
    "풀리",
    "텐셔너",
    "아이들",
    "커넥터",
    "누유",
    "냉각수",
    "호스",
    "소켓",
    "배선",
    "실화",
    "코일",
    "녹",
    "휠하우스",
    "배터리 터미널",
  ];

  return candidateTerms.filter((term) => countOccurrences(normalizedText, term) >= 1);
}

export function buildEvidenceFusionContext(
  session: RepairSessionSnapshot,
  result?: RepairResult | null,
): EvidenceFusionContext {
  const collected = collectSessionGroundingEvidence(session, result);
  const lookup: TruckKnowledgeLookup = {
    bookmarkTypes: collected.bookmarkTypes,
    issueAreaIds: collected.issueAreaIds,
    partIds: collected.partIds,
    symptomIds: collected.symptomIds,
  };

  return {
    bookmarkCounts: buildBookmarkCounts(session),
    groundedIssueAreaCandidates: identifyLikelyIssueAreaCandidates({
      result,
      session,
    }),
    lookup,
    matchedIssueAreaIds: collected.issueAreaIds,
    matchedPartIds: collected.partIds,
    matchedSymptomIds: collected.symptomIds,
    relatedCaptureCounts: buildRelatedCaptureCounts(session),
    repeatedTranscriptKeywords: getRepeatedTranscriptKeywords(session),
    topEscalation: getEscalationGuidance(lookup)[0],
  };
}

export function buildNormalizedGroundedRepairResult(
  session: RepairSessionSnapshot,
  result: RepairResult,
): RepairResult {
  const language = getResultLanguage(session);
  const fusion = buildEvidenceFusionContext(session, result);
  const groundedHints = buildGroundedResultHints({
    result,
    session,
  });
  const topCandidate = fusion.groundedIssueAreaCandidates[0];
  const issueAreaId = topCandidate?.issueAreaId;
  const confidence = topCandidate?.confidence ?? result.confidence;
  const hasWeakEvidence =
    session.evidence.captures.length === 0 || session.evidence.bookmarks.length === 0;
  const recommendation =
    fusion.topEscalation?.recommendation ?? result.recommendation;
  const severity =
    recommendation === "SHOP_REQUIRED"
      ? "red"
      : recommendation === "INSPECT_ONLY"
        ? "yellow"
        : "green";
  const likelyIssueArea = issueAreaId
    ? getIssueAreaLabel(language, issueAreaId)
    : result.likelyIssueArea;
  const nextSafeStep =
    groundedHints.nextSafeStepHint ??
    (issueAreaId
      ? getIssueAreaNextSafeStep(language, issueAreaId, confidence)
      : result.nextSafeStep);
  const inspectNext = Array.from(
    new Set([
      ...(issueAreaId ? getIssueAreaInspectNext(language, issueAreaId) : []),
      ...groundedHints.inspectNext,
      ...result.inspectNext,
    ]),
  ).slice(0, 4);
  const disclaimer = getConservativeDisclaimer(
    language,
    confidence,
    hasWeakEvidence,
  );
  const supportingEvidence = Array.from(
    new Map(
      result.supportingEvidence.map((item) => [
        `${item.kind}:${item.label}:${item.detail ?? ""}`,
        item,
      ]),
    ).values(),
  ) satisfies ResultEvidenceItem[];

  return {
    ...result,
    confidence,
    severity,
    recommendation,
    likelyIssueArea,
    matchedRule:
      result.matchedRule === "frames_only" ||
      result.matchedRule === "insufficient_evidence"
        ? mapIssueAreaToMatchedRule(issueAreaId)
        : result.matchedRule,
    nextSafeStep,
    inspectNext,
    disclaimer,
    supportingEvidence,
  };
}
