'use client';

import { motion } from 'framer-motion';
import { ScanLine, ShoppingCart, Warehouse, Receipt } from 'lucide-react';

/**
 * ProcessSection — „So funktioniert's" in vier nummerierten Schritten.
 * Linksbündiger Header, horizontale Schritt-Leiste mit Verbindungslinie.
 */

const steps = [
    {
        icon: ScanLine,
        title: 'Teil identifizieren',
        detail: 'Fahrzeug, VIN, HSN/TSN sowie OE- und Hersteller-Nummern werden in einem Vorgang zusammengeführt.',
    },
    {
        icon: ShoppingCart,
        title: 'Bestand & Bezug prüfen',
        detail: 'Eigener Bestand, Reservierungen, Bezugsquellen und Einkaufskonditionen bilden die Grundlage für die Entscheidung.',
    },
    {
        icon: Warehouse,
        title: 'Beschaffen & ausführen',
        detail: 'Bestellung, Wareneingang, Lagerbewegung, Kommissionierung und Lieferung arbeiten auf demselben Bestandsstand.',
    },
    {
        icon: Receipt,
        title: 'Verkaufen & abrechnen',
        detail: 'Angebot, Auftrag, Lieferschein, Rechnung und Finanzbuchung bleiben als nachvollziehbare Belegkette verbunden.',
    },
];

export function ProcessSection() {
    return (
        <section aria-label="So funktioniert Partsunion" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header — linksbündig */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mb-12 md:mb-16"
                >
                    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary mb-3">
                        So funktioniert&apos;s
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                    >
                        Ein Prozess — vom Fahrzeug bis zur Finanzbuchung.
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground">
                        Ob ein Bedarf an der Theke, im Vertrieb oder digital entsteht: Die weitere
                        Bearbeitung folgt einem kontrollierten ERP-Prozess ohne Medienbruch.
                    </p>
                </motion.div>

                {/* Schritt-Leiste */}
                <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                    {steps.map((step, i) => (
                        <motion.li
                            key={step.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Verbindungslinie (nur Desktop, nicht nach letztem Schritt) */}
                            {i < steps.length - 1 && (
                                <div aria-hidden className="hidden lg:block absolute top-5 left-14 right-0 h-px bg-border" />
                            )}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-accent text-primary">
                                    <step.icon className="h-4.5 w-4.5" />
                                </div>
                                <span className="font-mono text-xs font-semibold text-muted-foreground tabular-nums">
                                    0{i + 1}
                                </span>
                            </div>
                            <h3 className="text-base font-semibold text-foreground mb-1.5" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                                {step.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {step.detail}
                            </p>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
