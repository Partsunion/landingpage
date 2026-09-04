import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts, getPostBySlug } from '@/lib/blog-posts';
import { getGeneratedArticle } from '@/lib/blog-articles-data';
import { Breadcrumb, DemoLink } from '@/components/marketing/Shared';
import { ArticleRetouren } from './articles/retouren';
import { ArticleWhatsAppBot } from './articles/whatsapp-bot';
import { ArticleOemErmittlung } from './articles/oem-ermittlung';
import { ArticleRenderer } from './articles/Renderer';
interface Props {
  params: Promise<{ slug: string }>;
}
const seoTitles: Record<string, string> = {
  'retourenquote-autoteilhandel-senken': 'Retouren senken: 90-Tage-Plan für Teilehändler',
  'whatsapp-bot-fuer-autoteilhaendler': 'WhatsApp-Bot im Teilehandel sinnvoll einführen',
  'oem-ermittlung-aus-vin-hsn-tsn': 'OE-Nummer aus VIN, HSN/TSN und Fahrzeugschein',
  'warenwirtschaft-autoteilhandel-checkliste': 'Warenwirtschaft für Autoteilehändler: Checkliste',
  'erp-vs-generisch-autoteilhandel': 'ERP für den Teilehandel: Branchenlösung im Vergleich',
  'gobd-tse-kasse-autohandel': 'GoBD und TSE-Kasse im Autoteilehandel',
  'foto-wareneingang-retoure-lager-ki': 'Foto-Wareneingang und Retouren im Autoteile-Lager',
  'b2b-kundenportal-autoteilhandel-aufbauen': 'B2B-Kundenportal für Autoteilehändler aufbauen',
  'e-rechnungspflicht-zugferd-xrechnung-handel': 'E-Rechnung mit ZUGFeRD und XRechnung im Handel',
  'differenzbesteuerung-25a-gebrauchtteile': '§ 25a Differenzbesteuerung bei Gebrauchtteilen',
};
export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Beitrag nicht gefunden' };
  const title = seoTitles[slug] || post.title;
  return {
    title,
    description: post.description,
    alternates: { canonical: `https://partsunion.de/blog/${slug}` },
    openGraph: {
      title,
      description: post.description,
      url: `https://partsunion.de/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ['Partsunion'],
    },
  };
}
const articles: Record<string, React.ReactNode> = {
  'retourenquote-autoteilhandel-senken': <ArticleRetouren />,
  'whatsapp-bot-fuer-autoteilhaendler': <ArticleWhatsAppBot />,
  'oem-ermittlung-aus-vin-hsn-tsn': <ArticleOemErmittlung />,
};
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const generated = getGeneratedArticle(slug);
  const body =
    articles[slug] ||
    (generated ? <ArticleRenderer blocks={generated.blocks} faqs={generated.faqs} /> : null);
  if (!body) notFound();
  const related = blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@id': 'https://partsunion.de/#organization' },
    publisher: { '@id': 'https://partsunion.de/#organization' },
    image: 'https://partsunion.de/opengraph-image',
    inLanguage: 'de-DE',
    mainEntityOfPage: `https://partsunion.de/blog/${slug}`,
  };
  return (
    <div className="mk">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <article>
        <header className="mk-page-hero">
          <div className="mk-wrap">
            <Breadcrumb
              items={[{ label: 'Praxisratgeber', href: '/blog' }, { label: post.category }]}
            />
            <p className="mk-kicker">
              {post.category} · {post.readingMinutes} Minuten Lesezeit
            </p>
            <h1>{post.title}</h1>
            <p className="mk-copy">{post.excerpt}</p>
            <div
              className="mk-small"
              style={{ marginTop: 26, display: 'flex', flexWrap: 'wrap', gap: 16 }}
            >
              <Link href="/about" rel="author" style={{ textDecoration: 'underline' }}>
                Redaktion Partsunion
              </Link>
              <span>
                Aktualisiert am{' '}
                <time dateTime={post.updatedAt}>
                  {new Intl.DateTimeFormat('de-DE', { dateStyle: 'long' }).format(
                    new Date(post.updatedAt),
                  )}
                </time>
              </span>
            </div>
          </div>
        </header>
        <div className="mk-section">
          <div className="mk-wrap" style={{ maxWidth: 800 }}>
            <div className="blog-content">{body}</div>
            <div className="mk-callout" style={{ marginTop: 50 }}>
              <h2 style={{ fontSize: 28 }}>Wie sieht das in deinem Betrieb aus?</h2>
              <p>
                Bring einen konkreten Fall ins Beratungsgespräch mit. Wir zeigen dir den passenden
                Ablauf und klären die Voraussetzungen für die Einführung.
              </p>
              <div className="mk-actions">
                <DemoLink />
              </div>
            </div>
          </div>
        </div>
      </article>
      <section className="mk-section mk-paper">
        <div className="mk-wrap">
          <p className="mk-kicker">Weitere Arbeitshilfen</p>
          <h2 style={{ marginBottom: 32 }}>Das könnte dich auch interessieren.</h2>
          <div className="mk-directory">
            {related.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
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
