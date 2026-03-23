'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { trackEvent } from '@/lib/utils/analytics';
import type { Locale } from '@/lib/i18n/config';

export const Hero = ({ locale, content }: { locale: Locale; content: { headline: string; subheadline: string; primaryCta: string; secondaryCta: string } }) => {
  const reduced = useReducedMotion();
  return (
    <section className="pt-24 md:pt-32">
      <Container>
        <motion.div initial={reduced ? undefined : { opacity: 0, y: 10 }} animate={reduced ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{content.headline}</h1>
          <p className="mt-6 max-w-3xl text-lg text-textSecondary">{content.subheadline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`/${locale}/start-project`} className="" >
              <span onClick={() => trackEvent('hero_primary_cta_click', { locale })}>{content.primaryCta}</span>
            </Button>
            <Button href={`/${locale}/work`} variant="ghost">
              <span onClick={() => trackEvent('hero_secondary_cta_click', { locale })}>{content.secondaryCta}</span>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
