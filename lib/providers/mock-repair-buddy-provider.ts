import type { RepairBuddyProvider } from "@/lib/providers/repair-buddy-provider-types";
import { buildMockRepairResult } from "@/lib/session/mock-diagnosis";
import type { RepairResult } from "@/lib/types/result";
import type { RepairSessionSnapshot } from "@/lib/types/session";

export class MockRepairBuddyProvider implements RepairBuddyProvider {
  readonly name = "mock" as const;

  async analyzeSession(session: RepairSessionSnapshot): Promise<RepairResult> {
    return buildMockRepairResult(session);
  }
}
