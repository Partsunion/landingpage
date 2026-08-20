'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: 'Was genau ist Partsunion und wie funktioniert es?',
        answer: 'Partsunion ist ein branchenspezifisches ERP für den Autoteilehandel. Es verbindet Teileidentifikation, Verkauf, Beschaffung, Lager und Finanzen auf einer Datenbasis. Angebot, Auftrag, Lieferung, Rechnung und Bestandsbewegungen bleiben als zusammenhängender Vorgang nachvollziehbar.'
    },
    {
        question: 'Ist WhatsApp für den Betrieb des ERP erforderlich?',
        answer: 'Nein. Verkauf, Einkauf, Lager und Finanzen funktionieren eigenständig. WhatsApp ist ein optionaler Eingangskanal neben Theke, E-Mail und B2B-Portal. Digitale Anfragen landen im selben Arbeitsvorrat und erzeugen kein separates Datensilo.'
    },
    {
        question: 'Ist Partsunion ein Warenwirtschaftssystem oder ein ERP für den Autoteilehandel?',
        answer: 'Beides — branchenspezifisch. Die Warenwirtschaft deckt Artikel, Einkauf, Wareneingang, Bestände, Reservierungen, Lagerbewegungen und Inventur ab. Hinzu kommen Verkauf, CRM, Faktura und Finanzprozesse. OE-/Kataloglogik, Fahrzeugbezug und Altteilpfand sind in die gemeinsamen Geschäftsobjekte eingebunden.'
    },
    {
        question: 'Wie unterstützt Partsunion die Teileidentifikation?',
        answer: 'Fahrzeugmerkmale wie VIN, HSN und TSN, OE-Referenzen, Herstellerdaten und Cross-References werden in einem Prüfpfad zusammengeführt. Bestand, Preise und freigegebene Bezugsquellen ergänzen die Entscheidung. Unsichere Zuordnungen bleiben als Prüfbedarf sichtbar und werden nicht als sicher dargestellt.'
    },
    {
        question: 'Wie lange dauert die Einrichtung?',
        answer: 'Der Aufwand hängt von Stammdaten, Rollen, Nummernkreisen, Steuerprofil, Lagerstruktur und benötigten Schnittstellen ab. Vor dem Produktivstart werden Pflichtkonfiguration, Datenmigration, Berechtigungen und Kernprozesse gemeinsam abgenommen. Den konkreten Zeitplan erhalten Sie nach dem Prozess- und Datencheck.'
    },
    {
        question: 'Funktioniert Partsunion mit meinen bestehenden Lieferanten?',
        answer: 'Lieferanten werden als Stammdaten mit Konditionen und Bezugsinformationen geführt. Direkte Katalog-, Preis- oder Bestellschnittstellen hängen vom jeweiligen Anbieter ab und werden im Onboarding einzeln als live, eingeschränkt oder Roadmap ausgewiesen. Bestehende Lieferantenbeziehungen bleiben erhalten.'
    },
    {
        question: 'Welche Sprachen werden unterstützt?',
        answer: 'Digitale Text- und Sprachanfragen können in den unterstützten Sprachen vorstrukturiert werden. Der Originalinhalt bleibt erhalten, damit Mitarbeiter Übersetzung und fachliche Zuordnung prüfen können. Welche Sprachen produktiv freigegeben sind, wird im Onboarding dokumentiert.'
    },
    {
        question: 'Wie sicher sind meine Kundendaten?',
        answer: 'Die Übertragung ist TLS-verschlüsselt, sensible Zugangsdaten werden verschlüsselt gespeichert, und Händlerdaten werden tenant-gescopt verarbeitet. Dazu kommen abgestufte Rechte, 2-Faktor-Authentifizierung, bcrypt-Hashing, Rate Limiting und Audit-Protokolle. Die technische und datenschutzrechtliche Abnahme wird vor dem produktiven Onboarding dokumentiert.'
    },
    {
        question: 'Was kostet Partsunion?',
        answer: 'Jeder Teilehandel hat ein anderes Anfragevolumen, andere Lieferanten und einen anderen Tech-Stack. Deshalb stimmen wir das Paket in einem 30-Minuten-Beratungstermin direkt auf Ihren Betrieb ab — inklusive einer transparenten ROI-Rechnung mit Ihren echten Zahlen. Sie bekommen ein konkretes, schriftliches Angebot mit Festpreis, bevor Sie sich entscheiden müssen.'
    },
    {
        question: 'Kann ich Partsunion erst testen, bevor ich mich entscheide?',
        answer: 'Ja. Die Website enthält eine begrenzte Demo der digitalen Teileermittlung. Für eine belastbare Bewertung zeigen wir das ERP anhand Ihrer Rollen, Belegketten, Lagerstruktur und typischen Teilefälle in einer abgestimmten Testumgebung.'
    },
];

// FAQPage structured data → eligible for Google rich-result FAQ snippets.
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
};

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 md:py-28 relative bg-muted/60 border-y border-border">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                {/* Header — links, auf Desktop sticky */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="lg:col-span-4"
                >
                    <div className="lg:sticky lg:top-28">
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary mb-3 flex items-center gap-1.5">
                            <HelpCircle className="h-3.5 w-3.5" />
                            Häufige Fragen
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                        >
                            Alles, was Sie vor dem Start wissen müssen.
                        </h2>
                        <p className="text-base text-muted-foreground mb-6">
                            Von der Einrichtung bis zur Abrechnung. Ihre Frage ist nicht dabei?
                        </p>
                        <a
                            href="#beratung"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                        >
                            Wir beraten Sie persönlich →
                        </a>
                    </div>
                </motion.div>

                {/* FAQ Items — rechts */}
                <div className="lg:col-span-8 space-y-3">
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
                                className="w-full flex items-center justify-between p-5 md:p-6 text-left group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
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
                                        id={`faq-answer-${index}`}
                                        role="region"
                                        aria-labelledby={`faq-question-${index}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                                            <div className="border-t border-border pt-4">
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
                </div>
            </div>
        </section>
    );
}
