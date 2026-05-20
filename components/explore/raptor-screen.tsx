import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RecommendationBadge } from "@/components/explore/recommendation-badge";
import { withLang } from "@/components/explore/explore-copy";
import { SVT_RAPTOR } from "@/lib/knowledge/vehicles/raptor";
import type { ModelYear } from "@/lib/knowledge/vehicles/types";
import type { SessionLanguage } from "@/lib/types/session";

type Props = { language: SessionLanguage };

const YEAR_DELTA: Record<ModelYear, Record<SessionLanguage, string>> = {
  2009: { en: "—", ko: "—" },
  2010: {
    en: "Launch year. 5.4L 3V at debut; 6.2L added mid-year. SuperCab only. Open front diff.",
    ko: "출시 원년. 데뷔 시 5.4L 3V, 연중 6.2L 추가. 슈퍼캡만. 프론트 오픈 디프.",
  },
  2011: {
    en: "6.2L only. SuperCrew body added. 17in cast aluminum, BFG K/O 315/70R17.",
    ko: "6.2L 단일. 슈퍼크루 추가. 17인치 캐스트, BFG K/O 315/70R17.",
  },
  2012: {
    en: "Torsen T2R front diff replaces open. HID-ready wiring stub appears mid-year.",
    ko: "프론트 디프가 오픈에서 Torsen T2R로 교체. 연중 HID 배선 준비.",
  },
  2013: {
    en: "HID headlamps standard. Forged beadlock-capable wheel option introduced.",
    ko: "HID 헤드램프 기본. 단조 비드락 호환 휠 옵션 출시.",
  },
  2014: {
    en: "Special Edition: bedside graphics, two-tone Brick Red/Black bolsters, unique beadlock wheels (Tuxedo Black or Ruby Red Metallic).",
    ko: "스페셜 에디션: 베드 그래픽, 브릭레드/블랙 투톤 볼스터, 전용 비드락 휠 (턱시도 블랙/루비 레드 메탈릭).",
  },
};

export function RaptorScreen({ language }: Props) {
  const raptor = SVT_RAPTOR;

  return (
    <MobileAppShell activeRoute="explore">
      <ScreenFrame
        eyebrow={language === "ko" ? "04 · SVT 랩터" : "04 · SVT Raptor"}
        title={raptor.displayName}
        description={
          language === "ko"
            ? "2010-2014 1세대 랩터. 12세대 F-150 플랫폼 기반 오프로드 헤일로."
            : "2010-2014 first-gen Raptor. Off-road halo on the 12th-gen platform."
        }
      >
        <Card className="overflow-hidden bg-gradient-to-br from-[#241c14] via-[#181410] to-[#0a0807] p-0">
          <RaptorSilhouette />
          <div className="grid grid-cols-3 gap-2 p-3">
            <HeroStat label={language === "ko" ? "마력" : "Power"} value="411 hp" />
            <HeroStat label={language === "ko" ? "토크" : "Torque"} value="434 lb-ft" />
            <HeroStat label={language === "ko" ? "휠 트래블" : "Travel"} value={`${raptor.wheelTravelInFront}" / ${raptor.wheelTravelInRear}"`} />
            <HeroStat label={language === "ko" ? "트랙 폭 +" : "Track +"} value={`${raptor.trackWidthInDeltaFromStock}"`} />
            <HeroStat label={language === "ko" ? "전단 접근" : "Approach"} value={`${raptor.approachDeg.supercab}°`} />
            <HeroStat label={language === "ko" ? "후단 이탈" : "Departure"} value={`${raptor.departureDeg.supercab}°`} />
          </div>
        </Card>

        <div className="mt-3 grid gap-3">
          <Card>
            <p className="text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
              {language === "ko" ? "연식별 변경" : "Year-by-Year"}
            </p>
            <ol className="mt-2 space-y-2">
              {(raptor.yearsOffered as ModelYear[]).map((y) => (
                <li key={y} className="flex gap-3">
                  <div className="flex-shrink-0 rounded-md border border-accent/40 bg-accent/10 px-2 py-1 text-[0.7rem] font-bold tracking-[0.06em] text-accent">
                    {y}
                  </div>
                  <p className="text-[0.72rem] leading-5 text-foreground/80">
                    {YEAR_DELTA[y][language]}
                  </p>
                </li>
              ))}
            </ol>
          </Card>

          <Card>
            <p className="text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
              {language === "ko" ? "프론트 디프 (연식별)" : "Front Diff By Year"}
            </p>
            <div className="mt-2 flex gap-1 overflow-x-auto">
              {(Object.keys(raptor.frontDiffByYear) as unknown as ModelYear[])
                .filter((y) => raptor.yearsOffered.includes(y))
                .map((y) => {
                  const t = raptor.frontDiffByYear[y];
                  const isTorsen = t === "torsen_t2r";
                  return (
                    <div
                      key={y}
                      className={[
                        "min-w-[68px] flex-1 rounded-md border p-2 text-center",
                        isTorsen
                          ? "border-success/40 bg-success/10"
                          : "border-border/45 bg-panel",
                      ].join(" ")}
                    >
                      <p className="text-[0.62rem] font-bold tracking-[0.08em] text-foreground">
                        {y}
                      </p>
                      <p
                        className={[
                          "mt-1 text-[0.55rem] font-semibold tracking-[0.12em] uppercase",
                          isTorsen ? "text-success" : "text-muted",
                        ].join(" ")}
                      >
                        {isTorsen ? "Torsen" : "Open"}
                      </p>
                    </div>
                  );
                })}
            </div>
          </Card>

          <Card>
            <p className="text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
              {language === "ko" ? "서스펜션" : "Suspension"}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[0.7rem]">
              <KV label={language === "ko" ? "쇽 브랜드" : "Shocks"} value="Fox Racing Shox 2.5 IBP" />
              <KV
                label={language === "ko" ? "프론트 트래블" : "Front travel"}
                value={`${raptor.wheelTravelInFront}"`}
              />
              <KV
                label={language === "ko" ? "리어 트래블" : "Rear travel"}
                value={`${raptor.wheelTravelInRear}"`}
              />
              <KV
                label={language === "ko" ? "지상고 F/R" : "Clearance F/R"}
                value={`${raptor.groundClearanceInFront}" / ${raptor.groundClearanceInRear}"`}
              />
              <KV
                label={language === "ko" ? "쇽 재정비 (스트리트)" : "Rebuild (street)"}
                value={`${raptor.shockRebuildIntervalMi.streetOnly / 1000}k mi`}
              />
              <KV
                label={language === "ko" ? "쇽 재정비 (오프로드)" : "Rebuild (off-rd)"}
                value={`${raptor.shockRebuildIntervalMi.hardOffRoad / 1000}k mi`}
              />
            </div>
          </Card>

          <Card>
            <p className="text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
              {language === "ko" ? "휠 · 타이어" : "Wheels & Tires"}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[0.7rem]">
              <KV label={language === "ko" ? "OE 휠" : "OE Wheel"} value={raptor.oeWheelSize} />
              <KV label={language === "ko" ? "OE 타이어" : "OE Tire"} value={raptor.oeTireSize} />
              <KV label={language === "ko" ? "타이어 모델" : "Tire model"} value="BFG All-Terrain T/A KO" />
              <KV
                label={language === "ko" ? "공기압 F/R" : "Pressure F/R"}
                value={`${raptor.oeTirePressurePsi.front} / ${raptor.oeTirePressurePsi.rear} psi`}
              />
              <KV
                label={language === "ko" ? "비드락 옵션" : "Beadlock option"}
                value={`${raptor.oeBeadlockOption.availableFrom}+`}
              />
              <KV
                label={language === "ko" ? "축비" : "Axle ratio"}
                value={`${raptor.rearAxleRatio}:1`}
              />
            </div>
          </Card>

          <Card>
            <p className="text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
              {language === "ko" ? "제동" : "Brakes"}
            </p>
            <div className="mt-2 flex gap-2 text-[0.7rem]">
              <KV
                label={language === "ko" ? "프론트 로터" : "Front rotor"}
                value={`${raptor.brakeFrontRotorIn}"`}
              />
              <KV
                label={language === "ko" ? "리어 로터" : "Rear rotor"}
                value={`${raptor.brakeRearRotorIn}"`}
              />
              <KV label="HDC" value={raptor.hasHillDescentControl ? "Yes" : "No"} />
              <KV
                label={language === "ko" ? "오프로드" : "Off-road"}
                value={raptor.hasOffRoadMode ? "Yes" : "No"}
              />
            </div>
          </Card>

          <div>
            <p className="mb-2 text-[0.6rem] font-bold tracking-[0.18em] text-accent-strong uppercase">
              {language === "ko" ? "알려진 이슈" : "Known Issues"}
            </p>
            <div className="grid gap-2">
              {raptor.knownIssues.map((issue, i) => (
                <Card key={i}>
                  <div className="mb-1.5 flex items-start justify-between gap-2">
                    <p className="flex-1 text-sm leading-5 font-semibold text-foreground">
                      {issue.title}
                    </p>
                    <RecommendationBadge bias={issue.recommendation} language={language} />
                  </div>
                  <p className="text-[0.7rem] leading-5 text-muted">{issue.symptom}</p>
                  <p className="mt-1.5 text-[0.7rem] leading-5 text-foreground/75">
                    <span className="font-semibold text-foreground/85">
                      {language === "ko" ? "해결: " : "Fix: "}
                    </span>
                    {issue.fixSummary}
                  </p>
                  {issue.mileageNote ? (
                    <p className="mt-1 text-[0.62rem] tracking-wide text-foreground/55">
                      {issue.mileageNote}
                    </p>
                  ) : null}
                  {issue.sourceUrls?.length ? (
                    <a
                      href={issue.sourceUrls[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-block text-[0.62rem] font-semibold tracking-[0.14em] text-accent-strong uppercase hover:underline"
                    >
                      {language === "ko" ? "출처 보기 →" : "View source →"}
                    </a>
                  ) : null}
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-2 grid gap-2">
            <Button fullWidth href={withLang("/explore/engine-spec/6_2l_boss", language)}>
              {language === "ko" ? "6.2L Boss 엔진 사양" : "6.2L Boss engine spec"}
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

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[0.9rem] border border-white/10 bg-black/35 p-2">
      <p className="text-[0.5rem] font-bold tracking-[0.16em] text-foreground/45 uppercase">
        {label}
      </p>
      <p className="mt-0.5 font-[family:var(--font-display)] text-base leading-tight font-semibold text-foreground">
        {value}
      </p>
    </div>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/40 bg-background/40 p-2">
      <p className="text-[0.55rem] font-semibold tracking-[0.14em] text-muted uppercase">
        {label}
      </p>
      <p className="mt-0.5 font-semibold text-foreground/90">{value}</p>
    </div>
  );
}

function RaptorSilhouette() {
  return (
    <div className="relative h-44 w-full overflow-hidden bg-gradient-to-b from-[#2a1f12] via-[#1a140c] to-[#0a0805]">
      <svg
        viewBox="0 0 400 180"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label="SVT Raptor front three-quarter silhouette"
      >
        {/* ground line */}
        <line x1="0" y1="155" x2="400" y2="155" stroke="#3a2c1a" strokeWidth="1" />
        {/* dust */}
        <ellipse cx="80" cy="158" rx="55" ry="6" fill="#3a2c1a" opacity="0.5" />
        <ellipse cx="320" cy="158" rx="48" ry="5" fill="#3a2c1a" opacity="0.4" />
        {/* cab */}
        <path
          d="M115 90 L160 50 L235 50 L260 90 L300 90 L300 130 L100 130 L100 100 Z"
          fill="#1a1f24"
          stroke="#4a3b2a"
          strokeWidth="1.5"
        />
        {/* bed */}
        <rect x="260" y="80" width="60" height="50" fill="#15191c" stroke="#4a3b2a" strokeWidth="1.5" />
        {/* windshield */}
        <path
          d="M170 56 L228 56 L250 88 L140 88 Z"
          fill="#3a4d5f"
          opacity="0.45"
        />
        {/* grille FORD lettering area */}
        <rect x="95" y="100" width="22" height="18" fill="#0a0a08" stroke="#caa45a" strokeWidth="0.8" />
        <text
          x="106"
          y="113"
          textAnchor="middle"
          fill="#caa45a"
          fontSize="7"
          fontFamily="sans-serif"
          fontWeight="800"
          letterSpacing="0.5"
        >
          FORD
        </text>
        {/* clearance lamps */}
        <circle cx="170" cy="50" r="2.5" fill="#f9c14e" />
        <circle cx="195" cy="50" r="2.5" fill="#f9c14e" />
        <circle cx="220" cy="50" r="2.5" fill="#f9c14e" />
        {/* headlights */}
        <ellipse cx="125" cy="103" rx="9" ry="6" fill="#dbe8ef" opacity="0.85" />
        {/* hood vents */}
        <rect x="143" y="80" width="48" height="4" fill="#0a0a08" stroke="#3a2c1a" strokeWidth="0.5" />
        <rect x="143" y="87" width="48" height="4" fill="#0a0a08" stroke="#3a2c1a" strokeWidth="0.5" />
        {/* wheels w/ beadlock */}
        <g>
          <circle cx="135" cy="140" r="22" fill="#0a0a08" stroke="#caa45a" strokeWidth="1" />
          <circle cx="135" cy="140" r="14" fill="none" stroke="#5a4a3a" strokeWidth="1.5" />
          <circle cx="135" cy="140" r="3" fill="#5a4a3a" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="135"
              y1="140"
              x2={135 + 13 * Math.cos((deg * Math.PI) / 180)}
              y2={140 + 13 * Math.sin((deg * Math.PI) / 180)}
              stroke="#3a2c1a"
              strokeWidth="1.5"
            />
          ))}
        </g>
        <g>
          <circle cx="280" cy="140" r="22" fill="#0a0a08" stroke="#caa45a" strokeWidth="1" />
          <circle cx="280" cy="140" r="14" fill="none" stroke="#5a4a3a" strokeWidth="1.5" />
          <circle cx="280" cy="140" r="3" fill="#5a4a3a" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="280"
              y1="140"
              x2={280 + 13 * Math.cos((deg * Math.PI) / 180)}
              y2={140 + 13 * Math.sin((deg * Math.PI) / 180)}
              stroke="#3a2c1a"
              strokeWidth="1.5"
            />
          ))}
        </g>
        {/* fender flares */}
        <path d="M105 125 Q135 95 165 125" fill="none" stroke="#caa45a" strokeWidth="1.2" />
        <path d="M250 125 Q280 95 310 125" fill="none" stroke="#caa45a" strokeWidth="1.2" />
        {/* SVT badge */}
        <rect x="180" y="120" width="32" height="10" rx="1" fill="#0a0a08" stroke="#caa45a" strokeWidth="0.6" />
        <text x="196" y="128" textAnchor="middle" fill="#caa45a" fontSize="6" fontFamily="sans-serif" fontWeight="800" letterSpacing="1">
          RAPTOR
        </text>
      </svg>
    </div>
  );
}
