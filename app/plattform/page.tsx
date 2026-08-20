import type { Metadata } from 'next';
import { PlattformSections } from './PlattformSections';

export const metadata: Metadata = {
    title: 'Die Plattform – Enterprise-ERP für den Autoteilehandel',
    description:
        'Die Partsunion-Plattform im Detail: Teileidentifikation, Verkauf, Einkauf, Lager und Finanzen auf einer gemeinsamen Datenbasis — mit durchgängigen Belegen, Rollen und Compliance-Prozessen.',
    alternates: { canonical: 'https://partsunion.de/plattform' },
    openGraph: {
        title: 'Die Partsunion-Plattform – Enterprise-ERP für den Teilehandel',
        description:
            'Verkauf, Beschaffung, Lager und Finanzen auf einer Datenbasis — mit digitalem Auftragseingang, nachvollziehbaren Belegketten und DATEV-Export.',
        url: 'https://partsunion.de/plattform',
    },
};

export default function PlattformPage() {
    return <PlattformSections />;
}
