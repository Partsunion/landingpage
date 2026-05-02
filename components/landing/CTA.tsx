'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Shield, Lock, Globe, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export function CTA() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 gradient-primary opacity-90" />

            {/* Animated glow */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/10 blur-[150px] rounded-full animate-pulse-glow" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/20 blur-[120px] rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />

            {/* Grid overlay */}
            <div className="absolute inset-0 grid-pattern opacity-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 backdrop-blur-sm mb-8">
                        <Sparkles className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium text-white/90">
                            Für Autoteilehändler entwickelt
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                        Weniger Stress.<br />Mehr Umsatz.
                    </h2>

                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        Lassen Sie sich unverbindlich zeigen, wie Partsunion Ihren Teilehandel
                        in 8 Sekunden statt 15 Minuten arbeiten lässt.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                                size="lg"
                                variant="secondary"
                                className="h-14 px-8 text-lg font-bold shadow-xl group"
                                onClick={() => document.getElementById('beratung')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Kostenloses Beratungsgespräch
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        <Link href="/features">
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-8 text-lg bg-transparent border-white/30 text-white hover:bg-white/10"
                            >
                                Features erkunden
                            </Button>
                        </Link>
                    </div>

                    {/* Trust badges — proper icons and labels */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10"
                    >
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                            <Shield className="h-4 w-4 text-white/50" />
                            <span>DSGVO-konform</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                            <Lock className="h-4 w-4 text-white/50" />
                            <span>End-to-End verschlüsselt</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                            <Globe className="h-4 w-4 text-white/50" />
                            <span>Made in Germany 🇩🇪</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                            <CheckCircle className="h-4 w-4 text-white/50" />
                            <span>Unverbindliche Beratung</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

