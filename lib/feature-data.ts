import { LucideIcon, FileText, Search, Smartphone, ShoppingCart, RefreshCw, Truck, TrendingUp, Clock, Zap, ShieldCheck, Globe, Users, Landmark, Layers, Boxes } from 'lucide-react';

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
        title: 'Skalierbare Organisation',
        description: 'Standorte, Rollen und Arbeitsvolumen auf einer gemeinsamen Plattform organisieren.',
        icon: TrendingUp,
        features: [
            'Mandanten- und rollenbasierte Arbeitsplätze',
            'Zentrale Stamm- und Bewegungsdaten',
            'Arbeitsvorräte mit Status und Verantwortlichkeit',
            'Einheitliche Prozesse für mehrere Teams und Standorte',
            'Nachvollziehbare Freigaben und Änderungen',
            'Cloud-Betrieb mit überwachter Kapazität'
        ],
        technicalDetails: 'Die Plattform trennt Mandanten und Berechtigungen, verarbeitet Hintergrundaufgaben über Warteschlangen und kann Infrastrukturkapazität bedarfsgerecht erweitern. Verbindliche Leistungswerte werden für das jeweilige Betriebsmodell vereinbart.',
        benefit: 'Neue Mitarbeiter, Teams und Standorte arbeiten mit denselben Stammdaten, Rollen und kontrollierten Abläufen.',
        category: 'value'
    },
    {
        slug: '24-7-einsatzbereit',
        title: 'Betrieb & Self-Service',
        description: 'Digitale Eingangskanäle und das Kundenportal ergänzen die persönliche Betreuung.',
        icon: Clock,
        features: [
            'B2B-Portal für Belege und Bestellanfragen',
            'Digitale Anfragen werden zentral erfasst',
            'Arbeitsvorrat für die Bearbeitung zu Geschäftszeiten',
            'Status und Kontext bleiben vollständig erhalten',
            'Überwachung zentraler Dienste und Schnittstellen',
            'Betriebsmodell und Servicezeiten vertraglich definierbar'
        ],
        technicalDetails: 'Das System ist für EU-Cloud-Infrastruktur, Monitoring und automatisierte Neustarts vorbereitet. Ein verbindliches SLA wird erst im individuellen Vertrag auf Basis des freigegebenen Betriebsmodells vereinbart.',
        benefit: 'Kunden können Vorgänge digital anstoßen und Belege abrufen, ohne dass der ERP-Kern von einem einzelnen Kanal abhängt.',
        category: 'value'
    },
    {
        slug: 'geschwindigkeit',
        title: 'Effiziente Arbeitsabläufe',
        description: 'Weniger Mehrfacherfassung durch verbundene Stammdaten, Belege und Folgeprozesse.',
        icon: Zap,
        features: [
            'Fahrzeug- und Kundendaten im Verkaufsvorgang',
            'Artikelvergleich mit Preisen und Bestand',
            'Folgebelege übernehmen geprüfte Positionen',
            'Priorisierte Arbeitsvorräte statt verteilter Listen',
            'ATP-Prüfung und Reservierung im Verkaufsprozess',
            'Schnellzugriff auf relevante Geschäftsobjekte'
        ],
        technicalDetails: 'Suchindizes, Hintergrundverarbeitung und ein gemeinsames Objektmodell reduzieren Systemwechsel. Konkrete Antwortzeiten hängen von Katalog-, Lieferanten- und Infrastruktur-Anbindungen ab.',
        benefit: 'Mitarbeiter bearbeiten mehr Schritte im selben Kontext und müssen Daten seltener erneut erfassen oder abgleichen.',
        category: 'value'
    },
    {
        slug: 'sinkende-retouren',
        title: 'Fitment & Prüfpfade',
        description: 'Fahrzeugbezug, OE-Referenzen und Alternativen werden nachvollziehbar geprüft.',
        icon: ShieldCheck,
        features: [
            'Erfassung von VIN, HSN und TSN',
            'OE- und Herstellerreferenzen am Artikel',
            'Cross-Reference auf freigegebene Alternativen',
            'Unsichere Zuordnungen als sichtbarer Prüfbedarf',
            'Fahrzeugbezug bleibt am Verkaufsvorgang erhalten',
            'Retourengründe für spätere Auswertungen'
        ],
        technicalDetails: 'Dokumenterfassung kann Fahrzeugmerkmale vorbefüllen; Katalog- und Cross-Reference-Daten werden anschließend über definierte Prüfregeln bewertet. Unsicherheit wird nicht als sichere Zuordnung dargestellt.',
        benefit: 'Teileentscheidungen werden dokumentierbar und typische Zuordnungsfehler können früher erkannt werden.',
        category: 'value'
    },
    {
        slug: 'sprachuebergreifend',
        title: 'Mehrsprachige Anfragen',
        description: 'Text- und Sprachanfragen können kanalübergreifend für die Bearbeitung vorbereitet werden.',
        icon: Globe,
        features: [
            'Text- und Audioeingänge in einem Arbeitsvorrat',
            'Originalinhalt bleibt für die Fachprüfung erhalten',
            'Erkannte Fahrzeug- und Teilebegriffe als Vorschlag',
            'Sprachhinweis und Übersetzung sichtbar prüfbar',
            'Mehrsprachige Antworten nach Freigabe möglich',
            'Übergabe an Mitarbeiter mit vollständigem Originalkontext'
        ],
        technicalDetails: 'Audio kann in Text überführt und zusammen mit dem Original in den Vorgang übernommen werden. Welche Sprachen und Fachbegriffe produktiv freigegeben sind, wird im Onboarding dokumentiert; unsichere Inhalte bleiben als Prüfbedarf sichtbar.',
        benefit: 'Internationale Anfragen landen strukturiert im selben Arbeitsvorrat, während der Originalinhalt für die Fachprüfung erhalten bleibt.',
        category: 'value'
    },
    {
        slug: 'team-entlastung',
        title: 'Geführte Teamarbeit',
        description: 'Klare Arbeitsvorräte, Verantwortlichkeiten und Freigaben unterstützen den Tagesbetrieb.',
        icon: Users,
        features: [
            'Priorisierte Vorgänge statt verteilter Aufgabenlisten',
            'Zuständigkeit und Bearbeitungsstatus sichtbar',
            'Standardisierte Abläufe für wiederkehrende Fälle',
            'Fachprüfung bei unklaren Zuordnungen',
            'Rollenbasierte Aktionen und Freigaben',
            'Historie als gemeinsame Informationsbasis'
        ],
        technicalDetails: 'Statusmodelle, Rollen und Arbeitsvorräte steuern die Übergabe zwischen automatischer Vorverarbeitung und menschlicher Fachentscheidung. Jede Eskalation behält ihren fachlichen Kontext.',
        benefit: 'Wissen bleibt im Vorgang und Arbeit kann kontrolliert zwischen Mitarbeitern und Teams übergeben werden.',
        category: 'value'
    },

    // ============================================
    // CORE FEATURES
    // ============================================
    {
        slug: 'oem-ermittlung',
        title: 'Teileidentifikation & OE-Referenzen',
        description: 'Fahrzeugmerkmale, OE-Nummern, Cross-References und Alternativen in einem Prüfpfad.',
        icon: Search,
        features: [
            'Scan von Fahrzeugscheinen (OCR)',
            'Abgleich mit Teilekatalogen und Hersteller-Datenbanken',
            'Erkennung von Baujahr-spezifischen Änderungen',
            'Cross-Reference auf Alternativ-Hersteller',
            'Preisgruppenauflösung im Verkaufsvorgang',
            'Sichtbarer Prüfstatus bei unsicheren Zuordnungen'
        ],
        technicalDetails: 'Dokumenterfassung unterstützt die Extraktion von HSN, TSN und VIN. Katalog-, Hersteller- und Cross-Reference-Daten werden über nachvollziehbare Prüfregeln zusammengeführt.',
        benefit: 'Teileentscheidungen basieren auf verbundenen Fahrzeug- und Artikeldaten statt auf verteilten Notizen.',
        category: 'core'
    },
    {
        slug: 'whatsapp-bot',
        title: 'Digitale Anfragebearbeitung',
        description: 'WhatsApp als optionaler Eingangskanal für strukturierte, fachlich prüfbare Teileanfragen.',
        icon: Smartphone,
        features: [
            'Erfasst Sprachnachrichten, Text und Fotos',
            'Strukturiert Fahrzeug und gesuchtes Teil vor',
            'Bereitet Angebotsvorgänge zur Prüfung vor',
            'Übergibt unklare Fälle an Mitarbeiter',
            'Mehrsprachig einsetzbar',
            'WhatsApp Business API Integration'
        ],
        technicalDetails: 'Sprach-, Text- und Bildverarbeitung strukturiert Kundenangaben. Fachliche Unsicherheit löst eine Übergabe mit Originalinhalt und bisherigem Kontext aus.',
        benefit: 'Ein zusätzlicher Eingangskanal speist denselben Verkaufsprozess, ohne ein separates Datensilo zu erzeugen.',
        category: 'core'
    },
    {
        slug: 'automatische-rechnungserstellung',
        title: 'Belegfluss & Faktura',
        description: 'Vom Angebot über Auftrag und Lieferung bis zur festgeschriebenen Rechnung.',
        icon: FileText,
        features: [
            'Automatische Generierung als PDF',
            'Direkter Email-Versand an Kunden',
            'DATEV-Schnittstelle für den Steuerberater',
            'Gutschrift- und Stornopfad mit Ursprungsbezug'
        ],
        technicalDetails: 'Unser System nutzt Templates, die Sie einmalig anpassen. Bei jeder Bestellung triggert der Status "Versendet" die PDF-Generierung. Die Dokumente werden revisionssicher archiviert.',
        benefit: 'Folgebelege übernehmen geprüfte Positionen und bleiben über ihre Referenzen nachvollziehbar.',
        category: 'core'
    },
    {
        slug: 'bestellprozess',
        title: 'Disposition & Einkauf',
        description: 'Von Fehlmenge und Bedarf über Bestellvorschlag bis zu Bestellung und Wareneingang.',
        icon: ShoppingCart,
        features: [
            'Automatische Bestellvorschläge bei Mindestbestand',
            'Preisvergleich bei angebundenen Lieferanten',
            'Direkte API-Bestellung bei Großhändlern (Konnektoren in Entwicklung — WM SE priorisiert)',
            'Bestellvorschläge mit Dringlichkeit, Reichweite und Lieferanten-Empfehlung'
        ],
        technicalDetails: 'Bestellvorschläge werden aus Fehlmenge, Mindestbestand, Reservierungen, offenen Zugängen, Reichweite und Lieferzeit abgeleitet. Ein Mitarbeiter prüft Menge und Bezugsquelle, bevor die Bestellung freigegeben wird.',
        benefit: 'Disposition wird aus Bestands-, Reservierungs- und Beschaffungsdaten nachvollziehbar vorbereitet.',
        category: 'core'
    },
    {
        slug: 'bestandssynchronisation',
        title: 'Multi-Channel Warenbestand',
        description: 'Ein zentrales Lager für alle Verkaufswege — sauber gebucht, kein Doppelverkauf.',
        icon: RefreshCw,
        features: [
            'Ein zentrales Lager für Theke (POS), Aufträge und Angebote',
            'Reservierungen (ATP) verhindern Überverkäufe',
            'Bewegungsjournal: jede Zu- und Abbuchung als Ledger',
            'Marktplatz-/Shop-Konnektoren (eBay & Co.) in Entwicklung'
        ],
        technicalDetails: 'Bestand, Reservierungen und Bewegungen laufen über ein zentrales Ledger; der Theken-POS bucht live ab und das ATP-Verfahren sperrt reservierte Mengen. Konnektoren für Marktplätze und Webshops (eBay, Webshop) mit Echtzeit-Sync befinden sich in Entwicklung.',
        benefit: 'Behalten Sie über alle Verkaufswege den Überblick — ohne Doppelverkäufe und ohne Excel-Chaos.',
        category: 'core'
    },
    {
        slug: 'retourenmanagement',
        title: 'Retouren & Reklamationen',
        description: 'Machen Sie aus Rückgaben, Mängeln und Falschlieferungen geordnete Prozesse.',
        icon: Truck,
        features: [
            'Retoure oder Reklamation mit Artikel, Menge, Grund und Ursprungsbeleg',
            'Zustands- und Verantwortlichkeitsprüfung',
            'Wiedereinlagerung erst nach fachlicher Entscheidung',
            'Kundenreklamation und separate Lieferantenreklamation',
            'Auswertung dokumentierter Retourengründe'
        ],
        technicalDetails: 'Retoure und Reklamation bleiben mit Ursprungsbeleg, Prüfentscheid und den daraus folgenden Bestands- und Finanzschritten verknüpft. Eine Reklamation bucht weder automatisch Bestand noch eine Gutschrift.',
        benefit: 'Rückgabe, Kundenreklamation, Bestand, Erstattung und Lieferantenreklamation bleiben kontrolliert nachvollziehbar.',
        category: 'core'
    },
    {
        slug: 'gobd-tse-zugferd-datev',
        title: 'Nachvollziehbare Faktura & Kassenbuch',
        description: 'GoBD-orientierte Belegführung sowie vorbereitete TSE-, DSFinV-K-, ZUGFeRD- und DATEV-Pfade.',
        icon: Landmark,
        features: [
            'GoBD-orientierte Festschreibung mit verknüpftem Korrekturpfad',
            'Technisch vorbereiteter TSE- und DSFinV-K-Pfad',
            'Vorbereitete ZUGFeRD- und XRechnung-Ausgabe',
            'DATEV-Export: Kontenrahmen SKR03/04 + EXTF-Buchungsstapel',
            'USt-Voranmeldung, USt-Journal und belegweise USt-Verprobung',
            'GoBD-orientiertes Kassenbuch & Z-Bericht mit laufendem Saldo'
        ],
        technicalDetails: 'Beträge werden in Cent verarbeitet und die USt je Steuersatz aus den Rechnungspositionen aufgeteilt. Prüfpfade unterstützen Nummernkreis- und Chronologie-Kontrollen; Steuerprofil, TSE, Exporte und konkrete Einsatzweise werden vor Produktivstart fachlich und technisch abgenommen.',
        benefit: 'Belege, Kasse und Meldungen bleiben nachvollziehbar; DATEV-Exporte und Steuerpfade können vor dem Einsatz mit Ihrer Steuerberatung abgenommen werden.',
        category: 'core'
    },
    {
        slug: 'b2b-kundenportal-white-label',
        title: 'White-Label B2B-Kundenportal',
        description: 'Pilot für ein Kundenportal unter Ihrer Marke: Geschäftskunden sehen Belege und senden Bestellanfragen mit ihren Preisen.',
        icon: Globe,
        features: [
            'White-Label unter Ihrer eigenen Domain',
            'Kunden sehen ihre Rechnungen inkl. PDF-Download',
            'Bestellanfragen mit kundenspezifischen, serverseitig aufgelösten Preisen',
            'Sicherer Token-/Magic-Link-Login, strikt mandanten-isoliert',
            'Kein Preis-Leck: Preise werden nie clientseitig berechnet',
            'Bestellungen sind unverbindliche Anfragen (buchen keinen Bestand)'
        ],
        technicalDetails: 'Die Plattform stellt einen token-authentifizierten Self-Service-Bereich bereit: eigene Stammdaten, Rechnungen inklusive PDF, mandantenbezogene Produkte mit serverseitiger Preisauflösung und Bestellanfragen. White-Label-Domains werden über CNAME und TLS angebunden.',
        benefit: 'Entlasten Sie Ihr Team von Standard-Nachfragen und binden Sie Geschäftskunden mit einem professionellen Self-Service-Portal unter Ihrer eigenen Marke.',
        category: 'core'
    },
    {
        slug: 'erp-autoteilehandel',
        title: 'ERP-System für den Autoteilehandel',
        description: 'Branchenspezifisches ERP: Verkauf, Betrieb und Finanzen in einer Datenbasis — mit Einkauf, Lager und Warenwirtschaft im Betriebs-Workspace.',
        icon: Layers,
        features: [
            'Drei Workspaces auf einer Datenbasis: Verkauf, Betrieb, Finanzen',
            'Durchgängige Belegkette: Angebot → Lieferschein → Rechnung',
            'Integrierte Warenwirtschaft mit ATP-Reservierungen',
            'Vorbereitete DACH-Pfade: GoBD, TSE, ZUGFeRD, DATEV',
            'CRM, Bonität/Kreditlimit und über 40 Auswertungen',
            '5-Rollen-Rechtesystem, 2FA, Mandanten-Isolation, Audit-Log'
        ],
        technicalDetails: 'Partsunion ist auf den Autoteilehandel zugeschnitten: OE-/Kataloglogik, KFZ-Fitment, Altteilpfand und digitale Eingangskanäle sind in die Geschäftsobjekte eingebunden. Alle Module teilen eine Datenbasis.',
        benefit: 'Ein einziges System statt Excel, Insellösungen und Steuerberater-Chaos — branchenspezifisch für den Teilehandel.',
        category: 'core'
    },
    {
        slug: 'warenwirtschaft-autoteilhandel',
        title: 'Warenwirtschaftssystem für den Autoteilehandel',
        description: 'Eine vollständige Warenwirtschaft für Kfz-Teile — mit Wareneingang, ATP-Reservierungen, Disposition und Inventur.',
        icon: Boxes,
        features: [
            'Artikel, Bestand & Bewegungsjournal (Ledger)',
            'Foto-Erfassung unterstützt den Abgleich mit der Bestellung',
            'Reservierungen (ATP) verhindern Überverkäufe',
            'Disposition mit Dringlichkeit, Reichweite und Bezugsquelle',
            'KFZ-Fitment, Chargen/Serien, Lagerorte & Umbuchungen',
            'Inventur, Etiketten/Barcode und Retoure per Foto'
        ],
        technicalDetails: 'Bestand, Reservierungen und Bewegungen laufen über ein zentrales Ledger; jede Zu-/Abbuchung ist nachvollziehbar und der Buchbestand wird gegen das Bewegungs-Hauptbuch verprobt. Cockpits für Stammdaten-Qualität, Artikel-Dubletten und Single-Source-Beschaffungsrisiko sind eingebaut.',
        benefit: 'Schluss mit Excel und Phantombeständen — eine WaWi, die den Autoteilehandel versteht (OEM, Fitment, Altteilpfand).',
        category: 'core'
    }
];

// Helper to get only value propositions
export const getValuePropositions = () => featureData.filter(f => f.category === 'value');

// Helper to get only core features
export const getCoreFeatures = () => featureData.filter(f => f.category === 'core');
