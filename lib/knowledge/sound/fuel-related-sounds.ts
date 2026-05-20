// Fuel-related sound knowledge for the 12th-generation Ford F-150.
//
// Each engine/fuel combination produces distinct combustion sound traits:
// pinging, knock-retard timing pull, smoothness on cold start, exhaust note,
// and warm-up cadence all shift with octane and ethanol content.
//
// Verifiable Ford guidance referenced:
//   - 4.6 2V / 5.4 3V / 5.0 Coyote / 3.7 V6 fuel recommendation: 87 octane
//   - 3.5L EcoBoost: 87 minimum, premium recommended for tow / heat
//   - 6.2L Boss: flex-fuel capable (E85 OK on Boss trucks where so equipped),
//     premium recommended
// All other claims are sourced from owner reports in the archive markdowns
// (engine-comparison-guide.md, ecoboost-community-knowledge.md,
// master-maintenance-guide.md).
//
// Scope note: `TruckSoundRecord` has no `fuelType` field — fuel scope is
// encoded inline via `description` + `aliases`. Misfueling safety notes are
// embedded in `nextSafeStep`.

import type { TruckSoundRecord } from "@/lib/knowledge/sound/types";

export const FUEL_RELATED_SOUND_PATTERNS: TruckSoundRecord[] = [
  // ── 87 octane in Triton 5.4 3V — baseline ─────────────────────────────
  {
    category: "normal_idle",
    aliases: [
      "5.4 3v on 87 octane baseline",
      "triton 5.4 regular gas idle",
      "5.4-3v-87-octane",
    ],
    cadenceTags: ["steady"],
    description:
      "5.4L 3V Triton on regular 87 octane: this is the factory-recommended fuel and the baseline idle/combustion sound the engine was tuned for. No ping under normal acceleration; cold start is unremarkable.",
    inspectionHint:
      "Do not interpret a 5.4 3V running on 87 as fuel-related when diagnosing a noise.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["engine_mechanical", "fuel_air_metering"],
    nextSafeStep:
      "Normal — premium offers no measurable benefit on the 5.4 3V.",
    normality: "normal",
    operatingConditions: ["cold_start", "warm_idle", "hot_idle"],
    pitchTags: ["low", "mixed"],
    severityHint: "low",
  },

  // ── 89/91 octane in EcoBoost 3.5 — knock reduces ──────────────────────
  {
    category: "normal_idle",
    aliases: [
      "ecoboost premium fuel quieter",
      "3.5 eb on 91 octane no ping",
      "eb premium knock retard reduces",
    ],
    cadenceTags: ["steady", "no-ping"],
    description:
      "3.5L EcoBoost on 91 octane premium: spark-knock events drop sharply and any soft pinging that owners hear on 87 under load disappears. Ford allows 87 minimum but the EcoBoost runs measurably better — and quieter — on premium, especially in hot weather or while towing.",
    inspectionHint:
      "If a customer reports a ping that goes away after switching to premium, the original noise was fuel-driven, not mechanical.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["fuel_air_metering", "ignition"],
    nextSafeStep:
      "For tow duty or summer heat, use 91+ octane on the EcoBoost.",
    normality: "normal",
    operatingConditions: ["under_load", "warm_idle"],
    pitchTags: ["low", "smooth"],
    severityHint: "low",
  },
  {
    // Note: there is no `detonation_ping` category in TruckSoundCategory.
    // Closest existing category is `exhaust_tick` (sharp/metallic) — using it
    // and tagging cadence/pitch with "ping" so the matcher can still find this.
    category: "exhaust_tick",
    aliases: [
      "ecoboost 87 octane ping under load",
      "eb knock retard tow grade",
      "3.5 eb soft pinging on grade",
    ],
    cadenceTags: ["ping", "under-load", "grade", "transient"],
    description:
      "3.5L EcoBoost on 87 octane while towing or climbing: soft pinging audible as the knock sensor signals timing retard. Not a mechanical fault — the ECU is doing its job, but the ping is the audible result.",
    inspectionHint:
      "Note whether ping happens only under load on grades or also on flat ground; flat-ground ping points to deeper issues.",
    likelyIssueAreaIds: [],
    likelyPartIds: ["spark_plug"],
    likelySystemIds: ["fuel_air_metering", "ignition"],
    nextSafeStep:
      "Switch to 91+ octane before the next loaded haul; persistent ping on premium = inspect plugs and knock sensor.",
    normality: "context_dependent",
    operatingConditions: ["under_load"],
    pitchTags: ["metallic", "ping", "sharp"],
    severityHint: "medium",
  },

  // ── E85 in flex-fuel 6.2L Boss ────────────────────────────────────────
  {
    category: "normal_idle",
    aliases: [
      "6.2 boss e85 exhaust note",
      "boss flex fuel e85 idle",
      "6.2-boss-e85",
    ],
    cadenceTags: ["lope", "deeper"],
    description:
      "6.2L Boss running E85 in a flex-fuel configured truck: exhaust note is noticeably deeper and richer due to the larger fuel volume the ECU commands for E85's lower energy density. Idle character is slightly rougher than on gasoline.",
    inspectionHint:
      "Confirm the truck is actually flex-fuel-equipped (yellow ring on filler neck) before treating an E85 sound as normal.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["engine_mechanical", "fuel_air_metering"],
    nextSafeStep:
      "Normal for E85 on a flex-fuel 6.2. Expect ~25% worse fuel economy and more frequent fill-ups.",
    normality: "normal",
    operatingConditions: ["warm_idle", "hot_idle", "steady_idle"],
    pitchTags: ["low", "deep", "rumble"],
    severityHint: "low",
  },
  {
    category: "rough_idle_misfire",
    aliases: [
      "6.2 boss e85 cold start rough",
      "boss e85 slow warm-up",
      "e85 cold weather slow rev",
    ],
    cadenceTags: ["rough", "cold-start", "slow-rev"],
    description:
      "6.2L Boss on E85: cold-start idle is slightly rougher and warm-up rev response is slower than on gasoline, especially below 0 C. Ethanol's higher vaporization energy means the engine takes longer to atomize fuel until coolant warms.",
    inspectionHint:
      "Compare cold-start behavior on gasoline vs E85 in the same conditions to confirm the ethanol effect.",
    likelyIssueAreaIds: [],
    likelyPartIds: [],
    likelySystemIds: ["engine_mechanical", "fuel_air_metering"],
    nextSafeStep:
      "If cold-start roughness on E85 is severe, fill with E10/gasoline for winter and let the blend dilute.",
    normality: "context_dependent",
    operatingConditions: ["cold_start"],
    pitchTags: ["uneven", "low"],
    severityHint: "low",
  },

  // ── E15 in non-flex engines (NEVER recommended) ───────────────────────
  {
    category: "rough_idle_misfire",
    aliases: [
      "e15 in non-flex f150",
      "e15 misfuel rough idle",
      "non-flex e15 warning",
    ],
    cadenceTags: ["rough", "stumble", "uneven"],
    description:
      "E15 (15% ethanol) in a non-flex-fuel 12th-gen F-150 — 4.6L, 5.4L, 3.7L V6, 3.5L EcoBoost, and 5.0L Coyote are NOT approved for E15. Symptoms: rough idle, intermittent stumble, eventually MIL with lean codes. Long-term: fuel-system component damage (rubber seals, fuel pump).",
    inspectionHint:
      "If a customer reports a fuel-related rough idle that started after a fill, verify the pump's ethanol label before chasing mechanical causes.",
    likelyIssueAreaIds: ["intake_vacuum_air_leak"],
    likelyPartIds: ["fuel_injector", "fuel_pump_driver_module"],
    likelySystemIds: ["fuel_air_metering"],
    nextSafeStep:
      "Stop using E15 immediately. Run the tank as low as practical and refill with E10/87. Fuel system inspection if symptoms persist after one tank.",
    normality: "abnormal",
    operatingConditions: ["warm_idle", "steady_idle", "cold_start"],
    pitchTags: ["uneven", "stumble"],
    severityHint: "high",
  },
];
