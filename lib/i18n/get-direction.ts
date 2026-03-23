import type { Locale } from './config';

export const getDirection = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr');
