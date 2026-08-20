import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
    title: 'Kontakt — Sprechen wir über Ihren Teilehandel',
    description:
        'Frage zum Produkt, Pilot-Anfrage oder Support: hier erreichen Sie das Partsunion-Team direkt.',
    alternates: { canonical: 'https://partsunion.de/contact' },
    openGraph: {
        title: 'Kontakt | Partsunion',
        description: 'Sprechen Sie mit uns zur Digitalisierung Ihres Teilehandels.',
        url: 'https://partsunion.de/contact',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: ['/opengraph-image'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kontakt | Partsunion',
        description: 'Sprechen Sie mit uns zur Digitalisierung Ihres Teilehandels.',
        images: ['/opengraph-image'],
    },
};

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://partsunion.de/' },
        { '@type': 'ListItem', position: 2, name: 'Kontakt', item: 'https://partsunion.de/contact' },
    ],
};

const contactLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Partsunion Kontakt',
    url: 'https://partsunion.de/contact',
    mainEntity: {
        '@type': 'Organization',
        name: 'Partsunion',
        email: 'info@partsunion.de',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Zum Sommersberg 27',
            postalCode: '50321',
            addressLocality: 'Brühl',
            addressCountry: 'DE',
        },
    },
};

export default function ContactPage() {
    return (
        <div className="pt-24 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
            />

            {/* Background */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(29,111,232,0.08),transparent_55%)] -z-10" />
            <div className="fixed inset-0 grid-pattern opacity-15 -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border text-xs font-medium text-muted-foreground mb-5">
                        <MessageCircle className="h-3 w-3" />
                        Direkter Kontakt
                    </span>
                    <h1
                        className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-5"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.035em', lineHeight: 1.05 }}
                    >
                        Sprechen wir über <span className="text-gradient">Ihren Teilehandel.</span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        Frage zum Produkt, Pilot-Anfrage, Integration-Detail oder Support — wir
                        antworten innerhalb von 24 Stunden.
                    </p>
                </div>

                {/* Two-column body */}
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-6xl mx-auto">
                    {/* Form */}
                    <section className="lg:col-span-7">
                        <h2
                            className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-5"
                        >
                            Nachricht schreiben
                        </h2>
                        <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6 md:p-8">
                            <ContactForm />
                        </div>
                    </section>

                    {/* Contact info */}
                    <aside className="lg:col-span-5 space-y-4">
                        <h2
                            className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-5"
                        >
                            Wege zu uns
                        </h2>

                        <a
                            href="mailto:info@partsunion.de"
                            className="block rounded-xl border border-border bg-card shadow-[var(--shadow-card)] p-5 hover:border-primary/40 transition-colors group"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-9 w-9 rounded-lg flex items-center justify-center border border-primary/15 bg-accent text-primary">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                    E-Mail
                                </div>
                            </div>
                            <div className="font-mono text-sm text-foreground mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                                info@partsunion.de
                            </div>
                            <p className="text-xs text-muted-foreground">Antwort meist innerhalb von 24 h</p>
                        </a>

                        <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-9 w-9 rounded-lg flex items-center justify-center border border-primary/15 bg-accent text-primary">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                    Sitz
                                </div>
                            </div>
                            <div className="text-sm text-foreground/85 leading-relaxed">
                                Partsunion<br />
                                Zum Sommersberg 27<br />
                                50321 Brühl · Deutschland
                            </div>
                        </div>

                        <Link
                            href="/#beratung"
                            className="block rounded-xl border border-primary/40 bg-primary/[0.05] p-5 hover:bg-primary/[0.08] transition-colors group"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-primary/15 border border-primary/30 text-primary">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-primary">
                                    Beratungstermin
                                </div>
                            </div>
                            <div className="text-sm text-foreground font-medium mb-1">
                                30 Minuten · Online oder vor Ort
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">
                                Live-Demo an Ihren echten Fahrzeugen plus ROI-Rechnung.
                            </p>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                                Slot wählen <ArrowRight className="h-3 w-3" />
                            </span>
                        </Link>

                        <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] p-5">
                            <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground mb-2">
                                Bestandskunde?
                            </div>
                            <p className="text-sm text-foreground/85 mb-3">
                                Support &amp; Tickets direkt im Dashboard.
                            </p>
                            <a
                                href="https://app.partsunion.de"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-primary transition-colors"
                            >
                                Zum Dashboard <ArrowRight className="h-3 w-3" />
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
