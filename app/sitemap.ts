import type { MetadataRoute } from 'next';
import { featureData } from '@/lib/feature-data';
import { blogPosts } from '@/lib/blog-posts';

// Statischer Export (next.config.ts: output: "export") verlangt, dass die
// Sitemap zur Build-Zeit fixiert wird statt bei jedem Request.
export const dynamic = 'force-static';

const BASE_URL = 'https://partsunion.de';

/**
 * Dynamische Sitemap — wird bei `next build` als /sitemap.xml exportiert
 * (Next.js App-Router Konvention). `lastModified: new Date()` nutzt das
 * Build-Datum, damit Google sieht, dass wir die Seite aktiv pflegen.
 *
 * Prioritäten:
 *   1.0   Homepage
 *   0.9   Live-Demo (Konversions-Page) und Feature-Übersicht
 *   0.85  Kontakt + Beratungs-Anker
 *   0.75  Top-Feature-Pages (oem, whatsapp-bot, bestandssync, retouren)
 *   0.65  Übrige Feature-Detail-Seiten
 *   0.7   About
 *   0.3   Legal-Pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const topFeatures = new Set([
        'erp-autoteilehandel',
        'warenwirtschaft-autoteilhandel',
        'gobd-tse-zugferd-datev',
        'b2b-kundenportal-white-label',
        'oem-ermittlung',
        'whatsapp-bot',
        'bestandssynchronisation',
        'retourenmanagement',
        'sinkende-retouren',
        'geschwindigkeit',
    ]);

    return [
        // ─── Konversions-kritisch ─────────────────────────────────────
        { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${BASE_URL}/live-demo`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/plattform`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/features`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/vergleich`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
        { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
        { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },

        // ─── Feature-Detail-Pages ─────────────────────────────────────
        ...featureData.map((f) => ({
            url: `${BASE_URL}/features/${f.slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: topFeatures.has(f.slug) ? 0.75 : 0.65,
        })),

        // ─── Blog ─────────────────────────────────────────────────────
        { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        ...blogPosts.map((p) => ({
            url: `${BASE_URL}/blog/${p.slug}`,
            lastModified: new Date(p.updatedAt),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),

        // ─── Legal ─────────────────────────────────────────────────────
        { url: `${BASE_URL}/legal/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/legal/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/legal/agb`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/legal/widerruf`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    ];
}
