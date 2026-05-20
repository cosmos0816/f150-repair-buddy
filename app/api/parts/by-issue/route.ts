import { NextResponse } from "next/server";

import {
  findPartsForIssue,
  type TruckIssueId,
} from "@/lib/knowledge/issue-parts-map";
import type { EngineId, TrimId } from "@/lib/knowledge/vehicles/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const issueId = url.searchParams.get("issueId")?.trim();
  const engineId = url.searchParams.get("engineId")?.trim() || undefined;
  const trimId = url.searchParams.get("trimId")?.trim() || undefined;
  const maxResultsRaw = url.searchParams.get("maxResults")?.trim();
  const maxResults = maxResultsRaw ? Number(maxResultsRaw) : undefined;

  if (!issueId) {
    return NextResponse.json(
      { error: "Missing issueId query parameter." },
      { status: 400 },
    );
  }

  const result = findPartsForIssue(issueId as TruckIssueId, {
    engineId: engineId as EngineId | undefined,
    trimId: trimId as TrimId | undefined,
    maxResults: Number.isFinite(maxResults) && maxResults! > 0 ? maxResults : undefined,
  });

  return NextResponse.json(result);
}
