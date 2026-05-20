import { notFound } from "next/navigation";

import { FailureModesScreen } from "@/components/explore/failure-modes-screen";
import { resolveExploreLanguage } from "@/components/explore/explore-copy";
import { ALL_ENGINES } from "@/lib/knowledge/vehicles/engines";
import type { EngineId } from "@/lib/knowledge/vehicles/types";

type Props = {
  params: Promise<{ engineId: string }>;
  searchParams: Promise<{ lang?: string }>;
};

export default async function FailureModesPage({ params, searchParams }: Props) {
  const [{ engineId }, { lang }] = await Promise.all([params, searchParams]);
  if (!(engineId in ALL_ENGINES)) notFound();
  const language = resolveExploreLanguage(lang);
  return <FailureModesScreen engineId={engineId as EngineId} language={language} />;
}
