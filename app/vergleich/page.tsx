import type { Metadata } from 'next';
import { Check, X } from 'lucide-react';
import { Breadcrumb, DemoLink, FAQ } from '@/components/marketing/Shared';
export const metadata: Metadata = {
  title: 'ERP für Autoteilehändler im Vergleich',
  description:
    'Vergleiche Partsunion, allgemeine ERP-Warenwirtschaft und Tabellen für den Autoteilehandel anhand klarer Haken und Kreuze bei wichtigen Funktionen.',
  alternates: { canonical: 'https://partsunion.de/vergleich' },
  openGraph: {
    title: 'Welches System passt zu deinem Teilehandel?',
    description: 'Systemansätze anhand eigener Abläufe vergleichen.',
    url: 'https://partsunion.de/vergleich',
  },
};
type ComparisonCell = { available: boolean; label: string };

const yes = (label: string): ComparisonCell => ({ available: true, label });
const no = (label: string): ComparisonCell => ({ available: false, label });

const rows: Array<{
  criterion: string;
  partsunion: ComparisonCell;
  genericErp: ComparisonCell;
  spreadsheets: ComparisonCell;
}> = [
  {
    criterion: 'Automatische OE-Ermittlung',
    partsunion: yes('Direkt integriert'),
    genericErp: no('Branchenlösung nötig'),
    spreadsheets: no('Nur manuell'),
  },
  {
    criterion: 'WhatsApp bis Angebot und Zahlung',
    partsunion: yes('Durchgängiger Ablauf'),
    genericErp: no('Zusatzlösungen nötig'),
    spreadsheets: no('Nicht automatisiert'),
  },
  {
    criterion: 'Verkauf, Einkauf und Lager verbunden',
    partsunion: yes('Gemeinsame Datenbasis'),
    genericErp: yes('Je nach Modulumfang'),
    spreadsheets: no('Listen bleiben getrennt'),
  },
  {
    criterion: 'Angebot bis Rechnung',
    partsunion: yes('Verbundene Belegkette'),
    genericErp: yes('Typische ERP-Funktion'),
    spreadsheets: no('Bezüge manuell pflegen'),
  },
  {
    criterion: 'Bestand, Reservierung und Beschaffung',
    partsunion: yes('Automatisch verbunden'),
    genericErp: yes('Je nach Lagerlogik'),
    spreadsheets: no('Eigene Regeln nötig'),
  },
  {
    criterion: 'Gebrauchtteile mit Herkunft und Zustand',
    partsunion: yes('Am konkreten Gebrauchtteil'),
    genericErp: no('Sondermodell nötig'),
    spreadsheets: no('Manuell organisiert'),
  },
  {
    criterion: 'Dynamische Maskenöffnung und Betriebsassistent',
    partsunion: yes('Im Arbeitsablauf integriert'),
    genericErp: no('Nicht branchenspezifisch'),
    spreadsheets: no('Nicht verfügbar'),
  },
  {
    criterion: 'Retouren und Reklamationen',
    partsunion: yes('Mit Ursprungsbeleg verbunden'),
    genericErp: yes('Je nach Modulumfang'),
    spreadsheets: no('Manuelle Nachverfolgung'),
  },
  {
    criterion: 'Kasse, Banking und Buchhaltung',
    partsunion: yes('Im Geschäftsvorgang verbunden'),
    genericErp: yes('Je nach Edition und Anbindung'),
    spreadsheets: no('Weitere Systeme nötig'),
  },
];

function StatusCell({ cell }: { cell: ComparisonCell }) {
  const Icon = cell.available ? Check : X;
  return (
    <span className={`mk-status ${cell.available ? 'mk-status-yes' : 'mk-status-no'}`}>
      <Icon aria-hidden="true" />
      <span className="sr-only">{cell.available ? 'Ja: ' : 'Nein: '}</span>
      <span>{cell.label}</span>
    </span>
  );
}
export default function VergleichPage() {
  return (
    <div className="mk">
      <section className="mk-page-hero">
        <div className="mk-wrap">
          <Breadcrumb items={[{ label: 'Systeme vergleichen' }]} />
          <p className="mk-kicker">Eine Entscheidung für deinen Betrieb</p>
          <h1>
            Welches System passt
            <br />
            zu deinem Teilehandel?
          </h1>
          <p className="mk-copy">
            Vergleiche mit deinen eigenen Arbeitsabläufen. Wichtig ist, welche Daten und Schritte
            bereits zusammengehören und was du durch zusätzliche Module, Schnittstellen oder eigene
            Regeln verbinden musst.
          </p>
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap">
          <p className="mk-kicker">Drei Ansätze im Überblick</p>
          <h2 style={{ marginBottom: 30 }}>Was ist direkt im System verbunden?</h2>
          <div
            className="mk-table"
            role="region"
            aria-label="Vergleich der Systemansätze, horizontal scrollbar"
            tabIndex={0}
          >
            <table>
              <caption className="sr-only">
                Vergleich direkt verbundener Funktionen in Partsunion, allgemeinem ERP und
                Tabellen.
              </caption>
              <thead>
                <tr>
                  {['Prüfpunkt', 'Partsunion', 'Allgemeines ERP / WaWi', 'Tabellen'].map(
                    (title) => (
                      <th scope="col" key={title}>
                        {title}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.criterion}>
                    <th scope="row">{row.criterion}</th>
                    <td><StatusCell cell={row.partsunion} /></td>
                    <td><StatusCell cell={row.genericErp} /></td>
                    <td><StatusCell cell={row.spreadsheets} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mk-small" style={{ marginTop: 20 }}>
            Ein Haken zeigt eine direkt verfügbare oder typische Systemfunktion. Ein Kreuz zeigt,
            dass dafür üblicherweise eine zusätzliche Branchenlösung oder manuelle Arbeit nötig
            ist. Der konkrete Umfang eines allgemeinen ERP hängt von Edition und Einrichtung ab.
            Auf kleinen Bildschirmen kannst du die Tabelle seitlich verschieben.
          </p>
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap mk-faq-layout">
          <div>
            <p className="mk-kicker">Die passende Wahl treffen</p>
            <h2>
              Dein Bedarf
              <br />
              gibt die Richtung vor.
            </h2>
            <div className="mk-actions">
              <DemoLink />
            </div>
          </div>
          <FAQ
            items={[
              {
                question: 'Wann lohnt sich ein branchenspezifisches System?',
                answer:
                  'Wenn Fahrzeug- und OE-Bezug, unterschiedliche Teileausführungen und die Bestandslogik für Neu- oder Gebrauchtteile regelmäßig wichtig sind. Prüfe anhand eigener Vorgänge, welchen Anpassungsaufwand ein bereits passendes Datenmodell ersparen kann.',
              },
              {
                question: 'Wann kommt eine allgemeine Warenwirtschaft infrage?',
                answer:
                  'Wenn sie deine benötigten Abläufe bereits mit der gewählten Konfiguration oder vorhandenen Erweiterungen abdeckt. Bestehende Schnittstellen, Erfahrung im Team und Einführungsaufwand gehören ebenso in den Vergleich wie die Funktionen.',
              },
              {
                question: 'Ist Partsunion für jeden Betrieb die beste Lösung?',
                answer:
                  'Kein System passt automatisch zu jedem Betrieb. Im Beratungsgespräch prüfen wir deinen Fahrzeug- und Teilebezug, die benötigten Funktionen und Anbindungen sowie die Datenübernahme. Danach kannst du die passende Lösung anhand eines konkreten Angebots vergleichen.',
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
