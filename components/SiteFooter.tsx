import Link from "next/link";
import { ArrowRight, ArrowUp, Download, Mail, MapPin, MonitorPlay } from "lucide-react";
import { Brand } from "@/components/Brand";

const footerGroups = [
  { title: "Plattform", links: [["Überblick", "/plattform"], ["Automatisierung", "/automatisierung-autoteilehandel"], ["Alle Funktionen", "/features"], ["Produktansichten", "/produktdaten"], ["Systemvergleich", "/vergleich"]] },
  { title: "Lösungen", links: [["OE-Ermittlung", "/loesungen/oe-ermittlung"], ["Angebot & Auftrag", "/loesungen/angebot-auftrag"], ["Einkauf & Disposition", "/loesungen/einkauf-disposition"], ["Bestand & Lager", "/loesungen/bestand-lager"], ["Finanzen & Kasse", "/loesungen/finanzen-kasse"], ["Retouren", "/loesungen/retouren"]] },
  { title: "Produkte", links: [["Neuteilehandel", "/plattform/neuteile"], ["Gebrauchtteilehandel", "/plattform/gebrauchtteile"], ["WhatsApp-Bot", "/whatsapp-bot"], ["Der Betriebsassistent", "/betriebsassistent"], ["Buchhaltung & Banking", "/buchhaltung-banking"], ["Händler-App", "/loesungen/haendler-app"]] },
  { title: "Einstieg", links: [["Einführung & Datenübernahme", "/einfuehrung"], ["Kosten & Umfang", "/pricing"], ["Beratung vereinbaren", "/beratung"], ["Live-Demo", "/live-demo"], ["Desktop-App", "/download"]] },
  { title: "Unternehmen", links: [["Über Partsunion", "/about"], ["Wissen & Ratgeber", "/blog"], ["Kontakt", "/contact"], ["Standards & Compliance", "/features/gobd-tse-zugferd-datev"], ["B2B-Kundenportal", "/features/b2b-kundenportal-white-label"]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-card">
        <div className="footer-rail"><span>PARTSUNION / AUTOTEILEHANDEL</span><div><i /> ANFRAGE <b /> OE <b /> VERKAUF <b /> LAGER <b /> FINANZEN</div></div>
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="wordmark"><Brand /></Link>
            <h2>Ein Arbeitsplatz für deinen gesamten Teilehandel.</h2>
            <p>Verkauf, Einkauf, Lager, Kasse und Buchhaltung in einem verbundenen System.</p>
            <Link className="button button-light" href="/beratung">Beratung vereinbaren <ArrowRight /></Link>
          </div>
          <nav className="footer-links footer-links-desktop" aria-label="Footernavigation">{footerGroups.map((group) => <section key={group.title}><span>{group.title}</span><div>{group.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div></section>)}</nav>
          <nav className="footer-links footer-links-mobile" aria-label="Mobile Footernavigation">{footerGroups.map((group) => <details key={group.title}><summary>{group.title}</summary><div>{group.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div></details>)}</nav>
          <aside className="footer-contact" aria-label="Kontakt und Schnellzugriff"><span>DIREKTER KONTAKT</span><a href="mailto:info@partsunion.de"><Mail /> <div><small>E-Mail</small><strong>info@partsunion.de</strong></div></a><div><MapPin /><div><small>Standort</small><strong>Brühl, Deutschland</strong></div></div><Link href="/live-demo"><MonitorPlay /><div><small>Produkt kennenlernen</small><strong>Live-Demo ansehen</strong></div></Link><Link href="/download"><Download /><div><small>Für den Arbeitsplatz</small><strong>Desktop-App laden</strong></div></Link></aside>
        </div>
        <a href="#top" className="back-top" aria-label="Nach oben"><ArrowUp size={18} /></a>
        <div className="footer-legal">
          <span>© 2026 PartsUnion UG (haftungsbeschränkt) · Brühl</span>
          <div><Link href="/legal/datenschutz">Datenschutz</Link><Link href="/legal/impressum">Impressum</Link><Link href="/legal/agb">AGB</Link><Link href="/legal/widerruf">Widerruf</Link><a href="mailto:info@partsunion.de">info@partsunion.de</a></div>
        </div>
      </div>
    </footer>
  );
}
