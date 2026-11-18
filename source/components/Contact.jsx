import { asset } from '@/lib/asset';
import { Reveal, Stagger, Item, MaskWords } from './motion';

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-24 md:py-32">
      <div className="page grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal as="p" className="label">Contact</Reveal>
          <MaskWords as="h2" className="mt-4 block font-display text-3xl leading-[1.05] md:text-4xl tracking-[-0.02em]" text="Hiring, collaborating, or just saying hello?" />

          <Reveal className="mt-10 flex items-center gap-4" delay={0.1}>
            <img src={asset('assets/images/homa_neck.webp')} alt="Victory Homa" className="h-16 w-16 rounded-full object-cover object-top" loading="lazy" />
            <p className="text-sm text-muted">I usually reply within two working days.</p>
          </Reveal>

          <Stagger as="ul" className="mt-10 space-y-6" gap={0.08}>
            <Item as="li">
              <p className="text-sm text-muted">Email</p>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <a id="emailText" href="mailto:obuzorhomavictory@gmail.com" className="link-u break-all font-display text-xl md:text-2xl">
                  obuzorhomavictory@gmail.com
                </a>
                <button id="copyEmailBtn" className="text-sm font-semibold text-gold hover:text-ink">
                  <i className="fa-regular fa-copy mr-1" aria-hidden="true" />Copy
                </button>
              </div>
            </Item>
            <Item as="li">
              <p className="text-sm text-muted">LinkedIn</p>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="link-u mt-1 inline-block font-display text-xl md:text-2xl">
                Victory Homa Obuzor
              </a>
            </Item>
            <Item as="li">
              <p className="text-sm text-muted">Based in</p>
              <p className="mt-1 font-display text-xl md:text-2xl">Abuja and Port Harcourt</p>
            </Item>
          </Stagger>
        </div>

        <Reveal className="lg:col-span-6" delay={0.1}>
          <form id="contactForm" className="contact-form space-y-7 rounded-lg bg-raised p-6 md:p-10">
            <div className="field">
              <label htmlFor="senderName">Your name</label>
              <input id="senderName" placeholder="Adeola Williams" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="senderEmail">Your email</label>
              <input id="senderEmail" type="email" placeholder="adeola@company.com" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="messageType">What it&rsquo;s about</label>
              <select id="messageType" defaultValue="Professional Role / Placement">
                <option value="Professional Role / Placement">A role or placement</option>
                <option value="Brand & Strategy Consultation">Brand or strategy work</option>
                <option value="Green Money Planner Collaboration">Green Money Planner</option>
                <option value="Speaking or Interview Inquiry">Speaking or an interview</option>
                <option value="General Hello">Just saying hello</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="senderMessage">Message</label>
              <textarea id="senderMessage" rows={4} placeholder="A little about the role, project or idea" required />
            </div>
            <button type="submit" className="b-solid w-full">
              Write the email <i className="fa-solid fa-paper-plane" aria-hidden="true" />
            </button>
            <p className="text-center text-xs text-muted">This opens your email app with the message filled in.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
