import type { LoginResponseDTO, UserDTO } from '@dto/user.dto';

/**
 * Adapter Pattern: Transforms API response to internal DTO
 */
export class UserAdapter {
  /**
   * Transform API user response to UserDTO
   */
  static toUserDTO(apiUser: any): UserDTO {
    return {
      id: apiUser.id || apiUser._id,
      email: apiUser.email,
      firstName: apiUser.first_name || apiUser.firstName,
      lastName: apiUser.last_name || apiUser.lastName,
      fullName: `${apiUser.first_name || apiUser.firstName} ${apiUser.last_name || apiUser.lastName}`,
      avatar: apiUser.avatar || apiUser.profile_image,
      phone: apiUser.phone || apiUser.phone_number,
      dateOfBirth: apiUser.date_of_birth || apiUser.dateOfBirth,
      gender: apiUser.gender,
      address: apiUser.address
        ? {
            street: apiUser.address.street,
            city: apiUser.address.city,
            state: apiUser.address.state,
            country: apiUser.address.country,
            postalCode:
              apiUser.address.postal_code || apiUser.address.postalCode,
          }
        : undefined,
      preferences: {
        language: apiUser.preferences?.language || 'en',
        theme: apiUser.preferences?.theme || 'system',
        notifications: apiUser.preferences?.notifications ?? true,
      },
      deviceId: apiUser.device_id || apiUser.deviceId,
      emailVerified: apiUser.email_verified || apiUser.emailVerified || false,
      phoneVerified: apiUser.phone_verified || apiUser.phoneVerified || false,
      createdAt: apiUser.created_at || apiUser.createdAt,
      updatedAt: apiUser.updated_at || apiUser.updatedAt,
    };
  }

  /**
   * Transform API login response to LoginResponseDTO
   */
  static toLoginResponseDTO(apiResponse: any): LoginResponseDTO {
    return {
      user: this.toUserDTO(apiResponse.user),
      tokens: {
        accessToken: apiResponse.access_token || apiResponse.accessToken,
        refreshToken: apiResponse.refresh_token || apiResponse.refreshToken,
        expiresIn: apiResponse.expires_in || apiResponse.expiresIn || 3600,
        tokenType: apiResponse.token_type || apiResponse.tokenType || 'Bearer',
      },
    };
  }

  /**
   * Transform UserDTO to API update format
   */
  static toApiUpdateFormat(userDTO: Partial<UserDTO>): any {
    return {
      first_name: userDTO.firstName,
      last_name: userDTO.lastName,
      phone: userDTO.phone,
      date_of_birth: userDTO.dateOfBirth,
      gender: userDTO.gender,
      device_id: userDTO.deviceId,
      address: userDTO.address
        ? {
            street: userDTO.address.street,
            city: userDTO.address.city,
            state: userDTO.address.state,
            country: userDTO.address.country,
            postal_code: userDTO.address.postalCode,
          }
        : undefined,
    };
  }

  /**
   * Transform array of API users to UserDTO array
   */
  static toUserDTOList(apiUsers: any[]): UserDTO[] {
    return apiUsers.map(user => this.toUserDTO(user));
  }
}
