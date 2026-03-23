'use client';

import Link from 'next/link';
import type { WorkEntry } from '@/content/work/types';
import { Card } from '../ui/card';
import { Container } from '../ui/container';
import { SectionShell } from '../ui/section-shell';
import { trackEvent } from '@/lib/utils/analytics';

export const SelectedWork = ({ locale, heading, work }: { locale: string; heading: string; work: WorkEntry[] }) => (
  <SectionShell>
    <Container>
      <h2 className="mb-8 text-3xl font-semibold md:text-4xl">{heading}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {work.slice(0, 3).map((item) => (
          <Card key={item.slug}>
            <p className="text-xs text-textSecondary">{item.sector}</p>
            <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-textSecondary">{item.excerpt}</p>
            <Link
              href={`/${locale}/work/${item.slug}`}
              className="mt-5 inline-block text-sm text-accentPrimary"
              onClick={() => trackEvent('portfolio_item_open', { locale, slug: item.slug })}
            >
              {locale === 'ar' ? 'عرض المشروع' : 'View project'}
            </Link>
          </Card>
        ))}
      </div>
    </Container>
  </SectionShell>
);
