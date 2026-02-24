# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

GoldTech Consulting is a React 18 website (Create React App) inside `goldtech-consulting/`. There is no monorepo — this single directory contains the entire frontend. A standalone AWS Lambda contact form handler lives at `ContactForm.mjs` in the repo root (not needed for local dev).

### Running the application

All commands run from `goldtech-consulting/`.

| Task | Command |
|------|---------|
| Dev server (port 3000) | `npm start` |
| Production build | `npm run build` |
| Lint (auto-fix) | `npm run lint` |
| Lint (check only) | `npm run lint:check` |
| Tests | `npm test` |
| Tests with coverage | `npm run test:coverage` |
| Format | `npm run format` |
| Tailwind build | `npm run build:tailwind` |

See `package.json` `scripts` for the full list.

### Known pre-existing issues

- **Lint**: ~49 errors and ~31 warnings exist in the codebase (mostly `testing-library/no-node-access` in test files and `no-unused-vars` warnings). These are pre-existing and not introduced by environment setup.
- **Tests**: Several test suites fail due to outdated snapshots (Footer year change, About title change, etc.) and component import mismatches. Some tests for `security.test.js` fail with react-router-dom v7 module resolution under CRA's Jest config. Run `npm test -- -u` to update snapshots if component changes are intentional.
- **Build**: Compiles successfully with warnings only (unused variables). Gzipped output is ~170 KB.

### Gotchas

- The contact form submission uses a simulated `setTimeout` mock in local dev — no real API calls are made. The AWS Lambda backend (`ContactForm.mjs`) is only invoked in production via API Gateway.
- No `.env` file is committed. The app works without environment variables for local development; defaults are baked in.
- The Vanta.js 3D background on the landing/hero sections is GPU-intensive. In headless or low-resource environments (like CI), page scrolling may cause Chrome tab crashes. Use hash navigation (`#contact`, `#about`, etc.) as a workaround for manual browser testing.
- The `jest.config.js` uses `moduleNameMapping` (typo of `moduleNameMapper`), but CRA's built-in Jest config takes precedence so this file is largely ignored during `npm test`.
