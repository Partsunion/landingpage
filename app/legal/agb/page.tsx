import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Allgemeine Geschäftsbedingungen',
    description: 'Allgemeine Geschäftsbedingungen für die Nutzung der Partsunion Software und die vertraglichen Leistungen der PartsUnion UG (haftungsbeschränkt).',
    alternates: { canonical: 'https://partsunion.de/legal/agb' },
};

export default function AGBPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl">
            <div className="blog-content max-w-none">
                <h1
                    className="text-3xl md:text-4xl font-semibold text-foreground mb-3"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                >
                    Allgemeine Geschäftsbedingungen
                </h1>
                <p className="text-sm text-muted-foreground">Stand: Juli 2026</p>

                <h2>§ 1 Geltungsbereich</h2>
                <p>
                    (1) Die nachfolgenden Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen dem
                    in unserem <Link href="/legal/impressum">Impressum</Link> genannten Anbieter (nachfolgend
                    „Anbieter“) und dem Kunden (nachfolgend „Kunde“) über die Nutzung der
                    Software-as-a-Service-Lösung „Partsunion“ (nachfolgend „Software“ oder „Dienst“) in der zum
                    Zeitpunkt des Vertragsschlusses gültigen Fassung.
                </p>
                <p>
                    (2) Abweichende Bedingungen des Kunden werden nicht Vertragsbestandteil, es sei denn, der Anbieter
                    stimmt ihrer Geltung ausdrücklich und schriftlich zu.
                </p>
                <p>
                    (3) Diese AGB gelten sowohl gegenüber Verbrauchern als auch gegenüber Unternehmern, es sei denn, in
                    der jeweiligen Klausel wird eine Differenzierung vorgenommen. Verbraucher im Sinne dieser AGB ist
                    jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer
                    gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können (§ 13 BGB).
                    Unternehmer im Sinne dieser AGB ist jede natürliche oder juristische Person oder eine
                    rechtsfähige Personengesellschaft, die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer
                    gewerblichen oder selbständigen beruflichen Tätigkeit handelt (§ 14 BGB).
                </p>

                <h2>§ 2 Vertragsgegenstand</h2>
                <p>
                    (1) Der Anbieter stellt dem Kunden die Softwarelösung „Partsunion“ als cloudbasierte
                    Software-as-a-Service (SaaS) zur Verfügung. Die Software umfasst insbesondere:
                </p>
                <ul>
                    <li>KI-gestützte Fahrzeugschein-Erkennung (OCR)</li>
                    <li>Automatische OEM-Nummern-Ermittlung</li>
                    <li>Automatisierte Angebotserstellung</li>
                    <li>WhatsApp-Bot-Integration für Kundenanfragen</li>
                    <li>Warenwirtschaftssystem (WAWI) mit Bestandssynchronisation</li>
                    <li>Automatische Rechnungserstellung</li>
                </ul>
                <p>
                    (2) Der genaue Leistungsumfang richtet sich nach dem individuell vereinbarten Leistungspaket
                    und der jeweiligen Leistungsbeschreibung.
                </p>
                <p>
                    (3) Der Anbieter ist berechtigt, die Software weiterzuentwickeln und zu verbessern. Wesentliche
                    Einschränkungen des Funktionsumfangs werden dem Kunden mit einer Frist von 4 Wochen im Voraus
                    angekündigt.
                </p>

                <h2>§ 3 Vertragsschluss</h2>
                <p>
                    (1) Die Darstellung der Leistungen auf der Website des Anbieters stellt kein rechtlich
                    bindendes Angebot dar, sondern eine unverbindliche Aufforderung an den Kunden, Leistungen
                    zu bestellen.
                </p>
                <p>
                    (2) Der Vertrag kommt zustande durch:
                </p>
                <ul>
                    <li>Schriftliche Auftragsbestätigung des Anbieters, oder</li>
                    <li>Bereitstellung des Zugangs zur Software (Freischaltung), oder</li>
                    <li>Beidseitige Unterzeichnung eines individuellen Vertrags</li>
                </ul>
                <p>
                    (3) Die Vertragssprache ist Deutsch.
                </p>

                <h2>§ 4 Leistungen und Verfügbarkeit</h2>
                <p>
                    (1) Verfügbarkeit, Messmethode, Wartungsfenster und etwaige Service-Gutschriften ergeben
                    sich aus der individuell vereinbarten Leistungsbeschreibung. Soweit dort kein SLA
                    vereinbart ist, wird keine bestimmte prozentuale Verfügbarkeit zugesichert. Geplante
                    Wartungsarbeiten werden nach Möglichkeit mindestens 48 Stunden im Voraus angekündigt.
                </p>
                <p>
                    (2) Der Anbieter erbringt Support per E-Mail während der Geschäftszeiten
                    (Montag bis Freitag, 9:00 – 18:00 Uhr, ausgenommen gesetzliche Feiertage in Nordrhein-Westfalen).
                </p>
                <p>
                    (3) Der Anbieter ist berechtigt, die technische Infrastruktur der Software zu ändern,
                    soweit dies dem Kunden zumutbar ist und die vertraglich geschuldete Leistung nicht
                    wesentlich beeinträchtigt wird.
                </p>

                <h2>§ 5 Pflichten des Kunden</h2>
                <p>
                    (1) Der Kunde ist verpflichtet, seine Zugangsdaten vertraulich zu behandeln und vor dem
                    Zugriff Dritter zu schützen. Bei Verdacht auf missbräuchliche Nutzung ist der Anbieter
                    unverzüglich zu informieren.
                </p>
                <p>
                    (2) Der Kunde stellt sicher, dass die von ihm eingegebenen Daten korrekt und vollständig
                    sind. Der Anbieter haftet nicht für fehlerhafte Ergebnisse, die auf unvollständige oder
                    falsche Eingabedaten zurückzuführen sind.
                </p>
                <p>
                    (3) Der Kunde darf die Software nur für den vertraglich vereinbarten Zweck nutzen. Eine
                    Unterlizenzierung, Weiterveräußerung oder Weitergabe an Dritte ist ohne ausdrückliche
                    schriftliche Zustimmung des Anbieters nicht gestattet.
                </p>

                <h2>§ 6 Preise und Zahlungsbedingungen</h2>
                <p>
                    (1) Die Preise richten sich nach dem individuell vereinbarten Leistungspaket. Alle Preise
                    verstehen sich in Euro und zuzüglich der gesetzlichen Umsatzsteuer.
                </p>
                <p>
                    (2) Die Abrechnung erfolgt monatlich oder jährlich im Voraus, je nach gewähltem
                    Abrechnungszeitraum. Die Zahlung ist innerhalb von 14 Tagen nach Rechnungsstellung
                    fällig.
                </p>
                <p>
                    (3) Bei Zahlungsverzug ist der Anbieter berechtigt, den Zugang zur Software nach
                    Mahnung und Setzung einer angemessenen Nachfrist vorübergehend zu sperren. Die
                    Pflicht zur Zahlung der vereinbarten Vergütung bleibt hiervon unberührt.
                </p>
                <p>
                    (4) Der Anbieter ist berechtigt, die Preise mit einer Ankündigungsfrist von 4 Wochen
                    zum Ende eines Abrechnungszeitraums zu ändern. Im Falle einer Preiserhöhung steht
                    dem Kunden ein Sonderkündigungsrecht zu.
                </p>

                <h2>§ 7 Laufzeit und Kündigung</h2>
                <p>
                    (1) Sofern nicht anders vereinbart, beträgt die Mindestvertragslaufzeit 12 Monate.
                    Der Vertrag verlängert sich automatisch um jeweils den gleichen Zeitraum, wenn er
                    nicht mit einer Frist von 3 Monaten zum Ende der jeweiligen Laufzeit gekündigt wird.
                </p>
                <p>
                    (2) Bei monatlich kündbaren Verträgen beträgt die Kündigungsfrist 1 Monat zum
                    Monatsende.
                </p>
                <p>
                    (3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
                    Ein wichtiger Grund für den Anbieter liegt insbesondere vor, wenn der Kunde trotz
                    Mahnung mit der Zahlung von mindestens zwei Monatsbeträgen in Verzug ist.
                </p>
                <p>
                    (4) Die Kündigung bedarf der Textform (E-Mail ausreichend).
                </p>
                <p>
                    (5) Nach Beendigung des Vertrages stellt der Anbieter dem Kunden seine Daten für einen
                    Zeitraum von 30 Tagen zum Export zur Verfügung. Nach Ablauf dieser Frist werden die
                    Daten unwiderruflich gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten
                    entgegenstehen.
                </p>

                <h2>§ 8 Datenschutz und Datensicherheit</h2>
                <p>
                    (1) Der Anbieter verarbeitet personenbezogene Daten des Kunden gemäß der geltenden
                    Datenschutzgesetze, insbesondere der DSGVO und des BDSG. Näheres regelt die
                    Datenschutzerklärung des Anbieters.
                </p>
                <p>
                    (2) Soweit der Anbieter im Rahmen der Vertragserfüllung personenbezogene Daten im
                    Auftrag des Kunden verarbeitet, schließen die Parteien einen
                    Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.
                </p>
                <p>
                    (3) Der Anbieter trifft angemessene technische und organisatorische Maßnahmen zum
                    Schutz der Daten des Kunden.
                </p>

                <h2>§ 9 Haftung</h2>
                <p>
                    (1) Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie bei
                    Verletzung von Leben, Körper oder Gesundheit.
                </p>
                <p>
                    (2) Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher
                    Vertragspflichten (Kardinalpflichten). In diesem Fall ist die Haftung auf den
                    vertragstypischen, vorhersehbaren Schaden begrenzt.
                </p>
                <p>
                    (3) Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.
                </p>
                <p>
                    (4) Der Anbieter haftet nicht für die Richtigkeit der durch die KI generierten
                    Ergebnisse. Die KI-gestützte Teileidentifikation, OEM-Zuordnung und
                    Angebotserstellung erfolgen nach bestem technischen Stand, können jedoch keine
                    100%ige Korrektheit garantieren. Der Kunde ist verpflichtet, geschäftskritische
                    Ergebnisse eigenverantwortlich zu überprüfen.
                </p>

                <h2>§ 10 Geistiges Eigentum</h2>
                <p>
                    (1) Alle Rechte an der Software, einschließlich der zugrunde liegenden Algorithmen,
                    KI-Modelle, des Quellcodes, der Dokumentation und aller Weiterentwicklungen,
                    verbleiben beim Anbieter.
                </p>
                <p>
                    (2) Der Kunde erhält ein einfaches, nicht übertragbares, auf die Vertragslaufzeit
                    beschränktes Nutzungsrecht an der Software.
                </p>
                <p>
                    (3) Die vom Kunden eingegebenen Daten verbleiben im Eigentum des Kunden. Der Anbieter
                    ist berechtigt, anonymisierte und aggregierte Daten zur Verbesserung der Software zu
                    verwenden.
                </p>

                <h2>§ 11 Vertraulichkeit</h2>
                <p>
                    Beide Parteien verpflichten sich, alle im Rahmen der Vertragserfüllung erlangten
                    vertraulichen Informationen der jeweils anderen Partei vertraulich zu behandeln und
                    nicht an Dritte weiterzugeben, es sei denn, dies ist zur Vertragserfüllung erforderlich
                    oder gesetzlich vorgeschrieben.
                </p>

                <h2>§ 12 Änderungen der AGB</h2>
                <p>
                    (1) Der Anbieter ist berechtigt, diese AGB mit einer Ankündigungsfrist von 6 Wochen zu
                    ändern. Die Änderungen werden dem Kunden in Textform mitgeteilt.
                </p>
                <p>
                    (2) Widerspricht der Kunde den Änderungen nicht innerhalb von 4 Wochen nach Zugang der
                    Mitteilung, gelten die geänderten AGB als angenommen. Der Anbieter weist den Kunden in
                    der Änderungsmitteilung auf diese Rechtsfolge hin.
                </p>

                <h2>§ 13 Schlussbestimmungen</h2>
                <p>
                    (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
                    UN-Kaufrechts.
                </p>
                <p>
                    (2) Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder
                    öffentlich-rechtliches Sondervermögen, ist Gerichtsstand für alle Streitigkeiten
                    aus diesem Vertrag Köln.
                </p>
                <p>
                    (3) Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder
                    werden, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. An die Stelle
                    der unwirksamen Bestimmung tritt eine wirksame Bestimmung, die dem wirtschaftlichen
                    Zweck der unwirksamen Bestimmung am nächsten kommt.
                </p>
            </div>
        </div>
    );
}
