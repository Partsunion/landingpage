"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarCheck, CalendarX, ExternalLink, LoaderCircle, ShieldCheck } from "lucide-react";
import { resolveAppointmentResponse, respondToAppointment, type AppointmentResponseView } from "@/lib/consultation-booking";

type Phase = "loading" | "ready" | "saving" | "accepted" | "declined" | "error";

export function AppointmentResponse() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [token, setToken] = useState("");
  const [appointment, setAppointment] = useState<AppointmentResponseView | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = new URLSearchParams(window.location.hash.slice(1)).get("t")?.trim() || "";
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    let active = true;
    void Promise.resolve().then(async () => {
      if (!/^[A-Za-z0-9_-]{32,200}$/.test(raw)) throw new Error("Dieser Termin-Link ist ungültig oder nicht mehr aktiv.");
      const next = await resolveAppointmentResponse(raw);
      if (!active) return;
      setToken(raw);
      setAppointment(next);
      setPhase("ready");
    }).catch((cause: unknown) => {
      if (!active) return;
      setError(cause instanceof Error ? cause.message : "Der Termin konnte nicht geladen werden.");
      setPhase("error");
    });
    return () => { active = false; };
  }, []);

  async function respond(action: "accept" | "decline") {
    if (!token || phase !== "ready") return;
    setPhase("saving");
    try {
      const next = await respondToAppointment(token, action);
      setAppointment(next);
      setPhase(action === "accept" ? "accepted" : "declined");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Ihre Antwort konnte nicht gespeichert werden.");
      setPhase("error");
    }
  }

  const meetingUrl = appointment?.location && /^https:\/\//i.test(appointment.location) ? appointment.location : null;
  return <section className="section container appointment-response-wrap"><div className="appointment-response-card">
    {phase === "loading" && <div className="appointment-response-state"><LoaderCircle className="appointment-response-spinner" /><h1>Termin wird geladen</h1><p>Wir prüfen den geschützten Termin-Link.</p></div>}
    {phase === "error" && <div className="appointment-response-state"><CalendarX /><p className="eyebrow">TERMIN-LINK</p><h1>Termin konnte nicht geöffnet werden</h1><p>{error}</p><a className="button button-primary" href="mailto:info@partsunion.de">Partsunion kontaktieren</a></div>}
    {(phase === "accepted" || phase === "declined") && <div className="appointment-response-state">{phase === "accepted" ? <CalendarCheck /> : <CalendarX />}<p className="eyebrow">ANTWORT GESPEICHERT</p><h1>{phase === "accepted" ? "Vielen Dank – dein Termin ist bestätigt." : "Deine Absage wurde gespeichert."}</h1><p>{phase === "accepted" ? "Wir freuen uns auf das Gespräch. Den Teams-Link findest du hier und in deiner E-Mail." : "Unser Vertriebsteam sieht die Absage sofort im CRM."}</p>{phase === "accepted" && meetingUrl ? <a className="button button-primary" href={meetingUrl} target="_blank" rel="noreferrer">Teams-Besprechung öffnen <ExternalLink /></a> : <Link className="text-link" href="/beratung">Neuen Termin auswählen</Link>}</div>}
    {(phase === "ready" || phase === "saving") && appointment && <>
      <div className="appointment-response-head"><div><p className="eyebrow">PARTSUNION BERATUNG</p><h1>Bitte bestätige deinen Termin</h1><p>Deine Buchung ist reserviert. Mit deiner Rückmeldung weiß unser Vertriebsteam sicher, dass du teilnimmst.</p></div><ShieldCheck /></div>
      <dl className="appointment-response-details"><div><dt>Termin</dt><dd>{appointment.startLabel}</dd></div><div><dt>Dauer</dt><dd>{appointment.durationMinutes} Minuten</dd></div><div><dt>Ansprechpartner</dt><dd>{appointment.assigneeName || "Partsunion-Team"}</dd></div><div><dt>Format</dt><dd>{meetingUrl ? "Microsoft Teams" : appointment.location || "Online / Telefon"}</dd></div></dl>
      {meetingUrl && <a className="appointment-response-meeting" href={meetingUrl} target="_blank" rel="noreferrer">Teams-Besprechung öffnen <ExternalLink /></a>}
      <div className="appointment-response-actions"><button className="button button-primary" disabled={phase === "saving"} onClick={() => void respond("accept")}>{phase === "saving" ? <LoaderCircle className="appointment-response-spinner" /> : <CalendarCheck />} Termin bestätigen</button><button className="button appointment-response-decline" disabled={phase === "saving"} onClick={() => void respond("decline")}><CalendarX /> Termin absagen</button></div>
    </>}
  </div></section>;
}
