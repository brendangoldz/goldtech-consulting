const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, '..', 'src', 'config', 'content.js');
const projectsDir = path.join(__dirname, '..', 'public', 'projects');

// Read existing PNG files
const existingFiles = new Set(
  fs.readdirSync(projectsDir)
    .filter(f => f.endsWith('.png'))
    .map(f => f)
);

// Read content.js
let content = fs.readFileSync(contentPath, 'utf8');

// Function to check and replace screenshot paths
function updateScreenshotPath(match, fullPath, alt, websiteUrl) {
  // Extract just the filename from the path
  const filename = fullPath.replace('/projects/', '');
  
  if (existingFiles.has(filename)) {
    // File exists, keep the original
    return match;
  } else {
    // File doesn't exist, use placeholder SVG
    // Alternate between the two SVGs based on index
    const placeholderIndex = Math.random() < 0.5 ? 1 : 2;
    const placeholderPath = `/projects/wix-showcase-${placeholderIndex}.svg`;
    return `            {
              src: '${placeholderPath}',
              alt: '${alt}',
              websiteUrl: '${websiteUrl}',
            }`;
  }
}

// Replace all screenshot entries
// Pattern: matches the screenshot object structure
const screenshotPattern = /(\s+)(\{[\s\S]*?src:\s*'([^']+)',[\s\S]*?alt:\s*'([^']+)',[\s\S]*?websiteUrl:\s*'([^']+)',[\s\S]*?\})/g;

let replacementCount = 0;
let index = 0;

content = content.replace(screenshotPattern, (match, indent, obj, src, alt, websiteUrl) => {
  const filename = src.replace('/projects/', '');
  
  if (existingFiles.has(filename)) {
    // File exists, keep original
    return match;
  } else {
    // File doesn't exist, use placeholder (alternate between 1 and 2)
    const placeholderNum = (index % 2) + 1;
    index++;
    replacementCount++;
    
    // Reconstruct the object with placeholder
    return `            {
              src: '/projects/wix-showcase-${placeholderNum}.svg',
              alt: '${alt}',
              websiteUrl: '${websiteUrl}',
            }`;
  }
});

// Write updated content
fs.writeFileSync(contentPath, content, 'utf8');

console.log(`Updated ${replacementCount} screenshot entries to use placeholder SVGs.`);
console.log(`Total existing PNG files: ${existingFiles.size}`);
