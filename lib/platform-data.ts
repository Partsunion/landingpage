/**
 * platform-data.ts — Source of truth for the PLATFORM breadth shown on the
 * landing page (3 workspaces + bot + DACH-compliance + B2B portal + security).
 *
 * Drives the new homepage sections (PlatformWorkspaces, ComplianceSection,
 * CustomerPortalSection) and the platform-first /features overview.
 *
 * HONESTY (UWG §5) — every entry below is a VERIFIED, live capability unless it
 * carries `status: 'roadmap'`. Ground truth: FEATURES.md "Teil 1 (verifiziert)"
 * + the Whatsapp-Bot / dashboard source. Do NOT add live claims for:
 *   - Live-Bestellung an externe Großhändler  (roadmap — see Wholesalers.tsx)
 *   - Echtzeit-Marktplatz-/Shop-Sync (eBay etc.)  (roadmap — connectors only)
 *   - Versand-/Carrier-API (Label/Tracking)  (roadmap)
 *   - Stripe/PayPal Live-Zahlungs-Webhooks  (activated per onboarding)
 */

import {
    type LucideIcon,
    ShoppingCart,
    Warehouse,
    Landmark,
    Inbox,
    ScanLine,
    Mic,
    Database,
    PackageCheck,
    RotateCcw,
    Truck,
    Users,
    LineChart,
    ShieldCheck,
    Lock,
    KeyRound,
    FileCheck2,
    Receipt,
    Calculator,
    Building2,
    Globe2,
    Boxes,
    Camera,
    BadgeEuro,
    UserCog,
    ScrollText,
} from 'lucide-react';

export type CapabilityStatus = 'live' | 'roadmap';

export interface Capability {
    /** Short, scannable label (Sie-Form / noun phrase). */
    label: string;
    /** One half-sentence of concrete benefit. */
    detail: string;
    icon?: LucideIcon;
    status?: CapabilityStatus; // default 'live'
}

export interface Workspace {
    key: 'verkauf' | 'lager' | 'finanzen';
    name: string;
    icon: LucideIcon;
    /** Accent color (token-aligned hex). */
    accent: string;
    tagline: string;
    capabilities: Capability[];
    /** A single honest "depth" proof point for the card footer. */
    depth: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// The three workspaces — the heart of the platform story.
// ─────────────────────────────────────────────────────────────────────────────

export const workspaces: Workspace[] = [
    {
        key: 'verkauf',
        name: 'Verkauf',
        icon: ShoppingCart,
        accent: '#1d6fe8',
        tagline: 'Vom ersten Teilebedarf bis zur bezahlten Rechnung — alle Verkaufsvorgänge an einem Ort.',
        capabilities: [
            { label: 'Teilesuche & Thekenverkauf', detail: 'Fahrzeugbezug, Artikelvergleich, Preis und Bestand in einem Arbeitsablauf.', icon: ScanLine },
            { label: 'Anfragen-Arbeitsvorrat', detail: 'Digitale Anfragen landen als bearbeitbare Vorgänge mit Kundenkontext.', icon: Inbox },
            { label: '360°-Kundenakte', detail: 'Offene Posten, Bonität, Umsatztrend, Top-Artikel, Retouren und Reklamationen je Kunde.', icon: Users },
            { label: 'Belegkette', detail: 'Angebot → Lieferschein → Rechnung, durchgängig verknüpft.', icon: FileCheck2 },
            { label: 'CRM & Pipeline', detail: 'Leads, RFM-Segmente und ein Reaktivierungs-Radar nach Bestellrhythmus.', icon: LineChart },
            { label: 'Bonität & Kreditlimit', detail: 'Bonitätsampel und Kreditsperre greifen über den gesamten Verkaufsweg.', icon: BadgeEuro },
        ],
        depth: 'Datenbasierte Auswertungen zu Kunden, Artikeln, Deckungsbeitrag, Bestand und Wiederbestellverhalten.',
    },
    {
        key: 'lager',
        name: 'Betrieb & Warenwirtschaft',
        icon: Warehouse,
        accent: '#1d6fe8',
        tagline: 'Bestandsgeführte Warenwirtschaft vom Einkauf über Wareneingang und Lager bis zur Inventur.',
        capabilities: [
            { label: 'Bestand & Bewegungsjournal', detail: 'Jede Zu- und Abbuchung als nachvollziehbares Ledger.', icon: Database },
            { label: 'Foto-Erfassung im Wareneingang', detail: 'Bild und erkannte Artikelmerkmale unterstützen den Abgleich mit der Bestellung.', icon: Camera },
            { label: 'Retouren & Reklamationen', detail: 'Rückgabe oder Mangel mobil erfassen, Ursprung prüfen und Folgen getrennt bearbeiten.', icon: RotateCcw },
            { label: 'Disposition & Bestellvorschläge', detail: 'Vorschläge nach Fehlmenge, Reichweite, Dringlichkeit und Bezugsquelle.', icon: Truck },
            { label: 'Reservierungen (ATP)', detail: 'Available-to-Promise verhindert das Überverkaufen reservierter Mengen.', icon: PackageCheck },
            { label: 'KFZ-Fitment & Chargen/Serien', detail: 'Fahrzeugzuordnung, Seriennummern und Ablauf-Alerts.', icon: Boxes },
        ],
        depth: 'Cockpits für Stammdaten-Qualität, Artikel-Dubletten und Single-Source-Beschaffungsrisiko.',
    },
    {
        key: 'finanzen',
        name: 'Finanzen & Steuer',
        icon: Landmark,
        accent: '#1d6fe8',
        tagline: 'Nachvollziehbare Finanzprozesse mit DACH-Steuerlogik und verbundenen Ursprungsbelegen.',
        capabilities: [
            { label: 'USt-Journal & Verprobung', detail: 'Jeder Beleg je Steuersatz, centgenau abgestimmt zur USt-Voranmeldung.', icon: Calculator },
            { label: 'OP & Mahnwesen', detail: 'Offene Posten und Mahnstufen mit GoBD-orientiertem Korrekturpfad.', icon: Receipt },
            { label: 'Zahlungen & Teilzahlung/Skonto', detail: 'Zahlungs-Ledger mit Skonto, Anzahlungs- und Schlussrechnung (§14 Abs. 5).', icon: BadgeEuro },
            { label: 'DATEV-Export', detail: 'Kontenrahmen SKR03/04 und EXTF-Buchungsstapel für den Steuerberater.', icon: Building2 },
            { label: 'Tagesabschluss & Kassenbuch', detail: 'Z-Bericht und GoBD-orientiertes Kassenbuch mit laufendem Saldo je Sitzung.', icon: ScrollText },
            { label: 'Margen- & Liquiditätsanalyse', detail: 'Deckungsbeitrag, Kreditrisiko-Matrix und Cash-Conversion-Cycle.', icon: LineChart },
        ],
        depth: 'GoBD-orientierte Prüfpfade für Rechnungsnummern-Lücken und Beleg-Chronologie (§146 AO).',
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// DACH fiscal compliance — the trust band that no "WhatsApp bot" can show.
// All items are LIVE/built. SEPA & bank import are live; payment-provider live
// keys are activated per onboarding (kept out of this "always-on" list).
// ─────────────────────────────────────────────────────────────────────────────

export interface ComplianceItem {
    name: string;
    detail: string;
    icon: LucideIcon;
}

export const complianceItems: ComplianceItem[] = [
    { name: 'GoBD-orientierte Festschreibung', detail: 'Festgeschriebene Rechnungen werden über verknüpfte Korrekturbelege berichtigt.', icon: Lock },
    { name: 'TSE-Pfad (§146a)', detail: 'Technisch vorbereitete Kassensignatur; Freigabe passend zum Betriebsmodell.', icon: ShieldCheck },
    { name: 'DSFinV-K-Pfad', detail: 'Exportpfad für Kassendaten; Validierung vor dem Produktivstart.', icon: FileCheck2 },
    { name: 'ZUGFeRD / XRechnung', detail: 'Vorbereitete E-Rechnungsformate auf Basis der Belegdaten.', icon: Receipt },
    { name: 'DATEV (SKR03/04)', detail: 'Buchungsstapel mit USt-Aufteilung je Steuersatz.', icon: Building2 },
    { name: 'USt-Voranmeldung', detail: 'Korrekte Berechnung, kein Doppel-Reversal bei Storno.', icon: Calculator },
    { name: 'OSS / EU-Fernverkauf', detail: 'One-Stop-Shop-Vorbereitung mit Schwellenwert-Wächter.', icon: Globe2 },
    { name: 'Intrastat & SEPA', detail: 'Außenhandelsstatistik und Lastschrift-Batch ohne Doppel-Einzug.', icon: BadgeEuro },
];

// ─────────────────────────────────────────────────────────────────────────────
// Business intelligence — 40+ data-driven reports from real documents.
// Honesty: every report computes from real invoices/movements; where no data
// exists it shows "—", never an invented figure.
// ─────────────────────────────────────────────────────────────────────────────

export interface AnalyticsHighlight {
    label: string;
    detail: string;
}

export const analyticsHighlights: AnalyticsHighlight[] = [
    { label: 'Kunden- & Artikel-Profitabilität', detail: 'Wer und was wirklich Deckungsbeitrag bringt — inkl. Negativmargen-Liste.' },
    { label: 'Churn-Frühwarnung & Wiederbestell-Radar', detail: 'Kunden, die langsamer bestellen als ihr eigener Rhythmus — bevor sie weg sind.' },
    { label: 'RFM-Segmente & Kohorten-Retention', detail: 'Champions, gefährdete und verlorene Kunden, datenbasiert segmentiert.' },
    { label: 'GMROI & Lagerrendite', detail: 'Wie viel Rohertrag jeder im Lager gebundene Euro bringt.' },
    { label: 'Kunden-Konzentration / Klumpenrisiko', detail: 'Wie abhängig Ihr Umsatz von wenigen Großkunden ist.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// B2B customer portal — live, white-label self-service.
// ─────────────────────────────────────────────────────────────────────────────

export interface PortalFeature {
    label: string;
    detail: string;
    icon: LucideIcon;
}

export const portalFeatures: PortalFeature[] = [
    { label: 'White-Label & eigene Domain', detail: 'Das Portal läuft unter Ihrer Marke auf Ihrer eigenen Domain.', icon: Globe2 },
    { label: 'Rechnungen & PDF-Download', detail: 'Geschäftskunden sehen ihre Belege selbst — rund um die Uhr.', icon: Receipt },
    { label: 'Kundenspezifische Preise', detail: 'Bestellungen mit serverseitig aufgelösten B2B-Preisen pro Kunde.', icon: BadgeEuro },
    { label: 'Sicherer Self-Service-Login', detail: 'Token-/Magic-Link-Anmeldung, strikt mandanten-isoliert.', icon: KeyRound },
];

// ─────────────────────────────────────────────────────────────────────────────
// Bot / KI entry channel — the "wow" that feeds the platform.
// ─────────────────────────────────────────────────────────────────────────────

export interface BotCapability {
    label: string;
    detail: string;
    icon: LucideIcon;
    status?: CapabilityStatus;
}

export const botCapabilities: BotCapability[] = [
    { label: 'Foto- und Dokumenterfassung', detail: 'Fahrzeugschein oder Typenschild liefern HSN, TSN und VIN für die weitere Prüfung.', icon: ScanLine },
    { label: 'Sprach- und Textanfragen', detail: 'Unstrukturierte Kundenangaben werden für die fachliche Bearbeitung zusammengeführt.', icon: Mic },
    { label: 'Lizenzierte Herstellerkataloge', detail: 'OE-Ermittlung über freigeschaltete Katalogdaten plus Cross-References auf Alternativen.', icon: Database },
    { label: 'Angebote aus echtem Bestand', detail: 'Preise aus Ihrem Lager und freigegebenen Großhändler-Anbindungen — fehlende Live-Daten werden nicht erfunden.', icon: ShoppingCart },
    { label: 'Prüfregeln & Fachfreigabe', detail: 'Unsichere Fälle gehen mit vollständigem Kontext in den Arbeitsvorrat eines Mitarbeiters.', icon: UserCog },
];

// ─────────────────────────────────────────────────────────────────────────────
// Security & multi-tenancy strip.
// ─────────────────────────────────────────────────────────────────────────────

export interface SecurityItem {
    label: string;
    detail: string;
    icon: LucideIcon;
}

export const securityItems: SecurityItem[] = [
    { label: '5-Rollen-Rechtesystem', detail: 'Inhaber, Manager, Lager, Verkauf, Betrachter — sauber getrennt.', icon: UserCog },
    { label: '2-Faktor-Authentifizierung', detail: 'TOTP-2FA inkl. Pflicht-Pfad für privilegierte Rollen.', icon: KeyRound },
    { label: 'Mandantentrennung', detail: 'Daten je Händler tenant-gescopt; die produktive Isolation wird vor Freigabe per Negativtests abgenommen.', icon: ShieldCheck },
    { label: 'DSGVO & Audit-Log', detail: 'Auskunft/Löschung (Art. 15/17) und lückenloses Änderungsprotokoll.', icon: ScrollText },
];

// ─────────────────────────────────────────────────────────────────────────────
// Headline platform stats — only verifiable facts.
// ─────────────────────────────────────────────────────────────────────────────

export interface PlatformStat {
    value: string;
    label: string;
}

export const platformStats: PlatformStat[] = [
    { value: '1', label: 'Datenbasis für Verkauf · Betrieb · Finanzen' },
    { value: 'ATP', label: 'Reservierungen und verfügbarer Bestand' },
    { value: 'End-to-End', label: 'Angebot · Auftrag · Lieferung · Rechnung' },
    { value: 'DACH', label: 'vorbereitete GoBD-, TSE-, E-Rechnungs- und DATEV-Pfade' },
];
