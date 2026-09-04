import { readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

/** Next's exported segment files may be nested while the router requests a
 * dotted segment name. Build aliases from actual files, never from user paths. */
export async function staticSegmentAliases(directory) {
  const aliases = new Map();
  async function walk(folder) {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const file = join(folder, entry.name);
      if (entry.isDirectory() && entry.name !== '_next') await walk(file);
      else if (entry.isFile() && entry.name.endsWith('.txt')) {
        const pathname = '/' + relative(directory, file).split(sep).join('/');
        const marker = pathname.indexOf('/__next.');
        if (marker < 0) continue;
        const alias =
          pathname.slice(0, marker + 1) + pathname.slice(marker + 1).replaceAll('/', '.');
        if (alias !== pathname) {
          if (aliases.has(alias) && aliases.get(alias) !== pathname)
            throw new Error(`Conflicting segment alias: ${alias}`);
          aliases.set(alias, pathname);
        }
      }
    }
  }
  await walk(directory);
  return aliases;
}
