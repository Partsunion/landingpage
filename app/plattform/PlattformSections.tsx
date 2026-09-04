import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductPreview } from '@/components/marketing/ProductPreview';
import { ProductHighlights } from '@/components/marketing/ProductHighlights';
import { AudienceLinks, Breadcrumb, DemoLink, Implementation } from '@/components/marketing/Shared';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { solutionPages } from '@/lib/solutions-data';
export function PlattformSections() {
  return (
    <div className="mk">
      <section className="mk-page-hero">
        <div className="mk-wrap">
          <Breadcrumb items={[{ label: 'Plattform' }]} />
          <p className="mk-kicker">Partsunion im Überblick</p>
          <h1>
            Verkauf, Lager und Büro.
            <br />
            Auf demselben Stand.
          </h1>
          <p className="mk-copy">
            WhatsApp-Bot, Betriebsassistent und Warenwirtschaft greifen ineinander: Deine Kunden
            schreiben, dein Team arbeitet am Vorgang weiter, Buchhaltung und Banking bleiben
            verbunden. Für Neuware und gebrauchte Teile.
          </p>
          <div className="mk-actions">
            <DemoLink />
            <a href="#plattform-produkt" className="mk-link">
              Produkt ansehen <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <AudienceLinks />
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <p className="mk-kicker">Ein System, drei Perspektiven</p>
          <h2>Für deine Kunden. Dein Team. Dein Büro.</h2>
          <ProductHighlights />
        </div>
      </section>
      <section id="plattform-produkt" className="mk-section">
        <div className="mk-wrap">
          <div className="mk-section-intro">
            <div>
              <p className="mk-kicker">Ein gemeinsames System</p>
              <h2>
                Vom Teilebedarf
                <br />
                bis zur Rechnung.
              </h2>
            </div>
            <p className="mk-copy">
              Wechsle zwischen Verkauf, Bestand und Anfragen. Alle Ansichten stammen aus unserem
              Demosystem und zeigen zusammenhängende Arbeitsbereiche.
            </p>
          </div>
          <ProductPreview />
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <p className="mk-kicker">Die Arbeitsbereiche</p>
          <h2 style={{ marginBottom: 35 }}>Was möchtest du verbessern?</h2>
          <div className="mk-directory">
            {solutionPages.map((page) => (
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
      <section className="mk-section">
        <div className="mk-wrap">
          <p className="mk-kicker">Vom Kennenlernen zum Start</p>
          <h2>Einführen, was dein Betrieb braucht.</h2>
          <Implementation />
          <div className="mk-callout">
            <h3>Anbindungen und Freischaltungen vorab klären</h3>
            <p>
              Kataloge, Lieferanten, Zahlungsanbieter, Kassenfunktionen und B2B-Portal werden nach
              deinem konkreten Bedarf eingerichtet. Die benötigten Verträge, technischen
              Voraussetzungen und Kosten stimmen wir vor dem Start ab.
            </p>
            <Link href="/pricing" className="mk-link">
              Mehr zu Kosten und Einführung <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
