import Link from 'next/link';
import { ArrowDown, ArrowRight, Bot, Check, CheckCheck, ChevronDown, Clock3, FileCheck2,
  Layers3, MessageCircle, ScanLine, Smartphone, WalletCards, Workflow } from 'lucide-react';
import type { CampaignPage } from '@/lib/campaign-pages';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { homeFaqs } from '@/components/marketing/Shared';
import { CampaignImage, CampaignShowcase } from './CampaignShowcase';
import { CampaignMobileCTA } from './CampaignShell';

const steps = [
  { icon: MessageCircle, label: 'Anfrage aufnehmen', text: 'WhatsApp, Theke oder Telefon. Kunde, Fahrzeug und Teilebedarf kommen zusammen.' },
  { icon: ScanLine, label: 'OE automatisch ermitteln', text: 'Fahrzeugschein auslesen, VIN decodieren und passende OE-Nummern zuordnen.' },
  { icon: FileCheck2, label: 'Angebot erstellen', text: 'Artikel, Preis, Verfügbarkeit und Liefertermin an den Kunden zurückgeben.' },
  { icon: Layers3, label: 'Auftrag weiterführen', text: 'Bestand, Reservierung und Beschaffung greifen im selben Vorgang ineinander.' },
  { icon: WalletCards, label: 'Zahlung zuordnen', text: 'Direkte Zahlung im WhatsApp-Ablauf, Kasse, Rechnung und Banking verbinden.' },
];

const faqQuestions = [
  'Passt Partsunion zu meinem Betrieb?',
  'Was kostet Partsunion?',
  'Können wir unsere bisherigen Daten übernehmen?',
  'Müssen wir den ganzen Betrieb auf einmal umstellen?',
  'Welche Anbindungen sind für uns verfügbar?',
];

export function CampaignLanding({ page }: { page: CampaignPage }) {
  return (
    <div className="cp-page" data-campaign={page.slug}>
      <section className="cp-hero" id="kampagnenstart">
        <div className="cp-wrap">
          <div className="cp-hero-grid">
            <div className="cp-hero-copy">
              <p className="cp-eyebrow"><span />{page.eyebrow}</p>
              <h1>{page.headline}<span>{page.accent}</span></h1>
              <p className="cp-intro">{page.intro}</p>
              <ul className="cp-benefits">{page.benefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" />{benefit}</li>)}</ul>
              <div className="cp-hero-actions">
                <a className="cp-button" href="#beratung" data-track="Campaign Hero CTA">Beratungsgespräch buchen<ArrowRight aria-hidden="true" /></a>
                <a className="cp-text-link" href="#system">System ansehen<ArrowDown aria-hidden="true" /></a>
              </div>
              <p className="cp-meeting-note"><Clock3 aria-hidden="true" />30 Minuten · persönlich · unverbindlich</p>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-visual-heading"><span className="cp-eyebrow">Partsunion / dein Arbeitsbereich</span><Workflow aria-hidden="true" /></div>
              <h2>{page.heroLabel}</h2>
              <div className="cp-hero-screen"><CampaignImage image={page.heroImage} priority /></div>
              <p className="cp-hero-caption">{page.heroCaption}</p>
              <div className="cp-connected" aria-label="Verbundene Arbeitsbereiche">
                <span>OE-Ermittlung</span><ArrowRight aria-hidden="true" /><span>Verkauf</span><ArrowRight aria-hidden="true" /><span>Lager & Kasse</span>
              </div>
              <p className="cp-sample-label">Echte Systemansicht · Beispieldaten</p>
            </div>
          </div>
          <div className="cp-audience"><span>Entwickelt für den Teilehandel.</span><p>Neuteilehändler <span>/</span> Gebrauchtteilehändler <span>/</span> Autoverwerter</p></div>
        </div>
      </section>

      <section className="cp-proof" aria-label="Fakten zur Plattform">
        <div className="cp-wrap cp-proof-grid">
          <div className="cp-proof-intro"><span className="cp-eyebrow">Branchentiefe, die mitarbeitet.</span><p>Vom Fahrzeug bis zum fertigen Vorgang.</p></div>
          <div><strong>56<span> Marken</span></strong><p>Nutzungsrechte für Fahrzeug- und Teileidentifikation.</p></div>
          <div><strong>80<span> %</span></strong><p>der weltweiten VINs decodierbar.*</p></div>
          <div><strong>1<span> System</span></strong><p>für Anfrage, OE, Verkauf, Lager und Finanzen.</p></div>
        </div>
        <p className="cp-wrap cp-proof-note">* VIN-Abdeckung, keine OE-Trefferquote. Die konkrete Teilezuordnung hängt von Ausführung, Teilebedarf und Katalogdaten ab.</p>
      </section>

      <section className="cp-section cp-system" id="system">
        <div className="cp-wrap">
          <div className="cp-section-head"><div><p className="cp-eyebrow">Ein Blick in deinen nächsten Arbeitstag</p><h2>So arbeitet dein System.<br /><span>Und dein Team weiter.</span></h2></div>
            <p>Entdecke die Arbeitsbereiche an echten Produktansichten. Jeder Bereich kennt den Vorgang und führt ihn weiter.</p>
          </div>
          <CampaignShowcase initialView={page.initialView} />
        </div>
      </section>

      <section className="cp-section cp-flow" id="ablauf">
        <div className="cp-wrap">
          <div className="cp-section-head"><div><p className="cp-eyebrow">Automatisierung über den ganzen Betrieb</p><h2>Eine Anfrage.<br /><span>Ein durchgängiger Ablauf.</span></h2></div>
            <p>Die Stärke liegt in der Verbindung: Daten aus einer Anfrage stehen für die nächsten Schritte bereit. Dein Team muss dieselbe Geschichte nicht neu erfassen.</p>
          </div>
          <ol className="cp-flow-steps">{steps.map(({ icon: Icon, label, text }, index) => <li key={label}>
            <div className="cp-flow-node"><Icon aria-hidden="true" /><span>0{index + 1}</span></div><h3>{label}</h3><p>{text}</p>
          </li>)}</ol>
          <div className="cp-flow-note"><CheckCheck aria-hidden="true" /><p>Der WhatsApp-Bot beantwortet auch Preis- und Lieferfragen. Der Kunde kann sein Angebot direkt bezahlen. Retouren und Reklamationen bleiben mit dem ursprünglichen Verkauf verbunden.</p></div>
          <div className="cp-support-grid">
            <article><div className="cp-support-icon"><Bot aria-hidden="true" /></div><div><p className="cp-eyebrow">Dein Betriebsassistent</p><h3>Frag deinen Betrieb.</h3><p>Bestand, Aufträge, offene Forderungen oder Retouren: Der Assistent verbindet dein Betriebswissen, beantwortet Fragen und öffnet dynamisch die passende Maske für den nächsten Schritt.</p><Link href="/betriebsassistent" className="cp-text-link">Betriebsassistent kennenlernen<ArrowRight aria-hidden="true" /></Link></div></article>
            <article><div className="cp-support-icon"><Smartphone aria-hidden="true" /></div><div><p className="cp-eyebrow">Partsunion Mobile App</p><h3>Dein System. Direkt an der Ware.</h3><p>Informationen dort erfassen, wo die Arbeit stattfindet. Mit der Partsunion Mobile App bleibt dein Team auch im Lager und unterwegs mit denselben Vorgängen verbunden.</p><Link href="/loesungen/haendler-app" className="cp-text-link">Mobile App entdecken<ArrowRight aria-hidden="true" /></Link></div></article>
          </div>
        </div>
      </section>

      <section className="cp-section cp-implementation" id="einfuehrung">
        <div className="cp-wrap">
          <div className="cp-section-head"><div><p className="cp-eyebrow">Ein gemeinsamer Start. Ein klarer Plan.</p><h2>Ein Systemwechsel,<br /><span>den wir zusammen vorbereiten.</span></h2></div><p>Wir empfehlen die gemeinsame Umstellung der verbundenen Arbeitsbereiche. Daten, Anbindungen und dein Team werden dafür gezielt vorbereitet.</p></div>
          <div className="cp-onboarding">
            <article><span>01 / Kennenlernen</span><h3>Deinen Betrieb verstehen.</h3><p>Sortiment, Team und bisherige Programme. Wir zeigen dir, wie deine Abläufe in Partsunion zusammenarbeiten können.</p></article>
            <article><span>02 / Vorbereiten</span><h3>Den Wechsel konkret planen.</h3><p>Datenübernahme, Lieferanten, Kassen- und Zahlungsanbindungen. Du erhältst einen abgestimmten Umfang mit transparenten Kosten.</p></article>
            <article><span>03 / Gemeinsam starten</span><h3>Mit deinem Team loslegen.</h3><p>Wir planen Schulung und Umstellungstermin, damit die zusammenhängenden Bereiche vom Start an ineinandergreifen.</p></article>
          </div>
        </div>
      </section>

      <section className="cp-section cp-faq-section" id="fragen">
        <div className="cp-wrap cp-faq-grid"><div><p className="cp-eyebrow">Vor deinem Gespräch</p><h2>Gute Fragen.<br /><span>Klare Antworten.</span></h2><p className="cp-faq-intro">Die Details klären wir persönlich für deinen Betrieb.</p></div>
          <div className="cp-faq">{faqQuestions.map((question) => {
            const faq = homeFaqs.find((item) => item.question === question)!;
            return <details key={question}><summary>{question}<ChevronDown aria-hidden="true" /></summary><p>{faq.answer}</p></details>;
          })}</div>
        </div>
      </section>

      <div className="cp-booking"><FinalCTA source={`campaign-${page.slug}`} introTitle={page.bookingTitle} introCopy={page.bookingIntro} /></div>
      <CampaignMobileCTA />
    </div>
  );
}
