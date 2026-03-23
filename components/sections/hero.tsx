'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { trackEvent } from '@/lib/utils/analytics';
import type { Locale } from '@/lib/i18n/config';

type HeroContent = {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  kpis?: Array<{ label: string; value: string }>;
  proofLine?: string;
};

const defaultKpis = {
  en: [
    { value: '42%', label: 'Median lift in qualified leads' },
    { value: '<1.2s', label: 'Hero LCP on flagship launches' },
    { value: '7 days', label: 'Strategy sprint to go-live roadmap' }
  ],
  ar: [
    { value: '42%', label: 'متوسط زيادة العملاء المؤهلين' },
    { value: '<1.2s', label: 'زمن LCP في الصفحات الرئيسية' },
    { value: '7 أيام', label: 'من ورشة الاستراتيجية لخارطة الإطلاق' }
  ]
};

export const Hero = ({ locale, content }: { locale: Locale; content: HeroContent }) => {
  const reduced = useReducedMotion();
  const kpis = content.kpis ?? (locale === 'ar' ? defaultKpis.ar : defaultKpis.en);

  return (
    <section className="relative overflow-clip pb-14 pt-24 md:pb-20 md:pt-32">
      <Container>
        <div className="relative overflow-hidden rounded-section border border-white/10 bg-[#0A0A0A]/75 p-6 shadow-premium backdrop-blur-xl md:p-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            poster="/media/obsidian-hero-poster.svg"
          >
            <source src="/media/obsidian-hero.webm" type="video/webm" />
            <source src="/media/obsidian-hero.mp4" type="video/mp4" />
          </video>
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,10,10,0.94)_20%,rgba(10,10,10,0.66)_58%,rgba(45,91,255,0.26)_100%)]" />

          <motion.div
            className="relative z-10"
            initial={reduced ? undefined : { opacity: 0, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="inline-flex items-center rounded-full border border-white/15 bg-black/30 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-white/80">
              {content.eyebrow ?? (locale === 'ar' ? 'استوديو Obsidian للنمو الرقمي' : 'Obsidian Digital Growth Studio')}
            </p>
            <h1 className="mt-6 max-w-5xl text-balance text-4xl font-semibold leading-tight md:text-6xl">
              {content.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/78 md:text-xl">{content.subheadline}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                href={`/${locale}/start-project`}
                className="min-w-44 bg-gradient-to-r from-accentPrimary to-[#2D5BFF] shadow-[0_12px_30px_rgba(47,107,255,0.35)]"
                onClick={() => trackEvent('hero_primary_cta_click', { locale })}
              >
                {content.primaryCta}
              </Button>
              <Button
                href={`/${locale}/work`}
                variant="ghost"
                className="group border-white/20 bg-black/15 hover:bg-black/35"
                onClick={() => trackEvent('hero_secondary_cta_click', { locale })}
              >
                <span>{content.secondaryCta}</span>
                <ArrowUpRight className="ms-1.5 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </div>

            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-card border border-white/10 bg-black/35 px-4 py-4">
                  <p className="text-2xl font-semibold text-white md:text-3xl">{kpi.value}</p>
                  <p className="mt-1 text-sm text-white/70">{kpi.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm uppercase tracking-[0.12em] text-white/70">
              {content.proofLine ??
                (locale === 'ar'
                  ? 'تجربة مبنية لفرق الإدارة، التسويق، والمبيعات في الشركات الجادة.'
                  : 'Built for leadership, marketing, and sales teams that buy outcomes—not templates.')}
            </p>
          </motion.div>
        </div>
        <motion.div
          className="mt-5 h-[2px] origin-left bg-gradient-to-r from-transparent via-accentPrimary to-transparent"
          initial={reduced ? undefined : { scaleX: 0.35, opacity: 0.4 }}
          animate={reduced ? undefined : { scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </Container>
    </section>
  );
};
