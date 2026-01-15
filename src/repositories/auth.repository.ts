import { API_ENDPOINTS } from '@api/api.config';
import { apiClient } from '@api/apiClient';
import type { LoginDTO, RegisterDTO, LoginResponseDTO } from '@dto/user.dto';

export class AuthRepository {
  // user login
  async login(credentials: LoginDTO): Promise<LoginResponseDTO> {
    const response = await apiClient.post<LoginResponseDTO>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    );
    return response.data;
  }

  // user registration
  async register(data: RegisterDTO): Promise<LoginResponseDTO> {
    const response = await apiClient.post<LoginResponseDTO>(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
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
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email },
    );
    return response.data;
  }

  // reset password with token
  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      { token, password: newPassword },
    );
    return response.data;
  }

  // verify email with token
  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      { token },
    );
    return response.data;
  }

  // resend verification email
  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      `${API_ENDPOINTS.AUTH.VERIFY_EMAIL}/resend`,
      { email },
    );
    return response.data;
  }
}

export const authRepository = new AuthRepository();
