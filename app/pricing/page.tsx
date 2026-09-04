import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, ClipboardCheck } from 'lucide-react';
import { RoiCalculator } from './RoiCalculator';

export const metadata: Metadata = {
    title: 'Business-Case-Rechner für Autoteilehändler',
    description:
        'Vergleichen Sie heutigen Prozessaufwand und ein eigenes Zielszenario — ausschließlich mit Ihren Volumen-, Zeit-, Kosten- und Budgetannahmen.',
    keywords: [
        'Partsunion Preise',
        'Partsunion Kosten',
        'ROI Autoteile Software',
        'ERP Autoteile Preis',
        'Warenwirtschaft Autoteile Kosten',
        'Einsparpotenzial Teilehändler',
    ],
    alternates: { canonical: 'https://partsunion.de/pricing' },
    openGraph: {
        title: 'Business-Case-Rechner für Autoteilehändler',
        description:
            'Prozesskosten mit eigenen Volumen-, Zeit- und Budgetannahmen transparent vergleichen.',
        url: 'https://partsunion.de/pricing',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: ['/opengraph-image'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Business-Case-Rechner für Autoteilehändler',
        description: 'Heutigen Prozessaufwand und eigenes Zielszenario transparent vergleichen.',
        images: ['/opengraph-image'],
    },
};

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://partsunion.de/' },
        { '@type': 'ListItem', position: 2, name: 'ROI-Rechner', item: 'https://partsunion.de/pricing' },
    ],
};

export default function PricingPage() {
    return (
        <div className="pt-24 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            {/* Background */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(29,111,232,0.08),transparent_55%)] -z-10" />
            <div className="fixed inset-0 grid-pattern opacity-15 -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border text-xs font-medium text-muted-foreground mb-5">
                        <Calculator className="h-3 w-3" />
                        Business-Case-Rechner
                    </span>
                    <h1
                        className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-5"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.035em', lineHeight: 1.05 }}
                    >
                        Ihre Prozesse. Ihre Annahmen.<br />
                        <span className="text-gradient">Ein transparenter Business Case.</span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        Vergleichen Sie heutigen Aufwand und ein eigenes Zielszenario. Der Rechner
                        verwendet keine pauschalen Automatisierungs-, Retouren- oder Umsatzversprechen.
                    </p>
                </div>

                {/* Calculator */}
                <div className="max-w-3xl mx-auto">
                    <RoiCalculator />
                </div>

                {/* Below-Calculator CTA */}
                <div className="max-w-2xl mx-auto mt-12 md:mt-16 text-center">
                    <div className="inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-5">
                        <ClipboardCheck className="h-3 w-3 text-primary" />
                        Nächster Schritt
                    </div>
                    <h2
                        className="text-2xl md:text-3xl font-semibold mb-4"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                    >
                        Annahmen im Pilotprozess validieren.
                    </h2>
                    <p className="text-muted-foreground mb-7 text-sm md:text-base">
                        Wir grenzen einen repräsentativen Prozess ab, messen Ist- und Zielwerte
                        und erstellen daraus ein schriftliches Angebot für Einführung und Betrieb.
                    </p>
                    <Link
                        href="/#beratung"
                        className="inline-flex items-center gap-2 h-12 px-6 rounded-lg gradient-primary text-primary-foreground text-sm font-medium shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] hover:opacity-95 transition-opacity group"
                    >
                        Beratungstermin sichern
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
