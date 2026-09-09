'use client';

import { useEffect, useState } from 'react';
import { Apple, ArrowDownToLine, Monitor, RefreshCw } from 'lucide-react';
import { desktopFileSize, desktopPlatforms, loadDesktopCatalog, type DesktopCatalog } from '@/lib/desktop-downloads';

type CatalogState = { status: 'loading' | 'error' } | { status: 'loaded'; catalog: DesktopCatalog };

export function DesktopDownloads() {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<CatalogState>({ status: 'loading' });
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    void loadDesktopCatalog(controller.signal).then(
      (catalog) => { if (active) setState({ status: 'loaded', catalog }); },
      () => { if (active) setState({ status: 'error' }); },
    ).finally(() => clearTimeout(timer));
    return () => { active = false; clearTimeout(timer); controller.abort(); };
  }, [attempt]);
  const catalog = state.status === 'loaded' && state.catalog.available ? state.catalog : null;
  const retry = () => { setState({ status: 'loading' }); setAttempt((value) => value + 1); };

  return (
    <section id="downloads" className="dl-downloads" aria-labelledby="downloads-title" aria-busy={state.status === 'loading'}>
      <div className="dl-section-heading">
        <div><p className="mk-kicker">Ein Download. Dein Partsunion.</p><h2 id="downloads-title">Wähle deinen Computer.</h2></div>
        <p className="dl-release" role="status" aria-live="polite">
          {catalog ? <>Version {catalog.version}<span>Veröffentlicht am {new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeZone: 'Europe/Berlin' }).format(new Date(catalog.releasedAt))}</span></>
            : state.status === 'loading' ? 'Verfügbarkeit wird geprüft …'
              : state.status === 'error' ? 'Downloads konnten nicht geladen werden.'
                : 'Die Kundenversion wird für den Download vorbereitet.'}
        </p>
      </div>
      <div className="dl-platforms">
        {desktopPlatforms.map((platform) => {
          const download = catalog?.downloads.find(({ id }) => id === platform.id);
          const Icon = platform.id === 'windows-x64' ? Monitor : Apple;
          return (
            <article className="dl-platform" key={platform.id} aria-labelledby={`download-${platform.id}`}>
              <div className="dl-platform-icon"><Icon aria-hidden="true" /></div>
              <h3 id={`download-${platform.id}`}>{platform.title}</h3>
              <p className="dl-platform-subtitle">{platform.subtitle}</p>
              <p className="dl-requirement">{platform.requirement}</p>
              {download ? <a href={download.url} className="dl-download-button" data-track={`Desktop download ${platform.id}`}><ArrowDownToLine aria-hidden="true" />{platform.action}</a>
                : <button type="button" className="dl-download-button" disabled>{state.status === 'loading' ? 'Wird geprüft …' : state.status === 'error' ? 'Derzeit nicht erreichbar' : 'Download folgt'}</button>}
              <p className="dl-file-meta">{platform.format}{download ? ` · ${desktopFileSize(download.sizeBytes)}` : ' · Installationsdatei'}</p>
              {download?.sha256 && <details className="dl-checksum"><summary>SHA-256-Prüfsumme</summary><code>{download.sha256}</code></details>}
            </article>
          );
        })}
      </div>
      {state.status !== 'loading' && <div className="dl-refresh"><p>{state.status === 'error' ? 'Prüfe deine Internetverbindung und versuche es erneut. Bei Fragen helfen wir dir über den Kontakt weiter.' : 'Die Verfügbarkeit kommt direkt von unserem Downloadservice.'}</p><button type="button" onClick={retry}><RefreshCw aria-hidden="true" />Erneut prüfen</button></div>}
      <noscript><p>Bitte aktiviere JavaScript, um die aktuelle Downloadverfügbarkeit zu prüfen, oder <a href="/contact">kontaktiere uns für den passenden Installer</a>.</p></noscript>
    </section>
  );
}
