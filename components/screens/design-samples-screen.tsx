import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";

type DesignSample = {
  accent: string;
  body: string;
  cabin: string;
  chrome: string;
  focus: string;
  meter: string;
  name: string;
  signal: string;
  surface: string;
  tone: string;
};

const samples: DesignSample[] = [
  {
    name: "Bay Light",
    focus: "Camera-first shop flow",
    tone: "Warm workbench, oil-stained labels, high contrast controls.",
    accent: "bg-[#f2b84b]",
    body: "bg-[#161714]",
    cabin: "from-[#24241f] via-[#171814] to-[#0c0d0b]",
    chrome: "border-[#5d5749]",
    meter: "w-[82%]",
    signal: "Listening",
    surface: "bg-[#22231d]",
  },
  {
    name: "Factory Scan",
    focus: "DTC and live data",
    tone: "Diagnostic-console density with crisp blue action states.",
    accent: "bg-[#58a8ff]",
    body: "bg-[#0d1418]",
    cabin: "from-[#182c36] via-[#0d171d] to-[#070b0f]",
    chrome: "border-[#31576a]",
    meter: "w-[64%]",
    signal: "P0304",
    surface: "bg-[#132027]",
  },
  {
    name: "Trail Ready",
    focus: "Off-road inspection",
    tone: "Dusty olive panels, bigger targets, damage triage.",
    accent: "bg-[#c9d15a]",
    body: "bg-[#11150e]",
    cabin: "from-[#30351f] via-[#151a10] to-[#090b07]",
    chrome: "border-[#4d5630]",
    meter: "w-[72%]",
    signal: "IWE",
    surface: "bg-[#202617]",
  },
  {
    name: "Korea Shop",
    focus: "Mechanic handoff",
    tone: "Bilingual report cards with clean red priority flags.",
    accent: "bg-[#f05f4d]",
    body: "bg-[#141313]",
    cabin: "from-[#35201c] via-[#181313] to-[#0b0909]",
    chrome: "border-[#6f3832]",
    meter: "w-[58%]",
    signal: "SHOP",
    surface: "bg-[#241a18]",
  },
  {
    name: "Night Tow",
    focus: "Roadside capture",
    tone: "Deep black camera view with amber safety guidance.",
    accent: "bg-[#ff9f37]",
    body: "bg-[#08090b]",
    cabin: "from-[#1b1c22] via-[#0e1015] to-[#040506]",
    chrome: "border-[#474b59]",
    meter: "w-[46%]",
    signal: "Low oil",
    surface: "bg-[#151820]",
  },
  {
    name: "Torque Bench",
    focus: "Parts and specs",
    tone: "Manual-inspired layout for exact torque, fluids, part numbers.",
    accent: "bg-[#e8e0c8]",
    body: "bg-[#101214]",
    cabin: "from-[#2a2a25] via-[#17191a] to-[#0a0b0c]",
    chrome: "border-[#5a5a50]",
    meter: "w-[88%]",
    signal: "25 lb-ft",
    surface: "bg-[#202221]",
  },
  {
    name: "Voice Dock",
    focus: "Hands-free guidance",
    tone: "Large captions, calm controls, strong session rhythm.",
    accent: "bg-[#7bd5c0]",
    body: "bg-[#0b1414]",
    cabin: "from-[#183330] via-[#0d1a19] to-[#050909]",
    chrome: "border-[#2f6259]",
    meter: "w-[76%]",
    signal: "Talk",
    surface: "bg-[#132321]",
  },
  {
    name: "Evidence Rail",
    focus: "Timeline review",
    tone: "Fast scanning for captures, bookmarks, and confidence changes.",
    accent: "bg-[#d7a3ff]",
    body: "bg-[#121018]",
    cabin: "from-[#261c32] via-[#15111d] to-[#08060c]",
    chrome: "border-[#514060]",
    meter: "w-[69%]",
    signal: "8 clips",
    surface: "bg-[#1f1829]",
  },
  {
    name: "Fleet Ledger",
    focus: "Multi-engine expansion",
    tone: "Organized cards for comparing 5.4, EcoBoost, Coyote, and Raptor.",
    accent: "bg-[#91c8f6]",
    body: "bg-[#101316]",
    cabin: "from-[#1d2a34] via-[#12181d] to-[#07090b]",
    chrome: "border-[#3e5360]",
    meter: "w-[61%]",
    signal: "5.4L",
    surface: "bg-[#192128]",
  },
  {
    name: "Quick Verdict",
    focus: "End result clarity",
    tone: "One-screen shop/DIY/inspect decision with evidence behind it.",
    accent: "bg-[#86d66f]",
    body: "bg-[#0f140f]",
    cabin: "from-[#1f341b] via-[#111a10] to-[#060806]",
    chrome: "border-[#3d6236]",
    meter: "w-[80%]",
    signal: "Inspect",
    surface: "bg-[#182318]",
  },
];

export function DesignSamplesScreen() {
  return (
    <MobileAppShell activeRoute="designs">
      <ScreenFrame
        eyebrow="Product Directions"
        title="10 Design Samples"
        description="Ten mobile interface treatments for F-150 Repair Buddy, each aimed at a different inspection moment."
      >
        <div className="grid gap-4">
          {samples.map((sample, index) => (
            <DesignSampleCard
              key={sample.name}
              index={index + 1}
              sample={sample}
            />
          ))}
        </div>

        <div className="mt-5">
          <Button fullWidth href="/" variant="ghost">
            Back Home
          </Button>
        </div>
      </ScreenFrame>
    </MobileAppShell>
  );
}

function DesignSampleCard({
  index,
  sample,
}: {
  index: number;
  sample: DesignSample;
}) {
  return (
    <article
      className={[
        "overflow-hidden rounded-[1.25rem] border p-3 shadow-2xl shadow-black/20",
        sample.body,
        sample.chrome,
      ].join(" ")}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.62rem] font-bold tracking-[0.2em] text-foreground/45 uppercase">
            Sample {String(index).padStart(2, "0")}
          </p>
          <h3 className="mt-1 font-[family:var(--font-display)] text-2xl leading-none font-semibold text-foreground">
            {sample.name}
          </h3>
        </div>
        <span
          className={[
            "shrink-0 rounded-full px-3 py-1 text-[0.6rem] font-bold tracking-[0.16em] text-black uppercase",
            sample.accent,
          ].join(" ")}
        >
          {sample.signal}
        </span>
      </div>

      <div
        className={[
          "relative min-h-[300px] overflow-hidden rounded-[1rem] border bg-gradient-to-b p-3",
          sample.cabin,
          sample.chrome,
        ].join(" ")}
      >
        <div className="absolute inset-x-0 top-0 h-24 bg-[url('/og-image.png')] bg-cover bg-center opacity-20 mix-blend-screen" />
        <div className="absolute inset-x-8 top-10 h-px bg-foreground/15" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-[0.55rem] font-bold tracking-[0.18em] text-foreground/45 uppercase">
              2010 F-150
            </p>
            <p className="text-sm font-semibold text-foreground">5.4 Triton</p>
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-full border border-foreground/20 bg-black/25">
            <div className={["h-3 w-3 rounded-full", sample.accent].join(" ")} />
          </div>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-[0.9rem] border border-white/10 bg-black/35">
          <div className="aspect-[16/10] p-3">
            <div className="flex h-full flex-col justify-between rounded-[0.7rem] border border-white/10 bg-black/25 p-3">
              <div className="flex items-center justify-between text-[0.58rem] font-bold tracking-[0.16em] text-white/50 uppercase">
                <span>Rear Camera</span>
                <span>Live</span>
              </div>
              <div className="grid gap-2">
                <div className="h-2 w-3/4 rounded-full bg-white/18" />
                <div className="h-2 w-1/2 rounded-full bg-white/12" />
                <div className="flex items-end gap-2 pt-3">
                  <div className="h-10 flex-1 rounded-t-lg border border-white/10 bg-white/10" />
                  <div className="h-16 flex-1 rounded-t-lg border border-white/10 bg-white/15" />
                  <div className="h-8 flex-1 rounded-t-lg border border-white/10 bg-white/10" />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="h-7 w-24 rounded-full border border-white/10 bg-black/35" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-3 grid grid-cols-[1fr_auto] gap-3">
          <div className={["rounded-[0.9rem] p-3", sample.surface].join(" ")}>
            <p className="text-[0.58rem] font-bold tracking-[0.16em] text-foreground/45 uppercase">
              {sample.focus}
            </p>
            <p className="mt-1 text-xs leading-5 text-foreground/76">
              {sample.tone}
            </p>
            <div className="mt-3 h-1.5 rounded-full bg-black/35">
              <div
                className={["h-full rounded-full", sample.accent, sample.meter].join(
                  " ",
                )}
              />
            </div>
          </div>
          <div className="flex w-14 flex-col items-center justify-between rounded-[0.9rem] border border-white/10 bg-black/25 py-3">
            <div className={["h-5 w-5 rounded-full", sample.accent].join(" ")} />
            <div className="h-12 w-1 rounded-full bg-white/15" />
            <div className="h-5 w-5 rounded-full border border-white/25" />
          </div>
        </div>
      </div>
    </article>
  );
}
