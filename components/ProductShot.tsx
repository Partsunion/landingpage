import Image from "next/image";

const shots = {
  oe: { src: "/product/oe-ermittlung.png", alt: "Partsunion OE-Suche mit Fahrzeug- und Produktdaten", width: 2070, height: 810 },
  order: { src: "/product/native-sales-work.jpg", alt: "Partsunion Verkaufsarbeitsplatz mit Aufträgen, Prioritäten und Direktzugriff", width: 2000, height: 1250 },
  inventory: { src: "/product/native-inventory.jpg", alt: "Partsunion Artikel- und Bestandsübersicht mit Filtern, Preisen und Lagerstatus", width: 2000, height: 1250 },
  whatsapp: { src: "/product/native-inbox-snippet.jpg", alt: "Partsunion Anfrageeingang mit WhatsApp- und manuellen Teileanfragen", width: 1930, height: 1025 },
  finance: { src: "/product/native-finance-snippet.jpg", alt: "Partsunion Finanzübersicht mit Forderungen, Verbindlichkeiten und Handlungsbedarf", width: 1940, height: 1020 },
} as const;

export type ProductShotVariant = keyof typeof shots;

export function ProductShot({ variant, priority = false, compact = false }: { variant: ProductShotVariant; priority?: boolean; compact?: boolean }) {
  const shot = shots[variant];
  return <figure className={`product-shot product-shot-${variant}${compact ? " product-shot-compact" : ""}`}>
    <div className="product-shot-bar"><span /><span /><span /><small>PARTSUNION / LIVE WORKSPACE</small></div>
    <div className="product-shot-image"><Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} preload={priority} fetchPriority={priority ? "high" : undefined} sizes="(max-width: 760px) 100vw, 50vw" /></div>
  </figure>;
}
