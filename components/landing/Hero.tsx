'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { AnimatedHeadline } from '@/components/ui/AnimatedHeadline';
import { Counter } from '@/components/ui/Counter';
import { DashboardPreview } from '@/components/landing/DashboardPreview';
import { ArrowRight, Sparkles, PlayCircle } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
            {/* Editorial background: subtle vignette + single soft spotlight */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(59,130,246,0.10),transparent_55%)] -z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background -z-10" />

            {/* Hairline grid — much subtler than before */}
            <div className="absolute inset-0 grid-pattern opacity-20 -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full glass mb-8 border border-primary/20">
                            <Sparkles className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium text-foreground/90">
                                KI-Automatisierung für den Teilehandel
                            </span>
                        </div>

                        {/* Hero Headline — word-stagger reveal */}
                        <AnimatedHeadline
                            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 leading-[1.05]"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
                            delay={0.15}
                        >
                            Vom Fahrzeugschein-Foto zum fertigen Angebot in <span className="text-gradient">8 Sekunden.</span>
                        </AnimatedHeadline>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                            Partsunion liest, matcht und beantwortet WhatsApp-Anfragen automatisch — damit Ihr Team sich auf die Fälle konzentriert, die wirklich Hände brauchen.
                        </p>

                        {/* Inline Stats — 2 with provenance, animated counters */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mb-10 text-sm"
                        >
                            <div className="flex items-baseline gap-2">
                                <Counter
                                    to={97}
                                    suffix="%"
                                    className="font-mono text-xl md:text-2xl font-semibold text-foreground tabular-nums"
                                />
                                <span className="text-muted-foreground">OEM-Trefferquote · interne Systemtests (Zielwert)</span>
                            </div>
                            <span className="hidden md:block h-1 w-1 rounded-full bg-border" aria-hidden />
                            <div className="flex items-baseline gap-2">
                                <Counter
                                    to={8}
                                    suffix=" Sek"
                                    className="font-mono text-xl md:text-2xl font-semibold text-foreground tabular-nums"
                                />
                                <span className="text-muted-foreground">statt 15&nbsp;Min pro Anfrage</span>
                            </div>
                        </motion.div>

                        {/* CTA — magnetic primary + inline demo link */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-5"
                        >
                            <MagneticButton
                                onClick={() => document.getElementById('beratung')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group inline-flex items-center justify-center h-14 px-8 rounded-lg text-base font-medium text-primary-foreground gradient-primary shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-shadow"
                            >
                                Beratungstermin sichern
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </MagneticButton>
                            <Link
                                href="/live-demo"
                                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                            >
                                <PlayCircle className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                                Live-Demo ansehen
                            </Link>
                        </motion.div>

                        {/* Trust Indicator */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-8 text-sm text-muted-foreground"
                        >
                            Unverbindlich · Live-Demo mit Ihren echten Daten möglich
                        </motion.p>
                    </motion.div>
                </div>

                {/* Dashboard Preview — hidden on mobile (zu detailliert für kleine Screens, wirkt sonst quetschig) */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="hidden md:block mt-16 sm:mt-24 relative mx-auto max-w-6xl"
                >
                    {/* Glow behind preview */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent blur-3xl -z-10" />

                    <div className="relative glass rounded-2xl p-2 shadow-2xl">
                        <DashboardPreview />
                    </div>

                    {/* Floating status badge */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="absolute -bottom-4 -right-4 md:bottom-8 md:right-8 glass p-4 rounded-xl shadow-xl hidden md:flex items-center gap-3"
                    >
                        <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                        <div>
                            <div className="font-semibold text-sm">System Status</div>
                            <div className="text-xs text-muted-foreground">365 Tage operativ</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
