/**
 * Structured content for generated SEO Ratgeber articles.
 *
 * Block-based so articles can be authored/extended as data (no bespoke JSX per
 * post). Rendered by app/blog/[slug]/articles/Renderer.tsx into the existing
 * `.blog-content` typography. Meta also feeds lib/blog-posts.ts + sitemap.
 */
import type { BlogPost } from './blog-posts';

export interface ArticleBlock {
  type: 'h2' | 'h3' | 'p' | 'quote' | 'ul' | 'ol' | 'linklist';
  text?: string;
  items?: string[];
  links?: { label: string; href: string }[];
}

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface GeneratedArticle {
  meta: BlogPost;
  blocks: ArticleBlock[];
  faqs: ArticleFaq[];
}

export const generatedArticles: GeneratedArticle[] = [
  {
    meta: {
      slug: 'warenwirtschaft-autoteilhandel-checkliste',
      title: 'Warenwirtschaft für den Autoteilehandel: die Auswahl-Checkliste',
      description:
        'Welche WaWi passt zum Kfz-Teilehandel? Checkliste zu OEM/Fitment, ATP, Foto-Wareneingang, Inventur, Altteilpfand und GoBD.',
      excerpt:
        'Eine praxisnahe Auswahl-Checkliste, mit der Autoteilehändler ein Warenwirtschaftssystem finden, das OEM-Bezug, Fitment, Bestandsführung und GoBD-Pflichten wirklich abdeckt.',
      category: 'Ratgeber',
      readingMinutes: 7,
      keywords: [
        'Warenwirtschaft Autoteilehändler',
        'WaWi Kfz-Teile',
        'Lagerverwaltung Autoteile',
        'Warenwirtschaftssystem auswählen',
        'OEM-Ermittlung',
        'Altteilpfand',
        'GoBD Autoteilehandel',
      ],
      publishedAt: '2026-06-20',
      updatedAt: '2026-09-04',
    },
    blocks: [
      {
        type: 'p',
        text: 'Eine passende Lösung muss Fahrzeug- und Teilebezug, Bestand und Belege in den benötigten Abläufen zusammenführen. Prüfen Sie diese Punkte mit einem eigenen Beispielszenario: Welche Daten werden übernommen, welche fehlen beim nächsten Schritt und wo ist eine zusätzliche Anbindung nötig?',
      },
      {
        type: 'h2',
        text: 'OEM-Nummern und Fahrzeug-Fitment: die Pflicht für jede WaWi für Kfz-Teile',
      },
      {
        type: 'p',
        text: 'Der erste und wichtigste Prüfpunkt für eine Warenwirtschaft im Autoteilehandel: Versteht das System überhaupt die Sprache der Branche? Ein Artikel ohne sauberen OEM- und Fitment-Bezug ist im Teilehandel nur ein halber Datensatz. Wenn Mitarbeitende OE-Nummern und Fahrzeugzuordnungen manuell pflegen müssen, entstehen Fehlverkäufe, Retouren und langsame Beratung.',
      },
      {
        type: 'ul',
        items: [
          'Greift die Lösung auf lizenzierte Herstellerkataloge statt auf nicht lizenzierte Drittquellen zu?',
          'Lassen sich OE-Nummern, Vergleichsnummern und Hersteller-Referenzen einem Artikel zuordnen und durchsuchen?',
          'Ist ein KFZ-Fitment hinterlegt, also die Zuordnung Teil zu Fahrzeug (Marke, Modell, Motorisierung), idealerweise per HSN/TSN oder VIN?',
          'Kann eine Anfrage vom Fahrzeug ausgehen und automatisch die passenden Artikel im eigenen Bestand finden?',
        ],
      },
      {
        type: 'p',
        text: 'Partsunion arbeitet mit lizenzierten Herstellerkatalogen plus eigener Datenbank – ohne Web-Scraping. Partsunion verfügt über die erforderlichen Nutzungsrechte. Genau diese OE-Tiefe unterscheidet eine echte WaWi für Kfz-Teile von einer allgemeinen Handelssoftware.',
      },
      {
        type: 'h2',
        text: 'Bestandsführung und ATP: Doppelverkäufe in der Lagerverwaltung für Autoteile vermeiden',
      },
      {
        type: 'p',
        text: 'Im Teilehandel zählt nicht nur, wie viel auf Lager liegt, sondern wie viel davon noch frei verkäuflich ist. Wer denselben einzelnen Gebrauchtteil oder die letzte Bremsscheibe zweimal verkauft, verliert Marge und Vertrauen. Eine gute Lagerverwaltung für Autoteile braucht deshalb ein zentrales Bestands-Ledger und eine verlässliche Verfügbarkeitslogik.',
      },
      {
        type: 'ul',
        items: [
          'Gibt es ein zentrales Bestands-Ledger, das jede Buchung nachvollziehbar festhält?',
          'Unterstützt das System ATP (Available to Promise), also Reservierungen, die verkaufte oder zugesagte Mengen vom freien Bestand abziehen?',
          'Werden Chargen und Seriennummern geführt, wo es nötig ist (z. B. sicherheitsrelevante oder rückrufbehaftete Teile)?',
          'Bildet die WaWi mehrere Lagerorte und einen geteilten Katalog korrekt ab, ohne dass sich Bestände gegenseitig überschreiben?',
        ],
      },
      {
        type: 'quote',
        text: 'Die Kernfrage jeder WaWi-Auswahl im Autoteilehandel lautet nicht „Wie viele Teile habe ich?“, sondern „Wie viele kann ich heute noch verbindlich verkaufen?“',
      },
      {
        type: 'p',
        text: 'Reservierungen verhindern den klassischen Doppelverkauf. Reorder-Intelligenz hilft zusätzlich, Schnelldreher rechtzeitig nachzubestellen, statt Kapital in Ladenhütern zu binden.',
      },
      {
        type: 'h2',
        text: 'Wareneingang, Retoure und Inventur: schnelle Erfassung statt Tipparbeit',
      },
      {
        type: 'p',
        text: 'Der Engpass in vielen Lagern ist nicht der Verkauf, sondern die Erfassung. Wer Wareneingänge, Retouren und Inventuren manuell abtippt, verliert Zeit und produziert Fehler. Prüfen Sie deshalb, wie pragmatisch eine Warenwirtschaft für Autoteilehändler die alltägliche Erfassung gestaltet.',
      },
      {
        type: 'ol',
        items: [
          'Foto-Wareneingang: Lässt sich neue Ware fotografieren und KI-gestützt vorerfassen, statt jedes Etikett manuell einzutippen?',
          'Retoure per Foto: Können zurückkommende Teile mit Bild und Zustand dokumentiert und einer Bestellung zugeordnet werden?',
          'Inventur: Gibt es eine geführte, beleg- und protokollsichere Inventurfunktion statt Excel-Listen?',
          'Teil-Lieferungen: Werden Wareneingänge auch dann korrekt gebucht, wenn eine Bestellung nur teilweise ankommt, ohne Phantombestand zu erzeugen?',
        ],
      },
      {
        type: 'p',
        text: 'Foto-First-Erfassung ist gerade im Gebrauchtteil- und Mischsortiment ein echter Tempo-Hebel. Als Zielwert bzw. internen Benchmark sollten Sie messen, wie viele Minuten pro Position eine Erfassung heute kostet – und diesen Wert nach der Einführung erneut prüfen. Konkrete Einsparzahlen sind betriebsindividuell und sollten nie als Pauschalversprechen verstanden werden.',
      },
      {
        type: 'h2',
        text: 'Altteilpfand und Sonderfälle korrekt abbilden',
      },
      {
        type: 'p',
        text: 'Der Autoteilehandel hat steuerliche Eigenheiten, die generische Systeme oft nur mit Workarounds abbilden. Allen voran das Altteilpfand: Es muss umsatzsteuerlich korrekt behandelt werden, sowohl bei der Berechnung als auch bei der Rückerstattung. Prüfen Sie, ob die WaWi diese Fälle nativ kennt.',
      },
      {
        type: 'ul',
        items: [
          'Wird Altteilpfand umsatzsteuerlich korrekt geführt – inklusive Ausweis auf Beleg und Gutschrift?',
          'Lässt sich die Differenzbesteuerung nach § 25a UStG (z. B. für Gebrauchtteile) sauber abbilden und am Beleg kennzeichnen?',
          'Werden grenzüberschreitende Fälle wie innergemeinschaftliche Lieferung, Ausfuhr oder Reverse-Charge unterstützt?',
          'Bleibt der Standardfall Inland-Regelbesteuerung dabei einfach und fehlerarm?',
        ],
      },
      {
        type: 'p',
        text: 'Diese Punkte sind keine Kür: Falsch ausgewiesene Steuer kostet bei einer Prüfung Geld und Nerven. Dieser Artikel ersetzt keine Steuerberatung – klären Sie Ihre konkrete Konstellation mit Ihrem Steuerberater oder Ihrer Steuerberaterin.',
      },
      {
        type: 'h2',
        text: 'GoBD, TSE und DATEV: die Compliance-Anbindung der Warenwirtschaft',
      },
      {
        type: 'p',
        text: 'Eine Warenwirtschaft, deren Belege später nicht prüfungssicher und übergabefähig sind, schafft nur scheinbar Ordnung. Achten Sie bei der Auswahl darauf, dass die kaufmännischen und steuerlichen Anschlüsse vorhanden sind und zur deutschen Rechtslage passen. Ob ein konkreter Betrieb am Ende GoBD-konform arbeitet, hängt immer auch von den eigenen Prozessen ab – die Software liefert dafür die Grundlage.',
      },
      {
        type: 'ul',
        items: [
          'GoBD-orientierte, revisionssicher nachvollziehbare Belegführung mit protokollierten Buchungen und Audit-Log',
          'TSE und DSFinV-K, sofern Sie Kassenvorgänge nach § 146a AO erfassen',
          'E-Rechnung nach EN 16931, also ZUGFeRD und XRechnung, für den B2B-Verkehr',
          'DATEV-Export (SKR03/04, EXTF) sowie Anschlüsse für USt-Voranmeldung, OSS und Intrastat',
          'Bankanbindung über SEPA und MT940 für den Zahlungsabgleich',
        ],
      },
      {
        type: 'p',
        text: 'Partsunion bündelt diese Funktionen in drei Workspaces – Verkauf, Lager und Finanzen – auf einer gemeinsamen Datenbasis. So entsteht aus einem Wareneingang am Ende ein prüfungsfähiger Beleg, ohne Systembruch zwischen WaWi und Buchhaltung. Generische ERP- und WaWi-Lösungen wie weclapp, Xentral oder JTL decken Lager, Einkauf und Verkauf ebenfalls breit ab, sind aber nicht kfz-spezifisch ausgelegt; OEM-Bezug und Fitment müssen Sie dort in der Regel über Zusatzlösungen abbilden.',
      },
      {
        type: 'h2',
        text: 'Sicherheit, Rollen und Skalierung nicht vergessen',
      },
      {
        type: 'p',
        text: 'Zum Schluss der Checkliste: Wer mit mehreren Mitarbeitenden oder Standorten arbeitet, braucht ein System, das Zugriffe sauber trennt und Daten schützt. Achten Sie auf ein rollenbasiertes Rechtekonzept, Zwei-Faktor-Authentifizierung, eine saubere Mandanten-Isolation, ein nachvollziehbares Audit-Log sowie Verschlüsselung at rest und Transportverschlüsselung per TLS. Vermeiden Sie Anbieter, die mit pauschalen Versprechen wie „komplett sicher“ werben – aussagekräftig ist eine konkrete, nachprüfbare Liste an Maßnahmen.',
      },
      {
        type: 'p',
        text: 'Einige zukunftsweisende Bausteine wie Marktplatz- und Shop-Sync, Großhändler-Direktbestellung oder Versand-Tracking befinden sich bei Partsunion in Entwicklung. Bewerten Sie bei jedem Anbieter klar, was heute live ist und was Roadmap – und treffen Sie Ihre Auswahl auf Basis der Funktionen, die Sie ab Tag eins brauchen. Wer den Aufwand gegen den Nutzen rechnen will, kann das im ROI-Rechner durchspielen oder die offenen Punkte direkt in einer Beratung klären.',
      },
      {
        type: 'linklist',
        text: 'Weiterlesen',
        links: [
          {
            label: 'Warenwirtschaft für den Autoteilehandel – Funktionsüberblick',
            href: '/features/warenwirtschaft-autoteilhandel',
          },
          {
            label: 'OE-Ermittlung und Fitment über lizenzierte Herstellerkataloge',
            href: '/features/oem-ermittlung',
          },
          {
            label: 'GoBD, TSE, ZUGFeRD und DATEV-Anbindung im Detail',
            href: '/features/gobd-tse-zugferd-datev',
          },
          {
            label: 'ERP für den Autoteilehandel: drei Workspaces auf einer Datenbasis',
            href: '/features/erp-autoteilehandel',
          },
          {
            label: 'WhatsApp-Bot: Anfragen automatisch zu Aufträgen',
            href: '/features/whatsapp-bot',
          },
          {
            label: 'Funktionsvergleich: kfz-spezifisch gegen generische Systeme',
            href: '/vergleich',
          },
          {
            label: 'ROI-Rechner: Aufwand und Nutzen durchrechnen',
            href: '/pricing',
          },
          {
            label: 'Unverbindliche Beratung anfragen',
            href: '/#beratung',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Warum reicht eine generische Warenwirtschaft im Autoteilehandel oft nicht aus?',
        a: 'Generische WaWi- und ERP-Systeme wie weclapp, Xentral oder JTL decken Lager, Einkauf und Verkauf ab, sind aber nicht kfz-spezifisch. Es fehlen meist der native OEM-Bezug über einen lizenzierten Teilekatalog und das Fahrzeug-Fitment. Beides müssen Sie dort in der Regel über Zusatzlösungen nachrüsten, während eine branchenspezifische Lösung diese Daten von Anfang an versteht.',
      },
      {
        q: 'Was bedeutet ATP in einer Lagerverwaltung für Autoteile?',
        a: 'ATP steht für Available to Promise, also den frei verkäuflichen Bestand. Reservierte oder bereits zugesagte Mengen werden vom physischen Lagerbestand abgezogen, sodass nicht zweimal dieselbe Position verkauft wird. Gerade bei Gebrauchtteilen und Gebrauchtteilen verhindert das ATP-Prinzip Doppelverkäufe und damit Retouren und Margenverlust.',
      },
      {
        q: 'Wie muss Altteilpfand in der Warenwirtschaft behandelt werden?',
        a: 'Altteilpfand ist umsatzsteuerlich relevant und sollte sowohl bei der Berechnung als auch bei der Rückerstattung korrekt ausgewiesen werden. Eine kfz-spezifische WaWi kennt diesen Fall nativ und bildet ihn auf Beleg und Gutschrift ab. Die konkrete steuerliche Behandlung sollten Sie jedoch mit Ihrem Steuerberater abstimmen; dieser Beitrag ersetzt keine Steuerberatung.',
      },
      {
        q: 'Welche Compliance-Funktionen sollte eine WaWi für Kfz-Teile mitbringen?',
        a: 'Wichtig sind eine GoBD-orientierte, revisionssicher nachvollziehbare Belegführung, TSE und DSFinV-K bei Kassenvorgängen nach § 146a AO, E-Rechnung nach EN 16931 (ZUGFeRD und XRechnung), ein DATEV-Export (SKR03/04, EXTF) sowie Anschlüsse für USt-Voranmeldung, OSS, Intrastat und den Zahlungsabgleich per SEPA und MT940. Ob Ihr Betrieb am Ende GoBD-konform arbeitet, hängt zusätzlich von den eigenen Prozessen ab.',
      },
    ],
  },
  {
    meta: {
      slug: 'erp-vs-generisch-autoteilhandel',
      title: 'ERP für den Teilehandel: branchenspezifisch vs. generisch im Vergleich',
      description:
        'ERP-Vergleich für Autoteile: Erfahre, wo generische Systeme Anpassungen brauchen und wie Branchenlösungen OE-Suche, WhatsApp, Lager und DACH-Belege verbinden.',
      excerpt:
        'Generisches ERP anpassen oder branchenspezifisch starten? Der ehrliche Vergleich für den Autoteilehandel — von OEM-Logik über WhatsApp bis DACH-Steuer und Einführungszeit.',
      category: 'Ratgeber',
      readingMinutes: 10,
      keywords: [
        'ERP Autoteilehandel',
        'ERP Teilehandel',
        'branchenspezifisches ERP Kfz',
        'ERP Vergleich Autoteile',
        'ERP Customizing Teilehandel',
        'weclapp Xentral JTL Autoteile',
      ],
      publishedAt: '2026-06-20',
      updatedAt: '2026-09-04',
    },
    blocks: [
      {
        type: 'p',
        text: 'Wer ein ERP für den Autoteilehandel sucht, steht früh vor einer Grundsatzentscheidung: Setzt man auf ein etabliertes, generisches System und passt es an die Branche an? Oder wählt man von vornherein eine Plattform, die für den Kfz-Teilehandel gebaut wurde? Die Frage klingt nach Detail, entscheidet aber über Einführungszeit, laufende Kosten und darüber, ob am Ende die Prozesse zur Software passen oder die Software zu den Prozessen gezwungen wird. Dieser Ratgeber ordnet den ERP-Vergleich für Autoteile sachlich ein, zeigt, wo generische Systeme im Teilehandel an Grenzen stoßen, und an welchen Stellen ein branchenspezifisches ERP für den Kfz-Teilehandel strukturell besser löst.',
      },
      {
        type: 'h2',
        text: 'ERP-Vergleich Autoteile: warum ein generisches System im Teilehandel anders aussieht als gedacht',
      },
      {
        type: 'p',
        text: 'Generische ERP-Systeme wie weclapp, Xentral oder JTL sind leistungsfähige, breit einsetzbare Plattformen. Sie sind aber bewusst branchenneutral gebaut: Sie kennen Artikel, Lager, Belege und Buchhaltung, in der Regel jedoch nicht die Eigenheiten des Aftermarkets. Genau hier beginnt die Arbeit. Ein ERP für den Teilehandel muss Dinge abbilden, die in einem allgemeinen System häufig nicht vorgesehen sind, etwa die Zuordnung eines Artikels zu einer OEM-Nummer und zu konkreten Fahrzeugen (Fitment), das Altteilpfand als umsatzsteuerlich korrekten Vorgang oder die Annahme von Anfragen über WhatsApp samt Fahrzeugschein-Foto.',
      },
      {
        type: 'p',
        text: 'Solche Anforderungen lassen sich in einem generischen ERP meist nur über Customizing, Zusatzmodule oder Drittanbieter-Schnittstellen nachbauen. Das ist technisch machbar, kostet aber Zeit, Beratungstage und schafft eine Wartungslast: Jede Anpassung muss bei Updates des Kernsystems mitgepflegt werden. Die zentrale Frage im ERP-Vergleich für Autoteile lautet deshalb nicht nur, was das System ab Werk kann, sondern auch, was man selbst dazubauen und dauerhaft pflegen muss.',
      },
      {
        type: 'h2',
        text: 'Die typischen Lücken: OEM, WhatsApp und Altteilpfand',
      },
      {
        type: 'p',
        text: 'Drei Bereiche tauchen in nahezu jeder Bewertung eines ERP für den Autoteilehandel auf, weil sie über Marge, Retouren und Tempo entscheiden und in generischen Systemen häufig fehlen oder nur mit Zusatzaufwand nachgerüstet werden können:',
      },
      {
        type: 'ul',
        items: [
          'OEM- und Teilekatalog-Logik: Die zuverlässige Ermittlung der richtigen Teilenummer aus VIN, HSN/TSN oder einem Fahrzeugschein ist das Herzstück des Teilehandels. Ein branchenspezifisches System bringt Katalogdaten und Cross-Reference mit; ein generisches ERP deckt diese Domäne in der Regel nicht ab und braucht eine externe Anbindung.',
          'WhatsApp als Vertriebskanal: Werkstätten und Endkunden fragen heute per Foto und Sprachnachricht an. Ein generisches ERP hat dafür meist keinen nativen Kanal; die Anbindung wird zum Integrationsprojekt mit eigener Fehlerquelle.',
          'Altteilpfand: Der Pfand auf Altteile muss umsatzsteuerlich sauber abgebildet und auf Beleg sowie in der Buchhaltung korrekt geführt werden. In einem branchenneutralen System ist das ein Sonderfall, der nachgebaut werden muss.',
        ],
      },
      {
        type: 'p',
        text: 'Keiner dieser Punkte ist in einem generischen ERP grundsätzlich unmöglich. Aber jeder einzelne verlängert tendenziell die Einführung und bindet Budget, das nicht in den Betrieb fließt. In einem branchenspezifischen System sind sie Teil des Standards und damit getestet, dokumentiert und update-fest. Tiefergehende Einblicke bieten die Detailseiten zur OEM-Ermittlung und zum WhatsApp-Bot.',
      },
      {
        type: 'h2',
        text: 'DACH-Steuer und Compliance: ab Werk statt nachgerüstet',
      },
      {
        type: 'p',
        text: 'Ein oft unterschätzter Faktor im ERP-Vergleich für Autoteile ist die Steuer- und Belegseite. Im deutschsprachigen Raum gelten konkrete Anforderungen: GoBD-konforme Aufzeichnung, technische Sicherheitseinrichtung nach Paragraf 146a AO für elektronische Aufzeichnungssysteme im Kassenbereich, DSFinV-K als Exportformat, elektronische Rechnung nach EN 16931 (ZUGFeRD/XRechnung), DATEV-Export (SKR 03/04, EXTF) sowie Umsatzsteuer-Voranmeldung, OSS, Intrastat und Bankformate wie SEPA und MT940. Generische Systeme decken vieles davon ab, oft aber über kostenpflichtige Module oder externe Steuer-Plugins, und nicht immer in der Tiefe, die der Handel mit Pfand, Cross-Border-Lieferungen und Differenzbesteuerung braucht.',
      },
      {
        type: 'p',
        text: 'Eine branchenspezifische Plattform kann diese Punkte als integralen Bestandteil mitbringen, sodass Beleg, Buchung und Export aus einer Datenbasis entstehen. Das senkt das Risiko von Brüchen zwischen Verkauf, Lager und Finanzen. Wichtig und ehrlich gesagt: Software ist Werkzeug, keine Rechtsberatung. Die korrekte steuerliche Behandlung im Einzelfall klären Sie bitte mit Ihrer Steuerberatung; ein ERP kann die Umsetzung erleichtern, ersetzt die fachliche Prüfung aber nicht.',
      },
      {
        type: 'quote',
        text: 'Die ehrliche Rechnung beim ERP für den Teilehandel ist nicht Lizenzpreis gegen Lizenzpreis, sondern Standardabdeckung gegen Customizing-Aufwand über die gesamte Laufzeit.',
      },
      {
        type: 'h2',
        text: 'Einführungszeit und Gesamtkosten: wo der Unterschied wirklich liegt',
      },
      {
        type: 'p',
        text: 'Der sichtbare Preisunterschied zwischen einem generischen und einem branchenspezifischen ERP ist selten die ganze Geschichte. Entscheidend ist der Total Cost of Ownership über mehrere Jahre. Wer ein generisches System branchenfit machen will, kalkuliert typischerweise mit folgenden Posten:',
      },
      {
        type: 'ol',
        items: [
          'Konzeption und Customizing für OEM-Logik, Fitment, Altteilpfand und Kanäle.',
          'Externe Schnittstellen (Katalogdaten, Messaging, Steuer-Exporte) inklusive deren Lizenz- und Wartungskosten.',
          'Beratungstage für Einrichtung, Schulung und Datenmigration.',
          'Laufende Pflege der Anpassungen bei jedem Update des Kernsystems.',
        ],
      },
      {
        type: 'p',
        text: 'Ein branchenspezifisches ERP für den Kfz-Teilehandel verschiebt diese Posten in den Standard und verkürzt damit tendenziell die Zeit bis zum produktiven Betrieb. Belastbare Zahlen hängen stark vom Einzelbetrieb ab; jede pauschale Ersparnis ist eine Modellrechnung und sollte mit den eigenen Mengengerüsten gegengeprüft werden. Für eine erste, betriebsbezogene Einordnung der laufenden Kosten und des möglichen Effekts können Sie den ROI-Rechner auf der Preis-Seite nutzen und Anfragevolumen, Retourenquote und Beratungsaufwand durchspielen.',
      },
      {
        type: 'h2',
        text: 'Was eine branchenspezifische Plattform abdeckt',
      },
      {
        type: 'p',
        text: 'Partsunion verbindet Teileidentifikation, Verkauf, Einkauf, Bestand und Belege. Welche Funktionen und Anbindungen in Ihrem Betrieb eingesetzt werden können, wird vor der Einführung abgestimmt. Zahlungsdienste, Marktplatzveröffentlichung, Kassenanbindung und B2B-Portal benötigen eine gesonderte Prüfung von Vertrag, Einrichtung und Freischaltung.',
      },
      {
        type: 'ul',
        items: [
          'Drei Arbeitsbereiche für Verkauf, Lager und Finanzen auf einer gemeinsamen Datenbasis, ohne Systembrüche.',
          'WhatsApp-Bot mit Foto- und Fahrzeugschein-Erkennung in fünf Sprachen (DE/EN/TR/KU/PL) inklusive Sprachnachrichten.',
          'OE-Ermittlung über lizenzierte Herstellerkataloge plus eigene Datenbank, ausdrücklich ohne Web-Scraping.',
          'Warenwirtschaft mit zentralem Bestands-Ledger, ATP-Reservierungen, Foto-Wareneingang per KI, Reorder-Intelligenz, Kfz-Fitment, Chargen/Serien, Inventur und Retoure per Foto.',
          'Rechnungen, offene Posten und DATEV-Export auf Basis der Belegdaten. TSE und DSFinV-K sind als technische Pfade vorbereitet; die konkrete Kassenanbindung und Freigabe sind vor dem produktiven Einsatz zu prüfen.',
          'White-Label-B2B-Kundenportal mit serverseitig berechneten, kundenspezifischen Preisen.',
          'Sicherheit mit 5-Rollen-RBAC, 2FA, Mandanten-Isolation, Audit-Log, DSGVO-Funktionen, Verschlüsselung im Ruhezustand und TLS, dazu über 40 datengetriebene Auswertungen.',
        ],
      },
      {
        type: 'p',
        text: 'Der Punkt ist nicht, dass generische ERP-Systeme schlecht wären. Für viele Branchen sind sie die richtige Wahl. Im Teilehandel verschiebt sich die Rechnung jedoch, weil die branchenkritischen Funktionen genau dort liegen, wo generische Systeme Anpassung verlangen. Wer diese Funktionen ab Werk bekommt, spart Customizing, gewinnt Einführungszeit und reduziert die langfristige Wartungslast.',
      },
      {
        type: 'linklist',
        links: [
          {
            label: 'ERP für den Autoteilehandel im Überblick',
            href: '/features/erp-autoteilehandel',
          },
          {
            label: 'Direkter Vergleich generisch vs. branchenspezifisch',
            href: '/vergleich',
          },
          {
            label: 'Warenwirtschaft für den Autoteilehandel',
            href: '/features/warenwirtschaft-autoteilhandel',
          },
          {
            label: 'GoBD, TSE, ZUGFeRD und DATEV im Detail',
            href: '/features/gobd-tse-zugferd-datev',
          },
          {
            label: 'OEM-Ermittlung aus VIN, HSN/TSN und Fahrzeugschein',
            href: '/features/oem-ermittlung',
          },
          {
            label: 'WhatsApp-Bot als Eingangskanal',
            href: '/features/whatsapp-bot',
          },
          {
            label: 'Laufende Kosten mit dem ROI-Rechner einordnen',
            href: '/pricing',
          },
          {
            label: 'Unverbindliche Erstberatung anfragen',
            href: '/#beratung',
          },
        ],
      },
      {
        type: 'p',
        text: 'Eine letzte praktische Empfehlung: Bewerten Sie Kandidaten nicht anhand von Funktionslisten, sondern anhand Ihrer drei bis fünf häufigsten Arbeitsabläufe, etwa Anfrage per WhatsApp bis Angebot, Wareneingang bis Reservierung und Rechnung bis DATEV-Export. Spielen Sie diese Abläufe konkret durch. So wird im ERP-Vergleich für Autoteile schnell sichtbar, was Standard ist und was erst gebaut werden müsste.',
      },
    ],
    faqs: [
      {
        q: 'Lohnt sich ein branchenspezifisches ERP für den Autoteilehandel gegenüber einem generischen System?',
        a: 'Das hängt vom Anteil branchenkritischer Funktionen ab. Sobald OEM-/Fitment-Logik, ein WhatsApp-Kanal und Altteilpfand zentral sind, verschiebt sich die Rechnung: Ein generisches System wie weclapp, Xentral oder JTL braucht für diese Punkte in der Regel Customizing und Schnittstellen, die laufend gepflegt werden müssen. Ein branchenspezifisches ERP für den Kfz-Teilehandel bringt sie im Standard mit. Maßgeblich ist der Total Cost of Ownership über mehrere Jahre, nicht der reine Lizenzpreis.',
      },
      {
        q: 'Was kostet das Customizing eines generischen ERPs für den Teilehandel?',
        a: 'Eine pauschale Zahl wäre unseriös, weil die Kosten stark vom Betrieb, vom Funktionsumfang und vom gewählten System abhängen. Realistisch kalkulieren Sie vier Posten: Konzeption und Customizing, externe Schnittstellen für Katalog, Messaging und Steuer-Exporte, Beratungs- und Schulungstage sowie die laufende Pflege der Anpassungen bei Updates. Jede konkrete Ersparnis im Vergleich ist eine Modellrechnung und sollte mit den eigenen Mengengerüsten geprüft werden.',
      },
      {
        q: 'Deckt ein branchenspezifisches ERP die deutsche Steuer- und Belegpflicht vollständig ab?',
        a: 'Eine auf den DACH-Teilehandel ausgerichtete Plattform kann GoBD, TSE nach Paragraf 146a AO, DSFinV-K, ZUGFeRD/XRechnung nach EN 16931, DATEV-Export und USt-Funktionen als integralen Bestandteil mitbringen, sodass Beleg, Buchung und Export aus einer Datenbasis entstehen. Software ist dabei Werkzeug, kein Ersatz für Steuerberatung. Die korrekte Behandlung im Einzelfall, etwa bei Differenzbesteuerung oder Cross-Border-Lieferungen, klären Sie mit Ihrer Steuerberatung.',
      },
      {
        q: 'Wie lange dauert die Einführung eines ERP im Autoteilehandel?',
        a: 'Die Einführungszeit hängt vor allem davon ab, wie viel ab Werk passt und wie viel gebaut werden muss. Generische Systeme verlängern sich tendenziell durch Customizing und Schnittstellen-Projekte für OEM-Logik, Kanäle und Steuer-Exporte. Branchenspezifische Systeme verschieben diese Punkte in den Standard und verkürzen damit tendenziell die Zeit bis zum produktiven Betrieb. Belastbar wird die Schätzung erst nach einem Blick auf Datenmigration, Schnittstellen und Schulungsbedarf im konkreten Betrieb.',
      },
    ],
  },
  {
    meta: {
      slug: 'gobd-tse-kasse-autohandel',
      title: 'GoBD & TSE-Kasse im Autoteilehandel: der Pflicht-Überblick',
      description:
        'GoBD, TSE, DSFinV-K, E-Rechnung und DATEV im Teilehandel: Anforderungen einordnen und die konkrete Kassenanbindung vor dem Einsatz prüfen.',
      excerpt:
        'Der kompakte Compliance-Leitfaden zu GoBD, TSE, DSFinV-K, E-Rechnung und DATEV für den Autoteilehandel – sachlich, branchengerecht und ohne Fachchinesisch.',
      category: 'Compliance',
      readingMinutes: 8,
      keywords: [
        'GoBD Kasse Autohandel',
        'TSE Pflicht Autoteile',
        'DSFinV-K',
        'Kassenbuch Autohandel',
        'ZUGFeRD Pflicht',
        'XRechnung EN 16931',
        'DATEV Autoteilehandel',
        '§146a AO Kasse',
      ],
      publishedAt: '2026-06-20',
      updatedAt: '2026-09-04',
    },
    blocks: [
      {
        type: 'p',
        text: 'GoBD, TSE, DSFinV-K, ZUGFeRD, XRechnung, DATEV – wer im Autoteilehandel verkauft, stolpert spätestens bei der nächsten Betriebsprüfung über dieses Buchstabengewitter. Die Pflichten sind real, branchenübergreifend und werden vom Finanzamt zunehmend digital geprüft: Statt Aktenordnern verlangt der Prüfer heute strukturierte Exporte. Für Sie als Händler heißt das: Theke, Online-Verkauf und Buchhaltung müssen revisionssicher zusammenspielen. Dieser Ratgeber ordnet die Vorgaben nüchtern ein – was an der Theke und im Teilehandel konkret Pflicht ist, ab wann, und wie Partsunion die geforderten Funktionen abbildet. Hinweis vorab: Dieser Beitrag ersetzt keine individuelle Steuerberatung; verbindliche Auskünfte gibt Ihr Steuerberater oder das Finanzamt.',
      },
      {
        type: 'h2',
        text: 'GoBD: Festschreibung und Unveränderbarkeit im Autohandel',
      },
      {
        type: 'p',
        text: 'Die GoBD (Grundsätze zur ordnungsmäßigen Führung und Aufbewahrung von Büchern, Aufzeichnungen und Unterlagen in elektronischer Form) sind keine Software-Norm, sondern eine Verwaltungsanweisung des BMF. Sie gelten für jeden buchführungs- oder aufzeichnungspflichtigen Betrieb – also auch für die kleine Teile-Theke. Kern ist die Unveränderbarkeit: Eine einmal erfasste Buchung oder ein erstelltes Beleg-Dokument darf nicht mehr spurlos verändert oder gelöscht werden. Korrekturen müssen als nachvollziehbare Storno- oder Änderungsbuchung erfolgen, nicht durch Überschreiben.',
      },
      {
        type: 'p',
        text: 'Für eine GoBD-konforme Kasse im Autohandel bedeutet das vor allem drei Anforderungen: zeitnahe Erfassung, Vollständigkeit und Festschreibung. Belege müssen lückenlos und fortlaufend nummeriert sein – eine fehlende Rechnungsnummer ist im Zweifel ein Anlass für die Schätzung durch den Prüfer. Partsunion adressiert genau diese Punkte: Rechnungen und Belege werden festgeschrieben, ein Audit-Log protokolliert sicherheitsrelevante Vorgänge, und die Daten werden verschlüsselt im Ruhezustand (at rest) sowie über TLS-gesicherte Verbindungen verarbeitet. Korrekturen laufen über Gutschriften und Stornos statt über stilles Überschreiben.',
      },
      {
        type: 'ul',
        items: [
          'Unveränderbarkeit: keine Buchung wird überschrieben, Korrekturen erfolgen nachvollziehbar per Storno oder Gutschrift',
          'Vollständigkeit: fortlaufende, lückenlose Nummernkreise für Rechnungen und Belege',
          'Nachvollziehbarkeit: Audit-Log und Protokollierung sicherheitsrelevanter Vorgänge',
          'Verfügbarkeit: maschinelle Auswertbarkeit der Daten über die gesamte Aufbewahrungsfrist',
        ],
      },
      {
        type: 'p',
        text: 'Praxisrelevant für den Teilehandel: Auch die Verfahrensdokumentation gehört zur GoBD. Sie beschreibt, wie Belege entstehen, erfasst und archiviert werden – vom WhatsApp-Auftrag über die Theke bis zur Buchung. Diese Dokumentation müssen Sie selbst pflegen; eine Software kann die technischen Bausteine liefern, die organisatorische Beschreibung Ihres Prozesses bleibt Ihre Aufgabe.',
      },
      {
        type: 'h2',
        text: 'TSE-Pflicht nach §146a AO: Wann die Kasse zertifiziert sein muss',
      },
      {
        type: 'p',
        text: 'Die TSE-Pflicht für Autoteile-Verkäufe greift dann, wenn Sie ein elektronisches Aufzeichnungssystem im Sinne des §146a AO einsetzen – typischerweise eine Registrierkasse oder ein kassenähnliches PC-/Tablet-System an der Theke. In diesem Fall verlangt die Kassensicherungsverordnung (KassenSichV) eine zertifizierte technische Sicherheitseinrichtung (TSE). Sie signiert jeden Vorgang kryptografisch und macht nachträgliche Manipulationen technisch erkennbar. Zwei Punkte werden im Teilehandel oft unterschätzt:',
      },
      {
        type: 'ol',
        items: [
          'Keine generelle Registrierkassenpflicht: In Deutschland besteht keine Pflicht, eine elektronische Kasse zu betreiben. Wer aber eine einsetzt, muss sie nach §146a AO mit einer zertifizierten TSE absichern.',
          'Belegausgabepflicht: Bei jedem mit einer elektronischen Kasse erfassten Verkauf muss ein Beleg ausgegeben werden – elektronisch oder auf Papier. Das gilt unabhängig vom Betrag.',
          'Meldepflicht: Elektronische Aufzeichnungssysteme samt TSE sind dem Finanzamt zu melden (Mitteilungsverfahren über das ELSTER-/Meldeportal). Prüfen Sie die jeweils geltende Frist mit Ihrem Steuerberater.',
        ],
      },
      {
        type: 'quote',
        text: 'Wer keine elektronische Kasse betreibt, sondern eine offene Ladenkasse führt, unterliegt nicht der TSE-Pflicht – muss die Kassenführung aber dennoch GoBD-konform und nachvollziehbar dokumentieren.',
      },
      {
        type: 'p',
        text: 'Partsunion bietet vorbereitete Pfade für Kassenanbindungen und Prüfungsdaten. Eine produktiv nutzbare TSE-Anbindung hängt von der eingerichteten zertifizierten Komponente und dem freigegebenen Kassen-Setup ab. Lassen Sie die Eignung für Ihren konkreten Betrieb vor dem Einsatz prüfen.',
      },
      {
        type: 'h2',
        text: 'DSFinV-K und Kassenbuch im Autoteilehandel: der Prüfungs-Export',
      },
      {
        type: 'p',
        text: 'Die DSFinV-K beschreibt die digitale Schnittstelle für die Bereitstellung von Kassendaten. Prüfen Sie mit Ihrer Fachberatung, welche Daten das eingesetzte Kassensystem bereitstellen muss und ob der konkrete Export vollständig und lesbar ist. Eine reine PDF-Zusammenfassung ersetzt keinen erforderlichen strukturierten Export.',
      },
      {
        type: 'p',
        text: 'Für die Prüfung einer Kassenlösung sollte ein vollständiger Beispiel-Export mit der zuständigen Fachberatung kontrolliert werden. In Partsunion sind entsprechende Exportpfade vorbereitet. Entscheidend ist, dass Einrichtung, verwendete Version und tatsächliche Belegdaten im vereinbarten Betriebsmodell zusammenpassen.',
      },
      {
        type: 'h2',
        text: 'E-Rechnung: ZUGFeRD- und XRechnung-Pflicht im B2B-Teilehandel',
      },
      {
        type: 'p',
        text: 'Seit dem 1. Januar 2025 gilt im inländischen B2B-Geschäft die E-Rechnungs-Pflicht: Unternehmen müssen elektronische Rechnungen nach EN 16931 empfangen und verarbeiten können. Eine reine PDF-Datei ist im Sinne des Gesetzes keine E-Rechnung mehr – gefordert ist ein strukturiertes, maschinenlesbares Format. Die Empfangsfähigkeit besteht bereits jetzt für alle inländischen Unternehmen; für den verpflichtenden Versand gelten gestaffelte Übergangsfristen bis 2027/2028, abhängig von der Unternehmensgröße. Für den Teilehandel, der überwiegend an Werkstätten und gewerbliche Kunden liefert, ist das hochrelevant: Ihre B2B-Kunden werden zunehmend strukturierte Rechnungen erwarten oder verlangen.',
      },
      {
        type: 'ul',
        items: [
          'ZUGFeRD: Hybridformat aus PDF (für das menschliche Auge) plus eingebettetem, strukturiertem XML nach EN 16931 – praktisch für gemischte Empfängerkreise',
          'XRechnung: reines XML-Format, im öffentlichen Auftragswesen (B2G) bereits seit Längerem Pflicht',
          'EN 16931: die europäische Norm, auf der beide Formate aufsetzen und die das Finanzamt als Maßstab nimmt',
        ],
      },
      {
        type: 'p',
        text: 'Partsunion erstellt Rechnungen sowohl als ZUGFeRD als auch als XRechnung im EN-16931-Profil – inklusive korrekter Behandlung von Branchen-Spezialfällen wie der Differenzbesteuerung nach §25a UStG und dem umsatzsteuerlich sauberen Ausweis von Altteilpfand. Auch grenzüberschreitende Konstellationen (innergemeinschaftliche Lieferung, Ausfuhr, Reverse Charge) werden in der Umsatzsteuerlogik berücksichtigt, was im Ersatzteilexport schnell relevant wird. Wie diese Sonderfälle entstehen, beginnt schon bei der Teile-Identifikation über lizenzierte Herstellerkataloge.',
      },
      {
        type: 'h2',
        text: 'DATEV-Anbindung: die Brücke zum Steuerberater',
      },
      {
        type: 'p',
        text: 'Am Ende der Kette steht meist der Steuerberater – und der arbeitet in der Regel mit DATEV. Eine saubere DATEV-Anbindung entscheidet darüber, ob Ihre Buchhaltung reibungslos läuft oder ob am Monatsende manuell nachgetippt wird. Partsunion exportiert nach DATEV im EXTF-Format und unterstützt die Standardkontenrahmen SKR03 und SKR04. Ergänzend stehen die für die laufende Compliance nötigen Bausteine bereit: Umsatzsteuer-Voranmeldung (USt-VA), OSS für den EU-Fernverkauf, Intrastat für die Außenhandelsstatistik sowie SEPA und der MT940-Import für den Bankabgleich.',
      },
      {
        type: 'p',
        text: 'Der praktische Effekt: Belege entstehen am Verkaufsort – an der Theke oder über den WhatsApp-Bot – und fließen ohne Medienbruch in dieselbe Datenbasis, aus der Faktura, Steuermeldungen und der DATEV-Export gespeist werden. Genau dieser durchgehende Datenfluss ist der Unterschied zu generischen, nicht kfz-spezifischen Systemen wie weclapp, Xentral oder JTL, die zwar leistungsfähig sind, aber die Besonderheiten des Teilehandels – OEM-Ermittlung, Fitment, Altteilpfand, Differenzbesteuerung – nicht von Haus aus mitbringen. Eine Gesamtsicht auf die Funktionsabdeckung finden Sie auf der Übersicht der Compliance-Funktionen und im Funktionsvergleich.',
      },
      {
        type: 'linklist',
        text: 'Tiefer einsteigen:',
        links: [
          {
            label:
              'GoBD, TSE, DSFinV-K, ZUGFeRD und DATEV im Detail – die Compliance-Funktionen von Partsunion',
            href: '/features/gobd-tse-zugferd-datev',
          },
          {
            label: 'Warenwirtschaft für den Autoteilehandel: Bestand, Fitment und Beleg-Datenfluss',
            href: '/features/warenwirtschaft-autoteilhandel',
          },
          {
            label: 'OE-Ermittlung per lizenziertem Herstellerkatalog – exakte Teile-Identifikation',
            href: '/features/oem-ermittlung',
          },
          {
            label: 'WhatsApp-Bot: aus der Kundenanfrage wird ein revisionssicher erfasster Auftrag',
            href: '/features/whatsapp-bot',
          },
          {
            label: 'Funktionsvergleich: kfz-spezifisch statt generisch',
            href: '/vergleich',
          },
          {
            label: 'Unverbindliches Beratungsgespräch zur TSE- und Kassen-Einrichtung',
            href: '/#beratung',
          },
        ],
      },
      {
        type: 'h2',
        text: 'Was Sie jetzt konkret prüfen sollten',
      },
      {
        type: 'p',
        text: 'Compliance ist kein Einmalprojekt, sondern ein Dauerzustand. Die folgende Kurz-Checkliste hilft, den eigenen Stand realistisch einzuschätzen – mit dem klaren Vorbehalt, dass die Bewertung im Einzelfall Ihrem Steuerberater obliegt:',
      },
      {
        type: 'ol',
        items: [
          'Betreiben Sie an der Theke eine elektronische Kasse? Dann muss eine zertifizierte TSE nach §146a AO angebunden und dem Finanzamt gemeldet sein.',
          'Können Sie auf Knopfdruck einen DSFinV-K-Export für eine Kassen-Nachschau liefern?',
          'Sind Ihre Rechnungen festgeschrieben, fortlaufend nummeriert und unveränderbar archiviert (GoBD)?',
          'Können Sie E-Rechnungen nach EN 16931 empfangen und – mindestens vorbereitend – als ZUGFeRD oder XRechnung versenden?',
          'Läuft der DATEV-Export sauber im EXTF-Format mit SKR03 oder SKR04 an Ihre Kanzlei?',
          'Existiert eine aktuelle Verfahrensdokumentation, die Ihren Beleg- und Datenfluss beschreibt?',
        ],
      },
      {
        type: 'p',
        text: 'Partsunion deckt die softwareseitigen Bausteine dieser Liste branchengerecht ab – von der GoBD-Festschreibung über DSFinV-K und die E-Rechnung bis zur DATEV-Schnittstelle. Die organisatorischen Pflichten (Meldung, Verfahrensdokumentation, steuerliche Würdigung Ihrer Einzelfälle) bleiben in Ihrer Verantwortung. Nutzen Sie das Beratungsgespräch, um Ihren konkreten Theken- und Buchhaltungs-Workflow durchzusprechen. Und noch einmal als klarer Hinweis: Dieser Artikel vermittelt allgemeine Orientierung und ersetzt keine individuelle Steuer- oder Rechtsberatung.',
      },
      {
        type: 'linklist',
        text: 'Amtliche Quellen und weiterführende Informationen',
        links: [
          {
            label: '§ 146a AO: elektronische Aufzeichnungssysteme',
            href: 'https://www.gesetze-im-internet.de/ao_1977/__146a.html',
          },
          {
            label: 'BMF: Fragen und Antworten zur E-Rechnung',
            href: 'https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Brauche ich im Autoteilehandel zwingend eine TSE-Kasse?',
        a: 'Nur, wenn Sie an der Theke ein elektronisches Aufzeichnungssystem im Sinne des §146a AO einsetzen – also eine Registrierkasse oder ein kassenähnliches PC-/Tablet-System. Dann ist eine zertifizierte technische Sicherheitseinrichtung (TSE) Pflicht. Eine generelle Registrierkassenpflicht gibt es in Deutschland nicht: Wer eine offene Ladenkasse führt, braucht keine TSE, muss die Kassenführung aber trotzdem GoBD-konform und nachvollziehbar dokumentieren. Die Bewertung Ihres Einzelfalls sollte Ihr Steuerberater vornehmen.',
      },
      {
        q: 'Was ist der Unterschied zwischen ZUGFeRD und XRechnung?',
        a: 'Beide sind E-Rechnungsformate nach der europäischen Norm EN 16931. XRechnung ist ein reines, strukturiertes XML-Format und im öffentlichen Auftragswesen (B2G) bereits Pflicht. ZUGFeRD ist ein Hybridformat: ein PDF für das menschliche Auge mit eingebettetem, maschinenlesbarem XML. ZUGFeRD eignet sich für gemischte Empfängerkreise, XRechnung für rein behördliche oder strikt strukturierte Verarbeitung. Partsunion kann beide Formate im EN-16931-Profil erzeugen.',
      },
      {
        q: 'Was ist DSFinV-K und wann brauche ich den Export?',
        a: 'Die DSFinV-K ist das standardisierte Format, in dem Kassendaten bei einer Kassen-Nachschau oder Betriebsprüfung an die Finanzverwaltung herausgegeben werden müssen. Der Prüfer erwartet einen strukturierten, maschinenlesbaren Export aller Einzelvorgänge statt einer PDF-Zusammenfassung. Sie benötigen ihn also spätestens, wenn das Finanzamt prüft – Partsunion erzeugt diesen Export, damit die Daten im geforderten Schema sofort bereitstehen.',
      },
      {
        q: 'Gilt die E-Rechnungs-Pflicht auch für meinen Teilehandel?',
        a: 'Im inländischen B2B-Geschäft besteht seit dem 1. Januar 2025 die Pflicht, E-Rechnungen nach EN 16931 empfangen und verarbeiten zu können – das betrifft auch den Verkauf an Werkstätten und gewerbliche Kunden. Für den verpflichtenden Versand gelten gestaffelte Übergangsfristen bis 2027/2028 je nach Unternehmensgröße. Eine reine PDF gilt nicht mehr als E-Rechnung. Welche Frist konkret für Sie greift, klärt Ihr Steuerberater.',
      },
    ],
  },
  {
    meta: {
      slug: 'foto-wareneingang-retoure-lager-ki',
      title: 'Foto-Wareneingang & Retoure per Foto: KI im Autoteile-Lager',
      description:
        'KI-Foto-Wareneingang und Retoure per Foto im Teilelager: Abgleich mit Bestellung, Reklamation aus Foto, weniger Phantombestand, ehrliche ATP-Verfügbarkeit.',
      excerpt:
        'Wie KI-gestützter Foto-Wareneingang und Retoure per Foto die Erfassung im Autoteilelager beschleunigen, Phantombestand reduzieren und die ATP-Verfügbarkeit ehrlich halten.',
      category: 'Ratgeber',
      readingMinutes: 7,
      keywords: [
        'Foto-Wareneingang',
        'Retoure per Foto',
        'Wareneingang Autoteile',
        'KI Lager Kfz-Teile',
        'Retourenmanagement Autoteile',
      ],
      publishedAt: '2026-06-20',
      updatedAt: '2026-06-20',
    },
    blocks: [
      {
        type: 'p',
        text: 'Wer im Autoteilehandel ein Lager führt, kennt die beiden Engpässe genau: Wareneingang und Retoure. An der Rampe stapeln sich Pakete von verschiedenen Lieferanten, Lieferscheine stimmen nicht immer mit der Bestellung überein, und bei Rücksendungen muss jemand entscheiden, ob die Bremsscheibe in den Bestand zurückgeht, an den Lieferanten reklamiert oder verschrottet wird. Genau hier setzt der KI-gestützte Foto-Wareneingang an: Statt jede Position manuell abzutippen, fotografieren Sie Ware, Lieferschein oder Etikett, und das System gleicht automatisch mit der offenen Bestellung ab. Dieser Praxis-Ratgeber zeigt, wie Foto-Wareneingang und Retoure per Foto die Erfassung im Teilelager beschleunigen, Phantombestand reduzieren und die ATP-Verfügbarkeit ehrlich halten.',
      },
      {
        type: 'h2',
        text: 'Foto-Wareneingang Autoteile: warum der klassische Wareneingang ausbremst',
      },
      {
        type: 'p',
        text: 'Der manuelle Wareneingang im Autoteilelager ist fehleranfällig, weil mehrere Quellen aufeinandertreffen: die Bestellung im System, der gedruckte Lieferschein des Lieferanten, das Teile-Etikett mit OE- oder Hersteller-Nummer und die physische Ware selbst. Wird eine Position falsch oder gar nicht eingebucht, entsteht Phantombestand. Das System zeigt dann Teile als verfügbar, die real nicht im Regal liegen, oder umgekehrt. Im Theken- und WhatsApp-Verkauf führt das zu Zusagen, die nicht gehalten werden können.',
      },
      {
        type: 'p',
        text: 'Typische Reibungspunkte, die sich in fast jedem Teilelager wiederfinden:',
      },
      {
        type: 'ul',
        items: [
          'Mengenabweichungen: bestellt 10, geliefert 8, eingebucht 10 - der Rest fehlt unbemerkt.',
          'Falsche oder vertauschte Artikel, weil Hersteller-Nummern sich nur in einer Ziffer unterscheiden.',
          'Transportschäden, die beim Einbuchen übersehen und erst beim Kunden auffallen.',
          'Doppelerfassung, wenn zwei Mitarbeitende dieselbe Lieferung anfassen.',
          'Verzögerte Buchung, sodass die Verfügbarkeit für Stunden oder Tage nicht stimmt.',
        ],
      },
      {
        type: 'h2',
        text: 'Foto-Wareneingang: Erfassen statt Abtippen',
      },
      {
        type: 'p',
        text: 'Beim Foto-Wareneingang fotografieren Mitarbeitende am Tablet oder Smartphone die eingehende Ware beziehungsweise den Lieferschein. Die KI liest Etiketten und Belege aus und schlägt den Abgleich mit der offenen Bestellung vor. Statt Positionen einzeln einzutippen, bestätigen oder korrigieren Sie nur noch das, was das System bereits erkannt hat. Das verkürzt die Erfassung pro Lieferung und senkt die Zahl der Übertragungsfehler.',
      },
      {
        type: 'p',
        text: 'In Partsunion ist der Foto-Wareneingang Teil der branchenspezifischen Warenwirtschaft und arbeitet auf demselben zentralen Bestands-Ledger wie Verkauf und Finanzen. So läuft der Ablauf in der Praxis:',
      },
      {
        type: 'ol',
        items: [
          'Lieferung aufnehmen: Foto vom Lieferschein und gegebenenfalls von einzelnen Teilen oder Etiketten.',
          'KI-Auslesung: Hersteller-/OE-Nummern, Mengen und Lieferantenbezug werden vorgeschlagen.',
          'Abgleich mit Bestellung: Das System matcht die erkannten Positionen gegen die offene Bestellung und markiert Abweichungen in Menge oder Artikel.',
          'Bestätigen und buchen: Geprüfte Positionen gehen in den Bestand, Abweichungen werden sichtbar dokumentiert.',
          'Fitment und Identität: Bei Bedarf werden KFZ-Fitment, Charge oder Seriennummer mitgeführt.',
        ],
      },
      {
        type: 'p',
        text: 'Der entscheidende Punkt für den Wareneingang im Autoteilehandel ist der direkte Abgleich mit der Bestellung. Stimmt etwas nicht, fällt es beim Einbuchen auf und nicht erst beim Kunden. Weil die Buchung sofort auf das gemeinsame Ledger schlägt, bleibt die Verfügbarkeit aktuell.',
      },
      {
        type: 'h2',
        text: 'Retoure per Foto: Reklamation aus dem Foto-Abgleich',
      },
      {
        type: 'p',
        text: 'Retourenmanagement im Autoteilehandel ist heikel, weil eine Rücksendung selten ein einfacher Vorgang ist. Ist das Teil unbenutzt und wiederverkäuflich? Ist es das Teil, das ursprünglich geliefert wurde, oder hat der Kunde ein falsches Altteil zurückgeschickt? Liegt ein Transport- oder Materialschaden vor, der gegenüber dem Lieferanten reklamiert werden muss? Retoure per Foto bildet diesen Entscheidungspfad ab, statt ihn auf Zuruf zu erledigen.',
      },
      {
        type: 'p',
        text: 'Im Tablet-Flow von Partsunion wird die zurückkommende Ware fotografiert und mit dem ursprünglichen Vorgang abgeglichen. Aus diesem Foto-Abgleich lässt sich eine Lieferanten-Reklamation ableiten, wenn die Ware fehlerhaft oder nicht bestellkonform war. So vermeiden Sie zwei klassische Fehler: das voreilige Zurückbuchen beschädigter Ware in den verkäuflichen Bestand und die Reklamation, die später nicht belegbar ist.',
      },
      {
        type: 'quote',
        text: 'Der wichtigste Effekt einer sauberen Retoure ist nicht die Gutschrift, sondern dass kein beschädigtes Teil unbemerkt wieder als verfügbar im Bestand landet.',
      },
      {
        type: 'p',
        text: 'Praktischer Nutzen von Retoure per Foto im Überblick:',
      },
      {
        type: 'ul',
        items: [
          'Dokumentierter Zustand: Das Foto belegt den Zustand bei Rückeingang.',
          'Bestandskonsistenz: Wiederverkäufliche Ware geht zurück in den Bestand, defekte nicht.',
          'Lieferanten-Reklamation: Aus dem Abgleich entsteht ein nachvollziehbarer Reklamationsvorgang.',
          'Altteilpfand: Pfandrückläufe werden umsatzsteuerlich korrekt behandelt.',
        ],
      },
      {
        type: 'h2',
        text: 'ATP und gemeinsame Datenbasis gegen Phantombestand',
      },
      {
        type: 'p',
        text: 'Ob Verkauf, Lager und Buchhaltung dieselbe Wahrheit sehen, entscheidet sich an einer Frage: Wird jede Bewegung sofort und einmalig auf einer Datenbasis gebucht? Partsunion führt ein zentrales Bestands-Ledger mit ATP-Reservierungen (Available to Promise). Available to Promise bedeutet, dass die zusagbare Menge nicht nur den physischen Bestand zeigt, sondern bereits reservierte Mengen abzieht. Verkaufen Sie über Theke oder WhatsApp-Bot, wird reserviert; kommt Ware über den Foto-Wareneingang herein, steigt die verfügbare Menge.',
      },
      {
        type: 'p',
        text: 'Weil Wareneingang und Retoure auf dasselbe Ledger schlagen, gibt es keine zweite Bestandswelt, die nachgepflegt werden müsste. Das ist der strukturelle Grund, warum Foto-Wareneingang Phantombestand reduziert: Die Erfassung ist die Buchung. Zur Einordnung gehört Ehrlichkeit über den Funktionsumfang: Eine Anbindung an externe Verkaufskanäle wie Marktplatz- und Shop-Sync (zum Beispiel eBay) sowie die Großhändler-Direktbestellung sind bei Partsunion in Entwicklung und nicht Teil des aktuellen Funktionsumfangs. Die intern konsistente Bestandsführung über das gemeinsame Ledger ist hingegen live.',
      },
      {
        type: 'h2',
        text: 'KI im Lager für Kfz-Teile richtig einführen',
      },
      {
        type: 'p',
        text: 'KI im Lager für Kfz-Teile entfaltet ihren Wert nur, wenn der Prozess sauber aufgesetzt ist. Die Technik liest Etiketten und Belege, aber die Verantwortung für die Buchung bleibt beim Menschen. Bewährt hat sich ein pragmatisches Vorgehen:',
      },
      {
        type: 'ol',
        items: [
          'Stammdaten zuerst: Saubere Hersteller-/OE-Nummern und gepflegte Lieferantenbestellungen sind die Grundlage für einen guten Abgleich.',
          'Foto-Disziplin: Etikett und Lieferschein gut ausgeleuchtet und vollständig fotografieren, das erhöht die Erkennungsqualität.',
          'Abweichungen ernst nehmen: Markierte Mengen- oder Artikelabweichungen immer klären, bevor gebucht wird.',
          'Rollen klären: Wer bucht Wareneingang, wer entscheidet über Retouren? Über das rollenbasierte Rechtemodell sauber trennen.',
          'Mit einem Lieferanten starten: Erst einen Lieferantenfluss stabilisieren, dann ausrollen.',
        ],
      },
      {
        type: 'p',
        text: 'Zur Einordnung gegenüber generischen ERP-Systemen: Lösungen wie weclapp, Xentral oder JTL sind leistungsfähig, aber generisch und nicht kfz-spezifisch. Sie kennen weder KFZ-Fitment noch OE-Logik noch die §25a-Differenzbesteuerung von Haus aus. Eine branchenspezifische Plattform für den Autoteilehandel bildet diese Eigenheiten direkt ab, was für Wareneingang und Retoure mit ihren teilebezogenen Entscheidungen den Unterschied macht.',
      },
      {
        type: 'p',
        text: 'Ergebniszahlen lassen sich seriös nur als Modellrechnung formulieren: Wer pro Lieferung mehrere Positionen nicht mehr abtippt und Abweichungen sofort statt beim Kunden bemerkt, spart Erfassungszeit und Folgekosten aus Fehlbuchungen. Den konkreten Zielwert sollten Sie an Ihrem eigenen Liefer- und Retourenvolumen rechnen.',
      },
      {
        type: 'linklist',
        links: [
          {
            label: 'Branchen-Warenwirtschaft für den Autoteilehandel im Detail',
            href: '/features/warenwirtschaft-autoteilhandel',
          },
          {
            label: 'Retourenmanagement und Lieferanten-Reklamation per Foto',
            href: '/features/retourenmanagement',
          },
          {
            label: 'Bestandssynchronisation und ATP-Verfügbarkeit',
            href: '/features/bestandssynchronisation',
          },
          {
            label: 'Checkliste Warenwirtschaft im Autoteilehandel',
            href: '/blog/warenwirtschaft-autoteilhandel-checkliste',
          },
        ],
      },
      {
        type: 'p',
        text: 'Hinweis: Soweit in diesem Beitrag steuerliche Aspekte wie Altteilpfand oder die §25a-Differenzbesteuerung berührt werden, gilt: Dieser Beitrag ersetzt keine Steuer- oder Rechtsberatung.',
      },
    ],
    faqs: [
      {
        q: 'Wie funktioniert der Foto-Wareneingang im Autoteilelager?',
        a: 'Mitarbeitende fotografieren am Tablet oder Smartphone den Lieferschein und bei Bedarf einzelne Teile oder Etiketten. Die KI liest Hersteller-/OE-Nummern und Mengen aus und gleicht sie mit der offenen Bestellung ab. Sie bestätigen oder korrigieren nur noch die erkannten Positionen, danach werden sie direkt auf das zentrale Bestands-Ledger gebucht. So entfällt das manuelle Abtippen, und Abweichungen fallen sofort auf.',
      },
      {
        q: 'Was bedeutet Retoure per Foto und wie hilft sie bei Reklamationen?',
        a: 'Bei der Retoure per Foto wird die zurückkommende Ware fotografiert und mit dem ursprünglichen Vorgang abgeglichen. Aus diesem Foto-Abgleich lässt sich eine Lieferanten-Reklamation ableiten, wenn die Ware fehlerhaft oder nicht bestellkonform war. Wiederverkäufliche Ware geht zurück in den Bestand, defekte nicht, und der Zustand bei Rückeingang ist dokumentiert.',
      },
      {
        q: 'Wie reduziert das System Phantombestand?',
        a: 'Verkauf, Lager und Finanzen arbeiten auf einem zentralen Bestands-Ledger mit ATP-Reservierungen. Wareneingang und Retoure schlagen sofort und einmalig auf dieselbe Datenbasis, sodass die Erfassung zugleich die Buchung ist. Es gibt keine zweite Bestandswelt, die nachgepflegt werden müsste, wodurch die verfügbare Menge aktuell bleibt und Abweichungen früh sichtbar werden.',
      },
      {
        q: 'Eignet sich ein generisches ERP wie weclapp, Xentral oder JTL für den Autoteilehandel?',
        a: 'Diese Systeme sind leistungsfähig, aber generisch und nicht kfz-spezifisch. KFZ-Fitment, OE-Logik und die §25a-Differenzbesteuerung bilden sie nicht von Haus aus ab. Für Wareneingang und Retoure mit ihren teilebezogenen Entscheidungen ist eine branchenspezifische Plattform für den Autoteilehandel meist die passendere Grundlage.',
      },
    ],
  },
  {
    meta: {
      slug: 'b2b-kundenportal-autoteilhandel-aufbauen',
      title: 'B2B-Kundenportal für Autoteilehändler: So bauen Sie es auf',
      description:
        'Leitfaden zum Aufbau eines White-Label B2B-Kundenportals für Autoteile: kundenspezifische Preise ohne Preis-Leck, Self-Service-Rechnungen, eigene Domain.',
      excerpt:
        'Wie Sie ein White-Label-B2B-Kundenportal aufbauen, das Werkstatt-Stammkunden bindet, mit serverseitigen Preisen, Self-Service-Belegen und einer ehrlichen Verbindlichkeitsgrenze.',
      category: 'Ratgeber',
      readingMinutes: 7,
      keywords: [
        'B2B Kundenportal Autoteile',
        'Werkstatt Bestellportal',
        'Kundenportal Großhandel',
        'White-Label Kundenportal',
        'kundenspezifische Preise',
      ],
      publishedAt: '2026-06-20',
      updatedAt: '2026-06-20',
    },
    blocks: [
      {
        type: 'p',
        text: 'Werkstatt-Stammkunden bestellen anders als Laufkundschaft. Sie kennen ihre Konditionen, brauchen wiederkehrend dieselben Teile und erwarten, dass Sie ihre Sonderpreise im Schlaf parat haben. Ein B2B Kundenportal für Autoteile bündelt genau diese Beziehung an einem Ort: Der Kunde meldet sich an, sieht seine kundenspezifischen Preise, ruft alte Rechnungen als PDF ab und stellt Anfragen ohne Telefonschleife. Dieser Leitfaden zeigt Ihnen Schritt für Schritt, wie Sie ein White-Label-Bestellportal aufbauen, welche Bausteine wirklich zählen und wo die ehrlichen Grenzen liegen, damit Sie keine Erwartungen wecken, die Ihre Warenwirtschaft nicht hält.',
      },
      {
        type: 'h2',
        text: 'Warum ein B2B Kundenportal für Autoteile Stammkunden bindet',
      },
      {
        type: 'p',
        text: 'Der Wert eines B2B Kundenportals liegt nicht im Online-Shop-Glanz, sondern in der Reibungslosigkeit für Bestandskunden. Eine Werkstatt, die ihre letzten Bestellungen, offene Posten und individuellen Preise jederzeit selbst einsehen kann, ruft seltener an, reklamiert weniger und wechselt seltener den Lieferanten. Self-Service ist hier kein Sparzwang, sondern Bindung: Wer den Vorgang selbst steuert, fühlt sich ernst genommen.',
      },
      {
        type: 'p',
        text: 'Im Großhandel mit Autoteilen kommt ein Faktor hinzu, den generische Portale ignorieren: Preise sind vertraulich und kundenindividuell. Werkstatt A zahlt andere Konditionen als Flotte B. Ein Werkstatt-Bestellportal, das diese Logik sauber abbildet, ist ein echter Wettbewerbsvorteil gegenüber Telefon- und E-Mail-Bestellungen.',
      },
      {
        type: 'ul',
        items: [
          'Weniger Rückfragen: Der Kunde sieht Preis, Verfügbarkeitshinweis und Belege selbst, statt anzurufen.',
          'Höhere Wechselhürde: Wer sein Bestellarchiv und seine Konditionen bei Ihnen liegen hat, bleibt.',
          'Professionelles Auftreten: Eine eigene Domain und Ihr Logo wirken wie ein eigenständiges System, nicht wie ein gemietetes Tool.',
          'Entlastete Theke: Routineanfragen verlagern sich in den Self-Service, Ihr Team konzentriert sich auf Beratung.',
        ],
      },
      {
        type: 'h2',
        text: 'Kundenspezifische Preise serverseitig auflösen: kein Preis-Leck',
      },
      {
        type: 'p',
        text: 'Der heikelste Punkt eines B2B-Portals sind die kundenspezifischen Preise. Wird die Preislogik im Browser oder über eine offene Schnittstelle berechnet, kann ein technisch versierter Kunde fremde Konditionen oder Ihre Einkaufsmargen auslesen. Das ist das klassische Preis-Leck, und es ist überraschend verbreitet.',
      },
      {
        type: 'p',
        text: 'Die saubere Lösung: Preise werden ausschließlich serverseitig aufgelöst, gebunden an die authentifizierte Kundennummer. Der Browser bekommt nur den fertigen Preis für diesen einen Kunden zu sehen, nie die Logik dahinter und nie fremde Staffeln. Im Partsunion-Kundenportal ist genau das der Mechanismus: Der Login erfolgt über Token beziehungsweise Magic-Link, die Preise werden serverseitig anhand des Kundenkontos berechnet, sodass strukturell kein Preis-Leck entstehen kann.',
      },
      {
        type: 'quote',
        text: 'Faustregel: Wenn ein Preis im Browser berechnet werden kann, kann er auch ausgelesen werden. Verlagern Sie jede Preislogik auf den Server.',
      },
      {
        type: 'h2',
        text: 'Self-Service für Rechnungen und PDF richtig umsetzen',
      },
      {
        type: 'p',
        text: 'Nach dem Preis ist der Belegabruf die zweitwichtigste Funktion. Werkstätten brauchen ihre Rechnungen für die eigene Buchhaltung, oft Monate später. Ein Portal, in dem der Kunde seine Rechnungen selbst als PDF herunterlädt, spart Ihrem Team das ständige Heraussuchen und Nachsenden.',
      },
      {
        type: 'p',
        text: 'Wichtig ist die formale Korrektheit der Belege. In Deutschland gilt seit dem 1. Januar 2025 die Pflicht, E-Rechnungen bei inländischen B2B-Umsätzen empfangen zu können. Die Pflicht zur Ausstellung greift schrittweise über Übergangsfristen: Sie laufen je nach Unternehmensgröße bis Ende 2026 beziehungsweise für kleinere Unternehmen bis Ende 2027, ab 2028 ist die E-Rechnung im inländischen B2B-Bereich grundsätzlich verpflichtend. Maßgebliche Formate nach EN 16931 sind ZUGFeRD (hybrides PDF mit eingebettetem XML) und XRechnung (reines XML). Ein Kundenportal sollte deshalb keine selbstgebauten PDFs ausspielen, sondern dieselben Belege, die Ihre Finanzbuchhaltung erzeugt.',
      },
      {
        type: 'ul',
        items: [
          'Belegarchiv pro Kundennummer: nur eigene Rechnungen, keine fremden Dokumente.',
          'Echte Belege statt Kopien: dasselbe PDF, das auch im System und gegebenenfalls als ZUGFeRD oder XRechnung vorliegt.',
          'Differenzbesteuerung beachten: Bei Paragraf 25a UStG wird nur die Marge besteuert, es gibt keinen offenen Umsatzsteuerausweis, und der gesetzlich vorgeschriebene Pflichthinweis muss auf der Rechnung stehen, also auch im Portal-Beleg.',
          'Klare Status: Welche Rechnung ist offen, welche bezahlt? Transparenz reduziert Mahn-Nachfragen.',
        ],
      },
      {
        type: 'p',
        text: 'Dieser Beitrag ersetzt keine Steuer- oder Rechtsberatung. Die konkrete Behandlung Ihrer Einzelfälle, etwa bei Differenzbesteuerung oder grenzüberschreitenden Lieferungen, klären Sie bitte mit Ihrer Steuerberatung.',
      },
      {
        type: 'h2',
        text: 'White-Label und eigene Domain: das Portal sieht aus wie Ihres',
      },
      {
        type: 'p',
        text: 'Ein White-Label Kundenportal trägt Ihr Logo, Ihre Farben und vor allem Ihre eigene Domain. Für den Werkstattkunden entsteht der Eindruck eines eigenständigen Systems Ihres Hauses, nicht eines fremden Dienstleisters. Das stärkt Marke und Vertrauen und macht den Lieferantenwechsel emotional teurer.',
      },
      {
        type: 'p',
        text: 'Technisch heißt das: Sie hinterlegen eine eigene (Sub-)Domain, die TLS-Zertifikate werden für diese Domain ausgestellt, und das Erscheinungsbild ist anpassbar. Im Partsunion-Portal ist die eigene Domain Teil des White-Label-Konzepts. Achten Sie beim Aufbau darauf, dass die Mandanten-Isolation strikt bleibt: Jeder Händler und jeder Kunde sieht ausschließlich eigene Daten, abgesichert über Rollen, Audit-Log und eine Datenhaltung mit Verschlüsselung at-rest sowie TLS im Transport.',
      },
      {
        type: 'h2',
        text: 'Die ehrliche Grenze: Portal-Bestellung ist eine unverbindliche Anfrage',
      },
      {
        type: 'p',
        text: 'Hier liegt der Punkt, an dem viele Anbieter zu viel versprechen. Eine Bestellung über das Kundenportal ist im Partsunion-System eine unverbindliche Anfrage. Sie bucht keinen Bestand und reserviert keine Ware automatisch. Das ist bewusst so gebaut, denn im Autoteilehandel hängt die echte Verfügbarkeit an Ihrem zentralen Bestands-Ledger, an ATP-Reservierungen und oft an Lieferantenketten, die ein Portal nicht in Echtzeit garantieren kann.',
      },
      {
        type: 'p',
        text: 'Kommunizieren Sie das offen gegenüber Ihren Kunden. Eine Portal-Anfrage landet bei Ihnen, Ihr Team prüft Verfügbarkeit und Preis und bestätigt verbindlich. Das verhindert Überverkäufe und enttäuschte Werkstätten. Funktionen wie Versand-Tracking, Großhändler-Direktbestellung oder Marktplatz-Sync sind in Entwicklung und sollten heute nicht als verfügbar versprochen werden.',
      },
      {
        type: 'ul',
        items: [
          'Portal-Bestellung gleich strukturierte Anfrage, nicht automatische Buchung.',
          'Verbindlichkeit entsteht erst durch Ihre Bestätigung nach Bestandsprüfung.',
          'Bestandsführung bleibt in der Warenwirtschaft, nicht im Portal.',
          'Roadmap-Funktionen klar als geplant kennzeichnen, nie als live.',
        ],
      },
      {
        type: 'h2',
        text: 'Aufbau in der Praxis: branchenspezifisch statt generisch',
      },
      {
        type: 'p',
        text: 'Generische ERP- und Shop-Systeme wie weclapp, Xentral oder JTL bieten Portal- oder Shopbausteine, sind aber nicht kfz-spezifisch. Im Autoteilehandel zählen Details: OE-Ermittlung über lizenzierte Herstellerkataloge statt Web-Scraping, KFZ-Fitment, Differenzbesteuerung nach Paragraf 25a, Altteilpfand umsatzsteuerlich korrekt und kundenindividuelle Preise mit Margenschutz. Ein Portal, das auf einer branchenspezifischen Datenbasis aus Verkauf, Lager und Finanzen aufsetzt, spart Ihnen den Eigenbau dieser Logik.',
      },
      {
        type: 'p',
        text: 'Pragmatische Reihenfolge für den Aufbau: zuerst sicherer Login und serverseitige Preisauflösung, dann Belegarchiv mit korrekten PDFs, danach White-Label mit eigener Domain, zuletzt der Anfrage-Workflow mit klarer Verbindlichkeitsgrenze. Wenn Sie das Kundenportal an Ihre bestehende Warenwirtschaft und Finanzbuchhaltung anbinden, bleibt eine einzige Datenbasis statt mehrerer Insellösungen.',
      },
      {
        type: 'linklist',
        links: [
          {
            label: 'White-Label B2B-Kundenportal von Partsunion im Detail',
            href: '/features/b2b-kundenportal-white-label',
          },
          {
            label: 'Warenwirtschaft für den Autoteilehandel',
            href: '/features/warenwirtschaft-autoteilhandel',
          },
          {
            label: 'GoBD, TSE, ZUGFeRD und DATEV im Überblick',
            href: '/features/gobd-tse-zugferd-datev',
          },
          {
            label: 'Partsunion im Vergleich zu generischen ERP-Systemen',
            href: '/vergleich',
          },
          {
            label: 'Persönliche Beratung anfragen',
            href: '/#beratung',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Was ist ein B2B-Kundenportal für Autoteile?',
        a: 'Es ist eine geschützte Online-Plattform, über die Ihre Werkstatt- und Großhandelskunden sich anmelden, ihre kundenspezifischen Preise sehen, Rechnungen als PDF abrufen und Bestellanfragen stellen. Im Partsunion-Portal ist eine solche Bestellung eine unverbindliche Anfrage, die keinen Bestand bucht; verbindlich wird sie erst nach Ihrer Prüfung und Bestätigung.',
      },
      {
        q: 'Wie verhindert man, dass Kunden fremde oder eigene Einkaufspreise sehen?',
        a: 'Indem alle Preise ausschließlich serverseitig anhand der authentifizierten Kundennummer aufgelöst werden. Der Browser erhält nur den fertigen Preis für genau diesen Kunden, nie die Preislogik und nie fremde Konditionen. So entsteht strukturell kein Preis-Leck. Wird ein Preis dagegen im Browser berechnet, kann er ausgelesen werden.',
      },
      {
        q: 'Können Kunden über das Portal ihre Rechnungen als PDF abrufen?',
        a: 'Ja. Ein gutes Werkstatt-Bestellportal bietet ein Belegarchiv pro Kundennummer mit Download der eigenen Rechnungen als PDF. Wichtig ist, dass es sich um die echten, formal korrekten Belege handelt, bei E-Rechnungen im Format ZUGFeRD oder XRechnung nach EN 16931, und bei Differenzbesteuerung nach Paragraf 25a UStG mit dem vorgeschriebenen Pflichthinweis. Dieser Beitrag ersetzt keine Steuer- oder Rechtsberatung.',
      },
      {
        q: 'Lässt sich das Portal unter eigener Domain und mit eigenem Logo betreiben?',
        a: 'Ja, das ist der Kern eines White-Label-Kundenportals. Es läuft unter Ihrer eigenen Domain mit TLS-Zertifikat und trägt Ihr Erscheinungsbild, sodass es für den Kunden wie Ihr eigenes System wirkt. Die Mandanten-Isolation stellt dabei sicher, dass jeder Kunde nur seine eigenen Daten sieht.',
      },
    ],
  },
  {
    meta: {
      slug: 'e-rechnungspflicht-zugferd-xrechnung-handel',
      title: 'E-Rechnungspflicht: ZUGFeRD & XRechnung im Handel (2025/2026)',
      description:
        'E-Rechnungspflicht 2025 im B2B: Empfangspflicht, Übergangsfristen bis 2028, ZUGFeRD vs. XRechnung und was Autoteilehändler jetzt vorbereiten sollten.',
      excerpt:
        'Was die B2B-E-Rechnungspflicht seit 2025 bedeutet, welche Fristen bis 2028 gelten und wie ZUGFeRD und XRechnung den Autoteilehandel betreffen.',
      category: 'Compliance',
      readingMinutes: 7,
      keywords: [
        'E-Rechnungspflicht 2025',
        'ZUGFeRD Pflicht',
        'XRechnung B2B',
        'E-Rechnung Autoteilehandel',
        'EN 16931',
      ],
      publishedAt: '2026-06-20',
      updatedAt: '2026-09-04',
    },
    blocks: [
      {
        type: 'p',
        text: 'Seit dem 1. Januar 2025 gilt in Deutschland eine neue Realität für jede B2B-Rechnung: Wer Geschäftskunden im Inland beliefert, muss elektronische Rechnungen empfangen und verarbeiten können. Die Pflicht zum Ausstellen folgt stufenweise bis 2028. Für den Autoteilehandel mit seinen vielen Werkstatt- und Händlerkunden ist das kein Randthema, sondern betrifft den täglichen Rechnungsfluss. Dieser Beitrag ordnet die E-Rechnungspflicht 2025 ein, erklärt den Unterschied zwischen ZUGFeRD und XRechnung und zeigt, was Sie als Händler jetzt konkret vorbereiten sollten. Dieser Beitrag ersetzt keine Steuer- oder Rechtsberatung.',
      },
      {
        type: 'h2',
        text: 'Was die E-Rechnungspflicht 2025 wirklich bedeutet',
      },
      {
        type: 'p',
        text: 'Die allgemeinen Fristen haben Ausnahmen, unter anderem für bestimmte steuerfreie Umsätze, Kleinbetragsrechnungen und Rechnungen von Kleinunternehmern. Empfangsfähigkeit und Pflicht zum Ausstellen sind getrennt zu prüfen. Maßgeblich für den konkreten Fall sind die gesetzlichen Regeln und die aktuelle BMF-Auslegung.',
      },
      {
        type: 'p',
        text: 'Mit dem Wachstumschancengesetz wurde die obligatorische elektronische Rechnung für inländische B2B-Umsätze eingeführt. Wichtig ist die Unterscheidung, die viele Betriebe übersehen: Empfangspflicht und Ausstellungspflicht starten nicht zum gleichen Zeitpunkt. Die Empfangspflicht gilt nach dem allgemeinen gesetzlichen Rahmen bereits seit dem 1. Januar 2025 und ohne Übergangsfrist.',
      },
      {
        type: 'p',
        text: 'Konkret heißt das: Stellt Ihnen ein Lieferant oder Großhändler eine strukturierte E-Rechnung aus, müssen Sie diese annehmen und verarbeiten können. Das frühere Zustimmungserfordernis ist für echte E-Rechnungen entfallen. Sie können die Annahme einer korrekten E-Rechnung also in der Regel nicht mehr ablehnen, nur weil Ihnen das alte PDF lieber wäre.',
      },
      {
        type: 'ul',
        items: [
          'Empfangen können ist Pflicht, nicht Kür: ein funktionierender Eingangskanal für strukturierte Rechnungen muss vorhanden sein.',
          'Eine reine PDF-Rechnung per E-Mail gilt rechtlich nicht mehr automatisch als E-Rechnung im neuen Sinne, sondern als sonstige Rechnung.',
          'Die korrekte Aufbewahrung des strukturierten Datenteils gehört zur revisionssicheren Archivierung nach GoBD.',
        ],
      },
      {
        type: 'h2',
        text: 'Der Zeitplan: Übergangsfristen bis 2028',
      },
      {
        type: 'p',
        text: 'Beim Ausstellen von E-Rechnungen gibt es Übergangsfristen, gestaffelt nach Vorjahresumsatz. Die folgenden Eckpunkte fassen den allgemeinen gesetzlichen Rahmen zusammen; prüfen Sie Ihre individuelle Situation mit Ihrem Steuerberater.',
      },
      {
        type: 'ul',
        items: [
          'Seit 01.01.2025: Empfangspflicht für inländische B2B-Umsätze.',
          'Bis 31.12.2026: Für die Übergangsregelung sind weiterhin Papierrechnungen möglich. Andere elektronische Formate wie ein einfaches PDF setzen die Zustimmung des Empfängers voraus.',
          'Ab 01.01.2027: Unternehmen mit einem Vorjahresumsatz von mehr als 800.000 Euro müssen E-Rechnungen ausstellen.',
          'Bis 31.12.2027: kleinere Unternehmen (Vorjahresumsatz bis 800.000 Euro) dürfen noch alte Formate nutzen.',
          'Ab 01.01.2028: das Ausstellen strukturierter E-Rechnungen ist im inländischen B2B grundsätzlich verpflichtend.',
        ],
      },
      {
        type: 'quote',
        text: 'Faustregel für Händler: Empfangen sollten Sie heute können. Ausstellen müssen Sie je nach Umsatzschwelle und Jahr. Wer frühzeitig umstellt, vermeidet Hektik kurz vor der Frist.',
      },
      {
        type: 'h2',
        text: 'ZUGFeRD vs. XRechnung: zwei Formate, eine Norm',
      },
      {
        type: 'p',
        text: 'Beide in Deutschland gängigen Formate beruhen auf der europäischen Norm EN 16931. Der Unterschied liegt in der Form, nicht im rechtlichen Status.',
      },
      {
        type: 'ul',
        items: [
          'ZUGFeRD ist ein Hybridformat: eine menschenlesbare PDF mit eingebettetem XML-Datensatz. Sie sehen wie gewohnt ein PDF, die Maschine liest das XML im Inneren.',
          'XRechnung ist ein reines XML-Format ohne sichtbares Bild. Es wird vor allem im öffentlichen Auftragswesen (B2G) verlangt und ist auch im B2B zulässig.',
          'Als E-Rechnung anerkannt sind unter anderem XRechnung und ZUGFeRD ab Version 2.0.1, wobei die Profile MINIMUM und BASIC-WL die Anforderungen einer vollständigen E-Rechnung in der Regel nicht erfüllen.',
        ],
      },
      {
        type: 'p',
        text: 'Für den E-Rechnung-Autoteilehandel ist ZUGFeRD in der Praxis oft der bequemere Einstieg: Ihre Kunden sehen weiterhin ein gewohntes PDF, während der strukturierte XML-Teil die Anforderungen erfüllt. XRechnung im B2B brauchen Sie verlässlich dann, wenn ein Geschäftspartner oder eine öffentliche Stelle ausdrücklich das reine XML fordert. Ein gutes System beherrscht beide Wege.',
      },
      {
        type: 'h2',
        text: 'Branchenfallen: Differenzbesteuerung und Altteilpfand',
      },
      {
        type: 'p',
        text: 'Der Autoteilehandel hat steuerliche Besonderheiten, die in der strukturierten E-Rechnung sauber abgebildet werden müssen, sonst wird aus einem Formatwechsel ein Korrektheitsproblem.',
      },
      {
        type: 'ul',
        items: [
          'Differenzbesteuerung nach Paragraf 25a UStG: Bei Gebrauchtteilen wird nur die Marge besteuert, ein offener Umsatzsteuerausweis entfällt, und ein Pflichthinweis gehört auf die Rechnung. Im EN-16931-Datensatz muss das korrekt codiert sein.',
          'Altteilpfand: Die umsatzsteuerliche Behandlung des Pfands muss korrekt auf der Rechnung und im Datensatz erscheinen.',
          'Mengen, Brutto- und Nettobeträge müssen konsistent sein, damit der maschinell lesbare Teil mit dem Sichtteil übereinstimmt.',
        ],
      },
      {
        type: 'p',
        text: 'Partsunion verbindet Rechnungen, Artikel und Auftrag und bietet E-Rechnungs- sowie DATEV-Exportfunktionen. Der tatsächlich benötigte Formatumfang, steuerliche Sonderfälle und vorbereitete Kassenanbindungen werden bei der Einrichtung geprüft. Die Bezeichnung einer Funktion ersetzt keine Prüfung des konkreten Belegs und der betrieblichen Abläufe.',
      },
      {
        type: 'h2',
        text: 'Was Händler jetzt konkret tun sollten',
      },
      {
        type: 'p',
        text: 'Die allgemeine E-Rechnungspflicht lässt sich in handhabbare Schritte zerlegen. Diese Reihenfolge hat sich bewährt:',
      },
      {
        type: 'ol',
        items: [
          'Empfang sicherstellen: Prüfen Sie, ob Ihr System eingehende ZUGFeRD- und XRechnung-Dateien lesen, anzeigen und revisionssicher ablegen kann.',
          'Eigene Ausstellung vorbereiten: Klären Sie, ab welchem Stichtag Sie nach Umsatzschwelle ausstellen müssen, und richten Sie ZUGFeRD oder XRechnung ein.',
          'Stammdaten prüfen: Leitweg-IDs, Steuernummern, USt-IdNr. und Bankdaten sollten vollständig sein, sonst scheitert die strukturierte Validierung.',
          'Sonderfälle abbilden: Differenzbesteuerung, Altteilpfand und gegebenenfalls Reverse-Charge im EU-Geschäft korrekt codieren.',
          'Archivierung klären: Den strukturierten Datensatz GoBD-konform aufbewahren, nicht nur das Sicht-PDF.',
          'Steuerberater einbinden: Lassen Sie Ihren konkreten Stichtag und Ihre Formatwahl fachlich bestätigen.',
        ],
      },
      {
        type: 'p',
        text: 'Wenn Ihre Rechnungsstellung heute noch über generische Lösungen oder Insellisten läuft, lohnt der Blick auf eine kfz-spezifische Plattform. Generische ERP- und Warenwirtschaftssysteme wie weclapp, Xentral oder JTL sind nicht speziell auf den Autoteilehandel zugeschnitten. Gerade die steuerlichen Sonderfälle der Branche entscheiden aber darüber, ob Ihre E-Rechnung nicht nur das richtige Format, sondern auch den richtigen Inhalt hat.',
      },
      {
        type: 'linklist',
        links: [
          {
            label: 'GoBD, TSE, ZUGFeRD und DATEV bei Partsunion',
            href: '/features/gobd-tse-zugferd-datev',
          },
          {
            label: 'ERP für den Autoteilehandel',
            href: '/features/erp-autoteilehandel',
          },
          {
            label: 'Warenwirtschaft für den Autoteilehandel',
            href: '/features/warenwirtschaft-autoteilhandel',
          },
          {
            label: 'Unverbindliche Beratung anfragen',
            href: '/#beratung',
          },
        ],
      },
      {
        type: 'linklist',
        text: 'Amtliche Quellen und weiterführende Informationen',
        links: [
          {
            label: 'BMF: E-Rechnung, Übergangsregeln und Ausnahmen',
            href: 'https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Seit wann gilt die E-Rechnungspflicht im B2B?',
        a: 'Nach dem allgemeinen gesetzlichen Rahmen gilt die Empfangspflicht für strukturierte E-Rechnungen für inländische B2B-Umsätze seit dem 1. Januar 2025, und zwar ohne Übergangsfrist. Unternehmer müssen seitdem E-Rechnungen empfangen und verarbeiten können. Die Pflicht zum Ausstellen folgt stufenweise mit Übergangsfristen bis 2028. Dieser Beitrag ersetzt keine Steuer- oder Rechtsberatung.',
      },
      {
        q: 'Was ist der Unterschied zwischen ZUGFeRD und XRechnung?',
        a: 'XRechnung ist ein reiner XML-Datensatz ohne sichtbares Layout, während ZUGFeRD ein Hybridformat aus menschenlesbarem PDF und eingebettetem XML ist. Beide beruhen auf der europäischen Norm EN 16931. Als E-Rechnung anerkannt sind unter anderem XRechnung und ZUGFeRD ab Version 2.0.1, wobei die Profile MINIMUM und BASIC-WL die Anforderungen einer vollständigen E-Rechnung in der Regel nicht erfüllen.',
      },
      {
        q: 'Muss ich als kleiner Autoteilehändler ab 2025 E-Rechnungen ausstellen?',
        a: 'Empfangen können müssen Sie nach dem allgemeinen Rahmen seit dem 1. Januar 2025. Beim Ausstellen gelten Übergangsfristen nach Umsatz: Unternehmen mit mehr als 800.000 Euro Vorjahresumsatz müssen ab 2027 ausstellen, kleinere Betriebe dürfen noch bis Ende 2027 alte Formate nutzen, ab 2028 ist das Ausstellen grundsätzlich verpflichtend. Klären Sie Ihren konkreten Stichtag mit Ihrem Steuerberater. Dieser Beitrag ersetzt keine Steuer- oder Rechtsberatung.',
      },
      {
        q: 'Wie bilde ich die Differenzbesteuerung in einer E-Rechnung ab?',
        a: 'Bei der Differenzbesteuerung nach Paragraf 25a UStG wird nur die Marge besteuert, ein offener Umsatzsteuerausweis entfällt und ein Pflichthinweis muss auf der Rechnung stehen. Im strukturierten EN-16931-Datensatz muss das korrekt codiert sein. Partsunion bildet diesen Fall durchgängig ab, vom Artikel-Flag bis zum Pflichthinweis auf dem PDF. Lassen Sie die steuerliche Behandlung im Zweifel von Ihrem Steuerberater prüfen.',
      },
    ],
  },
  {
    meta: {
      slug: 'differenzbesteuerung-25a-gebrauchtteile',
      title: '§25a Differenzbesteuerung bei Gebrauchtteilen: der Praxis-Leitfaden',
      description:
        'Differenzbesteuerung §25a für Gebrauchtteile: Wann anwendbar, Margenbesteuerung, kein offener USt-Ausweis, Pflichthinweis und Abgrenzung zur Regelbesteuerung.',
      excerpt:
        'Wann die Differenzbesteuerung nach §25a UStG für Gebrauchtteile gilt, wie die Margenbesteuerung funktioniert und was beim USt-Ausweis und Pflichthinweis auf der Rechnung zu beachten ist.',
      category: 'Compliance',
      readingMinutes: 7,
      keywords: [
        'Differenzbesteuerung §25a',
        'Gebrauchtteile Steuer',
        'Autoteile Differenzbesteuerung',
        'Gebrauchtwaren USt',
        'Margenbesteuerung',
        '§25a UStG Rechnung',
        'Regelbesteuerung Abgrenzung',
      ],
      publishedAt: '2026-06-20',
      updatedAt: '2026-09-04',
    },
    blocks: [
      {
        type: 'p',
        text: 'Wer im Kfz-Handel mit Gebrauchtteilen, ausgebauten Altteilen oder geprüften Tauschteilen handelt, kennt das Problem: Eine gebrauchte Lichtmaschine kaufen Sie häufig von einer Privatperson, einem Schrottplatz oder einem nicht vorsteuerabzugsberechtigten Verkäufer ein. Es liegt also keine abziehbare Vorsteuer vor. Würden Sie diesen Artikel anschließend mit voller Umsatzsteuer auf den Verkaufspreis weiterverkaufen, würden Sie auf einer Ware Steuer abführen, deren Einkauf Ihnen keinen Vorsteuerabzug gebracht hat. Genau hier setzt die Differenzbesteuerung nach § 25a UStG an: Besteuert wird nicht der volle Verkaufspreis, sondern nur Ihre Marge, also die Differenz zwischen Verkaufs- und Einkaufspreis. Dieser Praxis-Leitfaden ordnet ein, wann die Differenzbesteuerung §25a anwendbar ist, wie die Margenbesteuerung funktioniert, was auf der Rechnung stehen muss und wo die Abgrenzung zur Regelbesteuerung verläuft. Wichtig vorab: Dieser Beitrag ersetzt keine Steuer- oder Rechtsberatung.',
      },
      {
        type: 'h2',
        text: 'Was die Differenzbesteuerung §25a für Gebrauchtteile bedeutet',
      },
      {
        type: 'p',
        text: 'Die Differenzbesteuerung ist eine Sonderform der Umsatzbesteuerung für sogenannte Wiederverkäufer, die bewegliche körperliche Gegenstände gewerblich kaufen und wieder verkaufen. Der Gesetzgeber will damit eine systematische Doppel- oder Überbesteuerung vermeiden, die entstünde, wenn ein bereits final verbrauchsbesteuerter Gegenstand erneut in voller Höhe besteuert würde. Statt den gesamten Verkaufspreis als Bemessungsgrundlage heranzuziehen, wird bei der Margenbesteuerung nur die Differenz zwischen Verkaufspreis und Einkaufspreis als steuerpflichtiger Umsatz behandelt. Aus dieser Differenz wird die enthaltene Umsatzsteuer herausgerechnet.',
      },
      {
        type: 'p',
        text: 'Ein vereinfachtes Rechenbeispiel als reine Modellrechnung: Sie kaufen einen gebrauchten Turbolader für 100 Euro von einer Privatperson und verkaufen ihn für 250 Euro. Bei der Regelbesteuerung würden 250 Euro die Basis bilden. Bei der Gebrauchtwaren-USt nach §25a ist nur die Differenz von 150 Euro die Bruttobemessungsgrundlage; daraus wird die Umsatzsteuer herausgerechnet. Der Unterschied in der Steuerlast kann je nach Marge erheblich sein. Die konkrete Berechnung im Einzelfall sollten Sie mit Ihrer Steuerberatung abstimmen.',
      },
      {
        type: 'h2',
        text: 'Wann ist die Autoteile-Differenzbesteuerung überhaupt anwendbar?',
      },
      {
        type: 'p',
        text: 'Die Differenzbesteuerung ist kein Wahlrecht, das man pauschal über das ganze Sortiment legt. Sie greift nur, wenn bestimmte Voraussetzungen für den jeweiligen Einkauf erfüllt sind. Im Kern muss der Einkauf der Ware ohne offen ausgewiesene und abziehbare Vorsteuer erfolgt sein. Typische Konstellationen im Teilehandel:',
      },
      {
        type: 'ul',
        items: [
          'Sie kaufen das Gebrauchtteil von einer Privatperson, die keine Umsatzsteuer ausweisen kann.',
          'Sie kaufen von einem Kleinunternehmer, der nach § 19 UStG keine Umsatzsteuer ausweist.',
          'Sie kaufen von einem anderen Händler, der seinerseits bereits die Differenzbesteuerung angewendet hat.',
          'Sie kaufen von einem nicht vorsteuerabzugsberechtigten Verkäufer ohne offenen Steuerausweis.',
        ],
      },
      {
        type: 'p',
        text: 'Es muss sich außerdem um einen beweglichen körperlichen Gegenstand handeln, der innerhalb der EU erworben wurde und kein Edelmetall oder Edelstein ist. Für den Kfz-Teilehandel ist das in der Regel unproblematisch: Eine gebrauchte Lichtmaschine, ein ausgebauter Motor oder eine Tür sind klassische Anwendungsfälle. Entscheidend ist die Frage am Wareneingang, nicht erst am Verkaufstag. Deshalb sollte die Eigenschaft fester Bestandteil des Artikelstamms sein und nicht spontan an der Theke entschieden werden.',
      },
      {
        type: 'quote',
        text: 'Die zentrale Frage ist nicht, ob ein Teil gebraucht ist, sondern wie es eingekauft wurde. Über die Anwendbarkeit von §25a entscheidet der Einkauf ohne Vorsteuerabzug, nicht der Zustand der Ware.',
      },
      {
        type: 'h2',
        text: 'Margenbesteuerung in der Praxis: kein offener USt-Ausweis',
      },
      {
        type: 'p',
        text: 'Die wohl wichtigste und am häufigsten übersehene Regel: Bei der Differenzbesteuerung darf auf der Rechnung keine Umsatzsteuer offen ausgewiesen werden. Es gibt also keine separate Zeile mit Nettobetrag, 19 Prozent USt und Bruttobetrag, wie Sie es von der Regelbesteuerung kennen. Der Grund ist konsequent: Da nur die Marge besteuert wird, wäre ein offener Steuerausweis auf den vollen Verkaufspreis sachlich falsch und würde dem Käufer einen unzutreffenden Vorsteuerabzug ermöglichen.',
      },
      {
        type: 'p',
        text: 'Weist ein Händler bei einem differenzbesteuerten Verkauf trotzdem Umsatzsteuer offen aus, schuldet er diese zusätzlich ausgewiesene Steuer regelmäßig nach § 14c UStG, auch wenn sie eigentlich nicht angefallen wäre. Das ist einer der teuersten und vermeidbarsten Fehler in diesem Bereich. Praktisch bedeutet das für Ihren Verkaufsprozess:',
      },
      {
        type: 'ol',
        items: [
          'Differenzbesteuerte Artikel sind im System klar als solche gekennzeichnet, bevor sie verkauft werden.',
          'Auf der Rechnung erscheint nur der Bruttoverkaufspreis ohne separaten Steuerausweis.',
          'Die Steuer wird intern aus der Marge herausgerechnet und nicht auf der Kundenrechnung aufgeschlüsselt.',
          'Differenzbesteuerte und regelbesteuerte Positionen werden nicht innerhalb derselben Position vermischt.',
        ],
      },
      {
        type: 'h2',
        text: 'Pflichthinweis auf der Rechnung und Gebrauchtwaren-USt korrekt kennzeichnen',
      },
      {
        type: 'p',
        text: 'Eine differenzbesteuerte Rechnung ist ohne den vorgeschriebenen Pflichthinweis formal unvollständig. § 14a UStG verlangt eine eindeutige Kennzeichnung der angewandten Sonderregelung. Je nach Sachverhalt lauten die Hinweise sinngemäß Gebrauchtgegenstände/Sonderregelung beziehungsweise die entsprechende Formulierung für Kunstgegenstände, Sammlungsstücke und Antiquitäten. Für den Teilehandel ist die Gebrauchtgegenstände-Variante der Regelfall. Der Hinweis muss auf der Rechnung stehen, nicht nur in den Allgemeinen Geschäftsbedingungen oder im Hinterkopf.',
      },
      {
        type: 'p',
        text: 'Hinzu kommt die Aufzeichnungspflicht: Einkaufspreis, Verkaufspreis und die daraus ermittelte Marge müssen je Gegenstand nachvollziehbar dokumentiert sein, damit eine Betriebsprüfung die Bemessungsgrundlage prüfen kann. Wer Gebrauchtteile bündelt oder pauschaliert, sollte die hierfür geltenden besonderen Voraussetzungen vorab mit der Steuerberatung klären. In Partsunion ist die Differenzbesteuerung als Artikel-Flag hinterlegt: Markierte Artikel erzeugen automatisch das Theke-Badge, die Margenberechnung, den korrekten Code in der ZUGFeRD-E-Rechnung und den vorgeschriebenen Pflichthinweis auf dem PDF. So wird der manuelle, fehleranfällige Schritt reduziert, ohne dass die fachliche Verantwortung für den Einzelfall an die Software übergeht.',
      },
      {
        type: 'linklist',
        text: 'Tiefer einsteigen:',
        links: [
          {
            label:
              'GoBD, TSE, DSFinV-K, ZUGFeRD und DATEV im Detail – die Compliance-Funktionen von Partsunion',
            href: '/features/gobd-tse-zugferd-datev',
          },
          {
            label: 'GoBD, TSE und Kasse im Autohandel – der Compliance-Leitfaden für die Theke',
            href: '/blog/gobd-tse-kasse-autohandel',
          },
          {
            label: 'Warenwirtschaft für den Autoteilehandel: Bestand, Fitment und Beleg-Datenfluss',
            href: '/features/warenwirtschaft-autoteilhandel',
          },
          {
            label: 'Unverbindliches Beratungsgespräch zur Steuer- und Beleg-Konfiguration',
            href: '/#beratung',
          },
        ],
      },
      {
        type: 'h2',
        text: 'Abgrenzung zur Regelbesteuerung: wann §25a nicht gilt',
      },
      {
        type: 'p',
        text: 'Nicht jedes Teil im Lager fällt unter die Autoteile-Differenzbesteuerung. Die Abgrenzung zur Regelbesteuerung entscheidet sich am Einkauf. Sobald Sie Ware mit offen ausgewiesener und abziehbarer Vorsteuer einkaufen, etwa Neuteile vom Großhändler oder ein gebrauchtes Teil von einem Händler, der regelbesteuert mit USt-Ausweis verkauft, ist die Regelbesteuerung anzuwenden. Dann weisen Sie wieder ganz normal Umsatzsteuer auf den vollen Verkaufspreis aus und können die gezahlte Vorsteuer geltend machen.',
      },
      {
        type: 'ul',
        items: [
          'Neuteile vom vorsteuerpflichtigen Lieferanten: Regelbesteuerung, voller USt-Ausweis.',
          'Gebrauchtteil von Privat oder Kleinunternehmer ohne USt: Differenzbesteuerung möglich.',
          'Innergemeinschaftlicher Erwerb mit Erwerbsbesteuerung: in der Regel keine Differenzbesteuerung.',
          'Mischbetrieb: beide Verfahren parallel, aber sauber pro Artikel und Beleg getrennt geführt.',
        ],
      },
      {
        type: 'p',
        text: 'Gerade Mischbetriebe, also Händler mit Neu- und Gebrauchtteilen im selben Sortiment, brauchen ein System, das beide Verfahren artikelgenau auseinanderhält. Wird ein differenzbesteuerter mit einem regelbesteuerten Artikel auf einer Rechnung kombiniert, müssen die Positionen getrennt behandelt und korrekt ausgewiesen werden. Eine kfz-spezifische Plattform, die Beleg, Buchung und Export aus einer Datenbasis erzeugt, reduziert das Risiko, dass diese Trennung beim Fakturieren verloren geht. Generische, nicht kfz-spezifische Systeme wie weclapp, Xentral oder JTL bilden Steuerlogik ebenfalls ab, bringen die Branchen-Spezialfälle des Teilehandels aber nicht zwingend von Haus aus mit.',
      },
      {
        type: 'p',
        text: 'Software bleibt dabei Werkzeug, kein Ersatz für fachliche Prüfung. Ob die Differenzbesteuerung für einen konkreten Einkauf zulässig ist, ob die Pauschalmargen-Voraussetzungen erfüllt sind und wie Sonderfälle wie Cross-Border-Konstellationen zu behandeln sind, gehört in die Hände Ihrer Steuerberatung. Dieser Beitrag ersetzt keine Steuer- oder Rechtsberatung; verbindliche Auskünfte erteilt Ihr Steuerberater oder das Finanzamt.',
      },
      {
        type: 'linklist',
        text: 'Amtliche Quellen und weiterführende Informationen',
        links: [
          {
            label: '§ 25a UStG: Voraussetzungen der Differenzbesteuerung',
            href: 'https://www.gesetze-im-internet.de/ustg_1980/__25a.html',
          },
          {
            label: '§ 14a UStG: zusätzliche Rechnungsangaben',
            href: 'https://www.gesetze-im-internet.de/ustg_1980/__14a.html',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Wann darf ich die Differenzbesteuerung nach §25a UStG anwenden?',
        a: 'Wenn Sie als gewerblicher Wiederverkäufer einen beweglichen körperlichen Gegenstand ohne abziehbare Vorsteuer eingekauft haben, also typischerweise von einer Privatperson, einem Kleinunternehmer nach § 19 UStG oder einem Händler, der selbst differenzbesteuert verkauft hat. Entscheidend ist der Einkauf ohne offenen Steuerausweis, nicht allein der Umstand, dass das Teil gebraucht ist. Die Anwendbarkeit im konkreten Fall sollten Sie mit Ihrer Steuerberatung klären; dieser Beitrag ersetzt keine Steuer- oder Rechtsberatung.',
      },
      {
        q: 'Darf ich auf einer differenzbesteuerten Rechnung Umsatzsteuer ausweisen?',
        a: 'Nein. Bei der Differenzbesteuerung wird nur die Marge besteuert, deshalb darf auf der Rechnung keine Umsatzsteuer offen ausgewiesen werden. Es gibt keine Zeile mit Netto, USt-Satz und Brutto. Weisen Sie trotzdem Umsatzsteuer aus, schulden Sie diese in der Regel zusätzlich nach § 14c UStG. Stattdessen ist der Bruttobetrag ohne Steuerausweis anzugeben und der vorgeschriebene Pflichthinweis aufzuführen.',
      },
      {
        q: 'Welcher Pflichthinweis muss auf einer §25a-Rechnung für Gebrauchtteile stehen?',
        a: 'Nach § 14a UStG ist die angewandte Sonderregelung eindeutig zu kennzeichnen, im Teilehandel regelmäßig sinngemäß als Gebrauchtgegenstände/Sonderregelung. Der Hinweis muss auf der Rechnung selbst erscheinen, nicht nur in den AGB. In Partsunion erzeugt das Artikel-Flag für die Differenzbesteuerung diesen Pflichthinweis automatisch auf dem PDF und setzt den passenden Code in der ZUGFeRD-E-Rechnung.',
      },
      {
        q: 'Was ist der Unterschied zwischen Differenzbesteuerung und Regelbesteuerung bei Autoteilen?',
        a: 'Bei der Regelbesteuerung wird der volle Verkaufspreis besteuert und die gezahlte Vorsteuer ist abziehbar; das gilt für Neuteile und für Gebrauchtteile, die mit offenem USt-Ausweis eingekauft wurden. Bei der Differenzbesteuerung wird nur die Marge besteuert, ein Vorsteuerabzug aus dem Einkauf entfällt und es erfolgt kein offener Steuerausweis. Die Abgrenzung entscheidet sich am Einkauf des jeweiligen Teils, nicht pauschal am Sortiment.',
      },
    ],
  },
];

export const getGeneratedArticle = (slug: string): GeneratedArticle | undefined =>
  generatedArticles.find((a) => a.meta.slug === slug);
