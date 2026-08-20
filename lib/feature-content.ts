/**
 * Validated long-form content for enterprise module pages.
 *
 * Only verifiable product behavior belongs here. Customer metrics, guaranteed
 * processing times and autonomous-decision claims intentionally stay out until
 * they are backed by production evidence and an agreed service level.
 */

import type { PipelinePreviewData } from '@/components/landing/feature-previews/PipelinePreview';

export interface FeatureSpec { label: string; value: string }
export interface FeatureFaq { q: string; a: string }
export interface FeatureUseCase {
    title: string;
    body: string;
    metrics?: { label: string; value: string }[];
    disclaimer?: string;
}

export type FeaturePreviewSpec = { kind: 'pipeline' } & PipelinePreviewData;

export interface FeatureContent {
    subtitle?: string;
    useCase?: FeatureUseCase;
    specs?: FeatureSpec[];
    faqs?: FeatureFaq[];
    preview?: FeaturePreviewSpec;
}

export const featureContent: Record<string, FeatureContent> = {
    'oem-ermittlung': {
        subtitle: 'Fahrzeugmerkmale, OE-Referenzen und Alternativen in einem dokumentierten Prüfpfad.',
        specs: [
            { label: 'Fahrzeugbezug', value: 'VIN, HSN/TSN, Hersteller, Modell und Motorisierung' },
            { label: 'Referenzen', value: 'OE-Nummern, Hersteller-Nummern und Cross-References' },
            { label: 'Katalog', value: 'Lizenzierte Katalogdaten und eigene Artikeldaten' },
            { label: 'Prüfstatus', value: 'Sichere Zuordnung oder sichtbarer fachlicher Prüfbedarf' },
            { label: 'Kontext', value: 'Fahrzeug und Teileentscheidung bleiben am Verkaufsvorgang' },
        ],
        faqs: [
            { q: 'Was passiert bei einer nicht eindeutigen Zuordnung?', a: 'Der Vorgang wird mit den erkannten Merkmalen, Kandidaten und Originaldaten in den Arbeitsvorrat übergeben. Ein Mitarbeiter trifft und dokumentiert die Fachentscheidung.' },
            { q: 'Sind Dokumentfotos die einzige Eingabemöglichkeit?', a: 'Nein. VIN, HSN/TSN, OE-Nummern und Fahrzeugmerkmale können auch direkt erfasst oder aus vorhandenen Stammdaten übernommen werden.' },
            { q: 'Ersetzt die Zuordnung die fachliche Freigabe?', a: 'Nein. Automatische Vorstrukturierung unterstützt die Suche. Bei Unsicherheit oder geschäftskritischen Fällen bleibt eine sichtbare Fachprüfung vorgesehen.' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'Teileidentifikation',
            sub: 'Fahrzeug → Referenz → Kandidaten',
            footer: 'Fachprüfung bei unsicherer Zuordnung',
            rows: [
                { tag: 'FZG', value: 'VIN · HSN/TSN · Modell', status: 'muted' },
                { tag: 'OE', value: 'OE- und Herstellerreferenzen', status: 'info' },
                { tag: 'XREF', value: 'Freigegebene Alternativen', status: 'info' },
                { tag: 'ATP', value: 'Bestand und Reservierungen', status: 'muted' },
                { tag: 'PRÜF', value: 'Kandidat zur Fachentscheidung', status: 'success' },
            ],
        },
    },

    'whatsapp-bot': {
        subtitle: 'WhatsApp als optionaler Eingangskanal — eingebunden in den regulären Verkaufsprozess.',
        specs: [
            { label: 'Eingaben', value: 'Text, Bild und Sprachnachricht' },
            { label: 'Zielobjekt', value: 'Bearbeitbare Anfrage mit Kunde, Fahrzeug und Teilebedarf' },
            { label: 'Übergabe', value: 'Originalinhalt und Bearbeitungskontext bleiben erhalten' },
            { label: 'Steuerung', value: 'Automatisierung abschaltbar; Fachprüfung bei Unsicherheit' },
            { label: 'ERP-Kern', value: 'Unabhängig vom WhatsApp-Kanal produktiv nutzbar' },
        ],
        faqs: [
            { q: 'Brauche ich WhatsApp, um Partsunion zu nutzen?', a: 'Nein. Der ERP-Kern für Verkauf, Einkauf, Lager und Finanzen ist unabhängig. WhatsApp kann später als zusätzlicher Eingangskanal angebunden werden.' },
            { q: 'Was passiert bei unvollständigen Kundenangaben?', a: 'Die Anfrage bleibt mit ihrem Originalinhalt im Arbeitsvorrat. Fehlende Angaben und unsichere Zuordnungen werden als Prüfbedarf dargestellt.' },
            { q: 'Kann ein Mitarbeiter die Bearbeitung übernehmen?', a: 'Ja. Automatische Verarbeitung und menschliche Übernahme teilen denselben Vorgang, sodass kein Kontext zwischen Systemen verloren geht.' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'Digitaler Auftragseingang',
            sub: 'Kanal → Anfrage → Arbeitsvorrat',
            footer: 'Optionaler Kanal · gemeinsames Objektmodell',
            rows: [
                { tag: 'IN', value: 'Text · Bild · Sprache', status: 'muted' },
                { tag: 'KUNDE', value: 'Kontakt und Verlauf zugeordnet', status: 'info' },
                { tag: 'BEDARF', value: 'Fahrzeug und Teil vorstrukturiert', status: 'info' },
                { tag: 'PRÜF', value: 'Unsicherheit sichtbar markiert', status: 'muted' },
                { tag: 'SALES', value: 'Übergabe in den Verkauf', status: 'success' },
            ],
        },
    },

    'automatische-rechnungserstellung': {
        subtitle: 'Verbundene Folgebelege mit nachvollziehbaren Referenzen und kontrollierten Zuständen.',
        specs: [
            { label: 'Belegkette', value: 'Angebot → Auftrag → Lieferschein → Rechnung' },
            { label: 'Positionen', value: 'Übernahme geprüfter Artikel, Mengen, Preise und Steuerdaten' },
            { label: 'Nummernkreise', value: 'Konfigurierbare, fortlaufende Nummerierung je Belegart' },
            { label: 'Korrektur', value: 'Storno und Gutschrift mit Bezug zum Ursprungsbeleg' },
            { label: 'Ausgabe', value: 'PDF sowie vorbereitete E-Rechnungsformate' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'Belegfluss',
            sub: 'Verkauf → Lieferung → Faktura',
            footer: 'Referenzen und Statushistorie bleiben erhalten',
            rows: [
                { tag: 'AN', value: 'Angebot mit geprüften Positionen', status: 'muted' },
                { tag: 'AU', value: 'Auftrag · Bestand reserviert', status: 'info' },
                { tag: 'LS', value: 'Lieferung dokumentiert', status: 'info' },
                { tag: 'RE', value: 'Rechnung festgeschrieben', status: 'success' },
            ],
        },
    },

    'bestellprozess': {
        subtitle: 'Bedarf, Bestellvorschlag, Lieferantenbestellung und Wareneingang in einem Beschaffungsprozess.',
        specs: [
            { label: 'Bedarf', value: 'Mindestbestand, Fehlmenge, Reservierung und offene Zugänge' },
            { label: 'Vorschlag', value: 'Menge, Reichweite, Dringlichkeit und Bezugsquelle' },
            { label: 'Freigabe', value: 'Mitarbeiter prüft und erzeugt die Lieferantenbestellung' },
            { label: 'Wareneingang', value: 'Abgleich gegen offene Bestellung und Positionen' },
            { label: 'Abweichung', value: 'Fehlmenge, Übermenge oder Falschteil dokumentierbar' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'Beschaffungsprozess',
            sub: 'Bedarf → Bestellung → Eingang',
            footer: 'Bestands- und Belegdaten bleiben verbunden',
            rows: [
                { tag: 'BEDARF', value: 'Fehlmenge und Reichweite', status: 'muted' },
                { tag: 'VORSCH', value: 'Menge und Bezugsquelle', status: 'info' },
                { tag: 'PO', value: 'Lieferantenbestellung freigegeben', status: 'info' },
                { tag: 'WE', value: 'Wareneingang abgeglichen', status: 'success' },
            ],
        },
    },

    'bestandssynchronisation': {
        subtitle: 'Ein zentraler Bestandsstand für Verkauf, Reservierung, Lagerbewegung und Inventur.',
        specs: [
            { label: 'Ledger', value: 'Nachvollziehbares Bewegungsjournal je Artikel und Lagerort' },
            { label: 'ATP', value: 'Verfügbarer Bestand nach aktiven Reservierungen' },
            { label: 'Lagerorte', value: 'Bestände und atomare Umbuchungen zwischen Lagerplätzen' },
            { label: 'Inventur', value: 'Zählung, Differenz und dokumentierte Korrekturbuchung' },
            { label: 'Konnektoren', value: 'Externe Kanäle werden je Anbindung als live oder Roadmap gekennzeichnet' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'Bestandsführung',
            sub: 'Ledger · Reservierung · ATP',
            footer: 'Jede Bestandsänderung mit Ursache',
            rows: [
                { tag: 'BUCH', value: 'Buchbestand je Lagerort', status: 'muted' },
                { tag: 'RESV', value: 'Aktive Reservierungen', status: 'info' },
                { tag: 'ATP', value: 'Verfügbarer Bestand', status: 'success' },
                { tag: 'MOVE', value: 'Bewegung mit Referenzbeleg', status: 'info' },
            ],
        },
    },

    'retourenmanagement': {
        subtitle: 'Kundenretoure, RMA, Lieferantenreklamation und Gutschrift als kontrollierte Prozesse.',
        specs: [
            { label: 'Eingang', value: 'Retoure mit Grund, Artikel, Menge und Ursprungsbeleg' },
            { label: 'Prüfung', value: 'Zustand, Verantwortlichkeit und nächste Aktion' },
            { label: 'Bestand', value: 'Wiedereinlagerung erst nach fachlicher Entscheidung' },
            { label: 'Finanzen', value: 'Gutschrift oder Erstattung mit dokumentiertem Bezug' },
            { label: 'Lieferant', value: 'Separate Reklamation und Rückverfolgung zum Bezug' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'Retourenprozess',
            sub: 'Eingang → Prüfung → Abschluss',
            footer: 'Bestand und Gutschrift folgen der Entscheidung',
            rows: [
                { tag: 'RMA', value: 'Retoure mit Ursprungsbeleg', status: 'muted' },
                { tag: 'PRÜF', value: 'Zustand und Grund dokumentiert', status: 'info' },
                { tag: 'ENTSC', value: 'Wiedereinlagern · Reklamieren · Ablehnen', status: 'info' },
                { tag: 'ABSCH', value: 'Bestand und Beleg aktualisiert', status: 'success' },
            ],
        },
    },

    'gobd-tse-zugferd-datev': {
        subtitle: 'Nachvollziehbare Faktura und vorbereitete DACH-Compliance-Pfade mit fachlicher Abnahme vor Produktivstart.',
        specs: [
            { label: 'Festschreibung', value: 'Unveränderliche Rechnung; Korrektur über Gutschrift/Storno' },
            { label: 'Kasse', value: 'Vorbereitete TSE- und DSFinV-K-Prozesse' },
            { label: 'E-Rechnung', value: 'ZUGFeRD und XRechnung auf Basis der Belegdaten' },
            { label: 'DATEV', value: 'EXTF-Buchungsstapel für SKR03/04' },
            { label: 'Abnahme', value: 'Steuerprofil und Export werden einsatzbezogen geprüft' },
        ],
        faqs: [
            { q: 'Ist die steuerliche Abnahme automatisch enthalten?', a: 'Die Software stellt die technischen Pfade bereit. Steuerprofil, Kontierung, Kassenbetrieb und konkrete Einsatzweise müssen vor Produktivstart mit der zuständigen Steuerberatung beziehungsweise Fachstelle abgenommen werden.' },
            { q: 'Wie werden Korrekturen nachvollziehbar?', a: 'Festgeschriebene Rechnungen werden nicht überschrieben. Korrekturen erfolgen über verknüpfte Storno- oder Gutschriftbelege.' },
            { q: 'Kann der Steuerberater Buchungen übernehmen?', a: 'Ein DATEV-EXTF-Export für die vorgesehenen Kontenrahmen steht bereit. Mapping und Import werden im Onboarding mit Testdaten geprüft.' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'Faktura & Export',
            sub: 'Beleg → Festschreibung → Übergabe',
            footer: 'Konkrete Ausprägung vor Go-Live abnehmen',
            rows: [
                { tag: 'RE', value: 'Rechnung mit Steuerprofil', status: 'muted' },
                { tag: 'LOCK', value: 'Beleg festgeschrieben', status: 'info' },
                { tag: 'E-RE', value: 'E-Rechnungsdaten erzeugt', status: 'info' },
                { tag: 'DATEV', value: 'Buchungsstapel vorbereitet', status: 'success' },
            ],
        },
    },

    'b2b-kundenportal-white-label': {
        subtitle: 'Geschäftskunden greifen unter Ihrer Marke auf eigene Belege, Preise und Bestellanfragen zu.',
        specs: [
            { label: 'Mandant', value: 'Kunden- und Händlerkontext serverseitig getrennt' },
            { label: 'Preise', value: 'Kundenspezifische Auflösung auf dem Server' },
            { label: 'Belege', value: 'Eigene Rechnungen und PDF-Download' },
            { label: 'Bestellung', value: 'Unverbindliche Anfrage bis zur Händlerfreigabe' },
            { label: 'Branding', value: 'White-Label-Domain nach technischer Einrichtung' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'B2B-Portal',
            sub: 'Kunde → Preis → Anfrage',
            footer: 'Serverseitige Preis- und Mandantentrennung',
            rows: [
                { tag: 'AUTH', value: 'Sicherer Kundenkontext', status: 'muted' },
                { tag: 'DOCS', value: 'Eigene Belege und PDFs', status: 'info' },
                { tag: 'PRICE', value: 'Kundenpreis serverseitig', status: 'info' },
                { tag: 'REQ', value: 'Bestellanfrage zur Freigabe', status: 'success' },
            ],
        },
    },

    'erp-autoteilehandel': {
        subtitle: 'Verkauf, Beschaffung, Lager und Finanzen auf einer gemeinsamen, branchenspezifischen Datenbasis.',
        specs: [
            { label: 'Geschäftsobjekte', value: 'Kunden, Fahrzeuge, Artikel, Lieferanten, Bestände und Belege' },
            { label: 'Belegkette', value: 'Angebot → Auftrag → Lieferung → Rechnung → Zahlung' },
            { label: 'Branchenlogik', value: 'OE-Referenzen, Fitment, Altteilpfand und Bezugsquellen' },
            { label: 'Steuerung', value: 'Rollen, Arbeitsvorräte, Freigaben und Audit-Historie' },
            { label: 'Finanzen', value: 'Faktura, offene Posten, Mahnwesen und Exporte' },
        ],
        faqs: [
            { q: 'Ist Partsunion ein generisches Alles-ERP?', a: 'Nein. Der Funktionsumfang ist bewusst auf die Prozesse des Autoteilehandels zugeschnitten. Branchenfremde Fertigungs- oder Konzernmodule sind nicht der Schwerpunkt.' },
            { q: 'Können vorhandene Daten übernommen werden?', a: 'Artikel, Kunden und ausgewählte Konfigurationen können über die vorhandenen Importpfade übernommen werden. Umfang, Qualität und Mapping werden vor der Migration geprüft.' },
            { q: 'Sind digitale Kanäle Pflicht?', a: 'Nein. Thekenverkauf und reguläre ERP-Prozesse funktionieren eigenständig. Digitale Kanäle sind zusätzliche Eingänge in dasselbe Objektmodell.' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'Durchgängiger ERP-Prozess',
            sub: 'Bedarf → Bestand → Beleg → Finanzen',
            footer: 'Eine Datenbasis · klare Objektbeziehungen',
            rows: [
                { tag: 'SALES', value: 'Bedarf und Teileentscheidung', status: 'muted' },
                { tag: 'ATP', value: 'Bestand geprüft und reserviert', status: 'info' },
                { tag: 'DOC', value: 'Auftrag und Lieferung', status: 'info' },
                { tag: 'FIN', value: 'Rechnung und offener Posten', status: 'success' },
            ],
        },
    },

    'warenwirtschaft-autoteilhandel': {
        subtitle: 'Warenwirtschaft für Kfz-Teile mit Ledger, ATP, Beschaffung, Lagerorten und Inventur.',
        specs: [
            { label: 'Artikelstamm', value: 'SKU, OE-Referenzen, Fitment, Preise und Bezugsdaten' },
            { label: 'Bestand', value: 'Ledger je Artikel und Lagerort' },
            { label: 'Verfügbarkeit', value: 'ATP unter Berücksichtigung aktiver Reservierungen' },
            { label: 'Beschaffung', value: 'Bedarf, Vorschlag, Bestellung und Wareneingang' },
            { label: 'Kontrolle', value: 'Inventur, Differenzen und Bestandsverprobung' },
        ],
        faqs: [
            { q: 'Was leistet die Bestandsführung gegenüber einer Tabelle?', a: 'Jede Zu- und Abbuchung erhält eine Ursache und Referenz. Reservierungen, Transfers und Inventurdifferenzen verändern den Bestand über definierte Buchungen statt durch Überschreiben einer Zelle.' },
            { q: 'Werden mehrere Lagerorte unterstützt?', a: 'Bestände können nach Lagerort geführt und über dokumentierte Umbuchungen bewegt werden. Die konkrete Standortstruktur wird im Onboarding eingerichtet.' },
            { q: 'Wie werden Abweichungen im Wareneingang behandelt?', a: 'Gelieferte Positionen werden gegen die Bestellung geprüft. Fehlmenge, Übermenge, Falschteil oder Beschädigung können als Abweichung dokumentiert und weiterbearbeitet werden.' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'Warenfluss & Ledger',
            sub: 'Einkauf → Lager → Verkauf',
            footer: 'Bestand folgt dokumentierten Bewegungen',
            rows: [
                { tag: 'PO', value: 'Lieferantenbestellung', status: 'muted' },
                { tag: 'WE', value: 'Wareneingang und Abgleich', status: 'info' },
                { tag: 'LEDGER', value: 'Bestandsbewegung gebucht', status: 'info' },
                { tag: 'ATP', value: 'Verfügbarkeit berechnet', status: 'success' },
            ],
        },
    },
};
