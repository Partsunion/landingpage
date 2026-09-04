'use client';
import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { submitLead } from '@/lib/leads';
import { track } from '@/components/layout/Analytics';
export function ContactForm() {
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const started = useRef(false);
  const sending = useRef(false);
  const success = useRef<HTMLDivElement>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return;
    const data = new FormData(e.currentTarget);
    const get = (name: string) => String(data.get(name) || '').trim();
    sending.current = true;
    setBusy(true);
    setError('');
    try {
      await submitLead({
        firma: get('firma'),
        ansprechpartner: get('name'),
        email: get('email'),
        telefon: '',
        nachricht: get('nachricht'),
        website: get('website'),
        consent: !!data.get('consent'),
        source: 'contact-page',
      });
      setDone(true);
      track('Lead Submitted', { source: 'contact-page' });
      requestAnimationFrame(() => success.current?.focus());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Deine Nachricht konnte nicht gesendet werden.',
      );
      track('Lead Submit Failed', { source: 'contact-page' });
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }
  return (
    <div className="mk-form">
      {done ? (
        <div className="mk-success" role="status" tabIndex={-1} ref={success}>
          <CheckCircle2 aria-hidden="true" />
          <h2 style={{ fontSize: 28 }}>Deine Nachricht ist angekommen.</h2>
          <p className="mk-copy">Wir melden uns bei dir per E-Mail.</p>
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: 26 }}>Nachricht schreiben</h2>
          <p className="mk-small" style={{ marginTop: 8 }}>
            Mit * markierte Angaben benötigen wir für deine Anfrage.
          </p>
          <form
            className="mk-form-fields"
            onSubmit={submit}
            aria-busy={busy}
            onFocusCapture={() => {
              if (!started.current) {
                started.current = true;
                track('Lead Form Started', { source: 'contact-page' });
              }
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-9999px',
                width: 1,
                height: 1,
                overflow: 'hidden',
              }}
            >
              <label htmlFor={`${id}-web`}>Website</label>
              <input id={`${id}-web`} name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="mk-field">
              <label htmlFor={`${id}-name`}>Dein Name *</label>
              <input id={`${id}-name`} name="name" autoComplete="name" maxLength={120} required />
            </div>
            <div className="mk-field">
              <label htmlFor={`${id}-email`}>E-Mail *</label>
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
              />
            </div>
            <div className="mk-field">
              <label htmlFor={`${id}-firma`}>
                Firma <span>(optional)</span>
              </label>
              <input id={`${id}-firma`} name="firma" autoComplete="organization" maxLength={160} />
            </div>
            <div className="mk-field">
              <label htmlFor={`${id}-text`}>Deine Nachricht *</label>
              <textarea id={`${id}-text`} name="nachricht" rows={4} maxLength={1200} required />
            </div>
            <label className="mk-consent">
              <input name="consent" type="checkbox" required />
              <span>
                Partsunion darf meine Angaben zur Bearbeitung dieser Anfrage und für Rückfragen
                verwenden. Mehr in der <Link href="/legal/datenschutz">Datenschutzerklärung</Link>.
              </span>
            </label>
            {error && (
              <p role="alert" className="mk-error">
                {error}{' '}
                <a href="mailto:info@partsunion.de" style={{ textDecoration: 'underline' }}>
                  Per E-Mail schreiben
                </a>
              </p>
            )}
            <button className="mk-button" type="submit" disabled={busy}>
              {busy ? 'Nachricht wird gesendet …' : 'Nachricht senden'}
              <ArrowRight aria-hidden="true" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
