'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Subtle dark background with a single spotlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/15 blur-[160px] rounded-full -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2
                        className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-6"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
                    >
                        Bereit, 12 Minuten pro Anfrage<br />
                        <span className="text-gradient">zurückzugewinnen?</span>
                    </h2>

                    <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
                        30-Minuten-Termin. Wir zeigen Partsunion live an Ihren echten Fahrzeugen und Teilen.
                    </p>

                    <Button
                        size="lg"
                        className="h-14 px-8 text-base font-medium gradient-primary shadow-lg shadow-primary/30 group"
                        onClick={() => document.getElementById('beratung')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Beratungstermin sichern
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

