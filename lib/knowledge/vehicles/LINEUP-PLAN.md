# 12th-Gen F-150 (2009-2014) Per-Variant Codification Plan

Read-only research plan. No code yet. Drives the next codification phase that turns every realistic (year, trim, engine, cab, bed, drive) combination into queryable typed data.

## 1. Lineup matrix (one row per realistic distinct config family)

Cab abbreviations: RC=Regular Cab, SC=SuperCab, CC=SuperCrew. Bed: 5.5/6.5/8. Drive: 2/4. Trans: 4=4R75E, 6=6R80. Asterisks flag rare-but-real combos.

| Year | Trim | Engines | Cabs | Beds | Drive | Trans |
|------|------|---------|------|------|-------|-------|
| 2009 | XL | 4.6 2V, 4.6 3V, 5.4 3V | RC, SC, CC | RC:6.5/8; SC:6.5/8; CC:5.5/6.5 | 2/4 | 4(2V), 6(3V/5.4) |
| 2009 | STX | 4.6 3V, 5.4 3V | RC, SC | 6.5 | 2/4 | 6 |
| 2009 | XLT | 4.6 3V, 5.4 3V | RC, SC, CC | RC:6.5/8; SC:6.5/8; CC:5.5/6.5 | 2/4 | 6 |
| 2009 | FX4 | 5.4 3V | SC, CC | SC:6.5; CC:5.5/6.5 | 4 only | 6 |
| 2009 | Lariat | 5.4 3V | SC, CC | SC:6.5; CC:5.5/6.5 | 2/4 | 6 |
| 2009 | King Ranch | 5.4 3V | CC | 5.5/6.5 | 2/4 | 6 |
| 2009 | Platinum | 5.4 3V | CC | 5.5/6.5 | 2/4 | 6 |
| 2009 | Harley-Davidson | 5.4 3V | CC | 5.5 | 2 (RWD only)* | 6 |
| 2010 | XL/STX/XLT | same as 2009 | same | same | 2/4 | 4(2V), 6 |
| 2010 | FX2 (new) | 4.6 3V | SC, CC | 5.5/6.5 | 2 only | 6 |
| 2010 | FX4 | 5.4 3V | SC, CC | 5.5/6.5 | 4 only | 6 |
| 2010 | Lariat/King Ranch/Platinum/HD | 5.4 3V | as 2009 | as 2009 | 2/4 (HD: 2 only) | 6 |
| 2010 | SVT Raptor (launch) | 5.4 3V (early), 6.2 (mid-year) | SC | 5.5 | 4 only | 6 |
| 2011 | XL | 3.7, 5.0, 3.5 EB | RC, SC, CC | full | 2/4 | 6 |
| 2011 | STX | 3.7, 5.0, 3.5 EB | RC, SC | 6.5 | 2/4 | 6 |
| 2011 | XLT | 3.7, 5.0, 3.5 EB | RC, SC, CC | full | 2/4 | 6 |
| 2011 | FX2 | 5.0, 3.5 EB | SC, CC | 5.5/6.5 | 2 only | 6 |
| 2011 | FX4 | 5.0, 3.5 EB | SC, CC | 5.5/6.5 | 4 only | 6 |
| 2011 | Lariat | 5.0, 3.5 EB, 6.2 | SC, CC | 5.5/6.5 | 2/4 | 6 |
| 2011 | King Ranch / Platinum | 5.0, 3.5 EB, 6.2 | CC | 5.5/6.5 | 2/4 | 6 |
| 2011 | Harley-Davidson | 6.2 | CC | 5.5 | 2 only | 6 |
| 2011 | SVT Raptor | 6.2 | SC, CC (new) | 5.5 | 4 only | 6 |
| 2012 | (carryover; HD final year) | as 2011 | as 2011 | as 2011 | as 2011 | 6 |
| 2013 | XL/STX/XLT/FX2/FX4/Lariat/KR/Plat | as 2012 (HD dropped) | as 2012 | as 2012 | as 2012 | 6 |
| 2013 | FX4 gains 6.2 option | + 6.2 | SC, CC | 5.5/6.5 | 4 only | 6 |
| 2013 | Limited (new) | 3.5 EB only | CC | 5.5 | 2/4 | 6 |
| 2013 | SVT Raptor | 6.2 | SC, CC | 5.5 | 4 only | 6 |
| 2014 | STX expands cabs/beds | 3.7, 5.0, 3.5 EB | RC, SC, CC | 5.5/6.5 | 2/4 | 6 |
| 2014 | FX2 gains 6.2 | 3.5 EB, 5.0, 6.2 | SC, CC | 5.5/6.5 | 2 only | 6 |
| 2014 | Tremor (regional, RC SC?) | 3.5 EB | RC SC (regular sport) | 6.5 | 2/4 | 6 |
| 2014 | SVT Raptor SE / Roush package | 6.2 | SC, CC | 5.5 | 4 only | 6 |

Distinct config-family rows: ~120 base, ~410-460 when you fully expand (year × trim × engine × cab × bed × drive). After filtering impossible combos (e.g. King Ranch RC, XL Platinum-only wheels) the **realistic distinct count is approximately 380-420 configs**.

## 2. Proposed TypeScript file structure

Recommend a **hybrid year-anchored + trim-anchored** layout because most user queries are "what came on a 2012 Lariat 5.0?" not "list all 5.5-foot beds." Adding files under `lib/knowledge/vehicles/`:

- `years/2009.ts`, `2010.ts`, `2011.ts`, `2012.ts`, `2013.ts`, `2014.ts` — exports `YEAR_LINEUP_2010: YearLineup` listing every trim's exact engine/cab/bed/drive matrix for that year, plus MSRP ranges and notable mid-year changes.
- `variants.ts` — exports `ALL_VARIANTS: VehicleVariant[]` flattened from the per-year files. Each entry is a unique tuple `{ year, trimId, engineId, cabStyle, bedLength, drivetrain, transmissionId }` with a stable `variantKey` like `2010-fx4-5_4l_3v-supercrew-5.5ft-4x4`. This is the searchable index.
- `equipment.ts` — exports `EQUIPMENT_PACKAGES` (Max Trailer Tow, HD Payload, Sync, MyFord Touch, NAV, sunroof, heated/cooled seats, BLIS, power running boards, 36-gal tank) with year/trim availability gates.
- `colors.ts` — exports `EXTERIOR_COLORS_BY_YEAR` and `INTERIOR_COLORS_BY_TRIM_YEAR` (e.g. King Ranch Castaño only, Harley Tuxedo Black/Lava Red, Limited White Platinum + Tuxedo Black two-tones).
- `vin-decoder.ts` — VIN positions 1-3 (1FT/1FM), 4 (gross weight / brake), 5 (cab+series, e.g. W=SuperCrew + GVWR), 6 (body), 7 (restraint), 8 (engine code: 5=4.6 2V, 8=4.6 3V, V=5.4 3V, F=6.2, M=3.7, T=5.0, 6=3.5 EB), 10 (year), 11 (plant: F=Dearborn, K=Kansas City), plus check-digit math.
- `option-codes.ts` — RPO-style Ford option codes (e.g. 18B Sync, 53B Reverse Sensing, 53R Rear Cam, 90L Power Heated Mirrors, 99T 5.0L, 99G 3.5 EB, 99M 3.7L, 99L 6.2L, 64L 18in wheel, X4L electronic locker).
- `tow-payload.ts` — table keyed by `{ engine, cab, drive, axleRatio, tow_package }` → `{ maxTowLb, maxPayloadLb, gcwrLb }` from Ford RV & Trailer Towing Guides.
- `production-rarity.ts` — qualitative rarity tier (`common | uncommon | rare | unicorn`) per variantKey to flag combos like "2013 Limited 4x2" (rare) or "2009 XL RC 5.4 8ft 4x4" (work-truck unicorn).

Do **not** create one-file-per-trim — too much duplicate scaffolding. The per-year files plus the flattened `variants.ts` index is most queryable and lets you do `findVariant({year:2012, trim:"lariat", engine:"5_0l_coyote"})` in O(1) via the key.

## 3. Gaps in existing `types.ts`

Currently sufficient: `ModelYear`, `CabStyle`, `BedLength`, `Drivetrain`, `EngineId`, `TransmissionId`, `TrimId`. Add:

- `TrimId` add: `"tremor"` (2014 regional FX-style sport).
- New `OptionCodeId` union (40-60 entries) and `EquipmentPackageId` (`max_trailer_tow`, `hd_payload_pkg`, `chrome_pkg`, `convenience_pkg`, `luxury_pkg`, `sync_w_myford_touch`, `nav_voice`, `rear_view_cam`, `reverse_sensing`, `blis_w_cta`, `pwr_moonroof`, `pwr_running_boards`, `36gal_fuel_tank`, `tailgate_step`, `box_link`).
- New `ExteriorColorId` (~28 colors across the gen: Oxford White, Tuxedo Black, Sterling Grey, Ingot Silver, Magnetic, Race Red, Ruby Red, Vermillion Red, Royal Red, Blue Flame, Blue Jeans, Dark Blue Pearl, Pale Adobe, Caribou, Golden Bronze, Kodiak Brown, Green Gem, Forest Green, White Platinum Tri-coat, Lava Red, Brick Red, Olympic White, etc.).
- New `InteriorColorId` (Steel Gray, Black, Adobe, Pale Adobe, Camel, Stone, Castaño/King Ranch, Black/Brick Red, Black/Pale Adobe).
- New `AxleRatio` literal union `3.15 | 3.31 | 3.55 | 3.73 | 4.10` (4.10 currently used in Raptor as numeric literal only).
- New `VehicleVariant` interface (year+trim+engine+cab+bed+drive+trans+variantKey).
- `BedLength` consider adding `"8ft_styleside_payload"` distinction if HD Payload Package config differs.
- `Drivetrain` consider `"4x4_esof" | "4x4_manual_shift"` for transfer-case nuance — or keep separate via existing `TransferCaseShift`.
- `TrimSpec.yearConfigs` does not currently encode `drivetrainsOffered` per year — add `drivetrainsOffered: Drivetrain[]`. Today this is implicit; FX2 = 4x2 only, FX4 = 4x4 only, Harley = 2WD only, Raptor = 4x4 only — explicit field prevents bad combos.

## 4. Estimated scope

- Realistic distinct configs: **~400** (after pruning impossible combos).
- TS line count estimate: per-year files ~250 LOC each (×6 = 1,500), `variants.ts` flat index ~400 LOC (one line per variant), `equipment.ts` ~250, `colors.ts` ~200, `vin-decoder.ts` ~180, `option-codes.ts` ~250, `tow-payload.ts` ~600 (largest — combinatorial), `production-rarity.ts` ~150. **Total ≈ 3,500 LOC of new data files.**
- Types: ~80-120 additional LOC in `types.ts`.

## 5. Citations

Primary sources to cite per row:
- Ford 2009-2014 F-150 Brochures (PDF) — `https://www.fleet.ford.com/showroom/brochures/`, archived copies at `https://www.auto-brochures.com/ford.html`.
- Ford Owner Guides 2009-2014 — `https://www.fordservicecontent.com/` and `https://owner.ford.com/tools/account/how-tos/owner-manuals.html`.
- Ford RV & Trailer Towing Guides 2009-2014 — `https://www.fleet.ford.com/towing-guides/`.
- Wikipedia "Ford F-Series (twelfth generation)" — overview and year-over-year changes.
- Edmunds historical specs — `https://www.edmunds.com/ford/f-150/2010/` (replicate per year/trim).
- KBB used-vehicle specs — `https://www.kbb.com/ford/f-150/2010/`.
- f150hub.com production data and engine code tables.
- NHTSA VIN decoder — `https://vpic.nhtsa.dot.gov/decoder/` (authoritative for VIN position validation).
- FordParts.com and Tasca catalog for OE option codes.
- f150forum.com "List of 2014 F-150 option codes" and Ford SVT Raptor build sheets.

## 6. Sequencing recommendation

Build order (highest owner-utility first, given the app's core user is Jay with a 2010 FX4 5.4):

1. **Phase 1 — Anchor year 2010 (Jay's truck):** `years/2010.ts` plus `variants.ts` entries for 2010 only. Validate the schema works against the existing trim/engine specs and the RockAuto catalog linker.
2. **Phase 2 — High-volume sibling years 2011 + 2012:** these introduced 6R80-only + new engine family; many used-truck shoppers and Korean-import inventory live here.
3. **Phase 3 — 2013 + 2014:** Limited trim, FX2 6.2 expansion, Raptor SE/Roush; cleaner data because docs are easier to find post-2013.
4. **Phase 4 — 2009:** legacy 4.6 2V / 4R75E pairings; lowest residual value, lowest query volume — defer.
5. **Phase 5 — VIN decoder + option codes + tow-payload tables:** these are cross-cutting; build once the variant index is stable.
6. **Phase 6 — Colors, rarity, equipment packages:** mostly cosmetic/used-market intel; valuable for the "send to mechanic" export but not blocking triage.
7. **Defer indefinitely:** export-market variants (Mexico-built King Ranch with metric gauges), fleet-only stripped XLs with deleted A/C, FFV-only flex-fuel SKUs unless owner data shows demand.

Each phase: add data → run `npx tsc --noEmit` → spot-check 3-5 variant lookups → commit.
