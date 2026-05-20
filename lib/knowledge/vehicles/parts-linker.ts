// Maps a vehicle/engine config to RockAuto catalog query keys.
//
// The current RockAuto catalog at sources/rockauto/catalog.json is scraped
// for the 2010 F-150 5.4L V8 only. Many parts cross-fit across the 12th-gen
// lineup because Ford reused subsystems heavily. This linker tells the UI
// (and the searchReplacementParts tool) which (sub)categories to surface
// when a user has selected a different trim/engine, and marks results as
// approximate so the UI can flag "verify fit at RockAuto for your exact VIN."

import type { EngineId, PartsLinkerEntry, TrimId } from "./types";

// Universal — applies to all 12th-gen trims/engines.
const UNIVERSAL_ENTRIES: PartsLinkerEntry[] = [
  {
    forSystem: "brakes",
    rockautoCategoryHints: ["Brake & Wheel Hub"],
    rockautoSubcategoryHints: ["Brake Pad", "Brake Rotor", "Brake Caliper", "Brake Caliper Slide Pin Kit"],
    searchTerms: ["brake pad", "brake rotor", "caliper"],
  },
  {
    forSystem: "suspension",
    rockautoCategoryHints: ["Suspension"],
    rockautoSubcategoryHints: ["Sway Bar Link Kit", "Tie Rod End", "Ball Joint", "Control Arm"],
    searchTerms: ["tie rod", "ball joint", "sway bar", "control arm"],
  },
  {
    forSystem: "cooling",
    rockautoCategoryHints: ["Cooling System"],
    rockautoSubcategoryHints: ["Radiator", "Thermostat", "Water Pump", "Radiator Hose"],
    searchTerms: ["radiator", "thermostat", "water pump", "hose"],
  },
  {
    forSystem: "hvac",
    rockautoCategoryHints: ["Heat & Air Conditioning"],
    rockautoSubcategoryHints: ["A/C Compressor", "HVAC Blend Door Actuator", "Blower Motor"],
    searchTerms: ["blend door", "actuator", "ac compressor", "blower"],
  },
  {
    forSystem: "electrical",
    rockautoCategoryHints: ["Electrical", "Electrical-Switch & Relay"],
    rockautoSubcategoryHints: ["Door Lock Actuator", "Window Regulator", "Ignition Coil"],
    searchTerms: ["ignition coil", "door lock", "window regulator"],
  },
  {
    forSystem: "steering",
    rockautoCategoryHints: ["Steering"],
    rockautoSubcategoryHints: ["Power Steering Pump", "Tie Rod End", "Rack and Pinion"],
    searchTerms: ["power steering", "tie rod", "rack pinion"],
  },
];

// Engine-specific — added on top of universal when an engine is selected.
const ENGINE_ENTRIES: Record<EngineId, PartsLinkerEntry[]> = {
  "4_6l_2v": [
    {
      forEngine: "4_6l_2v",
      forSystem: "ignition",
      rockautoCategoryHints: ["Ignition"],
      rockautoSubcategoryHints: ["Spark Plug", "Ignition Coil"],
      searchTerms: ["Motorcraft SP-432", "spark plug 4.6"],
    },
    {
      forEngine: "4_6l_2v",
      forSystem: "engine",
      rockautoCategoryHints: ["Engine"],
      rockautoSubcategoryHints: ["Oil Filter", "Valve Cover Gasket Set", "Intake Manifold Gasket Set"],
      searchTerms: ["FL-820S", "valve cover gasket", "intake manifold"],
    },
  ],
  "4_6l_3v": [
    {
      forEngine: "4_6l_3v",
      forSystem: "ignition",
      rockautoCategoryHints: ["Ignition"],
      rockautoSubcategoryHints: ["Spark Plug", "Ignition Coil"],
      searchTerms: ["SP-546", "SP-509", "spark plug"],
    },
    {
      forEngine: "4_6l_3v",
      forSystem: "engine",
      rockautoCategoryHints: ["Engine"],
      rockautoSubcategoryHints: ["Timing Chain Kit", "Cam Phaser", "VCT Solenoid", "Oil Filter"],
      searchTerms: ["cam phaser", "timing chain", "VCT solenoid", "FL-820S"],
    },
  ],
  "5_4l_3v": [
    {
      forEngine: "5_4l_3v",
      forSystem: "ignition",
      rockautoCategoryHints: ["Ignition"],
      rockautoSubcategoryHints: ["Spark Plug", "Ignition Coil"],
      searchTerms: ["SP-546", "Motorcraft DG-521", "spark plug 5.4"],
    },
    {
      forEngine: "5_4l_3v",
      forSystem: "engine",
      rockautoCategoryHints: ["Engine"],
      rockautoSubcategoryHints: [
        "Timing Chain Kit",
        "Cam Phaser",
        "VCT Solenoid",
        "Oil Filter",
        "Valve Cover Gasket Set",
      ],
      searchTerms: ["cam phaser", "timing chain kit 5.4", "VCT solenoid", "FL-820S"],
    },
    {
      forEngine: "5_4l_3v",
      forSystem: "accessory_drive",
      rockautoCategoryHints: ["Belt Drive"],
      rockautoSubcategoryHints: ["Belt", "Belt Tensioner", "Idler Pulley"],
      searchTerms: ["serpentine belt", "tensioner"],
    },
    {
      forEngine: "5_4l_3v",
      forSystem: "exhaust",
      rockautoCategoryHints: ["Exhaust & Emission"],
      rockautoSubcategoryHints: ["Exhaust Manifold", "Manifold Stud", "Manifold Gasket"],
      searchTerms: ["exhaust manifold", "manifold stud"],
    },
  ],
  "6_2l_boss": [
    {
      forEngine: "6_2l_boss",
      forSystem: "ignition",
      rockautoCategoryHints: ["Ignition"],
      rockautoSubcategoryHints: ["Spark Plug", "Ignition Coil"],
      searchTerms: ["SP-526", "spark plug 6.2"],
      notes: "16 plugs total (twin-plug per cylinder).",
    },
    {
      forEngine: "6_2l_boss",
      forSystem: "engine",
      rockautoCategoryHints: ["Engine"],
      rockautoSubcategoryHints: ["Oil Filter", "Cam Phaser", "Valve Spring Kit", "Valve Cover Gasket Set"],
      searchTerms: ["FL-2017", "valve spring", "cam phaser 6.2"],
    },
    {
      forEngine: "6_2l_boss",
      forSystem: "exhaust",
      rockautoCategoryHints: ["Exhaust & Emission"],
      rockautoSubcategoryHints: ["Exhaust Manifold", "Manifold Stud Kit"],
      searchTerms: ["exhaust manifold 6.2"],
    },
    {
      forEngine: "6_2l_boss",
      forSystem: "cooling",
      rockautoCategoryHints: ["Cooling System"],
      rockautoSubcategoryHints: ["Coolant Reservoir", "Radiator", "Water Pump"],
      searchTerms: ["degas bottle", "coolant reservoir", "orange coolant VC-3"],
    },
  ],
  "3_7l_tivct": [
    {
      forEngine: "3_7l_tivct",
      forSystem: "ignition",
      rockautoCategoryHints: ["Ignition"],
      rockautoSubcategoryHints: ["Spark Plug", "Ignition Coil"],
      searchTerms: ["SP-432", "spark plug 3.7"],
    },
    {
      forEngine: "3_7l_tivct",
      forSystem: "engine",
      rockautoCategoryHints: ["Engine"],
      rockautoSubcategoryHints: ["Oil Filter", "Water Pump", "Timing Chain Kit"],
      searchTerms: ["FL-500S", "water pump 3.7"],
    },
  ],
  "5_0l_coyote": [
    {
      forEngine: "5_0l_coyote",
      forSystem: "ignition",
      rockautoCategoryHints: ["Ignition"],
      rockautoSubcategoryHints: ["Spark Plug", "Ignition Coil"],
      searchTerms: ["SP-534", "SP-580", "spark plug 5.0"],
    },
    {
      forEngine: "5_0l_coyote",
      forSystem: "engine",
      rockautoCategoryHints: ["Engine"],
      rockautoSubcategoryHints: ["Oil Filter", "Timing Chain Kit", "Tensioner", "VCT Solenoid"],
      searchTerms: ["FL-500S", "BR3Z-6L266-AA tensioner", "timing chain 5.0"],
    },
  ],
  "3_5l_ecoboost": [
    {
      forEngine: "3_5l_ecoboost",
      forSystem: "ignition",
      rockautoCategoryHints: ["Ignition"],
      rockautoSubcategoryHints: ["Spark Plug", "Ignition Coil"],
      searchTerms: ["SP-534", "spark plug ecoboost"],
      notes: "60k-mi accelerated interval. Tight 0.032in gap.",
    },
    {
      forEngine: "3_5l_ecoboost",
      forSystem: "engine",
      rockautoCategoryHints: ["Engine"],
      rockautoSubcategoryHints: ["Oil Filter", "Turbocharger", "Timing Chain Kit", "Wastegate Actuator"],
      searchTerms: ["FL-500S", "turbo ecoboost", "wastegate"],
    },
    {
      forEngine: "3_5l_ecoboost",
      forSystem: "fuel_system",
      rockautoCategoryHints: ["Fuel & Air"],
      rockautoSubcategoryHints: ["Fuel Injector", "High Pressure Fuel Pump"],
      searchTerms: ["HPFP", "fuel injector ecoboost"],
    },
  ],
};

// Trim-specific overlays — equipment that's unique to certain trims and
// drives different RockAuto subcategory hits.
const TRIM_ENTRIES: Partial<Record<TrimId, PartsLinkerEntry[]>> = {
  svt_raptor: [
    {
      forTrim: "svt_raptor",
      forSystem: "suspension",
      rockautoCategoryHints: ["Suspension"],
      rockautoSubcategoryHints: ["Shock Absorber", "Strut Assembly", "Control Arm"],
      searchTerms: ["Fox 2.5", "Raptor shock", "raptor control arm"],
      trimSpecific: true,
      notes: "Raptor uses Fox internal-bypass shocks and wider tubular UCAs — NOT interchangeable with stock F-150 same year.",
    },
    {
      forTrim: "svt_raptor",
      forSystem: "brakes",
      rockautoCategoryHints: ["Brake & Wheel Hub"],
      rockautoSubcategoryHints: ["Brake Rotor", "Brake Pad", "Brake Caliper"],
      searchTerms: ["Raptor 13.8", "DG1Z-2001-D"],
      trimSpecific: true,
      notes: "Raptor has unique 13.8in front rotors; caliper bracket differs from stock F-150.",
    },
  ],
  limited: [
    {
      forTrim: "limited",
      forSystem: "electrical",
      rockautoCategoryHints: ["Body & Lamp Assembly"],
      rockautoSubcategoryHints: ["Headlight Assembly", "HID Ballast"],
      searchTerms: ["HID ballast", "D3S", "Limited headlight"],
      trimSpecific: true,
      notes: "Limited has factory HID — D3S bulbs and Ford 42V ballast.",
    },
  ],
  platinum: [
    {
      forTrim: "platinum",
      forSystem: "body",
      rockautoCategoryHints: ["Wheel"],
      rockautoSubcategoryHints: ["Wheel"],
      searchTerms: ["20 polished aluminum Platinum"],
      trimSpecific: true,
      notes: "Platinum-specific 20in polished aluminum wheels.",
    },
  ],
  harley_davidson: [
    {
      forTrim: "harley_davidson",
      forSystem: "body",
      rockautoCategoryHints: ["Wheel"],
      rockautoSubcategoryHints: ["Wheel"],
      searchTerms: ["22 chrome Harley"],
      trimSpecific: true,
      notes: "HD-specific 22in chrome wheels with non-standard tire size (P275/45R22).",
    },
  ],
  lariat: [
    {
      forTrim: "lariat",
      forSystem: "electrical",
      rockautoCategoryHints: ["Electrical-Switch & Relay"],
      rockautoSubcategoryHints: ["Memory Seat Switch"],
      searchTerms: ["memory seat switch Lariat"],
      trimSpecific: true,
      notes: "Lariat memory seats have unique switch + module part numbers.",
    },
  ],
};

export function getLinkerEntries(options: {
  engineId?: EngineId;
  trimId?: TrimId;
  system?: PartsLinkerEntry["forSystem"];
}): PartsLinkerEntry[] {
  let entries: PartsLinkerEntry[] = [...UNIVERSAL_ENTRIES];
  if (options.engineId) entries = entries.concat(ENGINE_ENTRIES[options.engineId] ?? []);
  if (options.trimId) entries = entries.concat(TRIM_ENTRIES[options.trimId] ?? []);
  if (options.system) entries = entries.filter((e) => e.forSystem === options.system);
  return entries;
}

// Builds free-text search terms to pass to searchPartsCatalog() given a
// (trim, engine, system) selection. The resulting array is meant to be tried
// in order — caller stops at first non-empty hit.
export function buildPartsSearchTerms(options: {
  engineId?: EngineId;
  trimId?: TrimId;
  system?: PartsLinkerEntry["forSystem"];
}): string[] {
  const entries = getLinkerEntries(options);
  const out = new Set<string>();
  for (const e of entries) {
    for (const t of e.searchTerms) out.add(t);
  }
  return Array.from(out);
}

// Boolean: tells the UI whether a RockAuto result will be approximate for
// this trim/engine pair (i.e. the catalog is 2010 5.4L but user selected
// something else).
export function isFitmentApproximate(options: { engineId?: EngineId; trimId?: TrimId }): boolean {
  return options.engineId !== "5_4l_3v" || options.trimId === "svt_raptor";
}
