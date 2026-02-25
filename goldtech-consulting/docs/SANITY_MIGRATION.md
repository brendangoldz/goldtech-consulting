# Sanity CMS Migration – Single Lane (Website Dev + Design)

This doc maps your existing `src/config` content to Sanity and defines the **refocused single-lane** service set (Wix + custom website development and design).

**Website structure:** The site stays **split in two** — a **Consulting** side and a **Marketing** side (each with its own hero, about, services, projects, footer, contact). “Single lane” means a focused *service* set per side (website dev for Consulting, website design/presence for Marketing), not one combined website.

---

## 1. Refocused service list (single lane, per side)

Use **FA Icon** in the Sanity `service.icon` field (Font Awesome component name for your frontend). Use **Short description** in the Sanity `service.description` field.

### Consulting (website development)

| Service | Slug | FA Icon | Short description | Notes |
|--------|------|---------|-------------------|--------|
| **Website Development (Wix or Custom)** | `website-development-wix-custom` | `FaLaptopCode` | Wix and custom website builds with conversion-focused UX, technical reviews, and reliability improvements. | Core offering; keep existing Wix & Custom copy, orient around “website” not generic software. |
| **Website Management** | `website-management` | `FaCogs` | Ongoing site updates, content changes, and reliability so your website stays current and performant. | New/renamed from “Systems & Integration” focus: ongoing site updates, content, reliability. |
| **Website Automation & Integration** | `website-automation-integration` | `FaPlug` | Connect your website to CRMs, forms, bookings, and APIs so data flows cleanly and workflows run automatically. | Wix + CRM, forms, bookings, APIs; merge Wix automation / CRM / booking platform pages into one service. |
| **Website Consultation & Review** | `website-consultation-review` | `FaClipboardCheck` | Technical and UX audits, conversion reviews, and a clear roadmap to improve or rebuild your site. | Technical and UX reviews, audits, roadmap; replaces generic “Business & Technology Advisory” for this lane. |

### Marketing (design + presence)

| Service | Slug | FA Icon | Short description | Notes |
|--------|------|---------|-------------------|--------|
| **Website Design (Wix or Custom)** | `website-design-wix-custom` | `FaPalette` | Conversion-focused Wix and custom website design that looks premium and turns visitors into leads. | Design-focused counterpart to consulting “Website Development”; can share case studies. |
| **Website Content & Copywriting** | `website-content-copywriting` | `FaPenFancy` | On-site copy, SEO content, and conversion-focused messaging that ranks and converts. | On-site content, SEO copy, conversion copy; aligns with existing “Content Marketing, SEO & Web Design” but name focuses on website. |
| **Brand Development & Design** | `brand-development-design` | `FaStamp` | Brand strategy, visual identity, and guidelines so your marketing stays consistent across every channel. | Keep as-is; “deviation from website but very relevant” for positioning and visuals. |
| **Digital Presence Services** | `digital-presence-services` | `FaGlobeAmericas` | Unified strategy for website, social media, and marketing so all your digital assets work together. | Full picture: marketing + social media + website (strategy, content, channels). Single entry for “all these assets rely on each other.” |

---

## 2. Config → Sanity document mapping

### 2.1 Site config (hero, about, services intro, projects, footer, contact)

- **Source:** `src/config/content.js` → `contentConfig.consulting` and `contentConfig.marketing`.
- **Sanity type:** `siteConfig`.
- **Strategy:** Create **two** `siteConfig` documents: one with `variant: "consulting"` (from `contentConfig.consulting`) and one with `variant: "marketing"` (from `contentConfig.marketing`). The frontend shows two sides (e.g. `/consulting` and `/marketing`) and fetches config by `variant`. Each side has its own hero, about, footer, contact, and projects. “lane”
| Config path | SiteConfig field |
|-------------|------------------|
| `hero.trustIndicator` | `heroTrustIndicator` |
| `hero.heading` (line1–3, highlight1–3) | `heroHeading` (object) |
| `hero.subtitle` | `heroSubtitle` |
| `hero.primaryCTA` / `secondaryCTA` | `heroPrimaryCTA` / `heroSecondaryCTA` |
| `about.eyebrow/title/subtitle/description` | `aboutEyebrow`, `aboutTitle`, `aboutSubtitle`, `aboutDescription` |
| `about.features` (array of strings) | `aboutFeatures` |
| `about.techStack` | `aboutTechStack` |
| `about.image` (path) | `aboutImage` (Sanity image or string path for migration) |
| `about.imageAlt` | `aboutImageAlt` |
| `services.eyebrow/title/subtitle` | `servicesEyebrow`, `servicesTitle`, `servicesSubtitle` |
| `projects.eyebrow/title/subtitle` | `projectsEyebrow`, `projectsTitle`, `projectsSubtitle` |
| `projects.items` (id, title, summary, screenshots) | `projectItems` |
| `footer.description/copyright` | `footerDescription`, `footerCopyright` |
| `contact.email/location/socialLinks` | `contactEmail`, `contactLocation`, `socialLinks` |

- **Note:** Service **items** (cards on homepage) are no longer in `content.js`; they come from Sanity **Service** documents (see below).

### 2.2 Homepage service cards

- **Source:** `content.js` → `consulting.services.items` and `marketing.services.items`.
- **Sanity type:** `service`.
- **Strategy:** Create one `service` document per refocused offering (8 total: 4 consulting + 4 marketing). Map old copy where it fits; for new names use the slugs above.

| Old (consulting) | New (refocused) |
|------------------|----------------|
| Wix & Custom Website Development | **Website Development (Wix or Custom)** – same intent, keep slug/desc. |
| Systems & Integration Consulting | **Website Automation & Integration** – merge platform pages (Wix automation, CRM, booking) into this. |
| Custom Software Solutions | **Website Management** or **Website Automation & Integration** (split “ongoing management” vs “integrations/automation” as you prefer). |
| Business & Technology Advisory | **Website Consultation & Review** – reposition for website audits and roadmaps. |

| Old (marketing) | New (refocused) |
|------------------|----------------|
| Digital & Social Marketing Strategy | **Digital Presence Services** – full picture (marketing + social + website). |
| Wix Web Design, Content & SEO | **Website Design (Wix or Custom)** + **Website Content & Copywriting** (split design vs content if you want two cards). |
| SEO Consulting | Fold into **Website Content & Copywriting** or **Digital Presence Services** as appropriate. |
| Brand Book Development | **Brand Development & Design** – keep. |

### 2.3 Service detail pages (SEO + sections)

- **Source:** `consultingSeoPages.js` (consultingServicePages, consultingPlatformPages, consultingIndustryPages) and `marketingSeoPages.js` (marketingServicePages, marketingPlatformPages, marketingIndustryPages).
- **Sanity type:** `servicePage`.
- **Strategy:**
  - **Consulting:** Create one `servicePage` per refocused consulting service (4). Merge content from existing service + platform pages (e.g. Wix automation + CRM + booking → “Website Automation & Integration”). Industry pages (for-coaches, for-consultants, etc.) can stay as separate pages or be turned into “audience” sections inside the main service pages.
  - **Marketing:** Same idea: one `servicePage` per refocused marketing service (4). Merge “Content Marketing, SEO & Web Design” into “Website Content & Copywriting” and/or “Website Design”; merge platform pages (LinkedIn, Instagram, Google Ads) into “Digital Presence Services” as channels/examples.

Mapping from existing page shape to `servicePage`:

| Existing field | servicePage field |
|----------------|-------------------|
| `slug` | `slug` |
| `seoTitle` | `seoTitle` |
| `metaDescription` | `metaDescription` |
| `eyebrow` | `eyebrow` |
| `h1` | `title` |
| `intro` | `intro` |
| `sections[]` (title + items) | `sections[]` (type `servicePageSection`: title + items) |
| `cta.text` / `cta.href` | `cta.text` / `cta.href` |
| (infer from path) | `lane`: `"consulting"` or `"marketing"` |

---

## 3. What to create in Sanity (checklist)

1. **Site config (two sides)**
   - Two `siteConfig` documents: one with `variant: "consulting"` (copy from `content.js` → `contentConfig.consulting`) and one with `variant: "marketing"` (copy from `contentConfig.marketing`). Each has its own hero, about, services intro, projects, footer, and contact.

2. **Services (8 cards)**
   - 4× `service` with `lane: "consulting"`: Website Development (Wix or Custom), Website Management, Website Automation & Integration, Website Consultation & Review.
   - 4× `service` with `lane: "marketing"`: Website Design (Wix or Custom), Website Content & Copywriting, Brand Development & Design, Digital Presence Services.
   - Set `slug`, `title`, `description`, `icon`, `order` so the homepage and routing match.

3. **Service pages (8 detail pages)**
   - 4× `servicePage` for consulting, 4× for marketing, with SEO fields and sections merged from existing consulting/marketing SEO and platform pages as above.

4. **Projects**
   - Either keep one shared “100+ Wix websites” project in `siteConfig.projectItems` (from `content.js` consulting or marketing) or later move to a separate `project` document type if you want more structure.

---

## 4. Files to keep during migration

- **content.js** – Keep until frontend reads from Sanity; then you can remove or slim to fallbacks.
- **consultingSeoPages.js** / **marketingSeoPages.js** – Keep as reference; create corresponding `servicePage` documents in Sanity, then switch the site to fetch by `lane` + `slug`.
- **contentLoader.js** – Once the app uses Sanity for hero/about/services/projects/footer/contact, you can load site config and services from the API instead of this loader.

---

## 5. Frontend integration (high level)

- **Site config:** Query `siteConfig` by `variant` — one document for the Consulting side, one for the Marketing side. The active route (e.g. `/consulting` vs `/marketing`) determines which variant to fetch.
- **Homepage services:** Query `service` by `lane` (consulting or marketing), order by `order`. Each side shows only its four services.
- **Service detail pages:** Query `servicePage` by `lane` and `slug.current`; use `seoTitle`/`metaDescription` and render `sections` and `cta`.
- **Routing:** Keep the split: `/consulting` and `/consulting/services/[slug]` for the Consulting side; `/marketing` and `/marketing/services/[slug]` for the Marketing side.

This keeps the website split in two (Consulting side and Marketing side) while each side uses a single-lane service set (website dev vs website design/presence) and makes migrating from `src/config` to Sanity straightforward.

---

## 6. Quick start: seed data in Studio

After starting Sanity Studio (`npm run dev` in the `studio` folder):

1. **Create two Site Configs (Consulting + Marketing)**
   - New document → **Site Config** → set variant to **Consulting**. Copy hero, about, services intro, projects, footer, and contact from `content.js` → `contentConfig.consulting` into the corresponding groups.
   - New document → **Site Config** → set variant to **Marketing**. Copy from `contentConfig.marketing` into the same groups. For projects on both, add one item (e.g. “100+ Wix Websites”) and paste screenshot entries from `content.js`; bulk import can be a follow-up script.

2. **Create the 8 Service cards**
   - New document → **Service**, create one per row in the “Refocused service list” table (Section 1).
   - Set **Lane** (Consulting or Marketing), **Title**, **Slug** (e.g. `website-development-wix-custom`), **Short Description**, **Icon** (e.g. `FaLaptopCode`), and **Order** (1–4 per lane).

3. **Create Service Pages**
   - New document → **Service Page** for each of the 8 services.
   - Set **Lane**, **Slug**, **Title**, **Eyebrow**, **Intro**, **SEO Title**, **Meta Description**, and **Sections** (Who it’s for, Problems we solve, etc.). Use existing `consultingSeoPages.js` / `marketingSeoPages.js` content and merge platform/industry copy as described in Section 2.3.

Optional: a small Node script can create these documents via `@sanity/client` or the Sanity CLI if you prefer not to paste manually; the schema is ready for that.
