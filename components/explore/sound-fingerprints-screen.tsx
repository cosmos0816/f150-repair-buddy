"use client";

import { useState } from "react";

import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RecommendationBadge } from "@/components/explore/recommendation-badge";
import { withLang } from "@/components/explore/explore-copy";
import {
  ENGINE_SOUNDS,
  type EngineSoundDefinition,
  type EngineSoundId,
} from "@/lib/knowledge/vehicles/engine-sounds";
import type { SessionLanguage } from "@/lib/types/session";

type Props = { language: SessionLanguage };

export function SoundFingerprintsScreen({ language }: Props) {
  const [open, setOpen] = useState<EngineSoundId | null>(null);
  const all = Object.values(ENGINE_SOUNDS);

  return (
    <MobileAppShell activeRoute="explore">
      <ScreenFrame
        eyebrow={language === "ko" ? "09 · 사운드 핑거프린트" : "09 · Sound Fingerprints"}
        title={language === "ko" ? "리슨 모드" : "Listen Mode"}
        description={
          language === "ko"
            ? "AI가 5초 오디오로 분류할 수 있는 22개 사운드. 카드를 탭해 융합 동작을 확인하세요."
            : "22 sounds the AI classifies from a 5-second audio window. Tap a card to see fusion behavior."
        }
      >
        <div className="grid gap-2">
          {all.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setOpen(s.id)}
              className="text-left"
            >
              <Card className="transition hover:border-accent/40">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.55rem] font-bold tracking-[0.18em] text-muted uppercase">
                      {s.id}
                    </p>
                    <p className="mt-1 text-[0.78rem] leading-5 font-semibold text-foreground">
                      {s.signature[language]}
                    </p>
                  </div>
                  <RecommendationBadge bias={s.recommendationBias} language={language} />
                </div>

                <div className="flex flex-wrap gap-1">
                  {s.likelyCauses.slice(0, 3).map((c) => (
                    <span
                      key={c}
                      className="rounded-md border border-border/45 bg-background/60 px-1.5 py-0.5 text-[0.6rem] text-foreground/75"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {(s.fusion.askForVisual || s.fusion.hardEscalate) && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {s.fusion.askForVisual ? (
                      <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[0.55rem] font-bold tracking-[0.14em] text-accent uppercase">
                        {language === "ko" ? "영상 요청" : "Asks visual"}
                      </span>
                    ) : null}
                    {s.fusion.hardEscalate ? (
                      <span className="rounded-full border border-danger/40 bg-danger/10 px-2 py-0.5 text-[0.55rem] font-bold tracking-[0.14em] text-danger uppercase">
                        {language === "ko" ? "강제 정비소" : "Hard escalate"}
                      </span>
                    ) : null}
                  </div>
                )}
              </Card>
            </button>
          ))}
        </div>

        <div className="mt-4">
          <Button fullWidth href={withLang("/explore", language)} variant="ghost">
            {language === "ko" ? "탐색 목록으로" : "Back to explore"}
          </Button>
        </div>
      </ScreenFrame>

      {open ? (
        <SoundDetailDrawer
          sound={ENGINE_SOUNDS[open]}
          language={language}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </MobileAppShell>
  );
}

function SoundDetailDrawer({
  sound,
  language,
  onClose,
}: {
  sound: EngineSoundDefinition;
  language: SessionLanguage;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        aria-label="Close"
      />
      <div className="relative z-10 mx-3 mb-3 w-full max-w-[420px] rounded-[1.5rem] border border-border/50 bg-panel-strong p-4 shadow-2xl">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <p className="text-[0.55rem] font-bold tracking-[0.18em] text-muted uppercase">
              {sound.id}
            </p>
            <p className="mt-1 font-[family:var(--font-display)] text-xl leading-tight font-semibold text-foreground">
              {sound.signature[language]}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background/60 text-muted transition hover:bg-background hover:text-foreground"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 text-[0.72rem] leading-5">
          <div>
            <p className="text-[0.55rem] font-bold tracking-[0.14em] text-muted uppercase">
              {language === "ko" ? "다른 언어" : "Alternate"}
            </p>
            <p className="mt-0.5 text-foreground/85">
              {language === "ko" ? sound.signature.en : sound.signature.ko}
            </p>
          </div>

          <div>
            <p className="text-[0.55rem] font-bold tracking-[0.14em] text-muted uppercase">
              {language === "ko" ? "가능한 원인" : "Likely causes"}
            </p>
            <ul className="mt-1 space-y-0.5">
              {sound.likelyCauses.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="text-accent">·</span>
                  <span className="text-foreground/85">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {sound.candidatePartAliases.length > 0 ? (
            <div>
              <p className="text-[0.55rem] font-bold tracking-[0.14em] text-muted uppercase">
                {language === "ko" ? "후보 부품" : "Candidate parts"}
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {sound.candidatePartAliases.map((a) => (
                  <span
                    key={a}
                    className="rounded-md border border-border/45 bg-background/60 px-2 py-0.5 text-[0.62rem] text-foreground/85"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <p className="text-[0.55rem] font-bold tracking-[0.14em] text-muted uppercase">
              {language === "ko" ? "트리아지 편향" : "Triage bias"}
            </p>
            <div className="mt-1">
              <RecommendationBadge
                bias={sound.recommendationBias}
                language={language}
                size="md"
              />
            </div>
          </div>

          <div className="rounded-[0.9rem] border border-border/40 bg-background/50 p-3">
            <p className="text-[0.55rem] font-bold tracking-[0.14em] text-muted uppercase">
              {language === "ko" ? "융합 동작" : "Fusion behavior"}
            </p>
            <div className="mt-2 space-y-1.5">
              <FusionRow
                label={language === "ko" ? "영상 요청 (askForVisual)" : "Ask for visual"}
                value={sound.fusion.askForVisual}
                language={language}
                desc={
                  language === "ko"
                    ? "AI가 다음 캡처를 요청합니다."
                    : "AI prompts the user for a follow-up capture."
                }
              />
              <FusionRow
                label={language === "ko" ? "강제 정비소 (hardEscalate)" : "Hard escalate"}
                value={sound.fusion.hardEscalate}
                language={language}
                desc={
                  language === "ko"
                    ? "다른 증거와 무관하게 정비소 권장."
                    : "Forces shop_required regardless of other evidence."
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FusionRow({
  label,
  value,
  language,
  desc,
}: {
  label: string;
  value: boolean;
  language: SessionLanguage;
  desc: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-[0.7rem] font-semibold text-foreground/90">{label}</p>
        <p className="text-[0.62rem] leading-4 text-muted">{desc}</p>
      </div>
      <span
        className={[
          "shrink-0 rounded-full border px-2 py-0.5 text-[0.55rem] font-bold tracking-[0.14em] uppercase",
          value
            ? "border-success/40 bg-success/15 text-success"
            : "border-border/55 bg-background/60 text-muted",
        ].join(" ")}
      >
        {value ? (language === "ko" ? "켜짐" : "On") : language === "ko" ? "꺼짐" : "Off"}
      </span>
    </div>
  );
}
