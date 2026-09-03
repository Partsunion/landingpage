'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowRight, ArrowUpRight, BadgeEuro, Bot, Boxes, Camera, CarFront,
    ChartNoAxesCombined, CheckCircle2, CircleDollarSign, CreditCard, Database,
    ExternalLink, FileCheck2, FileSpreadsheet, Inbox, Landmark, PackageCheck,
    PackageSearch, Receipt, ScanLine, Search, ShieldCheck, ShoppingCart, Store, Tags, Warehouse,
    type LucideIcon,
} from 'lucide-react';

const chapters = [
    { number: '01', label: 'Anfragen & Verkauf', href: '#verkauf' },
    { number: '02', label: 'Einkauf & Lager', href: '#warenwirtschaft' },
    { number: '03', label: 'Gebrauchtteile', href: '#gebrauchtteile' },
    { number: '04', label: 'Banking & Buchungen', href: '#finanzen' },
    { number: '05', label: 'Betriebsassistent', href: '#assistent' },
] as const;

const dailyFlow = [
    { label: 'Anfrage', detail: 'WhatsApp, Telefon, Theke', icon: Inbox },
    { label: 'Teil finden', detail: 'Fahrzeug, OE, Alternative', icon: ScanLine },
    { label: 'Verkaufen', detail: 'Preis, Angebot, Auftrag', icon: ShoppingCart },
    { label: 'Ware bewegen', detail: 'Einkauf, Bestand, Ausgabe', icon: Warehouse },
    { label: 'Abrechnen', detail: 'Kasse, Rechnung, Zahlung', icon: Receipt },
    { label: 'Buchen', detail: 'Kontenabgleich, DATEV', icon: Landmark },
] as const;

const usedPartsSteps = [
    { number: '01', title: 'Einzelteil sauber erfassen', text: 'Fahrzeug, OE-Nummer, Zustand, Herkunft und Fotos bleiben am konkreten Teil.', icon: Camera },
    { number: '02', title: 'Marktpreis prüfen', text: 'Aktive eBay-Angebote und eigene Verkäufe werden getrennt und nachvollziehbar verglichen.', icon: ChartNoAxesCombined },
    { number: '03', title: 'Inserat vorbereiten', text: 'Kategorie, Fahrzeugverwendung, Pflichtangaben, Beschreibung und freigegebene Bilder in einem Ablauf.', icon: Tags },
    { number: '04', title: 'Prüfen und veröffentlichen', text: 'Erst nach deiner Freigabe geht das Einzelstück über den verbundenen Händlerkanal online.', icon: ExternalLink },
] as const;

const platformBreadth = [
    { title: 'Kunden & Verkauf', detail: 'Kundenakte, Kreditlimit, Angebote, Aufträge, Lieferscheine, Rechnungen und offene Posten.' },
    { title: 'Einkauf & Bestand', detail: 'Lieferanten, Bestellvorschläge, Wareneingang, Reservierungen, Umbuchungen und Inventur.' },
    { title: 'Kasse & Finanzen', detail: 'Thekenkasse, Tagesabschluss, Zahlungszuordnung, Mahnwesen, Steuerjournal und DATEV-Export.' },
    { title: 'Gebrauchtteile', detail: 'Einzelstückbestand, Qualitätsprüfung, Preisermittlung, Inserate und kontrollierte eBay-Veröffentlichung.' },
    { title: 'Auswertungen', detail: 'Umsatz, Marge, Lagerbindung, Wiederbestellung und offene Aufgaben aus deinen echten Belegen.' },
    { title: 'Zugriff & Sicherheit', detail: 'Rollen, Zwei-Faktor-Anmeldung, getrennte Händlerdaten und ein nachvollziehbares Änderungsprotokoll.' },
] as const;

const standards = ['GoBD-orientiert', 'TSE-Pfad', 'ZUGFeRD', 'XRechnung', 'DATEV · SKR03/04', 'SEPA', 'CAMT.053', 'MT940'];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
    return <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.18em] ${light ? 'text-[#8dbcf8]' : 'text-[#1c69ce]'}`}><span className={`h-px w-8 ${light ? 'bg-[#4e91e8]' : 'bg-[#2b79e2]'}`} />{children}</div>;
}

function ProductWindow({ image, alt, label, className = '', imageClassName = 'object-cover object-top', priority = false }: { image: string; alt: string; label: string; className?: string; imageClassName?: string; priority?: boolean }) {
    return (
        <div className={`overflow-hidden border border-[#aebdce] bg-white shadow-[0_22px_55px_rgba(6,22,43,.22)] ${className}`}>
            <div className="flex h-9 items-center border-b border-[#cbd5e0] bg-white px-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#df6b6b]" /><span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[#dfb855]" /><span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[#61b77a]" />
                <span className="ml-3 text-[7px] font-bold uppercase tracking-[.12em] text-[#657387]">{label}</span><span className="ml-auto text-[7px] font-semibold text-[#8b96a5]">DEMO-DATEN</span>
            </div>
            <div className="relative aspect-[1.6/1] overflow-hidden bg-[#e9eef4]"><Image src={image} alt={alt} fill priority={priority} unoptimized className={imageClassName} sizes="(max-width: 1024px) 96vw, 58vw" /></div>
        </div>
    );
}

function FeaturePoint({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
    return (
        <li className="grid grid-cols-[32px_1fr] gap-3 border-t border-[#dbe2ea] py-4 first:border-t-0 first:pt-0">
            <span className="flex h-8 w-8 items-center justify-center bg-[#eaf2fd] text-[#1d6fe8]"><Icon className="h-4 w-4" /></span>
            <span><strong className="block text-[15px] font-semibold text-[#172337]">{title}</strong><span className="mt-1 block text-sm leading-6 text-[#667286]">{children}</span></span>
        </li>
    );
}

function HeroProductStage() {
    return (
        <div className="relative mx-auto w-full max-w-[790px] pb-16 lg:pb-20">
            <div aria-hidden className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(56,135,238,.24),transparent_66%)]" />
            <ProductWindow image="/product/verkaufsauftrag.png" alt="Originaler Partsunion Verkaufsauftrag im Demosystem" label="Verkauf · Auftrag" priority className="relative z-10" />
            <div className="absolute -bottom-1 left-3 z-20 w-[43%] border border-[#93a8c0] bg-white p-1.5 shadow-[0_18px_42px_rgba(4,16,34,.32)] sm:left-8">
                <div className="mb-1.5 flex items-center justify-between px-1 text-[6px] font-bold uppercase tracking-[.11em] text-[#5c6c80]"><span>Artikel &amp; Bestand</span><span className="text-[#1d6fe8]">WaWi</span></div>
                <div className="relative aspect-[1.8/1] overflow-hidden bg-[#e8edf3]"><Image src="/product/artikel-bestand.png" alt="Partsunion Artikel- und Bestandsansicht" fill unoptimized className="scale-[1.28] object-cover object-top" sizes="340px" /></div>
            </div>
            <div className="absolute -bottom-5 right-2 z-30 w-[40%] border border-[#93a8c0] bg-white p-1.5 shadow-[0_18px_42px_rgba(4,16,34,.32)] sm:right-8">
                <div className="mb-1.5 flex items-center justify-between px-1 text-[6px] font-bold uppercase tracking-[.11em] text-[#5c6c80]"><span>Rechnung &amp; Zahlung</span><span className="text-[#1d6fe8]">Finanzen</span></div>
                <div className="relative aspect-[1.8/1] overflow-hidden bg-[#e8edf3]"><Image src="/product/rechnungen.png" alt="Partsunion Rechnungsübersicht" fill unoptimized className="scale-[1.28] object-cover object-top" sizes="320px" /></div>
            </div>
        </div>
    );
}

export function PlattformSections() {
    return (
        <div className="overflow-x-clip">
            <section className="relative overflow-hidden bg-[#071b35] pt-[72px] text-white">
                <div aria-hidden className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(105,162,231,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(105,162,231,.12)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(110deg,transparent_5%,#000_45%,#000_82%,transparent)]" />
                <div className="relative mx-auto grid max-w-[1480px] items-center gap-10 px-5 py-12 md:px-8 md:py-16 lg:min-h-[680px] lg:grid-cols-[.72fr_1.28fr] lg:gap-12 xl:px-10">
                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="max-w-[590px]">
                        <Eyebrow light>Die Partsunion Plattform</Eyebrow>
                        <h1 className="mt-5 text-[clamp(2.5rem,4.6vw,4.55rem)] font-semibold leading-[.98] tracking-[-.052em]">Dein Teilehandel. Von der Anfrage bis zur Buchung.</h1>
                        <p className="mt-6 max-w-[560px] text-[17px] leading-7 text-white/68">ERP, WaWi, Theke, Kasse und Banking greifen ineinander. Du suchst ein Teil einmal, führst es durch Verkauf und Lager weiter und ordnest am Ende die Zahlung sauber zu.</p>
                        <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/beratung" className="inline-flex h-12 items-center justify-center gap-2 bg-[#2f7df0] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,85,190,.3)] transition hover:bg-[#428cf8]">Plattform zeigen lassen <ArrowUpRight className="h-4 w-4" /></Link><Link href="#ablauf" className="inline-flex h-12 items-center justify-center gap-2 border border-white/24 bg-white/[.05] px-6 text-sm font-semibold text-white transition hover:bg-white/10">Bereiche ansehen <ArrowRight className="h-4 w-4" /></Link></div>
                        <div className="mt-8 grid grid-cols-2 border-y border-white/15 text-[10px] font-semibold text-white/67 sm:grid-cols-4">{['ERP', 'WaWi', 'Theke & Kasse', 'Banking'].map((item, index) => <span key={item} className={`flex h-11 items-center justify-center ${index % 2 ? 'border-l border-white/15' : ''} ${index > 1 ? 'border-t border-white/15 sm:border-t-0 sm:border-l' : ''}`}>{item}</span>)}</div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .08 }} className="min-w-0 lg:pl-2"><HeroProductStage /></motion.div>
                </div>
            </section>

            <nav aria-label="Plattform auswählen" className="border-b border-[#d6dee8] bg-white"><div className="mx-auto grid max-w-[1480px] md:grid-cols-[1fr_1fr_auto] md:px-8 xl:px-10"><Link href="/plattform/neuteile" className="group flex min-h-16 items-center gap-3 px-5 text-sm font-semibold text-[#33445a] transition hover:bg-[#eef5fd] hover:text-[#155fc8] md:border-x md:border-[#e0e6ed]"><PackageSearch className="h-4 w-4 text-[#1d6fe8]" /> Neuteile-Plattform <ArrowRight className="ml-auto h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></Link><Link href="/plattform/gebrauchtteile" className="group flex min-h-16 items-center gap-3 border-t border-[#e0e6ed] px-5 text-sm font-semibold text-[#33445a] transition hover:bg-[#eef5fd] hover:text-[#155fc8] md:border-y-0 md:border-r"><Boxes className="h-4 w-4 text-[#1d6fe8]" /> Gebrauchtteile-Plattform <ArrowRight className="ml-auto h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></Link><span className="flex min-h-14 items-center justify-center px-5 text-xs font-semibold text-[#68768a]">Gesamtüberblick</span></div></nav>

            <nav aria-label="Bereiche der Plattform" className="sticky top-[72px] z-30 hidden border-b border-[#d6dee8] bg-white lg:block"><div className="mx-auto grid h-16 max-w-[1480px] grid-cols-5 px-8 xl:px-10">{chapters.map((chapter, index) => <Link key={chapter.href} href={chapter.href} className={`group flex items-center gap-3 px-4 text-xs font-semibold text-[#4e5d72] transition hover:bg-[#f3f7fc] hover:text-[#155fc8] ${index ? 'border-l border-[#e2e7ed]' : ''}`}><span className="font-mono text-[9px] text-[#8c98a8] group-hover:text-[#2b79e2]">{chapter.number}</span>{chapter.label}</Link>)}</div></nav>

            <section id="ablauf" className="scroll-mt-36 border-b border-[#dce3eb] bg-white py-14 md:py-20">
                <div className="mx-auto max-w-[1480px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-8 lg:grid-cols-[.62fr_1.38fr] lg:items-end"><div><Eyebrow>Ein gemeinsamer Vorgang</Eyebrow><h2 className="mt-4 max-w-[520px] text-[clamp(2rem,3.6vw,3.35rem)] font-semibold leading-[1.03] tracking-[-.045em] text-[#111b2c]">Jeder Schritt übernimmt, was vorher schon geklärt wurde.</h2></div><p className="max-w-[760px] text-base leading-7 text-[#667286] lg:justify-self-end">Kunde, Fahrzeug, Teil, Preis, Bestand und Belege bleiben verbunden. So wird aus einer Anfrage kein Zettelstapel – sondern ein Vorgang, den Verkauf, Lager und Büro gemeinsam weiterführen.</p></div>
                    <div className="mt-10 grid border-y border-[#cfd9e5] sm:grid-cols-2 lg:grid-cols-6">{dailyFlow.map((step, index) => { const Icon = step.icon; return <div key={step.label} className={`relative px-4 py-5 ${index ? 'border-t border-[#dce3eb] sm:border-l lg:border-t-0' : ''} ${index === 1 ? 'sm:border-t-0' : ''}`}><div className="mb-5 flex items-center justify-between"><Icon className="h-4 w-4 text-[#1d6fe8]" /><span className="font-mono text-[9px] text-[#9aa4b2]">0{index + 1}</span></div><strong className="block text-sm font-semibold text-[#1b273a]">{step.label}</strong><span className="mt-1 block text-[11px] leading-4 text-[#748093]">{step.detail}</span></div>; })}</div>
                </div>
            </section>

            <section id="verkauf" className="scroll-mt-36 bg-[#f4f7fa] py-16 md:py-24"><div className="mx-auto grid max-w-[1480px] items-center gap-10 px-5 md:px-8 lg:grid-cols-[.76fr_1.24fr] lg:gap-16 xl:px-10">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}><Eyebrow>01 · Anfragen &amp; Verkauf</Eyebrow><h2 className="mt-4 text-[clamp(2rem,3.3vw,3.15rem)] font-semibold leading-[1.04] tracking-[-.045em] text-[#111b2c]">Teile finden, anbieten und verkaufen – ohne alles neu anzulegen.</h2><p className="mt-5 text-base leading-7 text-[#667286]">Anfragen aus WhatsApp, Telefon und Theke landen im Arbeitsvorrat. Fahrzeugdaten, OE-Bezug, Auswahl und Kundenentscheidung laufen direkt in Angebot und Auftrag weiter.</p><ul className="mt-8"><FeaturePoint icon={ScanLine} title="Fahrzeug und Teil genau prüfen">VIN, HSN/TSN, Fahrzeugschein und lizenzierte Herstellerkataloge helfen bei der OE-Ermittlung.</FeaturePoint><FeaturePoint icon={BadgeEuro} title="Preis und Verfügbarkeit im Blick">EK, VK, Marge, eigener Bestand und freigegebene Bezugsquellen stehen an der Auswahl.</FeaturePoint><FeaturePoint icon={FileCheck2} title="Angebot, Auftrag und Belegkette">Die Kundenauswahl wird weitergeführt – bis zu Lieferschein, Rechnung und Zahlung.</FeaturePoint><FeaturePoint icon={Store} title="Theke und Kasse gehören dazu">Barverkauf, Kassensitzung und Tagesabschluss arbeiten mit denselben Artikeln und Kunden.</FeaturePoint></ul></motion.div>
                <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }}><ProductWindow image="/product/verkaufsauftrag.png" alt="Originalansicht eines Partsunion Verkaufsauftrags" label="Verkauf · Auftrag & Belegfluss" /></motion.div>
            </div></section>

            <section id="warenwirtschaft" className="scroll-mt-36 overflow-hidden border-y border-[#d5deea] bg-white py-16 md:py-24"><div className="mx-auto max-w-[1480px] px-5 md:px-8 xl:px-10"><div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-center lg:gap-16">
                <motion.div initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} className="min-w-0"><ProductWindow image="/product/artikel-bestand.png" alt="Originale Partsunion Übersicht für Artikel, Bestand, EK, VK und Marge" label="Warenwirtschaft · Artikel & Bestand" /></motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}><Eyebrow>02 · Einkauf &amp; Warenwirtschaft</Eyebrow><h2 className="mt-4 text-[clamp(2rem,3.3vw,3.15rem)] font-semibold leading-[1.04] tracking-[-.045em] text-[#111b2c]">Du weißt, was da ist, was fehlt und was als Nächstes bestellt werden muss.</h2><p className="mt-5 text-base leading-7 text-[#667286]">Bestand ist nicht nur eine Zahl. Reservierungen, Wareneingänge, Lagerorte und jede Buchung bleiben nachvollziehbar – auch über mehrere Filialen.</p><div className="mt-8 border-l-2 border-[#75a9ec] pl-5">{[['Bestellvorschläge', 'Fehlmengen, Bedarf und bevorzugte Bezugsquelle gebündelt bearbeiten.'], ['Wareneingang', 'Bestellung prüfen, Abweichungen festhalten und Ware einbuchen.'], ['Bestandsbuchungen', 'Zugang, Abgang und Umbuchung mit vollständigem Bewegungsjournal.'], ['Reservierungen', 'Bereits verplante Ware wird nicht ein zweites Mal verkauft.'], ['Retouren & Reklamationen', 'Rückgabe oder Mangel mobil erfassen und Kunden- sowie Lieferantenfall kontrolliert bearbeiten.']].map(([title, text]) => <div key={title} className="border-b border-[#dce3eb] py-3.5 first:pt-0 last:border-b-0"><strong className="text-sm font-semibold text-[#1a273a]">{title}</strong><p className="mt-1 text-sm leading-6 text-[#6b7789]">{text}</p></div>)}</div></motion.div>
            </div></div></section>

            <section id="gebrauchtteile" className="scroll-mt-36 relative overflow-hidden bg-[#0a2647] py-16 text-white md:py-24"><div aria-hidden className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(117,169,236,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(117,169,236,.1)_1px,transparent_1px)] [background-size:38px_38px] [mask-image:linear-gradient(90deg,#000,transparent_88%)]" /><div className="relative mx-auto max-w-[1480px] px-5 md:px-8 xl:px-10">
                <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end"><div><Eyebrow light>03 · Gebrauchtteile &amp; eBay</Eyebrow><h2 className="mt-4 max-w-[650px] text-[clamp(2.2rem,4vw,3.9rem)] font-semibold leading-[1] tracking-[-.05em]">Vom ausgebauten Einzelteil bis zum fertigen Inserat.</h2></div><p className="max-w-[680px] text-base leading-7 text-white/66 lg:justify-self-end">Partsunion behandelt ein gebrauchtes Teil als konkretes Einzelstück: mit Herkunft, Zustand, Fotos, Preisgrundlage und genau einem Bestand. So bleiben Verkauf und Marktplatz sauber verbunden.</p></div>
                <div className="mt-10 grid gap-px border border-white/18 bg-white/18 lg:grid-cols-4">{usedPartsSteps.map((step) => { const Icon = step.icon; return <div key={step.number} className="bg-[#0c2d53] p-5 sm:p-6"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-[#79adf1]" /><span className="font-mono text-[9px] text-white/38">{step.number}</span></div><h3 className="mt-7 text-base font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-white/58">{step.text}</p></div>; })}</div>
                <div className="mt-10 grid gap-7 lg:grid-cols-[1.2fr_.8fr] lg:items-stretch"><div className="overflow-hidden border border-white/18 bg-white p-1.5 shadow-[0_26px_60px_rgba(0,0,0,.25)]"><div className="flex h-9 items-center border-b border-[#d3dce6] px-3"><CarFront className="h-4 w-4 text-[#1d6fe8]" /><span className="ml-2 text-[8px] font-bold uppercase tracking-[.11em] text-[#56667b]">Gebrauchtteile · Inserate</span><span className="ml-auto text-[7px] font-semibold text-[#8b96a5]">ORIGINALANSICHT · DEMO</span></div><div className="relative aspect-[1.72/1] overflow-hidden bg-[#e9eef4]"><Image src="/product/gebrauchtteile-inserate.png" alt="Aktuelle Partsunion Ansicht für Gebrauchtteile, Inserate und eBay-Veröffentlichung" fill unoptimized className="object-cover object-top" sizes="(max-width: 1024px) 96vw, 60vw" /></div></div>
                    <div className="flex flex-col border border-white/18 bg-[#071d37] p-6 sm:p-7"><div className="flex items-center justify-between border-b border-white/14 pb-4"><span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8dbcf8]">Preisermittlung</span><span className="border border-[#4f85c5] bg-[#123a67] px-2 py-1 text-[8px] font-bold text-[#9bc5fa]">NACHVOLLZIEHBAR</span></div><h3 className="mt-6 text-2xl font-semibold tracking-[-.025em]">Nicht raten, was das Teil wert sein könnte.</h3><p className="mt-3 text-sm leading-6 text-white/60">Partsunion grenzt Vergleichsangebote mit OE- und Fahrzeugdaten ein und trennt klar zwischen Angebotspreisen bei eBay und deinen tatsächlich erzielten Verkaufspreisen.</p><div className="mt-6 space-y-2 text-xs"><div className="flex items-center justify-between border border-white/13 bg-white/[.045] px-3 py-3"><span className="flex items-center gap-2 text-white/72"><Search className="h-3.5 w-3.5 text-[#78adf2]" /> Aktive eBay-Angebote</span><span className="text-white/42">Median · Spanne · Versand</span></div><div className="flex items-center justify-between border border-white/13 bg-white/[.045] px-3 py-3"><span className="flex items-center gap-2 text-white/72"><Database className="h-3.5 w-3.5 text-[#78adf2]" /> Eigene Verkäufe</span><span className="text-white/42">tatsächlich erzielt</span></div><div className="flex items-center justify-between border border-[#3c76ba] bg-[#113962] px-3 py-3"><span className="flex items-center gap-2 font-semibold text-white"><CircleDollarSign className="h-3.5 w-3.5 text-[#8fc0fa]" /> Ausgangswert</span><span className="text-[#a9cdf8]">du entscheidest</span></div></div><p className="mt-auto border-t border-white/13 pt-5 text-[11px] leading-5 text-white/43">Dubletten, unpassende Treffer und Angebote ohne belastbare Versandkosten werden gesondert ausgewiesen. Ohne nutzbare Marktdaten wird kein Preis erfunden.</p></div>
                </div>
            </div></section>

            <section id="finanzen" className="scroll-mt-36 bg-[#f3f6fa] py-16 md:py-24"><div className="mx-auto max-w-[1480px] px-5 md:px-8 xl:px-10"><div className="grid gap-10 lg:grid-cols-[.68fr_1.32fr] lg:items-center lg:gap-16">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}><Eyebrow>04 · Banking, Buchungen &amp; Steuer</Eyebrow><h2 className="mt-4 text-[clamp(2rem,3.3vw,3.15rem)] font-semibold leading-[1.04] tracking-[-.045em] text-[#111b2c]">Zahlungseingang erkennen. Rechnung sauber abschließen.</h2><p className="mt-5 text-base leading-7 text-[#667286]">Rechnung schreiben ist nur die halbe Arbeit. Partsunion führt offene Posten, Bankumsätze, Zahlungen und Buchungen zusammen – bis zur Übergabe an den Steuerberater.</p><ul className="mt-8"><FeaturePoint icon={CreditCard} title="Bankkonto oder Kontoauszug">Bankkonto nach Freischaltung anbinden oder CAMT.053- und MT940-Kontoauszüge importieren.</FeaturePoint><FeaturePoint icon={CheckCircle2} title="Zahlungen zuordnen">Eindeutige Treffer werden erkannt; unklare Zahlungen bleiben zur Prüfung offen.</FeaturePoint><FeaturePoint icon={CircleDollarSign} title="Teilzahlung und Skonto">Zahlungen korrekt auf offene Rechnungen buchen und den Restbetrag weiterführen.</FeaturePoint><FeaturePoint icon={FileSpreadsheet} title="Buchhaltung vorbereiten">Umsatzsteuer, Kassenbuch, Z-Bericht und DATEV-Buchungsstapel greifen auf dieselben Belege zu.</FeaturePoint></ul></motion.div>
                <motion.div initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} className="min-w-0"><ProductWindow image="/product/banking-kontenabgleich.png" alt="Aktuelle Partsunion Banking-Ansicht mit Bankkonto, offenen Umsätzen und Zuordnungsvorschlägen" label="Finanzen · Banking & Kontenabgleich" /></motion.div>
            </div><div className="mt-14 flex flex-wrap items-center gap-2 border-t border-[#d5dee8] pt-6"><span className="mr-2 text-[9px] font-bold uppercase tracking-[.16em] text-[#7d8998]">Vorbereitete Finanzpfade</span>{standards.map((standard) => <span key={standard} className="border border-[#c6d1de] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#4e5d72]">{standard}</span>)}</div></div></section>

            <section id="assistent" className="scroll-mt-36 overflow-hidden border-y border-[#d4deea] bg-white py-16 md:py-24"><div className="mx-auto grid max-w-[1480px] items-center gap-10 px-5 md:px-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16 xl:px-10">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}><Eyebrow>05 · Betriebsassistent</Eyebrow><h2 className="mt-4 text-[clamp(2rem,3.3vw,3.15rem)] font-semibold leading-[1.04] tracking-[-.045em] text-[#111b2c]">Frag deinen Betrieb. Entscheide. Lass es erledigen.</h2><p className="mt-5 text-base leading-7 text-[#667286]">Der Assistent kennt die für dich freigegebenen Daten zu Artikeln, Beständen, Kunden, Aufträgen, Retouren, Reklamationen, Umsätzen und offenen Aufgaben. Er beantwortet Fragen im Zusammenhang und bereitet den nächsten Schritt direkt vor.</p><div className="mt-7 border-y border-[#d8e0e9]">{[['Fragen', '„Welche Aufträge hängen fest?“ oder „Was muss heute zuerst erledigt werden?“'], ['Beraten', 'Prioritäten, Risiken und passende nächste Schritte verständlich zusammenfassen.'], ['Bearbeiten', 'Aufgaben und Änderungen vorbereiten – ausgeführt wird erst nach deiner sichtbaren Freigabe.']].map(([title, text], index) => <div key={title} className={`grid grid-cols-[90px_1fr] gap-4 py-4 ${index ? 'border-t border-[#e0e6ed]' : ''}`}><strong className="text-sm text-[#1d6fe8]">{title}</strong><p className="text-sm leading-6 text-[#687589]">{text}</p></div>)}</div><Link href="/loesungen/betriebsassistent" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#1767cc]">Betriebsassistent im Detail <ArrowRight className="h-4 w-4" /></Link></motion.div>
                <motion.div initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} className="overflow-hidden border border-[#9cafc4] bg-[#e8edf3] shadow-[0_24px_58px_rgba(18,42,71,.18)]"><div className="flex h-10 items-center border-b border-[#c8d2df] bg-white px-3"><Bot className="h-4 w-4 text-[#1d6fe8]" /><span className="ml-2 text-[8px] font-bold uppercase tracking-[.12em] text-[#56667b]">Partsunion · Betriebsassistent</span><span className="ml-auto text-[7px] text-[#8490a0]">ORIGINALAUSSCHNITT · DEMO</span></div><div className="relative aspect-[1.72/1] overflow-hidden"><Image src="/product/betriebsassistent.png" alt="Originalausschnitt des Partsunion Betriebsassistenten" fill unoptimized className="object-cover object-right" sizes="(max-width: 1024px) 96vw, 60vw" /></div></motion.div>
            </div></section>

            <section className="bg-[#f3f6fa] py-16 md:py-24"><div className="mx-auto max-w-[1480px] px-5 md:px-8 xl:px-10"><div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]"><div><Eyebrow>Mehr als einzelne Module</Eyebrow><h2 className="mt-4 max-w-[530px] text-[clamp(2rem,3.3vw,3.15rem)] font-semibold leading-[1.04] tracking-[-.045em] text-[#111b2c]">Das Fundament für deinen gesamten Betrieb.</h2><p className="mt-5 max-w-[520px] text-base leading-7 text-[#667286]">Die Stärke liegt nicht in einer langen Funktionsliste. Sie liegt darin, dass Verkauf, Ware, Geld und Aufgaben auf denselben Stand zugreifen.</p></div><div className="border-t border-[#bfcbd8]">{platformBreadth.map((item, index) => <div key={item.title} className="grid gap-2 border-b border-[#d5dee8] py-5 sm:grid-cols-[36px_190px_1fr] sm:items-start"><span className="font-mono text-[9px] text-[#8b97a7]">0{index + 1}</span><strong className="text-sm font-semibold text-[#1a273a]">{item.title}</strong><p className="text-sm leading-6 text-[#69768a]">{item.detail}</p></div>)}</div></div><div className="mt-10 grid gap-4 border border-[#c6d2df] bg-white p-6 sm:grid-cols-3 sm:p-8"><div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#1d6fe8]" /><span><strong className="block text-sm text-[#1a273a]">Deine Daten bleiben getrennt</strong><span className="mt-1 block text-xs leading-5 text-[#778294]">Mandanten- und rollenbezogener Zugriff.</span></span></div><div className="flex gap-3"><PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#1d6fe8]" /><span><strong className="block text-sm text-[#1a273a]">Kritische Schritte bleiben kontrolliert</strong><span className="mt-1 block text-xs leading-5 text-[#778294]">Freigaben und Änderungen sind sichtbar.</span></span></div><div className="flex gap-3"><Boxes className="mt-0.5 h-5 w-5 shrink-0 text-[#1d6fe8]" /><span><strong className="block text-sm text-[#1a273a]">Neuware und Einzelstücke</strong><span className="mt-1 block text-xs leading-5 text-[#778294]">Getrennte Logik, gemeinsame Plattform.</span></span></div></div></div></section>

            <section className="bg-white py-16 md:py-24"><div className="mx-auto max-w-[1480px] px-5 md:px-8 xl:px-10"><div className="relative overflow-hidden bg-[#0a2647] px-6 py-12 text-white sm:px-10 md:py-16 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-14"><div aria-hidden className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_right,rgba(49,126,230,.28),transparent_68%)]" /><div className="relative"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#8dbcf8]">Beratung mit deinem Ablauf</span><h2 className="mt-3 max-w-[790px] text-[clamp(2rem,3.4vw,3.35rem)] font-semibold leading-[1.04] tracking-[-.044em]">Zeig uns, wie dein Teilehandel heute arbeitet. Wir zeigen dir, wie Partsunion ihn zusammenführt.</h2><p className="mt-4 max-w-[740px] text-sm leading-6 text-white/62">Ohne Preisliste und ohne Standardschau. Im Gespräch gehen wir die Bereiche durch, die für deinen Betrieb wirklich zählen.</p></div><Link href="/beratung" className="relative mt-8 inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-[#2f7df0] px-6 text-sm font-semibold text-white transition hover:bg-[#428cf8] lg:mt-0">Beratung vereinbaren <ArrowUpRight className="h-4 w-4" /></Link></div></div></section>
        </div>
    );
}
