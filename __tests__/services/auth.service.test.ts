import { authRepository } from '@repositories/auth.repository';
import { AuthService } from '@services/auth.service';
import { storage } from '@utils/storage';

// Mock dependencies
jest.mock('@repositories/auth.repository');
jest.mock('@utils/storage');
jest.mock('@utils/logger', () => ({
  Logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

const mockAuthRepository = authRepository as jest.Mocked<typeof authRepository>;
const mockStorage = storage as jest.Mocked<typeof storage>;

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('login', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockApiResponse = {
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        emailVerified: true,
        phoneVerified: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      accessToken: 'access-token-123',
      refreshToken: 'refresh-token-456',
      expiresIn: 3600,
      tokenType: 'Bearer',
    };

    it('should login successfully and store tokens', async () => {
      mockAuthRepository.login.mockResolvedValue(mockApiResponse);
      mockStorage.setSecureItem.mockResolvedValue(undefined);
      mockStorage.setItem.mockResolvedValue(undefined);

      const result = await authService.login(mockCredentials);

      expect(mockAuthRepository.login).toHaveBeenCalledWith(mockCredentials);
      expect(mockStorage.setSecureItem).toHaveBeenCalledWith(
        'access_token',
        'access-token-123',
      );
      expect(mockStorage.setSecureItem).toHaveBeenCalledWith(
        'refresh_token',
        'refresh-token-456',
      );
      expect(result.email).toBe('test@example.com');
    });

    it('should throw error when login fails', async () => {
      const mockError = new Error('Invalid credentials');
      mockAuthRepository.login.mockRejectedValue(mockError);

      await expect(authService.login(mockCredentials)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('register', () => {
    const mockRegisterData = {
      email: 'newuser@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Smith',
    };

    const mockApiResponse = {
      user: {
        id: '2',
        email: 'newuser@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        fullName: 'Jane Smith',
        emailVerified: false,
        phoneVerified: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
      expiresIn: 3600,
      tokenType: 'Bearer',
    };

    it('should register successfully and store tokens', async () => {
      mockAuthRepository.register.mockResolvedValue(mockApiResponse);
      mockStorage.setSecureItem.mockResolvedValue(undefined);
      mockStorage.setItem.mockResolvedValue(undefined);

      const result = await authService.register(mockRegisterData);

      expect(mockAuthRepository.register).toHaveBeenCalledWith(
        mockRegisterData,
      );
      expect(mockStorage.setSecureItem).toHaveBeenCalledWith(
        'access_token',
        'new-access-token',
      );
      expect(result.email).toBe('newuser@example.com');
      expect(result.firstName).toBe('Jane');
    });

    it('should throw error when registration fails', async () => {
      const mockError = new Error('Email already exists');
      mockAuthRepository.register.mockRejectedValue(mockError);

      await expect(authService.register(mockRegisterData)).rejects.toThrow(
        'Email already exists',
      );
    });
  });

  describe('logout', () => {
    it('should logout and clear auth data', async () => {
      mockAuthRepository.logout.mockResolvedValue(undefined);
      mockStorage.removeSecureItem.mockResolvedValue(undefined);
      mockStorage.removeItem.mockResolvedValue(undefined);

      await authService.logout();

      expect(mockAuthRepository.logout).toHaveBeenCalled();
      expect(mockStorage.removeSecureItem).toHaveBeenCalledWith('access_token');
      expect(mockStorage.removeSecureItem).toHaveBeenCalledWith(
        'refresh_token',
      );
      expect(mockStorage.removeItem).toHaveBeenCalledWith('user');
    });

    it('should throw error when logout fails', async () => {
      const mockError = new Error('Logout failed');
      mockAuthRepository.logout.mockRejectedValue(mockError);

      await expect(authService.logout()).rejects.toThrow('Logout failed');
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when access token exists', async () => {
      mockStorage.getSecureItem.mockResolvedValue('valid-token');

      const result = await authService.isAuthenticated();

      expect(result).toBe(true);
      expect(mockStorage.getSecureItem).toHaveBeenCalledWith('access_token');
    });

    it('should return false when no access token', async () => {
      mockStorage.getSecureItem.mockResolvedValue(null);

      const result = await authService.isAuthenticated();

      expect(result).toBe(false);
    });

    it('should return false when error occurs', async () => {
      mockStorage.getSecureItem.mockRejectedValue(new Error('Storage error'));

      const result = await authService.isAuthenticated();

      expect(result).toBe(false);
    });
  });

  describe('getCurrentUser', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
    };

    it('should return user when stored', async () => {
      mockStorage.getItem.mockResolvedValue(JSON.stringify(mockUser));

      const result = await authService.getCurrentUser();

      expect(result).toEqual(mockUser);
      expect(mockStorage.getItem).toHaveBeenCalledWith('user');
    });

    it('should return null when no user stored', async () => {
      mockStorage.getItem.mockResolvedValue(null);

      const result = await authService.getCurrentUser();

      expect(result).toBeNull();
    });

    it('should return null when error occurs', async () => {
      mockStorage.getItem.mockRejectedValue(new Error('Storage error'));

      const result = await authService.getCurrentUser();

      expect(result).toBeNull();
    });
  });

  describe('forgotPassword', () => {
    it('should request password reset successfully', async () => {
      mockAuthRepository.forgotPassword.mockResolvedValue({
        message: 'Reset email sent',
      });

      const result = await authService.forgotPassword('test@example.com');

      expect(result).toBe('Reset email sent');
      expect(mockAuthRepository.forgotPassword).toHaveBeenCalledWith(
        'test@example.com',
      );
    });

    it('should throw error when request fails', async () => {
      mockAuthRepository.forgotPassword.mockRejectedValue(
        new Error('User not found'),
      );

      await expect(
        authService.forgotPassword('unknown@example.com'),
      ).rejects.toThrow('User not found');
    });
  });

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      mockAuthRepository.resetPassword.mockResolvedValue({
        message: 'Password reset successful',
      });

      const result = await authService.resetPassword(
        'reset-token',
        'newPassword123',
      );

      expect(result).toBe('Password reset successful');
      expect(mockAuthRepository.resetPassword).toHaveBeenCalledWith(
        'reset-token',
        'newPassword123',
      );
    });
  });

  describe('verifyEmail', () => {
    it('should verify email successfully', async () => {
      mockAuthRepository.verifyEmail.mockResolvedValue({
        message: 'Email verified',
      });

      const result = await authService.verifyEmail('verification-token');

      expect(result).toBe('Email verified');
      expect(mockAuthRepository.verifyEmail).toHaveBeenCalledWith(
        'verification-token',
      );
    });
  });
});
