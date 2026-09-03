import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Layers3, Store } from 'lucide-react';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { HeroFlow } from './HeroFlow';
import { ImplementationPath } from './ImplementationPath';
import {
    BusinessAssistantStory,
    MobileReturnsStory,
    ModuleDirectory,
    OrderSupplyStory,
    WhatsappOeStory,
} from './HomepageStories';
import { ProcessComparison } from './ProcessComparison';
import { ProductShowcase } from './ProductShowcase';

const faqs = [
    {
        question: 'Für welche Betriebe ist Partsunion gedacht?',
        answer: 'Für Autoteilehändler, Werkstattbetriebe sowie Filial- und Großhandelsbetriebe mit Neu-, Gebraucht- oder Mischsortiment – besonders dort, wo Teileprüfung, Verkauf, Lager und Belege heute auf mehrere Werkzeuge verteilt sind.',
    },
    {
        question: 'Wie beginnt die Einführung in unserem Betrieb?',
        answer: 'Wir starten mit einem echten Arbeitsprozess aus deinem Alltag. Daraus leiten wir ab, welche Arbeitsbereiche, Rollen und Daten zuerst vorbereitet werden sollten. Theke, Lager und Büro bekommen genau die Schritte, die sie für ihre Arbeit brauchen.',
    },
    {
        question: 'Entscheidet der Betriebsassistent selbst, welches Teil passt oder was bestellt wird?',
        answer: 'Nein. Er beantwortet Fragen aus den freigegebenen Betriebsdaten, empfiehlt den nächsten Schritt und kann die Bearbeitung vorbereiten. Änderungen an Aufträgen, Bestellungen oder Retouren werden erst nach sichtbarer Prüfung und Bestätigung ausgeführt.',
    },
    {
        question: 'Was passiert im Beratungsgespräch?',
        answer: 'In 30 Minuten gehen wir einen konkreten Ablauf aus deinem Betrieb durch – zum Beispiel eine Teileanfrage, eine Bestellung oder eine Retoure. Anschließend weißt du, welche Partsunion-Bereiche zu deinem Betrieb passen und welche nächsten Schritte sinnvoll sind.',
    },
];

const proofPoints = [
    { title: '56 Marken', text: 'in der Fahrzeugdatenbank', icon: Store },
    { title: 'Herstellerkataloge', text: 'Nutzungsrechte vorhanden', icon: BookOpenCheck },
    { title: 'Ein gemeinsames System', text: 'ERP, WaWi, Theke und Kasse', icon: Layers3 },
];

export function PartsunionHomepage() {
    return (
        <div className="overflow-clip bg-white text-[#111b2b]">
            <HeroFlow />

            <section className="border-b border-[#dbe2eb] bg-[#f7f9fc]">
                <div className="mx-auto grid max-w-[1420px] grid-cols-3 divide-x divide-[#dbe2eb] px-2 sm:px-5 md:px-8 xl:px-10">
                    {proofPoints.map((point, index) => { const Icon = point.icon; return <div key={point.title} className="flex min-w-0 items-start gap-2.5 px-2.5 py-3 sm:items-center sm:gap-3 sm:px-5 sm:py-4 md:py-5 lg:px-7"><span className="font-mono text-[7px] font-bold text-[#1d6fe8] sm:text-[8px]">0{index + 1}</span><Icon className="hidden h-4 w-4 shrink-0 text-[#54708f] sm:block" /><span className="min-w-0"><strong className="block text-[9px] font-semibold leading-4 sm:text-sm">{point.title}</strong><span className="mt-0.5 hidden text-[10px] leading-4 text-[#697586] sm:block md:text-[11px]">{point.text}</span></span></div>; })}
                </div>
            </section>

            <ProcessComparison />
            <BusinessAssistantStory />
            <WhatsappOeStory />
            <OrderSupplyStory />
            <MobileReturnsStory />

            <section id="produkt" className="scroll-mt-28 border-t border-[#dbe2eb] bg-[#f5f8fc] py-14 md:py-18">
                <div className="mx-auto max-w-[1420px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
                        <div><div className="text-[9px] font-bold uppercase tracking-[.16em] text-[#1c6dd8]">Echte Produktansichten</div><h2 className="mt-3 text-[clamp(2rem,3.1vw,3.05rem)] font-semibold leading-[1.07] tracking-[-.045em]">Das ist Partsunion im Tagesgeschäft.</h2></div>
                        <p className="max-w-2xl text-[15px] leading-7 text-[#5f6b7b] lg:justify-self-end">Verkaufsarbeitsplatz, Anfragen, Auftrag, Warenwirtschaft und Finanzen – direkt aus dem aktuellen Partsunion-Demosystem.</p>
                    </div>
                    <ProductShowcase />
                </div>
            </section>

            <ModuleDirectory />
            <ImplementationPath />

            <section className="border-t border-[#dbe2eb] bg-[#f7f9fc] py-14 md:py-16">
                <div className="mx-auto grid max-w-[1180px] gap-8 px-5 md:px-8 lg:grid-cols-[310px_1fr] xl:px-10">
                    <div><div className="text-[10px] font-bold uppercase tracking-[.15em] text-[#1c6dd8]">Kurz beantwortet</div><h2 className="mt-3 text-[32px] font-semibold leading-[1.1] tracking-[-.04em]">Fragen vor dem ersten Gespräch.</h2><p className="mt-3 text-sm leading-6 text-[#647183]">Oder direkt den eigenen Ablauf mit uns durchgehen.</p><Link href="/beratung" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#155fc8]">Beratung vereinbaren <ArrowRight className="h-4 w-4" /></Link></div>
                    <div className="border-t border-[#cfd8e3]">
                        {faqs.map((faq, index) => <details key={faq.question} className="group border-b border-[#cfd8e3] py-1"><summary className="flex cursor-pointer list-none items-center gap-4 py-4 text-sm font-semibold marker:hidden"><span className="font-mono text-[9px] font-bold text-[#1d6fe8]">0{index + 1}</span>{faq.question}<span className="ml-auto text-xl font-light text-[#778291] transition group-open:rotate-45">+</span></summary><p className="pb-5 pl-8 text-sm leading-6 text-[#647183]">{faq.answer}</p></details>)}
                    </div>
                </div>
            </section>

            <FinalCTA />
        </div>
    );
}
