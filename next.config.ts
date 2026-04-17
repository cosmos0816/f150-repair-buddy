import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

function getAllowedDevOrigins() {
  const origins = new Set([
    "localhost",
    "127.0.0.1",
    "*.trycloudflare.com",
  ]);

  for (const addresses of Object.values(networkInterfaces())) {
    for (const address of addresses ?? []) {
      if (address.family === "IPv4" && !address.internal) {
        origins.add(address.address);
      }
    }
  }

  return Array.from(origins);
}

const nextConfig: NextConfig = {
  allowedDevOrigins: getAllowedDevOrigins(),
};

export default nextConfig;
