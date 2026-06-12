import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { featureData, getValuePropositions, getCoreFeatures } from '@/lib/feature-data';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export const metadata: Metadata = {
    title: 'Features — KI-Toolchain für Autoteilehändler',
    description:
        'WhatsApp-Bot, OEM-Ermittlung aus Fahrzeugschein, Warenwirtschaft, Retourenreduktion, Multi-Channel-Sync — alle Funktionen von Partsunion auf einer Seite.',
    keywords: [
        'Autoteile Software Features',
        'KI Autoteile Funktionen',
        'WhatsApp Bot Autoteile',
        'OEM Ermittlung Software',
        'Warenwirtschaft Autoteile',
        'Teilekatalog Cross-Reference',
    ],
    alternates: { canonical: 'https://www.partsunion.de/features' },
    openGraph: {
        title: 'Features — Die KI-Toolchain für Autoteilehändler | Partsunion',
        description:
            'WhatsApp-Bot, OEM-Ermittlung, Warenwirtschaft, Retouren-Management — alle Module von Partsunion im Überblick.',
        url: 'https://www.partsunion.de/features',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: ['/opengraph-image'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Features — Die KI-Toolchain für Autoteilehändler | Partsunion',
        description: 'Alle Funktionen von Partsunion: WhatsApp-Bot, OEM-Ermittlung, Warenwirtschaft.',
        images: ['/opengraph-image'],
    },
};

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.partsunion.de/' },
        { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://www.partsunion.de/features' },
    ],
};

const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Partsunion Features',
    itemListElement: featureData.map((f, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://www.partsunion.de/features/${f.slug}`,
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
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(59,130,246,0.10),transparent_55%)] -z-10" />
                <div className="absolute inset-0 grid-pattern opacity-20 -z-10" />

                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border/60 text-xs font-medium text-muted-foreground mb-5">
                        <Sparkles className="h-3 w-3" />
                        Funktionsübersicht
                    </span>
                    <h1
                        className="text-4xl md:text-6xl font-semibold mb-6"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.035em' }}
                    >
                        Alle Module für Ihren <span className="text-gradient">modernen Teilehandel.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Sechs Vorteile, sechs Kern-Module — zusammen ergeben sie den vollständigen
                        Sales-Workspace für Autoteilehändler.
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
                                            <div className="h-9 w-9 rounded-lg flex items-center justify-center border border-border/60 bg-[rgba(15,23,42,0.4)] text-primary">
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
                                            <div className="h-9 w-9 rounded-lg flex items-center justify-center border border-border/60 bg-[rgba(15,23,42,0.4)] text-primary">
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
            <section className="py-20 md:py-24 mt-8 border-t border-border/40">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <h2
                        className="text-3xl md:text-4xl font-semibold mb-4"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                    >
                        Fehlt etwas? Bauen wir an.
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Custom-Integrationen für regionale Lieferanten, proprietäre ERP-Systeme
                        und Branchen-Spezialitäten sind Teil des Onboarding-Pakets.
                    </p>
                    <Link
                        href="/#beratung"
                        className="inline-flex items-center gap-2 h-12 px-6 text-base font-medium gradient-primary text-white rounded-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group"
                    >
                        Beratungstermin sichern
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
