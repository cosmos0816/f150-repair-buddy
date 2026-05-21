import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

// 2009-2014 Ford F-150 TPMS sensors and key fob / PATS programming reference.
//
// Scope notes:
// - All entries use the F150_GENERAL_VEHICLE_ID scope ("2009-2014-ford-f150-general")
//   because TPMS and key-fob systems are shared across all 12th-gen engine
//   variants (4.6L 2V, 4.6L 3V, 5.4L 3V, 5.0L Coyote, 3.5L EcoBoost, 6.2L Boss,
//   3.7L Ti-VCT). They are driven off the body computer and PCM, not the engine
//   architecture.
// - TruckPartId coverage gap: there is no part ID for TPMS sensors, key fobs,
//   transponder chips, ignition cylinders, or the PATS transceiver ring. The
//   closest existing IDs reused below are `connector` (PATS antenna ring is a
//   connector-like component) and `battery` (key fob CR2032). Where no
//   reasonable proxy exists, partTags is left empty — documented per entry.
//   Recommended additions to lib/knowledge/types.ts:
//     - tpms_sensor, tpms_valve_stem, tpms_module
//     - key_fob, key_blade, transponder_chip
//     - pats_antenna_ring, pats_transceiver, ignition_cylinder
//     - push_button_start, proximity_antenna
// - issueAreaIds coverage gap: there is no dedicated issue area for TPMS or
//   PATS. The closest existing ID reused below is
//   `connector_and_harness_fitment` (for PATS antenna ring contact issues).
//   Recommended additions:
//     - tpms_sensor_fault, tpms_relearn_required
//     - pats_no_start, key_programming_required
// - systemTags: TPMS maps reasonably to ["electrical", "suspension_steering"]
//   (wheel-mounted, wireless). Key fob maps to ["electrical", "ignition"].

export const TPMS_KEYFOB_REFERENCES: TruckReferenceRecord[] = [
  // ═══════════════════════════════════════════════════
  // TPMS SENSORS — HARDWARE / PART NUMBERS
  // ═══════════════════════════════════════════════════
  {
    id: "tpms-frequency-315mhz-us-market",
    sourceType: "repair_note",
    sourceLabel: "TPMS Reference — Frequency",
    title: "US-market 2009-2014 F-150 TPMS sensors use 315 MHz",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TPMS frequency",
      "315 MHz TPMS",
      "tire pressure sensor frequency",
      "F-150 TPMS band",
    ],
    excerpt:
      "All US-market 2009-2014 F-150 TPMS sensors transmit on 315 MHz. EU-spec trucks use 433 MHz. If buying replacement sensors for a Korean-import F-150, verify the original frequency — a US-spec truck imported to Korea will still want 315 MHz sensors. Mixing frequencies will not work; the BCM only listens on one band.",
    inspectionHint:
      "Check the part number printed on the existing sensor body before ordering. 315 MHz sensors have part numbers like 9L3T-1A189-AF or 8R3Z-1A189-A; 433 MHz EU sensors will have different suffixes.",
    sourceCitationKey: "tpms-frequency-315mhz-us-market",
  },
  {
    id: "tpms-sensor-part-numbers-by-year",
    sourceType: "repair_note",
    sourceLabel: "TPMS Reference — Part Numbers",
    title: "OEM TPMS sensor part number variations by production year",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TPMS part number",
      "9L3T-1A189-AF",
      "8R3Z-1A189-A",
      "CL3Z-1A189-A",
      "Ford TPMS OEM number",
    ],
    excerpt:
      "Three OEM TPMS sensor variants cover 2009-2014: early 2009 production used 9L3T-1A189-AF, mid-production (2010-2012) used 8R3Z-1A189-A, and later production (2013-2014) used CL3Z-1A189-A. All are 315 MHz and interchangeable in terms of BCM compatibility, but the rubber valve stem geometry differs slightly. OEM Motorcraft pricing: $30-$50 per sensor.",
    inspectionHint:
      "If only one sensor has failed, you can replace it with any of the three Ford part numbers — they all relearn into the same BCM. Match valve stem style to the wheel (rubber snap-in vs. clamp-in aluminum).",
    sourceCitationKey: "tpms-sensor-part-numbers-by-year",
  },
  {
    id: "tpms-aftermarket-brands",
    sourceType: "repair_note",
    sourceLabel: "TPMS Reference — Aftermarket Options",
    title: "Aftermarket TPMS sensor brands compatible with 2009-2014 F-150",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "aftermarket TPMS",
      "Schrader TPMS",
      "Continental TPMS",
      "Autel TPMS",
      "ATEQ sensor",
      "Bartec sensor",
      "programmable TPMS",
    ],
    excerpt:
      "Schrader is the OEM manufacturer for Ford TPMS, so Schrader aftermarket sensors are functionally identical to dealer parts ($25-$35). Continental VDO sensors are also OE-equivalent ($30-$40). Programmable universal sensors (Autel MX-Sensor, ATEQ U-Pro, Bartec Rite-Sensor) cost $20-$30 and clone the original sensor ID using the matching brand tool — no relearn needed if the ID is copied exactly.",
    inspectionHint:
      "Programmable universal sensors are cheaper but require the brand-specific tool (Autel MaxiTPMS, ATEQ VT-Series, Bartec Tech400). If you only have a generic OBD2 relearn tool, stick with fixed-ID Schrader sensors and do a relearn.",
    sourceCitationKey: "tpms-aftermarket-brands",
  },
  {
    id: "tpms-sensor-battery-life",
    sourceType: "known_issue",
    sourceLabel: "TPMS Reference — Battery Life",
    title: "TPMS sensor battery life is 7-10 years — most 2009-2014 trucks now need new sensors",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TPMS battery life",
      "TPMS sensor dead",
      "TPMS battery dead",
      "old TPMS replacement",
      "TPMS aging",
    ],
    excerpt:
      "TPMS sensor batteries are sealed inside the sensor body and last roughly 7-10 years or ~100,000 mile equivalents of broadcast time. Every 2009-2014 F-150 is now past or near end-of-life on its original sensors. Replacing all four during a tire change is standard practice on a 12th-gen truck. Symptoms of battery death: intermittent TPMS warning, one wheel reading dashes, or the light coming on only after long highway drives.",
    inspectionHint:
      "Use FORScan to read each sensor's battery status field. A 'low' or 'critical' reading means schedule replacement at the next tire service.",
    safetyNote:
      "A dead TPMS sensor will not detect a real low-pressure event. If the warning light is on continuously and pressures are confirmed OK, do not ignore it — drive with a manual pressure check until sensors are replaced.",
    sourceCitationKey: "tpms-sensor-battery-life",
  },
  {
    id: "tpms-warning-light-decode",
    sourceType: "owner_manual",
    sourceLabel: "Owner Manual — TPMS Indicator",
    title: "TPMS warning light: continuous vs. blinking decode",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TPMS light blinking",
      "TPMS light solid",
      "tire pressure warning",
      "low tire light meaning",
    ],
    excerpt:
      "Continuous (solid) TPMS light = a wheel is below the placard pressure (35 PSI front/rear stock). Blinking TPMS light for 60-90 seconds at startup then going solid = sensor fault or relearn required (sensor not transmitting, ID unknown to BCM, or low battery). Many owners confuse the two — check pressures with a gauge first to distinguish.",
    inspectionHint:
      "If the light blinks at startup, do not chase a pressure leak — pull the codes with FORScan or have a TPMS tool read each wheel. A blink means the BCM cannot identify or hear a sensor.",
    sourceCitationKey: "tpms-warning-light-decode",
  },

  // ═══════════════════════════════════════════════════
  // TPMS RELEARN / PROGRAMMING PROCEDURES
  // ═══════════════════════════════════════════════════
  {
    id: "tpms-stationary-relearn-procedure",
    sourceType: "repair_note",
    sourceLabel: "TPMS Reference — Relearn",
    title: "Stationary TPMS relearn procedure (no OBD2 tool needed)",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TPMS relearn",
      "stationary relearn",
      "tire pressure relearn",
      "horn honk relearn",
      "Ford TPMS reset",
    ],
    excerpt:
      "Stationary relearn (works on most 2009-2014 F-150): 1) Inflate all tires to placard. 2) Turn ignition OFF, then press/release brake. 3) Cycle ignition OFF-ON 3 times, ending in ON. 4) Press/release brake. 5) Cycle ignition OFF-ON 3 more times, ending in ON. The horn will sound once = learn mode active. 6) Within 2 minutes, activate each sensor in order LF-RF-RR-LR by letting air out briefly (or with a TPMS activation tool). Horn honks for each wheel learned. Done.",
    inspectionHint:
      "If the horn does not sound after the ignition cycles, the truck is not in relearn mode — repeat the sequence. Some trims need brake press to be held longer between cycles.",
    sourceCitationKey: "tpms-stationary-relearn-procedure",
  },
  {
    id: "tpms-obd2-relearn-tool",
    sourceType: "repair_note",
    sourceLabel: "TPMS Reference — OBD2 Tool",
    title: "OBD2 TPMS reset tool — alternative to stationary relearn",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "OBD2 TPMS tool",
      "TPMS reset tool",
      "Autel TS408",
      "Autel TS508",
      "ATEQ VT15",
      "Bartec Tech400",
      "TPMS scan tool",
    ],
    excerpt:
      "An OBD2 TPMS scan tool (Autel TS408 ~$100, Autel MaxiTPMS TS508 ~$300, ATEQ VT15 ~$200, Bartec Tech400 ~$500) reads each sensor's ID, battery status, and pressure, then writes IDs into the BCM via the OBD2 port. Faster than stationary relearn for shops doing multiple trucks. For a one-off DIY job, the stationary procedure is free and works fine.",
    inspectionHint:
      "If you plan to swap winter/summer wheels yearly, an Autel TS408 pays for itself — relearning four sensors with the tool takes 60 seconds vs. ~5 minutes for the stationary dance.",
    sourceCitationKey: "tpms-obd2-relearn-tool",
  },
  {
    id: "tpms-tire-rotation-relearn-requirement",
    sourceType: "repair_note",
    sourceLabel: "TPMS Reference — Rotation",
    title: "Tire rotation may require TPMS relearn (position-aware sensors)",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TPMS rotation",
      "rotate tires TPMS",
      "position aware TPMS",
      "wheel position TPMS",
    ],
    excerpt:
      "Some 2009-2014 F-150 configurations (Lariat, King Ranch, Platinum with individual wheel pressure display in the message center) are wheel-position-aware — the BCM tracks which sensor is at LF/RF/RR/LR. After a rotation, the display will show the WRONG wheel as low until a relearn is performed. Basic configurations (XL/XLT base) without per-wheel display do not require relearn after rotation but will still benefit if a sensor was replaced.",
    inspectionHint:
      "If the message center shows individual PSI per wheel, treat rotation as a relearn event. If it only shows a single 'low tire' light, you can skip the relearn after rotation.",
    sourceCitationKey: "tpms-tire-rotation-relearn-requirement",
  },
  {
    id: "tpms-winter-summer-wheel-strategy",
    sourceType: "repair_note",
    sourceLabel: "TPMS Reference — Seasonal Wheels",
    title: "Winter vs. summer wheel TPMS strategy — two sets or relearn each swap",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "winter wheels TPMS",
      "summer wheels TPMS",
      "seasonal wheel swap TPMS",
      "two sets TPMS",
      "snow tire TPMS",
    ],
    excerpt:
      "Two valid approaches for seasonal swaps: (1) Install a second set of four TPMS sensors permanently in the winter wheels — relearn once and the BCM stores IDs for both sets if you re-do relearn each swap. Cost: $100-$200 for four extra sensors. (2) Move the same four sensors between wheel sets at each swap — labor-intensive (must unmount tires) but no extra sensor cost. Most shops in Korea charge ~₩30,000 ($23) per wheel to dismount/remount, making option (1) cheaper after one season.",
    inspectionHint:
      "If the truck spends winters in salt/snow regions and summers on dry pavement, dedicated winter sensors avoid mid-swap leaks from disturbing the seal.",
    sourceCitationKey: "tpms-winter-summer-wheel-strategy",
  },
  {
    id: "tpms-forscan-diagnostics",
    sourceType: "repair_note",
    sourceLabel: "TPMS Reference — FORScan",
    title: "FORScan reads TPMS sensor IDs, pressures, and battery status",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "FORScan TPMS",
      "FORScan tire pressure",
      "TPMS diagnostic",
      "read TPMS sensor ID",
      "TPMS battery FORScan",
    ],
    excerpt:
      "FORScan ($50 lifetime extended license) + an ELM327 OBD2 adapter ($20-$30) reads all four TPMS sensors' hex IDs, current PSI, internal temperature, and battery health from the BCM. This is the fastest way to diagnose 'which sensor is failing' without pulling wheels off. The free FORScan tier reads basic codes but does not show per-sensor battery — the extended license is required for that.",
    inspectionHint:
      "FORScan Lite on Android/iPhone works for reading TPMS data but cannot WRITE new sensor IDs. For writing (programming a new sensor) you need FORScan on Windows with the ELM327 in HS-CAN+MS-CAN mode.",
    sourceCitationKey: "tpms-forscan-diagnostics",
  },

  // ═══════════════════════════════════════════════════
  // KEY FOBS — HARDWARE / PART NUMBERS
  // ═══════════════════════════════════════════════════
  {
    id: "keyfob-4button-2009-2010",
    sourceType: "repair_note",
    sourceLabel: "Key Fob Reference — 4-Button",
    title: "2009-2010 F-150 4-button fob with integrated key blade",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "ignition"],
    issueAreaIds: [],
    partTags: ["battery"],
    symptomTags: [],
    aliases: [
      "4 button fob",
      "Ford 5921304",
      "Ford 5921306",
      "F-150 key fob 2009",
      "F-150 key fob 2010",
      "integrated key blade",
    ],
    excerpt:
      "2009-2010 F-150 uses a 4-button remote (lock, unlock, panic, tailgate/cargo) with a SEPARATE traditional cut key blade. Ford OEM part numbers: 5921304 and 5921306 (FCC ID CWTWB1U793). Battery: CR2032. The PATS transponder chip lives in the metal key blade, not the plastic fob body — replacing only the fob shell does not require re-programming PATS as long as the original blade transfers over.",
    inspectionHint:
      "If the buttons stop working but the truck still starts when the key is in the cylinder, the fob's CR2032 is dead OR the fob remote module has failed — the PATS chip in the blade is independent.",
    sourceCitationKey: "keyfob-4button-2009-2010",
  },
  {
    id: "keyfob-5button-switchblade-2011-2014",
    sourceType: "repair_note",
    sourceLabel: "Key Fob Reference — Switchblade",
    title: "2011-2014 F-150 5-button switchblade fob with remote start option",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "ignition"],
    issueAreaIds: [],
    partTags: ["battery"],
    symptomTags: [],
    aliases: [
      "5 button fob",
      "switchblade key",
      "flip key",
      "remote start fob",
      "F-150 2011 fob",
      "F-150 2012 fob",
      "F-150 2013 fob",
      "F-150 2014 fob",
      "164-R8046",
      "164-R8041",
    ],
    excerpt:
      "2011-2014 F-150 introduced a 5-button 'switchblade' flip-key (lock, unlock, panic, tailgate, remote start) where the key blade folds into the fob body. FCC IDs: CWTWB1U793 (4-button base) and M3N5WY8609 / 164-R8046 (5-button with remote start). Remote start was standard on King Ranch / Platinum / Limited and optional on XLT/Lariat with Equipment Group packages. Battery: CR2032. The PATS transponder is integrated into the fob/blade assembly — replacing the whole fob requires re-programming.",
    inspectionHint:
      "If the flip-blade spring is broken, the fob still functions for remote and PATS — but the key won't snap out. Replacement spring kits exist (~$5) or replace the shell.",
    sourceCitationKey: "keyfob-5button-switchblade-2011-2014",
  },
  {
    id: "keyfob-proximity-intelligent-access-2014",
    sourceType: "repair_note",
    sourceLabel: "Key Fob Reference — Proximity",
    title: "2013-2014 F-150 proximity key with push-button start (King Ranch/Platinum/Limited)",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "ignition"],
    issueAreaIds: [],
    partTags: ["battery"],
    symptomTags: [],
    aliases: [
      "proximity key",
      "intelligent access",
      "passive entry",
      "push button start",
      "PEPS",
      "M3N5WY8609",
      "smart key F-150",
      "keyless ignition",
    ],
    excerpt:
      "Top-trim 2013-2014 F-150 (Platinum, Limited, some King Ranch) shipped with Intelligent Access proximity keys and push-button start (PEPS — Passive Entry / Passive Start). The fob has a backup metal blade hidden inside for emergency lock cylinder access if the fob battery dies. Battery: CR2032. The truck detects the fob in/near the cabin via LF antennas in the door handles and console — if the fob battery is dead, hold it against the start button to start.",
    inspectionHint:
      "Symptom of dying CR2032 in a PEPS fob: door handles stop unlocking on grip, but push-button start still works if you put the fob in the cup holder. Replace battery before fob falls back to limp mode.",
    sourceCitationKey: "keyfob-proximity-intelligent-access-2014",
  },
  {
    id: "keyfob-cr2032-battery-replacement",
    sourceType: "repair_note",
    sourceLabel: "Key Fob Reference — Battery",
    title: "Key fob CR2032 battery replacement — range loss is the first symptom",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "ignition"],
    issueAreaIds: [],
    partTags: ["battery"],
    symptomTags: [],
    aliases: [
      "CR2032 fob battery",
      "key fob battery",
      "fob range",
      "remote range",
      "fob not working",
      "replace fob battery",
    ],
    excerpt:
      "All 2009-2014 F-150 key fobs use a single CR2032 3V coin cell. Battery lasts 3-5 years with normal use. First symptom of weak battery: range drops from 30+ meters to ~5 meters, especially in cold weather. Replacement: pop fob shell open with a coin or flathead, lift cell out, insert new CR2032 with the '+' side facing the same direction. No re-programming needed. Use brand-name batteries (Energizer, Panasonic, Duracell) — cheap no-name CR2032s can have weak voltage curves and shorter life.",
    inspectionHint:
      "Before assuming a fob has failed entirely, replace the CR2032 first. It costs $2 and resolves the vast majority of 'fob stopped working' complaints.",
    sourceCitationKey: "keyfob-cr2032-battery-replacement",
  },

  // ═══════════════════════════════════════════════════
  // PATS / KEY PROGRAMMING
  // ═══════════════════════════════════════════════════
  {
    id: "keyfob-pats-securilock-overview",
    sourceType: "repair_note",
    sourceLabel: "Key Programming — PATS",
    title: "PATS / SecuriLock — every key contains a transponder chip paired to the PCM",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "ignition"],
    issueAreaIds: ["connector_and_harness_fitment"],
    partTags: ["connector"],
    symptomTags: ["dead_battery"],
    aliases: [
      "PATS",
      "SecuriLock",
      "passive anti theft",
      "transponder chip",
      "Ford immobilizer",
      "key chip programming",
      "theft light",
    ],
    excerpt:
      "Ford's PATS (Passive Anti-Theft System), branded SecuriLock, requires every functional key to contain a transponder chip whose ID is registered in the PCM and Instrument Cluster. The PATS antenna ring around the ignition cylinder reads the chip when the key is inserted; if the ID is unknown, the PCM disables fuel injection and the theft indicator flashes rapidly. PATS is independent from the remote fob radio — a key can unlock the truck via remote but still fail to start if the PATS ID is not registered.",
    inspectionHint:
      "If the truck cranks but will not start and the theft icon flashes rapidly on the cluster, the issue is PATS — not battery, fuel, or ignition. Try a known-good spare key before any other diagnostic.",
    safetyNote:
      "PATS lockouts cannot be bypassed by jumping or grounding wires on a 2009-2014 F-150 — the PCM is the immobilizer. Do not waste hours on YouTube 'PATS bypass' tricks; they don't work on this generation.",
    sourceCitationKey: "keyfob-pats-securilock-overview",
  },
  {
    id: "keyfob-2key-programming-procedure",
    sourceType: "repair_note",
    sourceLabel: "Key Programming — 2-Key Method",
    title: "2-key programming procedure — DIY method when you have two working keys",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "ignition"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "2 key procedure",
      "two key programming",
      "Ford key add",
      "program third key",
      "add spare key",
      "PATS DIY",
    ],
    excerpt:
      "If you have TWO already-programmed PATS keys for your 2011-2014 F-150, you can add a third key without a scan tool: 1) Insert key #1, turn to ON (do not crank), wait until theft light goes off (~3 sec), turn OFF, remove. 2) Within 10 seconds, insert key #2 and repeat. 3) Within 20 seconds, insert the NEW (cut and uncoded) key and turn to ON. The theft light should illuminate for 2 seconds then go off. Crank to verify. 2009-2010 trucks have a similar but slightly different sequence — consult the owner manual.",
    inspectionHint:
      "If you only have ONE working key, the 2-key method will not work. You must use FORScan, a Ford IDS, or pay a locksmith/dealer to add a key.",
    sourceCitationKey: "keyfob-2key-programming-procedure",
  },
  {
    id: "keyfob-forscan-key-programming",
    sourceType: "repair_note",
    sourceLabel: "Key Programming — FORScan DIY",
    title: "FORScan + ELM327 programs PATS keys on 2009-2014 F-150 for ~$80 total",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "ignition"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "FORScan key programming",
      "ELM327 PATS",
      "DIY key programming",
      "Ford key DIY",
      "FORScan extended license",
      "OBD2 key programming",
    ],
    excerpt:
      "FORScan (Windows) with an HS-CAN+MS-CAN-capable ELM327 OBD2 adapter (OBDLink EX, vLinker FS, or ELS27) can program PATS transponder keys on 2009-2014 F-150. Total cost: ~$50-$100 (FORScan extended license ~$12-$50 + adapter $30-$60). Procedure requires the FORScan extended license (free trial available) and you must enter PATS Incode/Outcode security — FORScan handles this. Approximate time: 15-30 minutes per key. Works for both transponder-only keys and full remote/fob keys.",
    inspectionHint:
      "Generic $10 ELM327 dongles will NOT switch between HS-CAN and MS-CAN — they cannot program PATS. Specifically buy OBDLink EX, vLinker FS, or ELS27. Verify before purchase.",
    sourceCitationKey: "keyfob-forscan-key-programming",
  },
  {
    id: "keyfob-dealer-key-programming-cost",
    sourceType: "repair_note",
    sourceLabel: "Key Programming — Dealer/Locksmith",
    title: "Dealer and locksmith pricing for PATS key programming",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "ignition"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "dealer key cost",
      "locksmith key Ford",
      "Ford IDS",
      "Autel MaxiCom key",
      "Snap-On Solus key",
      "key programming price",
    ],
    excerpt:
      "Ford dealer pricing in US/Canada: $100-$300 per programmed key including cut blade and remote. Independent automotive locksmith: $80-$200 per key (they use Autel MaxiCom IM608, Snap-On Solus, Smart Pro, or aftermarket equivalents). DIY via FORScan: $30-$80 per key (blank fob + cut blade + battery). Korea Ford dealers typically charge ~₩300,000 ($230) per key — sometimes higher because parts are imported.",
    inspectionHint:
      "Locksmiths can usually beat dealer prices and come to you. In Korea, search 'Ford key programming' / '포드 키 프로그래밍' on Naver Map for shops that handle 2009-2014 F-150.",
    sourceCitationKey: "keyfob-dealer-key-programming-cost",
  },
  {
    id: "keyfob-lost-all-keys-procedure",
    sourceType: "repair_note",
    sourceLabel: "Key Programming — All Keys Lost",
    title: "Lost all keys — full PATS reset + new key programming required",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "ignition"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "lost all keys",
      "no keys",
      "PATS reset",
      "all keys lost Ford",
      "rebuild PATS",
      "wipe PATS",
    ],
    excerpt:
      "If every PATS key for the truck is lost, a 10-minute timed PATS reset is required before any new key can be programmed: connect a scan tool (FORScan extended, Ford IDS, Autel) to OBD2, command 'PATS Erase', then wait 10 minutes with ignition ON before the new key sync sequence will accept. Total cost at a dealer: $300-$500 including tow, lock cylinder access, and two new programmed keys. Locksmith: $200-$400. DIY via FORScan: $50-$150 if you have time to wait.",
    inspectionHint:
      "Do not bother trying the 2-key procedure if all keys are lost — it requires two working keys as the precondition. The 10-minute timer cannot be bypassed.",
    safetyNote:
      "Some PATS reset procedures will erase ALL existing key IDs. Confirm the scan tool's specific behavior before erasing — some tools 'add' new keys without wiping, others reset to a blank PATS table.",
    sourceCitationKey: "keyfob-lost-all-keys-procedure",
  },

  // ═══════════════════════════════════════════════════
  // KOREA-SPECIFIC NOTES
  // ═══════════════════════════════════════════════════
  {
    id: "keyfob-korea-aftermarket-coupang-compatibility",
    sourceType: "repair_note",
    sourceLabel: "Korea — Aftermarket Fobs",
    title: "Coupang/Naver aftermarket key fobs — verify PATS chip compatibility before buying",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "ignition"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Coupang Ford key",
      "Korea aftermarket fob",
      "Naver Ford key",
      "Korean key fob",
      "Aliexpress Ford fob",
      "PATS chip type",
    ],
    excerpt:
      "Aftermarket fobs on Coupang, Naver, and AliExpress are usually fine for 2011-2014 F-150 (5-button switchblade, FCC M3N5WY8609) but the PATS transponder chip TYPE varies between batches — some come with Texas Instruments 4D-63 chips (correct for Ford), others with 4D-60 or PCF7935 (will NOT work). Always confirm the listing says 'Ford 4D-63' or 'H72' transponder before buying. Cost on Coupang: ₩30,000-₩80,000 ($23-$60) per blank fob, then programming separately.",
    inspectionHint:
      "Ask the seller for a photo of the chip inside the key blade. If the listing only shows the fob exterior, do not buy — assume the chip is wrong.",
    sourceCitationKey: "keyfob-korea-aftermarket-coupang-compatibility",
  },
  {
    id: "tpms-korea-eu-spec-433mhz-warning",
    sourceType: "repair_note",
    sourceLabel: "Korea — TPMS Frequency",
    title: "Korean-market F-150 imports — verify 315 vs 433 MHz before ordering sensors",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Korea TPMS frequency",
      "433 MHz TPMS Korea",
      "EU spec TPMS",
      "Korean import F-150 TPMS",
      "Ford Korea TPMS",
    ],
    excerpt:
      "A 2009-2014 F-150 in Korea could be (a) a US-spec gray import (315 MHz TPMS) or (b) an EU-spec import (433 MHz TPMS). The BCM is region-coded — you cannot mix bands. Before ordering sensors on Coupang or RockAuto, pull a wheel and read the part number printed on the existing sensor. Most F-150s in Korea are US gray imports, so 315 MHz is the default assumption, but always verify.",
    inspectionHint:
      "If the truck was originally sold in Europe (rare for F-150), the door jamb VIN sticker will have an 'F' or 'WF0' WMI prefix vs. 'FT' or '1FT' for US-built trucks. Check the VIN before guessing frequency.",
    sourceCitationKey: "tpms-korea-eu-spec-433mhz-warning",
  },

  // ═══════════════════════════════════════════════════
  // DIAGNOSTIC FLOW / SYMPTOMS
  // ═══════════════════════════════════════════════════
  {
    id: "tpms-diagnostic-flow-light-on-pressures-ok",
    sourceType: "inspection_hint",
    sourceLabel: "TPMS Diagnostic Flow",
    title: "TPMS light on but measured pressures are correct = sensor issue, not pressure",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "TPMS light wrong",
      "TPMS false alarm",
      "tire pressure correct light on",
      "TPMS sensor failure diagnostic",
    ],
    excerpt:
      "Diagnostic order when the TPMS warning is on: (1) Measure all four tires (and spare on some trims) with a manual gauge — confirm placard pressure. (2) If pressures are correct, the issue is a sensor (dead battery, failed transmitter, or relearn needed after rotation). (3) Use FORScan to read each sensor's status — identify which wheel is silent. (4) If a sensor's battery is dead or signal is lost, replace + relearn. (5) If all four are alive but light persists, check for an antenna fault in the BCM.",
    inspectionHint:
      "Always start with a manual gauge. Many TPMS complaints are real low-tire events that owners ignored because they 'thought it was the sensor again'.",
    safetyNote:
      "Do not deactivate or tape over the TPMS warning. A real low-pressure event becomes a blowout risk at highway speed.",
    sourceCitationKey: "tpms-diagnostic-flow-light-on-pressures-ok",
  },
  {
    id: "keyfob-symptoms-diagnostic-flow",
    sourceType: "inspection_hint",
    sourceLabel: "Key Fob Diagnostic Flow",
    title: "Key fob failure diagnostic order — battery, then water damage, then program",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["electrical", "ignition"],
    issueAreaIds: [],
    partTags: ["battery"],
    symptomTags: [],
    aliases: [
      "fob not working",
      "fob diagnostic",
      "remote not working",
      "key fob troubleshooting",
      "fob dead",
      "key fob water damage",
    ],
    excerpt:
      "Diagnostic order for a failed key fob: (1) Range loss = replace CR2032 (90% of cases). (2) Buttons stuck or fob feels gritty = water damage, replace fob shell + circuit board. (3) Total failure of one fob while a spare still works = the fob's transmitter has died, replace and re-program. (4) BOTH fobs fail simultaneously = problem is in the truck (BCM, antenna, battery, fuse) — check the cab fuse box for the 'KEYLESS' or 'BCM' fuse. (5) Truck cranks but won't start = PATS, not the fob — see PATS diagnostic flow.",
    inspectionHint:
      "Carry a spare known-good fob during diagnostics. If the spare works but the primary doesn't, the issue is in the primary fob — not the truck.",
    sourceCitationKey: "keyfob-symptoms-diagnostic-flow",
  },
];
