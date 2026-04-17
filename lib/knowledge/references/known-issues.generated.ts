import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const GENERATED_KNOWN_ISSUE_REFERENCES = [
  {
    "id": "generated-known-issue-accessory-drive",
    "sourceType": "known_issue",
    "sourceLabel": "Generated Complaint Trend",
    "title": "Complaint trend: accessory-drive noise needs visual confirmation before parts replacement",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [
      "accessory_drive",
      "charging"
    ],
    "issueAreaIds": [
      "accessory_drive_belt_path"
    ],
    "partTags": [
      "belt",
      "tensioner",
      "idler_pulley",
      "alternator_area"
    ],
    "symptomTags": [
      "chirp",
      "squeal",
      "wobble",
      "rattle"
    ],
    "aliases": [
      "belt chirp",
      "idler noise",
      "tensioner noise",
      "alternator bearing"
    ],
    "excerpt": "This issue area is supported by 33 matched NHTSA complaint narratives and 48 complaint-category counts from CarComplaints for the 2010 F-150.",
    "inspectionHint": "Ask for the full front accessory drive first, then narrow to a single pulley only if the current view supports it.",
    "supportingCounts": {
      "nhtsaComplaints": 33,
      "carComplaints": 48,
      "forumThreads": 2,
      "videos": 11
    },
    "sourceCitationKey": "generated-known-issue-accessory-drive"
  },
  {
    "id": "generated-known-issue-cooling-leak",
    "sourceType": "known_issue",
    "sourceLabel": "Generated Complaint Trend",
    "title": "Complaint trend: coolant leaks cluster around visible hose and front-cover areas",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [
      "cooling"
    ],
    "issueAreaIds": [
      "coolant_leak_source",
      "cooling_reservoir_and_hose_seep"
    ],
    "partTags": [
      "coolant_reservoir",
      "radiator_hose",
      "coolant_hose",
      "thermostat_housing"
    ],
    "symptomTags": [
      "leak",
      "coolant_smell"
    ],
    "aliases": [
      "coolant leak",
      "thermostat housing leak",
      "water pump leak"
    ],
    "excerpt": "This issue area is supported by 100 matched NHTSA complaint narratives and 40 complaint-category counts from CarComplaints for the 2010 F-150.",
    "inspectionHint": "Trace the wet path upward and keep the highest wet point in frame before naming the leaking part.",
    "supportingCounts": {
      "nhtsaComplaints": 100,
      "carComplaints": 40,
      "forumThreads": 0,
      "videos": 11
    },
    "sourceCitationKey": "generated-known-issue-cooling-leak"
  },
  {
    "id": "generated-known-issue-ignition-misfire",
    "sourceType": "known_issue",
    "sourceLabel": "Generated Complaint Trend",
    "title": "Complaint trend: rough-running 5.4 complaints often overlap coils, plugs, and connector fit",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [
      "ignition",
      "electrical"
    ],
    "issueAreaIds": [
      "ignition_misfire_path",
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "coil",
      "spark_plug",
      "connector",
      "ignition_harness"
    ],
    "symptomTags": [
      "misfire",
      "rough_idle"
    ],
    "aliases": [
      "coil pack",
      "spark plug misfire",
      "plug well",
      "connector fit"
    ],
    "excerpt": "This issue area is supported by 27 matched NHTSA complaint narratives and 48 complaint-category counts from CarComplaints for the 2010 F-150.",
    "inspectionHint": "Use the top-engine coil view and connector latch view before assuming the plug itself is the only failure.",
    "supportingCounts": {
      "nhtsaComplaints": 27,
      "carComplaints": 48,
      "forumThreads": 3,
      "videos": 11
    },
    "sourceCitationKey": "generated-known-issue-ignition-misfire"
  },
  {
    "id": "generated-known-issue-engine-top-tick",
    "sourceType": "known_issue",
    "sourceLabel": "Generated Complaint Trend",
    "title": "Complaint trend: top-engine ticking must be separated from exhaust and belt-path noise",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [
      "timing_valvetrain",
      "engine_mechanical",
      "exhaust_emissions"
    ],
    "issueAreaIds": [
      "cam_phaser_tick_context",
      "exhaust_manifold_tick"
    ],
    "partTags": [
      "cam_phaser_area",
      "timing_cover",
      "exhaust_manifold"
    ],
    "symptomTags": [
      "ticking",
      "rattle",
      "exhaust_tick"
    ],
    "aliases": [
      "cam phaser tick",
      "timing rattle",
      "exhaust tick"
    ],
    "excerpt": "This issue area is supported by 34 matched NHTSA complaint narratives and 40 complaint-category counts from CarComplaints for the 2010 F-150.",
    "inspectionHint": "Request the engine-top view and the manifold edge as separate comparison shots before committing to a timing-system claim.",
    "supportingCounts": {
      "nhtsaComplaints": 34,
      "carComplaints": 40,
      "forumThreads": 4,
      "videos": 11
    },
    "sourceCitationKey": "generated-known-issue-engine-top-tick"
  },
  {
    "id": "generated-known-issue-lighting-wiring",
    "sourceType": "known_issue",
    "sourceLabel": "Generated Complaint Trend",
    "title": "Complaint trend: lighting complaints often start with sockets, harness ends, and housings",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [
      "lighting",
      "electrical",
      "body"
    ],
    "issueAreaIds": [
      "lighting_socket_wiring",
      "lamp_housing_moisture_or_mount",
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "lamp_socket",
      "light_bulb",
      "headlight_housing",
      "taillight_housing",
      "connector"
    ],
    "symptomTags": [
      "hyperflash",
      "corrosion"
    ],
    "aliases": [
      "lamp socket",
      "tail lamp wiring",
      "headlight moisture",
      "hyperflash"
    ],
    "excerpt": "This issue area is supported by 57 matched NHTSA complaint narratives and 23 complaint-category counts from CarComplaints for the 2010 F-150.",
    "inspectionHint": "Show the housing and the socket side together so moisture, melt, and connector clues stay in context.",
    "supportingCounts": {
      "nhtsaComplaints": 57,
      "carComplaints": 23,
      "forumThreads": 2,
      "videos": 11
    },
    "sourceCitationKey": "generated-known-issue-lighting-wiring"
  },
  {
    "id": "generated-known-issue-rust-and-lines",
    "sourceType": "known_issue",
    "sourceLabel": "Generated Complaint Trend",
    "title": "Complaint trend: rust complaints matter most where structure and lines share the same area",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [
      "underbody",
      "body",
      "brakes",
      "suspension_steering"
    ],
    "issueAreaIds": [
      "wheel_well_underbody_rust",
      "underbody_frame_corrosion",
      "brake_hose_or_line_concern"
    ],
    "partTags": [
      "wheel_well_lip",
      "frame_section",
      "brake_line",
      "control_arm"
    ],
    "symptomTags": [
      "rust",
      "leak"
    ],
    "aliases": [
      "wheel well rust",
      "frame rust",
      "brake line rust",
      "control arm rust"
    ],
    "excerpt": "This issue area is supported by 77 matched NHTSA complaint narratives and 59 complaint-category counts from CarComplaints for the 2010 F-150.",
    "inspectionHint": "Use one close texture shot and one wider wheel-well or frame-context shot before judging severity.",
    "supportingCounts": {
      "nhtsaComplaints": 77,
      "carComplaints": 59,
      "forumThreads": 1,
      "videos": 11
    },
    "sourceCitationKey": "generated-known-issue-rust-and-lines"
  }
] satisfies TruckReferenceRecord[];
