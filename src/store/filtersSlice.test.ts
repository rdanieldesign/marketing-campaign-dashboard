import { describe, it, expect } from 'vitest';
import filtersReducer, { setPlatformFilter, setSearchQuery, clearFilters, FiltersState } from './filtersSlice';

describe('filtersSlice', () => {
  const initialState: FiltersState = {
    platformFilter: '',
    searchQuery: '',
  };

  it('should return the initial state', () => {
    expect(filtersReducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('setPlatformFilter', () => {
    it('should set platformFilter to the provided value', () => {
      const action = setPlatformFilter('google');
      const result = filtersReducer(initialState, action);
      expect(result.platformFilter).toBe('google');
      expect(result.searchQuery).toBe('');
    });

    it('should replace existing platformFilter', () => {
      const state: FiltersState = { platformFilter: 'meta', searchQuery: 'test' };
      const action = setPlatformFilter('tiktok');
      const result = filtersReducer(state, action);
      expect(result.platformFilter).toBe('tiktok');
      expect(result.searchQuery).toBe('test');
    });

    it('should handle empty string', () => {
      const state: FiltersState = { platformFilter: 'google', searchQuery: 'test' };
      const action = setPlatformFilter('');
      const result = filtersReducer(state, action);
      expect(result.platformFilter).toBe('');
      expect(result.searchQuery).toBe('test');
    });
  });

  describe('setSearchQuery', () => {
    it('should set searchQuery to the provided value', () => {
      const action = setSearchQuery('budget');
      const result = filtersReducer(initialState, action);
      expect(result.searchQuery).toBe('budget');
      expect(result.platformFilter).toBe('');
    });

    it('should replace existing searchQuery', () => {
      const state: FiltersState = { platformFilter: 'google', searchQuery: 'old query' };
      const action = setSearchQuery('new query');
      const result = filtersReducer(state, action);
      expect(result.searchQuery).toBe('new query');
      expect(result.platformFilter).toBe('google');
    });

    it('should handle empty string', () => {
      const state: FiltersState = { platformFilter: 'google', searchQuery: 'test' };
      const action = setSearchQuery('');
      const result = filtersReducer(state, action);
      expect(result.searchQuery).toBe('');
      expect(result.platformFilter).toBe('google');
    });
  });

  describe('clearFilters', () => {
    it('should reset both filters to empty strings', () => {
      const state: FiltersState = {
        platformFilter: 'meta',
        searchQuery: 'campaign name',
      };
      const action = clearFilters();
      const result = filtersReducer(state, action);
      expect(result).toEqual(initialState);
    });

    it('should handle clearing already-empty filters', () => {
      const action = clearFilters();
      const result = filtersReducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });
});
