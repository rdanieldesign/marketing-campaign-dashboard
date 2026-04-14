import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { AtAGlanceBar } from './AtAGlanceBar';
import { store } from '../../store';
import { queryClient } from '../../api/campaigns';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AtAGlanceBar', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('renders total spend and avg conversion rate', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AtAGlanceBar />
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText('Total Spend')).toBeInTheDocument();
    expect(screen.getByText('Avg Conversion Rate')).toBeInTheDocument();
  });

  it('displays 0 values when no campaigns are filtered', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AtAGlanceBar />
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('0.00%')).toBeInTheDocument();
  });
});
