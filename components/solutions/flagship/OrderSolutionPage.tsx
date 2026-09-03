'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
    BadgeCheck,
    Check,
    CheckCircle2,
    CircleDollarSign,
    ClipboardCheck,
    FileCheck2,
    FileText,
    LayoutDashboard,
    MessageCircle,
    PackageCheck,
    ReceiptText,
    Send,
    ShieldAlert,
    ShoppingCart,
    Smartphone,
    UserRoundCheck,
    WalletCards,
} from 'lucide-react';
import { useHydrationSafeReducedMotion } from '@/components/motion/useHydrationSafeReducedMotion';
import type { SolutionPageData } from '@/lib/solutions-data';
import { FlagshipCta, FlagshipSafety, FlagshipSubnav, SolutionHero } from './FlagshipShared';
import { PhoneFrame } from '@/components/ui/PhoneFrame';

const salesStages = [
    { label: 'Anfrage', title: 'Geprüfte Anfrage übernommen', detail: 'Kunde, Fahrzeug, Teilebedarf, OE-Bezug, Preis und Verfügbarkeit stehen bereits am Vorgang.', status: 'Daten vollständig', icon: ClipboardCheck },
    { label: 'Angebot', title: 'Angebot automatisch erstellt', detail: 'Die bestätigte Teileauswahl wird mit Menge, Kondition und Lieferhinweis in ein fertiges Angebot überführt.', status: 'AN-2026-0912', icon: FileText },
    { label: 'WhatsApp', title: 'Angebot direkt zugestellt', detail: 'Der Kunde erhält sein Angebot im laufenden WhatsApp-Gespräch und kann dort direkt antworten.', status: 'Zugestellt', icon: Send },
    { label: 'Auftrag', title: 'Auftrag automatisch angelegt', detail: 'Kundenzusage und Positionen werden ohne erneute Eingabe in den Auftrag übernommen.', status: 'AU-2026-1048', icon: ShoppingCart },
    { label: 'Bezahlung', title: 'Zahlung im Chat gestartet', detail: 'Der Kunde erhält den Zahlungslink für die im Betrieb aktivierte Zahlungsart; der Status landet direkt am Auftrag.', status: 'Bezahlt', icon: WalletCards },
    { label: 'Rechnung', title: 'Rechnung automatisch erstellt', detail: 'Nach dem festgelegten Auslöser entsteht die Rechnung aus dem geprüften Auftragsstand.', status: 'RE-2026-0894', icon: ReceiptText },
] as const;

const systemViews = [
    { key: 'inquiry', label: 'Anfrage', image: '/product/whatsapp-vorgang.png', alt: 'Partsunion WhatsApp-Anfrage im echten Demosystem', focus: 'object-[72%_10%]', scale: 'scale-[1.32]' },
    { key: 'order', label: 'Auftrag', image: '/product/verkaufsauftrag.png', alt: 'Partsunion Verkaufsauftrag im echten Demosystem', focus: 'object-[71%_10%]', scale: 'scale-[1.26]' },
    { key: 'invoice', label: 'Rechnung', image: '/product/rechnungen.png', alt: 'Partsunion Rechnungsübersicht im echten Demosystem', focus: 'object-[48%_10%]', scale: 'scale-[1.12]' },
] as const;

type SystemView = (typeof systemViews)[number]['key'];

function FlowStatus({ active, setActive }: { active: number; setActive: (value: number) => void }) {
    const reducedMotion = useHydrationSafeReducedMotion();
    const stage = salesStages[active];
    const StageIcon = stage.icon;

    return (
        <div className="overflow-hidden border border-[#9fb4cc] bg-white shadow-[0_28px_70px_rgba(18,47,81,.16)]">
            <div className="flex min-h-12 items-center border-b border-[#c8d4df] bg-[#f6f8fa] px-4">
                <span className="flex h-7 w-7 items-center justify-center bg-[#e5effc] text-[#1d6fe8]"><LayoutDashboard className="h-3.5 w-3.5" /></span>
                <span className="ml-2.5"><strong className="block text-[10px] font-semibold text-[#26364b]">Verkauf · automatischer Ablauf</strong><span className="block text-[8px] text-[#758294]">Ein Vorgang vom Eingang bis zur Rechnung</span></span>
                <span className="ml-auto flex items-center gap-1.5 text-[8px] font-semibold text-[#24724a]"><span className="h-1.5 w-1.5 rounded-full bg-[#2c9b62]" />Ablauf aktiv</span>
            </div>

            <div className="grid grid-cols-3 border-b border-[#cbd6e1] bg-[#edf3f8] sm:grid-cols-6">
                {salesStages.map((item, index) => (
                    <button key={item.label} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={`relative min-h-12 border-r border-[#d2dce6] px-1.5 py-2 text-left transition last:border-r-0 ${active === index ? 'bg-[#1d6fe8] text-white' : index < active ? 'bg-[#e9f5ee] text-[#276d49]' : 'text-[#6f7d8f]'}`}>
                        <span className="block font-mono text-[7px] font-bold">0{index + 1}</span>
                        <span className="mt-0.5 block truncate text-[8px] font-semibold">{item.label}</span>
                        {index < active && <Check className="absolute right-1.5 top-2 h-2.5 w-2.5" />}
                    </button>
                ))}
            </div>

            <div className="grid min-h-[360px] md:grid-cols-[1.12fr_.88fr]">
                <div className="border-b border-[#ced8e2] bg-[#eef3f7] p-4 md:border-b-0 md:border-r sm:p-5">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={active} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reducedMotion ? 0 : .25 }}>
                            <div className="flex items-center justify-between gap-3">
                                <span className="flex h-10 w-10 items-center justify-center border border-[#98b8dd] bg-white text-[#1d6fe8]"><StageIcon className="h-5 w-5" /></span>
                                <span className={`px-2.5 py-1 text-[8px] font-bold ${active === 3 ? 'bg-[#ddf2e5] text-[#267149]' : 'bg-[#e2ecf9] text-[#155fc8]'}`}>{stage.status}</span>
                            </div>
                            <h3 className="mt-5 text-base font-semibold tracking-[-.025em] text-[#26364b]">{stage.title}</h3>
                            <p className="mt-2 min-h-12 text-[10px] leading-5 text-[#68778a]">{stage.detail}</p>
                            <dl className="mt-5 grid grid-cols-2 gap-px border border-[#c3cfdb] bg-[#c3cfdb] text-[8px]">
                                {[
                                    ['Kunde', 'KFZ Meyer e.K.'],
                                    ['Fahrzeug', 'BMW 320d F31'],
                                    ['Teilebedarf', 'Bremsscheiben vorne'],
                                    ['Gesamt', '329,80 €'],
                                ].map(([label, value]) => <div key={label} className="bg-white p-2.5"><dt className="text-[#798697]">{label}</dt><dd className="mt-1 truncate font-semibold text-[#34455a]">{value}</dd></div>)}
                            </dl>
                            <div className="mt-4 flex items-center gap-2 text-[9px] font-semibold text-[#267149]"><CheckCircle2 className="h-3.5 w-3.5" />Keine erneute Dateneingabe</div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="bg-[#e6eee8] p-4">
                    <PhoneFrame className="mx-auto max-w-[225px]" screenClassName="bg-[#e8efe9]">
                        <div className="flex h-10 items-center bg-[#164f3b] px-2.5 text-white"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15"><MessageCircle className="h-3 w-3" /></span><span className="ml-2"><strong className="block text-[8px]">Dein Teilehändler</strong><span className="block text-[6px] text-white/60">WhatsApp</span></span></div>
                        <div className="min-h-[246px] space-y-2 p-2.5 text-[7px] leading-[1.45] text-[#33455a]">
                            <div className="ml-7 bg-[#d7f0de] p-2">Ich brauche Bremsscheiben vorne für meinen BMW.</div>
                            {active >= 1 && <motion.div initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mr-3 bg-white p-2 shadow-sm"><strong>Angebot AN-2026-0912</strong><br />Bremsscheiben vorne · 329,80 €<br /><span className="text-[#1d6fe8]">Angebot ansehen</span></motion.div>}
                            {active >= 2 && <motion.div initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="ml-10 bg-[#d7f0de] p-2">Passt, nehme ich.</motion.div>}
                            {active >= 3 && <motion.div initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mr-5 border-l-2 border-[#1d6fe8] bg-white p-2 shadow-sm"><strong>Auftrag AU-2026-1048 angelegt</strong><br />Die Kundenzusage wurde übernommen.</motion.div>}
                            {active >= 4 && <motion.div initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mr-2 bg-white p-2 shadow-sm"><strong>So kannst du deine Bestellung bezahlen:</strong><br />Karte · PayPal · Überweisung<div className="mt-1.5 bg-[#1d6fe8] px-2 py-1.5 text-center font-semibold text-white">329,80 € sicher bezahlen</div><div className="mt-1.5 text-[#267149]">✓ Zahlung bestätigt</div></motion.div>}
                            {active >= 5 && <motion.div initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mr-2 bg-white p-2 shadow-sm"><strong>Rechnung RE-2026-0894</strong><br />wurde automatisch erstellt.</motion.div>}
                        </div>
                        <div className="flex h-8 items-center border-t border-[#ccd8cf] bg-white px-2.5 text-[6px] text-[#819087]">Nachricht schreiben</div>
                    </PhoneFrame>
                </div>
            </div>
        </div>
    );
}

export function OrderSolutionPage({ page }: { page: SolutionPageData }) {
    const reducedMotion = useHydrationSafeReducedMotion();
    const [active, setActive] = useState(0);
    const [systemView, setSystemView] = useState<SystemView>('inquiry');

    useEffect(() => {
        if (reducedMotion) return;
        const timer = window.setInterval(() => setActive((value) => (value + 1) % salesStages.length), 4600);
        return () => window.clearInterval(timer);
    }, [reducedMotion]);

    useEffect(() => {
        if (reducedMotion) return;
        const timer = window.setInterval(() => setSystemView((value) => value === 'inquiry' ? 'order' : value === 'order' ? 'invoice' : 'inquiry'), 5600);
        return () => window.clearInterval(timer);
    }, [reducedMotion]);

    const currentSystemView = systemViews.find((item) => item.key === systemView) ?? systemViews[0];

    return (
        <article className="bg-white pt-[72px] text-[#111b2b]">
            <SolutionHero
                icon={ShoppingCart}
                eyebrow="Angebot, Auftrag & Bezahlung"
                title="Aus der Anfrage wird automatisch ein bezahlter Auftrag."
                description="Alle bereits geklärten Daten gehen direkt ins Partsunion-Dashboard: Kunde, Fahrzeug, Teile, Preis und Verfügbarkeit. Partsunion erstellt das Angebot, führt den Kunden über WhatsApp zur Zahlung und übernimmt Zusage, Auftrag und Rechnung ohne erneutes Abtippen."
                highlight="Im eindeutigen Standardfall läuft der gesamte Verkaufsprozess ohne manuelles Eingreifen."
                primaryLabel="Verkaufsablauf live ansehen"
                secondaryLabel="Komplette Kette ansehen"
                secondaryHref="#ablauf"
                proofItems={[{ title: 'Direkt aus der Anfrage', text: 'alle Daten im Dashboard' }, { title: 'Zahlung per WhatsApp', text: 'über sicheren Zahlungslink' }, { title: 'Belege automatisch', text: 'Angebot, Auftrag, Rechnung' }]}
            >
                <FlowStatus active={active} setActive={setActive} />
            </SolutionHero>

            <FlagshipSubnav items={[{ label: 'Ablauf', href: '#ablauf' }, { label: 'WhatsApp-Zahlung', href: '#zahlung' }, { label: 'Im System', href: '#system' }, { label: 'Automatisierung', href: '#automatisierung' }, { label: 'Kontrolle', href: '#kontrolle' }]} />

            <section id="ablauf" className="scroll-mt-28 bg-[#0b294e] py-14 text-white md:py-20">
                <div className="mx-auto max-w-[1340px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-7 border-b border-white/18 pb-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
                        <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#8ab8f8]">Die Anfrage endet nicht beim Angebot</span><h2 className="mt-3 text-[clamp(2rem,3.15vw,3.2rem)] font-semibold leading-[1.04] tracking-[-.045em]">Vom Kundenwunsch bis zur Rechnung – ein automatischer Ablauf.</h2></div>
                        <p className="max-w-[670px] text-sm leading-6 text-white/60 lg:justify-self-end">Partsunion bildet den vollständigen normalen Verkaufsablauf ab. Der Unterschied: Informationen werden nicht mehrfach übertragen und eindeutige Folgeschritte laufen automatisch weiter.</p>
                    </div>
                    <div className="grid md:grid-cols-3 lg:grid-cols-6">
                        {salesStages.map((stage, index) => { const Icon = stage.icon; return <button key={stage.label} type="button" onClick={() => setActive(index)} className={`group min-h-[145px] border-b border-white/14 p-4 text-left transition md:min-h-[185px] md:border-r lg:min-h-[215px] lg:border-b-0 ${index >= 3 ? 'md:border-b-0' : ''} ${active === index ? 'bg-[#143d6c]' : 'hover:bg-white/[.035]'}`}><span className="flex items-center justify-between"><span className="font-mono text-[8px] font-bold text-[#82b2f5]">0{index + 1}</span><Icon className="h-4 w-4 text-[#86b5f5]" /></span><strong className="mt-5 block text-sm md:mt-8 lg:mt-10">{stage.label}</strong><span className="mt-2 block text-[10px] leading-5 text-white/48">{stage.detail}</span></button>; })}
                    </div>
                    <div className="flex flex-col gap-3 border-t border-white/18 pt-5 sm:flex-row sm:items-center sm:justify-between"><span className="text-[10px] text-white/50">Kunde · Fahrzeug · Teileauswahl · Kondition · Zahlung · Belege bleiben am selben Geschäftsvorgang.</span><span className="flex items-center gap-2 text-[10px] font-semibold text-[#92c0ff]"><CheckCircle2 className="h-3.5 w-3.5" />Keine stille Neuerfassung dazwischen</span></div>
                </div>
            </section>

            <section id="zahlung" className="scroll-mt-28 border-b border-[#d7e0e9] bg-white py-14 md:py-20">
                <div className="mx-auto grid max-w-[1260px] gap-10 px-5 md:px-8 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-16 xl:px-10">
                    <div className="grid gap-6 sm:grid-cols-[235px_1fr] sm:items-center">
                        <PhoneFrame className="mx-auto w-full max-w-[245px]" screenClassName="bg-[#e8efe9]">
                            <div className="flex h-12 items-center bg-[#174f3d] px-3 text-white"><MessageCircle className="h-4 w-4" /><span className="ml-2"><strong className="block text-[9px]">Dein Teilehändler</strong><span className="text-[7px] text-white/60">online</span></span></div>
                            <div className="space-y-2 p-3 text-[8px] leading-[1.5] text-[#34465a]">
                                <div className="mr-3 bg-white p-2.5 shadow-sm"><strong>Dein Angebot ist fertig.</strong><br />Bremsscheiben vorne<br />Gesamt: 329,80 €</div>
                                <div className="ml-12 bg-[#d8f1df] p-2">Ja, bitte bestellen.</div>
                                <div className="mr-2 bg-white p-2.5 shadow-sm"><strong>So kannst du deine Bestellung (329,80 €) bezahlen:</strong><br /><br />1. Karte / Apple Pay<br />2. PayPal<br />3. Überweisung<br /><br />Antworte einfach mit der Nummer deiner Wahl.</div>
                                <div className="ml-16 bg-[#d8f1df] p-2">1</div>
                                <div className="mr-2 bg-white p-2.5 shadow-sm"><strong>Zahlung abschließen</strong><div className="mt-2 bg-[#1d6fe8] px-2 py-2 text-center font-semibold text-white">Sicher bezahlen</div></div>
                                <div className="mr-7 border-l-2 border-[#2f9862] bg-white p-2.5 shadow-sm"><strong className="text-[#267149]">✓ Zahlung bestätigt</strong><br />Die Zahlung ist deinem Auftrag zugeordnet.</div>
                            </div>
                            <div className="flex h-9 items-center border-t border-[#cbd6ce] bg-[#f7faf8] px-3 text-[7px] text-[#7a8880]">Nachricht schreiben</div>
                        </PhoneFrame>
                        <div className="border-l border-[#c8d5e2] pl-5"><Smartphone className="h-5 w-5 text-[#16885b]" /><strong className="mt-4 block text-sm text-[#26364b]">Der Kunde bleibt in seinem gewohnten Kanal.</strong><p className="mt-2 text-[11px] leading-5 text-[#68778a]">Das Angebot, die Auswahl der Zahlungsart und der sichere Zahlungslink kommen direkt in den laufenden WhatsApp-Verlauf.</p></div>
                    </div>

                    <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#16885b]">Kaufen und bezahlen im selben Gespräch</span><h2 className="mt-3 text-[clamp(2rem,3.15vw,3.2rem)] font-semibold leading-[1.04] tracking-[-.045em]">Kein Medienbruch zwischen „nehme ich“ und Zahlung.</h2><p className="mt-4 max-w-[650px] text-sm leading-6 text-[#627186]">Nach der Angebotsfreigabe zeigt Partsunion die für den Betrieb aktivierten Zahlungsarten. Der Kunde startet die Zahlung über den sicheren Link direkt aus WhatsApp. Zahlungsreferenz und Status werden am Auftrag gespeichert und stehen im Dashboard bereit.</p>
                        <div className="mt-7 border-y border-[#c7d3df]">
                            {[
                                ['01', 'Angebot automatisch senden', 'Das fertige Angebot erreicht den Kunden im selben Gespräch, aus dem die Anfrage entstanden ist.'],
                                ['02', 'Zahlungsart auswählen', 'Der Kunde wählt nur aus den Zahlungsarten, die der Händler für diesen Ablauf aktiviert hat.'],
                                ['03', 'Sicher bezahlen', 'Die Zahlung wird über den angebundenen Zahlungsanbieter gestartet – direkt aus dem WhatsApp-Verlauf.'],
                                ['04', 'Status automatisch übernehmen', 'Bestätigung, Referenz und Zahlungsstand gehen direkt an den zugehörigen Auftrag.'],
                            ].map(([number, title, text], index) => <div key={number} className={`grid gap-2 py-4 sm:grid-cols-[34px_190px_1fr] ${index ? 'border-t border-[#d9e1e9]' : ''}`}><span className="font-mono text-[8px] font-bold text-[#16885b]">{number}</span><strong className="text-sm text-[#26364b]">{title}</strong><span className="text-[11px] leading-5 text-[#69778a]">{text}</span></div>)}
                        </div>
                    </div>
                </div>
            </section>

            <section id="system" className="scroll-mt-28 border-b border-[#d7e0e9] bg-[#eef3f7] py-14 md:py-20">
                <div className="mx-auto max-w-[1380px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-8 lg:grid-cols-[330px_1fr] lg:items-start lg:gap-12">
                        <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Ein Datenstand im aktuellen System</span><h2 className="mt-3 text-[clamp(1.95rem,2.9vw,2.9rem)] font-semibold leading-[1.06] tracking-[-.04em]">Was im Chat beginnt, ist direkt im Dashboard.</h2><p className="mt-4 text-sm leading-6 text-[#627186]">Kunde, Fahrzeug, OE-Nummer, Positionen und ursprünglicher Teilebedarf werden nicht nur als Nachricht abgelegt. Sie gehen in Angebot und Auftrag über; Rechnung und Zahlungsstatus schließen denselben Vorgang ab.</p><div className="mt-6 flex flex-wrap gap-2">{systemViews.map((view) => <button key={view.key} type="button" onClick={() => setSystemView(view.key)} aria-pressed={systemView === view.key} className={`border px-3 py-2 text-[10px] font-semibold transition ${systemView === view.key ? 'border-[#1d6fe8] bg-[#1d6fe8] text-white' : 'border-[#b8c6d5] bg-white text-[#536278]'}`}>{view.label}</button>)}</div><div className="mt-7 border-l-2 border-[#2e9660] pl-4"><strong className="block text-[11px] text-[#276f4a]">Automatische Übergabe</strong><span className="mt-1 block text-[10px] leading-5 text-[#6b7889]">Jeder Folgeschritt arbeitet mit dem bereits bestätigten Stand weiter.</span></div></div>
                        <div className="overflow-hidden border border-[#aebdce] bg-white shadow-[0_22px_55px_rgba(24,49,79,.14)]"><div className="flex h-11 items-center border-b border-[#cbd5e0] px-4"><LayoutDashboard className="h-4 w-4 text-[#1d6fe8]" /><span className="ml-2 text-[9px] font-semibold text-[#5c6b7e]">PARTSUNION · {currentSystemView.label.toUpperCase()}</span><span className="ml-auto text-[8px] text-[#758294]">Originalansicht · Demo-Daten</span></div><div className="relative aspect-[1.72/1] overflow-hidden bg-[#e8edf3]"><AnimatePresence mode="wait"><motion.div key={systemView} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .28 }} className="absolute inset-0"><Image src={currentSystemView.image} alt={currentSystemView.alt} fill unoptimized className={`object-cover ${currentSystemView.focus} ${currentSystemView.scale}`} sizes="(max-width: 1024px) 95vw, 68vw" /></motion.div></AnimatePresence></div></div>
                    </div>
                </div>
            </section>

            <section id="automatisierung" className="scroll-mt-28 bg-white py-14 md:py-20">
                <div className="mx-auto max-w-[1260px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
                        <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Ohne manuelles Eingreifen im Standardfall</span><h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.05] tracking-[-.043em]">Partsunion führt den Verkauf selbstständig weiter.</h2><p className="mt-4 max-w-[490px] text-sm leading-6 text-[#637186]">Sind Kunde, Fahrzeug, Teil, Preis und Verfügbarkeit eindeutig und die Automatisierung im Betrieb aktiviert, muss niemand Daten übertragen, Belege neu anlegen oder den Zahlungsstand aus dem Chat suchen.</p><div className="mt-6 flex items-start gap-3 bg-[#edf7f2] p-4 text-[11px] leading-5 text-[#34644e]"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" />Automatik heißt hier: derselbe geprüfte Geschäftsvorgang wird anhand festgelegter Auslöser weitergeführt.</div></div>
                        <ol className="border-y border-[#bdcad8]">
                            {[
                                ['Anfrage wird vollständig', 'Notwendige Rückfragen, Fahrzeug und Teileauswahl werden im bisherigen Ablauf geklärt.', UserRoundCheck],
                                ['Angebot entsteht und wird zugestellt', 'Positionen, Preise und Lieferhinweise gehen automatisch in das Kundenangebot.', FileCheck2],
                                ['Kundenzusage wird zum Auftrag', 'Die bestätigten Positionen werden ohne erneute Eingabe als Auftrag angelegt.', ShoppingCart],
                                ['Zahlung kommt am Auftrag an', 'Zahlungsart, Referenz und Status werden automatisch dem richtigen Auftrag zugeordnet.', CircleDollarSign],
                                ['Rechnung folgt dem Auslöser', 'Die Rechnung entsteht aus dem Auftragsstand, sobald die im Betrieb festgelegte Bedingung erfüllt ist.', ReceiptText],
                                ['Mitarbeiter sieht nur den Handlungsbedarf', 'Der normale Ablauf läuft durch. Nur fachliche oder kaufmännische Ausnahmefälle landen zur Bearbeitung.', ShieldAlert],
                            ].map(([title, text, ItemIcon], index) => { const Icon = ItemIcon as typeof PackageCheck; return <li key={title as string} className={`grid gap-3 py-5 sm:grid-cols-[42px_220px_1fr] sm:items-start ${index ? 'border-t border-[#d5dde6]' : ''}`}><span className="flex h-8 w-8 items-center justify-center border border-[#a9bfd7] bg-[#edf4fd] text-[#1d6fe8]"><Icon className="h-4 w-4" /></span><strong className="text-sm text-[#28394e]">{title as string}</strong><span className="text-[11px] leading-5 text-[#68778a]">{text as string}</span></li>; })}
                        </ol>
                    </div>
                </div>
            </section>

            <div id="kontrolle" className="scroll-mt-28"><FlagshipSafety eyebrow="Automatik mit klaren Ausnahmen" title="Der Standardfall läuft durch. Unklare Fälle werden sichtbar gestoppt." text={page.controlText} /></div>
            <FlagshipCta eyebrow="Deinen Verkaufsablauf durchspielen" title="Sieh dir an, wie aus einer Anfrage automatisch ein bezahlter Auftrag wird." text="Wir gehen den vollständigen Ablauf mit dir durch: Anfrage, Teileauswahl, Angebot, WhatsApp-Zahlung, Auftrag und automatische Rechnung – mit den Regeln deines Betriebs." buttonLabel="Verkaufsablauf besprechen" nextHref="/loesungen/einkauf-disposition" nextLabel="Einkauf & Disposition" />
        </article>
    );
}
