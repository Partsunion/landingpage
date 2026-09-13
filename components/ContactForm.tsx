"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, MessageSquareText } from "lucide-react";
import { submitLead } from "@/lib/leads";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const sending = useRef(false);
  const success = useRef<HTMLDivElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const data = new FormData(event.currentTarget);
    const get = (name: string) => String(data.get(name) || "").trim();
    sending.current = true;
    setBusy(true);
    setError("");
    try {
      const message = get("message");
      const industry = get("industry");
      await submitLead({
        firma: get("company"),
        ansprechpartner: `${get("first")} ${get("last")}`.trim(),
        email: get("email"),
        telefon: get("phone"),
        nachricht: [`Schwerpunkt: ${industry}`, message].filter(Boolean).join("\n\n"),
        website: get("website"),
        consent: Boolean(data.get("consent")),
        source: "contact-page",
        metadata: { industry },
      });
      setSent(true);
      requestAnimationFrame(() => success.current?.focus());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Deine Anfrage konnte nicht gesendet werden.");
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }

  return (
    <form className={`contact-form ${compact ? "compact" : ""}`} onSubmit={submit} aria-busy={busy}>
      {sent ? (
        <div className="form-success" role="status" tabIndex={-1} ref={success}>
          <span><CheckCircle2 /></span><h3>Vielen Dank.</h3><p>Deine Anfrage ist im Partsunion CRM eingegangen. Wir melden uns persönlich bei dir.</p>
        </div>
      ) : (
        <>
          <div className="form-intro"><span><MessageSquareText size={20} /></span><div><strong>Unverbindliche Erstberatung</strong><small>Kurze Angaben genügen – wir melden uns persönlich.</small></div></div>
          <div className="form-honeypot" aria-hidden="true"><label htmlFor={`${id}-website`}>Website</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
          <div className="field"><label htmlFor={`${id}-first`}>Vorname *</label><input id={`${id}-first`} name="first" autoComplete="given-name" maxLength={80} placeholder="Max" required disabled={busy} /></div>
          <div className="field"><label htmlFor={`${id}-last`}>Nachname *</label><input id={`${id}-last`} name="last" autoComplete="family-name" maxLength={80} placeholder="Mustermann" required disabled={busy} /></div>
          <div className="field"><label htmlFor={`${id}-email`}>Geschäftliche E-Mail *</label><input id={`${id}-email`} name="email" type="email" autoComplete="email" maxLength={254} placeholder="max@teilehandel.de" required disabled={busy} /></div>
          <div className="field"><label htmlFor={`${id}-phone`}>Telefon</label><input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+49 123 456789" disabled={busy} /></div>
          <div className="field"><label htmlFor={`${id}-company`}>Firma *</label><input id={`${id}-company`} name="company" autoComplete="organization" maxLength={160} placeholder="Muster Autoteile GmbH" required disabled={busy} /></div>
          <div className="field"><label htmlFor={`${id}-industry`}>Schwerpunkt *</label><select id={`${id}-industry`} name="industry" required defaultValue="" disabled={busy}><option value="" disabled>Bitte auswählen</option><option>Neuteilehandel</option><option>Gebrauchtteilehandel</option><option>Neu- und Gebrauchtteile</option><option>Werkstatt mit Teileverkauf</option><option>Sonstiger Teilehandel</option></select></div>
          {!compact && <div className="field field-wide"><label htmlFor={`${id}-message`}>Wobei können wir dir helfen?</label><textarea id={`${id}-message`} name="message" maxLength={1200} placeholder="Erzähl uns kurz von deinem Betrieb und deinen aktuellen Abläufen." rows={4} disabled={busy} /></div>}
          <label className="form-consent field-wide"><input name="consent" type="checkbox" required disabled={busy} /><span>Partsunion darf meine Angaben zur Bearbeitung dieser Anfrage und für Rückfragen verwenden. Mehr in der <Link href="/legal/datenschutz">Datenschutzerklärung</Link>.</span></label>
          {error && <p className="form-error field-wide" role="alert">{error} <a href="mailto:info@partsunion.de">Per E-Mail schreiben</a></p>}
          <div className="form-bottom field-wide"><button className="button button-primary" type="submit" disabled={busy}>{busy ? "Anfrage wird gesendet …" : "Beratung anfragen"}</button><small>Sichere Übertragung direkt an das Partsunion CRM.</small></div>
        </>
      )}
    </form>
  );
}
