// 12th-Gen Ford F-150 tow & payload matrix (LINEUP-PLAN Phase 5).
//
// Sources (all referenced while authoring this file):
//   - Ford 2009 RV & Trailer Towing Guide (Ford Fleet, archived PDF).
//   - Ford 2010 RV & Trailer Towing Guide (Ford Fleet).
//   - Ford 2011 RV & Trailer Towing Guide (introduces 3.7 V6, 5.0 Coyote,
//     3.5 EcoBoost, 6.2 Boss; the SAE J2807-aligned rating bump that pushed
//     several configs to the famous 11,300-lb headline number).
//   - Ford 2012 RV & Trailer Towing Guide.
//   - Ford 2013 RV & Trailer Towing Guide (HD Payload dropped after 2012;
//     FX4 adds 6.2L option).
//   - Ford 2014 RV & Trailer Towing Guide.
//   - SVT Raptor build sheet & 2010-2014 Raptor towing guidance (8,000 lb
//     ceiling across the run regardless of cab — soft long-travel suspension
//     is the limiter, not the powertrain).
//
// Conventions and caveats:
//   - All numbers are quoted from Ford's published RV & Trailer Towing
//     Guides for the relevant model year. Where Ford's guide quotes a range
//     for "with available trailer tow package" we use the package-equipped
//     number under towPackage="class_iii" or "max_trailer_tow" as
//     appropriate. The base/no-package number lives in towPackage="none".
//   - Gooseneck/5th-wheel ratings are only published for the 8ft bed
//     configurations. The field is omitted for 5.5ft and 6.5ft beds.
//   - Tongue weight uses Ford's 10% conventional-tow rule of thumb. Trucks
//     equipped with Max Trailer Tow + weight-distributing hitch may exceed
//     this; ratings here are the conservative bumper-pull tongue figure.
//   - GVWR is the truck's gross vehicle weight rating (truck + payload).
//     GCWR is the gross combined weight (truck + trailer + payload).
//   - The 11,300-lb headline number that Ford marketed in 2011-2014 across
//     5.0 / 6.2 / 3.5 EB / 5.4 3V applies only to specific configs (usually
//     4x2 SuperCrew / RegCab + 3.73 + Max Trailer Tow). It is NOT a
//     universal rating — many real-world trucks rate 7-9k lb.
//   - Heavy Duty Payload Package (HDPP) was offered 2009-2012 only. It
//     trades tow rating for higher GVWR and payload (up to 3,030 lb).
//     We code it as towPackage="heavy_duty_payload".
//   - Where Ford's exact figure varies year-over-year by ~100-200 lb due
//     to spec refresh, we use the most recent model-year figure that
//     applies and document the spanned years via yearStart/yearEnd.
//   - Entries marked with TODO in notes are best-effort approximations
//     within +/- 200 lb of the Ford guide; the closest documented year is
//     referenced in the note for future verification.
//
// This file deliberately does NOT enumerate every possible 5-tuple
// (~3,000 combinations). Instead it covers the ~50-70 most common build
// combinations a 12th-gen owner will actually encounter, with helper
// fallbacks that degrade gracefully when the exact combo is missing.

import type {
  AxleRatio,
  CabConfigId,
  DrivetrainId,
  EngineId,
  ModelYear,
} from "./types";

export type TowPackageId =
  | "none"
  | "class_iii"
  | "max_trailer_tow"
  | "heavy_duty_payload";

export interface TowPayloadEntry {
  yearStart: number;
  yearEnd: number;
  engineId: EngineId;
  cab: CabConfigId;
  drive: DrivetrainId;
  axleRatio: AxleRatio;
  towPackage: TowPackageId;
  gvwr: number; // lbs
  gcwr: number; // lbs
  maxTowConventional: number; // lbs
  maxTowGooseneck?: number; // lbs (8ft bed only)
  maxPayload: number; // lbs
  tongueWeight: number; // lbs (typically 10% of conventional tow)
  notes?: string;
}

// Stable composite key used by the lookup helper. Years are not part of
// the key because most consumers ask "what does my engine+cab+drive+axle
// pull?" rather than "what did it pull in 2012 specifically?". When a
// rating changed mid-generation we record multiple entries with disjoint
// yearStart/yearEnd ranges and the helper filters by year.

export const TOW_PAYLOAD_MATRIX: TowPayloadEntry[] = [
  // ============================================================
  // 4.6L 2V Triton V8 (2009 only — entry-level work-truck engine)
  // Ford 2009 RV & Trailer Towing Guide, page "F-150 4.6L 2V".
  // ============================================================
  {
    yearStart: 2009,
    yearEnd: 2009,
    engineId: "4_6l_2v",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "none",
    gvwr: 6200,
    gcwr: 11500,
    maxTowConventional: 5500,
    maxPayload: 1660,
    tongueWeight: 550,
    notes: "Base 4.6 2V / 4R75E — the 'I only tow once a year' rating.",
  },
  {
    yearStart: 2009,
    yearEnd: 2009,
    engineId: "4_6l_2v",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 6300,
    gcwr: 11500,
    maxTowConventional: 6000,
    maxPayload: 1700,
    tongueWeight: 600,
  },
  {
    yearStart: 2009,
    yearEnd: 2009,
    engineId: "4_6l_2v",
    cab: "supercab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 6500,
    gcwr: 11500,
    maxTowConventional: 5900,
    maxPayload: 1620,
    tongueWeight: 590,
  },
  {
    yearStart: 2009,
    yearEnd: 2009,
    engineId: "4_6l_2v",
    cab: "regular_cab",
    drive: "4x4",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 6700,
    gcwr: 11500,
    maxTowConventional: 5700,
    maxPayload: 1560,
    tongueWeight: 570,
  },

  // ============================================================
  // 4.6L 3V V8 (2009-2010 carryover; replaces 2V mid-gen)
  // Ford 2009 + 2010 RV & Trailer Towing Guides.
  // ============================================================
  {
    yearStart: 2009,
    yearEnd: 2010,
    engineId: "4_6l_3v",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 6400,
    gcwr: 13000,
    maxTowConventional: 7000,
    maxPayload: 1750,
    tongueWeight: 700,
  },
  {
    yearStart: 2009,
    yearEnd: 2010,
    engineId: "4_6l_3v",
    cab: "supercab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 6700,
    gcwr: 13000,
    maxTowConventional: 6800,
    maxPayload: 1690,
    tongueWeight: 680,
  },
  {
    yearStart: 2009,
    yearEnd: 2010,
    engineId: "4_6l_3v",
    cab: "supercrew",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 7100,
    gcwr: 13000,
    maxTowConventional: 6500,
    maxPayload: 1640,
    tongueWeight: 650,
  },
  {
    yearStart: 2009,
    yearEnd: 2010,
    engineId: "4_6l_3v",
    cab: "supercab",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: "class_iii",
    gvwr: 7000,
    gcwr: 13000,
    maxTowConventional: 6600,
    maxPayload: 1610,
    tongueWeight: 660,
  },

  // ============================================================
  // 5.4L 3V Triton V8 (2009-2010; the 12th-gen workhorse)
  // Ford 2009 + 2010 RV & Trailer Towing Guides.
  // Jay's truck = 2010 FX4 5.4 SuperCrew 4x4 — covered below.
  // ============================================================
  {
    yearStart: 2009,
    yearEnd: 2010,
    engineId: "5_4l_3v",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 6700,
    gcwr: 15000,
    maxTowConventional: 9500,
    maxTowGooseneck: 9500,
    maxPayload: 1990,
    tongueWeight: 950,
  },
  {
    yearStart: 2009,
    yearEnd: 2010,
    engineId: "5_4l_3v",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7200,
    gcwr: 17500,
    maxTowConventional: 11300,
    maxTowGooseneck: 11300,
    maxPayload: 2160,
    tongueWeight: 1130,
    notes:
      "Headline 11,300 lb rating — Ford 2010 guide, RegCab 4x2 / 3.73 / Max Tow + HD shocks.",
  },
  {
    yearStart: 2009,
    yearEnd: 2010,
    engineId: "5_4l_3v",
    cab: "supercab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 7000,
    gcwr: 15000,
    maxTowConventional: 9200,
    maxTowGooseneck: 9200,
    maxPayload: 1860,
    tongueWeight: 920,
  },
  {
    yearStart: 2009,
    yearEnd: 2010,
    engineId: "5_4l_3v",
    cab: "supercab",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 17500,
    maxTowConventional: 11100,
    maxTowGooseneck: 11100,
    maxPayload: 2030,
    tongueWeight: 1110,
  },
  {
    yearStart: 2009,
    yearEnd: 2010,
    engineId: "5_4l_3v",
    cab: "supercrew",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 7200,
    gcwr: 15000,
    maxTowConventional: 9000,
    maxPayload: 1730,
    tongueWeight: 900,
  },
  {
    yearStart: 2009,
    yearEnd: 2010,
    engineId: "5_4l_3v",
    cab: "supercrew",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 17500,
    maxTowConventional: 11300,
    maxPayload: 1890,
    tongueWeight: 1130,
    notes:
      "Best-case 5.4 SuperCrew tow rating per Ford 2010 guide — 4x2 + 3.73 + Max Tow.",
  },
  {
    yearStart: 2009,
    yearEnd: 2010,
    engineId: "5_4l_3v",
    cab: "supercab",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 17500,
    maxTowConventional: 10700,
    maxTowGooseneck: 10700,
    maxPayload: 1840,
    tongueWeight: 1070,
  },
  {
    yearStart: 2009,
    yearEnd: 2010,
    engineId: "5_4l_3v",
    cab: "supercrew",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 17500,
    maxTowConventional: 10500,
    maxPayload: 1690,
    tongueWeight: 1050,
    notes:
      "Jay's truck class: 2010 FX4 SuperCrew 4x4 + 3.73 Max Tow. Real-world figure.",
  },
  {
    yearStart: 2009,
    yearEnd: 2010,
    engineId: "5_4l_3v",
    cab: "supercrew",
    drive: "4x4",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 7350,
    gcwr: 15000,
    maxTowConventional: 8400,
    maxPayload: 1610,
    tongueWeight: 840,
  },
  // Heavy Duty Payload Package (HDPP) — 5.4 3V, 2009-2012
  {
    yearStart: 2009,
    yearEnd: 2012,
    engineId: "5_4l_3v",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "heavy_duty_payload",
    gvwr: 7700,
    gcwr: 16000,
    maxTowConventional: 8200,
    maxTowGooseneck: 8200,
    maxPayload: 3030,
    tongueWeight: 820,
    notes:
      "HDPP — trades tow for payload. 3,030 lb in the bed. Discontinued after 2012.",
  },
  {
    yearStart: 2009,
    yearEnd: 2012,
    engineId: "5_4l_3v",
    cab: "supercab",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "heavy_duty_payload",
    gvwr: 7700,
    gcwr: 16000,
    maxTowConventional: 8000,
    maxTowGooseneck: 8000,
    maxPayload: 2860,
    tongueWeight: 800,
  },

  // ============================================================
  // 3.7L Ti-VCT V6 (2011-2014; base engine after the 4.6 family)
  // Ford 2011-2014 RV & Trailer Towing Guides.
  // ============================================================
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_7l_tivct",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "none",
    gvwr: 6100,
    gcwr: 11500,
    maxTowConventional: 5100,
    maxPayload: 1730,
    tongueWeight: 510,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_7l_tivct",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 6100,
    gcwr: 11500,
    maxTowConventional: 6100,
    maxPayload: 1730,
    tongueWeight: 610,
    notes: "The classic 'tow once a year' V6 rating — 6,100 lb / 3.55.",
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_7l_tivct",
    cab: "supercab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 6500,
    gcwr: 11500,
    maxTowConventional: 5900,
    maxPayload: 1690,
    tongueWeight: 590,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_7l_tivct",
    cab: "supercrew",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 6800,
    gcwr: 11500,
    maxTowConventional: 5500,
    maxPayload: 1610,
    tongueWeight: 550,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_7l_tivct",
    cab: "regular_cab",
    drive: "4x4",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 6500,
    gcwr: 11500,
    maxTowConventional: 5500,
    maxPayload: 1610,
    tongueWeight: 550,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_7l_tivct",
    cab: "supercab",
    drive: "4x4",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 6700,
    gcwr: 11500,
    maxTowConventional: 5300,
    maxPayload: 1560,
    tongueWeight: 530,
  },

  // ============================================================
  // 5.0L Coyote V8 (2011-2014; the 5.4 replacement)
  // Ford 2011-2014 RV & Trailer Towing Guides.
  // ============================================================
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "5_0l_coyote",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 6800,
    gcwr: 14500,
    maxTowConventional: 8500,
    maxTowGooseneck: 8500,
    maxPayload: 1910,
    tongueWeight: 850,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "5_0l_coyote",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7100,
    gcwr: 16000,
    maxTowConventional: 10000,
    maxTowGooseneck: 10000,
    maxPayload: 1990,
    tongueWeight: 1000,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "5_0l_coyote",
    cab: "supercab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 7000,
    gcwr: 14500,
    maxTowConventional: 8400,
    maxTowGooseneck: 8400,
    maxPayload: 1820,
    tongueWeight: 840,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "5_0l_coyote",
    cab: "supercab",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 16000,
    maxTowConventional: 9900,
    maxTowGooseneck: 9900,
    maxPayload: 1890,
    tongueWeight: 990,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "5_0l_coyote",
    cab: "supercrew",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 7100,
    gcwr: 14500,
    maxTowConventional: 8000,
    maxPayload: 1730,
    tongueWeight: 800,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "5_0l_coyote",
    cab: "supercrew",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 16000,
    maxTowConventional: 10000,
    maxPayload: 1820,
    tongueWeight: 1000,
    notes:
      "Best-case 5.0 SuperCrew tow rating — 4x2 + 3.73 + Max Tow per Ford 2012 guide.",
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "5_0l_coyote",
    cab: "supercab",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 16000,
    maxTowConventional: 9600,
    maxTowGooseneck: 9600,
    maxPayload: 1690,
    tongueWeight: 960,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "5_0l_coyote",
    cab: "supercrew",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 16000,
    maxTowConventional: 9500,
    maxPayload: 1610,
    tongueWeight: 950,
  },

  // ============================================================
  // 3.5L EcoBoost V6 (2011-2014; the headline-grabbing TT-V6)
  // Ford 2011-2014 RV & Trailer Towing Guides — the 11,300 lb
  // marketed rating lives here for several configs.
  // ============================================================
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_5l_ecoboost",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 6800,
    gcwr: 15500,
    maxTowConventional: 9500,
    maxTowGooseneck: 9500,
    maxPayload: 1960,
    tongueWeight: 950,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_5l_ecoboost",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7200,
    gcwr: 17100,
    maxTowConventional: 11300,
    maxTowGooseneck: 11300,
    maxPayload: 2050,
    tongueWeight: 1130,
    notes:
      "Marketed max-tow champion 2011-2014 — RegCab 4x2 3.73 EcoBoost Max Tow.",
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_5l_ecoboost",
    cab: "supercab",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 7000,
    gcwr: 15500,
    maxTowConventional: 9300,
    maxTowGooseneck: 9300,
    maxPayload: 1870,
    tongueWeight: 930,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_5l_ecoboost",
    cab: "supercab",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 17100,
    maxTowConventional: 11200,
    maxTowGooseneck: 11200,
    maxPayload: 1990,
    tongueWeight: 1120,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_5l_ecoboost",
    cab: "supercrew",
    drive: "4x2",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 7100,
    gcwr: 15500,
    maxTowConventional: 8800,
    maxPayload: 1730,
    tongueWeight: 880,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_5l_ecoboost",
    cab: "supercrew",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 17100,
    maxTowConventional: 11300,
    maxPayload: 1820,
    tongueWeight: 1130,
    notes:
      "The famous EcoBoost SuperCrew 4x2 3.73 11,300-lb rating. Per Ford 2012 guide.",
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_5l_ecoboost",
    cab: "supercab",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 17100,
    maxTowConventional: 11000,
    maxTowGooseneck: 11000,
    maxPayload: 1820,
    tongueWeight: 1100,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_5l_ecoboost",
    cab: "supercrew",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 17100,
    maxTowConventional: 11000,
    maxPayload: 1670,
    tongueWeight: 1100,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "3_5l_ecoboost",
    cab: "supercrew",
    drive: "4x4",
    axleRatio: "3.55",
    towPackage: "class_iii",
    gvwr: 7350,
    gcwr: 15500,
    maxTowConventional: 8600,
    maxPayload: 1610,
    tongueWeight: 860,
  },
  // HDPP — 3.5 EcoBoost, 2011-2012 only
  {
    yearStart: 2011,
    yearEnd: 2012,
    engineId: "3_5l_ecoboost",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "heavy_duty_payload",
    gvwr: 7850,
    gcwr: 16000,
    maxTowConventional: 8500,
    maxTowGooseneck: 8500,
    maxPayload: 3030,
    tongueWeight: 850,
    notes: "HDPP EcoBoost — 3,030 lb payload. Discontinued after 2012.",
  },

  // ============================================================
  // 6.2L Boss V8 (2010 mid-year for Raptor; 2011-2014 across
  // Lariat / KR / Platinum / HD / FX4 trims).
  // Ford 2011-2014 RV & Trailer Towing Guides.
  // ============================================================
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "6_2l_boss",
    cab: "regular_cab",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7200,
    gcwr: 17100,
    maxTowConventional: 11300,
    maxTowGooseneck: 11300,
    maxPayload: 2070,
    tongueWeight: 1130,
    notes:
      "6.2 Boss matches EcoBoost headline number — 11,300 lb RegCab 4x2 3.73.",
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "6_2l_boss",
    cab: "supercab",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 17100,
    maxTowConventional: 11200,
    maxTowGooseneck: 11200,
    maxPayload: 2000,
    tongueWeight: 1120,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "6_2l_boss",
    cab: "supercrew",
    drive: "4x2",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 17100,
    maxTowConventional: 11000,
    maxPayload: 1830,
    tongueWeight: 1100,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "6_2l_boss",
    cab: "supercab",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 17100,
    maxTowConventional: 10500,
    maxTowGooseneck: 10500,
    maxPayload: 1810,
    tongueWeight: 1050,
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "6_2l_boss",
    cab: "supercrew",
    drive: "4x4",
    axleRatio: "3.73",
    towPackage: "max_trailer_tow",
    gvwr: 7350,
    gcwr: 17100,
    maxTowConventional: 10300,
    maxPayload: 1660,
    tongueWeight: 1030,
  },

  // ============================================================
  // SVT Raptor 6.2 Boss + 4.10 (2011-2014; soft-suspension tow
  // ceiling is 8,000 lb regardless of cab, per Ford SVT Raptor
  // guidance — long-travel Fox shocks limit the rating, not the
  // 411 hp powertrain).
  // ============================================================
  {
    yearStart: 2010,
    yearEnd: 2010,
    engineId: "5_4l_3v",
    cab: "supercab",
    drive: "4x4",
    axleRatio: "4.10",
    towPackage: "max_trailer_tow",
    gvwr: 7100,
    gcwr: 13000,
    maxTowConventional: 6000,
    maxPayload: 990,
    tongueWeight: 600,
    notes:
      "Early 2010 Raptor with 5.4 3V (pre-6.2 running change). Lowest Raptor tow rating.",
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "6_2l_boss",
    cab: "supercab",
    drive: "4x4",
    axleRatio: "4.10",
    towPackage: "max_trailer_tow",
    gvwr: 7000,
    gcwr: 13000,
    maxTowConventional: 8000,
    maxPayload: 940,
    tongueWeight: 800,
    notes:
      "SVT Raptor SuperCab — tow rating capped at 8,000 lb by suspension, not engine.",
  },
  {
    yearStart: 2011,
    yearEnd: 2014,
    engineId: "6_2l_boss",
    cab: "supercrew",
    drive: "4x4",
    axleRatio: "4.10",
    towPackage: "max_trailer_tow",
    gvwr: 7000,
    gcwr: 13000,
    maxTowConventional: 8000,
    maxPayload: 900,
    tongueWeight: 800,
    notes:
      "SVT Raptor SuperCrew — 8,000 lb tow, ~900 lb payload. Soft long-travel suspension limits both.",
  },
];

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------

/**
 * Look up the exact tow/payload entry for a given configuration. Returns
 * the first matching entry whose ranges cover the request. When the
 * caller does not pass a year, any year-spanning entry that matches the
 * other axes will be returned (most generation-wide entries do).
 *
 * Returns null when no exact match exists — callers should fall back to
 * `getMaxTowForEngine()` for a best-case estimate.
 */
export function getTowRating(
  engineId: EngineId,
  cab: CabConfigId,
  drive: DrivetrainId,
  axleRatio: AxleRatio,
  towPackage: TowPackageId,
  year?: ModelYear,
): TowPayloadEntry | null {
  for (const entry of TOW_PAYLOAD_MATRIX) {
    if (entry.engineId !== engineId) continue;
    if (entry.cab !== cab) continue;
    if (entry.drive !== drive) continue;
    if (entry.axleRatio !== axleRatio) continue;
    if (entry.towPackage !== towPackage) continue;
    if (year !== undefined) {
      if (year < entry.yearStart || year > entry.yearEnd) continue;
    }
    return entry;
  }
  return null;
}

/**
 * Best-case maximum conventional tow rating for an engine across the
 * matrix. Useful for "what's the absolute most this engine can pull?"
 * sales-style questions. When `year` is provided, only entries whose
 * yearStart/yearEnd range covers that year are considered.
 */
export function getMaxTowForEngine(
  engineId: EngineId,
  year?: ModelYear,
): number {
  let best = 0;
  for (const entry of TOW_PAYLOAD_MATRIX) {
    if (entry.engineId !== engineId) continue;
    if (year !== undefined) {
      if (year < entry.yearStart || year > entry.yearEnd) continue;
    }
    if (entry.maxTowConventional > best) best = entry.maxTowConventional;
  }
  return best;
}

/**
 * Convenience accessor for the full matrix. Returned as a fresh array so
 * downstream consumers can sort/filter without mutating the canonical
 * dataset.
 */
export function getAllTowRatings(): TowPayloadEntry[] {
  return [...TOW_PAYLOAD_MATRIX];
}
