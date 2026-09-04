import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import handler from 'serve-handler';
import { staticSegmentAliases } from './lib/static-segments.mjs';
import { compressedAssetIndex, serveCompressed } from './lib/compressed-assets.mjs';

const port = Number.parseInt(process.env.PORT ?? '8080', 10);
const publicDirectory = resolve(process.cwd(), 'out');
const maintenanceEnabled = process.env.MAINTENANCE_MODE === 'true';
const maintenanceHosts = new Set(
  (process.env.MAINTENANCE_HOSTS ?? 'partsunion.de,www.partsunion.de')
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean),
);
const passwordRecord = process.env.MAINTENANCE_PASSWORD_HASH ?? '';
const sessionSecret = process.env.MAINTENANCE_SESSION_SECRET ?? '';
const sessionTtlSeconds = Number.parseInt(
  process.env.MAINTENANCE_SESSION_TTL_SECONDS ?? '43200',
  10,
);
const secureCookie = process.env.MAINTENANCE_COOKIE_SECURE !== 'false';
const cookieName = secureCookie ? '__Host-pu_maintenance' : 'pu_maintenance';
const staticHandlerOptions = {
  public: publicDirectory,
  cleanUrls: true,
  directoryListing: false,
  headers: [
    {
      source: '**/_next/static/**',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '**/*.@(png|webp|woff2)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
    },
  ],
};
const segmentAliases = await staticSegmentAliases(publicDirectory);
const compressedAssets = await compressedAssetIndex(publicDirectory);

const attemptWindowMs = 10 * 60 * 1000;
const lockDurationMs = 15 * 60 * 1000;
const maxAttempts = 5;
const attemptsByIp = new Map();
const maintenancePublicAssets = new Set(['/logo-wordmark.png', '/favicon.png']);

if (!Number.isSafeInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be a valid TCP port');
}

if (maintenanceEnabled && (!passwordRecord || !sessionSecret || sessionSecret.length < 32)) {
  throw new Error('Maintenance mode requires a password hash and a session secret');
}

function normalizeHost(hostHeader = '') {
  const value = hostHeader.trim().toLowerCase();
  if (value.startsWith('[')) return value.slice(1, value.indexOf(']'));
  return value.split(':')[0];
}

function isGatedRequest(request) {
  return maintenanceEnabled && maintenanceHosts.has(normalizeHost(request.headers.host));
}

function safeReturnPath(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return '/';
  if (value.startsWith('/__maintenance/')) return '/';
  return value.slice(0, 2048);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function parseCookies(header = '') {
  return Object.fromEntries(
    header.split(';').flatMap((entry) => {
      const separator = entry.indexOf('=');
      if (separator < 1) return [];
      return [
        [entry.slice(0, separator).trim(), decodeURIComponent(entry.slice(separator + 1).trim())],
      ];
    }),
  );
}

function signSession(expiry) {
  const signature = createHmac('sha256', sessionSecret).update(String(expiry)).digest('base64url');
  return `${expiry}.${signature}`;
}

function hasValidSession(request) {
  const token = parseCookies(request.headers.cookie)[cookieName];
  if (!token) return false;
  const [expiryValue, signature] = token.split('.');
  const expiry = Number.parseInt(expiryValue, 10);
  if (!Number.isSafeInteger(expiry) || expiry <= Math.floor(Date.now() / 1000) || !signature)
    return false;

  const expected = createHmac('sha256', sessionSecret).update(expiryValue).digest();
  let supplied;
  try {
    supplied = Buffer.from(signature, 'base64url');
  } catch {
    return false;
  }
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

function verifyPassword(password) {
  const [algorithm, saltValue, expectedValue] = passwordRecord.split(':');
  if (algorithm !== 'scrypt-v1' || !saltValue || !expectedValue) return false;

  let salt;
  let expected;
  try {
    salt = Buffer.from(saltValue, 'base64url');
    expected = Buffer.from(expectedValue, 'base64url');
  } catch {
    return false;
  }
  if (salt.length < 16 || expected.length !== 64) return false;

  const supplied = scryptSync(password, salt, 64, {
    N: 16384,
    r: 8,
    p: 1,
    maxmem: 64 * 1024 * 1024,
  });
  return timingSafeEqual(supplied, expected);
}

function clientIp(request) {
  const forwarded = request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded)
    return forwarded.split(',')[0].trim().slice(0, 80);
  return request.socket.remoteAddress ?? 'unknown';
}

function rateLimitState(ip) {
  const now = Date.now();
  const current = attemptsByIp.get(ip);
  if (!current || current.windowEndsAt <= now) {
    const fresh = { count: 0, windowEndsAt: now + attemptWindowMs, lockedUntil: 0 };
    attemptsByIp.set(ip, fresh);
    return fresh;
  }
  return current;
}

function recordFailedAttempt(ip) {
  const state = rateLimitState(ip);
  state.count += 1;
  if (state.count >= maxAttempts) state.lockedUntil = Date.now() + lockDurationMs;
}

function clearAttempts(ip) {
  attemptsByIp.delete(ip);
}

function maintenancePage({ error = '', next = '/' } = {}) {
  const errorMarkup = error ? `<div class="error" role="alert">${escapeHtml(error)}</div>` : '';
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>Partsunion · Geschützter Zugang</title>
  <style>
    :root{color-scheme:dark;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}body{margin:0;min-height:100vh;background:#071b35;color:#fff}main{position:relative;min-height:100vh;display:grid;place-items:center;overflow:hidden;padding:28px}.grid{position:absolute;inset:0;opacity:.34;background-image:linear-gradient(rgba(91,151,230,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(91,151,230,.13) 1px,transparent 1px);background-size:38px 38px;mask-image:linear-gradient(135deg,#000,transparent 78%)}.glow{position:absolute;width:540px;height:540px;right:-160px;top:-180px;border-radius:50%;background:#1d6fe8;filter:blur(150px);opacity:.2}.shell{position:relative;width:min(100%,460px)}.brand{display:block;width:174px;height:auto;margin-bottom:26px}.card{border:1px solid #365f8d;border-radius:18px;background:rgba(11,38,73,.92);padding:32px;box-shadow:0 32px 85px rgba(0,0,0,.34);backdrop-filter:blur(14px)}.eyebrow{color:#8ab9fb;font-size:10px;font-weight:800;letter-spacing:.17em;text-transform:uppercase}.status{display:inline-flex;align-items:center;gap:7px;margin-top:18px;padding:7px 10px;border:1px solid #396897;border-radius:999px;background:#0e2e55;color:#9dc6fb;font-size:9px;font-weight:700}.dot{width:7px;height:7px;border-radius:50%;background:#52d090;box-shadow:0 0 14px rgba(82,208,144,.7)}h1{margin:18px 0 0;font-size:clamp(34px,8vw,48px);line-height:1.02;letter-spacing:-.05em}p{margin:17px 0 0;color:rgba(255,255,255,.62);font-size:14px;line-height:1.7}.form{margin-top:26px}.label{display:block;margin-bottom:8px;color:rgba(255,255,255,.72);font-size:11px;font-weight:700}.field{display:grid;grid-template-columns:1fr auto;gap:9px}.field input{min-width:0;height:50px;border:1px solid #456b96;border-radius:9px;background:#071c38;padding:0 14px;color:#fff;font-size:15px;outline:none}.field input:focus{border-color:#6aa5f3;box-shadow:0 0 0 3px rgba(62,139,236,.16)}button{height:50px;border:0;border-radius:9px;background:#1d6fe8;padding:0 18px;color:#fff;font-weight:750;cursor:pointer;box-shadow:0 12px 26px rgba(29,111,232,.25)}button:hover{background:#2c7bef}.error{margin-bottom:12px;border:1px solid rgba(239,118,118,.42);border-radius:8px;background:rgba(123,35,45,.28);padding:10px 12px;color:#ffd7d7;font-size:11px}.note{display:flex;gap:9px;margin-top:18px;color:rgba(255,255,255,.38);font-size:10px;line-height:1.55}.lock{color:#83b5f7}.footer{margin-top:20px;color:rgba(255,255,255,.28);font-size:9px;letter-spacing:.05em}@media(max-width:520px){main{align-items:start;padding:22px 16px}.shell{margin-top:6vh}.card{padding:24px}.field{grid-template-columns:1fr}button{width:100%}}
  </style>
</head>
<body>
  <main>
    <div class="grid" aria-hidden="true"></div><div class="glow" aria-hidden="true"></div>
    <div class="shell">
      <img class="brand" src="/logo-wordmark.png" width="391" height="92" alt="Partsunion">
      <section class="card">
        <div class="eyebrow">Geschützter Zugang</div>
        <div class="status"><span class="dot"></span> Neue Website bereit</div>
        <h1>Wir schrauben<br>noch kurz.</h1>
        <p>Die neue Partsunion Website ist bereits online, befindet sich aber noch im geschützten Wartungsmodus.</p>
        <form class="form" method="post" action="/__maintenance/unlock" autocomplete="off">
          <input type="hidden" name="next" value="${escapeHtml(next)}">
          ${errorMarkup}
          <label class="label" for="password">Zugangspasswort</label>
          <div class="field"><input id="password" name="password" type="password" maxlength="128" required autofocus autocomplete="current-password"><button type="submit">Website öffnen</button></div>
        </form>
        <div class="note"><span class="lock">◆</span><span>Nach erfolgreicher Eingabe wird eine geschützte Sitzung auf diesem Gerät eingerichtet.</span></div>
      </section>
      <div class="footer">PARTSUNION · SOFTWARE FÜR DEN AUTOTEILEHANDEL</div>
    </div>
  </main>
</body>
</html>`;
}

function sendHtml(response, status, html, retryAfter) {
  const body = Buffer.from(html);
  response.writeHead(status, {
    'Cache-Control': 'no-store, max-age=0',
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': body.length,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
    ...(retryAfter ? { 'Retry-After': String(retryAfter) } : {}),
  });
  response.end(body);
}

async function readForm(request) {
  return await new Promise((resolveForm, rejectForm) => {
    const chunks = [];
    let length = 0;
    request.on('data', (chunk) => {
      length += chunk.length;
      if (length > 8192) {
        rejectForm(new Error('request_too_large'));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on('end', () =>
      resolveForm(new URLSearchParams(Buffer.concat(chunks).toString('utf8'))),
    );
    request.on('error', rejectForm);
  });
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url ?? '/', 'http://localhost');
    const gated = isGatedRequest(request);

    if (gated && maintenancePublicAssets.has(requestUrl.pathname)) {
      await handler(request, response, staticHandlerOptions);
      return;
    }

    if (gated && requestUrl.pathname === '/__maintenance/logout') {
      response.writeHead(303, {
        'Cache-Control': 'no-store',
        'Set-Cookie': `${cookieName}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secureCookie ? '; Secure' : ''}`,
        Location: '/',
      });
      response.end();
      return;
    }

    if (gated && requestUrl.pathname === '/__maintenance/unlock') {
      if (request.method !== 'POST') {
        response.writeHead(405, { Allow: 'POST', 'Cache-Control': 'no-store' });
        response.end();
        return;
      }

      const origin = request.headers.origin;
      if (origin && new URL(origin).host !== request.headers.host) {
        response.writeHead(403, { 'Cache-Control': 'no-store' });
        response.end();
        return;
      }

      const ip = clientIp(request);
      const rate = rateLimitState(ip);
      if (rate.lockedUntil > Date.now()) {
        const seconds = Math.ceil((rate.lockedUntil - Date.now()) / 1000);
        sendHtml(
          response,
          429,
          maintenancePage({ error: 'Zu viele Fehlversuche. Bitte später erneut versuchen.' }),
          seconds,
        );
        return;
      }

      let form;
      try {
        form = await readForm(request);
      } catch {
        response.writeHead(413, { 'Cache-Control': 'no-store' });
        response.end();
        return;
      }

      const password = form.get('password') ?? '';
      const next = safeReturnPath(form.get('next'));
      if (password.length > 128 || !verifyPassword(password)) {
        recordFailedAttempt(ip);
        sendHtml(
          response,
          401,
          maintenancePage({ error: 'Das Passwort ist nicht korrekt.', next }),
        );
        return;
      }

      clearAttempts(ip);
      const expiry = Math.floor(Date.now() / 1000) + sessionTtlSeconds;
      response.writeHead(303, {
        'Cache-Control': 'no-store',
        'Set-Cookie': `${cookieName}=${encodeURIComponent(signSession(expiry))}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${sessionTtlSeconds}${secureCookie ? '; Secure' : ''}`,
        Location: next,
      });
      response.end();
      return;
    }

    if (gated && !hasValidSession(request)) {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.writeHead(403, { 'Cache-Control': 'no-store' });
        response.end();
        return;
      }
      const html = maintenancePage({
        next: safeReturnPath(requestUrl.pathname + requestUrl.search),
      });
      if (request.method === 'HEAD') {
        response.writeHead(503, {
          'Cache-Control': 'no-store, max-age=0',
          'Content-Type': 'text/html; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow, noarchive',
          'Retry-After': '3600',
        });
        response.end();
        return;
      }
      sendHtml(response, 503, html, 3600);
      return;
    }

    const decodedPath = decodeURIComponent(requestUrl.pathname);
    const segmentPath = segmentAliases.get(decodedPath);
    if (segmentPath) request.url = encodeURI(segmentPath) + requestUrl.search;
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (
      await serveCompressed(request, response, segmentPath || decodedPath, compressedAssets, {
        privateResponse: gated,
      })
    )
      return;
    await handler(request, response, staticHandlerOptions);
  } catch {
    if (!response.headersSent)
      response.writeHead(500, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      });
    response.end('Internal Server Error');
  }
});

server.listen(port, process.env.HOST || '0.0.0.0', () => {
  console.log(
    `Partsunion web server listening on port ${port}; maintenance=${maintenanceEnabled ? 'enabled' : 'disabled'}`,
  );
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
