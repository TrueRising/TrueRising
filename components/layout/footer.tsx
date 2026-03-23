'use client';

import { contactLinks } from '@/lib/utils/links';
import type { Locale } from '@/lib/i18n/config';
import { Container } from '../ui/container';
import { trackEvent } from '@/lib/utils/analytics';

export const Footer = ({ locale }: { locale: Locale }) => (
  <footer className="border-t border-borderSubtle py-12">
    <Container className="grid gap-8 md:grid-cols-3">
      <div>
        <h2 className="mb-2 text-sm tracking-[0.2em]">NAGEEB</h2>
        <p className="text-sm text-textSecondary">{locale === 'ar' ? 'تصميم وتطوير مواقع احترافية للشركات في مصر.' : 'Premium web design and development for businesses in Egypt.'}</p>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">{locale === 'ar' ? 'تواصل' : 'Contact'}</p>
        <ul className="space-y-2 text-sm text-textSecondary">
          <li><a href={contactLinks.phoneHref} onClick={() => trackEvent('phone_click', { location: 'footer', locale })}>{contactLinks.phoneLabel}</a></li>
          <li><a href={contactLinks.whatsappHref} onClick={() => trackEvent('whatsapp_click', { location: 'footer', locale })}>WhatsApp</a></li>
          <li><a href={contactLinks.emailHref} onClick={() => trackEvent('email_click', { location: 'footer', locale })}>{contactLinks.emailLabel}</a></li>
        </ul>
      </div>
      <p className="text-sm text-textSecondary">© {new Date().getFullYear()} NAGEEB</p>
    </Container>
  </footer>
);
