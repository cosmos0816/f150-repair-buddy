import type { RecommendationBias } from "@/lib/knowledge/vehicles/types";
import type { SessionLanguage } from "@/lib/types/session";

type Props = {
  bias: RecommendationBias;
  language: SessionLanguage;
  size?: "sm" | "md";
};

const LABELS: Record<RecommendationBias, Record<SessionLanguage, string>> = {
  diy_safe: { en: "DIY Safe", ko: "DIY 가능" },
  inspect_only: { en: "Inspect", ko: "점검 필요" },
  shop_required: { en: "Shop", ko: "정비소 권장" },
};

const TONE: Record<RecommendationBias, string> = {
  diy_safe: "bg-success/15 text-success border-success/40",
  inspect_only: "bg-warning/15 text-warning border-warning/40",
  shop_required: "bg-danger/15 text-danger border-danger/40",
};

const DOT: Record<RecommendationBias, string> = {
  diy_safe: "bg-success",
  inspect_only: "bg-warning",
  shop_required: "bg-danger",
};

export function RecommendationBadge({ bias, language, size = "sm" }: Props) {
  const label = LABELS[bias][language];
  const padding = size === "md" ? "px-3 py-1.5 text-[0.7rem]" : "px-2.5 py-1 text-[0.62rem]";
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-[0.14em] uppercase",
        padding,
        TONE[bias],
      ].join(" ")}
    >
      <span className={["h-1.5 w-1.5 rounded-full", DOT[bias]].join(" ")} />
      {label}
    </span>
  );
}
