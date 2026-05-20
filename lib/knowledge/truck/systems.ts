import type { TruckSystemGroupDefinition } from "@/lib/knowledge/types";

export const TRUCK_SYSTEM_GROUPS: Record<
  TruckSystemGroupDefinition["id"],
  TruckSystemGroupDefinition
> = {
  engine_mechanical: {
    id: "engine_mechanical",
    label: "Engine Mechanical",
    aliases: ["engine mechanical", "engine top", "mechanical engine area"],
    summary:
      "Top-engine and front-engine mechanical areas that need cautious visual separation before stronger diagnosis language.",
    inspectionFocus: ["engine top", "timing cover", "single-cylinder concentration"],
    partIds: ["engine_top_front", "cam_phaser_area", "timing_cover"],
    symptomIds: ["ticking", "rattle", "rough_idle"],
    inspectionTargetIds: ["engine_top_timing_cover", "coil_and_plug_well"],
  },
  accessory_drive: {
    id: "accessory_drive",
    label: "Accessory Drive",
    aliases: ["front accessory drive", "belt drive", "serpentine drive"],
    summary:
      "Front belt-driven path and pulley group for chirp, squeal, wobble, and alignment checks.",
    inspectionFocus: ["belt routing", "idler face", "tensioner movement"],
    partIds: ["belt", "tensioner", "idler_pulley", "alternator_area", "front_accessory_drive", "fan_clutch"],
    symptomIds: ["chirp", "squeal", "wobble", "rattle"],
    inspectionTargetIds: ["front_accessory_drive_path", "alternator_mount_and_case"],
  },
  ignition: {
    id: "ignition",
    label: "Ignition",
    aliases: ["ignition", "coil and plug", "misfire path"],
    summary:
      "Coil, plug, and harness path for rough running, misfire, and single-cylinder visual checks.",
    inspectionFocus: ["coil seating", "plug well condition", "connector fitment"],
    partIds: ["coil", "spark_plug", "ignition_harness", "connector"],
    symptomIds: ["misfire", "rough_idle", "ticking"],
    inspectionTargetIds: ["coil_and_plug_well", "connector_fitment_and_corrosion"],
  },
  cooling: {
    id: "cooling",
    label: "Cooling",
    aliases: ["cooling", "coolant path", "hoses and reservoir"],
    summary:
      "Cooling-path components where seepage, wet seams, hose leaks, or sweet smell need a source-first inspection.",
    inspectionFocus: ["highest wet point", "hose clamp area", "reservoir seam"],
    partIds: ["coolant_reservoir", "coolant_hose", "radiator_hose", "thermostat_housing", "fan_clutch"],
    symptomIds: ["leak", "coolant_smell"],
    inspectionTargetIds: ["fluid_source_path", "coolant_reservoir_and_seam", "radiator_hose_neck_and_clamp", "coolant_hose_and_crossover"],
  },
  intake_vacuum: {
    id: "intake_vacuum",
    label: "Intake / Vacuum",
    aliases: ["vacuum", "intake routing", "intake air leak"],
    summary:
      "Visible intake ducting, throttle body area, and vacuum lines that can explain hiss or rough idle.",
    inspectionFocus: ["split hoses", "loose duct clamps", "disconnected vacuum lines"],
    partIds: ["vacuum_line", "intake_tube", "throttle_body", "maf_sensor"],
    symptomIds: ["hiss", "rough_idle", "misfire"],
    inspectionTargetIds: ["vacuum_line_routing", "intake_tube_and_throttle_body", "maf_sensor_and_air_box"],
  },
  fuel_air_metering: {
    id: "fuel_air_metering",
    label: "Fuel / Air Metering",
    aliases: ["fuel metering", "air metering", "injector and maf context"],
    summary:
      "Air-metering and injector-adjacent components where rough idle or misfire context may need more inspection.",
    inspectionFocus: ["maf connector", "air box fit", "injector-area concentration"],
    partIds: ["maf_sensor", "fuel_injector", "connector"],
    symptomIds: ["rough_idle", "misfire"],
    inspectionTargetIds: ["maf_sensor_and_air_box", "connector_fitment_and_corrosion"],
  },
  exhaust_emissions: {
    id: "exhaust_emissions",
    label: "Exhaust / Emissions",
    aliases: ["exhaust", "emissions", "manifold tick", "heat shield"],
    summary:
      "Visible manifold, heat-shield, and downstream exhaust areas where ticking or leak-like noise can appear.",
    inspectionFocus: ["manifold edge", "heat shield looseness", "soot trace"],
    partIds: ["exhaust_manifold", "oxygen_sensor_connector", "catalytic_converter_area"],
    symptomIds: ["exhaust_tick", "rattle"],
    inspectionTargetIds: ["exhaust_manifold_and_heat_shield"],
  },
  charging: {
    id: "charging",
    label: "Charging",
    aliases: ["charging", "alternator output", "charging path"],
    summary:
      "Alternator and charging-side context for visible wobble, loose mounting, or unstable cable connections.",
    inspectionFocus: ["alternator mount", "belt path at alternator", "battery cable fit"],
    partIds: ["alternator_area", "battery", "battery_terminal", "ground_point"],
    symptomIds: ["dead_battery", "wobble", "corrosion"],
    inspectionTargetIds: ["alternator_mount_and_case", "battery_terminal_and_ground", "battery_top_and_hold_down"],
  },
  electrical: {
    id: "electrical",
    label: "Electrical",
    aliases: ["electrical", "power and wiring", "visible electrical path"],
    summary:
      "Visible battery, grounds, connectors, and harness segments where corrosion or loose fit can drive multiple symptoms.",
    inspectionFocus: ["ground cable fit", "connector condition", "terminal corrosion"],
    partIds: ["battery_terminal", "ground_point", "connector", "ignition_harness"],
    symptomIds: ["dead_battery", "misfire", "hyperflash", "corrosion"],
    inspectionTargetIds: ["battery_terminal_and_ground", "connector_fitment_and_corrosion"],
  },
  battery_ground: {
    id: "battery_ground",
    label: "Battery / Grounds",
    aliases: ["battery and grounds", "ground path", "battery posts"],
    summary:
      "Battery case, hold-down, terminals, and ground points that should stay clean, tight, and undamaged.",
    inspectionFocus: ["both posts visible", "hold-down", "ground cable path"],
    partIds: ["battery", "battery_terminal", "ground_point"],
    symptomIds: ["dead_battery", "corrosion", "rough_idle"],
    inspectionTargetIds: ["battery_top_and_hold_down", "battery_terminal_and_ground"],
  },
  lighting: {
    id: "lighting",
    label: "Lighting",
    aliases: ["lighting", "lamp assembly", "bulb and socket"],
    summary:
      "Headlamp, taillamp, socket, bulb, and short harness path for hyperflash, no-light, or moisture concerns.",
    inspectionFocus: ["socket heat damage", "housing moisture", "connector fit"],
    partIds: ["lamp_socket", "light_bulb", "headlight_housing", "taillight_housing", "connector"],
    symptomIds: ["hyperflash", "corrosion"],
    inspectionTargetIds: ["lamp_socket_and_harness", "headlamp_housing_and_mount", "taillamp_housing_and_mount"],
  },
  connectors_harness: {
    id: "connectors_harness",
    label: "Connectors / Harness",
    aliases: ["connectors", "harness", "tabs and pins"],
    summary:
      "Connector-body, latch, pin, and strain-relief context across the truck.",
    inspectionFocus: ["lock tab", "pin side", "wire entry strain"],
    partIds: ["connector", "ignition_harness", "oxygen_sensor_connector"],
    symptomIds: ["corrosion", "misfire", "hyperflash"],
    inspectionTargetIds: ["connector_fitment_and_corrosion"],
  },
  suspension_steering: {
    id: "suspension_steering",
    label: "Suspension / Steering",
    aliases: ["suspension", "steering", "front end"],
    summary:
      "Visible steering and suspension joints that can show torn boots, rust, looseness, or impact damage.",
    inspectionFocus: ["ball-joint boot", "tie-rod end", "control-arm bushing"],
    partIds: ["control_arm", "ball_joint", "tie_rod_end"],
    symptomIds: ["clunk", "pull", "vibration"],
    inspectionTargetIds: ["front_suspension_joint", "steering_linkage_end"],
  },
  brakes: {
    id: "brakes",
    label: "Brakes",
    aliases: ["brakes", "brake lines", "brake hose"],
    summary:
      "Visible brake hose, hard line, and caliper-adjacent areas for leak or corrosion inspection.",
    inspectionFocus: ["wet hose", "rusted hard line", "caliper-area seep"],
    partIds: ["brake_line", "brake_hose", "caliper_area"],
    symptomIds: ["leak", "pull"],
    inspectionTargetIds: ["brake_line_and_hose"],
  },
  drivetrain_4wd: {
    id: "drivetrain_4wd",
    label: "Drivetrain / 4WD",
    aliases: ["drivetrain", "4wd", "transfer case", "axle boots"],
    summary:
      "Visible driveline and 4WD-adjacent parts such as CV boots, driveshaft joints, differential covers, and transfer case.",
    inspectionFocus: ["boot tears", "wet case seam", "u-joint rust dust"],
    partIds: ["cv_axle_boot", "transfer_case_area", "driveshaft_u_joint", "differential_cover"],
    symptomIds: ["leak", "vibration", "clunk"],
    inspectionTargetIds: ["transfer_case_and_driveshaft", "differential_cover_and_pinion"],
  },
  underbody: {
    id: "underbody",
    label: "Underbody",
    aliases: ["underbody", "frame and seams", "truck underside"],
    summary:
      "Frame, seams, brackets, and underside corrosion zones that need both close and wide views.",
    inspectionFocus: ["frame seam", "scaling rust", "line proximity"],
    partIds: ["frame_section", "wheel_well_lip", "brake_line"],
    symptomIds: ["rust", "leak"],
    inspectionTargetIds: ["frame_rust_and_seam", "wheel_well_underbody"],
  },
  body: {
    id: "body",
    label: "Body / Exterior",
    aliases: ["body", "lamp housings", "wheel arch", "outer structure"],
    summary:
      "Exterior housings, lamp mounts, wheel-arch lips, and body seams visible during walkaround inspection.",
    inspectionFocus: ["lamp moisture", "mount cracking", "wheel arch rust lip"],
    partIds: ["headlight_housing", "taillight_housing", "wheel_well_lip"],
    symptomIds: ["rust", "hyperflash"],
    inspectionTargetIds: ["headlamp_housing_and_mount", "taillamp_housing_and_mount", "wheel_well_underbody"],
  },
  cabin_controls: {
    id: "cabin_controls",
    label: "Cabin Warning / Controls",
    aliases: ["dash warning", "cab controls", "instrument warning"],
    summary:
      "Cabin-visible warning and control context only when it directly helps the inspection, not as a standalone system.",
    inspectionFocus: ["charging warning", "lighting complaint context", "4wd status context"],
    partIds: ["battery", "headlight_housing", "taillight_housing", "transfer_case_area"],
    symptomIds: ["dead_battery", "hyperflash"],
    inspectionTargetIds: ["battery_top_and_hold_down", "headlamp_housing_and_mount", "taillamp_housing_and_mount"],
  },
  timing_valvetrain: {
    id: "timing_valvetrain",
    label: "Timing / Valvetrain",
    aliases: ["timing", "valvetrain", "cam phaser", "top engine tick"],
    summary:
      "5.4 Triton timing-related top-engine context that must be separated from belt-path noise before stronger guidance.",
    inspectionFocus: ["cam phaser area", "timing cover", "top-front engine comparison"],
    partIds: ["cam_phaser_area", "timing_cover", "engine_top_front"],
    symptomIds: ["ticking", "rattle"],
    inspectionTargetIds: ["engine_top_timing_cover", "front_accessory_drive_path"],
  },
  turbo_boost: {
    id: "turbo_boost",
    label: "Turbo / Boost (EcoBoost)",
    aliases: ["turbo", "boost", "ecoboost turbo", "twin turbo", "turbocharger system"],
    summary:
      "3.5L EcoBoost twin-turbo system including turbochargers, intercooler, charge piping, wastegates, and oil feed/return lines. Boost leaks, turbo bearing wear, and intercooler condensation are the most common concerns.",
    inspectionFocus: ["turbo housing and wastegate actuator", "charge pipe connections", "intercooler end tanks and piping", "turbo oil feed and return lines"],
    partIds: ["turbocharger", "intercooler", "wastegate", "turbo_oil_feed_line", "turbo_oil_return_line", "charge_pipe", "blow_off_valve", "high_pressure_fuel_pump"],
    symptomIds: ["turbo_whine", "boost_loss", "oil_consumption", "white_smoke", "blue_smoke"],
    inspectionTargetIds: ["turbo_and_wastegate", "intercooler_and_piping", "turbo_oil_lines"],
  },
  bed_cargo: {
    id: "bed_cargo",
    label: "Bed / Cargo",
    aliases: ["truck bed", "cargo bed", "bed area", "tailgate area", "bed floor"],
    summary:
      "Truck bed components including the bed floor, tie-downs, tailgate mechanism, tonneau cover, bed liner, and drain plugs. Rust at the bed floor drain holes and tailgate mechanism wear are the most common issues on high-mileage F-150s.",
    inspectionFocus: ["bed floor and drain holes", "tailgate hinge and cable condition", "bed wheel well rust", "tie-down anchor condition"],
    partIds: ["tailgate", "bed_floor", "bed_tie_down", "tonneau_cover", "bed_liner", "tailgate_damper", "tailgate_cable", "tailgate_latch"],
    symptomIds: ["rust", "clunk", "rattle"],
    inspectionTargetIds: ["bed_floor_and_drain", "tailgate_hinge_and_cable", "bed_wheel_well_rust"],
  },
};
