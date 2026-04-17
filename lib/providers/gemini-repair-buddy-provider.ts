import type { GoogleGenAI } from "@google/genai";

import {
  buildSystemPrompt,
  selectRelevantKnowledge,
} from "@/lib/knowledge/grounding";
import { normalizeGeminiResponse } from "@/lib/providers/grounded-result";
import type { RepairBuddyProvider } from "@/lib/providers/repair-buddy-provider-types";
import { buildMockRepairResult } from "@/lib/session/mock-diagnosis";
import type { RepairResult } from "@/lib/types/result";
import type { RepairSessionSnapshot } from "@/lib/types/session";

const GEMINI_ANALYSIS_MODEL = "gemini-2.5-flash";
/** Max capture frames to attach as inline images (blob: URLs are skipped). */
const MAX_INLINE_FRAMES = 4;
/** Max conversation messages to include in the user content block. */
const MAX_CONVERSATION_MESSAGES = 10;

export class GeminiRepairBuddyProvider implements RepairBuddyProvider {
  readonly name = "gemini" as const;

  private ai: GoogleGenAI | null = null;
  private aiInitialized = false;

  private async getClient(): Promise<GoogleGenAI | null> {
    if (this.aiInitialized) return this.ai;
    this.aiInitialized = true;

    if (typeof window !== "undefined") return null;

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      console.warn(
        "[GeminiRepairBuddy] GEMINI_API_KEY is not set. analyzeSession will fall back to mock mode.",
      );
      return null;
    }

    const { GoogleGenAI } = await import("@google/genai");
    this.ai = new GoogleGenAI({ apiKey });
    return this.ai;
  }

  async analyzeSession(session: RepairSessionSnapshot): Promise<RepairResult> {
    const ai = await this.getClient();
    if (!ai) {
      console.warn(
        "[GeminiRepairBuddy] No API key or running in browser — returning mock result.",
      );
      return buildMockRepairResult(session);
    }

    try {
      const selected = selectRelevantKnowledge(session);
      const system = buildSystemPrompt(selected, session);

      // -----------------------------------------------------------------------
      // Build user content parts
      // -----------------------------------------------------------------------
      const textParts: string[] = [];

      textParts.push(`Vehicle: ${session.vehicleId}`);
      textParts.push(`Mode: ${session.mode}`);
      textParts.push(`Language: ${session.sessionLanguage}`);
      textParts.push("");

      if (session.evidence.bookmarks.length > 0) {
        textParts.push("## Bookmarks");
        for (const bm of session.evidence.bookmarks) {
          const note = bm.note?.trim() ? ` — ${bm.note.trim()}` : "";
          textParts.push(
            `- [${bm.bookmarkType}] ${bm.createdAt}${note}`,
          );
        }
        textParts.push("");
      }

      const recentConversation = session.evidence.conversation.slice(
        -MAX_CONVERSATION_MESSAGES,
      );
      if (recentConversation.length > 0) {
        textParts.push("## Conversation (recent)");
        for (const msg of recentConversation) {
          textParts.push(`[${msg.role}] ${msg.text.trim()}`);
        }
        textParts.push("");
      }

      textParts.push(
        "Based on the session evidence above and any inline frame images, return a JSON diagnosis matching the schema in the system instruction.",
      );

      // -----------------------------------------------------------------------
      // Attach capture frames as inline data parts.
      // blob: URLs are not reachable server-side — only data: URLs can be sent
      // as base64 inline parts. Skip any non-data: URLs silently.
      // -----------------------------------------------------------------------
      type Part =
        | { text: string }
        | { inlineData: { mimeType: string; data: string } };

      const parts: Part[] = [{ text: textParts.join("\n") }];

      const recentCaptures = session.evidence.captures.slice(-MAX_INLINE_FRAMES);
      for (const capture of recentCaptures) {
        if (!capture.url.startsWith("data:")) {
          // blob: or other non-data URLs cannot be sent to Gemini from the server.
          continue;
        }

        const commaIndex = capture.url.indexOf(",");
        if (commaIndex === -1) continue;

        const base64Data = capture.url.slice(commaIndex + 1);
        if (!base64Data) continue;

        parts.push({
          inlineData: {
            mimeType: capture.mimeType,
            data: base64Data,
          },
        });
      }

      // -----------------------------------------------------------------------
      // Call Gemini
      // -----------------------------------------------------------------------
      const response = await ai.models.generateContent({
        model: GEMINI_ANALYSIS_MODEL,
        contents: [{ role: "user", parts }],
        config: {
          responseMimeType: "application/json",
          systemInstruction: system,
          temperature: 0.2,
        },
      });

      const rawText = response.text ?? "";

      if (!rawText.trim()) {
        console.warn(
          "[GeminiRepairBuddy] Empty response from Gemini; falling back to mock.",
        );
        return buildMockRepairResult(session);
      }

      return normalizeGeminiResponse(rawText, session, selected);
    } catch (error) {
      console.warn(
        "[GeminiRepairBuddy] Error during analyzeSession; falling back to mock.",
        error,
      );
      return buildMockRepairResult(session);
    }
  }
}
