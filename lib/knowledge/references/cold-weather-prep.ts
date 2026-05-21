import { F150_GENERAL_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

/**
 * Cold-weather and winterization reference for the 12th-gen F-150
 * (2009-2014), with strong Korean winter context: 염화칼슘 (calcium
 * chloride) road salt, -10°C to -20°C Seoul lows, -20°C+ mountain lows
 * in 강원도 and 충청북도, and 220V Korean electrical for block heaters.
 *
 * Korean salt/undercoating mitigation and shared 50/50 antifreeze
 * specs are summarized in `multi-engine-maintenance.ts`; entries here
 * go deeper on block heaters, cold cranking, winter tires/chains,
 * winter washer fluid, cold-weather oil weight, IWE actuator failure,
 * mountain-pass driving, the pre-winter checklist, extreme-cold
 * starting procedure, and emergency kits. Cross-reference, do not
 * fully duplicate.
 */
export const COLD_WEATHER_PREP_REFERENCES: TruckReferenceRecord[] = [
  // ── 1. Block heater overview & part numbers ───────────────────────
  {
    id: "cold-weather-block-heater-overview",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Block heater — Motorcraft engine-specific part, accessed from underneath",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical", "cooling"],
    issueAreaIds: [],
    partTags: ["engine_top_front"],
    symptomTags: [],
    aliases: [
      "block heater",
      "engine block heater",
      "Motorcraft block heater",
      "engine heater",
      "엔진 예열기",
      "블록 히터",
      "한랭지 사양",
      "winter package",
      "freeze plug heater",
    ],
    excerpt:
      "Ford F-150 block heater plugs into the engine block at a freeze-plug location and is accessed from underneath the truck — the heater element is permanent, only the power cord routes out near the front grille or driver-side fender. Part number varies by engine: 4.6L 2V and 5.4L 3V Triton share one Motorcraft block heater part, 6.2L Boss uses a different (larger) heater for the bigger casting, and 3.5L EcoBoost has its own DOHC-block specific unit. Rating is 1500W at 110V/120V (US spec); pulls roughly 12-13 amps so it is fine on a Korean 220V→110V step-down transformer rated for at least 2000W. Most 2009-2014 F-150s sold in the US Midwest/Northeast came with the heater pre-installed (RPO 41H 'engine block heater' on the door sticker); trucks built for southern US states or imported to Korea via private channels often have the boss capped and no heater fitted. Retrofit is straightforward: drain coolant, remove the block-side freeze plug, install the heater element, route the cord forward, refill coolant.",
    inspectionHint:
      "Check the build sticker on the driver door jamb for 'engine block heater' or RPO 41H. No code = no heater installed, even if there is an empty cord loop in the engine bay.",
    sourceCitationKey: "cold-weather-block-heater-overview",
  },

  // ── 2. Block heater 220V Korean conversion ────────────────────────
  {
    id: "cold-weather-block-heater-korea-220v",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "220V Korean adapter for US 110V block heater — Coupang cord, step-down option",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical", "electrical"],
    issueAreaIds: [],
    partTags: ["engine_top_front"],
    symptomTags: [],
    aliases: [
      "220V block heater",
      "block heater Korean adapter",
      "step-down transformer block heater",
      "다운 트랜스",
      "220V 변환",
      "엔진 히터 220V",
      "쿠팡 엔진 히터 코드",
      "Korean voltage block heater",
    ],
    excerpt:
      "Korea is 220V/60Hz; the US block heater is 110V/120V/60Hz. Two options: (1) Replace the 110V heater element with a 220V aftermarket element. Coupang (쿠팡) and 11번가 stock 220V engine block heater cords with the same NPT thread sizes as the Motorcraft part for roughly ₩20,000-30,000 (~$15-22). This is the cleaner long-term solution because you can plug straight into any Korean outlet with no transformer. (2) Keep the OEM 110V element and run it through a 220V→110V step-down transformer (다운 트랜스, available everywhere in Korea for ₩30,000-60,000). The transformer must be rated for at least 2000W continuous to handle the 1500W heater plus inrush. The 60Hz frequency match between Korea and the US means resistive heating elements work fine on either voltage with proper conversion — no concerns about cycling or burning out from frequency mismatch. Do NOT plug a 110V heater directly into a 220V outlet — element will burn out in seconds and may start a fire.",
    inspectionHint:
      "Step-down transformers get hot — locate outside the engine bay, not on the truck. A garage-floor transformer on a timer is the typical Korean owner setup.",
    safetyNote:
      "Never plug a US 110V block heater directly into a Korean 220V outlet. Verify voltage on the element label before connecting.",
    sourceCitationKey: "cold-weather-block-heater-korea-220v",
  },

  // ── 3. When and why to use a block heater ─────────────────────────
  {
    id: "cold-weather-block-heater-use-case",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Block heater use case — 2-4 hours pre-start at -10°C and below",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: ["engine_top_front", "battery"],
    symptomTags: ["dead_battery"],
    aliases: [
      "when to use block heater",
      "block heater duration",
      "block heater timer",
      "예열 시간",
      "엔진 예열기 사용",
      "cold start protection",
      "winter cold start",
      "morning cold start",
    ],
    excerpt:
      "Plug the block heater in 2-4 hours before start in -10°C to -20°C cold (a Christmas-tree timer set to come on 3 hours before departure is the standard setup). Running it longer than 4 hours wastes electricity without further benefit — the coolant reaches roughly 30-40°C and stops climbing once the heat loss to the engine bay equals the heater output. Below -20°C, leave it plugged in overnight on a timer that cycles 30 minutes on / 30 minutes off. Benefits: (1) Faster warm-up — heater core has warm coolant immediately, defrost works at idle. (2) Less wear on cold start — oil is thinner and circulates faster, reducing the 90 seconds of essentially-dry running that causes most engine wear. (3) Easier first crank — starter draws less current, battery sees less voltage drop, fuel atomizes properly. Most Korean drivers do not use block heaters because Korean and Japanese passenger cars rarely have them, but for a 5.4L 3V or 3.5L EcoBoost F-150 in 강원도 or 충청북도 mountain regions the heater pays for itself in reduced cam-phaser and turbo wear over a few winters.",
    inspectionHint:
      "If first-crank RPM stays below 200 in -15°C cold even with a healthy battery, the engine oil is the bottleneck — a block heater will fix it where a battery upgrade alone will not.",
    sourceCitationKey: "cold-weather-block-heater-use-case",
  },

  // ── 4. Battery — OEM spec and CCA targets ─────────────────────────
  {
    id: "cold-weather-battery-cca-spec",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Cold-cranking battery — Motorcraft BXT-65-650 OEM, 750+ CCA for -20°C",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["battery_ground", "charging"],
    issueAreaIds: ["battery_charge_and_ground_path", "battery_terminal_corrosion"],
    partTags: ["battery", "battery_terminal"],
    symptomTags: ["dead_battery"],
    aliases: [
      "Motorcraft BXT-65-650",
      "BXT-65-650",
      "650 CCA",
      "750 CCA",
      "cold cranking amps",
      "CCA winter",
      "한랭 시동 전류",
      "겨울 배터리",
      "F-150 battery spec",
      "Group 65 battery",
    ],
    excerpt:
      "OEM battery for the 4.6L 2V and 5.4L 3V Triton 12th-gen F-150 is Motorcraft BXT-65-650, a Group 65 flooded lead-acid rated 650 CCA. The 6.2L Boss and 3.5L EcoBoost ship with the same Group 65 case but a higher-output variant (BXT-65-750) rated 750 CCA, and the 6.2 in Raptor trim sometimes uses dual batteries. CCA targets by climate: 650 CCA is adequate for a Seoul winter (-5°C to -15°C lows); 750+ CCA is the practical floor for reliable -20°C starts in mountain regions; 850+ CCA gives margin for a tired 5.4L 3V that already has marginal cold cranking. CCA ratings drop sharply with age — a 5-year-old 650-CCA battery may load-test at 400 CCA, fine in summer but a no-start at -15°C. The Group 65 case size is the same so any 650/750/850 CCA Group 65 battery drops in with no bracket changes. Always specify Group 65 (NOT Group 24 or 78) when ordering in Korea; mounting bracket and terminal-post layout differ between groups.",
    inspectionHint:
      "If the truck cranks slower in October than it did in March, the battery is already failing — replace before the first deep cold instead of waiting for the no-start.",
    sourceCitationKey: "cold-weather-battery-cca-spec",
  },

  // ── 5. AGM upgrade for accessory load ─────────────────────────────
  {
    id: "cold-weather-battery-agm-upgrade",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "AGM battery upgrade — Optima YellowTop D34/78, deep-cycle plus 750 CCA",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["battery_ground", "charging"],
    issueAreaIds: ["battery_charge_and_ground_path"],
    partTags: ["battery"],
    symptomTags: ["dead_battery"],
    aliases: [
      "Optima YellowTop",
      "D34/78",
      "AGM battery F-150",
      "deep cycle battery",
      "옵티마 배터리",
      "AGM 배터리",
      "winch battery",
      "accessory load battery",
      "starter plus deep cycle",
    ],
    excerpt:
      "For F-150s running winch loads, aux lighting bars, fridges, or extended accessory use (camping, ice fishing, mountain expeditions), upgrade to an AGM dual-purpose battery. The Optima YellowTop D34/78 is the typical pick: 750 CCA cold cranking PLUS deep-cycle capacity that survives the 60-80% depth-of-discharge cycles that kill a flooded lead-acid in months. AGM also handles cold better — the absorbed-glass-mat construction does not stratify when sitting cold, so resting voltage stays higher and the chemistry stays active at -20°C+ where flooded batteries lose 40-50% of rated capacity. The D34/78 is a side-and-top-post hybrid that fits the Group 65 tray with the original hold-down clamp; the dual-terminal design means the OEM positive cable bolts to the side post and the negative grounds normally on top. Cost: roughly ₩400,000-500,000 ($300-380) in Korea via Coupang or specialty 4WD shops, vs $250 in the US — worth importing through 배대지 if you can find a forwarding service that will handle batteries (some refuse on shipping-safety grounds).",
    inspectionHint:
      "AGM batteries need an alternator that can deliver a 14.6-14.8V absorb voltage; the OEM Ford alternator handles this fine, but cheap aftermarket replacements may undercharge an AGM and shorten its life.",
    sourceCitationKey: "cold-weather-battery-agm-upgrade",
  },

  // ── 6. Korean battery brands, age, and pre-winter test ────────────
  {
    id: "cold-weather-battery-korea-brands-test",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Korean battery brands and pre-winter load test — Atlas BX, Rocket, Hyundai",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["battery_ground"],
    issueAreaIds: ["battery_charge_and_ground_path"],
    partTags: ["battery"],
    symptomTags: ["dead_battery"],
    aliases: [
      "Atlas BX",
      "아틀라스 BX",
      "Rocket battery",
      "로케트 배터리",
      "Hyundai Battery",
      "현대 배터리",
      "delkor",
      "Korean battery brand",
      "battery load test",
      "배터리 점검",
      "배터리 부하 테스트",
    ],
    excerpt:
      "Korean battery brands cross-reference for the F-150 Group 65: Atlas BX (아틀라스 BX) — most common OEM-equivalent supply for Korean dealers, good quality, 750 CCA option available in Group 65 size. Hyundai Battery (현대 배터리) — solid choice, widely stocked. Rocket (로케트) — budget-friendly, ~₩150,000, OK for Seoul winters but I would not trust it at -20°C+. Delkor — premium Korean brand, comparable to Motorcraft quality, ~₩280,000-300,000. Price range: ₩150,000-300,000 ($115-230) for a quality 750 CCA Group 65 battery in Korea, vs $180-220 in the US for Motorcraft BXT-65-750. Always replace at 4 years even if testing OK — cold weather is brutal on aging batteries, and a 4-year flooded battery in Korean winter is on borrowed time regardless of what the parasitic-draw test says. Pre-winter test (October-November): resting voltage 12.6V+ after sitting 12 hours; CCA test under load should read at least 80% of the rated CCA on the label. Below either threshold, replace before the first sub-zero week.",
    inspectionHint:
      "Korean shops will give you a free 배터리 점검 (battery check) if you ask. Bring it in October — most October testers are still healthy, so a borderline reading in October means a January no-start.",
    sourceCitationKey: "cold-weather-battery-korea-brands-test",
  },

  // ── 7. Winter tires — all-season vs dedicated ─────────────────────
  {
    id: "cold-weather-winter-tires-selection",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Winter tires — Michelin X-Ice XI3, Bridgestone Blizzak, Toyo Observe in P275/65R18",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["vibration"],
    aliases: [
      "winter tires F-150",
      "snow tires F-150",
      "Michelin X-Ice XI3",
      "Bridgestone Blizzak",
      "Toyo Observe",
      "스노우 타이어",
      "겨울용 타이어",
      "윈터 타이어",
      "P275/65R18",
      "P265/70R17",
      "all-season vs winter",
    ],
    excerpt:
      "All-season tires (Michelin LTX M/S, Goodyear Wrangler) handle Seoul roads fine in a typical winter where snow rarely sits more than 24 hours, but they harden below 7°C and lose grip on ice and packed snow regardless of tread depth. For mountain regions (강원도, 충청북도) and any owner who drives in actual snow weekly, swap to dedicated winter tires. Top picks in F-150 sizes (P275/65R18 most popular for FX4 and XLT, P265/70R17 for base trims, P275/55R20 for Limited): Michelin X-Ice XI3 — best ice grip, premium price; Bridgestone Blizzak DM-V2 (truck/SUV version) — best snow traction, slightly noisier; Toyo Observe GSi-6 LS — value pick, good all-around performance. Korean availability: Costco Korea stocks all three in F-150 sizes (Costco mounting is included with purchase), Tirebank (타이어뱅크) has 200+ branches nationwide and does on-demand swaps, and 한국타이어 stores carry Hankook Winter i*Pike (Hankook's premium winter tire) which is fine but a step below the Big Three. Cost: ₩200,000-400,000 per tire ($150-300) for premium winter rubber, plus ₩40,000-60,000 mounting and balancing per set of four.",
    inspectionHint:
      "Winter tire tread under 5/32 inch / 4mm = replace before another winter. Tread depth drops grip faster than visually obvious.",
    sourceCitationKey: "cold-weather-winter-tires-selection",
  },

  // ── 8. Studs banned, chains required, swap threshold ──────────────
  {
    id: "cold-weather-tires-korea-studs-chains",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Korean tire rules — studs banned, chains required on mountain roads, swap at 5°C",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "studded tires Korea",
      "스파이크 타이어",
      "snow chains Korea",
      "체인",
      "이지체인",
      "tire chains required",
      "겨울 의무 체인",
      "summer winter swap",
      "타이어 교체 시기",
      "5°C threshold",
      "40°F swap",
    ],
    excerpt:
      "Korean tire law key points: (1) Studded tires (스파이크 타이어) are NOT permitted on Korean public roads. This is different from Scandinavia and parts of Canada where studs are legal in winter — in Korea, studs damage the asphalt and are banned year-round. Use studless winter tires (스터드리스) only. (2) Snow chains (체인) are required on certain mountain roads when snow accumulates. The Korea Expressway Corporation (한국도로공사) posts mandatory-chain notices at on-ramps during snow events; ignoring them risks a fine and a turn-around. Carry chains for at least the drive wheels (rear chains on 2WD, front-and-rear on 4WD for serious mountain work). 이지체인 (easy chains) sold at Korean rest stops are textile/rubber chains that meet the legal requirement and are quicker to install than steel cable chains. (3) Swap to winter tires when daytime highs consistently drop below 5°C / 40°F — typically early-to-mid November in Seoul, late October in mountain regions. Swap back to summer/all-season when daytime highs are consistently above 5°C, usually mid-March in Seoul. The 5°C threshold is when winter rubber compound becomes useful and summer compound starts hardening; running summer tires below 5°C is the single most common cause of one-car winter accidents in Korea.",
    inspectionHint:
      "Practice chain installation in your garage in October — installing chains in a blizzard on a mountain pass with cold fingers is not the first time you want to do it.",
    safetyNote:
      "Do not exceed 50 km/h with chains installed; chains will fail at higher speeds and can damage brake lines and fender wells.",
    sourceCitationKey: "cold-weather-tires-korea-studs-chains",
  },

  // ── 9. Winter washer fluid — Korean spec and brands ───────────────
  {
    id: "cold-weather-washer-fluid-winter",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Winter washer fluid — -25°C or -40°C rated, Rain-X De-Icer or Korean 김장원",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "winter washer fluid",
      "windshield washer winter",
      "워셔액 겨울용",
      "겨울 워셔액",
      "Rain-X De-Icer",
      "김장원",
      "녹원",
      "-40 washer",
      "frozen washer fluid",
      "washer concentrate",
    ],
    excerpt:
      "Summer washer fluid (the cheap blue stuff at every Korean gas station) is mostly water with a surfactant and freezes solid at 0°C — when it freezes in the reservoir it can crack the tank ($150+ replacement) and burst the pump and lines. Switch to winter formula before the first freeze. Specs: -25°C is the practical minimum rating for Seoul; -40°C rated fluid covers mountain regions and overnight parking in -20°C+ cold. Brand picks: Rain-X De-Icer (~$8/gal in US, available via Costco Korea or 배대지) — adds methanol concentration that also helps shed ice off the wiper sweep. Korean brands: 김장원 (Kimjangwon) and 녹원 (Nokwon) winter-rated formulas both ~₩6,000-10,000 per gallon at 마트 and 주유소. Pure ethylene-glycol-based concentrate (washer-fluid concentrate, not coolant) can be diluted 1:1 with summer fluid to get a roughly -20°C mix if you cannot find winter-rated fluid. F-150 washer reservoir capacity is roughly 5 liters — top off before every long winter trip because the reservoir can drain fast when wiping road salt off the windshield.",
    inspectionHint:
      "If the washer pump cycles but no spray comes out in cold weather, the lines are frozen — do NOT keep cycling the pump (kills the motor). Park in a warm garage or pour warm water on the hood line near the nozzles to thaw.",
    sourceCitationKey: "cold-weather-washer-fluid-winter",
  },

  // ── 10. Coolant — antifreeze ratio for Korean winter ──────────────
  {
    id: "cold-weather-coolant-ratio",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Coolant 50/50 vs 60/40 — Motorcraft Premium Gold tested to -36°C",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cooling"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["coolant_reservoir", "radiator_hose", "thermostat_housing"],
    symptomTags: ["coolant_smell"],
    aliases: [
      "antifreeze ratio",
      "coolant 50/50",
      "coolant 60/40",
      "Motorcraft Premium Gold",
      "VC-7-B",
      "yellow coolant Ford",
      "겨울 부동액",
      "부동액 농도",
      "냉각수 동결",
      "refractometer",
      "ethylene glycol",
    ],
    excerpt:
      "12th-gen F-150 coolant is Motorcraft Premium Gold (yellow) — VC-7-B in the early 2009-2012 spec, switching to VC-3DIL-B (Orange) for later trucks (see `multi-engine-shared-fluids` for replacement intervals). A standard 50/50 mix of antifreeze and distilled water gives freeze protection to about -34°C / -30°F, which is enough for Seoul winters. Korean mountain trucks running in 강원도 highlands or overnighting at altitude in -25°C+ cold should use a 60/40 antifreeze/water mix instead — this drops the freeze point to roughly -50°C with only a small loss in heat-transfer capacity. Do NOT exceed 70/30 antifreeze — going past that point actually WEAKENS freeze protection (pure ethylene glycol freezes at -12°C, counterintuitively warmer than a 60/40 mix) and reduces specific heat capacity to the point where the engine can overheat under sustained load. Test the mix with a refractometer (≈₩30,000 from Coupang) before winter; the float-ball testers sold at Korean auto stores are inaccurate below -20°C. A correct 50/50 mix should read -34°C / -30°F freeze protection on the refractometer.",
    inspectionHint:
      "If the coolant reservoir slush-freezes in -15°C cold overnight, the mix is too water-heavy regardless of what the float tester says — drain and refill at 60/40 with fresh antifreeze.",
    safetyNote:
      "Never run pure water as coolant, even briefly, in Korean winter. Water alone freezes at 0°C and will crack the block and heater core.",
    sourceCitationKey: "cold-weather-coolant-ratio",
  },

  // ── 11. Cold-weather oil weight ───────────────────────────────────
  {
    id: "cold-weather-oil-weight",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Cold-weather oil — stick to 5W-20 spec, 0W-20 synthetic for -25°C+ mountains",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "5W-20",
      "0W-20",
      "winter oil weight",
      "cold weather oil",
      "겨울 엔진오일",
      "0W-20 vs 5W-20",
      "synthetic oil cold",
      "Mobil 1 winter",
      "Pennzoil Platinum",
      "Motorcraft Full Synthetic",
      "oil viscosity cold",
    ],
    excerpt:
      "Five of the six 12th-gen F-150 engines are spec'd 5W-20 full synthetic (the 3.5L EcoBoost is 5W-30 — see `multi-engine-oil-change-comparison`). 5W-20 is tested to flow at -30°C cold which covers nearly all of Korea including 강원도 mountain lows. For drivers regularly seeing -25°C+ overnight (overnight parking in mountain valleys, no garage), switching to 0W-20 full synthetic improves cold-start oil flow noticeably — the engine sees pressurized oil 0.5-1.0 seconds sooner on first crank, which protects bearings and cam phasers during the highest-wear moment of the day. CRITICAL: stick with Ford-spec viscosity. Do NOT go heavier in cold (5W-30 in a 5.4L 3V is bad year-round — VCT phasers are calibrated for 5W-20 oil pressure, and 5W-30 causes the same phaser whine the engine is already prone to). Synthetic is mandatory for cold weather regardless of engine — conventional 5W-20 thickens too much below -10°C and starves the top end. Recommended brands available in Korea: Mobil 1 Extended Performance 0W-20 (Costco Korea, ₩70,000-90,000 for 5 qt), Pennzoil Platinum 0W-20 (Coupang, similar price), Motorcraft Full Synthetic (iHerb or 배대지). Cold-weather change interval: ~5,000 km despite OLM indicating longer — short-trip city driving plus cold starts is severe-duty regardless of what the dash thinks.",
    inspectionHint:
      "If you hear cam-phaser tick that lasts more than 3-4 seconds on cold starts below -10°C, the engine is starving for oil pressure during start — switch from 5W-20 to 0W-20 synthetic at the next change.",
    safetyNote:
      "Never use 5W-30 in a 5.4L 3V Triton. Cam phaser failure is essentially guaranteed within 30,000 km on the wrong oil weight.",
    sourceCitationKey: "cold-weather-oil-weight",
  },

  // ── 12. IWE actuator failure in cold ──────────────────────────────
  {
    id: "cold-weather-iwe-actuator-failure",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "IWE actuator failure — cold-weather TSB cluster, grinding from front hubs",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: ["drivetrain_leak_or_boot"],
    partTags: ["iwe_solenoid_actuator", "transfer_case_area"],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "IWE actuator",
      "Integrated Wheel End",
      "IWE solenoid",
      "front hub grinding",
      "4WD won't engage",
      "front hub vacuum",
      "cold weather 4WD",
      "겨울 4WD 오작동",
      "IWE TSB",
      "Ford TSB 14-0086",
    ],
    excerpt:
      "The Integrated Wheel End (IWE) system uses engine vacuum to disengage the front hubs in 2WD and engage them in 4H/4L. The actuators are mounted at each front hub and the solenoid is on the firewall. Failure in cold weather is a documented TSB cluster — moisture condenses inside the vacuum lines, freezes in the actuators, and either (a) prevents the hubs from engaging (4H selected but no front drive, sloppy turn-in feel) or (b) prevents them from disengaging (constant grinding/whirring from the front hubs in 2WD at 40+ km/h, sounds like a bad wheel bearing). The Ford TSB cluster 14-0086 and follow-ons addressed this with redesigned check valves and revised solenoid software. Pre-winter test: park on flat ground, engage 4-high via the dash dial, idle in drive, listen for grinding from either front wheel; look for the 4x4 light to be solid (not flashing). Walk around and check for a 'service 4WD' light. If grinding persists 30 seconds after engagement or the light flashes, the actuators or solenoid are suspect. Repair: replace both IWE actuators ($60-100 each), the firewall solenoid ($40-60), and the vacuum check valve ($20). Korean shops without F-150 experience often misdiagnose this as a wheel-bearing job — bring the TSB number with you.",
    inspectionHint:
      "Grinding noise from the front hubs only when cold + clears as the engine warms up = classic IWE moisture/freeze failure. Drying the vacuum lines with a brake-cleaner can buy a season; new actuators fix it permanently.",
    sourceCitationKey: "cold-weather-iwe-actuator-failure",
  },

  // ── 13. 4WD pre-winter test + diff lube ───────────────────────────
  {
    id: "cold-weather-4wd-pre-winter-test",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "4WD pre-winter test — engage 4-high, listen, check service light; 75W-140 front diff",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: ["drivetrain_leak_or_boot"],
    partTags: [
      "transfer_case_area",
      "differential_cover",
      "iwe_solenoid_actuator",
    ],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "4WD test",
      "4WD pre-winter",
      "4-high test",
      "front diff fluid",
      "75W-140",
      "80W-90",
      "diff lube",
      "4WD 점검",
      "전륜 디퍼렌셜",
      "transfer case fluid winter",
    ],
    excerpt:
      "Before winter, run the 4WD self-check: (1) On a loose gravel surface or empty lot, engage 4-high from 2H with the dash dial. The 4x4 light should illuminate within 2-3 seconds. (2) Drive forward slowly in a straight line, then make a tight turn. A small amount of binding/scrubbing is normal in 4H (because front and rear axles are locked together); grinding from a front hub is NOT normal. (3) Disengage back to 2H — confirm light goes out and no front-hub noise remains at 40-60 km/h on the way home. (4) Engage 4L from a stop with the trans in neutral, then drive — confirms the low-range planetary engages. If any of these fail, see `cold-weather-iwe-actuator-failure` and the relevant transfer case TSB cluster. Front differential lube: spec is 75W-140 Synthetic (Motorcraft XL-12). Some northern owners step up to 75W-140 instead of the lighter 80W-90 occasionally listed for older trucks; in -20°C+ cold the heavier synthetic is preferred because it does not film-shear under the high impact loads of front-axle engagement on icy surfaces. Front diff capacity is roughly 1.6 quarts. Rear diff is also 75W-140 with friction modifier (XL-3) for limited-slip rears — see `multi-engine-shared-fluids` for interval.",
    inspectionHint:
      "Engage 4H once a month in winter, even if you do not need it. The transfer case shift fork and IWE seals depend on movement to stay sealed; sitting in 2H all season is what kills them.",
    sourceCitationKey: "cold-weather-4wd-pre-winter-test",
  },

  // ── 14. Korean road salt — 염화칼슘 detail ─────────────────────────
  {
    id: "cold-weather-korean-road-salt-detail",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Korean road salt (염화칼슘) — Nov-Mar season, weekly rinse, undercoating prep",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["underbody", "brakes"],
    issueAreaIds: ["underbody_frame_corrosion", "brake_hose_or_line_concern"],
    partTags: ["frame_section", "brake_line", "wheel_well_lip"],
    symptomTags: ["rust", "corrosion"],
    aliases: [
      "염화칼슘",
      "calcium chloride Korea",
      "Korean road salt",
      "winter road treatment",
      "salt damage F-150",
      "셀프세차장",
      "self car wash Korea",
      "Krown undercoating",
      "NH Oil Undercoating",
      "fluid film",
      "fish oil undercoating",
      "방청제",
      "언더코팅",
    ],
    excerpt:
      "Korean roads are sprayed with 염화칼슘 (calcium chloride brine) from late November through early March, with heavy applications before forecast snow events. Calcium chloride is far more corrosive to steel than the rock salt (sodium chloride) used in much of the US — it absorbs atmospheric moisture and stays wet/aggressive on the underbody for days after the road dries. Untreated 12th-gen F-150 frames develop visible flaking at the rear leaf-spring perches and rear crossmember within 2-3 Korean winters; brake lines and fuel lines flash-rust at any spot where the coating chipped. Mitigation: (1) Weekly winter rinse at a 셀프세차장 (self car wash) — high-pressure undercarriage spray, focus on frame seams, leaf spring perches, brake/fuel line clips, transmission crossmember, and inside the wheel wells. Total cost ~₩5,000-8,000 per wash. (2) Annual undercoating treatment applied in October before salt season: Krown (Canadian, popular in Korea), NH Oil Undercoating (Korean shop chain), or traditional fish-oil/Waxoyl applications. Cost: ₩100,000-300,000 ($75-230) at a Korean 정비소 specializing in undercoating; the higher end is for full Krown spray with cavity-wax cab corners and frame rails. (3) DIY supplement between annual treatments: spray cavity wax (Fluid Film aerosol, Krown drip cans) into cab corners, fender wells, frame box-section drain holes, and under the bed bolt-bosses in mid-winter when the original coating starts thinning.",
    inspectionHint:
      "After every salting event, hose off the truck within 48 hours. The first 48 hours is when calcium chloride does the most damage — once it has been there a week, the next week of weather has only incremental effect.",
    safetyNote:
      "Inspect brake lines at every winter wash. Bubbling, flaking, or any rust 'crust' on a steel brake line = stop driving and replace the line. Salt-rusted lines can rupture during a hard stop.",
    sourceCitationKey: "cold-weather-korean-road-salt-detail",
  },

  // ── 15. Mountain pass driving (강원도, 충청북도) ───────────────────
  {
    id: "cold-weather-korean-mountain-pass-driving",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Mountain pass driving (강원도, 충청북도) — engage 4WD before incline, chains, 6R80 downshift",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["drivetrain_4wd", "engine_mechanical", "suspension_steering"],
    issueAreaIds: [],
    partTags: ["transfer_case_area"],
    symptomTags: [],
    aliases: [
      "Korean mountain driving",
      "강원도",
      "충청북도",
      "mountain pass winter",
      "snow pass F-150",
      "한국도로공사",
      "Korea Expressway Corporation",
      "체인 의무",
      "mandatory chains",
      "altitude downshift",
      "6R80 mountain",
    ],
    excerpt:
      "Korean mountain pass driving in winter requires preparation specific to 강원도 (Gangwon-do) and northern 충청북도 (North Chungcheong) where elevations reach 700-1,400m, temperatures run 5-10°C below Seoul, and snowfall can close passes for hours. Key practices: (1) Engage 4WD BEFORE the incline starts, not mid-slope. Engaging the transfer case under load with the rear wheels spinning is hard on the chain inside the case and can throw the IWE actuators out of sync. (2) Check the 한국도로공사 (Korea Expressway Corporation) road status app or roadplus.co.kr before departure; mandatory-chain notices are posted at on-ramps and ignoring them risks a fine plus a forced turn-around. (3) Carry textile/rubber 이지체인 (easy chains) sized for your tires — store in the cab, not the bed, because the bed will be wet/frozen when you need them. (4) Mountain pre-trip checklist: top off washer fluid (mountain spray off salted roads burns through a tank fast); check tire pressure (cold weather drops pressure ~1 PSI per 5°C drop — a 35 PSI Seoul setup runs 31-32 PSI at the top of a 1,200m pass and at -20°C); confirm 4WD function (see `cold-weather-4wd-pre-winter-test`); make sure the truck has at least half a tank of fuel; pack the emergency kit (see `cold-weather-emergency-kit`). (5) Engine and transmission behavior at altitude: the 6R80 automatic will downshift earlier on its own to maintain torque (this is normal and good — let it). The 3.5L EcoBoost loses less power than the NA engines at altitude because the turbos compensate; the 5.4L 3V and 5.0L Coyote feel noticeably softer above 1,000m. Plan for 20-30% slower acceleration.",
    inspectionHint:
      "If the 4x4 light flashes when you engage 4H on a mountain road, do NOT continue up the pass. Pull over, return to 2H, diagnose the IWE system before re-engaging.",
    safetyNote:
      "Do not engage or disengage 4WD on a hill with the rear wheels actively spinning. Come to a near-stop on the shoulder before shifting transfer case modes.",
    sourceCitationKey: "cold-weather-korean-mountain-pass-driving",
  },

  // ── 16. Pre-winter checklist (Sep-Nov) ────────────────────────────
  {
    id: "cold-weather-pre-winter-checklist",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Pre-winter checklist — October-November 10-point service",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: [
      "battery_ground",
      "suspension_steering",
      "cabin_controls",
      "cooling",
      "lighting",
      "underbody",
      "accessory_drive",
    ],
    issueAreaIds: [
      "battery_charge_and_ground_path",
      "underbody_frame_corrosion",
      "accessory_drive_belt_path",
    ],
    partTags: [
      "battery",
      "belt",
      "tensioner",
      "headlight_housing",
      "frame_section",
    ],
    symptomTags: ["chirp", "squeal", "dead_battery"],
    aliases: [
      "winterization checklist",
      "pre-winter service",
      "겨울 준비 점검",
      "11월 점검",
      "fall service F-150",
      "October checklist",
      "November checklist",
      "winter prep 10 steps",
    ],
    excerpt:
      "Recommended pre-winter checklist for Korean F-150 ownership, completed during October-November before the first salting event: (1) Battery test — load test under cranking simulation, replace if below 80% of rated CCA or older than 4 years (see `cold-weather-battery-korea-brands-test`). (2) Switch to winter tires when daytime highs consistently drop below 5°C / 40°F (see `cold-weather-tires-korea-studs-chains`). (3) Top off washer fluid with winter-rated formula (-25°C or -40°C, see `cold-weather-washer-fluid-winter`). (4) Pack the emergency kit — blanket, jumper cables, sand or kitty litter for traction, food and water, phone charger, flashlight, reflective triangles, small shovel (see `cold-weather-emergency-kit`). (5) Inspect wiper blades — replace if streaking, smearing, or showing torn rubber edges; Bosch ICON or Motorcraft beam-style wipers are best for winter. (6) Check headlight aim and clean lenses — Korean inspections are strict on aim, and the salt haze coats lenses fast. (7) Verify heater, defrost, and rear window defroster all work — test heat output at idle, both vents and floor, and watch the rear defrost grid heat up. (8) Check belts for cracks, glazing, and rib wear — cold temperatures make a marginal belt fail (see shared belt schedule in `multi-engine-brakes-belts-schedule`). (9) Add fuel system stabilizer if storing the truck longer than 30 days; otherwise top off the tank above half-full to limit condensation. (10) Detail-clean undercarriage with high-pressure water, then book or DIY an undercoating treatment before the first salt application (see `cold-weather-korean-road-salt-detail`).",
    inspectionHint:
      "Doing this checklist in October is normal-cost maintenance. Doing it in mid-December after a no-start is double the cost and you are stranded.",
    sourceCitationKey: "cold-weather-pre-winter-checklist",
  },

  // ── 17. Starting in extreme cold ──────────────────────────────────
  {
    id: "cold-weather-extreme-cold-start-procedure",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Extreme cold start — -10°C to -20°C+ procedure, no-start troubleshooting",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical", "battery_ground"],
    issueAreaIds: ["battery_charge_and_ground_path"],
    partTags: ["battery", "spark_plug", "coil"],
    symptomTags: ["dead_battery", "rough_idle", "misfire"],
    aliases: [
      "extreme cold start",
      "-20 cold start",
      "F-150 won't start cold",
      "cold start procedure",
      "한랭 시동",
      "겨울 시동",
      "winter no start",
      "jump start cold",
      "오일 점도 시동",
    ],
    excerpt:
      "Cold-start procedure by temperature band: (1) -10°C to -20°C — most flooded batteries struggle even when healthy. Block heater plugged in 2-3 hours before start helps a lot (see `cold-weather-block-heater-use-case`). Pump the accelerator zero times (this is a fuel-injected engine, not a carbureted 1980s truck). Turn the key to RUN for 3-5 seconds to let the fuel pump prime, then crank. If it does not catch in 3-5 seconds, wait 30 seconds and try again. (2) Below -20°C — full-synthetic oil is mandatory (see `cold-weather-oil-weight`), block heater is highly recommended, and an AGM battery upgrade pays for itself (see `cold-weather-battery-agm-upgrade`). If overnight temperatures regularly dip below -20°C, plug the heater into a timer overnight cycling 30 min on / 30 min off, or just leave it on continuously for the last 4 hours before departure. (3) Glow-plug-equipped diesel pre-warm — N/A; the F-150 is gas-only across the 12th-gen lineup. No-start troubleshooting in order: (a) Listen — slow lazy crank = battery weak, get a jump or charge it; fast crank but no catch = fuel or ignition issue not temperature. (b) If slow crank but battery jump-starts successfully, charge the battery overnight on a 2-amp trickle charger and re-test in the morning. (c) If still no start after a jump, suspect thick oil — confirm the dipstick oil viscosity (5W-20 or 0W-20 only — if someone put 5W-30 or 10W-40 in for 'winter weight' that is the problem, drain and refill). (d) If oil viscosity is correct, suspect ignition (cracked coil from cold, fouled plug); pull a plug and inspect. (e) After repeated cold-crank no-starts, give the starter motor 10+ minutes to cool before trying again — cranking heats the starter windings and continued cranking will burn out the motor.",
    inspectionHint:
      "An F-150 that cranks fine at 0°C but cranks slowly at -15°C with the same battery is telling you the oil is too thick for the temperature. Switch from 5W-20 to 0W-20 synthetic at the next change.",
    safetyNote:
      "Do not crank the starter for more than 10 seconds at a time. Wait at least 30 seconds between attempts to let the starter motor cool, or you will fry the starter.",
    sourceCitationKey: "cold-weather-extreme-cold-start-procedure",
  },

  // ── 18. Emergency kit for Korean winter ───────────────────────────
  {
    id: "cold-weather-emergency-kit",
    sourceType: "repair_note",
    sourceLabel: "Cold-Weather Prep Guide",
    title: "Korean winter emergency kit — 강원도 mountain breakdown supplies",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["battery_ground", "drivetrain_4wd"],
    issueAreaIds: [],
    partTags: ["battery"],
    symptomTags: ["dead_battery"],
    aliases: [
      "winter emergency kit",
      "Korean winter kit",
      "겨울 비상 키트",
      "강원도 비상용품",
      "jumper cables",
      "tow strap",
      "snow chains",
      "kitty litter traction",
      "비상 삼각대",
      "snow shovel",
      "reflective triangle",
    ],
    excerpt:
      "Emergency kit for an F-150 spending Korean winter in or near mountains (강원도, 충청북도). Store in the back seat or behind the rear seat — NOT in the bed, where contents freeze solid or get soaked by snow. Required items: (1) Jumper cables — heavy-gauge (4 AWG or thicker), at least 4m / 12 feet long, with insulated clamps. The cheap 8 AWG cables sold at Korean gas stations do not move enough current to start an F-150 at -15°C. (2) Tow strap — 20,000+ lb rated, 6m / 20 feet, with proper recovery loops (not hooks). Korean roadside assistance is slow in remote mountain areas; a tow strap lets a friendly driver pull you out of a ditch in 10 minutes. (3) Snow chains — sized for your winter tires, ideally the textile/rubber 이지체인 type for the front wheels at minimum (see `cold-weather-tires-korea-studs-chains`). (4) Sand or kitty litter (cat sand, 고양이 모래) — 5-10 kg in a sealable bag, for putting under spinning tires for traction on ice. Cheaper and lighter than carrying sand. (5) Warm wool or thermal blanket — survival is the goal if stuck overnight in -20°C cold with no heat. (6) Snacks and water — at least 2 liters of water (stored where it will not freeze and burst the bottle, or in metal canteens) and 24 hours of high-calorie food (energy bars, nuts). (7) Phone charger — USB-C and Lightning cables, plus a 10,000+ mAh power bank kept charged. The truck's 12V outlets only work with the engine running. (8) Flashlight or headlamp — LED, with fresh batteries, headlamp is preferable because it leaves both hands free for repairs. (9) Reflective triangles (삼각대) — Korean law requires these for highway breakdown; place 100m behind the truck on highways, 50m on regular roads. (10) Small shovel — folding military-style shovel fits behind the rear seat, used for digging out wheels or clearing snow from in front of the truck.",
    inspectionHint:
      "Check the kit in October every year. Snacks expire, batteries die, blankets get borrowed and not returned. A kit that is 80% missing is not a kit.",
    safetyNote:
      "If stuck in extreme cold and waiting for help, run the engine for 10 minutes per hour to keep the heater going, but ONLY if the exhaust tailpipe is clear of snow. A snow-blocked exhaust causes CO poisoning within minutes.",
    sourceCitationKey: "cold-weather-emergency-kit",
  },
];
