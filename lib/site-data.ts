import { BadgeEuro, Barcode, Bot, Boxes, Building2, Calculator, CarFront, CircleGauge, FileCheck2, Handshake, Landmark, MessageCircle, PackageCheck, ReceiptText, RefreshCcw, SearchCheck, ShoppingCart, Smartphone, Sparkles, Store, Truck, Warehouse, Workflow, Wrench, type LucideIcon } from "lucide-react";

export type NavItem = { label: string; href: string; description: string; icon?: LucideIcon; section?: string };
export type NavGroup = { label: string; href: string; eyebrow: string; intro: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "Plattform", href: "/plattform", eyebrow: "Die Partsunion Plattform", intro: "Alle Abläufe deines Autoteilehandels in einem durchgängigen System.",
    items: [
      { label: "Plattform im Überblick", href: "/plattform", description: "Vom Fahrzeugschein bis zur Zahlung: alles in einem Workflow.", icon: Workflow, section: "Plattform" },
      { label: "Automatisierung im Teilehandel", href: "/automatisierung-autoteilehandel", description: "Routinearbeit reduzieren und schneller verkaufen.", icon: Sparkles, section: "Plattform" },
      { label: "Alle Lösungen", href: "/loesungen", description: "Die passenden Werkzeuge für jeden Arbeitsschritt.", icon: Boxes, section: "Plattform" },
      { label: "Alle Funktionen", href: "/features", description: "Funktionen für Verkauf, Lager, Kasse und Verwaltung.", icon: CircleGauge, section: "Plattform" },
      { label: "OE-Ermittlung", href: "/loesungen/oe-ermittlung", description: "VIN, HSN/TSN und Fahrzeugschein sicher zuordnen.", icon: SearchCheck, section: "Teile & Verkauf" },
      { label: "Angebot & Auftrag", href: "/loesungen/angebot-auftrag", description: "Anfragen direkt in Angebote und Aufträge verwandeln.", icon: ReceiptText, section: "Teile & Verkauf" },
      { label: "Einkauf & Disposition", href: "/loesungen/einkauf-disposition", description: "Bedarf erkennen und Bestellungen sauber steuern.", icon: ShoppingCart, section: "Teile & Verkauf" },
      { label: "Bestand & Lager", href: "/loesungen/bestand-lager", description: "Bestände, Lagerplätze und Bewegungen im Blick behalten.", icon: Warehouse, section: "Betrieb & Verwaltung" },
      { label: "Finanzen & Kasse", href: "/loesungen/finanzen-kasse", description: "Kasse, Zahlungen und Belege ohne Medienbruch verbinden.", icon: Calculator, section: "Betrieb & Verwaltung" },
      { label: "Retouren", href: "/loesungen/retouren", description: "Rückgaben und Reklamationen nachvollziehbar bearbeiten.", icon: RefreshCcw, section: "Betrieb & Verwaltung" },
    ],
  },
  {
    label: "Für deinen Betrieb", href: "/loesungen", eyebrow: "Passend zu deinem Teilehandel", intro: "Partsunion passt sich an Sortiment, Team und Arbeitsweise deines Betriebs an.",
    items: [
      { label: "Neuteilehandel", href: "/plattform/neuteile", description: "Schnelle Identifikation, Beschaffung und Verkauf von Neuteilen.", icon: PackageCheck, section: "Betriebsart" },
      { label: "Gebrauchtteilehandel", href: "/plattform/gebrauchtteile", description: "Individuelle Teile, Bilder und Differenzbesteuerung sicher verwalten.", icon: Wrench, section: "Betriebsart" },
      { label: "WhatsApp-Bot", href: "/whatsapp-bot", description: "Anfragen aus WhatsApp strukturiert in den Verkauf übernehmen.", icon: MessageCircle, section: "Automatisierung" },
      { label: "Der Betriebsassistent", href: "/betriebsassistent", description: "Dynamische Masken führen dein Team durch jeden Prozess.", icon: Bot, section: "Automatisierung" },
      { label: "Buchhaltung & Banking", href: "/buchhaltung-banking", description: "Belege, Konten und Zahlungen zentral verbinden.", icon: Landmark, section: "Automatisierung" },
      { label: "Einführung & Datenübernahme", href: "/einfuehrung", description: "Strukturiert starten und bestehende Daten sicher übernehmen.", icon: Truck, section: "Start mit Partsunion" },
      { label: "Kosten & Umfang", href: "/pricing", description: "Ein transparentes Paket passend zu deinem Betrieb.", icon: BadgeEuro, section: "Start mit Partsunion" },
      { label: "Beratung vereinbaren", href: "/beratung", description: "Zeig uns deinen Ablauf – wir zeigen dir das passende Setup.", icon: Handshake, section: "Start mit Partsunion" },
    ],
  },
  {
    label: "Wissen", href: "/blog", eyebrow: "Praxiswissen für Autoteilehändler", intro: "Konkrete Leitfäden zu OE-Ermittlung, Lager, Retouren, Kasse und Digitalisierung.",
    items: [
      { label: "Wissen & Ratgeber", href: "/blog", description: "Praxisnahe Beiträge für den modernen Autoteilehandel.", icon: FileCheck2, section: "Wissen" },
      { label: "Produktansichten", href: "/produktdaten", description: "So sehen zentrale Abläufe direkt in Partsunion aus.", icon: Barcode, section: "Wissen" },
      { label: "ERP für Autoteilehändler", href: "/features/erp-autoteilehandel", description: "Warum ein branchenspezifisches ERP den Unterschied macht.", icon: Building2, section: "Grundlagen" },
      { label: "Warenwirtschaft", href: "/features/warenwirtschaft-autoteilhandel", description: "Bestand, Einkauf und Verkauf konsequent verbinden.", icon: Warehouse, section: "Grundlagen" },
      { label: "GoBD, TSE, ZUGFeRD & DATEV", href: "/features/gobd-tse-zugferd-datev", description: "Wichtige Standards direkt im Tagesgeschäft berücksichtigen.", icon: FileCheck2, section: "Grundlagen" },
      { label: "B2B-Kundenportal", href: "/features/b2b-kundenportal-white-label", description: "Dein digitales Angebot im eigenen Auftritt bereitstellen.", icon: Store, section: "Wachstum" },
      { label: "Händler-App", href: "/loesungen/haendler-app", description: "Wichtige Vorgänge auch unterwegs bearbeiten.", icon: Smartphone, section: "Wachstum" },
    ],
  },
  {
    label: "Kosten", href: "/pricing", eyebrow: "Einfach starten", intro: "Lerne Partsunion kennen und finde den passenden Einstieg für deinen Betrieb.",
    items: [
      { label: "Kosten & Leistungsumfang", href: "/pricing", description: "Transparente Orientierung für deinen Einstieg.", icon: BadgeEuro, section: "Dein Einstieg" },
      { label: "Beratung vereinbaren", href: "/beratung", description: "Deine Fragen und Abläufe persönlich besprechen.", icon: Handshake, section: "Dein Einstieg" },
      { label: "Desktop-App herunterladen", href: "/download", description: "Partsunion für deinen Arbeitsplatz herunterladen.", icon: Smartphone, section: "Dein Einstieg" },
      { label: "Live-Demo", href: "/live-demo", description: "Die wichtigsten Abläufe direkt in Aktion sehen.", icon: CarFront, section: "Dein Einstieg" },
    ],
  },
];

export const utilityLinks = [
  { label: "Produktansichten", href: "/produktdaten" }, { label: "Blog", href: "/blog" },
  { label: "Download", href: "/download" }, { label: "Kontakt", href: "/contact" },
];

export const extraRoutes: NavItem[] = [
  ["Download", "/download", "Lade die Partsunion Desktop-App für deinen Arbeitsplatz herunter."],
  ["Live-Demo", "/live-demo", "Erlebe zentrale Abläufe der Plattform in einer kompakten Live-Demo."],
  ["Live-Teileermittlung", "/live-demo/teileermittlung", "Erlebe die Fahrzeug- und OE-Ermittlung in einem konkreten Partsunion-Ablauf."],
  ["Automatisierung im Autoteilehandel", "/automatisierung-autoteilehandel", "Automatisiere wiederkehrende Aufgaben vom Kundendialog bis zur Buchhaltung."],
  ["Lösungen", "/loesungen", "Entdecke alle Partsunion Lösungen für deinen Autoteilehandel."],
  ["Beratung", "/beratung", "Besprich deine Anforderungen persönlich mit dem Partsunion Team."],
  ["WhatsApp-Bot", "/whatsapp-bot", "Verwandle Teileanfragen aus WhatsApp in strukturierte Vorgänge."],
  ["Der Betriebsassistent", "/betriebsassistent", "Führe dein Team mit dynamischen Masken sicher durch jeden Ablauf."],
  ["Buchhaltung & Banking", "/buchhaltung-banking", "Verbinde Belege, Buchhaltung, Konten und Zahlungen in einem System."],
  ["Einführung & Datenübernahme", "/einfuehrung", "Starte strukturiert und übernimm vorhandene Stammdaten."],
  ["Produktansichten", "/produktdaten", "Erhalte konkrete Einblicke in Oberfläche und Arbeitsabläufe."],
  ["Features", "/features", "Alle Funktionen der Partsunion Plattform im Überblick."],
  ["Vergleich", "/vergleich", "Vergleiche branchenspezifische Warenwirtschaft mit generischen Lösungen."],
  ["Kontakt", "/contact", "Nimm direkt Kontakt mit dem Partsunion Team auf."],
  ["Über Partsunion", "/about", "Erfahre mehr über Partsunion und unsere Mission für den Teilehandel."],
  ["Kosten", "/pricing", "Informiere dich über Kosten und Leistungsumfang."],
  ["Anfragen via WhatsApp", "/loesungen/anfragen-whatsapp", "Erfasse Kundenanfragen aus WhatsApp vollständig und strukturiert."],
  ["OE-Ermittlung", "/loesungen/oe-ermittlung", "Ermittle OE-Nummern über VIN, HSN/TSN oder Fahrzeugschein."],
  ["Angebot & Auftrag", "/loesungen/angebot-auftrag", "Erstelle aus einer Teileanfrage direkt Angebot und Auftrag."],
  ["Einkauf & Disposition", "/loesungen/einkauf-disposition", "Plane Einkauf, Bestellungen und Beschaffung bedarfsgerecht."],
  ["Bestand & Lager", "/loesungen/bestand-lager", "Steuere Bestand, Lagerplätze und Warenbewegungen zuverlässig."],
  ["Retouren", "/loesungen/retouren", "Bearbeite Retouren und Reklamationen nachvollziehbar."],
  ["Finanzen & Kasse", "/loesungen/finanzen-kasse", "Verbinde Kasse, Zahlungen, Belege und Buchhaltung."],
  ["Der Betriebsassistent", "/loesungen/betriebsassistent", "Bilde individuelle Abläufe mit geführten Masken ab."],
  ["Händler-App", "/loesungen/haendler-app", "Bearbeite zentrale Vorgänge mobil und direkt am Fahrzeug oder Lagerplatz."],
  ["Skalierbarkeit", "/features/skalierbarkeit", "Wachse mit Standorten, Nutzern und Sortimenten ohne Systemwechsel."],
  ["24/7 einsatzbereit", "/features/24-7-einsatzbereit", "Greife jederzeit zuverlässig auf deine Betriebsdaten zu."],
  ["Geschwindigkeit", "/features/geschwindigkeit", "Beschleunige Teileidentifikation und Auftragsbearbeitung."],
  ["Sinkende Retouren", "/features/sinkende-retouren", "Reduziere Fehlbestellungen mit präziser Fahrzeug- und Teilezuordnung."],
  ["Sprachübergreifend", "/features/sprachuebergreifend", "Bearbeite Anfragen sprachübergreifend und verständlich."],
  ["Teamentlastung", "/features/team-entlastung", "Automatisiere Routinen und schaffe Zeit für Beratung und Verkauf."],
  ["Automatische OE-Ermittlung", "/features/oem-ermittlung", "Ermittle passende OE-Nummern direkt aus Fahrzeugdaten."],
  ["WhatsApp-Bot", "/features/whatsapp-bot", "Strukturiere Nachrichten, Bilder und Fahrzeuginformationen automatisch."],
  ["Automatische Rechnungserstellung", "/features/automatische-rechnungserstellung", "Erzeuge Belege direkt aus abgeschlossenen Vorgängen."],
  ["Bestellprozess", "/features/bestellprozess", "Führe Anfrage, Angebot, Einkauf und Auftrag durchgängig zusammen."],
  ["Bestandssynchronisation", "/features/bestandssynchronisation", "Halte Bestände über Verkaufskanäle und Lager hinweg aktuell."],
  ["Retourenmanagement", "/features/retourenmanagement", "Steuere Rücksendungen mit klaren Status und Zuständigkeiten."],
  ["GoBD, TSE, ZUGFeRD & DATEV", "/features/gobd-tse-zugferd-datev", "Unterstütze relevante Standards in Kasse und Buchhaltung."],
  ["B2B-Kundenportal & White-Label", "/features/b2b-kundenportal-white-label", "Biete Geschäftskunden einen digitalen Zugang in deinem Auftritt."],
  ["ERP für Autoteilehändler", "/features/erp-autoteilehandel", "Nutze ein ERP, das die Abläufe im Autoteilehandel versteht."],
  ["Warenwirtschaft für Autoteilehändler", "/features/warenwirtschaft-autoteilhandel", "Verbinde Einkauf, Bestand, Verkauf und Finanzen branchengerecht."],
  ["Blog", "/blog", "Praxiswissen zur Digitalisierung des Autoteilehandels."],
  ["Retourenquote im Autoteilehandel senken", "/blog/retourenquote-autoteilhandel-senken", "Praktische Ansätze für weniger Fehlbestellungen und Rückgaben."],
  ["WhatsApp-Bot für Autoteilehändler", "/blog/whatsapp-bot-fuer-autoteilhaendler", "So werden Chat-Anfragen zu vollständigen Verkaufsvorgängen."],
  ["OEM-Ermittlung aus VIN, HSN und TSN", "/blog/oem-ermittlung-aus-vin-hsn-tsn", "Fahrzeugdaten sauber auslesen und passende Teile schneller finden."],
  ["Warenwirtschaft: die Checkliste", "/blog/warenwirtschaft-autoteilhandel-checkliste", "Darauf kommt es bei Software für den Teilehandel an."],
  ["Branchenspezifisches ERP im Vergleich", "/blog/erp-vs-generisch-autoteilhandel", "Speziallösung oder Standard-ERP: die wichtigsten Unterschiede."],
  ["GoBD und TSE im Autohandel", "/blog/gobd-tse-kasse-autohandel", "Was Händler bei Kasse und Belegen beachten sollten."],
  ["Foto, Wareneingang und Retoure", "/blog/foto-wareneingang-retoure-lager-ki", "Wie Bilddaten Abläufe in Lager und Retoure vereinfachen."],
  ["B2B-Kundenportal aufbauen", "/blog/b2b-kundenportal-autoteilhandel-aufbauen", "Digitale Bestellwege für Werkstätten und Geschäftskunden."],
  ["E-Rechnung im Handel", "/blog/e-rechnungspflicht-zugferd-xrechnung-handel", "ZUGFeRD und XRechnung praxisnah eingeordnet."],
  ["Differenzbesteuerung bei Gebrauchtteilen", "/blog/differenzbesteuerung-25a-gebrauchtteile", "Wichtige Grundlagen für den Handel mit gebrauchten Teilen."],
  ["Impressum", "/legal/impressum", "Anbieterkennzeichnung und Kontaktinformationen."],
  ["Datenschutz", "/legal/datenschutz", "Informationen zur Verarbeitung personenbezogener Daten."],
  ["Allgemeine Geschäftsbedingungen", "/legal/agb", "Die Geschäftsbedingungen von Partsunion."],
  ["Widerruf", "/legal/widerruf", "Informationen zum Widerrufsrecht."],
  ["Beratung", "/termin", "Vereinbare ein persönliches Beratungsgespräch mit dem Partsunion Team."],
  ["WhatsApp-Bot", "/bot", "Verwandle Teileanfragen aus WhatsApp in strukturierte Vorgänge."],
  ["Retourenquote im Autoteilehandel senken", "/blog/retourenquote-autoteilehandel-senken", "Praktische Ansätze für weniger Fehlbestellungen und Rückgaben."],
].map(([label, href, description]) => ({ label, href, description }));

export const allRoutes = [...navGroups.flatMap((group) => [{ label: group.label, href: group.href, description: group.intro }, ...group.items]), ...extraRoutes]
  .filter((item, index, items) => items.findIndex((entry) => entry.href === item.href) === index);

export const industries: NavItem[] = [
  { label: "Fahrzeug & OE", href: "/loesungen/oe-ermittlung", description: "Fahrzeugschein, VIN und HSN/TSN direkt auswerten.", icon: SearchCheck },
  { label: "Angebot & Auftrag", href: "/loesungen/angebot-auftrag", description: "Vom passenden Teil ohne Umweg zum Auftrag.", icon: ReceiptText },
  { label: "Einkauf", href: "/loesungen/einkauf-disposition", description: "Beschaffung und Disposition transparent planen.", icon: ShoppingCart },
  { label: "Lager", href: "/loesungen/bestand-lager", description: "Bestände und Warenbewegungen jederzeit kennen.", icon: Warehouse },
  { label: "Buchhaltung", href: "/buchhaltung-banking", description: "Belege, Konten und Zahlungen sauber verbinden.", icon: FileCheck2 },
  { label: "Kasse", href: "/loesungen/finanzen-kasse", description: "Thekenverkauf und Bezahlung direkt abschließen.", icon: Calculator },
  { label: "Retouren", href: "/loesungen/retouren", description: "Rückgaben strukturiert und nachvollziehbar bearbeiten.", icon: RefreshCcw },
];

export const products: NavItem[] = [
  { label: "ERP & Warenwirtschaft", href: "/plattform", description: "Die zentrale Plattform für Verkauf, Einkauf, Lager und Finanzen.", icon: Boxes },
  { label: "WhatsApp-Bot", href: "/whatsapp-bot", description: "Teileanfragen automatisch erfassen, ergänzen und weiterverarbeiten.", icon: MessageCircle },
  { label: "Der Betriebsassistent", href: "/betriebsassistent", description: "Deine Abläufe als klare, geführte Schritte für das ganze Team.", icon: Bot },
];

export function routeByPath(path: string) { return allRoutes.find((route) => route.href === path) }
export function groupByPath(path: string) { return navGroups.find((group) => path === group.href) ?? navGroups.find((group) => group.items.some((item) => item.href === path)) }
