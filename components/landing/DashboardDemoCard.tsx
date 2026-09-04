'use client';
import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { track } from '@/components/layout/Analytics';
const api = process.env.NEXT_PUBLIC_API_URL || 'https://api.partsunion.de';
export function DashboardDemoCard() {
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const sending = useRef(false);
  const result = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return;
    const form = new FormData(e.currentTarget);
    if (!form.get('consent')) return;
    sending.current = true;
    setBusy(true);
    setError('');
    try {
      const response = await fetch(`${api}/api/demo/request-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: String(form.get('email')).trim().toLowerCase() }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok)
        throw new Error(
          response.status === 429
            ? 'Zu viele Anfragen. Bitte versuche es später erneut.'
            : 'Der Zugang konnte nicht angefordert werden. Bitte versuche es erneut.',
        );
      setDone(true);
      track('Demo Access Requested', { source: 'dashboard-demo' });
      requestAnimationFrame(() => result.current?.focus());
    } catch (err) {
      setError(
        err instanceof Error && err.name !== 'TimeoutError'
          ? err.message
          : 'Die Verbindung konnte nicht abgeschlossen werden. Deine E-Mail-Adresse bleibt erhalten.',
      );
      track('Demo Access Failed', { source: 'dashboard-demo' });
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }
  return (
    <div className="mk-form">
      {done ? (
        <div className="mk-success" ref={result} tabIndex={-1} role="status">
          <CheckCircle2 aria-hidden="true" />
          <h2 style={{ fontSize: 28 }}>Dein Zugang ist angefordert.</h2>
          <p className="mk-copy">
            Prüfe dein E-Mail-Postfach und gegebenenfalls den Spam-Ordner. Der Zugangslink ist 24
            Stunden gültig.
          </p>
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: 28 }}>Dashboard mit Beispieldaten</h2>
          <p className="mk-copy" style={{ marginTop: 16 }}>
            Sieh dir Lager, Aufträge, Rechnungen und Berichte im Demosystem an. Wir schicken dir
            einen persönlichen Zugangslink per E-Mail.
          </p>
          <form
            onSubmit={submit}
            className="mk-form-fields"
            aria-busy={busy}
            onFocusCapture={() => {
              if (!started.current) {
                started.current = true;
                track('Demo Access Started');
              }
            }}
          >
            <div className="mk-field">
              <label htmlFor={`${id}-email`}>E-Mail *</label>
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
              />
            </div>
            <label className="mk-consent">
              <input name="consent" type="checkbox" required />
              <span>
                Partsunion darf meine E-Mail-Adresse für den Demo-Zugang und Rückfragen zu meinem
                Interesse an Partsunion verwenden. Details in der{' '}
                <Link href="/legal/datenschutz">Datenschutzerklärung</Link>.
              </span>
            </label>
            {error && (
              <p className="mk-error" role="alert">
                {error}{' '}
                <a href="mailto:info@partsunion.de" style={{ textDecoration: 'underline' }}>
                  Direkt Kontakt aufnehmen
                </a>
              </p>
            )}
            <button className="mk-button" type="submit" disabled={busy}>
              {busy ? 'Zugang wird angefordert …' : 'Zugang per E-Mail anfordern'}
              <ArrowRight aria-hidden="true" />
            </button>
            <p className="mk-small" style={{ fontSize: 12 }}>
              Kostenloser Demo-Zugang · 24 Stunden gültig
            </p>
          </form>
        </>
      )}
    </div>
  );
}
