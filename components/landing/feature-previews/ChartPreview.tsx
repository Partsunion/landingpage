'use client';

/**
 * ChartPreview — animierter Bar-Chart im Site-Design.
 *
 * Verhalten: Bars wachsen sequenziell von 0 % auf Zielwert mit spring physics.
 * Header-Stats animieren synchron mit (Counter-Up). Loop nach Pause.
 *
 * Visuell: gleiche Tokens wie der Rest der Site (border-border/60,
 * bg-[rgba(15,23,42,0.4)], primary/muted-foreground/foreground).
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
        case 'success': return 'bg-emerald-400/15';
        case 'warn':    return 'bg-amber-400/15';
        case 'info':    return 'bg-primary/15';
        default:        return 'bg-muted-foreground/10';
    }
}

function statusFill(status: ChartBar['status']): string {
    switch (status) {
        case 'success': return 'rgb(74,222,128)';
        case 'warn':    return 'rgb(245,165,36)';
        case 'info':    return 'rgb(29,111,232)';
        default:        return 'rgb(148,163,184)';
    }
}

function statusText(status: ChartBar['status']): string {
    switch (status) {
        case 'success': return 'text-emerald-400';
        case 'warn':    return 'text-amber-400';
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
    const [animateNow, setAnimateNow] = useState(reduceMotion);

    const max = Math.max(...data.bars.map((b) => b.value));
    const first = data.bars[0];
    const last = data.bars[data.bars.length - 1];
    const delta = first && first.value > 0 ? ((last.value - first.value) / first.value) * 100 : 0;

    useEffect(() => {
        if (reduceMotion) {
            setAnimateNow(true);
            return;
        }
        if (!inView) {
            setAnimateNow(false);
            return;
        }
        // Trigger anim + loop
        setAnimateNow(true);
        const total = data.bars.length * STAGGER_MS + 1500; // bar growth duration
        const id = setInterval(() => {
            setAnimateNow(false);
            setTimeout(() => {
                setAnimateNow(true);
                setAnimationCycle((c) => c + 1);
            }, 30);
        }, total + LOOP_PAUSE_MS);
        return () => clearInterval(id);
    }, [inView, reduceMotion, data.bars.length]);

    return (
        <div
            ref={ref}
            className="w-full rounded-2xl border border-border/60 bg-[rgba(15,23,42,0.4)] overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between h-10 px-4 border-b border-border/60 bg-[rgba(15,23,42,0.3)]">
                <div className="flex items-center gap-2.5">
                    <motion.span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                        animate={reduceMotion ? undefined : { boxShadow: ['0 0 0px var(--primary)', '0 0 8px var(--primary)', '0 0 0px var(--primary)'] }}
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
            <div className="grid grid-cols-3 border-b border-border/60">
                {first && (
                    <div className="p-4 border-r border-border/60">
                        <div
                            className="text-base tabular-nums text-foreground font-medium"
                            style={{ fontFamily: FONT_MONO }}
                        >
                            <AnimatedNumber
                                key={`first-${animationCycle}`}
                                to={first.value}
                                decimals={first.display?.includes(',') ? 1 : 0}
                                suffix={data.unit ?? ''}
                                active={animateNow}
                            />
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.1em] mt-1 text-muted-foreground">
                            {first.label}
                        </div>
                    </div>
                )}
                {last && (
                    <div className="p-4 border-r border-border/60">
                        <div
                            className={`text-base tabular-nums font-medium ${statusText(last.status)}`}
                            style={{ fontFamily: FONT_MONO }}
                        >
                            <AnimatedNumber
                                key={`last-${animationCycle}`}
                                to={last.value}
                                decimals={last.display?.includes(',') ? 1 : 0}
                                suffix={data.unit ?? ''}
                                active={animateNow}
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
                        className={`text-base tabular-nums font-medium ${delta < 0 ? 'text-emerald-400' : delta > 0 ? 'text-amber-400' : 'text-foreground'}`}
                        style={{ fontFamily: FONT_MONO }}
                    >
                        <AnimatedNumber
                            key={`delta-${animationCycle}`}
                            to={delta}
                            decimals={0}
                            suffix=" %"
                            active={animateNow}
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
                                    animate={{ width: animateNow ? `${pct}%` : '0%' }}
                                    transition={
                                        reduceMotion
                                            ? { duration: 0 }
                                            : {
                                                type: 'spring',
                                                stiffness: 90,
                                                damping: 18,
                                                delay: animateNow ? i * (STAGGER_MS / 1000) : 0,
                                            }
                                    }
                                    className="absolute inset-y-0 left-0 rounded-sm"
                                    style={{
                                        background: statusFill(bar.status),
                                        boxShadow: `0 0 8px ${statusFill(bar.status)}40`,
                                    }}
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
                <div className="px-4 py-2.5 border-t border-border/60 bg-[rgba(15,23,42,0.3)] flex items-center gap-2">
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
