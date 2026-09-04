import type { ProductImageId } from './product-images';

export type SolutionIcon =
  | 'inbox'
  | 'scan'
  | 'cart'
  | 'procurement'
  | 'warehouse'
  | 'returns'
  | 'finance'
  | 'assistant'
  | 'mobile';

export type SolutionVisual =
  | 'inquiry'
  | 'oem'
  | 'order'
  | 'procurement'
  | 'inventory'
  | 'returns'
  | 'finance'
  | 'assistant'
  | 'mobile';

export type SolutionPageData = {
  slug: string;
  navLabel: string;
  group: 'Verkaufen' | 'Ware bewegen' | 'Betrieb führen';
  icon: SolutionIcon;
  visual: SolutionVisual;
  eyebrow: string;
  title: string;
  intro: string;
  promise: string;
  screenshot?: ProductImageId;
  screenshotAlt?: string;
  without: string[];
  withPartsunion: string[];
  workflow: Array<{ number: string; title: string; text: string }>;
  capabilities: Array<{ title: string; text: string }>;
  controlTitle: string;
  controlText: string;
  related: string[];
};

export const solutionPages: SolutionPageData[] = [
  {
    slug: 'anfragen-whatsapp',
    navLabel: 'Anfrage',
    group: 'Verkaufen',
    icon: 'inbox',
    visual: 'inquiry',
    eyebrow: 'Theke und WhatsApp in einem System',
    title: 'Aus der Anfrage wird direkt ein Angebot.',
    intro:
      'Egal ob WhatsApp, Telefon, Theke oder E-Mail: Partsunion erfasst und strukturiert Anfragen automatisch, führt Kunde, Fahrzeug und Teilebedarf zusammen und macht sie direkt für die weitere Bearbeitung bereit.',
    promise: 'Weniger Rückfragen. Weniger suchen. Mehr Anfragen sauber bearbeiten.',
    screenshot: 'whatsapp-dialog',
    without: [
      'Thekenfall und WhatsApp getrennt bearbeiten',
      'Fahrzeugdaten in Notizen oder im Kopf',
      'Rückfragen ohne sichtbaren Bearbeitungsstand',
      'Angebot später erneut aus dem Chat abtippen',
    ],
    withPartsunion: [
      'Theke und WhatsApp gemeinsam unter Anfragen',
      'Fahrzeugschein und Originalnachricht bleiben erhalten',
      'Kunde, Fahrzeug und Teil werden verbunden',
      'Angebot entsteht automatisch aus der geprüften Auswahl',
    ],
    workflow: [
      {
        number: '01',
        title: 'Anfrage',
        text: 'Thekenfall oder WhatsApp-Anfrage landet im gemeinsamen Arbeitsvorrat.',
      },
      {
        number: '02',
        title: 'Kundendaten',
        text: 'Kunde, Kontakt und Fahrzeug werden automatisch zusammengeführt.',
      },
      {
        number: '03',
        title: 'Teilebedarf',
        text: 'Text, Foto oder Sprachnachricht wird als konkreter Bedarf erfasst.',
      },
      {
        number: '04',
        title: 'Bearbeitung',
        text: 'Rückfragen, Teileidentifikation, Preis und Verfügbarkeit werden automatisiert bearbeitet.',
      },
      {
        number: '05',
        title: 'Angebot',
        text: 'Aus der geprüften Auswahl wird automatisch das passende Angebot erstellt.',
      },
    ],
    capabilities: [
      {
        title: 'Ein System für Theke und WhatsApp',
        text: 'Kanalfilter, Zuständigkeit und Status schaffen einen gemeinsamen Arbeitsvorrat unter Anfragen.',
      },
      {
        title: 'WhatsApp in fünf Sprachen',
        text: 'Deutsch, Englisch, Türkisch, Kurdisch und Polnisch führen durch denselben Teileablauf.',
      },
      {
        title: 'Fahrzeug am Vorgang',
        text: 'VIN, HSN/TSN, Modell und Dokumente stehen dort, wo die Teileentscheidung getroffen wird.',
      },
      {
        title: 'Übergabe ohne Medienbruch',
        text: 'Die geprüfte Anfrage kann in Angebot, Auftrag, Retoure oder Reklamation weitergeführt werden.',
      },
    ],
    controlTitle: 'Automatisierung stoppt dort, wo Fachwissen gefragt ist.',
    controlText:
      'Fehlen Fahrzeugdaten oder kommen mehrere Ausführungen infrage, landet der Fall sichtbar bei einem Mitarbeiter. Erst nach der Prüfung wird die Auswahl weitergeführt.',
    related: ['oe-ermittlung', 'angebot-auftrag', 'betriebsassistent'],
  },
  {
    slug: 'oe-ermittlung',
    navLabel: 'OE-Ermittlung',
    group: 'Verkaufen',
    icon: 'scan',
    visual: 'oem',
    screenshot: 'oe-ermittlung',
    eyebrow: 'Automatische OE-Ermittlung · 56 Marken mit Nutzungsrechten',
    title: 'Automatische OE-Ermittlung für den Autoteilehandel.',
    intro:
      'Partsunion übernimmt VIN, HSN/TSN oder Fahrzeugschein, prüft die angebundenen Herstellerkataloge und erkennt fehlende Angaben. Nötige Rückfragen wären auch bei manueller Bearbeitung erforderlich – Partsunion stellt sie automatisch und führt die Antwort direkt in der OE-Ermittlung weiter.',
    promise: 'Genaue OE-Ermittlung statt Teilenummern auf Verdacht.',
    without: [
      'Fahrzeugdaten und Teilebedarf manuell übertragen',
      'Zwischen mehreren Katalogfenstern springen',
      'Fehlende Angaben selbst erkennen und nachfragen',
      'Preis und Bestand erst nach der Ermittlung suchen',
    ],
    withPartsunion: [
      'Fahrzeugdaten werden automatisch übernommen',
      'Herstellerkataloge werden im passenden Kontext geprüft',
      'Notwendige Rückfragen werden automatisch gestellt',
      'OE-Bezug, Alternativen, Preis und Bestand kommen zusammen',
    ],
    workflow: [
      {
        number: '01',
        title: 'Fahrzeug automatisch übernehmen',
        text: 'VIN, Fahrzeugschein oder HSN/TSN werden als eindeutiger Startpunkt zusammengeführt.',
      },
      {
        number: '02',
        title: 'Kataloge automatisch prüfen',
        text: 'Baugruppe und Kundenwunsch werden im passenden Fahrzeugkontext abgeglichen.',
      },
      {
        number: '03',
        title: 'Fehlende Angaben erfragen',
        text: 'Partsunion stellt dieselben fachlichen Rückfragen, die sonst ein Mitarbeiter stellen müsste.',
      },
      {
        number: '04',
        title: 'Artikel verkaufsfertig machen',
        text: 'OE-Bezug, Alternativen, eigener Bestand und Preis werden automatisch zusammengeführt.',
      },
    ],
    capabilities: [
      {
        title: 'Nutzungsrechte für 56 Marken',
        text: 'Partsunion nutzt Fahrzeug- und Katalogdaten von 56 Marken mit den entsprechenden Nutzungsrechten.',
      },
      {
        title: '80 % weltweite VIN-Decodierung',
        text: 'Partsunion kann 80 % der weltweiten VINs decodieren. Diese Abdeckung betrifft die Fahrzeugidentifikation; die eindeutige OE-Zuordnung hängt zusätzlich von Teilebedarf, Ausführung und Katalogdaten ab.',
      },
      {
        title: 'Automatische Rückfragen',
        text: 'Fehlt eine fachlich notwendige Angabe, wird sie gezielt erfragt und direkt weiterverarbeitet.',
      },
      {
        title: 'Eigene Artikeldaten',
        text: 'Katalogergebnis trifft automatisch auf deinen Bestand, deine Preise und deine Sortimentslogik.',
      },
    ],
    controlTitle: 'Automatisierung mit fachlicher Kontrolle.',
    controlText:
      'Wenn Ausstattung oder Ausführung nicht eindeutig ist, stellt Partsunion die notwendige Rückfrage automatisch. Reicht auch die Antwort nicht für eine sichere Zuordnung, bleibt der Klärbedarf sichtbar und ein Mitarbeiter übernimmt mit dem vollständigen bisherigen Stand.',
    related: ['anfragen-whatsapp', 'angebot-auftrag', 'bestand-lager'],
  },
  {
    slug: 'angebot-auftrag',
    navLabel: 'Angebot & Auftrag',
    group: 'Verkaufen',
    icon: 'cart',
    visual: 'order',
    eyebrow: 'Von der Anfrage bis zur bezahlten Rechnung',
    title: 'Aus der geprüften Anfrage wird ein vollständiger Auftrag.',
    intro:
      'Kunde, Fahrzeug, Teileauswahl, Preis und Verfügbarkeit gehen in den Verkauf weiter. Angebot, Auftrag und Rechnung bleiben verbunden. Zahlungsdienste werden je nach Vertrag und Freischaltung angebunden.',
    promise: 'Einmal geklärt. Im nächsten Beleg weiterverwenden.',
    screenshot: 'verkauf-auftrag',
    without: [
      'Angebot aus Chat und Katalog neu tippen',
      'Kundenzusage manuell in einen Auftrag übertragen',
      'Zahlungsstatus aus Nachrichten zusammensuchen',
      'Rechnung nachträglich aus dem Auftrag bauen',
    ],
    withPartsunion: [
      'Anfragedaten direkt im Verkaufsauftrag',
      'Angebot aus der geprüften Auswahl erstellen',
      'Zahlung dem Auftrag zuordnen',
      'Auftrag und Rechnung zusammen weiterführen',
    ],
    workflow: [
      {
        number: '01',
        title: 'Anfrage übernehmen',
        text: 'Kunde, Fahrzeug, geprüfte Teile, Preis und Verfügbarkeit gehen vollständig weiter.',
      },
      {
        number: '02',
        title: 'Angebot erstellen',
        text: 'Die geprüfte Auswahl bildet das Angebot mit Preis, Menge und Konditionen.',
      },
      {
        number: '03',
        title: 'Auftrag weiterführen',
        text: 'Nach der Kundenzusage wird der Auftrag weiterbearbeitet. Liefer- und Zahlungsstatus bleiben zugeordnet.',
      },
      {
        number: '04',
        title: 'Rechnung abschließen',
        text: 'Die Rechnung baut auf den vorhandenen Auftragsdaten auf. Freigaben folgen den vereinbarten Regeln.',
      },
    ],
    capabilities: [
      {
        title: 'Vollständige Datenübergabe',
        text: 'Kunde, Fahrzeug, Teilebedarf, OE-Bezug, Preis und Verfügbarkeit stehen direkt im Dashboard.',
      },
      {
        title: 'Zahlungsanbindung nach Einrichtung',
        text: 'Zahlungsanbieter und mögliche Zahlungslinks werden mit deinem Vertrag und der technischen Freischaltung abgestimmt.',
      },
      {
        title: 'Automatische Belegkette',
        text: 'Anfrage, Angebot, Auftrag, Rechnung und Zahlung bleiben verbunden und werden anhand festgelegter Auslöser weitergeführt.',
      },
      {
        title: 'Ausnahmen statt Handarbeit',
        text: 'Eindeutige Vorgänge laufen durch; nur unklare oder freigabepflichtige Fälle kommen in die Bearbeitung.',
      },
    ],
    controlTitle: 'Freigaben bleiben nachvollziehbar.',
    controlText:
      'Preis, Verfügbarkeit, Kundenzusage und Pflichtangaben müssen geklärt sein, bevor ein Auftrag weitergeführt wird. Abweichungen bleiben sichtbar. Welche Schritte automatisch vorbereitet werden, wird mit den Regeln deines Betriebs eingerichtet.',
    related: ['anfragen-whatsapp', 'einkauf-disposition', 'finanzen-kasse'],
  },
  {
    slug: 'einkauf-disposition',
    navLabel: 'Einkauf & Disposition',
    group: 'Ware bewegen',
    icon: 'procurement',
    visual: 'procurement',
    screenshot: 'einkauf-bestellung',
    eyebrow: 'Fehlmengen kontrolliert decken',
    title: 'Beschaffung beginnt am echten Bedarf – nicht in einer Nebenliste.',
    intro:
      'Partsunion erkennt Fehlmengen am Kundenauftrag und verbindet sie mit Bestand, offenen Zugängen und Lieferantenkonditionen. Daraus entsteht ein prüfbarer Bestellvorschlag statt einer Blindbestellung.',
    promise: 'Weniger suchen. Klarer entscheiden. Kontrolliert bestellen.',
    without: [
      'Fehlmengen aus Aufträgen zusammensuchen',
      'Bestand und offene Bestellungen getrennt prüfen',
      'Lieferantenpreise manuell vergleichen',
      'Bestellung ohne sichtbaren Ursprungsbedarf',
    ],
    withPartsunion: [
      'Bedarf direkt aus Kundenauftrag und Mindestbestand',
      'Lokaler Bestand und Zugänge zuerst berücksichtigt',
      'Konditionen und Lieferzeit vergleichbar',
      'Bestellentwurf mit nachvollziehbarer Herkunft',
    ],
    workflow: [
      {
        number: '01',
        title: 'Bedarf erkennen',
        text: 'Auftragsfehlmenge oder Mindestbestand löst einen prüfbaren Bedarf aus.',
      },
      {
        number: '02',
        title: 'Deckung prüfen',
        text: 'Bestand, Reservierungen, Transfers und offene Zugänge werden berücksichtigt.',
      },
      {
        number: '03',
        title: 'Quelle auswählen',
        text: 'Lieferant, Kondition, Lieferzeit und Menge werden verglichen.',
      },
      {
        number: '04',
        title: 'Bestellung freigeben',
        text: 'Der Entwurf wird geprüft und erst danach verbindlich ausgelöst.',
      },
    ],
    capabilities: [
      {
        title: 'Bedarf mit Herkunft',
        text: 'Jede vorgeschlagene Menge bleibt mit Auftrag oder Bestandsregel verbunden.',
      },
      {
        title: 'Versorgungslage',
        text: 'Lager, Reservierung, Zulauf und Fehlmenge ergeben einen gemeinsamen Stand.',
      },
      {
        title: 'Lieferantenvergleich',
        text: 'Preis, Lieferzeit und freigegebene Konditionen fließen in die Entscheidung.',
      },
      {
        title: 'Bestell- und Wareneingangskette',
        text: 'Vom Entwurf bis zum Zugang bleibt der Beschaffungsvorgang nachvollziehbar.',
      },
    ],
    controlTitle: 'Bestellvorschlag ist nicht automatisch Bestellung.',
    controlText:
      'Der Vorschlag zeigt, warum und wofür beschafft werden soll. Verbindliche Bestellungen bleiben an Rechte, Freigaben und bestätigte Lieferantenanbindungen gebunden.',
    related: ['angebot-auftrag', 'bestand-lager', 'betriebsassistent'],
  },
  {
    slug: 'bestand-lager',
    navLabel: 'Bestand & Lager',
    group: 'Ware bewegen',
    icon: 'warehouse',
    visual: 'inventory',
    eyebrow: 'Neuware und Gebrauchtteile in einer WaWi',
    title: 'Jede Menge hat einen Grund. Jedes Gebrauchtteil eine Identität.',
    intro:
      'Partsunion führt Mengenartikel und konkrete Gebrauchtteile in einer gemeinsamen Warenwirtschaft. Bestand, Reservierung, Lagerort, Einkauf, Verkauf, Retoure und Reklamation bleiben nachvollziehbar.',
    promise: 'Bestand verstehen – nicht nur eine Zahl anzeigen.',
    screenshot: 'lager-artikel',
    without: [
      'Bestand als überschreibbare Zahl',
      'Gebrauchtteile in separaten Listen',
      'Reservierungen ohne Auftragsbezug',
      'Lagerwert und Marge erst nach Export sichtbar',
    ],
    withPartsunion: [
      'Bewegungsjournal statt stiller Bestandsänderung',
      'Neuware und Gebrauchtteile fachlich getrennt',
      'Reservierung, Zulauf und verfügbarer Bestand',
      'Lagerort, Wert und Marge am Artikel',
    ],
    workflow: [
      {
        number: '01',
        title: 'Ware erfassen',
        text: 'Artikel, Identität, Menge und Herkunft werden sauber angelegt.',
      },
      {
        number: '02',
        title: 'Einlagern',
        text: 'Wareneingang, Prüfung und Lagerort bilden den neuen Stand.',
      },
      {
        number: '03',
        title: 'Reservieren & bewegen',
        text: 'Auftrag, Transfer, Kommissionierung und Korrektur erzeugen Bewegungen.',
      },
      {
        number: '04',
        title: 'Auswerten',
        text: 'Bestand, Reichweite, Lagerwert und Abweichungen bleiben erklärbar.',
      },
    ],
    capabilities: [
      {
        title: 'Mengenbestand',
        text: 'Verfügbar, reserviert, im Zulauf und unter Mindestbestand werden getrennt sichtbar.',
      },
      {
        title: 'Gebrauchtteillogik',
        text: 'Zustand, Fotos, Herkunft und individueller Wert gehören zum konkreten Exemplar.',
      },
      {
        title: 'Lagerorte & Bewegungen',
        text: 'Jede Zu- und Abbuchung bleibt mit Ort, Zeitpunkt und Geschäftsvorgang verbunden.',
      },
      {
        title: 'Sortimentssteuerung',
        text: 'Bestand, EK, VK, Marge und Nachfrage schaffen eine gemeinsame Entscheidungsbasis.',
      },
    ],
    controlTitle: 'Kein Bestand verschwindet still.',
    controlText:
      'Korrekturen und buchungswirksame Bewegungen bleiben nachvollziehbar. Rollen und Prüfprozesse sichern kritische Änderungen ab.',
    related: ['einkauf-disposition', 'retouren', 'finanzen-kasse'],
  },
  {
    slug: 'retouren',
    navLabel: 'Retouren & Reklamationen',
    group: 'Ware bewegen',
    icon: 'returns',
    visual: 'returns',
    screenshot: 'retouren-rma',
    eyebrow: 'Rückgaben und Mängel sauber bearbeiten',
    title: 'Retoure oder Reklamation in einem Zug statt mühseliger Kleinarbeit.',
    intro:
      'Artikelnummer abfotografieren, Ursprungsbeleg finden und den Fall klar einordnen: normale Rückgabe, defektes Teil, Falschlieferung oder Lieferantenreklamation. Grund, Zustand, Fotos, Verantwortung und Bearbeitungsstand bleiben am selben Vorgang.',
    promise: 'Weniger Tipparbeit. Vollständiger Kontext. Klare Entscheidung.',
    without: [
      'Rückgabe und Reklamation auf Zetteln vermischen',
      'Artikel und Ursprungsbeleg zusammensuchen',
      'Fotos unverbunden auf dem Handy',
      'Bestand oder Gutschrift zu früh verändern',
    ],
    withPartsunion: [
      'Retoure oder Reklamation direkt am Teil erfassen',
      'Ursprungsbeleg und Verantwortlichkeit zuordnen',
      'Optionale Zustandsfotos am Vorgang',
      'Kunden- und Lieferantenfall mit eigenem Status bearbeiten',
    ],
    workflow: [
      {
        number: '01',
        title: 'Artikel erfassen',
        text: 'Nummer scannen oder fotografieren; Teil und Beleg werden gesucht.',
      },
      {
        number: '02',
        title: 'Ursprung verbinden',
        text: 'Verkauf, Auftrag oder Wareneingang werden dem Teil eindeutig zugeordnet.',
      },
      {
        number: '03',
        title: 'Fall einordnen',
        text: 'Rückgabe, Defekt, Falschlieferung und Verantwortlichkeit werden unterschieden.',
      },
      {
        number: '04',
        title: 'Folgen bearbeiten',
        text: 'Erst nach Prüfung folgen Bestand, Gutschrift, Erstattung oder Lieferantenreklamation.',
      },
    ],
    capabilities: [
      {
        title: 'Kundenretoure',
        text: 'Rückgabegrund, Verkaufsposition, Menge und ursprüngliche Kondition bleiben am Fall.',
      },
      {
        title: 'Kundenreklamation',
        text: 'Defekte oder falsche Teile können mit Beschreibung und optionalen Fotos gemeldet werden.',
      },
      {
        title: 'Lieferantenreklamation',
        text: 'Fehlmenge, Übermenge, Falschteil oder Beschädigung erhalten einen eigenen Bearbeitungsstand.',
      },
      {
        title: 'Getrennte Auswirkungen',
        text: 'Bestand, Gutschrift, Erstattung und Reklamationsstatus werden nicht still gekoppelt.',
      },
    ],
    controlTitle: 'Erfassen ist noch keine Gutschrift.',
    controlText:
      'Eine Retoure oder Reklamation verändert weder automatisch den Bestand noch erzeugt sie still eine Gutschrift. Erst die fachliche Entscheidung löst Wiedereinlagerung, Erstattung oder die weitere Bearbeitung beim Lieferanten aus.',
    related: ['haendler-app', 'bestand-lager', 'finanzen-kasse'],
  },
  {
    slug: 'finanzen-kasse',
    navLabel: 'Kassensystem & Finanzen',
    group: 'Betrieb führen',
    icon: 'finance',
    visual: 'finance',
    eyebrow: 'Belege, offene Posten und Zahlungen',
    title: 'Die Bezahlungskette gehört zum Auftrag – nicht in eine Sackgasse.',
    intro:
      'Partsunion verbindet Verkauf und Einkauf mit Rechnungen, Zahlungen, offenen Posten und Kasse. So bleibt sichtbar, welcher Geschäftsvorgang hinter einer Buchung steht und was noch offen ist.',
    promise: 'Vom Angebot bis zur Zahlung ein gemeinsamer Stand.',
    screenshot: 'kasse-verkauf',
    without: [
      'Rechnung ohne direkten Auftragskontext',
      'Zahlung in einer separaten Liste nachpflegen',
      'Offene Posten erst im Monatsabschluss sehen',
      'Kasse, Tagesabschluss und Rechnung getrennt betrachten',
    ],
    withPartsunion: [
      'Belegfluss direkt am Geschäftsvorgang',
      'Rechnung, Zahlung und Restbetrag verbunden',
      'Offene Posten als Arbeitsvorrat',
      'Theke, Kasse und Finanzbereich auf derselben Datenbasis',
    ],
    workflow: [
      {
        number: '01',
        title: 'Leistung belegen',
        text: 'Lieferschein und Rechnung übernehmen den geprüften Auftragsstand.',
      },
      {
        number: '02',
        title: 'Zahlung zuordnen',
        text: 'Kasse, Banking oder manuelle Erfassung gleichen den Beleg aus.',
      },
      {
        number: '03',
        title: 'Offenes bearbeiten',
        text: 'Restbeträge, Fälligkeiten und Mahnschritte werden sichtbar.',
      },
      {
        number: '04',
        title: 'Abschluss vorbereiten',
        text: 'Tagesabschluss, Auswertung und Exporte arbeiten auf derselben Belegbasis.',
      },
    ],
    capabilities: [
      {
        title: 'Rechnungen & Gutschriften',
        text: 'Belege bleiben mit Kunde, Auftrag, Positionen und Steuerlogik verbunden.',
      },
      {
        title: 'Offene Posten',
        text: 'Fälligkeit, Restbetrag, Zahlung und Bearbeitungsstand sind gemeinsam sichtbar.',
      },
      {
        title: 'Theke & Kasse',
        text: 'Zahlungen werden dem Verkauf zugeordnet. TSE und Kartenterminal hängen von der konkret eingerichteten Anbindung ab.',
      },
      {
        title: 'Finanzübersicht',
        text: 'Umsatz, Forderungen und Zahlungsstatus werden Teil des operativen Tagesgeschäfts.',
      },
    ],
    controlTitle: 'Buchungen bleiben nachvollziehbar.',
    controlText:
      'Finanzwirksame Schritte werden über Rollen, Belegstatus und Freigaben abgesichert. Der Betriebsassistent kann vorbereiten – gebucht wird erst nach Bestätigung.',
    related: ['angebot-auftrag', 'betriebsassistent', 'retouren'],
  },
  {
    slug: 'betriebsassistent',
    navLabel: 'Betriebsassistent',
    group: 'Betrieb führen',
    icon: 'assistant',
    visual: 'assistant',
    screenshot: 'assistent-arbeitsablaeufe',
    eyebrow: 'Dein Betrieb. Eine Frage entfernt.',
    title: 'Dein persönlicher Begleiter für Zahlen, Vorgänge und nächste Schritte.',
    intro:
      'Frag nach Produkten, Bestand, Aufträgen, Retouren, Reklamationen, Umsatz, Forderungen oder offenen Aufgaben. Der Betriebsassistent verbindet freigegebenes Betriebswissen mit dem aktuellen Vorgang, erklärt die Lage und kann die nächste Bearbeitung direkt vorbereiten.',
    promise: 'Fragen. Entscheiden. Erledigen lassen.',
    without: [
      'Zahlen aus mehreren Modulen zusammensuchen',
      'Kollegen für jeden Vorgangsstand unterbrechen',
      'Aufgaben aus einer Antwort manuell anlegen',
      'Allgemeiner Chatbot ohne Betriebs- und Seitenkontext',
    ],
    withPartsunion: [
      'Antworten aus freigegebenen Betriebsdaten',
      'Aktueller Kunde oder Auftrag als Kontext',
      'Empfehlung mit nachvollziehbarer Datenlage',
      'Aktion vorbereiten, sichtbar bestätigen, kontrolliert ausführen',
    ],
    workflow: [
      {
        number: '01',
        title: 'Frage stellen',
        text: 'Eine einzelne Frage oder ein gebündeltes Chef-Briefing startet die Prüfung.',
      },
      {
        number: '02',
        title: 'Betrieb verstehen',
        text: 'Der Assistent verbindet freigegebene Objekte, Zahlen und aktuellen Seitenkontext.',
      },
      {
        number: '03',
        title: 'Entscheidung erklären',
        text: 'Ergebnis, Priorität, Risiko und nächster Schritt werden verständlich dargestellt.',
      },
      {
        number: '04',
        title: 'Bearbeitung freigeben',
        text: 'Du bestätigst den vorbereiteten Schritt; erst dann wird er ausgeführt.',
      },
    ],
    capabilities: [
      {
        title: 'Chef-Briefing',
        text: 'Aufgaben, Umsatz, Forderungen und Bestand als aktuelles Lagebild.',
      },
      {
        title: 'Vertrieb steuern',
        text: 'Angebote, neue Bestellungen, Kommissionierung und Rückstände gemeinsam betrachten.',
      },
      {
        title: 'Einkauf absichern',
        text: 'Wareneingänge, Abweichungen, Rechnungen und Klärfälle priorisieren.',
      },
      {
        title: 'Operativ bearbeiten',
        text: 'Teileangebot, Bestellentwurf oder Vorgangsschritt im Kontext vorbereiten.',
      },
    ],
    controlTitle: 'Ein Assistent mit Leitplanken.',
    controlText:
      'Er sieht nur freigegebene Daten, respektiert Rollen und führt geschäftliche Änderungen erst nach deiner sichtbaren Bestätigung aus. So bleibt aus Komfort keine stille Automatik.',
    related: ['anfragen-whatsapp', 'einkauf-disposition', 'finanzen-kasse'],
  },
  {
    slug: 'haendler-app',
    navLabel: 'Händler-App',
    group: 'Betrieb führen',
    icon: 'mobile',
    visual: 'mobile',
    eyebrow: 'Teilearbeit direkt am Fahrzeug, Regal oder Paket',
    title: 'Die Arbeit kommt aufs Handy – ohne ein zweites Datensilo.',
    intro:
      'Die Partsunion Händler-App bringt Erfassung dorthin, wo das Teil liegt. Artikelnummern, Fotos, Fahrzeuge, Retouren und Reklamationen werden mobil aufgenommen und stehen anschließend direkt im passenden Vorgang der Warenwirtschaft.',
    promise: 'Draußen erfassen. Drinnen ohne Neuerfassung weiterarbeiten.',
    without: [
      'Fotos später aus der Galerie sortieren',
      'Artikelnummern vom Zettel übertragen',
      'Mobiler Vorgang ohne Verbindung zur WaWi',
      'Bestands- oder Finanzwirkung ohne Prüfung',
    ],
    withPartsunion: [
      'Kamera für Artikelnummer und Dokument',
      'Vorgang direkt Kunde, Auftrag, Retoure oder Reklamation zuordnen',
      'Optionale Fotos am richtigen Datensatz',
      'Im Desktop auf demselben Stand weiterarbeiten',
    ],
    workflow: [
      {
        number: '01',
        title: 'Am Teil starten',
        text: 'Nummer, Label, Dokument oder Zustand mit dem Handy erfassen.',
      },
      {
        number: '02',
        title: 'Vorgang zuordnen',
        text: 'Kunde, Auftrag, Artikel oder Ursprungsbeleg liefern den Kontext.',
      },
      {
        number: '03',
        title: 'Daten ergänzen',
        text: 'Menge, Grund, Notiz und optionale Fotos vervollständigen die Erfassung.',
      },
      {
        number: '04',
        title: 'Im Betrieb übernehmen',
        text: 'Der Entwurf erscheint direkt im passenden Arbeitsvorrat zur Prüfung.',
      },
    ],
    capabilities: [
      {
        title: 'Artikelnummer fotografieren',
        text: 'Die Kamera startet den Vorgang direkt am physischen Teil.',
      },
      {
        title: 'Fahrzeugschein erfassen',
        text: 'Fahrzeugdaten werden für Anfrage und Teileprüfung vorbereitet.',
      },
      {
        title: 'Retoure oder Reklamation dokumentieren',
        text: 'Fallart, Grund, Zustand, Beleg und optionale Fotos ergeben einen prüfbaren Entwurf.',
      },
      {
        title: 'Ein gemeinsamer Datenstand',
        text: 'Mobile Erfassung und Desktop-Bearbeitung arbeiten am selben Geschäftsvorgang.',
      },
    ],
    controlTitle: 'Mobil erfassen, zentral entscheiden.',
    controlText:
      'Die App erzeugt vollständige, prüfbare Entwürfe. Kritische Bestands- oder Finanzschritte bleiben in der zentralen Rollen- und Freigabelogik.',
    related: ['retouren', 'anfragen-whatsapp', 'bestand-lager'],
  },
];

export function getSolutionPage(slug: string) {
  return solutionPages.find((page) => page.slug === slug);
}
