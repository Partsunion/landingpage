'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    ArrowUpRight,
    Bot,
    Boxes,
    ChevronDown,
    Inbox,
    Landmark,
    Menu,
    PackageSearch,
    RotateCcw,
    ScanLine,
    ShoppingCart,
    Smartphone,
    X,
    type LucideIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useHydrationSafeReducedMotion } from '@/components/motion/useHydrationSafeReducedMotion';

type ModuleLink = { label: string; text: string; href: string; icon: LucideIcon };

const moduleGroups: Array<{ title: string; links: ModuleLink[] }> = [
    {
        title: 'Verkaufen',
        links: [
            { label: 'Anfrage', text: 'WhatsApp, Telefon und Theke', href: '/loesungen/anfragen-whatsapp', icon: Inbox },
            { label: 'OE-Ermittlung', text: 'Fahrzeug und Teileprüfung', href: '/loesungen/oe-ermittlung', icon: ScanLine },
            { label: 'Angebot & Auftrag', text: 'Vom Bedarf zum Beleg', href: '/loesungen/angebot-auftrag', icon: ShoppingCart },
        ],
    },
    {
        title: 'Ware bewegen',
        links: [
            { label: 'Einkauf & Disposition', text: 'Fehlmengen kontrolliert decken', href: '/loesungen/einkauf-disposition', icon: PackageSearch },
            { label: 'Bestand & Lager', text: 'Neuware und Einzelstücke', href: '/loesungen/bestand-lager', icon: Boxes },
            { label: 'Retouren', text: 'Mobil erfassen, geprüft bearbeiten', href: '/loesungen/retouren', icon: RotateCcw },
        ],
    },
    {
        title: 'Betrieb führen',
        links: [
            { label: 'Finanzen & Kasse', text: 'Rechnung, OP und Zahlung', href: '/loesungen/finanzen-kasse', icon: Landmark },
            { label: 'Betriebsassistent', text: 'Fragen, beraten und bearbeiten', href: '/loesungen/betriebsassistent', icon: Bot },
            { label: 'Händler-App', text: 'Codes, Fotos und Retoure', href: '/loesungen/haendler-app', icon: Smartphone },
        ],
    },
];

const directLinks = [
    { label: 'Plattform', href: '/plattform' },
    { label: 'Wissen', href: '/blog' },
    { label: 'Unternehmen', href: '/about' },
];

export function HomepageHeader() {
    const reducedMotion = useHydrationSafeReducedMotion();
    const [productOpen, setProductOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const closeAll = () => {
        setProductOpen(false);
        setMobileOpen(false);
    };

    useEffect(() => {
        const close = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeAll();
        };
        document.addEventListener('keydown', close);
        return () => document.removeEventListener('keydown', close);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 text-white">
            <div className="border-b border-white/10 bg-[#0b1b31]/98 shadow-[0_8px_30px_rgba(4,12,25,.18)] backdrop-blur-xl">
                <div className="mx-auto flex h-[72px] max-w-[1480px] items-center px-5 md:px-8 xl:px-10">
                    <Link href="/" onClick={closeAll} aria-label="Partsunion Startseite" className="shrink-0">
                        <Image src="/logo-wordmark.png" alt="Partsunion" width={426} height={126} priority className="h-7 w-auto brightness-0 invert" />
                    </Link>

                    <nav className="ml-14 hidden h-full items-center gap-1 xl:flex" aria-label="Hauptnavigation">
                        <div
                            className="flex h-full items-center"
                            onBlur={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget)) setProductOpen(false);
                            }}
                        >
                            <button type="button" onClick={() => setProductOpen((open) => !open)} className={`flex h-10 items-center gap-2 rounded-md px-3.5 text-sm font-semibold transition ${productOpen ? 'bg-white/10 text-white' : 'text-white/76 hover:bg-white/[.07] hover:text-white'}`} aria-haspopup="true" aria-expanded={productOpen}>
                                Lösungen <ChevronDown className={`h-3.5 w-3.5 transition-transform ${productOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {productOpen && (
                                    <motion.div
                                        initial={reducedMotion ? false : { opacity: 0, y: -7 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={reducedMotion ? undefined : { opacity: 0, y: -5 }}
                                        transition={{ duration: reducedMotion ? 0 : 0.18 }}
                                        className="absolute left-1/2 top-[72px] w-[980px] max-w-[calc(100vw-64px)] -translate-x-1/2 border border-[#c9d3df] bg-white text-[#152033] shadow-[0_24px_60px_rgba(6,18,36,.22)]"
                                    >
                                        <div className="p-6">
                                            <div className="mb-4 flex items-center justify-between border-b border-[#d7dee7] pb-4">
                                                <span><span className="text-[9px] font-bold uppercase tracking-[.14em] text-[#2376e5]">Lösungen</span><strong className="ml-3 text-sm font-semibold">Für den kompletten Prozess</strong></span>
                                                <Link href="/loesungen" onClick={closeAll} className="inline-flex items-center gap-2 text-xs font-semibold text-[#155fc8]">Alle Lösungen <ArrowRight className="h-3.5 w-3.5" /></Link>
                                            </div>
                                            <div className="grid grid-cols-3 gap-7">
                                                {moduleGroups.map((group) => (
                                                    <div key={group.title}>
                                                        <div className="mb-1 border-b border-[#d7dee7] pb-2.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#778191]">{group.title}</div>
                                                        {group.links.map((item) => {
                                                            const Icon = item.icon;
                                                            return (
                                                                <Link key={item.label} href={item.href} onClick={closeAll} className="group -mx-2 flex items-center gap-3 border-b border-[#edf0f4] px-2 py-3 transition last:border-b-0 hover:bg-[#f5f8fc]">
                                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border-l-2 border-[#78a9ea] text-[#1c6ed8] transition group-hover:border-[#1d6fe8] group-hover:bg-[#edf4fd]"><Icon className="h-4 w-4" /></span>
                                                                    <span><strong className="block text-sm font-semibold">{item.label}</strong><span className="mt-0.5 block text-[11px] text-[#7a8492]">{item.text}</span></span>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {directLinks.map((link) => <Link key={link.label} href={link.href} onClick={closeAll} className="rounded-md px-3.5 py-2.5 text-sm font-medium text-white/72 transition hover:bg-white/[.07] hover:text-white">{link.label}</Link>)}
                    </nav>

                    <div className="ml-auto hidden items-center gap-3 md:flex">
                        <a href="https://app.partsunion.de/auth" className="px-3 py-2 text-sm font-semibold text-white/72 transition hover:text-white">Login</a>
                        <Link href="/beratung" onClick={closeAll} className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#2f7df0] px-5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(22,100,218,.32)] transition hover:bg-[#428cf8]">
                            Beratung <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <Link data-mobile-consultation href="/beratung" onClick={closeAll} className="ml-auto inline-flex h-9 items-center justify-center rounded-md bg-[#2f7df0] px-3.5 text-xs font-semibold text-white md:hidden">Beratung</Link>
                    <button type="button" onClick={() => setMobileOpen((value) => !value)} className="ml-2 flex h-10 w-10 items-center justify-center rounded-md border border-white/18 bg-white/[.04] md:ml-4 xl:hidden" aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={mobileOpen}>
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                        transition={{ duration: reducedMotion ? 0 : 0.2 }}
                        className="max-h-[calc(100vh-72px)] overflow-y-auto border-b border-[#ccd6e3] bg-white text-[#162134] shadow-[0_24px_55px_rgba(4,15,31,.28)]"
                    >
                        <nav className="mx-auto max-w-[760px] px-5 py-5" aria-label="Mobile Navigation">
                            <div className="mb-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#6c7787]">Produktbereiche</div>
                            {moduleGroups.map((group) => (
                                <div key={group.title} className="border-t border-[#e1e6ed] py-4 first:border-t-0">
                                    <div className="mb-2 text-xs font-bold text-[#1c6ed8]">{group.title}</div>
                                    <div className="grid sm:grid-cols-2">
                                        {group.links.map((item) => {
                                            const Icon = item.icon;
                                            return <Link key={item.label} href={item.href} onClick={closeAll} className="flex items-center gap-3 py-2.5 text-sm font-semibold"><Icon className="h-4 w-4 text-[#2879e8]" />{item.label}<ArrowRight className="ml-auto h-3.5 w-3.5 text-[#8d96a3]" /></Link>;
                                        })}
                                    </div>
                                </div>
                            ))}
                            <div className="grid grid-cols-2 gap-x-6 border-t border-[#e1e6ed] py-4">
                                {directLinks.map((link) => <Link key={link.label} href={link.href} onClick={closeAll} className="flex items-center justify-between py-2.5 text-sm font-semibold">{link.label}<ChevronDown className="h-3.5 w-3.5 -rotate-90 text-[#8d96a3]" /></Link>)}
                            </div>
                            <div className="grid grid-cols-2 gap-2 border-t border-[#e1e6ed] pt-4">
                                <a href="https://app.partsunion.de/auth" className="inline-flex h-11 items-center justify-center rounded-md border border-[#cdd5df] text-sm font-semibold">Login</a>
                                <Link href="/beratung" onClick={closeAll} className="inline-flex h-11 items-center justify-center rounded-md bg-[#1d6fe8] px-3 text-sm font-semibold text-white">Beratung</Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
