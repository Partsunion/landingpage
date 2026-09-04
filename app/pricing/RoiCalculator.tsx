'use client';
import { useId, useState } from 'react';
const fields = [
  ['volume', 'Vorgänge pro Arbeitstag', '20', 1, 10000],
  ['days', 'Arbeitstage pro Jahr', '220', 1, 366],
  ['today', 'Minuten pro Vorgang heute', '10', 0, 1440],
  ['target', 'Minuten im Zielszenario', '8', 0, 1440],
  ['rate', 'Interner Stundensatz in €', '35', 0, 1000],
  ['budget', 'Jährliches Gesamtbudget in € (optional)', '', 0, 10000000],
] as const;
export function RoiCalculator() {
  const id = useId();
  const [values, setValues] = useState<Record<string, string>>({
    volume: '20',
    days: '220',
    today: '10',
    target: '8',
    rate: '35',
    budget: '',
  });
  const valid = fields.every(
    ([key, , , min, max]) =>
      (key === 'budget' && values[key] === '') ||
      (values[key] !== '' &&
        Number.isFinite(Number(values[key])) &&
        Number(values[key]) >= min &&
        Number(values[key]) <= max),
  );
  const hours =
    ((Number(values.today) - Number(values.target)) * Number(values.volume) * Number(values.days)) /
    60;
  const gross = hours * Number(values.rate);
  const eur = (n: number) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(n);
  return (
    <div className="mk-form">
      <h3>Dein Rechenbeispiel</h3>
      <p className="mk-small">Beispielwerte – bitte durch deine Annahmen ersetzen.</p>
      <div className="mk-form-fields">
        <div className="mk-form-row">
          {fields.map(([key, label, , min, max]) => (
            <div className="mk-field" key={key}>
              <label htmlFor={`${id}-${key}`}>{label}</label>
              <input
                id={`${id}-${key}`}
                type="number"
                min={min}
                max={max}
                step="any"
                value={values[key]}
                onChange={(e) => setValues({ ...values, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{ borderTop: '1px solid var(--mk-line)', paddingTop: 22 }}
        >
          {valid ? (
            <>
              <p className="mk-small">Rechnerische Zeitdifferenz pro Jahr</p>
              <p style={{ fontSize: 34, fontWeight: 550, letterSpacing: '-.04em' }}>
                {new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(hours)} Stunden
              </p>
              <p className="mk-small" style={{ marginTop: 12 }}>
                Zeitwert: <strong>{eur(gross)} / Jahr</strong>
                {values.budget !== '' && (
                  <>
                    {' '}
                    · nach deinem Budget:{' '}
                    <strong>{eur(gross - Number(values.budget))} / Jahr</strong>
                  </>
                )}
              </p>
              {hours < 0 && (
                <p className="mk-small" style={{ marginTop: 12 }}>
                  Dein Zielszenario benötigt mehr Zeit als der heutige Ablauf.
                </p>
              )}
            </>
          ) : (
            <p className="mk-error">
              Bitte gib gültige Werte innerhalb der angegebenen Grenzen ein.
            </p>
          )}
        </div>
        <p className="mk-small" style={{ fontSize: 12 }}>
          Rechnung: (Minuten heute − Zielminuten) × Vorgänge × Arbeitstage ÷ 60. Zeitwert = Stunden
          × Stundensatz. Freie Kapazität ist nicht automatisch eine zahlungswirksame Ersparnis.
        </p>
      </div>
    </div>
  );
}
