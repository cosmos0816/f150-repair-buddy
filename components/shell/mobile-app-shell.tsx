import { APP_CONFIG } from "@/lib/config/app-config";
import type { ReactNode } from "react";

type MobileAppShellProps = {
  activeRoute: "home" | "session" | "result" | "notes";
  children: ReactNode;
  immersive?: boolean;
};

const routeLabels: Record<MobileAppShellProps["activeRoute"], string> = {
  home: "Home",
  session: "Session",
  result: "Result",
  notes: "Notes",
};

export function MobileAppShell({
  activeRoute,
  children,
  immersive = false,
}: MobileAppShellProps) {
  if (immersive) {
    return (
      <div className="h-[100dvh] min-h-[100svh] overflow-hidden bg-background text-foreground">
        <div className="mx-auto flex h-full max-w-[430px] flex-col overflow-hidden bg-black">
          <main className="relative h-full flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-panel/95">
        <header className="px-4 pb-2 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.62rem] font-semibold tracking-[0.24em] text-accent-strong uppercase">
                Repair Buddy
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {APP_CONFIG.vehicle.year} {APP_CONFIG.vehicle.model}{" "}
                <span className="text-muted">· {APP_CONFIG.vehicle.engine}</span>
              </p>
            </div>
            <div className="rounded-full bg-background/70 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.18em] text-muted uppercase">
              {routeLabels[activeRoute]}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 pb-5 pt-3">{children}</main>
      </div>
    </div>
  );
}
