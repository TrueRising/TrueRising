import type { Metadata } from 'next';
import { siteSettings } from '@/content/settings/site';
import type { Locale } from '@/lib/i18n/config';

export const buildPageMetadata = ({
  locale,
  path,
  title,
  description
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata => {
  const url = `${siteSettings.baseUrl}/${locale}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteSettings.brand,
      type: 'website',
      locale: locale === 'ar' ? 'ar_EG' : 'en_US'
    }
  };
};
