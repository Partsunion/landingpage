import type { Metadata } from 'next';
import { Breadcrumb, ConsultationLink } from '@/components/marketing/Shared';
import { ProductPreview } from '@/components/marketing/ProductPreview';
import { FinalCTA } from '@/components/landing/FinalCTA';
export const metadata: Metadata = {
  title: 'Produktansichten: Partsunion im Arbeitsalltag',
  description:
    'Sieh echte Partsunion-Produktansichten für WhatsApp-Anfragen, Verkauf, Lager, Betriebsassistent, Rechnungen und Banking – mit Beispieldaten erklärt.',
  alternates: { canonical: 'https://partsunion.de/live-demo' },
  openGraph: {
    title: 'Partsunion-Produktansichten',
    description: 'Die Arbeitsbereiche deiner Warenwirtschaft kennenlernen.',
    url: 'https://partsunion.de/live-demo',
  },
};
export default function ProductViewsPage() {
  return (
    <div className="mk">
      <section className="mk-page-hero">
        <div className="mk-wrap">
          <Breadcrumb items={[{ label: 'Produktansichten' }]} />
          <p className="mk-kicker">Ein Blick in deinen Arbeitsalltag</p>
          <h1>
            So sieht Partsunion
            <br />
            im Betrieb aus.
          </h1>
          <p className="mk-copy">
            Wechsle zwischen den Arbeitsbereichen und vergrößere die Produktansichten. Welche
            Abläufe für deinen Betrieb sinnvoll sind, klären wir in einem persönlichen
            Beratungsgespräch.
          </p>
          <div className="mk-actions">
            <ConsultationLink />
          </div>
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <h2 style={{ marginBottom: 30 }}>Vom Kundendialog bis zur Zahlung.</h2>
          <ProductPreview compact={false} />
          <p className="mk-small" style={{ marginTop: 20 }}>
            Die Ansichten zeigen das Partsunion-System mit Beispieldaten. Funktionsumfang und
            Anbindungen stimmen wir für deinen Betrieb ab.
          </p>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
