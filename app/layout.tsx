import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { VehicleProvider } from "@/lib/context/vehicle-context";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://f150-repair-buddy.vercel.app"),
  title: {
    default: "F-150 Repair Buddy",
    template: "%s | F-150 Repair Buddy",
  },
  description:
    "AI-powered repair triage for the 12th-gen Ford F-150 (2009-2014). Live camera inspection, voice diagnosis, DTC lookup, torque specs, Korean mechanic reports, RockAuto parts integration.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "F150 Buddy",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "F-150 Repair Buddy",
    description:
      "AI-powered repair triage for the 12th-gen Ford F-150 (2009-2014). Point your camera, talk to the buddy, get a diagnosis.",
    url: "https://f150-repair-buddy.vercel.app",
    siteName: "F-150 Repair Buddy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "F-150 Repair Buddy — AI repair triage for the 2010 Ford F-150 5.4L Triton",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "F-150 Repair Buddy",
    description:
      "AI-powered repair triage for the 12th-gen Ford F-150 (2009-2014).",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "F-150",
    "Ford F-150",
    "2009 F-150",
    "2010 F-150",
    "2011 F-150",
    "2012 F-150",
    "2013 F-150",
    "2014 F-150",
    "5.4 Triton",
    "5.4L V8",
    "3.5 EcoBoost",
    "5.0 Coyote",
    "6.2 Boss",
    "SVT Raptor",
    "F-150 Raptor",
    "12th gen F-150",
    "repair buddy",
    "truck repair",
    "cam phaser",
    "spark plug ejection",
    "DTC lookup",
    "torque specs",
    "F150 maintenance",
    "DIY truck repair",
    "RockAuto parts",
    "Korean F-150",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased">
        <VehicleProvider>
        {children}
        </VehicleProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(() => {});
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
