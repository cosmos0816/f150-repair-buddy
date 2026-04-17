import { NextResponse } from "next/server";

import { createGeminiLiveBootstrap } from "@/lib/server/gemini-live";
import { resolveSessionLanguage } from "@/lib/session/session-language";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    let sessionLanguage = resolveSessionLanguage(undefined);

    try {
      const body = (await request.json()) as { sessionLanguage?: string };
      sessionLanguage = resolveSessionLanguage(body.sessionLanguage);
    } catch {}

    const bootstrap = await createGeminiLiveBootstrap(sessionLanguage);

    return NextResponse.json(bootstrap, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Gemini Live token route failed", error);
    const message =
      error instanceof Error && error.message.trim()
        ? error.message.trim()
        : "Gemini Live unavailable.";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  }
}
