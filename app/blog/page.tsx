import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export const metadata: Metadata = {
    title: 'Blog — Best Practices für den modernen Autoteilehandel',
    description:
        'Operativer Leitfaden, Tech-Deep-Dives und Branchen-Analysen für Teilehändler: Retouren senken, WhatsApp-Bot einführen, OEM-Pipeline verstehen.',
    keywords: [
        'Autoteilehandel Blog',
        'Teilehandel Best Practices',
        'KI Automotive Aftermarket',
        'WhatsApp Bot Aftermarket',
        'Teilekatalog Cross-Reference',
    ],
    alternates: { canonical: 'https://partsunion.de/blog' },
    openGraph: {
        title: 'Blog | Partsunion',
        description: 'Best Practices, Tech-Deep-Dives und Branchen-Analysen für den modernen Teilehandel.',
        url: 'https://partsunion.de/blog',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: ['/opengraph-image'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | Partsunion',
        description: 'Best Practices, Tech-Deep-Dives und Branchen-Analysen für den modernen Teilehandel.',
        images: ['/opengraph-image'],
    },
};

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://partsunion.de/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://partsunion.de/blog' },
    ],
};

const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Partsunion Blog',
    description: 'Best Practices für den modernen Autoteilehandel.',
    url: 'https://partsunion.de/blog',
    publisher: { '@id': 'https://partsunion.de/#organization' },
    blogPost: blogPosts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `https://partsunion.de/blog/${p.slug}`,
        datePublished: p.publishedAt,
        dateModified: p.updatedAt,
    })),
};

export default function BlogIndex() {
    return (
        <div className="pt-24 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
            />

            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(29,111,232,0.08),transparent_55%)] -z-10" />
            <div className="fixed inset-0 grid-pattern opacity-15 -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                {/* Hero */}
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border text-xs font-medium text-muted-foreground mb-5">
                        Blog
                    </span>
                    <h1
                        className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-5"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.035em', lineHeight: 1.05 }}
                    >
                        Best Practices für den<br />
                        <span className="text-gradient">modernen Teilehandel.</span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        Operativer Leitfaden, Tech-Deep-Dives und Branchen-Analysen — geschrieben
                        von Leuten, die selbst in der Branche stehen.
                    </p>
                </div>

                {/* Posts grid */}
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {blogPosts.map((post) => (
                        <SpotlightCard key={post.slug}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="flex h-full flex-col p-6"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-primary/80">
                                        {post.category}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground/50">·</span>
                                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                                        <Clock className="h-2.5 w-2.5" />
                                        {post.readingMinutes} min
                                    </span>
                                </div>

                                <h2
                                    className="text-base md:text-lg font-semibold mb-3 text-foreground leading-snug"
                                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
                                >
                                    {post.title}
                                </h2>

                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-5 flex-1">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <time
                                        className="text-[10px] tabular-nums text-muted-foreground"
                                        style={{ fontFamily: 'var(--font-mono)' }}
                                        dateTime={post.publishedAt}
                                    >
                                        {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                                            day: '2-digit', month: 'short', year: 'numeric',
                                        })}
                                    </time>
                                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover/spot:text-primary" />
                                </div>
                            </Link>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
