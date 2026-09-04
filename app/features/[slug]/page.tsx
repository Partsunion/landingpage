import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { featureData } from '@/lib/feature-data';
import { featureContent } from '@/lib/feature-content';
import { Breadcrumb, DemoLink, FAQ } from '@/components/marketing/Shared';
import { FinalCTA } from '@/components/landing/FinalCTA';
interface Props {
  params: Promise<{ slug: string }>;
}
const seoTitles: Record<string, string> = {
  'oem-ermittlung': 'OE-Nummern prüfen: Daten und Fachfreigabe',
  'whatsapp-bot': 'WhatsApp-Anfragen ins ERP übernehmen',
  'automatische-rechnungserstellung': 'Angebot, Auftrag und Rechnung verbinden',
  bestellprozess: 'Einkauf und Disposition für Autoteile',
  bestandssynchronisation: 'Warenbestand für alle Verkaufskanäle',
  retourenmanagement: 'Retourenprozess: Prüfung und Gutschrift',
  skalierbarkeit: 'ERP für Filialen und wachsende Teilehändler',
  '24-7-einsatzbereit': 'Digitale Anfragen und B2B-Self-Service',
  geschwindigkeit: 'Arbeitsabläufe im Autoteilehandel verbinden',
  'sinkende-retouren': 'Passende Teile prüfen und Retouren senken',
  sprachuebergreifend: 'Mehrsprachige Anfragen im Teilehandel',
  'team-entlastung': 'Arbeitsvorräte und Rollen im Teilehandel',
  'gobd-tse-zugferd-datev': 'GoBD, TSE, ZUGFeRD und DATEV im Teilehandel',
  'b2b-kundenportal-white-label': 'B2B-Kundenportal für Autoteilehändler',
  'erp-autoteilehandel': 'ERP-System für den Autoteilehandel',
  'warenwirtschaft-autoteilhandel': 'Warenwirtschaft für den Autoteilehandel',
};
export async function generateStaticParams() {
  return featureData.map((feature) => ({ slug: feature.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = featureData.find((f) => f.slug === slug);
  if (!feature) return { title: 'Funktion nicht gefunden' };
  const title = seoTitles[slug] || feature.title;
  const description =
    feature.description.length >= 90
      ? feature.description
      : `${feature.description} Im Partsunion ERP für Autoteilehändler.`;
  return {
    title,
    description,
    alternates: { canonical: `https://partsunion.de/features/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://partsunion.de/features/${slug}`,
      type: 'website',
    },
  };
}
export default async function FeatureDetailPage({ params }: Props) {
  const { slug } = await params;
  const feature = featureData.find((f) => f.slug === slug);
  if (!feature) notFound();
  const content = featureContent[slug] || {};
  const url = `https://partsunion.de/features/${slug}`;
  const title = seoTitles[slug] || feature.title;
  const description =
    feature.description.length >= 90
      ? feature.description
      : `${feature.description} Im Partsunion ERP für Autoteilehändler.`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://partsunion.de/' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Funktionen',
            item: 'https://partsunion.de/features',
          },
          { '@type': 'ListItem', position: 3, name: feature.title, item: url },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: 'de-DE',
        isPartOf: { '@id': 'https://partsunion.de/#website' },
        about: { '@id': 'https://partsunion.de/#software' },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      ...(content.faqs
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${url}#faq`,
              mainEntity: content.faqs.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ]
        : []),
    ],
  };
  const related = featureData
    .filter((f) => f.slug !== slug && f.category === feature.category)
    .slice(0, 3);
  return (
    <article className="mk">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <section className="mk-page-hero">
        <div className="mk-wrap">
          <Breadcrumb
            items={[{ label: 'Funktionen', href: '/features' }, { label: feature.title }]}
          />
          <p className="mk-kicker">Funktionen im Detail</p>
          <h1>{title}</h1>
          <p className="mk-copy">{content.subtitle || feature.description}</p>
          <div className="mk-actions">
            <DemoLink />
            <Link className="mk-link" href="/loesungen">
              Arbeitsbereiche ansehen <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap mk-detail-grid">
          <div>
            <p className="mk-kicker">Was das im Alltag bedeutet</p>
            <h2>{feature.title}</h2>
            <p className="mk-copy" style={{ marginTop: 24 }}>
              {feature.benefit}
            </p>
          </div>
          <div>
            <h3>Was dazugehört</h3>
            <ul className="mk-contact-points">
              {feature.features.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mk-callout">
              <h3>So ist der Funktionsumfang einzuordnen</h3>
              <p>{feature.technicalDetails}</p>
            </div>
          </div>
        </div>
      </section>
      {content.specs && (
        <section className="mk-section mk-paper">
          <div className="mk-wrap mk-detail-grid">
            <div>
              <p className="mk-kicker">Die Details</p>
              <h2>
                Daten, Regeln
                <br />
                und Übergaben.
              </h2>
            </div>
            <dl className="mk-specs">
              {content.specs.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}
      {content.faqs && (
        <section className="mk-section">
          <div className="mk-wrap mk-faq-layout">
            <div>
              <p className="mk-kicker">Häufige Fragen</p>
              <h2>
                Vor der Einführung
                <br />
                gut zu wissen.
              </h2>
            </div>
            <FAQ items={content.faqs.map((item) => ({ question: item.q, answer: item.a }))} />
          </div>
        </section>
      )}
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <p className="mk-kicker">Weiterlesen</p>
          <h2 style={{ marginBottom: 32 }}>Verwandte Funktionen.</h2>
          <div className="mk-directory">
            {related.map((item) => (
              <Link key={item.slug} href={`/features/${item.slug}`}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
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
