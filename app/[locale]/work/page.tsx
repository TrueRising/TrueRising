import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionShell } from '@/components/ui/section-shell';
import { getWork } from '@/content';
import { isLocale } from '@/lib/i18n/locale-utils';
import { notFound } from 'next/navigation';

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const work = getWork(locale);
  return <SectionShell><Container><h1 className="mb-8 text-4xl font-semibold">{locale === 'ar' ? 'أعمال NAGEEB' : 'Selected work'}</h1><div className="grid gap-6 md:grid-cols-3">{work.map((item)=><Card key={item.slug}><p className="text-xs text-textSecondary">{item.sector}</p><h2 className="mt-2 text-xl font-semibold">{item.title}</h2><p className="mt-3 text-sm text-textSecondary">{item.excerpt}</p><Link href={`/${locale}/work/${item.slug}`} className="mt-5 inline-block text-sm text-accentPrimary">{locale === 'ar' ? 'تفاصيل العمل' : 'Case details'}</Link></Card>)}</div></Container></SectionShell>;
}
