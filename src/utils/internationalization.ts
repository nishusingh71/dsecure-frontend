import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from "i18next-http-backend";
import enTranslation from "../../public/locales/en/translation.json";

// Language configurations
export const languages = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
];

// Initialize i18next
i18n
  .use(HttpBackend) // Load translations via HTTP
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: "en", // Use English if detected language is not available
    debug: false, // Set to true for development debugging

    // Bundle English so it doesn't trigger a network request on default load
    resources: {
      en: {
        translation: enTranslation,
      },
    },

    // Path to translation files for ALL OTHER languages
    partialBundledLanguages: true, // Let backend load other languages
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      // Order of detection methods
      order: ["localStorage", "navigator", "htmlTag"],

      // Keys to lookup language from
      lookupLocalStorage: "i18nextLng",

      // Cache user language
      caches: ["localStorage"],

      // Optional: exclude certain languages
      excludeCacheFor: ["cimode"],
    },

    react: {
      useSuspense: true, // Enable suspense for better loading experience
    },
  });

// Helper function to get current language
export const getCurrentLanguage = () => i18n.language || 'en';

// Helper function to change language
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  localStorage.setItem('i18nextLng', lng);
  // Update HTML lang attribute for accessibility
  document.documentElement.lang = lng;
};

// Helper function to get language name
export const getLanguageName = (code: string) => {
  const lang = languages.find(l => l.code === code);
  return lang ? lang.nativeName : code;
};

export default i18n;
 