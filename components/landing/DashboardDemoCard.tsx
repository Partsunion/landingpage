'use client';

/**
 * DashboardDemoCard — E-Mail-Gate für die Dashboard-Live-Demo (Lead-Capture).
 *
 * Der Nutzer trägt seine E-Mail ein → POST /api/demo/request-access erfasst sie
 * als CRM-Lead und mailt einen 24h-Zugangslink zum vollständig geseedeten
 * Demo-Dashboard. So sammeln wir qualifizierte E-Mail-Adressen (Beratungs-Leads),
 * statt den Zugang frei wegzugeben.
 */

import { useState, type FormEvent } from 'react';
import { LayoutDashboard, Clock, ArrowRight, Loader2, CheckCircle2, Mail } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.partsunion.de';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DashboardDemoCard() {
    const [email, setEmail] = useState('');
    const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
    const [msg, setMsg] = useState('');

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const value = email.trim().toLowerCase();
        if (!EMAIL_RE.test(value)) {
            setState('error');
            setMsg('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            return;
        }
        setState('loading');
        setMsg('');
        try {
            const r = await fetch(`${API_BASE}/api/demo/request-access`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: value }),
            });
            if (r.status === 429) {
                setState('error');
                setMsg('Zu viele Anfragen. Bitte versuchen Sie es in einer Stunde erneut.');
                return;
            }
            const data = await r.json().catch(() => ({}));
            if (!r.ok) {
                setState('error');
                setMsg(data?.error || 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
                return;
            }
            setState('done');
        } catch {
            setState('error');
            setMsg('Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.');
        }
    };

    return (
        <div className="group relative rounded-2xl bg-card border border-border p-7 flex flex-col shadow-[var(--shadow-card)]">
            <div className="absolute top-5 right-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent border border-primary/25 text-[10px] font-semibold text-primary">
                <Clock className="h-3 w-3" /> 24 h kostenlos
            </div>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent border border-primary/15 mb-5">
                <LayoutDashboard className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-semibold mb-2">Dashboard-Demo</h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed flex-1">
                Klicken Sie sich durch das <strong className="text-[var(--foreground)]">komplette ERP-Dashboard</strong> mit
                umfangreichen Beispieldaten — Lager, Aufträge, Rechnungen, Mahnwesen, Finanzen & Berichte wie im echten Betrieb.
                Wir senden Ihnen den persönlichen Zugang per E-Mail.
            </p>

            {state === 'done' ? (
                <div className="mt-6 flex items-start gap-3 rounded-xl bg-success/10 border border-success/25 p-4">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">Zugangslink ist unterwegs!</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                            Bitte prüfen Sie Ihr Postfach (auch den Spam-Ordner). Der Link ist 24 Stunden gültig.
                        </p>
                        <button type="button" onClick={() => setState('idle')} className="text-xs text-primary underline mt-2">
                            Link erneut anfordern
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={submit} className="mt-6 space-y-2">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]/50" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
                            disabled={state === 'loading'}
                            placeholder="ihre@firma.de"
                            className="w-full pl-9 pr-4 py-3 rounded-xl bg-muted border border-border text-sm focus:border-primary focus:outline-none transition-all disabled:opacity-40 placeholder:text-[var(--muted-foreground)]/50"
                        />
                    </div>
                    {state === 'error' && <p className="text-xs text-error px-1">{msg}</p>}
                    <button
                        type="submit"
                        disabled={state === 'loading'}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl gradient-primary text-primary-foreground text-sm font-medium shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {state === 'loading'
                            ? <><Loader2 className="h-4 w-4 animate-spin" /> Wird gesendet…</>
                            : <>Zugang per E-Mail erhalten <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>}
                    </button>
                    <p className="text-[10px] text-[var(--muted-foreground)]/60 text-center px-2">
                        Mit dem Anfordern stimmen Sie zu, dass wir Sie zu Partsunion kontaktieren dürfen.
                    </p>
                </form>
            )}
        </div>
    );
}
