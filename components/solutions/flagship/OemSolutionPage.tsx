'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    CarFront,
    CheckCircle2,
    GitBranch,
    PackageCheck,
    ScanLine,
    SearchCheck,
    ShieldCheck,
} from 'lucide-react';
import { useHydrationSafeReducedMotion } from '@/components/motion/useHydrationSafeReducedMotion';
import type { SolutionPageData } from '@/lib/solutions-data';
import { FlagshipCta, FlagshipSafety, FlagshipSubnav, SolutionHero } from './FlagshipShared';

const resolverSteps = [
    { label: 'Fahrzeug', title: 'Golf VII eindeutig bestimmen', text: 'VIN, HSN/TSN und Fahrzeugschein bilden den Startpunkt.' },
    { label: 'Baugruppe', title: 'Kühlmittelpumpe eingrenzen', text: 'Der Herstellerkatalog führt in den passenden Fahrzeugkontext.' },
    { label: 'Variante', title: 'Ausstattung sichtbar prüfen', text: 'Offene Merkmale werden nicht still vorausgewählt.' },
    { label: 'Artikel', title: 'OE-Bezug verkaufsfähig machen', text: 'Referenz, Alternative, Bestand und Kondition kommen zusammen.' },
];

function ResolverCanvas({ active, setActive }: { active: number; setActive: (value: number) => void }) {
    const reducedMotion = useHydrationSafeReducedMotion();
    const nodes = [
        { icon: CarFront, title: 'Golf VII', meta: 'VIN & HSN/TSN', color: 'navy' },
        { icon: SearchCheck, title: 'Kühlmittelpumpe', meta: 'Herstellerkatalog', color: 'blue' },
        { icon: GitBranch, title: 'Ausstattung', meta: 'Prüfung erforderlich', color: 'amber' },
        { icon: PackageCheck, title: '04L 121 011 L', meta: 'OE-Referenz · Demo', color: 'green' },
    ];

    return (
        <div className="overflow-hidden border border-[#9fb4cc] bg-white shadow-[0_28px_70px_rgba(18,47,81,.15)]">
            <div className="flex min-h-12 items-center border-b border-[#c8d4df] bg-[#f6f8fa] px-4"><ScanLine className="h-4 w-4 text-[#1d6fe8]" /><span className="ml-2.5"><strong className="block text-[11px] font-semibold text-[#26364b]">OE-Prüfkette</strong><span className="text-[9px] text-[#748193]">Fahrzeug → Katalog → Variante → Artikel</span></span><span className="ml-auto hidden text-[9px] font-semibold text-[#155fc8] sm:block">56 Marken</span></div>
            <div className="bg-[#edf3f9] p-5 sm:p-7">
                <div className="relative grid gap-3 sm:grid-cols-4">
                    <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-[#9eb5cd] sm:block" />
                    {nodes.map((node, index) => { const Icon = node.icon; const reached = index <= active; return <button key={node.title} type="button" onClick={() => setActive(index)} className={`relative z-10 min-w-0 border p-4 text-left transition sm:min-h-[150px] ${active === index ? 'border-[#1d6fe8] bg-white shadow-[0_12px_24px_rgba(36,78,124,.12)]' : reached ? 'border-[#9db9d8] bg-white' : 'border-[#c6d2dd] bg-[#f8fafc] opacity-65'}`}><span className={`flex h-10 w-10 items-center justify-center border ${node.color === 'amber' && reached ? 'border-[#ddb36d] bg-[#fff4df] text-[#966321]' : node.color === 'green' && reached ? 'border-[#8fc6a4] bg-[#eaf7ef] text-[#26724a]' : reached ? 'border-[#7ba8df] bg-[#e8f2ff] text-[#1d6fe8]' : 'border-[#c4cfda] bg-white text-[#7c8998]'}`}><Icon className="h-5 w-5" /></span><span className="mt-4 block text-[9px] font-bold uppercase tracking-[.1em] text-[#718094]">0{index + 1} · {resolverSteps[index].label}</span><strong className="mt-2 block truncate text-[12px] text-[#26364b]">{node.title}</strong><span className="mt-1 block text-[10px] text-[#738195]">{node.meta}</span></button>; })}
                </div>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={active} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reducedMotion ? 0 : .24 }} className={`mt-4 grid gap-3 border-l-2 p-4 sm:grid-cols-[200px_1fr] ${active === 2 ? 'border-[#dfa64c] bg-[#fff7ea]' : active === 3 ? 'border-[#2d9660] bg-[#edf8f1]' : 'border-[#1d6fe8] bg-white'}`}><strong className="text-sm text-[#26364b]">{resolverSteps[active].title}</strong><p className="text-[11px] leading-5 text-[#65758a]">{resolverSteps[active].text}</p></motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export function OemSolutionPage({ page }: { page: SolutionPageData }) {
    const reducedMotion = useHydrationSafeReducedMotion();
    const [active, setActive] = useState(0);
    const [decision, setDecision] = useState<'open' | 'checked'>('open');

    useEffect(() => {
        if (reducedMotion) return;
        const timer = window.setInterval(() => setActive((value) => (value + 1) % resolverSteps.length), 3200);
        return () => window.clearInterval(timer);
    }, [reducedMotion]);

    return (
        <article className="bg-white pt-[72px] text-[#111b2b]">
            <SolutionHero
                icon={ScanLine}
                eyebrow="OE-Ermittlung"
                title="Das passende Teil. Mit belegbarer OE-Zuordnung."
                description="Fahrzeug bestimmen, Herstellerkatalog prüfen und den passenden Artikel mit Bestand und Kondition auswählen – ohne offene Ausführungen still zu übergehen."
                highlight={page.promise}
                primaryLabel="OE-Ermittlung live ansehen"
                secondaryLabel="Prüfkette ansehen"
                secondaryHref="#pruefkette"
                proofItems={[{ title: '56 Marken', text: 'Fahrzeugdatenbank als Ausgangspunkt' }, { title: 'Nutzungsrechte', text: 'für angebundene Herstellerkataloge' }, { title: 'Keine stille Auswahl', text: 'offene Varianten bleiben sichtbar' }]}
            >
                <ResolverCanvas active={active} setActive={setActive} />
            </SolutionHero>

            <FlagshipSubnav items={[{ label: 'Prüfkette', href: '#pruefkette' }, { label: 'Varianten', href: '#varianten' }, { label: 'Ergebnis', href: '#ergebnis' }, { label: 'Kontrolle', href: '#kontrolle' }]} />

            <section id="pruefkette" className="scroll-mt-28 bg-[#0b294e] py-14 text-white md:py-20">
                <div className="mx-auto max-w-[1320px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-9 lg:grid-cols-[.68fr_1.32fr] lg:gap-14">
                        <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#8ab8f8]">Die Prüfung ist das Produkt</span><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.25rem)] font-semibold leading-[1.04] tracking-[-.045em]">Nicht die erste Nummer zählt. Sondern wie sie zustande kommt.</h2><p className="mt-4 max-w-[470px] text-sm leading-6 text-white/58">Partsunion hält Ausgangsdaten, Katalogweg, offene Merkmale und Ergebnis zusammen. Damit bleibt die Teileentscheidung auch später erklärbar.</p></div>
                        <div className="border-y border-white/18">{resolverSteps.map((step, index) => <button key={step.label} type="button" onClick={() => setActive(index)} className={`grid w-full gap-2 py-5 text-left sm:grid-cols-[42px_145px_220px_1fr] sm:items-center ${index > 0 ? 'border-t border-white/13' : ''} ${active === index ? 'text-white' : 'text-white/58 hover:text-white/82'}`}><span className="font-mono text-[9px] font-bold text-[#7eb0f5]">0{index + 1}</span><span className="text-[9px] font-bold uppercase tracking-[.11em] text-[#8bb8f7]">{step.label}</span><strong className="text-sm">{step.title}</strong><span className="text-[11px] leading-5 text-white/45">{step.text}</span></button>)}</div>
                    </div>
                </div>
            </section>

            <section id="varianten" className="scroll-mt-28 border-b border-[#d7e0e9] bg-[#f3f6f9] py-14 md:py-20">
                <div className="mx-auto grid max-w-[1260px] gap-10 px-5 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center xl:px-10">
                    <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Der entscheidende Moment</span><h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.05] tracking-[-.043em]">Wenn die Ausführung nicht eindeutig ist, bleibt sie offen.</h2><p className="mt-4 max-w-[520px] text-sm leading-6 text-[#637186]">Genau hier unterscheiden sich schnelle Suche und verantwortete Teileentscheidung. Partsunion markiert den Klärbedarf, statt eine beliebige Variante als Ergebnis auszugeben.</p><div className="mt-6 flex gap-2"><button type="button" onClick={() => setDecision('open')} className={`border px-3 py-2 text-[10px] font-semibold ${decision === 'open' ? 'border-[#c98c37] bg-[#fff3df] text-[#855719]' : 'border-[#c5d1dc] bg-white text-[#65758a]'}`}>Klärbedarf zeigen</button><button type="button" onClick={() => setDecision('checked')} className={`border px-3 py-2 text-[10px] font-semibold ${decision === 'checked' ? 'border-[#2f9660] bg-[#eaf7ef] text-[#267149]' : 'border-[#c5d1dc] bg-white text-[#65758a]'}`}>Nach Prüfung</button></div></div>
                    <div className="overflow-hidden border border-[#b7c5d4] bg-white shadow-[0_18px_42px_rgba(27,53,84,.12)]"><div className="flex h-11 items-center border-b border-[#d1dae3] px-4"><GitBranch className="h-4 w-4 text-[#1d6fe8]" /><span className="ml-2 text-[10px] font-semibold text-[#59697d]">Variantenentscheidung</span></div><AnimatePresence mode="wait"><motion.div key={decision} initial={reducedMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={reducedMotion ? undefined : { opacity: 0, x: -8 }} className="p-5 sm:p-6">{decision === 'open' ? <><span className="inline-flex items-center gap-2 bg-[#fff2dc] px-3 py-2 text-[10px] font-semibold text-[#8b5a18]"><GitBranch className="h-3.5 w-3.5" />Ausstattungsmerkmal offen</span><h3 className="mt-5 text-lg font-semibold">Zwei Ausführungen passen zum bisherigen Fahrzeugstand.</h3><div className="mt-5 grid grid-cols-2 gap-3 text-[11px]"><div className="border border-[#d9b779] bg-[#fffaf1] p-4"><strong>Variante A</strong><span className="mt-2 block leading-5 text-[#75654b]">zusätzliches Merkmal prüfen</span></div><div className="border border-[#d9b779] bg-[#fffaf1] p-4"><strong>Variante B</strong><span className="mt-2 block leading-5 text-[#75654b]">zusätzliches Merkmal prüfen</span></div></div><p className="mt-5 border-l-2 border-[#d69b43] pl-4 text-[11px] leading-5 text-[#6f6250]">Noch keine OE-Nummer und kein stiller Verkaufsvorschlag.</p></> : <><span className="inline-flex items-center gap-2 bg-[#e8f6ed] px-3 py-2 text-[10px] font-semibold text-[#267149]"><CheckCircle2 className="h-3.5 w-3.5" />Merkmal bestätigt</span><h3 className="mt-5 text-lg font-semibold">Die passende Ausführung ist dokumentiert.</h3><div className="mt-5 border-l-4 border-[#1d6fe8] bg-[#edf4fd] p-5"><span className="text-[9px] text-[#6a788a]">OE-Referenz · Demo-Vorgang</span><strong className="mt-2 block font-mono text-xl text-[#155fc8]">04L 121 011 L</strong></div><p className="mt-5 flex items-center gap-2 text-[11px] leading-5 text-[#627186]"><ShieldCheck className="h-4 w-4 text-[#2b8555]" />Fahrzeugbezug und Prüfschritt bleiben am Ergebnis.</p></>}</motion.div></AnimatePresence></div>
                </div>
            </section>

            <section id="ergebnis" className="scroll-mt-28 bg-white py-14 md:py-20">
                <div className="mx-auto max-w-[1260px] px-5 md:px-8 xl:px-10"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center"><div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Danach wird verkauft</span><h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.05] tracking-[-.043em]">Die OE-Nummer ist nicht das Ende der Arbeit.</h2><p className="mt-4 max-w-[500px] text-sm leading-6 text-[#637186]">Passende Alternativen, eigener Bestand und Kondition ergänzen die Fachentscheidung. Der gewählte Artikel kann direkt in Angebot oder Auftrag weitergehen.</p></div><div className="grid border border-[#b9c7d6] bg-[#eef3f8] sm:grid-cols-[.92fr_1.08fr]"><div className="border-b border-[#c9d4df] bg-[#0e315d] p-5 text-white sm:border-b-0 sm:border-r sm:p-6"><PackageCheck className="h-5 w-5 text-[#8bb8f7]" /><span className="mt-5 block text-[9px] font-bold uppercase tracking-[.12em] text-[#8bb8f7]">Geprüfter Bezug</span><strong className="mt-2 block font-mono text-lg">04L 121 011 L</strong><span className="mt-2 block text-[10px] text-white/50">mit Fahrzeug- und Katalogkontext</span></div><div className="p-5 sm:p-6"><div className="grid grid-cols-2 gap-px border border-[#c7d2de] bg-[#c7d2de] text-[10px]">{[['Alternative', 'vergleichbar'], ['Bestand', 'sichtbar'], ['Kondition', 'am Artikel'], ['Nächster Schritt', 'Angebot']].map(([label, value]) => <div key={label} className="bg-white p-3"><span className="text-[#758294]">{label}</span><strong className="mt-1 block text-[#28394e]">{value}</strong></div>)}</div><div className="mt-4 flex items-center justify-between bg-[#1d6fe8] px-4 py-3 text-[10px] font-semibold text-white"><span>In Angebot übernehmen</span><ArrowRight className="h-4 w-4" /></div></div></div></div></div>
            </section>

            <div id="kontrolle" className="scroll-mt-28"><FlagshipSafety title="Offene Variante bleibt offen." text={page.controlText} /></div>
            <FlagshipCta eyebrow="OE-Ermittlung im eigenen Sortiment" title="Nimm einen echten Fahrzeug- und Teilefall mit ins Gespräch." text="Wir zeigen dir, wie Partsunion Fahrzeugdaten, Katalogprüfung, OE-Bezug und eigenen Artikelstamm in deinem Ablauf zusammenführen kann." buttonLabel="OE-Ablauf besprechen" nextHref="/loesungen/angebot-auftrag" nextLabel="Angebot & Auftrag" />
        </article>
    );
}
