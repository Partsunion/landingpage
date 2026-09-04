'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Boxes, FileText, Inbox, LayoutDashboard, ShoppingCart, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { useHydrationSafeReducedMotion } from '@/components/motion/useHydrationSafeReducedMotion';

type ProductView = {
    key: string;
    label: string;
    title: string;
    description: string;
    image: string;
    width: number;
    height: number;
    icon: LucideIcon;
    facts: string[];
};

const views: ProductView[] = [
    {
        key: 'arbeit',
        label: 'Meine Arbeit',
        title: 'Ausnahmen zuerst bearbeiten.',
        description: 'Der Verkaufsarbeitsplatz bündelt Anfragen, Freigaben, Rückstände und fällige Aufgaben. Mitarbeiter sehen nicht nur Zahlen, sondern den nächsten sinnvollen Schritt.',
        image: '/product/verkauf-arbeitsvorrat.png',
        width: 2400,
        height: 1500,
        icon: LayoutDashboard,
        facts: ['Priorisierter Arbeitsvorrat', 'Fälligkeit und Blockiergrund', 'Kunde, Fahrzeug und Vorgang'],
    },
    {
        key: 'anfragen',
        label: 'Anfragen',
        title: 'Jeder Eingang wird bearbeitbar.',
        description: 'WhatsApp, Telefon, E-Mail und manuelle Anfragen landen in einer gemeinsamen Inbox mit Status, Fahrzeug, gesuchtem Teil und Verantwortlichkeit.',
        image: '/product/anfrage-inbox.png',
        width: 2400,
        height: 1500,
        icon: Inbox,
        facts: ['Eine Inbox für alle Eingänge', 'Zuständigkeit und Status', 'Kunde, Fahrzeug und Teil'],
    },
    {
        key: 'auftraege',
        label: 'Aufträge',
        title: 'Alles bleibt am Auftrag.',
        description: 'Kunde, ursprünglicher Teilebedarf, OE-Referenz, Lieferstatus und Auftragspositionen bleiben gemeinsam sichtbar – einschließlich Belegfluss und Bestand.',
        image: '/product/verkaufsauftrag.png',
        width: 2400,
        height: 1500,
        icon: ShoppingCart,
        facts: ['Auftrag und Kunde an einem Ort', 'Bestand und Beschaffung je Position', 'Belegfluss und Notizen'],
    },
    {
        key: 'bestand',
        label: 'Warenwirtschaft',
        title: 'Artikel, Bestand und Marge in einer Sicht.',
        description: 'Die Warenwirtschaft unterscheidet Neuware und Gebrauchtteile und verbindet OE, interne Artikelnummer, Lagerbestand, Einkauf, Verkauf und Marge.',
        image: '/product/artikel-bestand.png',
        width: 2400,
        height: 1500,
        icon: Boxes,
        facts: ['OE und interne Artikelnummer', 'Neuware und Gebrauchtteile', 'Bestand, EK, VK und Marge'],
    },
    {
        key: 'finanzen',
        label: 'Finanzen',
        title: 'Von der Rechnung bis zur Zahlung eindeutig.',
        description: 'Angebot, Auftrag, Lieferschein, Rechnung, Zahlung und Korrektur bleiben als vollständige Belegkette verbunden. Offene Beträge und nächste Schritte sind direkt sichtbar.',
        image: '/product/rechnungen.png',
        width: 2400,
        height: 1500,
        icon: FileText,
        facts: ['Rechnung und Zustellung', 'Offene Posten und Zahlung', 'Storno-, Gutschrift- und Korrekturpfad'],
    },
];

export function ProductShowcase() {
    const [active, setActive] = useState(0);
    const reducedMotion = useHydrationSafeReducedMotion();
    const current = views[active];

    return (
        <div className="mt-8 min-w-0 overflow-hidden border border-[#bdc9d6] bg-white shadow-[0_16px_40px_rgba(22,36,58,.07)] md:mt-10">
            <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] lg:grid-cols-[286px_minmax(0,1fr)]">
                <div className="hidden min-w-0 border-r border-[#dfe3e8] bg-[#f6f8fb] lg:block">
                    <div>
                        {views.map((view, index) => {
                            const Icon = view.icon;
                            const isActive = active === index;
                            return (
                                <button
                                    key={view.key}
                                    type="button"
                                    onClick={() => setActive(index)}
                                    className={`group relative flex w-full items-center gap-3 border-b border-[#dfe3e8] px-4 py-4 text-left transition-colors ${isActive ? 'bg-[#1d6fe8] text-white' : 'bg-[#f6f8fb] text-[#313842] hover:bg-white'}`}
                                    aria-pressed={isActive}
                                >
                                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-[#1d6fe8]'}`} />
                                    <span className="text-sm font-semibold">{view.label}</span>
                                    <span className={`ml-auto font-mono text-[9px] ${isActive ? 'text-white/55' : 'text-[#9298a0]'}`}>0{index + 1}</span>
                                </button>
                            );
                        })}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.key}
                            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                            transition={{ duration: reducedMotion ? 0 : 0.3 }}
                            className="p-5"
                        >
                            <h3 className="text-2xl font-medium tracking-[-0.04em] text-[#101318]">{current.title}</h3>
                            <p className="mt-3 text-[13px] leading-6 text-[#626b75]">{current.description}</p>
                            <ul className="mt-5 space-y-2.5">
                                {current.facts.map((fact) => <li key={fact} className="flex items-start gap-2 text-xs font-medium text-[#353c45]"><span className="mt-1.5 h-1 w-1 shrink-0 bg-[#1d6fe8]" />{fact}</li>)}
                            </ul>
                            <Link href="/beratung" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#155bc3]">Diese Ansicht gemeinsam ansehen <ArrowUpRight className="h-4 w-4" /></Link>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="min-w-0 bg-white p-3 sm:p-4 lg:p-5">
                    <div className="mb-3 border border-[#c9d3df] bg-[#f6f8fb] p-2.5 lg:hidden">
                        <label htmlFor="product-view" className="mb-1.5 block text-[8px] font-bold uppercase tracking-[.12em] text-[#667589]">Produktbereich auswählen</label>
                        <select
                            id="product-view"
                            value={current.key}
                            onChange={(event) => setActive(Math.max(0, views.findIndex((view) => view.key === event.target.value)))}
                            className="h-10 w-full border border-[#bfcbd8] bg-white px-3 text-sm font-semibold text-[#26364a] outline-none focus:border-[#1d6fe8]"
                        >
                            {views.map((view) => <option key={view.key} value={view.key}>{view.label}</option>)}
                        </select>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.figure
                            key={current.image}
                            initial={reducedMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={reducedMotion ? undefined : { opacity: 0 }}
                            transition={{ duration: reducedMotion ? 0 : 0.25 }}
                        >
                            <a href={current.image} target="_blank" rel="noreferrer" className="block overflow-hidden border border-[#c7d0da] bg-[#eef1f4] shadow-[0_12px_28px_rgba(25,38,56,.08)] transition-shadow hover:shadow-[0_16px_34px_rgba(25,38,56,.12)]" aria-label={`${current.label} in Originalgröße öffnen`}>
                                <div className="relative aspect-[4/3] overflow-hidden sm:hidden">
                                    <Image src={current.image} alt={`Originale Partsunion-Demoansicht: ${current.label}`} fill unoptimized className="origin-top scale-[1.15] object-cover object-top" sizes="calc(100vw - 64px)" />
                                </div>
                                <Image src={current.image} alt={`Originale Partsunion-Demoansicht: ${current.label}`} width={current.width} height={current.height} unoptimized className="hidden h-auto w-full sm:block" />
                            </a>
                            <figcaption className="mt-3 flex flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.13em] text-[#7d858e] sm:flex-row sm:items-center sm:justify-between">
                                <span>Originalansicht aus dem Partsunion-Demosystem</span>
                                <a href={current.image} target="_blank" rel="noreferrer" className="text-[#155bc3]">Originalgröße öffnen ↗</a>
                            </figcaption>
                        </motion.figure>
                    </AnimatePresence>
                    <div className="mt-6 lg:hidden">
                        <h3 className="text-2xl font-medium tracking-[-0.04em]">{current.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-[#626b75]">{current.description}</p>
                        <ul className="mt-4 border-t border-[#dce3ea]">
                            {current.facts.map((fact) => <li key={fact} className="flex items-start gap-2 border-b border-[#e3e8ee] py-2.5 text-[11px] font-semibold text-[#354155]"><span className="mt-1.5 h-1 w-1 shrink-0 bg-[#1d6fe8]" />{fact}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
