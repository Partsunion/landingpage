import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, TrendingUp, FileCode2, HelpCircle, Quote } from 'lucide-react';
import { featureData } from '@/lib/feature-data';
import { featureContent } from '@/lib/feature-content';
import { Button } from '@/components/ui/Button';

import { FeaturePreview } from '@/components/landing/FeaturePreview';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return featureData.map((feature) => ({ slug: feature.slug }));
}

/**
 * Per-feature SEO title tailored to user search intent. Falls back to
 * the feature title if no specific override is defined.
 */
const seoTitles: Record<string, string> = {
    'oem-ermittlung': 'OEM-Nummern in Sekunden finden — KI für Autoteilehändler',
    'whatsapp-bot': '24/7 WhatsApp-Bot für Autoteilehändler',
    'automatische-rechnungserstellung': 'Rechnung & Lieferschein automatisch erstellen',
    'bestellprozess': 'Automatischer Bestellprozess für Autoteile',
    'bestandssynchronisation': 'Echtzeit-Bestandssynchronisation: eBay, Webshop, Theke',
    'retourenmanagement': 'Retouren-Management: Retourenquote deutlich senken',
    'skalierbarkeit': '3× Anfragenvolumen ohne neuen Mitarbeiter',
    '24-7-einsatzbereit': '24/7 verfügbarer Sales-Workspace',
    'geschwindigkeit': 'Angebot in 8 Sekunden statt 15 Minuten',
    'sinkende-retouren': 'Retourenquote drastisch senken — KI-OEM-Matching',
    'sprachuebergreifend': 'Mehrsprachiger WhatsApp-Bot für Autoteilehändler',
    'team-entlastung': 'Routine-Anfragen automatisieren — Team entlasten',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const finalParams = await params;
    const feature = featureData.find((f) => f.slug === finalParams.slug);
    if (!feature) return { title: 'Feature nicht gefunden' };

    const url = `https://www.partsunion.de/features/${feature.slug}`;
    const seoTitle = seoTitles[feature.slug] ?? feature.title;
    const fullTitle = `${seoTitle} | Partsunion`;

    return {
        title: seoTitle,
        description: feature.description,
        keywords: [
            feature.title,
            'Autoteilehändler',
            'Autoteile Software',
            'KI Autoteile',
            'Partsunion',
        ],
        alternates: { canonical: url },
        openGraph: {
            title: fullTitle,
            description: feature.description,
            url,
            type: 'article',
            locale: 'de_DE',
            siteName: 'Partsunion',
            // Kein explicit images-Array → Next nutzt opengraph-image.tsx
            // aus diesem Route-Segment (per-feature gerendert).
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: feature.description,
        },
    };
}

export default async function FeatureDetailPage({ params }: Props) {
    const finalParams = await params;
    const feature = featureData.find((f) => f.slug === finalParams.slug);
    if (!feature) notFound();

    const Icon = feature.icon;
    const isValueProp = feature.category === 'value';
    const seoTitle = seoTitles[feature.slug] ?? feature.title;
    const content = featureContent[feature.slug] ?? {};

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.partsunion.de/' },
            { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://www.partsunion.de/features' },
            { '@type': 'ListItem', position: 3, name: feature.title, item: `https://www.partsunion.de/features/${feature.slug}` },
        ],
    };

    // Service / Product schema — tells Google "this is a SaaS feature"
    const serviceLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: feature.title,
        description: feature.description,
        serviceType: feature.title,
        provider: { '@id': 'https://www.partsunion.de/#organization' },
        areaServed: 'DE',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: feature.title,
            itemListElement: feature.features.map((f, i) => ({
                '@type': 'Offer',
                position: i + 1,
                itemOffered: { '@type': 'Service', name: f },
            })),
        },
    };

    // Related features — power internal linking + topical authority
    const related = featureData
        .filter((f) => f.slug !== feature.slug && f.category === feature.category)
        .slice(0, 3);

    // FAQ-Schema (only when this feature has FAQs)
    const faqLd = content.faqs && content.faqs.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: content.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
        }
        : null;

    return (
        <div className="pt-24 pb-20 overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
            />
            {faqLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
                />
            )}

            {/* Background */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(59,130,246,0.08),transparent_55%)] -z-10" />
            <div className="fixed inset-0 grid-pattern opacity-15 -z-10" />

            <article>
                <div className="container mx-auto px-4 md:px-6">
                    {/* Breadcrumb */}
                    <nav aria-label="Brotkrumen" className="mb-8 max-w-7xl mx-auto">
                        <Link
                            href="/features"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                            Alle Features
                        </Link>
                    </nav>

                    {/* ═══ HERO: 2-col (text left, preview right) ═══ */}
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start max-w-7xl mx-auto mb-20 md:mb-28">
                        {/* Left — copy */}
                        <header className="lg:col-span-7">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="h-10 w-10 rounded-lg flex items-center justify-center border border-border/60 bg-[rgba(15,23,42,0.4)] text-primary">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary/80">
                                    {isValueProp ? 'Vorteil' : 'Kern-Modul'}
                                </span>
                            </div>
                            <h1
                                className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-5 text-foreground"
                                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.035em', lineHeight: 1.05 }}
                            >
                                {feature.title}
                            </h1>
                            {content.subtitle && (
                                <p className="text-lg md:text-xl text-foreground/85 leading-relaxed max-w-2xl mb-4 font-medium">
                                    {content.subtitle}
                                </p>
                            )}
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
                                {feature.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href="/#beratung">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="h-12 px-6 text-sm gradient-primary shadow-lg shadow-primary/30 group w-full sm:w-auto"
                                    >
                                        Beratungstermin sichern
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                    </Button>
                                </Link>
                                <Link
                                    href="/features"
                                    className="inline-flex items-center justify-center h-12 px-5 rounded-lg border border-border/60 hover:border-border text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                                >
                                    Alle Features
                                </Link>
                            </div>
                        </header>

                        {/* Right — feature-specific preview */}
                        <aside className="lg:col-span-5 space-y-3">
                            {content.preview ? (
                                <FeaturePreview data={content.preview} />
                            ) : (
                                <div className="rounded-xl border border-border/60 bg-[rgba(10,15,26,0.6)] p-10 flex flex-col items-center justify-center text-muted-foreground/30 min-h-[280px]">
                                    <Icon size={64} className="mb-3" />
                                    <p className="text-[11px] uppercase tracking-[0.14em] font-mono">
                                        {feature.slug}
                                    </p>
                                </div>
                            )}
                            <p className="text-center text-[11px] text-muted-foreground/60">
                                Repräsentative Daten · Echte Logs im Beratungstermin
                            </p>
                        </aside>
                    </div>
                </div>

                {/* ═══ CONTENT: single-column, max-w-3xl centered ═══ */}
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto space-y-16 md:space-y-20">

                        {/* What you get */}
                        <section aria-labelledby="features-h2">
                            <h2
                                id="features-h2"
                                className="text-xl md:text-2xl font-semibold mb-5"
                                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                            >
                                Was Sie konkret bekommen
                            </h2>
                            <ul className="grid sm:grid-cols-2 gap-3">
                                {feature.features.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3 p-4 rounded-lg border border-border/60 bg-[rgba(15,23,42,0.3)]"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden />
                                        <span className="text-sm text-foreground/85 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* How it works */}
                        <section aria-labelledby="how-h2">
                            <h2
                                id="how-h2"
                                className="text-xl md:text-2xl font-semibold mb-4"
                                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                            >
                                So funktioniert&apos;s
                            </h2>
                            <div className="rounded-2xl border border-border/60 bg-[rgba(15,23,42,0.3)] p-6">
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    {feature.technicalDetails}
                                </p>
                            </div>
                        </section>

                        {/* The benefit (closing argument) */}
                        <section aria-labelledby="benefit-h2" className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-6 md:p-8">
                            <h2
                                id="benefit-h2"
                                className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary mb-3"
                            >
                                <Sparkles className="h-3.5 w-3.5" />
                                Was das für Ihr Geschäft heißt
                            </h2>
                            <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-medium">
                                {feature.benefit}
                            </p>
                        </section>

                        {/* Use case story — explicitly labelled MODEL scenario, not a
                            customer reference. Partsunion is pre-launch and has no
                            published customer references; presenting these as real
                            would be irreführende Werbung (UWG §5). */}
                        {content.useCase && (
                            <section aria-labelledby="usecase-h2" className="rounded-2xl border border-border/60 bg-[rgba(15,23,42,0.3)] p-6 md:p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <Quote className="h-4 w-4 text-primary" aria-hidden />
                                    <h2
                                        id="usecase-h2"
                                        className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
                                    >
                                        Beispiel-Szenario · Modellrechnung
                                    </h2>
                                </div>
                                <h3
                                    className="text-lg md:text-xl font-semibold mb-3 text-foreground"
                                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                                >
                                    {content.useCase.title}
                                </h3>
                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                                    {content.useCase.body}
                                </p>
                                {content.useCase.metrics && content.useCase.metrics.length > 0 && (
                                    <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border/60">
                                        {content.useCase.metrics.map((m) => (
                                            <div key={m.label}>
                                                <div
                                                    className="text-lg md:text-xl font-semibold text-foreground tabular-nums"
                                                    style={{ fontFamily: 'var(--font-mono)' }}
                                                >
                                                    {m.value}
                                                </div>
                                                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground mt-1">
                                                    {m.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <p className="text-[11px] text-muted-foreground/60 leading-relaxed mt-5 pt-4 border-t border-border/40 italic">
                                    {content.useCase.disclaimer ??
                                        'Illustratives Modell-Szenario auf Basis von Branchen-Benchmarks und internen Systemtests — keine reale Kundenreferenz. Partsunion befindet sich im Markteintritt; veröffentlichte Kundenkennzahlen liegen noch nicht vor. Die genannten Werte sind Zielgrößen, keine zugesicherten Ergebnisse.'}
                                </p>
                            </section>
                        )}

                        {/* Specs */}
                        {content.specs && content.specs.length > 0 && (
                            <section aria-labelledby="specs-h2">
                                <h2
                                    id="specs-h2"
                                    className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-4"
                                >
                                    <FileCode2 className="h-3.5 w-3.5" />
                                    Technische Specs
                                </h2>
                                <dl className="rounded-2xl border border-border/60 bg-[rgba(15,23,42,0.3)] divide-y divide-border/60">
                                    {content.specs.map((spec) => (
                                        <div
                                            key={spec.label}
                                            className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 px-4 md:px-6 py-3.5"
                                        >
                                            <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground self-center">
                                                {spec.label}
                                            </dt>
                                            <dd
                                                className="text-sm text-foreground/90"
                                                style={{ fontFamily: 'var(--font-mono)' }}
                                            >
                                                {spec.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </section>
                        )}

                        {/* FAQs */}
                        {content.faqs && content.faqs.length > 0 && (
                            <section aria-labelledby="faqs-h2">
                                <h2
                                    id="faqs-h2"
                                    className="flex items-center gap-2 text-xl md:text-2xl font-semibold mb-5"
                                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                                >
                                    <HelpCircle className="h-5 w-5 text-primary" aria-hidden />
                                    Häufige Fragen
                                </h2>
                                <div className="space-y-3">
                                    {content.faqs.map((faq, i) => (
                                        <details
                                            key={i}
                                            className="group rounded-xl border border-border/60 bg-[rgba(15,23,42,0.3)] open:border-primary/40 transition-colors"
                                        >
                                            <summary className="flex items-start gap-3 px-5 py-4 cursor-pointer list-none">
                                                <span className="flex-1 text-sm md:text-base font-medium text-foreground group-open:text-primary transition-colors">
                                                    {faq.q}
                                                </span>
                                                <span
                                                    aria-hidden
                                                    className="mt-1 text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                                                    style={{ fontFamily: 'var(--font-mono)' }}
                                                >
                                                    +
                                                </span>
                                            </summary>
                                            <div className="px-5 pb-5 -mt-1">
                                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Closing CTA-Section, balanced */}
                        <section className="rounded-2xl border border-border/60 bg-[rgba(15,23,42,0.4)] p-8 md:p-10 text-center">
                            <h2
                                className="text-2xl md:text-3xl font-semibold mb-3"
                                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                            >
                                Sehen Sie {feature.title} live an Ihren echten Daten.
                            </h2>
                            <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-md mx-auto">
                                30 Minuten genügen, um zu beurteilen ob es für Ihren Betrieb passt.
                            </p>
                            <Link href="/#beratung">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="h-12 px-7 text-sm gradient-primary shadow-lg shadow-primary/30 group"
                                >
                                    Beratungstermin sichern
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </Button>
                            </Link>
                        </section>

                        {/* Related features — internal linking power */}
                        {related.length > 0 && (
                            <section aria-labelledby="related-h2">
                                <h2
                                    id="related-h2"
                                    className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-5 text-center"
                                >
                                    Verwandte {isValueProp ? 'Vorteile' : 'Module'}
                                </h2>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    {related.map((r) => {
                                        const RIcon = r.icon;
                                        return (
                                            <Link
                                                key={r.slug}
                                                href={`/features/${r.slug}`}
                                                className="group flex flex-col gap-2 p-4 rounded-lg border border-border/60 hover:border-border transition-colors bg-[rgba(15,23,42,0.3)]"
                                            >
                                                <RIcon className="h-4 w-4 text-primary" />
                                                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                                    {r.title}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </article>
        </div>
    );
}
