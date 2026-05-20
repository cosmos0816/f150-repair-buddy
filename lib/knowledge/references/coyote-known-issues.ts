import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const COYOTE_KNOWN_ISSUE_REFERENCES: TruckReferenceRecord[] = [
  // ── 1. Timing chain rattle on cold start ────────────────────────────
  {
    id: "known-issue-coyote-timing-chain-rattle",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 5.0 Coyote",
    title: "Timing chain rattle on cold start (less severe than EcoBoost)",
    vehicleScope: "2011-2014-ford-f150-5.0-coyote",
    systemTags: ["timing_valvetrain", "engine_mechanical"],
    issueAreaIds: ["cam_phaser_tick_context"],
    partTags: ["cam_phaser_area", "timing_cover", "vct_solenoid"],
    symptomTags: ["rattle", "ticking"],
    aliases: [
      "coyote timing chain rattle",
      "5.0 cold start rattle",
      "coyote chain noise",
      "coyote VCT rattle",
      "Ti-VCT rattle",
    ],
    excerpt:
      "The 5.0L Coyote uses a dual-overhead-cam Ti-VCT (Twin Independent Variable Cam Timing) system with four timing chains. A cold-start rattle lasting 1-3 seconds is documented, caused by oil draining from the chain tensioners overnight. Less severe and less common than the EcoBoost timing chain stretch issue, but still present — especially on trucks with extended oil change intervals or high mileage above 150K miles. The rattle usually resolves once oil pressure builds. Persistent rattle after warm-up warrants further diagnosis of the VCT phasers.",
    inspectionHint:
      "Listen for a metallic rattle in the first 2-3 seconds of cold start. If the rattle persists beyond warm-up or is accompanied by P0011/P0012/P0021/P0022 codes, the VCT phasers or chain tensioners may need replacement.",
    sourceCitationKey: "known-issue-coyote-timing-chain-rattle",
  },

  // ── 2. Oil consumption (2011-2012 models) ───────────────────────────
  {
    id: "known-issue-coyote-oil-consumption",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 5.0 Coyote",
    title: "Oil consumption on 2011-2012 models (1 qt per 3,000 mi)",
    vehicleScope: "2011-2014-ford-f150-5.0-coyote",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: ["spark_plug"],
    symptomTags: ["oil_consumption", "blue_smoke"],
    aliases: [
      "coyote oil consumption",
      "5.0 burns oil",
      "5.0 oil usage",
      "coyote low oil",
      "2011 5.0 oil consumption",
      "2012 5.0 oil consumption",
    ],
    excerpt:
      "Some 2011-2012 5.0L Coyote engines consume up to 1 quart of oil per 3,000 miles. Ford considers up to 1 qt per 3,000 mi 'within spec,' but it concerns owners coming from older pushrod V8s that never consumed oil. The issue is attributed to piston ring design in the early production run — 2013+ models saw improvements. A puff of blue smoke on start-up or during deceleration may be visible. No definitive fix short of a ring replacement, which is rarely cost-effective. Monitor oil level between changes and top off as needed.",
    inspectionHint:
      "Check oil level every 1,000 miles to establish a consumption baseline. Look for blue smoke on start-up or hard deceleration. Fouled spark plugs with oily deposits indicate oil passing the rings.",
    sourceCitationKey: "known-issue-coyote-oil-consumption",
  },

  // ── 3. Valve cover gasket leaks ─────────────────────────────────────
  {
    id: "known-issue-coyote-valve-cover-gasket",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 5.0 Coyote",
    title: "Valve cover gasket leaks (rear cover especially)",
    vehicleScope: "2011-2014-ford-f150-5.0-coyote",
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: ["cam_phaser_area"],
    symptomTags: ["leak"],
    aliases: [
      "coyote valve cover leak",
      "5.0 valve cover gasket",
      "rear valve cover leak",
      "oil leak top of engine",
      "coyote oil seep valve cover",
    ],
    excerpt:
      "The rear (passenger-side) valve cover gasket on the 5.0L Coyote is prone to leaking after 60K-100K miles due to heat exposure from the firewall proximity. Oil seeps down the back of the block and can drip onto the exhaust crossover, causing a burning oil smell. The DOHC head design means the valve covers are wider and have more sealing surface area than pushrod engines, creating more opportunity for gasket failure. Replacement requires removing the coils and intake manifold components for access, especially on the rear cover.",
    inspectionHint:
      "Clean the valve cover mating surfaces and check after 500 miles. Use a mirror or borescope to inspect the rear cover — the firewall-side seam is nearly invisible from above. A burning oil smell with no visible drip usually points here.",
    sourceCitationKey: "known-issue-coyote-valve-cover-gasket",
  },

  // ── 4. Exhaust manifold bolt/stud breakage ──────────────────────────
  {
    id: "known-issue-coyote-exhaust-manifold-bolt",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 5.0 Coyote",
    title: "Exhaust manifold bolt/stud breakage (similar to 5.4L, less common)",
    vehicleScope: "2011-2014-ford-f150-5.0-coyote",
    systemTags: ["exhaust_emissions", "engine_mechanical"],
    issueAreaIds: ["exhaust_manifold_tick"],
    partTags: ["exhaust_manifold"],
    symptomTags: ["ticking", "exhaust_tick"],
    aliases: [
      "coyote exhaust manifold bolt",
      "5.0 broken exhaust stud",
      "exhaust tick 5.0",
      "manifold bolt breakage coyote",
      "exhaust leak coyote",
    ],
    excerpt:
      "The exhaust manifold bolts on the 5.0L Coyote can break or back out due to repeated thermal cycling, similar to the well-known 5.4L issue but occurring less frequently. Presents as a ticking or tapping noise on cold start that diminishes as the manifold expands and temporarily re-seats. More common on the driver-side manifold. Broken studs must be drilled and extracted or repaired with a helicoil. If left unaddressed, the exhaust leak worsens and can cause an exhaust smell in the cabin through the HVAC.",
    inspectionHint:
      "Listen for a rhythmic tick at cold start near the exhaust manifolds. Visually inspect for soot staining at the manifold-to-head flanges — black streaks indicate a leak. Confirm with a smoke test if necessary.",
    safetyNote:
      "Exhaust leaks before the catalytic converter can introduce carbon monoxide into the cabin. Repair promptly.",
    sourceCitationKey: "known-issue-coyote-exhaust-manifold-bolt",
  },

  // ── 5. Throttle body sticking / surging idle ────────────────────────
  {
    id: "known-issue-coyote-throttle-body-sticking",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 5.0 Coyote",
    title: "Throttle body sticking and surging idle",
    vehicleScope: "2011-2014-ford-f150-5.0-coyote",
    systemTags: ["fuel_air_metering", "intake_vacuum"],
    issueAreaIds: ["intake_vacuum_air_leak"],
    partTags: ["throttle_body"],
    symptomTags: ["rough_idle"],
    aliases: [
      "coyote throttle body sticking",
      "5.0 surging idle",
      "coyote idle surge",
      "throttle body carbon 5.0",
      "hunting idle coyote",
      "idle fluctuation 5.0",
    ],
    excerpt:
      "The electronic throttle body on the 5.0L Coyote accumulates carbon deposits on the bore and blade, causing the throttle plate to stick slightly and the idle to surge or hunt between 500-1000 RPM. The issue is noticeable after 40K-60K miles and worsens progressively. The PCV system routes oil vapor past the throttle body, accelerating buildup. Cleaning with an approved throttle body cleaner and resetting the idle adaptation with a scan tool resolves the issue. Recommended cleaning interval is every 30K-50K miles.",
    inspectionHint:
      "Remove the intake boot and inspect the throttle body bore for black, oily deposits. Clean with throttle body cleaner and a soft cloth — do not scrape. Perform an idle relearn procedure after cleaning.",
    sourceCitationKey: "known-issue-coyote-throttle-body-sticking",
  },

  // ── 6. Water pump weep (external) ───────────────────────────────────
  {
    id: "known-issue-coyote-water-pump-weep",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 5.0 Coyote",
    title: "Water pump weep hole leak (external, easier than EcoBoost internal pump)",
    vehicleScope: "2011-2014-ford-f150-5.0-coyote",
    systemTags: ["cooling", "engine_mechanical"],
    issueAreaIds: ["coolant_leak_source"],
    partTags: ["coolant_reservoir"],
    symptomTags: ["leak", "coolant_smell"],
    aliases: [
      "coyote water pump leak",
      "5.0 water pump weep",
      "water pump weep hole",
      "coolant leak front of engine",
      "water pump failure coyote",
    ],
    excerpt:
      "The 5.0L Coyote uses a conventional external (belt-driven) water pump — unlike the EcoBoost's problematic internal pump. When the shaft seal wears, coolant weeps from the weep hole at the bottom of the pump body. Onset typically between 80K-120K miles. The advantage over the EcoBoost: coolant goes on the ground, not into the oil, and the pump is accessible without removing the timing cover. Replacement is a straightforward DIY job (2-3 hours) and a good opportunity to replace the thermostat and hoses at the same time.",
    inspectionHint:
      "Look for dried coolant residue (green, orange, or crystallized white) below the water pump weep hole. A slow weep may only be visible as a stain. Check the pump pulley for play — any wobble means the bearing is failing.",
    sourceCitationKey: "known-issue-coyote-water-pump-weep",
  },

  // ── 7. IWE grinding (4WD models) ────────────────────────────────────
  {
    id: "known-issue-coyote-iwe-grinding",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 5.0 Coyote",
    title: "IWE grinding noise on 4WD models (shared front end with 5.4L)",
    vehicleScope: "2011-2014-ford-f150-5.0-coyote",
    systemTags: ["drivetrain_4wd"],
    issueAreaIds: ["drivetrain_leak_or_boot"],
    partTags: ["iwe_solenoid_actuator", "transfer_case_area"],
    symptomTags: ["rattle", "clunk"],
    aliases: [
      "coyote IWE grinding",
      "5.0 IWE noise",
      "integrated wheel end",
      "hub grinding 4WD",
      "IWE vacuum leak",
      "front hub grinding F-150",
    ],
    excerpt:
      "The Integrated Wheel End (IWE) system on 4WD F-150s is shared across all engine options — the 5.0L Coyote trucks experience the same IWE grinding issue as 5.4L and EcoBoost trucks. The IWE uses vacuum to lock and unlock the front hubs. When the vacuum check valve fails, the solenoid sticks, or the diaphragm in the hub tears, the hub partially engages at highway speed, producing a grinding or growling noise that can mimic a wheel bearing. The fix involves replacing the IWE vacuum solenoid, check valve, vacuum lines, and/or the hub actuator assembly.",
    inspectionHint:
      "Test by switching from 2WD to 4WD while driving slowly — if the grinding stops in 4WD, the IWE is the culprit. Check vacuum at the hub actuator with the engine running. Less than 15 in-Hg indicates a leak in the vacuum system.",
    sourceCitationKey: "known-issue-coyote-iwe-grinding",
  },

  // ── 8. EVAP system leaks ────────────────────────────────────────────
  {
    id: "known-issue-coyote-evap-leak",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 5.0 Coyote",
    title: "EVAP system leaks (purge valve, canister)",
    vehicleScope: "2011-2014-ford-f150-5.0-coyote",
    systemTags: ["exhaust_emissions", "fuel_air_metering"],
    issueAreaIds: [],
    partTags: ["vacuum_line"],
    symptomTags: ["rough_idle"],
    aliases: [
      "coyote EVAP leak",
      "5.0 purge valve",
      "P0456 coyote",
      "P0442 coyote",
      "evap canister leak",
      "check engine EVAP",
      "small EVAP leak",
    ],
    excerpt:
      "The EVAP (Evaporative Emission Control) system on the 5.0L Coyote commonly develops small leaks that trigger P0442 (small leak) or P0456 (very small leak). The most common failure points are the purge valve (sticks open, causing a rough idle and fuel smell) and the EVAP canister vent valve. Cracked or deteriorated rubber hoses in the EVAP circuit are another frequent cause. Often triggered by a loose or worn gas cap — always check the cap seal first. The purge valve is located on the intake manifold and is a 15-minute DIY replacement.",
    inspectionHint:
      "Start with a gas cap inspection and tighten test. If the code returns, use a smoke machine connected to the EVAP service port to locate the leak. Check the purge valve by applying vacuum — it should hold vacuum when de-energized.",
    sourceCitationKey: "known-issue-coyote-evap-leak",
  },

  // ── 9. Power steering pump whine at cold temps ──────────────────────
  {
    id: "known-issue-coyote-power-steering-whine",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 5.0 Coyote",
    title: "Power steering pump whine at cold temperatures",
    vehicleScope: "2011-2014-ford-f150-5.0-coyote",
    systemTags: ["suspension_steering"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: ["squeal"],
    aliases: [
      "coyote power steering whine",
      "5.0 PS pump noise",
      "power steering cold whine",
      "steering whine cold start",
      "PS pump moan",
      "steering groan cold",
    ],
    excerpt:
      "The hydraulic power steering pump on 12th-gen F-150s (all engine options) produces a noticeable whine or moan during cold starts in winter temperatures. The noise is caused by thickened power steering fluid and air trapped in the system. It typically fades within 1-2 minutes as the fluid warms. Persistent whine after warm-up or whine during turns at any temperature indicates low fluid level, a failing pump, or air ingestion through a cracked reservoir or loose hose clamp. Ford TSB 10-12-2 addresses the cold-weather moan on some models.",
    inspectionHint:
      "Check PS fluid level with the engine off and at operating temperature. Look for bubbles or foam in the fluid — indicates air intrusion. Inspect the reservoir cap, all hose connections, and the rack seals for leaks.",
    sourceCitationKey: "known-issue-coyote-power-steering-whine",
  },

  // ── 10. Spark plug carbon tracking ──────────────────────────────────
  {
    id: "known-issue-coyote-spark-plug-carbon-tracking",
    sourceType: "known_issue",
    sourceLabel: "Known Issue — 5.0 Coyote",
    title: "Spark plug carbon tracking (coil boot melting causing misfire)",
    vehicleScope: "2011-2014-ford-f150-5.0-coyote",
    systemTags: ["ignition", "engine_mechanical"],
    issueAreaIds: ["ignition_misfire_path"],
    partTags: ["spark_plug", "coil"],
    symptomTags: ["misfire", "rough_idle"],
    aliases: [
      "coyote carbon tracking",
      "5.0 coil boot melting",
      "spark plug misfire coyote",
      "coil boot failure 5.0",
      "carbon tracking misfire",
      "P0301 coyote",
      "P0302 coyote",
      "P0303 coyote",
      "P0304 coyote",
    ],
    excerpt:
      "The coil-on-plug boots on the 5.0L Coyote can melt or degrade from heat exposure, creating a carbon track on the spark plug insulator that provides an alternative path for the spark energy. Instead of jumping the plug gap, the spark travels down the carbon track to ground, causing a misfire. Symptoms include a single-cylinder misfire code (P0301-P0308), rough idle, and a flashing check engine light under load. The issue accelerates if spark plugs are left in beyond the 100K-mile interval or if plug well seals are leaking oil. Replacement of both the coil boot and spark plug resolves the issue.",
    inspectionHint:
      "Pull each coil and inspect the boot for melting, cracking, or a visible carbon trail on the inner surface. Examine the spark plug insulator for black carbon tracks running from the electrode toward the hex. Replace coil and plug together on affected cylinders.",
    sourceCitationKey: "known-issue-coyote-spark-plug-carbon-tracking",
  },
];
