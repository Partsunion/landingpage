'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { appointmentLabel, berlinAppointment } from '@/lib/appointments';
import { loadBookingAvailability } from '@/lib/consultation-booking';

const dayFormatter = new Intl.DateTimeFormat('de-DE', {
  timeZone: 'Europe/Berlin',
  weekday: 'short',
  day: 'numeric',
  month: 'long',
});

export function CalendarPicker({
  value,
  onChange,
  refresh = 0,
}: {
  value: string | null;
  onChange: (iso: string | null) => void;
  refresh?: number;
}) {
  const id = useId();
  const [day, setDay] = useState(value?.slice(0, 10) || '');
  const [slots, setSlots] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const load = () => {
      timeout = setTimeout(() => controller.abort(), 12000);
      void loadBookingAvailability(controller.signal)
        .then((data) => {
          if (!active) return;
          setSlots(data.slots);
          setError('');
        })
        .catch(() => {
          if (!active) return;
          setSlots([]);
          setError(
            'Die freien Termine konnten nicht geladen werden. Bitte versuche es erneut oder kontaktiere info@partsunion.de.',
          );
        })
        .finally(() => {
          clearTimeout(timeout);
          if (active) setLoading(false);
        });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          load();
        }
      },
      { rootMargin: '240px' },
    );
    if (container.current) observer.observe(container.current);
    return () => {
      active = false;
      observer.disconnect();
      clearTimeout(timeout);
      controller.abort();
    };
  }, [reload, refresh]);
  const days = [...new Set(slots.map((s) => s.slice(0, 10)))];
  const times = slots.filter((s) => s.startsWith(day + 'T')).map((s) => s.slice(11, 16));
  return (
    <div ref={container} className="bk-calendar" aria-busy={loading}>
      <p id={`${id}-hint`} className="mk-small bk-calendar-hint">
        {loading
          ? 'Freie Termine werden im Kalender geprüft …'
          : 'Freien Termin wählen. Direkt buchen. Bestätigung per E-Mail.'}
      </p>
      {error ? (
        <div className="bk-calendar-error" role="status">
          <p>{error}</p>
          <button
            type="button"
            className="mk-link"
            onClick={() => {
              setLoading(true);
              setError('');
              setReload((n) => n + 1);
            }}
          >
            Termine erneut laden
          </button>
          <a className="mk-link" href="mailto:info@partsunion.de">
            Per E-Mail Kontakt aufnehmen
          </a>
        </div>
      ) : !loading && days.length === 0 ? (
        <p role="status" className="mk-small">
          Aktuell sind alle Online-Termine belegt.{' '}
          <a href="mailto:info@partsunion.de" className="mk-link">
            Schreib uns für einen passenden Termin.
          </a>
        </p>
      ) : null}
      <div className="mk-form-row">
        <div className="mk-field">
          <label htmlFor={`${id}-date`}>Tag *</label>
          <select
            id={`${id}-date`}
            name="appointmentDay"
            required
            disabled={loading || !days.length}
            aria-describedby={`${id}-hint ${id}-timezone`}
            value={days.includes(day) ? day : ''}
            onChange={(e) => {
              setDay(e.target.value);
              onChange(null);
            }}
          >
            <option value="">Tag auswählen</option>
            {days.map((date) => (
              <option key={date} value={date}>
                {dayFormatter.format(new Date(`${date}T12:00:00Z`))}
              </option>
            ))}
          </select>
        </div>
        <div className="mk-field">
          <label htmlFor={`${id}-time`}>Uhrzeit *</label>
          <select
            id={`${id}-time`}
            name="appointmentTime"
            required
            disabled={loading || !times.length}
            aria-describedby={`${id}-hint ${id}-timezone`}
            value={value?.slice(11, 16) || ''}
            onChange={(e) =>
              onChange(e.target.value ? berlinAppointment(day, e.target.value) : null)
            }
          >
            <option value="">Uhrzeit auswählen</option>
            {times.map((time) => (
              <option key={time} value={time}>
                {time} Uhr
              </option>
            ))}
          </select>
        </div>
      </div>
      <p id={`${id}-timezone`} className="mk-small bk-timezone">
        30 Minuten · Deutsche Ortszeit (Europe/Berlin)
      </p>
      {value && (
        <p className="bk-selection" role="status">
          Deine Auswahl: {appointmentLabel(value)} Uhr.
        </p>
      )}
    </div>
  );
}
