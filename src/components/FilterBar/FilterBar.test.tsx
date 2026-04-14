import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { FilterBar } from './FilterBar';
import { store } from '../../store';
import { describe, it, expect } from 'vitest';

const renderWithProviders = () =>
  render(
    <Provider store={store}>
      <FilterBar />
    </Provider>
  );

describe('FilterBar', () => {
  it('renders platform buttons', () => {
    renderWithProviders();
    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /meta/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tiktok/i })).toBeInTheDocument();
  });

  it('renders search input', () => {
    renderWithProviders();
    expect(screen.getByPlaceholderText('Campaign name...')).toBeInTheDocument();
  });

  it('activates platform button when clicked', () => {
    renderWithProviders();
    const googleButton = screen.getByRole('button', { name: /^google$/i });
    fireEvent.click(googleButton);
    // The button should have a class containing "active"
    expect(googleButton.className).toContain('active');
  });

  it('types in search input', () => {
    renderWithProviders();
    const input = screen.getByPlaceholderText('Campaign name...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Summer' } });
    expect(input.value).toBe('Summer');
  });
});
