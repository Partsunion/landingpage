'use client';

/**
 * ChatPreview — Single Source of Truth für WhatsApp-style Conversations.
 *
 * Animation: Nachrichten erscheinen sequentiell. Vor jeder Bot-Nachricht
 * blinkt ein Typing-Indicator (3 Dots, ähnlich WhatsApp). User-Nachrichten
 * poppen direkt rein. Die Animation startet sobald die Komponente im
 * Viewport ist, und loopt alle ~3 s nach dem letzten Bubble.
 *
 * Honors prefers-reduced-motion: dann wird der ganze Verlauf direkt
 * statisch gerendert, ohne Animation.
 *
 * Verwendet auf:
 *   - Feature-Pages (whatsapp-bot, 24-7-einsatzbereit) via FeaturePreview
 *   - TechTabs auf der Landingpage (via WhatsAppPreview-Wrapper)
 *
 * Unterstützt 5 Message-Typen via discriminated union:
 *   - text · image · offer · payment · confirm
 */

import { useEffect, useRef, useState } from 'react';
import {
    AnimatePresence,
    motion,
    useInView,
    useReducedMotion,
} from 'framer-motion';
import { CheckCircle2, CreditCard, ShieldCheck, Truck } from 'lucide-react';

// ── Public types ─────────────────────────────────────────────────────────────

export type ChatMessage =
    | { from: 'user' | 'bot'; kind?: 'text'; text: string; time: string; tag?: string }
    | { from: 'user'; kind: 'image'; caption?: string; imageLabel: string; time: string }
    | { from: 'bot'; kind: 'offer'; text: string; price: string; deliveryNote: string; time: string; tag?: string }
    | { from: 'bot'; kind: 'payment'; amount: string; methods?: string[]; time: string; tag?: string }
    | { from: 'bot'; kind: 'confirm'; orderId: string; eta: string; time: string; tag?: string };

export interface ChatPreviewData {
    title: string;
    sub?: string;
    customerName: string;
    customerInitials: string;
    messages: ChatMessage[];
    footer?: string;
}

// ── Tokens ──────────────────────────────────────────────────────────────────

const T = {
    bgCanvas: '#0A0B0D',
    bgSurface: '#111418',
    border: '#252A31',
    textPrimary: '#E8ECF1',
    textMuted: '#5E6670',
    accent500: '#1D6FE8',
    success: '#4ADE80',
    whatsappHeader: '#075E54',
    whatsappBubble: '#262D31',
    whatsappOutBubble: '#005C4B',
    paperBg: '#F5F4F1',
    paperBorder: '#E8E6E0',
    paperText: '#1A1E24',
    paperMuted: '#5E6670',
} as const;

const FONT_MONO = "'IBM Plex Mono', 'JetBrains Mono', 'SF Mono', monospace";
const FONT_DISPLAY = "var(--font-geist-sans), 'Inter Display', 'Inter', system-ui, sans-serif";

// ── Animation timing ────────────────────────────────────────────────────────

/**
 * Per-message delay before "typing..." appears, in ms.
 * User-messages: short delay (they "type fast")
 * Bot-messages: longer delay (the bot "thinks"), plus a typing-dots phase
 */
const DELAY_BEFORE = {
    user: 320,
    bot: 700,
} as const;

/** How long the typing-dots show before the bot bubble appears. */
const TYPING_DURATION_BOT = 900;

/** Pause at the end before the loop restarts. */
const LOOP_END_PAUSE = 4000;

// ── Bubble renderers ─────────────────────────────────────────────────────────

function TimeRow({ time, tag, side }: { time: string; tag?: string; side: 'left' | 'right' }) {
    return (
        <div className={`flex items-center gap-2 px-1 ${side === 'right' ? 'justify-end' : 'justify-start'}`}>
            {tag && (
                <span
                    className="text-[9px] px-1.5 py-0.5 rounded"
                    style={{
                        fontFamily: FONT_MONO,
                        background: `${T.accent500}26`,
                        color: T.accent500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                    }}
                >
                    {tag}
                </span>
            )}
            <span className="text-[9px] tabular-nums" style={{ fontFamily: FONT_MONO, color: T.textMuted }}>
                {time}
            </span>
        </div>
    );
}

function TextBubble({ msg }: { msg: Extract<ChatMessage, { kind?: 'text' }> }) {
    const isBot = msg.from === 'bot';
    return (
        <div className={`flex ${isBot ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[78%] flex flex-col gap-0.5">
                <div
                    className="px-3 py-2 text-[11px] leading-relaxed whitespace-pre-line"
                    style={{
                        background: isBot ? T.whatsappOutBubble : T.whatsappBubble,
                        color: T.textPrimary,
                        borderRadius: 8,
                        borderTopRightRadius: isBot ? 2 : 8,
                        borderTopLeftRadius: isBot ? 8 : 2,
                    }}
                >
                    {msg.text}
                </div>
                <TimeRow time={msg.time} tag={msg.tag} side={isBot ? 'right' : 'left'} />
            </div>
        </div>
    );
}

function ImageBubble({ msg }: { msg: Extract<ChatMessage, { kind: 'image' }> }) {
    return (
        <div className="flex justify-start">
            <div className="max-w-[78%] flex flex-col gap-0.5">
                <div
                    className="p-1.5 rounded-lg"
                    style={{ background: T.whatsappBubble, borderTopLeftRadius: 2 }}
                >
                    <div
                        className="rounded p-2"
                        style={{ background: T.paperBg, color: T.paperText, fontFamily: FONT_DISPLAY }}
                    >
                        <div className="h-1 rounded-sm mb-1" style={{ background: '#0E9F77' }} />
                        <div className="text-[6px] font-semibold tracking-wide mb-1" style={{ color: '#0E5B43' }}>
                            ZULASSUNGSBESCHEINIGUNG TEIL&nbsp;I
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-[6px]" style={{ fontFamily: FONT_MONO }}>
                            <div>
                                <div className="text-[5px]" style={{ color: T.paperMuted }}>HSN</div>
                                <div className="font-semibold">0603</div>
                            </div>
                            <div>
                                <div className="text-[5px]" style={{ color: T.paperMuted }}>TSN</div>
                                <div className="font-semibold">BNK</div>
                            </div>
                            <div className="col-span-2">
                                <div className="text-[5px]" style={{ color: T.paperMuted }}>FIN / VIN</div>
                                <div className="font-semibold">WVWZZZ1KZAW1923XX</div>
                            </div>
                        </div>
                    </div>
                    {msg.caption && (
                        <div className="text-[10px] px-1.5 py-1" style={{ color: T.textPrimary }}>{msg.caption}</div>
                    )}
                </div>
                <TimeRow time={msg.time} side="left" />
            </div>
        </div>
    );
}

function OfferBubble({ msg }: { msg: Extract<ChatMessage, { kind: 'offer' }> }) {
    return (
        <div className="flex justify-end">
            <div className="max-w-[82%] flex flex-col gap-0.5 w-full">
                <div
                    className="px-3 py-2.5 text-[11px] leading-relaxed"
                    style={{
                        background: T.whatsappOutBubble,
                        color: T.textPrimary,
                        borderRadius: 8,
                        borderTopRightRadius: 2,
                    }}
                >
                    <div className="whitespace-pre-line">{msg.text}</div>
                    <div className="mt-2 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                        <div className="flex items-baseline justify-between mb-1.5">
                            <span className="text-[9px] uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                                Gesamt inkl. MwSt.
                            </span>
                            <span className="font-mono tabular-nums text-base font-semibold">{msg.price}</span>
                        </div>
                        <div className="text-[10px] mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                            {msg.deliveryNote}
                        </div>
                        <button
                            type="button"
                            className="w-full py-1.5 rounded text-[10px] font-semibold uppercase tracking-[0.08em]"
                            style={{ background: '#FFFFFF', color: T.whatsappOutBubble }}
                        >
                            Jetzt bezahlen &amp; bestellen
                        </button>
                    </div>
                </div>
                <TimeRow time={msg.time} tag={msg.tag} side="right" />
            </div>
        </div>
    );
}

function PaymentBubble({ msg }: { msg: Extract<ChatMessage, { kind: 'payment' }> }) {
    const methods = msg.methods ?? ['Klarna', 'PayPal', 'Karte', 'SOFORT'];
    return (
        <div className="flex justify-end">
            <div className="max-w-[86%] flex flex-col gap-0.5 w-full">
                <motion.div
                    initial={{ boxShadow: `0 0 0 0 ${T.accent500}00` }}
                    animate={{ boxShadow: `0 0 18px 2px ${T.accent500}40` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="rounded-lg overflow-hidden"
                    style={{
                        background: T.bgCanvas,
                        border: `1px solid ${T.accent500}55`,
                        borderTopRightRadius: 2,
                    }}
                >
                    <div
                        className="px-3 py-2 flex items-center gap-2 border-b"
                        style={{ background: T.bgSurface, borderColor: T.border }}
                    >
                        <ShieldCheck className="h-3 w-3" style={{ color: T.success }} />
                        <span
                            className="text-[9px] uppercase tracking-[0.08em] font-semibold"
                            style={{ fontFamily: FONT_MONO, color: T.textPrimary }}
                        >
                            Vorkasse · Gesicherte Zahlung
                        </span>
                    </div>
                    <div className="px-3 py-2.5">
                        <div className="flex items-baseline justify-between mb-2">
                            <span className="text-[9px] uppercase tracking-[0.1em]" style={{ color: T.textMuted }}>
                                Zu zahlen
                            </span>
                            <span
                                className="font-mono tabular-nums text-lg font-semibold"
                                style={{ color: T.textPrimary }}
                            >
                                {msg.amount}
                            </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1 mb-2.5">
                            {methods.map((m, i) => (
                                <motion.div
                                    key={m}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 + i * 0.07, duration: 0.3 }}
                                    className="text-[8px] text-center py-1 rounded border"
                                    style={{
                                        background: T.bgSurface,
                                        borderColor: T.border,
                                        color: T.textPrimary,
                                        fontFamily: FONT_MONO,
                                        letterSpacing: '0.04em',
                                    }}
                                >
                                    {m}
                                </motion.div>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="w-full py-1.5 rounded text-[10px] font-semibold flex items-center justify-center gap-1.5"
                            style={{
                                background: T.accent500,
                                color: '#FFFFFF',
                            }}
                        >
                            <CreditCard className="h-3 w-3" />
                            Sicher bezahlen — {msg.amount}
                        </button>
                        <div className="mt-1.5 text-[8px] text-center" style={{ color: T.textMuted }}>
                            Bestellung wird ausgelöst sobald Zahlung eingeht.
                        </div>
                    </div>
                </motion.div>
                <TimeRow time={msg.time} tag={msg.tag ?? 'vorkasse'} side="right" />
            </div>
        </div>
    );
}

function ConfirmBubble({ msg }: { msg: Extract<ChatMessage, { kind: 'confirm' }> }) {
    return (
        <div className="flex justify-end">
            <div className="max-w-[82%] flex flex-col gap-0.5 w-full">
                <div
                    className="rounded-lg overflow-hidden"
                    style={{
                        background: T.whatsappOutBubble,
                        color: T.textPrimary,
                        borderRadius: 8,
                        borderTopRightRadius: 2,
                    }}
                >
                    <div className="px-3 py-2.5">
                        <div className="flex items-center gap-2 mb-1">
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.15 }}
                            >
                                <CheckCircle2 className="h-3.5 w-3.5" style={{ color: T.success }} />
                            </motion.span>
                            <span className="text-[11px] font-semibold">Zahlung bestätigt — Bestellung läuft.</span>
                        </div>
                        <div className="text-[10px] leading-relaxed pl-5" style={{ color: 'rgba(255,255,255,0.85)' }}>
                            Auftrag <span style={{ fontFamily: FONT_MONO }}>#{msg.orderId}</span>
                            <br />
                            Großhändler-Order ausgelöst · Lieferung {msg.eta}
                        </div>
                        <div
                            className="mt-2 pt-2 flex items-center gap-1.5 text-[9px] border-t"
                            style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
                        >
                            <Truck className="h-3 w-3" />
                            Tracking-Link folgt automatisch.
                        </div>
                    </div>
                </div>
                <TimeRow time={msg.time} tag={msg.tag ?? 'auto'} side="right" />
            </div>
        </div>
    );
}

// ── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
    return (
        <div className="flex justify-end">
            <div
                className="flex items-center gap-1 px-3 py-2.5 rounded-lg"
                style={{
                    background: T.whatsappOutBubble,
                    borderTopRightRadius: 2,
                }}
            >
                {[0, 0.15, 0.3].map((delay) => (
                    <motion.span
                        key={delay}
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.7)' }}
                        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay, ease: 'easeInOut' }}
                    />
                ))}
            </div>
        </div>
    );
}

// ── Bubble dispatcher ────────────────────────────────────────────────────────

function Bubble({ msg }: { msg: ChatMessage }) {
    if (msg.kind === 'image')   return <ImageBubble   msg={msg} />;
    if (msg.kind === 'offer')   return <OfferBubble   msg={msg} />;
    if (msg.kind === 'payment') return <PaymentBubble msg={msg} />;
    if (msg.kind === 'confirm') return <ConfirmBubble msg={msg} />;
    return <TextBubble msg={msg} />;
}

// ── Sequential animation engine ──────────────────────────────────────────────

interface RenderItem {
    kind: 'message' | 'typing';
    msgIndex: number;
    key: string;
}

function useChatAnimation(messages: ChatMessage[], active: boolean, reduceMotion: boolean) {
    const [renderItems, setRenderItems] = useState<RenderItem[]>([]);

    useEffect(() => {
        if (reduceMotion) {
            setRenderItems(messages.map((_, i) => ({ kind: 'message' as const, msgIndex: i, key: `m-${i}` })));
            return;
        }

        if (!active) {
            setRenderItems([]);
            return;
        }

        let cancelled = false;
        const timers: ReturnType<typeof setTimeout>[] = [];
        let runId = 0;

        const runOnce = () => {
            const currentRun = ++runId;
            setRenderItems([]);

            let elapsed = 0;
            messages.forEach((m, i) => {
                const isBot = m.from === 'bot';
                elapsed += isBot ? DELAY_BEFORE.bot : DELAY_BEFORE.user;

                if (isBot) {
                    // Show typing dots first
                    const typingStart = elapsed;
                    timers.push(
                        setTimeout(() => {
                            if (cancelled || runId !== currentRun) return;
                            setRenderItems((prev) => [...prev, { kind: 'typing', msgIndex: i, key: `t-${i}` }]);
                        }, typingStart),
                    );
                    elapsed += TYPING_DURATION_BOT;
                    timers.push(
                        setTimeout(() => {
                            if (cancelled || runId !== currentRun) return;
                            setRenderItems((prev) => [
                                ...prev.filter((p) => !(p.kind === 'typing' && p.msgIndex === i)),
                                { kind: 'message', msgIndex: i, key: `m-${i}` },
                            ]);
                        }, elapsed),
                    );
                } else {
                    timers.push(
                        setTimeout(() => {
                            if (cancelled || runId !== currentRun) return;
                            setRenderItems((prev) => [...prev, { kind: 'message', msgIndex: i, key: `m-${i}` }]);
                        }, elapsed),
                    );
                }
            });

            // Loop after pause
            timers.push(
                setTimeout(() => {
                    if (cancelled || runId !== currentRun) return;
                    runOnce();
                }, elapsed + LOOP_END_PAUSE),
            );
        };

        runOnce();

        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
    }, [messages, active, reduceMotion]);

    return renderItems;
}

// ── Bubble wrapper with motion ───────────────────────────────────────────────

function BubbleMotion({ children, isBot }: { children: React.ReactNode; isBot: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: isBot ? 'right bottom' : 'left bottom' }}
        >
            {children}
        </motion.div>
    );
}

// ── Main component ───────────────────────────────────────────────────────────

export function ChatPreview({ data }: { data: ChatPreviewData }) {
    const reduceMotion = useReducedMotion() ?? false;
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: false, amount: 0.3 });

    const items = useChatAnimation(data.messages, inView, reduceMotion);

    // Auto-scroll to bottom on each new item.
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
    }, [items, reduceMotion]);

    return (
        <div
            ref={containerRef}
            className="w-full max-w-[360px] mx-auto rounded-2xl overflow-hidden border border-border/60 bg-[rgba(15,23,42,0.4)]"
            style={{
                fontFamily: FONT_DISPLAY,
                color: T.textPrimary,
            }}
        >
            {/* WhatsApp-style header */}
            <div
                className="flex items-center gap-3 h-12 px-3 border-b"
                style={{ background: T.whatsappHeader, borderColor: T.border }}
            >
                <div
                    className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
                    style={{ background: 'rgba(255,255,255,0.2)', color: T.textPrimary }}
                >
                    {data.customerInitials}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-semibold truncate" style={{ color: T.textPrimary }}>
                        {data.customerName}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span
                            className="inline-block h-1 w-1 rounded-full"
                            style={{ background: T.success, boxShadow: `0 0 4px ${T.success}` }}
                        />
                        <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                            {data.sub ?? 'online'}
                        </span>
                    </div>
                </div>
                <span
                    className="text-[10px] tabular-nums shrink-0"
                    style={{ fontFamily: FONT_MONO, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em' }}
                >
                    {data.title}
                </span>
            </div>

            {/* Scrollable message area — fixed height for stable layout */}
            <div
                ref={scrollRef}
                className="px-3 py-3 space-y-2 overflow-hidden"
                style={{ height: 440 }}
            >
                <AnimatePresence initial={false}>
                    {items.map((item) => {
                        if (item.kind === 'typing') {
                            return (
                                <motion.div
                                    key={item.key}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.22 }}
                                >
                                    <TypingDots />
                                </motion.div>
                            );
                        }
                        const msg = data.messages[item.msgIndex];
                        const isBot = msg.from === 'bot';
                        return (
                            <BubbleMotion key={item.key} isBot={isBot}>
                                <Bubble msg={msg} />
                            </BubbleMotion>
                        );
                    })}
                </AnimatePresence>
            </div>

            {data.footer && (
                <div
                    className="px-3 py-2.5 border-t flex items-center gap-2"
                    style={{ borderColor: T.border, background: T.bgSurface }}
                >
                    <span
                        className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ background: T.accent500, boxShadow: `0 0 6px ${T.accent500}` }}
                    />
                    <span
                        className="text-[10px] tabular-nums truncate"
                        style={{ fontFamily: FONT_MONO, color: T.textMuted, letterSpacing: '0.04em' }}
                    >
                        {data.footer}
                    </span>
                </div>
            )}
        </div>
    );
}
