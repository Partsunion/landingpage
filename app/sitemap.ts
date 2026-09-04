import type { MetadataRoute } from 'next';
import { featureData } from '@/lib/feature-data';
import { blogPosts } from '@/lib/blog-posts';
import { solutionPages } from '@/lib/solutions-data';

// Statischer Export (next.config.ts: output: "export") verlangt, dass die
// Sitemap zur Build-Zeit fixiert wird statt bei jedem Request.
export const dynamic = 'force-static';

const BASE_URL = 'https://partsunion.de';

/**
 * Dynamische Sitemap — wird bei `next build` als /sitemap.xml exportiert
 * (Next.js App-Router Konvention). Für redaktionelle Seiten steht hier das
 * Datum der letzten tatsächlichen Inhaltsprüfung. Ein reiner Rebuild darf
 * das Signal nicht künstlich erneuern. Ratgeber nutzen ihr eigenes Update.
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
  const siteContentUpdated = new Date('2026-09-04T00:00:00+02:00');

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
    {
      url: `${BASE_URL}/`,
      lastModified: siteContentUpdated,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/live-demo`,
      lastModified: siteContentUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/live-demo/teileermittlung`,
      lastModified: siteContentUpdated,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/plattform`,
      lastModified: siteContentUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/plattform/neuteile`,
      lastModified: siteContentUpdated,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/plattform/gebrauchtteile`,
      lastModified: siteContentUpdated,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/loesungen`,
      lastModified: siteContentUpdated,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/beratung`,
      lastModified: siteContentUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...[
      'whatsapp-bot',
      'betriebsassistent',
      'buchhaltung-banking',
      'einfuehrung',
      'produktdaten',
    ].map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: siteContentUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    {
      url: `${BASE_URL}/download`,
      lastModified: siteContentUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/features`,
      lastModified: siteContentUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/vergleich`,
      lastModified: siteContentUpdated,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: siteContentUpdated,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: siteContentUpdated,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: siteContentUpdated,
      changeFrequency: 'monthly',
      priority: 0.5,
    },

    ...solutionPages.map((page) => ({
      url: `${BASE_URL}/loesungen/${page.slug}`,
      lastModified: siteContentUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),

    // ─── Feature-Detail-Pages ─────────────────────────────────────
    ...featureData.map((f) => ({
      url: `${BASE_URL}/features/${f.slug}`,
      lastModified: siteContentUpdated,
      changeFrequency: 'monthly' as const,
      priority: topFeatures.has(f.slug) ? 0.75 : 0.65,
    })),

    // ─── Praxisratgeber ───────────────────────────────────────────
    {
      url: `${BASE_URL}/blog`,
      lastModified: siteContentUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // ─── Legal ─────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/legal/impressum`,
      lastModified: siteContentUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/legal/datenschutz`,
      lastModified: siteContentUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/legal/agb`,
      lastModified: siteContentUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/legal/widerruf`,
      lastModified: siteContentUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
