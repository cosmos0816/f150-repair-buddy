import type {
  TruckIssueAreaId,
  TruckPartId,
  TruckSymptomId,
  TruckSystemId,
} from "@/lib/knowledge/types";
import type { Recommendation } from "@/lib/types/result";

export type TruckForumSource = "f150forum" | "f150online" | "fordtrucks";

export interface TruckForumKnowledgeEntry {
  id: string;
  source: TruckForumSource;
  title: string;
  url: string;
  topic: string;
  summary: string;
  consensusFix: string;
  ownerTips: string[];
  aliases: string[];
  recommendedParts: string[];
  issueAreaIds: TruckIssueAreaId[];
  partIds: TruckPartId[];
  symptomIds: TruckSymptomId[];
  systemIds: TruckSystemId[];
  recommendation: Recommendation;
}

export const FORUM_KNOWLEDGE_ENTRIES = [
  {
    "id": "forum-f150forum-fuel-pump-driver-module",
    "source": "f150forum",
    "title": "fuel pump driver module",
    "url": "https://www.f150forum.com/f4/fuel-pump-driver-module-200179/",
    "topic": "fuel_air_metering",
    "summary": "Owner thread focused on repeated fuel pump driver module failure and whether Dorman or Ford replacement is the better choice.",
    "consensusFix": "Replace the module before it strands the truck, prefer the updated stand-off style module or a Ford/OEM unit, and protect the mount area from future corrosion.",
    "ownerTips": [
      "Inspect the frame-mounted module before no-start symptoms get worse.",
      "Use stand-offs or isolators so the module is not trapped against the corroding bracket.",
      "Coat the area after replacement to slow repeat corrosion."
    ],
    "aliases": [
      "fuel_air_metering",
      "Fuel pump driver module",
      "Stand-off mounting hardware",
      "Rustproofing or undercoating spray",
      "Inspect the frame-mounted module before no-start symptoms get worse.",
      "Use stand-offs or isolators so the module is not trapped against the corroding bracket.",
      "Coat the area after replacement to slow repeat corrosion."
    ],
    "recommendedParts": [
      "Fuel pump driver module",
      "Stand-off mounting hardware",
      "Rustproofing or undercoating spray"
    ],
    "issueAreaIds": [
      "connector_and_harness_fitment"
    ],
    "partIds": [
      "fuel_pump_driver_module"
    ],
    "symptomIds": [
      "rough_idle"
    ],
    "systemIds": [
      "fuel_air_metering",
      "electrical"
    ],
    "recommendation": "INSPECT_ONLY"
  },
  {
    "id": "forum-f150forum-5-4-3v-head-design-08-spark-plugs",
    "source": "f150forum",
    "title": "5.4 3V Head Design - 08+ Spark Plugs",
    "url": "https://www.f150forum.com/f4/5-4-3v-head-design-08-spark-plugs-213513/",
    "topic": "ignition",
    "summary": "Late-build 5.4 3V owners were trying to confirm whether the revised 2008-style heads and plugs reduced the broken spark plug problem and which plug to use.",
    "consensusFix": "Verify engine build date, treat late-2007/2008 hardware as revised, and use the correct Motorcraft replacement plug instead of guessing by internet folklore.",
    "ownerTips": [
      "Check the engine build date before ordering plugs.",
      "Do not assume every 5.4 3V uses the older two-piece plug design.",
      "Use the correct plug family and boot color for the revised head."
    ],
    "aliases": [
      "ignition",
      "Motorcraft SP-509 spark plugs",
      "Correct coil boots for late 3V applications",
      "Check the engine build date before ordering plugs.",
      "Do not assume every 5.4 3V uses the older two-piece plug design.",
      "Use the correct plug family and boot color for the revised head."
    ],
    "recommendedParts": [
      "Motorcraft SP-509 spark plugs",
      "Correct coil boots for late 3V applications"
    ],
    "issueAreaIds": [
      "ignition_misfire_path"
    ],
    "partIds": [
      "spark_plug",
      "coil"
    ],
    "symptomIds": [
      "misfire",
      "rough_idle"
    ],
    "systemIds": [
      "ignition",
      "engine_mechanical"
    ],
    "recommendation": "INSPECT_ONLY"
  },
  {
    "id": "forum-f150forum-cam-phaser-difference-left-right",
    "source": "f150forum",
    "title": "Cam Phaser Difference? Left & Right",
    "url": "https://www.f150forum.com/f4/cam-phaser-difference-left-right-413753/",
    "topic": "timing_valvetrain",
    "summary": "Owner opened a 5.4 3V timing set after codes and broken guides, then found suspicious left/right phaser and tensioner orientation from a prior repair.",
    "consensusFix": "When timing hardware has been apart before, replace the full timing kit and verify phaser, guide, and tensioner orientation instead of replacing one noisy part in isolation.",
    "ownerTips": [
      "A broken guide plus reused phasers is not a stable repair.",
      "Mark bank orientation carefully before assembly.",
      "Do not trust prior owner timing work without verifying component placement."
    ],
    "aliases": [
      "timing_valvetrain",
      "Complete timing kit",
      "Cam phasers",
      "Timing guides",
      "Timing chain tensioners",
      "A broken guide plus reused phasers is not a stable repair.",
      "Mark bank orientation carefully before assembly.",
      "Do not trust prior owner timing work without verifying component placement."
    ],
    "recommendedParts": [
      "Complete timing kit",
      "Cam phasers",
      "Timing guides",
      "Timing chain tensioners"
    ],
    "issueAreaIds": [
      "cam_phaser_tick_context"
    ],
    "partIds": [
      "cam_phaser_area",
      "timing_cover",
      "vct_solenoid"
    ],
    "symptomIds": [
      "rattle",
      "ticking"
    ],
    "systemIds": [
      "timing_valvetrain",
      "engine_mechanical"
    ],
    "recommendation": "SHOP_REQUIRED"
  },
  {
    "id": "forum-f150forum-power-steering",
    "source": "f150forum",
    "title": "Power steering...",
    "url": "https://www.f150forum.com/f4/power-steering-23955/",
    "topic": "charging_accessory_noise",
    "summary": "Owner heard a growing steering-area noise that changed with road speed but not with steering input at idle, making it unclear whether the pump was actually at fault.",
    "consensusFix": "Separate steering-load noise from road-speed or accessory-bearing noise before replacing the pump, because alternator or pulley bearings can mimic steering complaints.",
    "ownerTips": [
      "If the sound does not change with steering input, the pump may be innocent.",
      "Use a stethoscope or belt-off isolation before buying parts.",
      "Road-speed-sensitive whine deserves accessory-drive cross-checks."
    ],
    "aliases": [
      "charging_accessory_noise",
      "Power steering fluid",
      "Power steering pump",
      "Accessory drive pulley or bearing as needed",
      "If the sound does not change with steering input",
      "the pump may be innocent.",
      "Use a stethoscope or belt-off isolation before buying parts.",
      "Road-speed-sensitive whine deserves accessory-drive cross-checks."
    ],
    "recommendedParts": [
      "Power steering fluid",
      "Power steering pump",
      "Accessory drive pulley or bearing as needed"
    ],
    "issueAreaIds": [
      "accessory_drive_belt_path",
      "battery_charge_and_ground_path"
    ],
    "partIds": [
      "idler_pulley",
      "alternator_area",
      "battery",
      "tensioner"
    ],
    "symptomIds": [
      "chirp",
      "squeal",
      "dead_battery"
    ],
    "systemIds": [
      "accessory_drive",
      "charging",
      "electrical"
    ],
    "recommendation": "INSPECT_ONLY"
  },
  {
    "id": "forum-f150online-fuel-pump-driver-module-replacement",
    "source": "f150online",
    "title": "Fuel Pump Driver Module Replacement",
    "url": "https://www.f150online.com/forums/articles-how-s/409253-fuel-pump-driver-module-replacement.html",
    "topic": "fuel_air_metering",
    "summary": "Technical article thread reminding owners to inspect the frame-mounted electronic fuel controller for corrosion before it fails while driving.",
    "consensusFix": "Replace the corroded fuel pump driver module with the updated kit that includes stand-off style bolts and inspect the bracket area for rust.",
    "ownerTips": [
      "Drop the spare for access where applicable.",
      "Inspect the bracket and module together, not the controller alone.",
      "Use the newer hardware that spaces the module away from the bracket."
    ],
    "aliases": [
      "fuel_air_metering",
      "Fuel pump driver module kit",
      "Updated stand-off mounting bolts",
      "Drop the spare for access where applicable.",
      "Inspect the bracket and module together",
      "not the controller alone.",
      "Use the newer hardware that spaces the module away from the bracket."
    ],
    "recommendedParts": [
      "Fuel pump driver module kit",
      "Updated stand-off mounting bolts"
    ],
    "issueAreaIds": [
      "connector_and_harness_fitment"
    ],
    "partIds": [
      "fuel_pump_driver_module"
    ],
    "symptomIds": [
      "rough_idle"
    ],
    "systemIds": [
      "fuel_air_metering",
      "electrical"
    ],
    "recommendation": "INSPECT_ONLY"
  },
  {
    "id": "forum-f150online-drivers-side-blend-door-actuator",
    "source": "f150online",
    "title": "Drivers Side Blend Door Actuator",
    "url": "https://www.f150online.com/forums/2009-2014-f-150/526349-drivers-side-blend-door-actuator.html",
    "topic": "cabin_controls",
    "summary": "2010 F-150 owner lost cold air on the driver side only and received wildly different labor quotes for the blend door actuator job.",
    "consensusFix": "Confirm which actuator has failed before authorizing major labor, because some 2009-2014 driver-side actuator repairs can be reached without full dash removal.",
    "ownerTips": [
      "Driver-side-only temperature mismatch is a target clue.",
      "Actuator location can differ by trim and HVAC configuration.",
      "Verify access path before accepting an all-day dash-out quote."
    ],
    "aliases": [
      "cabin_controls",
      "Driver-side blend door actuator",
      "Driver-side-only temperature mismatch is a target clue.",
      "Actuator location can differ by trim and HVAC configuration.",
      "Verify access path before accepting an all-day dash-out quote."
    ],
    "recommendedParts": [
      "Driver-side blend door actuator"
    ],
    "issueAreaIds": [],
    "partIds": [],
    "symptomIds": [],
    "systemIds": [
      "cabin_controls",
      "electrical"
    ],
    "recommendation": "INSPECT_ONLY"
  },
  {
    "id": "forum-f150online-5-4-exhaust-manifold-ticking-knocking-solved",
    "source": "f150online",
    "title": "5.4 Exhaust Manifold Ticking Knocking Solved",
    "url": "https://www.f150online.com/forums/exhaust-intake-systems/478143-5-4-exhaust-manifold-ticking-knocking-solved.html",
    "topic": "exhaust_emissions",
    "summary": "Passenger-side startup knock on a 5.4 was first mistaken for phasers, but dealer inspection traced it to a warped exhaust manifold and broken hardware.",
    "consensusFix": "Differentiate manifold leak tick from top-end timing noise, inspect for warped manifolds and broken studs, and expect passenger-side access to be the harder side.",
    "ownerTips": [
      "Noise that worsens under load but fades when warm can still be exhaust.",
      "Passenger-side manifolds on these trucks commonly warp or break studs.",
      "Check for soot and exhaust signature before blaming cam phasers."
    ],
    "aliases": [
      "exhaust_emissions",
      "Exhaust manifold",
      "Replacement studs and bolts",
      "Aftermarket manifold or long-tube header alternatives",
      "Noise that worsens under load but fades when warm can still be exhaust.",
      "Passenger-side manifolds on these trucks commonly warp or break studs.",
      "Check for soot and exhaust signature before blaming cam phasers."
    ],
    "recommendedParts": [
      "Exhaust manifold",
      "Replacement studs and bolts",
      "Aftermarket manifold or long-tube header alternatives"
    ],
    "issueAreaIds": [
      "exhaust_manifold_tick"
    ],
    "partIds": [
      "exhaust_manifold"
    ],
    "symptomIds": [
      "exhaust_tick",
      "ticking"
    ],
    "systemIds": [
      "exhaust_emissions",
      "engine_mechanical"
    ],
    "recommendation": "INSPECT_ONLY"
  },
  {
    "id": "forum-f150online-5-4-issues-oiling-cam-phaser-and-chain-tentioner",
    "source": "f150online",
    "title": "5.4 issues. oiling, cam phaser and chain tentioner.",
    "url": "https://www.f150online.com/forums/v8-engines/451718-5-4-issues-oiling-cam-phaser-chain-tentioner.html",
    "topic": "timing_valvetrain",
    "summary": "Owner with repeated rocker and cam damage tied the failure pattern to oiling issues, clogged passages, and phaser/tensioner wear on a high-mileage 5.4 3V.",
    "consensusFix": "Stay disciplined on oil-change intervals and treat cam-phaser, tensioner, and rocker failures as oil-system cleanliness and timing-system health issues, not just isolated noise parts.",
    "ownerTips": [
      "Frequent oil service matters on the 3V valvetrain.",
      "Do not ignore gum or sludge if timing parts have failed once already.",
      "A repaired head with old oiling problems can fail again."
    ],
    "aliases": [
      "timing_valvetrain",
      "Timing chain tensioners",
      "Cam phasers",
      "Valve-train repair parts as needed",
      "Frequent oil service matters on the 3V valvetrain.",
      "Do not ignore gum or sludge if timing parts have failed once already.",
      "A repaired head with old oiling problems can fail again."
    ],
    "recommendedParts": [
      "Timing chain tensioners",
      "Cam phasers",
      "Valve-train repair parts as needed"
    ],
    "issueAreaIds": [
      "cam_phaser_tick_context"
    ],
    "partIds": [
      "cam_phaser_area",
      "timing_cover",
      "vct_solenoid"
    ],
    "symptomIds": [
      "rattle",
      "ticking"
    ],
    "systemIds": [
      "timing_valvetrain",
      "engine_mechanical"
    ],
    "recommendation": "SHOP_REQUIRED"
  },
  {
    "id": "forum-fordtrucks-ford-f150-basic-maintenance-schedule",
    "source": "fordtrucks",
    "title": "Ford F150: Basic Maintenance Schedule",
    "url": "https://www.ford-trucks.com/how-tos/a/ford-f150-basic-maintenance-schedule-359521",
    "topic": "maintenance",
    "summary": "Owners looking for a practical mileage-based service plan for 2004-2014 F-150 trucks.",
    "consensusFix": "Use the owner’s manual as the baseline and treat routine oil, filter, brake, cooling-system, and tire inspections as the difference between a short-life truck and a 200k+ truck.",
    "ownerTips": [
      "Most recurring inspections only need basic tools and patience.",
      "Use mileage-based checks instead of waiting for a failure event.",
      "Brake, cooling, and fluid inspections deserve the same attention as oil changes."
    ],
    "aliases": [
      "maintenance",
      "Engine oil",
      "Oil filter",
      "Brake inspection items",
      "Cooling-system service parts",
      "Most recurring inspections only need basic tools and patience.",
      "Use mileage-based checks instead of waiting for a failure event.",
      "Brake",
      "cooling",
      "and fluid inspections deserve the same attention as oil changes."
    ],
    "recommendedParts": [
      "Engine oil",
      "Oil filter",
      "Brake inspection items",
      "Cooling-system service parts"
    ],
    "issueAreaIds": [],
    "partIds": [
      "battery",
      "brake_line",
      "coolant_hose",
      "belt"
    ],
    "symptomIds": [],
    "systemIds": [
      "engine_mechanical",
      "cooling",
      "brakes",
      "underbody"
    ],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-fordtrucks-undercoating",
    "source": "fordtrucks",
    "title": "Undercoating",
    "url": "https://www.ford-trucks.com/forums/1709019-undercoating.html",
    "topic": "rust_prevention",
    "summary": "Owners in salted-road regions debated whether undercoating is worth doing on long-term F-150 ownership.",
    "consensusFix": "Use wax or oil-based rustproofing if you want extra corrosion protection, but avoid hard shell coatings that can trap rust underneath once they crack or peel.",
    "ownerTips": [
      "Oil- or wax-based treatments are favored over hard coatings.",
      "Treat light surface rust early before it becomes trapped scale.",
      "Wheel wells and underbody seams deserve repeat attention in salt states."
    ],
    "aliases": [
      "rust_prevention",
      "Wax/oil-film rustproofing",
      "Rust encapsulator for existing light surface rust",
      "Oil- or wax-based treatments are favored over hard coatings.",
      "Treat light surface rust early before it becomes trapped scale.",
      "Wheel wells and underbody seams deserve repeat attention in salt states."
    ],
    "recommendedParts": [
      "Wax/oil-film rustproofing",
      "Rust encapsulator for existing light surface rust"
    ],
    "issueAreaIds": [
      "wheel_well_underbody_rust",
      "underbody_frame_corrosion"
    ],
    "partIds": [
      "wheel_well_lip",
      "frame_section",
      "brake_line"
    ],
    "symptomIds": [
      "rust"
    ],
    "systemIds": [
      "underbody",
      "body",
      "brakes"
    ],
    "recommendation": "SHOP_REQUIRED"
  },
  {
    "id": "forum-fordtrucks-synthetic-oils-in-2010-f150",
    "source": "fordtrucks",
    "title": "synthetic oils in 2010 F150",
    "url": "https://www.ford-trucks.com/forums/935104-synthetic-oils-in-2010-f150.html",
    "topic": "engine_oil",
    "summary": "New 2010 F-150 owner asked when it is safe to switch a 5.4 to synthetic oil and when the first oil change should happen.",
    "consensusFix": "Forum consensus stayed conservative: do the first change at the normal recommended interval or around the first scheduled service, then choose your preferred blend or synthetic routine rather than changing immediately at delivery mileage.",
    "ownerTips": [
      "Do not overreact to a brand-new engine with immediate early oil changes unless you have a reason.",
      "Use the owner’s manual as the floor for first-service timing.",
      "Motorcraft blend was repeatedly mentioned as the baseline option."
    ],
    "aliases": [
      "engine_oil",
      "Motorcraft synthetic blend oil",
      "Oil filter",
      "Do not overreact to a brand-new engine with immediate early oil changes unless you have a reason.",
      "Use the owner’s manual as the floor for first-service timing.",
      "Motorcraft blend was repeatedly mentioned as the baseline option."
    ],
    "recommendedParts": [
      "Motorcraft synthetic blend oil",
      "Oil filter"
    ],
    "issueAreaIds": [
      "cam_phaser_tick_context"
    ],
    "partIds": [
      "cam_phaser_area",
      "vct_solenoid",
      "timing_cover"
    ],
    "symptomIds": [
      "ticking",
      "rattle"
    ],
    "systemIds": [
      "engine_mechanical",
      "timing_valvetrain"
    ],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-fordtrucks-2010-f150-150k-preventative-replacements",
    "source": "fordtrucks",
    "title": "2010 F150 150k Preventative Replacements",
    "url": "https://www.ford-trucks.com/forums/1560912-2010-f150-150k-preventative-replacements.html",
    "topic": "high_mileage_maintenance",
    "summary": "2010 F-150 5.4 4x4 owner asked what should be replaced around 150k miles for reliability without blindly replacing every part.",
    "consensusFix": "High-mileage owners leaned toward fuel pump, starter, and alternator as realistic proactive replacements around 150k, while water pump and steering pump were usually treated as run-to-symptom items.",
    "ownerTips": [
      "Separate true wear-history parts from 'replace everything' anxiety.",
      "Accessory-drive wear items and hoses make sense before long trips.",
      "Water pumps and steering pumps often give warning before failure."
    ],
    "aliases": [
      "high_mileage_maintenance",
      "Fuel pump",
      "Starter motor",
      "Alternator",
      "Belts and pulleys",
      "Hoses",
      "Separate true wear-history parts from 'replace everything' anxiety.",
      "Accessory-drive wear items and hoses make sense before long trips.",
      "Water pumps and steering pumps often give warning before failure."
    ],
    "recommendedParts": [
      "Fuel pump",
      "Starter motor",
      "Alternator",
      "Belts and pulleys",
      "Hoses"
    ],
    "issueAreaIds": [
      "accessory_drive_belt_path",
      "battery_charge_and_ground_path"
    ],
    "partIds": [
      "battery",
      "alternator_area",
      "belt",
      "idler_pulley",
      "tensioner"
    ],
    "symptomIds": [
      "dead_battery",
      "chirp",
      "squeal"
    ],
    "systemIds": [
      "charging",
      "accessory_drive",
      "fuel_air_metering"
    ],
    "recommendation": "INSPECT_ONLY"
  },
  {
    "id": "forum-f150forum-cam-phaser-complete-fix",
    "source": "f150forum",
    "title": "Complete cam phaser fix — what to replace and what to skip",
    "url": "https://www.f150forum.com/f4/cam-phaser-replacement/",
    "topic": "timing_valvetrain",
    "summary": "Comprehensive owner thread on the full cam phaser job. Consensus: never replace just phasers — always do chains, tensioners, guides, and VCT solenoids together. Use updated Ford phaser part numbers. Budget 10-15 hours shop labor. Change oil to fresh 5W-20 synthetic immediately after.",
    "consensusFix": "Replace both cam phasers, both timing chains, all tensioners, all guides, and both VCT solenoids as a complete kit. Use new TTY cam phaser bolts (30 lb-ft + 90°). Flush oil system with fresh 5W-20 after repair.",
    "ownerTips": [
      "NEVER replace just one phaser — always do both banks.",
      "Use updated Ford part numbers — they revised the phasers multiple times.",
      "The VCT solenoid screens clog with debris — clean or replace screens.",
      "If you're in there, do the water pump too — same labor access.",
      "Use genuine Ford or Cloyes timing kit — cheap kits use inferior guides."
    ],
    "recommendedParts": ["Cam phaser kit", "Timing chain kit", "VCT solenoids"],
    "aliases": ["cam phaser job", "phaser replacement", "timing chain job", "cold start rattle fix"],
    "issueAreaIds": ["cam_phaser_tick_context"],
    "partIds": ["cam_phaser_area", "timing_cover", "vct_solenoid"],
    "symptomIds": ["rattle", "ticking"],
    "systemIds": ["timing_valvetrain", "engine_mechanical"],
    "recommendation": "SHOP_REQUIRED"
  },
  {
    "id": "forum-f150forum-spark-plug-removal-tips",
    "source": "f150forum",
    "title": "Spark plug removal on 5.4 3V — the definitive guide",
    "url": "https://www.f150forum.com/f4/spark-plug-removal-54-3v/",
    "topic": "ignition",
    "summary": "Owner guide to removing the notorious 2-piece spark plugs without breaking them. The key: warm the engine to full operating temp, apply PB Blaster penetrating oil into each plug well 24 hours before, use the 1/8-turn-and-pause technique, and have the Lisle 65600 extraction tool ready as backup.",
    "consensusFix": "Warm engine fully, soak with penetrating oil, break 1/8 turn, re-tighten, repeat with increasing turns. Never cold, never with an impact wrench. Install SP-515 with Motorcraft XL-2 anti-seize at exactly 25 lb-ft.",
    "ownerTips": [
      "Soak plugs with PB Blaster for 24 hours before attempting removal.",
      "Run the engine to full operating temp — aluminum expands and loosens the bond.",
      "1/8 turn, re-tighten, 1/4 turn, re-tighten — patience is everything.",
      "NEVER use an impact wrench — you will snap the plug.",
      "Have the Lisle 65600 extraction kit on hand before you start.",
      "Budget 2-3 hours for all 8 plugs if none break.",
      "Rear plugs (especially passenger side) are the hardest to reach."
    ],
    "recommendedParts": ["Motorcraft SP-515 spark plugs", "Motorcraft XL-2 anti-seize", "Lisle 65600 extractor"],
    "aliases": ["plug removal", "broken plug", "SP-515 install", "Lisle 65600", "plug extraction"],
    "issueAreaIds": ["ignition_misfire_path"],
    "partIds": ["spark_plug", "coil"],
    "symptomIds": ["misfire"],
    "systemIds": ["ignition", "engine_mechanical"],
    "recommendation": "INSPECT_ONLY"
  },
  {
    "id": "forum-f150forum-blend-door-diy",
    "source": "f150forum",
    "title": "Blend door actuator replacement — which one and how",
    "url": "https://www.f150forum.com/f4/blend-door-actuator-clicking/",
    "topic": "cabin_controls",
    "summary": "Guide to identifying and replacing the clicking blend door actuator. The driver-side temperature actuator is the most common failure. Accessible under the dash with a small panel removal. 3 screws hold the actuator. Dorman 604-252 works fine as a cheaper alternative to Motorcraft YH-1779.",
    "consensusFix": "Identify which actuator is clicking (listen with engine off, HVAC on). Remove under-dash panel, disconnect connector, remove 2-3 screws, swap actuator. Run HVAC recalibration: key on, wait 60 seconds for actuator to find position.",
    "ownerTips": [
      "Turn HVAC on with engine off to isolate the clicking — you can feel it through the dash.",
      "Driver-side temp actuator is the most common failure — start there.",
      "Dorman 604-252 is $15-25 and works perfectly.",
      "No need to discharge A/C for this repair.",
      "After installing, turn key to ON for 60 seconds to let actuator recalibrate."
    ],
    "recommendedParts": ["Dorman 604-252 actuator"],
    "aliases": ["blend door fix", "HVAC clicking fix", "actuator replacement", "dash clicking"],
    "issueAreaIds": [],
    "partIds": [],
    "symptomIds": [],
    "systemIds": ["cabin_controls", "electrical"],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-f150forum-iwe-vacuum-fix",
    "source": "f150forum",
    "title": "IWE grinding noise fix — check valve first",
    "url": "https://www.f150forum.com/f4/iwe-grinding-2wd/",
    "topic": "drivetrain_4wd",
    "summary": "The IWE grinding noise in 2WD is almost always a vacuum issue, not an actuator issue. The vacuum check valve near the passenger fender is the #1 failure point at $15-30. Check this first before replacing IWE actuators ($50-150 per side) or the IWE solenoid ($30-60).",
    "consensusFix": "Replace the vacuum check valve first ($15-30). If grinding persists, check vacuum lines for cracks. Then IWE solenoid on the passenger valve cover. IWE actuators last.",
    "ownerTips": [
      "The check valve is the cheapest and most common fix — start there.",
      "Grinding that goes away in 4WD confirms it's an IWE issue, not a wheel bearing.",
      "The noise is worse in cold or humid weather.",
      "Some owners add a manual vacuum disconnect as a permanent fix.",
      "If you replace IWE actuators, you need to remove brake caliper and rotor for access."
    ],
    "recommendedParts": ["IWE vacuum check valve", "IWE solenoid"],
    "aliases": ["IWE fix", "hub grinding fix", "front end grinding 2WD", "IWE check valve"],
    "issueAreaIds": ["drivetrain_leak_or_boot"],
    "partIds": ["iwe_solenoid_actuator"],
    "symptomIds": ["vibration", "rattle"],
    "systemIds": ["drivetrain_4wd"],
    "recommendation": "INSPECT_ONLY"
  },
  {
    "id": "forum-f150forum-trans-fluid-change-procedure",
    "source": "f150forum",
    "title": "6R80 transmission fluid change — the right way",
    "url": "https://www.f150forum.com/f4/6r80-fluid-change/",
    "topic": "drivetrain_4wd",
    "summary": "Step-by-step for changing 6R80 transmission fluid. Pan drop service gets ~7 quarts out of 13.1 total. Do two drain-and-fills 500 miles apart for better fluid exchange. NEVER flush a high-mileage unit that's never been serviced. MERCON LV (XT-10-QLVC) ONLY.",
    "consensusFix": "Drop pan, replace filter (FT-188), clean pan and magnet, refill with ~7 quarts MERCON LV. Drive 500 miles, then do a second drain-and-fill. Pan bolts: 89 lb-in (do NOT over-tighten).",
    "ownerTips": [
      "MERCON LV only — MERCON V will destroy the transmission.",
      "Inspect the magnet on the pan — some metal is normal, chunks are not.",
      "The 6R80 has no traditional dipstick — check level through the overflow tube.",
      "Do NOT power flush a unit with 100K+ miles of old fluid — dislodges debris.",
      "Two drain-and-fills exchanges about 75% of total fluid — good enough.",
      "Service every 30K miles for a transmission that lasts 200K+."
    ],
    "recommendedParts": ["Motorcraft MERCON LV (7 qt)", "Motorcraft FT-188 filter"],
    "aliases": ["6R80 service", "trans fluid change", "MERCON LV change", "transmission service"],
    "issueAreaIds": [],
    "partIds": [],
    "symptomIds": ["vibration"],
    "systemIds": ["drivetrain_4wd"],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-fordtrucks-exhaust-stud-extraction",
    "source": "fordtrucks",
    "title": "Exhaust manifold broken stud extraction methods",
    "url": "https://www.ford-trucks.com/forums/exhaust-stud-extraction/",
    "topic": "exhaust_emissions",
    "summary": "Owner experiences with extracting broken exhaust manifold studs from the 5.4. Methods: EZ-Out extractors, left-hand drill bits, welding a nut onto the broken stud (most effective for flush breaks), or Time-Sert thread repair for damaged holes. Passenger side rear studs are the worst — tight against the firewall.",
    "consensusFix": "If stud breaks above the surface: weld a nut on and back it out. If flush: center-drill and use EZ-Out. If threads damaged: Time-Sert or Heli-Coil. Replace ALL studs on the bank — the others are fatigued.",
    "ownerTips": [
      "Heat the area around the broken stud with a propane torch before extraction.",
      "Welding a nut onto the broken stud is the most reliable method for flush breaks.",
      "Replace all studs on the bank, not just the broken one — they're all the same age.",
      "Dorman makes a manifold with bolts instead of studs — improved design.",
      "Passenger side rear studs are the hardest due to firewall proximity."
    ],
    "recommendedParts": ["Dorman exhaust manifold bolt kit", "Time-Sert M8 repair kit"],
    "aliases": ["broken stud fix", "exhaust stud extraction", "manifold bolt repair", "stud removal"],
    "issueAreaIds": ["exhaust_manifold_tick"],
    "partIds": ["exhaust_manifold"],
    "symptomIds": ["exhaust_tick", "ticking"],
    "systemIds": ["exhaust_emissions", "engine_mechanical"],
    "recommendation": "SHOP_REQUIRED"
  },
  {
    "id": "forum-f150forum-door-ajar-fix",
    "source": "f150forum",
    "title": "Door ajar light stays on — cheap fix",
    "url": "https://www.f150forum.com/f4/door-ajar-light-fix/",
    "topic": "electrical",
    "summary": "The door ajar switch is inside the door latch mechanism and sticks from dried lubricant. Quick fix: spray white lithium grease directly into the door latch from the door edge while working the handle. This resolves 80% of cases. If it returns, replace the door latch assembly ($50-150).",
    "consensusFix": "Spray white lithium grease into each door latch mechanism while cycling the handle. If the problem persists, replace the latch assembly (3 torx bolts, disconnect rods).",
    "ownerTips": [
      "Start with the driver door — it's the most common culprit.",
      "Use the straw nozzle to get grease deep into the latch mechanism.",
      "Work the door handle 20-30 times after spraying to distribute grease.",
      "If dome lights drain the battery overnight, check ALL doors including rear.",
      "The latch is held by 3 torx bolts — disconnect the rods before removing."
    ],
    "recommendedParts": ["White lithium grease", "Door latch assembly"],
    "aliases": ["door ajar fix", "dome light fix", "door chime fix", "latch lubrication"],
    "issueAreaIds": ["connector_and_harness_fitment"],
    "partIds": ["connector"],
    "symptomIds": ["dead_battery"],
    "systemIds": ["electrical", "body"],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-f150forum-melling-oil-pump-upgrade",
    "source": "f150forum",
    "title": "Melling high-volume oil pump upgrade during timing job",
    "url": "https://www.f150forum.com/f4/oil-pump-melling-m340-m360-ford-racing-346518/",
    "topic": "engine_mechanical",
    "summary": "Community consensus: the factory oil pump is a known weak point on the 5.4 3V. The VCT/cam phaser system demands high oil volume, and worn factory pumps can't keep up at hot idle — dropping to 15-16 psi. The Melling M340HV (standard pressure, high volume) is the most recommended upgrade. One owner reported hot idle pressure improving from 16-17 psi to 24-25 psi on a 212K-mile engine. Install during a timing job since you already have front cover access. The M360HV (high pressure + high volume) is overkill for stock engines and can overload VCT solenoid seals.",
    "consensusFix": "Replace the factory oil pump with a Melling M340HV during any timing chain or cam phaser job. Standard pressure, high volume — improves oil delivery to cam phasers without overpressurizing VCT solenoids. Requires oil pan drop to access the pickup tube.",
    "ownerTips": [
      "Melling M340HV is the community consensus — standard pressure, high volume.",
      "The M360HV (high pressure + high volume) can blow VCT solenoid seals — avoid on stock engines.",
      "Total parts cost for Motorcraft phasers + chains + Melling pump is ~$2K — half of dealer labor alone.",
      "Hot idle oil pressure below 20 psi is a warning sign the factory pump is worn.",
      "You must drop the oil pan to access the pickup tube — plan for this extra step.",
      "Replace the pickup tube O-ring while you're in there — they shrink and leak with age."
    ],
    "recommendedParts": ["Melling M340HV oil pump", "Oil pump pickup tube O-ring", "Oil pan gasket"],
    "aliases": ["oil pump upgrade", "Melling M340", "low oil pressure fix", "high volume pump", "oil pressure improvement"],
    "issueAreaIds": ["cam_phaser_tick_context"],
    "partIds": ["cam_phaser_area", "timing_cover"],
    "symptomIds": ["ticking", "rattle"],
    "systemIds": ["engine_mechanical", "timing_valvetrain"],
    "recommendation": "SHOP_REQUIRED"
  },
  {
    "id": "forum-f150forum-oil-weight-debate-consensus",
    "source": "f150forum",
    "title": "5.4 3V oil weight and brand debate — the real consensus",
    "url": "https://www.f150online.com/forums/v8-engines/498801-what-engine-oil-you-running-your-04-08-5-4l.html",
    "topic": "engine_mechanical",
    "summary": "Ford specs 5W-20 and that is what you should use — do NOT switch to 5W-30. The VCT system and cam phasers are calibrated for 5W-20 viscosity. Using thicker oil can cause delayed phaser response and trigger VCT codes. Motorcraft 5W-20 Synthetic Blend (XO-5W20-QSP) is the baseline. For high-mileage trucks, use 5W-20 full synthetic (Pennzoil Platinum 5W-20 or Motorcraft Full Synthetic 5W-20) for better film strength while staying in spec. FL-820S filter is OEM; Wix 51372XP is the aftermarket consensus pick. Oil change interval: 5K miles max, 3K-4K preferred on high-mileage 3V engines.",
    "consensusFix": "Use Motorcraft 5W-20 Synthetic Blend as baseline. For high-mileage engines (100K+), upgrade to 5W-20 full synthetic (Pennzoil Platinum 5W-20 or Motorcraft Full Synthetic 5W-20) — do NOT switch to 5W-30. Change every 5K miles max, 3K-4K preferred. Filter: Motorcraft FL-820S or Wix 51372XP.",
    "ownerTips": [
      "Motorcraft 5W-20 Synthetic Blend (XO-5W20-QSP) is the budget baseline — $24 at Walmart for a jug.",
      "Above 100K miles, upgrade to 5W-20 full synthetic — better film strength while staying in Ford spec.",
      "Pennzoil Platinum 5W-20 and Motorcraft Full Synthetic 5W-20 are the top picks for high-mileage 3V engines.",
      "FL-820S filter has reports of torn pleats — Wix 51372XP is the aftermarket consensus.",
      "Motorcraft FL-820S is actually made by Purolator.",
      "Oil change at 3K-5K miles — the 3V timing system is extremely sensitive to dirty oil.",
      "If oil looks dark at 3K miles, your intervals are too long for this engine.",
      "Never use 10W-30 — too thick for cold start VCT operation."
    ],
    "recommendedParts": ["Motorcraft XO-5W20-QSP Synthetic Blend", "Pennzoil Platinum 5W-20 Full Synthetic", "Motorcraft FL-820S filter", "Wix 51372XP filter"],
    "aliases": ["oil debate", "best oil 5.4", "oil change interval", "5W-20 full synthetic vs blend", "oil filter choice"],
    "issueAreaIds": ["cam_phaser_tick_context"],
    "partIds": ["cam_phaser_area", "vct_solenoid"],
    "symptomIds": ["ticking", "rattle", "rough_idle"],
    "systemIds": ["engine_mechanical", "timing_valvetrain"],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-f150forum-timing-kit-brand-consensus",
    "source": "f150forum",
    "title": "Timing kit brand showdown — OEM vs Cloyes vs Melling vs junk",
    "url": "https://www.f150forum.com/f4/beware-cloyes-timing-kit-479388/",
    "topic": "timing_valvetrain",
    "summary": "The 5.4 3V timing system is NOT a place to save money on parts. Cloyes 9-0391SB has mixed reviews — some owners report destroyed guides and blown tensioner seals within 2 years. Problems traced to Chinese-made guides and tensioners in some kit batches. Successful Cloyes installs typically paired Cloyes chains with Motorcraft tensioners. Community hierarchy: Ford OEM/Motorcraft > Melling (USA-made) > Cloyes (if paired with Motorcraft tensioners) > everything else. NEVER use Dorman timing parts. Budget $2K in parts to do it right — still half of the $4-6K dealer quote.",
    "consensusFix": "Use Ford OEM/Motorcraft phasers and tensioners with either OEM or Cloyes chains. If budget is tight, Melling timing kits (USA-made) are acceptable. NEVER use Dorman valvetrain parts. Replace ALL timing components together — never just one phaser or one chain.",
    "ownerTips": [
      "Ford OEM phasers have been revised multiple times — always verify you're getting the latest revision.",
      "Cloyes chains are fine, but pair with Motorcraft steel ratcheting tensioners — Cloyes tensioners can blow seals.",
      "Dorman cam phasers and timing parts are universally condemned on all F-150 forums.",
      "Melling timing kits are USA-made and well-regarded as the best non-OEM option.",
      "Complete kit should include: both phasers, both chains, all tensioners, all guides, both VCT solenoids, new TTY phaser bolts.",
      "Phaser bolt torque: 30 lb-ft + 90 degrees — they are torque-to-yield, one-time use.",
      "A timing job without replacing the oil pump is leaving the root cause of most phaser failures in place.",
      "Budget: ~$2K in quality parts vs $4-6K dealer quote — massive DIY savings if you have the skills."
    ],
    "recommendedParts": ["Motorcraft cam phasers (latest revision)", "Motorcraft steel ratcheting tensioners", "Cloyes 9-0391SB chain set", "Melling timing kit (USA-made alternative)"],
    "aliases": ["timing kit brands", "Cloyes vs Ford", "Dorman timing parts", "phaser brand", "timing chain kit choice"],
    "issueAreaIds": ["cam_phaser_tick_context"],
    "partIds": ["cam_phaser_area", "timing_cover", "vct_solenoid"],
    "symptomIds": ["rattle", "ticking"],
    "systemIds": ["timing_valvetrain", "engine_mechanical"],
    "recommendation": "SHOP_REQUIRED"
  },
  {
    "id": "forum-f150forum-coil-on-plug-replacement",
    "source": "f150forum",
    "title": "Coil-on-plug replacement — Motorcraft DG-521 vs aftermarket",
    "url": "https://www.f150forum.com/f4/motorcraft-vs-aftermarket-coils-5-4l-354782/",
    "topic": "ignition",
    "summary": "The Motorcraft DG-521 is the only coil the community consistently recommends. Cheap no-name coils from Amazon have high failure rates — owners report replacing them within months. Denso is the only aftermarket brand with a decent reputation for this application. Accel and Granatelli performance coils have mixed results. Replace all 8 coils at the same time as spark plugs — they share the same labor. A set of 8 Motorcraft DG-521 coils runs ~$200-300 online, making aftermarket savings negligible for the risk.",
    "consensusFix": "Replace with Motorcraft DG-521 coils. Do all 8 at the same time as spark plugs. Only acceptable aftermarket alternative is Denso. Never buy unbranded Amazon coil packs.",
    "ownerTips": [
      "Motorcraft DG-521 is the ONLY community-approved coil for the 5.4 3V.",
      "A set of 8 Motorcraft coils is $200-300 — the savings from cheap coils isn't worth the misfire headaches.",
      "Denso is the only aftermarket brand with a decent track record — still second choice to Motorcraft.",
      "Cheap Amazon coil packs commonly fail within 6 months — owners call them 'the misfire lottery.'",
      "Replace coils when doing spark plugs — same labor, same access.",
      "Accel and Granatelli 'performance' coils have reliability issues reported on forums.",
      "If one coil fails, consider replacing all 8 — they're the same age and will fail in sequence."
    ],
    "recommendedParts": ["Motorcraft DG-521 coil-on-plug (set of 8)", "Denso coil-on-plug (acceptable alternative)"],
    "aliases": ["coil pack replacement", "DG-521", "ignition coil", "misfire fix", "coil-on-plug"],
    "issueAreaIds": ["ignition_misfire_path"],
    "partIds": ["coil", "spark_plug"],
    "symptomIds": ["misfire", "rough_idle"],
    "systemIds": ["ignition", "engine_mechanical"],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-f150forum-vct-solenoid-screen-cleaning",
    "source": "f150forum",
    "title": "VCT solenoid screen cleaning — cheap first step before cam phaser job",
    "url": "https://www.f150forum.com/f4/please-read-2004-ford-f150-cam-phaser-vct-solenoid-sludge-47398/index17/",
    "topic": "timing_valvetrain",
    "summary": "Before committing to a $2-6K cam phaser job, clean or replace the VCT solenoid screens. They have tiny mesh screens that clog with sludge and restrict oil flow to the phasers. The solenoids are on top of the valve covers — 10-minute access, no special tools. Motorcraft VCT solenoids (part 8L3Z-6M280-B) are ~$30-40 each. Some owners report phaser tick disappearing after solenoid replacement alone. Troubleshooting order: (1) clean engine with Auto-RX or Seafoam, (2) replace VCT solenoids, (3) if tick persists, then phasers. This diagnostic ladder has saved owners thousands.",
    "consensusFix": "Remove VCT solenoids from valve covers, inspect screens for sludge, clean or replace. Use Motorcraft 8L3Z-6M280-B solenoids. Follow the diagnostic ladder: flush oil system, replace solenoids, then phasers only if tick persists.",
    "ownerTips": [
      "VCT solenoids sit on top of valve covers — 10mm bolt, 10-minute job per side.",
      "The tiny mesh screens clog with sludge and starve phasers of oil — check these FIRST.",
      "Motorcraft VCT solenoid 8L3Z-6M280-B is $30-40 each — cheap insurance.",
      "Diagnostic ladder: (1) oil flush with Auto-RX or Seafoam, (2) new VCT solenoids, (3) phasers last.",
      "Some owners report phaser tick vanishing after just solenoid replacement — saves $2K+.",
      "If screens are full of sludge, shorten your oil change interval immediately.",
      "Never use Dorman VCT solenoids — Motorcraft only for this part."
    ],
    "recommendedParts": ["Motorcraft VCT solenoid 8L3Z-6M280-B", "Auto-RX engine cleaner", "Seafoam engine treatment"],
    "aliases": ["VCT solenoid", "solenoid screen", "phaser tick cheap fix", "oil sludge fix", "cam phaser diagnostic"],
    "issueAreaIds": ["cam_phaser_tick_context"],
    "partIds": ["vct_solenoid", "cam_phaser_area"],
    "symptomIds": ["ticking", "rattle"],
    "systemIds": ["timing_valvetrain", "engine_mechanical"],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-f150forum-roller-follower-replacement",
    "source": "f150forum",
    "title": "Roller follower (rocker arm) inspection and replacement",
    "url": "https://www.f150forum.com/f4/anyone-replace-roller-followers-recently-513290/",
    "topic": "timing_valvetrain",
    "summary": "The 5.4 3V uses roller followers (rocker arms) that ride directly on the cam lobes. When oil quality degrades or phasers wear, the roller followers lose their coating and score the cam lobes — leading to catastrophic head damage. Ford part 3L3Z-6564-BA for the followers, 5L1Z-6500-A for lash adjusters. Full set is 24 pieces. Inspection during valve cover removal: look for shiny wear spots or flat spots on the roller surface. If even one is damaged, replace all 24 and inspect cam lobes. This is a known cascade failure from deferred phaser repairs.",
    "consensusFix": "Inspect roller followers during any valve cover removal. Look for worn coatings, flat spots, or scoring. If any are damaged, replace all 24 followers and all lash adjusters. Inspect cam lobes for scoring — scored lobes mean head removal.",
    "ownerTips": [
      "Ford roller follower part: 3L3Z-6564-BA — buy a full set of 24.",
      "Ford lash adjuster part: 5L1Z-6500-A — replace all when doing followers.",
      "A collapsed lash adjuster sounds like a loud single-cylinder tick — different from phaser rattle.",
      "Roller follower failure is a cascade from neglected cam phasers and dirty oil.",
      "If one follower is worn, all 24 are suspect — they share the same oil and same age.",
      "Check cam lobes while followers are out — scoring means the cam is done.",
      "This job requires valve cover removal only — about 2-3 hours per side for DIY."
    ],
    "recommendedParts": ["Ford roller followers 3L3Z-6564-BA (set of 24)", "Ford lash adjusters 5L1Z-6500-A (set of 24)"],
    "aliases": ["rocker arm replacement", "roller follower", "lash adjuster", "valve tick single cylinder", "cam lobe wear"],
    "issueAreaIds": ["cam_phaser_tick_context"],
    "partIds": ["cam_phaser_area"],
    "symptomIds": ["ticking"],
    "systemIds": ["timing_valvetrain", "engine_mechanical"],
    "recommendation": "SHOP_REQUIRED"
  },
  {
    "id": "forum-f150forum-coolant-crossover-leak",
    "source": "f150forum",
    "title": "Coolant crossover and thermostat housing leak — plastic intake problem",
    "url": "https://www.f150forum.com/f4/intake-manifold-coolant-crossover-leak-469191/",
    "topic": "cooling",
    "summary": "The plastic intake manifold on the 5.4 3V delaminates at the coolant crossover tube due to heat cycles. The plastic groove that seats the crossover gasket literally erodes away. Symptoms: slow coolant loss with no visible puddle, sweet smell from engine bay, white residue around the crossover area. Fixing requires pulling the complete intake manifold (~4 hours). Dorman replacement intakes are known to fail again — the plastic self-tapping screw holes strip. Use Ford OEM intake (or a used one in good condition) with new Motorcraft crossover gaskets.",
    "consensusFix": "Pull intake manifold, replace crossover tube and gaskets with Motorcraft parts. Inspect the plastic intake for delamination — if the gasket groove is gone, replace the intake. DO NOT use Dorman replacement intake — the plastic screw holes strip.",
    "ownerTips": [
      "Sweet coolant smell with no visible leak usually means the crossover gasket is seeping.",
      "The plastic intake groove for the crossover gasket erodes from heat cycles — Ford design flaw.",
      "Dorman replacement intakes use self-tapping screws instead of brass inserts — they strip and leak again.",
      "Ford OEM intake has brass nut inserts — much more durable than aftermarket.",
      "Budget ~4 hours for intake removal and crossover repair.",
      "While the intake is off, clean the throttle body and check vacuum lines — free labor.",
      "The PCV connection on Dorman intakes is different and often leaks — another reason to avoid Dorman."
    ],
    "recommendedParts": ["Ford OEM intake manifold", "Motorcraft crossover gasket set", "Motorcraft thermostat"],
    "aliases": ["coolant crossover leak", "thermostat housing leak", "intake manifold crack", "coolant loss no visible leak", "plastic intake failure"],
    "issueAreaIds": ["coolant_leak_source", "cooling_reservoir_and_hose_seep"],
    "partIds": ["thermostat_housing", "coolant_hose", "intake_tube"],
    "symptomIds": ["coolant_smell", "leak"],
    "systemIds": ["cooling", "engine_mechanical"],
    "recommendation": "INSPECT_ONLY"
  },
  {
    "id": "forum-f150forum-throttle-body-maf-cleaning",
    "source": "f150forum",
    "title": "Throttle body and MAF sensor cleaning — free rough idle fix",
    "url": "https://www.f150forum.com/f72/how-clean-your-throttle-body-maf-75006/",
    "topic": "fuel_air_metering",
    "summary": "Carbon and oil vapor buildup in the throttle body and on the MAF sensor is a major cause of rough idle and P0506 codes on the 5.4 3V. The 3V engine has no true PCV valve — just open vents on the valve covers with a restrictor plate. This means oil vapor constantly coats the throttle body interior. Cleaning is free (throttle body cleaner spray + toothbrush) and takes 30 minutes. After cleaning, the ECU must relearn idle: start engine, let it reach operating temp with AC and radio off for 1 minute, then drive 10 miles at varied speeds.",
    "consensusFix": "Remove throttle body (4 bolts), clean interior with throttle body cleaner and toothbrush. Clean MAF sensor with MAF-specific cleaner only (never throttle body cleaner on MAF). Perform idle relearn procedure after reassembly.",
    "ownerTips": [
      "The 5.4 3V has no true PCV valve — just open valve cover vents — so oil vapor constantly dirties the TB.",
      "Use throttle body cleaner spray and a toothbrush — costs under $5 in supplies.",
      "NEVER use throttle body cleaner on the MAF sensor — use CRC MAF Sensor Cleaner only.",
      "After cleaning, idle relearn: engine on, reach operating temp, AC/radio off, idle 1 minute, drive 10 miles.",
      "P0506 (idle air control below expected) is often just a dirty throttle body — not a bad IAC.",
      "Clean the throttle body every 30K miles as preventive maintenance.",
      "If idle is still rough after cleaning, check for vacuum leaks at the intake boot and PCV hoses."
    ],
    "recommendedParts": ["CRC Throttle Body Cleaner", "CRC MAF Sensor Cleaner", "New throttle body gasket"],
    "aliases": ["throttle body cleaning", "MAF cleaning", "rough idle fix free", "P0506 fix", "idle relearn"],
    "issueAreaIds": ["intake_vacuum_air_leak"],
    "partIds": ["throttle_body", "maf_sensor", "intake_tube"],
    "symptomIds": ["rough_idle"],
    "systemIds": ["fuel_air_metering", "engine_mechanical"],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-f150forum-catch-can-pcv-system",
    "source": "f150forum",
    "title": "Oil catch can debate — when it helps and when it doesn't",
    "url": "https://www.f150forum.com/f4/dual-pcv-catch-can-install-2004-f150-5-4l-3v-374176/",
    "topic": "engine_mechanical",
    "summary": "The 5.4 3V has no traditional PCV valve — it uses open valve cover vents with a restrictor plate, similar to European designs. This sends unfiltered crankcase vapors directly into the intake, coating valves and throttle body with oil sludge. An SAE study showed catch cans reduce intake valve carbon buildup by up to 50%. Community consensus: worth installing on trucks under 100K miles for long-term benefit. At 200K miles, installing one is 'closing the barn door after the horse left.' Empty the can every 200-500 miles — expect water and light oil. Mishimoto and UPR are the most recommended brands.",
    "consensusFix": "Install a dual-port oil catch can on the PCV and CCV lines. Empty every 200-500 miles. Best value when installed early in engine life. At high mileage, clean the existing intake carbon first, then install catch can to prevent further buildup.",
    "ownerTips": [
      "The 5.4 3V has NO PCV valve — just restrictor plates and open vents on valve covers.",
      "Catch cans collect a surprising amount of water and oil vapor — check every 200-500 miles.",
      "Install before 100K miles for maximum benefit — after 200K it's too late to prevent existing damage.",
      "Clean throttle body and intake manifold BEFORE installing a catch can on a high-mileage engine.",
      "Mishimoto and UPR Products are the most-recommended brands on F-150 forums.",
      "Dual-port setup (PCV + CCV) catches more than single-port.",
      "If you don't want a catch can, at minimum clean the throttle body every 30K miles."
    ],
    "recommendedParts": ["Mishimoto direct-fit catch can", "UPR Plug N Play catch can", "Catch can drain valve kit"],
    "aliases": ["catch can", "PCV upgrade", "oil separator", "crankcase ventilation", "intake carbon prevention"],
    "issueAreaIds": ["intake_vacuum_air_leak"],
    "partIds": ["intake_tube", "throttle_body"],
    "symptomIds": ["rough_idle"],
    "systemIds": ["engine_mechanical", "fuel_air_metering"],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-f150forum-high-mileage-survival-guide",
    "source": "f150forum",
    "title": "Making the 5.4 3V last past 200K — survival guide",
    "url": "https://www.f150forum.com/f2/how-many-miles-5-4-triton-good-286335/",
    "topic": "engine_mechanical",
    "summary": "Compiled from multiple mega-threads: what separates 5.4 3V engines that die at 150K from those that reach 300K+. The #1 killer is deferred oil changes — sludge clogs VCT solenoid screens, starves phasers, destroys roller followers, then scores cams. The #1 survival factor is 3K-5K mile oil changes with quality oil and filter. Other survival items: trans service every 30K (MERCON LV only), diff fluid every 50K, coolant flush every 5 years, spark plugs at 60K (with anti-seize for next time), and proactive VCT solenoid replacement at 100K.",
    "consensusFix": "Oil changes every 3K-5K miles (full synthetic preferred above 100K). Transmission service every 30K miles (MERCON LV, never flush). Diff fluid every 50K. Coolant every 5 years. Spark plugs at 60K. VCT solenoids at 100K. Catch can or throttle body cleaning every 30K.",
    "ownerTips": [
      "The #1 thing that kills 5.4 3V engines is deferred oil changes — nothing else comes close.",
      "3K-5K mile oil changes with quality filter is the difference between 150K and 300K+ mile engines.",
      "Once phaser tick starts and you ignore it, the cascade is: phasers > followers > cam lobes > engine.",
      "If the truck was not maintained by prior owners, do an engine flush (Auto-RX) before shortening intervals.",
      "Trans fluid: MERCON LV only. MERCON V will destroy the 6R80. Service every 30K, never power flush above 100K.",
      "Proactively replace VCT solenoids at 100K miles — $60-80 in parts, 20 minutes labor, prevents $3K+ phaser job.",
      "After a timing job, the engine can last another 150K+ miles — these bottom ends are stout.",
      "Once common issues are resolved, 300K-400K miles is achievable with disciplined maintenance."
    ],
    "recommendedParts": ["Full synthetic 5W-20 oil (NEVER 5W-30)", "Motorcraft FL-820S or Wix 51372XP filter", "Motorcraft VCT solenoid 8L3Z-6M280-B"],
    "aliases": ["high mileage tips", "200K mile tips", "longevity guide", "engine survival", "preventive maintenance"],
    "issueAreaIds": ["cam_phaser_tick_context"],
    "partIds": ["cam_phaser_area", "vct_solenoid", "spark_plug"],
    "symptomIds": ["ticking", "rattle"],
    "systemIds": ["engine_mechanical", "timing_valvetrain"],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-f150forum-spark-plug-dealer-overcharge",
    "source": "f150forum",
    "title": "Spark plug replacement — dealer overcharge and DIY savings",
    "url": "https://www.f150forum.com/f11/money-cost-tune-up-2006-xlt-5-4-triton-82252/",
    "topic": "ignition",
    "summary": "Dealers quote $500-900 for a spark plug change on the 5.4 3V, with 'broken plug surcharges' of $50-150 per plug that breaks. DIY cost: ~$100-120 in Motorcraft SP-515 plugs. The critical technique: soak with PB Blaster 24 hours before, warm engine to full operating temperature, 1/8 turn break-and-retighten technique. Ford settled a $2.2M class action in 2015 over the 2-piece plug design (2004-2008 models). The Lisle 65600 broken plug extractor ($30) is essential insurance. 2008+ revised heads use conventional-style plugs (Motorcraft SP-509) — verify by engine build date, not model year.",
    "consensusFix": "DIY with Motorcraft SP-515 plugs, PB Blaster penetrant (soak 24hr), warm engine, 1/8 turn technique. Have Lisle 65600 extractor on hand. Torque new plugs to 25 lb-ft with Motorcraft XL-2 nickel anti-seize on the ground electrode shield only. Total DIY cost: ~$130-150 vs $500-900 dealer.",
    "ownerTips": [
      "Dealer quotes $500-900 for plug change — DIY cost is $100-130 in parts plus $30 for the Lisle tool.",
      "Dealers add $50-150 per broken plug as a surcharge — the Lisle 65600 pays for itself on the first one.",
      "Soak plugs with PB Blaster for 24 hours before removal — this is the most important step.",
      "Run the engine to full operating temp before removal — aluminum expansion loosens the carbon bond.",
      "1/8 turn, re-tighten, 1/4 turn, re-tighten — patience saves plugs.",
      "NEVER use an impact wrench — you WILL snap the plug shell off.",
      "2008+ revised heads use SP-509 plugs (conventional style) — check engine build date on the door sticker.",
      "Ford settled a class action over the 2-piece plug design — $2.2M in 2015.",
      "Rear passenger-side plugs are the hardest — use a 3/8 wobble extension and a universal joint.",
      "Apply anti-seize to the ground electrode shield ONLY — not the threads (Ford spec)."
    ],
    "recommendedParts": ["Motorcraft SP-515 spark plugs", "Lisle 65600 broken plug extractor", "PB Blaster penetrating oil", "Motorcraft XL-2 nickel anti-seize", "3/8 wobble extension"],
    "aliases": ["plug change cost", "dealer rip-off plugs", "broken plug extraction", "SP-515 install", "tune-up cost"],
    "issueAreaIds": ["ignition_misfire_path"],
    "partIds": ["spark_plug", "coil"],
    "symptomIds": ["misfire"],
    "systemIds": ["ignition", "engine_mechanical"],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-f150forum-while-youre-in-there",
    "source": "f150forum",
    "title": "Timing job — the 'while you're in there' parts list",
    "url": "https://www.f150forum.com/f6/timing-chain-replacement-other-parts-change-while-5-4-apart-461883/",
    "topic": "engine_mechanical",
    "summary": "A timing job on the 5.4 3V exposes the entire front of the engine. Forum consensus on what to replace at the same time to avoid paying for the same labor access twice: water pump (same cover area), oil pump + pickup tube O-ring (requires pan drop anyway for tensioner access), thermostat and housing, valve cover gaskets (Fel-Pro VS50902R), all cam/valve cover gaskets, and timing cover gasket. Some owners also do coolant hoses and the serpentine belt/tensioner. Do NOT open the cooling system while the timing cover is off — risk of coolant contamination.",
    "consensusFix": "During a timing job, also replace: water pump, oil pump (Melling M340HV), pickup tube O-ring, thermostat, valve cover gaskets (Fel-Pro VS50902R), timing cover gasket, and serpentine belt + tensioner. Change oil immediately after job completion.",
    "ownerTips": [
      "A timing job is $2-4K in labor — don't pay for the same access twice by skipping wear items.",
      "Water pump: do it during timing job — same front cover access. Don't open cooling system until cover is back on.",
      "Oil pump + pickup tube O-ring: do it — you already have pan access for the tensioners.",
      "Valve cover gaskets: Fel-Pro VS50902R kit includes spark plug tube seals and grommets.",
      "Thermostat: $15 part, already exposed — no reason to skip it.",
      "Serpentine belt and tensioner: right there in your face — replace them.",
      "Do a complete oil change with fresh filter IMMEDIATELY after timing job — metal debris from chain wear.",
      "Some owners do two oil changes in the first 500 miles after timing work to flush debris.",
      "Do NOT open the cooling system while the timing cover is removed — risk of coolant entering oil passages."
    ],
    "recommendedParts": ["Fel-Pro VS50902R valve cover gasket kit", "Motorcraft water pump", "Melling M340HV oil pump", "Motorcraft thermostat", "Serpentine belt and tensioner"],
    "aliases": ["timing job parts list", "while you're in there", "front cover job", "timing chain extras", "labor sharing"],
    "issueAreaIds": ["cam_phaser_tick_context", "accessory_drive_belt_path"],
    "partIds": ["cam_phaser_area", "timing_cover", "belt", "tensioner", "thermostat_housing"],
    "symptomIds": ["rattle", "ticking"],
    "systemIds": ["timing_valvetrain", "engine_mechanical", "cooling", "accessory_drive"],
    "recommendation": "SHOP_REQUIRED"
  },
  {
    "id": "forum-f150forum-6r80-deep-service-guide",
    "source": "f150forum",
    "title": "6R80 transmission — deep service guide and fluid debate",
    "url": "https://www.f150forum.com/f38/6r80-completed-transmission-fluid-change-363494/",
    "topic": "drivetrain_4wd",
    "summary": "The 6R80 has no traditional dipstick — level is checked through an overflow tube at operating temperature. Pan drop gets ~7 quarts of the 13.1 total. The double drain-and-fill technique (two services 500 miles apart) exchanges ~75% of fluid. MERCON LV (XT-10-QLVC) ONLY — MERCON V or ULV will destroy the transmission. The pan magnet collects normal metallic debris — fine powder is OK, chunks mean trouble. Pan bolts: 89 lb-in (NOT lb-ft). Use a welding glove when checking level — the cat converter will burn you. Motorcraft FT-188 filter. Service every 30K miles for a transmission that outlasts the engine.",
    "consensusFix": "Drop pan, replace Motorcraft FT-188 filter, clean magnet, refill with ~7 quarts MERCON LV (XT-10-QLVC). Drive 500 miles, do second drain-and-fill. Pan bolts: 89 lb-in. Check level with engine running at operating temp through overflow tube.",
    "ownerTips": [
      "MERCON LV only — part number XT-10-QLVC. MERCON V will destroy the 6R80.",
      "MERCON ULV is wrong viscosity for the 6R80 — that's for the 10R80.",
      "No dipstick — check level through overflow tube with engine running at operating temp.",
      "Pan bolts: 89 lb-IN (inch-pounds), not lb-ft — over-torquing warps the pan and causes leaks.",
      "Use a welding glove or heat glove — the catalytic converter will burn your hand.",
      "Fine metallic powder on the pan magnet is normal. Chunks or flakes mean internal damage.",
      "Double drain-and-fill (500 miles apart) exchanges ~75% of fluid — good enough.",
      "NEVER power flush a 6R80 above 100K miles — dislodges debris into valve body.",
      "Service every 30K miles — the 'lifetime fluid' claim is dealer mythology.",
      "Fill procedure: 4.5 qt with engine off, run 30 seconds, add 1.5 qt, test drive to temp, top off."
    ],
    "recommendedParts": ["Motorcraft MERCON LV XT-10-QLVC (7+ quarts)", "Motorcraft FT-188 transmission filter", "6R80 pan gasket"],
    "aliases": ["6R80 service guide", "trans fluid change", "MERCON LV procedure", "transmission maintenance", "no dipstick check"],
    "issueAreaIds": [],
    "partIds": [],
    "symptomIds": ["vibration"],
    "systemIds": ["drivetrain_4wd"],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-f150forum-differential-service",
    "source": "f150forum",
    "title": "Front and rear differential fluid service — intervals and specs",
    "url": "https://www.f150forum.com/f4/correct-differential-fluid-245899/",
    "topic": "drivetrain_4wd",
    "summary": "Ford claims the rear diff is 'lubed for life' with synthetic — many experienced owners strongly disagree. Rear diff (limited slip): Motorcraft 75W-140 synthetic (XY-75W140-QL) plus friction modifier (XL-3) for LS units. Front diff (4WD): Motorcraft 75W-90. Ford doesn't include the front diff in the scheduled maintenance guide, but forum consensus is every 50K miles for the rear (30K if towing) and 60K-100K for the front. Aggressive owners do rear every 30K and front every 60K. If the rear diff whines, the fluid is already overdue.",
    "consensusFix": "Rear diff: drain and fill with Motorcraft 75W-140 synthetic (XY-75W140-QL) + 4 oz friction modifier (XL-3) for limited-slip units. Front diff: Motorcraft 75W-90. Service rear every 50K (30K if towing), front every 60-100K.",
    "ownerTips": [
      "Ford says 'lifetime fluid' for the rear diff — forum consensus says that's wrong.",
      "Rear diff: Motorcraft SAE 75W-140 synthetic (XY-75W140-QL) — must add friction modifier XL-3 for limited-slip.",
      "Front diff: Motorcraft 75W-90 — different spec from rear, don't mix them up.",
      "If you tow regularly, service the rear diff every 30K miles instead of 50K.",
      "The rear diff fill plug is the most annoying bolt on the truck — use a 3/8 ratchet drive directly.",
      "A whining rear diff means the fluid is already degraded — don't wait.",
      "If the rear end chatters in tight turns, it needs friction modifier — not a rebuild."
    ],
    "recommendedParts": ["Motorcraft 75W-140 synthetic XY-75W140-QL", "Motorcraft friction modifier XL-3", "Motorcraft 75W-90 (front diff)"],
    "aliases": ["diff fluid change", "differential service", "rear end fluid", "limited slip additive", "friction modifier"],
    "issueAreaIds": ["drivetrain_leak_or_boot"],
    "partIds": ["differential_cover"],
    "symptomIds": ["vibration", "clunk"],
    "systemIds": ["drivetrain_4wd"],
    "recommendation": "DIY_SAFE"
  },
  {
    "id": "forum-f150forum-exhaust-manifold-stud-strategy",
    "source": "fordtrucks",
    "title": "Exhaust manifold broken stud strategy — extraction and prevention",
    "url": "https://www.ford-trucks.com/forums/1452230-my-triton-tick-rusted-exhaust-manifold-leak-broken-bolt-fix-and-story-pic-heavy.html",
    "topic": "exhaust_emissions",
    "summary": "Broken exhaust manifold studs are almost inevitable on high-mileage 5.4 trucks. The passenger side rear studs are worst — tight against the firewall. Extraction methods ranked by forum success rate: (1) weld a nut onto the broken stud (most reliable for flush breaks), (2) center-drill + EZ-Out for sub-flush breaks, (3) Time-Sert or Heli-Coil for damaged threads. Always replace ALL studs on the bank — the survivors are heat-fatigued and will break next. Dorman makes replacement manifolds with bolts instead of studs — considered an improved design. Heat the area with a propane torch before extraction attempts.",
    "consensusFix": "For flush breaks: weld a nut onto the stud and back it out. For sub-flush: center-drill and EZ-Out. For damaged threads: Time-Sert M8 repair kit. Replace ALL studs on the bank. Consider Dorman manifold with bolt design for permanent upgrade.",
    "ownerTips": [
      "Welding a nut onto the broken stud is the most reliable extraction method — better than EZ-Outs.",
      "Replace ALL studs on the bank, not just the broken one — the rest are heat-fatigued.",
      "Passenger side rear studs are the worst — minimal clearance to firewall.",
      "Heat the area around the broken stud with propane torch before any extraction attempt.",
      "Dorman makes manifolds with bolts instead of studs — considered an improvement over Ford's stud design.",
      "Time-Sert M8 kit is the nuclear option for destroyed threads — more reliable than Heli-Coil.",
      "Apply anti-seize to new studs/bolts — you or the next owner will thank you.",
      "A ticking sound that fades when warm but returns when cold is often a manifold leak, not cam phasers."
    ],
    "recommendedParts": ["Dorman exhaust manifold bolt kit", "Time-Sert M8 thread repair kit", "ARP exhaust studs", "Anti-seize compound"],
    "aliases": ["broken exhaust stud", "stud extraction", "manifold tick fix", "exhaust bolt repair", "Time-Sert repair"],
    "issueAreaIds": ["exhaust_manifold_tick"],
    "partIds": ["exhaust_manifold"],
    "symptomIds": ["exhaust_tick", "ticking"],
    "systemIds": ["exhaust_emissions", "engine_mechanical"],
    "recommendation": "SHOP_REQUIRED"
  },
  {
    "id": "forum-f150forum-150k-preventive-strategy",
    "source": "fordtrucks",
    "title": "150K mile preventive replacement strategy — what to replace proactively",
    "url": "https://www.ford-trucks.com/forums/1560912-2010-f150-150k-preventative-replacements.html",
    "topic": "engine_mechanical",
    "summary": "At 150K miles on a 5.4, the community recommends proactive replacement of: fuel pump (stranding risk), starter motor (heat-soaked location shortens life), alternator (common failure around 150K), all accessory drive components (belt, tensioner, idler), coolant hoses (especially lower radiator hose which collapses internally), and thermostat. Water pump and power steering pump are run-to-symptom items — they usually give warning before failing. The biggest money-pit trap: spending $5K+ on individual repairs when a $3K reman engine would be more cost-effective.",
    "consensusFix": "At 150K miles, proactively replace: fuel pump assembly, starter motor, alternator, serpentine belt + tensioner + idler, all coolant hoses, and thermostat. Water pump and PS pump: monitor but don't preemptively replace.",
    "ownerTips": [
      "Fuel pump: replace proactively — failure strands the truck with no warning.",
      "Starter motor: lives in a heat-soaked location and commonly fails around 150K.",
      "Alternator: common failure around 150K — replace before it leaves you stranded.",
      "Lower radiator hose can collapse internally (inner liner deteriorates) while looking fine outside.",
      "Belt + tensioner + idler: $50-80 in parts, prevents catastrophic belt failure.",
      "Coolant hoses: feel for soft spots and bulges — replace all if any are suspect.",
      "Water pump and power steering pump usually give warning (noise, weeping) — don't preemptively replace.",
      "The money-pit trap: if individual repair costs exceed $3K, a reman engine or reman transmission may be more economical.",
      "Before a long road trip at high mileage, replace accessory drive items as insurance."
    ],
    "recommendedParts": ["Fuel pump assembly", "Starter motor", "Alternator", "Serpentine belt + tensioner + idler kit", "Complete coolant hose set", "Motorcraft thermostat"],
    "aliases": ["150K preventive", "proactive replacement", "high mileage checklist", "road trip prep", "wear items"],
    "issueAreaIds": ["accessory_drive_belt_path", "battery_charge_and_ground_path"],
    "partIds": ["battery", "alternator_area", "belt", "idler_pulley", "tensioner", "coolant_hose", "thermostat_housing"],
    "symptomIds": ["dead_battery", "chirp", "squeal"],
    "systemIds": ["charging", "accessory_drive", "cooling", "fuel_air_metering", "engine_mechanical"],
    "recommendation": "INSPECT_ONLY"
  },
  {
    "id": "forum-f150forum-parts-to-never-buy-aftermarket",
    "source": "f150forum",
    "title": "Parts to NEVER buy aftermarket — the Dorman and cheap parts blacklist",
    "url": "https://www.f150forum.com/f4/5-4l-3v-cam-phaser-timing-replacement-281839/",
    "topic": "engine_mechanical",
    "summary": "Compiled from years of forum pain: parts where aftermarket quality is unacceptable and Motorcraft/OEM is the only safe choice. Dorman is specifically called out for cam phasers (universally condemned), intake manifolds (self-tapping screws strip), VCT solenoids (poor screen quality), and spark plug thread repair kits (break on install). Cloyes tensioners have blown seals. Cheap Amazon coil packs fail within months. The only aftermarket parts the community trusts: Melling oil pumps, Fel-Pro gaskets, Wix oil filters, CRC cleaners, and Lisle specialty tools.",
    "consensusFix": "Use Motorcraft/Ford OEM for: cam phasers, VCT solenoids, coil packs (DG-521), spark plugs (SP-515/SP-509), intake manifold, fuel pump driver module, transmission filter (FT-188). Acceptable aftermarket: Melling (oil pumps, timing kits), Fel-Pro (gaskets), Wix (oil filters), Denso (coils). NEVER: Dorman (valvetrain, intake), cheap Amazon coils, generic timing kits.",
    "ownerTips": [
      "Dorman cam phasers: universally condemned on every F-150 forum — do not even consider them.",
      "Dorman intake manifolds: self-tapping screws instead of brass inserts — they strip and leak.",
      "Dorman VCT solenoids: poor screen quality leads to repeat sludge issues.",
      "Dorman spark plug thread repair kits: reported breaking on install — use Time-Sert instead.",
      "Cheap Amazon coil packs: 'misfire lottery' — high failure rates within months.",
      "Cloyes timing chain tensioners: blown seal reports — pair Cloyes chains with Motorcraft tensioners.",
      "Trusted aftermarket brands: Melling (oil pumps), Fel-Pro (gaskets), Wix (filters), CRC (cleaners), Lisle (tools).",
      "The price difference between Dorman and Motorcraft is usually $20-50 per part — not worth the risk.",
      "If you can't afford Motorcraft timing parts, use Melling (USA-made) — never go cheaper."
    ],
    "recommendedParts": ["Motorcraft (OEM) for all critical engine parts", "Melling (oil pumps, timing kits)", "Fel-Pro (gaskets)", "Wix (oil filters)"],
    "aliases": ["parts blacklist", "Dorman avoid", "bad aftermarket", "OEM vs aftermarket", "trusted brands"],
    "issueAreaIds": ["cam_phaser_tick_context", "ignition_misfire_path"],
    "partIds": ["cam_phaser_area", "vct_solenoid", "coil", "spark_plug", "intake_tube"],
    "symptomIds": ["misfire", "ticking", "rattle", "rough_idle"],
    "systemIds": ["engine_mechanical", "timing_valvetrain", "ignition", "fuel_air_metering"],
    "recommendation": "INSPECT_ONLY"
  }
] satisfies TruckForumKnowledgeEntry[];
