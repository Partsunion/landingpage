export type AnalyticsClickKind = "internal" | "outbound" | "contact" | "submit" | "action";

export interface AnalyticsClickInput {
  explicitTarget?: string;
  href?: string;
  ariaLabel?: string;
  isSubmit?: boolean;
  page: string;
  placement: string;
  origin: string;
}

function safeLabel(value: string | undefined, fallback: string) {
  const normalized = String(value || "").replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim();
  if (!normalized || normalized.includes("@") || /\+?\d[\d\s()./-]{6,}/.test(normalized)) return fallback;
  return normalized.slice(0, 80);
}

function pagePath(value: string) {
  return (value.startsWith("/") ? value : "/").split(/[?#]/, 1)[0].slice(0, 160) || "/";
}

export function analyticsClick(input: AnalyticsClickInput) {
  const page = pagePath(input.page);
  const placement = safeLabel(input.placement, "content").toLocaleLowerCase("de-DE");
  if (input.href) {
    if (/^mailto:/i.test(input.href)) return { page, placement, target: safeLabel(input.explicitTarget, "E-Mail Kontakt"), destination: "mailto", kind: "contact" as const };
    if (/^tel:/i.test(input.href)) return { page, placement, target: safeLabel(input.explicitTarget, "Telefonkontakt"), destination: "tel", kind: "contact" as const };
    try {
      const url = new URL(input.href, input.origin);
      const internal = url.origin === new URL(input.origin).origin;
      const destination = internal ? pagePath(url.pathname) : url.hostname.slice(0, 120);
      return { page, placement, target: safeLabel(input.explicitTarget, internal ? `Link ${destination}` : `Outbound ${destination}`), destination, kind: internal ? "internal" as const : "outbound" as const };
    } catch { return { page, placement, target: safeLabel(input.explicitTarget, "Link"), destination: "", kind: "action" as const }; }
  }
  if (input.isSubmit) return { page, placement, target: safeLabel(input.explicitTarget || input.ariaLabel, "Formular absenden"), destination: page, kind: "submit" as const };
  return { page, placement, target: safeLabel(input.explicitTarget || input.ariaLabel, "Schaltfläche"), destination: "", kind: "action" as const };
}
