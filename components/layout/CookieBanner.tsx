"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

/**
 * Cookie consent banner — DSGVO / § 25 TDDDG compliant.
 *
 * The landing page uses strictly necessary first-party storage (theme
 * preference, cookie-consent flag) and ONE privacy-friendly, cookieless
 * analytics tool: Plausible (EU-hosted, no cookies, no IP storage, no
 * personal data — see components/layout/Analytics.tsx). Because Plausible
 * sets no cookies and does not access device storage, it falls outside the
 * § 25 TDDDG consent requirement; we still disclose it transparently here
 * and in the Datenschutzerklärung. No tracking pixels, no remarketing tags,
 * no Google Analytics.
 *
 * Storage:
 *   localStorage['pu-cookie-consent'] = 'accepted' | 'rejected'
 *   localStorage['pu-cookie-consent-ts'] = ISO timestamp
 *
 * The banner re-appears if the user clears their storage or the consent is
 * older than 365 days (DSGVO refresh rule).
 */

const CONSENT_KEY = "pu-cookie-consent";
const CONSENT_TS_KEY = "pu-cookie-consent-ts";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

type Consent = "accepted" | "rejected" | null;

function readConsent(): Consent {
    if (typeof window === "undefined") return null;
    try {
        const value = localStorage.getItem(CONSENT_KEY) as Consent;
        const ts = localStorage.getItem(CONSENT_TS_KEY);
        if (!value || !ts) return null;
        if (Date.now() - new Date(ts).getTime() > ONE_YEAR_MS) return null;
        return value;
    } catch {
        return null;
    }
}

function writeConsent(value: Exclude<Consent, null>) {
    try {
        localStorage.setItem(CONSENT_KEY, value);
        localStorage.setItem(CONSENT_TS_KEY, new Date().toISOString());
        // Notify subscribers of the storage-change so the banner hook
        // re-renders immediately instead of waiting for navigation.
        window.dispatchEvent(new Event("pu-consent-change"));
    } catch {
        /* ignore storage errors */
    }
}

// useSyncExternalStore integration for the consent state. The snapshot is
// 'pending' on the server and true/false on the client so SSR never flashes
// the banner and React 19's stricter effect rules are avoided entirely.
function subscribe(callback: () => void) {
    window.addEventListener("pu-consent-change", callback);
    window.addEventListener("storage", callback);
    return () => {
        window.removeEventListener("pu-consent-change", callback);
        window.removeEventListener("storage", callback);
    };
}

function getSnapshot(): "visible" | "hidden" {
    return readConsent() === null ? "visible" : "hidden";
}

function getServerSnapshot(): "visible" | "hidden" {
    return "hidden";
}

export function CookieBanner() {
    const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    if (state !== "visible") return null;

    const accept = () => writeConsent("accepted");
    const reject = () => writeConsent("rejected");

    return (
        <div
            role="dialog"
            aria-label="Cookie-Einwilligung"
            aria-live="polite"
            className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl"
        >
            <div className="flex flex-col gap-3 p-3.5 md:flex-row md:items-center md:justify-between md:gap-4 md:px-5 md:py-3">
                <p className="flex-1 text-xs leading-relaxed text-muted-foreground md:text-sm">
                    Nur technisch notwendige Speicherung, keine Tracking-Cookies. Zur anonymen
                    Reichweitenmessung nutzen wir das cookielose, EU-gehostete Plausible (keine
                    personenbezogenen Daten).{" "}
                    <Link
                        href="/legal/datenschutz"
                        className="text-foreground underline underline-offset-2 hover:text-primary"
                    >
                        Datenschutz
                    </Link>
                </p>
                <div className="flex flex-shrink-0 gap-2">
                    <button
                        type="button"
                        onClick={reject}
                        className="rounded-md border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground md:text-sm"
                    >
                        Nur notwendige
                    </button>
                    <button
                        type="button"
                        onClick={accept}
                        className="rounded-md bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 md:text-sm"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
