// Engine sound fingerprint library for the Gemini Live "listen mode."
//
// When the user holds the phone near a running engine, the AI receives ~5s
// of wide-band 48kHz audio (echo cancellation / noise suppression disabled
// for that window). The model classifies the sound against this fingerprint
// table, then fuses the result with the visual + bookmark evidence stream
// to produce a DIY/Inspect/Shop triage.
//
// IDs here become the `fingerprintId` enum on the analyzeEngineSound tool.

import type { RecommendationBias } from "./types";

export type EngineSoundId =
  | "chirp_idle"
  | "chirp_cold"
  | "belt_squeal_rev"
  | "coolant_squeal"
  | "phaser_rattle_startup"
  | "lifter_tick"
  | "injector_tick"
  | "exhaust_manifold_tick"
  | "rod_knock"
  | "detonation_ping"
  | "ps_pump_whine"
  | "turbo_whine_normal"
  | "turbo_whine_pitched"
  | "wheel_bearing_whine"
  | "vacuum_hiss"
  | "exhaust_hiss"
  | "iwe_grind"
  | "coolant_gurgle"
  | "lope_idle"
  | "no_signal"
  | "speech_contamination"
  | "wind_contamination";

export interface EngineSoundDefinition {
  id: EngineSoundId;
  signature: {
    en: string;
    ko: string;
  };
  likelyCauses: string[];
  candidatePartAliases: string[]; // free-text aliases — map via existing alias table
  candidateSymptomIds: string[]; // map to TruckSymptomId — use as hints, not strict types
  recommendationBias: RecommendationBias;
  fusion: {
    askForVisual: boolean;
    hardEscalate: boolean; // forces shop_required regardless of other evidence
  };
}

export const ENGINE_SOUNDS: Record<EngineSoundId, EngineSoundDefinition> = {
  chirp_idle: {
    id: "chirp_idle",
    signature: {
      en: "High-pitched periodic squeak at 600-900 rpm, fades on rev",
      ko: "공회전(600-900 rpm)에서 주기적인 고음 끽 소리, rpm 올리면 사라짐",
    },
    likelyCauses: ["dry belt", "glazed belt", "idler bearing dry"],
    candidatePartAliases: ["serpentine belt", "idler pulley", "tensioner pulley"],
    candidateSymptomIds: ["chirp", "noise"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  chirp_cold: {
    id: "chirp_cold",
    signature: {
      en: "Chirp only on cold start, gone after 30 seconds",
      ko: "찬 시동 시에만 발생, 30초 후 사라짐",
    },
    likelyCauses: ["tensioner damper weak", "belt slip on cold belt"],
    candidatePartAliases: ["tensioner", "serpentine belt"],
    candidateSymptomIds: ["chirp", "noise"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  belt_squeal_rev: {
    id: "belt_squeal_rev",
    signature: {
      en: "Sharp squeal that rises with rpm",
      ko: "rpm 올리면 같이 올라가는 날카로운 끽 소리",
    },
    likelyCauses: ["belt glaze", "belt wet with fluid", "seized pulley"],
    candidatePartAliases: ["serpentine belt", "idler pulley", "tensioner pulley"],
    candidateSymptomIds: ["squeal", "chirp"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  coolant_squeal: {
    id: "coolant_squeal",
    signature: {
      en: "Wet squeal plus sweet smell — coolant on the belt",
      ko: "달콤한 냄새와 함께 나는 젖은 끽 소리 — 냉각수가 벨트에",
    },
    likelyCauses: ["coolant on belt from water pump", "leaking radiator hose"],
    candidatePartAliases: ["water pump", "radiator hose", "serpentine belt"],
    candidateSymptomIds: ["squeal", "leak", "coolant_smell"],
    recommendationBias: "shop_required",
    fusion: { askForVisual: true, hardEscalate: true },
  },
  phaser_rattle_startup: {
    id: "phaser_rattle_startup",
    signature: {
      en: "Brief 1-3s rattle on cold start, top-end of engine (5.4L 3V signature)",
      ko: "찬 시동 1-3초간의 짧은 떨림, 엔진 상단 (5.4L 3V 특유)",
    },
    likelyCauses: ["cam phaser worn", "low residual oil pressure to phaser"],
    candidatePartAliases: ["cam phaser", "VCT solenoid"],
    candidateSymptomIds: ["ticking", "rattle"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  lifter_tick: {
    id: "lifter_tick",
    signature: {
      en: "Rhythmic tick locked to half engine speed",
      ko: "엔진 회전수의 절반에 맞춰 일정하게 나는 똑똑 소리",
    },
    likelyCauses: ["hydraulic lifter collapsing", "low oil"],
    candidatePartAliases: ["lifter", "oil pump"],
    candidateSymptomIds: ["ticking"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  injector_tick: {
    id: "injector_tick",
    signature: {
      en: "Crisp tick locked to engine speed, audible top-end",
      ko: "엔진 회전에 정확히 맞춰 나는 또렷한 똑똑 소리",
    },
    likelyCauses: ["normal injector clatter", "dirty injector"],
    candidatePartAliases: ["fuel injector"],
    candidateSymptomIds: ["ticking"],
    recommendationBias: "diy_safe",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  exhaust_manifold_tick: {
    id: "exhaust_manifold_tick",
    signature: {
      en: "Tick that fades as engine warms, located at exhaust side (5.4L classic)",
      ko: "엔진이 따뜻해지면 사라지는 똑똑 소리, 배기 쪽 (5.4L 특유)",
    },
    likelyCauses: ["cracked exhaust manifold", "broken manifold stud"],
    candidatePartAliases: ["exhaust manifold", "manifold stud"],
    candidateSymptomIds: ["ticking", "exhaust_tick"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  rod_knock: {
    id: "rod_knock",
    signature: {
      en: "Deep dull knock at idle, locked to RPM, louder under load",
      ko: "공회전에서 묵직한 둔탁한 노킹, RPM에 따라, 부하 시 더 크게",
    },
    likelyCauses: ["rod bearing worn", "main bearing worn"],
    candidatePartAliases: ["connecting rod bearing", "crankshaft bearing"],
    candidateSymptomIds: ["ticking", "rattle", "knock"],
    recommendationBias: "shop_required",
    fusion: { askForVisual: false, hardEscalate: true },
  },
  detonation_ping: {
    id: "detonation_ping",
    signature: {
      en: "Metallic ping under acceleration; pre-ignition",
      ko: "가속 시 나는 금속성 핑 소리, 노킹",
    },
    likelyCauses: ["low octane fuel", "carbon in cylinder", "knock sensor failure"],
    candidatePartAliases: ["spark plug", "knock sensor"],
    candidateSymptomIds: ["ticking", "knock"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  ps_pump_whine: {
    id: "ps_pump_whine",
    signature: {
      en: "Whine that rises with steering input or constant idle whine",
      ko: "조향 시 또는 공회전 시 윙윙거리는 소리",
    },
    likelyCauses: ["power steering pump bearing", "low PS fluid", "PS pump cavitation"],
    candidatePartAliases: ["power steering pump"],
    candidateSymptomIds: ["whine", "leak"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  turbo_whine_normal: {
    id: "turbo_whine_normal",
    signature: {
      en: "Smooth rising whine on boost (EcoBoost only) — healthy turbo",
      ko: "부스트 시 부드러운 휘파람 소리 (에코부스트), 정상",
    },
    likelyCauses: ["turbo spinning healthy"],
    candidatePartAliases: ["turbocharger"],
    candidateSymptomIds: ["turbo_whine"],
    recommendationBias: "diy_safe",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  turbo_whine_pitched: {
    id: "turbo_whine_pitched",
    signature: {
      en: "High-pitched whistle on boost — bearing wear",
      ko: "부스트 시 고음 휘파람 — 베어링 마모",
    },
    likelyCauses: ["turbo bearing wear", "compressor wheel imbalance"],
    candidatePartAliases: ["turbocharger"],
    candidateSymptomIds: ["turbo_whine", "boost_loss"],
    recommendationBias: "shop_required",
    fusion: { askForVisual: false, hardEscalate: true },
  },
  wheel_bearing_whine: {
    id: "wheel_bearing_whine",
    signature: {
      en: "Whine that changes pitch with vehicle speed",
      ko: "주행 속도에 따라 변하는 윙윙 소리",
    },
    likelyCauses: ["wheel bearing failing"],
    candidatePartAliases: ["wheel bearing"],
    candidateSymptomIds: ["whine", "vibration"],
    recommendationBias: "shop_required",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  vacuum_hiss: {
    id: "vacuum_hiss",
    signature: {
      en: "Constant hiss at idle, smooths when blocked",
      ko: "공회전 시 일정한 쉭 소리, 막으면 사라짐",
    },
    likelyCauses: ["cracked vacuum line", "intake manifold gasket leak", "PCV stuck"],
    candidatePartAliases: ["vacuum hose", "intake manifold gasket"],
    candidateSymptomIds: ["hiss", "rough_idle"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  exhaust_hiss: {
    id: "exhaust_hiss",
    signature: {
      en: "Tick + hiss combo at exhaust manifold",
      ko: "배기 매니폴드에서 똑똑 + 쉭 소리",
    },
    likelyCauses: ["cracked exhaust manifold", "exhaust manifold gasket leak"],
    candidatePartAliases: ["exhaust manifold"],
    candidateSymptomIds: ["exhaust_tick", "hiss"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  iwe_grind: {
    id: "iwe_grind",
    signature: {
      en: "Grinding from front wheels in 2WD (12th-gen F-150 classic)",
      ko: "2WD 모드에서 앞바퀴에서 나는 갈리는 소리 (12세대 F-150 특유)",
    },
    likelyCauses: ["IWE vacuum leak", "IWE check valve failure", "worn IWE clutch teeth"],
    candidatePartAliases: ["IWE actuator", "IWE vacuum line"],
    candidateSymptomIds: ["clunk", "grind"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  coolant_gurgle: {
    id: "coolant_gurgle",
    signature: {
      en: "Bubbling from coolant reservoir at warm-up",
      ko: "예열 시 냉각수 저장통에서 부글부글 소리",
    },
    likelyCauses: ["air in cooling loop", "head gasket compromised"],
    candidatePartAliases: ["radiator", "head gasket"],
    candidateSymptomIds: ["coolant_smell", "leak"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  lope_idle: {
    id: "lope_idle",
    signature: {
      en: "Uneven low idle, surges and drops",
      ko: "공회전이 일정하지 않고 출렁임",
    },
    likelyCauses: ["vacuum leak", "MAF dirty", "EGR stuck"],
    candidatePartAliases: ["MAF sensor", "intake manifold gasket"],
    candidateSymptomIds: ["rough_idle", "stumble"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  no_signal: {
    id: "no_signal",
    signature: {
      en: "Silence or fan-only — engine off",
      ko: "조용함 — 엔진이 꺼져 있음",
    },
    likelyCauses: ["engine not running", "key on engine off"],
    candidatePartAliases: [],
    candidateSymptomIds: [],
    recommendationBias: "diy_safe",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  speech_contamination: {
    id: "speech_contamination",
    signature: {
      en: "User voice detected in listen window — sample contaminated",
      ko: "측정 중 사용자 음성 감지 — 샘플 오염됨",
    },
    likelyCauses: ["user spoke during listen window"],
    candidatePartAliases: [],
    candidateSymptomIds: [],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  wind_contamination: {
    id: "wind_contamination",
    signature: {
      en: "Wind or road noise dominates — broadband mid-band content",
      ko: "바람이나 도로 소음이 지배적임",
    },
    likelyCauses: ["wind across mic", "open window at speed"],
    candidatePartAliases: [],
    candidateSymptomIds: [],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
};

export function getEngineSound(id: EngineSoundId): EngineSoundDefinition {
  return ENGINE_SOUNDS[id];
}

export function listEngineSoundIds(): EngineSoundId[] {
  return Object.keys(ENGINE_SOUNDS) as EngineSoundId[];
}
