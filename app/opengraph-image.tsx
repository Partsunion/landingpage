import { ImageResponse } from 'next/og';

/**
 * Global OG-Image — gerendert beim Build, gilt für /, /live-demo, /features (Übersicht),
 * /about, /contact und alle Sub-Pages, die nichts eigenes setzen.
 *
 * Satori (the SVG-renderer inside ImageResponse) requires explicit
 * `display: flex` on every <div> that has more than one child.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const alt = 'Partsunion — Enterprise-ERP für den Autoteilehandel';
export const size = { width: 1200, height: 630 } as const;
export const contentType = 'image/png';

export default async function OgImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 72,
                    background:
                        'radial-gradient(ellipse at top, #1D6FE81f 0%, transparent 60%), linear-gradient(180deg, #FFFFFF 0%, #F6F8FB 100%)',
                    color: '#0F172A',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                {/* Top Row — Brand + Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%' }}>
                    <div
                        style={{
                            display: 'flex',
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: 'linear-gradient(135deg, #1D6FE8 0%, #4F93FF 100%)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 28,
                            fontWeight: 700,
                            color: 'white',
                        }}
                    >
                        P
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 28,
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                        }}
                    >
                        Partsunion
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            marginLeft: 'auto',
                            fontSize: 16,
                            color: '#5B6B81',
                            border: '1px solid #E5EAF1',
                            padding: '8px 16px',
                            borderRadius: 999,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                        }}
                    >
                        Made in Germany · DSGVO
                    </div>
                </div>

                {/* Center — Main Claim */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            fontSize: 72,
                            fontWeight: 600,
                            lineHeight: 1.05,
                            letterSpacing: '-0.035em',
                            maxWidth: 1000,
                        }}
                    >
                        Enterprise-ERP für den&nbsp;
                        <span
                            style={{
                                display: 'flex',
                                background: 'linear-gradient(135deg, #1D6FE8 0%, #4F93FF 100%)',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            Autoteilehandel.
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 26,
                            color: '#5B6B81',
                            maxWidth: 900,
                            lineHeight: 1.4,
                        }}
                    >
                        Teileidentifikation, Beschaffung, Lager, Verkauf und Finanzen auf einer gemeinsamen Plattform.
                    </div>
                </div>

                {/* Bottom Row — Stats + URL */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #E5EAF1',
                        paddingTop: 24,
                        width: '100%',
                    }}
                >
                    <div style={{ display: 'flex', gap: 40 }}>
                        <Stat value="IDENT" label="Teile & Fahrzeuge" />
                        <Stat value="WAWI" label="Einkauf & Lager" />
                        <Stat value="FIN" label="Faktura & Finanzen" />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 22,
                            color: '#1D6FE8',
                            fontWeight: 500,
                        }}
                    >
                        partsunion.de
                    </div>
                </div>
            </div>
        ),
        size,
    );
}

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
                style={{
                    display: 'flex',
                    fontSize: 40,
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: '#0F172A',
                }}
            >
                {value}
            </div>
            <div
                style={{
                    display: 'flex',
                    fontSize: 14,
                    color: '#98A2B3',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginTop: 4,
                }}
            >
                {label}
            </div>
        </div>
    );
}
