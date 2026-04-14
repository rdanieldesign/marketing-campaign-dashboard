import { describe, it, expect } from 'vitest';
import uiReducer, {
  addSavingId,
  removeSavingId,
  addErrorId,
  removeErrorId,
  clearErrors,
  addNotification,
  removeNotification,
  clearNotifications,
  setSimulateError,
} from './uiSlice';
import type { UIState, Notification } from './uiSlice';

describe('uiSlice', () => {
  const initialState: UIState = {
    savingIds: [],
    errorIds: [],
    notifications: [],
    simulateError: false,
  };

  it('should return the initial state', () => {
    expect(uiReducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('savingIds management', () => {
    it('should add a saving ID', () => {
      const action = addSavingId('campaign-1');
      const result = uiReducer(initialState, action);
      expect(result.savingIds).toContain('campaign-1');
      expect(result.savingIds.length).toBe(1);
    });

    it('should not add duplicate saving IDs', () => {
      let state = uiReducer(initialState, addSavingId('campaign-1'));
      state = uiReducer(state, addSavingId('campaign-1'));
      expect(state.savingIds.length).toBe(1);
      expect(state.savingIds).toEqual(['campaign-1']);
    });

    it('should add multiple different saving IDs', () => {
      let state = uiReducer(initialState, addSavingId('campaign-1'));
      state = uiReducer(state, addSavingId('campaign-2'));
      expect(state.savingIds).toEqual(['campaign-1', 'campaign-2']);
    });

    it('should remove a saving ID', () => {
      const state: UIState = { ...initialState, savingIds: ['campaign-1', 'campaign-2'] };
      const action = removeSavingId('campaign-1');
      const result = uiReducer(state, action);
      expect(result.savingIds).toEqual(['campaign-2']);
    });

    it('should handle removing non-existent saving ID', () => {
      const state: UIState = { ...initialState, savingIds: ['campaign-1'] };
      const action = removeSavingId('campaign-2');
      const result = uiReducer(state, action);
      expect(result.savingIds).toEqual(['campaign-1']);
    });
  });

  describe('errorIds management', () => {
    it('should add an error ID', () => {
      const action = addErrorId('campaign-1');
      const result = uiReducer(initialState, action);
      expect(result.errorIds).toContain('campaign-1');
      expect(result.errorIds.length).toBe(1);
    });

    it('should not add duplicate error IDs', () => {
      let state = uiReducer(initialState, addErrorId('campaign-1'));
      state = uiReducer(state, addErrorId('campaign-1'));
      expect(state.errorIds.length).toBe(1);
      expect(state.errorIds).toEqual(['campaign-1']);
    });

    it('should remove an error ID', () => {
      const state: UIState = { ...initialState, errorIds: ['campaign-1', 'campaign-2'] };
      const action = removeErrorId('campaign-1');
      const result = uiReducer(state, action);
      expect(result.errorIds).toEqual(['campaign-2']);
    });

    it('should clear all error IDs', () => {
      const state: UIState = { ...initialState, errorIds: ['campaign-1', 'campaign-2'] };
      const action = clearErrors();
      const result = uiReducer(state, action);
      expect(result.errorIds).toEqual([]);
    });
  });

  describe('notifications management', () => {
    it('should add a notification', () => {
      const notification: Notification = {
        id: 'notif-1',
        message: 'Campaign paused',
        type: 'success',
      };
      const action = addNotification(notification);
      const result = uiReducer(initialState, action);
      expect(result.notifications).toContain(notification);
      expect(result.notifications.length).toBe(1);
    });

    it('should add multiple notifications', () => {
      const notif1: Notification = { id: 'notif-1', message: 'Success', type: 'success' };
      const notif2: Notification = { id: 'notif-2', message: 'Error', type: 'error' };
      let state = uiReducer(initialState, addNotification(notif1));
      state = uiReducer(state, addNotification(notif2));
      expect(state.notifications).toEqual([notif1, notif2]);
    });

    it('should remove a notification by ID', () => {
      const notif1: Notification = { id: 'notif-1', message: 'Success', type: 'success' };
      const notif2: Notification = { id: 'notif-2', message: 'Error', type: 'error' };
      const state: UIState = { ...initialState, notifications: [notif1, notif2] };
      const action = removeNotification('notif-1');
      const result = uiReducer(state, action);
      expect(result.notifications).toEqual([notif2]);
    });

    it('should handle removing non-existent notification', () => {
      const notif: Notification = { id: 'notif-1', message: 'Success', type: 'success' };
      const state: UIState = { ...initialState, notifications: [notif] };
      const action = removeNotification('notif-2');
      const result = uiReducer(state, action);
      expect(result.notifications).toEqual([notif]);
    });

    it('should clear all notifications', () => {
      const notif1: Notification = { id: 'notif-1', message: 'Success', type: 'success' };
      const notif2: Notification = { id: 'notif-2', message: 'Error', type: 'error' };
      const state: UIState = { ...initialState, notifications: [notif1, notif2] };
      const action = clearNotifications();
      const result = uiReducer(state, action);
      expect(result.notifications).toEqual([]);
    });
  });

  describe('simulateError flag', () => {
    it('should set simulateError to true', () => {
      const action = setSimulateError(true);
      const result = uiReducer(initialState, action);
      expect(result.simulateError).toBe(true);
    });

    it('should set simulateError to false', () => {
      const state: UIState = { ...initialState, simulateError: true };
      const action = setSimulateError(false);
      const result = uiReducer(state, action);
      expect(result.simulateError).toBe(false);
    });

    it('should toggle simulateError state', () => {
      let state = uiReducer(initialState, setSimulateError(true));
      expect(state.simulateError).toBe(true);
      state = uiReducer(state, setSimulateError(false));
      expect(state.simulateError).toBe(false);
    });
  });
});
