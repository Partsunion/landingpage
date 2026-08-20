'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Bot, CheckCircle2 } from 'lucide-react';

const chatBubbles = [
    { name: 'Anfrage 1', msg: 'Bremsen Golf VII', delay: 0.3 },
    { name: 'Anfrage 2', msg: 'Turbolader A4 TDI', delay: 0.6 },
    { name: 'Anfrage 3', msg: 'Ölfilter BMW 320d', delay: 0.9 },
    { name: 'Anfrage 4', msg: 'Kupplung Passat', delay: 1.2 },
    { name: 'Anfrage 5', msg: 'Stoßdämpfer Audi', delay: 1.5 },
];

export function ScalabilityVisual() {
    return (
        <div className="relative w-full flex flex-col items-center justify-center gap-4 py-4">
            {/* Central AI Bot */}
            <motion.div
                className="relative z-20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            >
                <div className="relative h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)]">
                    <Bot className="h-7 w-7 text-primary-foreground" />
                </div>
            </motion.div>

            {/* Chat Queue */}
            <div className="w-full max-w-xs space-y-2">
                {chatBubbles.map((bubble, i) => (
                    <motion.div
                        key={i}
                        className="glass border border-border rounded-lg p-2.5 flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: bubble.delay, duration: 0.4 }}
                    >
                        <div className="h-7 w-7 rounded-full border border-primary/15 bg-accent flex items-center justify-center shrink-0">
                            <MessageSquare className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-[10px] md:text-xs text-muted-foreground truncate block">{bubble.msg}</span>
                        </div>
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: bubble.delay + 0.6, type: 'spring' }}
                        >
                            <CheckCircle2 className="h-4 w-4 text-[#12B76A] shrink-0" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Counter Badge */}
            <motion.div
                className="glass p-2.5 rounded-xl border border-[#12B76A]/30 shadow-[var(--shadow-card)]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.2, duration: 0.4 }}
            >
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#12B76A] animate-pulse" />
                    <span className="text-xs text-[#067647] font-medium">Alle 5 gleichzeitig bearbeitet • 0 Wartezeit</span>
                </div>
            </motion.div>
        </div>
    );
}
