'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, CalendarDays } from 'lucide-react';

/**
 * Calendar-Picker für einen unverbindlichen Terminwunsch.
 *
 * Verhalten:
 *   - Zeigt die nächsten 14 Werktage (Mo-Fr)
 *   - Werktag-Slots: 09:00, 10:00, 11:00, 14:00, 15:00, 16:00 (30 Min)
 *   - User wählt Datum → Slots-Liste rechts → confirmation
 *   - Auswahl wird via onChange(ISO-Datum) an Parent gemeldet
 *
 * Keine Backend-Anbindung hier — Parent-Component (Form) ist verantwortlich,
 * den gewählten Slot in den Lead-Payload zu schreiben.
 */

interface Props {
    value: string | null;
    onChange: (isoDate: string | null) => void;
}

const SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

/** Returns true for Sat/Sun. */
const isWeekend = (d: Date) => {
    const dow = d.getDay();
    return dow === 0 || dow === 6;
};

const formatDayShort = (d: Date) =>
    d.toLocaleDateString('de-DE', { weekday: 'short' }).replace('.', '');

const formatDateLong = (d: Date) =>
    d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });

const formatDateISO = (d: Date, time: string) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${time}:00`;
};

export function CalendarPicker({ value, onChange }: Props) {
    const [weekOffset, setWeekOffset] = useState(0);
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    // Generate next 14 weekdays starting from `weekOffset * 7` days ahead
    const days = useMemo(() => {
        const out: Date[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(today);
        start.setDate(today.getDate() + weekOffset * 7);

        let i = 0;
        while (out.length < 5 && i < 14) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            if (!isWeekend(d)) out.push(d);
            i++;
        }
        return out;
    }, [weekOffset]);

    const selectedISODate = value;
    const selectedTime = selectedISODate ? selectedISODate.split('T')[1]?.slice(0, 5) : null;

    return (
        <div className="border border-[#cfd5dc] bg-[#f6f8fb] p-3 md:p-5">
            {/* Header with week nav */}
            <div className="mb-3 flex items-center justify-between md:mb-4">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Wunschzeit wählen
                </div>
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
                        disabled={weekOffset === 0}
                        aria-label="Vorherige Woche"
                        className="p-1.5 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setWeekOffset((w) => Math.min(3, w + 1))}
                        disabled={weekOffset >= 3}
                        aria-label="Nächste Woche"
                        className="p-1.5 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* Day strip */}
            <div className="mb-3 grid grid-cols-5 gap-1 md:mb-4 md:gap-1.5">
                {days.map((d) => {
                    const isSelected = selectedDay && d.toDateString() === selectedDay.toDateString();
                    const isSelectedFromValue =
                        selectedISODate &&
                        d.toDateString() === new Date(selectedISODate).toDateString();
                    const active = isSelected || isSelectedFromValue;
                    return (
                        <button
                            key={d.toISOString()}
                            type="button"
                            onClick={() => {
                                setSelectedDay(d);
                                // Clear any previously chosen time when changing day
                                if (selectedISODate && new Date(selectedISODate).toDateString() !== d.toDateString()) {
                                    onChange(null);
                                }
                            }}
                            className={`flex flex-col items-center border py-1.5 transition-all md:py-2.5 ${
                                active
                                    ? 'border-primary/50 bg-primary/10 text-foreground'
                                    : 'border-border hover:border-border-hover bg-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <span className="text-[10px] font-medium uppercase tracking-[0.1em]">
                                {formatDayShort(d)}
                            </span>
                            <span
                                className="mt-0.5 text-sm font-semibold tabular-nums md:text-base"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                {d.getDate()}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Slots */}
            {selectedDay ? (
                <div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Clock className="h-3.5 w-3.5" />
                        Mögliche Wunschzeiten am{' '}
                        <span className="text-foreground font-medium">
                            {formatDateLong(selectedDay)}
                        </span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                        {SLOTS.map((time) => {
                            const isoForThis = formatDateISO(selectedDay, time);
                            const active = selectedISODate === isoForThis;
                            return (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => onChange(active ? null : isoForThis)}
                                    className={`py-2 text-sm font-medium tabular-nums transition-all ${
                                        active
                                            ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/30'
                                            : 'border border-border hover:border-primary/50 text-foreground/80 hover:text-foreground'
                                    }`}
                                    style={{ fontFamily: 'var(--font-mono)' }}
                                >
                                    {time}
                                </button>
                            );
                        })}
                    </div>
                    {selectedTime && (
                        <p className="mt-4 text-xs text-muted-foreground">
                            ✓ Dein Terminwunsch:{' '}
                            <span className="text-foreground font-medium">
                                {formatDateLong(selectedDay)} um {selectedTime} Uhr
                            </span>{' '}
                            (30 Minuten). Wir bestätigen den Termin anschließend.
                        </p>
                    )}
                </div>
            ) : (
                <div className="border-t border-border py-2 pt-3 text-center text-[10px] text-muted-foreground md:py-6 md:pt-4 md:text-xs">
                    Wähle zunächst einen passenden Tag.
                </div>
            )}
        </div>
    );
}
