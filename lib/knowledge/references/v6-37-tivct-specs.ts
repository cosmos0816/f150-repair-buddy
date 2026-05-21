import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

/**
 * 3.7L Ti-VCT V6 — 2011-2014 Ford F-150 base engine reference set.
 *
 * Engine architecture quick facts (used across many entries below):
 *  - 3.7L (227 cu in), 60-degree aluminum-block / aluminum-head V6
 *  - DOHC, 4 valves per cylinder, 24 valves total
 *  - Ti-VCT (Twin Independent Variable Cam Timing): intake AND exhaust cam
 *    phasers on each bank — 4 cam actuators total
 *  - Bore × stroke: 95.5 × 86.7 mm (oversquare, rev-happy)
 *  - 10.5:1 compression, port fuel injection
 *  - Firing order: 1-4-2-5-3-6
 *  - VIN position 7 = "M"
 *  - 302 hp @ 6500 RPM, 278 lb-ft @ 4000 RPM (F-150 trim)
 *  - Paired exclusively with the 6R80 6-speed automatic
 *  - Shared platform engine: 2011-2017 Mustang V6 (302 hp),
 *    2010-2014 Lincoln MKS/MKT (305 hp variant),
 *    2010-2015 Ford Edge (285 hp),
 *    2013-2015 Police Interceptor Sedan (305 hp variant)
 *
 * Why F-150 buyers picked it: best-in-lineup 17/23 mpg EPA, cheapest engine
 * to maintain (no turbos, no cam phaser issues like the 3V Triton, simpler
 * architecture than the Coyote), and a 6,100 lb tow rating that handles
 * everything a non-commercial owner actually does.
 */
export const V6_37_TIVCT_REFERENCES: TruckReferenceRecord[] = [
  // ── Engine identity / architecture ──────────────────────────────────

  {
    id: "v6-37-engine-overview",
    sourceType: "repair_note",
    sourceLabel: "Engine Overview — 3.7 Ti-VCT V6",
    title: "3.7L Ti-VCT V6 — 302 hp / 278 lb-ft, replaced 4.6L as F-150 base",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical", "timing_valvetrain"],
    issueAreaIds: [],
    partTags: ["engine_top_front"],
    symptomTags: [],
    aliases: [
      "3.7 V6", "3.7L Ti-VCT", "Cyclone V6", "Duratec 37", "base engine 2011 F-150",
      "F-150 V6", "302 hp V6", "VIN M F-150", "F-150 6-cylinder",
    ],
    excerpt:
      "The 3.7L Ti-VCT V6 is the modern base engine for the 2011-2014 F-150, replacing the 4.6L 2V Triton from 2011 onward as part of the 12th-gen refresh. It is a 60-degree aluminum-block, aluminum-head DOHC V6 with 4 valves per cylinder (24 valves total) and Twin Independent Variable Cam Timing — both intake AND exhaust cams are variable on each bank, for 4 cam actuators in total. Bore × stroke is 95.5 × 86.7 mm (oversquare), compression is 10.5:1, firing order is 1-4-2-5-3-6, and the VIN position 7 code is 'M'. Rated 302 hp @ 6500 RPM and 278 lb-ft @ 4000 RPM in F-150 trim. Always paired with the 6R80 6-speed automatic. The same engine family powers the 2011-2017 Mustang V6 (302 hp), 2010-2014 Lincoln MKS/MKT (305 hp variant), 2010-2015 Ford Edge (285 hp), and 2013-2015 Police Interceptor Sedan (305 hp) — that cross-application makes used parts plentiful at salvage yards.",
    inspectionHint:
      "Confirm the engine by reading the 8th character of the VIN — 'M' = 3.7L Ti-VCT V6. The 3.7 is visually narrower than the 5.0 Coyote, with two skinny valve covers and a tall plastic intake manifold up front.",
    sourceCitationKey: "v6-37-engine-overview",
  },
  {
    id: "v6-37-vs-46-2v-replacement",
    sourceType: "repair_note",
    sourceLabel: "Engine Lineup Context",
    title: "Why the 3.7 V6 replaced the 4.6L 2V as F-150 base engine in 2011",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "why V6 base F-150", "3.7 vs 4.6 2V", "base engine change 2011",
      "F-150 V6 reasoning", "Ford CAFE 2011 F-150",
    ],
    excerpt:
      "For the 2011 12th-gen refresh, Ford retired the 4.6L 2V Triton (248 hp / 294 lb-ft, 15/21 mpg) as the F-150 base engine and replaced it with the 3.7L Ti-VCT V6 (302 hp / 278 lb-ft, 17/23 mpg). The new V6 made more horsepower, comparable torque, and delivered class-leading fuel economy — better than the EcoBoost on the EPA cycle. Ford's reasoning: CAFE pressure, the realisation that most fleet/work-truck buyers don't need V8 torque, and the fact that a modern DOHC V6 with Ti-VCT could match a 2-valve V8 on every real-world metric except top-end towing. Tow rating is 6,100 lb — enough for occasional towing but down from the 7,500 lb 4.6L 2V.",
    sourceCitationKey: "v6-37-vs-46-2v-replacement",
  },
  {
    id: "v6-37-donor-vehicle-cross-application",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing",
    title: "Donor vehicles — Mustang V6, Lincoln MKS/MKT, Ford Edge all share the 3.7",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: ["engine_top_front", "cam_phaser_area", "vct_solenoid"],
    symptomTags: [],
    aliases: [
      "3.7 donor", "Mustang V6 engine parts", "Lincoln MKS engine parts",
      "Ford Edge 3.7 swap", "Police Interceptor 3.7", "junkyard 3.7 V6",
      "3.7 used engine", "3.7 salvage",
    ],
    excerpt:
      "The 3.7L Ti-VCT shares its core architecture (block, heads, cams, phasers, VCT solenoids, oil pump, intake) across a wide range of donor vehicles: 2011-2017 Ford Mustang V6 (302 hp), 2010-2014 Lincoln MKS / MKT (305 hp variant — different intake and tune), 2010-2015 Ford Edge (285 hp), and 2013-2015 Ford Police Interceptor Sedan (Taurus-based, 305 hp). The high-volume Mustang V6 production years (2011-2014) flooded North American salvage yards with low-mileage long blocks. Internal hardware — pistons, rods, crank, heads, cam phasers, VCT solenoids — interchanges across all four platforms. F-150 specific items (intake manifold runners, accessory drive bracket layout, oil pan profile for the truck crossmember, exhaust manifolds) do NOT interchange, so when swapping a long block from a donor verify the oil pan fits the F-150 crossmember before installing.",
    inspectionHint:
      "When buying a used 3.7 from a Mustang or Edge donor, plan on transferring the F-150 oil pan, intake manifold, and exhaust manifolds from the original truck engine. Long block (block + heads + cams) is the interchangeable unit.",
    sourceCitationKey: "v6-37-donor-vehicle-cross-application",
  },
  {
    id: "v6-37-korea-rarity",
    sourceType: "repair_note",
    sourceLabel: "Regional Availability Note",
    title: "3.7L V6 F-150s are extremely rare in Korea — most buyers chose V8/EcoBoost",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "3.7 Korea", "F-150 V6 Korea import", "Korean F-150 V6",
      "rare F-150 Korea", "한국 F-150 V6",
    ],
    excerpt:
      "Field knowledge — F-150s with the 3.7L V6 are extremely rare in the South Korean import market. Buyers who paid the duty and shipping cost almost always opted for the 5.0L Coyote V8, 6.2L Boss V8, or 3.5L EcoBoost. Practical implication: Korean dealers and indie shops will rarely have hands-on familiarity with this engine, and OEM parts (intake-side specific items, sensors) often need to be ordered from the US. Mustang V6 parts (much more common in the Korean market through grey-market imports) are mechanically interchangeable for most internal components.",
    sourceCitationKey: "v6-37-korea-rarity",
  },

  // ── Torque specs ────────────────────────────────────────────────────

  {
    id: "torque-spec-v6-37-spark-plugs",
    sourceType: "repair_note",
    sourceLabel: "Torque Specification — 3.7 V6",
    title: "Spark plug torque — 25 lb-ft (34 Nm)",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["ignition", "engine_mechanical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug"],
    symptomTags: [],
    aliases: [
      "3.7 spark plug torque", "V6 plug torque", "Ti-VCT plug torque",
      "SP-432 torque", "NGK ILZKR8B torque",
    ],
    excerpt:
      "Spark plugs: 25 lb-ft (34 Nm). The 3.7L Ti-VCT uses Motorcraft SP-432 (NGK ILZKR8B equivalent) iridium plugs with a 0.044 in (1.1 mm) gap. Replacement interval is 100,000 miles per Ford. Unlike the 5.4L 3V Triton, the 3.7 V6 does NOT have the two-piece spark plug design — these are standard one-piece plugs that come out cleanly. Apply a thin coat of anti-seize to the threads (aluminum heads), tighten by hand until seated, then torque. Front bank plugs (the bank closer to the radiator) are easy access; the rear bank requires removing the upper intake manifold for full clearance on the rearmost cylinders.",
    inspectionHint:
      "If a plug feels loose well below 25 lb-ft, inspect the thread bore with a borescope. Carbon tracking on the insulator points to a failed coil boot — replace the coil pack with the plug.",
    sourceCitationKey: "torque-spec-v6-37-spark-plugs",
  },
  {
    id: "torque-spec-v6-37-oil-drain-plug",
    sourceType: "repair_note",
    sourceLabel: "Torque Specification — 3.7 V6",
    title: "Oil drain plug torque — 20 lb-ft (27 Nm)",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["leak"],
    aliases: [
      "3.7 drain plug torque", "V6 drain plug spec", "3.7 oil drain torque",
    ],
    excerpt:
      "Oil drain plug: 20 lb-ft (27 Nm). Replace the crush washer at every oil change — reused washers are the #1 cause of slow drain-plug seepage. The 3.7L V6 uses 5W-20 oil (Motorcraft SAE 5W-20, spec WSS-M2C945-B2) with a 6.0 US-quart capacity including filter — smaller than the 5.0 Coyote's 7.7 qt and the 5.4L Triton's 7.0 qt. Filter is the Motorcraft FL-500-S (smaller filter than the V8 engines).",
    inspectionHint:
      "Check for oil weeping at the drain plug after each service. A drip within the first 50 miles almost always indicates a reused crush washer.",
    sourceCitationKey: "torque-spec-v6-37-oil-drain-plug",
  },
  {
    id: "torque-spec-v6-37-valve-cover",
    sourceType: "repair_note",
    sourceLabel: "Torque Specification — 3.7 V6",
    title: "Valve cover bolts torque — 89 in-lb (10 Nm)",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: ["cam_phaser_area"],
    symptomTags: ["leak"],
    aliases: [
      "3.7 valve cover torque", "V6 cam cover spec", "Ti-VCT valve cover bolt",
    ],
    excerpt:
      "Valve cover bolts: 89 in-lb (10 Nm) — INCH-POUNDS, not foot-pounds. The 3.7L DOHC V6 has two skinny valve covers (one per bank), each housing two cam phasers (intake + exhaust) — four phasers visible total when both covers are off. Tighten in a center-outward sequence. Inspect the rubber gasket and spark plug well seals during any valve cover service — leaking well seals allow oil into the plug wells, which causes misfires and carbon tracking on coil boots. Replace gaskets rather than reusing them — they harden with age.",
    inspectionHint:
      "Oil pooling around spark plug wells or visible seepage at the valve cover perimeter indicates a failed gasket. The rear (firewall-side) cover runs hotter and tends to leak first.",
    sourceCitationKey: "torque-spec-v6-37-valve-cover",
  },
  {
    id: "torque-spec-v6-37-intake-manifold",
    sourceType: "repair_note",
    sourceLabel: "Torque Specification — 3.7 V6",
    title: "Intake manifold bolts torque — 89 in-lb (10 Nm)",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical", "fuel_air_metering", "intake_vacuum"],
    issueAreaIds: ["intake_vacuum_air_leak"],
    partTags: [],
    symptomTags: ["rough_idle"],
    aliases: [
      "3.7 intake manifold torque", "V6 upper intake torque",
      "Ti-VCT intake bolt spec", "3.7 plastic intake torque",
    ],
    excerpt:
      "Intake manifold bolts: 89 in-lb (10 Nm) — INCH-POUNDS. The 3.7L V6 uses a composite (plastic) intake manifold that will crack if over-torqued. Tighten in a center-outward cross pattern. Ensure all O-rings and runner gaskets are fully seated before torquing. A vacuum leak at the intake manifold gasket on the 3.7 typically presents as a lean code (P0171 / P0174) and rough idle that smooths out at higher RPM.",
    inspectionHint:
      "With the engine at idle, spray carb cleaner around the intake manifold flange — a change in RPM indicates a vacuum leak at the gasket. Inspect the manifold itself for hairline cracks near the throttle body and runner bases (common on aging plastic intakes).",
    sourceCitationKey: "torque-spec-v6-37-intake-manifold",
  },

  // ── Fluid specs ─────────────────────────────────────────────────────

  {
    id: "fluid-spec-v6-37-engine-oil",
    sourceType: "repair_note",
    sourceLabel: "Fluid Specification — 3.7 V6",
    title: "Engine Oil — 5W-20 Synthetic, 6.0 qt (smaller capacity than V8s)",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["oil_consumption"],
    aliases: [
      "3.7 engine oil", "V6 motor oil", "3.7 oil type", "3.7 oil capacity",
      "Motorcraft 5W-20 3.7", "FL-500-S filter", "WSS-M2C945-B2",
      "Ti-VCT oil", "F-150 V6 oil",
    ],
    excerpt:
      "The 3.7L Ti-VCT V6 uses 5W-20 full synthetic oil (Ford spec WSS-M2C945-B2) — same weight as the 5.0L Coyote and 5.4L Triton, NOT the 5W-30 the 3.5L EcoBoost uses. Capacity is 6.0 US quarts (5.7 liters) with filter, smaller than the Coyote's 7.7 qt. Use Motorcraft FL-500-S filter (smaller filter than the V8 engines' FL-820-S). Ford recommends 10,000-mile intervals with synthetic; the community recommendation is 5,000-7,500 miles, especially for trucks that see short-trip use (oil dilution at idle from port injection is much less severe than the EcoBoost's direct injection, but still real). Recommended brands: Motorcraft Full Synthetic, Mobil 1, Pennzoil Platinum.",
    safetyNote:
      "Do NOT use 5W-30 in the 3.7L V6 — it is spec'd for 5W-20. If the truck is sitting next to an EcoBoost F-150 in the garage, double-check the bottle before filling.",
    sourceCitationKey: "fluid-spec-v6-37-engine-oil",
  },
  {
    id: "fluid-spec-v6-37-coolant",
    sourceType: "repair_note",
    sourceLabel: "Fluid Specification — 3.7 V6",
    title: "Coolant — Motorcraft Premium Gold (Yellow), 12.0 qt",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["cooling"],
    issueAreaIds: ["coolant_leak_source", "cooling_reservoir_and_hose_seep"],
    partTags: ["coolant_reservoir", "radiator_hose", "coolant_hose"],
    symptomTags: ["coolant_smell", "leak"],
    aliases: [
      "3.7 coolant", "V6 antifreeze", "yellow coolant Ford", "Motorcraft Premium Gold",
      "VC-7-B", "VC-7DIL-B", "WSS-M97B51-A1", "3.7 coolant capacity",
    ],
    excerpt:
      "Motorcraft Premium Gold Coolant (yellow) — Ford spec WSS-M97B51-A1 (not the orange HOAT used in the Coyote/EcoBoost/Boss). Concentrate: VC-7-B; pre-diluted: VC-7DIL-B. Total cooling-system capacity is approximately 12.0 US quarts (11.4 liters). NEVER mix yellow Premium Gold with orange HOAT, green IAT, or pink/purple universal coolants — silicate and additive incompatibility causes gelling that blocks the radiator core and heater core. First change at 6 years / 100,000 miles, then every 3 years / 50,000 miles. The 3.7 uses an external water pump, so coolant leaks present externally on the front of the engine (unlike the EcoBoost's internal pump that can dump coolant into the oil).",
    safetyNote:
      "Confirm the bottle says 'Premium Gold' / 'yellow' before topping up. The Coyote, Boss, and EcoBoost in the same generation use orange HOAT — mixing the two coolants will gel and block the cooling system.",
    sourceCitationKey: "fluid-spec-v6-37-coolant",
  },
  {
    id: "fluid-spec-v6-37-transmission",
    sourceType: "repair_note",
    sourceLabel: "Fluid Specification — 3.7 V6",
    title: "6R80 Transmission — Mercon LV (same trans as Coyote / EcoBoost)",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["vibration"],
    aliases: [
      "3.7 transmission fluid", "V6 ATF", "Mercon LV 3.7", "6R80 3.7",
      "XT-10-QLVC", "3.7 trans fluid",
    ],
    excerpt:
      "Motorcraft Mercon LV (XT-10-QLVC) for the 6R80 6-speed automatic — the 3.7L V6 uses the exact same 6R80 transmission and fluid as the 5.0 Coyote, 3.5 EcoBoost, and 6.2 Boss F-150s. Total system capacity: ~13.1 quarts (12.4 liters). A drain-and-fill yields about 7 quarts. Ford officially calls this a 'lifetime fill' — the community strongly disagrees. Recommendation: first change at 60,000 miles, then every 30,000-40,000 miles, more frequently if towing. The 6R80 is sensitive to fluid type — using anything other than Mercon LV degrades shift quality and risks long-term solenoid wear.",
    sourceCitationKey: "fluid-spec-v6-37-transmission",
  },
  {
    id: "fluid-spec-v6-37-accessory-belt",
    sourceType: "repair_note",
    sourceLabel: "Service Specification — 3.7 V6",
    title: "Accessory drive — stretch-fit belt, requires special tool",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["accessory_drive"],
    issueAreaIds: ["accessory_drive_belt_path"],
    partTags: ["belt", "tensioner", "idler_pulley"],
    symptomTags: ["squeal", "chirp"],
    aliases: [
      "3.7 belt", "stretch belt 3.7", "V6 serpentine", "3.7 belt tool",
      "Ford stretch-fit belt", "3.7 accessory drive",
    ],
    excerpt:
      "The 3.7L V6 uses a stretch-fit (elastic) accessory drive belt instead of a sprung tensioner. There is no spring-loaded tensioner to release — the belt is installed under tension by stretching it over the last pulley using a special belt installation tool (Rotunda 303-1565 or aftermarket equivalent). Trying to lever it on with a screwdriver damages the belt's fibres and shortens its life dramatically. Stretch-fit belts have a service life of approximately 100,000 miles; replace if you see cracks across more than 3 ribs per inch, glazing, or chunks missing. Common shared design with several modern Ford engines (2.0 EcoBoost, 1.6 EcoBoost, etc.), so the install tool is reusable across the fleet.",
    inspectionHint:
      "If the belt is making noise, FIRST verify the pulleys spin freely — there is no tensioner to fail on this engine, but the idler pulley and the A/C compressor / alternator bearings can seize and chirp under load.",
    sourceCitationKey: "fluid-spec-v6-37-accessory-belt",
  },

  // ── Key DTCs ────────────────────────────────────────────────────────

  {
    id: "dtc-v6-37-vct-p0011-p0014-p0021-p0024",
    sourceType: "known_issue",
    sourceLabel: "DTC — 3.7 V6",
    title: "P0011 / P0014 / P0021 / P0024 — Ti-VCT cam timing codes (4 phasers)",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["vct_solenoid", "cam_phaser_area"],
    symptomTags: ["rough_idle", "rattle"],
    aliases: [
      "P0011 3.7", "P0014 3.7", "P0021 3.7", "P0024 3.7",
      "3.7 VCT code", "Ti-VCT cam code F-150",
      "3.7 cam phaser", "VCT solenoid 3.7",
    ],
    excerpt:
      "Because the 3.7L Ti-VCT has independent variable timing on intake AND exhaust on BOTH banks, you can see any of four cam codes: P0011 (bank 1 intake over-advanced), P0014 (bank 1 exhaust over-advanced), P0021 (bank 2 intake over-advanced), P0024 (bank 2 exhaust over-advanced) — and their retarded counterparts (P0012/P0015/P0022/P0025). Most common root causes, cheapest first: dirty or stuck VCT oil control solenoid for the specific cam, low oil level or dirty oil, sludged screen in the solenoid feed, or (rare) timing chain stretch at very high mileage. Start with a fresh oil + filter change with the correct 5W-20, then replace the implicated VCT solenoid (4 solenoids total on this engine, one per cam, ~$30-50 each). Swap two solenoids and re-test if the code follows the part. The same generation Mustang V6 community has thoroughly documented this troubleshooting tree.",
    inspectionHint:
      "Check oil level and condition first — dirty or low oil is the #1 cause across all four VCT codes. Pull the implicated VCT solenoid and inspect the small mesh screen on the engine side of the bore for sludge; clean or replace as needed before assuming the solenoid is bad.",
    sourceCitationKey: "dtc-v6-37-vct-p0011-p0014-p0021-p0024",
  },
  {
    id: "dtc-v6-37-lean-codes-p0171-p0174",
    sourceType: "known_issue",
    sourceLabel: "DTC — 3.7 V6",
    title: "P0171 / P0174 — System too lean, both banks (intake / PCV / MAF)",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["fuel_air_metering", "intake_vacuum"],
    issueAreaIds: ["intake_vacuum_air_leak"],
    partTags: ["intake_tube", "maf_sensor", "vacuum_line", "pcv_valve"],
    symptomTags: ["rough_idle", "stumble"],
    aliases: [
      "P0171 3.7", "P0174 3.7", "3.7 lean code", "V6 lean both banks",
      "3.7 vacuum leak", "3.7 MAF dirty",
    ],
    excerpt:
      "P0171 (bank 1 lean) and P0174 (bank 2 lean) together on the 3.7L V6 almost always indicate a vacuum or metered-air problem affecting both banks equally. Top causes, cheapest first: contaminated MAF sensor (clean with MAF-specific cleaner — never carb cleaner), a cracked or unseated intake tube between MAF and throttle body, a failed PCV valve or hose, a cracked plastic intake manifold, or a failed brake booster check valve. Single-bank lean codes (P0171 OR P0174 alone) point to a fuel injector or upstream O2 sensor on that side, not a shared vacuum issue.",
    inspectionHint:
      "Smoke test the intake from the throttle body forward — covers MAF tube, intake manifold, PCV, and brake booster in one shot. If no smoke leaks, clean the MAF sensor and clear codes.",
    sourceCitationKey: "dtc-v6-37-lean-codes-p0171-p0174",
  },
  {
    id: "dtc-v6-37-misfire-p0300",
    sourceType: "known_issue",
    sourceLabel: "DTC — 3.7 V6",
    title: "P0300-P0306 — Misfire codes on the 3.7 V6 (cylinders 1-6)",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["ignition", "engine_mechanical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug", "coil", "fuel_injector"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "P0300 3.7", "P0301 3.7", "3.7 misfire", "V6 misfire code",
      "3.7 cylinder misfire", "F-150 V6 misfire",
    ],
    excerpt:
      "P0300 (random/multiple) versus P0301-P0306 (cylinder-specific 1-6) on the 3.7L. Firing order is 1-4-2-5-3-6. Cylinder numbering: bank 1 (passenger side) is cylinders 1-2-3 front-to-rear, bank 2 (driver side) is 4-5-6 front-to-rear. Single-cylinder misfires are usually a failed coil-on-plug pack or a worn / oil-fouled spark plug — swap the coil to an adjacent cylinder and see if the misfire follows. Random misfires (P0300) point to system-wide issues: vacuum leak, contaminated MAF, weak fuel pump, or low compression from a stuck VCT phaser. With 6 individual coil packs, swapping is a 5-minute diagnostic step.",
    inspectionHint:
      "Swap the coil from the misfiring cylinder to an adjacent one and clear codes. If the misfire follows the coil, replace it. If it stays on the original cylinder, move to plugs, then injector, then compression.",
    sourceCitationKey: "dtc-v6-37-misfire-p0300",
  },

  // ── Known issues / community ────────────────────────────────────────

  {
    id: "v6-37-cold-start-cam-phaser-rattle",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.7 V6",
    title: "Cold-start cam phaser rattle — possible on all 4 phasers, not the 5.4 3V problem",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["cam_phaser_area", "vct_solenoid"],
    symptomTags: ["rattle", "ticking"],
    aliases: [
      "3.7 cold start rattle", "V6 cam phaser noise", "3.7 startup rattle",
      "Ti-VCT phaser rattle", "3.7 cam rattle TSB",
    ],
    excerpt:
      "Some 3.7L V6 trucks exhibit a brief cam-phaser rattle on cold start (typically 1-3 seconds, then quiets as oil pressure builds and the phasers lock). This is NOT the catastrophic 5.4L 3V Triton failure mode — the 3.7's phaser design is fundamentally different and far more robust — but with four phasers per engine, any of them can develop the noise. Ford TSB 12-9-15 covered phaser noise complaints in the 3.5/3.7 family with updated phasers and an oil control program. Most commonly the fix is a fresh oil change with the correct 5W-20 and verification of oil pressure; persistent rattle (>5 seconds, or any rattle at warm idle) warrants a phaser replacement. Community sentiment: an annoyance, not an emergency — owners routinely report 200K+ miles without phaser replacement.",
    inspectionHint:
      "Time the rattle with a stopwatch. Under 3 seconds on cold start and gone by warm idle = monitor only. Persistent rattle, rattle at warm idle, or any associated VCT code (P0011/P0014/P0021/P0024) = phaser service.",
    sourceCitationKey: "v6-37-cold-start-cam-phaser-rattle",
  },
  {
    id: "v6-37-oil-consumption-slow-burn",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.7 V6",
    title: "Slow oil consumption — community reports ~1 qt / 3,000 miles on some units",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["oil_consumption", "blue_smoke"],
    aliases: [
      "3.7 oil consumption", "V6 burning oil", "3.7 oil burn",
      "3.7 PCV oil", "Ti-VCT oil usage",
    ],
    excerpt:
      "A subset of 3.7L V6 trucks (and the same engine in Mustang / Edge applications) develop slow oil consumption, typically 1 quart per 2,500-3,500 miles. Confirmed contributors: PCV system pulling oil mist into the intake (port injection means there's no high-vacuum direct-injection rail to make this worse, but it still happens), worn valve stem seals on high-mileage examples, and on rare units, glazed cylinder walls. The classic 'cracked head if oil starved' warning applies here as it does to most aluminum-head engines — let the level drop below the dipstick minimum and you risk a head crack on the rear bank (the bank with the harder oil-drainback path).",
    inspectionHint:
      "Check oil level every 1,000 miles between changes if the truck is over 100K miles. Look for blue smoke on hard acceleration after long idle (valve seals) versus blue smoke continuously (rings / PCV).",
    safetyNote:
      "Do not let the oil level drop below the MIN mark on the dipstick. Aluminum heads on this engine crack when oil starved — the repair is a long-block replacement.",
    sourceCitationKey: "v6-37-oil-consumption-slow-burn",
  },
  {
    id: "v6-37-coolant-degas-bottle-cracking",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.7 V6",
    title: "Coolant degas bottle cracking — common across many Ford engines of this era",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["cooling"],
    issueAreaIds: ["coolant_leak_source", "cooling_reservoir_and_hose_seep"],
    partTags: ["coolant_reservoir"],
    symptomTags: ["coolant_smell", "leak"],
    aliases: [
      "3.7 coolant tank crack", "F-150 degas bottle leak", "coolant reservoir crack 3.7",
      "Ford coolant tank failure", "V6 coolant reservoir leak",
    ],
    excerpt:
      "The plastic coolant degas bottle (overflow reservoir) on the 3.7L F-150 — and across many Ford engines of this generation including the Coyote, EcoBoost, and Mustang V6 — develops hairline cracks at the seam and around the upper hose neck after 5-8 years of thermal cycling. Symptoms: sweet coolant smell on hot shutdown, slowly dropping coolant level with no visible puddle, occasional drip on the passenger-side front of the engine bay. The cracks are often hard to see when the system is cool — pressurize the system with a cooling-system tester (or watch with the engine fully warmed up) to spot the wet spot. Replacement is a 30-minute job; OEM Motorcraft tanks are recommended over cheap aftermarket plastic, which often re-cracks within a year.",
    inspectionHint:
      "Pressure test the cooling system to 16 psi cold. Watch the seam where the upper and lower halves of the bottle are welded and the necks for any nipples. A wet spot under pressure = replace the bottle.",
    sourceCitationKey: "v6-37-coolant-degas-bottle-cracking",
  },
  {
    id: "v6-37-timing-chain-stretch-high-mileage",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.7 V6",
    title: "Timing chain stretch — rare but reported on very high mileage (>150K)",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["timing_cover"],
    symptomTags: ["rattle", "ticking"],
    aliases: [
      "3.7 timing chain stretch", "V6 timing chain noise", "3.7 chain rattle",
      "Mustang V6 timing chain", "3.7 high mileage chain",
    ],
    excerpt:
      "The 3.7L V6 uses chain-driven cams with no published service interval — Ford treats them as lifetime. However, the Mustang V6 community (same engine, higher RPM use) has documented timing chain stretch on high-mileage examples (typically >150,000 miles), particularly on units that ran extended oil change intervals or low oil levels. Symptoms: persistent rattle on cold start that doesn't go away after 5+ seconds, VCT codes that don't clear after solenoid replacement, and in worst cases a tooth jump that throws crankshaft / camshaft correlation codes (P0016 / P0017 / P0018 / P0019). The repair requires removing the front timing cover and replacing all chains, guides, tensioners, and (recommended) cam phasers — an 8-12 hour shop job on the F-150 due to the truck-specific accessory drive bracket layout.",
    inspectionHint:
      "Persistent rattle that doesn't go away with oil/solenoid service + crank-cam correlation codes (P0016 family) = strongly suspect timing chain stretch. Confirm with a borescope inspection of the chain tensioner extension if accessible.",
    sourceCitationKey: "v6-37-timing-chain-stretch-high-mileage",
  },

  // ── Spec / performance / community context ──────────────────────────

  {
    id: "v6-37-fuel-economy-real-world",
    sourceType: "repair_note",
    sourceLabel: "Performance Note — 3.7 V6",
    title: "Fuel economy — 17/23 EPA, 18-22 highway real-world (best in 12th-gen lineup)",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "3.7 MPG", "V6 F-150 fuel economy", "3.7 gas mileage",
      "F-150 best MPG", "3.7 real world MPG",
    ],
    excerpt:
      "EPA-rated 17 city / 23 highway mpg for the 2WD 3.7L V6 F-150 — the best fuel economy in the entire 12th-gen lineup, edging out even the EcoBoost on the highway cycle (the EcoBoost's turbos hurt cruise efficiency). Community real-world reports: 18-22 mpg on the highway at 65-70 mph unloaded, 14-17 mpg mixed driving, and 11-13 mpg towing near the 6,100 lb max. 4x4 / FX4 trucks lose roughly 1 mpg across the board. The biggest variable is wheel/tire size — going from stock 17 in to 33 in off-road tires drops highway MPG by 2-3.",
    sourceCitationKey: "v6-37-fuel-economy-real-world",
  },
  {
    id: "v6-37-tow-rating-and-acceleration",
    sourceType: "repair_note",
    sourceLabel: "Performance Note — 3.7 V6",
    title: "6,100 lb tow rating, ~7.5 sec 0-60 — surprisingly capable for a V6 truck",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "3.7 tow rating", "V6 F-150 towing", "3.7 0-60",
      "3.7 acceleration", "F-150 V6 capability",
    ],
    excerpt:
      "Maximum tow rating: 6,100 lb when properly equipped — plenty for typical owner uses (boat under 22 ft, single-axle utility trailer, motorcycle trailer) and well below the 11,300 lb 5.0 Coyote or 11,300 lb EcoBoost max. 0-60 mph in the F-150 application is approximately 7.5 seconds — similar to the 5.4L 3V Triton despite 16 lb-ft less peak torque, thanks to the 6R80's wider gear spread and the engine's willingness to rev to 6,500 RPM. Community owners frequently report 'I should have bought this over the 5.4' once they realise the V6 isn't significantly slower in normal driving and gets noticeably better MPG.",
    sourceCitationKey: "v6-37-tow-rating-and-acceleration",
  },
  {
    id: "v6-37-maintenance-cost-comparison",
    sourceType: "repair_note",
    sourceLabel: "Maintenance Note — 3.7 V6",
    title: "Cheapest 12th-gen F-150 to maintain — no turbos, no 3V phaser issues",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "3.7 maintenance cost", "V6 F-150 cheap to own",
      "3.7 reliability", "F-150 V6 ownership cost",
    ],
    excerpt:
      "Field knowledge — the 3.7L V6 is the cheapest engine to maintain in the 2011-2014 F-150 lineup. It has no turbocharger (eliminates ~$2,000 in eventual turbo, intercooler, charge pipe and BOV service), no infamous two-piece spark plugs like the 5.4L 3V, no two-piece cam phaser failure mode like the 3V Triton, smaller oil capacity (6.0 qt vs 7.7 qt Coyote), smaller cheaper oil filter (FL-500-S vs FL-820-S), and a simpler port-injection fuel system (no direct injection carbon problem like the EcoBoost — at least not at typical mileages). The biggest 'gotchas' on this engine are minor: VCT solenoid cleaning, occasional cam phaser noise, the cooling-system degas bottle replacement common to all Ford engines of this era, and on very high mileage units, slow oil consumption. For an owner who keeps a truck 200K+ miles and does most of the work themselves, this is the most economical 12th-gen option by a wide margin.",
    sourceCitationKey: "v6-37-maintenance-cost-comparison",
  },
  {
    id: "v6-37-tuning-and-modifications",
    sourceType: "repair_note",
    sourceLabel: "Performance Note — 3.7 V6",
    title: "Tuning potential — limited; +10-15 hp with tune + intake + exhaust",
    vehicleScope: "2011-2014-ford-f150-3.7-ti-vct-v6",
    systemTags: ["engine_mechanical", "fuel_air_metering", "exhaust_emissions"],
    issueAreaIds: [],
    partTags: ["intake_tube", "catalytic_converter_area"],
    symptomTags: [],
    aliases: [
      "3.7 tune", "V6 F-150 mods", "3.7 cold air intake",
      "3.7 exhaust upgrade", "3.7 Cobb", "3.7 SCT tune",
      "Borla S-Type 3.7",
    ],
    excerpt:
      "The 3.7L V6 has limited bolt-on tuning potential compared to the Coyote or EcoBoost. There is no widely available forced-induction kit for the F-150 application (the Mustang V6 had a couple of supercharger options that do not transfer cleanly to the truck). Realistic gains from common bolt-ons: cold air intake adds a claimed 5-7 hp (mostly sound, not measurable), a cat-back exhaust like the Borla S-Type adds another 3-5 hp and a noticeably better V6 growl, and an SCT BDX or similar handheld tuner adds 10-15 hp with a 91-octane tune. Cobb Accessport is NOT officially supported for the F-150 V6 — Cobb covers the EcoBoost and Mustang V6 but not the truck V6 — verify the current product list before purchasing. Total realistic stack gain: roughly 15-25 hp over stock 302 hp.",
    sourceCitationKey: "v6-37-tuning-and-modifications",
  },
];
