import type { RepairBuddyMode } from "@/lib/config/app-config";
import type { RepairResult } from "@/lib/types/result";
import type { RepairSessionSnapshot } from "@/lib/types/session";

export interface RepairBuddyProvider {
  readonly name: RepairBuddyMode;
  analyzeSession(session: RepairSessionSnapshot): Promise<RepairResult>;
}
