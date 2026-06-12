import { LucideIcon, FileText, Search, Smartphone, ShoppingCart, RefreshCw, Truck, TrendingUp, Clock, Zap, ShieldCheck, Globe, Users } from 'lucide-react';

export interface FeatureDetail {
    slug: string;
    title: string;
    description: string;
    icon: LucideIcon;
    heroImage?: string;
    features: string[];
    technicalDetails: string;
    benefit: string;
    category?: 'core' | 'value';
}

export const featureData: FeatureDetail[] = [
    // ============================================
    // EINWANDSBEHANDLUNG / VALUE PROPOSITIONS
    // ============================================
    {
        slug: 'skalierbarkeit',
        title: 'Skalierbarkeit ohne Kostenexplosion',
        description: 'Wachsen Sie mit Ihrem Geschäft ohne steigende Personalkosten. Unser KI-System skaliert automatisch.',
        icon: TrendingUp,
        features: [
            'Zuverlässige Performance auch bei hohen Anfragevolumen',
            'Gleichbleibende Qualität 365 Tage im Jahr',
            'Keine krankheits- oder urlaubsbedingten Ausfälle',
            'Keine Kosten für neue Mitarbeiter oder Büroflächen',
            'Automatische Lastverteilung bei Spitzenzeiten',
            'Konstante Bearbeitungszeit unabhängig vom Volumen'
        ],
        technicalDetails: 'Unsere Cloud-Infrastruktur nutzt Auto-Scaling und Load-Balancing, um bei steigender Nachfrage automatisch Kapazitäten bereitzustellen. Die KI-Modelle sind horizontal skalierbar und verarbeiten tausende Anfragen parallel.',
        benefit: 'Steigern Sie Ihren Umsatz ohne lineare Kostensteigerung. Während Ihre Konkurrenz bei Spitzenzeiten an Kapazitätsgrenzen stößt, liefern Sie weiterhin blitzschnelle Angebote.',
        category: 'value'
    },
    {
        slug: '24-7-einsatzbereit',
        title: '24/7 Einsatzbereit',
        description: 'Ihr digitaler Mitarbeiter kennt keine Öffnungszeiten. Bearbeiten Sie Anfragen rund um die Uhr.',
        icon: Clock,
        features: [
            'Umsatz auch außerhalb der Geschäftszeiten',
            'Automatische Angebotserstellung um 3 Uhr nachts',
            'Wochenend-Anfragen werden sofort bearbeitet',
            'Internationale Zeitzonen kein Problem',
            'Sofortige Reaktion auf jede Anfrage',
            'Kein Warten bis "jemand im Büro ist"'
        ],
        technicalDetails: 'Das System läuft auf EU-Cloud-Infrastruktur mit einem vertraglichen Ziel-SLA von 99,5 % im Jahresmittel (siehe AGB §4). Monitoring und automatisierte Neustarts sorgen für hohe Verfügbarkeit; geplante Wartungen werden vorab angekündigt.',
        benefit: 'Fangen Sie Leads ab, die bei der Konkurrenz ins Leere laufen. Werkstätten, die am Wochenende Teile brauchen, bekommen von Ihnen sofort ein Angebot.',
        category: 'value'
    },
    {
        slug: 'geschwindigkeit',
        title: 'Sekunden statt Minuten',
        description: 'Blitzschnelle Angebotserstellung mit paralleler Verarbeitung beliebig vieler Anfragen.',
        icon: Zap,
        features: [
            '3 Angebote pro Anfrage aus verschiedenen Preisgruppen',
            'Parallele Verarbeitung beliebig vieler Anfragen gleichzeitig',
            'Kürzere Antwortzeiten = Höhere Abschlussquote',
            'Keine Nacharbeit wegen Fehlangeboten',
            'Automatische Priorisierung nach Anfragewert',
            'Echtzeit-Bestandsprüfung inklusive'
        ],
        technicalDetails: 'Die KI nutzt optimierte Inference-Pipelines und Caching-Strategien. OEM-Matching erfolgt in Millisekunden durch Vektor-Datenbanken und vorberechnete Indizes.',
        benefit: 'Wer zuerst antwortet, gewinnt den Kunden. Mit Partsunion sind Sie immer schneller als die Konkurrenz und steigern so Ihre Abschlussquote drastisch.',
        category: 'value'
    },
    {
        slug: 'sinkende-retouren',
        title: 'Sinkende Retourenquote',
        description: 'Automatische Fahrzeugerkennung und OEM-Matching eliminieren menschliche Fehler.',
        icon: ShieldCheck,
        features: [
            'KI-gestützte OEM-Ermittlung ohne Tippfehler',
            'Automatische Fahrzeugerkennung aus Schein-Fotos',
            'Drastische Reduzierung der Retourenquote',
            'Keine Verwechslungen mehr bei ähnlichen Teilen',
            'Cross-Reference Prüfung auf Kompatibilität',
            'Weniger Reklamationen, mehr Kundenzufriedenheit'
        ],
        technicalDetails: 'Computer Vision extrahiert HSN, TSN und VIN mit hoher Genauigkeit. Ein mehrstufiges Validierungssystem prüft Kompatibilitäten gegen Teilekataloge und Hersteller-Datenbanken.',
        benefit: 'Jede Retoure kostet Zeit, Geld und Kundenvertrauen. Mit präziser Fahrzeugerkennung gehören falsche Teile der Vergangenheit an.',
        category: 'value'
    },
    {
        slug: 'sprachuebergreifend',
        title: 'Sprachübergreifend nutzbar',
        description: 'Automatische Spracherkennung und Verständnis von Sprachnachrichten und Mechaniker-Slang.',
        icon: Globe,
        features: [
            'Automatische Erkennung der Kundensprache',
            'Versteht Sprachnachrichten und Audio-Dateien',
            'Erkennt Mechaniker-Slang und Umgangssprache',
            '"Bremsklötze" wird als "Bremsbelagsatz" verstanden',
            'Mehrsprachige Antworten möglich',
            'Keine Kommunikationsbarrieren mehr'
        ],
        technicalDetails: 'Whisper-basierte Sprach-zu-Text Konvertierung kombiniert mit speziell trainiertem NLU-Modell für Automotive-Terminologie. Unterstützt Deutsch, Englisch, Türkisch, Polnisch, Russisch und weitere.',
        benefit: 'Erreichen Sie auch internationale Kunden und Mechaniker, die lieber Sprachnachrichten senden. Keine Sprachbarrieren, keine verlorenen Anfragen.',
        category: 'value'
    },
    {
        slug: 'team-entlastung',
        title: 'Entlastung des Teams',
        description: 'Wegfall gleichbleibender Routine. Fokus auf Beratung, Vertrieb und Kundenbindung.',
        icon: Users,
        features: [
            'Wegfall repetitiver Anfrage-Bearbeitung',
            'Kein Stress mehr bei hohen Anfragevolumen',
            'Mitarbeiter fokussieren auf komplexe Beratung',
            'Einfache Einarbeitung neuer Mitarbeiter',
            'Höhere Mitarbeiterzufriedenheit',
            'Mehr Zeit für echte Kundenbeziehungen'
        ],
        technicalDetails: 'Das System übernimmt 80% der Standardanfragen vollautomatisch. Komplexe Fälle werden intelligent an Menschen eskaliert mit vollständigem Kontext.',
        benefit: 'Ihre Mitarbeiter verbringen ihre Zeit mit wertschöpfenden Tätigkeiten statt stupider Dateneingabe. Zufriedenere Teams, besserer Service.',
        category: 'value'
    },

    // ============================================
    // CORE FEATURES
    // ============================================
    {
        slug: 'oem-ermittlung',
        title: 'KI-gestützte OEM Ermittlung',
        description: 'Nie wieder das falsche Teil bestellen. Unsere AI matcht Fahrzeugschein mit Herstellerdaten.',
        icon: Search,
        features: [
            'Scan von Fahrzeugscheinen (OCR)',
            'Abgleich mit Teilekatalogen und Hersteller-Datenbanken',
            'Erkennung von Baujahr-spezifischen Änderungen',
            'Cross-Reference auf Alternativ-Hersteller',
            'Automatische Preisgruppenzuordnung',
            'Kompatibilitätsprüfung in Echtzeit'
        ],
        technicalDetails: 'Wir nutzen Computer Vision, um HSN/TSN und FIN zu extrahieren. Ein proprietärer Algorithmus prüft dann Kompatibilitäten über Millionen von Datensätzen in Millisekunden.',
        benefit: 'Reduzieren Sie Ihre Retourenquote drastisch. Vertrauen Sie auf Daten statt Bauchgefühl.',
        category: 'core'
    },
    {
        slug: 'whatsapp-bot',
        title: '24/7 WhatsApp Autoteile-Bot',
        description: 'Ihr neuer Mitarbeiter, der nie schläft. Nimmt Anfragen entgegen und erstellt automatisch Angebote.',
        icon: Smartphone,
        features: [
            'Versteht Sprachnachrichten und Fotos',
            'Identifiziert Fahrzeug und gesuchtes Teil',
            'Sendet vollautomatisch Angebote',
            'Übergibt komplexe Fälle an Menschen',
            'Mehrsprachig einsetzbar',
            'WhatsApp Business API Integration'
        ],
        technicalDetails: 'Basierend auf LLMs (Large Language Models), die speziell auf KFZ-Teile trainiert wurden. Der Bot versteht Slang wie "Bremse vorne" genau so gut wie "Bremsbelagsatz Vorderachse".',
        benefit: 'Seien Sie für Ihre Kunden erreichbar, wenn die Konkurrenz schon geschlossen hat. Fangen Sie jeden Lead ab.',
        category: 'core'
    },
    {
        slug: 'automatische-rechnungserstellung',
        title: 'Automatische Rechnungserstellung',
        description: 'Vom Auftrag zur Rechnung in Sekunden. Fehlerfrei und Finanzamt-konform.',
        icon: FileText,
        features: [
            'Automatische Generierung als PDF',
            'Direkter Email-Versand an Kunden',
            'DATEV-Schnittstelle für den Steuerberater',
            'Autonome Stornorechnungen bei Retouren'
        ],
        technicalDetails: 'Unser System nutzt Templates, die Sie einmalig anpassen. Bei jeder Bestellung triggert der Status "Versendet" die PDF-Generierung. Die Dokumente werden revisionssicher archiviert.',
        benefit: 'Sparen Sie sich die Buchhaltung am Wochenende. Partsunion erledigt den Papierkram, während Sie verkaufen.',
        category: 'core'
    },
    {
        slug: 'bestellprozess',
        title: 'Automatisierter Bestellprozess',
        description: 'Von der Lagerlücke zur Nachbestellung ohne einen Mausklick.',
        icon: ShoppingCart,
        features: [
            'Automatische Bestellvorschläge bei Mindestbestand',
            'Preisvergleich bei angebundenen Lieferanten',
            'Direkte API-Bestellung bei Großhändlern',
            'Tracking-Updates für Ihre Kunden'
        ],
        technicalDetails: 'Unser Algorithmus analysiert Ihre Abverkaufsgeschwindigkeit und Lieferzeiten, um den optimalen Bestellzeitpunkt zu berechnen (Predictive Ordering).',
        benefit: 'Optimieren Sie Ihren Cashflow und vermeiden Sie "Out-of-Stock"-Situationen bei Schnelldrehern.',
        category: 'core'
    },
    {
        slug: 'bestandssynchronisation',
        title: 'Multi-Channel Warenbestand',
        description: 'Ein Lager, viele Verkaufskanäle. Synchronisation in Echtzeit.',
        icon: RefreshCw,
        features: [
            'Sync mit eBay, autoteile-markt.de, Daparto',
            'Vermeidung von Überverkäufen',
            'Zentrales Dashboard für alle Kanäle',
            'Priorisierung von Verkaufskanälen'
        ],
        technicalDetails: 'Wir nutzen Webhooks und APIs für Real-Time-Updates. Sobald ein Teil auf eBay verkauft wird, wird es im Shop gesperrt - und umgekehrt.',
        benefit: 'Verkaufen Sie überall, ohne den Überblick zu verlieren. Skalieren Sie Ihren Umsatz ohne Chaos.',
        category: 'core'
    },
    {
        slug: 'retourenmanagement',
        title: 'Smartes Retourenmanagement',
        description: 'Machen Sie aus Rücksendungen einen geordneten Prozess.',
        icon: Truck,
        features: [
            'QR-Code Retourenschein für Kunden',
            'Automatische Wiedereinlagerung im System',
            'Gutschrift-Erstellung auf Knopfdruck',
            'Analyse von Retourengründen'
        ],
        technicalDetails: 'Der Retourenprozess ist voll in die Warenwirtschaft integriert. Eingehende Retouren werden gescannt und sofort wieder dem verfügbaren Bestand zugebucht.',
        benefit: 'Verwandeln Sie den Frustfaktor Retoure in ein professionelles Kundenerlebnis.',
        category: 'core'
    }
];

// Helper to get only value propositions
export const getValuePropositions = () => featureData.filter(f => f.category === 'value');

// Helper to get only core features
export const getCoreFeatures = () => featureData.filter(f => f.category === 'core');
