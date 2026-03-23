import { Container } from '@/components/ui/container';
import { SectionShell } from '@/components/ui/section-shell';
import { getInsights } from '@/content';
import { isLocale } from '@/lib/i18n/locale-utils';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const insight = getInsights(locale).find((item) => item.slug === slug);
  if (!insight) return {};
  return buildPageMetadata({
    locale,
    path: `/insights/${slug}`,
    title: `${insight.title} | NAGEEB`,
    description: insight.excerpt
  });
}

export default async function InsightDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const insight = getInsights(locale).find((item) => item.slug === slug);
  if (!insight) notFound();
  return <SectionShell><Container><h1 className="text-4xl font-semibold">{insight.title}</h1><p className="mt-2 text-sm text-textSecondary">{insight.date}</p><div className="mt-8 space-y-4 text-textSecondary">{insight.body.map((p)=><p key={p}>{p}</p>)}</div></Container></SectionShell>;
}
