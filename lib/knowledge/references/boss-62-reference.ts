import { BOSS_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const BOSS_62_REFERENCES: TruckReferenceRecord[] = [
  // ═══════════════════════════════════════════════════
  // KNOWN ISSUES (8 entries)
  // ═══════════════════════════════════════════════════

  // ── 1. Oil consumption ──────────────────────────────────────────────
  {
    id: "known-issue-boss62-oil-consumption",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 6.2L Boss V8",
    title: "Excessive oil consumption on early 6.2L Boss engines",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["spark_plug"],
    symptomTags: ["oil_consumption", "blue_smoke"],
    aliases: [
      "6.2 oil consumption",
      "boss oil burning",
      "6.2L burns oil",
      "raptor oil consumption",
      "1 quart per 2000 miles",
    ],
    excerpt:
      "Some early 6.2L Boss V8 engines consume 1 quart of oil per 2,000-3,000 miles, significantly worse than the 5.0L Coyote sharing the same platform. The issue is most prevalent on 2011-2012 models and is linked to valve guide wear. Symptoms include blue exhaust smoke on cold start and deceleration, fouled spark plugs, and a steadily dropping oil level between changes. Ford's official stance was that 1 qt per 1,000 miles was 'within spec,' but real-world consumption at this level accelerates catalytic converter failure and can lead to engine damage if levels are not monitored closely.",
    inspectionHint:
      "Check oil level every 1,000 miles for at least two oil change intervals to establish a consumption rate. Look for blue smoke on cold start and during deceleration (engine braking). Pull spark plugs and inspect for oily carbon deposits.",
    safetyNote:
      "Running low on oil can cause catastrophic bearing failure. Monitor oil level frequently if consumption is confirmed.",
    supportingCounts: {
      forumThreads: 50,
      nhtsaComplaints: 30,
    },
    sourceCitationKey: "known-issue-boss62-oil-consumption",
  },

  // ── 2. Valve guide wear ─────────────────────────────────────────────
  {
    id: "known-issue-boss62-valve-guide-wear",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 6.2L Boss V8",
    title: "Valve guide wear — root cause of oil consumption",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["engine_mechanical", "timing_valvetrain"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["spark_plug"],
    symptomTags: ["oil_consumption", "blue_smoke", "misfire"],
    aliases: [
      "6.2 valve guide",
      "boss valve guide wear",
      "6.2L head work",
      "valve stem seal 6.2",
    ],
    excerpt:
      "Worn intake and exhaust valve guides allow oil to seep past the valve stems into the combustion chamber. This is the primary root cause behind the 6.2L's documented oil consumption issue. Repair requires head removal, valve guide replacement or knurling, new valve stem seals, and resurfacing. Some owners opt for updated valve guides from later production runs, which used a tighter tolerance. The problem tends to worsen progressively — early intervention prevents catalytic converter contamination.",
    inspectionHint:
      "Perform a leak-down test on each cylinder. Hissing heard at the oil fill cap or valve cover breather during the test indicates valve guide or seal leakage. Bore-scope inspection can reveal oil wetness on valve stems.",
    sourceCitationKey: "known-issue-boss62-valve-guide-wear",
  },

  // ── 3. Timing chain rattle ──────────────────────────────────────────
  {
    id: "known-issue-boss62-timing-chain-rattle",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 6.2L Boss V8",
    title: "Timing chain rattle at high mileage",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["cam_phaser_area", "timing_cover"],
    symptomTags: ["rattle", "ticking"],
    aliases: [
      "6.2 timing chain",
      "boss timing chain rattle",
      "6.2L chain noise",
      "raptor cold start rattle",
    ],
    excerpt:
      "Less common than on the 3.5L EcoBoost but documented at high mileage (150K+ miles). The 6.2L uses a similar Ti-VCT variable cam timing system with timing chains and cam phasers. Chain stretch leads to a cold-start rattle that fades once oil pressure builds. Unlike the EcoBoost, the 6.2L uses a simpler two-chain system, making the repair somewhat less involved. If ignored, jumped timing can cause valve-to-piston contact.",
    inspectionHint:
      "Listen for a brief metallic rattle in the first 3-5 seconds of cold start. Scan for P0016/P0017 cam-crank correlation codes. Check timing chain tensioner for full extension — a fully extended tensioner indicates excessive chain stretch.",
    safetyNote:
      "A jumped timing chain can cause sudden loss of power. Do not ignore cold-start rattle or cam correlation codes.",
    sourceCitationKey: "known-issue-boss62-timing-chain-rattle",
  },

  // ── 4. Exhaust manifold leaks ───────────────────────────────────────
  {
    id: "known-issue-boss62-exhaust-manifold-leak",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 6.2L Boss V8",
    title: "Exhaust manifold bolt failure and leak",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["exhaust_emissions", "engine_mechanical"],
    issueAreaIds: ["exhaust_manifold_tick"],
    partTags: ["exhaust_manifold"],
    symptomTags: ["exhaust_tick", "ticking"],
    aliases: [
      "6.2 exhaust manifold",
      "boss manifold leak",
      "6.2L exhaust tick",
      "broken exhaust stud 6.2",
      "manifold bolt 6.2",
    ],
    excerpt:
      "Similar failure to the well-known 5.4L Triton exhaust manifold issue but with a different bolt pattern. The 6.2L's higher exhaust temperatures and heat cycling cause manifold bolts to stretch and break, creating an exhaust leak heard as a ticking or tapping noise, especially on cold start. The sound often diminishes as the engine warms and the manifold expands to close the gap. Passenger side is most commonly affected due to heat soak from proximity to the firewall. Repair involves extracting broken studs (often requiring drill-out and helicoil) and replacing with updated ARP studs.",
    inspectionHint:
      "Listen for a rhythmic tick at the exhaust manifold area on cold start that fades when warm. Look for soot trails (black streaks) at manifold-to-head mating surfaces. Check for broken or loose manifold studs by visual inspection from below.",
    sourceCitationKey: "known-issue-boss62-exhaust-manifold-leak",
  },

  // ── 5. Spark plug carbon fouling ────────────────────────────────────
  {
    id: "known-issue-boss62-spark-plug-fouling",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 6.2L Boss V8",
    title: "Spark plug carbon fouling from oil consumption",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["ignition", "engine_mechanical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug", "coil", "ignition_harness"],
    symptomTags: ["misfire", "rough_idle", "oil_consumption"],
    aliases: [
      "6.2 fouled plugs",
      "boss spark plug fouling",
      "6.2L misfire",
      "P0300 6.2",
      "carbon fouled plug 6.2",
    ],
    excerpt:
      "A downstream consequence of the oil consumption issue. Oil entering the combustion chamber coats spark plug electrodes with carbon and oily deposits, leading to misfire and rough idle. Affected engines may throw P0300 (random misfire) or cylinder-specific codes (P0301-P0308). Replacing plugs provides temporary relief, but the underlying valve guide issue must be addressed for a lasting fix. Use Motorcraft SP-515 (or SP-534 depending on application). Gap to 0.052 in.",
    inspectionHint:
      "Pull all 8 spark plugs and compare — cylinders with valve guide issues will show oily black deposits versus the light tan/gray of a healthy plug. Note which cylinders are fouled as a guide for which head needs attention.",
    sourceCitationKey: "known-issue-boss62-spark-plug-fouling",
  },

  // ── 6. IWE grinding (Raptor) ────────────────────────────────────────
  {
    id: "known-issue-boss62-iwe-grinding",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 6.2L Boss V8",
    title: "IWE hub disconnect grinding noise (Raptor 4WD)",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: ["drivetrain_leak_or_boot"],
    partTags: ["iwe_solenoid_actuator"],
    symptomTags: ["rattle", "clunk", "vibration"],
    aliases: [
      "IWE grinding",
      "raptor IWE",
      "hub grinding noise",
      "integrated wheel end",
      "4x4 grinding 6.2",
      "IWE vacuum",
    ],
    excerpt:
      "The same Integrated Wheel End (IWE) vacuum-operated hub disconnect system used across 12th-gen F-150 4WD models. Vacuum leaks in the IWE solenoid, check valve, or vacuum lines cause the hubs to partially engage, producing a grinding or growling noise while driving in 2WD. Particularly common on Raptors due to off-road stress on the vacuum lines and exposure to water and debris. The issue can also cause premature front differential wear if left unresolved.",
    inspectionHint:
      "Drive in 2WD at 20-40 mph on a smooth road — a grinding or growling noise from the front axle area indicates IWE malfunction. Inspect the IWE vacuum solenoid on the passenger fender, the check valve, and all vacuum lines for cracks, disconnections, or water intrusion.",
    safetyNote:
      "Partially engaged hubs increase drivetrain stress and can cause unexpected handling changes. Address promptly.",
    supportingCounts: {
      forumThreads: 80,
      nhtsaComplaints: 20,
    },
    sourceCitationKey: "known-issue-boss62-iwe-grinding",
  },

  // ── 7. Power steering pump failure ──────────────────────────────────
  {
    id: "known-issue-boss62-power-steering-pump",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 6.2L Boss V8",
    title: "Power steering pump failure (Raptor off-road stress)",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: ["steering_linkage_wear"],
    partTags: ["tie_rod_end"],
    symptomTags: ["squeal", "leak", "wobble"],
    aliases: [
      "raptor power steering",
      "6.2 steering pump",
      "boss power steering failure",
      "PS pump whine 6.2",
      "steering fluid leak raptor",
    ],
    excerpt:
      "Common on Raptors due to the extreme stress placed on the hydraulic power steering system during off-road use, particularly when the wheels are at full lock against obstacles. The pump can fail internally (manifesting as whine or groan) or externally (seeping from the shaft seal or high-pressure line fittings). Heavy off-road use with larger-than-stock tires accelerates wear. Early warning signs include a whine on full lock turns and foamy or low power steering fluid.",
    inspectionHint:
      "Check power steering fluid level and condition — foamy or aerated fluid indicates a leak or pump issue. Listen for whine or groan during slow-speed full-lock turns. Inspect the pump shaft seal, high-pressure line, and rack connections for wet spots.",
    sourceCitationKey: "known-issue-boss62-power-steering-pump",
  },

  // ── 8. Transmission cooler line leaks (6R80) ───────────────────────
  {
    id: "known-issue-boss62-trans-cooler-line-leak",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 6.2L Boss V8",
    title: "Transmission cooler line leaks (6R80) from heat cycling",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["connector"],
    symptomTags: ["leak"],
    aliases: [
      "6R80 cooler line",
      "transmission cooler leak 6.2",
      "trans line leak raptor",
      "6R80 overheating",
      "transmission fluid leak boss",
    ],
    excerpt:
      "The 6R80 transmission paired with the 6.2L produces significant heat under load (towing, off-road), causing the factory crimped cooler lines to develop leaks at the radiator and transmission fittings. The high torque output of the 6.2L accelerates heat cycling. Leaks typically appear as drips of red ATF at the lower radiator tank or where the lines connect to the transmission. Low fluid level from chronic leaks can cause harsh shifting, slipping, and eventual transmission damage.",
    inspectionHint:
      "Inspect the transmission cooler lines at both the radiator connection and the transmission fitting. Look for wet ATF residue, drips on the subframe, or staining on the lines. Check the transmission fluid level and color — dark or burnt-smelling fluid indicates overheating.",
    safetyNote:
      "A low transmission fluid level can cause sudden loss of drive. Address any ATF leak immediately.",
    sourceCitationKey: "known-issue-boss62-trans-cooler-line-leak",
  },

  // ═══════════════════════════════════════════════════
  // TORQUE & FLUID SPECS (5 entries)
  // ═══════════════════════════════════════════════════

  // ── 9. Spark plug torque spec ───────────────────────────────────────
  {
    id: "spec-boss62-spark-plugs",
    sourceType: "repair_note",
    sourceLabel: "Torque & Spec — 6.2L Boss V8",
    title: "6.2L Boss spark plug spec — SP-515, 25 lb-ft, 5W-20",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["ignition"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug", "coil"],
    symptomTags: ["misfire"],
    aliases: [
      "6.2 spark plug torque",
      "boss spark plug spec",
      "SP-515",
      "SP-534",
      "6.2L plug gap",
    ],
    excerpt:
      "Spark plugs: Motorcraft SP-515 (or SP-534 for some later production 6.2L applications). Torque to 25 lb-ft. Gap: 0.052 in (1.32 mm). Apply a thin film of dielectric grease to the coil boot. Always use anti-seize on threads — the aluminum heads are prone to seizing with steel-thread plugs. Engine oil spec: 5W-20 full synthetic recommended (Motorcraft SAE 5W-20). Change interval: 7,500-10,000 miles with synthetic (shorter if oil consumption is observed).",
    inspectionHint:
      "When installing plugs, hand-thread first to avoid cross-threading in aluminum heads. Torque wrench is mandatory — over-torquing strips the head threads, under-torquing allows blow-by.",
    sourceCitationKey: "spec-boss62-spark-plugs",
  },

  // ── 10. Oil capacity and spec ───────────────────────────────────────
  {
    id: "spec-boss62-oil",
    sourceType: "repair_note",
    sourceLabel: "Torque & Spec — 6.2L Boss V8",
    title: "6.2L Boss oil capacity — 7.7 qt, 5W-20, FL-820-S filter",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["oil_consumption"],
    aliases: [
      "6.2 oil capacity",
      "boss oil spec",
      "FL-820-S",
      "6.2L oil type",
      "raptor oil capacity",
      "6.2 oil change",
    ],
    excerpt:
      "Oil capacity: 7.7 quarts (7.3 L) with filter change. Oil spec: SAE 5W-20 full synthetic (Motorcraft SAE 5W-20 or equivalent meeting WSS-M2C945-B1). Oil filter: Motorcraft FL-820-S. Drain plug torque: 17 lb-ft. Oil change interval: 7,500-10,000 miles under normal conditions; 5,000 miles if towing, off-road use, or oil consumption is observed. Always verify oil level on the dipstick after filling — the 6.2L's oil consumption tendency makes accurate initial fill critical.",
    inspectionHint:
      "When checking oil level, ensure the truck is on level ground and has been sitting for at least 5 minutes after shutdown. The dipstick can be tricky to read on the 6.2L — wipe and re-dip for an accurate reading.",
    sourceCitationKey: "spec-boss62-oil",
  },

  // ── 11. Exhaust manifold torque spec ────────────────────────────────
  {
    id: "spec-boss62-exhaust-manifold",
    sourceType: "repair_note",
    sourceLabel: "Torque & Spec — 6.2L Boss V8",
    title: "6.2L Boss exhaust manifold bolt torque — 18 lb-ft",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["exhaust_emissions"],
    issueAreaIds: ["exhaust_manifold_tick"],
    partTags: ["exhaust_manifold"],
    symptomTags: ["exhaust_tick", "ticking"],
    aliases: [
      "6.2 exhaust manifold torque",
      "boss exhaust bolt spec",
      "exhaust stud torque 6.2",
    ],
    excerpt:
      "Exhaust manifold bolts: 18 lb-ft. Tighten in a center-outward pattern in two passes (10 lb-ft first pass, 18 lb-ft final). Use new bolts or upgraded ARP studs — factory bolts are single-use stretch bolts. Apply anti-seize to stud threads. If extracting broken studs, use a left-hand drill bit and easy-out; helicoil repair may be needed for damaged threads in the head. Manifold gaskets are reusable if not damaged, but replacement is recommended during reinstall.",
    inspectionHint:
      "Before re-torquing, inspect manifold mating surface for warping with a straight edge. Warped manifolds should be resurfaced or replaced to prevent repeat leaks.",
    sourceCitationKey: "spec-boss62-exhaust-manifold",
  },

  // ── 12. Key DTCs ────────────────────────────────────────────────────
  {
    id: "spec-boss62-dtc-codes",
    sourceType: "repair_note",
    sourceLabel: "DTC Reference — 6.2L Boss V8",
    title: "6.2L Boss key diagnostic trouble codes (DTCs)",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["ignition", "timing_valvetrain", "exhaust_emissions"],
    issueAreaIds: ["ignition_misfire_path", "cam_phaser_tick_context", "exhaust_manifold_tick"],
    partTags: ["spark_plug", "cam_phaser_area", "catalytic_converter_area"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "P0300 6.2",
      "P0011 boss",
      "P0012 boss",
      "P0420 6.2",
      "6.2L check engine codes",
      "raptor DTC",
    ],
    excerpt:
      "Key DTCs for the 6.2L Boss V8: P0300 — Random/multiple cylinder misfire (check spark plugs for oil fouling, then coils and valve guides). P0301-P0308 — Cylinder-specific misfire (note which cylinders match valve guide wear pattern). P0011 — Intake camshaft timing over-advanced (VCT solenoid, timing chain stretch, oil viscosity). P0012 — Intake camshaft timing over-retarded (timing chain stretch, VCT solenoid stuck). P0420 — Catalyst system efficiency below threshold (often caused by oil contamination from consumption issue, check plugs and consumption rate before condemning the catalytic converter).",
    inspectionHint:
      "Always scan for freeze-frame data alongside DTCs — engine load, RPM, and coolant temp at the time of the fault help distinguish between root causes. Multiple misfire codes plus oil consumption strongly suggest valve guide wear rather than ignition component failure.",
    sourceCitationKey: "spec-boss62-dtc-codes",
  },

  // ── 13. Transmission fluid spec ─────────────────────────────────────
  {
    id: "spec-boss62-transmission",
    sourceType: "repair_note",
    sourceLabel: "Torque & Spec — 6.2L Boss V8",
    title: "6R80 transmission fluid spec — Mercon LV",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "6R80 fluid",
      "6.2 transmission fluid",
      "Mercon LV",
      "boss trans fluid",
      "raptor transmission spec",
      "6R80 capacity",
    ],
    excerpt:
      "Transmission: 6R80 6-speed automatic (same unit used across 5.0L Coyote and 3.5L EcoBoost F-150s). Fluid: Motorcraft Mercon LV (XT-10-QLVC). Total fill capacity approximately 13.1 quarts. Drain-and-fill (pan drop) yields approximately 6-7 quarts. Transmission pan bolts: 89 lb-in (10 N-m). Use only Mercon LV — Mercon V or Mercon SP are NOT compatible and will cause shift quality issues and potential damage. Change interval: 30,000 miles for severe duty (towing, off-road), 60,000-100,000 miles for normal use.",
    inspectionHint:
      "Check fluid condition on a white paper towel — healthy Mercon LV is red/pink. Dark brown or burnt-smelling fluid indicates overheating. The 6R80 does not have a conventional dipstick on all models — some require checking via the fill plug with the trans at operating temperature.",
    sourceCitationKey: "spec-boss62-transmission",
  },

  // ═══════════════════════════════════════════════════
  // REPAIR COSTS (2 entries)
  // ═══════════════════════════════════════════════════

  // ── 14. Valve guide repair cost ─────────────────────────────────────
  {
    id: "cost-boss62-valve-guide-repair",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost — 6.2L Boss V8",
    title: "Valve guide repair cost — $2,000-$4,000 (head removal required)",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["engine_mechanical", "timing_valvetrain"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["spark_plug"],
    symptomTags: ["oil_consumption", "blue_smoke", "misfire"],
    aliases: [
      "6.2 valve guide cost",
      "boss head work cost",
      "6.2L valve guide repair price",
      "raptor valve guide",
    ],
    excerpt:
      "Valve guide replacement on the 6.2L Boss V8 requires head removal and machine shop work. Cost breakdown: Head removal and reinstall labor — $800-$1,500 (8-12 hours shop time). Machine shop — valve guide replacement, new valve stem seals, resurface heads — $600-$1,200 per head. Parts (gaskets, head bolts, valve stem seals) — $300-$600. Total for both heads: $2,000-$4,000 depending on shop rates and whether one or both heads are affected. Some owners choose to do only the affected head, but both are typically worn if the engine has high mileage. Aftermarket upgraded valve guides with tighter tolerances are available and recommended.",
    inspectionHint:
      "Get a leak-down test to identify which cylinders and heads are affected before authorizing the repair. This helps decide whether one head or both need attention.",
    sourceCitationKey: "cost-boss62-valve-guide-repair",
  },

  // ── 15. Oil consumption diagnostic path ─────────────────────────────
  {
    id: "cost-boss62-oil-consumption-fix",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost — 6.2L Boss V8",
    title: "Oil consumption fix — diagnostic path and cost summary",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug"],
    symptomTags: ["oil_consumption", "blue_smoke", "misfire"],
    aliases: [
      "6.2 oil consumption fix",
      "boss oil burning repair",
      "raptor oil fix cost",
      "6.2L oil consumption diagnostic",
    ],
    excerpt:
      "Diagnostic and repair path for 6.2L oil consumption: Step 1 — Oil consumption test ($0-$50): monitor oil level over 2-3 oil change intervals, document consumption rate. Step 2 — Spark plug inspection ($0-$80): pull all 8 plugs, identify which cylinders show oil fouling. Step 3 — Leak-down test ($100-$200): confirm valve guide leak on affected cylinders. Step 4a — PCV valve replacement ($20-$40): rule out excessive crankcase pressure as a contributing factor. Step 4b — Valve stem seal replacement without head removal ($500-$1,000): a less invasive option that may reduce but not eliminate consumption. Step 5 — Full valve guide repair ($2,000-$4,000): the definitive fix, requires head removal and machine shop work. Total range from diagnosis to definitive repair: $2,200-$4,500. Many owners manage mild consumption (1 qt per 3,000 miles) by simply topping off between changes rather than pursuing the repair.",
    inspectionHint:
      "Start with the cheapest diagnostic steps first. Do not jump to head work without confirming the root cause. PCV valve failure can mimic valve guide symptoms and costs $30 to rule out.",
    sourceCitationKey: "cost-boss62-oil-consumption-fix",
  },
];
