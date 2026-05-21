import { TRITON_4_6_2V_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const TRITON_46_2V_REFERENCES: TruckReferenceRecord[] = [
  // ═══════════════════════════════════════════════════
  // ENGINE IDENTIFICATION & ARCHITECTURE
  // ═══════════════════════════════════════════════════

  // ── 1. VIN decode and visual ID ─────────────────────────────────────
  {
    id: "triton-46-2v-vin-decode",
    sourceType: "repair_note",
    sourceLabel: "Engine ID — 4.6L 2V Triton V8",
    title: "Identifying the 4.6L 2V Triton — VIN code 'W' (2009 F-150 only)",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 2V VIN code",
      "Triton 2V identification",
      "VIN W engine",
      "F-150 base engine 2009",
      "how to tell 2V from 3V 4.6",
      "is my 4.6 2V or 3V",
    ],
    excerpt:
      "The 4.6L 2-valve (2V) Triton V8 was the BASE engine in the 12th-gen F-150 for the 2009 model year ONLY — it does not appear in 2010-2014 F-150s, replaced first by the 4.6L 3V (carried into 2010) then dropped entirely when the 3.7L Ti-VCT V6 took over the base-engine role in 2011. VIN identification: the 8th character (engine code) is 'W' for the 4.6L 2V. The 4.6L 3V uses code '8'. The 5.4L 3V uses code '5'. Visual differences from the 3V: the 2V has a SOHC head with traditional rocker arms (no roller followers), no cam-position sensor on each head, no VCT (variable cam timing) hardware on the front cover, and a single-piece spark plug design with the plug entering straight down through the valve cover well. The 2V's intake manifold is simpler — a one-piece composite plenum without the charge motion control valves found on the 3V. If you can see the cam phaser at the front of the head, you have a 3V. If the timing cover is flat with no phaser bulges, you have a 2V.",
    inspectionHint:
      "Pull a valve cover bolt and peek inside — the 2V shows simple rocker arms over springs; the 3V shows roller-tipped followers and a more complex valvetrain. The 2V uses 16 valves total (2 per cylinder); the 3V uses 24 valves (3 per cylinder).",
    sourceCitationKey: "triton-46-2v-vin-decode",
  },

  // ── 2. Engine specs ──────────────────────────────────────────────────
  {
    id: "triton-46-2v-engine-specs",
    sourceType: "repair_note",
    sourceLabel: "Engine Spec — 4.6L 2V Triton V8",
    title: "4.6L 2V Triton power, torque, displacement and architecture specs",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 2V horsepower",
      "4.6 2V torque",
      "Triton 2V displacement",
      "4.6 base engine specs",
      "248 hp 4.6",
      "294 lb-ft 4.6",
    ],
    excerpt:
      "4.6L 2V Triton V8 factory specifications (2009 F-150): Output — 248 hp @ 4750 RPM, 294 lb-ft of torque @ 4000 RPM. Displacement — 281 cubic inches (4.6 liters). Configuration — 90-degree V8, cast-iron block with aluminum cylinder heads (NOT all-aluminum — this is a frequent point of confusion with the all-aluminum 5.0L Coyote and 6.2L Boss). Valvetrain — SOHC (single overhead cam per bank), 2 valves per cylinder (16 valves total), no VCT, no VVT, traditional rocker arms over hydraulic lash adjusters. Bore x stroke — 90.2 mm x 90.0 mm (3.55 x 3.54 in). Compression ratio — 9.4:1. Firing order — 1-3-7-2-6-5-4-8 (same as 3V and 5.4L Triton). Redline — 6000 RPM. Designed as a fleet/work-truck engine: cheaper to build, simpler to service, and less to go wrong than the 3V variant. The trade-off is power: the 2V makes 44 hp and 26 lb-ft less than the 4.6L 3V in the same year.",
    sourceCitationKey: "triton-46-2v-engine-specs",
  },

  // ── 3. Transmission pairing ─────────────────────────────────────────
  {
    id: "triton-46-2v-transmission-pairing",
    sourceType: "repair_note",
    sourceLabel: "Drivetrain — 4.6L 2V Triton V8",
    title: "4.6L 2V transmission — 4R70E / 4R75E 4-speed automatic",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 2V transmission",
      "4R70E F-150",
      "4R75E pairing",
      "Triton 2V trans",
      "4-speed F-150 2009",
    ],
    excerpt:
      "The 4.6L 2V Triton in the 2009 F-150 is paired exclusively with a 4-speed automatic — either the 4R70E or the upgraded 4R75E (depending on configuration and production date). This is a key distinguishing feature: every other 12th-gen F-150 powertrain (4.6 3V, 5.4 3V, 5.0 Coyote, 6.2 Boss, 3.5 EcoBoost, 3.7 V6) uses a 6-speed automatic (6R80) — the 2V is the only one stuck with the older 4-speed. This contributes to the engine's modest fuel economy and slower 0-60 time. Fluid spec: Mercon V (NOT Mercon LV — that's for the 6R80). Capacity: approximately 13.9 quarts total (dry fill), 5-6 quarts on a pan-drop service. The 4R70/75 family is a known-reliable transmission with abundant parts and rebuild knowledge, but it does not feature tow/haul mode or the smooth shifts of the 6R80.",
    inspectionHint:
      "Check the trans dipstick (the 4R70/75 has a conventional dipstick — the 6R80 does not). Fluid should be bright red. Brown or burnt-smelling fluid indicates overheating, common on towing-heavy 2V trucks.",
    sourceCitationKey: "triton-46-2v-transmission-pairing",
  },

  // ═══════════════════════════════════════════════════
  // FLUID & TORQUE SPECS
  // ═══════════════════════════════════════════════════

  // ── 4. Engine oil spec ──────────────────────────────────────────────
  {
    id: "triton-46-2v-engine-oil-spec",
    sourceType: "repair_note",
    sourceLabel: "Fluid Spec — 4.6L 2V Triton V8",
    title: "Engine oil — 5W-20 synthetic blend, 6.0 qt capacity, FL-820-S filter",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 2V oil capacity",
      "4.6 2V oil type",
      "Triton 2V oil",
      "5W-20 4.6 2V",
      "FL-820-S 4.6",
      "4.6 oil change",
    ],
    excerpt:
      "Engine oil: SAE 5W-20 meeting Ford spec WSS-M2C945-A (synthetic blend or full synthetic acceptable; Motorcraft Semi-Synthetic 5W-20 is the factory fill). Capacity: 6.0 US quarts (5.7 L) with filter change. Filter: Motorcraft FL-820-S — the same filter used across nearly all modular V8 F-150s (4.6 2V, 4.6 3V, 5.4 3V, 5.0 Coyote, 6.2 Boss). This is one of the most universally stocked filters at U.S. parts counters. Change interval per the 2009 owner's manual: 7,500 miles under normal service, 5,000 miles under severe service (towing, dusty conditions, idling). The 2V is more tolerant of oil-change neglect than the 3V because it lacks the cam phasers that are sensitive to oil contamination — but timing chain stretch at very high mileage is still tied to oil hygiene. Drain plug torque: 18-22 lb-ft (M14x1.5 thread, crush washer at every change recommended).",
    safetyNote:
      "Do NOT use 5W-30 in the 4.6L 2V — Ford spec is 5W-20. Higher-viscosity oil reduces fuel economy and can mask wear noises that should prompt inspection.",
    sourceCitationKey: "triton-46-2v-engine-oil-spec",
  },

  // ── 5. Spark plug spec ──────────────────────────────────────────────
  {
    id: "triton-46-2v-spark-plug-spec",
    sourceType: "repair_note",
    sourceLabel: "Spec — 4.6L 2V Triton V8",
    title: "Spark plugs — Motorcraft SP-432, 25 lb-ft, 0.054 in gap, 100K interval",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["ignition"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug", "coil"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "SP-432",
      "4.6 2V spark plug",
      "Triton 2V plug torque",
      "0.054 plug gap 4.6",
      "4.6 2V plug replacement",
      "easy spark plug 4.6",
    ],
    excerpt:
      "Spark plugs: Motorcraft SP-432 (platinum, one-piece design). Torque: 25 lb-ft (34 Nm). Gap: 0.054 in (1.37 mm) — gap is preset from the factory; do NOT adjust platinum plug electrodes. Replacement interval: 100,000 miles. Critical point: the 4.6L 2V uses a CONVENTIONAL one-piece spark plug, unlike the infamous two-piece plugs in the 5.4L 3V and 4.6L 3V that are notorious for breaking off inside the head during removal. The 2V's plugs come out cleanly with normal effort and are one of the easiest service items on the engine. Apply a thin film of nickel anti-seize to the threads (the heads are aluminum — steel-thread plugs can seize over 100K miles). Add a small dab of dielectric grease to the coil boot before reinstalling the COP (coil-on-plug) ignition coil. Plug access on the 2V is straightforward — no intake manifold removal required, unlike some 3V scenarios. Some owners step up to NGK Iridium IX or Denso TT plugs for longer life; OEM Motorcraft is fine and inexpensive.",
    inspectionHint:
      "After removal, inspect the porcelain for oily black deposits (valve guide wear) or white/glazed appearance (lean condition or excessive heat). Tan-to-light-gray = healthy combustion.",
    sourceCitationKey: "triton-46-2v-spark-plug-spec",
  },

  // ── 6. Coolant spec ─────────────────────────────────────────────────
  {
    id: "triton-46-2v-coolant-spec",
    sourceType: "repair_note",
    sourceLabel: "Fluid Spec — 4.6L 2V Triton V8",
    title: "Coolant — Motorcraft Premium Gold (yellow), 4.5 gal capacity",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["cooling"],
    issueAreaIds: ["coolant_leak_source", "cooling_reservoir_and_hose_seep"],
    partTags: ["coolant_reservoir", "radiator_hose", "thermostat_housing"],
    symptomTags: ["coolant_smell", "leak"],
    aliases: [
      "4.6 2V coolant",
      "Motorcraft Gold coolant",
      "yellow coolant F-150",
      "Triton 2V antifreeze",
      "VC-7-B",
      "WSS-M97B51-A1",
    ],
    excerpt:
      "Coolant: Motorcraft Premium Gold Engine Coolant (yellow color, hybrid organic acid technology, prediluted VC-7DIL-B or concentrate VC-7-B). Ford spec WSS-M97B51-A1. This is YELLOW gold — different from the ORANGE Motorcraft coolant used in 2011+ F-150s (5.0, 6.2, 3.5 EcoBoost, 3.7 V6). The 2009 F-150 with 4.6 2V was specified for the yellow Gold coolant from the factory. Total system capacity: approximately 4.5 US gallons (17 liters). NEVER mix yellow Gold with orange HOAT or green IAT coolants — chemical incompatibility causes gelling that clogs the radiator core and heater core. First change at 6 years / 105,000 miles, then every 3 years / 50,000 miles. The 2V uses a conventional external water pump driven by the front accessory drive belt — coolant leaks show up externally at the pump weep hole, hose ends, or thermostat housing, never internally into the oil (unlike the EcoBoost's internal water pump).",
    inspectionHint:
      "Check the weep hole at the bottom of the water pump for crusty coolant residue — a sign of pending pump seal failure. Inspect the plastic upper radiator end tanks for hairline cracks (common at 150K+ miles).",
    sourceCitationKey: "triton-46-2v-coolant-spec",
  },

  // ── 7. Transmission fluid spec ──────────────────────────────────────
  {
    id: "triton-46-2v-trans-fluid-spec",
    sourceType: "repair_note",
    sourceLabel: "Fluid Spec — 4.6L 2V Triton V8",
    title: "4R70E/4R75E transmission fluid — Mercon V (NOT Mercon LV)",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["vibration"],
    aliases: [
      "4R70E fluid",
      "4R75E fluid",
      "Mercon V F-150",
      "4.6 2V trans fluid",
      "Triton 2V transmission fluid",
      "Mercon LV vs Mercon V",
    ],
    excerpt:
      "Transmission fluid for the 4R70E or 4R75E paired with the 4.6L 2V: Motorcraft Mercon V (XT-5-QMC). DO NOT use Mercon LV — that fluid is for the 6R80 used in 2011+ trucks and will cause shift quality degradation in the 4R70/75. Some very early 4R70E production used original-spec Mercon, which Ford later superseded with Mercon V; today, Mercon V is the correct service fluid for both. Total fill capacity: 13.9 quarts (dry rebuild). Pan-drop drain-and-fill yields approximately 5-6 quarts. Service interval: 30,000 miles for severe duty (towing, off-road, hot climate), 60,000 miles for normal use. Ford does NOT mark this as 'lifetime fill' on the 2009 4-speeds — they expect periodic service, unlike the 6R80. Pan bolts: 89 in-lb (10 Nm). Always check the magnet on the pan for metallic debris — fine gray fuzz is normal, chunks indicate internal damage.",
    inspectionHint:
      "Check fluid on the dipstick at operating temperature, with the engine running and the selector in PARK. Healthy Mercon V is bright red. Brown or pink fluid indicates contamination; burnt smell indicates clutch wear.",
    sourceCitationKey: "triton-46-2v-trans-fluid-spec",
  },

  // ── 8. Serpentine belt routing ──────────────────────────────────────
  {
    id: "triton-46-2v-serpentine-belt",
    sourceType: "repair_note",
    sourceLabel: "Spec — 4.6L 2V Triton V8",
    title: "Serpentine belt — single belt, simpler routing than 3V engines",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["accessory_drive"],
    issueAreaIds: ["accessory_drive_belt_path"],
    partTags: ["belt", "tensioner", "idler_pulley", "front_accessory_drive"],
    symptomTags: ["squeal", "chirp"],
    aliases: [
      "4.6 2V belt routing",
      "Triton 2V serpentine",
      "single belt F-150",
      "4.6 2V belt diagram",
      "accessory belt 4.6",
    ],
    excerpt:
      "The 4.6L 2V uses a single serpentine belt with simpler routing than the 5.4L 3V (which often runs a primary belt plus a small secondary belt for the supercharger or other accessories on some applications). Belt drives: crankshaft pulley, alternator, power steering pump, water pump, A/C compressor, and the spring-loaded automatic tensioner. Tensioner is a one-piece unit — replace as an assembly when worn; the spring inside is not serviceable. Belt length and part number vary slightly between 2009 F-150 4.6 2V trucks with and without factory A/C, so confirm by VIN at the parts counter. Symptoms of belt wear: chirping at idle (idler bearing or tensioner pulley), squealing on cold start (glazed belt slipping), or visible cracks in the belt grooves on the ribbed side. Replace the belt and tensioner together at 100,000 miles or any time the belt shows cracking. A belt-routing diagram is printed on the radiator support — photograph it before removal as a reference for reinstallation.",
    inspectionHint:
      "Spin idler and tensioner pulleys by hand with the belt removed — they should turn smoothly with no roughness or play. Any grinding or wobble means replace the pulley.",
    sourceCitationKey: "triton-46-2v-serpentine-belt",
  },

  // ═══════════════════════════════════════════════════
  // KNOWN ISSUES (THE LIMITED, MILD LIST)
  // ═══════════════════════════════════════════════════

  // ── 9. Timing chain stretch at very high mileage ────────────────────
  {
    id: "triton-46-2v-timing-chain-stretch",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 4.6L 2V Triton V8",
    title: "Timing chain stretch at very high mileage (200K+ miles)",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["timing_cover", "cam_phaser_area"],
    symptomTags: ["rattle", "ticking"],
    aliases: [
      "4.6 2V timing chain",
      "Triton 2V chain stretch",
      "4.6 chain rattle",
      "4.6 2V cold start rattle",
      "modular V8 timing chain",
    ],
    excerpt:
      "Timing chain stretch is the principal long-term wear item on the 4.6L 2V — but unlike the infamous 3V cam phaser rattle that can appear at 80K-100K, the 2V's chains typically run 200,000+ miles before showing wear. The 2V has NO cam phasers, NO VCT solenoids, and a simpler two-chain layout (one per bank, driving a single overhead cam on each head). Symptoms of stretch: brief metallic rattle on cold start that fades within a few seconds as the oil-pressurized tensioner takes up slack. At extreme wear, P0016/P0017/P0018/P0019 cam-crank correlation codes may set. Repair when needed involves removing the front timing cover, replacing chains, tensioners, and guides. Cost is moderate ($800-$1,500 indie shop) — significantly cheaper than the 3V's cam phaser job ($2,000-$3,000) because there's no phaser hardware to source. Many 4.6 2V engines from Crown Vics, Town Cars, and 2009 F-150s reach 300K miles on the original chains with regular oil changes — this is fundamentally a maintenance issue, not a design defect.",
    inspectionHint:
      "Listen for 2-5 seconds of metallic rattle on a cold start that disappears once oil pressure stabilizes. Scan for P0016/P0017 correlation codes. A fully extended timing chain tensioner (visible after pulling the front cover) confirms stretch.",
    sourceCitationKey: "triton-46-2v-timing-chain-stretch",
  },

  // ── 10. Valve cover gasket leak ─────────────────────────────────────
  {
    id: "triton-46-2v-valve-cover-leak",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 4.6L 2V Triton V8",
    title: "Valve cover gasket seepage — common at 100K+ miles",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["cam_phaser_area"],
    symptomTags: ["leak"],
    aliases: [
      "4.6 2V valve cover leak",
      "Triton 2V oil leak",
      "valve cover gasket 4.6",
      "oil leak top of engine 4.6",
      "modular V8 valve cover",
    ],
    excerpt:
      "Valve cover gasket seepage is by far the most common oil-leak source on the 4.6L 2V. The composite valve covers and rubber-style gaskets harden with heat cycles, allowing oil to weep at the perimeter — typically showing up first on the passenger-side rear corner (closest to the exhaust crossover and hottest area of the engine bay). Symptoms: oil residue and dust accumulation along the valve cover edges, oil smell after a long highway drive, occasional drips onto the exhaust manifold producing a faint burning oil smell. This is a slow leak, not a safety issue, but should be addressed at the next service interval to prevent oil from saturating the alternator and other accessories below. Repair is straightforward: both gaskets replaced for around $30-$50 in parts (Fel-Pro VS50635 or equivalent), 2-3 hours of labor. Use new bolts or apply blue Loctite to existing bolts. Torque: 89 in-lb (10 Nm) — do NOT over-torque the composite covers, they crack easily.",
    inspectionHint:
      "Wipe the valve cover perimeter clean, drive for a few hundred miles, then re-inspect. Fresh oil reappearance confirms the gasket. Check the rear passenger corner first — that's where it almost always starts.",
    sourceCitationKey: "triton-46-2v-valve-cover-leak",
  },

  // ── 11. Alternator failure ───────────────────────────────────────────
  {
    id: "triton-46-2v-alternator-failure",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 4.6L 2V Triton V8",
    title: "Alternator failure at ~150K miles — predictable wear item",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["charging", "electrical"],
    issueAreaIds: ["battery_charge_and_ground_path"],
    partTags: ["alternator_area", "battery"],
    symptomTags: ["dead_battery"],
    aliases: [
      "4.6 2V alternator",
      "Triton 2V charging system",
      "alternator failure F-150 2009",
      "Motorcraft alternator 4.6",
      "charging light F-150",
    ],
    excerpt:
      "Alternator failure is a predictable wear item on the 4.6L 2V — typically appearing around 150,000 miles. The factory alternator (Motorcraft GL-936 or similar, depending on amperage spec — 110A standard, 130A heavy-duty package) suffers brush wear, voltage regulator failure, or bearing failure in that order. Symptoms in order of appearance: brief dimming of headlights at idle, intermittent battery warning light on cold mornings, then progression to full charging failure with the battery light staying on continuously. Voltage at the battery with the engine running should read 13.8-14.4V; below 13.5V indicates a weak alternator; above 15V indicates regulator failure. Replacement is straightforward — single belt removal, three bolts, two wiring connectors, 30-45 minutes. Aftermarket options are inexpensive ($120-$200), but reman Motorcraft units are highly recommended for longevity. Often it's worth replacing the battery at the same time if the original has been deep-cycled multiple times during the alternator's failure progression.",
    inspectionHint:
      "Measure battery voltage with the engine off (should be 12.4-12.7V) and with the engine running at 2000 RPM (should be 13.8-14.4V). A reading below 13.5V running confirms a weak alternator. Listen for bearing growl from the alternator with the belt running.",
    sourceCitationKey: "triton-46-2v-alternator-failure",
  },

  // ── 12. Spark plug carbon buildup ───────────────────────────────────
  {
    id: "triton-46-2v-spark-plug-carbon",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 4.6L 2V Triton V8",
    title: "Spark plug carbon buildup from extended intervals",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["ignition"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug", "coil"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "4.6 2V plug fouling",
      "Triton 2V carbon plug",
      "4.6 carbon buildup",
      "modular V8 plug deposits",
      "P0300 4.6 2V",
    ],
    excerpt:
      "Owners who push past Ford's 100,000-mile spark plug interval often see carbon and lacquer deposits on the platinum electrodes of the SP-432 plugs. Unlike the 3V's catastrophic two-piece plug breakage, the 2V's failure mode is gradual: misfire on a cold start that clears once the engine warms, slow-developing rough idle, and eventually a P0300 (random misfire) or cylinder-specific P0301-P0308 code. The 2V is much more forgiving than the 3V — plugs come out cleanly even at 150K miles, and the worst case is usually just dirty plugs rather than a $1,000 broken-plug extraction job. Recommended practice: replace plugs at 80,000 miles rather than the official 100K interval to maintain combustion quality and avoid carbon-driven misfires. While the plugs are out, inspect the COP (coil-on-plug) ignition coils for cracks in the boot or signs of arcing on the porcelain end. Replace any coil that shows tracking damage; otherwise reuse if no symptoms.",
    inspectionHint:
      "Pull plug #1 and inspect — the porcelain insulator should be tan to light gray. Black soot indicates running rich; oily black indicates valve guide wear (uncommon on 2V); white/glazed indicates lean condition.",
    sourceCitationKey: "triton-46-2v-spark-plug-carbon",
  },

  // ── 13. Intake manifold gasket seepage (composite plenum) ───────────
  {
    id: "triton-46-2v-intake-manifold-gasket",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 4.6L 2V Triton V8",
    title: "Intake manifold gasket seepage (composite plenum, high mileage)",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["intake_vacuum", "engine_mechanical"],
    issueAreaIds: ["intake_vacuum_air_leak"],
    partTags: ["intake_tube", "vacuum_line"],
    symptomTags: ["rough_idle", "hiss"],
    aliases: [
      "4.6 2V intake gasket",
      "Triton 2V vacuum leak",
      "composite intake leak 4.6",
      "lean code 4.6",
      "P0171 4.6 2V",
      "P0174 4.6 2V",
    ],
    excerpt:
      "At 150,000+ miles, the rubber-on-composite intake manifold gaskets harden and lose seal, producing a small vacuum leak. Symptoms: P0171 (system lean bank 1) and/or P0174 (system lean bank 2) codes, rough idle that smooths above 1500 RPM, occasional surge or hesitation at light throttle. The 2V's intake manifold itself is a composite (plastic) one-piece unit — early Ford modular V8s had a coolant-passage cracking issue with the composite intakes (specifically affecting 1996-2001 4.6L 2Vs in cars). By the 2009 F-150 production, Ford had revised the composite material and the coolant-passage issue is rare on truck applications, but the gasket wear remains. Repair: remove the intake, replace gaskets ($30-$50, Fel-Pro MS96651 or equivalent), torque to 89 in-lb in the factory sequence. Inspect the manifold itself during removal for hairline cracks or warping. While the intake is off, replace the PCV valve as a preventive measure.",
    inspectionHint:
      "Spray carburetor cleaner around the intake-to-head joint at idle — a temporary RPM change confirms the leak location. Smoke test with the intake plumbing sealed is the most reliable diagnostic.",
    sourceCitationKey: "triton-46-2v-intake-manifold-gasket",
  },

  // ═══════════════════════════════════════════════════
  // CAPABILITY & COMPARISONS
  // ═══════════════════════════════════════════════════

  // ── 14. Tow rating ──────────────────────────────────────────────────
  {
    id: "triton-46-2v-tow-rating",
    sourceType: "repair_note",
    sourceLabel: "Capability — 4.6L 2V Triton V8",
    title: "Tow rating — 6,000 lb max (work-truck spec, far below 5.4L 3V)",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 2V tow rating",
      "Triton 2V towing",
      "4.6 base engine tow capacity",
      "2009 F-150 tow capacity 4.6",
      "weakest F-150 engine",
    ],
    excerpt:
      "Maximum tow rating for the 2009 F-150 with the 4.6L 2V is approximately 6,000 lbs — significantly less than the 5.4L 3V's 11,300 lbs in the same chassis. This is the lowest tow rating of any engine ever offered in the 12th-gen F-150. The 2V's combination of modest torque (294 lb-ft) and the older 4-speed automatic (4R70E/4R75E, no tow/haul mode) limits its capability for serious towing. Even the 4.6L 3V — same displacement, more power — was rated for around 7,500 lbs depending on configuration. This is the clearest signal of the 2V's intended role: a fleet/work-truck base engine for unloaded duty, urban service, light hauling, and budget buyers who didn't need towing capacity. Payload rating is similarly modest at around 1,500 lbs depending on cab/bed configuration. If you regularly tow boats, campers, or trailers over 4,000 lbs, the 5.4L 3V or any of the 2011+ engines (3.5 EcoBoost, 5.0 Coyote, 6.2 Boss) is a far better choice.",
    sourceCitationKey: "triton-46-2v-tow-rating",
  },

  // ── 15. Performance — 0-60 and fuel economy ─────────────────────────
  {
    id: "triton-46-2v-performance-mpg",
    sourceType: "repair_note",
    sourceLabel: "Performance — 4.6L 2V Triton V8",
    title: "0-60 time ~10 sec and fuel economy 14/18 mpg — modest but predictable",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 2V 0-60",
      "4.6 2V mpg",
      "Triton 2V fuel economy",
      "slow F-150 2009",
      "base F-150 acceleration",
    ],
    excerpt:
      "Performance figures for the 2009 F-150 with the 4.6L 2V: 0-60 mph in approximately 10 seconds (regular cab, 4x2, lightly loaded — slower with crew cab and 4x4). For comparison, the 5.4L 3V in the same chassis runs around 8 seconds, and the later 2011+ 3.5 EcoBoost cracks 7 seconds. The 4-speed transmission's gearing and the engine's modest torque combine for what owners politely call 'adequate' acceleration — fine for daily driving, slow when merging onto a highway with a load, and downright leisurely uphill. Fuel economy (EPA): 14 mpg city / 18 mpg highway / 16 combined for the regular cab 4x2. Real-world owner-reported averages tend to land around 14-15 mpg combined in mixed driving. For context, the 5.4L 3V in the same year managed 13/17 city/highway — the 2V's economy is only marginally better despite the smaller displacement, because the heavier truck still requires meaningful throttle to move. The 3.7L V6 that replaced this engine in 2011 jumped to 17/23 mpg, which is why the 2V was dropped.",
    sourceCitationKey: "triton-46-2v-performance-mpg",
  },

  // ── 16. Why it was dropped after 2009 ───────────────────────────────
  {
    id: "triton-46-2v-discontinuation",
    sourceType: "repair_note",
    sourceLabel: "Background — 4.6L 2V Triton V8",
    title: "Why the 4.6L 2V was dropped after 2009 — efficiency and platform refresh",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 2V discontinued",
      "why no 4.6 2V in 2010",
      "Triton 2V end of life",
      "F-150 engine lineup 2010",
      "modular V8 phased out",
    ],
    excerpt:
      "The 4.6L 2V Triton appeared in the 12th-gen F-150 for ONE YEAR ONLY — the 2009 model year. For 2010, Ford simplified the lineup to just the 4.6L 3V and 5.4L 3V (both 24-valve engines). For 2011, Ford executed a complete powertrain refresh that retired all of the Triton modular V8s and replaced them with: the 3.7L Ti-VCT V6 (new base engine), the 5.0L Coyote V8 (new mid-range), the 3.5L EcoBoost V6 (twin-turbo torque option), and the 6.2L Boss V8 (top-tier and Raptor). Reasons for retiring the 2V: (1) Federal CAFE fuel-economy standards were tightening, and the 2V's 16/18 mpg numbers were below acceptable for the F-150's projected sales volume; (2) the older 4-speed transmission paired with the 2V was a fuel-economy anchor; (3) sales were poor — most 2009 buyers stepped up to the 3V or 5.4L for more capability; (4) Ford wanted a clean break from the modular V8 architecture in favor of newer engine designs with more potential for power-and-economy tuning. The 2V was the cheapest engine to manufacture, but the regulatory and market forces of 2010-2011 left no room for it in the F-150 lineup.",
    sourceCitationKey: "triton-46-2v-discontinuation",
  },

  // ── 17. Junkyard ubiquity / donor engines ───────────────────────────
  {
    id: "triton-46-2v-donor-engine-availability",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing — 4.6L 2V Triton V8",
    title: "Junkyard availability — Crown Vic, Town Car, Mustang, E-Series donors",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 2V donor engine",
      "Triton 2V junkyard",
      "Crown Vic 4.6 swap",
      "Mustang GT 4.6 2V",
      "Town Car engine swap",
      "E-Series 4.6",
    ],
    excerpt:
      "The 4.6L 2V Triton is one of the most produced engines in modern American history — sold in millions of Crown Victorias (1992-2011), Lincoln Town Cars (1991-2011), Mercury Grand Marquis, Mustang GTs (1996-2004, before the 3V Mustang debuted), and Ford E-Series vans. As a result, donor 2V engines are everywhere in U.S. salvage yards, frequently with low mileage from Crown Vic police cruisers retired due to crashes or chassis rust rather than engine failure. Typical pull-it-yourself prices in 2024-2026: $400-$800 for a complete engine with 100-150K miles. Important compatibility note: the F-150's intake manifold, accessory drive bracket, oil pan, exhaust manifolds, and engine harness differ from the car applications — when swapping a junkyard 2V into an F-150, transfer the F-150's external accessories rather than relying on the donor's setup. The block, heads, crank, rods, pistons, and timing components are interchangeable across all 2V applications, so a Crown Vic short block can become a perfectly viable F-150 long block with the truck-specific accessories bolted on.",
    inspectionHint:
      "Before buying a donor engine, pull a valve cover bolt and inspect for sludge. Crown Vic taxi engines run hot at idle but often have clean internals from highway miles. Police-package engines (P71 code) typically have heavy-duty oil coolers and the cleanest bottom ends.",
    sourceCitationKey: "triton-46-2v-donor-engine-availability",
  },

  // ── 18. Owner reputation / Crown Vic heritage ───────────────────────
  {
    id: "triton-46-2v-reliability-reputation",
    sourceType: "repair_note",
    sourceLabel: "Reputation — 4.6L 2V Triton V8",
    title: "'The engine that just runs forever' — Crown Vic taxi/cop car heritage",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 2V reliability",
      "Triton 2V reputation",
      "Crown Vic engine reliability",
      "best modular V8",
      "most reliable Ford V8",
      "taxi engine 4.6",
    ],
    excerpt:
      "The 4.6L 2V Triton's reputation in the enthusiast and mechanic community is summed up by the phrase 'the engine that just runs forever.' Over a 17-year production run powering taxi fleets, police interceptors, fleet sedans, and work trucks, the 2V demonstrated extraordinary durability — 300,000-mile engines are routine, 500,000-mile engines are not uncommon in well-maintained Crown Vic taxis. The engine's design choices favor longevity: cast-iron block (handles overheating events that would warp aluminum), simple SOHC valvetrain (no cam phasers to fail, no roller followers to flatten), conservative compression ratio (9.4:1 runs happily on 87 octane), and proven non-VCT timing (no oil-pressure-dependent cam timing solenoids to gum up). Trade-offs are honest: modest power, mediocre fuel economy, and a 4-speed transmission that feels dated. But for an owner who values reliability over capability — and especially for a Korean owner who would prefer to never see the inside of an engine machine shop — this is arguably the most bulletproof engine ever offered in the F-150 platform. Many owners affectionately call it 'the boring engine' as a compliment.",
    sourceCitationKey: "triton-46-2v-reliability-reputation",
  },

  // ── 19. No cam phaser issue (key 3V advantage) ──────────────────────
  {
    id: "triton-46-2v-no-cam-phaser-advantage",
    sourceType: "repair_note",
    sourceLabel: "Design — 4.6L 2V Triton V8",
    title: "NO cam phaser — the major reliability advantage over the 3V engines",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["cam_phaser_area", "vct_solenoid"],
    symptomTags: ["rattle", "ticking"],
    aliases: [
      "4.6 2V no VCT",
      "Triton 2V no cam phaser",
      "2V vs 3V reliability",
      "no phaser rattle 4.6",
      "why 2V is better",
    ],
    excerpt:
      "The single biggest reliability advantage of the 4.6L 2V over the 4.6L 3V and 5.4L 3V is the complete absence of cam phasers and Variable Cam Timing (VCT) hardware. The 3V engines are notorious for cam phaser rattle — a metallic ticking on cold start (and sometimes hot idle) caused by the hydraulic phaser losing its oil-pressure lock against the timing chain, allowing the cam to oscillate slightly within its commanded position. The 3V cam phaser job is one of the most expensive routine repairs on the 12th-gen F-150 — $2,000-$3,000 at an independent shop, requiring removal of the front timing cover and replacement of both phasers, the chains, tensioners, guides, and VCT solenoids. The 2V cannot suffer this failure because the cam is driven directly by a fixed sprocket. There are no VCT oil control solenoids to clog, no phaser hydraulic circuits to depressurize, and no P0011/P0012 cam-timing codes possible. This is why high-mileage 2V engines remain quiet while high-mileage 3Vs often develop the characteristic cold-start rattle. For a buyer evaluating a 2009 F-150 with the 4.6 2V, this is the most important thing to understand: you've inherited the simpler, quieter engine — and the cost-of-ownership reflects it.",
    sourceCitationKey: "triton-46-2v-no-cam-phaser-advantage",
  },

  // ── 20. Korean import availability ──────────────────────────────────
  {
    id: "triton-46-2v-korea-import-note",
    sourceType: "repair_note",
    sourceLabel: "Regional Note — 4.6L 2V Triton V8",
    title: "Korean import availability — rare but parts still flow from U.S. catalogs",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 2V Korea",
      "Triton 2V Korean import",
      "F-150 Korea parts",
      "modular V8 Korea",
      "Korean F-150 base engine",
    ],
    excerpt:
      "The 4.6L 2V is rare in Korea — the vast majority of F-150 imports to Korea are from the 2011+ era (3.5 EcoBoost, 5.0 Coyote) or the more recent 13th-gen (2015+) trucks. The 2009 model year coincided with the Korean won's collapse during the global financial crisis, making U.S. truck imports particularly expensive that year, and the 2V being the base engine meant low resale appeal further reduced its likelihood of being shipped overseas. If you do own a 4.6L 2V truck in Korea, the good news is that parts availability is strong: the engine shares its filter, spark plugs, oil specs, and most consumables with the much more common Crown Victoria and Town Car, which have decent parts presence at importers serving the Korean classic-American-car community. RockAuto ships directly to Korea (~$80-$150 shipping for an engine parts box). Motorcraft and Fel-Pro parts can be ordered through any U.S.-sourcing import broker. Mechanics in Korea who service American imports typically have experience with the modular V8 family because the Crown Vic has been a long-time grey-market favorite, so finding shop knowledge for the 2V is more achievable than for the rarer 6.2L Boss or 3.5 EcoBoost.",
    sourceCitationKey: "triton-46-2v-korea-import-note",
  },

  // ── 21. Tuning / aftermarket reality ────────────────────────────────
  {
    id: "triton-46-2v-tuning-aftermarket",
    sourceType: "repair_note",
    sourceLabel: "Aftermarket — 4.6L 2V Triton V8",
    title: "Limited tuning potential — minimal aftermarket interest in 2V trucks",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "4.6 2V tuning",
      "Triton 2V supercharger",
      "4.6 2V aftermarket",
      "modular V8 mods F-150",
      "can you boost 4.6 2V",
    ],
    excerpt:
      "The 4.6L 2V's aftermarket support in the F-150 community is minimal — there is no F-150-specific tuning ecosystem for this engine. The reasons are practical: only one year of production (2009), low sales volume as the base option, and modest power potential without major head and intake work. What does exist comes from the Mustang GT and Crown Vic communities, which spent years modifying the 2V: cold air intakes, throttle body bores, headers and high-flow exhausts, mild PCM tuning. These parts will physically fit a 2V in an F-150 with modifications to brackets and harnesses, but the gains are marginal — typically 15-25 hp on a naturally aspirated build, hardly justifying the cost. Forced induction (supercharger or turbo) is theoretically possible — the 2V has been boosted in Mustangs and Crown Vics with kits from Vortech, Procharger, and others — but no kit is sold specifically for the 2009 F-150 with the 2V. The labor to adapt a Mustang kit to the F-150 engine bay is significant, and the result is a truck with around 350-400 hp that still has a 4-speed transmission — a pairing that the trans can barely tolerate. Practical recommendation: enjoy the 2V as the reliable, simple engine it is. If you want more power, the right move is to swap to a 5.0 Coyote or buy a different truck — not to tune the 2V.",
    sourceCitationKey: "triton-46-2v-tuning-aftermarket",
  },

  // ── 22. Key DTCs reference ──────────────────────────────────────────
  {
    id: "triton-46-2v-dtc-reference",
    sourceType: "repair_note",
    sourceLabel: "DTC Reference — 4.6L 2V Triton V8",
    title: "Key diagnostic trouble codes — simpler list than the 3V engines",
    vehicleScope: TRITON_4_6_2V_VEHICLE_ID,
    systemTags: ["engine_mechanical", "ignition", "fuel_air_metering"],
    issueAreaIds: ["ignition_misfire_path", "intake_vacuum_air_leak"],
    partTags: ["spark_plug", "coil", "maf_sensor"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "4.6 2V DTCs",
      "Triton 2V check engine codes",
      "P0300 4.6 2V",
      "P0171 P0174 4.6",
      "P0016 4.6 2V",
      "F-150 2009 4.6 codes",
    ],
    excerpt:
      "Key DTCs commonly seen on the 4.6L 2V Triton (a notably shorter list than the 3V engines because the 2V has no VCT hardware): P0171 / P0174 — System lean bank 1 / bank 2 (intake gasket leak, dirty MAF, weak fuel pump). P0300 — Random/multiple misfire (worn spark plugs at 100K+, dirty MAF, low fuel pressure). P0301-P0308 — Cylinder-specific misfire (failing coil, fouled plug, injector issue on that cylinder). P0316 — Misfire detected on startup (cold-start rich condition, fouled plugs). P0193 — Fuel rail pressure sensor high (sensor failure). P0102 — Mass airflow sensor low input (dirty MAF — clean with MAF-specific cleaner). P0420 / P0430 — Catalyst efficiency below threshold (typically 150K+, catalyst aging). P0455 — Large EVAP system leak (gas cap, EVAP hose, charcoal canister). What you should NOT see on a 2V: P0011, P0012, P0014, P0015 — these are VCT (cam timing) codes that only apply to 3V engines. If a scan tool reports these on a 2V truck, the scanner is mis-identifying the engine or returning ghost codes; clear and rescan.",
    inspectionHint:
      "Always pull freeze-frame data alongside codes — engine load, RPM, fuel trims, and coolant temp at the time of the fault. Long-term fuel trim above +10% with P0171/P0174 strongly suggests intake gasket or vacuum leak; below -10% suggests over-fueling from a leaking injector.",
    sourceCitationKey: "triton-46-2v-dtc-reference",
  },
];
