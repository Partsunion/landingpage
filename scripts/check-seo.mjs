import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const output = join(root, 'out');
const errors = [];

const keyPages = [
    ['Startseite', 'index.html', 'https://partsunion.de'],
    ['Neuteile', 'plattform/neuteile.html', 'https://partsunion.de/plattform/neuteile'],
    ['Gebrauchtteile', 'plattform/gebrauchtteile.html', 'https://partsunion.de/plattform/gebrauchtteile'],
    ['Lösungen', 'loesungen.html', 'https://partsunion.de/loesungen'],
    ['Vergleich', 'vergleich.html', 'https://partsunion.de/vergleich'],
    ['Praxisratgeber', 'blog.html', 'https://partsunion.de/blog'],
    ['Unternehmen', 'about.html', 'https://partsunion.de/about'],
    ['Beratung', 'beratung.html', 'https://partsunion.de/beratung'],
];

function assert(condition, message) {
    if (!condition) errors.push(message);
}

function decodeText(value) {
    return value
        .replaceAll('&amp;', '&')
        .replaceAll('&quot;', '"')
        .replaceAll('&#x27;', "'")
        .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function contentOf(html, pattern) {
    return decodeText(html.match(pattern)?.[1]?.trim() ?? '');
}

async function exists(file) {
    return Boolean(await stat(file).catch(() => null));
}

async function htmlFiles(directory) {
    const files = [];
    for (const entry of await readdir(directory, { withFileTypes: true })) {
        const file = join(directory, entry.name);
        if (entry.isDirectory()) files.push(...await htmlFiles(file));
        else if (entry.name.endsWith('.html')) files.push(file);
    }
    return files;
}

const keyPageByFile = new Map(keyPages.map(([label, file, canonical]) => [file, { label, canonical }]));
const indexableCanonicals = [];
const exportedHtml = await htmlFiles(output).catch(() => []);

for (const absoluteFile of exportedHtml) {
    const file = relative(output, absoluteFile).split(sep).join('/');
    if (file === '404.html' || file === '_not-found.html') continue;

    const html = await readFile(absoluteFile, 'utf8');
    if (/<meta name="robots" content="[^"]*noindex/i.test(html)) continue;

    const keyPage = keyPageByFile.get(file);
    const label = keyPage?.label ?? file;
    const expectedCanonical = keyPage?.canonical
        ?? `https://partsunion.de/${file.replace(/\.html$/, '')}`;

    const title = contentOf(html, /<title>([^<]+)<\/title>/i);
    const description = contentOf(html, /<meta name="description" content="([^"]+)"\s*\/?>/i);
    const canonicalHref = contentOf(html, /<link rel="canonical" href="([^"]+)"\s*\/?>/i);
    const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;

    assert(title.length >= 15 && title.length <= 70, `${label}: Title hat ${title.length} statt 15–70 Zeichen.`);
    const minimumDescription = keyPage ? 90 : 70;
    assert(description.length >= minimumDescription && description.length <= 180, `${label}: Description hat ${description.length} statt ${minimumDescription}–180 Zeichen.`);
    assert(canonicalHref === expectedCanonical, `${label}: Canonical ist „${canonicalHref || 'fehlend'}“ statt „${expectedCanonical}“.`);
    assert(h1Count === 1, `${label}: erwartet genau eine H1, gefunden ${h1Count}.`);
    assert(/<meta property="og:title"/i.test(html), `${label}: og:title fehlt.`);
    assert(/<meta property="og:description"/i.test(html), `${label}: og:description fehlt.`);
    indexableCanonicals.push(canonicalHref);

    for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
        assert(/\balt="[^"]*"/i.test(image[0]), `${label}: Bild ohne alt-Attribut gefunden.`);
    }

    for (const link of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
        const href = link[1];
        if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/_next/')) continue;
        const path = href.split(/[?#]/)[0];
        if (!path) continue;
        const candidates = path === '/'
            ? [join(output, 'index.html')]
            : [join(output, `${path}.html`), join(output, path, 'index.html'), join(output, path)];
        const resolved = (await Promise.all(candidates.map(exists))).some(Boolean);
        assert(resolved, `${label}: interner Link „${href}“ hat kein Exportziel.`);
    }

    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
        try {
            JSON.parse(match[1]);
        } catch (error) {
            errors.push(`${label}: ungültiges JSON-LD (${error.message}).`);
        }
    }
}

const rootHtml = await readFile(join(output, 'index.html'), 'utf8').catch(() => '');
for (const schemaType of ['Organization', 'WebSite', 'SoftwareApplication', 'Service', 'FAQPage']) {
    assert(rootHtml.includes(`\"@type\":\"${schemaType}\"`), `Startseite: Schema-Typ ${schemaType} fehlt.`);
}

const robots = await readFile(join(output, 'robots.txt'), 'utf8').catch(() => '');
for (const bot of ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Claude-SearchBot', 'Google-Extended']) {
    const group = robots.match(new RegExp(`User-agent: ${bot}\\s+Allow: /`, 'i'));
    assert(Boolean(group), `robots.txt: ${bot} ist nicht ausdrücklich erlaubt.`);
}
for (const bot of ['GPTBot', 'ClaudeBot', 'CCBot', 'Bytespider']) {
    const group = robots.match(new RegExp(`User-agent: ${bot}\\s+Disallow: /`, 'i'));
    assert(Boolean(group), `robots.txt: Trainingscrawler ${bot} ist nicht ausdrücklich getrennt.`);
}
assert(robots.includes('Sitemap: https://partsunion.de/sitemap.xml'), 'robots.txt: kanonischer Sitemap-Hinweis fehlt.');

for (const file of ['llms.txt', 'llms-full.txt', 'sitemap.xml']) {
    const filePath = join(output, file);
    const info = await stat(filePath).catch(() => null);
    assert(Boolean(info?.isFile() && info.size > 100), `${file} fehlt oder ist leer.`);
}

const llms = await readFile(join(output, 'llms.txt'), 'utf8').catch(() => '');
assert(llms.includes('https://partsunion.de/vergleich'), 'llms.txt: sachlicher Systemvergleich fehlt.');
assert(llms.includes('https://partsunion.de/llms-full.txt'), 'llms.txt: Verweis auf ausführliche Produktfakten fehlt.');

const sitemap = await readFile(join(output, 'sitemap.xml'), 'utf8').catch(() => '');
for (const canonical of indexableCanonicals) {
    const sitemapUrl = canonical === 'https://partsunion.de' ? 'https://partsunion.de/' : canonical;
    assert(sitemap.includes(`<loc>${sitemapUrl}</loc>`), `sitemap.xml: ${sitemapUrl} fehlt.`);
}
assert(!sitemap.includes('<loc>https://partsunion.de/termin</loc>'), 'sitemap.xml: noindex-Seite /termin darf nicht enthalten sein.');
assert(!sitemap.includes('<loc>https://bot.partsunion.de</loc>'), 'sitemap.xml: noindex-Demo darf nicht enthalten sein.');
assert(!sitemap.includes(new Date().toISOString()), 'sitemap.xml: lastModified darf nicht bei jedem Build auf die aktuelle Uhrzeit springen.');

if (errors.length) {
    console.error(`SEO-Prüfung fehlgeschlagen (${errors.length}):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
} else {
    console.log(`SEO-Prüfung bestanden: ${indexableCanonicals.length} indexierbare Seiten, strukturierte Daten, Crawler-Regeln, Sitemap und AI-Faktendateien.`);
}
