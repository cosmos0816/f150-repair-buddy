import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { withLang } from "@/components/explore/explore-copy";
import { ALL_ENGINES } from "@/lib/knowledge/vehicles/engines";
import { ALL_NONRAPTOR_TRIMS } from "@/lib/knowledge/vehicles/trims";
import { SVT_RAPTOR } from "@/lib/knowledge/vehicles/raptor";
import type { ModelYear, EngineId } from "@/lib/knowledge/vehicles/types";
import type { SessionLanguage } from "@/lib/types/session";

type Props = { language: SessionLanguage };

const YEARS: ModelYear[] = [2009, 2010, 2011, 2012, 2013, 2014];

type YearChanges = {
  enginesIntroduced: EngineId[];
  enginesDropped: EngineId[];
  trimsIntroduced: string[];
  trimsDropped: string[];
  raptorNote: { en: string; ko: string } | null;
};

const RAPTOR_NOTES: Record<ModelYear, { en: string; ko: string } | null> = {
  2009: null,
  2010: {
    en: "Raptor debut. 5.4L 3V at launch; 6.2L Boss added mid-year.",
    ko: "랩터 데뷔. 출시 시 5.4L 3V, 연중 6.2L 추가.",
  },
  2011: {
    en: "Raptor SuperCrew added. 6.2L only.",
    ko: "랩터 슈퍼크루 추가. 6.2L 단일.",
  },
  2012: {
    en: "Raptor front diff: open → Torsen T2R.",
    ko: "랩터 프론트 디프: 오픈 → Torsen T2R.",
  },
  2013: {
    en: "Raptor HID headlamps + forged beadlock wheel option.",
    ko: "랩터 HID 헤드램프 + 단조 비드락 휠 옵션.",
  },
  2014: {
    en: "Raptor Special Edition: bedside graphics, two-tone interior, unique beadlock wheels.",
    ko: "랩터 스페셜 에디션: 베드 그래픽, 투톤 인테리어, 전용 비드락 휠.",
  },
};

function computeYearChanges(): Record<ModelYear, YearChanges> {
  const result = {} as Record<ModelYear, YearChanges>;
  for (const y of YEARS) {
    const prev = (y - 1) as ModelYear;
    const engineIds = Object.keys(ALL_ENGINES) as EngineId[];

    const introduced = engineIds.filter(
      (e) =>
        ALL_ENGINES[e].yearsOffered.includes(y) &&
        !ALL_ENGINES[e].yearsOffered.includes(prev),
    );
    const dropped = engineIds.filter(
      (e) =>
        !ALL_ENGINES[e].yearsOffered.includes(y) &&
        ALL_ENGINES[e].yearsOffered.includes(prev),
    );

    const trimIds = Object.keys(ALL_NONRAPTOR_TRIMS);
    const trimsIntro = trimIds.filter(
      (t) =>
        ALL_NONRAPTOR_TRIMS[t].yearsOffered.includes(y) &&
        !ALL_NONRAPTOR_TRIMS[t].yearsOffered.includes(prev),
    );
    const trimsDrop = trimIds.filter(
      (t) =>
        !ALL_NONRAPTOR_TRIMS[t].yearsOffered.includes(y) &&
        ALL_NONRAPTOR_TRIMS[t].yearsOffered.includes(prev),
    );

    // Add raptor "introduced" for year 2010
    if (y === 2010 && SVT_RAPTOR.yearsOffered.includes(2010)) {
      trimsIntro.push("svt_raptor");
    }

    result[y] = {
      enginesIntroduced: introduced,
      enginesDropped: dropped,
      trimsIntroduced: trimsIntro,
      trimsDropped: trimsDrop,
      raptorNote: RAPTOR_NOTES[y],
    };
  }
  return result;
}

function shortEngineName(id: EngineId): string {
  return ALL_ENGINES[id].displayName.replace(/^([\d.]+L\s+\S+).*/, "$1");
}

function trimDisplayName(id: string): string {
  if (id === "svt_raptor") return "SVT Raptor";
  return ALL_NONRAPTOR_TRIMS[id]?.displayName.split(" (")[0] ?? id;
}

export function YearTimelineScreen({ language }: Props) {
  const data = computeYearChanges();

  return (
    <MobileAppShell activeRoute="explore">
      <ScreenFrame
        eyebrow={language === "ko" ? "10 · 연식 타임라인" : "10 · Year Timeline"}
        title={language === "ko" ? "2009 → 2014" : "2009 → 2014"}
        description={
          language === "ko"
            ? "엔진, 트림, 랩터의 연식별 변화. 좌측 연식 축 고정."
            : "Engine, trim, and Raptor changes year over year. Year axis sticky-left."
        }
      >
        <div className="grid gap-3">
          {YEARS.map((y) => {
            const c = data[y];
            return (
              <Card key={y}>
                <div className="flex gap-3">
                  <div className="sticky left-0 flex w-14 shrink-0 flex-col items-center justify-start rounded-[1rem] border border-accent/40 bg-accent/10 px-1 py-2">
                    <p className="font-[family:var(--font-display)] text-xl leading-tight font-bold text-accent">
                      {y}
                    </p>
                    <p className="mt-0.5 text-[0.5rem] font-bold tracking-[0.16em] text-accent/70 uppercase">
                      MY
                    </p>
                  </div>
                  <div className="min-w-0 flex-1 space-y-2.5">
                    <RowBlock
                      titleEn="Engines"
                      titleKo="엔진"
                      language={language}
                      tone="accent"
                    >
                      {c.enginesIntroduced.length === 0 && c.enginesDropped.length === 0 ? (
                        <p className="text-[0.62rem] tracking-wide text-foreground/55">
                          {language === "ko" ? "변경 없음" : "no change"}
                        </p>
                      ) : (
                        <div className="space-y-1">
                          {c.enginesIntroduced.length > 0 ? (
                            <ChangeLine
                              sign="+"
                              language={language}
                              labelEn="added"
                              labelKo="추가"
                              items={c.enginesIntroduced.map(shortEngineName)}
                              tone="success"
                            />
                          ) : null}
                          {c.enginesDropped.length > 0 ? (
                            <ChangeLine
                              sign="–"
                              language={language}
                              labelEn="dropped"
                              labelKo="단종"
                              items={c.enginesDropped.map(shortEngineName)}
                              tone="danger"
                            />
                          ) : null}
                        </div>
                      )}
                    </RowBlock>

                    <RowBlock
                      titleEn="Trims"
                      titleKo="트림"
                      language={language}
                      tone="accent"
                    >
                      {c.trimsIntroduced.length === 0 && c.trimsDropped.length === 0 ? (
                        <p className="text-[0.62rem] tracking-wide text-foreground/55">
                          {language === "ko" ? "변경 없음" : "no change"}
                        </p>
                      ) : (
                        <div className="space-y-1">
                          {c.trimsIntroduced.length > 0 ? (
                            <ChangeLine
                              sign="+"
                              language={language}
                              labelEn="added"
                              labelKo="추가"
                              items={c.trimsIntroduced.map(trimDisplayName)}
                              tone="success"
                            />
                          ) : null}
                          {c.trimsDropped.length > 0 ? (
                            <ChangeLine
                              sign="–"
                              language={language}
                              labelEn="dropped"
                              labelKo="단종"
                              items={c.trimsDropped.map(trimDisplayName)}
                              tone="danger"
                            />
                          ) : null}
                        </div>
                      )}
                    </RowBlock>

                    <RowBlock
                      titleEn="Raptor"
                      titleKo="랩터"
                      language={language}
                      tone="warning"
                    >
                      {c.raptorNote ? (
                        <p className="text-[0.7rem] leading-5 text-foreground/85">
                          {c.raptorNote[language]}
                        </p>
                      ) : (
                        <p className="text-[0.62rem] tracking-wide text-foreground/55">
                          {language === "ko" ? "해당 없음" : "n/a"}
                        </p>
                      )}
                    </RowBlock>
                  </div>
                </div>
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

function RowBlock({
  titleEn,
  titleKo,
  language,
  children,
  tone,
}: {
  titleEn: string;
  titleKo: string;
  language: SessionLanguage;
  children: React.ReactNode;
  tone: "accent" | "warning";
}) {
  const titleClass =
    tone === "warning" ? "text-warning" : "text-accent-strong";
  return (
    <div>
      <p
        className={[
          "text-[0.55rem] font-bold tracking-[0.18em] uppercase",
          titleClass,
        ].join(" ")}
      >
        {language === "ko" ? titleKo : titleEn}
      </p>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

function ChangeLine({
  sign,
  language,
  labelEn,
  labelKo,
  items,
  tone,
}: {
  sign: "+" | "–";
  language: SessionLanguage;
  labelEn: string;
  labelKo: string;
  items: string[];
  tone: "success" | "danger";
}) {
  const color = tone === "success" ? "text-success" : "text-danger";
  return (
    <p className="text-[0.7rem] leading-5">
      <span className={["font-bold", color].join(" ")}>{sign} </span>
      <span className="text-foreground/85">{items.join(", ")}</span>
      <span className="ml-1 text-[0.6rem] tracking-wide text-muted">
        ({language === "ko" ? labelKo : labelEn})
      </span>
    </p>
  );
}
