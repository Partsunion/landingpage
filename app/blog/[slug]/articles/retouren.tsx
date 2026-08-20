import Link from 'next/link';

export function ArticleRetouren() {
    return (
        <>
            <p>
                Wer im Autoteilhandel arbeitet kennt die Zahl: <strong>18 bis 22 % Retourenquote</strong>{' '}
                ist Branchen-Durchschnitt. Jede einzelne dieser Retouren kostet zwischen 8 und 14 % der
                Marge — durch Versand, Wiedereinlagerung, Personalaufwand und Kunden-Frust. Wer 100.000 € Monatsumsatz macht,
                verbrennt damit jährlich zwischen 17.000 € und 30.000 € an reiner Marge, die nichts mit dem
                eigentlichen Geschäft zu tun hat.
            </p>
            <p>
                Die gute Nachricht: Diese Quote ist nicht in Stein gemeißelt. Mit konsequentem
                KI-OEM-Matching lässt sich die Quote modellhaft in den einstelligen Prozentbereich
                senken — ein Vielfaches weniger. Dieser Artikel zeigt, wo die Retouren konkret herkommen,
                welche Hebel den größten Effekt haben und wie ein 90-Tage-Plan in der Praxis aussehen kann.
            </p>

            <h2>Die 5 Ursachen-Cluster — und welche davon Sie sofort eliminieren können</h2>
            <p>
                Retouren im Teilehandel fallen erfahrungsgemäß in fünf Ursachen-Cluster. Die folgende
                Verteilung sind typische Richtwerte aus Branchen-Erfahrung — Ihre tatsächliche Verteilung
                ermitteln wir gemeinsam an Ihren echten Daten:
            </p>
            <ol>
                <li>
                    <strong>Falsche HSN/TSN-Eingabe</strong> durch Mitarbeiter beim Abtippen ins ERP — Anteil:{' '}
                    <strong>42 %</strong>. Klassischer Tippfehler im Stress, „0603 CJZ“ wird „0603 CJ2“ und das
                    Teil passt nicht. Komplett vermeidbar mit OCR-Erkennung aus dem Foto.
                </li>
                <li>
                    <strong>Verwechslung ähnlich aussehender Teile</strong> (z.B. Bremsbeläge VA vs. HA, oder
                    Bremsscheiben mit gleichem Durchmesser aber unterschiedlicher Dicke) — Anteil: <strong>23 %</strong>.
                    Lösung: Kreuzvalidierung gegen Teilekataloge + automatische Position-Kennzeichnung.
                </li>
                <li>
                    <strong>Falsche Motorvariante</strong> — die häufigste Falle ist „2.0 TDI“ ohne Motorcode.
                    BMW 320d B47 vs. N47 → komplett unterschiedliche OEM-Nummern. Anteil: <strong>18 %</strong>.
                    Lösung: Bot fragt aktiv nach Motorcode wenn er nicht aus Schein oder FIN ableitbar ist.
                </li>
                <li>
                    <strong>Lieferschäden</strong> — Verpackung beschädigt, Teil verkratzt. Anteil: <strong>12 %</strong>.
                    Nicht KI-lösbar, aber durch sauberen Workflow mit „beschädigt“-Status sauber abrechenbar.
                </li>
                <li>
                    <strong>Kunden-Bestellfehler</strong> („falsches Auto bestellt“) — Anteil: <strong>5 %</strong>.
                    Wird durch Vorkasse-Flow drastisch reduziert: Wer vorab zahlt, prüft seine Bestellung
                    erfahrungsgemäß deutlich genauer.
                </li>
            </ol>
            <p>
                <strong>Cluster 1–3 = 83 % aller Retouren.</strong> Genau die werden durch
                KI-OEM-Matching, OCR-Extraktion und mehrstufige Pipeline-Validierung eliminiert.
            </p>

            <h2>Der 90-Tage-Plan, der die Quote halbiert</h2>

            <h3>Tag 0–14: Onboarding und Datenmigration</h3>
            <p>
                Ihre bestehende Artikeldatenbank wird ins System gespielt, OEM-Cross-References zu
                Hersteller- und Teilekatalogen hergestellt, der WhatsApp-Bot konfiguriert. In dieser Phase laufen
                Anfragen parallel über altes System und Bot — Mitarbeiter sehen beide Match-Ergebnisse
                und bestätigen oder korrigieren. Jede Korrektur fließt zurück ins Lernmodell.
            </p>

            <h3>Tag 15–45: Pipeline-Tuning und Schwellwerte</h3>
            <p>
                Nach den ersten ~500 Anfragen sind die Schwellwerte sauber kalibriert. Jetzt definieren wir,
                ab welcher Konfidenz die KI eigenständig antwortet (üblich:{' '}
                <code>confidence ≥ 0.92</code>) und ab welcher der Mensch übernimmt. Erste echte
                Retouren-Daten kommen rein — wir analysieren pro Retoure, ob es eine
                KI-Vermeidbare-Retoure war oder Cluster 4/5.
            </p>

            <h3>Tag 46–90: Stabilisierung und Lieferanten-Eskalation</h3>
            <p>
                In einem illustrativen Modellverlauf — keine zugesicherten Ergebnisse — sinkt die Quote
                typischerweise so:
            </p>
            <ul>
                <li>Tag 30: ~17–18 % (statt ~19 % vor Start — minimaler Effekt, das System lernt noch)</li>
                <li>Tag 45: ~14 % (Kreuzvalidierung greift, Tippfehler-Cluster weitgehend weg)</li>
                <li>Tag 60: ~10 % (Motor-Cluster zunehmend unter Kontrolle)</li>
                <li>Tag 75: ~6 % (Verwechslungs-Cluster stark reduziert)</li>
                <li>Tag 90: <strong>einstelliger Prozentbereich</strong> (im Wesentlichen nur noch Lieferschäden + Kundenfehler)</li>
            </ul>

            <h2>Was die Quote nach Tag 90 davon abhält, höher zu rutschen</h2>
            <p>
                Der häufigste Fehler nach erfolgreicher Einführung: Mitarbeiter umgehen den Bot bei
                vermeintlich „einfachen“ Anfragen und tippen wieder selbst. Innerhalb von zwei Wochen ist
                die Quote zurück bei 8–10 %. Lösung: Workflow-Disziplin im Dashboard erzwingen — alle
                Anfragen laufen durch die Pipeline, auch wenn der Mitarbeiter die OEM-Nummer „auswendig
                weiß“. Die KI prüft dann nur noch gegen, statt zu suchen.
            </p>

            <h2>Was Sie konkret tun können, um schnell zu starten</h2>
            <p>
                Wenn Sie Partsunion testen wollen: Im Beratungstermin laufen wir mit Ihnen den{' '}
                <Link href="/features/sinkende-retouren">Retouren-Use-Case</Link> mit Ihren
                echten Zahlen durch. Sie schicken uns 30 anonymisierte Retouren der letzten 90 Tage,
                wir analysieren live welcher Cluster aus den oben genannten 5 zutrifft und wie viel davon
                Partsunion in den ersten 6 Wochen abfangen würde. Das ist die ehrlichste Form der
                ROI-Rechnung — mit Ihren Daten, nicht mit Branchen-Durchschnitten.
            </p>
        </>
    );
}
