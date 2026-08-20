'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowRight,
    ShoppingCart,
    Warehouse,
    Landmark,
    Check,
    FileText,
    ClipboardCheck,
    Truck,
    Receipt,
} from 'lucide-react';
import { workspaces } from '@/lib/platform-data';
import { WAWIPreview } from './WAWIPreview';
import { FinancePreview } from './FinancePreview';

/**
 * Modules — die drei Workspaces (Verkauf, Betrieb, Finanzen) als abwechselnde
 * Zick-Zack-Blöcke: Text mit 4 Kern-Capabilities auf der einen, ein Produkt-
 * Visual auf der anderen Seite. Ersetzt die früheren Sektionen
 * PlatformWorkspaces + TechTabs (inhaltliche Doppelung).
 *
 * Honesty: Capabilities kommen 1:1 aus lib/platform-data.ts (alle live).
 */

const moduleMeta = [
    {
        key: 'verkauf',
        icon: ShoppingCart,
        eyebrow: 'Verkauf & Auftragsabwicklung',
        headline: 'Vom Teilebedarf bis zur Rechnung — als durchgängiger Vorgang.',
        href: '/features/erp-autoteilehandel',
        linkLabel: 'Mehr zum Verkaufs-Workspace',
    },
    {
        key: 'lager',
        icon: Warehouse,
        eyebrow: 'Betrieb & Warenwirtschaft',
        headline: 'Bestandsgeführte Lagerprozesse vom Wareneingang bis zur Inventur.',
        href: '/features/warenwirtschaft-autoteilhandel',
        linkLabel: 'Mehr zur Warenwirtschaft',
    },
    {
        key: 'finanzen',
        icon: Landmark,
        eyebrow: 'Finanzen & Steuer',
        headline: 'Nachvollziehbare Finanzprozesse vom Beleg bis zum Export.',
        href: '/features/gobd-tse-zugferd-datev',
        linkLabel: 'Mehr zu Finanzen & Faktura',
    },
] as const;

/** Verkaufs-Visual: durchgängige Belegkette eines echten Vorgangs.
 *  Exportiert — wird auch auf /plattform wiederverwendet. */
export function SalesVisual() {
    const steps = [
        { icon: FileText, label: 'Angebot', sub: 'aus der Kundenanfrage', state: 'done' as const, time: '14:33' },
        { icon: ClipboardCheck, label: 'Auftrag #24871', sub: 'Kunde bestätigt — Bestand reserviert (ATP)', state: 'done' as const, time: '14:34' },
        { icon: Truck, label: 'Lieferschein', sub: 'kommissioniert, Label gedruckt', state: 'done' as const, time: '15:02' },
        { icon: Receipt, label: 'Rechnung', sub: 'Festschreibung · E-Rechnung vorbereitet', state: 'active' as const, time: '15:04' },
    ];
    return (
        <div className="w-full rounded-2xl overflow-hidden border border-border bg-card shadow-[var(--shadow-raised)]">
            <div className="px-5 py-4 border-b border-border bg-muted">
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground">VERKAUF · DEMO-VORGANG</div>
                <div className="text-lg font-semibold text-foreground mt-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                    Eine durchgängige Belegkette
                </div>
                <div className="font-mono text-[10px] text-muted-foreground/80 mt-0.5">KFZ Meier GmbH · Golf VII 1.6 TDI · ATE 13.0470-7280.2</div>
            </div>
            <ol className="px-5 py-4">
                {steps.map((s, i) => (
                    <li key={s.label} className="relative flex gap-4 pb-5 last:pb-0">
                        {i < steps.length - 1 && (
                            <span aria-hidden className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />
                        )}
                        <span
                            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                                s.state === 'active'
                                    ? 'border-primary/30 bg-accent text-primary'
                                    : 'border-border bg-muted text-success'
                            }`}
                        >
                            {s.state === 'done' ? <Check className="h-3.5 w-3.5" /> : <s.icon className="h-3.5 w-3.5" />}
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="flex items-baseline justify-between gap-2">
                                <span className="text-sm font-semibold text-foreground leading-tight">{s.label}</span>
                                <span className="font-mono text-[10px] text-muted-foreground tabular-nums shrink-0">{s.time}</span>
                            </span>
                            <span className="block text-xs text-muted-foreground leading-snug mt-0.5">{s.sub}</span>
                        </span>
                    </li>
                ))}
            </ol>
            <div className="px-5 py-3 border-t border-border bg-muted flex flex-wrap gap-2">
                {['Storno nur per Gutschrift', 'Kreditlimit geprüft', 'Altteilpfand USt-korrekt'].map((chip) => (
                    <span key={chip} className="rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                        {chip}
                    </span>
                ))}
            </div>
        </div>
    );
}

const visuals: Record<string, React.ReactNode> = {
    verkauf: <SalesVisual />,
    lager: <WAWIPreview />,
    finanzen: <FinancePreview />,
};

export function Modules() {
    return (
        <section id="plattform" aria-label="Die drei Workspaces" className="py-20 md:py-28 bg-muted/60 border-y border-border">
            <div className="container mx-auto px-4 md:px-6">
                {/* Sektions-Header — linksbündig */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mb-16 md:mb-20"
                >
                    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary mb-3">
                        Die Plattform
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                    >
                        Drei Workspaces. Eine Datenbasis.
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground">
                        Verkauf, Betrieb und Finanzen arbeiten auf gemeinsamen Stamm- und Bewegungsdaten.
                        Der Betrieb bündelt Beschaffung, Lager und Warenwirtschaft in einem Workspace.
                    </p>
                </motion.div>

                {/* Zick-Zack-Blöcke */}
                <div className="space-y-20 md:space-y-28">
                    {moduleMeta.map((meta, idx) => {
                        const ws = workspaces.find((w) => w.key === meta.key)!;
                        const caps = ws.capabilities.slice(0, 4);
                        const reversed = idx % 2 === 1;
                        return (
                            <motion.div
                                key={meta.key}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55 }}
                                viewport={{ once: true, margin: '-80px' }}
                                className="grid min-w-0 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                            >
                                {/* Text */}
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
                                    <ul className="space-y-4 mb-7">
                                        {caps.map((cap) => {
                                            const CapIcon = cap.icon;
                                            return (
                                                <li key={cap.label} className="flex gap-3.5">
                                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-card text-primary">
                                                        {CapIcon ? <CapIcon className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block text-[15px] font-medium text-foreground leading-tight">{cap.label}</span>
                                                        <span className="block text-sm text-muted-foreground leading-snug mt-0.5">{cap.detail}</span>
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
                                        {meta.linkLabel}
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                </div>

                                {/* Visual */}
                                <div className={`min-w-0 ${reversed ? 'lg:order-1' : ''}`}>
                                    {visuals[meta.key]}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
