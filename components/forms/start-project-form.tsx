'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { trackEvent } from '@/lib/utils/analytics';
import { contactLinks } from '@/lib/utils/links';

export const StartProjectForm = ({ locale }: { locale: string }) => {
  const [status, setStatus] = useState<'idle' | 'fallback'>('idle');
  const l = locale === 'ar';
  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); trackEvent('start_project_form_submit', { locale }); setStatus('fallback'); }}>
      <div><label className="mb-2 block text-sm">{l ? 'الاسم' : 'Name'}</label><Input required /></div>
      <div><label className="mb-2 block text-sm">{l ? 'الشركة' : 'Company'}</label><Input required /></div>
      <div><label className="mb-2 block text-sm">{l ? 'الهاتف' : 'Phone'}</label><Input required /></div>
      <div><label className="mb-2 block text-sm">{l ? 'البريد الإلكتروني' : 'Email'}</label><Input type="email" required /></div>
      <div><label className="mb-2 block text-sm">{l ? 'رابط الموقع الحالي' : 'Website URL'}</label><Input /></div>
      <div><label className="mb-2 block text-sm">{l ? 'الخدمة المطلوبة' : 'Service Needed'}</label><Input required /></div>
      <div className="md:col-span-2"><label className="mb-2 block text-sm">{l ? 'أهداف المشروع' : 'Project Goals'}</label><Textarea rows={4} required /></div>
      <div><label className="mb-2 block text-sm">{l ? 'المدة المتوقعة' : 'Timeline'}</label><Input /></div>
      <div><label className="mb-2 block text-sm">{l ? 'نطاق الميزانية' : 'Budget Range'}</label><Input /></div>
      <div className="md:col-span-2 space-y-3"><Button>{l ? 'إرسال طلب المشروع' : 'Submit Project Brief'}</Button>
      {status === 'fallback' && <p className="text-sm text-textSecondary">{l ? 'حتى يتم تفعيل التكامل الخلفي بالكامل، استخدم واتساب أو البريد لإرسال تفاصيلك الآن.' : 'Backend delivery is not yet configured. Please send your brief directly via WhatsApp or email.'} <a href={contactLinks.emailHref} className="text-accentPrimary">{contactLinks.emailLabel}</a></p>}</div>
    </form>
  );
};
