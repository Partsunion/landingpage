/** Appointment wishes use Europe/Berlin, irrespective of the visitor's timezone. */
export const appointmentTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
export function berlinDay(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}
export function appointmentDays(now = new Date()): string[] {
  const start = new Date(`${berlinDay(now)}T12:00:00Z`);
  const days: string[] = [];
  for (let n = 1; days.length < 15; n++) {
    const day = new Date(start.getTime() + n * 86400000);
    if (day.getUTCDay() !== 0 && day.getUTCDay() !== 6) days.push(day.toISOString().slice(0, 10));
  }
  return days;
}
export function berlinAppointment(day: string, time: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !appointmentTimes.includes(time))
    throw new Error('Bitte wähle einen gültigen Terminwunsch.');
  const utc = new Date(`${day}T${time}:00Z`);
  const zone = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin',
    timeZoneName: 'shortOffset',
  })
    .formatToParts(utc)
    .find((p) => p.type === 'timeZoneName')?.value;
  const offset = zone === 'GMT+2' ? '+02:00' : '+01:00';
  return `${day}T${time}:00${offset}`;
}
export function validAppointment(iso: string, now = new Date()): boolean {
  const day = iso.slice(0, 10),
    time = iso.slice(11, 16);
  return (
    appointmentDays(now).includes(day) &&
    appointmentTimes.includes(time) &&
    berlinAppointment(day, time) === iso &&
    new Date(iso) > now
  );
}
export function appointmentLabel(iso: string): string {
  return new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}
