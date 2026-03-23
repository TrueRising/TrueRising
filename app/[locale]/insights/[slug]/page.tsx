import { Container } from '@/components/ui/container';
import { SectionShell } from '@/components/ui/section-shell';
import { getInsights } from '@/content';
import { isLocale } from '@/lib/i18n/locale-utils';
import { notFound } from 'next/navigation';

export default async function InsightDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const insight = getInsights(locale).find((item) => item.slug === slug);
  if (!insight) notFound();
  return <SectionShell><Container><h1 className="text-4xl font-semibold">{insight.title}</h1><p className="mt-2 text-sm text-textSecondary">{insight.date}</p><div className="mt-8 space-y-4 text-textSecondary">{insight.body.map((p)=><p key={p}>{p}</p>)}</div></Container></SectionShell>;
}
