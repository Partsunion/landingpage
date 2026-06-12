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
        label: 'Anfrage bearbeiten',
        before: '15 Min',
        beforeNote: 'Manuelles Abtippen aus WhatsApp ins ERP',
        after: '8 Sek',
        afterNote: 'KI liest Fahrzeugschein-Foto, matcht OEM',
    },
    {
        label: 'Retourenquote',
        before: 'bis ~20 %',
        beforeNote: 'Falsche Teile durch HSN/TSN-Tippfehler',
        after: 'unter 5 %',
        afterNote: 'Präzise OEM-Identifikation statt manueller Eingabe (Zielwert)',
    },
    {
        label: 'Erreichbarkeit',
        before: '8 h / Tag',
        beforeNote: 'Nur während Öffnungszeiten',
        after: '24 / 7',
        afterNote: 'WhatsApp-Bot antwortet auch nachts',
    },
    {
        label: 'Angebote pro Tag',
        before: '~30',
        beforeNote: 'Begrenzt durch Mitarbeiterkapazität',
        after: '500+',
        afterNote: 'Parallel-Verarbeitung, unbegrenzt skalierbar',
    },
    {
        label: 'Bestand-Sync',
        before: 'Manuell',
        beforeNote: 'Fehleranfällig, mit Stunden Versatz',
        after: 'Echtzeit',
        afterNote: 'eBay · Webshop · Theke synchron',
    },
];

export function BeforeAfter() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-14 md:mb-16 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full border border-border/60 text-xs font-medium text-muted-foreground mb-5">
                            Der Unterschied
                        </span>
                        <h2
                            className="text-3xl md:text-5xl font-semibold mb-5"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
                        >
                            Was sich konkret <span className="text-gradient">verändert.</span>
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground">
                            Fünf typische Kennzahlen im Sales-Geschäft eines Teilehändlers — als Modellrechnung
                            auf Basis von Branchenwerten und internen Systemtests.
                        </p>
                    </motion.div>
                </div>

                {/* Two-column comparison */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Column headers */}
                    <div className="grid grid-cols-2 gap-3 md:gap-5 mb-3">
                        <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border/60 bg-[rgba(15,23,42,0.3)]">
                            <X className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                            <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                Ohne Partsunion
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
                    <div className="rounded-2xl border border-border/60 bg-[rgba(15,23,42,0.4)] overflow-hidden">
                        {rows.map((row, idx) => (
                            <motion.div
                                key={row.label}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.06 }}
                                viewport={{ once: true }}
                                className={idx > 0 ? 'border-t border-border/60' : ''}
                            >
                                {/* Label row */}
                                <div className="px-4 md:px-6 pt-4 pb-1">
                                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                        {row.label}
                                    </span>
                                </div>

                                {/* Before / After grid */}
                                <div className="grid grid-cols-2 divide-x divide-border/40">
                                    <div className="px-4 md:px-6 py-4">
                                        <div
                                            className="text-2xl md:text-3xl font-semibold text-foreground/60 mb-1 tabular-nums"
                                            style={{ fontFamily: 'var(--font-mono)' }}
                                        >
                                            {row.before}
                                        </div>
                                        <div className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                                            {row.beforeNote}
                                        </div>
                                    </div>
                                    <div className="px-4 md:px-6 py-4 bg-primary/[0.02]">
                                        <div
                                            className="text-2xl md:text-3xl font-semibold text-primary mb-1 tabular-nums"
                                            style={{ fontFamily: 'var(--font-mono)' }}
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

                    {/* Closing CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <p className="text-xs text-muted-foreground/70 mb-5 max-w-xl mx-auto leading-relaxed">
                            Die „Mit Partsunion"-Werte sind illustrative Zielgrößen auf Basis von
                            Branchen-Benchmarks und internen Systemtests — keine zugesicherten Ergebnisse.
                            Partsunion befindet sich im Markteintritt; belastbare Kundenkennzahlen liegen noch nicht vor.
                        </p>
                        <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                            Wir rechnen Ihr persönliches Einsparpotenzial im Beratungstermin gemeinsam durch — mit Ihren echten Zahlen.
                        </p>
                        <a
                            href="#beratung"
                            className="inline-flex items-center gap-2 py-3 px-6 rounded-lg gradient-primary text-white text-sm font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group"
                        >
                            Beratungstermin sichern
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
