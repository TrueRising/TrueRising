import { FAQ } from '@/components/sections/faq';
import { FinalCTA } from '@/components/sections/final-cta';
import { Hero } from '@/components/sections/hero';
import { Industries } from '@/components/sections/industries';
import { ProcessSteps } from '@/components/sections/process-steps';
import { SelectedWork } from '@/components/sections/selected-work';
import { ServicesGrid } from '@/components/sections/services-grid';
import { TrustRibbon } from '@/components/sections/trust-ribbon';
import { WhyNageeb } from '@/components/sections/why-nageeb';
import { getFaq, getHomeContent, getServices, getWork } from '@/content';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { faqSchema, organizationSchema } from '@/lib/seo/schema';
import { isLocale } from '@/lib/i18n/locale-utils';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata({ locale, path: '', title: locale === 'ar' ? 'NAGEEB | تصميم وتطوير مواقع احترافية في مصر' : 'NAGEEB | Premium Web Design & Development in Egypt', description: locale === 'ar' ? 'NAGEEB شريك رقمي احترافي للشركات في مصر: تصميم وتطوير مواقع عالية الجودة لرفع الثقة والتحويل.' : 'NAGEEB is a premium digital partner for Egyptian businesses that need stronger presence, trust, and conversion outcomes.' });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const home = getHomeContent(locale);
  const faqItems = getFaq(locale);
  return (
    <>
      <Hero locale={locale} content={home.hero} />
      <TrustRibbon items={home.trustRibbon} />
      <ServicesGrid locale={locale} heading={home.servicesHeading} services={getServices(locale)} />
      <WhyNageeb heading={home.whyHeading} pillars={home.proofPillars} />
      <SelectedWork locale={locale} heading={home.selectedWorkHeading} work={getWork(locale)} />
      <ProcessSteps heading={home.processHeading} steps={locale === 'ar' ? ['فهم النشاط', 'تخطيط الهيكل وتجربة المستخدم', 'التصميم البصري', 'التطوير', 'المراجعة والإطلاق'] : ['Discovery', 'Structure & UX', 'Visual Design', 'Development', 'Review & Launch']} />
      <Industries heading={home.industriesHeading} industries={home.industries} />
      <FAQ locale={locale} items={faqItems} />
      <FinalCTA locale={locale} title={home.finalCta.title} body={home.finalCta.body} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }} />
    </>
  );
}
