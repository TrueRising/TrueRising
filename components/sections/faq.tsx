import { Container } from '../ui/container';
import { SectionShell } from '../ui/section-shell';

export const FAQ = ({ locale, items }: { locale: 'ar' | 'en'; items: Array<{ q: string; a: string }> }) => (
  <SectionShell>
    <Container>
      <h2 className="mb-8 text-3xl font-semibold md:text-4xl">{locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.q} className="rounded-card border border-borderSubtle bg-surface p-5">
            <summary className="cursor-pointer font-medium">{item.q}</summary>
            <p className="mt-3 text-sm text-textSecondary">{item.a}</p>
          </details>
        ))}
      </div>
    </Container>
  </SectionShell>
);
