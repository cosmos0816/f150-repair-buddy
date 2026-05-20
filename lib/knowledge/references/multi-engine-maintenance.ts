import { F150_GENERAL_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

/**
 * Cross-engine maintenance reference covering the entire 12th-gen F-150
 * (2009-2014) engine lineup: 4.6L 2V, 5.4L 3V Triton, 3.5L EcoBoost, 5.0L
 * Coyote, 6.2L Boss, and 3.7L V6. Engine-specific intervals already live in
 * their own files (see `ecoboost-maintenance-schedule.ts`); these entries
 * focus on cross-engine comparison, shared fluids/filters, Korean parts
 * availability, and Korean seasonal climate adjustments. KORUS FTA, 배대지
 * shipping mechanics, and dealer pricing live in `korea-parts-shipping.ts`
 * and are not duplicated here.
 *
 * Source: research/master-maintenance-guide.md (12th-Gen F-150 Master PM Guide)
 */
export const MULTI_ENGINE_MAINTENANCE_REFERENCES: TruckReferenceRecord[] = [
  // ── 1. Cross-engine oil change comparison ──────────────────────────
  {
    id: "multi-engine-oil-change-comparison",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Oil change comparison — all six 12th-gen F-150 engines",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: ["front_accessory_drive"],
    symptomTags: [],
    aliases: [
      "oil change interval",
      "engine oil capacity",
      "5W-20 vs 5W-30",
      "Triton oil",
      "EcoBoost oil",
      "Coyote oil",
      "Boss 6.2 oil",
      "3.7 V6 oil",
      "엔진오일 교환",
      "엔진오일",
    ],
    excerpt:
      "Per-engine oil specs (Ford interval / community interval): 4.6L 2V — 5W-20 full synthetic, 6.0 qt, filter FL-820-S, 7,500 mi factory / 5,000 mi community. 5.4L 3V Triton — 5W-20 full synthetic, 7.0 qt, FL-820-S, 7,500 mi factory / 5,000 mi community; VCT system punishes neglected oil. 3.5L EcoBoost — 5W-30 full synthetic, 6.0 qt, FL-500S, 10,000 mi factory / 5,000-7,000 mi community; turbo oil coking risk makes shorter intervals essential. 5.0L Coyote — 5W-20 full synthetic, 7.7 qt, FL-820-S, 10,000 mi / 5,000-7,000 mi; large capacity helps but Ti-VCT needs clean oil. 6.2L Boss — 5W-20 full synthetic, 7.7 qt, FL-820-S, 10,000 mi / 5,000-7,000 mi; monitor consumption between changes. 3.7L V6 — 5W-20 full synthetic, 6.0 qt, FL-910-S, 10,000 mi / 7,500 mi; most forgiving of the six. The 3.5L EcoBoost is the only engine that uses 5W-30 (not 5W-20) and the only one using the FL-500S filter. The 3.7L V6 is the only one on the FL-910-S.",
    inspectionHint:
      "Match filter and viscosity to the engine, not the model year — a 2011 F-150 could have any of three engines.",
    sourceCitationKey: "multi-engine-oil-change-comparison",
  },

  // ── 2. Oil brand recommendations + Korea availability ─────────────
  {
    id: "multi-engine-oil-brands-korea-availability",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Oil brand picks — Mobil 1 at Costco Korea, Motorcraft via iHerb/import",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Mobil 1",
      "Pennzoil Platinum",
      "Royal Purple",
      "Motorcraft synthetic blend",
      "Kirkland Signature oil",
      "Valvoline Advanced",
      "Costco Korea oil",
      "Coupang oil",
      "iHerb Motorcraft",
      "코스트코 코리아",
      "쿠팡",
      "모빌 1",
      "엔진오일 브랜드",
    ],
    excerpt:
      "Top picks across all 12th-gen engines: Motorcraft Synthetic Blend (OEM), Mobil 1, Pennzoil Platinum, Royal Purple. Budget-friendly: Kirkland Signature Full Synthetic (Costco), Valvoline Advanced Full Synthetic. Avoid conventional oil on any of these engines — all benefit from full synthetic. Korea availability per the guide: Mobil 1 is widely available at Costco Korea and online via Coupang (쿠팡) in both 5W-20 and 5W-30 viscosities, covering every 12th-gen F-150 engine. Motorcraft branded oil is harder to find domestically and can be sourced through iHerb or direct import via 배대지. Kirkland Signature Full Synthetic is available at Costco Korea warehouses. For the 3.5L EcoBoost specifically you need 5W-30 — verify viscosity on the bottle because Costco Korea also stocks 5W-20 and 0W-20 next to it.",
    inspectionHint:
      "Costco Korea Mobil 1 case price typically beats individual Coupang listings; check both before bulk-ordering filters.",
    sourceCitationKey: "multi-engine-oil-brands-korea-availability",
  },

  // ── 3. Shared fluids — coolant, ATF, diff fluids ──────────────────
  {
    id: "multi-engine-shared-fluids",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Shared fluid specs — coolant, 6R80 ATF, diff, transfer case",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cooling", "drivetrain_4wd", "brakes"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["coolant_reservoir", "transfer_case_area", "differential_cover"],
    symptomTags: [],
    aliases: [
      "Mercon LV",
      "Motorcraft Orange coolant",
      "VC-3DIL-B",
      "75W-140 diff",
      "XL-12",
      "XL-3 friction modifier",
      "DOT 4 brake fluid",
      "PM-20",
      "6R80 fluid",
      "shared fluids",
    ],
    excerpt:
      "All six 12th-gen F-150 engines share the same chassis fluids: Brake fluid — DOT 4 (Motorcraft PM-20), every 2 years / 30,000 mi; hygroscopic regardless of mileage. Coolant — Motorcraft Orange (VC-3DIL-B), first change 100,000 mi / 6 yr, then 50,000 mi / 3 yr; do NOT mix with green. Automatic transmission (6R80) — Mercon LV (XT-10-QLVC), first service 60,000 mi, then 30,000-40,000 mi; drop-and-fill gets ~5 qt, full flush ~12 qt, drop-and-fill is safer. Transfer case (4WD) — Mercon LV, every 60,000 mi, 1.0 pt capacity. Front and rear differential — 75W-140 Synthetic (XL-12), every 60,000 mi; add 4 oz of XL-3 friction modifier for limited-slip rear diffs. Power steering — Mercon LV or Motorcraft PS fluid; inspect at 60K, flush if dark/burnt. Windshield washer — Motorcraft ZC-32 summer; winter-rated -30C or below for Korea.",
    inspectionHint:
      "Mercon LV appears in three places (ATF, transfer case, power steering) — buy a 5-quart jug instead of three quarts.",
    sourceCitationKey: "multi-engine-shared-fluids",
  },

  // ── 4. Spark plugs comparison ──────────────────────────────────────
  {
    id: "multi-engine-spark-plugs-comparison",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Spark plugs by engine — SP-493/515/534/542/910, 5.4L breakage warning",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["ignition", "engine_mechanical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug", "coil"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "spark plug part number",
      "SP-493",
      "SP-515",
      "SP-534",
      "SP-542",
      "Lisle 65600",
      "broken spark plug 5.4",
      "two-piece plug",
      "점화플러그",
      "스파크 플러그",
    ],
    excerpt:
      "Per-engine spark plug specs (part / interval / gap / notes): 4.6L 2V — Motorcraft SP-493, 100,000 mi, 0.054 in, straightforward. 5.4L 3V Triton — SP-515, 100,000 mi, 0.054 in; NOTORIOUS for breaking during removal. Soak with penetrating oil 24 hours before, warm engine to operating temp then let cool 30 minutes, and keep a Lisle 65600 broken-plug tool on hand. Many owners pull plugs at 60-75K to reduce breakage risk. 3.5L EcoBoost — SP-534, 60,000 mi (shorter due to turbo combustion pressures), 0.030 in; rear bank is tight but doable. 5.0L Coyote — SP-542, 100,000 mi, 0.049 in; 8 plugs, no special concerns. 6.2L Boss — SP-542, 100,000 mi, 0.049 in; same plug as Coyote. 3.7L V6 — SP-534, 100,000 mi, 0.051 in; rear bank slightly tight, use a swivel socket. The Master Guide flags broken-plug extraction on the 5.4L as the single highest risk routine service in this generation, with $500-1,500 shop cost if a plug breaks.",
    inspectionHint:
      "5.4L 3V owners: budget time and penetrating oil before touching plugs. Never attempt on a cold or fully hot engine.",
    safetyNote:
      "Do NOT remove 5.4L 3V plugs on a cold engine — the carbon ring around the electrode is most likely to seize the plug when cold.",
    sourceCitationKey: "multi-engine-spark-plugs-comparison",
  },

  // ── 5. Annual cost budget by engine ───────────────────────────────
  {
    id: "multi-engine-annual-cost-budget",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Annual maintenance cost by engine (USD baseline)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "annual cost",
      "maintenance budget",
      "running cost",
      "yearly cost",
      "유지비",
      "연간 정비비",
    ],
    excerpt:
      "Annual maintenance cost estimate (USD, US prices, 2-3 oil changes/yr plus amortized filters, brakes, rotation, fluids, engine-specific items): 4.6L 2V — $400-640/yr. 5.4L 3V — $470-770/yr (extra throttle-body cleaning, PCV, exhaust stud watch). 3.5L EcoBoost — $510-805/yr (highest due to catch can service, intercooler boot checks, plug interval). 5.0L Coyote — $430-685/yr. 6.2L Boss — $430-710/yr. 3.7L V6 — $400-640/yr (most forgiving). Engine-specific items add the most variance: $0-50 on 4.6/5.0/3.7, $50-150 on 5.4 (VCT/PCV/throttle body), $100-200 on 3.5 EcoBoost (catch can, charge pipe inspection, walnut prep). These are US numbers — Korean owners should add 10-25% for imported parts and shipping when not buying locally available oils and filters.",
    inspectionHint:
      "If your annual maintenance is much under these numbers, you are probably deferring work that will hit later as a big repair.",
    sourceCitationKey: "multi-engine-annual-cost-budget",
  },

  // ── 6. Major repair reserve by engine ─────────────────────────────
  {
    id: "multi-engine-major-repair-reserve",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Major repair reserve by engine and mileage band (USD)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical", "timing_valvetrain", "turbo_boost"],
    issueAreaIds: [
      "cam_phaser_tick_context",
      "turbo_bearing_failure",
      "timing_chain_stretch_ecoboost",
    ],
    partTags: ["cam_phaser_area", "turbocharger", "timing_cover"],
    symptomTags: [],
    aliases: [
      "repair reserve",
      "big repair budget",
      "cam phaser cost",
      "turbo replacement cost",
      "valve guide repair",
      "timing chain cost",
    ],
    excerpt:
      "Suggested major-repair reserve fund by engine and mileage band (USD): 4.6L 2V — 60-100K $500, 100-150K $1,000, 150-200K $1,500, 200K+ $2,000. 5.4L 3V — 60-100K $1,000, 100-150K $3,000-5,000, 150-200K $4,000-6,000, 200K+ $5,000-8,000 (worst of the lineup, driven by cam phaser job at 100-180K and broken-plug risk). 3.5L EcoBoost — 60-100K $1,000, 100-150K $2,000-4,000, 150-200K $3,000-5,000, 200K+ $5,000-8,000 (driven by turbo replacement at 150K+ and walnut blast every 60-80K). 5.0L Coyote — $500 / $1,000-1,500 / $2,000-3,000 / $3,000-5,000. 6.2L Boss — $500 / $1,000-2,000 / $2,000-3,500 / $3,000-5,000 (valve guide/seal at 150K+). 3.7L V6 — $500 / $1,000-1,500 / $2,000-3,000 / $3,000-4,000 (internal water pump is the headline expense at ~120K). Single-event costs to plan for: 5.4 cam phaser + timing job $2,500-4,500; broken plug extraction $500-1,500; EcoBoost turbo replacement $1,500-3,000 per turbo; EcoBoost walnut blast $400-600; 6.2 valve guide/seal $1,500-3,000; 3.7 internal water pump $1,200-2,000; transmission rebuild $2,500-4,500 on any engine.",
    inspectionHint:
      "Treat these as savings targets, not predictions. The 5.4 and 3.5 are the two engines where you really want money already set aside.",
    sourceCitationKey: "multi-engine-major-repair-reserve",
  },

  // ── 7. 5.4L 3V engine-specific monitoring ─────────────────────────
  {
    id: "multi-engine-5-4l-3v-specific-watchlist",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "5.4L 3V Triton specific watchlist — phasers, VCT solenoids, exhaust studs",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["timing_valvetrain", "engine_mechanical", "exhaust_emissions"],
    issueAreaIds: ["cam_phaser_tick_context", "exhaust_manifold_tick"],
    partTags: [
      "cam_phaser_area",
      "vct_solenoid",
      "exhaust_manifold",
      "throttle_body",
      "pcv_valve",
    ],
    symptomTags: ["ticking", "rattle", "exhaust_tick"],
    aliases: [
      "5.4 cam phaser",
      "typewriter tick",
      "VCT solenoid replacement",
      "broken exhaust stud",
      "Triton tick",
      "캠 페이저",
    ],
    excerpt:
      "The 5.4L 3V Triton is the most maintenance-intensive engine of the lineup. Key proactive items beyond the shared schedule: Cam phaser inspection at 100,000+ mi — listen for 'typewriter tick' at idle. Worn phasers cause timing rattle; replacement is $2,000-4,000 at a shop. VCT solenoid replacement at 100,000 mi — replace both solenoids proactively (~$40 each). Screens clog with debris and starve phasers of oil. Exhaust manifold stud check every 50,000 mi — inspect for broken studs and exhaust tick (especially passenger side). Studs corrode and snap; repair before they damage the head. Spark plug removal prep before 100,000 mi (see plug entry; consider doing plugs at 60-75K to reduce breakage risk). Oil change discipline every 5,000 mi MAX — this engine punishes neglected oil harder than any other; sludge kills cam phasers. PCV valve every 50,000 mi (integrated into valve cover on some years). Throttle body cleaning every 30,000 mi with TB cleaner and a ForScan idle relearn.",
    inspectionHint:
      "Cold-start tick that fades after 30 seconds = early phaser warning. Cold-start tick that persists = phasers already worn.",
    sourceCitationKey: "multi-engine-5-4l-3v-specific-watchlist",
  },

  // ── 8. Cabin air filter + Korean fine-dust season ─────────────────
  {
    id: "multi-engine-cabin-air-filter-korea-dust",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Cabin air filter — critical for Korea's 미세먼지 (fine dust) season",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "cabin air filter",
      "DG9Z-19N619-A",
      "Mann FP 25 007",
      "HEPA cabin filter",
      "미세먼지",
      "황사",
      "fine dust filter",
      "yellow dust",
      "캐빈 필터",
    ],
    excerpt:
      "Cabin air filter interval is 15,000-20,000 mi / 24,000-32,000 km across all 12th-gen F-150 engines, part number DG9Z-19N619-A. Located behind the glove box; 5-minute DIY job. The Master Guide flags this as critical for Korea's fine dust (미세먼지) season — the standard interval should be shortened in Korea during yellow dust (황사) months in spring and fine-dust spikes in winter. The Mann FP 25 007 is called out by the guide as a HEPA-grade aftermarket upgrade worth considering for Korean owners. During 장마 (monsoon, late June-July) the cabin filter is also the first defense against mold growth in the HVAC system — replace at the start of monsoon season, run AC on recirculate then switch to fresh air for the last 5 minutes of every drive to dry the evaporator.",
    inspectionHint:
      "Check the filter after every yellow-dust event. A filter that looks gray after a single dust storm needs to be replaced, not vacuumed.",
    sourceCitationKey: "multi-engine-cabin-air-filter-korea-dust",
  },

  // ── 9. Korean winter — road salt and undercarriage ────────────────
  {
    id: "multi-engine-korea-winter-salt-corrosion",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Korean winter road salt (염화칼슘) — the #1 longevity threat",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["underbody", "brakes"],
    issueAreaIds: ["underbody_frame_corrosion", "brake_hose_or_line_concern"],
    partTags: ["frame_section", "brake_line", "wheel_well_lip"],
    symptomTags: ["rust", "corrosion"],
    aliases: [
      "road salt",
      "염화칼슘",
      "calcium chloride",
      "undercarriage rust",
      "frame rust Korea",
      "winter wash",
      "셀프세차장",
      "undercoating",
      "Krown",
      "fluid film",
    ],
    excerpt:
      "Korean roads are heavily salted in winter with 염화칼슘 (calcium chloride). The Master Guide names road salt as 'the single biggest threat to your truck's longevity' in Korea. Winter routine: full wash including undercarriage at a heated indoor car wash at least monthly, more often after a salting event; apply wax for protection. Keep the fuel tank above half full to limit tank condensation. Engage 4H monthly on a loose surface to exercise transfer case seals. Spring follow-up (March-May): undercarriage power wash at a self-service car wash (셀프세차장) with attention to frame rails, crossmembers, and brake lines. Flush wheel wells, suspension components, and any area where salt collects. Inspect brake lines for rust spots, bubbling, or flaking — replace any corroded lines immediately. Touch up undercoating on any spots where coating has chipped or worn. Monsoon-season add-on: apply fluid film or Krown-style rust inhibitor to frame, suspension, and underbody before extended moisture exposure. Annual undercoat plus weekly winter undercarriage wash is the explicit recommendation.",
    inspectionHint:
      "Salt corrosion in Korea looks like a brown crust on frame seams and bubbling paint on brake-line fittings. Brake lines are the first to fail.",
    safetyNote:
      "Corroded brake lines can rupture during a hard stop. Any visible bubbling on a steel brake line means stop driving and replace.",
    sourceCitationKey: "multi-engine-korea-winter-salt-corrosion",
  },

  // ── 10. Korean climate adjustments — humidity & cold ──────────────
  {
    id: "multi-engine-korea-climate-adjustments",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Korean climate adjustments — humidity, monsoon, -25C winter",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cooling", "turbo_boost", "battery_ground"],
    issueAreaIds: ["intercooler_condensation"],
    partTags: ["intercooler", "charge_pipe", "battery"],
    symptomTags: ["stumble"],
    aliases: [
      "Korean climate",
      "monsoon prep",
      "장마",
      "한국 계절별 정비",
      "humidity intercooler",
      "winter battery",
      "antifreeze concentration",
      "cold cranking amps",
    ],
    excerpt:
      "Seasonal adjustments specific to Korea per the Master Guide: Spring (봄, March-May) — undercarriage power wash, salt residue removal, AC system check before summer heat, wiper blade replacement before heavy spring rains. Summer (여름, June-August) — coolant level and 50/50 concentration check (refractometer; -37C protection target), intercooler condensation prep on 3.5L EcoBoost (Korea's extreme humidity makes this critical; some owners drill a small drain in the intercooler boot), AC condenser gentle rinse from the engine side (never high pressure from the front; bends fins), morning tire-pressure checks (summer heat adds 3-5 PSI). Monsoon (장마, late June-July) — rust prevention treatment, drain hole clearing in doors/rockers/sunroof/tailgate, weatherstrip inspection (paper test), brake dry-out after standing water. Fall (가을, September-November) — pre-winter battery load test (cold cranking amps drop in winter), antifreeze concentration to at least -40C (northern Korea sees -15C to -25C, target 50/50 minimum), switch to winter-rated washer fluid (-30C or below), studless winter tires with minimum 4mm tread. Winter (겨울, December-February) — 10-30 seconds idle before driving gently, do NOT rev cold, block heater plugged in 2-3 hours before departure if equipped, keep tire chains (이지체인 sold at rest stops) in the truck, wipe lights before every drive.",
    inspectionHint:
      "3.5L EcoBoost owners in Korea: intercooler condensation is the most common cause of summer-monsoon misfire/stumble. Check the boot drain before blaming coils.",
    sourceCitationKey: "multi-engine-korea-climate-adjustments",
  },

  // ── 11. Korean mechanic finder & language ─────────────────────────
  {
    id: "multi-engine-korean-mechanic-finder",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Finding F-150-capable mechanics in Korea (미제 트럭 전문 정비소)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "American truck shop Korea",
      "미제 트럭 전문",
      "F-150 mechanic Korea",
      "Pyeongtaek mechanic",
      "평택 정비소",
      "ForScan ELM327",
      "Ford Korea dealer",
      "US military base mechanic",
    ],
    excerpt:
      "Per the Master Guide's Korea section: look for shops specializing in American trucks — search 미제 트럭 전문 정비소 (American-make truck specialty repair shop). Seoul, Pyeongtaek (평택), and areas near US military bases tend to have mechanics with F-150 experience. These shops have seen the engine's quirks (5.4 cam phasers, EcoBoost charge-pipe boots, 6R80 transmission patterns) and stock or can quickly source the right tools. ForScan is called out as 'essential' for Ford ownership in Korea — it handles many dealer-level diagnostics that Korean general shops cannot. An ELM327 OBD2 adapter plus a ForScan license costs under $50 total and replaces hundreds of dollars in dealer scan-tool fees. For the biennial inspection (자동차검사, required every 2 years) verify all emissions equipment is intact and functioning before the test; Korean inspection lanes are strict about visible EVAP, catalytic converter, and O2 sensor hardware.",
    inspectionHint:
      "If a Korean shop says they cannot read your codes, hand them your phone with ForScan paired to an ELM327. Most shops will read and reset codes you have already identified.",
    sourceCitationKey: "multi-engine-korean-mechanic-finder",
  },

  // ── 12. Korean fuel grade by engine ───────────────────────────────
  {
    id: "multi-engine-korean-fuel-grade",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Korean fuel grade by engine — 고급 휘발유 for 6.2L and 3.5L EB",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["fuel_air_metering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Korean gasoline",
      "고급 휘발유",
      "보통 휘발유",
      "premium fuel",
      "regular fuel",
      "92 octane",
      "91 octane",
      "F-150 fuel grade",
    ],
    excerpt:
      "Korean gasoline is high quality across both grades per the Master Guide. Per-engine recommendation: use 92 octane (고급 휘발유, premium) for the 6.2L Boss and 3.5L EcoBoost — both engines benefit from the higher octane (the EcoBoost especially under boost). The 4.6L 2V, 5.4L 3V, 5.0L Coyote, and 3.7L V6 run fine on 91 (보통 휘발유, regular). Note that Korean octane numbers use the same scale as US AKI numbers in this guide — 'Korean 91' is comparable to US 87-89 regular. For E85, the guide notes that if running E85 50% of the time or greater, fill the tank with regular unleaded every 3,000 miles if run exclusively on E85, and change oil every 5,000 mi or 6 months. E85 is not widely available in Korea; treat that schedule as a non-issue unless you specifically source it.",
    inspectionHint:
      "3.5L EcoBoost knock/spark retard symptoms on a Korean regular tank often clear after one full tank of premium. Test before chasing sensor faults.",
    sourceCitationKey: "multi-engine-korean-fuel-grade",
  },

  // ── 13. Tire & TPMS in Korea ──────────────────────────────────────
  {
    id: "multi-engine-tires-tpms-korea",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Tire rotation, alignment, TPMS — pre-고속도로 (highway) checks",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["vibration", "pull"],
    aliases: [
      "tire rotation",
      "고속도로",
      "highway pre-trip",
      "TPMS sensor",
      "wheel alignment",
      "타이어 로테이션",
      "타이어 공기압",
    ],
    excerpt:
      "Tire and wheel intervals shared across all 12th-gen engines: rotation every 5,000-7,500 mi / 8,000-12,000 km on the 5-lug pattern (do it with every oil change for simplicity). Tire pressure check monthly per the door-jamb sticker; adjust for temperature changes. The Master Guide specifically calls out checking tire pressure before highway (고속도로) trips in Korea — toll-road speeds and long uninterrupted runs punish low pressure quickly. Wheel alignment every 12 months or after suspension work; critical after any lift kit or spring replacement. TPMS sensor battery replacement at ~7-10 years — OEM sensors are about $40 each, aftermarket about $15. Winter prep: studless winter tires with minimum 4mm tread depth for Korean winter safety; some mountain areas require chains. The guide mentions 이지체인 (easy chains) sold at Korean rest stops as a practical backup — practice installation before you need them.",
    inspectionHint:
      "Summer morning pressure check is the most reliable reading — afternoon heat can add 3-5 PSI and mask a slow leak.",
    sourceCitationKey: "multi-engine-tires-tpms-korea",
  },

  // ── 14. Mileage milestone checklists summary ──────────────────────
  {
    id: "multi-engine-mileage-milestones",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Mileage milestone services — 30K, 60K, 90K, 120K, 150K+",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical", "drivetrain_4wd", "cooling", "brakes"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "30000 mile service",
      "60000 mile service",
      "90000 mile service",
      "120000 mile service",
      "150000 mile service",
      "milestone checklist",
      "mileage interval",
    ],
    excerpt:
      "Milestone services and DIY/shop cost estimates from the Master Guide: 30,000 mi (48,000 km) — oil + filter, engine air filter, cabin air filter, tire rotation/pressure, brake pad inspection front and rear, fluid level visual check, battery terminal cleaning, wiper replacement, door/hood lube, exterior lights, throttle body cleaning on 5.4L/3.7L, catch can empty on 3.5L EB, intercooler boot inspection on 3.5L EB. Estimated $150-250 DIY / $300-500 shop. 60,000 mi (96,000 km) — everything from 30K plus 6R80 ATF drop-and-fill, transfer case fluid, front and rear diff fluid (add LS friction modifier), 3.5L EB spark plugs (only EB at this interval), serpentine belt inspection, brake rotor measurement, caliper slide pin clean and re-grease, coolant pressure test, 5.4L exhaust stud inspection, VCT solenoid screen check on 5.4L and 5.0L, charge pipe and intercooler boot check on 3.5L EB, suspension inspection, U-joint grease. Estimated $400-700 DIY / $800-1,500 shop. 90,000 mi (144,000 km) — second 6R80 ATF service, brake fluid flush, second 3.5L EB plug change, valve cover gasket inspection on 5.0L/6.2L, 5.4L cam phaser listen test, 3.5L EB turbo oil line inspection, walnut blast on 3.5L EB if not done at 60-80K. Estimated $500-900 DIY / $1,000-2,000 shop. 120,000 mi (192,000 km) — spark plugs on 4.6L/5.4L/5.0L/6.2L/3.7L, serpentine belt + tensioner + idler replacement, proactive thermostat, water pump inspection on all, second coolant flush, third 6R80 ATF service. Estimated $800-1,500 DIY / $1,500-3,000 shop. 150,000+ mi (240,000+ km) — timing chain/guide inspection on all engines, 5.4L cam phaser replacement if rattling, 3.5L EB turbo bearing play check, transmission pan drop and filter, rear main seal inspection, 6.2L valve guide/seal assessment, shocks, ball joints, tie rods, wheel bearings, frame rust inspection (critical for Korea). Estimated $1,000-2,000 DIY / $2,000-5,000+ shop.",
    inspectionHint:
      "Use the 60K and 120K services as forcing functions for all four driveline fluids (ATF, transfer case, both diffs) at once — easier to remember than tracking each independently.",
    sourceCitationKey: "multi-engine-mileage-milestones",
  },

  // ── 15. DIY decision framework + Level 1 tasks ────────────────────
  {
    id: "multi-engine-diy-vs-shop-framework",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "DIY vs shop decision framework — Levels 1-3 + savings",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "DIY tasks",
      "shop tasks",
      "what to DIY",
      "ForScan",
      "Lisle 65600",
      "직접 정비",
      "정비소 작업",
    ],
    excerpt:
      "Master Guide's DIY framework breaks 12th-gen maintenance into three levels. Level 1 (any owner): oil change ($30-60 saved vs shop, 30-45 min), engine air filter ($20-30, 5 min), cabin air filter ($30-50, 5-10 min), wipers, bulbs ($20-50, 10-30 min), battery terminal cleaning ($20-40, 10 min), tire pressure fill, washer fluid, hinge/latch lube, EB catch can empty. Level 1 tool investment $100-200 (floor jack, jack stands, drain pan, basic sockets, filter wrench). Level 2 (handy owner): brake pad replacement ($100-200 saved, 1-2 hr), brake rotors ($100-200, 1-2 hr), spark plugs all engines EXCEPT 5.4L ($100-300, 1-3 hr), serpentine belt ($50-100, 30 min), coolant flush ($80-150, 1-2 hr), 6R80 drop-and-fill ($100-200, 1-1.5 hr), diff fluids ($60-120, 30-45 min per diff), transfer case ($40-80, 30 min), battery ($30-50, 15-30 min), thermostat ($60-100, 1-2 hr), throttle body clean ($40-80, 30 min), brake fluid flush ($60-100, 1 hr), shocks ($100-200, 2-3 hr), O2 sensor ($60-120, 30-60 min). Level 2 tool investment $300-600. Level 3 (experienced or shop): 5.4L spark plugs ($300-600 shop / $800-1,500 if plugs break), 5.4L cam phasers (8-12 hr, $2,500-4,500 shop), any timing chain (8-16 hr, $1,500-4,000), 3.5L EB turbo replacement (6-10 hr, $1,500-3,000 per turbo), walnut blast (3-4 hr, $400-600), transmission rebuild ($2,500-4,500), head gasket ($2,000-3,500), rear main seal ($800-1,500), 5.0L/6.2L valve cover gasket ($400-800), EVAP diagnosis ($200-500), AC compressor with EPA-regulated refrigerant work ($800-1,500), ABS module needing programming ($500-1,200), 3.7L internal water pump ($1,200-2,000). Decision rule from the guide: if removing the intake manifold, timing cover, or transmission is involved, go shop unless you have experience and a full garage. If catastrophic engine damage is possible from a mistake, go shop.",
    inspectionHint:
      "ForScan handles many tasks the guide tags as 'shop only for programming' — TPMS relearns, idle relearns, even ABS bleeding on some years.",
    sourceCitationKey: "multi-engine-diy-vs-shop-framework",
  },

  // ── 16. Brakes & belts shared schedule ────────────────────────────
  {
    id: "multi-engine-brakes-belts-schedule",
    sourceType: "repair_note",
    sourceLabel: "12th-Gen F-150 Master PM Guide",
    title: "Brakes, belts, electrical — shared intervals across all engines",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes", "accessory_drive", "charging", "battery_ground"],
    issueAreaIds: [
      "brake_hose_or_line_concern",
      "accessory_drive_belt_path",
      "battery_charge_and_ground_path",
    ],
    partTags: [
      "belt",
      "tensioner",
      "idler_pulley",
      "battery",
      "battery_terminal",
      "brake_line",
    ],
    symptomTags: ["chirp", "squeal", "dead_battery"],
    aliases: [
      "brake pad interval",
      "brake rotor inspection",
      "serpentine belt",
      "tensioner pulley",
      "alternator output",
      "battery life",
    ],
    excerpt:
      "Shared brake, belt, and electrical intervals across all 12th-gen engines. Brakes: brake pad inspection every 15,000 mi / 24,000 km, replace at 3 mm or less; brake rotor inspection every 30,000 mi / 48,000 km for scoring and minimum thickness; caliper slide pin clean and re-grease with silicone brake grease every 30,000 mi; parking brake adjustment every 30,000 mi on the rear drum-in-disc style (self-adjusting but verify operation). Belts and accessories: serpentine belt inspection at 60,000 mi for cracks/glazing/rib wear; replacement at 100,000 mi alongside tensioner (spring-loaded and fatigues); idler/tensioner pulley spin-check by hand at 100,000 mi for roughness or noise. Electrical: battery test annually after 3 years (OEM Motorcraft battery typically lasts 4-5 years); battery terminal cleaning annually with a wire brush and baking soda solution, then dielectric grease; alternator output test every 60,000 mi (should read 13.8-14.4V at idle). Engine air filter every 15,000-20,000 mi (FA-1883 varies by engine); inspect more frequently in dusty conditions or on dirt roads. Fuel filter is in-tank lifetime — no scheduled service.",
    inspectionHint:
      "Replace the tensioner with the belt — a tired tensioner will chew through a brand-new belt in months.",
    sourceCitationKey: "multi-engine-brakes-belts-schedule",
  },
];
