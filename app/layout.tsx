import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

// Google Search Console / Bing Webmaster verification.
// Sobald der GSC-Verifizierungs-Code vorliegt: hier eintragen + neu deployen.
// (Meta-Tag-Methode — Next gibt <meta name="google-site-verification"> aus.)
const GSC_VERIFICATION = "";   // z. B. "abcDEF123…" aus Search Console
const BING_VERIFICATION = "";  // z. B. "0123ABC…" aus Bing Webmaster Tools

export const metadata: Metadata = {
  metadataBase: new URL("https://partsunion.de"),
  title: {
    default: "Partsunion – Warenwirtschaft für den Autoteilehandel",
    template: "%s | Partsunion",
  },
  description:
    "Partsunion ist ERP und Warenwirtschaft für den Autoteilehandel: Teileanfragen, OE-Ermittlung, Neuteile, Gebrauchtteile, Einkauf, Lager, Kasse, Rechnung und Banking in einem Ablauf.",
  keywords: [
    "Autoteile Software",
    "Neuteile Warenwirtschaft",
    "Gebrauchtteile Software",
    "Autoverwerter Software",
    "Autoverwertung Warenwirtschaft",
    "Gebrauchtteilehandel Warenwirtschaft",
    "Autoteile eBay verkaufen",
    "eBay Motors Teile einstellen",
    "Gebrauchtteile Preisermittlung",
    "Autoteilehändler Automatisierung",
    "Betriebssystem Autoteilehandel",
    "ERP Autoteile",
    "Warenwirtschaft Autoteile",
    "WaWi Kfz-Teile",
    "Teilehandel Software",
    "OEM Ermittlung",
    "OEM Nummer finden",
    "lizenzierte Herstellerkataloge",
    "Kassenbuch GoBD",
    "TSE Kasse Autoteile",
    "DATEV Export Autoteile",
    "ZUGFeRD XRechnung",
    "B2B Kundenportal Autoteile",
    "Foto-Wareneingang",
    "Autoteile-Dashboard",
    "Werkstatt Software",
    "Software für Teilehandel",
    "Software Autoteilehandel",
    "Warenwirtschaftssystem Autoteile",
    "Warenwirtschaft Autoteilehandel",
    "ERP System Autoteilehandel",
    "ERP Autoteilehandel",
    "ERP für Teilehandel",
    "Partsunion",
    "Retourenquote senken",
    "Autoteile Händler Tools",
  ],
  authors: [{ name: "Partsunion", url: "https://partsunion.de" }],
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
    title: "Partsunion – Warenwirtschaft für den Autoteilehandel",
    description:
      "Vom ersten Teilebedarf bis zur Rechnung: Verkauf, Einkauf, Lager und Büro in einem durchgängigen Ablauf.",
    type: "website",
    locale: "de_DE",
    url: "https://partsunion.de",
    siteName: "Partsunion",
    // Kein explicit images-Array → Next nutzt opengraph-image.tsx
    // aus dem App-Root (dynamisch gerendert beim Build).
  },
  twitter: {
    card: "summary_large_image",
    title: "Partsunion – Warenwirtschaft für den Autoteilehandel",
    description:
      "Teileanfragen, Fahrzeugbezug, Verkauf, Einkauf, Lager und Rechnung in einem System.",
  },
  alternates: {
    canonical: "https://partsunion.de",
    languages: {
      "de-DE": "https://partsunion.de",
      "x-default": "https://partsunion.de",
    },
  },
  verification: {
    ...(GSC_VERIFICATION ? { google: GSC_VERIFICATION } : {}),
    ...(BING_VERIFICATION ? { other: { "msvalidate.01": BING_VERIFICATION } } : {}),
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

import { CookieBanner } from "@/components/layout/CookieBanner";
import { Analytics } from "@/components/layout/Analytics";
import { SiteShell } from "@/components/layout/SiteShell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
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
                  "@id": "https://partsunion.de/#organization",
                  name: "Partsunion",
                  url: "https://partsunion.de",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://partsunion.de/logo.png",
                    width: 512,
                    height: 512,
                  },
                  description:
                    "Partsunion entwickelt ERP und Warenwirtschaft für den Autoteilehandel: von Teileidentifikation und Beschaffung über Neuteile und gebrauchte Einzelstücke bis zu Verkauf und Finanzen.",
                  areaServed: "DE",
                  knowsLanguage: ["de", "en"],
                  sameAs: [],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://partsunion.de/#website",
                  url: "https://partsunion.de",
                  name: "Partsunion",
                  description:
                    "ERP und Warenwirtschaft für den Autoteilehandel: Teileidentifikation, Neu- und Gebrauchtteile, Beschaffung, Lager, Verkauf und Finanzen.",
                  publisher: { "@id": "https://partsunion.de/#organization" },
                  inLanguage: "de-DE",
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://partsunion.de/#software",
                  name: "Partsunion",
                  alternateName: [
                    "Partsunion ERP",
                    "Partsunion Warenwirtschaft",
                    "Autoteile-Software Partsunion",
                  ],
                  applicationCategory: "BusinessApplication",
                  applicationSubCategory: "ERP & Warenwirtschaft (Autoteilehandel)",
                  operatingSystem: "Web",
                  description:
                    "Branchenspezifisches ERP und Warenwirtschaft für den Autoteilehandel mit Teileidentifikation, Neuteile- und Gebrauchtteileverwaltung, Einkauf, Lager, Verkauf, Kasse, Faktura und Finanzfunktionen.",
                  url: "https://partsunion.de",
                  offers: {
                    "@type": "Offer",
                    priceCurrency: "EUR",
                    availability: "https://schema.org/InStock",
                    url: "https://partsunion.de/#beratung",
                  },
                  // NOTE: Kein aggregateRating. Es gibt (Stand Go-Live) noch keine
                  // echten, verifizierten Kundenbewertungen. Erfundene Sterne-Ratings
                  // verstoßen gegen UWG §5 (irreführende Werbung) und Googles
                  // Structured-Data-Richtlinie (self-serving fake ratings → manuelle
                  // Penalty). Erst wieder einsetzen, wenn reale, belegbare Reviews
                  // vorliegen.
                  // NOTE: featureList = nur tatsächlich verfügbare (live) Funktionen.
                  // Live-Marktplatz-/Shop-Sync und die direkte Großhändler-Bestellung
                  // sind Roadmap (noch nicht live) und gehören daher NICHT in die
                  // strukturierten Produktdaten — sonst irreführende Werbung (UWG §5).
                  // Katalogzugriffe werden ausschließlich als lizenzierte Nutzung geführt, nicht als Partnerschaft.
                  featureList: [
                    "Teileidentifikation über VIN, HSN/TSN, OE-Nummern und Fahrzeugdaten",
                    "Einkauf mit Lieferanten, Bestellvorschlägen und Bestellabwicklung",
                    "Integrierte Warenwirtschaft mit Foto-Wareneingang, Retouren und Reklamationen",
                    "Verkauf mit durchgängiger Belegkette von Angebot bis Rechnung",
                    "Faktura und Finanzen mit ZUGFeRD/XRechnung, TSE, DATEV-Export und GoBD-Funktionen",
                    "Über 40 datengetriebene Auswertungen aus echten Belegen",
                    "White-Label B2B-Kundenportal mit kundenspezifischen Preisen",
                    "Mandanten-Isolation, 2FA, Audit-Log, DSGVO Auskunft & Löschung",
                    "WhatsApp als optionaler Eingangskanal für Kundenanfragen",
                    "Gebrauchte Einzelstücke mit Herkunft, Zustand, Fotos und eindeutigem Bestand",
                    "Preisermittlung und vorbereitete eBay-Inserate für Gebrauchtteile",
                  ],
                  provider: { "@id": "https://partsunion.de/#organization" },
                },
                {
                  "@type": "Service",
                  "@id": "https://partsunion.de/#service",
                  name: "ERP und Warenwirtschaft für Autoteilehändler",
                  serviceType: "SaaS",
                  provider: { "@id": "https://partsunion.de/#organization" },
                  areaServed: { "@type": "Country", name: "Deutschland" },
                  description:
                    "Branchenspezifische ERP-Plattform für Teileidentifikation, Beschaffung, Lager, Verkauf und Finanzen im Autoteilehandel.",
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
        <SiteShell>{children}</SiteShell>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
