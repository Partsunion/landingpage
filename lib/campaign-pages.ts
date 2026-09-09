import type { ProductImageId } from './product-images';

export interface CampaignPage {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  accent: string;
  intro: string;
  heroImage: ProductImageId;
  heroLabel: string;
  heroCaption: string;
  benefits: string[];
  initialView: ProductImageId;
  bookingTitle: string;
  bookingIntro: string;
}

export const campaignPages: CampaignPage[] = [
  {
    slug: 'erp-autoteilehandel',
    title: 'ERP für Autoteilehandel · Persönliche Beratung',
    description:
      'Dein Teilehandel in einem System: automatische OE-Ermittlung, WhatsApp, Warenwirtschaft und Kasse. Entdecke Partsunion und buche dein Beratungsgespräch.',
    eyebrow: 'ERP & Automatisierung für Autoteilehändler',
    headline: 'Dein Teilehandel.',
    accent: 'Ein ERP. Alles verbunden.',
    intro:
      'Von der ersten Teileanfrage bis zur Zahlung: Partsunion verbindet deinen Betrieb und automatisiert die Arbeit dazwischen. Mit OE-Ermittlung, WhatsApp-Bot, Warenwirtschaft und Kasse.',
    heroImage: 'verkauf-auftrag',
    heroLabel: 'Verkauf, Bestand und Beschaffung zusammen.',
    heroCaption: 'Der Auftrag zeigt, was verfügbar ist. Und was als Nächstes gebraucht wird.',
    benefits: [
      'Fahrzeugschein auslesen & OE automatisch ermitteln',
      'WhatsApp-Anfragen bis zu Angebot & Zahlung führen',
      'Verkauf, Lager, Kasse & Banking verbinden',
    ],
    initialView: 'verkauf-auftrag',
    bookingTitle: 'So könnte dein Betrieb mit Partsunion arbeiten.',
    bookingIntro:
      'Wir schauen uns deinen Teilehandel an und zeigen dir die passenden Abläufe im System. Du erfährst, wie Einführung, Datenübernahme und Kosten für deinen Betrieb aussehen.',
  },
  {
    slug: 'warenwirtschaft-autoteilehandel',
    title: 'Warenwirtschaft für Autoteilehandel · Beratung',
    description:
      'Warenwirtschaft für Autoteilehändler: Bestand, Einkauf, Verkauf und Kasse verbunden. Mit automatischer OE-Ermittlung. Jetzt persönlich beraten lassen.',
    eyebrow: 'Warenwirtschaft für Autoteilehändler',
    headline: 'Jedes Teil im Blick.',
    accent: 'Warenwirtschaft. Alles verbunden.',
    intro:
      'Was liegt im Lager? Was ist reserviert? Was muss bestellt werden? Partsunion verbindet Bestand, Einkauf, Verkauf und Kasse – mit automatischer OE-Ermittlung und WhatsApp-Bot.',
    heroImage: 'lager-artikel',
    heroLabel: 'Deine Artikel. Dein Bestand. Ein Überblick.',
    heroCaption: 'OE-Nummern, Bestände, Mindestmengen und Preise direkt am Artikel.',
    benefits: [
      'Bestände, Reservierungen & Fehlmengen überblicken',
      'Einkauf, Verkauf & Kasse mit denselben Daten führen',
      'Neuware, gebrauchte Teile & Retouren verwalten',
    ],
    initialView: 'lager-artikel',
    bookingTitle: 'Lass uns deine Warenwirtschaft weiterdenken.',
    bookingIntro:
      'Wir sprechen über dein Sortiment, deine Lagerabläufe und dein bisheriges System. Gemeinsam klären wir die passenden Funktionen, die Datenübernahme und die Kosten.',
  },
];

export function findCampaignPage(slug: string): CampaignPage | undefined {
  return campaignPages.find((page) => page.slug === slug);
}
