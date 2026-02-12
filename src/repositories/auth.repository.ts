import { API_ENDPOINTS } from '@api/api.config';
import { apiClient } from '@api/apiClient';
import type { LoginDTO, RegisterDTO, LoginResponseDTO } from '@dto/user.dto';
import DeviceInfo from 'react-native-device-info';

const UNSUPPORTED_ENDPOINT_ERROR =
  'This API endpoint is not available on the current Express server.';

export class AuthRepository {
  private async withDeviceId<T extends object>(
    payload: T,
  ): Promise<T & { deviceId?: string }> {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      return { ...payload, deviceId };
    } catch {
      return payload;
    }
  }

  // user login
  async login(credentials: LoginDTO): Promise<LoginResponseDTO> {
    const payload = await this.withDeviceId(credentials);
    const response = await apiClient.post<LoginResponseDTO>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload,
    );
    return response.data;
  }

  // user registration
  async register(data: RegisterDTO): Promise<LoginResponseDTO> {
    const payload = await this.withDeviceId(data);
    const response = await apiClient.post<LoginResponseDTO>(
      API_ENDPOINTS.AUTH.REGISTER,
      payload,
    );
    return response.data;
  }

  // logout user
  async logout(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  // refresh auth tokens
  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    const response = await apiClient.post<{ access_token: string }>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refresh_token: refreshToken },
    );
    return response.data;
  }

  // request password reset
  async forgotPassword(_email: string): Promise<{ message: string }> {
    throw new Error(
      `${UNSUPPORTED_ENDPOINT_ERROR} Missing route: POST ${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`,
    );
  }

  // reset password with token
  async resetPassword(
    _token: string,
    _newPassword: string,
  ): Promise<{ message: string }> {
    throw new Error(
      `${UNSUPPORTED_ENDPOINT_ERROR} Missing route: POST ${API_ENDPOINTS.AUTH.RESET_PASSWORD}`,
    );
  }

  // verify email with token
  async verifyEmail(_token: string): Promise<{ message: string }> {
    throw new Error(
      `${UNSUPPORTED_ENDPOINT_ERROR} Missing route: POST ${API_ENDPOINTS.AUTH.VERIFY_EMAIL}`,
    );
  }

  // resend verification email
  async resendVerificationEmail(_email: string): Promise<{ message: string }> {
    throw new Error(
      `${UNSUPPORTED_ENDPOINT_ERROR} Missing route: POST ${API_ENDPOINTS.AUTH.VERIFY_EMAIL}/resend`,
    );
  }
}

export const authRepository = new AuthRepository();
