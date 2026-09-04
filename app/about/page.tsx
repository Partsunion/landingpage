import type { Metadata } from 'next';
import { Layers3 } from 'lucide-react';
import { Breadcrumb, DemoLink } from '@/components/marketing/Shared';
import { FinalCTA } from '@/components/landing/FinalCTA';
export const metadata: Metadata = {
  title: 'Über Partsunion – aus dem Teilehandel für den Teilehandel',
  description:
    'Warum wir Partsunion bauen: Mitgründer Elias kennt den Teilehandel aus eigener Erfahrung. Daraus entsteht Software für gemeinsame Abläufe in Theke, Lager und Büro.',
  alternates: { canonical: 'https://partsunion.de/about' },
  openGraph: {
    title: 'Die Geschichte hinter Partsunion',
    description:
      'Branchensoftware aus der Praxis des Teilehandels. Partsunion aus Brühl kennenlernen.',
    url: 'https://partsunion.de/about',
  },
};
export default function AboutPage() {
  return (
    <div className="mk">
      <section className="mk-page-hero">
        <div className="mk-wrap">
          <Breadcrumb items={[{ label: 'Über uns' }]} />
          <p className="mk-kicker">Partsunion · Brühl, Deutschland</p>
          <h1>
            Wir kennen das Problem
            <br />
            von der anderen Seite
            <br />
            der Theke.
          </h1>
          <p className="mk-copy">
            Partsunion entstand aus der Erfahrung im eigenen Teilehandel. Unser Ziel: Software, die
            die Arbeit an einem Vorgang zusammenhält – von der ersten Frage bis zum letzten Beleg.
          </p>
          <div className="mk-actions">
            <DemoLink label="Partsunion persönlich kennenlernen" />
          </div>
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap mk-detail-grid">
          <div>
            <p className="mk-kicker">Die Gründungsgeschichte</p>
            <h2>
              Ein Alltag mit zu
              <br />
              vielen Übergaben.
            </h2>
          </div>
          <div className="mk-prose">
            <p>
              Mitgründer Elias führte selbst einen Teilehandel. Anfragen kamen an der Theke oder
              über Nachrichten an. Fahrzeugdaten, Katalogsuche, Bestände und Belege lagen in
              getrennten Werkzeugen.
            </p>
            <p>
              Ein fachlich geklärter Fall musste im nächsten Programm oft noch einmal erfasst
              werden. Bei der Übergabe an Lager oder Büro fehlte der Zusammenhang: Welches Fahrzeug?
              Welche Ausführung? Was wurde dem Kunden zugesagt?
            </p>
            <p>
              Aus dieser Erfahrung entstand Partsunion. Wir verbinden Kunden, Fahrzeuge, Artikel und
              Belege so, dass der nächste Arbeitsschritt auf dem bisherigen Stand aufbaut.
            </p>
          </div>
        </div>
      </section>
      <section className="mk-section mk-ink">
        <div className="mk-wrap mk-founder">
          <div className="mk-founder-mark">
            <span>
              PartsUnion UG (haftungsbeschränkt)
              <br />
              Zum Sommersberg 27 · 50321 Brühl
            </span>
            <Layers3 aria-hidden="true" />
            <strong>
              Nah am Betrieb.
              <br />
              Klar im Anspruch.
            </strong>
          </div>
          <div>
            <p className="mk-kicker">Wie wir das Produkt denken</p>
            <h2>
              Zusammenhänge erhalten.
              <br />
              Entscheidungen nachvollziehbar machen.
            </h2>
            <p className="mk-copy">
              Eine Software für den Teilehandel muss zwischen Fahrzeugen, Ausführungen,
              Mengenartikeln und Gebrauchtteilen unterscheiden können. Sie soll Arbeit vorbereiten und
              Informationen zusammenführen. Wo fachliche Prüfung nötig ist, muss der Klärbedarf
              sichtbar bleiben.
            </p>
          </div>
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap">
          <p className="mk-kicker">Daran orientieren wir uns</p>
          <h2>Der Ablauf entscheidet.</h2>
          <div className="mk-implementation">
            {[
              [
                'Praxis vor Funktionsliste',
                'Wir betrachten komplette Vorgänge: Was kommt an, welche Prüfung ist nötig, wer arbeitet weiter und welcher Beleg entsteht?',
              ],
              [
                'Klarheit vor einer schnellen Zusage',
                'Im Beratungsgespräch klären wir, welche Funktionen und Anbindungen zu deinem Betrieb passen. Der vereinbarte Umfang gehört ins Angebot.',
              ],
              [
                'Einführung mit deinem Team',
                'Der Start braucht passende Daten, verständliche Zuständigkeiten und eingeübte Abläufe. Das berücksichtigen wir im Einführungsplan.',
              ],
            ].map(([title, text], i) => (
              <article key={title}>
                <span className="mk-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
