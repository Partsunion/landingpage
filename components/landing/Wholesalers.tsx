'use client';

import { motion } from 'framer-motion';
import { Truck, Plug } from 'lucide-react';
import { BRAND_LOGOS } from '@/components/ui/BrandLogos';

/**
 * Wholesalers — roadmap tile grid of the supplier connectors we are building
 * for the WaWi module. The wholesaler question ("do you talk to my supplier?")
 * is a primary topic in the German parts trade.
 *
 * IMPORTANT (honesty / UWG §5): These connectors are on the roadmap, NOT yet
 * live. The section must therefore be framed as planned integrations, must not
 * claim a "verified partner" relationship with any named company, and must not
 * use present-tense "live"/"angebunden" wording. WM SE is the priority target.
 */

const wholesalers = [
    { name: 'WM SE',         note: 'Priorität — Preise, Bestand & Bestellung' },
    { name: 'TecAlliance',   note: 'TecDoc-Katalog & OE-Nummern' },
    { name: 'Intercars',     note: 'Bestand & Bestellung' },
    { name: 'Stahlgruber',   note: 'Preise & Verfügbarkeit' },
    { name: 'Trost',         note: 'Preise & Bestand' },
    { name: 'Autoprofi',     note: 'Großhandelspreise' },
    { name: 'Motoprofi',     note: 'Spezial-Sortiment' },
    { name: 'Wessels+Müller', note: 'Filial-Sortiment' },
    { name: 'Matthies',      note: 'Bestand & Bestellung' },
    { name: 'Coler',         note: 'Großhandelspreise' },
    { name: 'PV Automotive', note: 'Sortiment-Sync' },
    { name: 'Auf Anfrage',   note: 'Ihr Lieferant fehlt? Sagen Sie uns, welcher zuerst.', cta: true },
];

export function Wholesalers() {
    return (
        <section
            aria-label="Lieferanten- und Großhändler-Integrationen"
            className="relative py-20 md:py-28 border-t border-border/40"
        >
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-border/60 text-xs font-medium text-muted-foreground mb-5">
                            <Truck className="h-3 w-3" />
                            WaWi-Anbindungen · Roadmap
                        </span>
                        <h2
                            className="text-3xl md:text-5xl font-semibold mb-5"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
                        >
                            Konnektoren für Ihre <span className="text-gradient">Großhändler</span>.
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground">
                            Wir entwickeln Anbindungen für die führenden Teile-Großhändler im
                            deutschsprachigen Raum — für Preise, Verfügbarkeit und Bestellungen direkt aus
                            der WaWi. WM SE hat Priorität, weitere folgen. Welche Anbindung Sie zuerst
                            brauchen, stimmen wir im Onboarding ab.
                        </p>
                    </motion.div>
                </div>

                {/* Wholesaler grid — 2/3/4 columns responsive */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto"
                >
                    {wholesalers.map((w, i) => (
                        <motion.div
                            key={w.name}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}
                            viewport={{ once: true }}
                            className={`group relative rounded-xl border bg-[rgba(15,23,42,0.4)] p-4 md:p-5 transition-colors ${
                                w.cta
                                    ? 'border-primary/30 hover:border-primary/60'
                                    : 'border-border/60 hover:border-border'
                            }`}
                        >
                            {(() => {
                                const Logo = BRAND_LOGOS[w.name];
                                return (
                                    <div className="flex items-center justify-between gap-2 mb-3 h-8">
                                        {Logo ? (
                                            <Logo className="h-7 w-auto text-foreground/90 max-w-[140px]" />
                                        ) : (
                                            <div
                                                className="text-sm md:text-base font-semibold leading-tight text-foreground"
                                                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
                                            >
                                                {w.name}
                                            </div>
                                        )}
                                        {w.cta && (
                                            <Plug
                                                className="h-4 w-4 shrink-0 text-primary"
                                                aria-hidden
                                            />
                                        )}
                                    </div>
                                );
                            })()}
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                {w.note}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footnote */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center text-xs text-muted-foreground mt-10 max-w-xl mx-auto"
                >
                    Diese Anbindungen befinden sich in Entwicklung bzw. in Planung — sie sind noch nicht
                    live. Auch regionale Lieferanten und proprietäre Schnittstellen können wir im
                    Onboarding priorisieren.
                </motion.p>
            </div>
        </section>
    );
}
