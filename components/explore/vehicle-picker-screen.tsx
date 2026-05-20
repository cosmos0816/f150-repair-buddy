"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { withLang } from "@/components/explore/explore-copy";
import { listTrimsForYear } from "@/lib/knowledge/vehicles/trims";
import { listEnginesForYear, getEngineSpec } from "@/lib/knowledge/vehicles/engines";
import { SVT_RAPTOR } from "@/lib/knowledge/vehicles/raptor";
import type {
  CabStyle,
  BedLength,
  EngineId,
  ModelYear,
  TrimId,
  TrimSpec,
  TrimYearConfig,
} from "@/lib/knowledge/vehicles/types";
import type { SessionLanguage } from "@/lib/types/session";

type Props = { language: SessionLanguage };

const ALL_YEARS: ModelYear[] = [2009, 2010, 2011, 2012, 2013, 2014];

const CAB_LABEL: Record<CabStyle, Record<SessionLanguage, string>> = {
  regular_cab: { en: "Regular Cab", ko: "레귤러 캡" },
  supercab: { en: "SuperCab", ko: "슈퍼캡" },
  supercrew: { en: "SuperCrew", ko: "슈퍼크루" },
};

const BED_LABEL: Record<BedLength, Record<SessionLanguage, string>> = {
  "5.5ft": { en: "5.5 ft", ko: "5.5 ft" },
  "6.5ft": { en: "6.5 ft", ko: "6.5 ft" },
  "8ft": { en: "8 ft", ko: "8 ft" },
};

export function VehiclePickerScreen({ language }: Props) {
  const router = useRouter();
  const search = useSearchParams();

  const year = parseYear(search.get("year"));
  const trim = search.get("trim") as TrimId | null;
  const engineId = search.get("engine") as EngineId | null;
  const cab = search.get("cab") as CabStyle | null;
  const bed = search.get("bed") as BedLength | null;

  const allTrimsForYear = useMemo(() => {
    if (!year) return [];
    const trims: (TrimSpec | typeof SVT_RAPTOR)[] = listTrimsForYear(year);
    if (SVT_RAPTOR.yearsOffered.includes(year)) trims.push(SVT_RAPTOR);
    return trims;
  }, [year]);

  const selectedTrim = useMemo(() => {
    if (!trim || !year) return null;
    if (trim === "svt_raptor") return SVT_RAPTOR;
    return allTrimsForYear.find((t) => t.id === trim) ?? null;
  }, [trim, year, allTrimsForYear]);

  const yearConfig: TrimYearConfig | null = useMemo(() => {
    if (!selectedTrim || !year) return null;
    return selectedTrim.yearConfigs.find((c) => c.year === year) ?? null;
  }, [selectedTrim, year]);

  const enginesAvailable = useMemo(() => {
    if (!yearConfig) return [];
    return yearConfig.enginesOffered;
  }, [yearConfig]);

  const cabsAvailable = useMemo(() => yearConfig?.cabStylesOffered ?? [], [yearConfig]);
  const bedsAvailable = useMemo(() => yearConfig?.bedLengthsOffered ?? [], [yearConfig]);

  function setParam(key: string, value: string | null, resetKeys: string[] = []) {
    const params = new URLSearchParams(Array.from(search.entries()));
    if (value === null) params.delete(key);
    else params.set(key, value);
    for (const rk of resetKeys) params.delete(rk);
    router.push(`?${params.toString()}`);
  }

  const allComplete = Boolean(year && trim && engineId && cab && bed);

  return (
    <MobileAppShell activeRoute="explore">
      <ScreenFrame
        eyebrow={language === "ko" ? "01 · 차량 선택" : "01 · Vehicle Picker"}
        title={language === "ko" ? "구성 선택" : "Pick a Configuration"}
        description={
          language === "ko"
            ? "연식부터 시작해 단계별로 좁혀가세요. 선택은 URL에 저장됩니다."
            : "Start at year, narrow down. Selection persists in the URL."
        }
      >
        <div className="grid gap-3">
          <Step
            index={1}
            label={language === "ko" ? "연식" : "Year"}
            value={year ? String(year) : null}
          >
            <div className="grid grid-cols-3 gap-2">
              {ALL_YEARS.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setParam("year", String(y), ["trim", "engine", "cab", "bed"])}
                  className={chip(year === y)}
                >
                  {y}
                </button>
              ))}
            </div>
          </Step>

          {year ? (
            <Step
              index={2}
              label={language === "ko" ? "트림" : "Trim"}
              value={selectedTrim?.displayName ?? null}
            >
              <div className="grid grid-cols-2 gap-2">
                {allTrimsForYear.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() =>
                      setParam("trim", t.id, ["engine", "cab", "bed"])
                    }
                    className={chip(trim === t.id, "text-left")}
                  >
                    <span className="block truncate">{t.displayName}</span>
                  </button>
                ))}
              </div>
            </Step>
          ) : null}

          {trim && yearConfig ? (
            <Step
              index={3}
              label={language === "ko" ? "엔진" : "Engine"}
              value={engineId ? getEngineSpec(engineId).displayName : null}
            >
              <div className="grid gap-2">
                {enginesAvailable.map((e) => {
                  const spec = getEngineSpec(e);
                  return (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setParam("engine", e, ["cab", "bed"])}
                      className={chip(engineId === e, "text-left")}
                    >
                      <span className="block text-[0.78rem] font-semibold">
                        {spec.displayName}
                      </span>
                      <span className="block text-[0.62rem] tracking-wide text-foreground/60">
                        {spec.horsepowerSae.hp} hp · {spec.torqueLbFt.lbft} lb-ft
                      </span>
                    </button>
                  );
                })}
              </div>
            </Step>
          ) : null}

          {engineId && yearConfig ? (
            <Step
              index={4}
              label={language === "ko" ? "캡 스타일" : "Cab Style"}
              value={cab ? CAB_LABEL[cab][language] : null}
            >
              <div className="grid grid-cols-3 gap-2">
                {cabsAvailable.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setParam("cab", c, ["bed"])}
                    className={chip(cab === c)}
                  >
                    {CAB_LABEL[c][language]}
                  </button>
                ))}
              </div>
            </Step>
          ) : null}

          {cab && yearConfig ? (
            <Step
              index={5}
              label={language === "ko" ? "베드 길이" : "Bed Length"}
              value={bed ? BED_LABEL[bed][language] : null}
            >
              <div className="grid grid-cols-3 gap-2">
                {bedsAvailable.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setParam("bed", b)}
                    className={chip(bed === b)}
                  >
                    {BED_LABEL[b][language]}
                  </button>
                ))}
              </div>
            </Step>
          ) : null}

          {allComplete && year && trim && engineId && cab && bed ? (
            <SelectedCard
              language={language}
              year={year}
              trim={selectedTrim!}
              engineId={engineId}
              cab={cab}
              bed={bed}
            />
          ) : null}

          <div className="mt-3 grid gap-2">
            <Button fullWidth href={withLang("/explore", language)} variant="ghost">
              {language === "ko" ? "탐색 목록으로" : "Back to explore"}
            </Button>
          </div>
        </div>
      </ScreenFrame>
    </MobileAppShell>
  );
}

function chip(active: boolean, extra = "") {
  return [
    "rounded-[1rem] border px-3 py-2.5 text-[0.74rem] font-semibold tracking-[0.06em] transition",
    active
      ? "border-accent bg-accent/15 text-accent"
      : "border-border/55 bg-panel text-foreground/80 hover:border-foreground/25",
    extra,
  ].join(" ");
}

function Step({
  index,
  label,
  value,
  children,
}: {
  index: number;
  label: string;
  value: string | null;
  children: React.ReactNode;
}) {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[0.6rem] font-bold tracking-[0.2em] text-accent-strong uppercase">
          {String(index).padStart(2, "0")} · {label}
        </p>
        {value ? (
          <span className="rounded-full bg-success/15 px-2 py-0.5 text-[0.55rem] font-semibold tracking-[0.14em] text-success uppercase">
            {value}
          </span>
        ) : null}
      </div>
      {children}
    </Card>
  );
}

function SelectedCard({
  language,
  year,
  trim,
  engineId,
  cab,
  bed,
}: {
  language: SessionLanguage;
  year: ModelYear;
  trim: TrimSpec | typeof SVT_RAPTOR;
  engineId: EngineId;
  cab: CabStyle;
  bed: BedLength;
}) {
  const engine = getEngineSpec(engineId);
  const yearConfig = trim.yearConfigs.find((c) => c.year === year);
  const transmissions = yearConfig?.transmissionsOffered ?? [];

  return (
    <Card className="space-y-3 border-accent/60 bg-accent/5">
      <div className="flex items-center justify-between">
        <p className="text-[0.6rem] font-bold tracking-[0.2em] text-accent uppercase">
          {language === "ko" ? "선택된 구성" : "Selected Configuration"}
        </p>
        <span className="rounded-full bg-accent px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.14em] text-background uppercase">
          {language === "ko" ? "완료" : "Complete"}
        </span>
      </div>
      <div>
        <p className="font-[family:var(--font-display)] text-2xl leading-none font-semibold text-foreground">
          {year} {trim.displayName}
        </p>
        <p className="mt-1 text-xs text-muted">{engine.displayName}</p>
      </div>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-[0.72rem]">
        <Row label={language === "ko" ? "캡" : "Cab"} value={CAB_LABEL[cab][language]} />
        <Row label={language === "ko" ? "베드" : "Bed"} value={BED_LABEL[bed][language]} />
        <Row
          label={language === "ko" ? "출력" : "Power"}
          value={`${engine.horsepowerSae.hp} hp`}
        />
        <Row
          label={language === "ko" ? "토크" : "Torque"}
          value={`${engine.torqueLbFt.lbft} lb-ft`}
        />
        <Row
          label={language === "ko" ? "변속기" : "Trans"}
          value={transmissions.join(", ").toUpperCase()}
        />
        <Row
          label={language === "ko" ? "오일" : "Oil"}
          value={`${engine.oilCapacityQt}qt ${engine.oilViscosity}`}
        />
      </dl>
      <div className="grid gap-2 pt-2">
        <Link
          href={withLang(`/explore/engine-spec/${engineId}`, language)}
          className="rounded-[1.2rem] border border-accent/50 bg-accent/10 px-3 py-2.5 text-center text-[0.72rem] font-semibold tracking-[0.1em] text-accent uppercase transition hover:bg-accent/20"
        >
          {language === "ko" ? "엔진 사양 보기" : "View engine spec"}
        </Link>
        <Link
          href={withLang(`/explore/failure-modes/${engineId}`, language)}
          className="rounded-[1.2rem] border border-border/55 bg-panel px-3 py-2.5 text-center text-[0.72rem] font-semibold tracking-[0.1em] text-foreground/85 uppercase transition hover:border-foreground/30"
        >
          {language === "ko" ? "주요 고장 모드" : "Failure modes"}
        </Link>
        <Link
          href={withLang(`/explore/service-intervals/${engineId}`, language)}
          className="rounded-[1.2rem] border border-border/55 bg-panel px-3 py-2.5 text-center text-[0.72rem] font-semibold tracking-[0.1em] text-foreground/85 uppercase transition hover:border-foreground/30"
        >
          {language === "ko" ? "정비 주기" : "Service intervals"}
        </Link>
        <Link
          href={withLang(
            `/explore/parts-finder?engine=${engineId}&trim=${trim.id}`,
            language,
          )}
          className="rounded-[1.2rem] border border-border/55 bg-panel px-3 py-2.5 text-center text-[0.72rem] font-semibold tracking-[0.1em] text-foreground/85 uppercase transition hover:border-foreground/30"
        >
          {language === "ko" ? "부품 검색" : "Parts finder"}
        </Link>
      </div>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-[0.55rem] font-semibold tracking-[0.16em] text-muted uppercase">
        {label}
      </dt>
      <dd className="text-foreground/90">{value}</dd>
    </div>
  );
}

function parseYear(v: string | null): ModelYear | null {
  if (!v) return null;
  const n = Number.parseInt(v, 10);
  if (Number.isNaN(n)) return null;
  if (n < 2009 || n > 2014) return null;
  return n as ModelYear;
}
