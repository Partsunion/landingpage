'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, TrendingDown, Clock, CheckCircle2, Factory } from 'lucide-react';
import { useState, useEffect } from 'react';

const suppliers = [
    { name: 'Lieferant A', price: 42.50, delivery: 'Morgen', stock: 'Hoch', best: true },
    { name: 'Lieferant B', price: 44.90, delivery: 'Heute (Express)', stock: 'Mittel', best: false },
    { name: 'Lieferant C', price: 43.10, delivery: '2-3 Tage', stock: 'Niedrig', best: false },
];

export function AutomatedOrderPreview() {
    return (
        <div className="w-full h-full bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col gap-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Factory size={120} />
            </div>

            <div className="z-10">
                <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
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
                            ? 'border-blue-200 bg-blue-50 shadow-md'
                            : 'border-slate-200 bg-white'}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <div className="font-bold text-xs text-slate-900">{s.name}</div>
                                <div className="text-[10px] text-slate-500">Lieferzeit: {s.delivery}</div>
                            </div>
                            <div className="text-right">
                                <div className={`font-bold text-sm ${s.best ? 'text-blue-600' : 'text-slate-600'}`}>{s.price.toFixed(2)} €</div>
                                <div className="text-[10px] text-slate-400">Netto</div>
                            </div>
                        </div>

                        {s.best && (
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-200">
                                <span className="text-[10px] font-bold text-blue-600 flex items-center gap-1">
                                    <TrendingDown size={12} /> Bester Preis
                                </span>
                                <button className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded font-bold shadow-sm hover:bg-blue-700 transition-colors">
                                    Jetzt Ordern
                                </button>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center gap-4 z-10 shadow-lg">
                <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center text-blue-400">
                    <Clock size={20} />
                </div>
                <div>
                    <div className="font-bold text-xs">Automatisierter Zeitplan</div>
                    <div className="text-[10px] opacity-60">Nächster Check: Täglich um 18:00 Uhr</div>
                </div>
                <div className="ml-auto">
                    <div className="h-2 w-12 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ width: ['0%', '100%'] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="h-full bg-blue-500"
                        ></motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
