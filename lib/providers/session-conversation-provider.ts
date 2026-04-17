import { GeminiLiveSessionConversationProvider } from "@/lib/providers/gemini-live-session-conversation-provider";
import type {
  BookmarkType,
  FrameCaptureKind,
  RepairSessionSnapshot,
  SessionConversationFlowState,
} from "@/lib/types/session";

export type SessionConversationErrorCode =
  | "connection_failed"
  | "microphone_unavailable"
  | "assistant_timeout"
  | "reconnect_failed"
  | "provider_unavailable";

export type SessionConversationNoticeCode =
  | "reconnecting"
  | "reconnected"
  | "assistant_interrupted";

export type SessionConversationVisualContextSendStatus =
  | "sent"
  | "unavailable"
  | "failed";

export class SessionConversationError extends Error {
  readonly code: SessionConversationErrorCode;
  readonly recoverable: boolean;

  constructor(
    code: SessionConversationErrorCode,
    message: string,
    options?: { recoverable?: boolean },
  ) {
    super(message);
    this.name = "SessionConversationError";
    this.code = code;
    this.recoverable = Boolean(options?.recoverable);
  }
}

export type SessionConversationNotice = {
  code: SessionConversationNoticeCode;
  message: string;
};

export type SessionConversationDiagnostic = {
  activeProvider?: "gemini" | "mock";
  bootstrapStatus?: number;
  bootstrapRequestTarget?: string;
  connectionPhase?:
    | "bootstrap_request"
    | "bootstrap_response"
    | "microphone_request"
    | "microphone_ready"
    | "session_connecting"
    | "session_open"
    | "session_error"
    | "session_closed"
    | "failed";
  errorMessage?: string;
  errorPayload?: string;
  firstInboundMessageType?: string;
  firstOutboundMessageType?: string;
  geminiKeyPresent?: boolean;
  liveConfigJson?: string;
  liveModeExplicitlyDisabled?: boolean;
  modelName?: string;
  websocketCloseClean?: boolean;
  websocketCloseCode?: number;
  websocketCloseReason?: string;
  websocketMethod?: string;
  websocketUrl?: string;
};

export interface SessionConversationTurn {
  transcript: string;
  reply: string;
}

export interface SessionConversationVisualContextSendResult {
  message?: string;
  status: SessionConversationVisualContextSendStatus;
}

export interface SessionConversationProviderCallbacks {
  getSessionSnapshot(): RepairSessionSnapshot;
  onDiagnostic?(diagnostic: SessionConversationDiagnostic): void;
  onError(error: unknown): void;
  onNotice?(notice: SessionConversationNotice): void;
  onStateChange(state: SessionConversationFlowState): void;
  onTranscriptChange(transcript: string): void;
  onAssistantResponseChange(reply: string): void;
  onTurnReady(turn: SessionConversationTurn): void;
  /** Called with PCM audio chunks from the model's voice response. */
  onAudioChunk?(base64PcmData: string, sampleRate: number): void;
}

export interface SessionConversationRun {
  readonly supportsVisualContext: boolean;
  sendVisualContext(
    context: SessionConversationVisualContext,
  ): Promise<SessionConversationVisualContextSendResult>;
  stop(): void;
}

export interface SessionConversationVisualContext {
  captureKind: FrameCaptureKind;
  createdAt: string;
  height: number;
  mimeType: "image/jpeg" | "image/png";
  note?: string;
  relatedBookmarkType?: BookmarkType;
  url: string;
  width: number;
}

export interface SessionConversationProvider {
  readonly name: "gemini" | "mock";
  startConversation(
    session: RepairSessionSnapshot,
    callbacks: SessionConversationProviderCallbacks,
  ): Promise<SessionConversationRun>;
}

const geminiSessionConversationProvider = new GeminiLiveSessionConversationProvider();

export function getDefaultSessionConversationProvider() {
  return geminiSessionConversationProvider satisfies SessionConversationProvider;
}
