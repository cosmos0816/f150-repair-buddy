import { SVT_RAPTOR_GEN1_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const SVT_RAPTOR_GEN1_REFERENCES: TruckReferenceRecord[] = [
  // ═══════════════════════════════════════════════════════════════════════
  //  Production Overview & Powertrain (1-4)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 1. Production overview ───────────────────────────────────────────
  {
    id: "svt-raptor-gen1-overview-production",
    sourceType: "repair_note",
    sourceLabel: "Production Overview — Gen 1 SVT Raptor",
    title: "Gen 1 SVT Raptor production — 2010-2014, Dearborn Truck Plant, ~33,000 built",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "SVT Raptor production",
      "Gen 1 Raptor years",
      "Raptor history",
      "Raptor build numbers",
      "Dearborn Raptor",
      "1세대 랩터",
      "랩터 생산",
    ],
    excerpt:
      "The Ford SVT Raptor (Gen 1) launched mid-2010 from the Dearborn Truck Plant on the 12th-generation F-150 platform. Initial 2010 production used the 5.4L 3V Triton V8 paired with the 4R75E 4-speed automatic — only about 1,950 of these 5.4L Raptors were built before mid-year, making them the rarest variant. Mid-2010 introduced the 6.2L Boss V8 as an option, and from 2011 onward the 6.2L paired with the 6R80 6-speed became the only Raptor powertrain. Total Gen 1 production across all five years was approximately 33,000 units. Cab configurations: 2010-2011 SuperCab only, 2011 added SuperCrew, 2012-2014 both available. All Gen 1 Raptors used the 5.5 ft bed. Final-year 2014 introduced the Special Edition appearance package and the SuperCrew became more available.",
    inspectionHint:
      "Check the door jamb sticker for build date and engine code. The 5.4L Triton Raptor is the rarest configuration (1,950 units, all 2010 SuperCab) and commands collector premium despite being mechanically inferior to the 6.2L.",
    supportingCounts: {
      forumThreads: 200,
    },
    sourceCitationKey: "svt-raptor-gen1-overview-production",
  },

  // ── 2. 5.4L Triton engine (early 2010 only) ──────────────────────────
  {
    id: "svt-raptor-gen1-engine-54-triton",
    sourceType: "repair_note",
    sourceLabel: "Engine Specification — Gen 1 SVT Raptor",
    title: "5.4L 3V Triton V8 in Gen 1 Raptor — 310 hp, only early 2010 production",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["engine_mechanical", "timing_valvetrain"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["cam_phaser_area", "spark_plug"],
    symptomTags: ["ticking", "rattle", "misfire"],
    aliases: [
      "5.4 Triton Raptor",
      "5.4L 3V Raptor",
      "early 2010 Raptor engine",
      "Triton Raptor",
      "Raptor 5.4",
      "5.4 트라이튼",
      "초기 랩터 엔진",
    ],
    excerpt:
      "Only the early-2010 SVT Raptor production used the 5.4L 3-valve Triton V8 (310 hp at 5,000 rpm, 365 lb-ft at 3,500 rpm). Paired with the 4R75E 4-speed automatic, this powertrain felt undergeared and underpowered for the Raptor's 6,000+ lb curb weight and aggressive 4.10 axle ratio. The 5.4L Triton inherits all the well-known 3V issues: cam phaser rattle on cold start, two-piece spark plug ejection or seizure, VCT solenoid carbon clogging, and timing chain stretch around 100K miles. Recommended plug change interval is 60-80K miles (NOT the factory 100K — the seizure risk grows with mileage). The 4R75E pairing is rare and parts are getting scarce. Most 5.4L Raptors have either been engine-swapped to the 6.2L (expensive, requires PCM/wiring/exhaust changes) or are kept as collector pieces with limited driving.",
    inspectionHint:
      "Confirm engine via the 8th VIN digit (5 = 5.4L 3V). Listen for cam phaser rattle in the first 5-10 seconds of cold start. Pull a spark plug at any inspection — if originals, plan to replace soon before they seize in the head.",
    safetyNote:
      "Do NOT attempt spark plug removal on a hot engine on the 5.4L 3V. The two-piece plug design seizes and snaps off in the head when hot. Cold engine only, soak with PB Blaster, use the OTC 6918 broken plug extractor kit if any snap.",
    supportingCounts: {
      forumThreads: 100,
      tsbs: 3,
    },
    sourceCitationKey: "svt-raptor-gen1-engine-54-triton",
  },

  // ── 3. 6.2L Boss V8 engine ───────────────────────────────────────────
  {
    id: "svt-raptor-gen1-engine-62-boss",
    sourceType: "repair_note",
    sourceLabel: "Engine Specification — Gen 1 SVT Raptor",
    title: "6.2L Boss V8 — 411 hp, mid-2010 onward, paired with 6R80",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["engine_mechanical", "timing_valvetrain"],
    issueAreaIds: [],
    partTags: ["spark_plug", "exhaust_manifold"],
    symptomTags: ["misfire", "exhaust_tick"],
    aliases: [
      "6.2 Boss",
      "Boss V8",
      "6.2L Raptor engine",
      "Raptor 6.2",
      "Boss 6.2",
      "6.2 엔진",
      "보스 V8",
    ],
    excerpt:
      "The 6.2L Boss V8 (engine code 'V' in VIN position 8) was introduced as a mid-2010 option and became standard 2011-2014. Output: 411 hp at 5,500 rpm, 434 lb-ft at 4,500 rpm. The Boss is a 90-degree iron-block / aluminum-head 16-valve SOHC design — naturally aspirated, no direct injection, no twin turbos. This simplicity is a major reliability advantage: no DI carbon buildup, no turbo failure mode, no intercooler condensation, no high-pressure fuel pump issues. The Boss pairs with the 6R80 6-speed automatic (same family as the one used behind the 3.5L EcoBoost). Two spark plugs per cylinder (16 total) — Motorcraft SP-526 platinum. Plug change interval is 100K miles. Capacity: 7.0 qt with FL-2017 oil filter, 5W-20 (early production) or 5W-30 (later spec). The Boss is one of the most reliable Ford V8s of its era when properly maintained.",
    inspectionHint:
      "VIN 8th digit 'V' = 6.2L Boss. Verify oil filter is FL-2017 (not the F-150 5.4L FL-820S — these are different filters). At spark plug change, expect 16 plugs and double the labor time.",
    supportingCounts: {
      forumThreads: 250,
    },
    sourceCitationKey: "svt-raptor-gen1-engine-62-boss",
  },

  // ── 4. Transmission specs (4R75E vs 6R80) ────────────────────────────
  {
    id: "svt-raptor-gen1-transmission-specs",
    sourceType: "repair_note",
    sourceLabel: "Transmission Specification — Gen 1 SVT Raptor",
    title: "Transmissions — 4R75E (early 2010 only) and 6R80 (2010.5-2014)",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["engine_mechanical", "drivetrain_4wd"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "4R75E Raptor",
      "6R80 Raptor",
      "Raptor transmission",
      "Mercon LV Raptor",
      "1-2 shift flare",
      "Raptor 미션",
      "변속기 오일",
    ],
    excerpt:
      "Early 2010 5.4L Raptors used the 4R75E 4-speed automatic — adequate but undergeared, with limited aftermarket support and parts becoming scarce. From mid-2010 onward (all 6.2L production), the 6R80 6-speed automatic was used. The 6R80 is a robust, well-proven unit that shares architecture with the ZF 6HP. Fluid spec: Motorcraft Mercon LV (NOT Mercon ULV — that's for the 10R80). Capacity: ~13 qt total, drain-and-fill yields ~5-6 qt. Recommended service interval: 30K miles for severe duty (off-road, towing, hot climates), 60K for normal use. Known issue: 1-2 shift flare on 6R80 — addressed by TSB 12-9-15 with a valve body solenoid update and PCM reflash. Many trucks benefit dramatically from a proper Mercon LV change with correct fill level. The transmission cooler line fittings can weep slowly — common at 80K+ miles.",
    inspectionHint:
      "Check transmission fluid at operating temperature using the dipstick (yes, the 6R80 has one — unlike the 10R80). Fluid should be bright red, no burnt smell. A 1-2 shift flare or harsh 1-2 engagement = candidate for TSB 12-9-15 reflash.",
    sourceCitationKey: "svt-raptor-gen1-transmission-specs",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Suspension & Chassis (5-7)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 5. Fox 2.5 internal bypass shocks ────────────────────────────────
  {
    id: "svt-raptor-gen1-suspension-fox-shocks",
    sourceType: "repair_note",
    sourceLabel: "Suspension — Gen 1 SVT Raptor",
    title: "Fox Racing 2.5\" internal-bypass shocks — 11.2\" front / 12.1\" rear travel",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: ["front_suspension_joint_play"],
    partTags: ["control_arm", "ball_joint"],
    symptomTags: ["clunk", "vibration", "leak"],
    aliases: [
      "Fox 2.5 shocks",
      "Fox internal bypass",
      "Raptor shocks",
      "Fox Racing Shox",
      "Gen 1 Raptor suspension",
      "폭스 쇼바",
      "랩터 서스펜션",
    ],
    excerpt:
      "The Gen 1 SVT Raptor uses Fox Racing 2.5-inch internal bypass shocks at all four corners — purely hydraulic, no electronic control (unlike the Gen 2 Live Valve). Front travel: 11.2 inches. Rear travel: 12.1 inches. These are serviceable performance shocks, not disposable. Service intervals: every 50K miles for 100% street use; every 10K miles for mixed use; every 1-2K miles for hard off-road/desert running. Rebuild cost: $150-300 per shock at a Fox-authorized rebuilder (no factory rebuild service exists in Korea — shocks must be shipped to the US, UAE, or Australia). Replacement Fox 2.5 IBP coilover (front) runs $800-1,200; rear body shock similar. Symptoms of worn shocks: wallowing on highway, easy bottoming on moderate bumps, oil weeping past the shaft wiper seal, declining damping force. The Raptor uses unique tubular upper control arms (cast aluminum LCAs, tubular UCAs) — these are NOT interchangeable with stock F-150 arms due to the wider 7\" track.",
    inspectionHint:
      "Bounce test each corner — truck should settle within 1-1.5 bounces. Look for oil weep at the shaft wiper seal. Check service records for last rebuild. Verify the shocks are factory Fox (some Korea-imported trucks may have aftermarket replacements).",
    safetyNote:
      "Worn-out shocks let suspension bottom against the frame on big hits. This can crack the frame at the shock tower mount — a structural repair that often totals the truck.",
    supportingCounts: {
      forumThreads: 300,
    },
    sourceCitationKey: "svt-raptor-gen1-suspension-fox-shocks",
  },

  // ── 6. Wider track, body, and skid plates ────────────────────────────
  {
    id: "svt-raptor-gen1-body-wider-track",
    sourceType: "repair_note",
    sourceLabel: "Body Specification — Gen 1 SVT Raptor",
    title: "Wider front track (+7\"), unique fenders, skid plates, 'FORD' grille",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["body", "underbody"],
    issueAreaIds: ["wheel_well_underbody_rust", "underbody_frame_corrosion"],
    partTags: ["wheel_well_lip", "frame_section"],
    symptomTags: ["rust", "corrosion"],
    aliases: [
      "Raptor wider fenders",
      "Raptor body",
      "FORD grille",
      "Raptor skid plates",
      "Raptor fender flares",
      "랩터 펜더",
      "랩터 그릴",
    ],
    excerpt:
      "The Gen 1 Raptor's front track is approximately 7 inches wider than a standard 12th-gen F-150 — total overall vehicle width ~86.3 inches. This required unique stamped wide fenders (NOT bolt-on flares like aftermarket clones), unique knuckles, unique CV axles, and unique brakes. The front grille uses prominent black 'FORD' lettering with three amber LED clearance lamps and no blue oval badge — this signature design was copied to all subsequent Raptors (Gen 2, Gen 3) and to the Bronco Raptor. Standard skid plates protect the front diff, transfer case, and fuel tank. The front bash plate, transfer case, and fuel tank skids are STEEL (not aluminum like later Raptors) — they take impact well but are prone to road-salt rust scarring, especially in Korea winters with brine treatment on highways. Replacement OEM steel skid plates run $200-600 each at Ford. Integrated bumper fog lights and tow hooks are factory; the bumpers themselves are unique Raptor parts ($1,200-2,000 OEM replacement).",
    inspectionHint:
      "Inspect underside skid plates for impact dents, road-salt rust, and missing bolts. Tap to confirm steel (rings) vs aluminum aftermarket (dull thud). Check fender liners — virtually all off-road Raptors have damaged plastic liners. Verify the wide front fenders are factory stamped (one piece with the body line) and not aftermarket bolt-on flares.",
    sourceCitationKey: "svt-raptor-gen1-body-wider-track",
  },

  // ── 7. BFGoodrich KO tires and beadlock-capable wheels ───────────────
  {
    id: "svt-raptor-gen1-wheels-tires",
    sourceType: "repair_note",
    sourceLabel: "Wheel/Tire Specification — Gen 1 SVT Raptor",
    title: "Wheels and tires — 17x8.5\" cast/forged, BFG KO 315/70R17 (35\")",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["vibration"],
    aliases: [
      "Raptor 17 inch wheels",
      "BFG KO 315",
      "315/70R17",
      "Raptor beadlock",
      "Raptor tire size",
      "35인치 타이어",
      "BFG All-Terrain",
    ],
    excerpt:
      "Factory wheel: 17x8.5 inch, cast aluminum (2010-2012 base) or forged aluminum (2013-2014 / SE package). Beadlock-capable forged wheels became optional from 2013 (true beadlock inner ring sold as a Ford Racing accessory, M-1007-DC1785-style, around $500-700 per wheel). Lug nut torque: 150 lb-ft, 14mm x 1.5 thread. Factory tire: BFGoodrich All-Terrain T/A KO (original K/O, NOT KO2 — KO2 only appears on very late 2014 production) in 315/70R17, equivalent to about 35x12.5R17. Tire pressure: 35 PSI front, 35 PSI rear cold (street); the door sticker may show 44 PSI as max — that is NOT the recommended pressure. Off-road pressures: 18-22 PSI for sand and slow rocks, 25-28 PSI for trails. Replacement options in the same 315/70R17 size: BFG KO2/KO3, Goodyear Wrangler Duratrac, General Grabber X3, Toyo Open Country A/T III. Korea availability is limited — most shops do not stock 315/70R17 and special-order from Japan or US.",
    inspectionHint:
      "Check inner edge tire wear — Raptors are prone to inner-edge feathering by 25-50K miles from the aggressive caster setting. If beadlock-capable wheels are present, re-torque the beadlock ring bolts to 22 lb-ft after every off-road session.",
    sourceCitationKey: "svt-raptor-gen1-wheels-tires",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Drivetrain & Off-Road (8-9)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 8. Electronic locking rear diff and off-road mode ────────────────
  {
    id: "svt-raptor-gen1-drivetrain-elocker-offroad",
    sourceType: "repair_note",
    sourceLabel: "Drivetrain — Gen 1 SVT Raptor",
    title: "Electronic locking rear diff (4.10), Hill Descent Control, Off-Road Mode",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: ["drivetrain_leak_or_boot"],
    partTags: ["differential_cover", "transfer_case_area", "driveshaft_u_joint"],
    symptomTags: ["leak", "clunk"],
    aliases: [
      "e-locker",
      "electronic locking diff",
      "Hill Descent Control",
      "Off-Road Mode",
      "Raptor 4.10",
      "전자식 락커",
      "오프로드 모드",
    ],
    excerpt:
      "Standard equipment across all Gen 1 Raptors: electronic locking rear differential (Ford e-locker, 4.10 axle ratio, 9.75-inch rear ring gear), Hill Descent Control (HDC), and a dedicated Off-Road Mode that retunes throttle, traction control, and shift logic. The off-road mode also activates an IPC (Instrument Panel Cluster) display showing real-time pitch, roll, yaw, and G-forces. The 2010-2011 trucks use an open front differential; 2012-2014 added a Torsen T-2R front limited-slip — a meaningful upgrade for desert running. Front diff fluid: 75W-140 synthetic gear oil. Rear diff fluid: 75W-140 + friction modifier (required for the e-locker — running without modifier causes shudder and shortens locker life). Diff fluid change interval: 50K street, 25K off-road or after any water crossing where water reached axle height. Rear axle pinion seal leaks are a known recurring issue — addressed by a Ford TSB covering the 9.75 axle. Symptom: gear oil weeping at the pinion area behind the driveshaft yoke.",
    inspectionHint:
      "Test the e-locker on dirt: engage in a tight circle, both rear tires should drive (chirp). Pull both diff fill plugs annually — check for metallic sheen (gear wear) or milky appearance (water intrusion). Inspect rear pinion seal for fresh weeping. Confirm Torsen front diff (2012-2014) by gentle parking-lot whine under load — a light whine is normal Torsen behavior.",
    safetyNote:
      "After any water crossing where water reached axle height, change BOTH diff fluids within a week. Water in the diff destroys ring/pinion bearings and seals rapidly.",
    sourceCitationKey: "svt-raptor-gen1-drivetrain-elocker-offroad",
  },

  // ── 9. Front diff change 2012 — Torsen T-2R ─────────────────────────
  {
    id: "svt-raptor-gen1-front-diff-torsen",
    sourceType: "repair_note",
    sourceLabel: "Drivetrain — Gen 1 SVT Raptor",
    title: "Front differential change — open (2010-2011) to Torsen T-2R (2012-2014)",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: ["drivetrain_leak_or_boot"],
    partTags: ["differential_cover", "cv_axle_boot"],
    symptomTags: ["leak", "vibration"],
    aliases: [
      "Torsen front diff",
      "Raptor LSD",
      "2012 Raptor front diff",
      "Torsen T-2R",
      "front diff whine",
      "토르센 디프",
      "전륜 디프렌셜",
    ],
    excerpt:
      "A meaningful mid-cycle change: 2010-2011 Raptors used an open front differential. From the 2012 model year onward, Ford added the Torsen T-2R helical-gear limited-slip front diff — a significant upgrade for traction in soft sand and on uneven terrain. The Torsen is a purely mechanical, gear-driven LSD (no electronics, no clutches), but it produces a characteristic light gear whine during low-speed tight turns under load (parking lots, U-turns). This whine is NORMAL — it is the helical gears meshing and is NOT a failure. Abnormal Torsen symptoms: grinding under straight-line driving, metallic clunking, or metal shavings in diff fluid (these indicate failure). Use only Ford-spec 75W-140 synthetic gear oil — wrong viscosity dramatically increases noise and accelerates wear. If buying a used Raptor, the 2012+ Torsen front diff is a strong reason to prefer it over the 2010-2011 open-front trucks for actual off-road use.",
    inspectionHint:
      "On a 2012-2014 truck, do slow tight circles in a parking lot under light throttle — a soft whine is normal Torsen behavior, NOT a defect. Pull the front diff fill plug to check fluid condition (clean amber = good, dark with metallic sheen = pull cover and inspect ring/pinion).",
    sourceCitationKey: "svt-raptor-gen1-front-diff-torsen",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Known Issues (10-14)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 10. 6.2L valve spring failure (recall 14V-014) ───────────────────
  {
    id: "svt-raptor-gen1-known-issue-valve-spring",
    sourceType: "recall",
    sourceLabel: "NHTSA Recall 14V-014 — Gen 1 SVT Raptor",
    title: "6.2L Boss valve spring fracture — NHTSA recall 14V-014",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["engine_mechanical", "timing_valvetrain"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["misfire", "rough_idle", "ticking"],
    aliases: [
      "valve spring recall",
      "14V-014",
      "6.2 valve spring",
      "Boss V8 valve spring",
      "dropped valve",
      "밸브 스프링 리콜",
    ],
    excerpt:
      "NHTSA recall 14V-014 (Ford recall 14S01) addresses a bad batch of valve springs in 6.2L Boss V8 engines built within specific date ranges (primarily 2010-2013 production). The springs can fracture without warning, causing sudden misfire, knocking, and in severe cases a dropped valve that destroys the engine. Symptoms: sudden onset misfire on one or two cylinders, harsh ticking from the affected cylinder head, knocking under load. The recall provides free spring replacement at any Ford dealer — VIN-specific. Many trucks were missed because owners did not respond to the original recall notice; verify completion through Ford's VIN lookup tool. Out-of-recall repair (if dropped valve already occurred): full engine replacement at $8,000-15,000+. The aftermarket Livernois valve spring upgrade kit (~$800 parts + labor) is a common preventive measure once out of recall coverage.",
    inspectionHint:
      "Run the VIN through Ford's recall lookup tool (https://www.ford.com/support/recalls/) and verify 14S01 / 14V-014 completion. If status is 'incomplete,' schedule the free dealer service immediately. Listen for any new misfire codes or unusual ticking from either head.",
    safetyNote:
      "A dropped valve can occur without warning at any RPM. Do NOT delay if the recall is incomplete on a truck you plan to drive — the failure mode can destroy the engine catastrophically.",
    supportingCounts: {
      nhtsaComplaints: 200,
      tsbs: 1,
    },
    sourceCitationKey: "svt-raptor-gen1-known-issue-valve-spring",
    sourceUrl: "https://www.nhtsa.gov/recalls?nhtsaId=14V014000",
  },

  // ── 11. 6.2L exhaust manifold cracks (TSB 13-1-14) ──────────────────
  {
    id: "svt-raptor-gen1-known-issue-exhaust-manifold",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 13-1-14 — Gen 1 SVT Raptor",
    title: "6.2L exhaust manifold cracking — TSB 13-1-14",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["exhaust_emissions", "engine_mechanical"],
    issueAreaIds: ["exhaust_manifold_tick"],
    partTags: ["exhaust_manifold"],
    symptomTags: ["exhaust_tick", "ticking", "hiss"],
    aliases: [
      "exhaust manifold crack",
      "TSB 13-1-14",
      "Raptor exhaust tick",
      "6.2 manifold",
      "exhaust leak Raptor",
      "익조스트 매니폴드",
      "배기 매니폴드 크랙",
    ],
    excerpt:
      "TSB 13-1-14 addresses cracking of the cast iron exhaust manifolds on the 6.2L Boss V8. Symptoms start as a faint exhaust tick at cold start that fades as the manifold warms and the crack closes — classic 'cold tick' that disappears after 2-3 minutes. As the crack grows, the tick becomes louder, persists at operating temperature, and may eventually be heard from underneath as a small exhaust leak. The crack typically forms at the runner-to-collector junction on the passenger side first (drivers more often on Korea-imported LHD trucks running hot under load). OEM replacement manifolds run $400-700 per side plus labor (4-6 hours). Aftermarket headers (American Racing Headers, Stainless Works, JBA) are a popular upgrade — typically $1,200-2,500 per pair and dramatically less crack-prone, but require an exhaust system change. Replacement studs and gaskets ($30-50 in parts) should always be done with manifold service — the old studs are usually rusted and snap during removal.",
    inspectionHint:
      "Do a cold-start listen at the rear of each manifold (passenger side first) for a 'tick-tick-tick' that fades as the engine warms. Use a mechanic's stethoscope on the manifold body to localize. Visual inspect with a flashlight at the runner-to-collector junction for soot streaks indicating a crack.",
    supportingCounts: {
      forumThreads: 150,
      tsbs: 1,
    },
    sourceCitationKey: "svt-raptor-gen1-known-issue-exhaust-manifold",
  },

  // ── 12. 6R80 1-2 shift flare (TSB 12-9-15) ──────────────────────────
  {
    id: "svt-raptor-gen1-known-issue-6r80-shift-flare",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 12-9-15 — Gen 1 SVT Raptor",
    title: "6R80 1-2 shift flare — TSB 12-9-15 reflash + solenoid update",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "6R80 shift flare",
      "1-2 shift flare",
      "TSB 12-9-15",
      "6R80 harsh shift",
      "Raptor transmission TSB",
      "변속 충격",
      "1-2 변속 플레어",
    ],
    excerpt:
      "TSB 12-9-15 addresses a 1-2 shift flare on the 6R80 6-speed automatic — engine RPM briefly rises during the 1-2 upshift before the gear engages, producing a soft 'whoosh-clunk' as the truck catches up. The TSB covers updated PCM/TCM calibration plus, in some cases, a valve body solenoid replacement. The flare is most pronounced under light-to-moderate acceleration from a stop — exactly the condition where the Raptor (with its 4.10 axle and heavy curb weight) demands smooth 1-2 engagement. Many Raptor owners also benefit from a proper Mercon LV fluid change with correct fill level — the 6R80 is sensitive to fill level, and underfilled or contaminated fluid amplifies the flare. Diagnostic approach: confirm latest PCM calibration via FDRS at a Ford dealer, perform Mercon LV drain-and-fill (~5-6 qt), drive 50-100 miles to allow adaptive learn, then re-evaluate. If still flaring, valve body inspection is the next step.",
    inspectionHint:
      "Drive the truck through a series of low-throttle launches from a stop. A 1-2 shift flare presents as a brief RPM rise before the shift completes, often with a softer clunk than a normal shift. Ask the dealer to confirm PCM calibration is at the latest level per TSB 12-9-15.",
    sourceCitationKey: "svt-raptor-gen1-known-issue-6r80-shift-flare",
  },

  // ── 13. Fox shock seal weep ──────────────────────────────────────────
  {
    id: "svt-raptor-gen1-known-issue-shock-seal-weep",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — Gen 1 SVT Raptor",
    title: "Fox 2.5 shock seal weep — rebuildable, common at high mileage",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: ["front_suspension_joint_play"],
    partTags: ["control_arm"],
    symptomTags: ["leak", "clunk"],
    aliases: [
      "Fox shock leak",
      "Fox shaft seal",
      "Raptor shock weep",
      "shock seal",
      "Fox 2.5 rebuild",
      "쇼바 오일 누유",
      "폭스 리빌드",
    ],
    excerpt:
      "Fox 2.5 internal-bypass shock seal weep is one of the most common Gen 1 Raptor issues, appearing on virtually all high-mileage trucks (100K+ miles) and earlier on trucks with hard off-road use. The shaft wiper seal degrades, allowing shock oil to weep down the shaft and collect on the body. Light film/sheen on the shaft = monitor. Wet drips, oil accumulating on the spring perch, or visible film below the boot = rebuild required. The fix is a Fox rebuild: drain old oil, replace shaft wiper seal, replace shaft seal head o-rings, refill with correct weight shock oil (typically Fox 5wt for the 2.5 IBP), recharge nitrogen to spec (around 250 psi). Cost: $150-300 per shock at a Fox-authorized rebuilder (King Shocks, Accutune Off-Road, ShockTherapy in the US). Korea: no authorized rebuilders — shocks must be shipped internationally. Run-flat alternative: replace with new Fox 2.5 ($800-1,200/shock) or upgrade to King 2.5 or Icon 2.5 (similar price, sometimes preferred for tunability).",
    inspectionHint:
      "Wipe the shock shaft clean with a rag, then drive 20-30 miles and re-inspect. A faint film returning = monitor and plan service. Wet drips returning = service now. Photograph the shock body to document for warranty/rebuild claim.",
    sourceCitationKey: "svt-raptor-gen1-known-issue-shock-seal-weep",
  },

  // ── 14. Front skid plate rust ────────────────────────────────────────
  {
    id: "svt-raptor-gen1-known-issue-skid-plate-rust",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — Gen 1 SVT Raptor",
    title: "Front steel skid plates — road-salt rust scarring",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["underbody", "body"],
    issueAreaIds: ["underbody_frame_corrosion", "wheel_well_underbody_rust"],
    partTags: ["frame_section"],
    symptomTags: ["rust", "corrosion"],
    aliases: [
      "skid plate rust",
      "Raptor underbody rust",
      "skid plate corrosion",
      "front bash plate rust",
      "frame rust Raptor",
      "스키드 플레이트 녹",
      "하체 부식",
    ],
    excerpt:
      "Gen 1 Raptor uses STEEL front skid plates (front bash plate, engine skid, transfer case skid, fuel tank skid) — not the aluminum used on Gen 2 and Gen 3 Raptors. Steel takes off-road impact well but rusts aggressively when exposed to road salt or coastal brine. Korea-imported trucks see heavy winter brine treatment (CaCl2) on highways, which accelerates rust dramatically. Symptoms: surface rust within 1-2 winters, structural scaling and perforation around the 5-8 year mark if not treated. Prevention: annual undercarriage wash after winter, anti-corrosion coating (Krown, Fluid Film, or Woolwax) reapplied annually, anti-seize on all mounting bolts at every service. Replacement: OEM steel skid plates $200-600 each at Ford. Aftermarket aluminum upgrade plates (RPG Offroad, BAMF, ADD) run $300-800 each and are corrosion-immune — strongly recommended for any salt-belt or Korea-driven truck. The mounting bolts seize before the plates fail — replace bolts with stainless or galvanized hardware during any service.",
    inspectionHint:
      "Crawl underneath and tap all four skid plates with a hammer handle. Solid ring = sound. Dull thud or flaking = rust progression. Check bolt heads for rust — if any are seized or rounded, apply PB Blaster and plan a removal/replacement session before they snap off.",
    sourceCitationKey: "svt-raptor-gen1-known-issue-skid-plate-rust",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Maintenance & Fluid Specs (15-16)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 15. Engine oil and filter spec ───────────────────────────────────
  {
    id: "svt-raptor-gen1-spec-engine-oil",
    sourceType: "repair_note",
    sourceLabel: "Fluid Specification — Gen 1 SVT Raptor",
    title: "Engine oil — 5W-30 on 6.2L (FL-2017), 5W-20 on 5.4L (FL-820S), 5K mi OCI",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["leak"],
    aliases: [
      "Raptor oil change",
      "FL-2017",
      "FL-820S",
      "6.2 oil filter",
      "5.4 oil filter",
      "Raptor oil capacity",
      "엔진오일",
      "오일 필터",
    ],
    excerpt:
      "6.2L Boss V8: 5W-20 (early 2010-2011) or 5W-30 (later spec, recommended for hot climates and off-road use), 7.0 US qt with filter. Oil filter: Motorcraft FL-2017 (NOT the FL-820S used on the F-150 5.4L — these filters are different sizes and threads). 5.4L 3V Triton (early 2010 only): 5W-20, 7.0 US qt with filter, Motorcraft FL-820S. Both engines: Ford recommends 10K mile OCI under normal duty, but the Raptor community strongly recommends 5K mile intervals because (a) off-road use is severe duty by definition, (b) the 6.2L runs hot under load and breaks down oil faster, and (c) on the 5.4L the cam phaser system is extremely sensitive to oil quality. Recommended oils: Motorcraft Full Synthetic, Mobil 1, Pennzoil Platinum, Amsoil Signature Series. Always verify oil filter before purchase — many Korea parts shops will hand you a 5.4L F-150 filter (FL-820S) by default. The 6.2L filter (FL-2017) must be specifically requested.",
    inspectionHint:
      "Check the oil filter tap — FL-2017 is taller and larger diameter than FL-820S. On the 6.2L, the filter is on the driver's side of the block, accessed from above through a tight space; on the 5.4L it is on the passenger side, accessed from underneath.",
    safetyNote:
      "Do NOT use 5W-20 in a 6.2L Boss in hot climates or with sustained off-road use. The HO/severe-duty viscosity is 5W-30. Underviscosity oil causes premature cam bearing wear in the Boss V8.",
    sourceCitationKey: "svt-raptor-gen1-spec-engine-oil",
  },

  // ── 16. Spark plug, transmission fluid, and maintenance summary ──────
  {
    id: "svt-raptor-gen1-spec-maintenance-summary",
    sourceType: "repair_note",
    sourceLabel: "Maintenance Specification — Gen 1 SVT Raptor",
    title: "Spark plugs, trans fluid, diff fluid — service intervals and Ford specs",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["engine_mechanical", "drivetrain_4wd"],
    issueAreaIds: [],
    partTags: ["spark_plug", "differential_cover"],
    symptomTags: ["misfire"],
    aliases: [
      "Raptor maintenance schedule",
      "SP-526",
      "Mercon LV",
      "75W-140",
      "Raptor service intervals",
      "Raptor spark plugs",
      "정비 주기",
      "점화 플러그",
    ],
    excerpt:
      "Spark plugs: 6.2L uses Motorcraft SP-526 (platinum, 16 plugs total — two per cylinder), torque 11 lb-ft, change interval 100K miles. 5.4L 3V uses Motorcraft SP-515 or SP-546 (two-piece, 8 total), torque 28 lb-ft, change interval 60-80K miles (NOT 100K — earlier is critical to avoid plug seizure in the head). Transmission fluid: 6R80 uses Motorcraft Mercon LV (XT-10-QLVC), total system ~13 qt, drain-and-fill ~5-6 qt, service interval 30K severe duty / 60K normal. 4R75E (early 2010 only) uses Motorcraft Mercon V. Front differential fluid: 75W-140 synthetic gear oil, ~1.6 qt capacity, 50K mile interval street / 25K off-road. Rear differential fluid: 75W-140 synthetic + Motorcraft friction modifier (REQUIRED for the e-locker), ~2.5 qt capacity, same interval as front. Transfer case fluid: Motorcraft XL-12, ~1.7 qt, 60K mile interval. Coolant: Motorcraft Orange (Gold) Premium Gold antifreeze (Ford VC-7-B spec), 50/50 mix with distilled water.",
    inspectionHint:
      "For the 6.2L spark plug change, budget 3-4 hours labor (16 plugs across both cylinder heads, some access challenges). Use the correct anti-seize on the threads. For diff fluid changes, ALWAYS add friction modifier to the rear — running the e-locker without modifier produces shudder and shortens the locker's life.",
    sourceCitationKey: "svt-raptor-gen1-spec-maintenance-summary",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Special Editions, Mods, and Comparisons (17-20)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 17. 2014 Special Edition and VelociRaptor ────────────────────────
  {
    id: "svt-raptor-gen1-special-editions",
    sourceType: "repair_note",
    sourceLabel: "Special Editions — Gen 1 SVT Raptor",
    title: "2014 Special Edition and Hennessey VelociRaptor — collector configurations",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["body", "engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Raptor Special Edition",
      "2014 Raptor SE",
      "VelociRaptor",
      "Hennessey Raptor",
      "Roush Raptor",
      "랩터 스페셜",
      "벨로시랩터",
    ],
    excerpt:
      "2014 SVT Raptor Special Edition: Limited appearance package — bedside 'Raptor' graphics in metallic, Brick Red / Black two-tone seat bolsters with red contrast stitching, unique forged beadlock-capable wheels (beadlock ring sold as a deletable option/accessory), available only in Tuxedo Black Metallic or Ruby Red Metallic. Mechanically identical to standard 2014 Raptor — the SE designation is appearance-only. Production was limited and most SE trucks command a 15-25% premium over standard 2014 Raptors today. Hennessey VelociRaptor: Aftermarket tuner package (NOT a Ford product) — Hennessey added a 2.9L Whipple supercharger to the 6.2L Boss producing 600-650+ hp (600 Twin Turbo / VR600 variants). Other VelociRaptor packages added long-travel suspension, larger tires, and complete rebuilds. Hennessey provides warranty through their own program. VelociRaptor trucks command 50-100% premiums but require careful service history verification — many have been hard-driven. Roush also offered a supercharger kit (~$8,000) producing similar power to the Whipple. Both are well-documented aftermarket platforms.",
    inspectionHint:
      "For Special Edition: verify the badging, seat color, and wheels are factory — these are easy to fake with aftermarket parts. Check the door sticker for SE production codes. For VelociRaptor: confirm Hennessey VIN plate on the engine bay strut tower and request the original Hennessey build sheet. Supercharger belt condition is critical on either build.",
    sourceCitationKey: "svt-raptor-gen1-special-editions",
  },

  // ── 18. Popular modifications ────────────────────────────────────────
  {
    id: "svt-raptor-gen1-modifications",
    sourceType: "repair_note",
    sourceLabel: "Modifications — Gen 1 SVT Raptor",
    title: "Popular mods — leveling kits, tuners, exhaust, superchargers",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["engine_mechanical", "suspension_steering", "exhaust_emissions"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Raptor mods",
      "Cobb Accessport Raptor",
      "Borla exhaust Raptor",
      "Whipple supercharger",
      "Roush supercharger",
      "BDS leveling kit",
      "랩터 튜닝",
      "랩터 모디",
    ],
    excerpt:
      "Common Gen 1 Raptor modifications and their realistic limits: (1) Leveling kit — adds about 1\" of front lift via BDS or Eibach adapter spacers ($150-350). This is NOT a true lift — height is limited by CV axle plunge angle and the unique long-travel front suspension geometry. More than 1-1.5\" front lift causes CV boot tears and uneven wear. (2) Tuner support — Cobb Accessport (~$700) is the best-supported tuner for the 6.2L Boss, with proven OTS (off-the-shelf) maps for 91/93 octane and E85. SCT BDX is also popular. Power gains: 25-40 hp on a stock 6.2L with 91 octane tune. (3) Exhaust — Borla S-Type cat-back ($900-1,200) is the community favorite for tone (deep, growly, not boomy at cruise). MagnaFlow and Corsa are good alternatives. (4) Supercharger kits — Whipple 2.9L (~$8,000) or Roush ROUSHcharger ($7,000-9,000) bring the 6.2L to 600+ hp. Both require fuel injector upgrades, intercooler service, and supporting mods. (5) Aftermarket UCAs (Camburg, Total Chaos, RPG) — $500-900 per side, add greasable joints and recover off-road durability.",
    inspectionHint:
      "Any truck with a leveling kit beyond 1.5\" needs CV boot inspection at every oil change — torn boots within 5-10K miles are common. Tuner-equipped trucks should have the tune confirmed (revision, octane, dyno sheet if available). Supercharged trucks need belt and intercooler service records.",
    safetyNote:
      "Do NOT install a full lift kit (3\"+) on a Gen 1 Raptor. The factory long-travel geometry breaks beyond ~1.5\" of front lift — CV joints, ball joints, and shock travel limits are all compromised.",
    sourceCitationKey: "svt-raptor-gen1-modifications",
  },

  // ── 19. Korea ownership notes ────────────────────────────────────────
  {
    id: "svt-raptor-gen1-korea-ownership",
    sourceType: "inspection_hint",
    sourceLabel: "Korea Ownership — Gen 1 SVT Raptor",
    title: "Gen 1 Raptor in Korea — rare imports, parts sourcing challenges",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["engine_mechanical", "suspension_steering", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Korea Raptor",
      "Raptor import Korea",
      "Raptor parts Korea",
      "Korean Raptor",
      "한국 랩터",
      "랩터 부품 수입",
      "랩터 한국",
    ],
    excerpt:
      "Gen 1 SVT Raptors were never sold new in Korea — every Gen 1 Raptor in Korea is a private import, typically from the US or sometimes Canada. Total Gen 1 Raptors in Korea are estimated at fewer than 100 units, most owned by enthusiasts, dealers, or US military personnel. Import cost on top of purchase: $5,000-15,000 USD covering shipping, customs duty (~8%), VAT (10%), individual emissions/safety certification, and Korean registration. The 6.2L Boss often requires aftermarket catalytic converters to meet Korean emissions standards — budget $1,500-3,000 for cat replacement. Parts sourcing: Korean Ford dealers do NOT stock Raptor-specific parts (wide fenders, Fox shocks, Torsen front diff, beadlock wheels, e-locker components). Every Raptor-unique part must be imported from the US — typical lead time 2-4 weeks and air shipping doubles cost. Routine parts (oil filter FL-2017, spark plugs SP-526, brake pads, regular F-150 shared components) are available at Korean parts importers like Auto Marche and through online platforms. Fox shock service does not exist in Korea — shocks must ship to US/UAE/Australia for rebuild. Fuel cost: 6.2L averages 10-13 L/100km, making daily driving in Korea expensive at current fuel prices.",
    inspectionHint:
      "When buying a Korea-imported Raptor, verify the emissions certification paperwork (배출가스 검사 합격증) and the import declaration. Check for aftermarket cats that may have failed — common at 60K+ miles on import-converted trucks. Confirm parts source plan before purchase: a Raptor without a US parts pipeline is a garage queen.",
    sourceCitationKey: "svt-raptor-gen1-korea-ownership",
  },

  // ── 20. Gen 1 vs Gen 2 Raptor comparison ─────────────────────────────
  {
    id: "svt-raptor-gen1-vs-gen2-comparison",
    sourceType: "inspection_hint",
    sourceLabel: "Generation Comparison — Raptor",
    title: "Gen 1 vs Gen 2 Raptor — V8 vs twin-turbo V6, hydraulic vs Live Valve",
    vehicleScope: SVT_RAPTOR_GEN1_VEHICLE_ID,
    systemTags: ["engine_mechanical", "suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Gen 1 vs Gen 2 Raptor",
      "Raptor generation comparison",
      "6.2 vs EcoBoost",
      "SVT Raptor vs Gen 2",
      "1세대 vs 2세대 랩터",
      "랩터 세대 비교",
    ],
    excerpt:
      "Powertrain: Gen 1 uses the 6.2L Boss V8 (411 hp / 434 lb-ft, naturally aspirated, simple, no DI, no turbos) paired with the 6R80 6-speed (or 4R75E 4-speed on early 2010 5.4L only). Gen 2 uses the 3.5L EcoBoost HO V6 (450 hp / 510 lb-ft, twin-turbo, port + direct injection) paired with the 10R80 10-speed. The Gen 2 produces more power but inherits EcoBoost-specific issues: cam phaser rattle (CSP 21N03), intercooler condensation, 10R80 harsh shifting (TSB 23-2123), and plastic oil pan cracking (2017-early 2018). Gen 1 has fewer powertrain failure modes once past the valve spring recall (14V-014). Suspension: Gen 1 has hydraulic Fox 2.5 internal-bypass shocks (no electronics) with 11.2\" front / 12.1\" rear travel. Gen 2 uses Fox 3.0 (2017-2018) or Fox 3.0 Live Valve electronic shocks (2019-2020) with 13.0\" front / 13.9\" rear travel. Curb weight: Gen 1 ~6,000-6,210 lb; Gen 2 ~5,700-5,800 lb (Gen 2 is lighter due to aluminum body). MSRP at launch: Gen 1 ~$41-45K (2011 6.2); Gen 2 ~$50-55K (2017). Wheelbase is similar (133-145\" depending on cab). The honest summary: Gen 1 is mechanically simpler, sounds better, and is appreciating as a collector. Gen 2 is faster, more refined, more technologically complex, and more expensive to service.",
    inspectionHint:
      "For buyers comparing both generations: Gen 1 favors long-term simplicity and V8 character. Gen 2 favors outright capability and modern features. Service cost reality check: Gen 2 cam phaser job runs $3-5K out of warranty; Gen 1 6.2L valve spring kit runs $800-1,200. Both are serious trucks — neither is a 'starter' vehicle.",
    sourceCitationKey: "svt-raptor-gen1-vs-gen2-comparison",
  },
];
