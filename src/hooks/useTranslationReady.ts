import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook to ensure translations are loaded before rendering
 * Prevents flash of untranslated content
 */
export const useTranslationReady = () => {
  const { i18n, ready } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized && ready) {
      setIsReady(true);
    }
  }, [i18n.isInitialized, ready]);

  return isReady;
};
