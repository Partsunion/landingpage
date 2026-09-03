'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Headphones, ListChecks, Settings2, UsersRound } from 'lucide-react';
import { useHydrationSafeReducedMotion } from '@/components/motion/useHydrationSafeReducedMotion';

const steps = [
    { number: '01', title: 'Ablauf verstehen', text: 'Wir gehen einen echten Arbeitsprozess aus deinem Betrieb gemeinsam durch.', icon: ListChecks },
    { number: '02', title: 'System einrichten', text: 'Arbeitsbereiche, Rollen und vorhandene Daten werden passend vorbereitet.', icon: Settings2 },
    { number: '03', title: 'Mitarbeiter mitnehmen', text: 'Theke, Lager und Büro lernen die Schritte, die sie wirklich brauchen.', icon: UsersRound },
    { number: '04', title: 'Gemeinsam starten', text: 'Beim Start und im Tagesgeschäft gibt es einen festen Ansprechpartner.', icon: Headphones },
];

export function ImplementationPath() {
    const reducedMotion = useHydrationSafeReducedMotion();

    return (
        <section id="einfuehrung" className="scroll-mt-24 border-y border-[#d8e1eb] bg-[#f5f8fc] py-14 md:py-20">
            <div className="mx-auto max-w-[1320px] px-5 md:px-8 xl:px-10">
                <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr] lg:items-end lg:gap-14">
                    <div>
                        <div className="text-[9px] font-bold uppercase tracking-[.16em] text-[#1c6dd8]">Einführung im Betrieb</div>
                        <h2 className="mt-3 text-[clamp(2rem,3vw,2.85rem)] font-semibold leading-[1.08] tracking-[-.043em] text-[#132036]">Gemeinsam einführen. Schritt für Schritt.</h2>
                    </div>
                    <p className="max-w-2xl text-[15px] leading-7 text-[#627084] lg:justify-self-end">Partsunion muss zu deinem Betrieb passen. Deshalb beginnt die Einführung nicht mit einer allgemeinen Präsentation, sondern mit den tatsächlichen Abläufen an Theke, Lager und im Büro.</p>
                </div>

                <ol className="relative mt-9 grid border border-[#bcc9d7] bg-white md:grid-cols-2 lg:grid-cols-4">
                    <motion.span
                        aria-hidden
                        initial={{ scaleX: reducedMotion ? 1 : 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: reducedMotion ? 0 : .9 }}
                        className="absolute inset-x-0 top-0 h-1 origin-left bg-[#1d6fe8]"
                    />
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.li
                                key={step.number}
                                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: reducedMotion ? 0 : .32, delay: reducedMotion ? 0 : index * .07 }}
                                className={`flex gap-4 p-4 md:p-6 lg:block lg:min-h-[190px] ${index > 0 ? 'border-t border-[#dbe2ea] md:border-t-0' : ''} ${index % 2 === 1 ? 'md:border-l' : ''} ${index > 1 ? 'md:border-t lg:border-t-0' : ''} ${index > 0 ? 'lg:border-l' : ''}`}
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#b5c7dc] bg-[#edf4fd] text-[#1d6fe8] lg:h-auto lg:w-auto lg:justify-between lg:border-0 lg:bg-transparent"><span className="font-mono text-[9px] font-bold">{step.number}</span><Icon className="hidden h-4 w-4 text-[#607895] lg:block" /></div>
                                <div><strong className="block text-[15px] font-semibold tracking-[-.025em] text-[#18263a] lg:mt-7 lg:text-[17px]">{step.title}</strong><p className="mt-1.5 text-[11px] leading-5 text-[#697688] lg:mt-3 lg:text-[12px]">{step.text}</p></div>
                            </motion.li>
                        );
                    })}
                </ol>

                <div className="mt-6 flex flex-col gap-3 border-t border-[#ced8e3] pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[12px] leading-5 text-[#667487]">Du musst nicht alle Arbeitsbereiche auf einmal einführen.</p>
                    <Link href="/beratung" className="inline-flex items-center gap-2 text-sm font-semibold text-[#155fc8]">Eigenen Start gemeinsam planen <ArrowRight className="h-4 w-4" /></Link>
                </div>
            </div>
        </section>
    );
}
