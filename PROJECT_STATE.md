# PROJECT_STATE.md

## Project
F-150 Repair Buddy — mobile-first inspection & triage app for the 12th-gen Ford F-150 (2009-2014) + SVT Raptor.

## Scope
- **Lineup coverage**: 2009-2014 F-150 (all trims: XL/STX/XLT/FX2/FX4/Lariat/King Ranch/Platinum/Limited/Tremor/Harley-Davidson/SVT Raptor)
- **Engines**: 4.6L 2V, 4.6L 3V, 5.4L 3V Triton, 6.2L Boss, 3.5L EcoBoost, 3.7L Ti-VCT V6, 5.0L Coyote
- **Owner's truck**: 2010 FX4 SuperCrew 5.5ft 4x4, 5.4 3V, ~350,000 km, South Korea
- **Variants codified**: 677 fully-typed configs across all years
- Product type: mobile-first PWA, voice + camera AI inspection
- Live AI: Gemini Live (stable, 14+ tool-calling working including new `findPartsForDiagnosis`)
- UI: full-screen camera, top bar controls, compact bottom caption, expandable timeline, Explore section for browsing knowledge

## Current Working Features
- Home screen with server-resolved provider mode (Gemini/Mock badge)
- Session screen — clean hydration, no SSR bailout
- Result screen with mechanic export (Korean text + parts list)
- Notes screen
- **Explore section** — 11 screens for browsing the knowledge layer (engine specs, trim compare, year timeline, vehicle picker, failure modes, bulletins, parts finder, sound fingerprints, Raptor, service intervals)
- Designs page (UI exploration samples)
- Rear camera preview on iPhone Safari
- Microphone permission flow
- Frame capture + bookmark system + evidence timeline
- Mock diagnosis + Gemini Live conversation paths
- Korean mechanic report with copy/share via Web Share API (KakaoTalk-ready)
- PWA support (manifest, service worker, app icons)
- SEO + Open Graph meta tags

## Live session tools (14+)
1. searchKnowledge
2. getPartDefinition
3. getSymptomDefinition
4. getInspectionHints
5. getEscalationGuidance
6. summarizeSessionEvidence
7. getNextInspectionTarget
8. getPartHealthSummary
9. searchReplacementParts (generic RockAuto query)
10. **findPartsForDiagnosis** (NEW — issue→RockAuto SKU mapping, 43 mappings)
11. lookupDTCCode
12. lookupTorqueSpec
13. lookupMaintenanceSchedule
14. generateMechanicReport
15. (more via grounded-inspection module)

## Knowledge layer scope
- **30+ reference modules** in `lib/knowledge/references/` (~30,000 lines of typed data)
- **Per-engine dedicated specs**: every variant (4.6 2V, 4.6 3V, 5.4 3V, 3.5 EcoBoost, 5.0 Coyote, 6.2 Boss, 3.7 V6, Raptor Gen 1, Raptor Gen 2)
- **Subsystem deep dives**: HVAC, brake, fuel system, 6R80 transmission, cold-weather, TPMS+keyfob, interior
- **Mods**: 50 entries across tuners/intakes/exhaust/superchargers/lifts/shocks/aesthetic accessories
- **TSBs/recalls**: 29 comprehensive entries (all flagged `// VERIFY`)
- **Sound DB**: 33 entries (per engine × trans × fuel)
- **Vehicle data**: VIN decoder, 51 tow/payload entries, 22 paint codes, 57 option codes
- **Community research codified**: ForScan PIDs, wiring/electrical, misdiagnoses, Korea sourcing

## Type system architecture
- **Canonical IDs** (`TruckPartId`, `TruckSymptomId`, `TruckSystemId`, `TruckIssueAreaId`) — strict `Record<XxxId, XxxDefinition>` consumers in `lib/knowledge/truck/`
- **Extended IDs** (`ExtendedTruckPartId`, etc.) — wider unions for `TruckReferenceRecord` shape
- ~50 new Extended IDs added (running_board, blend_door_actuator, shift_shudder, fuel_system, etc.) without breaking strict Record consumers

## Recently Pushed (May 20-21, 2026)
- `52688e1` — Multi-engine knowledge + Explore feature (70 files, 11,849 lines)
- `ce17f2a` — Parts→RockAuto integration + sound DB + lineup matrix start (34 files, 9,195 lines)
- `e683e80` — Full 12th-gen lineup + Gen 1 Raptor + interior/paint/option (15 files, 7,399 lines)
- `197dafe` — Phase 3 deep dives (10 files, 5,571 lines)
- `573d5b6` — Fuel system + 6R80 deep dives (4 files, 458 lines)
- `2e37287` — Extended type unions for wider reference records (4 files, 250 insertions)

**Total: 6 commits, 137 files, 34,722 lines of net additions**

## Current Non-Working / Known Issues
- 29 TSBs in `nhtsa-tsbs-comprehensive.ts` flagged `// VERIFY` — need cross-check against real NHTSA database
- RockAuto catalog is 5.4L Triton only (5,607 parts). Need separate scrapes for EcoBoost / Coyote / 6.2 Boss / 3.7 V6 for full coverage. `findPartsForDiagnosis` returns 42/43 hits today; the missing one is `turbo_failure_ecoboost`.
- Some `TruckPartDefinition` Record stubs missing for newly-introduced Extended IDs (only matters if you want full part-level UI lookup)
- `metadataBase` not set in `app/layout.tsx` — minor build warning for OG image resolution
- No automated test suite yet

## Architecture Decisions
- `app/session/page.tsx` is a Server Component, passes `initialProviderMode` + `geminiKeyPresent` props
- Provider mode lives in `lib/server/provider-mode.ts` (server-only)
- `toolConfig.functionCallingConfig.mode = "AUTO"` (not "ANY")
- System prompt under 10 lines
- Parts catalog: `sources/rockauto/catalog.json` → `lib/knowledge/parts-catalog.ts`
- Two-tier type union architecture (canonical vs Extended)

## Tech Stack
- Next.js 16.2.1, React 19.2.4, TypeScript 5, Tailwind CSS 4
- Gemini Live API (@google/genai 1.47) — model: gemini-3.1-flash-live-preview
- Local state (no database in v1)
- Playwright (devDependency, scraping)

## Current Priority Queue
1. Verify 29 `// VERIFY` TSBs
2. Multi-engine RockAuto scrapes (EcoBoost / Coyote / 6.2 / V6)
3. Vercel `--prod` deploy of current main
4. Korean i18n sweep (full bilingual UX, not just aliases)
5. Older-generation coverage (1997-2004) for Korean used market
6. Real-time conversation quality field testing
