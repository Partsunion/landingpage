'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: 'Was genau ist Partsunion und wie funktioniert es?',
        answer: 'Partsunion ist ein KI-gesteuertes Betriebssystem für Autoteilehändler. Ihre Kunden bestellen per WhatsApp, unser Bot erkennt das Fahrzeug und Ersatzteil, ermittelt automatisch die OEM-Nummer und findet die günstigsten Angebote — alles in Sekunden statt Minuten.'
    },
    {
        question: 'Welche Ersatzteile kann der WhatsApp-Bot verarbeiten?',
        answer: 'Alle gängigen Verschleiß- und Ersatzteile: Bremsbeläge, Filter, Kupplungen, Zündkerzen, Stoßdämpfer, Querlenker und viele mehr. Eine mehrstufige KI-Pipeline gleicht jede Anfrage parallel gegen Ihre eigene Datenbank, Lieferanten-Kataloge und mehrere Web-Quellen ab — mit dem Ziel, dass möglichst viele Anfragen direkt als fertiges Angebot bei Ihnen landen, ohne manuelle Recherche.'
    },
    {
        question: 'Wie lange dauert die Einrichtung?',
        answer: 'Die Grundeinrichtung dauert weniger als einen Tag. Wir verbinden Ihre WhatsApp Business-Nummer, konfigurieren Ihren Tenant mit Ihren Lieferanten-Konditionen, und Sie können sofort Bestellungen entgegennehmen. Ein persönliches Onboarding ist im Preis enthalten.'
    },
    {
        question: 'Funktioniert Partsunion mit meinen bestehenden Lieferanten?',
        answer: 'Ja! Unser System ist lieferantenagnostisch. Wir durchsuchen automatisch die größten Teile-Plattformen und Ihr eigenes Lager, um den besten Preis zu finden. Ihre bestehenden Lieferantenbeziehungen bleiben erhalten — Partsunion optimiert nur den Beschaffungsprozess.'
    },
    {
        question: 'Welche Sprachen werden unterstützt?',
        answer: 'Der WhatsApp-Bot spricht fünf Sprachen: Deutsch, Englisch, Türkisch, Kurdisch und Polnisch. Die Spracherkennung erfolgt automatisch — Ihr Kunde schreibt einfach in seiner Muttersprache, und der Bot antwortet passend.'
    },
    {
        question: 'Wie sicher sind meine Kundendaten?',
        answer: 'Maximale Sicherheit: Alle Daten werden DSGVO-konform auf europäischen Servern gespeichert. Die Kommunikation ist End-to-End verschlüsselt, und jeder Händler hat einen isolierten Multi-Tenant-Bereich. Wir verwenden bcrypt-Hashing, Rate Limiting und JWT-Authentifizierung.'
    },
    {
        question: 'Was kostet Partsunion?',
        answer: 'Jeder Teilehandel hat ein anderes Anfragevolumen, andere Lieferanten und einen anderen Tech-Stack. Deshalb stimmen wir das Paket in einem 30-Minuten-Beratungstermin direkt auf Ihren Betrieb ab — inklusive einer transparenten ROI-Rechnung mit Ihren echten Zahlen. Sie bekommen ein konkretes, schriftliches Angebot mit Festpreis, bevor Sie sich entscheiden müssen.'
    },
    {
        question: 'Kann ich Partsunion erst testen, bevor ich mich entscheide?',
        answer: 'Selbstverständlich! Nutzen Sie unsere interaktive Live-Demo direkt auf der Website, um den Bot in Aktion zu erleben. Im Beratungsgespräch richten wir gerne auch eine personalisierte Testumgebung mit Ihren echten Teilen und Fahrzeugen ein.'
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 md:py-32 relative">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 gradient-glow opacity-30" />

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
                        <HelpCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">
                            Häufige Fragen
                        </span>
                    </div>
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Alles, was Sie
                        <span className="text-gradient"> wissen müssen</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Von der Einrichtung bis zur Abrechnung — hier finden Sie Antworten auf die häufigsten Fragen zu Partsunion.
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="glass rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
                                aria-expanded={openIndex === index}
                                id={`faq-question-${index}`}
                            >
                                <span className="text-sm md:text-base font-medium text-foreground pr-4 group-hover:text-primary transition-colors">
                                    {faq.question}
                                </span>
                                <motion.span
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                                            <div className="border-t border-border/50 pt-4">
                                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* CTA below FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-muted-foreground mb-4">
                        Noch Fragen? Unser Team berät Sie gerne persönlich.
                    </p>
                    <a
                        href="#beratung"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-primary text-white font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                        Beratungsgespräch vereinbaren
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
