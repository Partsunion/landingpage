'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Globe2, Server } from 'lucide-react';

/**
 * Trust-signal strip — shows only truthful, verifiable product attributes.
 *
 * IMPORTANT (honesty / UWG §5): This strip must NOT claim third-party
 * partnerships, certifications or "verified partner" relationships that do
 * not exist. The earlier version advertised a "Verifizierter TecDoc-Partner"
 * badge and a "Live-Anbindung an 10+ Großhändler" — both untrue at this
 * stage (wholesaler/TecAlliance integration is on the roadmap, not live).
 * Using a third party's name/logo to imply endorsement is irreführende
 * Werbung and a trademark risk. Only verifiable, first-party facts here:
 *   - EU-Hosting / DSGVO  (our infra is EU-hosted)
 *   - TSE / GoBD          (server-side TSE signing + GoBD-Lock are built)
 *   - Mandantentrennung   (row-level tenant isolation is enforced)
 *   - Made in Germany     (company + dev + support in DE)
 */

type SignalDef = {
    name: string;
    sub: string;
    icon: typeof ShieldCheck;
    accent: string;
};

const signals: SignalDef[] = [
    {
        name: 'DSGVO',
        sub: 'EU-Hosting, TLS-verschlüsselt',
        icon: Lock,
        accent: 'rgba(59, 130, 246, 0.9)',
    },
    {
        name: 'TSE & GoBD',
        sub: 'Serverseitige TSE-Signatur, GoBD-konforme Belege',
        icon: ShieldCheck,
        accent: 'rgba(148, 163, 184, 0.6)',
    },
    {
        name: 'Mandantentrennung',
        sub: 'Isolierte Daten je Händler (Row-Level Security)',
        icon: Server,
        accent: 'rgba(148, 163, 184, 0.6)',
    },
    {
        name: 'Made in Germany',
        sub: 'Entwicklung & Support aus DE',
        icon: Globe2,
        accent: 'rgba(148, 163, 184, 0.6)',
    },
];

export function PartnerStrip() {
    return (
        <section
            aria-label="Sicherheit, Fiskal und Datenschutz"
            className="relative py-16 md:py-20 border-y border-border/40 bg-[rgba(10,15,26,0.4)]"
        >
            <div className="container mx-auto px-4 md:px-6">
                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-10 md:mb-12"
                >
                    Sicherheit, Fiskal &amp; Datenschutz
                </motion.p>

                {/* Signal grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border/40 border-y md:border-y-0 border-border/40">
                    {signals.map((p, i) => (
                        <motion.div
                            key={p.name}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.07 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center justify-center gap-3 px-4 py-8 md:py-6 text-center"
                        >
                            <div
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60"
                                style={{ background: `radial-gradient(circle at 50% 40%, ${p.accent}1a, transparent 70%)` }}
                            >
                                <p.icon
                                    className="h-5 w-5"
                                    style={{ color: p.accent }}
                                    aria-hidden
                                />
                            </div>
                            <div>
                                <div
                                    className="text-sm md:text-base font-semibold text-foreground"
                                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
                                >
                                    {p.name}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5 max-w-[180px]">
                                    {p.sub}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
