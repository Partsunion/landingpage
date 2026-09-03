import type { Metadata } from 'next';
import { PlattformSections } from './PlattformSections';

export const metadata: Metadata = {
    title: 'Die Plattform – ERP, Warenwirtschaft und Banking für den Autoteilehandel',
    description:
        'Partsunion verbindet Teileidentifikation, Verkauf, Einkauf, Lager, Gebrauchtteile, eBay, Banking und Buchungen in einer Plattform für den Autoteilehandel.',
    alternates: { canonical: 'https://partsunion.de/plattform' },
    openGraph: {
        title: 'Die Partsunion-Plattform – vom Teil bis zur Buchung',
        description:
            'ERP, WaWi, Theke, Kasse, Gebrauchtteile, Banking und Buchungen auf einer gemeinsamen Datenbasis.',
        url: 'https://partsunion.de/plattform',
    },
};

export default function PlattformPage() {
    return <PlattformSections />;
}
