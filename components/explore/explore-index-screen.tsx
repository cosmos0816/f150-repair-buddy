import Link from "next/link";

import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { withLang } from "@/components/explore/explore-copy";
import { GEN12_KNOWLEDGE } from "@/lib/knowledge/vehicles";
import { ENGINE_SOUNDS } from "@/lib/knowledge/vehicles/engine-sounds";
import type { SessionLanguage } from "@/lib/types/session";

type Props = { language: SessionLanguage };

type Tile = {
  index: number;
  href: string;
  titleEn: string;
  titleKo: string;
  descEn: string;
  descKo: string;
  stat: string;
};

export function ExploreIndexScreen({ language }: Props) {
  const engineCount = Object.keys(GEN12_KNOWLEDGE.engines).length;
  const trimCount = Object.keys(GEN12_KNOWLEDGE.trims).length + 1; // + raptor
  const bulletinCount = GEN12_KNOWLEDGE.bulletins.length;
  const soundCount = Object.keys(ENGINE_SOUNDS).length;

  const tiles: Tile[] = [
    {
      index: 1,
      href: "/explore/vehicle-picker",
      titleEn: "Vehicle Picker",
      titleKo: "차량 선택",
      descEn: "Year → trim → engine → cab → bed cascading config",
      descKo: "연식 → 트림 → 엔진 → 캡 → 베드 단계별 구성",
      stat: `${trimCount} trims`,
    },
    {
      index: 2,
      href: "/explore/engine-spec/5_4l_3v",
      titleEn: "Engine Spec Card",
      titleKo: "엔진 사양 카드",
      descEn: "Full spec sheet with DTCs, plug torque, top failures",
      descKo: "DTC, 플러그 토크, 주요 고장 포함 풀스펙",
      stat: `${engineCount} engines`,
    },
    {
      index: 3,
      href: "/explore/trim-compare?trims=lariat,king_ranch,platinum",
      titleEn: "Trim Compare",
      titleKo: "트림 비교",
      descEn: "Side-by-side comparison up to 3 trims",
      descKo: "최대 3개 트림 비교",
      stat: "Up to 3",
    },
    {
      index: 4,
      href: "/explore/raptor",
      titleEn: "SVT Raptor",
      titleKo: "SVT 랩터",
      descEn: "Fox shocks, year deltas, known issues",
      descKo: "Fox 쇽, 연식별 변경, 알려진 이슈",
      stat: "2010-2014",
    },
    {
      index: 5,
      href: "/explore/failure-modes/5_4l_3v",
      titleEn: "Failure Modes",
      titleKo: "주요 고장 모드",
      descEn: "Sortable by mileage / cost / DIY difficulty",
      descKo: "주행거리 / 비용 / 난이도 정렬",
      stat: "By engine",
    },
    {
      index: 6,
      href: "/explore/bulletins",
      titleEn: "Bulletins / Recalls",
      titleKo: "TSB / 리콜",
      descEn: "TSB · Recall · CSP filterable browser",
      descKo: "TSB · 리콜 · CSP 필터 검색",
      stat: `${bulletinCount} entries`,
    },
    {
      index: 7,
      href: "/explore/service-intervals/5_4l_3v",
      titleEn: "Service Intervals",
      titleKo: "정비 주기",
      descEn: "Normal vs severe-duty timeline",
      descKo: "일반 vs 가혹조건 타임라인",
      stat: "Per engine",
    },
    {
      index: 8,
      href: "/explore/parts-finder",
      titleEn: "Parts Finder",
      titleKo: "부품 검색",
      descEn: "RockAuto linker preview with category hints",
      descKo: "RockAuto 카테고리 매핑 미리보기",
      stat: "Catalog map",
    },
    {
      index: 9,
      href: "/explore/sound-fingerprints",
      titleEn: "Sound Fingerprints",
      titleKo: "사운드 핑거프린트",
      descEn: "What Listen Mode hears — EN/KO signatures",
      descKo: "리슨 모드 인식 사운드 — 영/한 시그니처",
      stat: `${soundCount} sounds`,
    },
    {
      index: 10,
      href: "/explore/year-timeline",
      titleEn: "Year Timeline",
      titleKo: "연식 타임라인",
      descEn: "2009-2014 engine, trim, Raptor changes",
      descKo: "2009-2014 엔진·트림·랩터 변경 이력",
      stat: "6 years",
    },
  ];

  return (
    <MobileAppShell activeRoute="explore">
      <ScreenFrame
        eyebrow={language === "ko" ? "탐색" : "Explore"}
        title={language === "ko" ? "12세대 지식" : "12th-Gen Knowledge"}
        description={
          language === "ko"
            ? "2009-2014 F-150 + SVT 랩터 지식 레이어의 10개 화면 데모."
            : "Ten sample screens against the 2009-2014 F-150 + SVT Raptor knowledge layer."
        }
      >
        <Card className="mb-3 space-y-2">
          <p className="text-[0.62rem] font-bold tracking-[0.18em] text-muted uppercase">
            {language === "ko" ? "언어" : "Language"}
          </p>
          <div className="flex gap-2">
            {(["en", "ko"] as const).map((lang) => (
              <Link
                key={lang}
                href={withLang("/explore", lang)}
                className={[
                  "rounded-full px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.14em] uppercase transition",
                  language === lang
                    ? "bg-accent text-background"
                    : "border border-border bg-panel text-foreground/80",
                ].join(" ")}
              >
                {lang === "ko" ? "KOR" : "ENG"}
              </Link>
            ))}
          </div>
        </Card>

        <div className="grid gap-3">
          {tiles.map((tile) => (
            <Link key={tile.index} href={withLang(tile.href, language)} className="block">
              <Card className="transition hover:border-accent/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.6rem] font-bold tracking-[0.2em] text-accent-strong uppercase">
                      {String(tile.index).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-[family:var(--font-display)] text-xl leading-tight font-semibold text-foreground">
                      {language === "ko" ? tile.titleKo : tile.titleEn}
                    </h3>
                    <p className="mt-1.5 text-xs leading-5 text-muted">
                      {language === "ko" ? tile.descKo : tile.descEn}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-border/50 bg-background/40 px-2.5 py-1 text-[0.55rem] font-semibold tracking-[0.14em] text-foreground/80 uppercase">
                    {tile.stat}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-5">
          <Button fullWidth href="/" variant="ghost">
            {language === "ko" ? "홈으로" : "Back home"}
          </Button>
        </div>
      </ScreenFrame>
    </MobileAppShell>
  );
}
