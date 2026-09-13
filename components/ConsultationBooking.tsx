"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, LockKeyhole, RotateCcw } from "lucide-react";
import { appointmentLabel, berlinAppointment, validAppointment } from "@/lib/appointments";
import { bookConsultation, BookingError, loadBookingAvailability, type ConsultationResult } from "@/lib/consultation-booking";

const dateFormatter = new Intl.DateTimeFormat("de-DE", { timeZone: "Europe/Berlin", weekday: "short", day: "2-digit", month: "2-digit" });

export function ConsultationBooking({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [availabilityError, setAvailabilityError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [bookingResult, setBookingResult] = useState<ConsultationResult | null>(null);
  const sending = useRef(false);
  const attempt = useRef({ id: "", fingerprint: "" });
  const success = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    void loadBookingAvailability(controller.signal)
      .then((data) => {
        if (!active) return;
        setSlots(data.slots);
        setDate((current) => data.slots.some((slot) => slot.startsWith(`${current}T`)) ? current : "");
        setTime("");
      })
      .catch(() => {
        if (!active) return;
        setSlots([]);
        setAvailabilityError("Die freien Termine konnten nicht geladen werden. Bitte versuche es erneut oder schreibe an info@partsunion.de.");
      })
      .finally(() => {
        clearTimeout(timeout);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [refresh]);

  const dates = [...new Set(slots.map((slot) => slot.slice(0, 10)))].slice(0, 5);
  const times = slots.filter((slot) => slot.startsWith(`${date}T`)).map((slot) => slot.slice(11, 16));

  function continueToDetails() {
    if (date && time && slots.includes(`${date}T${time}`)) setStep(2);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const data = new FormData(event.currentTarget);
    const get = (name: string) => String(data.get(name) || "").trim();
    const selectedSlot = berlinAppointment(date, time);
    if (!slots.includes(`${date}T${time}`) || !validAppointment(selectedSlot)) {
      setError("Bitte wähle einen weiterhin verfügbaren Termin.");
      setStep(1);
      setLoading(true);
      setAvailabilityError("");
      setRefresh((value) => value + 1);
      return;
    }
    sending.current = true;
    setBusy(true);
    setError("");
    try {
      const details = {
        company: get("company"),
        contactPerson: get("name"),
        email: get("email"),
        phone: get("phone"),
        notes: get("topic"),
        website: get("website"),
        consent: Boolean(data.get("consent")),
        slot: selectedSlot.slice(0, 16),
      };
      const fingerprint = JSON.stringify(details);
      if (fingerprint !== attempt.current.fingerprint) attempt.current = { id: crypto.randomUUID(), fingerprint };
      const result = await bookConsultation({ ...details, requestId: attempt.current.id });
      setBookingResult(result);
      setSent(true);
      requestAnimationFrame(() => success.current?.focus());
    } catch (reason) {
      if (reason instanceof BookingError && reason.status === 409) {
        setDate("");
        setTime("");
        setStep(1);
        setLoading(true);
        setAvailabilityError("");
        setRefresh((value) => value + 1);
      }
      setError(reason instanceof Error ? reason.message : "Dein Termin konnte nicht gebucht werden. Bitte versuche es erneut.");
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }

  if (sent && bookingResult) {
    return <div className={`booking-shell ${compact ? "booking-compact" : ""}`}>
      <div className="booking-success" role="status" tabIndex={-1} ref={success}>
        <span><Check /></span>
        <p className="eyebrow">TERMIN GEBUCHT</p>
        <h3>Dein Beratungsgespräch ist gebucht.</h3>
        <p>{appointmentLabel(bookingResult.appointment.start)} Uhr · Deutsche Ortszeit.</p>
        <small>{bookingResult.confirmationEmail === "sent" ? "Die Bestätigung und der Kalendereintrag wurden per E-Mail versendet." : "Der Termin ist gespeichert. Sollte keine E-Mail ankommen, erreichst du uns unter info@partsunion.de."}</small>
        <Link className="text-link" href="/produktdaten">Bis dahin: Produkt ansehen <ArrowRight /></Link>
      </div>
    </div>;
  }

  return <form className={`booking-shell ${compact ? "booking-compact" : ""}`} onSubmit={submit} aria-busy={busy}>
    <div className="booking-head">
      <div><span className={step === 1 ? "active" : "complete"}>{step > 1 ? <Check /> : "01"}</span><small>Termin</small></div>
      <i />
      <div><span className={step === 2 ? "active" : ""}>02</span><small>Kontaktdaten</small></div>
    </div>

    {step === 1 ? <div className="booking-step">
      <div className="booking-title"><span><CalendarDays /></span><div><h3>Wähle deinen Gesprächstermin</h3><p>30 Minuten · Europe/Berlin · live verfügbar</p></div></div>
      {availabilityError ? <div className="booking-availability-error" role="status"><p>{availabilityError}</p><button type="button" onClick={() => { setLoading(true); setAvailabilityError(""); setRefresh((value) => value + 1); }}><RotateCcw /> Termine erneut laden</button></div> : <>
        <fieldset className="booking-dates" disabled={loading}><legend>Freien Tag auswählen *</legend>{loading && <span className="booking-loading">Freie Termine werden im Kalender geprüft …</span>}{!loading && dates.length === 0 && <span className="booking-loading">Aktuell sind keine Online-Termine frei. Schreib uns bitte an info@partsunion.de.</span>}{dates.map((item) => <label key={item} className={date === item ? "selected" : ""}><input type="radio" name="date" value={item} checked={date === item} onChange={() => { setDate(item); setTime(""); }} /><span>{dateFormatter.format(new Date(`${item}T12:00:00Z`))}</span></label>)}</fieldset>
        <fieldset className="booking-times" disabled={!date || loading}><legend>Verfügbare Uhrzeit *</legend>{times.map((item) => <label key={item} className={time === item ? "selected" : ""}><input type="radio" name="time" value={item} checked={time === item} onChange={() => setTime(item)} /><Clock3 /><span>{item}</span></label>)}</fieldset>
      </>}
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="booking-note"><LockKeyhole /> Die Verfügbarkeit wird direkt mit dem Partsunion Kalender abgeglichen.</div>
      <button className="button button-primary booking-next" type="button" disabled={!date || !time || loading} onClick={continueToDetails}>Weiter zu deinen Angaben <ArrowRight /></button>
    </div> : <div className="booking-step">
      <button className="booking-back" type="button" onClick={() => setStep(1)} disabled={busy}><ArrowLeft /> Termin ändern</button>
      <div className="booking-summary"><CalendarDays /><div><small>Dein freier Gesprächstermin</small><strong>{appointmentLabel(berlinAppointment(date, time))} Uhr</strong></div></div>
      <div className="form-honeypot" aria-hidden="true"><label htmlFor={`${id}-website`}>Website</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="booking-fields">
        <div className="field"><label htmlFor={`${id}-company`}>Firma *</label><input id={`${id}-company`} name="company" autoComplete="organization" maxLength={160} placeholder="Muster Autoteile GmbH" required disabled={busy} /></div>
        <div className="field"><label htmlFor={`${id}-name`}>Dein Name *</label><input id={`${id}-name`} name="name" autoComplete="name" maxLength={120} placeholder="Max Mustermann" required disabled={busy} /></div>
        <div className="field"><label htmlFor={`${id}-email`}>Geschäftliche E-Mail *</label><input id={`${id}-email`} name="email" type="email" autoComplete="email" maxLength={254} placeholder="max@teilehandel.de" required disabled={busy} /></div>
        <div className="field"><label htmlFor={`${id}-phone`}>Telefon (optional)</label><input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+49 123 456789" disabled={busy} /></div>
        <div className="field field-wide"><label htmlFor={`${id}-topic`}>Was möchtest du besprechen? (optional)</label><textarea id={`${id}-topic`} name="topic" maxLength={1200} rows={compact ? 2 : 3} placeholder="Aktuelle Software, Abläufe oder Funktionen, die dich interessieren." disabled={busy} /></div>
      </div>
      <label className="booking-consent"><input type="checkbox" name="consent" required disabled={busy} /><span>Partsunion darf meine Angaben verwenden, um das Beratungsgespräch zu vereinbaren und Rückfragen zu klären. Weitere Informationen in der <Link href="/legal/datenschutz">Datenschutzerklärung</Link>.</span></label>
      {error && <p className="form-error" role="alert">{error} <a href="mailto:info@partsunion.de">Per E-Mail schreiben</a></p>}
      <button className="button button-primary booking-submit" type="submit" disabled={busy}>{busy ? "Termin wird gebucht …" : "Beratungsgespräch buchen"} <ArrowRight /></button>
    </div>}
  </form>;
}
