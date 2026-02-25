/**
 * Creates a consulting siteConfig document with full content from siteConfig-consulting.json
 * (including all projectItems/screenshots). Run after extract-siteconfig-to-json.js.
 *
 * Run from goldtech-consulting: node scripts/upload-consulting-siteconfig.js
 * Requires: SANITY_API_TOKEN in env (create at sanity.io/manage → API → Tokens).
 */
const fs = require('fs');
const path = require('path');

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID || 'twgmhgf2';
const dataset = process.env.REACT_APP_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('Set SANITY_API_TOKEN in env (from sanity.io/manage → API → Tokens).');
  process.exit(1);
}

const jsonPath = path.join(__dirname, '..', 'siteConfig-consulting.json');
const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const doc = {
  _type: 'siteConfig',
  ...content,
};

const mutations = [{ create: doc }];
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
      console.log('Created consulting siteConfig:', result.results[0].id);
      console.log('Publish in Studio to make live.');
    } else {
      console.error('Create failed:', JSON.stringify(result, null, 2));
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
