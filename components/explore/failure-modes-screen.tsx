"use client";

import { useMemo, useState } from "react";

import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RecommendationBadge } from "@/components/explore/recommendation-badge";
import { withLang } from "@/components/explore/explore-copy";
import { getEngineSpec } from "@/lib/knowledge/vehicles/engines";
import type {
  EngineId,
  FailureMode,
  RecommendationBias,
} from "@/lib/knowledge/vehicles/types";
import type { SessionLanguage } from "@/lib/types/session";

type SortKey = "recommendation" | "mileage" | "difficulty";

type Props = {
  engineId: EngineId;
  language: SessionLanguage;
};

const RECOMMENDATION_RANK: Record<RecommendationBias, number> = {
  shop_required: 0,
  inspect_only: 1,
  diy_safe: 2,
};

const DIFFICULTY_RANK: Record<FailureMode["diyDifficulty"], number> = {
  easy: 0,
  moderate: 1,
  hard: 2,
  shop: 3,
};

export function FailureModesScreen({ engineId, language }: Props) {
  const engine = getEngineSpec(engineId);
  const [sort, setSort] = useState<SortKey>("recommendation");

  const sorted = useMemo(() => {
    const list = [...engine.topFailureModes];
    list.sort((a, b) => {
      if (sort === "recommendation") {
        return (
          RECOMMENDATION_RANK[a.recommendation] -
          RECOMMENDATION_RANK[b.recommendation]
        );
      }
      if (sort === "mileage") {
        return (a.mileageOnsetMin ?? Infinity) - (b.mileageOnsetMin ?? Infinity);
      }
      return DIFFICULTY_RANK[a.diyDifficulty] - DIFFICULTY_RANK[b.diyDifficulty];
    });
    return list;
  }, [engine.topFailureModes, sort]);

  const sortLabel: Record<SortKey, Record<SessionLanguage, string>> = {
    recommendation: { en: "Triage", ko: "트리아지" },
    mileage: { en: "Mileage", ko: "주행거리" },
    difficulty: { en: "DIY level", ko: "난이도" },
  };

  return (
    <MobileAppShell activeRoute="explore">
      <ScreenFrame
        eyebrow={language === "ko" ? "05 · 주요 고장 모드" : "05 · Failure Modes"}
        title={engine.displayName}
        description={
          language === "ko"
            ? "정렬을 바꿔 트리아지/주행거리/난이도 순으로 확인하세요."
            : "Sort by triage, mileage onset, or DIY difficulty."
        }
      >
        <Card className="mb-3">
          <p className="mb-2 text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
            {language === "ko" ? "정렬" : "Sort by"}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(["recommendation", "mileage", "difficulty"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setSort(k)}
                className={[
                  "rounded-[1rem] border px-2 py-2 text-[0.62rem] font-semibold tracking-[0.08em] uppercase transition",
                  sort === k
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-border/55 bg-panel text-foreground/70 hover:border-foreground/30",
                ].join(" ")}
              >
                {sortLabel[k][language]}
              </button>
            ))}
          </div>
        </Card>

        <div className="grid gap-2">
          {sorted.map((f, i) => (
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

              <div className="mt-3 flex flex-wrap gap-1.5 text-[0.6rem] font-semibold tracking-[0.06em]">
                {f.mileageOnsetMin !== undefined ? (
                  <span className="rounded-md bg-background/60 px-2 py-1 text-foreground/75">
                    {language === "ko" ? "발생 " : "Onset "}
                    {(f.mileageOnsetMin / 1000).toFixed(0)}-
                    {f.mileageOnsetMax
                      ? (f.mileageOnsetMax / 1000).toFixed(0)
                      : "?"}
                    k mi
                  </span>
                ) : (
                  <span className="rounded-md bg-background/60 px-2 py-1 text-foreground/55">
                    {language === "ko" ? "주행거리 무관" : "Any mileage"}
                  </span>
                )}
                {f.estimatedCostUsd ? (
                  <span className="rounded-md bg-background/60 px-2 py-1 text-foreground/75">
                    ${f.estimatedCostUsd.min}-${f.estimatedCostUsd.max}
                  </span>
                ) : null}
                <span className="rounded-md bg-background/60 px-2 py-1 text-foreground/75 uppercase">
                  {f.diyDifficulty}
                </span>
              </div>

              {f.sourceUrls && f.sourceUrls.length > 0 ? (
                <a
                  href={f.sourceUrls[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[0.62rem] font-semibold tracking-[0.14em] text-accent-strong uppercase hover:underline"
                >
                  {language === "ko" ? "출처 보기 →" : "View source →"}
                </a>
              ) : null}
            </Card>
          ))}
        </div>

        <div className="mt-4 grid gap-2">
          <Button fullWidth href={withLang(`/explore/engine-spec/${engineId}`, language)}>
            {language === "ko" ? "엔진 사양으로" : "Engine spec"}
          </Button>
          <Button fullWidth href={withLang("/explore", language)} variant="ghost">
            {language === "ko" ? "탐색 목록으로" : "Back to explore"}
          </Button>
        </div>
      </ScreenFrame>
    </MobileAppShell>
  );
}
