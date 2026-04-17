import type { TruckSoundOperatingCondition } from "@/lib/knowledge/sound/types";

export const TRUCK_SOUND_OPERATING_CONDITIONS: TruckSoundOperatingCondition[] = [
  { id: "cold_start", label: { en: "Cold start", ko: "냉간 시동" }, description: "Just after start when fluids and clearances are still cold." },
  { id: "warm_idle", label: { en: "Warm idle", ko: "웜업 후 공회전" }, description: "Engine at normal temperature and idling." },
  { id: "hot_idle", label: { en: "Hot idle", ko: "완전 열간 공회전" }, description: "Fully warmed idle after driving." },
  { id: "steady_idle", label: { en: "Steady idle", ko: "안정 공회전" }, description: "Idle with no throttle change." },
  { id: "light_rpm_blip", label: { en: "Light RPM blip", ko: "가벼운 알피엠 변동" }, description: "A short, light increase in engine speed." },
  { id: "ac_on", label: { en: "A/C on", ko: "에어컨 켜짐" }, description: "Accessory load with climate system engaged." },
  { id: "electrical_load", label: { en: "Electrical load", ko: "전기 부하" }, description: "Lights, blower, or charging load applied." },
  { id: "under_load", label: { en: "Under load", ko: "부하 상태" }, description: "The complaint is stronger with engine or driveline load." },
  { id: "after_rain", label: { en: "After rain / moisture", ko: "비나 습기 이후" }, description: "Noise may be influenced by water or dampness." },
];
