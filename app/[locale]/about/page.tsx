import { Container } from '@/components/ui/container';
import { SectionShell } from '@/components/ui/section-shell';
import { getAbout } from '@/content';
import { isLocale } from '@/lib/i18n/locale-utils';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata({
    locale,
    path: '/about',
    title: locale === 'ar' ? 'من نحن | NAGEEB' : 'About | NAGEEB',
    description: locale === 'ar' ? 'تعرّف على معايير NAGEEB ونهج التنفيذ الاحترافي للمواقع التجارية في مصر.' : 'Learn about NAGEEB standards and execution approach for serious businesses in Egypt.'
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getAbout(locale);
  return <SectionShell><Container><h1 className="text-4xl font-semibold">{content.title}</h1><p className="mt-4 max-w-3xl text-textSecondary">{content.intro}</p><ul className="mt-8 grid gap-3 md:grid-cols-3">{content.standards.map((s)=><li key={s} className="rounded-card border border-borderSubtle bg-surface p-5 text-sm">{s}</li>)}</ul></Container></SectionShell>;
}
