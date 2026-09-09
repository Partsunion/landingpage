export const DESKTOP_API_ORIGIN = 'https://api.partsunion.de';
export const DESKTOP_CATALOG_URL = `${DESKTOP_API_ORIGIN}/api/desktop/info`;

export const desktopPlatforms = [
  { id: 'windows-x64', title: 'Windows', subtitle: 'Intel- und AMD-Prozessoren · 64 Bit', requirement: 'Windows 11 · x64', file: 'Partsunion-windows-x64.msi', format: 'MSI', action: 'Für Windows herunterladen' },
  { id: 'macos-arm64', title: 'Mac mit Apple Chip', subtitle: 'Apple Silicon · M-Serie', requirement: 'macOS 13.3 oder neuer', file: 'Partsunion-macos-arm64.dmg', format: 'DMG', action: 'Für Apple Chip herunterladen' },
  { id: 'macos-x64', title: 'Mac mit Intel-Chip', subtitle: 'Intel-Prozessoren · 64 Bit', requirement: 'macOS 13.3 oder neuer', file: 'Partsunion-macos-x64.dmg', format: 'DMG', action: 'Für Intel-Mac herunterladen' },
] as const;

export type DesktopPlatformId = (typeof desktopPlatforms)[number]['id'];
export type DesktopDownload = { id: DesktopPlatformId; url: string; sizeBytes: number; sha256: string | null };
export type DesktopCatalog =
  | { available: false }
  | { available: true; version: string; releasedAt: string; downloads: DesktopDownload[] };

export type DesktopPreviewDownload = DesktopDownload & {
  verification: 'apple-signed-notarized' | 'unsigned-review';
  statusLabel: string;
  warning: string | null;
};

const DESKTOP_PREVIEW_RELEASE_URL = 'https://github.com/Partsunion/landingpage/releases/download/desktop-preview-v1.0.44-c5774bc7';

/**
 * Immutable, reviewed download set for direct customer evaluation. Keeping the
 * full URLs and digests in source means an API response cannot redirect a
 * visitor to another host or silently exchange an installer.
 */
export const desktopPreviewCatalog = {
  version: '1.0.44',
  releasedAt: '2026-09-09T13:37:26.000Z',
  downloads: [
    {
      id: 'windows-x64',
      url: `${DESKTOP_PREVIEW_RELEASE_URL}/Partsunion-windows-x64.msi`,
      sizeBytes: 9_179_136,
      sha256: 'abad66e2ebc01d0ecf5d4ace373fd85c5672709d7931bb0cacc442e8da9a9160',
      verification: 'unsigned-review',
      statusLabel: 'Prüfversion · nicht signiert',
      warning: 'Windows kann „Unbekannter Herausgeber“ anzeigen.',
    },
    {
      id: 'macos-arm64',
      url: `${DESKTOP_PREVIEW_RELEASE_URL}/Partsunion-macos-arm64.dmg`,
      sizeBytes: 6_946_970,
      sha256: '341d2f9d69e43035e27c3d47a7b463ba58cc53de6e24ee13f8f29728cc5b15d6',
      verification: 'apple-signed-notarized',
      statusLabel: 'Von Apple notarisiert',
      warning: null,
    },
    {
      id: 'macos-x64',
      url: `${DESKTOP_PREVIEW_RELEASE_URL}/Partsunion-macos-x64.dmg`,
      sizeBytes: 7_318_873,
      sha256: '5e521795a7809b96bb3c5e3593c792278289b83ad535f69e686bc93f1aa344de',
      verification: 'apple-signed-notarized',
      statusLabel: 'Von Apple notarisiert',
      warning: null,
    },
  ] satisfies DesktopPreviewDownload[],
} as const;

const stableVersion = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const maximumCatalogBytes = 32 * 1024;
const maximumInstallerBytes = 2 * 1024 * 1024 * 1024;

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function invalid(): never { throw new Error('Der Downloadkatalog ist nicht gültig.'); }

/** Only the canonical release service can supply installers. Never follow a wire-provided host. */
export function parseDesktopCatalog(value: unknown): DesktopCatalog {
  if (!record(value) || typeof value.releaseAvailable !== 'boolean' || !Array.isArray(value.platforms)) return invalid();
  if (!value.releaseAvailable) {
    if (value.platforms.length !== 0 || value.version !== null || value.releaseDate !== null) return invalid();
    return { available: false };
  }
  if (value.serviceConfigured !== true || typeof value.version !== 'string') return invalid();
  const version = value.version.replace(/^desktop-v/, '');
  if (!stableVersion.test(version) || version.length > 32 || typeof value.releaseDate !== 'string') return invalid();
  const date = new Date(value.releaseDate);
  if (!Number.isFinite(date.getTime()) || date.toISOString() !== value.releaseDate) return invalid();
  if (value.platforms.length < 1 || value.platforms.length > desktopPlatforms.length) return invalid();
  const seen = new Set<string>();
  const downloads = value.platforms.map((entry): DesktopDownload => {
    if (!record(entry)) return invalid();
    const platform = desktopPlatforms.find(({ id }) => id === entry.id);
    if (!platform || seen.has(platform.id) || entry.file !== platform.file) return invalid();
    seen.add(platform.id);
    if (!Number.isSafeInteger(entry.sizeBytes) || (entry.sizeBytes as number) <= 0 || (entry.sizeBytes as number) > maximumInstallerBytes) return invalid();
    const currentPath = `/api/desktop/download/${platform.id}`;
    if (entry.downloadUrl !== currentPath) return invalid();
    // Existing service compatibility: expose checksums only with pinned bytes.
    const immutablePath = `/api/desktop/download/${version}/${platform.id}`;
    const pinned = entry.immutableDownloadUrl !== undefined;
    if (pinned && (entry.immutableDownloadUrl !== immutablePath || typeof entry.sha256 !== 'string' || !/^[0-9a-f]{64}$/.test(entry.sha256))) return invalid();
    return { id: platform.id, url: DESKTOP_API_ORIGIN + (pinned ? immutablePath : currentPath), sizeBytes: entry.sizeBytes as number, sha256: pinned ? entry.sha256 as string : null };
  });
  return { available: true, version, releasedAt: date.toISOString(), downloads };
}

export async function loadDesktopCatalog(signal: AbortSignal, fetcher: typeof fetch = fetch): Promise<DesktopCatalog> {
  const response = await fetcher(DESKTOP_CATALOG_URL, {
    signal, credentials: 'omit', cache: 'no-store', redirect: 'error', headers: { Accept: 'application/json' },
  });
  if (!response.ok || response.headers.get('content-type')?.split(';')[0].trim() !== 'application/json' || !response.body) return invalid();
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const result = await reader.read();
      if (result.done) break;
      length += result.value.byteLength;
      if (length > maximumCatalogBytes) return invalid();
      chunks.push(result.value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return parseDesktopCatalog(JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)));
  } finally {
    await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}

export function desktopFileSize(bytes: number): string {
  return `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(bytes / (1024 * 1024))} MB`;
}
