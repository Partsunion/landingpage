'use client';

import { motion } from 'framer-motion';
import { Bot, Users, MessageSquare, FileText, Search, HeartHandshake, TrendingDown } from 'lucide-react';

const automatedTasks = [
    { icon: MessageSquare, label: 'Anfragen beantworten', pct: 95 },
    { icon: Search, label: 'OEM-Ermittlung', pct: 90 },
    { icon: FileText, label: 'Angebotserstellung', pct: 85 },
];

const humanFocus = [
    { icon: HeartHandshake, label: 'Persönliche Beratung' },
    { icon: Users, label: 'Kundenbeziehungen' },
];

export function TeamReliefVisual() {
    return (
        <div className="relative w-full flex items-center justify-center py-4">
            <div className="w-full max-w-sm space-y-3 md:space-y-4">
                {/* AI Automated Section */}
                <motion.div
                    className="glass border border-border rounded-xl p-3 md:p-4"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-6 w-6 rounded-md gradient-primary flex items-center justify-center">
                            <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                        </div>
                        <span className="text-xs font-bold text-foreground">KI übernimmt</span>
                    </div>
                    <div className="space-y-2.5">
                        {automatedTasks.map((task, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 + 0.3 }}
                            >
                                <div className="flex items-center justify-between text-[10px] md:text-xs mb-1">
                                    <div className="flex items-center gap-2">
                                        <task.icon className="h-3 w-3 text-primary" />
                                        <span className="text-muted-foreground">{task.label}</span>
                                    </div>
                                    <span className="text-primary font-mono font-medium">{task.pct}%</span>
                                </div>
                                <div className="h-1.5 bg-[#E5EAF1] rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#1D6FE8] to-[#4F93FF] rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${task.pct}%` }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2 + 0.6, duration: 0.8 }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Human Focus Section */}
                <motion.div
                    className="glass border border-[#12B76A]/30 rounded-xl p-3 md:p-4 bg-gradient-to-r from-[#ECFDF3] to-transparent"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-6 w-6 rounded-md bg-[#12B76A] flex items-center justify-center">
                            <Users className="h-3.5 w-3.5 text-primary-foreground" />
                        </div>
                        <span className="text-xs font-bold text-foreground">Ihr Team fokussiert auf</span>
                    </div>
                    <div className="flex gap-2">
                        {humanFocus.map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex-1 flex items-center gap-2 bg-[#ECFDF3] border border-[#12B76A]/20 rounded-lg p-2.5"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 + 1.5, type: 'spring' }}
                            >
                                <item.icon className="h-4 w-4 text-[#067647] shrink-0" />
                                <span className="text-[9px] md:text-[10px] text-[#067647] font-medium">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Workload Reduction Badge */}
                <motion.div
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2 }}
                >
                    <TrendingDown className="h-3.5 w-3.5 text-[#067647]" />
                    <span className="text-xs text-[#067647] font-medium">80% weniger Routinearbeit</span>
                </motion.div>
            </div>
        </div>
    );
}
