import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// [PERF-Phase4] Locale loading is now fully dynamic to reduce initial JS execution (TBT)
// en.json (41KB) is removed from the critical index bundle. 
// Hero content is pre-rendered in index.html, so we can afford dynamic i18n.

// [PERF-C4] Locale loaders — dynamic import so only the active language is bundled initially
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const localeLoaders: Record<string, () => Promise<{ default: any }>> = {
  en: () => import('../locales/en.json'),
  hi: () => import('../locales/hi.json'),
  es: () => import('../locales/es.json'),
  fr: () => import('../locales/fr.json'),
  de: () => import('../locales/de.json'),
  ja: () => import('../locales/ja.json'),
  zh: () => import('../locales/zh.json'),
};

// Language configurations
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

// Load the initial language synchronously before i18n init
const initialLang = localStorage.getItem('i18nextLng') || 'en';

// Initialize with empty resources — will be filled by loadLanguage()
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {}, // Start empty, deferred loading below
    lng: initialLang,
    fallbackLng: 'en', // Use English if detected language is not available
    debug: false, // Set to true for development debugging
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      // Order of detection methods
      order: ['localStorage', 'navigator', 'htmlTag'],
      
      // Keys to lookup language from
      lookupLocalStorage: 'i18nextLng',
      
      // Cache user language
      caches: ['localStorage'],
      
      // Optional: exclude certain languages
      excludeCacheFor: ['cimode'],
    },

    react: {
      useSuspense: false, // Disable suspense for better compatibility
    },
  });

// Helper to dynamically load a locale
async function loadLanguage(lng: string) {
  if (i18n.hasResourceBundle(lng, 'translation')) return; // Already loaded
  const loader = localeLoaders[lng] || localeLoaders['en'];
  try {
    const data = await loader();
    i18n.addResourceBundle(lng, 'translation', data.default, true, true);
  } catch (error) {
    console.error(`Failed to load locale: ${lng}`, error);
  }
}

// Eagerly load the initial language
loadLanguage(initialLang).catch(() => {});

// Helper function to get current language
export const getCurrentLanguage = () => i18n.language || 'en';

// Helper function to change language — dynamically loads the locale if not cached
export const changeLanguage = async (lng: string) => {
  await loadLanguage(lng); // Load the locale JSON first
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
 