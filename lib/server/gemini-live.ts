import "server-only";

import { GoogleGenAI, Modality } from "@google/genai";

import { LIVE_SESSION_TOOL_DECLARATIONS } from "@/lib/live/session-tools";
import { resolveSessionLanguage } from "@/lib/session/session-language";
import type { GeminiLiveBootstrapResponse } from "@/lib/live/types";
import type { SessionLanguage } from "@/lib/types/session";

export const GEMINI_LIVE_MODEL = "gemini-3.1-flash-live-preview";
export const GEMINI_LIVE_API_VERSION = "v1alpha";
export const GEMINI_LIVE_WEBSOCKET_BASE_URL =
  "wss://generativelanguage.googleapis.com";

const GEMINI_LIVE_BASE_SYSTEM_INSTRUCTION = [
  "You are F-150 Repair Buddy for a 2010 Ford F-150 5.4 Triton.",
  "Always describe what you actually see first — rust, corrosion, leaks, cracks, wear, color, texture — even if you cannot name the exact part.",
  "If you can identify the specific part, call getPartHealthSummary to ground your answer. If you cannot identify it, still describe the visible condition and suggest what area it might be.",
  "Use tools when they add value: call searchKnowledge or getInspectionHints for symptoms the user mentions, call summarizeSessionEvidence to review what has been captured so far. Call lookupDTCCode when the user mentions a trouble code. Call lookupTorqueSpec when the user asks about torque values, fluid types, or capacities.",
  "Never loop on 'I cannot see it.' If the image is unclear, describe what you CAN see and ask the user to move the camera to a specific direction — closer, left, right, underneath, or hold still.",
  "Reply in one or two short sentences. Be direct and practical.",
  "When something looks dangerous — heavy rust, cracking, structural damage, fluid leaks near brake lines — say so immediately and recommend a shop visit. Do not downplay safety risks.",
];

function buildGeminiLiveSystemInstruction(sessionLanguage: SessionLanguage) {
  const languageInstruction =
    sessionLanguage === "ko"
      ? [
          "The session output language is locked to Korean.",
          "Your final user-facing reply must always be Korean only, regardless of what the user says.",
          "Do not switch your reply language during the session.",
          "Expect the user to code-mix English automotive terms inside Korean speech (for example 얼터네이터, 토크 컨버터, 텐셔너, 코일 팩, 스파크 플러그, OBD, VCT, PATS). This is normal and correct — accept these terms naturally and do not translate or correct them back to the user.",
          "If the user says an English part name, you may keep that exact English term inside your Korean reply when it is the standard term the user already uses; otherwise translate internally and respond in Korean.",
          "Never reply in English even if the user's whole sentence was in English.",
        ]
      : [
          "The session output language is locked to English.",
          "Your final user-facing reply must always be English only, regardless of what the user says.",
          "Do not switch your reply language during the session.",
          "Expect the user to code-mix Korean loanwords inside English speech (for example 얼터네이터, 토크 컨버터, or other Korean automotive terms). This is normal — accept them naturally and do not correct the user.",
          "If the user uses a Korean term, you may briefly acknowledge it and continue in English; otherwise translate internally and respond in English.",
          "Never reply in Korean even if the user's whole sentence was in Korean.",
        ];

  return [...GEMINI_LIVE_BASE_SYSTEM_INSTRUCTION, ...languageInstruction].join(
    " ",
  );
}

export function hasGeminiLiveApiKey() {
  return Boolean(process.env.GEMINI_API_KEY?.trim());
}

function isGeminiLiveExplicitlyDisabled() {
  return process.env.REPAIR_BUDDY_MODE?.trim() === "mock";
}

function buildGeminiLiveSessionConfig(sessionLanguage: SessionLanguage) {
  return {
    responseModalities: [Modality.AUDIO],
    speechConfig: {
      languageCode: sessionLanguage === "ko" ? "ko-KR" : "en-US",
    },
    inputAudioTranscription: {},
    outputAudioTranscription: {},
    temperature: 0.35,
    systemInstruction: buildGeminiLiveSystemInstruction(sessionLanguage),
    tools: [
      {
        functionDeclarations: LIVE_SESSION_TOOL_DECLARATIONS,
      },
    ],
    toolConfig: {
      functionCallingConfig: {
        mode: "AUTO",
      },
    },
  };
}

export async function createGeminiLiveBootstrap(
  sessionLanguageInput?: SessionLanguage | string | null,
): Promise<GeminiLiveBootstrapResponse> {
  const sessionLanguage = resolveSessionLanguage(sessionLanguageInput);
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const geminiKeyPresent = Boolean(apiKey);
  const liveModeExplicitlyDisabled = isGeminiLiveExplicitlyDisabled();

  if (liveModeExplicitlyDisabled) {
    return {
      provider: "mock",
      reason: "disabled",
      diagnostics: {
        activeProvider: "mock",
        geminiKeyPresent,
        liveModeExplicitlyDisabled: true,
      },
    };
  }

  if (!apiKey) {
    return {
      provider: "mock",
      reason: "missing_api_key",
      diagnostics: {
        activeProvider: "mock",
        geminiKeyPresent: false,
        liveModeExplicitlyDisabled: false,
      },
    };
  }

  const client = new GoogleGenAI({
    apiKey,
    httpOptions: { apiVersion: GEMINI_LIVE_API_VERSION },
  });
  const liveConfig = buildGeminiLiveSessionConfig(sessionLanguage);

  const token = await client.authTokens.create({
    config: {
      uses: 1,
      expireTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      newSessionExpireTime: new Date(Date.now() + 60 * 1000).toISOString(),
      httpOptions: { apiVersion: GEMINI_LIVE_API_VERSION },
      liveConnectConstraints: {
        model: GEMINI_LIVE_MODEL,
        config: liveConfig,
      },
    },
  });

  if (!token.name) {
    throw new Error("Gemini Live token provisioning failed.");
  }

  return {
    apiVersion: GEMINI_LIVE_API_VERSION,
    provider: "gemini",
    liveConfig: {
      inputAudioTranscription: {},
      outputAudioTranscription: {},
      responseModalities: liveConfig.responseModalities,
      speechConfig: liveConfig.speechConfig,
      systemInstruction: liveConfig.systemInstruction,
      temperature: liveConfig.temperature,
      tools: liveConfig.tools.map((tool) => ({
        functionDeclarations: tool.functionDeclarations,
      })),
      toolConfig: liveConfig.toolConfig,
    },
    model: GEMINI_LIVE_MODEL,
    token: token.name,
    websocketBaseUrl: GEMINI_LIVE_WEBSOCKET_BASE_URL,
    websocketMethod: "BidiGenerateContentConstrained",
    diagnostics: {
      activeProvider: "gemini",
      geminiKeyPresent: true,
      liveModeExplicitlyDisabled: false,
    },
  };
}
