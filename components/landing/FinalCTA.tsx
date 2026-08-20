'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { submitLead } from '@/lib/leads';
import { track } from '@/components/layout/Analytics';
import { CalendarPicker } from '@/components/landing/CalendarPicker';
import {
    Send,
    CheckCircle2,
    ArrowRight,
} from 'lucide-react';

/**
 * FinalCTA — der Conversion-Abschluss der Seite: ein tiefblaues Panel
 * (einziger vollflächig blauer Block) mit Nutzenargumenten links und dem
 * Beratungsformular als weiße Karte rechts. Ersetzt die früheren Sektionen
 * ConsultationForm + CTA. Formular-Logik (submitLead, DSGVO-Consent,
 * CalendarPicker, Tracking) unverändert übernommen.
 */

const benefits = [
    'Kostenlose Erstberatung ohne Verpflichtung',
    'Live-Demo mit Ihren echten Fahrzeugen und Teilen',
    'ROI-Rechnung mit Ihren eigenen Zahlen',
    'Konkretes, schriftliches Angebot mit Festpreis',
];

export function FinalCTA() {
    const [formState, setFormState] = useState({
        firma: '',
        ansprechpartner: '',
        telefon: '',
        email: '',
        nachricht: '',
    });
    const [appointmentSlot, setAppointmentSlot] = useState<string | null>(null);
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // DSGVO: explizite Einwilligung, bevor Daten das Formular verlassen.
        if (!consent) {
            setError('Bitte bestätigen Sie die Verarbeitung Ihrer Daten laut Datenschutzerklärung.');
            setIsSubmitting(false);
            return;
        }

        try {
            await submitLead({
                ...formState,
                appointmentSlot,
                source: 'beratung',
                consent: true,
            });
            setIsSubmitted(true);
            track('Lead Submitted', {
                source: 'beratung',
                with_appointment: appointmentSlot ? 'yes' : 'no',
            });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.';
            setError(message);
            track('Lead Submit Failed', { source: 'beratung' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const inputClass =
        'flex h-11 w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all';

    return (
        <section id="beratung" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="relative overflow-hidden rounded-3xl gradient-deep shadow-[0_24px_48px_-16px_rgba(18,63,143,0.45)]"
                >
                    {/* Dezente Lichtakzente im Panel */}
                    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.13),transparent_55%)]" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center px-6 py-12 md:px-12 md:py-16">
                        {/* Links: Pitch */}
                        <div className="text-white">
                            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-blue-200 mb-4">
                                Unverbindliche Beratung
                            </p>
                            <h2
                                className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-tight mb-5"
                                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                            >
                                Lassen Sie uns 30 Minuten sprechen.
                            </h2>
                            <p className="text-blue-100/90 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                                Wir zeigen Partsunion live an Ihren echten Fahrzeugen und Teilen, rechnen Ihr
                                Einsparpotenzial durch und stimmen ein Paket auf Ihr Anfragevolumen ab.
                            </p>

                            <ul className="space-y-3.5 mb-10">
                                {benefits.map((b) => (
                                    <li key={b} className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-200" aria-hidden />
                                        <span className="text-[15px] text-white/95">{b}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Ablauf */}
                            <div className="border-t border-white/15 pt-6">
                                <ol className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                                    {['Formular ausfüllen', 'Rückmeldung in 24 h', 'Live-Demo-Termin'].map((step, i) => (
                                        <li key={step} className="flex items-center gap-2.5">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs font-semibold text-white">
                                                {i + 1}
                                            </span>
                                            <span className="text-sm text-blue-100/90">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        {/* Rechts: Formular-Karte */}
                        <div className="rounded-2xl bg-card border border-border shadow-[var(--shadow-raised)] p-6 md:p-8">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="h-14 w-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
                                        <CheckCircle2 className="h-7 w-7 text-success" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-foreground" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                                        Vielen Dank!
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-6">
                                        Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setError(null);
                                            setFormState({ firma: '', ansprechpartner: '', telefon: '', email: '', nachricht: '' });
                                        }}
                                    >
                                        Neue Anfrage
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-lg font-semibold mb-5 text-foreground" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                                        Beratungstermin vereinbaren
                                    </h3>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label htmlFor="cta-firma" className="text-sm font-medium text-foreground">Firma *</label>
                                                <input
                                                    id="cta-firma"
                                                    type="text"
                                                    name="firma"
                                                    value={formState.firma}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Autoteile Müller GmbH"
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label htmlFor="cta-ansprechpartner" className="text-sm font-medium text-foreground">Ansprechpartner *</label>
                                                <input
                                                    id="cta-ansprechpartner"
                                                    type="text"
                                                    name="ansprechpartner"
                                                    value={formState.ansprechpartner}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Max Mustermann"
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label htmlFor="cta-telefon" className="text-sm font-medium text-foreground">Telefon *</label>
                                                <input
                                                    id="cta-telefon"
                                                    type="tel"
                                                    name="telefon"
                                                    value={formState.telefon}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="+49 123 456789"
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label htmlFor="cta-email" className="text-sm font-medium text-foreground">E-Mail *</label>
                                                <input
                                                    id="cta-email"
                                                    type="email"
                                                    name="email"
                                                    value={formState.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="max@firma.de"
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label htmlFor="cta-nachricht" className="text-sm font-medium text-foreground">Nachricht (optional)</label>
                                            <textarea
                                                id="cta-nachricht"
                                                name="nachricht"
                                                value={formState.nachricht}
                                                onChange={handleChange}
                                                rows={2}
                                                placeholder="Kurz zu Ihrem Betrieb und Ihren Anforderungen…"
                                                className="flex w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                            />
                                        </div>

                                        <CalendarPicker value={appointmentSlot} onChange={setAppointmentSlot} />

                                        {/* DSGVO-Consent — explizites Opt-in (Art. 6 Abs. 1 lit. a) */}
                                        <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-muted-foreground">
                                            <input
                                                type="checkbox"
                                                required
                                                checked={consent}
                                                onChange={(e) => setConsent(e.target.checked)}
                                                className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                                            />
                                            <span>
                                                Ich willige ein, dass meine Angaben zur Kontaktaufnahme und für Rückfragen
                                                dauerhaft gespeichert werden. Die Daten werden nicht an Dritte weitergegeben.
                                                Details in der{' '}
                                                <a href="/legal/datenschutz" className="text-primary hover:underline">
                                                    Datenschutzerklärung
                                                </a>
                                                . Widerruf jederzeit per E-Mail möglich.
                                            </span>
                                        </label>

                                        {error && (
                                            <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                                {error}
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full h-12 text-base shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] group disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={isSubmitting || !consent}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                                                    Wird gesendet...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-4.5 w-4.5" />
                                                    Beratung anfragen
                                                    <ArrowRight className="ml-2 h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                                                </>
                                            )}
                                        </Button>
                                        <p className="text-center text-[11px] text-muted-foreground">
                                            Kostenlos &amp; unverbindlich · Antwort innerhalb von 24 Stunden
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
