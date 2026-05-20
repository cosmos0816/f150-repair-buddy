import { Suspense } from "react";

import { TrimCompareScreen } from "@/components/explore/trim-compare-screen";
import { resolveExploreLanguage } from "@/components/explore/explore-copy";

type Props = {
  searchParams: Promise<{ lang?: string; trims?: string }>;
};

export default async function TrimComparePage({ searchParams }: Props) {
  const params = await searchParams;
  const language = resolveExploreLanguage(params.lang);
  return (
    <Suspense>
      <TrimCompareScreen language={language} />
    </Suspense>
  );
}
