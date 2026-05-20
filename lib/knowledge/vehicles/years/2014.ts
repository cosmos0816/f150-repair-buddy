// 2014 Ford F-150 lineup — per-variant codification (LINEUP-PLAN Phase 3).
//
// 2014 is the FINAL model year of the 12th-generation P415 platform. The
// 13th-gen aluminum-body F-150 launched for the 2015 model year. As a
// "swan-song" year Ford rationalized the engine lineup (no more 4.6L V8s,
// dropped after 2010) and consolidated the sport-truck story:
//
//   - FX2 was DROPPED after 2013. 4x2 sport buyers were funnelled into the
//     STX appearance package or the new RegCab Tremor (3.5 EcoBoost only).
//   - Tremor was NEW for 2014: regular-cab, short-bed (5.5ft) sport truck.
//     Available 4x2 OR 4x4. 3.5L EcoBoost ONLY. 4.10 axle. Monochromatic
//     exterior, 20" wheels, sport-bolstered cloth seats, dark interior.
//     Tremor was offered in just two exterior colors: Tuxedo Black and
//     Race Red.
//   - SVT Raptor's final year. Special Edition package available with
//     unique graphics, beadlock-capable wheels, leather Raptor seats.
//   - Limited continues as the flagship (monochrome two-tone, 22" wheels,
//     unique White Platinum Metallic Tri-coat exterior, navigation std).
//   - King Ranch refresh: new chaparral leather + refined interior trim.
//   - STX appearance package updated (body-color grille bar, 18in wheels).
//
// Engines (Phase 3 consolidation):
//   - 3.7L Ti-VCT V6 (base, FFV)
//   - 5.0L Coyote V8 (workhorse / Lariat default)
//   - 6.2L Boss V8 (Raptor / FX4 max-tow / occasional Lariat)
//   - 3.5L EcoBoost V6 (twin-turbo; volume premium engine + Tremor exclusive)
//
// Transmission: 6R80 across the entire lineup. The 4R75E was retired with
// the 4.6L V8 after 2010. Every 2014 F-150 is a 6-speed automatic.
//
// Sources reconciled while authoring this file:
//   - Ford 2014 F-150 brochure (auto-brochures.com archive).
//   - Edmunds 2014 F-150 trim/config matrix.
//   - f150forum.com "List of 2014 F-150 option codes" thread.
//   - blueovaltrucks.com 2014 Tremor build-sheet decode.
//   - Ford SVT Raptor 2014 Special Edition press release.

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

const YEAR = 2014 as const;

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
// 2014 color palettes by trim tier. Ford rolled in Race Red (replacing
// Vermillion), Ruby Red Metallic Tinted Clearcoat (premium), Blue Jeans
// Metallic (new for 2014), and Kodiak Brown Metallic. Caribou is a King
// Ranch exclusive. White Platinum Tri-coat is restricted to Platinum and
// Limited.
// ---------------------------------------------------------------------------

const XL_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "race_red",
  "blue_jeans",
];

const STX_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "race_red",
  "ruby_red",
  "blue_jeans",
];

const XLT_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "race_red",
  "ruby_red",
  "blue_jeans",
  "kodiak_brown",
];

const FX4_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "race_red",
  "ruby_red",
  "blue_jeans",
  "kodiak_brown",
];

const LARIAT_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "race_red",
  "ruby_red",
  "blue_jeans",
  "kodiak_brown",
];

// King Ranch 2014 keeps a saddle-friendly palette; Caribou Metallic is the
// signature KR-only finish.
const KING_RANCH_COLORS: ExteriorColorId[] = [
  "tuxedo_black",
  "kodiak_brown",
  "caribou",
  "ruby_red",
  "oxford_white",
];

const PLATINUM_COLORS: ExteriorColorId[] = [
  "white_platinum_tri_coat",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "ruby_red",
  "kodiak_brown",
];

// Limited 2014 — flagship two-tone. White Platinum Tri-coat + Tuxedo Black
// were the headline finishes.
const LIMITED_COLORS: ExteriorColorId[] = [
  "white_platinum_tri_coat",
  "tuxedo_black",
];

// SVT Raptor final-year 2014 palette.
const RAPTOR_COLORS: ExteriorColorId[] = [
  "oxford_white",
  "tuxedo_black",
  "ingot_silver",
  "race_red",
  "ruby_red",
  "blue_jeans",
];

// Tremor was offered in Tuxedo Black or Race Red only — confirmed by the
// 2014 Tremor brochure and Ford press kit.
const TREMOR_COLORS: ExteriorColorId[] = ["tuxedo_black", "race_red"];

// ---------------------------------------------------------------------------
// Interior palettes.
// ---------------------------------------------------------------------------

const WORK_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone"];
const VOLUME_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone", "tan"];
const LUXURY_INTERIORS: InteriorColorId[] = ["steel_grey", "medium_stone", "tan", "black_two_tone"];
const KING_RANCH_INTERIORS: InteriorColorId[] = ["king_ranch_chaparral"];
const PLATINUM_INTERIORS: InteriorColorId[] = ["black_two_tone", "steel_grey"];
const LIMITED_INTERIORS: InteriorColorId[] = ["black_two_tone"];
const RAPTOR_INTERIORS: InteriorColorId[] = ["steel_grey", "black_two_tone"];
// Tremor is sport-only — dark interior with Recaro-ish bolsters (cloth or
// optional leather).
const TREMOR_INTERIORS: InteriorColorId[] = ["black_two_tone"];

// ---------------------------------------------------------------------------
// Option package availability by trim. 2014 keeps the FX appearance/off-road
// taxonomy for FX4 only (FX2 is gone). XL gains the same chrome appearance
// upgrades as XLT in 2014.
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
// Helper: build a VehicleVariant with sensible defaults.
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

// Engine → default axle ratio mapping for 2014. 3.7 V6 = 3.55 standard, tow
// gets 3.73. 5.0 Coyote = 3.55, tow 3.73. 6.2 Boss = 3.73 std (heavy-duty).
// 3.5 EcoBoost = 3.55, max-tow 3.73, Tremor & Raptor = 4.10.
function defaultAxle(engine: EngineId, towPackage: boolean): AxleRatio {
  if (engine === "6_2l_boss") return towPackage ? "3.73" : "3.73";
  if (engine === "3_7l_tivct") return towPackage ? "3.73" : "3.55";
  if (engine === "5_0l_coyote") return towPackage ? "3.73" : "3.55";
  if (engine === "3_5l_ecoboost") return towPackage ? "3.73" : "3.55";
  return "3.55";
}

// ---------------------------------------------------------------------------
// XL: 3.7 V6 / 5.0 Coyote / 3.5 EcoBoost. RC + SC + CC. 6R80.
// RegCab: 6.5/8ft. SuperCab: 6.5/8ft. SuperCrew: 5.5/6.5.
// 4x2 or 4x4.
// (XL did NOT get the 6.2 — that engine was reserved for sport/luxury and
// Raptor.)
// ---------------------------------------------------------------------------

const XL_VARIANTS: VehicleVariant[] = [];

const XL_CAB_BEDS: Array<[CabConfigId, BedLengthId]> = [
  ["regular_cab", "6_5ft"],
  ["regular_cab", "8ft"],
  ["supercab", "6_5ft"],
  ["supercab", "8ft"],
  ["supercrew", "5_5ft"],
  ["supercrew", "6_5ft"],
];

const XL_ENGINES: EngineId[] = ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"];

for (const [cab, bed] of XL_CAB_BEDS) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of XL_ENGINES) {
      // 3.5 EcoBoost in XL is unusual but real (fleet-tow spec).
      const tow = engine !== "3_7l_tivct";
      XL_VARIANTS.push(
        makeVariant({
          trim: "xl",
          engine,
          transmission: "6r80",
          cab,
          bed,
          drive,
          axleRatio: defaultAxle(engine, tow),
          towPackage: tow,
          exteriorColorsAvailable: XL_COLORS,
          interiorColorsAvailable: WORK_INTERIORS,
          optionPackagesAvailable: XL_PACKAGES,
          notes:
            engine === "3_5l_ecoboost"
              ? ["EcoBoost XL = fleet-tow spec, uncommon but factory-built."]
              : undefined,
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// STX: 3.7 V6 / 5.0 Coyote / 3.5 EcoBoost. RC + SC + CC.
// 2014 STX expanded across cabs/beds (was RC/SC-only previously).
// RegCab: 6.5ft. SuperCab: 6.5ft. SuperCrew: 5.5/6.5.
// 4x2 or 4x4. 6R80. New body-color appearance package for 2014.
// ---------------------------------------------------------------------------

const STX_VARIANTS: VehicleVariant[] = [];

const STX_CAB_BEDS: Array<[CabConfigId, BedLengthId]> = [
  ["regular_cab", "6_5ft"],
  ["supercab", "6_5ft"],
  ["supercrew", "5_5ft"],
  ["supercrew", "6_5ft"],
];

const STX_ENGINES: EngineId[] = ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"];

for (const [cab, bed] of STX_CAB_BEDS) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of STX_ENGINES) {
      const tow = engine !== "3_7l_tivct";
      STX_VARIANTS.push(
        makeVariant({
          trim: "stx",
          engine,
          transmission: "6r80",
          cab,
          bed,
          drive,
          axleRatio: defaultAxle(engine, tow),
          towPackage: tow,
          exteriorColorsAvailable: STX_COLORS,
          interiorColorsAvailable: WORK_INTERIORS,
          optionPackagesAvailable: STX_PACKAGES,
          notes: ["2014 STX appearance pkg: body-color grille bar, 18in wheels."],
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// XLT: 3.7 V6 / 5.0 Coyote / 3.5 EcoBoost. RC + SC + CC. 6R80.
// RC: 6.5/8ft. SC: 6.5/8ft. CC: 5.5/6.5. 4x2 or 4x4.
// XLT did not get the 6.2 Boss in 2014.
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

const XLT_ENGINES: EngineId[] = ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"];

for (const [cab, bed] of XLT_CAB_BEDS) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of XLT_ENGINES) {
      const tow = engine !== "3_7l_tivct";
      XLT_VARIANTS.push(
        makeVariant({
          trim: "xlt",
          engine,
          transmission: "6r80",
          cab,
          bed,
          drive,
          axleRatio: defaultAxle(engine, tow),
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
// FX4 — 2014 (FX2 was DROPPED after 2013).
// Engines: 5.0 Coyote / 6.2 Boss / 3.5 EcoBoost.
// Cabs: SuperCab + SuperCrew. SC: 6.5ft. CC: 5.5/6.5ft. 4x4 ONLY. 6R80.
// Off-road package std (skid plates, hill descent, electronic locker opt).
// ---------------------------------------------------------------------------

const FX4_VARIANTS: VehicleVariant[] = [];

const FX4_CAB_BEDS: Array<[CabConfigId, BedLengthId]> = [
  ["supercab", "6_5ft"],
  ["supercrew", "5_5ft"],
  ["supercrew", "6_5ft"],
];

const FX4_ENGINES: EngineId[] = ["5_0l_coyote", "6_2l_boss", "3_5l_ecoboost"];

for (const [cab, bed] of FX4_CAB_BEDS) {
  for (const engine of FX4_ENGINES) {
    FX4_VARIANTS.push(
      makeVariant({
        trim: "fx4",
        engine,
        transmission: "6r80",
        cab,
        bed,
        drive: "4x4",
        axleRatio: engine === "6_2l_boss" ? "3.73" : defaultAxle(engine, true),
        towPackage: true,
        exteriorColorsAvailable: FX4_COLORS,
        interiorColorsAvailable: LUXURY_INTERIORS,
        optionPackagesAvailable: FX4_PACKAGES,
        notes: [
          engine === "6_2l_boss"
            ? "6.2 Boss FX4 = max-tow spec, 3.73 axle std."
            : "Off-road package std. ESOF transfer case.",
        ],
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// Lariat: 3.5 EcoBoost / 5.0 Coyote / 6.2 Boss.
// SuperCab + SuperCrew. SC: 6.5ft. CC: 5.5/6.5ft. 4x2 or 4x4. 6R80.
// ---------------------------------------------------------------------------

const LARIAT_VARIANTS: VehicleVariant[] = [];

const LARIAT_CAB_BEDS: Array<[CabConfigId, BedLengthId]> = [
  ["supercab", "6_5ft"],
  ["supercrew", "5_5ft"],
  ["supercrew", "6_5ft"],
];

const LARIAT_ENGINES: EngineId[] = ["5_0l_coyote", "3_5l_ecoboost", "6_2l_boss"];

for (const [cab, bed] of LARIAT_CAB_BEDS) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of LARIAT_ENGINES) {
      // 6.2 Boss Lariat is rare in 4x2; we include both for completeness.
      LARIAT_VARIANTS.push(
        makeVariant({
          trim: "lariat",
          engine,
          transmission: "6r80",
          cab,
          bed,
          drive,
          axleRatio:
            engine === "6_2l_boss" ? "3.73" : defaultAxle(engine, true),
          towPackage: true,
          exteriorColorsAvailable: LARIAT_COLORS,
          interiorColorsAvailable: LUXURY_INTERIORS,
          optionPackagesAvailable: LARIAT_PACKAGES,
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// King Ranch: 5.0 Coyote / 3.5 EcoBoost / 6.2 Boss.
// SuperCrew ONLY. 5.5/6.5ft. 4x2 or 4x4. 6R80.
// 2014: new chaparral leather + refined interior trim.
// ---------------------------------------------------------------------------

const KING_RANCH_VARIANTS: VehicleVariant[] = [];

const KR_ENGINES: EngineId[] = ["5_0l_coyote", "3_5l_ecoboost", "6_2l_boss"];

for (const bed of ["5_5ft", "6_5ft"] as BedLengthId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of KR_ENGINES) {
      KING_RANCH_VARIANTS.push(
        makeVariant({
          trim: "king_ranch",
          engine,
          transmission: "6r80",
          cab: "supercrew",
          bed,
          drive,
          axleRatio:
            engine === "6_2l_boss" ? "3.73" : defaultAxle(engine, true),
          towPackage: true,
          exteriorColorsAvailable: KING_RANCH_COLORS,
          interiorColorsAvailable: KING_RANCH_INTERIORS,
          optionPackagesAvailable: ["max_trailer_tow"],
          notes: [
            "2014 refresh: new chaparral leather, refined interior trim.",
            "Caribou Metallic exclusive to King Ranch.",
          ],
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Platinum: 5.0 Coyote / 3.5 EcoBoost / 6.2 Boss.
// SuperCrew ONLY. 5.5/6.5ft. 4x2 or 4x4. 6R80.
// ---------------------------------------------------------------------------

const PLATINUM_VARIANTS: VehicleVariant[] = [];

const PLATINUM_ENGINES: EngineId[] = ["5_0l_coyote", "3_5l_ecoboost", "6_2l_boss"];

for (const bed of ["5_5ft", "6_5ft"] as BedLengthId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of PLATINUM_ENGINES) {
      PLATINUM_VARIANTS.push(
        makeVariant({
          trim: "platinum",
          engine,
          transmission: "6r80",
          cab: "supercrew",
          bed,
          drive,
          axleRatio:
            engine === "6_2l_boss" ? "3.73" : defaultAxle(engine, true),
          towPackage: true,
          exteriorColorsAvailable: PLATINUM_COLORS,
          interiorColorsAvailable: PLATINUM_INTERIORS,
          optionPackagesAvailable: ["max_trailer_tow"],
          notes: ["22in polished aluminum std. White Platinum Tri-coat optional."],
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Limited: 3.5 EcoBoost ONLY. SuperCrew ONLY. 5.5ft ONLY. 4x4 std.
// (Limited is the flagship — single configuration. EcoBoost only since 2013.)
// 6R80.
// ---------------------------------------------------------------------------

const LIMITED_VARIANTS: VehicleVariant[] = [
  makeVariant({
    trim: "limited",
    engine: "3_5l_ecoboost",
    transmission: "6r80",
    cab: "supercrew",
    bed: "5_5ft",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: true,
    exteriorColorsAvailable: LIMITED_COLORS,
    interiorColorsAvailable: LIMITED_INTERIORS,
    optionPackagesAvailable: ["max_trailer_tow"],
    notes: [
      "Flagship single-spec. EcoBoost-only since 2013.",
      "Two-tone monochrome exterior. 22in polished wheels std.",
      "Navigation, HID headlamps, power running boards, std.",
    ],
  }),
  makeVariant({
    trim: "limited",
    engine: "3_5l_ecoboost",
    transmission: "6r80",
    cab: "supercrew",
    bed: "5_5ft",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: true,
    exteriorColorsAvailable: LIMITED_COLORS,
    interiorColorsAvailable: LIMITED_INTERIORS,
    optionPackagesAvailable: ["max_trailer_tow"],
    notes: ["Rare 4x2 Limited build."],
  }),
];

// ---------------------------------------------------------------------------
// SVT Raptor — FINAL YEAR (2014). 6.2 Boss only. SuperCab + SuperCrew.
// 5.5ft. 4x4 std. 4.10 axle. 6R80.
// 2014 Special Edition package: unique graphics, leather Raptor seats,
// beadlock-capable forged wheels (option), Recaro-style bolsters.
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
      "Final year of the 1st-gen SVT Raptor.",
      "Special Edition pkg: graphics, leather Raptor seats, beadlock-capable wheels (option).",
      "Fox internal-bypass shocks, Torsen front diff, electronic rear locker.",
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
      "SuperCrew Raptor: family-friendly variant. Final-year build.",
      "Special Edition pkg available.",
    ],
  }),
];

// ---------------------------------------------------------------------------
// Tremor — NEW for 2014. The "regular-cab sport" answer to the dropped FX2.
// Configuration matrix per Ford press kit + 2014 brochure:
//   - 3.5L EcoBoost ONLY.
//   - RegCab ONLY.
//   - 5.5ft short bed ONLY (the only RegCab 5.5ft config of the 12th-gen).
//   - 4x2 OR 4x4.
//   - 4.10 axle ratio std (sport calibration).
//   - 6R80 6-speed automatic with sport-shift program.
//   - 20in dark-painted wheels.
//   - Monochromatic body-color exterior (no chrome).
//   - Sport-bolstered seats, dark interior trim.
//   - Only two exterior colors: Tuxedo Black or Race Red.
// ---------------------------------------------------------------------------

const TREMOR_VARIANTS: VehicleVariant[] = [
  makeVariant({
    trim: "tremor",
    engine: "3_5l_ecoboost",
    transmission: "6r80",
    cab: "regular_cab",
    bed: "5_5ft",
    drive: "4x2",
    axleRatio: "4.10",
    towPackage: false,
    exteriorColorsAvailable: TREMOR_COLORS,
    interiorColorsAvailable: TREMOR_INTERIORS,
    optionPackagesAvailable: ["fx_appearance_package"],
    notes: [
      "NEW for 2014: RegCab sport truck. EcoBoost-only.",
      "4.10 axle, sport calibration, 20in dark-painted wheels.",
      "Monochromatic exterior — Tuxedo Black or Race Red only.",
      "Sport-bolstered seats, dark interior. SuperCrew-derived dash.",
      "Replaces FX2 in the 4x2 sport-truck slot.",
    ],
  }),
  makeVariant({
    trim: "tremor",
    engine: "3_5l_ecoboost",
    transmission: "6r80",
    cab: "regular_cab",
    bed: "5_5ft",
    drive: "4x4",
    axleRatio: "4.10",
    towPackage: false,
    exteriorColorsAvailable: TREMOR_COLORS,
    interiorColorsAvailable: TREMOR_INTERIORS,
    optionPackagesAvailable: ["fx_appearance_package", "off_road_package"],
    notes: [
      "4x4 Tremor — rarer than 4x2. ESOF transfer case.",
      "4.10 axle, sport calibration, 20in dark-painted wheels.",
      "Monochromatic exterior — Tuxedo Black or Race Red only.",
    ],
  }),
];

// ---------------------------------------------------------------------------
// Aggregate.
// ---------------------------------------------------------------------------

const ALL_2014_VARIANTS: VehicleVariant[] = [
  ...XL_VARIANTS,
  ...STX_VARIANTS,
  ...XLT_VARIANTS,
  ...FX4_VARIANTS,
  ...LARIAT_VARIANTS,
  ...KING_RANCH_VARIANTS,
  ...PLATINUM_VARIANTS,
  ...LIMITED_VARIANTS,
  ...RAPTOR_VARIANTS,
  ...TREMOR_VARIANTS,
];

export const LINEUP_2014: YearLineup = {
  year: YEAR,
  variants: ALL_2014_VARIANTS,
  exteriorColorsOffered: [
    "oxford_white",
    "tuxedo_black",
    "ingot_silver",
    "sterling_grey",
    "race_red",
    "ruby_red",
    "blue_jeans",
    "kodiak_brown",
    "caribou",
    "white_platinum_tri_coat",
  ],
  notableChanges: [
    "FINAL year of the 12th-generation P415 platform — last steel-body F-150.",
    "Tremor introduced: RegCab sport truck, 3.5 EcoBoost only, 4.10 axle, 20in wheels.",
    "FX2 DROPPED after 2013 — Tremor and STX appearance package replace it.",
    "King Ranch interior refresh: new chaparral leather, refined trim.",
    "STX appearance package updated: body-color grille bar, 18in wheels.",
    "SVT Raptor final year: Special Edition package with graphics + beadlock-capable wheels.",
    "Limited remains flagship: 3.5 EcoBoost only, SuperCrew 5.5ft 4x4 std spec.",
    "New colors: Blue Jeans Metallic, Kodiak Brown Metallic, Ruby Red Tinted Clearcoat.",
  ],
  midYearIntroductions: [
    "Raptor Special Edition package became broadly available mid-2014 with unique graphics and beadlock wheels.",
  ],
};

// ---------------------------------------------------------------------------
// Query helpers (keyed lookups; O(1) via a Map built once at module load).
// ---------------------------------------------------------------------------

const VARIANT_INDEX: Map<string, VehicleVariant> = new Map(
  ALL_2014_VARIANTS.map((v) => [v.variantKey, v]),
);

export function getVariant2014(variantKey: string): VehicleVariant | undefined {
  return VARIANT_INDEX.get(variantKey);
}

export function getVariantsForTrim2014(trim: TrimId): VehicleVariant[] {
  return ALL_2014_VARIANTS.filter((v) => v.trim === trim);
}

export function getVariantsForEngine2014(engine: EngineId): VehicleVariant[] {
  return ALL_2014_VARIANTS.filter((v) => v.engine === engine);
}

export function getAllVariants2014(): VehicleVariant[] {
  return ALL_2014_VARIANTS;
}
