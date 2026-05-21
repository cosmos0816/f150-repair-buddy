// HVAC deep-dive reference for 12th-gen F-150 (2009-2014).
//
// HVAC complaints — especially blend door actuator clicking — are the
// single most-reported interior issue on this platform. This file documents
// actuators, blower system, compressor/condenser/evaporator, heater core,
// climate control heads, refrigerant service, and the most common owner
// mistakes. Korean sourcing notes included.
//
// Type-system note: `cabin_controls` is the closest TruckSystemId for HVAC.
// There are no purpose-built TruckPartId values for actuators/compressor/
// blower yet, so we reuse `connector`, `vacuum_line`, `coolant_hose` etc.
// where the issue overlaps an existing part tag, and otherwise leave
// `partTags: []`. issueAreaIds are left empty where no good match exists.
//
// Part numbers tagged with `// VERIFY` need a second cross-check before
// being quoted as authoritative to an owner.

import {
  F150_GENERAL_VEHICLE_ID,
  SUPPORTED_VEHICLE_ID,
} from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const HVAC_DEEP_REFERENCES: TruckReferenceRecord[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // BLEND DOOR ACTUATORS — the famous F-150 HVAC issue
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-actuator-overview-12th-gen",
    sourceType: "known_issue",
    sourceLabel: "HVAC Deep Reference",
    title: "Blend door actuator system overview — 4 to 6 actuators per truck",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["ticking", "rattle"],
    aliases: [
      "blend door actuator overview",
      "HVAC actuator count",
      "F-150 actuator failure",
      "dash clicking",
      "stepper motor HVAC",
    ],
    excerpt:
      "Every 2009-2014 F-150 uses small electric stepper-motor actuators to position the doors inside the HVAC plenum. Manual 3-knob system (XL/STX): 3 actuators — temperature blend, mode (vent/floor/defrost), and recirculation. Single-zone EATC (XLT): 4 actuators (adds a separate defrost door on some configurations). Dual-zone EATC (Lariat / King Ranch / FX4 with leather pkg / Platinum): 5 actuators — driver blend, passenger blend, mode, recirc, and defrost. Tri-zone (Platinum/Limited with rear climate): 6 actuators (adds rear blend). Each actuator is a small ~3 inch plastic motor with a 5-pin connector, screwed to the HVAC plenum behind the dash. Internal nylon gears strip from repeated travel against a stuck door or simply from wear after 80,000-150,000 km. Once one fails, others usually follow within 1-2 years because they are the same age and run the same duty cycle.",
    inspectionHint:
      "Count actuators by trim before ordering — a Lariat needs 5 different part numbers between mode, recirc, driver blend, passenger blend, and defrost. Buying the 'wrong side' actuator is the #1 owner mistake.",
    sourceCitationKey: "hvac-actuator-overview-12th-gen",
  },
  {
    id: "hvac-driver-blend-actuator-yh1779",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Part",
    title: "Driver-side temperature blend actuator — Motorcraft YH-1779",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["ticking", "rattle"],
    aliases: [
      "YH-1779",
      "YH1779",
      "driver blend actuator",
      "driver temperature actuator",
      "driver side blend door",
      "AA5Z-19E616-A", // VERIFY — Ford engineering number for YH-1779
    ],
    excerpt:
      "Driver-side temperature blend door actuator. Motorcraft part YH-1779 (Ford engineering AA5Z-19E616-A // VERIFY). Controls the blend door that mixes heater-core air with evaporator air on the driver side of the plenum. When the internal nylon gear strips, the driver-side vents stuck on one temperature (typically cold-only, since the spring tends to default the door to evap position). Replacement: $25-40 OEM, $12-20 Dorman 604-925 aftermarket (covers both driver blend and recirc on some kits — confirm Dorman listing for exact application). Location: behind the radio / center stack, on the driver side of the HVAC plenum. DIY difficulty 7/10 — radio bezel and lower dash trim must come off; some shops also pull the steering column lower cover for working room. Two 5.5mm or 7mm screws hold the actuator, then disconnect the 5-pin connector.",
    inspectionHint:
      "If driver-side vents only blow cold (or only blow hot) and you hear a click-click-click from behind the radio when adjusting driver temperature, this is the actuator.",
    sourceCitationKey: "hvac-driver-blend-actuator-yh1779",
  },
  {
    id: "hvac-passenger-blend-actuator-yh1778",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Part",
    title: "Passenger-side temperature blend actuator — Motorcraft YH-1778",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["ticking", "rattle"],
    aliases: [
      "YH-1778",
      "YH1778",
      "passenger blend actuator",
      "passenger temperature actuator",
      "passenger side blend door",
      "dual zone passenger actuator",
    ],
    excerpt:
      "Passenger-side temperature blend door actuator. Motorcraft part YH-1778. Only fitted on dual-zone and tri-zone systems — XL/STX manual single-zone trucks do NOT have this actuator. Symptoms when failed: passenger blows cold while driver blows hot (or vice versa). Location: behind the glove box, on the passenger side of the HVAC plenum. THIS IS THE MOST DIY-ACCESSIBLE ACTUATOR on the truck — drop the glove box (squeeze the sides in past the stops) and the actuator is right there. 20-minute job for an experienced DIYer, 45 minutes the first time. Dorman 604-926 is the common aftermarket alternative ($15-25). Same 5-pin connector, same mounting screws as the driver-side YH-1779.",
    inspectionHint:
      "Open the glove box, squeeze the sides past the stops to let it drop fully — the passenger blend actuator is the small black motor visible on the right side of the HVAC plenum, screwed in horizontally.",
    sourceCitationKey: "hvac-passenger-blend-actuator-yh1778",
  },
  {
    id: "hvac-mode-actuator-yh1777",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Part",
    title: "Mode door actuator (vent/floor/defrost) — Motorcraft YH-1777",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["ticking", "rattle"],
    aliases: [
      "YH-1777",
      "YH1777",
      "mode door actuator",
      "vent floor defrost actuator",
      "HVAC mode selector",
      "dashboard mode stuck",
    ],
    excerpt:
      "Mode door actuator. Motorcraft part YH-1777. Drives the door that selects between vent (face), bi-level, floor, mix (floor+defrost), and defrost outlets. When the mode actuator fails, air gets stuck at one outlet regardless of the selector — most often stuck at defrost (because that is the spring-default 'safe' position for windshield defogging). This is the actuator owners most often blame for 'my A/C only blows out the windshield.' Location: center of the HVAC plenum, accessed by removing the lower dash panel under the radio. Slightly harder access than the passenger blend actuator. DIY 7/10. Same Dorman alternative family as the other actuators — confirm 'mode' specifically before ordering.",
    inspectionHint:
      "If selecting vent, floor, or defrost on the climate control all produce the same airflow path, the mode door is stuck — either the door binds or the actuator gears stripped.",
    sourceCitationKey: "hvac-mode-actuator-yh1777",
  },
  {
    id: "hvac-recirc-actuator",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Part",
    title: "Recirculation door actuator — separate small actuator",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["ticking", "rattle"],
    aliases: [
      "recirc actuator",
      "recirculation actuator",
      "fresh air vent actuator",
      "outside air door",
      "HVAC intake door",
    ],
    excerpt:
      "Recirculation door actuator (sometimes called outside-air door actuator). Smaller than the blend/mode actuators. Drives the door that selects between cabin recirculation and outside-fresh-air intake. Common Motorcraft number is in the YH series // VERIFY — many Ford parts catalogs list it under engineering number 9L3Z-19E616-A // VERIFY. Failure symptoms: A/C cools poorly because the door is stuck in fresh-air position (hot outside air bypassing recirc), or windshield fogs because the door is stuck in recirc. Location: top of the HVAC plenum on the passenger side, above the blower motor — accessed from below by dropping the glove box and looking up. Sometimes you must remove the cabin air filter housing to get a tool on the screws. DIY 6/10.",
    inspectionHint:
      "Press the recirc button on the climate control. You should hear a soft door flap inside the dash from the passenger side and feel a small change in blower tone. If pressing recirc does nothing, the actuator or wiring is bad.",
    sourceCitationKey: "hvac-recirc-actuator",
  },
  {
    id: "hvac-actuator-symptoms-clicking",
    sourceType: "nhtsa_tsb_summary",
    sourceLabel: "NHTSA Owner Complaints Summary",
    title: "'Clicking sound from dash' — NHTSA's famous F-150 HVAC complaint",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["ticking", "rattle"],
    aliases: [
      "clicking sound from dash",
      "dashboard clicking",
      "HVAC clicking",
      "NHTSA HVAC complaint",
      "blend door clicking on startup",
      "buzzing behind glove box",
      "grinding behind dash",
    ],
    excerpt:
      "Hundreds of NHTSA complaints on 2009-2014 F-150s describe a rhythmic clicking, ticking, or grinding sound from behind the dashboard, often loudest on cold startup or when the climate setting changes. This is a 100% blend door actuator gear-strip pattern — not a transmission, not the steering column, not the radio. The clicking is the actuator motor still running but with a stripped tooth slipping past the door's gear segment. Owners often misdiagnose it as a 'rat in the dash' or 'computer noise.' Three diagnostic confirmations: (1) sound is rhythmic 1-3 Hz, not random; (2) starts or stops when you change the climate setting; (3) goes away when you turn the ignition off. Multiple actuators can fail simultaneously — listen with the engine off and ignition on, then cycle each control (temp, mode, recirc) to isolate which actuator is making the noise.",
    inspectionHint:
      "With ignition on and engine off, change temperature from full cold to full hot — if clicking starts, listen carefully: passenger glove box area = YH-1778, driver radio area = YH-1779. Then cycle mode and recirc separately to test the other actuators.",
    sourceCitationKey: "hvac-actuator-symptoms-clicking",
    supportingCounts: {
      nhtsaComplaints: 200, // VERIFY exact count — order of magnitude correct
      forumThreads: 500,
    },
  },
  {
    id: "hvac-actuator-dtc-codes",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — DTC",
    title: "Blend door actuator DTC codes — B1252, B1253, B1273, B1276, B1277",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["ticking"],
    aliases: [
      "B1252",
      "B1253",
      "B1273",
      "B1276",
      "B1277",
      "blend door codes",
      "HVAC body codes",
      "EATC fault codes",
    ],
    excerpt:
      "Body-control DTCs from the EATC module pointing at actuator faults: B1252 — temperature blend actuator circuit fault. B1253 — temperature blend actuator stall (motor cannot reach commanded position — door binding or gear stripped). B1273 — recirculation actuator fault. B1276 — mode actuator circuit. B1277 — mode actuator stall. (Codes vary slightly by model year and EATC firmware — codes above are the common set across 2009-2014 // VERIFY exact code-to-actuator mapping per FORScan logs.) Generic OBD2 readers (the cheap $20 dongles) usually CANNOT read body-control B-codes. Use FORScan (free PC software, requires VLINKER MC or OBDLINK EX adapter, ~$50) which is specifically designed for Ford module-level codes including EATC. Some codes self-clear after the actuator is replaced and the system performs its self-calibration sweep; others need a manual clear with FORScan.",
    inspectionHint:
      "Cheap OBD2 dongles will not read EATC body codes. Plan on FORScan + a Ford-capable adapter for HVAC diagnostics on this truck.",
    sourceCitationKey: "hvac-actuator-dtc-codes",
  },
  {
    id: "hvac-actuator-replacement-procedure",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Procedure",
    title: "Blend door actuator replacement procedure — DIY 7/10",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["ticking"],
    aliases: [
      "blend door actuator replacement",
      "how to replace blend door actuator",
      "F-150 actuator install",
      "actuator replacement procedure",
    ],
    excerpt:
      "General actuator R&R: (1) Disconnect battery negative (avoids triggering airbag faults during dash work). (2) For passenger blend (YH-1778): drop glove box past its stops — done. For driver blend (YH-1779) or mode (YH-1777): remove the radio surround bezel (clips, no screws on most years), the lower dash trim under the radio, and on some trucks the steering-column lower cover for working clearance. (3) Disconnect the 5-pin connector from the failed actuator. (4) Remove two screws (5.5mm or 7mm hex head) holding the actuator to the plenum. (5) Pull straight out — the actuator shaft engages a slot in the door pivot, no fasteners on the door itself. (6) Align the new actuator's shaft to the door slot (some actuators self-calibrate on first power-up, others need the door in a known position — read the package). (7) Reinstall in reverse. (8) Reconnect battery, turn ignition on, run the climate through all settings — the EATC will sweep all actuators and re-zero them. Shop labor: $200-400. Total DIY job time: 30-90 min depending on which actuator and your dash-trim experience.",
    inspectionHint:
      "Mark the door's resting position with a pen before pulling the old actuator — some replacements do not auto-calibrate and need to start in the same position the old one ended in.",
    safetyNote:
      "Disconnect the battery before reaching behind the dash near the airbag wiring — accidental contact with the yellow SRS connectors can store a fault code and require dealer clear.",
    sourceCitationKey: "hvac-actuator-replacement-procedure",
  },
  {
    id: "hvac-actuator-aftermarket-dorman",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Aftermarket",
    title: "Dorman aftermarket actuators — 604-925, 604-926, OEM equivalents",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["ticking"],
    aliases: [
      "Dorman 604-925",
      "Dorman 604-926",
      "aftermarket blend door actuator",
      "non-Motorcraft actuator",
      "cheap actuator F-150",
    ],
    excerpt:
      "Aftermarket alternatives to Motorcraft YH-series actuators. Dorman 604-925 (driver-side) and 604-926 (passenger-side) are the common owner choices at roughly half the Motorcraft price. Dorman also sells mode and recirc actuators under different 604-xxx numbers — confirm position before ordering. Quality reports: Dorman first-generation actuators had higher early-failure rates, but the current 'Plus' series has acceptable longevity. Avoid no-brand actuators from generic listings — they use weaker plastic gears and tend to fail within 12-18 months. Four Seasons and ACDelco also make compatible units. Owner rule of thumb: if your truck is over 200,000 km and one actuator failed, plan to replace at least the adjacent one (same plenum, same age, same duty cycle) at the same time. Motorcraft YH actuators have the longest reported lifespan; Dorman is fine for budget builds; everything else is risky.",
    inspectionHint:
      "Confirm 'driver' vs 'passenger' on the listing before ordering — they look identical but the gear-clock position is different and the wrong side will not seat correctly on the door pivot.",
    sourceCitationKey: "hvac-actuator-aftermarket-dorman",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // A/C COMPRESSOR
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-ac-compressor-54l",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — A/C",
    title: "A/C compressor (5.4L Triton) — Motorcraft 4F1Z-19703-AA // VERIFY",
    vehicleScope: SUPPORTED_VEHICLE_ID,
    systemTags: ["cabin_controls", "accessory_drive"],
    issueAreaIds: [],
    partTags: ["belt", "tensioner"],
    symptomTags: ["squeal", "leak"],
    aliases: [
      "4F1Z-19703-AA", // VERIFY — number is plausible for the family but cross-check parts catalog
      "A/C compressor 5.4",
      "Triton compressor",
      "Sanden compressor",
      "Mitsubishi compressor",
      "AC clutch",
    ],
    excerpt:
      "5.4L Triton A/C compressor. Motorcraft service part 4F1Z-19703-AA // VERIFY — Ford changed the compressor supplier mid-cycle (Sanden early production, Mitsubishi later in the 2009-2014 run; the Visteon family also appears on some VINs), so always confirm against the VIN-specific Ford parts catalog before ordering. Refrigerant: R134a only — this generation predates R1234yf. Common failures: (1) clutch coil burns out at 150,000+ km — A/C stops engaging, clutch face shows oil smear. (2) Internal valve plate cracks — low cooling capacity even with proper charge. (3) Bearing failure — squeal that follows engine RPM only when A/C is on. (4) Catastrophic seizure — locks the serpentine belt and can throw it. Replacement cost: $200-400 reman, $400-700 new OEM. ALWAYS replace the accumulator/drier and orifice tube when changing the compressor and flush the lines — debris from a failed compressor will kill the new one in weeks.",
    inspectionHint:
      "Stand at the front of the truck with A/C on max. Watch the compressor clutch (small front face of the compressor) cycle on and off. If the clutch never engages, it is electrical (low refrigerant pressure switch, clutch coil, or relay). If it engages but you hear bearing growl, the compressor is going.",
    safetyNote:
      "Refrigerant under pressure can blind you if a line lets go in your face. Always wear eye protection when working near the A/C system, even when 'just looking.'",
    sourceCitationKey: "hvac-ac-compressor-54l",
  },
  {
    id: "hvac-ac-compressor-ecoboost",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — A/C",
    title: "A/C compressor (3.5L EcoBoost) — different part from 5.4 // VERIFY",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "turbo_boost"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["squeal", "leak"],
    aliases: [
      "EcoBoost A/C compressor",
      "3.5 EcoBoost AC",
      "F-150 EcoBoost compressor",
      "BL3Z-19703-A", // VERIFY — common EcoBoost-era engineering number
    ],
    excerpt:
      "3.5L EcoBoost trucks (2011-2014) use a different A/C compressor than the 5.4L due to different bracket mounting and accessory drive routing around the turbos. Common engineering number is BL3Z-19703-A // VERIFY against parts catalog. Refrigerant is still R134a (Ford did not transition the F-150 to R1234yf until later generations). The EcoBoost compressor is mounted lower and is harder to access — passenger side, below the intake manifold, behind the lower intercooler piping on some configurations. Plan on more shop labor than the 5.4 install ($350-500 labor vs $250-350 on the 5.4). 5.0 Coyote-equipped 2011-2014 F-150s use yet another bracket — three engines, three different part numbers, all the same refrigerant.",
    inspectionHint:
      "Do not assume a '2012 F-150' compressor listing fits — always filter the parts site by engine (5.0 / 5.4 / 3.5 EcoBoost / 6.2) before ordering.",
    sourceCitationKey: "hvac-ac-compressor-ecoboost",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // HEATER CORE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-heater-core",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Heater Core",
    title: "Heater core — buried behind dash, huge labor charge if it leaks",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "cooling"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["coolant_hose", "thermostat_housing"],
    symptomTags: ["leak", "coolant_smell"],
    aliases: [
      "heater core",
      "heater core leak",
      "sweet smell in cab",
      "fogging windshield",
      "wet driver carpet coolant",
      "heater core replacement",
    ],
    excerpt:
      "The heater core is a small radiator-like aluminum/brass unit inside the HVAC plenum that warms cabin air with engine coolant. It is buried behind the entire dash. Symptoms of failure: (1) sweet maple-syrup smell inside the cabin, strongest when heat is on; (2) damp or wet front carpet on the driver-side floor (coolant drips out of the plenum drain or onto the carpet); (3) windshield fogs with an oily film that does not wipe clean; (4) coolant level slowly drops with no visible underhood leak; (5) cool air from heater even when engine is up to temp. Replacement requires nearly full dash removal — steering column drop, instrument cluster out, console out, dash bolts. Ford labor flat rate is in the 8-12 hour range. Part itself is $50-100. Shop cost: $800-1500 total. DO NOT ignore early heater-core leak signs — once coolant soaks the carpet, it damages the floor-mounted body control modules and corrodes the floor pan.",
    inspectionHint:
      "If you smell sweet coolant inside the cab and the windshield fogs with oily film, do NOT keep driving with the heat on — the heater core is starting to leak.",
    safetyNote:
      "Ethylene glycol is sweet but toxic. Pets and kids must not lick wet carpet. Clean any spilled coolant immediately with soap and water, not just blotting.",
    sourceCitationKey: "hvac-heater-core",
  },
  {
    id: "hvac-heater-core-bypass-temporary",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Workaround",
    title: "Heater core bypass — temporary workaround, NOT a fix",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "cooling"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["coolant_hose"],
    symptomTags: ["leak", "coolant_smell"],
    aliases: [
      "heater core bypass",
      "loop heater hoses",
      "heater core delete",
      "summer heater bypass",
    ],
    excerpt:
      "If the heater core is leaking and full replacement isn't immediately possible, you can bypass it by connecting the two heater hoses at the firewall directly to each other with a short rubber U-pipe. This stops the cabin leak and lets you drive — but you lose all heat and defrost capacity (defrost still works for moisture if A/C compressor is functional and dehumidifying, but it will not warm). This is acceptable in summer in mild climates, dangerous in winter (no defrost = poor visibility). The bypass also slightly affects coolant flow — most engines don't notice, but high-load towing in summer with the bypass can run a few degrees hotter. NEVER leave the bypass in for more than a season — schedule the full repair.",
    inspectionHint:
      "Both heater hoses enter the firewall on the passenger side of the engine bay, behind the engine. Bypass = cap them together with a short hose and two clamps.",
    safetyNote:
      "No heater core = no defrost heat in winter. Windshield fog buildup in cold weather becomes a safety hazard — do not use this bypass for daily winter driving.",
    sourceCitationKey: "hvac-heater-core-bypass-temporary",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // A/C CONDENSER
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-ac-condenser",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — A/C",
    title: "A/C condenser — front-mounted, vulnerable to rock damage",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["leak"],
    aliases: [
      "A/C condenser",
      "AC condenser leak",
      "rock damage condenser",
      "front condenser",
      "condenser replacement",
    ],
    excerpt:
      "The A/C condenser is the heat exchanger at the very front of the truck, sandwiched in front of the radiator. It rejects heat from the refrigerant to outside air. Two failure modes: (1) ROCK DAMAGE — small stones penetrate the thin aluminum fins and tubes, creating slow refrigerant leaks. Common on highway-driven F-150s. (2) AGE/VIBRATION — solder joints at the inlet/outlet manifolds crack after 10+ years. Symptoms: A/C cools weakly, low refrigerant on gauge set, UV dye trace shows green-yellow staining on the condenser face, oil film around the manifold connections. Part cost: $80-200 aftermarket, $250-400 OEM. Labor: $200-400 including evacuation, recharge, and a new accumulator/drier (always replace the drier when opening the system). DIY possible — the front bumper grille and condenser brackets must come off. Plan for refrigerant recovery at a shop before disassembly (venting R134a is illegal in most countries, including Korea).",
    inspectionHint:
      "Shine a UV light at the front of the condenser through the grille — green-yellow glow indicates a refrigerant leak (assuming the system has UV dye in it, which most do after any prior service).",
    safetyNote:
      "Never disconnect a charged A/C line without first recovering refrigerant at a shop. Refrigerant blast can cause frostbite and is illegal to vent.",
    sourceCitationKey: "hvac-ac-condenser",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // EVAPORATOR
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-evaporator",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — A/C",
    title: "Evaporator — inside HVAC box, dash-out repair if it leaks",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["leak", "hiss"],
    aliases: [
      "evaporator",
      "evap core",
      "AC evaporator leak",
      "hissing under dash",
      "evap replacement",
    ],
    excerpt:
      "The evaporator is inside the HVAC plenum behind the dash — the cold side of the A/C system where refrigerant absorbs cabin heat. Failures are less common than condenser but much more expensive when they happen: full dash removal required to access the evaporator core. Symptoms: (1) A/C cools poorly even with proper refrigerant charge initially, then loses charge over weeks; (2) hissing or gurgling sound under the dash with A/C on; (3) sweet/musty smell from vents (oil-laden refrigerant evaporating); (4) refrigerant level drops with no visible underhood leak. Diagnostic: UV dye + UV lamp, or electronic refrigerant sniffer at the evaporator drain (under the truck, passenger side firewall). Part: $80-200. Labor: $1,000-1,800 — same job depth as a heater core replacement. Total job cost easily exceeds $1,500 with refrigerant, drier, and labor. Some owners switch to a fresh used truck rather than do an evaporator job on a high-mileage F-150.",
    inspectionHint:
      "Look under the truck on the passenger side firewall for the small black plastic A/C condensate drain tube — drip from it during A/C use is normal, refrigerant oil residue is not.",
    sourceCitationKey: "hvac-evaporator",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BLOWER MOTOR + RESISTOR
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-blower-motor-yh1872",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Blower",
    title: "Blower motor — Motorcraft YH-1872, behind glove box",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["squeal", "rattle"],
    aliases: [
      "YH-1872",
      "YH1872",
      "blower motor",
      "HVAC fan motor",
      "blower noise",
      "fan motor squeak",
    ],
    excerpt:
      "HVAC blower motor — the squirrel-cage fan motor that pushes air through the HVAC box and out the vents. Motorcraft part YH-1872. Located behind/below the glove box on the passenger side. Failure modes: (1) bearing wear — squeak, squeal, or growl that scales with fan speed and goes away when blower is off; (2) brush wear — fan stops on one or more speed settings; (3) debris ingestion — leaves and pine needles fall down the cowl drain into the blower, causing rattle and reduced airflow; (4) winding failure — fan dead on all speeds. Part cost: $30-50 aftermarket, $60-100 Motorcraft. Replacement: drop the glove box, remove the blower motor cover (3-4 screws), unplug the connector, drop the motor. 30-minute DIY job — easiest A/C-system repair on the truck. Pull the cabin air filter at the same time to check it.",
    inspectionHint:
      "Run the blower through all fan speeds with A/C off. Squeal that follows fan RPM and disappears when you turn the blower off = motor bearing.",
    sourceCitationKey: "hvac-blower-motor-yh1872",
  },
  {
    id: "hvac-blower-resistor",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Blower",
    title: "Blower motor resistor — 4F1Z-19A706-AA, common failure",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "4F1Z-19A706-AA", // VERIFY — number is in the right family but cross-check year
      "blower resistor",
      "fan resistor",
      "blower speed control",
      "blower high only",
      "blower low only",
      "HVAC resistor pack",
    ],
    excerpt:
      "Blower motor resistor — controls fan speed on manual-control systems by stepping voltage to the blower motor. Motorcraft engineering 4F1Z-19A706-AA // VERIFY (some years use a slightly different part number — manual-control trucks vs EATC-equipped trucks differ; EATC trucks use a solid-state Blower Motor Control Module instead of a discrete resistor pack). FAMOUS FAILURE: classic symptom is 'blower works on high (4) but not on low/medium (1-3)' or 'blower works on 1 and 2 only' — the soldered resistor wires burn out one position at a time. Less commonly, all speeds fail simultaneously. Part cost: $30-50. Location: behind the glove box near the blower motor, often two 5.5mm screws and a 4-pin connector. 30-min DIY job. EATC trucks: the Blower Motor Control Module (BMCM, solid-state) is a different part ($80-150) but lives in the same general area.",
    inspectionHint:
      "If blower works on HIGH but not on LOW (or vice versa), it is the resistor — never the motor. A fully-failed motor doesn't run on any speed.",
    sourceCitationKey: "hvac-blower-resistor",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLIMATE CONTROL HEAD
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-climate-control-heads-by-trim",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Climate Head",
    title: "Climate control head variants by trim — manual / single / dual / tri",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "climate control head",
      "HVAC control panel",
      "EATC head",
      "manual climate XL",
      "dual zone control",
      "YH-1907", // VERIFY — part family is plausible but exact PN varies by year and trim
    ],
    excerpt:
      "Four climate control head variants on the 2009-2014 F-150: (1) MANUAL 3-KNOB (XL, STX, base XLT) — three rotary dials, temp / fan speed / mode, no electronics, no LCD. Cheapest and most reliable. (2) SINGLE-ZONE EATC (XLT chrome package, FX2) — single small LCD displaying one cabin temperature setpoint, AUTO mode, push-button mode selection. (3) DUAL-ZONE EATC (Lariat, King Ranch, FX4 with leather, Platinum) — two LCDs side-by-side, independent driver/passenger temps. THE MOST COMMON CONTROL HEAD on optioned trucks. (4) TRI-ZONE (Platinum and Limited with rear-climate option, some Raptor) — dual-zone front + rear control panel on back of center console. Motorcraft service part for dual-zone is in the YH-1907 family // VERIFY exact number per year. Failure modes: LCD pixels go dim or dead after 7-10 years; backlighting fails; one zone's buttons stop responding while the other side works. Used heads from LKQ $150-400. CRITICAL: match year carefully — 2009-2010 and 2011-2014 use different connector pinouts after the mid-cycle dash refresh.",
    inspectionHint:
      "Before ordering a used climate control head, confirm the connector pinout against your truck's harness — early (2009-2010) and late (2011-2014) trucks are NOT interchangeable.",
    sourceCitationKey: "hvac-climate-control-heads-by-trim",
  },
  {
    id: "hvac-mft-climate-integration",
    sourceType: "ford_tsb",
    sourceLabel: "HVAC Deep Reference — SYNC 2 / MFT",
    title: "MyFord Touch climate integration — TSB 12-11-5 and freeze issues",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "MyFord Touch climate",
      "MFT HVAC",
      "SYNC 2 climate",
      "touchscreen climate freeze",
      "TSB 12-11-5",
    ],
    excerpt:
      "Lariat+ trims from 2011-2014 with MyFord Touch (Ford's internal name for the SYNC 2 era touchscreen) integrate climate control INTO the touchscreen — the bottom-left corner of the 8 inch screen is dedicated to climate. There is still a backup physical control row (hard buttons for fan, defrost, AUTO) below the screen, but most settings require touching the screen. PROBLEM: when MFT freezes or reboots (a common 2011-2014 complaint addressed by Ford TSB 12-11-5 and multiple firmware updates), you temporarily lose touchscreen climate control until the system recovers. The hard-button backup row still works for basic on/off and fan speed during a freeze, but you cannot change dual-zone temps or recirc. Firmware update to version 3.10 (last released MFT firmware, 2015) drastically reduces freezing — every MFT-equipped F-150 should be on 3.10. Free update at owner.ford.com via USB stick install.",
    inspectionHint:
      "If your truck has MFT, check the firmware version from the Settings > General menu. Anything below 3.10 should be updated — it is free and improves stability.",
    sourceCitationKey: "hvac-mft-climate-integration",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // A/C LINES, REFRIGERANT, SERVICE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-refrigerant-spec-r134a",
    sourceType: "owner_manual",
    sourceLabel: "Owner Manual / Ford Spec",
    title: "Refrigerant: R134a, 1.4-1.6 lb charge (635-725 g)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "R134a",
      "AC refrigerant spec",
      "F-150 refrigerant capacity",
      "1.4 lb refrigerant",
      "1.6 lb refrigerant",
      "PAG oil spec",
    ],
    excerpt:
      "All 2009-2014 F-150s use R134a refrigerant. Ford did NOT use R1234yf on this generation — R1234yf appeared on the F-150 line later. Factory charge spec is 1.4-1.6 lb (635-725 g) // VERIFY exact spec on the underhood A/C label, which is the authoritative source for your specific truck/year/A/C option. Compressor lubricant is PAG-46 oil (do not use PAG-100 or mineral oil — PAG-46 only). Refrigerant capacity is printed on the underhood A/C label, usually on the radiator support or hood underside near the latch. NEVER overcharge — too much refrigerant raises high-side pressure and reduces cooling. NEVER use 'cold-shot' cans with sealant or stop-leak additives; they kill compressors and contaminate shop recovery equipment, leading to a refused refrigerant service.",
    inspectionHint:
      "Find the underhood A/C decal (white sticker near radiator support or hood underside). It shows refrigerant type and exact charge weight for YOUR truck — this is the only correct spec.",
    safetyNote:
      "DO NOT use sealant cans (e.g. 'A/C Pro Stop Leak'). They void shop service and damage components. If you have low refrigerant, find the leak.",
    sourceCitationKey: "hvac-refrigerant-spec-r134a",
  },
  {
    id: "hvac-ac-service-procedure",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Service",
    title: "A/C service procedure: recover, vacuum, hold, recharge",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "A/C service procedure",
      "AC vacuum down",
      "AC recharge procedure",
      "evacuate AC system",
      "30 minute vacuum",
      "AC service ports",
    ],
    excerpt:
      "Proper A/C service order: (1) RECOVER any remaining refrigerant with a shop recovery machine — venting is illegal. (2) Repair the leak / replace the failed component. (3) Replace the accumulator (drier) any time the system is opened — desiccant absorbs moisture and is single-use. (4) Replace the orifice tube if it has been in service many years. (5) VACUUM the system to at least 29 inches Hg and HOLD that vacuum for 30 minutes — if vacuum drops, there is still a leak; do not proceed. (6) Recharge to the underhood label spec by WEIGHT (1.4-1.6 lb), not by gauge pressure or sight glass — only weight is accurate. Use a scale, not a 'recharge can with gauge.' Service ports: HIGH-pressure port on the larger-diameter line near the compressor discharge; LOW-pressure port on the smaller line near the accumulator (passenger side firewall area). Ports use Schrader valves under blue (low) and red (high) caps. NEVER connect a single-can recharge kit to the HIGH side — the gauge can burst.",
    inspectionHint:
      "If A/C performance is poor, the FIRST diagnostic is gauge readings AND verified charge weight — not just topping off from a can. Many 'low refrigerant' cars are actually overcharged.",
    safetyNote:
      "Cheap recharge cans connect to the low-pressure port only. Never force-fit one to the high-pressure port — it will rupture violently.",
    sourceCitationKey: "hvac-ac-service-procedure",
  },
  {
    id: "hvac-ac-lines-accumulator",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — A/C",
    title: "A/C lines and accumulator (drier) — replace drier with every service",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["leak"],
    aliases: [
      "high pressure line",
      "low pressure line",
      "accumulator",
      "AC drier",
      "receiver drier",
      "AC service lines",
      "orifice tube",
    ],
    excerpt:
      "A/C line and component overview: (1) HIGH-PRESSURE LINE — runs from the compressor discharge to the condenser inlet. Smaller diameter (5/16 inch). Pressures of 200-300 psi running, 400+ on hot days. (2) LOW-PRESSURE LINE — runs from evaporator outlet back to compressor suction. Larger diameter (1/2 inch). Pressures of 25-45 psi running. (3) ACCUMULATOR (drier) — cylindrical canister on the low-side line near the passenger firewall on F-150. Contains desiccant beads that absorb water from the system. Must be replaced any time the system is opened to atmosphere, otherwise the new desiccant becomes saturated within hours and starts forming acid that destroys the compressor. (4) ORIFICE TUBE — small metering device in the line between the condenser and evaporator (F-150 uses an orifice-tube system, not a TXV). Replace if old or contaminated; cheap part ($5-15). Lines themselves rarely fail — the O-rings at line connections are the typical leak point. Always replace O-rings with green HNBR-rated rings (not generic black nitrile) when reassembling.",
    inspectionHint:
      "Trace each A/C line for oil-stained dirt or UV-dye glow — the visible oil residue marks the leak point. O-rings at line junctions are the most common leak.",
    sourceCitationKey: "hvac-ac-lines-accumulator",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MODE SWITCHING / DASHBOARD FREEZE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-mode-stuck-defrost",
    sourceType: "known_issue",
    sourceLabel: "HVAC Deep Reference — Mode Door",
    title: "Mode stuck at defrost — failsafe behavior, almost always actuator",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["ticking"],
    aliases: [
      "stuck defrost",
      "AC only blows defrost",
      "mode stuck defrost",
      "dashboard freeze HVAC",
      "no vent airflow",
    ],
    excerpt:
      "Owners frequently report 'A/C only blows out the defrost vents' on this generation. This is almost always the mode door actuator (YH-1777) — the mode door defaults to the defrost position by spring tension when the actuator can no longer hold it against spring force. The EATC firmware also forces defrost as a 'failsafe' if it loses position feedback from the mode actuator. Less common cause: a vacuum-line problem on much-older Ford trucks — but the 12th-gen F-150 uses electric actuators, NOT vacuum motors, so vacuum-leak troubleshooting on this generation is a waste of time for HVAC mode issues. Diagnostic: with ignition on, listen near the radio for clicking when you press FLOOR or VENT mode. Clicking = actuator gear stripped. No clicking = electrical (check the 5-pin connector at the actuator).",
    inspectionHint:
      "Mode stuck at defrost on 2009-2014 F-150 = electric actuator problem. Do NOT chase vacuum leaks — there are no vacuum lines in this HVAC system.",
    sourceCitationKey: "hvac-mode-stuck-defrost",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIAGNOSTIC PROCEDURE OVERVIEW
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-diagnostic-procedure",
    sourceType: "inspection_hint",
    sourceLabel: "HVAC Deep Reference — Diagnostic",
    title: "HVAC diagnostic procedure — code scan, sound, part-number confirm",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["ticking", "rattle", "squeal"],
    aliases: [
      "HVAC diagnostic",
      "actuator diagnosis",
      "FORScan HVAC",
      "F-150 HVAC troubleshoot",
    ],
    excerpt:
      "Recommended HVAC diagnostic order on this truck: (1) CODE SCAN with FORScan (free PC software + ~$50 VLINKER/OBDLINK adapter). Cheap generic OBD2 scanners do not read body-control B-codes from the EATC module; FORScan does. Look for B1252/B1253/B1273/B1276/B1277 family codes. (2) SOUND LOCALIZATION — engine off, ignition on, climate-control panel awake. Cycle each control (temp, mode, recirc) one at a time and listen with your ear near the radio (driver actuators), the glove box (passenger blend + recirc), and the lower center stack (mode). Identify which actuator clicks. (3) PART-NUMBER CONFIRMATION — before ordering, look up your VIN on FordPartsGiant.com or CarDecals.com to confirm the exact actuator part number for your trim/year, especially passenger blend (YH-1778) vs driver blend (YH-1779). Wrong-side actuators look identical but seat the gear teeth on the wrong clock position. (4) For A/C performance issues, get gauge readings AND charge weight before assuming low refrigerant. (5) Heater problems with no codes: physically check coolant level and temp at the heater hoses at the firewall — both hoses should be HOT with engine warm and heat on.",
    inspectionHint:
      "Code scan first. Then sound. Then confirm part number against the VIN. Skipping any step leads to wrong-part orders and wasted shop time.",
    sourceCitationKey: "hvac-diagnostic-procedure",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // COMMON HVAC MISTAKES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-common-mistakes",
    sourceType: "known_issue",
    sourceLabel: "HVAC Deep Reference — Mistakes",
    title: "Common HVAC repair mistakes — flush, vacuum, refrigerant, dash freeze",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "HVAC repair mistakes",
      "AC repair errors",
      "compressor flush",
      "wrong refrigerant",
      "stop leak damage",
    ],
    excerpt:
      "Top 6 HVAC mistakes on this truck: (1) Replacing the A/C compressor without flushing the lines and condenser — debris from the failed compressor circulates and kills the new one within weeks; ALWAYS flush + new drier + new orifice. (2) Skipping the 30-minute vacuum hold — leaves moisture inside that forms acid; the system will leak through a new component within a year. (3) Recharging by gauge pressure instead of weight — overcharge or undercharge by 0.3 lb easily, both reduce cooling. (4) Using R1234yf instead of R134a — wrong refrigerant for this generation. R1234yf in an R134a system creates pressure and oil-compatibility issues. (5) Using A/C 'stop leak' or 'cold-shot' cans with sealant — clogs the orifice tube and contaminates recovery machines; many shops refuse to service a system with sealant in it. (6) Ignoring blend-door clicking — the actuator gets worse, the door gets stuck on one extreme, and eventually the cabin loses temperature control entirely. (7) Buying the wrong actuator (driver vs passenger looks identical from the photo, but the gear seats differently) — always check the part number against the VIN.",
    inspectionHint:
      "Flush, vacuum, drier — these three are non-negotiable on any A/C job that opens the system. Skipping any of them voids the repair.",
    safetyNote:
      "Refrigerant venting is illegal in most countries and dangerous to your eyes/skin. Always recover at a shop before opening lines.",
    sourceCitationKey: "hvac-common-mistakes",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // KOREA SOURCING NOTES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-korea-sourcing",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Korea Sourcing",
    title: "Sourcing HVAC parts and A/C service in South Korea",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Korea HVAC parts",
      "Coupang blend door actuator",
      "Korean AC service R134a",
      "미주 parts F-150",
      "Korean Ford parts HVAC",
    ],
    excerpt:
      "Sourcing HVAC parts in Korea for the 2010 F-150 5.4: (1) BLEND DOOR ACTUATORS — Coupang carries Dorman 604-925/604-926 aftermarket actuators at around 25,000-40,000 KRW each, vs USD $30-40 from RockAuto + shipping. Coupang is cheaper for single-actuator replacements once shipping is factored in. (2) MOTORCRAFT YH-series actuators — Korean Ford dealers do NOT stock these in any volume; order through 미주 parts (US import) services with 1-2 week delivery and 15-25% markup over US retail. (3) BLOWER MOTOR YH-1872 — both Coupang aftermarket and 미주 sourcing work; Motorcraft via 미주 runs ~80,000-120,000 KRW. (4) A/C COMPRESSOR — too heavy/bulky to source efficiently from US; check Korean F-150 specialty importers (limited but exist in Seoul/Busan) or accept that A/C compressor replacement in Korea costs notably more than US. (5) A/C SERVICE — many Korean shops still service R134a (it has not been phased out for older vehicles in Korea), typical recharge cost 100,000-200,000 KRW. Confirm the shop uses R134a, NOT R1234yf, before service. Find shops that work on imported pickups — generic Korean car shops sometimes lack the gauge fittings for R134a since most Korean cars have moved to R1234yf.",
    inspectionHint:
      "Korean shops sometimes default to R1234yf; always confirm R134a service before letting them connect to your truck.",
    sourceCitationKey: "hvac-korea-sourcing",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CABIN AIR FILTER (often overlooked)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-cabin-air-filter",
    sourceType: "owner_manual",
    sourceLabel: "Owner Manual / Service",
    title: "Cabin air filter — does the 2009-2014 F-150 have one?",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "cabin air filter",
      "cabin filter F-150",
      "pollen filter",
      "HVAC filter location",
    ],
    excerpt:
      "Most 2009-2014 F-150 trims DID NOT come with a cabin air filter from the factory — Ford specified the HVAC box without a filter slot on base trims. Some higher trims (Lariat+) have a filter housing behind the glove box, but many F-150s of this era simply do not have a filterable slot at all. If you notice weak airflow on a truck that did not previously have airflow issues, the cause is usually debris (leaves, pine needles) in the blower fan housing — drop the blower motor and clear the squirrel-cage and the housing. Aftermarket cabin-air-filter retrofit kits exist but require modifying the HVAC plenum behind the glove box — not worth it for most owners. If your truck does have a cabin filter slot, replace every 24,000 km / 15,000 mi (Motorcraft FA-1632 // VERIFY part number applicability).",
    inspectionHint:
      "Drop the glove box and look at the side of the HVAC plenum for a small horizontal cover with a tab — if present, that is the cabin air filter slot. If the plenum side is smooth plastic, your truck has no factory filter.",
    sourceCitationKey: "hvac-cabin-air-filter",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // REPAIR COSTS SUMMARY
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hvac-repair-costs-summary",
    sourceType: "repair_note",
    sourceLabel: "HVAC Deep Reference — Costs",
    title: "HVAC repair cost summary — from $30 to $1500+ depending on component",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "HVAC repair cost",
      "blend door actuator cost",
      "AC compressor cost",
      "heater core replacement cost",
      "evaporator cost",
    ],
    excerpt:
      "Ballpark HVAC repair costs on the 2009-2014 F-150 (US prices, 2024-2025): (1) Blower resistor: $30-50 part + 30 min DIY or $80-150 shop. (2) Blower motor: $30-100 part + 30 min DIY or $100-200 shop. (3) Blend door actuator (per unit): $15-40 part + 30-90 min DIY or $200-400 shop labor per actuator. Many trucks need 2-3 at once. (4) A/C condenser: $80-200 part + $200-400 shop (includes evac/recharge). (5) A/C compressor: $200-400 reman or $400-700 new + $300-500 shop labor (with mandatory flush, drier, orifice). (6) Heater core: $50-100 part + $800-1500 shop labor (dash-out job). (7) Evaporator: $80-200 part + $1000-1800 shop labor (dash-out job). (8) Climate control head (used LKQ): $150-400. (9) A/C recharge service alone: $80-200 (depending on whether refrigerant is included). DIY save vs shop: actuators save the most (~$300 each), heater core and evaporator save the least (dash-out is brutal even for experienced DIYers).",
    inspectionHint:
      "Actuators are the highest DIY-savings job on this truck — $30 part, hours saved. Heater core and evaporator are 'pay the shop' jobs unless you have a full shop's worth of tools and a weekend.",
    sourceCitationKey: "hvac-repair-costs-summary",
  },
];
