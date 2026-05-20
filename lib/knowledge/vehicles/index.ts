// Aggregate exports for the 12th-generation F-150 + SVT Raptor knowledge
// layer. Import from "@/lib/knowledge/vehicles" to access trims, engines,
// transmissions, bulletins, the Raptor variant, and the RockAuto parts
// linker.

export * from "./types";
export * from "./engines";
export * from "./transmissions";
export * from "./trims";
export * from "./raptor";
export * from "./bulletins";
export * from "./parts-linker";
export * from "./years/2010";

import { ALL_ENGINES } from "./engines";
import { ALL_NONRAPTOR_TRIMS } from "./trims";
import { ALL_TRANSMISSIONS } from "./transmissions";
import { SVT_RAPTOR } from "./raptor";
import { BULLETINS } from "./bulletins";
import type { EngineId, ModelYear, TrimId } from "./types";

export const GEN12_KNOWLEDGE = {
  generationCode: "P415",
  generationYears: [2009, 2010, 2011, 2012, 2013, 2014] as ModelYear[],
  engines: ALL_ENGINES,
  transmissions: ALL_TRANSMISSIONS,
  trims: ALL_NONRAPTOR_TRIMS,
  raptor: SVT_RAPTOR,
  bulletins: BULLETINS,
};

export function listAllEngineIds(): EngineId[] {
  return Object.keys(ALL_ENGINES) as EngineId[];
}

export function listAllTrimIds(): TrimId[] {
  return [...(Object.keys(ALL_NONRAPTOR_TRIMS) as TrimId[]), "svt_raptor"];
}

export function findEngineByDisplay(displayName: string): EngineId | undefined {
  const match = Object.values(ALL_ENGINES).find((e) =>
    e.displayName.toLowerCase().includes(displayName.toLowerCase()),
  );
  return match?.id;
}
