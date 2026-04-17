import { NextResponse } from "next/server";

import { getDefaultRepairBuddyProvider } from "@/lib/providers/repair-buddy-provider";
import type { RepairSessionSnapshot } from "@/lib/types/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const snapshot = (await request.json()) as RepairSessionSnapshot;

    if (!snapshot || typeof snapshot !== "object" || !snapshot.id) {
      return NextResponse.json(
        { error: "Invalid snapshot payload." },
        { status: 400 },
      );
    }

    const provider = getDefaultRepairBuddyProvider();
    const result = await provider.analyzeSession(snapshot);

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("[analyze-session] route error", error);
    const message =
      error instanceof Error && error.message.trim()
        ? error.message.trim()
        : "Analysis unavailable.";

    return NextResponse.json(
      { error: message },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, max-age=0" },
      },
    );
  }
}
