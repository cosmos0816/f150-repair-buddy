import { NextResponse } from "next/server";

import { searchPartsCatalog } from "@/lib/knowledge/parts-catalog";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = searchPartsCatalog(query, 5);

  return NextResponse.json({ query, results });
}
