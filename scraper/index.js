const fs = require('fs').promises;
const path = require('path');

const scrapeUnstop = require('./unstop');
const scrapeHackerEarth = require('./hackerearth');
const scrapeHack2Skill = require('./hack2skill');
const scrapeLuma = require('./luma');
const scrapeOpenHackathons = require('./openhackathons');

const EVENTS_FILE_PATH = path.join(__dirname, '..', 'data', 'events.json');

// Normalizes event keys to detect duplicates
function generateDedupeKey(ev) {
  const titlePart = (ev.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const datePart = ev.date || '';
  return `${titlePart}_${datePart}`;
}

async function runScraper() {
  console.log(`[${new Date().toISOString()}] Starting events scraping process...`);

  // Read existing database events
  let existingEvents = [];
  try {
    const data = await fs.readFile(EVENTS_FILE_PATH, 'utf8');
    existingEvents = JSON.parse(data);
  } catch (err) {
    console.warn('Could not read existing events.json, initializing empty list:', err.message);
  }

  // Define scraper tasks
  const tasks = [
    { name: 'Unstop', run: scrapeUnstop },
    { name: 'HackerEarth', run: scrapeHackerEarth },
    { name: 'Hack2Skill', run: scrapeHack2Skill },
    { name: 'Luma', run: scrapeLuma },
    { name: 'OpenHackathons', run: scrapeOpenHackathons }
  ];

  // Execute all scrapers in parallel and capture settled promises
  const results = await Promise.allSettled(tasks.map(t => t.run()));

  const newEvents = [];
  results.forEach((res, index) => {
    const name = tasks[index].name;
    if (res.status === 'fulfilled') {
      console.log(`Scraper [${name}] completed successfully, found ${res.value.length} events.`);
      newEvents.push(...res.value);
    } else {
      console.error(`Scraper [${name}] failed:`, res.reason);
    }
  });

  if (newEvents.length === 0) {
    console.log('No new events retrieved from scrapers. Database remains unchanged.');
    return existingEvents;
  }

  // Index existing events by deduplication key
  const eventMap = new Map();
  existingEvents.forEach(ev => {
    const key = generateDedupeKey(ev);
    eventMap.set(key, ev);
  });

  // Find the highest existing ID to safely assign new sequential IDs
  let maxId = existingEvents.reduce((max, ev) => (typeof ev.id === 'number' && ev.id > max ? ev.id : max), 0);

  // Merge new events into the map
  let addedCount = 0;
  newEvents.forEach(ev => {
    const key = generateDedupeKey(ev);
    if (!eventMap.has(key)) {
      maxId += 1;
      const completeEvent = {
        id: maxId,
        ...ev
      };
      eventMap.set(key, completeEvent);
      addedCount++;
    }
  });

  console.log(`Scraping summary: Added ${addedCount} new unique events.`);

  if (addedCount > 0) {
    const updatedEvents = Array.from(eventMap.values());
    
    // Ensure data directory exists
    await fs.mkdir(path.dirname(EVENTS_FILE_PATH), { recursive: true });
    
    // Save to database file
    await fs.writeFile(EVENTS_FILE_PATH, JSON.stringify(updatedEvents, null, 2), 'utf8');
    console.log(`Successfully wrote updated database with ${updatedEvents.length} total events.`);
    return updatedEvents;
  }

  return existingEvents;
}

// Allow execution as an independent script
if (require.main === module) {
  runScraper()
    .then(() => console.log('Scraper standalone execution complete.'))
    .catch(err => console.error('Standalone scraper execution failed:', err));
}

module.exports = { runScraper };
