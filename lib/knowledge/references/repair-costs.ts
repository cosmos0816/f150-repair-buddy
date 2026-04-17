import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const REPAIR_COST_REFERENCES = [
  {
    "id": "repair-cost-reference-repair-cost-alternator-replacement",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Alternator Replacement cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": [
      "battery_charge_and_ground_path",
      "accessory_drive_belt_path"
    ],
    "partTags": [
      "alternator_area",
      "battery",
      "belt"
    ],
    "symptomTags": [
      "dead_battery",
      "squeal"
    ],
    "aliases": [
      "alternator repair",
      "charging repair",
      "alternator swap"
    ],
    "excerpt": "Alternator Replacement usually lands around $540-$680 total, with labor around $134-$197 and parts around $406-$484.",
    "inspectionHint": "Use the live inspection to confirm alternator replacement is justified before ordering parts.",
    "sourceCitationKey": "repair-cost-alternator-replacement",
    "sourceUrl": "https://repairpal.com/estimator/ford/f-150/2010/alternator-replacement-cost"
  },
  {
    "id": "repair-cost-reference-repair-cost-spark-plug-replacement",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Spark Plug Replacement cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": [
      "ignition_misfire_path"
    ],
    "partTags": [
      "spark_plug",
      "coil"
    ],
    "symptomTags": [
      "misfire",
      "rough_idle"
    ],
    "aliases": [
      "plug job",
      "spark plug service",
      "plug replacement 5.4"
    ],
    "excerpt": "Spark Plug Replacement usually lands around $328-$425 total, with labor around $207-$304 and parts around $120.",
    "inspectionHint": "Use the live inspection to confirm spark plug replacement is justified before ordering parts.",
    "sourceCitationKey": "repair-cost-spark-plug-replacement",
    "sourceUrl": "https://repairpal.com/estimator/ford/f-150/2010/spark-plug-replacement-cost"
  },
  {
    "id": "repair-cost-reference-repair-cost-water-pump-replacement",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Water Pump Replacement cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": [
      "coolant_leak_source",
      "cooling_reservoir_and_hose_seep"
    ],
    "partTags": [
      "thermostat_housing",
      "coolant_hose",
      "radiator_hose"
    ],
    "symptomTags": [
      "leak",
      "coolant_smell"
    ],
    "aliases": [
      "water pump job",
      "pump replacement",
      "coolant pump replacement"
    ],
    "excerpt": "Water Pump Replacement usually lands around $867-$998 total, with labor around $254-$373 and parts around $613-$625.",
    "inspectionHint": "Use the live inspection to confirm water pump replacement is justified before ordering parts.",
    "sourceCitationKey": "repair-cost-water-pump-replacement",
    "sourceUrl": "https://repairpal.com/estimator/ford/f-150/water-pump-replacement-cost"
  },
  {
    "id": "repair-cost-reference-repair-cost-battery-replacement",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Battery Replacement cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": [
      "battery_terminal_corrosion",
      "battery_charge_and_ground_path"
    ],
    "partTags": [
      "battery",
      "battery_terminal",
      "ground_point"
    ],
    "symptomTags": [
      "dead_battery",
      "corrosion"
    ],
    "aliases": [
      "battery swap",
      "new battery",
      "battery service"
    ],
    "excerpt": "Battery Replacement usually lands around $247-$264 total, with labor around $37-$54 and parts around $210.",
    "inspectionHint": "Use the live inspection to confirm battery replacement is justified before ordering parts.",
    "sourceCitationKey": "repair-cost-battery-replacement",
    "sourceUrl": "https://repairpal.com/estimator/ford/f-150/2010/battery-replacement-cost"
  },
  {
    "id": "repair-cost-reference-repair-cost-brake-bleed",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Brake Bleed cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": [
      "brake_hose_or_line_concern"
    ],
    "partTags": [
      "brake_line",
      "brake_hose",
      "caliper_area"
    ],
    "symptomTags": [
      "pull",
      "leak"
    ],
    "aliases": [
      "brake fluid service",
      "brake hydraulic bleed",
      "bleed brakes"
    ],
    "excerpt": "Brake Bleed usually lands around $61-$90 total, with labor around $61-$90 and parts around $0.",
    "inspectionHint": "Use the live inspection to confirm brake bleed is justified before ordering parts.",
    "sourceCitationKey": "repair-cost-brake-bleed",
    "sourceUrl": "https://repairpal.com/estimator/ford/f-150/2010/brake-bleed-cost"
  },
  {
    "id": "repair-cost-reference-cam-phaser-replacement",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Cam Phaser & Timing Chain Replacement cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": ["cam_phaser_tick_context"],
    "partTags": ["cam_phaser_area", "timing_cover", "vct_solenoid"],
    "symptomTags": ["rattle", "ticking"],
    "aliases": ["cam phaser job", "phaser replacement", "timing chain job", "VCT repair"],
    "excerpt": "Cam Phaser & Timing Chain complete job usually lands around $1,800-$3,500 total. Parts $400-$800 (complete kit with phasers, chains, guides, tensioners, VCT solenoids). Labor $1,400-$2,700 (10-15 hours). Always do both banks and timing chains together.",
    "inspectionHint": "Confirm cold-start rattle and VCT deviation on scan tool before committing to this major repair.",
    "sourceCitationKey": "repair-cost-cam-phaser-replacement"
  },
  {
    "id": "repair-cost-reference-exhaust-manifold-stud",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Exhaust Manifold Stud Extraction & Repair cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": ["exhaust_manifold_tick"],
    "partTags": ["exhaust_manifold"],
    "symptomTags": ["exhaust_tick", "ticking"],
    "aliases": ["exhaust stud repair", "broken stud extraction", "manifold bolt repair"],
    "excerpt": "Exhaust Manifold Stud Repair usually lands around $400-$1,500 per side. Stud extraction + new hardware $200-$500. If manifold cracked, Dorman replacement manifold with bolts $200-$350. Labor $200-$1,000. Passenger side is more labor-intensive due to firewall proximity.",
    "inspectionHint": "Look for black soot streaks at manifold-to-head joint to confirm broken studs before ordering parts.",
    "sourceCitationKey": "repair-cost-exhaust-manifold-stud"
  },
  {
    "id": "repair-cost-reference-blend-door-actuator",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Blend Door Actuator Replacement cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": [],
    "partTags": [],
    "symptomTags": [],
    "aliases": ["blend door repair", "HVAC actuator replacement", "clicking dash repair"],
    "excerpt": "Blend Door Actuator Replacement usually lands around $50-$200 total DIY, $200-$500 at a shop. Part: $15-$50 (Dorman 604-252 or Motorcraft YH-1779). Labor: $100-$400 depending on which actuator. Driver-side temperature actuator is most accessible.",
    "inspectionHint": "Identify which actuator is clicking before ordering — there are 3-4 actuators in the system.",
    "sourceCitationKey": "repair-cost-blend-door-actuator"
  },
  {
    "id": "repair-cost-reference-fpdm-replacement",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Fuel Pump Driver Module Replacement cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": [],
    "partTags": ["fuel_pump_driver_module"],
    "symptomTags": ["misfire", "rough_idle"],
    "aliases": ["FPDM replacement", "fuel module repair", "fuel pump driver repair"],
    "excerpt": "Fuel Pump Driver Module Replacement usually lands around $100-$300 total. Part: $60-$150 (Dorman 590-001 or Motorcraft). Labor: $50-$100 (easy job — 2 bolts, 1 connector on frame rail). Apply dielectric grease to connector to prevent future corrosion.",
    "inspectionHint": "Check FPDM on driver-side frame rail near spare tire for corrosion before replacing.",
    "sourceCitationKey": "repair-cost-fpdm-replacement"
  },
  {
    "id": "repair-cost-reference-throttle-body-replacement",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Throttle Body Replacement cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": ["intake_vacuum_air_leak"],
    "partTags": ["throttle_body", "intake_tube"],
    "symptomTags": ["rough_idle"],
    "aliases": ["throttle body repair", "ETC replacement", "electronic throttle replacement"],
    "excerpt": "Throttle Body Replacement usually lands around $250-$500 total. Part: $150-$300 (Motorcraft 9W7Z-9E926-A or Dorman 977-600). Labor: $100-$200. Try cleaning first ($10 DIY). After replacement, perform idle relearn: key on (don't start) 30 sec, key off 30 sec, start and idle 3 min.",
    "inspectionHint": "Try cleaning the throttle body with CRC cleaner before committing to replacement.",
    "sourceCitationKey": "repair-cost-throttle-body-replacement"
  },
  {
    "id": "repair-cost-reference-ignition-coil-replacement",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Ignition Coil Replacement cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": ["ignition_misfire_path"],
    "partTags": ["coil", "spark_plug"],
    "symptomTags": ["misfire", "rough_idle"],
    "aliases": ["coil replacement", "COP replacement", "ignition coil swap"],
    "excerpt": "Ignition Coil Replacement usually lands around $40-$80 per coil. Part: Motorcraft DG-521 $35-$55 each. Full set of 8: $200-$500 parts + $100-$300 labor. DIY is easy — one bolt (8mm), one connector per coil. Always do a coil swap test first to confirm which coil is bad.",
    "inspectionHint": "Swap the suspect coil to another cylinder first — if the misfire follows the coil, replace it.",
    "sourceCitationKey": "repair-cost-ignition-coil-replacement"
  },
  {
    "id": "repair-cost-reference-transmission-service",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "6R80 Transmission Fluid & Filter Service cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": [],
    "partTags": [],
    "symptomTags": ["vibration"],
    "aliases": ["trans fluid change", "transmission service", "6R80 service", "mercon lv change"],
    "excerpt": "6R80 Transmission Fluid & Filter Service usually lands around $200-$350 total. Fluid: Motorcraft MERCON LV (XT-10-QLVC) ~$8-12/qt, need ~7 qt for pan drop. Filter: Motorcraft FT-188 $25-$45. Labor: $100-$200. NEVER use MERCON V or Dexron. Recommend service every 30,000 miles for longevity.",
    "inspectionHint": "If the truck shudders at 35-50 mph, a fluid and filter change is the cheapest first step.",
    "sourceCitationKey": "repair-cost-transmission-service"
  },
  {
    "id": "repair-cost-reference-front-brake-job",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Front Brake Pad & Rotor Replacement cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": ["brake_hose_or_line_concern"],
    "partTags": ["caliper_area", "brake_hose", "brake_line"],
    "symptomTags": [],
    "aliases": ["front brake job", "brake pad replacement", "rotor replacement", "front brakes"],
    "excerpt": "Front Brake Pad & Rotor Replacement usually lands around $250-$500 total. Pads: Motorcraft BRF-1414 or Wagner QC1414 $30-$80. Rotors: $40-$80 each. Labor: $150-$300. Front caliper bracket torque: 166 lb-ft. Slide pins: 24 lb-ft. Lug nuts: 150 lb-ft star pattern, re-torque at 100 miles.",
    "inspectionHint": "Inspect rotor thickness and pad remaining material before deciding on pad-only vs pad+rotor replacement.",
    "sourceCitationKey": "repair-cost-front-brake-job"
  },
  {
    "id": "repair-cost-reference-ball-joint-replacement",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Ball Joint Replacement cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": ["front_suspension_joint_play"],
    "partTags": ["ball_joint", "control_arm"],
    "symptomTags": ["clunk", "pull", "vibration"],
    "aliases": ["ball joint repair", "lower ball joint", "upper ball joint", "front end repair"],
    "excerpt": "Ball Joint Replacement usually lands around $200-$500 per side. Upper ball joint: Moog K80026 $25-$60 (bolt-in). Lower ball joint: Moog K80149 $30-$70 (press-fit, requires ball joint press). Labor: $150-$400 per side. Upper ball joint nut: 46 lb-ft. Lower ball joint nut: 111 lb-ft. New cotter pins required.",
    "inspectionHint": "Jack the front wheel and check for play at 12 and 6 o'clock positions to confirm worn ball joints.",
    "sourceCitationKey": "repair-cost-ball-joint-replacement"
  },
  {
    "id": "repair-cost-reference-hub-bearing-replacement",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Front Wheel Hub/Bearing Assembly Replacement cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": ["front_suspension_joint_play"],
    "partTags": ["ball_joint", "control_arm"],
    "symptomTags": ["vibration", "rattle"],
    "aliases": ["wheel bearing replacement", "hub assembly", "front hub", "bearing noise"],
    "excerpt": "Front Hub/Bearing Assembly Replacement usually lands around $200-$450 per side. Part: Timken SP580310 or Moog 515119 $80-$180. Labor: $150-$300. Hub bolts torque: 20 lb-ft + 90°. A humming noise that changes with turning direction is the classic symptom of a failing hub bearing.",
    "inspectionHint": "Listen for humming that gets louder on turns — louder turning left = right bearing, louder turning right = left bearing.",
    "sourceCitationKey": "repair-cost-hub-bearing-replacement"
  },
  {
    "id": "repair-cost-reference-o2-sensor-replacement",
    "sourceType": "repair_note",
    "sourceLabel": "Repair Cost Summary",
    "title": "Oxygen Sensor Replacement cost range",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [],
    "issueAreaIds": [],
    "partTags": ["oxygen_sensor_connector"],
    "symptomTags": [],
    "aliases": ["O2 sensor replacement", "oxygen sensor", "lambda sensor", "upstream O2", "downstream O2"],
    "excerpt": "Oxygen Sensor Replacement usually lands around $100-$250 per sensor. Upstream (Motorcraft DY-1401): $50-$120. Downstream (Motorcraft DY-1402): $40-$80. Labor: $50-$150 per sensor. Requires 22mm O2 sensor socket. Use penetrating oil — sensors often seize in the bung.",
    "inspectionHint": "Address any misfire or vacuum leak codes BEFORE replacing O2 sensors — they may be reporting correctly.",
    "sourceCitationKey": "repair-cost-o2-sensor-replacement"
  }
] satisfies TruckReferenceRecord[];
