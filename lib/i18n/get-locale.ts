import { defaultLocale, locales, type Locale } from './config';

export const getLocale = (value: string): Locale =>
  locales.includes(value as Locale) ? (value as Locale) : defaultLocale;
