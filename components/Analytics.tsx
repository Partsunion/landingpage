"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { analyticsClick } from "@/lib/analytics-click";
import { analyticsContext, captureLandingContext } from "@/lib/attribution";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.partsunion.de";
let analyticsSessionId: string | undefined;

function uuid() { return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : [...crypto.getRandomValues(new Uint8Array(16))].map((value) => value.toString(16).padStart(2, "0")).join(""); }
function firstPartyTrack(type: "pageview" | "click", detail: Record<string, string>) {
  if (typeof window === "undefined" || !["partsunion.de", "www.partsunion.de"].includes(window.location.hostname) || navigator.doNotTrack === "1") return;
  analyticsSessionId ||= uuid();
  const context = analyticsContext();
  const payload = {
    eventId: uuid(),
    sessionId: analyticsSessionId,
    type,
    path: window.location.pathname,
    ...(context.referrerHost ? { referrerHost: context.referrerHost } : {}),
    ...Object.fromEntries(Object.entries(context).filter(([key]) => key.startsWith("utm_"))),
    ...detail,
  };
  void fetch(`${API_BASE}/api/website-analytics/events`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), keepalive: true, credentials: "omit" }).catch(() => undefined);
}

export function Analytics() {
  const pathname = usePathname();
  const productionHost = useSyncExternalStore(() => () => undefined, () => ["partsunion.de", "www.partsunion.de"].includes(window.location.hostname), () => false);
  useEffect(() => {
    captureLandingContext();
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-track], a[href], button, input[type=submit]") : null;
      if (!target) return;
      const anchor = target instanceof HTMLAnchorElement ? target : target.closest<HTMLAnchorElement>("a[href]");
      const placementNode = target.closest<HTMLElement>("[data-track-section], section[id], header, footer, nav, main");
      const result = analyticsClick({ explicitTarget: target.dataset.track, href: anchor?.getAttribute("href") || undefined, ariaLabel: target.getAttribute("aria-label") || undefined, isSubmit: target instanceof HTMLButtonElement && target.type === "submit", page: window.location.pathname, placement: placementNode?.dataset.trackSection || placementNode?.id || placementNode?.tagName.toLowerCase() || "content", origin: window.location.origin });
      firstPartyTrack("click", { target: result.target, placement: result.placement, destination: result.destination, kind: result.kind });
      window.plausible?.("UI Click", { props: result });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  useEffect(() => {
    firstPartyTrack("pageview", { path: pathname });
  }, [pathname]);
  if (!productionHost) return null;
  return <Script defer data-domain="partsunion.de" src="https://plausible.io/js/script.tagged-events.outbound-links.js" integrity="sha384-cNy8VYncrUFmX/OhlSwl5GX0i+gb9VwyOZlUuhIU4gjR6jhozJYi9Mifv7A2ZX7q" crossOrigin="anonymous" strategy="afterInteractive" />;
}

declare global { interface Window { plausible?: (event: string, options?: { props?: Record<string, string> }) => void } }
