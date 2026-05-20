import { TRUCK_PART_ALIAS_GROUPS } from "@/lib/knowledge/truck/aliases";
import type {
  PartConditionDescriptor,
  PartFailureMode,
  PartServiceInterval,
  TruckPartDefinition,
  TruckPartId,
  TruckSystemId,
} from "@/lib/knowledge/types";
import type { TruckPartRecord, TruckVisibleTargetId } from "@/lib/knowledge/truck/types";

function partAliases(partId: keyof typeof TRUCK_PART_ALIAS_GROUPS, fallback: string[]) {
  return Array.from(new Set([...(TRUCK_PART_ALIAS_GROUPS[partId] ?? []), ...fallback]));
}

const TRUCK_PART_SEEDS: Record<TruckPartId, TruckPartDefinition> = {
  belt: {
    id: "belt",
    label: "Serpentine Belt",
    aliases: partAliases("belt", []),
    system: "accessory_drive",
    summary:
      "Single serpentine belt that wraps the alternator, A/C compressor, power steering pump, and water pump on the 5.4 Triton. On this engine the belt path is long, and a worn belt or misaligned pulley shows up as chirp or squeal that changes with RPM and accessory load.",
    inspectionHints: [
      "Check both belt edges for fraying or missing ribs.",
      "Look for black dust buildup on pulleys — a sign of belt material wearing away.",
      "Run a fingernail across the ribs: if the ribs feel slick or hard, the belt is glazed.",
      "Twist the belt 90 degrees — you should see three or more distinct ribs. Fewer means it is stretched.",
      "Check belt tracking at the tensioner and idler — the belt should sit centered on every pulley.",
    ],
    warningSigns: [
      "frayed edge or missing rib chunks",
      "glazed, shiny rib surface",
      "black belt dust accumulated on pulleys or splash shield",
      "belt walks or tracks off-center on any pulley",
      "chirp that changes pitch with RPM",
      "squeal at cold start or when turning the steering wheel",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["chirp", "squeal", "wobble"],
    inspectionTargets: ["front_accessory_drive_path"],
  },
  tensioner: {
    id: "tensioner",
    label: "Belt Tensioner",
    aliases: partAliases("tensioner", []),
    system: "accessory_drive",
    summary:
      "Spring-loaded automatic tensioner on the passenger side of the 5.4 Triton front drive. The tensioner arm should hold steady at its normal operating angle; chatter or bounce means the internal spring is weak and the belt will slip under load.",
    inspectionHints: [
      "View the tensioner arm angle from the side — it should sit within the cast-in wear marks.",
      "Watch the arm at idle: it should barely move. Visible bounce or chatter means a weak spring.",
      "Spin the pulley by hand with the belt off — it should spin freely with no grinding or roughness.",
      "Check for coolant or oil contamination on the tensioner arm pivot.",
      "Look for belt dust accumulation near the tensioner — indicates the belt is slipping here.",
    ],
    warningSigns: [
      "arm chatter or bounce visible at idle",
      "pulley wobble when spinning by hand",
      "belt drift concentrated at the tensioner pulley",
      "arm sitting outside the cast wear indicator marks",
      "grinding or rough feel when spinning the pulley by hand",
      "belt squeal that gets worse with A/C or steering load",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["chirp", "squeal", "wobble"],
    inspectionTargets: ["front_accessory_drive_path"],
  },
  idler_pulley: {
    id: "idler_pulley",
    label: "Idler Pulley",
    aliases: partAliases("idler_pulley", []),
    system: "accessory_drive",
    summary:
      "Free-spinning guide pulley in the 5.4 Triton serpentine belt path. The bearing inside wears over time and can produce a chirp or whine that is easy to mistake for alternator or tensioner noise. Replacement is a simple bolt-off, bolt-on job.",
    inspectionHints: [
      "Look at the pulley face head-on for tilt or wobble while the engine is running.",
      "With the belt off, spin the pulley by hand — listen for any grinding or roughness.",
      "Check for belt dust accumulation concentrated around this pulley.",
      "Look for any lateral play by pushing the pulley side-to-side.",
      "Compare alignment with the tensioner and alternator pulleys — they should sit in the same plane.",
    ],
    warningSigns: [
      "tilted pulley face visible with the engine running",
      "rough or gritty feel when spinning by hand",
      "bearing whine that increases with RPM",
      "lateral play when pushed side-to-side",
      "belt dust concentrated near the idler",
      "chirp that does not change when A/C or steering is loaded",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["chirp", "squeal", "wobble"],
    inspectionTargets: ["front_accessory_drive_path"],
  },
  alternator_area: {
    id: "alternator_area",
    label: "Alternator Area",
    aliases: partAliases("alternator_area", ["alternator bracket", "charging area"]),
    system: "charging",
    summary:
      "Alternator case, mount, and overrunning pulley on the passenger-side front of the 5.4 Triton. The alternator is belt-driven; a failing bearing or loose mount creates chirp or wobble that gets blamed on the belt. A weak alternator also slowly kills the battery.",
    inspectionHints: [
      "Compare the alternator pulley alignment with the rest of the belt path — misalignment causes belt wear.",
      "Check the case and mount bolts for movement or looseness.",
      "Look for contact marks or rub spots on the case from a drifting belt.",
      "Listen for a whine that increases with electrical load (headlights, blower motor).",
      "Check the charge wire and connector on the back of the alternator for corrosion or looseness.",
    ],
    warningSigns: [
      "pulley wobble visible at idle",
      "mount bolts loose or bracket cracked",
      "contact marks on the alternator case from belt tracking",
      "belt dust concentrated at the alternator pulley",
      "whine from the alternator that rises with electrical load",
      "battery warning light on the dash",
      "dim headlights at idle that brighten with RPM",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["wobble", "chirp", "dead_battery"],
    inspectionTargets: ["alternator_mount_and_case", "front_accessory_drive_path"],
  },
  front_accessory_drive: {
    id: "front_accessory_drive",
    label: "Front Accessory Drive",
    aliases: ["front accessory drive", "belt path", "front engine belt path"],
    system: "accessory_drive",
    summary:
      "The entire front belt-and-pulley path on the 5.4 Triton, including the serpentine belt, tensioner, idler, alternator, A/C compressor, power steering pump, and water pump pulleys. Always inspect the full path as a system before isolating a single component.",
    inspectionHints: [
      "Start with a wide view of the entire belt path before zooming in on any one pulley.",
      "Compare belt tracking across all pulleys — the belt should sit centered on each one.",
      "Listen at idle with A/C on and off to isolate load-dependent noises.",
      "Use a stethoscope or long screwdriver handle against each component to isolate bearing noise.",
      "Check for coolant or oil contamination on the belt surface — this causes immediate slipping.",
    ],
    warningSigns: [
      "multiple pulleys out of alignment with each other",
      "belt drift or tracking issues visible at more than one point",
      "noise that is strongest when listening across the full path rather than at one component",
      "belt squealing that changes with A/C compressor engagement",
      "visible belt flutter or vibration between pulleys",
      "coolant or oil film on the belt ribs",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["chirp", "squeal", "wobble", "ticking"],
    inspectionTargets: ["front_accessory_drive_path", "alternator_mount_and_case"],
  },
  battery: {
    id: "battery",
    label: "Battery",
    aliases: partAliases("battery", ["battery hold down"]),
    system: "battery_ground",
    summary:
      "Group 65 battery in the passenger-side engine bay of the 2010 F-150. The 5.4 Triton draws significant cranking amps, especially in cold weather. A weak battery combined with the high-draw fuel pump driver module and IWE solenoid can cause intermittent no-starts.",
    inspectionHints: [
      "Show the top of the battery — look for white or green powder buildup on the posts.",
      "Check the hold-down clamp and tray for looseness or corrosion.",
      "Look for a swollen or bulging case — indicates the battery has been overcharged or is heat-damaged.",
      "Check the battery date sticker — OEM batteries typically last 3-5 years in Texas/southern heat.",
      "Inspect the negative cable path from the terminal to the chassis ground point on the fender.",
    ],
    warningSigns: [
      "loose or missing hold-down clamp",
      "swollen or bulging battery case",
      "heavy white or green powder on terminals",
      "slow cranking that gets worse in cold weather",
      "battery date older than 4-5 years",
      "acid residue or wet spots on the battery tray",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["dead_battery", "corrosion"],
    inspectionTargets: ["battery_top_and_hold_down", "battery_terminal_and_ground"],
  },
  ground_point: {
    id: "ground_point",
    label: "Ground Point / Cable",
    aliases: partAliases("ground_point", ["battery ground", "chassis ground"]),
    system: "battery_ground",
    summary:
      "Chassis ground cable and ground-point bolt on the passenger-side fender and engine block. On the 5.4 Triton, a corroded ground path causes phantom electrical gremlins — rough idle, flickering gauges, and hard starts that mimic more expensive failures.",
    inspectionHints: [
      "Show the cable end and the fastener bolt together in the same frame.",
      "Look for green corrosion between the eyelet and the chassis mounting surface.",
      "Check that the eyelet bolt is tight — try to wiggle the cable by hand.",
      "Inspect the cable insulation for cracks, heat damage, or rodent chewing.",
      "Follow the ground cable from the battery negative terminal to the chassis bolt and the engine block bolt.",
    ],
    warningSigns: [
      "green or white corrosion buildup between the eyelet and chassis",
      "loose eyelet that moves when wiggled by hand",
      "heat-damaged or melted cable insulation",
      "flickering dash lights or gauge needle bouncing",
      "intermittent hard starts that are not battery or starter related",
      "rough idle that clears when you wiggle the ground cable",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["dead_battery", "corrosion", "rough_idle"],
    inspectionTargets: ["battery_terminal_and_ground"],
  },
  coolant_reservoir: {
    id: "coolant_reservoir",
    label: "Coolant Reservoir",
    aliases: partAliases("coolant_reservoir", []),
    system: "cooling",
    summary:
      "Pressurized degas bottle (coolant reservoir) on the passenger side of the 5.4 Triton engine bay. The plastic tank is pressurized and the seam can crack with age and heat cycles, creating a slow coolant weep that is easy to miss until the level drops noticeably.",
    inspectionHints: [
      "Show the molded seam line around the middle of the bottle — this is the most common crack location.",
      "Look for dried pink or orange coolant residue trailing downward from the seam.",
      "Check the hose necks where the small hoses connect — these can weep at the clamp.",
      "Inspect the cap and cap seat for cracks or a poor seal.",
      "Check the coolant level against the cold-fill and hot-fill marks on the side of the bottle.",
    ],
    warningSigns: [
      "wet or weeping seam on the degas bottle body",
      "dried pink or orange coolant residue below the bottle",
      "coolant level dropping below the cold-fill line over days or weeks",
      "sweet coolant smell in the engine bay after driving",
      "fresh seep at the hose necks or cap seat",
      "cracked or discolored plastic near the cap",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["leak", "coolant_smell"],
    inspectionTargets: ["coolant_reservoir_and_seam", "fluid_source_path"],
  },
  radiator_hose: {
    id: "radiator_hose",
    label: "Radiator Hose",
    aliases: partAliases("radiator_hose", []),
    system: "cooling",
    summary:
      "Upper and lower radiator hoses on the 5.4 Triton connect the engine to the radiator. The upper hose runs from the thermostat housing on the front of the engine to the radiator tank. Hoses degrade internally before they look bad externally — a soft, spongy hose can collapse under suction and cause overheating.",
    inspectionHints: [
      "Show the clamp and hose neck in the same frame — leaks start at the connection point.",
      "Squeeze the hose when cold: it should feel firm but pliable, not mushy or rock-hard.",
      "Look for wetness or dried coolant residue directly under the hose lip at each clamp.",
      "Check for swelling or bulging in the hose body, especially near the radiator neck.",
      "Inspect the hose routing for rubbing against sharp edges or the fan shroud.",
    ],
    warningSigns: [
      "wet clamp or fresh coolant drip at either hose end",
      "soft, spongy hose that collapses easily when squeezed",
      "swollen or ballooned section in the hose body",
      "dried pink or orange coolant track below a hose connection",
      "cracked or hardened rubber near a clamp",
      "hose rubbing against the fan shroud or engine bracket",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["leak", "coolant_smell"],
    inspectionTargets: ["radiator_hose_neck_and_clamp", "fluid_source_path"],
  },
  thermostat_housing: {
    id: "thermostat_housing",
    label: "Thermostat Housing / Neck",
    aliases: ["thermostat housing", "coolant neck", "outlet neck"],
    system: "cooling",
    summary:
      "Thermostat housing and coolant outlet neck on the front of the 5.4 Triton, where the upper radiator hose connects. The gasket between the housing and the engine block is a known seep point on high-mileage trucks, and coolant can trail downward making the leak source hard to pinpoint.",
    inspectionHints: [
      "Look at the gasket line between the housing and the engine block for wetness or dried residue.",
      "Follow any coolant trail upward from the lowest visible wet point to find the true source.",
      "Check the housing bolts for tightness — overtightening can crack the aluminum housing.",
      "Inspect the O-ring or gasket seal area for orange or pink crust buildup.",
      "Look for coolant weeping where the heater hose connects to the rear of the housing.",
    ],
    warningSigns: [
      "seep or weep at the gasket line between housing and block",
      "fresh wet coolant on the housing neck",
      "orange or pink crust at the outlet or heater hose connection",
      "coolant smell from the engine bay after a drive",
      "low coolant level with no obvious external puddle",
      "housing bolts showing signs of previous re-torque or sealant",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["leak", "coolant_smell"],
    inspectionTargets: ["radiator_hose_neck_and_clamp", "fluid_source_path"],
  },
  fan_clutch: {
    id: "fan_clutch",
    label: "Cooling Fan / Clutch",
    aliases: partAliases("fan_clutch", []),
    system: "cooling",
    summary:
      "Thermostatic fan clutch bolted to the water pump shaft on the 5.4 Triton. The clutch engages more aggressively as underhood temperature rises. A failed clutch can free-spin (causing overheating) or lock up permanently (causing a constant roar and power loss).",
    inspectionHints: [
      "With the engine OFF, try to spin the fan by hand — moderate resistance is normal; spinning freely means a failed clutch.",
      "Rock the fan blade front-to-back: more than 1/4 inch of play indicates a worn clutch bearing.",
      "Keep the fan and the nearby belt path in the same frame to separate fan noise from belt noise.",
      "Look for silicone fluid residue on the fan clutch body — leaking fluid means the clutch is failing.",
      "Listen for a roaring noise that sounds like driving with a window cracked — indicates a locked-up clutch.",
    ],
    warningSigns: [
      "fan wobble visible with the engine running",
      "fan blade contact marks on the fan shroud",
      "silicone fluid residue leaking from the clutch body",
      "fan spins freely by hand with zero resistance (failed clutch)",
      "constant roar from the fan area even when the engine is cold",
      "engine running hot because the fan is not engaging",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["wobble", "rattle"],
    inspectionTargets: ["front_accessory_drive_path"],
  },
  intake_tube: {
    id: "intake_tube",
    label: "Intake Tube",
    aliases: partAliases("intake_tube", []),
    system: "intake_vacuum",
    summary:
      "Rubber and plastic intake duct running from the air box past the MAF sensor to the throttle body on the 5.4 Triton. A crack or loose clamp here lets unmetered air in downstream of the MAF, causing lean running, rough idle, and possible misfire codes.",
    inspectionHints: [
      "Show the full tube from air box to throttle body, including both hose clamps.",
      "Look for splits or cracks in the rubber accordion section — flex the tube gently to reveal hidden cracks.",
      "Check both clamps for tightness; a loose clamp allows air to bypass the MAF sensor.",
      "Look for oil residue inside the tube — a sign of PCV blow-by, which is common at higher mileage.",
      "Inspect any vacuum line tees or fittings that branch off the intake tube.",
    ],
    warningSigns: [
      "split or cracked rubber section in the intake duct",
      "loose hose clamp at the air box or throttle body end",
      "collapsed section of duct restricting airflow",
      "hissing sound from the intake area at idle",
      "oil residue coating the inside of the tube",
      "vacuum line fitting cracked or popped off the intake tube",
    ],
    likelyRecommendation: "DIY_SAFE",
    commonSymptoms: ["hiss", "rough_idle", "misfire"],
    inspectionTargets: ["intake_tube_and_throttle_body", "maf_sensor_and_air_box"],
  },
  throttle_body: {
    id: "throttle_body",
    label: "Throttle Body Area",
    aliases: partAliases("throttle_body", []),
    system: "intake_vacuum",
    summary:
      "Electronic throttle body on the top-front of the 5.4 Triton intake manifold. The 3-valve engine uses an electronic throttle (drive-by-wire), so there is no throttle cable. Carbon buildup on the throttle plate and bore is a common cause of rough or high idle on this engine.",
    inspectionHints: [
      "Show the throttle body connection and intake tube clamp together.",
      "Look for black carbon buildup around the throttle plate edge — visible when the plate is slightly open.",
      "Check the electrical connector on the throttle body for secure fit and corrosion.",
      "Inspect nearby vacuum lines for disconnected or cracked fittings at the intake manifold.",
      "Look for any air leak signs — listen for hissing near the throttle body gasket area.",
    ],
    warningSigns: [
      "air leak hiss at the coupler between intake tube and throttle body",
      "loose intake tube at the throttle body clamp",
      "disconnected vacuum line near the throttle body",
      "heavy carbon buildup visible on the throttle plate",
      "idle that surges or hunts between 500 and 1000 RPM",
      "throttle response feels sluggish or delayed",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["hiss", "rough_idle"],
    inspectionTargets: ["intake_tube_and_throttle_body", "vacuum_line_routing"],
  },
  maf_sensor: {
    id: "maf_sensor",
    label: "MAF Sensor / Air Box",
    aliases: partAliases("maf_sensor", []),
    system: "fuel_air_metering",
    summary:
      "Mass airflow sensor mounted in the air box outlet duct on the 5.4 Triton. The MAF measures incoming air volume so the PCM can calculate fuel delivery. A contaminated or failed MAF causes lean or rich running, hesitation, and rough idle — and it is one of the easiest sensors to clean or replace on this engine.",
    inspectionHints: [
      "Show the sensor connector and the duct join together in one frame.",
      "Check that the connector lock tab is fully clicked in and not broken.",
      "Look for an air leak at the air box outlet — any gap downstream of the MAF allows unmetered air in.",
      "Check the air filter condition while the air box is open.",
      "Look for oil contamination on the MAF sensor wire — caused by an over-oiled aftermarket air filter.",
    ],
    warningSigns: [
      "loose or unclicked connector on the MAF sensor",
      "air leak at the air box outlet or duct join",
      "broken clip or lock tab on the sensor connector",
      "oil film on the MAF sensor hot wire (from over-oiled filters)",
      "hesitation on acceleration that feels like a dead spot",
      "P0171/P0174 lean codes or P0101 MAF range/performance code",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["rough_idle", "misfire", "hiss"],
    inspectionTargets: ["maf_sensor_and_air_box", "connector_fitment_and_corrosion"],
  },
  fuel_injector: {
    id: "fuel_injector",
    label: "Fuel Injector Area",
    aliases: partAliases("fuel_injector", []),
    system: "fuel_air_metering",
    summary:
      "Fuel injectors on the 5.4 Triton sit under the intake manifold, so direct visual inspection is limited. Normal injector tick is part of the engine's sound signature and should not be called a fault on its own. A stuck or leaking injector shows up as a single-cylinder misfire or fuel smell.",
    inspectionHints: [
      "Do not call injector tick a fault by itself — normal injector clicking is part of the 5.4's sound signature.",
      "Use injector-area language cautiously unless one cylinder looks clearly different from the others.",
      "Look for fuel smell near the fuel rail — may indicate a leaking injector O-ring.",
      "Check the injector harness connector for corrosion or a broken lock tab.",
      "If diagnosing a single-cylinder misfire, rule out coil and spark plug first — they fail far more often than injectors on this engine.",
    ],
    warningSigns: [
      "rough idle or misfire concentrated on one cylinder",
      "fuel smell near the fuel rail or intake manifold area",
      "connector damage or corrosion on an injector harness plug",
      "P0201-P0208 injector circuit codes",
      "one cylinder significantly wetter or darker on the spark plug than the others",
      "raw fuel smell from the exhaust at idle",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["rough_idle", "misfire", "ticking"],
    inspectionTargets: ["coil_and_plug_well", "connector_fitment_and_corrosion"],
  },
  exhaust_manifold: {
    id: "exhaust_manifold",
    label: "Exhaust Manifold Area",
    aliases: partAliases("exhaust_manifold", []),
    system: "exhaust_emissions",
    summary:
      "Manifold flange and heat shields. The 5.4 3V is famous for snapping its exhaust manifold studs — the cold-start tick that fades when warm is the textbook symptom.",
    inspectionHints: [
      "Show the shield edge and the manifold-to-head flange area.",
      "Look for soot trails between the flange and the head — that's exhaust escaping past a broken stud.",
      "The tick is loudest at cold start and fades as the manifold expands and re-seals against the head.",
      "The driver-side rear studs are the most common to snap — focus inspection there first.",
      "Check the heat shield bolts for looseness or missing hardware — a rattling shield mimics exhaust leak noise.",
    ],
    warningSigns: [
      "black soot trail at the manifold-to-head joint",
      "loose or missing heat shield",
      "sharp ticking at cold start that fades when warm",
      "exhaust smell in the engine bay, especially noticeable with the hood open at idle",
      "broken stud visible as a flush-snapped bolt in the cylinder head",
      "tick that gets louder over time as more studs break",
      "P0430 or lean codes from exhaust leak affecting O2 sensor readings",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["exhaust_tick", "rattle"],
    inspectionTargets: ["exhaust_manifold_and_heat_shield"],
    healthyAppearance: {
      visual: [
        "clean dark gray manifold flange with no soot trails",
        "all heat shield bolts present, no rattling",
      ],
      sound: ["no ticking or hissing from the exhaust side at cold start"],
    },
    failingAppearance: {
      visual: [
        "black soot trail at the manifold-to-head joint",
        "visible gap between manifold flange and head",
        "heat shield rattling or loose",
      ],
      sound: [
        "sharp tick or hiss from the exhaust side at cold start",
        "tick that fades or disappears once the engine is warm",
      ],
    },
    failureModes: [
      {
        id: "exhaust_manifold_broken_studs",
        name: "Broken exhaust manifold studs",
        cause:
          "The 5.4 3V exhaust manifold studs are undersized and corrode. Heat cycles eventually snap one or more studs flush with the cylinder head. The manifold lifts off the head slightly until thermal expansion re-seals it.",
        symptoms: [
          "sharp ticking from the exhaust side at cold start",
          "tick fades within a few minutes as the engine warms up",
          "soot trails at the manifold-to-head joint",
          "subtle exhaust smell in the engine bay",
        ],
        severity: "medium",
        diyOrShop: "diy_with_care",
        knownWeakness: true,
        confidence: "field_knowledge",
        source: "field knowledge — verify before acting",
      },
    ],
  },
  oxygen_sensor_connector: {
    id: "oxygen_sensor_connector",
    label: "Oxygen Sensor Connector",
    aliases: partAliases("connector", ["oxygen sensor connector", "o2 sensor plug"]),
    system: "exhaust_emissions",
    summary:
      "Oxygen sensor connector and short harness section routed near the exhaust manifold and catalytic converters on the 5.4 Triton. The 2010 F-150 has four O2 sensors (two upstream, two downstream), and heat from the exhaust manifold gradually degrades the wiring and connector plastic.",
    inspectionHints: [
      "Show the plug body and wire entry together — heat damage usually starts where the harness passes closest to the exhaust.",
      "Check for melted or brittle insulation near hot exhaust parts.",
      "Inspect the connector lock tab — a broken tab lets the plug work loose from vibration.",
      "Look for green or white corrosion on the connector pins if the plug can be safely disconnected.",
      "Trace the harness routing to ensure it is not resting directly against the manifold or a heat shield.",
    ],
    warningSigns: [
      "melted or brittle harness insulation near the exhaust",
      "loose plug that can be wiggled by hand",
      "heat damage to the connector body — warped or discolored plastic",
      "green or white corrosion visible on the pins",
      "P0131-P0161 or P0135-P0155 O2 sensor or heater circuit codes",
      "rough idle or poor fuel economy without other obvious cause",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["corrosion", "rough_idle"],
    inspectionTargets: ["connector_fitment_and_corrosion", "exhaust_manifold_and_heat_shield"],
  },
  catalytic_converter_area: {
    id: "catalytic_converter_area",
    label: "Catalytic Converter Area",
    aliases: ["catalytic converter", "cat area", "converter shell"],
    system: "exhaust_emissions",
    summary:
      "Catalytic converter shells and heat shields visible under the 2010 F-150. The 5.4 Triton has two catalytic converters (one per bank) close-coupled to the exhaust manifolds. A loose or broken heat shield creates a rattle easily mistaken for an internal exhaust or engine problem.",
    inspectionHints: [
      "Keep the converter shell and nearby bracket in the same frame for context.",
      "Differentiate surface rust scale from a loose or broken heat shield — tap the shield to check.",
      "Look for impact damage from road debris on the converter shell.",
      "Check the mounting bracket and bolts for rust-through or missing hardware.",
      "Smell for a sulfur or rotten-egg odor near the converters, which can indicate a failing catalyst.",
    ],
    warningSigns: [
      "rattling or buzzing from a loose heat shield",
      "loose shield that moves when tapped",
      "fresh impact damage or dents on the converter shell",
      "sulfur or rotten-egg smell from the exhaust",
      "P0420/P0430 catalyst efficiency below threshold codes",
      "reduced power or hesitation with a glowing-hot converter shell (plugged catalyst)",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["rattle", "vibration"],
    inspectionTargets: ["exhaust_manifold_and_heat_shield", "frame_rust_and_seam"],
  },
  coil: {
    id: "coil",
    label: "Coil-On-Plug",
    aliases: partAliases("coil", []),
    system: "ignition",
    summary:
      "Top-engine coil-on-plug unit above each cylinder. On the 5.4 3V, coils get baked by valve-cover heat and contaminated by oil leaking past the valve-cover gasket — a common combined failure.",
    inspectionHints: [
      "Show the coil body, connector, and boot area.",
      "Look for oil pooling in the spark plug well (a sign of valve-cover gasket leak attacking the coil).",
      "If diagnosing a misfire: swap the suspect coil to a different cylinder and see if the misfire follows.",
      "Pull each coil and inspect the boot for carbon tracking — a white or gray line running down the boot means it is arcing to ground.",
      "Check the connector lock tab for breakage — a loose coil connector causes intermittent misfires.",
    ],
    warningSigns: [
      "loose coil that pulls out with little resistance",
      "burn marks or melting on the coil body",
      "oil pooled in the spark plug well around the coil base",
      "cracked, swollen, or torn coil boot",
      "carbon tracking line on the boot (sign of spark arcing to ground)",
      "P0301-P0308 single-cylinder misfire code",
      "misfire that follows a specific coil when swapped to another cylinder",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["misfire", "rough_idle", "ticking"],
    inspectionTargets: ["coil_and_plug_well", "connector_fitment_and_corrosion"],
    healthyAppearance: {
      visual: [
        "dry coil body with no oil contamination",
        "boot fully seated, no carbon trail at the base",
        "no cracks or burn marks on the plastic",
      ],
    },
    failingAppearance: {
      visual: [
        "oil pooled in the plug well or coating the coil base",
        "carbon trail running down from the boot (sign of arcing)",
        "cracked, brittle, or swollen coil boot",
        "burn or melt marks on the coil body",
      ],
    },
    failureModes: [
      {
        id: "coil_oil_contamination_misfire",
        name: "Coil failure from valve-cover gasket leak",
        cause:
          "When the valve-cover gasket leaks (very common on this engine), oil drips into the spark plug well and soaks the coil boot. Oil breaks down the rubber and creates a path for the spark to arc to ground instead of jumping the plug gap.",
        symptoms: [
          "single-cylinder misfire that comes and goes with engine load",
          "oil visible in the plug well when you pull the coil",
          "P0301 through P0308 misfire codes",
        ],
        severity: "medium",
        diyOrShop: "diy",
        knownWeakness: true,
        confidence: "field_knowledge",
        source: "field knowledge — verify before acting",
      },
    ],
  },
  spark_plug: {
    id: "spark_plug",
    label: "Spark Plug Area",
    aliases: partAliases("spark_plug", []),
    system: "ignition",
    summary:
      "Plug well and plug seat. The 5.4 3V uses an infamous two-piece plug design that loves to break in half during removal — half the plug stays in the head and has to be extracted with a special tool.",
    inspectionHints: [
      "Look for carbon or blow-by signs around any single plug well.",
      "If you can hear a sharp pop or whistle from one cylinder area, suspect a blown plug well first on this engine.",
      "Before removing plugs: soak the wells with penetrant for 30+ minutes warm-engine, follow the Ford procedure exactly.",
      "Use Motorcraft SP-509 or SP-515 plugs only — they are designed for the 2-piece extraction risk. Apply anti-seize to the threads on reinstall.",
      "Never attempt spark plug removal on a cold engine — warm it up first to help break the carbon bond.",
    ],
    warningSigns: [
      "sharp pop or whistle traceable to one cylinder",
      "carbon or oil staining around a plug well",
      "P0300 single-cylinder misfire that won't move with coil swap",
      "plug that comes out in two pieces during removal — the electrode shield stayed in the head",
      "coil-on-plug found loose or ejected from the plug well",
      "rough idle with one dead cylinder and no response to coil swap",
      "engine miss under load that is consistent on one cylinder",
    ],
    likelyRecommendation: "SHOP_REQUIRED",
    commonSymptoms: ["misfire", "ticking", "rough_idle"],
    inspectionTargets: ["coil_and_plug_well"],
    healthyAppearance: {
      visual: [
        "clean dry plug wells",
        "coil boots seated firmly with no carbon trails",
      ],
      sound: ["no sharp pops or whistles from individual cylinders"],
    },
    failingAppearance: {
      visual: [
        "carbon or oil staining around one specific plug well",
        "lifted or ejected coil-on-plug",
        "damaged threads visible in the cylinder head if a plug has blown out",
      ],
      sound: [
        "sharp popping or whistling from one cylinder area, especially under load",
      ],
    },
    failureModes: [
      {
        id: "spark_plug_two_piece_breakage_at_removal",
        name: "Two-piece plug breakage during removal",
        cause:
          "The 3V plugs have a long thin electrode shield that carbon-welds itself into the cylinder head over time. When you back the plug out, the shield snaps off and stays in the head.",
        symptoms: [
          "plug removes with much less effort than expected, then suddenly seizes",
          "broken plug halves visible when you pull the plug out",
        ],
        severity: "high",
        diyOrShop: "diy_with_care",
        knownWeakness: true,
        confidence: "field_knowledge",
        source:
          "field knowledge — Ford issued TSB 08-7-6 covering this; drop the TSB PDF into sources/ford-tsbs/ to upgrade",
      },
      {
        id: "spark_plug_thread_blowout",
        name: "Plug ejection / thread blowout",
        cause:
          "The 3V cylinder head has shallow plug threads. Over time and heat cycles, threads weaken and the plug can blow itself out — taking the threads with it.",
        symptoms: [
          "loud pop followed by sudden rough running and exhaust noise from the engine bay",
          "P0300 misfire with one cylinder dead",
          "ejected coil-on-plug found loose in the valley",
        ],
        severity: "stop_driving",
        diyOrShop: "shop",
        knownWeakness: true,
        confidence: "field_knowledge",
        source: "field knowledge — verify before acting",
      },
    ],
    serviceInterval: {
      mileage: 90000,
      note:
        "Ford SMG: replace at 90,000 mi. Many 3V owners do them earlier (every 60,000 mi) specifically because the longer they sit, the worse the carbon weld and the higher the breakage risk.",
    },
  },
  ignition_harness: {
    id: "ignition_harness",
    label: "Ignition Harness",
    aliases: partAliases("ignition_harness", []),
    system: "connectors_harness",
    summary:
      "Wiring harness section feeding the eight coil-on-plug connectors across the top of the 5.4 Triton. The harness sits on top of the valve covers and bakes in engine heat, making the insulation brittle and the connector latches fragile over time.",
    inspectionHints: [
      "Show the wire entry and strain relief at each coil connector.",
      "Look for brittle, cracked, or heat-hardened insulation along the harness run.",
      "Check each connector latch — a broken latch lets the plug vibrate loose and intermittently kill a coil.",
      "Look for rubbing or chafing where the harness crosses sharp edges on the valve cover or intake manifold.",
      "Inspect for rodent damage — mice love nesting in the valley between the valve covers.",
    ],
    warningSigns: [
      "wire strain or pulled-tight harness at a coil connector",
      "cracked or brittle insulation that flakes when touched",
      "broken connector latch on one or more coil plugs",
      "intermittent misfire that changes when the harness is wiggled",
      "rodent chew marks or nesting material in the engine valley",
      "green corrosion at a connector pin",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["misfire", "rough_idle", "corrosion"],
    inspectionTargets: ["connector_fitment_and_corrosion"],
  },
  connector: {
    id: "connector",
    label: "Electrical Connector",
    aliases: partAliases("connector", []),
    system: "connectors_harness",
    summary:
      "Generic electrical connector body, latch, pin side, and wire-entry area found throughout the 2010 F-150 engine bay and chassis. Ford uses Motorcraft-style Weather-Pack connectors; the lock tabs are the first thing to break, and the seals degrade in heat and moisture, letting corrosion attack the pins.",
    inspectionHints: [
      "Show the lock tab and pin side together in one frame.",
      "Do not guess about pin condition if the pins are not directly visible.",
      "Check the connector seal or weather-pack boot for tears or dislodgment.",
      "Look for green or white corrosion on the connector body or where wires enter.",
      "Wiggle the connector gently — any intermittent symptom change points to a connection fault.",
      "Check for heat discoloration on connectors near the exhaust manifold or turbo area.",
    ],
    warningSigns: [
      "broken latch or lock tab — connector can be pulled off by hand",
      "green or white corrosion visible on the connector body or pins",
      "loose fit that lets the connector rock in its mate",
      "heat damage — warped, melted, or discolored plastic",
      "cracked or missing weather seal",
      "intermittent symptom that changes when the connector is wiggled",
    ],
    likelyRecommendation: "DIY_SAFE",
    commonSymptoms: ["corrosion", "misfire", "hyperflash"],
    inspectionTargets: ["connector_fitment_and_corrosion"],
  },
  vacuum_line: {
    id: "vacuum_line",
    label: "Vacuum Line",
    aliases: partAliases("vacuum_line", []),
    system: "intake_vacuum",
    summary:
      "Small-diameter vacuum hoses routed across the top and rear of the 5.4 Triton intake manifold. These lines feed the brake booster, PCV system, EVAP purge, and IWE solenoid (on 4WD models). A cracked or disconnected vacuum line causes a hissing sound, rough idle, and lean codes.",
    inspectionHints: [
      "Trace each vacuum line end-to-end from its source fitting to its destination.",
      "Look for splits, cracks, or hardened rubber — flex the line gently to reveal hidden damage.",
      "Check for a collapsed section that could restrict vacuum flow.",
      "Listen for a hissing sound near vacuum line junctions with the engine running.",
      "On 4WD models, check the IWE vacuum line routing from the solenoid to the front hubs.",
    ],
    warningSigns: [
      "split or cracked vacuum hose",
      "loose connection at a tee or fitting",
      "hissing sound near a vacuum line at idle",
      "hardened, brittle rubber that cracks when flexed",
      "collapsed hose section restricting flow",
      "P0171/P0174 lean codes from an unmetered air leak",
      "brake pedal feels hard — possible brake booster vacuum line issue",
    ],
    likelyRecommendation: "DIY_SAFE",
    commonSymptoms: ["hiss", "rough_idle", "misfire"],
    inspectionTargets: ["vacuum_line_routing"],
  },
  coolant_hose: {
    id: "coolant_hose",
    label: "Coolant Hose",
    aliases: partAliases("coolant_hose", []),
    system: "cooling",
    summary:
      "Heater hoses and crossover coolant hoses routed across the rear of the 5.4 Triton engine. These smaller hoses connect the engine to the heater core, throttle body coolant circuit, and the rear crossover. They age faster than the large radiator hoses because of their thinner walls and tighter bend radii.",
    inspectionHints: [
      "Show the hose and its connection point together — leaks start at the clamp or molded fitting.",
      "Trace any wetness upward to find the highest source before declaring a leak location.",
      "Squeeze the hose — it should feel firm but pliable, not mushy, rock-hard, or swollen.",
      "Check molded quick-connect fittings for cracks — these are common leak points on the 5.4.",
      "Look for dried coolant crust (pink or orange) at any connection or clamp.",
    ],
    warningSigns: [
      "wet hose or drip at a connection point",
      "wet or corroded clamp with dried coolant residue",
      "orange or pink crust at a molded fitting or quick-connect",
      "soft, swollen hose that indicates internal degradation",
      "sweet coolant smell from the engine bay or near the firewall",
      "low coolant level with no visible puddle on the ground",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["leak", "coolant_smell"],
    inspectionTargets: ["coolant_hose_and_crossover", "fluid_source_path"],
  },
  battery_terminal: {
    id: "battery_terminal",
    label: "Battery Terminal",
    aliases: partAliases("battery_terminal", []),
    system: "battery_ground",
    summary:
      "Positive and negative battery post clamps on the 2010 F-150. Corrosion buildup on these terminals is the single most common cause of hard-start and no-start complaints that owners mistake for a dead battery or starter failure. Cleaning is a 10-minute DIY fix.",
    inspectionHints: [
      "Show the clamp, post, and cable end together in one frame.",
      "Look for white fuzzy buildup (lead sulfate) on the positive terminal or green corrosion (copper oxidation) on the negative.",
      "Check that the clamp is tight — try to rock it by hand on the post.",
      "Look for acid residue or dark staining on the cable insulation near the terminal.",
      "Check the small auxiliary wire leads attached to the positive terminal clamp for corrosion.",
    ],
    warningSigns: [
      "white fuzzy corrosion buildup on the positive terminal",
      "green corrosion on the negative terminal or cable end",
      "loose clamp that rocks on the battery post",
      "heat damage or melting on the cable insulation",
      "slow cranking that improves when the terminal is cleaned",
      "intermittent electrical issues — gauges flickering, accessories cutting out",
    ],
    likelyRecommendation: "DIY_SAFE",
    commonSymptoms: ["corrosion", "dead_battery", "rough_idle"],
    inspectionTargets: ["battery_terminal_and_ground", "battery_top_and_hold_down"],
  },
  lamp_socket: {
    id: "lamp_socket",
    label: "Lamp Socket",
    aliases: partAliases("lamp_socket", []),
    system: "lighting",
    summary:
      "Bulb socket and short pigtail wiring behind each headlamp and taillamp assembly on the 2010 F-150. The tail lamp sockets in particular are known for melting from poor contact or aftermarket bulb heat, causing intermittent turn signal hyperflash and eventually a dead lamp.",
    inspectionHints: [
      "Show the socket face and the short harness section together.",
      "Look for melted or discolored plastic on the socket body — especially the turn signal socket.",
      "Check for green corrosion on the socket contacts.",
      "Verify the bulb seats firmly with no wobble when inserted.",
      "Inspect the pigtail wiring for heat damage or cracked insulation.",
    ],
    warningSigns: [
      "melted or warped plastic on the socket body",
      "green corrosion on the socket contacts or bulb base",
      "loose bulb fit that allows the bulb to wobble in the socket",
      "intermittent turn signal hyperflash (fast blink)",
      "burnt smell from behind the lamp housing",
      "socket that feels hot to the touch after short use",
    ],
    likelyRecommendation: "DIY_SAFE",
    commonSymptoms: ["hyperflash", "corrosion"],
    inspectionTargets: ["lamp_socket_and_harness"],
  },
  light_bulb: {
    id: "light_bulb",
    label: "Light Bulb",
    aliases: ["light bulb", "bulb", "lamp bulb"],
    system: "lighting",
    summary:
      "Lamp bulb for headlight, tail light, brake light, or turn signal on the 2010 F-150. The truck uses standard twist-lock bulbs. A single dead turn signal bulb causes hyperflash (fast blink) on that side. Always check the bulb first before chasing wiring or socket problems.",
    inspectionHints: [
      "Check the affected bulb path before making wider wiring claims.",
      "Look for a bulb that is loose, obviously burnt, or has a broken filament.",
      "Compare both sides — if only one side hyperflashes, the dead bulb is on that side.",
      "Check the bulb base for corrosion or discoloration from a bad socket contact.",
      "Verify the correct bulb number — wrong wattage bulbs cause hyperflash and socket melting.",
    ],
    warningSigns: [
      "dead lamp on one side with the other side working normally",
      "burnt or blackened bulb glass",
      "intermittent lamp that works when the bulb is wiggled",
      "turn signal hyperflash (fast blink) on one side",
      "wrong-wattage bulb installed (common with aftermarket LEDs)",
      "bulb base corroded or discolored",
    ],
    likelyRecommendation: "DIY_SAFE",
    commonSymptoms: ["hyperflash"],
    inspectionTargets: ["lamp_socket_and_harness"],
  },
  headlight_housing: {
    id: "headlight_housing",
    label: "Headlight Housing",
    aliases: partAliases("headlight_housing", []),
    system: "body",
    summary:
      "Front headlight housing assembly on the 2010 F-150, held by two bolts and a push-pin. The housing lens yellows and hazes with UV exposure, reducing light output significantly. Moisture inside the housing accelerates bulb failure and socket corrosion.",
    inspectionHints: [
      "Show the housing and connector side together.",
      "Look for moisture or condensation inside the housing lens.",
      "Check the mounting tabs and push-pin for cracks — a loose housing vibrates and breaks bulbs.",
      "Inspect the lens surface for hazing, yellowing, or crazing from UV damage.",
      "Check the weather seal around the back of the housing for tears or gaps.",
    ],
    warningSigns: [
      "moisture or condensation trapped inside the housing",
      "broken mounting tab causing the housing to shift or vibrate",
      "loose housing fit that moves when pushed by hand",
      "heavily hazed or yellowed lens reducing light output",
      "cracked lens from a rock impact",
      "socket corrosion visible from the back of the housing",
    ],
    likelyRecommendation: "DIY_SAFE",
    commonSymptoms: ["hyperflash", "corrosion"],
    inspectionTargets: ["headlamp_housing_and_mount", "lamp_socket_and_harness"],
  },
  taillight_housing: {
    id: "taillight_housing",
    label: "Taillight Housing",
    aliases: partAliases("taillight_housing", []),
    system: "body",
    summary:
      "Rear tail light housing on the 2010 F-150 tailgate and bed side. The housing is held by two nuts from inside the bed. The tail light sockets are prone to melting from poor contact, and moisture intrusion through cracked seals causes socket corrosion and intermittent lamp failures.",
    inspectionHints: [
      "Show the housing and the short harness on the back side.",
      "Look for moisture or water pooled inside the housing lens.",
      "Check the mounting nuts from inside the bed — loose mounts cause vibration damage.",
      "Inspect each socket for melted plastic or discoloration.",
      "Check the gasket seal between the housing and the body panel for tears or compression damage.",
    ],
    warningSigns: [
      "moisture or water inside the housing",
      "cracked mounting stud or missing nut",
      "loose lamp fit allowing the housing to rattle",
      "melted or discolored socket from heat",
      "turn signal hyperflash caused by poor socket contact",
      "cracked lens or gasket seal allowing water entry",
    ],
    likelyRecommendation: "DIY_SAFE",
    commonSymptoms: ["hyperflash", "corrosion"],
    inspectionTargets: ["taillamp_housing_and_mount", "lamp_socket_and_harness"],
  },
  brake_line: {
    id: "brake_line",
    label: "Brake Line",
    aliases: partAliases("brake_line", []),
    system: "brakes",
    summary:
      "Steel hard brake lines running along the frame rails of the 2010 F-150 from the master cylinder to each wheel. In salt-belt and coastal climates, these lines corrode from the outside in and can develop pinhole leaks or burst under braking pressure. This is a safety-critical item.",
    inspectionHints: [
      "Show the rusty section and its wider route along the frame for context.",
      "Look for wetness or fresh fluid dripping from any section of the hard line.",
      "Check for heavy scaling rust — if you can scrape through the line wall with a fingernail, it needs replacement.",
      "Inspect where the hard line passes through frame clips and brackets — corrosion concentrates under clips.",
      "Check the line fittings at the master cylinder and at each wheel hose junction for seepage.",
    ],
    warningSigns: [
      "wet line or fresh brake fluid drip",
      "heavy scaling rust that has eaten into the line wall",
      "crushed or kinked section from impact damage",
      "brake pedal feels soft or sinks slowly to the floor",
      "low brake fluid level in the master cylinder reservoir",
      "visible line damage at a frame clip or bracket",
      "brake warning light on the dash",
    ],
    likelyRecommendation: "SHOP_REQUIRED",
    commonSymptoms: ["leak", "pull", "rust"],
    inspectionTargets: ["brake_line_and_hose", "wheel_well_underbody"],
  },
  brake_hose: {
    id: "brake_hose",
    label: "Brake Hose",
    aliases: partAliases("brake_hose", []),
    system: "brakes",
    summary:
      "Flexible rubber brake hose connecting the hard line on the frame to the caliper at each wheel on the 2010 F-150. The hose flexes with suspension travel and steering input. Internal deterioration can cause the hose to act like a one-way valve, trapping pressure and causing the brake to drag on one wheel.",
    inspectionHints: [
      "Show the hose and both fittings (frame end and caliper end) together.",
      "Look for wetness or fluid seepage at either fitting.",
      "Check for external cracking, bulging, or rubbing against the tire or suspension.",
      "Inspect the hose retaining bracket — a loose hose can rub through on the wheel.",
      "After a drive, check if one wheel is noticeably hotter than the others — suggests a collapsed hose trapping pressure.",
    ],
    warningSigns: [
      "wet hose or fluid drip at a fitting",
      "external cracking or weather-checking on the hose surface",
      "bulge in the hose body indicating internal failure",
      "rub-through from contact with the tire or suspension component",
      "vehicle pulling to one side under braking",
      "one wheel running noticeably hotter than the others",
      "brake dragging — vehicle does not coast freely",
    ],
    likelyRecommendation: "SHOP_REQUIRED",
    commonSymptoms: ["leak", "pull"],
    inspectionTargets: ["brake_line_and_hose"],
  },
  caliper_area: {
    id: "caliper_area",
    label: "Caliper Area",
    aliases: ["caliper area", "brake caliper", "caliper"],
    system: "brakes",
    summary:
      "Brake caliper, slide pins, and bleeder area on each wheel of the 2010 F-150. The front calipers are single-piston sliding-type. Seized slide pins are common and cause uneven pad wear and pulling under braking. The caliper piston seal can leak brake fluid externally.",
    inspectionHints: [
      "Show the caliper, hose connection, and bleeder screw together in one frame.",
      "Look for brake fluid wetness around the piston boot or bleeder screw.",
      "Check the hose routing to the caliper for twisting or rubbing.",
      "Look for uneven pad wear visible through the caliper window — indicates a seized slide pin.",
      "Check the caliper bracket bolts and slide pin boots for damage.",
    ],
    warningSigns: [
      "brake fluid wetness around the caliper piston boot",
      "fluid drip from the bleeder screw area",
      "hose twisted or routed against the tire",
      "broken hose retaining clip at the caliper",
      "uneven pad wear visible through the caliper inspection window",
      "vehicle pulling to one side during braking",
      "grinding or scraping noise from the wheel area",
    ],
    likelyRecommendation: "SHOP_REQUIRED",
    commonSymptoms: ["leak", "pull"],
    inspectionTargets: ["brake_line_and_hose"],
  },
  control_arm: {
    id: "control_arm",
    label: "Control Arm",
    aliases: partAliases("control_arm", []),
    system: "suspension_steering",
    summary:
      "Front upper and lower control arms on the 2010 F-150 independent front suspension. The lower control arms are especially rust-prone in salt and moisture climates — the arm-to-knuckle bolts can seize so badly that the entire arm must be cut off during replacement, turning a routine job into a multi-hour ordeal.",
    inspectionHints: [
      "Show the bushing and arm shape together from underneath.",
      "Look for bushing shift or separation — the rubber should be centered with no visible gaps.",
      "Check the arm-to-knuckle bolt area for heavy rust and seized hardware.",
      "Look for impact damage or bends in the arm from hitting a pothole or curb.",
      "On the lower arm, check the ball joint area for grease leakage or a torn boot.",
      "Inspect the frame mounting points for rust-through or elongated bolt holes.",
    ],
    warningSigns: [
      "shifted or separated bushing with visible rubber gaps",
      "impact bend or deformation in the arm",
      "severe rust at the arm-to-knuckle mount — bolts may be seized",
      "clunking noise over bumps or during braking",
      "vehicle pulling to one side on a flat road",
      "visible play when the wheel is rocked top-to-bottom with the truck jacked up",
      "rust scaling so heavy the arm thickness is compromised",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["clunk", "pull", "vibration"],
    inspectionTargets: ["front_suspension_joint"],
  },
  ball_joint: {
    id: "ball_joint",
    label: "Ball Joint",
    aliases: partAliases("ball_joint", []),
    system: "suspension_steering",
    summary:
      "Upper and lower ball joints connecting the control arms to the steering knuckle on the 2010 F-150 front suspension. The lower ball joint is load-bearing and wears faster. Worn ball joints cause a clunking noise over bumps and can eventually separate, which is a safety-critical failure.",
    inspectionHints: [
      "Show the ball joint boot and stud area from underneath.",
      "Look for a torn or missing boot — once the boot is gone, dirt gets in and the joint wears fast.",
      "Check for grease leakage around the boot or stud area.",
      "With the truck jacked up, grab the tire at 12 and 6 o'clock and rock it — any play indicates a worn ball joint.",
      "Look for a wear indicator pin on the lower ball joint — if it is flush with the housing, the joint is worn out.",
    ],
    warningSigns: [
      "torn or missing ball joint boot",
      "dry joint with no grease visible around the boot",
      "clunking noise over bumps, speed bumps, or driveway entries",
      "visible play when rocking the wheel top-to-bottom",
      "wear indicator pin flush with or recessed into the housing",
      "steering wander or vague steering feel",
      "uneven tire wear on the inner or outer edge",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["clunk", "pull", "vibration"],
    inspectionTargets: ["front_suspension_joint"],
  },
  tie_rod_end: {
    id: "tie_rod_end",
    label: "Tie Rod End",
    aliases: partAliases("tie_rod_end", []),
    system: "suspension_steering",
    summary:
      "Inner and outer tie rod ends connecting the steering rack to the steering knuckle on the 2010 F-150. The outer tie rod end is exposed to road spray and debris, and a worn end causes steering wander, uneven tire wear, and a clunking feel when turning. Replacement requires a front-end alignment.",
    inspectionHints: [
      "Show the outer tie rod end link and boot from underneath.",
      "Look for a torn boot or grease leakage at the ball stud.",
      "Grab the tire at 3 and 9 o'clock and rock it — any click or play points to a worn tie rod end.",
      "Check for rust dust at the joint — a sign the ball stud is grinding internally.",
      "Inspect the jam nut between inner and outer tie rod for tightness.",
    ],
    warningSigns: [
      "torn boot on the outer tie rod end",
      "loose linkage with visible play when the tire is rocked side-to-side",
      "rust dust at the ball joint area",
      "clunking or clicking feel when turning the steering wheel",
      "steering wander or vague center feel on the highway",
      "uneven tire wear — feathering on the inner or outer edge",
      "loose jam nut between inner and outer tie rod",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["pull", "clunk", "vibration"],
    inspectionTargets: ["steering_linkage_end"],
  },
  cv_axle_boot: {
    id: "cv_axle_boot",
    label: "CV Axle Boot",
    aliases: partAliases("cv_axle_boot", []),
    system: "drivetrain_4wd",
    summary:
      "Rubber CV boot covering the front axle constant-velocity joint on 4WD models of the 2010 F-150. The boot keeps grease in and dirt out. A torn boot is a ticking clock — the joint can survive weeks to months after a tear, but once the grease is gone, the CV joint fails and produces a clicking noise on turns.",
    inspectionHints: [
      "Show the full boot accordion and both clamps from underneath.",
      "Look for tears, splits, or cracks in the rubber boot material.",
      "Check for grease slung on the inside of the wheel well or undercarriage — a sign the boot has been torn and spinning.",
      "Inspect both the inner and outer boots — the inner boot is closer to the differential.",
      "Look for loose or missing clamps that let the boot slide off the joint.",
    ],
    warningSigns: [
      "split or torn boot with grease leaking out",
      "grease sling pattern on the inside of the wheel well",
      "loose or missing boot clamp",
      "clicking noise from the front end when turning at low speed",
      "vibration from the front end that was not there before",
      "boot collapsed or sucked inward indicating a vacuum leak in the boot",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["clunk", "vibration", "leak"],
    inspectionTargets: ["transfer_case_and_driveshaft"],
  },
  transfer_case_area: {
    id: "transfer_case_area",
    label: "Transfer Case Area",
    aliases: partAliases("transfer_case_area", []),
    system: "drivetrain_4wd",
    summary:
      "Transfer case housing and output seals on 4WD models of the 2010 F-150. The electronic-shift transfer case sits behind the transmission. Fluid leaks typically appear at the output shaft seals or the case halves. A grinding or whining noise from the transfer case area often points to low fluid from a slow leak.",
    inspectionHints: [
      "Show the case seam and the driveshaft entry point from underneath.",
      "Look for wetness or fresh fluid around the front and rear output shaft seals.",
      "Check the electrical connector on the transfer case motor for corrosion or looseness.",
      "Look for fluid trails on the underside of the case — trace them upward to find the source.",
      "Check the transfer case fluid level if accessible — the fill plug is on the side of the case.",
    ],
    warningSigns: [
      "wet case seam or gasket line between case halves",
      "fresh fluid drip from the front or rear output seal",
      "damaged or corroded connector on the shift motor",
      "grinding or whining noise from the center of the truck at speed",
      "4WD indicator light flashing or not engaging",
      "fluid puddle under the center of the truck",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["leak", "vibration"],
    inspectionTargets: ["transfer_case_and_driveshaft"],
  },
  driveshaft_u_joint: {
    id: "driveshaft_u_joint",
    label: "Driveshaft U-Joint",
    aliases: ["driveshaft u joint", "u-joint", "universal joint"],
    system: "drivetrain_4wd",
    summary:
      "Universal joints connecting the driveshaft sections on the 2010 F-150. The truck has a two-piece rear driveshaft with a carrier bearing and three U-joints. A failing U-joint produces a clunk on takeoff or a vibration at highway speed, and rust-colored dust at the joint caps is the classic visual sign of a dry, worn joint.",
    inspectionHints: [
      "Show the joint caps and the nearby yoke from underneath.",
      "Look for rust-colored dust at the bearing caps — this means the needle bearings are dry.",
      "Grab the driveshaft near each U-joint and try to rotate it back and forth — any clunk or play indicates wear.",
      "Check for thrown grease on the surrounding surfaces — a sign the joint seal has failed.",
      "Inspect the carrier bearing mount for cracks or rubber deterioration.",
    ],
    warningSigns: [
      "rust-colored dust at the U-joint bearing caps",
      "loose bearing cap or visible play in the joint",
      "grease sling on the undercarriage near a joint",
      "clunk on takeoff or when shifting from drive to reverse",
      "vibration at highway speed (50-70 mph) that increases with speed",
      "squeaking from the driveshaft area that changes with vehicle speed",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["clunk", "vibration"],
    inspectionTargets: ["transfer_case_and_driveshaft"],
  },
  differential_cover: {
    id: "differential_cover",
    label: "Differential Cover",
    aliases: partAliases("differential_cover", []),
    system: "drivetrain_4wd",
    summary:
      "Rear differential cover and housing on the 2010 F-150 rear axle (8.8-inch or 9.75-inch depending on configuration). The stamped steel cover seals with a gasket or RTV sealant and is the lowest point on the axle — it collects impacts from road debris and is the first place a gear oil leak shows up.",
    inspectionHints: [
      "Show the full cover edge and gasket seam from underneath.",
      "Look for wetness or fresh gear oil at the gasket seam — trace any trail upward.",
      "Check the cover for dents from road debris impact.",
      "Look at the pinion seal area where the driveshaft enters the differential — this is another common leak point.",
      "Sniff for gear oil smell — it has a distinctive sulfur-like odor different from engine oil.",
    ],
    warningSigns: [
      "wet gasket seam with fresh gear oil",
      "cover dent from road debris impact",
      "fresh leak trail from the pinion seal at the driveshaft entry",
      "low gear oil level causing a whine from the rear axle at speed",
      "gear oil puddle under the rear axle center",
      "sulfur smell from the rear axle area",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["leak", "vibration"],
    inspectionTargets: ["differential_cover_and_pinion"],
  },
  wheel_well_lip: {
    id: "wheel_well_lip",
    label: "Wheel Well Lip",
    aliases: partAliases("wheel_well_lip", []),
    system: "body",
    summary:
      "Wheel-arch lip and fender seam area on the 2010 F-150. The wheel well lip traps moisture, road salt, and debris, making it one of the first places rust appears on the body. Bubbling paint along the arch is surface rust pushing outward; once the edge perforates, structural patching or panel replacement is needed.",
    inspectionHints: [
      "Capture one close-up texture view of the affected area and one wider shot for location context.",
      "Look for bubbling or blistering paint — this is rust pushing up from underneath the paint.",
      "Check for flaking metal or perforation at the wheel arch edge.",
      "Inspect the seam where the inner fender meets the outer body panel for separation.",
      "Feel the backside of the wheel arch from inside the wheel well for hidden rust-through.",
    ],
    warningSigns: [
      "bubbling or blistering paint along the wheel arch",
      "flaking metal or rust scale at the arch edge",
      "edge perforation — you can see through the metal",
      "seam separation between inner and outer fender panels",
      "rust staining running down from the wheel arch",
      "soft or spongy metal when pressed from the inside",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["rust"],
    inspectionTargets: ["wheel_well_underbody", "frame_rust_and_seam"],
  },
  frame_section: {
    id: "frame_section",
    label: "Frame Section",
    aliases: partAliases("frame_section", []),
    system: "underbody",
    summary:
      "Fully boxed steel frame rail and underbody cross-member seam area on the 2010 F-150. The boxed frame traps moisture inside, and in salt-belt climates, internal corrosion can weaken the frame before it is visible externally. Inspect closely where brake lines, fuel lines, and wiring are clipped to the frame — corrosion here can damage critical systems.",
    inspectionHints: [
      "Show the frame seam and surrounding brackets from underneath.",
      "Look for heavy flaking rust scale — if you can poke through with a screwdriver, the frame is compromised.",
      "Check where brake and fuel lines are clipped to the frame — corrosion under the clips damages lines.",
      "Inspect cross-member welds and gusset plates for cracks or separation.",
      "Look for fresh undercoating or paint — sometimes used to hide frame rust before a sale.",
    ],
    warningSigns: [
      "heavy flaking rust scale on the frame rail",
      "seam separation at a frame weld or gusset plate",
      "brake or fuel line running through an area of heavy frame rust",
      "frame rail visibly thinner or perforated from corrosion",
      "fresh undercoating or paint applied over rust",
      "cross-member or body mount showing cracks or separation",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["rust", "leak"],
    inspectionTargets: ["frame_rust_and_seam", "wheel_well_underbody"],
  },
  engine_top_front: {
    id: "engine_top_front",
    label: "Engine Top Front",
    aliases: ["engine top", "top front of engine", "upper engine front"],
    system: "engine_mechanical",
    summary:
      "Top-front engine area on the 5.4 Triton, above the timing cover and between the valve covers. This is the key listening zone for separating internal engine noise (cam phasers, timing chain, valve train) from external belt-path noise. If the tick or rattle is loudest here rather than at the belt path, suspect timing-side issues.",
    inspectionHints: [
      "Hold a stethoscope or screwdriver handle against the top-front of the engine to isolate the noise source.",
      "Compare the sound intensity here versus at the front accessory drive — timing-side noise is loudest at the engine top.",
      "Listen at cold start versus warm — cam phaser rattle is loudest cold and fades warm.",
      "Look for oil leaks at the valve cover gaskets — oil weeping down from the covers pools at the front of the engine.",
      "Check the oil fill cap area for sludge buildup or milky residue.",
    ],
    warningSigns: [
      "tick or rattle strongest at the engine top rather than the belt path",
      "belt path noise does not match the timing or character of the tick",
      "cold-start rattle from this area that fades within seconds (cam phasers)",
      "persistent ticking that does not change with RPM (possible valve train issue)",
      "oil weep visible at the valve cover gasket line",
      "sludge visible at the oil fill cap",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["ticking", "rattle"],
    inspectionTargets: ["engine_top_timing_cover", "front_accessory_drive_path"],
  },
  cam_phaser_area: {
    id: "cam_phaser_area",
    label: "Cam Phaser / Timing Area",
    aliases: partAliases("cam_phaser_area", []),
    system: "timing_valvetrain",
    summary:
      "Timing-side upper-engine area. The 5.4 3V uses oil-pressure-driven cam phasers that famously rattle on cold start when worn or oil-starved — the signature 3V noise.",
    inspectionHints: [
      "Do not call it belt noise first if the strongest view is at the engine top.",
      "Ask for a cold-start vs warm comparison if the noise is short-lived.",
      "Check the VCT solenoid first — a stuck solenoid mimics phaser failure for a fraction of the cost.",
      "Check the oil level and condition — low oil or extended oil change intervals accelerate phaser wear.",
      "Use 5W-20 full synthetic oil only. The cam phasers are extremely sensitive to oil viscosity and quality.",
    ],
    warningSigns: [
      "sharp diesel-like rattle at cold start that fades within 5-15 seconds",
      "rattle that gets worse and starts lasting longer over weeks",
      "P0010 / P0020 / P0011 / P0021 cam timing codes",
      "rattle persists even after the engine is warm (advanced wear)",
      "reduced power or rough idle as phasers lose timing accuracy",
      "chainsaw-like sound from the upper engine at startup",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["ticking", "rattle"],
    inspectionTargets: ["engine_top_timing_cover", "front_accessory_drive_path"],
    healthyAppearance: {
      sound: [
        "no rattle from the upper engine at cold start",
        "smooth idle within 2-3 seconds of starting",
      ],
    },
    failingAppearance: {
      sound: [
        "diesel-like rattle from the top of the engine for 1-15 seconds at cold start",
        "rattle present even after the engine is warm in advanced stages",
      ],
    },
    failureModes: [
      {
        id: "cam_phaser_cold_start_rattle",
        name: "Cold-start cam phaser rattle (signature 5.4 3V failure)",
        cause:
          "Oil-pressure-driven cam phasers lose tension over time, especially when oil changes are stretched. At cold start, oil pressure isn't yet high enough to lock the phasers — they rattle until pressure builds.",
        symptoms: [
          "loud diesel-like rattle from the upper engine for 1-15 seconds at cold start",
          "rattle worsens in cold weather",
          "in advanced cases, rattle persists once the engine is warm",
          "may set P0010, P0020, P0011, or P0021 cam timing codes",
        ],
        severity: "medium",
        diyOrShop: "shop",
        knownWeakness: true,
        confidence: "field_knowledge",
        source:
          "field knowledge — verify before acting (drop a Ford TSB into sources/ford-tsbs/ to upgrade)",
      },
      {
        id: "cam_phaser_blamed_for_vct_solenoid",
        name: "Wrongly blamed phaser — actually a stuck VCT solenoid",
        cause:
          "A clogged or stuck VCT solenoid produces the same cold-start rattle for ~$50 in parts instead of a multi-thousand-dollar phaser job.",
        symptoms: [
          "same rattle as worn phasers, but typically more sudden in onset",
          "often correlates with stretched oil change intervals or sludge",
        ],
        severity: "medium",
        diyOrShop: "diy_with_care",
        knownWeakness: true,
        confidence: "field_knowledge",
        source: "field knowledge — verify before acting",
      },
    ],
  },
  timing_cover: {
    id: "timing_cover",
    label: "Timing Cover Area",
    aliases: ["timing cover", "front timing cover", "cover seam"],
    system: "timing_valvetrain",
    summary:
      "Front timing cover on the 5.4 Triton, a large aluminum casting that seals the timing chains, cam phasers, and VCT solenoids. The cover gasket and the water pump (which bolts to the timing cover) are common leak sources. A damp timing cover edge needs careful tracing upward to find the true origin.",
    inspectionHints: [
      "Show the cover edge and the surrounding engine surface together.",
      "Separate visual timing-area context from pulley-only context — the cover sits behind the pulleys.",
      "Look for coolant weeping from the water pump weep hole on the front of the timing cover.",
      "Check the cover-to-block gasket line for oil seepage.",
      "Look for a trail of oil or coolant running downward from the cover edge — trace it upward to the source.",
    ],
    warningSigns: [
      "tick or rattle concentrated at the timing cover area",
      "fresh wetness at the cover-to-block gasket edge",
      "coolant drip from the water pump weep hole on the timing cover",
      "oil seepage at the timing cover gasket line",
      "timing chain rattle that sounds like it is coming from inside the cover",
      "mixture of oil and coolant at the front of the engine (possible water pump internal failure)",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["ticking", "leak"],
    inspectionTargets: ["engine_top_timing_cover", "fluid_source_path"],
  },
  vct_solenoid: {
    id: "vct_solenoid",
    label: "VCT Solenoid",
    aliases: [
      "vct solenoid",
      "variable cam timing solenoid",
      "cam timing solenoid",
      "vct valve",
      "vvt solenoid",
      "vct 솔레노이드",
      "cam phaser solenoid",
    ],
    system: "timing_valvetrain",
    summary:
      "Oil-control solenoid that drives cam phasers on the 5.4 3V. Often the actual root cause of what owners blame on the phasers themselves.",
    inspectionHints: [
      "Locate on top of the front of each valve cover, with a single electrical connector.",
      "Check the connector seating and look for oil weeping from the solenoid body.",
      "Remove the solenoid and inspect the mesh screen at the tip — a clogged screen from sludgy oil is the most common failure.",
      "Try swapping driver and passenger VCT solenoids to see if the cam timing code follows the solenoid.",
      "Check oil condition on the dipstick — dark, sludgy oil strongly correlates with VCT solenoid problems.",
    ],
    warningSigns: [
      "oil weeping from the solenoid body or seal",
      "loose or corroded electrical connector on the solenoid",
      "P0010 / P0020 / cam timing fault codes",
      "cold-start rattle that mimics cam phaser failure",
      "rough idle when cold that smooths out once warm",
      "mesh screen at the solenoid tip visibly clogged with sludge",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["ticking", "rattle", "rough_idle", "misfire"],
    inspectionTargets: ["engine_top_timing_cover", "connector_fitment_and_corrosion"],
    failureModes: [
      {
        id: "vct_solenoid_oil_clog",
        name: "Stuck VCT solenoid from oil contamination",
        cause:
          "Old or sludgy oil clogs the small screen inside the solenoid. Common when oil change intervals have been stretched.",
        symptoms: [
          "cold-start cam phaser rattle that mimics a bad phaser",
          "P0010 or P0020 cam timing codes",
          "rough idle when cold",
        ],
        severity: "medium",
        diyOrShop: "diy_with_care",
        knownWeakness: true,
        confidence: "field_knowledge",
        source:
          "field knowledge — verify before acting (drop a TSB or repair video into sources/ to upgrade)",
      },
    ],
    serviceInterval: {
      note:
        "Not a scheduled-replacement item. Inspect any time you do a valve-cover-area service or chase a cam timing code.",
    },
  },
  fuel_pump_driver_module: {
    id: "fuel_pump_driver_module",
    label: "Fuel Pump Driver Module (FPDM)",
    aliases: [
      "fpdm",
      "fuel pump driver module",
      "fuel pump control module",
      "fuel pump driver",
      "fpdm 모듈",
    ],
    system: "fuel_air_metering",
    summary:
      "Frame-rail-mounted module that drives the in-tank fuel pump. Famously corrosion-prone on the 2010 F-150 because it sits above the spare tire and catches road spray.",
    inspectionHints: [
      "Drop the spare tire or look up above it from underneath the rear of the bed.",
      "Inspect the module case for white powder, swollen seams, or a corroded connector.",
      "Check the multi-pin connector for green corrosion — clean and apply dielectric grease as preventive maintenance.",
      "If the truck has intermittent no-start issues in rain or after a car wash, this module is the prime suspect.",
      "Relocation kits are available to move the FPDM inside the frame rail or bed — a common preventive upgrade.",
    ],
    warningSigns: [
      "white or green corrosion on the module case",
      "swollen or split case seam from water intrusion",
      "corroded multi-pin connector",
      "intermittent crank-no-start, especially in wet weather",
      "stalling that comes and goes with rain or humidity",
      "P1233 or P1235 fuel pump driver codes",
      "engine starts normally after the truck has dried out",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["dead_battery", "corrosion", "rough_idle"],
    inspectionTargets: ["frame_rust_and_seam", "connector_fitment_and_corrosion"],
    failureModes: [
      {
        id: "fpdm_corrosion_failure",
        name: "FPDM corrosion failure",
        cause:
          "The module sits above the spare tire in a road-spray zone. Water and salt eat the case and connector, eventually killing the fuel pump driver circuit.",
        symptoms: [
          "intermittent crank but no start",
          "stalling that comes and goes with rain",
          "P1233 or P1235 fuel pump driver codes",
          "engine starts after the truck has dried out",
        ],
        severity: "high",
        diyOrShop: "diy",
        knownWeakness: true,
        confidence: "field_knowledge",
        source: "field knowledge — verify before acting",
      },
    ],
  },
  iwe_solenoid_actuator: {
    id: "iwe_solenoid_actuator",
    label: "IWE 4WD Solenoid / Actuator",
    aliases: [
      "iwe",
      "integrated wheel end",
      "iwe solenoid",
      "iwe actuator",
      "4wd hub actuator",
      "front hub vacuum",
      "iwe 솔레노이드",
    ],
    system: "drivetrain_4wd",
    summary:
      "Vacuum system that locks and unlocks the front hubs on 4WD models. Solenoid lives in the engine bay; the actuators sit on the front hubs.",
    inspectionHints: [
      "Solenoid: small block with two vacuum lines and an electrical connector, usually on the firewall or near the upper engine.",
      "Actuators: round caps on the inboard side of each front wheel hub, with a single vacuum line each.",
      "Check vacuum lines for cracks, brittleness, or popped-off ends.",
      "Inspect the check valve in the vacuum line — a failed check valve lets vacuum bleed off and the hubs partially engage.",
      "The grinding is most noticeable at light throttle between 20-40 mph in 2WD — accelerating hard temporarily stops it because the hubs fully re-engage.",
    ],
    warningSigns: [
      "cracked or brittle vacuum lines at the hubs",
      "cracked check valve at the solenoid",
      "loud grinding from the front end on light throttle in 2WD",
      "grinding that gets worse after rain or a car wash",
      "grinding that stops when you accelerate hard (hubs fully re-engage)",
      "4WD indicator light behavior inconsistent with the selector position",
      "popping or clunking from the front hubs when engaging or disengaging 4WD",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["rattle", "vibration", "clunk"],
    inspectionTargets: ["transfer_case_and_driveshaft", "front_suspension_joint"],
    failureModes: [
      {
        id: "iwe_vacuum_leak",
        name: "IWE vacuum leak — partial hub disengagement",
        cause:
          "The front hubs are normally vacuum-locked OUT in 2WD. When a vacuum line, check valve, or actuator leaks, the hubs partially re-engage and grind on light throttle. Wet weather makes it worse because water gets into the system.",
        symptoms: [
          "loud grinding from the front end at light throttle in 2WD",
          "grinding that gets worse after rain",
          "no grinding when accelerating hard (because the hubs fully re-engage)",
        ],
        severity: "medium",
        diyOrShop: "diy_with_care",
        knownWeakness: true,
        confidence: "field_knowledge",
        source: "field knowledge — verify before acting",
      },
    ],
  },
  turbocharger: {
    id: "turbocharger",
    label: "Turbocharger",
    aliases: ["turbo", "turbocharger", "turbo unit", "twin turbo", "터보차저"],
    system: "turbo_boost",
    summary:
      "Twin turbochargers on the 3.5L EcoBoost, one per bank, mounted to the exhaust manifolds inside the engine valley. The turbos use journal bearings fed by pressurized engine oil. Bearing wear causes shaft play, oil leaks past the compressor or turbine seals, and eventual compressor wheel contact with the housing.",
    inspectionHints: [
      "Check the turbo inlet and outlet pipes for oil residue — oil mist indicates a compressor seal leak.",
      "Listen for metallic scraping that increases with RPM — this indicates compressor wheel contact.",
      "Inspect the wastegate actuator arm for free movement — a seized arm changes boost behavior.",
      "Check the exhaust at the turbo-to-manifold flange for soot traces indicating an exhaust leak.",
      "Pull the turbo inlet pipe and check for shaft play by hand — any side-to-side movement is abnormal.",
    ],
    warningSigns: [
      "oil residue at turbo inlet or outlet pipe",
      "metallic scraping or grinding noise from the turbo area",
      "blue or white smoke from exhaust under boost",
      "excessive oil consumption between changes",
      "shaft play felt when checking by hand",
      "boost pressure lower than expected",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["turbo_whine", "boost_loss", "oil_consumption", "blue_smoke"],
    inspectionTargets: ["turbo_and_wastegate", "turbo_oil_lines"],
  },
  intercooler: {
    id: "intercooler",
    label: "Intercooler",
    aliases: ["intercooler", "charge air cooler", "CAC", "인터쿨러"],
    system: "turbo_boost",
    summary:
      "Air-to-air intercooler on the 3.5L EcoBoost, mounted at the front of the truck behind the grille. Cools compressed air from the turbos before it enters the intake manifold. Condensation buildup is a known EcoBoost issue in humid conditions — Ford TSB 14-0130 addresses this with a revised intercooler and catch drain.",
    inspectionHints: [
      "Check the intercooler end tanks for cracks or seepage — especially at the plastic-to-aluminum seam.",
      "Look at the bottom of the intercooler for pooled oil — compressor seal leaks deposit oil here over time.",
      "Inspect the silicone boots and clamps at both inlet and outlet — loose clamps cause boost leaks.",
      "In humid climates, condensation stumble on first hard acceleration is normal and clears quickly.",
      "Check the intercooler drain valve if the TSB revision has been applied.",
    ],
    warningSigns: [
      "cracked end tank at plastic-to-aluminum seam",
      "oil pooled at the bottom of the intercooler",
      "loose or blown silicone boot",
      "stumble on first hard acceleration in humid weather",
      "visible damage to the intercooler core fins from road debris",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["boost_loss", "stumble", "white_smoke"],
    inspectionTargets: ["intercooler_and_piping"],
  },
  wastegate: {
    id: "wastegate",
    label: "Wastegate / Actuator",
    aliases: ["wastegate", "wastegate actuator", "boost control", "wastegate valve", "웨이스트게이트"],
    system: "turbo_boost",
    summary:
      "Internal wastegate built into each turbo on the 3.5L EcoBoost, controlled by an electronic actuator. The wastegate bypasses exhaust around the turbine wheel to regulate boost pressure. Actuator failure causes overboost or underboost conditions.",
    inspectionHints: [
      "Check the wastegate actuator arm for free movement — push gently on the rod with the engine off.",
      "A seized actuator arm often results in P0234 (overboost) or P0299 (underboost) codes.",
      "Listen for wastegate rattle at idle — a worn pivot pin allows the flap to vibrate.",
      "Inspect the actuator electrical connector for corrosion — heat from the turbo area damages connectors.",
      "Wastegate rattle is a known EcoBoost characteristic; it is annoying but not always failure.",
    ],
    warningSigns: [
      "wastegate rattle at idle (metallic tapping from turbo area)",
      "P0234 overboost or P0299 underboost codes",
      "seized actuator arm — no free movement",
      "corroded actuator connector",
      "boost surging or inconsistent power delivery",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["turbo_whine", "boost_loss", "rattle"],
    inspectionTargets: ["turbo_and_wastegate"],
  },
  turbo_oil_feed_line: {
    id: "turbo_oil_feed_line",
    label: "Turbo Oil Feed Line",
    aliases: ["turbo oil feed", "turbo oil supply", "turbo oil line feed", "터보 오일 피드"],
    system: "turbo_boost",
    summary:
      "Pressurized oil feed line from the engine block to the top of each turbocharger on the 3.5L EcoBoost. Supplies lubrication and cooling oil to the turbo journal bearings. A restricted or leaking feed line starves the bearings and causes rapid turbo failure.",
    inspectionHints: [
      "Trace the line from the engine block fitting to the turbo — look for oil seepage at the banjo bolt fittings.",
      "Check for kinks or crushing from nearby components or poor routing after prior service.",
      "A restricted feed line causes turbo bearing starvation — the turbo whines, then fails.",
      "Inspect the banjo bolt crush washers — reusing old washers causes leaks.",
      "If the turbo has been replaced, verify the feed line was flushed to remove debris.",
    ],
    warningSigns: [
      "oil drip at the feed line banjo fitting",
      "kinked or crushed line from poor routing",
      "turbo whine after oil change (possible air in line)",
      "turbo bearing failure shortly after line service",
      "carbon buildup at the line connection to the turbo",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["oil_consumption", "turbo_whine", "blue_smoke"],
    inspectionTargets: ["turbo_oil_lines", "turbo_and_wastegate"],
  },
  turbo_oil_return_line: {
    id: "turbo_oil_return_line",
    label: "Turbo Oil Return Line",
    aliases: ["turbo oil return", "turbo oil drain", "turbo drain line", "터보 오일 리턴"],
    system: "turbo_boost",
    summary:
      "Gravity-drain oil return line from the bottom of each turbocharger back to the engine block on the 3.5L EcoBoost. A restricted or kinked return line causes oil to back up into the turbo and leak past the seals into the intake or exhaust. This is a common cause of turbo oil consumption that is often misdiagnosed as turbo seal failure.",
    inspectionHints: [
      "The return line runs from the bottom of the turbo to the block — it relies on gravity, so any restriction or upward kink traps oil.",
      "Check for kinks, crushing, or carbon buildup inside the line at the turbo connection.",
      "A restricted return line causes oil to back up and leak past turbo seals — fix the line before replacing the turbo.",
      "Look for oil weeping at the return line connection to the block.",
      "If the truck is consuming oil with no turbo whine, a restricted return line is more likely than bearing failure.",
    ],
    warningSigns: [
      "oil weeping at the return line connection",
      "kinked or poorly routed return line",
      "oil consumption without turbo noise (return line restriction)",
      "blue smoke at startup that clears (oil pooled in turbo overnight)",
      "carbon or sludge buildup inside the return line",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["oil_consumption", "blue_smoke"],
    inspectionTargets: ["turbo_oil_lines"],
  },
  charge_pipe: {
    id: "charge_pipe",
    label: "Charge Pipe",
    aliases: ["charge pipe", "boost pipe", "intercooler pipe", "turbo charge pipe", "차지 파이프"],
    system: "turbo_boost",
    summary:
      "Pressurized pipes and silicone couplers that route compressed air from the turbo outlets through the intercooler and into the intake manifold on the 3.5L EcoBoost. The OEM passenger-side charge pipe is made of plastic and is a well-known failure point — it cracks under boost pressure and causes sudden power loss with a P0299 code. Many owners upgrade to aluminum aftermarket charge pipes as a preventive measure.",
    inspectionHints: [
      "The passenger-side OEM plastic charge pipe is the #1 boost-leak failure point on the EcoBoost.",
      "Inspect all silicone coupler clamps — a loose clamp is the cheapest possible boost-leak fix.",
      "Look for oil residue or soot at pipe joints — pressurized air escaping carries oil mist with it.",
      "Check for hairline cracks in the plastic pipes — they may only open under boost pressure.",
      "If the truck has had a sudden power-loss event, the charge pipe is the first thing to check.",
    ],
    warningSigns: [
      "cracked plastic charge pipe",
      "blown silicone coupler boot",
      "loose T-bolt clamp on a boost connection",
      "P0299 underboost code",
      "sudden power loss that resets after restart",
      "hissing under boost from the engine bay",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["boost_loss", "turbo_whine"],
    inspectionTargets: ["intercooler_and_piping"],
  },
  blow_off_valve: {
    id: "blow_off_valve",
    label: "Blow-Off Valve / Bypass Valve",
    aliases: ["blow off valve", "bov", "bypass valve", "compressor bypass", "블로우오프 밸브"],
    system: "turbo_boost",
    summary:
      "Compressor bypass valve (factory calls it a bypass valve, aftermarket calls it a BOV) on the 3.5L EcoBoost. Vents excess boost pressure back into the intake when the throttle closes suddenly. A leaking or stuck-open bypass valve causes boost loss and a lazy throttle response. The OEM valve is a recirculating type — aftermarket venting BOVs are louder but can cause issues with the MAF sensor.",
    inspectionHints: [
      "The OEM bypass valve is on the charge pipe near the throttle body — check for cracks or a stuck diaphragm.",
      "A leaking bypass valve causes gradual boost loss and sluggish response, not a sudden failure.",
      "Aftermarket venting BOVs can cause rich running or stalling because metered air escapes to atmosphere.",
      "Check the vacuum line to the valve for cracks or disconnection.",
      "Listen for a constant hiss at idle near the valve — this indicates a diaphragm leak.",
    ],
    warningSigns: [
      "constant hiss from the bypass valve area at idle",
      "sluggish boost response or slow spool",
      "aftermarket BOV causing stalling or rich codes",
      "cracked valve body or housing",
      "vacuum line to valve disconnected or cracked",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["boost_loss", "turbo_whine"],
    inspectionTargets: ["intercooler_and_piping"],
  },
  high_pressure_fuel_pump: {
    id: "high_pressure_fuel_pump",
    label: "High-Pressure Fuel Pump (HPFP)",
    aliases: ["hpfp", "high pressure fuel pump", "direct injection pump", "fuel pump ecoboost", "고압 연료펌프"],
    system: "engine_mechanical",
    summary:
      "Cam-driven high-pressure fuel pump on the 3.5L EcoBoost that pressurizes fuel to 2,000+ PSI for the direct injectors. Mounted on top of the engine and driven by a dedicated cam lobe. A failing HPFP causes long cranking, stumble under load, and eventual no-start. The pump tick is normal — but an abnormally loud tick or fuel pressure fault codes indicate wear.",
    inspectionHints: [
      "The HPFP sits on top of the engine between the valve covers — look for fuel seepage at the pump body.",
      "Normal HPFP tick is a light, regular tapping — abnormally loud or irregular ticking indicates wear.",
      "Check for fuel pressure fault codes (P0087, P0088, P228D) — these point directly to HPFP issues.",
      "Long crank times (4-5 seconds to start) with no other symptoms often indicate early HPFP failure.",
      "Inspect the cam follower (bucket) under the pump — a worn or pitted follower causes low fuel pressure.",
    ],
    warningSigns: [
      "long crank time before starting",
      "stumble or power loss under heavy load",
      "fuel pressure fault codes (P0087, P0088, P228D)",
      "abnormally loud ticking from the top of the engine",
      "fuel seepage at the pump body or rail connection",
      "engine stalling under boost at high fuel demand",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["stumble", "rough_idle", "ticking"],
    inspectionTargets: ["engine_top_timing_cover"],
  },
  direct_injector: {
    id: "direct_injector",
    label: "Direct Injector (EcoBoost)",
    aliases: ["direct injector", "di injector", "ecoboost injector", "fuel injector ecoboost", "직분사 인젝터"],
    system: "engine_mechanical",
    summary:
      "High-pressure direct fuel injectors on the 3.5L EcoBoost that spray fuel directly into the combustion chamber at 2,000+ PSI. The injectors fire with extreme precision and are more failure-sensitive than port injectors. A leaking or stuck injector causes rough idle, misfire, and can wash the cylinder bore with fuel, diluting the oil.",
    inspectionHints: [
      "Direct injector tick is normal on the EcoBoost — it is a rapid, light ticking at idle.",
      "A dead or stuck injector shows as a single-cylinder misfire code (P0301-P0306).",
      "Fuel smell from the oil dipstick may indicate an injector leaking fuel into the cylinder and past the rings.",
      "Check the injector electrical connectors for corrosion or looseness.",
      "Direct injectors cannot be easily inspected without removal — diagnosis is usually by code and injector balance test.",
    ],
    warningSigns: [
      "single-cylinder misfire code (P0301-P0306)",
      "fuel smell from the oil dipstick (fuel dilution)",
      "rough idle that isolates to one cylinder",
      "injector connector corrosion or looseness",
      "oil level rising between changes (fuel dilution)",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["misfire", "rough_idle", "stumble"],
    inspectionTargets: ["coil_and_plug_well", "connector_fitment_and_corrosion"],
  },
  oil_catch_can: {
    id: "oil_catch_can",
    label: "Oil Catch Can",
    aliases: ["catch can", "oil separator", "pcv catch can", "오일 캐치캔"],
    system: "engine_mechanical",
    summary:
      "Aftermarket oil catch can installed in the PCV system line on the 3.5L EcoBoost to intercept oil vapor before it reaches the intake. Not a factory part — commonly added by EcoBoost owners to reduce intake valve carbon buildup from direct injection. Requires periodic draining. Does not eliminate carbon buildup entirely but slows the rate.",
    inspectionHints: [
      "If fitted, check the catch can level — a full can stops catching oil and defeats the purpose.",
      "Verify the can is installed in the correct PCV line — the intake manifold side, not the fresh air side.",
      "Check hose connections for leaks or loose clamps — a loose catch can hose creates a vacuum leak.",
      "Drain the can every oil change interval at minimum.",
      "If the catch can is collecting large amounts of oil, investigate the PCV system and turbo seals.",
    ],
    warningSigns: [
      "catch can overfull and no longer separating oil",
      "hose connections loose or cracked",
      "vacuum leak from a poorly sealed catch can installation",
      "large oil volume in catch can (may indicate PCV or turbo seal issue)",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["oil_consumption", "rough_idle"],
    inspectionTargets: ["engine_top_timing_cover"],
  },
  pcv_valve: {
    id: "pcv_valve",
    label: "PCV Valve",
    aliases: ["pcv", "pcv valve", "positive crankcase ventilation", "pcv 밸브"],
    system: "engine_mechanical",
    summary:
      "Positive crankcase ventilation valve on the 3.5L EcoBoost that regulates crankcase pressure by venting oil vapors back into the intake. On the EcoBoost, a stuck-open PCV valve allows too much oil vapor into the intake, accelerating carbon buildup on the intake valves. A stuck-closed PCV valve increases crankcase pressure and pushes oil past seals. The PCV system on the EcoBoost is integrated into the valve cover on some model years.",
    inspectionHints: [
      "On some EcoBoost model years, the PCV valve is built into the valve cover — not a separate replaceable part.",
      "Check the PCV hose for collapse or swelling — this indicates a stuck or clogged valve.",
      "A stuck-closed PCV increases crankcase pressure and pushes oil past turbo seals and gaskets.",
      "A stuck-open PCV pulls too much oil vapor into the intake, increasing carbon buildup.",
      "Listen for a hiss at the PCV area — this may indicate a cracked valve or hose.",
    ],
    warningSigns: [
      "PCV hose collapsed or swollen",
      "oil seepage at valve cover gaskets (excess crankcase pressure)",
      "increased oil consumption without turbo whine",
      "rough idle from vacuum leak at PCV hose",
      "oil vapors or mist visible at the oil fill cap when running",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["oil_consumption", "rough_idle", "hiss"],
    inspectionTargets: ["engine_top_timing_cover"],
  },
  water_pump_internal: {
    id: "water_pump_internal",
    label: "Water Pump (Internal / EcoBoost)",
    aliases: ["water pump", "internal water pump", "ecoboost water pump", "coolant pump", "워터펌프"],
    system: "cooling",
    summary:
      "On the 3.5L EcoBoost, the water pump is driven by the timing chain inside the front timing cover — not by the serpentine belt like the 5.4. This means a water pump failure requires significant disassembly and is often done alongside a timing chain service. A leaking water pump on the EcoBoost shows as coolant weeping from the timing cover area or a slow coolant loss with no visible external source.",
    inspectionHints: [
      "The EcoBoost water pump is internal — coolant leaks from it appear at the timing cover seam, not a weep hole.",
      "Slow coolant loss with no visible hose or reservoir leak may indicate an internal water pump seal failure.",
      "Check the timing cover seam for coolant residue — this is the most visible sign of internal pump leakage.",
      "An internal pump replacement is a major job — it is usually combined with timing chain service.",
      "Do not confuse timing cover coolant seepage with thermostat housing or hose leaks — trace to the highest wet point.",
    ],
    warningSigns: [
      "coolant residue at the timing cover seam",
      "slow coolant loss with no visible external leak",
      "coolant mixing with oil (worst case — pump seal failure into the oil system)",
      "overheating with full coolant level (pump impeller failure)",
      "timing cover area wetness that is not from a hose or housing",
    ],
    likelyRecommendation: "SHOP_REQUIRED",
    commonSymptoms: ["leak", "coolant_smell"],
    inspectionTargets: ["engine_top_timing_cover", "fluid_source_path"],
  },
  tailgate: {
    id: "tailgate",
    label: "Tailgate",
    aliases: ["tailgate", "truck tailgate", "rear gate", "테일게이트"],
    system: "bed_cargo",
    summary:
      "F-150 tailgate assembly including the outer panel, inner structure, latch mechanism, hinge pins, and support system (cables or damper struts). High-mileage tailgates develop hinge pin wear causing sag, latch mechanism looseness causing rattle, and cable fraying at the anchor points. The tailgate handle and lock cylinder can also seize from corrosion.",
    inspectionHints: [
      "Open the tailgate and check for sag — compare the gap between the tailgate and bed side at each hinge.",
      "Inspect the hinge pins for wear — worn pins allow the tailgate to drop unevenly.",
      "Check the latch engagement at the top — a worn latch allows the tailgate to rattle while driving.",
      "Inspect the handle and lock cylinder for smooth operation — corrosion seizes these over time.",
      "Look at the tailgate step (if equipped) for structural cracks or loose mounting hardware.",
    ],
    warningSigns: [
      "tailgate sags to one side when open",
      "rattle from the tailgate while driving",
      "latch does not engage fully — tailgate feels loose when closed",
      "handle or lock cylinder stiff or seized",
      "tailgate step wobbly or cracked at mounting points",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["rattle", "clunk"],
    inspectionTargets: ["tailgate_hinge_and_cable"],
  },
  bed_floor: {
    id: "bed_floor",
    label: "Bed Floor",
    aliases: ["bed floor", "truck bed floor", "cargo floor", "bed sheet metal", "적재함 바닥"],
    system: "bed_cargo",
    summary:
      "Steel bed floor panel on the F-150. Susceptible to rust from trapped water under the bed liner, clogged drain holes, and road spray attacking the underside. The cross-sills that support the bed floor are also rust-prone. Drain plugs at the front corners should be kept clear to allow water to exit.",
    inspectionHints: [
      "Remove or lift the bed liner to inspect the floor underneath — liners trap moisture and hide rust.",
      "Check the drain holes at the front corners of the bed — clogged drains trap water and accelerate floor rust.",
      "Inspect the cross-sills from underneath — these structural supports rust from road spray.",
      "Look for soft spots or bubbling paint on the bed floor — these indicate rust-through from below.",
      "Check the bed bolt areas where the bed mounts to the frame — corrosion here weakens the bed attachment.",
    ],
    warningSigns: [
      "rust bubbling through the bed floor surface",
      "soft or spongy spots in the bed floor",
      "clogged drain holes with standing water",
      "cross-sill corrosion visible from underneath",
      "bed liner concealing advanced rust",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["rust"],
    inspectionTargets: ["bed_floor_and_drain", "bed_wheel_well_rust"],
  },
  bed_tie_down: {
    id: "bed_tie_down",
    label: "Bed Tie-Down",
    aliases: ["tie down", "bed cleat", "cargo hook", "tie down hook", "타이다운"],
    system: "bed_cargo",
    summary:
      "Cargo tie-down hooks and cleats in the F-150 bed. Factory tie-downs include fixed cleats and optional Boxlink cleats that slide in channels. The mounting hardware can loosen or corrode, and the tie-down points can bend from overloading. Checking tie-down condition matters because a failed anchor under load is a safety concern.",
    inspectionHints: [
      "Check each tie-down for looseness by pulling firmly — loose hardware needs tightening or replacement.",
      "Inspect the mounting area for rust around the tie-down bolt holes.",
      "On trucks with Boxlink cleats, check the channel for debris or corrosion that prevents sliding.",
      "Look for bent or deformed tie-down hooks — these indicate overloading and should be replaced.",
      "Verify that the tie-down hardware is tight against the bed floor, not spinning freely.",
    ],
    warningSigns: [
      "tie-down spins freely in the bed floor (stripped or loose mounting)",
      "bent or deformed hook from overloading",
      "rust around the mounting bolt holes",
      "Boxlink cleat stuck in channel from corrosion",
      "missing tie-down hardware",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["rattle", "rust"],
    inspectionTargets: ["bed_floor_and_drain"],
  },
  tonneau_cover: {
    id: "tonneau_cover",
    label: "Tonneau Cover",
    aliases: ["tonneau", "bed cover", "truck bed cover", "tonneau cover", "토노커버"],
    system: "bed_cargo",
    summary:
      "Bed cover (tonneau) on the F-150, available in soft roll-up, hard folding, and retractable styles. Inspecting the tonneau matters because a leaking or poorly sealed cover traps moisture in the bed and accelerates bed floor rust. Clamp hardware and seal condition are the main inspection points.",
    inspectionHints: [
      "Check the seal condition along the bed rails — cracked or compressed seals allow water into the bed.",
      "Inspect the clamp hardware that secures the cover to the bed rail — loose clamps cause rattling and water intrusion.",
      "On hard folding covers, check the hinge pins and panel seals for wear.",
      "On retractable covers, check the canister drain for clogs — water backs up and enters the bed.",
      "Look for standing water under the cover after rain — this indicates a seal failure.",
    ],
    warningSigns: [
      "cracked or compressed rail seals",
      "loose clamp hardware causing rattle",
      "standing water under the cover after rain",
      "hard cover panel warping or misalignment",
      "retractable cover track binding or sticking",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["rattle", "leak"],
    inspectionTargets: ["bed_floor_and_drain"],
  },
  bed_liner: {
    id: "bed_liner",
    label: "Bed Liner",
    aliases: ["bed liner", "drop-in liner", "spray-in liner", "bedliner", "베드라이너"],
    system: "bed_cargo",
    summary:
      "Drop-in or spray-in bed liner on the F-150. Drop-in liners can trap water and debris between the liner and the bed floor, accelerating rust. Spray-in liners adhere directly to the metal and are less prone to trapping moisture, but can crack or delaminate over time. Inspecting what is under a drop-in liner is critical on high-mileage trucks.",
    inspectionHints: [
      "On trucks with drop-in liners: remove or lift the liner to inspect the bed floor underneath — this is critical.",
      "Look for water or debris trapped between the liner and bed floor — this causes hidden rust.",
      "On spray-in liners, check for cracks, peeling, or delamination that expose bare metal.",
      "Inspect around the drain plug areas where moisture concentrates.",
      "A clean-looking drop-in liner can hide severe bed floor rust — always check underneath.",
    ],
    warningSigns: [
      "water or debris trapped under a drop-in liner",
      "rust visible at the edges where the liner meets the bed floor",
      "spray-in liner cracking or peeling from the metal surface",
      "bed floor soft or spongy under the liner",
      "musty or damp smell when lifting the liner edge",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["rust"],
    inspectionTargets: ["bed_floor_and_drain"],
  },
  tailgate_damper: {
    id: "tailgate_damper",
    label: "Tailgate Damper / Assist Strut",
    aliases: ["tailgate damper", "tailgate strut", "tailgate assist", "gate damper", "테일게이트 댐퍼"],
    system: "bed_cargo",
    summary:
      "Gas-charged damper struts or assist springs that control the tailgate lowering speed on the F-150. Factory trucks use cables, but many owners add aftermarket damper struts for a controlled drop. A failing damper loses gas charge and allows the tailgate to drop fast. On trucks with factory assist, worn cables fray and can snap under load.",
    inspectionHints: [
      "Open the tailgate slowly and feel for resistance — a good damper provides smooth, controlled movement.",
      "A tailgate that drops fast or slams open has a dead damper strut or broken cable.",
      "Check the mounting hardware at both ends of the damper for looseness or corrosion.",
      "On aftermarket struts, verify the ball stud mounts are tight and the strut body is not leaking oil.",
      "Factory cable-type assists: check for fraying at the anchor point inside the bed side panel.",
    ],
    warningSigns: [
      "tailgate drops fast when released (dead damper)",
      "oil leaking from the damper strut body",
      "loose or corroded mounting hardware",
      "frayed cable at the anchor point",
      "tailgate bounces at the end of travel (weak damper)",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["clunk"],
    inspectionTargets: ["tailgate_hinge_and_cable"],
  },
  tailgate_cable: {
    id: "tailgate_cable",
    label: "Tailgate Cable",
    aliases: ["tailgate cable", "gate cable", "tailgate support cable", "테일게이트 케이블"],
    system: "bed_cargo",
    summary:
      "Steel support cables that limit tailgate travel and bear the load when the tailgate is open on the F-150. The cables attach at anchor points inside the bed side panels and to the tailgate body. Over time the cables fray at the anchor points, stretch, or snap — allowing the tailgate to drop beyond its stop and potentially damage the hinges.",
    inspectionHints: [
      "Open the tailgate and inspect each cable at the anchor point — fraying starts here.",
      "Check cable tension with the tailgate open — both cables should be equally taut.",
      "A cable that has stretched allows the tailgate to hang lower on one side.",
      "If one cable has snapped, do not use the tailgate until replaced — the remaining cable and hinges carry double load.",
      "Inspect the anchor hardware inside the bed side panel for corrosion or looseness.",
    ],
    warningSigns: [
      "frayed strands at the cable anchor point",
      "one cable visibly looser than the other",
      "tailgate hangs unevenly when open",
      "cable snapped — tailgate drops past stop",
      "anchor hardware corroded or pulling through",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["clunk", "rattle"],
    inspectionTargets: ["tailgate_hinge_and_cable"],
  },
  tailgate_latch: {
    id: "tailgate_latch",
    label: "Tailgate Latch",
    aliases: ["tailgate latch", "gate latch", "tailgate lock", "tailgate striker", "테일게이트 래치"],
    system: "bed_cargo",
    summary:
      "Latch mechanism at the top center of the F-150 tailgate that engages with strikers on the bed to hold the tailgate closed. The latch is operated by the tailgate handle and can be locked with the key or power locks. Wear, corrosion, or misalignment causes the latch to not engage fully, resulting in a loose or rattling tailgate.",
    inspectionHints: [
      "Close the tailgate and check for any play or rattle — push and pull on the closed tailgate to feel for latch slop.",
      "Inspect the latch mechanism for corrosion or debris that prevents full engagement.",
      "Check the striker on the bed side for wear or misalignment — adjustable strikers can be repositioned.",
      "Lubricate the latch mechanism and handle linkage with white lithium grease.",
      "On power-lock-equipped trucks, verify the latch actuator operates — listen for a click when pressing the lock button.",
    ],
    warningSigns: [
      "tailgate rattles when closed — latch not fully engaging",
      "tailgate pops open over bumps — latch worn or misaligned",
      "handle feels loose or does not return to center",
      "latch corroded or jammed with debris",
      "power lock actuator not engaging (no click)",
    ],
    likelyRecommendation: "INSPECT_ONLY",
    commonSymptoms: ["rattle", "clunk"],
    inspectionTargets: ["tailgate_hinge_and_cable"],
  },
};

const SYSTEM_EXTRA_HINTS: Partial<Record<TruckSystemId, string[]>> = {
  accessory_drive: [
    "Start with one wide engine-front frame before zooming into a single pulley.",
    "A paint pen or chalk line on the belt edge helps show belt walk after a short run.",
    "Use a flashlight from the side to catch wobble, dust, or edge fray.",
  ],
  battery_ground: [
    "Wiggle only with the engine off and key out; look for movement between clamp and post.",
    "Check both the visible connection and the nearby tray or hold-down, not just the cable end.",
    "A small wire brush and 10 mm wrench handle most inspection-level cleanup here.",
  ],
  body: [
    "Take one close texture shot and one wider location shot so rust or housing damage has context.",
    "Look at the seams and mounting tabs, not only the visible outer face.",
    "Use side lighting to reveal cracks, bubbling paint, or separation lines.",
  ],
  brakes: [
    "Do not touch wet brake parts with bare hands until you know the fluid source.",
    "Look where the hose flexes and where clips hold it to the bracket; those spots fail first.",
    "Use a clean rag to confirm whether wetness is fresh brake fluid or road grime.",
  ],
  charging: [
    "Compare pulley alignment to the full belt route before blaming one component.",
    "If the complaint is low charging, inspect both the alternator area and the battery/ground path.",
    "A multimeter is useful, but visual belt and connector checks come first.",
  ],
  connectors_harness: [
    "Show the latch side, pin side, and strain relief in separate stable views if needed.",
    "Use a trim pick or small screwdriver only to inspect the lock tab gently; do not pry blindly.",
    "Look for green corrosion deep in the connector mouth, not just on the outside shell.",
  ],
  cooling: [
    "Trace residue upward to the highest dry-to-wet transition instead of focusing on the lowest drip.",
    "Use a paper towel on the seam or clamp to tell old crust from fresh seepage.",
    "Check plastic seams and hose necks after the truck cools down; do not open a hot system.",
  ],
  drivetrain_4wd: [
    "Look for sling patterns, not just wetness, because rotating parts throw grease outward.",
    "Check nearby brackets and shields so driveline leaks are not confused with road grime.",
    "A slow crawl under the truck with a flashlight gives better context than one tight close-up.",
  ],
  electrical: [
    "Heat damage usually starts at the highest-resistance point, so compare the terminal body to the wire entry.",
    "Lightly tug each wire with the connector unplugged to catch backed-out terminals.",
    "Inspect for discoloration, not just corrosion; browned plastic often matters more.",
  ],
  engine_mechanical: [
    "Compare the engine-top area with the front accessory drive before you name the noise source.",
    "Use a cold-start check when possible; several 5.4 issues are loudest in the first seconds.",
    "Follow the wet path or sound path to the strongest source instead of the easiest thing to see.",
  ],
  exhaust_emissions: [
    "Look for soot or heat discoloration; both point to gas escaping or a loose shield.",
    "Inspect fasteners and flanges before assuming the converter itself is bad.",
    "Cold-start observations matter because manifold leaks and shield noises change with heat.",
  ],
  fuel_air_metering: [
    "Check the connector and duct sealing before jumping to internal fuel-system conclusions.",
    "Use what is actually visible first; intake and meter faults often masquerade as ignition problems.",
    "A scan tool helps, but the first pass should still verify air leaks, clamps, and plug fit.",
  ],
  ignition: [
    "Pull the coil only after blowing dirt out of the plug well so debris does not fall into the cylinder.",
    "If the complaint is one-cylinder misfire, compare that cylinder visually with its neighbor.",
    "Oil in the well matters on this engine because it attacks the boot and causes arcing.",
  ],
  intake_vacuum: [
    "Flex the hose or coupler by hand with the engine off; cracks often open on the underside first.",
    "Use a mirror or phone light to inspect the backside of the duct where splits hide.",
    "A hiss complaint should stay tied to a visible hose or coupler until proven otherwise.",
  ],
  lighting: [
    "Inspect the bulb, socket, and housing together because lamp faults often damage more than one piece.",
    "Look for melted plastic around the high-heat terminals, not just at the bulb glass.",
    "Moisture lines inside the lens help separate housing leaks from socket-only faults.",
  ],
  suspension_steering: [
    "Check boots, rust dust, and bushing shift before you assume internal play.",
    "A pry bar can reveal play, but the first pass is still a visual boot and mount check.",
    "Capture one wheel-end close-up and one wider arm-to-frame view for context.",
  ],
  timing_valvetrain: [
    "Cold-start behavior matters; 5.4 timing complaints often change after oil pressure comes up.",
    "Compare engine-top noise with exhaust and accessory-drive areas before blaming timing parts.",
    "Keep the language cautious unless the top-engine source stays dominant in repeated views.",
  ],
  underbody: [
    "Use one close texture shot and one wide location shot so corrosion severity has context.",
    "Tap lightly with a pick or screwdriver only after the area is clearly identified and safe to reach.",
    "Look for nearby brake or fuel lines before calling rust cosmetic.",
  ],
};

const SYSTEM_EXTRA_WARNING_SIGNS: Partial<Record<TruckSystemId, string[]>> = {
  accessory_drive: ["belt glazing", "alignment drift", "dust around a rotating component"],
  battery_ground: ["heat-discolored clamp", "swollen insulation", "acid staining on the tray"],
  body: ["hidden seam rust", "broken mounting ear", "water path stains"],
  brakes: ["wet fitting", "kinked hose", "deep rust pitting near a bracket"],
  charging: ["intermittent charge warning", "hot cable end", "pulleys not running in one plane"],
  connectors_harness: ["backed-out terminal", "brittle latch", "insulation rubbed through"],
  cooling: ["dried white crust", "plastic seam staining", "sprayed coolant path"],
  drivetrain_4wd: ["thrown grease", "wet seal lip", "rust dust around a rotating joint"],
  electrical: ["brown plastic", "arcing marks", "stiff or brittle wire insulation"],
  engine_mechanical: ["source strongest at one area", "fresh oil tracking", "noise that changes sharply with heat"],
  exhaust_emissions: ["soot trace", "shield buzz", "heat-baked connector or wire"],
  fuel_air_metering: ["loose air duct", "broken connector lock", "vacuum leak next to the complaint"],
  ignition: ["carbon tracking", "oil in well", "heat-brittle boot or connector"],
  intake_vacuum: ["collapsed hose", "unmetered air path", "split at clamp edge"],
  lighting: ["melted terminal cavity", "water line in housing", "burned pigtail"],
  suspension_steering: ["boot split", "grease purge", "shifted bushing or mount"],
  timing_valvetrain: ["cold-start rattle", "cam timing code history", "persistent top-engine tick"],
  underbody: ["flaking scale", "perforation starting at a seam", "corrosion near a line or bracket"],
};

const PART_SUMMARY_EXTENSIONS: Partial<Record<TruckPartId, string>> = {
  belt:
    "On the 5.4 Triton it also gives you early clues about tensioner, idler, alternator, water pump, and fan-clutch problems because all of those show up first as belt tracking, dust, or edge wear.",
  tensioner:
    "When the spring weakens or the pivot wears, the arm chatters and the belt starts to walk, so this part is often the real cause behind a 'bad pulley' complaint.",
  idler_pulley:
    "On this truck a rough idler bearing can sound like a much deeper engine problem until you get a straight-on view of the pulley face and dust pattern.",
  alternator_area:
    "It matters on this truck because charging complaints, pulley wobble, and belt-path noise often overlap in the same visual area.",
  front_accessory_drive:
    "This broad view matters because the 5.4 front engine can mimic a single bad pulley when the real issue is a wider alignment, water-pump, or tensioner problem.",
  battery:
    "On an older F-150, the battery area also tells you a lot about tray corrosion, hold-down neglect, and cable-end damage from years of acid vapor and vibration.",
  ground_point:
    "Bad grounds on a high-mile 5.4 can create charging, idle-quality, and strange electrical complaints that look unrelated until the cable end is inspected closely.",
  coolant_reservoir:
    "The degas bottle and its seam are common first-pass leak surfaces because dried coolant collects there long before the actual drip reaches the ground.",
  radiator_hose:
    "On this truck, clamp seepage, neck corrosion, and hose softness often show up before a full hose burst, so the visual condition matters.",
  thermostat_housing:
    "Seepage here can run down the front of the engine and falsely implicate the water pump or a lower hose unless the highest wet point is traced carefully.",
  fan_clutch:
    "Fan roar and drag can be normal under load, but visible wobble, leaked clutch fluid, or contact marks mean the fan path needs more attention.",
  intake_tube:
    "A small split or loose clamp here lets in unmetered air and can mimic misfire, rough idle, or IMRC-related complaints without any internal engine problem.",
  throttle_body:
    "It sits at the end of the intake duct, so loose couplers, vacuum leaks, and intake-runner complaints often all get blamed on this same area first.",
  maf_sensor:
    "This area matters because a loose connector, dirty meter path, or air leak after the sensor skews fuel trims and creates rough-idle or misfire complaints.",
  fuel_injector:
    "Injector tick can be normal on the 5.4, so this area is mainly useful for separating normal upper-engine ticking from a true one-cylinder fuel or connector problem.",
  oxygen_sensor_connector:
    "It lives near hot exhaust parts, so connector heat damage and wire insulation problems are more common than a bad connector shell by itself.",
  catalytic_converter_area:
    "This underbody area matters because shield rattle, dented shells, and rusted brackets can sound worse than they really are until you isolate the noise source.",
  ignition_harness:
    "Because the 5.4 runs hot at the top of the engine, brittle locks, hard insulation, and strain at the wire entry are common aging failures here.",
  connector:
    "Across this truck, connector faults are usually about fit, heat damage, corrosion, or broken locks, not mysterious pin failures you cannot actually see.",
  vacuum_line:
    "Small vacuum leaks on the 5.4 often create hiss, rough idle, and lean-running symptoms that get mistaken for ignition problems.",
  coolant_hose:
    "The hose condition matters because a seep at the clamp or crossover can spread coolant across the front of the engine and mislead the inspection.",
  battery_terminal:
    "This is one of the highest-value inspection points on an older truck because light corrosion or a loose clamp can create no-start, charging, and idle complaints.",
  lamp_socket:
    "Socket heat damage is a common F-150 lamp fault, especially when a loose bulb or poor contact overheats the terminal cavity.",
  light_bulb:
    "A simple bulb issue still matters because the bulb condition helps separate a normal replacement from a melted socket or moisture problem.",
  headlight_housing:
    "The housing matters because broken tabs, water intrusion, or poor fit can damage the socket and connector even when the lens itself looks fine.",
  taillight_housing:
    "Rear lamp housings often trap moisture or let the socket overheat, so the housing condition is part of the electrical diagnosis, not just cosmetic.",
  brake_line:
    "On older F-150s the hard lines and their brackets are critical rust checkpoints because road salt and trapped debris attack them from the outside in.",
  brake_hose:
    "A cracked or swollen hose can cause pull, soft pedal feel, or hidden seepage even when the metal line still looks acceptable.",
  caliper_area:
    "This view matters because hose routing, bleeder seepage, pad wear, and slide-pin trouble all leave clues in the same small area.",
  control_arm:
    "The control arm and bushing position tell you whether the problem is a worn joint, a shifted bushing, or impact damage from rough roads or curb strikes.",
  ball_joint:
    "On a truck this heavy, torn boots and dry joints matter early because once grease is gone the joint wear accelerates quickly.",
  tie_rod_end:
    "This steering end is a common source of looseness, drift, and clunk complaints that owners sometimes mistake for tire or alignment issues alone.",
  cv_axle_boot:
    "A split boot is often the earliest visible sign before the axle joint starts clicking or vibrating under load.",
  transfer_case_area:
    "Because it sits under the truck, grime and seepage collect here; the inspection has to separate old film from a fresh active leak.",
  driveshaft_u_joint:
    "Rust dust, dry caps, and sling marks around the yoke often show up before a full driveline failure or obvious play is felt.",
  differential_cover:
    "The cover seam is a practical first leak checkpoint because fresh gear oil and impact damage are both easy to miss on a dirty housing.",
  wheel_well_lip:
    "This is a classic F-150 rust zone, and the visible lip condition often tells you whether the problem is still cosmetic or already reaching the inner seam.",
  frame_section:
    "Frame and crossmember rust need context on this truck because some surface scale is normal, but rust near seams, brackets, and lines changes the risk quickly.",
  engine_top_front:
    "This area is the key comparison point for separating upper-engine timing noise from belt-path noise or an exhaust tick.",
  timing_cover:
    "This front-engine seam can show both leak and timing-context clues, but fluid running down from higher up can easily fool a quick inspection.",
  vct_solenoid:
    "On the 5.4 3V this is one of the highest-value checks because a sticky solenoid can mimic a much more expensive cam phaser repair.",
  fuel_pump_driver_module:
    "The module’s location above the spare tire makes corrosion and intermittent no-start behavior much more common than owners expect.",
  iwe_solenoid_actuator:
    "This 4WD vacuum system causes the classic 'front-end grind in 2WD' complaint on F-150s, especially after rain or washing the truck.",
};

const PART_EXTRA_HINTS: Partial<Record<TruckPartId, string[]>> = {
  belt: [
    "Check the underside rib valleys for cracking; top-side appearance alone can be misleading.",
    "Look behind the belt for pink or green coolant mist that would suggest a front-engine coolant leak.",
  ],
  front_accessory_drive: [
    "Check the water-pump area behind the pulley for dried coolant from the weep hole.",
    "Compare the noisy area to the top front of the engine before calling it a pulley fault.",
  ],
  fuel_injector: [
    "Use this view mainly to compare one cylinder area to the next; do not call normal injector tick a failure by itself.",
    "If one injector connector or seal area looks different, capture it alongside a neighboring cylinder for comparison.",
  ],
  spark_plug: [
    "Warm the engine slightly, blow the wells clean, soak with penetrant, and follow the 3V removal procedure exactly.",
    "If reinstalling, verify plug revision and torque spec; many owners use Motorcraft SP-509 or SP-515 depending production date and apply only the minimal anti-seize or coating guidance they have verified.",
  ],
  cam_phaser_area: [
    "Note whether the rattle lasts 1-3 seconds or continues longer; duration matters on the 5.4 3V.",
    "Check oil level and maintenance history before concluding the hard parts are bad.",
  ],
  vct_solenoid: [
    "Inspect the screen area for varnish or sludge when removed; oil condition matters here.",
    "Compare both bank connectors and note if one side looks oil-soaked or damaged.",
  ],
  fuel_pump_driver_module: [
    "Inspect the mounting bracket too; trapped moisture behind the module accelerates corrosion.",
    "If the connector is green or powdery, inspect the harness side before replacing only the module.",
  ],
  iwe_solenoid_actuator: [
    "Check the small vacuum lines near the hubs for brittleness, especially after winter.",
    "If the complaint is front-end grinding in 2WD, ask whether it changes in rain or after washing the truck.",
  ],
};

const PART_EXTRA_WARNING_SIGNS: Partial<Record<TruckPartId, string[]>> = {
  belt: ["rib cracking", "coolant contamination", "missing chunks from the belt"],
  tensioner: ["tensioner arm sitting near end of travel", "dust concentrated at one pulley"],
  alternator_area: ["charging light flicker", "rough bearing noise under electrical load"],
  front_accessory_drive: ["coolant at water-pump area", "noise changes when A/C load changes"],
  coolant_reservoir: ["cracked plastic around hose neck", "staining down the bottle side"],
  radiator_hose: ["clamp imprint and seep at the neck", "ballooning when revved warm"],
  thermostat_housing: ["coolant track down the front cover", "staining below the housing seam"],
  intake_tube: ["hidden crack on the underside", "duct not fully seated at throttle body"],
  throttle_body: ["oil residue around coupler from blow-by and looseness", "broken nearby vacuum nipple"],
  maf_sensor: ["dirty air-box seal", "connector lock not holding"],
  fuel_injector: ["connector body different from adjacent cylinder", "raw fuel smell near one rail area"],
  oxygen_sensor_connector: ["wire insulation baked hard", "connector clip melted from exhaust heat"],
  coil: ["misfire follows coil swap", "boot swollen from oil exposure"],
  spark_plug: ["plug well blow-by staining", "coil pushed up by plug issue"],
  vacuum_line: ["line end hardened and no longer sealing", "oil-soaked rubber swelling"],
  battery_terminal: ["terminal clamp no longer closes fully", "acid track down cable insulation"],
  lamp_socket: ["one terminal cavity blackened", "socket plastic brittle and crumbly"],
  light_bulb: ["blackened bulb glass", "wrong-style bulb or loose fit"],
  headlight_housing: ["water line inside lens", "broken aiming or mounting point"],
  taillight_housing: ["moisture pooling at bottom of housing", "socket board heat damage"],
  brake_line: ["rust blister at clip point", "line crushed by debris or jack contact"],
  brake_hose: ["outer jacket cracking at full steering lock", "wetness at crimp"],
  caliper_area: ["wet bleeder", "uneven pad wear around one corner"],
  control_arm: ["bushing torn away from sleeve", "arm contacting frame at rest"],
  ball_joint: ["boot missing clamp", "rust dust around stud area"],
  tie_rod_end: ["boot split open", "jam nut area shifted or freshly disturbed"],
  cv_axle_boot: ["grease on control arm or knuckle", "boot clamp walking off groove"],
  transfer_case_area: ["fluid concentrated at output seal", "case half seam wetness"],
  driveshaft_u_joint: ["binding at one cap", "reddish rust powder around cap seals"],
  differential_cover: ["wet pinion area", "cover rust under bolt heads"],
  wheel_well_lip: ["inner seam swelling", "paint bubbles spreading from backside"],
  frame_section: ["delaminating scale layers", "rust next to brake or fuel line clips"],
  engine_top_front: ["oil pooling around front valve-cover area", "noise not matching belt movement"],
  timing_cover: ["oil/coolant mixed grime at cover corner", "fresh wetness after short idle"],
  vct_solenoid: ["one bank noisier than the other", "oil sludge on solenoid screen"],
  fuel_pump_driver_module: ["module case cracked open by corrosion", "truck starts only intermittently in damp weather"],
  iwe_solenoid_actuator: ["vacuum line collapsed", "front hub partially engaged in 2WD"],
};

const SYSTEM_HEALTHY_APPEARANCE: Partial<Record<TruckSystemId, PartConditionDescriptor>> = {
  accessory_drive: {
    visual: ["straight belt tracking", "no dust buildup around pulleys"],
    sound: ["no isolated chirp, squeal, or rough bearing noise"],
  },
  battery_ground: {
    visual: ["clean posts and clamps", "secure hold-down and tray"],
    touch: ["no movement at the clamp or cable end with the truck off"],
  },
  body: {
    visual: ["stable mounting tabs", "no bubbling rust or standing moisture"],
  },
  brakes: {
    visual: ["dry hose and fittings", "no heavy rust scale at lines or brackets"],
    touch: ["hose jacket still flexible, not cracked or swollen"],
  },
  charging: {
    visual: ["pulley aligned with the rest of the drive", "cables and mounts look stable"],
    sound: ["no rough bearing growl under load"],
  },
  connectors_harness: {
    visual: ["connector shell intact", "wire insulation flexible with no discoloration"],
  },
  cooling: {
    visual: ["dry seams and clamps", "no crusted coolant residue"],
    smell: ["no sweet coolant smell after shutdown"],
  },
  drivetrain_4wd: {
    visual: ["dry seals", "boots intact and clamps seated"],
    sound: ["no driveline clunk or grind in normal operation"],
  },
  electrical: {
    visual: ["no green or white buildup", "plastic color consistent with no browning"],
  },
  engine_mechanical: {
    visual: ["dry gasket edges", "no obvious hardware looseness"],
    sound: ["no dominant top-engine tick after normal startup"],
  },
  exhaust_emissions: {
    visual: ["no soot tracks or loose shields", "wiring kept away from hot metal"],
    sound: ["no sharp exhaust-side tick when cold"],
  },
  fuel_air_metering: {
    visual: ["sealed ducts and clean connector locks", "no obvious fuel or air leaks"],
    sound: ["no stumble or abnormal hiss at idle"],
  },
  ignition: {
    visual: ["dry wells and fully seated coils", "no carbon tracking or burn marks"],
    sound: ["smooth idle with no obvious single-cylinder miss"],
  },
  intake_vacuum: {
    visual: ["hoses supple and fully seated", "no split ducts or loose couplers"],
    sound: ["no steady hiss from the intake path"],
  },
  lighting: {
    visual: ["clear terminals and dry housings", "bulb and socket seated squarely"],
  },
  suspension_steering: {
    visual: ["boots intact", "bushings centered with no obvious shift"],
    touch: ["no obvious looseness or torn rubber seen on the joint"],
  },
  timing_valvetrain: {
    visual: ["dry front-engine seam and secure connectors"],
    sound: ["no prolonged upper-engine rattle after oil pressure builds"],
  },
  underbody: {
    visual: ["surface rust only", "no heavy flaking at seams or brackets"],
  },
};

const SYSTEM_FAILING_APPEARANCE: Partial<Record<TruckSystemId, PartConditionDescriptor>> = {
  accessory_drive: {
    visual: ["dust trails", "belt edge wear", "rotating part out of plane"],
    sound: ["chirp, squeal, chatter, or bearing roughness"],
  },
  battery_ground: {
    visual: ["white or green buildup", "acid staining", "heat-discolored cable end"],
    touch: ["clamp or cable end moves too easily"],
  },
  body: {
    visual: ["cracked tab", "water line in housing", "rust bubbling through paint"],
  },
  brakes: {
    visual: ["wet hose or fitting", "deep rust pitting", "damaged bracket area"],
    touch: ["hose jacket cracked, sticky, or swollen"],
  },
  charging: {
    visual: ["mount shift", "cable heat damage", "pulley wobble"],
    sound: ["rough bearing noise under load"],
  },
  connectors_harness: {
    visual: ["broken latch", "browned plastic", "corrosion at the terminal mouth"],
  },
  cooling: {
    visual: ["crust at seam or clamp", "fresh seep path", "plastic neck cracking"],
    smell: ["sweet coolant smell after a drive"],
  },
  drivetrain_4wd: {
    visual: ["grease sling", "wet seal lip", "split boot or corroded connector"],
    sound: ["clunk, grind, or vibration from the driveline area"],
  },
  electrical: {
    visual: ["arcing marks", "green corrosion", "melted or brittle insulation"],
  },
  engine_mechanical: {
    visual: ["oil tracking from upper engine", "fresh seep at front cover or top seam"],
    sound: ["tick or rattle strongest at the engine top"],
  },
  exhaust_emissions: {
    visual: ["soot trail", "loose shield", "heat-baked connector"],
    sound: ["sharp tick or metallic buzz from the exhaust side"],
  },
  fuel_air_metering: {
    visual: ["duct leak", "sensor connector fault", "fuel smell at one area"],
    sound: ["rough idle, stumble, or abnormal hiss"],
  },
  ignition: {
    visual: ["oil in well", "carbon track", "burned or cracked boot"],
    sound: ["single-cylinder miss, pop, or rough idle"],
  },
  intake_vacuum: {
    visual: ["split hose", "collapsed line", "loose intake coupler"],
    sound: ["steady hiss or idle stumble"],
  },
  lighting: {
    visual: ["melted socket", "burned terminal", "water trapped in housing"],
  },
  suspension_steering: {
    visual: ["torn boot", "rust dust", "shifted bushing"],
    sound: ["clunk or vibration from the wheel-end area"],
  },
  timing_valvetrain: {
    visual: ["oil-contaminated connector", "fresh wetness at timing area"],
    sound: ["cold-start rattle or persistent top-engine tick"],
  },
  underbody: {
    visual: ["heavy flaking scale", "perforation", "rust spreading from a seam or mount"],
  },
};

const PART_FAILURE_MODE_OVERRIDES: Partial<Record<TruckPartId, PartFailureMode[]>> = {
  belt: [
    {
      id: "belt_glaze_or_coolant_contamination",
      name: "Glazed or contaminated serpentine belt",
      cause:
        "Age, misalignment, or coolant/oil contamination hardens the ribs and changes belt grip. On the 5.4 front drive this often shows up as chirp before the belt looks completely ruined.",
      symptoms: [
        "chirp or squeal at startup or with load",
        "glazed shiny rib surface",
        "belt dust around the front drive",
      ],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  tensioner: [
    {
      id: "tensioner_spring_or_pivot_wear",
      name: "Weak tensioner spring or worn pivot",
      cause:
        "The spring loses control or the pivot wears, letting the arm oscillate and the belt drift across the pulleys.",
      symptoms: ["belt flutter", "arm chatter", "chirp or squeal that changes with load"],
      severity: "medium",
      diyOrShop: "diy_with_care",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  idler_pulley: [
    {
      id: "idler_bearing_wear",
      name: "Idler bearing wear",
      cause:
        "The sealed bearing dries out or loosens, producing chirp, roughness, and face wobble that can look like a larger engine problem.",
      symptoms: ["rough spinning noise", "idler face wobble", "belt dust nearby"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  alternator_area: [
    {
      id: "alternator_bearing_or_mount_shift",
      name: "Alternator bearing or mount issue",
      cause:
        "A rough alternator bearing or loose mount shifts the pulley plane and loads the belt path.",
      symptoms: ["charging complaint", "pulley wobble", "rough noise under electrical load"],
      severity: "medium",
      diyOrShop: "diy_with_care",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  front_accessory_drive: [
    {
      id: "water_pump_weep_masquerading_as_belt_issue",
      name: "Water-pump weep hole leak in the front drive area",
      cause:
        "The front engine leak path starts behind the pulley and throws coolant mist onto the surrounding drive area, making the whole front look like a belt problem.",
      symptoms: ["dried coolant near the pump", "sweet smell", "chirp after contamination reaches the belt"],
      severity: "medium",
      diyOrShop: "diy_with_care",
      knownWeakness: true,
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  battery: [
    {
      id: "battery_case_or_hold_down_neglect",
      name: "Battery case, tray, or hold-down neglect",
      cause:
        "An older truck battery may leak acid vapor, swell, or move in the tray when the hold-down is loose.",
      symptoms: ["acid residue on tray", "case swelling", "no-start or intermittent electrical complaints"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  ground_point: [
    {
      id: "ground_cable_corrosion_or_loose_eyelet",
      name: "Ground cable corrosion or loose eyelet",
      cause:
        "Corrosion grows under the eyelet or the fastener loosens, raising resistance and creating hard-to-chase charging or idle complaints.",
      symptoms: ["slow crank", "charging fluctuation", "electrical weirdness that comes and goes"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  coolant_reservoir: [
    {
      id: "degas_bottle_seam_crack",
      name: "Reservoir seam or neck crack",
      cause:
        "Age and heat cycling embrittle the plastic bottle, especially at the seam and hose neck.",
      symptoms: ["crust at the seam", "wet neck area", "coolant smell after a drive"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  radiator_hose: [
    {
      id: "radiator_hose_soft_spot_or_clamp_seep",
      name: "Radiator hose aging or clamp seep",
      cause:
        "The hose weakens internally or the clamp stops sealing evenly around the neck.",
      symptoms: ["soft hose", "wet clamp", "coolant trail below the neck"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  thermostat_housing: [
    {
      id: "thermostat_housing_gasket_seep",
      name: "Thermostat housing or neck seep",
      cause:
        "Gasket and housing surfaces age, allowing coolant to creep down the front of the engine.",
      symptoms: ["staining below the housing", "fresh wetness at the neck", "coolant smell after shutdown"],
      severity: "medium",
      diyOrShop: "diy_with_care",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  fan_clutch: [
    {
      id: "fan_clutch_wobble_or_leak",
      name: "Fan clutch wear or leak",
      cause:
        "Bearing looseness or fluid loss in the clutch allows wobble, drag, or abnormal fan behavior.",
      symptoms: ["fan roar that no longer matches temperature/load", "visible wobble", "fluid staining around the clutch hub"],
      severity: "medium",
      diyOrShop: "diy_with_care",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  intake_tube: [
    {
      id: "intake_tube_split_or_loose_coupler",
      name: "Split intake duct or loose coupler",
      cause:
        "The duct cracks on the underside or the coupler loosens, letting in unmetered air after the MAF.",
      symptoms: ["hiss", "rough idle", "lean stumble or false misfire complaint"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  throttle_body: [
    {
      id: "throttle_body_area_air_leak",
      name: "Throttle-body coupler or nearby vacuum leak",
      cause:
        "Loose intake connection or a cracked nearby nipple/line changes airflow enough to create rough idle or stumble.",
      symptoms: ["hiss near throttle body", "rough idle", "improves when coupler is reseated"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  maf_sensor: [
    {
      id: "maf_connection_or_meter_path_fault",
      name: "MAF connector or meter-path issue",
      cause:
        "A loose connector, dirty meter path, or leak at the air box outlet distorts airflow reporting.",
      symptoms: ["rough idle", "surging", "fuel trim or MAF-related codes"],
      severity: "medium",
      diyOrShop: "diy_with_care",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  fuel_injector: [
    {
      id: "injector_balance_or_connector_fault",
      name: "Injector balance or connector issue",
      cause:
        "A weak injector or damaged connector can create one-cylinder roughness, but normal injector tick alone is not a failure.",
      symptoms: ["one-cylinder stumble", "fuel smell near one injector", "complaint stays on one cylinder after coil swap"],
      severity: "medium",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  oxygen_sensor_connector: [
    {
      id: "o2_connector_heat_damage",
      name: "O2 sensor connector or harness heat damage",
      cause:
        "Exhaust heat hardens insulation and weakens the connector lock, especially when the harness is clipped poorly.",
      symptoms: ["brittle or melted wire jacket", "intermittent sensor codes", "connector no longer locking firmly"],
      severity: "medium",
      diyOrShop: "diy_with_care",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  catalytic_converter_area: [
    {
      id: "converter_shield_or_shell_rattle",
      name: "Converter shield or shell rattle",
      cause:
        "Rusty shields, damaged shells, or loose mounts create metallic rattle from the underbody.",
      symptoms: ["underbody rattle", "noise changes with rpm or bumps", "visible shield looseness"],
      severity: "medium",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  ignition_harness: [
    {
      id: "ignition_harness_heat_or_strain_damage",
      name: "Ignition harness heat or strain damage",
      cause:
        "Top-engine heat and repeated coil service crack the insulation or loosen the connector locks.",
      symptoms: ["intermittent misfire", "harness changes the idle when moved", "visible brittle or cracked wire jacket"],
      severity: "medium",
      diyOrShop: "diy_with_care",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  connector: [
    {
      id: "connector_lock_or_terminal_corrosion",
      name: "Connector lock failure or terminal corrosion",
      cause:
        "The latch breaks, moisture enters, and the terminal fit degrades until the circuit becomes intermittent.",
      symptoms: ["loose fit", "green corrosion", "heat discoloration", "complaint changes when connector is touched"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  vacuum_line: [
    {
      id: "vacuum_line_split_or_popoff",
      name: "Vacuum line split or pop-off",
      cause:
        "Age hardens the hose and it cracks at bends or slips off a nipple under vibration.",
      symptoms: ["steady hiss", "rough idle", "lean-running complaint"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  coolant_hose: [
    {
      id: "coolant_hose_crossover_seep",
      name: "Coolant hose or crossover seep",
      cause:
        "Age, clamp pressure loss, or neck corrosion lets coolant wick out slowly and spread across the engine front.",
      symptoms: ["wet hose connection", "dried coolant crust", "sweet smell after driving"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  battery_terminal: [
    {
      id: "battery_terminal_corrosion_and_poor_clamp_force",
      name: "Battery terminal corrosion or weak clamp force",
      cause:
        "Acid vapor and repeated overtightening distort the clamp and create high resistance at the post.",
      symptoms: ["slow or no crank", "white or green buildup", "hot terminal after cranking"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  lamp_socket: [
    {
      id: "lamp_socket_heat_damage",
      name: "Lamp socket heat damage",
      cause:
        "Loose bulb contact raises resistance and overheats the socket cavity or pigtail.",
      symptoms: ["hyperflash", "intermittent lamp", "melted plastic around one terminal"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  light_bulb: [
    {
      id: "bulb_failure_or_wrong_fitment",
      name: "Bulb failure or poor bulb fitment",
      cause:
        "The filament fails or the wrong bulb/loose seating overheats the socket and housing.",
      symptoms: ["dead lamp", "hyperflash", "darkened or overheated bulb base"],
      severity: "low",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  headlight_housing: [
    {
      id: "headlight_housing_moisture_or_mount_damage",
      name: "Headlight housing moisture or mount damage",
      cause:
        "A cracked housing or broken tab lets the lamp move, trap moisture, and stress the socket side.",
      symptoms: ["condensation", "loose fit", "socket corrosion or heat damage"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  taillight_housing: [
    {
      id: "taillight_housing_leak_or_socket_heat",
      name: "Taillight housing leak or socket heat damage",
      cause:
        "Water intrusion or poor socket contact overheats the rear lamp assembly and connector.",
      symptoms: ["condensation", "melted rear socket", "intermittent rear lamp fault"],
      severity: "medium",
      diyOrShop: "diy",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  brake_line: [
    {
      id: "brake_line_external_corrosion",
      name: "Brake line external corrosion",
      cause:
        "Salt, mud, and trapped moisture attack the steel line at clips and bends until it starts weeping or bursts.",
      symptoms: ["wet line", "deep scale", "soft pedal or pull complaint"],
      severity: "stop_driving",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  brake_hose: [
    {
      id: "brake_hose_crack_or_internal_collapse",
      name: "Brake hose crack or internal collapse",
      cause:
        "Age and flexing crack the outer jacket or allow the hose to collapse internally, affecting brake release and feel.",
      symptoms: ["wet hose", "brake pull", "hose swelling or cracking"],
      severity: "stop_driving",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  caliper_area: [
    {
      id: "caliper_or_bleeder_seep",
      name: "Caliper-area seep or hardware issue",
      cause:
        "Fluid leaks, damaged hose routing, or seized hardware all show visual clues around the caliper.",
      symptoms: ["wet caliper", "uneven pad wear", "pull to one side"],
      severity: "high",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  control_arm: [
    {
      id: "control_arm_bushing_shift_or_bend",
      name: "Control arm bushing shift or arm bend",
      cause:
        "Heavy use, impacts, or rust at the mount distort the arm path and let the bushing move out of place.",
      symptoms: ["clunk", "pull", "uneven tire wear clues"],
      severity: "medium",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  ball_joint: [
    {
      id: "ball_joint_boot_loss_and_wear",
      name: "Ball joint boot loss and wear",
      cause:
        "Once the boot tears and grease leaves, road grit wears the joint quickly on a heavy truck.",
      symptoms: ["torn boot", "clunk", "rust dust or dry joint appearance"],
      severity: "high",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  tie_rod_end: [
    {
      id: "tie_rod_end_play",
      name: "Tie rod end play",
      cause:
        "Boot failure and normal wear loosen the steering linkage, creating drift and clunk.",
      symptoms: ["pull", "front-end clunk", "visible boot damage"],
      severity: "high",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  cv_axle_boot: [
    {
      id: "cv_boot_split_and_grease_loss",
      name: "CV boot split and grease loss",
      cause:
        "The boot tears, grease escapes, and dirt enters the joint until vibration or clicking starts.",
      symptoms: ["grease sling", "boot split", "front-end vibration or clunk"],
      severity: "medium",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  transfer_case_area: [
    {
      id: "transfer_case_seep_or_output_seal_leak",
      name: "Transfer-case seep or output seal leak",
      cause:
        "Age and use wear the seal lip or case seam, allowing slow fluid loss around the driveline entry.",
      symptoms: ["wet case seam", "fresh fluid at driveshaft entry", "driveline vibration if fluid runs low"],
      severity: "medium",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  driveshaft_u_joint: [
    {
      id: "u_joint_dry_cap_wear",
      name: "U-joint dry cap wear",
      cause:
        "Loss of lubrication or water intrusion dries the caps and creates rust dust or play.",
      symptoms: ["clunk when shifting load", "vibration", "rust dust around the caps"],
      severity: "medium",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  differential_cover: [
    {
      id: "differential_cover_seep_or_impact_damage",
      name: "Differential cover seep or impact damage",
      cause:
        "The cover gasket, bolt sealing surface, or the cover itself begins leaking after age or a strike.",
      symptoms: ["wet seam", "cover dent", "gear oil trail down the housing"],
      severity: "medium",
      diyOrShop: "diy_with_care",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  wheel_well_lip: [
    {
      id: "wheel_arch_seam_rust",
      name: "Wheel-arch seam rust",
      cause:
        "Mud and moisture sit behind the lip and attack the seam from the inside out.",
      symptoms: ["bubbling paint", "flaking metal", "perforation beginning at the edge"],
      severity: "medium",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  frame_section: [
    {
      id: "frame_scale_and_seam_corrosion",
      name: "Frame scale and seam corrosion",
      cause:
        "Salt and trapped debris build scale at seams, brackets, and line clips until the rust becomes structural.",
      symptoms: ["heavy flaking scale", "rust at a bracket or seam", "line proximity that raises safety concern"],
      severity: "high",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  engine_top_front: [
    {
      id: "upper_engine_tick_separation",
      name: "Upper-engine tick or leak source separation",
      cause:
        "This area collects timing, ignition, and top-engine leak clues that are easy to confuse with front-drive noise.",
      symptoms: ["tick strongest at the engine top", "top-front oil or coolant track", "noise does not match belt movement"],
      severity: "medium",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
  timing_cover: [
    {
      id: "timing_cover_seep_or_chain_rattle_context",
      name: "Timing-cover seep or chain-rattle context",
      cause:
        "The front cover can show seepage while also being the visual area owners point to when chain or phaser noise is really coming from above.",
      symptoms: ["wet timing-cover edge", "persistent top-front rattle", "oil or coolant grime at cover corners"],
      severity: "medium",
      diyOrShop: "shop",
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
    {
      id: "timing_chain_stretch_context",
      name: "Timing chain stretch / guide wear context",
      cause:
        "When chain tensioners and guides wear, startup rattle lasts longer and the repair becomes expensive quickly.",
      symptoms: ["longer cold-start rattle", "persistent timing noise", "cam timing code history"],
      severity: "high",
      diyOrShop: "shop",
      knownWeakness: true,
      confidence: "field_knowledge",
      source: "field knowledge — verify before acting",
    },
  ],
};

const PART_SERVICE_INTERVAL_OVERRIDES: Partial<Record<TruckPartId, PartServiceInterval>> = {
  belt: { mileage: 90000, note: "Inspect every 30K miles; replace at 90-100K or when cracked/glazed. Motorcraft JK6-992." },
  battery: { months: 48, note: "Battery life varies by climate and use; inspect posts, tray, and hold-down every service." },
  brake_hose: { months: 24, note: "Inspect outer jacket and fittings at every brake service." },
  brake_line: { months: 12, note: "Inspect all visible hard lines yearly, especially in rust-prone climates." },
  coolant_hose: { months: 24, note: "Inspect hose softness, seepage, and clamp condition during every coolant service." },
  coolant_reservoir: { months: 24, note: "Inspect seams and necks anytime coolant smell or residue appears." },
  fan_clutch: { note: "No fixed interval; inspect any time front-drive noise or fan wobble is suspected." },
  lamp_socket: { note: "Inspect whenever a bulb fails repeatedly or the socket shows heat damage." },
  radiator_hose: { months: 24, note: "Inspect for soft spots, swelling, and clamp seepage during cooling-system service." },
  spark_plug: { mileage: 100000, note: "100K normal, 60K severe duty. Use SP-515 (updated design). Follow Ford TSB 08-7-6 removal procedure." },
  coil: { mileage: 100000, note: "No fixed interval — replace on failure. Consider full set if one fails past 80K. DG-521." },
  throttle_body: { mileage: 60000, note: "Clean every 60K miles. Replace only if electronic failure confirmed (P2104/P2106/P2135)." },
  vct_solenoid: { mileage: 100000, note: "Clean solenoid screens at 100K. Replace solenoids during cam phaser job." },
  maf_sensor: { mileage: 60000, note: "Clean with MAF cleaner every 30-60K miles. Replace only if P0100-P0103 codes persist after cleaning." },
  ball_joint: { mileage: 100000, note: "Inspect at every tire/brake service. Check for play at 12/6 o'clock with wheel jacked." },
  tie_rod_end: { mileage: 100000, note: "Inspect at every alignment. Replace if play is felt when rocking the wheel side-to-side." },
};

const PART_FACTORY_SPEC_OVERRIDES: Partial<Record<TruckPartId, string>> = {
  belt: "Motorcraft JK6-992, 6-rib serpentine. Auto-tensioner, no manual adjustment. Routing: Crank → A/C → Idler → Alternator → Water pump → PS pump → Tensioner. Diagram on radiator shroud from factory.",
  brake_hose: "Brake fluid: Motorcraft DOT 4 LV (WSS-M6C65-A2), DOT 3 acceptable. Banjo bolt torque: 26 lb-ft with new copper washers. Bleeder: 97 lb-in.",
  brake_line: "Brake fluid: Motorcraft DOT 4 LV (WSS-M6C65-A2). Front caliper bracket: 166 lb-ft. Rear caliper bracket: 122 lb-ft. Slide pins: 24 lb-ft.",
  coolant_hose: "Coolant: Motorcraft Premium Gold (yellow), WSS-M97B51-A1, 50/50 premix. Total system: 26.6 qt. Thermostat: 188°F. Cap: 16 psi. NEVER mix with green conventional coolant.",
  coolant_reservoir: "Coolant: Motorcraft Gold (yellow). Initial fill life: 6yr/100K mi. Refill: 4yr/50K mi. Check level COLD only. NEVER mix with green coolant — causes gel formation.",
  radiator_hose: "Coolant: Motorcraft Gold. Thermostat housing bolts: 89 lb-in (10 Nm). Water pump bolts: 18 lb-ft (25 Nm).",
  spark_plug:
    "Motorcraft SP-515 (updated design, preferred). Torque: 25 lb-ft (34 Nm) — do NOT over-torque. Gap: 0.052-0.056 in (pre-gapped). Thread: M12x1.25. Anti-seize: Ford TSB 08-7-6 specifies Motorcraft XL-2 on the ground electrode shield area — check your SP-515 package instructions as plug coatings changed over time, some revisions do not require additional anti-seize. Warm engine before removal, use penetrating oil, 1/8-turn-and-pause technique. Broken plug tool: Lisle #65600.",
  coil: "Motorcraft DG-521, Coil-On-Plug. Primary resistance: 0.3-1.0 ohms. Secondary: 5,000-13,000 ohms. Bolt torque: 44 lb-in (5 Nm). One per cylinder, 8 total.",
  throttle_body: "Electronic throttle body, Motorcraft 9W7Z-9E926-A. After replacement: idle relearn — key on 30 sec, key off 30 sec, start and idle 3 min without touching pedal. Use CRC throttle body cleaner only — not carb cleaner.",
  exhaust_manifold: "Manifold bolts: Step 1 — 15 lb-ft, Step 2 — 30 lb-ft, center outward. Studs: 106 lb-in (12 Nm). Passenger side rear studs are most prone to breakage from thermal cycling.",
  cam_phaser_area: "Cam phaser bolt: 30 lb-ft + 90° (TTY — new bolt required). Timing chain tensioner: 18 lb-ft. Both banks use iVCT with ~50° crank range. Oil-pressure-driven vane-type phaser.",
  vct_solenoid: "Motorcraft CG-721 (or 8L3Z-6M280-B). VCT solenoid resistance: 6.5-13.5 ohms at 68°F. Internal screen clogs with sludge — clean or replace screen during service. One per bank, 2 total.",
  fuel_pump_driver_module: "Motorcraft PFS-467 (or Dorman 590-001). Mounted on driver-side frame rail near spare tire. 2 mounting bolts, 1 connector. Apply thermal paste between module and frame. Dielectric grease on connector to prevent corrosion.",
  battery: "Group 65, 750-850 CCA. Running voltage: 13.5-14.5V. Resting: 12.4-12.7V. Below 13V running = alternator issue.",
  alternator_area: "150A high-output alternator. Running voltage: 13.5-14.5V at battery terminals. Below 13V = alternator failing. Motorcraft replacement available.",
  maf_sensor: "Motorcraft AFLS-221. Clean with MAF-specific cleaner only — never touch the hot wire element. 2 screws, 1 connector. 5-minute DIY job.",
  ball_joint: "Upper ball joint nut: 46 lb-ft (new cotter pin). Lower ball joint nut: 111 lb-ft (new cotter pin). Lower is press-fit, requires ball joint press. Upper is bolt-in.",
  tie_rod_end: "Outer tie rod end nut: 76 lb-ft (new cotter pin, align after). Inner tie rod: 74 lb-ft. Alignment required after replacement.",
  differential_cover: "Rear diff (9.75 in): 3.5 pints 80W-90. Cover bolts: 33 lb-ft. Add Motorcraft XL-3 friction modifier if limited-slip. Front diff (4WD): 2.25 pints, cover: 20 lb-ft.",
  transfer_case_area: "Transfer case (4WD): 2.0 pints MERCON LV. Drain/fill plugs: 20 lb-ft.",
  driveshaft_u_joint: "Driveshaft flange bolts: 76 lb-ft (103 Nm).",
};

function uniqueItems(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function mergeConditionDescriptor(
  base?: PartConditionDescriptor,
  extra?: PartConditionDescriptor,
) {
  if (!base && !extra) {
    return undefined;
  }

  return {
    visual: uniqueItems([...(base?.visual ?? []), ...(extra?.visual ?? [])]),
    sound: uniqueItems([...(base?.sound ?? []), ...(extra?.sound ?? [])]),
    touch: uniqueItems([...(base?.touch ?? []), ...(extra?.touch ?? [])]),
    smell: uniqueItems([...(base?.smell ?? []), ...(extra?.smell ?? [])]),
  } satisfies PartConditionDescriptor;
}

function buildDefaultFailureModes(part: TruckPartDefinition): PartFailureMode[] {
  const shared = {
    confidence: "field_knowledge" as const,
    source: "field knowledge — verify before acting",
  };

  switch (part.system) {
    case "accessory_drive":
      return [
        {
          id: `${part.id}_bearing_or_alignment_wear`,
          name: `${part.label} wear or alignment issue`,
          cause:
            "Rotating front-drive parts wear slowly, then start changing belt tracking, dust pattern, and noise under load.",
          symptoms: [...part.warningSigns.slice(0, 3), ...part.commonSymptoms.slice(0, 2)],
          severity: "medium",
          diyOrShop: "diy_with_care",
          ...shared,
        },
      ];
    case "battery_ground":
    case "electrical":
    case "connectors_harness":
      return [
        {
          id: `${part.id}_corrosion_or_heat_damage`,
          name: `${part.label} corrosion, looseness, or heat damage`,
          cause:
            "Moisture, acid vapor, and resistance heat degrade the connection until the complaint becomes intermittent or load-sensitive.",
          symptoms: [...part.warningSigns.slice(0, 3), ...part.commonSymptoms.slice(0, 2)],
          severity: "medium",
          diyOrShop: "diy",
          ...shared,
        },
      ];
    case "cooling":
      return [
        {
          id: `${part.id}_coolant_seep`,
          name: `${part.label} seep or plastic aging`,
          cause:
            "Heat cycling hardens plastics, hoses, and seals until coolant begins wicking out at seams, clamps, or necks.",
          symptoms: [...part.warningSigns.slice(0, 3), ...part.commonSymptoms.slice(0, 2)],
          severity: "medium",
          diyOrShop: "diy_with_care",
          ...shared,
        },
      ];
    case "intake_vacuum":
      return [
        {
          id: `${part.id}_air_leak`,
          name: `${part.label} split, leak, or loose connection`,
          cause:
            "Rubber and plastic intake parts crack or loosen with heat and age, allowing unmetered air into the engine.",
          symptoms: [...part.warningSigns.slice(0, 3), ...part.commonSymptoms.slice(0, 2)],
          severity: "medium",
          diyOrShop: "diy",
          ...shared,
        },
      ];
    case "fuel_air_metering":
      return [
        {
          id: `${part.id}_metering_fault`,
          name: `${part.label} metering or connector fault`,
          cause:
            "Metering and injector-adjacent components are sensitive to connector fit, contamination, and air leaks nearby.",
          symptoms: [...part.warningSigns.slice(0, 3), ...part.commonSymptoms.slice(0, 2)],
          severity: "medium",
          diyOrShop: "shop",
          ...shared,
        },
      ];
    case "lighting":
    case "body":
      return [
        {
          id: `${part.id}_housing_or_socket_damage`,
          name: `${part.label} housing, socket, or moisture damage`,
          cause:
            "Heat, vibration, and water intrusion degrade lamp assemblies and the short harness behind them.",
          symptoms: [...part.warningSigns.slice(0, 3), ...part.commonSymptoms.slice(0, 2)],
          severity: "low",
          diyOrShop: "diy",
          ...shared,
        },
      ];
    case "brakes":
      return [
        {
          id: `${part.id}_safety_critical_wear`,
          name: `${part.label} leak, rust, or routing concern`,
          cause:
            "Brake components fail from corrosion, flex damage, or seepage, and even a small visual clue deserves a safety-first response.",
          symptoms: [...part.warningSigns.slice(0, 3), ...part.commonSymptoms.slice(0, 2)],
          severity: "stop_driving",
          diyOrShop: "shop",
          ...shared,
        },
      ];
    case "suspension_steering":
      return [
        {
          id: `${part.id}_joint_or_bushing_wear`,
          name: `${part.label} joint, boot, or bushing wear`,
          cause:
            "Boot failure, corrosion, or bushing shift eventually turns into looseness, clunk, drift, or vibration.",
          symptoms: [...part.warningSigns.slice(0, 3), ...part.commonSymptoms.slice(0, 2)],
          severity: "medium",
          diyOrShop: "shop",
          ...shared,
        },
      ];
    case "drivetrain_4wd":
      return [
        {
          id: `${part.id}_seal_boot_or_joint_wear`,
          name: `${part.label} seal, boot, or joint wear`,
          cause:
            "Underbody exposure dries seals and boots and pulls contamination into rotating driveline components.",
          symptoms: [...part.warningSigns.slice(0, 3), ...part.commonSymptoms.slice(0, 2)],
          severity: "medium",
          diyOrShop: "shop",
          ...shared,
        },
      ];
    case "exhaust_emissions":
      return [
        {
          id: `${part.id}_heat_cycle_damage`,
          name: `${part.label} heat-cycle or fastener damage`,
          cause:
            "Exhaust heat loosens shields, fatigues fasteners, and bakes nearby wiring over time.",
          symptoms: [...part.warningSigns.slice(0, 3), ...part.commonSymptoms.slice(0, 2)],
          severity: "medium",
          diyOrShop: "shop",
          ...shared,
        },
      ];
    case "timing_valvetrain":
    case "engine_mechanical":
      return [
        {
          id: `${part.id}_top_engine_context_issue`,
          name: `${part.label} top-engine wear or leak context`,
          cause:
            "The 5.4 front and upper engine areas collect timing, ignition, and leak complaints that need careful separation before repair.",
          symptoms: [...part.warningSigns.slice(0, 3), ...part.commonSymptoms.slice(0, 2)],
          severity: "high",
          diyOrShop: "shop",
          ...shared,
        },
      ];
    case "underbody":
      return [
        {
          id: `${part.id}_rust_progression`,
          name: `${part.label} rust progression`,
          cause:
            "Moisture and debris trap against seams and brackets until surface rust becomes scale or perforation.",
          symptoms: [...part.warningSigns.slice(0, 3), ...part.commonSymptoms.slice(0, 2)],
          severity: "medium",
          diyOrShop: "shop",
          ...shared,
        },
      ];
    default:
      return [];
  }
}

function enrichTruckPart(part: TruckPartDefinition): TruckPartDefinition {
  return {
    ...part,
    summary: uniqueItems([part.summary, PART_SUMMARY_EXTENSIONS[part.id] ?? ""]).join(" "),
    inspectionHints: uniqueItems([
      ...part.inspectionHints,
      ...(SYSTEM_EXTRA_HINTS[part.system] ?? []),
      ...(PART_EXTRA_HINTS[part.id] ?? []),
    ]),
    warningSigns: uniqueItems([
      ...part.warningSigns,
      ...(SYSTEM_EXTRA_WARNING_SIGNS[part.system] ?? []),
      ...(PART_EXTRA_WARNING_SIGNS[part.id] ?? []),
    ]),
    healthyAppearance: mergeConditionDescriptor(
      SYSTEM_HEALTHY_APPEARANCE[part.system],
      part.healthyAppearance,
    ),
    failingAppearance: mergeConditionDescriptor(
      SYSTEM_FAILING_APPEARANCE[part.system],
      part.failingAppearance,
    ),
    failureModes: uniqueFailureModes([
      ...(part.failureModes ?? []),
      ...(PART_FAILURE_MODE_OVERRIDES[part.id] ?? buildDefaultFailureModes(part)),
    ]),
    serviceInterval:
      part.serviceInterval ?? PART_SERVICE_INTERVAL_OVERRIDES[part.id],
    factorySpec:
      part.factorySpec ?? PART_FACTORY_SPEC_OVERRIDES[part.id],
  };
}

function uniqueFailureModes(modes: PartFailureMode[]) {
  const seen = new Set<string>();
  return modes.filter((mode) => {
    if (seen.has(mode.id)) {
      return false;
    }
    seen.add(mode.id);
    return true;
  });
}

const TRUCK_PART_BASES: Record<TruckPartId, TruckPartDefinition> = Object.fromEntries(
  Object.values(TRUCK_PART_SEEDS).map((part) => [part.id, enrichTruckPart(part)]),
) as Record<TruckPartId, TruckPartDefinition>;

const TRUCK_PART_VISIBLE_TARGETS: Record<TruckPartId, TruckVisibleTargetId[]> = {
  belt: ["belt", "front_accessory_drive_area"],
  tensioner: ["tensioner", "front_accessory_drive_area"],
  idler_pulley: ["idler_pulley", "front_accessory_drive_area"],
  alternator_area: ["alternator", "front_accessory_drive_area"],
  front_accessory_drive: ["front_accessory_drive_area"],
  battery: ["battery", "battery_terminal"],
  ground_point: ["battery_terminal", "battery"],
  coolant_reservoir: ["coolant_reservoir", "leak_source_area"],
  radiator_hose: ["radiator_hose", "leak_source_area"],
  thermostat_housing: ["coolant_hose", "leak_source_area"],
  fan_clutch: ["front_accessory_drive_area"],
  intake_tube: ["engine_top", "connector"],
  throttle_body: ["engine_top", "connector"],
  maf_sensor: ["connector", "engine_top"],
  fuel_injector: ["engine_top", "ignition_coil"],
  exhaust_manifold: ["engine_top", "leak_source_area"],
  oxygen_sensor_connector: ["connector", "underbody_rust"],
  catalytic_converter_area: ["underbody_rust"],
  coil: ["ignition_coil", "engine_top"],
  spark_plug: ["ignition_coil", "engine_top"],
  ignition_harness: ["connector", "ignition_coil"],
  connector: ["connector"],
  vacuum_line: ["engine_top", "connector"],
  coolant_hose: ["coolant_hose", "leak_source_area"],
  battery_terminal: ["battery_terminal", "battery"],
  lamp_socket: ["light_socket_wiring", "headlight_housing", "taillight_housing"],
  light_bulb: ["light_socket_wiring", "headlight_housing", "taillight_housing"],
  headlight_housing: ["headlight_housing", "light_socket_wiring"],
  taillight_housing: ["taillight_housing", "light_socket_wiring"],
  brake_line: ["brake_line_area", "underbody_rust", "wheel_well_rust"],
  brake_hose: ["brake_line_area"],
  caliper_area: ["brake_line_area"],
  control_arm: ["suspension_joint_area", "wheel_well_rust"],
  ball_joint: ["suspension_joint_area"],
  tie_rod_end: ["suspension_joint_area"],
  cv_axle_boot: ["driveline_area"],
  transfer_case_area: ["driveline_area", "underbody_rust"],
  driveshaft_u_joint: ["driveline_area", "underbody_rust"],
  differential_cover: ["driveline_area", "underbody_rust", "leak_source_area"],
  wheel_well_lip: ["wheel_well_rust"],
  frame_section: ["underbody_rust", "wheel_well_rust"],
  engine_top_front: ["engine_top"],
  cam_phaser_area: ["engine_top"],
  timing_cover: ["engine_top", "leak_source_area"],
  vct_solenoid: ["engine_top", "connector"],
  fuel_pump_driver_module: ["underbody_rust", "connector"],
  iwe_solenoid_actuator: ["driveline_area", "connector"],
  turbocharger: [],
  intercooler: [],
  wastegate: [],
  turbo_oil_feed_line: [],
  turbo_oil_return_line: [],
  charge_pipe: [],
  blow_off_valve: [],
  high_pressure_fuel_pump: [],
  direct_injector: [],
  oil_catch_can: [],
  pcv_valve: [],
  water_pump_internal: [],
  tailgate: [],
  bed_floor: [],
  bed_tie_down: [],
  tonneau_cover: [],
  bed_liner: [],
  tailgate_damper: [],
  tailgate_cable: [],
  tailgate_latch: [],
};

const TRUCK_PART_CONFIDENCE_NOTES: Partial<Record<TruckPartId, string[]>> = {
  alternator_area: [
    "Keep the full belt path in view before blaming the alternator pulley alone.",
  ],
  battery_terminal: [
    "Corrosion color and clamp fit are visible clues, but charging faults still need broader electrical context.",
  ],
  cam_phaser_area: [
    "Upper-engine ticking on the 5.4 Triton should stay cautious until it is compared against the front accessory drive.",
  ],
  catalytic_converter_area: [
    "A loose shield can mimic a deeper exhaust concern from one angle alone.",
  ],
  connector: [
    "Do not claim a connector fault unless the latch side, pin side, or heat damage is actually visible.",
  ],
  exhaust_manifold: [
    "Use soot, shield looseness, or load-related ticking as supporting cues before stronger exhaust claims.",
  ],
  frame_section: [
    "Surface rust and structural rust need both close texture and wider location context.",
  ],
  spark_plug: [
    "Plug-well or blow-out language should stay conservative unless one cylinder area is clearly isolated.",
  ],
  timing_cover: [
    "A damp timing-cover edge does not prove the highest leak source without tracing the wet path upward.",
  ],
};

function buildDefaultConfidenceNotes(part: TruckPartDefinition) {
  switch (part.system) {
    case "accessory_drive":
    case "charging":
      return [
        "Start with a wide front-drive view before narrowing to one pulley or mount.",
      ];
    case "battery_ground":
    case "electrical":
      return [
        "Visible corrosion or looseness is useful, but keep electrical conclusions conservative from one quick view.",
      ];
    case "cooling":
      return [
        "Trace coolant residue upward before naming the leak source.",
      ];
    case "lighting":
    case "body":
      return [
        "Use both the housing and socket side before deciding whether the fault is in the lamp assembly or wiring.",
      ];
    case "brakes":
      return [
        "Brake-fluid or rust concerns should stay cautious and safety-first from a phone inspection alone.",
      ];
    case "underbody":
    case "drivetrain_4wd":
      return [
        "Underbody rust and seepage need both a close texture view and a wider location view.",
      ];
    case "engine_mechanical":
    case "timing_valvetrain":
      return [
        "Keep upper-engine noise or leak language conservative until the engine-top and front-drive areas are compared.",
      ];
    default:
      return [
        "Use the visible target first and keep the conclusion conservative if the part edges or nearby connectors are not clear.",
      ];
  }
}

function buildTruckPartRecord(part: TruckPartDefinition): TruckPartRecord {
  return {
    ...part,
    visibleTargetIds: TRUCK_PART_VISIBLE_TARGETS[part.id],
    commonFailureCues: [...part.warningSigns],
    recommendationBias: part.likelyRecommendation,
    confidenceNotes:
      TRUCK_PART_CONFIDENCE_NOTES[part.id] ?? buildDefaultConfidenceNotes(part),
  };
}

export const TRUCK_PARTS: Record<TruckPartRecord["id"], TruckPartRecord> =
  Object.fromEntries(
    Object.values(TRUCK_PART_BASES).map((part) => [part.id, buildTruckPartRecord(part)]),
  ) as Record<TruckPartRecord["id"], TruckPartRecord>;
