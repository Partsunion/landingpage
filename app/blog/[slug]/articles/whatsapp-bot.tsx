import Link from 'next/link';

export function ArticleWhatsAppBot() {
    return (
        <>
            <p>
                WhatsApp ist im Aftermarket nicht mehr „nice to have“, sondern der dominante Kanal für
                Werkstätten und Kleinkunden. Wer in den nächsten 12 Monaten keinen WhatsApp-Bot live hat,
                verliert messbar Lead-Volumen — vor allem nachts, am Wochenende und an Kunden, die
                türkisch, kurdisch oder polnisch schreiben. Dieser Leitfaden zeigt den kompletten Setup-Pfad,
                den ein typischer Mittelständler in 14 Tagen durchläuft.
            </p>

            <h2>Voraussetzungen — was Sie haben müssen, bevor wir loslegen</h2>
            <ul>
                <li>
                    <strong>Eine Geschäfts-Telefonnummer</strong>, die ausschließlich für den Bot genutzt
                    wird (kann auch Ihre bestehende Service-Nummer sein — siehe Migration-Pfad unten).
                </li>
                <li>
                    <strong>Eine Facebook-Business-Manager-Account</strong> — kostenfrei in 5 Minuten
                    eingerichtet. Wird für die WhatsApp Business Cloud API benötigt.
                </li>
                <li>
                    <strong>Ihre OEM-Artikeldatenbank im Export-Format</strong> (CSV, XLS oder
                    SQL-Dump) — typische Datenfelder: Artikelnummer, OEM, Bezeichnung, Hersteller,
                    Preis, Bestand, Lieferant.
                </li>
                <li>
                    <strong>Ein klares Bild der Konditionen pro Lieferant</strong> — der Bot muss wissen,
                    wann er welchen Lieferanten priorisiert (Standard, Rabattvertrag, Konsignations-Bestand).
                </li>
            </ul>

            <h2>Phase 1 — Nummer migrieren und Bot „silent“ mitlaufen lassen (Tag 1–5)</h2>
            <p>
                Ihre bestehende WhatsApp-Geschäftsnummer wird auf die Business Cloud API umgezogen.
                Der Migration-Prozess dauert je nach Provider <strong>24 bis 72 Stunden</strong>. In
                dieser Phase ändert sich für eingehende Kunden nichts — Chats und Kontakte bleiben
                erhalten, nur das Backend wechselt.
            </p>
            <p>
                Sobald die Migration durch ist, läuft der Bot „silent“ mit: er sieht jede Anfrage,
                generiert intern eine Antwort, aber Ihre Mitarbeiter sehen die Vorschläge im Sales-Inbox
                und antworten weiterhin selbst. So bauen wir <strong>~500 Trainings-Beispiele</strong>{' '}
                auf, an denen der Bot lernt, wie Ihr Team antwortet — Tonfall, Standard-Floskeln,
                übliche Folgefragen.
            </p>

            <h2>Phase 2 — Auto-Antworten für „sichere“ Anfragetypen (Tag 6–10)</h2>
            <p>
                Jetzt aktivieren wir die ersten Auto-Antworten. Definition „sichere“ Anfrage:
            </p>
            <ul>
                <li>
                    OEM-Match-Konfidenz <code>≥ 0,92</code> — der Bot ist sich seines Matches sehr sicher.
                </li>
                <li>
                    Artikel im Bestand verfügbar — keine Liefer-Spekulation.
                </li>
                <li>
                    Auftragswert <code>≤ 250 €</code> — minimaler Risiko-Rahmen für die ersten Wochen.
                </li>
                <li>
                    Bekannter Kunde (mind. 1 vorherige Bestellung) ODER Vorkasse-Zwang aktiv.
                </li>
            </ul>
            <p>
                Alles was außerhalb dieser Kriterien liegt, eskaliert weiterhin an einen Menschen. Aber
                schon allein die „sicheren“ Anfragen machen erfahrungsgemäß einen <strong>Großteil aller
                eingehenden Tickets</strong> aus. Der Bot übernimmt sie komplett autonom in Sekunden
                Antwortzeit.
            </p>

            <h2>Auf der Roadmap — Vorkasse-Flow im Chat (in Vorbereitung)</h2>
            <p>
                Ein geplantes Game-Changer-Feature (in Entwicklung): Der Bot soll künftig nach Bestätigung
                der Bestellung eine sichere Payment-Karte direkt in den Chat schicken — mit Klarna, PayPal,
                Karte und SOFORT als Optionen. <strong>Erst wenn das Geld eingegangen ist</strong>, soll das
                System die Bestellung auslösen. Die Live-Anbindung der Zahlungsanbieter aktivieren wir im
                Onboarding; Direkt-Konnektoren zu Großhändlern sind in Entwicklung (WM SE priorisiert).
            </p>
            <p>
                Was das ändert: Sie gehen nicht in Vorleistung. Klassisches Risiko im Aftermarket — Kunde
                bestätigt eine Bestellung, Sie ordern beim Großhändler (oft mit Speditionskosten), Kunde
                springt am nächsten Tag ab. Ein Vorkasse-Flow reduziert dieses Storno-Risiko deutlich.
                Heute steuern Sie es über Bonität, Kreditlimit und Zahlungskonditionen pro Kunde.
                Modellhafter Effekt auf die Brutto-Marge: je nach Storno-Quote <strong>mehrere Prozentpunkte</strong>.
            </p>
            <p>
                Stammkunden mit Rahmenvertrag werden im Dashboard getaggt — für die läuft weiter „auf
                Rechnung“. Die Regeln pflegen Sie selbst, kein Tech-Ticket nötig.
            </p>

            <h2>Mehrsprachigkeit — der unterschätzte Wachstumshebel</h2>
            <p>
                Wenn Sie türkische, kurdische oder polnische Werkstätten in der Nähe haben, ist das ein
                erheblicher Hebel: Der Bot erkennt die Sprache automatisch (Konfidenz typisch{' '}
                <code>≥ 0,98</code>), parst die Anfrage semantisch und antwortet in der Kundensprache.
                Werkstatt-Slang ist trainiert — „fren balatası“ wird als „Bremsbelag“ erkannt, „Klötze“
                ebenso. Mitarbeiter müssen die Sprache selbst nicht beherrschen, sie sehen die
                übersetzte Version im Sales-Inbox.
            </p>

            <h2>Was kostet das — und wann amortisiert es sich?</h2>
            <p>
                Der konkrete Preis hängt vom Anfragenvolumen, der Anzahl Sales-User und gewählten Modulen
                ab — er wird im Beratungstermin festgelegt und schriftlich angeboten. Den Investitions-Effekt
                können Sie selbst rechnen: Unser{' '}
                <Link href="/pricing">ROI-Rechner</Link> nimmt Anfragen pro Tag,
                Ø-Auftragswert und Retourenquote als Input und zeigt live Marge-Recovery + Zusatz-Umsatz.
                Für einen Mittelständler mit 40 Anfragen pro Tag und 15 % Retourenquote zeigt der
                Rechner modellhaft ein Einsparpotenzial in der Größenordnung von <strong>~80.000 € pro
                Jahr</strong> — eine illustrative Zielgröße, keine zugesicherten Ergebnisse; belastbare
                Kundenkennzahlen liegen im Markteintritt noch nicht vor.
            </p>

            <h2>Häufige Anfänger-Fehler — und wie Sie sie vermeiden</h2>
            <h3>1. Auto-Antworten zu früh aktivieren</h3>
            <p>
                Wer am Tag 2 schon den Bot selbständig antworten lässt, ohne dass er Ihre Brand-Voice
                kennt, bekommt schräge Nachrichten — Kunden merken das. Phase 1 (silent mode) ist
                nicht optional, sondern Pflicht.
            </p>

            <h3>2. Vorkasse für alle erzwingen</h3>
            <p>
                Stammkunden mit jahrzehntelangem Rahmenvertrag verärgert man, wenn sie plötzlich vor
                jeder Bestellung bezahlen müssen. Vorkasse ist Standard für Neukunden und große
                Aufträge — Stammkunden bekommen Tagging.
            </p>

            <h3>3. Mitarbeiter umgehen den Bot</h3>
            <p>
                Wenn die OEM-Erfahrung nach zwei Monaten gut ist, fangen Mitarbeiter an, „aus dem
                Gedächtnis“ zu antworten. Damit verlieren Sie sowohl die Konsistenz als auch die
                Lerndaten. Workflow muss erzwingen: Alle Anfragen laufen durch die Pipeline.
            </p>
        </>
    );
}
