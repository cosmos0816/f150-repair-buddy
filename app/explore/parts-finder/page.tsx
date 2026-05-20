import { Suspense } from "react";

import { PartsFinderScreen } from "@/components/explore/parts-finder-screen";
import { resolveExploreLanguage } from "@/components/explore/explore-copy";

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function PartsFinderPage({ searchParams }: Props) {
  const params = await searchParams;
  const language = resolveExploreLanguage(params.lang);
  return (
    <Suspense>
      <PartsFinderScreen language={language} />
    </Suspense>
  );
}
