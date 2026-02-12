import { API_ENDPOINTS } from '@api/api.config';
import { apiClient } from '@api/apiClient';
import type { UpdateProfileDTO, UserDTO } from '@dto/user.dto';

export class UserRepository {
  // get current user profile

  async getProfile(): Promise<UserDTO> {
    const response = await apiClient.get<UserDTO>(API_ENDPOINTS.USER.PROFILE);
    return response.data;
  }

  // update user profile
  async updateProfile(data: UpdateProfileDTO): Promise<UserDTO> {
    const response = await apiClient.put<UserDTO>(
      API_ENDPOINTS.USER.UPDATE_PROFILE,
      data,
    );
    return response.data;
  }

  // change user password
  async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      API_ENDPOINTS.USER.CHANGE_PASSWORD,
      {
        current_password: currentPassword,
        new_password: newPassword,
      },
    );
    return response.data;
  }

  // delete user account
  async deleteAccount(password: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(
      API_ENDPOINTS.USER.DELETE_ACCOUNT,
      {
        data: { password },
      },
    );
    return response.data;
  }

  // upload user avatar
  async uploadAvatar(_imageUri: string): Promise<{ avatar_url: string }> {
    throw new Error(
      `This API endpoint is not available on the current Express server. Missing route: POST ${API_ENDPOINTS.USER.PROFILE}/avatar`,
    );
  }
}

export const userRepository = new UserRepository();
