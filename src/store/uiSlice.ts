import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export interface UIState {
  savingIds: { [key: string]: boolean }
  errorIds: { [key: string]: boolean }
  notifications: Notification[]
  simulateError: boolean
}

const initialState: UIState = {
  savingIds: {},
  errorIds: {},
  notifications: [],
  simulateError: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addSavingId(state, action: PayloadAction<string>) {
      state.savingIds[action.payload] = true
    },
    removeSavingId(state, action: PayloadAction<string>) {
      delete state.savingIds[action.payload]
    },
    addErrorId(state, action: PayloadAction<string>) {
      state.errorIds[action.payload] = true
    },
    removeErrorId(state, action: PayloadAction<string>) {
      delete state.errorIds[action.payload]
    },
    clearErrors(state) {
      state.errorIds = {}
    },
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload)
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter((notif) => notif.id !== action.payload)
    },
    clearNotifications(state) {
      state.notifications = []
    },
    setSimulateError(state, action: PayloadAction<boolean>) {
      state.simulateError = action.payload
    },
    reset: () => initialState,
  },
})

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
  reset: resetUI,
} = uiSlice.actions

export default uiSlice.reducer
