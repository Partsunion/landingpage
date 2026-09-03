'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
    ArrowRight,
    BookOpenCheck,
    Bot,
    Camera,
    CarFront,
    CheckCircle2,
    Database,
    GitBranch,
    ClipboardCheck,
    FileCheck2,
    PackageSearch,
    Plus,
    RotateCcw,
    ScanLine,
    ShieldCheck,
    ShoppingCart,
    Smartphone,
    TrendingUp,
    Warehouse,
    type LucideIcon,
} from 'lucide-react';
import { useHydrationSafeReducedMotion } from '@/components/motion/useHydrationSafeReducedMotion';
import { PhoneFrame } from '@/components/ui/PhoneFrame';

const catalogBrands = ['VW', 'AUDI', 'BMW', 'MB', 'FORD', 'OPEL', 'RENAULT', 'ŠKODA'];

function OeCatalogGraphic({ reducedMotion }: { reducedMotion: boolean }) {
    return (
        <div className="overflow-hidden border border-[#aebdce] bg-white text-[#162338] shadow-[0_24px_55px_rgba(28,49,77,.13)]">
            <div className="flex min-h-12 items-center border-b border-[#cbd5e0] bg-[#f5f7fa] px-4">
                <GitBranch className="h-4 w-4 text-[#1d6fe8]" />
                <span className="ml-2.5"><strong className="block text-[9px] font-semibold">OE-Prüfakte · Demo</strong><span className="text-[7px] text-[#7b8794]">Vorgang KF-2026-0871</span></span>
                <span className="ml-auto border border-[#b8c5d3] bg-white px-2.5 py-1 text-[7px] font-semibold text-[#526276]">nur lesbar</span>
            </div>

            <div className="p-4 lg:hidden">
                <div className="flex items-center gap-3 border border-[#c7d3df] bg-[#f7f9fb] p-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#abc0d9] bg-white text-[#1d6fe8]"><CarFront className="h-4 w-4" /></span>
                    <span><span className="text-[7px] font-bold uppercase tracking-[.11em] text-[#6d7c8f]">01 · Fahrzeug erkannt</span><strong className="mt-1 block text-[11px]">VW Golf VII · 1.6 TDI</strong><span className="mt-0.5 block font-mono text-[7px] text-[#718095]">HSN/TSN 0603 / BNK</span></span>
                    <CheckCircle2 className="ml-auto h-4 w-4 text-[#247748]" />
                </div>
                <div className="mx-auto h-5 w-px bg-[#9db5d0]" />
                <div className="border-l-4 border-[#1d6fe8] bg-[#edf4fd] p-3">
                    <div className="flex items-center justify-between"><span className="text-[7px] font-bold uppercase tracking-[.11em] text-[#1b63c7]">02 · Herstellerkatalog</span><strong className="text-[10px] text-[#155fc8]">56 Marken</strong></div>
                    <p className="mt-1.5 text-[9px] leading-4 text-[#4f6177]">Fahrzeug und Baugruppe werden mit den lizenzierten Katalogdaten abgeglichen.</p>
                    <span className="mt-2 flex items-center gap-1.5 text-[7px] font-semibold text-[#286f49]"><BookOpenCheck className="h-3 w-3" /> Nutzungsrechte vorhanden</span>
                </div>
                <div className="mx-auto h-5 w-px bg-[#9db5d0]" />
                <div className="flex items-center gap-3 border border-[#b9d7c4] bg-[#f0f8f3] p-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-white text-[#247748]"><CheckCircle2 className="h-4 w-4" /></span>
                    <span><span className="text-[7px] font-bold uppercase tracking-[.11em] text-[#387154]">03 · OE-Zuordnung</span><strong className="mt-1 block font-mono text-[12px] text-[#1f5f3d]">04L 121 011 L</strong><span className="mt-0.5 block text-[7px] text-[#61776b]">Fahrzeugbezug nachvollziehbar gespeichert</span></span>
                </div>
            </div>

            <div className="hidden lg:grid lg:grid-cols-[.78fr_1.08fr_1.14fr]">
                <motion.section initial={reducedMotion ? false : { opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : .34 }} className="border-b border-[#d5dde7] p-4 lg:border-b-0 lg:border-r">
                    <div className="text-[7px] font-bold uppercase tracking-[.12em] text-[#6d7c8f]">01 · Fahrzeugidentität</div>
                    <div className="mt-4 flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#abc0d9] bg-[#edf4fc] text-[#1d6fe8]"><CarFront className="h-5 w-5" /></span>
                        <span><strong className="block text-[11px]">VW Golf VII</strong><span className="mt-1 block text-[7px] leading-3 text-[#718095]">1.6 TDI · 81 kW · Modelljahr 2016</span></span>
                    </div>
                    <dl className="mt-4 border-t border-[#d9e1e9] text-[8px]">
                        {[
                            ['HSN / TSN', '0603 / BNK'],
                            ['VIN', '…1923XX'],
                            ['Quelle', 'Fahrzeugschein'],
                            ['Identität', 'eindeutig'],
                        ].map(([label, value]) => <div key={label} className="grid grid-cols-[72px_1fr] border-b border-[#e1e7ed] py-2"><dt className="text-[#7a8796]">{label}</dt><dd className="font-semibold">{value}</dd></div>)}
                    </dl>
                </motion.section>

                <motion.section initial={reducedMotion ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : .34, delay: reducedMotion ? 0 : .14 }} className="border-b border-[#d5dde7] p-4 lg:border-b-0 lg:border-r">
                    <div className="flex items-center justify-between"><span className="text-[7px] font-bold uppercase tracking-[.12em] text-[#6d7c8f]">02 · Herstellerkatalog</span><span className="text-[7px] font-semibold text-[#1d6fe8]">56 Marken</span></div>
                    <div className="mt-4 border border-[#ccd6e1]">
                        <div className="grid grid-cols-[1fr_62px] border-b border-[#d5dde7] bg-[#f5f7fa] px-3 py-2 text-[7px] font-semibold text-[#667589]"><span>Datenquelle</span><span>Status</span></div>
                        <div className="grid grid-cols-[1fr_62px] items-center px-3 py-3 text-[8px]"><span><strong className="block">Herstellerkatalog</strong><span className="mt-1 block text-[7px] text-[#7d8997]">Fahrzeug- und Baugruppenbezug</span></span><span className="flex items-center gap-1 font-semibold text-[#247748]"><CheckCircle2 className="h-3 w-3" /> aktiv</span></div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">{catalogBrands.map((brand) => <span key={brand} className="border border-[#d2dae4] bg-[#fafbfc] px-2 py-1 text-[6px] font-bold text-[#5f6f82]">{brand}</span>)}</div>
                    <div className="mt-4 flex gap-2 border-t border-[#d9e1e9] pt-3 text-[7px] leading-3 text-[#6c7989]"><BookOpenCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1d6fe8]" /> Partsunion verfügt über die erforderlichen Nutzungsrechte für die angebundenen Katalogdaten.</div>
                </motion.section>

                <motion.section initial={reducedMotion ? false : { opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : .34, delay: reducedMotion ? 0 : .28 }} className="p-4">
                    <div className="text-[7px] font-bold uppercase tracking-[.12em] text-[#6d7c8f]">03 · Zuordnung</div>
                    <div className="mt-4 border-l-4 border-[#1d6fe8] bg-[#edf4fd] px-3 py-3">
                        <span className="text-[7px] text-[#64768a]">OE-Referenz aus dem Demo-Vorgang</span>
                        <strong className="mt-1.5 block font-mono text-[13px] text-[#155fc8]">04L 121 011 L</strong>
                    </div>
                    <div className="mt-3 border border-[#ccd6e1] text-[8px]">
                        {[
                            ['Fahrzeugbezug', 'vorhanden'],
                            ['Baugruppenbezug', 'vorhanden'],
                            ['Alternativen', 'vergleichbar'],
                            ['Bestand / Preis', 'im Artikelstamm'],
                        ].map(([label, value], index) => <div key={label} className={`grid grid-cols-[1fr_auto] px-3 py-2 ${index > 0 ? 'border-t border-[#dfe5ec]' : ''}`}><span className="text-[#758293]">{label}</span><strong className={index < 2 ? 'text-[#247748]' : ''}>{value}</strong></div>)}
                    </div>
                    <div className="mt-3 flex items-center gap-2 border border-[#bfdbc9] bg-[#f0f8f3] px-3 py-2 text-[7px] font-semibold text-[#276e47]"><CheckCircle2 className="h-3.5 w-3.5" /> Nachweis am Vorgang gespeichert</div>
                </motion.section>
            </div>

            <div className="grid grid-cols-4 border-t border-[#cbd5e0] bg-[#f7f9fb] text-center">{[['01', 'Identifizieren'], ['02', 'Abgleichen'], ['03', 'Zuordnen'], ['04', 'Entscheiden']].map(([number, label], index) => <div key={number} className={`px-2 py-3 ${index > 0 ? 'border-l border-[#dbe2e9]' : ''}`}><span className="font-mono text-[7px] font-bold text-[#1d6fe8]">{number}</span><strong className="ml-2 text-[7px] text-[#4c5b6d] sm:text-[8px]">{label}</strong></div>)}</div>
        </div>
    );
}

export function WhatsappOeStory() {
    const reducedMotion = useHydrationSafeReducedMotion();
    return (
        <section id="oe-ermittlung" className="scroll-mt-24 overflow-hidden bg-white py-14 md:py-16">
            <div className="mx-auto grid max-w-[1420px] gap-9 px-5 md:px-8 lg:grid-cols-[390px_1fr] lg:items-center xl:px-10">
                <div>
                    <div className="text-[9px] font-bold uppercase tracking-[.16em] text-[#1c6dd8]">Fahrzeug- & OE-Daten</div>
                    <h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.08] tracking-[-.043em]">Genaue OE-Ermittlung mit Herstellerkatalogen.</h2>
                    <p className="mt-4 text-[15px] leading-7 text-[#5f6b7b]">Fahrzeugschein, VIN und HSN/TSN werden mit lizenzierten Herstellerkatalogen und deinen Artikeldaten verbunden. Partsunion verfügt über die erforderlichen Nutzungsrechte. Die Auswahl bleibt prüfbar – inklusive OE-Nummer, Alternativen, Preis und Bestand.</p>

                    <div className="mt-6 flex items-center gap-4 border-y border-[#dbe3ec] py-4">
                        <strong className="text-5xl font-semibold leading-none tracking-[-.06em] text-[#1d6fe8]">56</strong>
                        <span><strong className="block text-sm font-semibold text-[#1b283b]">Marken in der Fahrzeugdatenbank</strong><span className="mt-1 block text-[11px] leading-4 text-[#718093]">für die genaue Fahrzeug- und Teilezuordnung</span></span>
                    </div>

                    <div className="mt-5 hidden gap-3 lg:grid lg:grid-cols-1">
                        {[
                            ['Fahrzeug erfassen', 'Fahrzeugschein, VIN oder HSN/TSN', Database],
                            ['Katalog prüfen', 'OE-Nummern und Alternativen nachvollziehen', BookOpenCheck],
                            ['Teil entscheiden', 'Alternativen, Preis und Bestand vergleichen', ScanLine],
                        ].map(([title, text, Icon], index) => { const ItemIcon = Icon as LucideIcon; return <motion.div key={title as string} initial={false} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : index * 0.045 }} className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#eaf2fd] text-[#1d6fe8]"><ItemIcon className="h-4 w-4" /></span><span><strong className="block text-xs font-semibold text-[#223047]">{title as string}</strong><span className="mt-0.5 block text-[10px] leading-4 text-[#728092]">{text as string}</span></span></motion.div>; })}
                    </div>
                </div>

                <OeCatalogGraphic reducedMotion={reducedMotion} />
            </div>
        </section>
    );
}

const supplySteps = [
    ['01', 'Angebot bestätigt', 'Artikel, Menge und Kundenpreis'],
    ['02', 'Fehlmenge erkannt', 'Bestand und offene Zugänge geprüft'],
    ['03', 'Bestellvorschlag bereit', 'Menge und Lieferant stehen fest'],
    ['04', 'Bestellung freigegeben', 'Mitarbeiter bestätigt den Einkauf'],
];

const documentFlows = [
    {
        label: 'Verkauf',
        detail: 'vom Kundenbedarf bis zum ausgeglichenen Beleg',
        steps: ['Anfrage', 'Angebot', 'Auftrag', 'Lieferschein', 'Rechnung', 'Zahlung'],
    },
    {
        label: 'Einkauf',
        detail: 'von der Fehlmenge bis zum gebuchten Wareneingang',
        steps: ['Bedarf', 'Bestellvorschlag', 'Bestellung', 'Wareneingang', 'Eingangsbeleg'],
    },
];

export function OrderSupplyStory() {
    const reducedMotion = useHydrationSafeReducedMotion();
    const [supplyActive, setSupplyActive] = useState(1);
    const activeSupplyStep = supplySteps[supplyActive];
    return (
        <section id="bestellung" className="scroll-mt-24 border-y border-[#dbe2eb] bg-[#f6f8fb] py-12 md:py-16">
            <div className="mx-auto max-w-[1420px] px-5 md:px-8 xl:px-10">
                <div className="grid gap-8 lg:grid-cols-[1.22fr_.78fr] lg:items-center lg:gap-10">
                    <div className="relative min-w-0">
                        <div className="overflow-hidden border border-[#bcc8d6] bg-white shadow-[0_24px_60px_rgba(24,44,70,.15)]">
                            <div className="flex h-10 items-center justify-between border-b border-[#d7dee7] px-3"><span className="text-[9px] font-bold text-[#667386]">PARTSUNION · VERKAUFSAUFTRAG</span><AnimatePresence mode="wait"><motion.span key={activeSupplyStep[1]} initial={reducedMotion ? false : { opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -3 }} transition={{ duration: reducedMotion ? 0 : .2 }} className={`px-2 py-1 text-[8px] font-bold ${supplyActive === 3 ? 'bg-[#e8f4ec] text-[#2f7c4a]' : 'bg-[#fff3df] text-[#8b5b1d]'}`}>{activeSupplyStep[1].toUpperCase()}</motion.span></AnimatePresence></div>
                            <Image src="/product/verkaufsauftrag.png" alt="Originale Partsunion Ansicht eines Verkaufsauftrags" width={2400} height={1500} unoptimized className="h-auto w-full" />
                            <AnimatePresence mode="wait"><motion.div key={activeSupplyStep[0]} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .22 }} className="flex items-center gap-3 border-t border-[#d7dee7] bg-[#f6f8fb] px-4 py-3"><PackageSearch className="h-4 w-4 shrink-0 text-[#1d6fe8]" /><span><strong className="block text-[9px] text-[#26364a]">{activeSupplyStep[1]}</strong><span className="mt-0.5 block text-[8px] text-[#748091]">{activeSupplyStep[2]}</span></span></motion.div></AnimatePresence>
                        </div>
                    </div>

                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-[.15em] text-[#1c6dd8]">Auftrag & Beschaffung</div>
                        <h2 className="mt-3 text-[clamp(2rem,3vw,3.05rem)] font-semibold leading-[1.08] tracking-[-.045em]">Angebot, Auftrag und Bestellung sauber verbunden.</h2>
                        <p className="mt-4 text-[15px] leading-7 text-[#5e6a7a]">Fehlt Ware für einen Auftrag, macht Partsunion die Fehlmenge sichtbar und erstellt einen Bestellvorschlag mit Menge und Lieferant. Der Mitarbeiter prüft und gibt die Bestellung frei.</p>
                        <ol className="relative mt-5 grid grid-cols-2 gap-x-3 gap-y-3 sm:mt-6 sm:gap-x-4">
                            {supplySteps.map(([number, title, text], index) => (
                                <motion.li key={number} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : index * 0.045 }} className="border-t border-[#d6e0eb] pt-2">
                                    <button type="button" onClick={() => setSupplyActive(index)} className="group flex w-full gap-2.5 py-1 text-left" aria-pressed={supplyActive === index}>
                                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center border text-[8px] font-bold transition ${index === supplyActive ? 'border-[#1d6fe8] bg-[#1d6fe8] text-white' : index < supplyActive ? 'border-[#9fc6ac] bg-[#eff8f2] text-[#2c7a4a]' : 'border-[#afc3dd] bg-white text-[#276fcf] group-hover:border-[#1d6fe8]'}`}>{index < supplyActive ? '✓' : number}</span>
                                        <span><strong className={`block text-[11px] font-semibold leading-4 sm:text-xs ${index === supplyActive ? 'text-[#155fc8]' : 'text-[#172235]'}`}>{title}</strong><span className="mt-0.5 hidden text-[10px] leading-4 text-[#6b7685] sm:block">{text}</span></span>
                                    </button>
                                </motion.li>
                            ))}
                        </ol>
                        <Link href="/beratung" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#155fc8] sm:mt-7">Bestellablauf gemeinsam ansehen <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                </div>

                <div id="belegfluss" className="mt-8 scroll-mt-24 overflow-hidden border border-[#b9c9dc] bg-white shadow-[0_18px_48px_rgba(24,44,70,.09)] md:mt-11">
                    <div className="grid min-w-0 lg:grid-cols-[280px_minmax(0,1fr)]">
                        <div className="bg-[#0d2b57] p-5 text-white md:p-7">
                            <div className="text-[9px] font-bold uppercase tracking-[.15em] text-[#88b6f8]">Belege & Zahlungen</div>
                            <h3 className="mt-2 text-[22px] font-semibold leading-[1.12] tracking-[-.035em] md:text-2xl">Zwei Ketten. Ein gemeinsamer Stand.</h3>
                            <p className="mt-3 text-xs leading-5 text-white/54">Verkauf, Einkauf, Bestand und Zahlung bleiben am selben Vorgang nachvollziehbar.</p>
                        </div>
                        <div className="min-w-0 divide-y divide-[#dce3ec]">
                            {documentFlows.map((flow) => (
                                <div key={flow.label} className="grid min-w-0 md:grid-cols-[150px_minmax(0,1fr)]">
                                    <div className="border-b border-[#e0e6ee] bg-[#f5f8fc] px-4 py-3 md:border-b-0 md:border-r md:px-5 md:py-5">
                                        <strong className="block text-sm font-semibold text-[#172235]">{flow.label}</strong>
                                        <span className="mt-1 hidden text-[10px] leading-4 text-[#768191] sm:block">{flow.detail}</span>
                                    </div>
                                    <div className="min-w-0 p-3 md:p-5">
                                        <div className="grid grid-cols-3 border-l border-t border-[#d4dce5] sm:hidden">
                                            {flow.steps.map((step, index) => <div key={step} className={`min-h-[58px] border-b border-r border-[#d4dce5] px-2 py-2 ${index === flow.steps.length - 1 ? 'bg-[#edf4fd]' : 'bg-white'}`}><span className="font-mono text-[7px] font-bold text-[#1d6fe8]">0{index + 1}</span><strong className="mt-1 block text-[7.5px] font-semibold leading-3 text-[#324055]">{step}</strong><span className={`mt-0.5 block text-[6px] font-semibold ${index === flow.steps.length - 1 ? 'text-[#155fc8]' : 'text-[#39805a]'}`}>{index === flow.steps.length - 1 ? 'aktueller Stand' : 'verbunden'}</span></div>)}
                                        </div>
                                        <div className="hidden max-w-full border-l border-t border-[#d4dce5] sm:flex">
                                            {flow.steps.map((step, index) => <div key={step} className={`min-w-[92px] flex-1 border-b border-r border-[#d4dce5] px-2 py-2.5 ${index === flow.steps.length - 1 ? 'bg-[#edf4fd]' : 'bg-white'}`}><span className="font-mono text-[7px] font-bold text-[#1d6fe8]">0{index + 1}</span><strong className="mt-1 block truncate text-[8px] font-semibold text-[#324055] lg:text-[9px]">{step}</strong><span className={`mt-1 block text-[6px] font-semibold ${index === flow.steps.length - 1 ? 'text-[#155fc8]' : 'text-[#39805a]'}`}>{index === flow.steps.length - 1 ? 'aktueller Stand' : 'verbunden'}</span></div>)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ReturnsPhone() {
    return (
        <PhoneFrame className="mx-auto w-[252px]" screenClassName="bg-[#f3f5f7] text-[#162033]">
                <div className="flex h-7 items-center justify-between bg-[#0e243f] px-4 text-[6px] text-white/75"><span>12:08</span><span>● LTE  ▰</span></div>
                <div className="flex h-11 items-center border-b border-[#d1d8e0] bg-white px-3"><strong className="text-[11px]">Retoure / Reklamation</strong><span className="ml-auto text-[8px] font-semibold text-[#687688]">Abbrechen</span></div>
                <div className="grid grid-cols-3 border-b border-[#d4dbe3] bg-white text-center text-[7px]">
                    {['Artikel', 'Beleg', 'Prüfen'].map((label, index) => <span key={label} className={`relative py-2.5 ${index === 0 ? 'font-bold text-[#155fc8]' : 'text-[#86919e]'}`}>{index + 1}. {label}{index === 0 && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#1d6fe8]" />}</span>)}
                </div>
                <div className="p-3">
                    <div className="border border-[#aebdcd] bg-white">
                        <div className="flex items-center gap-2 border-b border-[#d7dee6] bg-[#f7f9fb] px-3 py-2 text-[8px] font-semibold"><Camera className="h-3.5 w-3.5 text-[#1d6fe8]" /> Artikelnummer erkannt</div>
                        <div className="px-3 py-2.5"><strong className="block font-mono text-[10px]">5G1 615 123 A</strong><span className="mt-1 block text-[8px] text-[#6b7786]">Bremssattel · ATE · 1 Stück</span></div>
                    </div>
                    <div className="mt-2 border border-[#aebdcd] bg-white text-[8px]">
                        <div className="border-b border-[#d7dee6] bg-[#f7f9fb] px-3 py-2 font-semibold">Ursprungsbeleg</div>
                        <div className="grid grid-cols-[1fr_auto] gap-2 px-3 py-2.5"><span><strong className="block">LS-2026-1042</strong><span className="mt-0.5 block text-[7px] text-[#798594]">Autotechnik Brandenburg GmbH</span></span><CheckCircle2 className="h-4 w-4 text-[#268052]" /></div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 border border-[#aebdcd] bg-white text-[8px]"><span className="border-r border-[#d7dee6] px-3 py-2"><span className="block text-[7px] text-[#7b8795]">Menge</span><strong className="mt-1 block">1 Stück</strong></span><span className="px-3 py-2"><span className="block text-[7px] text-[#7b8795]">Fallart</span><strong className="mt-1 block">Reklamation</strong></span><span className="col-span-2 border-t border-[#d7dee6] px-3 py-2"><span className="block text-[7px] text-[#7b8795]">Grund</span><strong className="mt-1 block">falsches Teil geliefert</strong></span></div>
                    <div className="mt-2 border border-[#aebdcd] bg-white p-2.5"><div className="flex items-center justify-between"><span className="text-[8px] font-semibold">Optionale Fotos</span><span className="text-[7px] text-[#788391]">0 hinzugefügt</span></div><button type="button" className="mt-2 flex w-full items-center justify-center gap-1.5 border border-dashed border-[#aebed0] bg-[#f8fafc] py-2 text-[7px] font-semibold text-[#155fc8]"><Plus className="h-3 w-3" /> Foto ergänzen</button></div>
                    <div className="mt-3 bg-[#1d6fe8] py-3 text-center text-[9px] font-bold text-white">Fall zur Prüfung geben</div>
                    <p className="mt-2 px-1 text-center text-[6px] leading-3 text-[#7c8693]">Noch keine Bestands- oder Finanzbuchung.</p>
                </div>
        </PhoneFrame>
    );
}

const assistantScenarios = [
    {
        label: 'Aufträge & Aufgaben',
        question: 'Was muss heute zuerst erledigt werden?',
        answer: 'Zwei Kundenaufträge sind im Demo-Betrieb durch Fehlmengen blockiert. Eine Reklamation braucht heute eine Entscheidung.',
        sources: ['Aufträge', 'Lieferstatus', 'Retouren & Reklamationen'],
        action: 'Priorisierte Aufgabenliste für Theke und Einkauf vorbereiten',
        icon: ClipboardCheck,
    },
    {
        label: 'Artikel & Bestand',
        question: 'Welche Teile liegen unter Mindestbestand?',
        answer: 'Fünf Artikel liegen im Demo-Bestand unter ihrer Mindestmenge. Für drei davon sind bereits offene Zugänge erfasst.',
        sources: ['Artikelstamm', 'Lagerbestand', 'offene Zugänge'],
        action: 'Nur die noch ungedeckten Fehlmengen zusammenstellen',
        icon: Database,
    },
    {
        label: 'Retouren & Reklamationen',
        question: 'Welche Rückgaben oder Reklamationen brauchen eine Entscheidung?',
        answer: 'Drei Fälle sind offen: eine Rückgabe wartet auf Freigabe, bei einer Reklamation muss der Ursprungsbeleg geprüft werden.',
        sources: ['Retouren', 'Reklamationen', 'Belege & Fristen'],
        action: 'Offene Angaben je Fall zur Prüfung vorbereiten',
        icon: RotateCcw,
    },
    {
        label: 'Umsatz & Zahlen',
        question: 'Wie läuft mein Geschäft heute?',
        answer: 'Der Tagesstand verbindet Thekenumsatz, bezahlte Rechnungen und offene Posten. Auffällige Abweichungen bleiben einzeln prüfbar.',
        sources: ['Kasse', 'Rechnungen', 'offene Posten'],
        action: 'Tagesübersicht mit den offenen Punkten öffnen',
        icon: TrendingUp,
    },
] as const;

export function BusinessAssistantStory() {
    const reducedMotion = useHydrationSafeReducedMotion();
    const [activeScenario, setActiveScenario] = useState(0);
    const [actionStage, setActionStage] = useState<0 | 1 | 2>(0);
    const scenario = assistantScenarios[activeScenario];

    const chooseScenario = (index: number) => {
        setActiveScenario(index);
        setActionStage(0);
    };

    return (
        <section id="assistent" className="relative scroll-mt-24 overflow-hidden border-y border-[#173b68] bg-[#0b2548] py-12 text-white md:py-16">
            <div className="mx-auto max-w-[1420px] px-5 md:px-8 xl:px-10">
                <div className="relative grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-start lg:gap-10">
                    <div className="max-w-[560px]">
                        <div className="text-[9px] font-bold uppercase tracking-[.16em] text-[#8ab9fb]">Dein Betrieb. Eine Frage entfernt.</div>
                        <h2 className="mt-3 text-[clamp(2rem,3.15vw,3.15rem)] font-semibold leading-[1.05] tracking-[-.045em]">Fragen. Entscheiden. Erledigen lassen.</h2>
                        <p className="mt-5 text-[15px] leading-7 text-white/68">Der Partsunion Betriebsassistent kennt die freigegebenen Daten deines Unternehmens: Artikel, Bestände, Kunden, Aufträge, Retouren, Reklamationen, Umsätze, offene Posten und Aufgaben. Er beantwortet Fragen, empfiehlt den nächsten Schritt und kann ihn nach deiner Bestätigung direkt in Partsunion ausführen.</p>

                        <div className="mt-6 grid grid-cols-2 border-y border-white/18 md:hidden">
                            {assistantScenarios.map((item, index) => {
                                const Icon = item.icon;
                                const active = activeScenario === index;
                                return (
                                    <button key={item.label} type="button" onClick={() => chooseScenario(index)} className={`flex min-h-[68px] items-center gap-2.5 px-2 py-3 text-left transition ${index > 1 ? 'border-t border-white/12' : ''} ${index % 2 === 1 ? 'border-l border-white/12' : ''} ${active ? 'bg-white/[.07] text-white' : 'text-white/56'}`} aria-pressed={active}>
                                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center border ${active ? 'border-[#71a9f7] bg-[#1d6fe8] text-white' : 'border-white/15 text-[#80b1f7]'}`}><Icon className="h-3.5 w-3.5" /></span>
                                        <strong className="text-[9px] leading-4">{item.label}</strong>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-6 hidden border-y border-white/18 md:block">
                            {assistantScenarios.map((item, index) => {
                                const Icon = item.icon;
                                const active = activeScenario === index;
                                return (
                                    <button key={item.label} type="button" onClick={() => chooseScenario(index)} className={`group flex w-full items-center gap-3 border-b border-white/12 px-1 py-3.5 text-left transition last:border-b-0 ${active ? 'text-white' : 'text-white/58 hover:text-white/86'}`} aria-pressed={active}>
                                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center border transition ${active ? 'border-[#71a9f7] bg-[#1d6fe8] text-white' : 'border-white/15 text-[#80b1f7]'}`}><Icon className="h-3.5 w-3.5" /></span>
                                        <span className="min-w-0"><span className="block text-[7px] font-bold uppercase tracking-[.1em] text-white/40">{item.label}</span><strong className="mt-1 block truncate text-[10px] font-semibold sm:text-[11px]">{item.question}</strong></span>
                                        <ArrowRight className={`ml-auto h-3.5 w-3.5 transition ${active ? 'translate-x-0 text-[#8fbcfa]' : '-translate-x-1 text-white/24 group-hover:translate-x-0'}`} />
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="flex max-w-[370px] items-start gap-2 text-[10px] leading-4 text-white/48"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7dafef]" /> Geschäftliche Änderungen erfolgen erst nach sichtbarer Bestätigung und innerhalb der vergebenen Rechte.</p><Link href="/loesungen/betriebsassistent" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#9cc4fb] transition hover:text-white">Mehr erfahren <ArrowRight className="h-4 w-4" /></Link></div>
                    </div>

                    <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.5 }} className="relative w-full lg:justify-self-end">
                        <div className="overflow-hidden border border-[#708aa9] bg-white text-[#17243a] shadow-[0_24px_55px_rgba(0,0,0,.24)]">
                            <div className="flex h-11 items-center border-b border-[#cbd5e0] bg-white px-3 sm:px-4"><Bot className="h-3.5 w-3.5 text-[#1d6fe8]" /><span className="ml-2 text-[8px] font-semibold text-[#526276]">PARTSUNION · BETRIEBSASSISTENT</span><span className="ml-auto border border-[#bed0e6] bg-[#edf4fd] px-2 py-1 text-[7px] font-bold text-[#1d6fe8]">DEMO-DATEN</span></div>
                            <div className="lg:grid lg:grid-cols-[.84fr_1.16fr]">
                                <div className="relative hidden min-h-[470px] overflow-hidden border-r border-[#d1dae4] bg-[#e9eef3] lg:block">
                                    <Image src="/product/betriebsassistent.png" alt="Fokussierter Originalausschnitt des aktuellen Partsunion Betriebsassistenten" fill unoptimized className="object-cover object-right" sizes="(max-width: 1024px) 90vw, 28vw" />
                                    <div className="absolute inset-x-0 bottom-0 border-t border-[#c4cfdb] bg-white/96 px-3 py-2 text-[7px] font-semibold text-[#5e6e82]">Originalausschnitt aus dem Partsunion-Demosystem</div>
                                </div>

                                <div className="min-w-0 bg-[#f5f7fa] p-3 sm:p-4">
                                    <AnimatePresence mode="wait">
                                        <motion.div key={scenario.question} initial={reducedMotion ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reducedMotion ? 0 : .24 }}>
                                            <div className="border border-[#c7d1dc] bg-white px-3 py-3">
                                                <span className="text-[7px] font-bold uppercase tracking-[.12em] text-[#748297]">Deine Frage</span>
                                                <strong className="mt-2 block text-[11px] leading-4 text-[#1d2c42]">{scenario.question}</strong>
                                            </div>

                                            <div className="mt-2 border border-[#c7d1dc] bg-white px-3 py-3">
                                                <div className="flex items-center gap-2"><Bot className="h-3.5 w-3.5 text-[#1d6fe8]" /><span className="text-[7px] font-bold uppercase tracking-[.12em] text-[#5f7187]">Antwort mit deinen Betriebsdaten</span></div>
                                                <p className="mt-2 text-[9px] leading-[16px] text-[#44546a]">{scenario.answer}</p>
                                                <div className="mt-3 flex flex-wrap gap-1">{scenario.sources.map((source) => <span key={source} className="border border-[#d1d9e3] bg-[#f7f9fb] px-2 py-1 text-[6px] font-semibold text-[#667589]">{source}</span>)}</div>
                                            </div>

                                            <div className="mt-2 border border-[#adc6e4] bg-[#eaf2fd] px-3 py-3">
                                                <span className="text-[7px] font-bold uppercase tracking-[.12em] text-[#1b63c7]">Vorgeschlagener Schritt</span>
                                                <strong className="mt-2 block text-[9px] leading-[15px] text-[#243a58]">{scenario.action}</strong>
                                                {actionStage === 0 && <button type="button" onClick={() => setActionStage(1)} className="mt-3 w-full bg-[#1d6fe8] px-3 py-2.5 text-[8px] font-bold text-white transition hover:bg-[#155fc8]">Vorschlag prüfen</button>}
                                                {actionStage === 1 && <div className="mt-3"><div className="border border-[#d3b986] bg-[#fff8ea] px-2.5 py-2 text-[7px] font-semibold leading-3 text-[#7a5720]">Entwurf vorbereitet · noch keine Änderung ausgeführt</div><button type="button" onClick={() => setActionStage(2)} className="mt-2 w-full bg-[#1d6fe8] px-3 py-2.5 text-[8px] font-bold text-white transition hover:bg-[#155fc8]">Ausführung bestätigen</button></div>}
                                                {actionStage === 2 && <div className="mt-3 flex items-start gap-2 border border-[#a8ccb5] bg-[#eff8f2] px-2.5 py-2 text-[7px] font-semibold leading-3 text-[#2b7047]"><CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> Im Demo-Vorgang bestätigt und protokolliert</div>}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="relative mt-8 grid border-t border-white/14 pt-5 md:grid-cols-[1.05fr_1.95fr] md:items-center md:gap-10">
                    <div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#1d6fe8] text-white"><Bot className="h-4 w-4" /></span><span><h3 className="text-base font-semibold tracking-[-.02em]">Persönlicher Begleiter für deinen Betrieb.</h3><p className="mt-1 text-[10px] leading-4 text-white/45">Er kennt den Betriebszusammenhang, nicht nur die letzte Frage.</p></span></div>
                    <div className="mt-5 grid grid-cols-4 md:mt-0">{[['01', 'Fragen'], ['02', 'Prüfen'], ['03', 'Bestätigen'], ['04', 'Bearbeiten']].map(([number, label], index) => <div key={number} className={`px-2 md:px-4 ${index > 0 ? 'border-l border-white/10' : ''}`}><span className="font-mono text-[7px] font-bold text-[#73aaf5]">{number}</span><strong className="mt-1 block truncate text-[8px] sm:text-[9px]">{label}</strong></div>)}</div>
                </div>
            </div>
        </section>
    );
}

export function MobileReturnsStory() {
    const reducedMotion = useHydrationSafeReducedMotion();
    return (
        <section id="retouren" className="scroll-mt-24 overflow-hidden bg-white py-14 md:py-16">
            <div className="mx-auto grid max-w-[1320px] gap-8 px-5 md:px-8 lg:grid-cols-[.88fr_1.12fr] lg:items-center xl:px-10">
                <div>
                    <div className="text-[9px] font-bold uppercase tracking-[.16em] text-[#1c6dd8]">Händler-App · Retouren & Reklamationen</div>
                    <h2 className="mt-3 max-w-xl text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.07] tracking-[-.043em] text-[#132036]">Rückgabe oder Reklamation in einem Zug bearbeiten.</h2>
                    <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#637083]">Artikelnummer abfotografieren, Ursprungsbeleg zuordnen und den Fall als Rückgabe, Defekt oder Falschlieferung einordnen. Grund, Zustand und optionale Fotos ergeben direkt einen prüfbaren Vorgang – auch für die weitere Reklamation beim Lieferanten.</p>
                    <div className="mt-6 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center border-y border-[#d5dfea] py-4 text-center text-[#1e2c40]"><span><Camera className="mx-auto h-4 w-4 text-[#1d6fe8]" /><strong className="mt-1.5 block text-[8px]">NUMMER</strong></span><ArrowRight className="h-3 w-3 text-[#98a4b3]" /><span><FileCheck2 className="mx-auto h-4 w-4 text-[#1d6fe8]" /><strong className="mt-1.5 block text-[8px]">BELEG</strong></span><ArrowRight className="h-3 w-3 text-[#98a4b3]" /><span><RotateCcw className="mx-auto h-4 w-4 text-[#1d6fe8]" /><strong className="mt-1.5 block text-[8px]">FALLART</strong></span></div>
                    <p className="mt-5 flex items-center gap-2 text-[10px] text-[#697688]"><ShieldCheck className="h-3.5 w-3.5 text-[#1d6fe8]" /> Bestands- und Finanzwirkung erst nach Prüfung</p>
                    <Link href="/loesungen/retouren" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#155fc8]">Retouren & Reklamationen im Detail <ArrowRight className="h-4 w-4" /></Link>
                </div>
                <motion.div initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: reducedMotion ? 0 : .45 }} className="relative overflow-hidden border border-[#b8c6d6] bg-[#edf1f5] px-5 py-6 md:min-h-[520px] md:py-8">
                    <div className="absolute inset-x-0 top-0 h-1 bg-[#1d6fe8]" />
                    <div className="grid gap-6 sm:grid-cols-[280px_1fr] sm:items-center">
                        <ReturnsPhone />
                        <div className="hidden min-w-0 sm:block">
                            <span className="text-[8px] font-bold uppercase tracking-[.14em] text-[#607186]">Retouren- & Reklamationsprüfung</span>
                            <strong className="mt-2 block max-w-[190px] text-xl leading-6 text-[#14243a]">Vom Teil direkt zum prüfbaren Vorgang.</strong>
                            <div className="mt-6 border-y border-[#bdc9d6]">
                                {[
                                    ['12:08', 'Artikel erkannt', 'Nummer aus Foto gelesen'],
                                    ['12:08', 'Beleg zugeordnet', 'LS-2026-1042 gefunden'],
                                    ['offen', 'Fachprüfung', 'Menge, Grund und Zustand'],
                                    ['danach', 'Folge festlegen', 'Bestand, Erstattung oder Lieferantenweg'],
                                ].map(([time, title, detail], index) => <motion.div key={title} initial={reducedMotion ? false : { opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : .28, delay: reducedMotion ? 0 : .18 + index * .09 }} className={`grid grid-cols-[38px_1fr] gap-3 py-3 ${index > 0 ? 'border-t border-[#cad4df]' : ''}`}><span className="font-mono text-[7px] font-bold text-[#1d6fe8]">{time}</span><span><strong className="block text-[9px] text-[#26364a]">{title}</strong><span className="mt-1 block text-[7px] leading-3 text-[#728092]">{detail}</span></span></motion.div>)}
                            </div>
                            <p className="mt-4 flex gap-2 text-[8px] leading-4 text-[#607084]"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1d6fe8]" /> Jede Änderung bleibt mit Zeitpunkt, Mitarbeiter und Freigabestatus nachvollziehbar.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

const workAreas: Array<{ number: string; title: string; summary: string; icon: LucideIcon; items: string[]; href: string }> = [
    { number: '01', title: 'Verkauf', summary: 'Von der ersten Anfrage bis zur ausgeglichenen Rechnung.', icon: ShoppingCart, items: ['Anfrage & WhatsApp', 'Theke, Angebot & Auftrag', 'Kundenakte & Belegkette', 'Kasse, Zahlung & offene Posten'], href: '/loesungen/angebot-auftrag' },
    { number: '02', title: 'Betrieb & Warenwirtschaft', summary: 'Teile, Mengen und Bewegungen nachvollziehbar steuern.', icon: Warehouse, items: ['OE, Artikel & Einzelstücke', 'Lager & Bewegungsjournal', 'Einkauf & Bestellvorschläge', 'Retouren & Reklamationen'], href: '/loesungen/bestand-lager' },
    { number: '03', title: 'Finanzen & Kasse', summary: 'Belege und Zahlen bleiben mit dem Ursprungsvorgang verbunden.', icon: FileCheck2, items: ['Rechnungen & Gutschriften', 'OP, Mahnwesen & Zahlungen', 'Kassenbuch & Tagesabschluss', 'DATEV- & Steuerexporte'], href: '/loesungen/finanzen-kasse' },
];

const companionTools = [
    { title: 'Betriebsassistent', text: 'Fragen beantworten, Arbeit vorbereiten und bestätigte Schritte ausführen.', icon: Bot, href: '/loesungen/betriebsassistent' },
    { title: 'Händler-App', text: 'Artikel, Fotos, Retouren und Reklamationen direkt dort erfassen, wo die Ware liegt.', icon: Smartphone, href: '/loesungen/haendler-app' },
];

export function ModuleDirectory() {
    return (
        <section id="module" className="scroll-mt-24 border-y border-[#dbe2eb] bg-white py-10 md:py-14">
            <div className="mx-auto max-w-[1420px] px-5 md:px-8 xl:px-10">
                <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:items-end lg:gap-12">
                    <div><div className="text-[9px] font-bold uppercase tracking-[.16em] text-[#1c6dd8]">Das Betriebssystem für den Teilehandel</div><h2 className="mt-3 text-[clamp(1.9rem,2.8vw,2.8rem)] font-semibold leading-[1.08] tracking-[-.042em]">Verkauf, Warenwirtschaft und Finanzen auf einem Stand.</h2></div>
                    <p className="max-w-2xl text-sm leading-6 text-[#647183] lg:justify-self-end">Partsunion verbindet Verkauf, Warenwirtschaft und Finanzen. Daten werden nicht zwischen Modulen kopiert – der nächste Schritt arbeitet mit dem bereits geprüften Vorgang weiter.</p>
                </div>

                <div className="mt-8 hidden border border-[#bcc9d7] bg-white md:block">
                    <div className="grid grid-cols-[220px_1fr_1.25fr_130px] border-b border-[#cbd5df] bg-[#f4f7fa] px-5 py-2.5 text-[7px] font-bold uppercase tracking-[.11em] text-[#748194]"><span>Arbeitsbereich</span><span>Aufgabe</span><span>Enthaltene Funktionen</span><span>Vertiefung</span></div>
                    {workAreas.map((area, index) => { const Icon = area.icon; return <div key={area.title} className={`grid grid-cols-[220px_1fr_1.25fr_130px] items-center px-5 py-5 ${index > 0 ? 'border-t border-[#d5dde6]' : ''}`}><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center border border-[#a9bfd8] bg-[#edf4fc] text-[#1d6fe8]"><Icon className="h-4 w-4" /></span><span><span className="font-mono text-[7px] font-bold text-[#1d6fe8]">{area.number}</span><h3 className="mt-1 text-sm font-semibold text-[#172337]">{area.title}</h3></span></div><p className="pr-6 text-[10px] leading-[17px] text-[#687587]">{area.summary}</p><ul className="grid grid-cols-2 gap-x-4 gap-y-2 pr-5">{area.items.map((item) => <li key={item} className="flex items-start gap-2 text-[9px] font-semibold leading-4 text-[#334055]"><span className="mt-1.5 h-1 w-1 shrink-0 bg-[#1d6fe8]" />{item}</li>)}</ul><Link href={area.href} className="inline-flex items-center justify-end gap-2 text-[10px] font-semibold text-[#155fc8]">Ansehen <ArrowRight className="h-3.5 w-3.5" /></Link></div>; })}
                </div>

                <div className="mt-6 space-y-2 md:hidden">
                    {workAreas.map((area) => { const Icon = area.icon; return <details key={area.title} className="group overflow-hidden border border-[#cdd8e5] bg-[#f6f9fc]"><summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3.5 marker:hidden"><span className="flex h-8 w-8 items-center justify-center border border-[#9fb6d1] bg-white text-[#1d6fe8]"><Icon className="h-4 w-4" /></span><span><span className="font-mono text-[7px] font-bold text-[#1d6fe8]">{area.number}</span><strong className="ml-2 text-sm">{area.title}</strong></span><span className="ml-auto text-xl font-light text-[#758396] transition group-open:rotate-45">+</span></summary><div className="border-t border-[#d7e0e9] px-4 pb-4"><p className="py-3 text-[11px] leading-[18px] text-[#697687]">{area.summary}</p><ul>{area.items.map((item) => <li key={item} className="border-t border-[#dde5ed] py-2 text-[11px] font-semibold text-[#344155]">{item}</li>)}</ul></div></details>; })}
                </div>

                <div className="mt-5 grid overflow-hidden border border-[#274976] bg-[#0d2b57] text-white lg:mt-6 lg:grid-cols-[.62fr_1.38fr]">
                    <div className="border-b border-white/12 p-4 lg:border-b-0 lg:border-r lg:p-6">
                        <div className="text-[8px] font-bold uppercase tracking-[.15em] text-[#8eb9f7]">Über alle Bereiche hinweg</div>
                        <h3 className="mt-2 text-xl font-semibold tracking-[-.03em]">Zwei Werkzeuge für alles dazwischen.</h3>
                        <p className="mt-2 text-[10px] leading-4 text-white/48">Am Arbeitsplatz und direkt an der Ware.</p>
                    </div>
                    <div className="grid sm:grid-cols-2">
                        {companionTools.map((tool, index) => {
                            const Icon = tool.icon;
                            return <Link key={tool.title} href={tool.href} className={`group flex items-start gap-3 p-4 transition hover:bg-white/[.06] md:p-6 ${index > 0 ? 'border-t border-white/10 sm:border-l sm:border-t-0' : ''}`}><span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#6096db] bg-[#17417a] text-[#a9ccff]"><Icon className="h-4 w-4" /></span><span><strong className="flex items-center gap-2 text-sm font-semibold">{tool.title}<ArrowRight className="h-3.5 w-3.5 text-[#83b3f5] transition group-hover:translate-x-1" /></strong><span className="mt-1.5 block text-[10px] leading-4 text-white/52">{tool.text}</span></span></Link>;
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
