import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface LocalFormatters {
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatDate: (value: Date | number | string, options?: Intl.DateTimeFormatOptions) => string;
  formatCurrency: (value: number, currency?: string, options?: Intl.NumberFormatOptions) => string;
}

/**
 * Returns locale-aware formatting functions based on the current i18n language.
 */
export function useLocalFormat(): LocalFormatters {
  const { i18n } = useTranslation();
  const locale = i18n.language || 'en';

  return useMemo<LocalFormatters>(() => ({
    formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
      try {
        return new Intl.NumberFormat(locale, options).format(value);
      } catch {
        return String(value);
      }
    },

    formatDate(value: Date | number | string, options?: Intl.DateTimeFormatOptions): string {
      try {
        const date = value instanceof Date ? value : new Date(value);
        return new Intl.DateTimeFormat(locale, options).format(date);
      } catch {
        return String(value);
      }
    },

    formatCurrency(value: number, currency = 'USD', options?: Intl.NumberFormatOptions): string {
      try {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
          ...options,
        }).format(value);
      } catch {
        return String(value);
      }
    },
  }), [locale]);
}
