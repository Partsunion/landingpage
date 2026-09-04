'use client';

import {
    ArrowRight,
    Bot,
    Building2,
    Camera,
    Check,
    CheckCircle2,
    CircleUserRound,
    CreditCard,
    Factory,
    Loader2,
    LockKeyhole,
    MessageCircle,
    PackageCheck,
    RotateCcw,
    Send,
    ShieldCheck,
    Sparkles,
    User,
    Wrench,
    X,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { SafeMarkdown } from '@/components/ui/SafeMarkdown';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.partsunion.de';
const uid = () => crypto.randomUUID();

type CustomerType = 'privat' | 'b2b_werkstatt' | 'b2b_haendler';
type Stage = 'contact' | 'chat' | 'complete';

interface CustomerDraft {
    customerType: CustomerType;
    name: string;
    company: string;
    email: string;
    phone: string;
    consent: boolean;
}

interface DemoOffer {
    orderId: string;
    productName: string;
    brand: string;
    oemNumber: string;
    supplierPartNumber: string;
    supplierName: string;
    priceNet: number;
    priceGross: number;
    vatRate: number;
    currency: string;
    leadTime: string;
    demoPaymentEnabled: boolean;
    oemVerification: 'exact' | 'demo_reference';
}

interface Message {
    id: string;
    role: 'user' | 'bot';
    text: string;
    imageUrl?: string;
    offer?: DemoOffer;
}

interface PendingImage {
    name: string;
    dataUrl: string;
}

interface ReplyButton {
    id: string;
    title: string;
}

interface ChatResponse {
    reply?: string;
    buttons?: ReplyButton[];
    demoOffer?: DemoOffer;
    completed?: boolean;
    error?: string;
}

interface DemoPayment {
    status: 'simulated_paid';
    reference: string;
    amount: number;
    currency: string;
    method: 'demo_card';
    paidAt: string;
    demo: true;
}

interface DemoPaymentResponse {
    ok?: boolean;
    payment?: DemoPayment;
    message?: string;
    error?: string;
}

const TYPES: Array<{
    value: CustomerType;
    label: string;
    detail: string;
    icon: typeof User;
}> = [
    { value: 'privat', label: 'Privatkunde', detail: 'Endkunden-Anfrage', icon: CircleUserRound },
    { value: 'b2b_werkstatt', label: 'Werkstatt', detail: 'B2B-Teileanfrage', icon: Wrench },
    { value: 'b2b_haendler', label: 'Teilehändler', detail: 'Händler-Anfrage', icon: Factory },
];

const SUGGESTIONS = [
    'Bremsscheibe vorne für WVWZZZAUZJP051563',
    'Bremsbeläge vorne für WAUHMAF40JA073675',
    'Bremsscheibe hinten für WVWZZZAUZJP051563',
];

const initialCustomer: CustomerDraft = {
    customerType: 'b2b_werkstatt',
    name: '',
    company: '',
    email: '',
    phone: '',
    consent: false,
};

const MAX_SOURCE_IMAGE_BYTES = 12 * 1024 * 1024;
const MAX_DEMO_DATA_URL_LENGTH = 4_000_000;

function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(new Error('Das Bild konnte nicht gelesen werden.'));
        reader.readAsDataURL(file);
    });
}

function loadBrowserImage(dataUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Das Bildformat konnte nicht verarbeitet werden.'));
        image.src = dataUrl;
    });
}

async function prepareVehicleDocument(file: File): Promise<PendingImage> {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        throw new Error('Bitte verwenden Sie ein JPG-, PNG- oder WebP-Bild.');
    }
    if (file.size > MAX_SOURCE_IMAGE_BYTES) {
        throw new Error('Das Ausgangsbild ist zu groß. Maximal erlaubt sind 12 MB.');
    }

    const source = await readFileAsDataUrl(file);
    const image = await loadBrowserImage(source);
    const maxEdge = 2200;
    const scale = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Das Bild konnte nicht vorbereitet werden.');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    let quality = 0.9;
    let dataUrl = canvas.toDataURL('image/jpeg', quality);
    while (dataUrl.length > MAX_DEMO_DATA_URL_LENGTH && quality > 0.54) {
        quality -= 0.09;
        dataUrl = canvas.toDataURL('image/jpeg', quality);
    }
    if (dataUrl.length > MAX_DEMO_DATA_URL_LENGTH) {
        throw new Error('Das Bild bleibt nach der Optimierung zu groß. Bitte fotografieren Sie den Fahrzeugschein etwas näher.');
    }
    return { name: file.name || 'Fahrzeugschein.jpg', dataUrl };
}

function Step({
    index,
    label,
    state,
}: {
    index: number;
    label: string;
    state: 'done' | 'active' | 'pending';
}) {
    return (
        <div className={`flex items-center gap-2.5 ${state === 'pending' ? 'opacity-45' : ''}`}>
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                state === 'done'
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : state === 'active'
                        ? 'border-primary bg-primary text-white shadow-[0_0_0_4px_rgba(29,111,232,.12)]'
                        : 'border-border bg-card text-[var(--muted-foreground)]'
            }`}>
                {state === 'done' ? <Check className="h-3.5 w-3.5" /> : index}
            </span>
            <span className={`text-xs font-medium ${state === 'active' ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}>
                {label}
            </span>
        </div>
    );
}

function OfferCard({
    offer,
    paid,
    onPay,
}: {
    offer: DemoOffer;
    paid: boolean;
    onPay: () => void;
}) {
    const price = Number(offer.priceGross || 0).toLocaleString('de-DE', {
        style: 'currency',
        currency: offer.currency || 'EUR',
    });
    const net = Number(offer.priceNet || 0).toLocaleString('de-DE', {
        style: 'currency',
        currency: offer.currency || 'EUR',
    });
    return (
        <div className="mt-3 overflow-hidden rounded-xl border border-amber-300/70 bg-white shadow-[0_8px_25px_rgba(15,23,42,.08)]">
            <div className="flex items-center justify-between gap-3 border-b border-amber-200 bg-amber-50 px-4 py-2.5">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-amber-800">
                    <PackageCheck className="h-4 w-4" /> Demo-Angebot
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                    paid
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                        : 'border-amber-300 bg-white text-amber-800'
                }`}>
                    {paid ? 'Demo-Zahlung erfolgreich' : 'Sofort zahlbar · Demo'}
                </span>
            </div>
            <div className="space-y-3 p-4 text-[#111B21]">
                <div>
                    <div className="text-sm font-bold">{offer.productName}</div>
                    <div className="mt-0.5 text-xs text-slate-500">
                        {offer.brand} · {offer.supplierName || 'Demo-Großhändler'}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 text-xs">
                    <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            {offer.oemVerification === 'exact' ? 'OE-Nummer' : 'OE-Referenz (Demo)'}
                        </div>
                        <div className="mt-1 font-mono font-semibold">{offer.oemNumber}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Demo-Artikel</div>
                        <div className="mt-1 truncate font-mono font-semibold">{offer.supplierPartNumber}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Lieferzeit</div>
                        <div className="mt-1 font-medium">{offer.leadTime}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Preis</div>
                        <div className="mt-1 font-mono text-base font-bold text-primary">{price}</div>
                        <div className="text-[10px] text-slate-400">{net} netto · {offer.vatRate || 19} % MwSt.</div>
                    </div>
                </div>
                {paid ? (
                    <div className="flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-[11px] leading-relaxed text-emerald-700">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        Der Demo-Checkout wurde abgeschlossen und ist im Händler-Dashboard vermerkt.
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={onPay}
                        disabled={offer.demoPaymentEnabled === false}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#635BFF] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(99,91,255,.8)] transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                        <CreditCard className="h-4 w-4" />
                        Jetzt bezahlen (Demo)
                    </button>
                )}
                <div className="flex items-start gap-2 text-[11px] leading-relaxed text-amber-800">
                    <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    Demo-Modus: kein echtes Geld und keine Übertragung an einen Großhändler.
                </div>
            </div>
        </div>
    );
}

function DemoCheckout({
    offer,
    payment,
    loading,
    error,
    onClose,
    onConfirm,
}: {
    offer: DemoOffer;
    payment?: DemoPayment;
    loading: boolean;
    error: string;
    onClose: () => void;
    onConfirm: () => void;
}) {
    const price = Number(offer.priceGross || 0).toLocaleString('de-DE', {
        style: 'currency',
        currency: offer.currency || 'EUR',
    });
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Demo-Checkout">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#635BFF]">Sicherer Checkout</div>
                        <div className="mt-0.5 text-lg font-bold text-slate-900">Partsunion Demo-Zahlung</div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Checkout schließen"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {payment ? (
                    <div className="p-6 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-slate-900">Demo-Zahlung erfolgreich</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                            Der Vorgang wurde im Händler-Dashboard gespeichert. Es wurde kein echtes Geld belastet.
                        </p>
                        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-left text-xs text-slate-500">
                            <div className="flex justify-between gap-4">
                                <span>Referenz</span>
                                <span className="font-mono font-semibold text-slate-800">{payment.reference}</span>
                            </div>
                            <div className="mt-2 flex justify-between gap-4">
                                <span>Betrag</span>
                                <span className="font-mono font-semibold text-slate-800">{price}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-5 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                        >
                            Fertig
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4 p-5">
                        <div className="rounded-xl bg-slate-50 p-4">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="text-sm font-semibold text-slate-900">{offer.productName}</div>
                                    <div className="mt-1 font-mono text-xs text-slate-500">OE {offer.oemNumber}</div>
                                </div>
                                <div className="font-mono text-base font-bold text-slate-900">{price}</div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-xs font-semibold text-slate-700">Zahlungsmethode</div>
                            <div className="flex items-center gap-3 rounded-xl border-2 border-[#635BFF] bg-[#635BFF]/5 p-3">
                                <CreditCard className="h-5 w-5 text-[#635BFF]" />
                                <div className="min-w-0 flex-1">
                                    <div className="text-sm font-semibold text-slate-900">Demo-Karte</div>
                                    <div className="font-mono text-xs text-slate-500">•••• •••• •••• 4242</div>
                                </div>
                                <CheckCircle2 className="h-5 w-5 text-[#635BFF]" />
                            </div>
                        </div>
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
                            Dies ist eine Zahlungssimulation. Es werden keine Karten- oder Kontodaten erhoben und kein Betrag belastet.
                        </div>
                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
                        )}
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#635BFF] px-4 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-55"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
                            {loading ? 'Demo-Zahlung wird verbucht…' : `${price} sicher bezahlen (Demo)`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export function BotDemo() {
    const [sessionId] = useState(() => `web-${uid()}`);
    const [stage, setStage] = useState<Stage>('contact');
    const [customer, setCustomer] = useState<CustomerDraft>(initialCustomer);
    const [messages, setMessages] = useState<Message[]>([]);
    const [buttons, setButtons] = useState<ReplyButton[]>([]);
    const [input, setInput] = useState('');
    const [pendingImage, setPendingImage] = useState<PendingImage | null>(null);
    const [imagePreparing, setImagePreparing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [checkoutOffer, setCheckoutOffer] = useState<DemoOffer | null>(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const [demoPayments, setDemoPayments] = useState<Record<string, DemoPayment>>({});
    const messagesPaneRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const pane = messagesPaneRef.current;
        if (!pane) return;
        pane.scrollTo({
            top: pane.scrollHeight,
            behavior: loading ? 'auto' : 'smooth',
        });
    }, [messages, loading]);

    const updateCustomer = <K extends keyof CustomerDraft>(key: K, value: CustomerDraft[K]) => {
        setCustomer((current) => ({ ...current, [key]: value }));
    };

    const startDemo = async (event: FormEvent) => {
        event.preventDefault();
        if (loading) return;
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE}/api/demo/chat/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, customer }),
            });
            const data = await response.json().catch(() => ({})) as ChatResponse;
            if (!response.ok) throw new Error(data.error || 'Die Demo konnte nicht gestartet werden.');
            setMessages([{
                id: uid(),
                role: 'bot',
                text: data.reply || 'Willkommen! Welches Fahrzeug und welches Teil suchen Sie?',
            }]);
            setStage('chat');
            setTimeout(() => inputRef.current?.focus(), 80);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Die Demo konnte nicht gestartet werden.');
        } finally {
            setLoading(false);
        }
    };

    const send = useCallback(async (raw: string) => {
        const message = raw.trim();
        const attachment = pendingImage;
        if ((!message && !attachment) || loading || imagePreparing || stage !== 'chat') return;
        const displayText = message || '📄 Fahrzeugschein hochgeladen';
        setMessages((current) => [...current, {
            id: uid(),
            role: 'user',
            text: displayText,
            imageUrl: attachment?.dataUrl,
        }]);
        setInput('');
        setPendingImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setButtons([]);
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE}/api/demo/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    message: message || 'Fahrzeugschein hochgeladen',
                    imageDataUrl: attachment?.dataUrl,
                }),
            });
            const data = await response.json().catch(() => ({})) as ChatResponse;
            if (!response.ok) throw new Error(data.error || 'Die Anfrage konnte nicht verarbeitet werden.');
            setMessages((current) => [...current, {
                id: uid(),
                role: 'bot',
                text: data.reply || 'Bitte versuchen Sie es erneut.',
                offer: data.demoOffer,
            }]);
            setButtons(Array.isArray(data.buttons) ? data.buttons.slice(0, 3) : []);
            if (data.completed) setStage('complete');
        } catch (requestError) {
            setMessages((current) => [...current, {
                id: uid(),
                role: 'bot',
                text: `⚠️ ${requestError instanceof Error ? requestError.message : 'Verbindung fehlgeschlagen.'}`,
            }]);
        } finally {
            setLoading(false);
            setTimeout(() => inputRef.current?.focus(), 80);
        }
    }, [imagePreparing, loading, pendingImage, sessionId, stage]);

    const selectVehicleDocument = async (file: File | undefined) => {
        if (!file || loading) return;
        setImagePreparing(true);
        setError('');
        try {
            setPendingImage(await prepareVehicleDocument(file));
        } catch (imageError) {
            setPendingImage(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            setError(imageError instanceof Error ? imageError.message : 'Das Bild konnte nicht vorbereitet werden.');
        } finally {
            setImagePreparing(false);
        }
    };

    const completeDemoPayment = async () => {
        if (!checkoutOffer || paymentLoading) return;
        setPaymentLoading(true);
        setPaymentError('');
        try {
            const response = await fetch(`${API_BASE}/api/demo/chat/payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    orderId: checkoutOffer.orderId,
                }),
            });
            const data = await response.json().catch(() => ({})) as DemoPaymentResponse;
            if (!response.ok || !data.payment) {
                throw new Error(data.error || 'Die Demo-Zahlung konnte nicht abgeschlossen werden.');
            }
            setDemoPayments((current) => ({
                ...current,
                [checkoutOffer.orderId]: data.payment!,
            }));
        } catch (requestError) {
            setPaymentError(requestError instanceof Error ? requestError.message : 'Die Demo-Zahlung ist fehlgeschlagen.');
        } finally {
            setPaymentLoading(false);
        }
    };

    const submitMessage = (event: FormEvent) => {
        event.preventDefault();
        void send(input);
    };

    const contactDone = stage !== 'contact';
    const requestDone = stage === 'complete';

    return (
        <div className="relative min-h-screen overflow-hidden px-4 pb-14 pt-28">
            <div className="absolute inset-0 grid-pattern opacity-35" />
            <div className="absolute left-1/2 top-20 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="mb-6 text-center">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-accent px-4 py-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">Partsunion Kundenservice · Live-Demo</span>
                    </div>
                    <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                        Vom Kundenchat bis zum <span className="text-gradient">sichtbaren Auftrag</span>
                    </h1>
                    <p className="mx-auto mt-2 max-w-2xl text-sm text-[var(--muted-foreground)] md:text-base">
                        Testen Sie denselben Teile-Flow wie im WhatsApp-Bot. Ihre Demo-Anfrage erscheint parallel im Händler-Dashboard.
                    </p>
                </div>

                <div className="mb-4 flex flex-wrap items-center justify-center gap-5 rounded-xl border border-border bg-card/85 px-5 py-3 shadow-sm backdrop-blur md:gap-10">
                    <Step index={1} label="Kundendaten" state={contactDone ? 'done' : 'active'} />
                    <ArrowRight className="hidden h-3.5 w-3.5 text-[var(--muted-foreground)] md:block" />
                    <Step index={2} label="Fahrzeug & Teil" state={requestDone ? 'done' : contactDone ? 'active' : 'pending'} />
                    <ArrowRight className="hidden h-3.5 w-3.5 text-[var(--muted-foreground)] md:block" />
                    <Step index={3} label="OE & Demo-Angebot" state={requestDone ? 'done' : 'pending'} />
                </div>

                <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
                    <aside className="order-2 space-y-4 lg:order-1">
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                            <div className="flex items-center gap-2 font-display text-sm font-semibold">
                                <Building2 className="h-4 w-4 text-primary" /> Was im Dashboard ankommt
                            </div>
                            <div className="mt-4 space-y-3">
                                {[
                                    'Kunde und Kontaktdaten',
                                    'Vollständiger Chatverlauf',
                                    'Fahrzeug und gesuchtes Teil',
                                    'Ermittelte OE-Nummer',
                                    'Demo-Angebot als Position',
                                ].map((item, index) => (
                                    <div key={item} className="flex items-center gap-2.5 text-xs text-[var(--muted-foreground)]">
                                        <span className={`flex h-5 w-5 items-center justify-center rounded-full ${
                                            (index === 0 && contactDone) || (index > 0 && requestDone)
                                                ? 'bg-emerald-500/12 text-emerald-600'
                                                : 'bg-muted text-[var(--muted-foreground)]'
                                        }`}>
                                            <Check className="h-3 w-3" />
                                        </span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-amber-300/60 bg-amber-50 p-5 text-amber-950">
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <ShieldCheck className="h-4 w-4" /> Sicherer Demo-Modus
                            </div>
                            <p className="mt-2 text-xs leading-relaxed text-amber-800">
                                Großhändler noch nicht verknüpft. Angebot und Bezahlablauf können vollständig getestet werden, ohne Geld zu belasten oder eine Bestellung auszulösen.
                            </p>
                        </div>

                        {stage === 'complete' && (
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
                            >
                                <RotateCcw className="h-4 w-4" /> Neue Demo-Anfrage
                            </button>
                        )}
                    </aside>

                    <section className="order-1 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_22px_60px_rgba(15,23,42,.12)] lg:order-2">
                        {stage === 'contact' ? (
                            <form onSubmit={startDemo} className="p-5 md:p-7">
                                <div className="mb-6">
                                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">Schritt 1</div>
                                    <h2 className="mt-1 font-display text-xl font-semibold">Als welcher Kunde möchten Sie testen?</h2>
                                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                                        Diese Angaben werden im Demo-Dashboard an Ihrer Anfrage angezeigt.
                                    </p>
                                </div>

                                <div className="grid gap-3 md:grid-cols-3">
                                    {TYPES.map((type) => {
                                        const Icon = type.icon;
                                        const selected = customer.customerType === type.value;
                                        return (
                                            <button
                                                key={type.value}
                                                type="button"
                                                onClick={() => updateCustomer('customerType', type.value)}
                                                className={`relative rounded-xl border p-4 text-left transition-all ${
                                                    selected
                                                        ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_rgba(29,111,232,.18)]'
                                                        : 'border-border bg-muted/40 hover:border-border-hover'
                                                }`}
                                            >
                                                {selected && <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-primary" />}
                                                <Icon className={`mb-3 h-5 w-5 ${selected ? 'text-primary' : 'text-[var(--muted-foreground)]'}`} />
                                                <div className="text-sm font-semibold">{type.label}</div>
                                                <div className="mt-0.5 text-xs text-[var(--muted-foreground)]">{type.detail}</div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                    <label className="text-xs font-medium text-[var(--muted-foreground)]">
                                        Name *
                                        <input
                                            required
                                            autoComplete="name"
                                            value={customer.name}
                                            onChange={(event) => updateCustomer('name', event.target.value)}
                                            placeholder="Max Mustermann"
                                            className="mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/55 focus:border-primary"
                                        />
                                    </label>
                                    <label className="text-xs font-medium text-[var(--muted-foreground)]">
                                        Firma {customer.customerType === 'privat' ? '(optional)' : ''}
                                        <input
                                            required={customer.customerType !== 'privat'}
                                            autoComplete="organization"
                                            value={customer.company}
                                            onChange={(event) => updateCustomer('company', event.target.value)}
                                            placeholder="Muster Kfz GmbH"
                                            className="mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/55 focus:border-primary"
                                        />
                                    </label>
                                    <label className="text-xs font-medium text-[var(--muted-foreground)]">
                                        E-Mail *
                                        <input
                                            required
                                            type="email"
                                            autoComplete="email"
                                            value={customer.email}
                                            onChange={(event) => updateCustomer('email', event.target.value)}
                                            placeholder="max@beispiel.de"
                                            className="mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/55 focus:border-primary"
                                        />
                                    </label>
                                    <label className="text-xs font-medium text-[var(--muted-foreground)]">
                                        Telefonnummer *
                                        <input
                                            required
                                            type="tel"
                                            autoComplete="tel"
                                            value={customer.phone}
                                            onChange={(event) => updateCustomer('phone', event.target.value)}
                                            placeholder="+49 171 2345678"
                                            className="mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/55 focus:border-primary"
                                        />
                                    </label>
                                </div>

                                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/40 p-3.5">
                                    <input
                                        required
                                        type="checkbox"
                                        checked={customer.consent}
                                        onChange={(event) => updateCustomer('consent', event.target.checked)}
                                        className="mt-0.5 h-4 w-4 rounded border-border accent-[var(--primary)]"
                                    />
                                    <span className="text-xs leading-relaxed text-[var(--muted-foreground)]">
                                        Ich stimme zu, dass meine Angaben für diesen Demo-Vorgang verarbeitet und im Demo-Dashboard angezeigt werden. Mehr in der{' '}
                                        <Link href="/legal/datenschutz" target="_blank" className="text-primary underline underline-offset-2">Datenschutzerklärung</Link>.
                                    </span>
                                </label>

                                {error && (
                                    <div className="mt-4 rounded-lg border border-red-300 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl gradient-primary px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_-8px_rgba(29,111,232,.55)] transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
                                    {loading ? 'Demo wird vorbereitet…' : 'Demo-Chat starten'}
                                </button>
                            </form>
                        ) : (
                            <div className="flex h-[680px] max-h-[calc(100vh-150px)] min-h-[560px] flex-col">
                                <div className="flex h-16 shrink-0 items-center gap-3 bg-[#008069] px-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
                                        <Bot className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="truncate text-sm font-semibold text-white">Partsunion Kundenservice</div>
                                        <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-white/70">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                                            {stage === 'complete' ? 'Demo-Angebot erstellt' : 'online · OE-Service aktiv'}
                                        </div>
                                    </div>
                                    <span className="hidden rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white sm:block">
                                        Web-Demo
                                    </span>
                                </div>

                                <div
                                    ref={messagesPaneRef}
                                    className="flex-1 space-y-4 overflow-y-auto bg-[#EFEAE2] p-4 [overflow-anchor:none] md:p-5"
                                >
                                    {messages.map((message) => (
                                        <div key={message.id} className={`flex gap-2.5 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm ${
                                                message.role === 'user' ? 'bg-primary text-white' : 'bg-white text-primary'
                                            }`}>
                                                {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                            </div>
                                            <div className="max-w-[86%] md:max-w-[76%]">
                                                <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed text-[#111B21] shadow-sm ${
                                                    message.role === 'user'
                                                        ? 'rounded-tr-md bg-[#D9FDD3]'
                                                        : 'rounded-tl-md bg-white'
                                                }`}>
                                                    {message.imageUrl && (
                                                        <NextImage
                                                            src={message.imageUrl}
                                                            alt="Hochgeladener Fahrzeugschein"
                                                            width={640}
                                                            height={420}
                                                            unoptimized
                                                            className="mb-2 max-h-48 w-full rounded-xl object-cover"
                                                        />
                                                    )}
                                                    <SafeMarkdown text={message.text} />
                                                </div>
                                                {message.offer && (
                                                    <OfferCard
                                                        offer={message.offer}
                                                        paid={Boolean(demoPayments[message.offer.orderId])}
                                                        onPay={() => {
                                                            setPaymentError('');
                                                            setCheckoutOffer(message.offer!);
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {loading && (
                                        <div className="flex gap-2.5">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                                                <Bot className="h-4 w-4" />
                                            </div>
                                            <div className="flex items-center gap-2 rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                                Fahrzeug, Teil und OE werden geprüft…
                                            </div>
                                        </div>
                                    )}

                                    {buttons.length > 0 && !loading && stage === 'chat' && (
                                        <div className="flex flex-wrap gap-2 pl-10">
                                            {buttons.map((button) => (
                                                <button
                                                    key={button.id}
                                                    type="button"
                                                    onClick={() => void send(button.title)}
                                                    className="rounded-full border border-primary/20 bg-white px-3.5 py-2 text-xs font-medium text-primary shadow-sm transition-colors hover:bg-blue-50"
                                                >
                                                    {button.title}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {messages.length === 1 && !loading && stage === 'chat' && (
                                        <div className="flex flex-wrap gap-2 pl-10">
                                            {SUGGESTIONS.map((suggestion) => (
                                                <button
                                                    key={suggestion}
                                                    type="button"
                                                    onClick={() => void send(suggestion)}
                                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs text-slate-600 shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {stage === 'complete' ? (
                                    <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border bg-card px-4 py-3">
                                        <div className="flex items-center gap-2 text-xs text-emerald-700">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Vorgang vollständig im Demo-Dashboard gespeichert
                                        </div>
                                        <a
                                            href="https://app.partsunion.de"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hidden items-center gap-1.5 text-xs font-semibold text-primary hover:underline sm:flex"
                                        >
                                            Dashboard öffnen <ArrowRight className="h-3.5 w-3.5" />
                                        </a>
                                    </div>
                                ) : (
                                    <form onSubmit={submitMessage} className="shrink-0 border-t border-border bg-muted p-3">
                                        {pendingImage && (
                                            <div className="mb-2 flex items-center gap-3 rounded-xl border border-primary/20 bg-card p-2">
                                                <NextImage
                                                    src={pendingImage.dataUrl}
                                                    alt="Fahrzeugschein-Vorschau"
                                                    width={64}
                                                    height={48}
                                                    unoptimized
                                                    className="h-12 w-16 rounded-lg object-cover"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <div className="truncate text-xs font-semibold text-[var(--foreground)]">{pendingImage.name}</div>
                                                    <div className="mt-0.5 text-[10px] text-[var(--muted-foreground)]">Bereit für die Fahrzeugdatenerkennung</div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPendingImage(null);
                                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                                    }}
                                                    aria-label="Fahrzeugschein entfernen"
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted-foreground)] hover:bg-muted hover:text-[var(--foreground)]"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                className="hidden"
                                                onChange={(event) => void selectVehicleDocument(event.target.files?.[0])}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={loading || imagePreparing}
                                                aria-label="Fahrzeugschein hochladen"
                                                title="Fahrzeugschein hochladen"
                                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary transition-colors hover:border-primary/40 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                {imagePreparing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
                                            </button>
                                            <input
                                                ref={inputRef}
                                                value={input}
                                                onChange={(event) => setInput(event.target.value)}
                                                disabled={loading}
                                                placeholder={pendingImage ? 'Optional: gesuchtes Teil ergänzen…' : 'Fahrzeug, Teil oder Fahrzeugschein…'}
                                                className="min-w-0 flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--muted-foreground)]/55 focus:border-primary disabled:opacity-60"
                                            />
                                            <button
                                                type="submit"
                                                disabled={(!input.trim() && !pendingImage) || loading || imagePreparing}
                                                aria-label="Nachricht senden"
                                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-primary text-white shadow-[0_8px_20px_-7px_rgba(29,111,232,.55)] transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-35"
                                            >
                                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </div>
            {checkoutOffer && (
                <DemoCheckout
                    offer={checkoutOffer}
                    payment={demoPayments[checkoutOffer.orderId]}
                    loading={paymentLoading}
                    error={paymentError}
                    onClose={() => {
                        if (!paymentLoading) {
                            setCheckoutOffer(null);
                            setPaymentError('');
                        }
                    }}
                    onConfirm={() => void completeDemoPayment()}
                />
            )}
        </div>
    );
}
