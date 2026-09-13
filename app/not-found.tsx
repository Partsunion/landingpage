import Link from "next/link";

export default function NotFound() {
  return <section className="not-found container"><p className="eyebrow">FEHLER 404</p><h1>Diese Seite gibt es nicht.</h1><p>Vielleicht wurde sie verschoben oder der Link ist nicht mehr aktuell.</p><Link className="button button-primary" href="/">Zur Startseite</Link></section>;
}
