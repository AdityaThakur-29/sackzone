let EVENTS = [];
let selectedState = localStorage.getItem('hackzone_state') || 'ALL';
let selectedType = 'ALL';

const FALLBACK_EVENTS = [
  {
    id: 1,
    title: "Full Stack Development Competition 2026",
    type: "hackathon",
    date: "2026-07-10",
    endDate: "2026-07-25",
    city: "Online",
    state: "Online",
    description: "Bharat Academix Full Stack Development Competition. Show your engineering, problem-solving, and web building skills.",
    registrationUrl: "https://unstop.com/competitions/bharat-academix-full-stack-development-competition-bharat-academix-170344",
    sourcePlatform: "Unstop",
    isOnline: true,
    prize: "🏆 ₹1,00,000 + Certificate",
    tags: ["HTML", "CSS", "React", "Node"]
  },
  {
    id: 2,
    title: "AI & Machine Learning Challenge 2026",
    type: "hackathon",
    date: "2026-07-02",
    endDate: "2026-07-15",
    city: "Online",
    state: "Online",
    description: "National AI & Machine Learning challenge designed to build and evaluate predictive models.",
    registrationUrl: "https://unstop.com/competitions/bharat-academix-ai-machine-learning-competition-bharat-academix-170345",
    sourcePlatform: "Unstop",
    isOnline: true,
    prize: "🏆 ₹1,00,000 + Tech Internship",
    tags: ["AI", "ML", "Python"]
  },
  {
    id: 3,
    title: "Unstop CLUBVERSE 2026",
    type: "hackathon",
    date: "2026-07-05",
    endDate: "2026-07-28",
    city: "Online",
    state: "Online",
    description: "Unstop CLUBVERSE flagship engagement event for undergraduate and postgraduate students.",
    registrationUrl: "https://unstop.com/competitions/unstop-clubverse-unstop-167812",
    sourcePlatform: "Unstop",
    isOnline: true,
    prize: "🏆 Exclusive Internships + Prizes",
    tags: ["Coding", "Aptitude", "Case Study"]
  },
  {
    id: 4,
    title: "VibeCode Arena: FIFA 2026 Showdown",
    type: "hackathon",
    date: "2026-06-23",
    endDate: "2026-07-31",
    city: "Online",
    state: "Online",
    description: "Hacking is building things that you always wanted to have but no one has built it yet. Join the FIFA Showdown.",
    registrationUrl: "https://www.hackerearth.com/challenges/hackathon/vibecode-arena-fifa-2026-showdown/",
    sourcePlatform: "HackerEarth",
    isOnline: true,
    prize: "🏆 HackerEarth Global Rank Recognition",
    tags: ["Gaming", "Coding", "FIFA"]
  },
  {
    id: 5,
    title: "The Talent Hack: Build & Get Hired",
    type: "hackathon",
    date: "2026-07-10",
    endDate: "2026-07-15",
    city: "Online",
    state: "Online",
    description: "Welcome to The Talent Hack, a hiring hackathon where you build, compete, and get hired by top companies.",
    registrationUrl: "https://www.hackerearth.com/challenges/hackathon/the-talent-hack-build-compete-get-hired/",
    sourcePlatform: "HackerEarth",
    isOnline: true,
    prize: "🏆 Job Placement Opportunities",
    tags: ["Hiring", "Engineering", "Build"]
  },
  {
    id: 6,
    title: "Clay / Lovable AI Automation Hackathon",
    type: "hackathon",
    date: "2026-07-01",
    endDate: "2026-07-01",
    city: "Bangalore",
    state: "Karnataka",
    description: "In-person workflow building challenge. Build sales automation and customer intelligence workflows using Clay and Lovable.",
    registrationUrl: "https://lu.ma/bi05",
    sourcePlatform: "Luma",
    isOnline: false,
    prize: "🏆 Clay & Lovable Free Workspace Credits",
    tags: ["Clay", "Lovable", "AI Tools"]
  },
  {
    id: 7,
    title: "Luma Bangalore Tech Events Directory",
    type: "workshop",
    date: "2026-07-01",
    endDate: "2026-12-31",
    city: "Bangalore",
    state: "Karnataka",
    description: "Curated active and upcoming tech workshops, hackathons, and founder meetups in Bangalore listed on Luma.",
    registrationUrl: "https://lu.ma/events/bengaluru",
    sourcePlatform: "Luma",
    isOnline: false,
    prize: null,
    tags: ["Workshops", "Meetups", "Bangalore"]
  },
  {
    id: 8,
    title: "Luma Delhi NCR Tech Meetups Directory",
    type: "workshop",
    date: "2026-07-01",
    endDate: "2026-12-31",
    city: "New Delhi",
    state: "Delhi",
    description: "Discover tech meetups, developer workshops, and startup networking sessions in Delhi NCR listed on Luma.",
    registrationUrl: "https://lu.ma/events/delhi",
    sourcePlatform: "Luma",
    isOnline: false,
    prize: null,
    tags: ["Workshops", "Meetups", "Delhi"]
  },
  {
    id: 9,
    title: "Hack2Skill Active Hackathons Portal",
    type: "hackathon",
    date: "2026-07-01",
    endDate: "2026-12-31",
    city: "Online",
    state: "Online",
    description: "Access and register for currently active space technology, AI, and enterprise hackathons powered by Hack2Skill.",
    registrationUrl: "https://hack2skill.com/",
    sourcePlatform: "Hack2Skill",
    isOnline: true,
    prize: "🏆 Internship Opportunities + Cash Prizes",
    tags: ["SpaceTech", "AI/ML", "AWS"]
  },
  {
    id: 10,
    title: "NVIDIA GPU Hackathons & Bootcamps Portal",
    type: "bootcamp",
    date: "2026-07-01",
    endDate: "2026-12-31",
    city: "Online",
    state: "Online",
    description: "View and apply for upcoming GPU bootcamps and scientific computing hackathons organized by NVIDIA and partner supercomputing centers.",
    registrationUrl: "https://www.gpuhackathons.org/",
    sourcePlatform: "OpenHackathons",
    isOnline: true,
    prize: "🏆 GPU Cluster Access & NVIDIA Mentorship",
    tags: ["GPU", "NVIDIA", "HPC"]
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
        <a href="${ev.registrationUrl}" target="_blank" class="register-btn">
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
