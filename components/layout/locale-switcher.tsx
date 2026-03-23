'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import { oppositeLocale } from '@/lib/i18n/locale-utils';
import { trackEvent } from '@/lib/utils/analytics';

export const LocaleSwitcher = ({ locale }: { locale: Locale }) => {
  const pathname = usePathname();
  const nextLocale = oppositeLocale(locale);
  const switchedPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
  return (
    <Link
      href={switchedPath}
      onClick={() => trackEvent('language_switch', { from: locale, to: nextLocale })}
      className="rounded-button border border-borderSubtle px-3 py-2 text-xs text-textSecondary hover:bg-surface"
    >
      {nextLocale === 'ar' ? 'العربية' : 'EN'}
    </Link>
  );
};
