import { Badge } from '../ui/badge';
import { Container } from '../ui/container';
import { SectionShell } from '../ui/section-shell';

export const WhyNageeb = ({ heading, pillars }: { heading: string; pillars: string[] }) => (
  <SectionShell>
    <Container>
      <h2 className="mb-8 text-3xl font-semibold md:text-4xl">{heading}</h2>
      <div className="flex flex-wrap gap-3">{pillars.map((p) => <Badge key={p} text={p} />)}</div>
    </Container>
  </SectionShell>
);
