import { Reveal, Stagger, Item, MaskWords } from './motion';

export default function Education() {
  return (
    <section id="education" className="bg-raised py-24 md:py-32">
      <div className="page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal as="p" className="label">Education</Reveal>
          <MaskWords as="h2" className="h-section mt-4 block" text="What I studied, and what is next" />
        </div>
        <Stagger className="grid gap-12 sm:grid-cols-2 lg:col-span-8" gap={0.1}>
          <Item>
            <p className="text-sm text-muted">Elizade University</p>
            <h3 className="mt-2 font-display text-2xl leading-tight">B.Sc. Human Resource Management</h3>
            <p className="mt-4 text-muted">
              Organisational design, talent systems, labour relations and compensation, with coursework in industrial psychology, performance appraisal and strategic management.
            </p>
          </Item>
          <Item>
            <p className="text-sm text-muted">Final-year research</p>
            <h3 className="mt-2 font-display text-2xl leading-tight">Training and employee performance at the NDDC</h3>
            <p className="mt-4 text-muted">
              A quantitative study of how training affects performance at the Niger Delta Development Commission, read through Bandura&rsquo;s social learning theory.
            </p>
          </Item>
          <Item className="border-t border-line pt-6 sm:col-span-2">
            <p className="text-sm text-muted">Next</p>
            <p className="mt-2 font-display text-xl leading-snug">
              A master&rsquo;s degree in strategy or organisational leadership. I&rsquo;m comparing programmes and application timelines now.
            </p>
          </Item>
        </Stagger>
      </div>
    </section>
  );
}
