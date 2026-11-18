'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { asset } from '@/lib/asset';
import { EASE } from './motion';

function Letters({ word, delay, className }) {
  return (
    <span className={className} aria-hidden="true">
      {word.split('').map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="inline-block"
            initial={{ y: '102%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.045 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const coverLines = [
  { k: 'Now', t: 'Strategy & Corporate Communications', s: 'NYSC at FCMB Pensions, Abuja', pos: 'top-[38%]' },
  { k: 'HR', t: '50+ candidates screened', s: 'as HR Manager at Kodesh Skincare', pos: 'top-[54%]' },
  { k: 'Founder', t: 'Green Money Planner', s: 'budgeting for young Nigerians', pos: 'top-[70%]' },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const figY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section ref={ref} id="home" className="hero grain grain-light relative isolate overflow-hidden bg-olive text-cream">
      <div className="page relative flex min-h-[100svh] flex-col pt-[88px] pb-8">
        {/* Masthead */}
        <motion.h1 style={{ y: nameY }} className="hero-name relative z-0 font-display font-normal" aria-label="Victory Homa">
          <Letters word="Victory" delay={0.15} className="block" />
          <Letters word="Homa" delay={0.45} className="hero-homa block italic text-[#e9d7b0]" />
        </motion.h1>

        {/* Figure */}
        <motion.div
          style={{ y: figY }}
          className="hero-figure pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center"
        >
          <motion.img
            src={asset('assets/images/homa_cutout_full.webp')}
            alt="Victory Homa in a blue and gold jacquard agbada, holding a burgundy bag"
            width={390}
            height={940}
            fetchPriority="high"
            initial={{ opacity: 0, y: 60, clipPath: 'inset(100% -40% -15% -40%)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(-15% -40% -15% -40%)' }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
            className="h-full w-auto select-none object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
          />
        </motion.div>

        {/* Cover lines (desktop) */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
          <div className="page h-full"><div className="relative h-full">
            {coverLines.map((c, i) => (
              <motion.div
                key={c.k}
                className={`cover-line absolute right-0 text-right ${c.pos}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05 + i * 0.12, duration: 0.5 }}
              >
                <motion.span
                  className="cover-rule cover-rule-r"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.05 + i * 0.12, duration: 0.7, ease: EASE }}
                />
                <span className="block text-xs font-semibold text-[#d8af65]">{c.k}</span>
                <span className="block text-base font-semibold leading-snug">{c.t}</span>
                <span className="block text-sm text-cream/70">{c.s}</span>
              </motion.div>
            ))}
          </div></div>
        </div>

        {/* Footer row */}
        <div className="relative z-20 mt-auto grid gap-8 lg:grid-cols-12 lg:items-end">
          <motion.div
            className="hero-intro lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.6, ease: EASE }}
          >
            <p className="max-w-[30rem] text-base text-cream/85">
              HR and corporate communications graduate. I build people systems, and the stories that help organisations explain themselves.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="b bg-cream text-olive hover:bg-[#e9d7b0]">See the work</a>
              <button id="heroSigCvBtn" className="cv-preview-trigger b-ghost-light" data-cv-mode="hr">Read the CV</button>
            </div>
          </motion.div>
          <motion.p
            className="flex items-center gap-2 text-sm text-cream/70 lg:col-span-4 lg:col-start-9 lg:justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <i className="fa-solid fa-location-dot text-[#d8af65]" aria-hidden="true" />
            Abuja and Port Harcourt, open to new roles
          </motion.p>
        </div>
      </div>
    </section>
  );
}
