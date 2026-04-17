import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "F-150 Repair Buddy",
    template: "%s | F-150 Repair Buddy",
  },
  description:
    "AI-powered repair triage for the 2010 Ford F-150 5.4L Triton V8. Live camera inspection, voice diagnosis, DTC lookup, torque specs, and Korean mechanic reports.",
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
      "AI-powered repair triage for the 2010 Ford F-150 5.4L Triton V8. Point your camera, talk to the buddy, get a diagnosis.",
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
      "AI-powered repair triage for the 2010 Ford F-150 5.4L Triton V8.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "F-150",
    "Ford F-150",
    "2010 F-150",
    "5.4 Triton",
    "5.4L V8",
    "repair buddy",
    "truck repair",
    "cam phaser",
    "spark plug",
    "DTC lookup",
    "torque specs",
    "F150 maintenance",
    "DIY truck repair",
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
        {children}
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
