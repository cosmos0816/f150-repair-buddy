import type { TruckSoundPrompt } from "@/lib/knowledge/sound/types";

export const TRUCK_SOUND_PROMPTS: TruckSoundPrompt[] = [
  { category: "belt_chirp", language: "en", prompt: "Show the belt and the most suspicious pulley face." },
  { category: "belt_chirp", language: "ko", prompt: "벨트와 가장 수상한 풀리 면을 보여주세요." },
  { category: "cam_phaser_rattle", language: "en", prompt: "Show the top front of the engine, then the belt path for comparison." },
  { category: "cam_phaser_rattle", language: "ko", prompt: "엔진 윗앞쪽을 보여준 뒤, 비교를 위해 벨트 경로도 보여주세요." },
  { category: "vacuum_hiss", language: "en", prompt: "Move closer to the hose or intake connection where the hiss seems strongest." },
  { category: "vacuum_hiss", language: "ko", prompt: "쉬익 소리가 가장 강한 호스나 흡기 연결부 쪽으로 더 가까이 가세요." },
  { category: "unknown", language: "en", prompt: "I cannot place the sound clearly yet. Show the current area again and hold still for two seconds." },
  { category: "unknown", language: "ko", prompt: "소리 원점을 아직 분명하게 못 잡았습니다. 같은 부위를 다시 보여주고 2초 동안 고정해 주세요." },
];
