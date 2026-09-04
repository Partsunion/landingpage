# Partsunion Website

## Getting Started

Die Website wird mit Next.js statisch exportiert. Lokal starten:

```bash
npm install
npm run dev
```

Danach [http://localhost:3000](http://localhost:3000) öffnen.

## Qualität und SEO

```bash
npm run lint
npm run build
npm run seo:check
```

`seo:check` prüft nach dem Build alle indexierbaren HTML-Seiten auf Title,
Description, selbstreferenzierendes Canonical, genau eine H1, Open-Graph-Daten,
gültiges JSON-LD und Aufnahme in die Sitemap. Zusätzlich werden `robots.txt`,
`llms.txt` und `llms-full.txt` kontrolliert.

Such- und Antwortbots wie OAI-SearchBot, PerplexityBot und Claude-SearchBot sind
in `public/robots.txt` erlaubt. Reine Trainingscrawler werden separat behandelt.
Die Trennung darf nicht versehentlich wieder zusammengeführt werden.

Verifizierungscodes werden beim Build über diese Variablen gesetzt:

```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
NEXT_PUBLIC_BING_SITE_VERIFICATION=...
```

Nach Aufhebung des Wartungsmodus:

1. `https://partsunion.de/robots.txt` und `/sitemap.xml` ohne Passwort prüfen.
2. Domain in Google Search Console und Bing Webmaster Tools verifizieren.
3. Sitemap in beiden Diensten einreichen.
4. Indexierung der Startseite, Plattformseiten, Lösungen, Vergleichsseite und
   Praxisratgeber kontrollieren.
5. Keine erfundenen Bewertungen, Rankings oder nicht belegten Leistungswerte
   in Text oder strukturierten Daten ergänzen; `CLAIMS_EVIDENCE.md` beachten.

Der Produktionsserver ignoriert ein versehentlich stehen gebliebenes
`MAINTENANCE_MODE=true`. Eine vollständige öffentliche Abschaltung ist nur als
bewusster Notfallpfad möglich, wenn zusätzlich
`MAINTENANCE_DEPLOY_CONFIRMATION=BLOCK_PUBLIC_SEARCH_AND_USERS` gesetzt ist.
Dieser Pfad darf nur kurzzeitig aktiv sein, weil er Nutzern und Suchmaschinen
HTTP 503 ausliefert.
