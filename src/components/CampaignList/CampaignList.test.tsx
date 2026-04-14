import { render } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { CampaignList } from './CampaignList';
import { store } from '../../store';
import { queryClient } from '../../api/campaigns';
import { describe, it, expect, beforeEach } from 'vitest';

const renderWithProviders = () =>
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CampaignList />
      </QueryClientProvider>
    </Provider>
  );

describe('CampaignList', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('renders list container', () => {
    const { container } = renderWithProviders();
    expect(container.querySelector('[class*="list"]')).toBeInTheDocument();
  });

  it('renders loading skeleton initially', () => {
    const { container } = renderWithProviders();
    expect(container.querySelector('[class*="skeleton"]')).toBeInTheDocument();
  });
});
