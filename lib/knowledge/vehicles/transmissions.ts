// Transmissions used in the 12th-generation Ford F-150 (2009-2014).
// Two units: 4R75E (4-speed, 2009-2010 with 4.6L 2V only) and 6R80 (6-speed,
// all other engines and years).

import type { TransmissionSpec } from "./types";

export const TRANS_4R75E: TransmissionSpec = {
  id: "4r75e",
  displayName: "4R75E 4-speed automatic",
  yearsOffered: [2009, 2010],
  fluidSpec: "mercon_v",
  fluidTotalQt: 13.9,
  fluidPanDropQt: 6,
  serviceIntervalNormalMi: 30000,
  serviceIntervalSevereMi: 30000,
  pairedEngineIds: ["4_6l_2v"],
  commonFailureModes: [
    {
      symptom: "Solenoid block wear, harsh shifts",
      rootCause: "Solenoid coil/valve body wear on high-mile examples",
      mileageOnsetMin: 150000,
      mileageOnsetMax: 250000,
      recommendation: "shop_required",
      diyDifficulty: "shop",
      estimatedCostUsd: { min: 800, max: 2500 },
    },
    {
      symptom: "Torque converter shudder at light throttle",
      rootCause: "TCC clutch wear",
      mileageOnsetMin: 150000,
      recommendation: "inspect_only",
      diyDifficulty: "shop",
    },
  ],
  notes: [
    "Legacy unit, only paired with 4.6L 2V in 12th-gen.",
    "Uses Mercon V — NOT compatible with Mercon LV.",
  ],
};

export const TRANS_6R80: TransmissionSpec = {
  id: "6r80",
  displayName: "6R80 6-speed automatic",
  yearsOffered: [2009, 2010, 2011, 2012, 2013, 2014],
  fluidSpec: "mercon_lv",
  fluidTotalQt: 12.6,
  fluidPanDropQt: 7,
  // Ford lists 6R80 as "lifetime" but community consensus is 60k first then 30-60k.
  serviceIntervalNormalMi: 150000,
  serviceIntervalSevereMi: 30000,
  pairedEngineIds: ["4_6l_3v", "5_4l_3v", "6_2l_boss", "3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"],
  commonFailureModes: [
    {
      symptom: "Stuck in 5th from start, speedometer dead, wrench light",
      rootCause: "Molded lead-frame solenoid pin corrosion (TSB 13-6-8)",
      mileageOnsetMin: 80000,
      mileageOnsetMax: 150000,
      recommendation: "shop_required",
      diyDifficulty: "shop",
      estimatedCostUsd: { min: 1200, max: 2500 },
      sourceUrls: ["https://static.nhtsa.gov/odi/tsbs/2013/SB-10053419-7635.pdf"],
    },
    {
      symptom: "Unexpected downshift to 1st gear at any speed → wheel lockup",
      rootCause: "Output Shaft Speed (OSS) signal loss. Covered by NHTSA Recall 19V-075 / 19V-433 / 24V-444.",
      recommendation: "shop_required",
      diyDifficulty: "shop",
      estimatedCostUsd: { min: 0, max: 0 },
      sourceUrls: ["https://repairpal.com/recall/19V075000"],
    },
    {
      symptom: "Shudder during 4-5 torque converter lockup",
      rootCause: "TCC slip calibration on early production",
      recommendation: "inspect_only",
      diyDifficulty: "shop",
    },
  ],
  notes: [
    "ZF 6HP design licensed by Ford. Always uses Mercon LV — never Mercon V.",
    "Some 2009-early-2010 trucks have dipsticks erroneously stamped 'Mercon SP' — disregard, use Mercon LV.",
    "Has selectable Tow-Haul mode that alters shift schedule and engine braking.",
    "Lead frame replacement is the most common high-mileage repair.",
  ],
};

export const ALL_TRANSMISSIONS: Record<TransmissionSpec["id"], TransmissionSpec> = {
  "4r75e": TRANS_4R75E,
  "6r80": TRANS_6R80,
};

export function getTransmissionSpec(id: TransmissionSpec["id"]): TransmissionSpec {
  return ALL_TRANSMISSIONS[id];
}
