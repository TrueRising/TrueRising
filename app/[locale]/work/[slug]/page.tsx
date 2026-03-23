import { FinalCTA } from '@/components/sections/final-cta';
import { Container } from '@/components/ui/container';
import { SectionShell } from '@/components/ui/section-shell';
import { getWork } from '@/content';
import { isLocale } from '@/lib/i18n/locale-utils';
import { notFound } from 'next/navigation';

export default async function WorkDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const item = getWork(locale).find((x) => x.slug === slug);
  if (!item) notFound();
  return <><SectionShell><Container><h1 className="text-4xl font-semibold">{item.title}</h1><p className="mt-3 text-textSecondary">{item.excerpt}</p><div className="mt-8 grid gap-4 md:grid-cols-2"><div className="rounded-card border border-borderSubtle bg-surface p-6"><h2 className="font-semibold">{locale === 'ar' ? 'التحدي' : 'Challenge'}</h2><p className="mt-3 text-sm text-textSecondary">{item.challenge}</p></div><div className="rounded-card border border-borderSubtle bg-surface p-6"><h2 className="font-semibold">{locale === 'ar' ? 'النتيجة' : 'Outcome'}</h2><p className="mt-3 text-sm text-textSecondary">{item.outcome}</p></div></div></Container></SectionShell><FinalCTA locale={locale} title={locale === 'ar' ? 'مشروعك يمكن أن يكون الحالة التالية' : 'Your project can be the next case'} body={locale === 'ar' ? 'دعنا نبني تجربة رقمية تعكس مستوى شركتك.' : 'Let us build a digital experience aligned with your business level.'} /></>;
}
