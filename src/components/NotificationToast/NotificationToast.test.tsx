import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NotificationToast } from './NotificationToast';
import { store } from '../../store';
import { addNotification, clearNotifications } from '../../store/uiSlice';
import { describe, it, expect, beforeEach } from 'vitest';

const renderWithProviders = () =>
  render(
    <Provider store={store}>
      <NotificationToast />
    </Provider>
  );

describe('NotificationToast', () => {
  beforeEach(() => {
    store.dispatch(clearNotifications());
  });

  it('does not render when no notifications', () => {
    renderWithProviders();
    expect(screen.queryByText(/Campaign status updated/)).not.toBeInTheDocument();
  });

  it('renders notification message', () => {
    store.dispatch(addNotification({
      id: '1',
      message: 'Campaign status updated',
      type: 'success',
    }));

    renderWithProviders();
    expect(screen.getByText('Campaign status updated')).toBeInTheDocument();
  });
});
