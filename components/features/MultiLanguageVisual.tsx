'use client';

import { motion } from 'framer-motion';
import { Mic, MessageSquare, CheckCircle2, Globe, Languages } from 'lucide-react';

const messages = [
    { input: '"Ich brauch Bremsklötze für nen Golf"', lang: 'DE · Slang', parsed: 'Bremsbelagsatz VA · VW Golf VII', icon: Mic, delay: 0.3, accent: 'from-[#EAF1FD] to-transparent' },
    { input: '"brake pads audi a4 2019"', lang: 'EN', parsed: 'Bremsbelagsatz · Audi A4 B9', icon: MessageSquare, delay: 0.7, accent: 'from-[#F1EDFC] to-transparent' },
    { input: '"Fren balatası Mercedes C serisi"', lang: 'TR', parsed: 'Bremsbelagsatz · Mercedes C-Klasse', icon: Mic, delay: 1.1, accent: 'from-[#FFFAEB] to-transparent' },
    { input: '"klocki hamulcowe bmw 3"', lang: 'PL', parsed: 'Bremsbelagsatz · BMW 3er', icon: MessageSquare, delay: 1.5, accent: 'from-[#ECFDF3] to-transparent' },
];

export function MultiLanguageVisual() {
    return (
        <div className="relative w-full flex items-center justify-center py-4">
            <div className="w-full max-w-sm space-y-2 md:space-y-3">
                {/* Header */}
                <motion.div
                    className="flex items-center justify-center gap-2 mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                        <Languages className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-semibold text-foreground">Sprach-KI aktiv</span>
                </motion.div>

                {/* Message Cards */}
                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        className={`glass border border-border rounded-xl p-2.5 md:p-3 bg-gradient-to-r ${msg.accent}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: msg.delay, duration: 0.4 }}
                    >
                        <div className="flex items-start gap-2">
                            <div className="h-6 w-6 rounded-md bg-card border border-border flex items-center justify-center shrink-0 mt-0.5">
                                <msg.icon className="h-3 w-3 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-[9px] md:text-[10px] text-muted-foreground truncate">{msg.input}</span>
                                    <span className="text-[8px] bg-muted border border-border text-muted-foreground px-1.5 py-0.5 rounded font-mono shrink-0">{msg.lang}</span>
                                </div>
                                <motion.div
                                    className="flex items-center gap-1.5"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: msg.delay + 0.5 }}
                                >
                                    <span className="text-[9px] md:text-[10px] text-[#067647] font-medium">→ {msg.parsed}</span>
                                </motion.div>
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: msg.delay + 0.7, type: 'spring' }}
                            >
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#12B76A] shrink-0" />
                            </motion.div>
                        </div>
                    </motion.div>
                ))}

                {/* Bottom Badge */}
                <motion.div
                    className="flex items-center justify-center gap-2 pt-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.5 }}
                >
                    <Globe className="h-3 w-3 text-primary" />
                    <span className="text-xs text-primary font-medium">5 Sprachen · DE·EN·TR·KU·PL · Sprachnachrichten</span>
                </motion.div>
            </div>
        </div>
    );
}
