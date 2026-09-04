import Link from 'next/link';
export function ArticleWhatsAppBot() {
  return (
    <>
      <p>
        Eine WhatsApp-Anfrage ist im Teilehandel selten nur eine Textnachricht. Häufig gehören ein
        Fahrzeug, ein Foto, eine Teilenummer und eine Rückfrage dazu. Ein Bot kann diese
        Informationen vorbereiten. Für einen guten Ablauf muss aber klar sein, wann ein Mitarbeiter
        übernimmt und wie die Anfrage im Verkauf weitergeht.
      </p>
      <h2>Beginne mit einem abgegrenzten Anwendungsfall</h2>
      <p>
        Wähle zunächst einen Vorgang, den dein Team häufig bearbeitet: zum Beispiel eine
        Teileanfrage mit vorhandenem Fahrzeugbezug. Lege fest, welche Angaben gebraucht werden und
        welche Antwort ohne Fachprüfung möglich ist. Ein uneindeutiger Teilekandidat darf nicht wie
        eine bestätigte Passgenauigkeit behandelt werden.
      </p>
      <ul>
        <li>Kunde und Kontakt erkennen oder zur Klärung vorlegen.</li>
        <li>Fahrzeug und gewünschtes Teil zusammen erfassen.</li>
        <li>Fehlende Angaben gezielt erfragen.</li>
        <li>Bei Unklarheit einen Mitarbeiter mit dem bisherigen Verlauf übernehmen lassen.</li>
      </ul>
      <h2>Konto, Telefonnummer und Nachrichtenregeln klären</h2>
      <p>
        Prüfe vor der Einrichtung, wem das Geschäftskonto und die Telefonnummer gehören und wer
        administrative Zugänge verwaltet. Ob die vorhandene Nummer im gewünschten Betriebsmodell
        nutzbar ist, muss für das konkrete Konto geprüft werden.
      </p>
      <p>
        Die WhatsApp Business Platform unterscheidet Antworten im Kundenservice-Zeitfenster und
        Nachrichten über genehmigte Vorlagen. Für Nachrichten außerhalb des 24-Stunden-Fensters
        gelten entsprechende Vorlagenregeln. Prüfe außerdem die Voraussetzungen für die
        Kontaktaufnahme und beachte Abmeldewünsche. Maßgeblich ist die aktuelle{' '}
        <a href="https://business.whatsapp.com/policy">WhatsApp Business Messaging Policy</a>.
      </p>
      <h2>Die Übergabe ins Team ist Teil des Produkts</h2>
      <p>
        Ein Mitarbeiter braucht den Originalverlauf, die erkannten Daten und eine verständliche
        Begründung für den Klärbedarf. Der Kunde sollte sehen, ob seine Nachricht aufgenommen wurde
        und ob eine persönliche Rückmeldung aussteht. Eine unverbindliche Eingangsbestätigung ist
        keine Zusage für Preis, Lieferzeit oder Passgenauigkeit.
      </p>
      <p>
        Teste neben vollständigen Anfragen auch unlesbare Fotos, widersprüchliche Angaben, mehrere
        Fahrzeuge, Rückgaben und Nachrichten in einer anderen Sprache. Definiere, wer offene Fälle
        prüft und wie Vertretungen funktionieren.
      </p>
      <h2>Angebot, Bestellung und Zahlung getrennt bewerten</h2>
      <p>
        Ein strukturierter Teilebedarf kann die Grundlage eines Angebots werden. Ob ein Zahlungslink
        versendet werden kann, hängt zusätzlich vom Zahlungsanbieter, dessen Vertrag und der
        technischen Freischaltung ab. Eine Chat-Anbindung allein ist noch kein vollständiger
        Checkout.
      </p>
      <p>
        Bei Partsunion ist WhatsApp ein optionaler Eingangskanal. Die{' '}
        <Link href="/loesungen/anfragen-whatsapp">Anfragenbearbeitung</Link> verbindet Nachricht,
        Kunde, Fahrzeug und Teilebedarf mit dem weiteren Verkaufsablauf. Welche Anbindungen dein
        Betrieb benötigt, klären wir vor der Einrichtung.
      </p>
      <h2>Kosten und Einführung realistisch planen</h2>
      <p>
        Berücksichtige Software, Einrichtung, gegebenenfalls Nachrichten- oder Providergebühren,
        Datenpflege und die Einarbeitung des Teams. Die aktuellen Anbieterpreise solltest du direkt
        beim jeweiligen Dienst prüfen. Ein pauschaler Starttermin lässt sich ohne Kenntnis von
        Konto, Freigaben und Anbindungen nicht seriös zusagen.
      </p>
      <p>
        Miss im Pilotbetrieb die vollständig aufgenommenen Anfragen, notwendige Rückfragen und den
        Bearbeitungsaufwand. Diese Zahlen liefern eine bessere Entscheidungsgrundlage als ein
        pauschales Automatisierungsversprechen. Unsere Seite zu{' '}
        <Link href="/pricing">Kosten und Einführung</Link> hilft dir, die benötigten Positionen zu
        strukturieren.
      </p>
    </>
  );
}
