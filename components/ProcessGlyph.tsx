export type ProcessGlyphType = "vehicle" | "order" | "purchase" | "inventory" | "finance" | "checkout" | "return" | "scan" | "match" | "flow" | "record" | "assistant";

export function glyphForPath(path: string): ProcessGlyphType {
  if (/oe-|oem|vin|fahrzeug/.test(path)) return "vehicle";
  if (/whatsapp|anfragen|assistent/.test(path)) return "assistant";
  if (/lager|bestand|gebraucht|produktdaten/.test(path)) return "inventory";
  if (/retour/.test(path)) return "return";
  if (/kasse/.test(path)) return "checkout";
  if (/finanz|bank|buchhaltung|rechnung|datev|pricing/.test(path)) return "finance";
  if (/einkauf|disposition/.test(path)) return "purchase";
  if (/angebot|auftrag|bestell/.test(path)) return "order";
  if (/automatis|skalier|geschwindigkeit|team/.test(path)) return "flow";
  return "record";
}

export function ProcessGlyph({ type, className = "" }: { type: ProcessGlyphType; className?: string }) {
  const common = { className: `process-glyph ${className}`, viewBox: "0 0 48 48", "aria-hidden": true };
  if (type === "vehicle") return <svg {...common}><path d="M7 29h34l-3-10H12L7 29Zm4 0v7m26-7v7M15 24h5m8 0h5"/><path d="M15 19l3-7h12l3 7"/><circle cx="15" cy="33" r="2"/><circle cx="33" cy="33" r="2"/><path className="glyph-accent" d="M21 8h6"/></svg>;
  if (type === "order") return <svg {...common}><path d="M12 7h24v34H12zM18 15h12M18 22h12M18 29h7"/><path className="glyph-accent" d="m28 32 3 3 7-8"/></svg>;
  if (type === "purchase") return <svg {...common}><path d="M8 11h5l4 20h19l4-14H15M20 37h.1M34 37h.1"/><path className="glyph-accent" d="M26 8v13m-5-5 5 5 5-5"/></svg>;
  if (type === "inventory") return <svg {...common}><path d="m7 15 17-8 17 8-17 8-17-8Zm0 0v19l17 8 17-8V15M24 23v19"/><path className="glyph-accent" d="m16 11 17 8"/></svg>;
  if (type === "finance") return <svg {...common}><path d="M8 13h32v27H8zM8 20h32M14 27h9M14 33h14"/><path className="glyph-accent" d="M31 26h4v8h-4z"/></svg>;
  if (type === "checkout") return <svg {...common}><path d="M10 8h28v33H10zM15 14h18v8H15zM16 29h2m6 0h2m6 0h2M16 35h2m6 0h2m6 0h2"/><path className="glyph-accent" d="M35 5v7"/></svg>;
  if (type === "return") return <svg {...common}><path d="M15 15H7V7M8 15a17 17 0 1 1 1 20"/><path d="M17 20h18v15H17zM17 26h18"/><path className="glyph-accent" d="m25 11 4-4 4 4"/></svg>;
  if (type === "scan") return <svg {...common}><path d="M8 18V8h10M30 8h10v10M40 30v10H30M18 40H8V30M14 24h20"/><path className="glyph-accent" d="M17 19h14v10H17z"/></svg>;
  if (type === "match") return <svg {...common}><circle cx="20" cy="20" r="11"/><path d="m28 28 11 11M15 20h10M20 15v10"/><path className="glyph-accent" d="m31 12 3 3 7-8"/></svg>;
  if (type === "flow") return <svg {...common}><rect x="6" y="7" width="14" height="12"/><rect x="28" y="29" width="14" height="12"/><path d="M20 13h9a6 6 0 0 1 6 6v10M28 35h-9a6 6 0 0 1-6-6V19"/><path className="glyph-accent" d="m31 25 4 4 4-4"/></svg>;
  if (type === "record") return <svg {...common}><path d="M10 7h28v34H10zM17 15h14M17 22h14M17 29h8"/><path className="glyph-accent" d="M32 28v8m-4-4h8"/></svg>;
  if (type === "assistant") return <svg {...common}><path d="M9 10h30v24H24l-9 7v-7H9zM16 18h16M16 25h10"/><path className="glyph-accent" d="M34 5v8M30 9h8"/></svg>;
  return null;
}
