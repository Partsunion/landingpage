'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { WAWIPreview } from '@/components/landing/WAWIPreview';
import {
    ArrowRight,
    PanelsTopLeft,
    Database,
    FileCheck2,
    Warehouse,
    Landmark,
} from 'lucide-react';

/**
 * Hero — Enterprise-ERP-Positionierung: links das Branchenversprechen, rechts
 * eine echte Produktansicht. WhatsApp bleibt ein Eingangskanal, ist aber nicht
 * mehr das Produktversprechen oder das dominante Hero-Visual.
 */

const standards = [
    { icon: Database, label: 'Teile- & Fahrzeugdaten', sub: 'OEM · Fitment · Querverweise' },
    { icon: Warehouse, label: 'Warenwirtschaft', sub: 'ATP · Bewegungen · Inventur' },
    { icon: FileCheck2, label: 'Durchgängige Belege', sub: 'Angebot · Auftrag · Rechnung' },
    { icon: Landmark, label: 'Finanzen & Compliance', sub: 'DATEV · TSE · E-Rechnung' },
];

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background">
            {/* Dezentes Blaulicht oben rechts, feines Raster */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(29,111,232,0.08),transparent_50%)] -z-10" />
            <div className="absolute inset-x-0 top-0 h-[520px] grid-pattern opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)] -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid min-w-0 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-32 pb-16 md:pt-40 md:pb-20">
                    {/* Links: Value Proposition */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="min-w-0 lg:col-span-7 max-w-2xl"
                    >
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary mb-5">
                            Partsunion ERP
                        </p>

                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.07] text-foreground mb-6"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
                        >
                            Enterprise-ERP für den Autoteilehandel.
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                            Teileidentifikation, Beschaffung, Lager, Verkauf und Finanzen auf einer
                            gemeinsamen Plattform — mit durchgängigen Belegketten, verlässlichen
                            Zuständen und rollenbasierten Arbeitsplätzen.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
                            <button
                                onClick={() => document.getElementById('beratung')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group inline-flex items-center justify-center h-13 px-7 rounded-xl text-base font-medium text-primary-foreground bg-primary hover:bg-primary-hover shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                Beratungstermin sichern
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                            <Link
                                href="/plattform"
                                className="group inline-flex items-center justify-center gap-2 h-13 px-6 rounded-xl border border-border bg-card text-base font-medium text-foreground hover:border-border-hover hover:bg-muted transition-colors"
                            >
                                <PanelsTopLeft className="h-5 w-5 text-primary" />
                                Plattform ansehen
                            </Link>
                        </div>

                        {/* Funktionsbelege statt nicht extern verifizierter Leistungskennzahlen */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-x-10 gap-y-4"
                        >
                            <div>
                                <div className="font-mono text-sm font-semibold text-foreground">VERKAUF → FINANZEN</div>
                                <div className="text-xs text-muted-foreground mt-0.5 max-w-[180px] leading-snug">
                                    durchgängige Belegkette
                                </div>
                            </div>
                            <div className="h-10 w-px bg-border hidden sm:block" aria-hidden />
                            <div>
                                <div className="font-mono text-sm font-semibold text-foreground">ATP & LAGERLEDGER</div>
                                <div className="text-xs text-muted-foreground mt-0.5 max-w-[180px] leading-snug">
                                    ein zentraler Bestandsstand
                                </div>
                            </div>
                            <div className="h-10 w-px bg-border hidden sm:block" aria-hidden />
                            <div>
                                <div className="font-mono text-sm font-semibold text-foreground">ROLLEN & AUDIT</div>
                                <div className="text-xs text-muted-foreground mt-0.5 max-w-[180px] leading-snug">
                                    kontrollierte, nachvollziehbare Abläufe
                                </div>
                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-8 text-sm text-muted-foreground"
                        >
                            Unverbindlich · Produktvorstellung mit Ihren realen Abläufen möglich
                        </motion.p>
                    </motion.div>

                    {/* Rechts: das Produkt — operative ERP-Arbeitsfläche */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="min-w-0 lg:col-span-5"
                    >
                        <div className="relative min-w-0 mx-auto max-w-[520px]">
                            {/* Weicher Blauschein hinter der Produktansicht */}
                            <div
                                aria-hidden
                                className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(29,111,232,0.10),transparent_70%)] -z-10"
                            />
                            <WAWIPreview />
                            <p className="mt-3 text-center text-xs text-muted-foreground">
                                Beispielansicht mit Demo-Daten: Lager- und Beschaffungssteuerung.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Standards-Zeile — schmal, ersetzt die frühere Partner-Sektion */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="border-t border-border py-6 md:py-7"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
                        {standards.map((s) => (
                            <div key={s.label} className="flex items-center gap-3 min-w-0">
                                <s.icon className="h-4.5 w-4.5 shrink-0 text-muted-foreground" aria-hidden />
                                <div className="min-w-0">
                                    <div className="text-[13px] font-medium text-foreground leading-tight truncate">{s.label}</div>
                                    <div className="text-[11px] text-muted-foreground leading-tight truncate">{s.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
