'use client';

/**
 * PipelinePreview — Live-Pipeline-Visualisierung im Site-Design.
 *
 * Verhalten: Rows erscheinen sequenziell (slide-in + opacity), die jeweils
 * "aktuell laufende" Row hat einen Pulse-Dot. Loop startet nach allen Rows
 * + Pause neu — so wirkt es wie ein echtes laufendes System.
 *
 * Visuell: helle Panel-Optik im Site-Design (bg-card, border-border,
 * bg-muted-Subflächen) — keine isolierte Bloomberg-Insel mehr.
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
        case 'success': return 'text-[#067647]';
        case 'warn':    return 'text-[#B54708]';
        case 'info':    return 'text-primary';
        default:        return 'text-muted-foreground';
    }
}

/** LED-Dot-Farbe pro Status (helle Fläche → kräftige Statusfarben). */
function statusDot(status: PipelineRow['status']): string {
    switch (status) {
        case 'success': return '#12B76A';
        case 'warn':    return '#F79009';
        case 'info':    return '#1D6FE8';
        default:        return '#CBD5E1';
    }
}

export function PipelinePreview({ data }: { data: PipelinePreviewData }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, amount: 0.3 });
    const reduceMotion = useReducedMotion() ?? false;
    const [visibleCount, setVisibleCount] = useState(0);
    const [activeIndex, setActiveIndex] = useState(-1);
    const renderedVisibleCount = reduceMotion ? data.rows.length : (inView ? visibleCount : 0);
    const renderedActiveIndex = reduceMotion ? data.rows.length - 1 : (inView ? activeIndex : -1);

    useEffect(() => {
        if (reduceMotion || !inView) return;

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

        const startFrame = requestAnimationFrame(runOnce);
        return () => {
            cancelled = true;
            cancelAnimationFrame(startFrame);
            timers.forEach(clearTimeout);
        };
    }, [data.rows, inView, reduceMotion]);

    return (
        <div
            ref={ref}
            className="w-full rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden"
        >
            {/* Header — same style as other feature cards */}
            <div className="flex items-center justify-between h-10 px-4 border-b border-border bg-muted">
                <div className="flex items-center gap-2.5 min-w-0">
                    <motion.span
                        className="inline-block h-1.5 w-1.5 rounded-full shrink-0 bg-primary"
                        animate={
                            reduceMotion
                                ? undefined
                                : { opacity: [0.4, 1, 0.4] }
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
                    const isVisible = i < renderedVisibleCount;
                    const isActive = i === renderedActiveIndex;
                    const dot = statusDot(row.status);

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
                                background: isActive ? 'var(--accent)' : 'transparent',
                            }}
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <motion.span
                                    className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
                                    style={{ background: dot }}
                                    animate={
                                        isActive && !reduceMotion
                                            ? { opacity: [0.35, 1, 0.35] }
                                            : { opacity: 1 }
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
                <div className="px-4 py-2.5 border-t border-border bg-muted flex items-center gap-2">
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
