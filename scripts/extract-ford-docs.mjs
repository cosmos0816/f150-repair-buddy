#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SOURCES_DIR = path.join(ROOT, "sources", "ford-official");
const MAINTENANCE_PDF = path.join(
  SOURCES_DIR,
  "2010-f150-scheduled-maintenance-guide.pdf",
);
const INSPECTION_PDF = path.join(
  SOURCES_DIR,
  "ford-blue-advantage-inspection-checklist.pdf",
);

function pdfToText(pdfPath, firstPage, lastPage) {
  const args = ["-layout"];
  if (firstPage) {
    args.push("-f", String(firstPage));
  }
  if (lastPage) {
    args.push("-l", String(lastPage));
  }
  args.push(pdfPath, "-");

  return execFileSync("pdftotext", args, {
    encoding: "utf8",
    maxBuffer: 50 * 1024 * 1024,
  });
}

function normalize(value) {
  return String(value ?? "")
    .replace(/\u000c/g, "\n")
    .replace(/\s+/g, " ")
    .trim();
}

function toSlug(value) {
  return normalize(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseBullets(lines, startIndex) {
  const items = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index];
    const nextInterval = line.match(/^\s*([\d,]+)\s+miles\s*$/);
    const nextHeading = normalize(line);
    if (nextInterval || /^scheduled maintenance/i.test(nextHeading)) {
      break;
    }

    if (line.includes("❑")) {
      items.push(normalize(line.replace(/^.*?❑\s*/, "")));
    }

    index += 1;
  }

  return { items, nextIndex: index };
}

function extractScheduledMaintenance() {
  const guideText = pdfToText(MAINTENANCE_PDF);
  const lines = guideText.split(/\r?\n/);
  const intervals = [];

  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i]?.match(/^\s*([\d,]+)\s+miles\s*$/);
    if (!match) {
      continue;
    }

    const mileage = Number.parseInt(match[1].replaceAll(",", ""), 10);
    const { items, nextIndex } = parseBullets(lines, i + 1);
    if (items.length > 0) {
      intervals.push({
        id: `maintenance-${mileage}`,
        mileage,
        items,
      });
    }
    i = nextIndex - 1;
  }

  const ownerChecksText = pdfToText(MAINTENANCE_PDF, 8, 13);
  const ownerCheckLines = ownerChecksText.split(/\r?\n/);
  const monthlyChecks = [];
  const semiAnnualChecks = [];
  const multipointInspection = [];

  let ownerSection = "";
  for (const rawLine of ownerCheckLines) {
    const line = normalize(rawLine);
    if (!line) continue;

    if (/check every month/i.test(line)) {
      ownerSection = "monthly";
      continue;
    }
    if (/check every six months/i.test(line)) {
      ownerSection = "semiAnnual";
      continue;
    }
    if (/multi-point inspection - recommended at every visit/i.test(line)) {
      ownerSection = "multipoint";
      continue;
    }

    if (rawLine.includes("❑")) {
      const item = normalize(rawLine.replace(/^.*?❑\s*/, ""));
      if (ownerSection === "monthly") monthlyChecks.push(item);
      if (ownerSection === "semiAnnual") semiAnnualChecks.push(item);
      if (ownerSection === "multipoint") multipointInspection.push(item);
    }
  }

  const specialText = pdfToText(MAINTENANCE_PDF, 41, 45);
  const specialConditions = [
    {
      id: "towing-heavy-load",
      label: "Towing a trailer or carrying heavy loads",
      keyIntervals: [
        "Every 5,000 miles or 6 months – Change engine oil and replace oil filter.",
        "Every 30,000 miles – Change automatic transmission fluid (not required on 6R60/6R80/TorqShift transmissions).",
        "Every 60,000 miles – Change transfer case fluid and manual transmission fluid.",
      ],
    },
    {
      id: "extensive-idling-low-speed",
      label: "Extensive idling and/or low-speed driving",
      keyIntervals: [
        "Every 5,000 miles, 6 months, or 200 engine hours – Change engine oil and replace oil filter.",
        "Every 30,000 miles – Change automatic transmission fluid.",
        "Every 60,000 miles – Replace spark plugs and change transfer case fluid.",
      ],
    },
    {
      id: "dusty-conditions",
      label: "Driving in dusty conditions",
      keyIntervals: [
        "Inspect frequently – Replace engine air filter and cabin air filter as needed.",
        "Every 5,000 miles or 6 months – Change engine oil and replace oil filter.",
        "Every 30,000 miles – Change automatic transmission fluid.",
      ],
    },
    {
      id: "off-road-operation",
      label: "Off-road operation",
      keyIntervals: [
        "Every 5,000 miles or 6 months – Change engine oil and replace oil filter.",
        "Every 30,000 miles – Change automatic transmission fluid.",
        "Every 60,000 miles – Change transfer case fluid.",
      ],
    },
    {
      id: "e85-half-time-or-more",
      label: "Use of E85 50% of the time or greater",
      keyIntervals: [
        "Every 3,000 miles – Fill the tank with regular unleaded fuel if run exclusively on E85.",
        "Every 5,000 miles or 6 months – Change engine oil and replace oil filter.",
      ],
    },
  ];

  return {
    source: "2010 Ford Scheduled Maintenance Guide",
    sourceFile: "2010-f150-scheduled-maintenance-guide.pdf",
    sourceCitation: "Ford 2010 Scheduled Maintenance Guide, Trucks / Fullsize Vans / SUVs schedule pages 14-27 and special operating conditions pages 41-45.",
    vehicleScope: "2010-ford-f150-5.4-triton",
    oilChangeInterval: {
      normal: "7,500 miles or 6 months",
      specialOperatingConditions: "5,000 miles, 6 months, or 200 hours of engine operation",
    },
    coolantChangeInterval: {
      initial: "6 years or 105,000 miles",
      subsequent: "Every 3 years or 45,000 miles",
    },
    ownerChecks: {
      monthly: monthlyChecks,
      everySixMonths: semiAnnualChecks,
      multipointInspection,
    },
    normalScheduleIntervals: intervals,
    specialOperatingConditions: specialConditions,
    specialConditionsSourceExcerpt: normalize(
      specialText.slice(0, 1800),
    ),
  };
}

function sectionForChecklistNumber(number) {
  if (number === 1) return { code: "1", label: "Vehicle History", system: "history" };
  if (number >= 2 && number <= 13) return { code: "2", label: "Road Test", system: "road_test" };
  if (number >= 14 && number <= 20) return { code: "3", label: "Vehicle Exterior", system: "body" };
  if (number >= 21 && number <= 22) return { code: "4A", label: "Airbags and Safety Belts", system: "safety" };
  if (number >= 23 && number <= 25) return { code: "4B", label: "Audio and Alarm Systems", system: "interior_electrical" };
  if (number >= 26 && number <= 27) return { code: "4C", label: "Heat/Vent/AC/Defog/Defrost", system: "hvac" };
  if (number >= 28 && number <= 50) return { code: "4D", label: "Interior Amenities", system: "interior" };
  if (number === 51) return { code: "4E", label: "Sunroof/Moonroof/Convertible Top", system: "body" };
  if (number >= 52 && number <= 56) return { code: "4F", label: "Windows and Door Locks", system: "body" };
  if (number >= 57 && number <= 60) return { code: "4G", label: "Luggage Compartment", system: "body" };
  if (number === 61) return { code: "5A", label: "Module System Test", system: "electrical" };
  if (number >= 62 && number <= 70) return { code: "6A", label: "Fluids", system: "fluids" };
  if (number >= 71 && number <= 81) return { code: "6B", label: "Engine", system: "engine" };
  if (number >= 82 && number <= 87) return { code: "6C", label: "Cooling System", system: "cooling" };
  if (number >= 88 && number <= 91) return { code: "6D", label: "Fuel System", system: "fuel" };
  if (number >= 92 && number <= 96) return { code: "6E", label: "Electrical System", system: "electrical" };
  if (number >= 97 && number <= 111) return { code: "7", label: "Hybrid/Electric Vehicles", system: "hybrid_ev" };
  if (number >= 112 && number <= 113) return { code: "8A", label: "Frame", system: "underbody" };
  if (number >= 114 && number <= 115) return { code: "8B", label: "Exhaust System", system: "exhaust" };
  if (number >= 116 && number <= 120) return { code: "8C", label: "Transmission, Differential and Transfer Case", system: "drivetrain" };
  if (number >= 121 && number <= 130) return { code: "8D", label: "Tires and Wheels", system: "suspension_brakes" };
  if (number >= 131 && number <= 136) return { code: "8E", label: "Brakes", system: "brakes" };
  if (number >= 137 && number <= 139) return { code: "9", label: "Convenience / Certified Used Owner Benefits", system: "delivery_items" };
  return { code: "unknown", label: "Unknown", system: "unknown" };
}

function extractInspectionChecklist() {
  const text = pdfToText(INSPECTION_PDF);
  const matches = text.matchAll(
    /(?:^|\s)(\d{1,3})\.\s+(.+?)(?=(?:\s+\d{1,3}\.\s)|$)/gms,
  );
  const SECTION_HEADER_LABELS = new Set([
    "Vehicle Interior (continued)",
    "Underhood",
    "Underbody",
    "Road Test",
    "Vehicle Exterior",
    "Vehicle Interior",
  ]);
  const itemsByNumber = new Map();

  for (const match of matches) {
    const number = Number.parseInt(match[1], 10);
    if (!Number.isFinite(number) || number < 1 || number > 139) {
      continue;
    }

    const label = normalize(match[2]).replace(
      /\bPassed\s+Repaired\s+Replaced\s+N\/A$/i,
      "",
    );
    const cleanedLabel = normalize(match[2])
      .replace(/\bPassed\s+Repaired\s+Replaced\s+N\/A$/i, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleanedLabel || SECTION_HEADER_LABELS.has(cleanedLabel)) {
      continue;
    }

    const section = sectionForChecklistNumber(number);
    const nextItem = {
      number,
      id: `inspection-${number}`,
      label: cleanedLabel,
      sectionCode: section.code,
      sectionLabel: section.label,
      system: section.system,
      passFailStates: ["Passed", "Repaired", "Replaced", "N/A"],
    };

    const existing = itemsByNumber.get(number);
    if (!existing || nextItem.label.length > existing.label.length) {
      itemsByNumber.set(number, nextItem);
    }
  }

  const items = [...itemsByNumber.values()].sort((left, right) => {
    return left.number - right.number;
  });

  return {
    source: "Ford Blue Advantage Inspection Checklist",
    sourceFile: "ford-blue-advantage-inspection-checklist.pdf",
    sourceCitation: "Ford Blue Advantage inspection checklist FCPO-INSPECT-20.",
    vehicleScope: "2010-ford-f150-5.4-triton",
    totalItems: items.length,
    items,
  };
}

async function main() {
  const scheduledMaintenance = extractScheduledMaintenance();
  const inspectionChecklist = extractInspectionChecklist();

  await fs.writeFile(
    path.join(SOURCES_DIR, "scheduled-maintenance.json"),
    JSON.stringify(scheduledMaintenance, null, 2),
  );
  await fs.writeFile(
    path.join(SOURCES_DIR, "inspection-checklist.json"),
    JSON.stringify(inspectionChecklist, null, 2),
  );

  console.log(
    JSON.stringify(
      {
        inspectionItems: inspectionChecklist.totalItems,
        maintenanceIntervals: scheduledMaintenance.normalScheduleIntervals.length,
      },
      null,
      2,
    ),
  );
}

await main();
