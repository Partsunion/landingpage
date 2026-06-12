/**
 * Lead-submission helper used by ConsultationForm, ContactForm and the
 * Live-Demo conversion path. Posts to the CRM backend; on network failure
 * the helper raises a structured error the form layer can render.
 *
 * Backend endpoint expects:
 *   POST /api/leads
 *   Content-Type: application/json
 *   {
 *     company, contactPerson, phone, email,
 *     notes, source, status, tags, consentGivenAt,
 *     appointmentSlot?: ISO-8601 datetime,
 *     metadata?: Record<string, unknown>
 *   }
 *
 * Static-export build = no server-side API route, so the call goes directly
 * from the browser. CORS + rate-limit + honeypot live on the CRM side.
 */

const CRM_LEADS_URL =
    process.env.NEXT_PUBLIC_CRM_LEADS_URL ||
    'https://api.partsunion.de/api/leads';

/** Mailto-fallback when CRM is unreachable. */
const FALLBACK_EMAIL = 'info@partsunion.de';

export interface LeadInput {
    firma: string;
    ansprechpartner: string;
    telefon: string;
    email: string;
    nachricht: string;
    source: string;
    consent: boolean;
    /** ISO-8601 datetime (e.g. 2026-06-03T10:00:00) — optional. */
    appointmentSlot?: string | null;
    /** Arbitrary structured data (used by Live-Demo to attach OEM-query). */
    metadata?: Record<string, unknown>;
    /** Honeypot — bots fill this, humans don't. */
    website?: string;
}

/**
 * Format an ISO-8601 datetime as a German human-readable string.
 * Used in CRM-notes and mailto-fallback.
 */
function formatAppointmentDE(iso: string): string {
    try {
        const d = new Date(iso);
        return d.toLocaleString('de-DE', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return iso;
    }
}

/**
 * Map landing-page source codes to CRM tag/labels.
 */
function mapSource(input: string): { source: string; tags: string[] } {
    const tags = ['Website-Lead'];
    let source = 'Website';
    switch (input) {
        case 'beratung':
            source = 'Website (Beratungsformular)';
            tags.push('Beratung');
            break;
        case 'contact-page':
            source = 'Website (Kontakt)';
            tags.push('Kontakt');
            break;
        case 'live-demo':
            source = 'Website (Live-Demo)';
            tags.push('Demo-Konversion');
            break;
        case 'mobile-sticky':
            source = 'Website (Mobile-CTA)';
            tags.push('Mobile-CTA');
            break;
        case 'whatsapp-float':
            source = 'Website (WhatsApp-Bubble)';
            tags.push('WhatsApp-Float');
            break;
        default:
            source = 'Website';
    }
    return { source, tags };
}

export async function submitLead(input: LeadInput): Promise<void> {
    // Honeypot — silently succeed without sending so bots don't learn.
    if (input.website) return;

    const { source, tags } = mapSource(input.source);
    const appointmentNote = input.appointmentSlot
        ? `\n\nGewünschter Beratungstermin: ${formatAppointmentDE(input.appointmentSlot)}`
        : '';

    const payload = {
        company: input.firma.trim(),
        contactPerson: input.ansprechpartner.trim(),
        phone: input.telefon.trim(),
        email: input.email.trim().toLowerCase(),
        notes: (input.nachricht.trim() + appointmentNote).trim(),
        source,
        status: 'Neu',
        tags,
        consentGivenAt: new Date().toISOString(),
        ...(input.appointmentSlot ? { appointmentSlot: input.appointmentSlot } : {}),
        ...(input.metadata ? { metadata: input.metadata } : {}),
    };

    let response: Response;
    try {
        response = await fetch(CRM_LEADS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    } catch {
        // Network unreachable → throw with mailto-fallback in message.
        throw new Error(
            `Verbindung zum Server fehlgeschlagen. Bitte schicken Sie uns Ihre Anfrage direkt an ${FALLBACK_EMAIL} oder rufen Sie uns an.`,
        );
    }

    if (!response.ok) {
        let message = 'Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.';
        try {
            const data = await response.json();
            if (data?.error) message = data.error;
        } catch {
            /* ignore parse failure */
        }
        throw new Error(message);
    }
}

/**
 * Demo-Lead — wird nach abgeschlossener Live-Demo aufgerufen,
 * wenn der User das Beratungs-CTA klickt. Reichert den Lead um die
 * konkrete OEM-Anfrage an, damit Sales den Kontext schon vor dem
 * Termin-Call sieht.
 */
export async function submitDemoLead(input: {
    email: string;
    name?: string;
    company?: string;
    phone?: string;
    /** What the user asked for in the live demo. */
    queriedPart: string;
    queriedVehicle: string;
    oemResult?: string;
}): Promise<void> {
    return submitLead({
        firma: input.company ?? '(unbekannt — aus Demo)',
        ansprechpartner: input.name ?? '(Demo-User)',
        telefon: input.phone ?? '',
        email: input.email,
        nachricht: `Lead aus Live-Demo.\n\nGesuchtes Teil: ${input.queriedPart}\nFahrzeug: ${input.queriedVehicle}${input.oemResult ? `\nGefundener OEM: ${input.oemResult}` : ''}\n\nKundeninteresse hochwahrscheinlich — Demo wurde erfolgreich genutzt.`,
        source: 'live-demo',
        consent: true,
        metadata: {
            demoPart: input.queriedPart,
            demoVehicle: input.queriedVehicle,
            demoOEM: input.oemResult,
        },
    });
}
