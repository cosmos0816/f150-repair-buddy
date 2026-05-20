import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const ECOBOOST_TSB_REFERENCES: TruckReferenceRecord[] = [
  {
    id: "ford-tsb-ecoboost-14-0194",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 14-0194",
    title: "Engine rattle/knock on cold start — timing chain stretch diagnosis",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["timing_chain_stretch_ecoboost"],
    partTags: ["cam_phaser_area", "timing_cover"],
    symptomTags: ["rattle", "misfire"],
    aliases: [
      "timing chain rattle",
      "cold start knock",
      "cam timing deviation",
      "chain stretch",
      "phaser rattle",
    ],
    excerpt:
      "TSB 14-0194: Diagnose cold-start engine rattle or knock on 3.5L EcoBoost. " +
      "Check cam timing deviation via IDS — if deviation exceeds ±4° from nominal, " +
      "timing chain stretch is confirmed. Replace timing chain kit including chains, " +
      "tensioners, guides, and cam phasers. Parts: chain kit L1MZ-6268-A, phasers " +
      "BL3Z-6C524-A (intake) / BL3Z-6C525-A (exhaust). Reset adaptive tables after repair.",
    inspectionHint:
      "Listen for rattle within first 5 seconds of cold start. Use IDS to read cam timing " +
      "deviation on Bank 1 and Bank 2. A deviation beyond ±4° indicates stretched chains. " +
      "Do NOT confuse with wastegate rattle — see TSB 13-0065.",
    sourceCitationKey: "ford-tsb-ecoboost-14-0194",
  },
  {
    id: "ford-tsb-ecoboost-17-0025",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 17-0025",
    title: "Updated timing chain repair procedure — revised parts",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["timing_chain_stretch_ecoboost"],
    partTags: ["cam_phaser_area", "timing_cover", "water_pump_internal"],
    symptomTags: ["rattle", "misfire"],
    aliases: [
      "revised timing chain kit",
      "updated chain repair",
      "superseded timing procedure",
    ],
    excerpt:
      "TSB 17-0025: Supersedes earlier timing chain TSBs. Updated repair procedure now " +
      "requires replacement of internal water pump (BR3Z-8501-B) during timing chain " +
      "service since the front cover must already be removed. Revised chain kit now " +
      "includes updated tensioner design (HL3Z-6L266-A) to reduce future stretch. " +
      "Total labor time approximately 12-16 hours. Apply Motorcraft TA-30 sealant on " +
      "timing cover per revised torque sequence.",
    inspectionHint:
      "If performing timing chain replacement per TSB 14-0194, refer to this superseding " +
      "TSB for the latest parts and procedure. Always replace the internal water pump " +
      "while the front cover is off.",
    sourceCitationKey: "ford-tsb-ecoboost-17-0025",
  },
  {
    id: "ford-tsb-ecoboost-14-0130",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 14-0130",
    title: "Misfire/stumble on cold acceleration — charge air cooler condensation",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["turbo_boost", "fuel_air_metering"],
    issueAreaIds: ["intercooler_condensation"],
    partTags: ["intercooler"],
    symptomTags: ["stumble", "misfire"],
    aliases: [
      "CAC condensation",
      "intercooler condensation",
      "cold stumble",
      "WOT misfire cold",
      "intercooler upgrade TSB",
    ],
    excerpt:
      "TSB 14-0130: Addresses misfire or stumble during initial acceleration from stop " +
      "in cool/humid weather. Moisture condenses inside the stock charge air cooler (CAC) " +
      "and is ingested on first throttle application. Ford's fix: replace stock intercooler " +
      "with revised part FL3Z-6K775-A, which features improved internal drainage. " +
      "Alternatively, aftermarket intercoolers (CVF, Mishimoto) eliminate the issue " +
      "entirely with improved core design.",
    inspectionHint:
      "Reproduce by driving in cool morning temps (40-60°F) — let vehicle idle for 2+ " +
      "minutes at a stoplight, then apply moderate to heavy throttle. A stumble or " +
      "momentary misfire confirms condensation ingestion. Check for stored P0300-P0306 codes.",
    sourceCitationKey: "ford-tsb-ecoboost-14-0130",
  },
  {
    id: "ford-tsb-ecoboost-14-0047",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 14-0047",
    title: "Misfire on cold start in humid conditions",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["ignition", "fuel_air_metering"],
    issueAreaIds: ["intercooler_condensation"],
    partTags: ["spark_plug", "intercooler"],
    symptomTags: ["misfire", "rough_idle", "stumble"],
    aliases: [
      "cold start misfire",
      "humid misfire",
      "morning misfire",
      "damp start",
    ],
    excerpt:
      "TSB 14-0047: Cold-start misfire in high-humidity conditions on 3.5L EcoBoost. " +
      "Water accumulation in the intake tract can foul spark plugs on initial startup. " +
      "Verify spark plugs are Motorcraft SP-534 (correct heat range). Inspect for " +
      "cracked or worn coil boots. If CAC condensation is also present, reference " +
      "TSB 14-0130 for intercooler replacement. PCM recalibration may be required " +
      "to update cold-start fueling strategy.",
    inspectionHint:
      "Check for P0301-P0306 codes stored during cold starts on humid mornings. " +
      "Inspect spark plugs for moisture tracking or fouling. Verify coil boot condition " +
      "and correct plug part number (SP-534).",
    sourceCitationKey: "ford-tsb-ecoboost-14-0047",
  },
  {
    id: "ford-tsb-ecoboost-13-0065",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 13-0065",
    title: "Turbo wastegate rattle at idle — differentiation from timing chain noise",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["turbo_boost"],
    issueAreaIds: ["turbo_bearing_failure"],
    partTags: ["wastegate", "turbocharger"],
    symptomTags: ["rattle", "ticking"],
    aliases: [
      "wastegate rattle",
      "turbo rattle idle",
      "wastegate clatter",
      "turbo tick",
      "hot idle rattle",
    ],
    excerpt:
      "TSB 13-0065: Rattle or buzz at idle originating from turbocharger wastegate " +
      "actuator arm. Commonly mistaken for timing chain noise. Wastegate rattle occurs " +
      "at operating temperature and at idle only, while timing chain rattle is worst on " +
      "cold start. Diagnosis: use stethoscope on turbo housing vs. timing cover. " +
      "Fix: replace wastegate actuator or turbocharger assembly if wear is excessive. " +
      "Some noise is considered normal characteristic on early models.",
    inspectionHint:
      "Distinguish from timing chain: wastegate rattle is present at HOT idle and " +
      "disappears under load/higher RPM. Timing chain rattle is loudest on COLD start " +
      "and fades as oil pressure builds. Use a mechanics stethoscope on each turbo " +
      "housing to confirm source.",
    sourceCitationKey: "ford-tsb-ecoboost-13-0065",
  },
  {
    id: "ford-tsb-ecoboost-14-0159",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 14-0159",
    title: "Turbo underboost — boost leak diagnosis and updated clamp torque",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["turbo_boost"],
    issueAreaIds: ["turbo_boost_leak"],
    partTags: ["charge_pipe", "intercooler", "turbocharger"],
    symptomTags: ["boost_loss", "stumble"],
    aliases: [
      "boost leak",
      "underboost",
      "P0299",
      "charge pipe blow off",
      "coupler leak",
      "low boost",
    ],
    excerpt:
      "TSB 14-0159: Addresses P0299 (turbo underboost) and reduced power complaints. " +
      "Primary cause: loose or deteriorated charge air couplers and clamps between turbo " +
      "outlet, intercooler, and throttle body. Updated procedure specifies revised clamp " +
      "torque of 4.5 Nm (40 lb-in) on all silicone couplers. Inspect for cracked " +
      "hard-pipe sections and loose factory spring clamps. Replace spring clamps with " +
      "T-bolt clamps (Vibrant 2792/2793) for a permanent fix. Smoke test the entire " +
      "charge air system to identify leaks.",
    inspectionHint:
      "Perform a boost leak/smoke test: pressurize the intake tract to 20 PSI with " +
      "turbo inlet and throttle body blocked. Listen and feel for leaks at every coupler " +
      "joint. Check hard pipes for hairline cracks, especially at the passenger-side " +
      "charge pipe near the firewall.",
    sourceCitationKey: "ford-tsb-ecoboost-14-0159",
  },
  {
    id: "ford-tsb-ecoboost-13-0234",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 13-0234",
    title: "Oil pan leak at rear main seal area — updated sealant procedure",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["leak", "oil_consumption"],
    aliases: [
      "oil pan leak",
      "rear main seal leak",
      "oil pan gasket",
      "RTV oil pan",
      "oil drip rear",
    ],
    excerpt:
      "TSB 13-0234: Oil leak observed at the rear of the oil pan or rear main seal area. " +
      "Clean and inspect to determine if leak is from the oil pan gasket or the rear main " +
      "seal. If oil pan gasket: remove oil pan (on 4WD trucks, front differential must be " +
      "dropped for clearance), clean mating surfaces, and reseal using Motorcraft TA-26 " +
      "silicone gasket sealant per updated bead pattern. Torque oil pan bolts to 10 Nm " +
      "(89 lb-in) in sequence. If rear main seal: replace seal using crankshaft rear seal " +
      "installer 303-1112.",
    inspectionHint:
      "Clean the area with brake cleaner and add UV dye to the oil. Run the engine for " +
      "30 minutes and re-inspect with UV light to pinpoint the source. On 4WD models, " +
      "budget extra labor time for front diff removal.",
    sourceCitationKey: "ford-tsb-ecoboost-13-0234",
  },
  {
    id: "ford-tsb-ecoboost-14-0006",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 14-0006",
    title: "Oil leak from turbo oil supply and return lines",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["turbo_boost", "engine_mechanical"],
    issueAreaIds: ["turbo_bearing_failure"],
    partTags: ["turbo_oil_feed_line", "turbo_oil_return_line"],
    symptomTags: ["leak", "oil_consumption", "white_smoke"],
    aliases: [
      "turbo oil leak",
      "oil feed line leak",
      "oil return line leak",
      "turbo line seep",
      "oil on exhaust manifold",
    ],
    excerpt:
      "TSB 14-0006: Oil leak from turbocharger oil supply or return lines. Inspect " +
      "banjo bolt fittings on oil feed lines and gasket surfaces on oil return lines. " +
      "Replace crush washers on banjo bolts (W500223-S442) at every removal. " +
      "Oil return line gaskets: BL3Z-9T516-A. Torque banjo bolts to 15 Nm (11 lb-ft). " +
      "If oil is dripping onto exhaust manifold, white smoke or burning oil smell will " +
      "be present. Verify turbo bearings are not the source — check for shaft play " +
      "before replacing lines only.",
    inspectionHint:
      "With engine cold, visually inspect turbo oil lines on both banks. Look for " +
      "wet/oily residue at banjo fittings and return line flanges. If oil is present on " +
      "the exhaust manifold, determine if it is running down from the feed line above. " +
      "Check turbo shaft play (radial and axial) to rule out bearing seal failure.",
    sourceCitationKey: "ford-tsb-ecoboost-14-0006",
  },
  {
    id: "ford-tsb-ecoboost-14-0173",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 14-0173",
    title: "Coolant loss with no visible leak — internal water pump diagnosis",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["cooling", "engine_mechanical"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["water_pump_internal"],
    symptomTags: ["leak", "white_smoke"],
    aliases: [
      "disappearing coolant",
      "internal water pump leak",
      "coolant in oil",
      "mystery coolant loss",
      "water pump weep",
    ],
    excerpt:
      "TSB 14-0173: Customer reports gradual coolant loss with no visible external leak. " +
      "The 3.5L EcoBoost uses an internal (timing-cover-mounted) water pump. A failed " +
      "weep hole seal allows coolant to enter the engine oil or drip internally into the " +
      "timing cover area. Diagnosis: check oil for milky appearance or coolant odor; " +
      "perform coolant system pressure test and hold for 30 minutes. If pressure drops " +
      "with no external leak visible, internal water pump is the likely cause. " +
      "Repair requires front timing cover removal — replace water pump (BR3Z-8501-B) " +
      "and reseal cover. Strongly recommended to replace timing chains simultaneously.",
    inspectionHint:
      "Pressure test cooling system to 16 PSI and monitor for 30 minutes. If pressure " +
      "drops with no visible external leak, suspect internal water pump. Pull dipstick " +
      "and check for milky oil or coolant smell. Also check for white exhaust smoke " +
      "which may indicate coolant entering combustion chambers.",
    sourceCitationKey: "ford-tsb-ecoboost-14-0173",
  },
  {
    id: "ford-tsb-ecoboost-12-0004",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 12-0004",
    title: "Rough idle after cold start — throttle body cleaning and PCM recalibration",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["fuel_air_metering", "ignition"],
    issueAreaIds: ["direct_injection_carbon_buildup"],
    partTags: ["pcv_valve"],
    symptomTags: ["rough_idle", "stumble"],
    aliases: [
      "rough idle cold",
      "throttle body dirty",
      "idle surge",
      "PCM recalibration",
      "idle relearn",
      "carbon buildup idle",
    ],
    excerpt:
      "TSB 12-0004: Rough or unstable idle after cold start on 3.5L EcoBoost. " +
      "Carbon and oil deposits accumulate on the throttle body bore and plate due to " +
      "PCV system blow-by (direct injection engines lack fuel wash on intake valves). " +
      "Clean throttle body with Motorcraft PM-3 cleaner. After cleaning, a throttle body " +
      "relearn and PCM recalibration (IDS required) must be performed to reset idle air " +
      "control parameters. If issue persists, inspect PCV valve/cover for stuck-open " +
      "condition increasing blow-by. On 2011-2012 models, PCV is integrated into the " +
      "valve cover — replace entire cover if PCV has failed.",
    inspectionHint:
      "Remove intake tube at throttle body and inspect for oily carbon deposits on the " +
      "butterfly valve and bore. If heavily coated, clean with Motorcraft PM-3. After " +
      "cleaning, idle relearn is mandatory — drive cycle: start engine, idle for 3 " +
      "minutes, drive at varying speeds for 10 minutes, return to idle for 2 minutes.",
    sourceCitationKey: "ford-tsb-ecoboost-12-0004",
  },
];
