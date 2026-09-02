import type { Metadata } from 'next';
import Link from 'next/link';
import {
    Apple,
    ArrowRight,
    CheckCircle2,
    Clock3,
    Download,
    ExternalLink,
    Monitor,
    ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Desktop-App herunterladen — Partsunion',
    description:
        'Partsunion Desktop-App als signierte und von Apple notarisierte Partner-Preview für macOS herunterladen.',
    alternates: { canonical: 'https://partsunion.de/download' },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Partsunion Desktop-App herunterladen',
        description: 'Signierte und von Apple notarisierte Partner-Preview für macOS.',
        url: 'https://partsunion.de/download',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: ['/opengraph-image'],
    },
};

const macDownloads = [
    {
        title: 'Mac mit Apple Chip',
        subtitle: 'Apple Silicon · M1, M2, M3, M4 und neuer',
        fileName: 'Partsunion-Preview-1.0.38-macos-arm64.dmg',
        size: '6,5 MB',
        checksum: '715c0a2dcd83387ca29ec8df162f96afa2fa49f6f91721f1b79fef4275348f94',
        recommended: true,
    },
    {
        title: 'Mac mit Intel-Prozessor',
        subtitle: 'Intel-basierte Macs',
        fileName: 'Partsunion-Preview-1.0.38-macos-x64.dmg',
        size: '6,8 MB',
        checksum: '87a7428208b223e6ba4a4eec29228f9ef62a3ccb1ee8ae53fb748386f1d3a8c1',
        recommended: false,
    },
] as const;

const downloadLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Partsunion Desktop',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'macOS 10.15 oder neuer',
    softwareVersion: '1.0.38 Preview',
    downloadUrl: 'https://partsunion.de/download',
    provider: {
        '@type': 'Organization',
        name: 'Partsunion',
        url: 'https://partsunion.de',
    },
};

export default function DownloadPage() {
    return (
        <div className="relative overflow-hidden pb-24 pt-28 md:pt-36">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(downloadLd) }}
            />

            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center_top,rgba(29,111,232,0.10),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 -z-10 grid-pattern opacity-15" />

            <div className="container mx-auto px-4 md:px-6">
                <section className="mx-auto max-w-3xl text-center">
                    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                        <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                        Partner-Preview · Version 1.0.38
                    </span>
                    <h1
                        className="mb-6 text-4xl font-semibold leading-tight md:text-6xl"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.04em' }}
                    >
                        Partsunion für den{' '}
                        <span className="text-gradient">Desktop herunterladen</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                        Diese Vorschau ist für Vorstellung, eigenständiges Klicken und gemeinsames Testen
                        gedacht. Sie ist signiert und von Apple notarisiert, enthält aber noch nicht den
                        finalen Funktions- und Abnahmestand.
                    </p>
                </section>

                <section className="mx-auto mt-12 max-w-5xl" aria-labelledby="mac-downloads">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                                <Apple className="h-4 w-4" aria-hidden="true" />
                                macOS
                            </div>
                            <h2 id="mac-downloads" className="text-2xl font-semibold md:text-3xl">
                                Passende Mac-Version auswählen
                            </h2>
                        </div>
                        <p className="text-sm text-muted-foreground">macOS 10.15 oder neuer · Stand 24. August 2026</p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {macDownloads.map((item) => (
                            <article
                                key={item.fileName}
                                className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
                            >
                                {item.recommended && (
                                    <span className="absolute right-5 top-5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                                        Für aktuelle Macs
                                    </span>
                                )}
                                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-primary">
                                    <Apple className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <h3 className="pr-24 text-xl font-semibold">{item.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>

                                <a
                                    href={`/downloads/${item.fileName}`}
                                    download
                                    className="group mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_-8px_rgba(29,111,232,0.55)] transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                >
                                    <Download className="h-4 w-4" aria-hidden="true" />
                                    Für Mac herunterladen
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                </a>

                                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                                    <span>DMG · {item.size}</span>
                                    <span>Version 1.0.38</span>
                                </div>

                                <details className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
                                    <summary className="cursor-pointer font-medium text-foreground">SHA-256-Prüfsumme</summary>
                                    <code className="mt-2 block break-all rounded-md bg-muted p-2.5 font-mono leading-relaxed">
                                        {item.checksum}
                                    </code>
                                </details>
                            </article>
                        ))}
                    </div>

                    <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                        <strong className="font-semibold text-foreground">Apple Chip oder Intel?</strong>{' '}
                        Öffne auf dem Mac das Apple-Menü und wähle „Über diesen Mac“. Steht dort M1, M2,
                        M3 oder M4, nimm „Apple Chip“. Andernfalls wähle „Intel-Prozessor“.
                    </div>
                </section>

                <section className="mx-auto mt-12 max-w-5xl" aria-labelledby="windows-download">
                    <article className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground">
                                <Monitor className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div>
                                <div className="mb-1 flex items-center gap-2">
                                    <h2 id="windows-download" className="text-xl font-semibold">Windows</h2>
                                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                                        In Vorbereitung
                                    </span>
                                </div>
                                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                    Der Windows-Download wird hier freigeschaltet, sobald der signierte
                                    Preview-Build geprüft wurde. Wir stellen keinen unbestätigten Installer bereit.
                                </p>
                            </div>
                        </div>
                        <span aria-disabled="true" className="inline-flex h-11 shrink-0 cursor-not-allowed items-center justify-center rounded-lg border border-border bg-muted px-5 text-sm font-medium text-muted-foreground">
                            Noch nicht verfügbar
                        </span>
                    </article>
                </section>

                <section className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3" aria-label="Sicherheit und Installation">
                    <div className="rounded-xl border border-border bg-card p-5">
                        <ShieldCheck className="mb-3 h-5 w-5 text-emerald-600" aria-hidden="true" />
                        <h2 className="font-semibold">Von Apple geprüft</h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            Developer-ID-signiert, notarisiert und mit einem gültigen Notarisierungs-Ticket versehen.
                        </p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-5">
                        <CheckCircle2 className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
                        <h2 className="font-semibold">Installation</h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            DMG öffnen, Partsunion in „Programme“ ziehen und anschließend aus „Programme“ starten.
                        </p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-5">
                        <ExternalLink className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
                        <h2 className="font-semibold">Feedback &amp; Hilfe</h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            Fragen oder Auffälligkeiten bitte mit Screenshot und kurzer Beschreibung an uns senden.
                        </p>
                        <Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                            Kontakt öffnen <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
