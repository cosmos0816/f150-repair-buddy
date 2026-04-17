import "server-only";

import type { RepairBuddyMode } from "@/lib/config/app-config";
import { headers } from "next/headers";

export type ServerProviderModeInfo = {
  mode: RepairBuddyMode;
  geminiKeyPresent: boolean;
  explicitlyDisabled: boolean;
};

/**
 * Check for ?provider=mock or ?provider=gemini in the request URL.
 * Returns undefined if no override is present.
 */
function getUrlProviderOverride(): RepairBuddyMode | undefined {
  try {
    const headersList = headers();
    const referer = (headersList as unknown as { get?: (key: string) => string | null }).get?.("referer") ?? "";
    const xUrl = (headersList as unknown as { get?: (key: string) => string | null }).get?.("x-url") ?? "";
    const urlString = xUrl || referer;

    if (!urlString) return undefined;

    const url = new URL(urlString);
    const override = url.searchParams.get("provider");

    if (override === "mock" || override === "gemini") {
      return override;
    }
  } catch {
    // headers() throws outside of request context (e.g., during static generation)
  }

  return undefined;
}

/**
 * Single source of truth for which repair-buddy provider is active on this
 * server process. Default is Gemini whenever GEMINI_API_KEY is configured;
 * mock is only used when the key is missing or when REPAIR_BUDDY_MODE=mock
 * explicitly opts out.
 *
 * Supports ?provider=mock URL override for testing without changing env.
 */
export function resolveServerProviderMode(): ServerProviderModeInfo {
  const geminiKeyPresent = Boolean(process.env.GEMINI_API_KEY?.trim());
  const explicitlyDisabled =
    process.env.REPAIR_BUDDY_MODE?.trim() === "mock";

  const urlOverride = getUrlProviderOverride();

  let mode: RepairBuddyMode;

  if (urlOverride) {
    // URL override: ?provider=mock forces mock even with key present
    // ?provider=gemini forces gemini if key is present
    mode = urlOverride === "gemini" && geminiKeyPresent ? "gemini" : urlOverride === "mock" ? "mock" : "mock";
  } else {
    mode = !explicitlyDisabled && geminiKeyPresent ? "gemini" : "mock";
  }

  return { mode, geminiKeyPresent, explicitlyDisabled };
}
