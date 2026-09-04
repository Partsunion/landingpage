import type { Metadata } from 'next';
import { Breadcrumb, DemoLink, FAQ, homeFaqs, Implementation } from '@/components/marketing/Shared';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { RoiCalculator } from './RoiCalculator';
export const metadata: Metadata = {
  title: 'Kosten und Einführung für deinen Teilehandel',
  description:
    'Was kostet Partsunion? Erfahre, wovon Lizenz, Einrichtung und Datenübernahme abhängen und wie wir die Einführung in deinem Teilehandel gemeinsam planen.',
  alternates: { canonical: 'https://partsunion.de/pricing' },
  openGraph: {
    title: 'Partsunion: Kosten und Einführung',
    description: 'Funktionsumfang, Anbindungen und Datenübernahme vor dem Start klären.',
    url: 'https://partsunion.de/pricing',
  },
};
export default function PricingPage() {
  return (
    <div className="mk">
      <section className="mk-page-hero">
        <div className="mk-wrap">
          <Breadcrumb items={[{ label: 'Kosten & Einführung' }]} />
          <p className="mk-kicker">Eine klare Grundlage für deine Entscheidung</p>
          <h1>
            Erst deinen Bedarf klären.
            <br />
            Dann die Kosten.
          </h1>
          <p className="mk-copy">
            Der Preis für Partsunion richtet sich nach dem vereinbarten Umfang. Wir klären mit dir,
            welche Arbeitsbereiche, Nutzer und Anbindungen du brauchst. Danach erhältst du ein
            konkretes Angebot.
          </p>
          <div className="mk-actions">
            <DemoLink label="Beratungsgespräch vereinbaren" />
          </div>
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap">
          <p className="mk-kicker">Was in dein Angebot gehört</p>
          <h2 style={{ maxWidth: 800 }}>
            Laufende und einmalige Kosten.
            <br />
            Sauber auseinandergehalten.
          </h2>
          <div className="mk-implementation">
            {[
              [
                'Software & Nutzung',
                'Welche Arbeitsbereiche möchtest du nutzen? Wie viele Personen arbeiten damit? Daraus ergibt sich der laufende Softwareumfang.',
              ],
              [
                'Einrichtung & Datenübernahme',
                'Kunden, Artikel und Bestände müssen geprüft und übernommen werden. Dazu kommen Einrichtung, Schulung und der abgestimmte Start.',
              ],
              [
                'Anbindungen & Fremdkosten',
                'Kataloge, Lieferanten, Zahlungsdienste oder Verkaufskanäle können eigene Verträge und Gebühren benötigen. Diese klären wir gesondert.',
              ],
            ].map(([title, text], i) => (
              <article key={title}>
                <span className="mk-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="mk-callout">
            <h3>Damit du Angebote sinnvoll vergleichen kannst</h3>
            <p>
              Vergleiche neben der Lizenz auch Nutzerumfang, Datenmigration, Schulung, Support,
              Schnittstellen, Vertragslaufzeit und mögliche Fremdkosten. Für deinen Betrieb halten
              wir den vereinbarten Leistungsumfang und die Konditionen im Angebot fest.
            </p>
          </div>
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <p className="mk-kicker">Der Weg in den Betrieb</p>
          <h2>
            Eine Einführung in
            <br />
            überschaubaren Schritten.
          </h2>
          <Implementation />
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap mk-detail-grid">
          <div>
            <p className="mk-kicker">Optional: selbst überschlagen</p>
            <h2>
              Wie viel Aufwand steckt
              <br />
              in deinem heutigen Ablauf?
            </h2>
            <p className="mk-copy" style={{ marginTop: 24 }}>
              Vergleiche einen heutigen Arbeitsschritt mit deinem eigenen Zielszenario. Der Rechner
              zeigt den rechnerischen Zeitwert deiner Annahmen. Er ist keine Preisangabe oder Zusage
              einer Einsparung.
            </p>
          </div>
          <RoiCalculator />
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap mk-faq-layout">
          <div>
            <p className="mk-kicker">Vor dem Start</p>
            <h2>
              Häufige Fragen
              <br />
              zur Einführung.
            </h2>
          </div>
          <FAQ items={homeFaqs.filter((_, i) => [1, 2, 3, 4].includes(i))} />
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
