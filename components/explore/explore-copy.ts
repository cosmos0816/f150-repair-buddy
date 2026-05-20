import type { SessionLanguage } from "@/lib/types/session";

export function resolveExploreLanguage(value: string | null | undefined): SessionLanguage {
  return value === "ko" ? "ko" : "en";
}

type ExploreNav = {
  back: string;
  home: string;
  exploreIndex: string;
};

export function getExploreNav(lang: SessionLanguage): ExploreNav {
  if (lang === "ko") {
    return {
      back: "뒤로",
      home: "홈",
      exploreIndex: "탐색 목록",
    };
  }
  return {
    back: "Back",
    home: "Home",
    exploreIndex: "Explore index",
  };
}

export function withLang(path: string, lang: SessionLanguage): string {
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}lang=${lang}`;
}

export const SYSTEM_LABEL: Record<
  string,
  Record<SessionLanguage, string>
> = {
  engine: { en: "Engine", ko: "엔진" },
  transmission: { en: "Transmission", ko: "변속기" },
  driveline: { en: "Driveline", ko: "구동계" },
  brakes: { en: "Brakes", ko: "제동" },
  steering: { en: "Steering", ko: "조향" },
  body: { en: "Body", ko: "차체" },
  hvac: { en: "HVAC", ko: "냉난방" },
  electrical: { en: "Electrical", ko: "전장" },
  suspension: { en: "Suspension", ko: "서스펜션" },
  fuel_system: { en: "Fuel System", ko: "연료 계통" },
  safety: { en: "Safety", ko: "안전" },
  accessory_drive: { en: "Accessory Drive", ko: "보조 구동" },
  ignition: { en: "Ignition", ko: "점화" },
  exhaust: { en: "Exhaust", ko: "배기" },
  cooling: { en: "Cooling", ko: "냉각" },
};

export function getSystemLabel(system: string, lang: SessionLanguage): string {
  return SYSTEM_LABEL[system]?.[lang] ?? system;
}

export const BULLETIN_KIND_LABEL: Record<
  string,
  Record<SessionLanguage, string>
> = {
  TSB: { en: "TSB", ko: "기술공보" },
  RECALL: { en: "Recall", ko: "리콜" },
  CSP: { en: "CSP", ko: "고객 만족" },
  FSA: { en: "FSA", ko: "현장조치" },
  SSM: { en: "SSM", ko: "서비스 메시지" },
};
