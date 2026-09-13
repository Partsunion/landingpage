"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Globe2, Menu, Search, X } from "lucide-react";
import { Brand } from "@/components/Brand";
import { navGroups, utilityLinks } from "@/lib/site-data";

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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mobileOpen && !searchOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous };
  }, [mobileOpen, searchOpen]);

  function closeAll() {
    setActiveMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
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
          <div className="nav-actions">
            <button className="icon-button" aria-label="Suche öffnen" onClick={() => setSearchOpen(true)}><Search size={18} /></button>
            <button className="icon-button locale" aria-label="Region wählen"><Globe2 size={17} /></button>
            <Link className="button button-outline button-small desktop-only" href="/download" onClick={closeAll}>Download</Link>
            <Link className="button button-primary button-small desktop-only" href="/beratung" onClick={closeAll}>Beratung vereinbaren</Link>
            <button className="icon-button mobile-trigger" aria-label="Menü öffnen" onClick={() => setMobileOpen(true)}><Menu /></button>
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

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Website durchsuchen">
          <button className="search-close icon-button" aria-label="Suche schließen" onClick={() => setSearchOpen(false)}><X /></button>
          <form action="/blog" className="search-box">
            <label htmlFor="site-search">Wonach suchst du?</label>
            <div><Search /><input id="site-search" name="q" autoFocus placeholder="OE-Ermittlung, Lager, Kasse …" /><button type="submit">Suchen</button></div>
          </form>
        </div>
      )}
    </header>
  );
}
