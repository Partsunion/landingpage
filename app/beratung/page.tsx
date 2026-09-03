import type { Metadata } from 'next';
import { FinalCTA } from '@/components/landing/FinalCTA';

export const metadata: Metadata = {
    title: 'Beratungstermin für Partsunion vereinbaren',
    description: 'Zeig uns deinen echten Arbeitsprozess. Wir prüfen gemeinsam, wie Partsunion Anfrage, OE-Ermittlung, Warenwirtschaft, Bestellung, Retoure, Reklamation und Finanzen in deinem Betrieb verbindet.',
    alternates: { canonical: '/beratung' },
};

export default function ConsultationPage() {
    return <div className="bg-white pt-[72px]"><div className="border-b border-[#d9e2ec] bg-[#f5f8fc] py-10 text-center md:py-14"><span className="text-[9px] font-bold uppercase tracking-[.16em] text-[#1d6fe8]">Unverbindlich & konkret</span><h1 className="mx-auto mt-3 max-w-3xl px-5 text-[clamp(2rem,3.6vw,3.6rem)] font-semibold leading-[1.04] tracking-[-.046em] text-[#101a2b]">Lass uns deinen echten Arbeitsprozess ansehen.</h1><p className="mx-auto mt-4 max-w-2xl px-5 text-sm leading-6 text-[#657285]">Kein Preispaket von der Stange. Wir starten bei deinem Ablauf und klären gemeinsam, welche Partsunion-Lösungen sinnvoll sind.</p></div><FinalCTA /></div>;
}
