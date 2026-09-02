import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { DashboardDemoCard } from '@/components/landing/DashboardDemoCard';

export const metadata: Metadata = {
    title: 'Live Demo – Partsunion ausprobieren',
    description:
        'Zwei kostenlose Live-Demos: die KI-Teileermittlung im Chat (dieselbe KI wie unser WhatsApp-Bot) und das komplette Dashboard mit Beispieldaten zum Durchklicken.',
    keywords: [
        'Partsunion Demo',
        'KI Teileermittlung Demo',
        'ERP Dashboard Demo Autoteile',
        'WhatsApp Bot Autoteile',
    ],
    alternates: { canonical: 'https://partsunion.de/live-demo' },
    openGraph: {
        title: 'Live Demo – Partsunion ausprobieren',
        description: 'KI-Teileermittlung im Chat + komplettes Dashboard mit Beispieldaten — kostenlos ausprobieren.',
        url: 'https://partsunion.de/live-demo',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: ['/opengraph-image'],
    },
};

export default function LiveDemoPage() {
    return (
        <main className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-40" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] gradient-glow opacity-30 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-accent mb-4">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Live Demo</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
                        Partsunion <span className="text-gradient">live ausprobieren</span>
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-base md:text-lg max-w-2xl mx-auto">
                        Wählen Sie, was Sie testen möchten — beides kostenlos und unverbindlich.
                    </p>
                </div>

                {/* Zwei Kacheln */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Teileermittlung */}
                    <Link href="/live-demo/teileermittlung"
                        className="group relative rounded-2xl bg-card border border-border p-7 flex flex-col shadow-[var(--shadow-card)] hover:border-border-hover hover:shadow-[var(--shadow-card-hover)] transition-all hover:-translate-y-1">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent border border-primary/15 mb-5">
                            <MessageSquare className="h-7 w-7 text-primary" />
                        </div>
                        <h2 className="text-2xl font-display font-semibold mb-2">VIN-OE-Finder</h2>
                        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed flex-1">
                            Fahrzeugschein fotografieren oder VIN aus Feld E eingeben. Wir ermitteln die
                            <strong className="text-[var(--foreground)]"> passende OE-Nummer in lizenzierten Herstellerkatalogen</strong> und zeigen offene Varianten ehrlich an. 10 Abfragen kostenlos.
                        </p>
                        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                            OEM-Nummer finden <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    </Link>

                    {/* Dashboard — E-Mail-Gate (Lead-Capture) */}
                    <DashboardDemoCard />
                </div>

                {/* Fußnote */}
                <p className="text-center text-[11px] text-[var(--muted-foreground)] mt-8">
                    Teileermittlung ohne Anmeldung · Dashboard-Zugang per E-Mail · vollständige Beispieldaten
                </p>
            </div>
        </main>
    );
}
