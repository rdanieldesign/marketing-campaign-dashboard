import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface UIState {
  savingIds: string[];
  errorIds: string[];
  notifications: Notification[];
  simulateError: boolean;
}

const initialState: UIState = {
  savingIds: [],
  errorIds: [],
  notifications: [],
  simulateError: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addSavingId(state, action: PayloadAction<string>) {
      if (!state.savingIds.includes(action.payload)) {
        state.savingIds.push(action.payload);
      }
    },
    removeSavingId(state, action: PayloadAction<string>) {
      state.savingIds = state.savingIds.filter((id) => id !== action.payload);
    },
    addErrorId(state, action: PayloadAction<string>) {
      if (!state.errorIds.includes(action.payload)) {
        state.errorIds.push(action.payload);
      }
    },
    removeErrorId(state, action: PayloadAction<string>) {
      state.errorIds = state.errorIds.filter((id) => id !== action.payload);
    },
    clearErrors(state) {
      state.errorIds = [];
    },
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload);
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== action.payload
      );
    },
    clearNotifications(state) {
      state.notifications = [];
    },
    setSimulateError(state, action: PayloadAction<boolean>) {
      state.simulateError = action.payload;
    },
  },
});

export const {
  addSavingId,
  removeSavingId,
  addErrorId,
  removeErrorId,
  clearErrors,
  addNotification,
  removeNotification,
  clearNotifications,
  setSimulateError,
} = uiSlice.actions;

export default uiSlice.reducer;
