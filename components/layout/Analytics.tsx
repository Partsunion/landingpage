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
import { analyticsClick } from '@/lib/analytics-click';

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
        event.target instanceof Element
          ? event.target.closest<HTMLElement>('[data-track], a[href], button, input[type="submit"]')
          : null;
      if (!target) return;
      const anchor = target instanceof HTMLAnchorElement ? target : target.closest<HTMLAnchorElement>('a[href]');
      const placementNode = target.closest<HTMLElement>('[data-track-section], section[id], header, footer, nav, main');
      const placement = placementNode?.dataset.trackSection
        || placementNode?.id
        || placementNode?.tagName.toLocaleLowerCase('de-DE')
        || 'content';
      const generic = analyticsClick({
        explicitTarget: target.dataset.track,
        href: anchor?.getAttribute('href') || undefined,
        ariaLabel: target.getAttribute('aria-label') || undefined,
        isSubmit: target instanceof HTMLInputElement
          ? target.type === 'submit'
          : target instanceof HTMLButtonElement && target.type === 'submit',
        page: window.location.pathname,
        placement,
        origin: window.location.origin,
      });
      track('UI Click', { ...generic });
      // Bestehende Conversion-Namen bleiben parallel erhalten. So brechen
      // bereits eingerichtete Ziele und Kampagnenberichte nicht.
      if (target.dataset.track && target.dataset.track !== 'UI Click')
        track(target.dataset.track, {
          page: window.location.pathname,
          placement: generic.placement,
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
 * Type-safe Helper für aggregierte Custom-Events.
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
