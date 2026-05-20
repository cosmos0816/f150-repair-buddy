import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const ECOBOOST_REPAIR_COST_REFERENCES: TruckReferenceRecord[] = [
  {
    id: "repair-cost-ecoboost-timing-chain-kit",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost Summary",
    title: "Timing chain full kit cost range",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["timing_valvetrain", "engine_mechanical", "cooling"],
    issueAreaIds: ["timing_chain_stretch_ecoboost"],
    partTags: ["cam_phaser_area", "timing_cover", "water_pump_internal"],
    symptomTags: ["rattle", "misfire"],
    aliases: [
      "timing chain cost",
      "chain replacement price",
      "phaser replacement cost",
      "timing job cost",
    ],
    excerpt:
      "Timing chain full kit (chains, tensioners, guides, cam phasers, internal water pump): " +
      "Dealer: $3,000–$5,000. Independent shop: $2,000–$3,500. DIY parts only: $400–$800. " +
      "Labor: 12–16 hours. Includes front cover removal and reseal. Always replace the " +
      "internal water pump during this job — it adds only $100–$200 in parts but would " +
      "require repeating the entire teardown if done later. Use Motorcraft or Cloyes kit.",
    sourceCitationKey: "repair-cost-ecoboost-timing-chain-kit",
  },
  {
    id: "repair-cost-ecoboost-single-turbo",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost Summary",
    title: "Single turbo replacement cost range",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["turbo_boost"],
    issueAreaIds: ["turbo_bearing_failure"],
    partTags: ["turbocharger"],
    symptomTags: ["turbo_whine", "boost_loss", "oil_consumption"],
    aliases: [
      "turbo replacement cost",
      "single turbo price",
      "reman turbo cost",
      "BorgWarner turbo",
    ],
    excerpt:
      "Single turbo replacement (remanufactured BorgWarner): Dealer: $2,000–$3,000. " +
      "Independent shop: $1,200–$2,000. DIY parts only: $400–$800 (reman unit). " +
      "Labor: 4–6 hours per side. Passenger side is more difficult due to firewall " +
      "clearance. Always replace oil feed and return lines with new gaskets when " +
      "replacing a turbo. Pre-prime the turbo with oil before first start.",
    sourceCitationKey: "repair-cost-ecoboost-single-turbo",
  },
  {
    id: "repair-cost-ecoboost-both-turbos",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost Summary",
    title: "Both turbos replacement cost range",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["turbo_boost"],
    issueAreaIds: ["turbo_bearing_failure"],
    partTags: ["turbocharger", "turbo_oil_feed_line", "turbo_oil_return_line"],
    symptomTags: ["turbo_whine", "boost_loss", "oil_consumption", "white_smoke"],
    aliases: [
      "both turbos cost",
      "dual turbo replacement",
      "twin turbo price",
      "pair of turbos",
    ],
    excerpt:
      "Both turbos replacement (remanufactured BorgWarner pair): Dealer: $3,500–$5,500. " +
      "Independent shop: $2,500–$4,000. DIY parts only: $800–$1,600. " +
      "Labor: 8–12 hours total. If one turbo has failed, strongly consider replacing " +
      "both — the second is likely near end of life. Replace all oil feed/return lines " +
      "and gaskets. Flush oil cooler and oil lines before installing new units.",
    sourceCitationKey: "repair-cost-ecoboost-both-turbos",
  },
  {
    id: "repair-cost-ecoboost-internal-water-pump",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost Summary",
    title: "Internal water pump cost range",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["cooling", "engine_mechanical"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["water_pump_internal", "timing_cover"],
    symptomTags: ["leak", "white_smoke"],
    aliases: [
      "water pump cost",
      "internal pump replacement",
      "coolant loss repair cost",
    ],
    excerpt:
      "Internal water pump replacement: Same labor as timing chain job — front timing " +
      "cover must be removed. Pump part cost: $100–$200 (BR3Z-8501-B). Total job cost " +
      "if done standalone: Dealer: $2,500–$4,000. Independent shop: $1,800–$3,000. " +
      "If combined with timing chain replacement, adds only $100–$200 to parts cost " +
      "with zero additional labor. ALWAYS bundle with timing chain service.",
    sourceCitationKey: "repair-cost-ecoboost-internal-water-pump",
  },
  {
    id: "repair-cost-ecoboost-intercooler-upgrade",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost Summary",
    title: "Intercooler upgrade cost range",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["turbo_boost"],
    issueAreaIds: ["intercooler_condensation"],
    partTags: ["intercooler"],
    symptomTags: ["stumble", "misfire"],
    aliases: [
      "intercooler cost",
      "CAC upgrade price",
      "CVF intercooler",
      "Mishimoto intercooler",
      "charge air cooler cost",
    ],
    excerpt:
      "Intercooler upgrade (CVF or Mishimoto aftermarket): Shop installed: $500–$800. " +
      "DIY parts only: $200–$500. Labor: 1–2 hours. Stock Ford revised intercooler " +
      "(FL3Z-6K775-A): $250–$400 parts. Aftermarket units eliminate the condensation " +
      "issue more effectively than the revised Ford part due to larger core volume and " +
      "improved drainage. Straightforward bolt-on — one of the easiest EcoBoost upgrades.",
    sourceCitationKey: "repair-cost-ecoboost-intercooler-upgrade",
  },
  {
    id: "repair-cost-ecoboost-exhaust-manifold",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost Summary",
    title: "Exhaust manifold (one side) cost range",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["exhaust_emissions", "engine_mechanical"],
    issueAreaIds: ["exhaust_manifold_tick"],
    partTags: ["exhaust_manifold"],
    symptomTags: ["ticking", "leak"],
    aliases: [
      "exhaust manifold cost",
      "manifold crack repair",
      "exhaust stud extraction",
      "manifold leak fix",
    ],
    excerpt:
      "Exhaust manifold replacement (one side): Independent shop: $800–$1,400. " +
      "DIY parts only: $200–$400. Labor: 4–8 hours. WARNING: exhaust manifold studs " +
      "frequently break during removal, especially on high-mileage trucks. Budget extra " +
      "time and cost for stud extraction or helicoil repair — can add $200–$500. " +
      "Driver side is easier to access; passenger side is tight against the firewall.",
    sourceCitationKey: "repair-cost-ecoboost-exhaust-manifold",
  },
  {
    id: "repair-cost-ecoboost-oil-pan-gasket",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost Summary",
    title: "Oil pan gasket (4WD) cost range",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["leak", "oil_consumption"],
    aliases: [
      "oil pan gasket cost",
      "oil pan reseal price",
      "4WD oil pan",
      "diff drop oil pan",
    ],
    excerpt:
      "Oil pan gasket replacement (4WD): Independent shop: $500–$900. DIY parts only: " +
      "$30–$80 (gasket/sealant). Labor: 4–6 hours. On 4WD models the front differential " +
      "must be dropped for oil pan clearance, adding significant labor. Motorcraft TA-26 " +
      "sealant required. 2WD models are simpler — shop cost $300–$600. Torque oil pan " +
      "bolts to 10 Nm (89 lb-in) in proper sequence.",
    sourceCitationKey: "repair-cost-ecoboost-oil-pan-gasket",
  },
  {
    id: "repair-cost-ecoboost-carbon-cleaning",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost Summary",
    title: "Valve carbon cleaning (walnut blast) cost range",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["fuel_air_metering", "engine_mechanical"],
    issueAreaIds: ["direct_injection_carbon_buildup"],
    partTags: [],
    symptomTags: ["rough_idle", "misfire", "stumble"],
    aliases: [
      "walnut blasting cost",
      "carbon cleaning price",
      "intake valve cleaning",
      "DI carbon buildup",
      "valve cleaning",
    ],
    excerpt:
      "Valve carbon cleaning (walnut blast): Independent shop: $400–$800. " +
      "Labor: 3–5 hours. Intake manifold must be removed to access intake ports. " +
      "Walnut shell media is blasted into intake ports with valves closed to remove " +
      "carbon deposits caused by direct injection (no fuel wash on intake valves). " +
      "Recommended every 60,000–80,000 miles on direct-injection EcoBoost engines. " +
      "An oil catch can ($100–$200 installed) significantly slows carbon buildup.",
    sourceCitationKey: "repair-cost-ecoboost-carbon-cleaning",
  },
  {
    id: "repair-cost-ecoboost-spark-plugs",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost Summary",
    title: "Spark plugs set of 6 cost range",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["ignition"],
    issueAreaIds: [],
    partTags: ["spark_plug"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "spark plug cost",
      "plug replacement price",
      "SP-534",
      "Motorcraft plugs",
      "tune up cost",
    ],
    excerpt:
      "Spark plugs (set of 6): Independent shop: $150–$250. DIY parts only: $40–$70. " +
      "Labor: 1–2 hours. CRITICAL: Use Motorcraft SP-534 ONLY — incorrect spark plugs " +
      "can cause misfires, pre-ignition, and engine damage in the EcoBoost. OEM change " +
      "interval is 60,000 miles but many owners replace at 40,000–50,000 miles. " +
      "Apply anti-seize sparingly on threads. Torque to 11 Nm (96 lb-in). Gap is " +
      "pre-set — do not re-gap.",
    sourceCitationKey: "repair-cost-ecoboost-spark-plugs",
  },
  {
    id: "repair-cost-ecoboost-turbo-oil-lines",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost Summary",
    title: "Turbo oil feed/return lines cost range",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["turbo_boost", "engine_mechanical"],
    issueAreaIds: ["turbo_bearing_failure"],
    partTags: ["turbo_oil_feed_line", "turbo_oil_return_line"],
    symptomTags: ["leak", "oil_consumption", "white_smoke"],
    aliases: [
      "turbo oil line cost",
      "oil feed line price",
      "oil return line price",
      "turbo line replacement",
    ],
    excerpt:
      "Turbo oil feed and return lines (per side): Independent shop: $250–$500. " +
      "DIY parts only: $50–$150. Labor: 2–3 hours per side. Always replace crush " +
      "washers (W500223-S442) and return line gaskets (BL3Z-9T516-A) — never reuse. " +
      "If replacing lines due to leaks, inspect turbo shaft play to rule out bearing " +
      "seal failure before reassembly. Lines should be replaced any time a turbo is " +
      "removed or replaced.",
    sourceCitationKey: "repair-cost-ecoboost-turbo-oil-lines",
  },
  {
    id: "repair-cost-ecoboost-pcv-valve",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost Summary",
    title: "PCV valve/cover cost range",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["engine_mechanical", "fuel_air_metering"],
    issueAreaIds: ["direct_injection_carbon_buildup"],
    partTags: ["pcv_valve"],
    symptomTags: ["oil_consumption", "rough_idle", "leak"],
    aliases: [
      "PCV valve cost",
      "valve cover PCV",
      "PCV replacement price",
      "crankcase ventilation",
    ],
    excerpt:
      "PCV valve/cover replacement: Independent shop: $200–$400. DIY parts only: " +
      "$50–$150. Labor: 1–2 hours. On 2011–2012 models, the PCV valve is integrated " +
      "into the valve cover — if the PCV fails, the entire valve cover must be replaced " +
      "($150–$300 per cover). 2013+ models have a serviceable PCV valve ($20–$40). " +
      "A stuck-open PCV increases oil consumption and accelerates carbon buildup on " +
      "intake valves. Consider adding an oil catch can when replacing PCV components.",
    sourceCitationKey: "repair-cost-ecoboost-pcv-valve",
  },
  {
    id: "repair-cost-ecoboost-boost-leak-repair",
    sourceType: "repair_note",
    sourceLabel: "Repair Cost Summary",
    title: "Boost leak repair (couplers + clamps) cost range",
    vehicleScope: "2011-2014-ford-f150-3.5-ecoboost",
    systemTags: ["turbo_boost"],
    issueAreaIds: ["turbo_boost_leak"],
    partTags: ["charge_pipe", "intercooler"],
    symptomTags: ["boost_loss", "stumble"],
    aliases: [
      "boost leak fix cost",
      "coupler replacement price",
      "T-bolt clamp upgrade",
      "charge pipe repair",
      "silicone coupler cost",
    ],
    excerpt:
      "Boost leak repair (silicone couplers + T-bolt clamps): Independent shop: " +
      "$100–$300. DIY parts only: $50–$150. Labor: 1–2 hours. Includes replacing " +
      "factory spring clamps with T-bolt clamps (Vibrant 2792/2793) and installing " +
      "new silicone couplers at all charge pipe joints. Smoke test before and after " +
      "to verify all leaks are sealed. If hard charge pipes are cracked, replacement " +
      "pipes add $100–$250 per pipe. One of the most cost-effective power restoration " +
      "repairs on the EcoBoost.",
    sourceCitationKey: "repair-cost-ecoboost-boost-leak-repair",
  },
];
