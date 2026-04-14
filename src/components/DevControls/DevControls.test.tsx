import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { DevControls } from './DevControls';
import { store } from '../../store';
import { setSimulateError } from '../../store/uiSlice';
import { describe, it, expect } from 'vitest';

const renderWithProviders = () =>
  render(
    <Provider store={store}>
      <DevControls />
    </Provider>
  );

describe('DevControls', () => {
  it('renders in development mode', () => {
    renderWithProviders();
    expect(screen.getByText('Dev Controls')).toBeInTheDocument();
  });

  it('renders checkbox for API failure simulation', () => {
    renderWithProviders();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('shows warning message text', () => {
    store.dispatch(setSimulateError(true));
    renderWithProviders();
    expect(screen.getByText(/⚠️/)).toBeInTheDocument();
  });
});
