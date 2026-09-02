'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
    ArrowUpRight,
    Bot,
    Check,
    MessageCircleMore,
    ScanLine,
    Smartphone,
    Workflow,
    type LucideIcon,
} from 'lucide-react';

type Usp = {
    number: string;
    title: string;
    eyebrow: string;
    text: string;
    href: string;
    icon: LucideIcon;
    facts: string[];
    className: string;
};

const usps: Usp[] = [
    {
        number: '01',
        eyebrow: 'Digitaler Eingang',
        title: 'WhatsApp wird zum Vorgang.',
        text: 'Text, Foto und Sprachnachricht landen nicht in einem zweiten Postfach, sondern strukturiert mit Kunde, Fahrzeug und Teilebedarf im Arbeitsvorrat.',
        href: '/features/whatsapp-bot',
        icon: MessageCircleMore,
        facts: ['Originalinhalt bleibt erhalten', 'Übergabe an Mitarbeiter bei Prüfbedarf'],
        className: 'lg:col-span-4',
    },
    {
        number: '02',
        eyebrow: 'Teileentscheidung',
        title: 'OE-Prüfung mit Fahrzeugbezug.',
        text: 'VIN, HSN/TSN, OE-Referenzen, Cross-References und Katalogdaten werden in einem nachvollziehbaren Prüfpfad zusammengeführt.',
        href: '/features/oem-ermittlung',
        icon: ScanLine,
        facts: ['Evidenz statt Bauchgefühl', 'Unsicherheit bleibt sichtbar'],
        className: 'lg:col-span-4',
    },
    {
        number: '03',
        eyebrow: 'Verkauf & Einkauf',
        title: 'Auftrag und Bestellung greifen ineinander.',
        text: 'Aus der geprüften Kundenentscheidung entsteht der Auftrag. Fehlmengen fließen in Bestellvorschläge; Menge und Bezugsquelle bleiben vor der Bestellung kontrolliert.',
        href: '/features/bestellprozess',
        icon: Workflow,
        facts: ['Positionen werden weitergeführt', 'Lieferantenbestellung mit Freigabe'],
        className: 'lg:col-span-4',
    },
    {
        number: '04',
        eyebrow: 'Partsunion Händler-App',
        title: 'Retoure direkt am Teil aufnehmen.',
        text: 'Artikel, Ursprungsbeleg, Menge, Grund und Zustand werden mobil zusammengeführt. Fotos können bei Bedarf ergänzt werden. Bestands- und Finanzwirkung folgen erst nach bestätigter Fachentscheidung.',
        href: '/features/retourenmanagement',
        icon: Smartphone,
        facts: ['Kamera- und Code-Erfassung', 'Retouren, Garantie und Altteilpfand'],
        className: 'lg:col-span-7',
    },
    {
        number: '05',
        eyebrow: 'KI-Betriebsassistent',
        title: 'Fragen stellen. Fälle vorbereiten.',
        text: 'Der Assistent fasst Geschäftskontext zusammen, priorisiert offene Arbeit und bereitet Fachaktionen vor. Kritische Schritte bleiben an Rechte und Bestätigung gebunden.',
        href: '/plattform',
        icon: Bot,
        facts: ['Kontext aus dem eigenen Betrieb', 'Vorschau vor schreibender Aktion'],
        className: 'lg:col-span-5',
    },
];

export function CoreUSPs() {
    const reducedMotion = useReducedMotion();

    return (
        <section id="usps" className="scroll-mt-24 overflow-hidden border-y border-[#20334f] bg-[#0d1a2c] py-16 text-white md:py-20">
            <div className="mx-auto max-w-[1450px] px-5 md:px-8 xl:px-10">
                <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: reducedMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
                    className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-16"
                >
                    <div>
                        <div className="flex items-center gap-3 font-mono text-[9px] font-semibold uppercase tracking-[0.19em] text-[#7eacff]">
                            PU / Kern-USPs <span className="h-px w-10 bg-[#315b98]" /> Nicht von der Stange
                        </div>
                        <h2 className="mt-5 max-w-4xl text-[clamp(2.55rem,4.5vw,4.55rem)] font-medium leading-[0.95] tracking-[-0.06em]">
                            Fünf Vorteile, die im Teilealltag zählen.
                        </h2>
                    </div>
                    <p className="max-w-2xl text-base leading-7 text-white/55 md:text-lg md:leading-8">
                        Nicht als lose Zusatztools, sondern direkt am selben Kunden-, Fahrzeug-, Artikel- und Belegkontext.
                    </p>
                </motion.div>

                <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-12">
                    {usps.map((usp, index) => {
                        const Icon = usp.icon;
                        return (
                            <motion.article
                                key={usp.number}
                                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={reducedMotion ? undefined : { y: -5 }}
                                viewport={{ once: true, amount: 0.18 }}
                                transition={{ duration: reducedMotion ? 0 : 0.48, delay: reducedMotion ? 0 : index * 0.045, ease: [0.22, 1, 0.36, 1] }}
                                className={`group relative isolate flex min-h-[286px] min-w-[84vw] snap-center flex-col overflow-hidden rounded-xl border border-white/12 bg-[#12243d] p-6 shadow-[0_18px_45px_rgba(0,0,0,.16)] md:min-w-0 ${usp.className}`}
                            >
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#69a0ff]/75 to-transparent" />
                                {!reducedMotion && (
                                    <motion.span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -top-24 h-48 w-20 rotate-[18deg] bg-gradient-to-r from-transparent via-[#4b86ea]/10 to-transparent blur-xl"
                                        animate={{ left: ['-25%', '125%'] }}
                                        transition={{ duration: 6.5 + index * 0.6, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
                                    />
                                )}

                                <div className="relative z-10 flex items-center justify-between">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#4774af]/55 bg-[#17345a] text-[#8db6ff] transition-colors group-hover:border-[#6e9fe8] group-hover:bg-[#1d6fe8] group-hover:text-white">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <span className="font-mono text-[9px] text-white/28">{usp.number} / 05</span>
                                </div>
                                <div className="relative z-10 mt-6 font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-[#78a9ff]">{usp.eyebrow}</div>
                                <h3 className="relative z-10 mt-2 text-[25px] font-medium leading-[1.05] tracking-[-0.045em]">{usp.title}</h3>
                                <p className="relative z-10 mt-3 text-[13px] leading-6 text-white/50">{usp.text}</p>

                                <div className="relative z-10 mt-auto grid gap-2 border-t border-white/10 pt-4 sm:grid-cols-2">
                                    {usp.facts.map((fact) => (
                                        <span key={fact} className="flex items-start gap-2 text-[11px] leading-4 text-white/62">
                                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-[#79aaff]" />{fact}
                                        </span>
                                    ))}
                                </div>
                                <Link href={usp.href} className="relative z-10 mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#8db6ff]">
                                    Genauer ansehen <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                            </motion.article>
                        );
                    })}
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-white/38 md:hidden">
                    <span>Seitlich wischen</span><span>01 — 05</span>
                </div>
            </div>
        </section>
    );
}
