import type { UserDTO } from '@dto/user.dto';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: UserDTO | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isGuest: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //login
    loginStart: state => {
      state.isLoading = true;
      state.error = null;
    },

    loginSuccess: (state, action: PayloadAction<UserDTO>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isGuest = false;
      state.error = null;
    },

    // login as guest
    loginAsGuest: state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isGuest = true;
      state.user = null;
      state.error = null;
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    // register
    registerStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<UserDTO>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },

    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // logout
    logoutStart: state => {
      state.isLoading = true;
    },

    logoutSuccess: state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isGuest = false;
      state.user = null;
      state.error = null;
    },

    logoutFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // update user
    updateUser: (state, action: PayloadAction<Partial<UserDTO>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // clear error
    clearError: state => {
      state.error = null;
    },

    // restore session
    restoreSession: (state, action: PayloadAction<UserDTO>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  loginAsGuest,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  updateUser,
  clearError,
  restoreSession,
} = authSlice.actions;

export default authSlice.reducer;
