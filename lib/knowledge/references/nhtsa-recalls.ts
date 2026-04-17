import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const NHTSA_RECALL_REFERENCES = [
  {
    "id": "nhtsa-recall-11v049000",
    "sourceType": "recall",
    "sourceLabel": "NHTSA Recall 11V049000",
    "title": "STRUCTURE:BODY:DOOR",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [
      "body",
      "electrical",
      "connectors_harness"
    ],
    "issueAreaIds": [
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "connector",
      "ignition_harness"
    ],
    "symptomTags": [
      "corrosion"
    ],
    "aliases": [
      "11V049000",
      "11S15",
      "STRUCTURE:BODY:DOOR"
    ],
    "excerpt": "FORD IS RECALLING CERTAIN MODEL YEAR 2009 AND 2010 F-150 VEHICLES MANUFACTURED FROM JANUARY 18, 2008, THROUGH NOVEMBER 30, 2009. THE INTERIOR DOOR HANDLE HOUSING EMBOSSMENT RETAINING THE INTERIOR DOOR HANDLE SPRING MAY FRACTURE DURING NORMAL USAGE RESULTING IN INSUFFICIENT SPRING FORCE TO RETURN THE HANDLE TO THE FULLY STOWED POSITION.",
    "safetyNote": "IN THE EVENT OF A SIDE IMPACT CRASH, THE DOOR HANDLE SPRING CAN FAIL CAUSING THE DOOR LATCH TO OPEN.",
    "sourceCitationKey": "11V049000",
    "sourceUrl": "https://www.nhtsa.gov/recalls"
  }
] satisfies TruckReferenceRecord[];

// NOTE: Four recall entries were removed during the Verse 3 audit (2026-04-16).
// The campaign numbers 14V351000, 14V153000, 13V133000, and 16V643000 were
// verified to belong to other manufacturers (Honda, GM) or other Ford models
// (Transit Connect, Escape), NOT the 2010 F-150.
//
// To add verified recalls, look up the 2010 F-150 VIN at https://www.nhtsa.gov/recalls
// and use the actual campaign numbers returned for that specific vehicle.
