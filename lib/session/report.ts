import type { RepairBuddyMode } from "@/lib/config/app-config";
import { getSymptomDefinition } from "@/lib/knowledge";
import { buildEvidenceFusionContext } from "@/lib/session/evidence-fusion";
import { buildGuidedInspectionStep } from "@/lib/session/guided-inspection";
import { getLocalizedBookmarkTypeLabel } from "@/lib/session/session-language";
import type { RepairResult } from "@/lib/types/result";
import type {
  RepairSessionReport,
  RepairSessionSnapshot,
  SessionLanguage,
} from "@/lib/types/session";

const MAX_REPORT_BOOKMARKS = 10;
const MAX_REPORT_SNIPPETS = 6;
const MAX_REPORT_TEXT_LENGTH = 160;

function trimText(value: string | undefined, maxLength = MAX_REPORT_TEXT_LENGTH) {
  const normalized = value?.replace(/\s+/g, " ").trim() ?? "";

  if (!normalized) {
    return "";
  }

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

function getLocalizedSymptomLabel(
  language: SessionLanguage,
  symptomId: string,
) {
  if (language === "ko") {
    return {
      chirp: "찍찍거림",
      coolant_smell: "냉각수 냄새",
      hyperflash: "하이퍼플래시",
      leak: "누유",
      misfire: "실화",
      rust: "녹",
      ticking: "틱 소리",
      wobble: "흔들림",
    }[symptomId] ?? symptomId;
  }

  return getSymptomDefinition(symptomId)?.label ?? symptomId;
}

export function buildRepairSessionReport(params: {
  persistenceState?: RepairSessionReport["persistenceState"];
  persistenceWarning?: string;
  providerName: RepairBuddyMode;
  result: RepairResult;
  session: RepairSessionSnapshot;
}): RepairSessionReport {
  const { providerName, result, session } = params;
  const fusion = buildEvidenceFusionContext(session, result);
  const guidedStep = buildGuidedInspectionStep({
    result,
    session,
  });
  const issueAreaCandidates = Array.from(
    new Set([
      guidedStep.targetLabel,
      result.likelyIssueArea,
      ...fusion.groundedIssueAreaCandidates
        .slice(0, 3)
        .map((candidate) => candidate.label),
    ].filter(Boolean)),
  ).slice(0, 4);
  const possibleSymptoms = Array.from(
    new Set(
      fusion.matchedSymptomIds.map((symptomId) => {
        return getLocalizedSymptomLabel(session.sessionLanguage, symptomId);
      }),
    ),
  ).slice(0, 4);

  return {
    sessionId: session.id,
    vehicleId: session.vehicleId,
    sessionLanguage: session.sessionLanguage,
    startedAt: session.startedAt,
    endedAt: session.endedAt ?? new Date().toISOString(),
    providerName,
    captureCount: session.evidence.captures.length,
    bookmarkCount: session.evidence.bookmarks.length,
    conversationCount: session.evidence.conversation.length,
    visibleTargetSummary: guidedStep.targetLabel,
    issueAreaCandidates,
    possibleSymptoms,
    bookmarkHistory: session.evidence.bookmarks
      .slice(-MAX_REPORT_BOOKMARKS)
      .map((bookmark) => ({
        createdAt: bookmark.createdAt,
        bookmarkType: bookmark.bookmarkType,
        label: getLocalizedBookmarkTypeLabel(
          bookmark.bookmarkType,
          session.sessionLanguage,
        ),
        note: trimText(bookmark.note, 120) || undefined,
      })),
    transcriptSnippets: session.evidence.conversation
      .filter((message) => trimText(message.text))
      .slice(-MAX_REPORT_SNIPPETS)
      .map((message) => ({
        createdAt: message.createdAt,
        role: message.role,
        text: trimText(message.text),
      })),
    result,
    persistenceState: params.persistenceState ?? "persisted",
    persistenceWarning: params.persistenceWarning,
  };
}
