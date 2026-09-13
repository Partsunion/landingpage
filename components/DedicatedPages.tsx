import Image from "next/image";
import Link from "next/link";
import { Apple, ArrowDownToLine, ArrowRight, ChevronRight, Download, Monitor, ShieldCheck, TriangleAlert } from "lucide-react";
import { ConsultationBooking } from "@/components/ConsultationBooking";
import { ProcessGlyph } from "@/components/ProcessGlyph";
import { ProductExplorer } from "@/components/ProductExplorer";
import { ProductShot } from "@/components/ProductShot";

const Crumbs = ({ title }: { title: string }) => <div className="container breadcrumbs"><Link href="/">Startseite</Link><ChevronRight /><span>{title}</span></div>;

const desktopRelease = "https://github.com/Partsunion/landingpage/releases/download/desktop-preview-v1.0.44-c5774bc7";
const desktopDownloads = [
  { title: "Windows", subtitle: "Windows 11 · Intel/AMD · 64 Bit", format: "MSI · 8,8 MB", href: `${desktopRelease}/Partsunion-windows-x64.msi`, icon: Monitor, status: "Prüfversion · noch nicht öffentlich signiert", warning: true },
  { title: "Mac mit Apple Chip", subtitle: "macOS 13.3 oder neuer · M-Serie", format: "DMG · 6,6 MB", href: `${desktopRelease}/Partsunion-macos-arm64.dmg`, icon: Apple, status: "Von Apple signiert und notarisiert", warning: false },
  { title: "Mac mit Intel-Chip", subtitle: "macOS 13.3 oder neuer · Intel", format: "DMG · 7,0 MB", href: `${desktopRelease}/Partsunion-macos-x64.dmg`, icon: Apple, status: "Von Apple signiert und notarisiert", warning: false },
] as const;

export function ProductViewsPage({ demo = false }: { demo?: boolean }) {
  return <>
    <section className="special-heading product-views-heading"><Crumbs title={demo ? "Live-Demo" : "Produktansichten"} /><div className="container special-heading-copy"><p className="eyebrow">EIN BLICK IN DEINEN ARBEITSALLTAG</p><h1>{demo ? "So sieht Partsunion im Betrieb aus." : "Dein System. In echten Produktansichten."}</h1><p>Wechsle zwischen den Arbeitsbereichen und sieh, wie Informationen, Status und nächste Schritte in Partsunion zusammenkommen.</p><Link className="button button-primary" href="/beratung">Persönlich zeigen lassen <ArrowRight /></Link></div></section>
    <section className="section container product-views-section"><p className="eyebrow">VOM KUNDENDIALOG BIS ZUM BELEG</p><ProductExplorer /><p className="product-view-note">Die Ansichten zeigen das Partsunion-System mit Beispieldaten. Funktionsumfang und Anbindungen werden für deinen Betrieb abgestimmt.</p></section>
    <section className="product-view-context"><div className="container"><div><span>01</span><h3>Ein Vorgang</h3><p>Kunde, Fahrzeug, Teil und Bearbeitungsstand bleiben miteinander verbunden.</p></div><div><span>02</span><h3>Klare nächste Schritte</h3><p>Dein Team sieht, was bereits erledigt ist und wo noch eine Entscheidung fehlt.</p></div><div><span>03</span><h3>Gemeinsame Datenbasis</h3><p>Verkauf, Einkauf, Lager und Belege arbeiten mit denselben Informationen.</p></div></div></section>
    <section className="section contact-section container"><div className="contact-heading"><p className="eyebrow">LIVE MIT DEINEM PROZESS</p><h2>Welche Ansicht ist für deinen Betrieb entscheidend?</h2><p>Im Gespräch zeigen wir dir genau die Arbeitsbereiche, die zu Sortiment, Team und heutigen Abläufen passen.</p></div><ConsultationBooking compact /></section>
  </>;
}

export function ImplementationPage() {
  const steps = [["01","Abläufe klären","Wir betrachten den Weg von der Anfrage bis zur Rückabwicklung."],["02","Daten prüfen","Kunden, Artikel und Bestände werden strukturiert vorbereitet."],["03","Team einrichten","Rollen, Arbeitsbereiche und gemeinsame Abläufe werden trainiert."],["04","Gemeinsam starten","Der Umstellungstermin wird koordiniert und begleitet."]];
  return <>
    <section className="implementation-hero"><Crumbs title="Einführung & Datenübernahme" /><div className="container implementation-hero-grid"><div><p className="eyebrow">EINFÜHRUNG MIT PLAN</p><h1>Wir starten mit deinem Betrieb. Nicht mit einer leeren Software.</h1><p>Prozesse, Daten, Anbindungen und Team werden als zusammenhängender Start vorbereitet.</p><Link className="button button-primary" href="/beratung">Einführung besprechen <ArrowRight /></Link></div><figure><Image src="/images/parts-specialist-workshop.jpg" alt="Arbeitsplatz und Lager eines Autoteilebetriebs" fill sizes="(max-width: 760px) 100vw, 50vw" /><figcaption>DEIN BETRIEB / DEIN STARTPUNKT</figcaption></figure></div></section>
    <section className="section container implementation-process"><div className="section-top"><div><p className="eyebrow">VIER KLARE ETAPPEN</p><h2>Vom heutigen Ablauf zum gemeinsamen Start.</h2></div><p className="section-lead">Jede Etappe schafft die Grundlage für die nächste. So bleibt die Umstellung für dein Team nachvollziehbar.</p></div><div>{steps.map(([n,title,text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="implementation-data"><div className="container implementation-data-grid"><div><p className="eyebrow">DATENÜBERNAHME</p><h2>Erst prüfen. Dann sauber übernehmen.</h2><p>Ein Beispielexport zeigt, welche Daten übernommen werden können, was bereinigt werden sollte und welche Historie sinnvoll mitkommt.</p></div><div className="data-stack"><span><ProcessGlyph type="record" /><strong>Kunden & Kontakte</strong><small>Struktur und Dubletten prüfen</small></span><span><ProcessGlyph type="inventory" /><strong>Artikel & Bestände</strong><small>Nummern, Mengen und Lagerorte abgleichen</small></span><span><ProcessGlyph type="flow" /><strong>Anbindungen & Rollen</strong><small>Zugänge und Zuständigkeiten vorbereiten</small></span></div></div></section>
    <section className="section contact-section container"><div className="contact-heading"><p className="eyebrow">DEIN START MIT PARTSUNION</p><h2>Lass uns den passenden Einstieg planen.</h2><p>In 30 Minuten klären wir Ausgangslage, Daten und die sinnvollste Reihenfolge für deinen Betrieb.</p></div><ConsultationBooking compact /></section>
  </>;
}

export function DownloadPage() {
  return <>
    <section className="download-hero"><Crumbs title="Download" /><div className="container download-hero-grid"><div><p className="eyebrow">PARTSUNION DESKTOP</p><h1>Dein Arbeitsplatz für den verbundenen Teilehandel.</h1><p>Partsunion bringt Verkauf, Einkauf, Lager und Verwaltung in einer gemeinsamen Desktop-Arbeitsumgebung zusammen.</p><div className="hero-actions"><a className="button button-light" href="#downloads"><Download /> App auswählen</a><Link className="text-link" href="/beratung">Zugang besprechen <ArrowRight /></Link></div></div><div className="download-device"><div className="download-device-top"><i /><span>PARTSUNION DESKTOP</span></div><ProductShot variant="order" priority /><div className="download-device-base" /></div></div></section>
    <section className="section container download-release" id="downloads"><div className="section-top"><div><p className="eyebrow">PRÜFVERSION 1.0.44</p><h2>Wähle deinen Computer.</h2></div><p className="section-lead">Für Windows und macOS. Der Download allein legt kein Konto an; deinen Zugang erhältst du von deinem Betrieb oder unserem Team.</p></div><div className="download-platforms">{desktopDownloads.map((item) => { const Icon = item.icon; return <article key={item.title}><span className="download-platform-icon"><Icon /></span><div><h3>{item.title}</h3><p>{item.subtitle}</p></div><small className={item.warning ? "download-status warning" : "download-status"}>{item.warning ? <TriangleAlert /> : <ShieldCheck />}{item.status}</small><a className="button button-primary" href={item.href}><ArrowDownToLine /> Herunterladen</a><code>{item.format}</code></article>; })}</div></section>
    <section className="section container download-details"><div><ProcessGlyph type="flow" /><p className="eyebrow">VOR DEM START</p><h2>Für deinen Betrieb eingerichtet.</h2><p>Arbeitsbereiche, Rollen und Anbindungen werden vor dem produktiven Einsatz gemeinsam abgestimmt.</p></div><div className="download-specs"><article><Monitor /><div><h3>Desktop-Arbeitsplatz</h3><p>Für den täglichen Einsatz an Verkauf, Lager und Verwaltung.</p></div></article><article><ShieldCheck /><div><h3>Geschützter Zugang</h3><p>Der Zugang wird passend zu Betrieb und Nutzerrolle bereitgestellt.</p></div></article><article><Download /><div><h3>Aktuelle Version</h3><p>Die verfügbare Version und Hinweise findest du im offiziellen Download.</p></div></article></div></section>
    <section className="download-help"><div className="container"><div><p className="eyebrow">FRAGEN ZUR INSTALLATION?</p><h2>Wir helfen beim sauberen Start.</h2></div><Link className="button button-primary" href="/contact">Support kontaktieren <ArrowRight /></Link></div></section>
  </>;
}
