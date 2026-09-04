'use client';

/**
 * AppointmentAccept — öffentliche Termin-Bestätigungsseite (/termin#t=<token>).
 *
 * Der Kunde landet hier über den Link aus der Einladungs-E-Mail. Er sieht den
 * vorgeschlagenen Termin und bestätigt oder sagt ab. Bei Bestätigung springt der
 * Status im System auf „Bestätigt" und der zuständige Vertriebler wird informiert.
 *
 * Der Token kommt aus dem Fragment (wird nicht an Webserver/Proxy gesendet), wird
 * sofort aus der Adresszeile entfernt und erreicht die API nur im JSON-Body.
 */
import { useEffect, useState, type ReactNode } from 'react';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  XCircle,
  Loader2,
  CalendarPlus,
  AlertTriangle,
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.partsunion.de';

interface PublicAppt {
  type: string;
  typeLabel: string;
  title: string;
  start: string;
  end: string;
  startLabel: string;
  durationMinutes: number;
  assigneeName: string | null;
  location: string | null;
  customerName: string | null;
  status: string;
}

type Phase = 'loading' | 'notfound' | 'ready' | 'submitting' | 'done-accepted' | 'done-declined';

export function AppointmentAccept() {
  const [appt, setAppt] = useState<PublicAppt | null>(null);
  const [phase, setPhase] = useState<Phase>('loading');
  const [token, setToken] = useState<string>('');
  const [calendar, setCalendar] = useState<string>('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const fragment = new URLSearchParams(url.hash.replace(/^#\??/, ''));
    // Query fallback keeps already-sent legacy emails usable. New links use
    // only the fragment, and both variants are scrubbed before any API call.
    const t = fragment.get('t') || url.searchParams.get('t') || '';
    url.searchParams.delete('t');
    url.hash = '';
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}`);
    setToken(t);
    if (!/^[A-Za-z0-9_-]{32,200}$/.test(t)) {
      setPhase('notfound');
      return;
    }
    const controller = new AbortController();
    fetch(`${API_BASE}/api/book/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: t }),
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      signal: controller.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        const a: PublicAppt = d.appointment;
        setAppt(a);
        setCalendar(typeof d.calendar === 'string' ? d.calendar : '');
        if (a.status === 'confirmed') setPhase('done-accepted');
        else if (a.status === 'declined') setPhase('done-declined');
        else if (a.status === 'cancelled') setPhase('done-declined');
        else setPhase('ready');
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) setPhase('notfound');
      });
    return () => controller.abort();
  }, []);

  const respond = async (action: 'accept' | 'decline') => {
    if (!token) return;
    setPhase('submitting');
    try {
      const r = await fetch(`${API_BASE}/api/book/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action }),
        cache: 'no-store',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
      });
      if (!r.ok) throw new Error();
      const d = await r.json();
      setAppt(d.appointment);
      setPhase(action === 'accept' ? 'done-accepted' : 'done-declined');
    } catch {
      setPhase('ready');
    }
  };

  const downloadCalendar = () => {
    if (!calendar) return;
    const blobUrl = URL.createObjectURL(
      new Blob([calendar], { type: 'text/calendar;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'Termin-Partsunion.ics';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 0);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl bg-card border border-border p-7 md:p-8 shadow-[var(--shadow-raised)]">
        {phase === 'loading' && (
          <div className="py-10 text-center text-[var(--muted-foreground)]">
            <Loader2 className="h-7 w-7 animate-spin mx-auto mb-3 text-primary" /> Termin wird
            geladen…
          </div>
        )}

        {phase === 'notfound' && (
          <div className="py-8 text-center">
            <AlertTriangle className="h-9 w-9 text-warning mx-auto mb-3" />
            <h2 className="text-xl font-display font-semibold mb-2">Termin nicht gefunden</h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              Der Link ist ungültig oder abgelaufen. Bitte prüfen Sie die E-Mail oder kontaktieren
              Sie uns unter{' '}
              <a href="mailto:info@partsunion.de" className="text-primary underline">
                info@partsunion.de
              </a>
              .
            </p>
          </div>
        )}

        {appt && phase !== 'loading' && phase !== 'notfound' && (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary/25 text-[11px] font-semibold text-primary uppercase tracking-wider mb-4">
              <Calendar className="h-3.5 w-3.5" /> {appt.typeLabel}
            </div>

            {phase === 'done-accepted' ? (
              <div className="mb-5">
                <div className="flex items-center gap-2 text-success mb-2">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="text-lg font-display font-semibold text-[var(--foreground)]">
                    Termin bestätigt
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Vielen Dank! Wir freuen uns auf das Gespräch. Sie können den Termin jetzt in Ihren
                  Kalender übernehmen.
                </p>
              </div>
            ) : phase === 'done-declined' ? (
              <div className="mb-5">
                <div className="flex items-center gap-2 text-[var(--muted-foreground)] mb-2">
                  <XCircle className="h-6 w-6" />
                  <span className="text-lg font-display font-semibold text-[var(--foreground)]">
                    {appt.status === 'cancelled' ? 'Termin abgesagt' : 'Termin abgelehnt'}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Kein Problem. Möchten Sie einen neuen Termin? Schreiben Sie uns an{' '}
                  <a href="mailto:info@partsunion.de" className="text-primary underline">
                    info@partsunion.de
                  </a>
                  .
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-display font-bold mb-1">Dein Terminvorschlag</h2>
                <p className="text-sm text-[var(--muted-foreground)] mb-5">
                  Bitte bestätigen Sie den Termin oder sagen Sie ab.
                </p>
              </>
            )}

            {/* Termin-Details */}
            <div className="rounded-xl bg-muted border border-border p-4 space-y-2.5 mb-5">
              <Detail
                icon={<Clock className="h-4 w-4" />}
                label={appt.startLabel}
                sub={`${appt.durationMinutes} Minuten`}
              />
              {appt.assigneeName && (
                <Detail
                  icon={<User className="h-4 w-4" />}
                  label={appt.assigneeName}
                  sub="Ihr Ansprechpartner"
                />
              )}
              {appt.location && (
                <Detail icon={<MapPin className="h-4 w-4" />} label={appt.location} />
              )}
            </div>

            {phase === 'ready' && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => respond('accept')}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl gradient-primary text-primary-foreground text-sm font-medium shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] hover:brightness-95 transition-all"
                >
                  <CheckCircle2 className="h-4 w-4" /> Termin bestätigen
                </button>
                <button
                  onClick={() => respond('decline')}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-border text-[var(--muted-foreground)] text-sm hover:bg-muted hover:border-border-hover transition-all"
                >
                  Leider absagen
                </button>
              </div>
            )}
            {phase === 'submitting' && (
              <div className="py-3 text-center text-[var(--muted-foreground)]">
                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
              </div>
            )}
            {phase === 'done-accepted' && (
              <button
                type="button"
                onClick={downloadCalendar}
                disabled={!calendar}
                className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl gradient-primary text-primary-foreground text-sm font-medium shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] hover:brightness-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <CalendarPlus className="h-4 w-4" /> Zum Kalender hinzufügen
              </button>
            )}
          </>
        )}
      </div>
      <p className="text-center text-[11px] text-[var(--muted-foreground)] mt-5">
        Partsunion · B2B-Autoteile-Plattform
      </p>
    </div>
  );
}

function Detail({ icon, label, sub }: { icon: ReactNode; label: string; sub?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-primary mt-0.5">{icon}</span>
      <div className="min-w-0">
        <div className="text-sm font-medium text-[var(--foreground)]">{label}</div>
        {sub && <div className="text-xs text-[var(--muted-foreground)]">{sub}</div>}
      </div>
    </div>
  );
}
