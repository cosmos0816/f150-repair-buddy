import { HomeScreen } from "@/components/screens/home-screen";
import { resolveServerProviderMode } from "@/lib/server/provider-mode";

export default function HomePage() {
  const { mode } = resolveServerProviderMode();
  return <HomeScreen providerMode={mode} />;
}
