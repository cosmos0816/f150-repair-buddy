import { SUPPORTED_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export interface TruckMaintenanceSchedule {
  coolantChangeInterval: {
    initial: string;
    subsequent: string;
  };
  normalScheduleIntervals: Array<{
    id: string;
    items: string[];
    mileage: number;
  }>;
  oilChangeInterval: {
    normal: string;
    specialOperatingConditions: string;
  };
  ownerChecks: {
    everySixMonths: string[];
    monthly: string[];
    multipointInspection: string[];
  };
  source: string;
  sourceCitation: string;
  sourceFile: string;
  specialConditionsSourceExcerpt?: string;
  specialOperatingConditions: Array<{
    id: string;
    keyIntervals: string[];
    label: string;
  }>;
  vehicleScope: typeof SUPPORTED_VEHICLE_ID;
}

export const TRUCK_MAINTENANCE_SCHEDULE = {
  "source": "2010 Ford Scheduled Maintenance Guide",
  "sourceFile": "2010-f150-scheduled-maintenance-guide.pdf",
  "sourceCitation": "Ford 2010 Scheduled Maintenance Guide, Trucks / Fullsize Vans / SUVs schedule pages 14-27 and special operating conditions pages 41-45.",
  "vehicleScope": "2010-ford-f150-5.4-triton",
  "oilChangeInterval": {
    "normal": "7,500 miles or 6 months",
    "specialOperatingConditions": "5,000 miles, 6 months, or 200 hours of engine operation"
  },
  "coolantChangeInterval": {
    "initial": "6 years or 105,000 miles",
    "subsequent": "Every 3 years or 45,000 miles"
  },
  "ownerChecks": {
    "monthly": [
      "Check function of all interior and exterior lights.",
      "Check tires for wear and proper air pressure, including spare.",
      "Check engine oil fluid level.",
      "Check windshield washer fluid level."
    ],
    "everySixMonths": [
      "Check lap/shoulder belts and seat latches for wear and proper operation.",
      "Check that externally mounted spare tire is properly stowed (tight) (see your Owner’s Guide).",
      "Check power steering fluid level, if equipped.",
      "Check washer spray, wiper operation, and clean all wiper blades (replace blades as necessary).",
      "Check parking brake for proper operation.",
      "Check and lubricate all hinges, latches, door check straps (see dealer) and outside locks.",
      "Check and lubricate upper and lower sliding door tracks, if equipped.",
      "Check and clean sliding door contact switches, if equipped.",
      "Check and lubricate door rubber weatherstrips.",
      "Check and clean body and door drain holes.",
      "Check safety warning lamps (brake, ABS, airbag, safety belt) for operation.",
      "Check engine cooling system level and strength.",
      "Check battery connections and clean if necessary.",
      "Check clutch fluid level, if equipped.",
      "On vehicles equipped with dual rear wheels, retighten the wheel lug nuts to the specified torque at 100 miles",
      "Refer to Wheel Lug Nut Torque Specification in your Owner’s Guide for the proper lug nut torque specification."
    ],
    "multipointInspection": [
      "Check and top-up fluid levels: brake, coolant recovery reservoir, manual and automatic transmission (if equipped",
      "Inspect tires for wear and check air pressure, including spare.",
      "Check exhaust system for leaks, damage, loose parts and foreign material.",
      "Check battery performance.",
      "Check operation of horn, exterior lamps, turn signals and hazard warning lights.",
      "Check radiator, coolers, heater and air conditioning hoses.",
      "Inspect windshield washer spray and wiper operation.",
      "Check windshield for cracks, chips and pitting.",
      "Inspect for oil and fluid leaks.",
      "Inspect engine air filter.",
      "Inspect half shaft dust boots, if equipped.",
      "Check shocks and struts and other suspension components for leaks and damage.",
      "Inspect steering and linkage.",
      "Inspect accessory drive belt(s).",
      "Inspect clutch operation, if equipped."
    ]
  },
  "normalScheduleIntervals": [
    {
      "id": "maintenance-7500",
      "mileage": 7500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-15000",
      "mileage": 15000,
      "items": [
        "Change engine oil and replace oil filter",
        "Replace cabin air filter (if equipped)",
        "Inspect steering linkage, ball joints, suspension,",
        "Torque the rear U-bolts (Transit Connect only) DEALER VALIDATION:",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect automatic transmission fluid level (if",
        "Inspect and lubricate 4x4 front axle U-joints DATE: MILEAGE:",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-22500",
      "mileage": 22500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure Normal Schedule",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-30000",
      "mileage": 30000,
      "items": [
        "Change engine oil and replace oil filter",
        "Inspect automatic transmission fluid level on",
        "Replace cabin air filter (if equipped)",
        "Replace climate-controlled seat filter (if equipped)",
        "Replace engine air filter",
        "Replace fuel filter (except Escape, Mariner,",
        "Inspect steering linkage, ball joints, suspension,",
        "Torque the rear U-bolts (Transit Connect only)",
        "Inspect engine cooling system and hoses RO#: P&A CODE:",
        "Inspect brake pads, shoes, rotors, drums, brake DATE: MILEAGE:",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect and lubricate 4x4 front axle U-joints",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-37500",
      "mileage": 37500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-45000",
      "mileage": 45000,
      "items": [
        "Change engine oil and replace oil filter",
        "Replace cabin air filter (if equipped)",
        "Inspect steering linkage, ball joints, suspension,",
        "Torque the rear U-bolts (Transit Connect only) DEALER VALIDATION:",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect automatic transmission fluid level (if",
        "Inspect and lubricate 4x4 front axle U-joints DATE: MILEAGE:",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-52500",
      "mileage": 52500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-60000",
      "mileage": 60000,
      "items": [
        "Change engine oil and replace oil filter",
        "Change automatic transmission fluid and filter on",
        "Replace cabin air filter (if equipped) Normal Schedule",
        "Replace climate-controlled seat filter (if equipped)",
        "Replace engine air filter",
        "Replace fuel filter (except Escape, Mariner, Trucks, Fullsize",
        "Replace wheel bearing grease and grease seals",
        "Inspect steering linkage, ball joints, suspension,",
        "Torque the rear U-bolts (Transit Connect only) DATE: MILEAGE:",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect and lubricate 4x4 front axle U-joints",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-67500",
      "mileage": 67500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-75000",
      "mileage": 75000,
      "items": [
        "Change engine oil and replace oil filter",
        "Replace cabin air filter (if equipped)",
        "Inspect steering linkage, ball joints, suspension,",
        "Torque the rear U-bolts (Transit Connect only) DEALER VALIDATION:",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect automatic transmission fluid level (if",
        "Inspect and lubricate 4x4 front axle U-joints DATE: MILEAGE:",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)",
        "Change engine oil and replace oil filter",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-90000",
      "mileage": 90000,
      "items": [
        "Change engine oil and replace oil filter",
        "Inspect automatic transmission fluid level on",
        "Replace cabin air filter (if equipped)",
        "Replace climate-controlled seat filter (if equipped)",
        "Replace engine air filter",
        "Replace fuel filter (except Escape, Mariner,",
        "Replace spark plugs",
        "Inspect steering linkage, ball joints, suspension,",
        "Torque the rear U-bolts (Transit Connect only)",
        "Inspect engine cooling system and hoses RO#: P&A CODE:",
        "Inspect brake pads, shoes, rotors, drums, brake DATE: MILEAGE:",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect accessory drive belts",
        "Inspect and lubricate 4x4 front axle U-joints",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-97500",
      "mileage": 97500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-105000",
      "mileage": 105000,
      "items": [
        "Change engine oil and replace oil filter",
        "Change manual transmission fluid (except Escape)",
        "Replace cabin air filter (if equipped)",
        "Change rear axle fluid only on vehicles equipped",
        "Change engine coolant (see Engine Coolant",
        "Inspect steering linkage, ball joints, suspension,",
        "Torque the rear U-bolts (Transit Connect only)",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped) DATE: MILEAGE:",
        "Inspect exhaust system and heat shields",
        "Inspect automatic transmission fluid level (if Normal Schedule",
        "Inspect and lubricate 4x4 front axle U-joints",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for Vans & SUVs",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-112500",
      "mileage": 112500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-120000",
      "mileage": 120000,
      "items": [
        "Change engine oil and replace oil filter",
        "Replace cabin air filter (if equipped)",
        "Replace climate-controlled seat filters (if",
        "Replace engine air filter",
        "Replace fuel filter (except Escape, Mariner,",
        "Change automatic transmission fluid and filter on",
        "Replace wheel bearing grease and grease seals",
        "Inspect steering linkage, ball joints, suspension,",
        "Torque the rear U-bolts Transit Connect only) RO#: P&A CODE:",
        "Inspect engine cooling system and hoses DATE: MILEAGE:",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect accessory drive belts",
        "Inspect automatic transmission fluid level (if",
        "Inspect and lubricate 4x4 front axle U-joints",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-127500",
      "mileage": 127500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-135000",
      "mileage": 135000,
      "items": [
        "Change engine oil and replace oil filter",
        "Replace cabin air filter (if equipped)",
        "Inspect steering linkage, ball joints, suspension,",
        "Torque the rear U-bolts (Transit Connect only) DEALER VALIDATION: Normal Schedule",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect automatic transmission fluid level (if",
        "Inspect and lubricate 4x4 front axle U-joints DATE: MILEAGE:",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-142500",
      "mileage": 142500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-150000",
      "mileage": 150000,
      "items": [
        "Change engine oil and replace oil filter",
        "Change engine coolant (see Engine Coolant",
        "Replace cabin air filter (if equipped)",
        "Replace climate-controlled seat filter (if equipped)",
        "Replace engine air filter",
        "Replace fuel filter (except Escape, Mariner,",
        "Change automatic transmission fluid and filter",
        "Change manual transmission fluid",
        "Change rear axle lubricant on all rear wheel",
        "Change transfer case fluid (4x4 only)",
        "Change front differential fluid (4x4 only) Normal Schedule",
        "Replace wheel bearings (if non-sealed bearings)",
        "Replace accessory drive belt(s) if not RO#: P&A CODE:",
        "Inspect steering linkage, ball joints, suspension, tie",
        "Torque the rear U-bolts (Transit Connect only)",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect and lubricate 4x4 front axle U-joints",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-7500",
      "mileage": 7500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-15000",
      "mileage": 15000,
      "items": [
        "Change engine oil and replace oil filter",
        "Replace cabin air filter (if equipped)",
        "Inspect and lubricate steering linkage, ball joints,",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect automatic transmission fluid level (if",
        "Rotate tires, inspect tires for wear and measure DATE: MILEAGE:",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-22500",
      "mileage": 22500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-30000",
      "mileage": 30000,
      "items": [
        "Change engine oil and replace oil filter",
        "Replace cabin air filter (if equipped)",
        "Replace climate-controlled seat filter (if equipped)",
        "Replace engine air filter",
        "Replace fuel filter (Crown Victoria, Grand",
        "Inspect and lubricate steering linkage, ball joints, DEALER VALIDATION:",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect transmission fluid level (if equipped with DATE: MILEAGE:",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-37500",
      "mileage": 37500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-45000",
      "mileage": 45000,
      "items": [
        "Change engine oil and replace oil filter",
        "Replace cabin air filter (if equipped)",
        "Inspect and lubricate steering linkage, ball joints,",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect automatic transmission fluid level (if",
        "Rotate tires, inspect tires for wear and measure DATE: MILEAGE:",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-52500",
      "mileage": 52500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-60000",
      "mileage": 60000,
      "items": [
        "Change engine oil and replace oil filter",
        "Replace climate-controlled seat filter (if equipped)",
        "Replace cabin air filter (if equipped)",
        "Replace engine air filter",
        "Replace fuel filter (Crown Victoria, Grand",
        "Inspect and lubricate steering linkage, ball joints, DEALER VALIDATION:",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect transmission fluid level (if equipped with",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-67500",
      "mileage": 67500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-75000",
      "mileage": 75000,
      "items": [
        "Change engine oil and replace oil filter",
        "Replace cabin air filter (if equipped)",
        "Inspect and lubricate steering linkage, ball joints,",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect transmission fluid level (if equipped with",
        "Rotate tires, inspect tires for wear and measure DATE: MILEAGE:",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-82500",
      "mileage": 82500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-90000",
      "mileage": 90000,
      "items": [
        "Change engine oil and replace oil filter",
        "Replace climate-controlled seat filter (if equipped)",
        "Replace engine air filter",
        "Replace cabin air filter (if equipped)",
        "Replace fuel filter (Crown Victoria, Grand",
        "Replace spark plugs",
        "Inspect and lubricate steering linkage, ball joints, DEALER VALIDATION:",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect accessory drive belt(s) DATE: MILEAGE:",
        "Inspect transmission fluid level (if equipped with",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-97500",
      "mileage": 97500,
      "items": [
        "Change engine oil and replace oil filter",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-105000",
      "mileage": 105000,
      "items": [
        "Change engine oil and replace oil filter",
        "Change engine coolant (see Engine Coolant",
        "Replace cabin air filter (if equipped)",
        "Inspect and lubricate steering linkage, ball joints,",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields RO#: P&A CODE:",
        "Inspect transmission fluid level (if equipped with DATE: MILEAGE:",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-112500",
      "mileage": 112500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-120000",
      "mileage": 120000,
      "items": [
        "Change engine oil and replace oil filter",
        "Replace climate-controlled seat filter (if equipped)",
        "Replace engine air filter",
        "Replace cabin air filter (if equipped)",
        "Replace fuel filter (Crown Victoria, Grand",
        "Inspect and lubricate steering linkage, ball joints,",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields RO#: P&A CODE:",
        "Inspect accessory drive belt(s) DATE: MILEAGE:",
        "Inspect transmission fluid level (if equipped with",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-127500",
      "mileage": 127500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-135000",
      "mileage": 135000,
      "items": [
        "Change engine oil and replace oil filter",
        "Replace cabin air filter (if equipped)",
        "Inspect and lubricate steering linkage, ball joints,",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Inspect transmission fluid level (if equipped with",
        "Rotate tires, inspect tires for wear and measure DATE: MILEAGE:",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-142500",
      "mileage": 142500,
      "items": [
        "Change engine oil and replace oil filter DEALER VALIDATION:",
        "Inspect cabin air filter (if equipped)",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    },
    {
      "id": "maintenance-150000",
      "mileage": 150000,
      "items": [
        "Change engine oil and replace oil filter",
        "Change engine coolant (see Engine Coolant",
        "Change automatic transmission fluid",
        "Replace automatic transmission fluid filter (except",
        "Change manual transmission fluid",
        "Replace rear axle lubricant on all rear wheel",
        "Replace climate-controlled seat filter (if equipped) DEALER VALIDATION:",
        "Replace engine air filter",
        "Replace cabin air filter (if equipped)",
        "Replace fuel filter (Crown Victoria, Grand",
        "Replace accessory drive belt(s) if not replaced in",
        "Inspect and lubricate steering linkage, ball joints,",
        "Inspect engine cooling system and hoses",
        "Inspect brake pads, shoes, rotors, drums, brake",
        "Inspect half shaft boots (if equipped)",
        "Inspect exhaust system and heat shields",
        "Rotate tires, inspect tires for wear and measure",
        "Inspect the wheels and related components for",
        "Perform multi-point inspection (recommended)"
      ]
    }
  ],
  "specialOperatingConditions": [
    {
      "id": "towing-heavy-load",
      "label": "Towing a trailer or carrying heavy loads",
      "keyIntervals": [
        "Every 5,000 miles or 6 months – Change engine oil and replace oil filter.",
        "Every 30,000 miles – Change automatic transmission fluid (not required on 6R60/6R80/TorqShift transmissions).",
        "Every 60,000 miles – Change transfer case fluid and manual transmission fluid."
      ]
    },
    {
      "id": "extensive-idling-low-speed",
      "label": "Extensive idling and/or low-speed driving",
      "keyIntervals": [
        "Every 5,000 miles, 6 months, or 200 engine hours – Change engine oil and replace oil filter.",
        "Every 30,000 miles – Change automatic transmission fluid.",
        "Every 60,000 miles – Replace spark plugs and change transfer case fluid."
      ]
    },
    {
      "id": "dusty-conditions",
      "label": "Driving in dusty conditions",
      "keyIntervals": [
        "Inspect frequently – Replace engine air filter and cabin air filter as needed.",
        "Every 5,000 miles or 6 months – Change engine oil and replace oil filter.",
        "Every 30,000 miles – Change automatic transmission fluid."
      ]
    },
    {
      "id": "off-road-operation",
      "label": "Off-road operation",
      "keyIntervals": [
        "Every 5,000 miles or 6 months – Change engine oil and replace oil filter.",
        "Every 30,000 miles – Change automatic transmission fluid.",
        "Every 60,000 miles – Change transfer case fluid."
      ]
    },
    {
      "id": "e85-half-time-or-more",
      "label": "Use of E85 50% of the time or greater",
      "keyIntervals": [
        "Every 3,000 miles – Fill the tank with regular unleaded fuel if run exclusively on E85.",
        "Every 5,000 miles or 6 months – Change engine oil and replace oil filter."
      ]
    }
  ],
  "specialConditionsSourceExcerpt": "SPECIAL OPERATING CONDITIONS Items Needing Special Attention If you operate your Ford/Lincoln/Mercury vehicle primarily in one of the more demanding Special Operating Conditions listed below, you will need to have some items maintained more frequently. If you only occasionally operate your vehicle under these conditions, it is not necessary to perform the additional maintenance. For specific recommendations, see your Ford or Lincoln Mercury Dealership Service Advisor or Technician. Towing a trailer or using a camper or car-top carrier Inspect frequently, service as – Inspect and lubricate U-joints. required. – See axle maintenance items under Exceptions. Every 5,000 miles – Rotate tires, inspect tires for wear and measure tread depth. – Inspect the wheels and related components for abnormal noise, wear, looseness or drag. Every 5,000 miles or 6 months – Change engine oil and replace oil filter. – Inspect and lubricate U-joints. Every 30,000 miles – Change automatic transmission fluid (not required on 6R60/6R80/TorqShift姞 transmissions). – Replace wheel bearing grease and grease seals on 4x2 front wheel bearings (if non-sealed bearings are used). Every 60,000 miles – Ch"
} satisfies TruckMaintenanceSchedule;

export const MAINTENANCE_SCHEDULE_REFERENCES = [
  {
    "id": "maintenance-owner-checks-monthly",
    "sourceType": "owner_manual",
    "sourceLabel": "Ford Scheduled Maintenance",
    "title": "Monthly owner checks",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [
      "lighting",
      "cooling",
      "battery_ground",
      "body"
    ],
    "issueAreaIds": [
      "lighting_socket_wiring",
      "battery_charge_and_ground_path",
      "cooling_reservoir_and_hose_seep"
    ],
    "partTags": [
      "light_bulb",
      "battery_terminal",
      "coolant_reservoir",
      "radiator_hose"
    ],
    "symptomTags": [
      "dead_battery",
      "coolant_smell",
      "hyperflash"
    ],
    "aliases": [
      "monthly checks",
      "owner checks",
      "monthly maintenance"
    ],
    "excerpt": "Check function of all interior and exterior lights. Check tires for wear and proper air pressure, including spare. Check engine oil fluid level. Check windshield washer fluid level.",
    "inspectionHint": "Start with the monthly Ford owner checks before jumping to a narrow part diagnosis.",
    "sourceCitationKey": "maintenance-owner-checks-monthly"
  },
  {
    "id": "maintenance-owner-checks-six-month",
    "sourceType": "owner_manual",
    "sourceLabel": "Ford Scheduled Maintenance",
    "title": "Every-six-month owner checks",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [
      "battery_ground",
      "cooling",
      "body",
      "electrical"
    ],
    "issueAreaIds": [
      "battery_terminal_corrosion",
      "cooling_reservoir_and_hose_seep"
    ],
    "partTags": [
      "battery_terminal",
      "coolant_reservoir",
      "coolant_hose"
    ],
    "symptomTags": [
      "corrosion",
      "coolant_smell"
    ],
    "aliases": [
      "6 month checks",
      "semi annual checks",
      "six month owner checks"
    ],
    "excerpt": "Check lap/shoulder belts and seat latches for wear and proper operation. Check that externally mounted spare tire is properly stowed (tight) (see your Owner’s Guide). Check power steering fluid level, if equipped. Check washer spray, wiper operation, and clean all wiper blades (replace blades as necessary). Check parking brake for proper operation. Check and lubricate all hinges, latches, door check straps (see dealer) and outside locks. Check and lubricate upper and lower sliding door tracks, if equipped. Check and clean sliding door contact switches, if equipped. Check and lubricate door rubber weatherstrips. Check and clean body and door drain holes. Check safety warning lamps (brake, ABS, airbag, safety belt) for operation. Check engine cooling system level and strength. Check battery connections and clean if necessary. Check clutch fluid level, if equipped. On vehicles equipped with dual rear wheels, retighten the wheel lug nuts to the specified torque at 100 miles Refer to Wheel Lug Nut Torque Specification in your Owner’s Guide for the proper lug nut torque specification.",
    "inspectionHint": "Battery connections, cooling strength, and warning-lamp checks are part of Ford’s six-month baseline.",
    "sourceCitationKey": "maintenance-owner-checks-six-month"
  },
  {
    "id": "maintenance-owner-checks-multipoint",
    "sourceType": "owner_manual",
    "sourceLabel": "Ford Scheduled Maintenance",
    "title": "Multipoint inspection items",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [
      "accessory_drive",
      "cooling",
      "brakes",
      "suspension_steering",
      "underbody"
    ],
    "issueAreaIds": [
      "accessory_drive_belt_path",
      "coolant_leak_source",
      "brake_hose_or_line_concern",
      "front_suspension_joint_play"
    ],
    "partTags": [
      "belt",
      "coolant_hose",
      "brake_line",
      "ball_joint",
      "frame_section"
    ],
    "symptomTags": [
      "chirp",
      "leak",
      "clunk",
      "rust"
    ],
    "aliases": [
      "multipoint inspection",
      "dealer multipoint check"
    ],
    "excerpt": "Check and top-up fluid levels: brake, coolant recovery reservoir, manual and automatic transmission (if equipped Inspect tires for wear and check air pressure, including spare. Check exhaust system for leaks, damage, loose parts and foreign material. Check battery performance. Check operation of horn, exterior lamps, turn signals and hazard warning lights. Check radiator, coolers, heater and air conditioning hoses. Inspect windshield washer spray and wiper operation. Check windshield for cracks, chips and pitting. Inspect for oil and fluid leaks. Inspect engine air filter. Inspect half shaft dust boots, if equipped. Check shocks and struts and other suspension components for leaks and damage. Inspect steering and linkage. Inspect accessory drive belt(s). Inspect clutch operation, if equipped. Perform Self-Test for All CMDTCs Radiator Pressure Test Radiator Cap and Radiator Cooling Fans, Clutches and Motors Water Pump Coolant Recovery Tank Cabin Air Filter Starter Operation",
    "inspectionHint": "Use the Ford multipoint inspection list when the session still needs a practical next target.",
    "sourceCitationKey": "maintenance-owner-checks-multipoint"
  },
  {
    "id": "maintenance-7500-mile-service",
    "sourceType": "owner_manual",
    "sourceLabel": "Ford Scheduled Maintenance",
    "title": "7,500-mile service baseline",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [
      "engine_mechanical"
    ],
    "issueAreaIds": [],
    "partTags": [
      "front_accessory_drive"
    ],
    "symptomTags": [],
    "aliases": [
      "7500 mile service",
      "oil service interval"
    ],
    "excerpt": "Change engine oil and replace oil filter DEALER VALIDATION: Inspect cabin air filter (if equipped) Rotate tires, inspect tires for wear and measure Inspect the wheels and related components for Perform multi-point inspection (recommended)",
    "inspectionHint": "Unknown service history should keep oil-sensitive timing or valvetrain claims conservative.",
    "sourceCitationKey": "maintenance-7500-mile-service"
  },
  {
    "id": "maintenance-90000-mile-spark-plug-service",
    "sourceType": "owner_manual",
    "sourceLabel": "Ford Scheduled Maintenance",
    "title": "90,000-mile spark plug service",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [
      "ignition",
      "engine_mechanical"
    ],
    "issueAreaIds": [
      "ignition_misfire_path"
    ],
    "partTags": [
      "spark_plug",
      "coil"
    ],
    "symptomTags": [
      "misfire",
      "rough_idle"
    ],
    "aliases": [
      "90000 mile spark plugs",
      "spark plug interval"
    ],
    "excerpt": "Change engine oil and replace oil filter Inspect automatic transmission fluid level on Replace cabin air filter (if equipped) Replace climate-controlled seat filter (if equipped) Replace engine air filter Replace fuel filter (except Escape, Mariner, Replace spark plugs Inspect steering linkage, ball joints, suspension, Torque the rear U-bolts (Transit Connect only) Inspect engine cooling system and hoses RO#: P&A CODE: Inspect brake pads, shoes, rotors, drums, brake DATE: MILEAGE: Inspect half shaft boots (if equipped) Inspect exhaust system and heat shields Inspect accessory drive belts Inspect and lubricate 4x4 front axle U-joints Rotate tires, inspect tires for wear and measure Inspect the wheels and related components for Perform multi-point inspection (recommended)",
    "inspectionHint": "If the truck is far past this interval with no plug history, plug and coil evidence deserves more attention.",
    "sourceCitationKey": "maintenance-90000-mile-spark-plug-service"
  },
  {
    "id": "maintenance-150000-mile-belts-fluids",
    "sourceType": "owner_manual",
    "sourceLabel": "Ford Scheduled Maintenance",
    "title": "150,000-mile belts and fluid follow-up",
    "vehicleScope": "2010-ford-f150-5.4-triton",
    "systemTags": [
      "accessory_drive",
      "cooling",
      "drivetrain_4wd"
    ],
    "issueAreaIds": [
      "accessory_drive_belt_path",
      "drivetrain_leak_or_boot",
      "coolant_leak_source"
    ],
    "partTags": [
      "belt",
      "radiator_hose",
      "transfer_case_area",
      "differential_cover"
    ],
    "symptomTags": [
      "chirp",
      "leak",
      "coolant_smell"
    ],
    "aliases": [
      "150000 mile service",
      "belt replacement interval",
      "high mileage fluid service"
    ],
    "excerpt": "Change engine oil and replace oil filter Change engine coolant (see Engine Coolant Replace cabin air filter (if equipped) Replace climate-controlled seat filter (if equipped) Replace engine air filter Replace fuel filter (except Escape, Mariner, Change automatic transmission fluid and filter Change manual transmission fluid Change rear axle lubricant on all rear wheel Change transfer case fluid (4x4 only) Change front differential fluid (4x4 only) Normal Schedule Replace wheel bearings (if non-sealed bearings) Replace accessory drive belt(s) if not RO#: P&A CODE: Inspect steering linkage, ball joints, suspension, tie Torque the rear U-bolts (Transit Connect only) Inspect engine cooling system and hoses Inspect brake pads, shoes, rotors, drums, brake Inspect half shaft boots (if equipped) Inspect exhaust system and heat shields Inspect and lubricate 4x4 front axle U-joints Rotate tires, inspect tires for wear and measure Inspect the wheels and related components for Perform multi-point inspection (recommended)",
    "inspectionHint": "A high-mileage truck with unknown service history should keep belts, cooling, and driveline fluids in view.",
    "sourceCitationKey": "maintenance-150000-mile-belts-fluids"
  }
] satisfies TruckReferenceRecord[];
