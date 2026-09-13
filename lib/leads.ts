import { leadContext } from "@/lib/attribution";

const CRM_LEADS_URL = process.env.NEXT_PUBLIC_CRM_LEADS_URL || "https://api.partsunion.de/api/crm/leads";
const FALLBACK_EMAIL = "info@partsunion.de";

export interface LeadInput {
  firma: string;
  ansprechpartner: string;
  telefon: string;
  email: string;
  nachricht: string;
  source: string;
  consent: boolean;
  metadata?: Record<string, unknown>;
  website?: string;
}

function mapSource(input: string): { source: string; tags: string[] } {
  const tags = ["Website-Lead"];
  if (input === "contact-page") return { source: "Website (Kontakt)", tags: [...tags, "Kontakt"] };
  if (input === "beratung") return { source: "Website (Beratungsformular)", tags: [...tags, "Beratung"] };
  return { source: "Website", tags };
}

export async function submitLead(input: LeadInput): Promise<void> {
  if (input.website) return;
  if (!input.consent) throw new Error("Bitte bestätige die Verwendung deiner Angaben für diese Anfrage.");
  const { source, tags } = mapSource(input.source);
  const context = leadContext();
  const contextNote = Object.keys(context).length ? `\n\nWebsite-Herkunft: ${Object.entries(context).map(([key, value]) => `${key}=${value}`).join(" | ")}` : "";
  const consentNote = `\nEinwilligung zur Anfragebearbeitung: ${new Date().toISOString()}`;
  const primaryNotes = `${input.nachricht.trim().slice(0, 1200)}${consentNote}`.trim();
  const payload = {
    company: input.firma.trim(),
    contactPerson: input.ansprechpartner.trim(),
    phone: input.telefon.trim(),
    email: input.email.trim().toLowerCase(),
    notes: `${primaryNotes}${contextNote.slice(0, Math.max(0, 2000 - primaryNotes.length))}`.trim(),
    source,
    status: "Neu",
    tags,
    consentGivenAt: new Date().toISOString(),
    metadata: { ...input.metadata, ...context },
  };
  let response: Response;
  try {
    response = await fetch(CRM_LEADS_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15000) });
  } catch {
    throw new Error(`Die Verbindung konnte nicht abgeschlossen werden. Deine Angaben bleiben erhalten. Bitte versuche es erneut oder schreibe an ${FALLBACK_EMAIL}.`);
  }
  if (!response.ok) {
    const message = response.status === 429 ? "Zu viele Anfragen. Bitte versuche es in einigen Minuten erneut." : response.status === 400 ? "Bitte prüfe deine Angaben und versuche es erneut." : "Deine Anfrage konnte nicht gesendet werden. Bitte versuche es erneut.";
    throw new Error(message);
  }
}
