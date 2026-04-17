/**
 * Normalizes a raw Gemini JSON response into a validated RepairResult.
 *
 * On any parse/validation failure the function falls back to
 * buildMockRepairResult(session) so the UI always gets a usable result.
 */

import { buildMockRepairResult } from "@/lib/session/mock-diagnosis";
import type { SelectedKnowledge } from "@/lib/knowledge/grounding";
import type {
  ConfidenceLevel,
  MockDiagnosisRuleId,
  Recommendation,
  RepairResult,
  ResultEvidenceItem,
  ResultEvidenceKind,
  SeverityLevel,
} from "@/lib/types/result";
import type { RepairSessionSnapshot } from "@/lib/types/session";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FALLBACK_DISCLAIMER =
  "This result is an inspection aid, not a guaranteed diagnosis. If the cause is still unclear, inspect further before driving.";

const VALID_CONFIDENCE: ConfidenceLevel[] = ["low", "medium", "high"];
const VALID_SEVERITY: SeverityLevel[] = ["green", "yellow", "red"];
const VALID_RECOMMENDATION: Recommendation[] = [
  "DIY_SAFE",
  "INSPECT_ONLY",
  "SHOP_REQUIRED",
];
const VALID_MATCHED_RULES: MockDiagnosisRuleId[] = [
  "multiple_risk_signals",
  "leak",
  "sound_belt_pulley",
  "belt_pulley",
  "light",
  "connector",
  "rust",
  "sound",
  "frames_only",
  "insufficient_evidence",
];
const VALID_EVIDENCE_KINDS: ResultEvidenceKind[] = [
  "bookmark",
  "capture",
  "conversation",
];

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function isConfidenceLevel(value: unknown): value is ConfidenceLevel {
  return VALID_CONFIDENCE.includes(value as ConfidenceLevel);
}

function isSeverityLevel(value: unknown): value is SeverityLevel {
  return VALID_SEVERITY.includes(value as SeverityLevel);
}

function isRecommendation(value: unknown): value is Recommendation {
  return VALID_RECOMMENDATION.includes(value as Recommendation);
}

function isMatchedRule(value: unknown): value is MockDiagnosisRuleId {
  return VALID_MATCHED_RULES.includes(value as MockDiagnosisRuleId);
}

function isEvidenceKind(value: unknown): value is ResultEvidenceKind {
  return VALID_EVIDENCE_KINDS.includes(value as ResultEvidenceKind);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseEvidenceItems(raw: unknown): ResultEvidenceItem[] {
  if (!Array.isArray(raw)) return [];

  const items: ResultEvidenceItem[] = [];

  for (const item of raw) {
    if (
      item &&
      typeof item === "object" &&
      isEvidenceKind((item as Record<string, unknown>).kind) &&
      isNonEmptyString((item as Record<string, unknown>).label)
    ) {
      const detail = (item as Record<string, unknown>).detail;
      items.push({
        kind: (item as Record<string, unknown>).kind as ResultEvidenceKind,
        label: ((item as Record<string, unknown>).label as string).trim(),
        detail:
          typeof detail === "string" && detail.trim() ? detail.trim() : undefined,
      });
    }
  }

  return items;
}

function parseInspectNext(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is string => isNonEmptyString(item))
    .map((item) => item.trim())
    .slice(0, 4);
}

// ---------------------------------------------------------------------------
// Supporting evidence builder from selected knowledge
// ---------------------------------------------------------------------------

function buildEvidenceFromSelected(
  selected: SelectedKnowledge,
  session: RepairSessionSnapshot,
): ResultEvidenceItem[] {
  const items: ResultEvidenceItem[] = [];

  // Add bookmark evidence items.
  for (const bookmark of session.evidence.bookmarks) {
    items.push({
      kind: "bookmark",
      label: bookmark.bookmarkType.replace(/_/g, " "),
      detail: bookmark.note?.trim() || undefined,
    });
  }

  // Add a capture item if present.
  const captureCount = session.evidence.captures.length;
  if (captureCount > 0) {
    items.push({
      kind: "capture",
      label:
        session.sessionLanguage === "ko"
          ? `${captureCount}개 저장 프레임`
          : `${captureCount} saved frame${captureCount === 1 ? "" : "s"}`,
    });
  }

  // Add a conversation item if matched issue areas were surfaced from conversation.
  const hasConversation = session.evidence.conversation.some(
    (m) => m.role === "user" && m.text.trim().length > 0,
  );
  if (hasConversation && selected.matchedIssueAreaIds.length > 0) {
    items.push({
      kind: "conversation",
      label:
        session.sessionLanguage === "ko"
          ? "사용자 메모"
          : "User note",
      detail: selected.matchedIssueAreaIds
        .slice(0, 2)
        .map((id) => id.replace(/_/g, " "))
        .join(", "),
    });
  }

  // Deduplicate.
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.kind}:${item.label}:${item.detail ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ---------------------------------------------------------------------------
// matchedRule inference
// ---------------------------------------------------------------------------

function inferMatchedRule(
  selected: SelectedKnowledge,
  rawRule: unknown,
): MockDiagnosisRuleId {
  if (isMatchedRule(rawRule)) return rawRule;

  // Fall back based on dominant signal.
  if (selected.dominantSignal === "sound") return "sound";
  if (selected.dominantSignal === "belt_pulley") return "belt_pulley";
  if (selected.dominantSignal === "leak") return "leak";
  if (selected.dominantSignal === "rust") return "rust";
  if (selected.dominantSignal === "connector") return "connector";
  if (selected.dominantSignal === "light") return "light";

  return "insufficient_evidence";
}

// ---------------------------------------------------------------------------
// Public normalizer
// ---------------------------------------------------------------------------

export function normalizeGeminiResponse(
  rawJson: string,
  session: RepairSessionSnapshot,
  selected: SelectedKnowledge,
): RepairResult {
  let parsed: Record<string, unknown>;

  try {
    const trimmed = rawJson.trim();
    parsed = JSON.parse(trimmed) as Record<string, unknown>;
  } catch (error) {
    console.warn(
      "[GeminiRepairBuddy] Failed to parse Gemini JSON response; falling back to mock.",
      error,
    );
    return buildMockRepairResult(session);
  }

  // Validate required enum fields — any invalid enum means the model went off
  // schema; fall back to mock to avoid showing bad data.
  if (
    !isConfidenceLevel(parsed.confidence) ||
    !isSeverityLevel(parsed.severity) ||
    !isRecommendation(parsed.recommendation)
  ) {
    console.warn(
      "[GeminiRepairBuddy] Gemini response failed enum validation; falling back to mock.",
      {
        confidence: parsed.confidence,
        severity: parsed.severity,
        recommendation: parsed.recommendation,
      },
    );
    return buildMockRepairResult(session);
  }

  const likelyIssueArea = isNonEmptyString(parsed.likelyIssueArea)
    ? parsed.likelyIssueArea.trim()
    : "Unspecified issue area";

  const nextSafeStep = isNonEmptyString(parsed.nextSafeStep)
    ? parsed.nextSafeStep.trim()
    : "Inspect further before deciding whether it is safe to keep driving.";

  const inspectNext =
    parseInspectNext(parsed.inspectNext).length > 0
      ? parseInspectNext(parsed.inspectNext)
      : selected.inspectForHints.slice(0, 3);

  const matchedRule = inferMatchedRule(selected, parsed.matchedRule);

  // Use knowledge-grounded evidence; merge in any valid evidence items from the
  // Gemini response to avoid throwing away useful model output.
  const modelEvidence = parseEvidenceItems(parsed.supportingEvidence);
  const groundedEvidence = buildEvidenceFromSelected(selected, session);
  const mergedEvidence = Array.from(
    new Map(
      [...groundedEvidence, ...modelEvidence].map((item) => [
        `${item.kind}:${item.label}:${item.detail ?? ""}`,
        item,
      ]),
    ).values(),
  );

  const disclaimer = isNonEmptyString(parsed.disclaimer)
    ? parsed.disclaimer.trim()
    : FALLBACK_DISCLAIMER;

  return {
    likelyIssueArea,
    confidence: parsed.confidence,
    severity: parsed.severity,
    recommendation: parsed.recommendation,
    nextSafeStep,
    inspectNext,
    disclaimer,
    matchedRule,
    supportingEvidence: mergedEvidence,
  };
}
