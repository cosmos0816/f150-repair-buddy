import type {
  FindPartsForIssueResult,
  TruckIssueId,
} from "@/lib/knowledge/issue-parts-map";
import type { EngineId, TrimId } from "@/lib/knowledge/vehicles/types";

export interface FindPartsForIssueClientOptions {
  engineId?: EngineId;
  trimId?: TrimId;
  maxResults?: number;
}

const EMPTY_RESULT = (issueId: string): FindPartsForIssueResult => ({
  issueId: issueId as TruckIssueId,
  issueAreaId: null,
  matched: false,
  results: [],
  categoryHints: [],
  subcategoryHints: [],
  searchTermsTried: [],
});

export async function findPartsForIssueClient(
  issueId: TruckIssueId | string,
  options: FindPartsForIssueClientOptions = {},
): Promise<FindPartsForIssueResult> {
  const trimmed = String(issueId ?? "").trim();
  if (!trimmed) {
    return EMPTY_RESULT(trimmed);
  }

  const params = new URLSearchParams({ issueId: trimmed });
  if (options.engineId) params.set("engineId", options.engineId);
  if (options.trimId) params.set("trimId", options.trimId);
  if (options.maxResults && Number.isFinite(options.maxResults)) {
    params.set("maxResults", String(options.maxResults));
  }

  try {
    const response = await fetch(`/api/parts/by-issue?${params.toString()}`);
    if (!response.ok) {
      return EMPTY_RESULT(trimmed);
    }
    return (await response.json()) as FindPartsForIssueResult;
  } catch {
    return EMPTY_RESULT(trimmed);
  }
}
