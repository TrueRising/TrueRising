import { ProcessSteps } from '@/components/sections/process-steps';
import { Container } from '@/components/ui/container';
import { SectionShell } from '@/components/ui/section-shell';
import { getProcess } from '@/content';
import { isLocale } from '@/lib/i18n/locale-utils';
import { notFound } from 'next/navigation';

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getProcess(locale);
  return <><SectionShell><Container><h1 className="text-4xl font-semibold">{content.title}</h1><p className="mt-4 text-textSecondary">{content.intro}</p></Container></SectionShell><ProcessSteps heading={locale === 'ar' ? 'من الفكرة إلى الإطلاق' : 'From idea to launch'} steps={content.steps} /></>;
}
