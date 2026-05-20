import { RAPTOR_GEN2_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

// Aftermarket modification reference entries for the Gen 2 Raptor
// (2017-2020 3.5L EcoBoost HO). These are NOT duplicates of the items in
// raptor-gen2-reference.ts — that file covers OEM known issues, fluid specs,
// torque specs, TSBs, and buying-guide content. This file is the catalog of
// performance/suspension/protection/interior modifications, factory part vs
// aftermarket alternative, install complexity, and cost ranges.

export const RAPTOR_MODIFICATIONS_REFERENCES: TruckReferenceRecord[] = [
  // ═══════════════════════════════════════════════════════════════════════
  //  Performance Mods (1-8)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 1. ECU tune ─────────────────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-ecu-tune",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "ECU tune — MPT, Livernois, 5 Star, COBB (+50-100 whp)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical", "turbo_boost", "fuel_air_metering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "ECU tune", "PCM tune", "MPT tune", "Livernois tune", "COBB Accessport",
      "SCT X4", "BDX tuner", "5 Star tune", "More Power Tuning", "race tune",
      "튜닝", "ECU 튜닝", "성능 튜닝",
    ],
    excerpt:
      "Factory: stock PCM calibration, 450 hp / 510 lb-ft. The single highest bang-for-buck mod on the Gen 2 Raptor. The 3.5L HO EcoBoost responds extremely well to tuning. Top tuners: MPT (More Power Tuning) on SCT X4 or BDX — +80-100 whp / +100 wtq on 91/93 octane, ~$400 tune + $400 device, multiple map slots (tow/performance/race), community favorite. Livernois MyCalibrator (LPP631148) — +54 to +106 peak whp / +96 wtq, ~$700-800, includes tow + performance tunes and free updates. COBB Accessport (AP3-FOR-003) — +50-70 whp on OTS maps, ~$650-750, best for datalogging and flex-fuel integration. 5 Star Tuning — +60-80 whp, conservative daily-friendly maps. Install: 5-10 minute OBD flash. Warranty implication: any tune leaves a flag on the PCM that Ford dealers can detect even after returning to stock; expect powertrain warranty denials.",
    inspectionHint:
      "Always datalog the first 100 miles after flashing a new tune. Watch for knock retard, fuel trims, and IAT under boost. If running 87 octane on a 91+ tune, the truck will pull timing aggressively — never run lower octane than the tune was calibrated for.",
    safetyNote:
      "Any tune voids the factory powertrain warranty in practice. Save the stock calibration before flashing. Do NOT stack tunes (do not run an MPT tune over a COBB tune or vice versa).",
    sourceCitationKey: "raptor-gen2-mod-ecu-tune",
  },

  // ── 2. Intercooler upgrade ──────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-intercooler-upgrade",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Intercooler upgrade — CVF, Mishimoto, Full-Race (mandatory with tune)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["turbo_boost", "intake_vacuum", "cooling"],
    issueAreaIds: ["intercooler_condensation", "turbo_boost_leak"],
    partTags: ["intercooler", "charge_pipe"],
    symptomTags: ["boost_loss", "stumble"],
    aliases: [
      "intercooler upgrade", "CVF intercooler", "Mishimoto intercooler",
      "Full-Race intercooler", "charge air cooler upgrade", "FMIC",
      "MMINT-F150T-17", "인터쿨러 업그레이드",
    ],
    excerpt:
      "Factory: small bar-and-plate intercooler that heat-soaks within 2-3 hard pulls; IAT climbs 30-50F above ambient under sustained load. Considered mandatory with any tune. CVF Race Intercooler — 85% larger core, bar-and-plate, ~$600-700, best budget option, bolt-on. Mishimoto MMINT-F150T-17 Performance Kit — 77% larger core, 163% more fin area, cast end tanks, includes aluminum charge pipes with DuraCore silicone (replaces flimsy stock plastic boots), ~$900-1,100, the sweet-spot choice. Full-Race V2 Kit — 1,000+ CFM flow, less than 1 PSI drop at 600+ hp, ~$1,200-1,500, premium choice for serious power builds. Install: 4-6 hours DIY, bumper-off access required. Pipe-kit versions also fix the leak-prone stock plastic couplers.",
    inspectionHint:
      "After install, check all couplers and clamps after first heat cycle and after first WOT pull. Watch IAT on a scan tool — a properly working upgraded CAC should hold IAT within 10-25F of ambient even under sustained load.",
    sourceCitationKey: "raptor-gen2-mod-intercooler-upgrade",
  },

  // ── 3. Downpipes and cat-back exhaust ───────────────────────────────────
  {
    id: "raptor-gen2-mod-exhaust-system",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Exhaust system — Full-Race/MBRP downpipes, Borla/Corsa/MBRP cat-back",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["exhaust_emissions", "turbo_boost"],
    issueAreaIds: ["turbo_boost_leak"],
    partTags: ["exhaust_manifold", "catalytic_converter_area"],
    symptomTags: ["turbo_whine"],
    aliases: [
      "downpipes", "catted downpipes", "Borla exhaust", "Corsa exhaust",
      "MBRP exhaust", "AWE exhaust", "cat-back", "Full-Race downpipes",
      "Ford Performance exhaust", "배기 시스템", "다운파이프", "머플러",
    ],
    excerpt:
      "Downpipes — stock are restrictive; catted downpipes add 15-25 whp with a tune. Full-Race 3\" catted DPs ~$800-1,000 (gold standard). MBRP catted DPs ~$500-700 (budget). Catless versions exist but create emissions and check-engine-light issues. Cat-back systems: Borla ATAK/S-Type/Touring T-304 stainless with Million-Mile Warranty, $800-1,400, Ford Performance system is co-developed with Borla. Corsa Sport (14397)/Extreme uses RSC (Reflective Sound Cancellation) for deep throaty idle with minimal drone, $900-1,300, community favorite for daily driving. AWE 0FG/Track Edition balanced V6 note, $1,000-1,500, high-end fit/finish. MBRP XP Series/Race aluminized or stainless, $400-700, best sound per dollar. Ford Performance M-5200-F15RTB OEM+ tone, $800-1,000, maintains warranty if dealer installed. Install: cat-back 1-2 hours DIY, downpipes 4-6 hours and may require lift.",
    inspectionHint:
      "After install, re-torque clamps after first heat cycle. Check downpipe-to-turbo flange for boost leaks under load. Catless DPs will trigger P0420/P0430 — requires tune to disable cat monitors.",
    safetyNote:
      "Catless downpipes are not legal for street use in most jurisdictions. Korea emissions testing will fail any vehicle without functional catalytic converters.",
    sourceCitationKey: "raptor-gen2-mod-exhaust-system",
  },

  // ── 4. Oil catch can ────────────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-oil-catch-can",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Oil catch can — JLT, UPR, Mishimoto (still recommended on PFDI)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical", "intake_vacuum"],
    issueAreaIds: ["direct_injection_carbon_buildup"],
    partTags: ["oil_catch_can", "pcv_valve"],
    symptomTags: ["oil_consumption"],
    aliases: [
      "oil catch can", "OCC", "JLT catch can", "UPR catch can",
      "Mishimoto catch can", "oil separator", "blow-by", "PCV catch",
      "오일 캐치캔",
    ],
    excerpt:
      "Factory: stock PCV routes blow-by gases back to the intake. Even with PFDI (port + direct injection), the 3.5L HO still produces meaningful blow-by and a catch can captures real oil. JLT 3.0 Oil Separator (passenger side) — 12 oz, ~$100-150, best value, catches ~95% of blow-by per forum consensus, easy 30-min DIY install. UPR Dual-Valve Catch Can (5030-221-1) — 16 oz, ~$250-300, patented multi-chamber design, ECSS option, most thorough filtration. Mishimoto Baffled Oil Catch Can — 16 oz, ~$150-200, clean look, good middle ground. Drain interval: every 3,000-5,000 miles or monitor sight glass. Skipping catch can on a tuned/boosted truck accelerates carbon-related issues even with port injection.",
    inspectionHint:
      "Drain catch can at every oil change minimum. If can fills to overflow before 5,000 miles, suspect excessive blow-by from worn rings — pull a leakdown test.",
    sourceCitationKey: "raptor-gen2-mod-oil-catch-can",
  },

  // ── 5. Blow-off valve ───────────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-blow-off-valve",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Blow-off valve — Turbosmart Vee Port EM (functional at higher boost)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["turbo_boost", "intake_vacuum"],
    issueAreaIds: ["turbo_boost_leak"],
    partTags: ["blow_off_valve", "charge_pipe"],
    symptomTags: ["boost_loss", "turbo_whine"],
    aliases: [
      "BOV", "blow-off valve", "Turbosmart BOV", "Vee Port EM",
      "Smart Port Supersonic", "bypass valve", "diverter valve",
      "블로우오프 밸브",
    ],
    excerpt:
      "Factory: plastic electronically-actuated BOV. Works fine at stock boost but cracks/leaks under higher boost from a tune. Turbosmart Vee Port EM (TS-0225-1001) — ~$250-350, plug-and-play, aircraft-grade aluminum, handles 30+ PSI, patented gated control with high-speed solenoid, the go-to upgrade. Turbosmart Smart Port Supersonic — ~$200-300, similar plug-and-play, crack and leak resistant. HKS does NOT dominate the EcoBoost market — Turbosmart is the standard for Ford trucks. Functional vs cosmetic: at stock boost mostly cosmetic (louder whoosh sound). With a tune pushing 22-25 PSI it becomes a reliability upgrade — the stock plastic BOV is the weak link.",
    inspectionHint:
      "After install, check for boost leaks at the BOV inlet with a smoke test. Under-pressurized BOV will produce a fluttery 'compressor surge' sound — adjust spring pre-load if applicable.",
    sourceCitationKey: "raptor-gen2-mod-blow-off-valve",
  },

  // ── 6. Cold air intake ──────────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-cold-air-intake",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Cold air intake — JLT, S&B, K&N (skip unless you want the sound)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["intake_vacuum", "fuel_air_metering"],
    issueAreaIds: [],
    partTags: ["intake_tube", "maf_sensor"],
    symptomTags: ["turbo_whine"],
    aliases: [
      "cold air intake", "CAI", "JLT intake", "S&B intake", "K&N intake",
      "air box", "intake upgrade", "흡기 시스템",
    ],
    excerpt:
      "Factory: the stock Raptor airbox is already very well designed — Ford engineered it for dusty desert conditions with a large filter area. Many tuners report 5-10 whp gains at best from an aftermarket intake and warn of reduced filtration quality. JLT Cold Air Intake (615-Series) — claimed 15-20 whp, open-element, ~$300-400. S&B Filters CAI (75-5085) — claimed 10-15 whp, excellent filtration, oiled or dry options, ~$300-400. K&N 63-Series AirCharger — claimed 8-12 whp, ~$250-350. Recommendation: skip unless you specifically want the turbo whoosh sound. Put the money toward an intercooler instead. If you must have one, JLT or S&B for the desert. Always use a quality filter — the desert eats engines through poor filtration.",
    inspectionHint:
      "After install, clear adaptive MAF tables via scan tool. Watch fuel trims for the first 100 miles — an over-oiled K&N filter can foul the MAF sensor and trigger lean codes.",
    sourceCitationKey: "raptor-gen2-mod-cold-air-intake",
  },

  // ── 7. E85 / flex fuel conversion ──────────────────────────────────────
  {
    id: "raptor-gen2-mod-e85-flex-fuel",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "E85 / flex fuel — sensor + tune unlocks +60-80 whp over 93 octane",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["fuel_air_metering", "engine_mechanical", "turbo_boost"],
    issueAreaIds: [],
    partTags: ["fuel_injector", "high_pressure_fuel_pump"],
    symptomTags: [],
    aliases: [
      "E85", "flex fuel", "ethanol", "E50", "Fuel-It sensor",
      "COBB flex fuel", "GooseTuned E50", "에탄올 연료",
    ],
    excerpt:
      "Why it works: ethanol has higher octane (~105) and much higher latent heat of vaporization, enabling more aggressive timing/boost with less knock risk. Limitation: stock fuel system (injectors + LPFP + HPFP) cannot support full E85. Maximum safe blend is ~E50 (50% ethanol). Components: Fuel-It or Burger Motorsports plug-and-play ethanol content sensor kit ~$200-300, 30-min install. COBB CAN Flex Fuel Kit (sensor + module + harness) ~$350-450, integrates with Accessport. Required tune: MPT, COBB, Livernois, or GooseTuned flex-fuel calibration — mandatory, ~$100-200 add-on. Real-world gains with E50: COBB Stage 2 47 whp on 93 to 514 whp on E50 (+67 whp). MPT E50 tune +150-180 whp over bone stock. Total cost ~$500-600 for sensor + tune. Always have gas-station backup plan — E85 isn't available everywhere.",
    safetyNote:
      "NEVER run E85 blend without a proper flex-fuel tune. The stock calibration will run dangerously lean on ethanol blends and can destroy the engine in a single pull.",
    sourceCitationKey: "raptor-gen2-mod-e85-flex-fuel",
  },

  // ── 8. Turbo upgrade ────────────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-turbo-upgrade",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Turbo upgrade — Garrett PowerMax Stage 2 (500-700+ whp potential)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["turbo_boost", "engine_mechanical"],
    issueAreaIds: ["turbo_bearing_failure", "turbo_boost_leak"],
    partTags: ["turbocharger", "turbo_oil_feed_line", "turbo_oil_return_line"],
    symptomTags: ["turbo_whine", "boost_loss"],
    aliases: [
      "turbo upgrade", "Garrett PowerMax", "Stage 2 turbos", "PTE turbos",
      "Full-Race Formline", "drop-in turbos", "터보 업그레이드",
    ],
    excerpt:
      "The proven path for serious power on the 3.5L HO EcoBoost. Garrett PowerMax Stage 2 — 54% flow increase over stock, 500-700+ whp potential with supporting mods, ~$2,500-3,500 (pair), bolt-on OEM fitment, 60mm compressor wheel, 50mm Inconel turbine, 0.45 A/R housing, gold standard upgrade. PTE (Precision Turbo) drop-in upgrades — ~50-60% flow, 500-650+ whp, ~$2,500-4,000, less common but proven. Full-Race Formline custom kit — 600-800+ whp, ~$5,000-8,000+, custom turbo manifold + larger turbos, race/prerunner builds. Required supporting mods: upgraded intercooler ($1,200-1,500), upgraded fuel system for 600+ whp ($1,000-2,000), custom tune ($500-800), upgraded downpipes ($800-1,000), catch can, E50 for max power. Real-world: Garrett Stage 2 + intercooler + tune on 93 octane = ~500 whp. Garrett + E55 + fuel upgrades = 560+ whp / 610+ wtq. Full-Race Formline + full build = 700+ whp. Install: 12-20 hours, lift required.",
    safetyNote:
      "Turbo upgrade without supporting fuel system mods will run lean above 500 whp and destroy pistons. Do not stage this mod in isolation.",
    sourceCitationKey: "raptor-gen2-mod-turbo-upgrade",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Suspension Mods (9-14)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 9. Fox Live Valve bypass (RPG DID) ──────────────────────────────────
  {
    id: "raptor-gen2-mod-live-valve-bypass",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Live Valve bypass — RPG DID module for non-Live-Valve shocks",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["suspension_steering", "electrical"],
    issueAreaIds: [],
    partTags: ["control_arm"],
    symptomTags: [],
    aliases: [
      "Live Valve bypass", "RPG DID", "Damper Interface Device",
      "Live Wire delete", "Live Valve delete", "라이브 밸브 우회",
      "non-Live-Valve conversion",
    ],
    excerpt:
      "For 2019-2020 Raptors with Fox Live Valve electronics. RPG Offroad Damper Interface Device (DID) — ~$300-500, allows running ANY aftermarket shock (King, Icon, standard Fox 3.0, etc.) while maintaining full dashboard/cluster functionality. 5-minute install. No permanent vehicle modifications. SVC Offroad / RPG Live Wire Delete Module — ~$200-400, required if switching to DSC (Dual Speed Compression) non-Live-Valve shocks, prevents fault codes. Alternative: upgraded Live Valve shocks — Fox Factory Race Series 3.0 LV IBP, ~$4,000-6,000 (set), better valving with QS3 3-position adjuster for On-Road Performance / On-Road Comfort / Off-Road modes, maintains Live Valve electronics. Key point: the 2019-2020 Live Valve system is NOT a limitation — with the DID module you can run any shock and keep the truck's electronics happy.",
    inspectionHint:
      "After DID install, cycle through all terrain modes and verify no fault codes. Check that the Live Valve indicator in the cluster behaves normally (it should mimic the prior behavior even with non-LV shocks installed).",
    sourceCitationKey: "raptor-gen2-mod-live-valve-bypass",
  },

  // ── 10. Icon Stage 2/4 suspension ──────────────────────────────────────
  {
    id: "raptor-gen2-mod-icon-suspension",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Icon Vehicle Dynamics — Stage 1-4 suspension kits (best on-road ride)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: ["front_suspension_joint_play"],
    partTags: ["control_arm", "ball_joint"],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "Icon suspension", "Icon Stage 2", "Icon Stage 4", "Icon Delta Joint UCA",
      "Icon 3.0 coilovers", "Icon IBP", "아이콘 서스펜션",
    ],
    excerpt:
      "Icon is known for the best on-road ride quality of any aftermarket Raptor suspension; multi-rate spring tech and IBP valving give a plush highway ride while keeping off-road capability. Stage 1: 3.0 Series coilovers (front) + 3.0 Series RR shocks (rear), 1-3\" adjustable front lift, ~$3,500-4,500, bolt-on. Stage 2: Stage 1 + Icon Delta Joint billet UCAs, corrected geometry for lifted height, uniball UCAs allow more travel and caster/camber adjustment, ~$5,000-6,000. Stage 3: 3.0 Series IBP coilovers + IBP rear shocks + UCAs, internal bypass with multiple damping zones, ~$6,500-8,500, serious off-road use. Stage 4: 3.0 IBP coilovers + IBP rear shocks + UCAs + Deaver rear leaf pack, ~$8,000-10,000, the full Icon treatment. Install: 6-10 hours DIY with proper tools, alignment required after. Delta Joint = semi-serviceable uniball, much longer life than OEM ball joint, retains street manners.",
    inspectionHint:
      "After install, professional alignment is required — Icon ships with starting specs but the truck will pull until aligned. Grease Delta Joint UCAs at every oil change.",
    sourceCitationKey: "raptor-gen2-mod-icon-suspension",
  },

  // ── 11. King 3.0 IBP coilover swap ─────────────────────────────────────
  {
    id: "raptor-gen2-mod-king-coilovers",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "King 3.0 IBP coilover conversion — race-level damping",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: [],
    partTags: ["control_arm"],
    symptomTags: [],
    aliases: [
      "King shocks", "King 3.0 coilovers", "King bypass", "King IBP",
      "King 2.5 coilovers", "race shocks", "Garden Grove shocks", "킹 쇼크",
    ],
    excerpt:
      "The premium choice for Raptor owners who want race-level suspension. King shocks are hand-built in Garden Grove, CA, and offer custom valving for specific weight and driving style. King is the standard for SCORE/BITD desert racing. King 3.0 Coilovers (front) ~$2,500-3,500 per pair. King 3.0 Bypass Piggyback (rear) ~$2,000-3,000 per pair. Total for King swap (shocks only, no UCAs or leaf packs) ~$5,000-7,000. With remote reservoirs and custom valving ~$7,000-10,000+. For 2019-2020 Live Valve trucks, requires RPG DID module to avoid fault codes (see Live Valve bypass entry). Comparison vs Fox stock: King provides multi-rate compression (high-speed vs low-speed independently tunable), better heat dissipation under sustained off-road abuse, and rebuildability with custom shim stacks. Install: 4-6 hours, alignment required, weight-spec valving consultation recommended.",
    inspectionHint:
      "Communicate full vehicle weight (including armor, bumpers, RTT, etc.) to King when ordering for proper valving. After install, run a heat-cycle test — body should warm but not get scorching hot after a 30-minute desert run.",
    sourceCitationKey: "raptor-gen2-mod-king-coilovers",
  },

  // ── 12. Camburg long travel kit ────────────────────────────────────────
  {
    id: "raptor-gen2-mod-camburg-long-travel",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Camburg long travel kit — +15% wheel travel, +3\" track, 37s no rub",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: ["front_suspension_joint_play", "steering_linkage_wear"],
    partTags: ["control_arm", "ball_joint", "tie_rod_end", "cv_axle_boot"],
    symptomTags: [],
    aliases: [
      "Camburg long travel", "Camburg LT", "CAM-110176", "long travel kit",
      "Camburg performance kit", "prerunner kit", "캠버그 롱트래블",
    ],
    excerpt:
      "Camburg Performance Long Travel Kit (CAM-110176) — benchmark for turning a Raptor into a true prerunner. Includes boxed lower control arms with 1\" uniball pivots at frame, billet upper control arms with 7/8\" heims at frame and 1.50\" uniball at spindle/knuckle, and 17-4 stainless heim steering conversion outer tie rod (corrects bump steer). Uses OEM inner tie rod for rack longevity. Key specs: +15% wheel travel over stock, +3\" total track width (1.5\" per side), front wheel pushed forward 1\" for firewall clearance, designed for 37\" tires without rubbing, compatible with OEM coilovers OR 3.0 aftermarket coilovers. Price: ~$4,500-6,000 (arms and hardware only, shocks separate). Add-ons: bypass shock weld-on mounts ~$300-500, with King 3.0 bypass shocks add ~$5,000-7,000. Complete Camburg long travel + King bypass build ~$10,000-15,000+. Trophy Truck (TT) version: ~$8,000-15,000 for full race geometry.",
    inspectionHint:
      "Long-travel kits stress CV joints at maximum droop — inspect CV boots every 5,000 miles and after every off-road session. Re-torque heim/uniball fasteners after 100 miles.",
    safetyNote:
      "Camburg long travel changes the truck's track width and stance. Verify legality in your jurisdiction (Korea has strict width limits — a +3\" track Raptor may not pass inspection).",
    sourceCitationKey: "raptor-gen2-mod-camburg-long-travel",
  },

  // ── 13. Deaver custom leaf pack ────────────────────────────────────────
  {
    id: "raptor-gen2-mod-deaver-leaf-pack",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Deaver leaf spring pack — custom rate for build weight",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["vibration"],
    aliases: [
      "Deaver leaf", "Deaver pack", "rear leaf spring upgrade",
      "progressive leaf pack", "custom leaf pack", "디버 리프스프링",
    ],
    excerpt:
      "Factory: stock rear leaf pack is progressive rate and works well, but sags 1-2 inches under heavy load over time and bottoms easily with armor or RTT installed. Deaver custom packs allow dialing in spring rate for specific use case. Deaver Stage 1 (stock replacement, improved rate) ~$800-1,000. Deaver Stage 2 (heavier loads, moderate lift) ~$1,000-1,200. Deaver Custom (built to your weight spec) ~$1,200-1,500. RPG Offroad and SVC Offroad both sell Deaver packs configured specifically for Raptors with custom rates for bed rack/RTT weight, armor weight, or race use. Widely considered the gold-standard rear suspension upgrade for Gen 2 Raptors. Install: 2-3 hours DIY with U-bolt torque ~100 lb-ft, requires loading suspension before final torque. Pairs well with rear bump stop relocation kit (SVC ~$150-250, RPG ~$200-300) for additional travel before bottoming out.",
    inspectionHint:
      "After install, measure rear ride height left-to-right — should be within 1/4\" symmetry. Re-torque U-bolts after 100 miles. Inspect bushings annually for cracking.",
    sourceCitationKey: "raptor-gen2-mod-deaver-leaf-pack",
  },

  // ── 14. Aftermarket UCAs (Camburg/Dirt King/RPG) ───────────────────────
  {
    id: "raptor-gen2-mod-aftermarket-ucas",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Aftermarket UCAs — Camburg KINETIK, Dirt King, RPG (replaces failing OEM)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: ["front_suspension_joint_play"],
    partTags: ["control_arm", "ball_joint"],
    symptomTags: ["clunk", "rattle"],
    aliases: [
      "aftermarket UCA", "upper control arm upgrade", "Camburg UCA",
      "Dirt King UCA", "RPG UCA", "Icon Delta Joint",
      "uniball UCA", "heim UCA", "어퍼암 업그레이드",
    ],
    excerpt:
      "Factory: non-greasable, non-serviceable UCA ball joint that wears as early as 20,000-30,000 miles off-road. Aftermarket UCAs eliminate this failure point and add caster/camber adjustability. Camburg KINETIK Series billet uniball UCA — 1.25\" performance uniball, compatible with 2019+ Live Valve, ~$1,200-1,800 (pair), premium choice. Icon Delta Joint billet UCA — Delta Joint semi-serviceable uniball, great ride quality, ~$800-1,200, best for daily-driven trucks. RPG Offroad Billet UCA — 7/8\" FK rod ends + 1\" spherical bearings, caster/camber adjustable, made in USA from 6061 billet, ~$800-1,200. Dirt King Heim UCA (DK-925903) — 1\" stainless uniballs + 3/4\" FK heims, ~$700-1,000, budget premium option. Install: 1-2 hours per side, alignment required after. Note: uniball UCAs require periodic re-greasing or replacement of the spherical bearing (every 20-30K miles depending on use); they're not 'lifetime' parts despite the upgrade.",
    inspectionHint:
      "After install, check uniball preload — should rotate smoothly with finger pressure but no audible play. Re-grease at every oil change. Inspect dust boots monthly for tears.",
    sourceCitationKey: "raptor-gen2-mod-aftermarket-ucas",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Wheels, Tires, and Re-gear (15-16)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 15. 37" tire conversion ─────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-37-inch-tires",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "37\" tire conversion — Method/SCS wheels, Nitto Ridge Grappler, minor trim",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: [],
    partTags: ["wheel_well_lip"],
    symptomTags: ["vibration"],
    aliases: [
      "37 inch tires", "37x12.5R17", "Method 305 NV", "SCS wheels",
      "Nitto Ridge Grappler", "Toyo Open Country", "37s on Raptor",
      "37인치 타이어",
    ],
    excerpt:
      "Factory: 17x8.5\" forged with 315/70R17 BFG KO2 (~35\"). The natural upgrade for the Gen 2 Raptor. 37x12.5R17 (standard size) fits with MINOR trimming of inner fender pinch welds; perch adjustment on Fox coilovers to mid or high setting recommended (1.25-2.5\" lift). 37x13.5R17 requires more aggressive trimming, fender flare rub at full lock and compression, pinch weld trimming mandatory, consider Camburg LT or aftermarket UCAs for clearance. On stock 17x8.5 wheels: 37x12.5R17 fits, 37x13.5R17 too wide. Popular wheels: Method 305 NV 17x8.5 -12mm ~$250-350 (most popular Raptor wheel), Method 701 Trail / 312, SCS F5 17x8.5 -6mm ~$300-400 (overland favorite), SCS SR8 / BR6, Fuel Off-Road Beast D564 / Rebel D681 17x9 ~$200-300 (heavier). Tires: BFG KO2 (stock), Nitto Ridge Grappler 37x12.50R17 ~$350-400 (hybrid AT/MT, community favorite), Nitto Recon Grappler (quiet AT), Toyo Open Country RT 37x13.50R17 (aggressive rugged terrain). Weight: 37s add 5-15 lbs per corner of unsprung weight — noticeable hit to acceleration, braking, fuel economy.",
    inspectionHint:
      "After 37\" install, drive at full lock both directions and over a speed bump at full compression to check for any rub. Recalibrate speedometer via FORScan ($12 OBD2 adapter + free software) or via the tuner.",
    sourceCitationKey: "raptor-gen2-mod-37-inch-tires",
  },

  // ── 16. Re-gear to 4.56 ────────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-regear-456",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Re-gear to 4.56 — restores acceleration with 37\" tires",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: [],
    partTags: ["differential_cover"],
    symptomTags: [],
    aliases: [
      "re-gear", "regear", "4.56 gears", "Nitro gear axle",
      "differential gear swap", "axle ratio change", "기어비 변경",
    ],
    excerpt:
      "Factory: 4.10 final drive. Mathematically equivalent for 37s is 4.30 (restores stock RPM-to-speed ratio). Community consensus for 37s: 4.56 — provides better-than-stock acceleration, improved towing, and better low-speed crawling. Nitro Gear & Axle front + rear package for 2017-2020 Raptor ~$600-800 (gears only). Installation labor ~$1,000-1,500 (both axles, requires setup and pattern check). Total re-gear cost ~$1,600-2,300. Required on serious 37\" builds (Tier 2 'Enthusiast' and up). After re-gear, retune the PCM to update the speedometer/odometer and shift points to match new ratio — most aftermarket tunes (MPT, COBB, Livernois) include this as a free re-flash. Critical: both front Torsen and rear e-locker carriers must use matching ratios — never re-gear only one axle.",
    inspectionHint:
      "Re-gear requires gear-pattern setup by an experienced installer — improper pattern causes whine and premature failure. Check gear pattern photos after install. Break-in: 500 miles of varied driving with no towing or sustained loads, then change diff fluid (initial wear-in produces metallic debris).",
    safetyNote:
      "Front Torsen and rear e-locker must use IDENTICAL ratios — mismatched ratios cause permanent driveline binding and component failure.",
    sourceCitationKey: "raptor-gen2-mod-regear-456",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Armor and Protection (17-19)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 17. Full skid plates ────────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-skid-plates",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Full skid plates — RCI, Foutz, Battle Born (engine/trans/T-case/fuel)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["underbody", "body"],
    issueAreaIds: ["underbody_frame_corrosion"],
    partTags: ["frame_section"],
    symptomTags: [],
    aliases: [
      "skid plates", "RCI skid", "Foutz skid", "Battle Born skid",
      "C4 Fab skid", "belly armor", "skid plate kit", "스키드 플레이트",
    ],
    excerpt:
      "Factory: aluminum skid plate covers engine only; transmission and transfer case are partially exposed. RCI Metalworks full belly (engine, trans, T-case) — 3/16\" aluminum, ~$800-1,200 full set, the community standard, bolt-on. Battle Born Offroad 4-piece kit (engine, trans, T-case, fuel tank) — 3/16\" aluminum, ~$800-1,200, similar to RCI, good fitment. Foutz Motorsports full kit — 3/16\" aluminum, ~$800-1,200, well-regarded. C4 Fabrication engine + trans skids — steel, ~$600-1,000, heavier but more impact resistant. Rogue Racing custom — steel/aluminum, ~$1,000-2,000, race-grade premium. Install: 3-5 hours DIY, often requires removing factory skid plate first. Aluminum vs steel: aluminum lighter (~50 lbs vs ~100 lbs full set) but dents on direct rock impact; steel takes more abuse but adds weight and rusts. For desert use aluminum is standard; for rock crawling steel is preferred.",
    inspectionHint:
      "After every off-road trip, remove plates and inspect topside for trapped rocks/mud compressing against oil pan or transfer case. Trapped debris causes more damage than no skid plate at all. Re-torque mounting bolts annually with anti-seize.",
    sourceCitationKey: "raptor-gen2-mod-skid-plates",
  },

  // ── 18. Rock sliders ────────────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-rock-sliders",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Rock sliders — ADD, C4 Fab, N-Fab, Rogue Racing (bolt-on vs weld-on)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["body", "underbody"],
    issueAreaIds: [],
    partTags: ["frame_section"],
    symptomTags: [],
    aliases: [
      "rock sliders", "side steps", "rocker protection", "ADD sliders",
      "RKR Rails", "C4 sliders", "Rogue rock rails", "록 슬라이더",
    ],
    excerpt:
      "Factory: no rocker panel protection — bare rocker pinch welds vulnerable to off-road damage. ADD Rock Slider Side Steps — .120\" wall steel, doubles as entry steps, bolt-on, ~$1,200-1,800 (pair). C4 Fabrication Rock Sliders — bolt-on or weld-on, ~$800-1,400. N-Fab RKR Rails — budget bolt-on, integrated step pad, ~$600-1,000. Rogue Racing Raptor Rock Rails — race-grade weld-on, ~$1,200-2,000. Bolt-on vs weld-on: bolt-on easier to install/replace but flex under extreme impacts; weld-on permanent but distributes load directly to frame. For serious off-road, weld-on preferred. For daily/weekend off-road, bolt-on is more than sufficient. Install: bolt-on 2-4 hours DIY, weld-on requires professional welder and 6-10 hours. Most bolt-on sliders mount into existing factory body mount holes and add captive nuts for the slider hardware.",
    inspectionHint:
      "After install, jack the truck up by the sliders to verify mounting strength — bolt-on sliders should hold the truck's weight without flex. If sliders deform, remount with reinforcing plates.",
    sourceCitationKey: "raptor-gen2-mod-rock-sliders",
  },

  // ── 19. Front and rear bumpers (ADD/RPG/Rogue) ─────────────────────────
  {
    id: "raptor-gen2-mod-bumpers",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Bumpers — ADD Stealth/Rock Fighter, RPG, Rogue (front and rear)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: ["frame_section"],
    symptomTags: [],
    aliases: [
      "ADD bumper", "Stealth Fighter", "Rock Fighter", "RPG bumper",
      "Rogue Racing bumper", "winch bumper", "frame cut bumper",
      "범퍼 업그레이드", "ADD 범퍼",
    ],
    excerpt:
      "Front bumpers: ADD Stealth Fighter — slim profile, maintains stock look, winch-compatible, light provisions, ~$1,500-2,500. ADD Rock Fighter (frame cut) — maximum approach angle, lowest profile, requires frame cutting, ~$1,800-2,800. ADD PRO Bolt-On (F118102100103) — no cutting required, ~$1,500-2,200. Rigid/RPG Fighter — designed by RPG Offroad, clean race look, ~$1,500-2,500. Rogue Racing Raptor — premium, used in competitive off-road, ~$2,000-3,000. C4 Fabrication Hybrid — good balance of protection and weight, ~$1,500-2,200. Rear bumpers: ADD Stealth Fighter Rear — same length as factory, two cube light mounts, ~$1,200-2,000. ADD Venom Rear — more coverage, sensor-compatible, ~$1,400-2,200. Rigid/C4 Fab rear plate ~$1,000-1,800. Install: front 4-8 hours (frame-cut versions require professional). Rear 2-4 hours. All bumpers require relocating parking sensors (if equipped) and may disable factory adaptive cruise — verify ADAS compatibility before purchase.",
    safetyNote:
      "Frame-cut bumpers permanently modify the frame. Once cut, you cannot return to a factory bumper without frame repair. Verify legality in your jurisdiction.",
    sourceCitationKey: "raptor-gen2-mod-bumpers",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Lighting and Interior (20-24)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 20. Auxiliary lighting ──────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-auxiliary-lighting",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Auxiliary lighting — Rigid, Baja Designs, Diode Dynamics",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["lighting", "electrical"],
    issueAreaIds: ["lighting_socket_wiring"],
    partTags: ["headlight_housing", "connector"],
    symptomTags: [],
    aliases: [
      "LED light bar", "Rigid lights", "Baja Designs", "Diode Dynamics",
      "SS3 fog lights", "OnX6", "Squadron Pro", "ditch lights",
      "fog light upgrade", "보조등", "라이트 바", "안개등",
    ],
    excerpt:
      "Rigid Industries — most popular Raptor lighting, OEM supplier relationships. D-Series Dually 2x2\" cube ~$100-200/pair (fog or aux). E-Series/SR-Series light bars 20-50\" ~$300-1,500. Adapt light bar (GPS-enabled adaptive beam) ~$1,000-2,000. Triple Fog Light Kit with KR Off-Road brackets ~$600-900 (replaces stock fog with 3 pairs of D-Series). Baja Designs — premium, used in pro racing. Squadron Pro 3x3\" LED pod ~$200-350/pair (best fog replacement). LP6 6\" round ~$350-500 each (long-range driving). OnX6 light bar 10-50\" ~$500-2,500 (best light bar on market). Dual S1 harness ~$50-80. Triple Fog Kit with KR brackets ~$700-1,200. Diode Dynamics — best value, US-made. SS3 LED Fog Light Kit ~$250-500/pair, SAE/DOT compliant options, multiple beam patterns. SS5 LED ~$350-600/pair (more output). Stage Series ditch lights ~$300-600/pair. Wiring: sPOD/Trigger 4 Plus/6 Shooter Bluetooth controller ~$300-500 (6 circuits, no toggle switches). Do NOT tap factory headlight circuits — BCM throws codes for current draw changes.",
    inspectionHint:
      "After install, verify no fault codes on BCM/BCMii. Aim auxiliary lights at 25-50 feet of horizontal distance — Korea has strict aux-light aiming requirements and any light visible above bumper height when oncoming can fail inspection.",
    sourceCitationKey: "raptor-gen2-mod-auxiliary-lighting",
  },

  // ── 21. Bed rack / RTT setup ───────────────────────────────────────────
  {
    id: "raptor-gen2-mod-bed-rack",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Bed rack — RCI, Leitner ACS, upTOP, CBI (for RTT/MOLLE/cargo)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["bed_cargo", "body"],
    issueAreaIds: [],
    partTags: ["bed_floor", "bed_tie_down"],
    symptomTags: [],
    aliases: [
      "bed rack", "RCI bed bars", "Leitner ACS", "upTOP Overland",
      "CBI bed rack", "rooftop tent rack", "RTT rack", "베드 랙",
    ],
    excerpt:
      "RCI Metalworks 9\"/12\"/18\" Bed Bars — 1,500 lbs static capacity, ~$600-1,000, community standard, low profile options, tested capacity. Leitner Designs ACS Forged — 600+ lbs dynamic, ~$1,200-1,800, adjustable modular T-slot mounting for infinite accessory positions, compatible with DECKED. upTOP Overland TRUSS AFS — 500+ lbs, ~$1,000-1,500, all-aluminum clean design. CBI Offroad Bed Rack — 500+ lbs, ~$800-1,200, steel construction, robust. RTT weight limits: most bed racks support 300-600 lbs dynamic (while driving) and 600-1,500 lbs static (parked/camping); typical 2-person RTT weighs 120-160 lbs. Critical: the F-150 Raptor has an aluminum bed — mounting heavy bed racks requires reinforcement plates to distribute load and prevent the aluminum from deforming. Do NOT mount directly to bed rails without reinforcement. DECKED DF7 drawer system for 2017-2020 Raptor 5.5' bed ~$1,400-1,600, 200 lbs per drawer + 2,000 lbs on top, compatible with Leitner ACS. BuiltRight Industries Bedside Rack System ~$200-400/side mounts to bed stake pocket holes, no drilling.",
    inspectionHint:
      "Inspect bed-rack mounting points monthly for aluminum deformation or cracking around stake pockets. Verify reinforcement plates remain seated. Re-torque rack hardware every 1,000 miles for first 5,000 then annually.",
    sourceCitationKey: "raptor-gen2-mod-bed-rack",
  },

  // ── 22. Interior — Katzkin / Wet Okole seat covers ─────────────────────
  {
    id: "raptor-gen2-mod-seat-covers",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Seat covers / re-upholstery — Katzkin, Wet Okole, Coverking",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["cabin_controls", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Katzkin", "seat covers", "Wet Okole", "Coverking", "WeatherTech seats",
      "leather upholstery", "neoprene seat covers", "시트 커버",
    ],
    excerpt:
      "Factory: cloth or optional Raptor-specific leather (depending on package). Katzkin custom leather re-upholstery — ~$1,500-2,500 installed, full leather re-upholstery (NOT a 'cover' — replaces fabric), many color/stitch options, must be installed by Katzkin dealer. Wet Okole neoprene seat covers — ~$400-600 (front + rear), waterproof, ideal for muddy/wet adventures, Hawaiian-made. Coverking neoprene or spacer mesh — ~$200-400 (front + rear), good fitment, multiple material options, budget-friendly. WeatherTech seat protectors — ~$150-300 (front pair), USA-made, sturdy material, good for daily protection. For owners with airbag-equipped seats (all Gen 2 Raptors): use only seat covers certified for side-impact airbag deployment — non-certified covers can prevent airbag deployment. Recaro front seats (factory option) require Recaro-specific covers — universal covers do not fit.",
    safetyNote:
      "Side-impact airbags fire through the outer seat bolster. Non-airbag-certified seat covers can prevent deployment in a crash. Verify any cover is rated for your seat type.",
    sourceCitationKey: "raptor-gen2-mod-seat-covers",
  },

  // ── 23. Floor liners ────────────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-floor-liners",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Floor liners — Husky X-Act Contour beats WeatherTech for less",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["cabin_controls", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "floor liners", "WeatherTech", "Husky Liners", "X-Act Contour",
      "WeatherBeater", "floor mats", "all-weather mats", "플로어 매트",
    ],
    excerpt:
      "Factory: thin carpet floor mats that absorb water and degrade quickly with off-road use. WeatherTech FloorLiners (47697-1-2) — ~$200-250 (front + rear), laser-measured, deep channels, raised outer lip, the name brand. Husky Liners X-Act Contour or WeatherBeater — ~$150-180 (front + rear), ~30% less expensive than WeatherTech. Forum consensus: Husky has better fitment, softer feel, longer lifespan. Recommendation: Husky X-Act Contour — better product for less money. Both fit the 2017-2020 SuperCab and SuperCrew (verify cab style when ordering). Install: 30 seconds — drop in. Cleaning: hose off with water, dry before reinstalling to prevent under-mat moisture damage to factory carpet.",
    sourceCitationKey: "raptor-gen2-mod-floor-liners",
  },

  // ── 24. Dash cam hardwire ──────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-dash-cam",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Dash cam hardwire — Viofo A129 Pro Duo, behind rearview mirror",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["electrical", "cabin_controls"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "dash cam", "Viofo A129 Pro Duo", "Viofo A139 Pro", "hardwire kit",
      "fuse tap", "parking mode camera", "블랙박스", "대시캠",
    ],
    excerpt:
      "Best location: behind the rearview mirror, hidden by headliner. Camera: Viofo A129 Pro Duo or A139 Pro (front + rear) ~$200-350. Hardwire kit: Viofo HK3 or generic mini-USB hardwire kit ~$15-25. Fuse tap: add-a-fuse in the interior fuse box (passenger footwell). Tap an accessory fuse (powers off with ignition) for driving mode, OR an always-on fuse for parking mode. Most owners run hybrid — driving mode via accessory fuse + parking mode via always-on fuse with low-voltage cutoff to protect battery. Installation: route cable along headliner edge, down A-pillar (behind trim), to fuse box. 30-60 minute DIY job. For SuperCrew rear cam: route along headliner to rear-window or third-brake-light area. Note: the Raptor's full-color HUD on some trims may interfere with mirror-mount cameras; verify clearance before final install.",
    inspectionHint:
      "After install, verify parking-mode low-voltage cutoff is active (default 11.8V on Viofo) — without it, the dash cam will drain the battery during long parking sessions and the Raptor's start-stop system makes battery draw critical.",
    sourceCitationKey: "raptor-gen2-mod-dash-cam",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Shock Maintenance & Build Tiers (25-26)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 25. Shock rebuild services ──────────────────────────────────────────
  {
    id: "raptor-gen2-mod-shock-rebuild-services",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Shock rebuild services — Forged Offroad, Shock Surplus, mail-in",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: [],
    partTags: ["control_arm"],
    symptomTags: [],
    aliases: [
      "shock rebuild", "Forged Offroad rebuild", "Shock Surplus",
      "Shock Therapy", "Fox shock service", "King shock rebuild",
      "mail-in shock service", "쇼바 정비", "쇼크 리빌드",
    ],
    excerpt:
      "All performance shocks (Fox, King, Icon, Camburg) require periodic rebuilding — they are serviceable, not disposable. Intervals: on-road only every 50,000 miles, mixed on/off-road every 10,000 miles, strictly off-road every 1,000 miles. Service providers and costs: Forged Offroad ~$689 (all 4) or exchange program ~$855 shipped, popular mail-in service. Shock Surplus ~$900-1,100 (all 4, Fox/King), same-day service available. Local Fox-authorized specialists (Camburg, ADD, SVC Offroad) ~$400-500 per pair (~$800-1,000 all 4), varies by region. Shock Therapy — UTV/truck specialist, excellent reputation. Additional cost: shop labor for shock removal/reinstall ~$600-750 if you cannot do it yourself. Service includes draining old fluid, inspecting internal bypass ports for wear, replacing seals, refilling with correct weight shock oil, recharging nitrogen. For Korea-based owners: there are no authorized Fox rebuilders in Korea — shocks must be shipped internationally to the US, Australia, or UAE for service. Plan 4-6 weeks turnaround time.",
    safetyNote:
      "Neglecting shock service is dangerous, not just expensive. Blown shocks lead to frame contact during off-road impacts and dramatically reduce on-road braking and handling.",
    sourceCitationKey: "raptor-gen2-mod-shock-rebuild-services",
  },

  // ── 26. Build budget tiers ─────────────────────────────────────────────
  {
    id: "raptor-gen2-mod-build-budget-tiers",
    sourceType: "repair_note",
    sourceLabel: "Modification — Gen 2 Raptor",
    title: "Build budget tiers — Practical Daily ($2-5K) to Race Truck ($50K+)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical", "suspension_steering", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Raptor build", "build tiers", "Raptor mod budget", "prerunner build",
      "Tier 1 mods", "Tier 2 mods", "race truck build", "랩터 빌드",
    ],
    excerpt:
      "Tier 1 — 'Practical Daily' ~$2,000-5,000: MPT tune + SCT X4 (~$800, +80-100 whp), JLT catch can (~$120), Corsa Sport or MBRP exhaust (~$500-900), Husky floor liners (~$160), Diode Dynamics SS3 fog lights (~$300-500). Total ~$1,880-2,480. Optional: CVF intercooler ($600-700) to support the tune. Tier 2 — 'Enthusiast' ~$5,000-15,000: Tier 1 + Mishimoto or Full-Race intercooler ($1,000-1,500), Icon Stage 2 suspension ($5,000-6,000), 37x12.5R17 Nitto Ridge Grapplers (5) ($1,750-2,000), Method 305 NV wheels (5) ($1,250-1,750), RCI skid plates ($800-1,200), ADD Rock Slider side steps ($1,200-1,800). Total ~$13,500-16,750. Tier 3 — 'Prerunner' ~$15,000-30,000: Garrett PowerMax Stage 2 turbos ($3,000) + Full-Race V2 intercooler ($1,500) + Full-Race downpipes ($900) + custom tune + flex fuel ($800) + Camburg LT kit ($5,000) + King 3.0 coilovers + rear bypass ($7,000-9,000) + Deaver custom leaf pack ($1,200) + 37s on Method ($3,000) + RCI full skid ($1,000) + ADD Rock Fighter bumper ($2,000) + ADD sliders ($1,500) + lighting ($1,000-2,000) + chase rack ($2,000) + 4.56 re-gear ($2,000). Total ~$31,900-34,900. Tier 4 — 'Race Truck' ~$30K+: Camburg TT long travel ($8K-15K), King 3.5\"/4.0\" bypass shocks ($10K-15K), Full-Race Formline turbo kit ($5K-8K), upgraded fuel system, custom cage, race armor — easily $50K-86K+ in parts, $100K+ with labor.",
    sourceCitationKey: "raptor-gen2-mod-build-budget-tiers",
  },
];
