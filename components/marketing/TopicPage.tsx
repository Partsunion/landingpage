import Link from 'next/link';
import '@/app/topic-pages.css';
import {
  ArrowDown,
  ArrowRight,
  Check,
  ClipboardCheck,
  FileText,
  Landmark,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Breadcrumb, DemoLink } from '@/components/marketing/Shared';
import { ProductPreview } from '@/components/marketing/ProductPreview';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { topicPages, type TopicSlug } from '@/lib/topic-pages';

function WhatsAppGraphic() {
  return (
    <div className="tp-conversation">
      <div className="tp-graphic-title">
        <MessageCircle aria-hidden="true" />
        <span>WhatsApp → Teileverkauf</span>
      </div>
      <div className="tp-message tp-message-customer">
        <span>Kundenanfrage</span>
        <p>Ich suche einen Außenspiegel links für meinen Golf.</p>
      </div>
      <div className="tp-message tp-message-bot">
        <span>Partsunion-Bot</span>
        <p>Schick mir bitte die Fahrzeugdaten und ein Foto vom vorhandenen Spiegel.</p>
      </div>
      <div className="tp-connector">
        <ArrowDown aria-hidden="true" />
        <span>Angaben am Vorgang sammeln</span>
      </div>
      <div className="tp-request">
        <div className="tp-request-head">
          <ClipboardCheck aria-hidden="true" />
          <strong>Teileanfrage</strong>
          <span>In Klärung</span>
        </div>
        <dl>
          <div>
            <dt>Bedarf</dt>
            <dd>Außenspiegel links</dd>
          </div>
          <div>
            <dt>Fahrzeug</dt>
            <dd>Golf · Daten ergänzen</dd>
          </div>
          <div>
            <dt>Nächster Schritt</dt>
            <dd>Ausführung prüfen</dd>
          </div>
        </dl>
      </div>
      <div className="tp-graphic-foot">
        <Users aria-hidden="true" /> Bei offenen Fragen übernimmt dein Team.
      </div>
    </div>
  );
}

function AssistantGraphic() {
  return (
    <div className="tp-assistant">
      <div className="tp-graphic-title">
        <Sparkles aria-hidden="true" />
        <span>Deine Frage. Dein Betrieb.</span>
      </div>
      <div className="tp-assistant-question">„Welche Aufträge warten auf Ware?“</div>
      <div className="tp-assistant-sources">
        <span>
          <FileText aria-hidden="true" /> Auftrag
        </span>
        <span>
          <Package aria-hidden="true" /> Bestand
        </span>
        <span>
          <Search aria-hidden="true" /> Einkauf
        </span>
      </div>
      <div className="tp-connector">
        <ArrowDown aria-hidden="true" />
        <span>Freigegebene Daten prüfen</span>
      </div>
      <div className="tp-assistant-result">
        <p className="tp-card-eyebrow">Ergebnis am Vorgang</p>
        <h3>Fehlmenge erkannt.</h3>
        <p>
          Bestand und offene Bestellung prüfen. Danach den passenden Bestellschritt vorbereiten.
        </p>
        <div className="tp-approval">
          <ShieldCheck aria-hidden="true" />
          <span>Vorschlag prüfen & freigeben</span>
        </div>
      </div>
      <div className="tp-graphic-foot">
        <Check aria-hidden="true" /> Deine Rolle. Deine Entscheidung.
      </div>
    </div>
  );
}

function BankingGraphic() {
  return (
    <div className="tp-banking">
      <div className="tp-graphic-title">
        <Landmark aria-hidden="true" />
        <span>Beleg & Zahlung verbinden</span>
      </div>
      <div className="tp-invoice">
        <FileText aria-hidden="true" />
        <div>
          <span>Ausgangsrechnung</span>
          <strong>RE-1042</strong>
        </div>
        <p>
          248,00 €<span>Offener Betrag</span>
        </p>
      </div>
      <div className="tp-match-line">
        <span />
        <ArrowDown aria-hidden="true" />
        <span />
      </div>
      <div className="tp-transaction">
        <Landmark aria-hidden="true" />
        <div>
          <span>Bankumsatz</span>
          <strong>Verwendungszweck RE-1042</strong>
        </div>
        <p>+248,00 €</p>
      </div>
      <div className="tp-match-details">
        <span>
          <Check aria-hidden="true" /> Rechnungsnummer
        </span>
        <span>
          <Check aria-hidden="true" /> Betrag
        </span>
      </div>
      <div className="tp-approval">
        <ShieldCheck aria-hidden="true" />
        <span>Zuordnung prüfen & bestätigen</span>
      </div>
      <div className="tp-graphic-foot">Beispiel einer vollständigen Zahlung.</div>
    </div>
  );
}

function RolloutGraphic() {
  const milestones = [
    ['Ablauf', 'Was soll zuerst besser laufen?'],
    ['Daten', 'Was nehmen wir mit?'],
    ['Team', 'Wer arbeitet wie damit?'],
    ['Start', 'Was geht wann in Nutzung?'],
  ];
  return (
    <div className="tp-rollout">
      <div className="tp-graphic-title">
        <ClipboardCheck aria-hidden="true" />
        <span>Dein Einführungsplan</span>
      </div>
      <ol>
        {milestones.map(([title, text], index) => (
          <li key={title}>
            <span className="tp-milestone">0{index + 1}</span>
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
            {index === 3 && <ArrowRight aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <div className="tp-graphic-foot">
        <Users aria-hidden="true" /> Gemeinsam festgelegt. Schritt für Schritt.
      </div>
    </div>
  );
}

const graphics = {
  'whatsapp-bot': WhatsAppGraphic,
  betriebsassistent: AssistantGraphic,
  'buchhaltung-banking': BankingGraphic,
  einfuehrung: RolloutGraphic,
};

export function TopicPage({ slug }: { slug: TopicSlug }) {
  const page = topicPages[slug];
  const Graphic = graphics[slug];
  const url = `https://partsunion.de/${slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://partsunion.de/' },
          { '@type': 'ListItem', position: 2, name: page.label, item: url },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: 'de-DE',
        isPartOf: { '@id': 'https://partsunion.de/#website' },
        about: { '@id': 'https://partsunion.de/#software' },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: page.questions.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };
  return (
    <article className={`mk tp-page tp-page-${slug}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <section className="tp-hero">
        <div className="mk-wrap">
          <Breadcrumb items={[{ label: page.label }]} />
          <div className="tp-hero-grid">
            <div>
              <p className="mk-kicker">{page.eyebrow}</p>
              <h1>{page.title}</h1>
              <p className="mk-copy">{page.intro}</p>
              <div className="mk-actions">
                <DemoLink label="Beratungsgespräch vereinbaren" />
                <a className="mk-link" href="#ablauf">
                  Ablauf kennenlernen <ArrowDown aria-hidden="true" />
                </a>
              </div>
            </div>
            <figure className="tp-graphic">
              <Graphic />
              <figcaption>Illustrativer Ablauf · Beispiel zur Erklärung</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <nav className="tp-section-nav" aria-label={`${page.label}: Auf dieser Seite`}>
        <div className="mk-wrap">
          <a href="#ablauf">Der Ablauf</a>
          <a href="#moeglichkeiten">Die Möglichkeiten</a>
          <a href={slug === 'buchhaltung-banking' ? '#banking' : '#produktansicht'}>Im System</a>
          <a href="#fragen">Häufige Fragen</a>
        </div>
      </nav>
      <section className="mk-section" id="ablauf">
        <div className="mk-wrap">
          <div className="mk-section-intro">
            <div>
              <p className="mk-kicker">Der Ablauf</p>
              <h2>{page.workflowTitle}</h2>
            </div>
            <p className="mk-copy">{page.workflowIntro}</p>
          </div>
          <ol className="tp-workflow">
            {page.steps.map((step, index) => (
              <li key={step.title}>
                <span className="tp-step-index">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="mk-section tp-dark" id="moeglichkeiten">
        <div className="mk-wrap">
          <div className="mk-section-intro">
            <div>
              <p className="mk-kicker">Die Möglichkeiten</p>
              <h2>{page.featureTitle}</h2>
            </div>
            <p className="mk-copy">{page.featureIntro}</p>
          </div>
          <div className="tp-features">
            {page.features.map((feature, index) => (
              <article key={feature.title}>
                <span className="tp-feature-index">0{index + 1}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
          <div className="tp-dark-action">
            <Link href="/beratung" className="mk-link" data-track="Consultation CTA">
              Für deinen Betrieb besprechen <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section
        className="mk-section"
        id={slug === 'buchhaltung-banking' ? 'banking' : 'produktansicht'}
      >
        <div className="mk-wrap">
          <div className="mk-section-intro">
            <div>
              <p className="mk-kicker">Im Partsunion-System</p>
              <h2>{page.screenshotTitle}</h2>
            </div>
            <p className="mk-copy">{page.screenshotText}</p>
          </div>
          <ProductPreview image={page.screenshot} />
        </div>
      </section>
      <section className="mk-section mk-paper" id="fragen">
        <div className="mk-wrap tp-faq-grid">
          <div>
            <p className="mk-kicker">Vor dem Start</p>
            <h2>{page.preparationTitle}</h2>
            <p className="mk-copy">{page.preparation}</p>
            <Link href={slug === 'einfuehrung' ? '/pricing' : '/einfuehrung'} className="mk-link">
              {slug === 'einfuehrung' ? 'Kosten und Umfang einordnen' : 'Mehr zur Einführung'}{' '}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="tp-faqs">
            {page.questions.map(({ question, answer }) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="mk-section tp-related-section">
        <div className="mk-wrap">
          <p className="mk-kicker">Passt dazu</p>
          <div className="tp-related">
            {page.related.map((related) => (
              <Link href={`/${related}`} key={related}>
                <div>
                  <h3>{topicPages[related].label}</h3>
                  <p>{topicPages[related].description}</p>
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
