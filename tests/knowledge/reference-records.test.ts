import { describe, expect, it } from "vitest";

import {
  getTruckReferenceRecords,
  searchTruckReferences,
} from "@/lib/knowledge/references/lookup";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

const RECORDS: TruckReferenceRecord[] = getTruckReferenceRecords();

describe("TruckReferenceRecord shape", () => {
  it("returns a non-empty corpus", () => {
    expect(RECORDS.length).toBeGreaterThan(200);
  });

  it("every record has required string fields", () => {
    for (const record of RECORDS) {
      expect(record.id, `record missing id`).toBeTruthy();
      expect(record.sourceLabel, `${record.id}: sourceLabel`).toBeTruthy();
      expect(record.title, `${record.id}: title`).toBeTruthy();
      expect(record.excerpt, `${record.id}: excerpt`).toBeTruthy();
      expect(record.sourceCitationKey, `${record.id}: sourceCitationKey`).toBeTruthy();
      expect(record.vehicleScope, `${record.id}: vehicleScope`).toBeTruthy();
    }
  });

  it("every record has array fields initialized (not undefined)", () => {
    for (const record of RECORDS) {
      expect(Array.isArray(record.systemTags), `${record.id}: systemTags array`).toBe(true);
      expect(Array.isArray(record.issueAreaIds), `${record.id}: issueAreaIds array`).toBe(true);
      expect(Array.isArray(record.partTags), `${record.id}: partTags array`).toBe(true);
      expect(Array.isArray(record.symptomTags), `${record.id}: symptomTags array`).toBe(true);
      expect(Array.isArray(record.aliases), `${record.id}: aliases array`).toBe(true);
    }
  });
});

describe("Reference ID uniqueness", () => {
  it("every record id is unique across the entire corpus", () => {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];
    for (const record of RECORDS) {
      if (seen.has(record.id)) {
        duplicates.push(`${record.id} appears in both "${seen.get(record.id)}" and "${record.title}"`);
      }
      seen.set(record.id, record.title);
    }
    expect(duplicates, `${duplicates.length} duplicate ids`).toEqual([]);
  });
});

describe("Search functionality", () => {
  it("returns hits for famous F-150 issues", () => {
    const famousQueries = [
      "cam phaser",
      "spark plug",
      "blend door",
      "FPDM",
      "intercooler condensation",
      "lug nut torque",
      "5W-20",
      "Mercon LV",
    ];

    for (const query of famousQueries) {
      const results = searchTruckReferences(query);
      expect(results.length, `query "${query}" returned no results`).toBeGreaterThan(0);
    }
  });

  it("returns no results for nonsense queries", () => {
    const results = searchTruckReferences("zzzzz qqqqq xxxxx");
    expect(results.length).toBe(0);
  });

  it("sorts results by descending score", () => {
    const results = searchTruckReferences("cam phaser");
    for (let i = 1; i < results.length; i++) {
      expect(results[i].score).toBeLessThanOrEqual(results[i - 1].score);
    }
  });
});
