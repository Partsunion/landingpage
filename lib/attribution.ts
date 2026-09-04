// Campaign context lives only in this page session's memory. No cookies,
// browser storage, ad identifiers, or complete referrer URLs are collected.
let landingContext: Record<string, string> | undefined;
export function campaignContext(url: string, referrer = ''): Record<string, string> {
  const current = new URL(url);
  const context: Record<string, string> = { landingPath: current.pathname };
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const value = current.searchParams.get(key);
    if (value && value.length <= 100 && /^[\p{L}\p{N} _./-]+$/u.test(value)) context[key] = value;
  }
  try {
    if (referrer) {
      const previous = new URL(referrer);
      if (previous.origin !== current.origin) context.referrerHost = previous.hostname;
    }
  } catch {
    /* malformed referrer is ignored */
  }
  return context;
}
export function captureLandingContext(): void {
  if (typeof window === 'undefined' || landingContext) return;
  landingContext = campaignContext(window.location.href, document.referrer);
}
export function leadContext(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  captureLandingContext();
  return { ...landingContext, submissionPath: window.location.pathname };
}
