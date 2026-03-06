import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

/**
 * Hook that returns a function to prefix paths with the current language.
 * Usage:
 *   const localePath = useLocalePath();
 *   <Link to={localePath("/products/drive-eraser")} />
 *
 * This ensures all navigation links respect the /:lang route prefix.
 */
export function useLocalePath() {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'en';

  return useCallback(
    (path: string) => {
      // If path already starts with /:lang, return as-is
      if (path.startsWith(`/${currentLang}/`) || path === `/${currentLang}`) {
        return path;
      }
      // If path is "/" return the lang root
      if (path === '/') {
        return `/${currentLang}`;
      }
      // Prefix with lang
      return `/${currentLang}${path.startsWith('/') ? path : `/${path}`}`;
    },
    [currentLang]
  );
}
