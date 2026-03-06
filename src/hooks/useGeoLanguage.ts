import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { countryLanguageMap } from '../utils/countryLanguageMap';
import { supportedLngCodes } from '../i18n/languages';

/**
 * Auto-detects user language based on geolocation (ipapi.co).
 * Respects user's manual language choice stored in localStorage.
 * Only runs once on mount.
 */
export function useGeoLanguage(): void {
  const { i18n } = useTranslation();

  useEffect(() => {
    // If user has already chosen a language manually, respect that choice
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang && supportedLngCodes.includes(savedLang)) {
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch('https://ipapi.co/json/', {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data = await response.json();
        const countryCode: string | undefined = data?.country_code;
        if (!countryCode) return;

        const langCode = countryLanguageMap[countryCode.toUpperCase()];
        if (langCode && supportedLngCodes.includes(langCode)) {
          await i18n.changeLanguage(langCode);
        }
      } catch {
        // Silently fail — geo detection is best-effort
      }
    })();

    return () => controller.abort();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
