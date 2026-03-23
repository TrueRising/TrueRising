import { FinalCTA } from '@/components/sections/final-cta';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionShell } from '@/components/ui/section-shell';
import { getServices, getWork } from '@/content';
import { isLocale } from '@/lib/i18n/locale-utils';
import { trackEvent } from '@/lib/utils/analytics';
import { notFound } from 'next/navigation';

export default async function ServiceDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const service = getServices(locale).find((item) => item.slug === slug);
  if (!service) notFound();
  trackEvent('service_page_view', { locale, slug });

  return (
    <>
      <SectionShell><Container><h1 className="text-4xl font-semibold md:text-5xl">{service.title}</h1><p className="mt-4 max-w-3xl text-textSecondary">{service.overview}</p></Container></SectionShell>
      <SectionShell><Container><div className="grid gap-6 md:grid-cols-3"><Card><h2 className="mb-3 font-semibold">{locale === 'ar' ? 'المشكلات التي نعالجها' : 'Problems solved'}</h2><ul className="space-y-2 text-sm text-textSecondary">{service.problems.map((x)=><li key={x}>{x}</li>)}</ul></Card><Card><h2 className="mb-3 font-semibold">{locale === 'ar' ? 'ما الذي يشمله التنفيذ' : 'Deliverables'}</h2><ul className="space-y-2 text-sm text-textSecondary">{service.deliverables.map((x)=><li key={x}>{x}</li>)}</ul></Card><Card><h2 className="mb-3 font-semibold">{locale === 'ar' ? 'لماذا NAGEEB' : 'Why NAGEEB'}</h2><ul className="space-y-2 text-sm text-textSecondary">{service.why.map((x)=><li key={x}>{x}</li>)}</ul></Card></div></Container></SectionShell>
      <SectionShell><Container><h2 className="mb-5 text-2xl font-semibold">{locale === 'ar' ? 'أعمال مرتبطة' : 'Relevant work'}</h2><div className="grid gap-4 md:grid-cols-3">{getWork(locale).slice(0,3).map((w)=><Card key={w.slug}><h3 className="font-semibold">{w.title}</h3><p className="mt-2 text-sm text-textSecondary">{w.excerpt}</p></Card>)}</div></Container></SectionShell>
      <FinalCTA locale={locale} title={locale === 'ar' ? 'جاهز للخطوة التالية؟' : 'Ready for the next step?'} body={locale === 'ar' ? 'ابدأ الآن وسنحوّل الخدمة إلى مسار تنفيذ واضح.' : 'Start now and we will turn this service into a clear execution plan.'} />
    </>
  );
}
