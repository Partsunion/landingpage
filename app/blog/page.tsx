import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';
import { Breadcrumb, DemoLink } from '@/components/marketing/Shared';
export const metadata: Metadata = {
  title: 'Praxisratgeber für den Autoteilehandel',
  description:
    'Verständliche Ratgeber für Autoteilehändler: Warenwirtschaft auswählen, Teile richtig identifizieren, Retouren bearbeiten und Belege sauber organisieren.',
  alternates: { canonical: 'https://partsunion.de/blog' },
  openGraph: {
    title: 'Praxiswissen für deinen Teilehandel',
    description: 'Arbeitsabläufe, Softwareauswahl und Belege verständlich erklärt.',
    url: 'https://partsunion.de/blog',
  },
};
export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return (
    <div className="mk">
      <section className="mk-page-hero">
        <div className="mk-wrap">
          <Breadcrumb items={[{ label: 'Praxisratgeber' }]} />
          <p className="mk-kicker">Wissen für den Arbeitsalltag</p>
          <h1>
            Gute Entscheidungen
            <br />
            beginnen mit Klarheit.
          </h1>
          <p className="mk-copy">
            Wie wählst du eine Warenwirtschaft aus? Welche Daten braucht die Teileprüfung? Und wie
            bleiben Retouren und Belege nachvollziehbar? Hier findest du konkrete Arbeitshilfen.
          </p>
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-wrap mk-articles">
          {posts.map((post, index) => (
            <article key={post.slug}>
              <span className="mk-number">
                {String(index + 1).padStart(2, '0')} / {post.category}
              </span>
              <Link href={`/blog/${post.slug}`}>
                <h2>{post.title}</h2>
                <ArrowUpRight aria-hidden="true" />
              </Link>
              <p>{post.excerpt}</p>
              <div className="mk-small">
                {post.readingMinutes} Minuten Lesezeit · Aktualisiert{' '}
                {new Intl.DateTimeFormat('de-DE').format(new Date(post.updatedAt))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap mk-section-intro">
          <div>
            <p className="mk-kicker">Dein eigener Ablauf zählt</p>
            <h2>
              Von der Checkliste
              <br />
              in deinen Betrieb.
            </h2>
          </div>
          <div>
            <p className="mk-copy">
              Im persönlichen Beratungsgespräch prüfen wir einen echten Fall aus deinem Teilehandel
              und klären die offenen Fragen.
            </p>
            <div className="mk-actions">
              <DemoLink />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
