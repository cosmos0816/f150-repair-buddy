import { ResultScreen } from "@/components/screens/result-screen";
import { resolveServerProviderMode } from "@/lib/server/provider-mode";

export default function ResultPage() {
  const { mode } = resolveServerProviderMode();
  return <ResultScreen providerMode={mode} />;
}
