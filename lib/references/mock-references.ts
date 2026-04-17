import { SUPPORTED_VEHICLE_ID } from "@/lib/config/app-config";
import type {
  ReferenceEntry,
  ReferenceSourceDocument,
} from "@/lib/references/types";

const LOCAL_KNOWLEDGE_DOCUMENT: ReferenceSourceDocument = {
  id: "f150-local-knowledge",
  kind: "local_knowledge",
  title: "F-150 Repair Buddy Local Knowledge",
  provider: {
    id: "repair-buddy-local-knowledge",
    label: "Local Knowledge",
    mode: "local",
  },
};

const LOCAL_REPAIR_REFERENCE_DOCUMENT: ReferenceSourceDocument = {
  id: "f150-mock-external-repair-reference",
  kind: "external_repair_reference",
  title: "F-150 Repair Buddy Mock External Repair References",
  provider: {
    id: "mock-external-repair-reference",
    label: "Mock External Repair Reference",
    mode: "local",
  },
};

export const MOCK_REFERENCE_ENTRIES: ReferenceEntry[] = [
  {
    id: "repair_front_accessory_drive_check",
    vehicleId: SUPPORTED_VEHICLE_ID,
    sourceKind: "repair_reference",
    contentKind: "inspection_hint",
    sourceDocument: LOCAL_REPAIR_REFERENCE_DOCUMENT,
    title: "Front accessory drive chirp and wobble check",
    summary:
      "For belt or pulley noise, inspect the front drive path for dust, edge wear, pulley wobble, and alignment issues.",
    keywords: [
      "belt",
      "pulley",
      "tensioner",
      "idler",
      "alternator",
      "chirp",
      "wobble",
      "tracking",
    ],
    tags: [
      "repair",
      "accessory drive",
      "belt",
      "pulley",
      "chirp",
      "wobble",
    ],
    snippets: [
      "Hold a clear frame on the tensioner and idler if the noise is strongest there.",
      "Look for shiny belt edges, belt dust, or a pulley that does not track cleanly.",
    ],
    systemIds: ["accessory_drive", "charging"],
    issueAreaIds: ["accessory_drive_belt_path"],
    partIds: ["belt", "tensioner", "idler_pulley", "alternator_area"],
    symptomIds: ["chirp", "wobble"],
    inspectionTargetIds: [
      "front_accessory_drive_path",
      "alternator_mount_and_case",
    ],
  },
  {
    id: "repair_light_socket_and_harness",
    vehicleId: SUPPORTED_VEHICLE_ID,
    sourceKind: "repair_reference",
    contentKind: "inspection_hint",
    sourceDocument: LOCAL_REPAIR_REFERENCE_DOCUMENT,
    title: "Light issue bulb, socket, and harness triage",
    summary:
      "For light faults or hyperflash, start with the bulb, socket, connector fit, and visible wiring condition.",
    keywords: [
      "light",
      "bulb",
      "socket",
      "hyperflash",
      "turn signal",
      "connector",
      "wiring",
    ],
    tags: ["repair", "lighting", "bulb", "socket", "connector", "hyperflash"],
    snippets: [
      "Check for corrosion, melted plastic, or a loose bulb before replacing more parts.",
      "If hyperflash is isolated to one lamp path, inspect that lamp assembly first.",
    ],
    systemIds: ["lighting", "electrical"],
    issueAreaIds: ["lighting_socket_wiring", "connector_and_harness_fitment"],
    partIds: ["lamp_socket", "light_bulb", "connector"],
    symptomIds: ["hyperflash"],
    inspectionTargetIds: ["lamp_socket_and_harness"],
  },
  {
    id: "knowledge_rust_follow_up",
    vehicleId: SUPPORTED_VEHICLE_ID,
    sourceKind: "knowledge_entry",
    contentKind: "known_issue",
    sourceDocument: LOCAL_KNOWLEDGE_DOCUMENT,
    title: "Rust inspection around wheel well and underbody",
    summary:
      "Rust should be checked for flaking, swelling, perforation, and proximity to brake or fuel hardware.",
    keywords: [
      "rust",
      "wheel well",
      "underbody",
      "flaking",
      "perforation",
      "corrosion",
    ],
    tags: ["knowledge", "rust", "underbody", "wheel well", "corrosion"],
    snippets: [
      "Surface rust is lower risk than swollen, flaking, or perforated metal.",
      "Escalate faster if the rust is close to brake lines, fuel lines, or structural seams.",
    ],
    systemIds: ["body"],
    issueAreaIds: ["wheel_well_underbody_rust"],
    symptomIds: ["rust"],
    inspectionTargetIds: ["wheel_well_underbody"],
  },
  {
    id: "repair_connector_fitment_and_corrosion",
    vehicleId: SUPPORTED_VEHICLE_ID,
    sourceKind: "repair_reference",
    contentKind: "inspection_hint",
    sourceDocument: LOCAL_REPAIR_REFERENCE_DOCUMENT,
    title: "Connector fitment and corrosion check",
    summary:
      "Connector faults should be checked for loose fit, broken tabs, green corrosion, and wire strain near the entry.",
    keywords: [
      "connector",
      "plug",
      "corrosion",
      "fitment",
      "tab",
      "pins",
      "wiring",
    ],
    tags: ["repair", "connector", "electrical", "corrosion", "fitment"],
    snippets: [
      "A connector that will not stay seated can be as important as visible corrosion.",
      "Inspect the lock tab, pin face, and wire strain relief before driving.",
    ],
    systemIds: ["electrical", "ignition"],
    issueAreaIds: ["connector_and_harness_fitment", "ignition_misfire_path"],
    partIds: ["connector", "coil"],
    inspectionTargetIds: ["connector_fitment_and_corrosion"],
  },
  {
    id: "knowledge_ignition_coil_and_spark_plug_basics",
    vehicleId: SUPPORTED_VEHICLE_ID,
    sourceKind: "knowledge_entry",
    contentKind: "known_issue",
    sourceDocument: LOCAL_KNOWLEDGE_DOCUMENT,
    title: "Ignition basics: coil and spark plug area",
    summary:
      "Ticking near the coil or plug well should be checked for loose coil seating, moisture, oil, burn marks, or obvious damage.",
    keywords: [
      "coil",
      "spark plug",
      "ignition",
      "ticking",
      "plug well",
      "misfire",
    ],
    tags: ["knowledge", "ignition", "coil", "spark plug", "ticking", "misfire"],
    snippets: [
      "Capture the coil and plug well area where the ticking is strongest.",
      "If one cylinder area looks damaged or loose, treat it as a higher-risk inspection point.",
    ],
    systemIds: ["ignition", "electrical"],
    issueAreaIds: ["ignition_misfire_path", "cam_phaser_tick_context"],
    partIds: ["coil", "spark_plug", "connector"],
    symptomIds: ["ticking", "misfire"],
    inspectionTargetIds: ["coil_and_plug_well", "connector_fitment_and_corrosion"],
  },
];
