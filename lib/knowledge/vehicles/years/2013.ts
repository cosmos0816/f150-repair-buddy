// 2013 Ford F-150 lineup — per-variant codification (LINEUP-PLAN Phase 1).
//
// 2013 is the second-to-last year of the 12th-generation (P415) F-150. The
// headline news: Ford introduced the **Limited** trim above Platinum, making
// it the new top-of-the-line F-150. Limited is EcoBoost-only, SuperCrew-only,
// loaded with 22" polished aluminum wheels, BLIS, factory navigation, heated/
// cooled massaging front seats, heated second-row seats, and Sony premium
// audio. Base price ~$53K.
//
// Other 2013 specifics captured here:
//   - SYNC w/ MyFord Touch software update (8" capacitive interface refined).
//   - Final year for the FX2 Sport (4x2 sport trim) — gone after 2013.
//   - Harley-Davidson F-150 was dropped after 2012, so it does NOT appear in
//     the 2013 matrix. Limited replaces Harley as the "halo finish" trim.
//   - Ruby Red Tinted Clearcoat introduced as a new premium tri-coat option
//     (documented in notableChanges; not added to the ExteriorColorId union
//     to avoid mutating shared types).
//   - Engines: 3.7L V6 Ti-VCT, 5.0L Coyote, 6.2L Boss, 3.5L EcoBoost.
//     4.6L 2V/3V and 5.4L 3V Tritons were retired after 2010, so they do NOT
//     appear in 2013.
//   - Transmission: 6R80 across the board (the 4R75E was retired with the
//     4.6 2V after 2010).
//   - SVT Raptor continues with the 6.2L Boss only (SuperCab + SuperCrew).
//
// What is INTENTIONALLY omitted (do not add without owner-data evidence):
//   - Harley-Davidson 2013 (discontinued after 2012).
//   - 4.6L / 5.4L Triton variants (retired after 2010).
//   - 4R75E pairings (retired after 2010).
//   - Mexico-build King Ranch with metric gauges (export market).
//   - FFV-only SKU proliferation (flex-fuel is an engine-level flag).

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

const YEAR = 2013 as const;

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
// Color palettes by trim tier. 2013 added Ruby Red Tinted Clearcoat as a
// premium tri-coat (not represented in the shared ExteriorColorId union —
// see notableChanges below). The palettes here use the existing union so
// the 2013 file remains type-clean without mutating shared types.
// ---------------------------------------------------------------------------

const XL_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "blue_flame",
  "vermillion_red",
];

const STX_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "blue_flame",
  "vermillion_red",
];

const XLT_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "blue_flame",
  "vermillion_red",
  "sangria_red",
  "golden_bronze",
  "autumn_red",
];

const FX_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "blue_flame",
  "vermillion_red",
  "sangria_red",
];

const LARIAT_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "blue_flame",
  "sangria_red",
  "golden_bronze",
  "autumn_red",
  "pueblo_gold",
];

// King Ranch in 2013 carried over the saddle-friendly palette.
const KING_RANCH_COLORS: ExteriorColorId[] = [
  "tuxedo_black",
  "pueblo_gold",
  "sangria_red",
  "golden_bronze",
];

// Platinum keeps its White Platinum Tri-coat as the signature finish.
const PLATINUM_COLORS: ExteriorColorId[] = [
  "white_platinum_tri_coat",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "sangria_red",
];

// Limited (NEW for 2013) — top-tier flagship. Restricted, premium-only
// palette anchored on the new White Platinum Tri-coat and Tuxedo Black.
// Ruby Red Tinted Clearcoat was the headline launch color but is not in
// the shared ExteriorColorId union; documented in notableChanges.
const LIMITED_COLORS: ExteriorColorId[] = [
  "white_platinum_tri_coat",
  "tuxedo_black",
  "sterling_grey",
];

// SVT Raptor 2013 palette.
const RAPTOR_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "blue_flame",
  "vermillion_red",
];

// ---------------------------------------------------------------------------
// Interior palettes by trim.
// ---------------------------------------------------------------------------

const WORK_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone"];
const VOLUME_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone", "tan"];
const LUXURY_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone", "tan", "black_two_tone"];
const KING_RANCH_INTERIORS: InteriorColorId[] = ["king_ranch_chaparral"];
const PLATINUM_INTERIORS: InteriorColorId[] = ["black_two_tone", "steel_grey"];
// Limited received a unique two-tone Black/Pecan premium leather treatment
// in 2013; the closest mapping in the shared InteriorColorId union is
// "black_two_tone".
const LIMITED_INTERIORS: InteriorColorId[] = ["black_two_tone"];
const RAPTOR_INTERIORS: InteriorColorId[] = ["steel_grey", "black_two_tone"];

// ---------------------------------------------------------------------------
// Option package availability by trim.
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Variant factory.
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

// Engines available to the volume trims in 2013. The 3.7 V6 is the base
// motor; 5.0 Coyote and 3.5 EcoBoost are the V8-substitute step-ups; 6.2
// Boss is restricted to the Raptor and a small set of HD-tow specials.
const VOLUME_ENGINES: EngineId[] = ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"];

// ---------------------------------------------------------------------------
// XL: 3.7 V6 / 5.0 Coyote / 3.5 EcoBoost. RegCab + SuperCab. RC: 6.5/8ft.
// SC: 6.5ft. 4x2 or 4x4. 6R80 across all engines.
// ---------------------------------------------------------------------------

const XL_VARIANTS: VehicleVariant[] = [];

// XL RegCab — 6.5ft and 8ft beds, all three volume engines.
for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
  for (const bed of ["6_5ft", "8ft"] as BedLengthId[]) {
    for (const engine of VOLUME_ENGINES) {
      XL_VARIANTS.push(
        makeVariant({
          trim: "xl",
          engine,
          transmission: "6r80",
          cab: "regular_cab",
          bed,
          drive,
          axleRatio:
            engine === "3_5l_ecoboost" ? "3.73" : engine === "5_0l_coyote" ? "3.55" : "3.31",
          towPackage: engine !== "3_7l_tivct",
          exteriorColorsAvailable: XL_COLORS,
          interiorColorsAvailable: WORK_INTERIORS,
          optionPackagesAvailable: XL_PACKAGES,
          notes:
            engine === "3_7l_tivct"
              ? ["Base work-truck V6. 302hp Ti-VCT, 6R80."]
              : engine === "3_5l_ecoboost"
                ? ["EcoBoost XL is the high-tow work-truck build."]
                : undefined,
        }),
      );
    }
  }
}

// XL SuperCab — 6.5ft, all three volume engines, both drives.
for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
  for (const engine of VOLUME_ENGINES) {
    XL_VARIANTS.push(
      makeVariant({
        trim: "xl",
        engine,
        transmission: "6r80",
        cab: "supercab",
        bed: "6_5ft",
        drive,
        axleRatio:
          engine === "3_5l_ecoboost" ? "3.73" : engine === "5_0l_coyote" ? "3.55" : "3.31",
        towPackage: engine !== "3_7l_tivct",
        exteriorColorsAvailable: XL_COLORS,
        interiorColorsAvailable: WORK_INTERIORS,
        optionPackagesAvailable: XL_PACKAGES,
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// STX: 3.7 V6 / 5.0 Coyote / 3.5 EcoBoost. RegCab + SuperCab. 6.5ft.
// 4x2 or 4x4. 6R80.
// ---------------------------------------------------------------------------

const STX_VARIANTS: VehicleVariant[] = [];

for (const cab of ["regular_cab", "supercab"] as CabConfigId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of VOLUME_ENGINES) {
      STX_VARIANTS.push(
        makeVariant({
          trim: "stx",
          engine,
          transmission: "6r80",
          cab,
          bed: "6_5ft",
          drive,
          axleRatio:
            engine === "3_5l_ecoboost" ? "3.73" : engine === "5_0l_coyote" ? "3.55" : "3.31",
          towPackage: engine !== "3_7l_tivct",
          exteriorColorsAvailable: STX_COLORS,
          interiorColorsAvailable: WORK_INTERIORS,
          optionPackagesAvailable: STX_PACKAGES,
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// XLT: 3.7 V6 / 5.0 Coyote / 3.5 EcoBoost. RC + SC + CC.
// RC: 6.5/8ft. SC: 6.5/8ft. CC: 5.5/6.5. 4x2 or 4x4. 6R80.
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
    for (const engine of VOLUME_ENGINES) {
      XLT_VARIANTS.push(
        makeVariant({
          trim: "xlt",
          engine,
          transmission: "6r80",
          cab,
          bed,
          drive,
          axleRatio:
            engine === "3_5l_ecoboost" ? "3.55" : engine === "5_0l_coyote" ? "3.55" : "3.31",
          towPackage: engine !== "3_7l_tivct",
          exteriorColorsAvailable: XLT_COLORS,
          interiorColorsAvailable: VOLUME_INTERIORS,
          optionPackagesAvailable: XLT_PACKAGES,
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// FX2 Sport: 5.0 Coyote / 3.5 EcoBoost. SuperCab + SuperCrew. SC: 6.5.
// CC: 5.5/6.5. 4x2 only. 6R80. 2013 is the FINAL year for FX2.
// ---------------------------------------------------------------------------

const FX2_VARIANTS: VehicleVariant[] = [];

const FX2_CAB_BEDS: Array<[CabConfigId, BedLengthId]> = [
  ["supercab", "6_5ft"],
  ["supercrew", "5_5ft"],
  ["supercrew", "6_5ft"],
];

for (const [cab, bed] of FX2_CAB_BEDS) {
  for (const engine of ["5_0l_coyote", "3_5l_ecoboost"] as EngineId[]) {
    FX2_VARIANTS.push(
      makeVariant({
        trim: "fx2",
        engine,
        transmission: "6r80",
        cab,
        bed,
        drive: "4x2",
        axleRatio: "3.55",
        towPackage: false,
        exteriorColorsAvailable: FX_COLORS,
        interiorColorsAvailable: LUXURY_INTERIORS,
        optionPackagesAvailable: FX2_PACKAGES,
        notes: [
          "FX2 = 4x2-only sport package. Body-color trim, FX badging.",
          "2013 is the FINAL year for FX2 in the F-150 lineup.",
        ],
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// FX4: 5.0 Coyote / 6.2 Boss / 3.5 EcoBoost. SuperCab + SuperCrew.
// SC: 6.5. CC: 5.5/6.5. 4x4 only. 6R80. Off-road package std.
// ---------------------------------------------------------------------------

const FX4_VARIANTS: VehicleVariant[] = [];

const FX4_CAB_BEDS: Array<[CabConfigId, BedLengthId]> = [
  ["supercab", "6_5ft"],
  ["supercrew", "5_5ft"],
  ["supercrew", "6_5ft"],
];

for (const [cab, bed] of FX4_CAB_BEDS) {
  for (const engine of ["5_0l_coyote", "6_2l_boss", "3_5l_ecoboost"] as EngineId[]) {
    FX4_VARIANTS.push(
      makeVariant({
        trim: "fx4",
        engine,
        transmission: "6r80",
        cab,
        bed,
        drive: "4x4",
        axleRatio: engine === "6_2l_boss" ? "3.73" : engine === "3_5l_ecoboost" ? "3.73" : "3.55",
        towPackage: true,
        exteriorColorsAvailable: FX_COLORS,
        interiorColorsAvailable: LUXURY_INTERIORS,
        optionPackagesAvailable: FX4_PACKAGES,
        notes: ["Off-road package std. Skid plates, hill-descent control."],
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// Lariat: 5.0 Coyote / 6.2 Boss / 3.5 EcoBoost. SC + CC.
// SC: 6.5. CC: 5.5/6.5. 4x2 or 4x4. 6R80. (6.2 Boss in Lariat is rare
// — typically reserved for HD-tow Lariat builds.)
// ---------------------------------------------------------------------------

const LARIAT_VARIANTS: VehicleVariant[] = [];

const LARIAT_CAB_BEDS: Array<[CabConfigId, BedLengthId]> = [
  ["supercab", "6_5ft"],
  ["supercrew", "5_5ft"],
  ["supercrew", "6_5ft"],
];

for (const [cab, bed] of LARIAT_CAB_BEDS) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of ["5_0l_coyote", "6_2l_boss", "3_5l_ecoboost"] as EngineId[]) {
      LARIAT_VARIANTS.push(
        makeVariant({
          trim: "lariat",
          engine,
          transmission: "6r80",
          cab,
          bed,
          drive,
          axleRatio: engine === "6_2l_boss" ? "3.73" : "3.55",
          towPackage: engine !== "5_0l_coyote",
          exteriorColorsAvailable: LARIAT_COLORS,
          interiorColorsAvailable: LUXURY_INTERIORS,
          optionPackagesAvailable: LARIAT_PACKAGES,
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// King Ranch: 5.0 Coyote / 6.2 Boss / 3.5 EcoBoost. SuperCrew only.
// 5.5/6.5. 4x2 or 4x4. 6R80.
// ---------------------------------------------------------------------------

const KING_RANCH_VARIANTS: VehicleVariant[] = [];

for (const bed of ["5_5ft", "6_5ft"] as BedLengthId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of ["5_0l_coyote", "6_2l_boss", "3_5l_ecoboost"] as EngineId[]) {
      KING_RANCH_VARIANTS.push(
        makeVariant({
          trim: "king_ranch",
          engine,
          transmission: "6r80",
          cab: "supercrew",
          bed,
          drive,
          axleRatio: engine === "6_2l_boss" ? "3.73" : "3.55",
          towPackage: true,
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
// Platinum: 5.0 Coyote / 3.5 EcoBoost. SuperCrew only. 5.5/6.5.
// 4x2 or 4x4. 6R80. (6.2 Boss not offered in Platinum for 2013 — Boss
// shifted toward Raptor + select FX4/Lariat HD-tow builds.)
// ---------------------------------------------------------------------------

const PLATINUM_VARIANTS: VehicleVariant[] = [];

for (const bed of ["5_5ft", "6_5ft"] as BedLengthId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of ["5_0l_coyote", "3_5l_ecoboost"] as EngineId[]) {
      PLATINUM_VARIANTS.push(
        makeVariant({
          trim: "platinum",
          engine,
          transmission: "6r80",
          cab: "supercrew",
          bed,
          drive,
          axleRatio: "3.55",
          towPackage: engine === "3_5l_ecoboost",
          exteriorColorsAvailable: PLATINUM_COLORS,
          interiorColorsAvailable: PLATINUM_INTERIORS,
          optionPackagesAvailable: ["max_trailer_tow"],
          notes: ["20in polished aluminum std. White Platinum Tri-coat available."],
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Limited (NEW for 2013): 3.5 EcoBoost ONLY. SuperCrew ONLY. 5.5/6.5.
// 4x2 or 4x4. 6R80. Top-of-the-line flagship trim above Platinum.
// Standard equipment: 22" polished aluminum wheels, BLIS (blind spot info),
// factory navigation, heated/cooled massaging front seats, heated 2nd-row,
// Sony premium sound, unique badging, premium Black/Pecan leather.
// Base price ~$53K — the priciest F-150 of 2013.
// ---------------------------------------------------------------------------

const LIMITED_VARIANTS: VehicleVariant[] = [];

for (const bed of ["5_5ft", "6_5ft"] as BedLengthId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    LIMITED_VARIANTS.push(
      makeVariant({
        trim: "limited",
        engine: "3_5l_ecoboost",
        transmission: "6r80",
        cab: "supercrew",
        bed,
        drive,
        axleRatio: "3.55",
        towPackage: true,
        exteriorColorsAvailable: LIMITED_COLORS,
        interiorColorsAvailable: LIMITED_INTERIORS,
        optionPackagesAvailable: ["max_trailer_tow"],
        notes: [
          "NEW for 2013 — top trim above Platinum.",
          "EcoBoost-mandatory, SuperCrew-only.",
          "22in polished aluminum wheels std.",
          "BLIS blind-spot info, factory nav, MyFord Touch std.",
          "Heated/cooled massaging front seats; heated 2nd-row seats.",
          "Sony premium audio std. Unique Limited badging.",
          "Premium Black/Pecan two-tone leather std.",
          "Base MSRP ~$53,000 — priciest F-150 of 2013.",
        ],
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// SVT Raptor: 6.2 Boss only. SuperCab + SuperCrew. 5.5ft. 4x4 std. 6R80.
// 2013 carried over the 2012 refresh (HID projector headlamps, new grille,
// Torsen front diff std on SuperCrew Raptor).
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
    notes: ["411hp 6.2L Boss V8. Fox internal-bypass shocks. 4.10 axle std."],
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
      "SuperCrew Raptor — Torsen T2R front diff std for 2013.",
      "Most-popular Raptor body style for daily use.",
    ],
  }),
];

// ---------------------------------------------------------------------------
// Aggregate.
// ---------------------------------------------------------------------------

const ALL_2013_VARIANTS: VehicleVariant[] = [
  ...XL_VARIANTS,
  ...STX_VARIANTS,
  ...XLT_VARIANTS,
  ...FX2_VARIANTS,
  ...FX4_VARIANTS,
  ...LARIAT_VARIANTS,
  ...KING_RANCH_VARIANTS,
  ...PLATINUM_VARIANTS,
  ...LIMITED_VARIANTS,
  ...RAPTOR_VARIANTS,
];

export const LINEUP_2013: YearLineup = {
  year: YEAR,
  variants: ALL_2013_VARIANTS,
  exteriorColorsOffered: [
    "oxford_white",
    "tuxedo_black",
    "ingot_silver",
    "sterling_grey",
    "blue_flame",
    "vermillion_red",
    "sangria_red",
    "golden_bronze",
    "autumn_red",
    "pueblo_gold",
    "white_platinum_tri_coat",
  ],
  notableChanges: [
    "Limited trim INTRODUCED as the new top-of-the-line F-150, slotting above Platinum (EcoBoost-only, SuperCrew-only, ~$53K base).",
    "Limited standard equipment: 22\" polished aluminum wheels, factory navigation, BLIS blind-spot info, heated/cooled massaging front seats, heated second-row seats, Sony premium audio, unique badging.",
    "Ruby Red Tinted Clearcoat introduced as a new premium tri-coat option across the lineup (not yet represented in the shared ExteriorColorId union — flagged here for future expansion).",
    "SYNC w/ MyFord Touch received software updates refining the 8\" capacitive interface.",
    "Harley-Davidson F-150 discontinued after 2012; Limited effectively replaces it as the halo finish trim.",
    "Final year for the FX2 Sport (4x2 sport trim).",
    "6R80 6-speed automatic is the sole transmission across all engines.",
  ],
  midYearIntroductions: [],
};

// ---------------------------------------------------------------------------
// Query helpers (keyed lookups; O(1) via a Map built once at module load).
// ---------------------------------------------------------------------------

const VARIANT_INDEX: Map<string, VehicleVariant> = new Map(
  ALL_2013_VARIANTS.map((v) => [v.variantKey, v]),
);

export function getVariant2013(variantKey: string): VehicleVariant | undefined {
  return VARIANT_INDEX.get(variantKey);
}

export function getVariantsForTrim2013(trim: TrimId): VehicleVariant[] {
  return ALL_2013_VARIANTS.filter((v) => v.trim === trim);
}

export function getVariantsForEngine2013(engine: EngineId): VehicleVariant[] {
  return ALL_2013_VARIANTS.filter((v) => v.engine === engine);
}

export function getAllVariants2013(): VehicleVariant[] {
  return ALL_2013_VARIANTS;
}
