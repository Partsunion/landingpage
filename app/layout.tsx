import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://partsunion.de"),
  title: { default: "Partsunion | ERP & Automatisierung für den Autoteilehandel", template: "%s | Partsunion" },
  description: "Die All-in-One-Plattform für Autoteilehändler: OE-Ermittlung, Warenwirtschaft, Lager, Kasse, Buchhaltung und WhatsApp-Automatisierung.",
  applicationName: "Partsunion",
  keywords: ["ERP Autoteilehandel", "Warenwirtschaft Autoteilehandel", "OE-Ermittlung", "Autoteile Software", "WhatsApp-Bot Autoteilehändler"],
  authors: [{ name: "Partsunion" }],
  creator: "Partsunion",
  publisher: "Partsunion",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "Partsunion",
    title: "Partsunion | ERP & Automatisierung für den Autoteilehandel",
    description: "Dein Teilehandel. Alles verbunden. Ein System.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Partsunion Plattform für Autoteilehändler" }],
  },
  twitter: { card: "summary_large_image", title: "Partsunion", description: "ERP und Automatisierung für den Autoteilehandel.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://partsunion.de";
const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: "Partsunion",
      legalName: "PartsUnion UG (haftungsbeschränkt)",
      url: base,
      logo: { "@type": "ImageObject", url: `${base}/brand/partsunion-logo.png` },
      email: "info@partsunion.de",
      address: { "@type": "PostalAddress", addressLocality: "Brühl", addressCountry: "DE" },
      contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "info@partsunion.de", availableLanguage: ["de"] },
      description: "Anbieter einer verbundenen ERP-, Warenwirtschafts- und Automatisierungsplattform für den Autoteilehandel.",
      knowsAbout: ["Autoteilehandel", "OE-Ermittlung", "Fahrzeugidentifikation", "Warenwirtschaft", "Lagerverwaltung", "Kasse", "Buchhaltung", "Retourenmanagement"],
    },
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: base,
      name: "Partsunion",
      inLanguage: "de-DE",
      publisher: { "@id": `${base}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${base}/#software`,
      name: "Partsunion",
      url: `${base}/plattform`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "ERP und Warenwirtschaft für den Autoteilehandel",
      operatingSystem: "Web, Desktop und Mobilgeräte",
      description: "Partsunion verbindet OE-Ermittlung, Verkauf, Einkauf, Lager, Kasse, Buchhaltung und Automatisierung für Neu- und Gebrauchtteilehändler.",
      screenshot: [`${base}/product/native-sales-work.jpg`, `${base}/product/native-inventory.jpg`, `${base}/product/native-inbox-snippet.jpg`, `${base}/product/native-finance-snippet.jpg`],
      featureList: ["Fahrzeug- und OE-Ermittlung", "Angebot und Auftrag", "Einkauf und Disposition", "Bestand und Lager", "Retourenmanagement", "Kasse und Finanzen", "WhatsApp-Anfragen", "Buchhaltung und Banking"],
      audience: { "@type": "Audience", audienceType: "Autoteilehändler" },
      provider: { "@id": `${base}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${base}/#beratung`,
      name: "Partsunion Beratung für Autoteilehändler",
      serviceType: "Softwareberatung und Einführung",
      provider: { "@id": `${base}/#organization` },
      areaServed: { "@type": "Country", name: "Deutschland" },
      audience: { "@type": "Audience", audienceType: "Autoteilehändler" },
      url: `${base}/beratung`,
    },
    {
      "@type": "FAQPage",
      "@id": `${base}/#faq`,
      mainEntity: [
        { "@type": "Question", name: "Für wen ist Partsunion geeignet?", acceptedAnswer: { "@type": "Answer", text: "Partsunion ist für Neu- und Gebrauchtteilehändler ausgelegt, die Fahrzeug- und OE-Ermittlung, Verkauf, Einkauf, Lager, Retouren, Kasse und Buchhaltung verbinden möchten." } },
        { "@type": "Question", name: "Wie kann ich Partsunion kennenlernen?", acceptedAnswer: { "@type": "Answer", text: "Über die Beratungsseite kann ein freier 30-minütiger Gesprächstermin direkt im Partsunion Kalender gebucht werden." } },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={sourceSans.variable}>
      <body id="top">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
