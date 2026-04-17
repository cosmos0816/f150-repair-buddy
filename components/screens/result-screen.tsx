"use client";

import { useCallback, useEffect, useState } from "react";

import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { mockSessionSnapshot } from "@/lib/data/mock-result";
import { analyzeSessionClient } from "@/lib/providers/analyze-session-client";
import { MockRepairBuddyProvider } from "@/lib/providers/mock-repair-buddy-provider";
import { buildRepairSessionReport } from "@/lib/session/report";
import { buildMechanicExport } from "@/lib/session/mechanic-export";
import {
  formatResultEvidenceCountLabel,
  getMatchedRuleLabel,
  getRecommendationLabel,
  getResultCopy,
  getSeverityLabel,
  translateExactText,
} from "@/lib/session/session-language";
import {
  readStoredSessionReport,
  readStoredSessionSnapshot,
} from "@/lib/session/storage";
import type {
  ResultEvidenceItem,
  RepairResult,
  SeverityLevel,
} from "@/lib/types/result";
import type {
  BookmarkType,
  FrameSessionEvent,
  RepairSessionReport,
  RepairSessionSnapshot,
} from "@/lib/types/session";

const severityTone: Record<
  SeverityLevel,
  "green" | "yellow" | "red"
> = {
  green: "green",
  yellow: "yellow",
  red: "red",
};

const bookmarkTypeIcon: Record<BookmarkType, string> = {
  sound: "🔊",
  leak: "💧",
  rust: "🟤",
  connector: "🔌",
  light: "💡",
  belt_pulley: "⚙️",
  other: "📌",
};

function buildReportEvidenceSummary(report: RepairSessionReport) {
  return {
    frameCount: report.captureCount,
    bookmarkCount: report.bookmarkCount,
    conversationCount: report.conversationCount,
    bookmarkLabels: [...new Set(report.bookmarkHistory.map((bookmark) => bookmark.label))],
  };
}

function formatReportTimestamp(value: string, language: "en" | "ko") {
  return new Date(value).toLocaleString(language === "ko" ? "ko-KR" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    day: "numeric",
  });
}

function formatDuration(startedAt: string, endedAt: string) {
  const ms = new Date(endedAt).getTime() - new Date(startedAt).getTime();
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

/** Returns displayable thumbnail URLs — only data: URIs (blob: dies after navigation, mock:// is fake). */
function getDisplayableThumbnails(captures: FrameSessionEvent[]) {
  return captures
    .filter((c) => c.url.startsWith("data:"))
    .slice(-6);
}

function getEvidenceTone(item: ResultEvidenceItem) {
  if (item.kind === "bookmark") {
    return "yellow" as const;
  }

  if (item.kind === "capture") {
    return "accent" as const;
  }

  return "neutral" as const;
}

type ResultScreenProps = {
  providerMode?: "gemini" | "mock";
};

export function ResultScreen({ providerMode = "mock" }: ResultScreenProps = {}) {
  const [session, setSession] = useState<RepairSessionSnapshot | null>(null);
  const [sessionReport, setSessionReport] = useState<RepairSessionReport | null>(null);
  const [result, setResult] = useState<RepairResult | null>(null);
  const [providerName, setProviderName] = useState<"gemini" | "mock">(providerMode);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadResult() {
      const storedReport = readStoredSessionReport();
      const snapshot = readStoredSessionSnapshot() ?? mockSessionSnapshot;

      if (cancelled) {
        return;
      }

      setSession(snapshot);

      if (storedReport) {
        setSessionReport(storedReport);
        setProviderName(storedReport.providerName);
        setResult(storedReport.result);
        return;
      }

      setProviderName("gemini");

      try {
        const diagnosis = await analyzeSessionClient(snapshot);

        if (!cancelled) {
          setSessionReport(
            buildRepairSessionReport({
              persistenceState: "memory_only",
              providerName: "gemini",
              result: diagnosis,
              session: snapshot,
            }),
          );
          setResult(diagnosis);
        }
      } catch (error) {
        const fallbackProvider = new MockRepairBuddyProvider();

        try {
          const diagnosis = await fallbackProvider.analyzeSession(snapshot);

          if (!cancelled) {
            setProviderName(fallbackProvider.name);
            setSessionReport(
              buildRepairSessionReport({
                persistenceState: "memory_only",
                providerName: fallbackProvider.name,
                result: diagnosis,
                session: snapshot,
              }),
            );
            setResult(diagnosis);
            setErrorMessage(
              error instanceof Error ? error.message : "Result unavailable.",
            );
          }
        } catch (fallbackError) {
          if (!cancelled) {
            setErrorMessage(
              fallbackError instanceof Error
                ? fallbackError.message
                : "Result unavailable.",
            );
          }
        }
      }
    }

    void loadResult();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!result || !sessionReport) {
    const fallbackLanguage = sessionReport?.sessionLanguage ?? session?.sessionLanguage ?? "en";
    const resultCopy = getResultCopy(fallbackLanguage);
    return (
      <MobileAppShell activeRoute="result">
        <ScreenFrame
          eyebrow={resultCopy.result}
          title={getRecommendationLabel(fallbackLanguage, "INSPECT_ONLY")}
          description={resultCopy.loading}
        >
          <Card className="space-y-3">
            <p className="text-sm text-muted">
              {errorMessage
                ? translateExactText(fallbackLanguage, errorMessage)
                : translateExactText(
                    fallbackLanguage,
                    "Building a mock result from saved session evidence.",
                  )}
            </p>
          </Card>
        </ScreenFrame>
      </MobileAppShell>
    );
  }

  const evidenceSummary = buildReportEvidenceSummary(sessionReport);
  const resultCopy = getResultCopy(sessionReport.sessionLanguage);
  const resultLanguage = sessionReport.sessionLanguage;
  const thumbnails = getDisplayableThumbnails(session?.evidence.captures ?? []);
  const isCritical = result.severity === "red";

  return (
    <MobileAppShell activeRoute="result">
      <ScreenFrame
        eyebrow={resultCopy.result}
        title={getRecommendationLabel(resultLanguage, result.recommendation)}
        description={result.likelyIssueArea}
      >
        <div className="grid gap-4">
          {/* Critical alert banner */}
          {isCritical ? (
            <div className="rounded-[1rem] border border-red-500/30 bg-red-500/12 px-4 py-3 text-sm font-medium text-red-300">
              {resultLanguage === "ko"
                ? "즉시 점검 필요 — 계속 운행하지 마세요."
                : "Immediate attention required — do not continue driving."}
            </div>
          ) : null}

          {/* Main diagnosis card */}
          <Card className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={severityTone[result.severity]}>
                  {getSeverityLabel(resultLanguage, result.severity)}
                </StatusBadge>
                <StatusBadge tone="neutral">{result.confidence}</StatusBadge>
                <StatusBadge tone="accent">{providerName}</StatusBadge>
              </div>
              <StatusBadge tone={severityTone[result.severity]}>
                {getRecommendationLabel(resultLanguage, result.recommendation)}
              </StatusBadge>
            </div>

            {/* Next safe step — prominent */}
            <div className={`rounded-[1rem] px-3 py-2.5 ${isCritical ? "border border-red-500/20 bg-red-500/8" : "border border-white/8 bg-white/5"}`}>
              <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-foreground/56 uppercase mb-1">
                {resultLanguage === "ko" ? "즉시 조치" : "Next step"}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {result.nextSafeStep}
              </p>
            </div>

            {/* Inspect checklist */}
            {result.inspectNext.length > 0 ? (
              <div className="space-y-1.5">
                <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-foreground/56 uppercase">
                  {resultLanguage === "ko" ? "점검 항목" : "Inspect"}
                </p>
                <ul className="space-y-1.5">
                  {result.inspectNext.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
                      <span className="mt-0.5 shrink-0 text-foreground/40">&#x2610;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <p className="text-sm text-muted">{result.disclaimer}</p>
          </Card>

          {/* Evidence summary card */}
          <Card className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone="neutral">
                {formatResultEvidenceCountLabel(
                  resultLanguage,
                  evidenceSummary.frameCount,
                  "frames",
                )}
              </StatusBadge>
              <StatusBadge tone="neutral">
                {formatResultEvidenceCountLabel(
                  resultLanguage,
                  evidenceSummary.bookmarkCount,
                  "marks",
                )}
              </StatusBadge>
              <StatusBadge tone="neutral">
                {formatResultEvidenceCountLabel(
                  resultLanguage,
                  evidenceSummary.conversationCount,
                  "lines",
                )}
              </StatusBadge>
            </div>

            {/* Frame thumbnails */}
            {thumbnails.length > 0 ? (
              <div className="grid grid-cols-3 gap-1.5">
                {thumbnails.map((capture) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={capture.id}
                    src={capture.url}
                    alt={capture.captureKind}
                    className="aspect-video w-full rounded-[0.6rem] object-cover"
                  />
                ))}
              </div>
            ) : null}

            {/* Bookmark type labels */}
            {evidenceSummary.bookmarkLabels.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {evidenceSummary.bookmarkLabels.map((label) => (
                  <StatusBadge key={label} tone="yellow">
                    {label}
                  </StatusBadge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">
                {resultCopy.noBookmarks}
              </p>
            )}
          </Card>

          {/* Session report card */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-foreground/82 uppercase">
                {resultLanguage === "ko" ? "세션 보고서" : "Session report"}
              </p>
              <p className="text-[0.72rem] text-muted">
                {formatReportTimestamp(sessionReport.endedAt, resultLanguage)}
              </p>
            </div>

            {/* Session summary */}
            <div className="rounded-[1rem] border border-white/8 bg-black/18 px-3 py-2.5 space-y-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-foreground/56 uppercase">
                  {sessionReport.vehicleId}
                </p>
                <p className="text-[0.72rem] text-muted">
                  {formatDuration(sessionReport.startedAt, sessionReport.endedAt)}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                <StatusBadge tone="neutral">
                  {formatResultEvidenceCountLabel(resultLanguage, evidenceSummary.frameCount, "frames")}
                </StatusBadge>
                <StatusBadge tone="neutral">
                  {formatResultEvidenceCountLabel(resultLanguage, evidenceSummary.bookmarkCount, "marks")}
                </StatusBadge>
                {sessionReport.possibleSymptoms.slice(0, 2).map((symptom) => (
                  <StatusBadge key={symptom} tone="neutral">{symptom}</StatusBadge>
                ))}
              </div>
            </div>

            {sessionReport.persistenceWarning ? (
              <div className="rounded-[1rem] border border-yellow-500/18 bg-yellow-500/8 px-3 py-2.5 text-sm text-foreground/86">
                {sessionReport.persistenceWarning}
              </div>
            ) : null}

            {sessionReport.visibleTargetSummary ? (
              <div className="space-y-1">
                <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-foreground/56 uppercase">
                  {resultLanguage === "ko" ? "가장 가능성 높은 화면 부위" : "Visible target"}
                </p>
                <p className="text-sm text-foreground/90">
                  {sessionReport.visibleTargetSummary}
                </p>
              </div>
            ) : null}

            {sessionReport.possibleSymptoms.length > 0 ? (
              <div className="space-y-2">
                <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-foreground/56 uppercase">
                  {resultLanguage === "ko" ? "가능한 증상" : "Possible symptoms"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sessionReport.possibleSymptoms.map((symptom) => (
                    <StatusBadge key={symptom} tone="neutral">
                      {symptom}
                    </StatusBadge>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Bookmarks list with type icon + timestamp + note */}
            {sessionReport.bookmarkHistory.length > 0 ? (
              <div className="space-y-2">
                <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-foreground/56 uppercase">
                  {resultLanguage === "ko" ? "북마크 기록" : "Bookmarks"}
                </p>
                <div className="space-y-2">
                  {sessionReport.bookmarkHistory.map((bookmark, index) => (
                    <div
                      key={`${bookmark.createdAt}-${bookmark.bookmarkType}-${index}`}
                      className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-2.5"
                    >
                      <div className="mb-1 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm leading-none">
                            {bookmarkTypeIcon[bookmark.bookmarkType]}
                          </span>
                          <StatusBadge tone="yellow">{bookmark.label}</StatusBadge>
                        </div>
                        <p className="text-[0.72rem] text-muted">
                          {formatReportTimestamp(bookmark.createdAt, resultLanguage)}
                        </p>
                      </div>
                      {bookmark.note ? (
                        <p className="text-sm text-foreground/82">{bookmark.note}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {sessionReport.transcriptSnippets.length > 0 ? (
              <div className="space-y-2">
                <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-foreground/56 uppercase">
                  {resultLanguage === "ko" ? "짧은 대화 메모" : "Session snippets"}
                </p>
                <div className="space-y-2">
                  {sessionReport.transcriptSnippets.map((snippet, index) => (
                    <div
                      key={`${snippet.createdAt}-${snippet.role}-${index}`}
                      className="rounded-[1rem] border border-white/8 bg-black/18 px-3 py-2.5"
                    >
                      <div className="mb-1 flex items-center justify-between gap-3">
                        <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-foreground/56 uppercase">
                          {translateExactText(
                            resultLanguage,
                            snippet.role === "assistant" ? "Buddy" : "You",
                          )}
                        </p>
                        <p className="text-[0.72rem] text-muted">
                          {formatReportTimestamp(snippet.createdAt, resultLanguage)}
                        </p>
                      </div>
                      <p className="text-sm text-foreground/82">{snippet.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </Card>

          {/* Supporting evidence card */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-foreground/82 uppercase">
                {resultCopy.basedOn}
              </p>
              <StatusBadge tone="neutral">
                {getMatchedRuleLabel(resultLanguage, result.matchedRule)}
              </StatusBadge>
            </div>

            {result.supportingEvidence.length > 0 ? (
              <div className="space-y-3">
                {result.supportingEvidence.map((item, index) => (
                  <div
                    key={`${item.kind}-${item.label}-${index}`}
                    className="rounded-[1.2rem] border border-white/8 bg-white/6 px-3 py-3"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <StatusBadge tone={getEvidenceTone(item)}>
                        {item.kind}
                      </StatusBadge>
                      <p className="text-sm font-medium text-foreground">
                        {item.label}
                      </p>
                    </div>
                    {item.detail ? (
                      <p className="text-sm text-foreground/82">{item.detail}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">
                {resultCopy.noSupportingEvidence}
              </p>
            )}
          </Card>

          {/* Mechanic Report */}
          <MechanicReportSection
            result={result}
            snapshot={session}
            language={resultLanguage}
          />

          <div className="grid gap-3">
            <Button fullWidth href={`/session?lang=${resultLanguage}`}>
              {resultCopy.backToSession}
            </Button>
            <Button fullWidth href="/" variant="ghost">
              {resultCopy.home}
            </Button>
          </div>
        </div>
      </ScreenFrame>
    </MobileAppShell>
  );
}

// ─── Mechanic Report Section ─────────────────────────────────────────────────

function MechanicReportSection({
  result,
  snapshot,
  language,
}: {
  result: RepairResult;
  snapshot: RepairSessionSnapshot | null;
  language: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reportText, setReportText] = useState("");

  const generateReport = useCallback(() => {
    if (!snapshot) return;
    const report = buildMechanicExport(result, snapshot);
    setReportText(report.fullText);
    setIsOpen(true);
  }, [result, snapshot]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = reportText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [reportText]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "F-150 Repair Buddy — 정비 리포트",
          text: reportText,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  }, [reportText, handleCopy]);

  return (
    <>
      <button
        type="button"
        onClick={generateReport}
        className="w-full rounded-[1.4rem] border border-accent/30 bg-accent/8 px-5 py-4 text-center transition active:scale-[0.98]"
      >
        <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-accent uppercase">
          {language === "ko" ? "정비사 보고서" : "Mechanic Report"}
        </p>
        <p className="mt-1 text-sm font-semibold text-foreground">
          {language === "ko"
            ? "정비사에게 보여줄 리포트 생성"
            : "Generate report for your mechanic"}
        </p>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="max-h-[85vh] w-full max-w-md overflow-hidden rounded-t-[1.6rem] border-t border-white/12 bg-[#0c0e10]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <p className="text-sm font-semibold text-foreground">
                {language === "ko" ? "정비 리포트" : "Mechanic Report"}
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[0.62rem] font-semibold tracking-[0.14em] text-foreground/82 uppercase"
              >
                {language === "ko" ? "닫기" : "Close"}
              </button>
            </div>

            {/* Report content */}
            <div
              className="overflow-y-auto px-5 py-4"
              style={{
                maxHeight: "calc(85vh - 8rem)",
              }}
            >
              <pre className="whitespace-pre-wrap break-words font-mono text-[0.7rem] leading-5 text-foreground/80">
                {reportText}
              </pre>
            </div>

            {/* Action buttons */}
            <div
              className="flex gap-3 border-t border-white/8 px-5 py-4"
              style={{
                paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)",
              }}
            >
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 rounded-2xl border border-white/12 bg-white/6 py-3 text-sm font-semibold text-foreground transition active:scale-[0.97]"
              >
                {copied
                  ? language === "ko"
                    ? "복사됨!"
                    : "Copied!"
                  : language === "ko"
                    ? "텍스트 복사"
                    : "Copy Text"}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex-1 rounded-2xl bg-accent py-3 text-sm font-semibold text-white transition active:scale-[0.97]"
              >
                {language === "ko" ? "공유하기" : "Share"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
