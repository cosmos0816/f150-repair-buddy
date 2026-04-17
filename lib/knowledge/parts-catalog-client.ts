import type { PartSearchResult } from "@/lib/knowledge/parts-catalog";

export async function searchPartsCatalogClient(
  query: string,
  _maxResults = 5,
): Promise<PartSearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `/api/parts?q=${encodeURIComponent(query.trim())}`,
    );

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as { results: PartSearchResult[] };
    return data.results ?? [];
  } catch {
    return [];
  }
}
