import type { SessionConversationMessage } from "@/lib/types/session";

export const mockConversationHistory: SessionConversationMessage[] = [
  {
    id: "msg_user_1",
    createdAt: "2026-04-01T08:00:00.000Z",
    role: "user",
    text: "I want to check the front belt and pulley area.",
  },
  {
    id: "msg_assistant_1",
    createdAt: "2026-04-01T08:00:08.000Z",
    role: "assistant",
    text: "Start with the front accessory drive and keep the phone steady.",
  },
  {
    id: "msg_user_2",
    createdAt: "2026-04-01T08:00:15.000Z",
    role: "user",
    text: "I am moving toward the passenger-side pulleys now.",
  },
  {
    id: "msg_assistant_2",
    createdAt: "2026-04-01T08:00:24.000Z",
    role: "assistant",
    text: "Sweep slowly across the belt path and hold when you see wobble or wear.",
  },
];
