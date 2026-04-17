export type RepairBuddyMode = "mock" | "gemini";

export const SUPPORTED_VEHICLE_ID = "2010-ford-f150-5.4-triton" as const;

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
} as const;
