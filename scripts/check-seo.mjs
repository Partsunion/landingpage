import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const output = join(root, "out");
const origin = "https://partsunion.de";
const errors = [];

function assert(condition, message) { if (!condition) errors.push(message); }
function decode(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<").replaceAll("&gt;", ">").replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}
function content(html, pattern) { return decode(html.match(pattern)?.[1]?.trim() ?? ""); }
async function exists(file) { return Boolean(await stat(file).catch(() => null)); }
async function htmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(file));
    else if (entry.name.endsWith(".html")) files.push(file);
  }
  return files;
}

const records = [];
for (const absolute of await htmlFiles(output).catch(() => [])) {
  const file = relative(output, absolute).split(sep).join("/");
  if (["404.html", "_not-found.html"].includes(file)) continue;
  const html = await readFile(absolute, "utf8");
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  const path = file === "index.html" ? "/" : `/${file.replace(/\.html$/, "")}`;
  const title = content(html, /<title>([^<]+)<\/title>/i);
  const description = content(html, /<meta name="description" content="([^"]+)"\s*\/?>/i);
  const canonical = content(html, /<link rel="canonical" href="([^"]+)"\s*\/?>/i);

  assert((html.match(/<h1(?:\s|>)/gi) ?? []).length === 1, `${path}: genau eine H1 erwartet.`);
  assert(/<meta property="og:title"/i.test(html), `${path}: og:title fehlt.`);
  assert(/<meta property="og:description"/i.test(html), `${path}: og:description fehlt.`);
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) assert(/\balt="[^"]*"/i.test(image[0]), `${path}: Bild ohne alt-Attribut.`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch (error) { errors.push(`${path}: ungültiges JSON-LD (${error.message}).`); }
  }
  for (const link of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
    const href = link[1].split(/[?#]/)[0];
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/_next/")) continue;
    const candidates = href === "/" ? [join(output, "index.html")] : [join(output, `${href}.html`), join(output, href, "index.html"), join(output, href)];
    assert((await Promise.all(candidates.map(exists))).some(Boolean), `${path}: interner Link ${href} hat kein Exportziel.`);
  }
  if (noindex) continue;
  assert(title.length >= 15 && title.length <= 65, `${path}: Title hat ${title.length} statt 15–65 Zeichen.`);
  assert(description.length >= 110 && description.length <= 170, `${path}: Description hat ${description.length} statt 110–170 Zeichen.`);
  const expected = path === "/" ? origin : `${origin}${path}`;
  assert(canonical === expected, `${path}: Canonical ist ${canonical || "nicht gesetzt"} statt ${expected}.`);
  records.push({ path, title, canonical, links: [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map((match) => match[1].split(/[?#]/)[0]) });
}

for (const [field, values] of [["Title", records.map((item) => [item.title, item.path])], ["Canonical", records.map((item) => [item.canonical, item.path])]]) {
  const seen = new Map();
  for (const [value, path] of values) seen.set(value, [...(seen.get(value) ?? []), path]);
  for (const [value, paths] of seen) assert(paths.length === 1, `${field} doppelt auf ${paths.join(", ")}: ${value}`);
}

const incoming = new Map(records.map((item) => [item.path, 0]));
for (const item of records) for (const href of item.links) if (incoming.has(href) && href !== item.path) incoming.set(href, incoming.get(href) + 1);
for (const [path, count] of incoming) if (path !== "/") assert(count > 0, `${path}: keine eingehende interne Verlinkung.`);

const rootHtml = await readFile(join(output, "index.html"), "utf8").catch(() => "");
for (const type of ["Organization", "WebSite", "SoftwareApplication", "Service", "FAQPage"]) assert(rootHtml.includes(`\"@type\":\"${type}\"`), `Startseite: Schema-Typ ${type} fehlt.`);

const robots = await readFile(join(output, "robots.txt"), "utf8").catch(() => "");
for (const bot of ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Google-Extended"]) assert(new RegExp(`User-Agent: ${bot}\\s+Allow: /`, "i").test(robots), `robots.txt: ${bot} ist nicht ausdrücklich erlaubt.`);
for (const bot of ["GPTBot", "ClaudeBot", "CCBot", "Bytespider"]) assert(new RegExp(`User-Agent: ${bot}\\s+Disallow: /`, "i").test(robots), `robots.txt: ${bot} ist nicht getrennt.`);
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "robots.txt: Sitemap-Hinweis fehlt.");

for (const file of ["llms.txt", "llms-full.txt", "sitemap.xml"]) {
  const info = await stat(join(output, file)).catch(() => null);
  assert(Boolean(info?.isFile() && info.size > 100), `${file} fehlt oder ist leer.`);
}
const llms = await readFile(join(output, "llms.txt"), "utf8").catch(() => "");
assert(llms.includes(`${origin}/vergleich`), "llms.txt: Systemvergleich fehlt.");
assert(llms.includes(`${origin}/llms-full.txt`), "llms.txt: ausführliche Produktfakten fehlen.");
const sitemap = await readFile(join(output, "sitemap.xml"), "utf8").catch(() => "");
for (const { canonical } of records) assert(sitemap.includes(`<loc>${canonical}</loc>`), `sitemap.xml: ${canonical} fehlt.`);
for (const alias of ["/termin", "/bot", "/blog/retourenquote-autoteilehandel-senken", "/live-demo/teileermittlung"]) assert(!sitemap.includes(`<loc>${origin}${alias}</loc>`), `sitemap.xml: Alias/noindex ${alias} darf nicht enthalten sein.`);

const download = await readFile(join(output, "download.html"), "utf8").catch(() => "");
assert(download.includes("Windows") && download.includes("macOS"), "Download: Windows- oder macOS-Information fehlt.");
assert(download.includes("desktop-preview-v1.0.44-c5774bc7"), "Download: geprüfte Desktop-Version 1.0.44 fehlt.");

for (const [path, canonical] of [["termin.html", "/beratung"], ["bot.html", "/whatsapp-bot"], ["blog/retourenquote-autoteilehandel-senken.html", "/blog/retourenquote-autoteilhandel-senken"]]) {
  const html = await readFile(join(output, path), "utf8").catch(() => "");
  assert(/<meta name="robots" content="[^"]*noindex/i.test(html), `Legacy-URL /${path.replace(/\.html$/, "")}: noindex fehlt.`);
  assert(html.includes(`rel="canonical" href="${origin}${canonical}"`), `Legacy-URL /${path.replace(/\.html$/, "")}: Canonical fehlt.`);
}

if (errors.length) {
  console.error(`SEO-Prüfung fehlgeschlagen (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`SEO-Prüfung bestanden: ${records.length} indexierbare Seiten, interne Links, strukturierte Daten, Crawler-Regeln, URL-Aliase und AI-Faktendateien.`);
}
