'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { complianceItems, securityItems } from '@/lib/platform-data';

/**
 * TrustCompliance — Rechtssicherheit UND Datensicherheit in einer Sektion
 * (ersetzt ComplianceStack + SecurityTrust, die visuell doppelt waren).
 * Layout: links Narrativ + Security-Bullets, rechts 2×2-Compliance-Karten;
 * Standards-Badges als Fußzeile.
 */

const standards = ['GoBD', 'TSE', 'DSFinV-K', 'ZUGFeRD', 'XRechnung', 'DATEV', 'Intrastat', 'SEPA', 'MT940'];

export function TrustCompliance() {
    const complianceTop = complianceItems.slice(0, 4);
    return (
        <section
            id="sicherheit"
            aria-label="Rechtssicherheit und Datensicherheit"
            className="py-20 md:py-28 bg-muted/60 border-y border-border"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Links: Narrativ + Sicherheit */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary mb-3">
                            Für sichere und prüfbare Abläufe
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                        >
                            Ein Buchhaltungs-Stack mit nachvollziehbaren Belegketten.
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground mb-8">
                            GoBD-orientierte Festschreibung sowie vorbereitete TSE-, DSFinV-K-,
                            ZUGFeRD- und DATEV-Pfade — centgenau und nachvollziehbar. Die verbindliche
                            steuerliche Abnahme richtet sich nach Ihrem konkreten Einsatz.
                            Und Ihre Daten bleiben dabei geschützt:
                        </p>

                        {/* Security-Bullets */}
                        <ul className="space-y-4 mb-8">
                            {securityItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.label} className="flex gap-3.5">
                                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary/15 bg-accent text-primary">
                                            <Icon className="h-3.5 w-3.5" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-[15px] font-medium text-foreground leading-tight">{item.label}</span>
                                            <span className="block text-sm text-muted-foreground leading-snug mt-0.5">{item.detail}</span>
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>

                        <p className="text-xs text-muted-foreground leading-relaxed mb-6 max-w-md">
                            TLS-verschlüsselte Übertragung · sensible Zugangsdaten verschlüsselt gespeichert (at rest) ·
                            Backup- und Restore-Automatisierung · Off-Site-Sync nach Einrichtung und Restore-Drill · EU-Hosting.
                        </p>

                        <Link
                            href="/features/gobd-tse-zugferd-datev"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                        >
                            Mehr zu Faktura und Exporten
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </motion.div>

                    {/* Rechts: Compliance-Karten 2×2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 gap-4"
                    >
                        {complianceTop.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.06 }}
                                    viewport={{ once: true }}
                                    className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] p-5"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 bg-accent text-primary mb-4">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-base font-semibold text-foreground mb-1.5" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                                </motion.div>
                            );
                        })}
                        {/* Badge-Band unter den Karten */}
                        <div className="sm:col-span-2 rounded-xl border border-border bg-card shadow-[var(--shadow-card)] px-5 py-4">
                            <div className="flex flex-wrap items-center gap-2">
                                {standards.map((s) => (
                                    <span
                                        key={s}
                                        className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                                        style={{ fontFamily: 'var(--font-mono)' }}
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed mt-3">
                                Belegart-bewusste USt-Aufteilung je Steuersatz, kein Doppel-Reversal bei Storno.
                                Live-Anbindung von Zahlungsanbietern (Stripe/PayPal) wird im Onboarding aktiviert.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
