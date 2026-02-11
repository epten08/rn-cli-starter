import { Linking } from 'react-native';

import type { NotificationPermissionStatus } from '../types/notification.types';

class NotificationService {
  async getPermissionStatus(): Promise<NotificationPermissionStatus> {
    return 'unavailable';
  }

  async requestPermission(): Promise<NotificationPermissionStatus> {
    return 'unavailable';
  }

  async openSettings(): Promise<boolean> {
    try {
      await Linking.openSettings();
      return true;
    } catch {
      return false;
    }
  }
}

export const notificationService = new NotificationService();
