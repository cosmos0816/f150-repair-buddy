"use client";

import { useMemo, useState } from "react";

import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BULLETIN_KIND_LABEL,
  getSystemLabel,
  withLang,
} from "@/components/explore/explore-copy";
import { BULLETINS } from "@/lib/knowledge/vehicles/bulletins";
import { ALL_ENGINES } from "@/lib/knowledge/vehicles/engines";
import type {
  EngineId,
  ModelYear,
  ServiceBulletin,
} from "@/lib/knowledge/vehicles/types";
import type { SessionLanguage } from "@/lib/types/session";

type Props = { language: SessionLanguage };

const ALL_YEARS: ModelYear[] = [2009, 2010, 2011, 2012, 2013, 2014];

export function BulletinsScreen({ language }: Props) {
  const [year, setYear] = useState<ModelYear | null>(null);
  const [engineFilter, setEngineFilter] = useState<EngineId | null>(null);
  const [systemFilter, setSystemFilter] = useState<ServiceBulletin["system"] | null>(
    null,
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const systems = useMemo(() => {
    const set = new Set<ServiceBulletin["system"]>();
    for (const b of BULLETINS) set.add(b.system);
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return BULLETINS.filter((b) => {
      if (year && !b.yearsAffected.includes(year)) return false;
      if (engineFilter) {
        if (!b.engineIds || !b.engineIds.includes(engineFilter)) return false;
      }
      if (systemFilter && b.system !== systemFilter) return false;
      return true;
    });
  }, [year, engineFilter, systemFilter]);

  function clearFilters() {
    setYear(null);
    setEngineFilter(null);
    setSystemFilter(null);
  }

  return (
    <MobileAppShell activeRoute="explore">
      <ScreenFrame
        eyebrow={language === "ko" ? "06 · 공보·리콜" : "06 · Bulletins"}
        title={language === "ko" ? "TSB · 리콜 · CSP" : "TSB · Recall · CSP"}
        description={
          language === "ko"
            ? "필터 칩으로 연식·엔진·시스템별로 좁혀 보세요."
            : "Filter by year, engine, or system."
        }
      >
        <Card className="mb-3 space-y-2.5">
          <div>
            <p className="mb-1.5 text-[0.55rem] font-bold tracking-[0.18em] text-muted uppercase">
              {language === "ko" ? "연식" : "Year"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {ALL_YEARS.map((y) => (
                <FilterChip
                  key={y}
                  active={year === y}
                  onClick={() => setYear(year === y ? null : y)}
                >
                  {y}
                </FilterChip>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[0.55rem] font-bold tracking-[0.18em] text-muted uppercase">
              {language === "ko" ? "엔진" : "Engine"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(ALL_ENGINES) as EngineId[]).map((eid) => (
                <FilterChip
                  key={eid}
                  active={engineFilter === eid}
                  onClick={() =>
                    setEngineFilter(engineFilter === eid ? null : eid)
                  }
                >
                  {shortEngine(eid)}
                </FilterChip>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[0.55rem] font-bold tracking-[0.18em] text-muted uppercase">
              {language === "ko" ? "시스템" : "System"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {systems.map((s) => (
                <FilterChip
                  key={s}
                  active={systemFilter === s}
                  onClick={() => setSystemFilter(systemFilter === s ? null : s)}
                >
                  {getSystemLabel(s, language)}
                </FilterChip>
              ))}
            </div>
          </div>
          {(year || engineFilter || systemFilter) && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-[0.62rem] font-semibold tracking-[0.16em] text-accent-strong uppercase hover:underline"
            >
              {language === "ko" ? "필터 초기화" : "Clear filters"}
            </button>
          )}
        </Card>

        <p className="mb-2 text-[0.62rem] font-semibold tracking-[0.14em] text-muted uppercase">
          {language === "ko"
            ? `${filtered.length}건 결과`
            : `${filtered.length} results`}
        </p>

        <div className="grid gap-2">
          {filtered.map((b) => {
            const expanded = expandedId === b.id;
            return (
              <Card key={b.id}>
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : b.id)}
                  className="block w-full text-left"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          "rounded-md border px-2 py-0.5 text-[0.55rem] font-bold tracking-[0.14em] uppercase",
                          b.kind === "RECALL"
                            ? "border-danger/45 bg-danger/15 text-danger"
                            : b.kind === "CSP"
                              ? "border-warning/45 bg-warning/15 text-warning"
                              : "border-accent/45 bg-accent/15 text-accent",
                        ].join(" ")}
                      >
                        {BULLETIN_KIND_LABEL[b.kind]?.[language] ?? b.kind}
                      </span>
                      <span className="text-[0.65rem] font-semibold tracking-[0.06em] text-foreground/85">
                        {b.id}
                      </span>
                    </div>
                    <span className="text-[0.55rem] font-semibold tracking-[0.14em] text-muted uppercase">
                      {getSystemLabel(b.system, language)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[0.78rem] leading-5 font-semibold text-foreground">
                    {b.symptom}
                  </p>
                  <p className="mt-1 text-[0.62rem] tracking-wide text-muted">
                    {affectedSummary(b, language)}
                  </p>
                </button>

                {expanded ? (
                  <div className="mt-3 space-y-2 border-t border-border/30 pt-3 text-[0.72rem] leading-5">
                    <Detail
                      label={language === "ko" ? "원인" : "Cause"}
                      value={b.cause}
                    />
                    <Detail
                      label={language === "ko" ? "조치" : "Remedy"}
                      value={b.remedy}
                    />
                    {b.dtcs && b.dtcs.length > 0 ? (
                      <div>
                        <p className="text-[0.55rem] font-bold tracking-[0.16em] text-muted uppercase">
                          DTCs
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {b.dtcs.map((d) => (
                            <span
                              key={d}
                              className="rounded-md border border-border/45 bg-background/60 px-1.5 py-0.5 text-[0.6rem] font-semibold text-foreground/85"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {b.buildDateRange ? (
                      <Detail
                        label={language === "ko" ? "생산 기간" : "Build window"}
                        value={`${b.buildDateRange.from ?? "—"} → ${b.buildDateRange.to ?? "—"}`}
                      />
                    ) : null}
                    {b.laborHours ? (
                      <Detail
                        label={language === "ko" ? "공임 시간" : "Labor hours"}
                        value={`${b.laborHours} h`}
                      />
                    ) : null}
                    {b.sourceUrls?.length ? (
                      <a
                        href={b.sourceUrls[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-[0.62rem] font-semibold tracking-[0.14em] text-accent-strong uppercase hover:underline"
                      >
                        {language === "ko" ? "출처 보기 →" : "View source →"}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </Card>
            );
          })}
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

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.08em] uppercase transition",
        active
          ? "border-accent bg-accent/15 text-accent"
          : "border-border/55 bg-panel text-foreground/70 hover:border-foreground/30",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.55rem] font-bold tracking-[0.16em] text-muted uppercase">
        {label}
      </p>
      <p className="mt-0.5 text-foreground/85">{value}</p>
    </div>
  );
}

function shortEngine(id: EngineId): string {
  const map: Record<EngineId, string> = {
    "4_6l_2v": "4.6 2V",
    "4_6l_3v": "4.6 3V",
    "5_4l_3v": "5.4",
    "6_2l_boss": "6.2",
    "3_7l_tivct": "3.7",
    "5_0l_coyote": "5.0",
    "3_5l_ecoboost": "3.5 EB",
  };
  return map[id];
}

function affectedSummary(b: ServiceBulletin, lang: SessionLanguage): string {
  const yrs = `${Math.min(...b.yearsAffected)}-${Math.max(...b.yearsAffected)}`;
  const engineCount = b.engineIds?.length ?? 0;
  const trims = b.trimsAffected?.length ?? 0;
  if (engineCount === 0 && trims === 0) {
    return lang === "ko" ? `${yrs} · 전체 트림` : `${yrs} · All trims`;
  }
  const parts = [yrs];
  if (engineCount) parts.push(`${engineCount} ${lang === "ko" ? "엔진" : "engines"}`);
  if (trims) parts.push(`${trims} ${lang === "ko" ? "트림" : "trims"}`);
  return parts.join(" · ");
}
