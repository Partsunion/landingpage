'use client';

/* eslint-disable @next/next/no-img-element -- local previews are ephemeral data URLs and cannot be optimized by next/image. */

import { useState, useRef, useEffect, useCallback, type FormEvent, type ChangeEvent } from 'react';
import {
    Send, Upload, X, Bot, User, Sparkles, Loader2, ArrowRight,
    CheckCircle2, Zap, ChevronDown, Car, MessageSquare, ListFilter
} from 'lucide-react';
import { SafeMarkdown } from '@/components/ui/SafeMarkdown';

// ─── Config ─────────────────────────────────────────────────────────
// Same backend the Admin Dashboard (admin.partsunion.de) queries — the
// WhatsApp-Bot service on Railway hosts the shared production database
// plus the Hydra v2 OEM engine. Override via NEXT_PUBLIC_API_URL at build time.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.partsunion.de';

// localStorage key: landing-page demo is limited to ONE successful query per device (not per session).
// If this key is present (any value), the demo is permanently locked on this device.
const DEMO_LOCK_KEY = 'partsunion_demo_used_v1';


// ─── Vehicle Database (Demo) ────────────────────────────────────────
const VEHICLE_DB: Record<string, Record<string, Record<string, string[]>>> = {
    'BMW': {
        '1er (F20/F21)': { '2015': ['116d (N47, 116PS)', '118i (B38, 136PS)', '120d (N47, 190PS)'], '2016': ['116d (B37, 116PS)', '118i (B38, 136PS)', '120d (B47, 190PS)'], '2017': ['118i (B38, 136PS)', '120d (B47, 190PS)', '125d (B47, 224PS)'] },
        '3er (F30/F31)': { '2014': ['316d (N47, 116PS)', '318d (N47, 143PS)', '320d (N47, 184PS)', '330d (N57, 258PS)'], '2015': ['318d (N47, 150PS)', '320d (N47, 190PS)', '330d (N57, 258PS)', '335d (N57, 313PS)'], '2016': ['318d (B47, 150PS)', '320d (B47, 190PS)', '330d (B57, 265PS)'], '2017': ['320d (B47, 190PS)', '330d (B57, 265PS)', '340i (B58, 326PS)'], '2018': ['318d (B47, 150PS)', '320d (B47, 190PS)', '330i (B48, 252PS)'] },
        '5er (G30/G31)': { '2017': ['520d (B47, 190PS)', '530d (B57, 265PS)', '530i (B48, 252PS)', '540i (B58, 340PS)'], '2018': ['520d (B47, 190PS)', '530d (B57, 265PS)', '540i (B58, 340PS)', 'M550d (B57, 400PS)'], '2019': ['520d (B47, 190PS)', '530e (B48, 292PS)', '540i (B58, 340PS)'] },
        'X1 (F48)': { '2016': ['sDrive18d (B47, 150PS)', 'xDrive20d (B47, 190PS)', 'xDrive25d (B47, 231PS)'], '2017': ['sDrive18d (B47, 150PS)', 'xDrive20d (B47, 190PS)'], '2018': ['sDrive18d (B47, 150PS)', 'xDrive20d (B47, 190PS)', 'xDrive25e (B38, 220PS)'] },
        'X3 (G01)': { '2017': ['xDrive20d (B47, 190PS)', 'xDrive30d (B57, 265PS)', 'M40i (B58, 360PS)'], '2018': ['xDrive20d (B47, 190PS)', 'xDrive30d (B57, 265PS)'], '2019': ['xDrive20d (B47, 190PS)', 'xDrive30e (B48, 292PS)'] },
    },
    'Volkswagen': {
        'Golf VII': { '2014': ['1.2 TSI (CJZA, 86PS)', '1.4 TSI (CZCA, 125PS)', '1.6 TDI (CLHB, 90PS)', '2.0 TDI (CRLB, 150PS)', 'GTI 2.0 TSI (CHHB, 230PS)'], '2015': ['1.4 TSI (CZCA, 125PS)', '1.6 TDI (DGTE, 115PS)', '2.0 TDI (CRLB, 150PS)', 'GTI 2.0 TSI (CHHB, 230PS)'], '2016': ['1.0 TSI (CHZD, 110PS)', '1.4 TSI (CZCA, 125PS)', '2.0 TDI (DFGA, 150PS)', 'GTD 2.0 TDI (DGCA, 184PS)'], '2017': ['1.0 TSI (CHZJ, 115PS)', '1.5 TSI (DADA, 130PS)', '2.0 TDI (DFGA, 150PS)'] },
        'Passat B8': { '2015': ['1.4 TSI (CZEA, 150PS)', '1.6 TDI (DCXA, 120PS)', '2.0 TDI (CRLB, 150PS)', '2.0 TDI (CUAA, 190PS)'], '2016': ['1.4 TSI (CZEA, 150PS)', '2.0 TDI (DFGA, 150PS)', '2.0 TDI (DFHA, 190PS)'], '2017': ['1.4 TSI (CZEA, 150PS)', '2.0 TDI (DFGA, 150PS)'], '2018': ['1.5 TSI (DACA, 150PS)', '2.0 TDI (DFGA, 150PS)'] },
        'Tiguan II': { '2016': ['1.4 TSI (CZEA, 150PS)', '2.0 TDI (DFGA, 150PS)', '2.0 TDI (DFHA, 190PS)'], '2017': ['1.4 TSI (CZEA, 150PS)', '2.0 TDI (DFGA, 150PS)'], '2018': ['1.5 TSI (DACA, 150PS)', '2.0 TDI (DFGA, 150PS)', '2.0 TSI (DNFA, 220PS)'] },
        'T-Roc': { '2018': ['1.0 TSI (CHZJ, 115PS)', '1.5 TSI (DADA, 150PS)', '2.0 TDI (DFGA, 150PS)'], '2019': ['1.0 TSI (CHZJ, 115PS)', '1.5 TSI (DADA, 150PS)', '2.0 TSI (DNFA, 190PS)'] },
    },
    'Mercedes-Benz': {
        'A-Klasse (W176)': { '2015': ['A 160 (M270, 102PS)', 'A 180 (M270, 122PS)', 'A 200 (M270, 156PS)', 'A 220d (OM651, 177PS)'], '2016': ['A 180 (M270, 122PS)', 'A 200 (M270, 156PS)', 'A 220d (OM651, 177PS)'], '2017': ['A 180 (M270, 122PS)', 'A 200 (M270, 156PS)', 'A 250 (M270, 211PS)'] },
        'C-Klasse (W205)': { '2014': ['C 180 (M274, 156PS)', 'C 200 (M274, 184PS)', 'C 220d (OM651, 170PS)', 'C 250d (OM651, 204PS)'], '2015': ['C 180 (M274, 156PS)', 'C 200 (M274, 184PS)', 'C 220d (OM651, 170PS)', 'C 300 (M274, 245PS)'], '2016': ['C 200 (M274, 184PS)', 'C 220d (OM654, 194PS)', 'C 300 (M274, 245PS)'], '2017': ['C 200 (M264, 184PS)', 'C 220d (OM654, 194PS)', 'C 43 AMG (M276, 390PS)'], '2018': ['C 200 (M264, 184PS)', 'C 220d (OM654, 194PS)', 'C 300 (M264, 258PS)'] },
        'E-Klasse (W213)': { '2016': ['E 200 (M274, 184PS)', 'E 220d (OM654, 194PS)', 'E 350d (OM642, 258PS)'], '2017': ['E 200 (M274, 184PS)', 'E 220d (OM654, 194PS)', 'E 300 (M274, 245PS)', 'E 400 (M276, 333PS)'], '2018': ['E 200 (M264, 184PS)', 'E 220d (OM654, 194PS)', 'E 300 (M264, 258PS)'] },
        'GLC (X253)': { '2016': ['GLC 200 (M274, 184PS)', 'GLC 220d (OM651, 170PS)', 'GLC 250d (OM651, 204PS)'], '2017': ['GLC 220d (OM654, 194PS)', 'GLC 300 (M274, 245PS)'], '2018': ['GLC 200 (M264, 184PS)', 'GLC 220d (OM654, 194PS)', 'GLC 300 (M264, 258PS)'] },
    },
    'Audi': {
        'A3 (8V)': { '2015': ['1.4 TFSI (CZEA, 150PS)', '1.6 TDI (CLHB, 110PS)', '2.0 TDI (CRLB, 150PS)', 'S3 2.0 TFSI (CJXC, 300PS)'], '2016': ['1.4 TFSI (CZEA, 150PS)', '2.0 TDI (DFGA, 150PS)'], '2017': ['1.0 TFSI (CHZD, 115PS)', '1.5 TFSI (DADA, 150PS)', '2.0 TDI (DFGA, 150PS)'], '2018': ['1.5 TFSI (DADA, 150PS)', '2.0 TDI (DFGA, 150PS)'] },
        'A4 (B9)': { '2016': ['2.0 TFSI (CVKB, 190PS)', '2.0 TDI (DETA, 150PS)', '2.0 TDI (DEUA, 190PS)', '3.0 TDI (CRTC, 218PS)'], '2017': ['2.0 TFSI (CVKB, 190PS)', '2.0 TDI (DETA, 150PS)'], '2018': ['2.0 TFSI (CVKB, 190PS)', '2.0 TDI (DTUA, 190PS)', '3.0 TDI (CREC, 218PS)'] },
        'A6 (C7)': { '2015': ['2.0 TDI (CNHA, 190PS)', '3.0 TDI (CRTC, 218PS)', '3.0 TDI (CVUA, 272PS)'], '2016': ['2.0 TDI (CNHA, 190PS)', '3.0 TDI (CVUA, 272PS)'], '2017': ['2.0 TDI (CNHA, 190PS)', '3.0 TDI (CVUA, 272PS)'] },
        'Q5 (FY)': { '2017': ['2.0 TFSI (DAXB, 252PS)', '2.0 TDI (DETA, 163PS)', '3.0 TDI (CVMD, 286PS)'], '2018': ['2.0 TFSI (DAXB, 252PS)', '2.0 TDI (DTUA, 190PS)'] },
    },
    'Opel': {
        'Astra K': { '2016': ['1.0 Turbo (B10XFT, 105PS)', '1.4 Turbo (B14XFT, 150PS)', '1.6 CDTi (B16DTH, 136PS)'], '2017': ['1.0 Turbo (B10XFT, 105PS)', '1.4 Turbo (B14XFT, 150PS)', '1.6 CDTi (B16DTH, 136PS)'], '2018': ['1.2 Turbo (F12XHT, 130PS)', '1.4 Turbo (B14XFT, 150PS)', '1.6 CDTi (B16DTE, 110PS)'] },
        'Corsa E': { '2015': ['1.0 Turbo (B10XFT, 90PS)', '1.2 (B12XER, 70PS)', '1.4 (A14XER, 90PS)', '1.3 CDTi (A13DTE, 95PS)'], '2016': ['1.0 Turbo (B10XFT, 115PS)', '1.4 (A14XER, 90PS)'], '2017': ['1.0 Turbo (B10XFT, 115PS)', '1.4 Turbo (A14NET, 150PS)'] },
        'Insignia B': { '2017': ['1.5 Turbo (B15XFT, 140PS)', '1.5 Turbo (B15XFT, 165PS)', '2.0 CDTi (B20DTH, 170PS)'], '2018': ['1.5 Turbo (B15XFT, 165PS)', '2.0 CDTi (B20DTH, 170PS)', '2.0 Turbo (A20NFT, 260PS)'] },
    },
    'Ford': {
        'Focus IV': { '2018': ['1.0 EcoBoost (M1DA, 85PS)', '1.0 EcoBoost (M1DA, 125PS)', '1.5 EcoBlue (XWDB, 95PS)', '1.5 EcoBlue (XWDD, 120PS)'], '2019': ['1.0 EcoBoost (M1DA, 125PS)', '1.5 EcoBoost (M1PT, 150PS)', '1.5 EcoBlue (XWDD, 120PS)', '2.0 EcoBlue (UFDB, 150PS)'] },
        'Fiesta VII': { '2017': ['1.0 EcoBoost (M1JE, 100PS)', '1.0 EcoBoost (M1JE, 125PS)', '1.1 Ti-VCT (XEJD, 85PS)', '1.5 TDCi (XVJB, 85PS)'], '2018': ['1.0 EcoBoost (M1JE, 125PS)', '1.5 EcoBoost (M1PT, 200PS ST)'] },
        'Kuga II': { '2016': ['1.5 EcoBoost (M8DA, 120PS)', '1.5 EcoBoost (M8DA, 150PS)', '2.0 TDCi (T7CL, 150PS)'], '2017': ['1.5 EcoBoost (M8DA, 150PS)', '2.0 TDCi (T7CL, 150PS)'], '2018': ['1.5 EcoBoost (M8DA, 150PS)', '1.5 TDCi (XWMC, 120PS)'] },
    },
};

const MAKES = Object.keys(VEHICLE_DB).sort();

// ─── Types ──────────────────────────────────────────────────────────
interface ChatMessage {
    id: string;
    role: 'user' | 'bot';
    text: string;
    image?: string;
    timestamp: Date;
    isTyping?: boolean;
    results?: OEMResult[];
}

interface OEMResult {
    oem: string;
    brand?: string;
    confidence?: number;
    note?: string;
}

interface APICandidate {
    oemNumber?: string;
    oem?: string;
    number?: string;
    brand?: string;
    confidence?: number;
    note?: string;
}

interface OEMAPIResponse {
    success: boolean;
    oem?: string | null;
    candidates?: APICandidate[];
    notes?: string | null;
    confidence?: number;
    error?: string;
}

type Phase = 'part_input' | 'vehicle_method' | 'vin_input' | 'hsn_input' | 'dropdown_select' | 'processing' | 'results' | 'locked';
type TabMode = 'chat' | 'dropdown';

// ─── Particles ──────────────────────────────────────────────────────
interface Particle {
    id: number; x: number; y: number; targetX: number; targetY: number;
    size: number; color: string; delay: number; duration: number; char: string;
}

const OEM_CHARS = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ';
// Ruhige Blau-/Ink-Töne auf hellem Grund — kein Neon.
const P_COLORS = ['rgba(29,111,232,.85)', 'rgba(22,89,194,.75)', 'rgba(79,147,255,.7)', 'rgba(91,107,129,.55)', 'rgba(16,24,40,.4)'];

function makeParticles(n: number): Particle[] {
    return Array.from({ length: n }, (_, i) => ({
        id: i,
        x: Math.random() * 100, y: Math.random() * 100,
        targetX: 50 + (Math.random() - .5) * 6, targetY: 50 + (Math.random() - .5) * 6,
        size: 10 + Math.random() * 16,
        color: P_COLORS[i % P_COLORS.length],
        delay: Math.random() * 2, duration: 2 + Math.random() * 3,
        char: OEM_CHARS[Math.floor(Math.random() * OEM_CHARS.length)],
    }));
}

// ─── Helpers ────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

// ═══════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════
export function LiveDemoChat() {
    // Chat state
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [phase, setPhase] = useState<Phase>('part_input');
    const [partQuery, setPartQuery] = useState('');

    // Dropdown state
    const [tabMode, setTabMode] = useState<TabMode>('dropdown');
    const [ddMake, setDdMake] = useState('');
    const [ddModel, setDdModel] = useState('');
    const [ddYear, setDdYear] = useState('');
    const [ddEngine, setDdEngine] = useState('');
    const [ddPart, setDdPart] = useState('');

    // Shared
    const [showCTA, setShowCTA] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [showParticles, setShowParticles] = useState(false);
    const [demoUsed, setDemoUsed] = useState(false);
    const [oemResults, setOemResults] = useState<OEMResult[]>([]);
    const [apiError, setApiError] = useState<string | null>(null);

    const chatEnd = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    // Greeting
    useEffect(() => {
        // Check per-device lock: ONE successful OEM query per device.
        // If already used previously, load the stored result and go straight to locked state.
        let previouslyLocked = false;
        let storedResults: OEMResult[] = [];
        let storedPart = '';
        try {
            const stored = localStorage.getItem(DEMO_LOCK_KEY);
            if (stored) {
                previouslyLocked = true;
                try {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed.results)) storedResults = parsed.results;
                    if (typeof parsed.part === 'string') storedPart = parsed.part;
                } catch { /* legacy string value → just lock, no results to show */ }
            }
        } catch { /* localStorage not available (SSR / private mode) → no-op */ }

        if (previouslyLocked) {
            setDemoUsed(true);
            setPhase('locked');
            setOemResults(storedResults);
            if (storedPart) setPartQuery(storedPart);
            setMessages([{
                id: uid(), role: 'bot', timestamp: new Date(),
                text: '🔒 **Demo bereits abgeschlossen**\n\nSie haben die kostenlose Demo auf diesem Gerät bereits genutzt.\n\nFür unbegrenzte OEM-Ermittlung vereinbaren Sie bitte ein Beratungsgespräch.',
            }]);
            // Show the CTA again so the user gets the next-step prompt.
            setTimeout(() => setShowCTA(true), 800);
            return;
        }

        setMessages([{
            id: uid(), role: 'bot', timestamp: new Date(),
            text: '👋 **Willkommen zur Partsunion KI-Demo!**\n\nIch finde das richtige Ersatzteil für Ihr Fahrzeug.\n\n_Hinweis: Sie haben eine kostenlose Abfrage pro Gerät._\n\n**Welches Teil suchen Sie?**',
        }]);
    }, []);

    // Derived dropdown data
    const models = ddMake ? Object.keys(VEHICLE_DB[ddMake] || {}).sort() : [];
    const years = (ddMake && ddModel) ? Object.keys(VEHICLE_DB[ddMake]?.[ddModel] || {}).sort().reverse() : [];
    const engines = (ddMake && ddModel && ddYear) ? (VEHICLE_DB[ddMake]?.[ddModel]?.[ddYear] || []) : [];

    const addBot = useCallback((text: string, extras?: Partial<ChatMessage>) => {
        return new Promise<void>(res => {
            const tid = uid();
            setMessages(p => [...p, { id: tid, role: 'bot', text: '', timestamp: new Date(), isTyping: true }]);
            setTimeout(() => {
                setMessages(p => p.map(m => m.id === tid ? { ...m, text, isTyping: false, ...extras } : m));
                res();
            }, 500 + Math.random() * 700);
        });
    }, []);

    // ─── Real API ───────────────────────────────────────────────────
    // Calls `/api/demo/oem-resolve` on the shared Autoteile-bot-service backend.
    // This is the exact same endpoint the Admin Dashboard calls from
    // `Admin-Dashboard/src/api/wws.ts#resolveOemForward`, so the landing-page live
    // demo hits the identical production database and Hydra v2 pipeline
    // (DB → CrossRef → AI search → validation → self-learning).
    // No fabricated fallback results — on API failure we surface the real error.
    const callOEM = useCallback(async (part: string, vehicle: Record<string, string>): Promise<OEMAPIResponse> => {
        try {
            const r = await fetch(`${API_BASE}/api/demo/oem-resolve`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ part, vehicle }),
            });
            if (!r.ok) {
                const body = await r.json().catch(() => ({})) as { error?: string };
                return { success: false, notes: body?.error || `API-Fehler (${r.status})` };
            }
            return await r.json() as OEMAPIResponse;
        } catch {
            return { success: false, notes: 'Verbindung zur OEM-Datenbank fehlgeschlagen.' };
        }
    }, []);

    // ─── Processing (shared by both modes) ──────────────────────────
    const runProcessing = useCallback(async (part: string, vehicle: Record<string, string>) => {
        // Hard gate: once the per-device lock is set, refuse to process anything.
        if (demoUsed) return;

        setPhase('processing');
        setIsLoading(true);
        setApiError(null);

        setParticles(makeParticles(45));
        setShowParticles(true);

        if (tabMode === 'chat') {
            await addBot('🔍 **KI-Analyse gestartet...**\n\nUnser System durchsucht die Partsunion OEM-Datenbank...');
        }

        // Query the real production database via Hydra v2 pipeline.
        const result = await callOEM(part, vehicle);
        await new Promise(r => setTimeout(r, 2800));
        setShowParticles(false);

        const results: OEMResult[] = [];

        if (result.success && result.oem) {
            results.push({ oem: result.oem, brand: 'OE/Original', confidence: result.confidence || 100 });
            (result.candidates || []).slice(0, 4).forEach((c) => {
                const o = c.oemNumber || c.oem || c.number;
                if (o && o !== result.oem) {
                    results.push({
                        oem: o,
                        brand: c.brand || 'Aftermarket',
                        confidence: c.confidence || 90,
                        note: c.note,
                    });
                }
            });
        }

        setOemResults(results);

        // ONLY lock the demo on a successful lookup. A failed API call should
        // let the user retry instead of burning their one free query.
        if (results.length > 0) {
            setDemoUsed(true);
            try {
                localStorage.setItem(DEMO_LOCK_KEY, JSON.stringify({
                    part,
                    results,
                    lockedAt: new Date().toISOString(),
                }));
            } catch { /* localStorage unavailable → degrade to session lock */ }

            if (tabMode === 'chat') {
                await addBot(
                    `✅ **Teileermittlung abgeschlossen!**\n\nGesuchtes Teil: **${part}**` +
                    (vehicle.vin ? `\nVIN: \`${vehicle.vin}\`` : '') +
                    (vehicle.make ? `\nFahrzeug: **${vehicle.make} ${vehicle.model || ''} ${vehicle.year ? `(${vehicle.year})` : ''}**` : '') +
                    (vehicle.engine ? `\nMotor: **${vehicle.engine}**` : ''),
                    { results }
                );
            }

            setPhase('locked');
            setIsLoading(false);
            // Show the non-dismissible "book a consultation" overlay.
            setTimeout(() => setShowCTA(true), 1500);
        } else {
            // API failure — show an error, stay in current phase so user can retry.
            const errMsg = result.notes || 'Keine Treffer in der OEM-Datenbank.';
            setApiError(errMsg);
            if (tabMode === 'chat') {
                await addBot(
                    `⚠️ **Teileermittlung fehlgeschlagen**\n\n${errMsg}\n\nBitte prüfen Sie Ihre Eingaben und versuchen Sie es erneut.`
                );
            }
            setPhase('part_input');
            setIsLoading(false);
        }
    }, [addBot, callOEM, tabMode, demoUsed]);

    // ─── Dropdown Submit ────────────────────────────────────────────
    const handleDropdownSubmit = () => {
        if (!ddMake || !ddModel || !ddYear || !ddEngine || !ddPart.trim() || demoUsed) return;
        const engineCode = ddEngine.match(/\(([^,]+)/)?.[1] || '';
        const vehicle = { make: ddMake, model: ddModel, year: ddYear, engine: engineCode };
        runProcessing(ddPart.trim(), vehicle);
    };

    // ─── Smart Text Parsing (NLP-lite) ────────────────────────────────
    const parseUserInput = useCallback((text: string) => {
        const result: { vin?: string; hsn?: string; tsn?: string; make?: string; model?: string; year?: string; engine?: string; part?: string } = {};

        // Extract VIN (17 alphanumeric, excluding I,O,Q)
        const vinMatch = text.match(/\b([A-HJ-NPR-Z0-9]{17})\b/i);
        if (vinMatch) result.vin = vinMatch[1].toUpperCase();

        // Extract HSN/TSN
        const hsnMatch = text.match(/(?:HSN|Herstellerschlüssel)[:\s]*(\d{4})/i);
        const tsnMatch = text.match(/(?:TSN|Typschlüssel)[:\s]*([A-Za-z0-9]{3})/i);
        if (hsnMatch) result.hsn = hsnMatch[1];
        if (tsnMatch) result.tsn = tsnMatch[1].toUpperCase();

        // Extract year (4 digits between 2000-2030)
        const yearMatch = text.match(/(?:Baujahr|BJ|EZ|Erstzulassung|Jahr)[:\s]*(\d{4})/i) || text.match(/\b(20[0-2]\d)\b/);
        if (yearMatch) result.year = yearMatch[1];

        // Extract make/brand
        const makePatterns: Record<string, RegExp> = {
            'BMW': /\bBMW\b/i,
            'Volkswagen': /\b(?:VW|Volkswagen)\b/i,
            'Mercedes-Benz': /\b(?:Mercedes|Benz|MB)\b/i,
            'Audi': /\bAudi\b/i,
            'Opel': /\bOpel\b/i,
            'Ford': /\bFord\b/i,
            'Porsche': /\bPorsche\b/i,
            'Skoda': /\bSkoda\b/i,
            'Seat': /\bSeat\b/i,
            'Toyota': /\bToyota\b/i,
            'Hyundai': /\bHyundai\b/i,
            'Kia': /\bKia\b/i,
            'Renault': /\bRenault\b/i,
            'Peugeot': /\bPeugeot\b/i,
            'Fiat': /\bFiat\b/i,
            'Volvo': /\bVolvo\b/i,
        };
        for (const [make, rx] of Object.entries(makePatterns)) {
            if (rx.test(text)) { result.make = make; break; }
        }

        // Extract model
        const modelPatterns = [
            /(?:Golf|Passat|Tiguan|Polo|T-Roc|Touran|Caddy|Arteon|ID\.\d)\s*(?:[IVX]+|[A-Z0-9]*)/i,
            /(?:3er|5er|1er|7er|X[1-7]|Z[1-4])\s*\([A-Z]\d+(?:\/[A-Z]\d+)*\)/i,
            /[A-E]-Klasse\s*\([WCV]\d+\)/i, /(?:GLC|GLE|GLA|CLA|CLS|GLS|SL|AMG GT)\s*\([A-Z]\d+\)/i,
            /A[1-8]\s*\([A-Z0-9]+\)/i, /Q[2-8]\s*\([A-Z0-9]+\)/i,
            /(?:Astra|Corsa|Insignia|Mokka|Crossland|Grandland)\s*[A-Z]?/i,
            /(?:Focus|Fiesta|Kuga|Mondeo|Puma|EcoSport)\s*(?:[IVX]+)?/i,
        ];
        for (const rx of modelPatterns) {
            const m = text.match(rx);
            if (m) { result.model = m[0].trim(); break; }
        }

        // Extract engine code (3-5 uppercase/digit chars in parentheses)
        const engineMatch = text.match(/(?:Motorcode|Motor(?:kennbuchstabe)?)[:\s]*([A-Z0-9]{3,5})/i)
            || text.match(/\(([A-Z]{2,4}\d?[A-Z]?),?\s*\d+\s*(?:PS|kW)/i);
        if (engineMatch) result.engine = engineMatch[1].toUpperCase();

        // Extract part name — look for known part keywords or "Gesuchtes Teil" pattern
        const partPatterns = [
            /(?:Gesuchtes?\s+Teil|Ersatzteil|Teil)[:\s]+(.+?)(?:\n|$|VIN|Motorcode|Fahrzeug|Baujahr)/i,
            /(?:suche|brauche|benötige)\s+(?:ein(?:e|en)?\s+)?(.+?)(?:\s+für|\s+vom|\s+am|\n|$)/i,
        ];
        for (const rx of partPatterns) {
            const m = text.match(rx);
            if (m) { result.part = m[1].trim().replace(/\s*\(.*?\)\s*$/, '').trim(); break; }
        }

        // Fallback: look for common part names in the text
        // IMPORTANT: compound parts MUST come before their substrings
        // e.g. "Lüfterkupplung" before "Kupplung", "Kraftstoffpumpe" before "Pumpe"
        if (!result.part) {
            const knownParts = [
                // Compound parts first (longest match wins)
                'Hochdruckpumpe', 'Kraftstoffpumpe', 'Benzinpumpe', 'Dieselpumpe', 'Wasserpumpe',
                'Lüfterkupplung', 'Klimakompressor', 'Kraftstofffilter',
                'Bremsscheibe', 'Bremsscheiben', 'Bremsbelag', 'Bremssattel',
                'Lambdasonde', 'Lichtmaschine', 'Antriebswelle',
                'Drosselklappe', 'Einspritzdüse', 'AGR-Ventil',
                // Then simple parts
                'Ölfilter', 'Luftfilter', 'Stoßdämpfer', 'Kupplung', 'Turbolader',
                'Anlasser', 'Zahnriemen', 'Keilriemen', 'Zündkerze',
                'Glühkerze', 'Katalysator', 'Auspuff',
                'Thermostat', 'Kühler', 'Kompressor', 'Getriebe',
                'Radlager', 'Querlenker', 'Spurstange', 'Achsschenkel',
                'Injektoren', 'Injektor', 'Federbein', 'Domlager',
            ];
            for (const p of knownParts) {
                if (text.toLowerCase().includes(p.toLowerCase())) { result.part = p; break; }
            }
        }

        return result;
    }, []);

    // ─── Chat Logic ─────────────────────────────────────────────────
    const processMsg = useCallback(async (text: string, image?: string) => {
        setIsLoading(true);
        try {
            // ── Always try smart parsing first (regardless of phase) ──
            const parsed = parseUserInput(text);
            const hasVehicleId = !!(parsed.vin || (parsed.hsn && parsed.tsn));
            const hasVehicleInfo = !!(parsed.make && parsed.model);
            const hasPart = !!parsed.part;

            // If user provides enough info, skip the wizard entirely
            if (phase === 'part_input' && hasPart && (hasVehicleId || hasVehicleInfo)) {
                const vehicle: Record<string, string> = {};
                if (parsed.vin) vehicle.vin = parsed.vin;
                if (parsed.hsn) vehicle.hsn = parsed.hsn;
                if (parsed.tsn) vehicle.tsn = parsed.tsn!;
                if (parsed.make) vehicle.make = parsed.make;
                if (parsed.model) vehicle.model = parsed.model;
                if (parsed.year) vehicle.year = parsed.year;
                if (parsed.engine) vehicle.engine = parsed.engine;

                setPartQuery(parsed.part!);

                // Show parsed summary
                let summary = `🔍 **Erkannt:**\n`;
                if (parsed.part) summary += `\n🔧 Teil: **${parsed.part}**`;
                if (parsed.make) summary += `\n🚗 Marke: **${parsed.make}**`;
                if (parsed.model) summary += `\n📋 Modell: **${parsed.model}**`;
                if (parsed.year) summary += `\n📅 Baujahr: **${parsed.year}**`;
                if (parsed.engine) summary += `\n⚙️ Motor: **${parsed.engine}**`;
                if (parsed.vin) summary += `\n🔢 VIN: \`${parsed.vin}\``;
                if (parsed.hsn) summary += `\n📝 HSN: \`${parsed.hsn}\``;
                if (parsed.tsn) summary += `\n📝 TSN: \`${parsed.tsn}\``;
                summary += `\n\n_Starte OEM-Ermittlung..._`;
                await addBot(summary);

                await runProcessing(parsed.part!, vehicle);
                return;
            }

            // If user provides part + partial info, save part and ask for VIN
            if (phase === 'part_input' && hasPart && !hasVehicleId && !hasVehicleInfo) {
                setPartQuery(parsed.part!);
                setPhase('vehicle_method');
                await addBot(`🔧 Teil: **${parsed.part!}**\n\n> ⚠️ Gleiches Teil, verschiedene OEMs je Fahrzeug — **VIN ist entscheidend!**\n\nWie möchten Sie Ihr Fahrzeug identifizieren?\n\n**1️⃣** Fahrzeugbrief-Foto hochladen\n**2️⃣** VIN/FIN eingeben (17-stellig)\n**3️⃣** HSN/TSN manuell eingeben`);
                return;
            }

            switch (phase) {
                case 'part_input': {
                    // Check if it's just a VIN without a part
                    if (parsed.vin && !hasPart) {
                        await addBot(`✅ VIN erkannt: \`${parsed.vin}\`\n\nAber **welches Ersatzteil** suchen Sie?\nz.B. Bremsscheibe, Ölfilter, Hochdruckpumpe...`);
                        break;
                    }
                    if (text.length < 2) { await addBot('Bitte geben Sie den Teilenamen ein, z.B. **Bremsscheibe**, **Ölfilter** oder **Hochdruckpumpe**.'); break; }
                    setPartQuery(text.trim());
                    setPhase('vehicle_method');
                    await addBot(`🔧 Teil: **${text.trim()}**\n\n> ⚠️ Gleiches Teil, verschiedene OEMs je Fahrzeug — **VIN ist entscheidend!**\n\nWie möchten Sie Ihr Fahrzeug identifizieren?\n\n**1️⃣** Fahrzeugbrief-Foto hochladen\n**2️⃣** VIN/FIN eingeben (17-stellig)\n**3️⃣** HSN/TSN manuell eingeben`);
                    break;
                }
                case 'vehicle_method': {
                    if (image) {
                        const vin = 'WBAPH5C55BA' + Math.floor(100000 + Math.random() * 900000);
                        await addBot(`🧪 **Simulierter Beispielablauf**\nDas hochgeladene Foto wird in dieser Vorschau nicht ausgelesen. Für den beispielhaften Ablauf verwenden wir ein BMW-320d-Testprofil mit Demo-VIN: \`${vin}\``);
                        await runProcessing(partQuery, { vin, make: 'BMW', model: '320d' });
                        return;
                    }
                    // Check for VIN in response
                    if (parsed.vin) {
                        await addBot(`✅ VIN: \`${parsed.vin}\``);
                        const vehicle: Record<string, string> = { vin: parsed.vin };
                        if (parsed.make) vehicle.make = parsed.make;
                        if (parsed.model) vehicle.model = parsed.model;
                        if (parsed.year) vehicle.year = parsed.year;
                        if (parsed.engine) vehicle.engine = parsed.engine;
                        await runProcessing(partQuery, vehicle);
                        return;
                    }
                    // Check for HSN/TSN
                    if (parsed.hsn && parsed.tsn) {
                        await addBot(`✅ HSN/TSN: \`${parsed.hsn}/${parsed.tsn}\``);
                        await runProcessing(partQuery, { hsn: parsed.hsn, tsn: parsed.tsn });
                        return;
                    }
                    if (text === '1' || /foto|bild|upload/i.test(text)) { await addBot('📷 Klicken Sie unten links auf 📎 um ein Foto hochzuladen.'); break; }
                    if (text === '2' || /vin|fin|fahr/i.test(text)) { setPhase('vin_input'); await addBot('🔢 Bitte die **17-stellige VIN/FIN** eingeben.\n\n_Sie finden diese im Fahrzeugbrief (Feld E) oder auf der Fahrertür._'); break; }
                    if (text === '3' || /hsn|tsn/i.test(text)) { setPhase('hsn_input'); await addBot('📝 Bitte **HSN und TSN** eingeben.\n\nFormat: `0005 CJ2`\n\n_HSN = 4 Ziffern, TSN = 3 Zeichen. Finden Sie im Fahrzeugschein Feld 2.1 und 2.2._'); break; }
                    await addBot('Bitte wählen Sie eine Option:\n\n**1** = Fahrzeugbrief-Foto\n**2** = VIN/FIN eingeben\n**3** = HSN/TSN manuell');
                    break;
                }
                case 'vin_input': {
                    if (parsed.vin) {
                        await addBot(`✅ VIN: \`${parsed.vin}\``);
                        await runProcessing(partQuery, { vin: parsed.vin });
                        return;
                    }
                    const raw = text.replace(/[\s-]/g, '').toUpperCase();
                    if (/^[A-HJ-NPR-Z0-9]{17}$/.test(raw)) {
                        await addBot(`✅ VIN: \`${raw}\``);
                        await runProcessing(partQuery, { vin: raw });
                        return;
                    }
                    await addBot('❌ Ungültige VIN. Die VIN muss genau **17 Zeichen** lang sein (Buchstaben + Ziffern, ohne I, O, Q).\n\nBitte erneut versuchen.');
                    break;
                }
                case 'hsn_input': {
                    const m = text.match(/(\d{4})\s*[\/\s,.-]*\s*([A-Za-z0-9]{3})/);
                    if (!m) { await addBot('❌ Ungültiges Format.\n\nBitte so eingeben: `0005 CJ2`\n\n_HSN = 4 Ziffern, TSN = 3 Zeichen_'); break; }
                    await addBot(`✅ HSN/TSN: \`${m[1]}/${m[2].toUpperCase()}\``);
                    await runProcessing(partQuery, { hsn: m[1], tsn: m[2].toUpperCase() });
                    return;
                }
                case 'locked': { setShowCTA(true); break; }
            }
        } finally { setIsLoading(false); }
    }, [phase, partQuery, addBot, runProcessing, parseUserInput]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if ((!input.trim() && !imagePreview) || isLoading || phase === 'locked') return;
        setMessages(p => [...p, { id: uid(), role: 'user', text: input.trim(), image: imagePreview || undefined, timestamp: new Date() }]);
        const t = input, img = imagePreview;
        setInput(''); setImagePreview(null);
        if (fileRef.current) fileRef.current.value = '';
        processMsg(t, img || undefined);
    };

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f?.type.startsWith('image/')) return;
        const r = new FileReader();
        r.onloadend = () => setImagePreview(r.result as string);
        r.readAsDataURL(f);
    };

    // ─── Select component ───────────────────────────────────────────
    const Select = ({ value, onChange, options, placeholder, disabled }: {
        value: string; onChange: (v: string) => void; options: string[]; placeholder: string; disabled?: boolean;
    }) => (
        <div className="relative">
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                disabled={disabled || options.length === 0}
                className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-muted border border-border text-sm focus:border-primary focus:outline-none transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:border-border-hover"
            >
                <option value="" disabled className="bg-[var(--background)]">{placeholder}</option>
                {options.map(o => <option key={o} value={o} className="bg-[var(--background)]">{o}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none" />
        </div>
    );

    // ═════════════════════════════════════════════════════════════════
    // Render
    // ═════════════════════════════════════════════════════════════════
    return (
        <section className="h-screen pt-24 pb-4 px-4 relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-40" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] gradient-glow opacity-30 blur-3xl pointer-events-none" />

            {/* ── Particle Overlay ──────────────────────────────────── */}
            {showParticles && (
                <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full animate-pulse" style={{
                        background: 'radial-gradient(circle, rgba(29,111,232,.16) 0%, rgba(29,111,232,.06) 40%, transparent 70%)',
                    }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-primary/20" style={{ animation: 'demoSpin 4s linear infinite' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-primary/10" style={{ animation: 'demoSpin 7s linear infinite reverse' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-primary/5" style={{ animation: 'demoSpin 12s linear infinite' }} />
                    {particles.map(p => (
                        <div key={p.id} className="absolute font-mono font-bold select-none" style={{
                            left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size,
                            color: p.color,
                            animation: `particleFly ${p.duration}s ${p.delay}s ease-in-out forwards`,
                            '--tx': `${p.targetX - p.x}vw`, '--ty': `${p.targetY - p.y}vh`, opacity: 0,
                        } as React.CSSProperties}>
                            {p.char}
                        </div>
                    ))}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-28 text-center">
                        <div className="flex items-center gap-2 text-primary font-semibold animate-pulse text-sm">
                            <Zap className="h-4 w-4" /> Gemini analysiert Fahrzeugdaten...
                        </div>
                        <div className="text-[11px] text-[var(--muted-foreground)] mt-1 animate-pulse" style={{ animationDelay: '.5s' }}>
                            OEM-Datenbank wird durchsucht
                        </div>
                    </div>
                </div>
            )}

            {/* ── CTA Popup — NON-DISMISSIBLE after successful lookup ────
                 Once the demo has been used on this device, the only path forward
                 is the "Beratungstermin sichern" button. The link pre-fills the
                 consultation form so Sales sees the Demo-Lead-Context. */}
            {showCTA && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[rgba(16,24,40,0.45)] backdrop-blur-sm" />
                    <div
                        className="relative rounded-2xl border border-border bg-card p-8 max-w-md w-full text-center shadow-[var(--shadow-raised)]"
                        style={{ animation: 'popIn .4s cubic-bezier(.16,1,.3,1) forwards' }}
                    >
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent border border-primary/15 mb-5">
                            <CheckCircle2 className="h-7 w-7 text-primary" />
                        </div>
                        <h2
                            className="text-2xl md:text-3xl font-semibold mb-3"
                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
                        >
                            Demo abgeschlossen.
                        </h2>
                        <p className="text-muted-foreground text-sm mb-2 leading-relaxed">
                            Sie haben gesehen, wie unsere KI in unter 8&nbsp;Sekunden das richtige Teil findet.
                        </p>
                        <p className="text-foreground/90 text-sm mb-7 leading-relaxed font-medium">
                            Lassen Sie uns 30&nbsp;Minuten darüber sprechen, wie das in Ihrem Betrieb läuft.
                        </p>
                        <a
                            href={`/#beratung?source=demo${partQuery ? `&part=${encodeURIComponent(partQuery)}` : ''}`}
                            className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-lg gradient-primary text-primary-foreground text-base font-medium shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] hover:brightness-95 transition-all group"
                        >
                            Beratungstermin sichern
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                        <p className="mt-4 text-[11px] text-muted-foreground">
                            Eine Demo-Anfrage pro Gerät · Unverbindlich
                        </p>
                    </div>
                </div>
            )}

            {/* ── Main Content ─────────────────────────────────────── */}
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col h-[calc(100vh-120px)]">
                {/* Header */}
                <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-accent mb-3">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Live Demo</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-1">
                        KI-<span className="text-gradient">Teileermittlung</span>
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-sm">Fahrzeug auswählen → KI findet das Teil</p>
                </div>

                {/* Tab Switcher */}
                <div className="flex gap-1 mb-3 mx-auto bg-card rounded-xl p-1 border border-border shadow-[var(--shadow-card)]">
                    <button onClick={() => setTabMode('dropdown')}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${tabMode === 'dropdown' ? 'gradient-primary text-primary-foreground shadow-md' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
                        <ListFilter className="h-3.5 w-3.5" /> Fahrzeug-Auswahl
                    </button>
                    <button onClick={() => setTabMode('chat')}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${tabMode === 'chat' ? 'gradient-primary text-primary-foreground shadow-md' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
                        <MessageSquare className="h-3.5 w-3.5" /> KI-Chat
                    </button>
                </div>

                {/* ── TAB: Dropdown Selector ────────────────────────── */}
                {tabMode === 'dropdown' && (
                    <div className="flex-1 overflow-auto rounded-2xl bg-card border border-border flex flex-col shadow-[var(--shadow-card)]">
                        <div className="flex-1 p-5 md:p-6 space-y-5 overflow-auto">
                            {/* Step indicators */}
                            <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] mb-1">
                                <Car className="h-4 w-4 text-primary" />
                                <span className="font-semibold text-[var(--foreground)]">Fahrzeug identifizieren</span>
                            </div>

                            {/* Cascading Selects */}
                            <div className="grid gap-3">
                                <Select value={ddMake} onChange={v => { setDdMake(v); setDdModel(''); setDdYear(''); setDdEngine(''); }} options={MAKES} placeholder="Marke wählen..." disabled={demoUsed} />
                                <Select value={ddModel} onChange={v => { setDdModel(v); setDdYear(''); setDdEngine(''); }} options={models} placeholder="Modell wählen..." disabled={!ddMake || demoUsed} />

                                <div className="grid grid-cols-2 gap-3">
                                    <Select value={ddYear} onChange={v => { setDdYear(v); setDdEngine(''); }} options={years} placeholder="Baujahr..." disabled={!ddModel || demoUsed} />
                                    <Select value={ddEngine} onChange={setDdEngine} options={engines} placeholder="Motor..." disabled={!ddYear || demoUsed} />
                                </div>
                            </div>

                            {/* Vehicle Badge */}
                            {ddMake && ddModel && (
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border">
                                    <div className="w-8 h-8 rounded-lg bg-accent border border-primary/15 flex items-center justify-center">
                                        <Car className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">{ddMake} {ddModel}</div>
                                        <div className="text-xs text-[var(--muted-foreground)]">
                                            {ddYear && `${ddYear}`}{ddEngine && ` · ${ddEngine}`}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Divider */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 border-t border-border" />
                                <span className="text-xs text-[var(--muted-foreground)] font-semibold">TEIL ANGEBEN</span>
                                <div className="flex-1 border-t border-border" />
                            </div>

                            {/* Part Input */}
                            <input
                                type="text"
                                value={ddPart}
                                onChange={e => setDdPart(e.target.value)}
                                placeholder="z.B. Bremsscheibe, Ölfilter, Stoßdämpfer..."
                                disabled={demoUsed}
                                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm focus:border-primary focus:outline-none transition-all disabled:opacity-40 placeholder:text-[var(--muted-foreground)]/50"
                            />

                            {/* Quick Part Buttons */}
                            {!demoUsed && (
                                <div className="flex gap-1.5 flex-wrap">
                                    {['Bremsscheibe', 'Ölfilter', 'Luftfilter', 'Stoßdämpfer', 'Zündkerze', 'Keilriemen'].map(p => (
                                        <button key={p} onClick={() => setDdPart(p)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${ddPart === p
                                                ? 'bg-accent border-primary/30 text-primary'
                                                : 'bg-muted border-border text-[var(--muted-foreground)] hover:border-primary/30 hover:text-primary'
                                            }`}>
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                onClick={handleDropdownSubmit}
                                disabled={!ddMake || !ddModel || !ddYear || !ddEngine || !ddPart.trim() || isLoading || demoUsed}
                                className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                            >
                                {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> KI analysiert...</> : <><Sparkles className="h-4 w-4" /> Teil ermitteln</>}
                            </button>

                            {/* API error banner (dropdown mode) */}
                            {apiError && !isLoading && phase !== 'locked' && (
                                <div className="p-3 rounded-xl bg-[var(--error)]/10 border border-[var(--error)]/30 text-[var(--error)] text-xs">
                                    ⚠️ {apiError}
                                </div>
                            )}

                            {/* Results (dropdown mode) */}
                            {phase === 'locked' && oemResults.length > 0 && (
                                <div className="space-y-2 pt-2">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-success">
                                        <CheckCircle2 className="h-4 w-4" /> {oemResults.length} Treffer gefunden
                                    </div>
                                    {oemResults.map((r, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border hover:border-border-hover transition-all">
                                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-accent text-primary' : 'bg-card border border-border text-[var(--muted-foreground)]'}`}>
                                                #{i + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-semibold text-sm">{r.brand}</span>
                                                    <code className="text-xs bg-card border border-border px-1.5 py-0.5 rounded font-mono text-primary">{r.oem}</code>
                                                </div>
                                            </div>
                                            {r.confidence && <div className={`text-xs font-bold ${r.confidence >= 95 ? 'text-success' : 'text-[var(--muted-foreground)]'}`}>{r.confidence}%</div>}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {phase === 'locked' && oemResults.length === 0 && (
                                <div className="text-center py-4 text-[var(--muted-foreground)] text-sm">
                                    ⚠️ Kein Treffer — unsere Experten helfen weiter!
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── TAB: Chat ─────────────────────────────────────── */}
                {tabMode === 'chat' && (
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
                        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3 bg-[#EFEAE2]">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center shadow-[0_1px_1px_rgba(11,20,26,0.10)] ${msg.role === 'bot' ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                                        {msg.role === 'bot' ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                                    </div>
                                    <div className={`max-w-[85%] ${msg.role === 'user' ? 'ml-auto' : ''}`}>
                                        <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed text-[#111B21] shadow-[0_1px_1px_rgba(11,20,26,0.10)] ${msg.role === 'user' ? 'bg-[#D9FDD3] rounded-tr-md' : 'bg-white rounded-tl-md'}`}>
                                            {msg.isTyping ? (
                                                <div className="flex items-center gap-1.5 py-1">
                                                    <span className="w-1.5 h-1.5 bg-[rgba(17,27,33,0.45)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                    <span className="w-1.5 h-1.5 bg-[rgba(17,27,33,0.45)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                    <span className="w-1.5 h-1.5 bg-[rgba(17,27,33,0.45)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                </div>
                                            ) : (
                                                <>
                                                    {msg.image && <div className="mb-2 rounded-lg overflow-hidden border border-border"><img src={msg.image} alt="" className="max-h-40 w-auto" /></div>}
                                                    <SafeMarkdown text={msg.text} />
                                                    {msg.results && (
                                                        <div className="mt-3 space-y-1.5">
                                                            {msg.results.map((r, i) => (
                                                                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted border border-border">
                                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-accent text-primary' : 'bg-card border border-border text-[var(--muted-foreground)]'}`}>#{i + 1}</div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <span className="font-semibold text-xs">{r.brand}</span>{' '}
                                                                        <code className="text-[11px] bg-card border border-border px-1 py-0.5 rounded font-mono text-primary">{r.oem}</code>
                                                                    </div>
                                                                    {r.confidence && <div className={`text-xs font-bold ${r.confidence >= 95 ? 'text-success' : 'text-[var(--muted-foreground)]'}`}>{r.confidence}%</div>}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEnd} />
                        </div>
                        {imagePreview && (
                            <div className="px-4 py-2 border-t border-border bg-muted">
                                <div className="relative inline-block">
                                    <img src={imagePreview} alt="" className="h-14 rounded-lg border border-border" />
                                    <button onClick={() => { setImagePreview(null); if (fileRef.current) fileRef.current.value = ''; }} className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--error)] rounded-full flex items-center justify-center text-primary-foreground"><X className="h-2.5 w-2.5" /></button>
                                </div>
                            </div>
                        )}
                        {phase === 'part_input' && tabMode === 'chat' && (
                            <div className="px-3 py-2 border-t border-border bg-muted flex gap-1.5 flex-wrap">
                                {['Bremsscheibe', 'Ölfilter', 'Stoßdämpfer', 'Zündkerze'].map(p => (
                                    <button key={p} onClick={() => { setInput(p); inputRef.current?.focus(); }}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-card border border-border hover:border-primary/40 text-[var(--muted-foreground)] hover:text-primary transition-all">{p}</button>
                                ))}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-muted flex items-end gap-2">
                            <input type="file" ref={fileRef} onChange={handleImage} accept="image/*" className="hidden" />
                            <button type="button" onClick={() => fileRef.current?.click()} disabled={phase === 'locked' || isLoading}
                                className="flex-shrink-0 w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-[var(--muted-foreground)] hover:text-primary transition-all disabled:opacity-30">
                                <Upload className="h-3.5 w-3.5" />
                            </button>
                            <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
                                placeholder={phase === 'locked' ? 'Demo abgeschlossen' : phase === 'part_input' ? 'Welches Teil?' : phase === 'vin_input' ? 'VIN…' : phase === 'hsn_input' ? 'HSN TSN…' : 'Nachricht…'}
                                disabled={isLoading || phase === 'locked'} autoFocus
                                className="flex-1 px-3.5 py-2 rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-sm placeholder:text-[var(--muted-foreground)]/50 transition-all disabled:opacity-40" />
                            <button type="submit" disabled={isLoading || (!input.trim() && !imagePreview) || phase === 'locked'}
                                className="flex-shrink-0 w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground disabled:opacity-20 transition-all">
                                {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                            </button>
                        </form>
                    </div>
                )}

                <p className="text-center text-[10px] text-[var(--muted-foreground)]/70 mt-2">Powered by Gemini AI · Eine kostenlose Abfrage pro Gerät</p>
            </div>

            <style jsx global>{`
                @keyframes particleFly {
                    0% { opacity: 0; transform: translate(0,0) scale(1); }
                    15% { opacity: 1; }
                    85% { opacity: .7; }
                    100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(.15); }
                }
                @keyframes demoSpin {
                    from { transform: translate(-50%,-50%) rotate(0deg); }
                    to { transform: translate(-50%,-50%) rotate(360deg); }
                }
                @keyframes popIn {
                    0% { opacity: 0; transform: scale(.9) translateY(20px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </section>
    );
}
