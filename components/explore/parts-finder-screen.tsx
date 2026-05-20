"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSystemLabel, withLang } from "@/components/explore/explore-copy";
import { ALL_ENGINES } from "@/lib/knowledge/vehicles/engines";
import { ALL_NONRAPTOR_TRIMS } from "@/lib/knowledge/vehicles/trims";
import { SVT_RAPTOR } from "@/lib/knowledge/vehicles/raptor";
import {
  getLinkerEntries,
  isFitmentApproximate,
} from "@/lib/knowledge/vehicles/parts-linker";
import type {
  EngineId,
  PartsLinkerEntry,
  TrimId,
} from "@/lib/knowledge/vehicles/types";
import type { SessionLanguage } from "@/lib/types/session";

type Props = { language: SessionLanguage };

const SYSTEMS: PartsLinkerEntry["forSystem"][] = [
  "engine",
  "ignition",
  "cooling",
  "brakes",
  "suspension",
  "steering",
  "electrical",
  "hvac",
  "accessory_drive",
  "exhaust",
  "fuel_system",
  "body",
];

const ALL_TRIMS: Record<TrimId, { id: TrimId; displayName: string }> = {
  ...(ALL_NONRAPTOR_TRIMS as unknown as Record<TrimId, { id: TrimId; displayName: string }>),
  svt_raptor: { id: SVT_RAPTOR.id, displayName: SVT_RAPTOR.displayName },
};

export function PartsFinderScreen({ language }: Props) {
  const router = useRouter();
  const search = useSearchParams();

  const engineId = search.get("engine") as EngineId | null;
  const trimId = search.get("trim") as TrimId | null;
  const system = search.get("system") as PartsLinkerEntry["forSystem"] | null;

  const entries = useMemo(() => {
    return getLinkerEntries({
      engineId: engineId ?? undefined,
      trimId: trimId ?? undefined,
      system: system ?? undefined,
    });
  }, [engineId, trimId, system]);

  const approximate = useMemo(
    () =>
      isFitmentApproximate({
        engineId: engineId ?? undefined,
        trimId: trimId ?? undefined,
      }),
    [engineId, trimId],
  );

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(Array.from(search.entries()));
    if (value === null) params.delete(key);
    else params.set(key, value);
    router.push(`?${params.toString()}`);
  }

  return (
    <MobileAppShell activeRoute="explore">
      <ScreenFrame
        eyebrow={language === "ko" ? "08 · 부품 검색" : "08 · Parts Finder"}
        title={language === "ko" ? "RockAuto 매핑" : "RockAuto Linker"}
        description={
          language === "ko"
            ? "엔진/트림/시스템을 골라 RockAuto 카탈로그 매핑을 미리 보세요."
            : "Pick engine/trim/system to preview the RockAuto catalog mapping."
        }
      >
        <Card className="mb-3 space-y-2.5">
          <div>
            <p className="mb-1.5 text-[0.55rem] font-bold tracking-[0.18em] text-muted uppercase">
              {language === "ko" ? "엔진" : "Engine"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(ALL_ENGINES) as EngineId[]).map((eid) => (
                <Pill
                  key={eid}
                  active={engineId === eid}
                  onClick={() => setParam("engine", engineId === eid ? null : eid)}
                  label={ALL_ENGINES[eid].displayName.replace(/^([\d.]+L\s+\w+).*/, "$1")}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[0.55rem] font-bold tracking-[0.18em] text-muted uppercase">
              {language === "ko" ? "트림" : "Trim"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(ALL_TRIMS) as TrimId[]).map((tid) => (
                <Pill
                  key={tid}
                  active={trimId === tid}
                  onClick={() => setParam("trim", trimId === tid ? null : tid)}
                  label={ALL_TRIMS[tid].displayName.split(" (")[0]}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[0.55rem] font-bold tracking-[0.18em] text-muted uppercase">
              {language === "ko" ? "시스템" : "System"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SYSTEMS.map((s) => (
                <Pill
                  key={s}
                  active={system === s}
                  onClick={() => setParam("system", system === s ? null : s)}
                  label={getSystemLabel(s, language)}
                />
              ))}
            </div>
          </div>
        </Card>

        {approximate && (engineId || trimId) ? (
          <Card className="mb-3 border-warning/40 bg-warning/10">
            <p className="text-[0.6rem] font-bold tracking-[0.16em] text-warning uppercase">
              {language === "ko" ? "근사 적합" : "Approximate fitment"}
            </p>
            <p className="mt-1 text-[0.7rem] leading-5 text-foreground/85">
              {language === "ko"
                ? "현재 RockAuto 카탈로그는 2010 5.4L 기준입니다. 다른 엔진/트림의 매핑은 참고용이며 RockAuto에서 VIN으로 확인하세요."
                : "Current RockAuto catalog is for 2010 5.4L. Mappings for other engines/trims are representative — verify fit on RockAuto by VIN."}
            </p>
          </Card>
        ) : null}

        <p className="mb-2 text-[0.62rem] font-semibold tracking-[0.14em] text-muted uppercase">
          {entries.length} {language === "ko" ? "매핑" : "mappings"}
        </p>

        <div className="grid gap-2">
          {entries.map((e, i) => (
            <Card key={i}>
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="text-[0.6rem] font-bold tracking-[0.16em] text-accent-strong uppercase">
                  {getSystemLabel(e.forSystem, language)}
                </p>
                {e.trimSpecific ? (
                  <span className="rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[0.55rem] font-bold tracking-[0.14em] text-warning uppercase">
                    {language === "ko" ? "근사 적합" : "Approx fit"}
                  </span>
                ) : null}
              </div>

              <div className="mb-2">
                <p className="text-[0.55rem] font-bold tracking-[0.16em] text-muted uppercase">
                  {language === "ko" ? "카테고리" : "Category hints"}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {e.rockautoCategoryHints.map((c) => (
                    <span
                      key={c}
                      className="rounded-md border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[0.62rem] font-semibold text-accent"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-2">
                <p className="text-[0.55rem] font-bold tracking-[0.16em] text-muted uppercase">
                  {language === "ko" ? "서브카테고리" : "Subcategory hints"}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {e.rockautoSubcategoryHints.map((c) => (
                    <span
                      key={c}
                      className="rounded-md border border-border/55 bg-background/60 px-1.5 py-0.5 text-[0.62rem] text-foreground/85"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[0.55rem] font-bold tracking-[0.16em] text-muted uppercase">
                  {language === "ko" ? "검색어 (탭하면 검색됨)" : "Search terms (tap to search)"}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {e.searchTerms.map((term) => (
                    <button
                      key={term}
                      type="button"
                      className="rounded-full border border-border/45 bg-panel px-2 py-0.5 text-[0.62rem] font-semibold text-foreground/85 transition hover:border-accent/40 hover:bg-accent/10"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {e.notes ? (
                <p className="mt-2 text-[0.62rem] leading-5 text-muted italic">
                  {e.notes}
                </p>
              ) : null}
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

function Pill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
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
      {label}
    </button>
  );
}
