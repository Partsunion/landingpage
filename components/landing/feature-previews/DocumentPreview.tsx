'use client';

/**
 * DocumentPreview — sequenziell aufbauendes Dokument im Site-Design.
 *
 * Verhalten: das Papier wird Zeile für Zeile aufgebaut (wie wenn ein PDF
 * gerade generiert wird) — Header → Empfänger → Positionen → Totals.
 * Loop nach Pause.
 *
 * Visuell: helle Panel-Optik im Site-Design (bg-card, border-border,
 * bg-muted-Subflächen), Papier innen im Light-Cream-Look mit dezenter
 * Schattierung — integriert in den Site-Stil statt isoliert.
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export interface DocumentLine {
    pos: string;
    label: string;
    qty: string;
    price: string;
}

export interface DocumentPreviewData {
    title: string;
    sub?: string;
    documentNumber: string;
    documentType: string;
    issuer: string;
    customer: string;
    customerAddress: string;
    lines: DocumentLine[];
    subtotal: string;
    tax: string;
    total: string;
    footer?: string;
}

const FONT_MONO = "'IBM Plex Mono', 'JetBrains Mono', 'SF Mono', monospace";
const FONT_DISPLAY = "var(--font-geist-sans), 'Inter Display', 'Inter', system-ui, sans-serif";

const STEP_DELAY_MS = 280;
const LOOP_PAUSE_MS = 4500;

export function DocumentPreview({ data }: { data: DocumentPreviewData }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, amount: 0.3 });
    const reduceMotion = useReducedMotion() ?? false;

    // Steps: 0=docHeader, 1=customer, 2..2+N=lines, 2+N+1=subtotal, +2=tax, +3=total
    const totalSteps = 3 + data.lines.length + 3;
    const [step, setStep] = useState(reduceMotion ? totalSteps : 0);

    useEffect(() => {
        if (reduceMotion) {
            setStep(totalSteps);
            return;
        }
        if (!inView) {
            setStep(0);
            return;
        }
        let cancelled = false;
        const timers: ReturnType<typeof setTimeout>[] = [];

        const runOnce = () => {
            setStep(0);
            for (let i = 1; i <= totalSteps; i++) {
                timers.push(
                    setTimeout(() => {
                        if (!cancelled) setStep(i);
                    }, i * STEP_DELAY_MS),
                );
            }
            timers.push(
                setTimeout(() => {
                    if (!cancelled) runOnce();
                }, totalSteps * STEP_DELAY_MS + LOOP_PAUSE_MS),
            );
        };

        runOnce();
        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
    }, [inView, reduceMotion, totalSteps]);

    const reveal = (idx: number) =>
        reduceMotion
            ? { initial: false, animate: { opacity: 1, y: 0 } }
            : {
                initial: { opacity: 0, y: 6 },
                animate: step > idx ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 },
                transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
            };

    return (
        <div
            ref={ref}
            className="w-full rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden"
        >
            {/* Header — Site-Design */}
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

            {/* Document Paper — etwas weniger weißlich, integriert ins Design */}
            <div
                className="m-3 rounded-lg p-4 text-[10px] leading-snug"
                style={{
                    background: 'linear-gradient(180deg, #FAFAF7 0%, #F2F1EC 100%)',
                    color: '#1A1E24',
                    boxShadow: 'inset 0 0 0 1px rgba(16,24,40,0.06), 0 1px 2px rgba(16,24,40,0.08)',
                    fontFamily: FONT_DISPLAY,
                }}
            >
                {/* Doc-Header */}
                <motion.div
                    {...reveal(0)}
                    className="flex justify-between items-start mb-4 pb-3 border-b"
                    style={{ borderColor: '#E0DED7' }}
                >
                    <div>
                        <div className="text-[13px] font-semibold tracking-tight">{data.documentType}</div>
                        <div className="text-[10px] mt-0.5 tabular-nums" style={{ fontFamily: FONT_MONO, color: '#5E6670' }}>
                            Nr. {data.documentNumber}
                        </div>
                    </div>
                    <div className="text-right text-[9px]">
                        <div className="font-semibold uppercase tracking-[0.1em]">{data.issuer}</div>
                    </div>
                </motion.div>

                {/* Customer */}
                <motion.div {...reveal(1)} className="mb-4">
                    <div className="text-[8px] uppercase tracking-[0.1em] mb-0.5" style={{ color: '#5E6670' }}>
                        Rechnungsempfänger
                    </div>
                    <div className="font-semibold">{data.customer}</div>
                    <div className="text-[9px]" style={{ color: '#5E6670' }}>{data.customerAddress}</div>
                </motion.div>

                {/* Line items header */}
                <motion.div
                    {...reveal(2)}
                    className="grid grid-cols-12 gap-1 py-1.5 text-[8px] uppercase tracking-[0.08em] border-t"
                    style={{ color: '#5E6670', borderColor: '#E0DED7' }}
                >
                    <div className="col-span-1">Pos</div>
                    <div className="col-span-7">Artikel</div>
                    <div className="col-span-1 text-right">Mng</div>
                    <div className="col-span-3 text-right">Einzel</div>
                </motion.div>

                {data.lines.map((line, i) => (
                    <motion.div
                        key={i}
                        {...reveal(3 + i)}
                        className="grid grid-cols-12 gap-1 py-1.5 border-t"
                        style={{ borderColor: '#E0DED7', fontFamily: FONT_MONO }}
                    >
                        <div className="col-span-1 text-[9px] tabular-nums" style={{ color: '#5E6670' }}>{line.pos}</div>
                        <div className="col-span-7 text-[10px]" style={{ fontFamily: FONT_DISPLAY }}>{line.label}</div>
                        <div className="col-span-1 text-[10px] text-right tabular-nums">{line.qty}</div>
                        <div className="col-span-3 text-[10px] text-right tabular-nums">{line.price}</div>
                    </motion.div>
                ))}

                {/* Totals */}
                <div className="mt-3 ml-auto w-1/2 space-y-1">
                    <motion.div {...reveal(3 + data.lines.length)} className="flex justify-between text-[10px]">
                        <span style={{ color: '#5E6670' }}>Zwischensumme</span>
                        <span className="tabular-nums" style={{ fontFamily: FONT_MONO }}>{data.subtotal}</span>
                    </motion.div>
                    <motion.div {...reveal(4 + data.lines.length)} className="flex justify-between text-[10px]">
                        <span style={{ color: '#5E6670' }}>MwSt. 19 %</span>
                        <span className="tabular-nums" style={{ fontFamily: FONT_MONO }}>{data.tax}</span>
                    </motion.div>
                    <motion.div
                        {...reveal(5 + data.lines.length)}
                        className="flex justify-between text-[12px] font-semibold pt-1.5 border-t"
                        style={{ borderColor: '#1A1E24' }}
                    >
                        <span>Gesamt</span>
                        <span className="tabular-nums" style={{ fontFamily: FONT_MONO }}>{data.total}</span>
                    </motion.div>
                </div>
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
