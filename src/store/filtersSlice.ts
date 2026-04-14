import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  platformFilter: string;
  searchQuery: string;
}

const initialState: FiltersState = {
  platformFilter: '',
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPlatformFilter(state, action: PayloadAction<string>) {
      state.platformFilter = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    clearFilters(state) {
      state.platformFilter = '';
      state.searchQuery = '';
    },
  },
});

export const { setPlatformFilter, setSearchQuery, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
