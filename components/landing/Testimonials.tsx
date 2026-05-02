'use client';

import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Clock, MessageSquare } from 'lucide-react';

interface Testimonial {
    name: string;
    role: string;
    company: string;
    location: string;
    quote: string;
    metric: string;
    metricLabel: string;
    metricIcon: React.ReactNode;
    initials: string;
    accentColor: string;
}

const testimonials: Testimonial[] = [
    {
        name: 'Mehmet K.',
        role: 'Geschäftsführer',
        company: 'AutoTech Parts GmbH',
        location: 'Berlin',
        quote: 'Seit wir Partsunion nutzen, bearbeiten wir Kundenanfragen in Sekunden statt Minuten. Der WhatsApp-Bot spricht Türkisch und Deutsch — perfekt für unsere Kundschaft. Die OEM-Ermittlung allein spart uns täglich 2-3 Stunden.',
        metric: '-73%',
        metricLabel: 'Bearbeitungszeit',
        metricIcon: <Clock className="h-4 w-4" />,
        initials: 'MK',
        accentColor: 'from-blue-500 to-cyan-500',
    },
    {
        name: 'Thomas R.',
        role: 'Inhaber',
        company: 'Rheinland Autoteile',
        location: 'Köln',
        quote: 'Die automatische Preisermittlung über verschiedene Lieferanten hat unsere Margen um fast 15% verbessert. Und meine Mitarbeiter können sich endlich auf die wirklich komplexen Fälle konzentrieren, statt Standardteile nachzuschlagen.',
        metric: '+15%',
        metricLabel: 'Marge',
        metricIcon: <TrendingUp className="h-4 w-4" />,
        initials: 'TR',
        accentColor: 'from-emerald-500 to-teal-500',
    },
    {
        name: 'Marta W.',
        role: 'Betriebsleiterin',
        company: 'M&W Fahrzeugteile',
        location: 'Hamburg',
        quote: 'Unsere polnischen Kunden können jetzt direkt auf Polnisch bestellen. Die Bestellungen kommen vollständig ins Dashboard — mit Fahrzeug, Teilenummer und bestem Preis. Das Onboarding hat keine 24 Stunden gedauert.',
        metric: '+40%',
        metricLabel: 'Bestellungen',
        metricIcon: <MessageSquare className="h-4 w-4" />,
        initials: 'MW',
        accentColor: 'from-violet-500 to-purple-500',
    },
];

function StarRating() {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 md:py-32 relative">
            {/* Background pattern */}
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full glass mb-6">
                        <Quote className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">
                            Kundenstimmen
                        </span>
                    </div>
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Händler vertrauen auf
                        <span className="text-gradient"> Partsunion</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        So profitieren Autoteilehändler in ganz Deutschland von unserer KI-Plattform.
                    </p>
                </motion.div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="card-hover glass rounded-2xl p-6 md:p-8 flex flex-col"
                        >
                            {/* Star Rating */}
                            <StarRating />

                            {/* Quote */}
                            <div className="mt-5 mb-6 flex-1">
                                <Quote className="h-6 w-6 text-primary/30 mb-2" />
                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                    {testimonial.quote}
                                </p>
                            </div>

                            {/* Metric Badge */}
                            <div className="mb-6 p-3 rounded-lg bg-muted/50 border border-border/50 flex items-center gap-3">
                                <div className={`p-2 rounded-md bg-gradient-to-r ${testimonial.accentColor} text-white`}>
                                    {testimonial.metricIcon}
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-foreground font-mono">
                                        {testimonial.metric}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {testimonial.metricLabel}
                                    </div>
                                </div>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${testimonial.accentColor} flex items-center justify-center text-white font-bold text-sm`}>
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {testimonial.role} · {testimonial.company}
                                    </div>
                                    <div className="text-xs text-muted-foreground/60">
                                        {testimonial.location}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Social proof bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 text-center"
                >
                    <div>
                        <div className="text-2xl md:text-3xl font-bold text-gradient font-mono">95%+</div>
                        <div className="text-xs text-muted-foreground mt-1">OEM-Erkennungsrate</div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-bold text-gradient font-mono">&lt; 8s</div>
                        <div className="text-xs text-muted-foreground mt-1">Ø Antwortzeit</div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-bold text-gradient font-mono">5</div>
                        <div className="text-xs text-muted-foreground mt-1">Sprachen</div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-bold text-gradient font-mono">24/7</div>
                        <div className="text-xs text-muted-foreground mt-1">Verfügbarkeit</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
