import { SUPPORTED_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const NHTSA_TSB_SUMMARY_REFERENCES = [
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "11005305",
      "TSB 24-2188",
      "WHEELS"
    ],
    "excerpt": "This article supersedes TSB 22-2219 to update the Parts List and Service Procedure to clarify applicable steps by vehicle application. Some 2003-2020 Expedition/Navigator and 2006-2020 F-150 (non-Raptor) vehicles equipped with 4WD may exhibit grinding/clicking/ratcheting noise from the front wheel area. This may be due to partial engagement of the integrated wheel ends (IWE). To correct this condition, follow the Se…",
    "issueAreaIds": [
      "intake_vacuum_air_leak",
      "drivetrain_leak_or_boot"
    ],
    "partTags": [
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line",
      "iwe_solenoid_actuator",
      "transfer_case_area",
      "driveshaft_u_joint",
      "differential_cover"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rough_idle",
      "hiss",
      "vibration",
      "rattle",
      "clunk"
    ],
    "systemTags": [
      "electrical",
      "intake_vacuum",
      "fuel_air_metering",
      "drivetrain_4wd"
    ],
    "id": "nhtsa-tsb-11005305",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "WHEELS",
    "inspectionHint": "This article supersedes TSB 22-2219 to update the Parts List and Service Procedure to clarify applicable steps by vehicle application. Some 2003-2020 Expedition/Navigator and 2006-2020 F-150 (non-Raptor) vehicles equipp…",
    "sourceCitationKey": "11005305"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10254138",
      "SSM 52476",
      "EQUIPMENT"
    ],
    "excerpt": "All accessory stick-on keyless entry keypads come with a wallet card containing the master code. If the accessory keypad was factory installed, this card will be placed in the glove box and should be handed to the vehicle\u001as owner during initial delivery. Unlike the integrated (wired) factory keypad, the accessory keypad master code cannot be retrieved from the vehicle using a diagnostic scan tool. If the wallet card…",
    "issueAreaIds": [
      "intake_vacuum_air_leak"
    ],
    "partTags": [
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rough_idle",
      "hiss"
    ],
    "systemTags": [
      "electrical",
      "intake_vacuum",
      "fuel_air_metering"
    ],
    "id": "nhtsa-tsb-10254138",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "EQUIPMENT",
    "inspectionHint": "All accessory stick-on keyless entry keypads come with a wallet card containing the master code. If the accessory keypad was factory installed, this card will be placed in the glove box and should be handed to the vehic…",
    "sourceCitationKey": "10254138"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10235153",
      "SSM 51536",
      "STRUCTURE"
    ],
    "excerpt": "For 2000-2024 Ford and Lincoln vehicles, swapping a module from a vehicle for diagnosis purposes is likely to cause errors and is not recommended. It is also not recommended to order a replacement module using a vehicle identification number (VIN) from a different vehicle. Most modules on these affected vehicles are VIN/vehicle specific and hardware variations between modules do exist. Swapping a module from a vehic…",
    "issueAreaIds": [
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "corrosion"
    ],
    "systemTags": [
      "electrical",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10235153",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "STRUCTURE",
    "inspectionHint": "For 2000-2024 Ford and Lincoln vehicles, swapping a module from a vehicle for diagnosis purposes is likely to cause errors and is not recommended. It is also not recommended to order a replacement module using a vehicle…",
    "sourceCitationKey": "10235153"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10214754",
      "TSB 22-2219",
      "POWER TRAIN"
    ],
    "excerpt": "Some 2003-2020 Expedition/Navigator and 2006-2020 F-150 (non-Raptor) vehicles equipped with 4WD may exhibit grinding/clicking/ratcheting noise from the front wheel area. This may be due to partial engagement of the integrated wheel ends (IWE). To correct this condition, follow the Service Procedure to remove and cap the vacuum supply line or to reprogram the transfer case control module (TCCM) and replace any worn v…",
    "issueAreaIds": [
      "intake_vacuum_air_leak",
      "drivetrain_leak_or_boot"
    ],
    "partTags": [
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line",
      "iwe_solenoid_actuator",
      "transfer_case_area",
      "driveshaft_u_joint",
      "differential_cover"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rough_idle",
      "hiss",
      "vibration",
      "rattle",
      "clunk"
    ],
    "systemTags": [
      "electrical",
      "intake_vacuum",
      "fuel_air_metering",
      "drivetrain_4wd"
    ],
    "id": "nhtsa-tsb-10214754",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN",
    "inspectionHint": "Some 2003-2020 Expedition/Navigator and 2006-2020 F-150 (non-Raptor) vehicles equipped with 4WD may exhibit grinding/clicking/ratcheting noise from the front wheel area. This may be due to partial engagement of the inte…",
    "sourceCitationKey": "10214754"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10204989",
      "Service Informat",
      "ELECTRICAL SYSTEM",
      "EQUIPMENT"
    ],
    "excerpt": "Online automotive service information system for April 2016-AM/FM/CD or sync with a 4.2 inch screen may exhibit a blank screen and no a;udio after a crank event.",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [
      "electrical"
    ],
    "id": "nhtsa-tsb-10204989",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ELECTRICAL SYSTEM",
    "inspectionHint": "Online automotive service information system for April 2016-AM/FM/CD or sync with a 4.2 inch screen may exhibit a blank screen and no a;udio after a crank event.",
    "sourceCitationKey": "10204989"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10204997",
      "TSB160032",
      "POWER TRAIN"
    ],
    "excerpt": "4R75E Transmission - Grinding/Whine/Vibration/Gear Slippage - Serrvice Kit available",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10204997",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN",
    "inspectionHint": "4R75E Transmission - Grinding/Whine/Vibration/Gear Slippage - Serrvice Kit available",
    "sourceCitationKey": "10204997"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10181917",
      "TSB 20-2307",
      "EQUIPMENT",
      "ELECTRICAL SYSTEM",
      "WHEELS"
    ],
    "excerpt": "Some 2003-2020 Expedition/Navigator and 2006-2020 F-150 vehicles equipped with TOD transfer cases may exhibit grinding/clicking/ratcheting noise from the front wheel area. This may be due to partial engagement of the integrated wheel ends (IWE). To correct this condition, follow the Service Procedure steps to remove and cap the vacuum supply line.",
    "issueAreaIds": [
      "intake_vacuum_air_leak",
      "drivetrain_leak_or_boot"
    ],
    "partTags": [
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line",
      "iwe_solenoid_actuator",
      "transfer_case_area",
      "driveshaft_u_joint",
      "differential_cover"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rough_idle",
      "hiss",
      "vibration",
      "rattle",
      "clunk"
    ],
    "systemTags": [
      "electrical",
      "intake_vacuum",
      "fuel_air_metering",
      "drivetrain_4wd"
    ],
    "id": "nhtsa-tsb-10181917",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "EQUIPMENT",
    "inspectionHint": "Some 2003-2020 Expedition/Navigator and 2006-2020 F-150 vehicles equipped with TOD transfer cases may exhibit grinding/clicking/ratcheting noise from the front wheel area. This may be due to partial engagement of the in…",
    "sourceCitationKey": "10181917"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10177863",
      "TSB 20-2233",
      "STRUCTURE"
    ],
    "excerpt": "This article supersedes TSB 19-2026 to update the vehicle model years affected. Some 2000 and newer Ford/Lincoln/Mercury vehicles equipped with aluminum body panels may exhibit corrosion concerns appearing as bubbled and/or peeling paint with or without accompanying white dust. Panel replacement is recommended.",
    "issueAreaIds": [
      "wheel_well_underbody_rust",
      "underbody_frame_corrosion",
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "frame_section",
      "wheel_well_lip",
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rust",
      "corrosion"
    ],
    "systemTags": [
      "underbody",
      "body",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10177863",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "STRUCTURE",
    "inspectionHint": "This article supersedes TSB 19-2026 to update the vehicle model years affected. Some 2000 and newer Ford/Lincoln/Mercury vehicles equipped with aluminum body panels may exhibit corrosion concerns appearing as bubbled an…",
    "sourceCitationKey": "10177863"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10172885",
      "DOR-N3Z7B-03",
      "ENGINE AND ENGINE COOLING"
    ],
    "excerpt": "This SKU is an Oil Dipstick. The customer communication requested return of unsold inventory to inspect the dipstick tube. The dipstick tube inner diameter may be small enough that it prevents installation of the OE dipstick.",
    "issueAreaIds": [
      "intake_vacuum_air_leak"
    ],
    "partTags": [
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rough_idle",
      "hiss"
    ],
    "systemTags": [
      "intake_vacuum",
      "fuel_air_metering"
    ],
    "id": "nhtsa-tsb-10172885",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ENGINE AND ENGINE COOLING",
    "inspectionHint": "This SKU is an Oil Dipstick. The customer communication requested return of unsold inventory to inspect the dipstick tube",
    "sourceCitationKey": "10172885"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10164508",
      "SSM 48130",
      "VISIBILITY:GLASS",
      "SIDE/REAR",
      "VISIBILITY"
    ],
    "excerpt": "Some 2010-2020 vehicles may exhibit distorted glass with a subtle orange peel pattern or streaking etched into the surface. This is caused by hydrofluoric acid which is used in some car wash solutions as a cleaning agent. Hydrofluoric acid can attack the glass and cause visual distortion and/or discoloration on the outer surface which cannot be removed by further cleaning. If this type of distortion is found, inspec…",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10164508",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "VISIBILITY:GLASS",
    "inspectionHint": "Some 2010-2020 vehicles may exhibit distorted glass with a subtle orange peel pattern or streaking etched into the surface. This is caused by hydrofluoric acid which is used in some car wash solutions as a cleaning agent",
    "sourceCitationKey": "10164508"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10163573",
      "SSM 48070",
      "ELECTRICAL SYSTEM",
      "EQUIPMENT:APPLIANCE:AIR CONDITIONER"
    ],
    "excerpt": "Some 2009-2017 Expedition/Navigator, 2009-2014 F-150/Mustang, 2008-2009 Sable, 2008-2019 Taurus/Flex/MKT, 2013-2019 Police Interceptor Sedan/Utility, and 2011-2019 Explorer vehicles may exhibit inoperative or intermittent HVAC blower motor function at various fan speed settings. This may be due to a poor electrical connection at the blower motor speed control. If the blower motor speed control is determined to be th…",
    "issueAreaIds": [
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "corrosion"
    ],
    "systemTags": [
      "electrical",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10163573",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ELECTRICAL SYSTEM",
    "inspectionHint": "Some 2009-2017 Expedition/Navigator, 2009-2014 F-150/Mustang, 2008-2009 Sable, 2008-2019 Taurus/Flex/MKT, 2013-2019 Police Interceptor Sedan/Utility, and 2011-2019 Explorer vehicles may exhibit inoperative or intermitte…",
    "sourceCitationKey": "10163573"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10160931",
      "SSM 47976",
      "POWER TRAIN"
    ],
    "excerpt": "On vehicles equipped with an automatic transmission it is imperative that the converter pilot hub be greased with Motorcraft Multi-Purpose Grease Spray XL-5-A even if grease was not applied from the factory. Also verify that the engine/transmission alignment dowel pins are present as well as the engine crankshaft dowel pin, if equipped, when installing the transmission. Failure to adequately lubricate the converter…",
    "issueAreaIds": [
      "intake_vacuum_air_leak",
      "drivetrain_leak_or_boot",
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line",
      "iwe_solenoid_actuator",
      "transfer_case_area",
      "driveshaft_u_joint",
      "differential_cover",
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rough_idle",
      "hiss",
      "vibration",
      "rattle",
      "clunk",
      "corrosion"
    ],
    "systemTags": [
      "intake_vacuum",
      "fuel_air_metering",
      "drivetrain_4wd",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10160931",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN",
    "inspectionHint": "On vehicles equipped with an automatic transmission it is imperative that the converter pilot hub be greased with Motorcraft Multi-Purpose Grease Spray XL-5-A even if grease was not applied from the factory. Also verify…",
    "sourceCitationKey": "10160931"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10156863",
      "TSB 19-2026",
      "STRUCTURE",
      "EQUIPMENT"
    ],
    "excerpt": "Some 2000 and newer Ford, Lincoln and Mercury vehicles equipped with aluminum body panels may exhibit corrosion concerns appearing as bubbled and/or peeling paint with or without accompanying white dust. Panel replacement is recommended. Follow the Service Procedure steps to correct the condition",
    "issueAreaIds": [
      "wheel_well_underbody_rust",
      "underbody_frame_corrosion",
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "frame_section",
      "wheel_well_lip",
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rust",
      "corrosion"
    ],
    "systemTags": [
      "underbody",
      "body",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10156863",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "STRUCTURE",
    "inspectionHint": "Some 2000 and newer Ford, Lincoln and Mercury vehicles equipped with aluminum body panels may exhibit corrosion concerns appearing as bubbled and/or peeling paint with or without accompanying white dust. Panel replaceme…",
    "sourceCitationKey": "10156863"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10156877",
      "SSM 47797",
      "EQUIPMENT:APPLIANCE:AIR CONDITIONER",
      "ELECTRICAL SYSTEM",
      "ENGINE AND ENGINE COOLING"
    ],
    "excerpt": "Some 2009-2017 Expedition/Navigator, 2009-2014 F-150/Mustang, 2008-2009 Sable, 2008-2019 Taurus/Flex/MKT, 2013-2019 Police Interceptor Sedan/Utility, and 2011-2019 Explorer vehicles may exhibit inoperative or intermittent HVAC blower motor function at various fan speed settings. This may be due to a poor electrical connection at the blower motor speed control. If the blower motor speed control is determined to be th…",
    "issueAreaIds": [
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "corrosion"
    ],
    "systemTags": [
      "electrical",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10156877",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "EQUIPMENT:APPLIANCE:AIR CONDITIONER",
    "inspectionHint": "Some 2009-2017 Expedition/Navigator, 2009-2014 F-150/Mustang, 2008-2009 Sable, 2008-2019 Taurus/Flex/MKT, 2013-2019 Police Interceptor Sedan/Utility, and 2011-2019 Explorer vehicles may exhibit inoperative or intermitte…",
    "sourceCitationKey": "10156877"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10155551",
      "TSB 19-2026",
      "STRUCTURE"
    ],
    "excerpt": "Some 2000 and newer Ford, Lincoln and Mercury vehicles equipped with aluminum body panels may exhibit corrosion concerns appearing as bubbled and/or peeling paint with or without accompanying white dust. Panel replacement is recommended. Follow the Service Procedure steps to correct the condition",
    "issueAreaIds": [
      "wheel_well_underbody_rust",
      "underbody_frame_corrosion",
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "frame_section",
      "wheel_well_lip",
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rust",
      "corrosion"
    ],
    "systemTags": [
      "underbody",
      "body",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10155551",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "STRUCTURE",
    "inspectionHint": "Some 2000 and newer Ford, Lincoln and Mercury vehicles equipped with aluminum body panels may exhibit corrosion concerns appearing as bubbled and/or peeling paint with or without accompanying white dust. Panel replaceme…",
    "sourceCitationKey": "10155551"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10155565",
      "SSM 47797",
      "ELECTRICAL SYSTEM",
      "EQUIPMENT:APPLIANCE:AIR CONDITIONER"
    ],
    "excerpt": "Some 2009-2017 Expedition/Navigator, 2009-2014 F-150/Mustang, 2008-2009 Sable, 2008-2019 Taurus/Flex/MKT, 2013-2019 Police Interceptor Sedan/Utility, and 2011-2019 Explorer vehicles may exhibit inoperative or intermittent HVAC blower motor function at various fan speed settings. This may be due to a poor electrical connection at the blower motor speed control. If the blower motor speed control is determined to be th…",
    "issueAreaIds": [
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "corrosion"
    ],
    "systemTags": [
      "electrical",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10155565",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ELECTRICAL SYSTEM",
    "inspectionHint": "Some 2009-2017 Expedition/Navigator, 2009-2014 F-150/Mustang, 2008-2009 Sable, 2008-2019 Taurus/Flex/MKT, 2013-2019 Police Interceptor Sedan/Utility, and 2011-2019 Explorer vehicles may exhibit inoperative or intermitte…",
    "sourceCitationKey": "10155565"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10143079",
      "SSM 47331",
      "EQUIPMENT",
      "ENGINE"
    ],
    "excerpt": "Various vehicles equipped with a 4.6L, 5.4L, 6.8L modular 3 valve engine built on or before 8-Jan-2016 may exhibit symptoms that may include upper end engine noise, rough running, misfire and/or engine damage. If diagnosis leads to only camshaft/camshaft roller follower(s) requiring replacement, replace all of the camshaft roller followers on both banks/cylinder heads with part number 3L3Z-6564-A, not just the fault…",
    "issueAreaIds": [
      "ignition_misfire_path"
    ],
    "partTags": [
      "spark_plug",
      "coil"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "misfire",
      "rough_idle"
    ],
    "systemTags": [
      "ignition"
    ],
    "id": "nhtsa-tsb-10143079",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "EQUIPMENT",
    "inspectionHint": "Various vehicles equipped with a 4.6L, 5.4L, 6.8L modular 3 valve engine built on or before 8-Jan-2016 may exhibit symptoms that may include upper end engine noise, rough running, misfire and/or engine damage. If diagno…",
    "sourceCitationKey": "10143079"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10140323",
      "SSM 47009",
      "EQUIPMENT:ELECTRICAL",
      "EQUIPMENT"
    ],
    "excerpt": "The Accessory (Wireless) Keyless Entry Keypad can only be used with vehicles that are factory built with Remote Keyless Entry (RKE). The master code for the Accessory (Wireless) Keyless Entry Keypad can be retrieved from FMCDealer - Parts and Service - Parts Product Line Information - Keys/Entry Devices - Aftermarket Keyless Entry Keypad Code Access. Access to this site is granted through Dealer Program Enrollment S…",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [
      "electrical"
    ],
    "id": "nhtsa-tsb-10140323",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "EQUIPMENT:ELECTRICAL",
    "inspectionHint": "The Accessory (Wireless) Keyless Entry Keypad can only be used with vehicles that are factory built with Remote Keyless Entry (RKE). The master code for the Accessory (Wireless) Keyless Entry Keypad can be retrieved fro…",
    "sourceCitationKey": "10140323"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10138524",
      "SSM 47009",
      "EQUIPMENT:ELECTRICAL"
    ],
    "excerpt": "The Accessory (Wireless) Keyless Entry Keypad can only be used with vehicles that are factory built with Remote Keyless Entry (RKE). The master code for the Accessory (Wireless) Keyless Entry Keypad can be retrieved from FMCDealer - Parts and Service - Parts Product Line Information - Keys/Entry Devices - Aftermarket Keyless Entry Keypad Code Access. Access to this site is granted through Dealer Program Enrollment S…",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [
      "electrical"
    ],
    "id": "nhtsa-tsb-10138524",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "EQUIPMENT:ELECTRICAL",
    "inspectionHint": "The Accessory (Wireless) Keyless Entry Keypad can only be used with vehicles that are factory built with Remote Keyless Entry (RKE). The master code for the Accessory (Wireless) Keyless Entry Keypad can be retrieved fro…",
    "sourceCitationKey": "10138524"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10137113",
      "SSM 47201",
      "EQUIPMENT"
    ],
    "excerpt": "Replacing the original equipment SYNC/Navigation system with either an aftermarket SYNC/Navigation kit or modifying original SYNC/Navigation parts to provide additional features is not recommended nor supported on any Ford, Mercury or Lincoln vehicle. Only approved Genuine Ford accessories or originally installed systems are supported and certified to function correctly with other vehicle systems. If you suspect a s…",
    "issueAreaIds": [
      "intake_vacuum_air_leak"
    ],
    "partTags": [
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rough_idle",
      "hiss"
    ],
    "systemTags": [
      "intake_vacuum",
      "fuel_air_metering"
    ],
    "id": "nhtsa-tsb-10137113",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "EQUIPMENT",
    "inspectionHint": "Replacing the original equipment SYNC/Navigation system with either an aftermarket SYNC/Navigation kit or modifying original SYNC/Navigation parts to provide additional features is not recommended nor supported on any F…",
    "sourceCitationKey": "10137113"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10136597",
      "SSM 47080",
      "EQUIPMENT:ELECTRICAL:RADIO/TAPE DECK/CD ETC."
    ],
    "excerpt": "2010-2018 various vehicles equipped with SYNC or SYNC 3 may not function when attempting to find or use the Spotify app via AppLink. As of an update released on 1/15/2018 Spotify will no longer be supporting their AppLink integration. No repair attempts should be attempted to correct this concern.",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [
      "electrical"
    ],
    "id": "nhtsa-tsb-10136597",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "EQUIPMENT:ELECTRICAL:RADIO/TAPE DECK/CD ETC.",
    "inspectionHint": "2010-2018 various vehicles equipped with SYNC or SYNC 3 may not function when attempting to find or use the Spotify app via AppLink. As of an update released on 1/15/2018 Spotify will no longer be supporting their AppLi…",
    "sourceCitationKey": "10136597"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10127405",
      "SSM 46900",
      "POWER TRAIN:AUTOMATIC TRANSMISSION:CONTROL MODULE (TCM/PCM/TECM)",
      "ELECTRICAL SYSTEM"
    ],
    "excerpt": "Some vehicles may exhibit a no start condition with an illuminated malfunction indicator lamp (MIL) and a DTC P161A after PCM replacement. This may be due to the parameter reset procedure not being properly completed. To clear this DTC, use the Ford Integrated Diagnostic System (IDS) service tool or Ford J2534 Diagnostic Software, select - Toolbox - Body - Security - PATS Functions - Parameter Reset. Follow the on-s…",
    "issueAreaIds": [
      "lighting_socket_wiring",
      "lamp_housing_moisture_or_mount"
    ],
    "partTags": [
      "lamp_socket",
      "light_bulb",
      "headlight_housing",
      "taillight_housing"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "hyperflash",
      "corrosion"
    ],
    "systemTags": [
      "electrical",
      "lighting"
    ],
    "id": "nhtsa-tsb-10127405",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN:AUTOMATIC TRANSMISSION:CONTROL MODULE (TCM/PCM/TECM)",
    "inspectionHint": "Some vehicles may exhibit a no start condition with an illuminated malfunction indicator lamp (MIL) and a DTC P161A after PCM replacement. This may be due to the parameter reset procedure not being properly completed",
    "sourceCitationKey": "10127405"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10109070",
      "SSM 46085",
      "ENGINE AND ENGINE COOLING:EXHAUST SYSTEM:EMISSION CONTROL",
      "ENGINE AND ENGINE COOLING:ENGINE:GASOLINE:BELTS AND ASSOCIATED PULLEYS",
      "ENGINE AND ENGINE COOLING:COOLING SYSTEM:HOSES/LINES/PIPING/FITTINGS"
    ],
    "excerpt": "The Powertrain Control/Emissions Diagnosis (PC/ED) manual has been revised for diagnosing electronic throttle bodies (ETBs). The ETC_ACT and ETC_DSD PIDs should not used to diagnose possible ETB concerns. The IDS has a limited refresh rate when reading these PIDs and cannot display quickly enough to validate a concern. The PCM automatically monitors these inputs more accurately and will set diagnostic trouble codes…",
    "issueAreaIds": [
      "coolant_leak_source",
      "cooling_reservoir_and_hose_seep",
      "exhaust_manifold_tick",
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "coolant_reservoir",
      "coolant_hose",
      "radiator_hose",
      "thermostat_housing",
      "exhaust_manifold",
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "leak",
      "coolant_smell",
      "exhaust_tick",
      "ticking",
      "rattle",
      "corrosion"
    ],
    "systemTags": [
      "cooling",
      "exhaust_emissions",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10109070",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ENGINE AND ENGINE COOLING:EXHAUST SYSTEM:EMISSION CONTROL",
    "inspectionHint": "The Powertrain Control/Emissions Diagnosis (PC/ED) manual has been revised for diagnosing electronic throttle bodies (ETBs). The ETC_ACT and ETC_DSD PIDs should not used to diagnose possible ETB concerns",
    "sourceCitationKey": "10109070"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10099463",
      "SSM 46451",
      "POWER TRAIN:AUTOMATIC TRANSMISSION"
    ],
    "excerpt": "2009-2017 VEHICLES EQUIPPED WITH A 6R80, 6R100, 6R140 AUTOMATIC TRANSMISSION HAVE AN UPDATED MAIN CONTROL VALVE BODY OVERHAUL PROCEDURE. REFER TO WORKSHOP MANUAL (WSM), SECTION 307-01 FOR MAIN CONTROL VALVE BODY (7A100) OVERHAUL PROCEDURES. NOT ALL VALVE BODIES REQUIRE REPLACEMENT. INSPECT THE VALVE BODY BORES, SPRINGS AND VALVES AS DIRECTED DURING DIAGNOSIS AND REPAIR. REFER TO GENERAL SERVICE BULLETIN (GSB) G00000…",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10099463",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN:AUTOMATIC TRANSMISSION",
    "inspectionHint": "2009-2017 VEHICLES EQUIPPED WITH A 6R80, 6R100, 6R140 AUTOMATIC TRANSMISSION HAVE AN UPDATED MAIN CONTROL VALVE BODY OVERHAUL PROCEDURE. REFER TO WORKSHOP MANUAL (WSM), SECTION 307-01 FOR MAIN CONTROL VALVE BODY (7A100)…",
    "sourceCitationKey": "10099463"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10092370",
      "TSB16-0108",
      "POWER TRAIN"
    ],
    "excerpt": "SOME 2004-2014 F-150 AND 2006-2008 MARK LT VEHICLES EQUIPPED WITH FOUR-WHEEL DRIVE (4WD) MAY EXHIBIT NOISY OR ENGAGED FRONT HUBS WHEN OPERATING IN TWO-WHEEL DRIVE (2WD) MODE. FOLLOW THE SERVICE PROCEDURE STEPS TO CORRECT THE CONDITION.",
    "issueAreaIds": [
      "drivetrain_leak_or_boot"
    ],
    "partTags": [
      "iwe_solenoid_actuator",
      "transfer_case_area",
      "driveshaft_u_joint",
      "differential_cover"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "vibration",
      "rattle",
      "clunk"
    ],
    "systemTags": [
      "drivetrain_4wd"
    ],
    "id": "nhtsa-tsb-10092370",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN",
    "inspectionHint": "SOME 2004-2014 F-150 AND 2006-2008 MARK LT VEHICLES EQUIPPED WITH FOUR-WHEEL DRIVE (4WD) MAY EXHIBIT NOISY OR ENGAGED FRONT HUBS WHEN OPERATING IN TWO-WHEEL DRIVE (2WD) MODE. FOLLOW THE SERVICE PROCEDURE STEPS TO CORREC…",
    "sourceCitationKey": "10092370"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10091441",
      "SSM 45950",
      "STRUCTURE",
      "EQUIPMENT"
    ],
    "excerpt": "SOME 2009-2014 F-150 VEHICLES THAT REQUIRE REPLACEMENT OF THE LOWER ROCKER PANEL AND/OR CAB CORNERS NO LONGER NEED THE ENTIRE DOOR FRAME/OPENING PANEL (211A10/1) REPLACED. A NEW LOWER LEVEL SERVICE ROCKER PATCH PANEL(211A80/1) IS NOW AVAILABLE TO ORDER.",
    "issueAreaIds": [
      "wheel_well_underbody_rust",
      "underbody_frame_corrosion"
    ],
    "partTags": [
      "frame_section",
      "wheel_well_lip"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rust"
    ],
    "systemTags": [
      "underbody",
      "body"
    ],
    "id": "nhtsa-tsb-10091441",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "STRUCTURE",
    "inspectionHint": "SOME 2009-2014 F-150 VEHICLES THAT REQUIRE REPLACEMENT OF THE LOWER ROCKER PANEL AND/OR CAB CORNERS NO LONGER NEED THE ENTIRE DOOR FRAME/OPENING PANEL (211A10/1) REPLACED. A NEW LOWER LEVEL SERVICE ROCKER PATCH PANEL(21…",
    "sourceCitationKey": "10091441"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10091204",
      "TSB16-0097",
      "SEATS"
    ],
    "excerpt": "SOME 2009-2010 F-150 AND 2011-2016 EXPLORER VEHICLES MAY HAVE A SEAT CUSHION COVER THAT APPEARS LOOSE NEAR THE FRONT OF THE SEAT. THIS MAY BE CAUSED BY THE SEAT CUSHION COVER J-RETAINER BECOMING DISENGAGED FROM THE SEAT CUSHION PAN FLANGE. FOLLOW THE SERVICE PROCEDURE STEPS TO CORRECT THE CONDITION.",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10091204",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "SEATS",
    "inspectionHint": "SOME 2009-2010 F-150 AND 2011-2016 EXPLORER VEHICLES MAY HAVE A SEAT CUSHION COVER THAT APPEARS LOOSE NEAR THE FRONT OF THE SEAT. THIS MAY BE CAUSED BY THE SEAT CUSHION COVER J-RETAINER BECOMING DISENGAGED FROM THE SEAT…",
    "sourceCitationKey": "10091204"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10074713",
      "TSB-15-0137",
      "ENGINE"
    ],
    "excerpt": "SUMMARY TO BE PROVIDED ON A FUTURE DATE.",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10074713",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ENGINE",
    "inspectionHint": "SUMMARY TO BE PROVIDED ON A FUTURE DATE.",
    "sourceCitationKey": "10074713"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10075262",
      "16-0032",
      "POWER TRAIN"
    ],
    "excerpt": "4R75E TRANSMISSION - GRINDING/WHINE/VIBRATION/GEAR SLIPPAGE - SERVICE KIT AVAILABLE ISSUE A service kit has been released to assist with proper repair of the 4R75E transmission in 2008 Mark LT, 2008-2010 F-150, 2008-2010 / 2013-2014 E-Series, 2008-2011 Crown Victoria, Grand Marquis and Town Car vehicles that exhibit a grinding, whine-type noise, vibration and/or gear slippage while driving, or a loss of reverse resu…",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10075262",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN",
    "inspectionHint": "4R75E TRANSMISSION - GRINDING/WHINE/VIBRATION/GEAR SLIPPAGE - SERVICE KIT AVAILABLE ISSUE A service kit has been released to assist with proper repair of the 4R75E transmission in 2008 Mark LT, 2008-2010 F-150, 2008-201…",
    "sourceCitationKey": "10075262"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10058236",
      "15-0114",
      "SUSPENSION:REAR:AXLE:NON-POWERED AXLE ASSEMBLY"
    ],
    "excerpt": "FORD F-150 2009-2012 : SOME TRUCKS WITH A 9.75 TRACTION LOK REAR AXLE ASSEMBLY MAY EXHIBIT, DURING TIGHT SLOW TURNS, VIBRATION, CHATTER OR A SHUDDER. *LJ",
    "issueAreaIds": [
      "steering_linkage_wear"
    ],
    "partTags": [
      "tie_rod_end"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "pull",
      "vibration",
      "clunk"
    ],
    "systemTags": [
      "suspension_steering"
    ],
    "id": "nhtsa-tsb-10058236",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "SUSPENSION:REAR:AXLE:NON-POWERED AXLE ASSEMBLY",
    "inspectionHint": "FORD F-150 2009-2012 : SOME TRUCKS WITH A 9.75 TRACTION LOK REAR AXLE ASSEMBLY MAY EXHIBIT, DURING TIGHT SLOW TURNS, VIBRATION, CHATTER OR A SHUDDER. *LJ",
    "sourceCitationKey": "10058236"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10058199",
      "44964",
      "SUSPENSION:FRONT:SPRINGS:LEAF SPRING ASSEMBLY:U-BOLT",
      "LEAF SPRING TO AXLE"
    ],
    "excerpt": "FORD 2009-2014 F150: SERVICE INFORMATION REGARDING , DAMAGED 4X4 FRONT PINION BEARING DAMAGE IS NOTED DURING THE REPAIR OF THE FRONT AXLE ON 2009-2014 F150 VEHICLES UNITS OPERATED IN SEVERE COLD CLIMATES. *LJ",
    "issueAreaIds": [
      "steering_linkage_wear",
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "tie_rod_end",
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "pull",
      "vibration",
      "clunk",
      "corrosion"
    ],
    "systemTags": [
      "suspension_steering",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10058199",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "SUSPENSION:FRONT:SPRINGS:LEAF SPRING ASSEMBLY:U-BOLT",
    "inspectionHint": "FORD 2009-2014 F150: SERVICE INFORMATION REGARDING , DAMAGED 4X4 FRONT PINION BEARING DAMAGE IS NOTED DURING THE REPAIR OF THE FRONT AXLE ON 2009-2014 F150 VEHICLES UNITS OPERATED IN SEVERE COLD CLIMATES. *LJ",
    "sourceCitationKey": "10058199"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10057834",
      "44863",
      "VISIBILITY:POWER WINDOW DEVICES AND CONTROLS"
    ],
    "excerpt": "FORD: NO SERVICE ACTION IS RECOMMENDED FOR THIS CONDITION. PLEASE USE AT YOUR DISCRETION. VARIOUS 2010-2015 VEHICLES MAY EXPERIENCE A TURBULENCE NOISE, SIMILAR TO AN HELICOPTER NOISE, AT HIGHWAY SPEEDS WHEN THE REAR DOOR WINDOW(S) OR SUNROOF ARE OPEN. *TA",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10057834",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "VISIBILITY:POWER WINDOW DEVICES AND CONTROLS",
    "inspectionHint": "FORD: NO SERVICE ACTION IS RECOMMENDED FOR THIS CONDITION. PLEASE USE AT YOUR DISCRETION",
    "sourceCitationKey": "10057834"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10056749",
      "ASI-44669",
      "EQUIPMENT ADAPTIVE/MOBILITY"
    ],
    "excerpt": "FORD/LINCOLN: THERE WILL BE 2 NEW PIECE RECEIVER DRYER DESICCANT BAG THAT WILL REPLACE 1 PIECE RECEIVER DRY CARTRIDGE, WHICH ARE INTERCHANGABLE, FULLY, DO NOT AFFECT FORM, FIT, OR FUNCTION. MODEL 2011-14 F-SUPER DUTY, 2009-14 F150, 2007-14 EXPEDITION/NAVIGATOR. *PE",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10056749",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "EQUIPMENT ADAPTIVE/MOBILITY",
    "inspectionHint": "FORD/LINCOLN: THERE WILL BE 2 NEW PIECE RECEIVER DRYER DESICCANT BAG THAT WILL REPLACE 1 PIECE RECEIVER DRY CARTRIDGE, WHICH ARE INTERCHANGABLE, FULLY, DO NOT AFFECT FORM, FIT, OR FUNCTION. MODEL 2011-14 F-SUPER DUTY, 2…",
    "sourceCitationKey": "10056749"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10056701",
      "TSB-14-0153",
      "POWER TRAIN:AUTOMATIC TRANSMISSION"
    ],
    "excerpt": "FORD/LINCOLN/MERCURY: FAILURE OF PLANETARY GEAR ASSEMBLY IS DUE TO TRANSMISSION, ON CERTAIN VEHICLES, EXHIBITING GRINDING, GEAR SLIPPAGE, WHINE TYPE NOISE, VIBRATION, WHILE DRIVING OR LOSS OF REVERSE. *PE",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10056701",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN:AUTOMATIC TRANSMISSION",
    "inspectionHint": "FORD/LINCOLN/MERCURY: FAILURE OF PLANETARY GEAR ASSEMBLY IS DUE TO TRANSMISSION, ON CERTAIN VEHICLES, EXHIBITING GRINDING, GEAR SLIPPAGE, WHINE TYPE NOISE, VIBRATION, WHILE DRIVING OR LOSS OF REVERSE. *PE",
    "sourceCitationKey": "10056701"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10056338",
      "TSB-14-0084",
      "ENGINE",
      "ELECTRICAL SYSTEM"
    ],
    "excerpt": "FORD/LINCOLN: SOME TRUCKS ARE EXPERIENCING DIAGNOSTIC TROUBLE CODES (DTC) P2270 OR P2272, MALFUNCTION INDICATOR LAMP (MIL) COMES ON. MODEL 2010-2011 RANGER, 2010-2012 E SERIES, EXPEDITION, F-150, F-SUPER DUTY, NAVIGATOR. *PE",
    "issueAreaIds": [
      "lighting_socket_wiring",
      "lamp_housing_moisture_or_mount"
    ],
    "partTags": [
      "lamp_socket",
      "light_bulb",
      "headlight_housing",
      "taillight_housing"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "hyperflash",
      "corrosion"
    ],
    "systemTags": [
      "electrical",
      "lighting"
    ],
    "id": "nhtsa-tsb-10056338",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ENGINE",
    "inspectionHint": "FORD/LINCOLN: SOME TRUCKS ARE EXPERIENCING DIAGNOSTIC TROUBLE CODES (DTC) P2270 OR P2272, MALFUNCTION INDICATOR LAMP (MIL) COMES ON. MODEL 2010-2011 RANGER, 2010-2012 E SERIES, EXPEDITION, F-150, F-SUPER DUTY, NAVIGATOR",
    "sourceCitationKey": "10056338"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10056191",
      "ASI-44538",
      "POWER TRAIN:AUTOMATIC TRANSMISSION"
    ],
    "excerpt": "FORD/LINCOLN/MERCURY: THE INDICATOR MAY ILLUMINATE OVERDRIVE OFF AND/OR SLIPPING IN 3RD OR NO 4TH GEAR, DUE TO DIRECT CLUTCH FAILURE AND DIAGNOSTIC TROUBLE CODE (DTC) P0733 AND/OR P0734. MODEL 2008-2013 MARK LT, F-150, CROWN VICTORIA, GRAND MARQUIS, TOWN CAR, E SERIES. *PE",
    "issueAreaIds": [
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "corrosion"
    ],
    "systemTags": [
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10056191",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN:AUTOMATIC TRANSMISSION",
    "inspectionHint": "FORD/LINCOLN/MERCURY: THE INDICATOR MAY ILLUMINATE OVERDRIVE OFF AND/OR SLIPPING IN 3RD OR NO 4TH GEAR, DUE TO DIRECT CLUTCH FAILURE AND DIAGNOSTIC TROUBLE CODE (DTC) P0733 AND/OR P0734. MODEL 2008-2013 MARK LT, F-150,…",
    "sourceCitationKey": "10056191"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10056170",
      "ASI-44531",
      "SEATS:FRONT ASSEMBLY:POWER ADJUST"
    ],
    "excerpt": "LINCOLN/FORD: ON SOME VEHICLES AND TRUCKS, THERE IS A POPPING, SQUEALING, BINDING OR GRINDING NOISE COME FROM POWER SEATS WHEN MOVING BACKWARDS OR FORWARD. MODEL 2009-2015 F-150, TAURUS, FLEX, MKT, MKS, F-SUPER DUTY, EXPLORER. *PE",
    "issueAreaIds": [
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "corrosion"
    ],
    "systemTags": [
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10056170",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "SEATS:FRONT ASSEMBLY:POWER ADJUST",
    "inspectionHint": "LINCOLN/FORD: ON SOME VEHICLES AND TRUCKS, THERE IS A POPPING, SQUEALING, BINDING OR GRINDING NOISE COME FROM POWER SEATS WHEN MOVING BACKWARDS OR FORWARD. MODEL 2009-2015 F-150, TAURUS, FLEX, MKT, MKS, F-SUPER DUTY, EX…",
    "sourceCitationKey": "10056170"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10056148",
      "TSB-14-0114",
      "ENGINE"
    ],
    "excerpt": "LINCOLN/FORD: WHEN DRIVING FROM IDLE UP TO 1200 RPM, THERE MAY BE AN INTERMITTENT RATTLE NOISE COMING FROM ENGINE. 2004-2013 F-150, F-250, F-350, EXPEDITION, MARK LT, NAVIGATOR. *PE",
    "issueAreaIds": [
      "intake_vacuum_air_leak"
    ],
    "partTags": [
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rough_idle",
      "hiss"
    ],
    "systemTags": [
      "intake_vacuum",
      "fuel_air_metering"
    ],
    "id": "nhtsa-tsb-10056148",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ENGINE",
    "inspectionHint": "LINCOLN/FORD: WHEN DRIVING FROM IDLE UP TO 1200 RPM, THERE MAY BE AN INTERMITTENT RATTLE NOISE COMING FROM ENGINE. 2004-2013 F-150, F-250, F-350, EXPEDITION, MARK LT, NAVIGATOR",
    "sourceCitationKey": "10056148"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10055783",
      "TSB-14-0069",
      "POWER TRAIN:AUTOMATIC TRANSMISSION"
    ],
    "excerpt": "LINCOLN/MERCURY/FORD: THERE IS FLUID LEAKING AROUND THE TRANSMISSION BULKHEAD CONNECTOR SLEEVE, FROM THE TRANSMISSION. MODEL 2009-10 EXPEDITION, EXPLORER, EXPLORER SPORT TRAC, F-150, NAVIGATOR, MOUNTAINEER. *PE",
    "issueAreaIds": [
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "corrosion"
    ],
    "systemTags": [
      "electrical",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10055783",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN:AUTOMATIC TRANSMISSION",
    "inspectionHint": "LINCOLN/MERCURY/FORD: THERE IS FLUID LEAKING AROUND THE TRANSMISSION BULKHEAD CONNECTOR SLEEVE, FROM THE TRANSMISSION. MODEL 2009-10 EXPEDITION, EXPLORER, EXPLORER SPORT TRAC, F-150, NAVIGATOR, MOUNTAINEER",
    "sourceCitationKey": "10055783"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10055638",
      "ASI-44421",
      "SUSPENSION:REAR:SHOCK ABSORBER"
    ],
    "excerpt": "FORD: ON SOME TRUCKS, THERE IS NOISE (CHIRP, CLUNK, BOOM) COMING FROM RIGHT FRONT REAR SHOCK ABSORBER, WHEN TRAVELING OVER SHARP, SMALL BUMPS (POTHOLES, FROST HEAVES OR EXPANSION JOINTS, AND MORE APPARENT DURING COLD TEMPERATURES. MODEL 2010-2014 F-150. *PE",
    "issueAreaIds": [
      "steering_linkage_wear",
      "brake_hose_or_line_concern"
    ],
    "partTags": [
      "tie_rod_end",
      "brake_line",
      "brake_hose"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "pull",
      "vibration",
      "clunk",
      "leak"
    ],
    "systemTags": [
      "suspension_steering",
      "brakes"
    ],
    "id": "nhtsa-tsb-10055638",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "SUSPENSION:REAR:SHOCK ABSORBER",
    "inspectionHint": "FORD: ON SOME TRUCKS, THERE IS NOISE (CHIRP, CLUNK, BOOM) COMING FROM RIGHT FRONT REAR SHOCK ABSORBER, WHEN TRAVELING OVER SHARP, SMALL BUMPS (POTHOLES, FROST HEAVES OR EXPANSION JOINTS, AND MORE APPARENT DURING COLD TE…",
    "sourceCitationKey": "10055638"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10055041",
      "ASI-44383",
      "EQUIPMENT ADAPTIVE/MOBILITY"
    ],
    "excerpt": "FORD: WHILE REPAIRING THE FRONT AXLE, DAMAGE TO PINION BEARING IS NOTED AFTER OPERATING IN SEVERE COLD CLIMATES. MODEL 2009-2014 F-150. *PE",
    "issueAreaIds": [
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "corrosion"
    ],
    "systemTags": [
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10055041",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "EQUIPMENT ADAPTIVE/MOBILITY",
    "inspectionHint": "FORD: WHILE REPAIRING THE FRONT AXLE, DAMAGE TO PINION BEARING IS NOTED AFTER OPERATING IN SEVERE COLD CLIMATES. MODEL 2009-2014 F-150",
    "sourceCitationKey": "10055041"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10055029",
      "ASI-44362",
      "SUSPENSION:FRONT:SHOCK ABSORBER",
      "SUSPENSION:REAR:SHOCK ABSORBER"
    ],
    "excerpt": "FORD: ON SOME VEHICLES, FLUID IS PRESENT ON SHOCK ABSORBER SHAFT TO BODY INTERFACE OR THERE IS WETNESS AT REAR RESERVOIR SNAP RING AND NO REPLACEMENT SHOULD OCCUR, SINCE SHOCK WEEPAGE IS NORMAL. MODEL 2010-2014 F-150 RAPTOR. *PE",
    "issueAreaIds": [
      "steering_linkage_wear",
      "brake_hose_or_line_concern"
    ],
    "partTags": [
      "tie_rod_end",
      "brake_line",
      "brake_hose"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "pull",
      "vibration",
      "clunk",
      "leak"
    ],
    "systemTags": [
      "suspension_steering",
      "brakes"
    ],
    "id": "nhtsa-tsb-10055029",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "SUSPENSION:FRONT:SHOCK ABSORBER",
    "inspectionHint": "FORD: ON SOME VEHICLES, FLUID IS PRESENT ON SHOCK ABSORBER SHAFT TO BODY INTERFACE OR THERE IS WETNESS AT REAR RESERVOIR SNAP RING AND NO REPLACEMENT SHOULD OCCUR, SINCE SHOCK WEEPAGE IS NORMAL. MODEL 2010-2014 F-150 RA…",
    "sourceCitationKey": "10055029"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10054920",
      "TSB-14-0010",
      "ENGINE AND ENGINE COOLING:ENGINE:GASOLINE:TURBO/SUPERCHARGER"
    ],
    "excerpt": "FORD: SOME TRUCKS WILL EXPERIENCE A NO OR HARD START CONDITION IF WEATHER IS BELOW -15 CELSIUS, 0 FAHRENHEIT. MODEL 2011-2014 F-150. *PE",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10054920",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ENGINE AND ENGINE COOLING:ENGINE:GASOLINE:TURBO/SUPERCHARGER",
    "inspectionHint": "FORD: SOME TRUCKS WILL EXPERIENCE A NO OR HARD START CONDITION IF WEATHER IS BELOW -15 CELSIUS, 0 FAHRENHEIT. MODEL 2011-2014 F-150",
    "sourceCitationKey": "10054920"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10054546",
      "ASI-44281",
      "SUSPENSION:REAR:SHOCK ABSORBER"
    ],
    "excerpt": "FORD: THE SHOCK ABSORBER HAS FLUID OR WETNESS AT REAR RESERVOIR SNAP RING AND WEEPAGE OR LEAKAGE IS NORMAL AND WILL NOT HAVE A DETRIMENTAL EFFECT TO LIFT OF SHOCK ABSORBERS OR SUSPENSION. MODEL 2010-2013 F-150. *PE",
    "issueAreaIds": [
      "steering_linkage_wear",
      "brake_hose_or_line_concern"
    ],
    "partTags": [
      "tie_rod_end",
      "brake_line",
      "brake_hose"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "pull",
      "vibration",
      "clunk",
      "leak"
    ],
    "systemTags": [
      "suspension_steering",
      "brakes"
    ],
    "id": "nhtsa-tsb-10054546",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "SUSPENSION:REAR:SHOCK ABSORBER",
    "inspectionHint": "FORD: THE SHOCK ABSORBER HAS FLUID OR WETNESS AT REAR RESERVOIR SNAP RING AND WEEPAGE OR LEAKAGE IS NORMAL AND WILL NOT HAVE A DETRIMENTAL EFFECT TO LIFT OF SHOCK ABSORBERS OR SUSPENSION. MODEL 2010-2013 F-150",
    "sourceCitationKey": "10054546"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10054547",
      "ASI-44282",
      "EQUIPMENT ADAPTIVE/MOBILITY",
      "EQUIPMENT"
    ],
    "excerpt": "FORD: THE TORCA*CLAMP, THAT SECURES TWO CATALYST PIPES, REQUIRES REPLACEMENT DUE TO REPEATED STRETCHING AND NO LONGER PROVIDE NECESSARY CLAMPING FORCE SEALING EXHAUST JOINT. MODEL 2010-2014 F-150. *PE",
    "issueAreaIds": [
      "lighting_socket_wiring",
      "lamp_housing_moisture_or_mount",
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "lamp_socket",
      "light_bulb",
      "headlight_housing",
      "taillight_housing",
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "hyperflash",
      "corrosion"
    ],
    "systemTags": [
      "lighting",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10054547",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "EQUIPMENT ADAPTIVE/MOBILITY",
    "inspectionHint": "FORD: THE TORCA*CLAMP, THAT SECURES TWO CATALYST PIPES, REQUIRES REPLACEMENT DUE TO REPEATED STRETCHING AND NO LONGER PROVIDE NECESSARY CLAMPING FORCE SEALING EXHAUST JOINT. MODEL 2010-2014 F-150",
    "sourceCitationKey": "10054547"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10053458",
      "ASI-32295",
      "SERVICE BRAKES",
      "AIR:ANTILOCK:CONTROL UNIT/MODULE"
    ],
    "excerpt": "FORD: ON SOME VEHICLES, DURING A PROGRAMMABLE MODULE INSTALLATION (PMI) OF ANTI LOCK BRAKE (ABS) MODULE AN IDS ERROR MESSAGE APPEARS, IF IDS SESSION STARTED WITH NEW ABS MODULE CONNECT. MODELS 2010-2013 F-150. *PE",
    "issueAreaIds": [
      "brake_hose_or_line_concern",
      "intake_vacuum_air_leak"
    ],
    "partTags": [
      "brake_line",
      "brake_hose",
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "leak",
      "pull",
      "rough_idle",
      "hiss"
    ],
    "systemTags": [
      "electrical",
      "brakes",
      "intake_vacuum",
      "fuel_air_metering"
    ],
    "id": "nhtsa-tsb-10053458",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "SERVICE BRAKES",
    "inspectionHint": "FORD: ON SOME VEHICLES, DURING A PROGRAMMABLE MODULE INSTALLATION (PMI) OF ANTI LOCK BRAKE (ABS) MODULE AN IDS ERROR MESSAGE APPEARS, IF IDS SESSION STARTED WITH NEW ABS MODULE CONNECT. MODELS 2010-2013 F-150",
    "sourceCitationKey": "10053458"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10053447",
      "ASI-32270",
      "WHEELS:HUB"
    ],
    "excerpt": "FORD: THERE IS A NOISE COMING FROM THE FRONT HUB INTEGRATED WHEEL END (IWE) AREAS AND WHEN SHIFTED INTO 4X4 MODE, THE NOISE WILL CEASE. MODELS 2008-2013 F-150, EXPEDITION, NAVIGATOR, MARK LT. *PE",
    "issueAreaIds": [
      "drivetrain_leak_or_boot"
    ],
    "partTags": [
      "iwe_solenoid_actuator",
      "transfer_case_area",
      "driveshaft_u_joint",
      "differential_cover"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "vibration",
      "rattle",
      "clunk"
    ],
    "systemTags": [
      "drivetrain_4wd"
    ],
    "id": "nhtsa-tsb-10053447",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "WHEELS:HUB",
    "inspectionHint": "FORD: THERE IS A NOISE COMING FROM THE FRONT HUB INTEGRATED WHEEL END (IWE) AREAS AND WHEN SHIFTED INTO 4X4 MODE, THE NOISE WILL CEASE. MODELS 2008-2013 F-150, EXPEDITION, NAVIGATOR, MARK LT",
    "sourceCitationKey": "10053447"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10053429",
      "ASI-32266",
      "STRUCTURE:BODY:DOOR",
      "STRUCTURE:BODY:DOOR:HINGE AND ATTACHMENTS",
      "LATCHES/LOCKS/LINKAGES:DOORS:LATCH"
    ],
    "excerpt": "FORD: ON SOME VEHICLES, THE OUTSIDE DOOR HANDLES NEEDS TO BE PULLED AT LEAST TWICE BEFORE OPENING. MODELS 2010-2013 F150, MUSTANG. *PE",
    "issueAreaIds": [
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "corrosion"
    ],
    "systemTags": [
      "body",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10053429",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "STRUCTURE:BODY:DOOR",
    "inspectionHint": "FORD: ON SOME VEHICLES, THE OUTSIDE DOOR HANDLES NEEDS TO BE PULLED AT LEAST TWICE BEFORE OPENING. MODELS 2010-2013 F150, MUSTANG",
    "sourceCitationKey": "10053429"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10053423",
      "ASI-32259",
      "VISIBILITY:DEFROSTER/DEFOGGER/HVAC SYSTEM:REAR WINDOW"
    ],
    "excerpt": "FORD: A POWER SLIDING REAR WINDOW, ON SOME VEHICLES, MAY EXPERIENCE A POSSIBLE INOPERATIVE REAR WINDOW DEFROST. MODELS 2010-2013 F-150. *PE",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10053423",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "VISIBILITY:DEFROSTER/DEFOGGER/HVAC SYSTEM:REAR WINDOW",
    "inspectionHint": "FORD: A POWER SLIDING REAR WINDOW, ON SOME VEHICLES, MAY EXPERIENCE A POSSIBLE INOPERATIVE REAR WINDOW DEFROST. MODELS 2010-2013 F-150",
    "sourceCitationKey": "10053423"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10052801",
      "TSB-13-5-15",
      "VISIBILITY:POWER WINDOW DEVICES AND CONTROLS",
      "VISIBILITY:GLASS",
      "SIDE/REAR"
    ],
    "excerpt": "FORD: ON SOME VEHICLES, THE REAR SLIDING GLASS CENTER PANEL HAS A WATER LEAKAGE AT THE SIDE PANEL. MODEL 2010-2013 F-150. *PE",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10052801",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "VISIBILITY:POWER WINDOW DEVICES AND CONTROLS",
    "inspectionHint": "FORD: ON SOME VEHICLES, THE REAR SLIDING GLASS CENTER PANEL HAS A WATER LEAKAGE AT THE SIDE PANEL. MODEL 2010-2013 F-150",
    "sourceCitationKey": "10052801"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10051733",
      "TSB-12-11-18",
      "TRACTION CONTROL SYSTEM"
    ],
    "excerpt": "FORD: DUE TO TRACTION CONTROL FLASHING OR ILLUMINATING INDICATOR, DIAGNOSTIC CODES (DTC) C1963, C1278, C1280, C1282 ARE STORED IN ANTI LOCK BRAKE SYSTEM (ABS), DURING LOW SPEED MANEUVERS . MODELS 2009-2012 F-150. *PE",
    "issueAreaIds": [
      "brake_hose_or_line_concern"
    ],
    "partTags": [
      "brake_line",
      "brake_hose"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "leak",
      "pull"
    ],
    "systemTags": [
      "brakes"
    ],
    "id": "nhtsa-tsb-10051733",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "TRACTION CONTROL SYSTEM",
    "inspectionHint": "FORD: DUE TO TRACTION CONTROL FLASHING OR ILLUMINATING INDICATOR, DIAGNOSTIC CODES (DTC) C1963, C1278, C1280, C1282 ARE STORED IN ANTI LOCK BRAKE SYSTEM (ABS), DURING LOW SPEED MANEUVERS . MODELS 2009-2012 F-150",
    "sourceCitationKey": "10051733"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10051724",
      "ASI-12048",
      "EXTERIOR LIGHTING:HEADLIGHTS:SWITCH"
    ],
    "excerpt": "FORD: DUE TO AN OPEN HEADLIGHT SWITCH, THE HEADLAMPS, PARK LAMPS OR LAMPS ARE INOPERATIVE AND HEADLAMPS WILL REMAIN ON BECAUSE OF AFTERMARKET OR GENUINE FORD ACCESSORIES (GFA), INSTALLED INCORRECTLY. CAUSING POSSIBLE DAMAGE TO SWITCH. 2009-2013 F-150. *PE",
    "issueAreaIds": [
      "intake_vacuum_air_leak",
      "lighting_socket_wiring",
      "lamp_housing_moisture_or_mount"
    ],
    "partTags": [
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line",
      "lamp_socket",
      "light_bulb",
      "headlight_housing",
      "taillight_housing"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rough_idle",
      "hiss",
      "hyperflash",
      "corrosion"
    ],
    "systemTags": [
      "body",
      "electrical",
      "intake_vacuum",
      "fuel_air_metering",
      "lighting"
    ],
    "id": "nhtsa-tsb-10051724",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "EXTERIOR LIGHTING:HEADLIGHTS:SWITCH",
    "inspectionHint": "FORD: DUE TO AN OPEN HEADLIGHT SWITCH, THE HEADLAMPS, PARK LAMPS OR LAMPS ARE INOPERATIVE AND HEADLAMPS WILL REMAIN ON BECAUSE OF AFTERMARKET OR GENUINE FORD ACCESSORIES (GFA), INSTALLED INCORRECTLY. CAUSING POSSIBLE DA…",
    "sourceCitationKey": "10051724"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10045085",
      "TSB-12-6-18",
      "ELECTRONIC STABILITY CONTROL (ESC)"
    ],
    "excerpt": "FORD: ON SOME TRUCKS, TRACTION CONTROL INDICATOR FLASHES OR ILLUMINATES AND AT LOW SPEED MANEUVERING TURNS, ELECTRONIC STABILITY CONTROL (ESC) IS AN INTERMITTENT NUISANCE ACTIVATION. *PE",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10045085",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ELECTRONIC STABILITY CONTROL (ESC)",
    "inspectionHint": "FORD: ON SOME TRUCKS, TRACTION CONTROL INDICATOR FLASHES OR ILLUMINATES AND AT LOW SPEED MANEUVERING TURNS, ELECTRONIC STABILITY CONTROL (ESC) IS AN INTERMITTENT NUISANCE ACTIVATION. *PE",
    "sourceCitationKey": "10045085"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10044211",
      "ASI-22234",
      "SERVICE BRAKES",
      "HYDRAULIC:FOUNDATION COMPONENTS:DISC:CALIPER",
      "AIR:DISC:CALIPER"
    ],
    "excerpt": "FORD: THE COMPLETE CALIPER ASSEMBLY, BRACKET (ANCHOR PLATE), BRAKE PADS, ROTORS AND CLIPS NEEDS TO BE REPLACED DUE TO STICKING OR BINDING OF FRONT BRAKE CALIPER. *PE",
    "issueAreaIds": [
      "brake_hose_or_line_concern"
    ],
    "partTags": [
      "brake_line",
      "brake_hose"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "leak",
      "pull"
    ],
    "systemTags": [
      "brakes"
    ],
    "id": "nhtsa-tsb-10044211",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "SERVICE BRAKES",
    "inspectionHint": "FORD: THE COMPLETE CALIPER ASSEMBLY, BRACKET (ANCHOR PLATE), BRAKE PADS, ROTORS AND CLIPS NEEDS TO BE REPLACED DUE TO STICKING OR BINDING OF FRONT BRAKE CALIPER. *PE",
    "sourceCitationKey": "10044211"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10044117",
      "12-2-13",
      "LATCHES/LOCKS/LINKAGES:DOORS:LATCH"
    ],
    "excerpt": "FORD: SOME VEHICLES MAY EXHIBIT A CONDITION WHERE ONE OR MORE REAR DOORS ARE DIFFICULT TO LOCK OR UNLOCK USING THE DOOR LOCK ROD. THIS MAY BE DUE TO DUST BUILDUP IN THE DOOR LATCH. ALSO INCLUDED MODEL F150 MODEL YEARS 2009-2011. *JS",
    "issueAreaIds": [
      "connector_and_harness_fitment"
    ],
    "partTags": [
      "connector",
      "ignition_harness"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "corrosion"
    ],
    "systemTags": [
      "body",
      "connectors_harness"
    ],
    "id": "nhtsa-tsb-10044117",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "LATCHES/LOCKS/LINKAGES:DOORS:LATCH",
    "inspectionHint": "FORD: SOME VEHICLES MAY EXHIBIT A CONDITION WHERE ONE OR MORE REAR DOORS ARE DIFFICULT TO LOCK OR UNLOCK USING THE DOOR LOCK ROD. THIS MAY BE DUE TO DUST BUILDUP IN THE DOOR LATCH",
    "sourceCitationKey": "10044117"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10042485",
      "TSB-11-11-6",
      "SUSPENSION:REAR:AXLE:NON-POWERED AXLE ASSEMBLY"
    ],
    "excerpt": "FORD: WHEN MAKING TIGHT TURNS OR DRIVING SLOW, VEHICLE MAY EXHIBIT A SHUDDER, CHATTER AND/OR VIBRATION, EVEN AFTER COLD STARTUP. *PE",
    "issueAreaIds": [
      "steering_linkage_wear"
    ],
    "partTags": [
      "tie_rod_end"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "pull",
      "vibration",
      "clunk"
    ],
    "systemTags": [
      "suspension_steering"
    ],
    "id": "nhtsa-tsb-10042485",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "SUSPENSION:REAR:AXLE:NON-POWERED AXLE ASSEMBLY",
    "inspectionHint": "FORD: WHEN MAKING TIGHT TURNS OR DRIVING SLOW, VEHICLE MAY EXHIBIT A SHUDDER, CHATTER AND/OR VIBRATION, EVEN AFTER COLD STARTUP. *PE",
    "sourceCitationKey": "10042485"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10041932",
      "TSB-11-8-8",
      "ENGINE AND ENGINE COOLING:ENGINE"
    ],
    "excerpt": "FORD: AFTER REFUELING VEHICLE, WOULD BE HARD TO START, RUNS ROUGH AND AN AUDIBLE CLICKING NOISE CAN BE HEARD. *PE",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10041932",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ENGINE AND ENGINE COOLING:ENGINE",
    "inspectionHint": "FORD: AFTER REFUELING VEHICLE, WOULD BE HARD TO START, RUNS ROUGH AND AN AUDIBLE CLICKING NOISE CAN BE HEARD. *PE",
    "sourceCitationKey": "10041932"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10039725",
      "TSB-10-18-1",
      "POWER TRAIN:AUTOMATIC TRANSMISSION"
    ],
    "excerpt": "FORD: SOME EXPEDITION/NAVIGATOR/F150 VEHICLES MAY HAVE A DELAYED FORWARD/REVERSE ENGAGEMENT WITH STORED TROUBLE CODES. *RM",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10039725",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN:AUTOMATIC TRANSMISSION",
    "inspectionHint": "FORD: SOME EXPEDITION/NAVIGATOR/F150 VEHICLES MAY HAVE A DELAYED FORWARD/REVERSE ENGAGEMENT WITH STORED TROUBLE CODES. *RM",
    "sourceCitationKey": "10039725"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10039147",
      "AS-21458",
      "SERVICE BRAKES",
      "HYDRAULIC:ANTILOCK/TRACTION CONTROL/ELECTRONIC LIMITED SLIP",
      "AIR"
    ],
    "excerpt": "FORD: THE BRAKES MAY FEEL TOUCHY OR AGGRESSIVE. 2010 F150. *RM",
    "issueAreaIds": [
      "brake_hose_or_line_concern"
    ],
    "partTags": [
      "brake_line",
      "brake_hose"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "leak",
      "pull"
    ],
    "systemTags": [
      "brakes"
    ],
    "id": "nhtsa-tsb-10039147",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "SERVICE BRAKES",
    "inspectionHint": "FORD: THE BRAKES MAY FEEL TOUCHY OR AGGRESSIVE. 2010 F150",
    "sourceCitationKey": "10039147"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10039159",
      "TSB-10-21-6",
      "ENGINE AND ENGINE COOLING:ENGINE"
    ],
    "excerpt": "FORD: THE IDLE SPEED DROPS LOWER THAN DESIRED AND MAY FLUCTUATE. THERE MAY BE TWO POSSIBLE TROUBLE CODES STORED. *RM",
    "issueAreaIds": [
      "intake_vacuum_air_leak"
    ],
    "partTags": [
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rough_idle",
      "hiss"
    ],
    "systemTags": [
      "intake_vacuum",
      "fuel_air_metering"
    ],
    "id": "nhtsa-tsb-10039159",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ENGINE AND ENGINE COOLING:ENGINE",
    "inspectionHint": "FORD: THE IDLE SPEED DROPS LOWER THAN DESIRED AND MAY FLUCTUATE. THERE MAY BE TWO POSSIBLE TROUBLE CODES STORED",
    "sourceCitationKey": "10039159"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10039164",
      "TSB-10-24-1",
      "POWER TRAIN:AUTOMATIC TRANSMISSION",
      "ENGINE AND ENGINE COOLING:ENGINE"
    ],
    "excerpt": "FORD: THERE MAY BE AN RPM SURGE WHEN COLD AND AT 25-35 MPH. 2010 F150. *RM",
    "issueAreaIds": [
      "intake_vacuum_air_leak"
    ],
    "partTags": [
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rough_idle",
      "hiss"
    ],
    "systemTags": [
      "intake_vacuum",
      "fuel_air_metering"
    ],
    "id": "nhtsa-tsb-10039164",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN:AUTOMATIC TRANSMISSION",
    "inspectionHint": "FORD: THERE MAY BE AN RPM SURGE WHEN COLD AND AT 25-35 MPH. 2010 F150",
    "sourceCitationKey": "10039164"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10039184",
      "AS-21450",
      "ENGINE AND ENGINE COOLING:ENGINE"
    ],
    "excerpt": "FORD: WHEN ACCELERATING AFTER A COLD START THERE MAY BE LACK OF POWER OR ROUGH RUNNING. NORMAL CONDITION. 2009-2010 EXPEDITION/NAVIGATOR/F150. *RM",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10039184",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ENGINE AND ENGINE COOLING:ENGINE",
    "inspectionHint": "FORD: WHEN ACCELERATING AFTER A COLD START THERE MAY BE LACK OF POWER OR ROUGH RUNNING. NORMAL CONDITION",
    "sourceCitationKey": "10039184"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10039135",
      "TSB-10-24-7",
      "POWER TRAIN:AUTOMATIC TRANSMISSION:GEAR POSITION INDICATION (PRNDL)"
    ],
    "excerpt": "FORD: THE GEAR SELECTOR LEVER MAY BE TOUGH TO OPERATE IN COLD WEATHER DUE TO SNOW BUILDUP AROUND THE SHIFT CABLE. 2009-2010 F150. *RM",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10039135",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN:AUTOMATIC TRANSMISSION:GEAR POSITION INDICATION (PRNDL)",
    "inspectionHint": "FORD: THE GEAR SELECTOR LEVER MAY BE TOUGH TO OPERATE IN COLD WEATHER DUE TO SNOW BUILDUP AROUND THE SHIFT CABLE. 2009-2010 F150",
    "sourceCitationKey": "10039135"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10039138",
      "AS-21578",
      "POWER TRAIN:DRIVELINE"
    ],
    "excerpt": "FORD: THERE IS A RATTLE NOISE WHEN DRIVING 25-30 MPH FROM THE TRANSMISSION WHEN UNDER LOAD. 2009-2010 F-150. *RM",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10039138",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN:DRIVELINE",
    "inspectionHint": "FORD: THERE IS A RATTLE NOISE WHEN DRIVING 25-30 MPH FROM THE TRANSMISSION WHEN UNDER LOAD. 2009-2010 F-150",
    "sourceCitationKey": "10039138"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10039050",
      "TSB-11-2-5",
      "TRACTION CONTROL SYSTEM"
    ],
    "excerpt": "FORD: THE TRACTION CONTROL LIGHT IS FLASHING WITH MULTIPLE STORED TROUBLE CODES. THE STABILITY LIGHT MAY ALSO BE ON WHILE TOWING A TRAILER AT LOW SPEED. 2009-2010 F-150. *RM",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10039050",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "TRACTION CONTROL SYSTEM",
    "inspectionHint": "FORD: THE TRACTION CONTROL LIGHT IS FLASHING WITH MULTIPLE STORED TROUBLE CODES. THE STABILITY LIGHT MAY ALSO BE ON WHILE TOWING A TRAILER AT LOW SPEED",
    "sourceCitationKey": "10039050"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10039051",
      "TSB-11-3-8",
      "POWER TRAIN:AUTOMATIC TRANSMISSION"
    ],
    "excerpt": "FORD: WITH COLD WEATHER, THE GEAR SELECTOR MAY REQUIRE EXTRA EFFORT. THERE MAY BE SNOW BUILDUP ON THE SHIFT LEVER. 2009-2011 F150. *RM",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10039051",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN:AUTOMATIC TRANSMISSION",
    "inspectionHint": "FORD: WITH COLD WEATHER, THE GEAR SELECTOR MAY REQUIRE EXTRA EFFORT. THERE MAY BE SNOW BUILDUP ON THE SHIFT LEVER",
    "sourceCitationKey": "10039051"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10039053",
      "AS-21769",
      "ELECTRICAL SYSTEM:SOFTWARE",
      "POWER TRAIN",
      "ENGINE AND ENGINE COOLING:ENGINE"
    ],
    "excerpt": "FORD: IF THERE IS AN INTERMITTENT LACK OF POWER, SURGE, OR HESITATION WHILE DRIVING THE BRAKES WILL OVERRIDE ACCELERATION. *RM",
    "issueAreaIds": [
      "brake_hose_or_line_concern",
      "intake_vacuum_air_leak"
    ],
    "partTags": [
      "brake_line",
      "brake_hose",
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "leak",
      "pull",
      "rough_idle",
      "hiss"
    ],
    "systemTags": [
      "electrical",
      "brakes",
      "intake_vacuum",
      "fuel_air_metering"
    ],
    "id": "nhtsa-tsb-10039053",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ELECTRICAL SYSTEM:SOFTWARE",
    "inspectionHint": "FORD: IF THERE IS AN INTERMITTENT LACK OF POWER, SURGE, OR HESITATION WHILE DRIVING THE BRAKES WILL OVERRIDE ACCELERATION. *RM",
    "sourceCitationKey": "10039053"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10039065",
      "TSB-11-4-11",
      "STRUCTURE:BODY:TAILGATE",
      "STRUCTURE:BODY:TAILGATE:HINGE AND ATTACHMENTS"
    ],
    "excerpt": "FORD: THE TAILGATE APPLIQUE MAY SEPARATE FROM THE SHEET METAL. 2009-2011 F150. *RM",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10039065",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "STRUCTURE:BODY:TAILGATE",
    "inspectionHint": "FORD: THE TAILGATE APPLIQUE MAY SEPARATE FROM THE SHEET METAL. 2009-2011 F150",
    "sourceCitationKey": "10039065"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10039072",
      "AS-21687",
      "POWER TRAIN:AUTOMATIC TRANSMISSION:CONTROL MODULE (TCM/PCM/TECM)"
    ],
    "excerpt": "FORD: THERE MAY BE A LOSS OF POWER, HESITATION, SURGE, OR LACK OF THROTTLE RESPONSE WHILE DRIVING. THE BRAKE OVER ACCELERATOR FEATURE MAY BE ACTIVATING. *RM",
    "issueAreaIds": [
      "brake_hose_or_line_concern",
      "intake_vacuum_air_leak"
    ],
    "partTags": [
      "brake_line",
      "brake_hose",
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "leak",
      "pull",
      "rough_idle",
      "hiss"
    ],
    "systemTags": [
      "electrical",
      "brakes",
      "intake_vacuum",
      "fuel_air_metering"
    ],
    "id": "nhtsa-tsb-10039072",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "POWER TRAIN:AUTOMATIC TRANSMISSION:CONTROL MODULE (TCM/PCM/TECM)",
    "inspectionHint": "FORD: THERE MAY BE A LOSS OF POWER, HESITATION, SURGE, OR LACK OF THROTTLE RESPONSE WHILE DRIVING. THE BRAKE OVER ACCELERATOR FEATURE MAY BE ACTIVATING",
    "sourceCitationKey": "10039072"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10038965",
      "SIS-21841",
      "ELECTRICAL SYSTEM:SOFTWARE",
      "AIR BAGS"
    ],
    "excerpt": "COMM-TRANS LUND: SOME 2009-2011 MODELS MAY HAVE THE AIR BAG INICATOR FLASHING WITH A STORED TROUBLE CODE. THIS IS A SOFTWARE PROBLEM. *RM",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [
      "body",
      "electrical"
    ],
    "id": "nhtsa-tsb-10038965",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ELECTRICAL SYSTEM:SOFTWARE",
    "inspectionHint": "COMM-TRANS LUND: SOME 2009-2011 MODELS MAY HAVE THE AIR BAG INICATOR FLASHING WITH A STORED TROUBLE CODE. THIS IS A SOFTWARE PROBLEM",
    "sourceCitationKey": "10038965"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10038946",
      "TSB-11-4-7",
      "TRACTION CONTROL SYSTEM",
      "ELECTRICAL SYSTEM"
    ],
    "excerpt": "FORD: 2009-2011 F150. TRACTION CONTROL LIGHT MAY BE ILLUMINATED WITH TROUBLE CODES STORED. THE ELECTRONIC STABILITY CONTROL MAY ALSO ACTIVATE INTERMITTENTLY WHILE TOWING A TRAILER. *RM",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [
      "electrical"
    ],
    "id": "nhtsa-tsb-10038946",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "TRACTION CONTROL SYSTEM",
    "inspectionHint": "FORD: 2009-2011 F150. TRACTION CONTROL LIGHT MAY BE ILLUMINATED WITH TROUBLE CODES STORED",
    "sourceCitationKey": "10038946"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10037561",
      "TSB11-1-5",
      "ENGINE AND ENGINE COOLING:EXHAUST SYSTEM:EMISSION CONTROL"
    ],
    "excerpt": "FORD: VEHICLES MAY RUN ROUGH, HARD START AFTER REFUELING, CLICKING NOISE UNDER HOOD, AND HAVE TROUBLE CODES STORED. *RM",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10037561",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ENGINE AND ENGINE COOLING:EXHAUST SYSTEM:EMISSION CONTROL",
    "inspectionHint": "FORD: VEHICLES MAY RUN ROUGH, HARD START AFTER REFUELING, CLICKING NOISE UNDER HOOD, AND HAVE TROUBLE CODES STORED. *RM",
    "sourceCitationKey": "10037561"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10037098",
      "TSB-10-18-1",
      "ENGINE AND ENGINE COOLING:ENGINE",
      "POWER TRAIN:AUTOMATIC TRANSMISSION"
    ],
    "excerpt": "FORD: SOME EXPEDITION, F-150, AND NAVIGATOR MODELS MAY EXPERIENCE A DELAYED FORWARD OR REVERSE TRANSMISSION ENGAGEMENT. USUALLY HAPPENS ON COLD START IN COLD CLIMATES. *RM",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10037098",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ENGINE AND ENGINE COOLING:ENGINE",
    "inspectionHint": "FORD: SOME EXPEDITION, F-150, AND NAVIGATOR MODELS MAY EXPERIENCE A DELAYED FORWARD OR REVERSE TRANSMISSION ENGAGEMENT. USUALLY HAPPENS ON COLD START IN COLD CLIMATES",
    "sourceCitationKey": "10037098"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10037081",
      "TSB-10-18-6",
      "EXTERIOR LIGHTING:BRAKE LIGHTS:SWITCH"
    ],
    "excerpt": "FORD: ON SOME 2010-2011 FORD TRUCKS THERE IS A BRAKE DRAG CONDITION. THERE IS AN IMPROPERLY ADJUSTED STOPLAMP SWITCH. *RM",
    "issueAreaIds": [
      "brake_hose_or_line_concern",
      "lighting_socket_wiring",
      "lamp_housing_moisture_or_mount"
    ],
    "partTags": [
      "brake_line",
      "brake_hose",
      "lamp_socket",
      "light_bulb",
      "headlight_housing",
      "taillight_housing"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "leak",
      "pull",
      "hyperflash",
      "corrosion"
    ],
    "systemTags": [
      "electrical",
      "brakes",
      "lighting"
    ],
    "id": "nhtsa-tsb-10037081",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "EXTERIOR LIGHTING:BRAKE LIGHTS:SWITCH",
    "inspectionHint": "FORD: ON SOME 2010-2011 FORD TRUCKS THERE IS A BRAKE DRAG CONDITION. THERE IS AN IMPROPERLY ADJUSTED STOPLAMP SWITCH",
    "sourceCitationKey": "10037081"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10037085",
      "SB-21512",
      "SERVICE BRAKES",
      "HYDRAULIC:ANTILOCK/TRACTION CONTROL/ELECTRONIC LIMITED SLIP:WHEEL SPEED SENSOR/TONE RING",
      "EXTERIOR LIGHTING:BRAKE LIGHTS:SWITCH"
    ],
    "excerpt": "FORD: WITH SOME 2010 F-150S THE ANTI-LOCK BRAKE SYSTEM LIGHT IS ON AND POSSIBLE BRAKE FLUID LEAK. *RM",
    "issueAreaIds": [
      "brake_hose_or_line_concern",
      "lighting_socket_wiring",
      "lamp_housing_moisture_or_mount"
    ],
    "partTags": [
      "brake_line",
      "brake_hose",
      "lamp_socket",
      "light_bulb",
      "headlight_housing",
      "taillight_housing"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "leak",
      "pull",
      "hyperflash",
      "corrosion"
    ],
    "systemTags": [
      "electrical",
      "brakes",
      "lighting"
    ],
    "id": "nhtsa-tsb-10037085",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "SERVICE BRAKES",
    "inspectionHint": "FORD: WITH SOME 2010 F-150S THE ANTI-LOCK BRAKE SYSTEM LIGHT IS ON AND POSSIBLE BRAKE FLUID LEAK. *RM",
    "sourceCitationKey": "10037085"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10034631",
      "SB-21434",
      "ENGINE AND ENGINE COOLING:ENGINE:DIESEL"
    ],
    "excerpt": "FORD: SUPPLY/RETURN LINES INSTALLATION AT HIGH PRESSURE PUMP-REVISED WASHER FOR TRUCKS EQUIPPED WITH 6.4L ENGINES. WHEN INSTALLING SUPPLY OR RETURN LINES AT HIGH PRESSURE PUMP ON DIESEL ENGINES, DO NOT USE THE BONDED STYLE WASHER (W302870), USE ONLY THE HYBRID STYLE WASHER (W303659). *PE",
    "issueAreaIds": [
      "intake_vacuum_air_leak"
    ],
    "partTags": [
      "throttle_body",
      "intake_tube",
      "maf_sensor",
      "vacuum_line"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "rough_idle",
      "hiss"
    ],
    "systemTags": [
      "intake_vacuum",
      "fuel_air_metering"
    ],
    "id": "nhtsa-tsb-10034631",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ENGINE AND ENGINE COOLING:ENGINE:DIESEL",
    "inspectionHint": "FORD: SUPPLY/RETURN LINES INSTALLATION AT HIGH PRESSURE PUMP-REVISED WASHER FOR TRUCKS EQUIPPED WITH 6.4L ENGINES. WHEN INSTALLING SUPPLY OR RETURN LINES AT HIGH PRESSURE PUMP ON DIESEL ENGINES, DO NOT USE THE BONDED ST…",
    "sourceCitationKey": "10034631"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10034528",
      "SB-21317",
      "SERVICE BRAKES",
      "AIR:ANTILOCK:CONTROL UNIT/MODULE"
    ],
    "excerpt": "FORD: SOME F150 SVT RAPTOR VEHICLES MAY EXHIBIT HILL DECENT CONTROL FAULT WITH ABS DTC C116A. ON VEHICLES BUILT BEFORE 2/26/10 ONLY, INSPECT THE HIGH MOUNTED STOP LAMP FOR EVIDENCE OF WATER INTRUSION. *PE",
    "issueAreaIds": [
      "brake_hose_or_line_concern",
      "lighting_socket_wiring",
      "lamp_housing_moisture_or_mount"
    ],
    "partTags": [
      "brake_line",
      "brake_hose",
      "lamp_socket",
      "light_bulb",
      "headlight_housing",
      "taillight_housing"
    ],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [
      "leak",
      "pull",
      "hyperflash",
      "corrosion"
    ],
    "systemTags": [
      "electrical",
      "brakes",
      "lighting"
    ],
    "id": "nhtsa-tsb-10034528",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "SERVICE BRAKES",
    "inspectionHint": "FORD: SOME F150 SVT RAPTOR VEHICLES MAY EXHIBIT HILL DECENT CONTROL FAULT WITH ABS DTC C116A. ON VEHICLES BUILT BEFORE 2/26/10 ONLY, INSPECT THE HIGH MOUNTED STOP LAMP FOR EVIDENCE OF WATER INTRUSION",
    "sourceCitationKey": "10034528"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10034532",
      "SB-21351",
      "ENGINE AND ENGINE COOLING:ENGINE"
    ],
    "excerpt": "FORD: LACK OF POWER WIDE OPEN THROTTLE ONLY. SOME VEHICLES MAY EXHIBIT A LACK OF POWER DURING WIDE OPEN THROTTLE ONLY. NO DTCS WILL BE PRESENT AND ENGINE PERFORMANCE DURING NORMAL DRIVING WILL NOT BE AFFECTED. CHECK ENGINE AIR INLET TUBE FOR EVIDENCE OF BEING PARTIALLY DRAWN CLOSED OR RESTRICTED. *PE",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10034532",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "ENGINE AND ENGINE COOLING:ENGINE",
    "inspectionHint": "FORD: LACK OF POWER WIDE OPEN THROTTLE ONLY. SOME VEHICLES MAY EXHIBIT A LACK OF POWER DURING WIDE OPEN THROTTLE ONLY",
    "sourceCitationKey": "10034532"
  },
  {
    "vehicleScope": SUPPORTED_VEHICLE_ID,
    "aliases": [
      "10033867",
      "TSB-10-15-9",
      "STRUCTURE:BODY:TAILGATE"
    ],
    "excerpt": "FORD: TAILGATE APPLIQUE SEPARATION. SOME PLATINUM TRUCKS MAY EXHIBIT TAILGATE APPLIQUE SEPARATION FROM THE SHEET METAL. FOLLOW THE SERVICE PROCEDURE STEPS TO CORRECT THE CONDITION. *PE",
    "issueAreaIds": [],
    "partTags": [],
    "sourceUrl": "https://www.nhtsa.gov/vehicle/2010/FORD/F-150",
    "symptomTags": [],
    "systemTags": [],
    "id": "nhtsa-tsb-10033867",
    "sourceType": "nhtsa_tsb_summary",
    "sourceLabel": "NHTSA TSB Summary",
    "title": "STRUCTURE:BODY:TAILGATE",
    "inspectionHint": "FORD: TAILGATE APPLIQUE SEPARATION. SOME PLATINUM TRUCKS MAY EXHIBIT TAILGATE APPLIQUE SEPARATION FROM THE SHEET METAL",
    "sourceCitationKey": "10033867"
  }
] satisfies TruckReferenceRecord[];
