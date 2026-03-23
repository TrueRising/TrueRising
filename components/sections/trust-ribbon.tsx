import { Container } from '../ui/container';

export const TrustRibbon = ({ items }: { items: string[] }) => (
  <section className="py-8">
    <Container>
      <div className="grid gap-3 rounded-section border border-borderSubtle bg-surface p-6 md:grid-cols-4">
        {items.map((item) => <p key={item} className="text-sm text-textSecondary">{item}</p>)}
      </div>
    </Container>
  </section>
);
