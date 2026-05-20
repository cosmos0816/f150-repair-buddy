import { Suspense } from "react";

import { BulletinsScreen } from "@/components/explore/bulletins-screen";
import { resolveExploreLanguage } from "@/components/explore/explore-copy";

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function BulletinsPage({ searchParams }: Props) {
  const params = await searchParams;
  const language = resolveExploreLanguage(params.lang);
  return (
    <Suspense>
      <BulletinsScreen language={language} />
    </Suspense>
  );
}
