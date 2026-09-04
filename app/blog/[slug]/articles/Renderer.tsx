import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ArticleBlock, ArticleFaq } from '@/lib/blog-articles-data';

/**
 * Generic block renderer for data-authored articles. Plain semantic elements —
 * styling comes from the `.blog-content` wrapper in app/blog/[slug]/page.tsx.
 * Internal `linklist` blocks power topical-cluster internal linking; `faqs`
 * additionally emit FAQPage structured data matching the visible answers.
 */

function Block({ block }: { block: ArticleBlock }) {
    switch (block.type) {
        case 'h2':
            return <h2>{block.text}</h2>;
        case 'h3':
            return <h3>{block.text}</h3>;
        case 'p':
            return <p>{block.text}</p>;
        case 'quote':
            return <blockquote>{block.text}</blockquote>;
        case 'ul':
            return (
                <ul>
                    {(block.items ?? []).map((it, i) => <li key={i}>{it}</li>)}
                </ul>
            );
        case 'ol':
            return (
                <ol>
                    {(block.items ?? []).map((it, i) => <li key={i}>{it}</li>)}
                </ol>
            );
        case 'linklist':
            return (
                <div className="my-7 rounded-xl border border-border bg-muted p-5">
                    {block.text && (
                        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary/80 mb-3">
                            {block.text}
                        </div>
                    )}
                    <ul className="!m-0 !p-0 space-y-2">
                        {(block.links ?? []).map((l, i) => (
                            <li key={i} className="!m-0" style={{ listStyle: 'none' }}>
                                <Link
                                    href={l.href}
                                    className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors !no-underline"
                                >
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        default:
            return null;
    }
}

export function ArticleRenderer({ blocks, faqs }: { blocks: ArticleBlock[]; faqs?: ArticleFaq[] }) {
    const faqLd =
        faqs && faqs.length > 0
            ? {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
            }
            : null;

    return (
        <>
            {blocks.map((b, i) => <Block key={i} block={b} />)}

            {faqs && faqs.length > 0 && (
                <section className="mt-12">
                    <h2>Häufige Fragen</h2>
                    {faqs.map((f, i) => (
                        <div key={i}>
                            <h3>{f.q}</h3>
                            <p>{f.a}</p>
                        </div>
                    ))}
                </section>
            )}

            {faqLd && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            )}
        </>
    );
}
