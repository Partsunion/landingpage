'use client';

import { motion } from 'framer-motion';
import { Moon, Sun, MessageSquare, CheckCircle2 } from 'lucide-react';

const timeSlots = [
    { time: '03:12', period: 'AM', icon: Moon, msg: 'Bremsen für Golf VII?', reply: 'Hier Ihr Angebot: 145,90€', bgAccent: 'from-[#EAF1FD] to-transparent' },
    { time: '06:45', period: 'AM', icon: Sun, msg: 'Turbolader A4 2.0 TDI', reply: '3 Angebote erstellt ✓', bgAccent: 'from-[#FFFAEB] to-transparent' },
    { time: '23:58', period: 'PM', icon: Moon, msg: 'Kupplung Mercedes C220', reply: 'OEM gefunden: A2112500..', bgAccent: 'from-[#EAF1FD] to-transparent' },
];

export function TwentyFourSevenVisual() {
    return (
        <div className="relative w-full flex items-center justify-center py-4">
            {/* Timeline */}
            <div className="relative w-full max-w-sm space-y-3 md:space-y-4">
                {timeSlots.map((slot, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.4 + 0.3, duration: 0.5 }}
                        className={`relative glass border border-border rounded-xl p-3 md:p-4 bg-gradient-to-r ${slot.bgAccent}`}
                    >
                        {/* Time Badge */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg bg-card border border-border flex items-center justify-center">
                                    <slot.icon className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                                </div>
                                <div>
                                    <span className="text-sm md:text-base font-bold text-foreground font-mono">{slot.time}</span>
                                    <span className="text-[10px] text-muted-foreground ml-1">{slot.period}</span>
                                </div>
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.4 + 0.8, type: 'spring' }}
                            >
                                <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-[#D1FADF] flex items-center justify-center">
                                    <CheckCircle2 className="h-3 w-3 md:h-3.5 md:w-3.5 text-[#067647]" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Chat Flow */}
                        <div className="flex items-start gap-2">
                            <MessageSquare className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] md:text-xs text-muted-foreground truncate">&quot;{slot.msg}&quot;</p>
                                <motion.p
                                    className="text-[10px] md:text-xs text-[#067647] font-medium mt-0.5"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.4 + 1.0 }}
                                >
                                    → {slot.reply}
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Pulsing Online Badge */}
                <motion.div
                    className="flex items-center justify-center gap-2 pt-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2 }}
                >
                    <div className="h-2 w-2 rounded-full bg-[#12B76A] animate-pulse" />
                    <span className="text-xs text-[#067647] font-medium">Rund um die Uhr · 24/7</span>
                </motion.div>
            </div>
        </div>
    );
}
