'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

// Stable deterministic hex strings so the component stays pure and server-
// side rendering does not mismatch client-side hydration. The values look
// random but are picked at build time and never change.
const HEX_ROWS = [
    'a4f1c2',
    '7b3e91',
    'd2c584',
    '1e9f7a',
    '6a2b4c',
    'f08d15',
    '3c7e22',
    'b9145f',
    '4d6a88',
    '2ec931',
];

export function OCRScannerPreview() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((s) => (s + 1) % 4);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-full bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden relative font-mono text-xs">
            {/* Camera View Overlay */}
            {/* Documentation Background */}
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-slate-100">
                {/* Mock Vehicle Registration Document */}
                <div className="w-[80%] h-[60%] bg-[#fdfbf7] border border-slate-300 shadow-xl rotate-[-2deg] p-4 relative overflow-hidden">
                    {/* Watermark/Pattern effect */}
                    <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#000_0,#000_1px,transparent_1px,transparent_10px)]" />

                    {/* Document Header */}
                    <div className="flex justify-between items-start mb-4 border-b border-green-800/20 pb-2">
                        <div className="text-[8px] uppercase font-bold text-green-900 tracking-wider">Zulassungsbescheinigung Teil I</div>
                        <div className="w-8 h-8 rounded-full border border-green-800/30 flex items-center justify-center text-[6px] text-green-800 font-serif">D</div>
                    </div>

                    {/* Document Fields */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[6px] font-serif text-slate-800 relative z-10">
                        <div className="space-y-1">
                            <div className="flex gap-1 items-baseline"><span className="font-bold w-3">B</span> <span className="font-mono bg-yellow-100/50 px-1">2016-08-14</span></div>
                            <div className="flex gap-1 items-baseline"><span className="font-bold w-3">2.1</span> <span className="font-mono bg-blue-100/50 px-1 border border-blue-200">0603</span></div>
                            <div className="flex gap-1 items-baseline"><span className="font-bold w-3">2.2</span> <span className="font-mono bg-blue-100/50 px-1 border border-blue-200">BKX</span></div>
                            <div className="flex gap-1 items-baseline"><span className="font-bold w-3">J</span> <span className="font-mono">M1</span></div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex gap-1 items-baseline"><span className="font-bold w-3">E</span> <span className="font-mono bg-green-100/50 px-1 border border-green-200">WVWZZZAUZGW...1293</span></div>
                            <div className="flex gap-1 items-baseline"><span className="font-bold w-3">D.1</span> <span className="font-mono">VOLKSWAGEN - VW</span></div>
                            <div className="flex gap-1 items-baseline"><span className="font-bold w-3">D.3</span> <span className="font-mono">GOLF VII VARIANT</span></div>
                            <div className="flex gap-1 items-baseline"><span className="font-bold w-3">P.1</span> <span className="font-mono">1968</span></div>
                        </div>
                    </div>

                    {/* Stamp/Seal simulation */}
                    <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full border-2 border-blue-200/50 opacity-50 rotate-12 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border border-blue-200/50" />
                    </div>
                </div>
            </div>

            {/* Scanning Frame */}
            <div className="absolute inset-12 border-2 border-slate-900/10 rounded-lg z-10">
                <motion.div
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20"
                />

                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-blue-600" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-blue-600" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-blue-600" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-blue-600" />
            </div>

            {/* Data Extraction Overlay */}
            <div className="absolute top-4 left-4 right-4 z-30 flex gap-2">
                <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-3 rounded-xl flex-1 shadow-sm">
                    <div className="text-blue-600 font-bold mb-2 flex items-center gap-2">
                        <Scan size={14} /> OCR ENGINE ACTIVE
                    </div>
                    <div className="space-y-1 text-slate-500">
                        <div className="flex justify-between">
                            <span>HSN/TSN:</span>
                            <motion.span animate={{ opacity: step >= 1 ? 1 : 0.3 }} className="text-slate-900 font-bold">0603 / BKX</motion.span>
                        </div>
                        <div className="flex justify-between">
                            <span>FIN/VIN:</span>
                            <motion.span animate={{ opacity: step >= 2 ? 1 : 0.3 }} className="text-slate-900 font-bold text-[10px]">WVWZZZAUZGW...1293</motion.span>
                        </div>
                        <div className="flex justify-between">
                            <span>BUILT:</span>
                            <motion.span animate={{ opacity: step >= 3 ? 1 : 0.3 }} className="text-slate-900 font-bold">2016-08-14</motion.span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Matching Result */}
            <AnimatePresence>
                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute bottom-4 left-4 right-4 z-40 bg-white border border-emerald-500/50 p-4 rounded-xl shadow-xl flex items-center gap-4"
                    >
                        <div className="h-10 w-10 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 text-sm">FAHRZEUG IDENTIFIZIERT</div>
                            <div className="text-[10px] text-slate-500">VW Golf VII Variant (BA5, BV5) 2.0 TDI</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Data Stream */}
            <div className="absolute bottom-4 left-4 h-24 overflow-hidden opacity-30 text-[8px] text-blue-900 pointer-events-none">
                <div className="animate-scroll-y">
                    {HEX_ROWS.map((hex, i) => (
                        <p key={i}>HEX_{hex}: FETCHING_METADATA_FROM_CATALOG_API...</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
