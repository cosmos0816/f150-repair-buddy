import { SoundFingerprintsScreen } from "@/components/explore/sound-fingerprints-screen";
import { resolveExploreLanguage } from "@/components/explore/explore-copy";

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function SoundFingerprintsPage({ searchParams }: Props) {
  const params = await searchParams;
  const language = resolveExploreLanguage(params.lang);
  return <SoundFingerprintsScreen language={language} />;
}
