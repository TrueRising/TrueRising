import { defaultLocale, locales, type Locale } from './config';

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const oppositeLocale = (locale: Locale): Locale => (locale === 'ar' ? 'en' : 'ar');
export const withLocale = (locale: Locale, path = '') => `/${locale}${path}`;
export const normalizeLocale = (locale?: string): Locale =>
  locale && isLocale(locale) ? locale : defaultLocale;
