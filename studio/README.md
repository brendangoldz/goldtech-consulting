# GoldTech Sanity Studio

Content backend for GoldTech Consulting. Edit pages and posts in Sanity Studio, then use the client in the React app to fetch content.

## Quick start

```bash
cd studio
npm install
npm run dev
```

Studio runs at **http://localhost:3333**. Log in with your Sanity account when prompted.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Studio locally |
| `npm run build` | Build for deployment |
| `npm run deploy` | Deploy Studio to Sanity hosting |
| `npm run schema` | Deploy schema to Content Lake (needed for MCP) |

## Content types

- **Page** – title, slug, body (rich text)
- **Post** – title, slug, excerpt, body (rich text)

## React app integration

In `goldtech-consulting`, add to `.env.local`:

```
REACT_APP_SANITY_PROJECT_ID=twgmhgf2
REACT_APP_SANITY_DATASET=production
```

Install the client: `npm install @sanity/client`

Use `src/sanity/client.js` to run GROQ queries. Example:

```js
import { sanityClient } from './sanity/client'

const data = await sanityClient.fetch(`*[_type == "post"]{ _id, title, "slug": slug.current }`)
```

## Resume setup

Say **"Continue Sanity setup"** to add more content types, sample content, or wire content into specific pages.
