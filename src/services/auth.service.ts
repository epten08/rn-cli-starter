import { UserAdapter } from '@adapters/user.adapter';
import type {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  UserDTO,
} from '@dto/user.dto';
import { authRepository } from '@repositories/auth.repository';
import { Logger } from '@utils/logger';
import { storage } from '@utils/storage';

export class AuthService {
  // login user and store tokens
  async login(credentials: LoginDTO): Promise<UserDTO> {
    try {
      Logger.info('AuthService: Logging in user');

      const apiResponse = await authRepository.login(credentials);
      const loginData = UserAdapter.toLoginResponseDTO(apiResponse);

      await this.storeTokens(loginData.tokens);

      await storage.setItem('user', JSON.stringify(loginData.user));

      Logger.info('AuthService: User logged in successfully');
      return loginData.user;
    } catch (error) {
      Logger.error('AuthService: Error logging in user', error);
      throw error;
    }
  }

  // register user
  async register(data: RegisterDTO): Promise<UserDTO> {
    try {
      Logger.info('AuthService: Registering user');

      const apiResponse = await authRepository.register(data);
      const registerData = UserAdapter.toLoginResponseDTO(apiResponse);

      await this.storeTokens(registerData.tokens);
      await storage.setItem('user', JSON.stringify(registerData.user));

      Logger.info('AuthService: User registered successfully');
      return registerData.user;
    } catch (error) {
      Logger.error('AuthService: Error registering user', error);
      throw error;
    }
  }

  // logout user and clear tokens
  async logout(): Promise<void> {
    try {
      Logger.info('AuthService: Logging out user');

      await authRepository.logout();
      await this.clearAuthData();

      Logger.info('AuthService: User logged out successfully');
    } catch (error) {
      Logger.error('AuthService: Error logging out user', error);
      throw error;
    }
  }

  // check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await storage.getSecureItem('access_token');
      return !!token;
    } catch (error) {
      Logger.error('AuthService: Error checking authentication status', error);
      return false;
    }
  }

  // get stored user data
  async getCurrentUser(): Promise<UserDTO | null> {
    try {
      const userJson = await storage.getItem('user');
      if (userJson) {
        return JSON.parse(userJson);
      }
      return null;
    } catch (error) {
      Logger.error('AuthService: Error retrieving current user', error);
      return null;
    }
  }

  // request password reset
  async forgotPassword(email: string): Promise<string> {
    try {
      Logger.info('AuthService: Requesting password reset');
      const response = await authRepository.forgotPassword(email);
      return response.message;
    } catch (error) {
      Logger.error('AuthService: Error requesting password reset', error);
      throw error;
    }
  }

  // reset password with token
  async resetPassword(token: string, newPassword: string): Promise<string> {
    try {
      Logger.info('AuthService: Resetting password');
      const response = await authRepository.resetPassword(token, newPassword);
      return response.message;
    } catch (error) {
      Logger.error('AuthService: Error resetting password', error);
      throw error;
    }
  }

  // verify email token
  async verifyEmail(token: string): Promise<string> {
    try {
      Logger.info('AuthService: Verifying email');
      const response = await authRepository.verifyEmail(token);
      return response.message;
    } catch (error) {
      Logger.error('AuthService: Error verifying email', error);
      throw error;
    }
  }

  // private helper: store auth tokens securely
  private async storeTokens(tokens: LoginResponseDTO['tokens']): Promise<void> {
    await storage.setSecureItem('access_token', tokens.accessToken);
    await storage.setSecureItem('refresh_token', tokens.refreshToken);
    await storage.setItem('token_expires_in', tokens.expiresIn.toString());
  }

  // private helper: clear all authentication data
  private async clearAuthData(): Promise<void> {
    await storage.removeSecureItem('access_token');
    await storage.removeSecureItem('refresh_token');
    await storage.removeItem('token_expires_in');
    await storage.removeItem('user');
  }
}

export const authService = new AuthService();
