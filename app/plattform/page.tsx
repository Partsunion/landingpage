import type { Metadata } from 'next';
import { PlattformSections } from './PlattformSections';

export const metadata: Metadata = {
    title: 'ERP für Neu- & Gebrauchtteilehandel',
    description:
        'Partsunion verbindet Neuteilehandel und Gebrauchtteilehandel mit Teileidentifikation, Verkauf, Einkauf, Lager, eBay, Kasse, Banking und Buchungen.',
    keywords: ['Autoteilehandel Software', 'ERP Autoteilehandel', 'Warenwirtschaft Autoteilehandel', 'Neuteile Software', 'Gebrauchtteile Software', 'Teilehandel ERP', 'eBay Autoteile Software'],
    alternates: { canonical: 'https://partsunion.de/plattform' },
    openGraph: {
        title: 'Partsunion Plattform für Neu- und Gebrauchtteile',
        description:
            'ERP, WaWi, Theke, Kasse, Gebrauchtteile, Banking und Buchungen auf einer gemeinsamen Datenbasis.',
        url: 'https://partsunion.de/plattform',
    },
};

const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Partsunion Plattform für Neuteile und Gebrauchtteile',
    description: 'ERP und Warenwirtschaft für den Autoteilehandel mit getrennten Abläufen für Neuware und gebrauchte Teile.',
    url: 'https://partsunion.de/plattform',
    isPartOf: { '@id': 'https://partsunion.de/#website' },
    about: { '@id': 'https://partsunion.de/#software' },
};

export default function PlattformPage() {
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><PlattformSections /></>;
}
