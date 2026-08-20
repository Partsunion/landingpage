'use client';

/**
 * ChartPreview — animierter Bar-Chart im Site-Design.
 *
 * Verhalten: Bars wachsen sequenziell von 0 % auf Zielwert mit spring physics.
 * Header-Stats animieren synchron mit (Counter-Up). Loop nach Pause.
 *
 * Visuell: helle Panel-Optik im Site-Design (bg-card, border-border,
 * bg-muted-Subflächen, Serien in Blau/Grün).
 */

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';

export interface ChartBar {
    label: string;
    value: number;
    display?: string;
    status?: 'success' | 'warn' | 'info' | 'muted';
}

export interface ChartPreviewData {
    title: string;
    sub?: string;
    unit?: string;
    bars: ChartBar[];
    footer?: string;
}

const FONT_MONO = "'IBM Plex Mono', 'JetBrains Mono', 'SF Mono', monospace";

const STAGGER_MS = 180;
const LOOP_PAUSE_MS = 3500;

function statusBg(status: ChartBar['status']): string {
    switch (status) {
        case 'success': return 'bg-[#12B76A]/10';
        case 'warn':    return 'bg-[#F79009]/10';
        case 'info':    return 'bg-primary/10';
        default:        return 'bg-muted';
    }
}

function statusFill(status: ChartBar['status']): string {
    switch (status) {
        case 'success': return '#12B76A';
        case 'warn':    return '#F79009';
        case 'info':    return '#1D6FE8';
        default:        return '#CBD5E1';
    }
}

function statusText(status: ChartBar['status']): string {
    switch (status) {
        case 'success': return 'text-[#067647]';
        case 'warn':    return 'text-[#B54708]';
        case 'info':    return 'text-primary';
        default:        return 'text-muted-foreground';
    }
}

/** Animated number that counts up to `to` over the given duration. */
function AnimatedNumber({
    to,
    decimals = 0,
    suffix = '',
    duration = 1.4,
    active,
}: {
    to: number;
    decimals?: number;
    suffix?: string;
    duration?: number;
    active: boolean;
}) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const reduceMotion = useReducedMotion() ?? false;

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        if (reduceMotion || !active) {
            node.textContent = to.toFixed(decimals).replace('.', ',') + suffix;
            return;
        }

        node.textContent = (0).toFixed(decimals).replace('.', ',') + suffix;
        const controls = animate(0, to, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate(v) {
                if (!nodeRef.current) return;
                nodeRef.current.textContent = v.toFixed(decimals).replace('.', ',') + suffix;
            },
        });
        return () => controls.stop();
    }, [to, decimals, suffix, duration, active, reduceMotion]);

    return <span ref={nodeRef}>{(0).toFixed(decimals).replace('.', ',') + suffix}</span>;
}

export function ChartPreview({ data }: { data: ChartPreviewData }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, amount: 0.3 });
    const reduceMotion = useReducedMotion() ?? false;
    const [animationCycle, setAnimationCycle] = useState(0);
    const [animateNow, setAnimateNow] = useState(false);
    const animationActive = reduceMotion || (inView && animateNow);

    const max = Math.max(...data.bars.map((b) => b.value));
    const first = data.bars[0];
    const last = data.bars[data.bars.length - 1];
    const delta = first && first.value > 0 ? ((last.value - first.value) / first.value) * 100 : 0;

    useEffect(() => {
        if (reduceMotion || !inView) return;

        // Trigger anim + loop
        const startFrame = requestAnimationFrame(() => setAnimateNow(true));
        const total = data.bars.length * STAGGER_MS + 1500; // bar growth duration
        let restartTimer: ReturnType<typeof setTimeout> | undefined;
        const id = setInterval(() => {
            setAnimateNow(false);
            restartTimer = setTimeout(() => {
                setAnimateNow(true);
                setAnimationCycle((c) => c + 1);
            }, 30);
        }, total + LOOP_PAUSE_MS);
        return () => {
            cancelAnimationFrame(startFrame);
            clearInterval(id);
            if (restartTimer) clearTimeout(restartTimer);
        };
    }, [inView, reduceMotion, data.bars.length]);

    return (
        <div
            ref={ref}
            className="w-full rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between h-10 px-4 border-b border-border bg-muted">
                <div className="flex items-center gap-2.5">
                    <motion.span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                        animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <span
                        className="text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground"
                        style={{ fontFamily: FONT_MONO }}
                    >
                        {data.title}
                    </span>
                </div>
                {data.sub && (
                    <span
                        className="text-[10px] tabular-nums text-muted-foreground"
                        style={{ fontFamily: FONT_MONO, letterSpacing: '0.06em' }}
                    >
                        {data.sub}
                    </span>
                )}
            </div>

            {/* Stat-Row */}
            <div className="grid grid-cols-3 border-b border-border">
                {first && (
                    <div className="p-4 border-r border-border">
                        <div
                            className="text-base tabular-nums text-foreground font-medium"
                            style={{ fontFamily: FONT_MONO }}
                        >
                            <AnimatedNumber
                                key={`first-${animationCycle}`}
                                to={first.value}
                                decimals={first.display?.includes(',') ? 1 : 0}
                                suffix={data.unit ?? ''}
                                active={animationActive}
                            />
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.1em] mt-1 text-muted-foreground">
                            {first.label}
                        </div>
                    </div>
                )}
                {last && (
                    <div className="p-4 border-r border-border">
                        <div
                            className={`text-base tabular-nums font-medium ${statusText(last.status)}`}
                            style={{ fontFamily: FONT_MONO }}
                        >
                            <AnimatedNumber
                                key={`last-${animationCycle}`}
                                to={last.value}
                                decimals={last.display?.includes(',') ? 1 : 0}
                                suffix={data.unit ?? ''}
                                active={animationActive}
                                duration={1.8}
                            />
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.1em] mt-1 text-muted-foreground">
                            {last.label}
                        </div>
                    </div>
                )}
                <div className="p-4">
                    <div
                        className={`text-base tabular-nums font-medium ${delta < 0 ? 'text-[#067647]' : delta > 0 ? 'text-[#B54708]' : 'text-foreground'}`}
                        style={{ fontFamily: FONT_MONO }}
                    >
                        <AnimatedNumber
                            key={`delta-${animationCycle}`}
                            to={delta}
                            decimals={0}
                            suffix=" %"
                            active={animationActive}
                            duration={2.0}
                        />
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.1em] mt-1 text-muted-foreground">
                        Veränderung
                    </div>
                </div>
            </div>

            {/* Bars */}
            <div className="px-4 py-4 space-y-2">
                {data.bars.map((bar, i) => {
                    const pct = max > 0 ? (bar.value / max) * 100 : 0;
                    return (
                        <div
                            key={i}
                            className="grid items-center gap-3"
                            style={{ gridTemplateColumns: '40px 1fr 56px' }}
                        >
                            <span
                                className="text-[10px] tabular-nums text-muted-foreground"
                                style={{ fontFamily: FONT_MONO, letterSpacing: '0.06em', textTransform: 'uppercase' }}
                            >
                                {bar.label}
                            </span>
                            <div className={`relative h-3.5 rounded-sm overflow-hidden ${statusBg(bar.status)}`}>
                                <motion.div
                                    key={`bar-${i}-${animationCycle}`}
                                    initial={{ width: '0%' }}
                                    animate={{ width: animationActive ? `${pct}%` : '0%' }}
                                    transition={
                                        reduceMotion
                                            ? { duration: 0 }
                                            : {
                                                type: 'spring',
                                                stiffness: 90,
                                                damping: 18,
                                                delay: animationActive ? i * (STAGGER_MS / 1000) : 0,
                                            }
                                    }
                                    className="absolute inset-y-0 left-0 rounded-sm"
                                    style={{ background: statusFill(bar.status) }}
                                />
                            </div>
                            <span
                                className={`text-[11px] tabular-nums text-right font-medium ${statusText(bar.status)}`}
                                style={{ fontFamily: FONT_MONO }}
                            >
                                {bar.display ?? bar.value}{data.unit ?? ''}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            {data.footer && (
                <div className="px-4 py-2.5 border-t border-border bg-muted flex items-center gap-2">
                    <motion.span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                        animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                    />
                    <span
                        className="text-[10px] tabular-nums text-muted-foreground truncate"
                        style={{ fontFamily: FONT_MONO, letterSpacing: '0.04em' }}
                    >
                        {data.footer}
                    </span>
                </div>
            )}
        </div>
    );
}
