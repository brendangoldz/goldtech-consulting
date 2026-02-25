/**
 * Copies projectItems from the consulting siteConfig to the marketing siteConfig in Sanity.
 * Run from goldtech-consulting: node scripts/copy-project-items-to-marketing.js
 * Requires: SANITY_API_TOKEN in env (create at sanity.io/manage → API → Tokens).
 */
const projectId = process.env.REACT_APP_SANITY_PROJECT_ID || 'twgmhgf2';
const dataset = process.env.REACT_APP_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

const MARKETING_CONFIG_ID = '44481518-4ad6-4505-9cbb-5de907abfed1';
// Request full projectItems with _type so patch validates (array objects need _type).
const CONSULTING_PROJECT_ITEMS_QUERY = `*[_type == "siteConfig" && variant == "consulting"][0] { "projectItems": projectItems[] { _type, id, title, summary, "screenshots": screenshots[] { _type, src, alt, websiteUrl } } }`;

if (!token) {
  console.error('Set SANITY_API_TOKEN in env (from sanity.io/manage → API → Tokens).');
  process.exit(1);
}

async function main() {
  const queryUrl = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent(CONSULTING_PROJECT_ITEMS_QUERY)}`;
  const res = await fetch(queryUrl);
  const data = await res.json();
  const projectItems = data.result?.projectItems ?? data.result ?? [];

  if (!Array.isArray(projectItems) || projectItems.length === 0) {
    console.error('No projectItems found on consulting siteConfig.');
    process.exit(1);
  }

  const mutateUrl = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;
  const mutateRes = await fetch(mutateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mutations: [{ patch: { id: MARKETING_CONFIG_ID, set: { projectItems } } }],
    }),
  });
  const result = await mutateRes.json();

  if (result.results?.[0]?.id) {
    console.log('Patched marketing siteConfig with', projectItems.length, 'project item(s).');
    console.log('Publish the draft in Studio to make it live.');
  } else {
    console.error('Patch failed:', JSON.stringify(result, null, 2));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
