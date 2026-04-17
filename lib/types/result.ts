export type ConfidenceLevel = "low" | "medium" | "high";
export type SeverityLevel = "green" | "yellow" | "red";
export type Recommendation =
  | "DIY_SAFE"
  | "INSPECT_ONLY"
  | "SHOP_REQUIRED";
export type ResultEvidenceKind = "bookmark" | "capture" | "conversation";
export type MockDiagnosisRuleId =
  | "multiple_risk_signals"
  | "leak"
  | "sound_belt_pulley"
  | "belt_pulley"
  | "light"
  | "connector"
  | "rust"
  | "sound"
  | "frames_only"
  | "insufficient_evidence";

export interface ResultEvidenceItem {
  kind: ResultEvidenceKind;
  label: string;
  detail?: string;
}

export interface RepairResult {
  likelyIssueArea: string;
  confidence: ConfidenceLevel;
  severity: SeverityLevel;
  recommendation: Recommendation;
  nextSafeStep: string;
  inspectNext: string[];
  disclaimer: string;
  matchedRule: MockDiagnosisRuleId;
  supportingEvidence: ResultEvidenceItem[];
}
