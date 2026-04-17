import type { ReactNode } from "react";

type StatusBadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "accent" | "green" | "yellow" | "red";
};

export function StatusBadge({
  children,
  tone = "neutral",
}: StatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-[0.62rem] font-semibold tracking-[0.14em] uppercase",
        tone === "neutral" ? "bg-background/70 text-muted" : "",
        tone === "accent" ? "bg-accent/15 text-accent-strong" : "",
        tone === "green" ? "bg-success/15 text-success" : "",
        tone === "yellow" ? "bg-warning/15 text-warning" : "",
        tone === "red" ? "bg-danger/15 text-danger" : "",
      ].join(" ")}
    >
      {children}
    </span>
  );
}
