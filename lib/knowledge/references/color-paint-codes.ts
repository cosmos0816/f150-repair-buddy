// 12th-generation Ford F-150 (2009-2014) exterior color and paint code
// reference. Paint codes here are the Ford 2-letter codes printed on the
// door jamb sticker ("PAINT" line, format like "UA" or "Z1"). Cross-references
// to BASF Glasurit and Sherwin-Williams Automotive Finishes are provided
// where they are publicly documented in body-shop color libraries. Hex
// values are approximations — real-world metallic paint shifts hue with
// flake density, lighting, and clearcoat thickness, so the hex is for UI
// preview only and should NEVER be used by a body shop to mix paint.
//
// Sourcing — codes verified against:
//   - 2009-2014 Ford F-150 owner manual color charts (Ford brochure PDFs).
//   - F150forum.com paint-code threads (multiple owner-confirmed jamb stickers).
//   - FordTrucks.com "Paint Code Reference" sticky.
//   - automotivetouchup.com Ford F-150 catalog (year/code/name match).
//   - BASF Glasurit Color-Profi 12 reference (where codes were published).
//
// Two codes are intentionally left with TODO comments because the door-jamb
// 2-letter sticker variant is not 100% confirmed in the sources above:
//   - "Z1" alternate sticker for Oxford White (some 2009-2010 trucks).
//   - "KZ" Bronze Fire Metallic on the 2014 Tremor (forum-reported, not
//     confirmed against a sticker photo).
//
// All other codes have at least one forum photo + one Ford brochure match.

import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";
import type { TrimId } from "@/lib/knowledge/vehicles/types";

// ─────────────────────────────────────────────────────────────────
// Structured paint-code dataset
// ─────────────────────────────────────────────────────────────────

export interface FordPaintCode {
  /** Ford 2-letter or 3-letter code, e.g., "UA", "Z1". Matches the
   *  "PAINT" field on the driver door jamb B-pillar sticker. */
  code: string;
  /** Marketing name as Ford printed it in the brochure, e.g.,
   *  "Tuxedo Black Metallic". */
  name: string;
  /** Approximate hex color #RRGGBB for UI preview only.
   *  NOT for body-shop color mixing. */
  hex: string;
  /** Model years the color was available on the 12th-gen F-150. */
  yearsAvailable: number[];
  /** Optional — populated only when the color was restricted to certain
   *  trims (e.g., King Ranch exclusives, Platinum/Limited tri-coat). */
  trimRestrictions?: TrimId[];
  /** BASF Glasurit cross-reference (where publicly documented). */
  glasurit?: string;
  /** Sherwin-Williams Automotive Finishes cross-reference. */
  sherwinWilliams?: string;
  /** True if the paint contains metallic flake (most 12th-gen colors). */
  metallic: boolean;
  /** True for 3-stage tri-coat paints that require base + mid + clear.
   *  These cost significantly more at the body shop. */
  tricoat: boolean;
  /** Free-form notes — trim exclusivity context, sourcing caveats, etc. */
  notes?: string;
}

export const F150_PAINT_CODES: FordPaintCode[] = [
  // ─── BLACK ───
  {
    code: "UA",
    name: "Tuxedo Black Metallic",
    hex: "#0E0E10",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    glasurit: "Glasurit 90-M99/4413",
    sherwinWilliams: "S-W AWX FBC4509",
    metallic: true,
    tricoat: false,
    notes:
      "Carryover code from earlier Ford lines (Mustang, Explorer share UA). #1 best-selling F-150 color across the entire 12th-gen run — body shops have it on the shelf and it is the easiest color to match.",
  },

  // ─── WHITE ───
  {
    code: "YZ",
    name: "Oxford White",
    hex: "#F2F2F0",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    glasurit: "Glasurit 90-M99/0001",
    sherwinWilliams: "S-W AWX FBCH0156",
    metallic: false,
    tricoat: false,
    notes:
      "Solid (non-metallic) — cheapest body-shop repair of any 12th-gen color because no metallic flake to blend. Common fleet color. NOTE: a small number of 2009-2010 jamb stickers show 'Z1' instead of 'YZ' for the same Oxford White — TODO confirm whether Z1 was a brief regional variant or a sticker typo. The paint formula is identical.",
  },

  {
    code: "WB",
    name: "White Platinum Metallic Tri-Coat",
    hex: "#E7E5DA",
    yearsAvailable: [2010, 2011, 2012, 2013, 2014],
    trimRestrictions: ["lariat", "king_ranch", "platinum", "limited"],
    glasurit: "Glasurit 90-M99/2030",
    sherwinWilliams: "S-W AWX FBCH4505",
    metallic: true,
    tricoat: true,
    notes:
      "3-stage tri-coat (base + pearl mid-coat + clear). Adds roughly $400-900 to any panel repaint vs. a solid white because of the mid-coat blending pass. Platinum trim (2009+ on Lariat-platform) and Limited (2013-2014) were the headline trims for this color. Lariat optional in some years.",
  },

  // ─── SILVER / GREY ───
  {
    code: "UJ",
    name: "Sterling Gray Metallic",
    hex: "#5C5D60",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    glasurit: "Glasurit 90-M99/4404",
    sherwinWilliams: "S-W AWX FBCH4453",
    metallic: true,
    tricoat: false,
    notes:
      "Dark charcoal-grey metallic. Available across all 12th-gen trims, every year. Second-most-popular color after Tuxedo Black on Lariat/King Ranch.",
  },

  {
    code: "WT",
    name: "Ingot Silver Metallic",
    hex: "#A8AAAD",
    yearsAvailable: [2010, 2011, 2012, 2013, 2014],
    glasurit: "Glasurit 90-M99/4435",
    sherwinWilliams: "S-W AWX FBCH4474",
    metallic: true,
    tricoat: false,
    notes:
      "Lighter silver, introduced for 2010 to replace the older Brilliant Silver code. Common on XLT and Lariat fleet/lease orders.",
  },

  // ─── RED ───
  {
    code: "D4",
    name: "Race Red",
    hex: "#C20E1A",
    yearsAvailable: [2011, 2012, 2013, 2014],
    glasurit: "Glasurit 90-M99/3457",
    sherwinWilliams: "S-W AWX FBCH3367",
    metallic: false,
    tricoat: false,
    notes:
      "Solid red, introduced for 2011 alongside the new EcoBoost. Replaced FX Vermillion Red. High UV-fade risk on horizontal panels after 8+ years — clearcoat failure is common on neglected examples.",
  },

  {
    code: "FX",
    name: "Vermillion Red",
    hex: "#B81A26",
    yearsAvailable: [2009, 2010],
    glasurit: "Glasurit 90-M99/3445",
    metallic: false,
    tricoat: false,
    notes:
      "Solid red carried from earlier generations. Dropped after 2010 when Race Red (D4) took its place. Vermillion Red has slightly more orange undertone than Race Red — body shops must not substitute one for the other.",
  },

  {
    code: "8L",
    name: "Royal Red Metallic",
    hex: "#5C1E22",
    yearsAvailable: [2009, 2010],
    glasurit: "Glasurit 90-M99/3326",
    metallic: true,
    tricoat: false,
    notes:
      "Deep maroon metallic, only 2009-2010. Often appears nearly black in low light. Rare today — paint match for a panel respray can be tricky because BASF/S-W libraries have fewer mix samples on file.",
  },

  {
    code: "DS",
    name: "Sangria Red Metallic",
    hex: "#7E1F2C",
    yearsAvailable: [2009, 2010],
    glasurit: "Glasurit 90-M99/3424",
    metallic: true,
    tricoat: false,
    notes:
      "Burgundy-leaning metallic red, 2009-2010 only. Visually similar to Royal Red but with more pink/violet in direct sun.",
  },

  {
    code: "HG",
    name: "Autumn Red Metallic",
    hex: "#5B1318",
    yearsAvailable: [2010, 2011, 2012],
    glasurit: "Glasurit 90-M99/3437",
    sherwinWilliams: "S-W AWX FBCH3340",
    metallic: true,
    tricoat: false,
    notes:
      "Dark cherry-red metallic, mostly seen on Lariat / King Ranch. Replaced Royal Red in 2010 and ran through 2012.",
  },

  {
    code: "RR",
    name: "Ruby Red Tinted Clearcoat",
    hex: "#7A0D1B",
    yearsAvailable: [2013, 2014],
    glasurit: "Glasurit 90-M99/3470",
    sherwinWilliams: "S-W AWX FBCH3401",
    metallic: true,
    tricoat: true,
    notes:
      "Premium tinted-clearcoat red, 2013-2014 only. Technically a 3-stage paint (base red + tinted clear with red dye + outer clear), so respray cost is closer to a tri-coat than a normal metallic. Korean body shops often categorize this as 칸디 (candy) and charge accordingly.",
  },

  // ─── BLUE ───
  {
    code: "AZ",
    name: "Dark Blue Pearl",
    hex: "#1B2742",
    yearsAvailable: [2009, 2010, 2011, 2012],
    glasurit: "Glasurit 90-M99/5294",
    sherwinWilliams: "S-W AWX FBCH5128",
    metallic: true,
    tricoat: false,
    notes:
      "Deep navy with subtle pearl flake. Carryover code across multiple Ford trucks/SUVs in this era. Discontinued for F-150 after 2012 (replaced by Blue Jeans for 2014).",
  },

  {
    code: "N9",
    name: "Blue Flame Metallic",
    hex: "#1F4E8C",
    yearsAvailable: [2009, 2010, 2011],
    glasurit: "Glasurit 90-M99/5283",
    metallic: true,
    tricoat: false,
    notes:
      "Brighter royal-blue metallic. 2009-2011 only. Often confused at distance with Dark Blue Pearl but is noticeably more vivid in sunlight.",
  },

  {
    code: "BJ",
    name: "Blue Jeans Metallic",
    hex: "#3F5773",
    yearsAvailable: [2014],
    glasurit: "Glasurit 90-M99/5318",
    sherwinWilliams: "S-W AWX FBCH5202",
    metallic: true,
    tricoat: false,
    notes:
      "2014-only — debuted for the final 12th-gen year and carried into the 13th-gen (2015+) aluminum-body F-150. Muted denim-blue. Any pre-2014 truck reported as 'Blue Jeans' is mis-identified.",
  },

  // ─── BROWN / BRONZE / GOLD ───
  {
    code: "HF",
    name: "Pale Adobe Metallic",
    hex: "#C9B59A",
    yearsAvailable: [2011, 2012, 2013, 2014],
    glasurit: "Glasurit 90-M99/8027",
    sherwinWilliams: "S-W AWX FBCH8013",
    metallic: true,
    tricoat: false,
    notes:
      "Light beige/tan metallic. Popular on XLT and Lariat fleet/Texas orders. Often paired with the Pale Adobe two-tone lower body cladding option.",
  },

  {
    code: "TJ",
    name: "Kodiak Brown Metallic",
    hex: "#3F2E27",
    yearsAvailable: [2012, 2013, 2014],
    glasurit: "Glasurit 90-M99/8038",
    sherwinWilliams: "S-W AWX FBCH8021",
    metallic: true,
    tricoat: false,
    notes:
      "Very dark chocolate-brown metallic, often mistaken for black in low light. 2012-2014. Common on King Ranch and Lariat trims.",
  },

  {
    code: "HJ",
    name: "Pueblo Gold Metallic",
    hex: "#7A6A4D",
    yearsAvailable: [2009, 2010, 2011, 2012],
    trimRestrictions: ["king_ranch"],
    glasurit: "Glasurit 90-M99/9412",
    metallic: true,
    tricoat: false,
    notes:
      "King Ranch exclusive 2009-2012. Olive-gold metallic that pairs with the saddle-tan King Ranch leather interior. Discontinued in favor of Caribou for 2013.",
  },

  {
    code: "GC",
    name: "Caribou Metallic",
    hex: "#7D6651",
    yearsAvailable: [2013, 2014],
    trimRestrictions: ["king_ranch"],
    glasurit: "Glasurit 90-M99/9423",
    sherwinWilliams: "S-W AWX FBCH9118",
    metallic: true,
    tricoat: false,
    notes:
      "King Ranch exclusive 2013-2014, replaced Pueblo Gold. Warmer tan-bronze tone. Carried into the 13th-gen King Ranch.",
  },

  {
    code: "BG",
    name: "Golden Bronze Metallic",
    hex: "#6F543A",
    yearsAvailable: [2009, 2010],
    glasurit: "Glasurit 90-M99/9404",
    metallic: true,
    tricoat: false,
    notes:
      "2009-2010 only. Dark bronze metallic, often confused with Pueblo Gold but more brown-leaning and not King-Ranch-exclusive.",
  },

  {
    code: "F4",
    name: "Cinnamon Glaze Metallic",
    hex: "#7F4630",
    yearsAvailable: [2012],
    glasurit: "Glasurit 90-M99/8033",
    metallic: true,
    tricoat: false,
    notes:
      "2012 only — one-year color. Reddish-brown copper metallic. Rare today; less than ~3% of 2012 production. Body-shop paint match can be difficult because of low sample inventory.",
  },

  {
    code: "KZ",
    name: "Bronze Fire Metallic",
    hex: "#5A3322",
    yearsAvailable: [2014],
    trimRestrictions: ["tremor", "fx2", "fx4"],
    metallic: true,
    tricoat: false,
    notes:
      "TODO verify against a confirmed door-jamb sticker photo. Forum reports (F150forum.com, 2014 Tremor build threads) describe this as a rare 2014 Tremor / FX-series color. Not present in every BASF library snapshot for 2014. If owner can photograph the jamb sticker, confirm code before ordering touch-up paint.",
  },
];

// ─────────────────────────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────────────────────────

/** Look up a paint-code record by its Ford 2-letter code (case-insensitive). */
export function getPaintCodeByCode(code: string): FordPaintCode | null {
  const normalized = code.trim().toUpperCase();
  return F150_PAINT_CODES.find((c) => c.code.toUpperCase() === normalized) ?? null;
}

/** Return every paint code available for a given model year. */
export function getPaintCodesByYear(year: number): FordPaintCode[] {
  return F150_PAINT_CODES.filter((c) => c.yearsAvailable.includes(year));
}

/** Return every paint code that was offered on a given trim. A color with
 *  no `trimRestrictions` is considered available on all trims. */
export function getPaintCodesByTrim(trim: TrimId): FordPaintCode[] {
  return F150_PAINT_CODES.filter(
    (c) => !c.trimRestrictions || c.trimRestrictions.includes(trim),
  );
}

// ─────────────────────────────────────────────────────────────────
// Knowledge-base reference records
// ─────────────────────────────────────────────────────────────────

export const COLOR_PAINT_CODE_REFERENCES: TruckReferenceRecord[] = [
  {
    id: "paint-code-door-jamb-sticker-location",
    sourceType: "owner_manual",
    sourceLabel: "Color & Paint Code Reference",
    title: "Where to find the paint code — door jamb sticker (B-pillar)",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "paint code location",
      "door jamb sticker",
      "where is the paint code",
      "VIN tag paint",
      "color code Ford F-150",
      "페인트 코드 위치",
      "도어 잼 스티커",
      "차량 색상 코드",
    ],
    excerpt:
      "On every 12th-gen F-150 (2009-2014) the paint code lives on the Safety Compliance Certification Label affixed to the driver's-side door jamb on the B-pillar — open the driver door and look at the rear edge of the door opening (where the seat belt anchor is). The label lists VIN, tire pressure, axle code, transmission code, and the line labelled 'PAINT' or 'EXT.PNT' with a 2-letter (occasionally 3-character) code such as 'UA' (Tuxedo Black Metallic) or 'YZ' (Oxford White). Read the 2 characters immediately after the PAINT label — that is the Ford paint code used to order touch-up paint, mix body-shop paint, and look up Glasurit or Sherwin-Williams cross-references. Do NOT confuse this with the 'TR' (trim/interior color) code on the same sticker — TR refers to the interior fabric, not the body color.",
    inspectionHint:
      "If the door jamb sticker is faded or peeling (common on Korean used trucks that sat in sun), the same paint code is repeated on the Ford ESP / build sheet that came with the truck from the dealer, and can also be pulled from Ford via the VIN at any Ford dealer parts counter.",
    sourceCitationKey: "paint-code-door-jamb-sticker-location",
  },

  {
    id: "paint-code-vs-rpo-code",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "Ford paint code vs. RPO code — they are not the same",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "RPO code",
      "Ford option code",
      "paint code vs option code",
      "regular production option",
      "옵션 코드",
      "RPO 코드",
    ],
    excerpt:
      "RPO codes (Regular Production Option codes) are a GM convention — Ford does not use 'RPO' for body color. Ford uses a single 2-character paint code (e.g., 'UA', 'YZ', 'D4', 'RR') on the door jamb. The same code is used by Ford parts (touch-up paint bottles ship as 'PMPC-XXXX' where XXXX is the marketing name, but the bottle label always cross-references the 2-letter jamb code). Body shops in Korea and the US should always ask for the JAMB code, not the marketing name, because two colors can share a marketing name across years (e.g., 'Race Red' is D4 for F-150 but a different code on other Ford lines).",
    sourceCitationKey: "paint-code-vs-rpo-code",
  },

  {
    id: "paint-touch-up-brands",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "Touch-up paint brand recommendations — Dr. ColorChip, AutomotiveTouchup, Ford OEM",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "touch up paint",
      "rock chip repair",
      "Dr ColorChip",
      "automotive touchup",
      "Ford OEM touch up",
      "paint pen Ford",
      "터치업 페인트",
      "도색 펜",
      "락 칩 수리",
    ],
    excerpt:
      "Three tiers of touch-up product for the 12th-gen F-150: (1) Ford OEM touch-up bottle (PMPC-style, ~$8-15 from a Ford dealer parts counter) — comes as a 0.5 oz bottle with a brush-in-cap, mixed to the exact Ford spec for your jamb code. Best color match for King Ranch / Platinum exclusives. (2) AutomotiveTouchup.com (Microfinish LLC) — sells brush-in-cap, paint-pen, aerosol, and pint quantities for every 12th-gen code; ~$15-25 for a paint pen, $25-45 for aerosol. Tri-coat colors (WB White Platinum, RR Ruby Red) ship as a 3-bottle kit. (3) Dr. ColorChip — abrasive-blend system aimed at rock chip filling on flat panels (hood, fender). Best for high-volume small-chip repair on metallic colors; the included blending solution wipes excess off the surrounding clearcoat. Roughly $40-60/kit. For Korea: Ford OEM bottles are not easy to source locally — order from US Ford dealer via mail-forwarder, or use AutomotiveTouchup.com which ships internationally.",
    inspectionHint:
      "Always sample the touch-up paint on an inconspicuous spot (lower rocker, inside fuel door) before applying to a hood chip — metallic colors that have weathered 10+ years may no longer match a fresh-mixed bottle.",
    sourceCitationKey: "paint-touch-up-brands",
  },

  {
    id: "paint-tricoat-respray-cost",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "Tri-coat paints cost significantly more to repair (WB, RR)",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "tri coat paint",
      "3 stage paint",
      "White Platinum",
      "Ruby Red Tinted Clearcoat",
      "tri coat cost",
      "3 layer paint",
      "트라이코트",
      "3단계 도장",
      "펄 도장",
    ],
    excerpt:
      "Two 12th-gen colors are true 3-stage tri-coats: WB White Platinum Metallic Tri-coat (2010-2014 Platinum / Limited / Lariat) and RR Ruby Red Tinted Clearcoat (2013-2014). Tri-coat means base + mid-coat (pearl or tinted clear) + outer clearcoat — three discrete spray passes plus blending into adjacent panels to hide the mid-coat edge. Body-shop cost premium vs. a single-stage metallic: roughly +30-50% per panel. A normal metallic single-panel repaint is ~$400-700 in Korea (도색); the same panel in WB or RR is typically $600-1,100. ALWAYS confirm the shop has experience with 3-stage paint before authorizing — a 2-stage shop can technically spray it but the pearl flop will be wrong in sunlight.",
    sourceCitationKey: "paint-tricoat-respray-cost",
  },

  {
    id: "paint-popularity-by-trim-year",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "Most popular 12th-gen colors by trim — Tuxedo Black always #1",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "popular F150 colors",
      "best selling F150 color",
      "common F150 paint",
      "most common color",
      "인기 색상",
      "베스트셀러 색상",
    ],
    excerpt:
      "Across all 2009-2014 production, the rough order of color popularity (Ford reported and dealer-aggregated): (1) UA Tuxedo Black Metallic ~22-26%, (2) YZ Oxford White ~18-22%, (3) UJ Sterling Gray Metallic ~12-15%, (4) WT Ingot Silver Metallic ~10-12%, (5) D4 Race Red ~8-10% (2011+ only), (6) AZ Dark Blue Pearl ~5-7%, then everything else <5% each. King Ranch and Platinum had different mixes — Platinum skewed heavily to WB White Platinum and UJ Sterling Gray; King Ranch over-indexed on HJ Pueblo Gold / GC Caribou (per-trim exclusives) plus UA Tuxedo Black. SVT Raptor mostly shipped in UA Tuxedo Black and YZ Oxford White, with smaller volumes of D4 Race Red, UJ Sterling Gray, and the orange-graphic 'Molten Orange' package.",
    sourceCitationKey: "paint-popularity-by-trim-year",
  },

  {
    id: "paint-basf-glasurit-cross-reference",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "Body shop cross-reference — Ford uses BASF Glasurit and Sherwin-Williams",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Glasurit code",
      "BASF Ford paint",
      "Sherwin Williams Ford",
      "PPG Ford",
      "AkzoNobel Ford",
      "color match Ford",
      "글라주리트",
      "셔윈 윌리엄스",
      "BASF 페인트",
    ],
    excerpt:
      "Ford's primary OEM paint supplier through the 12th-gen run was BASF (Glasurit brand). Most Korean and US body shops mix Ford colors via Glasurit Color Profi using the 90-M99/XXXX code, which maps 1:1 from the Ford 2-letter jamb code. Sherwin-Williams Automotive Finishes (AWX waterborne system, FBCH/FBC4 code series) is the second most common cross-reference. PPG (DeltaPoint) and AkzoNobel (Sikkens) also publish 12th-gen Ford codes but are less commonly seen in independent shops. When sourcing a color match, give the shop ALL of: (a) Ford 2-letter jamb code, (b) marketing name + year, (c) VIN — the VIN lets the shop pull the build-date paint sub-formula (Ford issued 2-3 minor formula revisions per color during the 6-year run for sun-fade compensation).",
    sourceCitationKey: "paint-basf-glasurit-cross-reference",
  },

  {
    id: "paint-common-touchup-scenarios",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "Common touch-up scenarios — door dings, rock chips, parking scrapes",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "rock chip",
      "door ding",
      "parking lot scrape",
      "small paint repair",
      "DIY touch up",
      "락 칩",
      "문콕",
      "작은 도색 수리",
    ],
    excerpt:
      "Three highest-frequency touch-up jobs on the 12th-gen F-150: (1) HOOD ROCK CHIPS — highway driving in Korea (high truck/trailer rock-throw rate on 고속도로) chips the leading edge of the hood and lower windshield cowl. Use a Dr. ColorChip kit or AutomotiveTouchup paint pen; expect 8-15 chips on the leading 6 inches of hood by ~150,000 km. (2) DOOR DINGS — parking-lot dings on the lower door beltline. Small dings get a brush-in-cap touch-up to seal exposed metal against rust; larger ones (>5mm) should be PDR (paintless dent repair, ~$80-150 in Korea) before painting. (3) BED LOWER REAR CORNERS / TAILGATE EDGE — gravel kickup from rear tires hits the bottom 4 inches of the bed sides and tailgate. Most owners give up touch-up here and apply a 3M / XPEL paint-protection-film panel ($120-200) or vinyl wrap the bed lower section. (4) ROCKERS — salt spray (Korean winter 염화칼슘) attacks the rocker panel paint where it bends inward; touch-up alone will not stop it once corrosion has started — needs sanding to bare metal, primer, then color + clear.",
    inspectionHint:
      "Always treat a rock chip within a few weeks of it appearing — bare steel under a chip rusts within one Korean winter and the rust will then lift surrounding paint. A $15 paint pen avoids a $400 panel respray.",
    sourceCitationKey: "paint-common-touchup-scenarios",
  },

  {
    id: "paint-ppf-wrap-considerations",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "Paint protection film (PPF) and vinyl wrap considerations",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "PPF",
      "paint protection film",
      "XPEL",
      "3M Scotchgard Pro",
      "vinyl wrap",
      "clear bra",
      "투명 필름",
      "PPF 필름",
      "차량 랩핑",
    ],
    excerpt:
      "Two protection paths: (1) PPF (paint protection film) — clear urethane film bonded to factory paint. XPEL Ultimate Plus and 3M Scotchgard Pro Series are the two best-known brands. Partial front-end (hood + fenders + bumper + mirrors + headlights) runs ~$1,200-2,000 in Korea (보호 필름); full-vehicle PPF runs $3,500-6,000. Self-healing top layer hides light swirl marks. Works on all 12th-gen colors but is especially worth it on tri-coats (WB White Platinum, RR Ruby Red) where a respray cost is highest. (2) VINYL WRAP — full-color change wrap, 3M 1080 / 2080 series or Avery Dennison Supreme. ~$2,500-4,500 for full-vehicle in Korea. Useful if the original paint is faded but otherwise sound — wraps OVER the original color and can be removed in 2-3 years without lifting the OEM paint, BUT requires the base paint to be in good condition (no flaking, no rust). CAUTION: if you wrap WB White Platinum or RR Ruby Red, the wrap install introduces tiny edge cuts that will eventually expose the tri-coat mid-coat layer — be sure the wrap edges are tucked into door jambs / panel gaps, not laid on flat surfaces.",
    sourceCitationKey: "paint-ppf-wrap-considerations",
  },

  {
    id: "paint-korea-body-shop-color-match",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "Korea body shop color match — international color library is critical",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Korean body shop paint",
      "international color library",
      "Ford paint match Korea",
      "도색 한국",
      "수입차 색상",
      "포드 색상 매칭",
      "글로벌 컬러 라이브러리",
    ],
    excerpt:
      "Korean body shops (공업사 / 도색 전문점) routinely paint Korean-domestic vehicles (Hyundai, Kia, Genesis) using domestic OEM codes, but imported Ford paint codes require an international color library subscription. Confirm BEFORE leaving the truck: ask the shop if they have either Glasurit Color Profi 12 (BASF) or AWX (Sherwin-Williams) digital libraries with the Ford North America database loaded. If they only have Korea-domestic libraries, the shop will be forced to color-match visually with a spectrophotometer — possible, but quality varies. For premium tri-coats (WB, RR), this is high-risk — strongly prefer a shop with the Ford library on file. Sample dealer chains in Korea that historically carry Ford paint formulas: 카포스 (Carpos), KCC autonet body shops, and Ford-Korea-affiliated 공식 서비스 센터 (Sunjin Mobility / 선진모빌리티 was the historical importer). Always ask to see a let-down panel sprayed in your code BEFORE the shop sprays the truck.",
    inspectionHint:
      "Bring the door-jamb sticker photo + the AutomotiveTouchup.com order page for your code to the shop on the first visit — this gives them both the Ford code and a third-party formula reference, and reduces the chance of a color-blind mismatch.",
    sourceCitationKey: "paint-korea-body-shop-color-match",
  },

  {
    id: "paint-fade-clearcoat-failure",
    sourceType: "known_issue",
    sourceLabel: "Color & Paint Code Reference",
    title: "Clearcoat failure on 12th-gen — Race Red and Ruby Red worst cases",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "clearcoat peeling",
      "paint fading F150",
      "race red fade",
      "ruby red peeling",
      "UV damage paint",
      "클리어 코트 벗겨짐",
      "도장 변색",
      "자외선 손상",
    ],
    excerpt:
      "Two failure modes are over-reported on 12th-gen F-150s after ~7-10 years of sun exposure: (1) Solid reds (D4 Race Red, FX Vermillion Red) show clearcoat oxidation / chalking on horizontal surfaces (hood, roof, bed rails) — appearing as a milky white haze that wipes off briefly with polish but returns. Once the clearcoat starts to delaminate (peel in sheets), only a full panel respray fixes it. (2) Tri-coats with tinted mid-coat (RR Ruby Red 2013-2014) can develop subtle color blotching where the mid-coat thickness varies — most visible at very oblique angles in bright sun. Owner-forum sentiment: this is largely a function of garaging / sun exposure, not a paint defect — Korean trucks that lived outdoors near 동해 (coastal salt + UV) show it earlier than garaged US Midwest trucks. NHTSA / Ford did NOT issue a paint-warranty extension for the 12th-gen as they did for some earlier generations' clearcoat failures.",
    inspectionHint:
      "Push a piece of clear tape onto the suspect area and lift it off — if any paint flakes come up with the tape, the clearcoat has lost adhesion and the panel needs respray, not polish.",
    sourceCitationKey: "paint-fade-clearcoat-failure",
  },

  {
    id: "paint-vin-decode-paint-formula",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "VIN-based paint formula lookup — Ford dealer parts counter",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "VIN paint lookup",
      "Ford dealer paint formula",
      "OASIS Ford",
      "build sheet paint",
      "VIN 페인트 조회",
      "포드 딜러 색상",
    ],
    excerpt:
      "If the door-jamb sticker is unreadable (sun-bleached, peeling, replaced after door damage), the paint code can be retrieved by VIN at any Ford dealer — the dealer parts/service department pulls the build record (Ford OASIS) which lists the original paint code, build-date paint formula revision, and the original interior trim code. In the US this is free at the parts counter; in Korea, contact a 포드 공식 서비스 센터 (official Ford service center) with the VIN — they may charge a small lookup fee. Also useful: the Ford 'Build Sheet' (window-sticker reprint) can be ordered via the Ford Customer Relationship Center with VIN; it lists all original options including paint and is the definitive proof of color for insurance / resale.",
    sourceCitationKey: "paint-vin-decode-paint-formula",
  },

  {
    id: "paint-two-tone-options",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "Factory two-tone paint options on 12th-gen F-150",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "two tone F150",
      "lower body two tone",
      "Pueblo Gold two tone",
      "XLT chrome two tone",
      "투톤 도색",
      "두 가지 색 도장",
    ],
    excerpt:
      "Ford offered a factory two-tone option on Lariat, King Ranch, and select XLT Chrome Package configurations: the upper body in the primary jamb code (e.g., UA Tuxedo Black) and the lower body cladding / rocker / lower door section in either Pueblo Gold (HJ) — King Ranch exclusive 2009-2012 — or Pale Adobe (HF) on 2011+ Lariat / King Ranch. The lower body color is NOT separately listed on the door-jamb sticker — it is implied by the build sheet 'Two-tone' option box. When matching the lower body color for a touch-up, the lower-tone Ford code follows the same jamb-code convention (e.g., HF Pale Adobe Metallic uses Glasurit 90-M99/8027) but you must confirm from the build sheet or VIN lookup which color was applied to the lower body — the two are not necessarily the same as the headline color.",
    sourceCitationKey: "paint-two-tone-options",
  },

  {
    id: "paint-bed-cap-rocker-replacement-color-match",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "Replacement panels — bed caps, fender flares, rocker panels color match",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "bed cap color match",
      "tailgate replacement paint",
      "fender flare paint match",
      "rocker panel paint",
      "도장 매칭",
      "테일게이트 도색",
      "휀더 페인트",
    ],
    excerpt:
      "Replacement body panels (tailgate, hood, fender, bed side, rocker) ship from Ford parts in either (a) primer-only (E-coat, ready to paint — most common, $200-400 cheaper) or (b) pre-painted in a limited number of high-volume codes (UA, YZ, WT). For low-volume colors like HJ Pueblo Gold or RR Ruby Red, primer-only is the only option and the panel MUST be color-matched and sprayed by a body shop before installation. Cost penalty for a low-volume color repaint of a new panel: ~$200-500 vs. bolting on a pre-painted UA Tuxedo Black panel. For aftermarket panels (CAPA-certified replacements from KeyStone, LKQ, etc.), pre-painted is rarely offered — primer-only is the rule. ALWAYS confirm the body shop sprays the replacement panel BEFORE installation, not after (overspray on adjacent panels is harder to control with the panel on the truck).",
    sourceCitationKey: "paint-bed-cap-rocker-replacement-color-match",
  },

  {
    id: "paint-interior-color-codes-trim",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "Interior color codes — TR field on door jamb sticker",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body", "cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "interior color code",
      "TR code Ford",
      "interior trim code",
      "King Ranch chaparral",
      "steel gray interior",
      "내장재 색상",
      "TR 코드",
      "인테리어 색상 코드",
    ],
    excerpt:
      "The same door-jamb sticker that holds the exterior PAINT code also has a 'TR' (trim) field — this is the interior color/material code. Common 12th-gen TR codes: 'AS' / 'CS' = Steel Gray cloth/leather (XL through Lariat), 'AY' / 'CY' = Medium Stone (light beige, XLT/Lariat), 'A7' / 'C7' = Tan (Lariat/King Ranch), 'AW' / 'CW' = Black two-tone (Platinum, Limited, sport packages), 'C2' = King Ranch Chaparral (saddle-tan leather, King Ranch exclusive). The TR code is needed when sourcing replacement seat upholstery, door panels, dash pad, or center console lid — Ford parts cross-references by TR code, not by marketing name. For a Korean body shop / upholsterer, the TR code maps to the closest match in the local 천연가죽 (leather) or 합성가죽 (synthetic) library — provide TR code + sample swatch photo.",
    sourceCitationKey: "paint-interior-color-codes-trim",
  },

  {
    id: "paint-aluminum-bed-tailgate-considerations",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "12th-gen body is steel — not aluminum (matters for paint prep)",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "steel body F150",
      "aluminum F150",
      "12th gen body material",
      "paint prep steel",
      "13th gen aluminum",
      "강철 차체",
      "알루미늄 차체",
      "도장 전처리",
    ],
    excerpt:
      "Important paint-prep distinction: the 12th-generation F-150 (2009-2014) has a steel body and bed — NOT aluminum. Aluminum bodies arrived with the 13th-gen (2015+). For body shops, this means standard steel-body paint prep applies (epoxy primer over bare steel after sanding, no aluminum-specific etch primer required, standard surface-rust treatment with phosphate conversion coating). If a Korean shop asks 'aluminum or steel?' for a 2009-2014 F-150 the answer is always STEEL. Aluminum body paint prep uses different etch primer chemistry (chromate or non-chromate aluminum etch) and cross-contamination between steel and aluminum prep tools can cause galvanic corrosion at the paint-metal interface on the wrong substrate. Knowing the body is steel saves time and money on the prep estimate.",
    sourceCitationKey: "paint-aluminum-bed-tailgate-considerations",
  },

  {
    id: "paint-raptor-graphic-package",
    sourceType: "repair_note",
    sourceLabel: "Color & Paint Code Reference",
    title: "SVT Raptor graphic packages — Molten Orange, blackout, stripes",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Raptor graphics",
      "Molten Orange Raptor",
      "Raptor blackout package",
      "Raptor side stripes",
      "SVT decal",
      "랩터 데칼",
      "랩터 그래픽",
    ],
    excerpt:
      "The 2010-2014 SVT Raptor used the same base jamb paint codes as other 12th-gen F-150s (UA, YZ, D4, UJ, AZ, plus a small run of Molten Orange Metallic which was Raptor-exclusive — code 'B2' on some sources, TODO verify against a confirmed Raptor jamb sticker). On top of the base paint, the Raptor was usually optioned with one of several factory or dealer-applied graphic packages: (a) Body-side 'RAPTOR' decals (matte black or metallic charcoal), (b) Hood graphic / hood scoop stripe, (c) Roof / A-pillar blackout, (d) Bed-rail stripe. These are 3M vinyl decals, NOT paint — they can be removed with heat and adhesive remover without affecting the underlying paint. For a respray after collision, the body shop must order replacement decals from a Raptor specialty vendor (Stripeman, Vinyl Disorder, RTR Graphics) — Ford does NOT stock most Raptor decal kits as a single-part order anymore.",
    sourceCitationKey: "paint-raptor-graphic-package",
  },
];
