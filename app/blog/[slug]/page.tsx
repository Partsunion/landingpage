import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, CalendarDays } from 'lucide-react';
import { blogPosts, getPostBySlug } from '@/lib/blog-posts';
import { getGeneratedArticle } from '@/lib/blog-articles-data';
import { ArticleRetouren } from './articles/retouren';
import { ArticleWhatsAppBot } from './articles/whatsapp-bot';
import { ArticleOemErmittlung } from './articles/oem-ermittlung';
import { ArticleRenderer } from './articles/Renderer';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: 'Beitrag nicht gefunden' };

    const url = `https://partsunion.de/blog/${post.slug}`;
    return {
        title: post.title,
        description: post.description,
        keywords: post.keywords,
        alternates: { canonical: url },
        openGraph: {
            title: post.title,
            description: post.description,
            url,
            type: 'article',
            locale: 'de_DE',
            siteName: 'Partsunion',
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: ['Partsunion'],
            tags: post.keywords,
            images: ['/opengraph-image'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: ['/opengraph-image'],
        },
    };
}

const ARTICLES: Record<string, React.ReactNode> = {
    'retourenquote-autoteilhandel-senken': <ArticleRetouren />,
    'whatsapp-bot-fuer-autoteilhaendler': <ArticleWhatsAppBot />,
    'oem-ermittlung-aus-vin-hsn-tsn': <ArticleOemErmittlung />,
};

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const generated = getGeneratedArticle(slug);
    const body = ARTICLES[slug] ?? (generated ? <ArticleRenderer blocks={generated.blocks} faqs={generated.faqs} /> : null);
    if (!body) notFound();

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://partsunion.de/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://partsunion.de/blog' },
            { '@type': 'ListItem', position: 3, name: post.title, item: `https://partsunion.de/blog/${post.slug}` },
        ],
    };

    const articleLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        url: `https://partsunion.de/blog/${post.slug}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        wordCount: post.readingMinutes * 200,
        timeRequired: `PT${post.readingMinutes}M`,
        keywords: post.keywords.join(', '),
        inLanguage: 'de-DE',
        author: { '@type': 'Organization', name: 'Partsunion', url: 'https://partsunion.de' },
        publisher: { '@id': 'https://partsunion.de/#organization' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://partsunion.de/blog/${post.slug}` },
    };

    // Related posts — exclude current
    const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

    return (
        <div className="pt-24 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
            />

            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(29,111,232,0.08),transparent_55%)] -z-10" />
            <div className="fixed inset-0 grid-pattern opacity-15 -z-10" />

            <article className="container mx-auto px-4 md:px-6">
                {/* Breadcrumb */}
                <nav aria-label="Brotkrumen" className="mb-8 max-w-3xl mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                        Alle Beiträge
                    </Link>
                </nav>

                {/* Header */}
                <header className="max-w-3xl mx-auto mb-12">
                    <div className="flex items-center gap-3 mb-5 text-xs text-muted-foreground">
                        <span className="font-medium uppercase tracking-[0.14em] text-primary/80">
                            {post.category}
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                                    day: 'numeric', month: 'long', year: 'numeric',
                                })}
                            </time>
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readingMinutes} min
                        </span>
                    </div>
                    <h1
                        className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-5 text-foreground"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
                    >
                        {post.title}
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {post.excerpt}
                    </p>
                </header>

                {/* Body */}
                <div className="max-w-3xl mx-auto blog-content">
                    {body}
                </div>

                {/* Closing CTA */}
                <section className="max-w-3xl mx-auto mt-16 rounded-2xl border border-primary/30 bg-primary/[0.04] p-6 md:p-8 text-center">
                    <h2
                        className="text-xl md:text-2xl font-semibold mb-3"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                    >
                        Sehen Sie das live an Ihren Daten.
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground mb-5">
                        30 Minuten Beratungstermin — wir rechnen Ihr Einsparpotenzial mit echten Zahlen durch.
                    </p>
                    <Link
                        href="/#beratung"
                        className="inline-flex items-center gap-2 h-12 px-6 rounded-lg gradient-primary text-primary-foreground text-sm font-medium shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] hover:opacity-95 transition-opacity group"
                    >
                        Beratungstermin sichern
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </section>

                {/* Related */}
                {related.length > 0 && (
                    <section className="max-w-3xl mx-auto mt-16">
                        <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-5 text-center">
                            Weiterlesen
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {related.map((r) => (
                                <Link
                                    key={r.slug}
                                    href={`/blog/${r.slug}`}
                                    className="group block rounded-xl border border-border bg-card shadow-[var(--shadow-card)] p-5 hover:border-border-hover transition-colors"
                                >
                                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-primary/80 mb-2 block">
                                        {r.category}
                                    </span>
                                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                                        {r.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </div>
    );
}
