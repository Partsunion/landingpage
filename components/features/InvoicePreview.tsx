'use client';

import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

export function InvoicePreview() {
    return (
        <div className="w-full h-full bg-card rounded-2xl border border-border overflow-hidden flex flex-col shadow-[var(--shadow-raised)]">
            {/* Header / Toolbar */}
            <div className="bg-white border-b border-border p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                        <FileText size={18} />
                    </div>
                    <span className="font-bold text-sm text-slate-900">Rechnungs-Designer</span>
                </div>
                <div className="flex gap-2">
                    <div className="flex bg-slate-100 rounded-md p-1 gap-1">
                        <button className="px-3 py-1 text-xs font-medium bg-white text-slate-900 shadow-sm rounded border border-slate-200">Clean</button>
                        <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900">Classic</button>
                        <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900">Modern</button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-1/3 border-r border-border p-4 space-y-6 hidden md:block bg-white">
                    <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500 mb-2 block">Logo Position</label>
                        <div className="grid grid-cols-3 gap-1">
                            <div className="h-8 border border-primary bg-accent text-primary rounded flex items-center justify-center text-[10px] font-medium">Links</div>
                            <div className="h-8 border border-slate-200 text-slate-500 rounded flex items-center justify-center text-[10px] font-medium hover:bg-slate-50">Mitte</div>
                            <div className="h-8 border border-slate-200 text-slate-500 rounded flex items-center justify-center text-[10px] font-medium hover:bg-slate-50">Rechts</div>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500 mb-2 block">Primärfarbe</label>
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-primary shadow-sm" />
                            <div className="h-8 flex-1 border border-slate-200 rounded px-2 flex items-center text-[10px] font-mono text-slate-600">#1D6FE8</div>
                        </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-slate-100">
                        <div className="h-4 w-2/3 bg-slate-100 rounded" />
                        <div className="h-8 w-full border border-slate-200 rounded bg-slate-50" />
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 p-6 overflow-y-auto bg-muted">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white aspect-[1/1.4] w-full max-w-md mx-auto shadow-[var(--shadow-raised)] rounded-sm p-8 text-[10px] text-slate-800 relative overflow-hidden ring-1 ring-slate-900/5"
                    >
                        {/* A4 Paper feel */}
                        <div className="flex justify-between mb-12">
                            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">PU</div>
                            <div className="text-right">
                                <h2 className="text-lg font-bold text-slate-900 mb-1 uppercase tracking-tighter">Rechnung</h2>
                                <p className="text-slate-500">RE-2026-001</p>
                                <p className="text-slate-500">Datum: 07.01.2026</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="font-bold text-slate-900 mb-1">Empfänger:</p>
                            <p className="text-slate-600">Autohaus Meyer GmbH</p>
                            <p className="text-slate-600">Teilstraße 45</p>
                            <p className="text-slate-600">12345 Berlin</p>
                        </div>

                        {/* Table */}
                        <table className="w-full mb-8">
                            <thead>
                                <tr className="border-b-2 border-accent text-primary font-bold">
                                    <th className="text-left py-2">Position</th>
                                    <th className="text-center py-2">Menge</th>
                                    <th className="text-right py-2">Preis</th>
                                    <th className="text-right py-2">Gesamt</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                <tr>
                                    <td className="py-2 font-medium text-slate-900">Bremsscheibe Belüftet (VA)</td>
                                    <td className="text-center py-2">2</td>
                                    <td className="text-right py-2">89,90 €</td>
                                    <td className="text-right py-2 font-bold text-slate-900">179,80 €</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium text-slate-900">Bremsbelagsatz (VA)</td>
                                    <td className="text-center py-2">1</td>
                                    <td className="text-right py-2">45,00 €</td>
                                    <td className="text-right py-2 font-bold text-slate-900">45,00 €</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-end pt-4 border-t-2 border-slate-100">
                            <div className="w-32 space-y-1 text-slate-600">
                                <div className="flex justify-between">
                                    <span>Zwischensumme:</span>
                                    <span>224,80 €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>MwSt. (19%):</span>
                                    <span>42,71 €</span>
                                </div>
                                <div className="flex justify-between font-bold text-sm text-primary pt-2 border-t border-slate-100 mt-2">
                                    <span>Gesamt:</span>
                                    <span>267,51 €</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Decoration */}
                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary" />
                    </motion.div>
                </div>
            </div>

            {/* Footer / Actions */}
            <div className="bg-white border-t border-border p-3 flex justify-end gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
                    <Download size={14} /> Als PDF exportieren
                </button>
            </div>
        </div>
    );
}
