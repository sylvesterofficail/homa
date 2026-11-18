'use client';
import { motion } from 'framer-motion';
import { asset } from '@/lib/asset';
import { Reveal, MaskWords, EASE } from './motion';

const cvs = [
  {
    mode: 'hr',
    id: 'previewHrCvBtn',
    dl: 'downloadHrPdfBtn',
    file: 'Obuzor_Homa_Victory_HR_Corporate_Communications_Resume.pdf',
    title: 'HR, administration and communications',
    lines: ['FCMB Pensions, Strategy & Corporate Comms', 'Kodesh Skincare, HR Manager', 'Castel Resources, HR Intern', 'Meridian Hospital, HR & Admin Intern'],
    skills: 'Recruitment, HR records, policy and SOPs, PenCom awareness, corporate communications',
    tilt: -2,
  },
  {
    mode: 'marketing',
    id: 'previewMarketingCvBtn',
    dl: 'downloadMarketingPdfBtn',
    file: 'Obuzor_Homa_Victory_Social_Media_Digital_Marketing_Resume.pdf',
    title: 'Social media, content and email marketing',
    lines: ['Dine with Shine, Social Media Manager', 'Xotic Queens, Social Media Manager', 'Kodesh Skincare, Social Media', 'Kive Stores, Email Marketing'],
    skills: 'Reels and visual storytelling, Meta Business Suite, email campaigns, CapCut, Canva, SEO captions',
    tilt: 2,
  },
];

export default function CV() {
  return (
    <section id="cv" className="py-24 md:py-32">
      <div className="page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal as="p" className="label">Résumé</Reveal>
            <MaskWords as="h2" className="h-section mt-4 block" text="Two CVs, one for each track" />
          </div>
          <Reveal as="p" className="lede lg:col-span-5" delay={0.1}>
            Download the PDF, or read it here and print it from your browser.
          </Reveal>
        </div>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-20">
          {cvs.map((c, i) => (
            <motion.div
              key={c.mode}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: c.tilt }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
              whileHover={{ rotate: 0, y: -8, transition: { duration: 0.35, ease: EASE } }}
              className="cv-sheet mx-auto w-full max-w-md"
            >
              <div className="sheet rounded-sm bg-[#fbf9f4] p-8 text-[#191e19] shadow-lift md:p-10">
                <div className="border-b border-[#191e19]/15 pb-5">
                  <div className="font-display text-3xl">Obuzor Homa Victory</div>
                  <div className="mt-1 text-sm text-[#5d665c]">{c.title}</div>
                </div>
                <div className="mt-5 text-xs font-semibold text-[#9a702c]">Experience</div>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {c.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <div className="mt-5 text-xs font-semibold text-[#9a702c]">Skills</div>
                <p className="mt-2 text-sm text-[#5d665c]">{c.skills}</p>
                <div className="mt-6 space-y-2" aria-hidden="true">
                  <div className="h-1.5 w-full rounded bg-[#191e19]/10" />
                  <div className="h-1.5 w-5/6 rounded bg-[#191e19]/10" />
                  <div className="h-1.5 w-2/3 rounded bg-[#191e19]/10" />
                </div>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={asset(`assets/docs/${c.file}`)} download={c.file} id={c.dl} className="b-solid">
                  <i className="fa-solid fa-file-arrow-down" aria-hidden="true" /> Download PDF
                </a>
                <button id={c.id} className="b-line" data-cv-mode={c.mode}>Read it here</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
