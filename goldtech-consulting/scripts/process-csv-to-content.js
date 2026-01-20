const fs = require('fs');
const path = require('path');

// Read CSV file
const csvPath = path.join(__dirname, '../public/Wix_Websites_Extracted.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV
const lines = csvContent.split('\n').slice(1).filter(line => line.trim());
const websites = [];

lines.forEach((line, index) => {
  // Simple CSV parsing (handles quoted fields)
  const parts = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  parts.push(current.trim());
  
  if (parts.length >= 4) {
    const name = parts[0];
    const url = parts[1];
    const published = parts[3] === 'TRUE';
    
    if (published && url && url.trim() !== '') {
      websites.push({ name, url: url.trim() });
    }
  }
});

// Generate screenshot filename from URL
function generateFilename(url, index) {
  let filename = url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
    .replace(/\./g, '-')
    .replace(/\//g, '-')
    .toLowerCase();
  
  return `/projects/${filename}-${index + 1}.png`;
}

// Generate screenshot entries
const screenshots = websites.map((website, index) => ({
  src: generateFilename(website.url, index),
  alt: `${website.name} website homepage`,
  websiteUrl: website.url
}));

// Read current content.js
const contentPath = path.join(__dirname, '../src/config/content.js');
const contentFile = fs.readFileSync(contentPath, 'utf8');

// Generate the screenshots array as a string
const screenshotsString = screenshots.map(s => {
  return `            {
              src: '${s.src}',
              alt: '${s.alt.replace(/'/g, "\\'")}',
              websiteUrl: '${s.websiteUrl}',
            }`;
}).join(',\n');

console.log(`Generated ${screenshots.length} screenshot entries`);
console.log('\nScreenshots array:\n');
console.log(screenshotsString);

// Write to a temporary file for review
const outputPath = path.join(__dirname, '../screenshots-output.txt');
fs.writeFileSync(outputPath, screenshotsString);
console.log(`\nOutput written to: ${outputPath}`);
