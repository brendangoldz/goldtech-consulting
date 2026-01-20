/**
 * Screenshot Capture Script
 * 
 * Captures screenshots of client websites for the projects showcase.
 * Run from the base of goldtech-consulting directory.
 * 
 * By default, loads URLs from public/Wix_Websites_Extracted.csv (published websites only).
 * 
 * Usage:
 *   node scripts/capture-screenshots.js
 *     - Captures screenshots for all published websites in CSV
 *   
 *   node scripts/capture-screenshots.js [url1] [url2] ...
 *     - Override CSV and capture specific URLs provided as arguments
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const SCREENSHOT_DIR = path.join(__dirname, '..', 'public', 'projects');
const CSV_PATH = path.join(__dirname, '..', 'public', 'Wix_Websites_Extracted.csv');
const VIEWPORT_WIDTH = 1920;
const VIEWPORT_HEIGHT = 1080;
const DELAY_MS = 2000; // Wait time for page to fully load
const HERO_HEIGHT = 1080; // Height of hero section to capture (viewport height)

/**
 * Parse CSV file and extract published website URLs
 */
function loadWebsitesFromCSV() {
  try {
    const csvContent = fs.readFileSync(CSV_PATH, 'utf8');
    const lines = csvContent.split('\n').slice(1).filter(line => line.trim());
    const websites = [];

    lines.forEach((line) => {
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
        const url = parts[1];
        const published = parts[3] === 'TRUE';
        
        if (published && url && url.trim() !== '') {
          websites.push(url.trim());
        }
      }
    });

    return websites;
  } catch (error) {
    console.error(`Error reading CSV file: ${error.message}`);
    console.log('Falling back to empty array. You can provide URLs via command line arguments.');
    return [];
  }
}

// URLs to capture - loaded from CSV file, or can be overridden via command line
const WEBSITES = loadWebsitesFromCSV();

/**
 * Ensure the screenshots directory exists
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

/**
 * Sanitize URL to create a valid filename
 * Matches the pattern used in content.js generation
 */
function urlToFilename(url) {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
    .replace(/\./g, '-')
    .replace(/\//g, '-')
    .toLowerCase();
}

/**
 * Capture screenshot of a website
 */
async function captureScreenshot(url, outputPath) {
  console.log(`Capturing screenshot of ${url}...`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  try {
    const page = await context.newPage();
    
    // Navigate to the URL
    await page.goto(url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait additional time for dynamic content (hero section animations, etc.)
    await page.waitForTimeout(DELAY_MS);
    
    // Ensure we're at the top of the page to capture hero section
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);
    
    // Capture hero section only (viewport screenshot, not full page)
    await page.screenshot({
      path: outputPath,
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: VIEWPORT_WIDTH,
        height: HERO_HEIGHT
      }
    });
    
    console.log(`✓ Screenshot saved: ${outputPath}`);
    
    await browser.close();
    return true;
  } catch (error) {
    console.error(`✗ Error capturing ${url}:`, error.message);
    await browser.close();
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  // Get URLs from command line arguments or use default array
  const urls = process.argv.slice(2).length > 0 
    ? process.argv.slice(2) 
    : WEBSITES;
  
  if (urls.length === 0) {
    console.log('No URLs found. Options:');
    console.log('  1. Ensure CSV file exists at:', CSV_PATH);
    console.log('  2. Provide URLs via command line:');
    console.log('     node scripts/capture-screenshots.js [url1] [url2] ...');
    process.exit(1);
  }
  
  console.log(`Loaded ${urls.length} website(s) from CSV file.`);
  
  // Ensure output directory exists
  ensureDirectoryExists(SCREENSHOT_DIR);
  
  console.log(`\n📸 Starting screenshot capture for ${urls.length} website(s)...\n`);
  
  // Capture screenshots for each URL
  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const filename = `${urlToFilename(url)}-${i + 1}.png`;
    const outputPath = path.join(SCREENSHOT_DIR, filename);
    
    const success = await captureScreenshot(url, outputPath);
    results.push({ url, outputPath, success });
    
    // Small delay between captures
    if (i < urls.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Summary
  console.log('\n📊 Summary:');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`  ✓ Successful: ${successful}`);
  console.log(`  ✗ Failed: ${failed}`);
  
  if (successful > 0) {
    console.log('\n📁 Screenshots saved to:', SCREENSHOT_DIR);
  }
  
  process.exit(failed > 0 ? 1 : 0);
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
