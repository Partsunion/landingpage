import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumb, DemoLink } from '@/components/marketing/Shared';
import { ContactForm } from './ContactForm';
export const metadata: Metadata = {
  title: 'Kontakt zu Partsunion',
  description:
    'Fragen zur Warenwirtschaft, Einführung oder Zusammenarbeit? Schreib Partsunion eine Nachricht oder vereinbare ein Beratungsgespräch für deinen Teilehandel.',
  alternates: { canonical: 'https://partsunion.de/contact' },
  openGraph: {
    title: 'Kontakt zu Partsunion',
    description: 'Schreib uns zu deinem Teilehandel und deinen Fragen.',
    url: 'https://partsunion.de/contact',
  },
};
export default function ContactPage() {
  return (
    <div className="mk">
      <section className="mk-page-hero">
        <div className="mk-wrap">
          <Breadcrumb items={[{ label: 'Kontakt' }]} />
          <p className="mk-kicker">Wir hören zu</p>
          <h1>
            Was möchtest du
            <br />
            mit uns besprechen?
          </h1>
          <p className="mk-copy">
            Fragen zum Produkt, zur Einführung oder zur Zusammenarbeit? Schreib uns. Wenn du deinen
            Bedarf persönlich besprechen möchtest, vereinbare direkt ein Beratungsgespräch.
          </p>
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap mk-contact-grid">
          <div>
            <h2>
              Dein direkter
              <br />
              Draht zu Partsunion.
            </h2>
            <a
              href="mailto:info@partsunion.de"
              className="mk-link"
              data-track="Contact Email"
              style={{ fontSize: 20, marginTop: 24 }}
            >
              info@partsunion.de <ArrowRight aria-hidden="true" />
            </a>
            <p className="mk-copy" style={{ marginTop: 24 }}>
              PartsUnion UG (haftungsbeschränkt)
              <br />
              Zum Sommersberg 27
              <br />
              50321 Brühl, Deutschland
            </p>
            <div className="mk-actions">
              <DemoLink />
            </div>
            <p className="mk-small" style={{ marginTop: 30 }}>
              Du nutzt Partsunion bereits?{' '}
              <Link href="https://app.partsunion.de" style={{ textDecoration: 'underline' }}>
                Zum Kundenlogin
              </Link>
              .
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
