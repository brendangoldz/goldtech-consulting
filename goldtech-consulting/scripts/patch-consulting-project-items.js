/**
 * Patches the consulting siteConfig draft with projectItems from siteConfig-consulting.json.
 * Run from goldtech-consulting: node scripts/patch-consulting-project-items.js
 * Requires: SANITY_API_TOKEN in env (create at sanity.io/manage).
 */
const fs = require('fs');
const path = require('path');

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID || 'twgmhgf2';
const dataset = process.env.REACT_APP_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;
const draftId = process.env.CONSULTING_DRAFT_ID || 'drafts.8dc82a74-4d38-4a40-bcc0-f4a952b92543';

if (!token) {
  console.error('Set SANITY_API_TOKEN in env (from sanity.io/manage → API → Tokens).');
  process.exit(1);
}

const jsonPath = path.join(__dirname, '..', 'siteConfig-consulting.json');
const consulting = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const projectItems = consulting.projectItems || [];

const mutations = [
  {
    patch: {
      id: draftId,
      set: { projectItems },
    },
  },
];

const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ mutations }),
})
  .then((r) => r.json())
  .then((result) => {
    if (result.results?.[0]?.id) {
      console.log('Patched', draftId, 'with', projectItems.length, 'project item(s).');
      console.log('Publish in Studio to make live.');
    } else {
      console.error('Patch failed:', JSON.stringify(result, null, 2));
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
