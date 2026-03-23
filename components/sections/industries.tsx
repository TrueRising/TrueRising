import { Container } from '../ui/container';
import { SectionShell } from '../ui/section-shell';

export const Industries = ({ heading, industries }: { heading: string; industries: string[] }) => (
  <SectionShell>
    <Container>
      <h2 className="mb-8 text-3xl font-semibold md:text-4xl">{heading}</h2>
      <div className="grid gap-4 md:grid-cols-3">{industries.map((ind) => <div key={ind} className="rounded-card border border-borderSubtle bg-surface p-5 text-textSecondary">{ind}</div>)}</div>
    </Container>
  </SectionShell>
);
