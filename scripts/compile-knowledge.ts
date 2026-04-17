import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCES_DIR = path.join(ROOT, "sources");

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

type ForumThreadRecord = {
  accessMethod?: string;
  blockedAtThreadFetch?: boolean;
  consensusFix: string;
  costNote?: string;
  diyConsensus?: string;
  id: string;
  ownerTips: string[];
  problem: string;
  recommendedParts: string[];
  snippetSummary?: string;
  source: "f150forum" | "f150online" | "fordtrucks";
  title: string;
  topic: string;
  url: string;
};

type RepairPalRecord = {
  frequency: string;
  laborCostRange: [number, number] | null;
  partsCostRange: [number, number] | null;
  repairName: string;
  timeEstimate: string;
  totalCostRange: [number, number] | null;
  url?: string;
};

type PartsSourceRecord = {
  availability?: string | null;
  brand?: string | null;
  customerRating?: number | null;
  partCategory: string;
  partNumber?: string | null;
  price?: number | null;
  url?: string;
};

type NhtsaRecallRecord = {
  campaignNumber: string;
  component: string;
  consequence: string;
  manufacturerCampaignNumber?: string;
  remedy?: string;
  summary: string;
};

type NhtsaComplaintRecord = {
  component?: string;
  description?: string;
};

type CarComplaintsCategory = {
  category: string;
  complaintCount: number;
  nhtsaComplaintCount?: number | null;
};

type MaintenanceJson = {
  coolantChangeInterval: {
    initial: string;
    subsequent: string;
  };
  normalScheduleIntervals: Array<{
    id: string;
    items: string[];
    mileage: number;
  }>;
  oilChangeInterval: {
    normal: string;
    specialOperatingConditions: string;
  };
  ownerChecks: {
    everySixMonths: string[];
    monthly: string[];
    multipointInspection: string[];
  };
  source: string;
  sourceCitation: string;
  sourceFile: string;
  specialOperatingConditions: Array<{
    id: string;
    keyIntervals: string[];
    label: string;
  }>;
  vehicleScope: string;
};

type InspectionChecklistJson = {
  items: Array<{
    id: string;
    label: string;
    number: number;
    sectionCode: string;
    sectionLabel: string;
    system: string;
  }>;
};

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slug(value: string) {
  return normalize(value).replace(/\s+/g, "-");
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(readFileSync(path.join(ROOT, relativePath), "utf8")) as T;
}

function collectJsonFiles(dir: string, relativePrefix = "sources"): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const results: string[] = [];

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    const relative = path.join(relativePrefix, entry.name);

    if (entry.isDirectory()) {
      results.push(...collectJsonFiles(absolute, relative));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".json")) {
      results.push(relative);
    }
  }

  return results.sort();
}

function writeGenerated(relativePath: string, contents: string) {
  const absolute = path.join(ROOT, relativePath);
  mkdirSync(path.dirname(absolute), { recursive: true });
  writeFileSync(absolute, contents);
}

function serialize(value: unknown) {
  return JSON.stringify(value, null, 2);
}

const FORUM_TOPIC_MAP = {
  fuel_air_metering: {
    issueAreaIds: ["connector_and_harness_fitment"],
    partIds: ["fuel_pump_driver_module"],
    symptomIds: ["rough_idle"],
    systemIds: ["fuel_air_metering", "electrical"],
  },
  ignition: {
    issueAreaIds: ["ignition_misfire_path"],
    partIds: ["spark_plug", "coil"],
    symptomIds: ["misfire", "rough_idle"],
    systemIds: ["ignition", "engine_mechanical"],
  },
  timing_valvetrain: {
    issueAreaIds: ["cam_phaser_tick_context"],
    partIds: ["cam_phaser_area", "timing_cover", "vct_solenoid"],
    symptomIds: ["rattle", "ticking"],
    systemIds: ["timing_valvetrain", "engine_mechanical"],
  },
  exhaust_emissions: {
    issueAreaIds: ["exhaust_manifold_tick"],
    partIds: ["exhaust_manifold"],
    symptomIds: ["exhaust_tick", "ticking"],
    systemIds: ["exhaust_emissions", "engine_mechanical"],
  },
  cabin_controls: {
    issueAreaIds: [],
    partIds: [],
    symptomIds: [],
    systemIds: ["cabin_controls", "electrical"],
  },
  charging_accessory_noise: {
    issueAreaIds: ["accessory_drive_belt_path", "battery_charge_and_ground_path"],
    partIds: ["idler_pulley", "alternator_area", "battery", "tensioner"],
    symptomIds: ["chirp", "squeal", "dead_battery"],
    systemIds: ["accessory_drive", "charging", "electrical"],
  },
  maintenance: {
    issueAreaIds: [],
    partIds: ["battery", "brake_line", "coolant_hose", "belt"],
    symptomIds: [],
    systemIds: ["engine_mechanical", "cooling", "brakes", "underbody"],
  },
  high_mileage_maintenance: {
    issueAreaIds: ["accessory_drive_belt_path", "battery_charge_and_ground_path"],
    partIds: ["battery", "alternator_area", "belt", "idler_pulley", "tensioner"],
    symptomIds: ["dead_battery", "chirp", "squeal"],
    systemIds: ["charging", "accessory_drive", "fuel_air_metering"],
  },
  rust_prevention: {
    issueAreaIds: ["wheel_well_underbody_rust", "underbody_frame_corrosion"],
    partIds: ["wheel_well_lip", "frame_section", "brake_line"],
    symptomIds: ["rust"],
    systemIds: ["underbody", "body", "brakes"],
  },
  engine_oil: {
    issueAreaIds: ["cam_phaser_tick_context"],
    partIds: ["cam_phaser_area", "vct_solenoid", "timing_cover"],
    symptomIds: ["ticking", "rattle"],
    systemIds: ["engine_mechanical", "timing_valvetrain"],
  },
} as const;

const REPAIR_COST_MAP = {
  alternator: {
    aliases: ["alternator repair", "charging repair", "alternator swap"],
    issueAreaIds: ["battery_charge_and_ground_path", "accessory_drive_belt_path"],
    partIds: ["alternator_area", "battery", "belt"],
    symptomIds: ["dead_battery", "squeal"],
  },
  "spark plug": {
    aliases: ["plug job", "spark plug service", "plug replacement 5.4"],
    issueAreaIds: ["ignition_misfire_path"],
    partIds: ["spark_plug", "coil"],
    symptomIds: ["misfire", "rough_idle"],
  },
  "water pump": {
    aliases: ["water pump job", "pump replacement", "coolant pump replacement"],
    issueAreaIds: ["coolant_leak_source", "cooling_reservoir_and_hose_seep"],
    partIds: ["thermostat_housing", "coolant_hose", "radiator_hose"],
    symptomIds: ["leak", "coolant_smell"],
  },
  battery: {
    aliases: ["battery swap", "new battery", "battery service"],
    issueAreaIds: ["battery_terminal_corrosion", "battery_charge_and_ground_path"],
    partIds: ["battery", "battery_terminal", "ground_point"],
    symptomIds: ["dead_battery", "corrosion"],
  },
  brake: {
    aliases: ["brake fluid service", "brake hydraulic bleed", "bleed brakes"],
    issueAreaIds: ["brake_hose_or_line_concern"],
    partIds: ["brake_line", "brake_hose", "caliper_area"],
    symptomIds: ["pull", "leak"],
  },
} as const;

const ISSUE_COUNT_RULES: Array<{
  aliases: string[];
  carComplaintCategories: string[];
  complaintKeywords: string[];
  id: string;
  inspectionHint: string;
  issueAreaIds: string[];
  partTags: string[];
  symptomTags: string[];
  systemTags: string[];
  title: string;
}> = [
  {
    id: "generated-known-issue-accessory-drive",
    title: "Complaint trend: accessory-drive noise needs visual confirmation before parts replacement",
    issueAreaIds: ["accessory_drive_belt_path"],
    partTags: ["belt", "tensioner", "idler_pulley", "alternator_area"],
    symptomTags: ["chirp", "squeal", "wobble", "rattle"],
    systemTags: ["accessory_drive", "charging"],
    aliases: ["belt chirp", "idler noise", "tensioner noise", "alternator bearing"],
    complaintKeywords: ["belt", "idler", "tensioner", "alternator", "chirp", "squeal", "pulley"],
    carComplaintCategories: ["engine", "electrical"],
    inspectionHint: "Ask for the full front accessory drive first, then narrow to a single pulley only if the current view supports it.",
  },
  {
    id: "generated-known-issue-cooling-leak",
    title: "Complaint trend: coolant leaks cluster around visible hose and front-cover areas",
    issueAreaIds: ["coolant_leak_source", "cooling_reservoir_and_hose_seep"],
    partTags: ["coolant_reservoir", "radiator_hose", "coolant_hose", "thermostat_housing"],
    symptomTags: ["leak", "coolant_smell"],
    systemTags: ["cooling"],
    aliases: ["coolant leak", "thermostat housing leak", "water pump leak"],
    complaintKeywords: ["coolant", "overheat", "radiator", "water pump", "thermostat", "leak"],
    carComplaintCategories: ["engine"],
    inspectionHint: "Trace the wet path upward and keep the highest wet point in frame before naming the leaking part.",
  },
  {
    id: "generated-known-issue-ignition-misfire",
    title: "Complaint trend: rough-running 5.4 complaints often overlap coils, plugs, and connector fit",
    issueAreaIds: ["ignition_misfire_path", "connector_and_harness_fitment"],
    partTags: ["coil", "spark_plug", "connector", "ignition_harness"],
    symptomTags: ["misfire", "rough_idle"],
    systemTags: ["ignition", "electrical"],
    aliases: ["coil pack", "spark plug misfire", "plug well", "connector fit"],
    complaintKeywords: ["misfire", "rough idle", "coil", "plug", "spark", "connector"],
    carComplaintCategories: ["engine", "electrical"],
    inspectionHint: "Use the top-engine coil view and connector latch view before assuming the plug itself is the only failure.",
  },
  {
    id: "generated-known-issue-engine-top-tick",
    title: "Complaint trend: top-engine ticking must be separated from exhaust and belt-path noise",
    issueAreaIds: ["cam_phaser_tick_context", "exhaust_manifold_tick"],
    partTags: ["cam_phaser_area", "timing_cover", "exhaust_manifold"],
    symptomTags: ["ticking", "rattle", "exhaust_tick"],
    systemTags: ["timing_valvetrain", "engine_mechanical", "exhaust_emissions"],
    aliases: ["cam phaser tick", "timing rattle", "exhaust tick"],
    complaintKeywords: ["cam phaser", "timing chain", "tick", "rattle", "manifold", "exhaust stud"],
    carComplaintCategories: ["engine"],
    inspectionHint: "Request the engine-top view and the manifold edge as separate comparison shots before committing to a timing-system claim.",
  },
  {
    id: "generated-known-issue-lighting-wiring",
    title: "Complaint trend: lighting complaints often start with sockets, harness ends, and housings",
    issueAreaIds: ["lighting_socket_wiring", "lamp_housing_moisture_or_mount", "connector_and_harness_fitment"],
    partTags: ["lamp_socket", "light_bulb", "headlight_housing", "taillight_housing", "connector"],
    symptomTags: ["hyperflash", "corrosion"],
    systemTags: ["lighting", "electrical", "body"],
    aliases: ["lamp socket", "tail lamp wiring", "headlight moisture", "hyperflash"],
    complaintKeywords: ["headlight", "taillight", "socket", "lamp", "bulb", "wiring", "hyperflash"],
    carComplaintCategories: ["lights", "electrical"],
    inspectionHint: "Show the housing and the socket side together so moisture, melt, and connector clues stay in context.",
  },
  {
    id: "generated-known-issue-rust-and-lines",
    title: "Complaint trend: rust complaints matter most where structure and lines share the same area",
    issueAreaIds: ["wheel_well_underbody_rust", "underbody_frame_corrosion", "brake_hose_or_line_concern"],
    partTags: ["wheel_well_lip", "frame_section", "brake_line", "control_arm"],
    symptomTags: ["rust", "leak"],
    systemTags: ["underbody", "body", "brakes", "suspension_steering"],
    aliases: ["wheel well rust", "frame rust", "brake line rust", "control arm rust"],
    complaintKeywords: ["rust", "corrosion", "frame", "wheel well", "brake line", "control arm"],
    carComplaintCategories: ["body / paint", "brakes"],
    inspectionHint: "Use one close texture shot and one wider wheel-well or frame-context shot before judging severity.",
  },
];

function mapForumRecommendation(consensus?: string) {
  const normalized = normalize(consensus ?? "");
  if (normalized.includes("shop")) {
    return "SHOP_REQUIRED";
  }
  if (normalized.includes("care")) {
    return "INSPECT_ONLY";
  }
  if (normalized.includes("friendly")) {
    return "DIY_SAFE";
  }
  return "INSPECT_ONLY";
}

function buildForumKnowledgeEntries(threads: ForumThreadRecord[]) {
  const byKey = new Map<string, ForumThreadRecord>();

  for (const thread of threads) {
    const key = `${normalize(thread.topic)}::${normalize(thread.consensusFix)}`;
    if (!byKey.has(key)) {
      byKey.set(key, thread);
      continue;
    }

    const existing = byKey.get(key)!;
    const mergedTips = Array.from(new Set([...existing.ownerTips, ...thread.ownerTips]));
    byKey.set(key, {
      ...existing,
      ownerTips: mergedTips,
      recommendedParts: Array.from(
        new Set([...existing.recommendedParts, ...thread.recommendedParts]),
      ),
      snippetSummary: [existing.snippetSummary, thread.snippetSummary]
        .filter(Boolean)
        .join(" "),
    });
  }

  return [...byKey.values()].map((thread) => {
    const mapping =
      FORUM_TOPIC_MAP[thread.topic as keyof typeof FORUM_TOPIC_MAP] ??
      FORUM_TOPIC_MAP.maintenance;

    return {
      id: `forum-${slug(thread.source)}-${slug(thread.title)}`,
      source: thread.source,
      title: thread.title,
      url: thread.url,
      topic: thread.topic,
      summary: thread.problem,
      consensusFix: thread.consensusFix,
      ownerTips: thread.ownerTips,
      aliases: Array.from(
        new Set([
          thread.topic,
          ...thread.recommendedParts,
          ...thread.ownerTips.flatMap((tip) => tip.split(/[,/]/g).map((part) => part.trim())),
        ]),
      ).filter(Boolean),
      recommendedParts: thread.recommendedParts,
      issueAreaIds: mapping.issueAreaIds,
      partIds: mapping.partIds,
      symptomIds: mapping.symptomIds,
      systemIds: mapping.systemIds,
      recommendation: mapForumRecommendation(thread.diyConsensus),
    };
  });
}

function inferRepairCostTags(name: string) {
  const normalized = normalize(name);
  for (const [keyword, mapping] of Object.entries(REPAIR_COST_MAP)) {
    if (normalized.includes(keyword)) {
      return mapping;
    }
  }
  return {
    aliases: [name.toLowerCase()],
    issueAreaIds: [] as string[],
    partIds: [] as string[],
    symptomIds: [] as string[],
  };
}

function buildRepairCosts(
  repairPalRecords: RepairPalRecord[],
  autozoneRecords: PartsSourceRecord[],
  oreillyRecords: PartsSourceRecord[],
) {
  return repairPalRecords.map((record) => {
    const tags = inferRepairCostTags(record.repairName);
    const normalizedName = normalize(record.repairName);
    const partSourceOptions = [...autozoneRecords, ...oreillyRecords]
      .filter((option) => {
        const corpus = normalize(
          [option.partCategory, option.brand ?? "", option.partNumber ?? ""].join(" "),
        );
        return (
          corpus.includes(normalizedName) ||
          tags.partIds.some((partId) => corpus.includes(normalize(partId.replaceAll("_", " ")))) ||
          tags.aliases.some((alias) => corpus.includes(normalize(alias)))
        );
      })
      .slice(0, 4)
      .map((option) => ({
        source: autozoneRecords.includes(option) ? "autozone" : "oreilly",
        partCategory: option.partCategory,
        brand: option.brand ?? null,
        partNumber: option.partNumber ?? null,
        price: option.price ?? null,
        availability: option.availability ?? null,
        url: option.url,
      }));

    return {
      id: `repair-cost-${slug(record.repairName)}`,
      repairName: record.repairName,
      aliases: tags.aliases,
      issueAreaIds: tags.issueAreaIds,
      partIds: tags.partIds,
      symptomIds: tags.symptomIds,
      laborCostRange: record.laborCostRange,
      partsCostRange: record.partsCostRange,
      totalCostRange: record.totalCostRange,
      timeEstimate: record.timeEstimate,
      frequency: record.frequency,
      sourceUrl: record.url,
      sourceOptions: partSourceOptions,
    };
  });
}

function buildMaintenanceReferences(schedule: MaintenanceJson, checklist: InspectionChecklistJson) {
  const findInterval = (mileage: number) => {
    return schedule.normalScheduleIntervals.find((interval) => interval.mileage === mileage);
  };

  const inspectionFocus = checklist.items
    .filter((item) => {
      return (
        item.system === "cooling" ||
        item.system === "brakes" ||
        item.system === "underbody" ||
        item.system === "electrical"
      );
    })
    .slice(0, 8)
    .map((item) => item.label);

  return [
    {
      id: "maintenance-owner-checks-monthly",
      sourceType: "owner_manual",
      sourceLabel: "Ford Scheduled Maintenance",
      title: "Monthly owner checks",
      vehicleScope: "2010-ford-f150-5.4-triton",
      systemTags: ["lighting", "cooling", "battery_ground", "body"],
      issueAreaIds: ["lighting_socket_wiring", "battery_charge_and_ground_path", "cooling_reservoir_and_hose_seep"],
      partTags: ["light_bulb", "battery_terminal", "coolant_reservoir", "radiator_hose"],
      symptomTags: ["dead_battery", "coolant_smell", "hyperflash"],
      aliases: ["monthly checks", "owner checks", "monthly maintenance"],
      excerpt: schedule.ownerChecks.monthly.join(" "),
      inspectionHint: "Start with the monthly Ford owner checks before jumping to a narrow part diagnosis.",
      sourceCitationKey: "maintenance-owner-checks-monthly",
    },
    {
      id: "maintenance-owner-checks-six-month",
      sourceType: "owner_manual",
      sourceLabel: "Ford Scheduled Maintenance",
      title: "Every-six-month owner checks",
      vehicleScope: "2010-ford-f150-5.4-triton",
      systemTags: ["battery_ground", "cooling", "body", "electrical"],
      issueAreaIds: ["battery_terminal_corrosion", "cooling_reservoir_and_hose_seep"],
      partTags: ["battery_terminal", "coolant_reservoir", "coolant_hose"],
      symptomTags: ["corrosion", "coolant_smell"],
      aliases: ["6 month checks", "semi annual checks", "six month owner checks"],
      excerpt: schedule.ownerChecks.everySixMonths.join(" "),
      inspectionHint: "Battery connections, cooling strength, and warning-lamp checks are part of Ford’s six-month baseline.",
      sourceCitationKey: "maintenance-owner-checks-six-month",
    },
    {
      id: "maintenance-owner-checks-multipoint",
      sourceType: "owner_manual",
      sourceLabel: "Ford Scheduled Maintenance",
      title: "Multipoint inspection items",
      vehicleScope: "2010-ford-f150-5.4-triton",
      systemTags: ["accessory_drive", "cooling", "brakes", "suspension_steering", "underbody"],
      issueAreaIds: ["accessory_drive_belt_path", "coolant_leak_source", "brake_hose_or_line_concern", "front_suspension_joint_play"],
      partTags: ["belt", "coolant_hose", "brake_line", "ball_joint", "frame_section"],
      symptomTags: ["chirp", "leak", "clunk", "rust"],
      aliases: ["multipoint inspection", "dealer multipoint check"],
      excerpt: [...schedule.ownerChecks.multipointInspection, ...inspectionFocus].join(" "),
      inspectionHint: "Use the Ford multipoint inspection list when the session still needs a practical next target.",
      sourceCitationKey: "maintenance-owner-checks-multipoint",
    },
    {
      id: "maintenance-7500-mile-service",
      sourceType: "owner_manual",
      sourceLabel: "Ford Scheduled Maintenance",
      title: "7,500-mile service baseline",
      vehicleScope: "2010-ford-f150-5.4-triton",
      systemTags: ["engine_mechanical"],
      issueAreaIds: [],
      partTags: ["front_accessory_drive"],
      symptomTags: [],
      aliases: ["7500 mile service", "oil service interval"],
      excerpt: findInterval(7500)?.items.join(" ") ?? schedule.oilChangeInterval.normal,
      inspectionHint: "Unknown service history should keep oil-sensitive timing or valvetrain claims conservative.",
      sourceCitationKey: "maintenance-7500-mile-service",
    },
    {
      id: "maintenance-90000-mile-spark-plug-service",
      sourceType: "owner_manual",
      sourceLabel: "Ford Scheduled Maintenance",
      title: "90,000-mile spark plug service",
      vehicleScope: "2010-ford-f150-5.4-triton",
      systemTags: ["ignition", "engine_mechanical"],
      issueAreaIds: ["ignition_misfire_path"],
      partTags: ["spark_plug", "coil"],
      symptomTags: ["misfire", "rough_idle"],
      aliases: ["90000 mile spark plugs", "spark plug interval"],
      excerpt: findInterval(90000)?.items.join(" ") ?? "Ford calls for spark plug replacement at 90,000 miles.",
      inspectionHint: "If the truck is far past this interval with no plug history, plug and coil evidence deserves more attention.",
      sourceCitationKey: "maintenance-90000-mile-spark-plug-service",
    },
    {
      id: "maintenance-150000-mile-belts-fluids",
      sourceType: "owner_manual",
      sourceLabel: "Ford Scheduled Maintenance",
      title: "150,000-mile belts and fluid follow-up",
      vehicleScope: "2010-ford-f150-5.4-triton",
      systemTags: ["accessory_drive", "cooling", "drivetrain_4wd"],
      issueAreaIds: ["accessory_drive_belt_path", "drivetrain_leak_or_boot", "coolant_leak_source"],
      partTags: ["belt", "radiator_hose", "transfer_case_area", "differential_cover"],
      symptomTags: ["chirp", "leak", "coolant_smell"],
      aliases: ["150000 mile service", "belt replacement interval", "high mileage fluid service"],
      excerpt: findInterval(150000)?.items.join(" ") ?? "High-mileage schedule expands belts and fluid service.",
      inspectionHint: "A high-mileage truck with unknown service history should keep belts, cooling, and driveline fluids in view.",
      sourceCitationKey: "maintenance-150000-mile-belts-fluids",
    },
  ];
}

function summarizeCostRange(range: [number, number] | null) {
  if (!range) {
    return "cost varies";
  }
  return range[0] === range[1] ? `$${range[0]}` : `$${range[0]}-$${range[1]}`;
}

function buildRepairCostReferences(repairCosts: ReturnType<typeof buildRepairCosts>) {
  return repairCosts.map((record) => ({
    id: `repair-cost-reference-${record.id}`,
    sourceType: "repair_note",
    sourceLabel: "Repair Cost Summary",
    title: `${record.repairName} cost range`,
    vehicleScope: "2010-ford-f150-5.4-triton",
    systemTags: [],
    issueAreaIds: record.issueAreaIds,
    partTags: record.partIds,
    symptomTags: record.symptomIds,
    aliases: record.aliases,
    excerpt: `${record.repairName} usually lands around ${summarizeCostRange(record.totalCostRange)} total, with labor around ${summarizeCostRange(record.laborCostRange)} and parts around ${summarizeCostRange(record.partsCostRange)}.`,
    inspectionHint: `Use the live inspection to confirm ${record.repairName.toLowerCase()} is justified before ordering parts.`,
    sourceCitationKey: record.id,
    sourceUrl: record.sourceUrl,
  }));
}

function countMatches(texts: string[], keywords: readonly string[]) {
  const normalizedTexts = texts.map(normalize);
  return normalizedTexts.reduce((count, text) => {
    return count + (keywords.some((keyword) => text.includes(normalize(keyword))) ? 1 : 0);
  }, 0);
}

function buildGeneratedKnownIssueReferences(params: {
  carComplaintsCategories: CarComplaintsCategory[];
  forumEntries: ReturnType<typeof buildForumKnowledgeEntries>;
  nhtsaComplaints: NhtsaComplaintRecord[];
  youtubeVideoCount: number;
}) {
  const complaintTexts = params.nhtsaComplaints.map((record) => {
    return `${record.component ?? ""} ${record.description ?? ""}`;
  });

  return ISSUE_COUNT_RULES.map((rule) => {
    const nhtsaComplaintCount = countMatches(complaintTexts, rule.complaintKeywords);
    const carComplaintsCount = params.carComplaintsCategories
      .filter((category) => {
        return rule.carComplaintCategories.some((candidate) => {
          return normalize(category.category).includes(normalize(candidate));
        });
      })
      .reduce((sum, category) => sum + category.complaintCount, 0);
    const forumThreads = params.forumEntries.filter((entry) => {
      return entry.issueAreaIds.some((issueAreaId) => rule.issueAreaIds.includes(issueAreaId));
    }).length;

    return {
      id: rule.id,
      sourceType: "known_issue",
      sourceLabel: "Generated Complaint Trend",
      title: rule.title,
      vehicleScope: "2010-ford-f150-5.4-triton",
      systemTags: rule.systemTags,
      issueAreaIds: rule.issueAreaIds,
      partTags: rule.partTags,
      symptomTags: rule.symptomTags,
      aliases: rule.aliases,
      excerpt: `This issue area is supported by ${nhtsaComplaintCount} matched NHTSA complaint narratives and ${carComplaintsCount} complaint-category counts from CarComplaints for the 2010 F-150.`,
      inspectionHint: rule.inspectionHint,
      supportingCounts: {
        nhtsaComplaints: nhtsaComplaintCount,
        carComplaints: carComplaintsCount,
        forumThreads,
        videos: params.youtubeVideoCount,
      },
      sourceCitationKey: rule.id,
    };
  }).filter((record) => {
    return (
      (record.supportingCounts?.nhtsaComplaints ?? 0) > 0 ||
      (record.supportingCounts?.carComplaints ?? 0) > 0
    );
  });
}

function buildRecallReferences(recalls: NhtsaRecallRecord[]) {
  return recalls.map((recall) => ({
    id: `nhtsa-recall-${recall.campaignNumber.toLowerCase()}`,
    sourceType: "recall",
    sourceLabel: `NHTSA Recall ${recall.campaignNumber}`,
    title: recall.component,
    vehicleScope: "2010-ford-f150-5.4-triton",
    systemTags: ["body", "electrical", "connectors_harness"],
    issueAreaIds: ["connector_and_harness_fitment"],
    partTags: ["connector", "ignition_harness"],
    symptomTags: ["corrosion"],
    aliases: [recall.campaignNumber, recall.manufacturerCampaignNumber ?? "", recall.component].filter(Boolean),
    excerpt: recall.summary,
    safetyNote: recall.consequence,
    sourceCitationKey: recall.campaignNumber,
    sourceUrl: "https://www.nhtsa.gov/recalls",
  }));
}

function buildTruckRepairCostsModule(repairCosts: ReturnType<typeof buildRepairCosts>) {
  return `import type {
  TruckIssueAreaId,
  TruckPartId,
  TruckSymptomId,
} from "@/lib/knowledge/types";

export type TruckRepairCostSource = "repairpal" | "autozone" | "oreilly";

export interface TruckRepairCostSourceOption {
  availability?: string | null;
  brand?: string | null;
  partCategory: string;
  partNumber?: string | null;
  price?: number | null;
  source: TruckRepairCostSource;
  url?: string;
}

export interface TruckRepairCostRecord {
  aliases: string[];
  frequency: string;
  id: string;
  issueAreaIds: TruckIssueAreaId[];
  laborCostRange: [number, number] | null;
  partIds: TruckPartId[];
  partsCostRange: [number, number] | null;
  repairName: string;
  sourceOptions: TruckRepairCostSourceOption[];
  sourceUrl?: string;
  symptomIds: TruckSymptomId[];
  timeEstimate: string;
  totalCostRange: [number, number] | null;
}

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\\p{L}\\p{N}\\s]+/gu, " ")
    .replace(/\\s+/g, " ")
    .trim();
}

function buildRepairCostSummary(record: TruckRepairCostRecord) {
  const total =
    record.totalCostRange === null
      ? "cost varies"
      : \`$\${record.totalCostRange[0]}-$\${record.totalCostRange[1]}\`;

  return \`\${record.repairName} usually lands around \${total}. \${record.frequency}.\`;
}

export const TRUCK_REPAIR_COSTS = ${serialize(repairCosts)} satisfies TruckRepairCostRecord[];

export function getTruckRepairCostRecords() {
  return TRUCK_REPAIR_COSTS;
}

export function searchTruckRepairCosts(query: string, maxResults = 5) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return [];
  }

  return TRUCK_REPAIR_COSTS.map((record) => {
    let score = 0;
    const corpus = normalize(
      [
        record.id,
        record.repairName,
        ...record.aliases,
        ...record.issueAreaIds,
        ...record.partIds,
        ...record.symptomIds,
      ].join(" "),
    );

    if (corpus.includes(normalizedQuery)) {
      score += 8;
    }

    record.aliases.forEach((alias) => {
      if (normalize(alias).includes(normalizedQuery)) {
        score += 4;
      }
    });

    record.sourceOptions.forEach((option) => {
      const optionCorpus = normalize(
        [option.partCategory, option.brand ?? "", option.partNumber ?? ""].join(" "),
      );
      if (optionCorpus.includes(normalizedQuery)) {
        score += 2;
      }
    });

    return {
      record,
      score,
      summary: buildRepairCostSummary(record),
    };
  })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return left.record.repairName.localeCompare(right.record.repairName);
    })
    .slice(0, maxResults);
}
`;
}

function buildRepairCostReferencesModule(references: ReturnType<typeof buildRepairCostReferences>) {
  return `import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const REPAIR_COST_REFERENCES = ${serialize(references)} satisfies TruckReferenceRecord[];
`;
}

function buildMaintenanceScheduleModule(
  schedule: MaintenanceJson,
  references: ReturnType<typeof buildMaintenanceReferences>,
) {
  return `import { SUPPORTED_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export interface TruckMaintenanceSchedule {
  coolantChangeInterval: {
    initial: string;
    subsequent: string;
  };
  normalScheduleIntervals: Array<{
    id: string;
    items: string[];
    mileage: number;
  }>;
  oilChangeInterval: {
    normal: string;
    specialOperatingConditions: string;
  };
  ownerChecks: {
    everySixMonths: string[];
    monthly: string[];
    multipointInspection: string[];
  };
  source: string;
  sourceCitation: string;
  sourceFile: string;
  specialConditionsSourceExcerpt?: string;
  specialOperatingConditions: Array<{
    id: string;
    keyIntervals: string[];
    label: string;
  }>;
  vehicleScope: typeof SUPPORTED_VEHICLE_ID;
}

export const TRUCK_MAINTENANCE_SCHEDULE = ${serialize(schedule)} satisfies TruckMaintenanceSchedule;

export const MAINTENANCE_SCHEDULE_REFERENCES = ${serialize(references)} satisfies TruckReferenceRecord[];
`;
}

function buildForumKnowledgeModule(entries: ReturnType<typeof buildForumKnowledgeEntries>) {
  return `import type {
  TruckIssueAreaId,
  TruckPartId,
  TruckSymptomId,
  TruckSystemId,
} from "@/lib/knowledge/types";
import type { Recommendation } from "@/lib/types/result";

export type TruckForumSource = "f150forum" | "f150online" | "fordtrucks";

export interface TruckForumKnowledgeEntry {
  id: string;
  source: TruckForumSource;
  title: string;
  url: string;
  topic: string;
  summary: string;
  consensusFix: string;
  ownerTips: string[];
  aliases: string[];
  recommendedParts: string[];
  issueAreaIds: TruckIssueAreaId[];
  partIds: TruckPartId[];
  symptomIds: TruckSymptomId[];
  systemIds: TruckSystemId[];
  recommendation: Recommendation;
}

export const FORUM_KNOWLEDGE_ENTRIES = ${serialize(entries)} satisfies TruckForumKnowledgeEntry[];
`;
}

function buildRecallModule(recallReferences: ReturnType<typeof buildRecallReferences>) {
  return `import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const NHTSA_RECALL_REFERENCES = ${serialize(recallReferences)} satisfies TruckReferenceRecord[];
`;
}

function buildKnownIssuesGeneratedModule(records: ReturnType<typeof buildGeneratedKnownIssueReferences>) {
  return `import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const GENERATED_KNOWN_ISSUE_REFERENCES = ${serialize(records)} satisfies TruckReferenceRecord[];
`;
}

function buildCompileSummaryModule(sourceFiles: string[]) {
  return {
    compiledAt: new Date().toISOString(),
    sourceFiles,
  };
}

function main() {
  const allSourceFiles = collectJsonFiles(SOURCES_DIR);
  const allSourceSummaries = allSourceFiles.map((relativePath) => {
    const data = readJson<JsonValue>(relativePath);
    const topLevelCount = Array.isArray(data)
      ? data.length
      : typeof data === "object" && data !== null
        ? (
            (data as { records?: unknown[] }).records?.length ??
            (data as { items?: unknown[] }).items?.length ??
            (data as { parts?: unknown[] }).parts?.length ??
            (data as { normalScheduleIntervals?: unknown[] }).normalScheduleIntervals?.length ??
            Object.keys(data).length
          )
        : 0;

    return {
      relativePath,
      topLevelCount,
    };
  });
  const forums = [
    ...readJson<ForumThreadRecord[]>("sources/forums/f150forum-threads.json"),
    ...readJson<ForumThreadRecord[]>("sources/forums/f150online-threads.json"),
    ...readJson<ForumThreadRecord[]>("sources/forums/fordtrucks-threads.json"),
  ];
  const repairPal = readJson<{ records: RepairPalRecord[] }>("sources/costs/repairpal.json").records;
  const autozone = readJson<{ records: PartsSourceRecord[] }>("sources/parts/autozone.json").records;
  const oreilly = readJson<{ records: PartsSourceRecord[] }>("sources/parts/oreilly.json").records;
  const recalls = readJson<NhtsaRecallRecord[]>("sources/nhtsa/recalls.json");
  const complaints = readJson<NhtsaComplaintRecord[]>("sources/nhtsa/complaints.json");
  const carComplaints = readJson<{
    topComplaintCategories: CarComplaintsCategory[];
  }>("sources/complaints/carcomplaints.json");
  const maintenance = readJson<MaintenanceJson>("sources/ford-official/scheduled-maintenance.json");
  const checklist = readJson<InspectionChecklistJson>("sources/ford-official/inspection-checklist.json");
  const oneAAuto = readJson<{ records: JsonValue[] }>("sources/youtube/1aauto.json").records;
  const chrisFix = readJson<{ records: JsonValue[] }>("sources/youtube/chrisfix.json").records;
  const fordTechPath = path.join(ROOT, "sources", "youtube", "fordtechmakuloco.json");
  const fordTechVideos = readdirSync(path.dirname(fordTechPath)).includes("fordtechmakuloco.json")
    ? readJson<{ records?: JsonValue[] }>("sources/youtube/fordtechmakuloco.json").records ?? []
    : [];

  const forumEntries = buildForumKnowledgeEntries(forums);
  const repairCosts = buildRepairCosts(repairPal, autozone, oreilly);
  const repairCostReferences = buildRepairCostReferences(repairCosts);
  const maintenanceReferences = buildMaintenanceReferences(maintenance, checklist);
  const recallReferences = buildRecallReferences(recalls);
  const generatedKnownIssues = buildGeneratedKnownIssueReferences({
    carComplaintsCategories: carComplaints.topComplaintCategories,
    forumEntries,
    nhtsaComplaints: complaints,
    youtubeVideoCount: oneAAuto.length + chrisFix.length + fordTechVideos.length,
  });

  writeGenerated(
    "lib/knowledge/truck/forum-knowledge.ts",
    buildForumKnowledgeModule(forumEntries),
  );
  writeGenerated(
    "lib/knowledge/truck/repair-costs.ts",
    buildTruckRepairCostsModule(repairCosts),
  );
  writeGenerated(
    "lib/knowledge/references/repair-costs.ts",
    buildRepairCostReferencesModule(repairCostReferences),
  );
  writeGenerated(
    "lib/knowledge/references/maintenance-schedule.ts",
    buildMaintenanceScheduleModule(maintenance, maintenanceReferences),
  );
  writeGenerated(
    "lib/knowledge/references/nhtsa-recalls.ts",
    buildRecallModule(recallReferences),
  );
  writeGenerated(
    "lib/knowledge/references/known-issues.generated.ts",
    buildKnownIssuesGeneratedModule(generatedKnownIssues),
  );

  const summary = {
    ...buildCompileSummaryModule(allSourceFiles),
    sourceSummaries: allSourceSummaries,
  };
  console.log(JSON.stringify(summary, null, 2));
}

main();
