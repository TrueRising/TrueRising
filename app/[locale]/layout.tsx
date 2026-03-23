import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getNavigation } from '@/content';
import { getDirection } from '@/lib/i18n/get-direction';
import { isLocale } from '@/lib/i18n/locale-utils';

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const nav = getNavigation(locale);
  return (
    <div
      lang={locale}
      dir={getDirection(locale)}
      className={`relative min-h-screen overflow-hidden ${locale === 'ar' ? 'font-[var(--font-alexandria)]' : 'font-[var(--font-manrope)]'}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-obsidian-glow" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-obsidian-noise opacity-30" />
      <Header locale={locale} nav={nav} />
      <main className="relative z-10">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
