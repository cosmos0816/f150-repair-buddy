import { Suspense } from "react";

import { VehiclePickerScreen } from "@/components/explore/vehicle-picker-screen";
import { resolveExploreLanguage } from "@/components/explore/explore-copy";

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function VehiclePickerPage({ searchParams }: Props) {
  const params = await searchParams;
  const language = resolveExploreLanguage(params.lang);
  return (
    <Suspense>
      <VehiclePickerScreen language={language} />
    </Suspense>
  );
}
