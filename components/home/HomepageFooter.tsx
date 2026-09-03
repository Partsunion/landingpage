import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';

const groups = [
    {
        title: 'Produkt',
        links: [
            { label: 'Alle Lösungen', href: '/loesungen' },
            { label: 'Anfrage & WhatsApp', href: '/loesungen/anfragen-whatsapp' },
            { label: 'OE-Ermittlung', href: '/loesungen/oe-ermittlung' },
            { label: 'Betriebsassistent', href: '/loesungen/betriebsassistent' },
            { label: 'Desktop-App', href: '/download' },
        ],
    },
    {
        title: 'Unternehmen',
        links: [
            { label: 'Über uns', href: '/about' },
            { label: 'Blog & Wissen', href: '/blog' },
            { label: 'Kontakt', href: '/contact' },
            { label: 'Login', href: 'https://app.partsunion.de/auth' },
        ],
    },
    {
        title: 'Rechtliches',
        links: [
            { label: 'Impressum', href: '/legal/impressum' },
            { label: 'Datenschutz', href: '/legal/datenschutz' },
            { label: 'AGB', href: '/legal/agb' },
            { label: 'Widerruf', href: '/legal/widerruf' },
        ],
    },
];

export function HomepageFooter() {
    return (
        <footer className="border-t border-white/10 bg-[#071426] text-white">
            <div className="mx-auto max-w-[1420px] px-5 md:px-8 xl:px-10">
                <div className="grid gap-7 py-7 md:gap-10 md:py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
                    <div>
                        <Link href="/" className="inline-block"><Image src="/logo-wordmark.png" alt="Partsunion" width={426} height={126} className="h-7 w-auto brightness-0 invert" /></Link>
                        <p className="mt-3 max-w-md text-xs leading-5 text-white/64 md:mt-5 md:text-sm md:leading-6">Branchenspezifische Warenwirtschaft für Autoteilehandel und Werkstattbetriebe – von Anfrage und Teileprüfung bis Warenfluss und Beleg.</p>
                        <div className="mt-3 text-xs text-white/68 sm:mt-5"><a href="mailto:info@partsunion.de" className="flex items-center gap-2 hover:text-white"><Mail className="h-3.5 w-3.5" /> info@partsunion.de</a></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 sm:gap-8">
                        {groups.map((group) => <div key={group.title}><h3 className="text-[9px] font-bold uppercase tracking-[.1em] text-white/46 sm:text-[10px] sm:tracking-[.13em]">{group.title}</h3><ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">{group.links.map((link) => <li key={link.href}><Link href={link.href} className="text-[10px] leading-4 text-white/68 transition hover:text-white sm:text-xs">{link.label}</Link></li>)}</ul></div>)}
                    </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-white/10 py-5 text-[9px] uppercase tracking-[.12em] text-white/25 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Partsunion</span><span>Für Autoteilehandel gebaut</span></div>
            </div>
        </footer>
    );
}
