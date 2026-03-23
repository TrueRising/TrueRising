import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionShell } from '@/components/ui/section-shell';
import { getInsights } from '@/content';
import { isLocale } from '@/lib/i18n/locale-utils';
import { notFound } from 'next/navigation';

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <SectionShell><Container><h1 className="mb-8 text-4xl font-semibold">{locale === 'ar' ? 'الرؤى والمقالات' : 'Insights'}</h1><div className="grid gap-6 md:grid-cols-2">{getInsights(locale).map((ins)=><Card key={ins.slug}><p className="text-xs text-textSecondary">{ins.date}</p><h2 className="mt-2 text-xl font-semibold">{ins.title}</h2><p className="mt-3 text-sm text-textSecondary">{ins.excerpt}</p><Link href={`/${locale}/insights/${ins.slug}`} className="mt-5 inline-block text-sm text-accentPrimary">{locale === 'ar' ? 'قراءة المقال' : 'Read insight'}</Link></Card>)}</div></Container></SectionShell>;
}
