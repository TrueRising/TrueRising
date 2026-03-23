'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { trackEvent } from '@/lib/utils/analytics';
import { contactLinks } from '@/lib/utils/links';
import type { Locale } from '@/lib/i18n/config';

type Status = 'idle' | 'submitting' | 'success' | 'fallback' | 'error';

export const StartProjectForm = ({ locale }: { locale: Locale }) => {
  const [status, setStatus] = useState<Status>('idle');
  const isArabic = locale === 'ar';

  return (
    <form
      className="grid gap-4 md:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus('submitting');
        const form = new FormData(e.currentTarget);
        const payload = {
          name: String(form.get('name') ?? ''),
          company: String(form.get('company') ?? ''),
          phone: String(form.get('phone') ?? ''),
          email: String(form.get('email') ?? ''),
          website: String(form.get('website') ?? ''),
          service: String(form.get('service') ?? ''),
          goals: String(form.get('goals') ?? ''),
          timeline: String(form.get('timeline') ?? ''),
          budget: String(form.get('budget') ?? '')
        };

        trackEvent('start_project_form_submit', { locale });
        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formType: 'start_project', locale, payload })
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
      <div><label htmlFor="sp-name" className="mb-2 block text-sm">{isArabic ? 'الاسم' : 'Name'}</label><Input id="sp-name" name="name" required autoComplete="name" /></div>
      <div><label htmlFor="sp-company" className="mb-2 block text-sm">{isArabic ? 'الشركة' : 'Company'}</label><Input id="sp-company" name="company" required autoComplete="organization" /></div>
      <div><label htmlFor="sp-phone" className="mb-2 block text-sm">{isArabic ? 'الهاتف' : 'Phone'}</label><Input id="sp-phone" name="phone" required autoComplete="tel" /></div>
      <div><label htmlFor="sp-email" className="mb-2 block text-sm">{isArabic ? 'البريد الإلكتروني' : 'Email'}</label><Input id="sp-email" name="email" type="email" required autoComplete="email" /></div>
      <div><label htmlFor="sp-website" className="mb-2 block text-sm">{isArabic ? 'رابط الموقع الحالي' : 'Website URL'}</label><Input id="sp-website" name="website" type="url" placeholder="https://" /></div>
      <div><label htmlFor="sp-service" className="mb-2 block text-sm">{isArabic ? 'الخدمة المطلوبة' : 'Service Needed'}</label><Input id="sp-service" name="service" required /></div>
      <div className="md:col-span-2"><label htmlFor="sp-goals" className="mb-2 block text-sm">{isArabic ? 'أهداف المشروع' : 'Project Goals'}</label><Textarea id="sp-goals" name="goals" rows={4} required /></div>
      <div><label htmlFor="sp-timeline" className="mb-2 block text-sm">{isArabic ? 'المدة المتوقعة' : 'Timeline'}</label><Input id="sp-timeline" name="timeline" /></div>
      <div><label htmlFor="sp-budget" className="mb-2 block text-sm">{isArabic ? 'نطاق الميزانية' : 'Budget Range'}</label><Input id="sp-budget" name="budget" /></div>

      <div className="md:col-span-2 space-y-3">
        <Button type="submit" disabled={status === 'submitting'}>{isArabic ? 'إرسال طلب المشروع' : 'Submit Project Brief'}</Button>

        {status === 'success' && (
          <p className="text-sm text-emerald-400">{isArabic ? 'تم استلام طلب المشروع بنجاح. سنعود إليك بخطوات واضحة قريبًا.' : 'Project brief received successfully. We will follow up with a clear next step shortly.'}</p>
        )}

        {status === 'fallback' && (
          <p className="text-sm text-textSecondary">
            {isArabic ? 'تعذّر الإرسال التلقائي حاليًا. أرسل التفاصيل مباشرة عبر' : 'Automatic submission is unavailable right now. Please send your brief via'}{' '}
            <a href={contactLinks.whatsappHref} className="text-accentPrimary underline-offset-4 hover:underline">WhatsApp</a>
            {' / '}
            <a href={contactLinks.emailHref} className="text-accentPrimary underline-offset-4 hover:underline">Email</a>.
          </p>
        )}

        {status === 'error' && (
          <p className="text-sm text-red-300">{isArabic ? 'حدث خطأ غير متوقع. حاول مرة أخرى أو تواصل معنا مباشرة.' : 'An unexpected error occurred. Please try again or contact us directly.'}</p>
        )}
      </div>
    </form>
  );
};
