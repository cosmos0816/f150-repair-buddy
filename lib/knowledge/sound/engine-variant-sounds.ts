// Engine-variant-specific sound knowledge for the 12th-generation Ford F-150
// (2009-2014) lineup. Each engine has signature normal AND abnormal sound
// traits that the engine-agnostic patterns in `abnormal-sound-patterns.ts`
// do not capture. These entries reuse the existing `TruckSoundRecord` shape.
//
// Vehicle scoping note: `TruckSoundRecord` does not currently expose a
// structured `vehicleScope` / `engineId` / `fuelType` field. Engine scope is
// therefore encoded inline into the `description` and `aliases` strings (e.g.
// "2011-2014-ford-f150-3.5-ecoboost") so a text-based matcher can still surface
// the right entry. See header of `types.ts` for the existing record shape.
//
// Sources (only verifiable traits included):
// - research/f150-common-problems-database.md (Ford TSB 08-18-7 cam phaser,
//   TSB 14-0128 CAC condensation)
// - research/engine-comparison-guide.md (per-engine failure mode tables)
// - research/ecoboost-community-knowledge.md (turbo whine, wastegate, BOV,
//   timing chain stretch)
// - research/master-maintenance-guide.md (wastegate actuator, BOV/diverter)

import type { TruckSoundRecord } from "@/lib/knowledge/sound/types";

export const ENGINE_VARIANT_SOUND_PATTERNS: TruckSoundRecord[] = [
  // ── 5.4L 3V Triton (2009-2010) ────────────────────────────────────────
  {
    category: "cam_phaser_rattle",
    aliases: [
      "5.4 3v cam phaser rattle",
      "triton 5.4 phaser knock",
      "cold start phaser knock 5.4",
      "2009-2010-ford-f150-5.4-3v",
    ],
    cadenceTags: ["rattle", "cold-start", "1-3-second-window"],
    description:
      "5.4L 3V Triton signature: a 1-3 second top-engine rattle in the first seconds after cold start, often described as 'typewriter tick' or marble-in-a-can. Diagnostic window closes once oil pressure reaches the phasers. Ford TSB 08-18-7.",
    inspectionHint:
      "Record audio in the first 3 seconds of cold start before the rattle fades. Frame the timing cover and valve covers.",
    likelyIssueAreaIds: ["cam_phaser_tick_context"],
    likelyPartIds: ["cam_phaser_area", "vct_solenoid", "timing_cover"],
    likelySystemIds: ["timing_valvetrain", "engine_mechanical"],
    nextSafeStep:
      "Inspect at first cold-start opportunity — phaser rattle that grows beyond 5 seconds or persists hot indicates worn phasers; budget $2,000-4,000.",
    normality: "abnormal",
    operatingConditions: ["cold_start"],
    pitchTags: ["metallic", "rattle", "upper-engine"],
    severityHint: "high",
  },
  {
    category: "exhaust_tick",
    aliases: [
      "5.4 spark plug whistle",
      "blown plug well whistle",
      "triton plug seat leak",
    ],
    cadenceTags: ["whistle", "synced-to-firing", "high-rpm"],
    description:
      "5.4L 3V Triton: a sharp whistle from a spark plug well after the two-piece plug or the plug seat compromises sealing. Often pairs with a misfire code on that cylinder. Common after a botched plug change.",
    inspectionHint:
      "Show the coil-on-plug area; a hissing/whistling well usually identifies the cylinder.",
    likelyIssueAreaIds: ["ignition_misfire_path", "exhaust_manifold_tick"],
    likelyPartIds: ["spark_plug", "coil", "ignition_harness"],
    likelySystemIds: ["ignition", "engine_mechanical"],
    nextSafeStep:
      "Stop driving on a confirmed blown plug — Heli-Coil or Time-Sert repair is $500-1,500 and gets worse if ignored.",
    normality: "abnormal",
    operatingConditions: ["warm_idle", "under_load", "light_rpm_blip"],
    pitchTags: ["high", "whistle", "sharp"],
    severityHint: "high",
  },
  {
    category: "cam_phaser_rattle",
    aliases: [
      "marble in a can idle",
      "5.4 3v worn phaser idle",
      "phaser hot idle rattle",
    ],
    cadenceTags: ["rattle", "hot-idle", "intermittent"],
    description:
      "5.4L 3V Triton: 'marble in a can' rattle at hot idle indicates phasers worn beyond the cold-start window — wear is advanced. Distinct from the short 1-3s cold-start rattle.",
    inspectionHint:
      "Compare cold-start clip with hot-idle clip; rattle present in both means deeper wear.",
    likelyIssueAreaIds: ["cam_phaser_tick_context"],
    likelyPartIds: ["cam_phaser_area", "vct_solenoid"],
    likelySystemIds: ["timing_valvetrain"],
    nextSafeStep:
      "Schedule phaser + VCT solenoid + timing chain replacement; driving with hot-idle rattle risks chain jump.",
    normality: "abnormal",
    operatingConditions: ["hot_idle", "warm_idle"],
    pitchTags: ["metallic", "rattle"],
    severityHint: "high",
  },

  // ── 4.6L 3V (2009-2010) ───────────────────────────────────────────────
  {
    category: "cam_phaser_rattle",
    aliases: [
      "4.6 3v phaser rattle",
      "4.6 3v cold start tick",
      "2009-2010-ford-f150-4.6-3v",
    ],
    cadenceTags: ["rattle", "cold-start", "subtle"],
    description:
      "4.6L 3V: same VCT-phaser architecture as the 5.4 3V but quieter due to smaller bore/stroke. Cold-start rattle is shorter and softer; easy to miss without a clean recording.",
    inspectionHint:
      "Capture the first 2 seconds of cold start with the hood open and ambient quiet.",
    likelyIssueAreaIds: ["cam_phaser_tick_context"],
    likelyPartIds: ["cam_phaser_area", "vct_solenoid", "timing_cover"],
    likelySystemIds: ["timing_valvetrain"],
    nextSafeStep:
      "Treat like the 5.4 3V phaser path — replace VCT solenoids first ($40-60 each) before condemning phasers.",
    normality: "abnormal",
    operatingConditions: ["cold_start"],
    pitchTags: ["metallic", "rattle", "soft"],
    severityHint: "medium",
  },

  // ── 4.6L 2V (2009-2010) ───────────────────────────────────────────────
  {
    category: "normal_idle",
    aliases: [
      "4.6 2v simple idle",
      "2v triton no phaser",
      "2009-2010-ford-f150-4.6-2v",
    ],
    cadenceTags: ["steady"],
    description:
      "4.6L 2V: no VCT, no cam phasers — absence of any cold-start phaser rattle is normal and expected. Considered the simplest, most reliable engine in the 12th-gen lineup.",
    inspectionHint:
      "Do not interpret a quiet cold start on a 4.6 2V as a fault.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["engine_mechanical"],
    nextSafeStep:
      "Normal baseline — escalate only if a new sound appears.",
    normality: "normal",
    operatingConditions: ["cold_start", "warm_idle"],
    pitchTags: ["low", "mixed"],
    severityHint: "low",
  },
  {
    category: "exhaust_tick",
    aliases: [
      "4.6 2v lifter tick",
      "2v triton high mileage tick",
      "triton 2v lifter",
    ],
    cadenceTags: ["tick", "rapid", "rpm-locked"],
    description:
      "4.6L 2V: hydraulic-lifter tick at high mileage (~150k+ mi) — locked to half engine speed, often improves after a fresh oil change with full synthetic.",
    inspectionHint:
      "Hold the mic over the valve covers; note whether tick reduces 5-10 minutes after a hot oil change.",
    likelyIssueAreaIds: [],
    likelyPartIds: ["spark_plug"],
    likelySystemIds: ["engine_mechanical"],
    nextSafeStep:
      "Try a fresh 5W-20 full-synthetic change first; persistent tick after that points to one collapsed lifter.",
    normality: "context_dependent",
    operatingConditions: ["warm_idle", "hot_idle"],
    pitchTags: ["light", "metallic"],
    severityHint: "low",
  },

  // ── 3.5L EcoBoost (2011-2014) ─────────────────────────────────────────
  {
    category: "normal_fan_or_accessory_ambient",
    aliases: [
      "ecoboost turbo whine on boost",
      "3.5 eb turbo whine normal",
      "2011-2014-ford-f150-3.5-ecoboost",
    ],
    cadenceTags: ["rising-with-boost", "smooth", "whine"],
    description:
      "3.5L EcoBoost: a smooth rising whine on boost is normal turbo operation — healthy compressor wheels spool predictably with throttle.",
    inspectionHint:
      "Confirm the whine rises smoothly with throttle and falls cleanly on let-off — irregular pitch suggests bearing wear.",
    likelyIssueAreaIds: [],
    likelyPartIds: ["turbocharger"],
    likelySystemIds: ["turbo_boost"],
    nextSafeStep:
      "No action — this is the EcoBoost signature owners pay for.",
    normality: "normal",
    operatingConditions: ["under_load", "light_rpm_blip"],
    pitchTags: ["high", "smooth", "rising"],
    severityHint: "low",
  },
  {
    category: "normal_fan_or_accessory_ambient",
    aliases: [
      "ecoboost turbo whoosh",
      "3.5 eb whoosh on lift",
      "diverter valve whoosh",
    ],
    cadenceTags: ["whoosh", "on-throttle-lift", "brief"],
    description:
      "3.5L EcoBoost: a brief whoosh when lifting off boost is the recirculating diverter valve venting — normal and expected.",
    inspectionHint:
      "Confirm whoosh only occurs on throttle lift, not steady cruise.",
    likelyIssueAreaIds: [],
    likelyPartIds: ["blow_off_valve", "charge_pipe"],
    likelySystemIds: ["turbo_boost"],
    nextSafeStep: "No action — normal diverter-valve behavior.",
    normality: "normal",
    operatingConditions: ["light_rpm_blip", "under_load"],
    pitchTags: ["broad", "air", "whoosh"],
    severityHint: "low",
  },
  {
    category: "tensioner_noise",
    aliases: [
      "ecoboost wastegate rattle",
      "3.5 eb wastegate flutter",
      "wastegate actuator rattle cold",
    ],
    cadenceTags: ["rattle", "metallic", "idle", "cold-fades-warm"],
    description:
      "3.5L EcoBoost: wastegate actuator arm rattle at cold idle that quiets as metal expands with heat is a known warranty-era issue. Persistent hot rattle = worn wastegate bushings.",
    inspectionHint:
      "Compare cold-idle and fully-warm-idle clips. Rattle gone hot = normal-ish; rattle remains hot = wastegate rebuild.",
    likelyIssueAreaIds: ["turbo_boost_leak"],
    likelyPartIds: ["wastegate", "turbocharger"],
    likelySystemIds: ["turbo_boost"],
    nextSafeStep:
      "If rattle persists warm, plan a wastegate actuator rebuild ($50-100) before it grows into a turbo replacement.",
    normality: "context_dependent",
    operatingConditions: ["cold_start", "warm_idle"],
    pitchTags: ["metallic", "rattle"],
    severityHint: "medium",
  },
  {
    category: "belt_chirp",
    aliases: [
      "ecoboost bov chirp",
      "3.5 eb chirp under load",
      "carbon buildup chirp",
    ],
    cadenceTags: ["chirp", "under-load", "intermittent"],
    description:
      "3.5L EcoBoost: a chirp under boost that owners attribute to BOV/diverter and carbon-buildup interactions on the intake side. Direct injection means no fuel-wash on intake valves — carbon accumulates after ~60k mi.",
    inspectionHint:
      "Note throttle position when chirp occurs. Pair with a forced-induction walnut-blast history check.",
    likelyIssueAreaIds: ["direct_injection_carbon_buildup", "turbo_boost_leak"],
    likelyPartIds: ["blow_off_valve", "direct_injector", "intake_tube"],
    likelySystemIds: ["turbo_boost", "intake_vacuum"],
    nextSafeStep:
      "Plan walnut blast at the next major service ($400-600 shop) if mileage > 60k and never done.",
    normality: "abnormal",
    operatingConditions: ["under_load", "light_rpm_blip"],
    pitchTags: ["high", "sharp", "chirp"],
    severityHint: "medium",
  },
  {
    category: "timing_chain_rattle",
    aliases: [
      "ecoboost timing chain stretch rattle",
      "3.5 eb cold start chain rattle",
      "eb hot idle chain rattle",
    ],
    cadenceTags: ["rattle", "cold-start", "hot-idle"],
    description:
      "3.5L EcoBoost: timing-chain stretch presents earlier than the 5.4 3V (often 80-150k mi) due to higher cylinder pressures. Rattle audible at cold start AND hot idle — both windows matter for diagnosis.",
    inspectionHint:
      "Capture both cold-start and 10-minute-hot-idle clips for comparison.",
    likelyIssueAreaIds: ["timing_chain_stretch_ecoboost"],
    likelyPartIds: ["timing_cover", "cam_phaser_area", "vct_solenoid"],
    likelySystemIds: ["timing_valvetrain"],
    nextSafeStep:
      "Pull FORScan cam-stretch values — over 6-7 deg plan replacement, over 10 deg replace immediately. $2,000-4,000 job.",
    normality: "abnormal",
    operatingConditions: ["cold_start", "hot_idle"],
    pitchTags: ["metallic", "rattle"],
    severityHint: "high",
  },

  // ── 5.0L Coyote (2011-2014) ───────────────────────────────────────────
  {
    category: "cam_phaser_rattle",
    aliases: [
      "coyote vct solenoid chatter",
      "5.0 early coyote vct",
      "2011-2014-ford-f150-5.0-coyote",
    ],
    cadenceTags: ["chatter", "cold-start", "early-model"],
    description:
      "5.0L Coyote (early 2011-2012): VCT solenoid chatter at cold start. Much less common than the 5.4 3V phaser rattle and usually resolves with a VCT solenoid swap rather than a full phaser job.",
    inspectionHint:
      "Capture cold start; rattle that resolves with a $40 solenoid swap was not a chain/phaser job.",
    likelyIssueAreaIds: ["cam_phaser_tick_context"],
    likelyPartIds: ["vct_solenoid", "cam_phaser_area"],
    likelySystemIds: ["timing_valvetrain"],
    nextSafeStep:
      "Swap VCT solenoids first ($40-60 each, 30-min job) before deeper teardown.",
    normality: "abnormal",
    operatingConditions: ["cold_start"],
    pitchTags: ["metallic", "chatter"],
    severityHint: "medium",
  },
  {
    category: "exhaust_tick",
    aliases: [
      "coyote mmt tick",
      "5.0 mid-model-year tick",
      "coyote manifold gasket tick",
    ],
    cadenceTags: ["tick", "exhaust-side", "warm-fades-cold"],
    description:
      "5.0L Coyote: 'MMT' (mid-model-year tick) traces to the exhaust-manifold-to-head gasket sealing. Generally harmless but distinctive — Coyote-specific because of the DOHC head design.",
    inspectionHint:
      "Show the exhaust manifold flange where it meets the head; carbon staining identifies the leaking gasket.",
    likelyIssueAreaIds: ["exhaust_manifold_tick"],
    likelyPartIds: ["exhaust_manifold"],
    likelySystemIds: ["exhaust_emissions"],
    nextSafeStep:
      "Inspect manifold-to-head joint; replace gasket if staining present, otherwise monitor.",
    normality: "context_dependent",
    operatingConditions: ["cold_start", "warm_idle"],
    pitchTags: ["sharp", "metallic"],
    severityHint: "low",
  },
  {
    category: "exhaust_tick",
    aliases: [
      "coyote carbon tickle",
      "5.0 carbon-buildup tick",
      "coyote high mileage tickle",
    ],
    cadenceTags: ["tick", "light", "high-mileage"],
    description:
      "5.0L Coyote: a faint high-mileage tickle from carbon buildup in the cylinders is a known but benign Coyote trait — distinct from the louder MMT.",
    inspectionHint: "Do not escalate from a light tickle alone.",
    likelyIssueAreaIds: [],
    likelyPartIds: ["spark_plug"],
    likelySystemIds: ["engine_mechanical"],
    nextSafeStep:
      "Consider a fuel-system cleaner pass; not a stop-driving condition.",
    normality: "context_dependent",
    operatingConditions: ["warm_idle", "hot_idle"],
    pitchTags: ["light", "metallic"],
    severityHint: "low",
  },

  // ── 6.2L Boss (2011-2014, Raptor/Limited/Harley) ──────────────────────
  {
    // Note: there is no `lope_idle` category in TruckSoundCategory. Using
    // `normal_idle` since the 6.2 Boss lope IS the normal idle character.
    category: "normal_idle",
    aliases: [
      "6.2 boss heavy lope",
      "boss v8 idle lope",
      "2011-2014-ford-f150-6.2-boss",
    ],
    cadenceTags: ["lope", "uneven", "aggressive-cam"],
    description:
      "6.2L Boss V8: heavy low-frequency lope at idle is normal — the aggressive cam profile produces an uneven idle pulse that owners value. Do not confuse with misfire-driven rough idle.",
    inspectionHint:
      "Confirm pulse is rhythmic and steady — true lope is even cylinder-to-cylinder. A misfire-driven stumble is uneven.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["engine_mechanical"],
    nextSafeStep: "No action — normal Boss idle character.",
    normality: "normal",
    operatingConditions: ["warm_idle", "hot_idle", "steady_idle"],
    pitchTags: ["low", "rumble"],
    severityHint: "low",
  },
  {
    category: "normal_fan_or_accessory_ambient",
    aliases: [
      "6.2 roush supercharger whine",
      "boss supercharger whine",
      "roush blower whine",
    ],
    cadenceTags: ["whine", "rising-with-rpm"],
    description:
      "6.2L Boss with Roush/aftermarket supercharger: rising mechanical whine tracking engine RPM is the supercharger rotor pack — normal if a blower has been installed. Absence on a stock 6.2 is normal.",
    inspectionHint:
      "Confirm a supercharger is actually fitted before treating whine as normal.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["engine_mechanical"],
    nextSafeStep:
      "If a blower is installed and whine is steady, no action. New whine on a previously quiet blower = inspect rotor pack.",
    normality: "context_dependent",
    operatingConditions: ["warm_idle", "light_rpm_blip", "under_load"],
    pitchTags: ["high", "whine"],
    severityHint: "low",
  },

  // ── 3.7L Ti-VCT V6 (2011-2014) ────────────────────────────────────────
  {
    category: "timing_chain_rattle",
    aliases: [
      "3.7 v6 timing chain rattle",
      "duratec 3.7 chain rattle cold",
      "2011-2014-ford-f150-3.7-v6",
    ],
    cadenceTags: ["rattle", "cold-start", "very-high-mileage"],
    description:
      "3.7L Ti-VCT V6: timing chain rattle is rare and only appears at very high mileage. No cam-phaser pathology like the 3V Tritons — generally a quiet engine.",
    inspectionHint:
      "Cold-start clip with hood open; rattle in this engine is unusual and worth recording.",
    likelyIssueAreaIds: [],
    likelyPartIds: ["timing_cover"],
    likelySystemIds: ["timing_valvetrain"],
    nextSafeStep:
      "Pull FORScan cam-stretch values to confirm before any teardown.",
    normality: "abnormal",
    operatingConditions: ["cold_start"],
    pitchTags: ["metallic", "rattle"],
    severityHint: "medium",
  },
  {
    category: "normal_idle",
    aliases: ["3.7 v6 quiet idle", "duratec 3.7 baseline"],
    cadenceTags: ["steady", "quiet"],
    description:
      "3.7L Ti-VCT V6: baseline idle is notably quieter than the V8s — no VCT phaser noise, no exhaust manifold ticks of the Triton family. Absence of noise is normal.",
    inspectionHint:
      "Do not treat a very quiet 3.7 idle as suspicious.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["engine_mechanical"],
    nextSafeStep: "Normal baseline.",
    normality: "normal",
    operatingConditions: ["warm_idle", "steady_idle"],
    pitchTags: ["low", "soft"],
    severityHint: "low",
  },
];
