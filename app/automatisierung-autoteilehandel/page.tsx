import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  CreditCard,
  MessageCircle,
  RotateCcw,
  ScanLine,
  Workflow,
} from 'lucide-react';
import '@/app/home-upgrade.css';
import { SystemWorkflow } from '@/components/marketing/SystemWorkflow';
import { ProductPreview } from '@/components/marketing/ProductPreview';
import { Breadcrumb, ConsultationLink, FAQ } from '@/components/marketing/Shared';

const canonical = 'https://partsunion.de/automatisierung-autoteilehandel';

export const metadata: Metadata = {
  title: 'Automatisierung im Autoteilehandel',
  description:
    'Automatisiere Teileanfragen, OE-Ermittlung, Verkauf, Lager, Kasse, Zahlungen und Retouren in einer verbundenen Plattform für den Autoteilehandel.',
  keywords: [
    'Automatisierung Autoteilehandel',
    'Autoteilehandel automatisieren',
    'Prozessautomatisierung Teilehandel',
    'ERP Autoteilehandel',
    'Warenwirtschaft Autoteilehandel',
    'WhatsApp Bot Autoteilehandel',
    'automatische OE-Ermittlung',
  ],
  alternates: { canonical },
  openGraph: {
    title: 'Automatisierung für den Autoteilehandel',
    description:
      'Vom Fahrzeugschein bis zur Zahlung: Partsunion automatisiert verbundene Abläufe im Autoteilehandel.',
    url: canonical,
  },
};

const automationAreas = [
  {
    icon: ScanLine,
    title: 'Fahrzeugdaten und OE-Ermittlung',
    text: 'Partsunion liest den Fahrzeugschein aus, decodiert die VIN und ermittelt die OE-Nummer anhand von Fahrzeug, Teilebedarf und Katalogdaten. Offene Varianten lösen automatisch die passende Rückfrage aus.',
    href: '/loesungen/oe-ermittlung',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp-Anfragen automatisch bearbeiten',
    text: 'Der Bot beantwortet Anfragen, sammelt Fahrzeug- und Teileinformationen und meldet passende Artikel, Preis, Verfügbarkeit und Liefertermin zurück. Der vollständige Vorgang landet direkt im System.',
    href: '/whatsapp-bot',
  },
  {
    icon: CreditCard,
    title: 'Vom Angebot bis zur direkten Zahlung',
    text: 'Aus der geprüften Auswahl entsteht ein Angebot. Der Kunde kann direkt bezahlen und bestellen. Auftrag, Reservierung, Beschaffung und Belege arbeiten anschließend mit denselben Daten weiter.',
    href: '/loesungen/angebot-auftrag',
  },
  {
    icon: Workflow,
    title: 'ERP, Warenwirtschaft und Kasse',
    text: 'Verkauf, Einkauf, Bestand, Lagerplätze, Theke und Kasse greifen ineinander. Jeder Folgeschritt kennt Kunde, Fahrzeug, Artikel, Preis und bisherigen Bearbeitungsstand.',
    href: '/plattform',
  },
  {
    icon: Bot,
    title: 'Betriebsassistent und dynamische Maskenöffnung',
    text: 'Der Betriebsassistent kennt die verbundenen Betriebsdaten, beantwortet Fragen zum gesamten Betrieb und öffnet dynamisch die passende Maske für den nächsten Arbeitsschritt.',
    href: '/betriebsassistent',
  },
  {
    icon: RotateCcw,
    title: 'Retouren und Reklamationen',
    text: 'Rückläufer werden automatisch dem ursprünglichen Verkauf zugeordnet. Artikel, Grund, Fotos, Entscheidung, Bestandswirkung und Gutschrift bleiben in einer nachvollziehbaren Prozesskette.',
    href: '/loesungen/retouren',
  },
];

const automationFaqs = [
  {
    question: 'Was bedeutet Automatisierung im Autoteilehandel?',
    answer:
      'Automatisierung bedeutet, dass Fahrzeugdaten, Teileermittlung, Kundenkommunikation, Verkauf, Einkauf, Lager, Zahlung und Belege ohne wiederholte Dateneingabe zusammenarbeiten. Eindeutige Schritte laufen automatisch weiter; fachliche Klärfälle landen mit ihrem vollständigen Kontext beim Team.',
  },
  {
    question: 'Welche Abläufe automatisiert Partsunion?',
    answer:
      'Partsunion automatisiert unter anderem die Aufnahme von Teileanfragen, das Auslesen von Fahrzeugscheinen, die OE-Ermittlung, Antworten im WhatsApp-Dialog, Angebote, direkte Zahlungen, Aufträge, Bestands- und Beschaffungsschritte sowie Retouren und Reklamationen.',
  },
  {
    question: 'Wie weit reicht die automatische OE-Ermittlung?',
    answer:
      'Partsunion hat Nutzungsrechte für 56 Marken und kann 80 Prozent der weltweiten VINs decodieren. Die VIN-Abdeckung ist keine OE-Trefferquote. Die konkrete Zuordnung hängt zusätzlich von Fahrzeugausführung, Teilebedarf und verfügbaren Katalogdaten ab.',
  },
  {
    question: 'Warum empfiehlt Partsunion eine gemeinsame Umstellung?',
    answer:
      'Der größte Automatisierungseffekt entsteht, wenn Anfrage, OE-Ermittlung, Verkauf, Einkauf, Lager, Kasse und Belege von Anfang an dieselben Daten und Prozessketten nutzen. Deshalb bereiten wir die zusammenhängenden Arbeitsbereiche, Daten, Anbindungen und das Team für einen gemeinsamen Umstellungstermin vor.',
  },
];

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: 'Automatisierung im Autoteilehandel',
    description: metadata.description,
    isPartOf: { '@id': 'https://partsunion.de/#website' },
    about: { '@id': 'https://partsunion.de/#software' },
    breadcrumb: { '@id': `${canonical}#breadcrumb` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: 'https://partsunion.de/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Automatisierung im Autoteilehandel',
        item: canonical,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: automationFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  },
];

export default function AutomationAutoteilehandelPage() {
  return (
    <div className="mk">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="mk-page-hero">
        <div className="mk-wrap">
          <Breadcrumb items={[{ label: 'Automatisierung im Autoteilehandel' }]} />
          <p className="mk-kicker">Prozessautomatisierung für Teilehändler</p>
          <h1>Automatisierung für den Autoteilehandel.</h1>
          <p className="mk-copy">
            Partsunion automatisiert nicht nur einzelne Aufgaben. Die All-in-One-Plattform verbindet
            Kundenanfrage, Fahrzeug, OE-Ermittlung, Artikel, Bestand, Verkauf, Zahlung und Belege zu
            einer durchgängigen Prozesskette.
          </p>
          <div className="mk-actions">
            <ConsultationLink label="Automatisierung besprechen" />
            <Link href="/plattform" className="mk-link">
              Die Plattform entdecken <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mk-section hu-navy">
        <div className="mk-wrap hu-split">
          <div>
            <p className="mk-kicker">Ein Vorgang statt vieler Übergaben</p>
            <h2>
              Was vorne beginnt,
              <br />
              läuft im System weiter.
            </h2>
            <p className="mk-copy">
              Ein Kunde sendet seinen Fahrzeugschein per WhatsApp. Partsunion liest die Daten,
              ermittelt die OE-Nummer, prüft Artikel und Bestand und antwortet mit Preis und
              Liefertermin. Nach der Auswahl erstellt das System das Angebot. Der Kunde kann direkt
              zahlen; Auftrag, Beschaffung, Lager und Belege übernehmen den vorhandenen Kontext.
            </p>
            <div className="mk-actions">
              <Link href="/loesungen" className="mk-link">
                Alle verbundenen Abläufe <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <SystemWorkflow />
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-section-intro">
            <div>
              <p className="mk-kicker">Automatisierte Arbeitsbereiche</p>
              <h2>Wo Partsunion deinem Team Arbeit abnimmt.</h2>
            </div>
            <p className="mk-copy">
              Jede Automatisierung arbeitet mit demselben Kunden-, Fahrzeug-, Artikel- und
              Belegkontext. Dadurch gehen Informationen beim Wechsel zwischen Arbeitsbereichen nicht
              verloren.
            </p>
          </div>
          <div className="hu-modules">
            {automationAreas.map(({ icon: Icon, title, text, href }) => (
              <article className="hu-module" key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
                <Link href={href} className="mk-link">
                  Funktion ansehen <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <div className="mk-section-intro">
            <div>
              <p className="mk-kicker">Die Plattform im Einsatz</p>
              <h2>Echte Ansichten der verbundenen Arbeitsbereiche.</h2>
            </div>
            <p className="mk-copy">
              Die Produktansichten zeigen, wo dein Team Anfragen, Aufträge, Bestand, Banking,
              Retouren und den Betriebsassistenten bearbeitet. Öffne eine Ansicht, um die Details zu
              vergrößern.
            </p>
          </div>
          <ProductPreview />
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap mk-faq-layout">
          <div>
            <p className="mk-kicker">Häufige Fragen</p>
            <h2>
              Automatisierung,
              <br />
              die zusammenarbeitet.
            </h2>
            <p className="mk-copy" style={{ marginTop: 22 }}>
              Im Beratungsgespräch gehen wir deine heutige Prozesskette durch und zeigen, wie sie in
              Partsunion als ein verbundener Ablauf arbeitet.
            </p>
            <div className="mk-actions">
              <ConsultationLink label="Beratungsgespräch vereinbaren" />
            </div>
          </div>
          <FAQ items={automationFaqs} />
        </div>
      </section>
    </div>
  );
}
