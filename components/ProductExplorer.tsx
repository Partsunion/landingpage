"use client";

import { useState } from "react";
import { ProductShot, type ProductShotVariant } from "@/components/ProductShot";

const views: { id: ProductShotVariant; label: string; title: string; description: string; meta: string }[] = [
  { id: "order", label: "Verkauf", title: "Der komplette Arbeitstag auf einen Blick", description: "Offene Vorgänge, aktuelle Aufträge, Prioritäten und Direktzugriffe laufen in einem klaren Verkaufsarbeitsplatz zusammen.", meta: "VERKAUF / ARBEITSVORRAT" },
  { id: "inventory", label: "Lager", title: "Artikel und Bestand gemeinsam im Blick", description: "Bestände, Artikelinformationen und Warenbewegungen stehen deinem Team direkt im Vorgang zur Verfügung.", meta: "LAGER / ARTIKEL" },
  { id: "whatsapp", label: "Anfragen", title: "Alle Teileanfragen in einer Warteschlange", description: "WhatsApp- und manuelle Anfragen werden nach Status gefiltert, priorisiert und direkt zur Bearbeitung geöffnet.", meta: "ANFRAGEN / WHATSAPP" },
  { id: "oe", label: "OE-Ermittlung", title: "Vom Fahrzeug zur passenden Teilenummer", description: "Fahrzeugdaten, Teilebedarf und OE-Ergebnis werden gemeinsam geprüft und direkt weiterverwendet.", meta: "FAHRZEUG / OE" },
  { id: "finance", label: "Finanzen", title: "Forderungen und Handlungsbedarf sofort erkennen", description: "Finanzstatus, überfällige Posten und offene Aufgaben werden für den gewählten Betrieb transparent zusammengeführt.", meta: "FINANZEN / ÜBERSICHT" },
];

export function ProductExplorer() {
  const [active, setActive] = useState<ProductShotVariant>("order");
  const view = views.find((item) => item.id === active)!;
  return <div className="product-explorer">
    <div className="product-explorer-tabs" role="tablist" aria-label="Produktansicht auswählen">{views.map((item) => <button key={item.id} type="button" role="tab" aria-selected={active === item.id} onClick={() => setActive(item.id)}>{item.label}</button>)}</div>
    <div className="product-explorer-stage">
      <div className="product-explorer-copy"><p className="eyebrow">ECHTE PRODUKTANSICHT</p><h2>{view.title}</h2><p>{view.description}</p><div><span>Beispieldaten</span><strong>{view.meta}</strong></div></div>
      <div className="product-explorer-screen" key={view.id}><span><i /> LIVE WORKSPACE</span><ProductShot variant={view.id} priority /></div>
    </div>
  </div>;
}
