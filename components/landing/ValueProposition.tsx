'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Clock, FileText, TrendingUp, Users } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { OEMVisual } from '@/components/features/OEMVisual';
import { SpeedVisual } from '@/components/features/SpeedVisual';
import { ScalabilityVisual } from '@/components/features/ScalabilityVisual';

// ─────────────────────────────────────────────────────────────────────────────
// Bento tile primitive
// ─────────────────────────────────────────────────────────────────────────────

interface TileProps {
    slug: string;
    icon: typeof ShieldCheck;
    eyebrow: string;
    title: string;
    body: string;
    children?: React.ReactNode;
    className?: string;
    /** When true, the visual fills the lower half (large tile). */
    largeVisual?: boolean;
}

function Tile({ slug, icon: Icon, eyebrow, title, body, children, className, largeVisual }: TileProps) {
    return (
        <SpotlightCard className={className}>
            <Link
                href={`/features/${slug}`}
                className="flex h-full flex-col p-6 md:p-7 lg:p-8"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary/80">
                        {eyebrow}
                    </span>
                </div>

                <h3
                    className="text-xl md:text-2xl font-semibold mb-3 text-foreground"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                >
                    {title}
                </h3>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                    {body}
                </p>

                {children && (
                    <div className={largeVisual ? 'mt-auto pt-8' : 'mt-6'}>
                        {children}
                    </div>
                )}

                <div className="mt-6 inline-flex items-center text-xs font-medium text-foreground/70 transition-colors group-hover/spot:text-primary">
                    Details ansehen
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/spot:translate-x-0.5" />
                </div>
            </Link>
        </SpotlightCard>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────

export function ValueProposition() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full border border-border/60 text-xs font-medium text-muted-foreground mb-5">
                            Warum Partsunion
                        </span>
                        <h2
                            className="text-3xl md:text-5xl font-semibold mb-5"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
                        >
                            Das ganze Tagesgeschäft —{' '}
                            <span className="text-gradient">in einer Plattform.</span>
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground">
                            Sechs Bausteine, die zusammen Ihren Sales-Workspace ersetzen.
                        </p>
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
                >
                    {/* Tile 1 — LARGE 2x2 — OEM (hero feature) */}
                    <Tile
                        slug="sinkende-retouren"
                        icon={ShieldCheck}
                        eyebrow="OEM-Pipeline"
                        title="Das richtige Teil beim ersten Mal."
                        body="Mehrstufige KI-Pipeline gleicht jede Anfrage parallel gegen Ihre eigene Datenbank, Lieferanten-Kataloge und mehrere Web-Quellen ab. Konfidenz-Prüfung und Kreuzvalidierung für maximale Treffsicherheit — mit dem Ziel einer deutlich niedrigeren Retourenquote."
                        className="md:col-span-2 md:row-span-2 min-h-[420px]"
                        largeVisual
                    >
                        <div className="relative h-[200px] md:h-[260px] -mx-2 md:-mx-4 -mb-2 md:-mb-4 overflow-hidden rounded-xl border border-border/40 bg-[rgba(10,15,26,0.5)] p-4">
                            <OEMVisual />
                        </div>
                    </Tile>

                    {/* Tile 2 — WIDE 2x1 — Speed */}
                    <Tile
                        slug="geschwindigkeit"
                        icon={Zap}
                        eyebrow="Geschwindigkeit"
                        title="8 Sekunden bis zum Angebot."
                        body="Drei Angebote aus verschiedenen Preisgruppen parallel — statt 15 Minuten Tippen."
                        className="md:col-span-2"
                    >
                        <div className="relative h-[120px] -mx-2 -mb-2 overflow-hidden rounded-xl border border-border/40 bg-[rgba(10,15,26,0.5)] p-3">
                            <SpeedVisual />
                        </div>
                    </Tile>

                    {/* Tile 3 — SMALL 1x1 — 24/7 */}
                    <Tile
                        slug="24-7-einsatzbereit"
                        icon={Clock}
                        eyebrow="Always-on"
                        title="24/7 Einsatzbereit."
                        body="Angebote um 3 Uhr nachts. Wochenende. Feiertag. Der Bot bleibt wach."
                        className="md:col-span-1"
                    />

                    {/* Tile 4 — SMALL 1x1 — Auto-Rechnung */}
                    <Tile
                        slug="automatische-rechnungserstellung"
                        icon={FileText}
                        eyebrow="Faktura"
                        title="Rechnung in einem Klick."
                        body="Auftrag → Rechnung → Lieferschein → Zahlungslink. Ohne Tippen."
                        className="md:col-span-1"
                    />

                    {/* Tile 5 — WIDE 2x1 — Skalierbarkeit */}
                    <Tile
                        slug="skalierbarkeit"
                        icon={TrendingUp}
                        eyebrow="Skalierbarkeit"
                        title="3× Anfragenvolumen — ohne neuen Mitarbeiter."
                        body="Konstante Qualität bei jeder Anfrage. Keine Krankheits- oder Urlaubsausfälle, keine Einarbeitung."
                        className="md:col-span-2"
                    >
                        <div className="relative h-[100px] -mx-2 -mb-2 overflow-hidden rounded-xl border border-border/40 bg-[rgba(10,15,26,0.5)] p-3">
                            <ScalabilityVisual />
                        </div>
                    </Tile>

                    {/* Tile 6 — WIDE 2x1 — Team-Entlastung (no visual, copy-driven) */}
                    <Tile
                        slug="team-entlastung"
                        icon={Users}
                        eyebrow="Team"
                        title="Ihr Team macht das, wofür Sie es eingestellt haben."
                        body="Beratung. Vertrieb. Kundenbindung. Statt Fahrzeugscheine abzutippen und im Katalog zu suchen."
                        className="md:col-span-2"
                    />
                </motion.div>
            </div>
        </section>
    );
}
