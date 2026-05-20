import { RAPTOR_GEN2_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

// Gen 2 Raptor (2017-2020) Technical Service Bulletins and NHTSA recalls.
// This file complements raptor-gen2-reference.ts — that file already covers
// TSB 23-2123 (10R80 final harsh-shift TSB), TSB 21-2119 (cam phaser rattle),
// and TSB 14-0130 (CAC condensation). Entries here are the additional TSBs
// and recalls from the source markdowns NOT already represented.
//
// Only TSB / NHTSA numbers explicitly listed in the source markdowns are
// included. Nothing is fabricated.

export const RAPTOR_TSB_REFERENCES: TruckReferenceRecord[] = [
  // ═══════════════════════════════════════════════════════════════════════
  //  Transmission (10R80) TSB Lineage (1-7)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 1. TSB 18-2346 — early 10R80 shift quality ─────────────────────────
  {
    id: "raptor-gen2-tsb-18-2346",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 18-2346",
    title: "TSB 18-2346 — Early 10R80 shift quality, adaptive reset and reflash",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "TSB 18-2346", "early 10R80 TSB", "first transmission TSB",
      "10R80 reflash 2018", "shift quality TSB 2018",
    ],
    excerpt:
      "TSB 18-2346 (2018): The first of the 10R80 shift-quality TSBs for the Gen 2 Raptor. Addresses early-production 10R80 harshness with an adaptive strategy reset and PCM/TCM reflash. The TSB documents that the launch-year 10R80 calibration was overly aggressive in certain shift maps and that customer complaints of 1-2 and 2-3 harshness were widespread. The dealer procedure is a PCM update + manual reset of adaptive learning tables via FDRS, followed by a specific drive cycle to relearn shift behavior. This TSB has been superseded multiple times (most recently by TSB 23-2123) — any 2017-2018 Raptor that has not had the full TSB lineage applied should be brought current.",
    inspectionHint:
      "When checking service records, look for the most recent TSB application date — a 2017 Raptor still on the original 18-2346 calibration is 5+ generations behind on shift quality fixes.",
    sourceCitationKey: "raptor-gen2-tsb-18-2346",
  },

  // ── 2. TSB 19-2396 — harsh 1-2-3, 3-4-5 ────────────────────────────────
  {
    id: "raptor-gen2-tsb-19-2396",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 19-2396",
    title: "TSB 19-2396 — Updated shift calibration for harsh 1-2-3, 3-4-5",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "TSB 19-2396", "harsh 1-2-3 shift", "harsh 3-4-5 shift",
      "transmission TSB 2019", "10R80 calibration 2019",
    ],
    excerpt:
      "TSB 19-2396 (2019): Second-generation 10R80 reflash addressing harsh 1-2-3 upshifts and harsh 3-4-5 upshifts specifically. Targets the most common complaint pattern across 2017-2019 Raptors — a hard hit during low-throttle gear changes in the lower ratios. The fix is a PCM and TCM calibration update with revised clutch apply pressure ramps. Owners report meaningful improvement after this TSB but it does not address torque-converter shudder or gear hunting (covered in later TSBs). Superseded by TSB 23-2123. Worth verifying that any 2019 Raptor still in regular service has had the full subsequent TSB chain applied.",
    sourceCitationKey: "raptor-gen2-tsb-19-2396",
  },

  // ── 3. TSB 20-2201 — adaptive learning + TCC shudder ───────────────────
  {
    id: "raptor-gen2-tsb-20-2201",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 20-2201",
    title: "TSB 20-2201 — Adaptive learning revision, torque converter shudder",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "TSB 20-2201", "torque converter shudder", "TCC shudder",
      "adaptive learning TSB", "shudder TSB 2020", "10R80 shudder",
    ],
    excerpt:
      "TSB 20-2201 (2020): Addresses the second-most-common 10R80 complaint after harsh shifting — torque converter clutch (TCC) shudder during light-throttle cruise at 30-50 mph. The TCC partially locks at low load to improve fuel economy and produces a felt vibration through the cab. The TSB combines revised adaptive learning tables with a TCC apply strategy change. Repair: PCM/TCM reflash + drive cycle. For severe cases (TCC contamination), the bulletin authorizes a transmission fluid exchange to remove clutch debris. This TSB explicitly notes that the factory underfilled the 10R80 by 2-3 quarts on many units and that a level-correct fill is part of the fix procedure.",
    inspectionHint:
      "TCC shudder is felt as a low-frequency vibration that goes away with light brake application (which disengages TCC) or with more throttle input. Distinguishes it from driveshaft U-joint vibration or tire imbalance.",
    sourceCitationKey: "raptor-gen2-tsb-20-2201",
  },

  // ── 4. TSB 21-2208 — gear hunting at highway speed ─────────────────────
  {
    id: "raptor-gen2-tsb-21-2208",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 21-2208",
    title: "TSB 21-2208 — Gear hunting at highway speed, light throttle",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "TSB 21-2208", "gear hunting TSB", "highway hunting",
      "transmission hunting", "10R80 hunting between gears",
    ],
    excerpt:
      "TSB 21-2208 (2021): Addresses gear hunting between 7th, 8th, 9th, and 10th at highway speeds under light throttle — a complaint that the 10R80 cannot settle on a gear when cruising over rolling terrain. The fix is a revised shift schedule that adds hysteresis to upshift/downshift thresholds in the upper gears, plus a torque-management strategy that smooths the transitions. PCM reprogramming only — no hardware change. Superseded by TSB 23-2123 but the underlying logic from 21-2208 is rolled forward in current calibrations. This is one of the more impactful TSBs for highway cruisers — gear hunting was tied for #1 complaint with harsh shifting.",
    sourceCitationKey: "raptor-gen2-tsb-21-2208",
  },

  // ── 5. TSB 22-2139 — harsh engagement / clunking ───────────────────────
  {
    id: "raptor-gen2-tsb-22-2139",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 22-2139",
    title: "TSB 22-2139 — Transmission harsh engagement and clunking",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk"],
    aliases: [
      "TSB 22-2139", "harsh engagement TSB", "Park to Drive clunk",
      "transmission engagement TSB", "10R80 clunking",
    ],
    excerpt:
      "TSB 22-2139 (2022): Addresses the lurch or clunk felt when engaging Drive or Reverse from Park, and the engagement clunk felt at low speed when transitioning from coast to throttle. The procedure includes PCM/TCM reflash with revised clutch apply pressure ramps specifically for the engagement event. For trucks where the reflash does not resolve the clunk, the TSB authorizes inspection of the rear differential pinion preload (some clunks attributed to the transmission are actually rear-axle slack). 22-2139 was one of the cluster of late-pandemic-era TSBs and is superseded by 23-2123.",
    inspectionHint:
      "Park-to-Drive lurch isolated to one direction (e.g., D engages soft, R clunks hard) is more likely a rear-axle slack issue than a transmission calibration issue. The TSB inspection step is a useful diagnostic differentiator.",
    sourceCitationKey: "raptor-gen2-tsb-22-2139",
  },

  // ── 6. TSB 22-2428 — cold-weather shift harshness ──────────────────────
  {
    id: "raptor-gen2-tsb-22-2428",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 22-2428",
    title: "TSB 22-2428 — Cold-weather shift harshness calibration",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "TSB 22-2428", "cold shift TSB", "cold weather harsh shift",
      "winter shift quality", "10R80 cold weather",
    ],
    excerpt:
      "TSB 22-2428 (2022): Addresses harsh shifting that appears only in cold ambient temperatures (below ~40F / 4C). Many Korean winter owners report shift quality is worse in the first 15-20 minutes of driving on a cold morning. The TSB documents that the prior calibrations did not adequately scale clutch apply pressures for cold transmission-fluid viscosity. The fix is a PCM/TCM reflash with revised temperature-compensated clutch pressure tables. Worth noting for any Korea-based Raptor owner — winter shift quality complaints often respond well to this TSB even on trucks otherwise on the latest calibration. Superseded by 23-2123 which rolls in the cold-weather logic.",
    inspectionHint:
      "Document cold-weather harsh shifts with timestamps and ambient temperature — Ford service writers may otherwise blame perceived issues on driving style without a recorded ambient-temperature correlation.",
    sourceCitationKey: "raptor-gen2-tsb-22-2428",
  },

  // ── 7. TSB 24-2046 / 24-2101 / 25-2018 / 25-2023 — latest revisions ────
  {
    id: "raptor-gen2-tsb-latest-10r80-chain",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSBs 24-2046, 24-2101, 25-2018, 25-2023",
    title: "Latest 10R80 calibration TSBs — 24-2046, 24-2101, 25-2018, 25-2023",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "TSB 24-2046", "TSB 24-2101", "TSB 25-2018", "TSB 25-2023",
      "latest 10R80 TSB", "supplemental transmission TSB",
      "current shift calibration",
    ],
    excerpt:
      "Continuing 10R80 refinement chain after TSB 23-2123: TSB 24-2046 (2024) — latest-generation shift calibration update, primarily addresses residual harsh-shift complaints on trucks that did not fully respond to 23-2123. TSB 24-2101 (2024) — supplemental transmission programming update issued shortly after 24-2046 for a specific subset of VIN ranges. TSB 25-2018 (2025) — shift quality and torque converter lockup refinement, focuses on TCC apply smoothness at highway speeds. TSB 25-2023 (2025) — most recent transmission calibration revision at time of research. For owners chasing the best possible 10R80 behavior, the procedure is: have the dealer pull the current PCM/TCM calibration via FDRS, verify it matches the latest available, and apply the most current update. A Raptor whose last transmission TSB was applied prior to 2024 is approximately 4 TSB generations behind current.",
    inspectionHint:
      "Ford does not issue TSBs unsolicited — owners must request them. Ask the dealer specifically to 'check for the latest 10R80 calibration per the current TSB chain' rather than asking about a specific number, which may already be superseded.",
    sourceCitationKey: "raptor-gen2-tsb-latest-10r80-chain",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Engine and Drivetrain TSBs (8-9)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 8. Plastic oil pan transition (2017→2018) ───────────────────────────
  {
    id: "raptor-gen2-tsb-plastic-oil-pan",
    sourceType: "ford_tsb",
    sourceLabel: "Ford internal — plastic to metal oil pan transition",
    title: "Plastic oil pan TSB — 2017 / early-2018 production, metal upgrade",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["leak"],
    aliases: [
      "plastic oil pan TSB", "oil pan transition", "metal oil pan upgrade",
      "JL3Z-6675-A", "oil pan part number", "2017 oil pan",
      "플라스틱 오일팬 교환",
    ],
    excerpt:
      "2017 and early-2018 production Raptors shipped with a composite (plastic) oil pan prone to cracking, warping at the gasket surface, and developing slow leaks. Ford transitioned to a metal oil pan during mid-year 2018 production. The dealer service procedure for affected VINs is to install the updated metal oil pan (Ford part JL3Z-6675-A) with new gasket and hardware. This is documented as a TSB-style service procedure rather than a formal recall — Ford did not recall the plastic pan, so owners must request the upgrade and may pay for it out of warranty depending on age/mileage. The swap is 2-3 hours labor, $150-250 for the pan plus gasket. Strongly recommended for any 2017 or early-2018 Raptor still on the original plastic pan, especially for off-road or impact-prone use cases.",
    inspectionHint:
      "Identify plastic vs metal pan by tapping with a screwdriver handle — plastic sounds dull, metal rings. Check build date on the door sticker; mid-2018 and later production is generally metal. Look for wet spots at the gasket surface and drain plug.",
    safetyNote:
      "A cracked oil pan can cause sudden oil loss and engine damage. Monitor oil level frequently on any Raptor still on the plastic pan, especially after off-road use.",
    sourceCitationKey: "raptor-gen2-tsb-plastic-oil-pan",
  },

  // ── 9. IWE (Integrated Wheel End) TSB ──────────────────────────────────
  {
    id: "raptor-gen2-tsb-iwe-grinding",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB — IWE (Integrated Wheel End)",
    title: "IWE TSB — grinding noise during 2WD/4WD transitions",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: [],
    partTags: ["iwe_solenoid_actuator", "transfer_case_area"],
    symptomTags: ["clunk", "rattle"],
    aliases: [
      "IWE", "Integrated Wheel End", "IWE grinding", "vacuum hub",
      "4WD engagement noise", "front hub grinding", "IWE 솔레노이드",
    ],
    excerpt:
      "Ford has issued TSBs addressing IWE (Integrated Wheel End) grinding noise when transitioning between 2WD and 4WD on the Gen 2 Raptor. The IWE system uses vacuum to engage/disengage the front hubs from the CV axles in 2WD vs 4WD mode. Failure modes are typically vacuum leaks (cracked vacuum lines, failed solenoid, or weak vacuum reservoir/check valve) — not the IWE actuator itself. Symptoms: grinding or clicking from the front hubs during 4A or 4H engagement, intermittent failure to fully engage 4WD, lingering grinding after returning to 2WD. The TSB procedure is to smoke-test the vacuum lines, replace the check valve and any cracked vacuum hoses, and verify the solenoid functions on command via FDRS. Far cheaper to fix than IWE actuator replacement and resolves most cases.",
    inspectionHint:
      "Diagnose by switching from 2WD to 4A on a paved road and listening at each front wheel. Grinding from the wheel = IWE not fully engaging. Smoke-test all front-end vacuum lines including the small ones routed near the air box.",
    sourceCitationKey: "raptor-gen2-tsb-iwe-grinding",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Transmission / Drivetrain Recalls (10-11)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 10. NHTSA 18V213000 — output shaft roll pin ────────────────────────
  {
    id: "raptor-gen2-recall-18v213000",
    sourceType: "recall",
    sourceLabel: "NHTSA 18V213000",
    title: "Recall 18V213000 — 10R80 output shaft roll pin fracture (2017-2018)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical", "drivetrain_4wd"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "18V213000", "output shaft recall", "roll pin recall",
      "loss of drive recall", "transmission recall 2017-2018",
    ],
    excerpt:
      "NHTSA recall 18V213000 (2017-2018 model years): the 10R80 transmission output shaft roll pin may fracture, causing the parking pawl to fail and/or loss of drive while the vehicle is in motion. Affected VIN ranges include early-production Gen 2 Raptors. The remedy is inspection and replacement of the roll pin assembly under recall. This is a safety-critical recall — verify completion status via VIN lookup on Ford's recall portal or NHTSA. Any used 2017 or 2018 Raptor purchase should include verification that 18V213000 has been completed and signed off by an authorized dealer.",
    safetyNote:
      "A fractured output shaft roll pin can cause sudden loss of drive at any speed. Walk away from any used 2017-2018 Raptor where this recall has not been completed.",
    sourceCitationKey: "raptor-gen2-recall-18v213000",
  },

  // ── 11. NHTSA 17V671000 / 20V197000 — shift linkage/cable ─────────────
  {
    id: "raptor-gen2-recall-shift-linkage",
    sourceType: "recall",
    sourceLabel: "NHTSA 17V671000 + 20V197000",
    title: "Recalls 17V671000 / 20V197000 — shift linkage and cable bushing",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "17V671000", "20V197000", "shift linkage recall",
      "shift cable bushing", "vehicle may roll recall",
      "park engagement recall",
    ],
    excerpt:
      "Two related recalls covering shift mechanism failures that could allow the vehicle to roll when the driver believes it is in Park: NHTSA 17V671000 (2017) — shift linkage may separate, vehicle could roll. NHTSA 20V197000 (2020) — shift cable bushing may degrade, causing unintended movement. Both recalls remedied with hardware replacement at the dealer. The 17V671000 recall is the higher-priority of the two and applies to early Gen 2 production. The 20V197000 recall is specific to 2020 model year. For any Raptor used as a daily driver, verify both recall statuses — the consequence of either failure is rollaway risk, especially on grades.",
    inspectionHint:
      "Always apply the parking brake in addition to selecting Park. Verify the recalls have been completed via Ford's VIN lookup tool. Listen for clicks or unusual feedback through the shifter lever during Park-to-Drive engagement.",
    safetyNote:
      "Shift linkage / cable bushing failures can cause unintended vehicle movement. Always apply the parking brake — do not rely solely on Park.",
    sourceCitationKey: "raptor-gen2-recall-shift-linkage",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Brake Recalls (12)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 12. Brake master cylinder recalls ──────────────────────────────────
  {
    id: "raptor-gen2-recall-brake-master-cylinder",
    sourceType: "recall",
    sourceLabel: "NHTSA 25V236000 / 22V150000 / 20V332000",
    title: "Recalls — brake master cylinder fluid leak / reduced performance",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: ["brake_hose_or_line_concern"],
    partTags: ["brake_line", "brake_hose"],
    symptomTags: ["leak"],
    aliases: [
      "25V236000", "22V150000", "20V332000", "brake master cylinder recall",
      "brake fluid leak recall", "loss of braking recall", "brake recall",
      "브레이크 리콜",
    ],
    excerpt:
      "Three related NHTSA recalls covering Gen 2 Raptor brake master cylinder issues: 25V236000 (potential loss of braking), 22V150000 (reduced brake performance), 20V332000 (brake fluid leak). All three apply across various Gen 2 model years and are remedied by dealer inspection and (where applicable) master cylinder replacement. Symptoms before failure: spongy brake pedal, slowly dropping brake fluid level, brake warning light, or visible fluid weep around the master cylinder. For any used Raptor purchase, verify all three recall completions — brake recall completions are typically tracked separately by NHTSA number even when the underlying part is similar.",
    inspectionHint:
      "Check brake fluid level monthly. Inspect master cylinder body and lines under hood for fluid weeping or staining. Spongy pedal that improves after pumping = master cylinder concern (vs caliper or hose concern).",
    safetyNote:
      "Brake master cylinder failure can cause sudden loss of braking with little warning. Do not delay completion of any open brake recall.",
    sourceCitationKey: "raptor-gen2-recall-brake-master-cylinder",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Fire / Electrical Recalls (13-14)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 13. Block heater + battery cable fire recalls ──────────────────────
  {
    id: "raptor-gen2-recall-block-heater-fire",
    sourceType: "recall",
    sourceLabel: "NHTSA 19V278000 / 18V894000 / 19V805000",
    title: "Recalls — block heater + battery cable overheat / fire risk",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["electrical", "battery_ground"],
    issueAreaIds: ["battery_terminal_corrosion", "battery_charge_and_ground_path"],
    partTags: ["battery", "battery_terminal"],
    symptomTags: ["corrosion"],
    aliases: [
      "19V278000", "18V894000", "19V805000", "block heater recall",
      "battery cable recall", "fire risk recall", "block heater fire",
      "엔진 블록 히터 리콜",
    ],
    excerpt:
      "Three related electrical fire-risk recalls: NHTSA 19V278000 — block heater cable may overheat. NHTSA 18V894000 — block heater cable fire risk (earlier version of the same concern). NHTSA 19V805000 — battery cable may overheat. All three address cable insulation degradation and connector heat that can lead to underhood fire. Most relevant for cold-climate trucks (Korea winter, US northern states) where the block heater is actually used. Remedy: dealer inspection and replacement of affected cable assembly. Even owners who never plug in the block heater should have these recalls completed — the cable itself can overheat from battery current paths independent of block-heater use.",
    safetyNote:
      "Underhood fire risk. Any owner who uses the block heater regularly should verify these recalls are complete BEFORE the next cold season. Do NOT plug in the block heater on an affected, uncompleted VIN.",
    sourceCitationKey: "raptor-gen2-recall-block-heater-fire",
  },

  // ── 14. B-pillar trim + starter relay fire recalls ─────────────────────
  {
    id: "raptor-gen2-recall-bpillar-starter-fire",
    sourceType: "recall",
    sourceLabel: "NHTSA 18V568000 + 20V467000",
    title: "Recalls — B-pillar trim fire risk + 2020 starter relay weld",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["electrical", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "18V568000", "20V467000", "B-pillar fire recall",
      "starter relay recall", "starter weld shut", "2020 fire recall",
      "B필러 화재 리콜",
    ],
    excerpt:
      "Two electrical fire-risk recalls affecting Gen 2 Raptor cab structure: NHTSA 18V568000 — B-pillar trim may pose a fire risk (covers various Gen 2 model years). NHTSA 20V467000 — starter relay may weld shut, fire risk, specifically affects 2020 model year. Both are remedied at the dealer; 20V467000 may require starter relay replacement and underhood inspection for heat damage. The 2020-specific starter relay issue is a known concern for that final-year production and is one of two unique-to-2020 recalls (the other being 20V197000 shift cable). Critical to verify completion on any 2020 purchase.",
    safetyNote:
      "A welded-shut starter relay can cause the starter to remain energized after engine start, leading to overheating and underhood fire. If the starter ever cranks for longer than normal or after the engine has started, disconnect the battery immediately.",
    sourceCitationKey: "raptor-gen2-recall-bpillar-starter-fire",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Body / Safety / Lighting Recalls (15-16)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 15. Door latch + tailgate latch + seat recliner recalls ───────────
  {
    id: "raptor-gen2-recall-latches-recliner",
    sourceType: "recall",
    sourceLabel: "NHTSA 17V652000 / 21V983000 / 19V633000",
    title: "Recalls — door latch, tailgate latch, seat recliner failures",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["body", "cabin_controls"],
    issueAreaIds: ["tailgate_mechanism_wear"],
    partTags: ["tailgate", "tailgate_latch"],
    symptomTags: [],
    aliases: [
      "17V652000", "21V983000", "19V633000", "door latch recall",
      "tailgate latch recall", "seat recliner recall",
      "tailgate opens unexpectedly", "도어 래치 리콜",
    ],
    excerpt:
      "Three body/safety recalls on Gen 2 Raptor: NHTSA 17V652000 (2017) — door latch may not engage properly, door could open while driving. NHTSA 21V983000 — tailgate latch may open unexpectedly while driving, risking cargo loss. NHTSA 19V633000 — seat recliner may fail to lock, occupant restraint compromised in a collision. All three are remedied at the dealer with latch/recliner inspection and replacement as needed. The tailgate latch recall (21V983000) is particularly noticeable because affected owners frequently report finding the tailgate ajar after driving. The 17V652000 door latch recall affects mainly 2017 model year and overlaps with similar door latch recalls across the broader F-150 line.",
    safetyNote:
      "Seat recliner failures are crash-safety critical — the recliner is the structural connection that keeps the seat upright during impact. Do not delay completion of 19V633000.",
    sourceCitationKey: "raptor-gen2-recall-latches-recliner",
  },

  // ── 16. DRL + camera display recalls ──────────────────────────────────
  {
    id: "raptor-gen2-recall-drl-camera",
    sourceType: "recall",
    sourceLabel: "NHTSA 20V097000 / 22V252000 / 20V575000",
    title: "Recalls — LED DRL failure, rearview camera display failures",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["lighting", "electrical"],
    issueAreaIds: ["lighting_socket_wiring"],
    partTags: ["headlight_housing", "lamp_socket"],
    symptomTags: [],
    aliases: [
      "20V097000", "22V252000", "20V575000", "DRL recall",
      "daytime running light recall", "rearview camera recall",
      "backup camera failure", "후방 카메라 리콜", "주간주행등 리콜",
    ],
    excerpt:
      "Three lighting and camera recalls on Gen 2 Raptor: NHTSA 20V097000 — LED daytime running lights (DRL) may fail. NHTSA 22V252000 — rearview camera display failure (blank screen). NHTSA 20V575000 — rearview camera image may not display. The two rearview camera recalls (22V252000 and 20V575000) are related concerns addressed in separate campaigns; some VINs are subject to both. Remedies vary from software updates to camera module replacement. For any used Raptor purchase, verify all three recall statuses — these are the most commonly missed because owners may not notice a sporadic backup camera failure or DRL outage until inspection. A truck where any of these recalls is open is generally a no-cost dealer visit to complete.",
    inspectionHint:
      "Test the backup camera every time you start the truck — intermittent failure that returns after cycling ignition is the classic 22V252000/20V575000 symptom. Verify both DRLs are illuminated during the day from outside the truck.",
    sourceCitationKey: "raptor-gen2-recall-drl-camera",
  },
];
