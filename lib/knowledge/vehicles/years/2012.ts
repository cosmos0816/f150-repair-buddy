// 2012 Ford F-150 lineup — per-variant codification (LINEUP-PLAN Phase 1).
//
// 2012 is a carryover refinement year following the 2011 powertrain overhaul.
// The four-engine lineup (3.7L Ti-VCT V6, 5.0L Coyote V8, 6.2L Boss V8, 3.5L
// EcoBoost V6) is identical to 2011, all paired with the 6R80 6-speed. The
// 4.6L 2V/3V and 5.4L 3V Tritons are GONE (last year was 2010), and so is
// the 4R75E 4-speed. Trim lineup is XL, STX, XLT, FX2, FX4, Lariat, King
// Ranch, Platinum, SVT Raptor (6.2L only — the 5.4L launch Raptor was
// 2010-only).
//
// Sources reconciled while authoring this file:
//   - Ford 2012 F-150 brochure (auto-brochures.com archive).
//   - Edmunds 2012 F-150 trim/config matrix.
//   - f150hub.com 2012 production data.
//   - existing lib/knowledge/vehicles/trims.ts (year 2012 entries).
//   - 2010.ts as the pattern exemplar.
//
// Notable 2012 changes carried in `notableChanges`:
//   - Minor interior refinements (revised cluster typography, soft-touch trim).
//   - New color option: Kodiak Brown Metallic. NOTE: this color is NOT yet in
//     the shared ExteriorColorId union in ../types. It is documented in
//     `notableChanges` but cannot appear in per-variant
//     `exteriorColorsAvailable` until the type is expanded. Do not invent the
//     ID locally — extend the union in types.ts (out of scope for this file).
//   - SYNC with AppLink optional (smartphone app integration over Bluetooth).
//   - HID headlights standard on Platinum and Raptor SuperCrew.
//   - Pricing increase ~3-4% vs. 2011 across the lineup.
//
// Harley-Davidson and Limited are NOT 2012 trims — Harley ended after 2012MY
// in some sources but the 2012MY edition is not in the canonical list
// provided in the task spec, so it is omitted here. Limited debuted later
// in the 12th-gen run (2013+). Do not add either without owner-data evidence.
//
// What is INTENTIONALLY omitted (do not add without owner-data evidence):
//   - Fleet-only stripped XLs (deleted A/C, vinyl floor).
//   - Mexico-build King Ranch with metric gauges (export market).
//   - Flex-fuel-only FFV SKUs (handled at engine spec level).
//   - 2012 Harley-Davidson edition (not in task-provided trim list).

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

const YEAR = 2012 as const;

// Stable key for a variant. Mirrors LINEUP-PLAN section 2.
function key(
  trim: TrimId,
  engine: EngineId,
  cab: CabConfigId,
  bed: BedLengthId,
  drive: DrivetrainId,
): string {
  return `${YEAR}-${trim}-${engine}-${cab}-${bed}-${drive}`;
}

// Color palettes by trim tier. 2012 carries the 2011 palette forward; the
// new Kodiak Brown Metallic introduction is captured in `notableChanges`
// rather than per-variant until the ExteriorColorId union is extended.
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

// King Ranch saddle palette.
const KING_RANCH_COLORS: ExteriorColorId[] = [
  "tuxedo_black",
  "pueblo_gold",
  "sangria_red",
  "golden_bronze",
];

// Platinum keeps the unique White Platinum Metallic Tri-coat headline.
const PLATINUM_COLORS: ExteriorColorId[] = [
  "white_platinum_tri_coat",
  "tuxedo_black",
  "ingot_silver",
  "sterling_grey",
  "sangria_red",
];

// SVT Raptor 2012 palette.
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

// 2012 engine -> default axle ratio mapping. The 3.7L V6 is the
// fuel-economy base; it gets 3.15 (4x2) / 3.31 (4x4) by default. The 5.0L
// Coyote is the volume V8 — 3.55 default, 3.73 with max-tow. The 3.5L
// EcoBoost defaults to 3.55 with max-tow available at 3.73. The 6.2L Boss
// is the heavy-duty option, 3.73 default. Raptor stays at 4.10.
function defaultAxle(engine: EngineId, drive: DrivetrainId, tow: boolean): AxleRatio {
  if (engine === "3_7l_tivct") return drive === "4x4" ? "3.31" : "3.15";
  if (engine === "5_0l_coyote") return tow ? "3.73" : "3.55";
  if (engine === "3_5l_ecoboost") return tow ? "3.73" : "3.55";
  if (engine === "6_2l_boss") return "3.73";
  // Raptor handled separately.
  return "3.55";
}

// ---------------------------------------------------------------------------
// XL: 3.7 V6 / 5.0 V8 / 3.5 EcoBoost. RegCab + SuperCab. 6R80.
// RegCab: 6.5ft and 8ft. SuperCab: 6.5ft and 8ft. 4x2 or 4x4.
// (The 6.2L Boss is not a standard XL engine in 2012 — it remained a
// Lariat/King Ranch/Platinum/Raptor-tier engine.)
// ---------------------------------------------------------------------------

const XL_VARIANTS: VehicleVariant[] = [];

const XL_CAB_BEDS: Array<[CabConfigId, BedLengthId]> = [
  ["regular_cab", "6_5ft"],
  ["regular_cab", "8ft"],
  ["supercab", "6_5ft"],
  ["supercab", "8ft"],
];

for (const [cab, bed] of XL_CAB_BEDS) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"] as EngineId[]) {
      const tow = engine !== "3_7l_tivct";
      XL_VARIANTS.push(
        makeVariant({
          trim: "xl",
          engine,
          transmission: "6r80",
          cab,
          bed,
          drive,
          axleRatio: defaultAxle(engine, drive, tow),
          towPackage: tow,
          exteriorColorsAvailable: XL_COLORS,
          interiorColorsAvailable: WORK_INTERIORS,
          optionPackagesAvailable: XL_PACKAGES,
          notes:
            engine === "3_7l_tivct"
              ? ["Base work-truck config. 3.7 Ti-VCT is the fleet fuel-economy spec."]
              : undefined,
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// STX: 3.7 V6 / 5.0 V8. RegCab + SuperCab. 6.5ft. 4x2 or 4x4. 6R80.
// (EcoBoost not typical at this tier in 2012; reserved for higher trims.)
// ---------------------------------------------------------------------------

const STX_VARIANTS: VehicleVariant[] = [];

for (const cab of ["regular_cab", "supercab"] as CabConfigId[]) {
  for (const drive of ["4x2", "4x4"] as DrivetrainId[]) {
    for (const engine of ["3_7l_tivct", "5_0l_coyote"] as EngineId[]) {
      const tow = engine === "5_0l_coyote";
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
// XLT: 3.7 V6 / 5.0 V8 / 3.5 EcoBoost. RC + SC + CC.
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
          notes:
            engine === "3_5l_ecoboost"
              ? ["EcoBoost XLT is the volume tow build for 2012 — 11,300 lb max tow."]
              : undefined,
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// FX2 Sport: 5.0 V8 / 3.5 EcoBoost. SuperCab + SuperCrew. 4x2 only. 6R80.
// SC: 6.5. CC: 5.5/6.5.
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
        axleRatio: defaultAxle(engine, "4x2", false),
        towPackage: false,
        exteriorColorsAvailable: FX_COLORS,
        interiorColorsAvailable: LUXURY_INTERIORS,
        optionPackagesAvailable: FX2_PACKAGES,
        notes:
          cab === "supercab" && engine === "5_0l_coyote"
            ? ["FX2 = 4x2-only sport package. Body-color trim, FX badging."]
            : undefined,
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// FX4: 5.0 V8 / 3.5 EcoBoost / 6.2 Boss. SuperCab + SuperCrew. 4x4 only.
// SC: 6.5. CC: 5.5/6.5. 6R80. Off-road package std.
// (The 6.2 Boss was a real FX4 option in 2012 per Ford configurator data,
// though uncommon — most 6.2s went to Lariat/Platinum/Raptor.)
// ---------------------------------------------------------------------------

const FX4_VARIANTS: VehicleVariant[] = [];

const FX4_CAB_BEDS: Array<[CabConfigId, BedLengthId]> = [
  ["supercab", "6_5ft"],
  ["supercrew", "5_5ft"],
  ["supercrew", "6_5ft"],
];

for (const [cab, bed] of FX4_CAB_BEDS) {
  for (const engine of ["5_0l_coyote", "3_5l_ecoboost", "6_2l_boss"] as EngineId[]) {
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
        notes:
          engine === "6_2l_boss"
            ? ["Rare 6.2 Boss FX4 — heavy-duty off-road build."]
            : undefined,
      }),
    );
  }
}

// ---------------------------------------------------------------------------
// Lariat: 5.0 V8 / 3.5 EcoBoost / 6.2 Boss. SC + CC. 4x2 or 4x4. 6R80.
// SC: 6.5. CC: 5.5/6.5.
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
      const tow = true;
      LARIAT_VARIANTS.push(
        makeVariant({
          trim: "lariat",
          engine,
          transmission: "6r80",
          cab,
          bed,
          drive,
          axleRatio: defaultAxle(engine, drive, tow),
          towPackage: tow,
          exteriorColorsAvailable: LARIAT_COLORS,
          interiorColorsAvailable: LUXURY_INTERIORS,
          optionPackagesAvailable: LARIAT_PACKAGES,
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// King Ranch: 5.0 V8 / 3.5 EcoBoost / 6.2 Boss. SuperCrew only.
// 5.5/6.5. 4x2 or 4x4. 6R80.
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
          axleRatio: defaultAxle(engine, drive, true),
          towPackage: true,
          exteriorColorsAvailable: KING_RANCH_COLORS,
          interiorColorsAvailable: KING_RANCH_INTERIORS,
          optionPackagesAvailable: ["max_trailer_tow"],
          notes: ["Chaparral leather std. Restricted saddle-friendly palette."],
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Platinum: 5.0 V8 / 3.5 EcoBoost / 6.2 Boss. SuperCrew only. 5.5/6.5.
// 4x2 or 4x4. 6R80. HID headlights standard for 2012.
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
          axleRatio: defaultAxle(engine, drive, true),
          towPackage: true,
          exteriorColorsAvailable: PLATINUM_COLORS,
          interiorColorsAvailable: PLATINUM_INTERIORS,
          optionPackagesAvailable: ["max_trailer_tow"],
          notes: [
            "20in polished aluminum std.",
            "HID headlights standard for 2012.",
            "SYNC with AppLink optional.",
          ],
        }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// SVT Raptor: 6.2 Boss only. SuperCab and SuperCrew. 5.5ft. 4x4 std. 6R80.
// Axle ratio 4.10. HID headlights standard on SuperCrew Raptor for 2012.
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
      "411hp 6.2L Boss V8 sole engine for 2012 Raptor.",
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
      "SuperCrew Raptor in its second model year (introduced for 2011).",
      "HID headlights standard on SuperCrew Raptor for 2012.",
    ],
  }),
];

// ---------------------------------------------------------------------------
// Aggregate.
// ---------------------------------------------------------------------------

const ALL_2012_VARIANTS: VehicleVariant[] = [
  ...XL_VARIANTS,
  ...STX_VARIANTS,
  ...XLT_VARIANTS,
  ...FX2_VARIANTS,
  ...FX4_VARIANTS,
  ...LARIAT_VARIANTS,
  ...KING_RANCH_VARIANTS,
  ...PLATINUM_VARIANTS,
  ...RAPTOR_VARIANTS,
];

export const LINEUP_2012: YearLineup = {
  year: YEAR,
  variants: ALL_2012_VARIANTS,
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
    "Carryover refinement year — engines and 6R80 transmission unchanged from 2011.",
    "Minor interior refinements: revised cluster typography, soft-touch trim pieces.",
    "New exterior color: Kodiak Brown Metallic (not yet in shared ExteriorColorId union — documented here pending type extension).",
    "SYNC with AppLink optional — adds smartphone app integration over Bluetooth (Pandora, Stitcher).",
    "HID headlights standard on Platinum and SuperCrew Raptor.",
    "Pricing increase ~3-4% across the lineup vs. 2011.",
    "SVT Raptor available in both SuperCab and SuperCrew (SuperCrew was introduced for 2011).",
  ],
};

// ---------------------------------------------------------------------------
// Query helpers (keyed lookups; O(1) via a Map built once at module load).
// ---------------------------------------------------------------------------

const VARIANT_INDEX: Map<string, VehicleVariant> = new Map(
  ALL_2012_VARIANTS.map((v) => [v.variantKey, v]),
);

export function getVariant2012(variantKey: string): VehicleVariant | undefined {
  return VARIANT_INDEX.get(variantKey);
}

export function getVariantsForTrim2012(trim: TrimId): VehicleVariant[] {
  return ALL_2012_VARIANTS.filter((v) => v.trim === trim);
}

export function getVariantsForEngine2012(engine: EngineId): VehicleVariant[] {
  return ALL_2012_VARIANTS.filter((v) => v.engine === engine);
}

export function getAllVariants2012(): VehicleVariant[] {
  return ALL_2012_VARIANTS;
}
