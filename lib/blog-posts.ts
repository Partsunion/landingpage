/**
 * Blog-Posts-Metadata — Single Source of Truth für /blog Übersicht + Sitemap.
 *
 * Der eigentliche Artikel-Content lebt in `app/blog/[slug]/page.tsx` —
 * dort ist er als JSX strukturiert, damit Komponenten wie Code-Blöcke,
 * Quotes und Charts genutzt werden können (ohne MDX-Build-Overhead).
 */

export interface BlogPost {
    slug: string;
    title: string;
    /** SEO meta-description (max 160 Zeichen). */
    description: string;
    /** Aufzählung der primären Long-Tail-Keywords, gegen die der Artikel rankt. */
    keywords: string[];
    /** ISO-8601 Veröffentlichungsdatum. */
    publishedAt: string;
    /** ISO-8601 letztes Update — wird im Schema als `dateModified` ausgespielt. */
    updatedAt: string;
    /** Geschätzte Lesezeit in Minuten. */
    readingMinutes: number;
    /** Eyebrow-Kategorie (z.B. „Operations", „Tutorial", „Branche"). */
    category: string;
    /** Kurzer Ein-Satz-Excerpt für die Übersichts-Card. */
    excerpt: string;
}

const corePosts: BlogPost[] = [
    {
        slug: 'retourenquote-autoteilhandel-senken',
        title: 'Retourenquote im Autoteilehandel senken — ein 90-Tage-Plan',
        description:
            'Wie Teilehändler ihre Retourenquote senken können: 5 Ursachen-Cluster, mehrstufige OEM-Validierung und ein konkreter 90-Tage-Plan mit Modellrechnung.',
        keywords: [
            'Retourenquote senken Autoteile',
            'Retouren Aftermarket reduzieren',
            'OEM-Matching Validierung',
            'Marge Teilehandel',
            'Retouren Ursachen Werkstatt',
        ],
        publishedAt: '2026-04-12',
        updatedAt: '2026-05-22',
        readingMinutes: 9,
        category: 'Operations',
        excerpt:
            'Jede Retoure kostet Versand, Wiedereinlagerung, Kundenvertrauen — und Marge. Hier ist der konkrete 90-Tage-Plan, mit dem Teilehändler ihre Quote modellhaft von 19 % auf unter 5 % senken können.',
    },
    {
        slug: 'whatsapp-bot-fuer-autoteilhaendler',
        title: 'WhatsApp-Bot für Autoteilehändler — Setup, Pricing, Best Practices',
        description:
            'Vollständiger Leitfaden zur Einführung eines WhatsApp-Bots im Teilehandel: Cloud-API, Vorkasse-Flow, Mehrsprachigkeit und ROI-Rechnung.',
        keywords: [
            'WhatsApp Bot Autoteile',
            'WhatsApp Business API Teilehandel',
            'Bot Werkstatt Anfragen',
            'Vorkasse WhatsApp',
            'Mehrsprachiger Bot Aftermarket',
        ],
        publishedAt: '2026-05-03',
        updatedAt: '2026-05-26',
        readingMinutes: 11,
        category: 'Tutorial',
        excerpt:
            'Wie Sie einen WhatsApp-Bot für Ihren Teilehandel in 14 Tagen live bekommen — von der Nummern-Migration bis zum Vorkasse-Flow.',
    },
    {
        slug: 'oem-ermittlung-aus-vin-hsn-tsn',
        title: 'OEM-Ermittlung aus VIN, HSN/TSN und Fahrzeugschein-Foto — wie es technisch funktioniert',
        description:
            'Wie moderne KI Fahrzeugscheine liest und in Sekunden die richtige OEM-Nummer findet — Teilekatalog-Cross-Reference, Konfidenz-Scoring, Fallbacks bei US-Imports.',
        keywords: [
            'OEM Nummer finden',
            'OEM aus VIN',
            'HSN TSN Teile suchen',
            'Teilekatalog Cross-Reference',
            'Fahrzeugschein OCR',
        ],
        publishedAt: '2026-05-18',
        updatedAt: '2026-05-28',
        readingMinutes: 8,
        category: 'Tech-Deep-Dive',
        excerpt:
            'Vom Foto zum OEM in Sekunden. Was in der Pipeline passiert — von der OCR über die Katalog-Cross-Reference bis zum Konfidenz-Scoring.',
    },
];

// Generated SEO Ratgeber articles (block-authored) extend the core posts.
// Import is value-level; blog-articles-data only type-imports BlogPost (no cycle).
import { generatedArticles } from './blog-articles-data';

export const blogPosts: BlogPost[] = [...corePosts, ...generatedArticles.map((a) => a.meta)];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
    blogPosts.find((p) => p.slug === slug);
