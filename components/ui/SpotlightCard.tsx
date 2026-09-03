import type { ReactNode, CSSProperties } from 'react';
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

export function SpotlightCard({
    children,
    className,
    style,
}: SpotlightCardProps) {
    return (
        <div
            className={cn(
                'group/spot relative isolate overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-300 hover:border-border-hover hover:shadow-[var(--shadow-card-hover)]',
                className,
            )}
            style={style}
        >
            <div className="relative z-10 h-full">{children}</div>
        </div>
    );
}
