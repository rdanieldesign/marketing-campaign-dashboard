# Campaign Orbit – Ad Manager · Master Plan

## Context

The growth marketing team needs a single-pane-of-glass dashboard to monitor and manage ad campaigns across Google, Meta, TikTok, and other platforms. The app must support real-time status toggling with optimistic UI, aggregate analytics, smart filtering, budget alerts, and graceful async error handling. This is a greenfield Vite/React bootstrap — no code exists yet.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Build | Vite 8 |
| Framework | React 19 + TypeScript |
| State Management | Redux Toolkit (RTK) |
| Server State / API | TanStack Query v5 |
| API Mocking | MSW v2 |
| Styling | CSS Modules (fully custom, no UI library) |
| Testing | Vitest + React Testing Library (unit + integration) |
| Linting | ESLint (flat config) + Prettier |

---

## Architecture Decisions

- **Redux** owns UI state: filters (platform, search), per-row saving/error flags, notification queue, and a `simulateError` dev flag.
- **TanStack Query** owns server state: campaign list fetch, optimistic mutation for status toggle with automatic rollback on error.
- **MSW v2** intercepts all API calls at the network level — no test-specific mocking code inside components or hooks. Handlers are shared between Vitest (Node) and the browser dev server.
- **CSS Modules** scoped per component; no global utility classes.
- **Simulate Failure** is controlled by a dev-only UI toggle that flips `uiSlice.simulateError`; MSW reads this flag via a shared in-memory variable.

---

## Phase Execution Protocol

These rules apply to every phase:

1. **Phase doc** — At the start of execution, create `_plans/phase-N-<slug>.md` from the template below. Do **not** create it before execution begins.
2. **Step-by-step** — Complete one task, run its automated verification, update the phase doc checkbox, then continue.
3. **Log divergences** — Record any unplanned changes, new packages, or user decisions in the phase doc's Implementation Log.
4. **Verification gate** — After all automated checks pass, present results and ask for manual confirmation.
5. **Commit prompt** — After verification is confirmed, ask: _"Phase [N] verification passed. Would you like me to commit these changes before moving to Phase [N+1]?"_ Do **not** commit without explicit approval.
6. **No auto-advance** — Do not begin the next phase until the user explicitly says so.
7. **Preserve doc dirs** — Never delete or overwrite `_plans/`, `_notes/`, or `_specs/`. These are user-owned and must survive all scaffolding and file operations.

### Phase Document Template

```markdown
# Phase N — <Title>

## Checklist

- [ ] Task 1
- [ ] Task 2

## Implementation Log

### Divergences
_None yet._

### Unplanned changes
_None yet._

### User decisions
_None yet._
```

---

## Phase 1 — Project Bootstrap ✅

> Phase doc: `_plans/phase-1-bootstrap.md`

- [x] Scaffold Vite + React + TypeScript project (`npm create vite@latest`)
- [x] Configure ESLint (flat config) + Prettier
- [x] Install runtime deps: `@reduxjs/toolkit react-redux @tanstack/react-query`
- [x] Install dev deps: `msw vitest @vitest/coverage-v8 @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom`
- [x] Create `CLAUDE.md` with architecture summary
- [x] Create `.claudeignore`
- [x] Add `node_modules/`, `dist/` to `.gitignore`

**Verification:** `npm run dev` serves blank page ✅; `npm test` exits with 0 tests ✅

---

## Phase 2 — MSW Setup & Mock Data

> Phase doc: created at execution start → `_plans/phase-2-msw.md`

- [ ] Configure MSW v2 server entrypoint for Node (`src/mocks/server.ts`)
- [ ] Configure MSW v2 worker for browser dev server (`src/mocks/browser.ts`)
- [ ] Commit `public/mockServiceWorker.js` to version control
- [ ] Define 12–15 mock campaigns in `src/mocks/data.ts` across Google, Meta, TikTok
- [ ] Implement handlers (`src/mocks/handlers.ts`):
  - `GET /api/campaigns` — returns all campaigns, 300ms delay
  - `PATCH /api/campaigns/:id` — toggles status; returns 500 when `simulateError` in-memory flag is `true`
- [ ] Wire MSW browser worker into `src/main.tsx` (dev only)
- [ ] Wire MSW server into `src/setupTests.ts`

**Verification:** `GET /api/campaigns` returns data in browser devtools Network tab. Ask user to commit.

---

## Phase 3 — Redux Store

> Phase doc: created at execution start → `_plans/phase-3-redux.md`

- [ ] `src/store/filtersSlice.ts` — `platformFilter: string`, `searchQuery: string`
- [ ] `src/store/uiSlice.ts` — `savingIds: string[]`, `errorIds: string[]`, `notifications: Notification[]`, `simulateError: boolean`
- [ ] `src/store/index.ts` — configure RTK store, export typed `useAppDispatch` / `useAppSelector`
- [ ] Unit tests for both slices (`filtersSlice.test.ts`, `uiSlice.test.ts`)

**Verification:** All slice unit tests pass. Ask user to commit.

---

## Phase 4 — TanStack Query Layer

> Phase doc: created at execution start → `_plans/phase-4-query.md`

- [ ] `src/api/types.ts` — `Campaign` interface
- [ ] Configure `QueryClient` (staleTime: 30s, retry: 1)
- [ ] `src/api/campaigns.ts`:
  - `useCampaigns()` — fetches campaigns, applies Redux filter/search selectors client-side
  - `useToggleCampaign()` — PATCH mutation with optimistic update; on error: roll back + dispatch `uiSlice` error action + show notification
- [ ] Unit/integration tests for both hooks using Vitest + MSW

**Verification:** Hook tests pass; optimistic rollback confirmed in test. Ask user to commit.

---

## Phase 5 — UI Components

> Phase doc: created at execution start → `_plans/phase-5-components.md`

Build order: `AtAGlanceBar` → `CampaignRow` → `CampaignList` → `FilterBar` → `NotificationToast` → `App` shell

Each component gets:
- `ComponentName.tsx` + `ComponentName.module.css`
- `ComponentName.test.tsx` (happy path + key edge cases)

**Key behaviours:**

| Component | Key behaviour |
|---|---|
| `AtAGlanceBar` | Derives Total Spend + Avg Conversion Rate from *filtered* list only |
| `CampaignRow` | Budget Warning badge when `totalSpend > dailyBudget`; inline Saving/Error state |
| `CampaignList` | Skeleton loader on initial fetch |
| `FilterBar` | Platform button group + search input → dispatch to `filtersSlice` |
| `NotificationToast` | Auto-dismisses after 4s; shows revert message on toggle error |
| `DevControls` | Dev-only panel with "Simulate API Failure" checkbox → dispatches `uiSlice.setSimulateError` |

**Verification:** `npm test` passes; `npm run dev` shows full working dashboard. Ask user to commit.

---

## Phase 6 — Integration Pass & Cleanup

> Phase doc: created at execution start → `_plans/phase-6-integration.md`

- [ ] Manually verify all 4 PRD success criteria (see below)
- [ ] Remove dead code, console.logs
- [ ] Confirm CSS Module class names don't leak across components
- [ ] `npm run build` — zero TypeScript errors, zero build warnings

**Verification:** Build output in `dist/` with no warnings. Ask user to commit.

---

## PRD Success Criteria Checklist

1. Pause a campaign → Total Spend summary updates automatically
2. Full campaign list renders without performance lag
3. Budget Warning highlights over-budget campaigns correctly after filters are applied
4. Error states are graceful and isolated (rest of dashboard remains functional)

---

## File Map

```
├── CLAUDE.md
├── .claudeignore
├── _plans/
│   ├── master-plan.md           ← this file
│   ├── phase-1-bootstrap.md     ← created during Phase 1 execution
│   ├── phase-2-msw.md           ← created at Phase 2 execution start
│   ├── phase-3-redux.md         ← created at Phase 3 execution start
│   ├── phase-4-query.md         ← created at Phase 4 execution start
│   ├── phase-5-components.md    ← created at Phase 5 execution start
│   └── phase-6-integration.md  ← created at Phase 6 execution start
├── _notes/
├── _specs/
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── setupTests.ts
│   ├── store/
│   │   ├── index.ts
│   │   ├── filtersSlice.ts
│   │   └── uiSlice.ts
│   ├── api/
│   │   ├── types.ts
│   │   └── campaigns.ts
│   ├── mocks/
│   │   ├── data.ts
│   │   ├── handlers.ts
│   │   ├── browser.ts
│   │   └── server.ts
│   └── components/
│       ├── AtAGlanceBar/
│       ├── CampaignList/
│       ├── CampaignRow/
│       ├── FilterBar/
│       ├── NotificationToast/
│       └── DevControls/
└── public/
    └── mockServiceWorker.js    ← committed (MSW requirement)
```
