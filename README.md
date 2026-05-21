# F-150 Repair Buddy

Mobile-first inspection and triage app for the 12th-generation Ford F-150 (2009-2014) including the SVT Raptor. Originally built around a 2010 5.4L Triton FX4, expanded into a multi-engine, multi-trim knowledge layer covering every realistic configuration.

The app keeps the rear camera live during a session, talks to a Gemini Live AI buddy via voice, captures evidence (frames, bookmarks, sound clips), and generates a practical result: **DIY safe / Inspect only / Shop required**.

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Home / vehicle selector |
| `/session` | Live inspection session (camera + Gemini Live) |
| `/result` | Triage result card with mechanic export |
| `/notes` | Prototype notes |
| `/designs` | Design exploration samples |
| `/explore` | Knowledge browser entry point |
| `/explore/year-timeline` | 2009-2014 lineup timeline |
| `/explore/vehicle-picker` | Filter by year/trim/engine |
| `/explore/engine-spec/[id]` | Per-engine deep specs |
| `/explore/trim-compare` | Compare trims side-by-side |
| `/explore/failure-modes/[engineId]` | Known failures per engine |
| `/explore/service-intervals/[engineId]` | Maintenance schedules |
| `/explore/bulletins` | TSBs and recalls |
| `/explore/parts-finder` | RockAuto catalog browser |
| `/explore/sound-fingerprints` | Per-engine sound signatures |
| `/explore/raptor` | Raptor-specific reference |
| `/api/live/token` | Server-issued Gemini Live ephemeral token |
| `/api/analyze-session` | Server-side result analysis |
| `/api/parts` | Generic RockAuto parts search |
| `/api/parts/by-issue` | Issue→parts mapping (closes diagnose→buy loop) |

## Environment

```bash
REPAIR_BUDDY_MODE=mock    # or "gemini" for live
GEMINI_API_KEY=...        # server-only
```

URL override: `?provider=mock` forces mock mode regardless of env.

## Knowledge layer

The knowledge layer lives entirely in `lib/knowledge/` and is queried client-side via 14+ Gemini Live tools.

### Vehicles (`lib/knowledge/vehicles/`)
- `engines.ts`, `transmissions.ts`, `trims.ts` — base catalogs
- `years/2009.ts` through `years/2014.ts` — **677 fully-typed model variants** across year × trim × engine × cab × bed × drive × axle
- `tow-payload.ts` — 51 tow/payload entries by config (max 11,300 lb)
- `vin-decoder.ts` — 12th-gen VIN decoder with ISO 3779 check digit
- `option-decoder.ts` — 57 Ford option codes + window sticker decoder
- `parts-linker.ts` — engine/trim/system → RockAuto category hints
- `engine-sounds.ts` — sound fingerprint library for the "listen mode"
- `raptor.ts` + `bulletins.ts` + `engine-sounds.ts` + `parts-linker.ts`

### References (`lib/knowledge/references/`)
Per-engine: `coyote-specs`, `boss-62-reference`, `raptor-gen2-reference`, `svt-raptor-gen1`, `triton-46-2v-specs`, `triton-46-3v-specs`, `v6-37-tivct-specs`, EcoBoost cluster (dtc/fluid/forum/issues/maintenance/cost/torque/tsbs).

Subsystems: `hvac-deep`, `brake-system-deep`, `fuel-system-deep`, `transmission-6r80-deep`, `cold-weather-prep`, `tpms-keyfob`.

Cross-engine: `engine-comparison`, `multi-engine-maintenance`, `parts-sourcing`, `community-misdiagnoses`, `forscan-pids`, `wiring-electrical`.

Mods/aesthetics: `performance-tuning`, `lift-kits`, `aesthetic-accessories`, `raptor-modifications`.

TSBs/recalls: `ford-tsbs`, `ecoboost-tsbs`, `raptor-tsbs`, `nhtsa-tsb-summaries`, `nhtsa-recalls`, `nhtsa-tsbs-comprehensive`, `recall-campaigns-comprehensive`.

Other: `bed-cab-reference`, `interior-parts`, `color-paint-codes`, `korea-parts-shipping`, `dtc-codes`, `general-dtc-codes`, `fluid-specs`, `torque-specs`, `maintenance-schedule`, `repair-costs`, `repair-notes`, `known-issues`.

### Sound DB (`lib/knowledge/sound/`)
- `engine-variant-sounds.ts` — 18 per-engine sound entries (Triton phaser rattle, EcoBoost turbo whine, Coyote VCT chatter)
- `transmission-sounds.ts` — 9 per-trans entries (4R70E/4R75E/6R80)
- `fuel-related-sounds.ts` — 6 fuel-grade-related sounds (E15 misfueling, knock retard, octane mismatch)

### Parts integration (RockAuto)
- `lib/knowledge/parts-catalog.ts` — search 2010 5.4L scrape (~5,600 parts, 430 subcategories)
- `lib/knowledge/issue-parts-map.ts` — **43 issue→parts mappings**, `findPartsForIssue(issueId)`
- `lib/live/session-tools.ts` — `findPartsForDiagnosis` live tool wires diagnosis to concrete RockAuto SKUs

## Type system

Two-tier union architecture:
- `TruckPartId / TruckSymptomId / TruckSystemId / TruckIssueAreaId` — canonical IDs used by strict `Record<XxxId, XxxDefinition>` consumers in `lib/knowledge/truck/`
- `ExtendedTruckPartId / ExtendedTruckSymptomId / ExtendedTruckSystemId / ExtendedTruckIssueAreaId` — wider unions including subsystem/aesthetic/interior IDs, used by `TruckReferenceRecord` in references files

This split lets new reference data introduce new IDs (running_board, blend_door_actuator, shift_shudder, etc.) without requiring full `TruckPartDefinition` entries in the strict Record consumers.

## Architecture decisions

**Provider mode** resolved server-side in `lib/server/provider-mode.ts`. Pages pass it as props. Never read `APP_CONFIG.defaultProviderMode` on the client.

**Session page** (`app/session/page.tsx`) is a Server Component. `SessionScreen` has its own `isClientReady` mount gate — do NOT use `dynamic(ssr:false)`.

**Gemini Live** config in `lib/server/gemini-live.ts`. System prompt stays short (under 10 directives). `toolConfig.mode` is `"AUTO"` — do not set to `"ANY"`.

**Live session tools** in `lib/live/session-tools.ts`. They run client-side, querying the local knowledge layer.

## Commands

```bash
npm run dev              # localhost:3000
npm run build            # production build (Turbopack)
npm run lint
npx tsc --noEmit         # type check only
```

## Deployment

Vercel: `vercel --prod` (linked to project `prj_ECO3MtTSphyOU3i540zB74MDi2nX` under `cosmos0816` account). Live at https://f150-repair-buddy.vercel.app.
