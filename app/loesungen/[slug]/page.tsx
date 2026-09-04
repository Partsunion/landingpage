import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SolutionPage } from '@/components/solutions/SolutionPage';
import { getSolutionPage, solutionPages } from '@/lib/solutions-data';

const seoDescriptions: Record<string, string> = {
    'anfragen-whatsapp': 'Partsunion bündelt Anfragen aus WhatsApp, Telefon, Theke und E-Mail, verbindet Kunde, Fahrzeug und Teilebedarf und bereitet das Angebot vor.',
    'oe-ermittlung': 'Automatische OE-Ermittlung: Fahrzeugschein auslesen, VIN decodieren und OE-Nummern ermitteln. 56 Marken mit Nutzungsrechten, 80 % weltweite VIN-Decodierung.',
    'angebot-auftrag': 'Partsunion führt bestätigte Anfragedaten ohne Neuerfassung in Angebot, Auftrag, Rechnung und Zahlung weiter – auch im WhatsApp-Ablauf.',
    'einkauf-disposition': 'Partsunion erkennt Fehlmengen, prüft Bestand und offene Zugänge, vergleicht Lieferanten und erstellt einen kontrollierten Bestellentwurf.',
    'bestand-lager': 'Partsunion führt Mengenartikel und gebrauchte Teile mit Reservierung, Lagerort, Einkauf, Verkauf und Bewegungsjournal in einer WaWi.',
    'retouren': 'Partsunion verbindet Retoure oder Reklamation mit Artikel, Ursprungsbeleg, Grund, Zustand, Fotos, Bestand und weiterer Bearbeitung.',
    'finanzen-kasse': 'Partsunion verbindet Verkauf und Einkauf mit Rechnung, Zahlung, offenen Posten, Banking und Kasse auf einer gemeinsamen Belegbasis.',
    'betriebsassistent': 'Der Partsunion Betriebsassistent beantwortet Fragen zu Produkten, Bestand, Aufträgen und Zahlen und bereitet bestätigbare Arbeitsschritte vor.',
    'haendler-app': 'Mit der Partsunion Händler-App werden Artikelnummern, Fotos, Fahrzeuge, Retouren und Reklamationen direkt am Teil erfasst und weiterbearbeitet.',
};

const seoTitles: Record<string, string> = {
    'finanzen-kasse': 'Kassensystem für Autoteilehandel: WaWi & ERP',
    'oe-ermittlung': 'OE-Ermittlung aus VIN & Fahrzeugschein',
    'retouren': 'Retouren & Reklamationen im Autoteilehandel',
    'betriebsassistent': 'Betriebsassistent im ERP-Arbeitsablauf',
};

export const dynamicParams = false;

export function generateStaticParams() {
    return solutionPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const page = getSolutionPage(slug);
    if (!page) return {};
    return {
        title: seoTitles[page.slug] ?? `${page.navLabel} für den Autoteilehandel`,
        description: seoDescriptions[page.slug] ?? page.intro,
        alternates: { canonical: `/loesungen/${page.slug}` },
        openGraph: {
            title: `${page.navLabel} | Partsunion`,
            description: page.promise,
            url: `https://partsunion.de/loesungen/${page.slug}`,
            type: 'website',
        },
    };
}

export default async function SolutionRoute({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = getSolutionPage(slug);
    if (!page) notFound();

    const url = `https://partsunion.de/loesungen/${page.slug}`;
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BreadcrumbList',
                '@id': `${url}#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://partsunion.de/' },
                    { '@type': 'ListItem', position: 2, name: 'Lösungen', item: 'https://partsunion.de/loesungen' },
                    { '@type': 'ListItem', position: 3, name: page.navLabel, item: url },
                ],
            },
            {
                '@type': 'WebPage',
                '@id': `${url}#webpage`,
                url,
                name: `${page.navLabel} für den Autoteilehandel`,
                description: seoDescriptions[page.slug] ?? page.intro,
                inLanguage: 'de-DE',
                isPartOf: { '@id': 'https://partsunion.de/#website' },
                about: { '@id': `${url}#service` },
                breadcrumb: { '@id': `${url}#breadcrumb` },
            },
            {
                '@type': 'Service',
                '@id': `${url}#service`,
                name: page.navLabel,
                serviceType: `${page.navLabel} im Autoteilehandel`,
                description: page.intro,
                provider: { '@id': 'https://partsunion.de/#organization' },
                audience: {
                    '@type': 'BusinessAudience',
                    audienceType: 'Autoteilehändler, Autoverwerter und Werkstattbetriebe mit Teileverkauf',
                },
                category: page.group,
                mainEntityOfPage: { '@id': `${url}#webpage` },
            },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            <SolutionPage page={page} />
        </>
    );
}
