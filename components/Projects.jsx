'use client';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { asset } from '@/lib/asset';
import { Reveal, Stagger, Item, MaskWords, EASE } from './motion';

// Each row keeps the id / data-dossier hook that the interactive layer listens for.
const rows = [
  { title: 'ManagedbyHoma', kind: 'Brand and creative studio', year: '2024 to now', img: 'proj_managed_homa.jpg', hook: { 'data-dossier': 'managedbyhoma' } },
  { title: 'Dine with Shine', kind: 'Seven-day brand turnaround, Abuja', year: '2026', img: 'life_food.jpg', hook: { 'data-dossier': 'dinewithshine' } },
  { title: 'NDDC employee performance', kind: 'B.Sc. research thesis', year: '2024', img: 'proj_nysc_research.jpg', hook: { id: 'openNddcStudyBtn' } },
  { title: 'Campus Cart', kind: 'Student delivery marketplace', year: 'Concept', img: 'proj_campus_cart.jpg', hook: { id: 'openCampusCartBtn' } },
];

export default function Projects() {
  const listRef = useRef(null);
  const [active, setActive] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  const onMove = (e) => {
    const r = listRef.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal as="p" className="label">Selected work</Reveal>
            <MaskWords as="h2" className="h-section mt-4 block" text="Things I have built and run" />
          </div>
          <Reveal as="p" className="lede lg:col-span-5" delay={0.1}>
            Each project opens into a short case study: the problem, what I did, and what changed.
          </Reveal>
        </div>

        {/* Featured venture */}
        <div className="mt-16 grid overflow-hidden rounded-lg bg-raised lg:grid-cols-12">
          <motion.div
            className="relative min-h-[320px] overflow-hidden lg:col-span-7"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 1, ease: EASE }}
          >
            <img src={asset('assets/images/proj_green_money.jpg')} alt="Green Money Planner budgeting screens" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </motion.div>
          <Stagger className="flex flex-col justify-center gap-5 p-8 md:p-12 lg:col-span-5" gap={0.08}>
            <Item as="p" className="label">Founder and product lead</Item>
            <Item as="h3" className="font-display text-3xl leading-tight">Green Money Planner</Item>
            <Item as="p" className="text-muted">
              A budgeting framework for young Nigerian professionals living with high inflation. It splits income into needs, savings, a buffer and a guilt-free allowance, so planning stops feeling like punishment.
            </Item>
            <Item className="flex flex-wrap gap-3 pt-2">
              <button id="openGmpCaseStudyBtn" className="b-solid">
                <i className="fa-solid fa-calculator" aria-hidden="true" /> Try the calculator
              </button>
              <button id="viewGmpDetailsBtn" className="b-line">Read the case study</button>
            </Item>
          </Stagger>
        </div>

        {/* Index with cursor preview */}
        <div ref={listRef} className="relative mt-16" onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
          <Stagger as="ul" className="border-t border-line" gap={0.07}>
            {rows.map((r, i) => (
              <Item as="li" key={r.title} className="border-b border-line">
                <button
                  {...r.hook}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(null)}
                  className="proj-row group grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-6 text-left md:grid-cols-[7rem_1fr_16rem_auto] md:py-8"
                >
                  <span className="order-3 text-sm text-muted md:order-none">{r.year}</span>
                  <span className="font-display text-2xl leading-tight transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-3xl">
                    {r.title}
                  </span>
                  <span className="order-4 col-span-1 text-sm text-muted md:order-none">{r.kind}</span>
                  <span className="row-span-2 grid h-11 w-11 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-olive group-hover:bg-olive group-hover:text-cream md:row-span-1">
                    <i className="fa-solid fa-arrow-right -rotate-45 transition-transform duration-300 group-hover:rotate-0" aria-hidden="true" />
                  </span>
                  <img src={asset(`assets/images/${r.img}`)} alt="" loading="lazy" className="order-5 col-span-full mt-4 aspect-[16/9] w-full rounded-lg object-cover md:hidden" />
                </button>
              </Item>
            ))}
          </Stagger>

          <motion.div
            style={{ x: sx, y: sy }}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
            aria-hidden="true"
          >
            <AnimatePresence>
              {active !== null && (
                <motion.img
                  key={active}
                  src={asset(`assets/images/${rows[active].img}`)}
                  alt=""
                  className="h-56 w-80 -translate-x-1/2 -translate-y-[115%] rounded-lg object-cover shadow-lift"
                  initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
