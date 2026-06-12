/**
 * Per-feature long-form content — extends `feature-data.ts`.
 *
 * `preview` is a discriminated union — pick the right visual style per feature:
 *   - pipeline : Bloomberg-style ordered steps     (oem, geschwindigkeit, bestellprozess, ...)
 *   - chat     : WhatsApp-style conversation       (whatsapp-bot, 24-7-einsatzbereit, team-entlastung)
 *   - chart    : Bar chart over time/metric        (sinkende-retouren, skalierbarkeit)
 *   - document : Invoice/receipt mock              (automatische-rechnungserstellung, retourenmanagement)
 */

import type { PipelinePreviewData } from '@/components/landing/feature-previews/PipelinePreview';
import type { ChatPreviewData } from '@/components/landing/feature-previews/ChatPreview';
import type { ChartPreviewData } from '@/components/landing/feature-previews/ChartPreview';
import type { DocumentPreviewData } from '@/components/landing/feature-previews/DocumentPreview';

export interface FeatureSpec { label: string; value: string }
export interface FeatureFaq { q: string; a: string }
export interface FeatureUseCase {
    title: string;
    body: string;
    metrics?: { label: string; value: string }[];
    /**
     * Optional override for the standard model-scenario disclaimer rendered
     * beneath the use case. If omitted, the page renders the default
     * "Modellrechnung, keine reale Kundenreferenz" notice.
     */
    disclaimer?: string;
}

export type FeaturePreviewSpec =
    | ({ kind: 'pipeline' } & PipelinePreviewData)
    | ({ kind: 'chat' } & ChatPreviewData)
    | ({ kind: 'chart' } & ChartPreviewData)
    | ({ kind: 'document' } & DocumentPreviewData);

export interface FeatureContent {
    subtitle?: string;
    useCase?: FeatureUseCase;
    specs?: FeatureSpec[];
    faqs?: FeatureFaq[];
    preview?: FeaturePreviewSpec;
}

export const featureContent: Record<string, FeatureContent> = {
    // ─── CORE FEATURES ─────────────────────────────────────────────────

    'oem-ermittlung': {
        subtitle:
            'Aus einem Foto vom Fahrzeugschein wird in unter einer Sekunde die richtige OEM-Nummer.',
        useCase: {
            title: 'Beispiel-Szenario: Teilehändler mit ~80 Anfragen/Tag',
            body: 'Ausgangslage in vielen Betrieben: rund 15 Minuten Recherche pro Anfrage, etwa jedes fünfte Teil falsch durch Tippfehler bei HSN/TSN. So rechnet sich Partsunion im Modell: deutlich höhere First-Pass-OEM-Trefferquote, spürbar gesunkene Retourenquote und mehr erstellte Angebote pro Schicht. Die folgenden Werte sind angestrebte Zielgrößen aus internen Tests und Branchen-Benchmarks.',
            metrics: [
                { label: 'Trefferquote (Ziel)', value: '~97 %' },
                { label: 'Retouren-Reduktion (Ziel)', value: 'bis −80 %' },
                { label: 'Latenz pro Match', value: 'unter 1 Sek. (Ziel)' },
            ],
        },
        specs: [
            { label: 'OCR-Quellen', value: 'Fahrzeugschein, Typenschild, Zulassung Teil II' },
            { label: 'Daten-Quellen', value: 'Eigene OEM-DB, Hersteller-Daten, Web-Grounding (Teilekatalog-Anbindung in Vorbereitung)' },
            { label: 'Sprachen', value: 'DE, EN, TR, PL, RU (OCR-Layer)' },
            { label: 'Kreuzvalidierung', value: 'Mehrstufige Pipeline mit Konfidenz-Scoring' },
            { label: 'Fallback', value: 'Eskalation an Mensch bei Konfidenz < 0,9' },
        ],
        faqs: [
            { q: 'Was passiert, wenn die KI das Teil nicht eindeutig erkennt?', a: 'Liegt die Konfidenz unter 0,9, eskaliert das System automatisch an Ihren Sales-Mitarbeiter — mit allen extrahierten Daten und Match-Vorschlägen. Der Mitarbeiter bestätigt mit einem Klick, und der Match fließt zurück ins Lernmodell.' },
            { q: 'Funktioniert das auch mit handschriftlichen Notizen oder Fotos aus schlechten Lichtverhältnissen?', a: 'Ja. Der OCR-Layer wurde speziell auf Werkstatt-typische Bedingungen trainiert: WhatsApp-komprimierte Handy-Fotos, verschmutzte Scheine, Schräglagen bis 30°. Bei kritischen Anfragen fordert der Bot proaktiv ein zweites Foto an.' },
            { q: 'Was ist mit Fahrzeugen ohne HSN/TSN — z.B. US-Imports oder ältere Modelle?', a: 'Der Pipeline-Layer matcht bei fehlender HSN/TSN über FIN (17 Stellen), Hersteller-Modell-Baujahr oder über Foto des Original-Teils. Für US/JPN-Imports nutzen wir zusätzlich VIN-Decoder-APIs.' },
            { q: 'Wer haftet, wenn das System ein falsches Teil empfiehlt?', a: 'Die KI gibt eine Empfehlung mit Konfidenz-Score — die finale Bestätigung liegt immer beim Sales-Mitarbeiter oder beim Kunden. Bei Auto-Versand-Workflows definieren wir gemeinsam einen Konfidenz-Schwellwert (z.B. ≥ 0,95), bei dem der Versand automatisch freigegeben wird. Für alles darunter bleibt die menschliche Freigabe Standard.' },
            { q: 'Werden Fahrzeugschein-Fotos der Kunden dauerhaft gespeichert?', a: 'Standard: 30 Tage Aufbewahrung für Reklamationen und Modell-Verbesserung, danach Löschung. Optional konfigurierbar (7 Tage bis 12 Monate). Speicherung auf EU-Servern, DSGVO-konform, kein Zugriff durch Dritte. Auf Wunsch lokale Verarbeitung ohne Speicherung.' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'OEM-Pipeline',
            sub: 'LIVE · 08:42:17',
            footer: 'Bremsbelagsatz VA · 34 11 6 858 047',
            rows: [
                { tag: 'INPUT',  value: 'fzg_schein.jpg · 824 KB',          status: 'muted'   },
                { tag: 'OCR',    value: 'HSN 0603 · TSN BKX · BJ 2016',     status: 'info'    },
                { tag: 'PARSE',  value: 'VW Golf VII Variant · 2.0 TDI',    status: 'info'    },
                { tag: 'QUERY',  value: 'Katalog · Lieferanten · Hersteller',  status: 'muted'   },
                { tag: 'MATCH',  value: '3 Treffer · Konfidenz 0,978',      status: 'success' },
                { tag: 'PUSH',   value: 'Sales-Inbox #24871',               status: 'success' },
            ],
        },
    },

    'whatsapp-bot': {
        subtitle:
            'Ihr Kunde schickt "brauche Bremsen für meinen Golf 7", der Bot antwortet in 8 Sekunden mit 3 Angeboten.',
        useCase: {
            title: 'Beispiel-Szenario: Wochenend-Geschäft ohne Bereitschaft',
            body: 'Typische Ausgangslage: 30+ verpasste Anfragen pro Wochenende. Mit dem WhatsApp-Bot werden Anfragen außerhalb der Öffnungszeiten direkt als Angebot beantwortet — der Rest landet montags als priorisierter Vorgang im Sales-Inbox. Die folgenden Werte sind Zielgrößen aus internen Tests, keine Kundenkennzahlen.',
            metrics: [
                { label: 'Auto-Abschluss-Rate (Ziel)', value: '~75 %' },
                { label: 'Antwortzeit (Median)', value: '8 Sek' },
                { label: 'Aktive Sprachen', value: '5' },
            ],
        },
        specs: [
            { label: 'API', value: 'WhatsApp Business Cloud API (Meta-zertifiziert)' },
            { label: 'Input-Formate', value: 'Text · Sprachnachricht · Foto · PDF · Standort' },
            { label: 'Sprach-Erkennung', value: 'Auto, DE/EN/TR/PL/RU' },
            { label: 'Anfragenvolumen', value: 'Unbegrenzt (Cloud-skaliert)' },
            { label: 'Eskalation', value: '< 0,9 Konfidenz → Mitarbeiter mit vollem Kontext' },
            { label: 'Vorkasse', value: 'Klarna · PayPal · Karte · SOFORT direkt im Chat' },
            { label: 'Auslöser für Bestellung', value: 'Zahlungseingang bestätigt → Auto-Order beim Großhändler' },
        ],
        faqs: [
            { q: 'Müssen wir eine neue WhatsApp-Nummer einrichten?', a: 'Nein. Wir migrieren Ihre bestehende Geschäftsnummer auf die WhatsApp Business Cloud API. Bestehende Chats und Kontakte bleiben erhalten. Der Migration-Prozess dauert je nach Provider 24–72 Stunden.' },
            { q: 'Wie merken Kunden, dass sie mit einem Bot schreiben?', a: 'Sie merken es kaum — die Antworten sind als persönliche Nachrichten Ihres Sales-Teams formuliert (kein "Hallo, ich bin der Partsunion-Bot"). Bei komplexen Fällen übergibt der Bot transparent: "Ich gebe Sie an einen Kollegen weiter, der sich gleich meldet."' },
            { q: 'Können wir den Tonfall des Bots an unsere Marke anpassen?', a: 'Ja. Im Onboarding hinterlegen wir Ihre Brand-Voice: Du/Sie, formell/locker, Branchen-Slang, übliche Standard-Floskeln. Der Bot adaptiert sich an Beispiel-Konversationen aus Ihrem WhatsApp-Verlauf.' },
            { q: 'Was passiert, wenn der Bot etwas Falsches sagt?', a: 'Jede ausgehende Nachricht ist nach 30 Sekunden bearbeitbar — Ihre Mitarbeiter können korrigieren oder zurücknehmen. Außerdem definieren wir gemeinsam Themen-Sperren (z.B. "keine Rabatte über 10 %" oder "keine Lieferzusagen unter 24h"), die der Bot grundsätzlich an Menschen eskaliert.' },
            { q: 'Hört der Bot auch Sprachnachrichten ab?', a: 'Ja. Sprachnachrichten werden via Whisper-API transkribiert (DE, EN, TR, PL, RU), semantisch geparst und zu einer strukturierten Anfrage verarbeitet. Eine 45-Sekunden-Audio "ich bräuchte mal Klötze für meinen Passat..." wird zu Fahrzeug + Teil + Position.' },
            { q: 'Wie ist der Bot mit anderen Tools (CRM, Telefonanlage) integriert?', a: 'Standard-Integrationen: HubSpot, Pipedrive, Zoho CRM, sevdesk, Lexware, DATEV, generische Webhooks. Telefonanlage-Integration läuft über Twilio/Sipgate-Bridge — eingehende Anrufe werden mit dem Bot-Kontext verknüpft. Custom-Integrationen sind im Onboarding-Paket enthalten.' },
            { q: 'Wie funktioniert die Vorkasse direkt über WhatsApp?', a: 'Sobald der Kunde ein Angebot bestätigt, schickt der Bot eine sichere Zahlungs-Karte direkt in den Chat — mit Klarna, PayPal, Karte und SOFORT als Optionen. Der Kunde bezahlt mit einem Klick, der Zahlungseingang wird in Echtzeit verbucht, und **erst dann** löst das System die Bestellung beim Großhändler aus. Sie als Händler gehen nie in Vorleistung — und Abspringen nach Bestellung beim Lieferanten ist unmöglich.' },
            { q: 'Kann ich die Vorkasse pro Kunde oder Auftrag deaktivieren?', a: 'Ja. Standard-Setup: Vorkasse für Neukunden + Aufträge über X €. Für Stammkunden und Werkstätten mit Rahmenvertrag lässt sich „auf Rechnung" pro Kunden-Tag oder pro Auftragswert freischalten. Die Regeln pflegen Sie selbst im Dashboard — keine Tech-Tickets nötig.' },
        ],
        preview: {
            kind: 'chat',
            title: '24/7 BOT',
            sub: 'antwortet meist sofort',
            customerName: 'KFZ Meier GmbH',
            customerInitials: 'KM',
            footer: 'Antwortzeit 8 s · Vorkasse aktiv · Konfidenz 0,94',
            messages: [
                { from: 'user', text: 'Hi, brauche Bremsen vorne für meinen Golf 7 1.6 TDI. Hier ist der Schein.', time: '14:32' },
                { from: 'user', kind: 'image', imageLabel: 'fahrzeugschein', time: '14:32' },
                { from: 'bot',  text: 'Erkannt: VW Golf VII 2.0 TDI Variant. Hier sind 3 Angebote für die Bremsen vorne:\n\n• Bosch BP1411 — 89,40 €\n• ATE 13.0470-7280.2 — 76,20 €\n• Generic — 49,90 €', time: '14:32', tag: 'auto · 8s' },
                { from: 'user', text: 'Ich nehme die ATE.', time: '14:33' },
                {
                    from: 'bot',
                    kind: 'offer',
                    text: '1× ATE Bremsbeläge VA\nFür VW Golf VII 2.0 TDI · OEM 5Q0698451',
                    price: '76,20 €',
                    deliveryNote: 'Lieferung morgen Mi 29.05. vor 12 Uhr (Express)',
                    time: '14:33',
                    tag: 'auto',
                },
                {
                    from: 'bot',
                    kind: 'payment',
                    amount: '76,20 €',
                    methods: ['Klarna', 'PayPal', 'Karte', 'SOFORT'],
                    time: '14:33',
                    tag: 'vorkasse',
                },
                {
                    from: 'bot',
                    kind: 'confirm',
                    orderId: '24871',
                    eta: 'Mi 29.05. vor 12 Uhr',
                    time: '14:34',
                },
            ],
        },
    },

    'automatische-rechnungserstellung': {
        subtitle:
            'Auftrag bestätigt → Rechnung als PDF + Lieferschein + Zahlungslink in <1 Sekunde versendet.',
        useCase: {
            title: 'Beispiel-Szenario: Buchhaltung ohne Freitags-Stau',
            body: 'Typische Ausgangslage: der Buchhalter schreibt freitags stundenlang Rechnungen von Hand. Mit Partsunion werden Rechnungen bei jedem Auftrag automatisch generiert, an Kunde + DATEV gepusht und der Zahlungseingang automatisch verbucht. Die Werte unten sind System-Zielgrößen, keine erhobenen Kundenergebnisse.',
            metrics: [
                { label: 'Zeit pro Rechnung', value: '< 1 Sek' },
                { label: 'Rechnungs-Volumen', value: 'Unbegrenzt' },
                { label: 'Manuelle Nacharbeit (Ziel)', value: 'minimal' },
            ],
        },
        specs: [
            { label: 'PDF-Layout', value: 'Branded Template (Ihr Logo, Ihre Farben, Ihre Footer)' },
            { label: 'Schnittstellen', value: 'DATEV, Lexware, sevdesk, Webhooks' },
            { label: 'MwSt.-Logik', value: 'Volle Steuer-Engine inkl. §13b, Differenzbesteuerung' },
            { label: 'Archivierung', value: 'GoBD-konform, 10 Jahre revisionssicher' },
            { label: 'Versand-Kanäle', value: 'E-Mail · WhatsApp · Kunden-Portal' },
        ],
        faqs: [
            { q: 'Funktioniert das auch mit Differenzbesteuerung nach §25a UStG?', a: 'Ja. Die Steuer-Engine unterstützt Regelbesteuerung, §13b (Reverse Charge), §25a Differenzbesteuerung und §3a (innergemeinschaftliche Leistungen). Pro Auftrag wird die korrekte Logik automatisch erkannt.' },
            { q: 'Wie funktioniert die Stornorechnung bei Retouren?', a: 'Sobald eine Retoure im System erfasst wird, erstellt das Modul automatisch eine Gutschrift mit korrekter Steuer-Korrektur und negativen Posten, sendet sie an den Kunden und meldet die Korrektur an DATEV.' },
            { q: 'Kann der Steuerberater direkt auf die Belege zugreifen?', a: 'Ja. Über die DATEV-Schnittstelle "Unternehmen online" werden Belege und Buchungssätze automatisch synchronisiert. Alternativ: Lexware-, sevdesk- oder eigene Webhook-Integration. Der Steuerberater bekommt einen Read-Only-Zugang ins Portal, wenn gewünscht.' },
            { q: 'Sind die Rechnungen GoBD-konform archiviert?', a: 'Ja, 10 Jahre revisionssicher auf EU-Servern. Jede Rechnung wird mit unveränderlichem Hash gespeichert, die Audit-Trail-Logik dokumentiert jede Änderung. Bei Betriebsprüfung können Sie alle Belege per Klick exportieren — DSF-konform.' },
            { q: 'Kann ich das PDF-Layout an mein Corporate Design anpassen?', a: 'Vollständig. Logo, Farben, Schriften, Footer-Text, AGB-Verweis, Bank-Daten, Footer-Disclaimer — alles per Visual-Editor anpassbar. Komplexe Layout-Wünsche (mehrsprachige Varianten, Lieferanten-spezifische Rechnungen) bauen wir im Onboarding.' },
        ],
        preview: {
            kind: 'document',
            title: 'AUTO-FAKTURA',
            sub: 'Generiert · 28.05. 08:42',
            documentType: 'Rechnung',
            documentNumber: 'R-1284 / 2026',
            issuer: 'Rheinland Autoteile GmbH',
            customer: 'KFZ Meier GmbH',
            customerAddress: 'Friedrichstr. 14 · 10117 Berlin',
            lines: [
                { pos: '1', label: 'Bremsbelagsatz VA · OEM 34116858047', qty: '1', price: '156,40 €' },
                { pos: '2', label: 'Bremsscheibe VA · OEM 34116794300',   qty: '2', price: '198,60 €' },
                { pos: '3', label: 'Versand DHL Express',                  qty: '1', price:  '12,90 €' },
            ],
            subtotal: '566,50 €',
            tax: '107,64 €',
            total: '674,14 €',
            footer: 'PDF + DATEV + E-Mail · 0,4 s · GoBD-archiviert',
        },
    },

    'bestellprozess': {
        subtitle:
            'Erst Zahlung. Dann Bestellung. Sie gehen nie in Vorleistung — der Großhändler-Order startet erst, wenn das Geld vom Kunden eingegangen ist.',
        useCase: {
            title: 'Beispiel-Szenario: Vorausschauend bestellen',
            body: 'Predictive Ordering analysiert Abverkauf der letzten 90 Tage, saisonale Muster und Lieferzeit pro Lieferant. Sobald ein Artikel den dynamischen Meldebestand erreicht, generiert das System eine Bestellempfehlung — mit einem Klick wird sie über die API direkt beim Lieferanten platziert. Die folgenden Werte sind angestrebte Zielgrößen, keine Kundenkennzahlen.',
            metrics: [
                { label: 'Out-of-Stock-Rate (Ziel)', value: 'bis −65 %' },
                { label: 'Kapitalbindung (Ziel)', value: 'bis −20 %' },
                { label: 'Manuelle Bestellungen (Ziel)', value: 'bis −90 %' },
            ],
        },
        specs: [
            { label: 'Lieferanten-Konnektoren', value: 'In Entwicklung — WM SE priorisiert, weitere Großhändler auf der Roadmap' },
            { label: 'Bestell-Methode', value: 'API · CSV-Upload · E-Mail-Order' },
            { label: 'Bestell-Trigger', value: 'Zahlungseingang bestätigt → Auto-Order' },
            { label: 'Zahlungs-Anbieter', value: 'Stripe, Klarna, PayPal, SOFORT' },
            { label: 'Vorkasse-Regeln', value: 'Pro Kunde / Warengruppe / Auftragswert konfigurierbar' },
            { label: 'Preisvergleich', value: 'Live über alle aktiven Lieferanten' },
            { label: 'Verfügbarkeits-Check', value: 'Echtzeit-Abfrage vor Bestellauslösung' },
            { label: 'Tracking', value: 'Push-Updates an Kundenbestellung' },
        ],
        faqs: [
            { q: 'Warum Vorkasse — und wie funktioniert das technisch?', a: 'Vorkasse schützt Sie vor dem klassischen Aftermarket-Risiko: Kunde bestätigt eine Bestellung, Sie ordern beim Großhändler (oft mit Speditionskosten), und der Kunde springt am nächsten Tag ab. Bei Partsunion läuft es umgekehrt: Kunde bestätigt → Bot sendet Stripe-Payment-Link direkt in den WhatsApp-Chat → erst wenn Zahlung eingeht, löst das System die Bestellung beim Großhändler aus. Das senkt das Risiko von Storno-Verlusten und schützt so Ihre Marge.' },
            { q: 'Bestellt das System eigenständig — oder muss ich jede Bestellung freigeben?', a: 'Sie wählen. Standard: Vorschlag im Dashboard, Freigabe per Klick. Optional: Auto-Bestellung sobald Zahlungseingang bestätigt ist, für definierte Lieferanten und Warengruppen bis zu einem konfigurierten Auftragswert.' },
            { q: 'Können Stammkunden trotzdem auf Rechnung bestellen?', a: 'Ja. Pro Kunden-Tag („Rahmenvertrag", „Werkstatt-Partner") oder pro Auftragswert lässt sich die Vorkasse-Pflicht deaktivieren. Wir empfehlen typischerweise: Vorkasse für Neukunden + Aufträge über 200 €, „auf Rechnung" für getaggte Stammkunden. Die Regeln pflegen Sie selbst im Dashboard.' },
            { q: 'Was ist mit Lieferanten, die keine API haben?', a: 'Drei Optionen: (1) Automatischer CSV-Export im Lieferanten-spezifischen Format, (2) generierte E-Mail mit Bestellliste, (3) Custom-Integration im Onboarding-Paket — z.B. Browser-Robot, wenn nur ein Web-Portal verfügbar ist.' },
            { q: 'Wie wird der dynamische Meldebestand berechnet?', a: 'Wir analysieren Abverkaufsgeschwindigkeit der letzten 90 Tage, saisonale Schwankungen (z.B. Bremsen im Winter), Lieferzeit pro Lieferant und Ihren Sicherheitspuffer. Daraus errechnet sich pro Artikel ein dynamischer Bestellpunkt, der wöchentlich neu kalibriert wird.' },
            { q: 'Was passiert, wenn der günstigste Lieferant nicht verfügbar ist?', a: 'Vor jeder Bestellauslösung prüft das System Live-Verfügbarkeit. Ist der Top-Lieferant out-of-stock, geht die Bestellung automatisch zum nächstgünstigen verfügbaren Lieferanten — mit konfigurierbarer Preisgrenze ("max. 7 % über bestem Preis").' },
            { q: 'Kann ich pro Warengruppe oder Lieferant eigene Regeln definieren?', a: 'Ja. Regelwerk pro Warengruppe (z.B. "Bremsen immer von Lieferant A, weil Konditions-Bindung"), pro Lieferant ("nur Mo-Mi bestellen, Lieferzeit 2 Tage") und pro Artikel-Eigenschaft ("bei Schnelldrehern Sicherheitspuffer 14 Tage"). Das Regelwerk wird zusammen im Onboarding aufgebaut.' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'Predictive Ordering',
            sub: 'Schwellwert-Check 03:00',
            footer: 'Bestellung ausgelöst · Lieferung Di 30.05.',
            rows: [
                { tag: 'TRIG',  value: 'Bremsbelagsatz VA · Bestand 4',         status: 'warn'    },
                { tag: 'CALC',  value: 'Ø-Verkauf 8/Tag · Lieferzeit 2 T',      status: 'muted'   },
                { tag: 'CHECK', value: 'Lieferant A: 240 verfügbar @ 18,42 €',  status: 'info'    },
                { tag: 'CHECK', value: 'Lieferant B: 80 @ 19,15 €',             status: 'muted'   },
                { tag: 'ORDER', value: 'API-Order · 40 Stück · 736,80 €',       status: 'success' },
                { tag: 'TRACK', value: 'ETA Di 30.05. · Push an Kunde',         status: 'success' },
            ],
        },
    },

    'bestandssynchronisation': {
        subtitle:
            'eBay, autoteile-markt.de, Daparto, Webshop, Theke — ein Lager, alle Kanäle, Echtzeit-Sync.',
        useCase: {
            title: 'Beispiel-Szenario: Ein Lager, alle Kanäle',
            body: 'Typische Ausgangslage: 4–6 Überverkäufe pro Woche durch den Lag zwischen eBay und Theken-Kasse → schlechte Bewertungen und Rückerstattungen. Mit Partsunion werden Bestände binnen ~2 Sekunden über alle Kanäle synchronisiert; der Reservation-Lock verhindert Parallel-Verkäufe. Die Werte unten sind System-Zielgrößen, keine erhobenen Kundenergebnisse.',
            metrics: [
                { label: 'Sync-Latenz', value: '< 2 Sek' },
                { label: 'Überverkäufe (Ziel)', value: 'gegen 0' },
                { label: 'Aktive Kanäle', value: 'bis zu 8 parallel' },
            ],
        },
        specs: [
            { label: 'Angebundene Marktplätze', value: 'eBay, autoteile-markt.de, Daparto, Kfzteile24-Marketplace' },
            { label: 'Sync-Mechanismus', value: 'Webhooks (push) statt Polling' },
            { label: 'Konflikt-Resolution', value: 'First-Sold-Wins mit Reservation-Lock' },
            { label: 'Kanal-Priorisierung', value: 'Pro Artikel/Lager definierbar' },
            { label: 'Reporting', value: 'Per-Kanal Umsatz, Marge, Retourenquote' },
        ],
        faqs: [
            { q: 'Was passiert, wenn zwei Kunden gleichzeitig das letzte Teil kaufen?', a: 'Reservation-Lock: sobald ein Kanal "Verkauf" meldet, wird der Artikel binnen Millisekunden auf allen anderen Kanälen gesperrt. Eingehende Käufe in dem 2-Sekunden-Fenster werden als Backorder behandelt oder mit Verfügbarkeits-Warnung blockiert.' },
            { q: 'Kann ich pro Kanal unterschiedliche Preise/Margen fahren?', a: 'Ja. Pro Artikel und Kanal lässt sich der Preis frei setzen oder über Regelwerk steuern (z.B. "eBay = Theken-Preis + 12 %"). Dynamic Pricing pro Wettbewerber-Position ist optional verfügbar.' },
            { q: 'Funktioniert das auch mit meinem bestehenden Shop-System?', a: 'Ja. Standard-Integrationen: Shopware, JTL-Shop, Magento, WooCommerce, Shopify, OXID. Anbindung über native API oder unsere Universal-WaWi-Connector. Bei proprietären Eigenentwicklungen bauen wir die Integration im Onboarding mit Ihrem Entwickler.' },
            { q: 'Wie schnell merkt eBay/Shop, dass etwas verkauft wurde?', a: 'Webhook-Push (kein Polling): die angestrebte End-to-End-Latenz vom Verkauf auf Kanal A bis zur Aktualisierung auf Kanal B liegt bei 0,8–2 Sekunden. Durch den Reservation-Lock werden Parallel-Verkäufe in diesem Zeitfenster blockiert — Ziel ist, Überverkäufe trotz parallelem Betrieb von eBay + Shop + Theke zu vermeiden.' },
            { q: 'Was passiert mit reservierten Beständen für offene Angebote?', a: 'Pro Angebot lässt sich eine Reservierung definieren (z.B. 48h). Reservierte Bestände werden auf allen Kanälen abgezogen, damit nicht parallel verkauft wird. Läuft die Reservierung ab, geht der Bestand automatisch zurück in den Verkauf.' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'Multi-Channel Sync',
            sub: 'eBay · Shop · Theke',
            footer: 'Lag: 1,2 s · Überverkäufe: 0',
            rows: [
                { tag: 'SALE',   value: 'eBay · Bremsbelag VA · -1',         status: 'info'    },
                { tag: 'LOCK',   value: 'Reservation 320 ms',                status: 'muted'   },
                { tag: 'PUSH',   value: 'Shop: Bestand 12 → 11',             status: 'success' },
                { tag: 'PUSH',   value: 'Daparto: Bestand 12 → 11',          status: 'success' },
                { tag: 'PUSH',   value: 'Theke-Kasse: Bestand 12 → 11',      status: 'success' },
                { tag: 'OK',     value: 'End-to-End: 1,2 s',                 status: 'success' },
            ],
        },
    },

    'retourenmanagement': {
        subtitle:
            'Kunde scannt den QR-Code auf dem Retourenschein, Lager bucht zurück, Gutschrift geht raus — alles ohne Tippen.',
        useCase: {
            title: 'Beispiel-Szenario: Retoure in 90 Sekunden statt 25 Minuten',
            body: 'Pakete kommen zurück, der Lagermitarbeiter scannt den QR-Code, der Workflow läuft selbst: Bestand-Korrektur, Gutschrift mit korrekter MwSt., E-Mail an Kunde, DATEV-Sync. Aus rund 25 Minuten manueller Arbeit pro Retoure werden im Modell etwa 90 Sekunden. Die Werte unten sind Zielgrößen, keine erhobenen Kundenergebnisse.',
            metrics: [
                { label: 'Bearbeitungszeit (Ziel)', value: 'bis −90 %' },
                { label: 'Falsch-Buchungen (Ziel)', value: 'gegen 0' },
                { label: 'Gutschrift-Latenz', value: '< 10 Sek nach Scan' },
            ],
        },
        specs: [
            { label: 'Retoure-Auslöser', value: 'Kunden-Portal, WhatsApp-Bot, Telefon-Mitarbeiter' },
            { label: 'Scan-Methode', value: 'QR-Code (Standard), Barcode, manuelle Eingabe' },
            { label: 'Grund-Codes', value: '12 vordefinierte + Custom-Codes' },
            { label: 'Wiedereinlagerung', value: 'Automatisch oder mit Qualitäts-Check' },
            { label: 'Analytics', value: 'Retoure-Heatmap nach Artikel / Lieferant / Grund' },
        ],
        faqs: [
            { q: 'Was passiert, wenn ein Teil beschädigt zurückkommt?', a: 'Der Lagermitarbeiter setzt beim Scan den Status "Beschädigt". Das Teil geht nicht in den Verkaufsbestand zurück, sondern in einen separaten Status — gleichzeitig wird automatisch ein Reklamations-Vorgang gegen den ursprünglichen Lieferanten geöffnet.' },
            { q: 'Können wir Retouren nach Kunde/Artikel analysieren, um Probleme zu finden?', a: 'Die Retoure-Heatmap zeigt pro Artikel, Lieferant und Kunde die Retoure-Quote über Zeit. Häufung bei einem Artikel → Hinweis auf Beschreibungsfehler. Häufung bei einem Kunden → mögliche Marge-Optimierung oder Konditions-Anpassung.' },
            { q: 'Wie wird die Gutschrift mit dem Steuerberater synchronisiert?', a: 'Jede Gutschrift wird automatisch an DATEV/Lexware/sevdesk gepusht — inklusive korrekter MwSt.-Korrektur, Buchungsstempel und Verknüpfung zur Original-Rechnung. Der Steuerberater bekommt einen sauberen Buchungssatz, keine PDF-Schnipsel.' },
            { q: 'Kann der Kunde den Retoure-Status online verfolgen?', a: 'Ja. Über den Tracking-Link (per E-Mail + WhatsApp) sieht der Kunde: Retoure-Anmeldung → Versand mit Tracking → Eingang im Lager → Wiedereinlagerung → Gutschrift versendet. Bei jedem Schritt eine kurze Push-Benachrichtigung.' },
            { q: 'Was ist mit Teilen, die wir nicht wieder einlagern wollen (z.B. Verschleißteile)?', a: 'Pro Warengruppe definierbar: "Nicht wieder einlagern", "Mit Qualitäts-Check einlagern", "Direkt entsorgen + reklamieren beim Lieferanten". Die Gutschrift läuft trotzdem, der Workflow bleibt vollautomatisch.' },
        ],
        preview: {
            kind: 'document',
            title: 'GUTSCHRIFT',
            sub: 'Auto-generiert · 8 s nach Scan',
            documentType: 'Gutschrift',
            documentNumber: 'GS-0421 / 2026',
            issuer: 'Parts Express UG',
            customer: 'KFZ Meier GmbH',
            customerAddress: 'Friedrichstr. 14 · 10117 Berlin',
            lines: [
                { pos: '1', label: 'RETOURE: Bremsbelagsatz VA · 34116858047', qty: '−1', price: '−156,40 €' },
                { pos: '2', label: 'Grund: Falsches Teil bestellt',             qty: '·',  price: '·'         },
                { pos: '3', label: 'Wiedereinlagerung bestätigt · QC OK',       qty: '·',  price: '·'         },
            ],
            subtotal: '−131,43 €',
            tax: '−24,97 €',
            total: '−156,40 €',
            footer: 'DATEV-Push · Push an Kunde · Heatmap +1',
        },
    },

    // ─── VALUE PROPOSITIONS ────────────────────────────────────────────

    'skalierbarkeit': {
        subtitle:
            '3× Anfragenvolumen ohne neue Mitarbeiter — und ohne dass die Qualität pro Anfrage sinkt.',
        specs: [
            { label: 'Verarbeitungs-Kapazität', value: 'Unbegrenzt (Cloud-Auto-Scaling)' },
            { label: 'Antwortzeit bei Lastspitze', value: 'konstant < 10 Sek' },
            { label: 'Verfügbarkeit (Ziel-SLA)', value: '99,5 %' },
            { label: 'Saisonale Spitzen', value: 'automatische Kapazitäts-Erweiterung' },
        ],
        faqs: [
            { q: 'Müssen wir bei steigendem Volumen einen größeren Tarif buchen?', a: 'Nein. Die Infrastruktur skaliert automatisch. Tarif-Anpassungen sind nur dann nötig, wenn neue Module hinzugebucht werden oder die Anzahl der Sales-User stark wächst.' },
            { q: 'Was passiert bei einem saisonalen Spitzentag (z.B. Wintereinbruch, +400% Anfragen)?', a: 'Die Cloud-Infrastruktur skaliert in Sekunden hoch — die Antwortzeit bleibt konstant unter 10 Sekunden, egal ob 50 oder 5.000 parallele Anfragen anliegen. Keine manuelle Aktion nötig, kein Tarif-Wechsel.' },
            { q: 'Heißt 3× Volumen automatisch 3× Umsatz?', a: 'Nicht zwingend — aber der Marge-Hebel ist strukturell vorhanden: schnellere Antwortzeiten erhöhen die Abschlussquote, mehr Kapazität erhöht die Lead-Coverage, und der 24/7-Betrieb erschließt Wochenend-Geschäft. Konkrete Umsatzeffekte hängen vom Betrieb ab; veröffentlichte Kundenkennzahlen liegen im Markteintritt noch nicht vor.' },
            { q: 'Gibt es eine garantierte Verfügbarkeit?', a: 'Unser vertragliches Ziel-SLA (siehe AGB §4) liegt bei 99,5 % im Jahresmittel — das entspricht rund 44 Stunden Wartungs-/Ausfallfenster pro Jahr. Geplante Wartungen werden vorab angekündigt. Eine Live-Status-Page ist in Vorbereitung.' },
        ],
        preview: {
            kind: 'chart',
            title: 'Anfragenvolumen / Monat',
            sub: 'Illustrativer Modellverlauf',
            footer: 'Beispielhafte Skalierung · keine Kundendaten',
            bars: [
                { label: 'JAN', value: 320, display: '320', status: 'muted'   },
                { label: 'FEB', value: 340, display: '340', status: 'muted'   },
                { label: 'MAR', value: 380, display: '380', status: 'muted'   },
                { label: 'APR', value: 620, display: '620', status: 'info'    },
                { label: 'MAY', value: 840, display: '840', status: 'info'    },
                { label: 'JUN', value: 1180, display: '1.180', status: 'success' },
            ],
        },
    },

    '24-7-einsatzbereit': {
        subtitle:
            'Werkstätten, die am Samstag um 22 Uhr Teile suchen, kaufen bei dem, der antwortet — nicht bei dem, der erst Montag erreichbar ist.',
        specs: [
            { label: 'Verfügbarkeit', value: '24/7/365' },
            { label: 'Wochenend-Volumen', value: 'durchschnittlich +35 % Anfragen' },
            { label: 'Auto-Abschluss-Quote nachts', value: '~70 %' },
            { label: 'Eskalations-Fenster', value: 'auf Wunsch täglich konfigurierbar' },
        ],
        faqs: [
            { q: 'Bedeutet 24/7-Bot, dass wir auch nachts Bereitschaft brauchen?', a: 'Nein. Was der Bot eigenständig beantworten kann (ca. 70–80 %), läuft komplett autonom durch. Was eskaliert wird, landet morgens priorisiert in Ihrem Sales-Inbox mit vollem Kontext.' },
            { q: 'Wer haftet bei Nacht-Bestellungen ohne menschliche Freigabe?', a: 'Definieren Sie den Auto-Versand-Schwellwert pro Kanal: z.B. "Bis 200 € Auftragswert + Konfidenz ≥ 0,95 + bekannter Kunde + Lager-Verfügbarkeit ja → auto". Alles darüber landet im Sales-Inbox für Freigabe am nächsten Morgen. Sie behalten volle Kontrolle.' },
            { q: 'Was sind die häufigsten Nacht-Anfragen?', a: 'Mobile Werkstätten und Pannenhilfe (defekte Anlasser, Stoßdämpfer, Auspuff-Komponenten), private Schrauber am Wochenende, internationale Kunden in anderen Zeitzonen. Erfahrungsgemäß entfällt ein erheblicher Teil des Anfragevolumens auf Zeiten außerhalb der Geschäftszeiten — genau hier setzt der 24/7-Bot an.' },
            { q: 'Wie unterscheidet sich der Bot von einer normalen Voicemail?', a: 'Voicemail: Kunde wartet bis Montag. Bot: Kunde bekommt ein Angebot in 8 Sekunden, sieht Preis + Verfügbarkeit + Lieferzeit, kann direkt bestellen oder bei komplexen Fällen einen Rückruf-Termin buchen. 70 % der Nacht-Anfragen werden so geschlossen.' },
        ],
        preview: {
            kind: 'chat',
            title: 'SA 23:47',
            sub: 'Bot übernimmt — keine Bereitschaft',
            customerName: 'Werkstatt Schmidt',
            customerInitials: 'WS',
            footer: 'Anfrage außerhalb Öffnungszeit · Auto-Abschluss',
            messages: [
                { from: 'user', text: 'Notfall: Anlasser für BMW F30 320d 2018, mein Wagen springt nicht an', time: '23:47' },
                { from: 'bot',  text: 'Hi! Anlasser für BMW F30 320d Bj 2018: Bosch SR-A12 — 318,40 € · sofort lieferbar.', time: '23:47', tag: 'auto · 6s' },
                { from: 'bot',  text: 'Soll ich Abholung Mo 7:00 reservieren oder Express-Versand auslösen?', time: '23:47', tag: 'auto' },
                { from: 'user', text: 'Express bitte, kommt morgen?', time: '23:48' },
                { from: 'bot',  text: 'Bestellt. Versand heute 23:55, Lieferung morgen vor 12 Uhr. Tracking gleich.', time: '23:48', tag: 'auto' },
            ],
        },
    },

    'geschwindigkeit': {
        subtitle:
            'Wer als Erstes ein Angebot schickt, gewinnt den Auftrag. 8 Sekunden statt 15 Minuten.',
        specs: [
            { label: 'Antwortzeit (Median)', value: '8 Sek' },
            { label: 'Parallel-Verarbeitung', value: 'unbegrenzt' },
            { label: 'Angebots-Varianten', value: '3 Preisgruppen pro Anfrage' },
            { label: 'Bestandsprüfung', value: 'in Antwort enthalten' },
        ],
        faqs: [
            { q: 'Sind 8 Sekunden realistisch, wenn der Lieferant 30 Sekunden für die Preisabfrage braucht?', a: 'Wir cachen Preise und Bestände der wichtigsten Lieferanten in 5-Minuten-Intervallen. Für die 95 % der Anfragen, die diese Cache-Treffer erreichen, gilt der 8-Sekunden-Median. Live-Abfragen für seltene Teile dauern länger und werden ehrlich kommuniziert.' },
            { q: 'Warum 3 Angebote in verschiedenen Preisgruppen?', a: 'Erstmarken (OEM), Premium-Aftermarket (Bosch, ATE) und Budget (No-Name) — der Kunde kann sofort selbst entscheiden, statt zurückschreiben zu müssen. Mehrere Preisstufen in einer Antwort reduzieren erfahrungsgemäß Rückfragen und verkürzen den Abschluss.' },
            { q: 'Was passiert, wenn ich die 8 Sekunden nicht erreiche?', a: 'Dann liegt es meist an einem nicht-gecachten Lieferanten oder einem komplexen Match. Der Bot kommuniziert in solchen Fällen aktiv: "Ich suche gerade die genauen Preise — Antwort in ca. 30 Sek." Transparenz statt Stille.' },
            { q: 'Wie hängt Geschwindigkeit mit Abschlussquote zusammen?', a: 'Branchen-Studien zur Lead-Reaktionszeit zeigen: Wer in den ersten 60 Sekunden antwortet, gewinnt deutlich häufiger als wer erst nach Minuten reagiert. Genau diesen Hebel adressiert Partsunion mit Antwortzeiten im Sekundenbereich. Konkrete Abschlussquoten hängen vom Betrieb ab; eigene Kundenkennzahlen veröffentlichen wir, sobald sie belastbar vorliegen.' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'Speed-Lane',
            sub: 'Anfrage → Angebot',
            footer: '8,2 s · 3 Angebote · 3 Preisstufen',
            rows: [
                { tag: 't+0,0', value: 'IN  Bremsen vorne Golf 7',           status: 'muted'   },
                { tag: 't+0,8', value: 'OCR + Match Konfidenz 0,94',          status: 'info'    },
                { tag: 't+2,1', value: 'Katalog · 8 Lieferanten parallel',     status: 'muted'   },
                { tag: 't+5,4', value: 'Bosch 89 € · ATE 76 € · Generic 49 €', status: 'info'    },
                { tag: 't+7,9', value: 'Bestand 24/8/120 · Lieferzeit 1d',    status: 'info'    },
                { tag: 't+8,2', value: 'OUT  Angebot mit 3 Varianten',        status: 'success' },
            ],
        },
    },

    'sinkende-retouren': {
        subtitle:
            'Jede Retoure kostet Sie Marge, Versand, Zeit und Kundenvertrauen. Die KI eliminiert die häufigste Ursache: falsch identifizierte Teile.',
        useCase: {
            title: 'Beispiel-Szenario: Retourenquote spürbar senken',
            body: 'Branchen-typische Ausgangslage: Retourenquoten im Bereich von ~15–20 %. Ziel von Partsunion ist, die häufigste Ursache — falsch identifizierte Teile — durch Kreuzvalidierung gegen Katalogdaten, mehrstufige Konfidenz-Prüfung und Eskalation bei unklaren Matches deutlich zu reduzieren. Die Werte unten sind Modell-Zielgrößen, keine erhobenen Kundenergebnisse.',
            metrics: [
                { label: 'Ausgangslage (Branche)', value: '~15–20 %' },
                { label: 'Zielkorridor', value: '~3–5 %' },
                { label: 'Marge-Effekt (Ziel)', value: 'positiv' },
            ],
        },
        faqs: [
            { q: 'Wie misst Partsunion die "richtige Identifikation"?', a: 'Jede ausgelieferte Position wird gegen die Retoure-Quote der nächsten 60 Tage abgeglichen. Daraus errechnet sich pro Match die Stabilitäts-Quote. Schwache Match-Pattern fließen ins Lernmodell zurück.' },
            { q: 'Was sind die häufigsten Ursachen für Retouren in der Branche?', a: '5 Haupt-Cluster: (1) Falsche HSN/TSN-Eingabe durch Mitarbeiter, (2) Verwechslung ähnlich aussehender Teile (Bremsbeläge VA vs HA), (3) nicht passende Varianten (Diesel vs Benzin), (4) Liefer-Beschädigung, (5) Kunden-Bestellfehler. Partsunion eliminiert (1)–(3) komplett, (4) und (5) bleiben.' },
            { q: 'Kann ich sehen, welche Artikel die meisten Retouren verursachen?', a: 'Ja, die Retoure-Heatmap zeigt pro Artikel, Lieferant und Grund-Code die Quote über Zeit. Häufungen bei einem Artikel deuten auf Beschreibungsfehler hin, Häufungen bei einem Lieferanten auf Qualitätsprobleme — handlungsrelevante Daten statt nur Statistik.' },
            { q: 'Wie schnell sehe ich die Reduzierung in meinen Zahlen?', a: 'Die Match-Qualität ist ab Tag 1 verfügbar. Aber: Retouren laufen 30–60 Tage nach dem Verkauf ein, deshalb wird die volle Wirkung erst nach ~90 Tagen messbar. Im Modell rechnen wir damit, dass sich der Effekt nach den ersten Wochen zeigt und sich über das erste Quartal stabilisiert — belastbare eigene Zahlen veröffentlichen wir, sobald sie vorliegen.' },
        ],
        preview: {
            kind: 'chart',
            title: 'Retoure-Quote (Modellverlauf)',
            sub: 'Illustrativer Zielverlauf · 6 Monate',
            unit: ' %',
            footer: 'Modell-Zielwerte · keine Kundendaten',
            bars: [
                { label: 'JAN', value: 194, display: '19,4', status: 'warn'    },
                { label: 'FEB', value: 178, display: '17,8', status: 'warn'    },
                { label: 'MAR', value: 141, display: '14,1', status: 'info'    },
                { label: 'APR', value: 98,  display: '9,8',  status: 'info'    },
                { label: 'MAY', value: 62,  display: '6,2',  status: 'success' },
                { label: 'JUN', value: 32,  display: '3,2',  status: 'success' },
            ],
        },
    },

    'sprachuebergreifend': {
        subtitle:
            'Türkisch geschrieben, polnische Sprachnachricht, deutscher Werkstatt-Slang — der Bot versteht alles und antwortet in der Kundensprache.',
        specs: [
            { label: 'Unterstützte Sprachen', value: 'DE, EN, TR, PL, RU' },
            { label: 'Input-Formate', value: 'Text, Sprachnachricht (Whisper), Foto-OCR' },
            { label: 'Auto-Sprach-Erkennung', value: 'Pro Nachricht und Audio-Snippet' },
            { label: 'Werkstatt-Slang', value: 'auf eine umfangreiche Sammlung typischer Branchen-Begriffe trainiert' },
        ],
        faqs: [
            { q: 'Was passiert bei einer Sprache, die nicht in der Liste steht?', a: 'Das System erkennt die Sprache, übersetzt intern auf Deutsch und antwortet bilingual: einmal in der erkannten Sprache (per ML-Übersetzung) plus deutsche Original-Antwort. Mitarbeiter werden informiert und können bei Bedarf manuell nachbessern.' },
            { q: 'Hört der Bot tatsächlich Sprachnachrichten ab oder transkribiert sie nur?', a: 'Beides: Transkription via Whisper-API (DE/EN/TR/PL/RU), dann semantisches Parsing inkl. Slang-Mapping. Eine 45-Sekunden-Sprachnachricht "ich bräuchte mal die Klötze für meinen Passat..." wird zu einer strukturierten Anfrage mit Fahrzeug + Teil.' },
            { q: 'Wie geht der Bot mit dialektalen oder regionalen Begriffen um?', a: 'Trainiert auf eine umfangreiche Sammlung von Branchen-Begriffen inklusive Werkstatt-Slang. "Bremsklötze" = "Bremsbelagsatz", "Domlager" = "Federbein-Stützlager", "Spurstangenkopf" = "Axialgelenk", türkisch "fren balatası" = "Bremsbelag". Lokale Eigen-Begriffe können im Onboarding ergänzt werden.' },
            { q: 'Können wir den Bot auf weitere Sprachen erweitern (z.B. Arabisch, Italienisch)?', a: 'Ja, neue Sprachen sind Teil unseres Roadmap-Backlogs. Wenn Sie eine spezifische Sprach-Erweiterung brauchen (z.B. Arabisch für nahöstliche Kundschaft), priorisieren wir sie im Enterprise-Onboarding. Typische Realisierung: 4–8 Wochen.' },
        ],
        preview: {
            kind: 'pipeline',
            title: 'Multi-Language Bot',
            sub: '5 Sprachen · Auto-Detect',
            footer: 'Konfidenz Sprache: 0,98 · Antwort 7 s',
            rows: [
                { tag: 'IN',    value: 'TR  "Golf 7 fren balatası lazım"',   status: 'info'    },
                { tag: 'LANG',  value: 'Türkisch · Konfidenz 0,98',          status: 'success' },
                { tag: 'PARSE', value: 'Fahrzeug: VW Golf VII · Teil: Brems', status: 'muted'   },
                { tag: 'MATCH', value: 'OEM 5Q0698451 · Lager 24',           status: 'success' },
                { tag: 'OUT',   value: 'TR  "Selam, 3 teklif gönderiyorum"', status: 'success' },
                { tag: 'LOG',   value: 'Mitarbeiter: nur Sichtkontrolle',    status: 'muted'   },
            ],
        },
    },

    'team-entlastung': {
        subtitle:
            'Ihre Sales-Mitarbeiter sind teuer und gut. Lassen Sie sie nicht Fahrzeugscheine abtippen.',
        useCase: {
            title: 'Beispiel-Szenario: Routine raus, Wertschöpfung rein',
            body: 'Typische Ausgangslage: ein großer Teil der Mitarbeiterzeit geht für Standard-Anfragen drauf (Tippen, Suchen, Angebote schreiben). Ziel von Partsunion ist, diesen Routine-Anteil deutlich zu senken — die freie Zeit fließt in komplexe Beratung, Großkunden-Akquise und proaktiven Verkauf. Die Werte unten sind Modell-Zielgrößen, keine erhobenen Kundenergebnisse.',
            metrics: [
                { label: 'Routine-Anteil vorher', value: '~70 %' },
                { label: 'Routine-Anteil (Ziel)', value: '~30 %' },
                { label: 'Fokus auf Wertschöpfung', value: 'höher' },
            ],
        },
        faqs: [
            { q: 'Heißt das, ich kann Mitarbeiter abbauen?', a: 'Die meisten unserer Kunden bauen NICHT ab. Sie nehmen das gewonnene Zeitbudget und stecken es in: mehr Umsatz (mehr Anfragen bearbeiten), bessere Marge (intensivere Beratung bei Großkunden), neue Vertriebskanäle. Wer abbaut, schöpft das Potenzial nicht aus.' },
            { q: 'Wie kommen die Mitarbeiter mit der Umstellung klar?', a: 'Erfahrungsgemäß: ein paar Wochen Eingewöhnung, dann Akzeptanz. Niemand vermisst das Abtippen von Fahrzeugscheinen. Die Aufwertung der eigenen Arbeit — komplexe Beratung statt Routine — wirkt erfahrungsgemäß motivierend. Eigene Zufriedenheits-Kennzahlen erheben und veröffentlichen wir, sobald belastbare Daten vorliegen.' },
            { q: 'Welche Anfragen landen weiterhin bei meinen Mitarbeitern?', a: 'Alles mit Konfidenz < 0,9: ungewöhnliche Fahrzeuge (Oldtimer, Imports), komplexe Reklamationen, Großhandels-Konditionen, Sonderanfragen ohne klares OEM-Match. Plus alles, was die Mitarbeiter selbst priorisieren wollen — der Bot übernimmt nicht ohne Zustimmung.' },
            { q: 'Was passiert, wenn ein neuer Mitarbeiter eingearbeitet wird?', a: 'Onboarding-Zeit sinkt drastisch: statt 4–6 Wochen "Lieferanten und Teile lernen" reichen 1–2 Wochen für den Sales-Workflow. Der Bot ist der Senior-Mitarbeiter, der jederzeit Kontext liefert. Junioren werden schneller produktiv.' },
        ],
        preview: {
            kind: 'chart',
            title: 'Mitarbeiter-Zeit pro Tag (Modell)',
            sub: 'Routine vs. Wertschöpfung · illustrativ',
            unit: ' %',
            footer: 'Illustrativer Zielverlauf · keine Kundendaten',
            bars: [
                { label: 'PRE',   value: 70, display: '70', status: 'warn'    },
                { label: 'WK 2',  value: 62, display: '62', status: 'warn'    },
                { label: 'WK 6',  value: 48, display: '48', status: 'info'    },
                { label: 'WK 10', value: 38, display: '38', status: 'info'    },
                { label: 'WK 14', value: 32, display: '32', status: 'success' },
                { label: 'WK 18', value: 28, display: '28', status: 'success' },
            ],
        },
    },
};
