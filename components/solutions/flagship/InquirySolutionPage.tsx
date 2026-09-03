'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    Camera,
    FileText,
    Inbox,
    Languages,
    MessageCircle,
    Mic,
    ScanLine,
    ShoppingCart,
    Store,
    UserRoundCheck,
} from 'lucide-react';
import { useHydrationSafeReducedMotion } from '@/components/motion/useHydrationSafeReducedMotion';
import type { SolutionPageData } from '@/lib/solutions-data';
import { FlagshipCta, FlagshipSafety, FlagshipSubnav, SolutionHero } from './FlagshipShared';

const counterStages = [
    { label: 'Schein', title: 'Fahrzeugschein erfassen', detail: 'Das Foto liefert die Fahrzeugdaten für den Vorgang.' },
    { label: 'Bedarf', title: 'Teilebedarf nennen', detail: 'Der Verkäufer gibt nur noch ein, welches Teil gesucht wird.' },
    { label: 'Auswahl', title: 'Passende Teile erhalten', detail: 'Marken, Preiskategorien und Verfügbarkeit werden gemeinsam gezeigt.' },
    { label: 'Angebot', title: 'Direkt anbieten', detail: 'Die ausgewählte Variante geht ohne Neuerfassung ins Angebot.' },
] as const;

const whatsappStages = [
    { label: 'Sprache', title: 'Sprache auswählen', detail: 'Deutsch, Englisch, Türkisch, Kurdisch oder Polnisch.' },
    { label: 'Fahrzeug', title: 'Fahrzeug senden', detail: 'Fahrzeugschein-Foto, VIN oder Fahrzeugdaten kommen direkt im Chat an.' },
    { label: 'Teil', title: 'Teil einfach nennen', detail: 'Text oder Sprachnachricht reicht – der Teilewunsch bleibt am Vorgang.' },
    { label: 'Auswahl', title: 'Auswahl erhalten', detail: 'Passende Angebote werden im Chat gezeigt und parallel im System bereitgestellt.' },
] as const;

type EntryMode = 'counter' | 'whatsapp';

function InquiryFlow({ activeStage, setActiveStage, entryMode, setEntryMode }: { activeStage: number; setActiveStage: (stage: number) => void; entryMode: EntryMode; setEntryMode: (mode: EntryMode) => void }) {
    const reducedMotion = useHydrationSafeReducedMotion();
    const stages = entryMode === 'counter' ? counterStages : whatsappStages;
    const stage = stages[activeStage];

    const chooseMode = (mode: EntryMode) => {
        setEntryMode(mode);
        setActiveStage(0);
    };

    return (
        <div className="overflow-hidden border border-[#9eb3ca] bg-white shadow-[0_28px_70px_rgba(18,47,81,.16)]">
            <div className="flex min-h-14 flex-wrap items-center gap-2 border-b border-[#cad5e0] bg-[#f6f8fa] px-3 py-2 sm:px-4">
                <div className="flex border border-[#bdcad8] bg-white p-0.5">
                    <button type="button" onClick={() => chooseMode('counter')} aria-pressed={entryMode === 'counter'} className={`inline-flex h-8 items-center gap-1.5 px-3 text-[9px] font-semibold transition ${entryMode === 'counter' ? 'bg-[#1d6fe8] text-white' : 'text-[#5d6c80] hover:bg-[#edf3fa]'}`}><Store className="h-3.5 w-3.5" /> Kunde an der Theke</button>
                    <button type="button" onClick={() => chooseMode('whatsapp')} aria-pressed={entryMode === 'whatsapp'} className={`inline-flex h-8 items-center gap-1.5 px-3 text-[9px] font-semibold transition ${entryMode === 'whatsapp' ? 'bg-[#16885b] text-white' : 'text-[#5d6c80] hover:bg-[#edf3fa]'}`}><MessageCircle className="h-3.5 w-3.5" /> Anfrage per WhatsApp</button>
                </div>
                <span className="ml-auto hidden text-[9px] font-semibold text-[#155fc8] sm:block">{String(activeStage + 1).padStart(2, '0')} / 04</span>
            </div>

            <div className="grid min-h-[440px] lg:grid-cols-[.78fr_1.22fr]">
                <div className="border-b border-[#d1dbe5] bg-[#eaf0f5] p-5 lg:border-b-0 lg:border-r">
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.12em] text-[#637186]">{entryMode === 'counter' ? <Store className="h-4 w-4 text-[#1d6fe8]" /> : <MessageCircle className="h-4 w-4 text-[#19885a]" />}{entryMode === 'counter' ? 'Am Verkaufstresen' : 'Im WhatsApp-Chat'}</div>
                    <div className="mt-5 space-y-3 text-[12px] leading-[1.55]">
                        <AnimatePresence initial={false}>
                            {entryMode === 'counter' ? <>
                                <motion.div key="counter-document" initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mr-8 flex items-center gap-3 border border-[#bfd0e1] bg-white p-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#e7f1ff]"><Camera className="h-4 w-4 text-[#1d6fe8]" /></span><span><strong className="block text-[11px]">Fahrzeugschein fotografiert</strong><span className="text-[9px] text-[#758294]">Fahrzeugdaten werden übernommen</span></span></motion.div>
                                {activeStage >= 1 && <motion.div key="counter-part" initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="ml-7 border border-[#c3cfda] bg-white p-3 text-[#33445a] shadow-sm">Teilebedarf: <strong>Ölfilter</strong></motion.div>}
                                {activeStage >= 2 && <motion.div key="counter-result" initial={reducedMotion ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="border-l-2 border-[#1d6fe8] bg-[#edf4fd] p-3 text-[#315070]">Passende Marken, Preise und Verfügbarkeit liegen zur Auswahl vor.</motion.div>}
                            </> : <>
                                <motion.div key="whatsapp-language" initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mr-4 bg-white p-3 text-[10px] text-[#405066] shadow-sm"><strong className="block text-[11px] text-[#24364b]">Bitte Sprache wählen</strong><span className="mt-1 block leading-5">1 Deutsch · 2 English · 3 Türkçe<br />4 Kurdî · 5 Polski</span></motion.div>
                                {activeStage >= 1 && <motion.div key="whatsapp-document" initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="ml-8 flex items-center gap-3 bg-[#d9f1e3] p-3"><FileText className="h-4 w-4 text-[#19885a]" /><span><strong className="block text-[11px] text-[#315849]">Fahrzeugschein.jpg</strong><span className="text-[9px] text-[#55786b]">vom Kunden gesendet</span></span></motion.div>}
                                {activeStage >= 2 && <motion.div key="whatsapp-part" initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="ml-12 bg-[#d9f1e3] p-3 text-[#315849]">Ich brauche einen Ölfilter.</motion.div>}
                                {activeStage >= 3 && <motion.div key="whatsapp-offer" initial={reducedMotion ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="mr-3 bg-white p-3 text-[#33445a] shadow-sm">Passende Auswahl gefunden. Preis und Verfügbarkeit werden angezeigt.</motion.div>}
                            </>}
                        </AnimatePresence>
                    </div>
                    <div className="mt-6 flex items-center gap-2 border-t border-[#c8d3dd] pt-4 text-[10px] font-semibold text-[#5e6e82]"><span className="h-2.5 w-2.5 rounded-full bg-[#22a06b]" /> {entryMode === 'counter' ? 'Direkt am Arbeitsplatz erfasst' : 'Chat und Anhänge bleiben erhalten'}</div>
                </div>

                <div className="relative p-5 sm:p-6">
                    <div className="flex items-center justify-between"><span className="text-[9px] font-bold uppercase tracking-[.12em] text-[#637186]">Ein gemeinsamer Partsunion-Vorgang</span><span className={`px-2.5 py-1 text-[9px] font-semibold ${activeStage === 3 ? 'bg-[#e7f5ec] text-[#257047]' : 'bg-[#e8f2ff] text-[#155fc8]'}`}>{activeStage === 0 ? 'Eingang' : activeStage === 1 ? 'Fahrzeug erfasst' : activeStage === 2 ? 'Auswahl wird geprüft' : 'Angebot bereit'}</span></div>
                    <div className="mt-5 grid grid-cols-2 gap-px border border-[#c7d2de] bg-[#c7d2de] text-[11px]">
                        {[['Eingang', entryMode === 'counter' ? 'Theke · manuell' : 'WhatsApp'], ['Fahrzeug', activeStage >= 1 ? 'Volkswagen Golf VII' : 'wird erfasst'], ['Teilewunsch', activeStage >= 1 ? 'Ölfilter' : 'noch offen'], ['Weiterführung', activeStage >= 3 ? 'Angebot erstellen' : 'im selben Vorgang']].map(([label, value]) => <div key={label} className="min-h-[74px] bg-white p-3.5"><span className="text-[9px] text-[#7a8798]">{label}</span><strong className={`mt-1.5 block ${value.includes('offen') || value.includes('erfasst') ? 'font-medium text-[#9a6b2e]' : 'text-[#28394e]'}`}>{value}</strong></div>)}
                    </div>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={`${entryMode}-${activeStage}`} initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: reducedMotion ? 0 : .25 }} className={`mt-4 border-l-2 p-4 ${activeStage === 2 ? 'border-[#e0a44e] bg-[#fff7e9]' : activeStage === 3 ? 'border-[#2d9a61] bg-[#edf8f1]' : 'border-[#1d6fe8] bg-[#edf4fd]'}`}>
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
    const [entryMode, setEntryMode] = useState<EntryMode>('counter');
    const [systemView, setSystemView] = useState<'inbox' | 'dialog'>('inbox');

    useEffect(() => {
        if (reducedMotion) return;
        const timer = window.setTimeout(() => {
            if (activeStage === 3) {
                setEntryMode((current) => current === 'counter' ? 'whatsapp' : 'counter');
                setActiveStage(0);
                return;
            }
            setActiveStage(activeStage + 1);
        }, 3000);
        return () => window.clearTimeout(timer);
    }, [activeStage, reducedMotion]);

    return (
        <article className="bg-white pt-[72px] text-[#111b2b]">
            <SolutionHero
                icon={Inbox}
                eyebrow="Theke und WhatsApp in einem System"
                title="Ob im Laden oder per WhatsApp: Aus der Anfrage wird direkt ein Angebot."
                description="Der Kunde steht mit seinem Fahrzeugschein an der Theke oder schickt ihn per WhatsApp. Partsunion übernimmt Fahrzeug, Teilebedarf und Bearbeitungsstand in denselben Verkaufsprozess."
                highlight={page.promise}
                primaryLabel="Anfrage-Ablauf zeigen lassen"
                secondaryLabel="Beide Wege ansehen"
                secondaryHref="#thekenfall"
                proofItems={[{ title: '2 Eingänge', text: 'ein gemeinsamer Vorgang' }, { title: '5 Sprachen', text: 'im WhatsApp-Ablauf' }, { title: 'Direkte Übergabe', text: 'in Angebot und Auftrag' }]}
            >
                <InquiryFlow activeStage={activeStage} setActiveStage={setActiveStage} entryMode={entryMode} setEntryMode={setEntryMode} />
            </SolutionHero>

            <FlagshipSubnav items={[{ label: 'Thekenfall', href: '#thekenfall' }, { label: 'WhatsApp-Fall', href: '#whatsappfall' }, { label: 'Im System', href: '#system' }, { label: 'Übergabe', href: '#uebergabe' }]} />

            <section id="thekenfall" className="scroll-mt-28 bg-[#0b294e] py-14 text-white md:py-20">
                <div className="mx-auto max-w-[1320px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-6 border-b border-white/18 pb-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
                        <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#8ab8f8]">Ein echter Thekenfall</span><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.25rem)] font-semibold leading-[1.04] tracking-[-.045em]">Vom Fahrzeugschein zum Angebot – in wenigen Schritten.</h2></div>
                        <p className="max-w-[700px] text-sm leading-6 text-white/62 lg:justify-self-end">Der Kunde kommt an die Theke und nennt, was er braucht. Fahrzeugschein fotografieren, Teil eingeben – Partsunion übernimmt Fahrzeugdaten, Teileidentifikation, Preisvergleich und Verfügbarkeit und bereitet die passende Auswahl direkt für den Verkauf vor.</p>
                    </div>
                    <div className="grid border-b border-white/18 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            ['01', 'Fahrzeugschein erfassen', 'Foto mit der App genügt. Fahrzeugdaten werden automatisch übernommen und stehen direkt am Arbeitsplatz bereit.', Camera],
                            ['02', 'Teilebedarf nennen', '„Ich brauche einen Ölfilter.“ – der Verkäufer gibt nur noch ein, welches Teil gesucht wird.', FileText],
                            ['03', 'Passende Teile erhalten', 'Partsunion identifiziert die passenden Teile und zeigt verschiedene Marken und Preiskategorien samt Verfügbarkeit.', ScanLine],
                            ['04', 'Direkt anbieten', 'Lagerware oder Bestellung ist sofort ersichtlich. Die ausgewählte Variante wird direkt ins Angebot übernommen.', ShoppingCart],
                        ].map(([number, title, text, ItemIcon], index) => { const Icon = ItemIcon as typeof Inbox; return <button key={number as string} type="button" onClick={() => { setEntryMode('counter'); setActiveStage(index); }} className={`group min-h-[235px] p-5 text-left transition sm:p-6 ${index % 2 ? 'border-l border-white/14' : ''} ${index > 1 ? 'border-t border-white/14 lg:border-t-0' : ''} ${index > 0 ? 'lg:border-l' : ''} ${entryMode === 'counter' && activeStage === index ? 'bg-[#123b6b]' : 'hover:bg-white/[.035]'}`}><span className="flex items-center justify-between"><span className="font-mono text-[9px] font-bold text-[#7eb0f5]">{number as string}</span><Icon className="h-4 w-4 text-[#83b4f4]" /></span><strong className="mt-10 block text-base">{title as string}</strong><span className="mt-3 block text-[12px] leading-5 text-white/54">{text as string}</span></button>; })}
                        </div>
                </div>
            </section>

            <section id="whatsappfall" className="scroll-mt-28 border-b border-[#d7e0e9] bg-white py-14 md:py-20">
                <div className="mx-auto max-w-[1320px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-10 lg:grid-cols-[.86fr_1.14fr] lg:items-center lg:gap-16">
                        <div className="grid gap-6 sm:grid-cols-[230px_1fr] sm:items-center">
                            <div className="mx-auto w-full max-w-[250px] border-[7px] border-[#122238] bg-[#e8efe9] shadow-[0_24px_55px_rgba(14,35,62,.2)]">
                                <div className="flex h-12 items-center bg-[#174f3d] px-3 text-white"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15"><MessageCircle className="h-3.5 w-3.5" /></span><span className="ml-2"><strong className="block text-[10px]">Dein Teilehändler</strong><span className="block text-[7px] text-white/65">WhatsApp</span></span></div>
                                <div className="space-y-2 p-3 text-[8px] leading-[1.45] text-[#34465a]">
                                    <div className="mr-4 bg-white p-2.5 shadow-sm"><strong>Bitte Sprache wählen</strong><br />1 Deutsch · 2 English<br />3 Türkçe · 4 Kurdî · 5 Polski</div>
                                    <div className="ml-12 bg-[#d8f1df] p-2">1</div>
                                    <div className="mr-5 bg-white p-2.5 shadow-sm">Schicken Sie mir bitte ein Foto Ihres Fahrzeugscheins.</div>
                                    <div className="ml-7 flex items-center gap-2 bg-[#d8f1df] p-2"><Camera className="h-3 w-3" /> Fahrzeugschein.jpg</div>
                                    <div className="mr-3 bg-white p-2.5 shadow-sm">Fahrzeugschein erkannt! Welches Teil benötigen Sie?</div>
                                    <div className="ml-8 bg-[#d8f1df] p-2">Ich brauche einen Ölfilter.</div>
                                </div>
                                <div className="flex h-9 items-center gap-2 border-t border-[#cbd6ce] bg-[#f7faf8] px-3 text-[#7a8880]"><Mic className="h-3 w-3" /><span className="text-[7px]">Nachricht schreiben</span></div>
                            </div>
                            <div className="border-l border-[#c8d5e2] pl-5"><span className="text-[9px] font-bold uppercase tracking-[.14em] text-[#16885b]">Aktuelle Botlogik</span><p className="mt-3 text-[12px] leading-5 text-[#647286]">Text, Foto und Sprachnachricht werden nicht zu einem zweiten System. Sie bilden denselben Anfragevorgang, den der Verkäufer auch an der Theke sieht.</p><div className="mt-5 flex flex-wrap gap-1.5">{['Deutsch', 'English', 'Türkçe', 'Kurdî', 'Polski'].map((language) => <span key={language} className="border border-[#b9c9d8] bg-[#f5f8fb] px-2 py-1 text-[8px] font-semibold text-[#536277]">{language}</span>)}</div></div>
                        </div>

                        <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#16885b]">Ein echter WhatsApp-Fall</span><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.25rem)] font-semibold leading-[1.04] tracking-[-.045em] text-[#111b2b]">Der Kunde schreibt, wie er spricht. Partsunion führt ihn bis zur passenden Auswahl.</h2><p className="mt-4 max-w-[650px] text-sm leading-6 text-[#627186]">Der Bot fragt Schritt für Schritt nur das ab, was für die Teilesuche benötigt wird. Der vollständige Verlauf landet samt Anhängen im gleichen Arbeitsvorrat wie ein Thekenfall.</p>
                            <div className="mt-7 border-y border-[#c6d2de]">
                                {[
                                    ['01', 'Sprache wählen', 'Deutsch, Englisch, Türkisch, Kurdisch oder Polnisch – der weitere Ablauf läuft in der gewählten Sprache.', Languages],
                                    ['02', 'Fahrzeug senden', 'Fahrzeugschein-Foto, VIN oder Fahrzeugdaten werden direkt am Kundenfall übernommen.', Camera],
                                    ['03', 'Teil einfach nennen', 'Text oder Sprachnachricht genügt. Bei Bedarf fragt Partsunion nach Position, Seite oder Achse.', Mic],
                                    ['04', 'Auswahl erhalten', 'Passende Marken, Preis, Verfügbarkeit und Lieferweg werden im Chat gezeigt und parallel im System bereitgestellt.', ShoppingCart],
                                ].map(([number, title, text, ItemIcon], index) => { const Icon = ItemIcon as typeof Inbox; return <button key={number as string} type="button" onClick={() => { setEntryMode('whatsapp'); setActiveStage(index); }} className={`grid w-full gap-3 py-4 text-left transition sm:grid-cols-[32px_36px_170px_1fr] sm:items-center ${index ? 'border-t border-[#d9e1e9]' : ''} ${entryMode === 'whatsapp' && activeStage === index ? 'bg-[#edf7f2]' : 'hover:bg-[#f6f9fb]'}`}><span className="font-mono text-[9px] font-bold text-[#16885b]">{number as string}</span><Icon className="h-4 w-4 text-[#16885b]" /><strong className="text-sm text-[#26364b]">{title as string}</strong><span className="text-[11px] leading-5 text-[#69778a]">{text as string}</span></button>; })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="system" className="scroll-mt-28 border-b border-[#d7e0e9] bg-[#edf2f7] py-14 md:py-20">
                <div className="mx-auto max-w-[1380px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-8 lg:grid-cols-[330px_1fr] lg:items-start lg:gap-12">
                        <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Beide Wege im aktuellen System</span><h2 className="mt-3 text-[clamp(1.9rem,2.8vw,2.8rem)] font-semibold leading-[1.06] tracking-[-.04em]">Zwei Eingänge. Ein Arbeitsvorrat.</h2><p className="mt-4 text-sm leading-6 text-[#627186]">WhatsApp-Anfragen und im Laden erfasste Fälle stehen zusammen in der Anfrage-Inbox. Kanal, Kunde, Fahrzeug, Teilebedarf, Zuständigkeit und Status bleiben trotzdem klar erkennbar.</p><div className="mt-6 flex gap-2">{([['inbox', 'Alle Anfragen'], ['dialog', 'WhatsApp-Dialog']] as const).map(([value, label]) => <button key={value} type="button" onClick={() => setSystemView(value)} className={`border px-3 py-2 text-[10px] font-semibold transition ${systemView === value ? 'border-[#1d6fe8] bg-[#1d6fe8] text-white' : 'border-[#b8c6d5] bg-white text-[#536278]'}`}>{label}</button>)}</div></div>
                        <div className="overflow-hidden border border-[#aebdce] bg-white shadow-[0_22px_55px_rgba(24,49,79,.14)]"><div className="flex h-11 items-center border-b border-[#cbd5e0] px-4"><Inbox className="h-4 w-4 text-[#1d6fe8]" /><span className="ml-2 text-[9px] font-semibold text-[#5c6b7e]">PARTSUNION · {systemView === 'inbox' ? 'ANFRAGE-INBOX' : 'KUNDENDIALOG'}</span><span className="ml-auto text-[8px] text-[#758294]">Originalansicht · Demo-Daten</span></div><div className="relative aspect-[1.72/1] overflow-hidden bg-[#e8edf3]"><Image src={systemView === 'inbox' ? '/product/anfrage-inbox.png' : '/product/whatsapp-vorgang.png'} alt={systemView === 'inbox' ? 'Partsunion Anfrage-Inbox mit WhatsApp- und manuellen Thekenanfragen' : 'Partsunion Kundendialog einer WhatsApp-Anfrage'} fill unoptimized className={`object-cover object-top transition-transform duration-500 ${systemView === 'inbox' ? 'scale-[1.25] origin-top-left' : 'scale-[1.45] origin-top-right'}`} sizes="(max-width: 1024px) 95vw, 68vw" /></div></div>
                    </div>
                </div>
            </section>

            <section id="uebergabe" className="scroll-mt-28 bg-white py-14 md:py-20">
                <div className="mx-auto max-w-[1240px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Ein Fall bleibt ein Fall</span><h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.05] tracking-[-.042em]">Nach der Antwort fängt die Arbeit nicht wieder von vorne an.</h2><p className="mt-4 max-w-[500px] text-sm leading-6 text-[#637186]">Fahrzeug, Teileprüfung und Angebot nutzen denselben bestätigten Stand. So verschwindet die Anfrage nicht im Chatverlauf, sobald der Kunde kaufen möchte.</p></div><div className="grid gap-0 border-y border-[#bdcad8] sm:grid-cols-[1fr_auto_1fr_auto_1fr]"><div className="p-5"><MessageCircle className="h-5 w-5 text-[#1d6fe8]" /><strong className="mt-4 block text-sm">Kundenanfrage</strong><span className="mt-2 block text-[11px] leading-5 text-[#69778a]">Text, Dokument und Kundenwunsch</span></div><ArrowRight className="hidden h-4 w-4 self-center text-[#83a0bf] sm:block" /><div className="border-t border-[#d5dde6] p-5 sm:border-t-0"><UserRoundCheck className="h-5 w-5 text-[#1d6fe8]" /><strong className="mt-4 block text-sm">Geprüfter Bedarf</strong><span className="mt-2 block text-[11px] leading-5 text-[#69778a]">Fahrzeug und Ausführung geklärt</span></div><ArrowRight className="hidden h-4 w-4 self-center text-[#83a0bf] sm:block" /><div className="border-t border-[#d5dde6] p-5 sm:border-t-0"><ShoppingCart className="h-5 w-5 text-[#1d6fe8]" /><strong className="mt-4 block text-sm">Angebot & Auftrag</strong><span className="mt-2 block text-[11px] leading-5 text-[#69778a]">Positionen ohne erneutes Abtippen</span></div></div></div>
                </div>
            </section>

            <div id="kontrolle" className="scroll-mt-28"><FlagshipSafety title="Wenn Angaben fehlen, übernimmt ein Mitarbeiter." text={page.controlText} /></div>
            <FlagshipCta eyebrow="Anfrage-Inbox im eigenen Ablauf" title="Zeig uns, wie Anfragen heute bei euch ankommen." text="Wir gehen gemeinsam einen echten Fall durch – vom ersten Kundenkontakt bis zum verkaufsfähigen Teilevorgang." buttonLabel="Anfrage-Ablauf besprechen" nextHref="/loesungen/oe-ermittlung" nextLabel="OE-Ermittlung" />
        </article>
    );
}
