import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { supportedLngCodes } from './languages';

// Available namespaces across the application
export const ALL_NAMESPACES = [
  'common',
  'home',
  'seo',
  'fileEraser',
  'driveEraser',
  'dataGuardianAward',
  'pricingAndPlan',
  'contact',
  'partners',
  'partnershipForm',
  'licenseForm',
  'resources',
  'support'
];

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: supportedLngCodes,
    
    // We use 'common' as the default namespace. 
    // If a key is not found, it can fallback to other namespaces if configured.
    ns: ALL_NAMESPACES,
    defaultNS: 'common',
    fallbackNS: 'common',

    debug: false,

    backend: {
      // Path to the translation files
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['path', 'localStorage', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
