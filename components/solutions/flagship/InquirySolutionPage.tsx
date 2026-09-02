'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    FileText,
    Inbox,
    MessageCircle,
    ScanLine,
    ShoppingCart,
    UserRoundCheck,
} from 'lucide-react';
import { useHydrationSafeReducedMotion } from '@/components/motion/useHydrationSafeReducedMotion';
import type { SolutionPageData } from '@/lib/solutions-data';
import { FlagshipCta, FlagshipSafety, FlagshipSubnav, SolutionHero } from './FlagshipShared';

const stages = [
    { label: 'Anfrage', title: 'Nachricht kommt an', detail: 'Originaltext und Kanal bleiben erhalten.' },
    { label: 'Kontext', title: 'Kunde und Fahrzeug verbinden', detail: 'Fahrzeugschein und Teilewunsch gehören zum selben Fall.' },
    { label: 'Prüfung', title: 'Offene Ausführung klären', detail: 'Fachwissen bleibt sichtbar im Ablauf.' },
    { label: 'Verkauf', title: 'Geprüften Bedarf weiterführen', detail: 'Das Angebot beginnt mit dem bereits geklärten Stand.' },
];

function InquiryFlow({ activeStage, setActiveStage }: { activeStage: number; setActiveStage: (stage: number) => void }) {
    const reducedMotion = useHydrationSafeReducedMotion();
    const stage = stages[activeStage];

    return (
        <div className="overflow-hidden border border-[#9eb3ca] bg-white shadow-[0_28px_70px_rgba(18,47,81,.16)]">
            <div className="flex min-h-12 items-center border-b border-[#cad5e0] bg-[#f6f8fa] px-4">
                <Inbox className="h-4 w-4 text-[#1d6fe8]" />
                <span className="ml-2.5"><strong className="block text-[11px] font-semibold text-[#26364b]">Kundenfall · Bremsen vorne</strong><span className="block text-[9px] text-[#748193]">WhatsApp → Anfrage-Inbox → Angebot</span></span>
                <span className="ml-auto hidden text-[9px] font-semibold text-[#155fc8] sm:block">{String(activeStage + 1).padStart(2, '0')} / 04</span>
            </div>

            <div className="grid min-h-[440px] lg:grid-cols-[.78fr_1.22fr]">
                <div className="border-b border-[#d1dbe5] bg-[#eaf0f5] p-5 lg:border-b-0 lg:border-r">
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.12em] text-[#637186]"><MessageCircle className="h-4 w-4 text-[#19885a]" /> Kundenkontakt</div>
                    <div className="mt-5 space-y-3 text-[12px] leading-[1.55]">
                        <motion.div layout className="mr-7 border border-[#c3cfda] bg-white p-4 text-[#33445a] shadow-sm">Moin, brauche Bremse vorne für meinen Golf. Hier ist der Schein.</motion.div>
                        <AnimatePresence initial={false}>
                            {activeStage >= 1 && <motion.div initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mr-14 flex items-center gap-3 border border-[#bfd0e1] bg-white p-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#e7f1ff]"><FileText className="h-4 w-4 text-[#1d6fe8]" /></span><span><strong className="block text-[11px]">Fahrzeugschein</strong><span className="text-[9px] text-[#758294]">am Kundenfall abgelegt</span></span></motion.div>}
                            {activeStage >= 2 && <motion.div initial={reducedMotion ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="ml-8 bg-[#d9f1e3] p-4 text-[#315849]">Danke. Die passende Ausführung wird jetzt fachlich geprüft.</motion.div>}
                        </AnimatePresence>
                    </div>
                    <div className="mt-6 flex items-center gap-2 border-t border-[#c8d3dd] pt-4 text-[10px] font-semibold text-[#5e6e82]"><span className="h-2.5 w-2.5 rounded-full bg-[#22a06b]" /> Originaldialog bleibt vollständig</div>
                </div>

                <div className="relative p-5 sm:p-6">
                    <div className="flex items-center justify-between"><span className="text-[9px] font-bold uppercase tracking-[.12em] text-[#637186]">Partsunion-Vorgang</span><span className={`px-2.5 py-1 text-[9px] font-semibold ${activeStage === 2 ? 'bg-[#fff1dc] text-[#875a1f]' : activeStage === 3 ? 'bg-[#e7f5ec] text-[#257047]' : 'bg-[#e8f2ff] text-[#155fc8]'}`}>{activeStage === 0 ? 'Neu' : activeStage === 1 ? 'Kontext vollständig' : activeStage === 2 ? 'Fachprüfung offen' : 'Angebot bereit'}</span></div>
                    <div className="mt-5 grid grid-cols-2 gap-px border border-[#c7d2de] bg-[#c7d2de] text-[11px]">
                        {[['Kunde', activeStage >= 1 ? 'KFZ Meyer e.K.' : 'wird gesucht'], ['Fahrzeug', activeStage >= 1 ? 'Volkswagen Golf VII' : 'noch offen'], ['Teilewunsch', 'Bremse vorne'], ['Zuständig', activeStage >= 1 ? 'Verkauf · Lena' : 'nicht zugewiesen']].map(([label, value]) => <div key={label} className="min-h-[74px] bg-white p-3.5"><span className="text-[9px] text-[#7a8798]">{label}</span><strong className={`mt-1.5 block ${value.includes('offen') || value.includes('gesucht') || value.includes('nicht') ? 'font-medium text-[#9a6b2e]' : 'text-[#28394e]'}`}>{value}</strong></div>)}
                    </div>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={activeStage} initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: reducedMotion ? 0 : .25 }} className={`mt-4 border-l-2 p-4 ${activeStage === 2 ? 'border-[#e0a44e] bg-[#fff7e9]' : activeStage === 3 ? 'border-[#2d9a61] bg-[#edf8f1]' : 'border-[#1d6fe8] bg-[#edf4fd]'}`}>
                            <span className="text-[9px] font-bold uppercase tracking-[.1em] text-[#65758a]">{stage.label}</span><strong className="mt-1.5 block text-sm text-[#26364b]">{stage.title}</strong><span className="mt-1 block text-[11px] leading-5 text-[#66768a]">{stage.detail}</span>
                        </motion.div>
                    </AnimatePresence>
                    <div className="mt-5 grid grid-cols-4 gap-1.5">
                        {stages.map((item, index) => <button key={item.label} type="button" onClick={() => setActiveStage(index)} aria-pressed={activeStage === index} className={`border px-1 py-2.5 text-[9px] font-semibold transition ${activeStage === index ? 'border-[#1d6fe8] bg-[#1d6fe8] text-white' : 'border-[#c4d0dc] bg-white text-[#65758a] hover:border-[#7fa9dc]'}`}>{item.label}</button>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function InquirySolutionPage({ page }: { page: SolutionPageData }) {
    const reducedMotion = useHydrationSafeReducedMotion();
    const [activeStage, setActiveStage] = useState(0);
    const [systemView, setSystemView] = useState<'inbox' | 'dialog'>('inbox');

    useEffect(() => {
        if (reducedMotion) return;
        const timer = window.setInterval(() => setActiveStage((current) => (current + 1) % stages.length), 3000);
        return () => window.clearInterval(timer);
    }, [reducedMotion]);

    return (
        <article className="bg-white pt-[72px] text-[#111b2b]">
            <SolutionHero
                icon={Inbox}
                eyebrow="Anfrage-Inbox"
                title="Aus jeder Anfrage wird ein sauberer Teilevorgang."
                description="WhatsApp, Telefon, Theke oder E-Mail: Nachricht, Kunde, Fahrzeug und Teilebedarf landen gemeinsam in einem bearbeitbaren Fall."
                highlight={page.promise}
                primaryLabel="Anfrage-Ablauf zeigen lassen"
                secondaryLabel="Ablauf ansehen"
                secondaryHref="#produktablauf"
                proofItems={[{ title: '4 Kanäle', text: 'ein Arbeitsvorrat' }, { title: 'Originaltext', text: 'bleibt erhalten' }, { title: 'Geprüfter Fall', text: 'geht ins Angebot' }]}
            >
                <InquiryFlow activeStage={activeStage} setActiveStage={setActiveStage} />
            </SolutionHero>

            <FlagshipSubnav items={[{ label: 'Produktablauf', href: '#produktablauf' }, { label: 'Echte Oberfläche', href: '#system' }, { label: 'Übergabe', href: '#uebergabe' }, { label: 'Kontrolle', href: '#kontrolle' }]} />

            <section id="produktablauf" className="scroll-mt-28 bg-[#0b294e] py-14 text-white md:py-20">
                <div className="mx-auto max-w-[1320px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-8 lg:grid-cols-[.68fr_1.32fr] lg:gap-14">
                        <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#8ab8f8]">Ein echter Thekenfall</span><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.25rem)] font-semibold leading-[1.04] tracking-[-.045em]">Der Kunde schreibt frei. Intern entsteht trotzdem Ordnung.</h2><p className="mt-4 max-w-[470px] text-sm leading-6 text-white/58">Partsunion verändert den Kundenton nicht. Es macht aus dem Eingang einen Fall, den Verkauf und Teilefachkraft gemeinsam weiterführen können.</p></div>
                        <div className="border-y border-white/18">
                            {[['01', 'Eingang behalten', 'Originalnachricht, Dokument und Kanal bleiben sichtbar.', MessageCircle], ['02', 'Kontext ergänzen', 'Kunde, Fahrzeug und Teilewunsch werden dem Fall zugeordnet.', FileText], ['03', 'Fachlich entscheiden', 'Unklare Ausführungen gehen sichtbar in die Prüfung.', ScanLine], ['04', 'Ohne Neuerfassung verkaufen', 'Der geprüfte Bedarf wird in Angebot und Auftrag weitergeführt.', ShoppingCart]].map(([number, title, text, ItemIcon], index) => { const Icon = ItemIcon as typeof Inbox; return <button key={number as string} type="button" onClick={() => setActiveStage(index)} className={`grid w-full gap-3 py-5 text-left transition sm:grid-cols-[32px_44px_210px_1fr] sm:items-center ${index > 0 ? 'border-t border-white/13' : ''} ${activeStage === index ? 'text-white' : 'text-white/62 hover:text-white/85'}`}><span className="font-mono text-[9px] font-bold text-[#7eb0f5]">{number as string}</span><span className={`flex h-9 w-9 items-center justify-center border ${activeStage === index ? 'border-[#78acf1] bg-[#1d6fe8]' : 'border-white/18 bg-white/5'}`}><Icon className="h-4 w-4" /></span><strong className="text-sm">{title as string}</strong><span className="text-[11px] leading-5 text-white/48">{text as string}</span></button>; })}
                        </div>
                    </div>
                </div>
            </section>

            <section id="system" className="scroll-mt-28 border-b border-[#d7e0e9] bg-[#edf2f7] py-14 md:py-20">
                <div className="mx-auto max-w-[1380px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-8 lg:grid-cols-[330px_1fr] lg:items-start lg:gap-12">
                        <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Aktuelles Demosystem</span><h2 className="mt-3 text-[clamp(1.9rem,2.8vw,2.8rem)] font-semibold leading-[1.06] tracking-[-.04em]">Nicht nur eine Marketinggrafik.</h2><p className="mt-4 text-sm leading-6 text-[#627186]">Hier siehst du gezielte Ausschnitte aus der aktuellen Partsunion-Anfragebearbeitung. Statt einer unlesbaren Vollansicht zeigen wir genau den Bereich, in dem gearbeitet wird.</p><div className="mt-6 flex gap-2">{([['inbox', 'Arbeitsvorrat'], ['dialog', 'Kundendialog']] as const).map(([value, label]) => <button key={value} type="button" onClick={() => setSystemView(value)} className={`border px-3 py-2 text-[10px] font-semibold transition ${systemView === value ? 'border-[#1d6fe8] bg-[#1d6fe8] text-white' : 'border-[#b8c6d5] bg-white text-[#536278]'}`}>{label}</button>)}</div></div>
                        <div className="overflow-hidden border border-[#aebdce] bg-white shadow-[0_22px_55px_rgba(24,49,79,.14)]"><div className="flex h-11 items-center border-b border-[#cbd5e0] px-4"><Inbox className="h-4 w-4 text-[#1d6fe8]" /><span className="ml-2 text-[9px] font-semibold text-[#5c6b7e]">PARTSUNION · {systemView === 'inbox' ? 'ANFRAGE-INBOX' : 'KUNDENDIALOG'}</span><span className="ml-auto text-[8px] text-[#758294]">Originalansicht · Demo-Daten</span></div><div className="relative aspect-[1.72/1] overflow-hidden bg-[#e8edf3]"><Image src="/product/whatsapp-vorgang.png" alt={systemView === 'inbox' ? 'Partsunion Anfrage-Inbox im aktuellen Demosystem' : 'Partsunion Kundendialog im aktuellen Demosystem'} fill unoptimized className={`object-cover object-top transition-transform duration-500 ${systemView === 'inbox' ? 'scale-[1.45] origin-top-left' : 'scale-[1.45] origin-top-right'}`} sizes="(max-width: 1024px) 95vw, 68vw" /></div></div>
                    </div>
                </div>
            </section>

            <section id="uebergabe" className="scroll-mt-28 bg-white py-14 md:py-20">
                <div className="mx-auto max-w-[1240px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Ein Fall bleibt ein Fall</span><h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.05] tracking-[-.042em]">Nach der Antwort fängt die Arbeit nicht wieder von vorne an.</h2><p className="mt-4 max-w-[500px] text-sm leading-6 text-[#637186]">Fahrzeug, Teileprüfung und Angebot nutzen denselben bestätigten Stand. So verschwindet die Anfrage nicht im Chatverlauf, sobald der Kunde kaufen möchte.</p></div><div className="grid gap-0 border-y border-[#bdcad8] sm:grid-cols-[1fr_auto_1fr_auto_1fr]"><div className="p-5"><MessageCircle className="h-5 w-5 text-[#1d6fe8]" /><strong className="mt-4 block text-sm">Kundenanfrage</strong><span className="mt-2 block text-[11px] leading-5 text-[#69778a]">Text, Dokument und Kundenwunsch</span></div><ArrowRight className="hidden h-4 w-4 self-center text-[#83a0bf] sm:block" /><div className="border-t border-[#d5dde6] p-5 sm:border-t-0"><UserRoundCheck className="h-5 w-5 text-[#1d6fe8]" /><strong className="mt-4 block text-sm">Geprüfter Bedarf</strong><span className="mt-2 block text-[11px] leading-5 text-[#69778a]">Fahrzeug und Ausführung geklärt</span></div><ArrowRight className="hidden h-4 w-4 self-center text-[#83a0bf] sm:block" /><div className="border-t border-[#d5dde6] p-5 sm:border-t-0"><ShoppingCart className="h-5 w-5 text-[#1d6fe8]" /><strong className="mt-4 block text-sm">Angebot & Auftrag</strong><span className="mt-2 block text-[11px] leading-5 text-[#69778a]">Positionen ohne erneutes Abtippen</span></div></div></div>
                </div>
            </section>

            <div id="kontrolle" className="scroll-mt-28"><FlagshipSafety title="Unklare Variante bleibt eine sichtbare Aufgabe." text={page.controlText} /></div>
            <FlagshipCta eyebrow="Anfrage-Inbox im eigenen Ablauf" title="Zeig uns, wie Anfragen heute bei euch ankommen." text="Wir gehen gemeinsam einen echten Fall durch – vom ersten Kundenkontakt bis zum verkaufsfähigen Teilevorgang." buttonLabel="Anfrage-Ablauf besprechen" nextHref="/loesungen/oe-ermittlung" nextLabel="OE-Ermittlung" />
        </article>
    );
}
