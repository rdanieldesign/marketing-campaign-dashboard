# Phase 1 — Project Bootstrap

## Checklist

- [x] Scaffold Vite + React + TypeScript project (`npm create vite@latest`)
- [x] Configure ESLint (flat config) + Prettier
- [x] Install runtime deps: `@reduxjs/toolkit react-redux @tanstack/react-query`
- [x] Install dev deps: `msw vitest @vitest/coverage-v8 @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom`
- [x] Create `CLAUDE.md` with architecture summary
- [x] Create `.claudeignore`
- [x] Add `node_modules/`, `dist/` to `.gitignore`

## Verification

- `npm run dev` → HTTP 200 ✅
- `npm test` → exit 0 (no tests, `passWithNoTests: true`) ✅

## Implementation Log

### Divergences

- Used `--overwrite` flag with `npm create vite@latest` to scaffold into a non-empty directory. **Unintended side effect:** this deleted `_plans/`, `_notes/`, and `_specs/`. User restored them manually. Going forward, scaffolding must never touch these directories.
- React version resolved to **19** (not 18 as originally specified in master plan). Updated master plan tech stack accordingly.

### Unplanned changes

- Added `prettier` + `eslint-config-prettier` (not listed in phase checklist but implied by "Configure Prettier").
- Added `passWithNoTests: true` to Vitest config so `npm test` exits 0 when no test files exist yet.
- Added `test:watch` and `test:coverage` npm scripts alongside the required `test` script.
- Added `coverage/` to `.gitignore` and `.claudeignore`.

### User decisions

- Commit not offered at end of phase (missed — corrected in master plan going forward).
