"use client";

import { useState } from "react";
import { Check, Minus, X } from "lucide-react";

type Row = { label: string; partsunion: string; erp: string; sheets: string; pu: string; ge: string; sh: string };

function StatusIcon({ value }: { value: string }) {
  if (value === "yes") return <Check aria-hidden="true" />;
  if (value === "partial") return <Minus aria-hidden="true" />;
  return <X aria-hidden="true" />;
}

export function MobileComparison({ rows }: { rows: Row[] }) {
  const [mode, setMode] = useState<"erp" | "sheets">("erp");
  return <div className="mobile-comparison">
    <div className="mobile-comparison-switch" aria-label="Vergleich auswählen">
      <button className={mode === "erp" ? "active" : ""} type="button" aria-pressed={mode === "erp"} onClick={() => setMode("erp")}>Allgemeines ERP</button>
      <button className={mode === "sheets" ? "active" : ""} type="button" aria-pressed={mode === "sheets"} onClick={() => setMode("sheets")}>Tabellen</button>
    </div>
    <div className="mobile-comparison-list">{rows.map((row) => {
      const competitorText = mode === "erp" ? row.erp : row.sheets;
      const competitorState = mode === "erp" ? row.ge : row.sh;
      return <article key={row.label}><h3>{row.label}</h3><div className="mobile-compare-answer best"><small>Partsunion</small><StatusIcon value={row.pu} /><span>{row.partsunion}</span></div><div className="mobile-compare-answer"><small>{mode === "erp" ? "ERP / WaWi" : "Tabellen"}</small><StatusIcon value={competitorState} /><span>{competitorText}</span></div></article>;
    })}</div>
  </div>;
}
