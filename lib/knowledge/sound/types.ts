import type { TruckIssueAreaId, TruckPartId, TruckSystemId } from "@/lib/knowledge/types";
import type { SessionLanguage } from "@/lib/types/session";

export type TruckSoundCategory =
  | "normal_idle"
  | "normal_injector_tick"
  | "normal_fan_or_accessory_ambient"
  | "belt_chirp"
  | "belt_squeal"
  | "idler_bearing_noise"
  | "tensioner_noise"
  | "alternator_bearing_noise"
  | "cam_phaser_rattle"
  | "timing_chain_rattle"
  | "rough_idle_misfire"
  | "vacuum_hiss"
  | "exhaust_tick"
  | "unknown";

export type TruckSoundNormality = "normal" | "context_dependent" | "abnormal" | "unknown";
export type TruckSoundSeverityHint = "low" | "medium" | "high";
export type TruckSoundOperatingConditionId =
  | "cold_start"
  | "hot_idle"
  | "warm_idle"
  | "light_rpm_blip"
  | "ac_on"
  | "electrical_load"
  | "under_load"
  | "after_rain"
  | "steady_idle";

export interface TruckSoundOperatingCondition {
  id: TruckSoundOperatingConditionId;
  label: Record<SessionLanguage, string>;
  description: string;
}

export interface TruckSoundRecord {
  category: TruckSoundCategory;
  aliases: string[];
  cadenceTags: string[];
  description: string;
  inspectionHint: string;
  likelyIssueAreaIds: TruckIssueAreaId[];
  likelyPartIds: TruckPartId[];
  likelySystemIds: TruckSystemId[];
  nextSafeStep: string;
  normality: TruckSoundNormality;
  operatingConditions: TruckSoundOperatingConditionId[];
  pitchTags: string[];
  severityHint: TruckSoundSeverityHint;
}

export interface TruckSoundPrompt {
  category: TruckSoundCategory;
  language: SessionLanguage;
  prompt: string;
}
