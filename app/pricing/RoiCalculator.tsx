'use client';

import { useMemo, useState } from 'react';
import { TrendingUp, Clock, Banknote, ShieldCheck } from 'lucide-react';

/**
 * RoiCalculator — interaktiver Slider-basierter ROI-Kalkulator.
 *
 * Eingaben:
 *   - Anfragen pro Tag       (0–500)
 *   - Ø-Auftragswert         (50–500 €)
 *   - aktuelle Retourenquote (0–35 %)
 *
 * Live-Outputs:
 *   - Zeit-Gewinn pro Jahr   (basis: 7 min eingespart pro automatisierter Anfrage,
 *                             8h Arbeitstag × 220 Arbeitstage)
 *   - Marge-Plus pro Jahr    (basis: Retoure von X% auf 3,2% senken,
 *                             jede Retoure kostet 12% des Auftragswertes)
 *   - Zusatz-Conversions     (basis: 24/7-Bot fängt nachts 35% Extra-Volumen,
 *                             40% davon konvertieren mit Vorkasse-Flow)
 *   - Gesamt-Einsparpotenzial
 */

const fmtEUR = (n: number): string =>
    new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(Math.round(n)) + ' €';

const fmtHours = (n: number): string =>
    new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(Math.round(n)) + ' h';

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    onChange: (v: number) => void;
    hint?: string;
}

function Slider({ label, value, min, max, step, unit, onChange, hint }: SliderProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-baseline justify-between">
                <label className="text-sm font-medium text-foreground/85">{label}</label>
                <span
                    className="font-mono tabular-nums text-base font-semibold text-foreground"
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    {value.toLocaleString('de-DE')} {unit}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-border accent-primary"
            />
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
    );
}

interface ResultCardProps {
    icon: typeof TrendingUp;
    label: string;
    value: string;
    hint: string;
    primary?: boolean;
}

function ResultCard({ icon: Icon, label, value, hint, primary }: ResultCardProps) {
    return (
        <div
            className={`rounded-xl border p-5 ${
                primary
                    ? 'border-primary/40 bg-primary/[0.05]'
                    : 'border-border/60 bg-[rgba(15,23,42,0.3)]'
            }`}
        >
            <div className="flex items-center gap-2 mb-3">
                <Icon className={`h-3.5 w-3.5 ${primary ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                </span>
            </div>
            <div
                className={`font-mono tabular-nums text-2xl md:text-3xl font-semibold mb-1 ${
                    primary ? 'text-primary' : 'text-foreground'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
            >
                {value}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{hint}</p>
        </div>
    );
}

export function RoiCalculator() {
    const [requestsPerDay, setRequestsPerDay] = useState(40);
    const [averageOrderValue, setAverageOrderValue] = useState(180);
    const [returnRatePct, setReturnRatePct] = useState(15);

    const result = useMemo(() => {
        // Annahmen
        const WORKDAYS = 220;                            // Werktage pro Jahr
        const MINUTES_SAVED_PER_REQUEST = 7;             // Min gespart pro Anfrage
        const AUTOMATION_RATE = 0.8;                     // 80 % der Anfragen werden vollautomatisch
        const TARGET_RETURN_RATE = 0.032;                // Partsunion-Zielwert: 3,2 %
        const RETURN_COST_PCT = 0.12;                    // jede Retoure kostet ~12 % Marge

        // 24/7-Bot Annahmen
        const EXTRA_VOLUME_RATE = 0.35;                  // +35 % Extra-Anfragen außerhalb Geschäftszeit
        const CONVERSION_PREPAID = 0.4;                  // 40 % davon konvertieren mit Vorkasse

        const annualRequests = requestsPerDay * WORKDAYS;
        const annualRevenue = annualRequests * averageOrderValue;

        // 1) Zeit-Gewinn
        const automatedRequests = annualRequests * AUTOMATION_RATE;
        const minutesSaved = automatedRequests * MINUTES_SAVED_PER_REQUEST;
        const hoursSaved = minutesSaved / 60;

        // 2) Marge-Plus durch Retouren-Reduktion
        const currentReturnRate = returnRatePct / 100;
        const reducedReturns = Math.max(0, currentReturnRate - TARGET_RETURN_RATE);
        const marginRecovered = annualRevenue * reducedReturns * RETURN_COST_PCT;

        // 3) Zusatz-Conversions (24/7 + Vorkasse)
        const extraRequests = annualRequests * EXTRA_VOLUME_RATE;
        const extraOrders = extraRequests * CONVERSION_PREPAID;
        const extraRevenue = extraOrders * averageOrderValue;
        const extraMargin = extraRevenue * 0.18;        // 18 % Netto-Marge auf Zusatz-Umsatz

        const total = marginRecovered + extraMargin;

        return {
            annualRevenue,
            hoursSaved,
            marginRecovered,
            extraMargin,
            extraRevenue,
            extraOrders: Math.round(extraOrders),
            total,
        };
    }, [requestsPerDay, averageOrderValue, returnRatePct]);

    return (
        <div className="rounded-2xl border border-border/60 bg-[rgba(15,23,42,0.4)] p-6 md:p-8 space-y-8">
            {/* Eingaben */}
            <section>
                <h2
                    className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-5"
                >
                    Ihre Eckdaten
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <Slider
                        label="Anfragen / Tag"
                        value={requestsPerDay}
                        min={5}
                        max={500}
                        step={5}
                        unit=""
                        onChange={setRequestsPerDay}
                        hint="Über alle Kanäle (Telefon, WhatsApp, Mail, Theke)"
                    />
                    <Slider
                        label="Ø-Auftragswert"
                        value={averageOrderValue}
                        min={50}
                        max={500}
                        step={10}
                        unit="€"
                        onChange={setAverageOrderValue}
                        hint="Netto, je verkaufter Position"
                    />
                    <Slider
                        label="Retourenquote heute"
                        value={returnRatePct}
                        min={0}
                        max={35}
                        step={1}
                        unit="%"
                        onChange={setReturnRatePct}
                        hint="Branchen-Ø: 18–22 %"
                    />
                </div>
            </section>

            {/* Ausgabe */}
            <section>
                <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-5">
                    Ihr Einsparpotenzial pro Jahr
                </h2>
                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                    <ResultCard
                        icon={Clock}
                        label="Zeit-Gewinn"
                        value={fmtHours(result.hoursSaved)}
                        hint="80 % der Anfragen automatisiert · 7 min Ersparnis pro Anfrage"
                    />
                    <ResultCard
                        icon={ShieldCheck}
                        label="Marge-Plus durch weniger Retouren"
                        value={fmtEUR(result.marginRecovered)}
                        hint={`Senkung von ${returnRatePct}% auf 3,2 % · jede Retoure kostet 12 % Marge`}
                    />
                    <ResultCard
                        icon={Banknote}
                        label="Zusatz-Umsatz durch 24/7-Bot"
                        value={fmtEUR(result.extraRevenue)}
                        hint={`+35 % Wochenend-/Nacht-Volumen · ${result.extraOrders} Extra-Aufträge/Jahr`}
                    />
                    <ResultCard
                        icon={TrendingUp}
                        label="Gesamt-Marge-Plus"
                        value={fmtEUR(result.total)}
                        hint="Marge-Recovery + Netto-Marge auf Zusatz-Umsatz"
                        primary
                    />
                </div>
            </section>

            {/* Annahmen */}
            <details className="rounded-lg border border-border/60 bg-[rgba(10,15,26,0.4)] overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors">
                    Annahmen anzeigen
                </summary>
                <div className="px-4 pb-4 text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                    <p>• 220 Werktage pro Jahr</p>
                    <p>• 80 % Automatisierungsrate (Standard-Anfragen → Bot)</p>
                    <p>• 7 Minuten Zeitersparnis pro automatisierter Anfrage</p>
                    <p>• Retourenquote sinkt auf Partsunion-Zielwert 3,2 %</p>
                    <p>• Jede Retoure kostet 12 % Marge (Versand, Wiedereinlagerung, Personal)</p>
                    <p>• 24/7-Bot fängt 35 % zusätzliches Anfragevolumen ein</p>
                    <p>• 40 % der Zusatz-Anfragen konvertieren mit Vorkasse-Flow</p>
                    <p>• 18 % Netto-Marge auf Zusatz-Umsatz</p>
                    <p className="pt-2 text-[11px] text-muted-foreground/70">
                        Es handelt sich um Modell-Annahmen auf Basis von Branchen-Benchmarks und internen
                        Systemtests — keine zugesicherten Ergebnisse. Partsunion befindet sich im Markteintritt;
                        im Beratungstermin rechnen wir mit Ihren echten Zahlen.
                    </p>
                </div>
            </details>
        </div>
    );
}
