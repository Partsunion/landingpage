import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { productImages } from '../lib/product-images.ts';

for (const [key, asset] of Object.entries(productImages)) {
  for (const extension of ['.png', '.webp', '-1600.webp']) {
    const metadata = await sharp(`public/product/${key}${extension}`).metadata();
    const width = extension === '-1600.webp' ? Math.min(1600, asset.width) : asset.width;
    assert.equal(metadata.width, width, `${key}${extension}: width`);
    assert.ok(Math.abs(metadata.height - (asset.height * width / asset.width)) <= 1, `${key}${extension}: aspect ratio`);
  }
}

const routes = {
  'loesungen/oe-ermittlung': 'oe-ermittlung',
  'loesungen/angebot-auftrag': 'verkauf-auftrag',
  'loesungen/einkauf-disposition': 'einkauf-bestellung',
  'loesungen/bestand-lager': 'lager-artikel',
  'loesungen/retouren': 'retouren-rma',
  'loesungen/finanzen-kasse': 'kasse-verkauf',
  'loesungen/betriebsassistent': 'assistent-arbeitsablaeufe',
  'loesungen/anfragen-whatsapp': 'whatsapp-dialog',
  'whatsapp-bot': 'whatsapp-dialog',
  'betriebsassistent': 'assistent-arbeitsablaeufe',
  'buchhaltung-banking': 'banking-abgleich',
  'einfuehrung': 'arbeitstag',
  'plattform/gebrauchtteile': 'gebrauchtteile-bestand',
  'plattform/neuteile': 'verkauf-auftrag',
};
for (const [route, key] of Object.entries(routes)) {
  const html = await readFile(`out/${route}.html`, 'utf8');
  assert.ok(html.includes(`data-product-image="${key}"`), `${route}: expected screenshot ${key}`);
}
const mobile = await readFile('out/loesungen/haendler-app.html', 'utf8');
assert.ok(mobile.includes('keine Bildschirmaufnahme der App'));
assert.ok(!mobile.includes('data-product-image='), 'Mobile app must not show a desktop screenshot');
console.log(`Checked ${Object.keys(productImages).length} screenshot assets and ${Object.keys(routes).length + 1} topic mappings.`);
