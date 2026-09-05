import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
const groups = [
  {
    title: 'Die Plattform',
    links: [
      ['Plattform im Überblick', '/plattform'],
      ['Automatisierung im Autoteilehandel', '/automatisierung-autoteilehandel'],
      ['Automatische OE-Ermittlung', '/loesungen/oe-ermittlung'],
      ['Kassensystem', '/loesungen/finanzen-kasse'],
      ['Retouren & Reklamationen', '/loesungen/retouren'],
      ['Partsunion Mobile App', '/loesungen/haendler-app'],
      ['WhatsApp-Bot', '/whatsapp-bot'],
      ['Betriebsassistent', '/betriebsassistent'],
      ['Buchhaltung & Banking', '/buchhaltung-banking'],
      ['Alle Funktionen', '/features'],
      ['Alle Lösungen', '/loesungen'],
      ['Produktansichten', '/live-demo'],
    ],
  },
  {
    title: 'Für deinen Betrieb',
    links: [
      ['Neuteilehandel', '/plattform/neuteile'],
      ['Gebrauchtteilehandel', '/plattform/gebrauchtteile'],
      ['Einführung & Datenübernahme', '/einfuehrung'],
      ['Kosten & Umfang', '/pricing'],
      ['Beratung vereinbaren', '/beratung'],
      ['Zum Kundenlogin', 'https://app.partsunion.de'],
    ],
  },
  {
    title: 'Partsunion kennenlernen',
    links: [
      ['Über uns', '/about'],
      ['Produktfakten & Abdeckung', '/produktdaten'],
      ['Praxisratgeber', '/blog'],
      ['Systeme vergleichen', '/vergleich'],
      ['Kontakt', '/contact'],
      ['info@partsunion.de', 'mailto:info@partsunion.de'],
    ],
  },
];
export function HomepageFooter() {
  return (
    <footer className="mk-footer mm-footer">
      <div className="mk-wrap">
        <div className="mk-footer-grid">
          <div className="mk-footer-brand">
            <Link href="/" className="mk-brand" aria-label="Partsunion Startseite">
              <Image src="/favicon.png" width={32} height={32} alt="" />
              partsunion
            </Link>
            <p>
              ERP, Warenwirtschaft, Kasse und automatische OE-Ermittlung für deinen Teilehandel.
              Damit aus einzelnen Vorgängen ein gemeinsamer Arbeitsablauf wird.
            </p>
            <Link href="/beratung" className="mm-footer-cta" data-track="Consultation CTA">
              Beratung vereinbaren <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              <div className="mk-footer-links">
                {group.links.map(([label, href]) => (
                  <Link href={href} key={href}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mk-footer-bottom">
          <span>© {new Date().getFullYear()} PartsUnion UG (haftungsbeschränkt) · Brühl</span>
          <div>
            {[
              ['Impressum', 'impressum'],
              ['Datenschutz', 'datenschutz'],
              ['AGB', 'agb'],
              ['Widerruf', 'widerruf'],
            ].map(([label, slug]) => (
              <Link key={slug} href={`/legal/${slug}`}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
