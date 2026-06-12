import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Quote, Cpu, Users, Brain, Sparkles, MapPin } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Über uns — Von Teilehändlern. Für Teilehändler.',
    description:
        'Partsunion entstand aus 6.000 Teilen pro Monat operativer Erfahrung. Vier Leute, eine Mission: den Teilehandel mit KI auf 2026er-Niveau bringen.',
    alternates: { canonical: 'https://www.partsunion.de/about' },
    openGraph: {
        title: 'Über uns | Partsunion',
        description: 'Von Teilehändlern. Für Teilehändler. Das Team hinter Partsunion.',
        url: 'https://www.partsunion.de/about',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: ['/opengraph-image'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Über uns | Partsunion',
        description: 'Von Teilehändlern. Für Teilehändler.',
        images: ['/opengraph-image'],
    },
};

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.partsunion.de/' },
        { '@type': 'ListItem', position: 2, name: 'Über uns', item: 'https://www.partsunion.de/about' },
    ],
};

export default function AboutPage() {
    return (
        <div className="pt-24 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(59,130,246,0.08),transparent_55%)] -z-10" />
            <div className="fixed inset-0 grid-pattern opacity-15 -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                {/* Hero */}
                <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border/60 text-xs font-medium text-muted-foreground mb-5">
                        <MapPin className="h-3 w-3" />
                        Brühl · Deutschland
                    </span>
                    <h1
                        className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-5"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.035em', lineHeight: 1.05 }}
                    >
                        Von Teilehändlern.<br />
                        <span className="text-gradient">Für Teilehändler.</span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        Wir kennen die Branche aus erster Hand — und bauen die Software,
                        die wir selbst gebraucht hätten.
                    </p>
                </div>

                {/* Story + Founder Quote */}
                <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-12 mb-20 md:mb-24">
                    <section className="lg:col-span-7">
                        <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border/60 text-xs font-medium text-muted-foreground mb-5">
                            Die Gründungsgeschichte
                        </div>
                        <h2
                            className="text-2xl md:text-3xl font-semibold mb-5"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                        >
                            Entstanden aus der Praxis — nicht aus dem Pitch-Deck.
                        </h2>
                        <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                            <p>
                                Die Idee zu Partsunion entstand aus echter Frustration. Mitgründer{' '}
                                <span className="text-foreground font-medium">Elias</span> führte selbst einen
                                erfolgreichen Teilehandel mit über{' '}
                                <span className="text-foreground font-medium">6.000 verkauften Teilen pro Monat</span>.
                            </p>
                            <p>
                                Aus täglicher Erfahrung wusste er: Die OEM-Suche ist komplex und fehleranfällig.
                                Das richtige Teil zu identifizieren kostet Zeit — und falsch identifizierte Teile
                                führen zu Retouren, die Marge und Kundenzufriedenheit kosten.
                            </p>
                            <p>
                                Elias suchte nach einer Lösung, die er selbst nutzen würde. Als er keine fand,
                                beschloss er, sie zu bauen — mit drei weiteren Leuten, die die Branche verstehen
                                oder die Technologie beherrschen, die sie braucht.
                            </p>
                        </div>
                    </section>

                    <aside className="lg:col-span-5">
                        <div className="sticky top-28 rounded-2xl border border-border/60 bg-[rgba(15,23,42,0.4)] p-6 md:p-8">
                            <Quote className="h-6 w-6 text-primary mb-4 opacity-70" />
                            <blockquote
                                className="text-lg md:text-xl text-foreground/95 leading-relaxed mb-6"
                                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.015em' }}
                            >
                                „Ich habe jeden Tag gesehen, wie viel Zeit mein Team mit manueller OEM-Suche
                                verschwendet und wie viele Retouren auf Identifikationsfehler zurückgehen.
                                Das musste aufhören."
                            </blockquote>
                            <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                                <div className="h-10 w-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-semibold">
                                    E
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground">Elias</div>
                                    <div className="text-xs text-muted-foreground">Mitgründer · Branchenexperte</div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Team */}
                <section className="max-w-5xl mx-auto mb-20 md:mb-24">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border/60 text-xs font-medium text-muted-foreground mb-5">
                            Das Team
                        </div>
                        <h2
                            className="text-2xl md:text-3xl font-semibold mb-3"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                        >
                            Vier Leute. Eine Mission.
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
                            Den Teilehandel mit KI auf 2026er-Niveau bringen — ohne Buzzword-Bingo, mit Code.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-border/60 bg-[rgba(15,23,42,0.3)] p-6">
                            <div className="h-10 w-10 rounded-lg flex items-center justify-center border border-border/60 bg-[rgba(15,23,42,0.4)] text-primary mb-4">
                                <Cpu className="h-4 w-4" />
                            </div>
                            <h3
                                className="text-base md:text-lg font-semibold mb-2 text-foreground"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                2 Software-Engineers
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Bauen die KI-Pipeline, die Fahrzeugscheine liest, OEM-Nummern matcht und
                                Angebote in Sekunden erstellt.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-border/60 bg-[rgba(15,23,42,0.3)] p-6">
                            <div className="h-10 w-10 rounded-lg flex items-center justify-center border border-border/60 bg-[rgba(15,23,42,0.4)] text-primary mb-4">
                                <Users className="h-4 w-4" />
                            </div>
                            <h3
                                className="text-base md:text-lg font-semibold mb-2 text-foreground"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                2 Sales- &amp; Branchenexperten
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Verstehen die Branche, sprechen die Sprache der Händler und sorgen dafür,
                                dass Partsunion echte Probleme löst — nicht erfundene.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-primary/30 bg-primary/[0.04] p-5 text-center">
                        <p className="text-sm md:text-base text-foreground/90">
                            <span className="text-primary font-medium">Eat your own dog food.</span>{' '}
                            Elias' eigener Teilehandel läuft seit Q4/2025 auf Partsunion. Jedes Feature,
                            das hier öffentlich ist, durchläuft erst seinen Sales-Workspace.
                        </p>
                    </div>
                </section>

                {/* Technology */}
                <section className="max-w-5xl mx-auto mb-20 md:mb-24">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border/60 text-xs font-medium text-muted-foreground mb-5">
                            Unter der Haube
                        </div>
                        <h2
                            className="text-2xl md:text-3xl font-semibold mb-3"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                        >
                            KI, die für den{' '}
                            <span className="text-gradient">Automotive-Aftermarket</span> trainiert ist.
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            {
                                icon: Brain,
                                title: 'Natural-Language-Engine',
                                body: 'Auf eine umfangreiche Sammlung von Branchen-Begriffen trainiert. Versteht „Klötze" als „Bremsbelag" und türkisch „fren balatası" als das Gleiche.',
                            },
                            {
                                icon: Cpu,
                                title: 'Computer-Vision OCR',
                                body: 'Trainiert auf WhatsApp-komprimierte Handy-Fotos, schiefe Scans, verschmutzte Scheine. OEM in Sekunden.',
                            },
                            {
                                icon: Sparkles,
                                title: 'OEM-Pipeline',
                                body: 'Mehrstufiges Matching gegen Ihre DB, Teilekataloge und Web-Quellen mit Konfidenz-Scoring und Eskalation an Mensch bei < 0,9.',
                            },
                        ].map((tile) => (
                            <div key={tile.title} className="rounded-xl border border-border/60 bg-[rgba(15,23,42,0.3)] p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <tile.icon className="h-4 w-4 text-primary" />
                                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-primary/80">
                                        Modul
                                    </span>
                                </div>
                                <h3
                                    className="text-base font-semibold mb-2 text-foreground"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {tile.title}
                                </h3>
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                    {tile.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Closing CTA */}
                <section className="max-w-2xl mx-auto text-center">
                    <h2
                        className="text-2xl md:text-3xl font-semibold mb-4"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                    >
                        Lassen Sie uns 30 Minuten sprechen.
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground mb-7">
                        Wir zeigen Partsunion live an Ihren echten Fahrzeugen und Teilen.
                    </p>
                    <Link
                        href="/#beratung"
                        className="inline-flex items-center gap-2 h-12 px-6 rounded-lg gradient-primary text-white text-sm font-medium shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-shadow group"
                    >
                        Beratungstermin sichern
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </section>
            </div>
        </div>
    );
}
