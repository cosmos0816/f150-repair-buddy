import { F150_GENERAL_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

/**
 * Deep-dive brake system reference for the 12th-gen F-150 (2009-2014).
 * Covers rotors, calipers, pads, hydraulics, ABS/AdvanceTrac, EPB, Hill
 * Descent Control, wheel speed sensors, brake fluid, diagnostic flow, and
 * Korea-specific sourcing/labor considerations.
 *
 * All entries use vehicleScope = F150_GENERAL_VEHICLE_ID because most brake
 * hardware is shared across the 12th-gen platform — trim-specific notes are
 * called out in the excerpt body.
 */
export const BRAKE_SYSTEM_DEEP_REFERENCES: TruckReferenceRecord[] = [
  // ── 1. Front rotors — standard trims ────────────────────────────────
  {
    id: "brake-deep-front-rotors-standard",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Front rotors (standard trims) — 13.0\" vented, Motorcraft BRR-44",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: ["vibration", "squeal"],
    aliases: [
      "front rotor", "BRR-44", "13 inch rotor", "13.0 vented rotor",
      "front brake disc", "XL XLT STX rotor",
    ],
    excerpt:
      "Most 2009-2014 F-150 trims (XL, XLT, STX, Lariat, FX2/FX4) use a 13.0-inch vented front rotor. OEM is Motorcraft BRR-44 ($40-80 each). Direct cross-references: Centric 121.65109, Raybestos 580911R, Power Stop AR8645 (Z23 drilled/slotted line). Aftermarket performance options: PowerStop Z23 Evolution ($60-100/pair, drilled+slotted, mild dust reduction), EBC GreenStuff ($90-130/pair, brake bias toward street/daily), Brembo Premium ($80-120 each, smoothest pedal feel). Minimum thickness is stamped on the rotor hat — discard if measured below spec or if scoring is deeper than 0.040\". Always replace rotors in pairs (left + right) — never one side only or the truck will pull under braking.",
    inspectionHint: "Check the rotor edge lip — a pronounced ridge means pads have worn into the rotor. Measure thickness with a micrometer at multiple points; runout above 0.003\" causes pedal pulsation.",
    sourceCitationKey: "brake-deep-front-rotors-standard",
  },

  // ── 2. Front rotors — King Ranch/Platinum/Limited upgraded ──────────
  {
    id: "brake-deep-front-rotors-upgraded",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Front rotors (King Ranch / Platinum / Limited) — 13.8\" upgraded, BRR-152",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: ["vibration", "squeal"],
    aliases: [
      "BRR-152", "13.8 inch rotor", "King Ranch rotor", "Platinum rotor",
      "Limited rotor", "upgraded front rotor", "larger F-150 rotor",
    ],
    excerpt:
      "King Ranch, Platinum, and Limited trims (and trucks with the Heavy Duty Payload Package 67J) use upgraded 13.8-inch vented front rotors with thicker mass for higher heat capacity. OEM is Motorcraft BRR-152 ($60-120 each). Cross-references: Centric 121.65122, Raybestos 580922R, Power Stop AR85114. These are NOT interchangeable with the 13.0\" rotor — the caliper bracket spacing and caliper carrier are different. Verify the rotor diameter with a tape measure before ordering. The larger rotors run cooler under tow load and resist warping much better than the standard 13.0\" rotors on trucks that pull regularly.",
    inspectionHint: "Measure the rotor diameter (not just the friction surface) before ordering — 13.8\" rotors look similar but will not fit a 13.0\" caliper bracket.",
    sourceCitationKey: "brake-deep-front-rotors-upgraded",
  },

  // ── 3. Raptor Gen 1 brake hardware ──────────────────────────────────
  {
    id: "brake-deep-raptor-gen1-fronts",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Raptor (Gen 1, 2010-2014) — unique 13.8\" fronts with HD calipers",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: ["vibration"],
    aliases: [
      "Raptor brakes", "SVT Raptor rotor", "Raptor caliper",
      "Raptor HD brake", "Gen 1 Raptor brake",
    ],
    excerpt:
      "The Gen 1 SVT Raptor (2010-2014, 6.2L Boss) uses unique heavy-duty front brakes designed for off-road heat loads: 13.8\" vented fronts paired with HD calipers that share the bracket pattern of the King Ranch/Platinum but use a different caliper carrier. Raptor-specific rotor: Motorcraft BRR-186 ($80-140 each). Calipers are higher-volume sliding units with larger pistons. Cross-reference with caution — many \"F-150 rotor\" listings on Amazon do not fit Raptor. Use VIN-based lookup at RockAuto or order through Tasca Parts. PowerStop and EBC sell Raptor-specific kits but the aftermarket catalog is much thinner than for standard F-150.",
    inspectionHint: "Raptor-specific brake parts always verify with the VIN — the SVT Raptor is in a different parts catalog branch than the standard F-150.",
    sourceCitationKey: "brake-deep-raptor-gen1-fronts",
  },

  // ── 4. Rear rotors ──────────────────────────────────────────────────
  {
    id: "brake-deep-rear-rotors",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Rear rotors — 13.7\" standard, 13.8\" HD trims",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: ["vibration", "squeal"],
    aliases: [
      "rear rotor", "rear brake disc", "13.7 rotor",
      "BRR-127", "F-150 rear rotor",
    ],
    excerpt:
      "Rear rotors on the 12th-gen F-150 are vented discs (no drums after 2009). Standard trims use 13.7\" rotors — Motorcraft BRR-127 ($40-80 each). HD trims (King Ranch/Platinum/Limited/67J payload package) use 13.8\" rear rotors — Motorcraft BRR-153. Cross-references: Centric 121.65110 (standard), Centric 121.65123 (HD). The rear caliper bracket is bolted to the axle housing with two 14mm bolts at 80 lb-ft. Rear rotors typically last longer than fronts because the F-150 has front-bias braking, but rear pads can outlast rotor service life on towing-heavy trucks — inspect both at the same interval.",
    inspectionHint: "Rear rotors are easy to miss — pop a rear wheel and check thickness at the rotor hat stamp. A thin rear rotor with a fresh front job will leave the truck unbalanced under braking.",
    sourceCitationKey: "brake-deep-rear-rotors",
  },

  // ── 5. Heavy Duty Payload Package (67J) ─────────────────────────────
  {
    id: "brake-deep-67j-payload-package",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Heavy Duty Payload Package (option code 67J) — larger rotors, HD calipers",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: [],
    aliases: [
      "67J", "HD payload package", "Heavy Duty Payload",
      "Max Payload F-150", "67J brakes",
    ],
    excerpt:
      "The Heavy Duty Payload Package (option code 67J) bundles upgraded brakes (13.8\" front + rear rotors and HD calipers), heavier rear springs, and a higher GVWR (typically 7,700 lbs). Trucks ordered with 67J share brake hardware with King Ranch/Platinum/Limited even on lower-trim F-150s — never assume rotor size by trim badge alone. Check the door jamb sticker for \"67J\" or the SVO/RPO label. Pads and rotors for 67J trucks use the upgraded part numbers (BRR-152 front, BRR-153 rear, Motorcraft BR-1602-B rear pads) — ordering the standard 13.0\" front rotor will not fit. The HD caliper has a larger piston bore for more clamping force.",
    inspectionHint: "Read the door jamb sticker before ordering brake parts — look for \"67J\" in the option codes list. The truck's trim badge alone is not enough.",
    sourceCitationKey: "brake-deep-67j-payload-package",
  },

  // ── 6. Calipers — front sliding 2-piston ────────────────────────────
  {
    id: "brake-deep-front-calipers-sliding",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Front calipers — 2-piston sliding (most trims), 4-piston fixed (Raptor)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: ["brake_hose_or_line_concern"],
    partTags: ["caliper_area", "brake_hose"],
    symptomTags: ["pull", "vibration"],
    aliases: [
      "front caliper", "sliding caliper", "2 piston caliper",
      "Raptor 4 piston caliper", "F-150 front caliper",
    ],
    excerpt:
      "Most 12th-gen F-150 front calipers are 2-piston sliding (floating) units — the bracket bolts to the steering knuckle and the caliper itself slides on two greased pins. Raptor uses a 4-piston fixed caliper (heavier, more even pad wear, more expensive to replace). Sliding caliper rebuild kit (seals + pins): Raybestos H17052 or Motorcraft brake hardware kit — $15-40. Re-manufactured calipers: Cardone reman ($50-100/side from RockAuto), Power Stop loaded calipers ($80-150/side including new pads). When buying reman, return the core promptly for the refund — typical core charge is $40-80 per caliper.",
    inspectionHint: "Wiggle the caliper by hand with the wheel off — sliding caliper should glide on the pins. If it binds, the slide pins are seized or the rubber boots are torn and contaminated.",
    safetyNote: "Never reuse caliper banjo bolt copper washers — they crush-seal once. Always use fresh copper crush washers when reconnecting a brake hose.",
    sourceCitationKey: "brake-deep-front-calipers-sliding",
  },

  // ── 7. Caliper torque specs ─────────────────────────────────────────
  {
    id: "brake-deep-caliper-torque-specs",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Caliper torque specs — bracket 166 lb-ft, slide pins 24 lb-ft with anti-seize",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: [],
    aliases: [
      "caliper torque", "166 lb-ft", "slide pin torque",
      "caliper bracket torque", "brake torque specs F-150",
    ],
    excerpt:
      "Critical brake torque values for the 12th-gen F-150. Caliper bracket-to-knuckle bolts (front): 166 lb-ft (225 Nm) — these are large 21mm bolts and require a long-handle torque wrench. Caliper slide pins (the two bolts holding the caliper body to the bracket): 24 lb-ft (32 Nm) — apply high-temp anti-seize to the threads to prevent seizure at the next service. Rear caliper bracket-to-axle bolts: 80 lb-ft (108 Nm). Lug nuts: 150 lb-ft (203 Nm) in a star pattern, re-torque at 100 miles after any wheel-off service. Brake hose banjo bolt: 30 lb-ft (40 Nm). Over-torquing slide pins strips the bracket threads (aluminum on the upgraded HD bracket) — use a beam-type torque wrench for the lower values, click-type for 166 lb-ft.",
    inspectionHint: "Mark the lug nuts with a paint pen after torquing — if a mark moves, the wheel was not retorqued properly and is loose.",
    safetyNote: "Lug nuts not torqued properly are the #1 cause of pulsation under braking — they warp rotors via uneven clamping force. Always use a torque wrench, never an impact gun.",
    sourceCitationKey: "brake-deep-caliper-torque-specs",
  },

  // ── 8. Seized slide pin failure ─────────────────────────────────────
  {
    id: "brake-deep-seized-slide-pin",
    sourceType: "known_issue",
    sourceLabel: "Brake System Deep Reference",
    title: "Seized caliper slide pin — uneven pad wear, vibration, pull",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: ["brake_hose_or_line_concern"],
    partTags: ["caliper_area"],
    symptomTags: ["pull", "vibration", "squeal"],
    aliases: [
      "seized slide pin", "stuck caliper pin", "frozen caliper",
      "uneven pad wear", "brake pull seized caliper",
    ],
    excerpt:
      "The #1 failure mode on the F-150 sliding caliper is a seized slide pin. The rubber boot tears, water enters, the pin corrodes inside the bracket bore, and the caliper stops floating freely. Symptoms: one inner or outer pad worn dramatically more than its mate (often 50%+ thinner on one side), pulling to one side under braking, vibration that mimics a warped rotor. Diagnosis: with the wheel off, pull each slide pin and verify it slides freely in the bore — a healthy pin glides; a seized pin requires force or won't move at all. Cleaning: wire-brush the pin, clean the bore with brake cleaner + bore brush, apply Permatex Ultra Disc Brake Caliper Lube (purple grease — NEVER use regular wheel bearing grease or it will swell the rubber boots). New boots and pins: Carlson H5066 hardware kit ($15-25) — much cheaper than a new caliper if the bracket itself is undamaged.",
    inspectionHint: "Compare the inner and outer pad thickness — if one is significantly thinner than the other on the same wheel, the slide pin is seized, not the pad.",
    sourceCitationKey: "brake-deep-seized-slide-pin",
  },

  // ── 9. Brake pads — OEM Motorcraft ──────────────────────────────────
  {
    id: "brake-deep-pads-motorcraft-oem",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Brake pads — Motorcraft BRF-1414 front, BRF-1416 rear (OEM ceramic)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: ["squeal", "vibration"],
    aliases: [
      "BRF-1414", "BRF-1416", "Motorcraft brake pads", "OEM brake pads F-150",
      "Motorcraft ceramic pads",
    ],
    excerpt:
      "OEM Motorcraft brake pads for the 12th-gen F-150: BRF-1414 front (most trims), BRF-1416 rear. Set price $30-50 typical. These are ceramic-based compound with moderate dust and quiet operation — Ford's stock calibration is biased toward refinement over outright stopping power. For 13.8\" HD rotors (King Ranch/Platinum/Limited/67J), the front pad part number is BRF-1602 (slightly larger). Pads come with anti-rattle clips already installed; reuse the bracket-mounted shims if they are intact and not corroded. Bedding-in procedure: 10 moderate stops from 40 mph to 10 mph, then 3 firm stops from 60 mph to 20 mph, allowing 30 seconds between firm stops to cool. Skipping bedding causes uneven pad transfer and noisy braking for the life of the pad.",
    inspectionHint: "Pad backing plate thickness is ~10mm new — replace when friction material is below 3mm. The wear indicator (small metal tab) contacts the rotor before pads fully wear out and squeals continuously.",
    sourceCitationKey: "brake-deep-pads-motorcraft-oem",
  },

  // ── 10. Brake pads — Wagner ThermoQuiet ─────────────────────────────
  {
    id: "brake-deep-pads-wagner-thermoquiet",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Brake pads — Wagner ThermoQuiet QC1414 (popular daily-driver alternative)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: ["squeal"],
    aliases: [
      "Wagner ThermoQuiet", "QC1414", "Wagner brake pads",
      "ceramic brake pads F-150", "Wagner OEX1414",
    ],
    excerpt:
      "Wagner ThermoQuiet QC1414 (front) and QC1416 (rear) are the most popular aftermarket pad for the 12th-gen F-150. Price $25-40/set — usually cheaper than Motorcraft with similar refinement. Wagner OEX1414 is the newer OEM-Experience line: quieter than QC1414, slightly less dust, slightly more expensive ($35-55). Both use a one-piece IMI (Integrally Molded Insulator) backing plate that reduces NVH. Wagner pads are widely available at US chain stores (AutoZone, Advance Auto, O'Reilly) and at Korean parts importers including 한국타이어 outlets and certain Coupang sellers. Avoid the Wagner SX1414 \"Severe Duty\" line for daily driving — it's calibrated for fleet vehicles and dusts heavily on a passenger truck.",
    inspectionHint: "Genuine Wagner pads ship in a yellow-and-black box with a printed lot number — counterfeit Wagner pads exist on AliExpress with off-color packaging and rougher edge molding.",
    sourceCitationKey: "brake-deep-pads-wagner-thermoquiet",
  },

  // ── 11. Brake pads — Akebono Ceramic ────────────────────────────────
  {
    id: "brake-deep-pads-akebono-ceramic",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Brake pads — Akebono Ceramic ACT1414 (premium, lowest dust)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: ["squeal"],
    aliases: [
      "Akebono ACT1414", "Akebono ProACT", "Akebono ceramic pads",
      "low dust brake pads F-150", "premium brake pads",
    ],
    excerpt:
      "Akebono ProACT ACT1414 (front) and ACT1416 (rear) are the premium ceramic option for the 12th-gen F-150. Price $40-60/set. Akebono is the OEM brake supplier to Lexus, Toyota, Acura, and several Ford trims — these pads deliver near-zero dust and the quietest pedal feel of any common option. Pad wear is comparable to OEM (~40,000-60,000 miles in mixed driving), rotor wear is actually LOWER than Motorcraft because the friction compound is softer. Best choice for a daily-driven F-150 that lives near pristine alloy wheels — black dust streaking is essentially eliminated. Mild trade-off: slightly less initial bite from cold compared to PowerStop or Hawk, but this is irrelevant for normal driving. Available on RockAuto, BrakePerformance, and at Korean parts importers under the JCT/Akebono naming.",
    inspectionHint: "Akebono pads ship pre-shimmed — do not remove the OEM-style shims, they reduce vibration. Apply ceramic brake grease to the pad backing plate edges where they contact the caliper bracket.",
    sourceCitationKey: "brake-deep-pads-akebono-ceramic",
  },

  // ── 12. Severe-duty / HD pads for towing ────────────────────────────
  {
    id: "brake-deep-pads-severe-duty",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Severe-duty brake pads — HD Motorcraft for tow trucks, Power Stop Z36",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: [],
    aliases: [
      "severe duty pads", "HD brake pads", "Power Stop Z36",
      "towing brake pads", "Motorcraft HD pads",
    ],
    excerpt:
      "For trucks that tow regularly or operate in heavy commercial use, upgrade to a severe-duty pad. Motorcraft HD-1414 is the heavy-duty fleet pad — same form factor as BRF-1414 but with a higher-temperature friction compound ($40-70/set). Power Stop Z36-1414 \"Truck & Tow\" carbon-fiber ceramic is the most popular aftermarket severe-duty pad ($45-70/set) — noticeable bite improvement under load, slightly more dust than ProACT but still acceptable. EBC YellowStuff or Hawk SuperDuty are also valid options. Avoid running severe-duty pads on an empty truck — they need heat to perform and can feel grabby cold. Towing trucks should also upgrade brake fluid to a higher-boiling-point spec (Motul RBF 600 or ATE Type 200) to prevent fluid boiling on long downhill stretches.",
    inspectionHint: "Severe-duty pads run hotter — inspect the rotor surface for blue tint (heat discoloration) after a tow season; mild bluing is normal, heavy bluing means the rotor is heat-cycled out and should be replaced.",
    sourceCitationKey: "brake-deep-pads-severe-duty",
  },

  // ── 13. Brake pads — avoid the cheapest ─────────────────────────────
  {
    id: "brake-deep-pads-avoid-cheapest",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Avoid the cheapest brake pads — squeal, premature wear, heavy dust",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: ["squeal", "vibration"],
    aliases: [
      "cheap brake pads", "avoid budget pads", "AliExpress brake pads",
      "Duralast budget pads", "no name brake pads",
    ],
    excerpt:
      "Brakes are the single worst category to cheap out on. Pads under $20/set on the F-150 — Duralast budget line, no-name AliExpress listings, eBay 'Premium Ceramic' generics, Detroit Axle pad kits — exhibit consistent problems: high-pitched squeal that survives several heat cycles (low-quality friction compound separating from backing plate), premature wear (often half the life of OEM), heavy dust that streaks alloy wheels, and inconsistent friction batch-to-batch which causes pedal feel variation. Counterfeit Akebono, Wagner, and PowerStop pads are documented on AliExpress and low-end Amazon sellers — packaging may look right but quality is not. Cost delta between a budget pad and Wagner/Motorcraft is often less than $20 — not worth the safety compromise on a 2.5-ton truck. The savings disappear immediately if you have to replace warped rotors caused by uneven cheap-pad wear.",
    safetyNote: "Friction compound separation on cheap pads can cause sudden loss of braking. There is no acceptable budget pad on a daily-driven F-150.",
    sourceCitationKey: "brake-deep-pads-avoid-cheapest",
  },

  // ── 14. Master cylinder + brake booster ─────────────────────────────
  {
    id: "brake-deep-master-cylinder-booster",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Master cylinder and vacuum-assist booster — Motorcraft 6L3Z-2140-A",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: ["brake_hose_or_line_concern"],
    partTags: ["caliper_area", "brake_line"],
    symptomTags: ["leak"],
    aliases: [
      "master cylinder", "brake booster", "6L3Z-2140-A",
      "vacuum booster", "soft brake pedal",
    ],
    excerpt:
      "The 12th-gen F-150 uses a conventional hydraulic master cylinder with vacuum-assist booster. Master cylinder OEM is Motorcraft (verify part number 6L3Z-2140-A by VIN — some trim variants use different bore sizes). The booster taps engine vacuum from the intake manifold via a hose with a check valve — a leaking check valve causes a hard pedal at the first stop after starting. Common failure modes: internal master cylinder seal wear causes the pedal to slowly sink to the floor under steady pressure (no external leak), brake fluid contamination accelerates this. The booster diaphragm tears and the truck loses power assist — pedal becomes very hard. Replace the booster check valve and grommet first ($15) before assuming the booster itself is bad. Bench-bleed any new master cylinder on a vise before installing — installing a dry master cylinder traps air that is nearly impossible to bleed out at the calipers.",
    inspectionHint: "Pump the brake pedal 5 times with the engine off, then hold the pedal and start the engine — the pedal should drop noticeably as vacuum reaches the booster. If it does not drop, the booster or check valve has failed.",
    safetyNote: "A master cylinder with internal failure feels normal cold but sinks the pedal during a panic stop — this is the most dangerous failure mode in the brake system.",
    sourceCitationKey: "brake-deep-master-cylinder-booster",
  },

  // ── 15. Brake fluid contamination ───────────────────────────────────
  {
    id: "brake-deep-fluid-contamination",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Brake fluid contamination — water absorption, soft pedal, 3-year flush",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: ["brake_hose_or_line_concern"],
    partTags: ["brake_line", "brake_hose", "caliper_area"],
    symptomTags: ["leak"],
    aliases: [
      "brake fluid flush", "DOT 4 LV", "moisture in brake fluid",
      "soft brake pedal fluid", "brake fluid change interval",
    ],
    excerpt:
      "Brake fluid is hygroscopic — it absorbs water from atmospheric humidity through the reservoir cap, brake hoses, and ABS module seals. Water lowers the fluid's boiling point dramatically: fresh DOT 4 LV boils at ~260°C, fluid with 3% water absorbed boils at ~155°C. Boiling fluid creates vapor pockets in the calipers — pedal goes to the floor under heavy braking (the most dangerous brake failure mode). Symptoms of contaminated fluid: soft/spongy pedal that worsens over time, darker fluid color in the reservoir (fresh fluid is amber/clear, contaminated fluid is brown), early ABS activation. Recommendation: flush every 3 years regardless of mileage. Test with a brake fluid moisture meter ($10-20 on Amazon/Coupang) — readings above 2% water content mean flush now. Pressure bleeders or vacuum bleeders work much better than the old two-person pump-and-hold method.",
    inspectionHint: "Look at the brake fluid color through the translucent reservoir — if it is dark brown rather than light amber, the fluid is past service life regardless of age.",
    safetyNote: "Contaminated brake fluid that boils during a panic stop or long downhill will cause near-total loss of brakes. The 3-year service interval is not optional on a high-mileage truck.",
    sourceCitationKey: "brake-deep-fluid-contamination",
  },

  // ── 16. Brake lines and rubber hoses ────────────────────────────────
  {
    id: "brake-deep-lines-and-hoses",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Brake lines — steel hard lines and rubber hoses, 5-7 year hose life",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: ["brake_hose_or_line_concern"],
    partTags: ["brake_line", "brake_hose"],
    symptomTags: ["leak", "pull"],
    aliases: [
      "brake hose", "brake line", "rubber brake hose",
      "stainless brake line", "soft pedal hose",
    ],
    excerpt:
      "The 12th-gen F-150 uses steel hard lines from the master cylinder to the rear axle and a proportioning/distribution block under the cab, with rubber flexible hoses connecting hard lines to the calipers. Rubber hoses are the wear item — typical life is 5-7 years before the inner liner cracks or the outer cover begins to bulge. Symptoms of a failing hose: spongy pedal that does not improve after bleeding (hose balloons under pressure instead of transmitting force), one wheel that brakes harder or not at all (internal flap valve in the hose collapsed). Replacement: standard rubber hoses run $20-40 each; full set (4 hoses) ~$80-120. Stainless-braided lines (Goodridge, Russell) cost $120-180 for a full set and resist swelling, giving firmer pedal feel — popular upgrade for towing or off-road. Always replace hoses in axle pairs (both fronts or both rears) and flush/bleed the system afterward.",
    inspectionHint: "Bend the brake hose at full steering lock — cracks on the surface that open up under flex mean the hose is past service life even if it has not leaked yet.",
    safetyNote: "A ruptured brake hose causes immediate loss of one or two wheels of braking. Inspect hoses at every brake service.",
    sourceCitationKey: "brake-deep-lines-and-hoses",
  },

  // ── 17. ABS Module — Bosch 8.0 / 9.0 ────────────────────────────────
  {
    id: "brake-deep-abs-module-bosch",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "ABS module — Bosch 8.0 (2009-2010) and 9.0 (2011-2014)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes", "electrical"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: [],
    aliases: [
      "ABS module", "Bosch ABS 8.0", "Bosch ABS 9.0",
      "HCU hydraulic control unit", "ABS pump motor",
    ],
    excerpt:
      "Two ABS module generations on the 12th-gen F-150: Bosch ABS 8.0 (2009-2010) and Bosch ABS 9.0 (2011-2014). The module is mounted to the ABS Hydraulic Control Unit (HCU) under the driver-side dash area on most trims, accessible after removing a knee bolster panel. The HCU contains the solenoids and pump motor that modulate caliper pressure. Common DTCs: C1226, C1233, C1234 (wheel speed sensor faults — usually a sensor or tone ring issue, not the module itself). Module-level failures: internal solenoid sticks, pump motor seizes, internal corrosion from brake fluid that wicked up through cracked hoses. Reman modules from Module Master or Cardone ($150-300) plus VIN programming required. Diagnosis with FORScan reads live wheel speed data from all four sensors — a single sensor consistently reading 0 mph while the others move means a sensor or wiring fault, not the module.",
    inspectionHint: "Use FORScan ABS live data — drive at 15 mph and watch all four wheel speed values. A sensor reading 0 or jumping erratically points to that wheel's sensor, not the module.",
    sourceCitationKey: "brake-deep-abs-module-bosch",
  },

  // ── 18. AdvanceTrac stability/traction control ──────────────────────
  {
    id: "brake-deep-advancetrac-stability",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "AdvanceTrac stability/traction control — yaw sensor, steering angle sensor",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes", "electrical"],
    issueAreaIds: [],
    partTags: ["caliper_area", "connector"],
    symptomTags: [],
    aliases: [
      "AdvanceTrac", "stability control", "traction control",
      "yaw sensor", "steering angle sensor", "C1953 yaw",
    ],
    excerpt:
      "AdvanceTrac (Ford's electronic stability/traction control) is integrated with the ABS module and shares the same wheel speed sensors. Additional inputs: the yaw rate sensor (mounted under the driver's seat on most 12th-gen F-150s — verify by year), the steering angle sensor (part of the clockspring assembly in the steering column), and the brake pedal position sensor. Common DTCs: C0035, C0040, C0045 (wheel speed sensor faults shared with ABS), C1953 (yaw rate sensor circuit fault). Service note: replacing the steering clockspring or disconnecting the battery may require a steering angle sensor relearn via FORScan or a dealer scan tool. The yaw rate sensor itself rarely fails — most C1953 codes turn out to be a loose connector or a damaged harness under the seat. Always check the connector seating before condemning the sensor.",
    inspectionHint: "If the AdvanceTrac warning light comes on after seat removal or interior work, check the yaw sensor connector under the driver's seat — it is easy to bump loose during seat removal.",
    sourceCitationKey: "brake-deep-advancetrac-stability",
  },

  // ── 19. Electronic Parking Brake (EPB) ──────────────────────────────
  {
    id: "brake-deep-electronic-parking-brake",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Electronic Parking Brake (EPB) — Limited 2013-2014, FORScan required for service",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes", "electrical"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: [],
    aliases: [
      "EPB", "electronic parking brake", "Limited EPB", "EPB actuator",
      "TSB 13-4-8", "parking brake button",
    ],
    excerpt:
      "Limited trim (2013-2014) and some Platinum trucks replaced the traditional foot-pedal parking brake with an Electronic Parking Brake (EPB) — electric actuators integrated into the rear calipers. Activation: shift into Park, press the EPB button on the center stack, key off. Deactivation: foot on brake, press EPB button. Service requires special procedure — to replace rear pads you MUST put the EPB into service mode via FORScan or a dealer scan tool, otherwise you cannot retract the caliper piston and you can damage the actuator by trying to compress it mechanically. Ford TSB 13-4-8 addresses an early EPB activation issue (intermittent failure to set on cold mornings). EPB actuator replacement cost: $200-400 per side including parts and labor. Always reseat the EPB into service mode before any rear brake service on these trims.",
    inspectionHint: "Listen for the EPB motors cycling when the button is pressed — a healthy EPB makes a short, even motor sound; a failing actuator stutters or makes no sound on the affected side.",
    safetyNote: "Never attempt to mechanically compress an EPB caliper piston — you will damage the actuator gears. Always use FORScan service mode.",
    sourceCitationKey: "brake-deep-electronic-parking-brake",
  },

  // ── 20. Hill Descent Control ────────────────────────────────────────
  {
    id: "brake-deep-hill-descent-control",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Hill Descent Control (HDC) — FX4 std, Raptor std, ABS-managed 3 mph",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes", "drivetrain_4wd"],
    issueAreaIds: [],
    partTags: ["caliper_area"],
    symptomTags: [],
    aliases: [
      "Hill Descent Control", "HDC", "FX4 HDC", "Raptor HDC",
      "downhill assist",
    ],
    excerpt:
      "Hill Descent Control (HDC) is standard on FX4 and Raptor trims. It uses the ABS module to pulse all four calipers and maintain ~3 mph downhill without driver brake input — useful on steep off-road grades. Activation requirements: 4WD low engaged, vehicle speed below 25 mph, HDC button pressed (dash-mounted). The driver can override with throttle (speeds up) or brake (slows further). The system disengages above 25 mph or when 4WD low is exited. Diagnosis: HDC faults usually trace back to ABS or wheel speed sensor codes that disable the function. FORScan reads HDC live status under the ABS module. Common owner confusion: HDC will not engage in 4WD high — it requires 4WD low specifically. The Hill Descent Control button on a Raptor sits on the off-road controls panel above the rearview mirror, not on the dash like FX4.",
    inspectionHint: "Verify 4WD low is fully engaged (transfer case indicator lit, not blinking) before troubleshooting HDC — most reports of \"HDC not working\" are actually transfer case engagement issues.",
    sourceCitationKey: "brake-deep-hill-descent-control",
  },

  // ── 21. Wheel speed sensors ─────────────────────────────────────────
  {
    id: "brake-deep-wheel-speed-sensors",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Wheel speed sensors — 4 sensors, rear corrosion is the #1 failure",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes", "electrical"],
    issueAreaIds: [],
    partTags: ["caliper_area", "connector"],
    symptomTags: ["corrosion"],
    aliases: [
      "wheel speed sensor", "ABS sensor", "tone ring",
      "C1226 wheel speed", "ABS sensor corrosion",
    ],
    excerpt:
      "The 12th-gen F-150 uses four wheel speed sensors — one per wheel — paired with a magnetic tone ring integrated into the hub assembly. The sensor is a Hall-effect type that reads the alternating pattern of the tone ring as the wheel turns. Most common failure: corrosion on the sensor body or connector, especially on the rear wheels where road salt (염화칼슘 in Korea winter road treatment) accumulates. Symptoms: ABS warning light, traction control disabled (AdvanceTrac off), speedometer may drop to 0 if a front sensor fails. DTCs: C1226 (LF), C1227 (RF), C1233 (LR), C1234 (RR). Replacement cost: $20-40 for the sensor (Motorcraft BRAB-50 or Dorman 695-499) plus about 1 hour of labor. Easy DIY — usually one 8mm or 10mm bolt holds the sensor in place. Clean the sensor mounting hole with a wire brush before installing the new sensor.",
    inspectionHint: "Pull each sensor connector and inspect for green corrosion on the pins — even mild corrosion increases sensor resistance enough to throw an intermittent code in cold/wet weather.",
    sourceCitationKey: "brake-deep-wheel-speed-sensors",
  },

  // ── 22. Brake fluid spec (DOT 4 LV) ─────────────────────────────────
  {
    id: "brake-deep-brake-fluid-spec",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Brake fluid spec — DOT 4 LV preferred, DOT 3 acceptable, ~1 quart capacity",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: ["brake_hose_or_line_concern"],
    partTags: ["brake_line", "caliper_area"],
    symptomTags: [],
    aliases: [
      "DOT 4 LV", "brake fluid type", "Motorcraft brake fluid",
      "DOT 3 vs DOT 4", "brake fluid capacity F-150",
    ],
    excerpt:
      "Brake fluid spec for the 12th-gen F-150: DOT 4 LV (Low Viscosity) is the preferred fluid — Motorcraft PM-20 or equivalent. DOT 3 is acceptable as a fallback but has a lower wet boiling point and shorter service life. DOT 5.1 (different chemistry, not the same as DOT 5) is also compatible and offers a higher boiling point. NEVER use DOT 5 (silicone) — it is not compatible with DOT 3/4 systems and will damage seals. System capacity is approximately 1 quart (~0.95L) for a full flush. The reservoir holds about half that; topping off uses much less. For trucks with traction control / ABS, use a pressure or vacuum bleeder — the gravity bleed method will not properly purge air from the HCU internal passages. Korean availability: Motorcraft DOT 4 LV via FordPartsKorea or 록오토 forwarding; generic DOT 4 from Bosch or ATE is widely available at 한국타이어 outlets and on Coupang.",
    inspectionHint: "Check the brake fluid reservoir cap diagram — the F-150 cap is labeled DOT 4 / DOT 3 — confirm before topping off with an unfamiliar brand.",
    safetyNote: "Mixing DOT 5 silicone fluid into a DOT 3/4 system causes seal swelling and permanent damage to the master cylinder and calipers.",
    sourceCitationKey: "brake-deep-brake-fluid-spec",
  },

  // ── 23. Diagnostic flow — pedal feel ────────────────────────────────
  {
    id: "brake-deep-diagnostic-pedal-feel",
    sourceType: "inspection_hint",
    sourceLabel: "Brake System Deep Reference",
    title: "Brake diagnostic flow — pedal feel (hard / soft / spongy / pulsation)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: ["brake_hose_or_line_concern"],
    partTags: ["caliper_area", "brake_hose", "brake_line"],
    symptomTags: ["vibration", "leak", "pull"],
    aliases: [
      "brake diagnostic", "pedal feel diagnosis", "hard pedal soft pedal",
      "spongy brake pedal", "pulsation under braking",
    ],
    excerpt:
      "Systematic diagnostic flow by symptom. HARD PEDAL (very high effort, little stopping power): vacuum booster diaphragm torn, booster check valve failed, intake vacuum source disconnected — start with the booster vacuum line and check valve. SOFT PEDAL that slowly sinks to the floor: master cylinder internal seal failure (no external leak) or a slow fluid leak somewhere in the system — inspect reservoir level and all calipers/hoses. SPONGY PEDAL (springy feel, returns up but feels wrong): air in the lines from old fluid or a recent service — bleed all four corners using FORScan ABS bleed procedure to purge the HCU. PULSATION UNDER BRAKING (pedal kicks back rhythmically): warped rotors — usually caused by over-torqued lug nuts (the #1 root cause) or by parking with very hot rotors after heavy use. Re-measure rotor thickness variation with a micrometer at multiple points around the rotor. PULLS TO ONE SIDE: seized caliper slide pin or collapsed brake hose on the opposite side — diagnose by feeling rotor temperature at each wheel after a stop.",
    inspectionHint: "Always test pedal feel both engine-off (booster reserve depleted, should be very hard) and engine-running (should be firm but assisted) — the difference reveals whether the booster is working.",
    sourceCitationKey: "brake-deep-diagnostic-pedal-feel",
  },

  // ── 24. Diagnostic flow — noise & vibration ─────────────────────────
  {
    id: "brake-deep-diagnostic-noise-vibration",
    sourceType: "inspection_hint",
    sourceLabel: "Brake System Deep Reference",
    title: "Brake diagnostic flow — squeal, grinding, and vibration that mimics brakes",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes", "suspension_steering"],
    issueAreaIds: ["front_suspension_joint_play"],
    partTags: ["caliper_area", "ball_joint", "tie_rod_end"],
    symptomTags: ["squeal", "vibration", "clunk"],
    aliases: [
      "brake squeal", "brake grinding", "brake vibration",
      "ball joint vs brake vibration", "wear indicator squeal",
    ],
    excerpt:
      "Brake-related noise diagnosis. SQUEALING (constant or near-constant high-pitched noise that goes away when brakes applied): pad wear indicator (small metal tab) contacting the rotor — pads need replacement, measure thickness. SQUEAL only when brakes applied: glazed pads or rotor (heat-cycled hard surface) — sometimes resolved by bedding-in, often needs replacement. GRINDING (metal-on-metal sound when brakes applied): pads worn to the backing plate and gouging the rotor — STOP DRIVING and replace pads + likely rotors immediately. Every additional stop deepens the rotor scoring. VIBRATION DIAGNOSIS — critical distinction: vibration ONLY under braking = warped rotors. Vibration that exists over bumps even without braking = worn ball joint, tie rod end, or wheel bearing — NOT a brake problem. Owners frequently misdiagnose suspension wear as brake pulsation. Test by driving on smooth road without braking: if you feel the vibration through the steering wheel even cruising, look at suspension before condemning rotors.",
    inspectionHint: "Separate the vibration source by driving on a smooth road both with and without light brake pressure — vibration that appears only with braking is rotor; vibration that exists either way is suspension.",
    safetyNote: "Continued driving with pads worn to the backing plate will score the rotor beyond service limit and may eventually cause the caliper piston to extend past its bore and lose hydraulic seal.",
    sourceCitationKey: "brake-deep-diagnostic-noise-vibration",
  },

  // ── 25. Korea-specific considerations ───────────────────────────────
  {
    id: "brake-deep-korea-considerations",
    sourceType: "repair_note",
    sourceLabel: "Brake System Deep Reference",
    title: "Korea-specific brake service — local parts availability, shop labor, fluid testing",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["brakes"],
    issueAreaIds: [],
    partTags: ["caliper_area", "brake_hose", "brake_line"],
    symptomTags: [],
    aliases: [
      "Korea brake parts", "Korean mechanic brake", "한국타이어 브레이크",
      "정비소 brake fluid", "Korea brake service",
    ],
    excerpt:
      "Brake service considerations for a Korea-based F-150. PARTS AVAILABILITY: 한국타이어 (Hankook Tire) chain stores and similar parts importers carry Wagner ThermoQuiet and Akebono pads in BR-1414/BRF-1414 sizing — typically in stock within 2-3 days even when not on the shelf. Rotors are usually special-order. Motorcraft OEM parts are imported via FordPartsKorea or by 배대지 forwarding from RockAuto. SHOP LABOR: typical Korean 정비소 labor for a brake job runs ₩100,000-200,000 per axle (~$75-150 USD) — generally cheaper than US labor but the labor rate varies widely between centers. BRAKE FLUID: Korean DOT 4 brake fluid (Bosch, ATE, and domestic brands) meets spec and is fine to use; verify the LV (Low Viscosity) designation for trucks with ABS for best ABS function. CRITICAL: many 정비소 do NOT test fluid moisture content before topping off — bring your own moisture meter ($10-20) or insist they flush rather than top off. Water-contaminated fluid in a high-mileage truck will boil under brake load.",
    inspectionHint: "Ask the Korean shop to test the moisture content of the brake fluid with a meter before any brake service — if they don't have one, supply one or insist on a full flush rather than a top-off.",
    safetyNote: "Topping off contaminated brake fluid with fresh fluid does NOT restore boiling point — water stays in the system. Insist on a complete flush at the 3-year mark or whenever moisture content tests above 2%.",
    sourceCitationKey: "brake-deep-korea-considerations",
  },
];
