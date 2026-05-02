import { Hero } from '@/components/landing/Hero';
import { PainPoints } from '@/components/landing/PainPoints';
import { BeforeAfter } from '@/components/landing/BeforeAfter';
import { ValueProposition } from '@/components/landing/ValueProposition';
import { TechTabs } from '@/components/landing/TechTabs';
import { Features } from '@/components/landing/Features';
import { Testimonials } from '@/components/landing/Testimonials';
import { ConsultationForm } from '@/components/landing/ConsultationForm';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';
import { MobileStickyCTA } from '@/components/layout/MobileStickyCTA';
import { WhatsAppFloat } from '@/components/landing/WhatsAppFloat';

export default function Home() {
  return (
    <>
      <Hero />
      <PainPoints />
      <BeforeAfter />
      <ValueProposition />
      <TechTabs />
      <Features />
      <Testimonials />
      <ConsultationForm />
      <FAQ />
      <CTA />
      <MobileStickyCTA />
      <WhatsAppFloat />
    </>
  );
}

