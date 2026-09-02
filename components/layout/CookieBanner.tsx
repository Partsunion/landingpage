"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

/**
 * Transparenter Datenschutzhinweis für die cookielose Reichweitenmessung.
 *
 * Die Seite verwendet nur den lokalen Merker zum Ausblenden dieses Hinweises
 * und eine cookielose Reichweitenmessung über Plausible. Da die Messung keine
 * Cookies setzt und nicht auf den Gerätespeicher zugreift, wird hier keine
 * Einwilligungsentscheidung simuliert. Der Hinweis verlinkt transparent auf
 * die Datenschutzerklärung. Keine Tracking-Pixel, keine Remarketing-Tags und
 * kein Google Analytics.
 *
 * Storage:
 *   localStorage['pu-cookie-consent'] = 'accepted'
 *   localStorage['pu-cookie-consent-ts'] = ISO timestamp
 *
 * Der Hinweis erscheint erneut, wenn der lokale Speicher gelöscht wurde oder
 * die Bestätigung älter als 365 Tage ist.
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

    const dismiss = () => writeConsent("accepted");

    return (
        <div
            role="dialog"
            aria-label="Datenschutzhinweis"
            aria-live="polite"
            className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-2xl rounded-lg border border-[#cfd8e4] bg-white/96 shadow-[0_16px_45px_rgba(10,27,50,.2)] backdrop-blur-xl"
        >
            <div className="flex items-center gap-3 p-3 sm:px-4">
                <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#e9f2ff] text-[#1d6fe8] sm:flex">
                    <ShieldCheck className="h-4.5 w-4.5" aria-hidden />
                </span>
                <p className="min-w-0 flex-1 text-[11px] leading-4 text-[#657184] sm:text-xs sm:leading-5">
                    <strong className="font-semibold text-[#1a2638]">Keine Tracking-Cookies.</strong>{" "}
                    <span className="hidden sm:inline">Plausible misst die Reichweite anonym und EU-gehostet. </span>
                    <Link href="/legal/datenschutz" className="font-medium text-[#155fc8] underline underline-offset-2 hover:text-[#0e4fae]">
                        Datenschutz
                    </Link>
                </p>
                <div className="flex shrink-0 gap-1.5">
                    <button
                        type="button"
                        onClick={dismiss}
                        className="rounded-md bg-[#1d6fe8] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#155fc8]"
                    >
                        Verstanden
                    </button>
                </div>
            </div>
        </div>
    );
}
