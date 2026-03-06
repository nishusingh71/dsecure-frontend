/**
 * Returns the current language prefix from the URL path.
 * Works outside React components (in utility files, API clients, etc.)
 * by reading the pathname directly.
 *
 * Usage:
 *   window.location.href = getLocalePath("/login");
 *   // => /en/login (if current path is /en/...)
 */
export function getLocalePath(path: string): string {
  if (!path.startsWith('/')) return path;

  // Extract lang from current URL: /en/some/path → "en"
  const match = window.location.pathname.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);
  const lang = match ? match[1] : 'en';

  // Don't double-prefix
  if (path.startsWith(`/${lang}/`) || path === `/${lang}`) return path;

  return `/${lang}${path}`;
}
