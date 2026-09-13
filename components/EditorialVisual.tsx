import { ProductShot, type ProductShotVariant } from "@/components/ProductShot";

const visualLabels: Record<ProductShotVariant, [string, string]> = {
  order: ["VERKAUF", "ARBEITSVORRAT"],
  inventory: ["LAGER", "BESTAND"],
  whatsapp: ["ANFRAGEN", "WHATSAPP"],
  oe: ["FAHRZEUG", "OE-ABGLEICH"],
  finance: ["FINANZEN", "BELEGFLUSS"],
};

export function EditorialVisual({ variant, index = 0 }: { variant: ProductShotVariant; index?: number }) {
  const [area, detail] = visualLabels[variant];
  return <div className={`editorial-visual editorial-visual-${index % 4}`}>
    <div className="editorial-visual-code"><span>PU / 0{index + 1}</span><strong>{area}</strong></div>
    <ProductShot variant={variant} compact />
    <div className="editorial-visual-caption"><i /><span>{detail}</span></div>
  </div>;
}
