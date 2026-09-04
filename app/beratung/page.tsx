import type { Metadata } from 'next';
import { FinalCTA } from '@/components/landing/FinalCTA';

export const metadata: Metadata = {
  title: 'Persönliches Beratungsgespräch vereinbaren',
  description:
    'Buche dein Partsunion-Beratungsgespräch direkt im Kalender. Gemeinsam klären wir OE-Automatisierung, ERP, WaWi, Kasse, Einführung und Kosten für deinen Betrieb.',
  alternates: { canonical: '/beratung' },
  openGraph: {
    title: 'Dein persönliches Beratungsgespräch mit Partsunion',
    description:
      'Wähle einen freien Termin. In 30 Minuten klären wir Funktionen, Anbindungen und nächste Schritte für deinen Teilehandel. Bestätigung direkt per E-Mail.',
    url: 'https://partsunion.de/beratung',
  },
};

export default function ConsultationPage() {
  return <FinalCTA standalone />;
}
