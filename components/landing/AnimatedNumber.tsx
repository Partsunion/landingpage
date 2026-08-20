'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion, animate } from 'framer-motion';

/**
 * Count-up number that fires once when scrolled into view. Honors
 * prefers-reduced-motion (renders the final value immediately).
 * Shared by the dashboard-style preview mocks (WAWI/Finance/…).
 */
export function AnimatedNumber({
    to,
    fmt,
    className,
    style,
    duration = 1.3,
    delay = 0,
}: {
    to: number;
    fmt: (n: number) => string;
    className?: string;
    style?: React.CSSProperties;
    duration?: number;
    delay?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const reduce = useReducedMotion();
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (reduce || !inView) return;
        const controls = animate(0, to, { duration, delay, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(v) });
        return () => controls.stop();
    }, [inView, to, reduce, duration, delay]);
    return <span ref={ref} className={className} style={style}>{fmt(reduce ? to : val)}</span>;
}

// de-DE formatters
export const fmtInt = (n: number) => Math.round(n).toLocaleString('de-DE');
export const fmtEur0 = (n: number) => '€' + new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(Math.round(n));
