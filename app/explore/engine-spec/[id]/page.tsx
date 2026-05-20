import { notFound } from "next/navigation";

import { EngineSpecScreen } from "@/components/explore/engine-spec-screen";
import { resolveExploreLanguage } from "@/components/explore/explore-copy";
import { ALL_ENGINES } from "@/lib/knowledge/vehicles/engines";
import type { EngineId } from "@/lib/knowledge/vehicles/types";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
};

export default async function EngineSpecPage({ params, searchParams }: Props) {
  const [{ id }, { lang }] = await Promise.all([params, searchParams]);
  if (!(id in ALL_ENGINES)) {
    notFound();
  }
  const language = resolveExploreLanguage(lang);
  return <EngineSpecScreen engineId={id as EngineId} language={language} />;
}
