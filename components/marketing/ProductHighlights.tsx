import Link from 'next/link';
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  WalletCards,
  ScanLine,
  Smartphone,
  RotateCcw,
} from 'lucide-react';

export function ProductHighlights() {
  return (
    <div className="hu-topic-links">
      {[
        {
          icon: ScanLine,
          title: 'Automatische OE-Ermittlung',
          text: 'Fahrzeugschein auslesen, VIN decodieren und OE-Nummern ermitteln. Mit Nutzungsrechten für 56 Marken und 80 % weltweiter VIN-Decodierungsabdeckung.',
          href: '/loesungen/oe-ermittlung',
          label: 'Vom Fahrzeug zum passenden Teil',
        },
        {
          icon: MessageCircle,
          title: 'WhatsApp-Bot',
          text: 'Kunden schreiben im vertrauten Chat. Aus Nachrichten, Fotos und Rückfragen entsteht eine strukturierte Teileanfrage für dein Team.',
          href: '/whatsapp-bot',
          label: 'Vom Chat zum Vorgang',
        },
        {
          icon: Sparkles,
          title: 'Betriebsassistent',
          text: 'Fragen zu Aufträgen, Kunden und Beständen stellen. Zusammenhänge finden, Quellen ansehen und nächste Schritte kontrolliert vorbereiten.',
          href: '/betriebsassistent',
          label: 'Dein Assistent im Alltag',
        },
        {
          icon: WalletCards,
          title: 'Buchhaltung & Banking',
          text: 'Belege weiterführen, Bankumsätze zuordnen und Buchungsdaten vorbereiten. Mit nachvollziehbaren Verbindungen zum Tagesgeschäft.',
          href: '/buchhaltung-banking',
          label: 'Von der Rechnung zur Zahlung',
        },
        {
          icon: RotateCcw,
          title: 'Retouren & Reklamationen',
          text: 'Die Rückabwicklung automatisieren und mit dem ursprünglichen Auftrag verbinden. Ware, Nachweise, Prüfung und Gutschrift zusammenhalten.',
          href: '/loesungen/retouren',
          label: 'Auch nach dem Verkauf verbunden',
        },
        {
          icon: Smartphone,
          title: 'Partsunion Mobile App',
          text: 'Direkt am Fahrzeug, Artikel oder Lagerplatz arbeiten. Informationen mobil erfassen und im selben System weiterbearbeiten.',
          href: '/loesungen/haendler-app',
          label: 'Dein System unterwegs',
        },
      ].map(({ icon: Icon, title, text, href, label }) => (
        <article className="hu-topic-card" key={href}>
          <Icon aria-hidden="true" />
          <h3>{title}</h3>
          <p>{text}</p>
          <Link href={href} className="mk-link">
            {label} <ArrowRight aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );
}
