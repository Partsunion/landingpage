import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';
import { brotliCompress, gzip, constants } from 'node:zlib';
const br = promisify(brotliCompress);
const gz = promisify(gzip);
const root = resolve('out');
let count = 0;
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (/\.(html|css|js|txt|svg|xml|json)$/.test(entry.name)) {
      const data = await readFile(file);
      if (data.length < 1024) continue;
      const [brotli, zipped] = await Promise.all([
        br(data, { params: { [constants.BROTLI_PARAM_QUALITY]: 8 } }),
        gz(data, { level: 9 }),
      ]);
      await Promise.all([writeFile(file + '.br', brotli), writeFile(file + '.gz', zipped)]);
      count++;
    }
  }
}
await walk(root);
console.log(`Brotli and gzip prepared for ${count} exported text assets.`);
