import { Reveal, Stagger, Item, MaskWords } from './motion';

const now = [
  ['Building', 'Green Money Planner', 'The budgeting framework, first user flows and brand.'],
  ['Working on', 'FCMB corporate comms', 'Website content and pension education.'],
  ['Learning', 'Email and retention', 'Lifecycle emails, copy structure, conversion.'],
  ['Aiming for', 'A strategy role', 'Plus an MVP launch and a master’s place.'],
];

export default function Now() {
  return (
    <section id="currently" className="border-t border-line py-24 md:py-28">
      <div className="page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal as="p" className="label">Right now</Reveal>
          <MaskWords as="h2" className="h-section mt-4 block" text="This season" />
          <Reveal as="p" className="mt-4 text-sm text-muted" delay={0.1}>Updated November 2026.</Reveal>
        </div>
        <Stagger className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8" gap={0.08}>
          {now.map(([k, h, p]) => (
            <Item key={k}>
              <p className="flex items-center gap-2 text-sm font-semibold text-gold">
                <span className="now-dot" aria-hidden="true" />
                {k}
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight">{h}</h3>
              <p className="mt-2 text-sm text-muted">{p}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
