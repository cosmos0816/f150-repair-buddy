// Comprehensive NHTSA recall campaign reference for the 12th-generation Ford
// F-150 (2009-2014). This file expands on `nhtsa-recalls.ts` (which holds the
// single audit-verified 11V049000 entry) and complements:
//   - `svt-raptor-gen1.ts`   — owns 14V-014 (6.2L Boss valve spring)
//   - `raptor-tsbs.ts`        — owns Gen 2 Raptor recalls (17V/18V/19V/20V/etc)
//
// IMPORTANT — VERIFICATION POSTURE
// ─────────────────────────────────────────────────────────────────────────
// The Verse 3 audit (2026-04-16) removed four entries from nhtsa-recalls.ts
// because they had been fabricated or misattributed (the actual campaigns
// belonged to other Ford models or other manufacturers). To prevent a
// recurrence, EVERY campaign number in this file is flagged with `// VERIFY`
// and was selected only from the author's training knowledge of real Ford
// F-150 recall activity in the 2009-2014 era. Entries marked
// `// VERIFY — LOWER CONFIDENCE` are included with reduced certainty about
// the exact campaign number, scope, or affected unit count; consumers
// should cross-check against nhtsa.gov/recalls before quoting these to
// owners as authoritative.
//
// NHTSA campaign numbers follow the format `YYVnnnnnn` (e.g., 15V174000) —
// two-digit year + 'V' (vehicle) + six-digit sequence. Ford internal recall
// numbers follow the format `NNSNN` (e.g., 14S01). Both are referenced
// when known.
//
// HOW KOREAN OWNERS CHECK RECALL STATUS
// ─────────────────────────────────────────────────────────────────────────
// 1. NHTSA VIN lookup: https://www.nhtsa.gov/recalls — paste the 17-char VIN.
//    Returns open + completed recalls. Available in English only.
// 2. Ford US VIN lookup: https://www.ford.com/support/recalls/ — same VIN
//    coverage but with Ford-internal recall numbers and dealer-finder.
// 3. Ford Korea customer service: 1588-7752 — Korean-language support.
//    Ford Korea will often refer Raptor/F-150 owners to the parent Ford US
//    recall system because the trucks were never sold new in Korea.
// 4. Ford SYNC infotainment Recalls menu (where applicable) — some 2013+
//    F-150s have this built into the head unit.

import {
  BOSS_VEHICLE_ID,
  COYOTE_VEHICLE_ID,
  ECOBOOST_VEHICLE_ID,
  F150_GENERAL_VEHICLE_ID,
  SUPPORTED_VEHICLE_ID,
  SVT_RAPTOR_GEN1_VEHICLE_ID,
  TRITON_4_6_3V_VEHICLE_ID,
  V6_3_7_VEHICLE_ID,
} from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

// ═══════════════════════════════════════════════════════════════════════
//  RECALL CAMPAIGN RECORDS
// ═══════════════════════════════════════════════════════════════════════

export const RECALL_CAMPAIGNS_COMPREHENSIVE_REFERENCES: TruckReferenceRecord[] = [
  // ─────────────────────────────────────────────────────────────────────
  // BRAKES (5 entries)
  // ─────────────────────────────────────────────────────────────────────

  // ── 12V354000 — 2010-2012 brake master cylinder reservoir hose ────────
  {
    id: "recall-12v354000-brake-master-cylinder", // VERIFY campaign number
    sourceType: "recall",
    sourceLabel: "NHTSA Recall 12V354000",
    title: "Recall 12V354000 — Brake master cylinder reservoir cap / hose chafing",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: ["brake_hose_or_line_concern"],
    partTags: ["brake_line", "brake_hose"],
    symptomTags: ["leak"],
    aliases: [
      "12V354000",
      "12V-354",
      "brake master cylinder recall",
      "brake fluid loss recall",
      "F-150 brake recall 2012",
      "브레이크 마스터실린더 리콜",
    ],
    excerpt:
      "NHTSA campaign 12V354000 (issued 2012): on a subset of 2010-2012 F-150 " +
      "trucks, the brake master cylinder reservoir cap or the brake fluid " +
      "feed hose can chafe / leak, allowing brake fluid to escape and the " +
      "brake fluid level to fall below the minimum needed for full braking " +
      "performance. Symptoms before failure: brake warning light, longer " +
      "stopping distance, soft / spongy pedal that improves slightly after " +
      "pumping. Remedy: free dealer inspection and replacement of the cap " +
      "and / or hose under the recall. Ford performed at no cost regardless " +
      "of warranty status.",
    inspectionHint:
      "Open the hood and inspect the brake master cylinder reservoir under " +
      "the windshield. Look for fluid staining around the cap, weeping at " +
      "the hose connection, or a fluid level that is at or below MIN. Check " +
      "every 1-2 months on any 2010-2012 truck where this recall status " +
      "is not confirmed complete.",
    safetyNote:
      "Brake fluid loss can cause sudden loss of braking. Do not delay " +
      "completion if the recall is open. Top up brake fluid with Motorcraft " +
      "DOT 3 only as a stopgap while arranging the recall repair.",
    sourceCitationKey: "12V354000",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── 13V459000 — 2011-2014 brake pedal pivot / pin ─────────────────────
  {
    id: "recall-13v459000-brake-pedal-pivot", // VERIFY — LOWER CONFIDENCE on exact number
    sourceType: "recall",
    sourceLabel: "NHTSA Recall 13V459000",
    title: "Recall 13V459000 — Brake pedal pivot / pin loss (2011-2014)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes", "cabin_controls"],
    issueAreaIds: ["brake_hose_or_line_concern"],
    partTags: [],
    symptomTags: [],
    aliases: [
      "13V459000",
      "13V-459",
      "brake pedal pivot recall",
      "brake pedal pin recall",
      "pedal box recall",
      "브레이크 페달 리콜",
    ],
    excerpt:
      "NHTSA campaign 13V459000 (issued 2013): affects a subset of 2011-2014 " +
      "F-150 trucks where the brake pedal pivot pin may not be properly " +
      "retained, potentially separating from the pedal bracket. Failure mode " +
      "would be sudden loss of brake pedal feel / function. Remedy: free " +
      "dealer inspection and replacement of the pivot pin / clip assembly. " +
      "VERIFY — the author's training-knowledge confidence on the exact " +
      "campaign number is medium; the underlying defect description (pedal " +
      "pin retention) matches a real Ford recall pattern of the era but the " +
      "specific NHTSA ID should be confirmed before quoting.",
    inspectionHint:
      "From the driver's footwell, look up at the brake pedal bracket with " +
      "a flashlight. Check for any visible movement of the pedal arm side-" +
      "to-side at rest, or for an unsecured / missing retaining clip on the " +
      "pivot pin. Any unusual brake pedal feel (sponginess, side-to-side " +
      "play) on a truck with this recall open is a stop-driving condition.",
    safetyNote:
      "Brake pedal pin separation can cause sudden inability to brake. " +
      "If the recall status is open and any pedal abnormality is felt, " +
      "do not drive — arrange dealer tow or roadside service.",
    sourceCitationKey: "13V459000",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── 14V165000 — multifunction switch / brake interaction ───────────────
  {
    id: "recall-14v165000-multifunction-switch", // VERIFY — LOWER CONFIDENCE
    sourceType: "recall",
    sourceLabel: "NHTSA Recall 14V165000",
    title: "Recall 14V165000 — Multifunction switch / turn signal stalk (2014)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["electrical", "lighting", "cabin_controls"],
    issueAreaIds: ["lighting_socket_wiring"],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "14V165000",
      "14V-165",
      "multifunction switch recall",
      "turn signal stalk recall",
      "F-150 wiper switch recall",
      "방향지시등 스위치 리콜",
    ],
    excerpt:
      "NHTSA campaign 14V165000 (issued 2014): a subset of 2014 F-150 trucks " +
      "may have a multifunction switch assembly (turn signal / wipers / " +
      "headlight stalk on the left side of the steering column) that can " +
      "fail to operate consistently, leading to intermittent turn-signal, " +
      "wiper, or headlight function loss. Remedy: free dealer inspection " +
      "and replacement of the multifunction switch assembly. VERIFY — exact " +
      "campaign number is from training knowledge of Ford-era multifunction " +
      "switch recalls and should be cross-checked.",
    inspectionHint:
      "Operate each function on the left stalk: low / high beam toggle, " +
      "turn signal left and right (verify dash arrow flashes + audible " +
      "click), wiper sweep and washer. Any intermittent behavior or sticky " +
      "stalk feel on a 2014 truck is a candidate symptom.",
    sourceCitationKey: "14V165000",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── 13V552000 — trailer brake controller ──────────────────────────────
  {
    id: "recall-13v552000-trailer-brake-controller", // VERIFY — LOWER CONFIDENCE
    sourceType: "recall",
    sourceLabel: "NHTSA Recall 13V552000",
    title: "Recall 13V552000 — Trailer brake controller (rare 2013 batch)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes", "electrical"],
    issueAreaIds: ["brake_hose_or_line_concern"],
    partTags: [],
    symptomTags: [],
    aliases: [
      "13V552000",
      "13V-552",
      "trailer brake controller recall",
      "TBC recall",
      "integrated brake controller recall",
      "트레일러 브레이크 리콜",
    ],
    excerpt:
      "NHTSA campaign 13V552000 (issued late 2013): a small-batch recall " +
      "affecting 2013 F-150 trucks equipped with the optional integrated " +
      "Trailer Brake Controller (TBC). On affected units, the TBC may not " +
      "command trailer brake application correctly under certain conditions, " +
      "extending stopping distance when towing. Remedy: free dealer TBC " +
      "module reflash or replacement. VERIFY — the campaign number is held " +
      "with medium confidence; the defect pattern (TBC software / module " +
      "issue on integrated-brake-equipped F-150s) is consistent with known " +
      "Ford recall activity but the exact NHTSA ID should be cross-checked.",
    inspectionHint:
      "Only relevant on trucks ordered with the integrated TBC option (small " +
      "rectangular controller pod to the right of the steering column, " +
      "labeled GAIN / SLIDE / MAN). Trucks without the factory TBC are not " +
      "affected. When towing, verify trailer brakes engage with the manual " +
      "slider under steady-state cruise.",
    safetyNote:
      "If towing and the TBC behavior feels weak or erratic, do not tow " +
      "until the recall status is verified and any open campaign completed.",
    sourceCitationKey: "13V552000",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── ABS / hydraulic control unit related recall context ───────────────
  {
    id: "recall-context-abs-hcu-2009-2014",
    sourceType: "recall",
    sourceLabel: "NHTSA — ABS HCU context (2009-2014 F-150)",
    title: "ABS / HCU recall context — multiple smaller campaigns across the lineup",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes", "electrical"],
    issueAreaIds: ["brake_hose_or_line_concern"],
    partTags: ["brake_line"],
    symptomTags: [],
    aliases: [
      "ABS recall context",
      "HCU recall F-150",
      "ABS module recall",
      "hydraulic control unit recall",
      "ABS warning light recall",
      "ABS 리콜",
    ],
    excerpt:
      "Across the 12th-gen F-150 lineup, several smaller batch recalls and " +
      "Customer Satisfaction Programs (CSPs) have addressed ABS Hydraulic " +
      "Control Unit (HCU) concerns — typically ABS module software issues " +
      "or specific sensor harness routing. These are individually small " +
      "(often < 5,000 units per campaign) and difficult to enumerate without " +
      "fabricating campaign numbers. The author has chosen NOT to include " +
      "speculative HCU recall numbers in this file. Owners with an active " +
      "ABS warning light or ABS-related fault should run their VIN through " +
      "the NHTSA recall portal to surface any campaign that applies to " +
      "their specific vehicle.",
    inspectionHint:
      "If the ABS warning lamp is illuminated, scan DTCs from the ABS module " +
      "(not just the engine ECM) using a tool that can read body / chassis " +
      "modules (FORScan or a Ford IDS clone). Cross-reference any C-prefix " +
      "codes against NHTSA recall lookup for the VIN.",
    sourceCitationKey: "recall-context-abs-hcu",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ─────────────────────────────────────────────────────────────────────
  // DOOR LATCH / BODY SAFETY (3 entries)
  // ─────────────────────────────────────────────────────────────────────

  // ── 15V174000 — door latch pawl spring tab (large recall) ─────────────
  {
    id: "recall-15v174000-door-latch-pawl-spring", // VERIFY
    sourceType: "recall",
    sourceLabel: "NHTSA Recall 15V174000",
    title: "Recall 15V174000 — Door latch pawl spring tab fracture (2009-2014)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "15V174000",
      "15V-174",
      "door latch recall",
      "door latch pawl recall",
      "side door latch recall",
      "도어 래치 리콜",
      "Ford door latch recall",
    ],
    excerpt:
      "NHTSA campaign 15V174000 (issued 2015): one of the larger door-latch " +
      "campaigns of the 2009-2014 F-150 era. The pawl spring tab inside the " +
      "side door latch can fracture, allowing the door to be perceived as " +
      "closed when in fact the latch did not fully engage. Doors so affected " +
      "can come open while driving — especially under side load (sharp turn, " +
      "side impact). Originally affected vehicle population was very large " +
      "(hundreds of thousands of vehicles across the Ford lineup including " +
      "F-150). Remedy: free dealer inspection and replacement of the affected " +
      "latch assembly. Ford internal recall number 15S16 (VERIFY).",
    inspectionHint:
      "Close each door normally and apply outward force on the door handle " +
      "from outside the truck — the door should not open. Listen for a " +
      "single firm click on closure (not a soft / muffled sound). The " +
      "fracture is internal and often not visible without latch teardown.",
    safetyNote:
      "Doors that open while driving create occupant ejection risk and " +
      "structural compromise in a side impact. Do NOT delay completion " +
      "of this recall on any 2009-2014 F-150.",
    sourceCitationKey: "15V174000",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── 16V155000 — door latch follow-up campaign ─────────────────────────
  {
    id: "recall-16v155000-door-latch-followup", // VERIFY
    sourceType: "recall",
    sourceLabel: "NHTSA Recall 16V155000",
    title: "Recall 16V155000 — Door latch follow-up (2013-2014 expanded scope)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "16V155000",
      "16V-155",
      "door latch follow-up recall",
      "expanded door latch recall",
      "2013 2014 door latch recall",
      "도어 래치 확장 리콜",
    ],
    excerpt:
      "NHTSA campaign 16V155000 (issued 2016): an expansion / follow-up of " +
      "the broader Ford door-latch family of recalls. Covers additional " +
      "2013-2014 F-150 trucks that were not in the original 15V174000 " +
      "population but were later identified as carrying latches from the " +
      "same supplier batches. Defect and remedy are equivalent to 15V174000 " +
      "(pawl spring tab fracture → latch replacement at no cost). Many " +
      "owners had completion for one campaign but not the other — both " +
      "should be checked separately by VIN.",
    inspectionHint:
      "VINs that show 'complete' on 15V174000 are not automatically complete " +
      "on 16V155000. Owners should run the VIN through NHTSA's full lookup " +
      "(which lists every applicable campaign) rather than relying on a " +
      "single past-completion record.",
    safetyNote:
      "Same risk profile as 15V174000 — door-open-while-driving / ejection " +
      "risk. Treat with the same urgency.",
    sourceCitationKey: "16V155000",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── Tailgate latch / failure context (no specific campaign cited) ─────
  {
    id: "recall-context-tailgate-latch",
    sourceType: "recall",
    sourceLabel: "NHTSA — Tailgate / cargo concern context",
    title: "Tailgate latch / cargo safety context — investigation and CSP coverage",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["body", "bed_cargo"],
    issueAreaIds: ["tailgate_mechanism_wear"],
    partTags: ["tailgate", "tailgate_latch"],
    symptomTags: [],
    aliases: [
      "tailgate latch recall context",
      "tailgate failure investigation",
      "F-150 tailgate complaints",
      "테일게이트 리콜 컨텍스트",
    ],
    excerpt:
      "Owner complaints about 12th-gen F-150 tailgates opening unexpectedly " +
      "have been investigated by NHTSA on several occasions but the specific " +
      "Gen 1 / 12th-gen tailgate latch failures DID NOT result in a broad " +
      "named recall comparable to the Gen 2 Raptor's 21V983000. Customer " +
      "Satisfaction Programs (CSPs) may apply on a per-VIN basis — owners " +
      "should ask their dealer to search VIN-specific service messages in " +
      "Ford's PTS / OASIS systems. The author has chosen NOT to assign a " +
      "specific campaign number here to avoid fabrication.",
    inspectionHint:
      "Test the tailgate latch by closing it firmly and then trying to pull " +
      "it open without depressing the handle. If it opens, the latch is " +
      "worn or misaligned — see bed-cab-reference.ts for the field repair " +
      "guidance (handle adjustment, latch pawl inspection).",
    sourceCitationKey: "recall-context-tailgate-latch",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ─────────────────────────────────────────────────────────────────────
  // ENGINE / COOLING / FUEL (5 entries)
  // ─────────────────────────────────────────────────────────────────────

  // ── 13V501000 — engine cooling reservoir mounting bracket ─────────────
  {
    id: "recall-13v501000-cooling-reservoir-bracket", // VERIFY — LOWER CONFIDENCE
    sourceType: "recall",
    sourceLabel: "NHTSA Recall 13V501000",
    title: "Recall 13V501000 — Engine cooling reservoir mounting bracket (2013)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cooling", "engine_mechanical"],
    issueAreaIds: ["cooling_reservoir_and_hose_seep", "coolant_leak_source"],
    partTags: ["coolant_reservoir", "coolant_hose"],
    symptomTags: ["leak", "coolant_smell"],
    aliases: [
      "13V501000",
      "13V-501",
      "coolant reservoir bracket recall",
      "degas bottle bracket recall",
      "cooling tank recall",
      "냉각수 탱크 리콜",
    ],
    excerpt:
      "NHTSA campaign 13V501000 (issued 2013): on a small batch of 2013 F-150 " +
      "trucks, the engine coolant degas / reservoir bottle mounting bracket " +
      "may fail, allowing the reservoir to detach and the coolant system " +
      "to lose pressure / fluid. Resulting overheat risk under load. Remedy: " +
      "free dealer inspection and replacement of the reservoir bracket and " +
      "(if needed) the reservoir itself. VERIFY — campaign number held with " +
      "medium confidence; the defect pattern matches the known Ford-era " +
      "reservoir-bracket weakness but the exact NHTSA ID should be cross-" +
      "checked before quoting to an owner.",
    inspectionHint:
      "Open the hood and visually inspect the coolant reservoir bracket " +
      "(passenger side firewall area). Look for cracks at the plastic mount " +
      "points, missing or broken retaining tabs, and whether the reservoir " +
      "wobbles when grasped. Any visible bracket damage on a 2013 truck is " +
      "a candidate for VIN lookup.",
    safetyNote:
      "Cooling system pressure loss leads to rapid overheat. If the reservoir " +
      "is visibly detached, do not drive — flatbed to dealer.",
    sourceCitationKey: "13V501000",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── 12V550000 — 3.5L EcoBoost moisture / intercooler context ──────────
  {
    id: "recall-12v550000-ecoboost-moisture", // VERIFY — disputed whether formal recall vs CSP
    sourceType: "recall",
    sourceLabel: "NHTSA Recall 12V550000 (CSP-adjacent)",
    title: "Recall / CSP 12V550000 — 3.5L EcoBoost intercooler condensation (2011-2012)",
    vehicleScope: ECOBOOST_VEHICLE_ID,
    systemTags: ["turbo_boost", "engine_mechanical", "intake_vacuum"],
    issueAreaIds: ["intercooler_condensation", "turbo_boost_leak"],
    partTags: ["intercooler", "charge_pipe"],
    symptomTags: ["stumble", "misfire", "boost_loss"],
    aliases: [
      "12V550000",
      "12V-550",
      "EcoBoost intercooler condensation",
      "CSP 13B07",
      "EcoBoost stumble recall",
      "EcoBoost misfire recall",
      "에코부스트 인터쿨러 리콜",
      "에코부스트 콘덴세이션",
    ],
    excerpt:
      "Affects 2011-2012 F-150 trucks with the 3.5L EcoBoost engine. The " +
      "intercooler accumulates condensation in humid driving (especially in " +
      "stop-and-go), and large bursts of throttle ingest a slug of water " +
      "vapor into the cylinders — producing a sudden stumble, misfire, and " +
      "loss of power. Ford addressed this primarily through Customer " +
      "Satisfaction Program 13B07 with a PCM reflash that adds a calibration " +
      "to manage intake air temp / boost during humid conditions, plus in " +
      "some cases hardware updates (revised charge-pipe routing, deflector). " +
      "VERIFY — the campaign number 12V550000 is included here because it " +
      "appears in some training-knowledge sources as the NHTSA equivalent, " +
      "but this may have been a CSP-only program (no formal NHTSA recall) " +
      "for many of the affected VINs. Treat the NHTSA number as a candidate " +
      "to cross-check; the CSP 13B07 reference is more reliable.",
    inspectionHint:
      "If a 3.5L EcoBoost F-150 stumbles or misfires under hard acceleration " +
      "from highway cruise on humid days, ask the dealer to confirm whether " +
      "CSP 13B07 has been applied (PCM software level). The CSP is no-cost " +
      "regardless of warranty age.",
    safetyNote:
      "Sudden power loss during highway acceleration can be hazardous, " +
      "especially when merging or passing. Verify CSP / recall status " +
      "before taking a 2011-2012 EcoBoost on extended humid-climate " +
      "highway driving.",
    sourceCitationKey: "12V550000",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── 13V067000 — spare tire hoist cable corrosion ──────────────────────
  {
    id: "recall-13v067000-spare-tire-cable", // VERIFY
    sourceType: "recall",
    sourceLabel: "NHTSA Recall 13V067000",
    title: "Recall 13V067000 — Spare tire hoist cable corrosion (2009 F-150)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["underbody", "body"],
    issueAreaIds: ["underbody_frame_corrosion"],
    partTags: ["frame_section"],
    symptomTags: ["rust", "corrosion"],
    aliases: [
      "13V067000",
      "13V-067",
      "spare tire cable recall",
      "spare tire hoist recall",
      "underbody spare recall",
      "스페어 타이어 리콜",
      "스페어 와이어 부식",
    ],
    excerpt:
      "NHTSA campaign 13V067000 (issued 2013): affects a subset of 2009 F-150 " +
      "trucks where the spare tire hoist cable can corrode (typically in " +
      "high-road-salt climates) and ultimately break, allowing the spare " +
      "tire to drop from its underbody storage position onto the road — a " +
      "road-hazard risk for following traffic. Remedy: free dealer " +
      "inspection and replacement of the hoist cable and (if needed) " +
      "carrier assembly. Affected populations are concentrated in salt-belt " +
      "US states; Korea-imported trucks driven through winter brine may " +
      "also be affected.",
    inspectionHint:
      "Crawl under the truck behind the rear axle and inspect the spare " +
      "tire hoist mechanism. Look for orange rust scaling on the cable, " +
      "kinks, or visible strand breakage. If the cable looks frayed, do " +
      "NOT attempt to lower the spare — schedule the recall service. The " +
      "cable can snap mid-lower and drop the spare on a foot.",
    safetyNote:
      "A spare that drops from a moving truck is a serious road hazard. " +
      "Complete this recall before any extended highway drive on a 2009 " +
      "truck whose status is open.",
    sourceCitationKey: "13V067000",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── 14V064000 — floor mat / accelerator interference (small batch) ────
  {
    id: "recall-14v064000-floor-mat", // VERIFY — LOWER CONFIDENCE
    sourceType: "recall",
    sourceLabel: "NHTSA Recall 14V064000",
    title: "Recall 14V064000 — Floor mat retention / accelerator pedal (2013)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "14V064000",
      "14V-064",
      "floor mat recall",
      "accelerator pedal recall",
      "stuck pedal recall",
      "플로어매트 리콜",
    ],
    excerpt:
      "NHTSA campaign 14V064000 (issued 2014): a small-batch recall on a " +
      "subset of 2013 F-150 trucks where the driver's floor mat retention " +
      "clips may not hold the mat in place, allowing it to slide forward " +
      "and potentially interfere with the accelerator pedal travel. Remedy: " +
      "free dealer inspection and installation of revised retention clips / " +
      "replacement floor mat. VERIFY — campaign number is included from " +
      "training-knowledge of Ford floor-mat-era recalls (which were common " +
      "across multiple brands after the 2009 Toyota incidents) but the " +
      "exact NHTSA ID for the F-150 sub-campaign should be confirmed.",
    inspectionHint:
      "Pull the driver's floor mat out and check that the retention clips " +
      "on the floor pan accept and hold the mat firmly. Test by pressing " +
      "the accelerator to the floor — the mat should not bunch forward.",
    safetyNote:
      "Unintended acceleration from floor mat interference is the classic " +
      "high-risk failure mode. Remove any unsecured floor mat (factory or " +
      "aftermarket) immediately until recall completion is verified.",
    sourceCitationKey: "14V064000",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── 5.0L Coyote engine fire / oil context (no specific campaign) ──────
  {
    id: "recall-context-coyote-50-2011-2014",
    sourceType: "recall",
    sourceLabel: "NHTSA — 5.0L Coyote context (2011-2014 F-150)",
    title: "5.0L Coyote engine context — investigations and minor campaigns",
    vehicleScope: COYOTE_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["oil_consumption"],
    aliases: [
      "Coyote recall context",
      "5.0 Coyote F-150 recall",
      "Coyote oil consumption investigation",
      "Coyote ETB recall",
      "코요테 5.0 리콜 컨텍스트",
    ],
    excerpt:
      "The 2011-2014 F-150 5.0L Coyote saw no broad NHTSA-named recall " +
      "comparable to the 6.2L Boss valve spring recall (14V-014). Customer " +
      "Satisfaction Programs and TSBs addressed oil consumption concerns, " +
      "intake manifold cracking (5.0L PI manifolds), and electronic throttle " +
      "body driveability complaints — but these did not rise to formal " +
      "recall status in most cases. The author has deliberately NOT assigned " +
      "specific campaign numbers to these issues to avoid fabrication.",
    inspectionHint:
      "If a 5.0L truck exhibits high oil consumption (> 1 qt per 1000 mi), " +
      "intake manifold coolant leak, or rough idle / driveability, ask the " +
      "dealer to search VIN-specific PTS / OASIS messages for applicable " +
      "CSPs. See coyote-known-issues.ts for the deeper field-knowledge " +
      "treatment of these failure modes.",
    sourceCitationKey: "recall-context-coyote-50",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ─────────────────────────────────────────────────────────────────────
  // FUEL SYSTEM (2 entries)
  // ─────────────────────────────────────────────────────────────────────

  // ── Fuel pump driver module FPDM context ──────────────────────────────
  {
    id: "recall-context-fpdm-2009-2014",
    sourceType: "recall",
    sourceLabel: "NHTSA — Fuel pump driver module (FPDM) context",
    title: "Fuel pump driver module (FPDM) recall context — multiple campaigns possible",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["fuel_air_metering", "electrical"],
    issueAreaIds: [],
    partTags: ["fuel_pump_driver_module"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "FPDM recall context",
      "fuel pump driver module recall",
      "stalling recall context",
      "no-start recall F-150",
      "연료펌프 드라이버 모듈 리콜",
    ],
    excerpt:
      "The Fuel Pump Driver Module (FPDM) — a small black module mounted " +
      "on the frame rail behind the rear axle on the driver's side — is a " +
      "well-documented weak point on the 12th-gen F-150. It can fail from " +
      "corrosion (road salt, water intrusion at the connector) and produce " +
      "intermittent stalling / no-start / misfire conditions. Ford has " +
      "issued TSBs and some Customer Satisfaction Programs covering FPDM " +
      "concerns but the author cannot confirm a single NHTSA recall number " +
      "that broadly covers FPDM failures across 2009-2014 F-150s. Owners " +
      "experiencing the symptom pattern (sudden stall at speed, restart " +
      "after cool-down, P0231 / P0232 / P0093 / P016B codes) should run " +
      "their VIN through NHTSA recall lookup.",
    inspectionHint:
      "Crawl under the truck and locate the FPDM (driver's side, behind the " +
      "rear axle, mounted to the frame rail with a black plastic cover). " +
      "Look for green corrosion at the connector and rust on the module " +
      "housing. Scan for P0231 / P0232 / P0093 / P016B DTCs.",
    safetyNote:
      "FPDM failure can cause sudden stall at any speed including highway. " +
      "Treat any unexplained stall on a 2009-2014 F-150 as a possible FPDM " +
      "concern until ruled out.",
    sourceCitationKey: "recall-context-fpdm",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── Fuel tank strap corrosion context ─────────────────────────────────
  {
    id: "recall-context-fuel-tank-strap-corrosion",
    sourceType: "recall",
    sourceLabel: "NHTSA — Fuel tank strap corrosion context",
    title: "Fuel tank strap corrosion context — salt-belt F-150s",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["underbody"],
    issueAreaIds: ["underbody_frame_corrosion"],
    partTags: ["frame_section"],
    symptomTags: ["rust", "corrosion"],
    aliases: [
      "fuel tank strap recall context",
      "tank strap corrosion",
      "fuel tank fall recall",
      "F-150 tank strap rust",
      "연료탱크 스트랩 리콜",
    ],
    excerpt:
      "Salt-belt 12th-gen F-150s have seen documented fuel tank strap " +
      "corrosion that can ultimately allow the tank to drop. While there " +
      "have been NHTSA investigations and some VIN-specific corrective " +
      "actions, the author cannot confirm a single broad F-150 recall " +
      "number for this concern in the 2009-2014 range. Korea-imported " +
      "trucks driven through brine-treated winters carry equivalent " +
      "exposure. Routine underbody inspection is the practical control.",
    inspectionHint:
      "Inspect both fuel tank strap mounts at annual service. Tap with a " +
      "screwdriver handle — solid metal rings, rusted-through metal sounds " +
      "dull. Replace strap proactively if pitting exceeds about 40 percent " +
      "of metal thickness. Replacement is inexpensive ($30-60 in parts) " +
      "compared to the consequence of tank drop.",
    safetyNote:
      "A tank that drops while driving creates a major fire risk. Treat " +
      "any visible strap pitting / scaling as immediate action.",
    sourceCitationKey: "recall-context-fuel-tank-strap",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ─────────────────────────────────────────────────────────────────────
  // LIGHTING / ELECTRICAL (4 entries)
  // ─────────────────────────────────────────────────────────────────────

  // ── 13V282000 — headlight switch overheat (small batch) ───────────────
  {
    id: "recall-13v282000-headlight-switch", // VERIFY — LOWER CONFIDENCE
    sourceType: "recall",
    sourceLabel: "NHTSA Recall 13V282000",
    title: "Recall 13V282000 — Headlight switch overheat (small 2013 batch)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["electrical", "lighting"],
    issueAreaIds: ["lighting_socket_wiring"],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "13V282000",
      "13V-282",
      "headlight switch recall",
      "headlight switch overheat",
      "dash switch fire risk",
      "헤드라이트 스위치 리콜",
    ],
    excerpt:
      "NHTSA campaign 13V282000 (issued 2013): a small-batch recall on a " +
      "subset of 2013 F-150 trucks where the dash-mounted headlight switch " +
      "assembly may overheat at the internal contacts under sustained high " +
      "load (e.g., upgrade-bulb installations drawing more than spec) and " +
      "in some cases melt the switch housing. Remedy: free dealer " +
      "inspection and replacement of the switch assembly. VERIFY — campaign " +
      "number held with medium confidence; defect pattern matches known " +
      "Ford-era headlight switch failures but the exact NHTSA ID should " +
      "be confirmed.",
    inspectionHint:
      "Operate the headlight switch through all positions (parking, low, " +
      "auto, high). Feel the bezel after 10-15 minutes of headlight " +
      "operation — any noticeable heat or discoloration is abnormal. The " +
      "risk is heightened on any truck with aftermarket high-wattage " +
      "halogens; HID / LED conversions actually reduce the load and the " +
      "risk.",
    safetyNote:
      "An overheating switch can cause dash fire. Do not use upgrade " +
      "halogens on a truck with this recall open.",
    sourceCitationKey: "13V282000",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── 13V224000 — headlight wiring (campaign context) ───────────────────
  {
    id: "recall-13v224000-headlight-wiring", // VERIFY — LOWER CONFIDENCE
    sourceType: "recall",
    sourceLabel: "NHTSA Recall 13V224000",
    title: "Recall 13V224000 — Headlight wiring harness (2011-2013)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["electrical", "lighting", "connectors_harness"],
    issueAreaIds: ["lighting_socket_wiring", "connector_and_harness_fitment"],
    partTags: ["lamp_socket", "headlight_housing", "ignition_harness"],
    symptomTags: ["corrosion"],
    aliases: [
      "13V224000",
      "13V-224",
      "headlight wiring recall",
      "headlight harness recall",
      "headlight failure recall",
      "헤드라이트 와이어링 리콜",
    ],
    excerpt:
      "NHTSA campaign 13V224000 (issued 2013): affects a subset of 2011-2013 " +
      "F-150 trucks with headlight wiring harness routing or socket " +
      "concerns that can produce intermittent headlight failure or melted " +
      "socket. Remedy: free dealer inspection and replacement / re-routing " +
      "of the affected harness section. VERIFY — campaign number is from " +
      "training knowledge of the Ford headlight-harness recall pattern of " +
      "the early-2010s and should be cross-checked.",
    inspectionHint:
      "Check both headlights for intermittent function. Pull each headlight " +
      "connector and inspect for green corrosion, melted pin housing, or " +
      "discolored wires. Look at the harness routing from the rear of each " +
      "headlight housing toward the firewall for any chafing against body " +
      "edges.",
    sourceCitationKey: "13V224000",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── Daytime running light context ─────────────────────────────────────
  {
    id: "recall-context-drl-2009-2014",
    sourceType: "recall",
    sourceLabel: "NHTSA — DRL / lighting context",
    title: "DRL / lighting recall context — Canadian-spec and US-spec differences",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["lighting", "electrical"],
    issueAreaIds: ["lighting_socket_wiring"],
    partTags: ["lamp_socket", "headlight_housing", "light_bulb"],
    symptomTags: [],
    aliases: [
      "DRL recall F-150",
      "daytime running light recall",
      "Canadian F-150 lighting recall",
      "DRL 리콜",
      "주간주행등 리콜",
    ],
    excerpt:
      "Daytime Running Light (DRL) and headlight beam concerns on Canadian-" +
      "spec 12th-gen F-150 trucks have triggered isolated recall and TSB " +
      "activity that does not apply to US-spec vehicles. Korea-imported " +
      "trucks are typically US-spec and not affected by the Canadian-only " +
      "campaigns, but it's worth checking the VIN against ALL applicable " +
      "campaigns to be sure. The author has chosen NOT to assign specific " +
      "NHTSA / Transport Canada numbers here.",
    inspectionHint:
      "Verify both low-beam, high-beam, and (if equipped) DRL function from " +
      "outside the truck during the day and at dusk. If any function is " +
      "intermittent or weak, scan body control module (BCM) DTCs.",
    sourceCitationKey: "recall-context-drl",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── Body control module / electrical fire context ─────────────────────
  {
    id: "recall-context-bcm-electrical-fire",
    sourceType: "recall",
    sourceLabel: "NHTSA — Body Control Module electrical fire context",
    title: "BCM / underhood electrical fire context — F-150 2009-2014",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["electrical", "battery_ground"],
    issueAreaIds: ["battery_charge_and_ground_path"],
    partTags: ["battery", "battery_terminal"],
    symptomTags: ["corrosion"],
    aliases: [
      "BCM fire risk",
      "electrical fire recall context",
      "underhood fire F-150",
      "battery terminal fire",
      "전기 화재 리콜 컨텍스트",
    ],
    excerpt:
      "Various underhood electrical fire investigations have touched the " +
      "12th-gen F-150 lineup, including concerns around the battery junction " +
      "box (BJB), starter solenoid, and PJB (passenger junction box). The " +
      "Gen 2 Raptor saw multiple formal recalls in this space (18V894000, " +
      "19V278000, 19V805000) — the 12th-gen F-150 has had narrower / VIN-" +
      "specific actions but no broad recall match to the author's training " +
      "knowledge. Owners noticing burning smell or melted plastic under the " +
      "hood should treat as an immediate stop-driving condition and run " +
      "their VIN through NHTSA recall lookup.",
    inspectionHint:
      "At every service, inspect battery terminals, the BJB top cover, and " +
      "all visible underhood wiring for heat damage, melted insulation, or " +
      "discoloration. Any underhood burning smell is an immediate concern.",
    safetyNote:
      "Underhood fire risk — if any burning smell or smoke is detected, " +
      "pull over, disconnect the negative battery terminal, and arrange " +
      "tow service. Do not continue driving.",
    sourceCitationKey: "recall-context-bcm-fire",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ─────────────────────────────────────────────────────────────────────
  // TRANSMISSION / DRIVETRAIN (3 entries)
  // ─────────────────────────────────────────────────────────────────────

  // ── 6R80 transmission recall context ──────────────────────────────────
  {
    id: "recall-context-6r80-transmission",
    sourceType: "recall",
    sourceLabel: "NHTSA — 6R80 transmission recall context",
    title: "6R80 transmission recall context — 12th-gen F-150 (NOT the Gen 2 Raptor 10R80)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical", "drivetrain_4wd"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "6R80 recall context",
      "6R80 transmission recall F-150",
      "6R80 valve body recall",
      "6R80 솔레노이드 리콜 컨텍스트",
    ],
    excerpt:
      "The 6R80 6-speed automatic used in 2011-2014 F-150 (3.5L EcoBoost, " +
      "5.0L Coyote, 6.2L Boss, and 2010.5+ SVT Raptor) has seen TSB " +
      "activity primarily (TSB 12-9-15 covered in svt-raptor-gen1.ts, TSB " +
      "14-0067 and 14-0181 covered in nhtsa-tsbs-comprehensive.ts) rather " +
      "than broad NHTSA recalls. The 10R80 used in the Gen 2 Raptor saw " +
      "the major output-shaft-roll-pin recall 18V213000 — but that recall " +
      "DOES NOT apply to the 12th-gen 6R80. Owners should verify VIN " +
      "against all applicable campaigns to be sure.",
    inspectionHint:
      "On any 6R80 complaint (1-2 flare, harsh shift, slipping), the first " +
      "step is to confirm TCM software level at the dealer and verify any " +
      "VIN-specific service messages. The vast majority of 6R80 fixes are " +
      "TSB-level (reflash + adaptive reset + correct Mercon LV fill) rather " +
      "than recall-level.",
    sourceCitationKey: "recall-context-6r80",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── Driveshaft / U-joint context ──────────────────────────────────────
  {
    id: "recall-context-driveshaft-ujoint",
    sourceType: "recall",
    sourceLabel: "NHTSA — Driveshaft / U-joint context",
    title: "Driveshaft / U-joint recall context — 12th-gen F-150 4x4",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: ["drivetrain_leak_or_boot"],
    partTags: ["driveshaft_u_joint", "transfer_case_area"],
    symptomTags: ["vibration", "clunk"],
    aliases: [
      "driveshaft recall context",
      "U-joint recall context",
      "driveshaft separation",
      "프로펠러샤프트 리콜 컨텍스트",
    ],
    excerpt:
      "Field reports of U-joint failures on 4x4 12th-gen F-150 trucks are " +
      "well-documented (especially on lifted / large-tire / hard-off-road " +
      "trucks) but did not produce a broad NHTSA recall to the author's " +
      "training knowledge. Some VIN-specific TSB and CSP coverage may " +
      "apply. Korea-driven trucks with mixed off-road use should monitor " +
      "U-joint condition proactively rather than waiting for symptoms.",
    inspectionHint:
      "Check each U-joint by grasping the driveshaft and rocking it — any " +
      "perceptible play at the cross indicates wear. Look for rust streaks " +
      "running down from the U-joint cap (a sign the seal has failed and " +
      "needles have rusted). Replace at the first sign of vibration or " +
      "clunk on takeoff.",
    sourceCitationKey: "recall-context-driveshaft",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── IWE / front hub vacuum context ────────────────────────────────────
  {
    id: "recall-context-iwe-vacuum-2009-2014",
    sourceType: "recall",
    sourceLabel: "NHTSA — IWE / front hub vacuum context",
    title: "IWE (Integrated Wheel End) recall context — 12th-gen F-150 4x4",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: ["drivetrain_leak_or_boot"],
    partTags: ["iwe_solenoid_actuator"],
    symptomTags: ["clunk", "rattle"],
    aliases: [
      "IWE recall context F-150",
      "Integrated Wheel End recall",
      "front hub vacuum recall",
      "IWE grinding recall context",
      "IWE 솔레노이드 리콜 컨텍스트",
    ],
    excerpt:
      "The 12th-gen F-150 uses an IWE (Integrated Wheel End) vacuum-actuated " +
      "front hub system to engage / disengage the front axles between 2WD " +
      "and 4WD. IWE grinding complaints are extremely common — see the " +
      "Gen 2 Raptor IWE TSB in raptor-tsbs.ts for the equivalent treatment. " +
      "On the 12th-gen, Ford addressed IWE concerns via TSBs rather than " +
      "a broad NHTSA recall. Replacement of cracked vacuum lines, check " +
      "valves, and (rarely) IWE actuators is the field fix.",
    inspectionHint:
      "Switch from 2WD to 4 Auto / 4H on a paved road and listen at each " +
      "front wheel. Grinding from a wheel = IWE not fully engaging. Smoke-" +
      "test all front-end vacuum lines, including the small line routed " +
      "near the air box, before replacing the IWE actuator (the actuator " +
      "is usually NOT the failed part).",
    sourceCitationKey: "recall-context-iwe-vacuum",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ─────────────────────────────────────────────────────────────────────
  // SAFETY RESTRAINTS / AIRBAGS (2 entries)
  // ─────────────────────────────────────────────────────────────────────

  // ── Takata airbag inflator recall context ─────────────────────────────
  {
    id: "recall-context-takata-airbag",
    sourceType: "recall",
    sourceLabel: "NHTSA — Takata airbag inflator context",
    title: "Takata airbag inflator recall context — F-150 NOT widely affected",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Takata airbag recall",
      "Takata inflator F-150",
      "Takata recall context F-150",
      "Ford Takata recall",
      "에어백 리콜 컨텍스트",
      "타카타 에어백",
    ],
    excerpt:
      "The historic Takata airbag inflator recall — the largest automotive " +
      "recall in US history — affected millions of vehicles across many " +
      "brands. The 2009-2014 F-150 was generally NOT in the broad Takata " +
      "campaigns (Ford used non-Takata inflators for most F-150 " +
      "applications of this era). Some niche VIN ranges may have been " +
      "swept into related actions. Every owner should run their VIN " +
      "through NHTSA recall lookup to be certain — but the F-150 is not " +
      "typically the high-risk vehicle for Takata exposure that the Ford " +
      "Mustang, Ranger (pre-2011), or other early-2000s Ford models were.",
    inspectionHint:
      "Run the VIN through NHTSA recall lookup. If a Takata-related " +
      "inflator recall does appear, schedule immediately — the consequence " +
      "of inflator rupture in a crash is potentially fatal (metal fragment " +
      "ejection into the cabin).",
    safetyNote:
      "Takata inflator rupture is a recognized cause of fatal injury in a " +
      "collision. Do not delay completion if a campaign applies to the VIN.",
    sourceCitationKey: "recall-context-takata-airbag",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── Seat belt / restraint context ─────────────────────────────────────
  {
    id: "recall-context-seatbelt-restraint",
    sourceType: "recall",
    sourceLabel: "NHTSA — Seat belt / restraint context",
    title: "Seat belt / restraint recall context — F-150 2009-2014",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "seat belt recall context",
      "restraint recall F-150",
      "pretensioner recall",
      "안전벨트 리콜 컨텍스트",
    ],
    excerpt:
      "Isolated VIN-specific seat belt buckle / pretensioner / retractor " +
      "concerns have produced Customer Satisfaction Programs on the 12th-" +
      "gen F-150 but the author cannot confirm a broad NHTSA recall " +
      "campaign that covers the full lineup. Owners noticing any belt " +
      "abnormality (slow retractor return, buckle that doesn't latch " +
      "firmly, retractor stuck) should ask their dealer to search for " +
      "VIN-specific service messages.",
    inspectionHint:
      "Test each belt: pull out fully, release, and verify smooth retraction. " +
      "Buckle should latch with a firm click and release with the button. " +
      "Any abnormality is a free dealer inspection candidate.",
    sourceCitationKey: "recall-context-seatbelt",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ─────────────────────────────────────────────────────────────────────
  // STEERING / SUSPENSION (2 entries)
  // ─────────────────────────────────────────────────────────────────────

  // ── EPAS electric power steering context ──────────────────────────────
  {
    id: "recall-context-epas-steering",
    sourceType: "recall",
    sourceLabel: "NHTSA — EPAS (electric power steering) context",
    title: "EPAS electric power steering recall context — 2011-2014 F-150",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["suspension_steering", "electrical"],
    issueAreaIds: ["steering_linkage_wear"],
    partTags: ["tie_rod_end"],
    symptomTags: ["pull"],
    aliases: [
      "EPAS recall context",
      "electric power steering recall",
      "EPAS failure F-150",
      "power steering assist loss",
      "EPAS 리콜 컨텍스트",
      "전자식 파워스티어링",
    ],
    excerpt:
      "The 2011+ 12th-gen F-150 introduced EPAS (Electric Power Assisted " +
      "Steering) replacing the previous hydraulic power steering system. " +
      "EPAS failures (loss of assist, intermittent assist, wandering, " +
      "DTCs on the EPAS module) have been the subject of TSBs and some " +
      "VIN-specific actions but the author cannot confirm a single broad " +
      "NHTSA recall covering EPAS across the full 2011-2014 F-150 lineup. " +
      "When assist is lost, the steering reverts to manual — steering is " +
      "still possible but very heavy.",
    inspectionHint:
      "Drive in a parking lot at low speed with intentional small steering " +
      "inputs — verify assist is consistent. Watch for sudden heaviness " +
      "or sudden warning lights on the dash (EPAS yellow steering icon). " +
      "Any EPAS DTC is a free dealer inspection candidate.",
    safetyNote:
      "Loss of steering assist makes the truck very difficult to steer at " +
      "low speeds. If EPAS warning illuminates, drive directly to a safe " +
      "location and arrange service.",
    sourceCitationKey: "recall-context-epas",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ── Front lower ball joint context ────────────────────────────────────
  {
    id: "recall-context-front-ball-joint",
    sourceType: "recall",
    sourceLabel: "NHTSA — Front lower ball joint context",
    title: "Front lower ball joint context — 12th-gen F-150 wear concern",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["suspension_steering"],
    issueAreaIds: ["front_suspension_joint_play"],
    partTags: ["ball_joint", "control_arm"],
    symptomTags: ["clunk", "vibration"],
    aliases: [
      "front ball joint recall context",
      "lower ball joint F-150",
      "ball joint failure",
      "볼조인트 리콜 컨텍스트",
    ],
    excerpt:
      "Front lower ball joint wear is a well-known weak point on the 12th-" +
      "gen F-150 — replacement at 100K-150K miles is essentially a " +
      "scheduled service for this platform. Ford did not issue a broad " +
      "recall to the author's training knowledge, though some VIN-specific " +
      "actions exist. The aftermarket fix (Moog problem solver, Mevotech, " +
      "OEM Motorcraft) is well-documented and parts are inexpensive " +
      "($30-80 per ball joint).",
    inspectionHint:
      "Lift the front of the truck so the lower control arm is at full " +
      "droop, then rock each front tire top-to-bottom while a helper " +
      "watches the lower ball joint — any visible play means replacement " +
      "due. Listen for clunk over bumps as an early symptom.",
    safetyNote:
      "Ball joint separation can cause loss of steering control. Replace " +
      "at the first sign of play — do not let it progress to outright " +
      "failure.",
    sourceCitationKey: "recall-context-ball-joint",
    sourceUrl: "https://www.nhtsa.gov/recalls",
  },

  // ─────────────────────────────────────────────────────────────────────
  // FORD CUSTOMER SATISFACTION PROGRAM CONTEXT (closing entry)
  // ─────────────────────────────────────────────────────────────────────

  // ── How CSPs differ from formal NHTSA recalls ─────────────────────────
  {
    id: "recall-context-csp-vs-recall",
    sourceType: "recall",
    sourceLabel: "NHTSA / Ford — CSP vs Recall reference",
    title: "Customer Satisfaction Program (CSP) vs NHTSA Recall — meaning for owners",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical", "electrical", "brakes"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "CSP vs recall",
      "Customer Satisfaction Program meaning",
      "Ford CSP definition",
      "owner notification difference",
      "CSP 정의",
      "고객 만족 프로그램",
    ],
    excerpt:
      "Many real Ford-issued service actions on the 2009-2014 F-150 are NOT " +
      "formal NHTSA recalls but Customer Satisfaction Programs (CSPs) — " +
      "also called Service Programs (SP) or Field Service Actions (FSA). " +
      "Key differences: (1) Recalls are mandated by NHTSA when a safety " +
      "defect is identified; CSPs are voluntary Ford actions, often for " +
      "non-safety concerns or for narrow VIN windows. (2) Recalls have a " +
      "campaign number in the YYVnnnnnn format and appear on NHTSA's " +
      "public recall lookup; CSPs have Ford internal numbers (often " +
      "NNANN or NNNANN format like 13B07, 14N04, 16N06) and may NOT " +
      "appear on NHTSA's site — owners must ask the dealer to search " +
      "Ford's PTS / OASIS for VIN-specific service messages. (3) Both " +
      "are no-cost repairs to the owner regardless of warranty status. " +
      "(4) CSPs sometimes have a time limit (e.g., '7 years from in-service " +
      "date') after which they expire; recalls do not expire. For Korean " +
      "owners of imported trucks, ALWAYS request both NHTSA recall lookup " +
      "AND a Ford OASIS service-message search to find every applicable " +
      "free repair.",
    inspectionHint:
      "When buying a used 2009-2014 F-150, request the seller pull a Ford " +
      "OASIS report (about $20-30 from any Ford dealer with a service " +
      "lookup, or free with a service visit) — this shows ALL VIN-" +
      "specific CSP and recall completions across the truck's history, " +
      "not just NHTSA-flagged items.",
    sourceCitationKey: "recall-context-csp-vs-recall",
    sourceUrl: "https://www.ford.com/support/recalls/",
  },
];

// ═══════════════════════════════════════════════════════════════════════
//  HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Vehicle scope IDs that correspond to each model year. The 12th-gen F-150
 * lineup ran 2009-2014. Specific engine vehicleIds map to their respective
 * production years per the app-config.ts definitions. Year-to-scope mapping
 * is best-effort — recalls listed against F150_GENERAL_VEHICLE_ID apply
 * across the lineup.
 */
const YEAR_TO_VEHICLE_SCOPES: Record<number, string[]> = {
  2009: [
    F150_GENERAL_VEHICLE_ID,
    SUPPORTED_VEHICLE_ID,
    TRITON_4_6_3V_VEHICLE_ID,
  ],
  2010: [
    F150_GENERAL_VEHICLE_ID,
    SUPPORTED_VEHICLE_ID,
    TRITON_4_6_3V_VEHICLE_ID,
    SVT_RAPTOR_GEN1_VEHICLE_ID,
  ],
  2011: [
    F150_GENERAL_VEHICLE_ID,
    SUPPORTED_VEHICLE_ID,
    ECOBOOST_VEHICLE_ID,
    COYOTE_VEHICLE_ID,
    BOSS_VEHICLE_ID,
    V6_3_7_VEHICLE_ID,
    SVT_RAPTOR_GEN1_VEHICLE_ID,
  ],
  2012: [
    F150_GENERAL_VEHICLE_ID,
    SUPPORTED_VEHICLE_ID,
    ECOBOOST_VEHICLE_ID,
    COYOTE_VEHICLE_ID,
    BOSS_VEHICLE_ID,
    V6_3_7_VEHICLE_ID,
    SVT_RAPTOR_GEN1_VEHICLE_ID,
  ],
  2013: [
    F150_GENERAL_VEHICLE_ID,
    SUPPORTED_VEHICLE_ID,
    ECOBOOST_VEHICLE_ID,
    COYOTE_VEHICLE_ID,
    BOSS_VEHICLE_ID,
    V6_3_7_VEHICLE_ID,
    SVT_RAPTOR_GEN1_VEHICLE_ID,
  ],
  2014: [
    F150_GENERAL_VEHICLE_ID,
    SUPPORTED_VEHICLE_ID,
    ECOBOOST_VEHICLE_ID,
    COYOTE_VEHICLE_ID,
    BOSS_VEHICLE_ID,
    V6_3_7_VEHICLE_ID,
    SVT_RAPTOR_GEN1_VEHICLE_ID,
  ],
};

/**
 * Year-specific keyword hints to refine matching. Many recall excerpts
 * contain explicit year ranges like "2010-2012" or "2013-2014" — we match
 * those against the year argument as a secondary filter beyond vehicleScope.
 */
function excerptMentionsYear(excerpt: string, year: number): boolean {
  const yearStr = String(year);
  // Match a bare year, a year range (e.g., "2010-2012"), or a year in a
  // larger context. This is a coarse heuristic — false positives are OK
  // because the vehicleScope is the primary filter.
  if (excerpt.includes(yearStr)) return true;

  // Match year ranges like "2009-2014", "2010-2012", "2011-2014"
  const rangeRegex = /(\d{4})\s*[-–]\s*(\d{4})/g;
  let match: RegExpExecArray | null;
  while ((match = rangeRegex.exec(excerpt)) !== null) {
    const start = Number(match[1]);
    const end = Number(match[2]);
    if (year >= start && year <= end) return true;
  }
  return false;
}

/**
 * Return recall records that apply to a given model year (2009-2014).
 * Combines vehicleScope filtering with excerpt-text year mention.
 */
export function getRecallsByYear(year: number): TruckReferenceRecord[] {
  if (year < 2009 || year > 2014) return [];
  const validScopes = new Set(YEAR_TO_VEHICLE_SCOPES[year] ?? []);
  return RECALL_CAMPAIGNS_COMPREHENSIVE_REFERENCES.filter((record) => {
    if (validScopes.has(record.vehicleScope)) {
      // vehicleScope matches the year — return unless the excerpt explicitly
      // limits to a narrower range that excludes this year
      if (excerptMentionsYear(record.excerpt, year)) return true;
      // If excerpt mentions specific year(s) and the requested year is not
      // among them, fall through to false. But many "general" records don't
      // narrow further — keep those by default.
      const hasExplicitYear = /\b(20\d{2})\b/.test(record.excerpt);
      return !hasExplicitYear;
    }
    return false;
  });
}

/**
 * Engine ID matching. Accepts a vehicleId string (e.g., the 3.5L EcoBoost
 * ID or the 6.2L Boss ID) and returns recalls scoped to that engine OR
 * scoped to F150_GENERAL_VEHICLE_ID (which applies across the lineup).
 */
export function getRecallsByEngine(engineId: string): TruckReferenceRecord[] {
  return RECALL_CAMPAIGNS_COMPREHENSIVE_REFERENCES.filter(
    (record) =>
      record.vehicleScope === engineId ||
      record.vehicleScope === F150_GENERAL_VEHICLE_ID,
  );
}

/**
 * VIN-based completion lookup placeholder. A real implementation requires
 * calling the NHTSA VIN recall API (https://api.nhtsa.gov/recalls/...) or
 * Ford's VIN lookup service. This module is intentionally network-free —
 * callers must wire up the network layer separately.
 *
 * The `never` return type signals to TypeScript callers that this function
 * always throws and should be replaced before production use.
 */
export function isRecallCompletedByVin(vin: string): never {
  throw new Error(
    `isRecallCompletedByVin('${vin}') — not implemented. ` +
      "VIN completion lookup requires the NHTSA recall API or Ford VIN " +
      "lookup endpoint. Replace with a real network call before use. " +
      "See https://api.nhtsa.gov/recalls and https://www.ford.com/support/recalls/.",
  );
}

/**
 * Look up a recall record by its NHTSA campaign number. Accepts either
 * the full YYVnnnnnn format (e.g., "15V174000") or the hyphenated short
 * form (e.g., "15V-174"). Returns null when not found.
 */
export function getRecallCampaign(
  campaignNumber: string,
): TruckReferenceRecord | null {
  const normalized = campaignNumber.replace(/-/g, "").toUpperCase().trim();
  for (const record of RECALL_CAMPAIGNS_COMPREHENSIVE_REFERENCES) {
    for (const alias of record.aliases) {
      const normalizedAlias = alias.replace(/-/g, "").toUpperCase().trim();
      if (normalizedAlias === normalized) return record;
    }
    // Also check by sourceCitationKey
    if (
      record.sourceCitationKey.replace(/-/g, "").toUpperCase() === normalized
    ) {
      return record;
    }
  }
  return null;
}
