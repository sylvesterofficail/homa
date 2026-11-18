'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { asset } from '@/lib/asset';
import { Reveal, Stagger, Item, MaskWords, EASE } from './motion';

const strengths = [
  {
    h: 'People operations',
    p: 'Screened 50+ candidates, wrote employee handbooks and SOPs, and kept HR records in order at Kodesh Skincare, Castel Resources and Meridian Hospital.',
  },
  {
    h: 'Corporate communications',
    p: 'At FCMB Pensions: pension literacy content, a full website content review and support for the Itual Academy launch, all inside PenCom rules.',
  },
  {
    h: 'Brand and social content',
    p: 'Ran Instagram, TikTok and Meta for Dine with Shine, Kodesh and Xotic Queens, and retention email for Kive Stores.',
  },
  {
    h: 'Building ventures',
    p: 'Founder of Green Money Planner, a budgeting framework that takes the shame out of money for young professionals.',
  },
];

const path = [
  ['HR and people', 'Elizade University, then HR internships'],
  ['Digital media', 'Social content for consumer brands'],
  ['Corporate comms', 'NYSC at FCMB Pensions'],
  ['Brand strategy', 'Advisory work and ventures'],
];

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32">
      <div className="page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-lg bg-raised"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 1, ease: EASE }}
            >
              <motion.img
                style={{ y: imgY, scale: 1.12 }}
                src={asset('assets/images/homa_half.webp')}
                alt="Portrait of Victory Homa against a blue studio backdrop"
                loading="lazy"
                className="h-full w-full object-cover object-[50%_20%]"
              />
            </motion.div>
            <p className="mt-4 text-sm text-muted">B.Sc. Human Resource Management, Elizade University.</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal as="p" className="label">About</Reveal>
          <MaskWords
            as="h2"
            className="mt-4 block font-display text-2xl leading-[1.25] md:text-3xl md:leading-[1.15] tracking-[-0.015em]"
            text="I work where people, process and message meet: hiring and onboarding, policy that people actually read, and brand stories that bring customers through the door."
          />

          <Stagger className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2" gap={0.08}>
            {strengths.map((s) => (
              <Item key={s.h} className="border-t border-line pt-5">
                <h3 className="text-base font-semibold">{s.h}</h3>
                <p className="mt-2 text-sm text-muted">{s.p}</p>
              </Item>
            ))}
          </Stagger>

          <Stagger className="mt-16 grid grid-cols-3 gap-6 border-y border-line py-8" gap={0.1}>
            {[
              ['50+', 'candidates screened'],
              ['7', 'organisations'],
              ['4', 'years across HR and comms'],
            ].map(([n, l]) => (
              <Item key={l}>
                <div className="font-display text-3xl md:text-4xl leading-none">{n}</div>
                <div className="mt-2 text-sm text-muted">{l}</div>
              </Item>
            ))}
          </Stagger>

          <div className="mt-16">
            <Reveal as="h3" className="text-base font-semibold">How the path has gone so far</Reveal>
            <Stagger as="ol" className="path mt-6 grid gap-6 sm:grid-cols-4" gap={0.1}>
              {path.map(([h, s], i) => (
                <Item as="li" key={h} className="relative pt-6">
                  <span className="path-dot" aria-hidden="true" />
                  <span className="text-xs text-gold">Step {i + 1}</span>
                  <div className="mt-1 font-display text-xl leading-tight">{h}</div>
                  <div className="mt-1 text-sm text-muted">{s}</div>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
