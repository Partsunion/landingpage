import type { SolutionVisual } from './solutions-data';

export type SolutionStory = {
    situationEyebrow: string;
    situationTitle: string;
    situationIntro: string;
    situations: Array<{ moment: string; title: string; text: string }>;
    comparisonTitle: string;
    workflowTitle: string;
    capabilityTitle: string;
    outcomeTitle: string;
    outcomes: Array<{ title: string; text: string }>;
};

export const solutionStories = {
    inquiry: {
        situationEyebrow: 'Ein typischer Teilefall',
        situationTitle: 'Die Anfrage darf ruhig unordentlich ankommen.',
        situationIntro: 'Der Kunde schreibt so, wie Kunden eben schreiben. Partsunion sorgt dafür, dass daraus intern ein klarer, weiterführbarer Vorgang wird.',
        situations: [
            { moment: 'Eingang', title: '„Brauche Bremse vorne für den Golf.“', text: 'Nachricht, Foto oder Telefonnotiz landet mit Kanal, Kunde und Zeitstempel unter Anfragen.' },
            { moment: 'Prüfung', title: 'Fahrzeug und Bedarf werden ergänzt.', text: 'Fahrzeugschein, VIN und offene Angaben stehen direkt am Gespräch – nicht in einem zweiten Fenster.' },
            { moment: 'Übergabe', title: 'Der geprüfte Fall wird zum Angebot.', text: 'Positionen, Hinweise und Kundenkontext gehen weiter, ohne dass jemand den Chat erneut abschreiben muss.' },
        ],
        comparisonTitle: 'Vom losen Kontakt zum bearbeitbaren Vorgang.',
        workflowTitle: 'So wird aus einer Nachricht ein Verkauf.',
        capabilityTitle: 'Was eine gute Anfragebearbeitung zusammenhalten muss.',
        outcomeTitle: 'Am Ende ist nicht nur die Nachricht beantwortet.',
        outcomes: [
            { title: 'Klare Zuständigkeit', text: 'Jeder sieht, wer übernimmt, was noch fehlt und welcher Schritt als Nächstes ansteht.' },
            { title: 'Vollständiger Kontext', text: 'Kunde, Fahrzeug, Originaltext, Dokumente und Teilebedarf bleiben gemeinsam erhalten.' },
            { title: 'Direkter Verkauf', text: 'Der geprüfte Vorgang kann ohne Neuerfassung in Angebot und Auftrag weiterlaufen.' },
        ],
    },
    oem: {
        situationEyebrow: 'Teileermittlung mit Herkunft',
        situationTitle: 'Der normale Prüfablauf – nur automatisiert.',
        situationIntro: 'Partsunion übernimmt Fahrzeug, Baugruppe und Katalogprüfung. Fehlt eine Angabe, stellt das System dieselbe Rückfrage, die ein Mitarbeiter bei manueller Bearbeitung ebenfalls stellen müsste, und setzt die Prüfung anschließend automatisch fort.',
        situations: [
            { moment: 'Fahrzeug', title: 'Fahrzeugdaten automatisch übernehmen.', text: 'VIN, HSN/TSN oder Fahrzeugschein liefern ohne erneutes Abtippen den Ausgangspunkt.' },
            { moment: 'Katalog', title: 'Katalog und Varianten automatisch prüfen.', text: 'Die angebundenen Herstellerkataloge führen durch den passenden Fahrzeug- und Baugruppenkontext.' },
            { moment: 'Rückfrage', title: 'Fehlende Angaben gezielt klären.', text: 'Partsunion fragt automatisch nach und führt die Antwort direkt in derselben Prüfung weiter.' },
            { moment: 'Artikel', title: 'Passende Ware verkaufsfertig auswählen.', text: 'OE-Bezug, Alternativen, eigener Bestand und Preis stehen automatisch zusammen.' },
        ],
        comparisonTitle: 'Weniger manuelle Katalogarbeit. Nur die Rückfragen, die wirklich nötig sind.',
        workflowTitle: 'Die automatisierte Prüfkette vom Fahrzeug bis zum Artikel.',
        capabilityTitle: 'Welche Daten für eine genaue Ermittlung zusammenspielen.',
        outcomeTitle: 'Jede Auswahl bleibt später erklärbar.',
        outcomes: [
            { title: 'Belegter Fahrzeugbezug', text: 'Die Teileauswahl bleibt mit den verwendeten Fahrzeugangaben verbunden.' },
            { title: 'Automatische Rückfragen', text: 'Ausstattung oder Ausführung werden gezielt erfragt, wenn dieselbe Information auch im manuellen Ablauf fehlen würde.' },
            { title: 'Verkaufsfertiges Ergebnis', text: 'Nach der Klärung werden Artikel, Verfügbarkeit und Kondition automatisch weitergeführt.' },
        ],
    },
    order: {
        situationEyebrow: 'Von der Anfrage bis zur bezahlten Rechnung',
        situationTitle: 'Die Kundenzusage führt den Ablauf automatisch weiter.',
        situationIntro: 'Was in Anfrage und Teileprüfung bereits geklärt wurde, geht direkt ins Dashboard und bleibt in Angebot, Zahlung, Auftrag und Rechnung erhalten.',
        situations: [
            { moment: 'Angebot', title: 'Das Angebot entsteht aus der geprüften Anfrage.', text: 'Kunde, Fahrzeug, Position, Preis und Verfügbarkeit werden übernommen und automatisch zugestellt.' },
            { moment: 'Auftrag', title: 'Die Kundenzusage wird automatisch zum Auftrag.', text: 'Die bestätigten Positionen bleiben erhalten; anschließend startet der Kunde die Zahlung direkt aus WhatsApp.' },
            { moment: 'Abschluss', title: 'Die Rechnung folgt ohne Neuerfassung.', text: 'Der konfigurierte Auslöser führt den eindeutigen Vorgang automatisch bis zum nächsten Beleg weiter.' },
        ],
        comparisonTitle: 'Eine automatische Verkaufskette statt mehrerer Einzelarbeiten.',
        workflowTitle: 'So wird aus der Kundenanfrage ein bezahlter Auftrag.',
        capabilityTitle: 'Was Partsunion im automatisierten Verkauf zusammenführt.',
        outcomeTitle: 'Der Standardfall läuft durch. Nur Ausnahmen brauchen Aufmerksamkeit.',
        outcomes: [
            { title: 'Daten vollständig', text: 'Kunde, Fahrzeug, Artikel, Kondition und Verfügbarkeit werden aus der Anfrage übernommen.' },
            { title: 'Zahlung verbunden', text: 'Zahlungslink, Referenz und Status bleiben am richtigen Auftrag statt nur im Chat.' },
            { title: 'Belege automatisch', text: 'Angebot, Auftrag und Rechnung entstehen anhand der aktivierten Regeln aus demselben geprüften Stand.' },
        ],
    },
    procurement: {
        situationEyebrow: 'Beschaffung aus dem echten Bedarf',
        situationTitle: 'Bevor bestellt wird, muss klar sein, was tatsächlich fehlt.',
        situationIntro: 'Partsunion betrachtet nicht nur die Auftragsmenge. Eigener Bestand, Reservierungen, offene Zugänge und die Herkunft des Bedarfs gehören in dieselbe Entscheidung.',
        situations: [
            { moment: 'Bedarf', title: 'Eine Auftragsposition ist nicht vollständig gedeckt.', text: 'Die Fehlmenge bleibt mit Kunde, Auftrag und gewünschtem Termin verbunden.' },
            { moment: 'Deckung', title: 'Vorhandene Ware und Zuläufe werden berücksichtigt.', text: 'Reservierter Bestand, andere Lagerorte und offene Bestellungen werden vor einer neuen Beschaffung geprüft.' },
            { moment: 'Entwurf', title: 'Die passende Quelle wird zur Freigabe vorbereitet.', text: 'Menge, Lieferant, Kondition und Lieferzeit ergeben einen nachvollziehbaren Bestellentwurf.' },
        ],
        comparisonTitle: 'Vom Suchzettel zur kontrollierten Beschaffung.',
        workflowTitle: 'So wird eine Fehlmenge zu einer begründeten Bestellung.',
        capabilityTitle: 'Welche Informationen eine gute Disposition zusammenführt.',
        outcomeTitle: 'Bestellt wird mit Herkunft, Termin und Verantwortung.',
        outcomes: [
            { title: 'Kein Bedarf ohne Ursprung', text: 'Jede vorgeschlagene Menge zeigt, aus welchem Auftrag oder welcher Bestandsregel sie stammt.' },
            { title: 'Keine neue Bestellung ohne Deckungsprüfung', text: 'Vorhandene Ware und bereits erwartete Zugänge fließen zuerst in die Entscheidung ein.' },
            { title: 'Keine Verbindlichkeit ohne Freigabe', text: 'Der Bestellentwurf bleibt sichtbar prüfbar, bevor er an einen Lieferanten geht.' },
        ],
    },
    inventory: {
        situationEyebrow: 'Bestand mit nachvollziehbarer Bewegung',
        situationTitle: 'Eine Zahl allein erklärt noch keinen Lagerbestand.',
        situationIntro: 'Verfügbar, reserviert, im Zulauf oder bereits einem Auftrag zugeordnet: Erst die Bewegungen dahinter machen Bestand im Tagesgeschäft belastbar.',
        situations: [
            { moment: 'Zugang', title: 'Ware kommt an und erhält einen Lagerort.', text: 'Wareneingang, Menge, Herkunft und Prüfung bilden den dokumentierten neuen Stand.' },
            { moment: 'Nutzung', title: 'Ware wird reserviert, bewegt oder verkauft.', text: 'Jede Änderung bleibt mit Auftrag, Mitarbeiter und Lagerbewegung verbunden.' },
            { moment: 'Einzelstück', title: 'Ein konkretes Exemplar behält seine Identität.', text: 'Zustand, Fotos, Herkunft und individueller Wert folgen dem Teil durch den Betrieb.' },
        ],
        comparisonTitle: 'Bestand nicht überschreiben, sondern verstehen.',
        workflowTitle: 'So entsteht ein belastbarer Lagerstand.',
        capabilityTitle: 'Was Artikel, Lagerort und Bewegung gemeinsam erklären.',
        outcomeTitle: 'Der Lagerstand beantwortet mehr als „Wie viel?“',
        outcomes: [
            { title: 'Was ist frei?', text: 'Verfügbarer und bereits reservierter Bestand werden sauber getrennt.' },
            { title: 'Was kommt noch?', text: 'Offene Zugänge und Transfers ergänzen den aktuellen Lagerstand.' },
            { title: 'Warum stimmt die Menge?', text: 'Zugänge, Verkäufe, Retouren und Korrekturen bleiben als Bewegungen nachvollziehbar.' },
        ],
    },
    returns: {
        situationEyebrow: 'Retoure ohne nachträgliche Detektivarbeit',
        situationTitle: 'Am Teil erfassen. Mit Beleg und Entscheidung weiterarbeiten.',
        situationIntro: 'Eine gute Retoure beginnt mit dem richtigen Artikel und Ursprungsbeleg. Danach werden Grund, Zustand und gewünschte Behandlung gezielt ergänzt.',
        situations: [
            { moment: 'Erfassung', title: 'Artikelnummer direkt am Teil aufnehmen.', text: 'Kamera oder Eingabe starten die Suche nach Artikel und zugehörigem Verkaufsbeleg.' },
            { moment: 'Prüfung', title: 'Grund, Zustand und Frist gemeinsam bewerten.', text: 'Optionale Fotos dokumentieren nur das, was für den konkreten Fall wirklich gebraucht wird.' },
            { moment: 'Bearbeitung', title: 'Bestand und Finanzen getrennt entscheiden.', text: 'Einlagern, Gutschrift oder Lieferantenretoure folgen erst nach der fachlichen Freigabe.' },
        ],
        comparisonTitle: 'Ein Retourenfall statt Foto, Zettel und Erinnerung.',
        workflowTitle: 'So läuft eine Retoure kontrolliert durch den Betrieb.',
        capabilityTitle: 'Was eine vollständige Retourenakte enthalten muss.',
        outcomeTitle: 'Erst prüfen, dann die richtigen Folgen auslösen.',
        outcomes: [
            { title: 'Artikel geklärt', text: 'Das zurückgegebene Teil ist eindeutig mit Menge und Ursprungsbeleg erfasst.' },
            { title: 'Fall dokumentiert', text: 'Grund, Zustand, Frist, Zuständigkeit und optionale Fotos liegen am selben Vorgang.' },
            { title: 'Folgen getrennt', text: 'Bestandsänderung, Kundengutschrift und Lieferantenbearbeitung werden gezielt freigegeben.' },
        ],
    },
    finance: {
        situationEyebrow: 'Vom Geschäftsvorgang zur geklärten Zahlung',
        situationTitle: 'Eine Rechnung ist kein Ende, solange noch etwas offen ist.',
        situationIntro: 'Partsunion zeigt nicht nur Belege. Auftrag, Rechnung, Zahlung, Restbetrag und weitere Bearbeitung bleiben in einer zusammenhängenden Kette.',
        situations: [
            { moment: 'Beleg', title: 'Die Rechnung übernimmt den geprüften Auftragsstand.', text: 'Kunde, Positionen, Steuer und Lieferung bleiben mit dem Ursprungsgeschäft verbunden.' },
            { moment: 'Zahlung', title: 'Kasse oder Zahlungseingang werden zugeordnet.', text: 'Der ausgeglichene und der noch offene Betrag sind direkt am Beleg sichtbar.' },
            { moment: 'Klärung', title: 'Offene Posten werden zum Arbeitsvorrat.', text: 'Fälligkeit, Restbetrag und nächster Bearbeitungsschritt sind nicht erst beim Abschluss sichtbar.' },
        ],
        comparisonTitle: 'Vom einzelnen Beleg zum vollständigen Zahlungsstand.',
        workflowTitle: 'So bleibt die Bezahlungskette nachvollziehbar.',
        capabilityTitle: 'Welche kaufmännischen Schritte Partsunion zusammenhält.',
        outcomeTitle: 'Finanzen werden Teil der täglichen Arbeit, nicht nur des Monatsendes.',
        outcomes: [
            { title: 'Offenes sichtbar', text: 'Fällige Rechnungen und Restbeträge stehen als bearbeitbarer Bestand bereit.' },
            { title: 'Zahlung zugeordnet', text: 'Bar, Karte oder anderer Zahlungseingang schließen genau den zugehörigen Beleg.' },
            { title: 'Ursprung erhalten', text: 'Vom Auftrag bis zur Gutschrift bleibt nachvollziehbar, welches Geschäft dahintersteht.' },
        ],
    },
    assistant: {
        situationEyebrow: 'Dein Betrieb. Eine Frage entfernt.',
        situationTitle: 'Nicht nur Antworten bekommen – den nächsten Schritt vorbereiten lassen.',
        situationIntro: 'Der Betriebsassistent arbeitet mit dem freigegebenen Wissen deines Betriebs. Er verbindet Fragen mit echten Vorgängen, zeigt seine Grundlage und kann passende Bearbeitungsschritte vorbereiten.',
        situations: [
            { moment: 'Fragen', title: '„Was ist heute offen?“', text: 'Aufträge, Retouren, Bestand, Forderungen und Aufgaben werden als verständliches Lagebild zusammengefasst.' },
            { moment: 'Verstehen', title: '„Warum hängt dieser Auftrag?“', text: 'Der Assistent betrachtet Positionen, Fehlmengen, Lieferstatus und vorhandene Notizen im Zusammenhang.' },
            { moment: 'Erledigen', title: '„Bereite den nächsten Schritt vor.“', text: 'Eine Aufgabe, ein Angebot oder ein Bestellentwurf wird im passenden Vorgang vorbereitet und vor der Ausführung bestätigt.' },
        ],
        comparisonTitle: 'Vom allgemeinen Chatbot zum Begleiter im eigenen Betrieb.',
        workflowTitle: 'So wird aus einer Frage eine kontrollierte Bearbeitung.',
        capabilityTitle: 'Was der Betriebsassistent über deinen Alltag zusammenführt.',
        outcomeTitle: 'Fragen. Entscheiden. Erledigen lassen.',
        outcomes: [
            { title: 'Wissen abrufen', text: 'Produkte, Kunden, Bestände, Aufträge, Retouren und Zahlen werden im Betriebskontext beantwortet.' },
            { title: 'Lage verstehen', text: 'Antworten zeigen relevante Vorgänge, Quellen und offene Punkte statt nur eine Behauptung.' },
            { title: 'Arbeit vorbereiten', text: 'Der Assistent kann nächste Schritte anlegen oder vorbereiten; du prüfst und bestätigst.' },
        ],
    },
    mobile: {
        situationEyebrow: 'Die Warenwirtschaft dort, wo das Teil liegt',
        situationTitle: 'Nicht alles beginnt am Schreibtisch.',
        situationIntro: 'Am Fahrzeug, Regal, Paket oder Retourentisch zählt eine schnelle Erfassung. Die Händler-App bringt genau diesen Stand direkt in den passenden Partsunion-Prozess.',
        situations: [
            { moment: 'Kamera', title: 'Nummer, Fahrzeugschein oder Zustand aufnehmen.', text: 'Die Erfassung startet am physischen Teil, ohne Notizzettel und spätere Galerie-Suche.' },
            { moment: 'Zuordnung', title: 'Kunde, Artikel oder Beleg verbinden.', text: 'Der mobile Entwurf erhält sofort den fachlichen und kaufmännischen Kontext.' },
            { moment: 'Übergabe', title: 'Im Desktop ohne Neuerfassung weiterarbeiten.', text: 'Der Vorgang landet im richtigen Arbeitsvorrat und wartet dort auf die fachliche Prüfung.' },
        ],
        comparisonTitle: 'Mobiles Arbeiten ohne zweites Datensilo.',
        workflowTitle: 'So kommt die Erfassung vom Teil in den Betrieb.',
        capabilityTitle: 'Was die Händler-App direkt vor Ort erledigt.',
        outcomeTitle: 'Ein Datenstand vom Handy bis zur Warenwirtschaft.',
        outcomes: [
            { title: 'Schneller erfasst', text: 'Nummern, Dokumente und optionale Fotos werden dort aufgenommen, wo sie entstehen.' },
            { title: 'Richtig zugeordnet', text: 'Kunde, Auftrag, Artikel oder Retoure geben der mobilen Erfassung ihren Kontext.' },
            { title: 'Kontrolliert übernommen', text: 'Der Desktop arbeitet am selben Entwurf weiter; kritische Buchungen bleiben freigabepflichtig.' },
        ],
    },
} satisfies Record<SolutionVisual, SolutionStory>;
