import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { withLang } from "@/components/explore/explore-copy";
import { getEngineSpec } from "@/lib/knowledge/vehicles/engines";
import { TRANS_6R80, TRANS_4R75E } from "@/lib/knowledge/vehicles/transmissions";
import type { EngineId } from "@/lib/knowledge/vehicles/types";
import type { SessionLanguage } from "@/lib/types/session";

type Item = {
  key: string;
  labelEn: string;
  labelKo: string;
  normalMi: number;
  severeMi: number;
  detailEn: string;
  detailKo: string;
};

type Props = {
  engineId: EngineId;
  language: SessionLanguage;
};

export function ServiceIntervalsScreen({ engineId, language }: Props) {
  const engine = getEngineSpec(engineId);
  const trans = engine.id === "4_6l_2v" ? TRANS_4R75E : TRANS_6R80;

  const items: Item[] = [
    {
      key: "oil",
      labelEn: "Engine Oil",
      labelKo: "엔진 오일",
      normalMi: engine.id === "3_5l_ecoboost" ? 7500 : 7500,
      severeMi: 5000,
      detailEn: `${engine.oilCapacityQt} qt ${engine.oilViscosity}, ${engine.oilFilterMotorcraft} filter`,
      detailKo: `${engine.oilCapacityQt} 쿼트 ${engine.oilViscosity}, ${engine.oilFilterMotorcraft} 필터`,
    },
    {
      key: "plugs",
      labelEn: "Spark Plugs",
      labelKo: "스파크 플러그",
      normalMi: engine.sparkPlugIntervalMi,
      severeMi: engine.sparkPlugIntervalMi / 2,
      detailEn: `${engine.sparkPlugMotorcraft} × ${engine.sparkPlugCount}, gap ${engine.sparkPlugGapIn}", torque ${
        engine.sparkPlugTorqueLbIn
          ? `${engine.sparkPlugTorqueLbIn} lb-IN`
          : `${engine.sparkPlugTorqueLbFt} lb-ft`
      }`,
      detailKo: `${engine.sparkPlugMotorcraft} × ${engine.sparkPlugCount}, 갭 ${engine.sparkPlugGapIn}", 토크 ${
        engine.sparkPlugTorqueLbIn
          ? `${engine.sparkPlugTorqueLbIn} lb-IN`
          : `${engine.sparkPlugTorqueLbFt} lb-ft`
      }`,
    },
    {
      key: "coolant",
      labelEn: "Coolant",
      labelKo: "냉각수",
      normalMi: 100000,
      severeMi: 50000,
      detailEn: `${engine.coolantCapacityQt} qt ${
        engine.coolantSpec === "motorcraft_orange_vc3" ? "VC-3 Orange" : "VC-7 Gold"
      }`,
      detailKo: `${engine.coolantCapacityQt} 쿼트 ${
        engine.coolantSpec === "motorcraft_orange_vc3" ? "VC-3 오렌지" : "VC-7 골드"
      }`,
    },
    {
      key: "trans",
      labelEn: "Transmission Fluid",
      labelKo: "변속기 오일",
      normalMi: trans.serviceIntervalNormalMi,
      severeMi: trans.serviceIntervalSevereMi,
      detailEn: `${trans.fluidPanDropQt} qt pan drop · ${trans.fluidSpec === "mercon_lv" ? "Mercon LV" : "Mercon V"}`,
      detailKo: `팬 드롭 ${trans.fluidPanDropQt} 쿼트 · ${trans.fluidSpec === "mercon_lv" ? "Mercon LV" : "Mercon V"}`,
    },
    {
      key: "diff",
      labelEn: "Differential Fluid",
      labelKo: "디퍼렌셜 오일",
      normalMi: 100000,
      severeMi: 50000,
      detailEn: "75W-140 synthetic, friction modifier for LSD/locker",
      detailKo: "75W-140 합성, LSD/락커용 마찰 조정제",
    },
  ];

  const maxMi = Math.max(...items.map((i) => i.normalMi));

  return (
    <MobileAppShell activeRoute="explore">
      <ScreenFrame
        eyebrow={language === "ko" ? "07 · 정비 주기" : "07 · Service Intervals"}
        title={engine.displayName}
        description={
          language === "ko"
            ? "일반(파란색) vs 가혹조건(주황색) 주기를 평행 레일로 표시."
            : "Normal (blue) vs severe-duty (amber) intervals as parallel rails."
        }
      >
        {engine.id === "6_2l_boss" ? (
          <Card className="mb-3 border-warning/50 bg-warning/10">
            <p className="text-[0.6rem] font-bold tracking-[0.16em] text-warning uppercase">
              {language === "ko" ? "6.2L 중요" : "6.2L Critical"}
            </p>
            <p className="mt-1 text-sm leading-5 font-semibold text-foreground">
              {language === "ko"
                ? "플러그 토크: 133 lb-IN — lb-ft 아님"
                : "Plug torque: 133 lb-IN, NOT lb-ft"}
            </p>
            <p className="mt-1 text-xs leading-5 text-foreground/80">
              {language === "ko"
                ? "133 lb-IN ≈ 11 lb-ft ≈ 15 Nm. lb-ft 단위로 조이면 알루미늄 헤드가 망가집니다. 16개 플러그 모두 토크 렌치로 시공."
                : "133 lb-IN ≈ 11 lb-ft ≈ 15 Nm. Torquing in lb-ft will strip the aluminum head. Use a torque wrench on all 16 plugs."}
            </p>
          </Card>
        ) : null}

        <Card className="mb-3">
          <div className="flex gap-2 text-[0.62rem] font-semibold tracking-[0.1em] uppercase">
            <Legend color="bg-accent" label={language === "ko" ? "일반" : "Normal"} />
            <Legend color="bg-warning" label={language === "ko" ? "가혹조건" : "Severe"} />
          </div>
        </Card>

        <div className="grid gap-3">
          {items.map((it) => {
            const normalPct = (it.normalMi / maxMi) * 100;
            const severePct = (it.severeMi / maxMi) * 100;
            return (
              <Card key={it.key}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {language === "ko" ? it.labelKo : it.labelEn}
                    </p>
                    <p className="mt-0.5 text-[0.62rem] tracking-wide text-muted">
                      {language === "ko" ? it.detailKo : it.detailEn}
                    </p>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <Rail
                    label={language === "ko" ? "일반" : "Normal"}
                    pct={normalPct}
                    mi={it.normalMi}
                    color="bg-accent"
                  />
                  <Rail
                    label={language === "ko" ? "가혹" : "Severe"}
                    pct={severePct}
                    mi={it.severeMi}
                    color="bg-warning"
                  />
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-4 grid gap-2">
          <Button fullWidth href={withLang(`/explore/engine-spec/${engineId}`, language)}>
            {language === "ko" ? "엔진 사양" : "Engine spec"}
          </Button>
          <Button fullWidth href={withLang("/explore", language)} variant="ghost">
            {language === "ko" ? "탐색 목록으로" : "Back to explore"}
          </Button>
        </div>
      </ScreenFrame>
    </MobileAppShell>
  );
}

function Rail({
  label,
  pct,
  mi,
  color,
}: {
  label: string;
  pct: number;
  mi: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <p className="w-12 shrink-0 text-[0.55rem] font-bold tracking-[0.14em] text-muted uppercase">
        {label}
      </p>
      <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-background/60">
        <div
          className={["absolute inset-y-0 left-0 rounded-full", color].join(" ")}
          style={{ width: `${Math.max(2, Math.min(100, pct))}%` }}
        />
      </div>
      <p className="w-14 shrink-0 text-right text-[0.62rem] font-semibold text-foreground/85">
        {(mi / 1000).toFixed(0)}k mi
      </p>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={["h-2 w-2 rounded-full", color].join(" ")} />
      <span className="text-foreground/75">{label}</span>
    </div>
  );
}
