import { Suspense } from "react";
import { SessionScreen } from "@/components/screens/session-screen";
import { resolveServerProviderMode } from "@/lib/server/provider-mode";

export default function SessionPage() {
  const providerMode = resolveServerProviderMode();
  return (
    <Suspense>
      <SessionScreen
        initialProviderMode={providerMode.mode}
        geminiKeyPresent={providerMode.geminiKeyPresent}
      />
    </Suspense>
  );
}
