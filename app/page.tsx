import { Hero } from '@/components/landing/Hero';
import { PartnerStrip } from '@/components/landing/PartnerStrip';
import { BeforeAfter } from '@/components/landing/BeforeAfter';
import { ValueProposition } from '@/components/landing/ValueProposition';
import { Wholesalers } from '@/components/landing/Wholesalers';
import { TechTabs } from '@/components/landing/TechTabs';
import { ConsultationForm } from '@/components/landing/ConsultationForm';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';
import { MobileStickyCTA } from '@/components/layout/MobileStickyCTA';
import { WhatsAppFloat } from '@/components/landing/WhatsAppFloat';

export default function Home() {
  return (
    <>
      <Hero />
      <PartnerStrip />
      <BeforeAfter />
      <ValueProposition />
      <Wholesalers />
      <TechTabs />
      <ConsultationForm />
      <FAQ />
      <CTA />
      <MobileStickyCTA />
      <WhatsAppFloat />
    </>
  );
}

