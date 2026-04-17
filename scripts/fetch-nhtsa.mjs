#!/usr/bin/env node

import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";

const ROOT = process.cwd();
const TMP_DIR = "/tmp/nhtsa";
const SOURCES_DIR = path.join(ROOT, "sources", "nhtsa");
const REFERENCES_DIR = path.join(ROOT, "lib", "knowledge", "references");

const COMPLAINTS_URL =
  "https://static.nhtsa.gov/odi/ffdd/cmpl/FLAT_CMPL.zip";
const RECALLS_URL =
  "https://static.nhtsa.gov/odi/ffdd/rcl/FLAT_RCL_POST_2010.zip";
const TSB_URLS = [
  "https://static.nhtsa.gov/odi/ffdd/tsbs/TSBS_RECEIVED_2010-2014.zip",
  "https://static.nhtsa.gov/odi/ffdd/tsbs/TSBS_RECEIVED_2015-2019.zip",
  "https://static.nhtsa.gov/odi/ffdd/tsbs/TSBS_RECEIVED_2020-2024.zip",
];

const COMPLAINTS_ZIP = path.join(TMP_DIR, "complaints_all.zip");
const RECALLS_ZIP = path.join(TMP_DIR, "recalls_post_2010.zip");
const TSB_ZIPS = [
  path.join(TMP_DIR, "tsbs_2010_2014.zip"),
  path.join(TMP_DIR, "tsbs_2015_2019.zip"),
  path.join(TMP_DIR, "tsbs_2020_2024.zip"),
];

function normalizeText(value) {
  return String(value ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function toBooleanFlag(value) {
  return String(value ?? "").trim().toUpperCase() === "Y";
}

function toNumber(value) {
  const parsed = Number.parseInt(String(value ?? "").trim(), 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatDate(value) {
  const raw = String(value ?? "").trim();
  if (!/^\d{8}$/.test(raw) || raw === "00000000") {
    return null;
  }

  return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
}

function shortText(value, max = 280) {
  const normalized = normalizeText(value);
  if (normalized.length <= max) {
    return normalized;
  }
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

function writeGeneratedTs({ constName, records, outputPath }) {
  const serialized = JSON.stringify(records, null, 2).replaceAll(
    '"2010-ford-f150-5.4-triton"',
    "SUPPORTED_VEHICLE_ID",
  );
  const content = `import { SUPPORTED_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const ${constName} = ${serialized} satisfies TruckReferenceRecord[];
`;

  return fs.writeFile(outputPath, content);
}

function download(url, outputPath) {
  execFileSync("curl", ["-L", "-s", "-o", outputPath, url], {
    stdio: "inherit",
  });
}

function readZipMemberName(zipPath) {
  return execFileSync("zipinfo", ["-1", zipPath], {
    encoding: "utf8",
  })
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean);
}

async function streamZipLines(zipPath, memberName, onLine) {
  const child = spawn("unzip", ["-p", zipPath, memberName], {
    stdio: ["ignore", "pipe", "inherit"],
  });
  const rl = readline.createInterface({
    input: child.stdout,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    onLine(line);
  }

  await new Promise((resolve, reject) => {
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`unzip exited with code ${code}`));
    });
    child.on("error", reject);
  });
}

function isTargetModel(make, model, year) {
  return (
    String(make).toUpperCase() === "FORD" &&
    String(year).trim() === "2010" &&
    String(model).toUpperCase().includes("F-150")
  );
}

function baseReference(record) {
  return {
    vehicleScope: "2010-ford-f150-5.4-triton",
    aliases: [],
    excerpt: "",
    issueAreaIds: [],
    partTags: [],
    safetyNote: undefined,
    sourceUrl: "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    symptomTags: [],
    systemTags: [],
  };
}

function inferTags(text) {
  const lower = normalizeText(text).toLowerCase();
  const tags = {
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    systemTags: [],
  };

  if (/(air bag|airbag|door handle|door latch|structure:body:door|headlight|taillight|lamp housing)/.test(lower)) {
    tags.systemTags.push("body");
  }

  if (/(air bag|airbag|switch|electrical|wire|module|connector|battery)/.test(lower)) {
    tags.systemTags.push("electrical");
  }

  if (/(steering|epas|column|tie rod|suspension)/.test(lower)) {
    tags.systemTags.push("suspension_steering");
    tags.issueAreaIds.push("steering_linkage_wear");
    tags.partTags.push("tie_rod_end");
    tags.symptomTags.push("pull", "vibration", "clunk");
  }

  if (/(brake|caliper|abs|hydraulic)/.test(lower)) {
    tags.systemTags.push("brakes");
    tags.issueAreaIds.push("brake_hose_or_line_concern");
    tags.partTags.push("brake_line", "brake_hose");
    tags.symptomTags.push("leak", "pull");
  }

  if (/(coolant|water pump|thermostat|hose|degas|radiator)/.test(lower)) {
    tags.systemTags.push("cooling");
    tags.issueAreaIds.push("coolant_leak_source", "cooling_reservoir_and_hose_seep");
    tags.partTags.push("coolant_reservoir", "coolant_hose", "radiator_hose", "thermostat_housing");
    tags.symptomTags.push("leak", "coolant_smell");
  }

  if (/(cam phaser|timing chain|vct|timing|engine rattle|top engine)/.test(lower)) {
    tags.systemTags.push("timing_valvetrain", "engine_mechanical");
    tags.issueAreaIds.push("cam_phaser_tick_context");
    tags.partTags.push("cam_phaser_area", "timing_cover", "vct_solenoid");
    tags.symptomTags.push("rattle", "ticking");
  }

  if (/(spark plug|misfire|coil|plug well)/.test(lower)) {
    tags.systemTags.push("ignition");
    tags.issueAreaIds.push("ignition_misfire_path");
    tags.partTags.push("spark_plug", "coil");
    tags.symptomTags.push("misfire", "rough_idle");
  }

  if (/(manifold|exhaust tick|exhaust leak|heat shield)/.test(lower)) {
    tags.systemTags.push("exhaust_emissions");
    tags.issueAreaIds.push("exhaust_manifold_tick");
    tags.partTags.push("exhaust_manifold");
    tags.symptomTags.push("exhaust_tick", "ticking", "rattle");
  }

  if (/(throttle body|idle|stall|surge|vacuum|air leak|intake)/.test(lower)) {
    tags.systemTags.push("intake_vacuum", "fuel_air_metering");
    tags.issueAreaIds.push("intake_vacuum_air_leak");
    tags.partTags.push("throttle_body", "intake_tube", "maf_sensor", "vacuum_line");
    tags.symptomTags.push("rough_idle", "hiss");
  }

  if (/(battery|alternator|charging|ground|terminal)/.test(lower)) {
    tags.systemTags.push("charging", "battery_ground");
    tags.issueAreaIds.push("battery_charge_and_ground_path", "battery_terminal_corrosion");
    tags.partTags.push("battery", "battery_terminal", "ground_point", "alternator_area");
    tags.symptomTags.push("dead_battery", "corrosion");
  }

  if (/(lamp|socket|bulb|lighting|hyperflash)/.test(lower)) {
    tags.systemTags.push("lighting");
    tags.issueAreaIds.push("lighting_socket_wiring", "lamp_housing_moisture_or_mount");
    tags.partTags.push("lamp_socket", "light_bulb", "headlight_housing", "taillight_housing");
    tags.symptomTags.push("hyperflash", "corrosion");
  }

  if (/(rust|corrosion|frame|underbody|wheel well)/.test(lower)) {
    tags.systemTags.push("underbody", "body");
    tags.issueAreaIds.push("wheel_well_underbody_rust", "underbody_frame_corrosion");
    tags.partTags.push("frame_section", "wheel_well_lip");
    tags.symptomTags.push("rust");
  }

  if (/(4wd|hub|iwe|driveshaft|transfer case|differential)/.test(lower)) {
    tags.systemTags.push("drivetrain_4wd");
    tags.issueAreaIds.push("drivetrain_leak_or_boot");
    tags.partTags.push("iwe_solenoid_actuator", "transfer_case_area", "driveshaft_u_joint", "differential_cover");
    tags.symptomTags.push("vibration", "rattle", "clunk");
  }

  if (/(connector|harness|pin|latch|corrosion)/.test(lower)) {
    tags.systemTags.push("connectors_harness");
    tags.issueAreaIds.push("connector_and_harness_fitment");
    tags.partTags.push("connector", "ignition_harness");
    tags.symptomTags.push("corrosion");
  }

  return {
    issueAreaIds: unique(tags.issueAreaIds),
    partTags: unique(tags.partTags),
    symptomTags: unique(tags.symptomTags),
    systemTags: unique(tags.systemTags),
  };
}

function buildRecallReferences(recalls) {
  return recalls.map((recall) => {
    const combined = `${recall.component} ${recall.summary} ${recall.consequence} ${recall.remedy}`;
    const tags = inferTags(combined);
    const campaignNumber = recall.campaignNumber || recall.nhtsaCampaignNumber;

    return {
      ...baseReference(recall),
      ...tags,
      id: `nhtsa-recall-${slugify(campaignNumber)}`,
      sourceType: "recall",
      sourceLabel: `NHTSA Recall ${campaignNumber}`,
      title: shortText(recall.component || `Recall ${campaignNumber}`, 120),
      aliases: unique([
        campaignNumber,
        recall.component,
        recall.manufacturerCampaignNumber,
      ]),
      excerpt: shortText(recall.summary, 420),
      safetyNote: shortText(recall.consequence || recall.notes, 280) || undefined,
      sourceCitationKey: campaignNumber,
      sourceUrl: "https://www.nhtsa.gov/recalls",
    };
  });
}

function buildTsbReferences(tsbs) {
  return tsbs.map((tsb) => {
    const combined = `${tsb.summary} ${tsb.components.join(" ")} ${tsb.mfrSystems.join(" ")} ${tsb.mfrSubsystems.join(" ")}`;
    const tags = inferTags(combined);
    const titleSource =
      tsb.components[0] ||
      tsb.summary.split(".")[0] ||
      `TSB ${tsb.tsbDocumentId}`;

    return {
      ...baseReference(tsb),
      ...tags,
      id: `nhtsa-tsb-${slugify(tsb.nhtsaId || tsb.tsbDocumentId)}`,
      sourceType: "nhtsa_tsb_summary",
      sourceLabel: "NHTSA TSB Summary",
      title: shortText(titleSource, 120),
      aliases: unique([
        tsb.nhtsaId,
        tsb.tsbDocumentId,
        ...tsb.components.slice(0, 3),
      ]),
      excerpt: shortText(tsb.summary, 420),
      inspectionHint: shortText(
        tsb.summary.split(". ").slice(0, 2).join(". "),
        220,
      ) || undefined,
      sourceCitationKey: tsb.nhtsaId || tsb.tsbDocumentId,
      sourceUrl: "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    };
  });
}

async function parseComplaints(zipPath) {
  const member = readZipMemberName(zipPath);
  const complaints = [];

  await streamZipLines(zipPath, member, (line) => {
    if (!line.trim()) return;
    const fields = line.split("\t");
    const [
      complaintId,
      odiNumber,
      manufacturer,
      make,
      model,
      modelYear,
      crash,
      incidentDate,
      fire,
      injuries,
      deaths,
      component,
      city,
      state,
      vin,
      dateAdded,
      receivedDate,
      mileage,
      occurrences,
      description,
      complaintType,
      policeReport,
      purchaseDate,
      originalOwner,
      antiBrakes,
      cruiseControl,
      cylinders,
      driveTrain,
      fuelSystem,
      fuelType,
      transmissionType,
      vehicleSpeed,
      dot,
      tireSize,
      locOfTire,
      tireFailType,
      originalEquip,
      manufactureDate,
      seatType,
      restraintType,
      dealerName,
      dealerTel,
      dealerCity,
      dealerState,
      dealerZip,
      productType,
      repaired,
      medicalAttention,
      vehicleTowed,
    ] = fields;

    if (!isTargetModel(make, model, modelYear)) {
      return;
    }

    complaints.push({
      complaintId,
      odiNumber,
      manufacturer: normalizeText(manufacturer),
      make: normalizeText(make),
      model: normalizeText(model),
      modelYear: Number(modelYear),
      component: normalizeText(component),
      incidentDate: formatDate(incidentDate),
      receivedDate: formatDate(receivedDate),
      dateAdded: formatDate(dateAdded),
      city: normalizeText(city),
      state: normalizeText(state),
      vin: normalizeText(vin),
      mileage: toNumber(mileage),
      occurrences: toNumber(occurrences),
      description: normalizeText(description),
      complaintType: normalizeText(complaintType),
      crash: toBooleanFlag(crash),
      fire: toBooleanFlag(fire),
      injuries: toNumber(injuries),
      deaths: toNumber(deaths),
      policeReport: toBooleanFlag(policeReport),
      purchaseDate: formatDate(purchaseDate),
      originalOwner: toBooleanFlag(originalOwner),
      antiBrakes: toBooleanFlag(antiBrakes),
      cruiseControl: toBooleanFlag(cruiseControl),
      cylinders: toNumber(cylinders),
      driveTrain: normalizeText(driveTrain),
      fuelSystem: normalizeText(fuelSystem),
      fuelType: normalizeText(fuelType),
      transmissionType: normalizeText(transmissionType),
      vehicleSpeed: toNumber(vehicleSpeed),
      dealerName: normalizeText(dealerName),
      dealerCity: normalizeText(dealerCity),
      dealerState: normalizeText(dealerState),
      dealerZip: normalizeText(dealerZip),
      productType: normalizeText(productType),
      repaired: toBooleanFlag(repaired),
      medicalAttention: toBooleanFlag(medicalAttention),
      vehicleTowed: toBooleanFlag(vehicleTowed),
      tireData: {
        dot: normalizeText(dot),
        tireSize: normalizeText(tireSize),
        location: normalizeText(locOfTire),
        failureType: normalizeText(tireFailType),
        originalEquipment: toBooleanFlag(originalEquip),
        manufactureDate: formatDate(manufactureDate),
      },
      childRestraintData: {
        seatType: normalizeText(seatType),
        restraintType: normalizeText(restraintType),
      },
      dealerContact: {
        name: normalizeText(dealerName),
        telephone: normalizeText(dealerTel),
        city: normalizeText(dealerCity),
        state: normalizeText(dealerState),
        zip: normalizeText(dealerZip),
      },
    });
  });

  return complaints;
}

async function parseTsbs(zipPaths) {
  const map = new Map();

  for (const zipPath of zipPaths) {
    const member = readZipMemberName(zipPath);

    await streamZipLines(zipPath, member, (line) => {
      if (!line.trim()) return;
      const fields = line.split("\t");
      const [
        nhtsaId,
        replacementBulletinNumber,
        dateAdded,
        tsbDocumentId,
        mfrCommunicationDate,
        internalCampaignId,
        communicationType,
        make,
        model,
        modelYear,
        nhtsaComponents,
        mfrComponentSystem,
        mfrComponentSubsystem,
        summary,
      ] = fields;

      if (!isTargetModel(make, model, modelYear)) {
        return;
      }

      const key = `${nhtsaId}::${tsbDocumentId}`;
      const existing =
        map.get(key) ??
        {
          nhtsaId: normalizeText(nhtsaId),
          replacementBulletinNumber: normalizeText(replacementBulletinNumber),
          addedDate: formatDate(dateAdded),
          tsbDocumentId: normalizeText(tsbDocumentId),
          manufacturerCommunicationDate: formatDate(mfrCommunicationDate),
          internalCampaignId: normalizeText(internalCampaignId),
          communicationType: normalizeText(communicationType),
          make: normalizeText(make),
          modelYears: [],
          models: [],
          components: [],
          mfrSystems: [],
          mfrSubsystems: [],
          summary: normalizeText(summary),
        };

      existing.modelYears = unique([
        ...existing.modelYears,
        normalizeText(modelYear),
      ]);
      existing.models = unique([...existing.models, normalizeText(model)]);
      existing.components = unique([
        ...existing.components,
        ...normalizeText(nhtsaComponents)
          .split(",")
          .map((value) => normalizeText(value)),
      ]);
      existing.mfrSystems = unique([
        ...existing.mfrSystems,
        normalizeText(mfrComponentSystem),
      ]);
      existing.mfrSubsystems = unique([
        ...existing.mfrSubsystems,
        normalizeText(mfrComponentSubsystem),
      ]);

      map.set(key, existing);
    });
  }

  return [...map.values()].sort((left, right) => {
    return (right.addedDate ?? "").localeCompare(left.addedDate ?? "");
  });
}

async function parseRecalls(zipPath) {
  const member = readZipMemberName(zipPath);
  const map = new Map();

  await streamZipLines(zipPath, member, (line) => {
    if (!line.trim()) return;
    const fields = line.split("\t");
    const [
      recordId,
      campaignNumber,
      make,
      model,
      modelYear,
      manufacturerCampaignNumber,
      component,
      manufacturer,
      beginManufactureDate,
      endManufactureDate,
      recallType,
      potentialUnitsAffected,
      ownerNotificationDate,
      initiatedBy,
      recalledManufacturer,
      reportReceivedDate,
      dateAdded,
      regulationPartNumber,
      fmvss,
      summary,
      consequence,
      remedy,
      notes,
      componentId,
      manufacturerComponentName,
      manufacturerComponentDescription,
      manufacturerComponentPartNumber,
      doNotDrive,
      parkOutside,
    ] = fields;

    if (!isTargetModel(make, model, modelYear)) {
      return;
    }

    const key = normalizeText(campaignNumber);
    const existing =
      map.get(key) ??
      {
        campaignNumber: normalizeText(campaignNumber),
        manufacturerCampaignNumber: normalizeText(manufacturerCampaignNumber),
        manufacturer: normalizeText(manufacturer),
        recalledManufacturer: normalizeText(recalledManufacturer),
        reportReceivedDate: formatDate(reportReceivedDate),
        dateAdded: formatDate(dateAdded),
        ownerNotificationDate: formatDate(ownerNotificationDate),
        component: normalizeText(component),
        summary: normalizeText(summary),
        consequence: normalizeText(consequence),
        remedy: normalizeText(remedy),
        notes: normalizeText(notes),
        modelYears: [],
        models: [],
        make: normalizeText(make),
        recallType: normalizeText(recallType),
        initiatedBy: normalizeText(initiatedBy),
        potentialUnitsAffected: toNumber(potentialUnitsAffected),
        beginManufactureDate: formatDate(beginManufactureDate),
        endManufactureDate: formatDate(endManufactureDate),
        regulationPartNumber: normalizeText(regulationPartNumber),
        fmvss: normalizeText(fmvss),
        doNotDrive: /^yes$/i.test(String(doNotDrive ?? "").trim()),
        parkOutside: /^yes$/i.test(String(parkOutside ?? "").trim()),
        relatedRecords: [],
        manufacturerComponents: [],
      };

    existing.modelYears = unique([...existing.modelYears, normalizeText(modelYear)]);
    existing.models = unique([...existing.models, normalizeText(model)]);
    existing.relatedRecords.push({
      recordId: normalizeText(recordId),
      componentId: normalizeText(componentId),
    });
    if (
      normalizeText(manufacturerComponentName) ||
      normalizeText(manufacturerComponentDescription) ||
      normalizeText(manufacturerComponentPartNumber)
    ) {
      existing.manufacturerComponents.push({
        description: normalizeText(manufacturerComponentDescription),
        name: normalizeText(manufacturerComponentName),
        partNumber: normalizeText(manufacturerComponentPartNumber),
      });
    }
    existing.manufacturerComponents = unique(
      existing.manufacturerComponents.map((item) => JSON.stringify(item)),
    ).map((item) => JSON.parse(item));

    map.set(key, existing);
  });

  return [...map.values()].sort((left, right) => {
    return (right.reportReceivedDate ?? "").localeCompare(
      left.reportReceivedDate ?? "",
    );
  });
}

async function main() {
  await fs.mkdir(TMP_DIR, { recursive: true });
  await fs.mkdir(SOURCES_DIR, { recursive: true });

  download(COMPLAINTS_URL, COMPLAINTS_ZIP);
  download(RECALLS_URL, RECALLS_ZIP);
  await Promise.all(
    TSB_URLS.map((url, index) => download(url, TSB_ZIPS[index])),
  );

  const [complaints, recalls, tsbs] = await Promise.all([
    parseComplaints(COMPLAINTS_ZIP),
    parseRecalls(RECALLS_ZIP),
    parseTsbs(TSB_ZIPS),
  ]);

  await fs.writeFile(
    path.join(SOURCES_DIR, "complaints.json"),
    JSON.stringify(complaints, null, 2),
  );
  await fs.writeFile(
    path.join(SOURCES_DIR, "tsbs.json"),
    JSON.stringify(tsbs, null, 2),
  );
  await fs.writeFile(
    path.join(SOURCES_DIR, "recalls.json"),
    JSON.stringify(recalls, null, 2),
  );

  await writeGeneratedTs({
    constName: "NHTSA_RECALL_REFERENCES",
    records: buildRecallReferences(recalls),
    outputPath: path.join(REFERENCES_DIR, "nhtsa-recalls.ts"),
  });

  await writeGeneratedTs({
    constName: "NHTSA_TSB_SUMMARY_REFERENCES",
    records: buildTsbReferences(tsbs),
    outputPath: path.join(REFERENCES_DIR, "nhtsa-tsb-summaries.ts"),
  });

  console.log(
    JSON.stringify(
      {
        complaints: complaints.length,
        recalls: recalls.length,
        tsbs: tsbs.length,
      },
      null,
      2,
    ),
  );
}

await main();
