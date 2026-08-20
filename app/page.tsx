import { Hero } from '@/components/landing/Hero';
import { ProcessSection } from '@/components/landing/ProcessSection';
import { Modules } from '@/components/landing/Modules';
import { BeforeAfter } from '@/components/landing/BeforeAfter';
import { TrustCompliance } from '@/components/landing/TrustCompliance';
import { Ecosystem } from '@/components/landing/Ecosystem';
import { FAQ } from '@/components/landing/FAQ';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { MobileStickyCTA } from '@/components/layout/MobileStickyCTA';
import { WhatsAppFloat } from '@/components/landing/WhatsAppFloat';

/**
 * Homepage — 8 Sektionen mit klarem Erzählbogen:
 * Wert (Hero) → Wie (Prozess) → Was (Module) → Beweis (Zahlen) →
 * Vertrauen (Compliance/Sicherheit) → Breite (Ökosystem) → Einwände (FAQ) →
 * Conversion (FinalCTA mit Formular).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProcessSection />
      <Modules />
      <BeforeAfter />
      <TrustCompliance />
      <Ecosystem />
      <FAQ />
      <FinalCTA />
      <MobileStickyCTA />
      <WhatsAppFloat />
    </>
  );
}
