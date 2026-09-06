export type AnalyticsClickKind = 'internal' | 'outbound' | 'contact' | 'submit' | 'action';

export interface AnalyticsClickInput {
  explicitTarget?: string;
  href?: string;
  ariaLabel?: string;
  isSubmit?: boolean;
  page: string;
  placement: string;
  origin: string;
}

export interface AnalyticsClickProps {
  page: string;
  target: string;
  placement: string;
  destination: string;
  kind: AnalyticsClickKind;
}

function safeLabel(value: string | undefined, fallback: string): string {
  const normalized = String(value || '').replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!normalized || normalized.includes('@') || /\+?\d[\d\s()./-]{6,}/.test(normalized)) return fallback;
  return normalized.slice(0, 80);
}

function pagePath(value: string): string {
  const normalized = value.startsWith('/') ? value : '/';
  return normalized.split(/[?#]/, 1)[0].slice(0, 160) || '/';
}

export function analyticsClick(input: AnalyticsClickInput): AnalyticsClickProps {
  const page = pagePath(input.page);
  const placement = safeLabel(input.placement, 'content').toLocaleLowerCase('de-DE');
  if (input.href) {
    if (/^mailto:/i.test(input.href)) return { page, placement, target: safeLabel(input.explicitTarget, 'E-Mail Kontakt'), destination: 'mailto', kind: 'contact' };
    if (/^tel:/i.test(input.href)) return { page, placement, target: safeLabel(input.explicitTarget, 'Telefonkontakt'), destination: 'tel', kind: 'contact' };
    try {
      const url = new URL(input.href, input.origin);
      const ownOrigin = new URL(input.origin).origin;
      const internal = url.origin === ownOrigin;
      const destination = internal ? pagePath(url.pathname) : url.hostname.slice(0, 120);
      const fallback = internal ? `Link ${destination}` : `Outbound ${destination}`;
      return { page, placement, target: safeLabel(input.explicitTarget, fallback), destination, kind: internal ? 'internal' : 'outbound' };
    } catch {
      return { page, placement, target: safeLabel(input.explicitTarget, 'Link'), destination: '', kind: 'action' };
    }
  }
  if (input.isSubmit) return { page, placement, target: safeLabel(input.explicitTarget || input.ariaLabel, 'Formular absenden'), destination: page, kind: 'submit' };
  return { page, placement, target: safeLabel(input.explicitTarget || input.ariaLabel, 'Schaltfläche'), destination: '', kind: 'action' };
}
