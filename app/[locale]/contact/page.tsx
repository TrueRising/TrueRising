import { ContactForm } from '@/components/forms/contact-form';
import { ContactChannels } from '@/components/forms/contact-channels';
import { Container } from '@/components/ui/container';
import { SectionShell } from '@/components/ui/section-shell';
import { getContact } from '@/content';
import { isLocale } from '@/lib/i18n/locale-utils';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata({
    locale,
    path: '/contact',
    title: locale === 'ar' ? 'تواصل معنا | NAGEEB' : 'Contact | NAGEEB',
    description: locale === 'ar' ? 'تواصل مباشرة مع فريق NAGEEB عبر الهاتف أو واتساب أو البريد.' : 'Reach NAGEEB directly via phone, WhatsApp, or email.'
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContact(locale);
  return <SectionShell><Container><h1 className="text-4xl font-semibold">{c.title}</h1><p className="mt-4 mb-8 text-textSecondary">{c.intro}</p><div className="grid gap-8 md:grid-cols-2"><ContactChannels locale={locale} /><ContactForm locale={locale} /></div></Container></SectionShell>;
}
