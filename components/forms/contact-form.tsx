'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { trackEvent } from '@/lib/utils/analytics';
import { contactLinks } from '@/lib/utils/links';
import type { Locale } from '@/lib/i18n/config';

type Status = 'idle' | 'submitting' | 'success' | 'fallback' | 'error';

export const ContactForm = ({ locale }: { locale: Locale }) => {
  const [status, setStatus] = useState<Status>('idle');
  const isArabic = locale === 'ar';

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus('submitting');
        const form = new FormData(e.currentTarget);
        const payload = {
          name: String(form.get('name') ?? ''),
          company: String(form.get('company') ?? ''),
          contact: String(form.get('contact') ?? ''),
          message: String(form.get('message') ?? '')
        };

        trackEvent('contact_form_submit', { locale });
        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formType: 'contact', locale, payload })
        });

        if (response.ok) {
          setStatus('success');
          (e.currentTarget as HTMLFormElement).reset();
          return;
        }

        if (response.status === 503) {
          setStatus('fallback');
          return;
        }

        setStatus('error');
      }}
    >
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm">{isArabic ? 'الاسم' : 'Name'}</label>
        <Input id="contact-name" name="name" required autoComplete="name" />
      </div>
      <div>
        <label htmlFor="contact-company" className="mb-2 block text-sm">{isArabic ? 'الشركة' : 'Company'}</label>
        <Input id="contact-company" name="company" required autoComplete="organization" />
      </div>
      <div>
        <label htmlFor="contact-contact" className="mb-2 block text-sm">{isArabic ? 'الهاتف أو البريد' : 'Phone or Email'}</label>
        <Input id="contact-contact" name="contact" required autoComplete="email" />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm">{isArabic ? 'الرسالة' : 'Message'}</label>
        <Textarea id="contact-message" name="message" required rows={5} />
      </div>
      <Button type="submit" disabled={status === 'submitting'}>{isArabic ? 'إرسال' : 'Submit'}</Button>

      {status === 'success' && (
        <p className="text-sm text-emerald-400">{isArabic ? 'تم إرسال رسالتك بنجاح. سنعاود التواصل قريبًا.' : 'Your message has been sent successfully. We will get back to you shortly.'}</p>
      )}

      {status === 'fallback' && (
        <p className="text-sm text-textSecondary">
          {isArabic ? 'تعذّر الإرسال التلقائي حاليًا. تواصل مباشرة عبر' : 'Automatic submission is unavailable right now. Please reach us directly via'}{' '}
          <a href={contactLinks.whatsappHref} className="text-accentPrimary underline-offset-4 hover:underline">WhatsApp</a>
          {' / '}
          <a href={contactLinks.emailHref} className="text-accentPrimary underline-offset-4 hover:underline">Email</a>.
        </p>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-300">{isArabic ? 'حدث خطأ غير متوقع. حاول مرة أخرى أو تواصل معنا مباشرة.' : 'An unexpected error occurred. Please try again or contact us directly.'}</p>
      )}
    </form>
  );
};
