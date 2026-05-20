// Maps a diagnosed problem (issueId) to concrete RockAuto subcategory hints +
// free-text search terms so the live assistant can return real part SKUs the
// user can buy. The issueIds below are sourced from existing F-150 knowledge:
//   - lib/knowledge/sound/types.ts (TruckSoundCategory) for sound-driven issues
//   - lib/knowledge/references/known-issues.ts (CURATED_KNOWN_ISSUE_REFERENCES
//     and SCRAPED_KNOWN_ISSUE_REFERENCES) for documented failure modes
//   - lib/knowledge/references/dtc-codes.ts for DTC-aligned faults
//   - lib/knowledge/truck/forum-knowledge.ts for community-verified fixes
//
// Every issueId here corresponds to a real failure mode that one of those
// sources already documents. Each entry also points back to an existing
// TruckIssueAreaId so the recommender stays in sync with the truck knowledge
// layer when grounding by issue area.
//
// The companion query function `findPartsForIssue` runs `searchPartsCatalog`
// against the catalog at sources/rockauto/catalog.json (currently scraped for
// the 2010 F-150 5.4L V8 — 5,607 parts) and layers in linker hints by engine
// or trim when provided.

import {
  searchPartsCatalog,
  type PartSearchResult,
} from "@/lib/knowledge/parts-catalog";
import { getLinkerEntries } from "@/lib/knowledge/vehicles/parts-linker";
import type {
  EngineId,
  TrimId,
} from "@/lib/knowledge/vehicles/types";
import type { TruckIssueAreaId } from "@/lib/knowledge/types";

// Concrete, human-readable issue identifiers used by the diagnosis layer.
// These names map to specific failure modes documented in the knowledge files
// listed in the module header — they are NOT free-form strings.
export type TruckIssueId =
  // ── 5.4 Triton ──
  | "cam_phaser_rattle"
  | "spark_plug_ejection_risk"
  | "exhaust_manifold_tick"
  | "blend_door_actuator_failure"
  | "iwe_grind"
  | "fuel_pump_driver_module_failure"
  | "radiator_failure_orange_coolant"
  | "water_pump_internal_leak"
  | "alternator_failure"
  | "vct_solenoid_tick"
  | "timing_chain_stretch_54"
  | "ignition_coil_failure"
  | "throttle_body_carbon"
  | "valve_cover_gasket_leak"
  | "pcv_valve_failure_54"
  | "hub_bearing_failure"
  | "imrc_stuck_butterflies"
  | "pats_no_start"
  | "epas_steering_failure"
  // ── 3.5 EcoBoost ──
  | "turbo_failure_ecoboost"
  | "hpfp_failure_ecoboost"
  | "boost_loss_charge_pipe"
  | "injector_failure_direct"
  | "timing_chain_stretch_ecoboost"
  | "oil_consumption_pcv"
  | "intercooler_condensation"
  | "direct_injection_carbon_buildup"
  // ── Suspension / steering / brakes ──
  | "control_arm_failure"
  | "tie_rod_end_failure"
  | "ball_joint_failure"
  | "sway_bar_link_failure"
  | "shock_strut_failure"
  | "brake_caliper_seize"
  | "brake_pad_wear"
  | "rotor_warp"
  | "power_steering_pump_whine"
  | "rack_pinion_leak"
  // ── Electrical / body ──
  | "door_lock_actuator"
  | "window_regulator"
  | "door_ajar_sensor"
  // ── Cooling ──
  | "thermostat_failure"
  | "fan_clutch_failure"
  // ── Drivetrain ──
  | "transmission_shudder_6r80";

export interface IssuePartsMap {
  issueId: TruckIssueId;
  // The matching TruckIssueAreaId for grounding with the truck knowledge layer
  // (TRUCK_ISSUE_AREAS). May be null when the failure does not map cleanly to
  // an existing area (e.g. HVAC blend door is not its own area today).
  issueAreaId: TruckIssueAreaId | null;
  rockautoCategoryHints: string[];
  rockautoSubcategoryHints: string[];
  searchTerms: string[];
  preferredBrands?: string[];
  partNumbers?: string[];
  notes?: string;
}

// IMPORTANT: rockautoCategoryHints / rockautoSubcategoryHints values match the
// exact `category` / `subcategory` strings in sources/rockauto/catalog.json.
// Part numbers below are only included when they appear in CURRENT main
// knowledge files (known-issues.ts, dtc-codes.ts, forum-knowledge.ts,
// maintenance schedule in session-tools.ts). No new SKUs invented.
export const ISSUE_PARTS_MAP: IssuePartsMap[] = [
  // ─────────── 5.4 Triton ───────────
  {
    issueId: "cam_phaser_rattle",
    issueAreaId: "cam_phaser_tick_context",
    rockautoCategoryHints: ["Engine"],
    rockautoSubcategoryHints: [
      "Timing Chain & Component Kit",
      "Timing Chain",
      "Timing Chain Tensioner",
      "Timing Chain Guide / Damper",
      "Variable Valve Timing (VVT) Solenoid / Actuator",
      "Variable Valve Timing (VVT) Housing",
      "Variable Valve Timing (VVT) Sprocket",
      "Timing Cover Gasket",
    ],
    searchTerms: [
      "cam phaser",
      "timing chain kit 5.4",
      "VCT solenoid",
      "VVT sprocket",
      "phaser",
    ],
    notes:
      "Always replace both phasers + chains + tensioners + guides + VCT solenoids together. Forum consensus: never replace just one bank. Avoid Dorman cam phasers — use Motorcraft. See known-issue-cam-phaser-rattle.",
  },
  {
    issueId: "spark_plug_ejection_risk",
    issueAreaId: "ignition_misfire_path",
    rockautoCategoryHints: ["Ignition"],
    rockautoSubcategoryHints: ["Spark Plug", "Spark Plug / Ignition Coil Boot"],
    searchTerms: ["spark plug", "SP-515", "Motorcraft SP-515"],
    preferredBrands: ["MOTORCRAFT"],
    partNumbers: ["SP-515"],
    notes:
      "Motorcraft SP-515 is the revised one-piece 5.4 3V plug. 25 lb-ft with anti-seize. Use Lisle 65600 if a two-piece plug breaks on removal. See known-issue-spark-plug-breakage.",
  },
  {
    issueId: "exhaust_manifold_tick",
    issueAreaId: "exhaust_manifold_tick",
    rockautoCategoryHints: ["Exhaust & Emission"],
    rockautoSubcategoryHints: [
      "Exhaust Manifold",
      "Exhaust Manifold Gasket",
      "Exhaust Manifold Hardware",
      "Exhaust Flange Stud and Nut",
    ],
    searchTerms: ["exhaust manifold 5.4", "manifold stud", "manifold gasket"],
    preferredBrands: ["DORMAN"],
    notes:
      "Passenger-side rear studs fail first from heat cycling. Dorman makes improved replacement bolt kits. Cold-start tick that quiets when warm + soot at manifold-to-head joint = stud failure. See known-issue-exhaust-manifold-stud-failure.",
  },
  {
    issueId: "blend_door_actuator_failure",
    issueAreaId: null,
    rockautoCategoryHints: ["Heat & Air Conditioning"],
    rockautoSubcategoryHints: ["Heater Air Door Actuator"],
    searchTerms: [
      "blend door actuator",
      "heater air door actuator",
      "YH-1779",
      "Dorman 604-252",
    ],
    preferredBrands: ["MOTORCRAFT", "DORMAN"],
    partNumbers: ["YH-1779", "604-252"],
    notes:
      "Driver-side temperature actuator is the most common failure. Motorcraft YH-1779 OEM; Dorman 604-252 is the cheaper community-accepted alternative. See known-issue-blend-door-actuator.",
  },
  {
    issueId: "iwe_grind",
    issueAreaId: "drivetrain_leak_or_boot",
    rockautoCategoryHints: ["Drivetrain", "Exhaust & Emission"],
    rockautoSubcategoryHints: ["4WD Vacuum Check Valve", "4WD Actuator", "Vacuum Hose"],
    searchTerms: [
      "IWE solenoid",
      "IWE actuator",
      "IWE vacuum check valve",
      "4WD actuator",
      "vacuum hose",
    ],
    notes:
      "Grinding in 2WD that goes away in 4WD = IWE vacuum issue. Replace the $15-$30 check valve first, then solenoid ($30-$60), then actuators ($50-$150/wheel) last. See known-issue-iwe-grinding.",
  },
  {
    issueId: "fuel_pump_driver_module_failure",
    issueAreaId: null,
    rockautoCategoryHints: ["Fuel & Air"],
    rockautoSubcategoryHints: ["Fuel Pump Drive Module"],
    searchTerms: ["fuel pump driver module", "FPDM", "Dorman 590-001"],
    preferredBrands: ["DORMAN", "MOTORCRAFT"],
    partNumbers: ["590-001"],
    notes:
      "Mounted on frame rail near spare tire. Intermittent stall that restarts after cooling = FPDM. Check inertia switch in passenger footwell FIRST (it's free). Apply dielectric grease to new connector. See known-issue-fuel-pump-driver-module.",
  },
  {
    issueId: "radiator_failure_orange_coolant",
    issueAreaId: "coolant_leak_source",
    rockautoCategoryHints: ["Cooling System"],
    rockautoSubcategoryHints: [
      "Radiator",
      "Radiator Cap",
      "Radiator Drain Petcock",
    ],
    searchTerms: ["radiator", "radiator 5.4", "Motorcraft Gold coolant"],
    notes:
      "Use Motorcraft Gold 50/50 (VC-7). NEVER mix with green coolant. 5.4 Triton coolant is gold, not the orange VC-3 used by the 6.2 Boss.",
  },
  {
    issueId: "water_pump_internal_leak",
    issueAreaId: "coolant_leak_source",
    rockautoCategoryHints: ["Cooling System"],
    rockautoSubcategoryHints: [
      "Water Pump",
      "Water Pump & Fan Clutch Assembly",
      "Water Pump Gasket",
      "Water Pump Seal / O-Ring",
    ],
    searchTerms: ["water pump 5.4", "water pump", "PW-423"],
    preferredBrands: ["MOTORCRAFT"],
    partNumbers: ["PW-423"],
    notes:
      "Weep hole at the bottom of the pump housing. Pink/green residue or active drip = pump going. Motorcraft PW-423 is OEM. Do it during a timing job — same labor access. See known-issue-water-pump-weep.",
  },
  {
    issueId: "alternator_failure",
    issueAreaId: "battery_charge_and_ground_path",
    rockautoCategoryHints: ["Electrical"],
    rockautoSubcategoryHints: [
      "Alternator / Generator",
      "Alternator / Generator Pulley",
    ],
    searchTerms: ["alternator", "alternator 150A", "150 amp alternator"],
    notes:
      "150A high-output unit. Running voltage below 13V at battery = alternator. Bearing whine increases with RPM. See known-issue-alternator-failure.",
  },
  {
    issueId: "vct_solenoid_tick",
    issueAreaId: "cam_phaser_tick_context",
    rockautoCategoryHints: ["Engine"],
    rockautoSubcategoryHints: [
      "Variable Valve Timing (VVT) Solenoid / Actuator",
      "Variable Valve Timing (VVT) Solenoid Gasket / Seal",
    ],
    searchTerms: ["VCT solenoid", "VVT solenoid", "Motorcraft CG-721"],
    preferredBrands: ["MOTORCRAFT"],
    partNumbers: ["CG-721"],
    notes:
      "Two solenoids, one per bank. Screens clog with sludge from infrequent oil changes — clean or replace as a cheap first step before committing to the full cam phaser job. See known-issue-vct-solenoid-tick.",
  },
  {
    issueId: "timing_chain_stretch_54",
    issueAreaId: "cam_phaser_tick_context",
    rockautoCategoryHints: ["Engine"],
    rockautoSubcategoryHints: [
      "Timing Chain & Component Kit",
      "Timing Chain",
      "Timing Chain Tensioner",
      "Timing Chain Guide / Damper",
    ],
    searchTerms: [
      "timing chain kit 5.4",
      "Cloyes 9-0391SB",
      "Melling timing kit",
    ],
    preferredBrands: ["CLOYES", "MELLING", "MOTORCRAFT"],
    partNumbers: ["9-0391SB"],
    notes:
      "Persistent rattle that does NOT fade on warm-up + P0016/P0017/P0018/P0019 = chain stretch (not just phasers). Always combine with phasers, tensioners, guides, VCT solenoids. Forum thread: \"5.4 issues. oiling, cam phaser and chain tentioner.\" See known-issue-timing-chain-stretch.",
  },
  {
    issueId: "ignition_coil_failure",
    issueAreaId: "ignition_misfire_path",
    rockautoCategoryHints: ["Ignition"],
    rockautoSubcategoryHints: ["Ignition Coil", "Ignition Coil Mounting Hardware"],
    searchTerms: ["ignition coil", "DG-521", "Motorcraft DG-521"],
    preferredBrands: ["MOTORCRAFT", "DENSO"],
    partNumbers: ["DG-521"],
    notes:
      "Coil-on-plug. Replace all 8 at the same time as spark plugs (shared labor). Avoid no-name Amazon coils. Denso is the only aftermarket the community trusts.",
  },
  {
    issueId: "throttle_body_carbon",
    issueAreaId: "intake_vacuum_air_leak",
    rockautoCategoryHints: ["Fuel & Air"],
    rockautoSubcategoryHints: ["Throttle Body Gasket"],
    searchTerms: ["throttle body", "throttle body cleaner", "CRC throttle body"],
    notes:
      "Clean with CRC throttle body cleaner — do NOT use carb cleaner (damages TPS coating). Idle relearn after: key on 30s, key off 30s, idle 3 min. See known-issue-throttle-body-carbon.",
  },
  {
    issueId: "valve_cover_gasket_leak",
    issueAreaId: null,
    rockautoCategoryHints: ["Engine"],
    rockautoSubcategoryHints: ["Valve Cover Gasket"],
    searchTerms: ["valve cover gasket", "valve cover gasket set"],
    notes:
      "89 lb-in (10 Nm) — over-torque warps the cover. Driver side easy; passenger side tight against firewall. See known-issue-valve-cover-gasket-leak.",
  },
  {
    issueId: "pcv_valve_failure_54",
    issueAreaId: "intake_vacuum_air_leak",
    rockautoCategoryHints: ["Exhaust & Emission"],
    rockautoSubcategoryHints: [
      "Positive Crankcase Ventilation (PCV) Hose",
      "Vacuum Hose",
    ],
    searchTerms: ["PCV valve", "PCV hose", "Motorcraft EV-278"],
    preferredBrands: ["MOTORCRAFT"],
    partNumbers: ["EV-278"],
    notes:
      "PCV valve EV-278. Stuck open: oil vapor fouls throttle body. Stuck closed: crankcase pressure pushes oil past seals. Cracked hose = vacuum leak (P0171/P0174). See known-issue-pcv-valve-failure.",
  },
  {
    issueId: "hub_bearing_failure",
    issueAreaId: "front_suspension_joint_play",
    rockautoCategoryHints: ["Steering"],
    rockautoSubcategoryHints: ["Knuckle Bearing", "Knuckle"],
    searchTerms: [
      "wheel hub bearing",
      "Timken SP580310",
      "Moog 515119",
      "front hub assembly",
    ],
    preferredBrands: ["TIMKEN", "MOOG"],
    partNumbers: ["SP580310", "515119"],
    notes:
      "Louder turning LEFT = RIGHT bearing failing (opposite side). Hub bolts: 20 lb-ft + 90°. See known-issue-hub-bearing-failure.",
  },
  {
    issueId: "imrc_stuck_butterflies",
    issueAreaId: "intake_vacuum_air_leak",
    rockautoCategoryHints: ["Engine"],
    rockautoSubcategoryHints: [
      "Intake Manifold Runner Control Valve / Solenoid",
      "Intake Manifold Actuator",
      "Intake Manifold Gasket",
    ],
    searchTerms: ["IMRC actuator", "intake manifold runner control"],
    notes:
      "External IMRC actuator: $40-$80 easy swap. If butterflies have broken inside the intake: full manifold replacement. P2004-P2009. See known-issue-imrc-stuck-butterflies.",
  },
  {
    issueId: "pats_no_start",
    issueAreaId: "connector_and_harness_fitment",
    rockautoCategoryHints: ["Electrical-Connector"],
    rockautoSubcategoryHints: ["Anti-Theft Control Module Connector"],
    searchTerms: ["PATS", "anti-theft module", "anti-theft connector"],
    notes:
      "Cranks but won't start + rapidly blinking theft light = PATS. Not a battery issue. Reprogramming needs two working programmed keys or a dealer/locksmith with IDS. See known-issue-pats-no-start.",
  },
  {
    issueId: "epas_steering_failure",
    issueAreaId: "steering_linkage_wear",
    rockautoCategoryHints: ["Steering"],
    rockautoSubcategoryHints: [
      "Steering Shaft",
      "Steering Column Shaft Seal",
      "Steering Wheel Position Sensor",
    ],
    searchTerms: ["EPAS", "steering column", "intermediate steering shaft"],
    notes:
      "Heavy intermittent steering + steering warning light = EPAS motor/module. Steering still works manually. Intermediate shaft U-joint also develops play (clunk on low-speed turn). See known-issue-power-steering-epas.",
  },

  // ─────────── 3.5 EcoBoost ───────────
  // The current catalog.json is for the 5.4L V8 only, so these entries surface
  // best-fit subcategories that will become exact once the catalog is rescaped
  // for the 3.5 EcoBoost. Search terms remain useful with the existing search.
  {
    issueId: "turbo_failure_ecoboost",
    issueAreaId: "turbo_bearing_failure",
    rockautoCategoryHints: ["Engine", "Fuel & Air"],
    rockautoSubcategoryHints: [],
    searchTerms: ["turbocharger", "turbo ecoboost", "turbo 3.5"],
    notes:
      "EcoBoost-only. Catalog currently scoped to 5.4L — fitment will be approximate until the EcoBoost catalog is added.",
  },
  {
    issueId: "hpfp_failure_ecoboost",
    issueAreaId: "turbo_bearing_failure",
    rockautoCategoryHints: ["Fuel & Air"],
    rockautoSubcategoryHints: ["Fuel Pump"],
    searchTerms: ["high pressure fuel pump", "HPFP", "fuel pump ecoboost"],
    notes:
      "EcoBoost-only. Catalog currently scoped to 5.4L — fitment will be approximate.",
  },
  {
    issueId: "boost_loss_charge_pipe",
    issueAreaId: "turbo_boost_leak",
    rockautoCategoryHints: ["Engine"],
    rockautoSubcategoryHints: [],
    searchTerms: [
      "charge pipe",
      "intercooler pipe",
      "intercooler boot",
      "charge pipe ecoboost",
    ],
    notes:
      "OEM plastic charge pipe on the passenger side is the #1 boost-leak failure point on the 3.5 EcoBoost. Catalog currently scoped to 5.4L.",
  },
  {
    issueId: "injector_failure_direct",
    issueAreaId: "direct_injection_carbon_buildup",
    rockautoCategoryHints: ["Fuel & Air"],
    rockautoSubcategoryHints: ["Fuel Injector", "Fuel Injector Seal / O-Ring"],
    searchTerms: [
      "direct injector ecoboost",
      "fuel injector 3.5",
      "high pressure injector",
    ],
    notes:
      "EcoBoost direct injectors. Catalog currently scoped to 5.4L — fitment approximate.",
  },
  {
    issueId: "timing_chain_stretch_ecoboost",
    issueAreaId: "timing_chain_stretch_ecoboost",
    rockautoCategoryHints: ["Engine"],
    rockautoSubcategoryHints: [
      "Timing Chain & Component Kit",
      "Timing Chain",
      "Timing Chain Tensioner",
      "Timing Chain Guide / Damper",
    ],
    searchTerms: [
      "timing chain ecoboost",
      "timing chain kit 3.5",
      "ecoboost chain kit",
    ],
    notes:
      "3.5 EcoBoost has four chains total. Cold-start rattle that fades with oil pressure + P0016-P0019 = chain stretch. SHOP-required repair.",
  },
  {
    issueId: "oil_consumption_pcv",
    issueAreaId: "intake_vacuum_air_leak",
    rockautoCategoryHints: ["Exhaust & Emission"],
    rockautoSubcategoryHints: [
      "Positive Crankcase Ventilation (PCV) Hose",
      "Vacuum Hose",
    ],
    searchTerms: [
      "PCV valve ecoboost",
      "PCV hose ecoboost",
      "oil catch can",
      "catch can ecoboost",
    ],
    notes:
      "EcoBoost PCV design vents oil vapor into the intake — accelerates intake-valve carbon. Catch can is the community-preferred preventive mod.",
  },
  {
    issueId: "intercooler_condensation",
    issueAreaId: "intercooler_condensation",
    rockautoCategoryHints: ["Heat & Air Conditioning"],
    rockautoSubcategoryHints: [],
    searchTerms: ["intercooler", "intercooler drain", "CAC drain"],
    notes:
      "Ford TSB 14-0130 revised intercooler + catch drain. White puff on first hard accel in cool weather is usually condensation — usually harmless.",
  },
  {
    issueId: "direct_injection_carbon_buildup",
    issueAreaId: "direct_injection_carbon_buildup",
    rockautoCategoryHints: ["Fuel & Air"],
    rockautoSubcategoryHints: ["Fuel Injector"],
    searchTerms: ["catch can", "walnut blast", "intake valve cleaning"],
    notes:
      "Walnut blasting is the standard cleaning method — no DIY catalog SKU. A catch can prevents future buildup but doesn't undo what's already baked on.",
  },

  // ─────────── Suspension / Steering / Brakes ───────────
  {
    issueId: "control_arm_failure",
    issueAreaId: "front_suspension_joint_play",
    rockautoCategoryHints: ["Suspension"],
    rockautoSubcategoryHints: [
      "Control Arm",
      "Control Arm Bushing",
      "Control Arm Anchor Bolt",
    ],
    searchTerms: ["control arm", "lower control arm", "upper control arm"],
    preferredBrands: ["MOOG", "MEVOTECH"],
    notes:
      "Stamped-steel lower control arms rust from the inside out. The ball joint pocket can fail catastrophically — SAFETY CRITICAL. See known-issue-lower-control-arm-rust.",
  },
  {
    issueId: "tie_rod_end_failure",
    issueAreaId: "steering_linkage_wear",
    rockautoCategoryHints: ["Steering"],
    rockautoSubcategoryHints: ["Tie Rod End", "Tie Rod End Boot"],
    searchTerms: ["tie rod end", "outer tie rod", "inner tie rod"],
    preferredBrands: ["MOOG", "MOTORCRAFT"],
    notes:
      "Inspect boot for splits. Looseness causes vibration, pull, and uneven tire wear.",
  },
  {
    issueId: "ball_joint_failure",
    issueAreaId: "front_suspension_joint_play",
    rockautoCategoryHints: ["Suspension"],
    rockautoSubcategoryHints: ["Ball Joint"],
    searchTerms: ["ball joint", "upper ball joint", "lower ball joint"],
    preferredBrands: ["MOOG", "MOTORCRAFT"],
    notes:
      "Lower ball joints are load-bearing and require a press for replacement. Any noticeable clunk at 12/6 o'clock = worn. See known-issue-ball-joint-wear.",
  },
  {
    issueId: "sway_bar_link_failure",
    issueAreaId: "front_suspension_joint_play",
    rockautoCategoryHints: ["Suspension"],
    rockautoSubcategoryHints: ["Sway Bar Link", "Sway Bar Bushing"],
    searchTerms: ["sway bar link", "stabilizer link", "sway bar end link"],
    preferredBrands: ["MOOG"],
    notes: "Easy DIY. Clunk over bumps with no play in larger joints = end links.",
  },
  {
    issueId: "shock_strut_failure",
    issueAreaId: "front_suspension_joint_play",
    rockautoCategoryHints: ["Suspension"],
    rockautoSubcategoryHints: [
      "Shock / Strut",
      "Shock / Strut & Coil Spring Assembly",
      "Shock / Strut Mount",
      "Shock / Strut Bellow",
      "Shock Bushing",
    ],
    searchTerms: ["shock absorber", "shock", "strut", "Bilstein 4600", "Rancho RS5000X"],
    preferredBrands: ["BILSTEIN", "RANCHO", "MOTORCRAFT"],
    notes:
      "Stock dampers wear by ~80K miles. Bilstein 4600 (OE replacement) and Rancho RS5000X are community picks.",
  },
  {
    issueId: "brake_caliper_seize",
    issueAreaId: "brake_hose_or_line_concern",
    rockautoCategoryHints: ["Brake & Wheel Hub"],
    rockautoSubcategoryHints: [
      "Caliper",
      "Caliper Bracket",
      "Caliper Repair Kit",
      "Caliper Slide Pin",
      "Caliper Slide Pin Boot / Bushing",
      "Caliper Piston",
    ],
    searchTerms: ["brake caliper", "caliper", "caliper slide pin"],
    notes:
      "Seized slide pins cause uneven pad wear and pulling. Often fixable with a slide pin kit + grease before full caliper replacement.",
  },
  {
    issueId: "brake_pad_wear",
    issueAreaId: "brake_hose_or_line_concern",
    rockautoCategoryHints: ["Brake & Wheel Hub"],
    rockautoSubcategoryHints: ["Brake Pad", "Rotor & Brake Pad Kit"],
    searchTerms: ["brake pad", "ceramic brake pad", "front brake pad"],
    preferredBrands: ["MOTORCRAFT", "AKEBONO", "RAYBESTOS"],
    notes:
      "Match pad-and-rotor sets when possible. Ceramic pads for daily-driver dust control.",
  },
  {
    issueId: "rotor_warp",
    issueAreaId: "brake_hose_or_line_concern",
    rockautoCategoryHints: ["Brake & Wheel Hub"],
    rockautoSubcategoryHints: ["Rotor", "Rotor & Brake Pad Kit", "Rotor Shim"],
    searchTerms: ["brake rotor", "front rotor", "rear rotor"],
    notes:
      "Pulsation through the pedal at highway braking = warped or unevenly worn rotor. Replace pads with rotors.",
  },
  {
    issueId: "power_steering_pump_whine",
    issueAreaId: "steering_linkage_wear",
    rockautoCategoryHints: ["Steering"],
    rockautoSubcategoryHints: [
      "Power Steering Pump",
      "Power Steering Pump Pulley",
      "Power Steering Pump & Hoses Kit",
      "Power Steering Pump Seal Kit",
      "Power Steering Reservoir",
      "Power Steering Pressure Hose",
      "Power Steering Return Hose",
    ],
    searchTerms: ["power steering pump", "power steering hose"],
    notes:
      "2010 F-150 5.4L still uses a hydraulic pump (later EPAS trims are different). Whine at low RPM = low fluid or worn pump.",
  },
  {
    issueId: "rack_pinion_leak",
    issueAreaId: "steering_linkage_wear",
    rockautoCategoryHints: ["Steering"],
    rockautoSubcategoryHints: ["Rack and Pinion", "Rack and Pinion Bellow"],
    searchTerms: ["rack and pinion", "steering rack"],
    notes:
      "Wet boots and power steering fluid loss = rack leak. Inspect rack boots before assuming pump.",
  },

  // ─────────── Electrical / Body ───────────
  {
    issueId: "door_lock_actuator",
    issueAreaId: "connector_and_harness_fitment",
    rockautoCategoryHints: ["Body & Lamp Assembly"],
    rockautoSubcategoryHints: ["Door Lock Actuator", "Door Lock Clip"],
    searchTerms: ["door lock actuator"],
    notes:
      "Failure-by-door is common. Replace per-door rather than as a set.",
  },
  {
    issueId: "window_regulator",
    issueAreaId: null,
    rockautoCategoryHints: ["Interior"],
    rockautoSubcategoryHints: [
      "Window Regulator",
      "Window Regulator & Motor Assembly",
      "Window Motor",
    ],
    searchTerms: ["window regulator", "window motor"],
    notes:
      "Get the regulator-and-motor assembly when ordering — labor is the same.",
  },
  {
    issueId: "door_ajar_sensor",
    issueAreaId: "connector_and_harness_fitment",
    rockautoCategoryHints: ["Body & Lamp Assembly"],
    rockautoSubcategoryHints: ["Door Lock Actuator"],
    searchTerms: ["door latch assembly", "door ajar"],
    notes:
      "First try spraying white lithium grease into the latch — often fixes it. Permanent fix is full latch assembly replacement. See known-issue-door-ajar-sensor.",
  },

  // ─────────── Cooling ───────────
  {
    issueId: "thermostat_failure",
    issueAreaId: "coolant_leak_source",
    rockautoCategoryHints: ["Cooling System"],
    rockautoSubcategoryHints: [
      "Thermostat",
      "Thermostat Housing / Water Outlet",
      "Thermostat / Thermostat Housing / Water Outlet Seal",
    ],
    searchTerms: ["thermostat", "thermostat housing"],
    notes:
      "Stuck open = slow warm-up + low heater output. Stuck closed = overheat. Replace gasket/seal at the same time.",
  },
  {
    issueId: "fan_clutch_failure",
    issueAreaId: "coolant_leak_source",
    rockautoCategoryHints: ["Cooling System"],
    rockautoSubcategoryHints: [
      "Radiator Fan Clutch",
      "Water Pump & Fan Clutch Assembly",
      "Radiator Fan Blade",
    ],
    searchTerms: ["fan clutch", "radiator fan clutch"],
    notes:
      "Hot idle overheating with highway cruise being fine = fan clutch. Roar continuously at higher RPM = locked clutch.",
  },

  // ─────────── Drivetrain ───────────
  {
    issueId: "transmission_shudder_6r80",
    issueAreaId: "drivetrain_leak_or_boot",
    rockautoCategoryHints: ["Transmission-Automatic"],
    rockautoSubcategoryHints: [
      "Torque Converter Clutch Solenoid",
      "Shift Solenoid",
      "Pressure Control (EPC) Solenoid",
      "Fluid Pan Gasket",
    ],
    searchTerms: ["MERCON LV", "transmission fluid", "torque converter clutch solenoid"],
    notes:
      "Shudder at 35-50 mph under light throttle on the 6R80 = TCC issue. Drain-and-fill with MERCON LV first (NEVER MERCON V or Dexron). XT-10-QLVC is the OEM fluid. See known-issue-transmission-shudder.",
  },
];

const ISSUE_INDEX = new Map<TruckIssueId, IssuePartsMap>(
  ISSUE_PARTS_MAP.map((entry) => [entry.issueId, entry]),
);

export function getIssuePartsMap(
  issueId: TruckIssueId,
): IssuePartsMap | undefined {
  return ISSUE_INDEX.get(issueId);
}

export interface FindPartsForIssueOptions {
  engineId?: EngineId;
  trimId?: TrimId;
  maxResults?: number;
}

export interface FindPartsForIssueResult {
  issueId: TruckIssueId;
  issueAreaId: TruckIssueAreaId | null;
  matched: boolean;
  /** Combined catalog hits across the layered search terms. */
  results: PartSearchResult[];
  /** RockAuto category/subcategory hints from the issue map + linker. */
  categoryHints: string[];
  subcategoryHints: string[];
  /** All search terms tried, in order. */
  searchTermsTried: string[];
  preferredBrands?: string[];
  partNumbers?: string[];
  notes?: string;
}

function dedupeSearchResults(
  results: PartSearchResult[],
  maxResults: number,
): PartSearchResult[] {
  const seen = new Set<string>();
  const out: PartSearchResult[] = [];
  for (const r of results) {
    const key = `${r.category}::${r.subcategory}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(r);
    if (out.length >= maxResults) break;
  }
  return out;
}

/**
 * Returns concrete RockAuto parts for a diagnosed issue. Uses
 * searchPartsCatalog under the hood, layered with:
 *   - the issue map's search terms
 *   - the issue map's category/subcategory hints
 *   - parts-linker hints for the given engine/trim (additional search terms)
 *
 * Results are deduped by category::subcategory and capped at maxResults
 * (default 5 — matches the existing searchReplacementParts tool).
 */
export function findPartsForIssue(
  issueId: TruckIssueId,
  options: FindPartsForIssueOptions = {},
): FindPartsForIssueResult {
  const entry = ISSUE_INDEX.get(issueId);
  const maxResults = options.maxResults ?? 5;

  if (!entry) {
    return {
      issueId,
      issueAreaId: null,
      matched: false,
      results: [],
      categoryHints: [],
      subcategoryHints: [],
      searchTermsTried: [],
    };
  }

  // Build the layered search-term list. Issue map terms come first because
  // they are the most specific. Subcategory hints are appended as fallback
  // search strings. Linker terms are last — they may broaden the search by
  // engine/trim.
  const searchTermsTried: string[] = [];
  const seenTerm = new Set<string>();
  const pushTerm = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const key = trimmed.toLowerCase();
    if (seenTerm.has(key)) return;
    seenTerm.add(key);
    searchTermsTried.push(trimmed);
  };

  // Subcategory hints come first — they are exact matches against catalog
  // `subcategory` strings, so they dominate the score in searchPartsCatalog.
  // The free-text searchTerms are layered behind them as broader fallbacks.
  entry.rockautoSubcategoryHints.forEach(pushTerm);
  entry.searchTerms.forEach(pushTerm);

  // Layer in linker entries when an engine or trim is specified.
  if (options.engineId || options.trimId) {
    const linkerEntries = getLinkerEntries({
      engineId: options.engineId,
      trimId: options.trimId,
    });
    for (const linker of linkerEntries) {
      linker.searchTerms.forEach(pushTerm);
    }
  }

  // Run searchPartsCatalog for each term and merge results.
  const merged: PartSearchResult[] = [];
  for (const term of searchTermsTried) {
    const hits = searchPartsCatalog(term, maxResults);
    for (const hit of hits) {
      merged.push(hit);
    }
    if (merged.length >= maxResults * 4) {
      // Enough raw hits to satisfy a deduped top-maxResults output.
      break;
    }
  }

  const deduped = dedupeSearchResults(merged, maxResults);

  return {
    issueId,
    issueAreaId: entry.issueAreaId,
    matched: deduped.length > 0,
    results: deduped,
    categoryHints: entry.rockautoCategoryHints,
    subcategoryHints: entry.rockautoSubcategoryHints,
    searchTermsTried,
    preferredBrands: entry.preferredBrands,
    partNumbers: entry.partNumbers,
    notes: entry.notes,
  };
}

export function listKnownIssueIds(): TruckIssueId[] {
  return ISSUE_PARTS_MAP.map((entry) => entry.issueId);
}
