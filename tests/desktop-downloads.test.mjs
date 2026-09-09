import test from 'node:test';
import assert from 'node:assert/strict';
import { DESKTOP_CATALOG_URL, desktopPlatforms, desktopPreviewCatalog, parseDesktopCatalog, loadDesktopCatalog } from '../lib/desktop-downloads.ts';

const fixture = () => ({
  releaseAvailable: true, serviceConfigured: true, version: 'desktop-v1.0.44', releaseDate: '2026-09-07T10:00:00.000Z',
  platforms: desktopPlatforms.map((p) => ({ id: p.id, file: p.file, downloadUrl: `/api/desktop/download/${p.id}`, sizeBytes: 10485760 })),
});
test('veröffentlichte Windows- und Mac-Versionen führen ausschließlich zum Downloadservice', () => {
  const parsed = parseDesktopCatalog(fixture());
  assert.equal(parsed.available, true);
  assert.equal(parsed.version, '1.0.44');
  assert.equal(parsed.downloads.length, 3);
  for (const item of parsed.downloads) {
    assert.equal(item.url, `https://api.partsunion.de/api/desktop/download/${item.id}`);
    assert.equal(item.sha256, null);
  }
});
test('reine Mac-Veröffentlichung aktiviert keinen Windows-Download', () => {
  const data = fixture(); data.platforms.shift();
  assert.deepEqual(parseDesktopCatalog(data).downloads.map((p) => p.id), ['macos-arm64', 'macos-x64']);
});
test('öffentliche Prüfversion ist vollständig, unveränderlich und transparent gekennzeichnet', () => {
  assert.equal(desktopPreviewCatalog.version, '1.0.44');
  assert.deepEqual(desktopPreviewCatalog.downloads.map(({ id }) => id), desktopPlatforms.map(({ id }) => id));
  for (const download of desktopPreviewCatalog.downloads) {
    assert.match(download.url, /^https:\/\/github\.com\/Partsunion\/landingpage\/releases\/download\/desktop-preview-v1\.0\.44-c5774bc7\/Partsunion-(?:windows-x64\.msi|macos-(?:arm64|x64)\.dmg)$/);
    assert.match(download.sha256, /^[0-9a-f]{64}$/);
    assert.ok(Number.isSafeInteger(download.sizeBytes) && download.sizeBytes > 0);
  }
  const windows = desktopPreviewCatalog.downloads.find(({ id }) => id === 'windows-x64');
  assert.equal(windows?.verification, 'unsigned-review');
  assert.match(windows?.warning ?? '', /Unbekannter Herausgeber/);
  assert.ok(desktopPreviewCatalog.downloads.filter(({ verification }) => verification === 'apple-signed-notarized').length === 2);
});
test('nicht veröffentlichte Releases bekommen keinen erfundenen Download', () => {
  assert.deepEqual(parseDesktopCatalog({ releaseAvailable: false, version: null, releaseDate: null, platforms: [], serviceConfigured: false }), { available: false });
});
test('Prüfsummen werden nur zusammen mit unveränderlichen versionsgebundenen URLs angezeigt', () => {
  const data = fixture();
  for (const p of data.platforms) { p.immutableDownloadUrl = `/api/desktop/download/1.0.44/${p.id}`; p.sha256 = 'a'.repeat(64); }
  const parsed = parseDesktopCatalog(data);
  assert.ok(parsed.downloads.every((p) => p.url.includes('/1.0.44/') && p.sha256 === 'a'.repeat(64)));
});
const invalidCases = [
  ['Fremdhost', (d) => { d.platforms[0].downloadUrl = 'https://example.org/setup.msi'; }],
  ['JavaScript-Link', (d) => { d.platforms[0].downloadUrl = 'javascript:alert(1)'; }],
  ['Protokoll-relativer Link', (d) => { d.platforms[0].downloadUrl = '//example.org/setup.msi'; }],
  ['Dateipfad', (d) => { d.platforms[0].file = '../../setup.msi'; }],
  ['Plattformverwechslung', (d) => { d.platforms[0].file = d.platforms[1].file; }],
  ['Doppelte Plattform', (d) => { d.platforms[1] = d.platforms[0]; }],
  ['Unbekannte Plattform', (d) => { d.platforms[0].id = 'windows-arm64'; }],
  ['Unbekannte Größe', (d) => { d.platforms[0].sizeBytes = null; }],
  ['Größe als Text', (d) => { d.platforms[0].sizeBytes = '10485760'; }],
  ['Leere Datei', (d) => { d.platforms[0].sizeBytes = 0; }],
  ['Zu große Datei', (d) => { d.platforms[0].sizeBytes = 2147483649; }],
  ['Gebrochene Größe', (d) => { d.platforms[0].sizeBytes = 0.5; }],
  ['Release ohne Dateien', (d) => { d.platforms = []; }],
  ['Nicht konfigurierter Service', (d) => { d.serviceConfigured = false; }],
  ['Widersprüchliche Verfügbarkeit', (d) => { d.releaseAvailable = false; }],
  ['Preview-Version', (d) => { d.version = 'desktop-v1.0.44-preview'; }],
  ['Versionspfad', (d) => { d.version = '../1.0.44'; }],
  ['Versionsnormalisierung', (d) => { d.version = 'desktop-v01.0.44'; }],
  ['Ungültiges Datum', (d) => { d.releaseDate = '2026-02-30T10:00:00.000Z'; }],
  ['Datum ohne Zeitzone', (d) => { d.releaseDate = '2026-09-07T10:00:00'; }],
  ['Fremde feste URL', (d) => { d.platforms[0].immutableDownloadUrl = 'https://example.org/setup.msi'; d.platforms[0].sha256 = 'a'.repeat(64); }],
  ['Falsche feste Version', (d) => { d.platforms[0].immutableDownloadUrl = '/api/desktop/download/1.0.43/windows-x64'; d.platforms[0].sha256 = 'a'.repeat(64); }],
  ['Fehlende Prüfsumme', (d) => { d.platforms[0].immutableDownloadUrl = '/api/desktop/download/1.0.44/windows-x64'; }],
];
for (const [label, change] of invalidCases) test(`Fehler wird gesperrt: ${label}`, () => {
  const data = fixture(); change(data); assert.throws(() => parseDesktopCatalog(data));
});
test('kein ungeprüfter Wert wird als Release interpretiert', () => {
  for (const value of [null, [], {}, 'ready', { releaseAvailable: 'true', platforms: [] }]) assert.throws(() => parseDesktopCatalog(value));
});
test('Katalogabruf sendet keine Kontodaten und verwendet weder Cache noch Weiterleitungen', async () => {
  const controller = new AbortController();
  const result = await loadDesktopCatalog(controller.signal, async (url, options) => {
    assert.equal(url, DESKTOP_CATALOG_URL);
    assert.equal(options.signal, controller.signal);
    assert.equal(options.credentials, 'omit'); assert.equal(options.cache, 'no-store'); assert.equal(options.redirect, 'error');
    return Response.json(fixture());
  });
  assert.equal(result.available, true);
});
test('Serverausfall, HTML-Fehlerseite und kaputtes JSON sind kein leerer erfolgreicher Katalog', async () => {
  for (const response of [Response.json(fixture(), { status: 503 }), new Response('<html>Fehler</html>', { headers: { 'Content-Type': 'text/html' } }), new Response('{', { headers: { 'Content-Type': 'application/json' } })]) {
    await assert.rejects(loadDesktopCatalog(new AbortController().signal, async () => response));
  }
});
test('überlange Streaming-Antwort wird auch ohne Content-Length abgebrochen', async () => {
  let cancelled = false;
  const body = new ReadableStream({ pull(controller) { controller.enqueue(new Uint8Array(40000)); }, cancel() { cancelled = true; } });
  await assert.rejects(loadDesktopCatalog(new AbortController().signal, async () => new Response(body, { headers: { 'Content-Type': 'application/json' } })));
  assert.equal(cancelled, true);
});
test('fehlerhaftes UTF-8 wird nicht in ersetzte Metadaten umgewandelt', async () => {
  await assert.rejects(loadDesktopCatalog(new AbortController().signal, async () => new Response(new Uint8Array([0xc3, 0x28]), { headers: { 'Content-Type': 'application/json' } })));
});
