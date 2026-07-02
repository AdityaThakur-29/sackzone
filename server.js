const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const { runScraper } = require('./scraper/index');

const app = express();
const PORT = process.env.PORT || 3000;
const EVENTS_FILE_PATH = path.join(__dirname, 'data', 'events.json');

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint to serve events
app.get('/api/events', (req, res) => {
  fs.readFile(EVENTS_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading events.json:', err);
      return res.status(500).json({ error: 'Failed to read events database.' });
    }
    try {
      const events = JSON.parse(data);
      res.json(events);
    } catch (parseErr) {
      console.error('Error parsing events.json:', parseErr);
      res.status(500).json({ error: 'Malformed events database.' });
    }
  });
});

// Fallback for SPA Routing: serve public/index.html for any unmapped route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);

  // Schedule scraper to run every 8 hours (0 */8 * * *)
  cron.schedule('0 */8 * * *', async () => {
    console.log(`[${new Date().toISOString()}] Cron trigger: Running scheduled scraper...`);
    try {
      await runScraper();
      console.log('Cron scraper completed successfully.');
    } catch (err) {
      console.error('Cron scraper failed:', err);
    }
  });

  // Run scraper on startup (asynchronously in the background)
  console.log('Initial startup: Running scraper to ensure fresh data...');
  runScraper()
    .then(() => console.log('Startup scraper run completed successfully.'))
    .catch(err => console.error('Startup scraper run failed:', err));
});
