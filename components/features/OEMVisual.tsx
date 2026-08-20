'use client';

import { motion } from 'framer-motion';
import { Search, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';

const sources = [
    { label: 'Datenbank 1', confidence: 98 },
    { label: 'Datenbank 2', confidence: 95 },
    { label: 'Datenbank 3', confidence: 92 },
    { label: 'Datenbank 4', confidence: 88 },
];

export function OEMVisual() {
    return (
        <div className="relative w-full flex items-center justify-center py-4">
            <div className="w-full max-w-sm space-y-3 md:space-y-4">
                {/* Input Card */}
                <motion.div
                    className="bg-card border border-border rounded-xl p-3 md:p-4 shadow-[var(--shadow-card)]"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Search className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium text-foreground">OEM-Ermittlung</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono">
                            Bremssattel · Audi A4 · 2019
                        </div>
                        <motion.div
                            className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: 1, ease: 'linear' }}
                        >
                            <Cpu className="h-4 w-4 text-primary-foreground" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Multi-Source Scan */}
                <div className="space-y-2">
                    {sources.map((source, i) => (
                        <motion.div
                            key={i}
                            className="bg-card border border-border rounded-lg p-2.5 md:p-3 flex items-center gap-3 shadow-[var(--shadow-card)]"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 + 0.5, duration: 0.4 }}
                        >
                            <div className="h-8 w-8 rounded-lg border border-primary/15 bg-accent flex items-center justify-center shrink-0">
                                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] md:text-xs font-medium text-foreground">{source.label}</span>
                                    <span className="text-[10px] md:text-xs text-[#067647] font-mono">{source.confidence}%</span>
                                </div>
                                <div className="h-1.5 bg-[#E5EAF1] rounded-full mt-1 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#1D6FE8] to-[#4F93FF] rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${source.confidence}%` }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2 + 0.8, duration: 0.6 }}
                                    />
                                </div>
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 + 1.2, type: 'spring' }}
                            >
                                <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Result */}
                <motion.div
                    className="bg-card border border-[#12B76A]/30 rounded-xl p-3 md:p-4 bg-gradient-to-r from-[#ECFDF3] to-transparent shadow-[var(--shadow-card)]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.8, duration: 0.4 }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-[10px] text-[#067647] font-medium mb-1">✓ OEM kreuzvalidiert</div>
                            <div className="text-sm md:text-base font-bold text-foreground font-mono">8K0615123F</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-muted-foreground">Konfidenz</div>
                            <div className="text-lg font-bold text-[#067647]">98%</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
