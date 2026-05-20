// 12th-generation Ford F-150 (2009-2014) vehicle configuration types.
// Covers all trims (XL through Limited) and the SVT Raptor variant.
//
// Designed to layer on top of the existing single-vehicle truck knowledge
// in lib/knowledge/truck/. Each vehicle config carries enough data to drive
// trim selection, engine-aware triage, and RockAuto parts filtering.

export type ModelYear = 2009 | 2010 | 2011 | 2012 | 2013 | 2014;

export type CabStyle = "regular_cab" | "supercab" | "supercrew";
export type BedLength = "5.5ft" | "6.5ft" | "8ft";
export type Drivetrain = "4x2" | "4x4";
export type TransferCaseShift = "manual" | "esof";

export type EngineId =
  | "4_6l_2v"
  | "4_6l_3v"
  | "5_4l_3v"
  | "6_2l_boss"
  | "3_7l_tivct"
  | "5_0l_coyote"
  | "3_5l_ecoboost";

export type TransmissionId = "4r75e" | "6r80";

export type TrimId =
  | "xl"
  | "stx"
  | "xlt"
  | "fx2"
  | "fx4"
  | "lariat"
  | "king_ranch"
  | "platinum"
  | "harley_davidson"
  | "limited"
  | "svt_raptor";

export type RecommendationBias = "diy_safe" | "inspect_only" | "shop_required";

export interface EngineSpec {
  id: EngineId;
  displayName: string;
  yearsOffered: ModelYear[];
  displacementCc: number;
  configuration: string; // "V8 SOHC 2V", "V6 DOHC 4V Ti-VCT twin-turbo DI", etc.
  cylinders: number;
  valvetrain: "2V" | "3V" | "4V" | "4V_TIVCT";
  forcedInduction: false | "twin_turbo";
  fuelSystem: "port" | "direct" | "port+direct";
  fuelGrade: "87" | "87_recommended_91" | "91";
  flexFuelCapable: boolean;
  horsepowerSae: { hp: number; atRpm: number };
  torqueLbFt: { lbft: number; atRpm: number };
  oilCapacityQt: number;
  oilViscosity: string; // "5W-20", "5W-30"
  oilFordSpec: string;
  oilFilterMotorcraft: string; // "FL-820S", "FL-500S", "FL-2017"
  coolantSpec: "motorcraft_gold_vc7" | "motorcraft_orange_vc3";
  coolantCapacityQt: number;
  sparkPlugMotorcraft: string;
  sparkPlugGapIn: number;
  sparkPlugTorqueLbFt?: number;
  sparkPlugTorqueLbIn?: number;
  sparkPlugIntervalMi: number;
  sparkPlugCount: number;
  timingDrive: "chain" | "belt";
  serpentineBelt?: string;
  commonDtcs: string[];
  topFailureModes: FailureMode[];
  notes?: string[];
}

export interface FailureMode {
  symptom: string;
  rootCause: string;
  mileageOnsetMin?: number;
  mileageOnsetMax?: number;
  recommendation: RecommendationBias;
  diyDifficulty: "easy" | "moderate" | "hard" | "shop";
  estimatedCostUsd?: { min: number; max: number };
  sourceUrls?: string[];
}

export interface TransmissionSpec {
  id: TransmissionId;
  displayName: string;
  yearsOffered: ModelYear[];
  fluidSpec: "mercon_v" | "mercon_lv";
  fluidTotalQt: number;
  fluidPanDropQt: number;
  serviceIntervalNormalMi: number;
  serviceIntervalSevereMi: number;
  pairedEngineIds: EngineId[];
  commonFailureModes: FailureMode[];
  notes?: string[];
}

export interface AxleConfig {
  rearRingGearIn: 8.8 | 9.75;
  ratiosAvailable: number[];
  rearDiffOptions: ("open" | "limited_slip" | "electronic_locker")[];
}

export interface TrimYearConfig {
  year: ModelYear;
  enginesOffered: EngineId[];
  cabStylesOffered: CabStyle[];
  bedLengthsOffered: BedLength[];
  transmissionsOffered: TransmissionId[];
  wheelDiameterIn: number[];
  axleConfigs: AxleConfig[];
  payloadLbRange?: [number, number];
  maxTowLbRange?: [number, number];
  curbWeightLbRange?: [number, number];
}

export interface TrimSpec {
  id: TrimId;
  displayName: string;
  tier: "fleet" | "sport_value" | "volume" | "sport" | "luxury" | "halo" | "off_road_halo";
  yearsOffered: ModelYear[];
  yearConfigs: TrimYearConfig[];
  serviceRelevantEquipment: string[]; // memory seats, 22" chrome wheels, etc.
  notes?: string[];
}

// SVT Raptor carries its own enhanced shape — Fox shocks, wider track, locker,
// year-over-year deltas matter more than on stock trims.
export interface RaptorVariantSpec extends Omit<TrimSpec, "id" | "tier"> {
  id: "svt_raptor";
  tier: "off_road_halo";
  trackWidthInDeltaFromStock: number;
  groundClearanceInFront: number;
  groundClearanceInRear: number;
  approachDeg: { supercab: number; supercrew?: number };
  departureDeg: { supercab: number; supercrew?: number };
  wheelTravelInFront: number;
  wheelTravelInRear: number;
  shockBrand: "Fox_Racing_Shox";
  shockType: "internal_bypass_2_5";
  shockRebuildIntervalMi: {
    streetOnly: number;
    mixed: number;
    hardOffRoad: number;
  };
  oeWheelSize: "17x8.5";
  oeWheelMaterial: "cast_aluminum";
  oeBeadlockOption: { availableFrom: ModelYear; forged: true };
  oeTireSize: "315/70R17";
  oeTireModel: "BFGoodrich All-Terrain T/A KO";
  oeTirePressurePsi: { front: number; rear: number };
  frontDiffByYear: Record<ModelYear, "open" | "torsen_t2r">;
  rearAxleRatio: 4.1;
  rearLocker: "electronic";
  brakeFrontRotorIn: number;
  brakeRearRotorIn: number;
  hasHillDescentControl: true;
  hasOffRoadMode: true;
  hasFactorySwayBarDisconnect: false;
  knownIssues: RaptorKnownIssue[];
}

export interface RaptorKnownIssue {
  area: "suspension" | "engine" | "frame" | "tires" | "brakes" | "lighting" | "cooling";
  title: string;
  symptom: string;
  mileageNote?: string;
  recommendation: RecommendationBias;
  fixSummary: string;
  partFamily?: string;
  sourceUrls?: string[];
}

export interface ServiceBulletin {
  id: string; // "TSB-13-8-1", "NHTSA-19V-075", "CSP-11B25"
  kind: "TSB" | "RECALL" | "CSP" | "FSA" | "SSM";
  yearsAffected: ModelYear[];
  trimsAffected?: TrimId[];
  engineIds?: EngineId[];
  system:
    | "engine"
    | "transmission"
    | "driveline"
    | "brakes"
    | "steering"
    | "body"
    | "hvac"
    | "electrical"
    | "suspension"
    | "fuel_system"
    | "safety";
  symptom: string;
  dtcs?: string[];
  cause: string;
  remedy: string;
  buildDateRange?: { from?: string; to?: string };
  laborHours?: number;
  verifiedSources: number;
  sourceUrls: string[];
}

// Maps a vehicle config to RockAuto catalog query keys. Because the current
// catalog.json is single-vehicle (2010 F-150 5.4L V8), this linker tells the
// UI which RockAuto (sub)categories apply when a user has selected a
// different trim/engine. For non-2010-5.4L combinations the price/stock
// numbers should be treated as "representative" until the catalog is
// expanded — same parts often cross-fit because Ford reused subsystems
// across the 12th-gen lineup.
export interface PartsLinkerEntry {
  forEngine?: EngineId;
  forTrim?: TrimId;
  forSystem: ServiceBulletin["system"] | "accessory_drive" | "ignition" | "exhaust" | "cooling";
  rockautoCategoryHints: string[]; // exact match against catalog.parts[i].category
  rockautoSubcategoryHints: string[]; // exact match against parts[i].subcategory
  searchTerms: string[]; // free-text fallback for searchPartsCatalog()
  trimSpecific?: boolean; // true if catalog match is approximate (different trim)
  notes?: string;
}
