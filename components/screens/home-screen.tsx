"use client";

import { useState } from "react";

import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DEFAULT_SESSION_LANGUAGE,
  getHomeCopy,
  getSessionCopy,
  getSessionLanguageButtonLabel,
} from "@/lib/session/session-language";
import type { SessionLanguage } from "@/lib/types/session";

type HomeScreenProps = {
  providerMode?: "gemini" | "mock";
};

export function HomeScreen({ providerMode = "mock" }: HomeScreenProps = {}) {
  const [sessionLanguage, setSessionLanguage] = useState<SessionLanguage>(
    DEFAULT_SESSION_LANGUAGE,
  );
  const homeCopy = getHomeCopy(sessionLanguage, providerMode);
  const sessionCopy = getSessionCopy(sessionLanguage);

  return (
    <MobileAppShell activeRoute="home">
      <ScreenFrame
        eyebrow={homeCopy.eyebrow}
        title={homeCopy.title}
        description={homeCopy.description}
      >
        <Card className="space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-[1.2rem] border border-border/60 bg-panel px-3 py-3">
            <p className="text-[0.7rem] font-semibold tracking-[0.14em] text-muted uppercase">
              {sessionCopy.language}
            </p>
            <div className="flex items-center gap-2">
              {(["en", "ko"] as const).map((languageOption) => (
                <button
                  key={languageOption}
                  className={[
                    "rounded-full px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.14em] uppercase transition",
                    sessionLanguage === languageOption
                      ? "bg-accent text-background"
                      : "border border-border bg-panel text-foreground/80",
                  ].join(" ")}
                  onClick={() => setSessionLanguage(languageOption)}
                  type="button"
                >
                  {getSessionLanguageButtonLabel(languageOption)}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted">{homeCopy.modeOn}</p>
          <div className="grid gap-3">
            <Button
              className="min-h-16 text-base"
              fullWidth
              href={`/session?lang=${sessionLanguage}`}
            >
              {homeCopy.openSession}
            </Button>
            <Button fullWidth href="/notes" variant="ghost">
              {homeCopy.notes}
            </Button>
          </div>
        </Card>
      </ScreenFrame>
    </MobileAppShell>
  );
}
