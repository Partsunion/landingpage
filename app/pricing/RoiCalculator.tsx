'use client';

import { useMemo, useState } from 'react';
import { Banknote, Calculator, Clock, TrendingUp } from 'lucide-react';

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
    onChange: (value: number) => void;
    hint: string;
}

function Slider({ label, value, min, max, step, unit, onChange, hint }: SliderProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-baseline justify-between gap-4">
                <label className="text-sm font-medium text-foreground/85">{label}</label>
                <span className="font-mono tabular-nums text-base font-semibold text-foreground whitespace-nowrap">
                    {value.toLocaleString('de-DE')} {unit}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-border accent-primary"
            />
            <p className="text-xs text-muted-foreground">{hint}</p>
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
        <div className={`rounded-xl border p-5 ${primary ? 'border-primary/40 bg-primary/[0.05]' : 'border-border bg-card shadow-[var(--shadow-card)]'}`}>
            <div className="flex items-center gap-2 mb-3">
                <Icon className={`h-3.5 w-3.5 ${primary ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                </span>
            </div>
            <div className={`font-mono tabular-nums text-2xl md:text-3xl font-semibold mb-1 ${primary ? 'text-primary' : 'text-foreground'}`}>
                {value}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{hint}</p>
        </div>
    );
}

export function RoiCalculator() {
    const [casesPerDay, setCasesPerDay] = useState(40);
    const [workdaysPerYear, setWorkdaysPerYear] = useState(220);
    const [minutesToday, setMinutesToday] = useState(12);
    const [minutesTarget, setMinutesTarget] = useState(7);
    const [hourlyCost, setHourlyCost] = useState(38);
    const [annualInvestment, setAnnualInvestment] = useState(18000);

    const result = useMemo(() => {
        const annualCases = casesPerDay * workdaysPerYear;
        const effectiveTargetMinutes = Math.min(minutesToday, minutesTarget);
        const currentHours = (annualCases * minutesToday) / 60;
        const targetHours = (annualCases * effectiveTargetMinutes) / 60;
        const hoursSaved = currentHours - targetHours;
        const currentProcessCost = currentHours * hourlyCost;
        const grossProcessDifference = hoursSaved * hourlyCost;
        const netPotential = grossProcessDifference - annualInvestment;
        const monthlyDifference = grossProcessDifference / 12;
        const paybackMonths = monthlyDifference > 0 ? annualInvestment / monthlyDifference : null;

        return {
            annualCases,
            currentProcessCost,
            hoursSaved,
            grossProcessDifference,
            netPotential,
            paybackMonths,
        };
    }, [annualInvestment, casesPerDay, hourlyCost, minutesTarget, minutesToday, workdaysPerYear]);

    const paybackHint = result.paybackMonths === null
        ? 'Mit diesen Eingaben entsteht keine rechnerische Zeitkostendifferenz.'
        : `Rechnerischer Budgetausgleich nach ${result.paybackMonths.toLocaleString('de-DE', { maximumFractionDigits: 1 })} Monaten.`;

    return (
        <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-raised)] p-6 md:p-8 space-y-8">
            <section>
                <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-5">
                    Ihre Prozessannahmen
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Slider
                        label="Vorgänge pro Tag"
                        value={casesPerDay}
                        min={5}
                        max={500}
                        step={5}
                        unit=""
                        onChange={setCasesPerDay}
                        hint="Zum Beispiel Teileanfragen oder Verkaufsvorgänge."
                    />
                    <Slider
                        label="Arbeitstage pro Jahr"
                        value={workdaysPerYear}
                        min={100}
                        max={300}
                        step={5}
                        unit="Tage"
                        onChange={setWorkdaysPerYear}
                        hint="Nach Ihrer tatsächlichen Betriebszeit."
                    />
                    <Slider
                        label="Bearbeitungszeit heute"
                        value={minutesToday}
                        min={1}
                        max={60}
                        step={1}
                        unit="Min."
                        onChange={setMinutesToday}
                        hint="Durchschnittlicher Personalaufwand je Vorgang."
                    />
                    <Slider
                        label="Zielzeit je Vorgang"
                        value={minutesTarget}
                        min={1}
                        max={60}
                        step={1}
                        unit="Min."
                        onChange={setMinutesTarget}
                        hint="Ihre eigene, im Pilot zu prüfende Zielannahme."
                    />
                    <Slider
                        label="Interner Stundensatz"
                        value={hourlyCost}
                        min={20}
                        max={120}
                        step={5}
                        unit="€"
                        onChange={setHourlyCost}
                        hint="Vollkosten je produktiver Arbeitsstunde."
                    />
                    <Slider
                        label="Jährliches Systembudget"
                        value={annualInvestment}
                        min={0}
                        max={100000}
                        step={1000}
                        unit="€"
                        onChange={setAnnualInvestment}
                        hint="Ihre Planungsgröße für Software, Einführung und Betrieb."
                    />
                </div>
            </section>

            <section>
                <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-5">
                    Rechnerischer Business Case pro Jahr
                </h2>
                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                    <ResultCard
                        icon={Clock}
                        label="Heutiger Prozessaufwand"
                        value={fmtEUR(result.currentProcessCost)}
                        hint={`${result.annualCases.toLocaleString('de-DE')} Vorgänge × ${minutesToday} Minuten × ${hourlyCost} € pro Stunde.`}
                    />
                    <ResultCard
                        icon={TrendingUp}
                        label="Zeitpotenzial"
                        value={fmtHours(result.hoursSaved)}
                        hint={`Differenz zwischen ${minutesToday} und ${Math.min(minutesToday, minutesTarget)} Minuten je Vorgang.`}
                    />
                    <ResultCard
                        icon={Banknote}
                        label="Prozesskostendifferenz"
                        value={fmtEUR(result.grossProcessDifference)}
                        hint="Zeitpotenzial bewertet mit Ihrem internen Stundensatz."
                    />
                    <ResultCard
                        icon={Calculator}
                        label="Potenzial nach Systembudget"
                        value={fmtEUR(result.netPotential)}
                        hint={paybackHint}
                        primary
                    />
                </div>
            </section>

            <details className="rounded-lg border border-border bg-muted overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors">
                    Berechnungslogik anzeigen
                </summary>
                <div className="px-4 pb-4 text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                    <p>• Alle Volumen-, Zeit-, Kosten- und Budgetwerte stammen aus Ihren Eingaben.</p>
                    <p>• Zielzeiten oberhalb der heutigen Bearbeitungszeit erzeugen keine Einsparung.</p>
                    <p>• Zusatzumsatz, Retourenreduktion und Automatisierungsquoten werden nicht pauschal angenommen.</p>
                    <p>• Das Ergebnis ist ein Planungsszenario, keine zugesicherte Einsparung.</p>
                    <p className="pt-2 text-[11px] text-muted-foreground">
                        Für eine belastbare Entscheidung werden Ist-Zeiten und Zielwerte in einem abgegrenzten Pilotprozess gemessen.
                    </p>
                </div>
            </details>
        </div>
    );
}
