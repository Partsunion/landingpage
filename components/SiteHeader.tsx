"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { Brand } from "@/components/Brand";
import { allRoutes, navGroups, utilityLinks } from "@/lib/site-data";

type DealerType = "new" | "used" | "mixed";
type Bottleneck = "identification" | "requests" | "inventory" | "finance";

const dealerOptions: { value: DealerType; code: string; label: string; detail: string }[] = [
  { value: "new", code: "01", label: "Neuteile", detail: "Katalog, OE und Beschaffung" },
  { value: "used", code: "02", label: "Gebrauchtteile", detail: "Einzelteile, Bilder und Marge" },
  { value: "mixed", code: "03", label: "Gemischtes Sortiment", detail: "Neu- und Gebrauchtteile verbinden" },
];

const bottleneckOptions: { value: Bottleneck; code: string; label: string; detail: string }[] = [
  { value: "identification", code: "A", label: "Teile sicher finden", detail: "VIN, HSN/TSN und OE-Zuordnung" },
  { value: "requests", code: "B", label: "Anfragen schneller bearbeiten", detail: "WhatsApp, Angebot und Auftrag" },
  { value: "inventory", code: "C", label: "Bestand & Einkauf steuern", detail: "Lager, Disposition und Retouren" },
  { value: "finance", code: "D", label: "Kasse & Belege verbinden", detail: "Zahlungen und Buchhaltung" },
];

const recommendations: Record<Bottleneck, { href: string; title: string; detail: string }> = {
  identification: { href: "/loesungen/oe-ermittlung", title: "OE-Ermittlung", detail: "Fahrzeugdaten und OE-Nummern werden zum klaren Startpunkt für den Verkauf." },
  requests: { href: "/whatsapp-bot", title: "WhatsApp-Bot", detail: "Unstrukturierte Nachrichten werden zu vollständigen, bearbeitbaren Teileanfragen." },
  inventory: { href: "/loesungen/bestand-lager", title: "Bestand & Lager", detail: "Verfügbarkeit, Warenbewegungen und Beschaffung laufen in einem Prozess zusammen." },
  finance: { href: "/buchhaltung-banking", title: "Buchhaltung & Banking", detail: "Belege, Konten und Zahlungen bleiben direkt mit dem Vorgang verbunden." },
};

const dealerSpecificRecommendations: Partial<Record<DealerType, Partial<Record<Bottleneck, { href: string; title: string; detail: string }>>>> = {
  new: {
    inventory: { href: "/loesungen/einkauf-disposition", title: "Einkauf & Disposition", detail: "Bedarf, Lieferanten und Bestellungen werden für dein Neuteilegeschäft durchgängig steuerbar." },
  },
  used: {
    identification: { href: "/plattform/gebrauchtteile", title: "Gebrauchtteilehandel", detail: "Einzelteile, Fahrzeugbezug und Bilddaten bleiben von der Erfassung bis zum Verkauf verbunden." },
    inventory: { href: "/plattform/gebrauchtteile", title: "Gebrauchtteilehandel", detail: "Individuelle Einzelteile, Lagerplätze und Margen werden in einem passenden Ablauf zusammengeführt." },
  },
};

function NavigatorGlyph() {
  return <svg className="navigator-glyph" viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="8.5" />
    <path d="M7.8 13.4h16.4M7.8 18.6h16.4M16 7.5c2.2 2.3 3.3 5.1 3.3 8.5S18.2 22.2 16 24.5M16 7.5c-2.2 2.3-3.3 5.1-3.3 8.5s1.1 6.2 3.3 8.5" />
    <path className="navigator-orbit" d="M3.8 20.2c3.6 4.9 11.4 7.3 18.2 4.8 4.1-1.5 6.4-4.3 6.2-7" />
    <circle className="navigator-signal" cx="28.1" cy="17.7" r="2" />
  </svg>;
}

function NavGlyph({ href }: { href: string }) {
  if (/oe-|oem|vin|fahrzeug/.test(href)) return <svg className="nav-glyph" viewBox="0 0 28 28" aria-hidden="true"><path d="M5 17.5h18l-1.6-5.2a3 3 0 0 0-2.9-2.1h-9a3 3 0 0 0-2.9 2.1L5 17.5Z"/><path d="M7 17.5v3.3M21 17.5v3.3M9 14h2M17 14h2"/><circle cx="14" cy="7" r="2.3"/></svg>;
  if (/whatsapp|anfragen/.test(href)) return <svg className="nav-glyph" viewBox="0 0 28 28" aria-hidden="true"><path d="M5 6.5h18v13H12l-5.5 3v-3H5z"/><path d="m10 11 2.2 2.2L18 9.5M16 16h3"/></svg>;
  if (/lager|bestand|produktdaten/.test(href)) return <svg className="nav-glyph" viewBox="0 0 28 28" aria-hidden="true"><path d="m4.5 9 9.5-5 9.5 5-9.5 5zM4.5 9v10l9.5 5 9.5-5V9M14 14v10"/><path d="m9.5 6.4 9.4 5"/></svg>;
  if (/retour/.test(href)) return <svg className="nav-glyph" viewBox="0 0 28 28" aria-hidden="true"><path d="M8 9H4V5M4.5 9A10 10 0 1 1 5 20"/><path d="M10 11h8v7h-8zM10 14.5h8"/></svg>;
  if (/kasse|finanz|bank|buchhaltung|rechnung|datev|pricing/.test(href)) return <svg className="nav-glyph" viewBox="0 0 28 28" aria-hidden="true"><path d="M5 7h18v15H5zM5 11h18"/><path d="M9 16h4M9 19h7M19 15v4"/></svg>;
  if (/einkauf|bestell|auftrag|angebot/.test(href)) return <svg className="nav-glyph" viewBox="0 0 28 28" aria-hidden="true"><path d="M7 5h14v18H7zM10 9h8M10 13h8M10 17h4"/><path d="m17 18 1.5 1.5L22 16"/></svg>;
  if (/app|download/.test(href)) return <svg className="nav-glyph" viewBox="0 0 28 28" aria-hidden="true"><rect x="8" y="3.5" width="12" height="21" rx="2"/><path d="M12 7h4M13 21h2"/></svg>;
  if (/automatis|betriebsassistent|features/.test(href)) return <svg className="nav-glyph" viewBox="0 0 28 28" aria-hidden="true"><path d="M14 4v4M14 20v4M4 14h4M20 14h4M7 7l3 3M18 18l3 3M21 7l-3 3M10 18l-3 3"/><circle cx="14" cy="14" r="4"/></svg>;
  if (/einfuehrung|beratung|live-demo/.test(href)) return <svg className="nav-glyph" viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="8" r="3"/><path d="M6 23c.8-5 3.5-8 8-8s7.2 3 8 8M20 5l3 3-3 3"/></svg>;
  return <svg className="nav-glyph" viewBox="0 0 28 28" aria-hidden="true"><path d="M4 7h8v8H4zM16 13h8v8h-8zM12 11l4 3M8 15v6h8"/><circle cx="8" cy="21" r="1.5"/></svg>;
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const [dealerType, setDealerType] = useState<DealerType | null>(null);
  const [bottleneck, setBottleneck] = useState<Bottleneck | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const actionRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchResults = useMemo(() => {
    const normalized = searchQuery.trim().toLocaleLowerCase("de-DE");
    if (!normalized) {
      const starters = ["/plattform", "/loesungen/oe-ermittlung", "/whatsapp-bot", "/beratung"];
      return starters.map((href) => allRoutes.find((route) => route.href === href)).filter((route) => route !== undefined);
    }
    return allRoutes
      .map((route) => {
        const label = route.label.toLocaleLowerCase("de-DE");
        const haystack = `${label} ${route.description.toLocaleLowerCase("de-DE")} ${route.href}`;
        const score = label === normalized ? 0 : label.startsWith(normalized) ? 1 : label.includes(normalized) ? 2 : haystack.includes(normalized) ? 3 : 9;
        return { route, score };
      })
      .filter(({ score }) => score < 9)
      .sort((a, b) => a.score - b.score || a.route.label.localeCompare(b.route.label, "de"))
      .slice(0, 6)
      .map(({ route }) => route);
  }, [searchQuery]);

  const recommendation = dealerType && bottleneck ? dealerSpecificRecommendations[dealerType]?.[bottleneck] ?? recommendations[bottleneck] : null;
  const dealerLabel = dealerOptions.find((option) => option.value === dealerType)?.label;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
        setSearchOpen(false);
        setNavigatorOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous };
  }, [mobileOpen]);

  useEffect(() => {
    if (!searchOpen && !navigatorOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!actionRef.current?.contains(event.target as Node)) {
        setSearchOpen(false);
        setNavigatorOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [searchOpen, navigatorOpen]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  function closeAll() {
    setActiveMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
    setNavigatorOpen(false);
  }

  function openSearch() {
    setActiveMenu(null);
    setNavigatorOpen(false);
    setSearchOpen(true);
  }

  function toggleNavigator() {
    setActiveMenu(null);
    setSearchOpen(false);
    setNavigatorOpen((open) => !open);
  }

  function resetNavigator() {
    setDealerType(null);
    setBottleneck(null);
  }

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <div className="utility-bar container">
        <div className="utility-spacer" />
        <nav aria-label="Servicenavigation">
          {utilityLinks.map((item) => <Link key={item.href} href={item.href} onClick={closeAll}>{item.label}</Link>)}
        </nav>
      </div>
      <div className="main-nav-wrap">
        <div className="main-nav container">
          <Link href="/" className="wordmark" aria-label="Partsunion Startseite" onClick={closeAll}><Brand /></Link>
          <nav className="desktop-nav" aria-label="Hauptnavigation">
            {navGroups.map((group) => (
              <div className="nav-item" key={group.label}>
                <button
                  className={pathname.startsWith(group.href) ? "is-active" : ""}
                  aria-expanded={activeMenu === group.label}
                  aria-controls={`mega-${navGroups.indexOf(group)}`}
                  onClick={() => setActiveMenu(activeMenu === group.label ? null : group.label)}
                >
                  {group.label}<ChevronDown size={13} />
                </button>
              </div>
            ))}
          </nav>
          <div className="nav-actions" ref={actionRef}>
            <div className={`header-search${searchOpen ? " is-open" : ""}`}>
              <button className="icon-button header-search-trigger" aria-label="Suche öffnen" aria-expanded={searchOpen} aria-controls="header-search-panel" onClick={openSearch}><Search size={18} /></button>
              {searchOpen && <div className="header-search-panel" id="header-search-panel">
                <form className="header-search-form" role="search" onSubmit={(event) => {
                  event.preventDefault();
                  const firstResult = searchResults[0];
                  if (firstResult) {
                    closeAll();
                    router.push(firstResult.href);
                  }
                }}>
                  <Search size={17} />
                  <label className="sr-only" htmlFor="site-search">Website durchsuchen</label>
                  <input ref={searchInputRef} id="site-search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Funktion oder Thema suchen …" autoComplete="off" />
                  <button type="button" className="header-search-close" aria-label="Suche schließen" onClick={() => setSearchOpen(false)}><X size={16} /></button>
                </form>
                <div className="header-search-results" aria-live="polite">
                  <div className="header-search-meta"><span>{searchQuery.trim() ? "Treffer" : "Direkt zu"}</span><small>{searchResults.length} {searchResults.length === 1 ? "Ergebnis" : "Ergebnisse"}</small></div>
                  {searchResults.length > 0 ? searchResults.map((item, index) => <Link href={item.href} key={item.href} onClick={closeAll}>
                    <span className="header-result-index">{String(index + 1).padStart(2, "0")}</span>
                    <span><strong>{item.label}</strong><small>{item.description}</small></span>
                    <ArrowRight size={15} />
                  </Link>) : <p className="header-search-empty">Kein direkter Treffer. Versuch es mit „OE“, „Lager“ oder „WhatsApp“.</p>}
                </div>
              </div>}
            </div>
            <div className={`navigator-tool${navigatorOpen ? " is-open" : ""}`}>
              <button className="icon-button locale navigator-trigger" aria-label="Betriebs-Navigator öffnen" aria-expanded={navigatorOpen} aria-controls="dealer-navigator" onClick={toggleNavigator}><NavigatorGlyph /></button>
              {navigatorOpen && <section className="dealer-navigator" id="dealer-navigator" aria-label="Partsunion Betriebs-Navigator">
                <div className="navigator-visual" aria-hidden="true">
                  <span>PU / MATCH</span>
                  <svg viewBox="0 0 180 76"><path d="M9 52C37 13 72 70 104 31c18-22 39-12 67-22"/><circle cx="9" cy="52" r="4"/><circle cx="104" cy="31" r="4"/><circle cx="171" cy="9" r="4"/></svg>
                  <small>Dein kürzester Weg zum passenden Einstieg</small>
                </div>
                <div className="navigator-body">
                  <div className="navigator-head">
                    <div><span>Betriebs-Navigator</span><small>{recommendation ? "Auswertung" : dealerType ? "02 / 02" : "01 / 02"}</small></div>
                    <button type="button" aria-label="Navigator schließen" onClick={() => setNavigatorOpen(false)}><X size={16} /></button>
                  </div>
                  <div className="navigator-progress" aria-hidden="true"><i className={dealerType ? "is-complete" : "is-current"} /><i className={bottleneck ? "is-complete" : dealerType ? "is-current" : ""} /></div>
                  {!dealerType && <div className="navigator-question">
                    <p>Was beschreibt euren Teilehandel am besten?</p>
                    <div className="navigator-options">{dealerOptions.map((option) => <button type="button" key={option.value} onClick={() => setDealerType(option.value)}><span>{option.code}</span><span><strong>{option.label}</strong><small>{option.detail}</small></span><ArrowRight size={15} /></button>)}</div>
                  </div>}
                  {dealerType && !bottleneck && <div className="navigator-question">
                    <button type="button" className="navigator-back" onClick={() => setDealerType(null)}><ArrowLeft size={13} /> Zurück</button>
                    <p>Wo verliert euer Team aktuell am meisten Zeit?</p>
                    <div className="navigator-options navigator-options-compact">{bottleneckOptions.map((option) => <button type="button" key={option.value} onClick={() => setBottleneck(option.value)}><span>{option.code}</span><span><strong>{option.label}</strong><small>{option.detail}</small></span><ArrowRight size={15} /></button>)}</div>
                  </div>}
                  {dealerType && recommendation && <div className="navigator-result">
                    <span className="navigator-match-label">Passender Startpunkt für {dealerLabel}</span>
                    <h2>{recommendation.title}</h2>
                    <p>{recommendation.detail}</p>
                    <div className="navigator-result-path" aria-hidden="true"><span>Heute</span><i /><span>Partsunion</span><i /><strong>Ziel</strong></div>
                    <Link className="navigator-result-link" href={recommendation.href} onClick={closeAll}>Empfehlung ansehen <ArrowRight size={16} /></Link>
                    <button type="button" className="navigator-reset" onClick={resetNavigator}>Check neu starten</button>
                  </div>}
                </div>
              </section>}
            </div>
            <Link className="button button-outline button-small desktop-only" href="/download" onClick={closeAll}>Download</Link>
            <Link className="button button-primary button-small desktop-only" href="/beratung" onClick={closeAll}>Beratung vereinbaren</Link>
            <button className="icon-button mobile-trigger" aria-label="Menü öffnen" onClick={() => { setSearchOpen(false); setNavigatorOpen(false); setMobileOpen(true); }}><Menu /></button>
          </div>
        </div>
      </div>

      {activeMenu && (
        <div className="mega-shell">
          <button className="mega-backdrop" aria-label="Menü schließen" onClick={() => setActiveMenu(null)} />
          {navGroups.filter((group) => group.label === activeMenu).map((group) => (
            <div className="mega-menu" id={`mega-${navGroups.indexOf(group)}`} aria-label={`${group.label} Navigation`} key={group.label}>
              <div className="container mega-menu-inner">
                <div className="mega-intro">
                  <p className="mega-code">PU / {String(navGroups.indexOf(group) + 1).padStart(2, "0")}</p>
                  <h2>{group.label}</h2>
                  <p>{group.intro}</p>
                  <div className="mega-schematic" aria-hidden="true"><span><i />Anfrage</span><span><i />Teil & Fahrzeug</span><span><i />Auftrag</span></div>
                  <Link className="mega-overview-link" href={group.href} onClick={closeAll}>Übersicht öffnen <ArrowRight size={17} /></Link>
                </div>
                <div className="mega-content">
                  <div className="mega-content-head"><span>Bereiche</span><small>{group.items.length} Themen</small></div>
                  <div className={`mega-columns mega-columns-${new Set(group.items.map((item) => item.section)).size}`}>
                    {[...new Set(group.items.map((item) => item.section ?? group.eyebrow))].map((section) => <div className="mega-column" key={section}>
                      <p className="mega-section-title">{section}</p>
                      <div className="mega-link-list">{group.items.filter((item) => (item.section ?? group.eyebrow) === section).map((item) => <Link href={item.href} key={item.href} onClick={closeAll}><NavGlyph href={item.href} /><span><strong>{item.label}</strong><small>{item.description}</small></span></Link>)}</div>
                    </div>)}
                  </div>
                  <div className="mega-content-foot"><span>Dein nächster Schritt</span><Link href="/beratung" onClick={closeAll}>Abläufe gemeinsam ansehen <ArrowRight size={16} /></Link></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Hauptnavigation">
          <div className="mobile-menu-top">
            <Link href="/" className="wordmark" onClick={closeAll}><Brand /></Link>
            <button className="icon-button" aria-label="Menü schließen" onClick={() => setMobileOpen(false)}><X /></button>
          </div>
          <div className="mobile-scroll">
            {navGroups.map((group) => (
              <details key={group.label} open={group.label === "Plattform" ? true : undefined}>
                <summary>{group.label}<ChevronDown size={17} /></summary>
                <Link className="mobile-all" href={group.href} onClick={closeAll}>Alle {group.label} ansehen</Link>
                {group.items.map((item) => <Link key={item.href} href={item.href} onClick={closeAll}><NavGlyph href={item.href} /><span><strong>{item.label}</strong><small>{item.description}</small></span></Link>)}
              </details>
            ))}
            <div className="mobile-utility">
              {utilityLinks.map((item) => <Link key={item.href} href={item.href} onClick={closeAll}>{item.label}</Link>)}
            </div>
            <Link className="button button-primary" href="/beratung" onClick={closeAll}>Beratung vereinbaren</Link>
          </div>
        </div>
      )}

    </header>
  );
}
