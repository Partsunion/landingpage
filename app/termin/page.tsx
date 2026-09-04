import type { Metadata } from 'next';
import { AppointmentAccept } from '@/components/landing/AppointmentAccept';

export const metadata: Metadata = {
  title: 'Termin bestätigen – Partsunion',
  description: 'Bestätigen Sie Ihren Quali- oder Sales-Termin mit dem Partsunion-Team.',
  robots: { index: false, follow: false },
};

export default function TerminPage() {
  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] gradient-glow opacity-30 blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <h1 className="text-center text-3xl font-semibold mb-8">Dein Termin mit Partsunion</h1>
        <AppointmentAccept />
      </div>
    </div>
  );
}
