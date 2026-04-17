import { SUPPORTED_VEHICLE_ID } from "@/lib/config/app-config";
import type {
  ReferenceEntry,
  ReferenceSourceDocument,
} from "@/lib/references/types";

export const CURATED_MANUAL_RESOURCE_DOCUMENT: ReferenceSourceDocument = {
  id: "2010-ford-f150-curated-manual-excerpts",
  kind: "owner_manual",
  title: "2010 Ford F-150 Curated Manual Excerpts",
  provider: {
    id: "curated-owner-manual-local",
    label: "Curated Owner Manual Excerpts",
    mode: "local",
  },
  editionLabel: "2010 F-150 / 5.4 Triton scope",
};

export const CURATED_REPAIR_RESOURCE_DOCUMENT: ReferenceSourceDocument = {
  id: "2010-ford-f150-curated-repair-notes",
  kind: "local_knowledge",
  title: "2010 Ford F-150 Curated Repair Notes",
  provider: {
    id: "curated-repair-notes-local",
    label: "Curated Repair Notes",
    mode: "local",
  },
  editionLabel: "2010 F-150 / 5.4 Triton scope",
};

/**
 * Add new truck-only resources here, or split them into more files under
 * `lib/references/` as the curated set grows.
 *
 * Keep each record focused on one excerpt, inspection procedure, symptom note,
 * or safety warning for the 2010 Ford F-150 5.4 Triton only.
 */
export const CURATED_REFERENCE_ENTRIES: ReferenceEntry[] = [
  {
    id: "curated_manual_accessory_drive_routing_check",
    vehicleId: SUPPORTED_VEHICLE_ID,
    sourceKind: "manual_section",
    contentKind: "owner_manual",
    sourceDocument: CURATED_MANUAL_RESOURCE_DOCUMENT,
    title: "Accessory drive routing visual check",
    summary:
      "Use a steady wide-to-close visual check on the serpentine belt path before deciding whether belt noise or wobble looks safe to monitor.",
    sectionLabel: "Curated manual excerpt: belt routing and pulley view",
    aliases: [
      "serpentine belt routing",
      "belt routing",
      "belt path",
      "accessory belt path",
      "front drive belt",
    ],
    keywords: [
      "belt",
      "serpentine",
      "routing",
      "tensioner",
      "idler",
      "pulley",
      "alternator",
      "chirp",
      "wobble",
    ],
    tags: [
      "owner manual",
      "belt path",
      "pulley",
      "inspection",
      "routing",
    ],
    snippets: [
      "Start wide, then move closer to the belt span, tensioner face, and idler face.",
      "A clear front-drive view is more useful than several shaky close frames.",
    ],
    excerpts: [
      "Confirm the belt sits fully in the pulley grooves across the front drive path.",
      "Inspect for belt edge wear, dust, or a pulley face that looks tilted or unstable.",
    ],
    procedures: [
      "Show the full belt routing first.",
      "Move closer to the tensioner and idler pulley faces.",
      "Hold still for two seconds on the pulley that looks most suspicious.",
    ],
    safetyWarnings: [
      "Do not place hands near the belt path while the engine is running.",
      "If the belt is fraying, walking off the pulley, or the pulley face is wobbling, stop here and do not keep driving.",
    ],
    systemIds: ["accessory_drive", "charging"],
    issueAreaIds: ["accessory_drive_belt_path"],
    partIds: [
      "belt",
      "tensioner",
      "idler_pulley",
      "alternator_area",
      "front_accessory_drive",
    ],
    symptomIds: ["chirp", "wobble"],
    inspectionTargetIds: [
      "front_accessory_drive_path",
      "alternator_mount_and_case",
    ],
    manualSection: {
      documentId: CURATED_MANUAL_RESOURCE_DOCUMENT.id,
      chapterId: "maintenance_and_specifications",
      sectionId: "accessory_drive_routing_check",
      sectionTitle: "Accessory drive routing check",
      path: ["Maintenance", "Accessory drive routing check"],
      pageHint: "Curated excerpt",
    },
    localized: {
      ko: {
        title: "액세서리 드라이브 벨트 경로 점검",
        summary:
          "벨트 소음이나 흔들림이 계속 주행 가능한 수준인지 판단하기 전에, 서펜타인 벨트 경로를 넓게 보여준 뒤 가까이에서 안정적으로 확인하세요.",
        sectionLabel: "수동 참고: 벨트 경로와 풀리 시야",
        aliases: [
          "서펜타인 벨트 경로",
          "벨트 경로",
          "벨트 라우팅",
          "액세서리 벨트",
        ],
        excerpts: [
          "전면 드라이브 경로 전체에서 벨트가 풀리 홈에 제대로 걸려 있는지 확인하세요.",
          "벨트 가장자리 마모, 벨트 가루, 기울어지거나 흔들리는 풀리 면을 확인하세요.",
        ],
        procedures: [
          "먼저 벨트 전체 경로를 보여주세요.",
          "그다음 텐셔너와 아이들 풀리 면에 더 가까이 가세요.",
          "가장 수상한 풀리에서 2초 동안 흔들림 없이 유지하세요.",
        ],
        safetyWarnings: [
          "엔진이 작동 중일 때는 벨트 경로 근처에 손을 두지 마세요.",
          "벨트가 닳아 해지거나, 풀리에서 벗어나거나, 풀리 면이 흔들리면 여기서 멈추고 더 주행하지 마세요.",
        ],
      },
    },
  },
  {
    id: "curated_repair_note_coolant_leak_trace",
    vehicleId: SUPPORTED_VEHICLE_ID,
    sourceKind: "repair_reference",
    contentKind: "repair_note",
    sourceDocument: CURATED_REPAIR_RESOURCE_DOCUMENT,
    title: "Coolant leak source trace before driving",
    summary:
      "For coolant smell or a fresh drip, trace the wet path upward and identify the highest likely source before driving farther.",
    sectionLabel: "Curated repair note: coolant leak trace",
    aliases: [
      "coolant seep",
      "coolant leak",
      "hose seep",
      "reservoir leak",
      "coolant smell",
    ],
    keywords: [
      "coolant",
      "leak",
      "drip",
      "smell",
      "hose",
      "reservoir",
      "crossover",
    ],
    tags: [
      "repair note",
      "coolant",
      "leak",
      "hose",
      "safety",
    ],
    snippets: [
      "A ground drip is not necessarily the source. Start at the highest wet point you can see.",
      "Show the hose neck, clamp area, and any fresh wet trail before assuming the leak is minor.",
    ],
    notes: [
      "Fresh coolant residue near the hose connection is more useful than a wide frame of the floor drip.",
      "If coolant is reaching the belt path or a hot surface, escalate faster.",
    ],
    procedures: [
      "Show the highest wet point first.",
      "Move closer to the hose, clamp, or reservoir connection above the drip.",
      "Add one steady close frame of the leak origin if it is safe to do so.",
    ],
    safetyWarnings: [
      "Do not open a hot cooling system.",
      "If coolant is dripping quickly, reaching the belt path, or hitting a hot surface, stop here and do not drive farther.",
    ],
    systemIds: ["cooling"],
    issueAreaIds: ["coolant_leak_source"],
    partIds: ["coolant_hose"],
    symptomIds: ["leak", "coolant_smell"],
    inspectionTargetIds: ["fluid_source_path", "coolant_hose_and_crossover"],
    localized: {
      ko: {
        title: "주행 전 냉각수 누유 원점 추적",
        summary:
          "냉각수 냄새나 새는 흔적이 보이면, 더 주행하기 전에 젖은 자국을 위쪽으로 따라가 가장 높은 원점 후보를 확인하세요.",
        sectionLabel: "정비 참고: 냉각수 누유 추적",
        aliases: [
          "냉각수 스밈",
          "냉각수 누유",
          "호스 누유",
          "리저버 누유",
          "냉각수 냄새",
        ],
        notes: [
          "바닥에 떨어진 자국보다 호스 연결부 근처의 신선한 냉각수 흔적이 더 중요합니다.",
          "냉각수가 벨트 경로나 뜨거운 표면으로 닿으면 더 빠르게 중단 판단을 하세요.",
        ],
        procedures: [
          "먼저 가장 위쪽의 젖은 지점을 보여주세요.",
          "그다음 누유 아래쪽이 아니라 위쪽의 호스, 클램프, 또는 리저버 연결부로 더 가까이 가세요.",
          "안전하다면 누유 시작 지점을 가까이서 한 장 안정적으로 저장하세요.",
        ],
        safetyWarnings: [
          "뜨거운 냉각 계통은 열지 마세요.",
          "냉각수가 빠르게 떨어지거나 벨트 경로 또는 뜨거운 표면에 닿으면 여기서 멈추고 더 주행하지 마세요.",
        ],
      },
    },
  },
  {
    id: "curated_repair_note_battery_terminal_corrosion_check",
    vehicleId: SUPPORTED_VEHICLE_ID,
    sourceKind: "repair_reference",
    contentKind: "inspection_hint",
    sourceDocument: CURATED_REPAIR_RESOURCE_DOCUMENT,
    title: "Battery terminal corrosion and clamp-fit check",
    summary:
      "Before assuming a larger charging or starting fault, inspect the battery posts, clamps, nearby cable ends, and visible corrosion buildup.",
    sectionLabel: "Curated repair note: battery terminal check",
    aliases: [
      "battery terminal",
      "battery post",
      "terminal clamp",
      "positive terminal",
      "negative terminal",
      "white powder on battery",
      "green corrosion on battery cable",
    ],
    keywords: [
      "battery",
      "terminal",
      "post",
      "clamp",
      "corrosion",
      "white powder",
      "green powder",
      "charging",
      "cable end",
    ],
    tags: ["repair note", "battery", "terminal", "corrosion", "charging"],
    snippets: [
      "A loose or corroded clamp can mimic a larger charging or electrical fault.",
      "Show both posts, the clamp fit, and the first few inches of cable before assuming the battery is the only problem.",
    ],
    notes: [
      "White or green buildup at the post is a stronger clue than a wide frame of the whole battery tray.",
      "If the clamp looks loose, distorted, or heat-damaged, escalate faster.",
    ],
    procedures: [
      "Show the battery top and both terminals first.",
      "Move closer to the clamp and cable end on the suspicious side.",
      "Hold still for two seconds on any corrosion or loose clamp fit.",
    ],
    safetyWarnings: [
      "Do not bridge the battery terminals with metal tools during inspection.",
      "If the clamp is badly loose, arcing, or heat-damaged, stop here before driving farther.",
    ],
    systemIds: ["charging", "electrical"],
    issueAreaIds: ["battery_terminal_corrosion"],
    partIds: ["battery_terminal"],
    inspectionTargetIds: ["battery_terminal_and_ground"],
    localized: {
      ko: {
        title: "배터리 터미널 부식 및 클램프 체결 점검",
        summary:
          "더 큰 충전계통이나 시동 문제로 보기 전에, 배터리 단자, 클램프 체결, 케이블 끝단, 눈에 보이는 부식부터 확인하세요.",
        sectionLabel: "정비 참고: 배터리 터미널 점검",
        aliases: [
          "배터리 터미널",
          "배터리 단자",
          "배터리 포스트",
          "터미널 클램프",
          "플러스 단자",
          "마이너스 단자",
          "배터리 하얀 가루",
        ],
        notes: [
          "배터리 트레이 전체보다 포스트 주변의 하얀색 또는 녹색 부식이 더 중요한 단서입니다.",
          "클램프가 느슨하거나 변형되었거나 열 손상이 보이면 더 빠르게 중단 판단을 하세요.",
        ],
        procedures: [
          "먼저 배터리 상단과 양쪽 터미널을 보여주세요.",
          "수상한 쪽의 클램프와 케이블 끝단으로 더 가까이 가세요.",
          "부식이나 느슨한 체결이 보이면 그 부위를 2초 동안 흔들림 없이 보여주세요.",
        ],
        safetyWarnings: [
          "점검 중 금속 공구로 배터리 단자를 서로 닿게 하지 마세요.",
          "클램프가 심하게 느슨하거나 스파크 자국, 열 손상이 보이면 여기서 멈추고 더 주행하지 마세요.",
        ],
      },
    },
  },
  {
    id: "curated_known_issue_engine_top_tick_separation",
    vehicleId: SUPPORTED_VEHICLE_ID,
    sourceKind: "knowledge_entry",
    contentKind: "known_issue",
    sourceDocument: CURATED_REPAIR_RESOURCE_DOCUMENT,
    title: "Upper-engine tick should be separated from front belt-path noise",
    summary:
      "A ticking complaint near the 5.4 Triton should be separated between the top-front engine area and the front accessory drive before making a stronger claim.",
    sectionLabel: "Curated symptom note: engine-top ticking separation",
    aliases: [
      "cam phaser tick",
      "timing tick",
      "top engine tick",
      "upper engine tick",
      "valvetrain tick",
      "belt tick comparison",
    ],
    keywords: [
      "tick",
      "ticking",
      "cam phaser",
      "timing",
      "engine top",
      "valvetrain",
      "belt comparison",
    ],
    tags: ["known issue", "tick", "engine top", "timing", "5.4 triton"],
    snippets: [
      "Do not assume every ticking sound is coming from the belt path.",
      "A comparison view of the engine top and the front accessory drive is more useful than a single shaky close-up.",
    ],
    notes: [
      "If the top-front engine area sounds stronger than the belt path, keep the inspection focused there first.",
      "If the view is unclear, ask for a steadier engine-top comparison before escalating.",
    ],
    procedures: [
      "Show the top front of the engine first.",
      "Then show the front accessory drive area for comparison.",
      "Hold each area steady for two seconds.",
    ],
    safetyWarnings: [
      "If the ticking grows rapidly louder, or the source is still unclear, inspect further before deciding it is safe to keep driving.",
    ],
    systemIds: ["timing_valvetrain", "accessory_drive"],
    issueAreaIds: ["cam_phaser_tick_context", "accessory_drive_belt_path"],
    partIds: ["coil", "spark_plug", "belt", "tensioner", "idler_pulley"],
    symptomIds: ["ticking"],
    inspectionTargetIds: ["coil_and_plug_well", "front_accessory_drive_path"],
    localized: {
      ko: {
        title: "엔진 상부 틱 소리는 벨트 경로 소리와 구분해야 합니다",
        summary:
          "5.4 Triton의 틱 소리는 더 강한 주장을 하기 전에 엔진 윗앞쪽과 전면 액세서리 드라이브 경로를 먼저 구분해서 봐야 합니다.",
        sectionLabel: "증상 참고: 엔진 상부 틱 구분",
        aliases: [
          "캠 페이저 틱",
          "타이밍 틱",
          "엔진 상부 틱",
          "밸브트레인 틱",
          "벨트 틱 비교",
        ],
        notes: [
          "벨트 경로보다 엔진 윗앞쪽에서 소리가 더 강하면 그 부위를 먼저 유지해서 확인하세요.",
          "시야가 불분명하면 중단 판단 전에 엔진 상부 비교 화면을 더 안정적으로 받아야 합니다.",
        ],
        procedures: [
          "먼저 엔진 윗앞쪽을 보여주세요.",
          "그다음 비교를 위해 전면 액세서리 드라이브 구역을 보여주세요.",
          "각 부위를 2초 동안 흔들림 없이 유지하세요.",
        ],
        safetyWarnings: [
          "틱 소리가 빠르게 커지거나 원점이 여전히 불분명하면, 계속 주행 가능한지 바로 단정하지 말고 더 점검하세요.",
        ],
      },
    },
  },
];
