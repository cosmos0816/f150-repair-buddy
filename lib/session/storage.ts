import { buildSessionEvidence } from "@/lib/session/evidence";
import { DEFAULT_SESSION_LANGUAGE } from "@/lib/session/session-language";
import type {
  RepairSessionReport,
  RepairSessionSnapshot,
  SessionConversationMessage,
  SessionEvent,
} from "@/lib/types/session";

const ACTIVE_SESSION_STORAGE_KEY = "repair-buddy.active-session.v2";
const ENDED_SESSION_REPORT_STORAGE_KEY = "repair-buddy.ended-session-report.v1";
const MAX_LOCAL_STORAGE_BYTES = 24 * 1024;

const MAX_PERSISTED_BOOKMARK_EVENTS = 12;
const MAX_PERSISTED_TRANSCRIPT_EVENTS = 8;
const MAX_PERSISTED_STATUS_EVENTS = 6;
const MAX_PERSISTED_AI_RESPONSE_EVENTS = 2;
const MAX_PERSISTED_CONVERSATION_MESSAGES = 8;
const MAX_PERSISTED_TEXT_LENGTH = 180;
const MAX_PERSISTED_REPORT_BOOKMARKS = 8;
const MAX_PERSISTED_REPORT_SNIPPETS = 5;
const MAX_PERSISTED_REPORT_ISSUE_AREAS = 4;
const MAX_PERSISTED_REPORT_SYMPTOMS = 4;
const MAX_PERSISTED_REPORT_INSPECT_NEXT = 4;
const MAX_PERSISTED_REPORT_EVIDENCE = 4;

type SessionStorageWriteStatus = {
  persisted: boolean;
  reason?: "quota" | "storage_unavailable" | "too_large" | "unknown";
};

type StoredRepairSessionSnapshot = Pick<
  RepairSessionSnapshot,
  "id" | "vehicleId" | "sessionLanguage" | "startedAt" | "endedAt" | "mode"
> & {
  conversation?: SessionConversationMessage[];
  events: SessionEvent[];
  evidence?: RepairSessionSnapshot["evidence"];
};

let inMemorySessionSnapshot: RepairSessionSnapshot | null = null;
let inMemorySessionReport: RepairSessionReport | null = null;

function canUseStorage() {
  return (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  );
}

function trimText(value: string | undefined, maxLength = MAX_PERSISTED_TEXT_LENGTH) {
  const normalized = value?.replace(/\s+/g, " ").trim() ?? "";

  if (!normalized) {
    return "";
  }

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

function isQuotaExceededError(error: unknown) {
  return (
    error instanceof DOMException &&
    (error.name === "QuotaExceededError" ||
      error.name === "NS_ERROR_DOM_QUOTA_REACHED")
  );
}

function safeSetStorageItem(key: string, value: string): SessionStorageWriteStatus {
  if (!canUseStorage()) {
    return {
      persisted: false,
      reason: "storage_unavailable",
    };
  }

  if (getSerializedByteLength(value) > MAX_LOCAL_STORAGE_BYTES) {
    return {
      persisted: false,
      reason: "too_large",
    };
  }

  try {
    window.localStorage.setItem(key, value);
    return { persisted: true };
  } catch (error) {
    if (isQuotaExceededError(error)) {
      try {
        window.localStorage.removeItem(key);
        window.localStorage.setItem(key, value);
        return { persisted: true };
      } catch (retryError) {
        if (isQuotaExceededError(retryError)) {
          return {
            persisted: false,
            reason: "quota",
          };
        }

        return {
          persisted: false,
          reason: "unknown",
        };
      }
    }

    return {
      persisted: false,
      reason: "unknown",
    };
  }
}

function getSerializedByteLength(value: string) {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(value).length;
  }

  return value.length * 2;
}

function trimConversationMessages(messages: SessionConversationMessage[]) {
  return messages
    .filter((message) => trimText(message.text))
    .slice(-MAX_PERSISTED_CONVERSATION_MESSAGES)
    .map((message) => ({
      ...message,
      text: trimText(message.text),
    }));
}

function takeTail<T>(items: T[], limit: number) {
  if (limit <= 0) {
    return [] as T[];
  }

  return items.slice(-limit);
}

function trimSessionEvents(
  events: SessionEvent[],
  limits = {
    bookmark: MAX_PERSISTED_BOOKMARK_EVENTS,
    transcript: MAX_PERSISTED_TRANSCRIPT_EVENTS,
    status: MAX_PERSISTED_STATUS_EVENTS,
    aiResponse: MAX_PERSISTED_AI_RESPONSE_EVENTS,
  },
) {
  const statusEvents = takeTail(
    events.filter((event): event is Extract<SessionEvent, { type: "status" }> => {
      return event.type === "status";
    }),
    limits.status,
  ).map((event) => ({
    ...event,
    message: trimText(event.message),
  }));
  const bookmarkEvents = takeTail(
    events.filter((event): event is Extract<SessionEvent, { type: "bookmark" }> => {
      return event.type === "bookmark";
    }),
    limits.bookmark,
  ).map((event) => ({
    ...event,
    note: trimText(event.note, 120) || undefined,
  }));
  const transcriptEvents = takeTail(
    events.filter((event): event is Extract<SessionEvent, { type: "transcript" }> => {
      return event.type === "transcript";
    }),
    limits.transcript,
  ).map((event) => ({
    ...event,
    transcript: trimText(event.transcript),
  }));
  const aiResponseEvents = takeTail(
    events.filter((event): event is Extract<SessionEvent, { type: "ai_response" }> => {
      return event.type === "ai_response";
    }),
    limits.aiResponse,
  );

  return [...statusEvents, ...bookmarkEvents, ...transcriptEvents, ...aiResponseEvents].sort(
    (left, right) => {
      return (
        new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime()
      );
    },
  );
}

function buildStoredSessionSnapshot(
  snapshot: RepairSessionSnapshot,
  options = {
    conversationLimit: MAX_PERSISTED_CONVERSATION_MESSAGES,
    eventLimits: {
      bookmark: MAX_PERSISTED_BOOKMARK_EVENTS,
      transcript: MAX_PERSISTED_TRANSCRIPT_EVENTS,
      status: MAX_PERSISTED_STATUS_EVENTS,
      aiResponse: MAX_PERSISTED_AI_RESPONSE_EVENTS,
    },
  },
): StoredRepairSessionSnapshot {
  const conversation = takeTail(
    trimConversationMessages(snapshot.evidence.conversation),
    options.conversationLimit,
  );
  const events = trimSessionEvents(snapshot.events, options.eventLimits);

  return {
    id: snapshot.id,
    vehicleId: snapshot.vehicleId,
    sessionLanguage: snapshot.sessionLanguage,
    startedAt: snapshot.startedAt,
    endedAt: snapshot.endedAt,
    mode: snapshot.mode,
    events,
    conversation,
    evidence: buildSessionEvidence(events, conversation),
  };
}

function buildStoredSessionSnapshotVariants(snapshot: RepairSessionSnapshot) {
  return [
    buildStoredSessionSnapshot(snapshot),
    buildStoredSessionSnapshot(snapshot, {
      conversationLimit: 4,
      eventLimits: {
        bookmark: 8,
        transcript: 4,
        status: 4,
        aiResponse: 1,
      },
    }),
    buildStoredSessionSnapshot(snapshot, {
      conversationLimit: 2,
      eventLimits: {
        bookmark: 4,
        transcript: 2,
        status: 3,
        aiResponse: 1,
      },
    }),
    {
      id: snapshot.id,
      vehicleId: snapshot.vehicleId,
      sessionLanguage: snapshot.sessionLanguage,
      startedAt: snapshot.startedAt,
      endedAt: snapshot.endedAt,
      mode: snapshot.mode,
      events: trimSessionEvents(snapshot.events, {
        bookmark: 3,
        transcript: 0,
        status: 2,
        aiResponse: 0,
      }),
      conversation: [],
      evidence: buildSessionEvidence(
        trimSessionEvents(snapshot.events, {
          bookmark: 3,
          transcript: 0,
          status: 2,
          aiResponse: 0,
        }),
        [],
      ),
    } satisfies StoredRepairSessionSnapshot,
  ];
}

function buildStoredSessionReport(report: RepairSessionReport) {
  return {
    ...report,
    issueAreaCandidates: report.issueAreaCandidates
      .map((value) => trimText(value, 120))
      .filter(Boolean)
      .slice(0, MAX_PERSISTED_REPORT_ISSUE_AREAS),
    possibleSymptoms: report.possibleSymptoms
      .map((value) => trimText(value, 80))
      .filter(Boolean)
      .slice(0, MAX_PERSISTED_REPORT_SYMPTOMS),
    bookmarkHistory: report.bookmarkHistory
      .slice(-MAX_PERSISTED_REPORT_BOOKMARKS)
      .map((bookmark) => ({
        ...bookmark,
        label: trimText(bookmark.label, 80),
        note: trimText(bookmark.note, 120) || undefined,
      })),
    transcriptSnippets: report.transcriptSnippets
      .slice(-MAX_PERSISTED_REPORT_SNIPPETS)
      .map((snippet) => ({
        ...snippet,
        text: trimText(snippet.text),
      })),
    visibleTargetSummary: trimText(report.visibleTargetSummary, 120) || undefined,
    persistenceWarning: trimText(report.persistenceWarning, 140) || undefined,
    result: {
      ...report.result,
      likelyIssueArea: trimText(report.result.likelyIssueArea, 140),
      nextSafeStep: trimText(report.result.nextSafeStep, 180),
      inspectNext: report.result.inspectNext
        .map((item) => trimText(item, 120))
        .filter(Boolean)
        .slice(0, MAX_PERSISTED_REPORT_INSPECT_NEXT),
      disclaimer: trimText(report.result.disclaimer, 180),
      supportingEvidence: report.result.supportingEvidence
        .slice(0, MAX_PERSISTED_REPORT_EVIDENCE)
        .map((item) => ({
          ...item,
          label: trimText(item.label, 100),
          detail: trimText(item.detail, 140) || undefined,
        })),
    },
  } satisfies RepairSessionReport;
}

function parseStoredSessionSnapshot(value: string) {
  const parsedValue = JSON.parse(value) as Partial<RepairSessionSnapshot> & {
    conversation?: RepairSessionSnapshot["evidence"]["conversation"];
  };

  if (
    parsedValue &&
    Array.isArray(parsedValue.events) &&
    !parsedValue.evidence
  ) {
    return {
      ...parsedValue,
      sessionLanguage: parsedValue.sessionLanguage ?? DEFAULT_SESSION_LANGUAGE,
      evidence: buildSessionEvidence(
        parsedValue.events,
        parsedValue.conversation ?? [],
      ),
    } as RepairSessionSnapshot;
  }

  return {
    ...parsedValue,
    sessionLanguage: parsedValue.sessionLanguage ?? DEFAULT_SESSION_LANGUAGE,
  } as RepairSessionSnapshot;
}

export function setInMemoryStoredSessionSnapshot(
  snapshot: RepairSessionSnapshot | null,
) {
  inMemorySessionSnapshot = snapshot;
}

export function setInMemoryStoredSessionReport(report: RepairSessionReport | null) {
  inMemorySessionReport = report;
}

export function readStoredSessionSnapshot() {
  if (inMemorySessionSnapshot) {
    return inMemorySessionSnapshot;
  }

  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return parseStoredSessionSnapshot(rawValue);
  } catch {
    return null;
  }
}

export function readStoredSessionReport() {
  if (inMemorySessionReport) {
    return inMemorySessionReport;
  }

  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(ENDED_SESSION_REPORT_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as RepairSessionReport;
  } catch {
    return null;
  }
}

export function writeStoredSessionSnapshot(snapshot: RepairSessionSnapshot) {
  inMemorySessionSnapshot = snapshot;

  for (const storedSnapshot of buildStoredSessionSnapshotVariants(snapshot)) {
    const serialized = JSON.stringify(storedSnapshot);
    const status = safeSetStorageItem(
      ACTIVE_SESSION_STORAGE_KEY,
      serialized,
    );

    if (status.persisted) {
      return status;
    }

    if (status.reason !== "too_large") {
      return status;
    }
  }

  return {
    persisted: false,
    reason: "too_large",
  };
}

export function writeStoredSessionReport(report: RepairSessionReport) {
  inMemorySessionReport = report;
  const storedReport = buildStoredSessionReport(report);

  return safeSetStorageItem(
    ENDED_SESSION_REPORT_STORAGE_KEY,
    JSON.stringify(storedReport),
  );
}
