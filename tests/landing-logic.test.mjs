import test from 'node:test';
import assert from 'node:assert/strict';
import {
  appointmentDays,
  berlinAppointment,
  validAppointment,
  appointmentLabel,
} from '../lib/appointments.ts';
import { campaignContext } from '../lib/attribution.ts';
import { analyticsClick } from '../lib/analytics-click.ts';

test('Termine wechseln den UTC-Offset mit der deutschen Sommerzeit', () => {
  assert.equal(berlinAppointment('2026-03-27', '09:00'), '2026-03-27T09:00:00+01:00');
  assert.equal(berlinAppointment('2026-03-30', '09:00'), '2026-03-30T09:00:00+02:00');
  assert.equal(berlinAppointment('2026-10-23', '09:00'), '2026-10-23T09:00:00+02:00');
  assert.equal(berlinAppointment('2026-10-26', '09:00'), '2026-10-26T09:00:00+01:00');
  assert.match(appointmentLabel('2026-03-30T09:00:00+02:00'), /09:00/);
});
test('Wunschtermine sind zukünftige Werktage in Deutschland', () => {
  const now = new Date('2026-09-04T22:30:00Z');
  const days = appointmentDays(now);
  assert.equal(days.length, 15);
  assert.equal(days[0], '2026-09-07');
  assert.equal(new Set(days).size, 15);
  assert.ok(days.every((day) => ![0, 6].includes(new Date(day).getUTCDay())));
  assert.equal(validAppointment('2026-09-07T09:00:00+02:00', now), true);
  assert.equal(validAppointment('2026-09-04T09:00:00+02:00', now), false);
  assert.equal(validAppointment('2026-09-05T09:00:00+02:00', now), false);
  assert.equal(validAppointment('2026-09-07T09:00:00+01:00', now), false);
  assert.equal(validAppointment('2026-09-07T23:00:00+02:00', now), false);
  assert.equal(validAppointment('not-a-date', now), false);
});
test('Kampagnenkontext übernimmt nur begrenzte Parameter und die Referrer-Domain', () => {
  const context = campaignContext(
    'https://partsunion.de/plattform/neuteile?utm_source=google&utm_medium=cpc&utm_campaign=Neuteile_2026&gclid=private-id&email=person@example.com',
    'https://google.de/search?q=private',
  );
  assert.deepEqual(context, {
    landingPath: '/plattform/neuteile',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'Neuteile_2026',
    referrerHost: 'google.de',
  });
  assert.deepEqual(
    campaignContext(
      'https://partsunion.de/?utm_term=person%40example.com&utm_source=' + 'x'.repeat(101),
      'bad-referrer',
    ),
    { landingPath: '/' },
  );
  assert.deepEqual(
    campaignContext('https://partsunion.de/beratung', 'https://partsunion.de/?email=private'),
    { landingPath: '/beratung' },
  );
});

test('Klickanalyse speichert nur sichere Ziele statt URL-Parameter oder Kontaktdaten', () => {
  assert.deepEqual(analyticsClick({
    href: '/beratung?email=person@example.com#termin',
    page: '/plattform/neuteile?gclid=private',
    placement: 'Hero',
    origin: 'https://partsunion.de',
  }), {
    page: '/plattform/neuteile',
    target: 'Link /beratung',
    placement: 'hero',
    destination: '/beratung',
    kind: 'internal',
  });
  assert.deepEqual(analyticsClick({
    href: 'https://wa.me/49123456789?text=private',
    explicitTarget: 'Vertrieb +49 123 456789',
    page: '/',
    placement: 'footer',
    origin: 'https://partsunion.de',
  }), {
    page: '/',
    target: 'Outbound wa.me',
    placement: 'footer',
    destination: 'wa.me',
    kind: 'outbound',
  });
});
