/**
 * Cookielose Website-Analyse über die eigene API plus optionales Plausible.
 *
 * Die eigene Erfassung speichert keine vollständigen IP-Adressen und legt keine
 * Besucherkennung im Browser ab. Plausible bleibt als optionale, aggregierte
 * Zweitauswertung eingebunden.
 *
 * Conversion-Events werden via `window.plausible('event-name', { props })` getriggert.
 * Helper-Funktion `track()` ist nachfolgend exportiert — verwendet im ConsultationForm,
 * LiveDemoChat-CTA und WhatsAppFloat.
 */

'use client';
import Script from 'next/script';
import { useEffect, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsContext, captureLandingContext } from '@/lib/attribution';
import { analyticsClick } from '@/lib/analytics-click';

/** Tausche das gegen deinen Plausible-Domain-Slug, sobald du den Account hast. */
const PLAUSIBLE_DOMAIN = 'partsunion.de';

/** Plausible Self-Hosted oder Cloud; Standard ist die Cloud-URL. */
const PLAUSIBLE_SCRIPT = 'https://plausible.io/js/script.tagged-events.outbound-links.js';

// Pin the reviewed vendor payload. A changed third-party script must fail closed
// until the new bytes and hash have been reviewed and released together.
const PLAUSIBLE_INTEGRITY =
  'sha384-cNy8VYncrUFmX/OhlSwl5GX0i+gb9VwyOZlUuhIU4gjR6jhozJYi9Mifv7A2ZX7q';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.partsunion.de';
let analyticsSessionId: string | undefined;

function browserUuid(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((value) => value.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function firstPartyTrack(type: 'pageview' | 'click', detail: Record<string, string>): void {
  if (typeof window === 'undefined' || !['partsunion.de', 'www.partsunion.de'].includes(window.location.hostname)) return;
  if (navigator.doNotTrack === '1') return;
  analyticsSessionId ||= browserUuid();
  const context = analyticsContext();
  const payload = {
    eventId: browserUuid(), sessionId: analyticsSessionId, type,
    path: window.location.pathname,
    ...(context.referrerHost ? { referrerHost: context.referrerHost } : {}),
    ...Object.fromEntries(Object.entries(context).filter(([key]) => key.startsWith('utm_'))),
    ...detail,
  };
  void fetch(`${API_BASE}/api/website-analytics/events`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload), keepalive: true, credentials: 'omit',
  }).catch(() => { /* analytics must never interrupt the website */ });
}

export function Analytics() {
  const pathname = usePathname();
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
      firstPartyTrack('click', {
        target: generic.target, placement: generic.placement,
        destination: generic.destination, kind: generic.kind,
      });
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
  useEffect(() => {
    firstPartyTrack('pageview', { path: pathname });
  }, [pathname]);
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
