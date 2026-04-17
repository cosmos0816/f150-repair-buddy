import "server-only";

import { APP_CONFIG } from "@/lib/config/app-config";
import { GeminiRepairBuddyProvider } from "@/lib/providers/gemini-repair-buddy-provider";
import { MockRepairBuddyProvider } from "@/lib/providers/mock-repair-buddy-provider";

export type { RepairBuddyProvider } from "@/lib/providers/repair-buddy-provider-types";

const mockProvider = new MockRepairBuddyProvider();
const geminiProvider = new GeminiRepairBuddyProvider();

export function getDefaultRepairBuddyProvider() {
  return APP_CONFIG.defaultProviderMode === "gemini" ? geminiProvider : mockProvider;
}
