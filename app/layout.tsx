import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.partsunion.de"),
  title: {
    default: "Partsunion – KI-Automatisierung für Autoteilehändler | OEM, WaWi & WhatsApp-Bot",
    template: "%s | Partsunion",
  },
  description:
    "Partsunion automatisiert Ihren Autoteilehandel mit KI: OEM-Ermittlung in Sekunden, 24/7 WhatsApp-Bot, Warenwirtschaft und weniger Retouren durch präzise Teile-Identifikation. Jetzt kostenlose Demo ansehen.",
  keywords: [
    "Autoteile Software",
    "Autoteilehändler Automatisierung",
    "KI Autoteile",
    "OEM Ermittlung",
    "OEM Nummer finden",
    "WhatsApp Bot Autoteile",
    "Warenwirtschaft Autoteile",
    "Teilehandel Software",
    "Ersatzteile KI",
    "Autoteile-Dashboard",
    "Partsunion",
    "Retourenquote senken",
    "Autoteile Händler Tools",
  ],
  authors: [{ name: "Partsunion", url: "https://www.partsunion.de" }],
  creator: "Partsunion",
  publisher: "Partsunion",
  applicationName: "Partsunion",
  category: "Business Software",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Partsunion – KI-Automatisierung für Autoteilehändler",
    description:
      "OEM-Ermittlung in Sekunden, 24/7 WhatsApp-Bot, Warenwirtschaft und Retourenreduktion – das Betriebssystem für den modernen Teilehandel.",
    type: "website",
    locale: "de_DE",
    url: "https://www.partsunion.de",
    siteName: "Partsunion",
    // Kein explicit images-Array → Next nutzt opengraph-image.tsx
    // aus dem App-Root (dynamisch gerendert beim Build).
  },
  twitter: {
    card: "summary_large_image",
    title: "Partsunion – KI-Automatisierung für Autoteilehändler",
    description:
      "OEM-Ermittlung in Sekunden, 24/7 WhatsApp-Bot und Warenwirtschaft für Autoteilehändler.",
  },
  alternates: {
    canonical: "https://www.partsunion.de",
    languages: {
      "de-DE": "https://www.partsunion.de",
      "x-default": "https://www.partsunion.de",
    },
  },
  verification: {
    // Werte hier ergänzen sobald GSC + Bing Webmaster eingerichtet sind:
    // google: "abc123…",
    // other: { "msvalidate.01": "…" },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    // app/icon.png is picked up automatically by Next.js for /icon route,
    // but apple-touch-icon needs an explicit hint.
    apple: [{ url: "/favicon.png", sizes: "512x512", type: "image/png" }],
  },
};

import { Navbar } from "@/components/layout/Navbar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/landing/Footer";
import { Analytics } from "@/components/layout/Analytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <head>
        {/*
          Favicons + apple-touch-icon are emitted automatically from the
          metadata.icons config above — no manual <link> tags needed.
          NOTE: no preconnect to fonts.googleapis.com / fonts.gstatic.com.
          next/font/google downloads the fonts at build time and serves them
          from /_next/static/media as self-hosted WOFF2. Preconnect links
          to Google would only open an unused connection to Google servers
          (violating DSGVO), so they are intentionally omitted.
        */}
        {/* Schema.org structured data (Organization + WebSite + SoftwareApplication)
            for SEO rich snippets, Knowledge Graph eligibility and Sitelinks Search Box. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.partsunion.de/#organization",
                  name: "Partsunion",
                  url: "https://www.partsunion.de",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.partsunion.de/logo.png",
                    width: 512,
                    height: 512,
                  },
                  description:
                    "Partsunion ist das Betriebssystem für den Teilehandel: KI-Automatisierung, OEM-Ermittlung, Warenwirtschaft und 24/7 WhatsApp-Bot für Autoteilehändler.",
                  areaServed: "DE",
                  knowsLanguage: ["de", "en"],
                  sameAs: [],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.partsunion.de/#website",
                  url: "https://www.partsunion.de",
                  name: "Partsunion",
                  description:
                    "KI-Automatisierung für Autoteilehändler: OEM-Ermittlung, WhatsApp-Bot, Warenwirtschaft.",
                  publisher: { "@id": "https://www.partsunion.de/#organization" },
                  inLanguage: "de-DE",
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://www.partsunion.de/#software",
                  name: "Partsunion",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  description:
                    "All-in-One SaaS für Autoteilehändler: OEM-Ermittlung in Sekunden, 24/7 WhatsApp-Bot, Warenwirtschaft, Retourenreduktion und automatische Angebotserstellung.",
                  url: "https://www.partsunion.de",
                  offers: {
                    "@type": "Offer",
                    priceCurrency: "EUR",
                    availability: "https://schema.org/InStock",
                    url: "https://www.partsunion.de/#beratung",
                  },
                  // NOTE: Kein aggregateRating. Es gibt (Stand Go-Live) noch keine
                  // echten, verifizierten Kundenbewertungen. Erfundene Sterne-Ratings
                  // verstoßen gegen UWG §5 (irreführende Werbung) und Googles
                  // Structured-Data-Richtlinie (self-serving fake ratings → manuelle
                  // Penalty). Erst wieder einsetzen, wenn reale, belegbare Reviews
                  // vorliegen.
                  // NOTE: featureList = nur tatsächlich verfügbare Funktionen.
                  // TecAlliance/TecDoc-Integration und die Großhändler-Anbindung
                  // sind Roadmap (noch nicht live) und gehören daher NICHT in die
                  // strukturierten Produktdaten — sonst irreführende Werbung (UWG §5).
                  featureList: [
                    "KI-OEM-Ermittlung aus VIN, HSN/TSN oder Fahrzeugbrief",
                    "24/7 WhatsApp-Bot für Kundenanfragen",
                    "Integrierte Warenwirtschaft (WaWi)",
                    "Automatische Angebotserstellung",
                    "Echtzeit-Bestandssynchronisation",
                    "Retourenmanagement",
                  ],
                  provider: { "@id": "https://www.partsunion.de/#organization" },
                },
                {
                  "@type": "Service",
                  "@id": "https://www.partsunion.de/#service",
                  name: "KI-Automatisierung für Autoteilehändler",
                  serviceType: "SaaS",
                  provider: { "@id": "https://www.partsunion.de/#organization" },
                  areaServed: { "@type": "Country", name: "Deutschland" },
                  description:
                    "End-to-End Automatisierung für den Teilehandel: Vom WhatsApp-Foto zum bezahlten Auftrag in unter 10 Minuten.",
                  audience: {
                    "@type": "BusinessAudience",
                    audienceType: "Autoteilehändler, Werkstätten, Teile-Großhändler",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased flex flex-col min-h-screen bg-background text-foreground`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
