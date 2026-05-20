"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  APP_CONFIG,
  SUPPORTED_VEHICLE_ID,
  type SupportedVehicleId,
} from "@/lib/config/app-config";

const STORAGE_KEY = "repair-buddy-vehicle-id";

type VehicleContextValue = {
  vehicleId: SupportedVehicleId;
  setVehicleId: (id: SupportedVehicleId) => void;
};

const VehicleContext = createContext<VehicleContextValue | null>(null);

function isValidVehicleId(id: string): id is SupportedVehicleId {
  return APP_CONFIG.supportedVehicles.some((v) => v.id === id);
}

export function VehicleProvider({ children }: { children: ReactNode }) {
  const [vehicleId, setVehicleIdState] =
    useState<SupportedVehicleId>(SUPPORTED_VEHICLE_ID);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && isValidVehicleId(stored)) {
        setVehicleIdState(stored);
      }
    } catch {
      // localStorage unavailable
    }
    setHydrated(true);
  }, []);

  const setVehicleId = useCallback((id: SupportedVehicleId) => {
    setVehicleIdState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // localStorage unavailable
    }
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <VehicleContext.Provider value={{ vehicleId, setVehicleId }}>
      {children}
    </VehicleContext.Provider>
  );
}

export function useSelectedVehicle(): VehicleContextValue {
  const ctx = useContext(VehicleContext);
  if (!ctx) {
    throw new Error("useSelectedVehicle must be used within a VehicleProvider");
  }
  return ctx;
}
