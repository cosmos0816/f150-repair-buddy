# F-150 Repair Buddy — Claude Code Instructions

## What this is
Mobile-first Next.js app for inspecting a 2010 Ford F-150 FX4 (5.4 Triton, ~350K km). User points rear camera at truck, bookmarks issues, talks to a Gemini Live AI buddy, gets a triage result: DIY safe / Inspect only / Shop required.

## Before you start
1. Read `AGENTS.md` — it's the source of truth for scope and guardrails.
2. Read `PROJECT_STATE.md` — current working/broken features and architecture.
3. Read `NEXT_STEPS.md` — prioritized backlog.
4. Run `npm run dev` to verify the app starts. Port 3000.

## Key architecture decisions
- **Provider mode** is resolved server-side in `lib/server/provider-mode.ts`. Pages pass it as props. Never read `APP_CONFIG.defaultProviderMode` on the client — it's always "mock" there because `process.env.REPAIR_BUDDY_MODE` is server-only.
- **Session page** (`app/session/page.tsx`) is a Server Component. `SessionScreen` has its own `isClientReady` mount gate — do NOT use `dynamic(ssr:false)`.
- **Gemini Live** config lives in `lib/server/gemini-live.ts`. System prompt should stay short (under 10 directives). `toolConfig.mode` is `"AUTO"` — do not set to `"ANY"` (causes over-aggressive tool calling).
- **Live session tools** are in `lib/live/session-tools.ts`. 9 tools registered. They run client-side (in the browser), querying the local knowledge layer.
- **Parts catalog** scraped from RockAuto at `sources/rockauto/catalog.json` (2,245 parts). Queried via `lib/knowledge/parts-catalog.ts`. Scraper script: `scripts/scrape-rockauto.ts`.
- **Knowledge layer** is in `lib/knowledge/` — 47 truck parts, 18 symptoms, issue rules, escalation rules, inspection hints. This is local data, not API calls.

## Common tasks

### Fix a bug
Check `PROJECT_STATE.md` "Known Issues" section first. The `/result` route crash is the top priority.

### Add a new live session tool
1. Add executor to `LIVE_SESSION_TOOL_EXECUTORS` in `lib/live/session-tools.ts`
2. Add declaration to `LIVE_SESSION_TOOL_DECLARATIONS` in the same file
3. Update system prompt in `lib/server/gemini-live.ts` if the model needs to know about it

### Update the parts catalog
```bash
npx playwright install chromium  # first time
npx tsx scripts/scrape-rockauto.ts
```
Output goes to `sources/rockauto/catalog.json`.

### Test on phone via Cloudflare tunnel
```bash
cloudflared tunnel --protocol http2 --url http://localhost:3000
```

## Do NOT
- Add `"use client"` + `dynamic(ssr:false)` to page files — causes SSR bailout
- Read `process.env.REPAIR_BUDDY_MODE` or `GEMINI_API_KEY` in client components
- Set `toolConfig.functionCallingConfig.mode` to `"ANY"` in production
- Make the system prompt longer than 10 lines
- Add vehicle support beyond the 2010 F-150 5.4 Triton
- Import from `lib/providers/repair-buddy-provider.ts` in client components (it has `server-only`)

## Testing
- `npm run dev` — starts on port 3000
- `npx tsc --noEmit` — type check
- No test suite yet. Verify manually: home screen shows correct provider badge, session connects to Gemini, result screen renders.

## Owner context
The owner (Jay) drives this truck daily in South Korea. Parts are expensive to import. The app's practical value is: identify the problem, show Korean mechanics what to fix (with photos + Korean text), and find parts on RockAuto with prices. The "send to mechanic" export feature is on the roadmap.
