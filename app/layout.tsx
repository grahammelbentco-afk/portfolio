import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/homepage";
import "lenis/dist/lenis.css";
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

// Instrument Serif: SIL Open Font License 1.1. Only for the example client site in Steps,
// so it isn't preloaded.
const instrumentSerif = localFont({
  src: [{ path: "./fonts/InstrumentSerif-400-latin.woff2", weight: "400", style: "normal" }],
  variable: "--font-demo-serif",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  // Staging stays out of search until launch: flip `site.indexable` in content/homepage.ts.
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.shareDescription,
    images: [{ url: site.shareImage.src, width: site.shareImage.width, height: site.shareImage.height, alt: site.shareImage.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shareDescription,
    images: [site.shareImage.src],
  },
  category: "Web design",
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const ReactGrabDev = process.env.NODE_ENV === "development"
    ? (await import("@/components/ReactGrabDev")).default
    : null;
  return (
    <html lang="en-AU" className={`${cabinet.variable} ${instrument.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <link rel="preload" as="image" href="/images/card-design-1280.webp" type="image/webp" />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="site">{children}</div>
        {ReactGrabDev && <ReactGrabDev />}
      </body>
    </html>
  );
}
