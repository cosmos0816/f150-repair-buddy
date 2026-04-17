import { SUPPORTED_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const FORD_OWNER_GUIDE_REFERENCES: TruckReferenceRecord[] = [
  {
    id: "owner-guide-under-hood-checks",
    sourceType: "owner_manual",
    sourceLabel: "Ford Owner Guide",
    title: "Under-hood visual checks",
    vehicleScope: SUPPORTED_VEHICLE_ID,
    systemTags: ["accessory_drive", "cooling", "electrical"],
    issueAreaIds: ["accessory_drive_belt_path", "coolant_leak_source", "connector_and_harness_fitment"],
    partTags: ["belt", "coolant_hose", "connector"],
    symptomTags: ["chirp", "leak", "coolant_smell"],
    aliases: ["under hood checks", "engine bay visual inspection"],
    excerpt: "Start with a steady wide visual sweep before moving closer to the most suspicious area.",
    inspectionHint: "Use one wide frame and one close frame instead of several shaky close-ups.",
    safetyNote: "Do not place hands near moving belts or fans during an engine-running inspection.",
    sourceCitationKey: "ford-owner-guide-2010-f150-under-hood-checks",
  },
  {
    id: "owner-guide-lighting-path-check",
    sourceType: "owner_manual",
    sourceLabel: "Ford Owner Guide",
    title: "Exterior lamp path check",
    vehicleScope: SUPPORTED_VEHICLE_ID,
    systemTags: ["lighting", "electrical", "body"],
    issueAreaIds: ["lighting_socket_wiring", "lamp_housing_moisture_or_mount"],
    partTags: ["lamp_socket", "light_bulb", "headlight_housing", "taillight_housing"],
    symptomTags: ["hyperflash", "corrosion"],
    aliases: ["lamp check", "bulb and socket check"],
    excerpt: "Check the affected lamp assembly first, then inspect the bulb, socket, and connector path.",
    inspectionHint: "Show the housing and the socket side in the same session.",
    sourceCitationKey: "ford-owner-guide-2010-f150-exterior-lamps",
  },
];
