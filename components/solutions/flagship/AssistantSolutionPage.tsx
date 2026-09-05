'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    BarChart3,
    Bot,
    Boxes,
    CheckCircle2,
    CircleDollarSign,
    ClipboardList,
    FileCheck2,
    PackageSearch,
    RotateCcw,
    SearchCheck,
    ShieldCheck,
    ShoppingCart,
    UserRound,
} from 'lucide-react';
import { useHydrationSafeReducedMotion } from '@/components/motion/useHydrationSafeReducedMotion';
import type { SolutionPageData } from '@/lib/solutions-data';
import { FlagshipCta, FlagshipSafety, FlagshipSubnav, SolutionHero } from './FlagshipShared';

const scenarios = [
    {
        label: 'Chef-Briefing',
        question: 'Was muss heute zuerst erledigt werden?',
        answer: 'Zwei Kundenaufträge brauchen eine Entscheidung. Bei einem fehlt eine Position, beim zweiten ist die zugesagte Lieferzeit gefährdet.',
        sources: ['Aufträge', 'Bestand', 'offene Zugänge', 'Aufgaben'],
        action: 'Arbeitsliste mit Verantwortlichen und nächstem Schritt vorbereiten',
        icon: ClipboardList,
    },
    {
        label: 'Verkauf',
        question: 'Welche Angebote warten noch auf eine Antwort?',
        answer: 'Drei Angebote sind noch offen. Bei einem ist der vereinbarte Nachfasszeitpunkt erreicht; zwei wurden erst heute versendet.',
        sources: ['Angebote', 'Kundenakte', 'Wiedervorlagen'],
        action: 'Nachfassliste für den Verkauf anlegen',
        icon: ShoppingCart,
    },
    {
        label: 'Einkauf',
        question: 'Welche Aufträge hängen wegen fehlender Teile fest?',
        answer: 'Eine Auftragsposition ist nicht gedeckt. Der freie Bestand ist bereits reserviert und der offene Zugang reicht für die benötigte Menge nicht aus.',
        sources: ['Auftrag', 'Reservierungen', 'Zulauf', 'Lieferanten'],
        action: 'Bestellentwurf für die offene Menge vorbereiten',
        icon: PackageSearch,
    },
    {
        label: 'Retouren & Reklamationen',
        question: 'Welche Rückgaben oder Reklamationen brauchen heute eine Entscheidung?',
        answer: 'Zwei Fälle sind vollständig dokumentiert. Bei einem ist die Bestandsbehandlung offen, beim anderen wartet die kaufmännische Bearbeitung.',
        sources: ['Retouren', 'Reklamationen', 'Ursprungsbelege', 'Bestand'],
        action: 'Entscheidungsliste mit getrennten Folgeschritten vorbereiten',
        icon: RotateCcw,
    },
];

function AssistantConsole({ scenarioIndex, setScenarioIndex }: { scenarioIndex: number; setScenarioIndex: (value: number) => void }) {
    const reducedMotion = useHydrationSafeReducedMotion();
    const [actionStage, setActionStage] = useState(0);
    const scenario = scenarios[scenarioIndex];

    const chooseScenario = (index: number) => {
        setScenarioIndex(index);
        setActionStage(0);
    };

    return (
        <div className="overflow-hidden border border-[#416b98] bg-[#0c2f53] shadow-[0_30px_75px_rgba(0,13,31,.36)]">
            <div className="flex min-h-12 items-center border-b border-white/14 px-4 text-white"><Bot className="h-4 w-4 text-[#8bb8f7]" /><span className="ml-2.5"><strong className="block text-[11px]">Partsunion Betriebsassistent</strong><span className="text-[9px] text-white/45">Demo-Daten · Freigabe vor Änderung</span></span><span className="ml-auto hidden items-center gap-1.5 text-[9px] text-[#90bcf8] sm:flex"><ShieldCheck className="h-3.5 w-3.5" />Rechte werden berücksichtigt</span></div>
            <div className="grid min-h-[500px] lg:grid-cols-[.72fr_1.28fr]">
                <aside className="border-b border-white/14 bg-[#113a63] p-4 text-white lg:border-b-0 lg:border-r sm:p-5"><span className="text-[9px] font-bold uppercase tracking-[.13em] text-[#8bb8f7]">Worum geht es?</span><div className="mt-4 space-y-2">{scenarios.map((item, index) => { const Icon = item.icon; return <button key={item.label} type="button" onClick={() => chooseScenario(index)} className={`flex w-full items-center gap-3 border p-3 text-left transition ${scenarioIndex === index ? 'border-[#77acf3] bg-[#1b4c7d] text-white' : 'border-white/13 bg-white/[.035] text-white/58 hover:bg-white/[.07] hover:text-white/84'}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center ${scenarioIndex === index ? 'bg-[#1d6fe8]' : 'bg-white/[.06]'}`}><Icon className="h-4 w-4" /></span><span><strong className="block text-[11px]">{item.label}</strong><span className="mt-1 line-clamp-1 block text-[9px] opacity-65">{item.question}</span></span></button>; })}</div><div className="mt-5 border-t border-white/12 pt-4 text-[9px] leading-4 text-white/38">Antworten basieren auf freigegebenen Betriebsdaten und dem aktuellen Vorgang.</div></aside>
                <section className="bg-[#f3f6f9] p-4 text-[#26364b] sm:p-6">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={scenario.label} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: reducedMotion ? 0 : .24 }}>
                            <div className="border border-[#c8d3de] bg-white p-4"><span className="text-[9px] font-bold uppercase tracking-[.11em] text-[#748193]">Deine Frage</span><strong className="mt-2 block text-sm leading-6">{scenario.question}</strong></div>
                            <div className="mt-3 border border-[#b7cbe1] bg-white p-4"><div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center bg-[#1d6fe8] text-white"><Bot className="h-4 w-4" /></span><span><strong className="block text-[11px]">Antwort aus deinem Betrieb</strong><span className="text-[9px] text-[#758294]">mit sichtbaren Datenquellen</span></span></div><p className="mt-4 text-[12px] leading-6 text-[#4f6076]">{scenario.answer}</p><div className="mt-4 flex flex-wrap gap-1.5">{scenario.sources.map((source) => <span key={source} className="inline-flex items-center gap-1.5 border border-[#cbd5df] bg-[#f6f8fa] px-2.5 py-1.5 text-[9px] font-semibold text-[#5f6f82]"><SearchCheck className="h-3 w-3 text-[#1d6fe8]" />{source}</span>)}</div></div>
                            <div className={`mt-3 border-l-2 p-4 ${actionStage === 2 ? 'border-[#2d9660] bg-[#eaf7ef]' : actionStage === 1 ? 'border-[#dda64f] bg-[#fff7e8]' : 'border-[#1d6fe8] bg-[#eaf3ff]'}`}><span className="text-[9px] font-bold uppercase tracking-[.11em] text-[#55708f]">{actionStage === 2 ? 'Bestätigt' : actionStage === 1 ? 'Zur Bestätigung' : 'Vorgeschlagener Schritt'}</span><strong className="mt-2 block text-[11px] leading-5">{scenario.action}</strong><div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><span className="text-[9px] text-[#6d7b8e]">{actionStage === 0 ? 'Noch nichts verändert' : actionStage === 1 ? 'Entwurf geprüft · Ausführung noch offen' : 'Bestätigter Demo-Schritt protokolliert'}</span>{actionStage < 2 ? <button type="button" onClick={() => setActionStage((value) => value + 1)} className="bg-[#1d6fe8] px-4 py-2.5 text-[9px] font-semibold text-white transition hover:bg-[#155fc8]">{actionStage === 0 ? 'Vorschlag prüfen' : 'Ausführung bestätigen'}</button> : <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-[#28734a]"><CheckCircle2 className="h-4 w-4" />Demo-Schritt abgeschlossen</span>}</div></div>
                        </motion.div>
                    </AnimatePresence>
                </section>
            </div>
        </div>
    );
}

export function AssistantSolutionPage({ page }: { page: SolutionPageData }) {
    const [scenarioIndex, setScenarioIndex] = useState(0);

    return (
        <article className="bg-white pt-[72px] text-[#111b2b]">
            <SolutionHero
                icon={Bot}
                eyebrow="Betriebsassistent"
                title="Ein Assistent, der deinen ganzen Betrieb kennt."
                description="Produkte, Bestand, Kunden, Fahrzeuge, Aufträge, Einkauf, Retouren, Reklamationen, Umsätze, Forderungen und Aufgaben: Der Assistent verbindet alle freigegebenen Daten und Zusammenhänge deines Betriebs."
                highlight="Du entscheidest. Partsunion bereitet vor und führt erst nach deiner Bestätigung aus."
                primaryLabel="Betriebsassistent kennenlernen"
                secondaryLabel="Was er kennt"
                secondaryHref="#wissen"
                proofItems={[{ title: 'Betriebswissen', text: 'im Zusammenhang betrachtet' }, { title: 'Vorschläge', text: 'bleiben sichtbar prüfbar' }, { title: 'Ausführung', text: 'erst nach Bestätigung' }]}
            >
                <AssistantConsole scenarioIndex={scenarioIndex} setScenarioIndex={setScenarioIndex} />
            </SolutionHero>

            <FlagshipSubnav items={[{ label: 'Betriebswissen', href: '#wissen' }, { label: 'Einsatzbereiche', href: '#rollen' }, { label: 'Vom Fragen zum Handeln', href: '#handeln' }, { label: 'Kontrolle', href: '#kontrolle' }]} />

            <section id="wissen" className="scroll-mt-28 overflow-hidden bg-white py-14 md:py-20">
                <div className="mx-auto max-w-[1320px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-8 lg:grid-cols-[.66fr_1.34fr] lg:items-center lg:gap-14"><div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Dein freigegebenes Betriebswissen</span><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.25rem)] font-semibold leading-[1.04] tracking-[-.045em]">Er kennt nicht nur die letzte Frage. Er kennt deinen Betrieb.</h2><p className="mt-4 max-w-[500px] text-sm leading-6 text-[#637186]">Eine Antwort betrachtet Produkte, Kunden, Fahrzeuge, Aufträge, Bestand, Einkauf, Retouren, Zahlungen und Aufgaben gemeinsam. Danach öffnet der Assistent dynamisch die passende Maske und bereitet den nächsten Schritt direkt am Vorgang vor.</p></div><div className="relative grid gap-px border border-[#b8c6d5] bg-[#b8c6d5] sm:grid-cols-3"><div className="col-span-full flex min-h-[112px] items-center justify-center bg-[#0d3158] p-5 text-white sm:col-span-1 sm:row-span-2"><div className="text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center bg-[#1d6fe8]"><Bot className="h-5 w-5" /></span><strong className="mt-3 block text-sm">Betriebsassistent</strong><span className="mt-1 block text-[9px] text-white/48">kennt deinen Betrieb</span></div></div>{[[Boxes, 'Produkte & Bestand'], [UserRound, 'Kunden & Fahrzeuge'], [ShoppingCart, 'Angebote & Aufträge'], [RotateCcw, 'Retouren & Reklamationen'], [CircleDollarSign, 'Umsatz & Forderungen'], [ClipboardList, 'Einkauf & Aufgaben']].map(([ItemIcon, label]) => { const Icon = ItemIcon as typeof Bot; return <div key={label as string} className="flex min-h-[112px] items-center gap-3 bg-[#f5f8fb] p-4"><span className="flex h-9 w-9 items-center justify-center border border-[#a9bdd4] bg-white text-[#1d6fe8]"><Icon className="h-4 w-4" /></span><strong className="text-[11px] text-[#34455b]">{label as string}</strong></div>; })}</div></div>
                </div>
            </section>

            <section id="rollen" className="scroll-mt-28 border-y border-[#d4dee8] bg-[#f2f5f8] py-14 md:py-20">
                <div className="mx-auto max-w-[1280px] px-5 md:px-8 xl:px-10"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Ein Assistent, verschiedene Aufgaben</span><h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.05] tracking-[-.043em]">Die Frage bestimmt den Blick auf den Betrieb.</h2></div><p className="max-w-[470px] text-sm leading-6 text-[#637186]">Wähle einen Bereich. Die Antwort, Quellen und vorbereitete Bearbeitung wechseln gemeinsam.</p></div><div className="mt-8 grid gap-2 sm:grid-cols-4">{scenarios.map((scenario, index) => { const Icon = scenario.icon; return <button key={scenario.label} type="button" onClick={() => setScenarioIndex(index)} className={`flex items-center gap-3 border p-4 text-left transition ${scenarioIndex === index ? 'border-[#1d6fe8] bg-[#1d6fe8] text-white shadow-[0_12px_24px_rgba(29,111,232,.18)]' : 'border-[#bdcad8] bg-white text-[#526176] hover:border-[#7fa9dc]'}`}><Icon className="h-4 w-4 shrink-0" /><strong className="text-[11px]">{scenario.label}</strong></button>; })}</div><div className="mt-4 grid overflow-hidden border border-[#b9c7d6] bg-white lg:grid-cols-[.8fr_1.2fr]"><div className="bg-[#0d3158] p-6 text-white sm:p-8"><span className="text-[9px] font-bold uppercase tracking-[.12em] text-[#8bb8f7]">Frage</span><h3 className="mt-4 text-xl font-semibold leading-8">{scenarios[scenarioIndex].question}</h3><div className="mt-6 flex flex-wrap gap-2">{scenarios[scenarioIndex].sources.map((source) => <span key={source} className="border border-white/18 bg-white/[.06] px-2.5 py-1.5 text-[9px] text-white/64">{source}</span>)}</div></div><div className="p-6 sm:p-8"><span className="text-[9px] font-bold uppercase tracking-[.12em] text-[#1d6fe8]">Verständliche Antwort</span><p className="mt-4 text-sm leading-7 text-[#4f6075]">{scenarios[scenarioIndex].answer}</p><div className="mt-6 flex items-center justify-between border-t border-[#d5dee7] pt-5"><span><span className="block text-[9px] text-[#748193]">Vorbereiteter Schritt</span><strong className="mt-1 block text-[11px]">{scenarios[scenarioIndex].action}</strong></span><ArrowRight className="h-4 w-4 text-[#1d6fe8]" /></div></div></div></div>
            </section>

            <section id="handeln" className="scroll-mt-28 bg-white py-14 md:py-20">
                <div className="mx-auto grid max-w-[1260px] gap-9 px-5 md:px-8 lg:grid-cols-[.68fr_1.32fr] lg:items-center xl:px-10"><div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Vom Fragen zum Handeln</span><h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.05] tracking-[-.043em]">Keine Aktion verschwindet hinter einem stillen Klick.</h2><p className="mt-4 max-w-[500px] text-sm leading-6 text-[#637186]">Der Assistent zeigt, worauf seine Antwort beruht, was er als Nächstes vorschlägt und welche Änderung daraus entstehen würde.</p></div><div className="border-y border-[#b9c7d5]">{[[SearchCheck, 'Fragen', 'Die Frage wird im aktuellen Betriebs- oder Vorgangskontext geprüft.'], [BarChart3, 'Verstehen', 'Antwort, Priorität und verwendete Datenquellen werden sichtbar.'], [FileCheck2, 'Vorbereiten', 'Ein Angebot, eine Aufgabe oder ein Entwurf wird zur Prüfung angelegt.'], [CheckCircle2, 'Bestätigen', 'Erst deine sichtbare Freigabe erlaubt den nächsten Schritt.']].map(([ItemIcon, title, text], index) => { const Icon = ItemIcon as typeof Bot; return <div key={title as string} className={`grid gap-3 py-5 sm:grid-cols-[40px_110px_1fr] sm:items-center ${index > 0 ? 'border-t border-[#d3dce5]' : ''}`}><span className={`flex h-9 w-9 items-center justify-center ${index === 3 ? 'bg-[#1d6fe8] text-white' : 'border border-[#a9bdd4] text-[#1d6fe8]'}`}><Icon className="h-4 w-4" /></span><strong className="text-sm">{title as string}</strong><span className="text-[11px] leading-5 text-[#687689]">{text as string}</span></div>; })}</div></div>
            </section>

            <div id="kontrolle" className="scroll-mt-28"><FlagshipSafety eyebrow="Ein Assistent mit Leitplanken" title="Er sieht und verändert nur, was freigegeben ist." text={page.controlText} /></div>
            <FlagshipCta eyebrow="Betriebsassistent für den eigenen Alltag" title="Bring deine wichtigsten Betriebsfragen mit." text="Wir zeigen dir an konkreten Vorgängen, welche Antworten möglich sind, welche Schritte vorbereitet werden können und wo deine Bestätigung erforderlich bleibt." buttonLabel="Assistenten besprechen" nextHref="/loesungen/einkauf-disposition" nextLabel="Einkauf & Disposition" />
        </article>
    );
}
