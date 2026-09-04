/** Reviewed screenshots of the actual Partsunion UI with local example data. */
export const productImages = {
  'oe-ermittlung': {
    title: 'OE-Ermittlung',
    width: 2070,
    height: 810,
    focus: '100% 0%',
    description:
      'OE-Suche mit Fahrzeugangaben, Fahrzeugschein-Upload und ermittelter OE-Nummer. Rechts stehen Ergebnis und Prüfpfad des lokalen Beispiels.',
  },
  'verkauf-auftrag': {
    title: 'Verkauf',
    width: 2070,
    height: 1140,
    focus: '100% 0%',
    description:
      'Geöffneter Verkaufsauftrag mit Auftragspositionen, Bestandsprüfung, sichtbaren Fehlmengen und Übergang zur Beschaffung.',
  },
  'lager-artikel': {
    title: 'Lager',
    width: 2070,
    height: 735,
    focus: '0% 0%',
    description:
      'Artikelbestand mit OE-Nummern, Bestandsmengen, Mindestbeständen sowie Einkaufs- und Verkaufspreisen.',
  },
  'whatsapp-dialog': {
    title: 'Anfragen',
    width: 2070,
    height: 810,
    focus: '100% 0%',
    description:
      'WhatsApp-Gespräch zur Wasserpumpe eines VW Golf VII, direkt neben der gemeinsamen Anfragenübersicht mit Kunde, Fahrzeug und Zuständigkeit.',
  },
  'assistent-arbeitsablaeufe': {
    title: 'Assistent',
    width: 1080,
    height: 1464,
    focus: '50% 0%',
    description:
      'Der geöffnete Betriebsassistent mit Arbeitsabläufen für Tageslage, Vertrieb, Einkauf, Retouren und Teileangebote sowie dem Eingabefeld für eigene Fragen.',
  },
  'rechnungen-uebersicht': {
    title: 'Rechnungen',
    width: 2070,
    height: 1140,
    focus: '0% 0%',
    description:
      'Rechnungsübersicht mit Kunden, Belegnummern, Beträgen, offenen Beträgen und Zahlungsstatus.',
  },
  'banking-abgleich': {
    title: 'Banking',
    width: 2070,
    height: 1302,
    focus: '0% 100%',
    description:
      'Banking mit Geschäftskonto, Kontoauszug und offenen Umsätzen einschließlich Zuordnungsvorschlägen zu Belegen.',
  },
  'einkauf-bestellung': {
    title: 'Einkauf & Disposition',
    width: 2070,
    height: 1140,
    focus: '100% 0%',
    description:
      'Einkaufsbestellung mit Lieferant, Freigabe, Liefertermin und Bestellpositionen mit Bezug zum Kundenauftrag.',
  },
  'retouren-rma': {
    title: 'Retouren & Reklamationen',
    width: 2070,
    height: 1140,
    focus: '0% 0%',
    description:
      'Geöffneter RMA-Fall mit Kunde, Rechnungsreferenz, Reklamationsgrund, Lösungsweg und betroffener Position.',
  },
  'kasse-verkauf': {
    title: 'Kasse',
    width: 2070,
    height: 1140,
    focus: '0% 0%',
    description:
      'Kassenverkauf mit Warenkorb, Steuerberechnung, Barzahlung und Rückgeld. Gezeigt wird eine lokale Demo-Konfiguration.',
  },
  'gebrauchtteile-bestand': {
    title: 'Gebrauchtteile',
    width: 2070,
    height: 840,
    focus: '100% 0%',
    description:
      'Gebrauchtteilebestand mit Spenderfahrzeug, Zustand, Qualitätsprüfung, Lagerplatz und Verkaufspreis. Rechts ist die Artikelakte geöffnet.',
  },
  arbeitstag: {
    title: 'Arbeitsbereiche',
    width: 2070,
    height: 1140,
    focus: '50% 0%',
    description:
      'Die Übersicht für den Arbeitstag mit Verkauf, Fahrzeugverwertung, aktuellen Aufträgen und Handlungsbedarf im Team.',
  },
} as const;

export type ProductImageId = keyof typeof productImages;
