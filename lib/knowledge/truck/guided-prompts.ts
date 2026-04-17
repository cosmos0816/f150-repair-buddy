import type { TruckGuidedPromptTemplate } from "@/lib/knowledge/truck/types";

export const TRUCK_GUIDED_PROMPTS: TruckGuidedPromptTemplate[] = [
  { id: "vt-battery-en", language: "en", visibleTargetId: "battery", prompt: "Show me the battery top and both terminals." },
  { id: "vt-battery-ko", language: "ko", visibleTargetId: "battery", prompt: "배터리 상단과 양쪽 터미널을 보여주세요." },
  { id: "vt-battery-terminal-en", language: "en", visibleTargetId: "battery_terminal", prompt: "Move closer to the battery terminal and clamp." },
  { id: "vt-battery-terminal-ko", language: "ko", visibleTargetId: "battery_terminal", prompt: "배터리 터미널과 클램프 쪽으로 더 가까이 가세요." },
  { id: "vt-connector-en", language: "en", visibleTargetId: "connector", prompt: "Show the top of the connector and the locking tab." },
  { id: "vt-connector-ko", language: "ko", visibleTargetId: "connector", prompt: "커넥터 윗면과 잠금 탭을 보여주세요." },
  { id: "vt-leak-en", language: "en", visibleTargetId: "leak_source_area", prompt: "Show me where the leak starts." },
  { id: "vt-leak-ko", language: "ko", visibleTargetId: "leak_source_area", prompt: "누유가 시작되는 지점을 보여주세요." },
  { id: "vt-wheel-well-en", language: "en", visibleTargetId: "wheel_well_rust", prompt: "I need a clearer view of the wheel well." },
  { id: "vt-wheel-well-ko", language: "ko", visibleTargetId: "wheel_well_rust", prompt: "휠하우스가 더 선명하게 보이게 해주세요." },
  { id: "vt-engine-top-en", language: "en", visibleTargetId: "engine_top", prompt: "Show the top front of the engine again." },
  { id: "vt-engine-top-ko", language: "ko", visibleTargetId: "engine_top", prompt: "엔진 윗앞쪽을 다시 보여주세요." },
  { id: "vt-front-drive-en", language: "en", visibleTargetId: "front_accessory_drive_area", prompt: "Show me the full front accessory drive area." },
  { id: "vt-front-drive-ko", language: "ko", visibleTargetId: "front_accessory_drive_area", prompt: "앞쪽 액세서리 드라이브 전체를 보여주세요." },
  { id: "issue-cooling-en", language: "en", issueAreaId: "cooling_reservoir_and_hose_seep", prompt: "Trace the wet path upward." },
  { id: "issue-cooling-ko", language: "ko", issueAreaId: "cooling_reservoir_and_hose_seep", prompt: "젖은 자국을 위쪽으로 따라가 주세요." },
  { id: "issue-brakes-en", language: "en", issueAreaId: "brake_hose_or_line_concern", prompt: "Show the hose, fitting, and line in one frame." },
  { id: "issue-brakes-ko", language: "ko", issueAreaId: "brake_hose_or_line_concern", prompt: "호스, 피팅, 라인을 한 화면에 보여주세요." },
  { id: "generic-unknown-en", language: "en", visibleTargetId: "unknown", prompt: "I cannot identify the part clearly yet." },
  { id: "generic-unknown-ko", language: "ko", visibleTargetId: "unknown", prompt: "부품을 아직 분명하게 식별하지 못했습니다." },
];
