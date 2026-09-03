'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    BadgeEuro,
    BookOpenCheck,
    FileCheck2,
    FileImage,
    Inbox,
    Mail,
    MessageCircle,
    PackageCheck,
    Phone,
    ScanLine,
    ShoppingCart,
    Warehouse,
    type LucideIcon,
} from 'lucide-react';
import { useHydrationSafeReducedMotion } from '@/components/motion/useHydrationSafeReducedMotion';

const separateSources: Array<{ label: string; icon: LucideIcon }> = [
    { label: 'WhatsApp', icon: MessageCircle },
    { label: 'Telefon', icon: Phone },
    { label: 'Fahrzeugschein', icon: FileImage },
    { label: 'Herstellerkatalog', icon: BookOpenCheck },
    { label: 'Lager', icon: Warehouse },
    { label: 'Notiz oder E-Mail', icon: Mail },
];

const connectedStages: Array<{ label: string; detail: string; icon: LucideIcon }> = [
    { label: 'Anfrage', detail: 'Kunde und Bedarf', icon: Inbox },
    { label: 'OE-Prüfung', detail: 'Fahrzeug und Teil', icon: ScanLine },
    { label: 'Angebot', detail: 'Preis und Termin', icon: BadgeEuro },
    { label: 'Auftrag', detail: 'Freigabe des Kunden', icon: ShoppingCart },
    { label: 'Bestellung', detail: 'Fehlmenge decken', icon: PackageCheck },
    { label: 'Abschluss', detail: 'Beleg oder Retoure', icon: FileCheck2 },
];

const outcomes = [
    ['Weniger Rückfragen', 'Status und Zuständigkeit sind sichtbar.'],
    ['Weniger suchen', 'Fahrzeug, Teil und Belege bleiben zusammen.'],
    ['Mehr abwickeln', 'Der nächste Schritt baut auf dem geprüften Stand auf.'],
];

export function ProcessComparison() {
    const reducedMotion = useHydrationSafeReducedMotion();

    return (
        <section id="vergleich" className="scroll-mt-24 overflow-hidden border-b border-[#dbe2eb] bg-white py-12 md:py-16">
            <div className="mx-auto max-w-[1420px] px-5 md:px-8 xl:px-10">
                <div className="grid gap-5 lg:grid-cols-[.78fr_1.22fr] lg:items-end lg:gap-14">
                    <div>
                        <div className="text-[9px] font-bold uppercase tracking-[.16em] text-[#1c6dd8]">Der Unterschied im Alltag</div>
                        <h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.07] tracking-[-.043em] text-[#111c2e]">Weniger Rückfragen. Weniger suchen. Mehr erledigen.</h2>
                    </div>
                    <p className="max-w-2xl text-[15px] leading-7 text-[#627084] lg:justify-self-end">Aus WhatsApp, Fahrzeugdaten, Katalog, Lager und Belegen wird ein durchgängiger Prozess. Jeder Schritt arbeitet mit dem bereits geprüften Stand weiter.</p>
                </div>

                <div className="mt-7 overflow-hidden border border-[#b9c7d7] bg-white shadow-[0_18px_48px_rgba(20,40,68,.08)] md:mt-9 lg:grid lg:grid-cols-[.72fr_1.28fr]">
                    <div className="border-b border-[#cfd8e3] bg-[#f5f7fa] lg:border-b-0 lg:border-r">
                        <div className="flex h-12 items-center border-b border-[#d6dee8] px-4 sm:px-5">
                            <span className="text-[9px] font-bold uppercase tracking-[.13em] text-[#6f7d8e]">Heute oft verteilt</span>
                            <span className="ml-auto text-[8px] font-semibold text-[#8c5b25]">6 Anlaufstellen</span>
                        </div>
                        <div className="grid grid-cols-2">
                            {separateSources.map((source, index) => {
                                const Icon = source.icon;
                                return (
                                    <motion.div
                                        key={source.label}
                                        initial={reducedMotion ? false : { opacity: 0, x: -7 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-50px' }}
                                        transition={{ duration: reducedMotion ? 0 : .25, delay: reducedMotion ? 0 : index * .04 }}
                                        className={`flex min-h-[62px] items-center gap-2.5 px-3 py-3 sm:px-5 ${index > 1 ? 'border-t border-[#dfe5ec]' : ''} ${index % 2 === 1 ? 'border-l border-[#dfe5ec]' : ''}`}
                                    >
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#c2cedb] bg-white text-[#58708c]"><Icon className="h-3.5 w-3.5" /></span>
                                        <strong className="text-[9px] leading-4 text-[#334156] sm:text-[10px]">{source.label}</strong>
                                    </motion.div>
                                );
                            })}
                        </div>
                        <div className="border-t border-[#d6dee8] bg-[#fff8ee] px-4 py-3 text-[9px] leading-4 text-[#79552d] sm:px-5">Der aktuelle Stand muss zwischen mehreren Stellen zusammengesucht werden.</div>
                    </div>

                    <div className="min-w-0">
                        <div className="flex min-h-12 items-center gap-3 border-b border-[#d6dee8] bg-[#0d2b57] px-4 text-white sm:px-5">
                            <span className="text-[9px] font-bold uppercase tracking-[.13em] text-[#a8caf8]">Mit Partsunion</span>
                            <span className="hidden text-[8px] text-white/55 sm:inline">Kunde · Fahrzeug · Teilebedarf · Belege</span>
                            <span className="ml-auto flex items-center gap-1.5 text-[8px] font-semibold text-white/78"><span className="h-1.5 w-1.5 bg-[#54b77a]" /> ein Vorgang</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3">
                            {connectedStages.map((stage, index) => {
                                const Icon = stage.icon;
                                return (
                                    <motion.div
                                        key={stage.label}
                                        initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-50px' }}
                                        transition={{ duration: reducedMotion ? 0 : .28, delay: reducedMotion ? 0 : .12 + index * .05 }}
                                        className={`relative min-h-[94px] px-3 py-4 sm:px-4 ${index > 1 ? 'border-t border-[#dce3ea]' : ''} ${index === 2 ? 'border-t sm:border-t-0' : ''} ${index % 2 === 1 ? 'border-l border-[#dce3ea] sm:border-l-0' : ''} ${index % 3 !== 0 ? 'sm:border-l sm:border-[#dce3ea]' : ''}`}
                                    >
                                        <div className="flex items-center justify-between"><span className="font-mono text-[7px] font-bold text-[#1d6fe8]">0{index + 1}</span><Icon className="h-3.5 w-3.5 text-[#60758e]" /></div>
                                        <strong className="mt-3 block text-[10px] font-semibold text-[#223047] sm:text-[11px]">{stage.label}</strong>
                                        <span className="mt-1 block text-[8px] leading-3 text-[#758293]">{stage.detail}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                        <div className="grid grid-cols-3 border-t border-[#d6dee8] bg-[#f4f7fa]">
                            {outcomes.map(([title, detail], index) => (
                                <div key={title} className={`px-2.5 py-3 sm:px-4 ${index > 0 ? 'border-l border-[#dce3eb]' : ''}`}>
                                    <strong className="block text-[8px] leading-3 text-[#225fae] sm:text-[10px]">{title}</strong>
                                    <span className="mt-1 hidden text-[7px] leading-3 text-[#6e7b8c] sm:block">{detail}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 border-t border-[#d9e1ea] pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] leading-5 text-[#677587]">Automatisierung unterstützt den Ablauf. Teileauswahl, Bestellungen und Buchungen bleiben kontrolliert.</p>
                    <Link href="/plattform" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#155fc8]">Plattform im Detail <ArrowRight className="h-4 w-4" /></Link>
                </div>
            </div>
        </section>
    );
}
