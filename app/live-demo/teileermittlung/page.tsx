import type { Metadata } from 'next';
import { OemSearchPublic } from '@/components/landing/OemSearchPublic';

export const metadata: Metadata = {
    title: 'Live Demo – VIN-genaue OE-Teileermittlung',
    description:
        'Kostenlose Live-Demo: Fahrzeugschein oder VIN eingeben und die passende OE-Nummer direkt aus dem freigeschalteten Herstellerkatalog ermitteln.',
    keywords: [
        'KI Teileermittlung',
        'OEM Nummer finden',
        'Ersatzteil finden',
        'WhatsApp Bot Autoteile Demo',
        'Partsunion Demo',
    ],
    alternates: {
        canonical: 'https://partsunion.de/live-demo/teileermittlung',
    },
    openGraph: {
        title: 'Live Demo – VIN-genaue OE-Teileermittlung | Partsunion',
        description: 'Fahrzeugschein oder VIN + Teil – Partsunion prüft lizenzierte Herstellerkataloge und rät bei Varianten nicht.',
        url: 'https://partsunion.de/live-demo/teileermittlung',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: ['/opengraph-image'],
    },
};

export default function TeileermittlungDemoPage() {
    return (
        <div className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-40" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] gradient-glow opacity-30 blur-3xl pointer-events-none" />
            <div className="relative z-10">
                <div className="text-center mb-10 max-w-2xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">VIN-OE-Finder <span className="text-gradient">live</span></h1>
                    <p className="text-[var(--muted-foreground)] text-base">
                        Fahrzeugschein fotografieren oder VIN aus Feld E eingeben — wir ermitteln die passende
                        <strong className="text-[var(--foreground)]"> OE-Nummer direkt in lizenzierten Herstellerkatalogen</strong>.
                        Varianten bleiben sichtbar, statt automatisch geraten zu werden. Kostenlos, 10 Abfragen.
                    </p>
                </div>
                <OemSearchPublic />
            </div>
        </div>
    );
}
