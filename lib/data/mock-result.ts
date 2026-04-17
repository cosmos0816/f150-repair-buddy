import { APP_CONFIG } from "@/lib/config/app-config";
import { mockConversationHistory } from "@/lib/data/mock-conversation";
import { buildSessionEvidence } from "@/lib/session/evidence";
import type { RepairSessionSnapshot } from "@/lib/types/session";

const mockSessionEvents: RepairSessionSnapshot["events"] = [
  {
    id: "evt_status_1",
    type: "status",
    createdAt: "2026-03-31T08:00:00.000Z",
    status: "ready",
    message: "Phase 1 mock session loaded.",
  },
  {
    id: "evt_bookmark_1",
    type: "bookmark",
    createdAt: "2026-03-31T08:01:32.000Z",
    bookmarkType: "belt_pulley",
    note: "Noise strongest near the front passenger-side pulleys.",
  },
  {
    id: "evt_frame_1",
    type: "frame",
    createdAt: "2026-03-31T08:02:10.000Z",
    mimeType: "image/jpeg",
    storage: "local",
    url: "mock://frame/front-accessory-drive-001.jpg",
    width: 960,
    height: 540,
    source: "camera_preview",
    captureKind: "manual",
    sentToConversation: false,
  },
];

export const mockSessionSnapshot: RepairSessionSnapshot = {
  id: "session_mock_phase_1",
  vehicleId: APP_CONFIG.vehicle.id,
  sessionLanguage: "en",
  startedAt: "2026-03-31T08:00:00.000Z",
  endedAt: "2026-03-31T08:04:00.000Z",
  mode: "mock",
  events: mockSessionEvents,
  evidence: buildSessionEvidence(mockSessionEvents, mockConversationHistory),
};
