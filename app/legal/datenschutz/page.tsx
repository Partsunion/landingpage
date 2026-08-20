import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Datenschutzerklärung - Partsunion',
    description: 'Datenschutzerklärung für die Partsunion-Website',
};

export default function DatenschutzPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl">
            <div className="blog-content max-w-none">
                <h1
                    className="text-3xl md:text-4xl font-semibold text-foreground mb-3"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                >
                    Datenschutzerklärung
                </h1>
                <p className="text-sm text-muted-foreground">Stand: Juli 2026</p>

                <h2>1. Datenschutz auf einen Blick</h2>

                <h3>Allgemeine Hinweise</h3>
                <p>
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
                    Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen
                    Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz
                    entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                </p>

                <h3>Datenerfassung auf dieser Website</h3>
                <p>
                    <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                    können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle“ in dieser Datenschutzerklärung
                    entnehmen.
                </p>
                <p>
                    <strong>Wie erfassen wir Ihre Daten?</strong><br />
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich
                    z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch
                    oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind
                    vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                    Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                </p>
                <p>
                    <strong>Wofür nutzen wir Ihre Daten?</strong><br />
                    Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                    Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>
                <p>
                    <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
                    Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                    gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
                    oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt
                    haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das
                    Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
                    zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>

                <h2>2. Hosting</h2>
                <p>
                    Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                </p>
                <h3>Externes Hosting</h3>
                <p>
                    Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst
                    werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen,
                    Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen,
                    Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
                </p>
                <p>
                    Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und
                    bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und
                    effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter
                    (Art. 6 Abs. 1 lit. f DSGVO).
                </p>

                <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>

                <h3>Datenschutz</h3>
                <p>
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
                    Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften
                    sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene
                    personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich
                    identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir
                    erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
                </p>
                <p>
                    Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per
                    E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch
                    Dritte ist nicht möglich.
                </p>

                <h3>Hinweis zur verantwortlichen Stelle</h3>
                <p>
                    Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist der in unserem{' '}
                    <Link href="/legal/impressum">Impressum</Link> genannte Anbieter. Die ladungsfähige Anschrift und
                    die vertretungsberechtigten Personen sind dort aktuell aufgeführt.
                </p>
                <p>
                    E-Mail: datenschutz@partsunion.de
                </p>
                <p>
                    Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit
                    anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen,
                    E-Mail-Adressen o. Ä.) entscheidet.
                </p>

                <h3>Speicherdauer</h3>
                <p>
                    Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
                    verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
                    Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur
                    Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich
                    zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder
                    handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall
                    dieser Gründe.
                </p>

                <h3>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung</h3>
                <p>
                    Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen
                    Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern
                    besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer
                    ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt
                    die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die
                    Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-
                    Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von
                    § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.
                </p>

                <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                <p>
                    Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können
                    eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
                    erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>

                <h3>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen (Art. 21 DSGVO)</h3>
                <p>
                    <strong>
                        Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt,
                        haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
                        gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen. Die jeweilige
                        Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser
                        Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen
                        personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende
                        schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und
                        Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung oder
                        Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).
                    </strong>
                </p>

                <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
                <p>
                    Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
                    Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres
                    Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht
                    unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
                </p>

                <h3>Recht auf Datenübertragbarkeit</h3>
                <p>
                    Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
                    Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen,
                    maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an
                    einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
                </p>

                <h3>Auskunft, Berichtigung und Löschung</h3>
                <p>
                    Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
                    unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
                    Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung
                    dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich
                    jederzeit an uns wenden.
                </p>

                <h3>Recht auf Einschränkung der Verarbeitung</h3>
                <p>
                    Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
                    verlangen. Hierzu können Sie sich jederzeit an uns wenden.
                </p>

                <h2>4. Datenerfassung auf dieser Website</h2>

                <h3>Cookies</h3>
                <p>
                    Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Datenpakete und richten
                    auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung
                    (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
                    Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben
                    auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung
                    durch Ihren Webbrowser erfolgt.
                </p>
                <p>
                    Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen
                    (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter
                    Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung
                    von Zahlungsdienstleistungen).
                </p>
                <p>
                    Technisch notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert.
                    Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von technisch notwendigen
                    Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine
                    Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien
                    abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung
                    (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar.
                </p>

                <h3>Kontaktformular</h3>
                <p>
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                    Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                    Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>
                <p>
                    Technisch werden die im Formular eingegebenen Daten (Firma, Ansprechpartner, Telefon,
                    E-Mail-Adresse sowie Ihre Nachricht) beim Absenden direkt aus Ihrem Browser an unsere
                    Programmierschnittstelle unter <em>api.partsunion.de</em> übermittelt und dort in unserem
                    eigenen Kundenverwaltungs-/CRM-System gespeichert. Dieses System wird von uns selbst auf
                    Servern innerhalb der Europäischen Union betrieben; eine Weitergabe an Dritte zu
                    Werbezwecken findet nicht statt. Die Daten dienen ausschließlich der Bearbeitung Ihrer
                    Anfrage sowie der anschließenden Beratung und Vertragsanbahnung. Über das genannte CRM-System
                    hinaus geben wir diese Daten nicht ohne Ihre Einwilligung an Dritte weiter.
                </p>
                <p>
                    Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre
                    Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
                    Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem
                    berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen
                    (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern
                    diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
                </p>
                <p>
                    Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung
                    auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung
                    entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche
                    Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
                </p>

                <h3>Anfrage per E-Mail, Telefon oder Telefax</h3>
                <p>
                    Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller
                    daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres
                    Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung
                    weiter.
                </p>

                <h2>5. Plugins und Tools</h2>

                <h3>Schriftarten (lokales Hosting)</h3>
                <p>
                    Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten die Schriften
                    <em> Geist</em> und <em>Geist Mono</em>. Die Schriftdateien werden bereits beim
                    Erstellen der Website heruntergeladen und ausschließlich von unserem eigenen Server
                    ausgeliefert. Beim Besuch dieser Website wird keinerlei Verbindung zu Google-Servern
                    aufgebaut, insbesondere werden auch keine IP-Adressen an Google übermittelt.
                </p>

                <h3>Plausible Analytics (cookielose Reichweitenmessung)</h3>
                <p>
                    Zur statistischen Auswertung der Besucherzugriffe nutzen wir Plausible Analytics,
                    einen Webanalysedienst mit Hosting in der Europäischen Union. Plausible setzt
                    <strong> keine Cookies</strong>, speichert <strong>keine IP-Adressen</strong> und
                    erstellt <strong>keine geräteübergreifenden Profile</strong>. Es werden ausschließlich
                    aggregierte, nicht-personenbezogene Nutzungsdaten erhoben (z. B. aufgerufene Seiten,
                    Referrer, ungefähre Herkunftsregion auf Länderebene, Gerätetyp).
                </p>
                <p>
                    Da Plausible keine Informationen im Endgerät speichert oder ausliest, ist hierfür
                    keine Einwilligung nach § 25 Abs. 1 TDDDG erforderlich. Rechtsgrundlage für die
                    Verarbeitung der aggregierten Daten ist unser berechtigtes Interesse an einer
                    datenschutzfreundlichen Reichweitenmessung und der Verbesserung unseres Angebots
                    (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen:
                    {' '}
                    <a href="https://plausible.io/data-policy" target="_blank" rel="noopener noreferrer">
                        plausible.io/data-policy
                    </a>.
                </p>

                <h2>6. Eigene Dienste</h2>

                <h3>Umgang mit Bewerberdaten</h3>
                <p>
                    Wir bieten Ihnen die Möglichkeit, sich bei uns zu bewerben (z. B. per E-Mail oder postalisch).
                    Im Folgenden informieren wir Sie über Umfang, Zweck und Verwendung Ihrer im Rahmen des
                    Bewerbungsprozesses erhobenen personenbezogenen Daten.
                </p>
                <p>
                    Im Falle einer erfolglosen Bewerbung werden die Daten des Bewerbers nach Ablauf einer Frist von
                    6 Monaten nach Bekanntgabe der Absageentscheidung gelöscht, sofern einer Löschung keine sonstigen
                    berechtigten Interessen des Datenverantwortlichen entgegenstehen.
                </p>
            </div>
        </div>
    );
}
