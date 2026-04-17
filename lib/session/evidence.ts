import { APP_CONFIG } from "@/lib/config/app-config";
import type { RepairBuddyMode } from "@/lib/config/app-config";
import { resolveSessionLanguage } from "@/lib/session/session-language";
import type {
  BookmarkSessionEvent,
  BookmarkType,
  FrameSessionEvent,
  RepairSessionEvidence,
  RepairSessionEvidenceTimelineGroup,
  RepairSessionEvidenceTimelineItem,
  RepairSessionSnapshot,
  SessionLanguage,
  SessionConversationMessage,
  SessionEvent,
  SessionStatus,
  StatusSessionEvent,
  TranscriptSessionEvent,
} from "@/lib/types/session";

export const BOOKMARK_TYPE_OPTIONS: Array<{
  value: BookmarkType;
  label: string;
}> = [
  { value: "sound", label: "Sound" },
  { value: "leak", label: "Leak" },
  { value: "rust", label: "Rust" },
  { value: "connector", label: "Connector" },
  { value: "light", label: "Light" },
  { value: "belt_pulley", label: "Belt/Pulley" },
  { value: "other", label: "Other" },
];

const BOOKMARK_LABELS: Record<BookmarkType, string> = {
  sound: "Sound",
  leak: "Leak",
  rust: "Rust",
  connector: "Connector",
  light: "Light",
  belt_pulley: "Belt/Pulley",
  other: "Other",
};

function createRandomId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function createSessionId() {
  return `session_${createRandomId()}`;
}

export function createSessionEventId(prefix: string) {
  return `${prefix}_${createRandomId()}`;
}

export function getBookmarkTypeLabel(bookmarkType: BookmarkType) {
  return BOOKMARK_LABELS[bookmarkType];
}

export function buildSessionEvidence(
  events: SessionEvent[],
  conversation: SessionConversationMessage[],
): RepairSessionEvidence {
  return {
    captures: events.filter((event): event is FrameSessionEvent => event.type === "frame"),
    bookmarks: events.filter(
      (event): event is BookmarkSessionEvent => event.type === "bookmark",
    ),
    conversation: [...conversation],
  };
}

export function buildSessionSnapshot(params: {
  id: string;
  startedAt: string;
  endedAt?: string;
  mode: RepairBuddyMode;
  sessionLanguage: SessionLanguage;
  events: SessionEvent[];
  conversation: SessionConversationMessage[];
}) {
  return {
    id: params.id,
    vehicleId: APP_CONFIG.vehicle.id,
    sessionLanguage: params.sessionLanguage,
    startedAt: params.startedAt,
    endedAt: params.endedAt,
    mode: params.mode,
    events: params.events,
    evidence: buildSessionEvidence(params.events, params.conversation),
  } satisfies RepairSessionSnapshot;
}

export function createStatusSessionEvent(
  status: SessionStatus,
  message: string,
  createdAt = new Date().toISOString(),
) {
  return {
    id: createSessionEventId("evt_status"),
    type: "status",
    createdAt,
    status,
    message,
  } satisfies StatusSessionEvent;
}

export function createTranscriptSessionEvent(
  transcript: string,
  createdAt = new Date().toISOString(),
) {
  return {
    id: createSessionEventId("evt_transcript"),
    type: "transcript",
    createdAt,
    transcript,
  } satisfies TranscriptSessionEvent;
}

export function createBookmarkSessionEvent(params: {
  bookmarkType: BookmarkType;
  note?: string;
  createdAt?: string;
}) {
  return {
    id: createSessionEventId("evt_bookmark"),
    type: "bookmark",
    createdAt: params.createdAt ?? new Date().toISOString(),
    bookmarkType: params.bookmarkType,
    note: params.note,
  } satisfies BookmarkSessionEvent;
}

export function createFrameSessionEvent(params: {
  url: string;
  width: number;
  height: number;
  mimeType?: FrameSessionEvent["mimeType"];
  createdAt?: string;
  captureKind?: FrameSessionEvent["captureKind"];
  sentToConversation?: boolean;
  relatedBookmarkType?: FrameSessionEvent["relatedBookmarkType"];
}) {
  return {
    id: createSessionEventId("evt_frame"),
    type: "frame",
    createdAt: params.createdAt ?? new Date().toISOString(),
    mimeType: params.mimeType ?? "image/jpeg",
    storage: "local",
    url: params.url,
    width: params.width,
    height: params.height,
    source: "camera_preview",
    captureKind: params.captureKind ?? "manual",
    sentToConversation: params.sentToConversation ?? false,
    relatedBookmarkType: params.relatedBookmarkType,
  } satisfies FrameSessionEvent;
}

export function buildSessionEvidenceTimeline(
  evidence: RepairSessionEvidence,
): RepairSessionEvidenceTimelineItem[] {
  return [
    ...evidence.captures.map((capture) => ({
      id: capture.id,
      itemType: "capture" as const,
      createdAt: capture.createdAt,
      capture,
    })),
    ...evidence.bookmarks.map((bookmark) => ({
      id: bookmark.id,
      itemType: "bookmark" as const,
      createdAt: bookmark.createdAt,
      bookmark,
    })),
    ...evidence.conversation.map((message) => ({
      id: message.id,
      itemType: "conversation" as const,
      createdAt: message.createdAt,
      message,
    })),
  ].sort((left, right) => {
    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

function isSameLocalDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function formatHistoryGroupLabel(createdAt: string, sessionLanguage: SessionLanguage) {
  const value = new Date(createdAt);
  const now = new Date();

  if (isSameLocalDay(value, now)) {
    return sessionLanguage === "ko" ? "오늘" : "Today";
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameLocalDay(value, yesterday)) {
    return sessionLanguage === "ko" ? "어제" : "Yesterday";
  }

  return value.toLocaleDateString(sessionLanguage === "ko" ? "ko-KR" : "en-US", {
    month: "short",
    day: "numeric",
  });
}

export function groupSessionEvidenceTimelineByDate(
  items: RepairSessionEvidenceTimelineItem[],
  sessionLanguage: SessionLanguage = resolveSessionLanguage(undefined),
): RepairSessionEvidenceTimelineGroup[] {
  const groups = new Map<string, RepairSessionEvidenceTimelineGroup>();

  items.forEach((item) => {
    const label = formatHistoryGroupLabel(item.createdAt, sessionLanguage);
    const key = new Date(item.createdAt).toDateString();
    const existingGroup = groups.get(key);

    if (existingGroup) {
      existingGroup.items.push(item);
      return;
    }

    groups.set(key, {
      id: key,
      label,
      items: [item],
    });
  });

  return [...groups.values()];
}
