'use client';
import { useRef } from 'react';
import { asset } from '@/lib/asset';
import { motion } from 'framer-motion';
import { Reveal, Item, MaskWords } from './motion';

// data-life keys open the matching notes in the interactive layer.
const items = [
  { key: 'fashion', title: 'Style', note: 'Tailoring, texture and Nigerian fabric worn with intent.', img: 'homa_cutout_half.webp', cut: true },
  { key: 'reading', title: 'Reading', note: 'Psychology, money behaviour and biographies of builders.', img: 'life_reading.jpg' },
  { key: 'interior', title: 'Interiors', note: 'Natural light, warm materials, rooms that calm people down.', img: 'life_interior.jpg' },
  { key: 'travel', title: 'Aviation', note: 'A long-held interest in flight operations and airports.', img: 'life_travel.jpg' },
  { key: 'food', title: 'Food', note: 'Good tables, good coffee, long conversations.', img: 'life_food.jpg' },
  { key: 'sports', title: 'Tennis', note: 'Training that keeps the head clear on long weeks.', img: 'life_sports.jpg' },
];

export default function Life() {
  const track = useRef(null);
  const nudge = (dir) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' });
  };

  return (
    <section id="life" className="py-24 md:py-32">
      <div className="page flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal as="p" className="label">Outside work</Reveal>
          <MaskWords as="h2" className="h-section mt-4 block" text="What keeps me curious" />
        </div>
        <Reveal className="flex gap-2" delay={0.1}>
          <button onClick={() => nudge(-1)} className="nav-icon border border-line" aria-label="Scroll left">
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          </button>
          <button onClick={() => nudge(1)} className="nav-icon border border-line" aria-label="Scroll right">
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </button>
        </Reveal>
      </div>

      <motion.ul
        ref={track}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        className="life-track mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6"
      >
        {items.map((it) => (
          <Item as="li" key={it.key} className="w-[78vw] shrink-0 snap-start sm:w-[22rem]">
            <button data-life={it.key} className="group block w-full text-left">
              <span className={`relative block aspect-[3/4] overflow-hidden rounded-lg ${it.cut ? 'bg-olive' : 'bg-raised'}`}>
                {it.cut && (
                  <span className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom,rgba(216,175,101,0.45),transparent_70%)]" aria-hidden="true" />
                )}
                <img
                  src={asset(`assets/images/${it.img}`)}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-105 ${it.cut ? 'object-contain object-bottom pt-8' : 'object-cover'}`}
                />
              </span>
              <span className="mt-4 flex items-baseline justify-between gap-4">
                <span className="font-display text-2xl">{it.title}</span>
                <span className="text-sm text-muted transition-colors group-hover:text-ink">Notes</span>
              </span>
              <span className="mt-1 block text-sm text-muted">{it.note}</span>
            </button>
          </Item>
        ))}
      </motion.ul>
    </section>
  );
}
