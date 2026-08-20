'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { submitLead } from '@/lib/leads';
import { CheckCircle2, Send } from 'lucide-react';

/**
 * Contact page form — shares the /api/leads endpoint with the
 * ConsultationForm on the home page. All submissions are rate-limited,
 * spam-filtered, and forwarded to the CRM.
 *
 * DSGVO: explicit consent checkbox, no submission without it.
 */
export function ContactForm() {
    const [formState, setFormState] = useState({
        vorname: '',
        nachname: '',
        email: '',
        unternehmen: '',
        nachricht: '',
    });
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const honeypot = new FormData(e.currentTarget).get('website');
        const website = typeof honeypot === 'string' ? honeypot.trim() : '';

        if (!consent) {
            setError('Bitte bestätigen Sie die Verarbeitung Ihrer Daten.');
            return;
        }

        setIsSubmitting(true);
        try {
            await submitLead({
                firma: formState.unternehmen || '—',
                ansprechpartner: `${formState.vorname} ${formState.nachname}`.trim() || '—',
                telefon: '',
                email: formState.email,
                nachricht: formState.nachricht,
                source: 'contact-page',
                consent: true,
                website,
            });
            setIsSubmitted(true);
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.';
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Vielen Dank für Ihre Nachricht!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei
                    Ihnen zurück.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="vorname">
                        Vorname *
                    </label>
                    <input
                        id="vorname"
                        name="vorname"
                        value={formState.vorname}
                        onChange={handleChange}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Max"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="nachname">
                        Nachname *
                    </label>
                    <input
                        id="nachname"
                        name="nachname"
                        value={formState.nachname}
                        onChange={handleChange}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Mustermann"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                    E-Mail *
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="max@firma.de"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="unternehmen">
                    Unternehmen
                </label>
                <input
                    id="unternehmen"
                    name="unternehmen"
                    value={formState.unternehmen}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Autoteile Meyer GmbH"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="nachricht">
                    Nachricht *
                </label>
                <textarea
                    id="nachricht"
                    name="nachricht"
                    value={formState.nachricht}
                    onChange={handleChange}
                    required
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Wie können wir Ihnen helfen?"
                />
            </div>

            {/* Honeypot — bots fill this, humans don't see it */}
            <div className="hidden" aria-hidden="true">
                <label>
                    Website (bitte leer lassen)
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
            </div>

            <label className="flex items-start gap-3 cursor-pointer select-none text-xs text-muted-foreground">
                <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                />
                <span>
                    Ich willige ein, dass meine Angaben zur Kontaktaufnahme und für Rückfragen
                    gespeichert werden. Details in der{' '}
                    <a
                        href="/legal/datenschutz"
                        className="text-primary hover:underline"
                    >
                        Datenschutzerklärung
                    </a>
                    .
                </span>
            </label>

            {error && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                </div>
            )}

            <Button
                type="submit"
                className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || !consent}
            >
                {isSubmitting ? (
                    <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                        Wird gesendet...
                    </>
                ) : (
                    <>
                        <Send className="mr-2 h-4 w-4" />
                        Nachricht senden
                    </>
                )}
            </Button>
        </form>
    );
}
