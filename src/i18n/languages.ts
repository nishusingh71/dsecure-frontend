export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  region: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr', region: 'Global', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr', region: 'South Asia', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl', region: 'Middle East', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', dir: 'ltr', region: 'East Asia', flag: '🇨🇳' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', dir: 'ltr', region: 'East Asia', flag: '🇹🇼' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr', region: 'Europe / Americas', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr', region: 'Europe / Africa', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr', region: 'Europe', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', dir: 'ltr', region: 'Europe / Americas', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr', region: 'Europe / Asia', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr', region: 'East Asia', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', dir: 'ltr', region: 'East Asia', flag: '🇰🇷' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', dir: 'ltr', region: 'Europe', flag: '🇮🇹' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', dir: 'ltr', region: 'Europe', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', dir: 'ltr', region: 'Europe', flag: '🇵🇱' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr', region: 'Europe / Asia', flag: '🇹🇷' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', dir: 'ltr', region: 'Europe', flag: '🇸🇪' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', dir: 'ltr', region: 'Europe', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', dir: 'ltr', region: 'Europe', flag: '🇫🇮' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', dir: 'ltr', region: 'Europe', flag: '🇳🇴' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', dir: 'ltr', region: 'Europe', flag: '🇨🇿' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', dir: 'ltr', region: 'Europe', flag: '🇸🇰' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', dir: 'ltr', region: 'Europe', flag: '🇷🇴' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', dir: 'ltr', region: 'Europe', flag: '🇭🇺' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', dir: 'ltr', region: 'Europe', flag: '🇧🇬' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', dir: 'ltr', region: 'Europe', flag: '🇭🇷' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', dir: 'ltr', region: 'Europe', flag: '🇺🇦' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', dir: 'ltr', region: 'Europe', flag: '🇬🇷' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl', region: 'Middle East', flag: '🇮🇱' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', dir: 'rtl', region: 'Middle East', flag: '🇮🇷' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl', region: 'South Asia', flag: '🇵🇰' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr', region: 'South Asia', flag: '🇧🇩' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', dir: 'ltr', region: 'South Asia', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', dir: 'ltr', region: 'South Asia', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', dir: 'ltr', region: 'South Asia', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', dir: 'ltr', region: 'South Asia', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', dir: 'ltr', region: 'South Asia', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', dir: 'ltr', region: 'South Asia', flag: '🇮🇳' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', dir: 'ltr', region: 'Southeast Asia', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', dir: 'ltr', region: 'Southeast Asia', flag: '🇻🇳' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', dir: 'ltr', region: 'Southeast Asia', flag: '🇮🇩' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', dir: 'ltr', region: 'Southeast Asia', flag: '🇲🇾' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino', dir: 'ltr', region: 'Southeast Asia', flag: '🇵🇭' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', dir: 'ltr', region: 'Africa', flag: '🇰🇪' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', dir: 'ltr', region: 'Africa', flag: '🇿🇦' },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', dir: 'ltr', region: 'Europe', flag: '🇪🇸' },
];

export const supportedLngCodes = SUPPORTED_LANGUAGES.map(l => l.code);

export const getLanguageByCode = (code: string): Language | undefined =>
  SUPPORTED_LANGUAGES.find(l => l.code === code);

export const getLanguageDir = (code: string): 'ltr' | 'rtl' =>
  getLanguageByCode(code)?.dir ?? 'ltr';
