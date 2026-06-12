'use client';

/**
 * WAWIPreview — Live-Replik des Warehouse-Overview (Industrial Precision).
 *
 * Referenz: User-Dashboard/src/app/views/warehouse/OverviewView.tsx.
 * Rendert: Header "LAGER · ÜBERSICHT · Bestandsstatus", 4 CornerMark-KPI-Cards
 * mit MonoMetric-Werten, und eine dichte Tabelle mit OEM-Nummern + LedBadges.
 */

import { AlertTriangle, Truck } from 'lucide-react';

const kpis = [
    { label: 'ARTIKEL GESAMT', value: '22.847', sub: 'aktive Stammdaten' },
    { label: 'LAGERWERT', value: '€487.210', sub: 'EK · 30.04.' },
    { label: 'KRITISCH', value: '14', sub: 'unter Mindestbestand', accent: 'warning' as const },
    { label: 'AUSVERKAUFT', value: '3', sub: 'Nachbestellung offen', accent: 'danger' as const },
];

const criticalItems = [
    { name: 'Bremssattel VA links', oem: '8K0615123F', stock: 4, min: 8, status: 'warning' as const, supplier: 'Lieferant A' },
    { name: 'Turbolader Garrett', oem: '03L253016TX', stock: 2, min: 6, status: 'warning' as const, supplier: 'Lieferant B' },
    { name: 'Lichtmaschine 150A', oem: '06F903023J', stock: 0, min: 3, status: 'danger' as const, supplier: 'Lieferant A' },
    { name: 'Kupplungssatz SACHS', oem: '3000950649', stock: 1, min: 4, status: 'danger' as const, supplier: 'Lieferant C' },
    { name: 'Stoßdämpfer HA', oem: '2043263200', stock: 3, min: 6, status: 'warning' as const, supplier: 'Lieferant B' },
];

function CornerMarks({ color = 'rgba(148,163,184,0.35)' }: { color?: string }) {
    return (
        <>
            <span aria-hidden className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: color }} />
            <span aria-hidden className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: color }} />
            <span aria-hidden className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: color }} />
            <span aria-hidden className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: color }} />
        </>
    );
}

function LedBadge({ status }: { status: 'ok' | 'warning' | 'danger' }) {
    const color = status === 'ok' ? '#10b981' : status === 'warning' ? '#f59e0b' : '#f43f5e';
    return (
        <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: status === 'ok' ? color : 'rgba(148,163,184,0.25)' }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: status === 'ok' ? color : 'rgba(148,163,184,0.25)' }} />
        </span>
    );
}

function formatOEM(oem: string): string {
    // "8K0615123F" → "8K0 615 123 F"
    return oem.replace(/(.{3})(.{3})(.{3})(.*)/, '$1 $2 $3 $4').trim();
}

export function WAWIPreview() {
    return (
        <div
            className="w-full rounded-xl overflow-hidden"
            style={{ background: 'hsl(222 47% 5%)', border: '1px solid rgba(148,163,184,0.08)', minHeight: 480 }}
        >
            {/* ─── Header ─── */}
            <header
                className="px-4 lg:px-6 py-4"
                style={{ background: 'hsl(222 47% 6%)', borderBottom: '1px solid rgba(148,163,184,0.08)' }}
            >
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(148,163,184,0.6)' }}>
                            LAGER · ÜBERSICHT
                        </div>
                        <h3 className="text-lg lg:text-xl font-semibold mt-0.5" style={{ color: 'rgba(241,245,249,0.95)', fontFamily: 'var(--font-display)' }}>
                            Bestandsstatus
                        </h3>
                        <div className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(148,163,184,0.45)' }}>
                            Stand · 09:14 · 21.04.2026
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="px-2.5 py-1 font-mono text-[10px] tracking-widest" style={{ border: '1px solid rgba(148,163,184,0.18)', color: 'rgba(148,163,184,0.7)' }}>
                            AKTUALISIEREN
                        </div>
                        <div className="px-2.5 py-1 font-mono text-[10px] tracking-widest" style={{ background: '#3b82f6', color: 'white' }}>
                            + ARTIKEL
                        </div>
                    </div>
                </div>
            </header>

            {/* ─── KPI-Grid ─── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 p-3 lg:p-5">
                {kpis.map(kpi => {
                    const accentColor = kpi.accent === 'warning' ? '#f59e0b' : kpi.accent === 'danger' ? '#f43f5e' : 'rgba(148,163,184,0.35)';
                    const valueColor = kpi.accent === 'warning' ? '#fbbf24' : kpi.accent === 'danger' ? '#fb7185' : 'rgba(241,245,249,0.95)';
                    return (
                        <div key={kpi.label} className="relative p-3 lg:p-4" style={{ background: 'hsl(222 47% 6%)' }}>
                            <CornerMarks color={accentColor} />
                            <div className="font-mono text-[9px] tracking-widest mb-1.5" style={{ color: 'rgba(148,163,184,0.6)' }}>
                                {kpi.label}
                            </div>
                            <div className="font-mono tabular-nums text-xl lg:text-3xl font-semibold leading-none" style={{ color: valueColor }}>
                                {kpi.value}
                            </div>
                            <div className="font-mono text-[9px] mt-1.5" style={{ color: 'rgba(148,163,184,0.55)' }}>
                                {kpi.sub}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ─── Critical-Items-Table ─── */}
            <div className="px-3 lg:px-5 pb-3 lg:pb-5">
                <div className="relative p-3 lg:p-4" style={{ background: 'hsl(222 47% 6%)' }}>
                    <CornerMarks />
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#f59e0b' }} />
                            <div className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(148,163,184,0.65)' }}>
                                KRITISCHE BESTÄNDE · REORDER-VORSCHLAG
                            </div>
                        </div>
                        <div className="font-mono text-[9px]" style={{ color: '#60a5fa' }}>
                            ALLE ANSEHEN →
                        </div>
                    </div>

                    {/* Table-Header */}
                    <div
                        className="grid grid-cols-[1fr_120px_60px_60px_100px] gap-2 pb-2 font-mono text-[9px] tracking-widest"
                        style={{ color: 'rgba(148,163,184,0.5)', borderBottom: '1px solid rgba(148,163,184,0.08)' }}
                    >
                        <div>ARTIKEL</div>
                        <div className="hidden sm:block">OEM</div>
                        <div className="text-right">BEST.</div>
                        <div className="text-right">MIN</div>
                        <div className="text-right hidden sm:block">LIEFERANT</div>
                    </div>

                    {/* Rows */}
                    <div>
                        {criticalItems.map((item, i) => (
                            <div
                                key={item.oem}
                                className="grid grid-cols-[1fr_120px_60px_60px_100px] gap-2 py-2 items-center text-[11px]"
                                style={{ borderBottom: i < criticalItems.length - 1 ? '1px solid rgba(148,163,184,0.05)' : 'none' }}
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <LedBadge status={item.status} />
                                    <span className="truncate font-medium" style={{ color: 'rgba(241,245,249,0.9)' }}>
                                        {item.name}
                                    </span>
                                </div>
                                <div className="font-mono tabular-nums text-[10px] hidden sm:block truncate" style={{ color: 'rgba(148,163,184,0.75)' }}>
                                    {formatOEM(item.oem)}
                                </div>
                                <div className="font-mono tabular-nums text-right font-semibold" style={{ color: item.status === 'danger' ? '#fb7185' : '#fbbf24' }}>
                                    {item.stock}
                                </div>
                                <div className="font-mono tabular-nums text-right" style={{ color: 'rgba(148,163,184,0.6)' }}>
                                    {item.min}
                                </div>
                                <div className="hidden sm:flex items-center justify-end gap-1 font-mono text-[10px]" style={{ color: 'rgba(148,163,184,0.7)' }}>
                                    <Truck className="w-2.5 h-2.5" />
                                    <span className="truncate">{item.supplier}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
