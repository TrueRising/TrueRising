'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { LocaleSwitcher } from './locale-switcher';
import { Button } from '../ui/button';

export const MobileNav = ({ locale, nav }: { locale: Locale; nav: Array<{ label: string; href: string }> }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-button border border-borderSubtle p-2">
        <Menu className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-backgroundPrimary/95 p-6">
          <div className="mb-8 flex items-center justify-between">
            <strong>OBSIDIAN</strong>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-button border border-borderSubtle p-2"><X className="h-5 w-5" /></button>
          </div>
          <nav className="space-y-5">
            {nav.map((item) => (
              <Link onClick={() => setOpen(false)} key={item.href} href={item.href} className="block text-lg">{item.label}</Link>
            ))}
          </nav>
          <div className="mt-8 flex items-center gap-3">
            <LocaleSwitcher locale={locale} />
            <Button href={`/${locale}/start-project`}>{locale === 'ar' ? 'ابدأ مشروعك' : 'Start Project'}</Button>
          </div>
        </div>
      )}
    </div>
  );
};
