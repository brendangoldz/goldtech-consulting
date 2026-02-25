/**
 * Extracts siteConfig-shaped JSON from content.js (everything except services.items).
 * Run from goldtech-consulting: node scripts/extract-siteconfig-to-json.js
 * Outputs: siteConfig-consulting.json, siteConfig-marketing.json
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const contentPath = path.join(__dirname, '..', 'src', 'config', 'content.js');
const outDir = path.join(__dirname, '..');

let content = fs.readFileSync(contentPath, 'utf8');
// Run as CJS: replace export with var so we can runInNewContext and capture contentConfig
content = content.replace('export const contentConfig = ', 'var contentConfig = ');
content = content.replace('export const getContent = ', 'var getContent = ');

const ctx = {};
vm.createContext(ctx);
vm.runInNewContext(content, ctx);

const contentConfig = ctx.contentConfig;
if (!contentConfig || !contentConfig.consulting || !contentConfig.marketing) {
  throw new Error('Could not load contentConfig from content.js');
}

/**
 * Map a variant (consulting/marketing) from content.js to Sanity siteConfig shape.
 * Excludes services.items. Strips isShared from project items.
 */
function toSiteConfig(variant) {
  const c = contentConfig[variant];
  const projectItems = (c.projects.items || []).map((project) => {
    const { isShared, ...rest } = project;
    return {
      _type: 'projectItem',
      ...rest,
      screenshots: (rest.screenshots || []).map((s) => ({ _type: 'object', ...s })),
    };
  });

  return {
    variant,
    heroTrustIndicator: c.hero?.trustIndicator ?? null,
    heroHeading: c.hero?.heading
      ? {
          line1: c.hero.heading.line1 ?? null,
          highlight1: c.hero.heading.highlight1 ?? null,
          line2: c.hero.heading.line2 ?? null,
          highlight2: c.hero.heading.highlight2 ?? null,
          line3: c.hero.heading.line3 ?? null,
          highlight3: c.hero.heading.highlight3 ?? null,
        }
      : null,
    heroSubtitle: c.hero?.subtitle ?? null,
    heroPrimaryCTA: c.hero?.primaryCTA ?? null,
    heroSecondaryCTA: c.hero?.secondaryCTA ?? null,
    aboutEyebrow: c.about?.eyebrow ?? null,
    aboutTitle: c.about?.title ?? null,
    aboutSubtitle: c.about?.subtitle ?? null,
    aboutDescription: c.about?.description ?? null,
    aboutFeatures: c.about?.features ?? [],
    aboutTechStack: c.about?.techStack ?? [],
    aboutImageAlt: c.about?.imageAlt ?? null,
    servicesEyebrow: c.services?.eyebrow ?? null,
    servicesTitle: c.services?.title ?? null,
    servicesSubtitle: c.services?.subtitle ?? null,
    projectsEyebrow: c.projects?.eyebrow ?? null,
    projectsTitle: c.projects?.title ?? null,
    projectsSubtitle: c.projects?.subtitle ?? null,
    projectItems,
    footerDescription: c.footer?.description ?? null,
    footerCopyright: c.footer?.copyright ?? null,
    contactEmail: c.contact?.email ?? null,
    contactLocation: c.contact?.location ?? null,
    socialLinks: c.contact?.socialLinks
      ? {
          linkedin: c.contact.socialLinks.linkedin ?? null,
          facebook: c.contact.socialLinks.facebook ?? null,
          github: c.contact.socialLinks.github ?? null,
          upwork: c.contact.socialLinks.upwork ?? null,
        }
      : null,
  };
}

const consulting = toSiteConfig('consulting');
const marketing = toSiteConfig('marketing');

fs.writeFileSync(
  path.join(outDir, 'siteConfig-consulting.json'),
  JSON.stringify(consulting, null, 2),
  'utf8'
);
fs.writeFileSync(
  path.join(outDir, 'siteConfig-marketing.json'),
  JSON.stringify(marketing, null, 2),
  'utf8'
);

console.log('Wrote siteConfig-consulting.json and siteConfig-marketing.json to', outDir);
console.log('Consulting projectItems count:', consulting.projectItems?.length ?? 0);
console.log('Marketing projectItems count:', marketing.projectItems?.length ?? 0);
