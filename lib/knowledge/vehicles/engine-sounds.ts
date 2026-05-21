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
  | "wind_contamination"
  // ── Per-engine variant signatures ──
  | "triton_5_4_cold_phaser"
  | "triton_5_4_hot_phaser_idle"
  | "triton_5_4_blown_plug_whistle"
  | "triton_4_6_3v_phaser_quiet"
  | "ecoboost_turbo_whoosh"
  | "ecoboost_wastegate_rattle_cold"
  | "ecoboost_bov_chirp_load"
  | "ecoboost_timing_chain_stretch"
  | "coyote_vct_chatter"
  | "coyote_mmt_manifold_tick"
  | "boss_6_2_lope_normal"
  | "boss_6_2_roush_blower_whine"
  | "v6_3_7_chain_rattle_cold"
  // ── Transmission signatures ──
  | "trans_4r75e_tcc_shudder"
  | "trans_4r75e_2_3_flare"
  | "trans_6r80_1_2_flare"
  | "trans_6r80_tcc_shudder"
  | "trans_6r80_valve_body_buzz"
  | "trans_6r80_lead_frame_chirp"
  // ── Fuel-related signatures ──
  | "fuel_e15_misfueling"
  | "fuel_low_octane_ping_under_tow"
  | "fuel_e85_deeper_exhaust_note";

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
  // ── Per-engine variant signatures ──
  triton_5_4_cold_phaser: {
    id: "triton_5_4_cold_phaser",
    signature: {
      en: "5.4 3V Triton: 1-3 second metallic rattle on cold start that fades as oil pressure builds — distinct from a marble-rolling sound",
      ko: "5.4 3V 트라이튼: 차가운 시동 시 1-3초간 금속성 덜덜거림, 오일 압력 올라가면 사라짐 — 콜드 스타트 캠 페이저 특유 소리",
    },
    likelyCauses: ["worn cam phaser", "low oil pressure cold", "VCT solenoid sticking"],
    candidatePartAliases: ["cam phaser", "VCT solenoid", "timing chain"],
    candidateSymptomIds: ["rattle", "ticking"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  triton_5_4_hot_phaser_idle: {
    id: "triton_5_4_hot_phaser_idle",
    signature: {
      en: "5.4 3V Triton hot idle: 'marble in a tin can' continuous tapping, worse at idle, quiets above 1500 rpm — worn phaser",
      ko: "5.4 3V 트라이튼 더운 공회전: 깡통에 구슬 굴리는 듯한 지속적인 소리, 1500rpm 이상에서 약해짐 — 캠 페이저 마모 진행",
    },
    likelyCauses: ["advanced phaser wear", "stretched timing chain"],
    candidatePartAliases: ["cam phaser", "timing chain", "cam phaser kit"],
    candidateSymptomIds: ["rattle"],
    recommendationBias: "shop_required",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  triton_5_4_blown_plug_whistle: {
    id: "triton_5_4_blown_plug_whistle",
    signature: {
      en: "5.4 3V Triton: sharp whistle or hiss traceable to one cylinder — blown spark plug well from ejected 2-piece plug",
      ko: "5.4 3V 트라이튼: 한 실린더에서 들리는 날카로운 휘파람/쉭 소리 — 점화 플러그 분출",
    },
    likelyCauses: ["ejected spark plug", "blown plug well", "missing coil-on-plug seat"],
    candidatePartAliases: ["spark plug", "coil-on-plug", "plug well"],
    candidateSymptomIds: ["hiss", "misfire"],
    recommendationBias: "shop_required",
    fusion: { askForVisual: true, hardEscalate: true },
  },
  triton_4_6_3v_phaser_quiet: {
    id: "triton_4_6_3v_phaser_quiet",
    signature: {
      en: "4.6 3V Triton: quieter cold-start phaser rattle than 5.4 — softer note, shorter duration (1-2s)",
      ko: "4.6 3V 트라이튼: 5.4보다 조용한 캠 페이저 콜드 스타트 소리, 1-2초 짧게",
    },
    likelyCauses: ["worn cam phaser 4.6 3V"],
    candidatePartAliases: ["cam phaser", "VCT solenoid"],
    candidateSymptomIds: ["rattle", "ticking"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  ecoboost_turbo_whoosh: {
    id: "ecoboost_turbo_whoosh",
    signature: {
      en: "3.5 EcoBoost: smooth whoosh on heavy throttle, NORMAL — turbo spool",
      ko: "3.5 에코부스트: 가속 시 부드러운 휘파람 소리, 정상 — 터보 작동",
    },
    likelyCauses: ["normal turbo operation"],
    candidatePartAliases: ["turbocharger"],
    candidateSymptomIds: ["turbo_whine"],
    recommendationBias: "diy_safe",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  ecoboost_wastegate_rattle_cold: {
    id: "ecoboost_wastegate_rattle_cold",
    signature: {
      en: "3.5 EcoBoost cold start: brief metallic rattle from wastegate actuator — known TSB issue",
      ko: "3.5 에코부스트 차가운 시동: 웨이스트게이트 액추에이터에서 짧은 금속성 소리 — TSB 알려진 이슈",
    },
    likelyCauses: ["wastegate actuator wear", "wastegate arm slop"],
    candidatePartAliases: ["wastegate", "wastegate actuator"],
    candidateSymptomIds: ["rattle"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  ecoboost_bov_chirp_load: {
    id: "ecoboost_bov_chirp_load",
    signature: {
      en: "3.5 EcoBoost: chirp under load, often misdiagnosed — carbon buildup on intake valves causes BOV-like flutter",
      ko: "3.5 에코부스트: 부하 걸렸을 때 끽 소리 — 흡기 밸브 카본 축적 (월넛 블라스팅 필요)",
    },
    likelyCauses: ["intake valve carbon buildup", "PCV oil mist"],
    candidatePartAliases: ["intake valve", "blow off valve", "PCV valve", "oil catch can"],
    candidateSymptomIds: ["chirp", "hesitation"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  ecoboost_timing_chain_stretch: {
    id: "ecoboost_timing_chain_stretch",
    signature: {
      en: "3.5 EcoBoost timing chain stretch: persistent rattle from front of engine, cold + hot idle, worse with neglected oil changes",
      ko: "3.5 에코부스트 타이밍 체인 늘어짐: 엔진 앞쪽 지속적인 덜덜거림, 오일 관리 부실 시",
    },
    likelyCauses: ["stretched timing chain", "worn chain tensioner"],
    candidatePartAliases: ["timing chain", "chain tensioner"],
    candidateSymptomIds: ["rattle"],
    recommendationBias: "shop_required",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  coyote_vct_chatter: {
    id: "coyote_vct_chatter",
    signature: {
      en: "5.0 Coyote: VCT solenoid chatter on cold start, mostly 2011-2012 production",
      ko: "5.0 코요테: VCT 솔레노이드 차터 (콜드 스타트), 주로 2011-2012년식",
    },
    likelyCauses: ["VCT solenoid wear", "early-production cam phaser"],
    candidatePartAliases: ["VCT solenoid", "cam phaser"],
    candidateSymptomIds: ["rattle", "ticking"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  coyote_mmt_manifold_tick: {
    id: "coyote_mmt_manifold_tick",
    signature: {
      en: "5.0 Coyote 'mid-model tick' (MMT): exhaust manifold gasket leak — sharp ticking that gets worse with engine load",
      ko: "5.0 코요테 MMT: 배기 매니폴드 가스켓 누설 — 부하 시 더 강해지는 틱 소리",
    },
    likelyCauses: ["exhaust manifold gasket leak"],
    candidatePartAliases: ["exhaust manifold", "manifold gasket"],
    candidateSymptomIds: ["exhaust_tick", "ticking"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  boss_6_2_lope_normal: {
    id: "boss_6_2_lope_normal",
    signature: {
      en: "6.2 Boss: aggressive lope at idle — NORMAL aggressive cam profile, not a fault",
      ko: "6.2 보스: 공회전 시 거친 펄럭임, 정상 — 공격적 캠 프로파일",
    },
    likelyCauses: ["normal aggressive cam profile"],
    candidatePartAliases: [],
    candidateSymptomIds: ["rough_idle"],
    recommendationBias: "diy_safe",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  boss_6_2_roush_blower_whine: {
    id: "boss_6_2_roush_blower_whine",
    signature: {
      en: "6.2 Boss with Roush supercharger: high-pitched whine that scales with RPM — NORMAL if kit is fitted",
      ko: "6.2 보스 Roush 슈퍼차저: rpm 따라 변하는 고음 소리, 키트 장착 시 정상",
    },
    likelyCauses: ["aftermarket Roush supercharger"],
    candidatePartAliases: ["supercharger"],
    candidateSymptomIds: ["turbo_whine"],
    recommendationBias: "diy_safe",
    fusion: { askForVisual: true, hardEscalate: false },
  },
  v6_3_7_chain_rattle_cold: {
    id: "v6_3_7_chain_rattle_cold",
    signature: {
      en: "3.7 Ti-VCT V6: timing chain rattle on cold start at very high mileage (>150K), no cam phaser issues",
      ko: "3.7 Ti-VCT V6: 150K 마일 이상 고주행에서 콜드 스타트 타이밍 체인 소리",
    },
    likelyCauses: ["timing chain stretch", "high-mileage wear"],
    candidatePartAliases: ["timing chain"],
    candidateSymptomIds: ["rattle"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  // ── Transmission signatures ──
  trans_4r75e_tcc_shudder: {
    id: "trans_4r75e_tcc_shudder",
    signature: {
      en: "4R75E TCC shudder: vibration felt at 40-50 mph light throttle when torque converter clutch engages",
      ko: "4R75E TCC 떨림: 40-50mph 약한 가속 시 토크 컨버터 클러치 결합 떨림",
    },
    likelyCauses: ["worn TCC clutch", "degraded ATF"],
    candidatePartAliases: ["torque converter", "Mercon V transmission fluid"],
    candidateSymptomIds: ["shift_shudder", "vibration"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  trans_4r75e_2_3_flare: {
    id: "trans_4r75e_2_3_flare",
    signature: {
      en: "4R75E 2-3 shift flare: RPM rises briefly during the 2→3 upshift before catching",
      ko: "4R75E 2-3 시프트 플레어: 2→3 변속 시 RPM이 잠시 올라간 뒤 물림",
    },
    likelyCauses: ["worn 2-3 shift solenoid", "low line pressure"],
    candidatePartAliases: ["shift solenoid"],
    candidateSymptomIds: ["shift_flare"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  trans_6r80_1_2_flare: {
    id: "trans_6r80_1_2_flare",
    signature: {
      en: "6R80 1-2 flare: harsh or delayed 1→2 upshift, most common 6R80 complaint — TSB 14-0067 reflash fixes 90%",
      ko: "6R80 1-2 플레어: 거친 1→2 변속, 가장 흔한 6R80 불만 — TSB 14-0067 리플래시로 90% 해결",
    },
    likelyCauses: ["outdated TCM software", "valve body wear"],
    candidatePartAliases: ["valve body", "PCM software"],
    candidateSymptomIds: ["shift_flare", "harsh_shift"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  trans_6r80_tcc_shudder: {
    id: "trans_6r80_tcc_shudder",
    signature: {
      en: "6R80 TCC shudder: vibration under light throttle in 4-6th gear when TCC engages — often resolved by Mercon LV fluid change",
      ko: "6R80 TCC 떨림: 4-6단에서 약한 가속 시 TCC 결합 떨림 — Mercon LV 교체로 해결",
    },
    likelyCauses: ["wrong ATF used", "TCC solenoid wear"],
    candidatePartAliases: ["TCC solenoid", "Mercon LV"],
    candidateSymptomIds: ["shift_shudder", "vibration"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  trans_6r80_valve_body_buzz: {
    id: "trans_6r80_valve_body_buzz",
    signature: {
      en: "6R80 valve body solenoid buzz: high-frequency electrical buzz from transmission pan area, especially at shift points",
      ko: "6R80 밸브 바디 솔레노이드 버즈: 변속 시 고주파 전기 부즈음",
    },
    likelyCauses: ["valve body solenoid wear"],
    candidatePartAliases: ["valve body", "shift solenoid"],
    candidateSymptomIds: ["shift_shudder"],
    recommendationBias: "inspect_only",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  trans_6r80_lead_frame_chirp: {
    id: "trans_6r80_lead_frame_chirp",
    signature: {
      en: "6R80 lead frame chirp: cosmetic chirp from transmission, no functional impact — harmless",
      ko: "6R80 리드 프레임 칩 소리: 기능에는 영향 없는 무해한 소리",
    },
    likelyCauses: ["benign lead frame vibration"],
    candidatePartAliases: [],
    candidateSymptomIds: ["chirp"],
    recommendationBias: "diy_safe",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  // ── Fuel-related signatures ──
  fuel_e15_misfueling: {
    id: "fuel_e15_misfueling",
    signature: {
      en: "E15 misfueling in non-flex engine: rough idle that doesn't improve over warm-up, eventual MIL — stop driving",
      ko: "E15 잘못 주유 (non-flex 엔진): 워밍업 후에도 거친 공회전, MIL 점등 — 즉시 주행 중지",
    },
    likelyCauses: ["E15 fuel in non-flex engine", "ethanol incompatibility"],
    candidatePartAliases: ["fuel system"],
    candidateSymptomIds: ["rough_idle", "check_engine_light"],
    recommendationBias: "shop_required",
    fusion: { askForVisual: false, hardEscalate: true },
  },
  fuel_low_octane_ping_under_tow: {
    id: "fuel_low_octane_ping_under_tow",
    signature: {
      en: "EcoBoost on 87 octane while towing: audible soft pinging on inclines — knock retard reducing power",
      ko: "에코부스트 87옥탄 견인 시: 오르막에서 들리는 핑잉 — 노크 리타드 작동",
    },
    likelyCauses: ["low octane under boost load"],
    candidatePartAliases: ["fuel grade"],
    candidateSymptomIds: ["surge", "hesitation"],
    recommendationBias: "diy_safe",
    fusion: { askForVisual: false, hardEscalate: false },
  },
  fuel_e85_deeper_exhaust_note: {
    id: "fuel_e85_deeper_exhaust_note",
    signature: {
      en: "6.2 Boss flex-fuel on E85: deeper exhaust note, slightly rougher cold start — NORMAL for E85 operation",
      ko: "6.2 보스 flex-fuel E85: 깊은 배기음, 약간 거친 콜드 스타트 — E85 정상 작동",
    },
    likelyCauses: ["normal E85 combustion characteristics"],
    candidatePartAliases: [],
    candidateSymptomIds: ["rough_idle"],
    recommendationBias: "diy_safe",
    fusion: { askForVisual: false, hardEscalate: false },
  },
};

export function getEngineSound(id: EngineSoundId): EngineSoundDefinition {
  return ENGINE_SOUNDS[id];
}

export function listEngineSoundIds(): EngineSoundId[] {
  return Object.keys(ENGINE_SOUNDS) as EngineSoundId[];
}
