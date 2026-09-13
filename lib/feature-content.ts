export type FeatureFamily = "vehicle" | "chat" | "stock" | "return" | "finance" | "mobile" | "core";

type FamilyContent = {
  audience: string;
  source: string;
  connection: string;
  result: string;
  scenarios: { title: string; text: string }[];
};

const familyContent: Record<FeatureFamily, FamilyContent> = {
  vehicle: {
    audience: "Autoteilehändler, die Fahrzeuge und Teile regelmäßig anhand von Fahrzeugschein, VIN, HSN/TSN oder OE-Nummern zuordnen.",
    source: "Fahrzeugdaten, Dokumente und Teilewunsch",
    connection: "Fahrzeugakte, OE-Ermittlung, Angebot und Retoure",
    result: "Eine nachvollziehbare Teileentscheidung mit weniger Rückfragen und Fehlbestellungen.",
    scenarios: [
      { title: "An der Theke", text: "Fahrzeug und Teilewunsch werden während des Kundengesprächs vollständig aufgenommen." },
      { title: "In der Identifikation", text: "VIN, HSN/TSN und OE-Informationen bleiben gemeinsam am Vorgang verfügbar." },
      { title: "Bei der Rückgabe", text: "Die ursprüngliche Zuordnung lässt sich prüfen, ohne Informationen erneut zusammenzusuchen." },
    ],
  },
  chat: {
    audience: "Teilehändler, die Anfragen aus WhatsApp, Bildern, Dokumenten und manuellen Eingaben gemeinsam bearbeiten möchten.",
    source: "Nachricht, Foto, Fahrzeugschein und Teilewunsch",
    connection: "Kundendialog, Fahrzeugdaten, Anfrage und Verkauf",
    result: "Eine strukturierte Anfrage, die dein Verkaufsteam direkt weiterbearbeiten kann.",
    scenarios: [
      { title: "Beim Nachrichteneingang", text: "Kanal, Absender und vorhandene Angaben werden in einem Vorgang zusammengeführt." },
      { title: "Bei fehlenden Angaben", text: "Das Team erkennt sofort, welche Fahrzeug- oder Teileinformationen noch benötigt werden." },
      { title: "Bei der Übergabe", text: "Die vollständige Anfrage landet mit Bearbeitungsstatus direkt im Verkauf." },
    ],
  },
  stock: {
    audience: "Neu- und Gebrauchtteilehändler, die Einkauf, Lagerplätze, Reservierungen und Warenbewegungen zentral steuern.",
    source: "Nachfrage, Artikel, Lieferant und aktueller Bestand",
    connection: "Bedarf, Einkauf, Wareneingang, Lager und Verkauf",
    result: "Verlässliche Bestände und ein dokumentierter Warenfluss vom Bedarf bis zur Auslieferung.",
    scenarios: [
      { title: "Vor der Beschaffung", text: "Bedarf und vorhandener Bestand werden geprüft, bevor eine Bestellung ausgelöst wird." },
      { title: "Beim Wareneingang", text: "Artikel, Menge, Zustand und Lagerplatz werden nachvollziehbar übernommen." },
      { title: "Im Verkauf", text: "Verfügbarkeit und Reservierung stehen dort bereit, wo das Angebot entsteht." },
    ],
  },
  return: {
    audience: "Teilehändler, die Retouren, Reklamationen, Zustände und Gutschriften ohne getrennte Listen bearbeiten wollen.",
    source: "Ursprungsbeleg, Rückgabegrund, Zustand und Fotos",
    connection: "Verkauf, Prüfung, Bestand, Lieferant und Gutschrift",
    result: "Ein transparenter Retourenprozess mit klarer Zuständigkeit und vollständiger Historie.",
    scenarios: [
      { title: "Bei der Annahme", text: "Rückgabegrund und Ursprungsbeleg werden direkt miteinander verbunden." },
      { title: "Während der Prüfung", text: "Zustand, Fotos und Entscheidung bleiben für das Team nachvollziehbar." },
      { title: "Beim Abschluss", text: "Bestandskorrektur, Rückversand oder Gutschrift schließen denselben Vorgang ab." },
    ],
  },
  finance: {
    audience: "Teilehändler, die Kasse, Rechnungen, Zahlungen, offene Posten und Buchhaltungsübergaben verbinden möchten.",
    source: "Auftrag, Zahlung, Konto und Beleg",
    connection: "Kasse, Forderungen, E-Rechnung, Banking und Buchhaltung",
    result: "Eine konsistente Beleg- und Zahlungskette ohne manuelle Übertragung zwischen Einzellösungen.",
    scenarios: [
      { title: "Beim Kassenabschluss", text: "Verkauf, Zahlungsart und zugehöriger Beleg bleiben eindeutig verbunden." },
      { title: "Beim Kontenabgleich", text: "Zahlungseingänge und offene Posten lassen sich im selben Kontext bearbeiten." },
      { title: "Für die Buchhaltung", text: "Relevante Belege und Informationen stehen für die weitere Übergabe strukturiert bereit." },
    ],
  },
  mobile: {
    audience: "Teilehändler, die Informationen direkt am Fahrzeug, Regal, Lagerplatz oder unterwegs erfassen müssen.",
    source: "Mobiler Vorgang, Foto, Scan und Status",
    connection: "Fahrzeugakte, Artikel, Lager und zentraler Arbeitsplatz",
    result: "Aktuelle Informationen ohne Notizzettel, späteres Abtippen oder doppelte Erfassung.",
    scenarios: [
      { title: "Direkt am Fahrzeug", text: "Fotos und Fahrzeugangaben werden dort erfasst, wo sie entstehen." },
      { title: "Direkt im Lager", text: "Teil, Zustand und Lagerplatz lassen sich dem richtigen Vorgang zuordnen." },
      { title: "Zurück im Team", text: "Neue Informationen stehen ohne zusätzliche Übergabe am zentralen Arbeitsplatz bereit." },
    ],
  },
  core: {
    audience: "Autoteilehändler, die Verkauf, Einkauf, Lager, Kasse und Verwaltung auf einer gemeinsamen Datenbasis führen möchten.",
    source: "Kunde, Fahrzeug, Teil und betrieblicher Vorgang",
    connection: "Anfrage, Angebot, Einkauf, Bestand, Rechnung und Zahlung",
    result: "Ein durchgängiger Arbeitsablauf mit weniger Medienbrüchen und einem gemeinsamen Status für das Team.",
    scenarios: [
      { title: "Im Tagesgeschäft", text: "Alle Beteiligten arbeiten mit demselben Vorgang und demselben Informationsstand." },
      { title: "Bei Ausnahmen", text: "Offene Aufgaben und fehlende Angaben werden sichtbar, bevor der Vorgang liegen bleibt." },
      { title: "Beim Abschluss", text: "Entscheidungen, Belege und Status bleiben auch später nachvollziehbar." },
    ],
  },
};

export function featureFamilyFor(path: string): FeatureFamily {
  if (/whatsapp|anfragen/.test(path)) return "chat";
  if (/oe-|oem|vin|fahrzeug|teileermittlung|retourenquote/.test(path)) return "vehicle";
  if (/lager|bestand|bestell|einkauf|disposition/.test(path)) return "stock";
  if (/retour/.test(path)) return "return";
  if (/kasse|finanz|rechnung|buchhaltung|banking|datev|tse|zugferd/.test(path)) return "finance";
  if (/app|mobil/.test(path)) return "mobile";
  return "core";
}

export function featureProfile(path: string, title: string, description: string) {
  const family = featureFamilyFor(path);
  const content = familyContent[family];
  return {
    family,
    ...content,
    faqs: [
      { question: `Was leistet ${title} in Partsunion?`, answer: `${description} Die Funktion arbeitet dabei nicht isoliert, sondern innerhalb des gemeinsamen Partsunion-Workflows.` },
      { question: `Für welche Betriebe ist ${title} geeignet?`, answer: content.audience },
      { question: `Welche Bereiche verbindet ${title}?`, answer: `${title} verbindet ${content.connection}. So bleiben Informationen am ursprünglichen Vorgang verfügbar.` },
      { question: `Welches Ergebnis entsteht im Tagesgeschäft?`, answer: content.result },
    ],
  };
}

export function canonicalPathFor(path: string) {
  if (path === "/termin") return "/beratung";
  if (path === "/bot") return "/whatsapp-bot";
  if (path === "/blog/retourenquote-autoteilehandel-senken") return "/blog/retourenquote-autoteilhandel-senken";
  return path;
}

export function isIndexablePath(path: string) {
  return canonicalPathFor(path) === path && path !== "/live-demo/teileermittlung";
}

export function seoTitleFor(path: string, title: string) {
  if (path === "/loesungen/betriebsassistent") return "Betriebsassistent: geführte Abläufe";
  if (path === "/whatsapp-bot") return "WhatsApp-Bot im Autoteilehandel";
  if (title.toLowerCase().includes("teilehandel")) return title;
  const family = featureFamilyFor(path);
  if (family === "vehicle") return `${title}: Fahrzeug & OE`;
  if (family === "chat") return `${title} im Teilehandel`;
  if (family === "stock") return `${title} im Teilehandel`;
  if (family === "return") return `${title} im Teilehandel`;
  if (family === "finance") return `${title} im Teilehandel`;
  if (family === "mobile") return `${title} für Teilehändler`;
  return `${title} im Teilehandel`;
}
