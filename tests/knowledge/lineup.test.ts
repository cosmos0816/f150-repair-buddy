import { describe, expect, it } from "vitest";

import { LINEUP_2009, getAllVariants2009 } from "@/lib/knowledge/vehicles/years/2009";
import { LINEUP_2010, getAllVariants2010 } from "@/lib/knowledge/vehicles/years/2010";
import { LINEUP_2011, getAllVariants2011 } from "@/lib/knowledge/vehicles/years/2011";
import { LINEUP_2012, getAllVariants2012 } from "@/lib/knowledge/vehicles/years/2012";
import { LINEUP_2013, getAllVariants2013 } from "@/lib/knowledge/vehicles/years/2013";
import { LINEUP_2014, getAllVariants2014 } from "@/lib/knowledge/vehicles/years/2014";

describe("12th-gen lineup matrix", () => {
  const allYears = [
    { year: 2009, lineup: LINEUP_2009, variants: getAllVariants2009() },
    { year: 2010, lineup: LINEUP_2010, variants: getAllVariants2010() },
    { year: 2011, lineup: LINEUP_2011, variants: getAllVariants2011() },
    { year: 2012, lineup: LINEUP_2012, variants: getAllVariants2012() },
    { year: 2013, lineup: LINEUP_2013, variants: getAllVariants2013() },
    { year: 2014, lineup: LINEUP_2014, variants: getAllVariants2014() },
  ];

  it("every year has at least 50 variants", () => {
    for (const { year, variants } of allYears) {
      expect(variants.length, `${year} has too few variants`).toBeGreaterThanOrEqual(50);
    }
  });

  it("total 12th-gen variants exceeds 600", () => {
    const total = allYears.reduce((sum, { variants }) => sum + variants.length, 0);
    expect(total).toBeGreaterThan(600);
  });

  it("every variant has a unique key within its year", () => {
    for (const { year, variants } of allYears) {
      const seen = new Set<string>();
      const duplicates: string[] = [];
      for (const v of variants) {
        if (seen.has(v.variantKey)) duplicates.push(v.variantKey);
        seen.add(v.variantKey);
      }
      expect(duplicates, `${year} has duplicate variant keys`).toEqual([]);
    }
  });

  it("every variant has a 4-character year prefix matching its year file", () => {
    for (const { year, variants } of allYears) {
      for (const v of variants) {
        expect(v.year, `${v.variantKey} has wrong year`).toBe(year);
      }
    }
  });

  it("2011 introduces the post-Triton engine lineup", () => {
    const engines2011 = new Set(LINEUP_2011.variants.map((v) => v.engine));
    // 2011 dropped the Tritons (4.6/5.4) and introduced EcoBoost/Coyote/Boss/V6
    expect(engines2011).toContain("3_5l_ecoboost");
    expect(engines2011).toContain("5_0l_coyote");
    expect(engines2011).toContain("6_2l_boss");
    expect(engines2011).toContain("3_7l_tivct");
    // Triton 5.4 should be gone in 2011
    expect(engines2011).not.toContain("5_4l_3v");
  });

  it("2010 still has 5.4 Triton (carryover from 11th-gen)", () => {
    const engines2010 = new Set(LINEUP_2010.variants.map((v) => v.engine));
    expect(engines2010).toContain("5_4l_3v");
  });

  it("2013 adds the Limited trim", () => {
    const trims2013 = new Set(LINEUP_2013.variants.map((v) => v.trim));
    expect(trims2013).toContain("limited");
    const trims2012 = new Set(LINEUP_2012.variants.map((v) => v.trim));
    expect(trims2012).not.toContain("limited");
  });

  it("2014 adds the Tremor trim", () => {
    const trims2014 = new Set(LINEUP_2014.variants.map((v) => v.trim));
    expect(trims2014).toContain("tremor");
    const trims2013 = new Set(LINEUP_2013.variants.map((v) => v.trim));
    expect(trims2013).not.toContain("tremor");
  });
});
