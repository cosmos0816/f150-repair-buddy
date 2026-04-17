import {
  GoogleGenAI,
  type LiveServerMessage,
} from "@google/genai";

import {
  executeLiveSessionToolCalls,
} from "@/lib/live/session-tools";
import { getMicrophonePcmMimeType, createMicrophonePcmStream } from "@/lib/media/microphone-pcm-stream";
import {
  getLocalizedBookmarkTypeLabel,
  translateExactText,
} from "@/lib/session/session-language";
import { buildGuidedInspectionStep } from "@/lib/session/guided-inspection";
import type { GeminiLiveBootstrapResponse } from "@/lib/live/types";
import {
  SessionConversationError,
} from "@/lib/providers/session-conversation-provider";
import type {
  SessionConversationDiagnostic,
  SessionConversationProvider,
  SessionConversationProviderCallbacks,
  SessionConversationRun,
  SessionConversationTurn,
  SessionConversationVisualContext,
} from "@/lib/providers/session-conversation-provider";
import type { RepairSessionSnapshot } from "@/lib/types/session";

type GeminiLiveSdkSession = Awaited<
  ReturnType<GoogleGenAI["live"]["connect"]>
>;

const MAX_AUTO_RECONNECT_ATTEMPTS = 1;
const ASSISTANT_RESPONSE_TIMEOUT_MS = 12000;
const ALLOW_AUTO_RECONNECT = false;
const GEMINI_LIVE_BOOTSTRAP_TARGET = "/api/live/token";

function mergeAssistantTextBuffer(current: string, incoming: string) {
  if (!incoming.trim()) {
    return current;
  }

  if (!current) {
    return incoming;
  }

  if (incoming.startsWith(current)) {
    return incoming;
  }

  if (current.endsWith(incoming)) {
    return current;
  }

  return `${current}${incoming}`;
}

type GeminiLiveBootstrapFetchResult =
  | {
      ok: true;
      payload: GeminiLiveBootstrapResponse;
      status: number;
    }
  | {
      errorPayload?: string;
      errorMessage: string;
      ok: false;
      status: number;
    };

async function fetchGeminiLiveBootstrap(
  sessionLanguage: RepairSessionSnapshot["sessionLanguage"],
): Promise<GeminiLiveBootstrapFetchResult> {
  const response = await fetch(GEMINI_LIVE_BOOTSTRAP_TARGET, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionLanguage,
    }),
  });

  const rawBody = await response.text();
  let payload: GeminiLiveBootstrapResponse | { error?: string } | null = null;

  try {
    payload = JSON.parse(rawBody) as GeminiLiveBootstrapResponse | {
      error?: string;
    };
  } catch {}

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      errorPayload: rawBody.trim() || undefined,
      errorMessage:
        payload && "error" in payload && payload.error?.trim()
          ? payload.error.trim()
          : "Gemini Live unavailable.",
    };
  }

  return {
    ok: true,
    payload: payload as GeminiLiveBootstrapResponse,
    status: response.status,
  };
}

function getUnavailableConversationError(
  bootstrap: Extract<GeminiLiveBootstrapResponse, { provider: "mock" }>,
) {
  if (bootstrap.reason === "disabled") {
    return new SessionConversationError(
      "provider_unavailable",
      "Live talk disabled.",
      { recoverable: true },
    );
  }

  return new SessionConversationError(
    "provider_unavailable",
    "Gemini key missing on server.",
    { recoverable: true },
  );
}

function getBase64PayloadFromDataUrl(dataUrl: string) {
  const separatorIndex = dataUrl.indexOf(",");

  if (!dataUrl.startsWith("data:") || separatorIndex < 0) {
    throw new Error("Unsupported visual context payload.");
  }

  return dataUrl.slice(separatorIndex + 1);
}

function getMicrophoneConversationError(error: unknown) {
  const name = error instanceof DOMException ? error.name : "";

  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    return new SessionConversationError(
      "microphone_unavailable",
      "Mic blocked",
      { recoverable: true },
    );
  }

  return new SessionConversationError(
    "microphone_unavailable",
    "Mic unavailable",
    { recoverable: true },
  );
}

function getConnectionConversationError(error: unknown) {
  if (error instanceof SessionConversationError) {
    return error;
  }

  if (error instanceof Error && error.message.trim()) {
    return new SessionConversationError(
      "connection_failed",
      error.message.trim(),
      { recoverable: true },
    );
  }

  return new SessionConversationError(
    "connection_failed",
    "Talk unavailable. Try again.",
    { recoverable: true },
  );
}

function buildSessionCloseErrorMessage(event: CloseEvent) {
  const reason = event.reason?.trim();

  if (reason) {
    return `Gemini Live closed (${event.code}): ${reason}`;
  }

  if (event.code) {
    return `Gemini Live closed (${event.code}).`;
  }

  return "Gemini Live closed.";
}

function buildSessionErrorMessage(event: ErrorEvent) {
  const error =
    event.error instanceof Error
      ? event.error.message.trim()
      : "";
  const message = event.message?.trim();

  if (error) {
    return error;
  }

  if (message) {
    return message;
  }

  return "Gemini Live connection error.";
}

function buildSessionErrorPayload(event: ErrorEvent) {
  const payload =
    event.error instanceof Error
      ? {
          message: event.error.message,
          name: event.error.name,
        }
      : event.message?.trim()
        ? { message: event.message.trim() }
        : null;

  return payload ? JSON.stringify(payload) : undefined;
}

function formatLiveConfigJson(bootstrap: Extract<
  GeminiLiveBootstrapResponse,
  { provider: "gemini" }
>) {
  return JSON.stringify(bootstrap.liveConfig, null, 2);
}

function buildRedactedWebsocketUrl(
  bootstrap: Extract<GeminiLiveBootstrapResponse, { provider: "gemini" }>,
) {
  const baseUrl = bootstrap.websocketBaseUrl.replace(/\/+$/, "");

  return `${baseUrl}/ws/google.ai.generativelanguage.${bootstrap.apiVersion}.GenerativeService.${bootstrap.websocketMethod}?access_token=[redacted]`;
}

function getModelTurnText(message: LiveServerMessage) {
  const parts = message.serverContent?.modelTurn?.parts;

  if (!parts?.length) {
    return "";
  }

  return parts
    .map((part) => {
      if ("text" in part && typeof part.text === "string") {
        return part.text;
      }

      return "";
    })
    .join("");
}

function getModelTurnAudioChunks(
  message: LiveServerMessage,
): Array<{ data: string; mimeType: string }> {
  const parts = message.serverContent?.modelTurn?.parts;

  if (!parts?.length) {
    return [];
  }

  return parts
    .filter(
      (part): part is { inlineData: { data: string; mimeType: string } } =>
        "inlineData" in part &&
        typeof (part as Record<string, unknown>).inlineData === "object" &&
        (part as { inlineData: { mimeType: string } }).inlineData.mimeType?.startsWith("audio/"),
    )
    .map((part) => ({
      data: part.inlineData.data,
      mimeType: part.inlineData.mimeType,
    }));
}

function describeServerMessageType(message: LiveServerMessage) {
  if (message.toolCall?.functionCalls?.length) {
    return "toolCall";
  }

  if (getModelTurnText(message).trim()) {
    return "modelTurn:text";
  }

  if (message.serverContent?.inputTranscription?.text?.trim()) {
    return "inputTranscription";
  }

  if (message.serverContent?.outputTranscription?.text?.trim()) {
    return "outputTranscription";
  }

  if (message.serverContent?.turnComplete) {
    return "turnComplete";
  }

  if (message.serverContent?.waitingForInput) {
    return "waitingForInput";
  }

  if (message.serverContent?.interrupted) {
    return "interrupted";
  }

  return Object.keys(message).join(",") || "unknown";
}

function buildInspectionContextText(session: RepairSessionSnapshot) {
  const nextInspectionTarget = buildGuidedInspectionStep({
    session,
  });
  const latestBookmark = session.evidence.bookmarks.at(-1);
  const language = session.sessionLanguage;
  const latestBookmarkText = latestBookmark
    ? language === "ko"
      ? `최근 북마크: ${getLocalizedBookmarkTypeLabel(
          latestBookmark.bookmarkType,
          language,
        )}.`
      : `Latest bookmark: ${getLocalizedBookmarkTypeLabel(
          latestBookmark.bookmarkType,
          language,
        )}.`
    : translateExactText(language, "Latest bookmark: none.");

  return [
    translateExactText(language, "App inspection context."),
    latestBookmarkText,
    translateExactText(language, `Saved frames: ${session.evidence.captures.length}.`),
    translateExactText(
      language,
      `Conversation lines: ${session.evidence.conversation.length}.`,
    ),
    translateExactText(language, `Next target: ${nextInspectionTarget.instruction}`),
    translateExactText(language, `Focus area: ${nextInspectionTarget.targetLabel}.`),
    translateExactText(language, `Reason: ${nextInspectionTarget.reason}`),
    translateExactText(
      language,
      "Keep the next reply short and inspection-directed.",
    ),
  ].join(" ");
}

export class GeminiLiveSessionConversationProvider
  implements SessionConversationProvider
{
  readonly name = "gemini" as const;

  async startConversation(
    _session: RepairSessionSnapshot,
    callbacks: SessionConversationProviderCallbacks,
  ): Promise<SessionConversationRun> {
    const emitDiagnostic = (diagnostic: SessionConversationDiagnostic) => {
      callbacks.onDiagnostic?.(diagnostic);
    };
    const logDiagnostic = (label: string, detail: unknown) => {
      if (process.env.NODE_ENV !== "production") {
        console.info(`[Gemini Live ${label}]`, detail);
      }
    };

    callbacks.onStateChange("connecting");
    let bootstrap: GeminiLiveBootstrapResponse;

    try {
      emitDiagnostic({
        bootstrapRequestTarget: GEMINI_LIVE_BOOTSTRAP_TARGET,
        connectionPhase: "bootstrap_request",
      });
      logDiagnostic("bootstrap_request", {
        target: GEMINI_LIVE_BOOTSTRAP_TARGET,
      });

      const bootstrapResult = await fetchGeminiLiveBootstrap(
        _session.sessionLanguage,
      );

      if (!bootstrapResult.ok) {
        emitDiagnostic({
          bootstrapStatus: bootstrapResult.status,
          bootstrapRequestTarget: GEMINI_LIVE_BOOTSTRAP_TARGET,
          connectionPhase: "failed",
          errorMessage: bootstrapResult.errorMessage,
          errorPayload: bootstrapResult.errorPayload,
        });

        throw new SessionConversationError(
          "connection_failed",
          bootstrapResult.errorMessage,
          { recoverable: true },
        );
      }

      bootstrap = bootstrapResult.payload;
      emitDiagnostic({
        activeProvider: bootstrap.diagnostics.activeProvider,
        bootstrapStatus: bootstrapResult.status,
        bootstrapRequestTarget: GEMINI_LIVE_BOOTSTRAP_TARGET,
        connectionPhase: "bootstrap_response",
        geminiKeyPresent: bootstrap.diagnostics.geminiKeyPresent,
        liveModeExplicitlyDisabled:
          bootstrap.diagnostics.liveModeExplicitlyDisabled,
        modelName: bootstrap.provider === "gemini" ? bootstrap.model : undefined,
        liveConfigJson:
          bootstrap.provider === "gemini"
            ? formatLiveConfigJson(bootstrap)
            : undefined,
      });
      logDiagnostic("bootstrap_response", {
        activeProvider: bootstrap.diagnostics.activeProvider,
        bootstrapStatus: bootstrapResult.status,
        geminiKeyPresent: bootstrap.diagnostics.geminiKeyPresent
          ? "yes"
          : "no",
        liveConfig:
          bootstrap.provider === "gemini" ? bootstrap.liveConfig : undefined,
        model: bootstrap.provider === "gemini" ? bootstrap.model : undefined,
      });

      if (process.env.NODE_ENV !== "production") {
        console.info("[Gemini Live bootstrap]", {
          activeProvider: bootstrap.diagnostics.activeProvider,
          bootstrapStatus: bootstrapResult.status,
          geminiKeyPresent: bootstrap.diagnostics.geminiKeyPresent
            ? "yes"
            : "no",
        });
      }
    } catch (error) {
      callbacks.onStateChange("failed");
      emitDiagnostic({
        connectionPhase: "failed",
        errorMessage: getConnectionConversationError(error).message,
      });
      callbacks.onError(error);
      throw error;
    }

    if (bootstrap.provider === "mock") {
      const unavailableError = getUnavailableConversationError(bootstrap);
      callbacks.onStateChange("failed");
      emitDiagnostic({
        activeProvider: "mock",
        bootstrapRequestTarget: GEMINI_LIVE_BOOTSTRAP_TARGET,
        connectionPhase: "failed",
        errorMessage: unavailableError.message,
        geminiKeyPresent: bootstrap.diagnostics.geminiKeyPresent,
        liveModeExplicitlyDisabled:
          bootstrap.diagnostics.liveModeExplicitlyDisabled,
      });
      callbacks.onError(unavailableError);
      throw unavailableError;
    }

    let microphoneStream: MediaStream;

    try {
      emitDiagnostic({
        connectionPhase: "microphone_request",
      });
      microphoneStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      emitDiagnostic({
        connectionPhase: "microphone_ready",
      });
    } catch (error) {
      callbacks.onStateChange("failed");
      const microphoneError = getMicrophoneConversationError(error);
      emitDiagnostic({
        connectionPhase: "failed",
        errorMessage: microphoneError.message,
      });
      callbacks.onError(microphoneError);
      throw microphoneError;
    }

    let stopped = false;
    let closedByClient = false;
    let reconnecting = false;
    let reconnectAttempts = 0;
    let liveSessionOpened = false;
    let liveSession: GeminiLiveSdkSession | null = null;
    let currentTranscript = "";
    let finalizedTranscript = "";
    let assistantReply = "";
    let assistantTranscription = "";
    let assistantResponseTimeoutId: ReturnType<typeof globalThis.setTimeout> | null =
      null;
    let microphonePcmStream:
      | Awaited<ReturnType<typeof createMicrophonePcmStream>>
      | null = null;
    let firstInboundMessageType: string | null = null;
    let firstOutboundMessageType: string | null = null;

    const clearAssistantResponseTimeout = () => {
      if (!assistantResponseTimeoutId) {
        return;
      }

      globalThis.clearTimeout(assistantResponseTimeoutId);
      assistantResponseTimeoutId = null;
    };

    const resetLiveBuffers = () => {
      currentTranscript = "";
      finalizedTranscript = "";
      assistantReply = "";
      assistantTranscription = "";
      callbacks.onTranscriptChange("");
      callbacks.onAssistantResponseChange("");
    };

    const recordFirstOutboundMessageType = (messageType: string) => {
      if (firstOutboundMessageType) {
        return;
      }

      firstOutboundMessageType = messageType;
      emitDiagnostic({
        firstOutboundMessageType: messageType,
      });
      logDiagnostic("first_outbound", {
        type: messageType,
      });
    };

    const recordFirstInboundMessageType = (messageType: string) => {
      if (firstInboundMessageType) {
        return;
      }

      firstInboundMessageType = messageType;
      emitDiagnostic({
        firstInboundMessageType: messageType,
      });
      logDiagnostic("first_inbound", {
        type: messageType,
      });
    };

    const fail = async (error: unknown) => {
      if (stopped) {
        return;
      }

      stopped = true;
      reconnecting = false;
      clearAssistantResponseTimeout();
      callbacks.onStateChange("failed");
      resetLiveBuffers();
      emitDiagnostic({
        connectionPhase: "failed",
        errorMessage: getConnectionConversationError(error).message,
      });

      if (liveSession) {
        liveSession.close();
        liveSession = null;
      }

      if (microphonePcmStream) {
        await microphonePcmStream.stop();
        microphonePcmStream = null;
      } else {
        microphoneStream.getTracks().forEach((track) => track.stop());
      }

      callbacks.onError(getConnectionConversationError(error));
    };

    const finalizeTurn = () => {
      clearAssistantResponseTimeout();
      const transcript = finalizedTranscript.trim() || currentTranscript.trim();
      const reply =
        assistantReply.trim() || assistantTranscription.trim();

      if (!reply) {
        resetLiveBuffers();

        if (!stopped) {
          callbacks.onStateChange("listening");
        }

        return;
      }

      callbacks.onTurnReady({
        transcript,
        reply,
      } satisfies SessionConversationTurn);

      resetLiveBuffers();

      if (!stopped) {
        callbacks.onStateChange("listening");
      }
    };

    const scheduleAssistantResponseTimeout = () => {
      clearAssistantResponseTimeout();

      assistantResponseTimeoutId = globalThis.setTimeout(() => {
        if (stopped || reconnecting) {
          return;
        }

        void fail(
          new SessionConversationError(
            "assistant_timeout",
            "Reply timeout. Try again.",
            { recoverable: true },
          ),
        );
      }, ASSISTANT_RESPONSE_TIMEOUT_MS);
    };

    const connectLiveSession = async (
      nextBootstrap: GeminiLiveBootstrapResponse,
    ) => {
      if (nextBootstrap.provider === "mock") {
        throw getUnavailableConversationError(nextBootstrap);
      }

      const websocketUrl = buildRedactedWebsocketUrl(nextBootstrap);
      emitDiagnostic({
        activeProvider: nextBootstrap.diagnostics.activeProvider,
        connectionPhase: "session_connecting",
        geminiKeyPresent: nextBootstrap.diagnostics.geminiKeyPresent,
        liveConfigJson: formatLiveConfigJson(nextBootstrap),
        liveModeExplicitlyDisabled:
          nextBootstrap.diagnostics.liveModeExplicitlyDisabled,
        modelName: nextBootstrap.model,
        websocketMethod: nextBootstrap.websocketMethod,
        websocketUrl,
      });
      logDiagnostic("session_connecting", {
        liveConfig: nextBootstrap.liveConfig,
        model: nextBootstrap.model,
        websocketMethod: nextBootstrap.websocketMethod,
        websocketUrl,
      });
      recordFirstOutboundMessageType("setup");

      const ai = new GoogleGenAI({
        apiKey: nextBootstrap.token,
        httpOptions: { apiVersion: nextBootstrap.apiVersion },
      });

      liveSession = await ai.live.connect({
        model: nextBootstrap.model,
        callbacks: {
          onopen: () => {
            liveSessionOpened = true;
            reconnecting = false;
            emitDiagnostic({
              connectionPhase: "session_open",
              modelName: nextBootstrap.model,
            });
            logDiagnostic("session_open", {
              model: nextBootstrap.model,
            });
            if (reconnectAttempts > 0) {
              callbacks.onNotice?.({
                code: "reconnected",
                message: "Talk back",
              });
            }

            if (!stopped) {
              callbacks.onStateChange("listening");
            }
          },
          onmessage: handleServerMessage,
          onerror: (event) => {
            if (reconnecting || stopped) {
              return;
            }

            const nextError = getConnectionConversationError(
              new Error(buildSessionErrorMessage(event)),
            );
            emitDiagnostic({
              connectionPhase: "session_error",
              errorMessage: nextError.message,
              errorPayload: buildSessionErrorPayload(event),
            });
            logDiagnostic("session_error", {
              error: nextError.message,
              payload: buildSessionErrorPayload(event),
            });

            if (
              ALLOW_AUTO_RECONNECT &&
              liveSessionOpened &&
              reconnectAttempts < MAX_AUTO_RECONNECT_ATTEMPTS
            ) {
              void reconnectLiveSession();
              return;
            }

            void fail(nextError);
          },
          onclose: (event) => {
            if (closedByClient || stopped || reconnecting) {
              return;
            }

            const nextError = getConnectionConversationError(
              new Error(buildSessionCloseErrorMessage(event)),
            );
            emitDiagnostic({
              connectionPhase: "session_closed",
              errorMessage: nextError.message,
              websocketCloseClean: event.wasClean,
              websocketCloseCode: event.code,
              websocketCloseReason: event.reason?.trim() || undefined,
            });
            logDiagnostic("session_closed", {
              code: event.code,
              reason: event.reason?.trim() || "",
              wasClean: event.wasClean,
            });

            if (
              ALLOW_AUTO_RECONNECT &&
              liveSessionOpened &&
              reconnectAttempts < MAX_AUTO_RECONNECT_ATTEMPTS
            ) {
              void reconnectLiveSession();
              return;
            }

            void fail(nextError);
          },
        },
      });
    };

    const reconnectLiveSession = async () => {
      if (stopped || reconnecting) {
        return;
      }

      reconnecting = true;
      reconnectAttempts += 1;
      clearAssistantResponseTimeout();
      callbacks.onNotice?.({
        code: "reconnecting",
        message: "Retrying talk",
      });
      callbacks.onStateChange("connecting");
      callbacks.onTranscriptChange("");
      currentTranscript = "";
      finalizedTranscript = "";

      if (liveSession) {
        liveSession.close();
        liveSession = null;
      }

      try {
        const nextBootstrap = await fetchGeminiLiveBootstrap(
          callbacks.getSessionSnapshot().sessionLanguage,
        );
        if (!nextBootstrap.ok) {
          throw new SessionConversationError(
            "reconnect_failed",
            nextBootstrap.errorMessage,
            { recoverable: true },
          );
        }

        await connectLiveSession(nextBootstrap.payload);
      } catch (error) {
        reconnecting = false;
        await fail(
          error instanceof SessionConversationError
            ? error
            : new SessionConversationError(
                "reconnect_failed",
                "Talk lost. Retry.",
                { recoverable: true },
              ),
        );
      }
    };

    const handleToolCall = async (message: LiveServerMessage) => {
      const functionCalls = message.toolCall?.functionCalls;

      if (stopped || !liveSession || !functionCalls?.length) {
        return;
      }

      callbacks.onStateChange("processing");
      scheduleAssistantResponseTimeout();

      const functionResponses = await executeLiveSessionToolCalls(
        functionCalls,
        {
          getSessionSnapshot: callbacks.getSessionSnapshot,
        },
      );

      if (stopped || !liveSession || functionResponses.length === 0) {
        return;
      }

      if (!firstOutboundMessageType) {
        recordFirstOutboundMessageType("toolResponse");
      }

      liveSession.sendToolResponse({
        functionResponses,
      });
    };

    const handleServerMessage = (message: LiveServerMessage) => {
      if (stopped) {
        return;
      }

      recordFirstInboundMessageType(describeServerMessageType(message));

      if (message.toolCall?.functionCalls?.length) {
        void handleToolCall(message);
      }

      const serverContent = message.serverContent;
      const inputTranscription = serverContent?.inputTranscription?.text?.trim();

      if (inputTranscription) {
        currentTranscript = inputTranscription;
        callbacks.onTranscriptChange(currentTranscript);
      }

      if (serverContent?.inputTranscription?.finished && currentTranscript.trim()) {
        finalizedTranscript = currentTranscript.trim();
        callbacks.onStateChange("processing");
        scheduleAssistantResponseTimeout();
      }

      // Extract and forward audio chunks to the player
      const audioChunks = getModelTurnAudioChunks(message);
      if (audioChunks.length > 0 && callbacks.onAudioChunk) {
        for (const chunk of audioChunks) {
          // Gemini Live PCM is typically 24kHz 16-bit mono
          callbacks.onAudioChunk(chunk.data, 24000);
        }
      }

      const assistantText = getModelTurnText(message);
      const outputTranscription =
        serverContent?.outputTranscription?.text ?? "";

      if (assistantText.trim()) {
        clearAssistantResponseTimeout();
        assistantReply = mergeAssistantTextBuffer(assistantReply, assistantText);
        callbacks.onAssistantResponseChange(assistantReply.trim());
        callbacks.onStateChange("assistant_responding");
      }

      if (outputTranscription.trim()) {
        clearAssistantResponseTimeout();
        assistantTranscription = mergeAssistantTextBuffer(
          assistantTranscription,
          outputTranscription,
        );

        if (!assistantReply.trim()) {
          callbacks.onAssistantResponseChange(assistantTranscription.trim());
          callbacks.onStateChange("assistant_responding");
        }
      }

      if (serverContent?.interrupted) {
        clearAssistantResponseTimeout();
        if (assistantReply.trim() || assistantTranscription.trim()) {
          callbacks.onNotice?.({
            code: "assistant_interrupted",
            message: "Reply interrupted",
          });
        }
        assistantReply = "";
        assistantTranscription = "";
        callbacks.onAssistantResponseChange("");
        callbacks.onStateChange("listening");
      }

      if (serverContent?.waitingForInput) {
        clearAssistantResponseTimeout();
        callbacks.onStateChange("listening");
      }

      if (serverContent?.turnComplete) {
        finalizeTurn();
      }
    };

    try {
      await connectLiveSession(bootstrap);

      microphonePcmStream = await createMicrophonePcmStream(microphoneStream, {
        onChunk: (base64PcmChunk) => {
          if (stopped || reconnecting || !liveSession) {
            return;
          }

          if (!firstOutboundMessageType) {
            recordFirstOutboundMessageType("realtimeInput:audio");
          }

          liveSession.sendRealtimeInput({
            audio: {
              data: base64PcmChunk,
              mimeType: getMicrophonePcmMimeType(),
            },
          });
        },
      });
    } catch (error) {
      const nextError = getConnectionConversationError(error);
      await fail(nextError);
      throw nextError;
    }

    return {
      supportsVisualContext: true,
      async sendVisualContext(context: SessionConversationVisualContext) {
        if (stopped || !liveSession) {
          return {
            status: "unavailable",
            message: "Context local only",
          };
        }

        try {
          const base64Data = getBase64PayloadFromDataUrl(context.url);

          liveSession.sendRealtimeInput({
            video: {
              data: base64Data,
              mimeType: context.mimeType,
            },
          });

      const session = callbacks.getSessionSnapshot();
          const language = session.sessionLanguage;
          const contextText = [
            context.note?.trim()
              ? translateExactText(language, context.note.trim())
              : "",
            buildInspectionContextText(session),
          ]
            .filter(Boolean)
            .join(" ");

          if (contextText) {
            if (!firstOutboundMessageType) {
              recordFirstOutboundMessageType("realtimeInput:text");
            }
            liveSession.sendRealtimeInput({
              text: contextText,
            });
          }

          return {
            status: "sent",
          };
        } catch (error) {
          console.error("Gemini visual context send failed", error);

          return {
            status: "failed",
            message: "Context local only",
          };
        }
      },
      stop() {
        if (stopped) {
          return;
        }

        stopped = true;
        closedByClient = true;
        reconnecting = false;
        clearAssistantResponseTimeout();
        callbacks.onTranscriptChange("");
        callbacks.onAssistantResponseChange("");
        callbacks.onStateChange("idle");

        if (liveSession) {
          liveSession.sendRealtimeInput({ audioStreamEnd: true });
          liveSession.close();
          liveSession = null;
        }

        if (microphonePcmStream) {
          void microphonePcmStream.stop();
          microphonePcmStream = null;
          return;
        }

        microphoneStream.getTracks().forEach((track) => track.stop());
      },
    };
  }
}
