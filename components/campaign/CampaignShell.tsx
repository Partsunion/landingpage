'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';

export function CampaignHeader() {
  return (
    <header className="cp-header" data-campaign-header>
      <a href="#main-content" className="mk-skip">Zum Inhalt springen</a>
      <div className="cp-wrap cp-header-inner">
        <Link href="/" className="cp-logo" aria-label="Partsunion Startseite">
          <Image src="/favicon.png" alt="" width={36} height={36} />
          <span>partsunion<span className="cp-logo-dot">.</span></span>
        </Link>
        <nav aria-label="Seitennavigation" className="cp-nav">
          <a href="#system">Das System</a>
          <a href="#ablauf">Automatisierung</a>
          <a href="#einfuehrung">Einführung</a>
        </nav>
        <a className="cp-button cp-header-cta" href="#beratung" data-track="Campaign Header CTA">
          <span>Beratung buchen</span><ArrowRight aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}

export function CampaignFooter() {
  return (
    <footer className="cp-footer">
      <div className="cp-wrap cp-footer-inner">
        <div><strong>partsunion.</strong><p>Ein System für deinen ganzen Teilehandel.</p></div>
        <nav aria-label="Weiterführende Informationen">
          <Link href="/plattform">Alle Funktionen</Link>
          <a href="mailto:info@partsunion.de">Kontakt</a>
          <Link href="/legal/impressum">Impressum</Link>
          <Link href="/legal/datenschutz">Datenschutz</Link>
        </nav>
      </div>
    </footer>
  );
}

export function CampaignMobileCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('kampagnenstart');
    const booking = document.getElementById('beratung');
    if (!hero || !booking || !('IntersectionObserver' in window)) return;
    let heroVisible = true;
    let bookingVisible = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === booking) bookingVisible = entry.isIntersecting;
      }
      setVisible(!heroVisible && !bookingVisible);
    });
    observer.observe(hero);
    observer.observe(booking);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;
  return (
    <div className="cp-mobile-cta">
      <a className="cp-button" href="#beratung" data-track="Campaign Mobile CTA">
        <CalendarDays aria-hidden="true" /> Beratungsgespräch buchen <ArrowRight aria-hidden="true" />
      </a>
    </div>
  );
}
