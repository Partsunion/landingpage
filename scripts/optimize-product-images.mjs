import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
// Format/size conversion only: product screenshots retain their actual content.
for (const filename of await readdir('public/product')) {
  if (!filename.endsWith('.png')) continue;
  const source = join('public/product', filename);
  await sharp(source).webp({ quality: 86, effort: 6 }).toFile(source.replace('.png', '.webp'));
  await sharp(source)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(source.replace('.png', '-1600.webp'));
}
console.log('Responsive WebP product screenshots generated.');
