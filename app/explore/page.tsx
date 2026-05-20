import { ExploreIndexScreen } from "@/components/explore/explore-index-screen";
import { resolveExploreLanguage } from "@/components/explore/explore-copy";

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function ExploreIndexPage({ searchParams }: Props) {
  const params = await searchParams;
  const language = resolveExploreLanguage(params.lang);
  return <ExploreIndexScreen language={language} />;
}
