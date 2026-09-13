import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { ConsultationBooking } from "@/components/ConsultationBooking";
import { EditorialVisual } from "@/components/EditorialVisual";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProcessGlyph } from "@/components/ProcessGlyph";
import { ProductShot, type ProductShotVariant } from "@/components/ProductShot";
import { WorkflowShowcase } from "@/components/WorkflowShowcase";
import { industries, products } from "@/lib/site-data";

const proof = [
  { value: "56", label: "Marken mit Nutzungsrechten" },
  { value: "80%", label: "der weltweiten VINs decodierbar" },
  { value: "24/7", label: "für dein Team einsatzbereit" },
  { value: "1", label: "durchgängiger Workflow" },
];
const systemSignals = [
  { code: "VIN", label: "Fahrzeugdaten", text: "VIN · HSN/TSN", icon: "vehicle" as const },
  { code: "OE", label: "Teileidentifikation", text: "OE / OEM", icon: "match" as const },
  { code: "WA", label: "Anfragekanal", text: "WhatsApp", icon: "assistant" as const },
  { code: "RE", label: "Digitale Belege", text: "ZUGFeRD", icon: "record" as const },
  { code: "FI", label: "Finanzübergabe", text: "DATEV", icon: "finance" as const },
  { code: "POS", label: "Kassenprozess", text: "GoBD · TSE", icon: "checkout" as const },
];
const capabilities = [
  { icon: "scan" as const, title: "Fahrzeugdaten verstehen", text: "Fahrzeugschein, VIN und HSN/TSN werden automatisch ausgelesen und dem richtigen Fahrzeug zugeordnet." },
  { icon: "match" as const, title: "Teile schneller ermitteln", text: "OE-Nummern und benötigte Informationen landen strukturiert beim zuständigen Team." },
  { icon: "flow" as const, title: "Durchgängig arbeiten", text: "Anfrage, Angebot, Einkauf, Lager, Rechnung und Zahlung bleiben in einem Vorgang verbunden." },
  { icon: "record" as const, title: "Sauber dokumentieren", text: "Status, Belege und Entscheidungen sind nachvollziehbar – auch bei Retouren und Reklamationen." },
];
const workflowGlyphs = ["vehicle", "order", "purchase", "inventory", "finance", "checkout", "return"] as const;
const insights = [
  { type: "FÜR NEUTEILEHÄNDLER", title: "Teile identifizieren und schneller beschaffen", text: "Produktdaten, Einkauf, Bestand und Verkauf greifen ohne Medienbruch ineinander.", href: "/plattform/neuteile" },
  { type: "FÜR GEBRAUCHTTEILEHÄNDLER", title: "Einzelteile, Bilder und Besteuerung im Griff", text: "Individuelle Teileprozesse werden strukturiert und für dein Team leicht bedienbar.", href: "/plattform/gebrauchtteile" },
  { type: "FÜR DEINE VERWALTUNG", title: "Kasse, E-Rechnung und DATEV zusammenführen", text: "Belege entstehen direkt aus dem Vorgang und stehen dort bereit, wo sie gebraucht werden.", href: "/buchhaltung-banking" },
];
const resources = [
  { type: "RATGEBER", title: "Retourenquote im Autoteilehandel senken", text: "Wie präzise Fahrzeug- und Teilezuordnung Fehlbestellungen reduziert.", href: "/blog/retourenquote-autoteilhandel-senken", visual: "order" as ProductShotVariant },
  { type: "CHECKLISTE", title: "Warenwirtschaft für den Autoteilehandel", text: "Welche Funktionen eine branchenspezifische Lösung wirklich braucht.", href: "/blog/warenwirtschaft-autoteilhandel-checkliste", visual: "inventory" as ProductShotVariant },
  { type: "EINBLICK", title: "WhatsApp-Anfragen automatisch erfassen", text: "Vom Foto und Fahrzeugschein bis zur strukturierten Teileanfrage.", href: "/blog/whatsapp-bot-fuer-autoteilhaendler", visual: "whatsapp" as ProductShotVariant },
  { type: "PRAXISWISSEN", title: "OE-Ermittlung aus VIN, HSN und TSN", text: "Fahrzeugdaten zuverlässig in passende Teilenummern übersetzen.", href: "/blog/oem-ermittlung-aus-vin-hsn-tsn", visual: "oe" as ProductShotVariant },
];

const comparison = [
  ["Automatische OE-Ermittlung", "Zusatzlösung", "Manuell", "Direkt integriert"],
  ["WhatsApp bis Auftrag", "Mehrere Systeme", "Nicht automatisiert", "Ein Vorgang"],
  ["Neu- und Gebrauchtteile", "Konfiguration nötig", "Eigene Listen", "Branchengerecht"],
  ["Verkauf, Lager und Einkauf", "Je nach Modulen", "Getrennte Tabellen", "Gemeinsame Datenbasis"],
  ["Retoure mit Ursprungsbeleg", "Je nach Umfang", "Manuelle Suche", "Direkt verbunden"],
];

export function HomePage() {
  return <>
    <HeroCarousel />
    <section className="section intro-section container">
      <div className="section-top"><div><p className="eyebrow">FÜR DEN AUTOTEILEHANDEL GEMACHT</p><h2>Eine Plattform, die deinen Arbeitsalltag versteht</h2></div><Link className="button button-outline" href="/produktdaten">Produkt ansehen <ArrowRight size={16} /></Link></div>
      <p className="section-lead">Partsunion verbindet die täglichen Abläufe deines Teilehandels: Teile identifizieren, Kunden beraten, Angebote erstellen, Ware beschaffen, Bestände führen, kassieren und verbuchen.</p>
      <div className="proof-row" aria-label="Partsunion Kennzahlen">{proof.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
    </section>

    <section className="system-signals" aria-labelledby="system-signals-title"><div className="container">
      <div className="system-signals-heading"><div><p className="eyebrow">IM TAGESGESCHÄFT VERBUNDEN</p><h2 id="system-signals-title">Ein Systemkontext statt sechs Einzellösungen.</h2></div><p>Fahrzeugdaten, Teile, Kommunikation und kaufmännische Abläufe bleiben innerhalb desselben Arbeitsprozesses.</p></div>
      <div className="system-signal-grid">{systemSignals.map((item) => <div key={item.code}><span>{item.code}</span><ProcessGlyph type={item.icon} /><div><strong>{item.label}</strong><small>{item.text}</small></div></div>)}</div>
    </div></section>

    <WorkflowShowcase />

    <section className="section industry-layer"><div className="container">
      <div className="section-top"><div><p className="eyebrow">EIN DURCHGÄNGIGER WORKFLOW</p><h2>Jeder Arbeitsschritt. Sauber verbunden.</h2><p className="section-lead">Von der ersten Kundenanfrage bis zur Retoure bleibt alles in einem System – nachvollziehbar, schnell und für dein ganzes Team zugänglich.</p></div><Link className="button button-outline" href="/loesungen">Alle Lösungen <ArrowRight size={16} /></Link></div>
      <p className="scroll-hint">Seitlich wischen <ArrowRight /></p>
      <div className="industry-grid">{industries.map((item, index) => <Link className="industry-card" href={item.href} key={item.href}><div className="industry-card-top"><span>0{index + 1}</span><ProcessGlyph type={workflowGlyphs[index]} /></div><h3>{item.label}</h3><p>{item.description}</p><span>Prozess ansehen <ArrowRight size={14} /></span></Link>)}</div>
    </div></section>

    <section className="section capabilities container"><div className="capabilities-layout"><div className="capabilities-intro">
      <p className="eyebrow">AUTOMATISIERUNG FÜR DEIN TEAM</p><h2>Weniger suchen. Weniger tippen. Mehr Teile verkaufen.</h2>
      <p className="section-lead">Partsunion übernimmt wiederkehrende Schritte und gibt deinem Team genau die Informationen, die im nächsten Moment gebraucht werden.</p>
      <Link className="button button-primary" href="/automatisierung-autoteilehandel">Automatisierung entdecken <ArrowRight size={16} /></Link>
      </div><div className="capability-grid">{capabilities.map(({ icon, title, text }, index) => <div className="capability" key={title}><span>0{index + 1}</span><ProcessGlyph type={icon} /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div>
    </section>

    <section className="section product-section container">
      <p className="eyebrow">DREI STARKE BAUSTEINE</p><h2>Alles, was deinen Betrieb schneller macht.</h2><p className="section-lead">ERP und Warenwirtschaft bilden die Basis. Der WhatsApp-Bot und der Betriebsassistent automatisieren die Arbeit dort, wo heute Zeit verloren geht.</p>
      <div className="product-showcase">
        <Link className="product-feature product-feature-main" href={products[0].href}><div className="product-feature-copy"><span>01 / BASIS</span><h3>{products[0].label}</h3><p>{products[0].description}</p><strong>Plattform entdecken <ArrowRight size={14} /></strong></div><ProductShot variant="inventory" compact /></Link>
        <div className="product-feature-stack">
          <Link className="product-feature product-feature-side" href={products[1].href}><div className="product-feature-copy"><span>02 / KUNDENDIALOG</span><h3>{products[1].label}</h3><p>{products[1].description}</p><strong>Bot entdecken <ArrowRight size={14} /></strong></div><ProductShot variant="whatsapp" compact /></Link>
          <Link className="product-feature product-feature-assistant" href={products[2].href}><div className="product-feature-copy"><span>03 / ORCHESTRIERUNG</span><h3>{products[2].label}</h3><p>{products[2].description}</p><strong>Assistent entdecken <ArrowRight size={14} /></strong></div><div className="assistant-blueprint" aria-hidden="true"><ProcessGlyph type="assistant" /><div><i /><i /><i /></div><span>VERSTEHEN</span><span>PRIORISIEREN</span><span>AUSFÜHREN</span></div></Link>
        </div>
      </div>
    </section>

    <section className="section insight-layer"><div className="container insight-editorial"><figure className="insight-photo"><Image src="/images/parts-specialist-workshop.jpg" alt="Teilespezialist prüft eine Bremsscheibe im Autoteilelager" fill sizes="(max-width: 760px) 100vw, 52vw" /></figure><div className="insight-content"><p className="eyebrow">FÜR DEINEN BETRIEB</p><h2>Software trifft echten Teilealltag.</h2><p className="section-lead">Ob Neu- oder Gebrauchtteil: Partsunion verbindet die Arbeit an Theke, Lager und Schreibtisch.</p><div className="insight-list">{insights.map((item, index) => <Link href={item.href} key={item.title}><span>0{index + 1}</span><div><small>{item.type}</small><h3>{item.title}</h3><p>{item.text}</p></div><ArrowRight /></Link>)}</div></div></div></section>

    <section className="section comparison-home"><div className="container comparison-home-grid"><div className="comparison-home-copy"><p className="eyebrow">SYSTEME VERGLEICHEN</p><h2>Passt die Software zum Teilehandel – oder muss der Teilehandel sich anpassen?</h2><p>Entscheidend ist nicht die längste Funktionsliste, sondern welche Daten und Arbeitsschritte bereits zusammengehören. Vergleiche Partsunion mit einem allgemeinen ERP und Tabellen anhand deiner täglichen Abläufe.</p><Link className="button button-light" href="/vergleich">Vollständigen Vergleich ansehen <ArrowRight /></Link></div><div className="comparison-preview" role="table" aria-label="Kurzvergleich von Softwareansätzen"><div className="comparison-preview-head" role="row"><span role="columnheader">Prüfpunkt</span><span role="columnheader">ERP</span><span role="columnheader">Tabellen</span><span role="columnheader">Partsunion</span></div>{comparison.map(([label, erp, sheets, partsunion]) => <div role="row" key={label}><strong role="rowheader">{label}</strong><span role="cell">{erp}</span><span role="cell">{sheets}</span><span className="comparison-best" role="cell"><Check size={14} />{partsunion}</span></div>)}</div></div></section>

    <section className="section resources container">
      <div className="section-top"><div><p className="eyebrow">WISSEN</p><h2>Praxiswissen für den Teilehandel</h2></div><Link className="button button-outline" href="/blog">Alle Beiträge <ArrowRight size={16} /></Link></div>
      <p className="scroll-hint">Seitlich wischen <ArrowRight /></p>
      <div className="resource-grid">{resources.map((item, index) => <Link className={`resource-card${index === 0 ? " resource-card-featured" : ""}`} href={item.href} key={item.title}><EditorialVisual variant={item.visual} index={index} /><div className="resource-copy"><span>{item.type}</span><h3>{item.title}</h3><p>{item.text}</p><strong>Beitrag lesen <ArrowRight size={14} /></strong></div></Link>)}</div>
    </section>

    <section className="home-consultation" id="kontakt"><div className="container home-consultation-grid"><div className="contact-heading"><p className="eyebrow">30 MINUTEN · UNVERBINDLICH</p><h2>Lass uns deinen Ablauf gemeinsam ansehen.</h2><p>Wir sprechen nicht allgemein über Software, sondern konkret über deinen Betrieb, passende Funktionen und den sinnvollsten nächsten Schritt.</p><ol><li><span>01</span>Betrieb und Sortiment</li><li><span>02</span>Heutige Abläufe</li><li><span>03</span>Passendes Setup</li></ol></div><ConsultationBooking compact /></div></section>
  </>;
}
