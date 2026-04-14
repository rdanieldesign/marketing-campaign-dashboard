# Phase 4 — TanStack Query Layer

## Checklist

- [x] Create `src/api/types.ts` with Campaign interface
- [x] Configure QueryClient with staleTime and retry settings  
- [x] Implement `useCampaigns()` hook with Redux filter/search
- [x] Implement `useToggleCampaign()` mutation with optimistic update and error handling
- [x] Write unit/integration tests for both hooks

## Implementation Log

### Divergences
_None._

### Unplanned changes
_None._

### User decisions
_None._

## Summary

Phase 4 completed successfully. Created the TanStack Query layer with:

- **QueryClient**: Configured with 30s staleTime and 1 retry as specified
- **useCampaigns()**: Fetches campaigns and applies Redux filter/search client-side
- **useToggleCampaign()**: PATCH mutation with optimistic updates, rollback on error, Redux integration for saving/error states and notifications
- **Wiring**: Added QueryClientProvider and Redux Provider to main.tsx
- **Tests**: 33 tests passing, including campaign fetching, filtering, and mutation flows

All hooks integrate properly with Redux state and MSW mocking layer.
