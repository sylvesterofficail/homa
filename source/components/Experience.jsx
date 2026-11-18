import { Reveal, Stagger, Item, MaskWords } from './motion';

// data-category + data-dossier + .exp-card are read by the interactive layer (filter + dossier modal).
const jobs = [
  { key: 'fcmb', cat: 'strategy hr', when: '2025 to now', org: 'FCMB Pensions Limited', role: 'NYSC, Strategy & Corporate Communications', where: 'Abuja', icon: 'fa-landmark' },
  { key: 'dinewithshine', cat: 'marketing strategy', when: 'Feb 2026', org: 'Dine with Shine', role: 'Social media manager and content strategist', where: 'Abuja', icon: 'fa-utensils' },
  { key: 'xoticqueens', cat: 'marketing', when: 'Feb to Dec 2025', org: 'Xotic Queens Beauty', role: 'Social media manager', where: 'Remote', icon: 'fa-wand-magic-sparkles' },
  { key: 'kive', cat: 'marketing strategy', when: '2025', org: 'Kive Stores Limited', role: 'Business support and email marketing', where: 'Remote', icon: 'fa-store' },
  { key: 'kodesh', cat: 'hr marketing', when: 'Oct 2024 to May 2025', org: 'Kodesh Skincare & Spa', role: 'HR manager and social media manager', where: 'Port Harcourt', icon: 'fa-spa' },
  { key: 'castel', cat: 'hr', when: 'Aug to Oct 2024', org: 'Castel Resources', role: 'HR intern, industrial training', where: 'Port Harcourt', icon: 'fa-briefcase' },
  { key: 'meridian', cat: 'hr', when: 'Aug to Oct 2023', org: 'Meridian Hospital', role: 'HR and administrative intern', where: 'Port Harcourt', icon: 'fa-hospital' },
];

const filters = [
  ['all', 'Everything'],
  ['strategy', 'Strategy & comms'],
  ['hr', 'HR & people'],
  ['marketing', 'Social & digital'],
];

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line py-24 md:py-32">
      <div className="page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal as="p" className="label">Experience</Reveal>
            <MaskWords as="h2" className="h-section mt-4 block" text="Where I have worked" />
          </div>
          <Reveal as="p" className="lede lg:col-span-5" delay={0.1}>
            Seven roles across pensions, hospitality, healthcare and beauty. Open any of them for the responsibilities and results.
          </Reveal>
        </div>

        <Reveal className="exp-filter-toolbar mt-12 flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label="Filter experience">
          {filters.map(([k, label], i) => (
            <button key={k} className={`chip-btn tab ${i === 0 ? 'active' : ''}`} data-exp-filter={k}>
              {label}
            </button>
          ))}
        </Reveal>

        <Stagger className="mt-8 flex flex-col border-t border-line" gap={0.05} id="experienceGrid">
          {jobs.map((j) => (
            <Item key={j.key}>
              <button
                className="exp-card group flex w-full flex-wrap items-center gap-x-6 gap-y-1 border-b border-line py-6 text-left md:flex-nowrap"
                data-category={j.cat}
                data-dossier={j.key}
              >
                <span className="w-full text-sm text-muted md:w-48 md:shrink-0">{j.when}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-2xl leading-tight transition-colors duration-300 group-hover:text-gold">{j.org}</span>
                  <span className="mt-1 block text-sm text-muted">{j.role}</span>
                </span>
                <span className="hidden w-36 shrink-0 text-sm text-muted md:block">
                  <i className={`fa-solid ${j.icon} mr-2 text-gold`} aria-hidden="true" />
                  {j.where}
                </span>
                <span className="text-sm font-semibold opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  Open <i className="fa-solid fa-arrow-right ml-1" aria-hidden="true" />
                </span>
              </button>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
