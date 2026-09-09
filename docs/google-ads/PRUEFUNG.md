# Prüfung der Kampagnenseiten

Stand: 6. September 2026.

## Lokale Vorschau

- ERP: http://localhost:3080/lp/erp-autoteilehandel
- Warenwirtschaft: http://localhost:3080/lp/warenwirtschaft-autoteilehandel

Der statische Produktionsbuild wird lokal mit `server.mjs` auf Port 3080 ausgeliefert. Falls der Vorschauprozess beendet wurde, in PowerShell aus dem Landingpage-Verzeichnis starten:

```powershell
$env:PORT = '3080'
$env:HOST = '127.0.0.1'
node server.mjs
```

Bei Quellcodeänderungen vorher `npm run build` ausführen. Der Vorschauprozess liest den Export aus `out`.

## Durchgeführte Prüfungen

- Produktionsbuild einschließlich TypeScript und statischem Export der beiden Routen erfolgreich.
- ESLint erfolgreich; Anzeigenlängen automatisch geprüft: maximal 30 Zeichen pro Titel und 90 pro Beschreibung.
- Vorhandene Logiktests und SEO-Prüfung erfolgreich. 58 indexierbare Seiten; die zwei Kampagnenseiten bleiben aus der Sitemap ausgeschlossen.
- Browserprüfung mit Chromium/Edge bei 1440, 768, 390 und 320 Pixeln, jeweils beide Varianten: eine H1, ein Header, keine überstehenden Seiteninhalte, keine defekten geladenen Bilder, `noindex` für robots und googlebot.
- Alle sechs Ansichten der Produktgalerie, Vergrößerung, Schließen mit Escape und FAQ geprüft.
- Direkte Kalenderbuchung, UTM-Herkunft und Übergabe der Anfragereferenz geprüft.
- Fehlerfälle: zwischenzeitlich belegter Termin, nicht erreichbare Verfügbarkeit mit Wiederholung, leerer Kalender und gescheiterte Buchung.
- Mobile Beratungsschaltfläche erscheint nach dem Hero, verschwindet beim Buchungsbereich; mobile Buchung geprüft.
- Rücknavigation zur Hauptseite, bestehende Beratungsseite und HTTP 404 für eine unbekannte Kampagnenroute geprüft.

Alle API-Antworten und Buchungsanfragen wurden im Browsertest lokal abgefangen. **Keine Produktionsbuchung und kein E-Mail-Versand ausgelöst.** Die Tests belegen den Frontend-Ablauf gegen simulierte Antworten; sie ersetzen keine abgestimmte Prüfung der produktiven Zustellung.

Screenshots und Browserprotokoll liegen lokal unter `C:\Partsunion\.codex-artifacts\google-ads`. Der Testlauf benötigt keine neuen Pakete im Landingpage-Repository.

## Noch vor Anzeigenstart nötig

Google-Ads-Konto, tatsächliche Keyword-Prognosen, Budgeteinstellungen und Conversion-Integration einschließlich der passenden Einwilligungsumsetzung. Der aktuelle Funktionsstand schaltet keine Anzeigen und überträgt keine neuen Werbe-Klickkennungen an Google. Siehe [Startplan](./STARTPLAN.md), Abschnitt 8.
