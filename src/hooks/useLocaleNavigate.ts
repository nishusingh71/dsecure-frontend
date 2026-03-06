import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { NavigateOptions, To } from 'react-router-dom';

/**
 * Locale-aware navigate hook.
 * Wraps react-router-dom's useNavigate to auto-prefix the current language.
 *
 * Usage:
 *   const navigate = useLocaleNavigate();
 *   navigate("/products/drive-eraser"); // goes to /en/products/drive-eraser
 */
export function useLocaleNavigate() {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'en';

  return useCallback(
    (to: To | number, options?: NavigateOptions) => {
      if (typeof to === 'number') {
        return navigate(to);
      }
      if (typeof to === 'string' && to.startsWith('/') && !to.startsWith(`/${currentLang}/`) && to !== `/${currentLang}`) {
        return navigate(`/${currentLang}${to}`, options);
      }
      return navigate(to, options);
    },
    [navigate, currentLang]
  );
}
