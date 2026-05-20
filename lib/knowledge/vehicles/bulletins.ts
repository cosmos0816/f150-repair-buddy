// NHTSA recalls, Ford Technical Service Bulletins (TSBs), and Customer
// Satisfaction Programs (CSPs) that affect the 12th-generation F-150
// (2009-2014) and SVT Raptor (2010-2014).
//
// Curated subset of the ~40+ entries mined from NHTSA, Ford service portals,
// CarComplaints, and forum bulletin indexes. Entries kept here are the
// highest triage value for an owner-facing inspection app — ones most likely
// to map to a customer's current complaint.

import type { ServiceBulletin } from "./types";

export const BULLETINS: ServiceBulletin[] = [
  // === NHTSA recalls ===
  {
    id: "NHTSA-11V-049",
    kind: "RECALL",
    yearsAffected: [2009, 2010],
    system: "body",
    symptom: "Interior door handle housing fractures; door may unlatch in side impact",
    cause: "Handle housing embossment cracks, spring loses tension",
    remedy: "Inspect and reinforce or replace door handle module (~280,000 units).",
    buildDateRange: { from: "2008-01-18", to: "2009-11-30" },
    verifiedSources: 2,
    sourceUrls: ["https://www.consumerreports.org/cro/news/2011/02/recall-2009-2010-ford-f-150-door-handle-failures/index.htm"],
  },
  {
    id: "NHTSA-19V-075",
    kind: "RECALL",
    yearsAffected: [2011, 2012, 2013],
    engineIds: ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost", "5_4l_3v", "6_2l_boss"],
    system: "transmission",
    symptom: "Intermittent OSS signal loss causes unintended downshift to 1st gear at any speed",
    cause: "Output Shaft Speed sensor contamination",
    remedy: "PCM reflash (~1.26M units). Re-flash in 19V-433 / 24V-444 follow-ups.",
    verifiedSources: 3,
    sourceUrls: ["https://repairpal.com/recall/19V075000", "https://static.nhtsa.gov/odi/rcl/2019/RCLRPT-19V075-8473.PDF"],
  },
  {
    id: "NHTSA-16V-345",
    kind: "RECALL",
    yearsAffected: [2013, 2014],
    engineIds: ["3_5l_ecoboost"],
    system: "brakes",
    symptom: "Soft pedal, brake fluid leak; loss of front brake function",
    cause: "Master cylinder rear cup seal rolls; fluid leaks into vacuum booster",
    remedy: "Replace master cylinder; replace booster if contaminated (~225,000 units).",
    buildDateRange: { from: "2013-08-01", to: "2014-08-31" },
    verifiedSources: 2,
    sourceUrls: ["https://static.nhtsa.gov/odi/rcl/2016/RCMN-16V345-1450.pdf"],
  },
  {
    id: "NHTSA-14V-316",
    kind: "RECALL",
    yearsAffected: [2014],
    engineIds: ["3_7l_tivct", "5_0l_coyote", "3_5l_ecoboost"],
    system: "steering",
    symptom: "Total loss of electric power steering assist; 'Do not drive' advisory",
    cause: "Incorrectly installed gear motor position sensor magnet in EPAS rack",
    remedy: "Replace EPAS steering gear (~5,675 units).",
    buildDateRange: { from: "2014-05-26", to: "2014-06-19" },
    verifiedSources: 2,
    sourceUrls: ["https://auto-recalls.justia.com/ford/f150/2014/14v316000/"],
  },
  {
    id: "CSP-11B25",
    kind: "CSP",
    yearsAffected: [2011],
    trimsAffected: ["svt_raptor"],
    system: "driveline",
    symptom: "Driveshaft clunk on torque application from stop or during decel",
    cause: "Rear driveshaft slip-yoke binds on T-case output shaft (missing nickel plating)",
    remedy: "Replace driveshaft BL3V-4602-AB. No-charge under CSP 11B25.",
    buildDateRange: { to: "2011-03-12" },
    verifiedSources: 2,
    sourceUrls: ["https://www.fordraptorforum.com/threads/tsb-11-5-7-driveline-clunk.13643/"],
  },

  // === Engine TSBs ===
  {
    id: "TSB-12-7-10",
    kind: "TSB",
    yearsAffected: [2009, 2010],
    engineIds: ["4_6l_3v", "5_4l_3v"],
    system: "engine",
    symptom: "Intermittent rattle <1200 rpm warm; rough idle",
    dtcs: ["P0022", "P0021", "P0340", "P0341"],
    cause: "Oscillating cam timing from contaminated VCT solenoids",
    remedy: "Replace LH + RH VCT solenoids; covered under NVLW + Emissions warranty.",
    verifiedSources: 2,
    sourceUrls: ["https://ford.oemdtc.com/1015/intermittent-rattle-noise-while-driving-rough-idle-diagnostic-trouble-codes-dtcs-p0022-p0021-p0340-p0341-2004-2013-ford-lincoln"],
  },
  {
    id: "TSB-13-8-1",
    kind: "TSB",
    yearsAffected: [2011, 2012],
    engineIds: ["3_5l_ecoboost"],
    system: "engine",
    symptom: "Intermittent stumble/misfire on hard accel after highway run in humid conditions",
    dtcs: ["P0300"],
    cause: "Condensation trapped in CAC (intercooler) ingested under boost transient",
    remedy: "Move air deflector to bottom of intercooler; reprogram PCM; replace LH cat if damaged.",
    verifiedSources: 2,
    sourceUrls: ["https://www.f150online.com/forums/v6-engines-including-ecoboost/506521-tsb-13-08-01-intercooler-fix-will-reduce-power-mpgs.html"],
  },
  {
    id: "TSB-14-0194",
    kind: "TSB",
    yearsAffected: [2011, 2012, 2013, 2014],
    engineIds: ["3_5l_ecoboost"],
    system: "engine",
    symptom: "MIL on, P0016; cold-start rattle",
    dtcs: ["P0016"],
    cause: "Stretched primary timing chain",
    remedy: "Replace primary timing chain, guides, tensioners, phasers as required (~9.0 hr).",
    buildDateRange: { to: "2014-10-10" },
    verifiedSources: 2,
    sourceUrls: ["https://www.ford-trucks.com/forums/1301331-3-5l-ecoboost-new-misfire-fix-tsb-jan-2014-a.html"],
  },
  {
    id: "TSB-11-9-15",
    kind: "TSB",
    yearsAffected: [2011],
    engineIds: ["5_0l_coyote"],
    system: "engine",
    symptom: "Metallic rattle/scratching from front of LH cylinder head at idle",
    cause: "Defective primary timing chain tensioner on LH bank",
    remedy: "Replace LH primary tensioner BR3Z-6L266-AA AND tensioner arm (~5.3 hr).",
    buildDateRange: { to: "2011-03-31" },
    verifiedSources: 2,
    sourceUrls: ["https://www.f150forum.com/f70/5-0-timing-chain-tensioner-replacement-tsb-11-9-15-a-239635/"],
  },
  {
    id: "TSB-15-0003",
    kind: "TSB",
    yearsAffected: [2011, 2012, 2013, 2014],
    engineIds: ["3_5l_ecoboost"],
    system: "engine",
    symptom: "Carbon-fouled intake valves, misfires, oil ingestion through PCV",
    cause: "Crankcase vapor ingested into intake under boost",
    remedy: "New PCV/breather components + PCM reflash; valvetrain cleaning if heavily fouled.",
    verifiedSources: 1,
    sourceUrls: ["https://www.underhoodservice.com/ford-3-5l-ecoboost-common-problems/"],
  },

  // === Transmission TSBs ===
  {
    id: "TSB-13-6-8",
    kind: "TSB",
    yearsAffected: [2011, 2012, 2013],
    system: "transmission",
    symptom: "Engages in 5th gear from start; speedometer reads 0; wrench/seatbelt lamps on",
    cause: "Metal contamination shorts solenoid connections through molded lead frame",
    remedy: "Replace molded lead frame; install foam isolator + magnet. 10yr/150k coverage.",
    buildDateRange: { to: "2013-04-08" },
    verifiedSources: 3,
    sourceUrls: ["https://static.nhtsa.gov/odi/tsbs/2013/SB-10053419-7635.pdf"],
  },
  {
    id: "TSB-21307",
    kind: "TSB",
    yearsAffected: [2009, 2010],
    system: "transmission",
    symptom: "Confusion over fluid spec from incorrectly stamped dipstick",
    cause: "6R60 (Mercon SP) and 6R80 (Mercon LV) dipstick interchange at factory",
    remedy: "Disregard dipstick text; correct fluid is Mercon LV per Workshop Manual.",
    verifiedSources: 1,
    sourceUrls: ["https://www.f150forum.com/"],
  },

  // === Driveline / 4WD ===
  {
    id: "TSB-12-1-13",
    kind: "TSB",
    yearsAffected: [2009, 2010, 2011, 2012, 2013, 2014],
    system: "driveline",
    symptom: "Grinding/clicking from front wheel area while driving in 2WD",
    cause: "Partial engagement of IWEs due to vacuum loss or worn IWE clutch",
    remedy: "Replace IWE vacuum lines, check valve YG360, solenoid; replace IWE if hub teeth damaged.",
    verifiedSources: 2,
    sourceUrls: ["https://ford.oemdtc.com/4748/intermittent-grinding-noise-from-integrated-wheel-ends-iwes-while-driving-in-two-wheel-drive-2wd-2013-2018-ford-expedition-f-150-lincoln-navigator"],
  },

  // === Electrical / Fuel ===
  {
    id: "TSB-15-0137",
    kind: "TSB",
    yearsAffected: [2009, 2010, 2011, 2012, 2013, 2014],
    system: "fuel_system",
    symptom: "Crank-no-start, intermittent stall, melted-plastic smell at BEC, Fuse 27 cavity charred",
    cause: "Fuse 27 contacts undersized for FPDM load → resistive heating",
    remedy: "Install Fuse 27 Relocation Kit EL3Z-14293-A.",
    verifiedSources: 2,
    sourceUrls: ["https://lmr.com/products/f150-what-is-fuse-27-relocation-kit"],
  },

  // === HVAC ===
  {
    id: "TSB-14-0021",
    kind: "TSB",
    yearsAffected: [2009, 2010, 2011, 2012, 2013, 2014],
    system: "hvac",
    symptom: "Persistent clicking/popping from passenger footwell or center dash; vents stuck",
    cause: "Plastic gear in blend-door / mode-door actuator strips",
    remedy: "Replace affected actuator (FL3Z-19E616 family).",
    verifiedSources: 2,
    sourceUrls: ["https://did-it-myself.com/replacing-2011-f-150-hvac-blend-door-actuator/"],
  },
];

export function bulletinsForEngine(engineId: string): ServiceBulletin[] {
  return BULLETINS.filter((b) => !b.engineIds || b.engineIds.some((e) => e === engineId));
}

export function bulletinsForYear(year: number): ServiceBulletin[] {
  return BULLETINS.filter((b) =>
    b.yearsAffected.some((y) => y === year),
  );
}

export function bulletinsForSystem(system: ServiceBulletin["system"]): ServiceBulletin[] {
  return BULLETINS.filter((b) => b.system === system);
}
