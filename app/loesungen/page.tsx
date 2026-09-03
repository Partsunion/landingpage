import type { Metadata } from 'next';
import Link from 'next/link';
import {
    ArrowRight,
    Bot,
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
import { solutionPages, type SolutionIcon } from '@/lib/solutions-data';

export const metadata: Metadata = {
    title: 'Lösungen für den Autoteilehandel',
    description: 'Von Anfrage und OE-Ermittlung über Warenwirtschaft, Einkauf, Retouren und Reklamationen bis Finanzen und Betriebsassistent: Partsunion verbindet den kompletten Prozess.',
    alternates: { canonical: '/loesungen' },
};

const icons: Record<SolutionIcon, LucideIcon> = {
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

const groups = ['Verkaufen', 'Ware bewegen', 'Betrieb führen'] as const;

export default function SolutionsOverview() {
    return (
        <div className="bg-white pt-[72px] text-[#111b2b]">
            <section className="border-b border-[#d9e2ec] bg-[#0b2548] py-14 text-white md:py-20">
                <div className="mx-auto max-w-[1320px] px-5 md:px-8 xl:px-10">
                    <span className="text-[9px] font-bold uppercase tracking-[.16em] text-[#8dbaf8]">Partsunion Lösungen</span>
                    <div className="mt-4 grid gap-6 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
                        <h1 className="max-w-[650px] text-[clamp(2.25rem,3.7vw,3.45rem)] font-semibold leading-[1.04] tracking-[-.044em]">Ein Prozess. Neun starke Arbeitsbereiche.</h1>
                        <p className="max-w-[650px] text-[16px] leading-7 text-white/62 lg:justify-self-end">Jede Lösung ist eigenständig nutzbar und arbeitet trotzdem auf demselben Kunden-, Artikel- und Belegkontext. Wähle den Bereich, den du genauer sehen möchtest.</p>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="mx-auto max-w-[1320px] space-y-12 px-5 md:px-8 xl:px-10">
                    {groups.map((group, groupIndex) => (
                        <div key={group} className="grid gap-5 lg:grid-cols-[220px_1fr]">
                            <div>
                                <span className="font-mono text-[9px] font-bold text-[#1d6fe8]">0{groupIndex + 1}</span>
                                <h2 className="mt-2 text-xl font-semibold tracking-[-.03em]">{group}</h2>
                                <p className="mt-2 max-w-[180px] text-[11px] leading-5 text-[#758294]">Drei Arbeitsbereiche auf demselben Datenstand.</p>
                            </div>
                            <div className="border border-[#c3cfdd] bg-white">
                                {solutionPages.filter((page) => page.group === group).map((page, index) => {
                                    const Icon = icons[page.icon];
                                    return (
                                        <Link
                                            href={`/loesungen/${page.slug}`}
                                            key={page.slug}
                                            className={`group grid grid-cols-[42px_1fr] gap-3 p-4 transition hover:bg-[#edf4fd] sm:grid-cols-[42px_160px_1fr_28px] sm:items-center md:p-5 ${index > 0 ? 'border-t border-[#d3dce5]' : ''}`}
                                        >
                                            <span className="flex h-9 w-9 items-center justify-center border border-[#a8bdd5] bg-[#f4f7fa] text-[#1d6fe8]"><Icon className="h-4 w-4" /></span>
                                            <span><h3 className="text-sm font-semibold tracking-[-.02em]">{page.navLabel}</h3><span className="mt-1 block text-[7px] font-bold uppercase tracking-[.1em] text-[#1d6fe8]">{page.eyebrow}</span></span>
                                            <p className="col-span-2 line-clamp-2 text-[11px] leading-5 text-[#687588] sm:col-span-1">{page.intro}</p>
                                            <ArrowRight className="hidden h-4 w-4 text-[#8a99aa] transition group-hover:translate-x-1 group-hover:text-[#1d6fe8] sm:block" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-t border-[#d7e0ea] bg-[#f5f8fc] py-12">
                <div className="mx-auto flex max-w-[1120px] flex-col gap-5 px-5 md:flex-row md:items-center md:justify-between md:px-8">
                    <div><h2 className="text-2xl font-semibold tracking-[-.035em]">Welcher Einstieg passt zu deinem Betrieb?</h2><p className="mt-2 text-sm text-[#697688]">Wir starten mit einem echten Ablauf – nicht mit einer Modulliste.</p></div>
                    <Link href="/beratung" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#1d6fe8] px-6 text-sm font-semibold text-white">Beratung vereinbaren <ArrowRight className="h-4 w-4" /></Link>
                </div>
            </section>
        </div>
    );
}
