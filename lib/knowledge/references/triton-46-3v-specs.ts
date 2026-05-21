import { TRITON_4_6_3V_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

/**
 * Reference records for the 2009-2010 Ford F-150 4.6L 3V Triton V8.
 *
 * Engine family overview:
 *  - 292 hp @ 5750 rpm / 320 lb-ft @ 4250 rpm
 *  - Aluminum block + aluminum heads (NOT iron like the 4.6 2V)
 *  - 4.6L (281 cu in), V8, SOHC, 3 valves per cylinder (24 total)
 *  - Bore x stroke: 90.2 x 90.0 mm (same as 4.6 2V)
 *  - Compression: 9.8:1
 *  - Firing order: 1-3-7-2-6-5-4-8
 *  - VIN position 7 = "8"
 *  - iVCT — intake-only Variable Cam Timing (shares phaser DESIGN with the 5.4 3V)
 *  - Paired with the 4R75E 4-speed automatic
 *  - Designed as the "step up" from the 4.6 2V; retired in the 2011 refresh
 *
 * Shared with 5.4 3V: cam phaser design, VCT solenoids, SP-515 spark plugs,
 * FL-820-S oil filter, exhaust manifold studs, oil weight. Use 5.4 3V parts
 * lookups as a starting point when searching catalogs.
 */
export const TRITON_46_3V_REFERENCES: TruckReferenceRecord[] = [
  // ── 1. Engine identification ─────────────────────────────────────────
  {
    id: "spec-triton-46-3v-engine-id",
    sourceType: "owner_manual",
    sourceLabel: "Engine Identification — 4.6L 3V Triton V8",
    title: "4.6L 3V Triton — VIN position 7 = '8' (2009-2010 F-150)",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 3V",
      "4.6L 3V",
      "4.6 3 valve",
      "Triton 4.6 3V",
      "VIN 8",
      "4.6 modular 3V",
      "281 cu in",
    ],
    excerpt:
      "The 4.6L 3V Triton V8 (2009-2010 F-150 only) is identified by VIN position 7 = '8'. Displacement 4.6L / 281 cu in, V8, SOHC, 3 valves per cylinder (24 valves total), aluminum block and aluminum heads — NOT cast iron like the 2009 4.6 2V. Bore/stroke 90.2 x 90.0 mm (same as the 2V). Compression 9.8:1. Firing order 1-3-7-2-6-5-4-8. Output: 292 hp @ 5750 rpm and 320 lb-ft @ 4250 rpm. Always paired with the 4R75E 4-speed automatic on the F-150. Released as the 'step up' from the 4.6 2V; retired entirely in the 2011 refresh when Ford moved to the all-modular 3.5 EcoBoost / 5.0 Coyote / 6.2 Boss / 3.7 V6 lineup.",
    inspectionHint:
      "Confirm the engine before ordering parts: read VIN position 7. Note also that the 4.6 3V shares cam phasers, VCT solenoids, spark plugs, and oil filter with the 5.4 3V — 5.4 3V part lookups are a valid starting point.",
    sourceCitationKey: "spec-triton-46-3v-engine-id",
  },

  // ── 2. Output / performance ─────────────────────────────────────────
  {
    id: "spec-triton-46-3v-output",
    sourceType: "owner_manual",
    sourceLabel: "Engine Output — 4.6L 3V Triton V8",
    title: "292 hp @ 5750 rpm / 320 lb-ft @ 4250 rpm",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 3V horsepower",
      "4.6 3V torque",
      "292 hp",
      "320 lb-ft",
      "4.6 3V 0-60",
      "4.6 3V power",
    ],
    excerpt:
      "Output: 292 hp @ 5750 rpm, 320 lb-ft @ 4250 rpm — a meaningful jump from the 4.6 2V (248 hp / 294 lb-ft) thanks to the 3-valve head and intake-only Variable Cam Timing (iVCT). 0-60 mph is approximately 9 seconds in a regular-cab 2WD F-150 and slower with a SuperCrew 4x4. Tow rating: 7,000 lb maximum (well above the 4.6 2V's ~5,400 lb but below the 5.4 3V's 11,300 lb). Fuel economy 14 city / 19 highway — slightly better than the 5.4 3V because of the smaller displacement.",
    sourceCitationKey: "spec-triton-46-3v-output",
  },

  // ── 3. Engine oil ───────────────────────────────────────────────────
  {
    id: "fluid-spec-triton-46-3v-engine-oil",
    sourceType: "repair_note",
    sourceLabel: "Fluid Specification",
    title: "Engine Oil — 5W-20 synthetic blend, 6.0 qt with FL-820-S filter",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["oil_consumption"],
    aliases: [
      "4.6 3V oil",
      "4.6 3V oil capacity",
      "4.6 3V oil type",
      "5W-20",
      "FL-820-S",
      "Motorcraft FL-820-S",
      "4.6 3V oil change",
    ],
    excerpt:
      "Engine oil: Motorcraft 5W-20 (Ford spec WSS-M2C945-A or later -B2 synthetic-blend / full-synthetic). Sump capacity 6.0 US quarts WITH filter — 1.7 qt less than the 5.4 3V (7.0 qt) but the same weight and the SAME filter. Oil filter: Motorcraft FL-820-S (shared with the 5.4 3V, 5.0 Coyote, and 3.5 EcoBoost — extremely common, available worldwide). Ford recommends 7,500-10,000 mile intervals on synthetic; community recommendation is 5,000-7,500 because clean oil dramatically extends cam phaser life. Recommended brands: Motorcraft Full Synthetic, Mobil 1, Pennzoil Platinum, Royal Purple.",
    safetyNote:
      "Do NOT use 5W-30 in the 4.6 3V — the VCT phaser oil control is calibrated for 5W-20 viscosity. The wrong weight makes cam phaser rattle worse.",
    sourceCitationKey: "fluid-spec-triton-46-3v-engine-oil",
  },

  // ── 4. Coolant ──────────────────────────────────────────────────────
  {
    id: "fluid-spec-triton-46-3v-coolant",
    sourceType: "repair_note",
    sourceLabel: "Fluid Specification",
    title: "Coolant — Motorcraft Orange HOAT (shared 12th-gen spec)",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["cooling"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["coolant_reservoir", "radiator_hose", "coolant_hose"],
    symptomTags: ["coolant_smell", "leak"],
    aliases: [
      "4.6 3V coolant",
      "4.6 3V antifreeze",
      "VC-3DIL-B",
      "orange coolant",
      "HOAT 4.6",
      "WSS-M97B44-D2",
    ],
    excerpt:
      "Motorcraft Orange Coolant (Prediluted VC-3DIL-B, Concentrate VC-3-B). Ford spec WSS-M97B44-D2 (HOAT — Hybrid Organic Acid Technology). Same coolant as the 5.4 3V and all 12th-gen F-150 engine options. NEVER mix with green IAT or 'universal' coolants — mixing causes gelling that blocks the radiator and heater core. The 4.6 3V uses a conventional external belt-driven water pump — coolant leaks present externally, unlike the EcoBoost's internal pump. First coolant change at 6 years / 100,000 miles, then every 3 years / 50,000 miles.",
    sourceCitationKey: "fluid-spec-triton-46-3v-coolant",
  },

  // ── 5. Transmission fluid (4R75E) ───────────────────────────────────
  {
    id: "fluid-spec-triton-46-3v-transmission",
    sourceType: "repair_note",
    sourceLabel: "Fluid Specification",
    title: "4R75E transmission — Mercon V (NOT Mercon LV)",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["vibration"],
    aliases: [
      "4R75E fluid",
      "4.6 3V transmission fluid",
      "Mercon V",
      "XT-5-QM",
      "4R75E ATF",
      "4-speed F-150 fluid",
    ],
    excerpt:
      "The 4.6L 3V is paired with the 4R75E 4-speed automatic — it does NOT get the 6R80 used by the 5.0 Coyote / 3.5 EcoBoost / 5.4 3V (later years). Fluid: Motorcraft Mercon V (XT-5-QM). Do NOT use Mercon LV — wrong friction modifier causes harsh shifts in the 4R75E. Pan drop service yields ~5 qt; total system capacity ~12 qt. Community recommendation: drain-and-fill every 30,000-40,000 miles. The 4R75E is the more robust 4R70 family and is well-regarded — most 4R75E failures trace to neglected fluid.",
    safetyNote:
      "Confirm Mercon V before topping off. Using Mercon LV (the 6R80 fluid) in a 4R75E causes shift quality degradation and clutch glazing.",
    sourceCitationKey: "fluid-spec-triton-46-3v-transmission",
  },

  // ── 6. Spark plugs (SP-515, shared design with 5.4 3V) ──────────────
  {
    id: "spec-triton-46-3v-spark-plugs",
    sourceType: "repair_note",
    sourceLabel: "Repair Note — 4.6L 3V Triton",
    title: "Spark plugs — Motorcraft SP-515 (same updated design as 5.4 3V)",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["ignition", "engine_mechanical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug", "coil"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "4.6 3V spark plug",
      "SP-515",
      "Motorcraft SP-515",
      "4.6 3V plug torque",
      "two-piece plug 4.6 3V",
      "4.6 3V tune up",
    ],
    excerpt:
      "Spark plug: Motorcraft SP-515 (the revised one-piece design that replaced the original two-piece SP-546 / SP-515 first-generation plug). This is the SAME PART used by the 5.4L 3V Triton — the engines share the entire ignition end of the head. Torque: 25 lb-ft (34 Nm). Gap: 0.044 in (1.12 mm) — pre-gapped from factory; do NOT regap (the precious-metal tip is fragile). Replacement interval: 100,000 miles per Ford; community recommendation is 60,000-80,000 miles to reduce seizing risk. Always soak the plug-base-to-head joint with penetrating oil for 24+ hours before removal on any engine over 60K miles.",
    inspectionHint:
      "Before extraction, soak with PB Blaster, Kroil, or Seafoam Deep Creep. Loosen 1/8 turn, work back-and-forth, re-soak — patience prevents the same two-piece breakage the 5.4 3V is famous for.",
    safetyNote:
      "The two-piece extraction risk applies to the 4.6 3V exactly as it does to the 5.4 3V. Have a Lisle 65600 broken plug remover on hand before starting the job.",
    sourceCitationKey: "spec-triton-46-3v-spark-plugs",
  },

  // ── 7. Firing order ─────────────────────────────────────────────────
  {
    id: "spec-triton-46-3v-firing-order",
    sourceType: "repair_note",
    sourceLabel: "Engine Specification",
    title: "Firing order — 1-3-7-2-6-5-4-8 (modular V8 standard)",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["ignition", "engine_mechanical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug", "coil"],
    symptomTags: ["misfire"],
    aliases: [
      "4.6 3V firing order",
      "firing order 4.6",
      "modular V8 firing order",
      "1-3-7-2-6-5-4-8",
    ],
    excerpt:
      "Firing order: 1-3-7-2-6-5-4-8 — the same firing order used by the 5.4 3V, 4.6 2V, and 5.0 Coyote (all modular V8s). Cylinder numbering: passenger bank (right side facing forward) cylinders 1-2-3-4 front-to-rear; driver bank (left) cylinders 5-6-7-8 front-to-rear. Coil-on-plug (COP) ignition — no plug wires, no distributor. If a misfire follows a swapped coil, the coil is at fault; if it stays with the cylinder, the plug or injector is at fault.",
    inspectionHint:
      "For diagnosing a P030X cylinder-specific misfire, swap the suspect coil with a known-good adjacent cylinder and re-test. If the misfire follows the coil, replace it.",
    sourceCitationKey: "spec-triton-46-3v-firing-order",
  },

  // ── 8. Cam phaser rattle (shared with 5.4 3V) ───────────────────────
  {
    id: "known-issue-triton-46-3v-cam-phaser-rattle",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 4.6L 3V Triton",
    title: "Cam phaser cold-start rattle (shared with 5.4 3V)",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["cam_phaser_area", "timing_cover", "vct_solenoid"],
    symptomTags: ["rattle", "ticking"],
    aliases: [
      "4.6 3V cam phaser",
      "4.6 phaser rattle",
      "4.6 cold start rattle",
      "4.6 3V VCT rattle",
      "TSB 08-7-6 4.6",
    ],
    excerpt:
      "The 4.6L 3V uses the SAME cam phaser design as the 5.4L 3V — intake-only Variable Cam Timing (iVCT) with hydraulic phasers actuated by oil pressure. The same failure mode applies: a 1-3 second metallic rattle on cold start from the top-front of the engine that fades as oil pressure builds. Ford TSB 08-7-6 (originally written for the 5.4 3V) is widely applied to the 4.6 3V as well. Root cause is worn phaser lock pins and internal ratchet wear, accelerated by extended oil change intervals. Full repair = timing cover removal + new phasers + new VCT solenoids + timing chains. Cleaning the VCT solenoid screens often gives temporary relief.",
    inspectionHint:
      "Listen on a fully cold start (8+ hours sit). Rattle fading within 60 seconds = phaser-side. Rattle that persists after warmup = chain stretch or tensioner.",
    safetyNote:
      "Driveable but worsens. Monitor for P0016-P0019 cam-crank correlation codes; a jumped timing chain on this interference engine causes valve-to-piston contact.",
    supportingCounts: {
      tsbs: 1,
      forumThreads: 80,
    },
    sourceCitationKey: "known-issue-triton-46-3v-cam-phaser-rattle",
  },

  // ── 9. VCT solenoid sticking ────────────────────────────────────────
  {
    id: "known-issue-triton-46-3v-vct-solenoid",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 4.6L 3V Triton",
    title: "VCT solenoid sticking — P0011 / P0014 codes",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["vct_solenoid", "cam_phaser_area"],
    symptomTags: ["ticking", "rough_idle", "rattle"],
    aliases: [
      "4.6 3V P0011",
      "4.6 3V P0014",
      "VCT solenoid 4.6",
      "VCT screen clog",
      "Motorcraft CG-721",
    ],
    excerpt:
      "P0011 (intake cam over-advanced) and P0014 (intake cam over-retarded) on the 4.6 3V indicate the iVCT system is not achieving commanded cam position. Root causes (in order): clogged VCT solenoid screen from sludge, degraded engine oil, low oil pressure, or worn cam phaser. The VCT solenoid is the SAME Motorcraft part (CG-721 family) as the 5.4 3V — bank-to-bank swap is a free diagnostic. Replacing the solenoid is a 30-minute DIY job (one bolt per solenoid, one per bank). If the code returns after a fresh solenoid, the phaser itself is worn — that is a timing-cover-off shop job.",
    inspectionHint:
      "Pull the solenoid and inspect the inlet screen for sludge. Clean with carb cleaner and reinstall as a free test; if symptoms return, replace the solenoid before condemning the phaser.",
    sourceCitationKey: "known-issue-triton-46-3v-vct-solenoid",
  },

  // ── 10. Spark plug breakage (shared with 5.4 3V) ────────────────────
  {
    id: "known-issue-triton-46-3v-plug-breakage",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 4.6L 3V Triton",
    title: "Spark plug breakage on removal (shared SP-515 risk)",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["ignition", "engine_mechanical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug", "coil"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "4.6 3V broken plug",
      "4.6 3V spark plug stuck",
      "4.6 two-piece plug",
      "Lisle 65600",
      "broken plug head 4.6",
    ],
    excerpt:
      "The 4.6L 3V uses the SAME problematic spark plug design as the 5.4 3V — the early SP-546 / first-revision SP-515 is a two-piece plug whose lower electrode shell can seize in the aluminum head and separate from the upper body during removal. Even the revised SP-515 can stick if it has been in the head for 100K miles. This is the single most-feared 'simple' job on the engine. Mandatory procedure: warm the engine to ~100°F (not hot), penetrating oil soak 24+ hours, loosen 1/8 turn, re-soak, repeat. Have a Lisle 65600 broken plug remover on the bench BEFORE starting.",
    inspectionHint:
      "Do not attempt without (1) the correct penetrating soak procedure, (2) the Lisle 65600 extraction tool, and (3) a magnet on a stick for retrieving broken pieces.",
    safetyNote:
      "If a plug breaks, do NOT force it — the electrode shell can drop into the cylinder. Stop and use the extraction tool. Shop required if you do not have the tooling.",
    sourceCitationKey: "known-issue-triton-46-3v-plug-breakage",
  },

  // ── 11. Timing chain stretch ────────────────────────────────────────
  {
    id: "known-issue-triton-46-3v-timing-chain-stretch",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 4.6L 3V Triton",
    title: "Timing chain stretch at >100K miles",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["cam_phaser_area", "timing_cover"],
    symptomTags: ["rattle"],
    aliases: [
      "4.6 3V timing chain",
      "4.6 chain stretch",
      "4.6 chain slap",
      "4.6 P0016",
      "4.6 P0017",
    ],
    excerpt:
      "Like the 5.4 3V, the 4.6 3V uses primary and secondary timing chains driven from the crank. Chains stretch over time — typically past 100,000 miles with neglected oil changes, sometimes sooner on hard-driven trucks. Stretched chains cause a deeper rattle than cam phasers and set correlation codes P0016 (bank 1 sensor A) or P0017 (bank 1 sensor B). Repair requires full front-of-engine teardown: timing cover off, chains + guides + tensioners + phasers replaced as a complete kit (Cloyes 9-0398SX or Melling 3-0398SC are widely used). 12-18 hours shop labor.",
    inspectionHint:
      "A rattle that does NOT fade on warm-up, plus a P0016/P0017 code, points to chain stretch. Pull the timing chain tensioner cover and inspect the tensioner pin extension — fully extended = excessive chain stretch.",
    safetyNote:
      "Do not drive aggressively with cam correlation codes. A jumped chain on this interference engine destroys valves.",
    sourceCitationKey: "known-issue-triton-46-3v-timing-chain-stretch",
  },

  // ── 12. Exhaust manifold cracking ───────────────────────────────────
  {
    id: "known-issue-triton-46-3v-exhaust-manifold",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 4.6L 3V Triton",
    title: "Exhaust manifold cracking and stud failure",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["exhaust_emissions", "engine_mechanical"],
    issueAreaIds: ["exhaust_manifold_tick"],
    partTags: ["exhaust_manifold"],
    symptomTags: ["exhaust_tick", "ticking"],
    aliases: [
      "4.6 3V exhaust manifold",
      "4.6 manifold crack",
      "4.6 broken stud",
      "4.6 manifold tick",
      "Dorman manifold 4.6",
    ],
    excerpt:
      "The 4.6 3V cast-iron exhaust manifolds crack and the manifold-to-head studs break — same failure pattern as the 5.4 3V because the manifold geometry and stud hardware are similar. Smaller exhaust volume on the 4.6 means the cracking is slightly slower to develop, but high-mileage trucks (>150K) commonly have at least one cracked manifold or broken stud. Symptom: cold-start tick that fades as the manifold expands and seals against the head. Visible soot streaks at the head-to-manifold flange confirm it. Aftermarket replacement: Dorman 674-510/674-511 (improved casting). Stud extraction from the aluminum head is the hardest part of the job — heat the head, use left-hand drill bits, work patiently.",
    inspectionHint:
      "Look for black soot streaks along the manifold-to-head flange, especially passenger-side rear (heat cycles worst). Inspect on a cold engine — leaks are loudest before warmup.",
    safetyNote:
      "An exhaust leak near the firewall can allow CO into the cabin via fresh-air intake. Crack windows until repaired.",
    sourceCitationKey: "known-issue-triton-46-3v-exhaust-manifold",
  },

  // ── 13. Catalyst failure / P0420 P0430 ──────────────────────────────
  {
    id: "known-issue-triton-46-3v-catalyst-failure",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 4.6L 3V Triton",
    title: "Catalyst efficiency loss — P0420 / P0430",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["exhaust_emissions", "engine_mechanical"],
    issueAreaIds: ["exhaust_manifold_tick"],
    partTags: ["catalytic_converter_area", "oxygen_sensor_connector"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "4.6 3V P0420",
      "4.6 3V P0430",
      "catalyst failure 4.6",
      "cat efficiency 4.6",
      "4.6 catalytic converter",
    ],
    excerpt:
      "P0420 (bank 1) and P0430 (bank 2) indicate catalyst efficiency below threshold on the 4.6 3V. Root causes: extended rich running from a stuck-open injector or misfire, oil contamination from valve cover or VCT seal leaks, or simple age (factory cats >150K often fail). Resolve any active misfire BEFORE replacing cats — running rich for weeks destroys the new converter. Aftermarket direct-fit cats (Walker, Eastern, Magnaflow) fit both 4.6 3V and 5.4 3V — the exhaust between the manifold and the muffler is shared geometry on these engines.",
    inspectionHint:
      "Confirm with a downstream O2 sensor live data check (rear sensor should oscillate; if it mirrors the front sensor, the cat is dead). Do not condemn the cat until misfires and rich codes are resolved.",
    sourceCitationKey: "known-issue-triton-46-3v-catalyst-failure",
  },

  // ── 14. Cross-platform parts crossover ──────────────────────────────
  {
    id: "spec-triton-46-3v-parts-crossover",
    sourceType: "repair_note",
    sourceLabel: "Parts Crossover — 4.6L 3V Triton",
    title: "Parts shared with 5.4 3V — use 5.4 lookups as starting point",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: ["cam_phaser_area", "vct_solenoid", "spark_plug", "coil", "exhaust_manifold"],
    symptomTags: [],
    aliases: [
      "4.6 3V parts shared with 5.4",
      "5.4 3V parts crossover",
      "4.6 3V interchange",
      "4.6 5.4 parts shared",
    ],
    excerpt:
      "The 4.6L 3V and 5.4L 3V are sister engines built on the same architecture. The following parts are SHARED and can be sourced under either vehicle's listing: cam phasers, VCT solenoids (Motorcraft CG-721 family), spark plugs (Motorcraft SP-515), oil filter (Motorcraft FL-820-S), coil-on-plug coils (Motorcraft DG-511), exhaust manifold studs and hardware, throttle body (BBK 1822 75mm fits both per BBK), most ignition harness connectors, oil pressure sender, knock sensors, and crankshaft position sensor. NOT shared: long block, heads, intake manifold, headers, pistons, crank, water pump, harmonic balancer — the 5.4 has the longer stroke and bigger displacement. When searching parts catalogs from Korea or anywhere supply is thin, list both engines.",
    inspectionHint:
      "If a 4.6 3V-specific part is back-ordered, check the 5.4 3V listing for the same part number — the supply chain is much deeper.",
    sourceCitationKey: "spec-triton-46-3v-parts-crossover",
  },

  // ── 15. Donor / junkyard availability ───────────────────────────────
  {
    id: "spec-triton-46-3v-donor-availability",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing — 4.6L 3V Triton",
    title: "Donor sources — Crown Victoria PI and 2005-2010 Mustang GT",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 3V junkyard",
      "4.6 3V donor",
      "Crown Vic engine",
      "Mustang GT engine",
      "4.6 3V salvage",
    ],
    excerpt:
      "The 4.6L 3V is the same architecture as the Crown Victoria Police Interceptor (4.6 3V variant, 2009-2011) and the 2005-2010 Mustang GT (4.6 3V) — long-block-level donor candidates are PLENTIFUL in US salvage yards. The Mustang GT version has slightly different intake/exhaust tuning and uses car-specific accessory drives, oil pan, and front cover, but the head + valvetrain + spark plugs + cam phasers all interchange. The Crown Vic Police variant is closest to the F-150 calibration. This is a key advantage over the 4.6 2V (which only appeared in 2009 trucks and is much rarer). For Korean-market F-150 owners: the 4.6 3V is the easier-than-expected engine to part out because Mustang GT donors ship via Stateside salvage exporters at reasonable rates.",
    inspectionHint:
      "When pulling a donor engine, prioritize Crown Vic Police over Mustang GT because the truck calibration is closer. Check for matching ECU calibration before swapping.",
    sourceCitationKey: "spec-triton-46-3v-donor-availability",
  },

  // ── 16. Why dropped after 2010 ──────────────────────────────────────
  {
    id: "spec-triton-46-3v-discontinuation",
    sourceType: "repair_note",
    sourceLabel: "Engine History — 4.6L 3V Triton",
    title: "Why the 4.6 3V was dropped after 2010",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 3V discontinued",
      "4.6 3V last year",
      "why 4.6 dropped",
      "Triton end",
      "Modular V8 retired",
    ],
    excerpt:
      "The 4.6L 3V Triton was retired entirely after 2010 — the 2011 F-150 refresh replaced the whole engine lineup. Reasons: (1) Ford consolidated on the next-generation modular family (5.0 Coyote / 6.2 Boss / 3.5 EcoBoost / 3.7 V6), which all share more parts with each other than the legacy Triton family did; (2) the Coyote 5.0 produced 360 hp / 380 lb-ft on the same fuel economy as the 4.6 3V, making the smaller engine redundant; (3) the 3.7L Ti-VCT V6 absorbed the entry-level role with better fuel economy than the 4.6. The 4.6 3V remains in Crown Victoria PI (through 2011) and Mustang GT (through 2010, replaced by the Coyote 5.0 in 2011). Total F-150 production years: 2009 and 2010 ONLY — making the 4.6 3V the rarest Triton variant in F-150 use.",
    sourceCitationKey: "spec-triton-46-3v-discontinuation",
  },

  // ── 17. Korean import / availability note ───────────────────────────
  {
    id: "spec-triton-46-3v-korea-availability",
    sourceType: "repair_note",
    sourceLabel: "Korea Import — 4.6L 3V Triton",
    title: "4.6 3V in Korea — uncommon but more findable than 4.6 2V",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 3V Korea",
      "4.6 3V import",
      "Korean F-150 4.6 3V",
      "4.6 Triton Korea",
    ],
    excerpt:
      "Most 12th-gen F-150s imported into Korea are 2011+ models (5.0 Coyote and 3.5 EcoBoost dominate) because Korean buyers favor the post-refresh styling and the more powerful drivetrains. The 4.6L 3V is uncommon in Korea but noticeably more findable than the 4.6 2V, because Mustang GT donor engines and Crown Vic Police engines share the architecture. Parts strategy from Korea: order under the 5.4 3V listing for any shared component (cam phasers, VCT solenoids, SP-515 plugs, FL-820-S filter, coils, exhaust manifold hardware) — the 5.4 3V supply chain is deep and ships to Korea regularly via RockAuto, Amazon, and forum group buys. For long-block work, expect a 6-8 week wait on a Mustang GT or Crown Vic donor engine through a Stateside salvage exporter.",
    inspectionHint:
      "Before ordering any 4.6 3V-specific part to Korea, check whether the 5.4 3V part interchanges — it usually does. RockAuto's compatibility filter is reliable for this.",
    sourceCitationKey: "spec-triton-46-3v-korea-availability",
  },

  // ── 18. Tow rating / capability ─────────────────────────────────────
  {
    id: "spec-triton-46-3v-tow-rating",
    sourceType: "owner_manual",
    sourceLabel: "Capability — 4.6L 3V Triton",
    title: "Tow rating — 7,000 lb max (between 4.6 2V and 5.4 3V)",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["engine_mechanical", "drivetrain_4wd"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 3V tow rating",
      "4.6 3V payload",
      "4.6 3V GCWR",
      "4.6 3V towing capacity",
      "F-150 4.6 3V hauling",
    ],
    excerpt:
      "Tow rating: 7,000 lb maximum with the optional tow package — slightly higher than the 4.6 2V (~5,400 lb) but well below the 5.4 3V (11,300 lb) and Coyote 5.0 (10,000 lb). 0-60 mph approximately 9 seconds. Real-world towing the 4.6 3V/4R75E combo is acceptable for a 5,000-6,000 lb trailer on flat highways but feels strained on grades — the 4R75E only has four forward gears and the engine has to climb to 4,000+ rpm to make its torque. If you regularly tow more than 5,000 lb, the 5.4 3V or Coyote 5.0 are better choices.",
    sourceCitationKey: "spec-triton-46-3v-tow-rating",
  },

  // ── 19. Fuel economy ────────────────────────────────────────────────
  {
    id: "spec-triton-46-3v-fuel-economy",
    sourceType: "owner_manual",
    sourceLabel: "Fuel Economy — 4.6L 3V Triton",
    title: "Fuel economy — 14 city / 19 highway mpg",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["fuel_air_metering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 3V mpg",
      "4.6 3V fuel economy",
      "4.6 3V gas mileage",
      "F-150 4.6 3V mpg",
    ],
    excerpt:
      "EPA-rated fuel economy: 14 city / 19 highway / 16 combined mpg (2WD). 4WD knocks 1 mpg off each figure. Slightly better than the 5.4 3V (13/18) thanks to smaller displacement, but the 4R75E 4-speed automatic is the limiting factor — the lack of a 5th or 6th overdrive means highway RPM stays high at 70 mph (~2,400 rpm) compared to the 6R80 trucks. Real-world combined economy in mixed driving is 15-16 mpg, which is the best in the 12th-gen V8 lineup but worse than the 3.7 V6 and 3.5 EcoBoost light-loaded.",
    sourceCitationKey: "spec-triton-46-3v-fuel-economy",
  },

  // ── 20. Used-in / platform sharing ──────────────────────────────────
  {
    id: "spec-triton-46-3v-platform-sharing",
    sourceType: "repair_note",
    sourceLabel: "Platform Sharing — 4.6L 3V Triton",
    title: "Used in 2009-2010 F-150 XL/STX/XLT, Crown Vic PI, Mustang GT",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 3V applications",
      "4.6 3V Mustang GT",
      "4.6 3V Crown Vic",
      "4.6 3V trim levels",
    ],
    excerpt:
      "F-150 applications for the 4.6 3V: 2009-2010 XL, STX, and XLT trim levels (the FX4, Lariat, Platinum, and King Ranch trims got the 5.4 3V or 4.6 2V depending on year). Outside the F-150, the same 4.6 3V was used in: 2009-2011 Crown Victoria Police Interceptor (calibrated for police duty), 2005-2010 Mustang GT (car-oriented intake/exhaust tuning), and select Lincoln/Mercury sedans. The Mustang GT engine and the F-150 engine share the long block, head, and valvetrain — meaning Mustang aftermarket parts (cams, valve springs, intake manifolds) physically fit the F-150 but may require a tune to be drivable. This makes the 4.6 3V the easiest 12th-gen F-150 engine to find aftermarket performance hardware for.",
    sourceCitationKey: "spec-triton-46-3v-platform-sharing",
  },

  // ── 21. Oil filter ──────────────────────────────────────────────────
  {
    id: "spec-triton-46-3v-oil-filter",
    sourceType: "repair_note",
    sourceLabel: "Filter Specification",
    title: "Oil filter — Motorcraft FL-820-S (shared with 5.4, 5.0, 3.5)",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "FL-820-S",
      "Motorcraft FL-820",
      "4.6 3V oil filter",
      "F-150 oil filter",
      "FL820S",
    ],
    excerpt:
      "Oil filter: Motorcraft FL-820-S — the universal 12th-gen F-150 oil filter, shared across the 4.6 3V, 5.4 3V, 5.0 Coyote, and 3.5 EcoBoost. Threading: 22mm x 1.5. Bypass valve: 11-17 psi. Wix 57502, K&N HP-2009, Fram XG3614 (Ultra Synthetic), Royal Purple 10-2867 all cross-reference. This is one of the most widely-stocked oil filters in North America — every parts store carries it. For Korean owners: the filter ships cheaply (small, light) and is a good item to stock 3-4 of at a time.",
    sourceCitationKey: "spec-triton-46-3v-oil-filter",
  },

  // ── 22. Coil pack (DG-511) ──────────────────────────────────────────
  {
    id: "spec-triton-46-3v-coil-pack",
    sourceType: "repair_note",
    sourceLabel: "Ignition Specification",
    title: "Ignition coil — Motorcraft DG-511 (same as 5.4 3V)",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["ignition"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["coil"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "DG-511",
      "Motorcraft DG-511",
      "4.6 3V coil",
      "4.6 ignition coil",
      "COP coil 4.6 3V",
    ],
    excerpt:
      "Ignition coil: Motorcraft DG-511 — coil-on-plug (COP) design, one per cylinder, eight total. The SAME coil part used by the 5.4L 3V Triton. Boot length and connector are identical. Failed coils cause single-cylinder misfires (P0301-P0308). When a coil boot tears or carbon-tracks internally, the cylinder misfires under load. Coils last 80-150K miles depending on plug condition — old plugs with wide gaps stress the coil and shorten its life. Replace coils in matched sets only if multiple have failed; otherwise replace as they fail. The coil-to-plug interface uses a dielectric grease — re-grease the boot at every plug change.",
    inspectionHint:
      "On a misfire, swap the suspect coil with an adjacent cylinder. If the misfire follows the coil to the new cylinder, replace the coil. If it stays on the original cylinder, the plug or injector is the cause.",
    sourceCitationKey: "spec-triton-46-3v-coil-pack",
  },

  // ── 23. Lug nut / wheel torque ──────────────────────────────────────
  {
    id: "torque-spec-triton-46-3v-lug-nuts",
    sourceType: "repair_note",
    sourceLabel: "Torque Specification",
    title: "Lug nut torque — 150 lb-ft (shared 12th-gen spec)",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 3V lug torque",
      "F-150 4.6 3V wheel torque",
      "lug nut torque 2009 F-150",
      "lug nut torque 2010 F-150",
    ],
    excerpt:
      "Lug nuts: 150 lb-ft (204 Nm). Same spec across all 12th-gen F-150 engine options — the wheels and hubs are shared. Always tighten in a star pattern. Re-torque at 100 miles after any tire change. Over-torquing warps brake rotors and causes pulsation under braking. Under-torquing risks wheel separation. Use a calibrated torque wrench — impact guns routinely over-torque to 200+ lb-ft.",
    safetyNote:
      "Always re-torque lug nuts at 100 miles after a tire service. Wheel separation from loose lug nuts is a catastrophic safety failure.",
    sourceCitationKey: "torque-spec-triton-46-3v-lug-nuts",
  },

  // ── 24. Spark plug torque ───────────────────────────────────────────
  {
    id: "torque-spec-triton-46-3v-spark-plug",
    sourceType: "repair_note",
    sourceLabel: "Torque Specification",
    title: "Spark plug torque — 25 lb-ft (34 Nm)",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["ignition", "engine_mechanical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug"],
    symptomTags: [],
    aliases: [
      "4.6 3V plug torque",
      "spark plug torque 4.6",
      "SP-515 torque",
      "4.6 3V plug Nm",
    ],
    excerpt:
      "Spark plug torque: 25 lb-ft (34 Nm). Apply a thin coat of anti-seize ONLY on the threads (never on the electrode or insulator). Do NOT exceed 28 lb-ft — over-torque damages the aluminum head threads and is one of the main causes of broken plug ejection on the 4.6 3V and 5.4 3V family. Use a torque wrench; do not 'guess by feel' on aluminum heads. If a thread feels rough, stop and inspect the bore with a borescope before forcing the plug down.",
    inspectionHint:
      "After torquing, listen at idle for any plug-bore hiss — a leak indicates a damaged thread or insufficient torque. A second-pass torque check after one heat cycle is good practice on this engine.",
    sourceCitationKey: "torque-spec-triton-46-3v-spark-plug",
  },

  // ── 25. Oil drain plug torque ───────────────────────────────────────
  {
    id: "torque-spec-triton-46-3v-oil-drain-plug",
    sourceType: "repair_note",
    sourceLabel: "Torque Specification",
    title: "Oil drain plug torque — 20 lb-ft (27 Nm)",
    vehicleScope: TRITON_4_6_3V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["leak"],
    aliases: [
      "4.6 3V oil drain torque",
      "drain plug torque 4.6",
      "oil pan plug torque 4.6",
      "drain plug crush washer 4.6",
    ],
    excerpt:
      "Oil drain plug: 20 lb-ft (27 Nm). The 4.6 3V uses an aluminum oil pan with a steel drain plug — over-torque strips the threads. Replace the crush washer at every oil change (~$0.50 each) — a flattened washer is the #1 cause of slow seepage drips after an oil change. Capacity: 6.0 US quarts with FL-820-S filter (5W-20 only). If the drain plug threads strip, the fix is a self-tapping oversized plug (Dorman 65249 family) rather than re-tapping the soft aluminum pan.",
    inspectionHint:
      "After every oil change, look under the truck within 50 miles for any drip from the drain plug — most leaks are a reused crush washer.",
    sourceCitationKey: "torque-spec-triton-46-3v-oil-drain-plug",
  },
];
