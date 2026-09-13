import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const source = await readFile("components/ProductShot.tsx", "utf8");
const assets = [...source.matchAll(/src: "(\/product\/[^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(assets).size, 5, "ProductShot muss fünf eindeutige, kuratierte Produktoberflächen verwenden");

for (const asset of assets) {
  const path = `public${asset}`;
  const info = await stat(path);
  assert.ok(info.isFile() && info.size > 20_000, `${path} fehlt oder ist zu klein`);
}

const pages = {
  "loesungen/oe-ermittlung.html": "feature-theme-vehicle",
  "loesungen/bestand-lager.html": "feature-theme-stock",
  "whatsapp-bot.html": "feature-theme-chat",
  "buchhaltung-banking.html": "feature-theme-finance",
  "produktdaten.html": "product-explorer",
};
for (const [page, marker] of Object.entries(pages)) {
  const html = await readFile(`out/${page}`, "utf8");
  assert.ok(html.includes(marker), `${page}: erwarteter visueller Kontext ${marker} fehlt`);
}

console.log(`Produktbild-Prüfung bestanden: ${assets.length} kuratierte Screenshots und ${Object.keys(pages).length} Themenzuordnungen.`);
