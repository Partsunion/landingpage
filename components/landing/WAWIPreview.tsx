'use client';

/**
 * WAWIPreview — Lager-/WaWi-Panel für die Modul-Sektion der Homepage.
 *
 * Designsprache (gemeinsam mit FinancePreview):
 *  - kantenbündige Bänder mit Hairline-Trennern (kein Box-in-Box),
 *  - 2×2-KPI-Raster mit responsiven Werten (kein Überlauf auf MacBook-Breite),
 *  - animierte Bestands-Balken (Bestand vs. Mindestbestand) statt Zahlenwüste.
 * Reine, wahrheitsgemäße Funktionsdarstellung — keine echten Kundenzahlen.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { AlertTriangle, ArrowUpRight, ArrowDownRight, Truck } from 'lucide-react';
import { AnimatedNumber, fmtInt, fmtEur0 } from './AnimatedNumber';

const kpis = [
    { label: 'Artikel gesamt', to: 22847, fmt: fmtInt, trend: { dir: 'up' as const, text: '+128 diese Woche' } },
    { label: 'Lagerwert (EK)', to: 487210, fmt: fmtEur0, trend: { dir: 'up' as const, text: '+2,4 % zum Vormonat' } },
    { label: 'Kritisch', to: 14, fmt: fmtInt, accent: 'warning' as const, trend: { dir: 'down' as const, text: 'unter Mindestbestand' } },
    { label: 'Ausverkauft', to: 3, fmt: fmtInt, accent: 'danger' as const, trend: { dir: 'down' as const, text: 'Nachbestellung offen' } },
];

const criticalItems = [
    { name: 'Bremssattel VA links', oem: '8K0 615 123 F', stock: 4, min: 8, supplier: 'Lieferant A' },
    { name: 'Turbolader Garrett', oem: '03L 253 016 TX', stock: 2, min: 6, supplier: 'Lieferant B' },
    { name: 'Lichtmaschine 150A', oem: '06F 903 023 J', stock: 0, min: 3, supplier: 'Lieferant A' },
    { name: 'Kupplungssatz SACHS', oem: '3000 950 649', stock: 1, min: 4, supplier: 'Lieferant C' },
];

/** Bestands-Balken: Füllstand relativ zum Mindestbestand, animiert. */
function StockBar({ stock, min, delay }: { stock: number; min: number; delay: number }) {
    const reduce = useReducedMotion();
    const pct = Math.max(4, Math.min(100, Math.round((stock / min) * 100)));
    const color = stock === 0 ? '#F04438' : stock < min / 2 ? '#F79009' : '#12B76A';
    return (
        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: '#EDF1F7' }}>
            <motion.div
                className="h-full rounded-full"
                style={{ background: color }}
                initial={{ width: reduce ? `${pct}%` : '0%' }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            />
        </div>
    );
}

export function WAWIPreview() {
    return (
        <div className="w-full min-w-0 max-w-full rounded-2xl overflow-hidden border border-border bg-card shadow-[var(--shadow-raised)]">
            {/* Kopfband */}
            <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border bg-muted">
                <div className="min-w-0">
                    <div className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">Lager · Übersicht</div>
                    <h3 className="text-base font-semibold text-foreground leading-tight mt-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                        Bestandsstatus
                    </h3>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                    Demo-Daten
                </span>
            </header>

            {/* KPI-Raster 2×2 — kantenbündig mit Hairline-Trennern */}
            <div className="grid grid-cols-2 border-b border-border">
                {kpis.map((kpi, i) => {
                    const valueColor = kpi.accent === 'warning' ? '#B54708' : kpi.accent === 'danger' ? '#D92D20' : undefined;
                    const TrendIcon = kpi.trend.dir === 'up' ? ArrowUpRight : ArrowDownRight;
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
                                <AnimatedNumber to={kpi.to} fmt={kpi.fmt} />
                            </div>
                            <div className="flex items-center gap-1 mt-1.5 min-w-0">
                                <TrendIcon
                                    className="h-3 w-3 shrink-0"
                                    style={{ color: kpi.accent ? (kpi.accent === 'danger' ? '#F04438' : '#F79009') : '#12B76A' }}
                                    aria-hidden
                                />
                                <span className="text-[10px] text-muted-foreground truncate">{kpi.trend.text}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Kritische Bestände — volle Breite, Balken statt Zahlenspalten */}
            <div className="flex items-center justify-between gap-2 px-5 pt-4 pb-3">
                <div className="flex items-center gap-1.5 min-w-0">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: '#F79009' }} aria-hidden />
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground truncate">
                        Kritische Bestände · Reorder
                    </span>
                </div>
                <span className="font-mono text-[10px] text-primary shrink-0">Alle ansehen →</span>
            </div>
            <ul className="divide-y divide-border/70 border-t border-border/70">
                {criticalItems.map((item, i) => (
                    <li key={item.oem} className="px-5 py-3">
                        <div className="flex items-baseline justify-between gap-3 mb-1.5 min-w-0">
                            <span className="text-[13px] font-medium text-foreground truncate">{item.name}</span>
                            <span className="font-mono tabular-nums text-[11px] shrink-0" style={{ color: item.stock === 0 ? '#D92D20' : '#B54708' }}>
                                {item.stock}<span className="text-muted-foreground/70"> / min {item.min}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 min-w-0">
                                <StockBar stock={item.stock} min={item.min} delay={0.15 + i * 0.08} />
                            </div>
                            <span className="hidden sm:flex items-center gap-1 font-mono text-[10px] text-muted-foreground shrink-0">
                                <Truck className="w-3 h-3" aria-hidden />
                                {item.supplier}
                            </span>
                        </div>
                        <div className="font-mono text-[10px] text-muted-foreground/80 mt-1 truncate">OEM {item.oem}</div>
                    </li>
                ))}
            </ul>

            {/* Fußband */}
            <footer className="flex items-center justify-between gap-3 px-5 py-3 border-t border-border bg-muted">
                <span className="text-[11px] text-muted-foreground truncate">
                    Bestellvorschlag: 4 Positionen · bester Lieferant je Artikel
                </span>
                <span className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground">
                    Bestellung anlegen
                </span>
            </footer>
        </div>
    );
}
