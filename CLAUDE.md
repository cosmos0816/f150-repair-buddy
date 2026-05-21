# F-150 Repair Buddy — Claude Code Instructions

## What this is
Mobile-first Next.js app for inspecting 12th-gen Ford F-150s (2009-2014, all engines + SVT Raptor). Originally built around Jay's 2010 5.4L Triton FX4 in South Korea, expanded into a multi-engine, multi-trim platform. User points rear camera at truck, bookmarks issues, talks to a Gemini Live AI buddy, gets a triage result: DIY safe / Inspect only / Shop required.

## Before you start
1. Read `AGENTS.md` — source of truth for scope and guardrails.
2. Read `PROJECT_STATE.md` — current working/broken features and architecture.
3. Read `NEXT_STEPS.md` — prioritized backlog.
4. Run `npm run dev` to verify the app starts. Port 3000.

## Key architecture decisions
- **Provider mode** is resolved server-side in `lib/server/provider-mode.ts`. Pages pass it as props. Never read `APP_CONFIG.defaultProviderMode` on the client.
- **Session page** (`app/session/page.tsx`) is a Server Component. `SessionScreen` has its own `isClientReady` mount gate — do NOT use `dynamic(ssr:false)`.
- **Gemini Live** config lives in `lib/server/gemini-live.ts`. System prompt under 10 directives. `toolConfig.mode` is `"AUTO"` — do not set to `"ANY"`.
- **Live session tools** in `lib/live/session-tools.ts`. 14+ tools registered. They run client-side, querying the local knowledge layer.
- **Parts catalog** scraped from RockAuto at `sources/rockauto/catalog.json` (~5,600 parts, 5.4L Triton only). Queried via `lib/knowledge/parts-catalog.ts`. Scraper: `scripts/scrape-rockauto.ts`.
- **Issue→parts integration**: `lib/knowledge/issue-parts-map.ts` has 43 issue→RockAuto mappings. `findPartsForDiagnosis` live tool wires diagnoses to concrete SKUs.
- **Knowledge layer** in `lib/knowledge/`:
  - `truck/` — original 2010 truck data (strict Records)
  - `references/` — 30+ TruckReferenceRecord modules
  - `vehicles/` — multi-vehicle catalog (engines/trims/years/2009-2014, VIN decoder, tow/payload, option decoder, paint codes)
  - `sound/` — sound fingerprint DB per engine/trans/fuel
- **Type system has TWO tiers**:
  - **Canonical** `TruckPartId / SymptomId / SystemId / IssueAreaId` — strict `Record<XxxId, XxxDefinition>` consumers in `lib/knowledge/truck/`. Add an ID here only if you're also adding a full definition to those Records.
  - **Extended** `ExtendedTruckXxxId` — wider unions for `TruckReferenceRecord`. Add new aesthetic/HVAC/transmission/subsystem IDs here. Reference records can use them without breaking strict consumers.

## Common tasks

### Add a new reference module
1. Create `lib/knowledge/references/<topic>.ts` exporting `<TOPIC>_REFERENCES: TruckReferenceRecord[]`
2. Use `ExtendedTruckPartId / SymptomId / SystemId / IssueAreaId` types — wider semantic palette
3. Register in `lib/knowledge/references/lookup.ts` (import + spread into TRUCK_REFERENCE_RECORDS)
4. Re-export from `lib/knowledge/references/index.ts`
5. `npx tsc --noEmit` to verify

### Add a new live session tool
1. Add executor to `LIVE_SESSION_TOOL_EXECUTORS` in `lib/live/session-tools.ts`
2. Add declaration to `LIVE_SESSION_TOOL_DECLARATIONS` in the same file
3. Update system prompt in `lib/server/gemini-live.ts` if the model needs to know about it

### Add a new year/trim/engine to the lineup
- New year file: `lib/knowledge/vehicles/years/<YYYY>.ts` exporting `LINEUP_<YYYY>: YearLineup` + helper getters. Follow the 2010.ts pattern.
- New trim: extend `TrimId` in `lib/knowledge/vehicles/types.ts`
- New engine: extend `EngineId` + add SupportedVehicleId in `lib/config/app-config.ts`

### Update the parts catalog
```bash
npx playwright install chromium
npx tsx scripts/scrape-rockauto.ts
```
The catalog currently only covers 5.4L Triton. EcoBoost / Coyote / 6.2 / V6 need their own scrapes.

### Test on phone via Cloudflare tunnel
```bash
cloudflared tunnel --protocol http2 --url http://localhost:3000
```

## Do NOT
- Add `"use client"` + `dynamic(ssr:false)` to page files — causes SSR bailout
- Read `process.env.REPAIR_BUDDY_MODE` or `GEMINI_API_KEY` in client components
- Set `toolConfig.functionCallingConfig.mode` to `"ANY"`
- Make the system prompt longer than 10 lines
- Import from `lib/providers/repair-buddy-provider.ts` in client components (server-only)
- Add Extended union IDs to the canonical `TruckPartId/SymptomId/etc.` unless you're also adding the corresponding strict Record entry

## Testing
- `npm run dev` — starts on port 3000
- `npx tsc --noEmit` — type check
- `npm run build` — production build smoke test (Turbopack)
- No automated test suite yet. Verify manually: home + provider badge, session connects to Gemini, result screen renders, /explore loads, /api/parts/by-issue returns hits.

## Git / deployment
- Repo: `cosmos0816/f150-repair-buddy` (personal, not company)
- Push needs `gh auth switch -u cosmos0816 && git push && gh auth switch -u kozmoz0816` if `kozmoz0816` is the active GH auth on this machine
- Vercel project `prj_ECO3MtTSphyOU3i540zB74MDi2nX` under `cosmos0816`. Deploy: `vercel --prod`

## Owner context
Jay drives this truck daily in South Korea. Parts are expensive to import. The app's practical value is: identify the problem, show Korean mechanics what to fix (with photos + Korean text), and find parts on RockAuto with prices + Korean availability notes. The "send to mechanic" export feature uses Web Share API for KakaoTalk.
