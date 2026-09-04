'use client';

import '@/app/consultation.css';
import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import { ArrowRight, CalendarDays, Check, CheckCircle2, Clock3, Mail } from 'lucide-react';
import {
  bookConsultation,
  BookingError,
  type ConsultationResult,
} from '@/lib/consultation-booking';
import { validAppointment, appointmentLabel } from '@/lib/appointments';
import { track } from '@/components/layout/Analytics';
import { CalendarPicker } from './CalendarPicker';

export function FinalCTA({
  standalone = false,
  source = 'beratung',
}: {
  standalone?: boolean;
  source?: string;
}) {
  const id = useId();
  const Heading = standalone ? 'h1' : 'h2';
  const FormHeading = standalone ? 'h2' : 'h3';
  const [slot, setSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [bookingResult, setBookingResult] = useState<ConsultationResult | null>(null);
  const [calendarRefresh, setCalendarRefresh] = useState(0);
  const attempt = useRef({ id: '', fingerprint: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const started = useRef(false);
  const sending = useRef(false);
  const result = useRef<HTMLDivElement>(null);
  const errorMessage = useRef<HTMLDivElement>(null);

  function showError(message: string) {
    setError(message);
    requestAnimationFrame(() => errorMessage.current?.focus());
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = new FormData(event.currentTarget);
    const get = (key: string) => String(form.get(key) || '').trim();
    if (!slot || !validAppointment(slot)) {
      showError('Bitte wähle einen freien Tag und eine Uhrzeit für unser Gespräch.');
      return;
    }
    if (!get('consent')) {
      showError('Bitte bestätige die Verwendung deiner Angaben für dieses Beratungsgespräch.');
      return;
    }
    sending.current = true;
    setBusy(true);
    setError('');
    try {
      const details = {
        company: get('firma'),
        contactPerson: get('ansprechpartner'),
        email: get('email'),
        phone: get('telefon'),
        notes: get('nachricht'),
        website: get('website'),
        consent: true,
        slot: slot.slice(0, 16),
      };
      const fingerprint = JSON.stringify(details);
      if (fingerprint !== attempt.current.fingerprint)
        attempt.current = { id: crypto.randomUUID(), fingerprint };
      const response = await bookConsultation({ ...details, requestId: attempt.current.id });
      setBookingResult(response);
      setSlot(response.appointment.start);
      setSubmitted(true);
      track('Lead Submitted', {
        source,
        page: window.location.pathname,
        with_appointment: true,
        intent: 'consultation',
      });
      requestAnimationFrame(() => result.current?.focus());
    } catch (err) {
      if (err instanceof BookingError && err.status === 409) {
        setSlot(null);
        setCalendarRefresh((n) => n + 1);
      }
      showError(
        err instanceof Error
          ? err.message
          : 'Dein Termin konnte nicht gebucht werden. Bitte versuche es erneut.',
      );
      track('Lead Submit Failed', { source, page: window.location.pathname });
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }

  return (
    <section id="beratung" className={`mk bk-section ${standalone ? 'bk-standalone' : ''}`}>
      <div className="mk-wrap">
        <div className="bk-shell">
          <div className="bk-intro">
            <p className="mk-kicker">Dein persönliches Beratungsgespräch</p>
            <Heading>Lass uns über deinen Betrieb sprechen.</Heading>
            <p className="bk-copy">
              Wo verliert ihr heute Zeit? Gemeinsam schauen wir auf euren Alltag und klären, wie
              automatische OE-Ermittlung, ERP, WhatsApp-Bot und die verbundenen Arbeitsbereiche euch
              unterstützen können.
            </p>
            <div className="bk-meeting-meta">
              <span>
                <Clock3 aria-hidden="true" /> Ca. 30 Minuten
              </span>
              <span>
                <Check aria-hidden="true" /> Unverbindlich
              </span>
            </div>
            <div className="bk-agenda">
              <p className="bk-agenda-title">Darüber sprechen wir</p>
              <ol>
                <li>
                  <span>01</span>
                  <div>
                    <strong>Dein Betrieb und eure Abläufe</strong>
                    <p>
                      Sortiment, Team, bisherige Programme und die Aufgaben, die euch aufhalten.
                    </p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>Die passenden Funktionen</strong>
                    <p>
                      Von Fahrzeugschein und OE-Ermittlung bis zu Kasse, Lager, Retouren und
                      Banking.
                    </p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>Ein konkreter nächster Schritt</strong>
                    <p>Einführung, Datenübernahme, Anbindungen und Kosten für deinen Bedarf.</p>
                  </div>
                </li>
              </ol>
            </div>
            <a className="bk-direct" href="mailto:info@partsunion.de" data-track="Contact Email">
              <Mail aria-hidden="true" /> info@partsunion.de
            </a>
          </div>

          <div className="mk-form bk-form">
            {submitted ? (
              <div ref={result} tabIndex={-1} className="mk-success bk-success" role="status">
                <CheckCircle2 aria-hidden="true" />
                <FormHeading>
                  {bookingResult?.appointment.status === 'confirmed'
                    ? 'Dein Beratungsgespräch ist gebucht.'
                    : 'Deine Buchung wurde bereits bearbeitet.'}
                </FormHeading>
                <p className="bk-copy">Wir freuen uns darauf, deinen Betrieb kennenzulernen.</p>
                {slot && (
                  <div className="bk-confirmation">
                    <CalendarDays aria-hidden="true" />
                    <div>
                      <span>Dein Gesprächstermin</span>
                      <strong>{appointmentLabel(slot)} Uhr</strong>
                      <span>Deutsche Ortszeit · Europe/Berlin</span>
                    </div>
                  </div>
                )}
                <p className="mk-small">
                  {bookingResult?.confirmationEmail === 'sent'
                    ? 'Die Bestätigung mit Datum, Uhrzeit und Kalendereintrag wurde per E-Mail versendet. Falls sie nicht ankommt, prüfe bitte auch deinen Spam-Ordner.'
                    : 'Dein Termin ist im Kalender gespeichert. Die Bestätigungs-E-Mail konnte noch nicht sicher zugestellt werden. Bitte notiere dir den Termin; bei Fragen erreichst du uns unter info@partsunion.de.'}
                </p>
                <Link href="/plattform" className="mk-link">
                  Inzwischen die Plattform ansehen <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <>
                <FormHeading>Beratungsgespräch vereinbaren</FormHeading>
                <p className="mk-small bk-form-intro">
                  Wähle einen freien Termin. Du erhältst die Details direkt per E-Mail.
                </p>
                <form
                  className="mk-form-fields bk-fields"
                  onSubmit={handleSubmit}
                  onFocusCapture={() => {
                    if (!started.current) {
                      started.current = true;
                      track('Lead Form Started', { source, page: window.location.pathname });
                    }
                  }}
                  aria-busy={busy}
                >
                  <div aria-hidden="true" className="bk-honeypot">
                    <label htmlFor={`${id}-website`}>Website</label>
                    <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  <fieldset className="bk-step" disabled={busy}>
                    <legend>
                      <span>01</span> Dein Gesprächstermin
                    </legend>
                    <CalendarPicker value={slot} onChange={setSlot} refresh={calendarRefresh} />
                  </fieldset>
                  <fieldset className="bk-step bk-details" disabled={busy}>
                    <legend>
                      <span>02</span> So erreichen wir dich
                    </legend>
                    <div className="mk-field">
                      <label htmlFor={`${id}-firma`}>Firma *</label>
                      <input
                        id={`${id}-firma`}
                        name="firma"
                        autoComplete="organization"
                        required
                        maxLength={160}
                        placeholder="Dein Unternehmen"
                      />
                    </div>
                    <div className="mk-form-row">
                      <div className="mk-field">
                        <label htmlFor={`${id}-name`}>Dein Name *</label>
                        <input
                          id={`${id}-name`}
                          name="ansprechpartner"
                          autoComplete="name"
                          required
                          maxLength={120}
                        />
                      </div>
                      <div className="mk-field">
                        <label htmlFor={`${id}-email`}>E-Mail *</label>
                        <input
                          id={`${id}-email`}
                          type="email"
                          name="email"
                          autoComplete="email"
                          required
                          maxLength={254}
                        />
                      </div>
                    </div>
                    <details className="mk-optional">
                      <summary>Telefon oder dein Anliegen ergänzen</summary>
                      <div className="bk-optional-fields">
                        <div className="mk-field">
                          <label htmlFor={`${id}-phone`}>
                            Telefon <span>(optional)</span>
                          </label>
                          <input
                            id={`${id}-phone`}
                            name="telefon"
                            type="tel"
                            autoComplete="tel"
                            maxLength={30}
                          />
                        </div>
                        <div className="mk-field">
                          <label htmlFor={`${id}-message`}>
                            Was möchtest du besprechen? <span>(optional)</span>
                          </label>
                          <textarea
                            id={`${id}-message`}
                            name="nachricht"
                            maxLength={1200}
                            rows={3}
                            placeholder="Zum Beispiel: WhatsApp-Anfragen schneller bearbeiten oder Buchhaltung und Banking zusammenbringen …"
                          />
                        </div>
                      </div>
                    </details>
                  </fieldset>
                  <label className="mk-consent">
                    <input type="checkbox" name="consent" required disabled={busy} />
                    <span>
                      Partsunion darf meine Angaben verwenden, um das Beratungsgespräch zu
                      vereinbaren und Rückfragen zu klären. Weitere Informationen in der{' '}
                      <Link href="/legal/datenschutz">Datenschutzerklärung</Link>.
                    </span>
                  </label>
                  {error && (
                    <div ref={errorMessage} tabIndex={-1} className="mk-error" role="alert">
                      {error}{' '}
                      <a href="mailto:info@partsunion.de" className="bk-error-link">
                        Direkt per E-Mail schreiben
                      </a>
                    </div>
                  )}
                  <button type="submit" className="mk-button" disabled={busy}>
                    {busy ? 'Termin wird gebucht …' : 'Beratungsgespräch buchen'}
                    <ArrowRight aria-hidden="true" />
                  </button>
                  <p className="mk-small bk-submit-note">
                    Persönliche Terminbestätigung per E-Mail.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
