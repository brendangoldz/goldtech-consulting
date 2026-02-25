/**
 * GROQ queries for Sanity content.
 * Used by loaders to fetch siteConfig, service, servicePage, and post documents.
 */

/** All site config documents with variant; about image URL resolved. */
export const SITE_CONFIGS_QUERY = `*[_type == "siteConfig"] {
  variant,
  heroTrustIndicator,
  heroHeading,
  heroSubtitle,
  heroPrimaryCTA,
  heroSecondaryCTA,
  aboutEyebrow,
  aboutTitle,
  aboutSubtitle,
  aboutDescription,
  aboutFeatures,
  aboutTechStack,
  "aboutImage": aboutImage.asset->url,
  aboutImageAlt,
  servicesEyebrow,
  servicesTitle,
  servicesSubtitle,
  projectsEyebrow,
  projectsTitle,
  projectsSubtitle,
  projectItems[] {
    id,
    title,
    summary,
    screenshots[] { src, alt, websiteUrl }
  },
  footerDescription,
  footerCopyright,
  contactEmail,
  contactLocation,
  socialLinks { linkedin, facebook, github, upwork }
}`;

/** Services by lane, ordered by order ascending. */
export const SERVICES_BY_LANE_QUERY = `*[_type == "service" && lane == $lane] | order(order asc) {
  _id,
  lane,
  title,
  "slug": slug.current,
  description,
  icon,
  order
}`;

/** All service pages for a lane (for route generation / listing). */
export const SERVICE_PAGES_BY_LANE_QUERY = `*[_type == "servicePage" && lane == $lane] {
  _id,
  lane,
  "slug": slug.current,
  title,
  eyebrow,
  intro,
  seoTitle,
  metaDescription,
  sections[] { title, items },
  cta { text, href }
}`;

/** Single service page by lane and slug. */
export const SERVICE_PAGE_BY_LANE_SLUG_QUERY = `*[_type == "servicePage" && lane == $lane && slug.current == $slug][0] {
  _id,
  lane,
  "slug": slug.current,
  title,
  eyebrow,
  intro,
  seoTitle,
  metaDescription,
  sections[] { title, items },
  cta { text, href }
}`;

/** All blog posts with slug for index. */
export const POSTS_LIST_QUERY = `*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body
}`;

/** Single post by slug (for article page). */
export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body
}`;
