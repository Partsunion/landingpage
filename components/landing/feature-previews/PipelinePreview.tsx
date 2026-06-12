'use client';

/**
 * PipelinePreview — Live-Pipeline-Visualisierung im Site-Design.
 *
 * Verhalten: Rows erscheinen sequenziell (slide-in + opacity), die jeweils
 * "aktuell laufende" Row hat einen Pulse-Dot. Loop startet nach allen Rows
 * + Pause neu — so wirkt es wie ein echtes laufendes System.
 *
 * Visuell: integriert in das Hairline-Border / rgba(15,23,42,0.4)-Design
 * der ganzen Site — keine isolierte Bloomberg-Insel mehr.
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export interface PipelineRow {
    tag: string;
    value: string;
    status?: 'success' | 'warn' | 'info' | 'muted';
}

export interface PipelinePreviewData {
    title: string;
    sub?: string;
    footer?: string;
    rows: PipelineRow[];
}

const STEP_DELAY_MS = 700;
const LOOP_PAUSE_MS = 3500;

const FONT_MONO = "'IBM Plex Mono', 'JetBrains Mono', 'SF Mono', monospace";

function statusClass(status: PipelineRow['status']): string {
    switch (status) {
        case 'success': return 'text-emerald-400';
        case 'warn':    return 'text-amber-400';
        case 'info':    return 'text-primary';
        default:        return 'text-muted-foreground';
    }
}

function statusGlow(status: PipelineRow['status']): string {
    switch (status) {
        case 'success': return 'rgba(74,222,128,0.45)';
        case 'warn':    return 'rgba(245,165,36,0.45)';
        case 'info':    return 'rgba(29,111,232,0.5)';
        default:        return 'rgba(148,163,184,0.3)';
    }
}

export function PipelinePreview({ data }: { data: PipelinePreviewData }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, amount: 0.3 });
    const reduceMotion = useReducedMotion() ?? false;
    const [visibleCount, setVisibleCount] = useState(reduceMotion ? data.rows.length : 0);
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        if (reduceMotion) {
            setVisibleCount(data.rows.length);
            setActiveIndex(data.rows.length - 1);
            return;
        }
        if (!inView) {
            setVisibleCount(0);
            setActiveIndex(-1);
            return;
        }

        let cancelled = false;
        const timers: ReturnType<typeof setTimeout>[] = [];

        const runOnce = () => {
            setVisibleCount(0);
            setActiveIndex(-1);
            data.rows.forEach((_, i) => {
                timers.push(
                    setTimeout(() => {
                        if (cancelled) return;
                        setVisibleCount(i + 1);
                        setActiveIndex(i);
                    }, i * STEP_DELAY_MS),
                );
            });
            // After last row, drop active highlight after a moment, then loop
            const total = data.rows.length * STEP_DELAY_MS;
            timers.push(
                setTimeout(() => {
                    if (cancelled) return;
                    setActiveIndex(-1);
                }, total + 1200),
            );
            timers.push(
                setTimeout(() => {
                    if (cancelled) return;
                    runOnce();
                }, total + LOOP_PAUSE_MS),
            );
        };

        runOnce();
        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
    }, [data.rows, inView, reduceMotion]);

    return (
        <div
            ref={ref}
            className="w-full rounded-2xl border border-border/60 bg-[rgba(15,23,42,0.4)] overflow-hidden"
        >
            {/* Header — same style as other feature cards */}
            <div className="flex items-center justify-between h-10 px-4 border-b border-border/60 bg-[rgba(15,23,42,0.3)]">
                <div className="flex items-center gap-2.5 min-w-0">
                    <motion.span
                        className="inline-block h-1.5 w-1.5 rounded-full shrink-0 bg-primary"
                        animate={
                            reduceMotion
                                ? undefined
                                : { boxShadow: ['0 0 0px var(--primary)', '0 0 8px var(--primary)', '0 0 0px var(--primary)'] }
                        }
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span
                        className="truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground"
                        style={{ fontFamily: FONT_MONO }}
                    >
                        {data.title}
                    </span>
                </div>
                {data.sub && (
                    <span
                        className="text-[10px] tabular-nums truncate text-muted-foreground"
                        style={{ fontFamily: FONT_MONO, letterSpacing: '0.06em' }}
                    >
                        {data.sub}
                    </span>
                )}
            </div>

            {/* Rows */}
            <div className="px-4 py-4 space-y-2 min-h-[200px]">
                {data.rows.map((row, i) => {
                    const isVisible = i < visibleCount;
                    const isActive = i === activeIndex;
                    const glow = statusGlow(row.status);

                    return (
                        <motion.div
                            key={i}
                            initial={false}
                            animate={
                                reduceMotion
                                    ? { opacity: 1, x: 0 }
                                    : isVisible
                                        ? { opacity: 1, x: 0 }
                                        : { opacity: 0, x: -10 }
                            }
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="grid items-center gap-3 py-1 rounded-md transition-colors px-1.5"
                            style={{
                                gridTemplateColumns: '72px 1fr',
                                background: isActive ? 'rgba(29,111,232,0.06)' : 'transparent',
                            }}
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <motion.span
                                    className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
                                    style={{ background: glow }}
                                    animate={
                                        isActive && !reduceMotion
                                            ? { boxShadow: [`0 0 0px ${glow}`, `0 0 8px ${glow}`, `0 0 0px ${glow}`] }
                                            : { boxShadow: `0 0 2px ${glow}` }
                                    }
                                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                <span
                                    className="text-[10px] truncate uppercase tabular-nums text-muted-foreground"
                                    style={{ fontFamily: FONT_MONO, letterSpacing: '0.08em' }}
                                >
                                    {row.tag}
                                </span>
                            </div>
                            <span
                                className={`text-[11px] md:text-[12px] truncate tabular-nums ${statusClass(row.status)}`}
                                style={{ fontFamily: FONT_MONO }}
                            >
                                {row.value}
                            </span>
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer */}
            {data.footer && (
                <div className="px-4 py-2.5 border-t border-border/60 bg-[rgba(15,23,42,0.3)] flex items-center gap-2">
                    <motion.span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-primary shrink-0"
                        animate={
                            reduceMotion
                                ? undefined
                                : { opacity: [0.4, 1, 0.4] }
                        }
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span
                        className="text-[10px] tabular-nums truncate text-muted-foreground"
                        style={{ fontFamily: FONT_MONO, letterSpacing: '0.04em' }}
                    >
                        {data.footer}
                    </span>
                </div>
            )}
        </div>
    );
}
