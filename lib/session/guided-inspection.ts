import {
  getInspectionTargetDefinition,
  getTruckKnowledgeBase,
  type TruckInspectionTargetDefinition,
  type TruckInspectionTargetId,
} from "@/lib/knowledge";
import {
  getVisibleTruckTargetDefinition,
  getVisibleTruckTargetFallbackPrompt,
  getVisibleTruckTargetLocationHint,
  identifyVisibleTruckTarget,
} from "@/lib/knowledge/visible-targets";
import {
  buildGroundedInspectionPrompt,
} from "@/lib/session/grounded-inspection";
import { translateExactText } from "@/lib/session/session-language";
import type { RepairResult } from "@/lib/types/result";
import type {
  BookmarkType,
  RepairSessionSnapshot,
  SessionLanguage,
} from "@/lib/types/session";

type GuidedInspectionSource =
  | "bookmark"
  | "conversation"
  | "result"
  | "visible_target"
  | "default";

export interface GuidedInspectionStep {
  instruction: string;
  locationHint: string;
  reason: string;
  source: GuidedInspectionSource;
  targetId: TruckInspectionTargetId;
  targetLabel: string;
}

const BOOKMARK_TARGETS: Partial<Record<BookmarkType, TruckInspectionTargetId>> = {
  belt_pulley: "front_accessory_drive_path",
  connector: "connector_fitment_and_corrosion",
  leak: "fluid_source_path",
  light: "lamp_socket_and_harness",
  rust: "wheel_well_underbody",
};

function getLatestBookmark(session: RepairSessionSnapshot) {
  return session.evidence.bookmarks.at(-1);
}
function getLocalizedInspectionTargetLabel(
  targetId: TruckInspectionTargetId,
  language: SessionLanguage,
) {
  if (language === "en") {
    return getTruckKnowledgeBase().inspectionTargets[targetId]?.label ?? targetId;
  }

  const labels: Partial<Record<TruckInspectionTargetId, string>> = {
    front_accessory_drive_path: "앞쪽 액세서리 드라이브 경로",
    fluid_source_path: "누유 시작 지점",
    connector_fitment_and_corrosion: "커넥터 체결 및 부식 부위",
    lamp_socket_and_harness: "전구 소켓 및 하네스",
    wheel_well_underbody: "휠하우스 / 하부",
    coil_and_plug_well: "코일 및 플러그 웰",
    coolant_hose_and_crossover: "냉각수 호스 및 크로스오버",
    battery_terminal_and_ground: "배터리 터미널 및 접지",
    vacuum_line_routing: "진공 라인 경로",
    alternator_mount_and_case: "알터네이터 마운트 및 하우징",
    battery_top_and_hold_down: "배터리 상단 및 고정 부위",
    coolant_reservoir_and_seam: "냉각수 리저버 및 이음선",
    radiator_hose_neck_and_clamp: "라디에이터 호스 목 및 클램프",
    intake_tube_and_throttle_body: "흡기 튜브 및 스로틀 바디",
    maf_sensor_and_air_box: "MAF 센서 및 에어박스",
    exhaust_manifold_and_heat_shield: "배기 매니폴드 및 히트실드",
    brake_line_and_hose: "브레이크 라인 및 호스",
    front_suspension_joint: "전륜 서스펜션 조인트",
    steering_linkage_end: "조향 링크 끝단",
    transfer_case_and_driveshaft: "트랜스퍼 케이스 및 드라이브샤프트",
    differential_cover_and_pinion: "디퍼렌셜 커버 및 피니언 부위",
    headlamp_housing_and_mount: "헤드램프 하우징 및 마운트",
    taillamp_housing_and_mount: "테일램프 하우징 및 마운트",
    engine_top_timing_cover: "엔진 상부 / 타이밍 커버",
    frame_rust_and_seam: "프레임 녹 및 이음부",
  };

  return labels[targetId] ?? targetId;
}

function getLocalizedInspectionTargetLocationHint(
  target: TruckInspectionTargetDefinition,
  language: SessionLanguage,
) {
  if (language === "en") {
    return target.locationHint;
  }

  const hints: Partial<Record<TruckInspectionTargetId, string>> = {
    front_accessory_drive_path: "엔진 전면 벨트 경로 전체가 보이게 유지하세요.",
    fluid_source_path: "젖은 자국을 아래에서 위로 따라가며 시작 지점을 찾으세요.",
    connector_fitment_and_corrosion: "락 탭, 핀 쪽, 배선 진입부를 차례로 보여주세요.",
    lamp_socket_and_harness: "소켓 안쪽과 짧은 하네스 연결부를 함께 보여주세요.",
    wheel_well_underbody: "휠하우스 안쪽 이음부와 주변 브래킷을 같이 보여주세요.",
    coil_and_plug_well: "코일 고정 부위와 플러그 웰 상단을 흔들림 없이 보여주세요.",
    coolant_hose_and_crossover: "호스 연결부와 크로스오버 맞닿는 부위를 따라 보여주세요.",
    battery_terminal_and_ground: "터미널 클램프와 접지 연결 지점을 가까이 보여주세요.",
    vacuum_line_routing: "라인 경로와 연결 피팅이 한 번에 보이게 유지하세요.",
    alternator_mount_and_case: "풀리 면과 마운트 고정 부위를 같은 프레임에 담으세요.",
  };

  return hints[target.id] ?? translateExactText(language, target.locationHint);
}

function buildVisibleTargetInstruction(
  targetId: ReturnType<typeof identifyVisibleTruckTarget>["id"],
  language: SessionLanguage,
) {
  if (targetId === "front_accessory_drive_area") {
    return language === "ko"
      ? "액세서리 드라이브 전체를 보여주세요."
      : "Show me the full front accessory drive area.";
  }

  if (targetId === "belt") {
    return language === "ko" ? "벨트를 보여주세요." : "Show me the belt.";
  }

  if (targetId === "tensioner") {
    return language === "ko"
      ? "텐셔너와 풀리 면을 보여주세요."
      : "Show me the tensioner and pulley face.";
  }

  if (targetId === "idler_pulley") {
    return language === "ko"
      ? "아이들 풀리 면을 더 가까이 보여주세요."
      : "Move closer to the idler pulley face.";
  }

  if (targetId === "alternator") {
    return language === "ko"
      ? "알터네이터 풀리와 마운트를 보여주세요."
      : "Show me the alternator pulley and mount.";
  }

  if (targetId === "battery") {
    return language === "ko"
      ? "배터리 상단과 양쪽 터미널을 보여주세요."
      : "Show me the battery top and both terminals.";
  }

  if (targetId === "coolant_reservoir") {
    return language === "ko"
      ? "냉각수 리저버와 연결 호스를 보여주세요."
      : "Show me the coolant reservoir and hose connection.";
  }

  if (targetId === "radiator_hose") {
    return language === "ko"
      ? "라디에이터 호스와 클램프를 보여주세요."
      : "Show me the radiator hose and clamp area.";
  }

  if (targetId === "coolant_hose") {
    return language === "ko"
      ? "냉각수 호스와 연결부를 보여주세요."
      : "Show me the coolant hose and connection.";
  }

  if (targetId === "connector") {
    return language === "ko"
      ? "커넥터 윗면과 잠금 탭을 보여주세요."
      : "Show the top of the connector and the locking tab.";
  }

  if (targetId === "battery_terminal") {
    return language === "ko"
      ? "배터리 터미널과 클램프를 보여주세요."
      : "Show me the battery terminal and clamp.";
  }

  if (targetId === "light_socket_wiring") {
    return language === "ko"
      ? "전구 소켓과 짧은 하네스를 보여주세요."
      : "Show me the light socket and short harness.";
  }

  if (targetId === "headlight_housing") {
    return language === "ko"
      ? "헤드라이트 하우징과 커넥터 쪽을 보여주세요."
      : "Show me the headlight housing and connector side.";
  }

  if (targetId === "taillight_housing") {
    return language === "ko"
      ? "테일라이트 하우징과 커넥터 쪽을 보여주세요."
      : "Show me the taillight housing and connector side.";
  }

  if (targetId === "wheel_well_rust") {
    return language === "ko"
      ? "녹 부위와 주변 이음부를 보여주세요."
      : "Show the rust area and the nearby seam.";
  }

  if (targetId === "underbody_rust") {
    return language === "ko"
      ? "하부 녹 부위와 주변 이음부를 보여주세요."
      : "Show me the underbody rust area and nearby seam.";
  }

  if (targetId === "ignition_coil") {
    return language === "ko"
      ? "점화 코일과 커넥터를 보여주세요."
      : "Show me the ignition coil and connector.";
  }

  if (targetId === "spark_plug") {
    return language === "ko"
      ? "플러그 웰과 코일 부위를 보여주세요."
      : "Show me the spark plug well and coil area.";
  }

  if (targetId === "engine_top") {
    return language === "ko"
      ? "엔진 윗앞쪽을 보여주세요."
      : "Show me the top front of the engine.";
  }

  if (targetId === "leak_source_area") {
    return language === "ko"
      ? "누유가 시작되는 지점을 보여주세요."
      : "Show me where the leak starts.";
  }

  return language === "ko"
    ? "2초 정도 흔들리지 않게 고정해 주세요."
    : "Hold still for two seconds.";
}

function buildVisibleTargetReason(
  targetId: ReturnType<typeof identifyVisibleTruckTarget>["id"],
  language: SessionLanguage,
) {
  const label =
    getVisibleTruckTargetDefinition(targetId)?.label[language] ??
    (language === "ko" ? "현재 부위" : "the current area");

  return language === "ko"
    ? `현재 화면이 ${label} 쪽에 가장 가깝습니다.`
    : `The current view looks closest to ${label.toLowerCase()}.`;
}

function getUnknownVisibleTargetLabel(
  language: SessionLanguage,
  latestBookmarkType?: BookmarkType,
) {
  if (latestBookmarkType === "belt_pulley") {
    return language === "ko"
      ? "앞쪽 액세서리 드라이브 구역"
      : "Front accessory drive area";
  }

  if (latestBookmarkType === "connector") {
    return language === "ko" ? "커넥터 구역" : "Connector area";
  }

  if (latestBookmarkType === "leak") {
    return language === "ko" ? "누유 시작 지점" : "Leak source area";
  }

  if (latestBookmarkType === "light") {
    return language === "ko" ? "등화 하우징 / 배선 구역" : "Light housing / wiring area";
  }

  if (latestBookmarkType === "rust") {
    return language === "ko" ? "휠하우스 / 하부 녹 부위" : "Wheel well / underbody rust area";
  }

  if (latestBookmarkType === "sound") {
    return language === "ko" ? "현재 소리 부위" : "Current sound area";
  }

  return language === "ko" ? "현재 화면 부위" : "Current visible area";
}

function buildVisibleTargetStep(params: {
  latestBookmarkType?: BookmarkType;
  session: RepairSessionSnapshot;
}) {
  const language = params.session.sessionLanguage;
  const visibleTarget = identifyVisibleTruckTarget({
    session: params.session,
  });
  const fallbackTargetId =
    (params.latestBookmarkType
      ? BOOKMARK_TARGETS[params.latestBookmarkType]
      : undefined) ?? "front_accessory_drive_path";

  if (!visibleTarget.identified || !visibleTarget.inspectionTargetId) {
    return {
      instruction: getVisibleTruckTargetFallbackPrompt(
        language,
        params.latestBookmarkType,
      ),
      locationHint:
        language === "ko"
          ? "같은 부위를 흔들림 없이 2초 정도 보여주세요."
          : "Hold the same area steady for two seconds.",
      reason:
        language === "ko"
          ? "부품을 아직 분명하게 식별하지 못했습니다."
          : "I cannot identify the part clearly yet.",
      source: "visible_target" as const,
      targetId: fallbackTargetId,
      targetLabel: getUnknownVisibleTargetLabel(
        language,
        params.latestBookmarkType,
      ),
      visibleTarget,
    };
  }

  const inspectionTarget =
    getInspectionTargetDefinition(visibleTarget.inspectionTargetId) ??
    getTruckKnowledgeBase().inspectionTargets.front_accessory_drive_path;

  return {
    instruction: buildVisibleTargetInstruction(visibleTarget.id, language),
    locationHint: getVisibleTruckTargetLocationHint(visibleTarget.id, language),
    reason: buildVisibleTargetReason(visibleTarget.id, language),
    source: "visible_target" as const,
    targetId: inspectionTarget.id,
    targetLabel:
      getVisibleTruckTargetDefinition(visibleTarget.id)?.label[language] ??
      getLocalizedInspectionTargetLabel(inspectionTarget.id, language),
    visibleTarget,
  };
}

function getSourceFromMatchedEvidence(
  sources: Array<"bookmark" | "transcript" | "capture" | "ai_response">,
): GuidedInspectionSource {
  if (sources.includes("bookmark")) {
    return "bookmark";
  }

  if (sources.includes("transcript")) {
    return "conversation";
  }

  if (sources.includes("ai_response")) {
    return "result";
  }

  return "default";
}

export function buildGuidedInspectionStep(params: {
  result?: RepairResult | null;
  session: RepairSessionSnapshot;
}): GuidedInspectionStep {
  const latestBookmark = getLatestBookmark(params.session);
  const visibleTargetStep = buildVisibleTargetStep({
    latestBookmarkType: latestBookmark?.bookmarkType,
    session: params.session,
  });
  const groundedPrompt = buildGroundedInspectionPrompt(params);

  if (!visibleTargetStep.visibleTarget.identified) {
    return {
      instruction: visibleTargetStep.instruction,
      locationHint: visibleTargetStep.locationHint,
      reason: visibleTargetStep.reason,
      source: visibleTargetStep.source,
      targetId: visibleTargetStep.targetId,
      targetLabel: visibleTargetStep.targetLabel,
    };
  }

  if (groundedPrompt) {
    const target =
      getTruckKnowledgeBase().inspectionTargets[groundedPrompt.targetId] ??
      getTruckKnowledgeBase().inspectionTargets.front_accessory_drive_path;
    const language = params.session.sessionLanguage;
    const groundedTargetMatchesVisibleTarget =
      groundedPrompt.targetId === visibleTargetStep.targetId;
    const visibleTargetNeedsMoreConfirmation = [
      "front_accessory_drive_area",
      "battery",
      "headlight_housing",
      "taillight_housing",
      "wheel_well_rust",
      "underbody_rust",
      "engine_top",
      "leak_source_area",
      "light_socket_wiring",
      "coolant_reservoir",
      "radiator_hose",
      "coolant_hose",
      "battery_terminal",
    ].includes(visibleTargetStep.visibleTarget.id);

    if (
      !groundedTargetMatchesVisibleTarget ||
      groundedPrompt.confidence === "low" ||
      (visibleTargetNeedsMoreConfirmation &&
        groundedPrompt.confidence !== "high")
    ) {
      return {
        instruction: visibleTargetStep.instruction,
        locationHint: visibleTargetStep.locationHint,
        reason: visibleTargetStep.reason,
        source: visibleTargetStep.source,
        targetId: visibleTargetStep.targetId,
        targetLabel: visibleTargetStep.targetLabel,
      };
    }

    return {
      instruction: groundedPrompt.instruction,
      locationHint: getLocalizedInspectionTargetLocationHint(target, language),
      reason: groundedPrompt.reasoningNote,
      source: getSourceFromMatchedEvidence(groundedPrompt.matchedSources),
      targetId: groundedPrompt.targetId,
      targetLabel: getLocalizedInspectionTargetLabel(
        groundedPrompt.targetId,
        language,
      ),
    };
  }

  return {
    instruction: visibleTargetStep.instruction,
    locationHint: visibleTargetStep.locationHint,
    reason: visibleTargetStep.reason,
    source: visibleTargetStep.source,
    targetId: visibleTargetStep.targetId,
    targetLabel: visibleTargetStep.targetLabel,
  };
}
