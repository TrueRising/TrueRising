'use client';

import type { Locale } from '@/lib/i18n/config';
import { contactLinks } from '@/lib/utils/links';
import { trackEvent } from '@/lib/utils/analytics';

export const ContactChannels = ({ locale }: { locale: Locale }) => {
  return (
    <div className="space-y-3 text-sm text-textSecondary">
      <p>{locale === 'ar' ? 'الموقع: 6th of October City, Egypt' : 'Location: 6th of October City, Egypt'}</p>
      <a href={contactLinks.phoneHref} onClick={() => trackEvent('phone_click', { location: 'contact_page', locale })}>Phone: {contactLinks.phoneLabel}</a>
      <a className="block" href={contactLinks.whatsappHref} onClick={() => trackEvent('whatsapp_click', { location: 'contact_page', locale })}>WhatsApp</a>
      <a className="block" href={contactLinks.emailHref} onClick={() => trackEvent('email_click', { location: 'contact_page', locale })}>{contactLinks.emailLabel}</a>
    </div>
  );
};
