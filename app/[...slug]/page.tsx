import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/InnerPage";
import { canonicalPathFor, featureProfile, isIndexablePath, seoTitleFor } from "@/lib/feature-content";
import { allRoutes, routeByPath } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string[] }> };

function metadataDescription(primary: string, detail: string) {
  const combined = `${primary} ${detail}`.trim();
  const expanded = combined.length < 120 ? `${combined} Lerne den verbundenen Partsunion-Workflow für deinen Autoteilehandel kennen.` : combined;
  if (expanded.length <= 160) return expanded;
  const shortened = expanded.slice(0, 157);
  return `${shortened.slice(0, shortened.lastIndexOf(" "))} …`;
}

export function generateStaticParams() {
  return allRoutes.map((route) => ({ slug: route.href.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const route = routeByPath(path);
  if (!route) return {};
  const canonical = canonicalPathFor(path);
  const featurePage = canonical.startsWith("/features/") || canonical.startsWith("/loesungen/") || ["/whatsapp-bot", "/betriebsassistent", "/buchhaltung-banking", "/automatisierung-autoteilehandel", "/plattform/neuteile", "/plattform/gebrauchtteile", "/live-demo/teileermittlung"].includes(canonical);
  const profile = featurePage ? featureProfile(canonical, route.label, route.description) : null;
  const description = metadataDescription(route.description, profile?.result ?? "Erfahre, wie Partsunion deinen Autoteilehandel im Alltag unterstützt.");
  return {
    title: featurePage ? seoTitleFor(canonical, route.label) : route.label,
    description,
    keywords: featurePage ? [route.label, "Software für Autoteilehändler", "ERP Autoteilehandel", "Warenwirtschaft Autoteilehandel", profile!.source, profile!.connection] : undefined,
    robots: isIndexablePath(path) ? undefined : { index: false, follow: true },
    alternates: { canonical },
    openGraph: { title: `${route.label} | Partsunion`, description, url: canonical, siteName: "Partsunion", locale: "de_DE", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${route.label} in Partsunion` }] },
    twitter: { card: "summary_large_image", title: `${route.label} | Partsunion`, description, images: ["/opengraph-image"] },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  if (!routeByPath(path)) notFound();
  const route = routeByPath(path)!;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://partsunion.de";
  const canonical = canonicalPathFor(path);
  const featurePage = canonical.startsWith("/features/") || canonical.startsWith("/loesungen/") || ["/whatsapp-bot", "/betriebsassistent", "/buchhaltung-banking", "/automatisierung-autoteilehandel", "/plattform/neuteile", "/plattform/gebrauchtteile", "/live-demo/teileermittlung"].includes(canonical);
  const profile = featurePage ? featureProfile(canonical, route.label, route.description) : null;
  const breadcrumb = {
      "@type": "BreadcrumbList",
      "@id": `${base}${path}#breadcrumb`,
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Startseite", item: base }, ...path.split("/").filter(Boolean).map((part, index, parts) => ({
        "@type": "ListItem",
        position: index + 2,
        name: index === parts.length - 1 ? route.label : part.replaceAll("-", " "),
        item: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://partsunion.de"}/${parts.slice(0, index + 1).join("/")}`,
      }))],
  };
  const graph: Record<string, unknown>[] = [{
    "@type": "WebPage",
    "@id": `${base}${canonical}#webpage`,
    name: route.label,
    description: profile ? `${route.description} ${profile.result}` : route.description,
    url: `${base}${canonical}`,
    inLanguage: "de-DE",
    isPartOf: { "@id": `${base}/#website` },
    about: { "@id": `${base}/#software` },
    breadcrumb: { "@id": `${base}${path}#breadcrumb` },
  }, breadcrumb];
  if (profile) graph.push({
    "@type": "FAQPage",
    "@id": `${base}${canonical}#fragen`,
    mainEntity: profile.faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  });
  const schema = { "@context": "https://schema.org", "@graph": graph };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><InnerPage path={path} /></>;
}
