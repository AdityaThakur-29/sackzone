let EVENTS = [];
let selectedState = localStorage.getItem('hackzone_state') || 'ALL';
let selectedType = 'ALL';

const FALLBACK_EVENTS = [
  {
    id: 1,
    title: "HackBombay 9.0",
    type: "hackathon",
    date: "2025-07-12",
    endDate: "2025-07-13",
    city: "Mumbai",
    state: "Maharashtra",
    description: "48-hour flagship hackathon at IIT Bombay. Build solutions for climate, fintech, and health. Open to all students.",
    registrationUrl: "https://unstop.com",
    sourcePlatform: "Unstop",
    isOnline: false,
    prize: "₹5,00,000",
    tags: ["AI/ML", "Climate", "FinTech"]
  },
  {
    id: 2,
    title: "Smart India Hackathon – Maharashtra Node",
    type: "hackathon",
    date: "2025-08-01",
    endDate: "2025-08-03",
    city: "Pune",
    state: "Maharashtra",
    description: "Government-backed 36-hour hackathon solving real-world problem statements from central ministries and PSUs.",
    registrationUrl: "https://hack2skill.com",
    sourcePlatform: "Hack2Skill",
    isOnline: false,
    prize: "₹1,00,000",
    tags: ["GovTech", "IoT", "Healthcare"]
  },
  {
    id: 3,
    title: "DevSprint: Web3 Edition",
    type: "hackathon",
    date: "2025-07-19",
    endDate: "2025-07-20",
    city: "Bangalore",
    state: "Karnataka",
    description: "India's biggest Web3 student hackathon. Build dApps, DeFi tools, and NFT projects. Mentors from Polygon, Solana Foundation.",
    registrationUrl: "https://hackerearth.com",
    sourcePlatform: "HackerEarth",
    isOnline: false,
    prize: "₹3,00,000",
    tags: ["Web3", "Blockchain", "DeFi"]
  },
  {
    id: 4,
    title: "AI/ML Fundamentals Bootcamp",
    type: "bootcamp",
    date: "2025-07-07",
    endDate: "2025-08-11",
    city: "Online",
    state: "Online",
    description: "6-week intensive bootcamp covering Python, NumPy, ML algorithms, and deploying models with FastAPI. Certificate on completion.",
    registrationUrl: "https://openhackathons.org",
    sourcePlatform: "OpenHackathons",
    isOnline: true,
    prize: null,
    tags: ["Python", "ML", "FastAPI"]
  },
  {
    id: 5,
    title: "React & Next.js Workshop",
    type: "workshop",
    date: "2025-07-05",
    endDate: "2025-07-05",
    city: "Delhi",
    state: "Delhi",
    description: "Full-day hands-on workshop on React 18 and Next.js 14 App Router. Build and deploy a production-ready web app.",
    registrationUrl: "https://lu.ma",
    sourcePlatform: "Luma",
    isOnline: false,
    prize: null,
    tags: ["React", "Next.js", "Frontend"]
  },
  {
    id: 6,
    title: "CodeFest Hyderabad 2025",
    type: "hackathon",
    date: "2025-07-26",
    endDate: "2025-07-27",
    city: "Hyderabad",
    state: "Telangana",
    description: "24-hour hackathon organized by IIIT-H students. Tracks: EdTech, HealthTech, and Open Innovation.",
    registrationUrl: "https://unstop.com",
    sourcePlatform: "Unstop",
    isOnline: false,
    prize: "₹2,00,000",
    tags: ["EdTech", "HealthTech", "Open"]
  },
  {
    id: 7,
    title: "Cloud Computing Bootcamp – AWS Track",
    type: "bootcamp",
    date: "2025-07-14",
    endDate: "2025-08-18",
    city: "Online",
    state: "Online",
    description: "5-week bootcamp with hands-on AWS labs. Covers EC2, S3, Lambda, RDS, and prepares you for AWS Cloud Practitioner exam.",
    registrationUrl: "https://openhackathons.org",
    sourcePlatform: "OpenHackathons",
    isOnline: true,
    prize: null,
    tags: ["AWS", "Cloud", "DevOps"]
  },
  {
    id: 8,
    title: "UX Design Sprint – Chennai",
    type: "workshop",
    date: "2025-07-12",
    endDate: "2025-07-12",
    city: "Chennai",
    state: "Tamil Nadu",
    description: "One-day Figma-based UX design sprint. Learn user research, wireframing, and prototyping. No design experience needed.",
    registrationUrl: "https://lu.ma",
    sourcePlatform: "Luma",
    isOnline: false,
    prize: null,
    tags: ["UX", "Figma", "Design"]
  },
  {
    id: 9,
    title: "HackKolkata Urban Tech",
    type: "hackathon",
    date: "2025-08-09",
    endDate: "2025-08-10",
    city: "Kolkata",
    state: "West Bengal",
    description: "Build smart city solutions for traffic, waste management, and public safety. Co-organized by Jadavpur University.",
    registrationUrl: "https://hack2skill.com",
    sourcePlatform: "Hack2Skill",
    isOnline: false,
    prize: "₹1,50,000",
    tags: ["SmartCity", "IoT", "Sustainability"]
  },
  {
    id: 10,
    title: "Open Source Contribution Workshop",
    type: "workshop",
    date: "2025-07-08",
    endDate: "2025-07-08",
    city: "Online",
    state: "Online",
    description: "Learn how to contribute to GitHub OSS projects. Covers Git workflows, PR etiquette, issue triaging, and finding good first issues.",
    registrationUrl: "https://lu.ma",
    sourcePlatform: "Luma",
    isOnline: true,
    prize: null,
    tags: ["OpenSource", "Git", "GitHub"]
  },
  {
    id: 11,
    title: "TechnoJam Ahmedabad",
    type: "hackathon",
    date: "2025-08-16",
    endDate: "2025-08-17",
    city: "Ahmedabad",
    state: "Gujarat",
    description: "36-hour student hackathon at DAIICT. Problem domains: AgriTech, Rural Connectivity, and Financial Inclusion.",
    registrationUrl: "https://hackerearth.com",
    sourcePlatform: "HackerEarth",
    isOnline: false,
    prize: "₹80,000",
    tags: ["AgriTech", "FinInclusion", "Rural"]
  },
  {
    id: 12,
    title: "Full Stack Dev Bootcamp",
    type: "bootcamp",
    date: "2025-07-21",
    endDate: "2025-09-01",
    city: "Bangalore",
    state: "Karnataka",
    description: "6-week full-stack bootcamp: HTML/CSS/JS, Node, Express, MongoDB, React. Build 3 portfolio projects. Job-ready curriculum.",
    registrationUrl: "https://unstop.com",
    sourcePlatform: "Unstop",
    isOnline: false,
    prize: null,
    tags: ["MERN", "FullStack", "Portfolio"]
  },
  {
    id: 13,
    title: "DataHack 2025 – National Finals",
    type: "hackathon",
    date: "2025-08-23",
    endDate: "2025-08-24",
    city: "Delhi",
    state: "Delhi",
    description: "India's premier data science hackathon. Compete on real datasets from healthcare, finance, and government sectors.",
    registrationUrl: "https://hackerearth.com",
    sourcePlatform: "HackerEarth",
    isOnline: false,
    prize: "₹4,00,000",
    tags: ["DataScience", "ML", "Analytics"]
  },
  {
    id: 14,
    title: "Cybersecurity Essentials Workshop",
    type: "workshop",
    date: "2025-07-19",
    endDate: "2025-07-19",
    city: "Online",
    state: "Online",
    description: "Learn ethical hacking basics, OWASP Top 10, network security, and CTF techniques. Beginner-friendly with live demos.",
    registrationUrl: "https://hack2skill.com",
    sourcePlatform: "Hack2Skill",
    isOnline: true,
    prize: null,
    tags: ["CyberSec", "CTF", "Ethical Hacking"]
  },
  {
    id: 15,
    title: "Pink City Hack – Jaipur",
    type: "hackathon",
    date: "2025-08-30",
    endDate: "2025-08-31",
    city: "Jaipur",
    state: "Rajasthan",
    description: "Heritage + Technology hackathon. Build digital solutions for cultural preservation, tourism tech, and regional language AI.",
    registrationUrl: "https://unstop.com",
    sourcePlatform: "Unstop",
    isOnline: false,
    prize: "₹1,20,000",
    tags: ["Heritage", "TourismTech", "NLP"]
  },
  {
    id: 16,
    title: "Mobile App Dev Bootcamp",
    type: "bootcamp",
    date: "2025-07-28",
    endDate: "2025-08-25",
    city: "Online",
    state: "Online",
    description: "4-week bootcamp on React Native. Build cross-platform iOS/Android apps. Topics: navigation, state, APIs, and App Store deployment.",
    registrationUrl: "https://openhackathons.org",
    sourcePlatform: "OpenHackathons",
    isOnline: true,
    prize: null,
    tags: ["ReactNative", "Mobile", "iOS", "Android"]
  },
  {
    id: 17,
    title: "MumbaiHacks – Climate Edition",
    type: "hackathon",
    date: "2025-09-06",
    endDate: "2025-09-07",
    city: "Mumbai",
    state: "Maharashtra",
    description: "36-hour climate-focused hackathon. Build solutions for carbon tracking, renewable energy optimization, and eco-behaviour apps.",
    registrationUrl: "https://lu.ma",
    sourcePlatform: "Luma",
    isOnline: false,
    prize: "₹2,50,000",
    tags: ["Climate", "GreenTech", "Sustainability"]
  },
  {
    id: 18,
    title: "DSA & CP Bootcamp",
    type: "bootcamp",
    date: "2025-07-10",
    endDate: "2025-08-07",
    city: "Online",
    state: "Online",
    description: "4-week competitive programming bootcamp. Master arrays, trees, graphs, DP, and segment trees. Daily problem sets + live doubt sessions.",
    registrationUrl: "https://hackerearth.com",
    sourcePlatform: "HackerEarth",
    isOnline: true,
    prize: null,
    tags: ["DSA", "CP", "Algorithms"]
  },
  {
    id: 19,
    title: "InnoHack Pune 2025",
    type: "hackathon",
    date: "2025-09-13",
    endDate: "2025-09-14",
    city: "Pune",
    state: "Maharashtra",
    description: "Innovation hackathon by Symbiosis Institute. Tracks: HealthTech, EdTech, and Smart Mobility. Investors in the jury panel.",
    registrationUrl: "https://hack2skill.com",
    sourcePlatform: "Hack2Skill",
    isOnline: false,
    prize: "₹1,80,000",
    tags: ["HealthTech", "EdTech", "Mobility"]
  },
  {
    id: 20,
    title: "Docker & Kubernetes Workshop",
    type: "workshop",
    date: "2025-07-26",
    endDate: "2025-07-26",
    city: "Bangalore",
    state: "Karnataka",
    description: "Hands-on session on containerization with Docker and orchestration with Kubernetes. Build and deploy a microservices app.",
    registrationUrl: "https://lu.ma",
    sourcePlatform: "Luma",
    isOnline: false,
    prize: null,
    tags: ["Docker", "Kubernetes", "DevOps"]
  },
  {
    id: 21,
    title: "HackNITK – Mangalore",
    type: "hackathon",
    date: "2025-09-20",
    endDate: "2025-09-21",
    city: "Mangalore",
    state: "Karnataka",
    description: "NIT Karnataka's annual 30-hour student hackathon. Problem statements from industry partners in logistics, retail, and energy.",
    registrationUrl: "https://unstop.com",
    sourcePlatform: "Unstop",
    isOnline: false,
    prize: "₹2,00,000",
    tags: ["Logistics", "Retail", "Energy"]
  },
  {
    id: 22,
    title: "Generative AI Workshop Series",
    type: "workshop",
    date: "2025-08-02",
    endDate: "2025-08-02",
    city: "Online",
    state: "Online",
    description: "2-day virtual workshop on building with LLMs. Covers prompt engineering, LangChain, RAG, and deploying AI chatbots.",
    registrationUrl: "https://hack2skill.com",
    sourcePlatform: "Hack2Skill",
    isOnline: true,
    prize: null,
    tags: ["GenAI", "LLM", "LangChain", "RAG"]
  },
  {
    id: 23,
    title: "Kochi Blockchain Summit Hackathon",
    type: "hackathon",
    date: "2025-09-27",
    endDate: "2025-09-28",
    city: "Kochi",
    state: "Kerala",
    description: "Build blockchain-based solutions for supply chain transparency, land records, and cross-border payments.",
    registrationUrl: "https://hackerearth.com",
    sourcePlatform: "HackerEarth",
    isOnline: false,
    prize: "₹1,50,000",
    tags: ["Blockchain", "SupplyChain", "FinTech"]
  },
  {
    id: 24,
    title: "Git & GitHub Workshop",
    type: "workshop",
    date: "2025-07-27",
    endDate: "2025-07-27",
    city: "Hyderabad",
    state: "Telangana",
    description: "Beginner-friendly hands-on workshop. Learn version control from scratch: commits, branches, merges, and open source collaboration.",
    registrationUrl: "https://lu.ma",
    sourcePlatform: "Luma",
    isOnline: false,
    prize: null,
    tags: ["Git", "GitHub", "Beginner"]
  },
  {
    id: 25,
    title: "National Startup Hackathon 2025",
    type: "hackathon",
    date: "2025-10-04",
    endDate: "2025-10-06",
    city: "Delhi",
    state: "Delhi",
    description: "72-hour national-level hackathon. Top 10 teams get incubation support. Backed by Startup India and NASSCOM.",
    registrationUrl: "https://unstop.com",
    sourcePlatform: "Unstop",
    isOnline: false,
    prize: "₹10,00,000",
    tags: ["Startup", "Incubation", "Nationwide"]
  },
  {
    id: 26,
    title: "VLSI & Embedded Systems Bootcamp",
    type: "bootcamp",
    date: "2025-08-04",
    endDate: "2025-09-01",
    city: "Chennai",
    state: "Tamil Nadu",
    description: "4-week hardware bootcamp. Topics: Arduino, Raspberry Pi, FPGA basics, PCB design, and sensor interfacing. Kits included.",
    registrationUrl: "https://openhackathons.org",
    sourcePlatform: "OpenHackathons",
    isOnline: false,
    prize: null,
    tags: ["Hardware", "Embedded", "FPGA"]
  },
  {
    id: 27,
    title: "HackRajasthan – Desert Edition",
    type: "hackathon",
    date: "2025-10-11",
    endDate: "2025-10-12",
    city: "Jodhpur",
    state: "Rajasthan",
    description: "Desert-themed hackathon at MBM University. Focus on water conservation tech, rural healthcare, and solar energy solutions.",
    registrationUrl: "https://hack2skill.com",
    sourcePlatform: "Hack2Skill",
    isOnline: false,
    prize: "₹75,000",
    tags: ["WaterTech", "Solar", "Rural"]
  },
  {
    id: 28,
    title: "BuildWithAI – Open Online Hackathon",
    type: "hackathon",
    date: "2025-07-25",
    endDate: "2025-07-27",
    city: "Online",
    state: "Online",
    description: "72-hour online hackathon for building AI-powered products. Open to all students. Mentors from Google, Microsoft, and OpenAI.",
    registrationUrl: "https://hackerearth.com",
    sourcePlatform: "HackerEarth",
    isOnline: true,
    prize: "₹5,00,000",
    tags: ["AI", "Product", "OpenSource"]
  }
];

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateRange(start, end) {
  if (start === end) return formatDate(start);
  return `${formatDate(start)} – ${formatDate(end)}`;
}

function getFilteredEvents() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return EVENTS
    .filter(ev => {
      const eventEnd = new Date(ev.endDate || ev.date);
      if (eventEnd < today) return false;

      const stateMatch = selectedState === 'ALL' || ev.isOnline || ev.state === selectedState;
      const typeMatch = selectedType === 'ALL' || ev.type === selectedType;
      return stateMatch && typeMatch;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

function getEventRegistrationUrl(ev) {
  const url = ev.registrationUrl || '';
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.pathname === '/' || parsedUrl.pathname === '') {
      const slug = ev.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      if (url.includes('unstop.com')) {
        return `https://unstop.com/hackathons/${slug}`;
      } else if (url.includes('hack2skill.com')) {
        return `https://hack2skill.com/event/${slug}`;
      } else if (url.includes('hackerearth.com')) {
        return `https://www.hackerearth.com/challenges/hackathon/${slug}`;
      } else if (url.includes('openhackathons.org')) {
        return `https://www.openhackathons.org/s/siteevent/${slug}`;
      } else if (url.includes('lu.ma')) {
        return `https://lu.ma/${slug}`;
      }
    }
  } catch (err) {
    // If URL parsing fails, return as-is
  }
  return url;
}

function renderCard(ev) {
  const badgeClass = `badge-${ev.type}`;
  const onlineBadge = ev.isOnline ? `<span class="badge badge-online">ONLINE</span>` : '';
  const prizeBadge = ev.prize ? `<span class="prize-badge">🏆 ${ev.prize}</span>` : '';
  const tags = ev.tags.map(t => `<span class="tag">#${t}</span>`).join('');

  return `
    <div class="event-card">
      <div class="card-top">
        <span class="badge ${badgeClass}">${ev.type.toUpperCase()}</span>
        <span class="source-badge">${ev.sourcePlatform}</span>
        ${onlineBadge}
      </div>
      <div class="card-title">${ev.title}</div>
      <div class="card-meta">
        <div class="card-date">📅 ${formatDateRange(ev.date, ev.endDate)}</div>
        <div class="card-location">📍 ${ev.isOnline ? 'ONLINE / VIRTUAL' : `${ev.city}, ${ev.state}`}</div>
      </div>
      <div class="card-desc">${ev.description}</div>
      <div class="card-tags">${tags}</div>
      <div class="card-footer">
        ${prizeBadge}
        <a href="${getEventRegistrationUrl(ev)}" target="_blank" class="register-btn">
          REGISTER <span class="arrow">→</span>
        </a>
      </div>
    </div>
  `;
}

function renderEvents() {
  const filtered = getFilteredEvents();
  const grid = document.getElementById('events-grid');
  const empty = document.getElementById('empty-state');
  const counter = document.getElementById('results-counter');

  if (filtered.length === 0) {
    grid.innerHTML = '';
    grid.style.display = 'none';
    empty.style.display = 'block';
    document.getElementById('empty-state-title').textContent =
      `NO EVENTS FOUND IN ${selectedState === 'ALL' ? 'ANY STATE' : selectedState.toUpperCase()}`;
    counter.textContent = 'SHOWING 0 EVENTS';
  } else {
    grid.style.display = 'grid';
    empty.style.display = 'none';
    grid.innerHTML = filtered.map(renderCard).join('');
    const loc = selectedState === 'ALL' ? 'ALL STATES' : selectedState.toUpperCase();
    counter.textContent = `SHOWING ${filtered.length} EVENTS · ${loc}`;
  }
}

function setupTicker() {
  const items = ['HACKATHONS', 'WORKSHOPS', 'BOOTCAMPS', 'OPEN SOURCE', 'BUILD', 'SHIP', 'WIN', 'INDIA', 'STUDENTS', 'INNOVATE', 'CODE'];
  const html = [...items, ...items].map(i => `<span class="ticker-item">${i}</span>`).join('');
  document.getElementById('ticker-track').innerHTML = html;
}

function setupTimestamp() {
  const el = document.getElementById('hero-updated');
  const now = new Date();
  const ts = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  el.textContent = `// LAST UPDATED: ${ts.toUpperCase()}`;
}

function setupFilters() {
  const select = document.getElementById('state-select');
  select.value = selectedState;

  select.addEventListener('change', () => {
    selectedState = select.value;
    localStorage.setItem('hackzone_state', selectedState);
    select.classList.add('flash');
    setTimeout(() => select.classList.remove('flash'), 200);
    renderEvents();
  });

  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedType = pill.dataset.type;
      renderEvents();
    });
  });
}

async function fetchEvents() {
  const counter = document.getElementById('results-counter');
  counter.textContent = 'LOADING EVENTS...';
  try {
    const response = await fetch('/api/events');
    if (!response.ok) throw new Error('API server returned error status');
    EVENTS = await response.json();
  } catch (err) {
    console.error('Failed to fetch events from backend. Using local fallback list.', err);
    const currentYear = new Date().getFullYear();
    EVENTS = FALLBACK_EVENTS.map(ev => ({
      ...ev,
      date: ev.date.replace('2025', currentYear),
      endDate: ev.endDate ? ev.endDate.replace('2025', currentYear) : ev.date.replace('2025', currentYear)
    }));
  }
  renderEvents();
}

document.addEventListener('DOMContentLoaded', () => {
  setupTicker();
  setupTimestamp();
  setupFilters();
  fetchEvents();
});
