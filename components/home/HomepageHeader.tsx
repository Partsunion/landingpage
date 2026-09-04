'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Boxes,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  FileCheck2,
  Landmark,
  LayoutGrid,
  Menu,
  Monitor,
  MessageCircle,
  PackageCheck,
  ScanLine,
  ShoppingCart,
  Sparkles,
  Store,
  Users,
  X,
} from 'lucide-react';

const navigation = [
  {
    id: 'plattform',
    label: 'Plattform',
    heading: 'Ein System. Dein ganzer Teilehandel.',
    overview: { label: 'Plattform entdecken', href: '/plattform' },
    columns: [
      {
        label: 'Automatisierung & Assistenz',
        links: [
          {
            title: 'Automatische OE-Ermittlung',
            text: 'Fahrzeugschein auslesen. VIN decodieren.',
            href: '/loesungen/oe-ermittlung',
            icon: ScanLine,
          },
          {
            title: 'WhatsApp-Bot',
            text: 'Kundenanfragen strukturiert aufnehmen.',
            href: '/whatsapp-bot',
            icon: MessageCircle,
          },
          {
            title: 'Betriebsassistent',
            text: 'Fragen stellen. Vorgänge verstehen.',
            href: '/betriebsassistent',
            icon: Sparkles,
          },
          {
            title: 'Partsunion Mobile App',
            text: 'Dein System direkt an der Ware.',
            href: '/loesungen/haendler-app',
            icon: Monitor,
          },
        ],
      },
      {
        label: 'Dein tägliches Geschäft',
        links: [
          {
            title: 'Angebote & Aufträge',
            text: 'Vom ersten Angebot bis zur Rechnung.',
            href: '/loesungen/angebot-auftrag',
            icon: ClipboardList,
          },
          {
            title: 'Lager & Einkauf',
            text: 'Bestände kennen. Bedarf decken.',
            href: '/loesungen/bestand-lager',
            icon: Boxes,
          },
          {
            title: 'Kassensystem',
            text: 'Thekenverkauf, Zahlung und Bestand.',
            href: '/loesungen/finanzen-kasse',
            icon: Store,
          },
          {
            title: 'Retouren & Reklamationen',
            text: 'Rückabwicklung im selben Vorgang.',
            href: '/loesungen/retouren',
            icon: PackageCheck,
          },
          {
            title: 'Buchhaltung & Banking',
            text: 'Belege, Buchungen und Zahlungen.',
            href: '/buchhaltung-banking',
            icon: Landmark,
          },
        ],
      },
    ],
    feature: {
      eyebrow: 'Die All-in-One-Plattform für Teilehändler',
      title: 'Ein System. Verbundene Arbeitsbereiche. Durchgängige Abläufe.',
      text: 'Automatische OE-Ermittlung, ERP, WaWi und Kasse greifen ineinander.',
      label: 'Die Plattform kennenlernen',
      href: '/plattform',
      icon: LayoutGrid,
    },
    bottom: [
      { title: 'Alle Funktionen', href: '/features', icon: LayoutGrid },
      { title: 'Alle Lösungen', href: '/loesungen', icon: PackageCheck },
      { title: 'Produktansichten', href: '/live-demo', icon: Monitor },
    ],
  },
  {
    id: 'betriebe',
    label: 'Für deinen Betrieb',
    heading: 'Deine Ware. Deine Abläufe.',
    overview: { label: 'Lösungen ansehen', href: '/loesungen' },
    columns: [
      {
        label: 'Dein Geschäftsmodell',
        links: [
          {
            title: 'Neuteilehandel',
            text: 'Sortiment, Beschaffung und Verkauf verbinden.',
            href: '/plattform/neuteile',
            icon: ShoppingCart,
          },
          {
            title: 'Gebrauchtteilehandel',
            text: 'Gebrauchtteile, Zustände und Herkunft im Blick.',
            href: '/plattform/gebrauchtteile',
            icon: Store,
          },
        ],
      },
      {
        label: 'Dein Einstieg',
        links: [
          {
            title: 'Einführung & Datenübernahme',
            text: 'Den Wechsel gemeinsam vorbereiten.',
            href: '/einfuehrung',
            icon: PackageCheck,
          },
          {
            title: 'Kosten & Umfang',
            text: 'Was für deinen Betrieb sinnvoll ist.',
            href: '/pricing',
            icon: FileCheck2,
          },
        ],
      },
    ],
    feature: {
      eyebrow: 'Persönlich über deinen Betrieb sprechen',
      title: 'Was soll bei dir im Alltag einfacher werden?',
      text: 'Wir besprechen deine Abläufe und zeigen dir, wo Partsunion ansetzen kann.',
      label: 'Beratung vereinbaren',
      href: '/beratung',
      icon: Users,
    },
    bottom: [
      { title: 'Partsunion kennenlernen', href: '/about', icon: Users },
      { title: 'Direkter Kontakt', href: '/contact', icon: MessageCircle },
    ],
  },
  {
    id: 'wissen',
    label: 'Wissen',
    heading: 'Gute Entscheidungen beginnen mit Klarheit.',
    overview: { label: 'Zum Ratgeber', href: '/blog' },
    columns: [
      {
        label: 'Orientierung',
        links: [
          {
            title: 'Praxisratgeber',
            text: 'Wissen für den digitalen Teilehandel.',
            href: '/blog',
            icon: BookOpen,
          },
          {
            title: 'Systeme vergleichen',
            text: 'Die richtige Lösung für deinen Betrieb finden.',
            href: '/vergleich',
            icon: LayoutGrid,
          },
        ],
      },
      {
        label: 'Partsunion kennenlernen',
        links: [
          { title: 'Über uns', text: 'Warum wir Partsunion bauen.', href: '/about', icon: Users },
          {
            title: 'Einführung & Zusammenarbeit',
            text: 'Vom ersten Gespräch zum Arbeitsalltag.',
            href: '/einfuehrung',
            icon: CircleHelp,
          },
        ],
      },
    ],
    feature: {
      eyebrow: 'Vom Wissen in die Praxis',
      title: 'Lass uns über deine nächsten Schritte sprechen.',
      text: 'Mit deinen Fragen, deinen Abläufen und einem persönlichen Ansprechpartner.',
      label: 'Beratung vereinbaren',
      href: '/beratung',
      icon: MessageCircle,
    },
    bottom: [
      { title: 'Funktionen im Überblick', href: '/features', icon: LayoutGrid },
      { title: 'Kontakt aufnehmen', href: '/contact', icon: MessageCircle },
    ],
  },
];

export function HomepageHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const groupTriggers = useRef<Record<string, HTMLButtonElement | null>>({});

  const closeNavigation = () => {
    setMobileOpen(false);
    setActiveGroup(null);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || (!mobileOpen && !activeGroup)) return;
      event.preventDefault();
      if (activeGroup) {
        groupTriggers.current[activeGroup]?.focus();
        setActiveGroup(null);
      } else {
        setMobileOpen(false);
        mobileTrigger.current?.focus();
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (header.current && !header.current.contains(event.target as Node)) closeNavigation();
    };
    const onHistory = () => closeNavigation();
    const desktop = window.matchMedia('(min-width: 1100px)');
    const onBreakpoint = () => closeNavigation();
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    window.addEventListener('popstate', onHistory);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
      window.removeEventListener('popstate', onHistory);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [mobileOpen, activeGroup]);

  const isCurrent = (href: string) => pathname === href;
  const isGroupCurrent = (group: (typeof navigation)[number]) => {
    if (group.id === 'plattform') {
      return (
        [
          '/plattform',
          '/features',
          '/loesungen',
          '/whatsapp-bot',
          '/betriebsassistent',
          '/buchhaltung-banking',
          '/live-demo',
        ].includes(pathname) ||
        pathname.startsWith('/features/') ||
        pathname.startsWith('/loesungen/')
      );
    }
    if (group.id === 'betriebe') {
      return pathname.startsWith('/plattform/') || pathname === '/einfuehrung';
    }
    return ['/blog', '/vergleich', '/about'].some(
      (href) => pathname === href || pathname.startsWith(`${href}/`),
    );
  };

  return (
    <>
      <a href="#main-content" className="mk-skip" onClick={closeNavigation}>
        Zum Inhalt springen
      </a>
      <header
        className="mk-head mm-header"
        ref={header}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeNavigation();
        }}
      >
        <div className="mk-wrap mm-header-inner">
          <Link
            href="/"
            className="mk-brand mm-brand"
            aria-label="Partsunion Startseite"
            onClick={closeNavigation}
          >
            <Image src="/favicon.png" width={32} height={32} alt="" priority />
            partsunion
          </Link>

          <nav
            id="main-navigation"
            className={`mm-nav ${mobileOpen ? 'mm-nav-open' : ''}`}
            aria-label="Hauptnavigation"
          >
            {navigation.map((group) => {
              const expanded = activeGroup === group.id;
              const FeaturedIcon = group.feature.icon;
              return (
                <div key={group.id} className="mm-group">
                  <button
                    ref={(element) => {
                      groupTriggers.current[group.id] = element;
                    }}
                    type="button"
                    id={`mm-trigger-${group.id}`}
                    className={`mm-trigger ${isGroupCurrent(group) ? 'mm-current' : ''}`}
                    aria-expanded={expanded}
                    aria-controls={`mm-panel-${group.id}`}
                    onClick={() => setActiveGroup(expanded ? null : group.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        setActiveGroup(group.id);
                        requestAnimationFrame(() =>
                          document
                            .querySelector<HTMLAnchorElement>(`#mm-panel-${group.id} a`)
                            ?.focus(),
                        );
                      }
                    }}
                  >
                    {group.label}
                    <ChevronDown aria-hidden="true" />
                  </button>
                  <div
                    id={`mm-panel-${group.id}`}
                    className="mm-panel"
                    hidden={!expanded}
                    role="region"
                    aria-labelledby={`mm-trigger-${group.id}`}
                  >
                    {expanded && (
                      <>
                        <div className="mm-panel-top">
                          <p>{group.heading}</p>
                          <Link href={group.overview.href} onClick={closeNavigation}>
                            {group.overview.label}
                            <ArrowRight aria-hidden="true" />
                          </Link>
                        </div>
                        <div className="mm-panel-grid">
                          {group.columns.map((column) => (
                            <div className="mm-column" key={column.label}>
                              <p className="mm-column-label">{column.label}</p>
                              <ul>
                                {column.links.map((link) => {
                                  const Icon = link.icon;
                                  return (
                                    <li key={link.href}>
                                      <Link
                                        href={link.href}
                                        className="mm-item"
                                        aria-current={isCurrent(link.href) ? 'page' : undefined}
                                        onClick={closeNavigation}
                                      >
                                        <span className="mm-item-icon">
                                          <Icon aria-hidden="true" />
                                        </span>
                                        <span>
                                          <strong>{link.title}</strong>
                                          <span>{link.text}</span>
                                        </span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                          <Link
                            href={group.feature.href}
                            className="mm-feature"
                            onClick={closeNavigation}
                            data-track={
                              group.feature.href === '/beratung' ? 'Consultation CTA' : undefined
                            }
                          >
                            <FeaturedIcon className="mm-feature-icon" aria-hidden="true" />
                            <span className="mm-feature-eyebrow">{group.feature.eyebrow}</span>
                            <strong>{group.feature.title}</strong>
                            <span className="mm-feature-description">{group.feature.text}</span>
                            <span className="mm-feature-link">
                              {group.feature.label}
                              <ArrowRight aria-hidden="true" />
                            </span>
                          </Link>
                        </div>
                        <div className="mm-panel-bottom">
                          {group.bottom.map((link) => {
                            const Icon = link.icon;
                            return (
                              <Link key={link.href} href={link.href} onClick={closeNavigation}>
                                <Icon aria-hidden="true" />
                                {link.title}
                                <ArrowRight aria-hidden="true" />
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            <Link
              href="/pricing"
              className="mm-direct-link"
              aria-current={isCurrent('/pricing') ? 'page' : undefined}
              onClick={closeNavigation}
            >
              Kosten
            </Link>
            <div className="mm-mobile-bottom">
              <Link
                href="/beratung"
                className="mk-button"
                onClick={closeNavigation}
                data-track="Consultation CTA"
              >
                Beratung vereinbaren
                <ArrowRight aria-hidden="true" />
              </Link>
              <a href="https://app.partsunion.de">
                Zum Kundenlogin
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </nav>

          <div className="mm-actions">
            <a href="https://app.partsunion.de" className="mm-login">
              Anmelden
            </a>
            <Link
              href="/beratung"
              className="mk-button mm-cta"
              aria-label="Beratung vereinbaren"
              data-track="Consultation CTA"
              onClick={closeNavigation}
            >
              <span className="mm-cta-full">Beratung vereinbaren</span>
              <span className="mm-cta-short" aria-hidden="true">
                Beratung
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <button
              ref={mobileTrigger}
              className="mm-mobile-trigger"
              type="button"
              aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={mobileOpen}
              aria-controls="main-navigation"
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setActiveGroup(null);
              }}
            >
              {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      {(mobileOpen || activeGroup) && <div className="mm-backdrop" aria-hidden="true" />}
    </>
  );
}
