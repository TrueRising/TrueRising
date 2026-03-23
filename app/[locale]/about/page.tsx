import { Container } from '@/components/ui/container';
import { SectionShell } from '@/components/ui/section-shell';
import { getAbout } from '@/content';
import { isLocale } from '@/lib/i18n/locale-utils';
import { notFound } from 'next/navigation';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getAbout(locale);
  return <SectionShell><Container><h1 className="text-4xl font-semibold">{content.title}</h1><p className="mt-4 max-w-3xl text-textSecondary">{content.intro}</p><ul className="mt-8 grid gap-3 md:grid-cols-3">{content.standards.map((s)=><li key={s} className="rounded-card border border-borderSubtle bg-surface p-5 text-sm">{s}</li>)}</ul></Container></SectionShell>;
}
