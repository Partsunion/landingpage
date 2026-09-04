/**
 * Plausible Analytics — DSGVO-konform, cookielos, ~1.4 KB Script.
 *
 * Statt Google Analytics 4 (kompliziert, Cookie-Consent erforderlich, oft DSGVO-Bedenken
 * wegen US-Datenübermittlung) nutzen wir Plausible: EU-Hosting, keine Cookies,
 * keine IP-Speicherung, keine personenbezogenen Daten — kein Consent-Banner nötig.
 *
 * Conversion-Events werden via `window.plausible('event-name', { props })` getriggert.
 * Helper-Funktion `track()` ist nachfolgend exportiert — verwendet im ConsultationForm,
 * LiveDemoChat-CTA und WhatsAppFloat.
 */

'use client';
import Script from 'next/script';
import { useEffect, useSyncExternalStore } from 'react';
import { captureLandingContext } from '@/lib/attribution';

/** Tausche das gegen deinen Plausible-Domain-Slug, sobald du den Account hast. */
const PLAUSIBLE_DOMAIN = 'partsunion.de';

/** Plausible Self-Hosted oder Cloud; Standard ist die Cloud-URL. */
const PLAUSIBLE_SCRIPT = 'https://plausible.io/js/script.tagged-events.outbound-links.js';

// Pin the reviewed vendor payload. A changed third-party script must fail closed
// until the new bytes and hash have been reviewed and released together.
const PLAUSIBLE_INTEGRITY =
  'sha384-cNy8VYncrUFmX/OhlSwl5GX0i+gb9VwyOZlUuhIU4gjR6jhozJYi9Mifv7A2ZX7q';

export function Analytics() {
  const productionHost = useSyncExternalStore(
    () => () => {},
    () => ['partsunion.de', 'www.partsunion.de'].includes(window.location.hostname),
    () => false,
  );
  useEffect(() => {
    captureLandingContext();
    const click = (event: MouseEvent) => {
      const target =
        event.target instanceof Element ? event.target.closest<HTMLElement>('[data-track]') : null;
      if (target?.dataset.track)
        track(target.dataset.track, {
          page: window.location.pathname,
          placement: target.closest('header') ? 'header' : 'content',
        });
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);
  if (!productionHost) return null;
  return (
    <Script
      defer
      data-domain={PLAUSIBLE_DOMAIN}
      src={PLAUSIBLE_SCRIPT}
      integrity={PLAUSIBLE_INTEGRITY}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

/**
 * Type-safe Helper für Custom-Events.
 * Wird nur ausgeführt wenn `window.plausible` existiert (Script geladen).
 */
type PlausibleProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: PlausibleProps; callback?: () => void },
    ) => void;
  }
}

export function track(event: string, props?: PlausibleProps): void {
  if (typeof window === 'undefined') return;
  if (typeof window.plausible !== 'function') return;
  try {
    window.plausible(event, props ? { props } : undefined);
  } catch {
    /* swallow — analytics failure must never break the user flow */
  }
}
