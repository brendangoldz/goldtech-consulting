/**
 * Express Server with Server-Side Rendering (SSR)
 * 
 * This is a basic SSR implementation that can be deployed.
 * It serves the React app with route-specific meta tags and content injection.
 * 
 * Note: This is a crude example for demonstration purposes.
 * For production, consider using Next.js, Remix, or a more robust SSR solution.
 * 
 * To use:
 * 1. Build the React app: npm run build
 * 2. Start the server: npm run server
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the React app build
const buildPath = path.join(__dirname, '../build');
app.use(express.static(buildPath));

// Rate limiter for catch-all route to protect file system access
const catchAllLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
});

// Read the HTML template
let htmlTemplate;
try {
  htmlTemplate = fs.readFileSync(
    path.join(buildPath, 'index.html'),
    'utf8'
  );
} catch (error) {
  console.error('Error reading HTML template. Make sure to run "npm run build" first.');
  process.exit(1);
}

/**
 * Inject route-specific meta tags into the HTML template
 * 
 * @param {string} title - Page title
 * @param {string} description - Meta description
 * @returns {string} HTML with injected meta tags
 */
const injectMetaTags = (title, description) => {
  let html = htmlTemplate;
  
  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${title}</title>`
  );
  
  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`
  );
  
  return html;
};

// Landing page route
app.get('/', (req, res) => {
  try {
    const html = injectMetaTags(
      'GoldTech - Choose Your Path',
      'GoldTech Consulting and Marketing - Choose between our software development services or strategic marketing solutions.'
    );
    res.send(html);
  } catch (error) {
    console.error('Error serving landing page:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Consulting page route
app.get('/consulting', (req, res) => {
  try {
    const html = injectMetaTags(
      'GoldTech Consulting - Software Development Services',
      'GoldTech Consulting - Custom software development, integrations, and QA automation. Build faster, ship cleaner, look premium. Delivered solutions for 50+ businesses worldwide.'
    );
    res.send(html);
  } catch (error) {
    console.error('Error serving consulting page:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Marketing page route
app.get('/marketing', (req, res) => {
  try {
    const html = injectMetaTags(
      'GoldTech Marketing - Strategic Marketing Solutions',
      'GoldTech Marketing - Strategic marketing solutions that drive growth, engagement, and measurable results. Created 100+ marketing campaigns for growing brands.'
    );
    res.send(html);
  } catch (error) {
    console.error('Error serving marketing page:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', catchAllLimiter, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`📍 Visit http://localhost:${PORT} to see the app`);
  console.log(`\n📄 Routes available:`);
  console.log(`   - http://localhost:${PORT}/ (Landing Page)`);
  console.log(`   - http://localhost:${PORT}/consulting (Consulting Page)`);
  console.log(`   - http://localhost:${PORT}/marketing (Marketing Page)`);
  console.log(`\n💡 Note: This is a basic SSR example that injects route-specific meta tags.`);
  console.log(`   For full SSR with React component rendering, consider Next.js or Remix.\n`);
});

