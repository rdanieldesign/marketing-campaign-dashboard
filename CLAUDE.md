# Campaign Orbit – Ad Manager · Architecture Guide

## Overview

Single-pane-of-glass dashboard for monitoring and managing ad campaigns across Google, Meta, and TikTok. Supports real-time status toggling with optimistic UI, aggregate analytics, smart filtering, budget alerts, and graceful async error handling.

## Tech Stack

| Concern | Choice |
|---|---|
| Build | Vite 8 |
| Framework | React 19 + TypeScript |
| State Management | Redux Toolkit (RTK) |
| Server State / API | TanStack Query v5 |
| API Mocking | MSW v2 |
| Styling | CSS Modules (no UI library) |
| Testing | Vitest + React Testing Library |
| Linting | ESLint (flat config) + Prettier |

## State Architecture

**Redux** owns UI state:
- `filtersSlice` — `platformFilter: string`, `searchQuery: string`
- `uiSlice` — `savingIds: string[]`, `errorIds: string[]`, `notifications: Notification[]`, `simulateError: boolean`

**TanStack Query** owns server state:
- `useCampaigns()` — fetches campaign list, applies Redux filter/search selectors client-side
- `useToggleCampaign()` — PATCH mutation with optimistic update; on error: roll back + dispatch uiSlice error + show notification

## API Mocking (MSW v2)

MSW intercepts all API calls at the network level — no test-specific mocking inside components or hooks.

- Handlers live in `src/mocks/handlers.ts` and are shared between Vitest (Node) and the browser dev server.
- `simulateError` is a shared in-memory variable; the MSW PATCH handler returns 500 when it's `true`.
- Browser worker is wired into `src/main.tsx` (dev only).
- Node server is wired into `src/setupTests.ts`.

## Key Behaviours

| Component | Key behaviour |
|---|---|
| `AtAGlanceBar` | Derives Total Spend + Avg Conversion Rate from *filtered* list only |
| `CampaignRow` | Budget Warning badge when `totalSpend > dailyBudget`; inline Saving/Error state |
| `CampaignList` | Skeleton loader on initial fetch |
| `FilterBar` | Platform button group + search input → dispatch to `filtersSlice` |
| `NotificationToast` | Auto-dismisses after 4s; shows revert message on toggle error |
| `DevControls` | Dev-only panel; "Simulate API Failure" checkbox dispatches `uiSlice.setSimulateError` |

## File Map

```
├── CLAUDE.md               ← this file
├── .claudeignore
├── _plans/
│   └── master-plan.md
├── vite.config.ts          ← also contains Vitest config
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── setupTests.ts       ← imports @testing-library/jest-dom + MSW server
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
    └── mockServiceWorker.js  ← committed (MSW requirement)
```

## QueryClient Config

- `staleTime`: 30s
- `retry`: 1
