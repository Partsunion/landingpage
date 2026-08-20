'use client';

/**
 * FinancePreview — Finanz-/Faktura-Panel für die Modul-Sektion der Homepage.
 *
 * Designsprache (gemeinsam mit WAWIPreview): kantenbündige Bänder mit
 * Hairline-Trennern, 2×2-KPI-Raster mit responsiven Werten, animierter
 * OP-Altersstruktur-Balken. Reine Funktionsdarstellung — keine echten Zahlen.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';
import { AnimatedNumber, fmtInt, fmtEur0 } from './AnimatedNumber';

type Kpi = {
    label: string;
    sub: string;
    accent?: 'warning' | 'ok';
    to?: number;
    fmt?: (n: number) => string;
    value?: string;
    trend?: { dir: 'up' | 'down'; text: string };
};

const kpis: Kpi[] = [
    { label: 'Offene Posten', to: 24180, fmt: fmtEur0, sub: '12 Rechnungen', trend: { dir: 'down', text: '−€3.400 diese Woche' } },
    { label: 'USt-Zahllast', to: 8940, fmt: fmtEur0, sub: 'Mai · §18 UStG', trend: { dir: 'up', text: 'centgenau verprobt' } },
    { label: 'Überfällig', to: 3, fmt: fmtInt, sub: 'Mahnstufe 1', accent: 'warning', trend: { dir: 'down', text: 'Mahnlauf vorbereitet' } },
    { label: 'DATEV-Export', value: 'OK', sub: 'EXTF · SKR04', accent: 'ok', trend: { dir: 'up', text: 'Stapel übergeben' } },
];

/** OP-Altersstruktur (illustrativ): bezahlt-Anteil, 0–30, 31–60, überfällig. */
const aging = [
    { label: 'aktuell', pct: 58, color: '#12B76A' },
    { label: '0–30 Tage', pct: 24, color: '#1D6FE8' },
    { label: '31–60 Tage', pct: 12, color: '#F79009' },
    { label: 'überfällig', pct: 6, color: '#F04438' },
];

const docs = [
    { no: 'RE-2026-00231', cust: 'Werkstatt Demir GmbH', net: '1.240,00 €', tag: 'ZUGFeRD', paid: true },
    { no: 'RE-2026-00230', cust: 'Auto-Service Kowalski', net: '480,00 €', tag: 'XRechnung', paid: false },
    { no: 'GS-2026-00014', cust: 'Kfz-Technik Yıldız', net: '−96,00 €', tag: 'Gutschrift', paid: true },
    { no: 'RE-2026-00228', cust: 'Theke · Barverkauf', net: '68,90 €', tag: 'TSE', paid: true },
];

function AgingBar() {
    const reduce = useReducedMotion();
    return (
        <div>
            <div className="flex h-2 w-full rounded-full overflow-hidden" style={{ background: '#EDF1F7' }}>
                {aging.map((seg, i) => (
                    <motion.div
                        key={seg.label}
                        className="h-full"
                        style={{ background: seg.color }}
                        initial={{ width: reduce ? `${seg.pct}%` : '0%' }}
                        whileInView={{ width: `${seg.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                {aging.map((seg) => (
                    <span key={seg.label} className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: seg.color }} aria-hidden />
                        {seg.label} · {seg.pct} %
                    </span>
                ))}
            </div>
        </div>
    );
}

export function FinancePreview() {
    return (
        <div className="w-full rounded-2xl overflow-hidden border border-border bg-card shadow-[var(--shadow-raised)]">
            {/* Kopfband */}
            <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border bg-muted">
                <div className="min-w-0">
                    <div className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">Finanzen · Faktura</div>
                    <h3 className="text-base font-semibold text-foreground leading-tight mt-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                        Rechnungsausgang
                    </h3>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    <ShieldCheck className="h-3 w-3 text-success" aria-hidden />
                    Demo · Festschreibung
                </span>
            </header>

            {/* KPI-Raster 2×2 */}
            <div className="grid grid-cols-2 border-b border-border">
                {kpis.map((kpi, i) => {
                    const valueColor = kpi.accent === 'warning' ? '#B54708' : kpi.accent === 'ok' ? '#067647' : undefined;
                    const TrendIcon = kpi.trend?.dir === 'up' ? ArrowUpRight : ArrowDownRight;
                    return (
                        <div
                            key={kpi.label}
                            className={`min-w-0 px-4 py-3.5 ${i >= 2 ? 'border-t border-border' : ''} ${i % 2 === 1 ? 'border-l border-border' : ''}`}
                        >
                            <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground truncate">
                                {kpi.label}
                            </div>
                            <div
                                className="font-mono tabular-nums font-semibold leading-none mt-1.5 text-[clamp(1.05rem,1.6vw,1.4rem)] truncate text-foreground"
                                style={valueColor ? { color: valueColor } : undefined}
                            >
                                {kpi.to !== undefined && kpi.fmt ? <AnimatedNumber to={kpi.to} fmt={kpi.fmt} /> : kpi.value}
                            </div>
                            <div className="flex items-center gap-1 mt-1.5 min-w-0">
                                <TrendIcon
                                    className="h-3 w-3 shrink-0"
                                    style={{ color: kpi.accent === 'warning' ? '#F79009' : '#12B76A' }}
                                    aria-hidden
                                />
                                <span className="text-[10px] text-muted-foreground truncate">{kpi.trend?.text ?? kpi.sub}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* OP-Altersstruktur */}
            <div className="px-5 pt-4 pb-4 border-b border-border">
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground mb-2.5">
                    Offene Posten · Altersstruktur
                </div>
                <AgingBar />
            </div>

            {/* Belegliste — volle Breite, Betrag + Format rechtsbündig */}
            <ul className="divide-y divide-border/70">
                {docs.map((d) => (
                    <li key={d.no} className="flex items-center gap-3 px-5 py-2.5 min-w-0">
                        <span
                            className="h-1.5 w-1.5 rounded-full shrink-0"
                            style={{ background: d.paid ? '#12B76A' : '#F79009' }}
                            aria-hidden
                        />
                        <div className="min-w-0 flex-1">
                            <div className="font-mono tabular-nums text-[11px] text-foreground truncate">{d.no}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{d.cust}</div>
                        </div>
                        <span
                            className="font-mono tabular-nums text-[12px] font-semibold shrink-0"
                            style={{ color: d.net.startsWith('−') ? '#D92D20' : undefined }}
                        >
                            {d.net}
                        </span>
                        <span className="hidden sm:inline-flex shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[9px]" style={{ background: 'rgba(29,111,232,0.10)', color: '#1D6FE8' }}>
                            {d.tag}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Fußband */}
            <footer className="flex items-center justify-between gap-3 px-5 py-3 border-t border-border bg-muted">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground truncate">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" aria-hidden />
                    E-Rechnung vorbereitet · USt-Prüfpfad
                </span>
                <span className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground">
                    DATEV-Export
                </span>
            </footer>
        </div>
    );
}
