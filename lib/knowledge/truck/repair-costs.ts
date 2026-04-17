import type {
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
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildRepairCostSummary(record: TruckRepairCostRecord) {
  const total =
    record.totalCostRange === null
      ? "cost varies"
      : `$${record.totalCostRange[0]}-$${record.totalCostRange[1]}`;

  return `${record.repairName} usually lands around ${total}. ${record.frequency}.`;
}

export const TRUCK_REPAIR_COSTS = [
  {
    "id": "repair-cost-alternator-replacement",
    "repairName": "Alternator Replacement",
    "aliases": [
      "alternator repair",
      "charging repair",
      "alternator swap"
    ],
    "issueAreaIds": [
      "battery_charge_and_ground_path",
      "accessory_drive_belt_path"
    ],
    "partIds": [
      "alternator_area",
      "battery",
      "belt"
    ],
    "symptomIds": [
      "dead_battery",
      "squeal"
    ],
    "laborCostRange": [
      134,
      197
    ],
    "partsCostRange": [
      406,
      484
    ],
    "totalCostRange": [
      540,
      680
    ],
    "timeEstimate": "moderate",
    "frequency": "common charging repair",
    "sourceUrl": "https://repairpal.com/estimator/ford/f-150/2010/alternator-replacement-cost",
    "sourceOptions": []
  },
  {
    "id": "repair-cost-spark-plug-replacement",
    "repairName": "Spark Plug Replacement",
    "aliases": [
      "plug job",
      "spark plug service",
      "plug replacement 5.4"
    ],
    "issueAreaIds": [
      "ignition_misfire_path"
    ],
    "partIds": [
      "spark_plug",
      "coil"
    ],
    "symptomIds": [
      "misfire",
      "rough_idle"
    ],
    "laborCostRange": [
      207,
      304
    ],
    "partsCostRange": [
      120,
      120
    ],
    "totalCostRange": [
      328,
      425
    ],
    "timeEstimate": "moderate_to_high on 5.4 3V",
    "frequency": "common ignition maintenance",
    "sourceUrl": "https://repairpal.com/estimator/ford/f-150/2010/spark-plug-replacement-cost",
    "sourceOptions": [
      {
        "source": "oreilly",
        "partCategory": "Ignition Coil",
        "brand": "Ultima Technologies",
        "partNumber": "IGN009-8",
        "price": null,
        "availability": "Search result snippet showed product listing; direct page fetch was access-denied.",
        "url": "https://www.oreillyauto.com/shop/b/ignition---tune-up/ignition-coil/bcbc445c20d7/v/a/130180/automotive-car-2010-ford-f-150"
      },
      {
        "source": "oreilly",
        "partCategory": "Ignition Coil",
        "brand": "Ultima Technologies",
        "partNumber": "IGN012-8",
        "price": null,
        "availability": "Search result snippet showed the coil-set family and category filters, but not price.",
        "url": "https://www.oreillyauto.com/shop/b/ignition---tune-up/ignition-coil/bcbc445c20d7/v/a/130180/automotive-car-2010-ford-f-150"
      }
    ]
  },
  {
    "id": "repair-cost-water-pump-replacement",
    "repairName": "Water Pump Replacement",
    "aliases": [
      "water pump job",
      "pump replacement",
      "coolant pump replacement"
    ],
    "issueAreaIds": [
      "coolant_leak_source",
      "cooling_reservoir_and_hose_seep"
    ],
    "partIds": [
      "thermostat_housing",
      "coolant_hose",
      "radiator_hose"
    ],
    "symptomIds": [
      "leak",
      "coolant_smell"
    ],
    "laborCostRange": [
      254,
      373
    ],
    "partsCostRange": [
      613,
      625
    ],
    "totalCostRange": [
      867,
      998
    ],
    "timeEstimate": "moderate",
    "frequency": "common cooling repair",
    "sourceUrl": "https://repairpal.com/estimator/ford/f-150/water-pump-replacement-cost",
    "sourceOptions": []
  },
  {
    "id": "repair-cost-battery-replacement",
    "repairName": "Battery Replacement",
    "aliases": [
      "battery swap",
      "new battery",
      "battery service"
    ],
    "issueAreaIds": [
      "battery_terminal_corrosion",
      "battery_charge_and_ground_path"
    ],
    "partIds": [
      "battery",
      "battery_terminal",
      "ground_point"
    ],
    "symptomIds": [
      "dead_battery",
      "corrosion"
    ],
    "laborCostRange": [
      37,
      54
    ],
    "partsCostRange": [
      210,
      210
    ],
    "totalCostRange": [
      247,
      264
    ],
    "timeEstimate": "low",
    "frequency": "common wear item",
    "sourceUrl": "https://repairpal.com/estimator/ford/f-150/2010/battery-replacement-cost",
    "sourceOptions": []
  },
  {
    "id": "repair-cost-brake-bleed",
    "repairName": "Brake Bleed",
    "aliases": [
      "brake fluid service",
      "brake hydraulic bleed",
      "bleed brakes"
    ],
    "issueAreaIds": [
      "brake_hose_or_line_concern"
    ],
    "partIds": [
      "brake_line",
      "brake_hose",
      "caliper_area"
    ],
    "symptomIds": [
      "pull",
      "leak"
    ],
    "laborCostRange": [
      61,
      90
    ],
    "partsCostRange": [
      0,
      0
    ],
    "totalCostRange": [
      61,
      90
    ],
    "timeEstimate": "low",
    "frequency": "maintenance or follow-up repair service",
    "sourceUrl": "https://repairpal.com/estimator/ford/f-150/2010/brake-bleed-cost",
    "sourceOptions": []
  }
] satisfies TruckRepairCostRecord[];

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
