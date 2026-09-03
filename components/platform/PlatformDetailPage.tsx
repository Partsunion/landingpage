'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    ArrowUpRight,
    BadgeEuro,
    Banknote,
    Barcode,
    BookOpenCheck,
    Bot,
    Boxes,
    Camera,
    CarFront,
    CheckCircle2,
    CircleDollarSign,
    CreditCard,
    FileCheck2,
    FileSpreadsheet,
    Inbox,
    Landmark,
    PackageCheck,
    PackageSearch,
    Receipt,
    RotateCcw,
    ScanLine,
    Search,
    ShieldCheck,
    ShoppingCart,
    Store,
    Tags,
    Truck,
    Warehouse,
    type LucideIcon,
} from 'lucide-react';

type PlatformKind = 'new' | 'used';
type VisualKind = 'image' | 'identity' | 'market';

type PlatformSection = {
    id: string;
    number: string;
    eyebrow: string;
    title: string;
    text: string;
    points: Array<{ title: string; text: string; icon: LucideIcon }>;
    visual: VisualKind;
    image?: string;
    imageAlt?: string;
    imageLabel?: string;
    reverse?: boolean;
};

const newPartsFlow = [
    { label: 'Anfrage', detail: 'WhatsApp, Telefon, Theke', icon: Inbox },
    { label: 'Teil prüfen', detail: 'Fahrzeug, OE, Ausführung', icon: ScanLine },
    { label: 'Anbieten', detail: 'Preis und Lieferzeit', icon: BadgeEuro },
    { label: 'Beschaffen', detail: 'Bestand oder Bestellung', icon: PackageSearch },
    { label: 'Ausliefern', detail: 'Auftrag und Lieferschein', icon: Truck },
    { label: 'Abrechnen', detail: 'Rechnung, Zahlung, Buchung', icon: Receipt },
] as const;

const usedPartsFlow = [
    { label: 'Erfassen', detail: 'Teil und Artikelnummer', icon: Barcode },
    { label: 'Zuordnen', detail: 'Herkunft und Fahrzeug', icon: CarFront },
    { label: 'Prüfen', detail: 'Zustand und Fotos', icon: Camera },
    { label: 'Preis finden', detail: 'Markt und eigene Verkäufe', icon: Search },
    { label: 'Inserieren', detail: 'Text, Bilder, eBay', icon: Tags },
    { label: 'Verkaufen', detail: 'Bestand, Beleg, Zahlung', icon: ShoppingCart },
] as const;

const newPartsSections: PlatformSection[] = [
    {
        id: 'verkauf', number: '01', eyebrow: 'Anfragen & Verkauf',
        title: 'Aus einer Teileanfrage wird direkt ein verkaufsfertiger Vorgang.',
        text: 'Kunde, Fahrzeug und Teilebedarf kommen gemeinsam im Arbeitsvorrat an. Die geprüfte Auswahl läuft ohne erneute Eingabe in Angebot und Auftrag weiter.',
        points: [
            { title: 'Alle Anfragen an einem Ort', text: 'WhatsApp, Telefon, Theke und E-Mail werden als klarer Prozess bearbeitet.', icon: Inbox },
            { title: 'Fahrzeug und Teil genau prüfen', text: 'VIN, HSN/TSN, Fahrzeugschein und lizenzierte Herstellerkataloge unterstützen die OE-Ermittlung.', icon: BookOpenCheck },
            { title: 'Preis und Verfügbarkeit vergleichen', text: 'Eigener Bestand, freigegebene Bezugsquellen, EK, VK und Marge stehen an der Auswahl.', icon: BadgeEuro },
            { title: 'Bis zum Auftrag weiterarbeiten', text: 'Kundenzusage und Positionen müssen nicht ein zweites Mal angelegt werden.', icon: FileCheck2 },
        ],
        visual: 'image', image: '/product/verkauf-arbeitsvorrat.png', imageAlt: 'Partsunion Arbeitsvorrat für Neuteile-Anfragen und Verkauf', imageLabel: 'Neuteile · Arbeitsvorrat',
    },
    {
        id: 'ware', number: '02', eyebrow: 'Einkauf & Warenwirtschaft',
        title: 'Bestand, Fehlmenge und Bestellung bleiben auf demselben Stand.',
        text: 'Partsunion zeigt, was frei verfügbar, reserviert oder im Zulauf ist. Fehlmengen werden sichtbar, bevor sie den Auftrag ausbremsen.',
        points: [
            { title: 'Mengenbestand sauber führen', text: 'Zugang, Abgang, Reservierung und Umbuchung bleiben nachvollziehbar.', icon: Boxes },
            { title: 'Bestellbedarf bündeln', text: 'Fehlmengen, Mindestbestand und offene Zugänge fließen in die Bearbeitung ein.', icon: PackageSearch },
            { title: 'Wareneingang gegenprüfen', text: 'Lieferung, Bestellung und Abweichung werden zusammen betrachtet.', icon: Warehouse },
            { title: 'Retouren und Reklamationen trennen', text: 'Rückgabe, Mangel, Bestand und Gutschrift folgen erst nach der Prüfung.', icon: RotateCcw },
        ],
        visual: 'image', image: '/product/artikel-bestand.png', imageAlt: 'Partsunion Warenwirtschaft mit Artikelbestand, Einkaufspreis, Verkaufspreis und Marge', imageLabel: 'Neuteile · Artikel & Bestand', reverse: true,
    },
    {
        id: 'finanzen', number: '03', eyebrow: 'Theke, Kasse & Finanzen',
        title: 'Vom Verkauf bis zur Zahlung ist die Belegkette vollständig.',
        text: 'Auftrag, Lieferschein, Rechnung, offene Zahlung und Buchung greifen ineinander. So bleibt sichtbar, was erledigt ist und was noch geprüft werden muss.',
        points: [
            { title: 'Thekenverkauf und Kasse', text: 'Kunde, Artikel, Zahlung und Tagesabschluss arbeiten mit denselben Daten.', icon: Store },
            { title: 'Rechnung und E-Rechnung', text: 'Rechnungen, ZUGFeRD und XRechnung entstehen aus dem geprüften Verkaufsstand.', icon: Receipt },
            { title: 'Zahlungen zuordnen', text: 'Bankumsätze und offene Rechnungen werden abgeglichen; unklare Treffer bleiben offen.', icon: CreditCard },
            { title: 'Buchhaltung vorbereiten', text: 'Kasse, Umsatzsteuer und DATEV-Export greifen auf die verbundenen Belege zu.', icon: FileSpreadsheet },
        ],
        visual: 'image', image: '/product/banking-kontenabgleich.png', imageAlt: 'Partsunion Banking mit Bankumsätzen und Zuordnung zu offenen Rechnungen', imageLabel: 'Neuteile · Banking & Kontenabgleich',
    },
    {
        id: 'assistent', number: '04', eyebrow: 'Betriebsassistent',
        title: 'Frag deinen Betrieb – und bereite den nächsten Schritt direkt vor.',
        text: 'Der Assistent kennt die freigegebenen Daten zu Artikeln, Bestand, Kunden, Aufträgen, Zahlungen und offenen Aufgaben. Du bestätigst, bevor etwas geändert wird.',
        points: [
            { title: 'Fragen beantworten', text: 'Zum Beispiel: Welche Aufträge warten auf Teile? Welche Rechnungen sind offen?', icon: Bot },
            { title: 'Zusammenhänge zeigen', text: 'Bestand, Auftrag, Zugang und Zahlung werden gemeinsam betrachtet.', icon: Boxes },
            { title: 'Arbeit vorbereiten', text: 'Bestellentwurf, Aufgabe oder nächste Bearbeitung werden verständlich vorgeschlagen.', icon: CheckCircle2 },
            { title: 'Freigabe bleibt bei dir', text: 'Kritische Änderungen werden nicht still ausgeführt.', icon: ShieldCheck },
        ],
        visual: 'image', image: '/product/betriebsassistent.png', imageAlt: 'Originalausschnitt des Partsunion Betriebsassistenten für den Neuteilehandel', imageLabel: 'Neuteile · Betriebsassistent', reverse: true,
    },
];

const usedPartsSections: PlatformSection[] = [
    {
        id: 'einzelstueck', number: '01', eyebrow: 'Einzelstück statt Mengenartikel',
        title: 'Jedes ausgebaute Teil bekommt seine eigene, vollständige Akte.',
        text: 'Ein gebrauchter Scheinwerfer ist nicht austauschbar mit irgendeinem anderen. Partsunion hält Herkunft, Fahrzeug, OE-Nummer, Zustand, Fotos, Lagerort und Bestand am konkreten Teil zusammen.',
        points: [
            { title: 'Herkunft festhalten', text: 'Spenderfahrzeug, Einkauf oder Einlagerung bleiben dem Teil zugeordnet.', icon: CarFront },
            { title: 'Zustand verständlich dokumentieren', text: 'Prüfung, Hinweise und Bilder gehören direkt zum Einzelstück.', icon: Camera },
            { title: 'Genau ein verfügbarer Bestand', text: 'Reserviert oder verkauft bedeutet: dieses konkrete Teil ist nicht mehr frei.', icon: PackageCheck },
            { title: 'OE- und Fahrzeugbezug', text: 'Nummern und passende Fahrzeuge bleiben für Suche und Inserat nutzbar.', icon: ScanLine },
        ],
        visual: 'identity', reverse: true,
    },
    {
        id: 'preis', number: '02', eyebrow: 'Preisermittlung',
        title: 'Marktpreise vergleichen, ohne einen Fantasiepreis zu übernehmen.',
        text: 'Partsunion grenzt die Suche über Teil, OE-Nummer und Fahrzeug ein. Aktive Angebote und eigene Verkäufe bleiben getrennt, damit du den Ausgangspreis nachvollziehen kannst.',
        points: [
            { title: 'Passende Vergleichsangebote', text: 'Nur Treffer mit nutzbarem Teile- und Fahrzeugbezug kommen in die Auswahl.', icon: Search },
            { title: 'Angebot ist nicht Verkauf', text: 'eBay-Angebotspreise und tatsächlich erzielte eigene Preise werden getrennt gezeigt.', icon: CircleDollarSign },
            { title: 'Versand und Zustand mitdenken', text: 'Abweichende Zustände oder fehlende Versandkosten bleiben sichtbar.', icon: Truck },
            { title: 'Du gibst den Preis frei', text: 'Ohne belastbare Marktdaten wird kein Preis erfunden.', icon: ShieldCheck },
        ],
        visual: 'market',
    },
    {
        id: 'inserate', number: '03', eyebrow: 'Inserate & eBay',
        title: 'Aus der Teileakte wird ein vollständiges, geprüftes Inserat.',
        text: 'Artikelangaben, Fahrzeugverwendung, Bilder, Zustand und Preis werden in einem Ablauf vorbereitet. Veröffentlicht wird erst, wenn Pflichtangaben und Händlerzugang vollständig sind.',
        points: [
            { title: 'Inserat aus dem Teil aufbauen', text: 'Beschreibung und Angaben stammen aus der geprüften Einzelstückakte.', icon: Tags },
            { title: 'Fahrzeugverwendung übernehmen', text: 'OE- und Fahrzeugbezug unterstützen die passende Zuordnung.', icon: CarFront },
            { title: 'Bilder bewusst freigeben', text: 'Nur ausgewählte Produktbilder gehen an den Verkaufskanal.', icon: Camera },
            { title: 'eBay kontrolliert anbinden', text: 'Kein stilles Veröffentlichen: Zugang, Pflichtfelder und Freigabe werden geprüft.', icon: CheckCircle2 },
        ],
        visual: 'image', image: '/product/gebrauchtteile-inserate.png', imageAlt: 'Partsunion Gebrauchtteileverwaltung mit Inseraten und vorbereitetem eBay-Verkaufskanal', imageLabel: 'Gebrauchtteile · Inserate & eBay', reverse: true,
    },
    {
        id: 'verkauf', number: '04', eyebrow: 'Verkauf, Steuer & Zahlung',
        title: 'Verkauf und Buchung folgen genau diesem Einzelstück.',
        text: 'Reservierung, Auftrag, Rechnung und Zahlung bleiben mit dem verkauften Teil verbunden. Auch die steuerliche Behandlung wird nicht pauschal geraten, sondern am Geschäftsvorgang geführt.',
        points: [
            { title: 'Doppelverkauf verhindern', text: 'Ein reserviertes oder verkauftes Einzelstück steht nicht weiter als frei da.', icon: PackageCheck },
            { title: 'Belege verbunden halten', text: 'Angebot, Auftrag, Rechnung und Zahlung beziehen sich auf dasselbe Teil.', icon: FileCheck2 },
            { title: 'Steuerfall sauber führen', text: 'Regelbesteuerung oder § 25a werden anhand des belegten Einkaufsfalls behandelt.', icon: Landmark },
            { title: 'Zahlung nachvollziehen', text: 'Offene Posten und Zahlungseingänge bleiben am Verkauf sichtbar.', icon: Banknote },
        ],
        visual: 'image', image: '/product/rechnungen.png', imageAlt: 'Partsunion Rechnungsübersicht für den Verkauf von Gebrauchtteilen', imageLabel: 'Gebrauchtteile · Rechnung & Zahlung',
    },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
    return <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.17em] ${light ? 'text-[#91bdf7]' : 'text-[#1c69ce]'}`}><span className={`h-px w-8 ${light ? 'bg-[#5a98e8]' : 'bg-[#2b79e2]'}`} />{children}</div>;
}

function ProductWindow({ image, alt, label, priority = false, crop = 'object-cover object-top' }: { image: string; alt: string; label: string; priority?: boolean; crop?: string }) {
    return (
        <div className="overflow-hidden border border-[#9fb1c5] bg-white shadow-[0_24px_58px_rgba(5,22,45,.24)]">
            <div className="flex h-10 items-center border-b border-[#cbd5e0] bg-white px-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#df6b6b]" /><span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[#dfb855]" /><span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[#61b77a]" />
                <span className="ml-3 text-[7px] font-bold uppercase tracking-[.12em] text-[#657387]">{label}</span><span className="ml-auto text-[7px] font-semibold text-[#8b96a5]">DEMO-DATEN</span>
            </div>
            <div className="relative aspect-[1.62/1] overflow-hidden bg-[#e9eef4]"><Image src={image} alt={alt} fill priority={priority} unoptimized className={crop} sizes="(max-width: 1024px) 96vw, 58vw" /></div>
        </div>
    );
}

function UsedIdentityVisual() {
    return (
        <div className="border border-[#aab9ca] bg-[#edf2f6] p-4 shadow-[0_22px_54px_rgba(18,42,71,.14)] sm:p-6">
            <div className="border border-[#b9c6d4] bg-white">
                <div className="flex h-11 items-center border-b border-[#d3dbe4] px-4"><Boxes className="h-4 w-4 text-[#1d6fe8]" /><strong className="ml-2 text-[9px] uppercase tracking-[.12em] text-[#526175]">Einzelstückakte · Beispiel</strong><span className="ml-auto border border-[#b9d4c4] bg-[#edf7f1] px-2 py-1 text-[7px] font-semibold text-[#267149]">VERFÜGBAR · 1</span></div>
                <div className="grid sm:grid-cols-[.78fr_1.22fr]">
                    <div className="flex min-h-[230px] items-center justify-center border-b border-[#d5dde6] bg-[#e9eef4] p-6 sm:border-b-0 sm:border-r"><div className="text-center"><span className="mx-auto flex h-20 w-20 items-center justify-center border border-[#aac0da] bg-white text-[#1d6fe8]"><CarFront className="h-9 w-9" /></span><strong className="mt-4 block text-sm text-[#24354a]">LED-Scheinwerfer links</strong><span className="mt-1 block font-mono text-[9px] text-[#6a788a]">GT-000184</span></div></div>
                    <dl className="text-[10px]">{[['OE-Nummer', '5G1941753'], ['Herkunft', 'VW Golf VII'], ['Zustand', 'geprüft'], ['Fotos', '3 freigegeben'], ['Lagerort', 'E-02-04'], ['Bestand', 'dieses Einzelstück']].map(([label, value], index) => <div key={label} className={`grid grid-cols-[105px_1fr] px-4 py-3 ${index ? 'border-t border-[#e0e6ec]' : ''}`}><dt className="text-[#7a8796]">{label}</dt><dd className="font-semibold text-[#34455a]">{value}</dd></div>)}</dl>
                </div>
            </div>
        </div>
    );
}

function UsedMarketVisual() {
    const sources = [
        ['Aktive Angebote', 'Angebotspreise getrennt'],
        ['Eigene Verkäufe', 'tatsächlich erzielte Preise'],
        ['Zustand & Versand', 'Abweichungen sichtbar'],
    ];
    return (
        <div className="overflow-hidden border border-[#284f7a] bg-[#0a284b] p-5 text-white shadow-[0_24px_58px_rgba(5,22,45,.22)] sm:p-7">
            <div className="flex items-center border-b border-white/15 pb-4"><CircleDollarSign className="h-5 w-5 text-[#8bbafa]" /><strong className="ml-2 text-[9px] uppercase tracking-[.13em]">Preisprüfung · Beispiel</strong><span className="ml-auto text-[7px] text-white/45">KEIN AUTO-PREIS</span></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">{sources.map(([title, detail], index) => <div key={title} className={`border p-4 ${index === 1 ? 'border-[#6fa5e8] bg-[#133d6b]' : 'border-white/14 bg-white/[.045]'}`}><span className="font-mono text-[8px] text-[#86b7f5]">0{index + 1}</span><strong className="mt-5 block text-[11px]">{title}</strong><span className="mt-1.5 block text-[9px] leading-4 text-white/50">{detail}</span></div>)}</div>
            <div className="mt-4 grid gap-px border border-white/15 bg-white/15 text-[9px] sm:grid-cols-[1fr_1fr_1.1fr]"><div className="bg-[#0d3159] p-4"><span className="text-white/45">Teil</span><strong className="mt-1 block">OE 5G1941753</strong></div><div className="bg-[#0d3159] p-4"><span className="text-white/45">Vergleich</span><strong className="mt-1 block">nutzbare Treffer</strong></div><div className="bg-[#174675] p-4"><span className="text-[#a3c8f7]">Ausgangswert</span><strong className="mt-1 block">wird vom Händler freigegeben</strong></div></div>
            <p className="mt-5 border-l-2 border-[#77abed] pl-4 text-[10px] leading-5 text-white/53">Fehlen passende Marktdaten, bleibt die Preisentscheidung offen. Partsunion erfindet keinen Wert.</p>
        </div>
    );
}

function HeroStage({ kind }: { kind: PlatformKind }) {
    if (kind === 'new') {
        return (
            <div className="relative mx-auto w-full max-w-[800px] pb-16">
                <ProductWindow image="/product/verkaufsauftrag.png" alt="Partsunion Verkaufsauftrag für den Neuteilehandel" label="Neuteile · Auftrag" priority crop="object-cover object-[70%_8%]" />
                <div className="absolute -bottom-1 left-3 w-[44%] border border-[#91a7bf] bg-white p-1.5 shadow-[0_17px_40px_rgba(4,16,34,.3)] sm:left-8"><div className="mb-1.5 px-1 text-[6px] font-bold uppercase tracking-[.1em] text-[#5c6c80]">Artikel &amp; Bestand</div><div className="relative aspect-[1.75/1] overflow-hidden bg-[#e8edf3]"><Image src="/product/artikel-bestand.png" alt="Partsunion Artikelbestand für Neuteile" fill unoptimized className="scale-[1.25] object-cover object-top" sizes="340px" /></div></div>
                <div className="absolute -bottom-5 right-2 w-[40%] border border-[#91a7bf] bg-white p-1.5 shadow-[0_17px_40px_rgba(4,16,34,.3)] sm:right-8"><div className="mb-1.5 px-1 text-[6px] font-bold uppercase tracking-[.1em] text-[#5c6c80]">Banking &amp; Zahlung</div><div className="relative aspect-[1.75/1] overflow-hidden bg-[#e8edf3]"><Image src="/product/banking-kontenabgleich.png" alt="Partsunion Banking für den Neuteilehandel" fill unoptimized className="scale-[1.28] object-cover object-top" sizes="320px" /></div></div>
            </div>
        );
    }

    return (
        <div className="relative mx-auto w-full max-w-[800px] pb-16">
            <ProductWindow image="/product/gebrauchtteile-inserate.png" alt="Partsunion Plattform für Gebrauchtteile und eBay-Inserate" label="Gebrauchtteile · Inserate" priority crop="object-cover object-top" />
            <div className="absolute -bottom-1 left-3 w-[46%] border border-[#91a7bf] bg-white p-4 text-[#27384e] shadow-[0_17px_40px_rgba(4,16,34,.3)] sm:left-8"><span className="text-[7px] font-bold uppercase tracking-[.12em] text-[#1d6fe8]">Einzelstück</span><strong className="mt-2 block text-[11px]">Herkunft · Zustand · Fotos</strong><span className="mt-1 block text-[8px] text-[#718095]">genau ein verfügbarer Bestand</span></div>
            <div className="absolute -bottom-5 right-2 w-[40%] border border-[#4f81bd] bg-[#0c315b] p-4 text-white shadow-[0_17px_40px_rgba(4,16,34,.34)] sm:right-8"><span className="text-[7px] font-bold uppercase tracking-[.12em] text-[#8ebbf5]">Preisprüfung</span><strong className="mt-2 block text-[11px]">Markt + eigene Verkäufe</strong><span className="mt-1 block text-[8px] text-white/48">du entscheidest</span></div>
        </div>
    );
}

function SectionVisual({ section }: { section: PlatformSection }) {
    if (section.visual === 'identity') return <UsedIdentityVisual />;
    if (section.visual === 'market') return <UsedMarketVisual />;
    return <ProductWindow image={section.image!} alt={section.imageAlt!} label={section.imageLabel!} />;
}

export function PlatformDetailPage({ kind }: { kind: PlatformKind }) {
    const isNew = kind === 'new';
    const sections = isNew ? newPartsSections : usedPartsSections;
    const flow = isNew ? newPartsFlow : usedPartsFlow;
    const hero = isNew ? {
        eyebrow: 'Partsunion Neuteile-Plattform',
        title: 'Neuteile verkaufen, beschaffen und abrechnen – in einem Ablauf.',
        text: 'Anfrage, OE-Ermittlung, Angebot, Warenwirtschaft, Bestellung, Theke, Kasse und Banking greifen ineinander. Jeder Schritt übernimmt, was vorher schon geklärt wurde.',
        tags: ['56 Marken', 'Herstellerkataloge', 'ERP & WaWi', 'Theke & Kasse'],
    } : {
        eyebrow: 'Partsunion Gebrauchtteile-Plattform',
        title: 'Jedes gebrauchte Teil als echtes Einzelstück – vom Ausbau bis zum Verkauf.',
        text: 'Für Autoverwerter und Gebrauchtteilehändler bleiben Herkunft, Fahrzeug, OE-Nummer, Zustand, Fotos, Preisermittlung, Inserat und Verkauf an genau diesem Teil. So entsteht kein Doppelbestand und kein unklarer Verkauf.',
        tags: ['Einzelstücke', 'Preisermittlung', 'Inserate', 'eBay-Anbindung'],
    };

    return (
        <article className="overflow-x-clip bg-white text-[#111b2b]">
            <section className="relative overflow-hidden bg-[#071b35] pt-[72px] text-white">
                <div aria-hidden className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(105,162,231,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(105,162,231,.12)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(110deg,transparent_5%,#000_45%,#000_82%,transparent)]" />
                <div className="relative mx-auto grid max-w-[1480px] items-center gap-10 px-5 py-12 md:px-8 md:py-16 lg:min-h-[680px] lg:grid-cols-[.72fr_1.28fr] lg:gap-12 xl:px-10">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="max-w-[610px]">
                        <Eyebrow light>{hero.eyebrow}</Eyebrow>
                        <h1 className="mt-5 text-[clamp(2.45rem,4.35vw,4.25rem)] font-semibold leading-[.99] tracking-[-.05em]">{hero.title}</h1>
                        <p className="mt-6 max-w-[580px] text-[17px] leading-7 text-white/68">{hero.text}</p>
                        <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/beratung" className="inline-flex h-12 items-center justify-center gap-2 bg-[#2f7df0] px-6 text-sm font-semibold text-white transition hover:bg-[#428cf8]">Plattform zeigen lassen <ArrowUpRight className="h-4 w-4" /></Link><Link href="#ablauf" className="inline-flex h-12 items-center justify-center gap-2 border border-white/24 bg-white/[.05] px-6 text-sm font-semibold text-white transition hover:bg-white/10">Ablauf ansehen <ArrowRight className="h-4 w-4" /></Link></div>
                        <div className="mt-8 grid grid-cols-2 border-y border-white/15 text-[10px] font-semibold text-white/67 sm:grid-cols-4">{hero.tags.map((item, index) => <span key={item} className={`flex min-h-11 items-center justify-center px-2 text-center ${index % 2 ? 'border-l border-white/15' : ''} ${index > 1 ? 'border-t border-white/15 sm:border-l sm:border-t-0' : ''}`}>{item}</span>)}</div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65, delay: .08 }} className="min-w-0 lg:pl-2"><HeroStage kind={kind} /></motion.div>
                </div>
            </section>

            <nav aria-label="Plattform auswählen" className="border-b border-[#d6dee8] bg-white"><div className="mx-auto grid max-w-[1480px] md:grid-cols-[1fr_1fr_auto] md:px-8 xl:px-10"><Link href="/plattform/neuteile" aria-current={isNew ? 'page' : undefined} className={`flex min-h-16 items-center gap-3 px-5 text-sm font-semibold md:border-x ${isNew ? 'border-[#b8c9dc] bg-[#eef5fd] text-[#155fc8]' : 'border-[#e0e6ed] text-[#4e5d72] hover:bg-[#f6f8fb]'}`}><PackageSearch className="h-4 w-4" /> Neuteile-Plattform</Link><Link href="/plattform/gebrauchtteile" aria-current={!isNew ? 'page' : undefined} className={`flex min-h-16 items-center gap-3 border-t px-5 text-sm font-semibold md:border-y-0 md:border-r ${!isNew ? 'border-[#b8c9dc] bg-[#eef5fd] text-[#155fc8]' : 'border-[#e0e6ed] text-[#4e5d72] hover:bg-[#f6f8fb]'}`}><Boxes className="h-4 w-4" /> Gebrauchtteile-Plattform</Link><Link href="/plattform" className="flex min-h-14 items-center justify-center gap-2 px-5 text-xs font-semibold text-[#68768a] hover:text-[#155fc8]">Gesamtüberblick <ArrowRight className="h-3.5 w-3.5" /></Link></div></nav>

            <nav aria-label="Inhalte dieser Plattform" className="sticky top-[72px] z-30 hidden border-b border-[#d6dee8] bg-white lg:block"><div className="mx-auto grid h-16 max-w-[1480px] px-8 xl:px-10" style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }}>{sections.map((section, index) => <Link key={section.id} href={`#${section.id}`} className={`group flex items-center gap-3 px-4 text-xs font-semibold text-[#4e5d72] transition hover:bg-[#f3f7fc] hover:text-[#155fc8] ${index ? 'border-l border-[#e2e7ed]' : ''}`}><span className="font-mono text-[9px] text-[#8c98a8]">{section.number}</span>{section.eyebrow}</Link>)}</div></nav>

            <section id="ablauf" className="scroll-mt-36 border-b border-[#dce3eb] bg-white py-14 md:py-20">
                <div className="mx-auto max-w-[1480px] px-5 md:px-8 xl:px-10"><div className="grid gap-7 lg:grid-cols-[.65fr_1.35fr] lg:items-end"><div><Eyebrow>{isNew ? 'Der Neuteile-Ablauf' : 'Der Gebrauchtteile-Ablauf'}</Eyebrow><h2 className="mt-4 max-w-[560px] text-[clamp(2rem,3.45vw,3.3rem)] font-semibold leading-[1.03] tracking-[-.044em]">{isNew ? 'Einmal erfassen. Bis zur Buchung weiterführen.' : 'Ein Teil. Eine Akte. Ein ehrlicher Bestand.'}</h2></div><p className="max-w-[720px] text-base leading-7 text-[#667286] lg:justify-self-end">{isNew ? 'Kunde, Fahrzeug, Teil, Kondition, Warenfluss und Belege bleiben verbunden. Der nächste Schritt beginnt nicht wieder bei null.' : 'Jeder Schritt übernimmt die geprüften Angaben des Einzelstücks. Herkunft, Zustand, Preis und Verkaufsstatus gehen nicht unterwegs verloren.'}</p></div>
                    <div className="mt-10 grid border-y border-[#cfd9e5] sm:grid-cols-2 lg:grid-cols-6">{flow.map((step, index) => { const Icon = step.icon; return <div key={step.label} className={`px-4 py-5 ${index ? 'border-t border-[#dce3eb] sm:border-l lg:border-t-0' : ''} ${index === 1 ? 'sm:border-t-0' : ''}`}><div className="mb-5 flex items-center justify-between"><Icon className="h-4 w-4 text-[#1d6fe8]" /><span className="font-mono text-[9px] text-[#9aa4b2]">0{index + 1}</span></div><strong className="block text-sm font-semibold text-[#1b273a]">{step.label}</strong><span className="mt-1 block text-[11px] leading-4 text-[#748093]">{step.detail}</span></div>; })}</div>
                </div>
            </section>

            {sections.map((section, index) => (
                <section id={section.id} key={section.id} className={`scroll-mt-36 border-b border-[#d5deea] py-16 md:py-24 ${index % 2 ? 'bg-white' : 'bg-[#f4f7fa]'}`}>
                    <div className={`mx-auto grid max-w-[1480px] items-center gap-10 px-5 md:px-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-16 xl:px-10 ${section.reverse ? 'lg:grid-cols-[1.22fr_.78fr]' : ''}`}>
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} className={section.reverse ? 'lg:order-2' : ''}><Eyebrow>{section.number} · {section.eyebrow}</Eyebrow><h2 className="mt-4 text-[clamp(2rem,3.25vw,3.1rem)] font-semibold leading-[1.04] tracking-[-.043em]">{section.title}</h2><p className="mt-5 text-base leading-7 text-[#667286]">{section.text}</p><ul className="mt-7 border-t border-[#cad5df]">{section.points.map(({ title, text, icon: Icon }) => <li key={title} className="grid grid-cols-[30px_1fr] gap-3 border-b border-[#dce3ea] py-3.5"><span className="flex h-7 w-7 items-center justify-center bg-[#e9f2fd] text-[#1d6fe8]"><Icon className="h-3.5 w-3.5" /></span><span><strong className="block text-sm text-[#223148]">{title}</strong><span className="mt-1 block text-[12px] leading-5 text-[#6b788a]">{text}</span></span></li>)}</ul></motion.div>
                        <motion.div initial={{ opacity: 0, x: section.reverse ? -18 : 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-70px' }} className={`min-w-0 ${section.reverse ? 'lg:order-1' : ''}`}><SectionVisual section={section} /></motion.div>
                    </div>
                </section>
            ))}

            <section className="bg-[#0a2647] py-14 text-white md:py-18"><div className="mx-auto grid max-w-[1480px] gap-8 px-5 md:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center xl:px-10"><div><Eyebrow light>Gemeinsames Fundament</Eyebrow><h2 className="mt-4 text-[clamp(2rem,3.15vw,3rem)] font-semibold leading-[1.05] tracking-[-.04em]">{isNew ? 'Für Neuteile gebaut. Mit dem ganzen Betrieb verbunden.' : 'Für Einzelstücke gebaut. Mit dem ganzen Betrieb verbunden.'}</h2></div><div className="grid gap-px border border-white/17 bg-white/17 sm:grid-cols-3">{(isNew ? [['Verkauf', 'Anfrage, Angebot und Auftrag'], ['Ware', 'Einkauf, Bestand und Lieferung'], ['Geld', 'Kasse, Rechnung und Banking']] : [['Teil', 'Herkunft, Zustand und Fotos'], ['Markt', 'Preis, Inserat und eBay'], ['Betrieb', 'Bestand, Rechnung und Zahlung']]).map(([title, text]) => <div key={title} className="bg-[#0c2e55] p-5"><strong className="text-sm">{title}</strong><span className="mt-2 block text-[11px] leading-5 text-white/50">{text}</span></div>)}</div></div></section>

            <section className="bg-white py-16 md:py-20"><div className="mx-auto max-w-[1480px] px-5 md:px-8 xl:px-10"><div className="grid gap-8 border border-[#afbdcc] bg-[#f3f6fa] p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14"><div><span className="text-[9px] font-bold uppercase tracking-[.16em] text-[#1d6fe8]">Beratung für deinen Betrieb</span><h2 className="mt-3 max-w-[820px] text-[clamp(2rem,3.1vw,3.1rem)] font-semibold leading-[1.05] tracking-[-.042em]">{isNew ? 'Zeig uns einen echten Neuteile-Auftrag.' : 'Zeig uns ein echtes gebrauchtes Teil.'}</h2><p className="mt-4 max-w-[760px] text-sm leading-6 text-[#667286]">{isNew ? 'Wir gehen gemeinsam von der Anfrage über Teileprüfung und Beschaffung bis zur Rechnung durch.' : 'Wir gehen gemeinsam von Erfassung und Preisermittlung über das Inserat bis zu Verkauf und Buchung durch.'}</p></div><Link href="/beratung" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-[#1d6fe8] px-6 text-sm font-semibold text-white transition hover:bg-[#155fc8]">Beratung vereinbaren <ArrowUpRight className="h-4 w-4" /></Link></div></div></section>
        </article>
    );
}
