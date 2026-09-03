import type { Metadata } from 'next';
import { PlatformDetailPage } from '@/components/platform/PlatformDetailPage';

export const metadata: Metadata = {
    title: 'Neuteile-Plattform: ERP für Autoteilehändler',
    description: 'Partsunion verbindet Teileanfrage, OE-Ermittlung, Angebot, Einkauf, Lager, Theke, Kasse, Rechnung und Banking für den Neuteilehandel.',
    keywords: ['ERP Autoteilehandel', 'Warenwirtschaft Autoteilehandel', 'Autoteile Software', 'Neuteilehandel Software', 'OE Nummer ermitteln', 'Teilekatalog Software', 'TSE Kasse Autoteilehandel', 'DATEV Autoteilehandel'],
    alternates: { canonical: 'https://partsunion.de/plattform/neuteile' },
    openGraph: {
        title: 'Partsunion Neuteile-Plattform',
        description: 'Von der Teileanfrage über Warenwirtschaft und Beschaffung bis zu Rechnung und Zahlung.',
        url: 'https://partsunion.de/plattform/neuteile',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
    },
};

const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Neuteile-Plattform für Autoteilehändler',
    description: 'ERP und Warenwirtschaft für den Handel mit neuen Autoteilen.',
    url: 'https://partsunion.de/plattform/neuteile',
    isPartOf: { '@id': 'https://partsunion.de/#website' },
    about: { '@id': 'https://partsunion.de/#software' },
    breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://partsunion.de/' },
            { '@type': 'ListItem', position: 2, name: 'Plattform', item: 'https://partsunion.de/plattform' },
            { '@type': 'ListItem', position: 3, name: 'Neuteile', item: 'https://partsunion.de/plattform/neuteile' },
        ],
    },
};

export default function NewPartsPlatformPage() {
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><PlatformDetailPage kind="new" /></>;
}
