import {
  BOSS_VEHICLE_ID,
  COYOTE_VEHICLE_ID,
  ECOBOOST_VEHICLE_ID,
  F150_GENERAL_VEHICLE_ID,
  SUPPORTED_VEHICLE_ID,
} from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const PARTS_SOURCING_REFERENCES: TruckReferenceRecord[] = [
  // ── 1. Oil filter brand guidance ─────────────────────────────────────
  {
    id: "parts-sourcing-oil-filter-brand-guide",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Oil filters — Motorcraft FL-820-S / FL-500-S; Wix and Fram cross-references",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "oil filter brand", "FL-820-S", "FL-500-S", "Wix 51372", "Fram PH8A",
      "Motorcraft oil filter", "oil filter cross reference",
    ],
    excerpt:
      "For 2009-2010 4.6L/5.4L the OEM oil filter is Motorcraft FL-820-S. For 2011-2014 5.0L Coyote, 3.5L EcoBoost, and 3.7L V6 it is Motorcraft FL-500-S. The 6.2L Boss uses FL-820-S like the older V8 pattern. Aftermarket cross-references for FL-820-S: Wix 51372 (preferred — same filter media spec as OEM), Fram PH8A (acceptable but Fram cardboard end caps are widely criticized — prefer Fram Ultra XG8A if going Fram), K&N HP-1002, Purolator PL14610, Bosch 3312. Cross-references for FL-500-S: Wix 57207, Fram PH10575, K&N HP-1017, Purolator PBL45335. Practical recommendation: stick with Motorcraft or Wix on the 5.4 3V because the silicone anti-drain-back valve is critical for cold-start oil pressure, which feeds the cam phasers. Fram standard line is the most commonly counterfeited oil filter on Amazon — verify the seller before buying online.",
    inspectionHint: "When inspecting a used filter, confirm the anti-drain-back valve is silicone (semi-clear flexible) and not black nitrile rubber.",
    sourceCitationKey: "parts-sourcing-oil-filter-brand-guide",
  },

  // ── 2. Spark plug brand guidance (5.4 3V) ────────────────────────────
  {
    id: "parts-sourcing-spark-plug-54-3v",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Spark plugs (5.4 3V) — only use Motorcraft SP-515 / PZK14F, avoid no-name copies",
    vehicleScope: SUPPORTED_VEHICLE_ID,
    systemTags: ["ignition", "engine_mechanical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "spark plug brand", "SP-515", "PZK14F", "two piece plug",
      "5.4 3V spark plug", "Motorcraft plug",
    ],
    excerpt:
      "The 5.4L 3V is the platform most sensitive to spark plug brand. Use only Motorcraft SP-515 (newer marketing code PZK14F) — these are the redesigned single-piece replacements for the original two-piece OEM plugs. NGK and Champion do not make a direct equivalent that has shown reliable service in this engine; field reports consistently flag misfires and short plug life. Avoid generic Amazon/eBay SP-515 listings — counterfeit SP-515s are documented, often missing the chamfered tip that lets the plug clear the long aluminum well. Gap is 0.052-0.054 inch and ships pre-gapped; do not bend the fine-wire electrode. The 5.0L Coyote and 6.2L Boss can also run SP-515 acceptably. The 3.5L EcoBoost and 3.7L V6 require the iridium SP-534 only — do not substitute. Buy from RockAuto's Motorcraft listing, a Ford dealer, or Tasca Parts; Amazon counterfeits are common enough that the savings are not worth it.",
    inspectionHint: "Genuine Motorcraft SP-515 has laser-etched part marking on the hex; counterfeits use ink stamps that smudge with thumb pressure.",
    safetyNote: "An over-gapped or wrong-spec plug on this engine can cause coil-on-plug boot failure and burn out a DG-511 coil within hours.",
    sourceCitationKey: "parts-sourcing-spark-plug-54-3v",
  },

  // ── 3. Ignition coil brand + counterfeit warning ─────────────────────
  {
    id: "parts-sourcing-dg511-counterfeit-warning",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "DG-511 ignition coils — counterfeit warning, buy from Motorcraft or Tasca",
    vehicleScope: SUPPORTED_VEHICLE_ID,
    systemTags: ["ignition", "electrical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["coil", "ignition_harness"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "DG-511 counterfeit", "DG511 fake", "ignition coil brand",
      "8L3Z-12029-A", "UF537", "coil pack 5.4 3V",
    ],
    excerpt:
      "The Motorcraft DG-511 coil (Ford OEM 8L3Z-12029-A) for the 4.6L/5.4L 3V is one of the most counterfeited automotive parts on Amazon and eBay. Counterfeit DG-511 coils are visually nearly identical but use thinner copper windings and inferior epoxy potting — they typically fail within 5,000-15,000 miles and can damage the PCM coil driver if multiple coils fail simultaneously. Buy only from: RockAuto's Motorcraft listing, Tasca Parts, FordParts.com, or a Ford dealer. Acceptable aftermarket equivalents with field-proven reliability: NGK U5099 (48693), Delphi GN10165, Standard Motor Products FD-503. AVOID: any Amazon listing under $25/coil, any 8-pack 'bundle' under $120, any 'Motorcraft' coil shipped from an overseas seller. The 3.5L EcoBoost DG-549 coil has the same counterfeit problem — same sourcing rules apply.",
    safetyNote: "A failing counterfeit coil can dump unburned fuel into the catalytic converter and cause expensive cat damage on top of the coil replacement.",
    sourceCitationKey: "parts-sourcing-dg511-counterfeit-warning",
  },

  // ── 4. DG-542 (Coyote / Boss) ────────────────────────────────────────
  {
    id: "parts-sourcing-dg542-coyote-coil",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "DG-542 ignition coils — Motorcraft vs Denso for 5.0 Coyote and 6.2 Boss",
    vehicleScope: COYOTE_VEHICLE_ID,
    systemTags: ["ignition"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["coil"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "DG-542", "Coyote coil", "5.0 ignition coil", "6.2 Boss coil",
      "UF622", "Mustang GT coil",
    ],
    excerpt:
      "The 5.0L Coyote and 6.2L Boss share the Motorcraft DG-542 (UF622) coil-on-plug. Counterfeiting is less common than with DG-511 because the part is shared with 2011+ Mustang GT, but still buy from RockAuto, Tasca, or a Ford dealer for guaranteed authenticity. Acceptable aftermarket: Denso 673-9311 (same Denso plant that supplies Motorcraft on many years), NGK U5253, Standard Motor Products FD-509. Avoid no-name 8-packs under $90 total — these are the same counterfeit operations that flood DG-511 listings. The 6.2L Boss is more boost-sensitive than the Coyote — if you tune a Boss or run a forced-induction setup, upgrade to NGK U5253 or a performance coil rather than running a counterfeit OEM-look unit.",
    sourceCitationKey: "parts-sourcing-dg542-coyote-coil",
  },

  // ── 5. O2 sensor brand guidance ──────────────────────────────────────
  {
    id: "parts-sourcing-o2-sensor-bosch-vs-denso",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Oxygen sensors — Motorcraft, Bosch, or Denso only; avoid universal sensors",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["exhaust_emissions", "fuel_air_metering"],
    issueAreaIds: [],
    partTags: ["oxygen_sensor_connector", "catalytic_converter_area"],
    symptomTags: ["rough_idle", "misfire"],
    aliases: [
      "O2 sensor brand", "oxygen sensor", "wideband sensor", "Bosch O2",
      "Denso O2", "universal O2 sensor", "lambda sensor",
    ],
    excerpt:
      "Oxygen sensors are one of the few categories where OEM-spec brand matters enough to justify the price. The 12th-gen F-150 uses Motorcraft DY-1099 (upstream) and similar downstream sensors — the actual sensor element is made by either NTK (Japan) or Bosch (Germany) depending on the production year. Best replacements: Motorcraft (direct OEM), Denso (typically the same NTK element with a Denso connector), or Bosch (German factory, premium tier). Avoid: 'universal' O2 sensors that require splicing the harness — these fail emissions readiness monitors on the F-150 PCM and can throw lean codes even when the sensor is healthy. Also avoid no-name Amazon sensors under $25 — these are commonly mis-labeled wideband sensors that confuse the narrowband PCM input. Counterfeit Bosch sensors exist; buy from RockAuto or a known parts retailer. Always replace in pairs (upstream LH + RH) for catalyst monitor readiness.",
    inspectionHint: "Check the connector key — genuine Motorcraft sensors have a square key tab, many counterfeits use a rounded tab that lets you connect the wrong sensor to the wrong bank.",
    sourceCitationKey: "parts-sourcing-o2-sensor-bosch-vs-denso",
  },

  // ── 6. OEM vs aftermarket — where to splurge ─────────────────────────
  {
    id: "parts-sourcing-oem-vs-aftermarket-philosophy",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "OEM vs aftermarket — splurge on sensors/electrical, save on gaskets/filters",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical", "electrical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "OEM vs aftermarket", "when to buy OEM", "Motorcraft vs aftermarket",
      "parts quality tiers", "where to save money",
    ],
    excerpt:
      "Practical rule for the 12th-gen F-150: SPLURGE on Motorcraft/OEM for anything that talks to the PCM — ignition coils, O2 sensors, MAF sensors, cam/crank position sensors, VCT solenoids, IWE solenoid, fuel pump driver module, blend door actuators. The PCM is calibrated against OEM sensor curves and aftermarket parts often read slightly off, causing intermittent codes. SAVE on consumables and bulk gaskets — Fel-Pro valve cover/oil pan/exhaust manifold gaskets are industry standard and identical quality to Motorcraft at half the price. Filters (oil/air/cabin) — Wix or Motorcraft, both fine. SPLURGE on safety-critical suspension — Moog ball joints, tie rod ends, control arms are often better than OEM (lubricable, greasable). Bilstein 5100 shocks outlast Motorcraft. SAVE on cosmetic/trim — Dorman, A-Premium, and even Amazon listings are acceptable for door handles, weatherstripping, trim clips, lamp sockets.",
    sourceCitationKey: "parts-sourcing-oem-vs-aftermarket-philosophy",
  },

  // ── 7. Brand recommendations per category ────────────────────────────
  {
    id: "parts-sourcing-suspension-moog-vs-mevotech",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Suspension — Moog Problem Solver vs Mevotech vs MAS; avoid Detroit Axle",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: ["front_suspension_joint_play", "steering_linkage_wear"],
    partTags: ["ball_joint", "tie_rod_end", "control_arm"],
    symptomTags: ["clunk", "vibration", "pull"],
    aliases: [
      "Moog suspension", "Mevotech", "MAS suspension", "Detroit Axle warning",
      "K80149", "ES3693", "K80306", "ball joint brand",
    ],
    excerpt:
      "Suspension brand ranking for the 2009-2014 F-150: TIER 1 — Moog Problem Solver line (K80149 lower ball joint, ES3693/ES3694 tie rod ends, K80306/K80308 upper control arms). Moog parts on this platform are often improved over Ford OEM — they include zerk fittings for greasing, which OEM does not. TIER 2 — Mevotech Supreme/TTX, MAS Industries — both are OEM suppliers for several automakers, very acceptable. TIER 3 — Dorman OE Solutions — fine for non-load-bearing parts (sway bar links) but mixed reports on control arms. AVOID: Detroit Axle complete kits (poor heat treatment on ball joints, reports of failure within 20K miles), generic Amazon kits, any unbranded 'Mevotech-style' part. The upper control arms (K80306/K80308) come with integrated ball joints — do not buy a separate upper ball joint, that part does not exist for this platform. Always do an alignment after replacing any tie rod end or control arm.",
    safetyNote: "A failed lower ball joint can cause the knuckle to drop and the wheel to fold under the truck at speed. Do not buy budget suspension parts.",
    sourceCitationKey: "parts-sourcing-suspension-moog-vs-mevotech",
  },

  // ── 8. Brake pad brand guidance ──────────────────────────────────────
  {
    id: "parts-sourcing-brake-pads-akebono-vs-wagner",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Brake pads — Akebono ProACT vs Motorcraft vs Power Stop; avoid AliExpress",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area", "brake_hose"],
    symptomTags: ["squeal", "vibration"],
    aliases: [
      "brake pad brand", "Akebono ACT1414", "Motorcraft BR-1414",
      "Wagner OEX1414", "Power Stop Z36", "Hawk HPS",
    ],
    excerpt:
      "Brake pads for 2010-2018 F-150 (BR-1414 front, BR-1602-B rear). Daily driver recommendation: Akebono ProACT ACT1414 — quietest, lowest dust, OEM supplier to many Asian automakers. Akebono is what comes on many Lexus/Toyota factory brakes. Motorcraft BR-1414 — direct OEM, slightly dustier than Akebono but reliable. Wagner OEX1414 — OEM-equivalent ceramic, very common at chain stores in the US. For towing or heavier loads: Power Stop Z36-1414 'Truck & Tow' — carbon-fiber ceramic, more bite at the cost of slightly more dust. For performance/aggressive street: Hawk HPS 5.0 HB679B.600 — higher friction, fade-resistant, but noisier and harder on rotors. AVOID: any AliExpress brake pad regardless of brand markings (counterfeit Akebono and Wagner are documented), Duralast and Valucraft budget lines (acceptable for a beater but inconsistent friction across batches), unbranded eBay pads.",
    safetyNote: "Brakes are the single worst category to cheap out on. The price delta between a budget pad and a quality pad is often less than the cost of a rotor.",
    sourceCitationKey: "parts-sourcing-brake-pads-akebono-vs-wagner",
  },

  // ── 9. Wheel bearings — Timken vs Moog ───────────────────────────────
  {
    id: "parts-sourcing-wheel-bearings-timken",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Wheel bearings/hubs — Timken or Moog only; SKF and National also acceptable",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["suspension_steering", "drivetrain_4wd"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["vibration"],
    aliases: [
      "wheel bearing brand", "Timken SP550214", "Moog 515142",
      "hub assembly", "wheel hub bearing", "F-150 hub",
    ],
    excerpt:
      "Wheel hub bearings on the 12th-gen F-150 are sealed unit assemblies — they cannot be repacked. Buy Timken (the original OEM supplier) or Moog. Timken SP550214 (2009-2010), Timken SP550219 (2011-2014). Moog 513326 (2011-2014 2WD), Moog 515142 (2010-2014 4WD, also fits Expedition/Navigator), Moog 515143 (2011-2014 F-150/Expedition), Moog 515119 (general F-150). Acceptable alternates: SKF, National, BCA. AVOID: Detroit Axle, MAS hub assemblies (mixed reports of bearing noise within 30K miles), any unbranded Amazon hub under $60. A 4WD hub has the ABS tone ring integrated — using a 2WD hub on a 4WD truck will set ABS codes. Verify 2WD vs 4WD before ordering. Torque the axle nut to 21 ft-lb then loosen and re-torque to 35 ft-lb to seat the bearing correctly. A bad bearing typically shows up as a wheel-speed-correlated growl or hum, loudest on highway sweeping turns.",
    inspectionHint: "Spin the hub by hand off the truck — Timken units feel buttery; counterfeit units feel notchy or stiff.",
    sourceCitationKey: "parts-sourcing-wheel-bearings-timken",
  },

  // ── 10. Shock absorber brand guidance ────────────────────────────────
  {
    id: "parts-sourcing-shocks-bilstein-vs-monroe",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Shocks — Bilstein 5100 for daily, Fox 2.0 for off-road, avoid Monroe Reflex",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["wobble", "vibration"],
    aliases: [
      "Bilstein 5100", "Fox 2.0", "Monroe shocks", "KYB Gas-a-Just",
      "Rancho RS5000", "F-150 shock upgrade",
    ],
    excerpt:
      "Shock recommendations for 12th-gen F-150. DAILY DRIVER: Bilstein 5100 — 24-317832 front / 33-187471 rear for RWD stock height, 24-317856 / 33-187501 for 4WD with 0-2.25 inch front lift. German monotube, 100K+ mile service life, firmer ride than OEM but not harsh. BUDGET DAILY: KYB Gas-a-Just 551134 / KG5192 (RWD) — OEM supplier to Toyota, well below Bilstein price, acceptable ride quality. OFF-ROAD/HEAVY LOAD: Fox 2.0 985-24-144 / 985-24-145 — performance shocks with reservoir, expensive but rebuildable. TOWING: Monroe 58653 rear (load-adjusting monotube). AVOID: Monroe Reflex/Sensa-Trac base lines on a 350K km truck — they are technically functional but they fade within 30K miles on a high-mileage F-150. Rancho RS5000X is acceptable but the adjustability is more marketing than useful for a daily driver. Generic eBay shocks — do not bother.",
    sourceCitationKey: "parts-sourcing-shocks-bilstein-vs-monroe",
  },

  // ── 11. Gasket brand — Fel-Pro is the standard ───────────────────────
  {
    id: "parts-sourcing-gaskets-felpro-standard",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Gaskets — Fel-Pro is the industry default; Mahle and Victor Reinz also fine",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical", "exhaust_emissions"],
    issueAreaIds: ["coolant_leak_source", "exhaust_manifold_tick"],
    partTags: ["exhaust_manifold", "coolant_hose"],
    symptomTags: ["leak", "exhaust_tick"],
    aliases: [
      "Fel-Pro gasket", "VS 50687", "MS 96696", "OS 30668",
      "Mahle gasket", "Victor Reinz", "valve cover gasket brand",
    ],
    excerpt:
      "Gaskets are one of the rare categories where the aftermarket option (Fel-Pro) is equal or better than Motorcraft and dramatically cheaper. Recommended Fel-Pro part numbers: 5.4L 3V valve cover VS 50687 R (Mahle VS50626 acceptable). 3.5L EcoBoost valve cover VS 50879 R (2013-2014). 3.7L/3.5L NA valve cover VS50814R. Oil pan OS 30668 R (PermaDry molded rubber — much better than RTV-only installs). Exhaust manifold 5.4L 3V MS 96696, 5.0L Coyote MS 97225, 3.5L EB MS 97218. Intake manifold 5.4L 3V MS 98014 T, 5.0L Coyote MS 97233. Acceptable alternates: Mahle (German engineering, equally good), Victor Reinz (typically supplies BMW/Mercedes, also fine), Apex/AJUSA (acceptable budget). AVOID: paper-style gaskets sold as 'OEM replacement' for valve covers — the 5.4 3V requires the molded rubber/silicone gasket that Fel-Pro and Mahle make.",
    inspectionHint: "Check that the new valve cover gasket includes the metal grommets for the bolt holes — without these, you will crack the cover by over-torquing.",
    sourceCitationKey: "parts-sourcing-gaskets-felpro-standard",
  },

  // ── 12. Cam phaser sourcing ──────────────────────────────────────────
  {
    id: "parts-sourcing-cam-phaser-54-3v",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Cam phasers (5.4 3V) — Ford OEM updated PN, Cloyes complete kit, avoid bare phasers",
    vehicleScope: SUPPORTED_VEHICLE_ID,
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["cam_phaser_area", "timing_cover", "vct_solenoid"],
    symptomTags: ["rattle", "ticking"],
    aliases: [
      "cam phaser brand", "3R2Z-6A257-DA", "Cloyes 9-0391SB",
      "Melling timing kit", "Dorman 917-250", "phaser part number",
    ],
    excerpt:
      "Cam phaser sourcing for the 5.4L 3V — this is a $2,000+ repair, the part decision matters. PREFERRED: Ford OEM updated phaser 3R2Z-6A257-DA (the revised design — older phasers had a known design flaw, only the 3R2Z- prefix has the updated internals). Buy through Tasca Parts, FordParts.com, or a dealer — order both LH and RH. COMPLETE KIT (better value): Cloyes 9-0391SB-VVT — chains, guides, tensioners, phasers, sprockets in one box. Melling 3-1065S is a similar all-in-one kit. AFTERMARKET-ONLY (budget): Dorman 917-250 phasers — these work but reports of repeat failure within 50-80K miles are common; only use if budget forces it. NEVER replace phasers alone — always replace chains, guides, tensioners (F6AZ-6L266-DA right, F6AZ-6L266-CA left), and VCT solenoids (8L3Z-6M280-B or Dorman 916-899) as a complete kit. The repeat-failure rate on phaser-only jobs is high enough that any technician who does it that way is cutting a dangerous corner.",
    safetyNote: "Counterfeit Ford-branded phasers exist on eBay. The 3R2Z- prefix is essential — anything labeled 5L3Z or older revisions has the original design flaw.",
    sourceCitationKey: "parts-sourcing-cam-phaser-54-3v",
  },

  // ── 13. IWE solenoid sourcing ────────────────────────────────────────
  {
    id: "parts-sourcing-iwe-solenoid",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "IWE solenoid and hub actuator — Ford OEM, Dorman 600-105 as budget option",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: [],
    partTags: ["iwe_solenoid_actuator", "vacuum_line"],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "IWE solenoid", "7L1Z-9H465-B", "Dorman 600-105", "IWE hub actuator",
      "vacuum hub", "4WD grinding fix",
    ],
    excerpt:
      "The IWE (Integrated Wheel End) vacuum system is a documented weak point on 2004-2014 F-150s. When sourcing replacements, the IWE solenoid valve (Ford OEM 7L1Z-9H465-B) lives on the firewall — buy OEM through Tasca/FordParts.com. Aftermarket Standard Motor Products and Dorman versions exist but field reports of premature failure within 1-2 years are common. The IWE hub actuators (Ford OEM 7L1Z-3C247-A) at each front wheel are the more expensive parts; Dorman 600-105 is the only widely-available aftermarket option and works adequately but the seals are reportedly thinner than OEM. RockAuto carries both. The vacuum lines (BL3Z-7A785-A and harness) crack at the firewall — replace these together with the solenoid; many 'failed IWE' diagnoses turn out to be just a cracked vacuum line. On RockAuto, search under 'Drivetrain > 4WD Actuator' to find the IWE parts — they are not in the 'Hubs/Bearings' category where you would expect them.",
    inspectionHint: "Before replacing IWE parts, smoke-test the vacuum lines — a cracked line is a $15 fix vs $400 for the solenoid + actuators.",
    sourceCitationKey: "parts-sourcing-iwe-solenoid",
  },

  // ── 14. Blend door actuator sourcing ─────────────────────────────────
  {
    id: "parts-sourcing-blend-door-actuator",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Blend door actuator — Motorcraft, Dorman YH1777, or Ford OEM DL3Z-19E616-A",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "blend door actuator", "DL3Z-19E616-A", "Dorman YH1777",
      "Motorcraft YH-1779", "clicking dash actuator",
    ],
    excerpt:
      "The blend door actuator is one of the highest-failure-rate parts on the 12th-gen F-150 — most trucks have 3-4 actuators and most owners will replace at least one. Sourcing options: Ford OEM DL3Z-19E616-A (without dual-zone auto climate) — replaces older revisions 9L3Z-19E616-B and AL3Z-19E616-A. Motorcraft YH-1779 is the same part in Motorcraft packaging. Dorman YH1777 is the most popular aftermarket and is genuinely equivalent — field reports show 5+ year service life, no meaningful difference from OEM. Dorman 604-209 is also acceptable. Because this is a non-safety part with a high failure rate, Dorman is the practical choice — about half the price of OEM. AVOID: no-name Amazon actuators under $15 — these have weaker plastic gears that strip within months. Identify which actuator is failing by listening to the clicking location (driver dash, passenger dash, center) before ordering — there are multiple per truck.",
    sourceCitationKey: "parts-sourcing-blend-door-actuator",
  },

  // ── 15. RockAuto category navigation ─────────────────────────────────
  {
    id: "parts-sourcing-rockauto-navigation-tips",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "RockAuto category navigation — where to find cam phasers, IWE, FPDM",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical", "drivetrain_4wd"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "RockAuto navigation", "RockAuto category", "RockAuto search tips",
      "록오토 카테고리", "find parts RockAuto",
    ],
    excerpt:
      "RockAuto categorizes some F-150 parts in non-obvious places. Reference for finding the tricky ones: CAM PHASERS — 'Engine > Camshaft Phaser' (not under Timing). VCT SOLENOIDS — 'Engine > Variable Valve Timing (VVT) Solenoid'. TIMING CHAIN KIT — 'Engine > Timing Chain Kit' (Cloyes/Melling complete kits are here, not under separate chain/guide listings). IWE SOLENOID — 'Drivetrain > 4WD Actuator > Solenoid' (not under Hubs). IWE HUB ACTUATOR — 'Drivetrain > 4WD Actuator > Hub' (same submenu). FUEL PUMP DRIVER MODULE (FPDM) — 'Electrical > Fuel Pump Driver Module' (not under Fuel). BLEND DOOR ACTUATOR — 'Heat & Air Conditioning > Blend Door Actuator' (multiple positions listed — verify driver vs passenger vs center). HEADLIGHT BULB H13 — 'Electrical > Light Bulb > Headlight' filter to H13/9008. Use the 'Quick Search' bar with Motorcraft part numbers (FL-820-S, DG-511, SP-515) — RockAuto resolves these directly to the right page.",
    sourceCitationKey: "parts-sourcing-rockauto-navigation-tips",
  },

  // ── 16. Cross-reference 2009-2014 interchange ────────────────────────
  {
    id: "parts-sourcing-2009-2014-interchange-split",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "2009-2014 parts interchange — the 2011 model year split, what does and doesn't fit",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical", "electrical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "2009-2014 interchange", "F-150 parts compatibility", "2011 split",
      "12th gen interchange", "year compatibility F-150",
    ],
    excerpt:
      "The 12th-gen F-150 has a major engine/electrical split at the 2011 model year. SHARED ACROSS 2009-2014: 6R80 transmission internals, most suspension (Moog K80149 ball joints, ES3693 tie rods, K80306/K80308 upper control arms all fit all years), brakes (BR-1414 front pads/350mm rotors all years 2010+), most chassis, IWE system (same vacuum hub from 2004-2014), hub bearings vary by year. NOT INTERCHANGEABLE: engine parts between 2009-2010 (4.6L/5.4L) and 2011-2014 (3.7/5.0/3.5EB/6.2) — completely different families. Wiring harnesses changed for 2011+ (new SYNC, different PCM connectors). Front fascia: 2009-2011 share, 2012-2014 share, but the headlight housings H13 bulb fits all years. CROSS-VEHICLE: 6R80 trans parts also fit 2009-2014 Expedition/Navigator and 2011+ Mustang GT. 5.0L Coyote engine internals fit Mustang GT. 5.4L 3V parts fit 2005-2010 Expedition/Navigator/E-Series — much larger used parts pool than F-150 alone. FL-820-S oil filter fits virtually every Ford V8 from 1997-2010.",
    sourceCitationKey: "parts-sourcing-2009-2014-interchange-split",
  },

  // ── 17. Junkyard / used parts — safe vs unsafe ───────────────────────
  {
    id: "parts-sourcing-junkyard-safe-vs-unsafe",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Used / junkyard parts — what's safe to buy used and what's not",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["body", "electrical", "engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "junkyard parts", "used parts F-150", "salvage yard",
      "Car-Part.com", "pull-a-part", "what to buy used",
    ],
    excerpt:
      "Used/junkyard parts can save 60-90% versus new but quality varies by category. SAFE TO BUY USED: body panels (doors, fenders, hood, tailgate, bed sides) — only watch for rust under paint. Glass (windshields, side windows). Interior trim, switches, knobs. Center console, seats. Side mirrors (verify power/heated/signal options). Headlight and taillight housings (test internal seals and connectors). Wheels. Tailgate latches and handles. Differential covers. Most plastic and metal trim. RISKY USED: alternators (Motorcraft remanufactured from RockAuto often cheaper than gambling on a junkyard pull). Starters (same reasoning). Transmissions (only with documented mileage and a leak-test). Engines (only if you can hear it run and pull a compression test). DO NOT BUY USED: brake calipers (seal degradation), brake hoses (rubber ages), wheel bearings (sealed but unknown miles), suspension joints (worn out is why they were pulled), ignition coils (counterfeits often resold as 'pulls'), spark plugs, sensors of any kind, gaskets (one-time use), seatbelts (federal law restricts), airbags (restricted and dangerous). Car-Part.com is the best US junkyard search; LKQ Pick Your Part chain has the largest US inventory.",
    safetyNote: "Brake hydraulic components and safety restraints should never be sourced used regardless of price savings.",
    sourceCitationKey: "parts-sourcing-junkyard-safe-vs-unsafe",
  },

  // ── 18. Alternator sourcing ──────────────────────────────────────────
  {
    id: "parts-sourcing-alternator-motorcraft-vs-reman",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Alternators — Motorcraft new vs remanufactured, avoid generic Amazon units",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["charging", "electrical"],
    issueAreaIds: ["battery_charge_and_ground_path"],
    partTags: ["alternator_area", "battery"],
    symptomTags: ["dead_battery"],
    aliases: [
      "alternator brand", "GL-928", "GL-8647", "Denso alternator",
      "remanufactured alternator", "F-150 alternator replacement",
    ],
    excerpt:
      "Alternator sourcing for the 12th-gen F-150. NEW OEM: Motorcraft GL-928 (2009-2010 4.6L/5.4L, 150 amp), GL-8647 (2011-2014 standard), GL-8673 (2011-2014 heavy-duty), GL-989 (2010-2014 6.2L Raptor high-output). Best long-term value but $250-400. REMANUFACTURED OEM: Motorcraft and Denso reman units from RockAuto run $90-150 with core charge — these are factory-rebuilt with new bearings, brushes, voltage regulator. Quality is essentially OEM-new. The Motorcraft 9L3Z-10346-A OEM core number is what to look for. ACCEPTABLE AFTERMARKET REMAN: Bosch, Remy, ACDelco, DB Electrical (lower tier but functional). AVOID: generic Amazon alternators under $80 — these are typically Chinese-rebuilt with substandard diodes that fail within 6-12 months, often taking out a battery as they fail. Before replacing the alternator, always check: battery condition (a weak battery makes an alternator look bad), all grounds (engine-to-frame, frame-to-body), and the B+ wire from alternator to starter solenoid for corrosion.",
    inspectionHint: "A reman alternator should come with a fresh pulley and visible new brushes through the case vent — if the case looks weathered, it is not actually reman.",
    sourceCitationKey: "parts-sourcing-alternator-motorcraft-vs-reman",
  },

  // ── 19. Air filter and cabin filter ──────────────────────────────────
  {
    id: "parts-sourcing-air-filters-wix-vs-motorcraft",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Air and cabin filters — Wix, Motorcraft, K&N — avoid no-name on cabin filter",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["fuel_air_metering", "cabin_controls"],
    issueAreaIds: [],
    partTags: ["intake_tube", "maf_sensor"],
    symptomTags: ["rough_idle"],
    aliases: [
      "air filter F-150", "Motorcraft FA-1927", "Motorcraft FP-70",
      "cabin filter", "K&N air filter", "Wix air filter",
    ],
    excerpt:
      "Air and cabin filter sourcing — these are the lowest-risk filter categories so brand matters less than for oil filters. ENGINE AIR FILTER: Motorcraft FA-1927 (5.4L 3V) is the OEM. Wix 49093, Fram CA10242, K&N 33-2385 (washable, lifetime warranty but slightly less filtration than paper). Avoid no-name eBay 'high flow' filters — these often pass debris that contaminates the MAF sensor, causing rough idle codes that owners then misdiagnose as bigger problems. CABIN AIR FILTER: Motorcraft FP-70 — the 12th-gen F-150 cabin filter location behind the glovebox is well-known. Aftermarket equivalents are fine: Wix 24863, Fram CF10547, K&N VF2042 (washable). Avoid no-name cabin filters — the frame dimensions are slightly off on some clones and they get sucked into the blower fan. Replace cabin filter every 15,000-20,000 miles; engine air filter every 20,000-30,000 miles or whenever it visibly darkens.",
    sourceCitationKey: "parts-sourcing-air-filters-wix-vs-motorcraft",
  },

  // ── 20. EcoBoost-specific sourcing notes ─────────────────────────────
  {
    id: "parts-sourcing-ecoboost-specific-notes",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "3.5L EcoBoost-specific sourcing — turbo, intercooler, HPFP, catch can",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["turbo_boost", "fuel_air_metering"],
    issueAreaIds: [],
    partTags: ["turbocharger", "intercooler", "high_pressure_fuel_pump", "oil_catch_can", "pcv_valve"],
    symptomTags: ["turbo_whine", "boost_loss", "oil_consumption"],
    aliases: [
      "EcoBoost parts", "3.5 turbo replacement", "intercooler upgrade",
      "EcoBoost HPFP", "catch can EcoBoost", "PCV valve EcoBoost",
    ],
    excerpt:
      "3.5L EcoBoost-specific sourcing. TURBOCHARGERS: OEM BorgWarner units — buy through Ford or Tasca. Avoid eBay 'rebuilt' EcoBoost turbos — the wastegate actuator calibration is critical and most rebuilders skip it. CHARGE PIPES: factory plastic charge pipes are known to crack — upgrade to Full-Race, Mishimoto, or AFE aluminum pipes ($150-250) when first replacing. Avoid no-name Amazon charge pipes (poor weld quality on the flange). INTERCOOLER: factory is adequate for stock; for tuned trucks Mishimoto MMINT-F150-11K or Wagner Tuning. HPFP (high-pressure fuel pump): OEM Bosch — do not buy aftermarket reman, the calibration is too tight. SPARK PLUGS: Motorcraft SP-534 iridium ONLY — gap 0.030 inch (much tighter than NA engines). PCV VALVE: factory PCV is integrated into the valve cover and clogs over time — a UPR or JLT oil catch can ($100-200) reduces intake valve carbon buildup, which is the #1 long-term reliability issue on direct-injection EcoBoost. CAM PHASER kit for the 3.5 EB is a known weak point in early production (2011-2012); the updated CL3Z-6A257-A phaser is the revised design.",
    safetyNote: "EcoBoost turbo wastegate actuators are vacuum/electronic — a misadjusted aftermarket actuator can cause boost spike and engine damage.",
    sourceCitationKey: "parts-sourcing-ecoboost-specific-notes",
  },

  // ── 21. Coyote 5.0 sourcing notes ────────────────────────────────────
  {
    id: "parts-sourcing-coyote-5-0-notes",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "5.0L Coyote-specific sourcing — Mustang GT parts pool, Ford M-6004 timing kit",
    vehicleScope: COYOTE_VEHICLE_ID,
    systemTags: ["engine_mechanical", "timing_valvetrain"],
    issueAreaIds: [],
    partTags: ["cam_phaser_area", "spark_plug", "coil"],
    symptomTags: ["rattle", "ticking"],
    aliases: [
      "5.0 Coyote parts", "M-6004-A504", "Coyote timing kit",
      "Livernois phaser", "Mustang GT interchange", "5.0 spark plug",
    ],
    excerpt:
      "5.0L Coyote-specific sourcing. ENGINE PARTS POOL: shares many internals with 2011+ Mustang GT — pistons, rods, valves, timing components all interchange. This makes used 5.0 parts cheap and plentiful. TIMING KIT: Ford Performance M-6004-A504 is the complete OEM kit (chains, guides, tensioners, phasers, sprockets) — this is the right way to do a Coyote timing job. AFTERMARKET PHASER UPGRADE: Livernois Motorsports LPP823126 adjustable phasers — useful for tuned trucks, overkill for stock. SPARK PLUGS: Motorcraft SP-548 (newer spec) or SP-515 — both are accepted, gap 0.052 inch. Some trucks list both; check VIN. COILS: DG-542 — same counterfeit warning as DG-511, buy from RockAuto/Tasca. OIL FILTER: FL-500-S (same as 3.5 EB and 3.7 V6). WATER PUMP: Motorcraft PW-502 (2011-2016). The 5.0 has a known issue with tick from VCT solenoid screen contamination at high mileage — clean the screens before assuming phasers, just like the 5.4 3V procedure.",
    sourceCitationKey: "parts-sourcing-coyote-5-0-notes",
  },

  // ── 22. 6.2 Boss / Raptor sourcing notes ─────────────────────────────
  {
    id: "parts-sourcing-boss-6-2-notes",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "6.2L Boss / Raptor-specific sourcing — limited aftermarket, Ford OEM heavy",
    vehicleScope: BOSS_VEHICLE_ID,
    systemTags: ["engine_mechanical", "charging"],
    issueAreaIds: [],
    partTags: ["coil", "spark_plug", "alternator_area"],
    symptomTags: ["misfire", "dead_battery"],
    aliases: [
      "6.2 Boss parts", "Raptor parts", "GL-989 alternator",
      "Boss V8 spark plug", "6.2 oil filter", "DG-542 6.2",
    ],
    excerpt:
      "6.2L Boss / Gen 1 Raptor-specific sourcing notes. AFTERMARKET CATALOG: much smaller than the 5.0 or 5.4 — the Boss was only sold in F-150 SVT Raptor, F-250 Super Duty, and the Boss-equipped 2010-2014 F-150 trims. Most aftermarket vendors do not stock specific Boss parts beyond consumables. OIL FILTER: FL-820-S (same as older V8s). SPARK PLUGS: SP-515 platinum. COILS: DG-542 (shared with Coyote). ALTERNATOR: Motorcraft GL-989 — high-output 200A+ unit for Raptor — much more expensive than the F-150 standard GL-8647. Reman units exist but limited; OEM new is sometimes the only practical choice. SERPENTINE BELT: Motorcraft JK8-1118 (similar to 5.0). TIMING / VALVETRAIN: the Boss has a different timing kit than the Coyote — do not cross-reference; the Boss uses Ford Performance specialty timing components, fewer aftermarket complete kits exist. Used Boss engines from Raptor wrecks via Car-Part.com are a viable strategy for major rebuilds — the F-150 6.2 and Raptor 6.2 are mechanically identical.",
    sourceCitationKey: "parts-sourcing-boss-6-2-notes",
  },

  // ── 23. Avoid lists — early-failure brands ───────────────────────────
  {
    id: "parts-sourcing-avoid-brand-list",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Avoid list — brands and listings known for early failure on 12th-gen F-150",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical", "electrical", "suspension_steering", "brakes"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "avoid these brands", "bad parts brands", "Detroit Axle warning",
      "AliExpress parts warning", "junk parts F-150",
    ],
    excerpt:
      "Brands and listing patterns to avoid on the 2009-2014 F-150, based on common field reports. SUSPENSION/STEERING: Detroit Axle complete kits — ball joints failing within 20-30K miles, tie rod ends with rough movement out of the box. AVOID for safety-critical work. IGNITION: any DG-511 or DG-549 coil from Amazon under $25/unit, any 'Motorcraft' coil shipped from overseas sellers — high counterfeit rate. SP-515 spark plugs from non-Motorcraft branding on Amazon. BRAKES: AliExpress brake pads/rotors regardless of brand markings — counterfeit Akebono and Wagner documented. Duralast budget pads (acceptable for a beater, not for a daily-driven 350K km truck). Generic eBay rotors with no published metallurgy. WHEEL BEARINGS: any unbranded Amazon hub under $60, MAS hub assemblies (mixed reports). ALTERNATORS: generic Amazon reman under $80 — diodes fail quickly. CABIN/TRIM: clone cabin air filters with off-spec dimensions. OIL FILTERS: any Fram, Wix, or Motorcraft filter from a third-party Amazon seller — counterfeit oil filters are documented and the consequences are catastrophic (no oil flow on cold start). GENERAL RULE: if the listing is 40%+ cheaper than RockAuto for an OEM-branded part, it is almost certainly counterfeit.",
    safetyNote: "Suspension, steering, and brake parts from these avoid-list sources can cause loss-of-control crashes. The savings are never worth it.",
    sourceCitationKey: "parts-sourcing-avoid-brand-list",
  },

  // ── 24. Counterfeit identification tips ──────────────────────────────
  {
    id: "parts-sourcing-counterfeit-identification",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "Counterfeit part identification — how to spot fake Motorcraft, Fel-Pro, Bosch",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical", "electrical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "counterfeit parts", "fake Motorcraft", "spot fake parts",
      "counterfeit detection", "fake oil filter", "fake coil",
    ],
    excerpt:
      "Counterfeit identification checklist for the most-faked parts on the 2009-2014 F-150. MOTORCRAFT OIL FILTER FL-820-S / FL-500-S: genuine has crisp blue ink printing on a clean white can; counterfeits often have slightly off-blue ink, smudged printing, or a duller paint finish. Cut the filter open after use — genuine has silicone anti-drain-back valve (semi-clear, flexible); counterfeit often has black nitrile (cheaper, fails cold-start). MOTORCRAFT DG-511 COIL: genuine boot is a single piece molded rubber with the Motorcraft logo embossed crisply; counterfeit boots have visible mold lines and a softer rubber that grips loosely on the plug. Weight: genuine DG-511 weighs ~150g, counterfeit often weighs significantly less due to thinner windings. MOTORCRAFT SP-515 PLUG: laser-etched markings on hex; counterfeit uses ink stamp that smudges with thumb pressure. Counterfeit plug threads often have visible burrs. FEL-PRO GASKETS: genuine ship in branded boxes with a part number sticker and a Fel-Pro hologram on premium gaskets; counterfeit ships in plain or generic boxes. BOSCH O2 SENSOR: genuine has a holographic Bosch label and laser-etched part number on the body; counterfeit has paper labels and stamped numbers. GENERAL RULE: any OEM-branded part shipped from an overseas seller via Amazon Marketplace or eBay, or priced 40%+ below RockAuto, is suspect. Buy from RockAuto, Tasca, FordParts.com, or a Ford dealer for parts where authenticity matters.",
    inspectionHint: "When in doubt, ask the seller for the lot number and verify it with the manufacturer — counterfeiters cannot match real lot databases.",
    sourceCitationKey: "parts-sourcing-counterfeit-identification",
  },

  // ── 25. RockAuto economy vs daily driver vs premium lines ────────────
  {
    id: "parts-sourcing-rockauto-tier-strategy",
    sourceType: "repair_note",
    sourceLabel: "Parts Sourcing Guide",
    title: "RockAuto tier strategy — Economy / Daily Driver / OEM-equivalent / Premium",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "RockAuto Economy", "RockAuto Daily Driver", "RockAuto tier",
      "RockAuto premium", "which RockAuto line", "RockAuto category sort",
    ],
    excerpt:
      "RockAuto sorts brands into rough quality tiers on each product page (visible at the bottom of each subcategory). Strategic use: ECONOMY (e.g., DuraGo rotors, Roadmax belts, generic Cardone reman calipers) — acceptable for non-critical parts and short-term needs. The Cardone Select line is functional but I would not buy a Cardone alternator if a Motorcraft reman is available within $40. DAILY DRIVER (e.g., Wagner ThermoQuiet, Monroe shocks, Standard Motor Products ignition) — good middle tier, fine for a 350K km truck. OEM-EQUIVALENT (e.g., Motorcraft, ACDelco, Akebono, Timken, Moog Problem Solver, Wix, Fel-Pro, Bilstein, KYB) — this is the sweet spot for most repairs on this F-150. Buy from this tier unless you have a specific reason. PREMIUM/PERFORMANCE (e.g., Hawk brake pads, Fox shocks, Cloyes 9-0391SB-VVT timing kits, Bosch premium O2 sensors) — worth it for specific applications: heavy towing, off-road, known-weakness repairs like 5.4 3V timing. RockAuto's 'Warehouse' column matters more than people realize — parts shipping from the same warehouse consolidate into one shipping charge. Sort by warehouse and order grouped items to minimize 배대지 forwarding cost when shipping to Korea.",
    sourceCitationKey: "parts-sourcing-rockauto-tier-strategy",
  },
];
