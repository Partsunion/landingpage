'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Menu, X, ChevronDown, LogIn, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { featureData, getValuePropositions, getCoreFeatures } from '@/lib/feature-data';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isFeatureMenuOpen, setIsFeatureMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    // Only show top 6 features in dropdown (3 value props + 3 core)
    const valueProps = getValuePropositions().slice(0, 3);
    const coreFeatures = getCoreFeatures().slice(0, 3);

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
        ? (isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent')
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
                            src="/logo.png"
                            alt="Partsunion"
                            width={160}
                            height={48}
                            className="h-9 md:h-10 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
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
                                Features <ChevronDown className="h-4 w-4" aria-hidden="true" />
                            </Link>

                            {/* Dropdown Menu */}
                            <div role="menu" aria-label="Features Untermenü" className={cn(
                                "absolute top-full left-0 w-72 glass border border-border rounded-xl shadow-xl p-3 transition-all duration-200 transform origin-top-left",
                                isFeatureMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                            )}>
                                {/* Value Props */}
                                <div className="mb-2">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-1">Vorteile</div>
                                    {valueProps.map(feature => {
                                        const Icon = feature.icon;
                                        return (
                                            <Link
                                                key={feature.slug}
                                                href={`/features/${feature.slug}`}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="p-1.5 bg-accent/10 rounded-md text-accent">
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <span className="text-sm font-medium">{feature.title}</span>
                                            </Link>
                                        )
                                    })}
                                </div>

                                <div className="border-t border-border pt-2">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-1">Core Features</div>
                                    {coreFeatures.map(feature => {
                                        const Icon = feature.icon;
                                        return (
                                            <Link
                                                key={feature.slug}
                                                href={`/features/${feature.slug}`}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <span className="text-sm font-medium">{feature.title}</span>
                                            </Link>
                                        )
                                    })}
                                </div>

                                <Link
                                    href="/features"
                                    className="block mt-2 p-3 text-center text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                >
                                    Alle Features ansehen →
                                </Link>
                            </div>
                        </div>

                        <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            Über uns
                        </Link>
                        <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            Kontakt
                        </Link>
                        <Link href="/live-demo" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors flex items-center gap-1">
                            <Sparkles className="h-3.5 w-3.5" />
                            Live Demo
                        </Link>

                        {/* Login Button */}
                        <a href="https://app.partsunion.de/auth" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                            <LogIn className="h-4 w-4" />
                            Login
                        </a>

                        <Link href="/#beratung">
                            <Button variant="primary" size="sm" className="gradient-primary shadow-md shadow-primary/20">
                                Beratung vereinbaren
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground"
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
                <div id="mobile-menu" role="navigation" aria-label="Mobile Navigation" className="md:hidden glass border-b border-border p-4 max-h-[80vh] overflow-y-auto shadow-2xl">
                    <div className="flex flex-col gap-4">
                        <div className="font-bold text-primary mb-2">Features</div>
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
                                Alle Features →
                            </Link>
                        </div>

                        <div className="font-bold text-primary mt-2">Menü</div>
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
                        <Link
                            href="/live-demo"
                            className="text-sm font-medium text-primary hover:text-primary-hover flex items-center gap-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Sparkles className="h-4 w-4" />
                            Live Demo
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
                            <Button className="w-full mt-4 gradient-primary">Beratung vereinbaren</Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
