/* ==========================================================================
   VICTORY HOMA — ENHANCEMENT LAYER (v1)
   Preloader, split-word headings, image curtains, parallax, back-to-top ring.
   Runs after script.js and does not touch its features.
   ========================================================================== */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- 1. Preloader ---------- */
  const preloader = $('#hxPreloader');
  const start = performance.now();
  let lifted = false;
  function lift() {
    if (lifted) return;
    lifted = true;
    const wait = reduceMotion ? 0 : Math.max(0, 950 - (performance.now() - start));
    setTimeout(() => {
      if (preloader) preloader.classList.add('is-done');
      document.body.classList.remove('is-loading');
      setTimeout(() => preloader && preloader.remove(), 1200);
    }, wait);
  }
  if (document.readyState === 'complete') lift();
  else window.addEventListener('load', lift);
  setTimeout(lift, 2600); // never block on slow assets

  /* ---------- 2. Split section headings into words ---------- */
  function splitWords(el) {
    let i = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const outer = document.createElement('span');
            outer.className = 'hx-w';
            const inner = document.createElement('span');
            inner.textContent = part;
            inner.style.setProperty('--i', i++);
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') {
          walk(child);
        }
      });
    };
    walk(el);
    el.classList.add('hx-split');
  }

  const splitTargets = $$('.section-head h2, .hx-quote');
  if (!reduceMotion) splitTargets.forEach(splitWords);

  /* ---------- 3. In-view observer for splits + image curtains ---------- */
  const inviewTargets = [...$$('.hx-split'), ...$$('.hx-img-reveal')];
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
    inviewTargets.forEach((el) => io.observe(el));
  } else {
    inviewTargets.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- 4. Scroll-linked: parallax + back-to-top ring ---------- */
  const parallaxEls = $$('[data-parallax]');
  const toTop = $('#hxToTop');
  const toTopBar = $('#hxToTopBar');
  const RING = 2 * Math.PI * 21;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? y / max : 0;

    if (toTop) toTop.classList.toggle('is-visible', y > window.innerHeight * 0.8);
    if (toTopBar) toTopBar.style.strokeDashoffset = String(RING * (1 - p));

    if (!reduceMotion) {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0)`;
      });
    }
    ticking = false;
  }
  if (toTopBar) toTopBar.style.strokeDasharray = String(RING);
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

})();
