import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/homepage";
import "./globals.css";

// Cabinet Grotesk: ITF Free Font License (Fontshare). Self-hosted copies from Preview V2.
const cabinet = localFont({
  src: [
    { path: "./fonts/CabinetGrotesk-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/CabinetGrotesk-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/CabinetGrotesk-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

// Instrument Sans: SIL Open Font License 1.1. Variable weight 400–700.
const instrument = localFont({
  src: [
    { path: "./fonts/InstrumentSans-normal-latin.woff2", weight: "400 700", style: "normal" },
    { path: "./fonts/InstrumentSans-normal-latin-ext.woff2", weight: "400 700", style: "normal" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Webleta: websites made to stand out",
  description: site.description,
  robots: { index: false, follow: false }, // preview build, not for indexing
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#07223B",
  width: "device-width",
  initialScale: 1,
};

// Runs before paint: lets CSS hide intro elements only when motion is allowed.
const motionScript = `try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${cabinet.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <link rel="preload" as="image" href="/images/card-design-1280.webp" type="image/webp" />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="site">{children}</div>
      </body>
    </html>
  );
}
