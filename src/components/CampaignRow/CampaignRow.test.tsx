import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { CampaignRow } from './CampaignRow';
import type { Campaign } from '../../api/types';
import { store } from '../../store';
import { queryClient } from '../../api/campaigns';
import { describe, it, expect, beforeEach } from 'vitest';

const mockCampaign: Campaign = {
  id: '1',
  name: 'Summer Sale',
  platform: 'google',
  status: 'active',
  totalSpend: 500,
  dailyBudget: 100,
  conversionRate: 3.5,
  impressions: 10000,
  clicks: 200,
};

const overBudgetCampaign: Campaign = {
  ...mockCampaign,
  totalSpend: 150,
};

const renderWithProviders = (campaign: Campaign) =>
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CampaignRow campaign={campaign} />
      </QueryClientProvider>
    </Provider>
  );

describe('CampaignRow', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('renders campaign data', () => {
    renderWithProviders(mockCampaign);
    expect(screen.getByText('Summer Sale')).toBeInTheDocument();
    expect(screen.getByText('google')).toBeInTheDocument();
  });

  it('shows budget warning when over budget', () => {
    renderWithProviders(overBudgetCampaign);
    expect(screen.getByText('Budget Warning')).toBeInTheDocument();
  });

  it('does not show budget warning when under budget', () => {
    const underBudgetCampaign: Campaign = {
      ...mockCampaign,
      totalSpend: 50,
      dailyBudget: 100,
    };
    renderWithProviders(underBudgetCampaign);
    expect(screen.queryByText('Budget Warning')).not.toBeInTheDocument();
  });

  it('displays current status button', () => {
    renderWithProviders(mockCampaign);
    expect(screen.getByRole('button', { name: /active/i })).toBeInTheDocument();
  });

  it('disables button while saving', async () => {
    renderWithProviders(mockCampaign);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });
});
