import type { Metadata } from 'next';
import { PlatformDetailPage } from '@/components/platform/PlatformDetailPage';

export const metadata: Metadata = {
    title: 'Gebrauchtteile-Software für Autoverwerter',
    description: 'Warenwirtschaft für Autoverwerter und Gebrauchtteilehändler: Einzelstücke verwalten, Marktpreise prüfen, Inserate vorbereiten und eBay anbinden.',
    keywords: ['Gebrauchtteile Software', 'Autoverwerter Software', 'Autoverwertung Warenwirtschaft', 'Gebrauchtteilehandel Warenwirtschaft', 'Software Gebrauchtteilehändler', 'Autoteile eBay verkaufen', 'eBay Motors Teile einstellen', 'Gebrauchtteile Preisermittlung', 'Einzelstückverwaltung Autoteile', 'Differenzbesteuerung Gebrauchtteile'],
    alternates: { canonical: 'https://partsunion.de/plattform/gebrauchtteile' },
    openGraph: {
        title: 'Partsunion Gebrauchtteile-Plattform',
        description: 'Vom ausgebauten Einzelstück über Preisermittlung und Inserat bis zu Verkauf und Rechnung.',
        url: 'https://partsunion.de/plattform/gebrauchtteile',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
    },
};

const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Gebrauchtteile-Plattform für Autoteilehändler',
    description: 'Warenwirtschaft für gebrauchte Autoteile, Einzelstücke, Preisermittlung und Inserate.',
    url: 'https://partsunion.de/plattform/gebrauchtteile',
    isPartOf: { '@id': 'https://partsunion.de/#website' },
    about: { '@id': 'https://partsunion.de/#software' },
    breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://partsunion.de/' },
            { '@type': 'ListItem', position: 2, name: 'Plattform', item: 'https://partsunion.de/plattform' },
            { '@type': 'ListItem', position: 3, name: 'Gebrauchtteile', item: 'https://partsunion.de/plattform/gebrauchtteile' },
        ],
    },
};

export default function UsedPartsPlatformPage() {
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><PlatformDetailPage kind="used" /></>;
}
