'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { trackEvent } from '@/lib/utils/analytics';
import { contactLinks } from '@/lib/utils/links';

export const ContactForm = ({ locale }: { locale: string }) => {
  const [status, setStatus] = useState<'idle' | 'fallback'>('idle');
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        trackEvent('contact_form_submit', { locale });
        setStatus('fallback');
      }}
    >
      <div><label className="mb-2 block text-sm">{locale === 'ar' ? 'الاسم' : 'Name'}</label><Input required /></div>
      <div><label className="mb-2 block text-sm">{locale === 'ar' ? 'الشركة' : 'Company'}</label><Input required /></div>
      <div><label className="mb-2 block text-sm">{locale === 'ar' ? 'الهاتف أو البريد' : 'Phone or Email'}</label><Input required /></div>
      <div><label className="mb-2 block text-sm">{locale === 'ar' ? 'الرسالة' : 'Message'}</label><Textarea required rows={5} /></div>
      <Button>{locale === 'ar' ? 'إرسال' : 'Submit'}</Button>
      {status === 'fallback' && <p className="text-sm text-textSecondary">{locale === 'ar' ? 'تم استلام طلبك مبدئيًا. لحين تفعيل الربط الكامل، تواصل مباشرة عبر واتساب أو البريد.' : 'Request captured locally. Until backend delivery is configured, please contact us via WhatsApp or email directly.'} <a href={contactLinks.whatsappHref} className="text-accentPrimary">WhatsApp</a></p>}
    </form>
  );
};
