// ClearedPath — App JS (Overhauled + Pathways + EPA/BRAG + Job Codes)
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
  // JOB DATA
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
  // MILITARY JOB CODE DATABASE
  // ============================================================
  const jobCodeDatabase = {
    army: [
      { code: '17C', title: 'Cyber Operations Specialist', civTitle: 'Cyber Security Analyst / Pen Tester / SOC Analyst', salary: '$95K–$160K', skills: ['Cyber', 'Pen Test', 'SOC', 'TS/SCI'] },
      { code: '17E', title: 'Electronic Warfare Specialist', civTitle: 'EW Engineer / Spectrum Manager', salary: '$90K–$140K', skills: ['EW', 'Spectrum', 'RF', 'SIGINT'] },
      { code: '35F', title: 'Intelligence Analyst', civTitle: 'All-Source Intelligence Analyst / Threat Analyst', salary: '$85K–$140K', skills: ['All-Source', 'Intel', 'Analysis', 'TS/SCI'] },
      { code: '35G', title: 'Geospatial Intel Imagery Analyst', civTitle: 'GEOINT Analyst / Imagery Analyst', salary: '$90K–$145K', skills: ['GEOINT', 'Imagery', 'GIS', 'IMINT'] },
      { code: '35L', title: 'Counterintelligence Special Agent', civTitle: 'CI Analyst / Insider Threat Analyst', salary: '$95K–$155K', skills: ['CI', 'Insider Threat', 'Investigation', 'TS/SCI'] },
      { code: '35M', title: 'Human Intelligence Collector', civTitle: 'HUMINT Operations Officer / Source Handler', salary: '$95K–$160K', skills: ['HUMINT', 'Source Ops', 'Debrief', 'TS/SCI'] },
      { code: '35N', title: 'SIGINT Analyst', civTitle: 'Signals Intelligence Analyst / SIGINT Reporter', salary: '$95K–$155K', skills: ['SIGINT', 'Analysis', 'Reporting', 'TS/SCI'] },
      { code: '35P', title: 'Cryptologic Linguist', civTitle: 'Language Analyst / Cryptologic Linguist', salary: '$90K–$145K', skills: ['Linguist', 'Crypto', 'Translation', 'SIGINT'] },
      { code: '35Q', title: 'Cryptologic Network Warfare Specialist', civTitle: 'CNO Analyst / Cyber Intel Analyst', salary: '$100K–$165K', skills: ['CNO', 'Cyber Intel', 'Network', 'TS/SCI'] },
      { code: '35S', title: 'Signals Collector/Analyst', civTitle: 'SIGINT Collector / Collection Manager', salary: '$90K–$150K', skills: ['SIGINT', 'Collection', 'Analysis'] },
      { code: '35T', title: 'MI Systems Maintainer/Integrator', civTitle: 'Intel Systems Engineer / IT Specialist', salary: '$85K–$135K', skills: ['Systems', 'IT', 'Integration'] },
      { code: '25D', title: 'Cyber Network Defender', civTitle: 'Network Security Engineer / Cybersecurity Analyst', salary: '$95K–$160K', skills: ['Network Security', 'Cyber', 'Defense', 'SIEM'] },
      { code: '170A', title: 'Cyber Warfare Technician (WO)', civTitle: 'Senior Cyber Operations Lead / Cyber PM', salary: '$120K–$180K', skills: ['Cyber Ops', 'Leadership', 'Program Mgmt'] },
      { code: '170D', title: 'Cyber Capability Developer (WO)', civTitle: 'Cyber Tool Developer / Exploit Developer', salary: '$130K–$200K', skills: ['Exploit Dev', 'Tooling', 'Offensive Cyber'] }
    ],
    navy: [
      { code: 'CWT', title: 'Cyber Warfare Technician (fmr CTN)', civTitle: 'Cyber Security Engineer / Pen Tester', salary: '$100K–$170K', skills: ['Cyber', 'Pen Test', 'Network Defense', 'TS/SCI'] },
      { code: 'CTI', title: 'Cryptologic Tech Interpretive', civTitle: 'Cryptologic Linguist / Language Analyst', salary: '$90K–$145K', skills: ['Linguist', 'SIGINT', 'Translation', 'Crypto'] },
      { code: 'CTR', title: 'Cryptologic Tech Collection', civTitle: 'SIGINT Collector / Collection Analyst', salary: '$90K–$150K', skills: ['SIGINT', 'Collection', 'Analysis'] },
      { code: 'CTT', title: 'Cryptologic Tech Technical', civTitle: 'EW Technician / ELINT Analyst', salary: '$90K–$145K', skills: ['ELINT', 'EW', 'Signals', 'Technical'] },
      { code: 'IS', title: 'Intelligence Specialist', civTitle: 'All-Source Intel Analyst / Targeting Analyst', salary: '$85K–$140K', skills: ['All-Source', 'Targeting', 'Intel', 'Fusion'] },
      { code: 'IT', title: 'Info Systems Tech (cyber NEC)', civTitle: 'Network Admin / Systems Security Engineer', salary: '$85K–$140K', skills: ['Network', 'Admin', 'Security', 'Systems'] }
    ],
    airforce: [
      { code: '1B4X1', title: 'Cyber Warfare Operations', civTitle: 'Cyber Ops Specialist / Red Team Operator', salary: '$100K–$170K', skills: ['Cyber Ops', 'Red Team', 'CNO', 'TS/SCI'] },
      { code: '1N0X1', title: 'All Source Intelligence Analyst', civTitle: 'Intelligence Analyst / Fusion Analyst', salary: '$85K–$140K', skills: ['All-Source', 'Fusion', 'Intel', 'Analysis'] },
      { code: '1N1X1', title: 'Geospatial Intelligence', civTitle: 'GEOINT Analyst / Imagery Analyst', salary: '$90K–$145K', skills: ['GEOINT', 'Imagery', 'GIS'] },
      { code: '1N2X1', title: 'Signals Intelligence Analyst', civTitle: 'SIGINT Analyst / SIGINT Reporter', salary: '$95K–$155K', skills: ['SIGINT', 'Signals', 'Analysis', 'TS/SCI'] },
      { code: '1N3X1', title: 'Cryptologic Language Analyst', civTitle: 'Cryptologic Linguist / Language Analyst', salary: '$90K–$145K', skills: ['Linguist', 'Crypto', 'Translation'] },
      { code: '1N4X1', title: 'Fusion Analyst', civTitle: 'All-Source Fusion Analyst / CI Analyst', salary: '$90K–$150K', skills: ['Fusion', 'CI', 'All-Source', 'Analysis'] },
      { code: '1N7X1', title: 'Human Intelligence Specialist', civTitle: 'HUMINT Collector / Source Operations', salary: '$95K–$160K', skills: ['HUMINT', 'Source Ops', 'Collection'] },
      { code: '3D0X2', title: 'Cyber Systems Operations', civTitle: 'Systems Administrator / Cloud Engineer', salary: '$85K–$140K', skills: ['SysAdmin', 'Cloud', 'IT', 'Operations'] },
      { code: '17S', title: 'Cyberspace Operations Officer', civTitle: 'Cyber Ops PM / Cyber Mission Lead', salary: '$130K–$200K', skills: ['Cyber Ops', 'Leadership', 'Program Mgmt'] },
      { code: '14N', title: 'Intelligence Officer', civTitle: 'Senior Intel Analyst / All-Source Lead', salary: '$120K–$180K', skills: ['Intel', 'Leadership', 'All-Source', 'TS/SCI'] }
    ],
    marines: [
      { code: '0211', title: 'CI/HUMINT Specialist', civTitle: 'CI Analyst / HUMINT Collector', salary: '$95K–$155K', skills: ['CI', 'HUMINT', 'Investigation'] },
      { code: '0231', title: 'Intelligence Specialist', civTitle: 'All-Source Intelligence Analyst', salary: '$85K–$140K', skills: ['All-Source', 'Intel', 'Analysis'] },
      { code: '0241', title: 'Imagery Analysis Specialist', civTitle: 'GEOINT Analyst / Imagery Analyst', salary: '$90K–$145K', skills: ['GEOINT', 'Imagery', 'Analysis'] },
      { code: '0261', title: 'Geographic Intel Specialist', civTitle: 'Geospatial Analyst / Terrain Analyst', salary: '$90K–$140K', skills: ['Geospatial', 'GIS', 'Terrain'] },
      { code: '0689', title: 'Cyber Security Technician', civTitle: 'Cybersecurity Analyst / Network Security', salary: '$90K–$145K', skills: ['Cyber', 'Network', 'Security'] },
      { code: '1721', title: 'Cyberspace Warfare Operator', civTitle: 'Cyber Operations Specialist', salary: '$100K–$165K', skills: ['Cyber Ops', 'Offensive', 'TS/SCI'] },
      { code: '1799', title: 'Cyber Operations Chief', civTitle: 'Senior Cyber Operations Manager', salary: '$130K–$190K', skills: ['Cyber Mgmt', 'Leadership', 'Operations'] },
      { code: '2621', title: 'SIGINT/Electronic Warfare', civTitle: 'Signals Intelligence Analyst', salary: '$90K–$150K', skills: ['SIGINT', 'EW', 'Signals'] },
      { code: '2631', title: 'ELINT Analyst', civTitle: 'Electronic Intelligence Analyst / EW Specialist', salary: '$90K–$145K', skills: ['ELINT', 'EW', 'Analysis'] },
      { code: '2651', title: 'SIGINT Geospatial Analyst', civTitle: 'SIGINT/GEOINT Fusion Analyst', salary: '$95K–$150K', skills: ['SIGINT', 'GEOINT', 'Fusion'] }
    ],
    spaceforce: [
      { code: '5C0X1', title: 'Cyber Operations', civTitle: 'Cyber Security Specialist / Space Cyber Defender', salary: '$100K–$165K', skills: ['Cyber', 'Space', 'Defense', 'TS/SCI'] },
      { code: '1N0X1', title: 'Intelligence Analyst', civTitle: 'Space Intel Analyst / Orbital Analyst', salary: '$90K–$150K', skills: ['Intel', 'Space', 'Orbital', 'Analysis'] },
      { code: '1N2X1', title: 'Signals Intelligence', civTitle: 'Space SIGINT Analyst', salary: '$95K–$160K', skills: ['SIGINT', 'Space', 'Signals'] },
      { code: '3D1X2', title: 'Cyber Transport Systems', civTitle: 'Network Engineer / Satellite Comms Security', salary: '$90K–$145K', skills: ['Network', 'SATCOM', 'Transport', 'Security'] }
    ]
  };

  // ============================================================
  // EPA/BRAG SHEET ANALYSIS ENGINE
  // ============================================================
  const skillKeywords = {
    sigint: ['SIGINT', 'signals intelligence', 'signal collection', 'ELINT', 'COMINT', 'signals'],
    humint: ['HUMINT', 'human intelligence', 'source', 'interrogat', 'debrief'],
    cyber: ['cyber', 'network', 'firewall', 'IDS', 'IPS', 'SIEM', 'malware', 'incident response', 'pen test', 'vulnerability', 'endpoint'],
    intel: ['intelligence', 'analyst', 'all-source', 'fusion', 'targeting', 'collection'],
    geoint: ['GEOINT', 'geospatial', 'imagery', 'IMINT', 'GIS', 'mapping'],
    leadership: ['led', 'supervised', 'managed', 'mentored', 'directed', 'team lead', 'coordinated'],
    comms: ['communications', 'SATCOM', 'radio', 'satellite', 'RF'],
    opsec: ['OPSEC', 'INFOSEC', 'security', 'compliance', 'classification', 'Security+', 'CEH'],
    ci: ['counterintelligence', 'CI', 'insider threat', 'counterespionage'],
    crypto: ['cryptologic', 'cryptanalysis', 'linguist', 'language', 'translation']
  };

  const clearanceKeywords = [
    { pattern: /TS\/SCI.*(?:FSP|full scope poly)/i, label: 'TS/SCI w/ Full Scope Poly' },
    { pattern: /TS\/SCI.*(?:CI|counter.*intel).*poly/i, label: 'TS/SCI w/ CI Poly' },
    { pattern: /TS\/SCI/i, label: 'TS/SCI' },
    { pattern: /top secret/i, label: 'Top Secret' },
    { pattern: /secret/i, label: 'Secret' }
  ];

  const careerRecommendations = [
    {
      title: 'Senior SIGINT Analyst',
      salary: '$130K–$165K',
      requiredSkills: ['sigint'],
      bonusSkills: ['intel', 'leadership', 'crypto'],
      baseMatch: 80,
      companies: ['Booz Allen', 'CACI', 'Northrop Grumman', 'NSA (GS-13)'],
      reasons: [
        'Direct SIGINT experience maps to senior analyst positions',
        'Intelligence reporting background is core to this role',
        'TS/SCI clearance is typically required'
      ]
    },
    {
      title: 'Intelligence Operations Manager',
      salary: '$140K–$180K',
      requiredSkills: ['leadership'],
      bonusSkills: ['intel', 'sigint', 'opsec'],
      baseMatch: 75,
      companies: ['Leidos', 'ManTech', 'SAIC', 'Raytheon'],
      reasons: [
        'Team management experience translates to ops management',
        'Multi-INT coordination is highly valued',
        'Operational leadership is the core requirement'
      ]
    },
    {
      title: 'Cyber Threat Intelligence Analyst',
      salary: '$125K–$170K',
      requiredSkills: ['cyber'],
      bonusSkills: ['sigint', 'intel', 'opsec'],
      baseMatch: 78,
      companies: ['CrowdStrike', 'Mandiant (Google)', 'Palo Alto Networks', 'Microsoft'],
      reasons: [
        'Cyber + intelligence background is the ideal CTI combination',
        'Real-time analysis skills translate directly to threat hunting',
        'Security certifications strengthen this match'
      ]
    },
    {
      title: 'Collection Manager',
      salary: '$120K–$155K',
      requiredSkills: ['intel'],
      bonusSkills: ['sigint', 'humint', 'leadership'],
      baseMatch: 72,
      companies: ['CACI', 'Booz Allen', 'NSA (GS-12/13)'],
      reasons: [
        'Collection operations experience maps to this role',
        'Multi-source intelligence background is valuable',
        'Management experience accelerates career trajectory'
      ]
    },
    {
      title: 'Program Manager (Intelligence)',
      salary: '$145K–$195K',
      requiredSkills: ['leadership'],
      bonusSkills: ['intel', 'opsec', 'sigint'],
      baseMatch: 68,
      companies: ['Leidos', 'SAIC', 'Booz Allen'],
      reasons: [
        'Budget and equipment management translate to PM skills',
        'Team leadership is the primary qualification',
        'Intelligence domain expertise adds significant value'
      ]
    },
    {
      title: 'Cybersecurity Engineer',
      salary: '$120K–$175K',
      requiredSkills: ['cyber'],
      bonusSkills: ['opsec', 'comms'],
      baseMatch: 76,
      companies: ['Microsoft', 'AWS', 'CrowdStrike', 'Palo Alto Networks'],
      reasons: [
        'Network security and cyber defense skills directly apply',
        'SIEM and IDS/IPS experience is core to this role',
        'Security certifications strengthen candidacy'
      ]
    },
    {
      title: 'GEOINT Analyst',
      salary: '$95K–$150K',
      requiredSkills: ['geoint'],
      bonusSkills: ['intel', 'sigint'],
      baseMatch: 82,
      companies: ['NGA', 'Maxar', 'BAE Systems', 'Leidos'],
      reasons: [
        'Geospatial and imagery analysis directly maps',
        'GIS and mapping tools experience is essential',
        'Intelligence fusion experience adds value'
      ]
    },
    {
      title: 'HUMINT Operations Officer',
      salary: '$110K–$165K',
      requiredSkills: ['humint'],
      bonusSkills: ['leadership', 'intel', 'ci'],
      baseMatch: 80,
      companies: ['CACI', 'Booz Allen', 'DIA', 'CIA (contractor)'],
      reasons: [
        'Source handling and debriefing directly transfer',
        'Human intelligence collection is a specialized skill',
        'CI awareness strengthens this profile'
      ]
    },
    {
      title: 'Counterintelligence Analyst',
      salary: '$105K–$160K',
      requiredSkills: ['ci'],
      bonusSkills: ['opsec', 'intel', 'leadership'],
      baseMatch: 78,
      companies: ['FBI (contractor)', 'Booz Allen', 'SAIC', 'Leidos'],
      reasons: [
        'CI experience directly maps to insider threat roles',
        'Security investigation background is valuable',
        'OPSEC knowledge is critical for this role'
      ]
    },
    {
      title: 'Cryptologic Language Analyst',
      salary: '$95K–$150K',
      requiredSkills: ['crypto'],
      bonusSkills: ['sigint', 'intel'],
      baseMatch: 80,
      companies: ['NSA', 'CACI', 'Booz Allen', 'ManTech'],
      reasons: [
        'Cryptologic and language skills are highly specialized',
        'SIGINT experience enhances translation work',
        'Active clearance is essential for these roles'
      ]
    },
    {
      title: 'SOC Analyst / Incident Responder',
      salary: '$95K–$140K',
      requiredSkills: ['cyber'],
      bonusSkills: ['opsec'],
      baseMatch: 70,
      companies: ['ManTech', 'Leidos', 'GDIT', 'Booz Allen'],
      reasons: [
        'Network monitoring and defense skills apply directly',
        'Security compliance experience is valuable',
        'Cleared SOC positions command premium salaries'
      ]
    },
    {
      title: 'Cloud Security Architect',
      salary: '$150K–$230K',
      requiredSkills: ['cyber', 'opsec'],
      bonusSkills: ['leadership', 'comms'],
      baseMatch: 65,
      companies: ['AWS', 'Microsoft', 'Google Cloud', 'Cloudflare'],
      reasons: [
        'Security + network knowledge maps to cloud security',
        'Compliance experience translates to cloud governance',
        'Cleared cloud roles are in extremely high demand'
      ]
    },
    {
      title: 'Red Team Operator',
      salary: '$130K–$200K',
      requiredSkills: ['cyber'],
      bonusSkills: ['sigint', 'intel'],
      baseMatch: 70,
      companies: ['CrowdStrike', 'Mandiant', 'Booz Allen', 'MITRE'],
      reasons: [
        'Offensive cyber skills directly transfer to red teaming',
        'Intelligence background enhances threat emulation',
        'Pen testing experience is the core requirement'
      ]
    },
    {
      title: 'Communications Security Engineer',
      salary: '$100K–$155K',
      requiredSkills: ['comms'],
      bonusSkills: ['opsec', 'cyber'],
      baseMatch: 75,
      companies: ['L3Harris', 'Raytheon', 'Northrop Grumman'],
      reasons: [
        'SATCOM and RF experience directly apply',
        'Communications security is a specialized niche',
        'Military comms experience is highly valued'
      ]
    },
    {
      title: 'Vulnerability Analyst',
      salary: '$110K–$160K',
      requiredSkills: ['cyber'],
      bonusSkills: ['opsec', 'intel'],
      baseMatch: 72,
      companies: ['Tenable', 'CrowdStrike', 'Fortinet', 'CISA'],
      reasons: [
        'Security assessment skills map directly',
        'Vulnerability management is a growing field',
        'Intelligence analysis enhances threat context'
      ]
    }
  ];

  const demoBragSheet = `BRAG SHEET - Evaluation Period: OCT 2024 - SEP 2025

Primary Duties: Mission Manager, Cryptologic Warfare Activity SIXTY SEVEN
Supervised 12 SIGINT analysts across 3 watch rotations providing 24/7 intelligence support

- Led collection operations producing 847 intelligence reports supporting FIFTH Fleet operations
- Managed $2.3M in SIGINT equipment, maintained 99.7% operational readiness
- Qualified Mission Reporter: Translated and processed 1,920+ hours of real-time signals
- Supervised development of 6 junior analysts, 100% qualification rate
- Coordinated with CENTCOM, NAVCENT, and NSA for multi-INT fusion products
- TS/SCI/SCI w/ CI Poly clearance holder
- Completed SANS GIAC Security+ and CEH certifications
- Volunteer: Led 15 community outreach events, 200+ volunteer hours
- Pursuing B.S. in Cybersecurity (75% complete)`;

  function analyzeEPA(text) {
    const upperText = text.toUpperCase();
    const foundSkills = {};
    const skillTags = [];

    // Detect skills
    for (const [category, keywords] of Object.entries(skillKeywords)) {
      for (const keyword of keywords) {
        if (text.toLowerCase().includes(keyword.toLowerCase())) {
          foundSkills[category] = (foundSkills[category] || 0) + 1;
          if (!skillTags.includes(category)) skillTags.push(category);
          break;
        }
      }
    }

    // Detect clearance
    let detectedClearance = null;
    for (const { pattern, label } of clearanceKeywords) {
      if (pattern.test(text)) {
        detectedClearance = label;
        break;
      }
    }

    // Detect experience level
    let experienceLevel = 'Mid-Level';
    const numberManaged = text.match(/(?:supervised|managed|led|directed)\s+(\d+)/i);
    if (numberManaged) {
      const count = parseInt(numberManaged[1]);
      if (count >= 20) experienceLevel = 'Executive';
      else if (count >= 8) experienceLevel = 'Senior';
      else if (count >= 3) experienceLevel = 'Mid-Level';
    }
    if (/(?:director|chief|commander|O-[5-9])/i.test(text)) experienceLevel = 'Executive';
    else if (/(?:senior|E-[7-9]|chief|master|warrant|above center of mass|most qualified)/i.test(text)) experienceLevel = 'Senior';

    // Score and rank recommendations
    const recommendations = [];
    for (const rec of careerRecommendations) {
      let matchScore = 0;
      let hasRequired = false;

      // Check required skills
      for (const req of rec.requiredSkills) {
        if (foundSkills[req]) {
          hasRequired = true;
          matchScore += 30;
        }
      }

      if (!hasRequired) continue;

      // Check bonus skills
      for (const bonus of rec.bonusSkills) {
        if (foundSkills[bonus]) {
          matchScore += 10;
        }
      }

      // Clearance bonus
      if (detectedClearance) matchScore += 8;

      // Experience level bonus
      if (experienceLevel === 'Senior' || experienceLevel === 'Executive') matchScore += 6;

      // Compute final match from base + bonus
      const finalMatch = Math.min(98, rec.baseMatch + matchScore - 30);

      recommendations.push({
        ...rec,
        matchScore: finalMatch
      });
    }

    // Sort by match score
    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    // Skill label map
    const skillLabelMap = {
      sigint: 'SIGINT',
      humint: 'HUMINT',
      cyber: 'Cybersecurity',
      intel: 'Intelligence Analysis',
      geoint: 'GEOINT',
      leadership: 'Team Leadership',
      comms: 'Communications',
      opsec: 'OPSEC / InfoSec',
      ci: 'Counterintelligence',
      crypto: 'Cryptologic / Linguist'
    };

    return {
      skills: skillTags.map(s => skillLabelMap[s] || s),
      clearance: detectedClearance,
      experienceLevel,
      recommendations: recommendations.slice(0, 5)
    };
  }

  function renderEPAResults(results) {
    const container = document.getElementById('epa-results');
    if (!container) return;

    let html = '';

    // Profile Analysis
    html += '<div class="epa-profile">';
    html += '<div class="epa-profile-title">Your Profile Analysis</div>';

    // Skills
    html += '<div class="epa-skills-tags">';
    results.skills.forEach(skill => {
      html += `<span class="epa-skill-tag">${skill}</span>`;
    });
    html += '</div>';

    // Meta badges
    html += '<div class="epa-meta-row">';
    html += `<span class="epa-meta-badge level-badge">${results.experienceLevel}</span>`;
    if (results.clearance) {
      html += `<span class="epa-meta-badge clearance-detected">🔒 ${results.clearance}</span>`;
    }
    html += '</div>';
    html += '</div>';

    // Recommendations
    html += '<div class="epa-recommendations-title">Recommended Career Paths</div>';

    results.recommendations.forEach(rec => {
      html += `<div class="epa-rec-card">`;
      html += `<div class="epa-rec-header">`;
      html += `<div class="epa-rec-title">${rec.title}</div>`;
      html += `<div class="epa-rec-match">${rec.matchScore}% match</div>`;
      html += `</div>`;
      html += `<div class="epa-rec-salary">${rec.salary}</div>`;
      html += `<ul class="epa-rec-reasons">`;
      rec.reasons.forEach(r => {
        html += `<li>${r}</li>`;
      });
      html += `</ul>`;
      html += `<div class="epa-rec-companies">`;
      rec.companies.forEach(c => {
        html += `<span class="epa-company-badge">${c}</span>`;
      });
      html += `</div>`;
      html += `<button class="btn-rec-translate" onclick="window._cpSwitchToTranslate('${rec.title}')">`;
      html += `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
      html += `Translate for this role`;
      html += `</button>`;
      html += `</div>`;
    });

    container.innerHTML = html;
  }

  // Expose function to switch to translate tab
  window._cpSwitchToTranslate = function(roleTitle) {
    // Switch to translate tab
    document.querySelectorAll('.resume-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.resume-tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('[data-tab="translate"]').classList.add('active');
    document.getElementById('tab-translate').classList.add('active');

    // Update the input with context
    const inputEl = document.getElementById('resume-input');
    const epaInput = document.getElementById('epa-input');
    if (inputEl && epaInput && epaInput.value) {
      inputEl.value = epaInput.value;
    }
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
    const sections = ['home', 'jobs', 'resume', 'salary', 'pathways', 'pricing'];
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
  function animateCounter(el, end, duration, suffix, prefix) {
    suffix = suffix || '';
    prefix = prefix || '';
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
  // WAITLIST FORM
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

    document.querySelectorAll('.waitlist-counter .count').forEach(el => {
      el.textContent = waitlistCount;
    });

    const successEl = form.nextElementSibling;
    if (successEl && successEl.classList.contains('waitlist-success')) {
      form.style.display = 'none';
      successEl.classList.add('show');
    } else {
      form.innerHTML = '<div class="inline-waitlist-success"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> You\'re on the list! We\'ll notify you when access is ready.</div>';
    }
  }

  // ============================================================
  // JOB CARDS
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
  // RESUME TABS
  // ============================================================
  function setupResumeTabs() {
    const tabs = document.querySelectorAll('.resume-tab');
    const contents = document.querySelectorAll('.resume-tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const content = document.getElementById('tab-' + target);
        if (content) content.classList.add('active');
      });
    });
  }

  // ============================================================
  // EPA / BRAG SHEET SETUP
  // ============================================================
  function setupEPAAnalyzer() {
    const analyzeBtn = document.getElementById('epa-analyze-btn');
    const demoBtn = document.getElementById('epa-demo-btn');
    const epaInput = document.getElementById('epa-input');

    if (demoBtn && epaInput) {
      demoBtn.addEventListener('click', () => {
        epaInput.value = demoBragSheet;
        // Auto-select BRAG Sheet type
        const typeSelect = document.getElementById('epa-type-select');
        if (typeSelect) typeSelect.value = 'brag';
      });
    }

    if (analyzeBtn && epaInput) {
      analyzeBtn.addEventListener('click', () => {
        const text = epaInput.value.trim();
        if (!text) return;

        analyzeBtn.classList.add('loading');
        analyzeBtn.textContent = 'Analyzing...';

        setTimeout(() => {
          const results = analyzeEPA(text);
          renderEPAResults(results);

          analyzeBtn.classList.remove('loading');
          analyzeBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            Re-Analyze
          `;
        }, 600);
      });
    }
  }

  // ============================================================
  // MILITARY JOB CODES — Branch Tabs + Grid
  // ============================================================
  function renderJobCodes(branch) {
    const grid = document.getElementById('jobcode-grid');
    if (!grid) return;

    const codes = jobCodeDatabase[branch] || [];
    grid.innerHTML = codes.map(jc => `
      <div class="jobcode-card">
        <div class="jobcode-header">
          <span class="jobcode-code">${jc.code}</span>
          <span class="jobcode-salary">${jc.salary}</span>
        </div>
        <div class="jobcode-mil-title">${jc.title}</div>
        <div class="jobcode-arrow">→ Contractor Equivalent</div>
        <div class="jobcode-civ-title">${jc.civTitle}</div>
        <div class="jobcode-skills">
          ${jc.skills.map(s => `<span class="jobcode-skill-tag">${s}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  function setupBranchTabs() {
    const tabs = document.querySelectorAll('.branch-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderJobCodes(tab.getAttribute('data-branch'));
      });
    });

    // Render default (Army)
    renderJobCodes('army');
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

    // New features
    setupResumeTabs();
    setupEPAAnalyzer();
    setupBranchTabs();

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
