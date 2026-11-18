'use client';
import { motion } from 'framer-motion';
import { EASE } from './motion';

const social = [
  ['https://linkedin.com', 'fa-brands fa-linkedin-in', 'LinkedIn'],
  ['https://instagram.com', 'fa-brands fa-instagram', 'Instagram'],
  ['https://x.com', 'fa-brands fa-x-twitter', 'X'],
  ['mailto:obuzorhomavictory@gmail.com', 'fa-regular fa-envelope', 'Email'],
];

export default function Footer() {
  const word = 'Victory Homa';
  return (
    <footer className="grain grain-light relative isolate overflow-hidden bg-olive text-cream">
      <div className="page pt-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-cream/75">HR, corporate communications and brand strategy. Abuja and Port Harcourt, Nigeria.</p>
          <div className="flex gap-2">
            {social.map(([href, icon, label]) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 transition-colors duration-300 hover:bg-cream hover:text-olive">
                <i className={icon} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <motion.div
          className="footer-word mt-16 select-none font-display leading-[0.8] tracking-[-0.04em]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
          aria-hidden="true"
        >
          {word.split('').map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
              <motion.span
                className={`inline-block ${i > 7 ? 'italic text-[#e9d7b0]' : ''}`}
                variants={{ hidden: { y: '100%' }, show: { y: '0%', transition: { duration: 0.9, ease: EASE } } }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            </span>
          ))}
        </motion.div>

        <div className="mt-10 flex flex-col gap-4 border-t border-cream/15 py-8 text-sm text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>&copy; <span id="yearNow">2026</span> Victory Homa Obuzor</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>Built by Acies Technology Africa</span>
            <a href="tel:08143972347" className="link-u">0814 397 2347</a>
            <a
              href="https://wa.me/2348143972347?text=Hello%20Acies%20Technology%20Africa,%20I%20am%20reaching%20out%20from%20Victory%20Homa%20Obuzor%20Portfolio"
              target="_blank" rel="noopener noreferrer" className="link-u text-cream"
            >
              <i className="fa-brands fa-whatsapp mr-1" aria-hidden="true" />WhatsApp
            </a>
            <a href="#top" className="link-u text-cream">Back to top <i className="fa-solid fa-arrow-up ml-1" aria-hidden="true" /></a>
          </p>
        </div>
      </div>
    </footer>
  );
}
