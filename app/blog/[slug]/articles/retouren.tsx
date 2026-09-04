import Link from 'next/link';
export function ArticleRetouren() {
  return (
    <>
      <p>
        Eine Retoure ist zunächst ein Ergebnis. Ob sie durch eine falsche Teilezuordnung, einen
        Bestellfehler, einen Transportschaden oder einen Defekt entstanden ist, musst du getrennt
        erfassen. Erst dann lässt sich entscheiden, welcher Arbeitsschritt verbessert werden sollte.
      </p>
      <p>
        Dieser 90-Tage-Plan ist ein Vorschlag zur Organisation deiner Arbeit. Er enthält keine
        Branchenquote und keine zugesagte Reduktion. Entscheidend sind die nachvollziehbar erhobenen
        Zahlen deines eigenen Betriebs.
      </p>
      <h2>Vor dem Start: Was genau misst du?</h2>
      <p>
        Lege fest, ob du retournierte Positionen, Stückzahlen oder Aufträge zählst. Die Bezugsgröße
        muss dieselbe bleiben. Zehn retournierte Positionen bei 500 ausgelieferten Positionen
        entsprechen in einem vereinfachten Beispiel 2 Prozent. Das sagt noch nichts über Kosten oder
        Ursachen aus.
      </p>
      <p>
        Vergleiche außerdem gleich lange und ausreichend abgeschlossene Lieferzeiträume. Neue
        Lieferungen hatten weniger Zeit, als Retoure zurückzukommen. Eine scheinbar sinkende Quote
        kann sonst allein durch diesen Zeitversatz entstehen.
      </p>
      <h2>Tage 1–30: Ursachen und Ausgangslage erfassen</h2>
      <ol>
        <li>Verknüpfe jede Rückgabe mit dem ursprünglichen Auftrag und der konkreten Position.</li>
        <li>
          Trenne Rückgabe ohne Mangel, falsche Zuordnung, Falschlieferung, Transportschaden und
          Defekt.
        </li>
        <li>Dokumentiere Fahrzeugdaten, Ausführung, Lieferdatum, Rückgabegrund und Zustand.</li>
        <li>
          Halte Prüfaufwand, Transport und mögliche Wertminderung getrennt vom reinen Artikelwert
          fest.
        </li>
      </ol>
      <p>
        Prüfe eine Stichprobe gemeinsam mit Theke und Lager. Hat der Kunde eine falsche Angabe
        gemacht? Wurde eine notwendige Rückfrage übersprungen? Oder wurde das richtige Teil
        angeboten und ein anderes gepackt? Diese Fälle benötigen unterschiedliche Maßnahmen.
      </p>
      <h2>Tage 31–60: Einen konkreten Fehlerpfad verbessern</h2>
      <p>
        Wähle einen häufigen, gut belegten Grund. Bei Zuordnungsfehlern kann eine verpflichtende
        Prüfung der Ausführung helfen. Bei Falschlieferungen ist eher der Abgleich von Artikel und
        Auftrag beim Packen relevant. Bei Schäden brauchst du einen Blick auf Verpackung, Transport
        und Zustandsdokumentation.
      </p>
      <p>
        Definiere für die gewählte Maßnahme eine verantwortliche Person und eine prüfbare Regel.
        „Sorgfältiger arbeiten“ ist keine klare Anweisung. „Vor Freigabe die offene Ausführungsfrage
        am Vorgang beantworten“ schon.
      </p>
      <h2>Tage 61–90: Wirkung prüfen und Regeln nachschärfen</h2>
      <p>
        Vergleiche abgeschlossene Lieferzeiträume mit ähnlichem Sortiment und Verkaufskanal. Prüfe
        neben der Quote auch Bearbeitungszeit, Kundenrückfragen und Kosten. Eine zusätzliche Prüfung
        kann sich lohnen, selbst wenn sie den ersten Verkaufsschritt verlängert.
      </p>
      <p>
        Behalte wirksame Maßnahmen bei. Wenn sich nichts ändert, prüfe zunächst, ob die Regel
        angewendet wurde und ob die Ursache richtig zugeordnet war. Eine verlässliche Dokumentation
        ist hilfreicher als eine möglichst niedrige Zahl ohne belastbare Grundlage.
      </p>
      <h2>Wie die Warenwirtschaft unterstützen kann</h2>
      <p>
        Die Software sollte Ursprungsbeleg, Teil, Fahrzeugbezug, Rückgabegrund, Zustand und
        Entscheidung zusammenführen. In Partsunion bleiben diese Angaben am{' '}
        <Link href="/loesungen/retouren">Retouren- oder Reklamationsvorgang</Link>. Fachliche
        Prüfung und Freigabe gehören weiterhin zum Ablauf.
      </p>
      <p>
        Für die vorgelagerte Prüfung findest du im{' '}
        <Link href="/blog/oem-ermittlung-aus-vin-hsn-tsn">Leitfaden zur OE-Ermittlung</Link> eine
        Checkliste der benötigten Fahrzeug- und Teiledaten.
      </p>
    </>
  );
}
