/**
 * DashboardPreview — 1:1 statische Replik der Sales-HomeView aus dem
 * echten User-Dashboard (User-Dashboard/src/app/views/sales/HomeView.tsx).
 *
 * Layout: InboxPane (links) · Workbench (mitte) · ContextPane (rechts).
 * Tokens: identisch zu /User-Dashboard/src/app/design-system/tokens.css
 *
 *   --bg-canvas:      #0A0B0D
 *   --bg-surface:     #111418
 *   --bg-elevated:    #1A1E24
 *   --border:         #252A31
 *   --border-strong:  #3A4049
 *   --text-primary:   #E8ECF1
 *   --text-secondary: #9AA3AD
 *   --text-muted:     #5E6670
 *   --accent-500:     #1D6FE8
 *
 * Hier inline gehärtet weil die Landingpage andere Tailwind-Tokens hat.
 */

import {
    Inbox,
    MessageCircle,
    Mail,
    Phone,
    Globe,
    TrendingUp,
    Minus,
    Bell,
    Command,
} from 'lucide-react';

// ── Design Tokens (mirrored from User-Dashboard) ─────────────────────────────
const T = {
    bgCanvas: '#0A0B0D',
    bgSurface: '#111418',
    bgElevated: '#1A1E24',
    border: '#252A31',
    borderStrong: '#3A4049',
    textPrimary: '#E8ECF1',
    textSecondary: '#9AA3AD',
    textMuted: '#5E6670',
    accent400: '#3B82F6',
    accent500: '#1D6FE8',
    accent700: '#0E3F8F',
    success: '#4ADE80',
    warning: '#F5A524',
    danger: '#F87171',
} as const;

const FONT_MONO = "'IBM Plex Mono', 'JetBrains Mono', 'SF Mono', monospace";
const FONT_DISPLAY = "var(--font-geist-sans), 'Inter Display', 'Inter', system-ui, sans-serif";

// ── Static mock data (mirrors live-hook shapes) ──────────────────────────────

type InboxItem = {
    id: string;
    channel: 'whatsapp' | 'email' | 'webform' | 'phone';
    customerName: string;
    vehicleHint: string;
    partHint: string;
    status: 'new' | 'assigned';
    minutesAgo: number;
};

const inboxItems: InboxItem[] = [
    { id: '1', channel: 'whatsapp', customerName: 'KFZ Meier GmbH',  vehicleHint: 'VW Golf VII · 1.6 TDI',   partHint: 'Bremssattel VA',                 status: 'new',      minutesAgo: 2  },
    { id: '2', channel: 'webform',  customerName: 'AutoFit GmbH',    vehicleHint: 'VW Passat B8 · 2.0 TDI',  partHint: 'Turbolader',                     status: 'assigned', minutesAgo: 14 },
    { id: '3', channel: 'whatsapp', customerName: 'Werkstatt Schmidt', vehicleHint: 'BMW F30 · 320d',         partHint: 'Lichtmaschine',                  status: 'assigned', minutesAgo: 27 },
    { id: '4', channel: 'email',    customerName: 'Parts Express UG', vehicleHint: 'Mercedes W205 · C 220 d', partHint: 'Stoßdämpfer HA',                 status: 'assigned', minutesAgo: 42 },
    { id: '5', channel: 'whatsapp', customerName: 'Müller Automotive', vehicleHint: 'Audi A4 B9 · 3.0 TDI',   partHint: 'Kupplungssatz',                  status: 'assigned', minutesAgo: 58 },
    { id: '6', channel: 'phone',    customerName: 'Hamza Karaca',     vehicleHint: 'Ford Focus IV · 1.5 TDCi', partHint: 'Querlenker VR',                  status: 'assigned', minutesAgo: 73 },
];

const metrics = [
    { value: '12', label: 'NEUE ANFRAGEN',  delta: '+3',     trend: 'up'   as const, emphasized: false },
    { value: '08', label: 'KONVERTIERT',    delta: '+2',     trend: 'up'   as const, emphasized: true  },
    { value: '24', label: 'OFFEN',          delta: undefined, trend: undefined,       emphasized: false },
    { value: '9.450 €', label: 'UMSATZ HEUTE', delta: '+18%', trend: 'up'  as const, emphasized: false },
];

const pipeline = [
    { key: 'new',       label: 'NEU',       count: 4, amount: '2.840 €'  },
    { key: 'wip',       label: 'IN ARBEIT', count: 7, amount: '8.420 €'  },
    { key: 'offer',     label: 'ANGEBOT',   count: 5, amount: '12.180 €' },
    { key: 'confirmed', label: 'BESTÄTIGT', count: 6, amount: '18.540 €' },
    { key: 'delivery',  label: 'LIEFERUNG', count: 3, amount: '6.920 €'  },
];

const activity = [
    { time: '08:42', kind: 'ORDER',   text: 'Auftrag #24871 fakturiert · KFZ Meier GmbH' },
    { time: '08:31', kind: 'INBOX',   text: 'WhatsApp-Anfrage · Werkstatt Schmidt' },
    { time: '08:14', kind: 'INVOICE', text: 'Rechnung #R-1284 · 1.240,00 € versendet' },
    { time: '07:58', kind: 'PAYMENT', text: 'Zahlungseingang · 890,00 € · AutoFit GmbH' },
    { time: '07:42', kind: 'SYSTEM',  text: 'Lieferantenpreise synchronisiert · 8 Quellen' },
    { time: '07:30', kind: 'ORDER',   text: 'Auftrag #24870 bestätigt · Müller Automotive' },
];

const topCustomers = [
    { rank: 1, name: 'KFZ Meier GmbH',     revenue: '24.580 €' },
    { rank: 2, name: 'AutoFit GmbH',       revenue: '18.940 €' },
    { rank: 3, name: 'Werkstatt Schmidt',  revenue: '12.310 €' },
];

// 30 days of revenue history — realistic shape, ends around today's 9.450 €
const revenueHistory = [
    220, 380, 410, 290, 510, 640, 320, 480, 570, 730,
    420, 380, 520, 650, 770, 540, 380, 460, 590, 720,
    680, 540, 620, 810, 740, 590, 660, 820, 740, 945,
];

// ── Atoms ────────────────────────────────────────────────────────────────────

function ChannelIcon({ channel, className }: { channel: InboxItem['channel']; className?: string }) {
    const Icon =
        channel === 'whatsapp' ? MessageCircle :
        channel === 'email'    ? Mail :
        channel === 'phone'    ? Phone :
        Globe;
    return <Icon className={className} aria-hidden />;
}

function StatusDot({ color }: { color: string }) {
    return (
        <span
            className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: color, boxShadow: `0 0 4px ${color}` }}
        />
    );
}

function LabelTechnical({ children, color = T.textMuted, size = 10 }: { children: React.ReactNode; color?: string; size?: number }) {
    return (
        <span
            style={{
                fontFamily: FONT_MONO,
                fontSize: size,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 500,
                color,
            }}
        >
            {children}
        </span>
    );
}

// ── Sparkline (inline SVG, identical algorithm to User-Dashboard) ────────────

function Sparkline({ data, width = 560, height = 56 }: { data: number[]; width?: number; height?: number }) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const step = width / (data.length - 1);
    const points = data
        .map((v, i) => `${(i * step).toFixed(1)},${(height - ((v - min) / range) * (height - 4) - 2).toFixed(1)}`)
        .join(' ');
    const areaPoints = `0,${height} ${points} ${width},${height}`;
    return (
        <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible block" preserveAspectRatio="none">
            <polygon points={areaPoints} fill="rgba(29,111,232,0.12)" />
            <polyline
                points={points}
                fill="none"
                stroke={T.accent500}
                strokeWidth={1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function InboxPane() {
    const filters = ['Neu', 'Heute', 'Zugewiesen', 'Alle'];
    return (
        <aside
            className="hidden md:flex flex-col shrink-0 w-[260px] lg:w-[280px] border-r"
            style={{ background: T.bgSurface, borderColor: T.border }}
        >
            {/* Header */}
            <div className="flex items-center justify-between h-9 px-3 border-b" style={{ borderColor: T.border }}>
                <div className="flex items-center gap-2">
                    <Inbox className="h-3.5 w-3.5" style={{ color: T.textMuted }} aria-hidden />
                    <LabelTechnical>Inbox</LabelTechnical>
                </div>
                <span
                    className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded text-[10px] tabular-nums"
                    style={{ background: T.accent700, color: T.textPrimary, fontFamily: FONT_MONO }}
                >
                    {inboxItems.filter(i => i.status === 'new').length}
                </span>
            </div>

            {/* Filter chips */}
            <div className="flex items-center gap-1 px-3 py-2 border-b overflow-x-auto" style={{ borderColor: T.border }}>
                {filters.map((f, i) => (
                    <button
                        key={f}
                        type="button"
                        className="px-2 py-1 rounded text-[11px] shrink-0"
                        style={{
                            fontFamily: FONT_MONO,
                            color: i === 0 ? T.textPrimary : T.textMuted,
                            background: i === 0 ? T.bgElevated : 'transparent',
                            border: `1px solid ${i === 0 ? T.border : 'transparent'}`,
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
                {inboxItems.map((item, idx) => (
                    <div
                        key={item.id}
                        className="px-3 py-3 border-b cursor-pointer"
                        style={{
                            borderColor: T.border,
                            background: idx === 0 ? 'rgba(29,111,232,0.06)' : 'transparent',
                            borderLeft: idx === 0 ? `2px solid ${T.accent500}` : '2px solid transparent',
                        }}
                    >
                        <div className="flex items-start gap-2 mb-1.5">
                            <ChannelIcon channel={item.channel} className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between gap-2">
                                    <span className="text-[12px] font-medium truncate" style={{ color: T.textPrimary }}>
                                        {item.customerName}
                                    </span>
                                    <span className="text-[10px] tabular-nums shrink-0" style={{ color: T.textMuted, fontFamily: FONT_MONO }}>
                                        {item.minutesAgo}m
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="pl-5">
                            <div className="text-[11px] truncate" style={{ color: T.textSecondary }}>
                                {item.vehicleHint}
                            </div>
                            <div className="text-[11px] truncate" style={{ color: T.textMuted }}>
                                {item.partHint}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}

function MonoMetric({ value, label, delta, trend, emphasized }: typeof metrics[number]) {
    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingUp : Minus;
    const trendColor = trend === 'up' ? T.success : trend === 'down' ? T.danger : T.textMuted;
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
                <span
                    className="tabular-nums"
                    style={{
                        fontFamily: FONT_MONO,
                        fontSize: 28,
                        lineHeight: '1.1',
                        color: emphasized ? T.accent500 : T.textPrimary,
                        fontWeight: 500,
                    }}
                >
                    {value}
                </span>
                {trend && delta && (
                    <span
                        className="inline-flex items-center gap-0.5 text-[11px]"
                        style={{ color: trendColor, fontFamily: FONT_MONO }}
                    >
                        <TrendIcon size={10} />
                        {delta}
                    </span>
                )}
            </div>
            <LabelTechnical>{label}</LabelTechnical>
        </div>
    );
}

function PipelineKanban() {
    return (
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${pipeline.length}, minmax(0, 1fr))` }}>
            {pipeline.map((col) => (
                <div
                    key={col.key}
                    className="flex flex-col gap-1 p-3 rounded-md border"
                    style={{ background: T.bgSurface, borderColor: T.border }}
                >
                    <span
                        className="tabular-nums"
                        style={{ fontFamily: FONT_MONO, fontSize: 22, color: T.textPrimary, fontWeight: 500, lineHeight: '1.1' }}
                    >
                        {col.count}
                    </span>
                    <LabelTechnical>{col.label}</LabelTechnical>
                    <span className="tabular-nums text-[11px]" style={{ fontFamily: FONT_MONO, color: T.textSecondary }}>
                        {col.amount}
                    </span>
                </div>
            ))}
        </div>
    );
}

function ActivityFeed() {
    const kindColor: Record<string, string> = {
        ORDER:   T.accent400,
        INBOX:   T.success,
        INVOICE: T.warning,
        PAYMENT: T.success,
        SYSTEM:  T.textMuted,
    };
    return (
        <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
                <LabelTechnical>Aktivität</LabelTechnical>
                <LabelTechnical size={9}>Live</LabelTechnical>
            </div>
            <div className="flex flex-col gap-2">
                {activity.slice(0, 5).map((a, i) => (
                    <div key={i} className="flex items-baseline gap-2">
                        <span className="tabular-nums text-[10px] shrink-0 w-9" style={{ fontFamily: FONT_MONO, color: T.textMuted }}>
                            {a.time}
                        </span>
                        <span className="text-[9px] shrink-0 w-12 px-1 py-0.5 rounded text-center" style={{
                            fontFamily: FONT_MONO,
                            color: kindColor[a.kind],
                            background: `${kindColor[a.kind]}14`,
                            letterSpacing: '0.04em',
                        }}>
                            {a.kind}
                        </span>
                        <span className="text-[11px] truncate" style={{ color: T.textSecondary }}>
                            {a.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ContextPane() {
    return (
        <aside
            className="hidden lg:flex flex-col shrink-0 w-[260px] border-l"
            style={{ background: T.bgSurface, borderColor: T.border }}
        >
            <div className="flex items-center h-9 px-3 border-b" style={{ borderColor: T.border }}>
                <LabelTechnical>Kontext</LabelTechnical>
            </div>
            <div className="p-3 space-y-5">
                <div
                    className="text-[11px] text-center py-5 rounded-md border border-dashed"
                    style={{ color: T.textMuted, borderColor: T.border }}
                >
                    Wähle einen Vorgang
                </div>

                <div>
                    <div className="mb-3">
                        <LabelTechnical>Top Kunden · Monat</LabelTechnical>
                    </div>
                    <div className="flex flex-col gap-3">
                        {topCustomers.map((c) => (
                            <div key={c.rank} className="flex items-baseline justify-between gap-2">
                                <div className="flex items-baseline gap-2 min-w-0">
                                    <span className="tabular-nums text-[11px]" style={{ fontFamily: FONT_MONO, color: T.textMuted }}>
                                        {c.rank}.
                                    </span>
                                    <span className="text-[12px] truncate" style={{ color: T.textPrimary }}>{c.name}</span>
                                </div>
                                <span className="tabular-nums text-[12px] shrink-0" style={{ fontFamily: FONT_MONO, color: T.textPrimary }}>
                                    {c.revenue}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export function DashboardPreview() {
    const today = 'Dienstag, 28. Mai 2026';
    const revenueTotal = revenueHistory.reduce((a, b) => a + b, 0).toLocaleString('de-DE') + ' €';

    return (
        <div
            className="w-full rounded-xl overflow-hidden border"
            style={{
                background: T.bgCanvas,
                borderColor: T.border,
                minHeight: 560,
                fontFamily: FONT_DISPLAY,
                color: T.textPrimary,
            }}
        >
            {/* ── SystemStatusBar (Bloomberg-Terminal-Header) ───────────────── */}
            <div
                className="flex items-center gap-5 h-8 px-3 lg:px-4 border-b"
                style={{ background: T.bgSurface, borderColor: T.border }}
            >
                <span className="tabular-nums text-[11px]" style={{ fontFamily: FONT_MONO, color: T.textSecondary }}>
                    08:42:17 · Di 28. Mai
                </span>
                <span className="w-px h-3" style={{ background: T.border }} aria-hidden />
                <div className="flex items-center gap-4 min-w-0">
                    <div className="flex items-center gap-1.5">
                        <StatusDot color={T.success} />
                        <LabelTechnical size={10}>WhatsApp</LabelTechnical>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <StatusDot color={T.success} />
                        <LabelTechnical size={10}>Katalog</LabelTechnical>
                        <span className="tabular-nums text-[10px]" style={{ color: T.textSecondary, fontFamily: FONT_MONO }}>SYNC&nbsp;08:41</span>
                    </div>
                    <div className="hidden md:flex items-center gap-1.5">
                        <StatusDot color={T.success} />
                        <LabelTechnical size={10}>Lieferanten</LabelTechnical>
                        <span className="tabular-nums text-[10px]" style={{ color: T.textSecondary, fontFamily: FONT_MONO }}>8/8</span>
                    </div>
                </div>
                <div className="flex-1" />
                <div className="hidden md:flex items-center gap-4 tabular-nums text-[11px]" style={{ fontFamily: FONT_MONO, color: T.textSecondary }}>
                    <span><span style={{ color: T.textMuted }}>NEU</span> 12</span>
                    <span style={{ color: T.border }}>·</span>
                    <span><span style={{ color: T.textMuted }}>KONV</span> 08</span>
                    <span style={{ color: T.border }}>·</span>
                    <span><span style={{ color: T.textMuted }}>UMSATZ</span> 9.450&nbsp;€</span>
                </div>
            </div>

            {/* ── 3-Pane Body ──────────────────────────────────────────────── */}
            <div className="flex" style={{ minHeight: 520 }}>
                <InboxPane />

                {/* Workbench */}
                <main className="flex-1 min-w-0 p-4 md:p-5 space-y-5">
                    {/* Header */}
                    <header className="flex items-end justify-between gap-4">
                        <div>
                            <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.08em', color: T.accent400, textTransform: 'uppercase' }}>
                                {'// Heute'}
                            </div>
                            <h2
                                className="mt-1"
                                style={{
                                    fontFamily: FONT_DISPLAY,
                                    fontSize: 22,
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.15,
                                    color: T.textPrimary,
                                    fontWeight: 600,
                                }}
                            >
                                {today}
                            </h2>
                            <p className="text-[12px] mt-1" style={{ color: T.textSecondary }}>
                                Alles was heute reinkommt — Anfragen, Aufträge, Umsatz.
                            </p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 shrink-0">
                            <Bell className="h-3.5 w-3.5" style={{ color: T.textMuted }} aria-hidden />
                            <kbd
                                className="rounded-sm px-1.5 py-0.5 text-[10px] flex items-center gap-0.5"
                                style={{ fontFamily: FONT_MONO, color: T.textMuted, background: T.bgElevated, border: `1px solid ${T.border}` }}
                            >
                                <Command className="h-2.5 w-2.5" />K
                            </kbd>
                            <LabelTechnical>Schnellbefehl</LabelTechnical>
                        </div>
                    </header>

                    {/* KPI Row */}
                    <section className="grid grid-cols-2 lg:grid-cols-4 border-t border-b" style={{ borderColor: T.border }}>
                        {metrics.map((m, i) => (
                            <div
                                key={m.label}
                                className="p-4"
                                style={{
                                    borderRight: i < metrics.length - 1 ? `1px solid ${T.border}` : undefined,
                                }}
                            >
                                <MonoMetric {...m} />
                            </div>
                        ))}
                    </section>

                    {/* Pipeline */}
                    <section className="space-y-2">
                        <LabelTechnical>Pipeline</LabelTechnical>
                        <PipelineKanban />
                    </section>

                    {/* Revenue + Activity */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                        <div
                            className="lg:col-span-2 p-4 rounded-md border"
                            style={{ background: T.bgSurface, borderColor: T.border }}
                        >
                            <div className="flex items-baseline justify-between mb-3">
                                <LabelTechnical>Umsatz · 30 Tage</LabelTechnical>
                                <span
                                    className="tabular-nums text-base"
                                    style={{ fontFamily: FONT_MONO, color: T.textPrimary, fontWeight: 500 }}
                                >
                                    {revenueTotal}
                                </span>
                            </div>
                            <Sparkline data={revenueHistory} />
                            <div className="flex justify-between mt-2 tabular-nums text-[10px]" style={{ fontFamily: FONT_MONO, color: T.textMuted }}>
                                <span>28.04.</span>
                                <span>heute</span>
                            </div>
                        </div>

                        <div
                            className="p-4 rounded-md border"
                            style={{ background: T.bgSurface, borderColor: T.border }}
                        >
                            <ActivityFeed />
                        </div>
                    </section>
                </main>

                <ContextPane />
            </div>
        </div>
    );
}
