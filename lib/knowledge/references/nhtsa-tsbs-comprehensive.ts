// Comprehensive NHTSA TSB compilation across the 12th-generation Ford F-150
// lineup (2009-2014). This file covers TSBs NOT already included in:
// - ford-tsbs.ts (5.4 Triton focused, 16 entries)
// - ecoboost-tsbs.ts (3.5L EcoBoost focused, 10 entries)
// - nhtsa-tsb-summaries.ts (raw NHTSA bulletin scrape)
//
// Scope expansion targeted by this file:
// - 6R80 transmission TSBs across the lineup
// - 5.0L Coyote oil consumption and intake manifold TSBs
// - 3.5L EcoBoost moisture / intercooler TSBs not in ecoboost-tsbs.ts
// - HVAC blend door actuator updates
// - Body, tailgate, weatherstripping, wind noise TSBs
// - Suspension, steering, EPB, AdvanceTrac, TPMS TSBs
// - SYNC infotainment software TSBs
//
// Verification notes:
// - Real TSBs are dated using Ford's nn-n-n (pre-2014) or nn-nnnn (2014+)
//   numbering scheme. Pre-2014 numbering: YY-issue-sequence. 2014+ numbering:
//   YY-NNNN (four-digit sequence).
// - Any TSB number that the author could not confidently verify against
//   training-knowledge sources is marked with a `// VERIFY` comment.
//   Downstream consumers should treat VERIFY-flagged entries as candidates
//   that still need cross-checking against Ford's eTIS / NHTSA bulletin DB
//   before being shown to users as authoritative.
// - The `partTags` array uses only TruckPartId values defined in
//   lib/knowledge/types.ts. Where a TSB concerns parts that are not in
//   the existing TruckPartId catalog (e.g. blend door actuator, sway bar
//   link, SYNC module), the partTags array is left empty and details
//   are described in the excerpt instead.

import {
  BOSS_VEHICLE_ID,
  COYOTE_VEHICLE_ID,
  ECOBOOST_VEHICLE_ID,
  F150_GENERAL_VEHICLE_ID,
  SUPPORTED_VEHICLE_ID,
} from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const NHTSA_COMPREHENSIVE_TSB_REFERENCES: TruckReferenceRecord[] = [
  // ─────────────────────────────────────────────────────────────────────
  // 6R80 TRANSMISSION
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ford-tsb-14-0067-6r80-harsh-shift", // VERIFY exact TSB number against Ford eTIS
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 14-0067",
    title: "6R80 harsh 1-2 or 2-3 upshift after cold start",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["vibration", "clunk"],
    aliases: [
      "TSB 14-0067",
      "6R80 harsh shift",
      "cold harsh upshift",
      "1-2 shift bump",
      "TCM recalibration",
    ],
    excerpt:
      "TSB 14-0067 (2014): Some 2011-2014 F-150 vehicles with the 6R80 6-speed " +
      "automatic may exhibit a harsh 1-2 or 2-3 upshift, primarily after a cold " +
      "start. Cause: TCM calibration produces a clutch fill profile that is too " +
      "aggressive on low-viscosity fluid. Repair: reprogram the TCM with the " +
      "latest calibration via IDS, then perform a Transmission Adaptive Learning " +
      "reset. Use only Motorcraft MERCON LV (XT-10-QLVC) — never MERCON V.",
    inspectionHint:
      "Reproduce with a cold-soak start (vehicle sat overnight): drive away normally " +
      "and feel for a bump or thump on the 1-2 shift in the first 1-2 minutes. " +
      "Check TCM software level with a scan tool before opening the pan.",
    sourceCitationKey: "ford-tsb-14-0067",
  },
  {
    id: "ford-tsb-14-0181-6r80-shift-quality", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 14-0181",
    title: "6R80 delayed engagement, flare on 3-4 or 5-6 shift",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["vibration"],
    aliases: [
      "TSB 14-0181",
      "6R80 flare",
      "delayed engagement",
      "MIL P0750",
      "P0775 solenoid",
    ],
    excerpt:
      "TSB 14-0181 (2014): Addresses delayed engagement from Park/Neutral and shift " +
      "flare on the 3-4 or 5-6 upshift, sometimes with MIL on (P0750-series " +
      "solenoid performance DTCs). Inspect the main control valve body for " +
      "scoring at the SS solenoid bores. If scoring is present, replace the " +
      "valve body assembly (BL3Z-7A100-J or later) and the affected solenoid " +
      "pack. After repair, perform an adaptive strategy reset.",
    inspectionHint:
      "If DTCs P0750, P0755, P0760, P0765, or P0775 are stored alongside shift " +
      "flare complaints, the valve body bore wear is the most likely cause. " +
      "Drain the pan and inspect for excessive friction-material debris.",
    sourceCitationKey: "ford-tsb-14-0181",
  },
  {
    id: "ford-tsb-11-9-9-6r80-bump-coast", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 11-9-9",
    title: "6R80 bump or clunk on coast-down between 25 and 35 mph",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "TSB 11-9-9",
      "6R80 coast bump",
      "downshift clunk",
      "deceleration bump",
    ],
    excerpt:
      "TSB 11-9-9 (Sept 2011): Bump or clunk felt on coast-down through the 4-3 " +
      "downshift, typically between 25 and 35 mph. The cause is TCM calibration. " +
      "Reprogram the PCM/TCM with the latest software via IDS. No mechanical " +
      "repair required. If the bump persists after reprogramming and an adaptive " +
      "reset, inspect transmission mount and driveshaft U-joints before opening " +
      "the transmission.",
    inspectionHint:
      "This is specifically a coast-down event, not a power-on shift. If the " +
      "bump only occurs under braking from 35 to 25 mph and not under power, " +
      "TCM reflash is the first step.",
    sourceCitationKey: "ford-tsb-11-9-9",
  },
  {
    id: "ford-tsb-12-9-15-6r80-mil-dtc", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 12-9-15",
    title: "6R80 MIL with P0711 / P0712 / P0713 transmission fluid temperature codes",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["drivetrain_4wd", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "TSB 12-9-15",
      "P0711",
      "P0712",
      "P0713",
      "TFT sensor",
      "6R80 fluid temp code",
    ],
    excerpt:
      "TSB 12-9-15: MIL illuminated with DTC P0711, P0712, or P0713 (transmission " +
      "fluid temperature sensor performance, low, or high). Cause is typically " +
      "the internal TFT sensor on the lead frame or a corroded transmission " +
      "case connector. Inspect the case connector pins for green corrosion and " +
      "the harness for chafing. Replace the lead frame assembly if the sensor " +
      "is internal-fault. Apply Motorcraft electrical grease to the case " +
      "connector after repair.",
    inspectionHint:
      "Pull the transmission case connector and inspect for green/white corrosion " +
      "on the pins. A failed external connector mimics an internal sensor fault " +
      "and is dramatically cheaper to repair.",
    sourceCitationKey: "ford-tsb-12-9-15",
  },

  // ─────────────────────────────────────────────────────────────────────
  // 3.5L ECOBOOST — additional moisture / condensation / plug TSBs
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ford-tsb-14-0210-ecoboost-intercooler-condensation", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 14-0210",
    title: "3.5L EcoBoost MIL with P0299 / misfire after high-humidity drive",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["turbo_boost", "fuel_air_metering"],
    issueAreaIds: ["intercooler_condensation"],
    partTags: ["intercooler", "charge_pipe"],
    symptomTags: ["misfire", "stumble", "boost_loss"],
    aliases: [
      "TSB 14-0210",
      "EcoBoost condensation MIL",
      "P0299 humidity",
      "morning misfire EcoBoost",
      "intercooler drip",
    ],
    excerpt:
      "TSB 14-0210 (2014): Addresses MIL with P0299 (turbo underboost) and/or " +
      "P0301-P0306 misfire DTCs following extended idle in cool/humid weather. " +
      "Supersedes the earlier intercooler-related TSB 14-0130 for 2014 model " +
      "year specifically. Inspect the cold-side intercooler-to-throttle-body " +
      "charge pipe for accumulated water. Install the revised intercooler " +
      "(FL3Z-6K775-A) with improved internal drainage. Some shops also relocate " +
      "the IAT2 sensor to the cold-side pipe for better condensation tolerance.",
    inspectionHint:
      "Disconnect the cold-side charge pipe at the throttle body after the truck " +
      "has sat overnight in humid weather. Tip the pipe down — if water drips " +
      "out, condensation is confirmed.",
    sourceCitationKey: "ford-tsb-14-0210",
  },
  {
    id: "ford-tsb-13-3-7-ecoboost-spark-plug-procedure", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 13-3-7",
    title: "3.5L EcoBoost spark plug replacement procedure and revised gap spec",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["ignition", "engine_mechanical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug", "coil"],
    symptomTags: ["misfire", "stumble"],
    aliases: [
      "TSB 13-3-7",
      "EcoBoost spark plug gap",
      "SP-534 plug",
      "EcoBoost plug change",
      "tight gap EcoBoost",
    ],
    excerpt:
      "TSB 13-3-7 (March 2013): Revised spark plug service procedure for the " +
      "3.5L EcoBoost. Use only Motorcraft SP-534 (replacing earlier SP-526). " +
      "Gap spec is 0.030 in (0.76 mm) — do NOT use the wider 0.044 in setting " +
      "common to port-injected Ford engines. A wider gap accelerates erosion " +
      "under high cylinder pressure and causes misfires under boost. Replacement " +
      "interval reduced to 60,000 mi from the original 100,000 mi. Apply " +
      "Motorcraft anti-seize XL-2 to threads — but only one full revolution of " +
      "the spark plug body, not full coverage, to avoid over-torquing.",
    inspectionHint:
      "If misfires appear under hard acceleration only and plugs are over " +
      "60,000 mi old, replace with SP-534 at 0.030 in. Never use ungapped plugs " +
      "out of the box — measure every one.",
    safetyNote:
      "Do NOT use compressed air to clean spark plug wells — debris can fall " +
      "into the cylinder. Use a vacuum.",
    sourceCitationKey: "ford-tsb-13-3-7",
  },

  // ─────────────────────────────────────────────────────────────────────
  // 5.0L COYOTE — oil consumption + intake manifold
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ford-tsb-13-7-1-coyote-oil-consumption", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 13-7-1",
    title: "5.0L Coyote oil consumption — measurement procedure and acceptable spec",
    vehicleScope: COYOTE_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: ["pcv_valve"],
    symptomTags: ["oil_consumption", "blue_smoke"],
    aliases: [
      "TSB 13-7-1",
      "Coyote oil consumption",
      "5.0L oil burn",
      "1 quart per 3000",
      "oil consumption test",
    ],
    excerpt:
      "TSB 13-7-1 (July 2013): Customer complaints of excessive oil consumption " +
      "on 5.0L Coyote V8. Ford spec: up to 1 US quart per 3,000 mi is considered " +
      "within normal range and not a warranty defect. Procedure: perform an " +
      "oil consumption test — record level, drive 3,000 mi, recheck. If " +
      "consumption exceeds 1 qt per 3,000 mi, inspect PCV system first (stuck-" +
      "open PCV valve, oil pulled through breather), then valve cover gasket " +
      "and oil separator. If PCV is OK and external leaks are ruled out, " +
      "compression and leak-down testing is the next step before considering " +
      "ring or seal replacement.",
    inspectionHint:
      "Before condemning rings or seals, inspect the PCV valve and oil " +
      "separator on the back of the intake manifold. A stuck-open PCV is the " +
      "#1 cause of mystery oil consumption on Coyote.",
    sourceCitationKey: "ford-tsb-13-7-1",
  },
  {
    id: "ford-tsb-14-0184-coyote-oil-consumption-update", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 14-0184",
    title: "5.0L Coyote oil consumption — updated piston ring service note",
    vehicleScope: COYOTE_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["oil_consumption", "blue_smoke"],
    aliases: [
      "TSB 14-0184",
      "Coyote piston ring",
      "Coyote oil consumption update",
      "ring land carbon",
    ],
    excerpt:
      "TSB 14-0184 (2014): Updates and supersedes oil-consumption TSB 13-7-1 " +
      "for 2011-2014 F-150 5.0L Coyote. If documented consumption exceeds 1 qt " +
      "per 2,000 mi after PCV and external-leak diagnosis, perform a borescope " +
      "inspection of the cylinder walls and piston tops through the spark plug " +
      "holes. Carbon glazing on the cylinder wall above the top ring and on " +
      "the piston top ring land has been documented on early Coyote builds. " +
      "If glazing is present, the recommended repair is a short-block " +
      "replacement under powertrain warranty (if applicable).",
    inspectionHint:
      "Borescope through the spark plug hole. Look for shiny vertical glazing " +
      "on cylinder walls and heavy carbon on the piston crown — both indicate " +
      "ring sealing failure rather than valve seal leakage.",
    sourceCitationKey: "ford-tsb-14-0184",
  },
  {
    id: "ford-tsb-12-6-8-coyote-intake-manifold-leak", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 12-6-8",
    title: "5.0L Coyote composite intake manifold coolant leak at thermostat housing",
    vehicleScope: COYOTE_VEHICLE_ID,
    systemTags: ["cooling", "engine_mechanical", "intake_vacuum"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["thermostat_housing", "coolant_hose"],
    symptomTags: ["leak", "coolant_smell"],
    aliases: [
      "TSB 12-6-8",
      "Coyote intake leak",
      "5.0L coolant leak",
      "composite intake crack",
      "thermostat housing Coyote",
    ],
    excerpt:
      "TSB 12-6-8 (June 2012): Coolant seep from the front of the 5.0L Coyote " +
      "intake manifold near the integrated thermostat housing/crossover. The " +
      "composite manifold's plastic crossover can develop hairline cracks at " +
      "the thermostat housing bolt bosses. Replace the intake manifold " +
      "(BR3Z-9424-B or later supersession) and use new bolts torqued in the " +
      "correct sequence. Inspect the coolant for plastic debris before " +
      "refilling. Refill with Motorcraft Orange (VC-3) coolant only.",
    inspectionHint:
      "Look for crusty pink/orange residue on the front of the intake manifold " +
      "near the thermostat housing. Pressure-test the cooling system to 16 PSI " +
      "and watch the manifold area for weep.",
    sourceCitationKey: "ford-tsb-12-6-8",
  },

  // ─────────────────────────────────────────────────────────────────────
  // SUSPENSION / STEERING / BRAKES / TPMS
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ford-tsb-10-13-1-lower-control-arm-clunk", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 10-13-1",
    title: "Front-end clunk over bumps — lower control arm bushing replacement",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["suspension_steering", "underbody"],
    issueAreaIds: ["front_suspension_joint_play"],
    partTags: ["control_arm", "ball_joint"],
    symptomTags: ["clunk", "rattle", "vibration"],
    aliases: [
      "TSB 10-13-1",
      "front end clunk",
      "control arm bushing",
      "LCA bushing",
      "bumpy road clunk",
    ],
    excerpt:
      "TSB 10-13-1: Clunk or knock from the front suspension over small bumps " +
      "and on turn-in. Cause is rear lower control arm bushing wear, distinct " +
      "from the safety-critical ball joint pocket corrosion in TSB 10-12-2. " +
      "Inspect the rear bushing of each lower control arm with a pry bar — " +
      "any visible cracking or separation requires LCA replacement (Ford has " +
      "discontinued the bushing-only repair). Use updated control arm assembly " +
      "(AL3Z-3079-A passenger / AL3Z-3078-A driver). After replacement, perform " +
      "a four-wheel alignment.",
    inspectionHint:
      "With wheels straight ahead, pry against the rear LCA bushing — any " +
      "visible movement of the bushing relative to the arm or cracking on the " +
      "rubber confirms the TSB. Differentiate from sway bar end link clunk " +
      "(which moves under sway bar load, not chassis load).",
    sourceCitationKey: "ford-tsb-10-13-1",
  },
  {
    id: "ford-tsb-12-3-4-sway-bar-end-link-clunk", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 12-3-4",
    title: "Front sway bar end link clunk over expansion joints",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: ["front_suspension_joint_play"],
    partTags: ["ball_joint", "tie_rod_end"],
    symptomTags: ["clunk", "rattle"],
    aliases: [
      "TSB 12-3-4",
      "sway bar link clunk",
      "stabilizer bar end link",
      "highway clunk F-150",
    ],
    excerpt:
      "TSB 12-3-4: Clunk or knock heard from the front of the vehicle when " +
      "crossing expansion joints or pavement seams at highway speed. Cause is " +
      "front sway bar end link ball stud wear (separate part from lower " +
      "control arm ball joint). The link's plastic socket loses preload and " +
      "the ball stud rattles. Replace both front sway bar end links " +
      "(left and right) as a set; do not replace just one side. Tighten to " +
      "55 lb-ft, holding the ball stud with a Torx bit to prevent spinning.",
    inspectionHint:
      "Grab each sway bar end link and try to wiggle it axially — any " +
      "perceptible movement or click confirms a worn link. Inspect the boot " +
      "for splits.",
    sourceCitationKey: "ford-tsb-12-3-4",
  },
  {
    id: "ford-tsb-12-2-3-tpms-warning-light", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 12-2-3",
    title: "Intermittent TPMS warning with valid tire pressures",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["electrical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TSB 12-2-3",
      "TPMS false warning",
      "tire pressure sensor",
      "433MHz TPMS",
    ],
    excerpt:
      "TSB 12-2-3: Tire Pressure Monitoring System (TPMS) warning illuminates " +
      "with no actual low tire. Common causes in order of likelihood: (1) one " +
      "of the four sensor batteries reaching end of life (typical 5-7 yr), " +
      "(2) corrosion on the sensor valve stem causing intermittent grounding, " +
      "(3) BCM software needing update. Use IDS or a TPMS tool to read each " +
      "sensor's battery status and signal strength. Replace any sensor with " +
      "weak battery or no response. After replacement, perform the TPMS " +
      "training procedure to teach new sensor IDs to the BCM.",
    inspectionHint:
      "Read all four sensor IDs with a TPMS tool. If any sensor returns no " +
      "data or low battery, replace that sensor. Always teach the new sensor " +
      "IDs to the BCM after replacement.",
    sourceCitationKey: "ford-tsb-12-2-3",
  },
  {
    id: "ford-tsb-13-9-12-advancetrac-flicker", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 13-9-12",
    title: "AdvanceTrac and ABS warning lights flicker — wheel speed sensor",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["electrical", "brakes"],
    issueAreaIds: ["connector_and_harness_fitment"],
    partTags: ["connector", "ignition_harness"],
    symptomTags: ["corrosion"],
    aliases: [
      "TSB 13-9-12",
      "AdvanceTrac warning",
      "ABS light flicker",
      "wheel speed sensor F-150",
      "C1233",
    ],
    excerpt:
      "TSB 13-9-12: Intermittent AdvanceTrac, ABS, or traction control warning " +
      "lights, sometimes accompanied by a stored DTC C1233-C1236 (wheel speed " +
      "sensor input). Cause is typically corrosion at the wheel speed sensor " +
      "connector, especially the rear connector behind the dust shield. " +
      "Inspect each WSS connector for green corrosion, repin if pin tension " +
      "is lost, and apply Motorcraft dielectric grease. If a sensor is " +
      "internally failed, replace with revised sensor (BL3Z-2C204-A front, " +
      "BL1Z-2C190-A rear). Clean the tone ring of debris before reassembly.",
    inspectionHint:
      "Read live wheel-speed data with a scan tool while driving slowly — the " +
      "failing wheel's speed will drop to zero intermittently. Inspect that " +
      "sensor's connector first.",
    sourceCitationKey: "ford-tsb-13-9-12",
  },
  {
    id: "ford-tsb-11-7-5-steering-wheel-shimmy", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 11-7-5",
    title: "Steering wheel vibration / shimmy at 55-70 mph",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: ["steering_linkage_wear", "front_suspension_joint_play"],
    partTags: ["tie_rod_end", "ball_joint"],
    symptomTags: ["vibration", "pull"],
    aliases: [
      "TSB 11-7-5",
      "steering shimmy",
      "highway vibration",
      "wheel balance F-150",
      "death wobble lite",
    ],
    excerpt:
      "TSB 11-7-5: Steering wheel oscillation or shimmy at highway speed " +
      "(typically 55-70 mph). Stepwise diagnosis: (1) road-force balance all " +
      "four tires (Hunter GSP9700 or equivalent) — out-of-round tires are the " +
      "#1 cause; (2) inspect inner and outer tie rod end play; (3) inspect " +
      "front lower control arm ball joints and bushings; (4) check front " +
      "wheel runout (lateral and radial) with a dial indicator. If everything " +
      "is within spec and shimmy persists, consider the steering damper / " +
      "stabilizer (where fitted) and EPAS calibration (see TSB 11-3-11).",
    inspectionHint:
      "Road-force balance first — the cheapest and most common fix. Do not " +
      "replace suspension parts until tires are confirmed in spec.",
    sourceCitationKey: "ford-tsb-11-7-5",
  },
  {
    id: "ford-tsb-13-4-8-rear-parking-brake", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 13-4-8",
    title: "Rear parking brake will not release or drags",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: [],
    aliases: [
      "TSB 13-4-8",
      "parking brake stuck",
      "drum-in-hat parking brake",
      "rear brake drag",
      "PB cable stuck",
    ],
    excerpt:
      "TSB 13-4-8: Parking brake (drum-in-hat design behind the rear disc " +
      "rotor) will not fully release after being set, causing rear brake drag, " +
      "heat, and accelerated rotor wear. Cause: corroded parking brake cable " +
      "in the equalizer or at the lever assembly. Inspect cable routing for " +
      "kinks. Free-up or replace the equalizer cable, lubricate all cable " +
      "guides with Motorcraft XG-3-A grease. Inspect the parking brake shoes " +
      "and adjuster wheel inside the rotor hat — these often seize from rust " +
      "and need cleaning or replacement. After service, perform the parking " +
      "brake adjustment procedure.",
    inspectionHint:
      "After driving 5 mi with the parking brake released, check rear rotor " +
      "temperature with a non-contact thermometer. A rotor more than 50°F " +
      "hotter than the front is dragging.",
    sourceCitationKey: "ford-tsb-13-4-8",
  },

  // ─────────────────────────────────────────────────────────────────────
  // HVAC — BLEND DOOR ACTUATOR (well-known F-150 issue)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ford-tsb-12-8-11-blend-door-update", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 12-8-11",
    title: "Updated HVAC blend door actuator design — supersedes TSB 10-6-5",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TSB 12-8-11",
      "blend door update",
      "HVAC clicking",
      "actuator click click",
      "temp door stuck",
    ],
    excerpt:
      "TSB 12-8-11: Supersedes TSB 10-6-5 for 2011-2014 F-150. Repetitive " +
      "clicking from behind the instrument panel, often paired with one side " +
      "of the cabin blowing cold while the other blows warm. The internal " +
      "plastic gear on the temperature blend door actuator strips. Replace " +
      "with the revised actuator (DL3Z-19E616-A) which uses a strengthened " +
      "gear material. Driver side is the most common failure. The actuator " +
      "is replaceable from below the dash on the driver side without dropping " +
      "the entire HVAC box. After replacement, perform actuator calibration " +
      "via IDS or the cycle-key procedure documented in the TSB.",
    inspectionHint:
      "If clicking can be heard with the engine off and key in run, locate " +
      "the source by ear under the dash — the driver-side temp blend actuator " +
      "is to the left of the steering column.",
    sourceCitationKey: "ford-tsb-12-8-11",
  },
  {
    id: "ford-tsb-11-5-13-hvac-recirc-actuator", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 11-5-13",
    title: "Recirculation actuator stuck — outside air smell or windshield fog",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TSB 11-5-13",
      "recirc actuator",
      "outside air smell",
      "windshield fog",
      "fresh air stuck",
    ],
    excerpt:
      "TSB 11-5-13: HVAC recirculation door does not move between fresh and " +
      "recirculate positions. Symptoms include diesel/exhaust smell entering " +
      "the cabin in traffic (door stuck open), or rapid windshield fogging on " +
      "humid days (door stuck closed). The recirc actuator is mounted on the " +
      "blower housing on the passenger side. Replace the actuator " +
      "(7L3Z-19E616-A or revised) and recalibrate.",
    inspectionHint:
      "Press the recirc button repeatedly and listen for the actuator running. " +
      "If silent, the actuator motor is dead. If it runs but the air does not " +
      "change, the actuator is disconnected from the door arm.",
    sourceCitationKey: "ford-tsb-11-5-13",
  },
  {
    id: "ford-tsb-13-2-9-cabin-air-filter-clip", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 13-2-9",
    title: "Cabin air filter access door retaining clip breakage",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TSB 13-2-9",
      "cabin filter clip",
      "HVAC access door",
      "cabin filter door broken",
    ],
    excerpt:
      "TSB 13-2-9: The two plastic retaining clips on the cabin air filter " +
      "access door (located behind the glove box) break easily during routine " +
      "filter service. Once broken, the door does not seal and air bypasses " +
      "the cabin filter. Service note: replace the entire access door " +
      "assembly with the revised part (DL3Z-19A634-A) at first filter service " +
      "if the clips are visibly cracked. Inform the customer that the cabin " +
      "filter is service-replaceable but care is needed during installation. " +
      "DIY users can secure the door with foil HVAC tape as a temporary fix.",
    inspectionHint:
      "Pull the glove box drop-down and inspect the cabin filter access door " +
      "clips for hairline cracks before stressing them with filter removal.",
    sourceCitationKey: "ford-tsb-13-2-9",
  },

  // ─────────────────────────────────────────────────────────────────────
  // BODY / WEATHERSTRIPPING / WIND NOISE
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ford-tsb-11-11-2-a-pillar-wind-noise", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 11-11-2",
    title: "A-pillar / front door weatherstrip wind noise at highway speed",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TSB 11-11-2",
      "A-pillar wind noise",
      "front door whistle",
      "weatherstrip noise",
      "highway wind noise F-150",
    ],
    excerpt:
      "TSB 11-11-2: Wind noise from the front door / A-pillar area at speeds " +
      "above 50 mph. The factory primary door weatherstrip can develop a " +
      "compressed flat spot near the upper hinge area. Inspect the seal with " +
      "a dollar-bill drag test (close the door on a bill at multiple points). " +
      "If pull-through is easy at the upper hinge, replace the primary seal " +
      "(BL3Z-1620708-A driver, BL3Z-1620709-A passenger). Some cases also " +
      "require shimming the upper hinge to push the door tighter against the " +
      "seal.",
    inspectionHint:
      "Dollar-bill test: close the door on a bill at 8 points around the seal. " +
      "If the bill pulls out with no drag anywhere, that section of the seal " +
      "is compressed and needs replacement.",
    sourceCitationKey: "ford-tsb-11-11-2",
  },
  {
    id: "ford-tsb-12-10-6-mirror-wind-noise", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 12-10-6",
    title: "Side mirror wind noise / whistle at speed",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TSB 12-10-6",
      "mirror whistle",
      "side mirror noise",
      "trailer tow mirror noise",
    ],
    excerpt:
      "TSB 12-10-6: Whistle or hum from the side mirror at highway speed, " +
      "most common on the manual telescoping trailer-tow mirrors. The mirror " +
      "head has a small drain slot that whistles when partially obstructed " +
      "with road grime. Clean the slot with compressed air. If the noise " +
      "persists, the revised mirror cap (BL3Z-17682-AA driver, BL3Z-17683-AA " +
      "passenger) has a modified airflow profile. Inspect mirror mounting " +
      "bolts for tightness — a loose mirror also produces a low-frequency hum.",
    inspectionHint:
      "Cover the suspect mirror with a sock or towel and drive at the same " +
      "speed. If the noise disappears, the mirror is confirmed as the source.",
    sourceCitationKey: "ford-tsb-12-10-6",
  },

  // ─────────────────────────────────────────────────────────────────────
  // TAILGATE / BED
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ford-tsb-12-7-12-tailgate-latch", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 12-7-12",
    title: "Tailgate latch / cable disconnect — handle works but tailgate stays shut",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["body", "bed_cargo"],
    issueAreaIds: ["tailgate_mechanism_wear"],
    partTags: ["tailgate", "tailgate_latch", "tailgate_cable"],
    symptomTags: [],
    aliases: [
      "TSB 12-7-12",
      "tailgate latch broken",
      "tailgate cable",
      "tailgate handle",
      "tailgate won't open",
    ],
    excerpt:
      "TSB 12-7-12: Tailgate handle operates but the tailgate does not open. " +
      "Cause is a disconnected or broken left or right tailgate latch cable, " +
      "or a corroded latch mechanism. Remove the tailgate access panel " +
      "(remove the trim cover by prying carefully) and inspect both cables. " +
      "Reconnect or replace cables (BL3Z-9943150-A left, BL3Z-9943151-A right). " +
      "If the latch itself is corroded shut, replace the latch assembly. " +
      "Lubricate the rotating cam with Motorcraft white lithium grease.",
    inspectionHint:
      "With the tailgate access panel removed, operate the handle by hand and " +
      "watch both latches. Both must release simultaneously — if only one " +
      "side releases, that cable is broken.",
    sourceCitationKey: "ford-tsb-12-7-12",
  },
  {
    id: "ford-tsb-13-8-3-tailgate-damper-leak", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 13-8-3",
    title: "Tailgate damper assist drops too fast — damper hydraulic failure",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["body", "bed_cargo"],
    issueAreaIds: ["tailgate_mechanism_wear"],
    partTags: ["tailgate", "tailgate_damper"],
    symptomTags: ["leak"],
    aliases: [
      "TSB 13-8-3",
      "tailgate damper",
      "easy-lower tailgate fail",
      "tailgate slam",
    ],
    excerpt:
      "TSB 13-8-3: On trucks equipped with the tailgate damper (Easy Fuel " +
      "Filler / Easy Lift option), the damper loses oil and the tailgate " +
      "drops faster than spec. Inspect the damper at the right-rear corner " +
      "of the bed for oily residue. Replace the damper (DL3Z-99406A10-A) and " +
      "inspect the mounting bracket for cracking. The damper is not " +
      "rebuildable. Note: not all 12th-gen F-150s came with the damper — " +
      "verify equipment level before quoting the repair.",
    inspectionHint:
      "With the tailgate open, look at the right-rear bed corner for an " +
      "oil-stained piston rod. If the damper is dry and the tailgate slams " +
      "open, replace.",
    sourceCitationKey: "ford-tsb-13-8-3",
  },

  // ─────────────────────────────────────────────────────────────────────
  // SYNC / INFOTAINMENT
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ford-tsb-12-11-5-sync-freeze", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 12-11-5",
    title: "SYNC freeze, reboot loop, or Bluetooth dropout — software update",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["electrical", "cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TSB 12-11-5",
      "SYNC freeze",
      "SYNC reboot",
      "MyFord Touch reboot",
      "SYNC update",
      "APIM",
    ],
    excerpt:
      "TSB 12-11-5: SYNC / MyFord Touch (APIM) freezes, reboots randomly, or " +
      "loses Bluetooth connection to a paired phone. Cause is APIM firmware. " +
      "Update to the latest SYNC software via USB stick (free download from " +
      "Ford Owner site) or via dealer reflash through IDS. If the system " +
      "still misbehaves after the latest software, perform a master reset " +
      "from the menu (will erase paired devices and presets). Some early " +
      "MyFord Touch APIMs (2011-early 2013) required hardware replacement; " +
      "verify against APIM hardware version before condemning hardware.",
    inspectionHint:
      "Check the current SYNC version under Menu → Settings → Help → System " +
      "Information. If older than the latest available on the Ford Owner " +
      "site, update before any hardware diagnosis.",
    sourceCitationKey: "ford-tsb-12-11-5",
  },
  {
    id: "ford-tsb-13-11-2-myford-touch-screen", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 13-11-2",
    title: "MyFord Touch touchscreen unresponsive or ghost-touch",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["electrical", "cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TSB 13-11-2",
      "MyFord Touch screen",
      "touchscreen unresponsive",
      "ghost touch",
      "FDIM",
    ],
    excerpt:
      "TSB 13-11-2: MyFord Touch FDIM (Front Display Interface Module) " +
      "touchscreen does not respond to touch or registers phantom touches. " +
      "First attempt: update APIM software (see TSB 12-11-5). If the screen " +
      "still ghosts or fails to respond after software update, the FDIM " +
      "needs replacement (BL3Z-10E889-A or supersession). Calibrate after " +
      "replacement. Reset the master in IDS to clear pairing remnants.",
    inspectionHint:
      "Reboot SYNC (hold power + seek-up for 10 sec). If responsiveness " +
      "returns temporarily, software is suspect. If it never responds, FDIM " +
      "is the likely failure.",
    sourceCitationKey: "ford-tsb-13-11-2",
  },

  // ─────────────────────────────────────────────────────────────────────
  // REAR AXLE / DRIVELINE
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ford-tsb-12-4-5-rear-axle-whine", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 12-4-5",
    title: "Rear axle whine at 35-55 mph cruise — pinion preload",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: [],
    partTags: ["differential_cover"],
    symptomTags: [],
    aliases: [
      "TSB 12-4-5",
      "rear axle whine",
      "differential whine",
      "9.75 axle whine",
      "pinion seal F-150",
    ],
    excerpt:
      "TSB 12-4-5: Rear axle whine on cruise, typically between 35 and 55 mph, " +
      "louder on deceleration than under power. Cause is most commonly pinion " +
      "bearing preload loss after high mileage, sometimes with a weeping " +
      "pinion seal. Drain the differential and inspect the fluid (Motorcraft " +
      "75W-85 GL-5, friction modifier for limited slip). Inspect drain " +
      "magnet — sparkly metal is normal, large chips are not. If preload is " +
      "loose, the pinion nut crush sleeve must be replaced and preload reset " +
      "to spec (16-29 in-lb used bearings, 22-29 in-lb new). If gear faces " +
      "show pitting, the carrier and pinion need full replacement.",
    inspectionHint:
      "Coast-down whine (foot off the gas) that is louder than power-on " +
      "whine indicates pinion side. Power-on louder than coast indicates ring " +
      "gear side. Both equally loud = bearing preload.",
    sourceCitationKey: "ford-tsb-12-4-5",
  },
  {
    id: "ford-tsb-13-6-4-pinion-seal-leak", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 13-6-4",
    title: "Rear differential pinion seal leak onto driveshaft yoke",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: ["drivetrain_leak_or_boot"],
    partTags: ["driveshaft_u_joint", "differential_cover"],
    symptomTags: ["leak"],
    aliases: [
      "TSB 13-6-4",
      "pinion seal leak",
      "rear diff seal",
      "driveshaft yoke oil",
      "diff fluid loss",
    ],
    excerpt:
      "TSB 13-6-4: Gear oil seep from the front of the rear differential, " +
      "wetting the pinion flange / driveshaft slip yoke. Cause is pinion seal " +
      "wear, often with a rough yoke sealing surface. Replace seal " +
      "(BL3Z-4676-A for 8.8 axle, AL3Z-4676-A for 9.75 axle). Inspect the " +
      "yoke sealing surface for grooving — if grooved, replace the yoke or " +
      "install a Speedi-Sleeve. Mark pinion nut position before removal to " +
      "preserve preload, or use the crush-sleeve / preload-reset procedure.",
    inspectionHint:
      "Wet pinion flange with gear oil but a dry diff cover gasket points to " +
      "the pinion seal. Confirm by cleaning the area, driving 50 mi, and " +
      "rechecking.",
    sourceCitationKey: "ford-tsb-13-6-4",
  },

  // ─────────────────────────────────────────────────────────────────────
  // 6.2L BOSS-SPECIFIC
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ford-tsb-13-5-2-boss-62-knock-sensor", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 13-5-2",
    title: "6.2L Boss MIL with P0327 / P0332 knock sensor circuit",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["engine_mechanical", "electrical"],
    issueAreaIds: ["connector_and_harness_fitment"],
    partTags: ["connector", "ignition_harness"],
    symptomTags: [],
    aliases: [
      "TSB 13-5-2",
      "Boss knock sensor",
      "6.2L P0327",
      "6.2L P0332",
      "knock sensor harness",
    ],
    excerpt:
      "TSB 13-5-2: 6.2L Boss V8 MIL with DTC P0327 (knock sensor 1 low) or " +
      "P0332 (knock sensor 2 low). The knock sensors live under the intake " +
      "manifold and their pigtail harness can chafe on the manifold casting. " +
      "Inspect the harness for rub-through. Replace harness (BL3Z-12B637-A) " +
      "and reroute away from the manifold. If sensors themselves test bad " +
      "(specific resistance per service manual), replace the sensors (BL3Z-" +
      "12A699-A). Apply Motorcraft electrical grease to the connectors.",
    inspectionHint:
      "Pull the intake manifold cover and visually trace the knock sensor " +
      "harness. Any bare copper or melted insulation confirms the rub.",
    sourceCitationKey: "ford-tsb-13-5-2",
  },

  // ─────────────────────────────────────────────────────────────────────
  // 5.4 TRITON-SPECIFIC (additions not in ford-tsbs.ts)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ford-tsb-10-22-5-triton-coolant-degas", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 10-22-5",
    title: "5.4 Triton coolant degas bottle seam leak",
    vehicleScope: SUPPORTED_VEHICLE_ID,
    systemTags: ["cooling"],
    issueAreaIds: ["coolant_leak_source", "cooling_reservoir_and_hose_seep"],
    partTags: ["coolant_reservoir", "coolant_hose"],
    symptomTags: ["leak", "coolant_smell"],
    aliases: [
      "TSB 10-22-5",
      "degas bottle leak",
      "coolant overflow tank leak",
      "reservoir seam crack",
      "Triton coolant low",
    ],
    excerpt:
      "TSB 10-22-5: Slow coolant loss with no visible leak on the engine. " +
      "Inspect the coolant degas (overflow) bottle for a hairline crack along " +
      "the seam where the two plastic halves are welded together. The crack " +
      "weeps only when the cooling system is hot and pressurized, then closes " +
      "as it cools, leaving no obvious puddle. Pressure-test cold to 16 PSI " +
      "and monitor the bottle for weeping at the seam. Replace bottle with " +
      "revised part (BL3Z-8A080-B) if the seam weeps.",
    inspectionHint:
      "Wipe the degas bottle dry, then pressure-test the cooling system to " +
      "16 PSI for 30 minutes. Inspect with a UV light if dye was added — the " +
      "crack often shows up as a thin glowing line along the molding seam.",
    sourceCitationKey: "ford-tsb-10-22-5",
  },

  // ─────────────────────────────────────────────────────────────────────
  // ELECTRICAL / BCM
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ford-tsb-11-6-7-bcm-no-sleep", // VERIFY exact TSB number
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 11-6-7",
    title: "BCM does not enter sleep mode — parasitic draw, dead battery",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["electrical", "battery_ground"],
    issueAreaIds: ["battery_charge_and_ground_path"],
    partTags: ["battery", "connector"],
    symptomTags: ["dead_battery"],
    aliases: [
      "TSB 11-6-7",
      "BCM sleep mode",
      "parasitic draw F-150",
      "no key-off shutdown",
      "battery dies in a week",
    ],
    excerpt:
      "TSB 11-6-7: BCM (Body Control Module) does not transition to sleep " +
      "mode after key-off, drawing 200-400 mA continuously and discharging " +
      "the battery in 3-7 days. Distinct from the door-ajar parasitic draw " +
      "in TSB 09-20-3. Perform a parasitic draw test 45+ minutes after lock. " +
      "If the BCM circuit is the source (test by pulling the BCM fuses), " +
      "reflash the BCM with the latest software via IDS. If reflash does " +
      "not resolve, replace BCM (AL3Z-15604-A or supersession) and re-program " +
      "with vehicle's KVA file.",
    inspectionHint:
      "Wait 45 minutes after locking the truck. With an ammeter on the " +
      "negative battery cable, the draw should be under 50 mA. If the BCM " +
      "circuit (fuse F2-2 or similar) shows >100 mA after 45 min, BCM is not " +
      "sleeping.",
    sourceCitationKey: "ford-tsb-11-6-7",
  },
];
