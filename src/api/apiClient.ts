import { Logger } from '@utils/logger';
import { storage } from '@utils/storage';
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';
import type { ApiError, ApiResponse } from 'types/api.types';

import { API_CONFIG } from './api.config';

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    // Request Interceptor
    this.axiosInstance.interceptors.request.use(
      async (
        config: InternalAxiosRequestConfig,
      ): Promise<InternalAxiosRequestConfig> => {
        const token = await storage.getSecureItem('access_token');

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in development
        if (__DEV__) {
          Logger.info('API Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
          });
        }

        return config;
      },
      (error: AxiosError) => {
        Logger.error('Request Interceptor Error:', error);
        return Promise.reject(error);
      },
    );

    // Response Interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        if (__DEV__) {
          Logger.info('API Response:', {
            status: response.status,
            data: response.data,
          });
        }
        return response;
      },
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle token refresh on 401
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = await storage.getSecureItem('refresh_token');
            if (refreshToken) {
              const response = await this.post<{ access_token: string }>(
                '/auth/refresh',
                { refresh_token: refreshToken },
              );

              const newToken = response.data.access_token;
              await storage.setSecureItem('access_token', newToken);

              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }

              return this.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            // Clear tokens and redirect to login
            await storage.removeSecureItem('access_token');
            await storage.removeSecureItem('refresh_token');
            // Emit event for navigation to login
            Logger.error('Token refresh failed:', refreshError);
            return Promise.reject(refreshError);
          }
        }

        // Enhanced error handling
        const apiError: ApiError = {
          message:
            error.response?.data?.message ||
            error.message ||
            'An unexpected error occurred',
          code: error.response?.data?.code || error.code || 'UNKNOWN_ERROR',
          status: error.response?.status,
          errors: error.response?.data?.errors,
        };

        Logger.error('API Error:', apiError);

        return Promise.reject(apiError);
      },
    );
  }

  // Generic request methods
  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(
      url,
      data,
      config,
    );
    return response.data;
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(
      url,
      data,
      config,
    );
    return response.data;
  }

  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.patch<ApiResponse<T>>(
      url,
      data,
      config,
    );
    return response.data;
  }

  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(
      url,
      config,
    );
    return response.data;
  }

  // File upload
  public async uploadFile<T = any>(
    url: string,
    formData: FormData,
    onUploadProgress?: (progressEvent: any) => void,
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(
      url,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      },
    );
    return response.data;
  }

  // Cancel token support
  public getCancelToken() {
    return axios.CancelToken.source();
  }
}

export const apiClient = ApiClient.getInstance();
