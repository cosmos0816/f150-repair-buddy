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
  | "iwe_solenoid_actuator"
  // ── EcoBoost-specific parts ──
  | "turbocharger"
  | "intercooler"
  | "wastegate"
  | "turbo_oil_feed_line"
  | "turbo_oil_return_line"
  | "charge_pipe"
  | "blow_off_valve"
  | "high_pressure_fuel_pump"
  | "direct_injector"
  | "oil_catch_can"
  | "pcv_valve"
  | "water_pump_internal"
  // ── Bed & cab parts ──
  | "tailgate"
  | "bed_floor"
  | "bed_tie_down"
  | "tonneau_cover"
  | "bed_liner"
  | "tailgate_damper"
  | "tailgate_cable"
  | "tailgate_latch";

/**
 * Phase 4 expansion IDs — used by the wider TruckReferenceRecord but NOT by
 * the strict truck/parts.ts / symptoms.ts / systems.ts / issue-rules.ts Records.
 * Add entries to those Records when you want a full TruckPartDefinition etc.
 */
export type ExtendedTruckPartId =
  | TruckPartId
  // ── Fuel system parts ──
  | "fuel_pump"
  | "fuel_tank"
  | "fuel_filter"
  | "fuel_pressure_regulator"
  | "fuel_rail"
  | "evap_canister"
  | "evap_vent_valve"
  | "evap_purge_valve"
  // ── Transmission parts ──
  | "torque_converter"
  | "valve_body"
  | "shift_solenoid"
  | "transmission_cooler"
  | "transmission_pan"
  | "transmission_filter"
  | "transmission_mount"
  | "tcc_solenoid"
  // ── HVAC parts ──
  | "blend_door_actuator"
  | "climate_control_head"
  | "hvac_blower_motor"
  | "hvac_blower_resistor"
  | "evaporator"
  | "heater_core"
  | "ac_compressor"
  | "ac_condenser"
  | "ac_drier"
  | "ac_pressure_switch"
  // ── Interior seat parts ──
  | "seat_assembly"
  | "seat_cushion"
  | "seat_motor"
  | "memory_seat_switch"
  | "memory_seat_module"
  | "seat_heater_element"
  | "seat_cooler_blower"
  | "seat_massage_motor"
  | "seatbelt_assembly"
  // ── Interior audio/tech ──
  | "radio_head_unit"
  | "sync_apim_module"
  | "mft_screen"
  | "amplifier"
  | "speaker"
  | "subwoofer"
  | "antenna"
  // ── Interior trim ──
  | "steering_wheel"
  | "steering_wheel_switch"
  | "dash_trim_panel"
  | "dash_pad"
  | "instrument_cluster"
  | "center_console"
  | "headliner"
  | "sun_visor"
  | "door_panel"
  | "armrest"
  // ── Sunroof / glass ──
  | "sunroof_assembly"
  | "sunroof_motor"
  | "sunroof_drain"
  | "windshield"
  | "window_regulator"
  // ── Floor / cargo ──
  | "carpet"
  | "floor_mat"
  | "kick_panel"
  | "shift_knob"
  // ── Aesthetic / body ──
  | "grille"
  | "running_board"
  | "fender_flare"
  | "light_bar"
  | "wheel"
  | "bug_deflector"
  | "splash_guard"
  | "mud_flap"
  | "side_step"
  | "hood_scoop"
  | "tow_mirror"
  // ── Lighting (aesthetic) ──
  | "amber_drl_kit"
  | "led_marker_light"
  // ── Brake system parts ──
  | "abs_module"
  | "abs_hcu"
  | "master_cylinder"
  | "brake_booster"
  | "wheel_speed_sensor"
  | "parking_brake_actuator"
  | "brake_rotor"
  | "brake_pad"
  | "brake_caliper"
  // ── TPMS / keys ──
  | "tpms_sensor"
  | "key_fob"
  | "key_blank"
  | "ignition_switch"
  // ── 4WD / IWE ──
  | "iwe_solenoid"
  | "front_diff_actuator"
  | "front_locking_hub"
  // ── Steering ──
  | "power_steering_pump"
  | "rack_and_pinion"
  | "steering_column";

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
  | "pull"
  // ── EcoBoost-specific symptoms ──
  | "turbo_whine"
  | "boost_loss"
  | "stumble"
  | "oil_consumption"
  | "white_smoke"
  | "blue_smoke";

export type ExtendedTruckSymptomId =
  | TruckSymptomId
  // ── Transmission symptoms ──
  | "shift_flare"
  | "shift_shudder"
  | "harsh_shift"
  | "late_shift"
  | "slipping"
  | "no_drive"
  // ── Engine / starting ──
  | "no_start"
  | "stall"
  | "hesitation"
  | "surge"
  | "long_crank"
  // ── HVAC symptoms ──
  | "dash_click"
  | "dash_grind"
  | "no_heat"
  | "no_cold_ac"
  | "weak_airflow"
  // ── Warning indicators ──
  | "check_engine_light"
  | "abs_warning_light"
  | "traction_disabled"
  | "tpms_light"
  | "battery_light"
  | "oil_pressure_light"
  // ── Brake symptoms ──
  | "spongy_pedal"
  | "hard_pedal"
  | "brake_pulsation"
  | "grinding_brakes"
  // ── Steering / handling ──
  | "shimmy"
  | "loose_steering"
  | "pulls_left"
  | "pulls_right";

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
  | "frame_rust_and_seam"
  // ── EcoBoost-specific inspection targets ──
  | "turbo_and_wastegate"
  | "intercooler_and_piping"
  | "turbo_oil_lines"
  // ── Bed & cab inspection targets ──
  | "bed_floor_and_drain"
  | "tailgate_hinge_and_cable"
  | "bed_wheel_well_rust";

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
  | "lamp_housing_moisture_or_mount"
  // ── EcoBoost-specific issue areas ──
  | "turbo_boost_leak"
  | "turbo_bearing_failure"
  | "intercooler_condensation"
  | "timing_chain_stretch_ecoboost"
  | "direct_injection_carbon_buildup"
  // ── Bed & cab issue areas ──
  | "bed_rust_and_drain"
  | "tailgate_mechanism_wear"
  | "rear_window_leak";

export type ExtendedTruckIssueAreaId =
  | TruckIssueAreaId
  // ── Phase 4 issue areas ──
  | "transmission_shift_quality"
  | "transmission_tcc_apply"
  | "transmission_fluid_degradation"
  | "fuel_pressure_loss"
  | "evap_leak_or_vent"
  | "throttle_body_carbon"
  | "maf_sensor_contamination"
  | "blend_door_failure"
  | "ac_compressor_failure"
  | "heater_core_leak"
  | "electric_parking_brake_failure"
  | "tpms_sensor_failure"
  | "key_fob_pairing"
  | "wheel_speed_sensor_corrosion"
  | "abs_module_fault"
  | "running_board_failure"
  | "amber_light_wiring"
  | "front_diff_iwe_grind";

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
  | "cabin_controls"
  // ── EcoBoost-specific systems ──
  | "turbo_boost"
  // ── Bed & cab systems ──
  | "bed_cargo";

export type ExtendedTruckSystemId =
  | TruckSystemId
  // ── Phase 4 subsystems ──
  | "fuel_system"
  | "transmission"
  | "hvac"
  | "audio_infotainment"
  | "safety_restraint"
  | "exterior_body"
  | "wheels_tires"
  | "tpms_keyfob"
  | "parking_brake"
  | "off_road";

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
