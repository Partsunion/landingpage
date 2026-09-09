// Creates reviewable local drafts only. No Ads API, account mutation or spend.
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const destination = resolve('docs/google-ads');
const campaign = 'DE_Search_Teilehandel_Beratung';
const base = 'https://partsunion.de';
const groups = [
  { name: 'ERP', path: '/lp/erp-autoteilehandel', terms: [
    'erp autoteilehandel', 'erp software autoteilehandel', 'erp fahrzeugteilehandel',
    'erp teilehandel', 'software autoteilehandel', 'software für autoteilehändler',
    'kfz teilehandel software', 'branchensoftware autoteilehandel', 'software ersatzteilehandel',
  ] },
  { name: 'Warenwirtschaft', path: '/lp/warenwirtschaft-autoteilehandel', terms: [
    'warenwirtschaft autoteilehandel', 'warenwirtschaft kfz teilehandel',
    'warenwirtschaft fahrzeugteilehandel', 'wawi autoteilehandel',
    'warenwirtschaft ersatzteilehandel', 'warenwirtschaft teilehandel',
    'lagerverwaltung autoteilehandel', 'warenwirtschaftssystem autoteile',
  ] },
];

const commonHeadlines = [
  'Automatische OE-Ermittlung', 'WhatsApp-Bot mit ERP', 'Verkauf, Lager und Kasse',
  'Ein System. Alles verbunden.', 'Beratungsgespräch buchen', 'Für deinen ganzen Betrieb',
  'Partsunion kennenlernen', 'Vom Fahrzeugschein zum Teil', 'Persönlich beraten lassen',
];
const ads = [
  { group: groups[0], name: 'ERP – verbundene Abläufe', headlines: [
    'ERP für den Autoteilehandel', 'Software für Teilehändler', 'Mehr Ablauf. Weniger Eingaben.',
    'Anfrage bis Zahlung verbunden', 'Dein Teilehandel in einem ERP', 'Einkauf und Verkauf verbinden', ...commonHeadlines,
  ], descriptions: [
    'OE-Ermittlung, WhatsApp, Lager und Kasse in einem ERP. Entdecke Partsunion.',
    'Vom Fahrzeugschein bis zur Zahlung: verbundene Abläufe für deinen Autoteilehandel.',
    'Buche dein Beratungsgespräch direkt im Kalender. 30 Minuten, persönlich und unverbindlich.',
    'Wir klären Funktionen, Datenübernahme, Anbindungen und Kosten für deinen Teilehandel.',
  ] },
  { group: groups[0], name: 'ERP – Arbeitsalltag', headlines: [
    'ERP für Autoteilehändler', 'Branchensoftware Teilehandel', 'Dein Auftrag kennt den Bestand',
    'OE und Angebot verbinden', 'Retouren im selben Vorgang', 'Dein Betriebsassistent', ...commonHeadlines,
  ], descriptions: [
    'Teileanfragen aufnehmen, OE ermitteln und Angebote erstellen. Ein System für dein Team.',
    'WhatsApp-Bot und ERP verbinden Kundenanfragen mit deinen Arbeitsbereichen.',
    'Sieh dir echte Systemansichten an und buche direkt dein persönliches Beratungsgespräch.',
    'Wir planen den gemeinsamen Einstieg: Daten, Anbindungen und Schulung für dein Team.',
  ] },
  { group: groups[1], name: 'WaWi – verbundene Abläufe', headlines: [
    'WaWi für den Autoteilehandel', 'Warenwirtschaft für Kfz-Teile', 'Deine Bestände im Überblick',
    'Einkauf und Lager verbinden', 'Fehlmengen am Auftrag sehen', 'Neuware und gebrauchte Teile', ...commonHeadlines,
  ], descriptions: [
    'Bestand, Einkauf, Verkauf und Kasse verbunden. Warenwirtschaft für deinen Autoteilehandel.',
    'OE-Nummern, Bestände und Preise am Artikel. Partsunion verbindet deine Arbeitsbereiche.',
    'Wähle direkt einen Gesprächstermin. Wir klären Funktionen, Datenübernahme und Kosten.',
    'Mit automatischer OE-Ermittlung und WhatsApp-Bot. Ein System für deinen Teilehandel.',
  ] },
  { group: groups[1], name: 'WaWi – Arbeitsalltag', headlines: [
    'WaWi für Autoteilehändler', 'Software für Kfz-Teilehandel', 'Was ist da? Was fehlt?',
    'Lager und Theke verbunden', 'Retouren mit Vorgangsbezug', 'Bestand trifft Automatisierung', ...commonHeadlines,
  ], descriptions: [
    'Artikel, Reservierung und Verkauf zusammen sehen. Partsunion für Neu- und Gebrauchtteile.',
    'Von der Anfrage bis zur Rechnung arbeiten Lager, Verkauf und Kasse mit denselben Daten.',
    'Echte Systemansichten ansehen. Danach deinen Beratungstermin direkt im Kalender buchen.',
    'Eine Warenwirtschaft mit OE-Ermittlung, WhatsApp-Bot, Banking und mobilem Zugriff.',
  ] },
];

const negativeGroups = [
  ['Phrase', 'Arbeitsmarkt', ['jobs', 'ausbildung', 'praktikum', 'gehalt', 'stellenangebote']],
  ['Phrase', 'Private Teilekäufer', ['autoteile kaufen', 'ersatzteile kaufen', 'gebrauchtteile kaufen', 'bremsen kaufen']],
  ['Phrase', 'Kostenlose Hilfsangebote', ['kostenlos', 'gratis', 'open source', 'crack', 'excel vorlage']],
  ['Phrase', 'Fahrzeughistorie statt Branchensoftware', ['fahrzeughistorie', 'unfallhistorie', 'vin decoder kostenlos']],
  ['Phrase', 'Andere Kassenbranchen', ['gastronomie', 'friseur', 'imbiss']],
  ['Exact', 'Unqualifizierte Einwortsuche', ['autoteile', 'ersatzteile', 'vin decoder', 'oe nummer']],
];

const csv = (headers, rows) => '\uFEFF' + [headers, ...rows].map((row) => row.map((value) =>
  '"' + String(value ?? '').replaceAll('"', '""') + '"').join(',')).join('\r\n') + '\r\n';
const writeCsv = async (name, headers, rows) => writeFile(resolve(destination, name), csv(headers, rows));
await mkdir(destination, { recursive: true });

await writeCsv('keywords.csv', ['Campaign', 'Ad Group', 'Keyword', 'Match Type', 'Final URL', 'Status'],
  groups.flatMap((group) => group.terms.flatMap((term) => ['Exact', 'Phrase'].map((match) =>
    [campaign, group.name, term, match, base + group.path, 'Paused']))));
await writeCsv('keyword-planner.csv', ['Keyword'], groups.flatMap((group) => group.terms.map((term) => [term])));
await writeCsv('negative-keywords.csv', ['Campaign', 'Negative Keyword', 'Match Type', 'Reason'],
  negativeGroups.flatMap(([match, reason, terms]) => terms.map((term) => [campaign, term, match, reason])));

for (const ad of ads) {
  assert.equal(ad.headlines.length, 15);
  assert.equal(ad.descriptions.length, 4);
  for (const text of ad.headlines) assert.ok(text.length <= 30, `Title too long (${text.length}): ${text}`);
  for (const text of ad.descriptions) assert.ok(text.length <= 90, `Description too long (${text.length}): ${text}`);
}
await writeCsv('responsive-search-ads.csv', ['Campaign', 'Ad Group', 'Label', 'Ad Type', 'Status', 'Final URL',
  ...Array.from({ length: 15 }, (_, i) => `Headline ${i + 1}`),
  ...Array.from({ length: 4 }, (_, i) => `Description ${i + 1}`)],
  ads.map((ad) => [campaign, ad.group.name, ad.name, 'Responsive search ad', 'Paused', base + ad.group.path,
    ...ad.headlines, ...ad.descriptions]));

const sitelinks = [
  ['Das System ansehen', 'Echte Produktansichten', 'Abläufe selbst entdecken', '/lp/erp-autoteilehandel#system'],
  ['OE-Ermittlung', 'Fahrzeugschein, VIN und OE', 'Direkt im Vorgang verbunden', '/loesungen/oe-ermittlung'],
  ['Einführung & Daten', 'Den Systemwechsel vorbereiten', 'Daten und Team zusammenbringen', '/einfuehrung'],
  ['Beratungsgespräch buchen', '30 Minuten für deinen Betrieb', 'Termin direkt im Kalender', '/beratung'],
];
for (const [title, first, second] of sitelinks) {
  assert.ok(title.length <= 25 && first.length <= 35 && second.length <= 35);
}
await writeCsv('sitelinks.csv', ['Campaign', 'Link Text', 'Description Line 1', 'Description Line 2', 'Final URL'],
  sitelinks.map(([title, first, second, path]) => [campaign, title, first, second, base + path]));
console.log(`Prepared ${groups.reduce((sum, group) => sum + group.terms.length * 2, 0)} paused keywords, ${ads.length} paused ads and ${sitelinks.length} sitelinks in docs/google-ads. All ad text lengths checked. No account changed.`);
