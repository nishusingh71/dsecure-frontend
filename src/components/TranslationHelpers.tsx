import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

/**
 * TransText Component - Auto-translates text
 * Usage: <TransText>common.home</TransText>
 */
export const TransText = ({ children, vars }: { children: string; vars?: Record<string, any> }) => {
  const { t } = useTranslation();
  return <>{t(children, vars)}</>;
};

/**
 * Hook to easily translate text in components
 */
export const useTrans = () => {
  const { t, i18n } = useTranslation();
  
  return {
    t,
    currentLanguage: i18n.language,
    changeLanguage: i18n.changeLanguage,
  };
};

/**
 * Higher Order Component to add translation support
 */
export const withTranslation = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const { t } = useTranslation();
    return <Component {...props} t={t} />;
  };
};
