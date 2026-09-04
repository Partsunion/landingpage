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
      'Partsunion richtet sich an Autoteilehändler und Autoverwerter mit Neu-, Gebraucht- oder Mischsortiment. Besonders sinnvoll ist es, wenn WhatsApp-Anfragen, Fahrzeugdaten, Bestand und Belege heute in unterschiedlichen Programmen liegen. Im Beratungsgespräch prüfen wir gemeinsam, welche Abläufe und Funktionen zu deinem Betrieb passen.',
  },
  {
    question: 'Was übernimmt der WhatsApp-Bot?',
    answer:
      'Der Bot nimmt Teileanfragen auf, führt Kunden-, Fahrzeug- und Teileinformationen zusammen und bereitet die weitere Bearbeitung vor. Dein Team arbeitet mit dem Vorgang im gemeinsamen System weiter. Welche Antworten, Rückfragen und Übergaben für deinen Betrieb sinnvoll sind, stimmen wir mit dir ab.',
  },
  {
    question: 'Was macht der Betriebsassistent?',
    answer:
      'Der Betriebsassistent hilft deinem Team bei Fragen zu Bestand, Aufträgen, Retouren, offenen Forderungen und Aufgaben. Er verbindet freigegebene Betriebsdaten mit dem jeweiligen Vorgang und kann nächste Arbeitsschritte vorbereiten. Verbindliche Bestellungen und finanzwirksame Schritte bleiben an Rechte und Bestätigungen gebunden.',
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
      'Nein. Gemeinsam legen wir einen überschaubaren Einstieg fest, zum Beispiel Teileanfragen und Verkauf. Daten, Zuständigkeiten und Schulung werden dafür vorbereitet. Weitere Bereiche folgen nach dem vereinbarten Einführungsplan.',
  },
  {
    question: 'Welche Anbindungen sind für uns verfügbar?',
    answer:
      'Das prüfen wir mit deinen konkreten Lieferanten, Katalogen und Verkaufskanälen. Manche Funktionen benötigen einen eigenen Vertrag, eine technische Einrichtung oder eine Freischaltung. Zahlungsanbieter, Kassenanbindung und B2B-Portal werden deshalb vor dem Start ausdrücklich abgestimmt.',
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
          'Bedarf gemeinsam klären',
          'Im Beratungsgespräch sehen wir uns deinen Betrieb, deine Programme und einen typischen Teilevorgang an. Daraus entstehen ein passender Funktionsumfang und ein konkretes Angebot.',
        ],
        [
          'Daten und Team vorbereiten',
          'Wir prüfen die Datenübernahme, richten die vereinbarten Bereiche ein und gehen die Abläufe mit deinem Team durch.',
        ],
        [
          'Mit einem klaren Ablauf starten',
          'Wir stimmen den Start ab, klären offene Punkte und erweitern die Nutzung in den vereinbarten Schritten.',
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
