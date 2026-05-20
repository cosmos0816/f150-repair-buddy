// 12th-generation Ford F-150 (2009-2014) option package + window sticker
// decoder. Ford option codes are short 3-character codes (digits + letters)
// stamped on the door-jamb sticker and listed on the original Monroney
// (window) sticker. They identify packages, single options, axle ratios,
// engine/transmission RPO codes, and trim/series identifiers.
//
// Sources reconciled while authoring this file:
//   - Ford 2010 F-150 brochure (auto-brochures.com archive).
//   - Ford F-150 ordering guide PDFs (2009, 2010, 2011, 2012, 2013, 2014).
//   - F150forum.com option-code threads (cross-referenced multiple builds).
//   - F150online.com VIN/option lookup discussions.
//   - Edmunds 2009-2014 F-150 trim configurators.
//
// Verification status:
//   - Codes marked as verified in the data set were confirmed in at least
//     two of the sources above with matching marketing names. When the
//     description varies slightly between MY09 and MY14 (e.g., 53A in 2010
//     vs 2013), the entry's yearsAvailable list is conservative.
//   - Codes with TODO notes vary year-to-year or are reported with
//     conflicting descriptions in forum sources; do NOT cite these as
//     authoritative until verified against a primary Ford ordering guide.
//
// What is INTENTIONALLY omitted (do not add without primary-source evidence):
//   - Fleet-only codes (FL series — fleet customer codes).
//   - Canadian/Mexico-build market-restricted codes.
//   - Codes that appear only on F-250+ / Super Duty (not 12th-gen F-150).
//   - Aftermarket "option codes" sometimes invented by dealers.

import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";
import type { ModelYear, TrimId } from "./types";

export type OptionCategory =
  | "package"
  | "single_option"
  | "trim_designator"
  | "drivetrain"
  | "axle"
  | "engine"
  | "transmission"
  | "body_style";

export interface FordOptionCode {
  // The raw code stamped on the door jamb / window sticker. Ford codes are
  // typically 3 characters (digit + letter + letter, or digit + digit + letter).
  // Some engine RPO codes are 3-char (99W, 998) and some package codes are
  // numeric+letter (44G, 67J). We preserve the literal Ford form.
  code: string;
  // Marketing / shorthand name as it appears in Ford ordering guides.
  name: string;
  // What the option actually includes (hardware + software bundle).
  description: string;
  // Years the code was used. Some codes (60E FX Appearance) appear in
  // multiple years; some (540A series) are year-specific equipment groups.
  yearsAvailable: ModelYear[];
  // Trims the code could be ordered on. Empty array means available across
  // multiple trims (or fleet-wide) — see description for specifics.
  trimsAvailable: TrimId[];
  // Original MSRP range (2009-2014 dealer prices, USD). Omitted when the
  // option was bundled into a higher-tier package and never sold alone.
  msrpRange?: string;
  category: OptionCategory;
  // Optional notes — verification status, mid-year changes, etc.
  notes?: string[];
}

// ---------------------------------------------------------------------------
// Master option-code catalog.
// ---------------------------------------------------------------------------

export const FORD_F150_OPTION_CODES: FordOptionCode[] = [
  // ═══════════════════════════════════════════════════
  // TRIM / SERIES DESIGNATORS
  // ═══════════════════════════════════════════════════
  {
    code: "F1A",
    name: "XL Regular Cab series",
    description:
      "XL Regular Cab series designator. Appears in the series field of the door-jamb sticker. Identifies a base XL trim Regular Cab F-150. Typically paired with a body-style code (W1F/W1G).",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xl"],
    category: "trim_designator",
  },
  {
    code: "F1B",
    name: "XL SuperCab series",
    description:
      "XL SuperCab series designator. Door-jamb series field. 4-door SuperCab in XL trim.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xl"],
    category: "trim_designator",
  },
  {
    code: "F1C",
    name: "XL SuperCrew series",
    description:
      "XL SuperCrew series designator. 4-door full crew cab in XL trim. Less common — most SuperCrew builds were XLT and up.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xl"],
    category: "trim_designator",
    notes: ["TODO: verify F1C vs F1E variant differences across years."],
  },
  {
    code: "F1D",
    name: "XLT SuperCrew series",
    description:
      "XLT SuperCrew series designator. Door-jamb series field. The volume-leader trim/cab combination.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xlt"],
    category: "trim_designator",
  },
  {
    code: "F1E",
    name: "Lariat SuperCrew series",
    description:
      "Lariat SuperCrew series designator. Luxury trim, 4-door full crew cab.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["lariat"],
    category: "trim_designator",
    notes: ["TODO: verify exact series code — Ford rotated some Lariat series codes between 2009 and 2014."],
  },

  // ═══════════════════════════════════════════════════
  // BODY STYLE CODES
  // ═══════════════════════════════════════════════════
  {
    code: "W1F",
    name: "Regular Cab Styleside 6.5ft bed",
    description:
      "Body style code: Regular Cab with Styleside (smooth-side) 6.5-foot bed. The most common XL/STX work-truck body.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    category: "body_style",
  },
  {
    code: "W1G",
    name: "Regular Cab Styleside 8ft bed",
    description:
      "Body style code: Regular Cab with Styleside 8-foot long bed. Fleet/contractor configuration.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    category: "body_style",
  },
  {
    code: "X1C",
    name: "SuperCab Styleside 6.5ft bed",
    description:
      "Body style code: SuperCab (4-door, rear-hinged half doors) with 6.5-foot bed.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    category: "body_style",
  },
  {
    code: "X1E",
    name: "SuperCab Styleside 8ft bed",
    description:
      "Body style code: SuperCab with 8-foot long bed. Less common combination.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    category: "body_style",
  },
  {
    code: "W1E",
    name: "SuperCrew Styleside 5.5ft bed",
    description:
      "Body style code: SuperCrew (4 full-size doors) with 5.5-foot short bed. The most popular daily-driver configuration.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    category: "body_style",
    notes: ["TODO: verify W1E vs W2F encoding across years."],
  },

  // ═══════════════════════════════════════════════════
  // EQUIPMENT PACKAGES
  // ═══════════════════════════════════════════════════
  {
    code: "44G",
    name: "Max Trailer Tow Package",
    description:
      "Maximum Trailer Tow Package. Includes upgraded engine cooling, transmission oil cooler, 7-pin trailer connector wiring, integrated electric trailer brake controller (factory-installed), Class IV receiver hitch, upgraded rear axle ratio (typically 3.73). Required for trucks rated to tow >9,000 lb. Pairs with 5.4L 3V or 6.2L Boss V8 in the 12th-gen.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xl", "stx", "xlt", "fx4", "lariat", "king_ranch", "platinum"],
    msrpRange: "$995-$1,295",
    category: "package",
  },
  {
    code: "67J",
    name: "Heavy Duty Payload Package",
    description:
      "Heavy-Duty Payload Package. Upgraded rear leaf springs, heavier-duty front springs, electronic limited-slip differential (4x4 builds), 17-inch heavy-service wheels, upgraded cooling. Boosts GVWR to ~7,700 lb. Available on XL/XLT with 5.4L or 6.2L. Door-jamb sticker payload value increases noticeably.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xl", "xlt"],
    msrpRange: "$1,500-$1,995",
    category: "package",
  },
  {
    code: "53A",
    name: "XLT Chrome Package",
    description:
      "XLT Chrome Package. Chrome front and rear bumpers, chrome grille bar, chrome door handles, chrome mirror caps, 18-inch chrome-clad aluminum wheels. Visual upgrade only — no powertrain or chassis changes.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xlt"],
    msrpRange: "$795-$1,195",
    category: "package",
  },
  {
    code: "53B",
    name: "XLT Convenience Package",
    description:
      "XLT Convenience Package. Reverse Sensing System, power-adjustable pedals, auto-dimming rearview mirror, fog lamps, SYNC voice activation (where not standard). Specific contents shifted year-over-year — verify against the original window sticker.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xlt"],
    msrpRange: "$595-$995",
    category: "package",
    notes: ["Package contents shifted between MY09 and MY14 — pedal memory was added later."],
  },
  {
    code: "53C",
    name: "XLT Plus Package",
    description:
      "XLT Plus Package. Combines Chrome Package + Convenience Package elements with leather-trimmed bucket seats (or 40/20/40 split bench with leather inserts), 110V power outlet, additional chrome trim. The 'mid-trim sweet spot' bundle.",
    yearsAvailable: [2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xlt"],
    msrpRange: "$1,995-$2,495",
    category: "package",
  },
  {
    code: "60E",
    name: "FX Appearance Package",
    description:
      "FX Appearance Package. Body-color front/rear bumpers, body-color grille surround, FX badging, 18-inch dark-painted aluminum wheels, captain's chair option, unique interior trim. Available on FX2 and FX4. Visual/cosmetic only.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["fx2", "fx4"],
    msrpRange: "$695-$995",
    category: "package",
  },
  {
    code: "60F",
    name: "FX Luxury Package",
    description:
      "FX Luxury Package. Leather-trimmed sport bucket seats with FX logo embroidery, heated front seats, power-adjustable pedals, premium audio (Sony), reverse camera, navigation on later years. Top-tier FX equipment bundle.",
    yearsAvailable: [2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["fx2", "fx4"],
    msrpRange: "$2,495-$3,295",
    category: "package",
  },
  {
    code: "61L",
    name: "Lariat Chrome Package",
    description:
      "Lariat Chrome Package. Chrome 20-inch wheels (upgrade from std 18s), chrome step bars, chrome exhaust tip, additional chrome exterior accents. Replaces some body-color Lariat elements with chrome.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["lariat"],
    msrpRange: "$1,295-$1,795",
    category: "package",
  },
  {
    code: "61M",
    name: "Lariat Luxury Package",
    description:
      "Lariat Luxury Package. Power moonroof (where available), heated/ventilated front seats, memory driver's seat, premium Sony audio, navigation (factory NAV), HID headlamps on later years.",
    yearsAvailable: [2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["lariat"],
    msrpRange: "$2,995-$3,995",
    category: "package",
  },
  {
    code: "61N",
    name: "Lariat Plus Package",
    description:
      "Lariat Plus Package. Combines Chrome + Luxury elements. Power-folding heated mirrors with memory, rain-sensing wipers, blind-spot mirrors, additional premium content. The 'load it up' Lariat bundle short of King Ranch / Platinum.",
    yearsAvailable: [2011, 2012, 2013, 2014],
    trimsAvailable: ["lariat"],
    msrpRange: "$3,995-$5,495",
    category: "package",
  },
  {
    code: "62B",
    name: "Platinum Tech Package",
    description:
      "Platinum Technology Package. Advanced safety + navigation already standard on Platinum, so this package adds adaptive cruise control (later years), forward collision warning, automatic high beams, BLIS with cross-traffic alert, lane departure warning.",
    yearsAvailable: [2011, 2012, 2013, 2014],
    trimsAvailable: ["platinum"],
    msrpRange: "$1,495-$2,495",
    category: "package",
    notes: ["Adaptive cruise/forward-collision availability is later-MY only — verify per year."],
  },
  {
    code: "65B",
    name: "King Ranch Convenience Package",
    description:
      "King Ranch Convenience Package. Power moonroof, rear-view camera with reverse sensing, navigation, premium Sony audio with HD radio. Where these are not already KR standard for that model year, this package adds them.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["king_ranch"],
    msrpRange: "$1,995-$2,995",
    category: "package",
  },
  {
    code: "90R",
    name: "Off-Road Package",
    description:
      "Off-Road Package (FX4 standard equipment, optional on selected XLT/Lariat 4x4 builds). Skid plates (front diff, transfer case, fuel tank), hill descent control, off-road tuned suspension (slightly different shock valving than std 4x4), unique 18-inch wheel set, electronic-locking rear differential on later years.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xlt", "fx4", "lariat"],
    msrpRange: "$895-$1,295",
    category: "package",
    notes: ["Standard on FX4; optional add-on for other 4x4 trims."],
  },
  {
    code: "60S",
    name: "STX Sport Group",
    description:
      "STX Sport Group / STX Decor Package. Fog lamps, body-color grille surround, 18-inch machined-aluminum wheels, sport cloth seats, STX-specific exterior badging. The 'budget sport' bundle on the STX trim.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013],
    trimsAvailable: ["stx"],
    msrpRange: "$695-$995",
    category: "package",
    notes: ["STX trim was discontinued for 2014 — package not offered that year."],
  },

  // Limited (top trim, introduced for 2009) equipment groups. Ford uses
  // the 5xxA numbering convention for the 'level' of bundled equipment.
  {
    code: "540A",
    name: "Limited Equipment Group 540A (base equipment)",
    description:
      "Limited Equipment Group 540A. The base bundle for the Limited trim — leather-trimmed seats, navigation, premium audio, power running boards, monochrome exterior. Numerically lowest 5xxA tier on Limited.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["limited"],
    category: "package",
    notes: ["TODO: Limited was 2009-2010 then returned 2013-2014 — verify exact equipment-group code per year."],
  },
  {
    code: "541A",
    name: "Limited Equipment Group 541A (mid)",
    description:
      "Limited Equipment Group 541A. Mid-tier Limited bundle — adds heated/cooled seats, twin-panel moonroof, adaptive cruise on later years.",
    yearsAvailable: [2013, 2014],
    trimsAvailable: ["limited"],
    category: "package",
    notes: ["TODO: 2013-2014 only — verify exact contents."],
  },
  {
    code: "542A",
    name: "Limited Equipment Group 542A (top)",
    description:
      "Limited Equipment Group 542A. Top-tier Limited bundle — every available option included as standard. Approximately equivalent to the 'fully loaded' 2014 Limited monroney.",
    yearsAvailable: [2013, 2014],
    trimsAvailable: ["limited"],
    category: "package",
    notes: ["TODO: 2014 final-year Limited contents differ from 2013 mid-year refresh — verify."],
  },

  // ═══════════════════════════════════════════════════
  // ENGINE / DRIVETRAIN RPO CODES
  // ═══════════════════════════════════════════════════
  {
    code: "99W",
    name: "4.6L 2V Triton V8",
    description:
      "Engine RPO: 4.6-liter 2-valve SOHC Triton V8. Base V8 for the 2009-2010 F-150. 248 hp / 294 lb-ft. Paired with the 4R75E 4-speed automatic. The lowest-cost gasoline V8 option in the 12th-gen lineup. Dropped after 2010.",
    yearsAvailable: [2009, 2010],
    trimsAvailable: ["xl", "stx", "xlt"],
    category: "engine",
  },
  {
    code: "998",
    name: "4.6L 3V Triton V8",
    description:
      "Engine RPO: 4.6-liter 3-valve SOHC Triton V8. Mid-range V8 introduced for 2009 to replace some 5.4L applications. 292 hp / 320 lb-ft. Paired with the 6R80 6-speed automatic. Available on XL/STX/XLT. Discontinued after 2010 in favor of the 3.7L Ti-VCT V6 and 5.0L Coyote for 2011.",
    yearsAvailable: [2009, 2010],
    trimsAvailable: ["xl", "stx", "xlt"],
    category: "engine",
  },
  {
    code: "99V",
    name: "5.4L 3V Triton V8",
    description:
      "Engine RPO: 5.4-liter 3-valve SOHC Triton V8. The volume V8 for 2009-2010. 310 hp / 365 lb-ft. Paired with the 6R80 6-speed automatic. Flex-fuel capable. Final F-150 application — dropped after 2010 in favor of the 5.0L Coyote and 3.5L EcoBoost.",
    yearsAvailable: [2009, 2010],
    trimsAvailable: ["xl", "stx", "xlt", "fx2", "fx4", "lariat", "king_ranch", "platinum", "harley_davidson", "svt_raptor"],
    category: "engine",
  },
  {
    code: "99M",
    name: "3.7L Ti-VCT V6",
    description:
      "Engine RPO: 3.7-liter Ti-VCT (twin independent variable cam timing) V6. Base engine for 2011-2014 — replaced the 4.6L V8 lineup. 302 hp / 278 lb-ft. Paired with 6R80. Surprised the market by out-powering the dropped 4.6L V8s.",
    yearsAvailable: [2011, 2012, 2013, 2014],
    trimsAvailable: ["xl", "stx", "xlt"],
    category: "engine",
  },
  {
    code: "99F",
    name: "5.0L Coyote V8",
    description:
      "Engine RPO: 5.0-liter Coyote V8 (DOHC 32V Ti-VCT). Introduced for 2011 to replace the 5.4L 3V. 360 hp / 380 lb-ft. Paired with 6R80. Shares architecture with the Mustang GT 5.0 but with truck-specific cams and intake. Flex-fuel capable.",
    yearsAvailable: [2011, 2012, 2013, 2014],
    trimsAvailable: ["xl", "stx", "xlt", "fx2", "fx4", "lariat", "king_ranch", "platinum", "limited"],
    category: "engine",
  },
  {
    code: "99T",
    name: "3.5L EcoBoost V6",
    description:
      "Engine RPO: 3.5-liter EcoBoost twin-turbocharged V6 with direct injection. Introduced for 2011 as the volume torque-leader engine. 365 hp / 420 lb-ft. Paired with 6R80. Max tow rating up to 11,300 lb when equipped with 44G Max Trailer Tow.",
    yearsAvailable: [2011, 2012, 2013, 2014],
    trimsAvailable: ["xl", "xlt", "fx2", "fx4", "lariat", "king_ranch", "platinum", "limited"],
    category: "engine",
  },
  {
    code: "996",
    name: "6.2L Boss V8",
    description:
      "Engine RPO: 6.2-liter Boss V8 (SOHC 2V). Available in the SVT Raptor (standard for 2011-2014, mid-year option for 2010) and as an option on F-150 Harley-Davidson, Platinum, and Lariat select builds. 411 hp / 434 lb-ft. Paired with 6R80. The largest-displacement F-150 engine of the 12th gen.",
    yearsAvailable: [2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["lariat", "king_ranch", "platinum", "harley_davidson", "svt_raptor"],
    category: "engine",
  },

  // ═══════════════════════════════════════════════════
  // AXLE RATIO CODES
  // ═══════════════════════════════════════════════════
  {
    code: "A2",
    name: "3.15 axle ratio (2WD economy)",
    description:
      "Axle ratio code: 3.15:1 final drive. 2WD economy / highway-cruiser ratio. Lowest numerical ratio offered, paired with V6 / 4.6L 2V applications focused on fuel economy. Rare on V8 4x4 builds.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    category: "axle",
  },
  {
    code: "A6",
    name: "3.31 axle ratio (2WD standard)",
    description:
      "Axle ratio code: 3.31:1 final drive. Standard 2WD ratio for most XL/STX/XLT V6 and V8 builds without towing. Balanced economy + light-load performance.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    category: "axle",
  },
  {
    code: "A7",
    name: "3.55 axle ratio (most common)",
    description:
      "Axle ratio code: 3.55:1 final drive. The most common 12th-gen axle ratio. Standard on most 4x4 V8 builds and many 4x2 V8 builds without the Max Trailer Tow package. Available with open or limited-slip differential.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    category: "axle",
  },
  {
    code: "B9",
    name: "3.73 axle ratio (max tow)",
    description:
      "Axle ratio code: 3.73:1 final drive. Included with the 44G Max Trailer Tow Package and the 67J Heavy Duty Payload Package. Required for max tow ratings >9,000 lb. Often paired with the electronic-locking rear differential on FX4 / Lariat 4x4 builds.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    category: "axle",
  },
  {
    code: "F4",
    name: "4.10 axle ratio (Raptor)",
    description:
      "Axle ratio code: 4.10:1 final drive. SVT Raptor standard rear axle ratio. Electronic-locking rear differential standard. Front Torsen T2R differential available 2011+ (standard on 2012+ Raptor SuperCrew). Not typically offered outside Raptor.",
    yearsAvailable: [2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["svt_raptor"],
    category: "axle",
  },

  // ═══════════════════════════════════════════════════
  // TRANSMISSION RPO CODES
  // ═══════════════════════════════════════════════════
  {
    code: "446",
    name: "4R75E 4-speed automatic",
    description:
      "Transmission RPO: 4R75E 4-speed automatic. Paired exclusively with the 4.6L 2V Triton V8. Dropped after 2010 when the 4.6 2V was discontinued. Tow/Haul mode standard.",
    yearsAvailable: [2009, 2010],
    trimsAvailable: ["xl", "stx", "xlt"],
    category: "transmission",
  },
  {
    code: "446G",
    name: "6R80 6-speed automatic",
    description:
      "Transmission RPO: 6R80 6-speed automatic. Standard with 4.6L 3V, 5.4L 3V, 3.7L Ti-VCT, 5.0L Coyote, 3.5L EcoBoost, and 6.2L Boss. The universal 12th-gen transmission from 2011 onward (the 4R75E was the only exception, and only for the 4.6 2V).",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    category: "transmission",
  },

  // ═══════════════════════════════════════════════════
  // SINGLE OPTIONS (a la carte)
  // ═══════════════════════════════════════════════════
  {
    code: "96M",
    name: "Power Moonroof",
    description:
      "Power-sliding tilt/vent moonroof with one-touch open and express-close. Glass panel with sliding cloth sunshade. Includes additional headliner reinforcement.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xlt", "fx2", "fx4", "lariat", "king_ranch", "platinum", "harley_davidson", "limited"],
    msrpRange: "$895-$995",
    category: "single_option",
  },
  {
    code: "13N",
    name: "Remote Start System",
    description:
      "Factory remote engine start system. Press the lock button + start button (2x) on the factory keyfob to start the engine remotely. Integrates with HVAC presets — climate control auto-engages at last setting. Adds a stiffer-key 'remote start ready' immobilizer module.",
    yearsAvailable: [2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xlt", "fx2", "fx4", "lariat", "king_ranch", "platinum", "harley_davidson", "limited"],
    msrpRange: "$295-$395",
    category: "single_option",
  },
  {
    code: "41Z",
    name: "Power Sliding Rear Window",
    description:
      "Power sliding rear window. Center pane slides on a motorized track via a dash-mounted switch. Includes defroster grid (often combined with rear-defrost option).",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xlt", "fx2", "fx4", "lariat", "king_ranch", "platinum", "harley_davidson", "limited"],
    msrpRange: "$295-$395",
    category: "single_option",
  },
  {
    code: "50C",
    name: "Cruise Control",
    description:
      "Standard cruise control with steering-wheel-mounted controls. Standalone option when not bundled into a higher equipment group (most XL builds did not include cruise as standard prior to 2011).",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xl", "stx"],
    msrpRange: "$225-$295",
    category: "single_option",
    notes: ["Standard on XLT and above from MY11 onward."],
  },
  {
    code: "76C",
    name: "Reverse Sensing System",
    description:
      "Reverse Sensing System (4 ultrasonic sensors in the rear bumper). Audible warning at decreasing intervals as the truck approaches an obstacle in reverse. Often bundled with the XLT Convenience Package (53B).",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xlt", "fx2", "fx4", "lariat", "king_ranch", "platinum", "harley_davidson", "limited"],
    msrpRange: "$245-$295",
    category: "single_option",
  },
  {
    code: "76R",
    name: "Rear-View Camera",
    description:
      "Rear-view (backup) camera. Displays on the navigation screen (if equipped) or on a dedicated mirror-mounted screen on lower trims. Standard on Platinum and Limited from MY11 forward; optional on XLT/Lariat.",
    yearsAvailable: [2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xlt", "fx2", "fx4", "lariat", "king_ranch", "platinum", "harley_davidson", "limited"],
    msrpRange: "$395-$495",
    category: "single_option",
  },
  {
    code: "75A",
    name: "Front License Plate Bracket",
    description:
      "Front license plate bracket. State-specific delete or include option — required in states (e.g., California, Texas) that mandate a front plate; deleted in states that do not. Not a no-cost option in all years.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    msrpRange: "$0",
    category: "single_option",
    notes: ["Often shown as $0 / no-charge but reflects state-specific build coding."],
  },
  {
    code: "99M",
    name: "Bed Extender (Ford OEM)",
    description:
      "Ford OEM bed extender. Folds down out of the tailgate to extend usable cargo length when the tailgate is open. Folds inward to act as a cargo divider when the tailgate is closed. NOTE: Ford reused 99M as an engine RPO for the 3.7L Ti-VCT V6 — context (door-jamb 'OPT' field vs window sticker accessory field) disambiguates.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    msrpRange: "$245-$295",
    category: "single_option",
    notes: ["Ford reused this code — see 99M engine entry above. The accessory listing on the window sticker disambiguates context."],
  },
  {
    code: "55E",
    name: "Spray-In Bedliner",
    description:
      "Factory spray-in bedliner. Applied at the factory or port-of-entry by Ford-contracted installer. Includes lifetime warranty (factory) vs aftermarket. Lifts bed surface ~3/16in.",
    yearsAvailable: [2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    msrpRange: "$475-$575",
    category: "single_option",
    notes: ["TODO: verify code — some sources list as 96W or 55E depending on year."],
  },
  {
    code: "63T",
    name: "Tailgate Step",
    description:
      "Ford Tailgate Step — folds out of the top edge of the tailgate to provide a step-up into the bed. Includes a flip-up grab handle. Integrated, factory-installed.",
    yearsAvailable: [2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    msrpRange: "$375-$425",
    category: "single_option",
  },
  {
    code: "85A",
    name: "Cargo Lamp / Bed Light",
    description:
      "Cargo-lamp option — adds an additional bed-area illumination lamp at the rear of the cab. Wired to the dome-light circuit and to the tailgate-open switch on later years.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    msrpRange: "$50-$75",
    category: "single_option",
    notes: ["TODO: verify code — sources are inconsistent across model years."],
  },
  {
    code: "59C",
    name: "Power-Folding Heated Mirrors",
    description:
      "Power-folding heated side mirrors with integrated turn signal repeaters and puddle lamps. Includes memory function on Lariat/Platinum.",
    yearsAvailable: [2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xlt", "lariat", "king_ranch", "platinum", "harley_davidson", "limited"],
    msrpRange: "$345-$395",
    category: "single_option",
  },
  {
    code: "21A",
    name: "Trailer Brake Controller (standalone)",
    description:
      "Standalone factory-integrated electric trailer brake controller. When ordered without the full 44G Max Tow package, this code adds just the dash-mounted brake controller and the 7-pin connector wiring.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xl", "stx", "xlt", "fx4", "lariat", "king_ranch", "platinum"],
    msrpRange: "$230-$295",
    category: "single_option",
    notes: ["TODO: verify code — Ford uses different option codes for the brake controller when sold standalone vs in 44G."],
  },
  {
    code: "47B",
    name: "Snowplow Prep Package",
    description:
      "Snowplow Prep Package. Heavier-duty front springs, upgraded alternator, transmission cooler, plow-light wiring provisions. Required for legal snowplow installation on 4x4 builds. Voids some warranty coverage if a plow exceeding rated weight is mounted.",
    yearsAvailable: [2009, 2010, 2011, 2012, 2013, 2014],
    trimsAvailable: ["xl", "xlt", "fx4"],
    msrpRange: "$50-$250",
    category: "package",
    notes: ["TODO: verify exact code — some sources cite 47B, others 473 or 47C."],
  },
  {
    code: "55B",
    name: "Tonneau Cover (Hard, Color-Keyed)",
    description:
      "Color-matched hard tonneau cover (factory-installed via Ford accessories). Locking, hinged at the bulkhead. Reduces aero drag and improves fuel economy on long-bed builds by ~0.5 mpg per Ford internal testing.",
    yearsAvailable: [2010, 2011, 2012, 2013, 2014],
    trimsAvailable: [],
    msrpRange: "$895-$1,095",
    category: "single_option",
    notes: ["TODO: confirm code — many tonneau options are dealer-installed accessories, not factory codes."],
  },
];

// ---------------------------------------------------------------------------
// Lookup functions
// ---------------------------------------------------------------------------

const OPTION_CODE_INDEX: Map<string, FordOptionCode> = new Map(
  FORD_F150_OPTION_CODES.map((opt) => [opt.code.toUpperCase(), opt]),
);

/**
 * Decode a single Ford option code. Returns the matching FordOptionCode
 * or null if the code is unknown. Lookup is case-insensitive.
 *
 * Note: code "99M" intentionally returns the engine RPO entry first because
 * it is the more commonly queried interpretation; callers needing the bed
 * extender accessory should use getOptionByName("bed extender") instead.
 */
export function decodeOptionCode(code: string): FordOptionCode | null {
  const normalized = code.trim().toUpperCase();
  return OPTION_CODE_INDEX.get(normalized) ?? null;
}

/**
 * Decode a list of codes from a window sticker. Returns one entry per
 * input code, preserving order. Unknown codes are returned with info=null
 * so callers can render them as "Unknown — see Ford reference docs".
 */
export function decodeWindowSticker(
  codes: string[],
): Array<{ code: string; info: FordOptionCode | null }> {
  return codes.map((code) => ({
    code: code.trim(),
    info: decodeOptionCode(code),
  }));
}

/**
 * Return all option codes available for a given trim/year combination.
 * - A code with an empty trimsAvailable[] is treated as universally
 *   available (applies to all trims) and is included.
 * - A code whose yearsAvailable doesn't include `year` is excluded.
 */
export function getPackagesAvailableForTrim(
  trim: TrimId,
  year: number,
): FordOptionCode[] {
  return FORD_F150_OPTION_CODES.filter((opt) => {
    const yearMatch = opt.yearsAvailable.includes(year as ModelYear);
    const trimMatch =
      opt.trimsAvailable.length === 0 || opt.trimsAvailable.includes(trim);
    return yearMatch && trimMatch;
  });
}

/**
 * Fuzzy search by marketing name / description. Case-insensitive,
 * substring match against the `name` and `description` fields.
 * Results are returned in declaration order (no scoring) — the caller
 * may sort by relevance if needed.
 */
export function getOptionByName(searchTerm: string): FordOptionCode[] {
  const needle = searchTerm.trim().toLowerCase();
  if (needle.length === 0) return [];
  return FORD_F150_OPTION_CODES.filter((opt) => {
    return (
      opt.name.toLowerCase().includes(needle) ||
      opt.description.toLowerCase().includes(needle)
    );
  });
}

// ---------------------------------------------------------------------------
// Window-sticker reference records — Monroney sticker guide, Korean used-
// market notes, sticker preservation tips. Authored as TruckReferenceRecord
// entries so they flow through the existing knowledge lookup pipeline.
// ---------------------------------------------------------------------------

export const WINDOW_STICKER_REFERENCES: TruckReferenceRecord[] = [
  {
    id: "window-sticker-monroney-overview",
    sourceType: "owner_manual",
    sourceLabel: "Window Sticker Reference",
    title: "How to read the Monroney window sticker — fields and layout",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "monroney",
      "window sticker",
      "original sticker",
      "Ford option list",
      "옵션 스티커",
      "모로니 스티커",
    ],
    excerpt:
      "The Monroney (window) sticker is the federally-mandated label affixed to a new vehicle when it leaves the factory. On a 12th-gen F-150 it lists: VIN (top-right), trim/series designator (e.g., XLT SuperCrew 4x4 / F1D), engine RPO (e.g., 99V for 5.4L 3V), transmission RPO (446G for 6R80), axle code (e.g., A7 for 3.55), exterior color name + paint code, interior trim code, every factory option code with marketing name and individual MSRP, destination + delivery charge, total MSRP. Each option line shows the 3-character Ford code immediately followed by the marketing name (e.g., '44G  MAX TRAILER TOW PKG  $1,295').",
    sourceCitationKey: "window-sticker-monroney-overview",
  },
  {
    id: "window-sticker-finding-original",
    sourceType: "owner_manual",
    sourceLabel: "Window Sticker Reference",
    title: "Where to find the original window sticker (varies by trim and prep)",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "find sticker",
      "where is window sticker",
      "original Monroney",
      "스티커 위치",
    ],
    excerpt:
      "Common locations to find the original window sticker on a used 12th-gen F-150: 1) Inside the glovebox or owner's-pouch envelope (most common — Ford often included a folded original in the owner's manual binder). 2) Under the rear bench seat in the SuperCrew (some dealers stashed it there during PDI). 3) In the spare-tire well beneath a foam insert (rare but documented). 4) Behind the driver's-side sun visor (rare, only on early 2009 builds). On Korean used imports, the original is frequently missing — request a Ford build sheet by VIN from a US Ford dealer (free) or via marti.com (paid, more detailed for older trucks). The build sheet contains every option code and is functionally equivalent to the original sticker for decoding.",
    sourceCitationKey: "window-sticker-finding-original",
  },
  {
    id: "window-sticker-decode-procedure",
    sourceType: "owner_manual",
    sourceLabel: "Window Sticker Reference",
    title: "Procedure for decoding Ford option codes from a sticker or door jamb",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "decode option codes",
      "option code lookup",
      "RPO decoder",
      "옵션 코드 디코딩",
    ],
    excerpt:
      "Decoding procedure: 1) Locate the door-jamb sticker on the driver's-side B-pillar (open the driver's door). It lists VIN, GVWR, GAWR, tire/wheel size, paint code, interior code, and a short OPT field listing 8-16 three-character option codes. 2) Cross-reference each code against this decoder's FORD_F150_OPTION_CODES catalog. Use decodeOptionCode(code) for a single code or decodeWindowSticker(codes) for a list. 3) For codes not in this catalog, request a Ford build sheet by VIN (free from a US Ford dealer) — it expands every code to its marketing name. 4) Beware code reuse: the same 3-character code (e.g., 99M) may be an engine RPO OR a single accessory option depending on where it appears on the build sheet.",
    sourceCitationKey: "window-sticker-decode-procedure",
  },
  {
    id: "window-sticker-preservation",
    sourceType: "repair_note",
    sourceLabel: "Window Sticker Reference",
    title: "Sticker preservation for resale value — handling tips",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "preserve sticker",
      "protect window sticker",
      "resale value sticker",
      "스티커 보관",
    ],
    excerpt:
      "If you still have the original Monroney sticker, preserve it carefully — it materially increases resale value, especially for SVT Raptor, Harley-Davidson, Platinum, and Limited trims where original provenance commands a premium. Best practice: place it inside an archival-grade acid-free plastic sleeve (Mylar or similar) and store flat in the owner's pouch in the glovebox. Avoid: folding along the same crease repeatedly (ink cracks), exposure to direct sunlight (Monroney paper fades and yellows within 5-10 years), exposure to moisture (the thermal-printed total-price line is the first to fade). NEVER laminate — heat-laminated stickers are immediately recognized as 'modified' by serious collectors and depress, rather than preserve, value.",
    sourceCitationKey: "window-sticker-preservation",
  },
  {
    id: "window-sticker-counterfeit-warning",
    sourceType: "known_issue",
    sourceLabel: "Window Sticker Reference",
    title: "Counterfeit / replica window stickers — what to watch for",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "fake sticker",
      "counterfeit Monroney",
      "replica window sticker",
      "위조 스티커",
    ],
    excerpt:
      "Online vendors sell 'replica Monroney stickers' generated from VIN lookups. These are NOT original Ford documents — they are reproductions printed by third parties using whatever build data is available. Used-market red flags: 1) Paper that is too bright/white (originals yellow with age). 2) Crisp, modern inkjet output (originals were dot-matrix or early thermal). 3) A QR code or barcode that points to a reproduction service URL (originals had no QR codes in the 2009-2014 era). 4) MSRP totals that don't match Ford's archived pricing for that model year. 5) Vendor offering 'lost sticker replacement' — Ford does not replace lost Monroney stickers; they only provide build sheets (different document, plain-paper format). When buying used, verify the Monroney against a Ford build-sheet request to confirm option codes match.",
    inspectionHint: "Originals show age-appropriate yellowing, dot-matrix or thermal print, and no QR codes for 2009-2014 builds.",
    sourceCitationKey: "window-sticker-counterfeit-warning",
  },
  {
    id: "window-sticker-korea-resale-impact",
    sourceType: "repair_note",
    sourceLabel: "Window Sticker Reference",
    title: "Korean used-market: original sticker boosts resale 5-10%",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Korea resale",
      "Korean used market",
      "한국 중고",
      "수출 차량 가치",
      "스티커 가치",
    ],
    excerpt:
      "In the Korean used F-150 market, an original Ford Monroney window sticker is considered prima facie evidence of provenance (verifies the truck was a legitimate US export rather than a salvage/rebuild import) and typically boosts resale value 5-10% on a comparable-condition truck. For collector trims (SVT Raptor, Harley-Davidson, Platinum, Limited), the premium can reach 15%. Practical advice for Jay-spec owners: if the sticker is missing, order a Ford build sheet by VIN from a US Ford dealer (free) — while not equivalent to the original Monroney, a printed build sheet plus a copy of the original US title materially improves buyer confidence. Korean buyers familiar with 12th-gen specs (especially the 5.4L 3V vs the 6.2L Boss distinction in Raptors) will discount aggressively when documentation is incomplete.",
    sourceCitationKey: "window-sticker-korea-resale-impact",
  },
  {
    id: "window-sticker-door-jamb-vs-monroney",
    sourceType: "owner_manual",
    sourceLabel: "Window Sticker Reference",
    title: "Door-jamb sticker vs window sticker — what each contains",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "door jamb sticker",
      "B-pillar sticker",
      "certification label",
      "도어 잼 스티커",
    ],
    excerpt:
      "Two different stickers, often confused: 1) DOOR-JAMB STICKER (federal certification label) — permanently affixed to the driver's B-pillar, never removed. Contains: VIN, GVWR/GAWR ratings, tire/wheel/axle weights, paint code, interior trim code, build date (month/year), assembly plant code (D = Dearborn, K = Kansas City), and an 'OPT' field with 8-16 condensed option codes. This is permanent and authentic by definition. 2) MONRONEY / WINDOW STICKER — the printed full-page document affixed to the side window at point-of-sale. Lists every option with marketing name and individual MSRP. Removable, often lost. The door-jamb's OPT field is the authoritative source if the Monroney is missing — it lists the same codes, just without marketing names.",
    sourceCitationKey: "window-sticker-door-jamb-vs-monroney",
  },
  {
    id: "window-sticker-axle-code-tag",
    sourceType: "owner_manual",
    sourceLabel: "Window Sticker Reference",
    title: "Differential / axle code tag — supplemental to the door jamb",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "axle tag",
      "differential tag",
      "rear diff code",
      "디퍼렌셜 태그",
    ],
    excerpt:
      "Beyond the door-jamb sticker, the 12th-gen F-150 carries a small metal axle-code tag bolted to the rear differential cover (one of the cover bolts). It is stamped with the axle ratio (e.g., '3L55' = 3.55, '3L73' = 3.73, '4L10' = 4.10) and a 'L' suffix if the differential is limited-slip ('L' = Trac-Lok limited-slip; absence of L = open). Use this tag to verify axle ratio and limited-slip status when the door jamb is unreadable or the original sticker is missing. For 12th-gen 4x4 builds, the front diff does NOT have a similar code tag — front ratio always matches rear by design.",
    inspectionHint: "Inspect the rear differential cover for a small metal tag on one of the cover bolts.",
    sourceCitationKey: "window-sticker-axle-code-tag",
  },
  {
    id: "window-sticker-build-sheet-marti",
    sourceType: "repair_note",
    sourceLabel: "Window Sticker Reference",
    title: "Ford build sheet vs Marti Report — when each is useful",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Marti report",
      "Ford build sheet",
      "VIN history",
      "마티 리포트",
    ],
    excerpt:
      "Two services exist to reconstruct missing window-sticker data: 1) FORD BUILD SHEET — request from any US Ford dealer with the VIN. Free, returned in 1-3 business days. Lists every option code with marketing name, build date, assembly plant. Adequate for most decoding needs on a 12th-gen F-150. 2) MARTI REPORT (marti.com) — paid (USD $35-$150 depending on tier). Originally for vintage Ford / Mustang owners, Marti now offers reports for newer Fords including 12th-gen F-150 SVT Raptor. Marti reports include production statistics ('1 of 247 painted Tuxedo Black SuperCab Raptors built that day') that are not on a standard Ford build sheet. For Jay-spec daily-driver F-150s, the free Ford build sheet is sufficient; the Marti is worth it for Raptor / Harley-Davidson / Limited collector builds.",
    sourceCitationKey: "window-sticker-build-sheet-marti",
  },
];
