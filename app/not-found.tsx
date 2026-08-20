import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Search } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Seite nicht gefunden',
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-20">
            <div className="text-center max-w-xl">
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full glass text-sm font-medium text-primary mb-6">
                    <Search className="h-3.5 w-3.5" />
                    Fehler 404
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                    Seite <span className="text-gradient">nicht gefunden</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-10">
                    Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 h-12 px-6 text-base font-medium gradient-primary text-primary-foreground rounded-xl shadow-[0_8px_20px_-6px_rgba(29,111,232,0.45)] hover:opacity-90 transition-opacity"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Zur Startseite
                    </Link>
                    <Link
                        href="/features"
                        className="inline-flex items-center justify-center h-12 px-6 text-base font-medium rounded-xl border border-border hover:border-primary/50 transition-colors"
                    >
                        Features ansehen
                    </Link>
                </div>
            </div>
        </div>
    );
}
