import {
  getPartDefinition,
  getTruckKnowledgeBase,
  type TruckInspectionTargetId,
  type TruckPartId,
} from "@/lib/knowledge";
import { isTranscriptStrongForGrounding } from "@/lib/session/transcript-language";
import type {
  BookmarkType,
  RepairSessionSnapshot,
  SessionLanguage,
} from "@/lib/types/session";

export type VisibleTruckTargetId =
  | "front_accessory_drive_area"
  | "belt"
  | "tensioner"
  | "idler_pulley"
  | "alternator"
  | "battery"
  | "battery_terminal"
  | "coolant_reservoir"
  | "radiator_hose"
  | "coolant_hose"
  | "connector"
  | "light_socket_wiring"
  | "headlight_housing"
  | "taillight_housing"
  | "wheel_well_rust"
  | "underbody_rust"
  | "ignition_coil"
  | "spark_plug"
  | "engine_top"
  | "leak_source_area"
  | "unknown";

export type VisibleTruckTargetConfidence = "low" | "medium" | "high";

export interface VisibleTruckTargetDefinition {
  id: VisibleTruckTargetId;
  aliases: string[];
  inspectionTargetId?: TruckInspectionTargetId;
  label: Record<SessionLanguage, string>;
  partIds?: TruckPartId[];
  symptomCues?: string[];
}

export interface VisibleTruckTargetCandidate {
  confidence: VisibleTruckTargetConfidence;
  hasDirectEvidence: boolean;
  id: VisibleTruckTargetId;
  identified: boolean;
  inspectionTargetId?: TruckInspectionTargetId;
  label: string;
  matchedTerms: string[];
  score: number;
}

const PART_ALIAS_INDEX: Partial<Record<TruckPartId, string[]>> = {
  alternator_area: ["alternator", "alternator pulley", "charging pulley"],
  battery_terminal: ["battery terminal", "battery post", "terminal clamp"],
  belt: ["belt", "serpentine belt", "drive belt"],
  coil: ["coil", "coil pack", "ignition coil"],
  connector: ["connector", "plug", "lock tab", "locking tab"],
  coolant_hose: ["hose", "coolant hose", "radiator hose", "upper hose", "lower hose"],
  idler_pulley: ["idler pulley", "idler", "guide pulley"],
  lamp_socket: ["light housing", "lamp socket", "socket", "lamp harness"],
  spark_plug: ["spark plug", "plug well", "spark plug area"],
  tensioner: ["tensioner", "belt tensioner", "tensioner pulley"],
};

const VISIBLE_TRUCK_TARGETS: VisibleTruckTargetDefinition[] = [
  {
    id: "front_accessory_drive_area",
    label: { en: "Front accessory drive area", ko: "앞쪽 액세서리 드라이브 구역" },
    aliases: [
      "front accessory drive",
      "accessory drive area",
      "belt path",
      "front of the engine",
      "engine front",
      "serpentine area",
      "front drive area",
      "액세서리 드라이브",
      "엔진 앞쪽",
      "벨트 경로",
    ],
    partIds: ["front_accessory_drive", "belt", "tensioner", "idler_pulley", "alternator_area"],
    inspectionTargetId: "front_accessory_drive_path",
    symptomCues: ["chirp", "squeal", "wobble", "belt dust"],
  },
  {
    id: "belt",
    label: { en: "Belt", ko: "벨트" },
    aliases: buildPartAliases("belt"),
    partIds: ["belt"],
    inspectionTargetId: "front_accessory_drive_path",
    symptomCues: ["chirp", "squeal", "tracking"],
  },
  {
    id: "tensioner",
    label: { en: "Tensioner", ko: "텐셔너" },
    aliases: buildPartAliases("tensioner"),
    partIds: ["tensioner"],
    inspectionTargetId: "front_accessory_drive_path",
    symptomCues: ["chirp", "wobble", "tracking"],
  },
  {
    id: "idler_pulley",
    label: { en: "Idler pulley", ko: "아이들 풀리" },
    aliases: buildPartAliases("idler_pulley"),
    partIds: ["idler_pulley"],
    inspectionTargetId: "front_accessory_drive_path",
    symptomCues: ["chirp", "wobble", "rough pulley face"],
  },
  {
    id: "alternator",
    label: { en: "Alternator", ko: "알터네이터" },
    aliases: [
      ...buildPartAliases("alternator_area"),
      "charging unit",
      "generator",
      "charging pulley",
      "발전기",
    ],
    partIds: ["alternator_area"],
    inspectionTargetId: "alternator_mount_and_case",
    symptomCues: ["charging issue", "wobble", "belt dust"],
  },
  {
    id: "battery",
    label: { en: "Battery", ko: "배터리" },
    aliases: [
      "battery",
      "battery top",
      "battery case",
      "battery tray",
      "battery hold down",
      "positive side of battery",
      "negative side of battery",
      "배터리",
      "배터리 상단",
      "배터리 케이스",
    ],
    inspectionTargetId: "battery_terminal_and_ground",
    symptomCues: ["corrosion", "loose clamp", "charging"],
  },
  {
    id: "battery_terminal",
    label: { en: "Battery terminal", ko: "배터리 터미널" },
    aliases: [
      ...buildPartAliases("battery_terminal"),
      "positive terminal",
      "negative terminal",
      "battery post",
      "terminal post",
      "플러스 단자",
      "마이너스 단자",
    ],
    partIds: ["battery_terminal"],
    inspectionTargetId: "battery_terminal_and_ground",
    symptomCues: ["corrosion", "white powder", "green powder"],
  },
  {
    id: "coolant_reservoir",
    label: { en: "Coolant reservoir", ko: "냉각수 리저버" },
    aliases: [
      "coolant reservoir",
      "reservoir",
      "overflow bottle",
      "overflow tank",
      "degas bottle",
      "degas tank",
      "리저버",
      "냉각수 탱크",
      "보조 탱크",
    ],
    inspectionTargetId: "coolant_hose_and_crossover",
    symptomCues: ["coolant smell", "wet seam", "seep"],
  },
  {
    id: "radiator_hose",
    label: { en: "Radiator hose", ko: "라디에이터 호스" },
    aliases: [
      ...buildPartAliases("coolant_hose"),
      "radiator hose",
      "upper hose",
      "lower hose",
      "라디에이터 호스",
      "상부 호스",
      "하부 호스",
    ],
    partIds: ["coolant_hose"],
    inspectionTargetId: "coolant_hose_and_crossover",
    symptomCues: ["coolant smell", "leak", "wet clamp"],
  },
  {
    id: "coolant_hose",
    label: { en: "Coolant hose", ko: "냉각수 호스" },
    aliases: [
      ...buildPartAliases("coolant_hose"),
      "hose",
      "coolant hose",
      "crossover",
      "clamp",
      "호스",
      "냉각수 호스",
      "크로스오버",
      "클램프",
    ],
    partIds: ["coolant_hose"],
    inspectionTargetId: "coolant_hose_and_crossover",
    symptomCues: ["coolant smell", "leak", "wet hose"],
  },
  {
    id: "connector",
    label: { en: "Connector", ko: "커넥터" },
    aliases: [
      ...buildPartAliases("connector"),
      "electrical connector",
      "harness plug",
      "plug body",
      "배선 커넥터",
      "하네스 커넥터",
    ],
    partIds: ["connector"],
    inspectionTargetId: "connector_fitment_and_corrosion",
    symptomCues: ["loose tab", "corrosion", "broken lock"],
  },
  {
    id: "light_socket_wiring",
    label: { en: "Light socket / wiring", ko: "등화 소켓 / 배선" },
    aliases: [
      ...buildPartAliases("lamp_socket"),
      "light housing",
      "bulb",
      "housing",
      "lamp",
      "light socket",
      "pigtail",
      "lamp pigtail",
      "wiring",
      "전구",
      "등화",
      "배선",
      "소켓",
    ],
    partIds: ["lamp_socket", "light_bulb", "connector"],
    inspectionTargetId: "lamp_socket_and_harness",
    symptomCues: ["hyperflash", "dead lamp", "melted socket"],
  },
  {
    id: "headlight_housing",
    label: { en: "Headlight housing", ko: "헤드라이트 하우징" },
    aliases: [
      "headlight housing",
      "headlight",
      "front lamp housing",
      "front light housing",
      "헤드라이트",
      "전조등 하우징",
      "앞등 하우징",
    ],
    partIds: ["lamp_socket", "light_bulb", "connector"],
    inspectionTargetId: "lamp_socket_and_harness",
    symptomCues: ["hyperflash", "dead lamp", "socket issue"],
  },
  {
    id: "taillight_housing",
    label: { en: "Taillight housing", ko: "테일라이트 하우징" },
    aliases: [
      "taillight housing",
      "tail light housing",
      "taillight",
      "rear lamp housing",
      "tail lamp",
      "테일라이트",
      "후미등 하우징",
      "뒷등 하우징",
    ],
    partIds: ["lamp_socket", "light_bulb", "connector"],
    inspectionTargetId: "lamp_socket_and_harness",
    symptomCues: ["hyperflash", "dead lamp", "socket issue"],
  },
  {
    id: "wheel_well_rust",
    label: { en: "Wheel well / rust area", ko: "휠하우스 / 녹 부위" },
    aliases: ["wheel well", "underbody", "rust area", "wheel arch", "휠하우스", "하부", "녹", "부식"],
    inspectionTargetId: "wheel_well_underbody",
    symptomCues: ["rust", "flaking metal", "wheel arch rust"],
  },
  {
    id: "underbody_rust",
    label: { en: "Underbody rust area", ko: "하부 녹 부위" },
    aliases: [
      "underbody rust",
      "frame rust",
      "underbody seam",
      "bottom rust",
      "하부 녹",
      "프레임 녹",
      "하부 이음부",
    ],
    inspectionTargetId: "wheel_well_underbody",
    symptomCues: ["rust", "flaking metal", "underbody corrosion"],
  },
  {
    id: "ignition_coil",
    label: { en: "Ignition coil", ko: "점화 코일" },
    aliases: [
      ...buildPartAliases("coil"),
      "coil on plug",
      "cop",
      "coil area",
      "코일 온 플러그",
      "코일 부위",
    ],
    partIds: ["coil"],
    inspectionTargetId: "coil_and_plug_well",
    symptomCues: ["misfire", "rough running", "tick near coil"],
  },
  {
    id: "spark_plug",
    label: { en: "Spark plug", ko: "점화플러그" },
    aliases: buildPartAliases("spark_plug"),
    partIds: ["spark_plug"],
    inspectionTargetId: "coil_and_plug_well",
    symptomCues: ["misfire", "plug well", "tick near plug"],
  },
  {
    id: "engine_top",
    label: { en: "Engine top / timing area", ko: "엔진 상부 / 타이밍 구역" },
    aliases: [
      "top of engine",
      "top front of engine",
      "upper engine",
      "timing area",
      "timing cover",
      "cam phaser area",
      "timing chain area",
      "valve cover area",
      "engine top",
      "엔진 상부",
      "엔진 윗쪽",
      "엔진 앞윗쪽",
      "타이밍 구역",
      "캠 페이저 구역",
    ],
    inspectionTargetId: "coil_and_plug_well",
    symptomCues: ["tick", "ticking", "cam phaser", "top-engine noise"],
  },
  {
    id: "leak_source_area",
    label: { en: "Leak source area", ko: "누유 시작 지점" },
    aliases: [
      "leak source",
      "drip point",
      "wet path",
      "fluid source",
      "wet spot",
      "fluid trail",
      "where the leak starts",
      "누유 시작 지점",
      "젖은 경로",
      "누유 원점",
    ],
    inspectionTargetId: "fluid_source_path",
    symptomCues: ["leak", "drip", "coolant smell", "wet trail"],
  },
  {
    id: "unknown",
    label: { en: "Unknown", ko: "식별 불가" },
    aliases: [],
  },
];

function buildPartAliases(partId: TruckPartId) {
  const part = getPartDefinition(partId);

  return Array.from(
    new Set([
      part?.id,
      part?.label,
      ...(part?.aliases ?? []),
      ...(PART_ALIAS_INDEX[partId] ?? []),
    ].filter((value): value is string => Boolean(value))),
  );
}

function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getMatchingAliases(text: string, aliases: string[]) {
  const normalizedText = normalizeText(text);

  if (!normalizedText) {
    return [];
  }

  return aliases.filter((alias) => {
    const normalizedAlias = normalizeText(alias);

    if (!normalizedAlias) {
      return false;
    }

    return (
      normalizedText.includes(normalizedAlias) ||
        normalizedAlias.includes(normalizedText)
    );
  });
}

function getLatestUserText(session: RepairSessionSnapshot) {
  for (let index = session.evidence.conversation.length - 1; index >= 0; index -= 1) {
    const message = session.evidence.conversation[index];

    if (message?.role === "user" && message.text.trim()) {
      return message.text.trim();
    }
  }

  return "";
}

function getSpecificAliasBonus(matches: string[]) {
  return matches.some((alias) => normalizeText(alias).split(" ").length >= 2) ? 1 : 0;
}

function isBroadVisibleTruckTarget(targetId: VisibleTruckTargetId) {
  return [
    "front_accessory_drive_area",
    "battery",
    "coolant_reservoir",
    "light_socket_wiring",
    "headlight_housing",
    "taillight_housing",
    "wheel_well_rust",
    "underbody_rust",
    "engine_top",
    "leak_source_area",
  ].includes(targetId);
}

function buildVisibleTargetScore(
  definition: VisibleTruckTargetDefinition,
  session: RepairSessionSnapshot,
) {
  const latestBookmark = session.evidence.bookmarks.at(-1);
  const latestCapture = session.evidence.captures.at(-1);
  const latestBookmarkText = latestBookmark?.note?.trim() ?? "";
  const latestUserTextRaw = getLatestUserText(session);
  const latestUserText = isTranscriptStrongForGrounding(
    session.sessionLanguage,
    latestUserTextRaw,
  )
    ? latestUserTextRaw
    : "";
  const matchedTerms = new Set<string>();
  let hasDirectEvidence = false;
  let score = 0;

  const userAliasMatches = getMatchingAliases(latestUserText, definition.aliases);

  if (userAliasMatches.length > 0) {
    score += 4 + getSpecificAliasBonus(userAliasMatches);
    hasDirectEvidence = true;
    userAliasMatches.forEach((alias) => matchedTerms.add(alias));
  }

  const bookmarkAliasMatches = getMatchingAliases(latestBookmarkText, definition.aliases);

  if (bookmarkAliasMatches.length > 0) {
    score += 3 + getSpecificAliasBonus(bookmarkAliasMatches);
    hasDirectEvidence = true;
    bookmarkAliasMatches.forEach((alias) => matchedTerms.add(alias));
  }

  if (definition.symptomCues?.length) {
    const userSymptomCueMatches = getMatchingAliases(latestUserText, definition.symptomCues);
    const bookmarkSymptomCueMatches = getMatchingAliases(
      latestBookmarkText,
      definition.symptomCues,
    );

    if (userSymptomCueMatches.length > 0) {
      score += 1;
      userSymptomCueMatches.forEach((cue) => matchedTerms.add(cue));
    }

    if (bookmarkSymptomCueMatches.length > 0) {
      score += 1;
      bookmarkSymptomCueMatches.forEach((cue) => matchedTerms.add(cue));
    }
  }

  if (latestBookmark?.bookmarkType === "connector" && definition.id === "connector") {
    score += 4;
    hasDirectEvidence = true;
    matchedTerms.add(latestBookmark.bookmarkType);
  }

  if (
    latestCapture?.relatedBookmarkType === "connector" &&
    definition.id === "connector"
  ) {
    score += 2;
    hasDirectEvidence = true;
  }

  if (latestBookmark?.bookmarkType === "belt_pulley") {
    if (definition.id === "front_accessory_drive_area") {
      score += 4;
      hasDirectEvidence = true;
    }

    if (
      ["belt", "tensioner", "idler_pulley", "alternator"].includes(definition.id)
    ) {
      score += 1;
    }
  }

  if (latestCapture?.relatedBookmarkType === "belt_pulley") {
    if (definition.id === "front_accessory_drive_area") {
      score += 2;
      hasDirectEvidence = true;
    }
  }

  if (latestBookmark?.bookmarkType === "leak") {
    if (definition.id === "leak_source_area") {
      score += 4;
      hasDirectEvidence = true;
    }

    if (
      ["coolant_reservoir", "radiator_hose", "coolant_hose"].includes(
        definition.id,
      )
    ) {
      score += 2;
    }
  }

  if (latestCapture?.relatedBookmarkType === "leak") {
    if (definition.id === "leak_source_area") {
      score += 2;
      hasDirectEvidence = true;
    }
  }

  if (latestBookmark?.bookmarkType === "light") {
    if (definition.id === "light_socket_wiring") {
      score += 3;
      hasDirectEvidence = true;
    }

    if (["headlight_housing", "taillight_housing"].includes(definition.id)) {
      score += 2;
    }
  }

  if (latestCapture?.relatedBookmarkType === "light") {
    if (definition.id === "light_socket_wiring") {
      score += 2;
      hasDirectEvidence = true;
    }
  }

  if (latestBookmark?.bookmarkType === "rust") {
    if (["wheel_well_rust", "underbody_rust"].includes(definition.id)) {
      score += 3;
      hasDirectEvidence = true;
    }
  }

  if (latestCapture?.relatedBookmarkType === "rust") {
    if (["wheel_well_rust", "underbody_rust"].includes(definition.id)) {
      score += 2;
      hasDirectEvidence = true;
    }
  }

  if (latestBookmark?.bookmarkType === "sound") {
    if (["engine_top", "front_accessory_drive_area"].includes(definition.id)) {
      score += 1;
    }
  }

  return {
    hasDirectEvidence,
    matchedTerms: [...matchedTerms],
    score,
  };
}

function getConfidenceFromScore(score: number): VisibleTruckTargetConfidence {
  if (score >= 6) {
    return "high";
  }

  if (score >= 3) {
    return "medium";
  }

  return "low";
}

export function identifyVisibleTruckTarget(params: {
  session: RepairSessionSnapshot;
}): VisibleTruckTargetCandidate {
  const scored = VISIBLE_TRUCK_TARGETS.filter((definition) => definition.id !== "unknown")
    .map((definition) => {
      const match = buildVisibleTargetScore(definition, params.session);

      return {
        confidence: getConfidenceFromScore(match.score),
        hasDirectEvidence: match.hasDirectEvidence,
        id: definition.id,
        identified: match.hasDirectEvidence && match.score >= 3,
        inspectionTargetId: definition.inspectionTargetId,
        label: definition.label[params.session.sessionLanguage],
        matchedTerms: match.matchedTerms,
        score: match.score,
      } satisfies VisibleTruckTargetCandidate;
    })
    .sort((left, right) => right.score - left.score);

  const top = scored[0];
  const runnerUp = scored[1];

  if (!top || top.score < 3) {
    return {
      confidence: "low",
      hasDirectEvidence: false,
      id: "unknown",
      identified: false,
      label: VISIBLE_TRUCK_TARGETS.find((item) => item.id === "unknown")?.label[
        params.session.sessionLanguage
      ] ?? "Unknown",
      matchedTerms: [],
      score: 0,
    };
  }

  const topNeedsMoreConfirmation =
    isBroadVisibleTruckTarget(top.id) && top.confidence !== "high";
  const isAmbiguous =
    Boolean(runnerUp) &&
    top.score - (runnerUp?.score ?? 0) <= 1 &&
    (topNeedsMoreConfirmation || runnerUp?.hasDirectEvidence || top.matchedTerms.length === 0);

  if (isAmbiguous) {
    return {
      confidence: "low",
      hasDirectEvidence: false,
      id: "unknown",
      identified: false,
      label: VISIBLE_TRUCK_TARGETS.find((item) => item.id === "unknown")?.label[
        params.session.sessionLanguage
      ] ?? "Unknown",
      matchedTerms: [],
      score: 0,
    };
  }

  return top;
}

export function getVisibleTruckTargetDefinition(targetId: VisibleTruckTargetId) {
  return VISIBLE_TRUCK_TARGETS.find((target) => target.id === targetId);
}

export function getVisibleTruckTargetFallbackPrompt(
  language: SessionLanguage,
  latestBookmarkType?: BookmarkType,
) {
  if (latestBookmarkType === "belt_pulley") {
    return language === "ko"
      ? "액세서리 드라이브 전체를 먼저 보여주세요."
      : "Show me the full front accessory drive area.";
  }

  if (latestBookmarkType === "connector") {
    return language === "ko"
      ? "커넥터 쪽으로 더 가까이 보여주세요."
      : "Move closer to the connector.";
  }

  if (latestBookmarkType === "leak") {
    return language === "ko"
      ? "누유가 시작되는 지점을 보여주세요."
      : "Show me where the leak starts.";
  }

  if (latestBookmarkType === "light") {
    return language === "ko"
      ? "등화 하우징과 커넥터 쪽을 보여주세요."
      : "Show me the light housing and connector side.";
  }

  if (latestBookmarkType === "rust") {
    return language === "ko"
      ? "휠하우스나 하부 녹 부위를 더 선명하게 보여주세요."
      : "I need a clearer view of the wheel well or underbody.";
  }

  if (latestBookmarkType === "sound") {
    return language === "ko"
      ? "소리가 가장 강한 부위를 다시 보여주세요."
      : "Show me the area where the sound is strongest.";
  }

  return language === "ko"
    ? "현재 보고 있는 부위를 다시 보여주세요."
    : "Show me the current area again.";
}

export function getVisibleTruckTargetLocationHint(
  targetId: VisibleTruckTargetId,
  language: SessionLanguage,
) {
  const customHints: Partial<Record<VisibleTruckTargetId, string>> =
    language === "ko"
      ? {
          front_accessory_drive_area:
            "벨트 경로 전체가 한 프레임에 보이게 유지하세요.",
          battery: "배터리 상단과 양쪽 터미널이 함께 보이게 유지하세요.",
          radiator_hose: "호스와 클램프를 같은 프레임에 담아 주세요.",
          coolant_hose: "연결부와 젖은 자국이 함께 보이게 유지하세요.",
          headlight_housing:
            "하우징과 커넥터 쪽이 함께 보이게 유지하세요.",
          taillight_housing:
            "하우징과 커넥터 쪽이 함께 보이게 유지하세요.",
          wheel_well_rust: "녹 부위와 주변 이음부를 같이 보여주세요.",
          underbody_rust: "하부 이음부와 주변 브래킷을 같이 보여주세요.",
          engine_top: "엔진 윗앞쪽을 2초 정도 흔들림 없이 보여주세요.",
          leak_source_area: "젖은 자국을 위쪽으로 따라가며 보여주세요.",
        }
      : {
          front_accessory_drive_area:
            "Keep the full belt path in the same frame first.",
          battery: "Keep the battery top and both terminals in frame.",
          radiator_hose: "Keep the hose and clamp in the same frame.",
          coolant_hose: "Keep the connection and any wet area in frame.",
          headlight_housing:
            "Keep the housing and connector side in the same frame.",
          taillight_housing:
            "Keep the housing and connector side in the same frame.",
          wheel_well_rust: "Keep the rust area and nearby seam in frame.",
          underbody_rust: "Keep the underbody seam and nearby bracket in frame.",
          engine_top: "Hold the top front of the engine steady for two seconds.",
          leak_source_area: "Trace the wet path upward to the highest visible source.",
        };

  if (customHints[targetId]) {
    return customHints[targetId];
  }

  const target = getVisibleTruckTargetDefinition(targetId);
  const inspectionTargetId = target?.inspectionTargetId;

  if (!inspectionTargetId) {
    return language === "ko"
      ? "같은 부위를 흔들림 없이 2초 정도 보여주세요."
      : "Hold the same area steady for two seconds.";
  }

  return (
    getTruckKnowledgeBase().inspectionTargets[inspectionTargetId]?.locationHint ??
    (language === "ko"
      ? "같은 부위를 흔들림 없이 2초 정도 보여주세요."
      : "Hold the same area steady for two seconds.")
  );
}
