import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { featureData } from '@/lib/feature-data';
import { ProductHighlights } from '@/components/marketing/ProductHighlights';
import { Breadcrumb, DemoLink } from '@/components/marketing/Shared';
export const metadata: Metadata = {
  title: 'Funktionen der Warenwirtschaft im Detail',
  description:
    'WhatsApp-Bot, Betriebsassistent, Warenwirtschaft, Buchhaltung und Banking: Entdecke die Partsunion-Funktionen für deinen Autoteilehandel im Detail.',
  alternates: { canonical: 'https://partsunion.de/features' },
  openGraph: {
    title: 'Partsunion-Funktionen im Detail',
    description: 'Fachliche Details der Warenwirtschaft für den Autoteilehandel.',
    url: 'https://partsunion.de/features',
  },
};
export default function FeaturesPage() {
  return (
    <div className="mk">
      <section className="mk-page-hero">
        <div className="mk-wrap">
          <Breadcrumb items={[{ label: 'Funktionen' }]} />
          <p className="mk-kicker">Fachliche Vertiefung</p>
          <h1>
            Du möchtest es
            <br />
            genauer wissen.
          </h1>
          <p className="mk-copy">
            Vom WhatsApp-Bot für deine Kunden bis zum Betriebsassistenten für dein Team: Hier
            findest du die Funktionen hinter dem Alltag – inklusive Teileidentifikation,
            Warenwirtschaft, Buchhaltung und Banking.
          </p>
          <div className="mk-actions">
            <Link className="mk-button" href="/loesungen">
              Zu den Arbeitsbereichen <ArrowRight aria-hidden="true" />
            </Link>
            <DemoLink />
          </div>
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <p className="mk-kicker">Drei Bereiche, die den Unterschied machen</p>
          <h2>Kundenkontakt. Betriebswissen. Finanzen.</h2>
          <ProductHighlights />
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap">
          <p className="mk-kicker">Die fachlichen Details</p>
          <h2 style={{ marginBottom: 35 }}>Weitere Funktionen und Arbeitsabläufe.</h2>
          <div className="mk-directory">
            {featureData.map((feature) => (
              <Link key={feature.slug} href={`/features/${feature.slug}`}>
                <div>
                  <h2 style={{ fontSize: 23 }}>{feature.title}</h2>
                  <p>{feature.description}</p>
                </div>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
