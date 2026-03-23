import { ContactForm } from '@/components/forms/contact-form';
import { Container } from '@/components/ui/container';
import { SectionShell } from '@/components/ui/section-shell';
import { getContact } from '@/content';
import { isLocale } from '@/lib/i18n/locale-utils';
import { contactLinks } from '@/lib/utils/links';
import { notFound } from 'next/navigation';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContact(locale);
  return <SectionShell><Container><h1 className="text-4xl font-semibold">{c.title}</h1><p className="mt-4 mb-8 text-textSecondary">{c.intro}</p><div className="grid gap-8 md:grid-cols-2"><div className="space-y-3 text-sm text-textSecondary"><a href={contactLinks.phoneHref}>Phone: {contactLinks.phoneLabel}</a><a className="block" href={contactLinks.whatsappHref}>WhatsApp</a><a className="block" href={contactLinks.emailHref}>{contactLinks.emailLabel}</a></div><ContactForm locale={locale} /></div></Container></SectionShell>;
}
