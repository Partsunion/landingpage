import Link from 'next/link';
import { ArrowRight, Boxes, Package } from 'lucide-react';

export const homeFaqs = [
  {
    question: 'Was verbindet Partsunion in einer All-in-One-Plattform?',
    answer:
      'Partsunion verbindet automatische OE-Ermittlung, WhatsApp-Bot, ERP, Warenwirtschaft, Kassensystem, Betriebsassistent, Buchhaltung, Banking, Retouren und Reklamationen. Die Mobile App ermöglicht die Arbeit unterwegs. Kunde, Fahrzeug, Artikel und Belege bleiben über die Arbeitsbereiche hinweg verknüpft.',
  },
  {
    question: 'Wie funktioniert die automatische OE-Ermittlung?',
    answer:
      'Partsunion liest Fahrzeugdaten aus dem Fahrzeugschein, decodiert die VIN und ermittelt OE-Nummern anhand von Fahrzeug, Teilebedarf und Katalogdaten. Partsunion hat Nutzungsrechte für 56 Marken und kann 80 % der weltweiten VINs decodieren. Die VIN-Abdeckung ist keine OE-Trefferquote. Bei offenen Ausstattungsvarianten fragt das System gezielt nach.',
  },
  {
    question: 'Passt Partsunion zu meinem Betrieb?',
    answer:
      'Partsunion richtet sich an Autoteilehändler und Autoverwerter mit Neu-, Gebraucht- oder Mischsortiment. Im Beratungsgespräch prüfen wir gemeinsam, welche Abläufe und Funktionen zu deinem Betrieb passen.',
  },
  {
    question: 'Was übernimmt der WhatsApp-Bot?',
    answer:
      'Der WhatsApp-Bot beantwortet Kundenanfragen automatisch, nimmt Texte, Sprachnachrichten und Fahrzeugscheine auf und führt Kunden-, Fahrzeug- und Teileinformationen zusammen. Er klärt fehlende Angaben, stößt die OE-Ermittlung an und antwortet mit passenden Artikeln, Preisen, Verfügbarkeit und Liefertermin. Aus der Auswahl entsteht im System ein Angebot, das der Kunde direkt bezahlen und bestellen kann. Auftrag und weitere Bearbeitung laufen ohne Neuerfassung in Partsunion weiter.',
  },
  {
    question: 'Was macht der Betriebsassistent?',
    answer:
      'Der Betriebsassistent kennt alle Daten und Zusammenhänge, die dein Betrieb in Partsunion verbindet: Artikel, Bestände, Kunden, Fahrzeuge, Angebote, Aufträge, Einkauf, Retouren, Reklamationen, Umsätze, offene Forderungen und Aufgaben. Er beantwortet Fragen zum gesamten Betrieb, priorisiert Handlungsbedarf, öffnet dynamisch die passende Maske und kann den nächsten Arbeitsschritt direkt vorbereiten. So wird er zum zentralen Wissens- und Arbeitsassistenten für deinen Teilehandel.',
  },
  {
    question: 'Was kostet Partsunion?',
    answer:
      'Der Preis hängt vom benötigten Funktionsumfang, den Nutzern und den gewünschten Anbindungen ab. Dazu können einmalige Aufwände für Datenübernahme und Einrichtung kommen. Nach der Abstimmung deines Bedarfs erhältst du ein konkretes Angebot mit getrennt ausgewiesenen Kosten.',
  },
  {
    question: 'Können wir unsere bisherigen Daten übernehmen?',
    answer:
      'Wir prüfen zuerst einen Beispielexport deines bisherigen Systems. Daraus klären wir, welche Kunden-, Artikel- und Bestandsdaten übernommen werden können, was bereinigt werden muss und welche Historie sinnvoll mitkommt. Der mögliche Umfang hängt von deinem bisherigen System ab.',
  },
  {
    question: 'Müssen wir den ganzen Betrieb auf einmal umstellen?',
    answer:
      'Ja, wir empfehlen die gemeinsame Umstellung der zusammenhängenden Arbeitsbereiche. Partsunion entfaltet seinen größten Nutzen, wenn Anfrage, OE-Ermittlung, Verkauf, Einkauf, Lager, Kasse und Belege vom Start an als durchgängige Prozesskette arbeiten. Dafür bereiten wir Daten, Anbindungen, Zuständigkeiten und Schulung gemeinsam vor und planen einen klaren Umstellungstermin für dein Team.',
  },
  {
    question: 'Welche Anbindungen sind für uns verfügbar?',
    answer:
      'Das prüfen wir mit deinen konkreten Lieferanten, Katalogen und Verkaufskanälen. Manche Funktionen benötigen eine technische Einrichtung oder eine Freischaltung. Zahlungsanbieter, Kassenanbindung und B2B-Portal werden deshalb vor dem Start ausdrücklich abgestimmt.',
  },
  {
    question: 'Wie vereinbare ich ein Beratungsgespräch?',
    answer:
      'Wähle einen freien Termin im Kalender und hinterlasse deine Kontaktdaten. Die Buchung wird direkt gespeichert. Du erhältst eine E-Mail mit Datum, Uhrzeit und Kalendereintrag. Im etwa 30-minütigen Gespräch klären wir deinen Bedarf, passende Funktionen, Einführung und Kosten. Das Gespräch ist unverbindlich.',
  },
];
export function ConsultationLink({
  label = 'Beratungsgespräch vereinbaren',
  href = '/beratung',
}: {
  label?: string;
  href?: string;
}) {
  return (
    <Link href={href} className="mk-button" data-track="Consultation CTA">
      {label}
      <ArrowRight aria-hidden="true" />
    </Link>
  );
}
// Keep existing page imports working while all conversion links lead to a consultation.
export const DemoLink = ConsultationLink;
export function AudienceLinks() {
  return (
    <div className="mk-audiences">
      <Link href="/plattform/neuteile" className="mk-audience">
        <Package aria-hidden="true" />
        <div>
          <strong>Ich handle mit Neuteilen</strong>
          <p>Teile finden, beschaffen und verkaufen.</p>
        </div>
        <ArrowRight aria-hidden="true" />
      </Link>
      <Link href="/plattform/gebrauchtteile" className="mk-audience">
        <Boxes aria-hidden="true" />
        <div>
          <strong>Ich handle mit Gebrauchtteilen</strong>
          <p>Gebrauchtteile erfassen, lagern und vermarkten.</p>
        </div>
        <ArrowRight aria-hidden="true" />
      </Link>
    </div>
  );
}
export function FAQ({ items = homeFaqs }: { items?: typeof homeFaqs }) {
  return (
    <div className="mk-faq">
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
export function Implementation() {
  return (
    <div className="mk-implementation">
      {[
        [
          'Die gesamte Prozesskette klären',
          'Im Beratungsgespräch sehen wir uns deinen Betrieb, deine Programme und den Ablauf von der Anfrage bis zu Belegen, Zahlung und Rückabwicklung an.',
        ],
        [
          'Daten, Anbindungen und Team vorbereiten',
          'Wir übernehmen die benötigten Daten, richten die verbundenen Arbeitsbereiche ein und trainieren dein Team am vollständigen Ablauf.',
        ],
        [
          'Den Betrieb gemeinsam umstellen',
          'Wir empfehlen einen koordinierten Umstellungstermin, damit Anfrage, OE-Ermittlung, Verkauf, Einkauf, Lager, Kasse und Belege vom Start an ineinandergreifen.',
        ],
      ].map(([title, text], index) => (
        <article key={title}>
          <span className="mk-number">0{index + 1}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}
export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="mk-breadcrumb" aria-label="Brotkrumennavigation">
      <Link href="/">Start</Link>
      {items.map((item, index) => (
        <span key={index} style={{ display: 'contents' }}>
          <span aria-hidden="true">/</span>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
