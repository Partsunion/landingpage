import type { Metadata } from 'next';
import Link from 'next/link';
import {
    ArrowRight,
    BookOpenCheck,
    Boxes,
    Calculator,
    Clock,
    MessageCircle,
    ScanLine,
    SearchCheck,
    ShoppingCart,
} from 'lucide-react';
import { blogPosts, type BlogPost } from '@/lib/blog-posts';

export const metadata: Metadata = {
    title: 'Praxisratgeber: Autoteilehandel, WaWi & ERP',
    description: 'Verständliche Ratgeber für Autoteilehändler: Warenwirtschaft und ERP auswählen, OE-Nummern ermitteln, Gebrauchtteile verkaufen, eBay, TSE, GoBD, DATEV und E-Rechnung.',
    keywords: [
        'Warenwirtschaft Autoteilehandel',
        'ERP Autoteilehandel',
        'Software Autoteilehändler',
        'Gebrauchtteile Software',
        'OE Nummer ermitteln',
        'Autoteile bei eBay verkaufen',
        'WhatsApp Bot Autoteilehandel',
        'TSE Kasse Autoteilehandel',
        'GoBD Teilehandel',
        'DATEV Autoteilehandel',
        'ZUGFeRD XRechnung Handel',
        'Differenzbesteuerung Gebrauchtteile',
    ],
    alternates: { canonical: 'https://partsunion.de/blog' },
    openGraph: {
        title: 'Partsunion Praxisratgeber',
        description: 'Klare Antworten zu Teileermittlung, Verkauf, Warenwirtschaft, Gebrauchtteilen, Kasse und Buchhaltung.',
        url: 'https://partsunion.de/blog',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: ['/opengraph-image'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Partsunion Praxisratgeber',
        description: 'Praxiswissen für Autoteilehändler – klar erklärt und ohne unnötige Fachbegriffe.',
        images: ['/opengraph-image'],
    },
};

const topics = [
    { title: 'Software auswählen', text: 'ERP und Warenwirtschaft richtig vergleichen', href: '/blog/warenwirtschaft-autoteilhandel-checkliste', icon: SearchCheck },
    { title: 'Teile sicher finden', text: 'Fahrzeugdaten, OE-Nummern und Kataloge', href: '/blog/oem-ermittlung-aus-vin-hsn-tsn', icon: ScanLine },
    { title: 'Kundenanfragen bearbeiten', text: 'WhatsApp, Portal, Angebot und Auftrag', href: '/blog/whatsapp-bot-fuer-autoteilhaendler', icon: MessageCircle },
    { title: 'Lager sauber führen', text: 'Bestand, Wareneingang und Retouren', href: '/blog/foto-wareneingang-retoure-lager-ki', icon: Boxes },
    { title: 'Gebrauchtteile abrechnen', text: 'Einzelstücke und § 25a verständlich', href: '/blog/differenzbesteuerung-25a-gebrauchtteile', icon: ShoppingCart },
    { title: 'Kasse & Buchhaltung', text: 'TSE, GoBD, E-Rechnung und DATEV', href: '/blog/gobd-tse-kasse-autohandel', icon: Calculator },
] as const;

function topicFor(post: BlogPost) {
    const slug = post.slug;
    if (slug.includes('oem')) return 'Teile finden';
    if (slug.includes('whatsapp') || slug.includes('kundenportal')) return 'Kunden & Verkauf';
    if (slug.includes('retoure') || slug.includes('wareneingang')) return 'Lager & Retouren';
    if (slug.includes('gobd') || slug.includes('rechnungspflicht')) return 'Kasse & Buchhaltung';
    if (slug.includes('differenzbesteuerung')) return 'Gebrauchtteile & Steuer';
    return 'ERP & Warenwirtschaft';
}

const featured = blogPosts.find((post) => post.slug === 'warenwirtschaft-autoteilhandel-checkliste') ?? blogPosts[0];
const remainingPosts = blogPosts.filter((post) => post.slug !== featured.slug);

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://partsunion.de/' },
        { '@type': 'ListItem', position: 2, name: 'Praxisratgeber', item: 'https://partsunion.de/blog' },
    ],
};

const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Partsunion Praxisratgeber für den Autoteilehandel',
    description: 'Ratgeber zu ERP, Warenwirtschaft, Teileermittlung, Gebrauchtteilen, Verkauf, Kasse und Buchhaltung im Autoteilehandel.',
    url: 'https://partsunion.de/blog',
    isPartOf: { '@id': 'https://partsunion.de/#website' },
    publisher: { '@id': 'https://partsunion.de/#organization' },
    mainEntity: {
        '@type': 'ItemList',
        itemListElement: blogPosts.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: post.title,
            url: `https://partsunion.de/blog/${post.slug}`,
        })),
    },
};

function ReadingTime({ post }: { post: BlogPost }) {
    return <span className="inline-flex items-center gap-1.5 text-[10px] text-[#778497]"><Clock className="h-3 w-3" />{post.readingMinutes} Min. Lesezeit</span>;
}

export default function RatgeberIndex() {
    return (
        <div className="bg-white pt-[72px] text-[#111b2b]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />

            <section className="relative overflow-hidden bg-[#071b35] text-white">
                <div aria-hidden className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(108,164,231,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(108,164,231,.12)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(105deg,#000,transparent_80%)]" />
                <div className="relative mx-auto grid max-w-[1420px] gap-9 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-end xl:px-10">
                    <div><div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.17em] text-[#8dbcf8]"><span className="h-px w-8 bg-[#4f91e8]" />Partsunion Praxisratgeber</div><h1 className="mt-5 max-w-[680px] text-[clamp(2.5rem,4.5vw,4.4rem)] font-semibold leading-[.99] tracking-[-.05em]">Antworten für den Alltag im Autoteilehandel.</h1></div>
                    <div className="lg:pb-1"><p className="max-w-[650px] text-[17px] leading-7 text-white/68">Warenwirtschaft auswählen, Teile sicher bestimmen, Gebrauchtteile verkaufen oder Kasse und Buchhaltung richtig aufsetzen: Hier findest du klare Erklärungen ohne unnötige Fachbegriffe.</p><div className="mt-6 flex flex-wrap gap-2">{['ERP & WaWi', 'OE-Ermittlung', 'Gebrauchtteile', 'eBay', 'TSE & GoBD', 'E-Rechnung'].map((item) => <span key={item} className="border border-white/16 bg-white/[.045] px-3 py-1.5 text-[10px] font-semibold text-white/68">{item}</span>)}</div></div>
                </div>
            </section>

            <section className="border-b border-[#d7e0e9] bg-[#f4f7fa] py-12 md:py-16">
                <div className="mx-auto max-w-[1420px] px-5 md:px-8 xl:px-10"><div className="flex items-end justify-between gap-6"><div><span className="text-[9px] font-bold uppercase tracking-[.16em] text-[#1d6fe8]">Direkt zum Thema</span><h2 className="mt-2 text-2xl font-semibold tracking-[-.035em] md:text-3xl">Was willst du gerade klären?</h2></div><span className="hidden text-xs text-[#7a8798] md:block">6 Themen · verständlich sortiert</span></div>
                    <div className="mt-7 grid border-l border-t border-[#cdd7e2] sm:grid-cols-2 lg:grid-cols-3">{topics.map((topic) => { const Icon = topic.icon; return <Link key={topic.title} href={topic.href} className="group grid min-h-[132px] grid-cols-[38px_1fr_auto] gap-3 border-b border-r border-[#cdd7e2] bg-white p-5 transition hover:bg-[#eef5fd]"><span className="flex h-9 w-9 items-center justify-center bg-[#e9f2fd] text-[#1d6fe8]"><Icon className="h-4 w-4" /></span><span><strong className="block text-sm text-[#203047]">{topic.title}</strong><span className="mt-2 block text-[11px] leading-5 text-[#6b788a]">{topic.text}</span></span><ArrowRight className="mt-2 h-4 w-4 text-[#8a98aa] transition-transform group-hover:translate-x-0.5 group-hover:text-[#1d6fe8]" /></Link>; })}</div>
                </div>
            </section>

            <section className="bg-white py-14 md:py-20">
                <div className="mx-auto max-w-[1420px] px-5 md:px-8 xl:px-10"><div className="grid overflow-hidden border border-[#aebdcd] bg-white shadow-[0_20px_50px_rgba(16,37,65,.09)] lg:grid-cols-[.7fr_1.3fr]">
                    <div className="flex min-h-[270px] flex-col justify-between bg-[#0b2d55] p-7 text-white sm:p-9"><span className="flex h-11 w-11 items-center justify-center border border-[#5e8fc8] bg-[#143e6c]"><BookOpenCheck className="h-5 w-5 text-[#91bdf7]" /></span><div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#8fbdf8]">Empfohlener Einstieg</span><strong className="mt-3 block text-2xl leading-tight tracking-[-.03em]">Die richtige Software für deinen Teilehandel auswählen.</strong></div></div>
                    <Link href={`/blog/${featured.slug}`} className="group flex flex-col justify-center p-7 sm:p-9 lg:p-12"><span className="text-[9px] font-bold uppercase tracking-[.14em] text-[#1d6fe8]">{topicFor(featured)}</span><h2 className="mt-3 max-w-[760px] text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[1.08] tracking-[-.04em]">{featured.title}</h2><p className="mt-4 max-w-[780px] text-sm leading-6 text-[#667286]">{featured.excerpt}</p><div className="mt-7 flex items-center justify-between border-t border-[#d8e0e8] pt-5"><ReadingTime post={featured} /><span className="inline-flex items-center gap-2 text-sm font-semibold text-[#155fc8]">Ratgeber lesen <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></Link>
                </div></div>
            </section>

            <section className="border-y border-[#d7e0e9] bg-[#f4f7fa] py-14 md:py-20">
                <div className="mx-auto max-w-[1420px] px-5 md:px-8 xl:px-10"><div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><span className="text-[9px] font-bold uppercase tracking-[.16em] text-[#1d6fe8]">Alle Ratgeber</span><h2 className="mt-3 text-[clamp(2rem,3.3vw,3.2rem)] font-semibold leading-[1.04] tracking-[-.043em]">Von der Teilesuche bis zur Buchhaltung.</h2></div><p className="max-w-[680px] text-sm leading-6 text-[#667286] lg:justify-self-end">Die Beiträge beantworten konkrete Fragen aus Verkauf, Lager und Büro. Funktionen, Pflichten und Grenzen werden getrennt erklärt.</p></div>
                    <div className="mt-9 grid border-l border-t border-[#cbd5e0] md:grid-cols-2 lg:grid-cols-3">{remainingPosts.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex min-h-[280px] flex-col border-b border-r border-[#cbd5e0] bg-white p-6 transition hover:bg-[#f8fafc]"><div className="flex items-center justify-between"><span className="text-[9px] font-bold uppercase tracking-[.13em] text-[#1d6fe8]">{topicFor(post)}</span><ReadingTime post={post} /></div><h3 className="mt-6 text-lg font-semibold leading-snug tracking-[-.02em] text-[#1b293e]">{post.title}</h3><p className="mt-3 line-clamp-4 text-[12px] leading-5 text-[#6b788a]">{post.excerpt}</p><span className="mt-auto flex items-center justify-between border-t border-[#e0e6ed] pt-4 text-xs font-semibold text-[#155fc8]">Weiterlesen <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span></Link>)}</div>
                </div>
            </section>

            <section className="bg-white py-14 md:py-20"><div className="mx-auto max-w-[1240px] px-5 md:px-8 xl:px-10"><div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><span className="text-[9px] font-bold uppercase tracking-[.16em] text-[#1d6fe8]">Kurz eingeordnet</span><h2 className="mt-3 text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-.042em]">Wonach Teilehändler häufig suchen.</h2></div><div className="border-t border-[#c8d3de]">{[
                        ['Welche Warenwirtschaft passt zum Autoteilehandel?', 'Eine passende Lösung muss Fahrzeug- und OE-Bezug, Einkauf, Bestand, Verkauf, Belege und die Abläufe an Theke und Kasse gemeinsam abbilden.', '/blog/warenwirtschaft-autoteilhandel-checkliste'],
                        ['Wie verwalte ich gebrauchte Autoteile?', 'Gebrauchtteile brauchen eine Einzelstückakte mit Herkunft, Zustand, Fotos, OE-Bezug, Preis, Lagerort und eindeutigem Bestand.', '/plattform/gebrauchtteile'],
                        ['Wie finde ich die richtige OE-Nummer?', 'Fahrzeugdaten, VIN oder HSN/TSN und der lizenzierte Herstellerkatalog müssen nachvollziehbar zusammengeführt werden.', '/blog/oem-ermittlung-aus-vin-hsn-tsn'],
                        ['Was braucht eine Kasse im Teilehandel?', 'TSE, Kassenbuch, Zahlungsarten, Tagesabschluss, Rechnungen und die Übergabe an die Buchhaltung müssen zusammenpassen.', '/blog/gobd-tse-kasse-autohandel'],
                    ].map(([question, answer, href], index) => <div key={question} className={`grid gap-2 py-5 sm:grid-cols-[32px_1fr_auto] sm:items-start ${index ? 'border-t border-[#dbe2e9]' : ''}`}><span className="font-mono text-[9px] text-[#1d6fe8]">0{index + 1}</span><span><h3 className="text-sm font-semibold text-[#213047]">{question}</h3><p className="mt-2 text-[12px] leading-5 text-[#6a7789]">{answer}</p></span><Link href={href} aria-label={`${question} weiterlesen`} className="mt-1 inline-flex h-8 w-8 items-center justify-center border border-[#c5d1dd] text-[#1d6fe8] hover:border-[#1d6fe8]"><ArrowRight className="h-3.5 w-3.5" /></Link></div>)}</div></div></div></section>

            <section className="bg-[#0a2647] py-14 text-white"><div className="mx-auto grid max-w-[1240px] items-center gap-8 px-5 md:px-8 lg:grid-cols-[1fr_auto] xl:px-10"><div><span className="text-[9px] font-bold uppercase tracking-[.16em] text-[#8dbcf8]">Dein eigener Ablauf zählt</span><h2 className="mt-3 max-w-[760px] text-[clamp(2rem,3.1vw,3rem)] font-semibold leading-[1.05] tracking-[-.042em]">Noch offen, was zu deinem Betrieb passt?</h2><p className="mt-3 max-w-[710px] text-sm leading-6 text-white/58">Im Beratungsgespräch gehen wir einen echten Fall aus deinem Teilehandel durch – ohne Preisliste und ohne Standardschau.</p></div><Link href="/beratung" className="inline-flex h-12 items-center justify-center gap-2 bg-[#2f7df0] px-6 text-sm font-semibold text-white hover:bg-[#428cf8]">Beratung vereinbaren <ArrowRight className="h-4 w-4" /></Link></div></section>
        </div>
    );
}
