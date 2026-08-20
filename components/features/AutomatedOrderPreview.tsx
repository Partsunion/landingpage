'use client';

import { motion } from 'framer-motion';
import { TrendingDown, Clock, Factory } from 'lucide-react';

const suppliers = [
    { name: 'Lieferant A', price: 42.50, delivery: 'Morgen', stock: 'Hoch', best: true },
    { name: 'Lieferant B', price: 44.90, delivery: 'Heute (Express)', stock: 'Mittel', best: false },
    { name: 'Lieferant C', price: 43.10, delivery: '2-3 Tage', stock: 'Niedrig', best: false },
];

export function AutomatedOrderPreview() {
    return (
        <div className="w-full h-full bg-card rounded-2xl border border-border p-6 flex flex-col gap-6 shadow-[var(--shadow-card)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Factory size={120} />
            </div>

            <div className="z-10">
                <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <h3 className="font-bold text-sm text-slate-900">Bestellvorschlag: Brembo Kit</h3>
                </div>
                <p className="text-xs text-slate-500">System hat Meldebestand (2) unterschritten. Preisvergleich läuft...</p>
            </div>

            <div className="space-y-3 z-10 flex-1">
                {suppliers.map((s, i) => (
                    <motion.div
                        key={s.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-4 rounded-xl border transition-all ${s.best
                            ? 'border-primary/25 bg-accent shadow-[var(--shadow-card-hover)]'
                            : 'border-border bg-white'}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <div className="font-bold text-xs text-slate-900">{s.name}</div>
                                <div className="text-[10px] text-slate-500">Lieferzeit: {s.delivery}</div>
                            </div>
                            <div className="text-right">
                                <div className={`font-bold text-sm ${s.best ? 'text-primary' : 'text-slate-600'}`}>{s.price.toFixed(2)} €</div>
                                <div className="text-[10px] text-slate-400">Netto</div>
                            </div>
                        </div>

                        {s.best && (
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary/20">
                                <span className="text-[10px] font-bold text-primary flex items-center gap-1">
                                    <TrendingDown size={12} /> Bester Preis
                                </span>
                                <button className="bg-primary text-primary-foreground text-[10px] px-3 py-1 rounded font-bold shadow-sm hover:bg-primary-hover transition-colors">
                                    Jetzt Ordern
                                </button>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <div className="bg-muted border border-border text-foreground p-4 rounded-xl flex items-center gap-4 z-10">
                <div className="h-10 w-10 bg-accent border border-primary/15 rounded-full flex items-center justify-center text-primary">
                    <Clock size={20} />
                </div>
                <div>
                    <div className="font-bold text-xs">Automatisierter Zeitplan</div>
                    <div className="text-[10px] text-muted-foreground">Nächster Check: Täglich um 18:00 Uhr</div>
                </div>
                <div className="ml-auto">
                    <div className="h-2 w-12 bg-[#E5EAF1] rounded-full overflow-hidden">
                        <motion.div
                            animate={{ width: ['0%', '100%'] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="h-full bg-primary"
                        ></motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
