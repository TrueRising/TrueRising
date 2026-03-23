import Link from 'next/link';
import type { ServiceEntry } from '@/content/services/types';
import { Card } from '../ui/card';
import { Container } from '../ui/container';
import { SectionShell } from '../ui/section-shell';

export const ServicesGrid = ({ locale, heading, services }: { locale: string; heading: string; services: ServiceEntry[] }) => (
  <SectionShell>
    <Container>
      <h2 className="mb-8 text-3xl font-semibold md:text-4xl">{heading}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.slug}>
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="mt-3 text-sm text-textSecondary">{service.summary}</p>
            <Link className="mt-5 inline-block text-sm text-accentPrimary" href={`/${locale}/services/${service.slug}`}>{locale === 'ar' ? 'عرض التفاصيل' : 'View details'}</Link>
          </Card>
        ))}
      </div>
    </Container>
  </SectionShell>
);
