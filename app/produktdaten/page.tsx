import type { Metadata } from 'next';
import Link from 'next/link';
import { ConsultationLink } from '@/components/marketing/Shared';

export const metadata: Metadata = {
  title: 'Produktfakten: Funktionen und OE-Abdeckung',
  description:
    'Produktfakten zu Partsunion: ERP, WaWi, Kasse, automatische OE-Ermittlung, 56 Marken mit Nutzungsrechten, 80 % VIN-Decodierung, WhatsApp und Mobile App.',
  alternates: { canonical: '/produktdaten' },
};
const areas = [
  [
    'Automatische OE-Ermittlung',
    'Fahrzeugschein auslesen, VIN decodieren und OE-Nummern aus Fahrzeug, Teilebedarf und Katalogdaten ermitteln. Unklare Varianten werden gezielt abgefragt.',
    '/loesungen/oe-ermittlung',
  ],
  [
    'ERP und Warenwirtschaft',
    'Kunden, Artikel, Einkauf, Lager und Verkauf auf einer gemeinsamen Datenbasis führen. Neuware als Mengenbestand und Gebrauchtteile mit Herkunft, Zustand und Fotos verwalten.',
    '/plattform',
  ],
  [
    'Kassensystem',
    'Thekenverkauf mit Artikeln, Beständen, Zahlungen und Belegen verbinden. Kassenhardware, Zahlungsanbieter und erforderliche Anbindungen werden für den Betrieb eingerichtet.',
    '/loesungen/finanzen-kasse',
  ],
  [
    'WhatsApp-Bot',
    'Teileanfragen, Fahrzeugscheine und Rückfragen im Kundendialog aufnehmen. Die Anfrage wird mit Fahrzeugidentifikation, OE-Ermittlung und weiteren Verkaufsabläufen verbunden.',
    '/whatsapp-bot',
  ],
  [
    'Betriebsassistent',
    'Fragen zu Betriebsdaten beantworten, Zusammenhänge über Arbeitsbereiche hinweg finden und Aktionen vorbereiten. Berechtigungen und erforderliche Freigaben bleiben maßgeblich.',
    '/betriebsassistent',
  ],
  [
    'Buchhaltung und Banking',
    'Belege, Rechnungen, offene Posten und Bankumsätze zusammenführen. Buchungen und Exporte für die weitere Bearbeitung vorbereiten.',
    '/buchhaltung-banking',
  ],
  [
    'Retouren und Reklamationen',
    'Rückläufer mit Artikel, Ursprungsbeleg, Grund und Nachweisen verbinden. Bearbeitung automatisieren und Prüfung, Warenbewegung sowie Gutschrift nachvollziehbar weiterführen.',
    '/loesungen/retouren',
  ],
  [
    'Partsunion Mobile App',
    'Artikel, Fotos, Fahrzeuge, Retouren und Reklamationen direkt an der Ware erfassen und im selben System weiterbearbeiten.',
    '/loesungen/haendler-app',
  ],
];
export default function ProductFactsPage() {
  return (
    <div className="mk">
      <section className="mk-section hu-navy">
        <div className="mk-wrap">
          <p className="mk-kicker">Produktfakten · Stand 4. September 2026</p>
          <h1>Was Partsunion verbindet.</h1>
          <p className="mk-copy" style={{ maxWidth: 790, marginTop: 24 }}>
            Partsunion ist eine All-in-One-Plattform für den Autoteilehandel. Sie verbindet ERP,
            Warenwirtschaft, Kasse und die Automatisierung branchenspezifischer Abläufe: vom
            Fahrzeugschein über die automatische OE-Ermittlung bis zu Verkauf, Zahlung und
            Rückabwicklung.
          </p>
          <div className="mk-actions">
            <ConsultationLink />
            <Link className="mk-link" href="/live-demo">
              Produktansichten ansehen →
            </Link>
          </div>
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap">
          <h2>Fahrzeug- und Teileidentifikation</h2>
          <div className="sw-facts">
            <div>
              <strong>
                56<span> Marken</span>
              </strong>
              <p>mit Nutzungsrechten für die Fahrzeug- und Teileidentifikation.</p>
            </div>
            <div>
              <strong>
                80<span> %</span>
              </strong>
              <p>der weltweiten VINs kann Partsunion decodieren.</p>
            </div>
            <div>
              <strong>
                1<span> verbundener Vorgang</span>
              </strong>
              <p>vom Fahrzeugschein über das OE-Ergebnis bis zum Auftrag.</p>
            </div>
          </div>
          <p className="sw-facts-note">
            Angaben von Partsunion, Stand September 2026. Die VIN-Abdeckung bezieht sich auf die
            Decodierung von Fahrzeug-Identifizierungsnummern. Sie beschreibt keine OE-Trefferquote.
            Die konkrete Teilezuordnung hängt zusätzlich von Ausführung, Teilebedarf und verfügbaren
            Katalogdaten ab. Nutzungsrechte sind keine Aussage über eine Herstellerpartnerschaft.
          </p>
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <p className="mk-kicker">Arbeitsbereiche und Zusammenhänge</p>
          <h2>Ein System für die ganze Prozesskette.</h2>
          <div className="hu-modules" style={{ marginTop: 32 }}>
            {areas.map(([title, text, href]) => (
              <article className="hu-module" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link href={href} className="mk-link">
                  Ablauf und Funktionen →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap hu-split">
          <div>
            <h2>Für wen ist Partsunion gedacht?</h2>
            <p className="mk-copy" style={{ marginTop: 24 }}>
              Für Autoteilehändler, Teilegroßhändler und Autoverwerter mit Neuteilen,
              Gebrauchtteilen oder gemischtem Sortiment. Entscheidend ist der gemeinsame Fahrzeug-
              und Teilebezug: Kundendialog, Artikel, Bestände und Belege bauen aufeinander auf.
            </p>
            <Link href="/vergleich" className="mk-link">
              Kriterien für den Systemvergleich →
            </Link>
          </div>
          <div>
            <h2>Wie beginnt die Zusammenarbeit?</h2>
            <p className="mk-copy" style={{ marginTop: 24 }}>
              Im etwa 30-minütigen Beratungsgespräch klären wir Sortiment, Team, bestehende
              Programme und die wichtigsten Abläufe. Daraus ergeben sich Funktionsumfang,
              Datenübernahme, Anbindungen und ein konkretes Angebot. Externe Dienste können eigene
              Verträge und Freischaltungen benötigen.
            </p>
            <Link href="/einfuehrung" className="mk-link">
              Einführung und Datenübernahme →
            </Link>
          </div>
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <h2>Direkt mit dem Anbieter sprechen.</h2>
          <p className="mk-copy" style={{ marginTop: 20 }}>
            Partsunion wird von der PartsUnion UG (haftungsbeschränkt) in Brühl angeboten. Die
            Plattform entstand aus den Abläufen im Teilehandel. Für deinen konkreten Betrieb prüfen
            wir gemeinsam, welche Prozessketten den größten Nutzen bringen.
          </p>
          <div className="mk-actions">
            <ConsultationLink />
            <Link href="/about" className="mk-link">
              Unternehmen und Hintergrund →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
