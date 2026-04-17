# NEXT_STEPS.md

## Immediate (do next)
1. Fix `/result` route crash
   - `components/screens/result-screen.tsx:88` calls `getDefaultRepairBuddyProvider()` which is `server-only`
   - Replace with `analyzeSessionClient` (same pattern session-screen already uses)
   - Also apply the same server-side provider mode prop pattern as session/home screens

2. Backfill missing RockAuto catalog categories
   - 8 categories returned only 3 parts (navigation links, not real parts): Brake, Cooling, Drivetrain, Electrical, Electrical-Bulb, Electrical-Connector, Electrical-Switch, Engine, Exhaust, Heat/AC
   - These use JS-expanded subcategory panels — scraper needs click-to-expand logic
   - Script: `scripts/scrape-rockauto.ts`
   - Output: `sources/rockauto/catalog.json`

3. Add "Parts Needed" section to result screen
   - After diagnosis identifies issue area + parts, call `searchPartsCatalog` server-side
   - Show matching RockAuto parts with brand, price, direct link
   - Group by part type, show 2-3 options each (budget / recommended / OEM)

## After field testing
4. Tune real-time conversation quality
   - Field test current system prompt (7-line version with "describe what you see" directive)
   - If model still loops on "can't see" — try injecting proactive visual context on every turn-complete (plumbing exists in `buildInspectionContextText`)
   - Consider adding a "what area is visible" pre-classification step before tool calls

5. Add `?provider=mock` URL override
   - Currently provider is env-only
   - Useful for testing mock flow without changing server env

## Later
6. Truck-guided inspection prompts
   - "show me the belt and tensioner"
   - "move closer to the connector"
   - "hold still for two seconds"
   - Already has `lib/session/guided-inspection.ts` scaffolding

7. Improve production hardening
   - retry/reconnect for Gemini Live
   - better mobile failure states
   - session resilience

8. "Send to mechanic" export
   - Export session report with torque specs, part numbers, RockAuto links
   - Korean-language formatted PDF or shareable link
   - Include captured frames + diagnosis

9. Real manual/reference grounding
   - Ford owner manual PDF ingestion (in `sources/ford-official/`)
   - TSB summaries
   - NHTSA recall data
