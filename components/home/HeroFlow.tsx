'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    BadgeEuro,
    CheckCircle2,
    FileImage,
    Inbox,
    PackageCheck,
    ScanLine,
    ShoppingCart,
    Store,
    WalletCards,
    Warehouse,
    type LucideIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { whatsappPreviewData } from '@/components/landing/WhatsAppPreview';
import type { ChatMessage } from '@/components/landing/feature-previews/ChatPreview';
import { useHydrationSafeReducedMotion } from '@/components/motion/useHydrationSafeReducedMotion';

type FlowScene = {
    label: string;
    shortLabel: string;
    image: string;
    alt: string;
    title: string;
    detail: string;
    icon: LucideIcon;
    cropClass: string;
};

const scenes: FlowScene[] = [
    {
        label: 'Anfrage kommt rein',
        shortLabel: 'Anfrage',
        image: '/product/verkauf-arbeitsvorrat.png',
        alt: 'Originaler Partsunion Arbeitsvorrat mit eingegangenen Kundenanfragen',
        title: 'Die Nachricht landet direkt im Arbeitsvorrat',
        detail: 'Kanal, Kunde und Teilebedarf werden gemeinsam bearbeitbar.',
        icon: Inbox,
        cropClass: 'scale-[1.2] origin-[50%_10%]',
    },
    {
        label: 'Fahrzeugschein kommt dazu',
        shortLabel: 'Fahrzeug',
        image: '/product/whatsapp-vorgang.png',
        alt: 'Originale Partsunion Detailansicht eines WhatsApp-Vorgangs',
        title: 'Der Fahrzeugschein bleibt direkt am Kundenfall',
        detail: 'Originalnachricht, Dokument und Fahrzeug bleiben zusammen.',
        icon: FileImage,
        cropClass: 'scale-[1.42] origin-[58%_12%]',
    },
    {
        label: 'OE und Alternativen werden ermittelt',
        shortLabel: 'OE-Suche',
        image: '/product/artikel-bestand.png',
        alt: 'Originale Partsunion Artikel- und Bestandsansicht',
        title: 'Der Herstellerkatalog liefert passende Teile',
        detail: 'OE-Bezug, Alternativen, Preis und Bestand fließen in die Auswahl.',
        icon: ScanLine,
        cropClass: 'scale-[1.48] origin-[50%_12%]',
    },
    {
        label: 'Kunde wählt ATE',
        shortLabel: 'Auswahl',
        image: '/product/whatsapp-vorgang.png',
        alt: 'Originale Partsunion Konversationsansicht während der Artikelauswahl',
        title: 'Die Kundenauswahl kommt zurück in denselben Vorgang',
        detail: 'Kein Abtippen: Kunde, Fahrzeug, Artikel und Preis bleiben verbunden.',
        icon: ShoppingCart,
        cropClass: 'scale-[1.42] origin-[63%_12%]',
    },
    {
        label: 'Angebot wird bestätigt',
        shortLabel: 'Angebot',
        image: '/product/verkaufsauftrag.png',
        alt: 'Originale Partsunion Ansicht eines Verkaufsauftrags',
        title: 'Aus der Auswahl entsteht ein verbundenes Angebot',
        detail: 'Artikel, Preis und Liefertermin stehen ohne Neuerfassung bereit.',
        icon: BadgeEuro,
        cropClass: 'scale-[1.12] origin-[58%_15%]',
    },
    {
        label: 'Auftrag ist angelegt',
        shortLabel: 'Auftrag',
        image: '/product/verkaufsauftrag.png',
        alt: 'Originale Partsunion Ansicht des fertigen Verkaufsauftrags',
        title: 'Angebot, Auftrag und Liefertermin bleiben verbunden',
        detail: 'Kunde, Fahrzeug und ausgewählte Teile laufen im Auftrag weiter.',
        icon: PackageCheck,
        cropClass: 'scale-[1.12] origin-[58%_15%]',
    },
];

function ChatBubble({ message }: { message: ChatMessage }) {
    const isBot = message.from === 'bot';

    if (message.kind === 'image') {
        return (
            <div className="max-w-[92%] rounded-md rounded-tl-none bg-white p-1.5 shadow-sm">
                <div className="rounded bg-[#f1f0ec] p-1.5">
                    <div className="mb-1 h-1 rounded-full bg-[#0e9f77]" />
                    <div className="text-[5px] font-bold text-[#0e5b43]">ZULASSUNGSBESCHEINIGUNG TEIL I</div>
                    <div className="mt-1 grid grid-cols-2 gap-1 text-[5px]"><span>HSN <b>0603</b></span><span>TSN <b>BNK</b></span><span className="col-span-2">VIN <b>WVWZZZ1KZAW1923XX</b></span></div>
                </div>
                <span className="mt-1 block text-[6px] text-[#68747e]">{message.imageLabel}</span>
                <span className="block text-right text-[5px] text-[#7d868d]">{message.time}</span>
            </div>
        );
    }

    if (message.kind === 'offer') {
        return (
            <div className="ml-auto max-w-[94%] rounded-md rounded-tr-none bg-[#d9fdd3] px-2 py-1.5 shadow-sm">
                <div className="whitespace-pre-line">{message.text}</div>
                <div className="mt-1.5 border-t border-[#8daf87]/35 pt-1.5"><strong className="text-[9px]">{message.price}</strong><span className="ml-1 text-[5px]">inkl. MwSt.</span><div className="mt-0.5 text-[6px] text-[#5f7363]">{message.deliveryNote}</div></div>
                <div className="mt-1.5 rounded bg-[#008069] py-1 text-center text-[6px] font-bold text-white">JETZT BESTELLEN</div>
                <span className="mt-1 block text-right text-[5px] text-[#5f7363]">{message.time} ✓✓</span>
            </div>
        );
    }

    if (message.kind === 'confirm') {
        return (
            <div className="ml-auto max-w-[94%] rounded-md rounded-tr-none bg-[#d9fdd3] px-2 py-1.5 shadow-sm">
                <div className="flex items-center gap-1 font-semibold"><CheckCircle2 className="h-2.5 w-2.5 text-[#067647]" /> Auftrag #{message.orderId} angelegt</div>
                <div className="mt-1 text-[6px] text-[#5f7363]">Lieferung {message.eta}</div>
                <span className="mt-1 block text-right text-[5px] text-[#5f7363]">{message.time} ✓✓</span>
            </div>
        );
    }

    const body = 'text' in message ? message.text : '';
    return (
        <div className={`max-w-[94%] whitespace-pre-line rounded-md px-2 py-1.5 shadow-sm ${isBot ? 'ml-auto rounded-tr-none bg-[#d9fdd3]' : 'rounded-tl-none bg-white'}`}>
            {body}
            <span className={`mt-1 block text-right text-[5px] ${isBot ? 'text-[#5f7363]' : 'text-[#7d868d]'}`}>{message.time}{isBot ? ' ✓✓' : ''}</span>
        </div>
    );
}

function PhoneConversation({ active, reducedMotion }: { active: number; reducedMotion: boolean }) {
    const visibleMessages = whatsappPreviewData.messages.filter((_, index) => index <= active);
    const translateY = [0, 0, -36, -72, -158, -214][active] ?? 0;

    return (
        <div data-hero-phone className="relative z-20 w-full rounded-[27px] border-[5px] border-[#111827] bg-[#111827] p-1 shadow-[0_22px_55px_rgba(7,17,34,.28)]">
            <div className="absolute left-1/2 top-1.5 z-20 h-3.5 w-14 -translate-x-1/2 rounded-full bg-[#111827]" />
            <div className="overflow-hidden rounded-[19px] bg-[#e9eee9]">
                <div className="flex h-10 items-end gap-1.5 bg-[#008069] px-2 pb-1.5 text-white sm:h-11">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[7px] font-bold">{whatsappPreviewData.customerInitials}</span>
                    <span className="min-w-0"><strong className="block truncate text-[7px] leading-none sm:text-[8px]">{whatsappPreviewData.customerName}</strong><span className="text-[5px] text-white/70">online</span></span>
                </div>
                <div className="relative h-[210px] overflow-hidden bg-[#e5ece8] sm:h-[310px] lg:h-[330px]">
                    <motion.div animate={{ y: translateY }} transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }} className="space-y-1.5 px-1.5 py-2 text-[6px] leading-[1.35] text-[#28313a] sm:px-2 sm:text-[7px] lg:text-[7.5px]">
                        <AnimatePresence initial={false}>
                            {visibleMessages.map((message, index) => <motion.div key={`${index}-${message.time}`} initial={reducedMotion ? false : { opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}><ChatBubble message={message} /></motion.div>)}
                        </AnimatePresence>
                    </motion.div>
                </div>
                <div className="flex h-8 items-center gap-1 bg-[#f7f8f8] px-1.5 text-[5px] text-[#89929a]"><span className="flex-1 rounded-full bg-white px-2 py-1.5">Nachricht</span><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#008069] text-white">➤</span></div>
            </div>
        </div>
    );
}

const coreModules = [
    { label: 'ERP', icon: WalletCards },
    { label: 'WaWi', icon: Warehouse },
    { label: 'Theke', icon: Store },
    { label: 'Kasse', icon: BadgeEuro },
];

export function HeroFlow() {
    const reducedMotion = useHydrationSafeReducedMotion();
    const [active, setActive] = useState(0);
    const scene = scenes[active];
    const SceneIcon = scene.icon;

    useEffect(() => {
        const timer = window.setTimeout(() => setActive((value) => (value + 1) % scenes.length), 4200);
        return () => window.clearTimeout(timer);
    }, [active]);

    return (
        <section className="relative overflow-hidden border-b border-[#d9e1ec] bg-white pt-[72px]">
            <div aria-hidden className="pointer-events-none absolute inset-y-[72px] right-0 hidden w-[57%] border-l border-[#e3e9f0] bg-[#f3f6fa] lg:block" />

            <div className="relative mx-auto grid max-w-[1480px] gap-7 px-5 py-8 md:gap-10 md:px-8 md:py-14 lg:min-h-[730px] lg:grid-cols-[.66fr_1.34fr] lg:items-center lg:gap-9 lg:py-10 xl:px-10">
                <div className="relative z-10 max-w-[535px]">
                    <motion.div initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : 0.42 }} className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.16em] text-[#1d68cb] sm:text-[10px]">
                        <span className="h-px w-8 bg-[#2e7be3]" /> ERP & Warenwirtschaft für den Teilehandel
                    </motion.div>
                    <motion.h1 initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.05 }} className="mt-4 max-w-[535px] text-[clamp(2.15rem,3.15vw,3.05rem)] font-semibold leading-[1.06] tracking-[-.043em] text-[#101a2b] sm:mt-5">
                        Zukunft beginnt, wo Prozesse automatisiert werden.
                    </motion.h1>
                    <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.12 }} className="mt-4 max-w-[520px] sm:mt-5">
                        <strong className="block text-[17px] font-semibold leading-6 text-[#27364b]">Vom ersten Foto bis zu Bestellung, Beleg, Retoure und Reklamation.</strong>
                        <p className="mt-2 text-[15px] leading-[1.65] text-[#647084]">Partsunion verbindet Warenwirtschaft, Theke und Kasse für den Autoteilehandel.<span className="hidden sm:inline"> Kundenanfrage, Fahrzeug, Teil und alle nächsten Schritte bleiben in einem Vorgang.</span></p>
                    </motion.div>

                    <div className="mt-5 grid max-w-[500px] grid-cols-4 border-y border-[#cdd8e6] bg-white sm:mt-6">
                        {coreModules.map((item, index) => { const Icon = item.icon; return <div key={item.label} className={`flex items-center justify-center gap-1.5 py-3 text-[10px] font-bold text-[#334156] ${index > 0 ? 'border-l border-[#d8e0ea]' : ''}`}><Icon className="h-3.5 w-3.5 text-[#1d6fe8]" />{item.label}</div>; })}
                    </div>

                    <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.46, delay: reducedMotion ? 0 : 0.2 }} className="mt-5 grid grid-cols-[1.25fr_.75fr] gap-2.5 sm:mt-7 sm:flex sm:gap-3">
                        <Link href="/beratung" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#1d6fe8] px-3 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(29,111,232,.23)] transition hover:-translate-y-0.5 hover:bg-[#155fc8] sm:px-6 sm:text-sm">Beratung vereinbaren <ArrowUpRight className="h-4 w-4" /></Link>
                        <Link href="/loesungen" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#bfc9d6] bg-white px-3 text-xs font-semibold text-[#334156] transition hover:border-[#2878e5] hover:text-[#155fc8] sm:px-5 sm:text-sm"><span className="sm:hidden">Lösungen</span><span className="hidden sm:inline">Lösungen ansehen</span> <ArrowRight className="h-4 w-4" /></Link>
                    </motion.div>

                    <div className="mt-5 max-w-[510px] border-t border-[#dce3eb] pt-3 sm:mt-7 sm:pt-4">
                        <span className="block text-[8px] font-bold uppercase tracking-[.15em] text-[#8792a1]">Eingänge werden direkt bearbeitbar</span>
                        <div className="mt-2.5 flex items-center justify-between text-[10px] font-semibold text-[#526075] sm:text-[11px]"><span>WhatsApp</span><span className="h-1 w-1 rounded-full bg-[#a9b3c0]" /><span>Telefon</span><span className="h-1 w-1 rounded-full bg-[#a9b3c0]" /><span>Theke</span><span className="h-1 w-1 rounded-full bg-[#a9b3c0]" /><span>E-Mail</span></div>
                    </div>
                </div>

                <motion.div
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.68, delay: reducedMotion ? 0 : 0.12 }}
                    className="relative min-w-0"
                >
                    <div className="relative overflow-hidden border border-[#aebdce] bg-white shadow-[0_26px_60px_rgba(25,46,76,.16)]">
                        <div className="flex min-h-12 items-center gap-3 border-b border-[#cfd8e3] bg-[#f8fafc] px-3 text-[#17243a] sm:px-4">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#a9bfd9] bg-white text-[#1d6fe8]"><Activity className="h-3.5 w-3.5" /></span>
                            <span><strong className="block text-[9px] font-semibold sm:text-[10px]">Kundenfall KF-2026-0871</strong><span className="hidden text-[7px] text-[#7b8795] sm:block">Eingang · Fahrzeug · Teilebedarf · Verkauf</span></span>
                            <AnimatePresence mode="wait"><motion.span key={scene.label} initial={reducedMotion ? false : { opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -3 }} transition={{ duration: reducedMotion ? 0 : 0.25 }} className="ml-auto max-w-[48%] truncate border-l border-[#d5dde7] pl-3 text-[7px] font-semibold text-[#245faa] sm:text-[8px]">{scene.label}</motion.span></AnimatePresence>
                            <span className="font-mono text-[7px] font-bold text-[#8793a2]">0{active + 1}/06</span>
                        </div>

                        <div className="bg-[#e9eef4] p-2 sm:p-3">
                            <div className="mb-2 grid grid-cols-[90px_18px_minmax(0,1fr)] items-center gap-1 px-0.5 text-[5px] font-bold uppercase tracking-[.1em] text-[#637489] sm:grid-cols-[165px_30px_minmax(0,1fr)] sm:gap-2 sm:text-[7px] sm:tracking-[.12em] lg:grid-cols-[180px_34px_minmax(0,1fr)]">
                                <span>Kundenkontakt</span><span /><span>Bearbeitung mit Partsunion</span>
                            </div>
                            <div className="relative grid grid-cols-[90px_18px_minmax(0,1fr)] items-center gap-1 sm:grid-cols-[165px_30px_minmax(0,1fr)] sm:items-end sm:gap-2 lg:grid-cols-[180px_34px_minmax(0,1fr)]">
                                <PhoneConversation active={active} reducedMotion={reducedMotion} />

                                <div aria-hidden className="relative flex h-full min-h-24 items-center justify-center">
                                    <span className="absolute inset-x-0 top-1/2 h-px bg-[#7fa1c9]" />
                                    {!reducedMotion && <motion.span key={active} initial={{ x: -7, opacity: 0 }} animate={{ x: 7, opacity: [0, 1, 0] }} transition={{ duration: .8, ease: 'easeInOut' }} className="absolute top-1/2 z-20 h-1.5 w-1.5 -translate-y-1/2 bg-[#1d6fe8]" />}
                                    <span className="relative z-10 flex h-5 w-5 items-center justify-center border border-[#75a0d4] bg-[#e9eef4] text-[#226bc9] sm:h-7 sm:w-7"><ArrowRight className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" /></span>
                                </div>

                                <div data-hero-desktop className="relative z-20 min-w-0 overflow-hidden border border-[#aebed0] bg-[#dfe6ef] shadow-[0_14px_34px_rgba(20,38,65,.12)]">
                                    <div className="flex h-7 items-center border-b border-[#c9d2de] bg-white px-2 sm:h-8 sm:px-2.5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#e06e6e]" /><span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#e4bd58]" /><span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#61bd7c]" />
                                        <span className="mx-auto rounded bg-[#f0f3f7] px-2 py-1 text-[4px] text-[#87919e] sm:px-7 sm:text-[6px]">app.partsunion.de</span>
                                    </div>
                                    <div className="relative aspect-[1.6/1] overflow-hidden bg-[#eef1f5]">
                                        <AnimatePresence mode="wait"><motion.div key={scene.image} initial={false} animate={{ opacity: 1 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.24 }} className="absolute inset-0"><Image src={scene.image} alt={scene.alt} fill priority unoptimized className={`object-contain object-top transition-transform duration-500 ${scene.cropClass}`} sizes="(max-width: 1024px) 58vw, 46vw" /></motion.div></AnimatePresence>
                                    </div>
                                    <AnimatePresence mode="wait"><motion.div key={scene.title} initial={reducedMotion ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.32 }} aria-live="polite" className="flex min-h-[48px] items-center gap-2 bg-white px-2 py-2 sm:min-h-[58px] sm:px-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#e9f2ff] text-[#1d6fe8] sm:h-7 sm:w-7"><SceneIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" /></span><span className="min-w-0"><strong className="block truncate text-[6px] font-semibold text-[#172235] sm:text-[9px] lg:text-[11px]">{scene.title}</strong><span className="mt-0.5 hidden truncate text-[7px] text-[#697586] sm:block">{scene.detail}</span></span></motion.div></AnimatePresence>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-6 border-t border-[#cbd5e1] bg-white">
                            {scenes.map((item, index) => <button key={item.shortLabel} type="button" data-hero-scene={index} onClick={() => setActive(index)} className={`relative min-w-0 overflow-hidden border-r border-[#d7dee7] px-0.5 py-2.5 text-[5.5px] font-bold uppercase tracking-[-.01em] transition last:border-r-0 sm:px-1 sm:py-3 sm:text-[7px] sm:tracking-[.04em] ${active === index ? 'bg-[#edf4ff] text-[#155fc8]' : 'bg-white text-[#8290a2] hover:bg-[#f7f9fc] hover:text-[#405169]'}`} aria-label={`Schritt ${index + 1}: ${item.label}`} aria-pressed={active === index} aria-current={active === index ? 'step' : undefined}>{item.shortLabel}{active === index && <motion.span key={`progress-${active}`} initial={reducedMotion ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reducedMotion ? 0 : 4.2, ease: 'linear' }} className="absolute inset-x-0 top-0 h-0.5 origin-left bg-[#1d6fe8]" />}</button>)}
                        </div>
                        <div className="flex items-center justify-between border-t border-[#d7dee7] bg-[#f8fafc] px-3 py-2 text-[6px] text-[#8793a2] sm:text-[7px]"><span>Originale Partsunion-Ansichten</span><span className="font-bold">DEMO-DATEN</span></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
