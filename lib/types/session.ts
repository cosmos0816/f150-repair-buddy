import type { RepairBuddyMode } from "@/lib/config/app-config";
import type { Recommendation, RepairResult } from "@/lib/types/result";

export type BookmarkType =
  | "sound"
  | "leak"
  | "rust"
  | "connector"
  | "light"
  | "belt_pulley"
  | "other";

export type SessionLanguage = "en" | "ko";
export type SessionVoiceOutputMode = "on" | "off";
export type SessionVoiceOutputState = "idle" | "speaking" | "unsupported";

export type SessionStatus = "idle" | "ready" | "capturing" | "review" | "complete";
export type SessionConversationRole = "user" | "assistant";
export type FrameCaptureKind = "manual" | "sampled" | "bookmark";
export type SessionConversationFlowState =
  | "idle"
  | "connecting"
  | "listening"
  | "processing"
  | "assistant_responding"
  | "failed";

type SessionEventBase = {
  id: string;
  createdAt: string;
};

export type SessionConversationMessage = {
  id: string;
  createdAt: string;
  role: SessionConversationRole;
  text: string;
};

export type FrameSessionEvent = SessionEventBase & {
  type: "frame";
  mimeType: "image/jpeg" | "image/png";
  storage: "local";
  url: string;
  width: number;
  height: number;
  source: "camera_preview";
  captureKind: FrameCaptureKind;
  sentToConversation: boolean;
  relatedBookmarkType?: BookmarkType;
};

export type BookmarkSessionEvent = SessionEventBase & {
  type: "bookmark";
  bookmarkType: BookmarkType;
  note?: string;
};

export type TranscriptSessionEvent = SessionEventBase & {
  type: "transcript";
  transcript: string;
};

export type AIResponseSessionEvent = SessionEventBase & {
  type: "ai_response";
  recommendation: Recommendation;
  result: RepairResult;
};

export type StatusSessionEvent = SessionEventBase & {
  type: "status";
  status: SessionStatus;
  message: string;
};

export type SessionEvent =
  | FrameSessionEvent
  | BookmarkSessionEvent
  | TranscriptSessionEvent
  | AIResponseSessionEvent
  | StatusSessionEvent;

export interface RepairSessionEvidence {
  captures: FrameSessionEvent[];
  bookmarks: BookmarkSessionEvent[];
  conversation: SessionConversationMessage[];
}

export type RepairSessionEvidenceTimelineItemType =
  | "capture"
  | "bookmark"
  | "conversation";

export type CaptureEvidenceTimelineItem = {
  id: string;
  itemType: "capture";
  createdAt: string;
  capture: FrameSessionEvent;
};

export type BookmarkEvidenceTimelineItem = {
  id: string;
  itemType: "bookmark";
  createdAt: string;
  bookmark: BookmarkSessionEvent;
};

export type ConversationEvidenceTimelineItem = {
  id: string;
  itemType: "conversation";
  createdAt: string;
  message: SessionConversationMessage;
};

export type RepairSessionEvidenceTimelineItem =
  | CaptureEvidenceTimelineItem
  | BookmarkEvidenceTimelineItem
  | ConversationEvidenceTimelineItem;

export interface RepairSessionEvidenceTimelineGroup {
  id: string;
  label: string;
  items: RepairSessionEvidenceTimelineItem[];
}

export interface RepairSessionSnapshot {
  id: string;
  vehicleId: string;
  sessionLanguage: SessionLanguage;
  startedAt: string;
  endedAt?: string;
  mode: RepairBuddyMode;
  events: SessionEvent[];
  evidence: RepairSessionEvidence;
}

export interface RepairSessionReportBookmark {
  createdAt: string;
  bookmarkType: BookmarkType;
  label: string;
  note?: string;
}

export interface RepairSessionReportSnippet {
  createdAt: string;
  role: SessionConversationRole;
  text: string;
}

export type RepairSessionReportPersistenceState =
  | "persisted"
  | "partial"
  | "memory_only";

export interface RepairSessionReport {
  sessionId: string;
  vehicleId: string;
  sessionLanguage: SessionLanguage;
  startedAt: string;
  endedAt: string;
  providerName: RepairBuddyMode;
  captureCount: number;
  bookmarkCount: number;
  conversationCount: number;
  visibleTargetSummary?: string;
  issueAreaCandidates: string[];
  possibleSymptoms: string[];
  bookmarkHistory: RepairSessionReportBookmark[];
  transcriptSnippets: RepairSessionReportSnippet[];
  result: RepairResult;
  persistenceState: RepairSessionReportPersistenceState;
  persistenceWarning?: string;
}
