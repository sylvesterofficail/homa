import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Principle from '@/components/Principle';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Life from '@/components/Life';
import Now from '@/components/Now';
import Archive from '@/components/Archive';
import CV from '@/components/CV';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Shells from '@/components/Shells';

export default function Page() {
  return (
    <div id="top">
      <Nav />
      <main>
        <Hero />
        <About />
        <Principle />
        <Projects />
        <Experience />
        <Education />
        <Life />
        <Now />
        <Archive />
        <CV />
        <Contact />
      </main>
      <Footer />
      <Shells />
    </div>
  );
}
