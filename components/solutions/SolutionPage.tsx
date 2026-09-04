import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getSolutionPage, type SolutionPageData } from '@/lib/solutions-data';
import { ProductPreview } from '@/components/marketing/ProductPreview';
import { Breadcrumb, DemoLink } from '@/components/marketing/Shared';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { productImages } from '@/lib/product-images';
import { MobileReturnsGraphic } from '@/components/marketing/SystemWorkflow';
export function SolutionPage({ page }: { page: SolutionPageData }) {
  const screenshot = page.screenshot ? productImages[page.screenshot] : null;
  if (!screenshot && page.visual !== 'mobile')
    throw new Error(`Missing reviewed screenshot: ${page.slug}`);
  return (
    <article className="mk">
      <section className="mk-page-hero">
        <div className="mk-wrap">
          <Breadcrumb
            items={[{ label: 'Lösungen', href: '/loesungen' }, { label: page.navLabel }]}
          />
          <p className="mk-kicker">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="mk-copy">{page.intro}</p>
          <div className="mk-actions">
            <DemoLink />
            <a className="mk-link" href="#ablauf">
              Ablauf kennenlernen <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section id="ablauf" className="mk-section">
        <div className="mk-wrap mk-workflow">
          <div>
            <p className="mk-kicker">So arbeitet dein Team damit</p>
            <h2>{page.promise}</h2>
            <p className="mk-copy">{page.controlText}</p>
          </div>
          <ol className="mk-steps">
            {page.workflow.map((step, i) => (
              <li className="mk-step" key={step.number}>
                <span className="mk-step-number">0{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
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
              <p className="mk-kicker">
                {screenshot ? 'Im Partsunion-Demosystem' : 'Vom Smartphone ins Team'}
              </p>
              <h2>
                {screenshot
                  ? `${screenshot.title} im System.`
                  : 'Mobil erfassen. Gemeinsam weiterarbeiten.'}
              </h2>
            </div>
            <p className="mk-copy">
              {screenshot?.description ||
                'So verbindet die Partsunion Mobile App die Erfassung am Teil mit dem Vorgang im Team. Die Grafik erklärt den Ablauf und ist keine Bildschirmaufnahme der App.'}
            </p>
          </div>
          {page.screenshot ? (
            <ProductPreview image={page.screenshot} />
          ) : (
            <div className="mk-mobile-example">
              <MobileReturnsGraphic />
            </div>
          )}
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap mk-detail-grid">
          <div>
            <p className="mk-kicker">Was dazugehört</p>
            <h2>
              Die Details machen
              <br />
              den Unterschied.
            </h2>
          </div>
          <div className="mk-feature-list">
            {page.capabilities.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mk-wrap">
          <div className="mk-callout">
            <h3>Welche Anbindungen brauchst du?</h3>
            <p>
              Kataloge, Lieferanten, Zahlungsanbieter und Kassenfunktionen hängen von der
              vereinbarten Einrichtung ab. In der Demo klären wir konkret, welche Funktionen du
              sofort nutzen kannst und welche eine Anbindung oder Freischaltung benötigen.
            </p>
          </div>
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <p className="mk-kicker">Im gleichen Ablauf weiterarbeiten</p>
          <h2 style={{ marginBottom: 35 }}>Das hängt zusammen.</h2>
          <div className="mk-directory">
            {page.related.map((slug) => {
              const related = getSolutionPage(slug);
              return related ? (
                <Link href={`/loesungen/${slug}`} key={slug}>
                  <div>
                    <h3>{related.navLabel}</h3>
                    <p>{related.promise}</p>
                  </div>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </section>
      <FinalCTA />
    </article>
  );
}
