import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep, extname } from 'node:path';
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.txt': 'text/plain',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.json': 'application/json',
};
export function acceptedCompression(header = '') {
  const values = new Map(
    String(header)
      .split(',')
      .map((part) => {
        const [name, ...params] = part.trim().split(';');
        const q = params.find((p) => p.trim().startsWith('q='));
        return [name.trim().toLowerCase(), q ? Number(q.trim().slice(2)) : 1];
      }),
  );
  return (
    ['br', 'gzip']
      .map((name) => ({ name, q: values.get(name) ?? values.get('*') ?? 0 }))
      .filter((item) => item.q > 0)
      .sort((a, b) => b.q - a.q)[0]?.name ?? null
  );
}
export async function compressedAssetIndex(directory) {
  const files = new Map();
  async function walk(folder) {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const file = join(folder, entry.name);
      if (entry.isDirectory()) await walk(file);
      else if (entry.name.endsWith('.br')) {
        const original = file.slice(0, -3),
          type = mime[extname(original)];
        if (!type) continue;
        const url = '/' + relative(directory, original).split(sep).join('/');
        const record = { file: original, type };
        // Keep serve-handler's redirects for explicit .html URLs.
        if (url.endsWith('/index.html')) files.set(url.slice(0, -10) || '/', record);
        else if (url.endsWith('.html')) files.set(url.slice(0, -5), record);
        else files.set(url, record);
      }
    }
  }
  await walk(directory);
  return files;
}
export async function serveCompressed(
  request,
  response,
  pathname,
  index,
  { privateResponse = false } = {},
) {
  if (!['GET', 'HEAD'].includes(request.method) || request.headers.range) return false;
  const encoding = acceptedCompression(request.headers['accept-encoding']);
  const record = index.get(pathname);
  if (!encoding || !record) return false;
  const file = record.file + (encoding === 'br' ? '.br' : '.gz');
  const info = await stat(file).catch(() => null);
  if (!info) return false;
  const etag = `"${info.size.toString(16)}-${Math.trunc(info.mtimeMs).toString(16)}-${encoding}"`;
  response.setHeader('Content-Type', record.type + '; charset=utf-8');
  response.setHeader('Content-Encoding', encoding);
  response.setHeader('Vary', 'Accept-Encoding');
  response.setHeader(
    'Cache-Control',
    privateResponse
      ? 'private, no-store'
      : pathname.startsWith('/_next/static/')
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=0, must-revalidate',
  );
  response.setHeader('ETag', etag);
  if (request.headers['if-none-match'] === etag) {
    response.writeHead(304);
    response.end();
    return true;
  }
  response.setHeader('Content-Length', info.size);
  response.writeHead(200);
  response.end(request.method === 'HEAD' ? undefined : await readFile(file));
  return true;
}
