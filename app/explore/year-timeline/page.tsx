import { YearTimelineScreen } from "@/components/explore/year-timeline-screen";
import { resolveExploreLanguage } from "@/components/explore/explore-copy";

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function YearTimelinePage({ searchParams }: Props) {
  const params = await searchParams;
  const language = resolveExploreLanguage(params.lang);
  return <YearTimelineScreen language={language} />;
}
