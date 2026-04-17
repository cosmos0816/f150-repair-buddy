import { readFileSync } from "node:fs";
import { join } from "node:path";

type CatalogPart = {
  category: string;
  subcategory: string;
  brand: string;
  partNumber: string;
  description: string;
  price: string;
  url: string;
};

type CatalogData = {
  vehicle: string;
  scrapedAt: string;
  parts: CatalogPart[];
};

export type PartSearchResult = {
  subcategory: string;
  category: string;
  rockautoUrl: string;
  options: Array<{
    brand: string;
    partNumber: string;
    price: string;
  }>;
  priceRange: string;
};

let catalogCache: CatalogData | null = null;

function loadCatalog(): CatalogData {
  if (catalogCache) {
    return catalogCache;
  }

  try {
    const catalogPath = join(
      process.cwd(),
      "sources",
      "rockauto",
      "catalog.json",
    );
    const raw = readFileSync(catalogPath, "utf-8");
    catalogCache = JSON.parse(raw) as CatalogData;
    return catalogCache;
  } catch {
    return { vehicle: "", scrapedAt: "", parts: [] };
  }
}

function parsePriceNumber(price: string): number {
  const match = price.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function normalizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

export function searchPartsCatalog(
  query: string,
  maxResults = 5,
): PartSearchResult[] {
  const catalog = loadCatalog();
  const queryWords = normalizeQuery(query);

  if (queryWords.length === 0) {
    return [];
  }

  // Group parts by subcategory
  const bySubcategory = new Map<string, CatalogPart[]>();
  for (const part of catalog.parts) {
    const key = `${part.category}::${part.subcategory}`;
    const group = bySubcategory.get(key) ?? [];
    group.push(part);
    bySubcategory.set(key, group);
  }

  // Score each subcategory by how well it matches the query
  const scored: Array<{ key: string; score: number; parts: CatalogPart[] }> =
    [];

  for (const [key, parts] of bySubcategory) {
    const subcatLower = key.toLowerCase();
    let score = 0;

    for (const word of queryWords) {
      if (subcatLower.includes(word)) {
        score += 2;
      }
    }

    // Check if the full query appears as a substring
    if (subcatLower.includes(queryWords.join(" "))) {
      score += 5;
    }

    // Also check brand matches
    for (const part of parts) {
      for (const word of queryWords) {
        if (part.brand.toLowerCase().includes(word)) {
          score += 0.5;
          break;
        }
        if (part.partNumber.toLowerCase().includes(word)) {
          score += 1;
          break;
        }
      }
    }

    if (score > 0) {
      scored.push({ key, score, parts });
    }
  }

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Take top results and format
  return scored.slice(0, maxResults).map(({ parts }) => {
    const first = parts[0]!;
    const prices = parts
      .map((p) => parsePriceNumber(p.price))
      .filter((p) => p > 0);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Sort options by price
    const options = parts
      .filter((p) => parsePriceNumber(p.price) > 0)
      .sort((a, b) => parsePriceNumber(a.price) - parsePriceNumber(b.price))
      .slice(0, 6) // Top 6 options per subcategory
      .map((p) => ({
        brand: p.brand,
        partNumber: p.partNumber,
        price: p.price,
      }));

    return {
      subcategory: first.subcategory,
      category: first.category,
      rockautoUrl: `https://www.rockauto.com${first.url}`,
      options,
      priceRange:
        minPrice === maxPrice
          ? `$${minPrice.toFixed(2)}`
          : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`,
    };
  });
}

export function getPartsCatalogStats() {
  const catalog = loadCatalog();
  const categories = new Set(catalog.parts.map((p) => p.category));
  const subcategories = new Set(
    catalog.parts.map((p) => `${p.category}::${p.subcategory}`),
  );

  return {
    totalParts: catalog.parts.length,
    categories: categories.size,
    subcategories: subcategories.size,
    scrapedAt: catalog.scrapedAt,
    vehicle: catalog.vehicle,
  };
}
