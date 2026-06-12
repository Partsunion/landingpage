import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, Sparkles } from 'lucide-react';
import { RoiCalculator } from './RoiCalculator';

export const metadata: Metadata = {
    title: 'ROI-Rechner — Wie viel sparen Sie mit Partsunion?',
    description:
        'Berechnen Sie Ihr Einsparpotenzial mit Partsunion. Schieber für Anfragen pro Tag und Retourenquote — live errechnete Marge-Verbesserung und Zeit-Gewinn.',
    keywords: [
        'Partsunion Preise',
        'Partsunion Kosten',
        'ROI Autoteile Software',
        'KI Autoteile Preis',
        'WhatsApp Bot Autoteile Kosten',
        'Einsparpotenzial Teilehändler',
    ],
    alternates: { canonical: 'https://www.partsunion.de/pricing' },
    openGraph: {
        title: 'ROI-Rechner — Wie viel sparen Sie mit Partsunion?',
        description:
            'Schieben Sie die Slider, sehen Sie live Ihr Einsparpotenzial — bevor Sie überhaupt mit uns sprechen.',
        url: 'https://www.partsunion.de/pricing',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: ['/opengraph-image'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ROI-Rechner — Wie viel sparen Sie mit Partsunion?',
        description: 'Live-Berechnung von Marge-Plus und Zeit-Gewinn pro Jahr.',
        images: ['/opengraph-image'],
    },
};

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.partsunion.de/' },
        { '@type': 'ListItem', position: 2, name: 'ROI-Rechner', item: 'https://www.partsunion.de/pricing' },
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
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(59,130,246,0.08),transparent_55%)] -z-10" />
            <div className="fixed inset-0 grid-pattern opacity-15 -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border/60 text-xs font-medium text-muted-foreground mb-5">
                        <Calculator className="h-3 w-3" />
                        ROI-Rechner
                    </span>
                    <h1
                        className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-5"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.035em', lineHeight: 1.05 }}
                    >
                        Was kostet Partsunion?<br />
                        <span className="text-gradient">Weniger als Sie heute verlieren.</span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        Bewegen Sie die Schieber für Ihre Eckdaten — die Berechnung läuft live.
                        Konkretes Angebot bekommen Sie im Beratungstermin, abgestimmt auf Ihr Setup.
                    </p>
                </div>

                {/* Calculator */}
                <div className="max-w-3xl mx-auto">
                    <RoiCalculator />
                </div>

                {/* Below-Calculator CTA */}
                <div className="max-w-2xl mx-auto mt-12 md:mt-16 text-center">
                    <div className="inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-5">
                        <Sparkles className="h-3 w-3 text-primary" />
                        So geht&apos;s weiter
                    </div>
                    <h2
                        className="text-2xl md:text-3xl font-semibold mb-4"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                    >
                        Konkretes Angebot in 30 Minuten.
                    </h2>
                    <p className="text-muted-foreground mb-7 text-sm md:text-base">
                        Wir zeigen Ihnen Partsunion live an Ihren echten Fahrzeugen, rechnen
                        Ihr Einsparpotenzial mit Ihren Originaldaten durch und Sie bekommen
                        ein schriftliches Angebot mit Festpreis — bevor Sie sich entscheiden.
                    </p>
                    <Link
                        href="/#beratung"
                        className="inline-flex items-center gap-2 h-12 px-6 rounded-lg gradient-primary text-white text-sm font-medium shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-shadow group"
                    >
                        Beratungstermin sichern
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
