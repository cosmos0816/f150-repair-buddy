import {
  SessionConversationError,
  type SessionConversationProvider,
  type SessionConversationProviderCallbacks,
  type SessionConversationRun,
} from "@/lib/providers/session-conversation-provider";
import type { RepairSessionSnapshot } from "@/lib/types/session";

export class MockSessionConversationProvider
  implements SessionConversationProvider
{
  readonly name = "mock" as const;

  async startConversation(
    _session: RepairSessionSnapshot,
    callbacks: SessionConversationProviderCallbacks,
  ): Promise<SessionConversationRun> {
    const error = new SessionConversationError(
      "provider_unavailable",
      "Live talk unavailable.",
      { recoverable: true },
    );

    callbacks.onTranscriptChange("");
    callbacks.onAssistantResponseChange("");
    callbacks.onStateChange("failed");
    callbacks.onError(error);

    throw error;
  }
}
