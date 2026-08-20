'use client';

/**
 * /plattform — die Detailseite zur Plattform-Architektur.
 *
 * Erzählbogen: Hero (Kennzahlen) → Architektur-Diagramm (Kanäle → Datenbasis →
 * Workspaces → Ausgänge) → drei Workspaces in voller Tiefe (alle Capabilities)
 * → digitaler Auftragseingang → Auswertungen & Portal → Compliance & Sicherheit →
 * Anbindungen (Roadmap, ehrlich markiert) → CTA.
 *
 * Honesty: alle Inhalte kommen aus lib/platform-data.ts (live, außer als
 * Roadmap markiert). Keine erfundenen Kundenzahlen.
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowRight,
    ArrowDown,
    ArrowUpRight,
    Inbox,
    MessageCircle,
    ScanLine,
    Globe2,
    Database,
    ShoppingCart,
    Warehouse,
    Landmark,
    Check,
    LineChart,
    Truck,
} from 'lucide-react';
import {
    workspaces,
    platformStats,
    botCapabilities,
    complianceItems,
    securityItems,
    analyticsHighlights,
    portalFeatures,
} from '@/lib/platform-data';
import { SalesVisual } from '@/components/landing/Modules';
import { WAWIPreview } from '@/components/landing/WAWIPreview';
import { FinancePreview } from '@/components/landing/FinancePreview';
import { WhatsAppPreview } from '@/components/landing/WhatsAppPreview';

// ─── Meta je Workspace (Reihenfolge = Seitenreihenfolge) ────────────────────

const workspaceMeta = [
    {
        key: 'verkauf' as const,
        icon: ShoppingCart,
        eyebrow: 'Workspace 1 · Verkauf',
        headline: 'Vom Teilebedarf bis zur Rechnung — als durchgängiger Vorgang.',
        href: '/features/erp-autoteilehandel',
        visual: <SalesVisual />,
    },
    {
        key: 'lager' as const,
        icon: Warehouse,
        eyebrow: 'Workspace 2 · Betrieb & Warenwirtschaft',
        headline: 'Bestandsgeführte Lagerprozesse vom Wareneingang bis zur Inventur.',
        href: '/features/warenwirtschaft-autoteilhandel',
        visual: <WAWIPreview />,
    },
    {
        key: 'finanzen' as const,
        icon: Landmark,
        eyebrow: 'Workspace 3 · Finanzen & Steuer',
        headline: 'Nachvollziehbare Finanzprozesse vom Beleg bis zum Export.',
        href: '/features/gobd-tse-zugferd-datev',
        visual: <FinancePreview />,
    },
];

const standards = ['GoBD', 'TSE', 'DSFinV-K', 'ZUGFeRD', 'XRechnung', 'DATEV', 'Intrastat', 'SEPA', 'MT940'];

// ─── Architektur-Diagramm ────────────────────────────────────────────────────

function DiagramChip({ icon: Icon, label, sub }: { icon: React.ElementType; label: string; sub: string }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card shadow-[var(--shadow-card)] px-4 py-3 min-w-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-accent text-primary">
                <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
                <span className="block text-sm font-semibold text-foreground leading-tight truncate">{label}</span>
                <span className="block text-[11px] text-muted-foreground leading-tight truncate">{sub}</span>
            </span>
        </div>
    );
}

function FlowArrow() {
    return (
        <div className="flex justify-center py-2" aria-hidden>
            <ArrowDown className="h-4 w-4 text-border-hover" />
        </div>
    );
}

function ArchitectureDiagram() {
    return (
        <div className="max-w-3xl mx-auto">
            {/* Eingangskanäle */}
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground mb-3">
                Eingangskanäle
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
                <DiagramChip icon={MessageCircle} label="Digitale Anfragen" sub="WhatsApp · E-Mail · Portal" />
                <DiagramChip icon={ScanLine} label="Theken-POS" sub="Verkauf & vorbereiteter TSE-Pfad" />
                <DiagramChip icon={Globe2} label="B2B-Kundenportal" sub="Pilot · Freischaltung im Onboarding" />
            </div>

            <FlowArrow />

            {/* Datenbasis */}
            <div className="rounded-2xl border border-primary/25 bg-accent px-6 py-5 text-center shadow-[var(--shadow-card)]">
                <div className="inline-flex items-center gap-2 mb-1">
                    <Database className="h-4 w-4 text-primary" aria-hidden />
                    <span className="text-sm font-semibold text-foreground">Eine gemeinsame Datenbasis</span>
                </div>
                <p className="text-xs text-muted-foreground">
                    Artikel · Kunden · Bestände · Belege · Preise — jede Änderung sofort überall sichtbar,
                    mandanten-isoliert und revisionssicher.
                </p>
            </div>

            <FlowArrow />

            {/* Workspaces */}
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground mb-3">
                Drei Workspaces
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
                <DiagramChip icon={ShoppingCart} label="Verkauf" sub="POS · Inbox · CRM · Belege" />
                <DiagramChip icon={Warehouse} label="Betrieb" sub="Einkauf · Lager · Warenwirtschaft" />
                <DiagramChip icon={Landmark} label="Finanzen" sub="Faktura · USt · OP · Kasse" />
            </div>

            <FlowArrow />

            {/* Ausgänge */}
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground mb-3">
                Ausgänge
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
                <DiagramChip icon={Landmark} label="DATEV & E-Rechnung" sub="vorbereitete EXTF- und E-Rechnungspfade" />
                <DiagramChip icon={LineChart} label="40+ Auswertungen" sub="aus echten Belegen" />
                <DiagramChip icon={Truck} label="Großhändler" sub="Konnektoren in Entwicklung" />
            </div>
        </div>
    );
}

// ─── Seite ───────────────────────────────────────────────────────────────────

export function PlattformSections() {
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden bg-background pt-32 pb-14 md:pt-40 md:pb-16">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(29,111,232,0.07),transparent_55%)] -z-10" />
                <div className="absolute inset-x-0 top-0 h-[420px] grid-pattern opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)] -z-10" />
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary mb-4">
                            Die Plattform
                        </p>
                        <h1
                            className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.08] text-foreground mb-6"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
                        >
                            Ein System für den ganzen Teilehandel — im Detail.
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                            Partsunion führt Teileidentifikation, Verkauf, Einkauf, Lager und Finanzen
                            auf einer Datenbasis zusammen. Jeder Vorgang bleibt vom ersten Bedarf bis
                            zu Lieferung, Rechnung und DATEV-Export nachvollziehbar.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Link
                                href="/#beratung"
                                className="group inline-flex items-center justify-center h-13 px-7 rounded-xl text-base font-medium text-primary-foreground bg-primary hover:bg-primary-hover shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] transition-colors"
                            >
                                Beratungstermin sichern
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/vergleich"
                                className="group inline-flex items-center justify-center gap-2 h-13 px-6 rounded-xl border border-border bg-card text-base font-medium text-foreground hover:border-border-hover hover:bg-muted transition-colors"
                            >
                                <ArrowUpRight className="h-5 w-5 text-primary" />
                                ERP vergleichen
                            </Link>
                        </div>
                    </motion.div>

                    {/* Kennzahlen-Band */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="mt-12 md:mt-14 grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden"
                    >
                        {platformStats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`px-5 py-4 min-w-0 ${i % 2 === 1 ? 'border-l border-border' : ''} ${i >= 2 ? 'border-t lg:border-t-0 border-border' : ''} ${i === 2 ? 'lg:border-l' : ''} ${i === 3 ? 'lg:border-l' : ''}`}
                            >
                                <div className="font-mono tabular-nums text-xl md:text-2xl font-semibold text-foreground truncate">
                                    {stat.value}
                                </div>
                                <div className="text-[11px] text-muted-foreground leading-snug mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Architektur */}
            <section aria-label="Plattform-Architektur" className="py-16 md:py-24 bg-muted/60 border-y border-border">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mb-10 md:mb-14"
                    >
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary mb-3">
                            Architektur
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                        >
                            Alles fließt durch eine Datenbasis.
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground">
                            Egal ob eine Anfrage digital eingeht, an der Theke verkauft oder im Portal
                            bestellt wird — es entsteht derselbe Vorgang im selben System. Kein Abtippen,
                            keine Insellösungen, keine doppelten Stammdaten.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <ArchitectureDiagram />
                    </motion.div>
                </div>
            </section>

            {/* Workspaces in voller Tiefe */}
            <section aria-label="Die drei Workspaces im Detail" className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mb-14 md:mb-20"
                    >
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary mb-3">
                            Die Workspaces
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                        >
                            Drei Arbeitsbereiche, jede Funktion am richtigen Ort.
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground">
                            Jeder Workspace bündelt die Aufgaben eines Fachbereichs; zusammen bilden sie
                            das ERP für Ihren Teilehandel. Pilot- und Roadmap-Umfänge sind ausdrücklich markiert.
                        </p>
                    </motion.div>

                    <div className="space-y-20 md:space-y-28">
                        {workspaceMeta.map((meta, idx) => {
                            const ws = workspaces.find((w) => w.key === meta.key)!;
                            const reversed = idx % 2 === 1;
                            return (
                                <motion.div
                                    key={meta.key}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.55 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    className="grid min-w-0 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
                                >
                                    <div className={`min-w-0 ${reversed ? 'lg:order-2' : ''}`}>
                                        <div className="flex items-center gap-2.5 mb-4">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-accent text-primary">
                                                <meta.icon className="h-4 w-4" />
                                            </span>
                                            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary">
                                                {meta.eyebrow}
                                            </span>
                                        </div>
                                        <h3
                                            className="text-2xl md:text-3xl font-semibold text-foreground mb-3"
                                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                                        >
                                            {meta.headline}
                                        </h3>
                                        <p className="text-base text-muted-foreground leading-relaxed mb-7">
                                            {ws.tagline}
                                        </p>
                                        {/* ALLE Capabilities — 2-spaltig */}
                                        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-6">
                                            {ws.capabilities.map((cap) => {
                                                const CapIcon = cap.icon;
                                                return (
                                                    <li key={cap.label} className="flex gap-3">
                                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-card text-primary">
                                                            {CapIcon ? <CapIcon className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                                                        </span>
                                                        <span className="min-w-0">
                                                            <span className="block text-sm font-medium text-foreground leading-tight">{cap.label}</span>
                                                            <span className="block text-xs text-muted-foreground leading-snug mt-0.5">{cap.detail}</span>
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        <p className="text-xs text-muted-foreground leading-relaxed mb-5 max-w-md">
                                            <span className="font-medium text-primary">+ </span>{ws.depth}
                                        </p>
                                        <Link
                                            href={meta.href}
                                            className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                                        >
                                            Zur Feature-Seite
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                        </Link>
                                    </div>
                                    <div className={`min-w-0 ${reversed ? 'lg:order-1' : ''} lg:sticky lg:top-28`}>
                                        {meta.visual}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Digitaler Auftragseingang */}
            <section aria-label="Digitaler Auftragseingang" className="py-16 md:py-24 bg-muted/60 border-y border-border">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-2.5 mb-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-accent text-primary">
                                    <Inbox className="h-4 w-4" />
                                </span>
                                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary">
                                    Optionale Kanalautomatisierung
                                </span>
                            </div>
                            <h2
                                className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
                                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                            >
                                Anfragen werden zu strukturierten Vorgängen.
                            </h2>
                            <p className="text-base md:text-lg text-muted-foreground mb-8">
                                Digitale Anfragen können Fahrzeug, Teil und OEM-Nummer vorstrukturieren.
                                Unsichere Zuordnungen landen mit ihrem vollständigen Kontext im
                                Arbeitsvorrat eines Mitarbeiters — die Fachentscheidung bleibt sichtbar.
                            </p>
                            <ul className="space-y-4">
                                {botCapabilities.map((cap) => {
                                    const Icon = cap.icon;
                                    return (
                                        <li key={cap.label} className="flex gap-3.5">
                                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary/15 bg-accent text-primary">
                                                <Icon className="h-3.5 w-3.5" />
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block text-[15px] font-medium text-foreground leading-tight">{cap.label}</span>
                                                <span className="block text-sm text-muted-foreground leading-snug mt-0.5">{cap.detail}</span>
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                            <Link
                                href="/features/whatsapp-bot"
                                className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                            >
                                Digitale Anfragebearbeitung im Detail
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="mx-auto max-w-[400px]">
                                <WhatsAppPreview />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Auswertungen & Portal */}
            <section aria-label="Auswertungen und Kundenportal" className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mb-10 md:mb-14"
                    >
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary mb-3">
                            Auswertungen &amp; Self-Service
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                        >
                            Geschäft steuern, Kunden digital anbinden.
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {/* BI-Karte — alle 5 Highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45 }}
                            viewport={{ once: true }}
                            className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6 md:p-8"
                        >
                            <div className="flex items-center gap-2.5 mb-5">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-accent text-primary">
                                    <LineChart className="h-4 w-4" />
                                </span>
                                <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                                    40+ datengetriebene Auswertungen
                                </h3>
                            </div>
                            <ul className="space-y-3.5">
                                {analyticsHighlights.map((a) => (
                                    <li key={a.label} className="flex gap-2.5">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                                        <span className="min-w-0">
                                            <span className="block text-sm font-medium text-foreground leading-tight">{a.label}</span>
                                            <span className="block text-xs text-muted-foreground leading-snug mt-0.5">{a.detail}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
                                Jede Kennzahl rechnet aus Ihren echten Belegen — wo keine Daten vorliegen,
                                steht „—“ statt einer erfundenen Zahl.
                            </p>
                        </motion.div>

                        {/* Portal-Karte — alle 4 Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.08 }}
                            viewport={{ once: true }}
                            className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6 md:p-8"
                        >
                            <div className="flex items-center justify-between gap-3 mb-5">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-accent text-primary">
                                        <Globe2 className="h-4 w-4" />
                                    </span>
                                    <h3 className="text-lg font-semibold text-foreground truncate" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                                        White-Label B2B-Portal
                                    </h3>
                                </div>
                                <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-primary/25 bg-accent px-2.5 py-0.5 text-[11px] font-medium text-primary">
                                    <ArrowUpRight className="h-3 w-3" />
                                    Pilot
                                </span>
                            </div>
                            <ul className="space-y-3.5">
                                {portalFeatures.map((p) => {
                                    const Icon = p.icon;
                                    return (
                                        <li key={p.label} className="flex gap-2.5">
                                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-primary/15 bg-accent">
                                                <Icon className="h-3 w-3 text-primary" />
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block text-sm font-medium text-foreground leading-tight">{p.label}</span>
                                                <span className="block text-xs text-muted-foreground leading-snug mt-0.5">{p.detail}</span>
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                            <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
                                Portal-Bestellungen sind unverbindliche Anfragen und buchen keinen Bestand —
                                Sie behalten die Freigabe.
                            </p>
                            <Link
                                href="/features/b2b-kundenportal-white-label"
                                className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                            >
                                Mehr zum Kundenportal
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Compliance & Sicherheit — volle Breite */}
            <section aria-label="Compliance und Sicherheit" className="py-16 md:py-24 bg-muted/60 border-y border-border">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mb-10 md:mb-14"
                    >
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary mb-3">
                            Für sichere und prüfbare Abläufe
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                        >
                            Vorbereitete DACH-Compliance-Pfade.
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground">
                            Die Kernbausteine sind technisch umgesetzt. Steuerliche Freigaben und
                            externe Validierungen erfolgen passend zum Einsatz des Händlers.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {complianceItems.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                                    viewport={{ once: true }}
                                    className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] p-5"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 bg-accent text-primary mb-4">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-base font-semibold text-foreground mb-1.5" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Sicherheit + Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="mt-8 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6 md:p-8"
                    >
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 mb-6">
                            {securityItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.label} className="flex gap-3">
                                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary/15 bg-accent text-primary">
                                            <Icon className="h-3.5 w-3.5" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-sm font-medium text-foreground leading-tight">{item.label}</span>
                                            <span className="block text-xs text-muted-foreground leading-snug mt-0.5">{item.detail}</span>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-5">
                            {standards.map((s) => (
                                <span
                                    key={s}
                                    className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                                    style={{ fontFamily: 'var(--font-mono)' }}
                                >
                                    {s}
                                </span>
                            ))}
                            <span className="text-[11px] text-muted-foreground ml-1">
                                TLS-verschlüsselt · Zugangsdaten at rest verschlüsselt · EU-Hosting
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Abschluss-CTA */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-3xl gradient-deep px-6 py-14 md:px-16 md:py-16 text-center shadow-[0_24px_48px_-16px_rgba(18,63,143,0.45)]"
                    >
                        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.13),transparent_55%)]" />
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2
                                className="text-3xl md:text-4xl font-semibold mb-5 text-white"
                                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                            >
                                Sehen Sie die Plattform mit Ihren eigenen Daten.
                            </h2>
                            <p className="text-blue-100/90 text-base md:text-lg mb-9">
                                30-Minuten-Termin: Wir zeigen Ihnen jeden Workspace live — an Ihren
                                echten Fahrzeugen und Teilen.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/#beratung"
                                    className="group inline-flex items-center justify-center h-13 px-7 rounded-xl bg-white text-primary text-base font-semibold hover:bg-blue-50 transition-colors shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]"
                                >
                                    Beratungstermin sichern
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    href="/features"
                                    className="inline-flex items-center justify-center gap-2 h-13 px-6 rounded-xl border border-white/30 text-base font-medium text-white hover:bg-white/10 transition-colors"
                                >
                                    Alle Features ansehen
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
