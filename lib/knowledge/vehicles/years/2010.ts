// 2010 Ford F-150 lineup — per-variant codification (LINEUP-PLAN Phase 1).
//
// Sources reconciled while authoring this file:
//   - Ford 2010 F-150 brochure (archived at auto-brochures.com).
//   - Edmunds 2010 F-150 trim/config matrix.
//   - f150hub.com 2010 production data.
//   - existing lib/knowledge/vehicles/trims.ts (year 2010 entries).
//
// Each VehicleVariant is a realistic (year, trim, engine, cab, bed, drive)
// combination that Ford actually built in 2010. Axle ratios reflect the
// most common Ford build options — towing-equipped trucks get 3.73, max-tow
// Raptors get 4.10. Color availability is per-trim (XL has the smallest
// palette, Platinum gets the unique White Platinum Tri-coat, King Ranch is
// restricted to the saddle-friendly palette of Tuxedo Black + Pueblo Gold +
// Sangria Red).
//
// Mid-year notes captured in `midYearIntroductions`:
//   - SVT Raptor launched late 2009 as a 2010 model with the 5.4L 3V. The
//     6.2L Boss arrived as a mid-2010 running change. Both are listed.
//
// What is INTENTIONALLY omitted (do not add without owner-data evidence):
//   - Fleet-only stripped XLs (deleted A/C, vinyl floor).
//   - Mexico-build King Ranch with metric gauges (export market).
//   - Flex-fuel-only FFV SKUs (the 5.4 3V is flex-fuel-capable per
//     engines.ts; we don't proliferate variants for that flag).

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

const YEAR = 2010 as const;

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

// Color palettes by trim tier. XL/STX work-truck palette is intentionally
// short; the luxury trims add metallic premiums.
const XL_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "royal_red",
  "blue_flame",
  "dark_blue_pearl",
];

const STX_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "royal_red",
  "blue_flame",
  "vermillion_red",
];

const XLT_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "royal_red",
  "blue_flame",
  "dark_blue_pearl",
  "vermillion_red",
  "sangria_red",
  "golden_bronze",
  "autumn_red",
  "cinnamon_glaze",
];

const FX_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "royal_red",
  "blue_flame",
  "vermillion_red",
  "sangria_red",
];

const LARIAT_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "royal_red",
  "blue_flame",
  "dark_blue_pearl",
  "sangria_red",
  "golden_bronze",
  "autumn_red",
  "cinnamon_glaze",
  "pueblo_gold",
];

// King Ranch was famously restricted to a saddle-friendly palette in 2010.
const KING_RANCH_COLORS: ExteriorColorId[] = [
  "tuxedo_black",
  "pueblo_gold",
  "sangria_red",
];

// Platinum uniquely offered the White Platinum Metallic Tri-coat premium.
const PLATINUM_COLORS: ExteriorColorId[] = [
  "white_platinum_tri_coat",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "sangria_red",
];

// Harley-Davidson 2010 was effectively Tuxedo Black only as the headline
// finish, with Lava Red Metallic as a rare alternate. We document Tuxedo
// Black only since Lava Red is not in the 2010 ExteriorColorId palette
// (it is a later-year Harley exclusive).
const HARLEY_COLORS: ExteriorColorId[] = ["tuxedo_black"];

// SVT Raptor 2010 launch palette.
const RAPTOR_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "blue_flame",
];

// Interior color palettes by trim.
const WORK_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone"];
const VOLUME_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone", "tan"];
const LUXURY_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone", "tan", "black_two_tone"];
const KING_RANCH_INTERIORS: InteriorColorId[] = ["king_ranch_chaparral"];
const PLATINUM_INTERIORS: InteriorColorId[] = ["black_two_tone", "steel_grey"];
const HARLEY_INTERIORS: InteriorColorId[] = ["black_two_tone"];
const RAPTOR_INTERIORS: InteriorColorId[] = ["steel_grey", "black_two_tone"];

// Option package availability by trim.
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

// Realistic axle-ratio defaults. Tow-equipped trucks get 3.73; otherwise
// 3.55 is the default 2010 build for V8 4x4 trucks. The Raptor max-tow
// 4.10 is documented separately on its variant entries.
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
// XL: 4.6 2V / 4.6 3V / 5.4 3V across RegCab + SuperCab. RegCab also 8ft.
// 4x2 and 4x4. 4.6 2V → 4R75E. 4.6 3V / 5.4 3V → 6R80.
// ---------------------------------------------------------------------------

const XL_VARIANTS: VehicleVariant[] = [];

// XL RegCab — 6.5ft and 8ft beds.
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
        notes: ["Base work-truck config. 4R75E 4-speed."],
      }),
      makeVariant({
        trim: "xl",
        engine: "4_6l_3v",
        transmission: "6r80",
        cab: "regular_cab",
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
        transmission: "6r80",
        cab: "regular_cab",
        bed,
        drive,
        axleRatio: "3.73",
        towPackage: true,
        exteriorColorsAvailable: XL_COLORS,
        interiorColorsAvailable: WORK_INTERIORS,
        optionPackagesAvailable: XL_PACKAGES,
        notes: ["5.4 RegCab XL is a common fleet-tow spec."],
      }),
    );
  }
}

// XL SuperCab — 6.5ft only (RegCab 8ft was the long-bed option in 2010 for
// the SuperCab; SuperCab 8ft was not a standard 2010 XL configuration).
// TODO: verify SuperCab 8ft XL availability — some 2010 Ford configurators
// suggest it was rare-but-real.
for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
  XL_VARIANTS.push(
    makeVariant({
      trim: "xl",
      engine: "4_6l_2v",
      transmission: "4r75e",
      cab: "supercab",
      bed: "6_5ft",
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
      transmission: "6r80",
      cab: "supercab",
      bed: "6_5ft",
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
      transmission: "6r80",
      cab: "supercab",
      bed: "6_5ft",
      drive,
      axleRatio: "3.73",
      towPackage: true,
      exteriorColorsAvailable: XL_COLORS,
      interiorColorsAvailable: WORK_INTERIORS,
      optionPackagesAvailable: XL_PACKAGES,
    }),
  );
}

// ---------------------------------------------------------------------------
// STX: 4.6 3V / 5.4 3V. RegCab + SuperCab. 6.5ft. 4x2 or 4x4. 6R80.
// ---------------------------------------------------------------------------

const STX_VARIANTS: VehicleVariant[] = [];

for (const cab of ["regular_cab", "supercab"] as CabConfigId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of ["4_6l_3v", "5_4l_3v"] as EngineId[]) {
      STX_VARIANTS.push(
        makeVariant({
          trim: "stx",
          engine,
          transmission: "6r80",
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
// XLT: 4.6 3V / 5.4 3V. RC + SC + CC. RC: 6.5/8ft. SC: 6.5/8ft. CC: 5.5/6.5.
// 4x2 or 4x4. 6R80.
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
          transmission: "6r80",
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
// FX2 Sport: 5.4 3V. SuperCab + SuperCrew. SC: 6.5. CC: 5.5/6.5. 4x2 only.
// 6R80. Rear-wheel-drive sport package.
// ---------------------------------------------------------------------------

const FX2_VARIANTS: VehicleVariant[] = [
  makeVariant({
    trim: "fx2",
    engine: "5_4l_3v",
    transmission: "6r80",
    cab: "supercab",
    bed: "6_5ft",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: false,
    exteriorColorsAvailable: FX_COLORS,
    interiorColorsAvailable: LUXURY_INTERIORS,
    optionPackagesAvailable: FX2_PACKAGES,
    notes: ["FX2 = 4x2-only sport package. Body-color trim, FX badging."],
  }),
  makeVariant({
    trim: "fx2",
    engine: "5_4l_3v",
    transmission: "6r80",
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
    transmission: "6r80",
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
// FX4: 5.4 3V. SuperCab + SuperCrew. SC: 6.5. CC: 5.5/6.5. 4x4 only.
// 6R80. Off-road package standard (skid plates, hill descent, sway-bar
// disconnect on some builds).
// ---------------------------------------------------------------------------

const FX4_VARIANTS: VehicleVariant[] = [
  makeVariant({
    trim: "fx4",
    engine: "5_4l_3v",
    transmission: "6r80",
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
    transmission: "6r80",
    cab: "supercrew",
    bed: "5_5ft",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: true,
    exteriorColorsAvailable: FX_COLORS,
    interiorColorsAvailable: LUXURY_INTERIORS,
    optionPackagesAvailable: FX4_PACKAGES,
    notes: ["Common Jay-spec config (owner-relevant)."],
  }),
  makeVariant({
    trim: "fx4",
    engine: "5_4l_3v",
    transmission: "6r80",
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
// Lariat: 5.4 3V. SC + CC. SC: 6.5. CC: 5.5/6.5. 4x2 or 4x4. 6R80.
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
        transmission: "6r80",
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
// King Ranch: 5.4 3V. SuperCrew only. 5.5/6.5. 4x2 or 4x4. 6R80.
// ---------------------------------------------------------------------------

const KING_RANCH_VARIANTS: VehicleVariant[] = [];

for (const bed of ["5_5ft", "6_5ft"] as BedLengthId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    KING_RANCH_VARIANTS.push(
      makeVariant({
        trim: "king_ranch",
        engine: "5_4l_3v",
        transmission: "6r80",
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
// Platinum: 5.4 3V. SuperCrew only. 5.5/6.5. 4x2 or 4x4. 6R80.
// ---------------------------------------------------------------------------

const PLATINUM_VARIANTS: VehicleVariant[] = [];

for (const bed of ["5_5ft", "6_5ft"] as BedLengthId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    PLATINUM_VARIANTS.push(
      makeVariant({
        trim: "platinum",
        engine: "5_4l_3v",
        transmission: "6r80",
        cab: "supercrew",
        bed,
        drive,
        axleRatio: "3.55",
        towPackage: false,
        exteriorColorsAvailable: PLATINUM_COLORS,
        interiorColorsAvailable: PLATINUM_INTERIORS,
        optionPackagesAvailable: ["max_trailer_tow"],
        notes: ["20in polished aluminum std. White Platinum Tri-coat unique."],
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// Harley-Davidson: 5.4 3V. SuperCrew only. 5.5. 4x2 only (rare). 6R80.
// 22in chrome wheels, HD badging.
// ---------------------------------------------------------------------------

const HARLEY_VARIANTS: VehicleVariant[] = [
  makeVariant({
    trim: "harley_davidson",
    engine: "5_4l_3v",
    transmission: "6r80",
    cab: "supercrew",
    bed: "5_5ft",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: false,
    exteriorColorsAvailable: HARLEY_COLORS,
    interiorColorsAvailable: HARLEY_INTERIORS,
    notes: ["Rare 2WD-only flagship. 22in chrome wheels."],
  }),
];

// ---------------------------------------------------------------------------
// SVT Raptor: 5.4 3V or 6.2 Boss (mid-year). SuperCab only in 2010
// (SuperCrew Raptor arrived for 2011). 5.5. 4x4 std. Trans: 4R75E mapping
// is NOT correct for the Raptor — both engines pair with 6R80 in the Raptor.
// (Earlier draft assumption was wrong: there is no 4R75E Raptor.)
// ---------------------------------------------------------------------------

const RAPTOR_VARIANTS: VehicleVariant[] = [
  makeVariant({
    trim: "svt_raptor",
    engine: "5_4l_3v",
    transmission: "6r80",
    cab: "supercab",
    bed: "5_5ft",
    drive: "4x4",
    axleRatio: "4.10",
    towPackage: false,
    exteriorColorsAvailable: RAPTOR_COLORS,
    interiorColorsAvailable: RAPTOR_INTERIORS,
    notes: [
      "Launch-engine Raptor. 5.4 3V early-2010 build only.",
      "Fox internal-bypass shocks. Torsen front diff optional.",
    ],
  }),
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
      "Mid-year 2010 introduction of the 411hp 6.2L Boss V8.",
      "Became the only Raptor engine for 2011+.",
    ],
  }),
];

// ---------------------------------------------------------------------------
// Aggregate.
// ---------------------------------------------------------------------------

const ALL_2010_VARIANTS: VehicleVariant[] = [
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

export const LINEUP_2010: YearLineup = {
  year: YEAR,
  variants: ALL_2010_VARIANTS,
  exteriorColorsOffered: [
    "oxford_white",
    "tuxedo_black",
    "ingot_silver",
    "sterling_grey",
    "royal_red",
    "blue_flame",
    "dark_blue_pearl",
    "vermillion_red",
    "sangria_red",
    "golden_bronze",
    "autumn_red",
    "cinnamon_glaze",
    "pueblo_gold",
    "white_platinum_tri_coat",
  ],
  notableChanges: [
    "FX2 Sport introduced as the 4x2-only counterpart to FX4.",
    "SVT Raptor launched as a new off-road halo trim.",
    "Final year of the 5.4L 3V Triton in F-150 (the owner's truck's engine).",
    "Final year of the 4R75E 4-speed automatic — only paired with 4.6L 2V.",
  ],
  midYearIntroductions: [
    "6.2L Boss V8 became available in the SVT Raptor mid-year, supplementing the launch 5.4L 3V.",
  ],
};

// ---------------------------------------------------------------------------
// Query helpers (keyed lookups; O(1) via a Map built once at module load).
// ---------------------------------------------------------------------------

const VARIANT_INDEX: Map<string, VehicleVariant> = new Map(
  ALL_2010_VARIANTS.map((v) => [v.variantKey, v]),
);

export function getVariant2010(variantKey: string): VehicleVariant | undefined {
  return VARIANT_INDEX.get(variantKey);
}

export function getVariantsForTrim2010(trim: TrimId): VehicleVariant[] {
  return ALL_2010_VARIANTS.filter((v) => v.trim === trim);
}

export function getVariantsForEngine2010(engine: EngineId): VehicleVariant[] {
  return ALL_2010_VARIANTS.filter((v) => v.engine === engine);
}

export function getAllVariants2010(): VehicleVariant[] {
  return ALL_2010_VARIANTS;
}
