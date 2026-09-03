export type SolutionIcon = 'inbox' | 'scan' | 'cart' | 'procurement' | 'warehouse' | 'returns' | 'finance' | 'assistant' | 'mobile';

export type SolutionVisual = 'inquiry' | 'oem' | 'order' | 'procurement' | 'inventory' | 'returns' | 'finance' | 'assistant' | 'mobile';

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
    screenshot?: string;
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
        slug: 'anfragen-whatsapp', navLabel: 'Anfrage', group: 'Verkaufen', icon: 'inbox', visual: 'inquiry',
        eyebrow: 'Theke und WhatsApp in einem System',
        title: 'Aus der Anfrage wird direkt ein Angebot.',
        intro: 'Egal ob WhatsApp, Telefon, Theke oder E-Mail: Partsunion erfasst und strukturiert Anfragen automatisch, führt Kunde, Fahrzeug und Teilebedarf zusammen und macht sie direkt für die weitere Bearbeitung bereit.',
        promise: 'Weniger Rückfragen. Weniger suchen. Mehr Anfragen sauber bearbeiten.',
        screenshot: '/product/whatsapp-vorgang.png', screenshotAlt: 'Aktuelle Partsunion Konversationsansicht einer WhatsApp-Anfrage',
        without: ['Thekenfall und WhatsApp getrennt bearbeiten', 'Fahrzeugdaten in Notizen oder im Kopf', 'Rückfragen ohne sichtbaren Bearbeitungsstand', 'Angebot später erneut aus dem Chat abtippen'],
        withPartsunion: ['Theke und WhatsApp gemeinsam unter Anfragen', 'Fahrzeugschein und Originalnachricht bleiben erhalten', 'Kunde, Fahrzeug und Teil werden verbunden', 'Angebot entsteht automatisch aus der geprüften Auswahl'],
        workflow: [
            { number: '01', title: 'Anfrage', text: 'Thekenfall oder WhatsApp-Anfrage landet im gemeinsamen Arbeitsvorrat.' },
            { number: '02', title: 'Kundendaten', text: 'Kunde, Kontakt und Fahrzeug werden automatisch zusammengeführt.' },
            { number: '03', title: 'Teilebedarf', text: 'Text, Foto oder Sprachnachricht wird als konkreter Bedarf erfasst.' },
            { number: '04', title: 'Bearbeitung', text: 'Rückfragen, Teileidentifikation, Preis und Verfügbarkeit werden automatisiert bearbeitet.' },
            { number: '05', title: 'Angebot', text: 'Aus der geprüften Auswahl wird automatisch das passende Angebot erstellt.' },
        ],
        capabilities: [
            { title: 'Ein System für Theke und WhatsApp', text: 'Kanalfilter, Zuständigkeit und Status schaffen einen gemeinsamen Arbeitsvorrat unter Anfragen.' },
            { title: 'WhatsApp in fünf Sprachen', text: 'Deutsch, Englisch, Türkisch, Kurdisch und Polnisch führen durch denselben Teileablauf.' },
            { title: 'Fahrzeug am Vorgang', text: 'VIN, HSN/TSN, Modell und Dokumente stehen dort, wo die Teileentscheidung getroffen wird.' },
            { title: 'Übergabe ohne Medienbruch', text: 'Die geprüfte Anfrage kann in Angebot, Auftrag oder Retoure weitergeführt werden.' },
        ],
        controlTitle: 'Automatisierung stoppt dort, wo Fachwissen gefragt ist.', controlText: 'Fehlen Fahrzeugdaten oder kommen mehrere Ausführungen infrage, landet der Fall sichtbar bei einem Mitarbeiter. Erst nach der Prüfung wird die Auswahl weitergeführt.',
        related: ['oe-ermittlung', 'angebot-auftrag', 'betriebsassistent'],
    },
    {
        slug: 'oe-ermittlung', navLabel: 'OE-Ermittlung', group: 'Verkaufen', icon: 'scan', visual: 'oem',
        eyebrow: '56 Marken · lizenzierte Herstellerkataloge',
        title: 'Vom Fahrzeug zum passenden Teil – automatisch geprüft.',
        intro: 'Partsunion übernimmt VIN, HSN/TSN oder Fahrzeugschein, prüft die angebundenen Herstellerkataloge und erkennt fehlende Angaben. Nötige Rückfragen wären auch bei manueller Bearbeitung erforderlich – Partsunion stellt sie automatisch und führt die Antwort direkt in der OE-Ermittlung weiter.',
        promise: 'Genaue OE-Ermittlung statt Teilenummern auf Verdacht.',
        without: ['Fahrzeugdaten und Teilebedarf manuell übertragen', 'Zwischen mehreren Katalogfenstern springen', 'Fehlende Angaben selbst erkennen und nachfragen', 'Preis und Bestand erst nach der Ermittlung suchen'],
        withPartsunion: ['Fahrzeugdaten werden automatisch übernommen', 'Herstellerkataloge werden im passenden Kontext geprüft', 'Notwendige Rückfragen werden automatisch gestellt', 'OE-Bezug, Alternativen, Preis und Bestand kommen zusammen'],
        workflow: [
            { number: '01', title: 'Fahrzeug automatisch übernehmen', text: 'VIN, Fahrzeugschein oder HSN/TSN werden als eindeutiger Startpunkt zusammengeführt.' },
            { number: '02', title: 'Kataloge automatisch prüfen', text: 'Baugruppe und Kundenwunsch werden im passenden Fahrzeugkontext abgeglichen.' },
            { number: '03', title: 'Fehlende Angaben erfragen', text: 'Partsunion stellt dieselben fachlichen Rückfragen, die sonst ein Mitarbeiter stellen müsste.' },
            { number: '04', title: 'Artikel verkaufsfertig machen', text: 'OE-Bezug, Alternativen, eigener Bestand und Preis werden automatisch zusammengeführt.' },
        ],
        capabilities: [
            { title: 'Fahrzeugdatenbank mit 56 Marken', text: 'Fahrzeugdaten bilden automatisch den Kontext für die Teile- und OE-Prüfung.' },
            { title: 'Lizenzierte Katalogdaten', text: 'Partsunion verfügt über die erforderlichen Nutzungsrechte für die angebundenen Herstellerkataloge.' },
            { title: 'Automatische Rückfragen', text: 'Fehlt eine fachlich notwendige Angabe, wird sie gezielt erfragt und direkt weiterverarbeitet.' },
            { title: 'Eigene Artikeldaten', text: 'Katalogergebnis trifft automatisch auf deinen Bestand, deine Preise und deine Sortimentslogik.' },
        ],
        controlTitle: 'Automatisierung mit fachlicher Kontrolle.', controlText: 'Wenn Ausstattung oder Ausführung nicht eindeutig ist, stellt Partsunion die notwendige Rückfrage automatisch. Reicht auch die Antwort nicht für eine sichere Zuordnung, bleibt der Klärbedarf sichtbar und ein Mitarbeiter übernimmt mit dem vollständigen bisherigen Stand.',
        related: ['anfragen-whatsapp', 'angebot-auftrag', 'bestand-lager'],
    },
    {
        slug: 'angebot-auftrag', navLabel: 'Angebot & Auftrag', group: 'Verkaufen', icon: 'cart', visual: 'order',
        eyebrow: 'Vom geprüften Bedarf bis zur Bezahlung',
        title: 'Angebot, Auftrag und Belegkette bleiben ein Geschäftsvorgang.',
        intro: 'Kunde, Fahrzeug, Teileauswahl und Konditionen werden nicht für jeden Beleg neu angelegt. Partsunion führt den geprüften Stand vom Angebot über Auftrag und Lieferung bis zu Rechnung und Zahlung weiter.',
        promise: 'Einmal geprüft. Danach sauber durchverkauft.',
        screenshot: '/product/verkaufsauftrag.png', screenshotAlt: 'Aktueller Partsunion Verkaufsauftrag mit Fehlmengen und Belegfluss',
        without: ['Angebot aus Chat und Katalog neu tippen', 'Auftrag ohne ursprünglichen Kundenkontext', 'Lieferstatus in separater Liste pflegen', 'Zahlung nicht mit dem Ursprungsvorgang verbunden'],
        withPartsunion: ['Angebot direkt aus der geprüften Anfrage', 'Marge, Menge und Liefertermin im Blick', 'Fehlmengen am Auftrag sichtbar', 'Lieferschein, Rechnung und Zahlung in einer Kette'],
        workflow: [
            { number: '01', title: 'Angebot erstellen', text: 'Geprüfte Positionen und Konditionen werden übernommen.' },
            { number: '02', title: 'Kunde bestätigt', text: 'Die Auswahl bleibt mit Anfrage und Fahrzeug verbunden.' },
            { number: '03', title: 'Auftrag erfüllen', text: 'Bestand, Reservierung und Fehlmenge werden je Position geführt.' },
            { number: '04', title: 'Beleg ausgleichen', text: 'Lieferung, Rechnung, Zahlung und offene Posten schließen den Vorgang.' },
        ],
        capabilities: [
            { title: 'Kalkulation mit Kontext', text: 'EK, VK, Steuer, Marge und kundenbezogene Konditionen stehen an der Position.' },
            { title: 'Lieferfähigkeit je Position', text: 'Lokaler Bestand, Reservierungen, Zugänge und Fehlmengen sind nachvollziehbar.' },
            { title: 'Vollständige Verkaufskette', text: 'Anfrage, Angebot, Auftrag, Lieferschein, Rechnung und Zahlung bleiben verknüpft.' },
            { title: 'Änderungsverlauf', text: 'Status, Entscheidungen und Bearbeitungsschritte bleiben am Vorgang sichtbar.' },
        ],
        controlTitle: 'Kritische Schritte brauchen eine klare Freigabe.', controlText: 'Rabatte, niedrige Margen, Bestellungen und buchungswirksame Schritte können rollenbasiert geprüft werden. Partsunion ersetzt Kontrolle nicht – es macht sie schneller.',
        related: ['anfragen-whatsapp', 'einkauf-disposition', 'finanzen-kasse'],
    },
    {
        slug: 'einkauf-disposition', navLabel: 'Einkauf & Disposition', group: 'Ware bewegen', icon: 'procurement', visual: 'procurement',
        eyebrow: 'Fehlmengen kontrolliert decken',
        title: 'Beschaffung beginnt am echten Bedarf – nicht in einer Nebenliste.',
        intro: 'Partsunion erkennt Fehlmengen am Kundenauftrag und verbindet sie mit Bestand, offenen Zugängen und Lieferantenkonditionen. Daraus entsteht ein prüfbarer Bestellvorschlag statt einer Blindbestellung.',
        promise: 'Weniger suchen. Klarer entscheiden. Kontrolliert bestellen.',
        without: ['Fehlmengen aus Aufträgen zusammensuchen', 'Bestand und offene Bestellungen getrennt prüfen', 'Lieferantenpreise manuell vergleichen', 'Bestellung ohne sichtbaren Ursprungsbedarf'],
        withPartsunion: ['Bedarf direkt aus Kundenauftrag und Mindestbestand', 'Lokaler Bestand und Zugänge zuerst berücksichtigt', 'Konditionen und Lieferzeit vergleichbar', 'Bestellentwurf mit nachvollziehbarer Herkunft'],
        workflow: [
            { number: '01', title: 'Bedarf erkennen', text: 'Auftragsfehlmenge oder Mindestbestand löst einen prüfbaren Bedarf aus.' },
            { number: '02', title: 'Deckung prüfen', text: 'Bestand, Reservierungen, Transfers und offene Zugänge werden berücksichtigt.' },
            { number: '03', title: 'Quelle auswählen', text: 'Lieferant, Kondition, Lieferzeit und Menge werden verglichen.' },
            { number: '04', title: 'Bestellung freigeben', text: 'Der Entwurf wird geprüft und erst danach verbindlich ausgelöst.' },
        ],
        capabilities: [
            { title: 'Bedarf mit Herkunft', text: 'Jede vorgeschlagene Menge bleibt mit Auftrag oder Bestandsregel verbunden.' },
            { title: 'Versorgungslage', text: 'Lager, Reservierung, Zulauf und Fehlmenge ergeben einen gemeinsamen Stand.' },
            { title: 'Lieferantenvergleich', text: 'Preis, Lieferzeit und freigegebene Konditionen fließen in die Entscheidung.' },
            { title: 'Bestell- und Wareneingangskette', text: 'Vom Entwurf bis zum Zugang bleibt der Beschaffungsvorgang nachvollziehbar.' },
        ],
        controlTitle: 'Bestellvorschlag ist nicht automatisch Bestellung.', controlText: 'Der Vorschlag zeigt, warum und wofür beschafft werden soll. Verbindliche Bestellungen bleiben an Rechte, Freigaben und bestätigte Lieferantenanbindungen gebunden.',
        related: ['angebot-auftrag', 'bestand-lager', 'betriebsassistent'],
    },
    {
        slug: 'bestand-lager', navLabel: 'Bestand & Lager', group: 'Ware bewegen', icon: 'warehouse', visual: 'inventory',
        eyebrow: 'Neuware und Einzelstücke in einer WaWi',
        title: 'Jede Menge hat einen Grund. Jedes Einzelstück eine Identität.',
        intro: 'Partsunion führt Mengenartikel und konkrete Einzelstücke in einer gemeinsamen Warenwirtschaft. Bestand, Reservierung, Lagerort, Einkauf, Verkauf und Retoure bleiben als Bewegungen nachvollziehbar.',
        promise: 'Bestand verstehen – nicht nur eine Zahl anzeigen.',
        screenshot: '/product/artikel-bestand.png', screenshotAlt: 'Aktuelle Partsunion Übersicht für Artikel und Bestand',
        without: ['Bestand als überschreibbare Zahl', 'Einzelstücke in separaten Listen', 'Reservierungen ohne Auftragsbezug', 'Lagerwert und Marge erst nach Export sichtbar'],
        withPartsunion: ['Bewegungsjournal statt stiller Bestandsänderung', 'Neuware und Einzelstücke fachlich getrennt', 'Reservierung, Zulauf und verfügbarer Bestand', 'Lagerort, Wert und Marge am Artikel'],
        workflow: [
            { number: '01', title: 'Ware erfassen', text: 'Artikel, Identität, Menge und Herkunft werden sauber angelegt.' },
            { number: '02', title: 'Einlagern', text: 'Wareneingang, Prüfung und Lagerort bilden den neuen Stand.' },
            { number: '03', title: 'Reservieren & bewegen', text: 'Auftrag, Transfer, Kommissionierung und Korrektur erzeugen Bewegungen.' },
            { number: '04', title: 'Auswerten', text: 'Bestand, Reichweite, Lagerwert und Abweichungen bleiben erklärbar.' },
        ],
        capabilities: [
            { title: 'Mengenbestand', text: 'Verfügbar, reserviert, im Zulauf und unter Mindestbestand werden getrennt sichtbar.' },
            { title: 'Einzelstücklogik', text: 'Zustand, Fotos, Herkunft und individueller Wert gehören zum konkreten Exemplar.' },
            { title: 'Lagerorte & Bewegungen', text: 'Jede Zu- und Abbuchung bleibt mit Ort, Zeitpunkt und Geschäftsvorgang verbunden.' },
            { title: 'Sortimentssteuerung', text: 'Bestand, EK, VK, Marge und Nachfrage schaffen eine gemeinsame Entscheidungsbasis.' },
        ],
        controlTitle: 'Kein Bestand verschwindet still.', controlText: 'Korrekturen und buchungswirksame Bewegungen bleiben nachvollziehbar. Rollen und Prüfprozesse sichern kritische Änderungen ab.',
        related: ['einkauf-disposition', 'retouren', 'finanzen-kasse'],
    },
    {
        slug: 'retouren', navLabel: 'Retouren', group: 'Ware bewegen', icon: 'returns', visual: 'returns',
        eyebrow: 'Mobil erfassen · geprüft weiterbuchen',
        title: 'Retoure in einem Zug statt mühseliger Kleinarbeit.',
        intro: 'Artikelnummer abfotografieren, Ursprungsbeleg finden, Grund und Zustand ergänzen: Die Händler-App macht daraus einen prüfbaren Retourenfall. Fotos sind dort optional, wo der konkrete Fall keine Pflichtdokumentation verlangt.',
        promise: 'Weniger Tipparbeit. Vollständiger Kontext. Klare Entscheidung.',
        without: ['Artikel und Lieferschein zusammensuchen', 'Rückgabegrund später nachtragen', 'Fotos unverbunden auf dem Handy', 'Bestand oder Gutschrift zu früh verändern'],
        withPartsunion: ['Artikelnummer per Kamera erfassen', 'Ursprungsbeleg direkt zuordnen', 'Optionale Zustandsfotos am Vorgang', 'Retoure prüfen, dann Bestand und Finanzen bearbeiten'],
        workflow: [
            { number: '01', title: 'Artikel erfassen', text: 'Nummer scannen oder fotografieren; Teil und Beleg werden gesucht.' },
            { number: '02', title: 'Fall dokumentieren', text: 'Menge, Grund, Zustand und optionale Fotos vervollständigen den Vorgang.' },
            { number: '03', title: 'Retoure prüfen', text: 'Frist, Herkunft und gewünschte Behandlung werden entschieden.' },
            { number: '04', title: 'Folgen buchen', text: 'Erst nach Freigabe werden Bestand, Gutschrift oder Lieferantenretoure bearbeitet.' },
        ],
        capabilities: [
            { title: 'Erfassung direkt am Teil', text: 'Artikelnummer und Zustand können direkt am Teil aufgenommen werden.' },
            { title: 'Ursprungsbeleg', text: 'Auftrag, Lieferschein und Rechnung liefern den kaufmännischen Kontext.' },
            { title: 'Retouren-Arbeitsvorrat', text: 'Status, Frist, Zuständigkeit und nächster Schritt bleiben sichtbar.' },
            { title: 'Getrennte Auswirkungen', text: 'Dokumentation, Bestandswirkung und finanzielle Bearbeitung werden kontrolliert getrennt.' },
        ],
        controlTitle: 'Erfassen ist noch keine Gutschrift.', controlText: 'Der mobile Vorgang sammelt die Fakten. Bestands- und Finanzwirkung entstehen erst nach sichtbarer Prüfung und der passenden Freigabe.',
        related: ['haendler-app', 'bestand-lager', 'finanzen-kasse'],
    },
    {
        slug: 'finanzen-kasse', navLabel: 'Finanzen & Kasse', group: 'Betrieb führen', icon: 'finance', visual: 'finance',
        eyebrow: 'Belege, offene Posten und Zahlungen',
        title: 'Die Bezahlungskette gehört zum Auftrag – nicht in eine Sackgasse.',
        intro: 'Partsunion verbindet Verkauf und Einkauf mit Rechnungen, Zahlungen, offenen Posten und Kasse. So bleibt sichtbar, welcher Geschäftsvorgang hinter einer Buchung steht und was noch offen ist.',
        promise: 'Vom Angebot bis zur Zahlung ein gemeinsamer Stand.',
        screenshot: '/product/rechnungen.png', screenshotAlt: 'Aktuelle Partsunion Rechnungsübersicht',
        without: ['Rechnung ohne direkten Auftragskontext', 'Zahlung in einer separaten Liste nachpflegen', 'Offene Posten erst im Monatsabschluss sehen', 'Kasse, Tagesabschluss und Rechnung getrennt betrachten'],
        withPartsunion: ['Belegfluss direkt am Geschäftsvorgang', 'Rechnung, Zahlung und Restbetrag verbunden', 'Offene Posten als Arbeitsvorrat', 'Theke, Kasse und Finanzbereich auf derselben Datenbasis'],
        workflow: [
            { number: '01', title: 'Leistung belegen', text: 'Lieferschein und Rechnung übernehmen den geprüften Auftragsstand.' },
            { number: '02', title: 'Zahlung zuordnen', text: 'Kasse, Banking oder manuelle Erfassung gleichen den Beleg aus.' },
            { number: '03', title: 'Offenes bearbeiten', text: 'Restbeträge, Fälligkeiten und Mahnschritte werden sichtbar.' },
            { number: '04', title: 'Abschluss vorbereiten', text: 'Tagesabschluss, Auswertung und Exporte arbeiten auf derselben Belegbasis.' },
        ],
        capabilities: [
            { title: 'Rechnungen & Gutschriften', text: 'Belege bleiben mit Kunde, Auftrag, Positionen und Steuerlogik verbunden.' },
            { title: 'Offene Posten', text: 'Fälligkeit, Restbetrag, Zahlung und Bearbeitungsstand sind gemeinsam sichtbar.' },
            { title: 'Theke & Kasse', text: 'Bar- und Kartenzahlungen schließen den Verkauf direkt am Vorgang.' },
            { title: 'Finanzübersicht', text: 'Umsatz, Forderungen und Zahlungsstatus werden Teil des operativen Tagesgeschäfts.' },
        ],
        controlTitle: 'Buchungen bleiben nachvollziehbar.', controlText: 'Finanzwirksame Schritte werden über Rollen, Belegstatus und Freigaben abgesichert. Der Betriebsassistent kann vorbereiten – gebucht wird erst nach Bestätigung.',
        related: ['angebot-auftrag', 'betriebsassistent', 'retouren'],
    },
    {
        slug: 'betriebsassistent', navLabel: 'Betriebsassistent', group: 'Betrieb führen', icon: 'assistant', visual: 'assistant',
        eyebrow: 'Dein Betrieb. Eine Frage entfernt.',
        title: 'Dein persönlicher Begleiter für Zahlen, Vorgänge und nächste Schritte.',
        intro: 'Frag nach Produkten, Bestand, Aufträgen, Retouren, Umsatz, Forderungen oder offenen Aufgaben. Der Betriebsassistent verbindet freigegebenes Betriebswissen mit dem aktuellen Vorgang, erklärt die Lage und kann die nächste Bearbeitung direkt vorbereiten.',
        promise: 'Fragen. Entscheiden. Erledigen lassen.',
        without: ['Zahlen aus mehreren Modulen zusammensuchen', 'Kollegen für jeden Vorgangsstand unterbrechen', 'Aufgaben aus einer Antwort manuell anlegen', 'Allgemeiner Chatbot ohne Betriebs- und Seitenkontext'],
        withPartsunion: ['Antworten aus freigegebenen Betriebsdaten', 'Aktueller Kunde oder Auftrag als Kontext', 'Empfehlung mit nachvollziehbarer Datenlage', 'Aktion vorbereiten, sichtbar bestätigen, kontrolliert ausführen'],
        workflow: [
            { number: '01', title: 'Frage stellen', text: 'Eine einzelne Frage oder ein gebündeltes Chef-Briefing startet die Prüfung.' },
            { number: '02', title: 'Betrieb verstehen', text: 'Der Assistent verbindet freigegebene Objekte, Zahlen und aktuellen Seitenkontext.' },
            { number: '03', title: 'Entscheidung erklären', text: 'Ergebnis, Priorität, Risiko und nächster Schritt werden verständlich dargestellt.' },
            { number: '04', title: 'Bearbeitung freigeben', text: 'Du bestätigst den vorbereiteten Schritt; erst dann wird er ausgeführt.' },
        ],
        capabilities: [
            { title: 'Chef-Briefing', text: 'Aufgaben, Umsatz, Forderungen und Bestand als aktuelles Lagebild.' },
            { title: 'Vertrieb steuern', text: 'Angebote, neue Bestellungen, Kommissionierung und Rückstände gemeinsam betrachten.' },
            { title: 'Einkauf absichern', text: 'Wareneingänge, Abweichungen, Rechnungen und Klärfälle priorisieren.' },
            { title: 'Operativ bearbeiten', text: 'Teileangebot, Bestellentwurf oder Vorgangsschritt im Kontext vorbereiten.' },
        ],
        controlTitle: 'Ein Assistent mit Leitplanken.', controlText: 'Er sieht nur freigegebene Daten, respektiert Rollen und führt geschäftliche Änderungen erst nach deiner sichtbaren Bestätigung aus. So bleibt aus Komfort keine stille Automatik.',
        related: ['anfragen-whatsapp', 'einkauf-disposition', 'finanzen-kasse'],
    },
    {
        slug: 'haendler-app', navLabel: 'Händler-App', group: 'Betrieb führen', icon: 'mobile', visual: 'mobile',
        eyebrow: 'Teilearbeit direkt am Fahrzeug, Regal oder Paket',
        title: 'Die Arbeit kommt aufs Handy – ohne ein zweites Datensilo.',
        intro: 'Die Partsunion Händler-App bringt Erfassung dorthin, wo das Teil liegt. Artikelnummern, Fotos, Fahrzeuge und Retouren werden mobil aufgenommen und stehen anschließend direkt im passenden Vorgang der Warenwirtschaft.',
        promise: 'Draußen erfassen. Drinnen ohne Neuerfassung weiterarbeiten.',
        without: ['Fotos später aus der Galerie sortieren', 'Artikelnummern vom Zettel übertragen', 'Mobiler Vorgang ohne Verbindung zur WaWi', 'Bestands- oder Finanzwirkung ohne Prüfung'],
        withPartsunion: ['Kamera für Artikelnummer und Dokument', 'Vorgang direkt Kunde, Auftrag oder Retoure zuordnen', 'Optionale Fotos am richtigen Datensatz', 'Im Desktop auf demselben Stand weiterarbeiten'],
        workflow: [
            { number: '01', title: 'Am Teil starten', text: 'Nummer, Label, Dokument oder Zustand mit dem Handy erfassen.' },
            { number: '02', title: 'Vorgang zuordnen', text: 'Kunde, Auftrag, Artikel oder Ursprungsbeleg liefern den Kontext.' },
            { number: '03', title: 'Daten ergänzen', text: 'Menge, Grund, Notiz und optionale Fotos vervollständigen die Erfassung.' },
            { number: '04', title: 'Im Betrieb übernehmen', text: 'Der Entwurf erscheint direkt im passenden Arbeitsvorrat zur Prüfung.' },
        ],
        capabilities: [
            { title: 'Artikelnummer fotografieren', text: 'Die Kamera startet den Vorgang direkt am physischen Teil.' },
            { title: 'Fahrzeugschein erfassen', text: 'Fahrzeugdaten werden für Anfrage und Teileprüfung vorbereitet.' },
            { title: 'Retoure dokumentieren', text: 'Grund, Zustand, Beleg und optionale Fotos ergeben einen prüfbaren Retourenentwurf.' },
            { title: 'Ein gemeinsamer Datenstand', text: 'Mobile Erfassung und Desktop-Bearbeitung arbeiten am selben Geschäftsvorgang.' },
        ],
        controlTitle: 'Mobil erfassen, zentral entscheiden.', controlText: 'Die App erzeugt vollständige, prüfbare Entwürfe. Kritische Bestands- oder Finanzschritte bleiben in der zentralen Rollen- und Freigabelogik.',
        related: ['retouren', 'anfragen-whatsapp', 'bestand-lager'],
    },
];

export function getSolutionPage(slug: string) {
    return solutionPages.find((page) => page.slug === slug);
}
