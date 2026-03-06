import { useEffect } from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supportedLngCodes, getLanguageDir } from '../i18n/languages';

/**
 * Layout wrapper that syncs the :lang route param with i18n.
 * Placed at the /:lang route level so all child routes inherit the language.
 */
export default function LangLayout() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  // Sync i18n language with route param
  useEffect(() => {
    if (lang && supportedLngCodes.includes(lang) && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  // Sync document lang/dir attributes
  useEffect(() => {
    if (lang && supportedLngCodes.includes(lang)) {
      const dir = getLanguageDir(lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
      document.body.classList.toggle('rtl', dir === 'rtl');
    }
  }, [lang]);

  // Redirect to /en if the lang param is not a supported language
  if (!lang || !supportedLngCodes.includes(lang)) {
    return <Navigate to="/en" replace />;
  }

  return <Outlet />;
}
