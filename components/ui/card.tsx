import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={[
        "rounded-[1.75rem] border border-border/45 bg-panel-strong/90 p-4",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
