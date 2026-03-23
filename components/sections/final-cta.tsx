import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { SectionShell } from '../ui/section-shell';

export const FinalCTA = ({ locale, title, body }: { locale: string; title: string; body: string }) => (
  <SectionShell>
    <Container>
      <div className="rounded-section border border-borderSubtle bg-surfaceElevated p-8 md:p-12">
        <h2 className="max-w-3xl text-3xl font-semibold md:text-4xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-textSecondary">{body}</p>
        <div className="mt-6"><Button href={`/${locale}/start-project`}>{locale === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}</Button></div>
      </div>
    </Container>
  </SectionShell>
);
