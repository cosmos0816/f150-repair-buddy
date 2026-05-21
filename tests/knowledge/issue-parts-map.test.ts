import { describe, expect, it } from "vitest";

import { ISSUE_PARTS_MAP, findPartsForIssue } from "@/lib/knowledge/issue-parts-map";

describe("ISSUE_PARTS_MAP coverage", () => {
  it("has at least 30 issue→parts mappings", () => {
    expect(ISSUE_PARTS_MAP.length).toBeGreaterThanOrEqual(30);
  });

  it("every mapping has issueId + hint fields populated", () => {
    for (const entry of ISSUE_PARTS_MAP) {
      expect(entry.issueId, `entry missing issueId`).toBeTruthy();
      expect(
        Array.isArray(entry.rockautoCategoryHints) || Array.isArray(entry.rockautoSubcategoryHints),
        `${entry.issueId}: missing rockauto hints`,
      ).toBe(true);
      expect(
        Array.isArray(entry.searchTerms) && entry.searchTerms.length > 0,
        `${entry.issueId}: searchTerms empty`,
      ).toBe(true);
    }
  });

  it("issueId values are unique", () => {
    const seen = new Set<string>();
    const duplicates: string[] = [];
    for (const entry of ISSUE_PARTS_MAP) {
      if (seen.has(entry.issueId)) duplicates.push(entry.issueId);
      seen.add(entry.issueId);
    }
    expect(duplicates).toEqual([]);
  });
});

describe("findPartsForIssue", () => {
  it("returns matched=true with hits for cam_phaser_rattle", () => {
    const result = findPartsForIssue("cam_phaser_rattle");
    expect(result.matched).toBe(true);
    expect(result.results.length).toBeGreaterThan(0);
    expect(result.results[0]).toHaveProperty("subcategory");
    expect(result.results[0]).toHaveProperty("category");
    expect(result.results[0]).toHaveProperty("rockautoUrl");
  });

  it("returns matched=true for spark_plug_ejection_risk", () => {
    const result = findPartsForIssue("spark_plug_ejection_risk");
    expect(result.matched).toBe(true);
    expect(result.results.length).toBeGreaterThan(0);
  });

  it("returns matched=false for an unmapped issue id", () => {
    const result = findPartsForIssue("definitely-not-a-real-issue" as never);
    expect(result.matched).toBe(false);
    expect(result.results).toEqual([]);
  });

  it("all mapped issues resolve without throwing", () => {
    for (const entry of ISSUE_PARTS_MAP) {
      expect(() => findPartsForIssue(entry.issueId)).not.toThrow();
    }
  });

  it("at least 40 of the 43+ mapped issues find concrete RockAuto hits", () => {
    // matched=true means concrete parts found (catalog is 5.4L Triton only,
    // so EcoBoost-only items like turbo_failure_ecoboost will be matched=false
    // until the EcoBoost catalog is scraped)
    let hitCount = 0;
    const misses: string[] = [];
    for (const entry of ISSUE_PARTS_MAP) {
      const result = findPartsForIssue(entry.issueId);
      if (result.matched) {
        hitCount++;
      } else {
        misses.push(entry.issueId);
      }
    }
    // Expect at least 40 hits; the remaining misses are EcoBoost-only items.
    expect(hitCount, `misses: ${misses.join(", ")}`).toBeGreaterThanOrEqual(40);
  });
});
