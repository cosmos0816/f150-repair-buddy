import type {
  SessionConversationMessage,
  SessionConversationRole,
} from "@/lib/types/session";

export function findLatestConversationMessage(
  messages: SessionConversationMessage[],
  role: SessionConversationRole,
) {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index]?.role === role) {
      return messages[index];
    }
  }

  return undefined;
}

export function projectCompactConversationMessages(
  messages: SessionConversationMessage[],
  maxVisibleMessages = 4,
) {
  if (messages.length <= maxVisibleMessages) {
    return messages;
  }

  const selectedIndexes = new Set<number>();
  const latestAssistantIndex = messages.findLastIndex(
    (message) => message.role === "assistant",
  );
  const latestUserIndex = messages.findLastIndex(
    (message) => message.role === "user",
  );

  if (latestUserIndex >= 0) {
    selectedIndexes.add(latestUserIndex);
  }

  if (latestAssistantIndex >= 0) {
    selectedIndexes.add(latestAssistantIndex);
  }

  for (
    let index = messages.length - 1;
    index >= 0 && selectedIndexes.size < maxVisibleMessages;
    index -= 1
  ) {
    selectedIndexes.add(index);
  }

  return [...selectedIndexes]
    .sort((left, right) => left - right)
    .map((index) => messages[index]);
}
