// Transmission-specific sound knowledge for the 12th-generation Ford F-150.
//
// Three transmissions appear across 2009-2014:
//   - 4R70E: pre-2009 carryover, paired with 4.6L/5.4L on the earliest builds
//   - 4R75E: 2009-2010, paired with 4.6L/5.4L (the type union exposes this id)
//   - 6R80: 2011+, paired with all engines from the 2011 lineup
//
// Verifiable Ford TSB references in this file:
//   - TSB 10-6-6: 6R80 shift shudder — fluid change to Mercon LV often resolves
// Other transmission "TSB-flagged" language is generic and not tied to a
// specific document number, so no number is fabricated.
//
// Scope note: `TruckSoundRecord` has no `transmissionScope` field. Trans
// scope is encoded inline via `description` + `aliases` for text matching.

import type { TruckSoundRecord } from "@/lib/knowledge/sound/types";

export const TRANSMISSION_SOUND_PATTERNS: TruckSoundRecord[] = [
  // ── 4R70E (pre-2009 carryover) ────────────────────────────────────────
  {
    category: "rough_idle_misfire",
    aliases: ["4r70e tcc shudder", "4r70e light throttle shudder"],
    cadenceTags: ["shudder", "light-throttle", "40-65-mph"],
    description:
      "4R70E (pre-2009 carryover): torque-converter-clutch shudder at 40-65 mph under light throttle. Mercon V fluid degrades and the lockup clutch chatters before fully engaging.",
    inspectionHint:
      "Record at steady 50 mph with very light throttle on a flat road; shudder feels like rumble strips.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["drivetrain_4wd"],
    nextSafeStep:
      "Try a Mercon V drain-and-fill (4R70E uses Mercon V, NOT Mercon LV) before condemning the converter.",
    normality: "abnormal",
    operatingConditions: ["under_load", "warm_idle"],
    pitchTags: ["low", "rumble"],
    severityHint: "medium",
  },
  {
    category: "rough_idle_misfire",
    aliases: ["4r70e 2-3 shift flare", "4r70e shift flare"],
    cadenceTags: ["flare", "shift-event", "2-3-upshift"],
    description:
      "4R70E: 2-3 shift flare — RPM briefly rises before the next gear engages. Indicates worn 2-3 accumulator or band wear at higher mileage.",
    inspectionHint:
      "Catch the tachometer behavior on the 2-3 upshift under moderate throttle.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["drivetrain_4wd"],
    nextSafeStep:
      "Inspect line pressure and accumulator; shop diagnosis recommended before driving heavily loaded.",
    normality: "abnormal",
    operatingConditions: ["under_load"],
    pitchTags: ["medium", "rising"],
    severityHint: "medium",
  },
  {
    category: "alternator_bearing_noise",
    aliases: ["4r70e planetary whine", "4r70e gear whine"],
    cadenceTags: ["whine", "rpm-locked", "high-mileage"],
    description:
      "4R70E: planetary gear-set whine at higher mileage — tracks output RPM, not engine RPM. Distinct from accessory drive or wheel-bearing whine.",
    inspectionHint:
      "Verify pitch changes with vehicle speed in a fixed gear, not with engine RPM at idle.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["drivetrain_4wd"],
    nextSafeStep:
      "Shop diagnosis — planetary wear usually means rebuild or replacement.",
    normality: "abnormal",
    operatingConditions: ["under_load"],
    pitchTags: ["high", "whine"],
    severityHint: "high",
  },

  // ── 4R75E (2009-2010, paired with 4.6L / 5.4L) ────────────────────────
  {
    category: "rough_idle_misfire",
    aliases: ["4r75e tcc shudder", "4r75e torque converter shudder"],
    cadenceTags: ["shudder", "light-throttle", "40-60-mph"],
    description:
      "4R75E (2009-2010 5.4L/4.6L pairing): torque-converter shudder at 40-60 mph light throttle — same root cause as the 4R70E. Lockup clutch wears; 80-180k mi onset.",
    inspectionHint:
      "Steady cruise 50 mph, very light throttle; shudder feels like driving over rumble strips.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["drivetrain_4wd"],
    nextSafeStep:
      "Mercon LV drain-and-fill (4R75E spec) first; advanced shudder = converter replacement (trans-out job).",
    normality: "abnormal",
    operatingConditions: ["under_load"],
    pitchTags: ["low", "rumble"],
    severityHint: "medium",
  },
  {
    category: "tensioner_noise",
    aliases: ["4r75e solenoid chatter", "4r75e solenoid buzz"],
    cadenceTags: ["chatter", "buzz", "shift-event"],
    description:
      "4R75E: solenoid chatter during shift events — owner-reported on 2009-2010 builds. Often a precursor to harder shifts.",
    inspectionHint:
      "Record audio under the truck near the valve body during shifting.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["drivetrain_4wd"],
    nextSafeStep:
      "Pull trans codes with FORScan/IDS; solenoid replacement is shop-level on the 4R75E.",
    normality: "abnormal",
    operatingConditions: ["under_load", "light_rpm_blip"],
    pitchTags: ["medium", "buzz"],
    severityHint: "medium",
  },

  // ── 6R80 (2011+, all engines) ─────────────────────────────────────────
  {
    category: "rough_idle_misfire",
    aliases: ["6r80 1-2 shift flare", "6r80 shift flare", "6r80 shift shudder"],
    cadenceTags: ["flare", "shudder", "1-2-upshift", "3-4-upshift"],
    description:
      "6R80 (2011-2014): shift shudder/flare on 1-2 or 3-4 upshifts under light throttle. Ford TSB 10-6-6 covers this — fluid change to the correct Mercon LV often resolves early cases.",
    inspectionHint:
      "Record tach + audio during 1-2 and 3-4 shifts on a level road, light throttle.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["drivetrain_4wd"],
    nextSafeStep:
      "Drain-and-fill with Mercon LV ONLY (6 qt drop, 13.1 qt total) per TSB 10-6-6. Wrong fluid WILL cause shift problems.",
    normality: "abnormal",
    operatingConditions: ["under_load", "light_rpm_blip"],
    pitchTags: ["low", "rumble"],
    severityHint: "medium",
  },
  {
    category: "rough_idle_misfire",
    aliases: [
      "6r80 torque converter shudder",
      "6r80 tcc shudder",
      "6r80 cruise shudder",
    ],
    cadenceTags: ["shudder", "40-65-mph", "light-throttle"],
    description:
      "6R80: torque-converter-clutch shudder at 40-65 mph cruise. Degraded Mercon LV is the usual cause; persistence after a fluid change indicates the TCC itself.",
    inspectionHint:
      "Steady cruise 50 mph on flat ground; note shudder onset RPM and gear.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["drivetrain_4wd"],
    nextSafeStep:
      "Mercon LV change + Lubegard Instant Shudder Fix; drive 100+ mi to evaluate. Persistent shudder = converter, not full rebuild.",
    normality: "abnormal",
    operatingConditions: ["under_load"],
    pitchTags: ["low", "rumble"],
    severityHint: "medium",
  },
  {
    category: "tensioner_noise",
    aliases: ["6r80 valve body solenoid buzz", "6r80 solenoid buzz"],
    cadenceTags: ["buzz", "shift-event", "metallic"],
    description:
      "6R80: valve-body solenoid buzz during shift events — owner-reported. Often pairs with delayed or harsh shifts and can be an early warning before the lead frame fails.",
    inspectionHint:
      "Audio from beneath the trans pan during shifts; check FORScan for any shift-quality DTCs.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["drivetrain_4wd"],
    nextSafeStep:
      "Plan a valve-body inspection; do not ignore — lead-frame failure is a tow-home event.",
    normality: "abnormal",
    operatingConditions: ["under_load", "light_rpm_blip"],
    pitchTags: ["medium", "buzz"],
    severityHint: "medium",
  },
  {
    category: "belt_chirp",
    aliases: ["6r80 lead frame chirp", "6r80 lead-frame chirp"],
    cadenceTags: ["chirp", "shift-event", "intermittent"],
    description:
      "6R80: a brief chirp/squeak at shift events that owners associate with the lead-frame wiring inside the valve body. Stronger predictor of impending shift-quality failure than a steady buzz.",
    inspectionHint:
      "Note exact shift point (which upshift) and whether throttle is light or moderate when chirp occurs.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["drivetrain_4wd"],
    nextSafeStep:
      "Shop diagnostic recommended — lead-frame failure can require full valve-body replacement.",
    normality: "abnormal",
    operatingConditions: ["under_load"],
    pitchTags: ["high", "sharp"],
    severityHint: "high",
  },
];
