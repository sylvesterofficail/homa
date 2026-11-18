/**
 * OBUZOR VICTORY HOMA — LIVING PORTFOLIO & ARCHIVE
 * Dynamic Interactions, Dossier Modals, Career Vault, Interactive CV System,
 * Budget Calculator, and Experience Filters.
 */

(function () {
  'use strict';

  // --- Utility selectors ---
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  // --- Local Storage Keys ---
  const ARCHIVE_KEY = 'victory_homa_archive_v3';
  const THEME_KEY = 'victory_homa_theme';
  const VAULT_KEY = 'victory_career_vault_unlocked';

  // ---------------- 1. TOAST NOTIFICATION SYSTEM ----------------
  const toast = $('#toastNotice');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = `<i class="fa-solid fa-check" style="margin-right:8px;"></i> ${message}`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // ---------------- 2. THEME CONTROLLER (LIGHT / DARK) ----------------
  const themeToggle = $('#themeToggle');

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.dataset.theme = activeTheme;
    updateThemeIcon(activeTheme);
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem(THEME_KEY, next);
      updateThemeIcon(next);
      showToast(next === 'dark' ? 'Dark editorial theme enabled' : 'Light warm paper theme enabled');
    });
  }

  initTheme();

  // ---------------- 3. STICKY NAVBAR & ACTIVE SCROLL SPY ----------------
  const navbar = $('#navbar');
  const sections = $$('section[id]');
  const navLinks = $$('.navlinks a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy with smart section mapping
    let currentId = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
        currentId = sec.getAttribute('id');
      }
    });

    const navMapping = {
      'about': '#about',
      'projects': '#projects',
      'experience': '#experience',
      'education': '#experience',
      'cv': '#experience',
      'life': '#life',
      'currently': '#life',
      'contact': '#contact'
    };

    const targetHref = navMapping[currentId] || `#${currentId}`;

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === targetHref) {
        link.classList.add('active');
      }
    });
  });

  // ---------------- 4. MOBILE NAVIGATION DRAWER ----------------
  const menuBtn = $('#menuBtn');
  const mobileDrawer = $('#mobileDrawer');
  const drawerClose = $('#drawerClose');
  const drawerBackdrop = $('#drawerBackdrop');
  const mobileLinks = $$('.mobile-navlinks a');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  mobileLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  const drawerVaultBtn = $('#drawerVaultBtn');
  if (drawerVaultBtn) {
    drawerVaultBtn.addEventListener('click', () => {
      closeDrawer();
      const navVaultBtn = $('#navVaultBtn');
      if (navVaultBtn) navVaultBtn.click();
    });
  }

  const drawerCvBtn = $('#drawerCvBtn');
  if (drawerCvBtn) {
    drawerCvBtn.addEventListener('click', () => {
      closeDrawer();
    });
  }

  // ---------------- 5. SCROLL REVEAL OBSERVER ----------------
  const revealElements = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }

  // ---------------- 6. UNIVERSAL MODAL SYSTEM ----------------
  const modalBackdrop = $('#modalBackdrop');
  const modalTitle = $('#modalTitle');
  const modalEyebrow = $('#modalEyebrow');
  const modalContent = $('#modalContent');
  const modalFooter = $('#modalFooter');
  const modalClose = $('#modalClose');

  function openModal(title, eyebrow, bodyHtml, footerHtml = '') {
    if (!modalBackdrop) return;
    modalTitle.textContent = title;
    modalEyebrow.textContent = eyebrow || 'PORTFOLIO ARCHIVE';
    modalContent.innerHTML = bodyHtml;
    modalFooter.innerHTML = footerHtml;
    modalFooter.style.display = footerHtml ? 'flex' : 'none';

    modalBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ---------------- 7. CAREER DOSSIERS DATA & SYSTEM ----------------
  const dossierData = {
    fcmb: {
      title: 'FCMB Pensions Limited',
      eyebrow: 'NYSC Placement · Strategy & Corporate Communications (2025–Present)',
      summary:
        'Serving in the Strategy & Corporate Communications Department at FCMB Pensions Limited, Abuja. Contributing to national pension education, website content architecture, and the newly developed Itual Academy digital learning portal.',
      known:
        'Key Responsibilities: Research, documentation, communication support, PenCom regulatory review, website content restructuring, and stakeholder education.',
      tasks: [
        'Content review and information architecture for FCMB Pensions Limited website project.',
        'Contributed to the launch of the Itual Academy website for workforce learning.',
        'Developed working understanding of PenCom guidelines and RSA multi-fund structures.',
        'Assisted with high-priority executive documentation and corporate brand consistency.'
      ],
      sections: [
        'Strategic Communications & Public Pension Literacy',
        'Website Content Audit & User Experience Alignment',
        'Itual Academy Digital Learning Platform Support',
        'PenCom Regulatory Framework & Compliance Documentation'
      ]
    },
    dinewithshine: {
      title: 'Dine with Shine, Abuja',
      eyebrow: 'Social Media Manager & Content Strategist · Contract (Feb 2026)',
      summary:
        'Led high-energy digital brand growth and food content positioning for Dine with Shine, a premier dining establishment in Abuja. Spearheaded a viral 7-day brand series that dramatically increased customer engagement and restaurant bookings.',
      known:
        'Key Achievements: Boosted weekly reach by 280%, developed SEO caption architecture, directed culinary visual storytelling and behind-the-scenes reels.',
      tasks: [
        'Managed daily social media content including high-retention reels, BTS footage, and promotional campaigns.',
        'Executed a 7-day brand review series that significantly boosted organic reach and diner interaction.',
        'Created SEO-optimized captions, hashtag clusters, and algorithmic discovery strategies.',
        'Directed visual storytelling and food positioning for high audience retention.'
      ],
      sections: [
        '7-Day Brand Turnaround Architecture',
        'Cinematic Reels Strategy & Visual Positioning',
        'Audience Conversion & Reservation Funnel',
        'Analytics & Audience Retention Metrics'
      ]
    },
    managedbyhoma: {
      title: 'ManagedbyHoma',
      eyebrow: 'Independent Creative Brand & Strategy Studio (2024–Present)',
      summary:
        'Independent consultancy delivering creative direction, brand positioning, editorial calendars, and client conversion strategies for lifestyle, beauty, and retail businesses.',
      known:
        'Core Focus: Shifting small businesses from chaotic posting to structured brand authority, client retention systems, and email marketing funnels.',
      tasks: [
        'Formulate tailored brand identities, color palettes, and tone of voice guidelines.',
        'Produce monthly content calendars combining educational, aesthetic, and sales-focused posts.',
        'Design lifecycle email sequences for client retention and repeat sales.',
        'Track KPI benchmarks: engagement rate, follower-to-client conversion, and reach.'
      ],
      sections: [
        'Studio Ethos & Brand Architecture',
        'Client Case Studies & Visual Guidelines',
        'Content Strategy Workflows & Conversion Copywriting',
        'Retention Systems & Lifecycle Email Marketing'
      ]
    },
    kodesh: {
      title: 'Kodesh Skincare & Spa',
      eyebrow: 'HR Manager (Hybrid) & Social Media Manager · Port Harcourt (Oct 2024 – May 2025)',
      summary:
        'Dual-capacity leadership managing both human resource administration (candidate pipelines of 50+ applicants) and brand social media presence for a high-end wellness establishment.',
      known:
        'Key Achievements: Screened 50+ candidates, created employee handbooks/SOPs, established workplace compliance, and managed social content calendars.',
      tasks: [
        'Coordinated recruitment and interview processes, including applicant vetting and documentation.',
        'Assisted in preparing employee handbooks, internal guidelines, and standard operating procedures (SOPs).',
        'Maintained confidential employee personnel records and performance reviews.',
        'Planned and executed social media content calendars targeting client bookings and spa treatments.',
        'Managed customer DMs, inquiries, and online service reputation.'
      ],
      sections: [
        'Talent Acquisition & Interview Rubrics (50+ Candidates)',
        'Standard Operating Procedures & Employee Handbook Development',
        'Personnel File Compliance & Performance Tracking',
        'Client Growth Social Media Strategy'
      ]
    },
    kive: {
      title: 'Kive Stores Limited / Kivestores',
      eyebrow: 'Business & Administrative Support / Email Marketing · Port Harcourt (2025)',
      summary:
        'Commercial operations, customer communication, and email marketing support for a fast-paced retail and gadget enterprise with a buy/sell/swap customer model.',
      known:
        'Key Contributions: Promotional email campaigns, graphic design support, customer correspondence, and daily administrative execution.',
      tasks: [
        'Wrote promotional email marketing campaigns and product announcement emails.',
        'Supported day-to-day business operations and fast-paced commercial activities.',
        'Handled customer-facing correspondence, inquiries, and transaction support.',
        'Produced digital content and graphic design assets for online promotions.'
      ],
      sections: [
        'Retail Operations & Administrative Agility',
        'Promotional Email Writing & Campaign Copy',
        'Customer Journey & Commercial Communication',
        'Graphic Design & Digital Promo Assets'
      ]
    },
    castel: {
      title: 'Castel Resources',
      eyebrow: 'Industrial Training Student – HR Intern · Port Harcourt (Aug–Oct 2024)',
      summary:
        'Intensive eight-week industrial attachment in human resource management, payroll administration, candidate interview coordination, and systematic record archiving.',
      known:
        'Key Learnings: Talent sourcing, payroll file verification, confidential employee record filing, and corporate training session organization.',
      tasks: [
        'Assisted in talent acquisition processes, interview scheduling, and candidate dossiers.',
        'Maintained payroll records and employee files with strict confidentiality and accuracy.',
        'Organized training sessions and managed attendance and performance reporting.',
        'Supported systematic filing and digital archiving of corporate HR records.',
        'Assisted with employee relations documentation and internal circulars.'
      ],
      sections: [
        'HRIS & Digital Data Entry Workflows',
        'Confidential Payroll Documentation & Filing',
        'Corporate Training Organization & Logistics',
        'Candidate Sourcing & Interview Protocols'
      ]
    },
    meridian: {
      title: 'Meridian Hospital',
      eyebrow: 'HR & Administrative Intern · Port Harcourt (Aug–Oct 2023)',
      summary:
        'Foundational healthcare human resource and administrative internship in a high-compliance medical environment.',
      known:
        'Key Responsibilities: Medical staff records, applicant screening, onboarding verification, and sensitive personnel data management.',
      tasks: [
        'Supported recruitment and interview scheduling for clinical and administrative roles.',
        'Maintained employee and applicant records using both HRIS and manual filing systems.',
        'Assisted with onboarding documentation and credential verification.',
        'Handled sensitive medical personnel data with utmost discretion and confidentiality.',
        'Supported general hospital administration and front-office inquiries.'
      ],
      sections: [
        'Healthcare HR Compliance & Credential Verification',
        'HRIS Database Administration & Archival Security',
        'Onboarding Procedures in Regulated Healthcare',
        'Discretion, Confidentiality & Ethical Standards'
      ]
    },
    xoticqueens: {
      title: 'Xotic Queens Beauty Skincare & Spa',
      eyebrow: 'Social Media Manager & Digital Content Assistant · (Feb–Dec 2025)',
      summary:
        'Digital brand building and visual content direction for a beauty skincare brand, focusing on video reels, skincare promotion campaigns, and aesthetic page consistency.',
      known:
        'Key Outcomes: Created engaging reels, wrote SEO-optimized captions, managed community engagement, and expanded online customer reach.',
      tasks: [
        'Designed engaging content for skincare product launches, treatments, and seasonal sales.',
        'Assisted in managing Instagram page growth, DM inquiries, and community engagement.',
        'Produced aesthetic video reels and product showcases tailored to target client demographics.',
        'Maintained consistent visual branding and color palette across digital channels.'
      ],
      sections: [
        'Beauty & Skincare Visual Content Strategy',
        'Reels Production & Product Showcase Aesthetics',
        'Instagram Community Engagement & Conversion',
        'Brand Identity Guidelines & Visual Assets'
      ]
    }
  };

  // Open Dossier Modal
  function showDossier(key) {
    const d = dossierData[key];
    if (!d) return;

    const bodyHtml = `
      <p style="color:var(--text-secondary);font-size:0.95rem;margin-bottom:20px;line-height:1.6;">${d.summary}</p>
      
      <div class="dossier-layout">
        <div class="dossier-panel">
          <h4><i class="fa-solid fa-circle-check" style="margin-right:6px;color:var(--accent-gold);"></i> Core Responsibilities & Impact</h4>
          <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;margin-bottom:12px;">${d.known}</p>
          <ul>
            ${d.tasks.map((t) => `<li>${t}</li>`).join('')}
          </ul>
        </div>
        <div class="dossier-panel">
          <h4><i class="fa-solid fa-folder-open" style="margin-right:6px;color:var(--accent-sage);"></i> Chapter Documentary Modules</h4>
          <ul>
            ${d.sections.map((s) => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="media-dropzone" id="mediaDropzone" style="margin-top:20px;">
        <i class="fa-solid fa-cloud-arrow-up" style="font-size:1.8rem;color:var(--accent-sage);margin-bottom:8px;"></i>
        <p style="font-weight:600;font-size:0.92rem;margin-bottom:4px;">Attach local photos, certificates or reference files</p>
        <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:12px;">Preview attachments in this browser session.</p>
        <input type="file" id="dossierFileInput" multiple accept="image/*,video/*,.pdf,.doc,.docx" style="display:none;" />
        <button class="btn btn-outline" type="button" id="browseMediaBtn" style="padding:6px 16px;font-size:0.8rem;">Browse Files</button>
        <div class="media-gallery-preview" id="mediaGalleryPreview"></div>
      </div>

      <div class="form-group" style="margin-top:20px;">
        <label for="dossierCaseNotes" style="font-size:0.82rem;font-weight:700;text-transform:uppercase;color:var(--text-secondary);">
          Case Study & Professional Notes
        </label>
        <textarea id="dossierCaseNotes" class="form-textarea" placeholder="Add verified achievements, supervisor feedback, or key lessons to store in your permanent local archive..."></textarea>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-outline" id="downloadNotesBtn" type="button"><i class="fa-solid fa-download"></i> Download Notes (.txt)</button>
      <button class="btn btn-primary" id="saveNotesBtn" type="button"><i class="fa-solid fa-bookmark"></i> Save Notes to Archive ↗</button>
    `;

    openModal(d.title, d.eyebrow, bodyHtml, footerHtml);

    // Media preview
    const fileInput = $('#dossierFileInput');
    const browseBtn = $('#browseMediaBtn');
    const gallery = $('#mediaGalleryPreview');

    if (browseBtn && fileInput) {
      browseBtn.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        gallery.innerHTML = '';
        [...e.target.files].forEach((file) => {
          const url = URL.createObjectURL(file);
          const thumb = document.createElement('div');
          thumb.className = 'media-item-thumbnail';
          if (file.type.startsWith('image/')) {
            thumb.innerHTML = `<img src="${url}" alt="${file.name}" />`;
          } else {
            thumb.innerHTML = `<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--bg-surface-elevated);font-size:0.7rem;text-align:center;padding:4px;"><i class="fa-solid fa-file-lines" style="font-size:1.2rem;margin-bottom:4px;"></i>${file.name.substring(0, 10)}...</div>`;
          }
          gallery.appendChild(thumb);
        });
        showToast('Files loaded into preview');
      });
    }

    // Save notes
    $('#saveNotesBtn').addEventListener('click', () => {
      const notes = $('#dossierCaseNotes').value.trim();
      if (!notes) {
        showToast('Please enter some notes before saving');
        return;
      }
      addArchiveEntry({
        year: new Date().getFullYear().toString(),
        type: 'Career',
        title: `${d.title} — Case Notes`,
        description: notes
      });
      showToast('Notes saved to your permanent archive!');
      closeModal();
    });

    // Download notes
    $('#downloadNotesBtn').addEventListener('click', () => {
      const notes = $('#dossierCaseNotes').value.trim() || d.summary;
      const content = `${d.title}\n${d.eyebrow}\n${'-'.repeat(45)}\n\n${notes}\n\nTasks & Deliverables:\n${d.tasks.map((t) => `- ${t}`).join('\n')}`;
      downloadTextFile(`${d.title.replace(/\s+/g, '_')}_Notes.txt`, content);
      showToast('Notes downloaded');
    });
  }

  // Bind all dossier triggers
  function bindDossierTriggers() {
    $$('[data-dossier]').forEach((btn) => {
      btn.addEventListener('click', () => {
        showDossier(btn.dataset.dossier);
      });
    });
  }
  bindDossierTriggers();

  // ---------------- 8. EXPERIENCE FILTER CONTROLLER ----------------
  const expChips = $$('.exp-filter-toolbar .chip-btn');
  const expCards = $$('.exp-card');

  expChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      expChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.expFilter;
      expCards.forEach((card) => {
        if (filter === 'all') {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          const categories = card.dataset.category || '';
          if (categories.includes(filter)) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // ---------------- 9. CASE STUDY MODALS & GREEN MONEY PLANNER CALCULATOR ----------------
  function openGreenMoneyCaseStudy() {
    const bodyHtml = `
      <div style="margin-bottom:20px;">
        <span class="pill pill-gold" style="margin-bottom:8px;">Venture Dossier · Founder & Product Lead</span>
        <h3 class="serif" style="font-size:1.6rem;margin-bottom:8px;">Green Money Planner™</h3>
        <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.6;">
          A personal financial wellness platform tailored to young African professionals, graduates, and corps members navigating currency volatility, inflation pressure, and budgeting fatigue.
        </p>
      </div>

      <div class="dossier-layout">
        <div class="dossier-panel">
          <h4><i class="fa-solid fa-triangle-exclamation" style="margin-right:6px;color:var(--accent-red);"></i> The Problem</h4>
          <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
            Traditional budgeting tools assume stable Western economies and static expenses. In Nigeria, young professionals face 30%+ inflation, fluctuating transport costs, and extended family support expectations. Traditional spreadsheets lead to guilt and abandonment.
          </p>
        </div>
        <div class="dossier-panel">
          <h4><i class="fa-solid fa-lightbulb" style="margin-right:6px;color:var(--accent-gold);"></i> What I Built</h4>
          <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
            A behavior-first personal finance platform integrating automated 50/20/30 allocation, an inflation-buffer reserve, and gamified savings goals with culturally resonant milestones (NYSC survival, tech gadget upgrade, relocation fund).
          </p>
        </div>
      </div>

      <!-- Live Interactive Budget & Savings Calculator -->
      <div class="calc-widget">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div>
            <h4 style="font-size:1.1rem;color:var(--text-primary);"><i class="fa-solid fa-calculator" style="color:var(--accent-gold);margin-right:8px;"></i> Interactive Budget Allocation Simulator</h4>
            <p style="font-size:0.8rem;color:var(--text-muted);">Test the Green Money Planner allocation algorithm in real-time:</p>
          </div>
          <span class="pill pill-gold">Live Algorithm</span>
        </div>

        <div class="calc-grid">
          <div>
            <div class="calc-slider-group">
              <label>Monthly Take-Home Income: <strong id="calcIncomeDisplay">₦350,000</strong></label>
              <input type="range" class="calc-slider" id="incomeRange" min="50000" max="2000000" step="10000" value="350000" />
            </div>
            <div class="calc-slider-group">
              <label>Target Savings & Investment: <strong id="calcSavingsDisplay">25%</strong></label>
              <input type="range" class="calc-slider" id="savingsRange" min="10" max="50" step="5" value="25" />
            </div>
            <div class="calc-slider-group">
              <label>Inflation Protection Buffer: <strong id="calcBufferDisplay">10%</strong></label>
              <input type="range" class="calc-slider" id="bufferRange" min="5" max="20" step="1" value="10" />
            </div>
          </div>

          <div class="calc-result-box">
            <div class="calc-stat-pill">
              <span>Essential Needs (Living & Food):</span>
              <strong id="statNeeds">₦175,000</strong>
            </div>
            <div class="calc-stat-pill">
              <span>Target Savings & Wealth:</span>
              <strong id="statSavings" style="color:var(--accent-sage);">₦87,500</strong>
            </div>
            <div class="calc-stat-pill">
              <span>Inflation Emergency Cushion:</span>
              <strong id="statBuffer" style="color:var(--accent-gold);">₦35,000</strong>
            </div>
            <div class="calc-stat-pill">
              <span>Lifestyle & Guilt-Free Spending:</span>
              <strong id="statLifestyle">₦52,500</strong>
            </div>
            <div style="font-size:0.75rem;color:var(--text-muted);text-align:right;margin-top:4px;">
              Annual Wealth Potential: <strong id="statAnnualWealth" style="color:var(--accent-gold);">₦1,050,000</strong> / year
            </div>
          </div>
        </div>
      </div>

      <div class="dossier-layout">
        <div class="dossier-panel">
          <h4><i class="fa-solid fa-chart-line" style="margin-right:6px;color:var(--accent-sage);"></i> Progress & Results</h4>
          <ul style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
            <li>Developed core user flow, prototype UI wireframes, and budgeting taxonomy.</li>
            <li>Beta tested manual habit journals with 100+ graduates and NYSC corps members.</li>
            <li>84% of cohort reported positive monthly savings consistency after 60 days.</li>
          </ul>
        </div>
        <div class="dossier-panel">
          <h4><i class="fa-solid fa-graduation-cap" style="margin-right:6px;color:var(--accent-gold);"></i> Key Lessons Learned</h4>
          <ul style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
            <li>Financial tools fail when they emphasize restriction rather than intentionality.</li>
            <li>Visual progress bars and positive psychology trigger significantly higher daily engagement.</li>
            <li>Product architecture must be designed mobile-first for African data-conscious environments.</li>
          </ul>
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-outline" type="button" onclick="closeModal()">Close Dossier</button>
      <a href="#contact" class="btn btn-primary" onclick="closeModal()">Inquire on GMP Beta ↗</a>
    `;

    openModal('Green Money Planner™ Case Study', 'VENTURE & PRODUCT ARCHITECTURE', bodyHtml, footerHtml);

    // Bind calculator sliders
    const incomeSlider = $('#incomeRange');
    const savingsSlider = $('#savingsRange');
    const bufferSlider = $('#bufferRange');

    function updateCalculator() {
      const income = parseInt(incomeSlider.value, 10);
      const savingsPct = parseInt(savingsSlider.value, 10) / 100;
      const bufferPct = parseInt(bufferSlider.value, 10) / 100;
      const needsPct = 0.50; // 50%
      const lifestylePct = Math.max(0, 1 - (needsPct + savingsPct + bufferPct));

      $('#calcIncomeDisplay').textContent = `₦${income.toLocaleString()}`;
      $('#calcSavingsDisplay').textContent = `${Math.round(savingsPct * 100)}%`;
      $('#calcBufferDisplay').textContent = `${Math.round(bufferPct * 100)}%`;

      $('#statNeeds').textContent = `₦${Math.round(income * needsPct).toLocaleString()}`;
      $('#statSavings').textContent = `₦${Math.round(income * savingsPct).toLocaleString()}`;
      $('#statBuffer').textContent = `₦${Math.round(income * bufferPct).toLocaleString()}`;
      $('#statLifestyle').textContent = `₦${Math.round(income * lifestylePct).toLocaleString()}`;
      $('#statAnnualWealth').textContent = `₦${Math.round(income * savingsPct * 12).toLocaleString()}`;
    }

    if (incomeSlider) {
      incomeSlider.addEventListener('input', updateCalculator);
      savingsSlider.addEventListener('input', updateCalculator);
      bufferSlider.addEventListener('input', updateCalculator);
      updateCalculator();
    }
  }

  const openGmpBtn = $('#openGmpCaseStudyBtn');
  const viewGmpDetailsBtn = $('#viewGmpDetailsBtn');
  if (openGmpBtn) openGmpBtn.addEventListener('click', openGreenMoneyCaseStudy);
  if (viewGmpDetailsBtn) viewGmpDetailsBtn.addEventListener('click', openGreenMoneyCaseStudy);

  // NDDC Study Modal
  function openNddcStudyModal() {
    const bodyHtml = `
      <div style="margin-bottom:16px;">
        <span class="pill pill-gold">B.Sc. Human Resource Management Research Project · June 2025</span>
        <h3 class="serif" style="font-size:1.5rem;margin:8px 0;">Role of Training and Development on Employee Performance in NDDC</h3>
        <p style="color:var(--text-secondary);font-size:0.92rem;">
          Conducted at Elizade University, Ondo State. An empirical quantitative study investigating how structured training interventions influence staff productivity, skill acquisition, and behavioral change in the Niger Delta Development Commission (NDDC).
        </p>
      </div>

      <div class="dossier-layout">
        <div class="dossier-panel">
          <h4><i class="fa-solid fa-flask" style="margin-right:6px;color:var(--accent-sage);"></i> Research Methodology</h4>
          <ul style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
            <li>Framed under Albert Bandura's Social Learning Theory & Human Capital Theory.</li>
            <li>Designed and administered structured Likert-scale questionnaires to NDDC staff across operational divisions.</li>
            <li>Utilized descriptive and inferential statistical methods to measure training transfer.</li>
          </ul>
        </div>
        <div class="dossier-panel">
          <h4><i class="fa-solid fa-trophy" style="margin-right:6px;color:var(--accent-gold);"></i> Core Findings</h4>
          <ul style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
            <li>Continuous interval training yielded 42% higher retention than one-off annual seminars.</li>
            <li>Mentorship pairings post-training were the single highest predictor of behavioral change.</li>
            <li>Formulated 4 policy recommendations adopted with academic commendation.</li>
          </ul>
        </div>
      </div>
    `;
    const footerHtml = `
      <button class="btn btn-outline" onclick="closeModal()">Close</button>
      <button class="btn btn-primary" onclick="showToast('Research abstract copied to clipboard');closeModal();">Copy Citation</button>
    `;
    openModal('Academic Research Study', 'ELIZADE UNIVERSITY · B.SC HRM', bodyHtml, footerHtml);
  }
  const nddcBtn = $('#openNddcStudyBtn');
  if (nddcBtn) nddcBtn.addEventListener('click', openNddcStudyModal);

  // Campus Cart Modal
  function openCampusCartModal() {
    const bodyHtml = `
      <div style="margin-bottom:16px;">
        <span class="pill">Student Micro-Commerce & Logistics</span>
        <h3 class="serif" style="font-size:1.5rem;margin:8px 0;">Campus Cart Operations Study</h3>
        <p style="color:var(--text-secondary);font-size:0.92rem;">
          Peer-to-peer campus delivery network and student convenience marketplace designed to address nighttime supply bottlenecks across residential university halls.
        </p>
      </div>
      <div class="dossier-layout">
        <div class="dossier-panel">
          <h4><i class="fa-solid fa-box" style="margin-right:6px;color:var(--accent-sage);"></i> Operations & Delivery Model</h4>
          <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
            Coordinated student runners with a centralized WhatsApp/SMS dispatch system, fulfilling food orders, stationery, and urgent pharmacy items with an average 18-minute delivery window.
          </p>
        </div>
        <div class="dossier-panel">
          <h4><i class="fa-solid fa-book-bookmark" style="margin-right:6px;color:var(--accent-gold);"></i> Entrepreneurial Takeaway</h4>
          <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
            Hands-on education in unit economics, customer trust, inventory forecasting, and real-time operational troubleshooting.
          </p>
        </div>
      </div>
    `;
    const footerHtml = `<button class="btn btn-outline" onclick="closeModal()">Close</button>`;
    openModal('Campus Cart Study', 'STUDENT VENTURE ARCHIVE', bodyHtml, footerHtml);
  }
  const campusCartBtn = $('#openCampusCartBtn');
  if (campusCartBtn) campusCartBtn.addEventListener('click', openCampusCartModal);

  // ---------------- 10. CAREER VAULT (TWO-LAYER SYSTEM) ----------------
  let isVaultUnlocked = localStorage.getItem(VAULT_KEY) === 'true';

  const vaultBannerTitle = $('#vaultBannerTitle');
  const vaultBannerDesc = $('#vaultBannerDesc');
  const vaultUnlockBtn = $('#vaultUnlockBtn');
  const vaultUnlockBtnText = $('#vaultUnlockBtnText');
  const navVaultBtn = $('#navVaultBtn');
  const navVaultIcon = $('#navVaultIcon');
  const navVaultText = $('#navVaultText');

  function updateVaultUI() {
    if (isVaultUnlocked) {
      if (vaultBannerTitle) vaultBannerTitle.innerHTML = `<span style="color:#2ecc71;"><i class="fa-solid fa-lock-open"></i> Private Career Vault Unlocked</span>`;
      if (vaultBannerDesc) {
        vaultBannerDesc.innerHTML = `
          <strong>Active Access:</strong> You are viewing confidential career records, including official certificate scans, raw NDDC quantitative datasets, supervisor performance evaluations, and private milestone logs.
        `;
      }
      if (vaultUnlockBtnText) vaultUnlockBtnText.textContent = 'Lock Career Vault';
      if (vaultUnlockBtn) vaultUnlockBtn.innerHTML = `<i class="fa-solid fa-lock"></i> Lock Career Vault`;

      if (navVaultIcon) navVaultIcon.className = 'fa-solid fa-lock-open';
      if (navVaultText) navVaultText.textContent = 'Vault (Unlocked)';
      if (navVaultBtn) navVaultBtn.style.borderColor = 'var(--accent-gold)';
    } else {
      if (vaultBannerTitle) vaultBannerTitle.textContent = 'Two-Layer Career Archive: Public vs Private';
      if (vaultBannerDesc) {
        vaultBannerDesc.innerHTML = `
          You are currently viewing the <strong>Public Portfolio</strong> layer, curated for employers, partners, and collaborators. Unlock the <strong>Private Career Vault</strong> to view confidential case studies, academic transcripts, performance reviews, and internal documents.
        `;
      }
      if (vaultUnlockBtnText) vaultUnlockBtnText.textContent = 'Unlock Career Vault';
      if (vaultUnlockBtn) vaultUnlockBtn.innerHTML = `<i class="fa-solid fa-lock-open"></i> Unlock Career Vault`;

      if (navVaultIcon) navVaultIcon.className = 'fa-solid fa-lock';
      if (navVaultText) navVaultText.textContent = 'Career Vault';
      if (navVaultBtn) navVaultBtn.style.borderColor = '';
    }
  }

  function promptVaultPasscode() {
    if (isVaultUnlocked) {
      isVaultUnlocked = false;
      localStorage.setItem(VAULT_KEY, 'false');
      updateVaultUI();
      renderArchive();
      showToast('Career Vault locked. Returned to Public Portfolio view.');
      return;
    }

    const bodyHtml = `
      <div style="text-align:center;padding:10px 0 20px;">
        <div style="width:54px;height:54px;border-radius:50%;background:var(--accent-gold-soft);color:var(--accent-gold);display:inline-flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:14px;">
          <i class="fa-solid fa-shield-halved"></i>
        </div>
        <h3 class="serif" style="font-size:1.4rem;margin-bottom:6px;">Access Private Career Vault</h3>
        <p style="color:var(--text-secondary);font-size:0.88rem;max-width:440px;margin:0 auto 20px;">
          The private layer contains confidential performance reviews, university transcripts, raw research data, and internal drafts.
        </p>

        <div style="max-width:320px;margin:0 auto;">
          <div class="form-group" style="text-align:left;">
            <label for="vaultPassInput" style="font-size:0.8rem;font-weight:700;">Enter Passkey</label>
            <input type="password" id="vaultPassInput" class="form-input" placeholder="Passcode (Hint: homa or 2026)" />
          </div>
          <button class="btn btn-primary" id="submitPasscodeBtn" style="width:100%;margin-bottom:10px;">
            Unlock Vault ↗
          </button>
          <button class="btn btn-outline" id="demoQuickUnlockBtn" style="width:100%;font-size:0.8rem;">
            Demo Quick Unlock (Instant)
          </button>
        </div>
      </div>
    `;

    openModal('Security Verification', 'CONFIDENTIAL CAREER ARCHIVE', bodyHtml);

    function doUnlock() {
      isVaultUnlocked = true;
      localStorage.setItem(VAULT_KEY, 'true');
      updateVaultUI();
      renderArchive();
      closeModal();
      showToast('Career Vault unlocked successfully! Confidential records loaded.');

      // High-tech laser scanner sweep animation on vault panel
      const vaultPanel = $('.archive-vault-card') || $('.archive-controls');
      if (vaultPanel) {
        vaultPanel.classList.add('scanning');
        setTimeout(() => vaultPanel.classList.remove('scanning'), 2000);
      }
      if (typeof triggerConfetti === 'function') triggerConfetti();
    }

    $('#submitPasscodeBtn').addEventListener('click', () => {
      const val = $('#vaultPassInput').value.trim().toLowerCase();
      if (val === 'homa' || val === '2026' || val === 'admin' || val === 'victory') {
        doUnlock();
      } else {
        showToast('Incorrect passkey. Try "homa" or click Demo Quick Unlock.');
      }
    });

    $('#demoQuickUnlockBtn').addEventListener('click', doUnlock);
  }

  if (vaultUnlockBtn) vaultUnlockBtn.addEventListener('click', promptVaultPasscode);
  if (navVaultBtn) navVaultBtn.addEventListener('click', promptVaultPasscode);

  updateVaultUI();

  // ---------------- 11. PERMANENT ARCHIVE SYSTEM & VAULT DATA ----------------
  const defaultArchive = [
    {
      id: 1,
      year: '2026',
      type: 'Project',
      title: 'Green Money Planner™ Product Vision & Architecture',
      description: 'Nigeria-first financial wellness concept, budgeting UX flow, and retention architecture.'
    },
    {
      id: 2,
      year: '2026',
      type: 'Career',
      title: 'NYSC Placement · FCMB Pensions Limited',
      description: 'Strategy & Corporate Communications, pension education campaigns, and website digital initiatives.'
    },
    {
      id: 3,
      year: '2026',
      type: 'Career',
      title: 'Dine with Shine Abuja 7-Day Brand Turnaround',
      description: 'Viral culinary video series, SEO caption strategy, and customer table reservation growth.'
    },
    {
      id: 4,
      year: '2025',
      type: 'Education',
      title: 'B.Sc. Degree Conferral in Human Resource Management',
      description: 'Graduated from Elizade University, Ondo State with comprehensive training in organizational behavior.'
    },
    {
      id: 5,
      year: '2025',
      type: 'Education',
      title: 'Academic Research Study: NDDC Training & Employee Performance',
      description: 'Empirical quantitative investigation measuring knowledge acquisition and productivity in NDDC.'
    },
    {
      id: 6,
      year: '2024',
      type: 'Project',
      title: 'ManagedbyHoma Digital Strategy Launch',
      description: 'Multi-client brand positioning, editorial calendars, and high-impact social media management.'
    },
    {
      id: 7,
      year: '2024',
      type: 'Career',
      title: 'Castel Resources Industrial Training Experience',
      description: 'Practical immersion across HRIS platforms, recruitment sourcing, and corporate consulting.'
    },
    {
      id: 8,
      year: '2023',
      type: 'Career',
      title: 'Meridian Hospital · HR & Healthcare Administration',
      description: 'Foundational experience in healthcare human resources, compliance records, and patient administration.'
    }
  ];

  const confidentialArchiveEntries = [
    {
      id: 101,
      year: '2026',
      type: 'Career',
      isPrivate: true,
      title: 'FCMB Pensions Strategy Deliverables: PenCom Briefing Document',
      description: 'Internal analytical summary on regulatory compliance, RSA transfer window trends, and subscriber education.'
    },
    {
      id: 102,
      year: '2026',
      type: 'Project',
      isPrivate: true,
      title: 'Green Money Planner™ Financial Projections & Cap Table Draft',
      description: 'Confidential 3-year cash flow projections, user acquisition economics, and technical roadmap.'
    },
    {
      id: 103,
      year: '2025',
      type: 'Education',
      isPrivate: true,
      title: 'B.Sc. Degree Certificate Scan & Academic Transcripts',
      description: 'Verified Elizade University Human Resource Management degree and official statement of results.'
    },
    {
      id: 104,
      year: '2025',
      type: 'Education',
      isPrivate: true,
      title: 'NDDC Survey Instrument & Quantitative SPSS Regression Dataset',
      description: 'Complete 28-question validated research instrument and raw employee survey responses from NDDC divisions.'
    },
    {
      id: 105,
      year: '2024',
      type: 'Career',
      isPrivate: true,
      title: 'Kodesh Skincare Performance Review & Recommendation Letter',
      description: 'Official management letter of commendation for restructuring candidate screening pipelines.'
    },
    {
      id: 106,
      year: '2023',
      type: 'Career',
      isPrivate: true,
      title: 'Meridian Hospital Operational Evaluation & Internship Certification',
      description: 'Supervisory review on healthcare records administration and confidentiality compliance.'
    }
  ];

  function getArchiveData() {
    let items = [];
    try {
      const stored = localStorage.getItem(ARCHIVE_KEY);
      items = stored ? JSON.parse(stored) : defaultArchive;
    } catch (e) {
      items = defaultArchive;
    }

    if (isVaultUnlocked) {
      return [...confidentialArchiveEntries, ...items];
    }
    return items;
  }

  function saveArchiveData(items) {
    const publicOnly = items.filter((x) => !x.isPrivate);
    localStorage.setItem(ARCHIVE_KEY, JSON.stringify(publicOnly));
  }

  function addArchiveEntry(entry) {
    const current = getArchiveData().filter((x) => !x.isPrivate);
    const newEntry = {
      id: Date.now(),
      year: entry.year || new Date().getFullYear().toString(),
      type: entry.type || 'Career',
      title: entry.title,
      description: entry.description
    };
    current.unshift(newEntry);
    saveArchiveData(current);
    renderArchive();
  }

  const archiveList = $('#archiveList');
  const archiveEmpty = $('#archiveEmpty');
  const archiveSearch = $('#archiveSearch');
  const filterChips = $$('.archive-filter-chips .chip-btn');
  let activeFilter = 'all';

  function renderArchive() {
    if (!archiveList) return;
    const all = getArchiveData();
    const query = (archiveSearch ? archiveSearch.value : '').toLowerCase().trim();

    const filtered = all.filter((item) => {
      const matchesFilter = activeFilter === 'all' || item.type.toLowerCase() === activeFilter.toLowerCase();
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.year.includes(query);
      return matchesFilter && matchesQuery;
    });

    if (filtered.length === 0) {
      archiveList.style.display = 'none';
      if (archiveEmpty) archiveEmpty.style.display = 'block';
      return;
    }

    archiveList.style.display = 'flex';
    if (archiveEmpty) archiveEmpty.style.display = 'none';

    archiveList.innerHTML = filtered
      .map(
        (item) => `
        <article class="archive-item-card ${item.isPrivate ? 'vault-card' : ''}" data-id="${item.id}" style="${item.isPrivate ? 'border-color:var(--accent-gold);background:var(--bg-surface-elevated);' : ''}">
          <div class="archive-item-year">
            ${item.year}
            ${item.isPrivate ? '<span class="vault-badge-locked" style="font-size:0.65rem;margin-top:4px;display:block;">VAULT</span>' : ''}
          </div>
          <div class="archive-item-body">
            <span class="pill ${item.isPrivate ? 'pill-gold' : ''}" style="margin-bottom:8px;">${item.type}</span>
            <h4>${item.title}</h4>
            <p>${item.description}</p>
          </div>
          <div class="archive-item-action">
            <button class="btn btn-outline archive-view-btn" data-id="${item.id}" style="padding:6px 12px;font-size:0.75rem;">Inspect ↗</button>
          </div>
        </article>
      `
      )
      .join('');

    $$('.archive-view-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const entry = getArchiveData().find((x) => x.id.toString() === id.toString());
        if (!entry) return;
        const bodyHtml = `
          <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.7;">${entry.description}</p>
          <div style="margin-top:20px;padding:12px;background:var(--bg-surface-elevated);border-radius:var(--radius-sm);font-size:0.82rem;color:var(--text-muted);">
            <strong>Archive Tag:</strong> ${entry.type} &nbsp;|&nbsp; <strong>Recorded Year:</strong> ${entry.year}
            ${entry.isPrivate ? '<br><strong style="color:var(--accent-gold);">Access Level:</strong> Confidential Career Vault' : ''}
          </div>
        `;
        openModal(entry.title, `ARCHIVE RECORD · ${entry.year}`, bodyHtml);
      });
    });
  }

  if (archiveSearch) {
    archiveSearch.addEventListener('input', renderArchive);
  }

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      filterChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      renderArchive();
    });
  });

  // Add to Archive Button
  const addArchiveBtn = $('#addArchiveBtn');
  if (addArchiveBtn) {
    addArchiveBtn.addEventListener('click', () => {
      const bodyHtml = `
        <form id="newArchiveForm">
          <div class="form-group">
            <label for="newArchiveYear">Year</label>
            <input id="newArchiveYear" class="form-input" value="${new Date().getFullYear()}" required />
          </div>
          <div class="form-group">
            <label for="newArchiveType">Category</label>
            <select id="newArchiveType" class="form-select">
              <option value="Career">Career Milestone</option>
              <option value="Project">Project / Venture</option>
              <option value="Education">Education & Learning</option>
              <option value="Personal">Personal Milestone</option>
            </select>
          </div>
          <div class="form-group">
            <label for="newArchiveTitle">Title</label>
            <input id="newArchiveTitle" class="form-input" placeholder="e.g. Launched New Strategic Campaign" required />
          </div>
          <div class="form-group">
            <label for="newArchiveDesc">Description</label>
            <textarea id="newArchiveDesc" class="form-textarea" placeholder="Describe the outcome, lessons, or achievements..." required></textarea>
          </div>
        </form>
      `;

      const footerHtml = `
        <button class="btn btn-outline" type="button" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" id="saveNewEntryBtn" type="button">Add to Permanent Archive ↗</button>
      `;

      openModal('Add Lifetime Milestone', 'TIME CAPSULE', bodyHtml, footerHtml);

      $('#saveNewEntryBtn').addEventListener('click', () => {
        const year = $('#newArchiveYear').value.trim();
        const type = $('#newArchiveType').value;
        const title = $('#newArchiveTitle').value.trim();
        const desc = $('#newArchiveDesc').value.trim();

        if (!title || !desc) {
          showToast('Please fill in title and description');
          return;
        }

        addArchiveEntry({ year, type, title, description: desc });
        showToast('Milestone successfully added to your archive!');
        closeModal();
      });
    });
  }

  // Export Archive Backup
  const exportArchiveBtn = $('#exportArchiveBtn');
  if (exportArchiveBtn) {
    exportArchiveBtn.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(getArchiveData(), null, 2));
      const a = document.createElement('a');
      a.setAttribute('href', dataStr);
      a.setAttribute('download', `Victory_Homa_Obuzor_Career_Archive_${new Date().getFullYear()}.json`);
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast('Career archive backup exported as JSON!');
    });
  }

  renderArchive();

  // ---------------- 12. DUAL-PROFILE INTERACTIVE CV SYSTEM ----------------
  const cvProfiles = {
    hr: {
      name: 'OBUZOR HOMA VICTORY',
      title: 'Human Resource Management | Administration | Communications',
      contact: [
        '+234 913 845 8031',
        'obuzorhomavictory@gmail.com',
        'Abuja, Nigeria'
      ],
      pdfPath: 'assets/docs/Obuzor_Homa_Victory_HR_Corporate_Communications_Resume.pdf',
      pdfFileName: 'Obuzor_Homa_Victory_HR_Corporate_Communications_Resume.pdf',
      summary:
        'Human Resource Management graduate with practical experience across HR administration, recruitment support, records management, workplace communication, project support, and digital communications. Currently completing NYSC at FCMB Pensions Limited within the Strategy & Corporate Communications Department, where I contribute to corporate communication initiatives and digital projects, including website-related work. Experienced in handling confidential information, coordinating administrative activities, supporting stakeholders, and learning within regulated business environments. Detail-oriented, adaptable, professional, and committed to delivering accurate and high-quality work.',
      experience: [
        {
          role: 'NYSC Corps Member – Strategy & Corporate Communications',
          org: 'FCMB Pensions Limited | Abuja, Nigeria',
          date: '2025 – Present',
          bullets: [
            'Support activities within the Strategy & Corporate Communications Department, including research, documentation, communication support, and project coordination.',
            'Contributed to the FCMB Pensions Limited website project through content review, organization of information, and support for website-related communication activities.',
            'Contributed to work around the newly developed Itual Academy website, supporting information organization and communication-focused project tasks.',
            'Develop working knowledge of PenCom, pension industry operations, regulatory expectations, and other core information relevant to pension communications and corporate activities.',
            'Support team deliverables with professionalism, attention to detail, timely documentation, and effective internal communication.'
          ]
        },
        {
          role: 'Business & Administrative Support',
          org: 'Kive Stores Limited | Port Harcourt, Nigeria',
          date: '2025',
          bullets: [
            'Supported day-to-day business operations and administrative activities in a fast-paced commercial environment.',
            'Handled email communication, digital content tasks, graphic design support, and other assigned operational responsibilities.',
            'Supported communication and customer-facing activities while maintaining accuracy, responsiveness, and professional standards.',
            'Worked across multiple responsibilities, demonstrating adaptability, time management, and the ability to manage competing priorities.'
          ]
        },
        {
          role: 'HR Manager (Hybrid)',
          org: 'Kodesh Skincare & Spa | Port Harcourt, Nigeria',
          date: 'Oct 2024 – May 2025',
          bullets: [
            'Coordinated recruitment and interview processes, including applicant screening and interview documentation for 50+ candidates.',
            'Assisted in preparing employee handbooks, internal guidelines, and standard operating procedures (SOPs).',
            'Maintained accurate employee records and performance documentation.',
            'Supported management with compliance, workplace structure, and administrative coordination.',
            'Acted as a point of contact for staff inquiries, ensuring clear and professional communication.'
          ]
        },
        {
          role: 'Industrial Training Student – HR Intern',
          org: 'Castel Resources | Port Harcourt, Nigeria',
          date: 'Aug 2024 – Oct 2024',
          bullets: [
            'Assisted in talent acquisition processes, interview coordination, and candidate documentation.',
            'Maintained payroll records and employee files with strict attention to confidentiality and accuracy.',
            'Organized training sessions and managed attendance and reporting documentation.',
            'Supported systematic filing and archiving of HR records, both digital and physical.',
            'Assisted with employee relations documentation and internal communications.'
          ]
        },
        {
          role: 'HR & Administrative Intern',
          org: 'Meridian Hospital | Port Harcourt, Nigeria',
          date: 'Aug 2023 – Oct 2023',
          bullets: [
            'Supported recruitment and interview processes, including applicant screening and scheduling.',
            'Maintained employee and applicant records using HRIS and manual filing systems.',
            'Assisted with onboarding documentation and verification of employee information.',
            'Handled sensitive employee data with confidentiality and professionalism.',
            'Supported administrative tasks across HR and general administration functions.'
          ]
        }
      ],
      education: [
        {
          deg: 'Bachelor of Science (B.Sc.) – Human Resource Management',
          school: 'Elizade University, Ondo State',
          date: '2021 – 2025'
        },
        {
          deg: 'WASSCE / NECO',
          school: 'St. Scholastica High School, Rivers State',
          date: '2015 – 2021'
        }
      ],
      academicProject: {
        title: 'Role of Training and Development on Employee Performance in Niger Delta Development Commission (NDDC)',
        context: 'B.Sc. Human Resource Management Research Project | Elizade University | June 2025',
        bullets: [
          'Conducted an academic research study examining how training and development affect employee performance within the NDDC.',
          'Developed a quantitative research approach using a structured questionnaire and collected responses from NDDC staff.',
          'Examined knowledge acquisition and its effect on employee productivity, skill development and job quality, and behavioural change and job performance.',
          'Analyzed and interpreted findings to develop practical recommendations for continuous learning, training effectiveness, and employee development.'
        ]
      },
      skills: [
        'Human Resource Administration',
        'Recruitment & Candidate Screening',
        'Interview Coordination',
        'Employee Records Management',
        'Onboarding & Documentation',
        'HRIS & Digital Data Management',
        'Training & Development Support',
        'Employee Relations Documentation',
        'Administrative Support',
        'Project Coordination',
        'Research & Information Analysis',
        'Corporate Communication Support',
        'Professional Email Correspondence',
        'Records & Document Processing',
        'Stakeholder & Public Inquiry Handling',
        'Written & Verbal Communication'
      ],
      certification: 'Human Resource Management (Discipline in Organizations)'
    },
    marketing: {
      name: 'OBUZOR HOMA VICTORY',
      title: 'Social Media Manager | Content Creator | Email Marketing Specialist',
      contact: [
        '+234 913 845 8031',
        'obuzorhomavictory@gmail.com',
        'Plot 187, Ipent 7 Estate Gwarimpa, Abuja, Nigeria'
      ],
      pdfPath: 'assets/docs/Obuzor_Homa_Victory_Social_Media_Digital_Marketing_Resume.pdf',
      pdfFileName: 'Obuzor_Homa_Victory_Social_Media_Digital_Marketing_Resume.pdf',
      summary:
        'Creative and results-driven Social Media Manager and Content Creator with a strong background in brand growth, engagement strategy, and digital storytelling. Experienced in managing business pages, creating high-converting content, and executing strategic campaigns across Instagram, TikTok, and other social platforms. Proven ability to increase engagement, attract clients, and build visually appealing brand identities. Skilled in email marketing, content planning, and audience conversion with a strong understanding of social media psychology and brand positioning. Passionate about helping brands grow visibility, engagement, and revenue through strategic digital marketing.',
      experience: [
        {
          role: 'Social Media Manager & Content Strategist (Contract)',
          org: 'Dine with Shine, Abuja',
          date: 'Feb 9th 2026 – Feb 15th 2026',
          bullets: [
            'Managed daily social media content including reels, BTS content, and promotional campaigns.',
            'Executed a 7-day brand review series that significantly boosted engagement and audience interaction.',
            'Created SEO-optimized captions and content strategies to increase reach and visibility.',
            'Developed content concepts that improved brand awareness and customer engagement.',
            'Directed visual storytelling and food content positioning for higher audience retention.'
          ]
        },
        {
          role: 'Social Media Manager & Content Creator (Hybrid)',
          org: 'Kodesh Skincare & Spa',
          date: 'Oct 2024 – May 2025',
          bullets: [
            'Planned and executed social media content calendars targeting engagement and client conversion.',
            'Created aesthetic and educational content aligned with brand identity.',
            'Managed audience inquiries, comments, and DMs professionally.',
            'Supported promotional campaigns and digital brand growth strategies.',
            'Assisted in brand communication and online customer experience management.'
          ]
        },
        {
          role: 'Social Media Manager & Digital Content Assistant',
          org: 'Xotic Queens Beauty Skincare & Spa',
          date: 'Feb 2025 – Dec 2025',
          bullets: [
            'Designed engaging content for skincare promotions and brand awareness.',
            'Assisted in managing Instagram page growth and customer engagement.',
            'Created reels, captions, and promotional posts for product visibility.',
            'Maintained consistent brand aesthetics across social platforms.'
          ]
        },
        {
          role: 'Email Marketing & Content Assistant',
          org: 'Kivestores',
          date: 'Aug 2025 – Dec 2025',
          bullets: [
            'Assisted in writing promotional email campaigns and product marketing emails.',
            'Supported digital content creation for online promotions.',
            'Helped maintain brand communication with customers through email marketing.'
          ]
        }
      ],
      education: [
        {
          deg: 'Bachelor of Science (B.Sc.) – Human Resource Management',
          school: 'Elizade University, Ondo State',
          date: '2021 – 2025'
        },
        {
          deg: 'WASSCE / NECO',
          school: 'St. Scholastica High School, Rivers State',
          date: '2015 – 2021'
        }
      ],
      skills: [
        'Social Media Management (Instagram, TikTok, Facebook, Pinterest)',
        'Content Creation & Reels Strategy',
        'Email Marketing & Campaign Writing',
        'Brand Strategy & Positioning',
        'Content Calendar Planning',
        'SEO Captions & Hashtag Strategy',
        'Audience Engagement & Community Management',
        'Analytics & Performance Tracking',
        'Client Communication & Digital Branding',
        'Visual Content Direction & Aesthetic Branding'
      ],
      tools: [
        'Canva',
        'CapCut',
        'Meta Business Suite',
        'TikTok & Instagram Insights',
        'Google Workspace',
        'Microsoft Office Tools'
      ]
    }
  };

  function openInteractiveCvReader(profileKey) {
    const p = cvProfiles[profileKey] || cvProfiles.hr;
    const isHr = profileKey === 'hr';

    const bodyHtml = `
      <div class="cv-doc-modal" id="printableCvArea">
        
        <!-- Header -->
        <div class="cv-doc-header">
          <h1 class="cv-doc-name">${p.name}</h1>
          <div class="cv-doc-title">${p.title}</div>
          <div class="cv-doc-contact">
            ${p.contact.map((c) => `<span><i class="fa-solid fa-circle-dot" style="font-size:0.5rem;color:var(--accent-gold);margin-right:6px;"></i>${c}</span>`).join('')}
          </div>
        </div>

        <!-- Professional Profile -->
        <div class="cv-doc-section">
          <div class="cv-doc-section-title">PROFESSIONAL PROFILE</div>
          <p style="font-size:0.9rem;line-height:1.65;color:var(--text-secondary);">${p.summary}</p>
        </div>

        <!-- Experience -->
        <div class="cv-doc-section">
          <div class="cv-doc-section-title">PROFESSIONAL EXPERIENCE</div>
          ${p.experience
            .map(
              (exp) => `
            <div class="cv-doc-entry">
              <div class="cv-doc-entry-header">
                <div>
                  <span class="cv-doc-entry-title">${exp.role}</span>
                  <span class="cv-doc-entry-org"> — ${exp.org}</span>
                </div>
                <span class="cv-doc-entry-date">${exp.date}</span>
              </div>
              <ul class="cv-doc-bullets">
                ${exp.bullets.map((b) => `<li>${b}</li>`).join('')}
              </ul>
            </div>
          `
            )
            .join('')}
        </div>

        <!-- Academic Project (HR only) -->
        ${
          p.academicProject
            ? `
          <div class="cv-doc-section">
            <div class="cv-doc-section-title">ACADEMIC PROJECT</div>
            <div class="cv-doc-entry">
              <div class="cv-doc-entry-header">
                <span class="cv-doc-entry-title">${p.academicProject.title}</span>
              </div>
              <div style="font-size:0.84rem;color:var(--text-muted);font-style:italic;margin-bottom:6px;">${p.academicProject.context}</div>
              <ul class="cv-doc-bullets">
                ${p.academicProject.bullets.map((b) => `<li>${b}</li>`).join('')}
              </ul>
            </div>
          </div>
        `
            : ''
        }

        <!-- Education -->
        <div class="cv-doc-section">
          <div class="cv-doc-section-title">EDUCATION</div>
          ${p.education
            .map(
              (edu) => `
            <div class="cv-doc-entry" style="margin-bottom:8px;">
              <div class="cv-doc-entry-header">
                <span class="cv-doc-entry-title">${edu.school}</span>
                <span class="cv-doc-entry-date">${edu.date}</span>
              </div>
              <div style="font-size:0.88rem;color:var(--text-secondary);">${edu.deg}</div>
            </div>
          `
            )
            .join('')}
        </div>

        <!-- Core Competencies -->
        <div class="cv-doc-section">
          <div class="cv-doc-section-title">CORE COMPETENCIES</div>
          <div class="cv-competency-tags" style="margin-bottom:0;">
            ${p.skills.map((s) => `<span>${s}</span>`).join('')}
          </div>
        </div>

        <!-- Tools (Marketing only) -->
        ${
          p.tools
            ? `
          <div class="cv-doc-section" style="margin-top:16px;">
            <div class="cv-doc-section-title">DIGITAL TOOLS &amp; PLATFORMS</div>
            <div class="cv-competency-tags" style="margin-bottom:0;">
              ${p.tools.map((t) => `<span><i class="fa-solid fa-check" style="color:var(--accent-sage);margin-right:4px;"></i>${t}</span>`).join('')}
            </div>
          </div>
        `
            : ''
        }

        <!-- Certification -->
        ${
          p.certification
            ? `
          <div class="cv-doc-section" style="margin-top:16px;">
            <div class="cv-doc-section-title">CERTIFICATION</div>
            <p style="font-size:0.9rem;color:var(--text-secondary);">
              <i class="fa-solid fa-award" style="color:var(--accent-gold);margin-right:6px;"></i> ${p.certification}
            </p>
          </div>
        `
            : ''
        }

      </div>
    `;

    const footerHtml = `
      <button class="btn btn-outline" id="switchCvProfileBtn" type="button">
        <i class="fa-solid fa-repeat"></i> Switch to ${isHr ? 'Marketing Profile' : 'HR & Comms Profile'}
      </button>
      <button class="btn btn-outline" id="printCvBtn" type="button">
        <i class="fa-solid fa-print"></i> Print / Save PDF
      </button>
      <a href="${p.pdfPath}" download="${p.pdfFileName}" class="btn btn-gold" id="modalDownloadPdfBtn">
        <i class="fa-solid fa-file-arrow-down"></i> Download Official PDF
      </a>
    `;

    openModal(
      isHr ? 'Official CV: HR & Corporate Communications' : 'Official CV: Social Media & Digital Marketing',
      'EXECUTIVE CAREER RECORD',
      bodyHtml,
      footerHtml
    );

    $('#switchCvProfileBtn').addEventListener('click', () => {
      openInteractiveCvReader(isHr ? 'marketing' : 'hr');
    });

    $('#printCvBtn').addEventListener('click', () => {
      window.print();
    });
  }

  // Bind preview buttons
  const previewHrBtn = $('#previewHrCvBtn');
  const previewMarketingBtn = $('#previewMarketingCvBtn');
  const navCvBtn = $('#navCvBtn');
  const heroCvBtn = $('#heroCvBtn');

  if (previewHrBtn) previewHrBtn.addEventListener('click', () => openInteractiveCvReader('hr'));
  if (previewMarketingBtn) previewMarketingBtn.addEventListener('click', () => openInteractiveCvReader('marketing'));
  if (navCvBtn) navCvBtn.addEventListener('click', () => openInteractiveCvReader('hr'));
  if (heroCvBtn) heroCvBtn.addEventListener('click', () => openInteractiveCvReader('hr'));

  $$('.cv-preview-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.cvMode || 'hr';
      openInteractiveCvReader(mode);
    });
  });

  // ---------------- 13. LIFE & INTERESTS INTERACTIVE MODALS ----------------
  const lifeData = {
    reading: {
      title: 'Books, Philosophy & Continuous Inquiry',
      eyebrow: 'LIFE OUTSIDE WORK · READING',
      content: `
        <div style="display:flex;gap:20px;align-items:center;margin-bottom:20px;flex-wrap:wrap;">
          <img src="assets/images/life_reading.jpg" style="width:140px;height:140px;border-radius:var(--radius-md);object-fit:cover;" alt="Reading" />
          <div>
            <h4 style="font-size:1.15rem;margin-bottom:6px;">Current Curations & Inquiries</h4>
            <p style="color:var(--text-secondary);font-size:0.88rem;">Books that shape how I think about discipline, strategic psychology, and building enduring institutions.</p>
          </div>
        </div>
        <ul style="padding-left:20px;font-size:0.9rem;color:var(--text-secondary);line-height:1.7;">
          <li><strong>The Psychology of Money</strong> by Morgan Housel — Timeless lessons on wealth, greed, and happiness that directly influenced the ethos of *Green Money Planner™*.</li>
          <li><strong>Zero to One</strong> by Peter Thiel — Notes on building vertical progress and monopolies of excellence.</li>
          <li><strong>Atomic Habits</strong> by James Clear — Systems over goals, micro-behaviors that compound into life mastery.</li>
        </ul>
      `
    },
    interior: {
      title: 'Interior Design & Spatial Harmony',
      eyebrow: 'CREATIVE PURSUITS · ARCHITECTURE',
      content: `
        <div style="display:flex;gap:20px;align-items:center;margin-bottom:20px;flex-wrap:wrap;">
          <img src="assets/images/life_interior.jpg" style="width:140px;height:140px;border-radius:var(--radius-md);object-fit:cover;" alt="Interior" />
          <div>
            <h4 style="font-size:1.15rem;margin-bottom:6px;">Form, Atmosphere & Proportions</h4>
            <p style="color:var(--text-secondary);font-size:0.88rem;">A lifelong fascination with how spatial layout, natural light, and organic textures elevate human wellbeing.</p>
          </div>
        </div>
        <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.7;">
          I believe physical spaces communicate values as strongly as brand strategies do. Whether examining Scandinavian minimalism, earthy Mediterranean plaster, or lush Nigerian contemporary living rooms, I study how spaces invite clarity and peace.
        </p>
      `
    },
    travel: {
      title: 'Aviation, Airports & Global Travel',
      eyebrow: 'EXPEDITIONS & SYSTEMS · AVIATION',
      content: `
        <div style="display:flex;gap:20px;align-items:center;margin-bottom:20px;flex-wrap:wrap;">
          <img src="assets/images/life_travel.jpg" style="width:140px;height:140px;border-radius:var(--radius-md);object-fit:cover;" alt="Travel" />
          <div>
            <h4 style="font-size:1.15rem;margin-bottom:6px;">Airports, Aerodynamics & Flight</h4>
            <p style="color:var(--text-secondary);font-size:0.88rem;">Long-term ambition to understand aviation systems from cabin operations to private flight certification.</p>
          </div>
        </div>
        <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.7;">
          Aviation is the ultimate intersection of precision engineering, hospitality, and global connectivity. Every airport hub is a masterclass in logistics, security, and human experience design.
        </p>
      `
    },
    fashion: {
      title: 'Personal Presentation & Sartorial Tailoring',
      eyebrow: 'AESTHETIC DISCIPLINE · STYLE',
      content: `
        <div style="display:flex;gap:20px;align-items:center;margin-bottom:20px;flex-wrap:wrap;">
          <img src="assets/images/life_fashion.jpg" style="width:140px;height:140px;border-radius:var(--radius-md);object-fit:cover;" alt="Fashion" />
          <div>
            <h4 style="font-size:1.15rem;margin-bottom:6px;">Quiet Elegance & Intentional Style</h4>
            <p style="color:var(--text-secondary);font-size:0.88rem;">Classic silhouettes, muted tones, and clean craftsmanship that honor professional presence.</p>
          </div>
        </div>
        <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.7;">
          Style is non-verbal communication. Curating intentional wardrobes reflects clarity of mind and self-respect, merging executive poise with creative flair.
        </p>
      `
    },
    food: {
      title: 'Culinary Experiences & Shared Conversations',
      eyebrow: 'HOSPITALITY · DINING',
      content: `
        <div style="display:flex;gap:20px;align-items:center;margin-bottom:20px;flex-wrap:wrap;">
          <img src="assets/images/life_food.jpg" style="width:140px;height:140px;border-radius:var(--radius-md);object-fit:cover;" alt="Food" />
          <div>
            <h4 style="font-size:1.15rem;margin-bottom:6px;">Gatherings & Culinary Culture</h4>
            <p style="color:var(--text-secondary);font-size:0.88rem;">Finding joy in exquisite flavors, artisanal pastries, and warm conversations around the dinner table.</p>
          </div>
        </div>
        <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.7;">
          The best strategic brainstorms often happen over coffee and a good meal. Great hospitality creates warmth, fosters deep trust, and builds lifelong friendships.
        </p>
      `
    },
    sports: {
      title: 'Physical Vitality, Fitness & Tennis',
      eyebrow: 'DISCIPLINE · WELLNESS',
      content: `
        <div style="display:flex;gap:20px;align-items:center;margin-bottom:20px;flex-wrap:wrap;">
          <img src="assets/images/life_sports.jpg" style="width:140px;height:140px;border-radius:var(--radius-md);object-fit:cover;" alt="Sports" />
          <div>
            <h4 style="font-size:1.15rem;margin-bottom:6px;">Energy, Focus & Mental Fortitude</h4>
            <p style="color:var(--text-secondary);font-size:0.88rem;">Physical discipline directly sustains executive clarity, stamina, and creative stamina.</p>
          </div>
        </div>
        <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.7;">
          Regular movement and athletic pursuit train the mind to remain calm under pressure, celebrate incremental progress, and maintain high vitality through demanding career sprints.
        </p>
      `
    }
  };

  $$('[data-life]').forEach((card) => {
    card.addEventListener('click', () => {
      const key = card.dataset.life;
      const data = lifeData[key];
      if (!data) return;
      openModal(data.title, data.eyebrow, data.content, `<button class="btn btn-outline" onclick="closeModal()">Close</button>`);
    });
  });

  // ---------------- 14. CONTACT FORM TO MAILTO HANDLER ----------------
  const contactForm = $('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#senderName').value.trim();
      const email = $('#senderEmail').value.trim();
      const type = $('#messageType').value;
      const msg = $('#senderMessage').value.trim();

      const subject = encodeURIComponent(`[Portfolio Inquiry] ${type} — from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nRegarding: ${type}\n\nMessage:\n${msg}\n\nSent via Victory Homa Obuzor Portfolio & Archive`);

      window.location.href = `mailto:obuzorhomavictory@gmail.com?subject=${subject}&body=${body}`;
      showToast('Opening your email client with drafted message...');
    });
  }

  // Copy email utility
  const copyEmailBtn = $('#copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('obuzorhomavictory@gmail.com').then(() => {
        showToast('Email address copied to clipboard!');
      });
    });
  }

  // Year in footer
  const yearEl = $('#yearNow');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Helper download function
  function downloadTextFile(filename, text) {
    const el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    el.setAttribute('download', filename);
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  }

  // ---------------- 15. CRAZY ADVANCED ANIMATION SUITE ----------------

  // A. Top Reading Progress Bar
  const progressBar = $('#scrollProgressBar');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
  }, { passive: true });

  // B. Ambient Cursor Spotlight (Desktop fine pointers)
  const spotlight = $('#cursorSpotlight');
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      spotlight.style.opacity = '1';
    });
    window.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0';
    });
  }

  // C. Hero 3D Parallax & Depth Tilt on Mouse Movement
  const heroSection = $('#home');
  const heroCutoutFrame = $('.hero-cutout-frame');
  const heroBadges = $$('.sig-floating-badge');
  const heroHaloRings = $('.hero-halo-rings');

  if (heroSection && heroCutoutFrame && window.matchMedia('(pointer: fine)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroCutoutFrame.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 12}deg) translateZ(15px)`;

      if (heroHaloRings) {
        heroHaloRings.style.transform = `translate(-50%, -50%) translate(${x * -20}px, ${y * -20}px)`;
      }

      heroBadges.forEach((badge) => {
        const depth = parseFloat(badge.dataset.depth || 0.15);
        badge.style.transform = `translate(${x * depth * 80}px, ${y * depth * 80}px) translateZ(30px)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      heroCutoutFrame.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
      if (heroHaloRings) heroHaloRings.style.transform = 'translate(-50%, -50%)';
      heroBadges.forEach((badge) => {
        badge.style.transform = '';
      });
    });
  }

  // D. Magnetic Buttons Physics (.magnetic-btn)
  const magneticBtns = $$('.magnetic-btn');
  if (window.matchMedia('(pointer: fine)').matches) {
    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.32}px, ${y * 0.32}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // E. Live Number Counter Ticker for Stats Matrix
  const counters = $$('.stat-box .num.counter');
  let countersTriggered = false;

  function runCounters() {
    if (countersTriggered) return;
    countersTriggered = true;

    counters.forEach((counter) => {
      const target = parseFloat(counter.dataset.target || 0);
      const suffix = counter.dataset.suffix || '';
      const duration = 1800;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * target);
        counter.textContent = `${current}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = `${target}${suffix}`;
        }
      }
      requestAnimationFrame(update);
    });
  }

  const statsSection = $('.stats-matrix');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        runCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.25 });
    statsObserver.observe(statsSection);
  }

  // F. 3D Card Tilt Engine across all sections
  const tiltCards = $$('.project-card, .capability-card, .edu-card, .life-card');
  if (window.matchMedia('(pointer: fine)').matches) {
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-5px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // G. Confetti Particle Burst Engine
  function triggerConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#F4A32E', '#2D3E32', '#10b981', '#F8B44A', '#E28A18'];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.8) * 18,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12
      });
    }

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.alpha > 0) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.38;
          p.alpha -= p.decay;
          p.rotation += p.rotSpeed;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.3);
          ctx.restore();
        }
      });

      if (alive) {
        animationId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationId);
        canvas.remove();
      }
    }
    animate();
  }

})();
