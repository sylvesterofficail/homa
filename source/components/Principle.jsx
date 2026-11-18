'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { asset } from '@/lib/asset';
import { Reveal, Stagger, Item, MaskWords, EASE } from './motion';

export default function Principle() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-6%']);
  const ring = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section id="signature" ref={ref} className="grain grain-light relative isolate overflow-hidden bg-olive text-cream">
      <div className="page grid items-end gap-10 pt-24 md:pt-32 lg:grid-cols-12">
        <div className="relative flex justify-center lg:col-span-5">
          <motion.div
            style={{ rotate: ring }}
            className="absolute left-1/2 top-[8%] aspect-square w-[min(440px,90%)] -translate-x-1/2 rounded-full border border-dashed border-[#d8af65]/35"
            aria-hidden="true"
          />
          <div className="absolute left-1/2 top-[14%] aspect-square w-[min(360px,74%)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(216,175,101,0.35),transparent_68%)]" aria-hidden="true" />
          <motion.img
            style={{ y }}
            src={asset('assets/images/homa_cutout_half.webp')}
            alt="Victory Homa, waist-up, in a blue and gold jacquard look"
            loading="lazy"
            className="relative w-[min(420px,88%)] drop-shadow-[0_30px_30px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </div>

        <div className="pb-24 md:pb-32 lg:col-span-7 lg:pl-8">
          <Reveal as="p" className="text-sm font-semibold text-[#d8af65]">What I work by</Reveal>
          <blockquote className="mt-5">
            <MaskWords
              as="p"
              className="block font-display text-2xl leading-[1.2] md:text-[2.75rem] md:leading-[1.12] tracking-[-0.015em]"
              text="Organisations work when people feel seen, and brands last when they tell the truth well."
            />
          </blockquote>

          <Stagger className="mt-12 grid gap-8 sm:grid-cols-3" gap={0.1}>
            {[
              ['People first', 'Systems that make work fairer and easier to measure.'],
              ['Story with intent', 'Every message has a reason and a result to check.'],
              ['Quiet standards', 'Discretion, detail and follow-through.'],
            ].map(([h, p]) => (
              <Item key={h} className="border-t border-cream/20 pt-4">
                <h3 className="text-base font-semibold">{h}</h3>
                <p className="mt-2 text-sm text-cream/70">{p}</p>
              </Item>
            ))}
          </Stagger>

          <Reveal className="mt-12 flex items-center gap-4" delay={0.2}>
            <img src={asset('assets/images/homa_neck.webp')} alt="" className="h-14 w-14 rounded-full object-cover object-top ring-1 ring-[#d8af65]/60" />
            <div>
              <div className="font-display text-xl italic">Victory Homa Obuzor</div>
              <div className="text-sm text-cream/60">HR, communications and strategy</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
