import type { Metadata } from 'next';
import { Breadcrumb, DemoLink, FAQ } from '@/components/marketing/Shared';
export const metadata: Metadata = {
  title: 'ERP für Autoteilehändler im Vergleich',
  description:
    'Vergleiche Branchen-ERP, allgemeine Warenwirtschaft und Tabellen anhand deiner Teilevorgänge. Eine konkrete Prüfliste für Funktionen, Daten und Einführung.',
  alternates: { canonical: 'https://partsunion.de/vergleich' },
  openGraph: {
    title: 'Welches System passt zu deinem Teilehandel?',
    description: 'Systemansätze anhand eigener Abläufe vergleichen.',
    url: 'https://partsunion.de/vergleich',
  },
};
const rows = [
  [
    'Fahrzeug- und OE-Bezug',
    'Im Teilemodell vorgesehen',
    'Branchenmodul oder Anpassung prüfen',
    'Manuell verknüpfte Angaben',
  ],
  [
    'Verkauf, Einkauf und Lager',
    'Gemeinsame Datenbasis',
    'Umfang der gewählten Module prüfen',
    'Getrennte Listen verbinden',
  ],
  [
    'Angebot bis Rechnung',
    'Referenzierte Belegkette',
    'Typische ERP-Funktion; Ablauf prüfen',
    'Bezüge selbst pflegen',
  ],
  [
    'Verfügbar und reserviert',
    'Getrennte Bestandszustände',
    'Lager- und Reservierungslogik prüfen',
    'Eigene Regeln erforderlich',
  ],
  [
    'Gebrauchte Teile',
    'Herkunft, Zustand und Fotos am Exemplar',
    'Seriennummern- oder Bestandsmodell für Gebrauchtteile prüfen',
    'Einzelne Datensätze selbst organisieren',
  ],
  [
    'Digitale Anfragekanäle',
    'Optional im Verkaufsprozess',
    'Schnittstellen und Übergabe prüfen',
    'Separate Kommunikation',
  ],
  [
    'Kassenanbindung und Exporte',
    'Vorbereitete Pfade; Einrichtung und Prüfung nötig',
    'Verfügbarkeit je Anbieter und Edition prüfen',
    'Zusätzliche Fachsoftware nötig',
  ],
  [
    'B2B-Kundenportal',
    'Nach Freischaltung und Einrichtung',
    'Portalumfang und Anbindung prüfen',
    'Zusätzliches System nötig',
  ],
  [
    'Einführung und Migration',
    'Nach Prozess- und Datenprüfung',
    'Projektumfang individuell klären',
    'Datenregeln selbst festlegen',
  ],
];
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
          <h2 style={{ marginBottom: 30 }}>Diese Punkte solltest du prüfen.</h2>
          <div
            className="mk-table"
            role="region"
            aria-label="Vergleich der Systemansätze, horizontal scrollbar"
            tabIndex={0}
          >
            <table>
              <caption className="sr-only">
                Orientierung zum Funktions- und Einführungsumfang; kein Test einzelner Anbieter.
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
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    {row.slice(1).map((cell, index) => (
                      <td key={index}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mk-small" style={{ marginTop: 20 }}>
            Die Tabelle dient als Prüfliste, nicht als Bewertung einzelner Anbieter. Der
            tatsächliche Umfang hängt von Edition, Anbindungen und Einrichtung ab. Auf kleinen
            Bildschirmen kannst du die Tabelle seitlich verschieben.
          </p>
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <p className="mk-kicker">Für ein aussagekräftiges Beratungsgespräch</p>
          <h2>Bring diese drei Fälle mit.</h2>
          <div className="mk-implementation">
            {[
              [
                'Eine schwierige Teileanfrage',
                'Ein Fahrzeug mit mehreren möglichen Ausführungen. Prüfe, ob fehlende Angaben und die fachliche Entscheidung nachvollziehbar bleiben.',
              ],
              [
                'Einen Auftrag mit Fehlmenge',
                'Ein Teil liegt im Lager, ein anderes muss beschafft werden. Verfolge Bestand, Reservierung und Bestellung bis zum Beleg.',
              ],
              [
                'Eine Rückgabe oder Reklamation',
                'Prüfe, ob Ursprungsbeleg, Zustand, Entscheidung und Bestandswirkung miteinander verbunden sind.',
              ],
            ].map(([title, text], index) => (
              <article key={title}>
                <span className="mk-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
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
