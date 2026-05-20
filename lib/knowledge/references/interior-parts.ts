import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

// 2009-2014 Ford F-150 interior / seat / cabin technology reference catalog.
// The 12th-gen interior varied dramatically by trim — XL was a vinyl work-truck,
// Limited (2013+) had heated/cooled massage seats, King Ranch had unique
// chaparral leather, Platinum had MyFord Touch + multi-contour seats. This file
// captures parts knowledge that the dealer parts catalog and RockAuto data do
// not document well: seat assemblies by trim, climate controls (incl. the
// famous blend door actuator issue), audio/SYNC generations, steering wheels,
// dash trims, headliner/sunroof, door panels, and aftermarket interior mods.
//
// TruckPartId coverage note — almost ALL interior part categories below do
// NOT yet have a TruckPartId. Recommended additions to lib/knowledge/types.ts
// when interior coverage is formalized:
//   - seat_assembly, seat_cushion, seat_track, seat_motor
//   - memory_seat_switch, memory_module
//   - seat_heater_element, seat_cooler_blower, seat_massage_motor
//   - climate_control_head, blend_door_actuator, hvac_blower_motor
//   - radio_head_unit, sync_apim_module, mft_screen, sony_amplifier, speaker, subwoofer
//   - steering_wheel, steering_wheel_switch, steering_column_heater
//   - dash_trim_panel, dash_pad, instrument_cluster
//   - center_console, console_lid, console_organizer
//   - headliner, sun_visor, sunroof_assembly, sunroof_motor, sunroof_drain
//   - door_panel, door_armrest, door_switch_pack
//   - carpet, floor_mat, kick_panel
//   - shift_knob (already noted in aesthetic-accessories.ts)
//   - airbag (occupant safety — handle as separate file)
// Until those exist, entries below reuse the closest existing TruckPartId
// (mostly "connector" for wiring, "light_bulb"/"lamp_socket" for interior
// lighting) and note the gap in the excerpt where useful. The bulk of
// interior entries have an empty partTags array as no current TruckPartId
// fits — this is intentional and documented per-entry.
//
// vehicleScope: most entries use F150_GENERAL_VEHICLE_ID
// ("2009-2014-ford-f150-general") since interior options crossed multiple
// trims. Raptor-specific seats and dash use the SVT Raptor scope
// ("2010-2014-ford-f150-svt-raptor"). When narrowing further is useful
// (e.g., King Ranch chaparral only on KR), the entry notes the trim in
// title/excerpt rather than tightening the scope, because trim-specific
// vehicle IDs do not exist in SupportedVehicleId.

export const INTERIOR_PARTS_REFERENCES: TruckReferenceRecord[] = [
  // ═══════════════════════════════════════════════════
  // SEATS — XL / STX / WORK-TRUCK CONFIGS
  // ═══════════════════════════════════════════════════
  {
    id: "interior-seat-xl-stx-cloth-vinyl",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "XL / STX cloth and vinyl seats — base work-truck configuration",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "XL seats", "STX seats", "work truck seats", "vinyl bench",
      "cloth bench seat", "40/20/40 bench", "manual seat",
      "XL 시트", "STX 시트", "비닐 시트", "벤치 시트",
    ],
    excerpt: "2009-2014 F-150 XL and STX trims came with the simplest seat configuration: either a 40/20/40 cloth or vinyl front bench seat (no console — the center 20% folds down as an armrest with storage) or a 40/console/40 cloth bucket seat pair. All XL/STX seats are MANUAL only — no power adjustment, no heat, no memory, no airbag side bolsters beyond the federally mandated side curtain (which is in the headliner). The vinyl option (Medium Stone or Steel Grey) was popular on fleet trucks and is wipe-clean. Junkyard pricing: $150-400 for a complete front bench assembly, $200-500 for a complete bucket pair. Aftermarket replacement covers (Coverking, Saddleman, Wet Okole) start at $130-280 per row. Easy to swap because there are no airbag harnesses, no heat element wiring, and no memory module to retain — only the seat belt anchor connections and the manual track bolts. Korean import note: full XL/STX seat assemblies are oversized freight from US — Coupang carries universal cloth/vinyl seat covers but not full assemblies.",
    inspectionHint: "Lift the seat cushion at the front edge — if there is no electric motor visible underneath, this is a manual seat. Check the seat belt buckle for the pretensioner harness; if disconnected after a prior owner removed the seat, the airbag light will be on.",
    sourceCitationKey: "interior-seat-xl-stx-cloth-vinyl",
  },
  {
    id: "interior-seat-xlt-cloth-leather",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "XLT cloth and optional leather seats — 6-way power driver",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "XLT seats", "XLT leather option", "6-way power seat",
      "XLT cloth bucket", "XLT 시트", "엑스엘티 가죽 시트",
    ],
    excerpt: "XLT trim seats came standard as cloth front bucket pair with 6-way power on the driver side (fore/aft, recline, height) and manual passenger. Optional XLT Leather package added perforated leather inserts on both seats but no heat, no cooling, and no memory function — that was reserved for Lariat and above. The XLT power seat motor and harness are the SAME unit Ford used in Lariat (just without the memory module), so a Lariat memory seat track can be swapped onto an XLT seat shell if the memory module and switches are added separately. Used XLT power seat assemblies $300-600 per side at LKQ/Car-Part.com. Common failure: driver-side lumbar inflator pump leaks air after 5-7 years (manual pump style; if the seat has electric lumbar it's an XLT Sport or higher). Aftermarket Katzkin leather reupholstery on an XLT cloth seat runs $1,200-1,800 installed and adds the look of leather without the cost of a Lariat seat swap.",
    inspectionHint: "Press the 6-way power switch in all four directions; if any direction is dead, the issue is usually the switch (cheap to replace, ~$30-60) before the motor. If you hear the motor running but the seat doesn't move, the gear drive cable is stripped — replace the motor assembly.",
    sourceCitationKey: "interior-seat-xlt-cloth-leather",
  },
  {
    id: "interior-seat-fx4-cloth-embroidered",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "FX4 / FX2 sport cloth seats with FX logo embroidery",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "FX4 seats", "FX2 seats", "FX cloth seats", "FX logo seats",
      "FX appearance seats", "FX 시트", "FX4 자수 시트",
    ],
    excerpt: "FX4 and FX2 trims (sport-appearance packages on the FX-tier) had unique black cloth seat covers with embroidered 'FX4' or 'FX2' logo on the seatback shoulder and red contrasting stitching on premium trims (FX Luxury Package). 6-way power driver seat standard, optional leather upgrade rare. Distinguishing feature: the bolster cloth pattern is more aggressive (sport pattern weave) than XLT cloth, and the FX logo is heat-pressed/embroidered into the headrest or upper backrest. Replacement cushion covers in OEM FX cloth are RARE — Ford discontinued the pattern, and aftermarket Coverking custom Saddleman replacements typically use a generic sport cloth that does not match. Junkyard FX4 seats run $400-800 per side because the cloth pattern is desired by FX4 owners restoring interiors. If the cloth tears or stains, options are: (1) Find a junkyard FX4 cushion ~$200-300, (2) Katzkin custom leather with red stitching as an upgrade ~$1,400-1,800, or (3) live with the damage. CRITICAL note: aftermarket FX4 logo embroidery patches sold on eBay are usually screen-printed, not embroidered — quality varies.",
    inspectionHint: "Look at the upper seatback for the FX4 or FX2 logo. If missing, prior owner has swapped to a non-FX seat cushion — common when the original cloth wore out. The seat frame and motor are still original.",
    sourceCitationKey: "interior-seat-fx4-cloth-embroidered",
  },

  // ═══════════════════════════════════════════════════
  // SEATS — LARIAT / KING RANCH / PLATINUM / LIMITED
  // ═══════════════════════════════════════════════════
  {
    id: "interior-seat-lariat-leather-memory",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Lariat 10-way power leather seats with 2-position memory",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical", "connectors_harness"],
    issueAreaIds: ["connector_and_harness_fitment"],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "Lariat seats", "memory seats", "10-way power seat",
      "lariat leather", "memory seat switch", "9L3Z-14A701",
      "라리에트 시트", "메모리 시트", "10-way 파워 시트",
    ],
    excerpt: "Lariat trim seats: 10-way power driver and passenger, heated front seats, perforated leather (Medium Stone, Black, or Tan), TWO-POSITION MEMORY tied to driver door key fob and exterior mirror tilt-down (in reverse). Memory switch part 9L3Z-14A701-AAW (driver door panel) is a KNOWN FAILURE POINT after 5-8 years — symptoms: memory button does not save position, M1/M2 buttons unresponsive, or the seat moves erratically when memory is recalled. Replacement switch $80-150 new, $30-60 used at junkyards. Memory MODULE (the actual computer that stores positions, located under the driver seat) part 9L3Z-14B205, $200-350. Heated seat elements failure is also common — driver-side bottom cushion element burns out from 200,000+ km of butt friction; element replacement requires unsewing the seat cover and is a 2-3 hour job. Used complete Lariat leather seat assembly $1,200-2,000 per side depending on color and condition. Lariat leather is INTERCHANGEABLE between 2009-2014 model years; the connectors are identical. Korean owners: do not import full Lariat seat assemblies — freight from US LKQ runs $400-800 alone.",
    inspectionHint: "Press the M1 memory button while seated; the seat, mirrors, and pedals (if equipped) should move to position 1. If only some functions move, the memory module has lost partial calibration — recalibrate via dashboard menu or scan tool.",
    sourceCitationKey: "interior-seat-lariat-leather-memory",
  },
  {
    id: "interior-seat-king-ranch-chaparral",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "King Ranch chaparral leather seats — signature saddle brown",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "King Ranch seats", "chaparral leather", "saddle brown leather",
      "KR seats", "King Ranch interior", "two tone leather",
      "킹랜치 시트", "차파랄 가죽", "새들 브라운",
    ],
    excerpt: "King Ranch trim has its signature CHAPARRAL leather — a warm saddle-brown leather with a distinctive embossed 'King Ranch' running W brand logo on the headrests and seat back, two-tone stitching pattern, and a tooled-leather look on the seatback bolsters. 10-way power, heated front, 2-position memory (same module as Lariat). The chaparral leather is UNIQUE TO KING RANCH — no aftermarket Katzkin equivalent matches the color or texture exactly (Katzkin sells a 'King Ranch replica' that comes close but is not OEM). When chaparral leather cracks (typical on driver side after 150,000+ km of sun + butt wear), options are: (1) Junkyard chaparral cushion $400-800 if you can find one with no cracking, (2) Leather reconditioning by a specialist (Leatherique, leather dye + filler) $200-400, (3) Full Katzkin replica reupholstery $1,800-2,400 — looks like KR but is technically aftermarket. Complete used KR seat assembly $2,500+ per side because the chaparral leather is scarce. Korean import: do not attempt — too heavy, too rare, and Korean re-leather shops can do a competent replica for less.",
    inspectionHint: "Run a finger across the seatback embossing — if the King Ranch W logo and tooled pattern are smooth/worn flat, the leather has been sanded by aftermarket leather treatments. Original KR leather retains its texture for 200,000+ km if conditioned.",
    sourceCitationKey: "interior-seat-king-ranch-chaparral",
  },
  {
    id: "interior-seat-platinum-multicontour",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Platinum heated/cooled multi-contour seats with Active Motion",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical", "connectors_harness"],
    issueAreaIds: ["connector_and_harness_fitment"],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "Platinum seats", "multi contour seats", "active motion seats",
      "heated cooled seats", "ventilated seats", "platinum leather",
      "플래티넘 시트", "통풍 시트", "냉온 시트",
    ],
    excerpt: "Platinum trim (2009-2014, premium tier above Lariat) features the MULTI-CONTOUR front seats with heating, COOLING (ventilation via small blower fans in the cushion and backrest), and Active Motion massage on Limited/Platinum from 2013+. Leather is premium Tuxedo or Steel Grey with quilted stitching pattern. The seat cooler is the most failure-prone — a small DC blower fan pulls cabin air through perforated leather; after 80,000+ km, the fan can clog with debris or seize, leaving the cooling function dead while heat still works. Blower fan replacement is approximately $150-300 per side at a body shop (requires removing seat cover). Multi-contour adjustments add 2 bolster inflators on each seat (driver and passenger), powered by a small air pump under the seat — pump failure causes seat sides to stay deflated; pump $200-400 OEM. Used Platinum seat assemblies $1,800-3,500 per side depending on year and color. The 2013-2014 Platinum seats have a different connector pin-out than 2009-2012 — verify year compatibility before swapping.",
    inspectionHint: "Turn the seat cooler on max with the engine running and place your hand on the perforated leather surface — you should feel definite airflow within 30 seconds. If no airflow, the blower fan or its harness has failed.",
    sourceCitationKey: "interior-seat-platinum-multicontour",
  },
  {
    id: "interior-seat-limited-massage",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Limited (2013+) heated/cooled massage front seats",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Limited seats", "massage seats", "active motion",
      "limited interior", "limited leather", "second row heated",
      "리미티드 시트", "마사지 시트", "액티브 모션",
    ],
    excerpt: "F-150 Limited launched as a 2013 model-year top-tier trim above Platinum and adds heated/cooled MASSAGE front seats with the Ford Active Motion system — 4 air bladders in the seatback that inflate and deflate in sequence to produce a rolling massage. Second-row seats are HEATED (outboard positions). Leather is unique to Limited with a quilted diamond pattern on the seat inserts and 'Limited' embroidery on the headrests. The massage system shares the multi-contour bolster pump (one air pump runs both massage and bolsters), and pump failure disables both functions. Common after 60,000+ km. Pump replacement $250-500 plus 2-3 hours labor. The Limited's second-row heat is unusual for F-150 — it adds heating element + relay + harness behind the rear seat backrest; failure modes are typically the rear seat connector at the C-pillar (corrosion if water has leaked through a rear window seal). Used Limited seat assemblies are RARE on the secondary market because Limited sold in low volume; expect $2,500-4,500 per side when found. Korean import: do not — practically impossible to source matching parts.",
    inspectionHint: "Activate the massage function from the touchscreen menu (Comfort > Massage). You should feel a wave of pressure traveling up and down the seatback within 10 seconds. If only the heat works, the air pump or massage actuator has failed.",
    sourceCitationKey: "interior-seat-limited-massage",
  },
  {
    id: "interior-seat-raptor-recaro",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "SVT Raptor cloth Recaro-style sport seats with red stitching",
    vehicleScope: "2010-2014-ford-f150-svt-raptor",
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Raptor seats", "Raptor recaro", "SVT recaro",
      "Raptor sport seats", "red stitching seats", "raptor cloth",
      "랩터 시트", "레카로 시트", "SVT 레카로",
    ],
    excerpt: "2010-2014 SVT Raptor came standard with Recaro-style high-bolster sport cloth seats (NOT actual Recaro branding — Ford-designed but Recaro-inspired) featuring aggressive side bolsters, integrated headrests, and red contrasting stitching. The cloth has a checkered/grippy texture for off-road body retention. Raptor-specific 'SVT' or 'Raptor' logo embroidery on the seatback. 6-way power driver, manual passenger. Optional Luxury Package added leather upgrade with red stitching ($2,500+ original option). The high seat bolsters DO interfere with full-size adults entering/exiting — getting in is more of a 'slide-over-the-bolster' than the typical drop-in of a Lariat seat. Replacement: junkyard Raptor seats are EXPENSIVE ($800-1,500 per side cloth, $1,500-3,000 leather) because of the Raptor enthusiast market. The Raptor seat cushion frame is wider than non-Raptor F-150 — they will bolt into a non-Raptor F-150 floor pan but the bolts require some adjustment because the Raptor floor has slightly different mounting reinforcement.",
    inspectionHint: "Look at the front edge of the seat bolster — Raptor seats wear through the cloth at the driver-side outer bolster within 100,000 miles from sliding in/out. Inspect for foam compression on this corner.",
    sourceCitationKey: "interior-seat-raptor-recaro",
  },
  {
    id: "interior-seat-tremor-2014",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Tremor (2014-only) black cloth seats with Tremor logo",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Tremor seats", "2014 Tremor interior", "Tremor cloth",
      "FX2 Tremor", "트레모 시트", "트레모 패키지",
    ],
    excerpt: "Tremor was a 2014 model-year only sport package built on the regular cab / SuperCab FX2 platform with a 3.5L EcoBoost and short bed. The interior is unique to this single year and trim: black cloth bucket seats with TREMOR logo embroidery on the headrest and red contrasting stitching, paired with black leather-wrapped steering wheel with red stitching and gloss black dash trim. 6-way power driver. Tremor was a low-volume sub-trim — total production estimates 2,500-4,000 units, making junkyard parts effectively unobtainable. Cushion or backrest covers in OEM Tremor cloth are nearly impossible to source; Katzkin or Coverking custom-stitched replicas (specify 'black with red contrast stitching') are the practical replacement at $400-800 per set. If you find a Tremor seat at a junkyard, expect $800-1,400 because of rarity. Korean import: practically impossible — these were not exported to Korea in any volume; only US-market gray-import trucks would have them.",
    inspectionHint: "Confirm Tremor authenticity by the headrest embroidery AND the rocker panel 'Tremor' badge AND the gloss black grille — fake Tremor builds add the seats only and leave other trim mismatched.",
    sourceCitationKey: "interior-seat-tremor-2014",
  },
  {
    id: "interior-seat-memory-switch-failure",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Memory seat switch failure — common after 5-8 years",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical", "connectors_harness"],
    issueAreaIds: ["connector_and_harness_fitment"],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "memory seat broken", "memory button not working",
      "memory switch failure", "M1 M2 not saving",
      "메모리 시트 고장", "M1 M2 작동 안함",
    ],
    excerpt: "The Lariat/King Ranch/Platinum/Limited memory seat switch (driver door panel — small button cluster with 'SET', 'M1', 'M2') has a known failure mode after 5-8 years: the switch contacts oxidize from cabin moisture and the button presses register intermittently or not at all. Symptoms: pressing M1/M2 does nothing, SET button does not save current position, or the seat moves erratically when memory is recalled. Diagnosis: pull the door panel, disconnect the memory switch harness, and continuity-test the switch contacts with a multimeter — if SET+M1 does not register continuity when pressed, the switch is failed. Replacement switch part 9L3Z-14A701-AAW driver side, $80-150 new from Ford dealer, $30-60 used from LKQ/Car-Part. The MODULE under the seat (part 9L3Z-14B205, $200-350) can also fail independently — symptom is that the switch passes continuity test but the seat still doesn't save positions. Forscan can be used to reset/recalibrate the memory module after replacement. This failure is on the bot's top-five Lariat/KR/Platinum reliability complaints list along with HVAC blend door, MFT software, and IWE solenoid.",
    inspectionHint: "Press and HOLD the SET button until you hear a beep, then press M1. The seat position should now be saved to M1. If no beep occurs when SET is held, the switch contacts are bad. If beep occurs but M1 recall does nothing later, the module is failed.",
    sourceCitationKey: "interior-seat-memory-switch-failure",
  },

  // ═══════════════════════════════════════════════════
  // CLIMATE / HVAC CONTROLS
  // ═══════════════════════════════════════════════════
  {
    id: "interior-hvac-manual-3knob",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Manual 3-knob A/C control (XL/STX) and blend door actuator failure",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["rattle"],
    aliases: [
      "3 knob AC", "manual climate control", "blend door actuator",
      "blend door clicking", "YH-1777", "HVAC clicking",
      "수동 에어컨", "블렌드 도어", "에어컨 딸깍",
    ],
    excerpt: "XL and STX trims (and base XLT) used a 3-knob manual A/C control with rotary dials for temperature, fan speed, and mode (vent/floor/defrost). Even on this 'simple' system, the F-150's NOTORIOUS blend door actuator failure still occurs — Ford part YH-1777 (Motorcraft, $25-40 each) is the small plastic actuator motor that drives the temperature blend door behind the dash, and it ALL 2009-2014 F-150 trims have at least 2-4 of these actuators (mode door, blend door, recirculation door — and dual-zone systems double that count). FAMOUS F-150 ISSUE: when a blend door actuator's internal plastic gear strips, you get a rhythmic clicking/ticking sound behind the glove box or center dash every time the truck starts or the climate setting changes. Diagnostic: place ear near glove box with engine running and change temperature from cold to hot — clicking confirms actuator gear failure. Replacement: most accessible actuator is the blend door behind the glove box, ~30-60 minutes DIY with a 7mm socket and small Phillips. Driver-side actuators behind the dash require more disassembly. Multi-zone systems (XLT+) add 1-2 more actuators per side.",
    inspectionHint: "With engine off and ignition on, change the climate temp from full cold to full hot, then mode from vent to floor to defrost — listen for clicking, popping, or grinding from behind the dash. Any of these = actuator gear failure.",
    sourceCitationKey: "interior-hvac-manual-3knob",
  },
  {
    id: "interior-hvac-dual-zone-electronic",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Dual-zone electronic climate control (XLT+) — LCD display",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: ["rattle"],
    aliases: [
      "dual zone climate", "EATC", "electronic auto temp control",
      "EATC failure", "climate display dim", "climate control replacement",
      "듀얼존 에어컨", "전자식 에어컨", "EATC",
    ],
    excerpt: "XLT chrome package, Lariat, King Ranch, and most FX4 trims came with the dual-zone Electronic Automatic Temperature Control (EATC) — driver and passenger have independent temperature setpoints, LCD display in the center stack, AUTO mode and bi-level/floor/defrost mode buttons. This system uses 4-6 blend door actuators (left blend, right blend, mode, recirc, sometimes left/right defrost) — DOUBLE the actuator count of the manual XL system, meaning DOUBLE the failure points. The LCD display itself can fail after 7-10 years (pixels go missing or screen goes dim) — replacement EATC head unit $200-400 used at LKQ, $500-900 new from Ford dealer. CRITICAL: when buying a used EATC head, match the YEAR carefully because Ford changed the connector pinout between 2009-2010 and 2011-2014 (the mid-cycle refresh changed the climate control style). The 2011+ control has a more squared-off layout with separate AUTO and DEFROST buttons. Aftermarket EATC retrofits to upgrade XL manual control to dual-zone require a wiring harness, additional blend door actuator, and re-coding via Forscan — $400-700 in parts plus a half day of work.",
    inspectionHint: "Press the AUTO button — both driver and passenger fans should adjust automatically based on cabin temperature sensor (located in the headliner near the dome light). If only one zone responds or AUTO mode does nothing, the in-cabin temp sensor or its tiny aspirator fan is failed (sensor $30-50, accessible behind the headliner).",
    sourceCitationKey: "interior-hvac-dual-zone-electronic",
  },
  {
    id: "interior-hvac-tri-zone-rear",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Tri-zone climate with rear vents (Platinum/Limited/Raptor)",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "tri zone climate", "rear climate", "second row vents",
      "platinum HVAC", "limited HVAC", "rear AC",
      "트라이존 에어컨", "뒷좌석 에어컨", "3-zone",
    ],
    excerpt: "Platinum, Limited, and Raptor trims (when ordered with the appropriate package) include the tri-zone climate system: independent driver, passenger, AND rear cabin temperature control. The rear cabin has its own ceiling-mounted ducts (one in each B-pillar headliner area or two in the headliner above the rear seat — varies by cab) and a small rear blower motor with a fan-speed switch on the back of the center console. The rear blower motor (under the rear seat or in the rear footwell, depending on cab) is a separate failure point — symptoms: rear vents have low or no airflow even with front blower on high; cause: rear blower motor failure or its resistor pack ($60-150 new). Tri-zone systems add another 1-2 blend door actuators in the rear ductwork (under the rear seat) — these are HARD to access and are usually only replaced when they fail loudly. The rear cabin temperature sensor is in the rear headliner. Used tri-zone head units are uncommon; if you need to replace one, plan on $400-800 and verify exact part number from Ford parts catalog. Korean note: Korean F-150 imports rarely had tri-zone option ticked.",
    inspectionHint: "Turn rear blower to max with front blower also on — both should produce strong airflow at their respective vents. If the rear is weak while front is strong, the rear blower motor or resistor is failed.",
    sourceCitationKey: "interior-hvac-tri-zone-rear",
  },

  // ═══════════════════════════════════════════════════
  // AUDIO / INFOTAINMENT / SYNC
  // ═══════════════════════════════════════════════════
  {
    id: "interior-audio-base-am-fm",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Base AM/FM radio (XL/STX) — 4-speaker, optional 6-CD",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "base radio", "AM FM radio", "XL radio", "STX radio",
      "4 speaker", "6 CD changer", "기본 라디오", "AM FM",
    ],
    excerpt: "XL and STX trims came with a basic AM/FM/CD single-disc radio and 4 speakers (2 front door, 2 rear door or rear quarter panel depending on cab). No Bluetooth, no USB, no SYNC. An optional Sony in-dash 6-CD changer added trunk-style multi-disc on some 2009-2011 XL/STX builds — rare. The radio chassis is a standard double-DIN size and accepts most aftermarket head units with a wiring harness adapter (Metra 70-5520 or similar, ~$15-25) and a dash kit (Metra 95-5824, ~$25-40). Aftermarket head unit upgrades are popular on XL/STX since the factory unit lacks modern features — a $200-500 Pioneer/Kenwood/Sony double-DIN with Bluetooth, USB, Apple CarPlay or Android Auto is a common upgrade. Important note: upgrading to a SYNC-equipped head unit from a higher trim (Lariat) is NOT plug-and-play — SYNC requires the APIM module behind the dash, plus steering wheel controls, microphone, and dedicated wiring that XL/STX trucks lack. Buying a complete SYNC retrofit kit (head unit + APIM + harness + mic) on a forum runs $400-700 used.",
    inspectionHint: "If the factory radio displays but produces no sound, check the speaker fuse (under-dash fuse box, typically fuse #12, 15A). If sound on one side only, a door speaker harness is open at the door hinge boot (common rust point in salty climates).",
    sourceCitationKey: "interior-audio-base-am-fm",
  },
  {
    id: "interior-audio-sync-gen1",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Ford SYNC Generation 1 (2009-2010) — Bluetooth, USB, voice",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical", "connectors_harness"],
    issueAreaIds: ["connector_and_harness_fitment"],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "SYNC 1", "SYNC Gen 1", "SYNC Microsoft",
      "ford sync original", "AppLink", "SYNC update",
      "싱크 1세대", "포드 싱크",
    ],
    excerpt: "Ford SYNC Generation 1 (2009-2010 model years, Microsoft-based) added Bluetooth phone pairing, USB media playback, and voice command to XLT+ trims. The hardware lives in the APIM (Accessory Protocol Interface Module) located behind the dash — separate from the radio head unit, which is still a CD/AM/FM unit with the SYNC overlay. Voice command is invoked by the steering-wheel push-to-talk button. SYNC 1 supports A2DP streaming audio (limited — some early phones only stream as mono), HFP for hands-free phone, and USB MP3 playback. NO touchscreen, NO navigation, NO AppLink in the original 2009 firmware — AppLink was added via free software updates starting in 2012. Updating SYNC 1 firmware to the latest version (3.10 or higher, terminal version) is FREE from Ford's owner.ford.com site — download to USB stick, plug into the truck, and follow the prompts. Critical for compatibility with modern smartphones (iOS 15+, Android 12+) — older firmware will not pair with newer phones. APIM replacement: $200-400 used from LKQ, $500-900 new from Ford.",
    inspectionHint: "Press the voice button on the steering wheel and say 'Phone, what is my phone status?' — SYNC should respond with Bluetooth status. If no response, the APIM has lost its programming or the microphone (located in the rear-view mirror or overhead console) has failed.",
    sourceCitationKey: "interior-audio-sync-gen1",
  },
  {
    id: "interior-audio-sync-mft",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "SYNC with MyFord Touch (MFT) 2011-2014 — 8-inch touchscreen",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical", "connectors_harness"],
    issueAreaIds: ["connector_and_harness_fitment"],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "MyFord Touch", "MFT", "SYNC 2", "8 inch touchscreen",
      "MFT software glitch", "MFT freezing", "navigation system",
      "마이포드터치", "MFT", "터치스크린 내비",
    ],
    excerpt: "MyFord Touch (MFT, marketed as SYNC 2 internally) launched in 2011 on Lariat+ trims and is the famous Ford 8-inch touchscreen system with four-corner navigation (Phone, Audio, Climate, Navigation) and dual 4.2-inch instrument cluster displays. MFT is INFAMOUSLY GLITCHY in early firmware — symptoms: random reboots, black screen, Bluetooth dropouts, slow response to touches, navigation freezing. Ford issued 7+ free firmware updates between 2011-2015 to address — terminal version is 3.10 (released 2015), and any MFT system on older firmware should be updated. Updates are free at owner.ford.com — download to USB stick, plug into truck, allow 30-60 minutes to install. NAVIGATION required the optional NAV package — without NAV the touchscreen has 3 corners (Phone, Audio, Climate) and a 'no nav' placeholder. SYNC 3 (introduced 2016 model year, Android-based) is NOT compatible with 12th-gen F-150 — there is no factory upgrade path from MFT to SYNC 3 for 2009-2014 trucks. Aftermarket 'SYNC 3 retrofit' kits are sold on forums but require swapping APIM, screen, and harnesses — $1,500-3,000 in parts and labor.",
    inspectionHint: "Touch each corner of the 8-inch screen and verify it goes to the correct menu (Phone, Audio, Climate, Navigation). If the screen does not respond to touch at all, the touch digitizer panel has failed — replacement screen assembly $300-600 used.",
    sourceCitationKey: "interior-audio-sync-mft",
  },
  {
    id: "interior-audio-sony-premium",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Sony Premium Sound System (Lariat+) — 8 speakers with subwoofer",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "Sony premium sound", "Sony 8 speaker", "amplified system",
      "Sony subwoofer", "lariat sound system", "premium audio",
      "소니 사운드", "소니 프리미엄", "서브우퍼",
    ],
    excerpt: "The Sony Premium Sound System was optional on Lariat and standard on King Ranch, Platinum, and Limited trims. 8 speakers total: 2 front door mid-range with separate tweeters in the A-pillar, 2 rear door (or rear quarter) mid-range, 1 center dash speaker, and 1 subwoofer (mounted behind the rear seat in SuperCab/SuperCrew, or in the center console on Regular Cab). External amplifier mounted under the rear seat or behind the rear seat bottom panel powers all 8 channels (~150-200W RMS total). The Sony system uses unique high-impedance speakers that are NOT plug-and-play interchangeable with non-Sony speakers — Sony speakers are 2-3 ohm where non-Sony are 4 ohm, so swapping introduces volume mismatch and possible amplifier protection mode. The amplifier itself fails occasionally (typical symptom: sudden loss of all audio, hot amp casing after listening for a while) — replacement amp $200-400 used. The subwoofer enclosure can develop rattles after 8-10 years from foam surround degradation — sub replacement $80-150 OEM. Upgrade path: keep Sony amp, swap subwoofer for a higher-grade aftermarket sub (JL Audio 10TW3 fits with bracket adapter ~$200-300).",
    inspectionHint: "Set fader to full rear and balance to center — you should hear strong sub bass from behind the rear seat. If bass is thin or distorted, the sub or amp channel has failed. Switch to front fader — vocals should sound centered with help from the dash speaker.",
    sourceCitationKey: "interior-audio-sony-premium",
  },

  // ═══════════════════════════════════════════════════
  // STEERING WHEEL
  // ═══════════════════════════════════════════════════
  {
    id: "interior-steering-wheel-by-trim",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Steering wheel options by trim — urethane, leather, wood, heated",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "steering wheel", "leather wrapped wheel", "heated steering wheel",
      "wood steering wheel", "King Ranch wheel", "audio steering controls",
      "스티어링 휠", "가죽 핸들", "열선 핸들",
    ],
    excerpt: "Steering wheel options across 2009-2014 F-150 trims: (1) URETHANE (XL/STX/base) — black molded plastic, no controls, cheapest replacement at $80-150 used. (2) LEATHER WRAPPED (XLT optional, Lariat/FX4 standard) — perforated leather grip with audio + cruise + voice buttons, $150-300 used. (3) HEATED LEATHER (Platinum, Limited standard; Lariat optional) — adds heating element woven into the leather; requires the heated-wheel APIM coding and an extra wire pair to the slip ring; not a simple bolt-on upgrade. (4) WOOD + LEATHER (King Ranch) — KR-unique with real wood inserts at the spoke crossbar, complete used wheel $300-600 because of rarity. (5) RAPTOR — leather wrapped with red 12 o'clock stripe and SVT logo on the lower spoke, $250-450 used. The wheel itself bolts on with a single nut behind the airbag — but BEWARE the airbag clock spring under the wheel: improper handling can damage the clock spring, which costs $150-300 to replace and triggers an airbag light. Disconnect the battery for 5+ minutes before pulling the airbag connector to bleed any stored energy. Heated wheel retrofit requires: heated wheel + heated wheel switch + APIM software update + extra wire to slip ring.",
    inspectionHint: "Push each steering wheel switch (volume, channel, voice, cruise) — if any are dead, the issue is usually the switch (cheap, $30-60) or the clock spring contact (more expensive, $150-300 and 1-2 hours labor).",
    safetyNote: "Disconnect the battery for 5 minutes before removing the steering wheel airbag — failure to do so can deploy the airbag during removal and cause serious injury.",
    sourceCitationKey: "interior-steering-wheel-by-trim",
  },

  // ═══════════════════════════════════════════════════
  // DASH TRIM / INSTRUMENT CLUSTER
  // ═══════════════════════════════════════════════════
  {
    id: "interior-dash-trim-by-trim",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Dash trim materials by trim — plastic, aluminum, wood, piano black",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "dash trim", "instrument panel trim", "wood trim",
      "brushed aluminum trim", "piano black trim", "dash accents",
      "대시 트림", "우드 트림", "브러시드 알루미늄",
    ],
    excerpt: "Dash trim materials vary clearly by trim level on 2009-2014 F-150: (1) XL — charcoal hard plastic, no accents, fleet-grade. (2) XLT — silver/gray painted-plastic accents around climate controls and shifter bezel. (3) FX4 — gloss black 'sport' accents (FX Appearance Package) with red contrasting stitching on seats. (4) Lariat — brushed aluminum-look (actually injection-molded plastic with aluminum finish) trim panels on center stack and door sills. (5) King Ranch — distinctive real-wood-look accents (laminate, not solid wood) with the KR running W brand and tooled-leather inserts on the dash brow. (6) Platinum — combination of brushed aluminum and brushed nickel accents, premium feel. (7) Limited — piano black gloss with chrome accents — visible fingerprints are common, and the gloss black scratches easily. (8) Raptor — flat black with red contrast stitching on dash brow, racing-style gauges with red lighting accents. Replacement dash trim pieces are sold individually by Ford — each panel $40-200 OEM depending on size. Aftermarket carbon-fiber-look wraps (Rdash, Putco, generic) cost $60-200 for a full dash kit and stick over the OEM trim for a custom look.",
    inspectionHint: "If dash trim is peeling or bubbling (common on the wood-look King Ranch panel after 10+ years of sun), the laminate has separated from the substrate — replacement panel needed; reglue rarely lasts.",
    sourceCitationKey: "interior-dash-trim-by-trim",
  },
  {
    id: "interior-instrument-cluster",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Instrument cluster — 4.2-inch productivity screen (MFT trims)",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "instrument cluster", "gauge cluster", "productivity screen",
      "4.2 inch display", "cluster replacement", "speedometer",
      "계기판", "클러스터", "프로덕티비티 스크린",
    ],
    excerpt: "Two main instrument cluster variants on 2009-2014 F-150: (1) BASIC ANALOG (XL/STX/XLT base) — speedometer, tach, fuel, temp gauges with small central LCD for trip/odometer. (2) DUAL 4.2-INCH PRODUCTIVITY SCREENS (Lariat MFT, KR, Platinum, Limited, Raptor) — two color LCD displays flanking the analog speedometer, controllable via 4-way steering wheel buttons; show trip computer, navigation guidance, audio info, off-road info (Raptor adds pitch/roll and shock travel info), and warning messages. Both cluster types fail predictably at high mileage: (a) Speedometer needle stuck or erratic — stepper motor failure, $150-300 cluster rebuild service (preserves odometer), $300-600 used cluster from junkyard (odometer mismatch issue — need to swap EEPROM). (b) Dim or missing LCD pixels — backlight LED failure, can be replaced individually with surface-mount LEDs and a soldering iron, $30-50 in parts. (c) Productivity screen blank — usually a software glitch fixable by disconnecting battery for 10 minutes; if persistent, requires APIM software update or cluster replacement. Replacement clusters MUST be reprogrammed to match the truck's VIN via Forscan — running an unprogrammed cluster will throw a 'mileage tampering' light.",
    inspectionHint: "Cycle through the productivity screen menus with the steering wheel buttons — if any specific page (fuel economy, trip, navigation) shows garbled text or freezes, the cluster firmware is corrupt and needs update via Forscan.",
    sourceCitationKey: "interior-instrument-cluster",
  },

  // ═══════════════════════════════════════════════════
  // CENTER CONSOLE / FLOOR
  // ═══════════════════════════════════════════════════
  {
    id: "interior-center-console",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Center console options — flow-through, jump seat, work-truck",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "center console", "flow through console", "jump seat console",
      "console replacement", "console lid broken", "console hinge",
      "센터 콘솔", "플로우 스루 콘솔", "점프 시트",
    ],
    excerpt: "Three main center console configurations on 2009-2014 F-150: (1) NO CONSOLE / BENCH SEAT (XL/STX base) — 40/20/40 bench with fold-down armrest in the middle 20%, no floor console. (2) FLOW-THROUGH CONSOLE (most XLT+ with bucket seats) — large floor console with deep storage bin, top tray with USB/12V outlets, leather-trimmed lid, cup holders, and pass-through to under-dash storage. THIS IS THE MOST COMMON CONFIG. (3) CENTER JUMP SEAT (rare Lariat/XLT bucket option with 6-passenger seating) — a small fold-down center seat between the bucket seats serving as a small 6th seating position; when folded up it becomes an armrest. The jump-seat option was rare because most buyers preferred the storage of the flow-through console. CONSOLE LID FAILURES: the leather-wrapped armrest lid hinge develops slop or breaks the hinge clip after 5-8 years; replacement lid $60-150 used. The console latch button can also break — replacement latch $20-40. Console-mounted Sony subwoofer (Sony Premium Sound on Regular Cab) is enclosed within the console — DO NOT block sub vents when adding aftermarket organizers.",
    inspectionHint: "Open and close the console lid 5 times — if there is any side-to-side wobble at the hinge or the latch does not catch firmly, the hinge bushings are worn. Replace the full lid assembly rather than chase individual parts.",
    sourceCitationKey: "interior-center-console",
  },

  // ═══════════════════════════════════════════════════
  // HEADLINER / SUNROOF / SUN VISORS
  // ═══════════════════════════════════════════════════
  {
    id: "interior-headliner-sunroof",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Headliner material, sunroof variants, and drain tube maintenance",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["leak"],
    aliases: [
      "headliner", "sunroof", "moonroof", "panoramic moonroof",
      "sunroof drain", "headliner sagging", "sunroof leak",
      "헤드라이너", "선루프", "파노라마 루프",
    ],
    excerpt: "Headliner and roof options: (1) BASIC CLOTH HEADLINER (most trims) — tan or gray molded fabric over foam substrate; sags at the rear of the cab after 8-12 years (foam degrades and adhesive lets go); replacement headliner board with recover is $200-500 DIY material, $400-800 installed. (2) SUEDE HEADLINER (Platinum, Limited) — Alcantara-like microfiber finish; sags similarly but at lower failure rate. (3) POWER SUNROOF/MOONROOF (optional Lariat+, standard Platinum/Limited) — single-panel tilt-and-slide glass roof, ~32 inches square, motor mounted in the headliner. (4) PANORAMIC MOONROOF (Limited 2013+, optional Platinum 2013+) — large dual-panel glass roof with both panels sliding; rare on F-150 because the cab roof is short. CRITICAL SUNROOF DRAIN ISSUE: the sunroof has 4 drain tubes (front-left, front-right, rear-left, rear-right) that route water from the sunroof tray to outside the truck via small rubber tubes inside the A-pillars and C-pillars. These tubes clog with leaves/dirt every 2-3 years — symptom: water drips from headliner near the sun visor, dome light, or A-pillar after a heavy rain. CLEAR DRAINS using compressed air blown from the sunroof tray (use moderate pressure 30-40 PSI; high pressure can blow the tube off its fitting). Sunroof motor failure: $200-400 used, $500-900 new, plus 2-4 hours labor to access.",
    inspectionHint: "Open the sunroof fully and look at the corners of the tray — you should see 4 small holes (the drain tube openings). Pour a tablespoon of water into each hole; water should drain out at the corresponding underbody location within 30 seconds. If any drain backs up, it's clogged.",
    safetyNote: "Sunroof drain failure causing water in the cabin can short the heated/cooled seat module, the memory seat module, or the BCM under the driver seat — all of which sit on the floor pan and can suffer expensive corrosion damage. Address sunroof leaks immediately.",
    sourceCitationKey: "interior-headliner-sunroof",
  },
  {
    id: "interior-sun-visors",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Sun visors — vanity mirror, illuminated, by trim",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "lighting"],
    issueAreaIds: ["lighting_socket_wiring"],
    partTags: ["light_bulb", "lamp_socket"],
    symptomTags: [],
    aliases: [
      "sun visor", "vanity mirror", "illuminated visor",
      "visor mirror light", "visor replacement", "visor sagging",
      "선바이저", "바이저 거울", "조명 바이저",
    ],
    excerpt: "Sun visor options scale with trim: (1) BASIC VINYL VISOR (XL/STX) — no mirror, no light. (2) CLOTH VISOR WITH VANITY MIRROR (XLT/FX4/Lariat) — small flip-down vanity mirror with no light. (3) ILLUMINATED VANITY MIRROR (Lariat optional, KR/Platinum/Limited standard) — vanity mirror with 2 small incandescent bulbs that light when the cover is opened. Incandescent bulbs (Type 8 wedge, $2-5 each) burn out after 5-10 years of use and are replaceable from the front of the mirror (carefully pop the bezel with a plastic trim tool). Visor SAGGING is a common issue — the visor hinge friction wears and the visor flops down on bumps; fix is to replace the visor pivot pin clip ($15-25 each, sold as a set) or replace the whole visor ($60-150 each used). The Limited and KR visors have unique embroidered trim — replacement specific to trim level. Korean note: rear-view mirror with HomeLink garage opener is a common option on Platinum/Limited — Korean homes rarely use HomeLink-compatible garage door openers, so this feature is functionally useless in Korea.",
    inspectionHint: "Flip down each visor — if it falls past horizontal under its own weight, the pivot clip is worn. Replace the clip before the visor block falls off entirely.",
    sourceCitationKey: "interior-sun-visors",
  },

  // ═══════════════════════════════════════════════════
  // DOOR PANELS / DOOR HARDWARE
  // ═══════════════════════════════════════════════════
  {
    id: "interior-door-panels",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Door panels — cloth, leather, carbon-look, King Ranch chaparral",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "body"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "door panel", "door card", "door trim panel",
      "door panel replacement", "door armrest", "door speaker grille",
      "도어 패널", "도어 카드", "도어 트림",
    ],
    excerpt: "Door panel variants follow seat trim: (1) BASIC CLOTH/VINYL (XL/STX) — single-color hard plastic with cloth or vinyl center insert, manual window cranks on lowest trims, no power lock switches if equipped with manual locks. (2) CLOTH WITH SOFT-TOUCH ARMREST (XLT) — better foam armrest, power window/lock switches, optional leather insert. (3) LEATHER INSERTS (XLT optional+) — textured leather over foam in the door panel center, color-matched to seats. (4) CARBON FIBER PATTERN (FX4 Sport, FX Appearance) — textured panels with carbon-look insert and red stitching. (5) KING RANCH CHAPARRAL — door panel matches seat leather, with KR running W embossed on the armrest insert. (6) PLATINUM/LIMITED — premium leather wrap with quilted stitching pattern. The door panel houses: power window switch, power lock switch, mirror controls, memory seat switch (driver side, Lariat+), speaker grille, and tweeter (if Sony Premium Sound). Door panel REMOVAL: 2 screws inside the door pull recess, 1 screw inside the armrest pocket, 1 screw behind the upper trim cap, then pop the 9-10 plastic clips around the perimeter with a trim tool. Watch the wiring harness when pulling the panel away — disconnect the switch packs before fully separating. Replacement door panels $150-400 used at LKQ depending on trim and color.",
    inspectionHint: "After re-installing a door panel, roll all windows up and down and test all door panel switches before driving — a missed connector behind the panel will show as a dead switch.",
    sourceCitationKey: "interior-door-panels",
  },

  // ═══════════════════════════════════════════════════
  // CARPET / FLOOR / SPECIALTY MOD PARTS
  // ═══════════════════════════════════════════════════
  {
    id: "interior-carpet-replacement",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "OEM and aftermarket replacement carpet sets",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "carpet replacement", "molded carpet", "ACC carpet",
      "auto custom carpet", "lloyds carpet", "carpet kit",
      "카펫 교체", "몰디드 카펫", "ACC 카펫",
    ],
    excerpt: "Replacement carpet sources for 2009-2014 F-150: (1) ACC AUTO CUSTOM CARPETS — molded one-piece replacement (front + rear), nylon loop or cut-pile, color-matched to OEM, $200-400 per cab type. ACC is the most popular DIY replacement source. (2) LLOYDS MATS — premium custom-made, including embroidered logos (F-150, FX4, KR brand), $300-600 per set. (3) FORD OEM — Ford parts catalog still lists 2009-2014 F-150 carpet at $400-800 per set; rarely competitive. (4) STOCK INTERIORS / TMI — vintage truck carpet specialists, $250-500 per set. Carpet REPLACEMENT job: full removal of front seats, console, sill plates, kick panels, and door sill weather strip; a complete one-man DIY takes 6-10 hours. Severely water-damaged carpet (from a sunroof leak or window weather strip failure) often hides corroded floor pan, BCM corrosion, or wet seat heater modules under the carpet — inspect the floor pan before installing new carpet. The Limited has a unique anti-fatigue padded carpet that is thicker than other trims — confirm trim-specific part number when ordering.",
    inspectionHint: "Pull the front edge of the carpet up at the door sill and feel underneath with the back of your hand — if damp, there is an active water intrusion (sunroof, weather strip, or windshield seal) that must be fixed BEFORE installing new carpet.",
    sourceCitationKey: "interior-carpet-replacement",
  },
  {
    id: "interior-seat-covers-aftermarket",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Aftermarket seat covers and Katzkin reupholstery options",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "seat covers", "Katzkin", "Coverking", "Saddleman",
      "Wet Okole", "BDK seat covers", "ETOPARS",
      "시트 커버", "캣츠킨", "커버킹", "재가죽",
    ],
    excerpt: "Seat cover and reupholstery options: (1) UNIVERSAL COVERS (BDK, ETOPARS, FH Group) — $30-100 per pair, generic polyester or neoprene, slip-on or strap-on, mediocre fit. Most popular on Coupang in Korea for budget-conscious owners. (2) CUSTOM-FIT COVERS (Coverking, Saddleman) — $150-400 per row, custom-cut to F-150 seat shape, includes cutouts for seat belt, headrest, console armrest, and side airbag deployment seams. Available in neoprene, ballistic nylon, leatherette, cordura. (3) WET OKOLE — $250-500 per row, premium neoprene, made-in-USA, lifetime warranty, popular for FX4/Raptor outdoor use. (4) KATZKIN LEATHER REUPHOLSTERY — $1,500-2,500 installed, removes OEM seat cover and installs custom-stitched leather over OEM foam; results match factory leather quality if installer is skilled. Katzkin is the premium aftermarket route — turns an XLT cloth interior into a Lariat-grade leather interior. CRITICAL for side airbag-equipped seats (most trims 2009+): the cover MUST have a specific airbag-rated seam at the side bolster that releases under deployment force. Generic seat covers may sew over this seam and prevent airbag deployment.",
    safetyNote: "Universal seat covers that block or restrict the side airbag deployment seam can prevent the airbag from firing correctly. Only use covers explicitly designed for F-150 with airbag-rated stitching at the outer bolster.",
    sourceCitationKey: "interior-seat-covers-aftermarket",
  },
  {
    id: "interior-mod-gauge-pods",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Tuner gauge pods — A-pillar, dash, and steering column mount",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "gauge pod", "A pillar pod", "tuner gauges", "boost gauge mount",
      "EGT gauge mount", "lotek pod", "edge insight CTS3",
      "게이지 포드", "튜너 게이지", "부스트 게이지",
    ],
    excerpt: "For tuned/modified F-150s (mostly 3.5L EcoBoost, occasionally 6.2L Boss), aftermarket gauge pod mounting locations: (1) A-PILLAR POD — Lotek 2-gauge ($45-75) or 3-gauge ($65-95) molded ABS pod that replaces or overlays the A-pillar trim; fits 2-1/16 inch round gauges. Most popular for boost gauge + EGT gauge combo. (2) DASH-TOP POD — small monitor mount for Edge Insight CTS3 or SCT iTSX touchscreen tuner display ($30-60 mount); puts the tuner screen in eyeline. (3) STEERING COLUMN POD — uncommon on F-150, more popular on diesel trucks. (4) AIR VENT MOUNT — Prosport air-vent gauges ($25-50 vent mount), slips into a center dash A/C vent without modification, ideal for one-gauge installs. CRITICAL on F-150 A-pillar: the side curtain airbag is INSIDE the A-pillar — any gauge pod or modification must clear the airbag deployment path. Lotek and similar aftermarket pods are designed around this, but DIY drilled-and-mounted pods are dangerous. Wiring path for a pillar pod gauge: down behind the A-pillar trim, through the dash to the OBDII port (for EGT/boost from CAN bus) or through the firewall to a sensor at the intake manifold/exhaust.",
    inspectionHint: "Trigger the side curtain airbag visually by simulating a deployment line — if the pod sits over the airbag tear seam, it will redirect the airbag downward in a crash. Most quality pods route the gauge to the windshield side of the A-pillar to avoid this.",
    safetyNote: "Side curtain airbags deploy along the A-pillar in a millisecond. Any gauge pod or trim modification that blocks the deployment path can cause the airbag to misdeploy in a side collision. Use only F-150-specific A-pillar pods designed around the airbag tear seam.",
    sourceCitationKey: "interior-mod-gauge-pods",
  },
  {
    id: "interior-mod-shift-knob-pedals",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Shift knob, pedal pad, and dead pedal aftermarket replacements",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "shift knob replacement", "billet shift knob", "pedal pad",
      "dead pedal cover", "throttle pedal pad", "brake pedal pad",
      "기어봉 교체", "페달 패드", "데드 페달",
    ],
    excerpt: "Small interior aesthetic modifications popular on F-150: (1) SHIFT KNOB — for floor-console-shifted trims (XLT+), the OEM leather/chrome PRNDL knob unscrews counter-clockwise (apply heat gun if glued from factory). Aftermarket: Mishimoto leather ($30-60), Razo billet ($45-90), Raptor SVT shift knob from Ford parts ($60-100). Column-shifter trims (XL/STX/some XLT) have no aftermarket support — only OEM replacement $25-50. (2) PEDAL PADS — Ford OEM brushed-stainless pedal cover kit (gas + brake + dead pedal, ~$80-150 for the SVT Raptor pedal kit) bolts over OEM pedals with included hardware; gives a sport look. Aftermarket: Roush, BBK, generic Amazon $25-60 sets. (3) DEAD PEDAL (driver footrest) — most F-150 floor pans have a molded rubber footrest pad to the left of the brake pedal; aftermarket brushed-aluminum or rubber-textured cover $20-40, sticks with 3M VHB. (4) STEERING WHEEL COVER — universal slip-on covers $15-50 (Korean brands SAMTOM, GoldKnight; US BDK/ETOPARS); only consider if OEM leather is severely worn — cover slides under steering wheel buttons and can interfere with audio controls. Korean note: gear shift knob and steering wheel covers are heavy categories on Coupang — easier to buy locally than import.",
    inspectionHint: "After installing aftermarket pedal pads, press the brake pedal hard and check for slippage — if the pad slides under foot pressure, the adhesive backing failed or the surface was not properly degreased before install. Remove and reattach with fresh 3M VHB.",
    sourceCitationKey: "interior-mod-shift-knob-pedals",
  },

  // ═══════════════════════════════════════════════════
  // INTERIOR LIGHTING / DOME / MAP LIGHTS
  // ═══════════════════════════════════════════════════
  {
    id: "interior-dome-map-lights",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Dome, map, and cargo light LED upgrades",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "lighting", "electrical"],
    issueAreaIds: ["lighting_socket_wiring"],
    partTags: ["light_bulb", "lamp_socket"],
    symptomTags: [],
    aliases: [
      "dome light", "map light", "interior LED", "courtesy light",
      "cargo light", "vanity mirror bulb", "194 LED",
      "돔 라이트", "맵 라이트", "실내등 LED",
    ],
    excerpt: "F-150 interior lighting locations and bulb types: (1) DOME LIGHT (headliner center) — uses 211-2 / 578 festoon bulb on most trims, swaps to LED festoon for cooler color temp; OEM incandescent ~$3-5, LED festoon $5-15 each. (2) MAP LIGHTS (driver and passenger over rearview mirror) — Type 168/194 wedge bulbs, Diode Dynamics LUXX 194 LED in cool white or warm white $15-25 per pair. (3) VANITY MIRROR LIGHTS (Lariat+ illuminated visors) — Type 8 wedge bulbs, $2-5 incandescent OEM or LED replacement $8-15 each. (4) GLOVE BOX LIGHT — Type 194 wedge, $3-5. (5) DOOR PUDDLE LIGHTS (Lariat+ with chrome package) — small 194 bulb in lower door panel that illuminates ground when door opens; common to convert to LED for brighter ground illumination. (6) CARGO BED LIGHT (cab back, lights bed when bed switch is on) — Type 906 bulb or LED replacement. (7) UNDER-DASH FOOTWELL LIGHTS (Platinum/Limited) — small LED strips in passenger and driver footwell, color-changeable on Limited (red/blue/teal/etc.) via the touchscreen ambient lighting menu. Footwell LED replacement is a full strip swap, $25-60 OEM. LED interior conversion total cost for the typical truck: $30-80 for all interior bulbs.",
    inspectionHint: "When swapping the dome light to LED, hold the LED festoon by the metal contacts only (not the LED itself) and reverse polarity if it does not light up — LED festoons are polarity-sensitive, incandescent festoons are not.",
    sourceCitationKey: "interior-dome-map-lights",
  },

  // ═══════════════════════════════════════════════════
  // KOREA / IMPORT — INTERIOR SOURCING
  // ═══════════════════════════════════════════════════
  {
    id: "interior-korea-sourcing-difficulty",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Korea import — interior parts are hardest category to source",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "korea interior parts", "F-150 interior korea",
      "coupang seat covers", "interior import",
      "한국 인테리어 부품", "쿠팡 시트 커버",
    ],
    excerpt: "Sourcing F-150 interior parts in Korea is the HARDEST category compared to exterior, engine, or suspension parts. Reasons: (1) Korean Ford dealers will not stock 2009-2014 F-150 interior parts — they were never officially imported in volume, and the dealer parts system shows zero inventory. (2) Interior parts are bulky and freight-expensive — full seat assemblies, dash panels, headliners exceed 40 lbs and oversize box dimensions, incurring $150-400 freight from US. (3) Junkyard sourcing is impossible in Korea — there are no 2009-2014 F-150 in Korean salvage yards in any volume. (4) Aftermarket import is limited — Coupang carries seat covers, carpet mats, sun shades, steering wheel covers, and small accessories from Chinese and Korean suppliers, but NOT OEM seats, dash trim, headliner, door panels, or instrument clusters. PRACTICAL STRATEGY for Korean F-150 owners: (a) Use Coupang for fitment items <5 lb (mats, covers, shades, USB chargers). (b) Order small interior parts (HVAC actuators, light bulbs, switches) through RockAuto or Amazon US with standard shipping; typically ~$15-50 + $25-50 shipping = manageable. (c) For LARGE items (seats, dash, console, headliner), the only viable option is bring-when-traveling, or accept oversize freight cost from LKQ/Car-Part.com when no alternative exists. (d) Local Korean re-leather shops (재가죽 업체) can do leather reupholstery on damaged OEM seats at lower cost than importing replacement seats — confirm shop has F-150 fitment experience.",
    inspectionHint: "Before ordering ANY interior part from US, check Coupang search '포드 F150 인테리어' and 11번가 for the same SKU — Korean-stocked aftermarket sometimes runs at half the US delivered price.",
    sourceCitationKey: "interior-korea-sourcing-difficulty",
  },

  // ═══════════════════════════════════════════════════
  // OPTIONS PACKAGES / ELECTRIC FEATURES SUMMARY
  // ═══════════════════════════════════════════════════
  {
    id: "interior-power-features-by-trim",
    sourceType: "repair_note",
    sourceLabel: "Interior Parts Reference",
    title: "Interior power and convenience features summary by trim",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "power features", "convenience package", "interior options",
      "power windows locks", "auto dim mirror", "homelink",
      "파워 옵션", "편의 기능", "인테리어 옵션",
    ],
    excerpt: "Interior power and convenience features by trim level (general 2009-2014 mapping, with year and package variation): (1) XL — manual windows, manual locks, manual mirrors, key entry, no SYNC, vinyl floor, basic seats. (2) STX — power windows, power locks, key entry, manual mirrors, base radio. (3) XLT — power windows + locks + heated mirrors, remote keyless entry, intermittent wipers, optional SYNC, optional 6-way power driver. (4) FX2/FX4 — XLT features + sport cloth seats, FX appearance trim, optional FX Luxury Package (leather + dual-zone + SYNC + Sony). (5) LARIAT — 10-way power memory seats, dual-zone EATC, SYNC standard, heated front seats, leather, auto-dim rearview mirror with compass, reverse sensing system, optional NAV and Sony. (6) KING RANCH — Lariat features + chaparral leather + wood trim + KR-branded floor mats and badging. (7) PLATINUM — KR features + multi-contour heated/cooled seats + MFT + Sony std + power-deployable running boards (some years) + HomeLink. (8) LIMITED — Platinum + massage seats + 2nd-row heat + unique quilted leather + adaptive cruise (2014). (9) RAPTOR — XLT-base or Luxury-Package interior depending on year, with Raptor-unique gauges, seats, steering wheel, and shift knob. Power feature failures correlate with mileage: at 200,000+ km expect at least one of (power window regulator, door lock actuator, mirror motor, blend door actuator, memory seat switch) to need replacement.",
    inspectionHint: "Test all power windows, all power locks, both mirror motors (tilt and fold if equipped), all door lock buttons, and the heated/cooled seat functions BEFORE buying any used F-150 — these are the most common failure points and the seller usually doesn't disclose them.",
    sourceCitationKey: "interior-power-features-by-trim",
  },
];
