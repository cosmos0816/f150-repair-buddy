export type RepairBuddyMode = "mock" | "gemini";

export const SUPPORTED_VEHICLE_ID = "2010-ford-f150-5.4-triton" as const;
export const ECOBOOST_VEHICLE_ID = "2011-2014-ford-f150-3.5-ecoboost" as const;
export const COYOTE_VEHICLE_ID = "2011-2014-ford-f150-5.0-coyote" as const;
export const BOSS_VEHICLE_ID = "2011-2014-ford-f150-6.2-boss" as const;
export const RAPTOR_GEN2_VEHICLE_ID = "2017-2020-ford-f150-raptor-3.5-ecoboost-ho" as const;
export const F150_GENERAL_VEHICLE_ID = "2009-2014-ford-f150-general" as const;
// ── 12th-gen full coverage ──
export const TRITON_4_6_2V_VEHICLE_ID = "2009-ford-f150-4.6-2v" as const;
export const TRITON_4_6_3V_VEHICLE_ID = "2009-2010-ford-f150-4.6-3v" as const;
export const V6_3_7_VEHICLE_ID = "2011-2014-ford-f150-3.7-ti-vct-v6" as const;
export const SVT_RAPTOR_GEN1_VEHICLE_ID = "2010-2014-ford-f150-svt-raptor" as const;

export type SupportedVehicleId =
  | typeof SUPPORTED_VEHICLE_ID
  | typeof ECOBOOST_VEHICLE_ID
  | typeof COYOTE_VEHICLE_ID
  | typeof BOSS_VEHICLE_ID
  | typeof RAPTOR_GEN2_VEHICLE_ID
  | typeof F150_GENERAL_VEHICLE_ID
  | typeof TRITON_4_6_2V_VEHICLE_ID
  | typeof TRITON_4_6_3V_VEHICLE_ID
  | typeof V6_3_7_VEHICLE_ID
  | typeof SVT_RAPTOR_GEN1_VEHICLE_ID;

function resolveMode(value: string | undefined): RepairBuddyMode {
  return value === "gemini" ? "gemini" : "mock";
}

export const APP_CONFIG = {
  productName: "F-150 Repair Buddy MVP",
  defaultProviderMode: resolveMode(process.env.REPAIR_BUDDY_MODE),
  vehicle: {
    id: SUPPORTED_VEHICLE_ID,
    year: "2010",
    make: "Ford",
    model: "F-150",
    engine: "5.4 Triton",
  },
  supportedVehicles: [
    {
      id: SUPPORTED_VEHICLE_ID,
      year: "2010",
      make: "Ford",
      model: "F-150",
      engine: "5.4L 3V Triton V8",
    },
    {
      id: ECOBOOST_VEHICLE_ID,
      year: "2011-2014",
      make: "Ford",
      model: "F-150",
      engine: "3.5L EcoBoost V6",
    },
    {
      id: COYOTE_VEHICLE_ID,
      year: "2011-2014",
      make: "Ford",
      model: "F-150",
      engine: "5.0L Coyote V8",
    },
    {
      id: BOSS_VEHICLE_ID,
      year: "2011-2014",
      make: "Ford",
      model: "F-150",
      engine: "6.2L Boss V8",
    },
    {
      id: RAPTOR_GEN2_VEHICLE_ID,
      year: "2017-2020",
      make: "Ford",
      model: "F-150 Raptor",
      engine: "3.5L EcoBoost HO V6 (Raptor)",
    },
    {
      id: TRITON_4_6_2V_VEHICLE_ID,
      year: "2009",
      make: "Ford",
      model: "F-150",
      engine: "4.6L 2V Triton V8",
    },
    {
      id: TRITON_4_6_3V_VEHICLE_ID,
      year: "2009-2010",
      make: "Ford",
      model: "F-150",
      engine: "4.6L 3V Triton V8",
    },
    {
      id: V6_3_7_VEHICLE_ID,
      year: "2011-2014",
      make: "Ford",
      model: "F-150",
      engine: "3.7L Ti-VCT V6",
    },
    {
      id: SVT_RAPTOR_GEN1_VEHICLE_ID,
      year: "2010-2014",
      make: "Ford",
      model: "F-150 SVT Raptor",
      engine: "5.4L Triton (2010) / 6.2L Boss (2010-2014)",
    },
  ],
} as const;
