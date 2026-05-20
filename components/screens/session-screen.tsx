"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PcmAudioPlayer } from "@/lib/live/pcm-audio-player";
import { useCallback, useEffect, useRef, useState } from "react";

import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  buildGenericVideoOnlyCameraConstraints,
  buildPreferredCameraConstraints,
  describeCameraPreview,
  getCameraTorchState,
  getGrantedMicrophoneDetail,
  getInitialMediaDetail,
  getRequestingMediaDetail,
  getTorchUnavailableMessage,
  getUnsupportedMediaMessage,
  isMediaAccessSupported,
  resolveMediaAccessFailure,
  setCameraTorchEnabled,
  type MediaAccessState,
} from "@/lib/media/session-media";
import { createSessionSpeechController } from "@/lib/media/session-speech";
import { analyzeSessionClient } from "@/lib/providers/analyze-session-client";
import { MockRepairBuddyProvider } from "@/lib/providers/mock-repair-buddy-provider";
import {
  getDefaultSessionConversationProvider,
  SessionConversationError,
  type SessionConversationDiagnostic,
  type SessionConversationRun,
} from "@/lib/providers/session-conversation-provider";
import {
  BOOKMARK_TYPE_OPTIONS,
  buildSessionEvidence,
  buildSessionEvidenceTimeline,
  buildSessionSnapshot,
  createBookmarkSessionEvent,
  createFrameSessionEvent,
  createSessionId,
  createStatusSessionEvent,
  createTranscriptSessionEvent,
  groupSessionEvidenceTimelineByDate,
} from "@/lib/session/evidence";
import { captureFrameFromVideo } from "@/lib/session/frame-capture";
import { buildRepairSessionReport } from "@/lib/session/report";
import {
  DEFAULT_SESSION_LANGUAGE,
  formatHistoryCountLabel,
  getConversationFlowLabel,
  getLocalizedBookmarkTypeLabel,
  getSessionCopy,
  getSessionLanguageButtonLabel,
  resolveSessionLanguage,
  translateExactText,
} from "@/lib/session/session-language";
import {
  setInMemoryStoredSessionReport,
  writeStoredSessionReport,
  writeStoredSessionSnapshot,
} from "@/lib/session/storage";
import { getTranscriptLanguageMatch } from "@/lib/session/transcript-language";
import type {
  BookmarkType,
  FrameCaptureKind,
  RepairSessionEvidenceTimelineGroup,
  RepairSessionEvidenceTimelineItem,
  SessionConversationFlowState,
  SessionConversationMessage,
  SessionEvent,
  SessionLanguage,
  SessionVoiceOutputMode,
  SessionVoiceOutputState,
} from "@/lib/types/session";

type BadgeTone = "neutral" | "accent" | "green" | "yellow" | "red";
type RailTone = BadgeTone;
type PreviewVariant = "styled" | "plain";
type VisualContextCaptureOptions = {
  captureKind: FrameCaptureKind;
  createdAt?: string;
  flashMessage?: string;
  note?: string;
  relatedBookmarkType?: BookmarkType;
};

const SAMPLED_VISUAL_CONTEXT_INITIAL_DELAY_MS = 3200;
const SAMPLED_VISUAL_CONTEXT_INTERVAL_MS = 12000;

type RailActionButtonProps = {
  disabled?: boolean;
  href?: string;
  label: string;
  onClick?: () => void;
  tone?: RailTone;
};

const sessionConversationProvider = getDefaultSessionConversationProvider();

function shouldRetryPreviewOnPlainVideo(
  metrics: {
    srcObjectAssigned: boolean;
    playResolved: boolean;
    videoWidth: number;
    videoHeight: number;
  },
  previewVariant: PreviewVariant,
  usedBasicVideoFallback: boolean,
) {
  if (previewVariant !== "styled" || usedBasicVideoFallback) {
    return false;
  }

  if (!metrics.srcObjectAssigned) {
    return true;
  }

  if (!metrics.playResolved) {
    return true;
  }

  return metrics.videoWidth === 0 || metrics.videoHeight === 0;
}

async function waitForVideoRender(video: HTMLVideoElement) {
  await new Promise<void>((resolve) => {
    let settled = false;

    const finish = () => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      resolve();
    };

    const cleanup = () => {
      video.removeEventListener("loadedmetadata", finish);
      video.removeEventListener("loadeddata", finish);
      video.removeEventListener("canplay", finish);
      window.clearTimeout(timeoutId);
    };

    video.addEventListener("loadedmetadata", finish, { once: true });
    video.addEventListener("loadeddata", finish, { once: true });
    video.addEventListener("canplay", finish, { once: true });

    const timeoutId = window.setTimeout(finish, 400);
  });
}

function getToneForState(
  kind: "camera" | "microphone",
  state: MediaAccessState,
): BadgeTone {
  if (state === "granted") {
    return "green";
  }

  if (state === "requesting") {
    return "accent";
  }

  if (state === "error") {
    return "yellow";
  }

  if (state === "denied" || state === "unsupported") {
    if (kind === "microphone") {
      return "yellow";
    }

    return "red";
  }

  return "neutral";
}

function getCameraSummary(
  cameraState: MediaAccessState,
  hasLivePreview: boolean,
  language: SessionLanguage,
) {
  if (hasLivePreview) {
    return translateExactText(language, "Camera live");
  }

  if (cameraState === "denied") {
    return translateExactText(language, "Camera blocked");
  }

  if (cameraState === "unsupported") {
    return translateExactText(language, "Preview unavailable");
  }

  if (cameraState === "error") {
    return translateExactText(language, "Try again");
  }

  if (cameraState === "requesting") {
    return translateExactText(language, "Opening camera");
  }

  return translateExactText(language, "Camera off");
}

function getCaptureTone(
  cameraState: MediaAccessState,
  hasLivePreview: boolean,
): RailTone {
  if (hasLivePreview) {
    return "green";
  }

  if (cameraState === "requesting") {
    return "accent";
  }

  if (cameraState === "error") {
    return "yellow";
  }

  if (cameraState === "denied" || cameraState === "unsupported") {
    return "red";
  }

  return "accent";
}

function getConversationFlowStatus(
  conversationFlowState: SessionConversationFlowState,
  language: SessionLanguage,
) {
  if (conversationFlowState === "connecting") {
    return {
      label: getConversationFlowLabel(language, "connecting"),
      tone: "accent" as const,
    };
  }

  if (conversationFlowState === "listening") {
    return {
      label: getConversationFlowLabel(language, "listening"),
      tone: "accent" as const,
    };
  }

  if (conversationFlowState === "processing") {
    return {
      label: getConversationFlowLabel(language, "processing"),
      tone: "yellow" as const,
    };
  }

  if (conversationFlowState === "assistant_responding") {
    return {
      label: getConversationFlowLabel(language, "assistant_responding"),
      tone: "green" as const,
    };
  }

  if (conversationFlowState === "failed") {
    return {
      label: getConversationFlowLabel(language, "failed"),
      tone: "red" as const,
    };
  }

  return {
    label: getConversationFlowLabel(language, "idle"),
    tone: "neutral" as const,
  };
}

function getTalkTone(
  conversationFlowState: SessionConversationFlowState,
  microphoneState: MediaAccessState,
): RailTone {
  if (conversationFlowState === "failed") {
    return "red";
  }

  if (conversationFlowState === "assistant_responding") {
    return "green";
  }

  if (
    conversationFlowState === "connecting" ||
    conversationFlowState === "listening" ||
    conversationFlowState === "processing"
  ) {
    return "accent";
  }

  return getToneForState("microphone", microphoneState);
}

function buildRailActionClass(tone: RailTone, disabled: boolean) {
  return [
    "inline-flex min-h-14 w-[5.25rem] touch-manipulation items-center justify-center rounded-[1.4rem] border px-2 text-center text-[0.62rem] font-semibold tracking-[0.14em] uppercase shadow-[0_12px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm transition",
    tone === "neutral" ? "border-white/12 bg-black/55 text-foreground/88" : "",
    tone === "accent" ? "border-accent/65 bg-accent/18 text-accent-strong" : "",
    tone === "green" ? "border-success/55 bg-success/16 text-success" : "",
    tone === "yellow" ? "border-warning/55 bg-warning/18 text-warning" : "",
    tone === "red" ? "border-danger/55 bg-danger/18 text-danger" : "",
    disabled ? "cursor-not-allowed opacity-45" : "active:scale-[0.98]",
  ].join(" ");
}

function formatConversationTimestamp(createdAt: string) {
  const isoTimeMatch = createdAt.match(/T(\d{2}):(\d{2})/);

  if (isoTimeMatch) {
    return `${isoTimeMatch[1]}:${isoTimeMatch[2]}`;
  }

  const value = new Date(createdAt);

  if (Number.isNaN(value.getTime())) {
    return "--:--";
  }

  return `${String(value.getHours()).padStart(2, "0")}:${String(
    value.getMinutes(),
  ).padStart(2, "0")}`;
}

function findLatestConversationRoleMessage(
  messages: SessionConversationMessage[],
  role: SessionConversationMessage["role"],
) {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index]?.role === role) {
      return messages[index];
    }
  }

  return undefined;
}

function getBookmarkTone(
  bookmarkCount: number,
  isBookmarkComposerOpen: boolean,
): RailTone {
  if (isBookmarkComposerOpen) {
    return "accent";
  }

  if (bookmarkCount > 0) {
    return "green";
  }

  return "neutral";
}

function formatFrameMeta(
  item: RepairSessionEvidenceTimelineItem & { itemType: "capture" },
) {
  return `${item.capture.width}×${item.capture.height} · ${formatConversationTimestamp(
    item.createdAt,
  )}`;
}

function getFrameCaptureSummary(
  captureKind: FrameCaptureKind,
  sentToConversation: boolean,
  language: SessionLanguage,
) {
  if (captureKind === "sampled") {
    return translateExactText(language, "Sampled visual context");
  }

  if (captureKind === "bookmark") {
    return sentToConversation
      ? translateExactText(language, "Bookmark context sent")
      : translateExactText(language, "Bookmark frame saved");
  }

  return sentToConversation
    ? translateExactText(language, "Captured and sent")
    : translateExactText(language, "Saved from live preview");
}

function getConversationFailureMessage(error: unknown) {
  if (error instanceof SessionConversationError) {
    return error.message;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }

  return "Talk unavailable. Try again.";
}

function formatConversationDiagnostic(
  diagnostic: SessionConversationDiagnostic | null,
) {
  if (!diagnostic) {
    return "";
  }

  const lines = [
    diagnostic.activeProvider
      ? `provider: ${diagnostic.activeProvider}`
      : null,
    diagnostic.modelName ? `model: ${diagnostic.modelName}` : null,
    diagnostic.geminiKeyPresent !== undefined
      ? `gemini key: ${diagnostic.geminiKeyPresent ? "yes" : "no"}`
      : null,
    diagnostic.bootstrapStatus !== undefined
      ? `bootstrap: ${diagnostic.bootstrapStatus}`
      : null,
    diagnostic.bootstrapRequestTarget
      ? `bootstrap target: ${diagnostic.bootstrapRequestTarget}`
      : null,
    diagnostic.connectionPhase ? `phase: ${diagnostic.connectionPhase}` : null,
    diagnostic.websocketMethod
      ? `websocket method: ${diagnostic.websocketMethod}`
      : null,
    diagnostic.websocketUrl ? `websocket: ${diagnostic.websocketUrl}` : null,
    diagnostic.firstOutboundMessageType
      ? `first outbound: ${diagnostic.firstOutboundMessageType}`
      : null,
    diagnostic.firstInboundMessageType
      ? `first inbound: ${diagnostic.firstInboundMessageType}`
      : null,
    diagnostic.websocketCloseClean !== undefined
      ? `close clean: ${diagnostic.websocketCloseClean ? "yes" : "no"}`
      : null,
    diagnostic.websocketCloseCode !== undefined
      ? `close code: ${diagnostic.websocketCloseCode}`
      : null,
    diagnostic.websocketCloseReason
      ? `close reason: ${diagnostic.websocketCloseReason}`
      : null,
    diagnostic.errorMessage ? `error: ${diagnostic.errorMessage}` : null,
    diagnostic.errorPayload ? `error payload: ${diagnostic.errorPayload}` : null,
  ].filter(Boolean);

  if (diagnostic.liveConfigJson) {
    lines.push(`live config:\n${diagnostic.liveConfigJson}`);
  }

  return lines.join("\n");
}

function getTimelineItemTypeLabel(
  item: RepairSessionEvidenceTimelineItem,
  language: SessionLanguage,
) {
  if (item.itemType === "capture") {
    return translateExactText(language, "Frame");
  }

  if (item.itemType === "bookmark") {
    return translateExactText(language, "Mark");
  }

  return item.message.role === "assistant"
    ? translateExactText(language, "Buddy")
    : translateExactText(language, "You");
}

function getTimelineItemTypeTone(item: RepairSessionEvidenceTimelineItem): BadgeTone {
  if (item.itemType === "capture") {
    return "accent";
  }

  if (item.itemType === "bookmark") {
    return "yellow";
  }

  return item.message.role === "assistant" ? "green" : "neutral";
}

function getTimelineGroupCountLabel(
  group: RepairSessionEvidenceTimelineGroup,
  language: SessionLanguage,
) {
  return translateExactText(language, `${group.items.length} items`);
}

function RailActionButton({
  disabled = false,
  href,
  label,
  onClick,
  tone = "neutral",
}: RailActionButtonProps) {
  const className = buildRailActionClass(tone, disabled);

  if (href) {
    return (
      <Link aria-label={label} className={className} href={href}>
        {label}
      </Link>
    );
  }

  return (
    <button
      aria-label={label}
      className={className}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

function createInitialSessionStatusEvent(
  createdAt: string,
  language: SessionLanguage,
) {
  return createStatusSessionEvent(
    "ready",
    translateExactText(language, "Session started."),
    createdAt,
  );
}

const HOLD_TO_END_DURATION_MS = 1500;
const MARK_LONG_PRESS_MS = 480;

type HoldToEndButtonProps = {
  disabled?: boolean;
  onComplete: () => void;
};

function HoldToEndButton({ disabled, onComplete }: HoldToEndButtonProps) {
  const timerRef = useRef<number | null>(null);
  const [holding, setHolding] = useState(false);

  function start(event: React.PointerEvent<HTMLButtonElement>) {
    if (disabled) {
      return;
    }
    // Pin all subsequent pointer events to this element so a small finger
    // wobble during the 1.5s hold doesn't trigger pointerleave/cancel.
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // setPointerCapture can throw on some browsers — non-fatal.
    }
    setHolding(true);
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setHolding(false);
      onComplete();
    }, HOLD_TO_END_DURATION_MS);
  }

  function cancel() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setHolding(false);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Hold to end session"
      disabled={disabled}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerCancel={cancel}
      style={{ touchAction: "none" }}
      className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-danger/40 bg-black/60 text-danger backdrop-blur-md transition active:scale-95 disabled:opacity-50"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-bottom rounded-full bg-danger/35 transition-transform ease-linear"
        style={{
          transform: holding ? "scaleY(1)" : "scaleY(0)",
          transitionDuration: holding ? `${HOLD_TO_END_DURATION_MS}ms` : "120ms",
        }}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative h-5 w-5"
        aria-hidden
      >
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    </button>
  );
}

type MarkButtonProps = {
  disabled?: boolean;
  label: string;
  longPressLabel: string;
  onLongPress: () => void;
  onQuickMark: () => void;
};

function MarkButton({
  disabled,
  label,
  longPressLabel,
  onLongPress,
  onQuickMark,
}: MarkButtonProps) {
  const timerRef = useRef<number | null>(null);
  const wasLongPressRef = useRef(false);
  const [pressing, setPressing] = useState(false);

  function start(event: React.PointerEvent<HTMLButtonElement>) {
    if (disabled) {
      return;
    }
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // setPointerCapture can throw on some browsers — non-fatal.
    }
    wasLongPressRef.current = false;
    setPressing(true);
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      wasLongPressRef.current = true;
      onLongPress();
    }, MARK_LONG_PRESS_MS);
  }

  function end() {
    setPressing(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!wasLongPressRef.current) {
      onQuickMark();
    }
  }

  function cancel() {
    setPressing(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      disabled={disabled}
      onPointerDown={start}
      onPointerUp={end}
      onPointerCancel={cancel}
      style={{ touchAction: "none" }}
      className={[
        "flex h-[5.4rem] w-full flex-col items-center justify-center gap-0.5 rounded-[1.85rem] border-2 border-accent/70 bg-accent text-background shadow-[0_18px_48px_rgba(0,0,0,0.55)] transition-transform disabled:opacity-50",
        pressing ? "scale-[0.97]" : "",
      ].join(" ")}
    >
      <span className="text-[1.18rem] font-extrabold tracking-[0.18em] uppercase">
        {label}
      </span>
      <span className="text-[0.58rem] font-semibold tracking-[0.16em] text-background/72 uppercase">
        {longPressLabel}
      </span>
    </button>
  );
}

type SessionScreenProps = {
  initialProviderMode?: "gemini" | "mock";
  geminiKeyPresent?: boolean;
};

export function SessionScreen({
  initialProviderMode = "mock",
  geminiKeyPresent = false,
}: SessionScreenProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerMode = initialProviderMode;
  const [isClientReady, setIsClientReady] = useState(false);
  const [isLanguageReady, setIsLanguageReady] = useState(false);
  const [sessionLanguage, setSessionLanguage] = useState<SessionLanguage>(
    DEFAULT_SESSION_LANGUAGE,
  );
  const [cameraState, setCameraState] = useState<MediaAccessState>("idle");
  const [microphoneState, setMicrophoneState] =
    useState<MediaAccessState>("idle");
  const [, setCameraDetail] = useState(() =>
    getInitialMediaDetail("camera"),
  );
  const [, setMicrophoneDetail] = useState(() =>
    getInitialMediaDetail("microphone"),
  );
  const [hasLivePreview, setHasLivePreview] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraPreviewVariant, setCameraPreviewVariant] =
    useState<PreviewVariant>("styled");
  const [usedBasicVideoFallback, setUsedBasicVideoFallback] = useState(false);
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  const [isTorchSupported, setIsTorchSupported] = useState(false);
  const [isTorchEnabled, setIsTorchEnabled] = useState(false);
  const [isTorchPending, setIsTorchPending] = useState(false);
  const [isConversationDrawerExpanded, setIsConversationDrawerExpanded] =
    useState(false);
  const [isBookmarkComposerOpen, setIsBookmarkComposerOpen] = useState(false);
  const [isBookmarkNoteVisible, setIsBookmarkNoteVisible] = useState(false);
  const [selectedBookmarkType, setSelectedBookmarkType] =
    useState<BookmarkType | null>(null);
  const [bookmarkNote, setBookmarkNote] = useState("");
  const [isCapturingFrame, setIsCapturingFrame] = useState(false);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [isEndingSession, setIsEndingSession] = useState(false);
  const [isSessionReady, setIsSessionReady] = useState(false);
  const [historyTab, setHistoryTab] = useState<"chat" | "marks">("chat");
  const [conversationFlowState, setConversationFlowState] =
    useState<SessionConversationFlowState>("idle");
  const [conversationFailureText, setConversationFailureText] = useState("");
  const [conversationDiagnostic, setConversationDiagnostic] =
    useState<SessionConversationDiagnostic | null>(null);
  const [liveTranscriptText, setLiveTranscriptText] = useState("");
  const [liveAssistantText, setLiveAssistantText] = useState("");
  const [sessionEvents, setSessionEvents] = useState<SessionEvent[]>([]);
  const [conversationMessages, setConversationMessages] = useState<
    SessionConversationMessage[]
  >([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const sessionIdRef = useRef("");
  const sessionStartedAtRef = useRef("");
  const sessionEventsRef = useRef<SessionEvent[]>(sessionEvents);
  const conversationMessagesRef = useRef<SessionConversationMessage[]>(
    conversationMessages,
  );
  const previewAttachAttemptRef = useRef(0);
  const conversationRunRef = useRef<SessionConversationRun | null>(null);
  const pcmAudioPlayerRef = useRef<PcmAudioPlayer | null>(null);
  const captureAndSendVisualContextRef = useRef<
    (options: VisualContextCaptureOptions) => Promise<boolean>
  >(async () => false);
  const sampledVisualContextTimeoutRef = useRef<number | null>(null);
  const sampledVisualContextIntervalRef = useRef<number | null>(null);
  const [isLiveVisualContextEnabled, setIsLiveVisualContextEnabled] =
    useState(false);
  const [voiceOutputMode, setVoiceOutputMode] =
    useState<SessionVoiceOutputMode>("on");
  const [voiceOutputState, setVoiceOutputState] =
    useState<SessionVoiceOutputState>("idle");
  const hasInitializedLanguageRef = useRef(false);
  const assistantInstructionRef = useRef<HTMLDivElement | null>(null);
  const recentConversationRef = useRef<HTMLDivElement | null>(null);
  const shouldAutoScrollRecentConversationRef = useRef(true);
  const voiceOutputModeRef = useRef<SessionVoiceOutputMode>("on");
  const sessionSpeechControllerRef = useRef<
    ReturnType<typeof createSessionSpeechController> | null
  >(null);

  const sessionCopy = getSessionCopy(sessionLanguage);

  const ensureSessionMetadata = useCallback(() => {
    if (sessionIdRef.current && sessionStartedAtRef.current) {
      return {
        sessionId: sessionIdRef.current,
        startedAt: sessionStartedAtRef.current,
      };
    }

    const startedAt = new Date().toISOString();
    const sessionId = createSessionId();

    sessionIdRef.current = sessionId;
    sessionStartedAtRef.current = startedAt;

    setSessionEvents((current) => {
      if (current.length > 0) {
        return current;
      }

      return [createInitialSessionStatusEvent(startedAt, sessionLanguage)];
    });
    setIsSessionReady(true);

    return {
      sessionId,
      startedAt,
    };
  }, [sessionLanguage]);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  useEffect(() => {
    voiceOutputModeRef.current = voiceOutputMode;
  }, [voiceOutputMode]);

  useEffect(() => {
    if (!isClientReady || sessionSpeechControllerRef.current) {
      return;
    }

    sessionSpeechControllerRef.current = createSessionSpeechController({
      language: sessionLanguage,
      onStateChange: (state) => {
        if (state === "unsupported") {
          setVoiceOutputMode("off");
        }
        setVoiceOutputState(state);
      },
    });
  }, [isClientReady, sessionLanguage]);

  useEffect(() => {
    if (!isClientReady || hasInitializedLanguageRef.current) {
      return;
    }

    hasInitializedLanguageRef.current = true;
    setSessionLanguage(resolveSessionLanguage(searchParams.get("lang")));
    setIsLanguageReady(true);
  }, [isClientReady, searchParams]);

  useEffect(() => {
    sessionSpeechControllerRef.current?.updateLanguage(sessionLanguage);
  }, [sessionLanguage]);

  useEffect(() => {
    if (!isLanguageReady) {
      return;
    }

    ensureSessionMetadata();
  }, [ensureSessionMetadata, isLanguageReady]);

  // Auto-request camera access once the session is ready, so the OS permission
  // prompt fires immediately on first visit. The new layout has no Capture
  // button to drive this manually, so the request needs to happen on its own.
  const hasAutoRequestedCameraRef = useRef(false);
  useEffect(() => {
    if (!isLanguageReady) {
      return;
    }
    if (hasAutoRequestedCameraRef.current) {
      return;
    }
    if (cameraState !== "idle") {
      return;
    }
    hasAutoRequestedCameraRef.current = true;
    void handleCameraAccess();
    // handleCameraAccess is stable across renders for our purposes (it only
    // reads refs and setState) — intentionally not in deps to avoid loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLanguageReady, cameraState]);

  useEffect(() => {
    return () => {
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
      conversationRunRef.current?.stop();
      sessionSpeechControllerRef.current?.stop();

      if (sampledVisualContextTimeoutRef.current) {
        window.clearTimeout(sampledVisualContextTimeoutRef.current);
      }

      if (sampledVisualContextIntervalRef.current) {
        window.clearInterval(sampledVisualContextIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlHeight = html.style.height;
    const previousHtmlOverscroll = html.style.overscrollBehavior;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyHeight = body.style.height;
    const previousBodyOverscroll = body.style.overscrollBehavior;

    html.style.overflow = "hidden";
    html.style.height = "100%";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.height = "100%";
    body.style.overscrollBehavior = "none";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      html.style.height = previousHtmlHeight;
      html.style.overscrollBehavior = previousHtmlOverscroll;
      body.style.overflow = previousBodyOverflow;
      body.style.height = previousBodyHeight;
      body.style.overscrollBehavior = previousBodyOverscroll;
    };
  }, []);

  useEffect(() => {
    sessionEventsRef.current = sessionEvents;
  }, [sessionEvents]);

  useEffect(() => {
    conversationMessagesRef.current = conversationMessages;
  }, [conversationMessages]);

  useEffect(() => {
    if (!isSessionReady) {
      return;
    }

    writeStoredSessionSnapshot(
      buildSessionSnapshot({
        id: sessionIdRef.current,
        startedAt: sessionStartedAtRef.current,
        mode: providerMode,
        sessionLanguage,
        events: sessionEvents,
        conversation: conversationMessages,
      }),
    );
  }, [conversationMessages, isSessionReady, sessionEvents, sessionLanguage]);

  useEffect(() => {
    if (!flashMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setFlashMessage(null);
    }, 1400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [flashMessage]);

  useEffect(() => {
    const container = assistantInstructionRef.current;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [liveAssistantText, conversationMessages]);

  useEffect(() => {
    const container = recentConversationRef.current;

    if (!container || !shouldAutoScrollRecentConversationRef.current) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [conversationMessages]);

  useEffect(() => {
    if (!hasLivePreview || !cameraStream) {
      return;
    }

    const attemptId = previewAttachAttemptRef.current + 1;
    previewAttachAttemptRef.current = attemptId;

    async function attachStreamToPreview() {
      const video = videoRef.current;
      const metrics = {
        srcObjectAssigned: false,
        playResolved: false,
        videoWidth: 0,
        videoHeight: 0,
      };

      if (!video) {
        if (previewAttachAttemptRef.current === attemptId) {
          setIsPreviewReady(false);
        }
        return;
      }

      try {
        video.srcObject = cameraStream;
        metrics.srcObjectAssigned = video.srcObject === cameraStream;

        try {
          await video.play();
          metrics.playResolved = true;
        } catch {
          metrics.playResolved = false;
        }

        await waitForVideoRender(video);

        metrics.videoWidth = video.videoWidth;
        metrics.videoHeight = video.videoHeight;
      } catch {
        setIsPreviewReady(false);
      }

      if (previewAttachAttemptRef.current !== attemptId) {
        return;
      }

      const previewReady =
        metrics.srcObjectAssigned &&
        (metrics.playResolved ||
          (metrics.videoWidth > 0 && metrics.videoHeight > 0));

      setIsPreviewReady(previewReady);

      if (
        shouldRetryPreviewOnPlainVideo(
          metrics,
          cameraPreviewVariant,
          usedBasicVideoFallback,
        )
      ) {
        setCameraPreviewVariant("plain");
      }
    }

    void attachStreamToPreview();
  }, [
    cameraPreviewVariant,
    cameraStream,
    hasLivePreview,
    usedBasicVideoFallback,
  ]);

  function clearCameraPreview() {
    cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    cameraStreamRef.current = null;
    setCameraStream(null);
    setCameraPreviewVariant("styled");
    setUsedBasicVideoFallback(false);
    setIsPreviewReady(false);
    setIsTorchSupported(false);
    setIsTorchEnabled(false);
    setIsTorchPending(false);

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setHasLivePreview(false);
  }

  function resetConversationFlow() {
    conversationRunRef.current?.stop();
    conversationRunRef.current = null;
    sessionSpeechControllerRef.current?.stop();
    pcmAudioPlayerRef.current?.stop();
    pcmAudioPlayerRef.current = null;
    setIsLiveVisualContextEnabled(false);
    setConversationFlowState("idle");
    setConversationFailureText("");
    setConversationDiagnostic(null);
    setLiveTranscriptText("");
    setLiveAssistantText("");
  }

  function appendSessionEvent(event: SessionEvent) {
    setSessionEvents((current) => [...current, event]);
  }

  function appendConversationMessage(
    role: SessionConversationMessage["role"],
    text: string,
    createdAt = new Date().toISOString(),
  ) {
    setConversationMessages((current) => [
      ...current,
      {
        id: `msg_${role}_${Date.now()}`,
        createdAt,
        role,
        text,
      },
    ]);
  }

  function appendUserTranscript(text: string, createdAt = new Date().toISOString()) {
    appendConversationMessage("user", text, createdAt);
    appendSessionEvent(createTranscriptSessionEvent(text, createdAt));
  }

  function appendAssistantMessage(text: string) {
    setConversationMessages((current) => {
      const lastMessage = current.at(-1);

      if (lastMessage?.role === "assistant" && lastMessage.text === text) {
        return current;
      }

      return [
        ...current,
        {
          id: `msg_assistant_${Date.now()}`,
          createdAt: new Date().toISOString(),
          role: "assistant",
          text,
        },
      ];
    });
  }

  async function speakAssistantReply(text: string) {
    if (voiceOutputModeRef.current !== "on") {
      return;
    }

    const speechController = sessionSpeechControllerRef.current;

    if (!speechController?.isSupported) {
      return;
    }

    await speechController.speak(text);
  }

  function handleVoiceToggle() {
    const speechController = sessionSpeechControllerRef.current;

    if (!speechController?.isSupported) {
      setFlashMessage(translateExactText(sessionLanguage, "Voice unavailable"));
      return;
    }

    setVoiceOutputMode((current) => {
      const nextMode: SessionVoiceOutputMode =
        current === "on" ? "off" : "on";

      if (nextMode === "off") {
        speechController.stop();
      }

      return nextMode;
    });
  }

  function buildVisualContextNote(options: VisualContextCaptureOptions) {
    if (options.captureKind === "sampled") {
      return options.note;
    }

    if (options.captureKind === "bookmark" && options.relatedBookmarkType) {
      const label = getLocalizedBookmarkTypeLabel(
        options.relatedBookmarkType,
        sessionLanguage,
      );
      const trimmedNote = options.note?.trim();

      if (trimmedNote) {
        return translateExactText(
          sessionLanguage,
          `Bookmark context: ${label}. User note: ${trimmedNote}`,
        );
      }

      return translateExactText(
        sessionLanguage,
        `Bookmark context: ${label}. Review the current frame.`,
      );
    }

    return (
      options.note?.trim() ||
      translateExactText(
        sessionLanguage,
        "Manual inspection frame from the current camera view.",
      )
    );
  }

  async function captureAndSendVisualContext(
    options: VisualContextCaptureOptions,
  ) {
    const video = videoRef.current;

    if (!video) {
      return false;
    }

    const capturedFrame = captureFrameFromVideo(video);

    if (!capturedFrame) {
      return false;
    }

    const createdAt = options.createdAt ?? new Date().toISOString();
    const run = conversationRunRef.current;
    let sentToConversation = false;
    let visualSendStatus: "sent" | "unavailable" | "failed" = "unavailable";

    if (run?.supportsVisualContext) {
      try {
        const visualSendResult = await run.sendVisualContext({
          captureKind: options.captureKind,
          createdAt,
          height: capturedFrame.height,
          mimeType: capturedFrame.mimeType,
          note: buildVisualContextNote(options),
          relatedBookmarkType: options.relatedBookmarkType,
          url: capturedFrame.url,
          width: capturedFrame.width,
        });
        visualSendStatus = visualSendResult.status;
        sentToConversation = visualSendResult.status === "sent";
      } catch (error) {
        console.error("Visual context send failed", error);
        visualSendStatus = "failed";
      }
    }

    appendSessionEvent(
      createFrameSessionEvent({
        ...capturedFrame,
        createdAt,
        captureKind: options.captureKind,
        relatedBookmarkType: options.relatedBookmarkType,
        sentToConversation,
      }),
    );

    if (options.flashMessage) {
      if (sentToConversation) {
        setFlashMessage(
          sessionLanguage === "ko"
            ? `${options.flashMessage} + 문맥`
            : `${options.flashMessage} + context`,
        );
      } else if (
        run?.supportsVisualContext &&
        (visualSendStatus === "failed" || visualSendStatus === "unavailable")
      ) {
        setFlashMessage(
          sessionLanguage === "ko"
            ? `${options.flashMessage} 로컬`
            : `${options.flashMessage} local`,
        );
      } else {
        setFlashMessage(options.flashMessage);
      }
    }

    return true;
  }

  function syncTorchState(track?: MediaStreamTrack | null) {
    const torchState = getCameraTorchState(track);

    setIsTorchSupported(torchState.isSupported);
    setIsTorchEnabled(torchState.isEnabled);

    return torchState;
  }

  useEffect(() => {
    captureAndSendVisualContextRef.current = captureAndSendVisualContext;
  });

  useEffect(() => {
    if (!isLiveVisualContextEnabled || !hasLivePreview || !isPreviewReady) {
      return;
    }

    sampledVisualContextTimeoutRef.current = window.setTimeout(() => {
      void captureAndSendVisualContextRef.current({
        captureKind: "sampled",
      });
    }, SAMPLED_VISUAL_CONTEXT_INITIAL_DELAY_MS);

    sampledVisualContextIntervalRef.current = window.setInterval(() => {
      void captureAndSendVisualContextRef.current({
        captureKind: "sampled",
      });
    }, SAMPLED_VISUAL_CONTEXT_INTERVAL_MS);

    return () => {
      if (sampledVisualContextTimeoutRef.current) {
        window.clearTimeout(sampledVisualContextTimeoutRef.current);
        sampledVisualContextTimeoutRef.current = null;
      }

      if (sampledVisualContextIntervalRef.current) {
        window.clearInterval(sampledVisualContextIntervalRef.current);
        sampledVisualContextIntervalRef.current = null;
      }
    };
  }, [hasLivePreview, isLiveVisualContextEnabled, isPreviewReady]);

  function resetBookmarkComposer() {
    setIsBookmarkComposerOpen(false);
    setIsBookmarkNoteVisible(false);
    setSelectedBookmarkType(null);
    setBookmarkNote("");
  }

  async function persistEndedSession() {
    const { sessionId, startedAt } = ensureSessionMetadata();
    const endedAt = new Date().toISOString();
    const completionEvent = createStatusSessionEvent(
      "complete",
      translateExactText(sessionLanguage, "Session ended."),
      endedAt,
    );
    const completedEvents = [...sessionEventsRef.current, completionEvent];
    const completedConversation = [...conversationMessagesRef.current];
    const snapshot = buildSessionSnapshot({
      id: sessionId,
      startedAt,
      endedAt,
      mode: providerMode,
      sessionLanguage,
      events: completedEvents,
      conversation: completedConversation,
    });
    setSessionEvents(completedEvents);

    let providerName: "gemini" | "mock" = "gemini";
    let result;

    try {
      result = await analyzeSessionClient(snapshot);
    } catch {
      const fallbackProvider = new MockRepairBuddyProvider();
      providerName = fallbackProvider.name;
      result = await fallbackProvider.analyzeSession(snapshot);
    }

    const snapshotWriteStatus = writeStoredSessionSnapshot(snapshot);
    const persistenceWarning =
      !snapshotWriteStatus.persisted
        ? sessionLanguage === "ko"
          ? "일부 세션 기록만 저장되었습니다."
          : "Only part of this session could be saved."
        : undefined;
    const persistenceState = persistenceWarning ? "partial" : "persisted";
    const report = buildRepairSessionReport({
      persistenceState,
      persistenceWarning,
      providerName,
      result,
      session: snapshot,
    });
    const reportWriteStatus = writeStoredSessionReport(report);

    if (!reportWriteStatus.persisted) {
      setInMemoryStoredSessionReport({
        ...report,
        persistenceState: snapshotWriteStatus.persisted ? "memory_only" : "partial",
        persistenceWarning:
          sessionLanguage === "ko"
            ? "세션 보고서는 현재 탭에만 유지됩니다."
            : "The session report is available in this tab only.",
      });
    }
  }

  async function handleCameraAccess() {
    const getUserMediaExists =
      typeof navigator !== "undefined" &&
      typeof navigator.mediaDevices?.getUserMedia === "function";

    if (!isMediaAccessSupported()) {
      setCameraState("unsupported");
      const unsupportedMessage = getUnsupportedMediaMessage("camera");
      setCameraDetail(unsupportedMessage);
      return;
    }

    setCameraState("requesting");
    setCameraDetail(getRequestingMediaDetail("camera"));

    clearCameraPreview();

    if (!getUserMediaExists) {
      setCameraState("unsupported");
      const unsupportedMessage = getUnsupportedMediaMessage("camera");
      setCameraDetail(unsupportedMessage);
      return;
    }

    const mediaDevices = navigator.mediaDevices;

    try {
      let stream: MediaStream | null = null;
      let usedBasicVideoFallbackForRequest = false;

      try {
        stream = await mediaDevices.getUserMedia(buildPreferredCameraConstraints());
      } catch (preferredError) {
        console.error("Preferred camera request failed", preferredError);

        stream = await mediaDevices.getUserMedia(
          buildGenericVideoOnlyCameraConstraints(),
        );
        usedBasicVideoFallbackForRequest = true;
      }

      const videoTrack = stream.getVideoTracks()[0];

      cameraStreamRef.current = stream;
      setCameraStream(stream);
      setUsedBasicVideoFallback(usedBasicVideoFallbackForRequest);
      setCameraPreviewVariant("styled");
      setIsPreviewReady(false);
      syncTorchState(videoTrack);
      setHasLivePreview(true);
      setCameraState("granted");
      setCameraDetail(
        describeCameraPreview(videoTrack, {
          usedBasicVideoFallback: usedBasicVideoFallbackForRequest,
        }),
      );
      appendSessionEvent(
        createStatusSessionEvent(
          "ready",
          translateExactText(sessionLanguage, "Rear camera live."),
        ),
      );
    } catch (error) {
      console.error("Camera request failed", error);
      clearCameraPreview();

      const failure = resolveMediaAccessFailure("camera", error);
      setCameraState(failure.state);
      setCameraDetail(failure.message);
    }
  }

  async function handleTorchToggle() {
    const videoTrack = cameraStreamRef.current?.getVideoTracks()[0];

    if (!videoTrack) {
      return;
    }

    const torchState = syncTorchState(videoTrack);

    if (!torchState.isSupported) {
      setFlashMessage(
        translateExactText(sessionLanguage, getTorchUnavailableMessage()),
      );
      return;
    }

    setIsTorchPending(true);

    try {
      const nextTorchEnabled = !isTorchEnabled;

      await setCameraTorchEnabled(videoTrack, nextTorchEnabled);

      const nextTorchState = getCameraTorchState(videoTrack);
      setIsTorchSupported(nextTorchState.isSupported);
      setIsTorchEnabled(
        nextTorchState.isSupported
          ? nextTorchState.isEnabled || nextTorchEnabled
          : false,
      );
      setFlashMessage(
        translateExactText(
          sessionLanguage,
          nextTorchEnabled ? "Torch on" : "Torch off",
        ),
      );
    } catch (error) {
      console.error("Torch toggle failed", error);
      syncTorchState(videoTrack);
      setFlashMessage(
        translateExactText(sessionLanguage, getTorchUnavailableMessage()),
      );
    } finally {
      setIsTorchPending(false);
    }
  }

  async function ensureMicrophoneAccess() {
    if (microphoneState === "granted") {
      return true;
    }

    if (!isMediaAccessSupported()) {
      setMicrophoneState("unsupported");
      const unsupportedMessage = getUnsupportedMediaMessage("microphone");
      setMicrophoneDetail(unsupportedMessage);
      return false;
    }

    setMicrophoneState("requesting");
    setMicrophoneDetail(getRequestingMediaDetail("microphone"));

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      stream.getTracks().forEach((track) => track.stop());

      setMicrophoneState("granted");
      setMicrophoneDetail(getGrantedMicrophoneDetail());
      return true;
    } catch (error) {
      const failure = resolveMediaAccessFailure("microphone", error, {
        cameraPreviewActive: hasLivePreview || cameraStreamRef.current !== null,
      });
      setMicrophoneState(failure.state);
      setMicrophoneDetail(failure.message);
      return false;
    }
  }

  async function handleTalkAction() {
    if (
      conversationFlowState !== "idle" &&
      conversationFlowState !== "failed"
    ) {
      resetConversationFlow();
      return;
    }

    const hasMicrophoneAccess = await ensureMicrophoneAccess();

    if (!hasMicrophoneAccess) {
      return;
    }

    setIsBookmarkComposerOpen(false);
    setIsConversationDrawerExpanded(false);
    setConversationFailureText("");
    setConversationDiagnostic(null);
    setLiveTranscriptText("");
    setLiveAssistantText("");
    const { sessionId, startedAt } = ensureSessionMetadata();

    const sessionSnapshot = buildSessionSnapshot({
      id: sessionId,
      startedAt,
      mode: providerMode,
      sessionLanguage,
      events: sessionEvents,
      conversation: conversationMessages,
    });

    try {
      const conversationRun =
        await sessionConversationProvider.startConversation(sessionSnapshot, {
          getSessionSnapshot: () =>
            buildSessionSnapshot({
              id: sessionId,
              startedAt,
              mode: providerMode,
              sessionLanguage,
              events: sessionEventsRef.current,
              conversation: conversationMessagesRef.current,
            }),
          onDiagnostic: (diagnostic) => {
            setConversationDiagnostic((current) => ({
              ...(current ?? {}),
              ...diagnostic,
            }));
          },
          onError: (error) => {
            console.error("Session conversation failed", error);
            conversationRunRef.current = null;
            sessionSpeechControllerRef.current?.stop();
            setIsLiveVisualContextEnabled(false);
            setConversationFlowState("failed");
            setConversationFailureText(
              translateExactText(
                sessionLanguage,
                getConversationFailureMessage(error),
              ),
            );
            setLiveTranscriptText("");
            setLiveAssistantText("");
            if (error instanceof SessionConversationError) {
              if (error.code === "microphone_unavailable") {
                setMicrophoneState("error");
                setMicrophoneDetail(error.message);
              }
            }

            const failureMessage = getConversationFailureMessage(error);
            setFlashMessage(translateExactText(sessionLanguage, failureMessage));
          },
          onNotice: (notice) => {
            setFlashMessage(
              translateExactText(sessionLanguage, notice.message),
            );
          },
          onStateChange: (state) => {
            setConversationFlowState(state);
            if (state !== "failed") {
              setConversationFailureText("");
            }
          },
          onTranscriptChange: (transcript) => {
            setLiveTranscriptText(transcript);
          },
          onAssistantResponseChange: (reply) => {
            setLiveAssistantText(reply);
          },
          onAudioChunk: (base64PcmData, sampleRate) => {
            if (!pcmAudioPlayerRef.current) {
              pcmAudioPlayerRef.current = new PcmAudioPlayer();
              pcmAudioPlayerRef.current.start();
            }
            pcmAudioPlayerRef.current.enqueue(base64PcmData, sampleRate);
          },
          onTurnReady: (turn) => {
            const createdAt = new Date().toISOString();

            if (turn.transcript.trim()) {
              appendUserTranscript(turn.transcript, createdAt);
            }

            if (turn.reply.trim()) {
              appendAssistantMessage(turn.reply);
              void speakAssistantReply(turn.reply);
            }
            setLiveTranscriptText("");
            setLiveAssistantText("");
          },
        });
      conversationRunRef.current = conversationRun;
      setIsLiveVisualContextEnabled(conversationRun.supportsVisualContext);
    } catch (error) {
      console.error("Conversation provider start failed", error);
      conversationRunRef.current = null;
      sessionSpeechControllerRef.current?.stop();
      setIsLiveVisualContextEnabled(false);
      setConversationFlowState("failed");
      const failureMessage = getConversationFailureMessage(error);
      setConversationFailureText(
        translateExactText(sessionLanguage, failureMessage),
      );
      setFlashMessage(translateExactText(sessionLanguage, failureMessage));
      setLiveTranscriptText("");
      setLiveAssistantText("");
    }
  }

  async function handleCaptureAction() {
    if (!hasLivePreview) {
      await handleCameraAccess();
      return;
    }

    setIsCapturingFrame(true);

    try {
      const createdAt = new Date().toISOString();
      const captured = await captureAndSendVisualContext({
        captureKind: "manual",
        createdAt,
        flashMessage: translateExactText(sessionLanguage, "Frame saved"),
      });

      if (!captured) {
        setFlashMessage(
          translateExactText(sessionLanguage, "Preview unavailable"),
        );
        return;
      }
      appendSessionEvent(
        createStatusSessionEvent(
          "capturing",
          translateExactText(sessionLanguage, "Frame captured."),
          createdAt,
        ),
      );
    } finally {
      setIsCapturingFrame(false);
    }
  }

  function handleOpenBookmarkComposer() {
    setIsConversationDrawerExpanded(false);
    setIsBookmarkNoteVisible(false);
    setSelectedBookmarkType(null);
    setBookmarkNote("");
    setIsBookmarkComposerOpen(true);
  }

  async function saveBookmark(bookmarkType: BookmarkType, note: string) {
    const createdAt = new Date().toISOString();
    const trimmedNote = note.trim();

    appendSessionEvent(
      createBookmarkSessionEvent({
        bookmarkType,
        note: trimmedNote || undefined,
        createdAt,
      }),
    );
    appendSessionEvent(
      createStatusSessionEvent(
        "review",
        translateExactText(sessionLanguage, "Bookmark saved."),
        createdAt,
      ),
    );
    resetBookmarkComposer();

    const capturedContext = await captureAndSendVisualContext({
      captureKind: "bookmark",
      createdAt,
      flashMessage:
        sessionLanguage === "ko"
          ? `${getLocalizedBookmarkTypeLabel(bookmarkType, sessionLanguage)} 저장됨`
          : `${getLocalizedBookmarkTypeLabel(bookmarkType, sessionLanguage)} marked`,
      note: trimmedNote,
      relatedBookmarkType: bookmarkType,
    });

    if (!capturedContext) {
      setFlashMessage(
        sessionLanguage === "ko"
          ? `${getLocalizedBookmarkTypeLabel(bookmarkType, sessionLanguage)} 저장됨`
          : `${getLocalizedBookmarkTypeLabel(bookmarkType, sessionLanguage)} marked`,
      );
    }
  }

  function handleSelectBookmarkType(bookmarkType: BookmarkType) {
    if (!isBookmarkNoteVisible) {
      void saveBookmark(bookmarkType, "");
      return;
    }

    setSelectedBookmarkType(bookmarkType);
  }

  function handleSaveBookmark() {
    if (!selectedBookmarkType) {
      return;
    }

    void saveBookmark(selectedBookmarkType, bookmarkNote);
  }

  async function handleEndSession() {
    setIsEndingSession(true);
    resetConversationFlow();
    try {
      await persistEndedSession();
    } finally {
      router.push("/result");
    }
  }

  const conversationStatus = getConversationFlowStatus(
    conversationFlowState,
    sessionLanguage,
  );
  const cameraSummary = getCameraSummary(
    cameraState,
    hasLivePreview,
    sessionLanguage,
  );
  const captureTone = getCaptureTone(cameraState, hasLivePreview);
  const talkTone = getTalkTone(conversationFlowState, microphoneState);
  const sessionEvidence = buildSessionEvidence(sessionEvents, conversationMessages);
  const sessionTimelineItems = buildSessionEvidenceTimeline(sessionEvidence);
  const sessionTimelineGroups = groupSessionEvidenceTimelineByDate(
    sessionTimelineItems,
    sessionLanguage,
  );
  const bookmarkTone = getBookmarkTone(
    sessionEvidence.bookmarks.length,
    isBookmarkComposerOpen,
  );
  const torchTone: RailTone = isTorchEnabled
    ? "green"
    : isTorchPending
      ? "accent"
      : "neutral";
  const showTorchAction = hasLivePreview && isTorchSupported;
  const historyCountLabel = formatHistoryCountLabel(
    sessionLanguage,
    sessionEvidence.captures.length,
    sessionEvidence.bookmarks.length,
    conversationMessages.length,
  );
  const isSessionLanguageLocked =
    hasLivePreview ||
    isEndingSession ||
    conversationFlowState !== "idle" ||
    sessionEvidence.captures.length > 0 ||
    sessionEvidence.bookmarks.length > 0 ||
    conversationMessages.length > 0;
  const latestUserMessage = findLatestConversationRoleMessage(
    conversationMessages,
    "user",
  );
  const latestAssistantMessage = findLatestConversationRoleMessage(
    conversationMessages,
    "assistant",
  );
  const recentConversationMessages = conversationMessages
    .filter((message) => {
      if (!liveTranscriptText.trim() && latestUserMessage?.id === message.id) {
        return false;
      }

      if (!liveAssistantText.trim() && latestAssistantMessage?.id === message.id) {
        return false;
      }

      return true;
    })
    .slice(-6);
  const currentTranscriptLine =
    liveTranscriptText.trim() || latestUserMessage?.text.trim() || "";
  const currentAssistantInstruction =
    liveAssistantText.trim() || latestAssistantMessage?.text.trim() || "";
  const currentTranscriptLanguageMatch = getTranscriptLanguageMatch(
    sessionLanguage,
    currentTranscriptLine,
  );
  const showBestEffortTranscriptHint =
    Boolean(currentTranscriptLine) &&
    currentTranscriptLanguageMatch !== "matched";
  const hasCompactConversationContent =
    Boolean(currentTranscriptLine) ||
    Boolean(currentAssistantInstruction) ||
    recentConversationMessages.length > 0 ||
    (conversationFlowState === "failed" && Boolean(conversationFailureText));
  const compactPanelPlaceholderText =
    sessionLanguage === "ko"
      ? conversationFlowState === "idle"
        ? "실시간 안내가 여기에 표시됩니다."
        : "현재 안내가 이 패널에 유지됩니다."
      : conversationFlowState === "idle"
        ? "Live guidance appears here."
        : "Current guidance stays in this panel.";
  const talkButtonLabel =
    conversationFlowState === "idle" || conversationFlowState === "failed"
      ? sessionCopy.talk
      : sessionCopy.stop;
  const voiceToggleLabel =
    voiceOutputMode === "on" ? sessionCopy.voiceOn : sessionCopy.voiceOff;
  const conversationDiagnosticText =
    process.env.NODE_ENV !== "production"
      ? formatConversationDiagnostic(conversationDiagnostic)
      : "";

  if (!isClientReady) {
    return (
      <MobileAppShell activeRoute="session" immersive>
        <section className="relative h-full min-h-0 overflow-hidden bg-black text-foreground" />
      </MobileAppShell>
    );
  }

  const isTalkActive =
    conversationFlowState === "listening" ||
    conversationFlowState === "processing" ||
    conversationFlowState === "assistant_responding";
  const micDotClass =
    conversationFlowState === "listening"
      ? "bg-success animate-pulse"
      : conversationFlowState === "processing" ||
          conversationFlowState === "assistant_responding"
        ? "bg-accent animate-pulse"
        : conversationFlowState === "failed"
          ? "bg-danger"
          : conversationFlowState === "connecting"
            ? "bg-accent animate-pulse"
            : "bg-foreground/40";
  const cameraTapHint =
    !hasLivePreview
      ? cameraSummary
      : conversationFlowState === "idle"
        ? sessionLanguage === "ko"
          ? "화면을 탭해 대화 시작"
          : "Tap screen to start talking"
        : isTalkActive
          ? sessionLanguage === "ko"
            ? "탭하여 중지"
            : "Tap to stop"
          : null;

  return (
    <MobileAppShell activeRoute="session" immersive>
      <section className="relative h-full min-h-0 overflow-hidden bg-black text-foreground">
        {/* Full-bleed camera surface, also the tap target for Talk on/off */}
        <button
          type="button"
          aria-label="Toggle voice conversation"
          onClick={() => void handleTalkAction()}
          className="absolute inset-0 z-0 block h-full w-full cursor-pointer overflow-hidden bg-black p-0 text-left"
        >
          {hasLivePreview ? (
            <video
              key={cameraPreviewVariant}
              ref={videoRef}
              autoPlay
              className={
                cameraPreviewVariant === "plain"
                  ? "h-full w-full bg-black"
                  : "h-full w-full object-cover"
              }
              muted
              playsInline
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#202728_0%,#0b0d0e_72%)]" />
          )}
        </button>

        {/* Top error bar — sits above everything when the conversation fails */}
        {conversationFlowState === "failed" && conversationFailureText ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-40 px-4"
            style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.4rem)" }}
          >
            <div className="pointer-events-auto rounded-2xl border border-danger/40 bg-danger/22 px-3 py-2 text-[0.78rem] font-medium leading-5 text-foreground shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-md">
              {translateExactText(sessionLanguage, conversationFailureText)}
              {conversationDiagnosticText ? (
                <pre className="mt-1 whitespace-pre-wrap break-words text-[0.6rem] leading-4 text-foreground/64">
                  {conversationDiagnosticText}
                </pre>
              ) : null}
            </div>
          </div>
        ) : null}


        {/* TOP BAR: mic dot + language chip (left), vehicle (center), hold-to-end (right) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center gap-3 px-4"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.85rem)" }}
        >
          <div className="pointer-events-auto flex items-center gap-2">
            <span
              aria-hidden
              className={[
                "inline-flex h-2.5 w-2.5 rounded-full",
                micDotClass,
              ].join(" ")}
            />
            <div className="flex items-center gap-0.5 rounded-full border border-white/12 bg-black/55 p-0.5 backdrop-blur-md">
              {(["en", "ko"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={[
                    "rounded-full px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.16em] uppercase transition",
                    sessionLanguage === opt
                      ? "bg-accent text-background"
                      : "text-foreground/68",
                    isSessionLanguageLocked
                      ? "cursor-not-allowed opacity-60"
                      : "",
                  ].join(" ")}
                  disabled={isSessionLanguageLocked}
                  onClick={() => setSessionLanguage(opt)}
                >
                  {getSessionLanguageButtonLabel(opt)}
                </button>
              ))}
            </div>
          </div>

          <div className="pointer-events-none flex-1 truncate text-center text-[0.62rem] font-semibold tracking-[0.18em] text-foreground/72 uppercase">
            2010 F-150 · 5.4 Triton
          </div>

          <div className="pointer-events-auto">
            <StatusBadge tone={providerMode === "gemini" ? "green" : "yellow"}>
              {providerMode === "gemini" ? "Gemini" : "Mock"}
              {providerMode === "mock" && !geminiKeyPresent ? " · no key" : ""}
            </StatusBadge>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            {isTorchSupported ? (
              <button
                type="button"
                aria-label={isTorchEnabled ? "Turn torch off" : "Turn torch on"}
                disabled={isTorchPending}
                onClick={() => void handleTorchToggle()}
                className={[
                  "inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition active:scale-95 disabled:opacity-50",
                  isTorchEnabled
                    ? "border-warning/60 bg-warning text-background shadow-[0_0_24px_rgba(255,192,0,0.45)]"
                    : "border-white/16 bg-black/55 text-foreground/80",
                ].join(" ")}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <path d="M9 2h6l-1 5h-4z" />
                  <path d="M8 7h8v3a4 4 0 0 1-1.2 2.85L14 14v7h-4v-7l-.8-1.15A4 4 0 0 1 8 10z" />
                  <line x1="12" y1="14" x2="12" y2="17" />
                </svg>
              </button>
            ) : null}
            <HoldToEndButton
              disabled={isEndingSession}
              onComplete={() => void handleEndSession()}
            />
          </div>
        </div>

        {/* Flash toast (bookmark saved, etc.) */}
        {flashMessage ? (
          <div
            className="pointer-events-none absolute inset-x-0 z-30 flex justify-center"
            style={{ top: "calc(env(safe-area-inset-top) + 4.1rem)" }}
          >
            <div className="rounded-full border border-success/30 bg-success/22 px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.12em] text-success uppercase shadow-[0_8px_24px_rgba(0,0,0,0.32)] backdrop-blur-md">
              {flashMessage}
            </div>
          </div>
        ) : null}

        {/* Center hint — only when nothing else demands attention */}
        {cameraTapHint && !flashMessage ? (
          <div
            className="pointer-events-none absolute inset-x-0 z-10 flex justify-center"
            style={{ top: "42%" }}
          >
            <div className="rounded-full border border-white/12 bg-black/55 px-4 py-2 text-[0.7rem] font-semibold tracking-[0.16em] text-foreground/82 uppercase backdrop-blur-md">
              {cameraTapHint}
            </div>
          </div>
        ) : null}

        {/* Latest reply glance card — tap to open history */}
        {currentAssistantInstruction ? (
          <button
            type="button"
            onClick={() => {
              setHistoryTab("chat");
              setIsConversationDrawerExpanded(true);
            }}
            className="pointer-events-auto absolute inset-x-4 z-20 rounded-3xl border border-white/12 bg-black/62 px-5 py-4 text-left shadow-[0_18px_42px_rgba(0,0,0,0.5)] backdrop-blur-md transition-transform active:scale-[0.98]"
            style={{ bottom: "calc(env(safe-area-inset-bottom) + 8.3rem)" }}
          >
            <div className="mb-1 flex items-center justify-between gap-3">
              <p className="text-[0.6rem] font-semibold tracking-[0.18em] text-accent uppercase">
                {translateExactText(sessionLanguage, "Buddy")}
              </p>
              <p className="text-[0.58rem] text-foreground/52">
                {sessionLanguage === "ko" ? "탭하여 기록" : "Tap for history"}
              </p>
            </div>
            <p className="line-clamp-5 text-[0.84rem] font-semibold leading-5 text-foreground">
              {currentAssistantInstruction}
            </p>
          </button>
        ) : null}

        {/* MARK THIS — single huge bottom CTA */}
        <div
          className="pointer-events-none absolute inset-x-0 z-30 px-4"
          style={{ bottom: "calc(env(safe-area-inset-bottom) + 1.1rem)" }}
        >
          <div className="pointer-events-auto">
            <MarkButton
              disabled={isEndingSession}
              label={sessionLanguage === "ko" ? "이 순간 표시" : "MARK THIS"}
              longPressLabel={
                sessionLanguage === "ko" ? "길게 눌러 유형 선택" : "Hold for type"
              }
              onLongPress={handleOpenBookmarkComposer}
              onQuickMark={() => void saveBookmark("other", "")}
            />
          </div>
        </div>

        {/* Bookmark type overlay (long-press) */}
        {isBookmarkComposerOpen ? (
          <div
            className="absolute inset-0 z-40 flex items-end justify-center bg-black/60 backdrop-blur-sm"
            onClick={resetBookmarkComposer}
          >
            <div
              className="w-full max-w-md rounded-t-[1.85rem] border-t border-white/12 bg-[#0c0e10] px-5 pt-5 shadow-[0_-18px_60px_rgba(0,0,0,0.6)]"
              style={{
                paddingBottom: "calc(env(safe-area-inset-bottom) + 1.2rem)",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-foreground/74 uppercase">
                  {sessionLanguage === "ko" ? "유형을 선택하세요" : "Pick a type"}
                </p>
                <button
                  type="button"
                  className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.14em] text-foreground/74 uppercase"
                  onClick={resetBookmarkComposer}
                >
                  {sessionCopy.close}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {BOOKMARK_TYPE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/6 px-3 py-4 text-center text-[0.74rem] font-semibold tracking-[0.06em] text-foreground/88 uppercase transition active:scale-95 active:border-accent active:bg-accent/22"
                    onClick={() => {
                      void saveBookmark(option.value, "");
                    }}
                  >
                    {getLocalizedBookmarkTypeLabel(option.value, sessionLanguage)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* History bottom sheet (Chat / Marks tabs) */}
        {isConversationDrawerExpanded ? (
          <div
            className="absolute inset-0 z-40 flex items-end justify-center bg-black/55 backdrop-blur-sm"
            onClick={() => setIsConversationDrawerExpanded(false)}
          >
            <div
              className="flex h-[78%] w-full max-w-md flex-col rounded-t-[1.85rem] border-t border-white/12 bg-[#0c0e10] shadow-[0_-18px_60px_rgba(0,0,0,0.6)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="h-1.5 w-12 rounded-full bg-white/18" />
              </div>

              <div className="flex items-center justify-between gap-3 px-5 pb-3">
                <div className="flex items-center gap-1 rounded-full border border-white/12 bg-white/6 p-1">
                  <button
                    type="button"
                    className={[
                      "rounded-full px-4 py-1.5 text-[0.66rem] font-semibold tracking-[0.14em] uppercase transition",
                      historyTab === "chat"
                        ? "bg-accent text-background"
                        : "text-foreground/72",
                    ].join(" ")}
                    onClick={() => setHistoryTab("chat")}
                  >
                    {sessionLanguage === "ko" ? "대화" : "Chat"}
                  </button>
                  <button
                    type="button"
                    className={[
                      "rounded-full px-4 py-1.5 text-[0.66rem] font-semibold tracking-[0.14em] uppercase transition",
                      historyTab === "marks"
                        ? "bg-accent text-background"
                        : "text-foreground/72",
                    ].join(" ")}
                    onClick={() => setHistoryTab("marks")}
                  >
                    {sessionLanguage === "ko" ? "마크" : "Marks"}
                  </button>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[0.62rem] font-semibold tracking-[0.14em] text-foreground/82 uppercase"
                  onClick={() => setIsConversationDrawerExpanded(false)}
                >
                  {sessionCopy.close}
                </button>
              </div>

              <div
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5"
                style={{
                  paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
                }}
              >
                {historyTab === "chat" ? (
                  conversationMessages.length === 0 ? (
                    <p className="mt-6 text-center text-sm text-foreground/52">
                      {sessionLanguage === "ko"
                        ? "아직 대화가 없습니다."
                        : "No conversation yet."}
                    </p>
                  ) : (
                    <div className="flex flex-col gap-2 pt-2">
                      {conversationMessages.map((message) => (
                        <div
                          key={message.id}
                          className={[
                            "max-w-[82%] rounded-2xl px-3.5 py-2.5",
                            message.role === "assistant"
                              ? "self-start border border-accent/22 bg-accent/12 text-foreground"
                              : "self-end border border-white/10 bg-white/8 text-foreground",
                          ].join(" ")}
                        >
                          <p className="mb-1 text-[0.56rem] font-semibold tracking-[0.14em] text-foreground/52 uppercase">
                            {translateExactText(
                              sessionLanguage,
                              message.role === "assistant" ? "Buddy" : "You",
                            )}
                            {" · "}
                            {formatConversationTimestamp(message.createdAt)}
                          </p>
                          <p className="whitespace-pre-wrap break-words text-[0.72rem] leading-4">
                            {message.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )
                ) : sessionEvidence.bookmarks.length === 0 ? (
                  <p className="mt-6 text-center text-sm text-foreground/52">
                    {sessionLanguage === "ko"
                      ? "아직 마크가 없습니다."
                      : "No marks yet."}
                  </p>
                ) : (
                  <div className="flex flex-col gap-2 pt-2">
                    {sessionEvidence.bookmarks
                      .slice()
                      .reverse()
                      .map((bookmark) => (
                        <div
                          key={bookmark.id}
                          className="rounded-2xl border border-warning/24 bg-warning/12 px-4 py-3"
                        >
                          <div className="mb-1.5 flex items-center justify-between gap-2">
                            <p className="text-[0.66rem] font-semibold tracking-[0.14em] text-warning uppercase">
                              {getLocalizedBookmarkTypeLabel(
                                bookmark.bookmarkType,
                                sessionLanguage,
                              )}
                            </p>
                            <p className="text-[0.6rem] text-foreground/56">
                              {formatConversationTimestamp(bookmark.createdAt)}
                            </p>
                          </div>
                          <p className="whitespace-pre-wrap break-words text-[0.86rem] leading-5 text-foreground/92">
                            {bookmark.note?.trim() ||
                              translateExactText(
                                sessionLanguage,
                                "Marked without note",
                              )}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}


      </section>
    </MobileAppShell>
  );
}
