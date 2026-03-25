// ClearedPath — App JS (Overhauled)
// All state stored in memory variables (no browser storage APIs used).

(function() {
  'use strict';

  // ============================================================
  // STATE
  // ============================================================
  let theme = 'dark';
  let waitlistCount = 347;
  let waitlistEmails = [];
  let countersAnimated = false;
  let salaryAnimated = false;
  let resumeTranslating = false;
  let mobileNavOpen = false;
  let currentScoreMin = 0;

  const activeFilters = {
    clearance: new Set(),
    location: new Set(),
    score: 0
  };

  // ============================================================
  // JOB DATA (with new fields: contractType, contractDuration,
  //   contractTimeLeft, contractTotalYears, rootSource)
  // ============================================================
  const jobs = [
    {
      id: 1,
      title: 'Senior Cyber Security Analyst',
      company: 'Booz Allen Hamilton',
      location: 'Fort Meade, MD',
      clearance: 'TS/SCI w/ Poly',
      clearanceClass: 'tssci-poly',
      score: 92,
      postedSalary: '$155K – $185K',
      realSalary: '$172K',
      realSalaryNum: 172,
      postedPct: 72,
      realPct: 85,
      sources: ['linkedin', 'clearancejobs', 'company'],
      badges: ['verified', 'hot', 'multi'],
      locationKey: 'dc',
      contractType: 'prime',
      contractDuration: '5yr base + 3yr option',
      contractTimeLeft: 4.2,
      contractTotalYears: 8,
      rootSource: 'boozallen.com/careers'
    },
    {
      id: 2,
      title: 'Intelligence Analyst',
      company: 'CACI',
      location: 'Springfield, VA',
      clearance: 'TS/SCI',
      clearanceClass: 'tssci',
      score: 87,
      postedSalary: '$120K – $150K',
      realSalary: '$138K',
      realSalaryNum: 138,
      postedPct: 58,
      realPct: 67,
      sources: ['clearancejobs', 'indeed', 'linkedin'],
      badges: ['verified', 'multi'],
      locationKey: 'dc',
      contractType: 'prime',
      contractDuration: '5yr base + 5yr option',
      contractTimeLeft: 6.1,
      contractTotalYears: 10,
      rootSource: 'caci.com/careers'
    },
    {
      id: 3,
      title: 'Cloud Security Engineer',
      company: 'Leidos',
      location: 'Reston, VA',
      clearance: 'TS/SCI',
      clearanceClass: 'tssci',
      score: 84,
      postedSalary: '$145K – $175K',
      realSalary: '$162K',
      realSalaryNum: 162,
      postedPct: 68,
      realPct: 79,
      sources: ['linkedin', 'clearancejobs'],
      badges: ['verified'],
      locationKey: 'dc',
      contractType: 'sub',
      contractDuration: '3yr base + 2yr option',
      contractTimeLeft: 1.8,
      contractTotalYears: 5,
      rootSource: 'leidos.com/careers'
    },
    {
      id: 4,
      title: 'SIGINT Developer',
      company: 'Northrop Grumman',
      location: 'Annapolis Junction, MD',
      clearance: 'TS/SCI w/ FSP',
      clearanceClass: 'tssci-fsp',
      score: 91,
      postedSalary: '$170K – $210K',
      realSalary: '$195K',
      realSalaryNum: 195,
      postedPct: 82,
      realPct: 95,
      sources: ['linkedin', 'clearancejobs', 'indeed', 'company'],
      badges: ['verified', 'hot', 'multi'],
      locationKey: 'dc',
      contractType: 'prime',
      contractDuration: '10yr IDIQ',
      contractTimeLeft: 7.5,
      contractTotalYears: 10,
      rootSource: 'northropgrumman.com/careers'
    },
    {
      id: 5,
      title: 'Network Engineer',
      company: 'General Dynamics IT',
      location: 'Colorado Springs, CO',
      clearance: 'Secret',
      clearanceClass: 'secret',
      score: 78,
      postedSalary: '$95K – $120K',
      realSalary: '$108K',
      realSalaryNum: 108,
      postedPct: 46,
      realPct: 53,
      sources: ['clearancejobs', 'indeed'],
      badges: [],
      locationKey: 'colorado',
      contractType: 'sub',
      contractDuration: '5yr base + 2yr option',
      contractTimeLeft: 0.8,
      contractTotalYears: 7,
      rootSource: 'gdit.com/careers'
    },
    {
      id: 6,
      title: 'SOC Analyst',
      company: 'ManTech',
      location: 'Herndon, VA',
      clearance: 'TS/SCI',
      clearanceClass: 'tssci',
      score: 83,
      postedSalary: '$110K – $140K',
      realSalary: '$128K',
      realSalaryNum: 128,
      postedPct: 54,
      realPct: 62,
      sources: ['linkedin', 'clearancejobs'],
      badges: ['verified'],
      locationKey: 'dc',
      contractType: 'prime',
      contractDuration: '5yr base + 5yr option',
      contractTimeLeft: 3.4,
      contractTotalYears: 10,
      rootSource: 'mantech.com/careers'
    },
    {
      id: 7,
      title: 'DevSecOps Engineer',
      company: 'SAIC',
      location: 'San Antonio, TX',
      clearance: 'TS/SCI',
      clearanceClass: 'tssci',
      score: 88,
      postedSalary: '$140K – $170K',
      realSalary: '$158K',
      realSalaryNum: 158,
      postedPct: 66,
      realPct: 77,
      sources: ['linkedin', 'clearancejobs', 'indeed', 'company'],
      badges: ['verified', 'multi'],
      locationKey: 'texas',
      contractType: 'prime',
      contractDuration: '5yr base',
      contractTimeLeft: 2.1,
      contractTotalYears: 5,
      rootSource: 'saic.com/careers'
    },
    {
      id: 8,
      title: 'Cyber Threat Intel Analyst',
      company: 'Raytheon',
      location: 'Dulles, VA',
      clearance: 'TS/SCI w/ CI Poly',
      clearanceClass: 'tssci-poly',
      score: 85,
      postedSalary: '$130K – $160K',
      realSalary: '$148K',
      realSalaryNum: 148,
      postedPct: 62,
      realPct: 72,
      sources: ['clearancejobs', 'linkedin'],
      badges: ['verified'],
      locationKey: 'dc',
      contractType: 'sub',
      contractDuration: '3yr base + 2yr option',
      contractTimeLeft: 1.2,
      contractTotalYears: 5,
      rootSource: 'rtx.com/careers'
    }
  ];

  const sourceLabels = {
    linkedin: 'LinkedIn',
    clearancejobs: 'ClearanceJobs',
    indeed: 'Indeed',
    company: 'Company',
    glassdoor: 'Glassdoor',
    usajobs: 'USAJobs'
  };

  const sourceColors = {
    linkedin: '#0077b5',
    clearancejobs: '#22c55e',
    indeed: '#e8483b',
    company: '#a855f7',
    glassdoor: '#f59e0b',
    usajobs: '#94a3b8'
  };

  // ============================================================
  // THEME TOGGLE
  // ============================================================
  function setTheme(t) {
    theme = t;
    document.documentElement.setAttribute('data-theme', t);
    const moonIcon = document.getElementById('theme-icon-moon');
    const sunIcon = document.getElementById('theme-icon-sun');
    if (moonIcon && sunIcon) {
      if (t === 'light') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
      } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
      }
    }
  }

  // ============================================================
  // MOBILE NAV
  // ============================================================
  function toggleMobileNav() {
    mobileNavOpen = !mobileNavOpen;
    const nav = document.getElementById('mobile-nav');
    if (nav) {
      if (mobileNavOpen) {
        nav.classList.add('active');
        setTimeout(() => nav.classList.add('open'), 10);
      } else {
        nav.classList.remove('open');
        setTimeout(() => nav.classList.remove('active'), 300);
      }
    }
  }

  function closeMobileNav() {
    mobileNavOpen = false;
    const nav = document.getElementById('mobile-nav');
    if (nav) {
      nav.classList.remove('open');
      setTimeout(() => nav.classList.remove('active'), 300);
    }
  }

  // ============================================================
  // ACTIVE NAV on SCROLL
  // ============================================================
  function updateActiveNav() {
    const sections = ['home', 'jobs', 'resume', 'salary', 'pricing'];
    const scrollPos = window.scrollY + 80;
    let current = 'home';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }

  // ============================================================
  // ANIMATED COUNTERS
  // ============================================================
  function animateCounter(el, end, duration, suffix = '', prefix = '') {
    let start = 0;
    const step = end / (duration / 16);
    function tick() {
      start += step;
      if (start >= end) {
        el.textContent = prefix + Math.round(end).toLocaleString() + suffix;
        return;
      }
      el.textContent = prefix + Math.round(start).toLocaleString() + suffix;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function startCounters() {
    if (countersAnimated) return;
    const statsSection = document.getElementById('stats-section');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      countersAnimated = true;
      const counters = [
        { id: 'counter-jobs', end: 55, suffix: 'K+', prefix: '' },
        { id: 'counter-sources', end: 6, suffix: '+', prefix: '' },
        { id: 'counter-salary', end: 131, suffix: 'K', prefix: '$' },
        { id: 'counter-speed', end: 47, suffix: 's', prefix: '' }
      ];
      counters.forEach(c => {
        const el = document.getElementById(c.id);
        if (el) animateCounter(el, c.end, 1200, c.suffix, c.prefix);
      });
    }
  }

  // ============================================================
  // SALARY BARS ANIMATION
  // ============================================================
  const salaryBarData = [
    { id: 'bar-secret', width: 63 },
    { id: 'bar-tssci', width: 89 },
    { id: 'bar-cipoly', width: 91 },
    { id: 'bar-fsp', width: 100 }
  ];

  function startSalaryBars() {
    if (salaryAnimated) return;
    const chart = document.getElementById('salary-chart-section');
    if (!chart) return;
    const rect = chart.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      salaryAnimated = true;
      salaryBarData.forEach(b => {
        const el = document.getElementById(b.id);
        if (el) el.style.width = b.width + '%';
      });
    }
  }

  // ============================================================
  // SCROLL REVEAL
  // ============================================================
  function setupReveal() {
    const elements = document.querySelectorAll('.reveal:not(.visible)');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => observer.observe(el));
  }

  // ============================================================
  // WAITLIST FORM — Shared Handler (all forms)
  // ============================================================
  function handleWaitlistSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('input[type="email"]');
    if (!input) return;
    const email = input.value.trim();
    if (!email || !email.includes('@')) return;

    waitlistEmails.push(email);
    waitlistCount++;

    // Update all counters on page
    document.querySelectorAll('.waitlist-counter .count').forEach(el => {
      el.textContent = waitlistCount;
    });

    // Show success for this specific form
    const successEl = form.nextElementSibling;
    if (successEl && successEl.classList.contains('waitlist-success')) {
      form.style.display = 'none';
      successEl.classList.add('show');
    } else {
      // Inline form — replace with success message
      form.innerHTML = '<div class="inline-waitlist-success"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> You\'re on the list! We\'ll notify you when access is ready.</div>';
    }
  }

  // ============================================================
  // JOB CARDS — Ground News Style
  // ============================================================
  function getScoreColor(score) {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  }

  function getCircumference(r) {
    return 2 * Math.PI * r;
  }

  function getContractTimeColor(timeLeft) {
    if (timeLeft >= 3) return '#22c55e';
    if (timeLeft >= 1) return '#f59e0b';
    return '#ef4444';
  }

  function getContractTimeLabel(timeLeft) {
    if (timeLeft >= 3) return 'Stable';
    if (timeLeft >= 1) return 'Watch';
    return 'Volatile';
  }

  function buildSourceFusionBar(job) {
    // Ground News style segmented bar
    const total = job.sources.length;
    const segmentPct = 100 / total;

    const segments = job.sources.map((s, i) => {
      const color = sourceColors[s];
      const isLast = i === total - 1;
      const borderRadius = i === 0 ? '4px 0 0 4px' : (isLast ? '0 4px 4px 0' : '0');
      return `<a href="#" class="source-segment" data-tooltip="${sourceLabels[s]}" style="width:${segmentPct}%;background:${color};border-radius:${borderRadius};" onclick="event.preventDefault()"></a>`;
    }).join('');

    const sourceLinks = job.sources.map(s => {
      const color = sourceColors[s];
      return `<a href="#" class="source-link-tag" style="color:${color};" onclick="event.preventDefault()">${sourceLabels[s]}</a>`;
    }).join('');

    return `
      <div class="source-fusion">
        <div class="source-fusion-header">
          <span class="sources-label">Source Fusion <span class="info-tooltip" data-tip="Like Ground News: see which platforms posted this job and where it originally came from.">&#9432;</span></span>
          <span class="source-count">${total} source${total > 1 ? 's' : ''}</span>
        </div>
        <div class="source-fusion-bar">${segments}</div>
        <div class="source-fusion-links">${sourceLinks}</div>
        <div class="root-source">Hired by: <strong>${job.rootSource}</strong></div>
      </div>
    `;
  }

  function buildContractInfo(job) {
    const pct = ((job.contractTotalYears - job.contractTimeLeft) / job.contractTotalYears) * 100;
    const remainPct = 100 - pct;
    const color = getContractTimeColor(job.contractTimeLeft);
    const label = getContractTimeLabel(job.contractTimeLeft);
    const typeClass = job.contractType === 'prime' ? 'contract-prime' : 'contract-sub';
    const typeLabel = job.contractType === 'prime' ? 'PRIME' : 'SUB';
    const typeTip = job.contractType === 'prime'
      ? 'Prime = hired directly by the winning contractor.'
      : 'Sub = hired through a subcontractor under the prime.';

    return `
      <div class="contract-info">
        <div class="contract-tags">
          <span class="contract-type-tag ${typeClass}" data-tip="${typeTip}">${typeLabel} <span class="info-tooltip">&#9432;</span></span>
          <span class="contract-duration-label">${job.contractDuration}</span>
        </div>
        <div class="contract-time">
          <div class="contract-time-header">
            <span class="contract-time-text">~${job.contractTimeLeft} yrs remaining</span>
            <span class="contract-stability-badge" style="color:${color};border-color:${color};">
              ${label}
              <span class="info-tooltip" data-tip="Estimated time remaining on this government contract. More time = more stability.">&#9432;</span>
            </span>
          </div>
          <div class="contract-progress-track">
            <div class="contract-progress-elapsed" style="width:${pct}%;"></div>
            <div class="contract-progress-remaining" style="width:${remainPct}%;background:${color};"></div>
          </div>
        </div>
      </div>
    `;
  }

  function buildJobCard(job) {
    const scoreColor = getScoreColor(job.score);
    const r = 22;
    const circ = getCircumference(r);
    const offset = circ - (job.score / 100) * circ;

    const clearanceClass = `clearance-${job.clearanceClass}`;

    const badgesHTML = [
      job.badges.includes('verified') ? '<span class="job-badge badge-verified"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Verified Clearance</span>' : '',
      job.badges.includes('hot') ? '<span class="job-badge badge-hot"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/></svg>Active &lt;24hrs</span>' : '',
      job.badges.includes('multi') ? '<span class="job-badge badge-multi">Multiple Sources</span>' : ''
    ].filter(Boolean).join('');

    const salaryPct = job.realPct;
    const sourceFusionHTML = buildSourceFusionBar(job);
    const contractHTML = buildContractInfo(job);

    return `
      <div class="job-card reveal" data-id="${job.id}" data-clearance="${job.clearanceClass}" data-location="${job.locationKey}" data-score="${job.score}">
        <div class="job-card-header">
          <div class="job-card-left">
            <div class="job-title">${job.title}</div>
            <div class="job-meta">
              <span class="job-meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                ${job.company}
              </span>
              <span class="job-meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${job.location}
              </span>
              <span class="clearance-badge ${clearanceClass}">${job.clearance}</span>
            </div>
          </div>
          <div class="job-score-section">
            <div class="score-badge">
              <div class="score-ring" data-tip="ClearedPath Score rates this posting's transparency and reliability out of 100.">
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <circle class="score-ring-track" cx="28" cy="28" r="${r}"/>
                  <circle class="score-ring-fill" cx="28" cy="28" r="${r}"
                    stroke="${scoreColor}"
                    stroke-dasharray="${circ}"
                    stroke-dashoffset="${offset}"/>
                </svg>
                <div class="score-ring-num">${job.score}</div>
              </div>
              <div class="score-label">CP Score <span class="info-tooltip" data-tip="Our proprietary score (0-100) measuring job transparency, salary accuracy, source reliability, and clearance verification.">&#9432;</span></div>
            </div>
          </div>
        </div>

        ${sourceFusionHTML}
        ${contractHTML}

        <div class="salary-panel">
          <div class="salary-panel-row">
            <span class="salary-row-label">Posted</span>
            <span class="salary-posted-val">${job.postedSalary}</span>
          </div>
          <div class="salary-panel-row">
            <span class="salary-row-label">Real Median <span class="info-tooltip" data-tip="Based on actual reported salaries from cleared professionals, not just the posted range.">&#9432;</span></span>
            <span class="salary-real-val">${job.realSalary} median</span>
          </div>
          <div class="salary-comparison-track">
            <div class="salary-comparison-fill salary-real-fill" style="width: ${salaryPct}%"></div>
          </div>
        </div>

        ${badgesHTML ? `<div class="job-badges">${badgesHTML}</div>` : ''}
      </div>
    `;
  }

  function renderJobs() {
    const container = document.getElementById('jobs-list');
    if (!container) return;
    container.innerHTML = jobs.map(buildJobCard).join('');
    updateJobsCount(jobs.length);
    setupReveal();
  }

  function getUniqueSourceCount() {
    const allSources = new Set();
    jobs.forEach(job => job.sources.forEach(s => allSources.add(s)));
    return allSources.size;
  }

  function updateJobsCount(count) {
    const el = document.getElementById('jobs-count');
    const sourceCount = getUniqueSourceCount();
    if (el) el.innerHTML = `Showing <span>${count}</span> cleared positions from <span>${sourceCount}</span> sources`;
  }

  // ============================================================
  // JOB FILTERS
  // ============================================================
  function applyFilters() {
    const clearanceFilters = [];
    document.querySelectorAll('.filter-clearance:checked').forEach(cb => clearanceFilters.push(cb.value));
    const locationFilters = [];
    document.querySelectorAll('.filter-location:checked').forEach(cb => locationFilters.push(cb.value));
    const scoreMin = parseInt(document.getElementById('filter-score')?.value || '0');

    let visible = 0;
    jobs.forEach(job => {
      const card = document.querySelector(`.job-card[data-id="${job.id}"]`);
      if (!card) return;

      let show = true;
      if (clearanceFilters.length > 0 && !clearanceFilters.includes(job.clearanceClass)) show = false;
      if (locationFilters.length > 0 && !locationFilters.includes(job.locationKey)) show = false;
      if (job.score < scoreMin) show = false;

      if (show) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });
    updateJobsCount(visible);

    const scoreValEl = document.getElementById('filter-score-val');
    if (scoreValEl) scoreValEl.textContent = `Min: ${scoreMin}+`;
  }

  function setupFilters() {
    document.querySelectorAll('.filter-clearance, .filter-location').forEach(cb => {
      cb.addEventListener('change', applyFilters);
    });
    const scoreSlider = document.getElementById('filter-score');
    if (scoreSlider) {
      scoreSlider.addEventListener('input', applyFilters);
    }
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        document.querySelectorAll('.filter-clearance, .filter-location').forEach(cb => cb.checked = false);
        if (scoreSlider) scoreSlider.value = 0;
        const scoreValEl = document.getElementById('filter-score-val');
        if (scoreValEl) scoreValEl.textContent = 'Min: 0+';
        applyFilters();
      });
    }
  }

  // ============================================================
  // RESUME TRANSLATOR DEMO
  // ============================================================
  const militaryInput = `Managed SIGINT collection operations for 35N MOS supporting tactical HUMINT. Led 12-person team in CONUS/OCONUS environments conducting ISR missions. Supervised CCIR development and maintained OPSEC protocols per S2 requirements. PCS from Fort Bragg to Fort Meade. Received OER with "Above Center of Mass" block check.`;

  const contractorOutput = `Led Signals Intelligence (SIGINT) collection operations as a certified Intelligence Analyst (35N) supporting multi-source intelligence fusion for tactical Human Intelligence (HUMINT) programs.

Managed and mentored a 12-person intelligence team across domestic and international operational environments, conducting Intelligence, Surveillance, and Reconnaissance (ISR) missions in support of national intelligence objectives.

Developed Commander's Critical Information Requirements (CCIR) and enforced Operations Security (OPSEC) protocols in coordination with the Intelligence Division (S2/G2).

Completed professional development relocation from Fort Liberty (formerly Ft. Bragg) to Fort Meade, MD. Received "Exceeds Standards" performance review equivalent (OER above center of mass).`;

  function typeText(el, text, speed, onDone) {
    el.textContent = '';
    el.classList.add('typing');
    let i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(type, speed);
      } else {
        el.classList.remove('typing');
        if (onDone) onDone();
      }
    }
    type();
  }

  function setupResumeTranslator() {
    const inputEl = document.getElementById('resume-input');
    const outputEl = document.getElementById('resume-output');
    const translateBtn = document.getElementById('translate-btn');
    const timeEl = document.getElementById('translate-time');

    if (inputEl) inputEl.value = militaryInput;

    if (translateBtn && outputEl) {
      translateBtn.addEventListener('click', () => {
        if (resumeTranslating) return;
        resumeTranslating = true;
        translateBtn.classList.add('loading');
        translateBtn.textContent = 'Translating...';

        const startTime = Date.now();

        setTimeout(() => {
          typeText(outputEl, contractorOutput, 12, () => {
            resumeTranslating = false;
            translateBtn.classList.remove('loading');
            translateBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
              Translate Again
            `;
            if (timeEl) {
              const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
              timeEl.innerHTML = `Translated in <span>${elapsed}s</span>`;
            }
          });
        }, 800);
      });
    }
  }

  // ============================================================
  // MOBILE FILTER TOGGLE
  // ============================================================
  function setupMobileFilter() {
    const btn = document.getElementById('mobile-filter-btn');
    const sidebar = document.getElementById('filter-sidebar');
    if (btn && sidebar) {
      btn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }
  }

  // ============================================================
  // SETUP ALL WAITLIST FORMS
  // ============================================================
  function setupWaitlistForms() {
    document.querySelectorAll('.waitlist-form').forEach(form => {
      form.addEventListener('submit', handleWaitlistSubmit);
    });
  }

  // ============================================================
  // INIT
  // ============================================================
  function init() {
    // Theme
    setTheme('dark');
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
    }

    // Mobile nav
    const hamburger = document.getElementById('hamburger');
    if (hamburger) hamburger.addEventListener('click', toggleMobileNav);

    // Mobile nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // All waitlist forms
    setupWaitlistForms();

    // Jobs
    renderJobs();
    setupFilters();
    setupResumeTranslator();
    setupMobileFilter();

    // Scroll
    window.addEventListener('scroll', () => {
      updateActiveNav();
      startCounters();
      startSalaryBars();
    }, { passive: true });
    updateActiveNav();

    // Reveal setup
    setupReveal();

    // Lucide icons init
    if (window.lucide) lucide.createIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// ============================================================
// ROI Calculator
// ============================================================
(function() {
  const salaryData = {
    secret: 93748,
    tssci: 131907,
    'tssci-ci': 135442,
    'tssci-fsp': 148314
  };

  const calcBtn = document.getElementById('roi-calculate');
  const resultDiv = document.getElementById('roi-result');

  if (calcBtn) {
    calcBtn.addEventListener('click', function() {
      const clearance = document.getElementById('roi-clearance').value;
      const current = parseInt(document.getElementById('roi-current').value) || 0;
      const marketValue = salaryData[clearance] || 131907;
      const gap = marketValue - current;

      document.getElementById('roi-market-value').textContent = '$' + marketValue.toLocaleString();

      const gapEl = document.getElementById('roi-gap-amount');
      if (gap > 0) {
        gapEl.textContent = '$' + gap.toLocaleString() + '/year';
        gapEl.style.color = 'var(--accent-amber)';
        document.querySelector('.roi-gap-label').textContent = "You're leaving on the table:";
      } else if (gap < 0) {
        gapEl.textContent = '+$' + Math.abs(gap).toLocaleString() + '/year above median';
        gapEl.style.color = 'var(--accent-green)';
        document.querySelector('.roi-gap-label').textContent = "You're earning above market:";
      } else {
        gapEl.textContent = 'Right at market median';
        gapEl.style.color = 'var(--accent-cyan)';
        document.querySelector('.roi-gap-label').textContent = '';
      }

      resultDiv.classList.add('visible');
    });
  }
})();
