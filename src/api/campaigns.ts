import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { Campaign } from './types';
import { useAppDispatch, useAppSelector } from '../store';
import { addSavingId, removeSavingId, addErrorId, removeErrorId, addNotification } from '../store/uiSlice';

// QueryClient configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // 30 seconds
      retry: 1,
    },
  },
});

/**
 * Fetches all campaigns from the API
 */
export function useCampaigns() {
  const dispatch = useAppDispatch();
  const platformFilter = useAppSelector((state) => state.filters.platformFilter);
  const searchQuery = useAppSelector((state) => state.filters.searchQuery);

  const { data, isLoading, error } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const response = await fetch('/api/campaigns');
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }
      return response.json() as Promise<Campaign[]>;
    },
  });

  // Apply filters and search client-side
  const filteredCampaigns = (data || []).filter((campaign) => {
    if (platformFilter && campaign.platform !== platformFilter) {
      return false;
    }
    if (searchQuery && !campaign.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return {
    campaigns: filteredCampaigns,
    allCampaigns: data || [],
    isLoading,
    error,
  };
}

/**
 * Toggles a campaign's status with optimistic update
 */
export function useToggleCampaign() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, newStatus }: { id: string; newStatus: 'active' | 'paused' }) => {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to toggle campaign');
      }
      return response.json() as Promise<Campaign>;
    },
    onMutate: async ({ id, newStatus }) => {
      // Optimistic update
      dispatch(addSavingId(id));

      // Cancel ongoing queries to prevent them from overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ['campaigns'] });

      // Snapshot the previous data
      const previousCampaigns = queryClient.getQueryData<Campaign[]>(['campaigns']);

      // Optimistically update the cache
      if (previousCampaigns) {
        const updated = previousCampaigns.map((camp) =>
          camp.id === id ? { ...camp, status: newStatus } : camp
        );
        queryClient.setQueryData(['campaigns'], updated);
      }

      return { previousCampaigns, id };
    },
    onSuccess: (_, { id }) => {
      dispatch(removeSavingId(id));
      dispatch(addNotification({
        id: `${id}-${Date.now()}`,
        message: 'Campaign status updated',
        type: 'success',
      }));
    },
    onError: (_, { id }, context) => {
      // Rollback the optimistic update
      if (context?.previousCampaigns) {
        queryClient.setQueryData(['campaigns'], context.previousCampaigns);
      }

      dispatch(removeSavingId(id));
      dispatch(addErrorId(id));
      dispatch(addNotification({
        id: `${id}-error-${Date.now()}`,
        message: 'Failed to update campaign. Changes reverted.',
        type: 'error',
      }));
    },
  });
}
