import { StartProjectForm } from '@/components/forms/start-project-form';
import { Container } from '@/components/ui/container';
import { SectionShell } from '@/components/ui/section-shell';
import { getStartProject } from '@/content';
import { isLocale } from '@/lib/i18n/locale-utils';
import { notFound } from 'next/navigation';

export default async function StartProjectPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getStartProject(locale);
  return <SectionShell><Container><h1 className="text-4xl font-semibold">{content.title}</h1><p className="mt-4 mb-8 text-textSecondary">{content.intro}</p><StartProjectForm locale={locale} /></Container></SectionShell>;
}
