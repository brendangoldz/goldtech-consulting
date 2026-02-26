/**
 * Maps Sanity API responses to the UI shapes expected by existing components.
 * Keeps component interfaces unchanged (hero, about, services.items, etc.).
 */

/**
 * Map a single siteConfig document to the variant content shape (hero, about, services, projects, footer, contact).
 * Services.items are not included here; they are merged from service documents in the loader.
 */
export function mapSiteConfigToVariantContent(doc) {
  if (!doc) return null;
  return {
    hero: {
      trustIndicator: doc.heroTrustIndicator ?? '',
      heading: {
        line1: doc.heroHeading?.line1 ?? '',
        highlight1: doc.heroHeading?.highlight1 ?? '',
        line2: doc.heroHeading?.line2 ?? '',
        highlight2: doc.heroHeading?.highlight2 ?? '',
        line3: doc.heroHeading?.line3 ?? '',
        highlight3: doc.heroHeading?.highlight3 ?? ''
      },
      subtitle: doc.heroSubtitle ?? '',
      primaryCTA: doc.heroPrimaryCTA ?? '',
      secondaryCTA: doc.heroSecondaryCTA ?? ''
    },
    about: {
      eyebrow: doc.aboutEyebrow ?? '',
      title: doc.aboutTitle ?? '',
      subtitle: doc.aboutSubtitle ?? '',
      description: doc.aboutDescription ?? '',
      features: Array.isArray(doc.aboutFeatures) ? doc.aboutFeatures : [],
      techStack: Array.isArray(doc.aboutTechStack) ? doc.aboutTechStack : [],
      image: doc.aboutImage ?? '',
      imageAlt: doc.aboutImageAlt ?? ''
    },
    services: {
      eyebrow: doc.servicesEyebrow ?? '',
      title: doc.servicesTitle ?? '',
      subtitle: doc.servicesSubtitle ?? '',
      items: [] // Filled by loader from service documents
    },
    projects: {
      eyebrow: doc.projectsEyebrow ?? '',
      title: doc.projectsTitle ?? '',
      subtitle: doc.projectsSubtitle ?? '',
      items: (doc.projectItems || []).map((item) => ({
        id: item.id ?? '',
        title: item.title ?? '',
        summary: item.summary ?? '',
        isShared: true,
        screenshots: (item.screenshots || []).map((s) => ({
          src: s.src ?? '',
          alt: s.alt ?? '',
          websiteUrl: s.websiteUrl ?? ''
        }))
      }))
    },
    footer: {
      description: doc.footerDescription ?? '',
      copyright: doc.footerCopyright ?? ''
    },
    contact: {
      email: doc.contactEmail ?? '',
      location: doc.contactLocation ?? '',
      socialLinks: {
        linkedin: doc.socialLinks?.linkedin ?? '',
        facebook: doc.socialLinks?.facebook ?? '',
        github: doc.socialLinks?.github ?? '',
        upwork: doc.socialLinks?.upwork ?? ''
      }
    }
  };
}

/**
 * Map Sanity service document to homepage service card shape: { icon, title, desc, slug }.
 */
export function mapServiceToCard(service) {
  if (!service) return null;
  return {
    icon: service.icon ?? 'FaLaptopCode',
    title: service.title ?? '',
    desc: service.description ?? '',
    slug: service.slug ?? ''
  };
}

/**
 * Map Sanity servicePage document to SeoLandingPage shape: path, seoTitle, metaDescription, eyebrow, h1, intro, sections, cta.
 */
export function mapServicePageToPage(doc, lane) {
  if (!doc) return null;
  const slug = doc.slug ?? '';
  const path = lane === 'marketing'
    ? `/marketing/services/${slug}`
    : `/consulting/services/${slug}`;
  return {
    slug,
    path,
    seoTitle: doc.seoTitle ?? doc.title ?? '',
    metaDescription: doc.metaDescription ?? '',
    eyebrow: doc.eyebrow ?? '',
    h1: doc.title ?? '',
    intro: doc.intro ?? '',
    sections: (doc.sections || []).map((s) => ({
      title: s.title ?? '',
      items: Array.isArray(s.items) ? s.items : []
    })),
    cta: doc.cta
      ? { text: doc.cta.text ?? '', href: doc.cta.href ?? '' }
      : { text: '', href: '#' }
  };
}

/**
 * Estimate read time from Portable Text body (word count / ~200 wpm).
 */
function estimateReadTime(body) {
  if (!Array.isArray(body)) return '5 min';
  const text = body
    .filter((b) => b._type === 'block' && b.children)
    .flatMap((b) => b.children.map((c) => (c.text || '')))
    .join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

/**
 * Map Sanity post document to blog UI shape: slug, title, description, date, readTime, audience, intro, sections, cta.
 * Post schema has title, slug, excerpt, body (portable text). We map to description/intro/readTime and keep body for Portable Text rendering.
 */
export function mapPostToBlogPost(doc) {
  if (!doc) return null;
  return {
    slug: doc.slug ?? '',
    title: doc.title ?? '',
    description: doc.excerpt ?? '',
    date: doc._createdAt ? doc._createdAt.slice(0, 10) : '',
    readTime: estimateReadTime(doc.body),
    audience: 'consulting',
    intro: doc.excerpt ?? '',
    sections: [],
    cta: {
      text: 'If you want this implemented for your business, here is how we help.',
      href: '/consulting#contact',
      secondaryText: 'Start your project',
      secondaryHref: '/consulting#contact'
    },
    body: doc.body
  };
}
