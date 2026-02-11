import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  AppNotification,
  NotificationPermissionStatus,
} from '../../types/notification.types';

interface AppState {
  isLoading: boolean;
  isNetworkConnected: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    enabled: boolean;
    badge: number;
    permissionStatus: NotificationPermissionStatus;
    items: AppNotification[];
  };
}

const initialState: AppState = {
  isLoading: false,
  isNetworkConnected: true,
  theme: 'system',
  language: 'en',
  notifications: {
    enabled: true,
    badge: 0,
    permissionStatus: 'unknown',
    items: [],
  },
};

const getUnreadCount = (notifications: AppNotification[]) =>
  notifications.filter(notification => !notification.read).length;

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setNetworkStatus: (state, action: PayloadAction<boolean>) => {
      state.isNetworkConnected = action.payload;
    },

    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },

    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },

    setNotificationBadge: (state, action: PayloadAction<number>) => {
      state.notifications.badge = action.payload;
    },
    incrementNotificationBadge: state => {
      state.notifications.badge += 1;
    },
    clearNotificationBadge: state => {
      state.notifications.badge = 0;
    },
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.notifications.enabled = action.payload;
      state.notifications.badge = action.payload
        ? getUnreadCount(state.notifications.items)
        : 0;
    },
    toggleNotifications: state => {
      state.notifications.enabled = !state.notifications.enabled;
      state.notifications.badge = state.notifications.enabled
        ? getUnreadCount(state.notifications.items)
        : 0;
    },
    setNotificationPermissionStatus: (
      state,
      action: PayloadAction<NotificationPermissionStatus>,
    ) => {
      state.notifications.permissionStatus = action.payload;
    },
    addNotification: (state, action: PayloadAction<AppNotification>) => {
      state.notifications.items.unshift(action.payload);
      state.notifications.badge = state.notifications.enabled
        ? getUnreadCount(state.notifications.items)
        : 0;
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.items.find(
        item => item.id === action.payload,
      );

      if (notification) {
        notification.read = true;
      }

      state.notifications.badge = state.notifications.enabled
        ? getUnreadCount(state.notifications.items)
        : 0;
    },
    markAllNotificationsAsRead: state => {
      state.notifications.items = state.notifications.items.map(
        notification => ({
          ...notification,
          read: true,
        }),
      );
      state.notifications.badge = 0;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications.items = state.notifications.items.filter(
        notification => notification.id !== action.payload,
      );
      state.notifications.badge = state.notifications.enabled
        ? getUnreadCount(state.notifications.items)
        : 0;
    },
    clearAllNotifications: state => {
      state.notifications.items = [];
      state.notifications.badge = 0;
    },
  },
});

export const {
  setLoading,
  setNetworkStatus,
  setTheme,
  setLanguage,
  setNotificationBadge,
  incrementNotificationBadge,
  clearNotificationBadge,
  setNotificationsEnabled,
  toggleNotifications,
  setNotificationPermissionStatus,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearAllNotifications,
} = appSlice.actions;

export default appSlice.reducer;
