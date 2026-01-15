import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  isLoading: boolean;
  isNetworkConnected: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    enabled: boolean;
    badge: number;
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
  },
};

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
    toggleNotifications: state => {
      state.notifications.enabled = !state.notifications.enabled;
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
  toggleNotifications,
} = appSlice.actions;

export default appSlice.reducer;
