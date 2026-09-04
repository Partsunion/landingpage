import type { Metadata } from 'next';

export type TopicSlug =
  'whatsapp-bot' | 'betriebsassistent' | 'buchhaltung-banking' | 'einfuehrung';
type TopicItem = { title: string; text: string };
export type TopicPageData = {
  slug: TopicSlug;
  label: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  workflowTitle: string;
  workflowIntro: string;
  steps: TopicItem[];
  featureTitle: string;
  featureIntro: string;
  features: TopicItem[];
  screenshot: import('./product-images').ProductImageId;
  screenshotTitle: string;
  screenshotText: string;
  preparationTitle: string;
  preparation: string;
  questions: Array<{ question: string; answer: string }>;
  related: TopicSlug[];
};

export const topicPages: Record<TopicSlug, TopicPageData> = {
  'whatsapp-bot': {
    slug: 'whatsapp-bot',
    label: 'WhatsApp-Bot',
    title: 'Dein Kunde schreibt. Dein Teileverkauf kommt weiter.',
    description:
      'WhatsApp-Bot für Autoteilehändler: Teileanfragen strukturieren, Fahrzeugdaten ergänzen und mit dem Team bis zum Angebot weiterbearbeiten.',
    eyebrow: 'WhatsApp-Bot für den Autoteilehandel',
    intro:
      'Ein Foto vom Fahrzeugschein, eine Nachricht zum gesuchten Teil: Partsunion macht daraus einen bearbeitbaren Vorgang. Der Bot sammelt die Angaben, fragt nach und übergibt sie direkt an deinen Teileverkauf.',
    workflowTitle: 'Vom Chat zum konkreten Teilebedarf.',
    workflowIntro:
      'Die entscheidende Arbeit beginnt nach der ersten Nachricht. Kunde, Fahrzeug und benötigtes Teil müssen zusammenpassen. Genau darauf ist der Partsunion WhatsApp-Bot ausgerichtet.',
    steps: [
      {
        title: 'Die Anfrage kommt an',
        text: 'Dein Kunde beschreibt sein Anliegen in WhatsApp. Text und eingehende Unterlagen bilden den Ausgangspunkt. Die Originalnachricht bleibt am Vorgang, damit dein Team die Anfrage später im Zusammenhang nachvollziehen kann.',
      },
      {
        title: 'Fehlende Angaben ergänzen',
        text: 'Fahrzeug, Teilebedarf und vorhandene Informationen werden zusammengeführt. Fehlen für die Bearbeitung Angaben, führt eine Rückfrage den Kunden weiter. Ein unklarer Bedarf bleibt als Klärfall erkennbar.',
      },
      {
        title: 'Das Team prüft die Auswahl',
        text: 'Bei mehreren Ausführungen, unklarer Zuordnung oder einem Sonderfall übernimmt ein Mitarbeiter. Er findet Fahrzeugdaten und Gespräch direkt an der Anfrage und muss den Kunden nicht alles von vorn erzählen lassen.',
      },
      {
        title: 'Im Verkauf weiterarbeiten',
        text: 'Die geprüfte Anfrage wird zur Grundlage für Angebot und Auftrag. Mit eingerichteten Anbindungen kann sie bis zur Angebotsauswahl im WhatsApp-Dialog weitergehen. Teileauswahl, Preis und Verfügbarkeit gehören zum selben Ablauf. Dein Team arbeitet mit dem Vorgang weiter, statt den Chat in ein zweites System abzutippen.',
      },
    ],
    featureTitle: 'Ein Bot, der deinen Teileablauf versteht.',
    featureIntro:
      'WhatsApp ist der Eingang. Der Vorteil entsteht durch die Verbindung mit Warenwirtschaft, Teileprüfung und deinem Team.',
    features: [
      {
        title: 'Fahrzeug und Bedarf bleiben zusammen',
        text: '„Ich brauche einen Außenspiegel“ reicht für eine sichere Teileauswahl selten aus. Fahrzeugangaben, Einbauseite und Ausführung machen den Unterschied. Partsunion sammelt den Kontext am Vorgang. Dein Mitarbeiter sieht, welche Angaben vorliegen und was noch geklärt werden muss. So entsteht eine Arbeitsgrundlage für die Teileprüfung.',
      },
      {
        title: 'Übernahme ohne Informationsverlust',
        text: 'Ein Kunde hat eine ungewöhnliche Anfrage oder möchte mit einem Menschen sprechen? Die Bearbeitung kann im Team weitergehen. Nachricht, Anhänge und Bearbeitungsstand bleiben sichtbar. Auch Thekenfälle lassen sich im gemeinsamen Arbeitsvorrat führen. Zuständigkeiten und Status helfen dabei, doppelte Bearbeitung und liegen gebliebene Anfragen zu erkennen.',
      },
      {
        title: 'Anfrage und Warenwirtschaft verbunden',
        text: 'Der Bot ist Teil des Partsunion-Ablaufs. Aus der aufgenommenen Anfrage führt der Weg zur OE-Ermittlung, zum Bestand und in den Verkauf. Die genaue Automatisierung richten wir passend zu deinem Sortiment und deinen Anbindungen ein. Bei fachlich offenen Fragen bleibt die Entscheidung bei deinem Team.',
      },
    ],
    screenshot: 'whatsapp-dialog',
    screenshotTitle: 'Der Chat ist Teil des Vorgangs.',
    screenshotText:
      'Echte Partsunion-Produktansicht mit Beispieldaten: Gespräch, Kunde und Fahrzeug werden im selben Arbeitsbereich bearbeitet. Öffne die Ansicht, um die Details zu sehen.',
    preparationTitle: 'So passt der Bot zu deinem Betrieb.',
    preparation:
      'Im Beratungsgespräch nehmen wir eine typische Anfrage aus deinem Alltag durch. Wir klären, welche Angaben deine Kunden meist senden, wann das Team übernehmen soll und wie Angebot und Bestellung entstehen. Für den Start stimmen wir WhatsApp-Anbindung, Nummer, Zuständigkeiten und verfügbare Funktionen ab. Deine konkreten Lieferanten und Kataloge gehören dabei mit auf den Tisch.',
    questions: [
      {
        question: 'Ersetzt der Bot meine Mitarbeiter?',
        answer:
          'Er übernimmt die strukturierte Aufnahme und unterstützt bei den nächsten Schritten. Die fachliche Teileentscheidung und unklare Fälle bleiben beim Team. Ihr legt fest, an welchen Stellen Mitarbeiter prüfen und übernehmen.',
      },
      {
        question: 'Was passiert mit Fotos und Fahrzeugunterlagen?',
        answer:
          'Unterstützte eingehende Bilder und Dokumente bleiben dem Vorgang zugeordnet. Damit kann das Team die Angaben nachvollziehen. Welche Medienfunktionen für deinen Betrieb eingerichtet werden, klären wir gemeinsam vor dem Start.',
      },
      {
        question: 'Passt das auch für Gebrauchtteile?',
        answer:
          'Ja, die Anfrage kann auch ein einzelnes Gebrauchtteil betreffen. Zustand, Ausführung und Verfügbarkeit des konkreten Gebrauchtteils müssen geprüft werden. Dafür wird der Vorgang mit dem passenden Bestand und der weiteren Bearbeitung verbunden.',
      },
    ],
    related: ['betriebsassistent', 'einfuehrung'],
  },
  betriebsassistent: {
    slug: 'betriebsassistent',
    label: 'Betriebsassistent',
    title: 'Frag deinen Betrieb. Und bring Arbeit weiter.',
    description:
      'Partsunion Betriebsassistent: Aufträge, Bestand, Angebote und offene Posten im Zusammenhang prüfen. Aktionen vorbereiten und kontrolliert freigeben.',
    eyebrow: 'Der Betriebsassistent in Partsunion',
    intro:
      'Welche Aufträge können raus? Wo fehlt Ware? Welche Angebote sind offen? Der Betriebsassistent verbindet deine Frage mit den freigegebenen Betriebsdaten und bereitet den nächsten Arbeitsschritt vor.',
    workflowTitle: 'Von einer Frage zu einer Handlung.',
    workflowIntro:
      'Du musst zuerst wissen, was los ist. Danach braucht es den richtigen Vorgang und einen konkreten nächsten Schritt. Der Assistent verbindet diese Arbeit miteinander.',
    steps: [
      {
        title: 'Im Zusammenhang fragen',
        text: 'Stelle eine Frage zu deinem Arbeitstag oder zum geöffneten Auftrag. Der Assistent berücksichtigt den unterstützten Seitenkontext. So kannst du direkt nach Status, Bestand oder nächsten Schritten fragen, während du den Vorgang bearbeitest.',
      },
      {
        title: 'Freigegebene Daten prüfen',
        text: 'Der Assistent sucht in den Bereichen, auf die du zugreifen darfst. Angebote, Aufträge, Bestand oder offene Posten liefern den Zusammenhang. Die Antwort führt zu den betreffenden Vorgängen, damit du die Grundlage nachvollziehen kannst.',
      },
      {
        title: 'Die Bearbeitung vorbereiten',
        text: 'Aus dem Ergebnis kann ein konkreter Vorschlag entstehen: zum Beispiel ein Bestellentwurf für Rückstände, eine Pickliste oder eine Aufgabe. Du siehst, welchen Schritt der Assistent vorbereitet und welche Angaben dafür verwendet werden.',
      },
      {
        title: 'Prüfen und freigeben',
        text: 'Geschäftliche Änderungen benötigen eine sichtbare Bestätigung. Dabei gelten deine Berechtigungen und der passende Betriebskontext. Erst nach der Freigabe wird die unterstützte Aktion ausgeführt. Dein Team behält die Kontrolle über den Vorgang.',
      },
    ],
    featureTitle: 'Ein Arbeitsassistent mit Betriebswissen.',
    featureIntro:
      'Vom Überblick am Morgen bis zur Bearbeitung eines einzelnen Auftrags: Der Nutzen liegt in konkreten Fragen und nachvollziehbaren Antworten.',
    features: [
      {
        title: 'Vertrieb und Lager zusammen betrachten',
        text: 'Lieferfähigkeit hängt von mehreren Dingen ab: Bestellung, Bestand, Reservierungen und Wareneingang. Der Assistent kann diese Perspektiven für unterstützte Vorgänge zusammenführen. Frag nach offenen Aufträgen, fälligen Wareneingängen oder Artikeln unter Mindestbestand. Aus der Antwort gelangst du zur weiteren Bearbeitung im jeweiligen Bereich.',
      },
      {
        title: 'Finanzen und Klärfälle einordnen',
        text: 'Offene Forderungen, Eingangsrechnungen und Retouren gehören zum Alltag. Der Assistent unterstützt bei der Suche und Einordnung, soweit deine Rolle die entsprechenden Daten freigibt. Du kannst einen konkreten Beleg prüfen oder nach anstehenden Aufgaben fragen. So wird aus einer allgemeinen Frage eine überschaubare Liste von Vorgängen.',
      },
      {
        title: 'Aktionen mit sichtbarer Vorschau',
        text: 'Unterstützte Aktionen reichen von Angebots- und Bestellschritten bis zu Rechnungsentwürfen, Picklisten und Aufgaben. Welche davon du nutzen kannst, hängt von Modulen und Berechtigungen ab. Vorschau und Bestätigung sind Bestandteil des Ablaufs. Eine Frage allein löst keine unbemerkte Buchung oder Änderung aus.',
      },
    ],
    screenshot: 'assistent-arbeitsablaeufe',
    screenshotTitle: 'Direkt neben deiner täglichen Arbeit.',
    screenshotText:
      'Der Betriebsassistent im Partsunion-Demosystem: Der Ausschnitt zeigt seine Arbeitsabläufe und das Eingabefeld für eigene Fragen.',
    preparationTitle: 'Mit deinen echten Fragen anfangen.',
    preparation:
      'Bring zum Beratungsgespräch zwei oder drei Fragen mit, die du heute regelmäßig im Betrieb klären musst. Zum Beispiel: „Welche Aufträge warten auf Ware?“ oder „Welche Angebote sollte ich nachfassen?“ Wir gehen den Zusammenhang, die Datenbasis und eine passende Folgeaktion durch. Gleichzeitig klären wir die benötigten Module und Rollen für dein Team.',
    questions: [
      {
        question: 'Kann jeder Mitarbeiter alle Betriebsdaten sehen?',
        answer:
          'Nein. Der Assistent berücksichtigt die Berechtigungen der angemeldeten Person. Zugriff auf Bestand, Belege oder Aktionen hängt von der jeweiligen Rolle ab. Ein Chat erweitert diese Rechte nicht.',
      },
      {
        question: 'Kann der Assistent auch etwas erledigen?',
        answer:
          'Ja. Für unterstützte Abläufe kann er konkrete Änderungen vorbereiten, etwa einen Bestellentwurf oder eine Pickliste. Vor der Ausführung siehst du die Vorschau und bestätigst den Schritt. Die benötigten Rechte müssen vorhanden sein.',
      },
      {
        question: 'Was unterscheidet ihn vom WhatsApp-Bot?',
        answer:
          'Der WhatsApp-Bot begleitet die Kundenanfrage. Der Betriebsassistent arbeitet mit dir und deinem Team innerhalb von Partsunion. Er hilft beim Überblick, bei Fragen zu Betriebsdaten und bei der kontrollierten Bearbeitung von Vorgängen.',
      },
    ],
    related: ['whatsapp-bot', 'buchhaltung-banking'],
  },
  'buchhaltung-banking': {
    slug: 'buchhaltung-banking',
    label: 'Buchhaltung & Banking',
    title: 'Vom Auftrag bis zum zugeordneten Zahlungseingang.',
    description:
      'Buchhaltung und Banking für den Teilehandel: Rechnungen, offene Posten, Bankumsätze, Zuordnung und vorbereitete DATEV-Übergabe in Partsunion.',
    eyebrow: 'Buchungen, Belege und Banking',
    intro:
      'Was wurde berechnet? Welche Zahlung gehört dazu? Wo fehlt noch ein Beleg? Partsunion verbindet Verkauf und Finanzbearbeitung, damit du offene Vorgänge gezielt klären kannst.',
    workflowTitle: 'Ein Geschäftsvorgang. Ein nachvollziehbarer Belegfluss.',
    workflowIntro:
      'Mit der Rechnung ist ein Auftrag kaufmännisch noch nicht abgeschlossen. Zahlung, Zuordnung und mögliche Abweichungen gehören ebenso dazu.',
    steps: [
      {
        title: 'Belege im Vorgang führen',
        text: 'Aus dem Verkaufsablauf entstehen die zugehörigen Belege. Kunde, Positionen und Rechnungsstand bleiben nachvollziehbar. Auch Eingangsrechnungen und Klärfälle lassen sich im Finanzbereich bearbeiten, damit fehlende Unterlagen nicht erst bei der Übergabe auffallen.',
      },
      {
        title: 'Bankumsätze bereitstellen',
        text: 'Du kannst unterstützte Kontoauszüge importieren oder eine verfügbare Bankanbindung einrichten. Konten, Umsätze und offene Zuordnungen erscheinen im Banking-Arbeitsbereich. Die konkrete Bank und benötigte Freischaltungen prüfen wir bei der Einrichtung.',
      },
      {
        title: 'Zahlungen zuordnen',
        text: 'Zuordnungsvorschläge helfen, Bankbewegungen mit offenen Rechnungen zu verbinden. Du prüfst Betrag, Verwendungszweck und Beleg. Auch Teilzahlungen, Aufteilungen oder Abweichungen müssen zum tatsächlichen Vorgang passen, bevor du die Zuordnung bestätigst.',
      },
      {
        title: 'Übergabe vorbereiten',
        text: 'Belege und Buchungsdaten bilden die Grundlage für die weitere Buchhaltungsbearbeitung. Für das DATEV-Modul werden Export, Kontenzuordnung und Importprofil abgestimmt. Mit deiner Steuerkanzlei legen wir fest, welche Daten in welcher Form gebraucht werden.',
      },
    ],
    featureTitle: 'Offene Punkte sehen. Sauber weiterbearbeiten.',
    featureIntro:
      'Der Finanzbereich zeigt nicht nur Summen. Er führt zu den Belegen und Zahlungen, bei denen dein Team etwas erledigen muss.',
    features: [
      {
        title: 'Offene Posten im Zusammenhang',
        text: 'Eine Rechnung, eine Teilzahlung und eine Rückgabe können denselben Kunden betreffen. Im Finanzablauf braucht es deshalb den Zusammenhang zwischen Beleg und Zahlung. Du erkennst offene Beträge und kannst die zugehörigen Vorgänge prüfen. Der Betriebsassistent unterstützt berechtigte Mitarbeiter bei Fragen zu Forderungen, Belegen und den nächsten Arbeitsschritten.',
      },
      {
        title: 'Bankabgleich mit Klärfällen',
        text: 'Fehlt ein Beleg oder stimmt der Betrag nicht überein, braucht der Fall eine Bearbeitung. Banking bietet Prüfgründe und nachvollziehbare Zuordnungen. Unterstützte Zahlungsteilungen und Korrekturen lassen sich gezielt bearbeiten. Eine technisch erkannte Übereinstimmung ersetzt dabei nicht die Prüfung, ob die Zuordnung fachlich zu eurem Vorgang passt.',
      },
      {
        title: 'Buchungsdaten für die weitere Arbeit',
        text: 'Finanzfunktionen, Kontenzuordnung und Export sollen zu deinem Betrieb und zur Zusammenarbeit mit der Kanzlei passen. Das DATEV-Modul stellt Buchungsstapel für eine kontrollierte Übergabe bereit. Vor dem ersten produktiven Import stimmen wir die benötigten Einstellungen und das Importprofil ab. Verfügbarkeit und Umfang der Module werden im Angebot festgehalten.',
      },
    ],
    screenshot: 'banking-abgleich',
    screenshotTitle: 'Bankumsatz und Beleg nebeneinander prüfen.',
    screenshotText:
      'Der Banking-Arbeitsbereich mit Beispieldaten zeigt Konto, offene Umsätze und Zuordnungsvorschläge. Die Ansicht lässt sich vergrößern, um die einzelnen Schritte zu erkennen.',
    preparationTitle: 'Dein Finanzablauf gehört ins Erstgespräch.',
    preparation:
      'Wir klären, wo heute Rechnungen entstehen, wie Zahlungen eingehen und wer den Bankabgleich erledigt. Dazu gehören Bankkonten, Zahlungsanbieter, Teilzahlungen und die Zusammenarbeit mit deiner Steuerkanzlei. Aus diesen Angaben ergibt sich die passende Einrichtung. Bankanbindungen, Zahlungsanbieter und DATEV-Modul werden konkret geprüft und vereinbart.',
    questions: [
      {
        question: 'Kann ich mein Bankkonto direkt anbinden?',
        answer:
          'Partsunion unterstützt Bankverbindungen und den Import unterstützter Kontoauszüge. Welche Verbindung für deine konkrete Bank verfügbar ist und welche Freigaben du dafür brauchst, prüfen wir bei der Einrichtung.',
      },
      {
        question: 'Werden Zahlungen automatisch als erledigt markiert?',
        answer:
          'Das Banking zeigt Zuordnungsvorschläge. Du prüfst den passenden Beleg und bestätigst die Zuordnung. Abweichungen, Teilzahlungen und unklare Bewegungen können gezielt als eigene Fälle bearbeitet werden.',
      },
      {
        question: 'Wie funktioniert die Zusammenarbeit mit der Steuerkanzlei?',
        answer:
          'Wir stimmen benötigte Belege, Kontenzuordnung und Exportformat ab. Für DATEV werden Modulfreischaltung und Importprofil geprüft. So ist vor dem Start klar, welche Daten du übergibst und wie die Kanzlei damit weiterarbeitet.',
      },
    ],
    related: ['betriebsassistent', 'einfuehrung'],
  },
  einfuehrung: {
    slug: 'einfuehrung',
    label: 'Einführung & Datenübernahme',
    title: 'Ein klarer Weg vom bisherigen System zu Partsunion.',
    description:
      'Partsunion einführen: Abläufe abstimmen, Datenübernahme prüfen, Team schulen und mit einem festgelegten Bereich starten. Beratungstermin vereinbaren.',
    eyebrow: 'Einführung und Datenübernahme',
    intro:
      'Dein Tagesgeschäft läuft weiter. Deshalb planen wir gemeinsam, mit welchen Abläufen du startest, welche Daten gebraucht werden und wie dein Team damit arbeiten wird.',
    workflowTitle: 'Der Start bekommt einen konkreten Plan.',
    workflowIntro:
      'Die richtige Reihenfolge hängt von deinem Betrieb ab. Ein überschaubarer erster Bereich macht Zuständigkeiten, Daten und offene Fragen greifbar.',
    steps: [
      {
        title: 'Ablauf und Ziel festlegen',
        text: 'Im Beratungsgespräch gehen wir einen typischen Vorgang durch: vom Eingang der Anfrage bis zum Verkauf oder Zahlungseingang. Wir klären, welche Bereiche zuerst gebraucht werden und woran du einen funktionierenden Start erkennst.',
      },
      {
        title: 'Daten und Anbindungen prüfen',
        text: 'Ein Beispielexport zeigt, welche Kunden-, Artikel- und Bestandsdaten vorhanden sind. Gemeinsam prüfen wir Felder, Dubletten und Besonderheiten. Lieferanten, Kataloge, WhatsApp und Finanzanbindungen werden nach dem vereinbarten Umfang vorbereitet.',
      },
      {
        title: 'Mit dem Team durchspielen',
        text: 'Die Mitarbeiter üben die vorgesehenen Abläufe mit passenden Beispielen. Dazu gehören auch Rückfragen, Fehlmengen, Retouren und Zuständigkeitswechsel. Rollen und Freigaben werden so eingerichtet, dass jeder seine Arbeit ausführen kann.',
      },
      {
        title: 'Starten und gezielt erweitern',
        text: 'Vor dem Wechsel stimmen wir offene Punkte, Datenstand und Verantwortliche ab. Der vereinbarte Bereich geht zuerst in Nutzung. Weitere Funktionen folgen, sobald die Voraussetzungen geklärt und die nächsten Schritte gemeinsam festgelegt sind.',
      },
    ],
    featureTitle: 'Die Einführung beginnt bei deinem Alltag.',
    featureIntro:
      'Software, Daten und Menschen müssen zusammenpassen. Wir legen die notwendigen Entscheidungen vor den Wechsel, damit dein Team vorbereitet startet.',
    features: [
      {
        title: 'Datenübernahme mit Beispielexport',
        text: 'Ein bestehender Datenbestand ist selten schon perfekt sortiert. Artikelnummern, Kundenfelder, Lagerorte und Dubletten müssen zuerst verständlich sein. An einem Auszug prüfen wir, was direkt übernommen werden kann und welche Bereinigung sinnvoll ist. Auch der Umgang mit alten Belegen und offenen Vorgängen wird ausdrücklich abgestimmt.',
      },
      {
        title: 'Ein sinnvoller erster Umfang',
        text: 'Du musst nicht jeden Bereich gleichzeitig umstellen. Ein möglicher Einstieg ist die Verbindung aus Teileanfragen und Verkauf. Ein anderer Betrieb beginnt mit Bestand und Gebrauchtteilen. Entscheidend sind deine Engpässe und die Abhängigkeiten zwischen den Abläufen. Der vereinbarte Umfang bildet die Grundlage für Einrichtung, Schulung und Angebot.',
      },
      {
        title: 'Das Team arbeitet den Ablauf durch',
        text: 'Eine Einführung sollte über das Zeigen von Menüs hinausgehen. Wir nehmen die tatsächlichen Arbeitsschritte: Anfrage übernehmen, Teil prüfen, Angebot erstellen, Bestand bearbeiten oder eine Zahlung zuordnen. Dabei werden Zuständigkeiten und Rückfragen sichtbar. So kann das Team seine Aufgaben in den neuen Abläufen wiederfinden.',
      },
    ],
    screenshot: 'arbeitstag',
    screenshotTitle: 'An echten Abläufen orientiert.',
    screenshotText:
      'Die Übersicht für den Arbeitstag im Partsunion-Demosystem. An diesen Arbeitsbereichen gehen wir gemeinsam durch, wie das Team Verkauf, Aufträge und offene Arbeit übernimmt und weiterführt.',
    preparationTitle: 'Das hilft für dein Beratungsgespräch.',
    preparation:
      'Hilfreich sind der Name deines bisherigen Systems, die wichtigsten Verkaufskanäle und ein typischer Kundenfall. Wenn du schon weißt, welche Lieferanten, Konten oder Kataloge angebunden werden sollen, bring diese Angaben mit. Einen vollständigen Datenexport brauchst du für das erste Gespräch noch nicht. Wir legen gemeinsam fest, welche Informationen für die nächste Prüfung sinnvoll sind.',
    questions: [
      {
        question: 'Wie lange dauert die Einführung?',
        answer:
          'Das hängt vom vereinbarten Umfang, der Datenqualität und den benötigten Anbindungen ab. Nach der ersten Prüfung stimmen wir einen konkreten Plan ab. Einzelne Bereiche können sich leichter starten lassen als ein vollständiger Wechsel aller Abläufe.',
      },
      {
        question: 'Kann mein bisheriger Datenbestand übernommen werden?',
        answer:
          'Wir prüfen zunächst einen Beispielexport. Daraus ergeben sich der mögliche Umfang und notwendige Anpassungen. Kunden, Artikel, Bestand und historische Vorgänge haben unterschiedliche Anforderungen; diese werden vor der Übernahme geklärt.',
      },
      {
        question: 'Wie setzen sich die Kosten zusammen?',
        answer:
          'Funktionsumfang, Nutzer und Anbindungen bestimmen die laufenden Kosten. Für Einrichtung, Datenübernahme und Schulung können einmalige Aufwände entstehen. Nach der Abstimmung erhältst du ein konkretes Angebot mit getrennt ausgewiesenen Positionen.',
      },
    ],
    related: ['whatsapp-bot', 'buchhaltung-banking'],
  },
};

export function topicMetadata(slug: TopicSlug): Metadata {
  const page = topicPages[slug];
  return {
    title: `${page.label} für den Teilehandel`,
    description: page.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${page.label} · Partsunion`,
      description: page.description,
      url: `https://partsunion.de/${slug}`,
    },
  };
}
