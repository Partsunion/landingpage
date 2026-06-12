'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface CounterProps {
    to: number;
    from?: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    className?: string;
}

/**
 * Counts from `from` to `to` when scrolled into view.
 * Honors prefers-reduced-motion (renders the final value immediately).
 */
export function Counter({
    to,
    from = 0,
    duration = 1.6,
    suffix = '',
    prefix = '',
    decimals = 0,
    className = '',
}: CounterProps) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true, amount: 0.5 });
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        if (reduceMotion) {
            node.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
            return;
        }

        if (!inView) return;

        let cancelled = false;
        const controls = animate(from, to, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate(v) {
                if (cancelled || !nodeRef.current) return;
                nodeRef.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
            },
        });
        return () => {
            cancelled = true;
            controls.stop();
        };
    }, [from, to, duration, suffix, prefix, decimals, inView, reduceMotion]);

    return <span ref={nodeRef} className={className}>{`${prefix}${from.toFixed(decimals)}${suffix}`}</span>;
}
