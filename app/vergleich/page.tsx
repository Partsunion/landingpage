import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Minus, X, ArrowRight, Scale, Layers3 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'ERP-Systemansätze für den Autoteilehandel im Vergleich',
    description:
        'Vergleich von branchenspezifischem ERP, generischem ERP/WaWi und Tabellenlösungen anhand von Objektmodell, Warenwirtschaft, Belegfluss, Finanzpfaden und Einführung.',
    keywords: [
        'Autoteile Software Vergleich',
        'ERP Autoteilehandel Vergleich',
        'Warenwirtschaft Autoteile Vergleich',
        'beste Software Autoteilehandel',
        'Partsunion Alternative',
        'Alternative zu Excel Warenwirtschaft',
        'WaWi Vergleich Kfz-Teile',
    ],
    alternates: { canonical: 'https://partsunion.de/vergleich' },
    openGraph: {
        title: 'ERP-Systemansätze für den Autoteilehandel | Partsunion',
        description:
            'Branchenspezifisches ERP, generisches ERP/WaWi und Tabellenlösungen sachlich nach Prozess- und Einführungsmodell verglichen.',
        url: 'https://partsunion.de/vergleich',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: ['/opengraph-image'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ERP-Systemansätze für den Autoteilehandel',
        description: 'Branchenspezifisches ERP, generisches ERP/WaWi und Tabellenlösungen sachlich verglichen.',
        images: ['/opengraph-image'],
    },
};

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://partsunion.de/' },
        { '@type': 'ListItem', position: 2, name: 'Vergleich', item: 'https://partsunion.de/vergleich' },
    ],
};

const faqs = [
    {
        q: 'Welcher Systemansatz passt zu einem Autoteilehändler?',
        a: 'Das hängt von Prozessbreite, Standorten, vorhandenen Systemen und Integrationen ab. Entscheidend ist, ob Fahrzeug- und Teilebezug, Bestandsführung, Belegkette und Finanzprozesse im Kernmodell liegen oder erst über Customizing und Zusatzsysteme verbunden werden müssen.',
    },
    {
        q: 'Was ist eine gute Alternative zu Excel im Teilehandel?',
        a: 'Tabellen eignen sich für abgegrenzte Listen, bilden aber Reservierungen, Referenzbelege, Rollen und ein belastbares Bewegungsjournal nur mit erheblicher Eigenlogik ab. Für operative Bestände und Belegketten ist ein transaktionales Warenwirtschaftssystem in der Regel geeigneter.',
    },
    {
        q: 'Wann ist ein branchenspezifisches ERP sinnvoll?',
        a: 'Wenn OE-Referenzen, Fahrzeugbezug, Altteilpfand, ATP und typische Teilehandelsprozesse dauerhaft geschäftskritisch sind, reduziert ein Branchenmodell den individuellen Anpassungsumfang. Einführung, Migration und Schnittstellen bleiben trotzdem ein kontrolliertes Projekt und werden vorab abgegrenzt.',
    },
];

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

type Cell = 'yes' | 'partial' | 'no' | string;

interface Row {
    criterion: string;
    partsunion: Cell;
    generic: Cell;
    excel: Cell;
}

const rows: Row[] = [
    { criterion: 'Fahrzeug-, OE- und Fitment-Bezug', partsunion: 'Im Kernmodell', generic: 'Branchenmodul oder Customizing', excel: 'Extern / manuell' },
    { criterion: 'Verkauf, Einkauf, Lager und Finanzen', partsunion: 'Gemeinsame Datenbasis', generic: 'Je Edition und Modulwahl', excel: 'Getrennte Listen' },
    { criterion: 'Belegkette von Angebot bis Zahlung', partsunion: 'Durchgängige Referenzen', generic: 'Typische ERP-Funktion', excel: 'Manuell verknüpft' },
    { criterion: 'ATP, Reservierung und Bewegungsjournal', partsunion: 'Teil der WaWi', generic: 'Je Lager-/WaWi-Modul', excel: 'Nur mit Eigenlogik' },
    { criterion: 'Altteilpfand und Teilehandelslogik', partsunion: 'Branchenspezifisch', generic: 'Konfiguration / Erweiterung', excel: 'Manuelle Regeln' },
    { criterion: 'Digitale Anfragekanäle', partsunion: 'Optional im Verkaufsprozess', generic: 'Schnittstelle / Erweiterung', excel: 'Separater Kanal' },
    { criterion: 'DACH-Faktura- und Exportpfade', partsunion: 'Vorbereitet; Abnahme nötig', generic: 'Je Edition und Anbieter', excel: 'Nicht systemseitig' },
    { criterion: 'B2B-Kundenportal', partsunion: 'Pilot / Onboarding', generic: 'Je Edition und Anbieter', excel: 'Nicht enthalten' },
    { criterion: 'Einführung und Migration', partsunion: 'Nach Prozess- und Datencheck', generic: 'Projektabhängig', excel: 'Sofort, ohne Prozesskontrolle' },
];

function CellView({ value }: { value: Cell }) {
    if (value === 'yes') return <Check className="h-4 w-4 text-primary mx-auto" aria-label="Ja" />;
    if (value === 'partial') return <Minus className="h-4 w-4 text-warning mx-auto" aria-label="Teilweise" />;
    if (value === 'no') return <X className="h-4 w-4 text-muted-foreground/50 mx-auto" aria-label="Nein" />;
    return <span className="text-xs text-muted-foreground">{value}</span>;
}

export default function VergleichPage() {
    return (
        <div className="pt-24 pb-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(29,111,232,0.08),transparent_55%)] -z-10" />
            <div className="fixed inset-0 grid-pattern opacity-15 -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border text-xs font-medium text-muted-foreground mb-5">
                        <Scale className="h-3 w-3" />
                        Vergleich der Systemansätze
                    </span>
                    <h1
                        className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-5"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.035em', lineHeight: 1.05 }}
                    >
                        ERP für den Teilehandel:<br />
                        <span className="text-gradient">Welcher Ansatz passt?</span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        Branchenspezifisches ERP, generische ERP/WaWi und Tabellen lösen unterschiedliche
                        Aufgaben. Die Matrix zeigt den typischen Einführungs- und Integrationsbedarf.
                    </p>
                </div>

                {/* Comparison table */}
                <div className="max-w-5xl mx-auto overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
                    <table className="w-full min-w-[640px] text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/60">
                                <th className="text-left font-medium text-muted-foreground p-4 w-[40%]">Kriterium</th>
                                <th className="p-4 text-center">
                                    <span className="block text-foreground font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Partsunion</span>
                                    <span className="block text-[11px] text-primary mt-0.5">branchenspezifisch</span>
                                </th>
                                <th className="p-4 text-center">
                                    <span className="block text-foreground/80 font-medium">Generische ERP/WaWi</span>
                                    <span className="block text-[11px] text-muted-foreground mt-0.5">z. B. weclapp, Xentral, JTL</span>
                                </th>
                                <th className="p-4 text-center">
                                    <span className="block text-foreground/80 font-medium">Excel &amp; Insellösungen</span>
                                    <span className="block text-[11px] text-muted-foreground mt-0.5">manuell</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={row.criterion} className={i < rows.length - 1 ? 'border-b border-border' : ''}>
                                    <td className="p-4 text-foreground/90">{row.criterion}</td>
                                    <td className="p-4 text-center bg-primary/[0.04]"><CellView value={row.partsunion} /></td>
                                    <td className="p-4 text-center"><CellView value={row.generic} /></td>
                                    <td className="p-4 text-center"><CellView value={row.excel} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-center text-xs text-muted-foreground max-w-3xl mx-auto mt-5 leading-relaxed">
                    Kategorie-Vergleich typischer Systemansätze, keine Bewertung einzelner Anbieter.
                    Der konkrete Funktionsumfang hängt immer von Edition, Konfiguration, Integrationen und Betriebsmodell ab.
                </p>

                {/* Why Partsunion */}
                <div className="max-w-3xl mx-auto mt-20 md:mt-24">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border text-xs font-medium text-muted-foreground mb-5">
                            <Layers3 className="h-3 w-3 text-primary" />
                            Partsunion-Schwerpunkt
                        </div>
                        <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
                            Branchenmodell mit kontrollierter Einführung.
                        </h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            { t: 'Branchenspezifische Geschäftsobjekte', d: 'Fahrzeuge, OE-Referenzen, Fitment, Artikel, Bestände und Belege bleiben miteinander verbunden.' },
                            { t: 'Durchgängige Kernprozesse', d: 'Verkauf, Beschaffung, Lager und Finanzen arbeiten auf derselben Datenbasis.' },
                            { t: 'Kontrollierte Einführung', d: 'Migration, Rollen, Nummernkreise, Steuerprofil und Schnittstellen werden vor Produktivstart abgenommen.' },
                            { t: 'Optionale Eingangskanäle', d: 'Theke und ERP-Kern funktionieren eigenständig; digitale Kanäle ergänzen denselben Verkaufsprozess.' },
                        ].map((x) => (
                            <div key={x.t} className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <h3 className="text-sm font-semibold text-foreground">{x.t}</h3>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed pl-6">{x.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto mt-20 md:mt-24">
                    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
                        Häufige Fragen zum Vergleich
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((f) => (
                            <div key={f.q} className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] p-5">
                                <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">{f.q}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-20 md:mt-24">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
                        Prüfen Sie den Systemfit an Ihren Prozessen.
                    </h2>
                    <p className="text-muted-foreground mb-7 max-w-md mx-auto text-sm md:text-base">
                        Wir gehen Rollen, Belegketten, Lagerstruktur und typische Teilefälle gemeinsam durch.
                    </p>
                    <Link
                        href="/#beratung"
                        className="inline-flex items-center gap-2 h-12 px-6 rounded-lg gradient-primary text-primary-foreground text-sm font-medium shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] hover:opacity-95 transition-opacity group"
                    >
                        Beratungstermin sichern
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
