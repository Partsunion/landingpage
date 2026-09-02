import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, ShieldCheck, type LucideIcon } from 'lucide-react';

type SolutionHeroProps = {
    icon: LucideIcon;
    eyebrow: string;
    title: string;
    description: string;
    highlight: string;
    primaryLabel: string;
    secondaryLabel: string;
    secondaryHref: string;
    proofItems: Array<{ title: string; text: string }>;
    children: ReactNode;
};

export function SolutionHero({ icon: Icon, eyebrow, title, description, highlight, primaryLabel, secondaryLabel, secondaryHref, proofItems, children }: SolutionHeroProps) {
    return (
        <section className="relative overflow-hidden border-b border-[#d5dfe9] bg-[linear-gradient(110deg,#ffffff_0%,#ffffff_43%,#edf4fb_43%,#f7faff_100%)]">
            <div className="pointer-events-none absolute inset-y-0 left-[43%] hidden w-px bg-[#dbe5ef] lg:block" />
            <div className="relative mx-auto grid max-w-[1480px] gap-10 px-5 py-12 md:px-8 md:py-16 lg:min-h-[720px] lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-12 xl:px-10">
                <header className="min-w-0">
                    <Link href="/loesungen" className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]"><span className="flex h-9 w-9 items-center justify-center border border-[#abc0da] bg-white"><Icon className="h-4 w-4" /></span>{eyebrow}</Link>
                    <h1 className="mt-5 max-w-[610px] text-[clamp(2.35rem,3.65vw,3.85rem)] font-semibold leading-[1.01] tracking-[-.048em] text-[#101a2b]">{title}</h1>
                    <p className="mt-5 max-w-[570px] text-[16px] leading-7 text-[#5e6c7f]">{description}</p>
                    <p className="mt-5 max-w-[570px] border-l-2 border-[#1d6fe8] pl-4 text-[13px] font-semibold leading-6 text-[#34465d]">{highlight}</p>

                    <div className="mt-6 grid max-w-[590px] grid-cols-3 border-y border-[#c8d4df] py-4">
                        {proofItems.slice(0, 3).map((item, index) => <div key={item.title} className={`min-w-0 px-3 first:pl-0 ${index > 0 ? 'border-l border-[#d1dae4]' : ''}`}><strong className="block text-[10px] font-semibold leading-4 text-[#155fc8]">{item.title}</strong><span className="mt-1 block text-[9px] leading-4 text-[#758294]">{item.text}</span></div>)}
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link href="/beratung" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#1d6fe8] px-6 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(29,111,232,.2)] transition hover:-translate-y-0.5 hover:bg-[#155fc8]">{primaryLabel}<ArrowUpRight className="h-4 w-4" /></Link>
                        <a href={secondaryHref} className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#b8c6d5] bg-white px-5 text-sm font-semibold text-[#34455b] transition hover:border-[#1d6fe8] hover:text-[#155fc8]">{secondaryLabel}<ArrowDown className="h-4 w-4" /></a>
                    </div>
                </header>

                <div className="min-w-0 lg:pl-2">{children}</div>
            </div>
        </section>
    );
}

export function FlagshipSubnav({ items }: { items: Array<{ label: string; href: string }> }) {
    return (
        <nav aria-label="Inhalte dieser Lösung" className="sticky top-[72px] z-30 hidden border-b border-[#d4dee8] bg-white/95 backdrop-blur md:block">
            <div className="mx-auto flex h-12 max-w-[1420px] items-center gap-7 px-8 xl:px-10">
                <span className="mr-auto text-[9px] font-bold uppercase tracking-[.14em] text-[#718094]">Auf dieser Seite</span>
                {items.map((item) => <a key={item.href} href={item.href} className="text-[11px] font-semibold text-[#526176] transition hover:text-[#155fc8]">{item.label}</a>)}
            </div>
        </nav>
    );
}

export function FlagshipSafety({ eyebrow = 'Kontrolle im Prozess', title, text }: { eyebrow?: string; title: string; text: string }) {
    return (
        <section className="border-y border-[#284f7a] bg-[#0b294e] py-10 text-white md:py-12">
            <div className="mx-auto grid max-w-[1220px] gap-5 px-5 md:grid-cols-[58px_260px_1fr] md:items-center md:px-8 xl:px-10">
                <span className="flex h-12 w-12 items-center justify-center border border-[#6798d4] bg-[#153d6c]"><ShieldCheck className="h-5 w-5 text-[#8bb8f7]" /></span>
                <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#8bb8f7]">{eyebrow}</span><h2 className="mt-2 text-xl font-semibold leading-tight tracking-[-.03em]">{title}</h2></div>
                <p className="max-w-[680px] text-sm leading-6 text-white/60">{text}</p>
            </div>
        </section>
    );
}

export function FlagshipCta({ eyebrow, title, text, buttonLabel, nextHref, nextLabel }: { eyebrow: string; title: string; text: string; buttonLabel: string; nextHref: string; nextLabel: string }) {
    return (
        <>
            <section className="bg-[#edf4fd] py-12 md:py-16">
                <div className="mx-auto grid max-w-[1220px] gap-7 px-5 md:grid-cols-[1fr_auto] md:items-center md:px-8 xl:px-10">
                    <div><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#1d6fe8]">{eyebrow}</span><h2 className="mt-3 max-w-[720px] text-[clamp(1.9rem,3vw,3rem)] font-semibold leading-[1.06] tracking-[-.04em] text-[#101a2b]">{title}</h2><p className="mt-3 max-w-[660px] text-sm leading-6 text-[#637186]">{text}</p></div>
                    <Link href="/beratung" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[#1d6fe8] px-6 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(29,111,232,.2)] transition hover:-translate-y-0.5 hover:bg-[#155fc8]">{buttonLabel}<ArrowUpRight className="h-4 w-4" /></Link>
                </div>
            </section>
            <Link href={nextHref} className="group flex min-h-20 items-center justify-center gap-3 border-t border-[#d2dce7] bg-white px-5 text-sm font-semibold text-[#33445b] transition hover:bg-[#f5f8fc] hover:text-[#155fc8]">Als Nächstes: {nextLabel}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
        </>
    );
}
