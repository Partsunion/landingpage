import Link from 'next/link';
export function ArticleOemErmittlung() {
  return (
    <>
      <p>
        „Ich brauche Bremsen für einen Golf“ beschreibt einen Teilebedarf, aber noch keine
        eindeutige Ausführung. Fahrzeugidentifikation, Baugruppe und konkrete technische Merkmale
        müssen zusammenpassen. Eine OE-Nummer ist dabei eine Referenz, deren Eignung für den
        jeweiligen Fall geprüft werden muss.
      </p>
      <h2>Was VIN, HSN und TSN leisten</h2>
      <p>
        Die Fahrzeug-Identifizierungsnummer (VIN) steht in Feld E der Zulassungsbescheinigung Teil
        I. Feld 2.1 enthält den Herstellercode. Feld 2.2 bezeichnet den Code zu Typ, Variante und
        Version mit Prüfziffer. Feld 2.2 ist deshalb nicht pauschal ein Feld für den Motorcode. Die
        amtlichen Felddefinitionen stehen in{' '}
        <a href="https://www.gesetze-im-internet.de/fzv_2023/anlage_6.html">
          Anlage 6 der Fahrzeug-Zulassungsverordnung
        </a>
        .
      </p>
      <p>
        Welche weiteren Daten erforderlich sind, hängt vom Fahrzeug und der Baugruppe ab. Dazu
        können Produktionszeitraum, Ausstattung, Abmessungen oder Kennzeichnungen am vorhandenen
        Teil gehören. Den passenden Nachweis prüfst du im jeweiligen Fahrzeug- und Katalogkontext.
      </p>
      <h2>Vom Dokumentfoto zum prüfbaren Datensatz</h2>
      <p>
        Texterkennung kann Daten aus einem Foto vorerfassen. Sie macht aus einem unlesbaren Dokument
        aber keine verlässliche Identifikation. Prüfe besonders ähnliche Zeichen und abgeschnittene
        Felder. Die ursprüngliche Aufnahme sollte für die fachliche Kontrolle erreichbar bleiben.
      </p>
      <ol>
        <li>Lesbarkeit und Vollständigkeit des Dokuments prüfen.</li>
        <li>Erfasste Fahrzeugdaten mit dem Original abgleichen.</li>
        <li>Den Teilebedarf einschließlich Einbauort und Seite festhalten.</li>
        <li>Unklare Angaben als Rückfrage dokumentieren.</li>
      </ol>
      <h2>Die OE-Referenz im Katalog prüfen</h2>
      <p>
        Suche die passende Baugruppe im freigegebenen Katalog. Beachte Einschränkungen und Hinweise
        zur Ausführung. Eine Nummer kann ersetzt worden sein oder nur unter bestimmten
        Voraussetzungen passen. Eine ähnliche Bezeichnung allein reicht nicht für die Freigabe.
      </p>
      <p>
        Bei einer Bremse können beispielsweise Einbauposition und technische Abmessungen
        entscheidend sein. Welche Merkmale im Einzelfall zu prüfen sind, ergibt sich aus den
        Hersteller- und Katalogangaben. Wenn mehrere Kandidaten bleiben, wird die Auswahl durch
        zusätzliche Merkmale eingegrenzt.
      </p>
      <h2>Alternativen brauchen ebenfalls eine Prüfung</h2>
      <p>
        Eine Querverweisnummer kann bei der Suche nach Alternativen helfen. Vergleiche trotzdem die
        relevante Ausführung und den tatsächlich gelieferten Umfang. Ein Ersatzteil, ein Satz und
        ein vormontiertes Bauteil können unterschiedliche Inhalte haben.
      </p>
      <p>
        Halte die verwendete Referenz und die Gründe für die Auswahl am Vorgang fest. So kann ein
        Kollege die Entscheidung später nachvollziehen, ohne die gesamte Suche zu wiederholen. Das
        hilft auch, wenn eine <Link href="/loesungen/retouren">Retoure oder Reklamation</Link>{' '}
        eingeht.
      </p>
      <h2>Wie Partsunion den Ablauf verbindet</h2>
      <p>
        Die <Link href="/loesungen/oe-ermittlung">OE-Ermittlung in Partsunion</Link> führt
        Fahrzeugbezug, Anfrage und Teileauswahl zusammen. Lizenzierte Katalogzugriffe werden im
        vereinbarten Umfang eingerichtet. Unsichere Fälle bleiben zur fachlichen Prüfung sichtbar;
        die geprüften Angaben können im Verkaufsprozess weiterverwendet werden.
      </p>
      <p>
        Für die Beurteilung einer Software solltest du einen eigenen schwierigen Fall ins
        Beratungsgespräch mitbringen. Interessant ist nicht nur ein erfolgreicher Treffer, sondern
        auch der Umgang mit fehlenden Daten und mehreren möglichen Ausführungen.
      </p>
    </>
  );
}
