import type {
  TruckEscalationGuidance,
  TruckInspectionTargetDefinition,
  TruckInspectionTargetId,
  TruckIssueAreaDefinition,
  TruckIssueAreaId,
  TruckKnowledgeBase,
  TruckKnowledgeLookup,
  TruckPartDefinition,
  TruckPartId,
  TruckSymptomDefinition,
  TruckSymptomId,
  TruckSystemGroupDefinition,
  TruckSystemId,
} from "@/lib/knowledge/types";
import type { Recommendation } from "@/lib/types/result";
import type { BookmarkType, SessionLanguage } from "@/lib/types/session";

export type TruckVisibleTargetId =
  | "front_accessory_drive_area"
  | "belt"
  | "tensioner"
  | "idler_pulley"
  | "alternator"
  | "battery"
  | "battery_terminal"
  | "coolant_reservoir"
  | "radiator_hose"
  | "coolant_hose"
  | "connector"
  | "light_socket_wiring"
  | "headlight_housing"
  | "taillight_housing"
  | "wheel_well_rust"
  | "underbody_rust"
  | "ignition_coil"
  | "engine_top"
  | "leak_source_area"
  | "brake_line_area"
  | "suspension_joint_area"
  | "driveline_area"
  | "unknown";

export type TruckVisibleTargetConfidence = "low" | "medium" | "high";

export interface TruckVisibleTargetDefinition {
  id: TruckVisibleTargetId;
  label: Record<SessionLanguage, string>;
  aliases: string[];
  systemIds: TruckSystemId[];
  partIds: TruckPartId[];
  issueAreaIds: TruckIssueAreaId[];
  symptomIds?: TruckSymptomId[];
  inspectionTargetId?: TruckInspectionTargetId;
  locationHint: Record<SessionLanguage, string>;
}

export interface TruckVisibleTargetCandidate {
  id: TruckVisibleTargetId;
  label: string;
  confidence: TruckVisibleTargetConfidence;
  identified: boolean;
  inspectionTargetId?: TruckInspectionTargetId;
  matchedTerms: string[];
  score: number;
}

export interface TruckPartRecord extends TruckPartDefinition {
  visibleTargetIds: TruckVisibleTargetId[];
  commonFailureCues: string[];
  recommendationBias: Recommendation;
  confidenceNotes: string[];
}

export interface TruckGuidedPromptTemplate {
  id: string;
  language: SessionLanguage;
  issueAreaId?: TruckIssueAreaId;
  inspectionTargetId?: TruckInspectionTargetId;
  visibleTargetId?: TruckVisibleTargetId;
  prompt: string;
}

export interface TruckIssueRule {
  id: string;
  issueAreaId: TruckIssueAreaId;
  summary: string;
  visibleTargetIds?: TruckVisibleTargetId[];
  bookmarkTypes?: BookmarkType[];
  partIds?: TruckPartId[];
  symptomIds?: TruckSymptomId[];
  transcriptTerms?: string[];
  referenceAliasTerms?: string[];
}

export interface TruckTranscriptMatch {
  issueAreaIds: TruckIssueAreaId[];
  matchedTerms: string[];
  partIds: TruckPartId[];
  symptomIds: TruckSymptomId[];
  systemIds: TruckSystemId[];
}

export interface TruckGuidedPromptResult {
  confidence: TruckVisibleTargetConfidence;
  issueAreaIds: TruckIssueAreaId[];
  prompt: string;
  targetLabel: string;
}

export interface TruckKnowledgeLibrary {
  aliases: Record<string, string[]>;
  escalationRules: TruckEscalationGuidance[];
  guidedPrompts: TruckGuidedPromptTemplate[];
  inspectionTargets: Record<TruckInspectionTargetId, TruckInspectionTargetDefinition>;
  issueRules: TruckIssueRule[];
  issueAreas: Record<TruckIssueAreaId, TruckIssueAreaDefinition>;
  knowledgeBase: TruckKnowledgeBase;
  parts: Record<TruckPartId, TruckPartRecord>;
  symptoms: Record<TruckSymptomId, TruckSymptomDefinition>;
  systems: Record<TruckSystemId, TruckSystemGroupDefinition>;
  visibleTargets: Record<TruckVisibleTargetId, TruckVisibleTargetDefinition>;
}

export type TruckLookupExpander = (
  lookup?: TruckKnowledgeLookup,
) => Required<TruckKnowledgeLookup>;
