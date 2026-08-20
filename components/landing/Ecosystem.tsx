'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, LineChart, Globe2, Truck } from 'lucide-react';
import { analyticsHighlights, portalFeatures } from '@/lib/platform-data';

/**
 * Ecosystem — was über den Kern hinausgeht, in einer Reihe:
 * Business Intelligence (live), B2B-Kundenportal (live) und
 * Großhändler-Konnektoren (klar als Roadmap markiert).
 * Ersetzt die früheren Sektionen IntelligencePortal + Wholesalers.
 *
 * Honesty (UWG §5): Konnektoren sind Roadmap — Badge + Fußnote sagen das
 * ausdrücklich; keine „live/angebunden"-Formulierungen.
 */

const wholesalerNames = [
    'WM SE', 'TecAlliance', 'Intercars', 'Stahlgruber', 'Trost',
    'Autoprofi', 'Motoprofi', 'Wessels+Müller', 'Matthies', 'Coler', 'PV Automotive',
];

export function Ecosystem() {
    return (
        <section aria-label="Auswertungen, Kundenportal und Anbindungen" className="py-20 md:py-28 bg-background">
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
                        Mehr als der Kern
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                    >
                        Auswertungen, Kundenportal, Anbindungen.
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground">
                        Entscheidungen aus echten Belegen statt Bauchgefühl, ein White-Label-Portal für Ihre
                        Geschäftskunden — und Konnektoren zu Ihren Großhändlern in Entwicklung.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* BI */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        viewport={{ once: true }}
                        className="flex flex-col rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6 md:p-7"
                    >
                        <div className="flex items-center gap-2.5 mb-4">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-accent text-primary">
                                <LineChart className="h-4 w-4" />
                            </span>
                            <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                                Live
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                            40+ Auswertungen
                        </h3>
                        <p className="text-sm text-muted-foreground mb-5">
                            Business Intelligence aus Ihren echten Belegen.
                        </p>
                        <ul className="space-y-3 mb-5">
                            {analyticsHighlights.slice(0, 3).map((a) => (
                                <li key={a.label} className="flex gap-2.5">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                                    <span className="min-w-0">
                                        <span className="block text-sm font-medium text-foreground leading-tight">{a.label}</span>
                                        <span className="block text-xs text-muted-foreground leading-snug mt-0.5">{a.detail}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-auto text-xs text-muted-foreground leading-relaxed">
                            Wo keine Daten vorliegen, steht „—“ statt einer erfundenen Zahl.
                        </p>
                    </motion.div>

                    {/* B2B-Portal */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                        viewport={{ once: true }}
                        className="flex flex-col rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6 md:p-7"
                    >
                        <div className="flex items-center gap-2.5 mb-4">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-accent text-primary">
                                <Globe2 className="h-4 w-4" />
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-accent px-2.5 py-0.5 text-[11px] font-medium text-primary">
                                <ArrowUpRight className="h-3 w-3" />
                                Pilot · Freischaltung im Onboarding
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                            White-Label B2B-Portal
                        </h3>
                        <p className="text-sm text-muted-foreground mb-5">
                            Ihre Geschäftskunden bestellen selbst — mit ihren Preisen, unter Ihrer Marke.
                        </p>
                        <ul className="space-y-3 mb-5">
                            {portalFeatures.slice(0, 3).map((p) => {
                                const Icon = p.icon;
                                return (
                                    <li key={p.label} className="flex gap-2.5">
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-primary/15 bg-accent">
                                            <Icon className="h-3 w-3 text-primary" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-sm font-medium text-foreground leading-tight">{p.label}</span>
                                            <span className="block text-xs text-muted-foreground leading-snug mt-0.5">{p.detail}</span>
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="mt-auto">
                            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                                Portal-Bestellungen sind unverbindliche Anfragen und buchen keinen Bestand.
                            </p>
                            <Link
                                href="/features/b2b-kundenportal-white-label"
                                className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                            >
                                Mehr zum Kundenportal
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Großhändler-Konnektoren (Roadmap) */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.16 }}
                        viewport={{ once: true }}
                        className="flex flex-col rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6 md:p-7 md:col-span-2 lg:col-span-1"
                    >
                        <div className="flex items-center gap-2.5 mb-4">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-accent text-primary">
                                <Truck className="h-4 w-4" />
                            </span>
                            <span className="inline-flex items-center rounded-full border border-warning/30 bg-warning/5 px-2.5 py-0.5 text-[11px] font-medium text-warning">
                                In Entwicklung
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                            Großhändler-Konnektoren
                        </h3>
                        <p className="text-sm text-muted-foreground mb-5">
                            Preise, Verfügbarkeit und Bestellungen direkt aus der WaWi — WM SE hat Priorität,
                            weitere folgen.
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                            {wholesalerNames.map((n) => (
                                <span key={n} className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                                    {n}
                                </span>
                            ))}
                        </div>
                        <p className="mt-auto text-xs text-muted-foreground leading-relaxed">
                            Noch nicht live. Welche Anbindung Sie zuerst brauchen — auch regionale Lieferanten —
                            priorisieren wir gemeinsam im Onboarding.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
