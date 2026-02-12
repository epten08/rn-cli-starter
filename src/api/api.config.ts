import Config from 'react-native-config';

const DEFAULT_API_BASE_URL = 'http://localhost:3000/api/v1';

const normalizeBaseUrl = (url?: string): string => {
  const normalized = (url || DEFAULT_API_BASE_URL).replace(/\/+$/, '');

  if (/\/api\/v\d+$/i.test(normalized)) {
    return normalized;
  }

  const versionOnlyPathMatch = normalized.match(/\/v(\d+)$/i);
  if (versionOnlyPathMatch) {
    return normalized.replace(/\/v(\d+)$/i, '/api/v$1');
  }

  return `${normalized}/api/v1`;
};

export const API_CONFIG = {
  BASE_URL: normalizeBaseUrl(Config.API_BASE_URL),
  TIMEOUT: Number(Config.API_TIMEOUT) || 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

console.log('API Base URL:', API_CONFIG.BASE_URL);

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    LOGOUT: '/auth/logout',
  },
  // User
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    DELETE_ACCOUNT: '/user/delete-account',
  },
} as const;
