'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { submitLead } from '@/lib/leads';
import { track } from '@/components/layout/Analytics';
import { CalendarPicker } from '@/components/landing/CalendarPicker';
import { useHydrationSafeReducedMotion } from '@/components/motion/useHydrationSafeReducedMotion';
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
    '30 Minuten an deinem echten Arbeitsprozess',
    'Anfrage, OE-Prüfung, Auftrag, Retoure und Reklamation durchgehen',
    'Terminwunsch direkt im Formular auswählen',
    'Konkrete nächste Schritte statt Standardpräsentation',
];

export function FinalCTA() {
    const reducedMotion = useHydrationSafeReducedMotion();
    const [formState, setFormState] = useState({
        firma: '',
        ansprechpartner: '',
        telefon: '',
        email: '',
        nachricht: '',
        website: '',
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
            setError('Bitte bestätige die Verarbeitung deiner Daten laut Datenschutzerklärung.');
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
            const message = err instanceof Error ? err.message : 'Die Anfrage konnte nicht gesendet werden. Bitte versuche es erneut.';
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
        'flex h-10 w-full min-w-0 border border-[#cfd5dc] bg-white px-2.5 py-2 text-sm placeholder:text-[#8a929b] focus:outline-none focus:ring-2 focus:ring-[#1d6fe8] focus:border-transparent transition-all md:h-11 md:px-3.5';

    return (
        <section id="beratung" className="scroll-mt-36 bg-white py-12 md:py-16">
            <div className="mx-auto max-w-[1450px] px-5 md:px-8 xl:px-10">
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.6 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="relative overflow-hidden rounded-xl border border-[#155bc3] bg-[#1d6fe8] shadow-[0_22px_60px_rgba(29,111,232,.16)]"
                >
                    <div className="relative z-10 grid items-stretch lg:grid-cols-[.82fr_1.18fr]">
                        {/* Links: Pitch */}
                        <div className="p-6 text-white md:p-8 lg:p-9">
                            <p className="mb-3 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-white/60 md:mb-5 md:text-[10px]">
                                Unverbindliche Beratung
                            </p>
                            <h2
                                className="mb-4 text-[32px] font-semibold leading-[1.04] tracking-[-0.045em] md:mb-6 md:text-4xl"
                            >
                                Zeig uns deinen echten Arbeitsprozess.
                            </h2>
                            <p className="mb-4 max-w-md text-sm leading-6 text-white/72 md:mb-6 md:text-lg md:leading-8">
                                Wir schauen gemeinsam, wie Anfrage, Teileprüfung, Bestand, Beschaffung und Beleg heute in deinem Betrieb zusammenlaufen.
                            </p>

                            <ul className="mb-2 space-y-2.5 md:mb-7 md:space-y-3">
                                {benefits.map((b, index) => (
                                    <li key={b} className={`items-start gap-3 ${index > 1 ? 'hidden sm:flex' : 'flex'}`}>
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white md:h-5 md:w-5" aria-hidden />
                                        <span className="text-[13px] text-white/95 md:text-[15px]">{b}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Ablauf */}
                            <div className="hidden border-t border-white/15 pt-6 sm:block">
                                <ol className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                                    {['Betrieb beschreiben', 'Terminwunsch wählen', 'Ablauf gemeinsam prüfen'].map((step, i) => (
                                        <li key={step} className="flex items-center gap-2.5">
                                            <span className="flex h-6 w-6 items-center justify-center border border-white/25 text-xs font-semibold text-white">
                                                {i + 1}
                                            </span>
                                            <span className="text-sm text-white/68">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        {/* Rechts: Formular-Karte */}
                        <div className="border-t border-white/20 bg-white p-4 md:p-7 lg:border-l lg:border-t-0 lg:p-8">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="h-14 w-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
                                        <CheckCircle2 className="h-7 w-7 text-success" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-foreground" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                                        Vielen Dank!
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-6">
                                            Wir haben deine Anfrage und den gewählten Terminwunsch erhalten und melden uns bei dir.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setError(null);
                                            setFormState({ firma: '', ansprechpartner: '', telefon: '', email: '', nachricht: '', website: '' });
                                            setAppointmentSlot(null);
                                            setConsent(false);
                                        }}
                                    >
                                        Neue Anfrage
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="mb-4 text-lg font-semibold tracking-[-0.025em] text-[#101318] md:mb-5 md:text-xl">
                                        Beratungstermin vereinbaren
                                    </h3>
                                    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                                        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                                            <label htmlFor="cta-website">Website</label>
                                            <input id="cta-website" type="text" name="website" value={formState.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                                        </div>
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                                            <div className="space-y-1.5">
                                                <label htmlFor="cta-firma" className="text-xs font-medium text-foreground md:text-sm">Firma *</label>
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
                                                <label htmlFor="cta-ansprechpartner" className="text-xs font-medium text-foreground md:text-sm">Ansprechpartner *</label>
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
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                                            <div className="space-y-1.5">
                                                <label htmlFor="cta-telefon" className="text-xs font-medium text-foreground md:text-sm">Telefon *</label>
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
                                                <label htmlFor="cta-email" className="text-xs font-medium text-foreground md:text-sm">E-Mail *</label>
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
                                            <label htmlFor="cta-nachricht" className="text-xs font-medium text-foreground md:text-sm">Nachricht (optional)</label>
                                            <textarea
                                                id="cta-nachricht"
                                                name="nachricht"
                                                value={formState.nachricht}
                                                onChange={handleChange}
                                                rows={2}
                                                placeholder="Kurz zu deinem Betrieb und deinen Anforderungen…"
                                                className="flex w-full resize-none border border-[#cfd5dc] bg-white px-2.5 py-2 text-sm placeholder:text-[#8a929b] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1d6fe8] transition-all md:px-3.5 md:py-2.5"
                                            />
                                        </div>

                                        <CalendarPicker value={appointmentSlot} onChange={setAppointmentSlot} />

                                        {/* DSGVO-Consent — explizites Opt-in (Art. 6 Abs. 1 lit. a) */}
                                        <label className="flex cursor-pointer select-none items-start gap-2 text-[10px] leading-4 text-muted-foreground md:gap-2.5 md:text-xs md:leading-5">
                                            <input
                                                type="checkbox"
                                                required
                                                checked={consent}
                                                onChange={(e) => setConsent(e.target.checked)}
                                                className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                                            />
                                            <span>
                                                Ich bin damit einverstanden, dass Partsunion meine Angaben zur Bearbeitung dieser Anfrage und für Rückfragen verwendet. Details findest du in der{' '}
                                                <a href="/legal/datenschutz" className="text-primary hover:underline">
                                                    Datenschutzerklärung
                                                </a>
                                                .
                                            </span>
                                        </label>

                                        {error && (
                                            <div className="border border-destructive/20 bg-destructive/10 p-3.5 text-sm text-destructive">
                                                {error}
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="group h-11 w-full rounded-none text-sm shadow-none disabled:cursor-not-allowed disabled:opacity-50 md:h-12 md:text-base"
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
                                            Unverbindlich · Dein Terminwunsch wird mit der Anfrage an Partsunion übermittelt
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
