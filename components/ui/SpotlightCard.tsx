'use client';

import { useRef, MouseEvent, ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    /** Hex/rgba color for the spotlight. Defaults to primary blue. */
    glow?: string;
    /** Radius of the spotlight in px. */
    radius?: number;
}

/**
 * Card with a cursor-following radial-gradient border highlight.
 * Implementation: two layered ::before / ::after via inline style on a
 * `position: relative` wrapper, driven by CSS custom properties --mx, --my.
 * No JS animation loop — the spotlight follows on every mousemove via CSS.
 */
export function SpotlightCard({
    children,
    className,
    style,
    glow = 'rgba(29, 111, 232, 0.20)',
    radius = 320,
}: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className={cn(
                'group/spot relative isolate overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-300 hover:border-border-hover hover:shadow-[var(--shadow-card-hover)]',
                className,
            )}
            style={
                {
                    ...style,
                    '--spot-color': glow,
                    '--spot-radius': `${radius}px`,
                } as CSSProperties
            }
        >
            {/* Spotlight overlay — follows cursor, fades in on hover. */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
                style={{
                    background:
                        'radial-gradient(var(--spot-radius) circle at var(--mx, 50%) var(--my, 50%), var(--spot-color), transparent 60%)',
                    maskImage:
                        'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                    WebkitMaskImage:
                        'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                    borderRadius: 'inherit',
                }}
            />
            {/* Inner glow that lights up the surface around the cursor */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
                style={{
                    background:
                        'radial-gradient(var(--spot-radius) circle at var(--mx, 50%) var(--my, 50%), rgba(29,111,232,0.05), transparent 50%)',
                }}
            />
            <div className="relative z-10 h-full">{children}</div>
        </div>
    );
}
