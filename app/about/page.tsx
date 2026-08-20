import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Quote, Cpu, Users, Database, ShieldCheck, MapPin } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Über uns — Von Teilehändlern. Für Teilehändler.',
    description:
        'Partsunion entstand aus operativer Erfahrung im Autoteilehandel. Unser Ziel: ein branchenspezifisches ERP für durchgängige, nachvollziehbare Abläufe.',
    alternates: { canonical: 'https://partsunion.de/about' },
    openGraph: {
        title: 'Über uns | Partsunion',
        description: 'Von Teilehändlern. Für Teilehändler. Das Team hinter Partsunion.',
        url: 'https://partsunion.de/about',
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
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://partsunion.de/' },
        { '@type': 'ListItem', position: 2, name: 'Über uns', item: 'https://partsunion.de/about' },
    ],
};

export default function AboutPage() {
    return (
        <div className="pt-24 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(29,111,232,0.08),transparent_55%)] -z-10" />
            <div className="fixed inset-0 grid-pattern opacity-15 -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                {/* Hero */}
                <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border text-xs font-medium text-muted-foreground mb-5">
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
                        <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border text-xs font-medium text-muted-foreground mb-5">
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
                                Teilehandel und kannte die täglichen Abläufe von Theke, Teileidentifikation,
                                Beschaffung, Lager und Faktura aus erster Hand.
                            </p>
                            <p>
                                Dabei zeigte sich immer wieder dasselbe Muster: Fahrzeugdaten, Katalogsuche,
                                Bestände, Belege und Kundenkommunikation lagen in getrennten Werkzeugen.
                                Fachentscheidungen waren dadurch schwer nachvollziehbar und Folgeprozesse
                                mussten mehrfach erfasst werden.
                            </p>
                            <p>
                                Elias suchte nach einer Lösung, die er selbst nutzen würde. Als er keine fand,
                                beschloss er, sie zu bauen — gemeinsam mit einem Team aus Branchenpraxis,
                                Produktentwicklung und Software Engineering.
                            </p>
                        </div>
                    </section>

                    <aside className="lg:col-span-5">
                        <div className="sticky top-28 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6 md:p-8">
                            <Quote className="h-6 w-6 text-primary mb-4 opacity-70" />
                            <blockquote
                                className="text-lg md:text-xl text-foreground/95 leading-relaxed mb-6"
                                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.015em' }}
                            >
                                „Eine Teileentscheidung endet nicht bei der Trefferliste. Bestand, Angebot,
                                Lieferung und Rechnung müssen als ein nachvollziehbarer Vorgang zusammenbleiben.“
                            </blockquote>
                            <div className="flex items-center gap-3 pt-4 border-t border-border">
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
                        <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border text-xs font-medium text-muted-foreground mb-5">
                            Das Team
                        </div>
                        <h2
                            className="text-2xl md:text-3xl font-semibold mb-3"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                        >
                            Branchenpraxis und Software Engineering.
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
                            Wir entwickeln die Plattform entlang realer Verkaufs-, Lager- und Finanzprozesse im Teilehandel.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6">
                            <div className="h-10 w-10 rounded-lg flex items-center justify-center border border-primary/15 bg-accent text-primary mb-4">
                                <Cpu className="h-4 w-4" />
                            </div>
                            <h3
                                className="text-base md:text-lg font-semibold mb-2 text-foreground"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                Software &amp; Platform Engineering
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Entwickelt das gemeinsame Objektmodell, kontrollierte Geschäftsprozesse,
                                Integrationen sowie einen verlässlichen und prüfbaren Betrieb.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6">
                            <div className="h-10 w-10 rounded-lg flex items-center justify-center border border-primary/15 bg-accent text-primary mb-4">
                                <Users className="h-4 w-4" />
                            </div>
                            <h3
                                className="text-base md:text-lg font-semibold mb-2 text-foreground"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                Produkt &amp; Branchenprozesse
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Übersetzt Abläufe aus Verkauf, Einkauf, Lager und Finanzen in klare
                                Anforderungen, Abnahmen und produktive Arbeitsplätze.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-primary/30 bg-primary/[0.04] p-5 text-center">
                        <p className="text-sm md:text-base text-foreground/90">
                            <span className="text-primary font-medium">Praxis vor Präsentation.</span>{' '}
                            Produktentscheidungen werden an realen Teilehandelsprozessen geprüft. Der konkrete
                            Betriebsumfang und alle externen Anbindungen werden vor Produktivstart abgenommen.
                        </p>
                    </div>
                </section>

                {/* Architecture */}
                <section className="max-w-5xl mx-auto mb-20 md:mb-24">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border text-xs font-medium text-muted-foreground mb-5">
                            Unter der Haube
                        </div>
                        <h2
                            className="text-2xl md:text-3xl font-semibold mb-3"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                        >
                            Eine Architektur für den{' '}
                            <span className="text-gradient">Automotive-Aftermarket.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            {
                                icon: Database,
                                title: 'Gemeinsames Objektmodell',
                                body: 'Kunden, Fahrzeuge, Artikel, Lieferanten, Bestände und Belege bleiben über definierte Beziehungen verbunden.',
                            },
                            {
                                icon: Cpu,
                                title: 'Branchenspezifische Prozesse',
                                body: 'OE-Referenzen, Fitment, Altteilpfand, ATP und Belegketten sind Teil der operativen Abläufe — keine nachträglichen Add-ons.',
                            },
                            {
                                icon: ShieldCheck,
                                title: 'Kontrolle & Nachvollziehbarkeit',
                                body: 'Rollen, Freigaben, Statushistorie und sichtbarer Prüfbedarf halten Fachentscheidungen und Änderungen nachvollziehbar.',
                            },
                        ].map((tile) => (
                            <div key={tile.title} className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] p-5">
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
                        className="inline-flex items-center gap-2 h-12 px-6 rounded-lg gradient-primary text-primary-foreground text-sm font-medium shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] hover:opacity-95 transition-opacity group"
                    >
                        Beratungstermin sichern
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </section>
            </div>
        </div>
    );
}
