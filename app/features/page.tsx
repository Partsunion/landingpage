import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Layers3 } from 'lucide-react';
import { featureData, getValuePropositions, getCoreFeatures } from '@/lib/feature-data';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export const metadata: Metadata = {
    title: 'Module — Enterprise-ERP für den Autoteilehandel',
    description:
        'Alle Module des spezialisierten Enterprise-ERP: Teileidentifikation, Verkauf, Einkauf, Warenwirtschaft, CRM, Finanzen, Faktura und digitale Anfragebearbeitung.',
    keywords: [
        'Autoteile Software Features',
        'ERP Module Autoteilehandel',
        'digitale Anfragebearbeitung Autoteile',
        'OEM Ermittlung Software',
        'Warenwirtschaft Autoteile',
        'Teilekatalog Cross-Reference',
    ],
    alternates: { canonical: 'https://partsunion.de/features' },
    openGraph: {
        title: 'Module — Enterprise-ERP für Autoteilehändler | Partsunion',
        description:
            'Teileidentifikation, Verkauf, Einkauf, Warenwirtschaft, Retouren, Reklamationen und Finanzen — alle Partsunion-Module im Überblick.',
        url: 'https://partsunion.de/features',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: ['/opengraph-image'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Module — Enterprise-ERP für Autoteilehändler | Partsunion',
        description: 'Alle Funktionen von Partsunion: Teileidentifikation, Einkauf, Verkauf, Warenwirtschaft und Finanzen.',
        images: ['/opengraph-image'],
    },
};

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://partsunion.de/' },
        { '@type': 'ListItem', position: 2, name: 'Module', item: 'https://partsunion.de/features' },
    ],
};

const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Partsunion Module',
    itemListElement: featureData.map((f, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://partsunion.de/features/${f.slug}`,
        name: f.title,
    })),
};

export default function FeaturesPage() {
    const valueProps = getValuePropositions();
    const coreFeatures = getCoreFeatures();

    return (
        <div className="pt-24 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
            />

            {/* ── Hero ──────────────────────────────────────────────────── */}
            <section className="py-20 md:py-28 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(29,111,232,0.10),transparent_55%)] -z-10" />
                <div className="absolute inset-0 grid-pattern opacity-20 -z-10" />

                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-5">
                        <Layers3 className="h-3 w-3" />
                        Funktionsübersicht
                    </span>
                    <h1
                        className="text-4xl md:text-6xl font-semibold mb-6"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.035em' }}
                    >
                        Alle Module für Ihren <span className="text-gradient">modernen Teilehandel.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Teileidentifikation, Einkauf, Verkauf, Warenwirtschaft, CRM und Finanzen —
                        durchgängig auf einer gemeinsamen Datenbasis.
                    </p>
                </div>
            </section>

            {/* ── Value Propositions ────────────────────────────────────── */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-baseline justify-between mb-8 max-w-6xl mx-auto">
                        <h2
                            className="text-2xl md:text-3xl font-semibold"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                        >
                            Was Sie davon haben
                        </h2>
                        <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground hidden md:inline">
                            {valueProps.length} Vorteile
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
                        {valueProps.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <SpotlightCard key={feature.slug}>
                                    <Link
                                        href={`/features/${feature.slug}`}
                                        className="flex h-full flex-col p-6"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="h-9 w-9 rounded-lg flex items-center justify-center border border-primary/15 bg-accent text-primary">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover/spot:text-primary" />
                                        </div>
                                        <h3
                                            className="text-base md:text-lg font-semibold mb-2 text-foreground"
                                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
                                        >
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                            {feature.description}
                                        </p>
                                    </Link>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Core Features ─────────────────────────────────────────── */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-baseline justify-between mb-8 max-w-6xl mx-auto">
                        <h2
                            className="text-2xl md:text-3xl font-semibold"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                        >
                            Wie es funktioniert
                        </h2>
                        <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground hidden md:inline">
                            {coreFeatures.length} Module
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
                        {coreFeatures.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <SpotlightCard key={feature.slug}>
                                    <Link
                                        href={`/features/${feature.slug}`}
                                        className="flex h-full flex-col p-6"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="h-9 w-9 rounded-lg flex items-center justify-center border border-primary/15 bg-accent text-primary">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover/spot:text-primary" />
                                        </div>
                                        <h3
                                            className="text-base md:text-lg font-semibold mb-2 text-foreground"
                                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
                                        >
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                            {feature.description}
                                        </p>
                                    </Link>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── CTA ───────────────────────────────────────────────────── */}
            <section className="py-20 md:py-24 mt-8 border-t border-border">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <h2
                        className="text-3xl md:text-4xl font-semibold mb-4"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                    >
                        Passt Partsunion zu Ihrer Systemlandschaft?
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Datenübernahme, Rollen, Prozessvarianten und benötigte Anbindungen werden
                        vor dem Produktivstart gemeinsam abgegrenzt und geprüft.
                    </p>
                    <Link
                        href="/#beratung"
                        className="inline-flex items-center gap-2 h-12 px-6 text-base font-medium gradient-primary text-primary-foreground rounded-lg shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] transition-all group"
                    >
                        Beratungstermin sichern
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
