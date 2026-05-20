"use client";

import { useState } from "react";

import { APP_CONFIG } from "@/lib/config/app-config";
import { useSelectedVehicle } from "@/lib/context/vehicle-context";

export function VehicleIndicator() {
  const { vehicleId } = useSelectedVehicle();
  const [open, setOpen] = useState(false);

  const current = APP_CONFIG.supportedVehicles.find((v) => v.id === vehicleId);
  const label = current
    ? `${current.year} ${current.model}`
    : "Select Vehicle";
  const engine = current?.engine ?? "";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-[1.2rem] border border-border/60 bg-panel px-3 py-3 text-left transition hover:border-foreground/20"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 17h2m10 0h2M2 9l2-4h16l2 4M2 9h20v8H2zM6 13h.01M18 13h.01" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.7rem] font-semibold tracking-[0.14em] text-foreground/90 uppercase">
            {label}
          </p>
          <p className="truncate text-[0.65rem] tracking-wide text-muted">
            {engine}
          </p>
        </div>
        <svg
          className="h-4 w-4 shrink-0 text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <VehicleSelectorModal onClose={() => setOpen(false)} />
      )}
    </>
  );
}

function VehicleSelectorModal({ onClose }: { onClose: () => void }) {
  const { vehicleId, setVehicleId } = useSelectedVehicle();

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        role="button"
        tabIndex={0}
        aria-label="Close vehicle selector"
      />
      <div className="relative z-10 mx-4 mb-4 w-full max-w-md rounded-[1.75rem] border border-border/45 bg-panel-strong/95 p-4 shadow-2xl backdrop-blur-md sm:mb-0">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[0.75rem] font-semibold tracking-[0.16em] text-foreground/80 uppercase">
            Select Your F-150
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-panel hover:text-foreground"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid gap-2">
          {APP_CONFIG.supportedVehicles.map((vehicle) => {
            const isSelected = vehicle.id === vehicleId;
            const isRaptor = vehicle.model.includes("Raptor");

            return (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => {
                  setVehicleId(vehicle.id);
                  onClose();
                }}
                className={[
                  "flex items-center gap-3 rounded-[1.2rem] border px-3 py-3 text-left transition",
                  isSelected
                    ? "border-accent/60 bg-accent/10"
                    : "border-border/40 bg-background/40 hover:border-foreground/15 hover:bg-panel/60",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold tracking-tight",
                    isSelected
                      ? "bg-accent/20 text-accent"
                      : "bg-panel text-muted",
                  ].join(" ")}
                >
                  {isRaptor ? (
                    <span className="text-[0.6rem] leading-none">SVT</span>
                  ) : (
                    <span className="text-[0.65rem] leading-none">
                      {vehicle.year.length > 4
                        ? vehicle.year.split("-")[0].slice(2)
                        : vehicle.year.slice(2)}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={[
                      "truncate text-[0.72rem] font-semibold tracking-[0.1em] uppercase",
                      isSelected ? "text-accent" : "text-foreground/85",
                    ].join(" ")}
                  >
                    {vehicle.year} {vehicle.model}
                  </p>
                  <p className="truncate text-[0.63rem] tracking-wide text-muted">
                    {vehicle.engine}
                  </p>
                </div>
                {isSelected && (
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-background"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
