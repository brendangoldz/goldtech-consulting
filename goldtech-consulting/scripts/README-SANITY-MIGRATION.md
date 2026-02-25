# Sanity siteConfig migration scripts

These scripts support migrating content from `src/config/content.js` into Sanity (Direct API approach).

## 1. Extract config to JSON

From `goldtech-consulting`:

```bash
node scripts/extract-siteconfig-to-json.js
```

Writes `siteConfig-consulting.json` and `siteConfig-marketing.json` in the project root. Excludes `services.items` (service cards come from Sanity Service documents). Includes `_type` on projectItems and screenshots for Sanity.

## 2. Create consulting siteConfig (with 110+ project screenshots)

The consulting siteConfig must be created with the **full** payload (including `projectItems` with 110+ screenshots). Use the upload script with a Sanity API token:

1. Create a token at [sanity.io/manage](https://sanity.io/manage) → your project → API → Tokens (Editor or Admin).
2. From `goldtech-consulting`:

```bash
SANITY_API_TOKEN=your_token node scripts/upload-consulting-siteconfig.js
```

This creates a new consulting `siteConfig` document with all hero, about, services intro, projects (with projectItems/screenshots), footer, and contact. Publish it in Sanity Studio to make it live.

## 3. Marketing siteConfig

A Marketing siteConfig draft was created via the API (without `projectItems` to avoid size limits). In Studio you can:

- Add the same project item(s) as consulting (e.g. copy from the consulting document), or
- Run a similar upload script for marketing if you add one that reads `siteConfig-marketing.json` and creates/patches the marketing document.

## 4. Publish drafts

In Sanity Studio, publish:

- The consulting siteConfig (after running the upload script)
- The marketing siteConfig draft

## 5. Service display order (optional)

To set homepage order for the 8 services, in Studio set **Display Order** to 1–4 per lane:

- **Consulting:** 1 Website Development (Wix or Custom), 2 Website Management, 3 Website Automation & Integration, 4 Website Consultation & Review  
- **Marketing:** 1 Website Design (Wix or Custom), 2 Website Content & Copywriting, 3 Brand Development & Design, 4 Digital Presence Services  

API patch for `service` and `siteConfig` may not be available depending on your setup; use Studio for these edits if needed.
