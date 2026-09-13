"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProcessGlyph, type ProcessGlyphType } from "@/components/ProcessGlyph";
import { ProductShot, type ProductShotVariant } from "@/components/ProductShot";

const stages: { code: string; label: string; title: string; copy: string; status: string; icon: ProcessGlyphType; shot: ProductShotVariant }[] = [
  { code: "01", label: "Anfrage", title: "Der Teilewunsch kommt strukturiert an.", copy: "WhatsApp- und manuelle Anfragen landen mit Kanal, Fahrzeug und Bearbeitungsstatus in einer gemeinsamen Warteschlange.", status: "150 OFFENE ANFRAGEN", icon: "assistant", shot: "whatsapp" },
  { code: "02", label: "Identifikation", title: "Fahrzeug und Teil werden eindeutig zugeordnet.", copy: "VIN, HSN/TSN und OE-Informationen bleiben direkt am Vorgang und können ohne erneute Eingabe weiterverwendet werden.", status: "FAHRZEUG / OE", icon: "vehicle", shot: "oe" },
  { code: "03", label: "Bestand", title: "Verfügbarkeit wird im selben Ablauf geprüft.", copy: "Artikel, Lagerstatus, Preise und Bestand stehen dort bereit, wo dein Team die Verkaufsentscheidung trifft.", status: "1.000 ARTIKEL", icon: "inventory", shot: "inventory" },
  { code: "04", label: "Abschluss", title: "Auftrag, Zahlung und Beleg bleiben verbunden.", copy: "Der Vorgang endet nicht an der Kasse: offene Posten und Finanzstatus bleiben für die weitere Bearbeitung sichtbar.", status: "BELEGFLUSS VERBUNDEN", icon: "finance", shot: "finance" },
];

export function WorkflowShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % stages.length), 4800);
    return () => window.clearInterval(timer);
  }, [paused]);

  const stage = stages[active];

  return <section className="workflow-showcase" aria-labelledby="workflow-showcase-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    <div className="container workflow-showcase-grid">
      <div className="workflow-showcase-copy">
        <p className="eyebrow">ECHTE SYSTEMANSICHTEN</p>
        <h2 id="workflow-showcase-title">Ein Vorgang bewegt sich durch das gesamte System.</h2>
        <p>Vier Arbeitsschritte, dieselbe Datenbasis. Wähle einen Schritt oder beobachte, wie der Vorgang automatisch weiterläuft.</p>
        <div className="workflow-stage-tabs" role="tablist" aria-label="Arbeitsschritt auswählen">{stages.map((item, index) => <button key={item.code} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}><span>{item.code}</span><ProcessGlyph type={item.icon} /><strong>{item.label}</strong><i /></button>)}</div>
      </div>
      <div className="workflow-stage" key={stage.code}>
        <div className="workflow-stage-head"><span><i /> LIVE WORKSPACE</span><strong>{stage.code} / 04</strong></div>
        <ProductShot variant={stage.shot} />
        <div className="workflow-stage-note"><span>{stage.status}</span><h3>{stage.title}</h3><p>{stage.copy}</p><div>{stage.label}<ArrowRight /></div></div>
      </div>
    </div>
  </section>;
}
