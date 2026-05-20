// 2009 Ford F-150 lineup — per-variant codification (LINEUP-PLAN Phase 4).
//
// 2009 is Year 1 of the 12th-generation P415 platform. Important gen-1
// constraints encoded here:
//   - NO 3.5L EcoBoost, NO 5.0L Coyote, NO 6.2L Boss, NO SVT Raptor.
//     (Raptor launched late-2009 as a 2010 model. EcoBoost/Coyote arrive 2011.)
//   - Engines: 4.6L 2V Triton (base, XL/STX), 4.6L 3V Triton (XL/STX/XLT),
//     5.4L 3V Triton (mid/upper trims).
//   - Transmissions: the 4.6 2V used the 4R70E and the 4.6 3V / 5.4 3V used
//     the 4R75E in 2009 — the 6R80 6-speed did NOT arrive until 2010.
//     CAVEAT: the project-wide TransmissionId type only has "4r75e" | "6r80"
//     (see types.ts) — there is no "4r70e" or "4r70w" literal. We map both
//     the 4R70E and 4R75E to `transmission: "4r75e"` because they are the
//     same family (4R70/4R75 share the 4-speed architecture, identical case,
//     bellhousing, and most service procedures). The per-engine notes call
//     out the historical 4R70E pairing on the 4.6 2V for any future agent
//     extending the TransmissionId union. DO NOT introduce a "6r80" entry
//     for 2009 — the 6-speed was a 2010 running change.
//   - Platinum is BRAND-NEW for 2009 (first model year of the trim).
//   - FX2 Sport is the 4x2 sport package (FX4's 2WD sibling).
//   - Harley-Davidson F-150 was NOT offered for the 2009 model year — Ford
//     paused the HD partnership during the 11th→12th gen transition and
//     reintroduced it for 2010. Do not add Harley variants here.
//
// Sources reconciled while authoring this file:
//   - Ford 2009 F-150 brochure (archived at auto-brochures.com).
//   - Edmunds 2009 F-150 trim/config matrix.
//   - f150hub.com 2009 production data + engine code tables.
//   - Wikipedia "Ford F-Series (twelfth generation)" — 2009 launch details.
//   - existing lib/knowledge/vehicles/years/2010.ts (exemplar pattern).
//
// Color palette mapping note:
//   The 2009 brochure colors map to the ExteriorColorId union (types.ts)
//   as follows. Where the brochure name doesn't have a 1:1 match, we use
//   the closest sibling and document it inline:
//     "Tuxedo Black"              → tuxedo_black
//     "Oxford White"              → oxford_white
//     "Sterling Gray Metallic"    → sterling_grey
//     "Royal Red Metallic"        → royal_red
//     "Sangria Red Metallic"      → sangria_red
//     "Dark Blue Pearl Metallic"  → dark_blue_pearl
//     "Brilliant Silver Metallic" → ingot_silver  (closest gray-silver match;
//                                   the brochure-specific BSM hue is not in
//                                   the ExteriorColorId union)
//     "Pueblo Gold Metallic" (KR) → pueblo_gold
//     "White Suede"               → (NOT REPRESENTABLE — not in union)
//                                   Omitted from the 2009 palette. Future
//                                   ExteriorColorId expansion can backfill.
//
// What is INTENTIONALLY omitted (do not add without owner-data evidence):
//   - SVT Raptor (launched as a 2010 MY truck).
//   - Harley-Davidson (skipped for 2009 MY).
//   - 6.2L Boss V8 (mid-2010 introduction).
//   - 3.5L EcoBoost / 5.0L Coyote / 3.7L Ti-VCT (all 2011+).
//   - Limited trim (debuted 2013).
//   - Tremor package (2014 only).
//   - Fleet-only stripped XLs (deleted A/C, vinyl floor).
//   - Mexico-build King Ranch with metric gauges (export market).

import type {
  AxleRatio,
  BedLengthId,
  CabConfigId,
  DrivetrainId,
  EngineId,
  ExteriorColorId,
  InteriorColorId,
  OptionPackageId,
  TransmissionId,
  TrimId,
  VehicleVariant,
  YearLineup,
} from "../types";

const YEAR = 2009 as const;

// Stable key for a variant. Mirrors LINEUP-PLAN section 2: each entry is
// keyed `${year}-${trim}-${engine}-${cab}-${bed}-${drive}`.
function key(
  trim: TrimId,
  engine: EngineId,
  cab: CabConfigId,
  bed: BedLengthId,
  drive: DrivetrainId,
): string {
  return `${YEAR}-${trim}-${engine}-${cab}-${bed}-${drive}`;
}

// ---------------------------------------------------------------------------
// Color palettes by trim tier. The 2009 launch palette is documented in the
// file header. XL/STX have the shortest work-truck palettes; upper trims
// expand into the metallics.
// ---------------------------------------------------------------------------

const XL_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver", // mapped from "Brilliant Silver Metallic"
  "royal_red",
  "dark_blue_pearl",
];

const STX_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "royal_red",
  "dark_blue_pearl",
];

const XLT_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "royal_red",
  "sangria_red",
  "dark_blue_pearl",
];

// FX2 Sport + FX4 share the sport palette in 2009: blacked-out trim with
// bold metallic accents. Both reds are available; no Pueblo Gold (luxury).
const FX_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "royal_red",
  "sangria_red",
];

const LARIAT_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "royal_red",
  "sangria_red",
  "dark_blue_pearl",
  "pueblo_gold",
];

// King Ranch 2009 retained the saddle-friendly palette inherited from the
// outgoing 11th-gen KR: Tuxedo Black, Pueblo Gold, Sangria Red.
const KING_RANCH_COLORS: ExteriorColorId[] = [
  "tuxedo_black",
  "pueblo_gold",
  "sangria_red",
];

// Platinum (introduced for 2009) used the upmarket palette. White Platinum
// Tri-coat was not yet offered (that arrived 2010), so 2009 Platinum is
// effectively Tuxedo Black / Sterling Grey / Sangria Red dominant.
const PLATINUM_COLORS: ExteriorColorId[] = [
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "sangria_red",
];

// Interior color palettes by trim.
const WORK_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone"];
const VOLUME_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone", "tan"];
const LUXURY_INTERIORS: InteriorColorId[] = [
  "steel_grey",
  "medium_stone",
  "tan",
  "black_two_tone",
];
const KING_RANCH_INTERIORS: InteriorColorId[] = ["king_ranch_chaparral"];
const PLATINUM_INTERIORS: InteriorColorId[] = ["black_two_tone", "steel_grey"];

// Option package availability by trim. Same RPO-style slugs as 2010, gated
// by trim. Note: lariat_plus_package was a 2010+ name; not offered in 2009.
const XL_PACKAGES: OptionPackageId[] = [
  "max_trailer_tow",
  "heavy_duty_payload",
  "snowplow_prep",
];
const STX_PACKAGES: OptionPackageId[] = ["max_trailer_tow"];
const XLT_PACKAGES: OptionPackageId[] = [
  "xlt_chrome_package",
  "xlt_convenience_package",
  "max_trailer_tow",
  "heavy_duty_payload",
  "snowplow_prep",
];
const FX2_PACKAGES: OptionPackageId[] = ["fx_appearance_package", "fx_luxury_package"];
const FX4_PACKAGES: OptionPackageId[] = [
  "fx_appearance_package",
  "fx_luxury_package",
  "off_road_package",
  "max_trailer_tow",
];
const LARIAT_PACKAGES: OptionPackageId[] = [
  "lariat_chrome_package",
  "lariat_luxury_package",
  "max_trailer_tow",
  "heavy_duty_payload",
];

// ---------------------------------------------------------------------------
// Variant builder helper. Matches the shape used in years/2010.ts so the
// per-year files stay diff-friendly.
// ---------------------------------------------------------------------------
function makeVariant(args: {
  trim: TrimId;
  engine: EngineId;
  transmission: TransmissionId;
  cab: CabConfigId;
  bed: BedLengthId;
  drive: DrivetrainId;
  axleRatio: AxleRatio;
  towPackage: boolean;
  exteriorColorsAvailable: ExteriorColorId[];
  interiorColorsAvailable: InteriorColorId[];
  optionPackagesAvailable?: OptionPackageId[];
  notes?: string[];
}): VehicleVariant {
  return {
    variantKey: key(args.trim, args.engine, args.cab, args.bed, args.drive),
    year: YEAR,
    trim: args.trim,
    engine: args.engine,
    transmission: args.transmission,
    cab: args.cab,
    bed: args.bed,
    drive: args.drive,
    axleRatio: args.axleRatio,
    towPackage: args.towPackage,
    exteriorColorsAvailable: args.exteriorColorsAvailable,
    interiorColorsAvailable: args.interiorColorsAvailable,
    optionPackagesAvailable: args.optionPackagesAvailable,
    notes: args.notes,
  };
}

// ---------------------------------------------------------------------------
// XL: 4.6 2V / 4.6 3V / 5.4 3V. RC + SC. RC: 6.5/8ft. SC: 6.5/8ft.
// 4x2 or 4x4. 4.6 2V → 4R70E (mapped to 4r75e id). 4.6 3V / 5.4 3V → 4R75E.
// ---------------------------------------------------------------------------

const XL_VARIANTS: VehicleVariant[] = [];

// XL RegCab — 6.5ft and 8ft beds, all three engines.
for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
  for (const bed of ["6_5ft", "8ft"] as BedLengthId[]) {
    XL_VARIANTS.push(
      makeVariant({
        trim: "xl",
        engine: "4_6l_2v",
        transmission: "4r75e",
        cab: "regular_cab",
        bed,
        drive,
        axleRatio: drive === "4x4" ? "3.55" : "3.31",
        towPackage: false,
        exteriorColorsAvailable: XL_COLORS,
        interiorColorsAvailable: WORK_INTERIORS,
        optionPackagesAvailable: XL_PACKAGES,
        notes: [
          "Base 2009 work-truck spec. 4.6 2V Triton paired with 4R70E 4-speed.",
          "TransmissionId 4r75e here covers the 4R70/4R75 family (no 4r70e literal in types).",
        ],
      }),
      makeVariant({
        trim: "xl",
        engine: "4_6l_3v",
        transmission: "4r75e",
        cab: "regular_cab",
        bed,
        drive,
        axleRatio: drive === "4x4" ? "3.55" : "3.31",
        towPackage: false,
        exteriorColorsAvailable: XL_COLORS,
        interiorColorsAvailable: WORK_INTERIORS,
        optionPackagesAvailable: XL_PACKAGES,
        notes: ["4.6 3V Triton + 4R75E. 6R80 not available until 2010."],
      }),
      makeVariant({
        trim: "xl",
        engine: "5_4l_3v",
        transmission: "4r75e",
        cab: "regular_cab",
        bed,
        drive,
        axleRatio: "3.73",
        towPackage: true,
        exteriorColorsAvailable: XL_COLORS,
        interiorColorsAvailable: WORK_INTERIORS,
        optionPackagesAvailable: XL_PACKAGES,
        notes: ["5.4 3V Triton + 4R75E. Common fleet-tow spec."],
      }),
    );
  }
}

// XL SuperCab — 6.5ft and 8ft beds.
for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
  for (const bed of ["6_5ft", "8ft"] as BedLengthId[]) {
    XL_VARIANTS.push(
      makeVariant({
        trim: "xl",
        engine: "4_6l_2v",
        transmission: "4r75e",
        cab: "supercab",
        bed,
        drive,
        axleRatio: drive === "4x4" ? "3.55" : "3.31",
        towPackage: false,
        exteriorColorsAvailable: XL_COLORS,
        interiorColorsAvailable: WORK_INTERIORS,
        optionPackagesAvailable: XL_PACKAGES,
      }),
      makeVariant({
        trim: "xl",
        engine: "4_6l_3v",
        transmission: "4r75e",
        cab: "supercab",
        bed,
        drive,
        axleRatio: drive === "4x4" ? "3.55" : "3.31",
        towPackage: false,
        exteriorColorsAvailable: XL_COLORS,
        interiorColorsAvailable: WORK_INTERIORS,
        optionPackagesAvailable: XL_PACKAGES,
      }),
      makeVariant({
        trim: "xl",
        engine: "5_4l_3v",
        transmission: "4r75e",
        cab: "supercab",
        bed,
        drive,
        axleRatio: "3.73",
        towPackage: true,
        exteriorColorsAvailable: XL_COLORS,
        interiorColorsAvailable: WORK_INTERIORS,
        optionPackagesAvailable: XL_PACKAGES,
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// STX: 4.6 3V / 5.4 3V. RC + SC. 6.5ft. 4x2 or 4x4. 4R75E.
// (Sport-value trim — blacked-out grille, body-color bumpers.)
// ---------------------------------------------------------------------------

const STX_VARIANTS: VehicleVariant[] = [];

for (const cab of ["regular_cab", "supercab"] as CabConfigId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of ["4_6l_3v", "5_4l_3v"] as EngineId[]) {
      STX_VARIANTS.push(
        makeVariant({
          trim: "stx",
          engine,
          transmission: "4r75e",
          cab,
          bed: "6_5ft",
          drive,
          axleRatio: engine === "5_4l_3v" ? "3.55" : "3.31",
          towPackage: engine === "5_4l_3v",
          exteriorColorsAvailable: STX_COLORS,
          interiorColorsAvailable: WORK_INTERIORS,
          optionPackagesAvailable: STX_PACKAGES,
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// XLT: 4.6 3V / 5.4 3V. RC + SC + CC.
//   RC: 6.5/8ft. SC: 6.5/8ft. CC: 5.5/6.5ft.
// 4x2 or 4x4. 4R75E.
// ---------------------------------------------------------------------------

const XLT_VARIANTS: VehicleVariant[] = [];

const XLT_CAB_BEDS: Array<[CabConfigId, BedLengthId]> = [
  ["regular_cab", "6_5ft"],
  ["regular_cab", "8ft"],
  ["supercab", "6_5ft"],
  ["supercab", "8ft"],
  ["supercrew", "5_5ft"],
  ["supercrew", "6_5ft"],
];

for (const [cab, bed] of XLT_CAB_BEDS) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of ["4_6l_3v", "5_4l_3v"] as EngineId[]) {
      XLT_VARIANTS.push(
        makeVariant({
          trim: "xlt",
          engine,
          transmission: "4r75e",
          cab,
          bed,
          drive,
          axleRatio: engine === "5_4l_3v" ? "3.55" : "3.31",
          towPackage: engine === "5_4l_3v",
          exteriorColorsAvailable: XLT_COLORS,
          interiorColorsAvailable: VOLUME_INTERIORS,
          optionPackagesAvailable: XLT_PACKAGES,
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// FX2 Sport: 5.4 3V. SuperCab + SuperCrew. SC: 6.5. CC: 5.5/6.5.
// 4x2 only. 4R75E. Sport-styling counterpart to the FX4.
// ---------------------------------------------------------------------------

const FX2_VARIANTS: VehicleVariant[] = [
  makeVariant({
    trim: "fx2",
    engine: "5_4l_3v",
    transmission: "4r75e",
    cab: "supercab",
    bed: "6_5ft",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: false,
    exteriorColorsAvailable: FX_COLORS,
    interiorColorsAvailable: LUXURY_INTERIORS,
    optionPackagesAvailable: FX2_PACKAGES,
    notes: ["FX2 = 4x2-only sport pkg. Body-color trim, FX badging."],
  }),
  makeVariant({
    trim: "fx2",
    engine: "5_4l_3v",
    transmission: "4r75e",
    cab: "supercrew",
    bed: "5_5ft",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: false,
    exteriorColorsAvailable: FX_COLORS,
    interiorColorsAvailable: LUXURY_INTERIORS,
    optionPackagesAvailable: FX2_PACKAGES,
  }),
  makeVariant({
    trim: "fx2",
    engine: "5_4l_3v",
    transmission: "4r75e",
    cab: "supercrew",
    bed: "6_5ft",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: false,
    exteriorColorsAvailable: FX_COLORS,
    interiorColorsAvailable: LUXURY_INTERIORS,
    optionPackagesAvailable: FX2_PACKAGES,
  }),
];

// ---------------------------------------------------------------------------
// FX4: 5.4 3V. SuperCab + SuperCrew. SC: 6.5. CC: 5.5/6.5.
// 4x4 only. 4R75E. Off-road package std.
// ---------------------------------------------------------------------------

const FX4_VARIANTS: VehicleVariant[] = [
  makeVariant({
    trim: "fx4",
    engine: "5_4l_3v",
    transmission: "4r75e",
    cab: "supercab",
    bed: "6_5ft",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: true,
    exteriorColorsAvailable: FX_COLORS,
    interiorColorsAvailable: LUXURY_INTERIORS,
    optionPackagesAvailable: FX4_PACKAGES,
    notes: ["Off-road package std. ESOF transfer case BW4419."],
  }),
  makeVariant({
    trim: "fx4",
    engine: "5_4l_3v",
    transmission: "4r75e",
    cab: "supercrew",
    bed: "5_5ft",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: true,
    exteriorColorsAvailable: FX_COLORS,
    interiorColorsAvailable: LUXURY_INTERIORS,
    optionPackagesAvailable: FX4_PACKAGES,
  }),
  makeVariant({
    trim: "fx4",
    engine: "5_4l_3v",
    transmission: "4r75e",
    cab: "supercrew",
    bed: "6_5ft",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: true,
    exteriorColorsAvailable: FX_COLORS,
    interiorColorsAvailable: LUXURY_INTERIORS,
    optionPackagesAvailable: FX4_PACKAGES,
  }),
];

// ---------------------------------------------------------------------------
// Lariat: 5.4 3V. SuperCab + SuperCrew. SC: 6.5. CC: 5.5/6.5. 4x2 or 4x4. 4R75E.
// ---------------------------------------------------------------------------

const LARIAT_VARIANTS: VehicleVariant[] = [];

const LARIAT_CAB_BEDS: Array<[CabConfigId, BedLengthId]> = [
  ["supercab", "6_5ft"],
  ["supercrew", "5_5ft"],
  ["supercrew", "6_5ft"],
];

for (const [cab, bed] of LARIAT_CAB_BEDS) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    LARIAT_VARIANTS.push(
      makeVariant({
        trim: "lariat",
        engine: "5_4l_3v",
        transmission: "4r75e",
        cab,
        bed,
        drive,
        axleRatio: "3.55",
        towPackage: false,
        exteriorColorsAvailable: LARIAT_COLORS,
        interiorColorsAvailable: LUXURY_INTERIORS,
        optionPackagesAvailable: LARIAT_PACKAGES,
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// King Ranch: 5.4 3V. SuperCrew only. 5.5/6.5. 4x2 or 4x4. 4R75E.
// Chaparral leather, restricted exterior palette.
// ---------------------------------------------------------------------------

const KING_RANCH_VARIANTS: VehicleVariant[] = [];

for (const bed of ["5_5ft", "6_5ft"] as BedLengthId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    KING_RANCH_VARIANTS.push(
      makeVariant({
        trim: "king_ranch",
        engine: "5_4l_3v",
        transmission: "4r75e",
        cab: "supercrew",
        bed,
        drive,
        axleRatio: "3.55",
        towPackage: false,
        exteriorColorsAvailable: KING_RANCH_COLORS,
        interiorColorsAvailable: KING_RANCH_INTERIORS,
        optionPackagesAvailable: ["max_trailer_tow"],
        notes: ["Chaparral leather std. Restricted exterior palette."],
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// Platinum (NEW for 2009): 5.4 3V. SuperCrew only. 5.5/6.5. 4x2 or 4x4. 4R75E.
// 20in polished aluminum wheels, two-tone leather, brushed metal trim.
// ---------------------------------------------------------------------------

const PLATINUM_VARIANTS: VehicleVariant[] = [];

for (const bed of ["5_5ft", "6_5ft"] as BedLengthId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    PLATINUM_VARIANTS.push(
      makeVariant({
        trim: "platinum",
        engine: "5_4l_3v",
        transmission: "4r75e",
        cab: "supercrew",
        bed,
        drive,
        axleRatio: "3.55",
        towPackage: false,
        exteriorColorsAvailable: PLATINUM_COLORS,
        interiorColorsAvailable: PLATINUM_INTERIORS,
        optionPackagesAvailable: ["max_trailer_tow"],
        notes: [
          "Platinum debuts for 2009 as the new top-of-line non-KR trim.",
          "20in polished aluminum wheels std. White Platinum Tri-coat not yet offered (2010+).",
        ],
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// Aggregate.
// ---------------------------------------------------------------------------

const ALL_2009_VARIANTS: VehicleVariant[] = [
  ...XL_VARIANTS,
  ...STX_VARIANTS,
  ...XLT_VARIANTS,
  ...FX2_VARIANTS,
  ...FX4_VARIANTS,
  ...LARIAT_VARIANTS,
  ...KING_RANCH_VARIANTS,
  ...PLATINUM_VARIANTS,
];

export const LINEUP_2009: YearLineup = {
  year: YEAR,
  variants: ALL_2009_VARIANTS,
  exteriorColorsOffered: [
    "oxford_white",
    "tuxedo_black",
    "ingot_silver", // "Brilliant Silver Metallic" closest match
    "sterling_grey",
    "royal_red",
    "sangria_red",
    "dark_blue_pearl",
    "pueblo_gold",
  ],
  notableChanges: [
    "12th generation (P415) launches — all-new frame, body, and interior.",
    "Platinum trim introduced as the new flagship luxury offering.",
    "FX2 Sport joins FX4 as a 4x2 sport-styling counterpart.",
    "Engines: 4.6L 2V Triton (base), 4.6L 3V Triton, 5.4L 3V Triton. NO EcoBoost, Coyote, or Boss V8 yet.",
    "Transmissions: 4R70E (paired with 4.6 2V) and 4R75E (paired with 4.6 3V / 5.4 3V). 6R80 6-speed arrives 2010.",
    "SVT Raptor and Harley-Davidson F-150 NOT offered in 2009 MY.",
  ],
};

// ---------------------------------------------------------------------------
// Query helpers (keyed lookups; O(1) via a Map built once at module load).
// ---------------------------------------------------------------------------

const VARIANT_INDEX: Map<string, VehicleVariant> = new Map(
  ALL_2009_VARIANTS.map((v) => [v.variantKey, v]),
);

export function getVariant2009(variantKey: string): VehicleVariant | undefined {
  return VARIANT_INDEX.get(variantKey);
}

export function getVariantsForTrim2009(trim: TrimId): VehicleVariant[] {
  return ALL_2009_VARIANTS.filter((v) => v.trim === trim);
}

export function getVariantsForEngine2009(engine: EngineId): VehicleVariant[] {
  return ALL_2009_VARIANTS.filter((v) => v.engine === engine);
}

export function getAllVariants2009(): VehicleVariant[] {
  return ALL_2009_VARIANTS;
}
