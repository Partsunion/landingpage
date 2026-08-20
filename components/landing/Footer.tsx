'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Linkedin } from 'lucide-react';

const footerLinks = {
    platform: [
        { label: 'Die Plattform im Überblick', href: '/plattform' },
        { label: 'ERP für den Teilehandel', href: '/features/erp-autoteilehandel' },
        { label: 'Warenwirtschaft (WaWi)', href: '/features/warenwirtschaft-autoteilhandel' },
        { label: 'Digitale Anfragen', href: '/features/whatsapp-bot' },
        { label: 'OEM-Ermittlung', href: '/features/oem-ermittlung' },
        { label: 'Finanzen & Faktura', href: '/features/gobd-tse-zugferd-datev' },
        { label: 'B2B-Kundenportal', href: '/features/b2b-kundenportal-white-label' },
    ],
    product: [
        { label: 'Alle Module', href: '/features' },
        { label: 'Vergleich', href: '/vergleich' },
        { label: 'Business-Case-Rechner', href: '/pricing' },
        { label: 'Teileermittlung testen', href: '/live-demo' },
        { label: 'Sicherheit', href: '/#sicherheit' },
    ],
    company: [
        { label: 'Über uns', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Kontakt', href: '/contact' },
        { label: 'Beratungstermin', href: '/#beratung' },
    ],
    legal: [
        { label: 'Impressum', href: '/legal/impressum' },
        { label: 'Datenschutz', href: '/legal/datenschutz' },
        { label: 'AGB', href: '/legal/agb' },
        { label: 'Widerrufsrecht', href: '/legal/widerruf' },
    ],
};

export function Footer() {
    return (
        <footer className="relative border-t border-border bg-muted/30">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/logo-wordmark.png"
                                alt="Partsunion"
                                width={426}
                                height={126}
                                className="h-9 md:h-11 w-auto opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </Link>
                        <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                            Das spezialisierte Enterprise-ERP für den Autoteilehandel — von der
                            Teileidentifikation bis zu Lager, Belegfluss und Finanzen.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm">
                            <a href="mailto:info@partsunion.de" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="h-4 w-4" />
                                info@partsunion.de
                            </a>
                            <a
                                href="https://www.linkedin.com/company/partsunion"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Linkedin className="h-4 w-4" />
                                Partsunion auf LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Plattform</h4>
                        <ul className="space-y-3">
                            {footerLinks.platform.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Produkt</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Unternehmen</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Rechtliches</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Partsunion. Alle Rechte vorbehalten.
                    </p>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Made in Germany</span>
                    </div>
                </div>
            </div>
            {/* Mobile clearance so the fixed Sticky-CTA never covers footer content. */}
            <div aria-hidden className="h-20 md:hidden" />
        </footer>
    );
}
