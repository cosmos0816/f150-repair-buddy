import type { ReactNode } from "react";

type ScreenFrameProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function ScreenFrame({
  eyebrow,
  title,
  description,
  children,
}: ScreenFrameProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-accent-strong uppercase">
          {eyebrow}
        </p>
        <h2 className="font-[family:var(--font-display)] text-3xl leading-none font-semibold text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="max-w-[32rem] text-sm leading-6 text-muted">
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </section>
  );
}
