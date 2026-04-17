import type { RepairResult } from "@/lib/types/result";
import type { RepairSessionSnapshot } from "@/lib/types/session";

/**
 * Client-safe wrapper that sends a RepairSessionSnapshot to the server-side
 * /api/analyze-session route and returns the RepairResult.
 */
export async function analyzeSessionClient(
  snapshot: RepairSessionSnapshot,
): Promise<RepairResult> {
  const response = await fetch("/api/analyze-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(snapshot),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(
      body.error ?? `analyze-session request failed (${response.status})`,
    );
  }

  return response.json() as Promise<RepairResult>;
}
