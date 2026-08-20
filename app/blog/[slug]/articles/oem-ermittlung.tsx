import Link from 'next/link';

export function ArticleOemErmittlung() {
    return (
        <>
            <p>
                „OEM-Nummer in unter einer Sekunde aus einem Foto“ — das klingt nach Marketing-Sprache.
                In diesem Artikel zeigen wir die echte Pipeline dahinter, Schritt für Schritt: was passiert
                vom Hochladen des Fahrzeugscheins bis zur OEM-Empfehlung im Chat — und warum ein Großteil
                der Anfragen mit hoher Konfidenz endet, während unsichere Fälle bewusst an den Menschen gehen.
            </p>

            <h2>Stufe 1 — OCR auf Werkstatt-Bedingungen trainiert</h2>
            <p>
                Klassische OCR-Bibliotheken (Tesseract & Co.) scheitern an WhatsApp-komprimierten
                Handy-Fotos. Sie sind auf saubere, gescannte Dokumente ausgelegt — nicht auf einen
                schiefgehaltenen Schein mit Schlierenlicht aus dem Smartphone. Unsere Vision-Pipeline ist
                gezielt darauf ausgelegt, mit <strong>Werkstatt-typischen Bedingungen</strong> umzugehen:
            </p>
            <ul>
                <li>Starke WhatsApp-/JPEG-Kompression statt Scanqualität</li>
                <li>Schräglagen und Verdrehungen</li>
                <li>Verschmutzte oder zerknitterte Scheine</li>
                <li>Schlechte Beleuchtung (Werkstattlicht, Sonneneinfall, Schatten)</li>
                <li>Hand-überlagerte Felder (Daumen am Schein-Rand)</li>
            </ul>
            <p>
                Extrahiert werden: <code>HSN</code> (4 Stellen), <code>TSN</code> (3 Stellen),{' '}
                <code>FIN/VIN</code> (17 Stellen, Validierung mit Prüfsumme), Erstzulassung, Leistung in kW.
                Bei kritischen Anfragen fordert der Bot proaktiv ein zweites Foto an, statt mit niedriger
                Konfidenz weiterzumachen.
            </p>

            <h2>Stufe 2 — Cross-Reference gegen Teilekataloge</h2>
            <p>
                Mit HSN/TSN lässt sich das Fahrzeug eindeutig identifizieren — aber das ist erst der
                Anfang. Jetzt geht die Anfrage parallel an mehrere Quellen:
            </p>
            <ol>
                <li>
                    <strong>Ihre lokale OEM-Datenbank</strong> — der häufigste Treffer-Pfad. Wenn Sie für
                    den Artikel + dieses Fahrzeug schon mal eine OEM-Nummer hinterlegt haben, kommt sie
                    in Millisekunden zurück.
                </li>
                <li>
                    <strong>Aftermarket-Teilekataloge</strong> — der lizenzierte TecDoc-Katalog (pro
                    Mandant) mit Hersteller-OE-Nummern, Aftermarket-Alternativen und Cross-References.
                </li>
                <li>
                    <strong>Eigene OEM-Datenbank &amp; Cross-References</strong> — gepflegte Mappings und
                    Alternativ-Hersteller-Verknüpfungen, die auch seltenere Fahrzeuge abdecken.
                </li>
            </ol>
            <p>
                Die Quellen liefern jeweils OEM-Kandidaten mit Hersteller-Cross-References. Liefern mehrere
                Quellen unabhängig denselben OEM, steigt die Konfidenz entsprechend und der Bot antwortet
                direkt; andernfalls eskaliert er an einen Menschen.
            </p>

            <h2>Stufe 3 — Motor-Disambiguierung wenn nötig</h2>
            <p>
                Der häufigste Grund für Konfidenz unter 0,9: <strong>mehrere Motorvarianten zum gleichen
                Fahrzeugmodell</strong>. „BMW 320d Bj 2014“ — kann B47 oder N47 sein, das Teil ist anders.
                In diesen Fällen prüft der Bot ob er den Motorcode aus der FIN ableiten kann (Position 5–8
                kodiert oft die Motorfamilie). Falls nicht, fragt er aktiv im Chat nach:
            </p>
            <blockquote>
                „Ich sehe zwei mögliche Motorvarianten für Ihr Fahrzeug. Können Sie mir den Motorcode
                geben? Er steht im Schein unter Feld 2.2 oder direkt auf dem Motorblock.“
            </blockquote>
            <p>
                Das ist <strong>kein Bug, sondern ein Feature</strong>. Eine Rückfrage in 5 Sekunden ist
                besser als ein falsches Teil 3 Tage später.
            </p>

            <h2>Stufe 4 — Konfidenz-Scoring und Eskalation</h2>
            <p>
                Pro OEM-Kandidat berechnet die Pipeline einen Konfidenz-Score zwischen 0 und 1. Faktoren:
            </p>
            <ul>
                <li>Übereinstimmung zwischen den Quellen (lokale DB / TecDoc-Katalog / eigene Cross-References)</li>
                <li>Anzahl der historischen Bestellungen dieses OEMs für dieses Fahrzeug</li>
                <li>Retoure-Quote dieses OEMs in den letzten 90 Tagen</li>
                <li>Klarheit der Fahrzeug-Disambiguierung (Motorvariante, Ausstattungslinie)</li>
            </ul>
            <p>
                <strong>Konfidenz ≥ 0,92</strong> → Bot antwortet eigenständig.<br />
                <strong>0,80 ≤ Konfidenz &lt; 0,92</strong> → Bot antwortet mit Hinweis „eine Alternative
                ist auch möglich“, listet beide.<br />
                <strong>Konfidenz &lt; 0,80</strong> → Eskalation an Sales-Mitarbeiter mit vollem Kontext
                (extrahierte Daten, Match-Vorschläge, Begründung der Unsicherheit).
            </p>

            <h2>Stufe 5 — Lernen aus Retouren</h2>
            <p>
                Was passiert nach dem Verkauf? Jede ausgelieferte Position wird gegen die Retoure-Quote
                der nächsten 60 Tage gemessen. Wenn ein bestimmter Match-Pattern überdurchschnittlich
                oft retour kommt, sinkt sein Konfidenz-Score in der Pipeline. So wird das System mit
                jeder Bestellung besser: Die First-Pass-Trefferquote steigt im laufenden Betrieb
                modellhaft deutlich an, je mehr verifizierte Bestell- und Retoure-Daten vorliegen —
                ein illustrativer Verlauf, keine zugesicherten Ergebnisse.
            </p>

            <h2>Fahrzeuge ohne HSN/TSN — der Edge-Case</h2>
            <p>
                US-Imports, Klassiker, Sonderfahrzeuge haben oft keine HSN/TSN. Die Pipeline-Fallback-Logik:
            </p>
            <ol>
                <li>FIN-Decoder gegen NHTSA-API (US) oder JATO (international)</li>
                <li>Match über Hersteller-Modell-Baujahr-Variante</li>
                <li>Foto des Original-Teils + Computer-Vision-Vergleich gegen Hersteller-Katalog</li>
                <li>Eskalation an Sales-Mitarbeiter mit Hinweis „Klassiker, manuelle Recherche empfohlen“</li>
            </ol>
            <p>
                Bei Edge-Cases ist die Trefferquote naturgemäß niedriger, aber genau dafür ist die
                Eskalations-Logik da. Die KI hilft dem Mitarbeiter, statt ihn zu ersetzen.
            </p>

            <h2>Wie Sie das selbst testen können</h2>
            <p>
                Unsere <Link href="/live-demo">Live-Demo</Link> nutzt exakt die hier beschriebene Pipeline
                — eine kostenlose Anfrage pro Gerät, mit echten OEM-Daten aus der Produktions-Datenbank.
                Wenn die Demo bei Ihrer Test-Anfrage einen Treffer mit hoher Konfidenz liefert, sehen
                Sie genau, was die Pipeline auch in Ihrem realen Betrieb tut.
            </p>
        </>
    );
}
