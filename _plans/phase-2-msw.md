# Phase 2 — MSW Setup & Mock Data

## Checklist

- [x] Configure MSW v2 server entrypoint for Node (`src/mocks/server.ts`)
- [x] Configure MSW v2 worker for browser dev server (`src/mocks/browser.ts`)
- [x] Commit `public/mockServiceWorker.js` to version control
- [x] Define 12–15 mock campaigns in `src/mocks/data.ts` across Google, Meta, TikTok
- [x] Implement handlers (`src/mocks/handlers.ts`):
  - `GET /api/campaigns` — returns all campaigns, 300ms delay
  - `PATCH /api/campaigns/:id` — toggles status; returns 500 when `simulateError` in-memory flag is `true`
- [x] Wire MSW browser worker into `src/main.tsx` (dev only)
- [x] Wire MSW server into `src/setupTests.ts`

## Implementation Log

### Divergences
Updated `vite.config.ts` to import `defineConfig` from `vitest/config` instead of `vite` to properly support the `test` configuration object.

### Unplanned changes
Added `"vite/client"` to `types` in `tsconfig.node.json` for proper type support.

### User decisions
_None yet._

## Verification Results

✅ `npm test` exits with code 0 (no errors, 0 tests as expected)  
✅ `npm run build` completes successfully with no TypeScript errors or warnings  
✅ MSW mock handlers created with GET /api/campaigns (300ms delay) and PATCH /api/campaigns/:id  
✅ Mock campaign data created (14 campaigns across Google, Meta, TikTok)  
✅ Browser worker wired into `src/main.tsx` (dev only)  
✅ Server wired into `src/setupTests.ts`  
✅ `public/mockServiceWorker.js` generated and ready to commit
