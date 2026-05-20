import Link from "next/link";

import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RecommendationBadge } from "@/components/explore/recommendation-badge";
import { withLang } from "@/components/explore/explore-copy";
import { getEngineSpec, ALL_ENGINES } from "@/lib/knowledge/vehicles/engines";
import type { EngineId, EngineSpec } from "@/lib/knowledge/vehicles/types";
import type { SessionLanguage } from "@/lib/types/session";

type Props = {
  engineId: EngineId;
  language: SessionLanguage;
};

export function EngineSpecScreen({ engineId, language }: Props) {
  const engine: EngineSpec = getEngineSpec(engineId);

  const otherEngines = (Object.keys(ALL_ENGINES) as EngineId[]).filter((id) => id !== engineId);

  return (
    <MobileAppShell activeRoute="explore">
      <ScreenFrame
        eyebrow={language === "ko" ? "02 · 엔진 사양" : "02 · Engine Spec"}
        title={engine.displayName}
        description={engine.configuration}
      >
        <div className="grid gap-3">
          <Card>
            <p className="text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
              {language === "ko" ? "출력" : "Performance"}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Stat
                label={language === "ko" ? "마력" : "Horsepower"}
                value={`${engine.horsepowerSae.hp} hp`}
                sub={`@ ${engine.horsepowerSae.atRpm} rpm`}
              />
              <Stat
                label={language === "ko" ? "토크" : "Torque"}
                value={`${engine.torqueLbFt.lbft} lb-ft`}
                sub={`@ ${engine.torqueLbFt.atRpm} rpm`}
              />
              <Stat
                label={language === "ko" ? "배기량" : "Displacement"}
                value={`${(engine.displacementCc / 1000).toFixed(1)} L`}
                sub={`${engine.cylinders} cyl`}
              />
              <Stat
                label={language === "ko" ? "연료" : "Fuel"}
                value={engine.fuelGrade.includes("91") ? "91 oct" : "87 oct"}
                sub={engine.fuelSystem.toUpperCase()}
              />
            </div>
          </Card>

          <Card>
            <p className="text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
              {language === "ko" ? "오일 · 냉각수" : "Oil & Coolant"}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Stat
                label={language === "ko" ? "오일 용량" : "Oil capacity"}
                value={`${engine.oilCapacityQt} qt`}
                sub={engine.oilViscosity}
              />
              <Stat
                label={language === "ko" ? "오일 필터" : "Oil filter"}
                value={engine.oilFilterMotorcraft}
                sub="Motorcraft"
              />
              <Stat
                label={language === "ko" ? "Ford 규격" : "Ford spec"}
                value={engine.oilFordSpec}
                sub="WSS"
              />
              <Stat
                label={language === "ko" ? "냉각수" : "Coolant"}
                value={engine.coolantSpec === "motorcraft_orange_vc3" ? "VC-3 Orange" : "VC-7 Gold"}
                sub={`${engine.coolantCapacityQt} qt`}
              />
            </div>
          </Card>

          <Card>
            <p className="text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
              {language === "ko" ? "점화" : "Ignition"}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Stat
                label={language === "ko" ? "플러그" : "Plug"}
                value={engine.sparkPlugMotorcraft}
                sub={`${engine.sparkPlugCount} plugs`}
              />
              <Stat
                label={language === "ko" ? "갭" : "Gap"}
                value={`${engine.sparkPlugGapIn}"`}
                sub={`${engine.sparkPlugIntervalMi / 1000}k mi`}
              />
              <Stat
                label={language === "ko" ? "토크" : "Torque"}
                value={
                  engine.sparkPlugTorqueLbIn
                    ? `${engine.sparkPlugTorqueLbIn} lb-IN`
                    : `${engine.sparkPlugTorqueLbFt} lb-ft`
                }
                sub={engine.sparkPlugTorqueLbIn ? "INCH-pounds" : "FOOT-pounds"}
                emphasis={Boolean(engine.sparkPlugTorqueLbIn)}
              />
              <Stat
                label={language === "ko" ? "타이밍" : "Timing"}
                value={engine.timingDrive.toUpperCase()}
                sub={engine.valvetrain}
              />
            </div>
            {engine.id === "6_2l_boss" || engine.id === "3_5l_ecoboost" || engine.id === "5_0l_coyote" || engine.id === "3_7l_tivct" ? (
              <div className="mt-3 rounded-[1rem] border border-warning/40 bg-warning/10 p-3">
                <p className="text-[0.6rem] font-bold tracking-[0.16em] text-warning uppercase">
                  {language === "ko" ? "경고 · INCH-POUND" : "Warning · INCH-POUND"}
                </p>
                <p className="mt-1 text-xs leading-5 text-foreground/85">
                  {language === "ko"
                    ? `플러그 토크는 ${engine.sparkPlugTorqueLbIn} lb-IN(인치-파운드)입니다. lb-ft가 아닙니다. 잘못된 값을 사용하면 알루미늄 헤드가 망가집니다.`
                    : `Spark plug torque is ${engine.sparkPlugTorqueLbIn} lb-IN (inch-pounds), NOT lb-ft. Using the wrong unit will strip the aluminum head.`}
                </p>
              </div>
            ) : null}
          </Card>

          <Card>
            <p className="text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
              {language === "ko" ? "주요 DTC" : "Common DTCs"}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {engine.commonDtcs.map((d) => (
                <span
                  key={d}
                  className="rounded-md border border-border/55 bg-background/60 px-2 py-1 text-[0.62rem] font-semibold tracking-[0.06em] text-foreground/85"
                >
                  {d}
                </span>
              ))}
            </div>
          </Card>

          <div>
            <p className="mb-2 text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
              {language === "ko" ? "주요 고장 모드" : "Top Failure Modes"}
            </p>
            <div className="grid gap-2">
              {engine.topFailureModes.map((f, i) => (
                <Card key={i}>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <p className="flex-1 text-sm leading-5 font-semibold text-foreground">
                      {f.symptom}
                    </p>
                    <RecommendationBadge bias={f.recommendation} language={language} />
                  </div>
                  <p className="text-[0.72rem] leading-5 text-muted">
                    <span className="font-semibold text-foreground/80">
                      {language === "ko" ? "원인: " : "Cause: "}
                    </span>
                    {f.rootCause}
                  </p>
                  {f.mileageOnsetMin !== undefined || f.estimatedCostUsd ? (
                    <div className="mt-2 flex flex-wrap gap-2 text-[0.62rem] font-semibold tracking-[0.06em]">
                      {f.mileageOnsetMin !== undefined ? (
                        <span className="rounded-md bg-background/60 px-2 py-0.5 text-foreground/70">
                          {(f.mileageOnsetMin / 1000).toFixed(0)}-
                          {f.mileageOnsetMax ? (f.mileageOnsetMax / 1000).toFixed(0) : "?"}k mi
                        </span>
                      ) : null}
                      {f.estimatedCostUsd ? (
                        <span className="rounded-md bg-background/60 px-2 py-0.5 text-foreground/70">
                          ${f.estimatedCostUsd.min}-${f.estimatedCostUsd.max}
                        </span>
                      ) : null}
                      <span className="rounded-md bg-background/60 px-2 py-0.5 text-foreground/70">
                        {f.diyDifficulty.toUpperCase()}
                      </span>
                    </div>
                  ) : null}
                </Card>
              ))}
            </div>
          </div>

          {engine.notes && engine.notes.length > 0 ? (
            <Card>
              <p className="text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
                {language === "ko" ? "참고" : "Notes"}
              </p>
              <ul className="mt-2 space-y-1.5 text-xs leading-5 text-foreground/80">
                {engine.notes.map((n, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent">·</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}

          <Card>
            <p className="mb-2 text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
              {language === "ko" ? "다른 엔진" : "Other engines"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {otherEngines.map((id) => (
                <Link
                  key={id}
                  href={withLang(`/explore/engine-spec/${id}`, language)}
                  className="rounded-[1rem] border border-border/55 bg-panel px-2.5 py-2 text-left text-[0.66rem] font-semibold tracking-[0.06em] text-foreground/80 transition hover:border-accent/40"
                >
                  {ALL_ENGINES[id].displayName}
                </Link>
              ))}
            </div>
          </Card>

          <div className="mt-2 grid gap-2">
            <Button fullWidth href={withLang(`/explore/failure-modes/${engineId}`, language)}>
              {language === "ko" ? "고장 모드 더보기" : "Failure modes detail"}
            </Button>
            <Button fullWidth href={withLang("/explore", language)} variant="ghost">
              {language === "ko" ? "탐색 목록으로" : "Back to explore"}
            </Button>
          </div>
        </div>
      </ScreenFrame>
    </MobileAppShell>
  );
}

function Stat({
  label,
  value,
  sub,
  emphasis = false,
}: {
  label: string;
  value: string;
  sub?: string;
  emphasis?: boolean;
}) {
  return (
    <div className="rounded-[1rem] border border-border/40 bg-background/40 p-2.5">
      <p className="text-[0.55rem] font-semibold tracking-[0.18em] text-muted uppercase">
        {label}
      </p>
      <p
        className={[
          "mt-1 font-[family:var(--font-display)] text-lg leading-tight font-semibold",
          emphasis ? "text-warning" : "text-foreground",
        ].join(" ")}
      >
        {value}
      </p>
      {sub ? (
        <p className="text-[0.6rem] tracking-wide text-foreground/55">{sub}</p>
      ) : null}
    </div>
  );
}
