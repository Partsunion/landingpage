import Link from "next/link";
import { ChevronRight, Mail, MapPin } from "lucide-react";
import { routeByPath } from "@/lib/site-data";

const company = {
  name: "PartsUnion UG (haftungsbeschränkt)",
  street: "Zum Sommersberg 27",
  city: "50321 Brühl",
  email: "info@partsunion.de",
  registerCourt: "Amtsgericht Köln",
  registerNumber: "HRB 128845",
  vatId: "DE464848197",
  directors: ["Bardia Bagherian", "Alexander Blawat", "Aaron Cedric Vogt", "Elias Ali Zafar"],
} as const;

function Breadcrumbs({ title }: { title: string }) {
  return <div className="container breadcrumbs"><Link href="/">Startseite</Link><ChevronRight /><span>{title}</span></div>;
}

function CompanyCard() {
  return <aside className="legal-company-card">
    <strong>{company.name}</strong>
    <span><MapPin /><span>{company.street}<br />{company.city}<br />Deutschland</span></span>
    <a href={`mailto:${company.email}`}><Mail />{company.email}</a>
    <small>{company.registerCourt}<br />{company.registerNumber}<br />USt-IdNr. {company.vatId}</small>
  </aside>;
}

function Impressum() {
  return <>
    <h2>Impressum</h2>
    <p className="legal-lead">Anbieterkennzeichnung gemäß § 5 Digitale-Dienste-Gesetz (DDG).</p>

    <h3>Anbieter und Vertragspartner</h3>
    <address>
      <strong>{company.name}</strong><br />
      {company.street}<br />
      {company.city}<br />
      Deutschland
    </address>

    <h3>Vertretungsberechtigte Geschäftsführer</h3>
    <ul>{company.directors.map((director) => <li key={director}>{director}</li>)}</ul>
    <p>Die Geschäftsführer sind jeweils einzelvertretungsberechtigt.</p>

    <h3>Kontakt</h3>
    <p>E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a><br />Kontaktformular: <Link href="/contact">partsunion.de/contact</Link></p>

    <h3>Registereintrag</h3>
    <p>Registergericht: {company.registerCourt}<br />Handelsregisternummer: {company.registerNumber}</p>

    <h3>Umsatzsteuer</h3>
    <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: <strong>{company.vatId}</strong></p>

    <h3>Redaktionell verantwortlich</h3>
    <p>Verantwortlich für journalistisch-redaktionelle Inhalte gemäß § 18 Abs. 2 MStV: Bardia Bagherian, {company.street}, {company.city}.</p>

    <h3>Verbraucherstreitbeilegung</h3>
    <p>Wir sind weder verpflichtet noch bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Partsunion richtet sein Leistungsangebot ausschließlich an Unternehmer im Sinne des § 14 BGB.</p>

    <h3>Verantwortung für Inhalte und Links</h3>
    <p>Wir erstellen die Inhalte dieser Website mit Sorgfalt. Für Richtigkeit, Vollständigkeit und Aktualität können wir jedoch keine allgemeine Gewähr übernehmen. Verlinkte externe Websites unterliegen der Verantwortung ihrer jeweiligen Betreiber. Bei Bekanntwerden einer konkreten Rechtsverletzung entfernen wir den betreffenden Link.</p>

    <h3>Urheber- und Kennzeichenrechte</h3>
    <p>Die von uns erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Marken und Kennzeichen der jeweiligen Hersteller, Plattformen und Datenanbieter verbleiben bei ihren Inhabern. Eine Verwendung außerhalb der gesetzlichen Grenzen bedarf der vorherigen Zustimmung des jeweiligen Rechteinhabers.</p>

    <p className="legal-note">Stand: Oktober 2026</p>
  </>;
}

function Agb() {
  return <>
    <h2>Allgemeine Geschäftsbedingungen (B2B)</h2>
    <p className="legal-lead">für die Bereitstellung der Partsunion Software, zugehörige Einrichtungs-, Support- und Integrationsleistungen sowie ergänzende Module.</p>

    <h3>1. Anbieter, Geltungsbereich und Unternehmereigenschaft</h3>
    <p>Diese Allgemeinen Geschäftsbedingungen gelten für Verträge zwischen der {company.name}, {company.street}, {company.city} („Partsunion“) und ihren Kunden über die Nutzung der Partsunion Plattform und damit verbundene Leistungen. Das Angebot richtet sich ausschließlich an Unternehmer (§ 14 BGB), juristische Personen des öffentlichen Rechts und öffentlich-rechtliche Sondervermögen. Ein Vertragsschluss mit Verbrauchern ist nicht vorgesehen.</p>
    <p>Abweichende Geschäftsbedingungen des Kunden gelten nur, wenn Partsunion ihrer Geltung ausdrücklich in Textform zugestimmt hat. Individuelle Vereinbarungen im Angebot, in der Auftragsbestätigung oder in einem beiderseits bestätigten Vertragsdokument haben Vorrang vor diesen AGB.</p>
    <p>Wird ein gesonderter AIaaS-Rahmenvertrag mit Erstbestellung, Leistungsbeschreibung, Lizenzmatrix und Preisverzeichnis sowie Auftragsverarbeitungsvertrag geschlossen, sind diese Dokumente für das konkrete Vertragsverhältnis maßgeblich. Diese Website-Bedingungen gelten daneben nur, soweit beide Parteien ihre Einbeziehung ausdrücklich vereinbaren. Die bloße Veröffentlichung begründet keine zusätzliche Vertragsvereinbarung.</p>

    <h3>2. Vertragsgegenstand und Leistungsumfang</h3>
    <p>Partsunion stellt eine cloudbasierte ERP-, Warenwirtschafts- und Automatisierungsplattform für den gewerblichen Neu- und Gebrauchtteilehandel bereit. Abhängig vom gebuchten Umfang können insbesondere Fahrzeug- und OE-Ermittlung, Anfrage- und Angebotsbearbeitung, Einkauf, Auftragsabwicklung, Lager und Bestand, Retouren, Kasse, Buchhaltung und Banking, Händler-App, Kundenportal sowie Kommunikations- und Automatisierungsfunktionen enthalten sein.</p>
    <p>Der konkrete Leistungsumfang, die freigeschalteten Module, Nutzerzahlen, Schnittstellen, Einrichtungsleistungen und Vergütung ergeben sich aus dem jeweiligen Angebot oder der Auftragsbestätigung. Darstellungen auf der Website beschreiben das Produkt allgemein und bedeuten nicht, dass jede Funktion Bestandteil jedes Vertrags ist. Partsunion schuldet keinen bestimmten wirtschaftlichen Erfolg.</p>
    <p>Das Lizenzmodell besteht aus einer standortgebundenen Werkstatt-Lizenz mit fünf Basis-Nutzerlizenzen und 500 VIN-Teileabfragen pro Vertragsmonat. Eine Teileabfrage zählt je einzeln abgefragtem Ersatzteil. Zusätzliche Named-User-Lizenzen und VIN-Upgrades um jeweils 1.000 Teileabfragen können gesondert bestellt werden. Nicht verbrauchte Kontingente verfallen am Ende des Vertragsmonats. Abfragen über das gebuchte Kontingent hinaus werden gemäß dem vereinbarten Preisverzeichnis berechnet.</p>

    <h3>3. Vertragsschluss</h3>
    <p>Website, Produktdemo, Beratung und Preisindikation sind unverbindlich. Der AIaaS-Rahmenvertrag kommt durch Unterzeichnung beider Parteien zustande. Die Erstbestellung erfolgt über das zugehörige Bestellformular. Nachbestellungen von Zusatz-Nutzerlizenzen oder VIN-Upgrades kommen durch Annahme der Kundenbestellung, Bestellbestätigung oder Bereitstellung durch Partsunion zustande. Buchung eines Beratungstermins, Kontaktanfrage oder Download der Desktop-App allein begründen keinen kostenpflichtigen Softwarevertrag.</p>

    <h3>4. Bereitstellung, Einführung und Änderungen</h3>
    <p>Partsunion stellt die gebuchten Leistungen ab dem vereinbarten Zeitpunkt über Web-, Desktop- oder mobile Anwendungen zur Verfügung. Termine für Einrichtung, Datenübernahme, Schulung und Schnittstellen setzen die rechtzeitige Mitwirkung des Kunden voraus. Verzögerungen aus der Sphäre des Kunden verschieben davon abhängige Termine angemessen.</p>
    <p>Gesondert beauftragtes Onboarding umfasst Einrichtung, Implementierung und Konfiguration. Nach Abschluss führen die Parteien einen Testlauf durch und erklären die Abnahme, sofern keine abnahmeverhindernden Mängel bestehen. Unwesentliche Mängel werden dokumentiert und beseitigt. Nach Abnahme werden die Lizenzen gebührenpflichtig aktiviert. Eine Nutzung im Livebetrieb ohne Anzeige eines abnahmeverhindernden Mangels gilt nach Maßgabe des Rahmenvertrags ebenfalls als Abnahme.</p>
    <p>Partsunion darf die Software weiterentwickeln und Funktionen ändern, wenn die vertragsgemäße Nutzung dadurch nicht unzumutbar beeinträchtigt wird. Wesentliche nachteilige Änderungen werden rechtzeitig angekündigt. Neue Module und Leistungen können gesondert angeboten und vergütet werden.</p>

    <h3>5. Nutzungsrecht und Zugänge</h3>
    <p>Für die Vertragsdauer erhält der Kunde ein einfaches, nicht ausschließliches, nicht übertragbares und nicht unterlizenzierbares Recht, die gebuchte Software für eigene betriebliche Zwecke und im vereinbarten Umfang zu nutzen. Eine Überlassung an Dritte, Weitervermietung, Umgehung technischer Beschränkungen sowie Reverse Engineering sind unzulässig, soweit nicht zwingendes Recht etwas anderes erlaubt.</p>
    <p>Der Kunde darf Zugänge nur den vereinbarten Nutzern bereitstellen. Zugangsdaten sind personenbezogen, geheim zu halten und bei Verdacht auf Missbrauch unverzüglich zu ändern beziehungsweise Partsunion zu melden. Handlungen unter einem Zugang werden dem Kunden zugerechnet, soweit er den Missbrauch zu vertreten hat.</p>
    <p>Die Desktop-App darf nur auf Hardware am vereinbarten physischen Geschäftsstandort installiert und genutzt werden. Nutzerlizenzen sind Named-User-Lizenzen; Lizenz-Sharing ist untersagt. Bei einem Mitarbeiterwechsel darf eine Lizenz einem anderen namentlich registrierten Mitarbeiter zugeordnet werden. Beauftragte Dritte, etwa Freelancer, dürfen mit entsprechender Nutzerberechtigung ausschließlich interne Abläufe des Kunden bearbeiten.</p>

    <h3>6. Pflichten und Mitwirkung des Kunden</h3>
    <p>Der Kunde stellt vollständige und richtige Stamm-, Steuer-, Unternehmens-, Fahrzeug-, Teile- und Kontaktdaten bereit, hält sie aktuell und prüft Verarbeitungsergebnisse vor ihrer geschäftlichen Verwendung. Er schafft die erforderlichen technischen Voraussetzungen, benennt Ansprechpartner und erteilt notwendige Freigaben rechtzeitig.</p>
    <p>Der Kunde darf die Plattform nicht rechtswidrig, missbräuchlich oder zur Verletzung von Rechten Dritter einsetzen. Er gewährleistet, dass er Kundendaten, Bilder, Dokumente, Nachrichten und sonstige Inhalte rechtmäßig verarbeiten und Partsunion zur Vertragserfüllung bereitstellen darf. Gesetzliche Aufzeichnungs-, Aufbewahrungs-, Informations- und Prüfungspflichten des Kunden bleiben unberührt.</p>

    <h3>7. Fahrzeug-, Teile- und KI-gestützte Ergebnisse</h3>
    <p>Fahrzeug-, VIN-, HSN/TSN-, OE- und Teilezuordnungen sowie KI-gestützte Vorschläge unterstützen die betriebliche Bearbeitung. Sie können trotz sorgfältiger Verarbeitung unvollständig oder fehlerhaft sein. Der Kunde prüft insbesondere Teilekompatibilität, Identität des Fahrzeugs, Preis, Lieferfähigkeit, Steuerbehandlung und Beleginhalt vor Bestellung, Verkauf oder Buchung anhand geeigneter Primärdaten und Herstellerinformationen.</p>
    <p>Partsunion erbringt keine Rechts-, Steuer- oder Unternehmensberatung. Hinweise zu GoBD, TSE, E-Rechnung, DATEV oder Differenzbesteuerung ersetzen nicht die Prüfung des konkreten Einzelfalls durch fachkundige Berater.</p>
    <p>Die KI darf nur unterstützend eingesetzt werden; die menschliche Überprüfung und Letztentscheidung bleibt beim Kunden. Der Kunde sorgt für die erforderliche KI-Kompetenz seiner Nutzer und erfüllt eigene Transparenz- und Informationspflichten. Verbotene Praktiken und der Einsatz in Hochrisikobereichen nach der KI-Verordnung sowie die Verarbeitung besonderer Kategorien personenbezogener Daten nach Art. 9 DSGVO sind im Rahmen dieses Lizenzmodells untersagt.</p>

    <h3>8. Schnittstellen und Leistungen Dritter</h3>
    <p>Gebuchte Funktionen können Dienste Dritter einbinden, etwa Teilekataloge, Lieferanten, Marktplätze, WhatsApp/Meta, Microsoft, Banken, Zahlungs-, Versand- oder Buchhaltungsdienste. Für deren Nutzung können gesonderte Verträge, Konten, Einwilligungen und Entgelte erforderlich sein. Soweit nicht ausdrücklich anders vereinbart, ist der Kunde hierfür verantwortlich.</p>
    <p>Partsunion ist nicht für Änderungen, Einschränkungen oder Ausfälle eines Drittdienstes verantwortlich, die außerhalb des Einflussbereichs von Partsunion liegen. Partsunion wird zumutbare Maßnahmen treffen, um Auswirkungen auf die gebuchten Leistungen zu begrenzen und den Kunden über wesentliche dauerhafte Einschränkungen zu informieren.</p>
    <p>Bei WhatsApp/META schuldet Partsunion die fehlerfreie Übergabe an die technische Schnittstelle, nicht die erfolgreiche Zustellung auf dem Endgerät. Der Kunde hält die geltenden Nutzungs- und Messaging-Richtlinien ein, beschafft erforderliche Einwilligungen und unterlässt insbesondere Spam, unerlaubte Werbung, Phishing und rechtswidrige Nachrichten.</p>

    <h3>9. Verfügbarkeit, Wartung und Support</h3>
    <p>Für entgeltliche Dienste gilt nach dem AIaaS-Rahmenvertrag eine Verfügbarkeit von 99 Prozent pro Kalenderjahr auf Basis einer Regelbetriebszeit von 365 Tagen, sieben Tagen pro Woche und 24 Stunden täglich, abzüglich geplanter Wartungsfenster und nicht von Partsunion zu vertretender Ausfallzeiten. Abweichende schriftlich vereinbarte Service Level gehen vor.</p>
    <p>Geplante Wartungsfenster sind auf 48 Stunden pro Kalenderjahr begrenzt und erfolgen grundsätzlich zwischen 18:00 und 6:00 Uhr (MEZ). Ist dies nicht möglich, informiert Partsunion mindestens sieben Tage im Voraus.</p>
    <p>Technischer Basissupport ist in der Lizenzgebühr enthalten und wird montags bis freitags von 8:00 bis 17:00 Uhr (MEZ) angeboten, ausgenommen bundeseinheitliche und nordrhein-westfälische Feiertage, regionale Brauchtumstage, der 24. und 31. Dezember. Störungen sind mit Beschreibung, Fehlermeldung, Systemumgebung und Zeitpunkt an <a href="mailto:support@partsunion.de">support@partsunion.de</a> zu melden. Gesetzliche Mängelrechte bleiben unberührt.</p>

    <h3>10. Preise, Abrechnung und Zahlungsverzug</h3>
    <p>Es gelten die in der Erstbestellung und im zugehörigen Preisverzeichnis vereinbarten Nettopreise in Euro zuzüglich gesetzlicher Umsatzsteuer. Wiederkehrende Lizenz- und VIN-Upgrade-Gebühren werden zum ersten Kalendertag eines Monats im Voraus abgerechnet. Ein Rumpfmonat wird tagesgenau anteilig berechnet. Einzelabfragen über das Kontingent hinaus werden nachträglich mit der folgenden Monatsabrechnung berechnet. Gesondert beauftragte Onboarding- und Zusatzleistungen werden nach Vereinbarung vergütet.</p>
    <p>Prüffähige Rechnungen sind innerhalb von sieben Werktagen nach Zugang zahlbar, sofern keine SEPA-Lastschrift vereinbart wurde. Bei SEPA-Lastschrift erfolgt die Vorabankündigung mindestens einen Werktag vor Abbuchung. Bei einem Zahlungsrückstand von mindestens zwei Monatsvergütungen darf Partsunion nach erfolgloser Mahnung, Androhung per E-Mail und Ablauf einer angemessenen Ankündigungsfrist den Zugang vorübergehend sperren oder Funktionen einschränken. Die Zahlungspflicht bleibt bestehen.</p>

    <h3>11. Laufzeit und Kündigung</h3>
    <p>Die Werkstatt-Lizenz hat eine Mindestlaufzeit von zwölf Monaten und verlängert sich um jeweils zwölf Monate, wenn sie nicht mindestens drei Monate vor Ablauf gekündigt wird. Der Beginn der Mindestlaufzeit richtet sich nach der vereinbarten Erstbestellung; bei der Erstbestellung mit Freischaltungsbeginn ist der Tag der Freischaltung maßgeblich. Der unbefristete Rahmenvertrag endet mit Beendigung der letzten Werkstatt-Lizenz.</p>
    <p>Zusatz-Nutzerlizenzen und VIN-Upgrades sind einzeln ohne zusätzliche Kündigungsfrist zum Ende des vereinbarten Monats kündbar. Der konkrete Monatsstichtag richtet sich nach der Erstbestellung und der dazu vereinbarten Lizenzmatrix. Kündigungen der Werkstatt-Lizenz bedürfen mindestens der Textform, etwa per E-Mail. Zusatzlizenzen und VIN-Upgrades können im Login-Bereich gekündigt werden; Partsunion bestätigt die Kündigung per E-Mail. Mit Ende der zugehörigen Werkstatt-Lizenz entfallen auch die zugeordneten Zusatzlizenzen, Upgrades und verbleibenden Abfragevolumen.</p>
    <p>Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt bestehen. Ein wichtiger Grund liegt insbesondere vor, wenn eine Partei eine wesentliche Vertragspflicht trotz angemessener Fristsetzung erheblich verletzt, fällige Zahlungen nachhaltig ausbleiben oder die Nutzung der Plattform gegen geltendes Recht verstößt. Eine Abmahnung oder Fristsetzung ist entbehrlich, soweit sie gesetzlich nicht erforderlich oder unzumutbar ist.</p>

    <h3>12. Mängel und Leistungsstörungen</h3>
    <p>Der Kunde meldet reproduzierbare Mängel unverzüglich und beschreibt die Umstände ihres Auftretens. Partsunion erhält zunächst Gelegenheit zur Nacherfüllung, insbesondere durch Fehlerbeseitigung, Update oder zumutbare Umgehungslösung. Ansprüche bestehen nicht bei unerheblichen Abweichungen, ungeeigneter Systemumgebung, nicht freigegebenen Änderungen durch den Kunden oder einer vertragswidrigen Nutzung.</p>
    <p>Die verschuldensunabhängige Haftung nach § 536a Abs. 1 Alt. 1 BGB für bei Vertragsschluss vorhandene Mängel wird ausgeschlossen. Im Übrigen gelten die gesetzlichen Vorschriften, soweit diese AGB nichts Abweichendes bestimmen.</p>

    <h3>13. Haftung</h3>
    <p>Partsunion haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei schuldhafter Verletzung von Leben, Körper oder Gesundheit, nach dem Produkthaftungsgesetz, bei Arglist sowie im Umfang einer ausdrücklich übernommenen Garantie. Die gesetzliche Haftung für Verzugszinsen, die Verzugspauschale und erforderliche Rechtsverfolgungskosten bei Schuldnerverzug bleibt unberührt.</p>
    <p>Bei leicht fahrlässiger Verletzung einer wesentlichen Vertragspflicht ist die Haftung auf den vertragstypischen, bei Vertragsschluss vorhersehbaren Schaden begrenzt. Wesentliche Vertragspflichten sind Pflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf. Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen. Die vorstehenden Begrenzungen gelten auch zugunsten der Organe, Beschäftigten und Erfüllungsgehilfen von Partsunion.</p>
    <p>Bei einem vom Kunden zu vertretenden Verstoß gegen vereinbarte Datensicherungs- oder Exportpflichten ist die Haftung für Datenverlust auf den Aufwand beschränkt, der bei ordnungsgemäßer Sicherung für die Wiederherstellung angefallen wäre. Zwingende gesetzliche Haftung bleibt unberührt.</p>

    <h3>14. Vertraulichkeit und Datenschutz</h3>
    <p>Beide Parteien behandeln nicht öffentlich bekannte kaufmännische, technische und betriebliche Informationen der jeweils anderen Partei vertraulich und verwenden sie nur zur Vertragsdurchführung. Gesetzliche Offenlegungspflichten bleiben unberührt. Die Vertraulichkeitsbindung besteht nach Vertragsende drei Jahre fort; für personenbezogene Daten besteht sie zeitlich unbegrenzt.</p>
    <p>Jede Partei erfüllt die für sie geltenden Datenschutzpflichten. Soweit Partsunion personenbezogene Daten im Auftrag des Kunden verarbeitet, schließen die Parteien vor Beginn der Verarbeitung eine Vereinbarung zur Auftragsverarbeitung nach Art. 28 DSGVO. Der Kunde bleibt für die Rechtmäßigkeit seiner Verarbeitung und Weisungen verantwortlich.</p>

    <h3>15. Vertragsende und Kundendaten</h3>
    <p>Der Kunde sichert beziehungsweise exportiert benötigte Daten rechtzeitig vor Vertragsende. Mit Beendigung der Geschäftsbeziehung wird das Kundenkonto gelöscht. Daten in Backups verbleiben bis zum Ablauf der regulären Backup-Zyklen, werden gegen unbefugten Zugriff geschützt und nicht weiterverarbeitet. Gesetzlich aufzubewahrende Vertrags-, Steuer- und Verarbeitungsnachweise werden entsprechend den maßgeblichen Fristen gespeichert.</p>

    <h3>16. Änderungen dieser AGB und der Vergütung</h3>
    <p>Änderungen dieser AGB für laufende Verträge bedürfen grundsätzlich der Vereinbarung beider Parteien. Partsunion darf rein redaktionelle Anpassungen und Änderungen vornehmen, die aufgrund zwingender gesetzlicher Vorgaben erforderlich sind und das vertragliche Verhältnis von Leistung und Gegenleistung nicht zum Nachteil des Kunden verändern. Darüber hinausgehende Änderungen bietet Partsunion dem Kunden mindestens sechs Wochen vor dem vorgesehenen Wirksamwerden in Textform an. Schweigen gilt nicht als Zustimmung.</p>
    <p>Soweit der AIaaS-Rahmenvertrag dies vorsieht, kann Partsunion Vergütungen nach billigem Ermessen gemäß § 315 BGB anpassen. Eine Erhöhung wird mindestens sechs Wochen vorher schriftlich angekündigt und erfolgt frühestens zwölf Monate nach Vertragsunterzeichnung sowie frühestens sechs Monate nach der letzten Erhöhung. Bei einer Erhöhung um mehr als zehn Prozent besteht das im Rahmenvertrag vorgesehene außerordentliche Kündigungsrecht zum Änderungszeitpunkt; die Kündigung muss spätestens einen Monat zuvor zugehen. Partsunion weist in der Ankündigung auf Recht und Frist hin.</p>

    <h3>17. Aufrechnung, Zurückbehaltung und Abtretung</h3>
    <p>Der Kunde kann nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen aufrechnen. Ein Zurückbehaltungsrecht darf er nur wegen Ansprüchen aus demselben Vertragsverhältnis ausüben. Die Abtretung von Ansprüchen aus dem Vertrag bedarf der Zustimmung der anderen Partei; § 354a HGB bleibt unberührt.</p>

    <h3>18. Recht und Gerichtsstand</h3>
    <p>Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist Köln ausschließlicher Gerichtsstand. Partsunion bleibt berechtigt, am allgemeinen Gerichtsstand des Kunden zu klagen.</p>
    <p>Sollte eine Bestimmung ganz oder teilweise unwirksam sein, bleiben die übrigen Bestimmungen wirksam. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.</p>

    <p className="legal-note">Stand: Oktober 2026</p>
  </>;
}

function Datenschutz() {
  return <>
    <h2>Datenschutzerklärung</h2>
    <p className="legal-lead">Diese Erklärung gilt für partsunion.de einschließlich Kontaktformular, Online-Terminbuchung, Website-Analyse und bereitgestellter Downloads. Für die Nutzung der Partsunion Software durch Kunden gelten ergänzende Datenschutzinformationen und, soweit erforderlich, eine Vereinbarung zur Auftragsverarbeitung.</p>

    <h3>1. Verantwortlicher</h3>
    <address>
      <strong>{company.name}</strong><br />
      {company.street}<br />
      {company.city}<br />
      Deutschland<br />
      E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
    </address>
    <p>Datenschutzanfragen können an die vorstehende E-Mail-Adresse gerichtet werden.</p>

    <h3>2. Hosting, Auslieferung und Server-Protokolle</h3>
    <p>Die Website und die für Formulare sowie Website-Statistik genutzte API werden auf Cloud-Infrastruktur von UpCloud Oy, Aleksanterinkatu 15 B, 7. Etage, 00100 Helsinki, Finnland, in einem Rechenzentrum in Frankfurt am Main betrieben. UpCloud verarbeitet Daten als unser Auftragsverarbeiter.</p>
    <p>Bei jedem Aufruf werden technisch erforderliche Verbindungs- und Protokolldaten verarbeitet. Dazu gehören insbesondere IP-Adresse, Datum und Uhrzeit, angeforderte Adresse, Referrer, HTTP-Status, übertragene Datenmenge sowie Angaben zu Browser und Betriebssystem. Dies dient der sicheren Auslieferung, Fehleranalyse und Abwehr von Missbrauch. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse ist der sichere und störungsfreie Betrieb. Sicherheits- und Zugriffsprotokolle werden grundsätzlich spätestens nach 180 Tagen gelöscht, sofern ein konkreter Sicherheitsvorfall oder eine gesetzliche Pflicht keine längere Speicherung erfordert.</p>

    <h3>3. Transportverschlüsselung und technisch erforderliche Speicherung</h3>
    <p>Die Übertragung erfolgt verschlüsselt über HTTPS/TLS. Auf der öffentlich zugänglichen Website setzen wir keine Werbe- oder Profiling-Cookies ein. Falls ein geschützter Wartungszugang aktiviert ist, kann ein technisch notwendiges, sicheres Zugriffscookie gespeichert werden. Es dient ausschließlich der Freischaltung dieses Zugangs und nicht der Analyse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; der Zugriff auf das Endgerät ist nach § 25 Abs. 2 Nr. 2 TDDDG erforderlich.</p>

    <h3>4. Eigene, datensparsame Website-Statistik</h3>
    <p>Auf der Produktionswebsite messen wir Seitenaufrufe und Interaktionen. Verarbeitet werden Seitenpfad, Zeitpunkt, verweisende Domain, gegebenenfalls UTM-Kampagnenparameter, angeklicktes Element, Platzierung, Ziel und Art des Klicks, grobe Länder- und Netzangaben sowie zufällige Ereignis- und Sitzungskennungen. Die Sitzungskennung besteht nur im Arbeitsspeicher des Browsers; hierfür nutzen wir weder Cookies noch Local Storage.</p>
    <p>Aus IP-Adresse und User-Agent wird serverseitig mit einem täglich wechselnden Schlüssel ein nicht dauerhaft wiedererkennbarer Hashwert erzeugt. Vollständige IP-Adresse und vollständiger User-Agent werden nicht in der Statistikdatenbank gespeichert; bei IP-Adressen bleibt nur ein gekürzter Netzwerkbereich. Die Ereignisdaten werden nach spätestens 400 Tagen gelöscht. Bei aktiviertem Browser-Signal „Do Not Track“ findet diese Messung nicht statt.</p>
    <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unsere berechtigten Interessen sind die Messung von Reichweite und Kampagnenerfolg sowie die Verbesserung von Auffindbarkeit und Bedienbarkeit unseres B2B-Angebots. Du kannst der Verarbeitung aus Gründen deiner besonderen Situation jederzeit widersprechen.</p>

    <h3>5. Plausible Analytics</h3>
    <p>Zusätzlich verwenden wir Plausible Analytics der Plausible Insights OÜ, Västriku tn 2, 50403 Tartu, Estland. Plausible misst aggregierte Angaben zu aufgerufenen Seiten, Herkunft, Endgerät, Browser, Betriebssystem und Land sowie von uns definierte Ereignisse. Nach Angaben des Anbieters werden keine Cookies, vollständigen IP-Adressen oder dauerhaften Nutzerkennungen gespeichert; die Messdaten werden in der Europäischen Union verarbeitet.</p>
    <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse ist eine datensparsame Reichweiten- und Nutzungsanalyse. Weitere Einzelheiten enthält die <a href="https://plausible.io/data-policy" rel="noreferrer" target="_blank">Datenrichtlinie von Plausible</a>.</p>

    <h3>6. Kontaktformular und E-Mail-Anfragen</h3>
    <p>Bei einer Anfrage verarbeiten wir die eingegebenen oder mitgeteilten Angaben. Dazu können Unternehmen, Ansprechpartner, geschäftliche E-Mail-Adresse, Telefonnummer, Unternehmensschwerpunkt, Nachricht und technische Übermittlungsdaten gehören. Verweisende Domain, Einstiegsseite und begrenzte Kampagnenparameter können der Anfrage zugeordnet werden. Die Daten werden in unserem eigenen CRM gespeichert, um die Anfrage zu bearbeiten, Rückfragen zu stellen und eine mögliche Geschäftsbeziehung anzubahnen.</p>
    <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO für vorvertragliche Maßnahmen und Art. 6 Abs. 1 lit. f DSGVO für sonstige geschäftliche Kommunikation. Unser berechtigtes Interesse ist die nachvollziehbare Bearbeitung von B2B-Anfragen. Pflichtangaben sind für die Bearbeitung erforderlich; ohne sie können wir die Anfrage nicht absenden oder sinnvoll beantworten.</p>

    <h3>7. Online-Terminbuchung, Microsoft 365 und Teams</h3>
    <p>Für die Terminbuchung verarbeiten wir den gewählten Zeitpunkt, Unternehmen, Namen, E-Mail-Adresse, optionale Telefonnummer, optionale Gesprächsnotizen und Zuordnungsdaten zur Anfrage. Wir speichern diese Daten in unserem CRM und erstellen den Termin einschließlich Online-Besprechung in Microsoft 365/Outlook und Microsoft Teams. Dienstleister ist Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irland.</p>
    <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Die Pflichtangaben werden für die Terminvereinbarung benötigt. Microsoft verarbeitet Daten nach den für die Online-Dienste geltenden Datenschutzbedingungen als Auftragsverarbeiter. Weitere Informationen enthält die <a href="https://privacy.microsoft.com/de-de/privacystatement" rel="noreferrer" target="_blank">Datenschutzerklärung von Microsoft</a>.</p>

    <h3>8. Transaktions-E-Mails über Resend</h3>
    <p>Terminbestätigungen und damit verbundene Nachrichten können über Resend, Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA, versendet werden. Dabei werden insbesondere Empfängeradresse, Name, Betreff, Nachrichteninhalt und technische Versandinformationen verarbeitet. Resend verarbeitet diese Daten in unserem Auftrag.</p>
    <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die E-Mail der Terminvereinbarung oder Vertragsanbahnung dient, andernfalls Art. 6 Abs. 1 lit. f DSGVO. Für Übermittlungen in die USA stützt Resend sich nach eigener Angabe auf seine Zertifizierung nach dem EU-US Data Privacy Framework und ergänzend auf EU-Standardvertragsklauseln. Weitere Informationen: <a href="https://resend.com/legal/dpa" rel="noreferrer" target="_blank">Resend Data Processing Addendum</a>.</p>

    <h3>9. Downloads und externe Links</h3>
    <p>Desktop-Downloads werden über GitHub bereitgestellt. Erst wenn du einen entsprechenden Download-Link anklickst, wird eine Verbindung zu GitHub hergestellt und GitHub erhält technisch bedingt insbesondere deine IP-Adresse, Zeitpunkt und angeforderte Datei. Anbieter für Nutzer im Europäischen Wirtschaftsraum ist GitHub B.V., Prins Bernhardplein 200, 1097 JB Amsterdam, Niederlande; verbundene Unternehmen können Daten in den USA verarbeiten. Es gelten die <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" rel="noreferrer" target="_blank">Datenschutzhinweise von GitHub</a>.</p>
    <p>Dasselbe Grundprinzip gilt für sonstige externe Links: Vor dem Anklicken werden an den verlinkten Anbieter grundsätzlich keine Daten allein durch den Link übertragen. Für die anschließende Verarbeitung ist der jeweilige Anbieter verantwortlich.</p>

    <h3>10. Empfänger und Drittlandübermittlungen</h3>
    <p>Innerhalb von Partsunion erhalten nur Personen Zugriff, die Daten für Websitebetrieb, Vertrieb, Terminplanung, Einführung oder Support benötigen. Externe Empfänger sind insbesondere die in dieser Erklärung genannten Hosting-, Analyse-, Kalender-, Besprechungs- und E-Mail-Dienstleister. Daneben übermitteln wir Daten nur, wenn dies für die Bearbeitung einer Anfrage oder Vertragserfüllung erforderlich, gesetzlich vorgeschrieben oder von einer wirksamen Einwilligung gedeckt ist. Ein Verkauf personenbezogener Daten findet nicht statt.</p>
    <p>Soweit ein Anbieter Daten außerhalb des Europäischen Wirtschaftsraums verarbeitet, erfolgt die Übermittlung nur unter den Voraussetzungen der Art. 44 ff. DSGVO, etwa aufgrund eines Angemessenheitsbeschlusses einschließlich einer gültigen EU-US-Data-Privacy-Framework-Zertifizierung oder auf Basis der EU-Standardvertragsklauseln und erforderlicher zusätzlicher Schutzmaßnahmen.</p>

    <h3>11. Speicherdauer</h3>
    <ul>
      <li><strong>Server- und Sicherheitsprotokolle:</strong> grundsätzlich höchstens 180 Tage, sofern kein Sicherheitsfall eine längere Aufbewahrung erfordert.</li>
      <li><strong>Eigene Website-Statistik:</strong> höchstens 400 Tage.</li>
      <li><strong>Kontakt- und Termindaten:</strong> bis die Anfrage abschließend bearbeitet ist und keine weitere Geschäftsbeziehung zu erwarten ist; bei Vertragsabschluss für die Dauer der Geschäftsbeziehung.</li>
      <li><strong>Handels- und steuerrechtliche Unterlagen:</strong> für die jeweils geltende gesetzliche Aufbewahrungsfrist.</li>
      <li><strong>Daten zur Anspruchsdurchsetzung:</strong> bis zum Ablauf der einschlägigen Verjährungsfristen, soweit dies erforderlich ist.</li>
    </ul>
    <p>Anschließend löschen oder anonymisieren wir die Daten beziehungsweise schränken die Verarbeitung ein, wenn gesetzliche Aufbewahrungspflichten entgegenstehen.</p>

    <h3>12. Rechtsgrundlagen im Überblick</h3>
    <p>Wir verarbeiten personenbezogene Daten auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO zur Vertragsanbahnung und Vertragserfüllung, Art. 6 Abs. 1 lit. c DSGVO zur Erfüllung rechtlicher Pflichten und Art. 6 Abs. 1 lit. f DSGVO zur Wahrung der in den jeweiligen Abschnitten beschriebenen berechtigten Interessen. Soweit wir ausnahmsweise eine Einwilligung einholen, ist Art. 6 Abs. 1 lit. a DSGVO die Rechtsgrundlage; die Einwilligung kann jederzeit für die Zukunft widerrufen werden.</p>

    <h3>13. Deine Rechte</h3>
    <p>Unter den gesetzlichen Voraussetzungen hast du das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Eine erteilte Einwilligung kannst du nach Art. 7 Abs. 3 DSGVO jederzeit mit Wirkung für die Zukunft widerrufen.</p>
    <div className="legal-callout"><strong>Widerspruchsrecht</strong><p>Beruht eine Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO, kannst du aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit widersprechen. Gegen Direktwerbung kannst du jederzeit ohne besondere Begründung widersprechen.</p></div>
    <p>Zur Ausübung deiner Rechte genügt eine E-Mail an <a href={`mailto:${company.email}`}>{company.email}</a>. Außerdem kannst du dich bei einer Datenschutzaufsichtsbehörde beschweren. Für uns ist insbesondere die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf, zuständig: <a href="https://www.ldi.nrw.de" rel="noreferrer" target="_blank">www.ldi.nrw.de</a>.</p>

    <h3>14. Keine automatisierte Einzelfallentscheidung</h3>
    <p>Bei Websitebesuch, Kontaktanfrage und Terminbuchung findet keine ausschließlich automatisierte Entscheidung einschließlich Profiling statt, die dir gegenüber rechtliche Wirkung entfaltet oder dich ähnlich erheblich beeinträchtigt.</p>

    <h3>15. Aktualisierung dieser Erklärung</h3>
    <p>Wir passen diese Datenschutzerklärung an, wenn sich Datenverarbeitungen, eingesetzte Dienstleister oder rechtliche Anforderungen ändern. Es gilt die auf dieser Website veröffentlichte Fassung.</p>
    <p className="legal-note">Stand: Oktober 2026</p>
  </>;
}

function Widerruf() {
  return <>
    <h2>Widerruf und Stornierung</h2>
    <p className="legal-lead">Partsunion ist eine B2B-Plattform. Verträge über unsere Software und zugehörige Leistungen schließen wir ausschließlich mit Unternehmern im Sinne des § 14 BGB.</p>

    <h3>1. Kein gesetzliches Verbraucher-Widerrufsrecht</h3>
    <p>Das gesetzliche Widerrufsrecht für Fernabsatz- und außerhalb von Geschäftsräumen geschlossene Verträge steht Verbrauchern zu. Wer einen Vertrag für sein Unternehmen oder im Rahmen einer gewerblichen beziehungsweise selbstständigen beruflichen Tätigkeit abschließt, handelt als Unternehmer. Für die mit Partsunion geschlossenen B2B-Verträge besteht daher kein gesetzliches Widerrufsrecht.</p>

    <h3>2. Kontaktanfragen und Beratungstermine</h3>
    <p>Eine Kontaktanfrage oder die Buchung eines unverbindlichen Beratungsgesprächs über diese Website schließt noch keinen kostenpflichtigen Softwarevertrag. Ein Beratungstermin kann vor seinem Beginn kostenfrei abgesagt oder verschoben werden. Hierfür genügt eine Nachricht an <a href={`mailto:${company.email}`}>{company.email}</a>.</p>

    <h3>3. Vertragliche Test-, Kündigungs- und Rücktrittsrechte</h3>
    <p>Ausdrücklich im individuellen Angebot oder Vertrag vereinbarte Testphasen, Kündigungs-, Rücktritts- oder Erstattungsrechte bleiben unberührt. Im Übrigen gelten für Beendigung und Kündigung die <Link href="/legal/agb">B2B-AGB</Link> und die jeweilige Individualvereinbarung.</p>

    <h3>4. Ausnahme bei einem Verbrauchervertrag</h3>
    <p>Sollte Partsunion im Einzelfall ausdrücklich einen Vertrag mit einer Person schließen, die dabei als Verbraucher im Sinne des § 13 BGB handelt, erhält diese Person vor Abgabe ihrer Vertragserklärung eine gesonderte, auf den konkreten Vertrag und den Leistungsbeginn abgestimmte Widerrufsbelehrung sowie, soweit gesetzlich erforderlich, ein Muster-Widerrufsformular. Diese Seite ersetzt eine solche individuelle Verbraucherbelehrung nicht.</p>

    <p className="legal-note">Stand: Oktober 2026</p>
  </>;
}

export function LegalPage({ path }: { path: string }) {
  const route = routeByPath(path)!;
  const pages: Record<string, React.ReactNode> = {
    "/legal/impressum": <Impressum />,
    "/legal/agb": <Agb />,
    "/legal/datenschutz": <Datenschutz />,
    "/legal/widerruf": <Widerruf />,
  };
  return <>
    <section className="special-heading legal-heading">
      <Breadcrumbs title={route.label} />
      <div className="container special-heading-copy"><p className="eyebrow">RECHTLICHES</p><h1>{route.label}</h1><p>{route.description}</p></div>
    </section>
    <section className="section container legal-copy"><CompanyCard /><article>{pages[path]}</article></section>
  </>;
}
