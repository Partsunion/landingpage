import Link from "next/link";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { EditorialVisual } from "@/components/EditorialVisual";
import type { ProductShotVariant } from "@/components/ProductShot";

const entries = [
  ["RETOUREN", "Retourenquote im Autoteilehandel senken", "Fehlbestellungen vermeiden und Rückgaben mit klaren Prozessen schneller bearbeiten.", "/blog/retourenquote-autoteilhandel-senken"],
  ["WHATSAPP", "WhatsApp-Bot für Autoteilehändler", "Fahrzeugschein, Bilder und Teilewunsch automatisch in eine vollständige Anfrage verwandeln.", "/blog/whatsapp-bot-fuer-autoteilhaendler"],
  ["OE-ERMITTLUNG", "OEM-Ermittlung aus VIN, HSN und TSN", "Fahrzeugdaten zuverlässig auswerten und die passende OE-Nummer schneller finden.", "/blog/oem-ermittlung-aus-vin-hsn-tsn"],
  ["WARENWIRTSCHAFT", "Warenwirtschaft für den Teilehandel: die Checkliste", "Die wichtigsten Funktionen für Einkauf, Bestand, Verkauf, Kasse und Verwaltung.", "/blog/warenwirtschaft-autoteilhandel-checkliste"],
  ["ERP", "Branchenspezifisches ERP oder Standardlösung?", "Warum Prozesse und Datenmodelle des Autoteilehandels besondere Anforderungen stellen.", "/blog/erp-vs-generisch-autoteilhandel"],
  ["KASSE", "GoBD und TSE im Autohandel", "Kassenabläufe, Nachvollziehbarkeit und Belege praxisnah zusammengedacht.", "/blog/gobd-tse-kasse-autohandel"],
  ["LAGER", "Foto, Wareneingang und Retoure", "Wie Bilddaten und Automatisierung Vorgänge im Lager verständlicher machen.", "/blog/foto-wareneingang-retoure-lager-ki"],
  ["B2B", "Ein Kundenportal für den Autoteilehandel aufbauen", "Werkstätten und Geschäftskunden einen schnellen digitalen Bestellweg bieten.", "/blog/b2b-kundenportal-autoteilhandel-aufbauen"],
  ["E-RECHNUNG", "ZUGFeRD und XRechnung im Handel", "Was die E-Rechnung für Prozesse, Belege und Buchhaltung bedeutet.", "/blog/e-rechnungspflicht-zugferd-xrechnung-handel"],
  ["GEBRAUCHTTEILE", "Differenzbesteuerung bei Gebrauchtteilen", "Grundlagen für Einkauf, Verkauf und Belege im Handel mit gebrauchten Autoteilen.", "/blog/differenzbesteuerung-25a-gebrauchtteile"],
];

export function ContentHubPage({ type }: { type: "resources" | "blog" | "stories" }) {
  return <>
    <section className="hub-heading container"><p className="eyebrow">{type === "blog" ? "WISSEN FÜR DEINEN BETRIEB" : "PARTSUNION PRAXISWISSEN"}</p><h1>Praxiswissen für den Autoteilehandel</h1><p>Konkrete Impulse zu Teileidentifikation, Warenwirtschaft, Automatisierung und rechtssicheren Abläufen.</p></section>
    <section className="hub-toolbar container"><button>Filtern nach <ChevronDown /></button><form><Search /><input aria-label="Inhalte suchen" placeholder="Thema suchen" /><button type="submit">Suchen</button></form></section>
    <section className="hub-layout container">
      <aside><h2>Filtern nach</h2>{["Betriebsart", "Prozess", "Thema", "Format"].map((filter, index) => <details open={index < 2} key={filter}><summary>{filter}<ChevronDown /></summary>{["Neuteile", "Gebrauchtteile", "OE-Ermittlung", "Lager", "Kasse & Finanzen"].map((option, i) => <label key={option}><input type="checkbox" /> <span>{option}</span><small>({3 + i * 2})</small></label>)}</details>)}</aside>
      <div className="hub-results"><p>{entries.length} ausgewählte Beiträge werden angezeigt</p><div>{entries.map(([category, heading, copy, href], index) => <Link href={href} key={heading}><EditorialVisual variant={(["oe", "whatsapp", "inventory", "order", "finance"] as ProductShotVariant[])[index % 5]} index={index} /><div><span>{category}</span><h2>{heading}</h2><p>{copy}</p><strong>Beitrag lesen <ArrowRight /></strong></div></Link>)}</div></div>
    </section>
    <section className="section contact-section contact-section-home container"><div className="contact-heading"><h2>Wie sieht dein Teilehandel aus?</h2><p>Wir zeigen dir persönlich, wie Partsunion zu deinen Prozessen passt.</p></div><ContactForm compact /></section>
  </>;
}
