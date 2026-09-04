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
    { label: 'Fahrzeug', title: 'Fahrzeugdaten automatisch übernehmen', text: 'VIN, HSN/TSN und Fahrzeugschein werden ausgelesen und bilden den Startpunkt.', automation: 'Automatisch ausgelesen' },
    { label: 'Baugruppe', title: 'Herstellerkataloge automatisch prüfen', text: 'Partsunion führt Fahrzeug und Teilebedarf durch den passenden Katalogweg.', automation: 'Automatisch abgeglichen' },
    { label: 'Rückfrage', title: 'Fehlende Angabe gezielt erfragen', text: 'Partsunion erkennt, welche Information für die eindeutige Zuordnung noch fehlt.', automation: 'Rückfrage ausgelöst' },
    { label: 'Artikel', title: 'Geprüften Artikel automatisch vorbereiten', text: 'OE-Bezug, Alternative, eigener Bestand und Kondition kommen verkaufsfertig zusammen.', automation: 'Prüfung fortgesetzt' },
];

function ResolverCanvas({ active, setActive }: { active: number; setActive: (value: number) => void }) {
    const reducedMotion = useHydrationSafeReducedMotion();
    const nodes = [
        { icon: CarFront, title: 'Golf VII', meta: 'Fahrzeug erkannt', color: 'navy' },
        { icon: SearchCheck, title: 'Kühlmittelpumpe', meta: 'Kataloge geprüft', color: 'blue' },
        { icon: GitBranch, title: 'Ausführung offen', meta: 'Rückfrage erforderlich', color: 'amber' },
        { icon: PackageCheck, title: '04L 121 011 L', meta: 'OE-Referenz · Demo', color: 'green' },
    ];

    return (
        <div className="overflow-hidden border border-[#9fb4cc] bg-white shadow-[0_28px_70px_rgba(18,47,81,.15)]">
            <div className="flex min-h-12 items-center border-b border-[#c8d4df] bg-[#f6f8fa] px-4"><ScanLine className="h-4 w-4 text-[#1d6fe8]" /><span className="ml-2.5"><strong className="block text-[11px] font-semibold text-[#26364b]">Automatisierte OE-Prüfung</strong><span className="text-[9px] text-[#748193]">Fahrzeug → Katalog → Rückfrage → Artikel</span></span><span className="ml-auto hidden items-center gap-2 text-[9px] font-semibold text-[#257047] sm:flex"><span className="h-2 w-2 rounded-full bg-[#2da368]" />Ablauf aktiv</span></div>
            <div className="bg-[#edf3f9] p-5 sm:p-7">
                <div className="relative grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                    <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-[#9eb5cd] sm:block" />
                    {nodes.map((node, index) => { const Icon = node.icon; const reached = index <= active; return <button key={node.title} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={`relative z-10 min-w-0 border p-3 text-left transition sm:min-h-[150px] sm:p-4 ${active === index ? 'border-[#1d6fe8] bg-white shadow-[0_12px_24px_rgba(36,78,124,.12)]' : reached ? 'border-[#9db9d8] bg-white' : 'border-[#c6d2dd] bg-[#f8fafc] opacity-65'}`}><span className={`flex h-10 w-10 items-center justify-center border ${node.color === 'amber' && reached ? 'border-[#ddb36d] bg-[#fff4df] text-[#966321]' : node.color === 'green' && reached ? 'border-[#8fc6a4] bg-[#eaf7ef] text-[#26724a]' : reached ? 'border-[#7ba8df] bg-[#e8f2ff] text-[#1d6fe8]' : 'border-[#c4cfda] bg-white text-[#7c8998]'}`}><Icon className="h-5 w-5" /></span><span className="mt-3 block text-[8px] font-bold uppercase tracking-[.08em] text-[#718094] sm:mt-4 sm:text-[9px] sm:tracking-[.1em]">0{index + 1} · {resolverSteps[index].label}</span><strong className="mt-2 block truncate text-[11px] text-[#26364b] sm:text-[12px]">{node.title}</strong><span className="mt-1 block text-[9px] text-[#738195] sm:text-[10px]">{node.meta}</span></button>; })}
                </div>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={active} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reducedMotion ? 0 : .24 }} className={`mt-4 grid min-h-[132px] gap-3 border-l-2 p-4 sm:grid-cols-[200px_1fr] ${active === 2 ? 'border-[#dfa64c] bg-[#fff7ea]' : active === 3 ? 'border-[#2d9660] bg-[#edf8f1]' : 'border-[#1d6fe8] bg-white'}`}>
                        <div><span className={`inline-flex px-2 py-1 text-[8px] font-bold uppercase tracking-[.08em] ${active === 2 ? 'bg-[#f5dfb8] text-[#80561f]' : active === 3 ? 'bg-[#d9efe2] text-[#256b47]' : 'bg-[#e6f0fc] text-[#155fc8]'}`}>{resolverSteps[active].automation}</span><strong className="mt-3 block text-sm text-[#26364b]">{resolverSteps[active].title}</strong></div>
                        <div><p className="text-[11px] leading-5 text-[#65758a]">{resolverSteps[active].text}</p>{active === 2 && <div className="mt-3 border border-[#ddb879] bg-white px-3 py-2.5"><strong className="block text-[10px] text-[#62451f]">Welche Ausführung ist am Fahrzeug verbaut?</strong><span className="mt-1 block text-[9px] leading-4 text-[#806d54]">Diese Angabe müsste ein Mitarbeiter bei manueller Bearbeitung ebenfalls erfragen.</span></div>}{active === 3 && <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-[#267149]"><CheckCircle2 className="h-3.5 w-3.5" />Antwort übernommen · Prüfung automatisch fortgesetzt</div>}</div>
                    </motion.div>
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
                title="Vom Fahrzeug zur passenden OE-Nummer – automatisch geprüft."
                description="Partsunion übernimmt Fahrzeugdaten, prüft Herstellerkataloge und erkennt, welche Angaben für eine eindeutige Zuordnung noch fehlen. Nötige Rückfragen wären auch bei manueller Bearbeitung erforderlich – Partsunion stellt sie automatisch und setzt die Prüfung nach der Antwort fort."
                highlight={page.promise}
                primaryLabel="OE-Ermittlung live ansehen"
                secondaryLabel="Prüfkette ansehen"
                secondaryHref="#pruefkette"
                proofItems={[{ title: '56 Marken', text: 'mit Nutzungsrechten für Fahrzeug- und Teileidentifikation' }, { title: '80 % der weltweiten VINs', text: 'decodierbar; OE-Zuordnung abhängig von Datenlage' }, { title: 'Gezielte Rückfragen', text: 'nur bei fehlenden Angaben' }]}
            >
                <ResolverCanvas active={active} setActive={setActive} />
            </SolutionHero>

            <FlagshipSubnav items={[{ label: 'Prüfkette', href: '#pruefkette' }, { label: 'Varianten', href: '#varianten' }, { label: 'Ergebnis', href: '#ergebnis' }, { label: 'Kontrolle', href: '#kontrolle' }]} />

            <section id="pruefkette" className="scroll-mt-28 bg-[#0b294e] py-14 text-white md:py-20">
                <div className="mx-auto max-w-[1320px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-9 lg:grid-cols-[.68fr_1.32fr] lg:gap-14">
                        <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#8ab8f8]">Der normale Ablauf – automatisiert</span><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.25rem)] font-semibold leading-[1.04] tracking-[-.045em]">Partsunion arbeitet dieselben Prüfschritte ab wie ein erfahrener Verkäufer.</h2><p className="mt-4 max-w-[470px] text-sm leading-6 text-white/58">Fahrzeug aufnehmen, Katalog prüfen, fehlende Angaben klären und den Artikel auswählen: Der fachliche Ablauf bleibt derselbe. Partsunion übernimmt die wiederkehrende Arbeit automatisch und hält jeden Schritt nachvollziehbar zusammen.</p></div>
                        <div className="border-y border-white/18">{resolverSteps.map((step, index) => <button key={step.label} type="button" onClick={() => setActive(index)} className={`grid w-full gap-2 py-5 text-left sm:grid-cols-[42px_145px_220px_1fr] sm:items-center ${index > 0 ? 'border-t border-white/13' : ''} ${active === index ? 'text-white' : 'text-white/58 hover:text-white/82'}`}><span className="font-mono text-[9px] font-bold text-[#7eb0f5]">0{index + 1}</span><span className="text-[9px] font-bold uppercase tracking-[.11em] text-[#8bb8f7]">{step.label}</span><strong className="text-sm">{step.title}</strong><span className="text-[11px] leading-5 text-white/45">{step.text}</span></button>)}</div>
                    </div>
                </div>
            </section>

            <section id="varianten" className="scroll-mt-28 border-b border-[#d7e0e9] bg-[#f3f6f9] py-14 md:py-20">
                <div className="mx-auto grid max-w-[1260px] gap-10 px-5 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center xl:px-10">
                    <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Rückfragen gehören zur Teileermittlung</span><h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.05] tracking-[-.043em]">Wenn eine Angabe fehlt, fragt Partsunion automatisch nach.</h2><p className="mt-4 max-w-[520px] text-sm leading-6 text-[#637186]">Auch ein Mitarbeiter müsste an dieser Stelle nachhaken. Partsunion erkennt den Klärbedarf selbst, stellt die passende Rückfrage und ordnet die Antwort direkt dem Fahrzeug- und Teilefall zu. Danach läuft die Prüfung automatisch weiter.</p><div className="mt-6 flex gap-2"><button type="button" onClick={() => setDecision('open')} aria-pressed={decision === 'open'} className={`border px-3 py-2 text-[10px] font-semibold ${decision === 'open' ? 'border-[#c98c37] bg-[#fff3df] text-[#855719]' : 'border-[#c5d1dc] bg-white text-[#65758a]'}`}>Automatische Rückfrage</button><button type="button" onClick={() => setDecision('checked')} aria-pressed={decision === 'checked'} className={`border px-3 py-2 text-[10px] font-semibold ${decision === 'checked' ? 'border-[#2f9660] bg-[#eaf7ef] text-[#267149]' : 'border-[#c5d1dc] bg-white text-[#65758a]'}`}>Antwort übernommen</button></div></div>
                    <div className="overflow-hidden border border-[#b7c5d4] bg-white shadow-[0_18px_42px_rgba(27,53,84,.12)]"><div className="flex h-11 items-center border-b border-[#d1dae3] px-4"><GitBranch className="h-4 w-4 text-[#1d6fe8]" /><span className="ml-2 text-[10px] font-semibold text-[#59697d]">Automatische Variantenklärung</span></div><AnimatePresence mode="wait"><motion.div key={decision} initial={reducedMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={reducedMotion ? undefined : { opacity: 0, x: -8 }} className="p-5 sm:p-6">{decision === 'open' ? <><span className="inline-flex items-center gap-2 bg-[#fff2dc] px-3 py-2 text-[10px] font-semibold text-[#8b5a18]"><GitBranch className="h-3.5 w-3.5" />Rückfrage automatisch ausgelöst</span><h3 className="mt-5 text-lg font-semibold">Eine Angabe zur Ausführung fehlt.</h3><div className="mt-5 border-l-4 border-[#d69b43] bg-[#fff8eb] p-5"><span className="text-[9px] font-bold uppercase tracking-[.1em] text-[#946325]">Frage an den Kunden</span><strong className="mt-2 block text-sm text-[#5e431f]">Welche Ausführung ist am Fahrzeug verbaut?</strong></div><p className="mt-5 text-[11px] leading-5 text-[#6f6250]">Diese Frage würde bei manueller Bearbeitung genauso entstehen. Partsunion erkennt sie automatisch, bevor eine falsche OE-Nummer vorgeschlagen wird.</p></> : <><span className="inline-flex items-center gap-2 bg-[#e8f6ed] px-3 py-2 text-[10px] font-semibold text-[#267149]"><CheckCircle2 className="h-3.5 w-3.5" />Antwort automatisch zugeordnet</span><h3 className="mt-5 text-lg font-semibold">Die OE-Prüfung läuft ohne Neuerfassung weiter.</h3><div className="mt-5 border-l-4 border-[#1d6fe8] bg-[#edf4fd] p-5"><span className="text-[9px] text-[#6a788a]">OE-Referenz · Demo-Vorgang</span><strong className="mt-2 block font-mono text-xl text-[#155fc8]">04L 121 011 L</strong></div><p className="mt-5 flex items-center gap-2 text-[11px] leading-5 text-[#627186]"><ShieldCheck className="h-4 w-4 text-[#2b8555]" />Rückfrage, Antwort und Fahrzeugbezug bleiben am Ergebnis.</p></>}</motion.div></AnimatePresence></div>
                </div>
            </section>

            <section id="ergebnis" className="scroll-mt-28 bg-white py-14 md:py-20">
                <div className="mx-auto max-w-[1260px] px-5 md:px-8 xl:px-10"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center"><div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Automatisch verkaufsfertig</span><h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.05] tracking-[-.043em]">Nach der Klärung steht nicht nur eine Nummer, sondern der passende Artikel bereit.</h2><p className="mt-4 max-w-[500px] text-sm leading-6 text-[#637186]">Partsunion führt OE-Bezug, passende Alternativen, eigenen Bestand und Kondition automatisch zusammen. Der geprüfte Artikel kann ohne erneute Suche direkt in Angebot oder Auftrag weitergehen.</p></div><div className="grid border border-[#b9c7d6] bg-[#eef3f8] sm:grid-cols-[.92fr_1.08fr]"><div className="border-b border-[#c9d4df] bg-[#0e315d] p-5 text-white sm:border-b-0 sm:border-r sm:p-6"><PackageCheck className="h-5 w-5 text-[#8bb8f7]" /><span className="mt-5 block text-[9px] font-bold uppercase tracking-[.12em] text-[#8bb8f7]">Geprüfter Bezug</span><strong className="mt-2 block font-mono text-lg">04L 121 011 L</strong><span className="mt-2 block text-[10px] text-white/50">mit Fahrzeug- und Katalogkontext</span></div><div className="p-5 sm:p-6"><div className="grid grid-cols-2 gap-px border border-[#c7d2de] bg-[#c7d2de] text-[10px]">{[['Alternative', 'automatisch ergänzt'], ['Bestand', 'direkt sichtbar'], ['Kondition', 'am Artikel'], ['Nächster Schritt', 'Angebot']].map(([label, value]) => <div key={label} className="bg-white p-3"><span className="text-[#758294]">{label}</span><strong className="mt-1 block text-[#28394e]">{value}</strong></div>)}</div><div className="mt-4 flex items-center justify-between bg-[#1d6fe8] px-4 py-3 text-[10px] font-semibold text-white"><span>In Angebot übernehmen</span><ArrowRight className="h-4 w-4" /></div></div></div></div></div>
            </section>

            <div id="kontrolle" className="scroll-mt-28"><FlagshipSafety title="Automatisch, solange die Daten eindeutig sind." text={page.controlText} /></div>
            <FlagshipCta eyebrow="Automatisierte OE-Ermittlung ansehen" title="Sieh dir an, wie aus Fahrzeugdaten eine geprüfte Teileauswahl wird." text="Wir zeigen dir den vollständigen Ablauf – vom automatischen Katalogabgleich über notwendige Rückfragen bis zum verkaufsfertigen Artikel in deinem Sortiment." buttonLabel="OE-Ablauf besprechen" nextHref="/loesungen/angebot-auftrag" nextLabel="Angebot & Auftrag" />
        </article>
    );
}
