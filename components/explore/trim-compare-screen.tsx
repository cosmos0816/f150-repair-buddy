"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { withLang } from "@/components/explore/explore-copy";
import { ALL_NONRAPTOR_TRIMS } from "@/lib/knowledge/vehicles/trims";
import { SVT_RAPTOR } from "@/lib/knowledge/vehicles/raptor";
import { getEngineSpec } from "@/lib/knowledge/vehicles/engines";
import type { EngineId, TrimId, TrimSpec } from "@/lib/knowledge/vehicles/types";
import type { SessionLanguage } from "@/lib/types/session";

type Props = { language: SessionLanguage };

const ALL_TRIMS_REC: Record<TrimId, TrimSpec | typeof SVT_RAPTOR> = {
  ...(ALL_NONRAPTOR_TRIMS as unknown as Record<TrimId, TrimSpec>),
  svt_raptor: SVT_RAPTOR,
};

const TIER_LABEL: Record<string, Record<SessionLanguage, string>> = {
  fleet: { en: "Fleet", ko: "플릿" },
  sport_value: { en: "Sport Value", ko: "스포츠 밸류" },
  volume: { en: "Volume", ko: "볼륨" },
  sport: { en: "Sport", ko: "스포츠" },
  luxury: { en: "Luxury", ko: "럭셔리" },
  halo: { en: "Halo", ko: "헤일로" },
  off_road_halo: { en: "Off-road Halo", ko: "오프로드 헤일로" },
};

export function TrimCompareScreen({ language }: Props) {
  const router = useRouter();
  const search = useSearchParams();

  const selected = useMemo(() => {
    const raw = search.get("trims") ?? "lariat,king_ranch,platinum";
    return raw
      .split(",")
      .filter((s): s is TrimId => Object.hasOwn(ALL_TRIMS_REC, s))
      .slice(0, 3);
  }, [search]);

  function toggleTrim(id: TrimId) {
    let next = [...selected];
    if (next.includes(id)) {
      next = next.filter((s) => s !== id);
    } else {
      if (next.length >= 3) next.shift();
      next.push(id);
    }
    const params = new URLSearchParams(Array.from(search.entries()));
    params.set("trims", next.join(","));
    router.push(`?${params.toString()}`);
  }

  const trims = selected.map((id) => ALL_TRIMS_REC[id]);

  return (
    <MobileAppShell activeRoute="explore">
      <ScreenFrame
        eyebrow={language === "ko" ? "03 · 트림 비교" : "03 · Trim Compare"}
        title={language === "ko" ? "최대 3개 비교" : "Up to 3 trims"}
        description={
          language === "ko"
            ? "트림을 탭해 추가/제거하세요. 가로 스크롤로 비교 테이블을 봅니다."
            : "Tap trims to add/remove. Scroll horizontally for the comparison table."
        }
      >
        <Card className="mb-3">
          <p className="mb-2 text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
            {language === "ko" ? "트림 선택" : "Pick trims"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(ALL_TRIMS_REC) as TrimId[]).map((id) => {
              const active = selected.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleTrim(id)}
                  className={[
                    "rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.08em] uppercase transition",
                    active
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-border/55 bg-panel text-foreground/70 hover:border-foreground/30",
                  ].join(" ")}
                >
                  {ALL_TRIMS_REC[id].displayName.split(" (")[0]}
                </button>
              );
            })}
          </div>
        </Card>

        {trims.length === 0 ? (
          <Card>
            <p className="text-sm text-muted">
              {language === "ko"
                ? "비교할 트림을 선택하세요."
                : "Pick at least one trim above."}
            </p>
          </Card>
        ) : (
          <div className="-mx-4 overflow-x-auto pb-2">
            <div className="px-4">
              <table className="w-full min-w-[460px] border-separate border-spacing-y-1.5 text-left text-xs">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 bg-background/95 pr-3 text-[0.6rem] font-bold tracking-[0.16em] text-muted uppercase">
                      {language === "ko" ? "항목" : "Field"}
                    </th>
                    {trims.map((t) => (
                      <th
                        key={t.id}
                        className="min-w-[120px] px-2 align-top"
                      >
                        <div className="rounded-[0.9rem] border border-accent/30 bg-accent/5 p-2">
                          <p className="text-[0.6rem] font-bold tracking-[0.14em] text-accent uppercase">
                            {TIER_LABEL[t.tier]?.[language] ?? t.tier}
                          </p>
                          <p className="mt-0.5 truncate text-[0.74rem] font-semibold text-foreground">
                            {t.displayName.split(" (")[0]}
                          </p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-[0.7rem]">
                  <Row
                    label={language === "ko" ? "연식" : "Years"}
                    cells={trims.map((t) => yearRange(t.yearsOffered))}
                  />
                  <Row
                    label={language === "ko" ? "캡 스타일" : "Cab styles"}
                    cells={trims.map((t) => uniqueCabs(t))}
                  />
                  <Row
                    label={language === "ko" ? "베드" : "Bed lengths"}
                    cells={trims.map((t) => uniqueBeds(t))}
                  />
                  <Row
                    label={language === "ko" ? "엔진" : "Engines"}
                    cells={trims.map((t) => uniqueEngines(t, language))}
                    multiline
                  />
                  <Row
                    label={language === "ko" ? "휠" : "Wheels"}
                    cells={trims.map((t) => uniqueWheels(t))}
                  />
                  <Row
                    label={language === "ko" ? "차중" : "Curb wt"}
                    cells={trims.map((t) => curbWeightRange(t))}
                  />
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-3 grid gap-2">
          {trims.map((t) => (
            <Card key={t.id}>
              <p className="text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
                {t.displayName}
              </p>
              <ul className="mt-2 space-y-1.5 text-[0.72rem] leading-5 text-foreground/80">
                {t.serviceRelevantEquipment.slice(0, 6).map((eq, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent">·</span>
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-4">
          <Button fullWidth href={withLang("/explore", language)} variant="ghost">
            {language === "ko" ? "탐색 목록으로" : "Back to explore"}
          </Button>
        </div>
      </ScreenFrame>
    </MobileAppShell>
  );
}

function Row({
  label,
  cells,
  multiline = false,
}: {
  label: string;
  cells: string[];
  multiline?: boolean;
}) {
  return (
    <tr>
      <td className="sticky left-0 z-10 bg-background/95 pr-3 align-top text-[0.6rem] font-semibold tracking-[0.12em] text-muted uppercase">
        {label}
      </td>
      {cells.map((v, i) => (
        <td key={i} className="min-w-[120px] px-2 align-top">
          <div className="rounded-[0.9rem] border border-border/45 bg-panel/70 p-2">
            <p
              className={[
                "text-foreground/90",
                multiline ? "" : "truncate",
              ].join(" ")}
            >
              {v}
            </p>
          </div>
        </td>
      ))}
    </tr>
  );
}

function yearRange(years: readonly number[]): string {
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? `${min}` : `${min}-${max}`;
}

function uniqueCabs(t: TrimSpec | typeof SVT_RAPTOR): string {
  const all = new Set<string>();
  for (const c of t.yearConfigs) for (const s of c.cabStylesOffered) all.add(s);
  return Array.from(all)
    .map((s) => s.replace("_", " ").replace("supercab", "SCab").replace("supercrew", "SCrew").replace("regular cab", "Reg"))
    .join(", ");
}

function uniqueBeds(t: TrimSpec | typeof SVT_RAPTOR): string {
  const all = new Set<string>();
  for (const c of t.yearConfigs) for (const b of c.bedLengthsOffered) all.add(b);
  return Array.from(all).join(", ");
}

function uniqueEngines(t: TrimSpec | typeof SVT_RAPTOR, lang: SessionLanguage): string {
  const all = new Set<EngineId>();
  for (const c of t.yearConfigs) for (const e of c.enginesOffered) all.add(e);
  return Array.from(all)
    .map((e) => getEngineSpec(e).displayName.replace(/^([\d.]+L\s+\w+).*/, "$1"))
    .join(lang === "ko" ? " · " : " · ");
}

function uniqueWheels(t: TrimSpec | typeof SVT_RAPTOR): string {
  const all = new Set<number>();
  for (const c of t.yearConfigs) for (const w of c.wheelDiameterIn) all.add(w);
  return Array.from(all).sort().map((w) => `${w}"`).join(", ");
}

function curbWeightRange(t: TrimSpec | typeof SVT_RAPTOR): string {
  let min = Infinity;
  let max = -Infinity;
  for (const c of t.yearConfigs) {
    if (c.curbWeightLbRange) {
      min = Math.min(min, c.curbWeightLbRange[0]);
      max = Math.max(max, c.curbWeightLbRange[1]);
    }
  }
  if (!Number.isFinite(min)) return "—";
  return `${min}-${max} lb`;
}
