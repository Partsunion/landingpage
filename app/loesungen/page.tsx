import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { solutionPages } from '@/lib/solutions-data';
import { Breadcrumb, DemoLink } from '@/components/marketing/Shared';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { ProductHighlights } from '@/components/marketing/ProductHighlights';
export const metadata: Metadata = {
  title: 'Lösungen für den Autoteilehandel',
  description:
    'Teileanfragen, OE-Ermittlung, Verkauf, Einkauf, Lager und Finanzen: Entdecke die Partsunion-Arbeitsbereiche für deinen Neu- und Gebrauchtteilehandel.',
  alternates: { canonical: '/loesungen' },
  openGraph: {
    title: 'Lösungen für den Autoteilehandel',
    description: 'Zusammenhängende Arbeitsbereiche für Theke, Lager und Büro.',
    url: 'https://partsunion.de/loesungen',
  },
};
export default function SolutionsOverview() {
  return (
    <div className="mk">
      <section className="mk-page-hero">
        <div className="mk-wrap">
          <Breadcrumb items={[{ label: 'Lösungen' }]} />
          <p className="mk-kicker">Dein Betrieb. Zusammen gedacht.</p>
          <h1>
            Wo soll es im Alltag
            <br />
            einfacher werden?
          </h1>
          <p className="mk-copy">
            Starte bei dem Ablauf, der dich heute Zeit kostet. Die Partsunion-Arbeitsbereiche
            greifen auf dieselben Kunden-, Fahrzeug-, Artikel- und Belegdaten zu.
          </p>
          <div className="mk-actions">
            <DemoLink />
          </div>
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <p className="mk-kicker">Die wichtigsten Einstiege</p>
          <h2>Direkt zu deinem Thema.</h2>
          <ProductHighlights />
        </div>
      </section>
      {['Verkaufen', 'Ware bewegen', 'Betrieb führen'].map((group, i) => (
        <section className={`mk-section ${i === 1 ? 'mk-paper' : ''}`} key={group}>
          <div className="mk-wrap">
            <p className="mk-kicker">0{i + 1} / Arbeitsbereiche</p>
            <h2 style={{ marginBottom: 35 }}>{group}</h2>
            <div className="mk-directory">
              {solutionPages
                .filter((page) => page.group === group)
                .map((page) => (
                  <Link key={page.slug} href={`/loesungen/${page.slug}`}>
                    <div>
                      <h3>{page.navLabel}</h3>
                      <p>{page.promise}</p>
                    </div>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                ))}
            </div>
          </div>
        </section>
      ))}
      <FinalCTA />
    </div>
  );
}
