'use client';

import { motion } from 'framer-motion';
import { ArrowRight, X, Check } from 'lucide-react';

interface Row {
    label: string;
    before: string;
    beforeNote: string;
    after: string;
    afterNote: string;
}

const rows: Row[] = [
    {
        label: 'Teileidentifikation',
        before: 'Verteilte Suche',
        beforeNote: 'Fahrzeugdaten, Katalog und Notizen liegen in getrennten Werkzeugen',
        after: 'Ein Vorgang',
        afterNote: 'Fahrzeug, OE-Referenzen, Alternativen und Kundenbedarf bleiben verbunden',
    },
    {
        label: 'Verfügbarkeit & Bezug',
        before: 'Einzelprüfungen',
        beforeNote: 'Bestände, Reservierungen und Lieferquellen werden separat abgefragt',
        after: 'ATP & Beschaffung',
        afterNote: 'Verfügbarer Bestand, Reservierung und Bezugsquelle in derselben Entscheidung',
    },
    {
        label: 'Belegfluss',
        before: 'Mehrfach erfassen',
        beforeNote: 'Angebot, Auftrag, Lieferung und Rechnung werden erneut eingegeben',
        after: 'Durchgängige Kette',
        afterNote: 'Folgebelege übernehmen Positionen, Referenzen und dokumentierte Zustände',
    },
    {
        label: 'Bestandsführung',
        before: 'Momentaufnahme',
        beforeNote: 'Tabellen und Insellösungen zeigen unterschiedliche Bestandsstände',
        after: 'Bewegungsjournal',
        afterNote: 'Zugang, Abgang, Reservierung, Transfer und Inventur sind nachvollziehbar',
    },
    {
        label: 'Steuerung & Kontrolle',
        before: 'Zuruf & Wissen',
        beforeNote: 'Prioritäten, Freigaben und Ausnahmen hängen an einzelnen Mitarbeitern',
        after: 'Arbeitsvorräte & Rollen',
        afterNote: 'Status, Verantwortlichkeit, Freigabe und Historie sind im Vorgang sichtbar',
    },
];

export function BeforeAfter() {
    return (
        <section aria-label="Prozessvergleich" className="py-20 md:py-28 relative overflow-hidden bg-background">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header — linksbündig */}
                <div className="max-w-2xl mb-12 md:mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary mb-3">
                            Der operative Unterschied
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                        >
                            Von Insellösungen zu kontrollierten Abläufen.
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground">
                            Der Mehrwert entsteht nicht durch eine einzelne Automatik, sondern durch
                            gemeinsame Daten, klare Zustände und durchgängige Belege.
                        </p>
                    </motion.div>
                </div>

                {/* Two-column comparison */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="max-w-5xl"
                >
                    {/* Column headers */}
                    <div className="grid grid-cols-2 gap-3 md:gap-5 mb-3">
                        <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-card">
                            <X className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                            <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                Fragmentierte Systemlandschaft
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-primary/30 bg-primary/[0.04]">
                            <Check className="h-3.5 w-3.5 text-primary" aria-hidden />
                            <span className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                                Mit Partsunion
                            </span>
                        </div>
                    </div>

                    {/* Rows */}
                    <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
                        {rows.map((row, idx) => (
                            <motion.div
                                key={row.label}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.06 }}
                                viewport={{ once: true }}
                                className={idx > 0 ? 'border-t border-border' : ''}
                            >
                                {/* Label row */}
                                <div className="px-4 md:px-6 pt-4 pb-1">
                                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                        {row.label}
                                    </span>
                                </div>

                                {/* Before / After grid */}
                                <div className="grid grid-cols-2 divide-x divide-border">
                                    <div className="px-4 md:px-6 py-4">
                                        <div
                                            className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground/60 mb-1 tabular-nums break-words leading-tight"
                                            style={{ fontFamily: 'var(--font-display)' }}
                                        >
                                            {row.before}
                                        </div>
                                        <div className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                                            {row.beforeNote}
                                        </div>
                                    </div>
                                    <div className="px-4 md:px-6 py-4 bg-primary/[0.02]">
                                        <div
                                            className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-1 tabular-nums break-words leading-tight"
                                            style={{ fontFamily: 'var(--font-display)' }}
                                        >
                                            {row.after}
                                        </div>
                                        <div className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                                            {row.afterNote}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Weiterführender Link */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-8"
                    >
                        <a
                            href="#beratung"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                        >
                            Ihre heutigen Abläufe bilden wir im Beratungstermin konkret auf Partsunion ab
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
