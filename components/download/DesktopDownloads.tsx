import { Apple, ArrowDownToLine, Monitor, ShieldCheck, TriangleAlert } from 'lucide-react';
import { desktopFileSize, desktopPlatforms, desktopPreviewCatalog } from '@/lib/desktop-downloads';

export function DesktopDownloads() {
  return (
    <section id="downloads" className="dl-downloads" aria-labelledby="downloads-title">
      <div className="dl-section-heading">
        <div><p className="mk-kicker">Ein Download. Dein Partsunion.</p><h2 id="downloads-title">Wähle deinen Computer.</h2></div>
        <p className="dl-release" role="status" aria-live="polite">
          Prüfversion {desktopPreviewCatalog.version}
          <span>Bereitgestellt am {new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeZone: 'Europe/Berlin' }).format(new Date(desktopPreviewCatalog.releasedAt))}</span>
        </p>
      </div>
      <div className="dl-preview-notice">
        <TriangleAlert aria-hidden="true" />
        <p><strong>Vorabversion für Abnahme und Sales-Calls.</strong> Die Mac-Versionen sind signiert und von Apple notarisiert. Windows ist derzeit noch nicht öffentlich signiert und kann deshalb eine Herausgeberwarnung anzeigen. Diese Version wird nicht automatisch an bestehende Installationen verteilt.</p>
      </div>
      <div className="dl-platforms">
        {desktopPlatforms.map((platform) => {
          const download = desktopPreviewCatalog.downloads.find(({ id }) => id === platform.id);
          const Icon = platform.id === 'windows-x64' ? Monitor : Apple;
          if (!download) return null;
          return (
            <article className="dl-platform" key={platform.id} aria-labelledby={`download-${platform.id}`}>
              <div className="dl-platform-icon"><Icon aria-hidden="true" /></div>
              <h3 id={`download-${platform.id}`}>{platform.title}</h3>
              <p className="dl-platform-subtitle">{platform.subtitle}</p>
              <p className={`dl-verification dl-verification--${download.verification}`}>
                {download.verification === 'apple-signed-notarized' ? <ShieldCheck aria-hidden="true" /> : <TriangleAlert aria-hidden="true" />}
                {download.statusLabel}
              </p>
              <p className="dl-requirement">{platform.requirement}</p>
              <a href={download.url} className="dl-download-button" data-track={`Desktop preview download ${platform.id}`}><ArrowDownToLine aria-hidden="true" />{platform.action}</a>
              <p className="dl-file-meta">{platform.format} · {desktopFileSize(download.sizeBytes)}</p>
              {download.warning && <p className="dl-platform-warning">{download.warning}</p>}
              <details className="dl-checksum"><summary>SHA-256-Prüfsumme</summary><code>{download.sha256}</code></details>
            </article>
          );
        })}
      </div>
    </section>
  );
}
