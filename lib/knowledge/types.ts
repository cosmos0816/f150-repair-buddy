import { SUPPORTED_VEHICLE_ID } from "@/lib/config/app-config";
import type { ConfidenceLevel, Recommendation } from "@/lib/types/result";
import type { BookmarkType } from "@/lib/types/session";

export type TruckKnowledgeVehicleId = typeof SUPPORTED_VEHICLE_ID;

export type TruckPartId =
  | "belt"
  | "tensioner"
  | "idler_pulley"
  | "alternator_area"
  | "front_accessory_drive"
  | "battery"
  | "ground_point"
  | "coolant_reservoir"
  | "radiator_hose"
  | "thermostat_housing"
  | "fan_clutch"
  | "intake_tube"
  | "throttle_body"
  | "maf_sensor"
  | "fuel_injector"
  | "exhaust_manifold"
  | "oxygen_sensor_connector"
  | "catalytic_converter_area"
  | "coil"
  | "spark_plug"
  | "ignition_harness"
  | "connector"
  | "vacuum_line"
  | "coolant_hose"
  | "battery_terminal"
  | "lamp_socket"
  | "light_bulb"
  | "headlight_housing"
  | "taillight_housing"
  | "brake_line"
  | "brake_hose"
  | "caliper_area"
  | "control_arm"
  | "ball_joint"
  | "tie_rod_end"
  | "cv_axle_boot"
  | "transfer_case_area"
  | "driveshaft_u_joint"
  | "differential_cover"
  | "wheel_well_lip"
  | "frame_section"
  | "engine_top_front"
  | "cam_phaser_area"
  | "timing_cover"
  | "vct_solenoid"
  | "fuel_pump_driver_module"
  | "iwe_solenoid_actuator";

export type TruckSymptomId =
  | "leak"
  | "rust"
  | "ticking"
  | "chirp"
  | "squeal"
  | "wobble"
  | "rattle"
  | "hiss"
  | "misfire"
  | "hyperflash"
  | "coolant_smell"
  | "dead_battery"
  | "corrosion"
  | "rough_idle"
  | "vibration"
  | "exhaust_tick"
  | "clunk"
  | "pull";

export type TruckInspectionTargetId =
  | "front_accessory_drive_path"
  | "alternator_mount_and_case"
  | "coil_and_plug_well"
  | "connector_fitment_and_corrosion"
  | "fluid_source_path"
  | "wheel_well_underbody"
  | "lamp_socket_and_harness"
  | "coolant_hose_and_crossover"
  | "vacuum_line_routing"
  | "battery_terminal_and_ground"
  | "battery_top_and_hold_down"
  | "coolant_reservoir_and_seam"
  | "radiator_hose_neck_and_clamp"
  | "intake_tube_and_throttle_body"
  | "maf_sensor_and_air_box"
  | "exhaust_manifold_and_heat_shield"
  | "brake_line_and_hose"
  | "front_suspension_joint"
  | "steering_linkage_end"
  | "transfer_case_and_driveshaft"
  | "differential_cover_and_pinion"
  | "headlamp_housing_and_mount"
  | "taillamp_housing_and_mount"
  | "engine_top_timing_cover"
  | "frame_rust_and_seam";

export type TruckIssueAreaId =
  | "accessory_drive_belt_path"
  | "cam_phaser_tick_context"
  | "ignition_misfire_path"
  | "coolant_leak_source"
  | "connector_and_harness_fitment"
  | "lighting_socket_wiring"
  | "battery_terminal_corrosion"
  | "wheel_well_underbody_rust"
  | "battery_charge_and_ground_path"
  | "cooling_reservoir_and_hose_seep"
  | "intake_vacuum_air_leak"
  | "exhaust_manifold_tick"
  | "brake_hose_or_line_concern"
  | "front_suspension_joint_play"
  | "steering_linkage_wear"
  | "drivetrain_leak_or_boot"
  | "underbody_frame_corrosion"
  | "lamp_housing_moisture_or_mount";

export type TruckSystemId =
  | "engine_mechanical"
  | "accessory_drive"
  | "charging"
  | "ignition"
  | "timing_valvetrain"
  | "fuel_air_metering"
  | "exhaust_emissions"
  | "electrical"
  | "battery_ground"
  | "body"
  | "lighting"
  | "cooling"
  | "intake_vacuum"
  | "connectors_harness"
  | "suspension_steering"
  | "brakes"
  | "drivetrain_4wd"
  | "underbody"
  | "cabin_controls";

export type TruckEvidenceCueSource =
  | "bookmark"
  | "transcript"
  | "capture";

export interface TruckSystemGroupDefinition {
  id: TruckSystemId;
  label: string;
  aliases: string[];
  summary: string;
  inspectionFocus: string[];
  partIds: TruckPartId[];
  symptomIds: TruckSymptomId[];
  inspectionTargetIds: TruckInspectionTargetId[];
}

export interface PartConditionDescriptor {
  visual?: string[];
  sound?: string[];
  touch?: string[];
  smell?: string[];
}

export type KnowledgeConfidence =
  | "verified"
  | "field_knowledge"
  | "unverified";

export interface PartFailureMode {
  id: string;
  name: string;
  cause: string;
  symptoms: string[];
  severity: "low" | "medium" | "high" | "stop_driving";
  diyOrShop: "diy" | "diy_with_care" | "shop";
  /**
   * True for failure modes that are well-known weak points on this specific
   * engine (e.g. 5.4 3V cam phaser rattle, two-piece spark plug ejection).
   * Lets the bot weight these higher when reasoning about symptoms.
   */
  knownWeakness?: boolean;
  /**
   * How much we trust this entry. The live assistant is instructed never to
   * state `field_knowledge` or `unverified` claims as fact — always with a
   * "this looks like X, verify before acting" hedge.
   */
  confidence: KnowledgeConfidence;
  /**
   * Free-text reference: a path under sources/, a TSB number, an owner-guide
   * page, a YouTube channel, or "field knowledge — verify before acting"
   * when there is no specific document yet.
   */
  source?: string;
}

export interface PartServiceInterval {
  mileage?: number;
  months?: number;
  note?: string;
}

export interface TruckPartDefinition {
  id: TruckPartId;
  label: string;
  aliases: string[];
  system: TruckSystemId;
  summary: string;
  inspectionHints: string[];
  warningSigns: string[];
  likelyRecommendation: Recommendation;
  commonSymptoms: TruckSymptomId[];
  inspectionTargets: TruckInspectionTargetId[];
  /**
   * Optional knowledge layer added in Track A so the bot can answer
   * "is this right or wrong?" with grounded text instead of guessing.
   * All fields are optional — existing parts compile unchanged and
   * are populated incrementally in Track B.
   */
  healthyAppearance?: PartConditionDescriptor;
  failingAppearance?: PartConditionDescriptor;
  failureModes?: PartFailureMode[];
  serviceInterval?: PartServiceInterval;
  /** Factory spec value — fluid type, torque, capacity, etc. */
  factorySpec?: string;
}

export interface TruckSymptomDefinition {
  id: TruckSymptomId;
  label: string;
  aliases: string[];
  systems: TruckSystemId[];
  summary: string;
  inspectionHints: string[];
  warningSigns: string[];
  likelyRecommendation: Recommendation;
  likelyParts: TruckPartId[];
  inspectionTargets: TruckInspectionTargetId[];
  capturePrompts: string[];
}

export interface TruckInspectionTargetDefinition {
  id: TruckInspectionTargetId;
  label: string;
  aliases: string[];
  systems: TruckSystemId[];
  summary: string;
  locationHint: string;
  inspectFor: string[];
  warningSigns: string[];
  likelyRecommendation: Recommendation;
  relatedParts: TruckPartId[];
  relatedSymptoms: TruckSymptomId[];
}

export interface TruckConfidenceNote {
  id: string;
  confidence: ConfidenceLevel;
  note: string;
  when: string;
}

export interface TruckEvidenceCue {
  id: string;
  confidence: ConfidenceLevel;
  cue: string;
  source: TruckEvidenceCueSource;
  bookmarkTypes?: BookmarkType[];
  captureObservations?: string[];
  inspectionTargetIds?: TruckInspectionTargetId[];
  issueAreaIds?: TruckIssueAreaId[];
  partIds?: TruckPartId[];
  symptomIds?: TruckSymptomId[];
  transcriptTerms?: string[];
}

export interface TruckIssueAreaDefinition {
  id: TruckIssueAreaId;
  label: string;
  aliases: string[];
  systems: TruckSystemId[];
  summary: string;
  inspectionHints: string[];
  relatedParts: TruckPartId[];
  relatedSymptoms: TruckSymptomId[];
  inspectionTargets: TruckInspectionTargetId[];
  escalationRecommendation: Recommendation;
  confidenceNotes: TruckConfidenceNote[];
  evidenceCues: TruckEvidenceCue[];
}

export interface TruckEscalationGuidance {
  id: string;
  label: string;
  recommendation: Recommendation;
  when: string;
  notes: string[];
  systemIds?: TruckSystemId[];
  partIds?: TruckPartId[];
  symptomIds?: TruckSymptomId[];
  inspectionTargetIds?: TruckInspectionTargetId[];
  bookmarkTypes?: BookmarkType[];
}

export interface TruckKnowledgeLookup {
  issueAreaIds?: TruckIssueAreaId[];
  systemIds?: TruckSystemId[];
  inspectionTargetIds?: TruckInspectionTargetId[];
  partIds?: TruckPartId[];
  symptomIds?: TruckSymptomId[];
  bookmarkTypes?: BookmarkType[];
}

export interface TruckKnowledgeRelationships {
  bookmarkTypeLookups: Partial<Record<BookmarkType, TruckKnowledgeLookup>>;
}

export type TruckKnowledgeSearchResultKind =
  | "system_group"
  | "issue_area"
  | "part"
  | "symptom"
  | "inspection_target"
  | "escalation_rule"
  | "forum_entry"
  | "reference_record"
  | "repair_cost";

export interface TruckKnowledgeSearchResult {
  kind: TruckKnowledgeSearchResultKind;
  id: string;
  label: string;
  summary: string;
  aliases: string[];
  score: number;
  recommendation?: Recommendation;
}

export interface TruckKnowledgeBase {
  vehicleId: TruckKnowledgeVehicleId;
  title: string;
  systemGroups: Record<TruckSystemId, TruckSystemGroupDefinition>;
  issueAreas: Record<TruckIssueAreaId, TruckIssueAreaDefinition>;
  parts: Record<TruckPartId, TruckPartDefinition>;
  symptoms: Record<TruckSymptomId, TruckSymptomDefinition>;
  inspectionTargets: Record<
    TruckInspectionTargetId,
    TruckInspectionTargetDefinition
  >;
  escalationRules: TruckEscalationGuidance[];
  relationships: TruckKnowledgeRelationships;
}
