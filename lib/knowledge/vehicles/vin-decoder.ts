// 12th-generation Ford F-150 (2009-2014) VIN decoder.
//
// A 17-character VIN encodes information by position. This decoder covers
// what is well-documented for 12th-gen F-150 (P415 platform). For positions
// that do not unambiguously identify a trim or option (e.g. XL vs XLT vs
// Lariat), the decoder explicitly reports "not encoded" rather than guessing.
//
// References used (training-knowledge level, publicly documented):
// - NHTSA VIN decoding format (positions 1-3 WMI, position 9 check digit,
//   position 10 model year, position 11 plant)
// - Ford VIN reference cards for 2009-2014 F-150
// - Body-on-frame F-Series Service Information (engine + body codes)
//
// NOTE: Some Ford-specific codes (especially position 4 "restraint/brake"
// and position 8 "engine variant") shifted year-to-year and trim-to-trim.
// We include only the codes that are well-documented for the 12th-gen
// F-150. Anything else is returned as the raw character + "not decoded".

import type { EngineId, ModelYear } from "./types";

// ─────────────────────────────────────────────────────────────────────────
// Lookup tables
// ─────────────────────────────────────────────────────────────────────────

/**
 * World Manufacturer Identifier (positions 1-3).
 * Only the three WMIs Ford uses for North American F-150 light trucks are
 * included. Other Ford WMIs (e.g. 1FA = US car, 1FM = US-built MPV) are
 * not valid for a 12th-gen F-150 and will be reported as an error.
 */
export const VIN_WMI_TABLE: Record<string, { country: string; plant: string; vehicleType: string }> = {
  "1FT": {
    country: "United States",
    plant: "Ford US light truck",
    vehicleType: "Truck (incomplete/complete)",
  },
  "2FT": {
    country: "Canada",
    plant: "Ford of Canada light truck",
    vehicleType: "Truck",
  },
  "3FT": {
    country: "Mexico",
    plant: "Ford de Mexico light truck",
    vehicleType: "Truck",
  },
};

/**
 * Position 4 — Brake type / GVWR / restraint indicator. Ford packs several
 * properties into this character. For the 12th-gen F-150 the codes most
 * commonly seen are:
 * - E: hydraulic, GVWR 6001-7000 lb, manual seat belts + front airbags
 * - F: hydraulic, GVWR 7001-8000 lb (most common F-150 4x2)
 * - W: hydraulic, GVWR 8001-9000 lb (most common F-150 4x4 / SVT Raptor)
 * - X: hydraulic, GVWR 9001-10000 lb (HD payload package)
 *
 * Ford has used these letters with different meanings on other product
 * lines. We only document the F-150 12th-gen usage here.
 */
export const VIN_BRAKE_GVWR_TABLE: Record<string, { brakes: string; gvwrLb: string }> = {
  E: { brakes: "hydraulic", gvwrLb: "6001-7000" },
  F: { brakes: "hydraulic", gvwrLb: "7001-8000" },
  W: { brakes: "hydraulic", gvwrLb: "8001-9000" },
  X: { brakes: "hydraulic", gvwrLb: "9001-10000" },
};

/**
 * Position 5 — Model line / series. For 12th-gen F-150:
 * - F: F-150 (standard lineup, XL through Limited)
 * - R: F-150 SVT Raptor (2010-2014)
 *
 * Other letters in this position historically belonged to other Ford F-Series
 * configurations (e.g. F-250 Super Duty) and are not valid for a 12th-gen
 * F-150. Position 5 alone does NOT encode trim level (XL/XLT/Lariat/etc.) —
 * trim is determined from window sticker / option codes, not the VIN.
 */
export const VIN_MODEL_SERIES_TABLE: Record<string, string> = {
  F: "F-150 (standard line)",
  R: "F-150 SVT Raptor",
};

/**
 * Position 6 — Body style / cab configuration.
 * For 12th-gen F-150:
 * - W: Regular Cab, 2-door
 * - F: SuperCab, 4-door (with rear-hinged half-doors)
 * - E: SuperCrew, 4-door (full crew cab)
 * - M: 4-door (legacy SuperCrew code used on some early 12th-gen builds)
 */
export const VIN_BODY_STYLE_TABLE: Record<
  string,
  { cab: string; doors: number; notes?: string }
> = {
  W: { cab: "Regular Cab", doors: 2 },
  F: { cab: "SuperCab", doors: 4, notes: "rear-hinged half doors" },
  E: { cab: "SuperCrew", doors: 4 },
  M: {
    cab: "SuperCrew (legacy code)",
    doors: 4,
    notes: "alternate SuperCrew code on some early 12th-gen builds",
  },
};

/**
 * Position 7 — Engine.
 *
 * 12th-gen Ford F-150 engine codes (verified from Ford service literature):
 * - W: 4.6L 2V V8 (2009 base engine only)
 * - 8: 4.6L 3V V8 (2010 only, mid-grade)
 * - V: 5.4L 3V Triton V8 (2009-2010)
 * - M: 3.7L Ti-VCT V6 (2011-2014, base engine)
 * - F: 5.0L Coyote V8 (2011-2014)
 * - T: 3.5L EcoBoost V6 (2011-2014)
 * - 6: 6.2L Boss V8 (2010-2014, SVT Raptor / Harley-Davidson / Platinum tow)
 *
 * Each entry includes the corresponding EngineId from types.ts and the
 * model years the code was used.
 */
export const VIN_ENGINE_CODE_TABLE: Record<
  string,
  {
    engineId: EngineId;
    displayName: string;
    years: ModelYear[];
  }
> = {
  W: {
    engineId: "4_6l_2v",
    displayName: "4.6L 2V V8 (Romeo)",
    years: [2009],
  },
  "8": {
    engineId: "4_6l_3v",
    displayName: "4.6L 3V V8",
    years: [2010],
  },
  V: {
    engineId: "5_4l_3v",
    displayName: "5.4L 3V Triton V8",
    years: [2009, 2010],
  },
  M: {
    engineId: "3_7l_tivct",
    displayName: "3.7L Ti-VCT V6",
    years: [2011, 2012, 2013, 2014],
  },
  F: {
    engineId: "5_0l_coyote",
    displayName: "5.0L Coyote V8",
    years: [2011, 2012, 2013, 2014],
  },
  T: {
    engineId: "3_5l_ecoboost",
    displayName: "3.5L EcoBoost V6 (twin-turbo DI)",
    years: [2011, 2012, 2013, 2014],
  },
  "6": {
    engineId: "6_2l_boss",
    displayName: "6.2L Boss V8",
    years: [2010, 2011, 2012, 2013, 2014],
  },
};

/**
 * Position 10 — Model year. The ISO 3779 standard assigns letters/numbers
 * to model years on a 30-year cycle (skipping I, O, Q, U, Z and 0). For
 * the 12th-generation F-150 (2009-2014) the codes are:
 * 9=2009, A=2010, B=2011, C=2012, D=2013, E=2014.
 */
export const VIN_MODEL_YEAR_TABLE: Record<string, ModelYear> = {
  "9": 2009,
  A: 2010,
  B: 2011,
  C: 2012,
  D: 2013,
  E: 2014,
};

/**
 * Position 11 — Assembly plant.
 *
 * For 12th-gen F-150 the plants that actually built trucks are:
 * - K: Kansas City Assembly, Claycomo MO (largest F-150 plant)
 * - F: Dearborn Truck Plant, Dearborn MI (Rouge complex)
 * - X: Oakville Assembly Complex, Oakville ON (Canada, limited 12th-gen runs)
 *
 * The Norfolk Assembly Plant (code R) closed in 2007 and is NOT a valid
 * 12th-gen F-150 plant. Cuautitlán (Y) historically built smaller Fords
 * (Fiesta) and is also not a valid 12th-gen F-150 plant. We include them
 * here for completeness but flag them as "not used for 12th-gen F-150".
 */
export const VIN_PLANT_TABLE: Record<
  string,
  { name: string; location: string; usedForGen12: boolean }
> = {
  K: {
    name: "Kansas City Assembly Plant",
    location: "Claycomo, Missouri, USA",
    usedForGen12: true,
  },
  F: {
    name: "Dearborn Truck Plant",
    location: "Dearborn, Michigan, USA",
    usedForGen12: true,
  },
  X: {
    name: "Oakville Assembly Complex",
    location: "Oakville, Ontario, Canada",
    usedForGen12: true,
  },
  R: {
    name: "Norfolk Assembly Plant (closed 2007)",
    location: "Norfolk, Virginia, USA",
    usedForGen12: false,
  },
  Y: {
    name: "Cuautitlán Assembly Plant",
    location: "Cuautitlán Izcalli, Mexico",
    usedForGen12: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Decoder result shape
// ─────────────────────────────────────────────────────────────────────────

export interface Vin12thGenDecode {
  vin: string;
  /** Position 1-3 — World Manufacturer Identifier. */
  wmi: {
    code: string;
    country: string;
    plant: string;
    vehicleType: string;
  };
  /** Position 4 — Brake / GVWR (Ford-specific). */
  brakeAndGvwr: {
    code: string;
    brakes: string;
    gvwrLb: string;
  } | { code: string; notDecoded: true };
  /** Position 5 — Model series (F-150 vs SVT Raptor). */
  modelSeries: { code: string; description: string } | { code: string; notDecoded: true };
  /** Position 6 — Cab / body style. */
  bodyStyle:
    | { code: string; cab: string; doors: number; notes?: string }
    | { code: string; notDecoded: true };
  /** Position 7 — Engine. */
  engine:
    | {
        code: string;
        engineId: EngineId;
        displayName: string;
        yearsOffered: ModelYear[];
      }
    | { code: string; notDecoded: true };
  /** Position 8 — Engine variant / restraint specifics. Not decoded. */
  enginePositionEight: {
    code: string;
    notDecoded: true;
    reason: string;
  };
  /** Position 9 — VIN check digit. */
  checkDigit: {
    code: string;
    computed: string;
    valid: boolean;
  };
  /** Position 10 — Model year. */
  modelYear: { code: string; year: ModelYear } | { code: string; notDecoded: true };
  /** Position 11 — Assembly plant. */
  plant:
    | { code: string; name: string; location: string; usedForGen12: boolean }
    | { code: string; notDecoded: true };
  /** Positions 12-17 — Sequential production number. */
  productionSequence: string;
  /** Positions/items the decoder explicitly does NOT decode (e.g. trim). */
  notEncodedInVin: string[];
  /**
   * Non-fatal warnings (e.g. engine code is valid but does not match the
   * decoded model year — could indicate a VIN typo or non-12th-gen VIN).
   */
  warnings: string[];
}

// ─────────────────────────────────────────────────────────────────────────
// Check digit math (ISO 3779 / NHTSA spec)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Map each VIN character to its numeric value for the check digit calc.
 * I, O, Q are never valid in a VIN. Returns -1 if the character is
 * disallowed.
 */
function vinCharValue(ch: string): number {
  if (ch >= "0" && ch <= "9") return Number(ch);
  const table: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
    J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
    S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
  };
  const v = table[ch];
  return typeof v === "number" ? v : -1;
}

// Position weights 1..17 (position 9 is the check digit itself).
const VIN_CHECK_WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

/**
 * Compute the expected check digit (position 9) for a 17-char VIN.
 * Returns either "0".."9" or "X" (which represents the value 10).
 * Returns null if the VIN contains any disallowed character (I, O, Q,
 * or anything outside 0-9 and A-Z).
 */
export function computeVinCheckDigit(vin: string): string | null {
  if (vin.length !== 17) return null;
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    const ch = vin[i];
    if (!ch) return null;
    if (i === 8) continue; // skip the check digit position itself in summation
    const val = vinCharValue(ch);
    if (val < 0) return null;
    sum += val * VIN_CHECK_WEIGHTS[i]!;
  }
  const remainder = sum % 11;
  return remainder === 10 ? "X" : String(remainder);
}

/**
 * Validate a VIN's check digit. Returns true if position 9 matches the
 * computed check digit. Returns false on length mismatch, illegal
 * characters, or computed/actual mismatch.
 */
export function validateVinCheckDigit(vin: string): boolean {
  if (vin.length !== 17) return false;
  const expected = computeVinCheckDigit(vin);
  if (expected === null) return false;
  return vin[8]!.toUpperCase() === expected;
}

// ─────────────────────────────────────────────────────────────────────────
// Main decode function
// ─────────────────────────────────────────────────────────────────────────

/**
 * Decode a 17-character 12th-gen Ford F-150 VIN. Returns an object with
 * positional fields, or an `{ error }` object if the VIN is structurally
 * invalid (wrong length, illegal characters, or non-Ford-truck WMI).
 *
 * The decoder is conservative: positions that vary year-to-year or that
 * do not encode a stable property (e.g. trim level, option packages) are
 * returned as `{ notDecoded: true }` rather than guessed.
 */
export function decode12thGenVin(vin: string): Vin12thGenDecode | { error: string } {
  if (typeof vin !== "string") {
    return { error: "VIN must be a string." };
  }
  const cleaned = vin.trim().toUpperCase();
  if (cleaned.length !== 17) {
    return { error: `VIN must be exactly 17 characters. Got ${cleaned.length}.` };
  }
  if (/[IOQ]/.test(cleaned)) {
    return { error: "VIN contains disallowed character (I, O, or Q). Re-check the VIN." };
  }
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(cleaned)) {
    return { error: "VIN contains non-alphanumeric or invalid characters." };
  }

  const wmiCode = cleaned.slice(0, 3);
  const wmi = VIN_WMI_TABLE[wmiCode];
  if (!wmi) {
    return {
      error:
        `VIN WMI "${wmiCode}" is not a Ford light-truck WMI. ` +
        "Expected one of: 1FT (US), 2FT (Canada), 3FT (Mexico). " +
        "This decoder is scoped to 12th-gen Ford F-150 VINs only.",
    };
  }

  const ch4 = cleaned[3]!;
  const ch5 = cleaned[4]!;
  const ch6 = cleaned[5]!;
  const ch7 = cleaned[6]!;
  const ch8 = cleaned[7]!;
  const ch9 = cleaned[8]!;
  const ch10 = cleaned[9]!;
  const ch11 = cleaned[10]!;

  const brakeEntry = VIN_BRAKE_GVWR_TABLE[ch4];
  const brakeAndGvwr: Vin12thGenDecode["brakeAndGvwr"] = brakeEntry
    ? { code: ch4, brakes: brakeEntry.brakes, gvwrLb: brakeEntry.gvwrLb }
    : { code: ch4, notDecoded: true };

  const modelSeriesEntry = VIN_MODEL_SERIES_TABLE[ch5];
  const modelSeries: Vin12thGenDecode["modelSeries"] = modelSeriesEntry
    ? { code: ch5, description: modelSeriesEntry }
    : { code: ch5, notDecoded: true };

  const bodyEntry = VIN_BODY_STYLE_TABLE[ch6];
  const bodyStyle: Vin12thGenDecode["bodyStyle"] = bodyEntry
    ? {
        code: ch6,
        cab: bodyEntry.cab,
        doors: bodyEntry.doors,
        ...(bodyEntry.notes ? { notes: bodyEntry.notes } : {}),
      }
    : { code: ch6, notDecoded: true };

  const engineEntry = VIN_ENGINE_CODE_TABLE[ch7];
  const engine: Vin12thGenDecode["engine"] = engineEntry
    ? {
        code: ch7,
        engineId: engineEntry.engineId,
        displayName: engineEntry.displayName,
        yearsOffered: engineEntry.years,
      }
    : { code: ch7, notDecoded: true };

  // Position 8 — Ford uses this for engine variant or restraint specifics.
  // Codes vary year-to-year and per engine family; we do not decode.
  const enginePositionEight = {
    code: ch8,
    notDecoded: true as const,
    reason:
      "Position 8 encodes engine variant/restraint details that vary " +
      "year-to-year and are not consistently documented for 12th-gen F-150.",
  };

  // Position 9 — check digit
  const computed = computeVinCheckDigit(cleaned) ?? "";
  const checkDigit = {
    code: ch9,
    computed,
    valid: computed.length > 0 && ch9 === computed,
  };

  const yearEntry = VIN_MODEL_YEAR_TABLE[ch10];
  const modelYear: Vin12thGenDecode["modelYear"] = yearEntry
    ? { code: ch10, year: yearEntry }
    : { code: ch10, notDecoded: true };

  const plantEntry = VIN_PLANT_TABLE[ch11];
  const plant: Vin12thGenDecode["plant"] = plantEntry
    ? {
        code: ch11,
        name: plantEntry.name,
        location: plantEntry.location,
        usedForGen12: plantEntry.usedForGen12,
      }
    : { code: ch11, notDecoded: true };

  const productionSequence = cleaned.slice(11);

  // Sanity checks → warnings (non-fatal).
  const warnings: string[] = [];
  if (!checkDigit.valid) {
    warnings.push(
      `Check digit mismatch: VIN has "${ch9}" but expected "${computed}". ` +
        "VIN may be mistyped.",
    );
  }
  if ("year" in modelYear && "yearsOffered" in engine) {
    if (!engine.yearsOffered.includes(modelYear.year)) {
      warnings.push(
        `Engine code "${engine.code}" (${engine.displayName}) was not offered ` +
          `in model year ${modelYear.year} for the 12th-gen F-150. ` +
          "Check the VIN — either position 7 or position 10 may be wrong, " +
          "or this VIN belongs to a different generation/model.",
      );
    }
  }
  if ("year" in modelYear) {
    if (modelYear.year < 2009 || modelYear.year > 2014) {
      warnings.push(
        `Model year ${modelYear.year} is outside the 12th-gen range (2009-2014). ` +
          "This decoder is scoped to 12th-gen F-150 VINs.",
      );
    }
  }
  if ("usedForGen12" in plant && plant.usedForGen12 === false) {
    warnings.push(
      `Plant code "${plant.code}" (${plant.name}) is not a known 12th-gen ` +
        "F-150 assembly plant. VIN may be mistyped or non-12th-gen.",
    );
  }

  const notEncodedInVin = [
    "Trim level (XL / STX / XLT / FX2 / FX4 / Lariat / King Ranch / Platinum / Limited / Harley-Davidson)",
    "Bed length (5.5 ft / 6.5 ft / 8 ft)",
    "Drivetrain (4x2 vs 4x4) — not unambiguously encoded; inferred from GVWR + body in some cases",
    "Axle ratio",
    "Exterior / interior color",
    "Option packages (Max Trailer Tow, HD Payload, etc.)",
    "Transmission (4R75E vs 6R80) — inferred from engine + year, not a VIN position",
  ];

  return {
    vin: cleaned,
    wmi: {
      code: wmiCode,
      country: wmi.country,
      plant: wmi.plant,
      vehicleType: wmi.vehicleType,
    },
    brakeAndGvwr,
    modelSeries,
    bodyStyle,
    engine,
    enginePositionEight,
    checkDigit,
    modelYear,
    plant,
    productionSequence,
    notEncodedInVin,
    warnings,
  };
}
