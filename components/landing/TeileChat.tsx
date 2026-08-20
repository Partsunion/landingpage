'use client';

/**
 * TeileChat — schlanker Live-Demo-Chat für die KI-Teileermittlung.
 *
 * BEWUSST „dumm": keine clientseitige Fahrzeug-/Teil-Parserei und kein Wizard.
 * Jede Nutzer-Nachricht geht als Freitext an POST /api/demo/chat — dort fährt der
 * Server die EXAKT GLEICHE Pipeline wie der WhatsApp-Bot (handleIncomingBotMessage:
 * NLU → Fahrzeug-/Teil-Erkennung → Disambiguierung → OEM-Auflösung), nur als
 * Teile-Test-Abfrage (Kundentyp/Preisfrage übersprungen, fest Deutsch). Die
 * gesamte Intelligenz lebt im Bot — diese Komponente zeigt nur Verlauf + Buttons.
 */

import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import Link from 'next/link';
import { Send, Bot, User, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { SafeMarkdown } from '@/components/ui/SafeMarkdown';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.partsunion.de';

const uid = () => crypto.randomUUID();

interface Msg { id: string; role: 'user' | 'bot'; text: string; }
interface Btn { id: string; title: string; }

const SUGGESTIONS = [
    'Bremsscheiben vorne für einen Audi A4 B8 2.0 TDI, Baujahr 2010',
    'Ölfilter für VW Golf 7 1.6 TDI',
    'Stoßdämpfer hinten BMW 320d E90',
];

export function TeileChat() {
    const [sessionId] = useState(() => 'web-' + uid());
    const [messages, setMessages] = useState<Msg[]>([]);
    const [buttons, setButtons] = useState<Btn[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [limited, setLimited] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

    useEffect(() => {
        setMessages([{
            id: uid(), role: 'bot',
            text: '👋 **Willkommen zur Live-Demo der KI-Teileermittlung.**\n\nBeschreiben Sie einfach **Fahrzeug + gesuchtes Teil** — z. B. _„Bremsscheiben vorne für einen Audi A4 B8 2.0 TDI, Baujahr 2010"_.\n\nEs antwortet **dieselbe KI wie unser WhatsApp-Bot**.',
        }]);
    }, []);

    const send = useCallback(async (text: string) => {
        const msg = (text || '').trim();
        if (!msg || loading || limited) return;
        setMessages(p => [...p, { id: uid(), role: 'user', text: msg }]);
        setInput(''); setButtons([]); setLoading(true);
        try {
            const r = await fetch(`${API_BASE}/api/demo/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, message: msg }),
            });
            if (r.status === 429) {
                setLimited(true);
                setMessages(p => [...p, { id: uid(), role: 'bot', text: '🔒 **Demo-Limit erreicht.**\n\nFür die unbegrenzte Nutzung vereinbaren Sie gern ein kurzes Gespräch.' }]);
                return;
            }
            const data = await r.json().catch(() => ({})) as { reply?: string; buttons?: Btn[]; error?: string };
            const reply = data?.reply || data?.error || 'Entschuldigung, das hat nicht geklappt. Bitte erneut versuchen.';
            setMessages(p => [...p, { id: uid(), role: 'bot', text: reply }]);
            setButtons(Array.isArray(data?.buttons) ? data.buttons.slice(0, 3) : []);
        } catch {
            setMessages(p => [...p, { id: uid(), role: 'bot', text: '⚠️ Verbindung fehlgeschlagen. Bitte erneut versuchen.' }]);
        } finally {
            setLoading(false);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [sessionId, loading, limited]);

    const onSubmit = (e: FormEvent) => { e.preventDefault(); send(input); };

    return (
        <section className="h-screen pt-24 pb-4 px-4 relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-40" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] gradient-glow opacity-30 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col h-[calc(100vh-120px)]">
                {/* Header */}
                <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-accent mb-3">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Live Demo · Teileermittlung</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-1">
                        KI-<span className="text-gradient">Teileermittlung</span>
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-sm">Fahrzeug + Teil beschreiben — dieselbe KI wie im WhatsApp-Bot</p>
                </div>

                {/* Chat — WhatsApp-Light-Optik (Referenz: feature-previews/ChatPreview.tsx) */}
                <div className="flex-1 overflow-hidden rounded-2xl bg-card border border-border flex flex-col shadow-[var(--shadow-raised)]">
                    {/* WhatsApp-Header */}
                    <div className="flex items-center gap-3 h-12 px-3 shrink-0 bg-[#008069]">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 bg-[rgba(255,255,255,0.22)]">
                            <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="text-[13px] font-semibold text-white truncate">Partsunion KI-Bot</div>
                            <div className="flex items-center gap-1.5">
                                <span className="inline-block h-1 w-1 rounded-full bg-[#12B76A]" />
                                <span className="text-[10px] text-[rgba(255,255,255,0.7)]">online · antwortet sofort</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-4 md:p-5 space-y-4 overflow-auto bg-[#EFEAE2]">
                        {messages.map(m => (
                            <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_1px_1px_rgba(11,20,26,0.10)] ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white text-primary'}`}>
                                    {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                </div>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed text-[#111B21] shadow-[0_1px_1px_rgba(11,20,26,0.10)] ${m.role === 'user' ? 'bg-[#D9FDD3] rounded-tr-md' : 'bg-white rounded-tl-md'}`}>
                                    <SafeMarkdown text={m.text} />
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex gap-3">
                                <div className="shrink-0 w-8 h-8 rounded-lg bg-white text-primary flex items-center justify-center shadow-[0_1px_1px_rgba(11,20,26,0.10)]">
                                    <Bot className="h-4 w-4" />
                                </div>
                                <div className="rounded-2xl rounded-tl-md px-4 py-3 bg-white shadow-[0_1px_1px_rgba(11,20,26,0.10)] flex items-center gap-2 text-[var(--muted-foreground)] text-sm">
                                    <Loader2 className="h-4 w-4 animate-spin text-primary" /> KI analysiert…
                                </div>
                            </div>
                        )}

                        {/* Quick-reply buttons vom Bot (Meta-kompatibel, max 3) */}
                        {buttons.length > 0 && !loading && !limited && (
                            <div className="flex gap-2 flex-wrap pl-11">
                                {buttons.map(b => (
                                    <button key={b.id} onClick={() => send(b.title)}
                                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-primary shadow-[0_1px_1px_rgba(11,20,26,0.10)] hover:bg-accent transition-all">
                                        {b.title}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Vorschläge nur am Anfang */}
                        {messages.length <= 1 && !loading && (
                            <div className="flex gap-2 flex-wrap pl-11">
                                {SUGGESTIONS.map(s => (
                                    <button key={s} onClick={() => send(s)}
                                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-[var(--muted-foreground)] shadow-[0_1px_1px_rgba(11,20,26,0.10)] hover:bg-accent hover:text-primary transition-all text-left">
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={endRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={onSubmit} className="border-t border-border bg-muted p-3 flex items-center gap-2">
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            disabled={loading || limited}
                            placeholder={limited ? 'Demo-Limit erreicht' : 'Fahrzeug + Teil beschreiben…'}
                            className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-sm focus:border-primary focus:outline-none transition-all disabled:opacity-40 placeholder:text-[var(--muted-foreground)]/50"
                        />
                        <button type="submit" disabled={!input.trim() || loading || limited}
                            className="shrink-0 w-12 h-12 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] hover:brightness-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                        </button>
                    </form>
                </div>

                {/* CTA */}
                <div className="text-center mt-3">
                    <Link href="/#beratung?source=demo-teile"
                        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-primary transition-colors">
                        Überzeugt? Beratungstermin sichern <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
