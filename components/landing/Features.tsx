'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getCoreFeatures } from '@/lib/feature-data';

export function Features() {
    const coreFeatures = getCoreFeatures().slice(0, 6);

    return (
        <section id="features" className="py-24 md:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1.5 px-4 rounded-full glass text-sm font-medium text-primary mb-4">
                            Kernfunktionen
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                            Alles was Sie <span className="text-gradient">brauchen</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Durchgängige Prozesse, belastbare Stammdaten und klare Arbeitsvorräte für den täglichen Autoteilehandel.
                        </p>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {coreFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`/features/${feature.slug}`}
                                    className="group block h-full"
                                >
                                    <div className="h-full p-6 lg:p-8 rounded-2xl glass border border-border hover:border-primary/30 transition-all card-hover">
                                        {/* Icon */}
                                        <div className="h-14 w-14 border border-primary/15 bg-accent rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                            <Icon size={28} />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                                            {feature.description}
                                        </p>

                                        {/* CTA */}
                                        <div className="flex items-center text-sm font-medium text-primary">
                                            <span>Details ansehen</span>
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* More Features Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/features"
                        className="inline-flex items-center gap-2 py-3 px-6 rounded-full glass border border-border hover:border-border-hover transition-all text-sm font-medium"
                    >
                        Alle Module ansehen
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
