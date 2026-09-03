'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    BadgeEuro,
    CheckCircle2,
    FileCheck2,
    Inbox,
    ScanLine,
    ShoppingCart,
    UserRoundCheck,
    type LucideIcon,
} from 'lucide-react';
import { useHydrationSafeReducedMotion } from '@/components/motion/useHydrationSafeReducedMotion';

const separatePlaces = ['WhatsApp', 'Telefon', 'Katalog', 'Notizen', 'Lager', 'Buchhaltung'];

const stages: Array<{ label: string; detail: string; icon: LucideIcon }> = [
    { label: 'Eingang', detail: 'WhatsApp, Telefon oder Theke', icon: Inbox },
    { label: 'Fahrzeug', detail: 'VIN, HSN/TSN und Dokumente', icon: UserRoundCheck },
    { label: 'OE-Prüfung', detail: 'Katalog und Alternativen', icon: ScanLine },
    { label: 'Angebot', detail: 'Teil, Preis und Liefertermin', icon: BadgeEuro },
    { label: 'Auftrag', detail: 'Freigabe und Beschaffung', icon: ShoppingCart },
    { label: 'Abschluss', detail: 'Beleg, Zahlung oder Folgefall', icon: FileCheck2 },
];

export function ConnectedProcess() {
    const reducedMotion = useHydrationSafeReducedMotion();

    return (
        <section id="ablauf" className="scroll-mt-24 overflow-hidden bg-[#0b274d] py-12 text-white md:py-16">
            <div className="mx-auto max-w-[1420px] px-5 md:px-8 xl:px-10">
                <div className="grid gap-6 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
                    <div>
                        <div className="text-[9px] font-bold uppercase tracking-[.16em] text-[#8dbafd]">Der Partsunion Arbeitsablauf</div>
                        <h2 className="mt-3 max-w-[620px] text-[clamp(2rem,3.1vw,3rem)] font-semibold leading-[1.08] tracking-[-.043em]">Ein Prozess. Vom ersten Kontakt bis zum Abschluss.</h2>
                    </div>
                    <p className="max-w-2xl text-[15px] leading-7 text-white/62 lg:justify-self-end">Nicht jede Aufgabe muss vollautomatisch laufen. Entscheidend ist, dass Kunde, Fahrzeug, Teil, Bestand und Belege denselben geprüften Stand verwenden.</p>
                </div>

                <div className="mt-6 flex flex-col gap-3 border-y border-white/12 py-4 md:mt-8 lg:flex-row lg:items-center">
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-[.13em] text-white/45">Heute oft verteilt auf</span>
                    <div className="flex flex-wrap gap-1.5">
                        {separatePlaces.map((place) => <span key={place} className="rounded border border-white/10 bg-white/[.045] px-2.5 py-1.5 text-[9px] font-medium text-white/60">{place}</span>)}
                    </div>
                    <span className="hidden h-px flex-1 bg-white/10 lg:block" />
                    <span className="text-xs font-semibold text-[#9dc4fb]">Partsunion führt alles zusammen.</span>
                </div>

                <div className="mt-6 overflow-hidden border border-[#7391b4] bg-white text-[#18263a] shadow-[0_22px_52px_rgba(2,14,32,.2)] md:mt-7">
                    <div className="flex min-h-12 items-center border-b border-[#cbd5df] bg-[#f4f7fa] px-4">
                        <strong className="text-[9px] font-semibold">VORGANGSAKTE · KF-2026-0871</strong>
                        <span className="ml-3 hidden text-[8px] text-[#788595] sm:inline">Bremsen vorne · VW Golf VII</span>
                        <span className="ml-auto flex items-center gap-1.5 border border-[#a9c9b5] bg-[#edf7f0] px-2.5 py-1 text-[7px] font-bold text-[#267347]"><CheckCircle2 className="h-3 w-3" /> IN BEARBEITUNG</span>
                    </div>

                    <div className="grid lg:grid-cols-[230px_1fr]">
                        <aside className="border-b border-[#d4dce5] bg-[#eef3f8] p-4 lg:border-b-0 lg:border-r lg:p-5">
                            <div className="text-[7px] font-bold uppercase tracking-[.13em] text-[#6f7e90]">Alles an einem Vorgang</div>
                            <dl className="mt-3 border-t border-[#cad4df] text-[8px]">
                                {[
                                    ['Kunde', 'KFZ Meier GmbH'],
                                    ['Fahrzeug', 'VW Golf VII'],
                                    ['Teilebedarf', 'Bremsen vorne'],
                                    ['Verantwortlich', 'Lena König'],
                                ].map(([label, value]) => <div key={label} className="border-b border-[#d3dce5] py-2"><dt className="text-[#7a8796]">{label}</dt><dd className="mt-0.5 font-semibold">{value}</dd></div>)}
                            </dl>
                            <p className="mt-4 text-[8px] leading-4 text-[#687688]">Diese Angaben werden nicht an jedem Arbeitsschritt neu angelegt.</p>
                        </aside>

                        <div className="min-w-0">
                            <div className="hidden grid-cols-[42px_1fr_1.35fr_76px] border-b border-[#d4dce5] bg-[#f8fafc] px-4 py-2 text-[7px] font-bold uppercase tracking-[.09em] text-[#788595] sm:grid"><span>Nr.</span><span>Arbeitsschritt</span><span>Vorliegende Informationen</span><span>Status</span></div>
                            {stages.map((stage, index) => {
                                const Icon = stage.icon;
                                const states = ['erfasst', 'zugeordnet', 'geprüft', 'vorbereitet', 'freigegeben', 'offen'];
                                return (
                                    <motion.div key={stage.label} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.28, delay: reducedMotion ? 0 : index * 0.035 }} className={`grid grid-cols-[32px_1fr_auto] items-center gap-3 px-3 py-3 sm:grid-cols-[42px_1fr_1.35fr_76px] sm:px-4 ${index > 0 ? 'border-t border-[#dce3ea]' : ''}`}>
                                        <span className="font-mono text-[7px] font-bold text-[#1d6fe8]">0{index + 1}</span>
                                        <span className="flex min-w-0 items-center gap-2"><Icon className="h-3.5 w-3.5 shrink-0 text-[#526a86]" /><strong className="truncate text-[9px] sm:text-[10px]">{stage.label}</strong></span>
                                        <span className="hidden truncate text-[8px] text-[#6d7a8b] sm:block">{stage.detail}</span>
                                        <span className={`text-right text-[7px] font-semibold ${index === 5 ? 'text-[#9a6b21]' : 'text-[#28734a]'}`}>{states[index]}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 border-t border-[#cbd5df] bg-[#0d2b57] text-white">
                        {[
                            ['Weniger Rückfragen', 'Status und Zuständigkeit am Vorgang'],
                            ['Weniger suchen', 'Fahrzeug, Teil und Belege verbunden'],
                            ['Mehr skalieren', 'Ein Ablauf für mehr Vorgänge'],
                        ].map(([title, text], index) => <div key={title} className={`p-3 sm:px-5 sm:py-4 ${index > 0 ? 'border-l border-white/12' : ''}`}><strong className="block text-[9px] font-semibold leading-4 text-[#afd0ff] sm:text-xs">{title}</strong><p className="mt-1 hidden text-[8px] leading-4 text-white/52 sm:block">{text}</p></div>)}
                    </div>
                </div>

                <Link href="/beratung" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#9bc3fb] transition hover:text-white">Eigenen Ablauf gemeinsam prüfen <ArrowRight className="h-4 w-4" /></Link>
            </div>
        </section>
    );
}
