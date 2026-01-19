/**
 * Screenshot Capture Script
 * 
 * Captures screenshots of client websites for the projects showcase.
 * Run from the base of goldtech-consulting directory.
 * 
 * Usage:
 *   node scripts/capture-screenshots.js [url1] [url2] ...
 *   Or edit the URLs array below to specify websites to capture.
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const SCREENSHOT_DIR = path.join(__dirname, '..', 'public', 'projects');
const VIEWPORT_WIDTH = 1920;
const VIEWPORT_HEIGHT = 1080;
const DELAY_MS = 2000; // Wait time for page to fully load
const HERO_HEIGHT = 1080; // Height of hero section to capture (viewport height)

// URLs to capture - add your client website URLs here
const WEBSITES = [
  'https://thespeakerlab.wixsite.com/ariana-pareja'
];

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
 */
function urlToFilename(url) {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
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
    console.log('No URLs provided. Usage:');
    console.log('  node scripts/capture-screenshots.js [url1] [url2] ...');
    console.log('  Or edit the WEBSITES array in the script.');
    process.exit(1);
  }
  
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
