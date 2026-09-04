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
      'Retouren im Teilehandel nachvollziehbar auswerten: Ursachen erfassen, einen Fehlerpfad verbessern und die Wirkung mit einem konkreten 90-Tage-Plan prüfen.',
    keywords: [
      'Retourenquote senken Autoteile',
      'Retouren Aftermarket reduzieren',
      'OEM-Matching Validierung',
      'Marge Teilehandel',
      'Retouren Ursachen Werkstatt',
    ],
    publishedAt: '2026-04-12',
    updatedAt: '2026-09-04',
    readingMinutes: 4,
    category: 'Prozesse',
    excerpt:
      'Ursachen sauber erfassen, einen konkreten Fehlerpfad verbessern und die Wirkung anhand deiner eigenen Betriebsdaten prüfen.',
  },
  {
    slug: 'whatsapp-bot-fuer-autoteilhaendler',
    title: 'WhatsApp-Bot für Autoteilehändler: Einführung und Übergabe ins Team',
    description:
      'WhatsApp im Teilehandel sinnvoll einführen: Anfragen strukturieren, Nachrichtenregeln beachten, Fachprüfungen übergeben und Kosten realistisch planen.',
    keywords: [
      'WhatsApp Bot Autoteile',
      'WhatsApp Business API Teilehandel',
      'Bot Werkstatt Anfragen',
      'Vorkasse WhatsApp',
      'Mehrsprachiger Bot Aftermarket',
    ],
    publishedAt: '2026-05-03',
    updatedAt: '2026-09-04',
    readingMinutes: 4,
    category: 'Einführung',
    excerpt:
      'Welche Daten eine Anfrage braucht, wann ein Mitarbeiter übernimmt und welche Voraussetzungen du vor dem Start klären solltest.',
  },
  {
    slug: 'oem-ermittlung-aus-vin-hsn-tsn',
    title: 'OE-Ermittlung: Fahrzeugdaten richtig lesen und Teile prüfen',
    description:
      'VIN, HSN/TSN und Fahrzeugschein richtig einordnen: Welche Daten du für die OE-Ermittlung brauchst und warum Ausführungen und Alternativen geprüft werden müssen.',
    keywords: [
      'OEM Nummer finden',
      'OEM aus VIN',
      'HSN TSN Teile suchen',
      'Teilekatalog Cross-Reference',
      'Fahrzeugschein OCR',
    ],
    publishedAt: '2026-05-18',
    updatedAt: '2026-09-04',
    readingMinutes: 4,
    category: 'Teilewissen',
    excerpt:
      'Von der Fahrzeugidentifikation zur geprüften Referenz. Mit einer konkreten Checkliste und den amtlichen Felddefinitionen des Fahrzeugscheins.',
  },
];

// Generated SEO Ratgeber articles (block-authored) extend the core posts.
// Import is value-level; blog-articles-data only type-imports BlogPost (no cycle).
import { generatedArticles } from './blog-articles-data';

export const blogPosts: BlogPost[] = [...corePosts, ...generatedArticles.map((a) => a.meta)];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);
