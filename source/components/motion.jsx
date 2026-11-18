'use client';
import { motion } from 'framer-motion';

/** Shared motion vocabulary: short distances, one easing, quick durations. */
export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden: fadeUp.hidden,
        show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } },
      }}
      {...rest}
    >
      {children}
    </M>
  );
}

export function Stagger({ as = 'div', gap = 0.06, className, children, ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </M>
  );
}

export function Item({ as = 'div', className, children, ...rest }) {
  const M = motion[as];
  return (
    <M className={className} variants={fadeUp} {...rest}>
      {children}
    </M>
  );
}

/** Splits a heading into words that rise out of a mask. */
export function MaskWords({ text, className, delay = 0, as = 'span' }) {
  const M = motion[as];
  const words = text.split(' ');
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '105%' }, show: { y: '0%', transition: { duration: 0.7, ease: EASE } } }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </M>
  );
}
