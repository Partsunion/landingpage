import type { Metadata } from 'next';
import { BotDemo } from '@/components/landing/BotDemo';

export const metadata: Metadata = {
    title: 'Kundenservice-Demo – OE-Teileanfrage im Chat',
    description:
        'Partsunion Kundenservice live testen: Kundendaten erfassen, Fahrzeug und Teil anfragen, OE-Nummer ermitteln und ein unverbindliches Demo-Angebot im Händler-Dashboard sehen.',
    alternates: { canonical: 'https://bot.partsunion.de' },
    robots: { index: false, follow: false },
    openGraph: {
        title: 'Partsunion Kundenservice-Demo',
        description: 'Vom Kundenchat bis zum sichtbaren Auftrag mit OE-Nummer und Demo-Angebot.',
        url: 'https://bot.partsunion.de',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: ['/opengraph-image'],
    },
};

export default function BotDemoPage() {
    return <BotDemo />;
}
