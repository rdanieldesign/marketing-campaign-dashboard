import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { useCampaigns, useToggleCampaign, queryClient } from './campaigns'
import { store } from '../store'
import { mockCampaigns } from '../mocks/data'
import { resetUI } from '../store/uiSlice'
import { resetFilters } from '../store/filtersSlice'

// Helper to wrap hooks with providers
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </Provider>
)

describe('useCampaigns', () => {
  beforeEach(() => {
    queryClient.clear()
    store.dispatch(resetUI())
    store.dispatch(resetFilters())
  })

  it('fetches all campaigns on mount', async () => {
    const { result } = renderHook(() => useCampaigns(), { wrapper })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.campaigns).toHaveLength(mockCampaigns.length)
    expect(result.current.allCampaigns).toHaveLength(mockCampaigns.length)
  })

  it('applies platform filter', async () => {
    const { result } = renderHook(() => useCampaigns(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Set platform filter to 'google'
    act(() => {
      store.dispatch({ type: 'filters/setPlatformFilter', payload: 'google' })
    })

    await waitFor(() => {
      const googleCampaigns = result.current.campaigns
      expect(googleCampaigns.every((c) => c.platform === 'google')).toBe(true)
      expect(googleCampaigns.length).toBeGreaterThan(0)
      expect(googleCampaigns.length).toBeLessThan(mockCampaigns.length)
    })
  })

  it('applies search query filter', async () => {
    const { result } = renderHook(() => useCampaigns(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Set search query
    act(() => {
      store.dispatch({ type: 'filters/setSearchQuery', payload: 'Summer' })
    })

    await waitFor(() => {
      const filtered = result.current.campaigns
      expect(filtered.every((c) => c.name.toLowerCase().includes('summer'))).toBe(true)
    })
  })

  it('applies both platform and search filters', async () => {
    const { result } = renderHook(() => useCampaigns(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    act(() => {
      store.dispatch({ type: 'filters/setPlatformFilter', payload: 'meta' })
      store.dispatch({ type: 'filters/setSearchQuery', payload: 'Video' })
    })

    await waitFor(() => {
      const filtered = result.current.campaigns
      expect(filtered.every((c) => c.platform === 'meta')).toBe(true)
      expect(filtered.every((c) => c.name.toLowerCase().includes('video'))).toBe(true)
    })
  })
})

describe('useToggleCampaign', () => {
  beforeEach(() => {
    queryClient.clear()
    store.dispatch(resetUI())
    store.dispatch(resetFilters())
  })

  it('toggles campaign status with optimistic update and persists', async () => {
    // First fetch campaigns
    const { result: campaignsResult } = renderHook(() => useCampaigns(), { wrapper })

    await waitFor(() => {
      expect(campaignsResult.current.isLoading).toBe(false)
    })

    const targetCampaign = campaignsResult.current.allCampaigns[0]
    const newStatus = targetCampaign.status === 'active' ? 'paused' : 'active'

    // Then toggle
    const { result: toggleResult } = renderHook(() => useToggleCampaign(), { wrapper })

    act(() => {
      toggleResult.current.mutate({
        id: targetCampaign.id,
        newStatus,
      })
    })

    // Check optimistic update happened immediately
    await waitFor(() => {
      const updated = queryClient.getQueryData<any[]>(['campaigns'])
      const campaign = updated?.find((c) => c.id === targetCampaign.id)
      expect(campaign?.status).toBe(newStatus)
    })

    // Wait for mutation to complete
    await waitFor(() => {
      expect(toggleResult.current.isPending).toBe(false)
    })

    // Verify the status is persisted after mutation completes
    const finalData = queryClient.getQueryData<any[]>(['campaigns'])
    const finalCampaign = finalData?.find((c) => c.id === targetCampaign.id)
    expect(finalCampaign?.status).toBe(newStatus)

    expect(toggleResult.current.isSuccess).toBe(true)
  })

  it('marks campaign as saving during mutation', async () => {
    // First fetch campaigns
    const { result: campaignsResult } = renderHook(() => useCampaigns(), { wrapper })

    await waitFor(() => {
      expect(campaignsResult.current.isLoading).toBe(false)
    })

    const targetCampaign = campaignsResult.current.allCampaigns[0]

    // Toggle
    const { result: toggleResult } = renderHook(() => useToggleCampaign(), { wrapper })

    act(() => {
      toggleResult.current.mutate({
        id: targetCampaign.id,
        newStatus: 'paused',
      })
    })

    // Check that saving ID was added during mutation
    const stateAfterMutate = store.getState()
    expect(stateAfterMutate.ui.savingIds[targetCampaign.id]).toBe(true)

    // Wait for mutation to complete
    await waitFor(() => {
      expect(toggleResult.current.isPending).toBe(false)
    })
  })

  it('removes error when campaign status update succeeds after previous failure', async () => {
    // First fetch campaigns
    const { result: campaignsResult } = renderHook(() => useCampaigns(), { wrapper })

    await waitFor(() => {
      expect(campaignsResult.current.isLoading).toBe(false)
    })

    const targetCampaign = campaignsResult.current.allCampaigns[0]

    // Simulate a previous error by manually adding the campaign ID to errorIds
    act(() => {
      store.dispatch({ type: 'ui/addErrorId', payload: targetCampaign.id })
    })

    const stateWithError = store.getState()
    expect(stateWithError.ui.errorIds[targetCampaign.id]).toBe(true)

    // Now toggle the campaign successfully
    const { result: toggleResult } = renderHook(() => useToggleCampaign(), { wrapper })

    act(() => {
      toggleResult.current.mutate({
        id: targetCampaign.id,
        newStatus: targetCampaign.status === 'active' ? 'paused' : 'active',
      })
    })

    // Wait for mutation to complete and success handler to be called
    await waitFor(() => {
      expect(toggleResult.current.isSuccess).toBe(true)
    })

    // Verify error ID was removed from state after successful mutation
    const stateAfterSuccess = store.getState()
    expect(stateAfterSuccess.ui.errorIds[targetCampaign.id]).toBeUndefined()
  })
})
