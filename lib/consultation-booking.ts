import { leadContext } from './attribution';

const BOOKING_API = process.env.NEXT_PUBLIC_BOOKING_API_URL || 'https://api.partsunion.de/api/book';
export interface BookingAvailability {
  timeZone: 'Europe/Berlin';
  durationMinutes: number;
  slots: string[];
}
export interface ConsultationResult {
  appointment: {
    id: string;
    start: string;
    durationMinutes: number;
    status: string;
    timeZone: string;
  };
  confirmationEmail: 'pending' | 'sending' | 'sent' | 'failed' | 'uncertain';
}
export class BookingError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}
export async function loadBookingAvailability(signal?: AbortSignal): Promise<BookingAvailability> {
  const response = await fetch(`${BOOKING_API}/availability`, { cache: 'no-store', signal });
  if (!response.ok)
    throw new Error(
      'Die freien Termine sind gerade nicht erreichbar. Bitte lade sie erneut oder schreibe an info@partsunion.de.',
    );
  const data = await response.json();
  if (
    data.timeZone !== 'Europe/Berlin' ||
    !Array.isArray(data.slots) ||
    !data.slots.every(
      (s: unknown) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s),
    )
  )
    throw new Error('Die Termine konnten nicht geladen werden. Bitte versuche es erneut.');
  return data;
}
export async function bookConsultation(input: {
  requestId: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  notes: string;
  slot: string;
  consent: boolean;
  website: string;
}): Promise<ConsultationResult> {
  let response: Response;
  try {
    response = await fetch(`${BOOKING_API}/consultations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...input, context: leadContext() }),
      signal: AbortSignal.timeout(30000),
    });
  } catch {
    throw new BookingError(
      'Die Verbindung wurde unterbrochen. Bitte versuche es mit denselben Angaben erneut; eine bereits gespeicherte Buchung wird erkannt.',
      0,
    );
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new BookingError(
      response.status === 429
        ? 'Zu viele Anfragen. Bitte versuche es in einigen Minuten erneut.'
        : body.error || 'Die Buchung konnte nicht abgeschlossen werden. Bitte versuche es erneut.',
      response.status,
    );
  }
  const result = await response.json();
  if (!result.appointment?.id || !result.appointment?.start)
    throw new BookingError(
      'Die Buchungsantwort konnte nicht gelesen werden. Bitte versuche es mit denselben Angaben erneut.',
      0,
    );
  return result;
}
