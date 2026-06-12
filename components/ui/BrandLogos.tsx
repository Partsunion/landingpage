/**
 * BrandLogos — kompakte SVG-Wortmarken für die angebundenen Großhändler
 * und Industrie-Partner.
 *
 * **Wichtig:** das sind stilisierte Wortmarken, KEINE offiziellen Trademarks.
 * Sie geben den Pages den Look von Brand-Logos, ohne fremde Marken-SVGs
 * 1:1 zu kopieren (Markenrecht). Sobald offizielle Brand-Asset-Lizenzen
 * vorliegen, einzelne Komponenten hier durch echte SVGs ersetzen.
 *
 * Alle Logos sind vector — skalieren beliebig — und benutzen
 * `currentColor` damit sie sich automatisch der Site-Palette anpassen.
 */

interface LogoProps {
    className?: string;
    title: string;
}

const W = 140; // Standard viewBox width
const H = 32;  // Standard viewBox height

function Mark({ children, title, className }: LogoProps & { children: React.ReactNode }) {
    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={title}
            className={className}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>{title}</title>
            {children}
        </svg>
    );
}

// ── Word-mark factory (DRY for similar styles) ──────────────────────────────

function WordMark({
    glyph,
    word,
    fontWeight = 700,
    fontFamily = '"Inter Display", "Inter", system-ui, sans-serif',
    letterSpacing = '-0.02em',
}: {
    glyph: React.ReactNode;
    word: string;
    fontWeight?: number;
    fontFamily?: string;
    letterSpacing?: string;
}) {
    return (
        <>
            {glyph}
            <text
                x={36}
                y={20}
                fontSize={16}
                fontFamily={fontFamily}
                fontWeight={fontWeight}
                letterSpacing={letterSpacing}
                dominantBaseline="middle"
            >
                {word}
            </text>
        </>
    );
}

// ── Glyph primitives ────────────────────────────────────────────────────────

const GlyphShield = (
    <path d="M16 4 L26 8 L26 16 Q26 22 16 28 Q6 22 6 16 L6 8 Z" opacity={0.95} />
);

const GlyphGear = (
    <g transform="translate(16,16)">
        <circle cx={0} cy={0} r={6} fill="none" stroke="currentColor" strokeWidth={2} />
        <path
            d="M0,-12 L0,-9 M0,9 L0,12 M-12,0 L-9,0 M9,0 L12,0 M-8.5,-8.5 L-6.4,-6.4 M6.4,6.4 L8.5,8.5 M-8.5,8.5 L-6.4,6.4 M6.4,-6.4 L8.5,-8.5"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
        />
    </g>
);

const GlyphBox = (
    <g transform="translate(16,16)">
        <path d="M-10,-8 L0,-12 L10,-8 L10,8 L0,12 L-10,8 Z" fill="currentColor" opacity={0.15} />
        <path d="M-10,-8 L0,-12 L10,-8 L10,8 L0,12 L-10,8 Z" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
        <path d="M-10,-8 L0,-4 L10,-8 M0,-4 L0,12" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    </g>
);

const GlyphHex = (
    <g transform="translate(16,16)">
        <path d="M-9,-5 L0,-11 L9,-5 L9,5 L0,11 L-9,5 Z" fill="currentColor" opacity={0.2} />
        <path d="M-9,-5 L0,-11 L9,-5 L9,5 L0,11 L-9,5 Z" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
    </g>
);

const GlyphTruck = (
    <g transform="translate(16,16)">
        <rect x={-12} y={-6} width={14} height={10} rx={1.5} fill="currentColor" opacity={0.18} />
        <rect x={-12} y={-6} width={14} height={10} rx={1.5} fill="none" stroke="currentColor" strokeWidth={1.5} />
        <path d="M2,-2 L7,-2 L11,2 L11,4 L2,4 Z" fill="currentColor" opacity={0.18} />
        <path d="M2,-2 L7,-2 L11,2 L11,4 L2,4 Z" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
        <circle cx={-7} cy={6} r={2.4} fill="none" stroke="currentColor" strokeWidth={1.5} />
        <circle cx={6} cy={6} r={2.4} fill="none" stroke="currentColor" strokeWidth={1.5} />
    </g>
);

const GlyphBolt = (
    <path d="M19,4 L9,18 L15,18 L13,28 L23,14 L17,14 Z" />
);

const GlyphTriangle = (
    <g transform="translate(16,16)">
        <path d="M0,-11 L10,7 L-10,7 Z" fill="currentColor" opacity={0.18} />
        <path d="M0,-11 L10,7 L-10,7 Z" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
    </g>
);

const GlyphRing = (
    <g transform="translate(16,16)">
        <circle cx={0} cy={0} r={10} fill="none" stroke="currentColor" strokeWidth={1.8} />
        <circle cx={0} cy={0} r={4} fill="currentColor" opacity={0.6} />
    </g>
);

const GlyphSquares = (
    <g transform="translate(16,16)">
        <rect x={-10} y={-10} width={9} height={9} rx={1.5} fill="currentColor" opacity={0.3} />
        <rect x={1} y={-10} width={9} height={9} rx={1.5} fill="currentColor" opacity={0.15} />
        <rect x={-10} y={1} width={9} height={9} rx={1.5} fill="currentColor" opacity={0.15} />
        <rect x={1} y={1} width={9} height={9} rx={1.5} fill="currentColor" opacity={0.55} />
    </g>
);

const GlyphArc = (
    <g transform="translate(16,16)" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
        <path d="M-10,8 Q-10,-8 0,-8 Q10,-8 10,8" />
        <circle cx={0} cy={0} r={2.5} fill="currentColor" stroke="none" />
    </g>
);

const GlyphPlus = (
    <g transform="translate(16,16)" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
        <path d="M-9,0 L9,0" />
        <path d="M0,-9 L0,9" />
        <circle cx={0} cy={0} r={11} fill="none" strokeWidth={1.5} />
    </g>
);

// ── Concrete brand marks ────────────────────────────────────────────────────

export function LogoTecAlliance({ className }: { className?: string }) {
    return (
        <Mark title="TecAlliance" className={className}>
            <WordMark glyph={GlyphShield} word="TecAlliance" fontWeight={800} letterSpacing="-0.025em" />
        </Mark>
    );
}

export function LogoIntercars({ className }: { className?: string }) {
    return (
        <Mark title="Intercars" className={className}>
            <WordMark glyph={GlyphGear} word="Intercars" />
        </Mark>
    );
}

export function LogoStahlgruber({ className }: { className?: string }) {
    return (
        <Mark title="Stahlgruber" className={className}>
            <WordMark glyph={GlyphHex} word="Stahlgruber" letterSpacing="-0.018em" />
        </Mark>
    );
}

export function LogoTrost({ className }: { className?: string }) {
    return (
        <Mark title="Trost" className={className}>
            <WordMark glyph={GlyphBolt} word="Trost" />
        </Mark>
    );
}

export function LogoAutoprofi({ className }: { className?: string }) {
    return (
        <Mark title="Autoprofi" className={className}>
            <WordMark glyph={GlyphArc} word="Autoprofi" />
        </Mark>
    );
}

export function LogoMotoprofi({ className }: { className?: string }) {
    return (
        <Mark title="Motoprofi" className={className}>
            <WordMark glyph={GlyphTriangle} word="Motoprofi" />
        </Mark>
    );
}

export function LogoWesselsMueller({ className }: { className?: string }) {
    return (
        <Mark title="Wessels+Müller" className={className}>
            <WordMark glyph={GlyphPlus} word="Wessels+Müller" letterSpacing="-0.022em" />
        </Mark>
    );
}

export function LogoMatthies({ className }: { className?: string }) {
    return (
        <Mark title="Matthies" className={className}>
            <WordMark glyph={GlyphRing} word="Matthies" />
        </Mark>
    );
}

export function LogoColer({ className }: { className?: string }) {
    return (
        <Mark title="Coler" className={className}>
            <WordMark glyph={GlyphSquares} word="Coler" />
        </Mark>
    );
}

export function LogoPvAutomotive({ className }: { className?: string }) {
    return (
        <Mark title="PV Automotive" className={className}>
            <WordMark glyph={GlyphBox} word="PV Automotive" letterSpacing="-0.022em" />
        </Mark>
    );
}

export function LogoWmSe({ className }: { className?: string }) {
    return (
        <Mark title="WM SE" className={className}>
            <WordMark glyph={GlyphTruck} word="WM SE" />
        </Mark>
    );
}

// ── Lookup helper ───────────────────────────────────────────────────────────

export const BRAND_LOGOS: Record<string, React.ComponentType<{ className?: string }>> = {
    'TecAlliance':    LogoTecAlliance,
    'Intercars':      LogoIntercars,
    'Stahlgruber':    LogoStahlgruber,
    'Trost':          LogoTrost,
    'Autoprofi':      LogoAutoprofi,
    'Motoprofi':      LogoMotoprofi,
    'Wessels+Müller': LogoWesselsMueller,
    'Matthies':       LogoMatthies,
    'Coler':          LogoColer,
    'PV Automotive':  LogoPvAutomotive,
    'WM SE':          LogoWmSe,
};
