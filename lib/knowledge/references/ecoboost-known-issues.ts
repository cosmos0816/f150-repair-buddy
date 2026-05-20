import { ECOBOOST_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const ECOBOOST_KNOWN_ISSUE_REFERENCES: TruckReferenceRecord[] = [
  // ── 1. Timing chain stretch ──────────────────────────────────────────
  {
    id: "known-issue-ecoboost-timing-chain-stretch",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "Timing chain stretch on 3.5L EcoBoost (4-chain system)",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["timing_chain_stretch_ecoboost", "cam_phaser_tick_context"],
    partTags: ["cam_phaser_area", "timing_cover", "vct_solenoid"],
    symptomTags: ["rattle", "rough_idle", "misfire"],
    aliases: [
      "ecoboost timing chain",
      "3.5 cold start rattle",
      "ecoboost chain stretch",
      "P0016",
      "P0017",
      "P0018",
      "P0019",
    ],
    excerpt:
      "The number-one failure mode for high-mileage first-gen 3.5 EcoBoost engines. The engine uses four timing chains — two primary and two secondary — that stretch over time, retarding cam timing and triggering correlation codes (P0016-P0019). Onset is typically between 80K and 150K miles, announced by a cold-start rattle that fades after oil pressure builds. Left unchecked, jumped timing can cause valve-to-piston contact and catastrophic engine damage. Full repair requires front cover removal and replacement of all four chains, tensioners, guides, and phasers.",
    inspectionHint:
      "Listen for a metallic rattle within the first 5 seconds of a cold start. Scan for P0016-P0019 cam-crank correlation codes. A timing chain kit should include all four chains, tensioners, and guides.",
    safetyNote:
      "A jumped timing chain can cause sudden loss of power while driving. Do not ignore cold-start rattle or cam correlation codes.",
    sourceCitationKey: "known-issue-ecoboost-timing-chain-stretch",
  },

  // ── 2. Turbo wastegate rattle ────────────────────────────────────────
  {
    id: "known-issue-ecoboost-wastegate-rattle",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "Turbo wastegate rattle at idle (BorgWarner K03)",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["turbo_boost", "exhaust_emissions"],
    issueAreaIds: ["turbo_bearing_failure"],
    partTags: ["wastegate", "turbocharger"],
    symptomTags: ["rattle", "ticking"],
    aliases: [
      "wastegate rattle",
      "turbo rattle idle",
      "K03 rattle",
      "ecoboost metallic rattle",
    ],
    excerpt:
      "A metallic rattle or buzz at idle coming from underneath the truck, often confused with timing chain noise. Caused by worn wastegate actuator bushings or flapper wear in the BorgWarner K03 turbochargers. Onset as early as 40K miles. The rattle is most noticeable at warm idle in park or neutral. Not immediately destructive, but worsening play can eventually affect boost control and trigger overboost or underboost codes.",
    inspectionHint:
      "With the engine at warm idle, place a stethoscope on each turbo housing. The rattle will localize to one or both turbos rather than the valve cover area. Confirm by briefly raising RPM — wastegate rattle typically disappears above 1,500 RPM.",
    sourceCitationKey: "known-issue-ecoboost-wastegate-rattle",
  },

  // ── 3. Intercooler condensation (CAC stumble) ────────────────────────
  {
    id: "known-issue-ecoboost-intercooler-condensation",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "Intercooler condensation causing violent misfire (CAC stumble)",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["turbo_boost", "intake_vacuum"],
    issueAreaIds: ["intercooler_condensation"],
    partTags: ["intercooler", "charge_pipe", "throttle_body"],
    symptomTags: ["stumble", "misfire", "rough_idle"],
    aliases: [
      "CAC stumble",
      "intercooler condensation",
      "ecoboost stumble cold morning",
      "water in intercooler",
      "charge air cooler condensation",
    ],
    excerpt:
      "Moisture condenses inside the air-to-air charge air cooler (intercooler) overnight, especially in humid climates. On the first hard acceleration of the morning, pooled water is ingested into the engine, causing a violent misfire and stumble that can feel like the engine will stall. Ford issued TSB 14-0130 and eventually redesigned the intercooler. Severity ranges from annoying to dangerous if it occurs during a highway merge. Aftermarket catch-can drain kits or a revised intercooler address the issue.",
    inspectionHint:
      "Remove the lower intercooler boot and check for standing water. The issue reproduces most reliably on cold, humid mornings after the truck has sat overnight. A short test drive with a hard pull from a stop will trigger it if water is present.",
    safetyNote:
      "The sudden power loss during a stumble event can be hazardous when merging into traffic or towing.",
    sourceCitationKey: "known-issue-ecoboost-intercooler-condensation",
  },

  // ── 4. Exhaust manifold cracks ───────────────────────────────────────
  {
    id: "known-issue-ecoboost-exhaust-manifold-crack",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "Exhaust manifold cracks from turbo heat cycling",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["exhaust_emissions", "turbo_boost"],
    issueAreaIds: ["exhaust_manifold_tick"],
    partTags: ["exhaust_manifold", "turbocharger"],
    symptomTags: ["ticking", "hiss"],
    aliases: [
      "ecoboost exhaust manifold crack",
      "exhaust tick cold start",
      "manifold leak ecoboost",
      "turbo manifold crack",
    ],
    excerpt:
      "Both the driver-side and passenger-side exhaust manifolds are prone to cracking due to extreme thermal cycling from the turbochargers mounted directly to them. Presents as a ticking or tapping noise on cold start that may quiet as the metal expands. Typically appears after 60K-100K miles. Cracked manifolds allow exhaust to leak before reaching the turbo, reducing boost efficiency and potentially causing a sulfur or exhaust smell in the cabin. Replacement requires turbo removal on the affected bank.",
    inspectionHint:
      "Listen for a rhythmic tick at cold start near the turbo housings. Visually inspect manifold runners for hairline cracks, especially around the turbo flange. A smoke test or propane enrichment test can confirm the leak location.",
    safetyNote:
      "Exhaust leaks upstream of the catalytic converter can introduce carbon monoxide into the cabin through the HVAC system.",
    sourceCitationKey: "known-issue-ecoboost-exhaust-manifold-crack",
  },

  // ── 5. Oil pan gasket leak ───────────────────────────────────────────
  {
    id: "known-issue-ecoboost-oil-pan-gasket",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "Oil pan gasket leak (rear seep, 4WD complicates repair)",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["leak", "oil_consumption"],
    aliases: [
      "ecoboost oil pan leak",
      "oil pan gasket seep",
      "rear oil pan leak",
      "oil drip on crossmember",
    ],
    excerpt:
      "The oil pan gasket on the 3.5 EcoBoost commonly begins seeping at the rear of the pan after 60K-80K miles. The leak often drips onto the crossmember and can be mistaken for a rear main seal leak. On 4WD trucks, the front differential must be dropped to access the oil pan, adding significant labor cost. The gasket is an RTV-sealed surface rather than a traditional cut gasket, so proper surface prep and torque sequence are critical for a lasting repair.",
    inspectionHint:
      "Clean the oil pan area and drive for a few days, then inspect with a flashlight from below. Focus on the rear corners of the pan where seepage begins. UV dye and a black light can pinpoint the source.",
    sourceCitationKey: "known-issue-ecoboost-oil-pan-gasket",
  },

  // ── 6. Internal water pump failure ───────────────────────────────────
  {
    id: "known-issue-ecoboost-water-pump-internal",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "Internal water pump failure — coolant enters oil silently",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["cooling", "engine_mechanical", "timing_valvetrain"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["water_pump_internal", "timing_cover"],
    symptomTags: ["coolant_smell", "leak", "white_smoke"],
    aliases: [
      "ecoboost water pump failure",
      "coolant in oil ecoboost",
      "internal water pump leak",
      "milky oil 3.5",
    ],
    excerpt:
      "The 3.5 EcoBoost uses an internal (engine-driven) water pump located behind the timing cover. When its weep hole seal fails, coolant leaks directly into the engine oil with no visible external drip. This can go undetected until the oil turns milky or the coolant reservoir slowly drops with no visible leak. Because the water pump shares the timing cover, its replacement is bundled with timing chain service — making it smart to replace both together. Continued driving with coolant-contaminated oil causes rapid bearing damage.",
    inspectionHint:
      "Check the oil cap and dipstick for milky residue. Monitor coolant level over a week with no visible external leak. An oil analysis showing elevated sodium or potassium confirms coolant intrusion.",
    safetyNote:
      "Coolant in the oil rapidly destroys engine bearings. Stop driving immediately if milky oil is found and tow to a shop.",
    sourceCitationKey: "known-issue-ecoboost-water-pump-internal",
  },

  // ── 7. Turbo oil feed/return line leaks ──────────────────────────────
  {
    id: "known-issue-ecoboost-turbo-oil-lines",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "Turbo oil feed and return line leaks from heat cycling",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["turbo_boost", "engine_mechanical"],
    issueAreaIds: ["turbo_bearing_failure"],
    partTags: ["turbo_oil_feed_line", "turbo_oil_return_line", "turbocharger"],
    symptomTags: ["leak", "blue_smoke", "oil_consumption"],
    aliases: [
      "turbo oil line leak",
      "oil feed line crack",
      "oil return line leak ecoboost",
      "turbo oil drip",
    ],
    excerpt:
      "The braided steel oil feed lines and rubber-gasketed return lines to both turbochargers degrade from constant heat cycling. Leaks typically develop at the banjo fittings or where the line meets the turbo housing, beginning as a slow seep and progressing to an active drip. Onset is common after 70K-100K miles. Oil dripping onto the hot exhaust manifold creates smoke and a burning oil smell. More critically, restricted oil flow from a clogged or coked feed line can starve turbo bearings.",
    inspectionHint:
      "Inspect both turbo oil feed and return line connections from below. Look for wet oil residue at banjo bolts and crush washer sealing surfaces. Replace crush washers whenever lines are disturbed.",
    sourceCitationKey: "known-issue-ecoboost-turbo-oil-lines",
  },

  // ── 8. PCV valve failure ─────────────────────────────────────────────
  {
    id: "known-issue-ecoboost-pcv-failure",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "PCV valve failure (integrated into valve cover)",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["intake_vacuum", "engine_mechanical"],
    issueAreaIds: ["intake_vacuum_air_leak"],
    partTags: ["pcv_valve", "intercooler", "oil_catch_can"],
    symptomTags: ["oil_consumption", "rough_idle", "hiss"],
    aliases: [
      "ecoboost PCV failure",
      "oil in intercooler",
      "PCV valve cover",
      "lean code PCV",
      "P0171 PCV",
      "P0174 PCV",
    ],
    excerpt:
      "The PCV valve on the 3.5 EcoBoost is integrated into the passenger-side valve cover and cannot be replaced independently on early models — the entire valve cover assembly must be replaced. When the PCV diaphragm fails, excessive crankcase pressure pushes oil vapor into the intake tract, coating the intercooler and throttle body with oil. This causes lean codes (P0171/P0174), rough idle, and accelerated carbon buildup on intake valves. An oil catch can is a popular preventive modification.",
    inspectionHint:
      "Remove the intercooler boots and check for oily residue inside the intercooler. A properly functioning PCV should hold light vacuum at idle — test with a manometer at the valve cover port.",
    sourceCitationKey: "known-issue-ecoboost-pcv-failure",
  },

  // ── 9. Valve carbon buildup (direct injection) ──────────────────────
  {
    id: "known-issue-ecoboost-carbon-buildup",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "Intake valve carbon buildup from direct injection",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["fuel_air_metering", "intake_vacuum", "engine_mechanical"],
    issueAreaIds: ["direct_injection_carbon_buildup"],
    partTags: ["direct_injector", "throttle_body", "oil_catch_can"],
    symptomTags: ["rough_idle", "misfire", "stumble", "oil_consumption"],
    aliases: [
      "carbon buildup ecoboost",
      "DI carbon",
      "intake valve carbon",
      "walnut blast ecoboost",
      "power loss ecoboost",
    ],
    excerpt:
      "Direct injection sprays fuel directly into the combustion chamber, bypassing the intake valves. Without fuel washing over them, intake valves accumulate carbon deposits from PCV blow-by and EGR gases. By 80K-120K miles, carbon buildup can restrict airflow enough to cause rough idle, misfires, and noticeable power loss. Walnut-blast media cleaning through the intake ports is the standard remediation. An oil catch can slows re-accumulation but does not eliminate it.",
    inspectionHint:
      "A borescope through the intake runner can show carbon deposits on the valve tulips. Compare idle quality and power output before and after a walnut blast service.",
    sourceCitationKey: "known-issue-ecoboost-carbon-buildup",
  },

  // ── 10. Boost leaks (couplers and clamps) ────────────────────────────
  {
    id: "known-issue-ecoboost-boost-leak",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "Boost leaks from degraded silicone couplers and clamps",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["turbo_boost", "intake_vacuum"],
    issueAreaIds: ["turbo_boost_leak"],
    partTags: ["charge_pipe", "intercooler", "turbocharger"],
    symptomTags: ["boost_loss", "hiss", "stumble"],
    aliases: [
      "boost leak ecoboost",
      "P0171 boost leak",
      "P0174 boost leak",
      "charge pipe leak",
      "intercooler boot leak",
      "hissing under boost",
    ],
    excerpt:
      "The charge air path from turbo to throttle body uses silicone couplers and spring clamps that degrade with heat and age. Leaks develop at coupler joints, intercooler connections, or the charge pipe itself — especially on the hot side. Symptoms include lean codes (P0171/P0174), hissing under boost, reduced power, and a general sluggish feeling. Onset can be as early as 50K miles. A boost leak test using shop air and a pressure gauge is the definitive diagnostic method.",
    inspectionHint:
      "Visually inspect all silicone couplers and clamps from turbo outlet to throttle body. Pressurize the charge air system to 15 PSI with a boost leak tester and listen or spray soapy water at joints.",
    sourceCitationKey: "known-issue-ecoboost-boost-leak",
  },

  // ── 11. Spark plug issues ────────────────────────────────────────────
  {
    id: "known-issue-ecoboost-spark-plugs",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "Spark plug tight gap and aluminum-head seize risk",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["ignition", "engine_mechanical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug", "coil"],
    symptomTags: ["misfire", "stumble", "rough_idle"],
    aliases: [
      "ecoboost spark plug gap",
      "spark plug seize ecoboost",
      "wrong gap boost misfire",
      "0.028 gap ecoboost",
      "0.032 gap ecoboost",
    ],
    excerpt:
      "The 3.5 EcoBoost requires a tight spark plug gap of 0.028-0.032 inches — much smaller than naturally aspirated engines — because boost pressure makes it harder for the spark to jump the gap. Installing plugs with a standard 0.044\" gap causes misfires under load. Additionally, spark plugs in the aluminum heads can seize if anti-seize is not used or if they are left in too long past the 60K-mile interval. Removing seized plugs risks stripping the threads and requiring a time-sert repair.",
    inspectionHint:
      "Verify plug gap with a wire gauge before installation — do not trust pre-gapped plugs from the box. Apply a thin coat of anti-seize to threads. Use a torque wrench to 9 ft-lbs on the 12mm plugs. Replace on schedule at 60K miles.",
    sourceCitationKey: "known-issue-ecoboost-spark-plugs",
  },

  // ── 12. Turbo bearing failure ────────────────────────────────────────
  {
    id: "known-issue-ecoboost-turbo-bearing-failure",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "Turbo bearing failure from oil starvation or coking",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["turbo_boost", "engine_mechanical"],
    issueAreaIds: ["turbo_bearing_failure"],
    partTags: ["turbocharger", "turbo_oil_feed_line", "turbo_oil_return_line"],
    symptomTags: ["turbo_whine", "blue_smoke", "boost_loss", "oil_consumption"],
    aliases: [
      "turbo bearing failure ecoboost",
      "turbo whine siren noise",
      "turbo oil starvation",
      "coked turbo oil line",
      "blue smoke acceleration",
    ],
    excerpt:
      "The BorgWarner K03 journal-bearing turbochargers depend on a continuous supply of clean oil. Carbon buildup (coking) in the oil feed lines — caused by heat soak after hot shutdowns — restricts oil flow and starves the turbo bearings. Symptoms progress from a high-pitched whine or siren noise under boost to shaft play, blue smoke on acceleration, and eventual boost loss. Onset is accelerated by extended oil change intervals or frequent short trips. Turbo replacement plus new oil feed and return lines is the standard repair.",
    inspectionHint:
      "Check for shaft play by removing the intake duct and wiggling the compressor wheel. Any perceptible radial play indicates bearing wear. Inspect the turbo inlet for oil residue — oil coating indicates seal failure.",
    safetyNote:
      "A failing turbo can shed compressor wheel fragments into the engine. Replace at the first sign of shaft play.",
    sourceCitationKey: "known-issue-ecoboost-turbo-bearing-failure",
  },

  // ── 13. Coolant intrusion (multiple sources) ─────────────────────────
  {
    id: "known-issue-ecoboost-coolant-intrusion",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "Coolant intrusion — water pump, EGR cooler, or cylinder liner",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["cooling", "engine_mechanical", "exhaust_emissions"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["water_pump_internal"],
    symptomTags: ["coolant_smell", "white_smoke", "oil_consumption"],
    aliases: [
      "coolant intrusion ecoboost",
      "coolant loss no visible leak",
      "white smoke ecoboost",
      "EGR cooler leak",
      "cylinder liner coolant",
    ],
    excerpt:
      "Unexplained coolant loss without a visible external leak on the 3.5 EcoBoost can stem from three sources: the internal water pump (most common), the EGR cooler, or (rarely) cylinder liner porosity. Each source produces different secondary symptoms — the water pump puts coolant into oil, the EGR cooler can push coolant into the exhaust or intake, and liner porosity pressurizes the cooling system. A cooling system pressure test, combustion gas test, and oil analysis together can isolate the source.",
    inspectionHint:
      "Perform a cooling system pressure test and watch for pressure drop without visible leaks. A block test (combustion gas detector) checks for exhaust gases in the coolant. Send an oil sample for analysis — elevated sodium and potassium indicate coolant contamination.",
    safetyNote:
      "Any source of coolant intrusion can lead to rapid engine damage. Diagnose promptly and do not continue driving with coolant-contaminated oil or rising coolant temperatures.",
    sourceCitationKey: "known-issue-ecoboost-coolant-intrusion",
  },

  // ── 14. High-pressure fuel pump issues ───────────────────────────────
  {
    id: "known-issue-ecoboost-hpfp",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "High-pressure fuel pump issues (DI-specific, P0087/P0088)",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["fuel_air_metering", "engine_mechanical"],
    issueAreaIds: [],
    partTags: ["high_pressure_fuel_pump", "direct_injector"],
    symptomTags: ["stumble", "misfire", "rough_idle"],
    aliases: [
      "HPFP failure ecoboost",
      "P0087 ecoboost",
      "P0088 ecoboost",
      "fuel pressure low ecoboost",
      "stumble under load fuel pump",
      "high pressure fuel pump",
    ],
    excerpt:
      "The cam-driven high-pressure fuel pump (HPFP) must maintain 2,000+ PSI for the direct injection system. When the pump's internal piston or check valves wear, fuel pressure drops under high demand — typically during hard acceleration or towing — triggering P0087 (fuel rail pressure too low) or P0088 (too high). Symptoms include stumbling or hesitation under load, long cranking, and misfires at high RPM. Onset varies but is more common after 100K miles. Contaminated fuel or water in the tank accelerates pump wear.",
    inspectionHint:
      "Monitor fuel rail pressure with a scan tool during a loaded acceleration test. Pressure should hold above 2,000 PSI under boost. A significant pressure drop under load points to the HPFP. Check the low-pressure side first to rule out a weak in-tank pump.",
    sourceCitationKey: "known-issue-ecoboost-hpfp",
  },

  // ── 15. Throttle body carbon buildup ─────────────────────────────────
  {
    id: "known-issue-ecoboost-throttle-body-carbon",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 3.5 EcoBoost",
    title: "Throttle body carbon buildup from PCV blow-by",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["intake_vacuum", "fuel_air_metering"],
    issueAreaIds: ["intake_vacuum_air_leak"],
    partTags: ["throttle_body", "pcv_valve", "oil_catch_can"],
    symptomTags: ["rough_idle", "stumble"],
    aliases: [
      "throttle body carbon ecoboost",
      "surging idle ecoboost",
      "dirty throttle body",
      "throttle body cleaning",
      "idle surge ecoboost",
    ],
    excerpt:
      "Oil vapor from the PCV system coats the throttle body bore and blade with a sticky carbon residue over time. This buildup disrupts the idle air bypass, causing a surging or hunting idle, hesitation on tip-in, and inconsistent throttle response. The issue is noticeable as early as 30K miles and worsens progressively. Cleaning the throttle body with an approved cleaner every 30K-50K miles is recommended preventive maintenance. An oil catch can significantly reduces the rate of accumulation.",
    inspectionHint:
      "Remove the intake duct at the throttle body and visually inspect the bore and blade edges for black, oily carbon deposits. Clean with throttle body cleaner and a soft cloth — do not scrape. Reset the idle adaptation with a scan tool after cleaning.",
    sourceCitationKey: "known-issue-ecoboost-throttle-body-carbon",
  },
];
