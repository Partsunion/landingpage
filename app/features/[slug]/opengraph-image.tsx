import { ImageResponse } from 'next/og';
import { featureData } from '@/lib/feature-data';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const alt = 'Partsunion Feature';
export const size = { width: 1200, height: 630 } as const;
export const contentType = 'image/png';

/**
 * Static-export requires every dynamic route segment to declare its params
 * at build time. We do NOT use `generateImageMetadata` here (which would
 * introduce a second `[__metadata_id__]` dynamic segment Next can't
 * statically resolve under output: 'export') — instead we emit one
 * default image per slug.
 */
export function generateStaticParams() {
    return featureData.map((f) => ({ slug: f.slug }));
}

export default async function FeatureOgImage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const feature = featureData.find((f) => f.slug === slug);
    const title = feature?.title ?? 'Partsunion Feature';
    const description = feature?.description ?? '';
    const isValue = feature?.category === 'value';

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
                        'radial-gradient(ellipse at top left, #1D6FE81f 0%, transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #F6F8FB 100%)',
                    color: '#0F172A',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                {/* Top — Brand + Category */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%' }}>
                    <div
                        style={{
                            display: 'flex',
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            background: 'linear-gradient(135deg, #1D6FE8 0%, #4F93FF 100%)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 24,
                            fontWeight: 700,
                            color: 'white',
                        }}
                    >
                        P
                    </div>
                    <div style={{ display: 'flex', fontSize: 24, fontWeight: 600 }}>Partsunion</div>
                    <div
                        style={{
                            display: 'flex',
                            marginLeft: 'auto',
                            fontSize: 14,
                            color: '#1D6FE8',
                            border: '1px solid #1D6FE855',
                            background: '#1D6FE810',
                            padding: '8px 16px',
                            borderRadius: 999,
                            textTransform: 'uppercase',
                            letterSpacing: '0.14em',
                            fontWeight: 600,
                        }}
                    >
                        {isValue ? 'Vorteil' : 'Kern-Modul'}
                    </div>
                </div>

                {/* Center — Title + Description */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1050 }}>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 66,
                            fontWeight: 600,
                            lineHeight: 1.05,
                            letterSpacing: '-0.035em',
                            color: '#0F172A',
                        }}
                    >
                        {title}
                    </div>
                    {description && (
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 24,
                                color: '#5B6B81',
                                lineHeight: 1.45,
                                maxWidth: 950,
                            }}
                        >
                            {description}
                        </div>
                    )}
                </div>

                {/* Bottom — URL */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #E5EAF1',
                        paddingTop: 22,
                        width: '100%',
                    }}
                >
                    <div style={{ display: 'flex', fontSize: 18, color: '#98A2B3', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                        Feature-Dokumentation
                    </div>
                    <div style={{ display: 'flex', fontSize: 22, color: '#1D6FE8', fontWeight: 500 }}>
                        partsunion.de/features
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
