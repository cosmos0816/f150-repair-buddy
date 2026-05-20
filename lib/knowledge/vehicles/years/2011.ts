// 2011 Ford F-150 lineup — per-variant codification (LINEUP-PLAN Phase 2).
//
// 2011 is the MAJOR refresh year for the 12th-gen F-150:
//   - The Triton 5.4L 3V and 4.6L 2V/3V are ALL DROPPED.
//   - The 4R75E 4-speed automatic is RETIRED (6R80 is now the ONLY
//     transmission across the entire lineup).
//   - Four entirely new modern engines arrive: 3.7L Ti-VCT V6 (base),
//     5.0L Coyote V8 (volume), 6.2L Boss V8 (top), 3.5L EcoBoost V6
//     (premium twin-turbo).
//   - SVT Raptor is 6.2L Boss ONLY for 2011 (the launch-window 5.4L 3V
//     Raptor was a 2010-mid-year-only build).
//   - SVT Raptor adds SuperCrew body style for the first time.
//
// Sources reconciled while authoring this file:
//   - Ford 2011 F-150 brochure (archived at auto-brochures.com).
//   - Edmunds 2011 F-150 trim/config matrix.
//   - f150hub.com 2011 engine/transmission production data.
//   - Wikipedia "Ford F-Series (twelfth generation)" — 2011 refresh section.
//   - existing lib/knowledge/vehicles/engines.ts (3.7/5.0/6.2/3.5EB entries).
//
// Key delta vs 2010 (documented inline for grep-ability):
//   - No 4_6l_2v, 4_6l_3v, 5_4l_3v anywhere.
//   - No 4r75e anywhere.
//   - 3_5l_ecoboost added as a premium option to XL/STX/XLT/FX2/FX4/Lariat/KR/Plat.
//   - 6_2l_boss added as a top-tier Lariat/KR/Platinum/HD option.
//   - SVT Raptor SuperCrew (new body style for Raptor in 2011).
//   - Race Red and Pale Adobe Metallic are new 2011 exterior colors.
//   - SYNC w/ MyFord Touch becomes optional on Lariat+.
//
// What is INTENTIONALLY omitted:
//   - Fleet-only stripped XLs (deleted A/C, vinyl floor).
//   - FFV-only flex-fuel SKUs (5.0 Coyote / 6.2 Boss flex-fuel capability
//     is documented in engines.ts; we do not proliferate variants for it).
//   - Mexico-build King Ranch with metric gauges (export-market).

import type {
  AxleRatio,
  CabConfigId,
  BedLengthId,
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

const YEAR = 2011 as const;

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
// Color palettes by trim tier for 2011.
// Notable 2011-only additions: race_red (new for 2011, available across the
// lineup) — Ford rolled this in to replace the orange-leaning vermillion_red
// over time, but both were sold during 2011.
// NOTE on `pale_adobe`: Ford brochures list Pale Adobe Metallic as new for
// 2011 KR/Platinum/Lariat, but ExteriorColorId in types.ts does not yet
// include it (the union covers 2010 + 2014 additions). The 2011 file is
// intentionally restricted to the codified palette; do not invent a
// `pale_adobe` enum member without updating types.ts upstream.
// blue_flame was dropped for 2011 in favor of dark_blue_pearl as the sole
// blue option on most trims; we keep dark_blue_pearl only.
// ---------------------------------------------------------------------------

const XL_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "race_red",
  "dark_blue_pearl",
];

const STX_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "race_red",
  "vermillion_red",
  "dark_blue_pearl",
];

const XLT_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "race_red",
  "vermillion_red",
  "dark_blue_pearl",
  "sangria_red",
  "golden_bronze",
];

const FX_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "race_red",
  "vermillion_red",
  "sangria_red",
];

const LARIAT_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "race_red",
  "vermillion_red",
  "dark_blue_pearl",
  "sangria_red",
  "golden_bronze",
  "pueblo_gold",
];

// King Ranch 2011 retains saddle-friendly palette. Pueblo Gold is the
// signature KR exterior, listed as limited availability.
const KING_RANCH_COLORS: ExteriorColorId[] = [
  "tuxedo_black",
  "pueblo_gold",
  "sangria_red",
  "golden_bronze",
];

// Platinum 2011 keeps the White Platinum Tri-coat exclusive premium.
const PLATINUM_COLORS: ExteriorColorId[] = [
  "white_platinum_tri_coat",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "sangria_red",
];

// Harley-Davidson 2011 stayed Tuxedo Black headline. (Lava Red is a later
// year exclusive not in the 2011 ExteriorColorId palette here.)
const HARLEY_COLORS: ExteriorColorId[] = ["tuxedo_black"];

// SVT Raptor 2011 palette — adds race_red for the new model year, drops
// blue_flame as the 5.4 launch-livery is gone.
const RAPTOR_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "race_red",
  "sangria_red",
];

// Interior color palettes by trim (unchanged from 2010).
const WORK_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone"];
const VOLUME_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone", "tan"];
const LUXURY_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone", "tan", "black_two_tone"];
const KING_RANCH_INTERIORS: InteriorColorId[] = ["king_ranch_chaparral"];
const PLATINUM_INTERIORS: InteriorColorId[] = ["black_two_tone", "steel_grey"];
const HARLEY_INTERIORS: InteriorColorId[] = ["black_two_tone"];
const RAPTOR_INTERIORS: InteriorColorId[] = ["steel_grey", "black_two_tone"];

// Option package availability by trim. 2011 carries forward the same
// OptionPackageId union from types.ts. SYNC w/ MyFord Touch is a Lariat+
// option but is not yet codified as an OptionPackageId in types.ts —
// documented in variant notes instead.
const XL_PACKAGES: OptionPackageId[] = ["max_trailer_tow", "heavy_duty_payload", "snowplow_prep"];
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
  "lariat_plus_package",
  "max_trailer_tow",
  "heavy_duty_payload",
];

// Realistic axle-ratio defaults for 2011.
//   - 3.7 V6 base trucks: 3.15 (4x2) / 3.55 (4x4)
//   - 5.0 V8 volume trucks: 3.31 (4x2) / 3.55 (4x4); 3.73 with max-tow
//   - 6.2 Boss V8: 3.73 standard
//   - 3.5 EcoBoost: 3.55 standard, 3.73 with max-tow (most common spec)
//   - SVT Raptor: 4.10 standard
function defaultAxle(engine: EngineId, drive: DrivetrainId, tow: boolean): AxleRatio {
  if (engine === "6_2l_boss") return "3.73";
  if (engine === "3_5l_ecoboost") return tow ? "3.73" : "3.55";
  if (engine === "5_0l_coyote") {
    if (tow) return "3.73";
    return drive === "4x4" ? "3.55" : "3.31";
  }
  // 3.7 Ti-VCT V6 — base spec axle ratios.
  return drive === "4x4" ? "3.55" : "3.15";
}

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
// XL: 3.7 Ti-VCT / 5.0 Coyote / 3.5 EcoBoost. RC + SC. RC: 6.5/8. SC: 6.5.
// 4x2 + 4x4. 6R80 ONLY (4R75E retired for 2011).
// Per LINEUP-PLAN row "2011 XL": all three engines available — note that
// 6.2 Boss is NOT an XL option (top-tier only).
// ---------------------------------------------------------------------------

const XL_VARIANTS: VehicleVariant[] = [];

// XL RegCab — 6.5ft and 8ft beds.
for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
  for (const bed of ["6_5ft", "8ft"] as BedLengthId[]) {
    for (const engine of ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"] as EngineId[]) {
      const tow = engine !== "3_7l_tivct";
      XL_VARIANTS.push(
        makeVariant({
          trim: "xl",
          engine,
          transmission: "6r80",
          cab: "regular_cab",
          bed,
          drive,
          axleRatio: defaultAxle(engine, drive, tow),
          towPackage: tow,
          exteriorColorsAvailable: XL_COLORS,
          interiorColorsAvailable: WORK_INTERIORS,
          optionPackagesAvailable: XL_PACKAGES,
          notes:
            engine === "3_7l_tivct"
              ? ["New base V6 replaces 4.6L 2V Triton. 6R80 std (no more 4R75E)."]
              : engine === "5_0l_coyote"
                ? ["New 5.0L Coyote replaces 4.6L 3V Triton as mid-trim V8."]
                : ["3.5L EcoBoost twin-turbo — premium fleet-tow option in XL."],
        }),
      );
    }
  }
}

// XL SuperCab — 6.5ft only.
for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
  for (const engine of ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"] as EngineId[]) {
    const tow = engine !== "3_7l_tivct";
    XL_VARIANTS.push(
      makeVariant({
        trim: "xl",
        engine,
        transmission: "6r80",
        cab: "supercab",
        bed: "6_5ft",
        drive,
        axleRatio: defaultAxle(engine, drive, tow),
        towPackage: tow,
        exteriorColorsAvailable: XL_COLORS,
        interiorColorsAvailable: WORK_INTERIORS,
        optionPackagesAvailable: XL_PACKAGES,
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// STX: 3.7 Ti-VCT / 5.0 Coyote / 3.5 EcoBoost. RC + SC. 6.5ft. 4x2 + 4x4. 6R80.
// Per LINEUP-PLAN row "2011 STX": same engine set as XL.
// ---------------------------------------------------------------------------

const STX_VARIANTS: VehicleVariant[] = [];

for (const cab of ["regular_cab", "supercab"] as CabConfigId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"] as EngineId[]) {
      const tow = engine !== "3_7l_tivct";
      STX_VARIANTS.push(
        makeVariant({
          trim: "stx",
          engine,
          transmission: "6r80",
          cab,
          bed: "6_5ft",
          drive,
          axleRatio: defaultAxle(engine, drive, tow),
          towPackage: tow,
          exteriorColorsAvailable: STX_COLORS,
          interiorColorsAvailable: WORK_INTERIORS,
          optionPackagesAvailable: STX_PACKAGES,
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// XLT: 3.7 Ti-VCT / 5.0 Coyote / 3.5 EcoBoost. RC + SC + CC. Full bed matrix.
// 4x2 + 4x4. 6R80.
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
    for (const engine of ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"] as EngineId[]) {
      const tow = engine !== "3_7l_tivct";
      XLT_VARIANTS.push(
        makeVariant({
          trim: "xlt",
          engine,
          transmission: "6r80",
          cab,
          bed,
          drive,
          axleRatio: defaultAxle(engine, drive, tow),
          towPackage: tow,
          exteriorColorsAvailable: XLT_COLORS,
          interiorColorsAvailable: VOLUME_INTERIORS,
          optionPackagesAvailable: XLT_PACKAGES,
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// FX2 Sport: 5.0 Coyote + 3.5 EcoBoost. SC + CC. SC: 6.5. CC: 5.5/6.5.
// 4x2 only. 6R80. (3.7 V6 not offered in FX trims — sport-only V8/EB.)
// Per LINEUP-PLAN row "2011 FX2".
// ---------------------------------------------------------------------------

const FX2_VARIANTS: VehicleVariant[] = [];

const FX_CAB_BEDS: Array<[CabConfigId, BedLengthId]> = [
  ["supercab", "6_5ft"],
  ["supercrew", "5_5ft"],
  ["supercrew", "6_5ft"],
];

for (const [cab, bed] of FX_CAB_BEDS) {
  for (const engine of ["5_0l_coyote", "3_5l_ecoboost"] as EngineId[]) {
    FX2_VARIANTS.push(
      makeVariant({
        trim: "fx2",
        engine,
        transmission: "6r80",
        cab,
        bed,
        drive: "4x2",
        axleRatio: defaultAxle(engine, "4x2", false),
        towPackage: false,
        exteriorColorsAvailable: FX_COLORS,
        interiorColorsAvailable: LUXURY_INTERIORS,
        optionPackagesAvailable: FX2_PACKAGES,
        notes: ["FX2 = 4x2-only sport package. Body-color trim, FX badging."],
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// FX4: 5.0 Coyote + 3.5 EcoBoost. SC + CC. SC: 6.5. CC: 5.5/6.5.
// 4x4 only. 6R80. (No 6.2 Boss in FX4 for 2011 — that comes in 2013.)
// ---------------------------------------------------------------------------

const FX4_VARIANTS: VehicleVariant[] = [];

for (const [cab, bed] of FX_CAB_BEDS) {
  for (const engine of ["5_0l_coyote", "3_5l_ecoboost"] as EngineId[]) {
    FX4_VARIANTS.push(
      makeVariant({
        trim: "fx4",
        engine,
        transmission: "6r80",
        cab,
        bed,
        drive: "4x4",
        axleRatio: defaultAxle(engine, "4x4", true),
        towPackage: true,
        exteriorColorsAvailable: FX_COLORS,
        interiorColorsAvailable: LUXURY_INTERIORS,
        optionPackagesAvailable: FX4_PACKAGES,
        notes: ["Off-road package std. ESOF transfer case BW4419."],
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// Lariat: 5.0 Coyote + 3.5 EcoBoost + 6.2 Boss. SC + CC. SC: 6.5. CC: 5.5/6.5.
// 4x2 + 4x4. 6R80. SYNC w/ MyFord Touch newly optional in 2011.
// ---------------------------------------------------------------------------

const LARIAT_VARIANTS: VehicleVariant[] = [];

const LARIAT_CAB_BEDS: Array<[CabConfigId, BedLengthId]> = [
  ["supercab", "6_5ft"],
  ["supercrew", "5_5ft"],
  ["supercrew", "6_5ft"],
];

for (const [cab, bed] of LARIAT_CAB_BEDS) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of ["5_0l_coyote", "3_5l_ecoboost", "6_2l_boss"] as EngineId[]) {
      LARIAT_VARIANTS.push(
        makeVariant({
          trim: "lariat",
          engine,
          transmission: "6r80",
          cab,
          bed,
          drive,
          axleRatio: defaultAxle(engine, drive, engine === "6_2l_boss"),
          towPackage: engine === "6_2l_boss",
          exteriorColorsAvailable: LARIAT_COLORS,
          interiorColorsAvailable: LUXURY_INTERIORS,
          optionPackagesAvailable: LARIAT_PACKAGES,
          notes: ["SYNC w/ MyFord Touch newly optional in 2011."],
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// King Ranch: 5.0 Coyote + 3.5 EcoBoost + 6.2 Boss. SuperCrew only.
// 5.5/6.5. 4x2 + 4x4. 6R80.
// ---------------------------------------------------------------------------

const KING_RANCH_VARIANTS: VehicleVariant[] = [];

for (const bed of ["5_5ft", "6_5ft"] as BedLengthId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of ["5_0l_coyote", "3_5l_ecoboost", "6_2l_boss"] as EngineId[]) {
      KING_RANCH_VARIANTS.push(
        makeVariant({
          trim: "king_ranch",
          engine,
          transmission: "6r80",
          cab: "supercrew",
          bed,
          drive,
          axleRatio: defaultAxle(engine, drive, engine === "6_2l_boss"),
          towPackage: engine === "6_2l_boss",
          exteriorColorsAvailable: KING_RANCH_COLORS,
          interiorColorsAvailable: KING_RANCH_INTERIORS,
          optionPackagesAvailable: ["max_trailer_tow"],
          notes: ["Chaparral leather std. Restricted exterior palette."],
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Platinum: 5.0 Coyote + 3.5 EcoBoost + 6.2 Boss. SuperCrew only.
// 5.5/6.5. 4x2 + 4x4. 6R80.
// ---------------------------------------------------------------------------

const PLATINUM_VARIANTS: VehicleVariant[] = [];

for (const bed of ["5_5ft", "6_5ft"] as BedLengthId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of ["5_0l_coyote", "3_5l_ecoboost", "6_2l_boss"] as EngineId[]) {
      PLATINUM_VARIANTS.push(
        makeVariant({
          trim: "platinum",
          engine,
          transmission: "6r80",
          cab: "supercrew",
          bed,
          drive,
          axleRatio: defaultAxle(engine, drive, engine === "6_2l_boss"),
          towPackage: engine === "6_2l_boss",
          exteriorColorsAvailable: PLATINUM_COLORS,
          interiorColorsAvailable: PLATINUM_INTERIORS,
          optionPackagesAvailable: ["max_trailer_tow"],
          notes: ["20in polished aluminum std. White Platinum Tri-coat unique."],
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Harley-Davidson: 6.2 Boss ONLY (Triton 5.4 dropped; HD upgraded to 6.2
// per LINEUP-PLAN row "2011 Harley-Davidson"). SuperCrew. 5.5. 4x2 only.
// ---------------------------------------------------------------------------

const HARLEY_VARIANTS: VehicleVariant[] = [
  makeVariant({
    trim: "harley_davidson",
    engine: "6_2l_boss",
    transmission: "6r80",
    cab: "supercrew",
    bed: "5_5ft",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: true,
    exteriorColorsAvailable: HARLEY_COLORS,
    interiorColorsAvailable: HARLEY_INTERIORS,
    notes: [
      "Rare 2WD-only flagship. 22in chrome wheels.",
      "Upgraded to 6.2L Boss V8 in 2011 (replaces 5.4L 3V Triton).",
    ],
  }),
];

// ---------------------------------------------------------------------------
// SVT Raptor: 6.2L Boss ONLY (the 5.4L 3V Raptor was 2010-mid-year-only —
// do NOT add a 2011 5.4 Raptor entry). SuperCab AND SuperCrew (SuperCrew
// Raptor is NEW for 2011). 5.5ft bed. 4x4 std. 6R80.
// ---------------------------------------------------------------------------

const RAPTOR_VARIANTS: VehicleVariant[] = [
  makeVariant({
    trim: "svt_raptor",
    engine: "6_2l_boss",
    transmission: "6r80",
    cab: "supercab",
    bed: "5_5ft",
    drive: "4x4",
    axleRatio: "4.10",
    towPackage: false,
    exteriorColorsAvailable: RAPTOR_COLORS,
    interiorColorsAvailable: RAPTOR_INTERIORS,
    notes: [
      "411hp 6.2L Boss V8 is now the sole Raptor engine.",
      "Fox internal-bypass shocks. Torsen front diff optional.",
    ],
  }),
  makeVariant({
    trim: "svt_raptor",
    engine: "6_2l_boss",
    transmission: "6r80",
    cab: "supercrew",
    bed: "5_5ft",
    drive: "4x4",
    axleRatio: "4.10",
    towPackage: false,
    exteriorColorsAvailable: RAPTOR_COLORS,
    interiorColorsAvailable: RAPTOR_INTERIORS,
    notes: [
      "SuperCrew Raptor — NEW body style for 2011.",
      "Longer wheelbase, family-friendly off-road halo config.",
    ],
  }),
];

// ---------------------------------------------------------------------------
// Aggregate.
// ---------------------------------------------------------------------------

const ALL_2011_VARIANTS: VehicleVariant[] = [
  ...XL_VARIANTS,
  ...STX_VARIANTS,
  ...XLT_VARIANTS,
  ...FX2_VARIANTS,
  ...FX4_VARIANTS,
  ...LARIAT_VARIANTS,
  ...KING_RANCH_VARIANTS,
  ...PLATINUM_VARIANTS,
  ...HARLEY_VARIANTS,
  ...RAPTOR_VARIANTS,
];

export const LINEUP_2011: YearLineup = {
  year: YEAR,
  variants: ALL_2011_VARIANTS,
  exteriorColorsOffered: [
    "oxford_white",
    "tuxedo_black",
    "ingot_silver",
    "sterling_grey",
    "race_red",
    "vermillion_red",
    "dark_blue_pearl",
    "sangria_red",
    "golden_bronze",
    "pueblo_gold",
    "white_platinum_tri_coat",
  ],
  notableChanges: [
    "MAJOR refresh: Triton 4.6L 2V/3V and 5.4L 3V all dropped from F-150.",
    "Four new engines: 3.7L Ti-VCT V6 (base), 5.0L Coyote V8 (volume), 6.2L Boss V8 (top), 3.5L EcoBoost V6 (premium twin-turbo).",
    "4R75E 4-speed automatic retired — 6R80 6-speed is the sole transmission.",
    "SVT Raptor adds SuperCrew body style for the first time.",
    "SVT Raptor is 6.2L Boss only (the 2010-mid-year 5.4L 3V Raptor is gone).",
    "Harley-Davidson edition upgrades to 6.2L Boss V8.",
    "SYNC with MyFord Touch newly optional on Lariat and above.",
    "New exterior colors: Race Red (codified). Pale Adobe Metallic also debuted on Lariat/KR/Platinum but is not yet in the ExteriorColorId union.",
  ],
  midYearIntroductions: [],
};

// ---------------------------------------------------------------------------
// Query helpers (keyed lookups; O(1) via a Map built once at module load).
// Function names suffixed with `2011` to avoid clashing with the 2010
// helpers exported from years/2010.ts via the barrel index.ts.
// ---------------------------------------------------------------------------

const VARIANT_INDEX: Map<string, VehicleVariant> = new Map(
  ALL_2011_VARIANTS.map((v) => [v.variantKey, v]),
);

export function getVariant2011(variantKey: string): VehicleVariant | undefined {
  return VARIANT_INDEX.get(variantKey);
}

export function getVariantsForTrim2011(trim: TrimId): VehicleVariant[] {
  return ALL_2011_VARIANTS.filter((v) => v.trim === trim);
}

export function getVariantsForEngine2011(engine: EngineId): VehicleVariant[] {
  return ALL_2011_VARIANTS.filter((v) => v.engine === engine);
}

export function getAllVariants2011(): VehicleVariant[] {
  return ALL_2011_VARIANTS;
}
