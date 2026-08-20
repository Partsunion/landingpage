'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Menu, X, ChevronDown, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getValuePropositions, getCoreFeatures } from '@/lib/feature-data';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isFeatureMenuOpen, setIsFeatureMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    // Mega-menu shows ALL features, grouped into Vorteile + Module/Funktionen.
    const valueProps = getValuePropositions();
    const coreFeatures = getCoreFeatures();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdowns on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsFeatureMenuOpen(false);
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const navBackground = isHomePage
        ? (isScrolled ? 'bg-background/85 backdrop-blur-md border-b border-border shadow-[0_1px_2px_rgba(16,24,40,0.04)]' : 'bg-transparent')
        : 'bg-background/95 backdrop-blur-md border-b border-border';

    return (
        <nav
            aria-label="Hauptnavigation"
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                navBackground
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-20 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo-wordmark.png"
                            alt="Partsunion — ERP & Warenwirtschaft für den Autoteilehandel"
                            width={426}
                            height={126}
                            className="h-9 md:h-11 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        {/* Dropdown for Features */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setIsFeatureMenuOpen(true)}
                            onMouseLeave={() => setIsFeatureMenuOpen(false)}
                            onFocus={() => setIsFeatureMenuOpen(true)}
                            onBlur={(e) => {
                                if (!e.currentTarget.contains(e.relatedTarget)) setIsFeatureMenuOpen(false);
                            }}
                        >
                            <Link
                                href="/features"
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 py-4"
                                aria-expanded={isFeatureMenuOpen}
                                aria-haspopup="true"
                            >
                                Module <ChevronDown className="h-4 w-4" aria-hidden="true" />
                            </Link>

                            {/* Mega-Menu — alle Features, zwei Spalten */}
                            <div role="menu" aria-label="Module Untermenü" className={cn(
                                "absolute top-full left-0 w-[680px] bg-card border border-border rounded-2xl shadow-[var(--shadow-raised)] p-5 transition-all duration-200 transform origin-top-left",
                                isFeatureMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                            )}>
                                <div className="grid grid-cols-2 gap-x-5 gap-y-1">
                                    {/* Vorteile */}
                                    <div>
                                        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.14em] px-2.5 pb-2">
                                            Vorteile
                                        </div>
                                        <div className="space-y-0.5">
                                            {valueProps.map(feature => {
                                                const Icon = feature.icon;
                                                return (
                                                    <Link
                                                        key={feature.slug}
                                                        href={`/features/${feature.slug}`}
                                                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-muted transition-colors group/item"
                                                    >
                                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary/15 bg-accent text-primary">
                                                            <Icon className="h-3.5 w-3.5" />
                                                        </span>
                                                        <span className="text-sm font-medium text-foreground/90 group-hover/item:text-foreground leading-tight">{feature.title}</span>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Module & Funktionen */}
                                    <div>
                                        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.14em] px-2.5 pb-2">
                                            Module &amp; Funktionen
                                        </div>
                                        <div className="space-y-0.5">
                                            {coreFeatures.map(feature => {
                                                const Icon = feature.icon;
                                                return (
                                                    <Link
                                                        key={feature.slug}
                                                        href={`/features/${feature.slug}`}
                                                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-muted transition-colors group/item"
                                                    >
                                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary/15 bg-accent text-primary">
                                                            <Icon className="h-3.5 w-3.5" />
                                                        </span>
                                                        <span className="text-sm font-medium text-foreground/90 group-hover/item:text-foreground leading-tight">{feature.title}</span>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
                                    <div className="flex items-center gap-4">
                                        <Link href="/plattform" className="px-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                            Plattform-Überblick
                                        </Link>
                                        <Link href="/vergleich" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                            Vergleich
                                        </Link>
                                    </div>
                                    <Link
                                        href="/features"
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary-hover px-4 py-2 text-sm font-medium text-primary-foreground transition-colors"
                                    >
                                        Alle Module ansehen →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link href="/plattform" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            Plattform
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            Über uns
                        </Link>
                        <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            Kontakt
                        </Link>
                        {/* Login Button */}
                        <a href="https://app.partsunion.de/auth" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                            <LogIn className="h-4 w-4" />
                            Login
                        </a>

                        <Link href="/#beratung">
                            <Button variant="primary" size="sm">
                                Beratung vereinbaren
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2.5 -mr-1 text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div id="mobile-menu" role="navigation" aria-label="Mobile Navigation" className="lg:hidden bg-card border-b border-border p-4 max-h-[80vh] overflow-y-auto shadow-[var(--shadow-raised)]">
                    <div className="flex flex-col gap-4">
                            <div className="font-semibold text-primary mb-2">Module</div>
                        <div className="pl-4 border-l-2 border-primary/20 flex flex-col gap-3">
                            {[...valueProps, ...coreFeatures].map(feature => (
                                <Link
                                    key={feature.slug}
                                    href={`/features/${feature.slug}`}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {feature.title}
                                </Link>
                            ))}
                            <Link
                                href="/features"
                                className="text-sm font-medium text-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Alle Module →
                            </Link>
                        </div>

                        <div className="font-semibold text-primary mt-2">Menü</div>
                        <Link
                            href="/plattform"
                            className="text-sm font-medium text-foreground hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Plattform
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium text-foreground hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Über uns
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium text-foreground hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Kontakt
                        </Link>
                        <a
                            href="https://app.partsunion.de/auth"
                            className="text-sm font-medium text-foreground hover:text-primary flex items-center gap-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <LogIn className="h-4 w-4" />
                            Login
                        </a>
                        <Link href="/#beratung" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button className="w-full mt-4">Beratung vereinbaren</Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
