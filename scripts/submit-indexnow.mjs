const site = (process.env.SITE_URL ?? "https://partsunion.de").replace(/\/$/, "");
const key = "d82f4a9c0e7b4f61a3c5d9082b7e614c";
const sitemapResponse = await fetch(`${site}/sitemap.xml`);

if (!sitemapResponse.ok) {
  throw new Error(`Sitemap konnte nicht geladen werden: HTTP ${sitemapResponse.status}`);
}

const sitemap = await sitemapResponse.text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (!urlList.length) {
  throw new Error("Die Sitemap enthält keine URLs.");
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(site).host,
    key,
    keyLocation: `${site}/${key}.txt`,
    urlList,
  }),
});

if (!response.ok) {
  throw new Error(`IndexNow-Anmeldung fehlgeschlagen: HTTP ${response.status}`);
}

console.log(`${urlList.length} kanonische URLs wurden an IndexNow gemeldet.`);
