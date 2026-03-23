import { Container } from '../ui/container';
import { SectionShell } from '../ui/section-shell';

export const ProcessSteps = ({ heading, steps }: { heading: string; steps: string[] }) => (
  <SectionShell>
    <Container>
      <h2 className="mb-8 text-3xl font-semibold md:text-4xl">{heading}</h2>
      <ol className="grid gap-4 md:grid-cols-5">
        {steps.map((step, idx) => <li key={step} className="rounded-card border border-borderSubtle bg-surface p-5 text-sm"><span className="mb-2 block text-xs text-textSecondary">0{idx + 1}</span>{step}</li>)}
      </ol>
    </Container>
  </SectionShell>
);
