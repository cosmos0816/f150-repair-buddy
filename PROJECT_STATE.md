# PROJECT_STATE.md

## Project
F-150 Repair Buddy MVP

## Scope
- Vehicle: 2010 Ford F-150 FX4
- Engine: 5.4 Triton
- Odometer: ~350,000 km
- Product type: mobile-first web inspection and triage app
- Live AI: Gemini Live (stable, tool-calling works)
- UI: full-screen camera, top bar controls, compact bottom live caption, expandable timeline

## Current Working Features
- Home screen with server-resolved provider mode (Gemini/Mock badge)
- Session screen — no SSR bailout, clean hydration
- Result screen (has a known crash — see blocking issues)
- Notes screen
- Rear camera preview on iPhone Safari
- Microphone permission flow
- Full-screen session UI
- Frame capture + bookmark system
- Evidence timeline/history
- Mock diagnosis flow
- Gemini Live conversation — connects, stays live, tool calls fire
- 9 live session tools: searchKnowledge, getPartDefinition, getSymptomDefinition, getInspectionHints, getEscalationGuidance, summarizeSessionEvidence, getNextInspectionTarget, getPartHealthSummary, searchReplacementParts
- RockAuto parts catalog (2,245 parts scraped, searchable via searchReplacementParts tool)
- Post-session analysis correctly identifies issues and recommends shop/DIY/inspect
- Language support: English / Korean
- Provider mode resolved server-side, passed as prop (no client-side env leakage)

## Current Non-Working / Known Issues
- `/result` route crashes: `result-screen.tsx:88` calls `getDefaultRepairBuddyProvider()` which is behind `server-only`. Needs to switch to `analyzeSessionClient` like session-screen does.
- RockAuto scraper missed 8 categories (Brake, Cooling, Drivetrain, Electrical x3, Engine, Exhaust, Heat/AC) — they use JS-expanded subcategories. Need click-to-expand scraping pass.
- Real-time conversation quality still needs tuning — model sometimes loops on "can't see" instead of describing what's visible. System prompt was improved but needs field testing.
- Torch reliability is inconsistent (treat as optional).

## Architecture Decisions (recent)
- `app/session/page.tsx` is a Server Component that passes `initialProviderMode` + `geminiKeyPresent` props to SessionScreen. SessionScreen has its own `isClientReady` mount gate — no dynamic/ssr:false needed.
- Provider mode resolution lives in `lib/server/provider-mode.ts` (server-only). Single source of truth: Gemini when GEMINI_API_KEY present, mock when missing or REPAIR_BUDDY_MODE=mock.
- `toolConfig.functionCallingConfig.mode = "AUTO"` — was tested with "ANY" (forces tool every turn, too aggressive), dialed back to AUTO with stronger prompting.
- System prompt is 7 lines, not 25. Key directive: "describe what you see first, even if you can't name the exact part."
- Tool call instrumentation: `[ToolCall]` console logs in dev mode for debugging.
- Parts catalog at `sources/rockauto/catalog.json`, queried via `lib/knowledge/parts-catalog.ts`.

## Tech Stack
- Next.js 16.2.1, React 19, TypeScript, Tailwind CSS 4
- Gemini Live API (@google/genai) — model: gemini-3.1-flash-live-preview
- Local state (no database in v1)
- Playwright for scraping (devDependency)

## Current Priority
1. Fix `/result` route crash
2. Backfill missing RockAuto categories (8 categories need JS-expansion scraping)
3. Tune real-time conversation quality (field test with updated system prompt)
4. Connect parts catalog to result screen (show "parts needed" with prices/links)
