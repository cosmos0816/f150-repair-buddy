// 12th-generation Ford F-150 trim levels (2009-2014), excluding SVT Raptor
// (see raptor.ts). All non-Raptor trims share the same chassis and offer
// overlapping engine/trans/drivetrain combinations.

import type { TrimSpec } from "./types";

const STD_AXLE_8_8 = {
  rearRingGearIn: 8.8 as const,
  ratiosAvailable: [3.15, 3.31, 3.55, 3.73],
  rearDiffOptions: ["open", "limited_slip"] as ("open" | "limited_slip" | "electronic_locker")[],
};

const HD_AXLE_9_75 = {
  rearRingGearIn: 9.75 as const,
  ratiosAvailable: [3.31, 3.55, 3.73],
  rearDiffOptions: ["open", "limited_slip", "electronic_locker"] as (
    | "open"
    | "limited_slip"
    | "electronic_locker"
  )[],
};

export const TRIM_XL: TrimSpec = {
  id: "xl",
  displayName: "XL (Fleet / Work)",
  tier: "fleet",
  yearsOffered: [2009, 2010, 2011, 2012, 2013, 2014],
  yearConfigs: [
    {
      year: 2009,
      enginesOffered: ["4_6l_2v", "4_6l_3v", "5_4l_3v"],
      cabStylesOffered: ["regular_cab", "supercab", "supercrew"],
      bedLengthsOffered: ["5.5ft", "6.5ft", "8ft"],
      transmissionsOffered: ["4r75e", "6r80"],
      wheelDiameterIn: [17],
      axleConfigs: [STD_AXLE_8_8, HD_AXLE_9_75],
      curbWeightLbRange: [4685, 5400],
    },
    {
      year: 2010,
      enginesOffered: ["4_6l_2v", "4_6l_3v", "5_4l_3v"],
      cabStylesOffered: ["regular_cab", "supercab", "supercrew"],
      bedLengthsOffered: ["5.5ft", "6.5ft", "8ft"],
      transmissionsOffered: ["4r75e", "6r80"],
      wheelDiameterIn: [17],
      axleConfigs: [STD_AXLE_8_8, HD_AXLE_9_75],
      curbWeightLbRange: [4685, 5400],
    },
    {
      year: 2011,
      enginesOffered: ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"],
      cabStylesOffered: ["regular_cab", "supercab", "supercrew"],
      bedLengthsOffered: ["5.5ft", "6.5ft", "8ft"],
      transmissionsOffered: ["6r80"],
      wheelDiameterIn: [17],
      axleConfigs: [STD_AXLE_8_8, HD_AXLE_9_75],
    },
    {
      year: 2012,
      enginesOffered: ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"],
      cabStylesOffered: ["regular_cab", "supercab", "supercrew"],
      bedLengthsOffered: ["5.5ft", "6.5ft", "8ft"],
      transmissionsOffered: ["6r80"],
      wheelDiameterIn: [17],
      axleConfigs: [STD_AXLE_8_8, HD_AXLE_9_75],
    },
    {
      year: 2013,
      enginesOffered: ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"],
      cabStylesOffered: ["regular_cab", "supercab", "supercrew"],
      bedLengthsOffered: ["5.5ft", "6.5ft", "8ft"],
      transmissionsOffered: ["6r80"],
      wheelDiameterIn: [17],
      axleConfigs: [STD_AXLE_8_8, HD_AXLE_9_75],
    },
    {
      year: 2014,
      enginesOffered: ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"],
      cabStylesOffered: ["regular_cab", "supercab", "supercrew"],
      bedLengthsOffered: ["5.5ft", "6.5ft", "8ft"],
      transmissionsOffered: ["6r80"],
      wheelDiameterIn: [17],
      axleConfigs: [STD_AXLE_8_8, HD_AXLE_9_75],
    },
  ],
  serviceRelevantEquipment: [
    "Vinyl bench seat std",
    "Steel wheels",
    "Manual locks/windows possible on base",
    "Minimal power options",
  ],
};

export const TRIM_STX: TrimSpec = {
  id: "stx",
  displayName: "STX (Sport / Value)",
  tier: "sport_value",
  yearsOffered: [2009, 2010, 2011, 2012, 2013, 2014],
  yearConfigs: [2009, 2010, 2011, 2012, 2013, 2014].map((year) => ({
    year: year as TrimSpec["yearsOffered"][number],
    enginesOffered:
      year <= 2010
        ? ["4_6l_2v", "4_6l_3v", "5_4l_3v"]
        : ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"],
    cabStylesOffered:
      year === 2014 ? ["regular_cab", "supercab", "supercrew"] : ["regular_cab", "supercab"],
    bedLengthsOffered: year === 2014 ? ["5.5ft", "6.5ft"] : ["6.5ft"],
    transmissionsOffered: year <= 2010 ? ["4r75e", "6r80"] : ["6r80"],
    wheelDiameterIn: [18],
    axleConfigs: [STD_AXLE_8_8, HD_AXLE_9_75],
  })),
  serviceRelevantEquipment: ["Body-color front bumper/grille", "Fog lamps", "18in alloy wheels"],
};

export const TRIM_XLT: TrimSpec = {
  id: "xlt",
  displayName: "XLT (Volume)",
  tier: "volume",
  yearsOffered: [2009, 2010, 2011, 2012, 2013, 2014],
  yearConfigs: [2009, 2010, 2011, 2012, 2013, 2014].map((year) => ({
    year: year as TrimSpec["yearsOffered"][number],
    enginesOffered:
      year <= 2010
        ? ["4_6l_2v", "4_6l_3v", "5_4l_3v"]
        : ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"],
    cabStylesOffered: ["regular_cab", "supercab", "supercrew"],
    bedLengthsOffered: ["5.5ft", "6.5ft", "8ft"],
    transmissionsOffered: year <= 2010 ? ["4r75e", "6r80"] : ["6r80"],
    wheelDiameterIn: [17, 18, 20],
    axleConfigs: [STD_AXLE_8_8, HD_AXLE_9_75],
  })),
  serviceRelevantEquipment: [
    "Cloth split bench or buckets",
    "SYNC available",
    "Chrome bumper/grille std",
  ],
};

export const TRIM_FX2: TrimSpec = {
  id: "fx2",
  displayName: "FX2 (Sport, 2WD)",
  tier: "sport",
  yearsOffered: [2010, 2011, 2012, 2013, 2014],
  yearConfigs: [2010, 2011, 2012, 2013, 2014].map((year) => ({
    year: year as TrimSpec["yearsOffered"][number],
    enginesOffered:
      year === 2010
        ? ["4_6l_3v"]
        : year <= 2013
          ? ["3_5l_ecoboost", "5_0l_coyote"]
          : ["3_5l_ecoboost", "5_0l_coyote", "6_2l_boss"],
    cabStylesOffered: ["supercab", "supercrew"],
    bedLengthsOffered: ["5.5ft", "6.5ft"],
    transmissionsOffered: ["6r80"],
    wheelDiameterIn: [18, 20],
    axleConfigs: [HD_AXLE_9_75],
  })),
  serviceRelevantEquipment: [
    "Body-color grille/bumpers",
    "FX-badged interior",
    "Sport-tuned shocks",
    "4x2 only (the '2' in FX2)",
  ],
};

export const TRIM_FX4: TrimSpec = {
  id: "fx4",
  displayName: "FX4 (Sport, 4WD)",
  tier: "sport",
  yearsOffered: [2009, 2010, 2011, 2012, 2013, 2014],
  yearConfigs: [2009, 2010, 2011, 2012, 2013, 2014].map((year) => ({
    year: year as TrimSpec["yearsOffered"][number],
    enginesOffered:
      year <= 2010
        ? ["5_4l_3v"]
        : year <= 2012
          ? ["3_5l_ecoboost", "5_0l_coyote"]
          : ["3_5l_ecoboost", "5_0l_coyote", "6_2l_boss"],
    cabStylesOffered: ["supercab", "supercrew"],
    bedLengthsOffered: ["5.5ft", "6.5ft"],
    transmissionsOffered: ["6r80"],
    wheelDiameterIn: [18, 20],
    axleConfigs: [HD_AXLE_9_75],
  })),
  serviceRelevantEquipment: [
    "Off-road shocks (Rancho on later)",
    "Skid plates",
    "Hill descent control",
    "FX4-badged sill plates",
    "ESOF transfer case (BW4419)",
  ],
};

export const TRIM_LARIAT: TrimSpec = {
  id: "lariat",
  displayName: "Lariat (Luxury)",
  tier: "luxury",
  yearsOffered: [2009, 2010, 2011, 2012, 2013, 2014],
  yearConfigs: [2009, 2010, 2011, 2012, 2013, 2014].map((year) => ({
    year: year as TrimSpec["yearsOffered"][number],
    enginesOffered:
      year <= 2010 ? ["5_4l_3v"] : ["5_0l_coyote", "3_5l_ecoboost", "6_2l_boss"],
    cabStylesOffered: ["supercab", "supercrew"],
    bedLengthsOffered: ["5.5ft", "6.5ft"],
    transmissionsOffered: ["6r80"],
    wheelDiameterIn: [18, 20],
    axleConfigs: [HD_AXLE_9_75],
  })),
  serviceRelevantEquipment: [
    "Memory power seats (unique switch/module part numbers)",
    "Heated/cooled front seats from 2011",
    "Leather seating",
    "Dual-zone climate",
    "BLIS available",
  ],
};

export const TRIM_KING_RANCH: TrimSpec = {
  id: "king_ranch",
  displayName: "King Ranch (Western Luxury)",
  tier: "luxury",
  yearsOffered: [2009, 2010, 2011, 2012, 2013, 2014],
  yearConfigs: [2009, 2010, 2011, 2012, 2013, 2014].map((year) => ({
    year: year as TrimSpec["yearsOffered"][number],
    enginesOffered:
      year <= 2010 ? ["5_4l_3v"] : ["5_0l_coyote", "3_5l_ecoboost", "6_2l_boss"],
    cabStylesOffered: ["supercrew"],
    bedLengthsOffered: ["5.5ft", "6.5ft"],
    transmissionsOffered: ["6r80"],
    wheelDiameterIn: [18, 20],
    axleConfigs: [HD_AXLE_9_75],
  })),
  serviceRelevantEquipment: [
    "Castaño leather seats (unique color/grain, expensive to replace)",
    "King Ranch-embossed seat backs",
    "Saddle-colored interior trim",
  ],
};

export const TRIM_PLATINUM: TrimSpec = {
  id: "platinum",
  displayName: "Platinum (Top-tier Luxury)",
  tier: "luxury",
  yearsOffered: [2009, 2010, 2011, 2012, 2013, 2014],
  yearConfigs: [2009, 2010, 2011, 2012, 2013, 2014].map((year) => ({
    year: year as TrimSpec["yearsOffered"][number],
    enginesOffered:
      year <= 2010 ? ["5_4l_3v"] : ["5_0l_coyote", "3_5l_ecoboost", "6_2l_boss"],
    cabStylesOffered: ["supercrew"],
    bedLengthsOffered: ["5.5ft", "6.5ft"],
    transmissionsOffered: ["6r80"],
    wheelDiameterIn: [20],
    axleConfigs: [HD_AXLE_9_75],
  })),
  serviceRelevantEquipment: [
    "20in polished aluminum wheels (Platinum-specific)",
    "Heated/cooled seats std",
    "Memory driver seat",
    "Power-adjustable pedals",
    "Satin-chrome trim",
    "Sony audio",
    "Optional power running boards",
  ],
};

export const TRIM_HARLEY_DAVIDSON: TrimSpec = {
  id: "harley_davidson",
  displayName: "Harley-Davidson Edition",
  tier: "halo",
  yearsOffered: [2009, 2010, 2011, 2012],
  yearConfigs: [
    {
      year: 2009,
      enginesOffered: ["5_4l_3v"],
      cabStylesOffered: ["supercrew"],
      bedLengthsOffered: ["5.5ft"],
      transmissionsOffered: ["6r80"],
      wheelDiameterIn: [22],
      axleConfigs: [HD_AXLE_9_75],
    },
    {
      year: 2010,
      enginesOffered: ["5_4l_3v"],
      cabStylesOffered: ["supercrew"],
      bedLengthsOffered: ["5.5ft"],
      transmissionsOffered: ["6r80"],
      wheelDiameterIn: [22],
      axleConfigs: [HD_AXLE_9_75],
    },
    {
      year: 2011,
      enginesOffered: ["6_2l_boss"],
      cabStylesOffered: ["supercrew"],
      bedLengthsOffered: ["5.5ft"],
      transmissionsOffered: ["6r80"],
      wheelDiameterIn: [22],
      axleConfigs: [HD_AXLE_9_75],
    },
    {
      year: 2012,
      enginesOffered: ["6_2l_boss"],
      cabStylesOffered: ["supercrew"],
      bedLengthsOffered: ["5.5ft"],
      transmissionsOffered: ["6r80"],
      wheelDiameterIn: [22],
      axleConfigs: [HD_AXLE_9_75],
    },
  ],
  serviceRelevantEquipment: [
    "22in chrome wheels (uncommon, pricier to replace)",
    "Tuxedo Black paint typical",
    "Harley-Davidson-embossed leather",
    "Satin-chrome accents",
  ],
  notes: ["Discontinued after 2012; replaced by Limited (2013+)."],
};

export const TRIM_LIMITED: TrimSpec = {
  id: "limited",
  displayName: "Limited (Flagship, 2013+)",
  tier: "halo",
  yearsOffered: [2013, 2014],
  yearConfigs: [
    {
      year: 2013,
      enginesOffered: ["3_5l_ecoboost"],
      cabStylesOffered: ["supercrew"],
      bedLengthsOffered: ["5.5ft"],
      transmissionsOffered: ["6r80"],
      wheelDiameterIn: [22],
      axleConfigs: [HD_AXLE_9_75],
    },
    {
      year: 2014,
      enginesOffered: ["3_5l_ecoboost"],
      cabStylesOffered: ["supercrew"],
      bedLengthsOffered: ["5.5ft"],
      transmissionsOffered: ["6r80"],
      wheelDiameterIn: [22],
      axleConfigs: [HD_AXLE_9_75],
    },
  ],
  serviceRelevantEquipment: [
    "22in polished aluminum wheels (Limited-only)",
    "HID headlamps (segment-first)",
    "Power moonroof std",
    "Power-deployable running boards",
    "Rain-sensing wipers",
    "Pushbutton start",
    "Two-tone leather",
    "EcoBoost-only engine",
  ],
  notes: ["Replaces Harley-Davidson as flagship. Always EcoBoost."],
};

export const ALL_NONRAPTOR_TRIMS: Record<string, TrimSpec> = {
  xl: TRIM_XL,
  stx: TRIM_STX,
  xlt: TRIM_XLT,
  fx2: TRIM_FX2,
  fx4: TRIM_FX4,
  lariat: TRIM_LARIAT,
  king_ranch: TRIM_KING_RANCH,
  platinum: TRIM_PLATINUM,
  harley_davidson: TRIM_HARLEY_DAVIDSON,
  limited: TRIM_LIMITED,
};

export function getTrimSpec(id: string): TrimSpec | undefined {
  return ALL_NONRAPTOR_TRIMS[id];
}

export function listTrimsForYear(year: number): TrimSpec[] {
  return Object.values(ALL_NONRAPTOR_TRIMS).filter((t) =>
    t.yearsOffered.includes(year as TrimSpec["yearsOffered"][number]),
  );
}
