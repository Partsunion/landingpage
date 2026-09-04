import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductPreview } from '@/components/marketing/ProductPreview';
import { Breadcrumb, DemoLink, FAQ, Implementation } from '@/components/marketing/Shared';
import { FinalCTA } from '@/components/landing/FinalCTA';
const content = {
  new: {
    label: 'Neuteilehandel',
    title: 'Warenwirtschaft für deinen Neuteilehandel.',
    intro:
      'Vom passenden Teil zum vollständigen Auftrag: Verbinde Fahrzeugdaten, Teileprüfung, Verkauf, Einkauf und Lager in einem System. Für die Theke, das Lager und das Büro.',
    screenshot: 'verkauf-auftrag' as const,
    imageText: 'Aufträge, Fehlmengen und Belege in einer gemeinsamen Ansicht.',
    heading: 'Ein Teilebedarf wird zum klaren Auftrag.',
    steps: [
      [
        'Fahrzeug und Teilebedarf klären',
        'VIN, HSN/TSN, OE-Bezug und Kundenwunsch bilden die Grundlage. Fehlende Angaben werden vor der Auswahl geklärt.',
      ],
      [
        'Bestand und Beschaffung prüfen',
        'Verfügbare Mengen, Reservierungen und offener Bedarf bleiben unterscheidbar. Die Beschaffung knüpft an den Kundenauftrag an.',
      ],
      [
        'Anbieten, liefern und abrechnen',
        'Die geprüften Angaben gehen in Angebot, Auftrag und Rechnung weiter. Der Verlauf bleibt für das Team nachvollziehbar.',
      ],
    ],
    benefits: [
      [
        'Teileidentifikation mit Fahrzeugbezug',
        'Verbinde Anfrage, Fahrzeug und Katalogergebnis. Fachliche Unsicherheiten bleiben sichtbar, bis sie geklärt sind.',
      ],
      [
        'Ein Bestand für dein Team',
        'Lagerort, Mengen, Reservierungen und Warenbewegungen stehen in derselben Warenwirtschaft.',
      ],
      [
        'Bestellungen mit Herkunft',
        'Bestellvorschläge beziehen sich auf konkrete Fehlmengen oder Bestandsregeln. Vor der Auslösung wird geprüft.',
      ],
      [
        'Durchgängige Belege',
        'Angebot, Auftrag, Lieferung und Rechnung gehören zu einem gemeinsamen Geschäftsvorgang.',
      ],
    ],
    links: ['oe-ermittlung', 'einkauf-disposition', 'angebot-auftrag'],
    faq: {
      question: 'Können wir unsere Lieferanten weiter nutzen?',
      answer:
        'Wir prüfen deine Lieferanten und die verfügbaren Schnittstellen vor der Einrichtung. Bestellabwicklung und automatische Übermittlung hängen von der jeweiligen Anbindung ab. Welche Schritte in deinem Betrieb möglich sind, halten wir im Einführungsumfang fest.',
    },
  },
  used: {
    label: 'Gebrauchtteilehandel',
    title: 'Jedes Gebrauchtteil hat seine eigene Geschichte.',
    intro:
      'Warenwirtschaft für Autoverwerter und Gebrauchtteilehändler: Erfasse Herkunft, Zustand, Fotos und Lagerort am Gebrauchtteil. So bleiben Teil, Inserat, Verkauf und Rechnung miteinander verbunden.',
    screenshot: 'gebrauchtteile-bestand' as const,
    imageText:
      'Gebrauchtteile mit Herkunft, Zustand, Lagerplatz und eigener Artikelakte im Partsunion-Demosystem.',
    heading: 'Vom ausgebauten Teil zum verkaufbaren Gebrauchtteil.',
    steps: [
      [
        'Das konkrete Teil erfassen',
        'Spenderfahrzeug, Teilenummer, Zustand und Fotos gehören zu einer eindeutigen Artikel-ID.',
      ],
      [
        'Einlagern und Angebot vorbereiten',
        'Hinterlege den Lagerort, prüfe Vergleichsangebote und lege deinen Preis fest. Artikeldaten und Bilder bilden die Grundlage für ein Inserat.',
      ],
      [
        'Verkaufen und nachvollziehbar abwickeln',
        'Reservierung, Verkauf und Belege beziehen sich auf genau dieses Exemplar. Auch eine Rückgabe bleibt mit seiner Herkunft verbunden.',
      ],
    ],
    benefits: [
      [
        'Gebrauchtteile statt Sammelbestand',
        'Zwei gleiche Teilenummern können unterschiedliche Zustände, Laufleistungen und Preise haben. Jedes Exemplar bleibt einzeln erfasst.',
      ],
      [
        'Fotos und Zustand am Artikel',
        'Dokumentiere sichtbare Schäden, Angaben zur Herkunft und die tatsächlich enthaltenen Teile.',
      ],
      [
        'Preisentscheidung mit Vergleich',
        'Marktangebote unterstützen deine Entscheidung. Den Verkaufspreis und die Beschreibung legst du selbst fest.',
      ],
      [
        'Inserate aus vorhandenen Daten',
        'Übernimm geprüfte Artikeldaten und Fotos in die Inseratvorbereitung. Kanalzugang und Veröffentlichung werden je Anbindung eingerichtet.',
      ],
    ],
    links: ['bestand-lager', 'retouren', 'angebot-auftrag'],
    faq: {
      question: 'Werden unsere Teile automatisch bei eBay eingestellt?',
      answer:
        'Partsunion unterstützt die Vorbereitung von Inseraten aus deinen Artikeldaten. Veröffentlichung und Bestandsabgleich hängen vom verbundenen Verkaufskonto und der freigeschalteten Anbindung ab. Wir klären diese Schritte für deinen Betrieb ausdrücklich vor dem Start.',
    },
  },
};
export function PlatformDetailPage({ kind }: { kind: 'new' | 'used' }) {
  const data = content[kind];
  return (
    <article className="mk">
      <section className="mk-page-hero">
        <div className="mk-wrap">
          <Breadcrumb items={[{ label: 'Plattform', href: '/plattform' }, { label: data.label }]} />
          <p className="mk-kicker">Partsunion für {data.label}</p>
          <h1>{data.title}</h1>
          <p className="mk-copy">{data.intro}</p>
          <div className="mk-actions">
            <DemoLink />
            <a className="mk-link" href="#alltag">
              So funktioniert es <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section id="alltag" className="mk-section">
        <div className="mk-wrap mk-workflow">
          <div>
            <p className="mk-kicker">Dein Tagesgeschäft, zusammengeführt</p>
            <h2>{data.heading}</h2>
            <p className="mk-copy">
              Dein Team arbeitet am selben Stand. Der nächste Arbeitsschritt baut auf den bereits
              erfassten Informationen auf.
            </p>
          </div>
          <ol className="mk-steps">
            {data.steps.map(([title, text], index) => (
              <li className="mk-step" key={title}>
                <span className="mk-step-number">0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <div className="mk-section-intro">
            <div>
              <p className="mk-kicker">Einblick ins Produkt</p>
              <h2>So sieht das im System aus.</h2>
            </div>
            <p className="mk-copy">{data.imageText} Du kannst die Ansicht vergrößern.</p>
          </div>
          <ProductPreview image={data.screenshot} />
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap mk-detail-grid">
          <div>
            <p className="mk-kicker">Für deinen Betrieb gedacht</p>
            <h2>
              Die Details, die im
              <br />
              Teilehandel zählen.
            </h2>
          </div>
          <div className="mk-feature-list">
            {data.benefits.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <p className="mk-kicker">Einführung mit Plan</p>
          <h2>Mit deinem Ablauf starten.</h2>
          <Implementation />
          <Link className="mk-link" style={{ marginTop: 25 }} href="/pricing">
            Kosten und Einführung kennenlernen <ArrowRight aria-hidden="true" />
          </Link>
          <div style={{ marginTop: 35 }}>
            <FAQ
              items={[
                data.faq,
                {
                  question:
                    kind === 'new'
                      ? 'Wir verkaufen auch Gebrauchtteile. Geht das zusammen?'
                      : 'Wir verkaufen auch Neuware. Geht das zusammen?',
                  answer:
                    'Ja. Mengenartikel und gebrauchte Teile können in einer Warenwirtschaft geführt werden. Die Bestandslogik bleibt unterschiedlich: Neuware als Menge, Gebrauchtteile als einzelne Exemplare mit eigener Herkunft und Zustand.',
                },
              ]}
            />
          </div>
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap">
          <p className="mk-kicker">Passende Arbeitsbereiche</p>
          <div className="mk-directory">
            {data.links.map((slug, index) => (
              <Link key={slug} href={`/loesungen/${slug}`}>
                <div>
                  <h3>
                    {kind === 'new'
                      ? ['OE-Ermittlung', 'Einkauf & Disposition', 'Angebot & Auftrag'][index]
                      : ['Bestand & Lager', 'Retouren', 'Angebot & Auftrag'][index]}
                  </h3>
                  <p>Den Ablauf im Detail kennenlernen.</p>
                </div>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </article>
  );
}
