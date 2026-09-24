import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { ProductShot } from "@/components/ProductShot";
import { ConsultationBooking } from "@/components/ConsultationBooking";
import { glyphForPath, ProcessGlyph } from "@/components/ProcessGlyph";
import { ContentHubPage } from "@/components/ContentHubPage";
import { DownloadPage, ImplementationPage, ProductViewsPage } from "@/components/DedicatedPages";
import { FeaturePage } from "@/components/FeaturePage";
import { AboutPage, ArticlePage, ComparisonPage, ContactPage, LegalPage, PricingPage } from "@/components/SpecialPages";
import { AppointmentResponse } from "@/components/AppointmentResponse";
import { allRoutes, groupByPath, navGroups, routeByPath } from "@/lib/site-data";

function humanize(value: string) { return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ") }

export function InnerPage({ path }: { path: string }) {
  if (path === "/termin") return <AppointmentResponse />;
  if (path === "/bot") return <FeaturePage path="/whatsapp-bot" />;
  if (path === "/blog/retourenquote-autoteilehandel-senken") return <ArticlePage path="/blog/retourenquote-autoteilhandel-senken" />;
  if (path === "/blog") return <ContentHubPage type="blog" />;
  if (path === "/contact" || path === "/beratung") return <ContactPage consultation={path === "/beratung"} />;
  if (path === "/pricing") return <PricingPage />;
  if (path === "/vergleich") return <ComparisonPage />;
  if (path === "/produktdaten") return <ProductViewsPage />;
  if (path === "/live-demo") return <ProductViewsPage demo />;
  if (path === "/einfuehrung") return <ImplementationPage />;
  if (path === "/download") return <DownloadPage />;
  if (path === "/about") return <AboutPage />;
  if (path.startsWith("/legal/")) return <LegalPage path={path} />;
  if (path.startsWith("/blog/")) return <ArticlePage path={path} />;
  if (path.startsWith("/features/") || path.startsWith("/loesungen/") || ["/whatsapp-bot", "/betriebsassistent", "/buchhaltung-banking", "/automatisierung-autoteilehandel", "/plattform/neuteile", "/plattform/gebrauchtteile", "/live-demo/teileermittlung"].includes(path)) return <FeaturePage path={path} />;
  const route = routeByPath(path);
  const group = groupByPath(path);
  const title = route?.label ?? humanize(path.split("/").filter(Boolean).at(-1) ?? "Seite");
  const description = route?.description ?? "Entdecke Funktionen und Abläufe für deinen Autoteilehandel.";
  const isOverview = path === "/features" || navGroups.some((item) => item.href === path);
  const overviewItems = path === "/features"
    ? allRoutes.filter((item) => item.href.startsWith("/features/"))
    : path === "/loesungen"
      ? allRoutes.filter((item) => item.href.startsWith("/loesungen/"))
      : group?.items;
  const related = isOverview ? group?.items : group?.items.filter((item) => item.href !== path).slice(0, 3);
  const fallbackRelated = navGroups.flatMap((item) => item.items).filter((item) => item.href !== path).slice(0, 3);

  return <>
    <section className="inner-hero">
      <div className="container breadcrumbs"><Link href="/">Startseite</Link><ChevronRight />{group && group.href !== path && <><Link href={group.href}>{group.label}</Link><ChevronRight /></>}<span>{title}</span></div>
      <div className="container inner-hero-grid"><div><p className="eyebrow">{group?.eyebrow ?? "PARTSUNION"}</p><h1>{title}</h1><p>{description} Entwickelt für Teilehändler, die schneller arbeiten, Fehler vermeiden und alle Vorgänge im Blick behalten wollen.</p><div className="hero-actions"><Link className="button button-primary" href="/beratung">Beratung vereinbaren <ArrowRight /></Link><Link className="text-link" href="/produktdaten">Produkt ansehen <ArrowRight /></Link></div></div><div className="inner-product-stage"><span>PARTSUNION / VERBUNDENER WORKFLOW</span><ProductShot variant="order" priority /><i>ANFRAGE → AUFTRAG → BELEG</i></div></div>
    </section>

    {isOverview ? <section className="section container listing-section">
      <p className="eyebrow">FUNKTIONEN IM ÜBERBLICK</p><h2>{group?.label}: alles an einem Ort</h2><p className="section-lead">Wähle den Bereich, der in deinem Betrieb gerade den größten Unterschied macht.</p>
      <p className="scroll-hint">Seitlich wischen <ArrowRight /></p>
      <div className="listing-grid listing-grid-editorial">{overviewItems?.map((item, index) => <Link href={item.href} className={`listing-card${index === 0 ? " listing-card-featured" : ""}`} key={item.href}><ProcessGlyph type={glyphForPath(item.href)} /><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.label}</h3><p>{item.description}</p><strong>Mehr erfahren <ArrowRight /></strong></Link>)}</div>
    </section> : <>
      <section className="section container two-column"><div><p className="eyebrow">MEHR ZEIT FÜRS KERNGESCHÄFT</p><h2>Für echte Abläufe im Teilehandel gebaut</h2><p>Partsunion verbindet Fahrzeug, Teil, Kunde, Auftrag und Zahlung in einem nachvollziehbaren Vorgang. So bleibt dein Team schnell – an der Theke, im Lager und im Büro.</p></div><div className="benefit-list">{["Weniger doppelte Dateneingaben", "Klare Status für jeden Vorgang", "Neuteile und Gebrauchtteile abbilden", "Mit Betrieb und Sortiment skalieren"].map((item) => <div key={item}><Check /><span>{item}</span></div>)}</div></section>
      <section className="feature-band"><div className="container feature-band-grid"><ProductShot variant="inventory" /><div><p className="eyebrow">EIN VORGANG STATT VIELE INSELLÖSUNGEN</p><h2>Von der Anfrage bis zur Buchhaltung verbunden</h2><p>Kundendialog, OE-Ermittlung, Angebot, Einkauf, Lager, Kasse und Belege arbeiten auf einer gemeinsamen Grundlage. Informationen bleiben dort, wo dein Team sie wiederfindet.</p><Link className="button button-light" href="/plattform">Plattform entdecken <ArrowRight /></Link></div></div></section>
      <section className="section container stats-section"><div><strong>56</strong><span>Marken mit Nutzungsrechten</span></div><div><strong>80%</strong><span>der weltweiten VINs decodierbar</span></div><div><strong>1</strong><span>durchgängiger Workflow</span></div></section>
    </>}

    {!isOverview && <section className="section related-layer"><div className="container"><p className="eyebrow">WEITER ENTDECKEN</p><h2>Das passt zu deinem nächsten Schritt</h2><div className="related-grid">{(related?.length ? related : fallbackRelated).map((item) => <Link href={item.href} key={item.href}><span>{group?.label ?? "Partsunion"}</span><h3>{item.label}</h3><p>{item.description}</p><strong>Mehr erfahren <ArrowRight /></strong></Link>)}</div></div></section>}
    <section className="section contact-section container"><div className="contact-heading"><p className="eyebrow">DEIN NÄCHSTER SCHRITT</p><h2>Zeig uns, wie dein Teilehandel arbeitet</h2><p>Wähle einen Termin. In 30 Minuten schauen wir gemeinsam auf Sortiment, Team und Prozesse – und zeigen dir Partsunion passend zu deinem Betrieb.</p></div><ConsultationBooking compact /></section>
  </>;
}
