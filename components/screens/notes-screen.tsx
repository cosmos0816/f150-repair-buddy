import { MobileAppShell } from "@/components/shell/mobile-app-shell";
import { ScreenFrame } from "@/components/shell/screen-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const notes = ["Mock mode", "Camera preview", "Mic optional", "No live AI"];

export function NotesScreen() {
  return (
    <MobileAppShell activeRoute="notes">
      <ScreenFrame
        eyebrow="Notes"
        title="Scope"
        description="Small and local."
      >
        <div className="grid gap-4">
          <Card>
            <ul className="space-y-3 text-sm text-foreground/90">
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </Card>

          <div className="grid gap-3">
            <Button fullWidth href="/">
              Home
            </Button>
            <Button fullWidth href="/session" variant="ghost">
              Session
            </Button>
          </div>
        </div>
      </ScreenFrame>
    </MobileAppShell>
  );
}
