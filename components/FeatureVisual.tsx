import Image from "next/image";
import { ProcessGlyph, type ProcessGlyphType } from "@/components/ProcessGlyph";
import { featureFamilyFor } from "@/lib/feature-content";

type VisualKind = "assistant" | "vehicle" | "chat" | "stock" | "return" | "finance" | "mobile" | "core";

const visuals: Record<VisualKind, { src: string; alt: string; icon: ProcessGlyphType; status: string; focus: string; meta: string; crop: string; steps: string[] }> = {
  assistant: { src: "/product/native-assistant.jpg", alt: "Partsunion Automatisierungs-Control-Center mit Handlungsbedarf und Betriebsleitplanken", icon: "assistant", status: "BETRIEBSASSISTENT AKTIV", focus: "Prioritäten erkennen. Sicher handeln.", meta: "Handlungsbedarf · Playbooks · Leitplanken", crop: "DETAIL / HANDLUNGSBEDARF", steps: ["Vorgang verstehen", "Aufgabe priorisieren", "Team sicher durchführen"] },
  vehicle: { src: "/product/oe-ermittlung.png", alt: "Partsunion Fahrzeug- und OE-Ermittlung", icon: "vehicle", status: "FAHRZEUG ERKANNT", focus: "OE-Ergebnis direkt verwendbar", meta: "VIN · HSN/TSN · Teileposition", crop: "DETAIL / FAHRZEUGDATEN", steps: ["Fahrzeug", "Teilewunsch", "OE-Ergebnis"] },
  chat: { src: "/product/native-inbox-snippet.jpg", alt: "Partsunion Inbox mit WhatsApp- und manuellen Teileanfragen", icon: "assistant", status: "ANFRAGE VOLLSTÄNDIG", focus: "Vom Chat in den Verkauf", meta: "Kanal · Fahrzeug · Teilewunsch", crop: "DETAIL / ANFRAGESTATUS", steps: ["Nachricht", "Datencheck", "Übergabe"] },
  stock: { src: "/product/native-inventory.jpg", alt: "Partsunion Artikel- und Bestandsübersicht", icon: "inventory", status: "BESTAND SYNCHRON", focus: "Verfügbarkeit im Vorgang", meta: "Artikel · Lagerplatz · Reservierung", crop: "DETAIL / BESTAND", steps: ["Bedarf", "Beschaffung", "Bestand"] },
  return: { src: "/product/native-sales-work.jpg", alt: "Partsunion Arbeitsvorrat mit verbundenen Verkaufsvorgängen", icon: "return", status: "URSPRUNG GEFUNDEN", focus: "Retoure mit vollständigem Kontext", meta: "Beleg · Zustand · Entscheidung", crop: "DETAIL / URSPRUNGSBELEG", steps: ["Rückgabe", "Prüfung", "Gutschrift"] },
  finance: { src: "/product/native-finance-snippet.jpg", alt: "Partsunion Finanzübersicht mit offenen Posten", icon: "finance", status: "BELEGFLUSS VERBUNDEN", focus: "Zahlung und Beleg zugeordnet", meta: "Kasse · offene Posten · Buchhaltung", crop: "DETAIL / FINANZSTATUS", steps: ["Abschluss", "Zuordnung", "Übergabe"] },
  mobile: { src: "/product/native-inventory.jpg", alt: "Partsunion Bestand als mobiler Arbeitskontext", icon: "scan", status: "MOBIL SYNCHRON", focus: "Vor Ort erfassen", meta: "Foto · Teil · Lagerplatz", crop: "MOBILE ANSICHT", steps: ["Öffnen", "Erfassen", "Synchronisieren"] },
  core: { src: "/product/native-sales-work.jpg", alt: "Partsunion Arbeitsvorrat für den Autoteilehandel", icon: "flow", status: "WORKFLOW VERBUNDEN", focus: "Ein Vorgang. Ein gemeinsamer Status.", meta: "Verkauf · Lager · Finanzen", crop: "DETAIL / HANDLUNGSBEDARF", steps: ["Erfassen", "Bearbeiten", "Abschließen"] },
};

function kindFor(path: string): VisualKind {
  if (/betriebsassistent/.test(path)) return "assistant";
  return featureFamilyFor(path);
}

export function FeatureVisual({ path, labels }: { path: string; labels: string[] }) {
  const kind = kindFor(path);
  const visual = visuals[kind];
  return <div className={`feature-product-stage feature-composition feature-composition-${kind}`}>
    <span className="feature-composition-live"><i /> {visual.status}</span>
    <div className="feature-composition-window">
      <div className="feature-composition-bar"><i /><i /><i /><span>PARTSUNION / LIVE WORKSPACE</span></div>
      <div className="feature-composition-image"><Image src={visual.src} alt={visual.alt} fill priority sizes="(max-width: 760px) 92vw, 48vw" /></div>
    </div>
    <div className="feature-composition-crop" aria-hidden="true"><span>{visual.crop}</span><div><Image src={visual.src} alt="" fill sizes="(max-width: 760px) 58vw, 25vw" /></div></div>
    <div className="feature-composition-focus"><ProcessGlyph type={visual.icon} /><div><span>{visual.status}</span><strong>{visual.focus}</strong><small>{visual.meta}</small></div></div>
    <div className="feature-composition-steps" aria-label="Prozessschritte">{visual.steps.map((step, index) => <span key={step}><i>{index + 1}</i>{step}</span>)}</div>
    <small>{labels.join("  /  ")}</small>
  </div>;
}
