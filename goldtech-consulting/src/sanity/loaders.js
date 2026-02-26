/**
 * Sanity-first content loaders with static fallback.
 * Fetches from Sanity, maps to UI shapes, caches in memory. On failure, falls back to static config.
 */

import { sanityClient } from './client';
import {
  SITE_CONFIGS_QUERY,
  SERVICES_BY_LANE_QUERY,
  SERVICE_PAGES_BY_LANE_QUERY,
  SERVICE_PAGE_BY_LANE_SLUG_QUERY,
  POSTS_LIST_QUERY,
  POST_BY_SLUG_QUERY
} from './queries';
import { EMPTY_CONTENT } from './emptyContent';
import {
  mapSiteConfigToVariantContent,
  mapServiceToCard,
  mapServicePageToPage,
  mapPostToBlogPost
} from './mappers';

let contentCache = null;
let servicePagesCache = { consulting: null, marketing: null };
let blogPostsCache = null;

/**
 * Load full content config (consulting + marketing) from Sanity and merge in services.
 * Returns { consulting, marketing } matching content.js shape. Uses static fallback on error.
 */
export async function loadContent() {
  if (contentCache) return contentCache;

  try {
    const [configs, consultingServices, marketingServices] = await Promise.all([
      sanityClient.fetch(SITE_CONFIGS_QUERY),
      sanityClient.fetch(SERVICES_BY_LANE_QUERY, { lane: 'consulting' }),
      sanityClient.fetch(SERVICES_BY_LANE_QUERY, { lane: 'marketing' })
    ]);

    const consultingConfig = configs?.find((c) => c.variant === 'consulting');
    const marketingConfig = configs?.find((c) => c.variant === 'marketing');

    const consultingContent = mapSiteConfigToVariantContent(consultingConfig);
    const marketingContent = mapSiteConfigToVariantContent(marketingConfig);

    if (consultingContent) {
      consultingContent.services.items = (consultingServices || []).map(mapServiceToCard).filter(Boolean);
    }
    if (marketingContent) {
      marketingContent.services.items = (marketingServices || []).map(mapServiceToCard).filter(Boolean);
    }

    contentCache = {
      consulting: consultingContent || { hero: {}, about: {}, services: { items: [] }, projects: { items: [] }, footer: {}, contact: {} },
      marketing: marketingContent || { hero: {}, about: {}, services: { items: [] }, projects: { items: [] }, footer: {}, contact: {} }
    };
    return contentCache;
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Sanity loadContent failed, using static fallback:', err);
    }
    const { contentConfig } = await import('../config/content');
    contentCache = contentConfig;
    return contentCache;
  }
}

/**
 * Get content for a variant. Call loadContent() first (e.g. in a provider or root) so cache is populated.
 * If cache is empty, returns empty-shaped object so components do not crash.
 */
export function getContent(variant = 'consulting') {
  if (contentCache) {
    return contentCache[variant] || contentCache.consulting;
  }
  return EMPTY_CONTENT;
}

/**
 * Preload content (e.g. early in app lifecycle). Fire-and-forget.
 */
export function preloadContent() {
  if (!contentCache) {
    loadContent().catch(() => {});
  }
}

/**
 * Get full content config synchronously (if already loaded). Returns null until loadContent() has resolved.
 */
export function getContentSync() {
  return contentCache;
}

/**
 * Load all service pages for a lane. Cached per lane. Fallback: static consultingSeoPages / marketingSeoPages.
 */
export async function loadServicePages(lane) {
  const key = lane === 'marketing' ? 'marketing' : 'consulting';
  if (servicePagesCache[key]) return servicePagesCache[key];

  try {
    const pages = await sanityClient.fetch(SERVICE_PAGES_BY_LANE_QUERY, { lane });
    const mapped = (pages || []).map((doc) => mapServicePageToPage(doc, lane)).filter(Boolean);
    servicePagesCache[key] = mapped;
    return mapped;
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Sanity loadServicePages failed, using static fallback:', err);
    }
    if (lane === 'marketing') {
      const { marketingServicePages } = await import('../config/marketingSeoPages');
      servicePagesCache[key] = marketingServicePages;
      return marketingServicePages;
    }
    const { consultingServicePages } = await import('../config/consultingSeoPages');
    servicePagesCache[key] = consultingServicePages;
    return consultingServicePages;
  }
}

/**
 * Get a single service page by lane and slug. Tries Sanity first, then static fallback.
 */
export async function loadServicePageBySlug(lane, slug) {
  if (!slug) return null;

  try {
    const doc = await sanityClient.fetch(SERVICE_PAGE_BY_LANE_SLUG_QUERY, { lane, slug });
    if (doc) return mapServicePageToPage(doc, lane);
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Sanity loadServicePageBySlug failed, using static fallback:', err);
    }
  }

  if (lane === 'marketing') {
    const { marketingServicePages, getMarketingPageBySlug } = await import('../config/marketingSeoPages');
    return getMarketingPageBySlug(marketingServicePages, slug) ?? null;
  }
  const { consultingServicePages, getConsultingPageBySlug } = await import('../config/consultingSeoPages');
  return getConsultingPageBySlug(consultingServicePages, slug) ?? null;
}

/**
 * Load all blog posts. Cached. Fallback: static blogPosts.
 */
export async function loadBlogPosts() {
  if (blogPostsCache) return blogPostsCache;

  try {
    const posts = await sanityClient.fetch(POSTS_LIST_QUERY);
    blogPostsCache = (posts || []).map(mapPostToBlogPost).filter(Boolean);
    return blogPostsCache;
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Sanity loadBlogPosts failed, using static fallback:', err);
    }
    const { blogPosts } = await import('../config/blogPosts');
    blogPostsCache = blogPosts;
    return blogPosts;
  }
}

/**
 * Get a single blog post by slug. Tries cache, then Sanity, then static fallback.
 */
export async function getBlogPostBySlug(slug) {
  if (!slug) return null;

  if (blogPostsCache) {
    const found = blogPostsCache.find((p) => p.slug === slug);
    if (found) return found;
  }

  try {
    const doc = await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug });
    if (doc) return mapPostToBlogPost(doc);
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Sanity getBlogPostBySlug failed, using static fallback:', err);
    }
  }

  const { getBlogPostBySlug: staticGet } = await import('../config/blogPosts');
  return staticGet(slug) ?? null;
}
