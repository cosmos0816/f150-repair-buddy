import { RAPTOR_GEN2_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const RAPTOR_GEN2_REFERENCES: TruckReferenceRecord[] = [
  // ═══════════════════════════════════════════════════════════════════════
  //  Known Issues (1-10)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 1. 10R80 transmission harsh shifting ─────────────────────────────
  {
    id: "raptor-gen2-known-issue-10r80-harsh-shift",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — Gen 2 Raptor",
    title: "10R80 transmission harsh shifting, gear hunting, and clunking",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration", "stumble"],
    aliases: [
      "10R80 harsh shift",
      "10-speed harsh shifting",
      "10R80 clunk",
      "transmission gear hunting",
      "10R80 shudder",
      "trans hard shift",
      "10R80 underfill",
      "변속 충격",
      "10단 변속기",
    ],
    excerpt:
      "The #1 complaint on the Gen 2 Raptor. The 10R80 10-speed automatic exhibits harsh 1-2 and 2-3 shifts, gear hunting on light throttle, and clunking during low-speed maneuvers. A major contributing factor is factory underfill — Ford underfills the 10R80 by 2-3 quarts from the factory. Many owners and techs report dramatically improved shift quality after a proper fluid fill to the correct level. Multiple TSBs have been issued (culminating in TSB 23-2123) with updated adaptive learning procedures and revised clutch apply strategies. A full transmission reflash is the recommended first step.",
    inspectionHint:
      "Check transmission fluid level with a scan tool (no traditional dipstick). Verify adaptive shift strategy is at the latest calibration via FDRS. A proper drain-and-fill to the correct level (use Mercon ULV) often resolves 50-70% of complaints.",
    supportingCounts: {
      forumThreads: 500,
      nhtsaComplaints: 200,
      tsbs: 8,
    },
    sourceCitationKey: "raptor-gen2-known-issue-10r80-harsh-shift",
  },

  // ── 2. Cam phaser rattle ─────────────────────────────────────────────
  {
    id: "raptor-gen2-known-issue-cam-phaser-rattle",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — Gen 2 Raptor",
    title: "Cam phaser rattle on cold start — CSP 21N03 coverage",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["timing_chain_stretch_ecoboost", "cam_phaser_tick_context"],
    partTags: ["cam_phaser_area", "timing_cover"],
    symptomTags: ["rattle", "rough_idle"],
    aliases: [
      "cam phaser rattle",
      "phaser tick",
      "cold start rattle",
      "VCT phaser knock",
      "CSP 21N03",
      "캠 페이저",
      "냉시동 소음",
    ],
    excerpt:
      "The 3.5L EcoBoost HO in the Gen 2 Raptor shares the cam phaser rattle issue with the standard 3.5 EcoBoost. A metallic rattle on cold start lasting 3-10 seconds indicates worn VCT phasers. Ford issued Customer Satisfaction Program 21N03, providing 100% coverage for VCT phaser replacement on vehicles under 70,000 miles. The repair involves replacing both intake and exhaust phasers on both banks, new timing chains, tensioners, and the front cover reseal. Total repair cost if out of warranty: $3,000-5,000 at a dealer.",
    inspectionHint:
      "Listen for metallic rattle within first 10 seconds of a cold start (engine off overnight). Check VIN eligibility for CSP 21N03 at your Ford dealer — this is NOT a recall, so you must request it. Document the rattle with a video for the dealer.",
    safetyNote:
      "Do not ignore persistent cam phaser rattle. Progressive wear can lead to jumped timing and catastrophic engine damage.",
    supportingCounts: {
      nhtsaComplaints: 150,
      tsbs: 3,
    },
    sourceCitationKey: "raptor-gen2-known-issue-cam-phaser-rattle",
  },

  // ── 3. Fox shock service ─────────────────────────────────────────────
  {
    id: "raptor-gen2-known-issue-fox-shock-service",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — Gen 2 Raptor",
    title: "Fox 3.0 shock service intervals — rebuild every 12-15K off-road",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: ["front_suspension_joint_play"],
    partTags: ["control_arm"],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "Fox shock rebuild",
      "Fox 3.0 service",
      "shock rebuild interval",
      "Fox racing shocks",
      "Fox bypass shock",
      "폭스 쇼바",
      "쇼바 리빌드",
    ],
    excerpt:
      "The Fox 3.0 Internal Bypass shocks on the Gen 2 Raptor are serviceable, not disposable. Off-road use demands rebuilds every 12,000-15,000 miles; street-only use extends this to 25,000-30,000 miles. Signs of needed service: reduced damping, bottoming out on moderate bumps, oil weeping from shaft seal, and increased body roll. A full four-corner rebuild costs $750-1,250 at a Fox-authorized service center (Camburg, ADD, SVC Offroad). Neglecting shock service leads to blown seals and $500+/shock replacement cost.",
    inspectionHint:
      "Check for oil weeping at the shock shaft seal. Perform a bounce test — the truck should settle within 1-1.5 bounces. Compare front vs rear damping feel on a bumpy road. Track mileage since last service.",
    sourceCitationKey: "raptor-gen2-known-issue-fox-shock-service",
  },

  // ── 4. Fox Live Valve failure (2019+) ────────────────────────────────
  {
    id: "raptor-gen2-known-issue-live-valve-failure",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — Gen 2 Raptor",
    title: "Fox Live Valve electronic shock failure (2019-2020 Raptors)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["suspension_steering", "electrical"],
    issueAreaIds: ["front_suspension_joint_play"],
    partTags: ["control_arm"],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "Live Valve failure",
      "Live Valve shock",
      "electronic shock failure",
      "Fox Live Valve",
      "Live Valve error",
      "라이브 밸브",
    ],
    excerpt:
      "The 2019-2020 Raptor introduced Fox Live Valve electronically controlled shocks. The electronic solenoid valves and position sensors can fail, causing the shock to default to full-stiff mode or lose damping entirely. Common failure modes include wiring harness damage from off-road debris, solenoid valve sticking, and position sensor drift. Replacement cost is $800-1,200 per shock (parts + labor). The Live Valve ECU can also throw faults that require FDRS to diagnose. Some owners convert to standard Fox 3.0 bypasses to eliminate electronic complexity.",
    inspectionHint:
      "Scan for Live Valve DTCs with FDRS. Check wiring harness routing for chafe points, especially after off-road use. Compare ride quality corner-to-corner — a failed Live Valve shock feels dramatically different from the other three.",
    supportingCounts: {
      forumThreads: 80,
    },
    sourceCitationKey: "raptor-gen2-known-issue-live-valve-failure",
  },

  // ── 5. Front suspension clunk ────────────────────────────────────────
  {
    id: "raptor-gen2-known-issue-front-suspension-clunk",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — Gen 2 Raptor",
    title: "Front suspension clunk — UCA ball joints and sway bar end links",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: ["front_suspension_joint_play"],
    partTags: ["ball_joint", "control_arm"],
    symptomTags: ["clunk", "rattle"],
    aliases: [
      "front end clunk",
      "UCA ball joint",
      "upper control arm clunk",
      "sway bar end link",
      "suspension pop",
      "볼 조인트",
      "어퍼암",
      "스태빌라이저 링크",
    ],
    excerpt:
      "The #1 source of front-end clunking on the Gen 2 Raptor is worn upper control arm (UCA) ball joints. The factory UCAs use a non-greasable ball joint design that wears quickly, especially with off-road use. Onset can be as early as 20,000-30,000 miles. Sway bar end links are the second most common source. Upgrading to aftermarket UCAs with greasable ball joints (Camburg, Total Chaos, RPG Offroad) extends service life significantly. OEM UCA replacement is $400-600/side; aftermarket upgrade UCAs are $500-900/side.",
    inspectionHint:
      "Jack up the front end and check for play in the UCA ball joint by grabbing the wheel at 12 and 6 o'clock and rocking. Any detectable play = replacement. Check sway bar end link boots for tears and end link ball studs for looseness.",
    sourceCitationKey: "raptor-gen2-known-issue-front-suspension-clunk",
  },

  // ── 6. Cab mount bushing noise ───────────────────────────────────────
  {
    id: "raptor-gen2-known-issue-cab-mount-bushing",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — Gen 2 Raptor",
    title: "Cab mount bushing noise — aluminum body squeaking and popping",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: ["frame_section"],
    symptomTags: ["clunk", "rattle"],
    aliases: [
      "cab mount",
      "cab bushing",
      "body mount squeak",
      "cab pop",
      "urethane cab mount",
      "cab creak",
      "캡 마운트",
      "차체 소음",
    ],
    excerpt:
      "A widespread issue across all aluminum-body F-150s, amplified on the Raptor due to increased suspension travel and off-road loads. The factory rubber cab mount bushings compress and degrade, causing squeaking, popping, and creaking noises — especially noticeable when going over speed bumps or during body flex. The fix is replacing the factory rubber bushings with urethane cab mount bushings ($100-200 for a full set). Installation takes 2-4 hours and dramatically reduces body noise.",
    inspectionHint:
      "Listen for squeaks and pops from the cab-to-frame junction area when driving over speed bumps at low speed. Visually inspect cab mount bushings for compression, cracking, or misalignment. Spraying silicone lubricant temporarily quiets the noise, confirming the source.",
    sourceCitationKey: "raptor-gen2-known-issue-cab-mount-bushing",
  },

  // ── 7. Windshield cracking ───────────────────────────────────────────
  {
    id: "raptor-gen2-known-issue-windshield-cracking",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — Gen 2 Raptor",
    title: "Windshield cracking — stress cracks from body flex",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "windshield crack",
      "stress crack",
      "windshield replacement",
      "front glass crack",
      "앞유리 크랙",
      "윈드실드",
    ],
    excerpt:
      "Raptor owners report significantly higher windshield cracking rates than standard F-150s. The combination of aluminum body flex, increased suspension travel, and off-road vibration creates stress points in the windshield. Cracks often originate from the edges without any visible impact point. Replacement cost is $500-1,000+ depending on whether the truck has rain-sensing wipers, lane-keeping cameras, or HUD. Aftermarket windshields are more prone to re-cracking; OEM Ford glass is recommended. Some owners report 3-4 replacements over the life of the truck.",
    inspectionHint:
      "Inspect windshield edges for hairline cracks, especially near the A-pillars and bottom edge. Check for aftermarket vs OEM glass (look for Ford logo etching). Verify camera calibration after any windshield replacement.",
    sourceCitationKey: "raptor-gen2-known-issue-windshield-cracking",
  },

  // ── 8. Intercooler condensation (reduced) ────────────────────────────
  {
    id: "raptor-gen2-known-issue-intercooler-condensation",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — Gen 2 Raptor",
    title: "Intercooler condensation — reduced by PFDI but not eliminated",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["turbo_boost", "intake_vacuum"],
    issueAreaIds: ["intercooler_condensation"],
    partTags: ["intercooler"],
    symptomTags: ["stumble", "misfire"],
    aliases: [
      "CAC stumble",
      "intercooler condensation",
      "charge air cooler condensation",
      "humid climate misfire",
      "인터쿨러 결로",
      "CAC",
    ],
    excerpt:
      "The Gen 2 Raptor's 3.5L HO EcoBoost retains the air-to-air intercooler design susceptible to condensation buildup. However, the addition of Port Fuel Direct Injection (PFDI) on the second-gen 3.5 significantly reduces the severity — port injection helps atomize ingested water rather than causing a hard misfire. The issue is still present in hot/humid climates (Gulf Coast, Southeast Asia, Korea summers) but rarely causes the violent stumble seen on Gen 1 trucks. Ford's revised intercooler design from TSB 14-0130 is less prone but not immune.",
    inspectionHint:
      "If experiencing cold-morning stumbles in humid conditions, remove the lower intercooler boot and check for standing water. A catch-can drain kit on the intercooler low point is the community-preferred preventive fix.",
    sourceCitationKey: "raptor-gen2-known-issue-intercooler-condensation",
  },

  // ── 9. Plastic oil pan leak (2017-early 2018) ────────────────────────
  {
    id: "raptor-gen2-known-issue-plastic-oil-pan",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — Gen 2 Raptor",
    title: "Plastic oil pan leak — 2017 to early 2018 production",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["leak"],
    aliases: [
      "plastic oil pan",
      "oil pan leak",
      "oil pan crack",
      "oil pan replacement",
      "metal oil pan",
      "오일팬 누유",
      "플라스틱 오일팬",
    ],
    excerpt:
      "The 2017 and early-2018 production Raptors shipped with a plastic (composite) oil pan that is prone to cracking, warping at the gasket surface, and developing slow leaks. The plastic pan is also vulnerable to impact damage from off-road debris. Ford switched to a metal oil pan during mid-2018 production. Upgrading to the metal pan (Ford part JL3Z-6675-A) is a common and strongly recommended fix for affected trucks. The swap is straightforward — 2-3 hours labor. Cost: $150-250 for the pan plus gasket.",
    inspectionHint:
      "Check the oil pan for wet spots, especially around the gasket surface and drain plug. Look for impact marks on the bottom. Identify plastic vs metal by tapping — plastic sounds dull, metal rings. Check build date on the door sticker.",
    safetyNote:
      "A cracked oil pan can cause sudden oil loss. Monitor oil level frequently on trucks with the plastic pan, especially after off-road use.",
    sourceCitationKey: "raptor-gen2-known-issue-plastic-oil-pan",
  },

  // ── 10. Tailgate step motor failure ──────────────────────────────────
  {
    id: "raptor-gen2-known-issue-tailgate-step-failure",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — Gen 2 Raptor",
    title: "Tailgate step motor failure — intermittent or non-functional",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["bed_cargo", "electrical"],
    issueAreaIds: ["tailgate_mechanism_wear"],
    partTags: ["tailgate"],
    symptomTags: [],
    aliases: [
      "tailgate step",
      "tailgate step motor",
      "Man Step",
      "bed step failure",
      "tailgate step stuck",
      "테일게이트 스텝",
    ],
    excerpt:
      "The integrated tailgate step (Man Step) motor fails on many Gen 2 Raptors, causing the step to stick in the extended or retracted position, deploy intermittently, or make grinding noises. Water intrusion and corrosion of the electric motor and linkage are the primary causes. Repair cost is $300-500 including the motor assembly and labor. Some owners disconnect the feature entirely after repeated failures. Ford part number FL3Z-99201A64-C (motor assembly).",
    inspectionHint:
      "Operate the tailgate step through several cycles. Listen for grinding or hesitation. Check the motor housing for corrosion and water intrusion signs. Verify the step locks fully in both extended and retracted positions.",
    sourceCitationKey: "raptor-gen2-known-issue-tailgate-step-failure",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Specs (11-15)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 11. Engine oil spec ──────────────────────────────────────────────
  {
    id: "raptor-gen2-spec-engine-oil",
    sourceType: "repair_note",
    sourceLabel: "Fluid Specification — Gen 2 Raptor",
    title: "Engine Oil — 5W-30 Full Synthetic, 6.0 qt, Motorcraft FL-500S",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical", "turbo_boost"],
    issueAreaIds: ["turbo_bearing_failure", "timing_chain_stretch_ecoboost"],
    partTags: ["turbocharger", "cam_phaser_area"],
    symptomTags: ["rattle", "leak"],
    aliases: [
      "engine oil", "motor oil", "oil type", "oil capacity", "5w30", "5w-30",
      "oil change", "FL-500S", "엔진오일", "오일 교환",
    ],
    excerpt:
      "The 3.5L EcoBoost HO uses 5W-30 full synthetic oil (Ford spec WSS-M2C946-B1). Capacity is 6.0 US quarts (5.7 liters) with filter. Use Motorcraft FL-500S filter. Ford recommends 10,000-mile OCI, but the Raptor community strongly recommends 5,000-mile intervals due to the turbo oil circuit and higher operating temperatures from the HO tune. Recommended oils: Motorcraft Full Synthetic, Mobil 1, Pennzoil Platinum, Amsoil Signature Series.",
    safetyNote:
      "DO NOT use 5W-20. The HO EcoBoost requires 5W-30 for proper turbo bearing lubrication and cam phaser hydraulic operation.",
    sourceCitationKey: "raptor-gen2-spec-engine-oil",
  },

  // ── 12. Transmission fluid spec ──────────────────────────────────────
  {
    id: "raptor-gen2-spec-transmission-fluid",
    sourceType: "repair_note",
    sourceLabel: "Fluid Specification — Gen 2 Raptor",
    title: "10R80 Transmission — Mercon ULV, 13.1 qt total capacity",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "transmission fluid", "trans fluid", "ATF", "Mercon ULV",
      "10R80 fluid", "미션오일", "변속기 오일", "트랜스미션 오일",
      "XT-12-QULV",
    ],
    excerpt:
      "Motorcraft Mercon ULV (XT-12-QULV) ONLY — do NOT use Mercon LV or any other ATF. Total system capacity: 13.1 quarts (12.4 liters). Drain-and-fill yields approximately 7-8 quarts. Ford officially lists the 10R80 as 'lifetime fill' with a 150,000-mile service interval — the community consensus is this is dangerously long. Recommended change interval: 30,000-50,000 miles, or sooner if towing or doing off-road use. Many of the 10R80 harsh shifting complaints are resolved or significantly improved by a proper fluid change and correct fill level.",
    safetyNote:
      "The 10R80 has no dipstick. Fluid level MUST be checked with a scan tool monitoring transmission temperature. Overfill or underfill causes shift quality issues.",
    sourceCitationKey: "raptor-gen2-spec-transmission-fluid",
  },

  // ── 13. Spark plug spec ──────────────────────────────────────────────
  {
    id: "raptor-gen2-spec-spark-plugs",
    sourceType: "repair_note",
    sourceLabel: "Specification — Gen 2 Raptor",
    title: "Spark Plugs — SP-578 or SP-594, 11 lb-ft, 40-50K interval",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: ["spark_plug"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "spark plug", "plug change", "SP-578", "SP-594",
      "plug torque", "plug gap", "점화 플러그", "스파크 플러그",
    ],
    excerpt:
      "Motorcraft SP-578 (Iridium) or SP-594 (Platinum) — both are OEM-approved for the 3.5L HO EcoBoost. Torque to 11 lb-ft (DO NOT overtighten — the aluminum heads strip easily). Gap is pre-set at 0.028-0.032 inches, do not re-gap iridium plugs. Recommended change interval: 40,000-50,000 miles (Ford says 100K, but the community finds degraded performance and misfires well before that on the HO tune). Apply a thin coat of Motorcraft anti-seize to the threads. Use a 9/16\" thin-wall spark plug socket with extension.",
    inspectionHint:
      "Pull one plug to inspect condition before committing to a full change. Tan/light brown insulator = good. Black/oily = investigate. White/blistered = running lean, check boost system.",
    sourceCitationKey: "raptor-gen2-spec-spark-plugs",
  },

  // ── 14. Suspension torque specs ──────────────────────────────────────
  {
    id: "raptor-gen2-spec-suspension-torque",
    sourceType: "repair_note",
    sourceLabel: "Torque Specification — Gen 2 Raptor",
    title: "Suspension torque specs — UCA 111, LCA 184, tie rod 85 lb-ft",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: ["front_suspension_joint_play"],
    partTags: ["control_arm", "ball_joint"],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "suspension torque", "UCA torque", "LCA torque", "tie rod torque",
      "control arm torque", "ball joint torque", "서스펜션 토크",
    ],
    excerpt:
      "Critical torque specifications for Gen 2 Raptor front suspension: Upper Control Arm (UCA) pivot bolts: 111 lb-ft. Lower Control Arm (LCA) pivot bolts: 184 lb-ft. Tie rod end nut: 85 lb-ft. Sway bar end link: 76 lb-ft. Shock absorber upper mount: 30 lb-ft. Shock absorber lower bolt: 184 lb-ft. All suspension fasteners must be torqued with the suspension loaded (wheels on ground or suspension compressed to ride height). Failure to load the suspension before torquing causes bushing preload and premature wear.",
    inspectionHint:
      "After any suspension work, torque all fasteners with the truck on the ground at ride height. Re-check torque after 100 miles. Always use new cotter pins on tie rod ends and ball joint castle nuts.",
    safetyNote:
      "Under-torqued suspension fasteners can cause sudden loss of vehicle control. Always use a calibrated torque wrench.",
    sourceCitationKey: "raptor-gen2-spec-suspension-torque",
  },

  // ── 15. Wheel and tire spec ──────────────────────────────────────────
  {
    id: "raptor-gen2-spec-wheel-tire",
    sourceType: "repair_note",
    sourceLabel: "Specification — Gen 2 Raptor",
    title: "Wheel/Tire — 17x8.5\" forged beadlock-capable, BFG KO2 315/70R17",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["vibration"],
    aliases: [
      "wheel size", "tire size", "lug nut torque", "BFG KO2",
      "315/70R17", "beadlock wheel", "wheel torque",
      "타이어 사이즈", "휠 사이즈", "러그너트 토크",
    ],
    excerpt:
      "Factory wheel: 17x8.5\" forged aluminum, beadlock-capable (actual beadlock ring sold separately by Ford Performance, part M-1007-R1785). Factory tire: BFGoodrich All-Terrain T/A KO2 315/70R17 (35\" equivalent). Lug nuts: 150 lb-ft torque, 14mm x 1.5 thread. TPMS sensors: Band-clamp style, Motorcraft TPMS-52. Tire pressure: 37 PSI front, 37 PSI rear (street). Off-road pressures vary by terrain: 20-25 PSI for sand, 25-30 PSI for trails. Always re-torque lug nuts after 50-100 miles on new wheel installs.",
    inspectionHint:
      "Check beadlock ring bolts if equipped (re-torque to 22 lb-ft after every off-road session). Inspect tire sidewalls for trail damage. Verify TPMS sensor function after any tire dismount.",
    sourceCitationKey: "raptor-gen2-spec-wheel-tire",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  TSBs (16-18)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 16. TSB 23-2123 — 10R80 harsh/delayed engagement ────────────────
  {
    id: "raptor-gen2-tsb-23-2123",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 23-2123",
    title: "TSB 23-2123 — 10R80 harsh shift, delayed engagement (supersedes prior TSBs)",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "TSB 23-2123",
      "10R80 TSB",
      "transmission TSB",
      "harsh shift TSB",
      "delayed engagement",
      "10-speed TSB",
    ],
    excerpt:
      "TSB 23-2123: Addresses harsh or delayed shifting, shudder, and clunking in the 10R80 10-speed automatic transmission. Supersedes multiple prior TSBs (19-2062, 20-2076, 21-2145, etc.). The service procedure includes PCM reprogramming with updated shift adaptive learning strategy, transmission fluid drain-and-fill with Mercon ULV to correct level, and a specific drive cycle to retrain the adaptive tables. Critical: the fluid level MUST be verified via scan tool, as the factory fill is often 2-3 quarts low. This TSB applies to 2017-2020 F-150 and Raptor models.",
    inspectionHint:
      "Before visiting the dealer, document specific shift quality complaints (which gears, hot vs cold, loaded vs unloaded). Ask the dealer to verify the PCM is at the latest calibration per TSB 23-2123. Request fluid level verification via FDRS.",
    sourceCitationKey: "raptor-gen2-tsb-23-2123",
  },

  // ── 17. TSB 21-2119 — Cam phaser rattle/knock ───────────────────────
  {
    id: "raptor-gen2-tsb-21-2119",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 21-2119",
    title: "TSB 21-2119 — Cam phaser rattle/knock, VCT phaser replacement",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["timing_chain_stretch_ecoboost", "cam_phaser_tick_context"],
    partTags: ["cam_phaser_area", "timing_cover"],
    symptomTags: ["rattle", "rough_idle"],
    aliases: [
      "TSB 21-2119",
      "phaser TSB",
      "VCT replacement TSB",
      "cam phaser replacement",
      "phaser knock TSB",
    ],
    excerpt:
      "TSB 21-2119: Addresses engine rattle or knock noise on cold startup, lasting 3-10 seconds. Root cause is worn Variable Camshaft Timing (VCT) phasers that lose oil pressure bleed-down overnight. The repair involves replacing all four VCT phasers (intake and exhaust, both banks), timing chains, chain tensioners, and guides. The front cover must be resealed. Associated with CSP 21N03 for warranty extension. Total dealer labor: 16-20 hours. After repair, perform oil change and reset adaptive tables via FDRS.",
    inspectionHint:
      "Capture a cold-start video with the hood open to clearly document the rattle for warranty/CSP claims. The rattle typically comes from the front/top of the engine and fades within 10 seconds as oil pressure builds.",
    sourceCitationKey: "raptor-gen2-tsb-21-2119",
  },

  // ── 18. TSB 14-0130 — CAC condensation misfire ───────────────────────
  {
    id: "raptor-gen2-tsb-14-0130",
    sourceType: "ford_tsb",
    sourceLabel: "Ford TSB 14-0130 (carried over)",
    title: "TSB 14-0130 — Charge air cooler condensation causing misfire",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["turbo_boost", "intake_vacuum"],
    issueAreaIds: ["intercooler_condensation"],
    partTags: ["intercooler"],
    symptomTags: ["stumble", "misfire"],
    aliases: [
      "TSB 14-0130",
      "CAC TSB",
      "intercooler TSB",
      "condensation TSB",
      "charge air cooler TSB",
    ],
    excerpt:
      "TSB 14-0130: Originally issued for 2011-2014 EcoBoost, carried over and revised for later models including the Gen 2 Raptor. Addresses moisture accumulation in the charge air cooler (intercooler) causing misfires and stumble on first hard acceleration after overnight soak in humid conditions. The revised fix includes installation of an updated intercooler with improved internal drainage and a revised lower boot design. For the Gen 2 Raptor, the PFDI system mitigates severity but does not eliminate the issue. The TSB also recommends adding a drain fitting at the intercooler low point.",
    inspectionHint:
      "Test on a humid morning: start the truck cold and perform a hard acceleration from a stop. A stumble or misfire followed by normal operation confirms CAC condensation. Remove lower boot to check for standing water.",
    sourceCitationKey: "raptor-gen2-tsb-14-0130",
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  Buying Guide (19-20)
  // ═══════════════════════════════════════════════════════════════════════

  // ── 19. Year comparison ──────────────────────────────────────────────
  {
    id: "raptor-gen2-buying-guide-year-comparison",
    sourceType: "inspection_hint",
    sourceLabel: "Buying Guide — Gen 2 Raptor",
    title: "Gen 2 Raptor year comparison — 2017 riskiest, 2019-2020 best",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical", "suspension_steering", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "which year Raptor",
      "best year Raptor",
      "2017 vs 2019 Raptor",
      "year comparison",
      "Raptor buying guide",
      "랩터 연식 비교",
    ],
    excerpt:
      "2017: First year, most risk. Plastic oil pan (prone to cracking), roughest 10R80 calibration, no Live Valve option, earliest cam phaser revision. Budget $1,500-3,000 for known issues. 2018: Mid-year switch to metal oil pan, improved 10R80 calibration, still no Live Valve. The sweet spot for value. 2019: Live Valve shocks added (optional), further refined 10R80, latest cam phaser design, Trail Control added. Best overall package but commands a price premium. 2020: Identical to 2019 mechanically, final year before Gen 3. Both 2019-2020 benefit from all accumulated fixes and refinements. For a used purchase, a well-maintained 2018+ with documented service history is the best value play.",
    inspectionHint:
      "Always check the build date (door sticker), not just model year. A late-build 2017 may have mid-cycle updates. Verify recall and CSP completion history through Ford's VIN lookup tool.",
    sourceCitationKey: "raptor-gen2-buying-guide-year-comparison",
  },

  // ── 20. Used inspection checklist ────────────────────────────────────
  {
    id: "raptor-gen2-buying-guide-inspection-checklist",
    sourceType: "inspection_hint",
    sourceLabel: "Buying Guide — Gen 2 Raptor",
    title: "Gen 2 Raptor used purchase — 10-point inspection checklist",
    vehicleScope: RAPTOR_GEN2_VEHICLE_ID,
    systemTags: ["engine_mechanical", "suspension_steering", "body", "electrical"],
    issueAreaIds: ["timing_chain_stretch_ecoboost", "front_suspension_joint_play", "tailgate_mechanism_wear"],
    partTags: ["cam_phaser_area", "control_arm", "ball_joint", "frame_section", "tailgate"],
    symptomTags: ["rattle", "clunk", "leak"],
    aliases: [
      "Raptor inspection",
      "used Raptor checklist",
      "pre-purchase inspection",
      "PPI Raptor",
      "what to check used Raptor",
      "중고 랩터 점검",
    ],
    excerpt:
      "10-point used Gen 2 Raptor inspection checklist: (1) Cold-start cam phaser rattle — listen for first 10 seconds. (2) Recall/CSP history — run VIN through Ford, verify CSP 21N03 status. (3) Transmission reflash — ask dealer to verify latest PCM calibration per TSB 23-2123. (4) Fox shock condition — check for oil weep, bounce test, service records. (5) Frame/skid plate inspection — check for cracks, bends, weld failures from off-road impacts. (6) UCA ball joint play — jack up front, check for play at 12/6. (7) Oil pan type — tap to confirm metal vs plastic (2017-early 2018). (8) Windshield — check for stress cracks at edges. (9) Cab mount bushings — speed bump test for squeaks/pops. (10) Undercarriage — look for aftermarket modifications, missing skid plates, damaged wiring.",
    inspectionHint:
      "Insist on a cold-start test (engine off for 4+ hours). Bring an OBD2 scanner to check for DTCs and verify mileage consistency. Request Carfax AND run Ford VIN lookup for open recalls/CSPs. Budget $150-200 for a professional pre-purchase inspection at a Ford dealer.",
    safetyNote:
      "Walk away from any Raptor with frame cracks, persistent cam phaser rattle with no CSP history, or signs of severe off-road abuse without corresponding maintenance records.",
    sourceCitationKey: "raptor-gen2-buying-guide-inspection-checklist",
  },
];
