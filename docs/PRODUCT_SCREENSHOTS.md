# Produktaufnahmen – 5. September 2026

Die Website verwendet zwölf neue Aufnahmen aus der tatsächlichen lokalen Partsunion-Oberfläche mit Beispieldaten. Keine generierten Oberflächen und keine nachträglich veränderten Bedienelemente. Die Aufnahmen zeigen gezielt den Arbeitsbereich oder die geöffnete Seitenleiste, ohne unnötige Desktop-Ränder.

Die verbindliche Zuordnung, Originalabmessungen, Bildbeschreibungen und mobilen Bildschwerpunkte stehen in `lib/product-images.ts`. Lösungsseiten benennen ihre Aufnahme ausdrücklich; eine fehlende Zuordnung wird nicht mehr durch ein beliebiges Verkaufs- oder Lagerbild ersetzt.

| Thema | Aufnahme | Gezeigter Arbeitsbereich |
| --- | --- | --- |
| OE-Ermittlung | oe-ermittlung | OE-Suche mit Fahrzeug, Upload, Ergebnis und Prüfpfad |
| Angebot und Auftrag | verkauf-auftrag | Auftragspositionen, Fehlmengen und Belegfluss |
| Lager | lager-artikel | Artikel, Mengen und Mindestbestände |
| WhatsApp | whatsapp-dialog | Kundengespräch und Anfragenübersicht |
| Betriebsassistent | assistent-arbeitsablaeufe | Tatsächliche Assistenten-Seitenleiste |
| Rechnungen | rechnungen-uebersicht | Belegnummern, Kunden, Beträge und Zahlungsstatus |
| Banking | banking-abgleich | Geschäftskonto, Kontoauszug und Zuordnungsvorschläge |
| Einkauf | einkauf-bestellung | Bestellung mit Lieferant, Termin und Kundenauftragsbezug |
| Retouren | retouren-rma | RMA-Fall mit Rechnungsreferenz, Grund und Position |
| Kasse | kasse-verkauf | Warenkorb, Zahlung, Steuer und Rückgeld |
| Gebrauchtteile | gebrauchtteile-bestand | Herkunft, Zustand, Prüfung und Artikelakte |
| Einführung | arbeitstag | Arbeitsbereiche und aktuelle Aufträge |

Für die native Händler-App liegt keine Originalaufnahme vor. `/loesungen/haendler-app` verwendet deshalb die ausdrücklich als Ablaufbeispiel gekennzeichnete mobile Prozessgrafik. Das bisher dort verwendete Desktop-Lagerbild wurde entfernt.

## Herkunft und Beispieldaten

Aufgenommen mit Chromium bei 1600 × 1000 CSS-Pixeln und Pixeldichte 1,5 aus dem aktuellen `User-Dashboard` im lokalen Demo-Modus. PNG-Dateien sind direkte Browseraufnahmen. `scripts/optimize-product-images.mjs` erzeugt ausschließlich Format- und Größenvarianten in WebP.

Die lokale Aufnahmeumgebung ergänzt die vorhandenen Beispieldaten um eine vollständige Kassen-Sitzung mit ausdrücklich sichtbarer Demo-TSE und eine zur ausgewählten VW-Anfrage passende Beispielnachricht. Die Kasse zeigt eine Vorschau, keinen tatsächlich gebuchten Verkauf. Kein Live-Konto, keine Kundendaten, keine externen Anfragen und keine realen Zahlungen wurden verwendet. Aufnahmeprotokoll und lokale Fixtures liegen im Workspace unter `docs/audits/landingpage-2026-09-04` beziehungsweise `User-Dashboard/.tmp-verify/landingpage-images`.

Alte PNG-Dateien bleiben für bestehende externe Links und archivierte Komponenten verfügbar. Aktive Marketingseiten verwenden ausschließlich die neue Zuordnung. Die sechs Produktreiter sowie die vollständige Vergrößerung bleiben bedienbar.

## Prüfen

`node --experimental-strip-types scripts/check-product-images.mjs` prüft Originalabmessungen, WebP-Varianten und die Bildzuordnung im statischen Export. Danach Desktop- und Handyansichten einschließlich Bildergalerie und Vergrößerung im Browser prüfen.
