import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowRight,
    ArrowUpRight,
    Bot,
    Boxes,
    Check,
    CircleDollarSign,
    Inbox,
    PackageSearch,
    RotateCcw,
    ScanLine,
    ShoppingCart,
    Smartphone,
    Warehouse,
    type LucideIcon,
} from 'lucide-react';
import { SolutionVisual } from './SolutionVisual';
import { AssistantSolutionPage } from './flagship/AssistantSolutionPage';
import { SolutionHero } from './flagship/FlagshipShared';
import { InquirySolutionPage } from './flagship/InquirySolutionPage';
import { OemSolutionPage } from './flagship/OemSolutionPage';
import { solutionStories } from '@/lib/solution-stories';
import { getSolutionPage, type SolutionIcon, type SolutionPageData } from '@/lib/solutions-data';

const iconMap: Record<SolutionIcon, LucideIcon> = {
    inbox: Inbox,
    scan: ScanLine,
    cart: ShoppingCart,
    procurement: PackageSearch,
    warehouse: Warehouse,
    returns: RotateCcw,
    finance: CircleDollarSign,
    assistant: Bot,
    mobile: Smartphone,
};

function GenericSolutionPage({ page }: { page: SolutionPageData }) {
    const Icon = iconMap[page.icon];
    const story = solutionStories[page.visual];
    const related = page.related.map(getSolutionPage).filter((item): item is SolutionPageData => Boolean(item));

    return (
        <article className="bg-white pt-[72px] text-[#111b2b]">
            <SolutionHero
                icon={Icon}
                eyebrow={page.navLabel}
                title={page.title}
                description={page.intro}
                highlight={page.promise}
                primaryLabel="Ablauf im Beratungsgespräch"
                secondaryLabel="So funktioniert es"
                secondaryHref="#alltag"
                proofItems={page.capabilities.slice(0, 3).map((item) => ({ title: item.title, text: item.text }))}
            >
                <SolutionVisual visual={page.visual} />
            </SolutionHero>

            <section id="alltag" className="scroll-mt-28 border-b border-[#dce3eb] bg-white py-14 md:py-20">
                <div className="mx-auto grid max-w-[1320px] gap-8 px-5 md:px-8 lg:grid-cols-[.66fr_1.34fr] lg:gap-14 xl:px-10">
                    <div>
                        <div className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">{story.situationEyebrow}</div>
                        <h2 className="mt-3 text-[clamp(1.9rem,2.8vw,2.8rem)] font-semibold leading-[1.08] tracking-[-.04em]">{story.situationTitle}</h2>
                        <p className="mt-4 max-w-[500px] text-sm leading-6 text-[#667386]">{story.situationIntro}</p>
                    </div>
                    <ol className="border-y border-[#bfcbd8]">
                        {story.situations.map((situation, index) => (
                            <li key={situation.title} className={`grid gap-2 py-5 sm:grid-cols-[92px_210px_1fr] sm:gap-5 ${index > 0 ? 'border-t border-[#d5dde6]' : ''}`}>
                                <span className="font-mono text-[8px] font-bold uppercase tracking-[.08em] text-[#1d6fe8]">0{index + 1} · {situation.moment}</span>
                                <h3 className="text-sm font-semibold leading-5 tracking-[-.02em]">{situation.title}</h3>
                                <p className="text-[11px] leading-5 text-[#6b788a]">{situation.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="border-b border-[#dce3eb] bg-[#f4f7fa] py-14 md:py-20">
                <div className="mx-auto max-w-[1320px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-7 lg:grid-cols-[340px_1fr] lg:gap-12">
                        <div><div className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Der Unterschied im Alltag</div><h2 className="mt-3 text-[clamp(1.9rem,2.8vw,2.75rem)] font-semibold leading-[1.08] tracking-[-.04em]">{story.comparisonTitle}</h2><p className="mt-4 text-sm leading-6 text-[#667386]">Nicht mehr Module um ihrer selbst willen – sondern weniger Übergaben, Rückfragen und doppelte Erfassung.</p></div>
                        <div className="grid overflow-hidden border border-[#c7d3e1] md:grid-cols-2">
                            <div className="bg-white p-5 md:p-7"><div className="text-[9px] font-bold uppercase tracking-[.13em] text-[#7b8797]">Ohne verbundenen Prozess</div><ul className="mt-5 space-y-4">{page.without.map((item, index) => <li key={item} className="flex gap-3 text-sm leading-5 text-[#596779]"><span className="font-mono text-[8px] font-bold text-[#a06b34]">0{index + 1}</span>{item}</li>)}</ul></div>
                            <div className="bg-[#0d2b57] p-5 text-white md:p-7"><div className="text-[9px] font-bold uppercase tracking-[.13em] text-[#8bb8f7]">Mit Partsunion</div><ul className="mt-5 space-y-4">{page.withPartsunion.map((item) => <li key={item} className="flex gap-3 text-sm leading-5 text-white/78"><span className="flex h-5 w-5 shrink-0 items-center justify-center border border-[#6c9fe5] bg-[#17427a]"><Check className="h-3 w-3" /></span>{item}</li>)}</ul></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-[#dce3eb] bg-white py-14 md:py-20">
                <div className="mx-auto max-w-[1320px] px-5 md:px-8 xl:px-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><div className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Vom Eingang bis zum Ergebnis</div><h2 className="mt-3 max-w-[690px] text-[clamp(1.9rem,2.8vw,2.75rem)] font-semibold leading-[1.08] tracking-[-.04em]">{story.workflowTitle}</h2></div><p className="max-w-[480px] text-sm leading-6 text-[#667386]">Jeder Schritt arbeitet mit dem bereits geprüften Stand weiter. Ursprung, Entscheidung und Verantwortung bleiben sichtbar.</p></div>
                    <ol className="relative mt-10 grid md:grid-cols-4">
                        <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-[#aabed5] md:block" />
                        {page.workflow.map((step, index) => <li key={step.number} className="relative border-b border-[#d4dde6] py-5 last:border-b-0 md:border-b-0 md:px-5 md:py-0 md:first:pl-0 md:last:pr-0"><span className={`relative z-10 flex h-11 w-11 items-center justify-center border font-mono text-[8px] font-bold ${index === page.workflow.length - 1 ? 'border-[#1d6fe8] bg-[#1d6fe8] text-white' : 'border-[#9fb5cc] bg-white text-[#1d6fe8]'}`}>{step.number}</span><h3 className="mt-4 text-sm font-semibold tracking-[-.02em]">{step.title}</h3><p className="mt-2 text-[11px] leading-5 text-[#687588]">{step.text}</p></li>)}
                    </ol>
                </div>
            </section>

            {page.screenshot && (
                <section className="overflow-hidden border-b border-[#dce3eb] bg-[#edf2f7] py-14 md:py-20">
                    <div className="mx-auto max-w-[1420px] px-5 md:px-8 xl:px-10">
                        <div className="grid gap-7 lg:grid-cols-[.48fr_1.52fr] lg:items-center lg:gap-10">
                            <div><div className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Aus dem Partsunion-System</div><h2 className="mt-3 text-[clamp(1.8rem,2.6vw,2.6rem)] font-semibold leading-[1.08] tracking-[-.04em]">Die echte Oberfläche hinter dem Ablauf.</h2><p className="mt-4 text-sm leading-6 text-[#667386]">Diese Ansicht stammt aus dem Partsunion-Demosystem. Im Beratungsgespräch zeigen wir nicht nur den Bildschirm, sondern den vollständigen Vorgang davor und danach.</p></div>
                            <div className="overflow-hidden border border-[#aebdce] bg-white shadow-[0_20px_50px_rgba(23,45,73,.14)]"><div className="flex h-10 items-center border-b border-[#cbd5e0] bg-white px-3"><Icon className="h-3.5 w-3.5 text-[#1d6fe8]" /><span className="ml-2 text-[8px] font-semibold text-[#647286]">PARTSUNION · DEMOSYSTEM</span><span className="ml-auto text-[7px] text-[#7b8795]">Originalansicht</span></div><Image src={page.screenshot} alt={page.screenshotAlt ?? ''} width={2400} height={1500} unoptimized className="h-auto w-full" /></div>
                        </div>
                    </div>
                </section>
            )}

            <section className="border-b border-[#dce3eb] bg-[#0d2b57] py-14 text-white md:py-20">
                <div className="mx-auto grid max-w-[1320px] gap-8 px-5 md:px-8 lg:grid-cols-[.62fr_1.38fr] lg:items-start xl:px-10">
                    <div><span className="flex h-10 w-10 items-center justify-center border border-[#6d9ee1] bg-[#17427a]"><Boxes className="h-4 w-4" /></span><h2 className="mt-4 max-w-[440px] text-[clamp(1.8rem,2.6vw,2.6rem)] font-semibold leading-[1.08] tracking-[-.04em]">{story.capabilityTitle}</h2></div>
                    <div className="border-y border-white/18">{page.capabilities.map((capability, index) => <div key={capability.title} className={`grid gap-2 py-4 sm:grid-cols-[32px_190px_1fr] sm:items-start ${index > 0 ? 'border-t border-white/14' : ''}`}><span className="font-mono text-[8px] font-bold text-[#78adf6]">0{index + 1}</span><h3 className="text-sm font-semibold">{capability.title}</h3><p className="text-xs leading-5 text-white/52">{capability.text}</p></div>)}</div>
                </div>
            </section>

            <section className="border-b border-[#dce3eb] bg-white py-14 md:py-20">
                <div className="mx-auto max-w-[1320px] px-5 md:px-8 xl:px-10">
                    <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:gap-14"><div><div className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Was im Betrieb ankommt</div><h2 className="mt-3 text-[clamp(1.85rem,2.6vw,2.55rem)] font-semibold leading-[1.08] tracking-[-.04em]">{story.outcomeTitle}</h2></div><div className="border-y border-[#bfcbd8]">{story.outcomes.map((outcome, index) => <div key={outcome.title} className={`grid gap-2 py-5 sm:grid-cols-[32px_190px_1fr] sm:gap-4 ${index > 0 ? 'border-t border-[#d5dde6]' : ''}`}><span className="font-mono text-[8px] font-bold text-[#1d6fe8]">0{index + 1}</span><h3 className="text-sm font-semibold">{outcome.title}</h3><p className="text-[11px] leading-5 text-[#667386]">{outcome.text}</p></div>)}</div></div>
                </div>
            </section>

            <section className="border-b border-[#dce3eb] bg-[#f4f7fa] py-12 md:py-16"><div className="mx-auto grid max-w-[1120px] gap-6 px-5 md:px-8 lg:grid-cols-[260px_1fr] lg:items-center xl:px-10"><div className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">Kontrolle bleibt im Prozess</div><div className="border-l-2 border-[#1d6fe8] pl-5"><h2 className="text-xl font-semibold tracking-[-.03em]">{page.controlTitle}</h2><p className="mt-2 text-sm leading-6 text-[#667386]">{page.controlText}</p></div></div></section>

            <section className="bg-white py-12 md:py-16"><div className="mx-auto max-w-[1320px] px-5 md:px-8 xl:px-10"><div className="flex items-center justify-between"><h2 className="text-xl font-semibold tracking-[-.03em]">Passende nächste Lösungen</h2><Link href="/loesungen" className="hidden items-center gap-2 text-sm font-semibold text-[#155fc8] sm:inline-flex">Alle Lösungen <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-6 border border-[#c8d4e1] bg-white md:grid md:grid-cols-3">{related.map((item, index) => { const RelatedIcon = iconMap[item.icon]; return <Link key={item.slug} href={`/loesungen/${item.slug}`} className={`group flex min-h-[128px] items-center gap-4 p-5 transition hover:bg-[#edf4fd] ${index > 0 ? 'border-t border-[#d3dce5] md:border-l md:border-t-0' : ''}`}><span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#abc0d9] bg-white text-[#1d6fe8]"><RelatedIcon className="h-4 w-4" /></span><span><strong className="text-sm">{item.navLabel}</strong><span className="mt-1 block text-[10px] leading-4 text-[#6a7789]">{item.eyebrow}</span></span><ArrowRight className="ml-auto h-4 w-4 text-[#8a99aa] transition group-hover:translate-x-1 group-hover:text-[#1d6fe8]" /></Link>; })}</div></div></section>

            <section className="border-t border-[#183b67] bg-[#071b35] py-12 text-white"><div className="mx-auto flex max-w-[1120px] flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-8 xl:px-10"><div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#85b4f6]">Passt das zu deinem Ablauf?</span><h2 className="mt-2 text-2xl font-semibold tracking-[-.035em]">Zeig uns einen echten Teilevorgang.</h2><p className="mt-2 text-sm text-white/48">Wir ordnen gemeinsam ein, wie Partsunion in deinem Betrieb arbeiten soll.</p></div><Link href="/beratung" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[#1d6fe8] px-6 text-sm font-semibold text-white transition hover:bg-[#2f7ff0]">Beratung vereinbaren <ArrowUpRight className="h-4 w-4" /></Link></div></section>
        </article>
    );
}

export function SolutionPage({ page }: { page: SolutionPageData }) {
    if (page.visual === 'inquiry') {
        return <InquirySolutionPage page={page} />;
    }

    if (page.visual === 'oem') {
        return <OemSolutionPage page={page} />;
    }

    if (page.visual === 'assistant') {
        return <AssistantSolutionPage page={page} />;
    }

    return <GenericSolutionPage page={page} />;
}
