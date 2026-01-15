import type { LoginDTO, RegisterDTO } from '@dto/user.dto';
import { authService } from '@services/auth.service';
import {
  clearError,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from '@store/slices/auth.slice';
import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from './useRedux';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector(
    state => state.auth,
  );

  // login user
  const login = useCallback(
    async (credentials: LoginDTO) => {
      try {
        dispatch(loginStart());
        const userData = await authService.login(credentials);
        dispatch(loginSuccess(userData));
        return { success: true };
      } catch (err: any) {
        const errorMessage = err?.message || 'Login failed';
        dispatch(loginFailure(errorMessage));
        return { success: false, error: errorMessage };
      }
    },
    [dispatch],
  );

  // register user
  const register = useCallback(
    async (data: RegisterDTO) => {
      try {
        dispatch(registerStart());
        const userData = await authService.register(data);
        dispatch(registerSuccess(userData));
        return { success: true };
      } catch (err: any) {
        const errorMessage = err?.message || 'Registration failed';
        dispatch(registerFailure(errorMessage));
        return { success: false, error: errorMessage };
      }
    },
    [dispatch],
  );

  // logout user
  const logout = useCallback(async () => {
    try {
      dispatch(logoutStart());
      await authService.logout();
      dispatch(logoutSuccess());
      return { success: true };
    } catch (err: any) {
      const errorMessage = err?.message || 'Logout failed';
      dispatch(logoutFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  }, [dispatch]);

  // forgot password
  const forgotPassword = useCallback(async (email: string) => {
    try {
      const message = await authService.forgotPassword(email);
      return { success: true, message };
    } catch (err: any) {
      const errorMessage = err?.message || 'Forgot password request failed';
      return { success: false, error: errorMessage };
    }
  }, []);

  // reset password
  const resetPassword = useCallback(
    async (token: string, newPassword: string) => {
      try {
        const message = await authService.resetPassword(token, newPassword);
        return { success: true, message };
      } catch (err: any) {
        const errorMessage = err?.message || 'Reset password failed';
        return { success: false, error: errorMessage };
      }
    },
    [],
  );

  // clear auth error
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    clearAuthError,
  };
};
