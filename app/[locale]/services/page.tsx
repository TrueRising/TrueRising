import { ServicesGrid } from '@/components/sections/services-grid';
import { getServices } from '@/content';
import { isLocale } from '@/lib/i18n/locale-utils';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata({ locale, path: '/services', title: locale === 'ar' ? 'الخدمات | NAGEEB' : 'Services | NAGEEB', description: locale === 'ar' ? 'تعرّف على خدمات NAGEEB الرقمية المصممة لرفع الثقة والأداء والتحويل.' : 'Explore NAGEEB services engineered to improve trust, performance, and conversion.' });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ServicesGrid locale={locale} heading={locale === 'ar' ? 'خدمات NAGEEB الرقمية' : 'NAGEEB service system'} services={getServices(locale)} />;
}
