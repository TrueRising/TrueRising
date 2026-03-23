'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils/cn';
import { Button } from '../ui/button';
import { LocaleSwitcher } from './locale-switcher';
import { MobileNav } from './mobile-nav';

export const Header = ({ locale, nav }: { locale: Locale; nav: Array<{ label: string; href: string }> }) => {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={cn('sticky top-0 z-40 border-b border-transparent', solid && 'border-borderSubtle bg-backgroundPrimary/95 backdrop-blur')}>
      <div className="mx-auto flex max-w-container items-center justify-between px-5 py-4 md:px-8">
        <Link href={`/${locale}`} className="text-sm font-semibold tracking-[0.2em]">NAGEEB</Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => <Link key={item.href} href={item.href} className="text-sm text-textSecondary hover:text-textPrimary">{item.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher locale={locale} />
          <Button href={`/${locale}/start-project`}>{locale === 'ar' ? 'ابدأ مشروعك' : 'Start Project'}</Button>
        </div>
        <MobileNav locale={locale} nav={nav} />
      </div>
    </header>
  );
};
