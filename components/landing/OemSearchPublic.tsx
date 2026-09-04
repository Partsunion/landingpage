'use client';

/* eslint-disable @next/next/no-img-element -- API result images are remote/dynamic and rendered in a small demo preview. */

/**
 * OemSearchPublic — öffentliche Fahrzeug→Teil→OE-Suche auf der Landingpage.
 * Gleiche VIN-genaue Herstellerkatalog-Logik wie das Admin-Tool, aber max. 10 Abfragen
 * (server-seitig per IP gezählt, in der DB — überlebt Reload & Bot-Neustart).
 */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Search, Loader2, Car, Package, CheckCircle2, AlertTriangle, ArrowRight, Upload, ScanLine } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.partsunion.de';

/** Skaliert ein Bild im Browser auf maxSide px herunter → JPEG-DataURL (Handy-Fotos sonst zu groß für den Vision-Call). */
async function downscaleToDataUrl(file: File, maxSide: number, quality: number): Promise<string> {
    const dataUrl = await new Promise<string>((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(String(r.result || '')); r.onerror = reject; r.readAsDataURL(file); });
    const img = await new Promise<HTMLImageElement>((resolve, reject) => { const i = new Image(); i.onload = () => resolve(i); i.onerror = reject; i.src = dataUrl; });
    const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
    if (scale >= 1 && file.size < 1_200_000) return dataUrl;
    const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
    const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d'); if (!ctx) return dataUrl;
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL('image/jpeg', quality);
}

interface FindResult {
    resolved: boolean;
    stage?: string;
    vehicle?: string;
    partType?: string;
    partInterpretation?: {
        original: string;
        recognizedAs: string[];
        method: 'canonical' | 'alias' | 'fuzzy';
        confidence: 'high' | 'medium';
        corrections: string[];
    };
    oem?: string | null;
    image?: string | null;
    oemCandidates?: Array<{ oem: string; brand: string }>;
    vehicleCandidates?: Array<{ id: string; label: string }>;
    source?: string;
    provider?: string;
    remaining?: number;
    error?: string;
    reason?: string;
    alternatives?: boolean;
    grouping?: {
        requested: 'single' | 'set' | 'housing' | 'insert' | 'bundle' | 'part';
        matched: 'single' | 'set' | 'housing' | 'insert' | 'bundle' | 'mixed' | 'unknown';
        verified: boolean;
        excludedCandidates: number;
        notice?: string;
    };
    position?: {
        requestedAxle?: 'front' | 'rear';
        requestedSide?: 'left' | 'right';
        verified: boolean;
        excludedCandidates: number;
        evidence: string[];
    };
    trace?: Array<{ stage: string; status: 'ok' | 'not-found'; label: string }>;
    evidence?: {
        level: 'native-exact' | 'native-candidate' | 'heuristic-candidate' | 'incomplete';
        providerMatched: boolean;
        filterStateCarried: boolean;
        applicabilityVerified: boolean;
        traversalComplete: boolean;
        releaseSafe: boolean;
        occurrenceIds: string[];
    };
    /** Mehrere ausstattungsabhängige Ausführungen (z. B. Bremsscheiben-Größen). */
    ambiguous?: boolean;
    fitmentVariants?: Array<{
        oem: string;
        label: string;
        criteria?: Record<string, string>;
        axle?: 'front' | 'rear' | 'both';
        side?: 'left' | 'right' | 'both';
    }>;
}

function positionLabel(axle?: 'front' | 'rear' | 'both', side?: 'left' | 'right' | 'both'): string {
    return [
        axle === 'front' ? 'Vorderachse' : axle === 'rear' ? 'Hinterachse' : axle === 'both' ? 'Vorder- und Hinterachse' : '',
        side === 'left' ? 'links' : side === 'right' ? 'rechts' : side === 'both' ? 'links und rechts' : '',
    ].filter(Boolean).join(' · ');
}

const FIELDS = [
    { k: 'hsn', label: 'HSN (2.1)', ph: '0603' },
    { k: 'tsn', label: 'TSN (2.2)', ph: 'BLI' },
    { k: 'make', label: 'Marke', ph: 'VW' },
    { k: 'model', label: 'Modell', ph: 'Golf VII' },
    { k: 'year', label: 'Baujahr', ph: '2015' },
    { k: 'engine', label: 'Motor', ph: '2.0 TDI' },
    { k: 'engineKw', label: 'kW', ph: '110' },
    { k: 'fuelType', label: 'Kraftstoff', ph: 'Diesel' },
] as const;

const EXAMPLES = [
    { label: 'BMW · Bremsscheibe vorne', vin: 'WBAAT51010FW14413', make: 'BMW', part: 'Bremsscheibe vorne' },
    { label: 'VW · Ölfilter', vin: 'WVWZZZAUZJP051563', make: 'VOLKSWAGEN', part: 'Ölfilter' },
] as const;

export function OemSearchPublic() {
    const [form, setForm] = useState<Record<string, string>>({});
    const [part, setPart] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<FindResult | null>(null);
    const [remaining, setRemaining] = useState<number | null>(null);
    const [limitHit, setLimitHit] = useState(false);
    const [error, setError] = useState('');
    const [scanning, setScanning] = useState(false);
    const [scanNote, setScanNote] = useState('');
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch(`${API_BASE}/api/demo/oem-quota`).then((r) => r.json()).then((d) => {
            setRemaining(typeof d.remaining === 'number' ? d.remaining : null);
            if (d.remaining === 0) setLimitHit(true);
        }).catch(() => { /* ignore */ });
    }, []);

    const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    // Fahrzeugschein hochladen → Vision-OCR (gleiche Logik wie das Admin-Tool) → Felder automatisch ausfüllen.
    const onScan = async (file?: File) => {
        if (!file) return;
        if (file.size > 25_000_000) { setError('Bild zu groß (max 25 MB).'); return; }
        setScanning(true); setError(''); setScanNote('');
        try {
            const b64 = await downscaleToDataUrl(file, 1600, 0.82).catch(() => new Promise<string>((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(String(r.result || '')); r.onerror = reject; r.readAsDataURL(file); }));
            const r = await fetch(`${API_BASE}/api/demo/oem-scan-fahrzeugschein`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: b64 }),
            });
            if (r.status === 429) { setError('Scan-Limit erreicht. Bitte fordern Sie die Demo an oder kontaktieren Sie uns.'); return; }
            const data = await r.json().catch(() => ({}));
            if (!r.ok || !data.success) { setError(data.error || 'Schein-Erkennung fehlgeschlagen. Bitte ein schärferes Foto versuchen.'); return; }
            const v = data.vehicle || {};
            setForm((f) => ({
                ...f,
                vin: v.vin || f.vin || '',
                hsn: v.hsn || f.hsn || '', tsn: v.tsn || f.tsn || '',
                make: v.make || f.make || '', model: v.model || f.model || '',
                year: v.year ? String(v.year) : (f.year || ''),
                engineKw: v.kw ? String(v.kw) : (f.engineKw || ''),
                engine: v.motorcode || f.engine || '',
            }));
            const label = [v.make, v.model].filter(Boolean).join(' ');
            setScanNote(label
                ? `Erkannt: ${label}${v.vin ? ` · VIN ${String(v.vin).slice(0, 6)}…` : ''} — bitte prüfen und Teil eingeben.`
                : 'Fahrzeugschein erkannt — bitte VIN in Feld E prüfen.');
        } catch {
            setError('Schein-Erkennung fehlgeschlagen. Bitte erneut versuchen.');
        } finally {
            setScanning(false);
        }
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        const vin = (form.vin || '').trim().toUpperCase().replace(/[\s-]/g, '');
        if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
            setError('Bitte die gültige 17-stellige VIN aus Feld E eingeben.');
            return;
        }
        if (!part.trim()) { setError('Bitte ein Teil angeben (z. B. Ölfilter).'); return; }
        setForm((current) => ({ ...current, vin }));
        setLoading(true); setResult(null);
        try {
            const r = await fetch(`${API_BASE}/api/demo/oem-find`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, vin, part: part.trim() }),
            });
            const data: FindResult = await r.json().catch(() => ({ resolved: false }));
            if (r.status === 429) { setLimitHit(true); setRemaining(0); return; }
            if (!r.ok && data.error) { setError(data.error); if (typeof data.remaining === 'number') setRemaining(data.remaining); return; }
            setResult(data);
            if (typeof data.remaining === 'number') { setRemaining(data.remaining); if (data.remaining <= 0) setLimitHit(true); }
        } catch {
            setError('Verbindung fehlgeschlagen. Bitte erneut versuchen.');
        } finally { setLoading(false); }
    };

    if (limitHit) {
        return (
            <div className="max-w-md mx-auto text-center rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] p-8">
                <AlertTriangle className="h-8 w-8 text-warning mx-auto mb-3" />
                <h3 className="text-xl font-display font-semibold mb-2">Kostenlose Abfragen aufgebraucht</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-6">
                    Sie haben Ihre 10 kostenlosen OEM-Abfragen genutzt. Für unbegrenzte Teileermittlung testen Sie das
                    komplette Partsunion-Dashboard oder sprechen Sie mit uns.
                </p>
                <a href="/live-demo" className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl gradient-primary text-primary-foreground text-sm font-medium shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] hover:brightness-95 transition-all">
                    Dashboard-Demo anfordern <ArrowRight className="h-4 w-4" />
                </a>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <form onSubmit={onSubmit} className="rounded-2xl bg-card border border-border p-6 md:p-7 shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold"><Car className="h-4 w-4 text-primary" /> Fahrzeug</span>
                    {remaining !== null && (
                        <span className="text-xs text-[var(--muted-foreground)]">Noch <strong className="text-[var(--foreground)]">{remaining}</strong> von 10 Abfragen</span>
                    )}
                </div>

                {/* Fahrzeugschein hochladen → Felder werden automatisch ausgefüllt (Vision-OCR wie im Admin-Tool) */}
                <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; e.currentTarget.value = ''; onScan(f); }} />
                <button type="button" onClick={() => fileRef.current?.click()} disabled={scanning}
                    className="w-full mb-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-primary/40 bg-accent/50 text-sm font-medium text-primary hover:bg-accent transition-all disabled:opacity-50">
                    {scanning
                        ? <><Loader2 className="h-4 w-4 animate-spin" /> Fahrzeugschein wird erkannt…</>
                        : <><ScanLine className="h-4 w-4" /> Fahrzeugschein fotografieren / hochladen</>}
                </button>
                {scanNote
                    ? <p className="text-xs text-success mb-3 inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> {scanNote}</p>
                    : <p className="text-[11px] text-[var(--muted-foreground)]/70 mb-3 inline-flex items-center gap-1"><Upload className="h-3 w-3" /> Foto vom Fahrzeugschein (Teil I) — oder Daten unten manuell eingeben.</p>}

                <div className="mb-3">
                    <label className="block text-[11px] text-[var(--muted-foreground)] mb-1">VIN / FIN (Feld E) *</label>
                    <input
                        value={form.vin || ''}
                        maxLength={20}
                        autoCapitalize="characters"
                        placeholder="WBAAT51010FW14413"
                        onChange={(e) => set('vin', e.target.value.toUpperCase())}
                        className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm font-mono tracking-wider focus:border-primary focus:outline-none transition-all placeholder:text-[var(--muted-foreground)]/50"
                    />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {FIELDS.map((f) => (
                        <div key={f.k}>
                            <label className="block text-[11px] text-[var(--muted-foreground)] mb-1">{f.label}</label>
                            <input value={form[f.k] || ''} placeholder={f.ph} onChange={(e) => set(f.k, e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm font-mono focus:border-primary focus:outline-none transition-all placeholder:text-[var(--muted-foreground)]/50" />
                        </div>
                    ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-[var(--muted-foreground)]">Live-Beispiele:</span>
                    {EXAMPLES.map((example) => (
                        <button
                            type="button"
                            key={example.vin}
                            onClick={() => {
                                setForm((current) => ({ ...current, vin: example.vin, make: example.make }));
                                setPart(example.part);
                                setResult(null);
                                setError('');
                            }}
                            className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-muted hover:border-primary/40 hover:text-primary transition-colors"
                        >
                            {example.label}
                        </button>
                    ))}
                </div>
                <div className="mt-4">
                    <label className="block text-[11px] text-[var(--muted-foreground)] mb-1 inline-flex items-center gap-1"><Package className="h-3 w-3" /> Teil</label>
                    <div className="flex gap-2">
                        <input value={part} placeholder="Ölfilter, Bremsscheibe, Querlenker …" onChange={(e) => setPart(e.target.value)}
                            className="flex-1 px-3 py-2.5 rounded-lg bg-muted border border-border text-sm focus:border-primary focus:outline-none transition-all placeholder:text-[var(--muted-foreground)]/50" />
                        <button type="submit" disabled={loading}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] hover:brightness-95 transition-all disabled:opacity-50">
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />} OE finden
                        </button>
                    </div>
                </div>
                {error && <p className="text-xs text-error mt-2">{error}</p>}
                <p className="text-[11px] text-[var(--muted-foreground)]/70 mt-3">
                    Feld E (VIN/FIN) ist der exakte Schlüssel zum Herstellerkatalog. HSN/TSN dienen nur als zusätzliche Gegenprüfung.
                </p>
            </form>

            {result && (
                <div className="mt-5 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] p-6">
                    {result.resolved && result.oem && result.evidence?.releaseSafe === true ? (
                        <div className="flex items-start gap-4">
                            {result.image && <img src={result.image} alt="" className="w-20 h-20 object-contain rounded-lg border border-border bg-muted shrink-0" />}
                            <div className="min-w-0">
                                <div className="inline-flex items-center gap-1.5 text-xs text-success mb-1"><CheckCircle2 className="h-3.5 w-3.5" /> VIN-passende OE-Nummer gefunden</div>
                                <div className="font-mono text-2xl font-bold text-[var(--foreground)] break-all">{result.oem}</div>
                                <div className="text-sm text-[var(--foreground)] mt-0.5">{result.partType}</div>
                                {result.partInterpretation && result.partInterpretation.method !== 'canonical' && (
                                    <div className="mt-1 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-primary">
                                        Werkstattbegriff erkannt als: {result.partInterpretation.recognizedAs.join(', ')}
                                        {result.partInterpretation.method === 'fuzzy' ? ' · Schreibweise tolerant korrigiert' : ''}
                                    </div>
                                )}
                                <div className="text-xs text-[var(--muted-foreground)]">
                                    {result.vehicle}<span className="text-primary"> · Lizenzierter Herstellerkatalog per VIN</span>
                                </div>
                                {result.grouping?.verified && (
                                    <div className="mt-1 text-xs text-success">
                                        Untergruppe belegt: {result.grouping.matched === 'housing'
                                            ? 'Gehäuse'
                                            : result.grouping.matched === 'insert'
                                                ? 'Einsatz'
                                                : result.grouping.matched === 'set'
                                                    ? 'Satz/Kit'
                                                    : result.grouping.matched === 'bundle'
                                                        ? 'Filterpaket'
                                                    : result.grouping.matched === 'single'
                                                        ? 'Teil'
                                                        : 'Teil'}
                                    </div>
                                )}
                                {result.position?.verified && (
                                    <div className="mt-2 rounded-lg border border-success/20 bg-success/5 px-3 py-2 text-xs text-success">
                                        Einbauort belegt: {positionLabel(result.position.requestedAxle, result.position.requestedSide)}
                                    </div>
                                )}
                                {result.oemCandidates && result.oemCandidates.length > 1 && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {result.oemCandidates.slice(0, 6).map((c, i) => <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted border border-border text-[var(--muted-foreground)]">{c.oem}</span>)}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : result.fitmentVariants?.length ? (
                        <div className="min-w-0">
                            <div className="inline-flex items-center gap-1.5 text-xs text-warning mb-1">
                                <AlertTriangle className="h-3.5 w-3.5" />
                                {!result.grouping?.verified
                                    ? 'Angefragte Untergruppe nicht belegt'
                                    : result.grouping.matched === 'bundle'
                                    ? `${result.fitmentVariants.length} Filterpositionen im erkannten Paket`
                                    : result.alternatives
                                    ? `${result.fitmentVariants.length} vom Hersteller ausgewiesene Alternativen`
                                    : result.oem
                                    ? 'Katalog-Kandidat · noch nicht freigabefähig'
                                    : `${result.fitmentVariants.length} VIN-passende Ausführungen — Auswahl offen`}
                            </div>
                            {result.reason && (
                                <p className="mb-2 rounded-lg border border-warning/20 bg-warning/5 px-3 py-2 text-xs text-warning">
                                    {result.reason}
                                </p>
                            )}
                            {result.oem && result.evidence?.releaseSafe !== true && (
                                <p className="mb-2 rounded-lg border border-warning/20 bg-warning/5 px-3 py-2 text-xs text-warning">
                                    Fahrzeug-, Filter- oder Anwendbarkeitsbeleg ist noch nicht vollständig. Diese Nummer wird nicht automatisch bestellt oder als sicherer Treffer ausgegeben.
                                </p>
                            )}
                            {result.partInterpretation && result.partInterpretation.method !== 'canonical' && (
                                <div className="mb-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-primary">
                                    Werkstattbegriff erkannt als: {result.partInterpretation.recognizedAs.join(', ')}
                                    {result.partInterpretation.method === 'fuzzy' ? ' · Schreibweise tolerant korrigiert' : ''}
                                </div>
                            )}
                            <div className="text-sm text-[var(--foreground)]">{result.partType}</div>
                            <div className="text-xs text-[var(--muted-foreground)] mb-3">{result.vehicle}<span className="text-primary"> · Lizenzierter Herstellerkatalog per VIN</span></div>
                            <div className="grid gap-1.5 sm:grid-cols-2">
                                {result.fitmentVariants.slice(0, 6).map((v, i) => (
                                    <div key={i} className="rounded-lg border border-border bg-muted px-3 py-2">
                                        <div className="font-mono text-sm font-semibold text-[var(--foreground)] break-all">{v.oem}</div>
                                        {v.label && <div className="text-[11px] text-[var(--muted-foreground)]">{v.label}</div>}
                                        {positionLabel(v.axle, v.side) && (
                                            <div className="mt-1 text-[10px] font-medium text-primary">
                                                Einbauort: {positionLabel(v.axle, v.side)}
                                            </div>
                                        )}
                                        {v.criteria && Object.keys(v.criteria).length > 0 && (
                                            <div className="text-[10px] text-[var(--muted-foreground)]/80 mt-1">
                                                {Object.entries(v.criteria).slice(0, 2).map(([key, value]) => `${key}: ${value}`).join(' · ')}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-[11px] text-[var(--muted-foreground)]/70 mt-2">
                                {result.grouping?.matched === 'bundle'
                                    ? 'Der lizenzierte Katalog führt die Paketbestandteile einzeln. Ausstattungsabhängige Varianten bleiben deshalb sichtbar.'
                                    : 'Wir wählen bei offenen Ausstattungsmerkmalen absichtlich keine Nummer auf Verdacht.'}
                            </p>
                        </div>
                    ) : (
                        <div className="text-sm text-[var(--muted-foreground)]">
                            <AlertTriangle className="h-5 w-5 text-warning mb-2" />
                            {result.reason || (result.stage === 'vehicle'
                                ? 'Die VIN wurde im freigeschalteten Herstellerkatalog nicht erkannt.'
                                : `Für dieses Fahrzeug konnten wir „${part}" nicht sicher auflösen.${result.vehicle ? ` (${result.vehicle})` : ''}`)}
                            {result.partInterpretation && result.partInterpretation.method !== 'canonical' && (
                                <div className="mt-2 text-xs text-primary">
                                    Werkstattbegriff verstanden als: {result.partInterpretation.recognizedAs.join(', ')}
                                </div>
                            )}
                        </div>
                    )}
                    {result.trace?.length ? (
                        <div className="mt-4 pt-4 border-t border-border">
                            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mb-2">Prüfpfad</div>
                            <div className="flex flex-wrap gap-1.5">
                                {result.trace.map((step, index) => (
                                    <span key={`${step.stage}-${index}`} className={`text-[10px] px-2 py-1 rounded border ${step.status === 'ok' ? 'border-success/20 bg-success/5 text-success' : 'border-warning/20 bg-warning/5 text-warning'}`}>
                                        {step.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}
