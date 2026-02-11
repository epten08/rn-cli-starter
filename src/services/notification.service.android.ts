import {
  Linking,
  PermissionsAndroid,
  Platform,
  type Permission,
} from 'react-native';

import type { NotificationPermissionStatus } from '../types/notification.types';

const ANDROID_NOTIFICATION_PERMISSION = 'android.permission.POST_NOTIFICATIONS';

class NotificationService {
  private getAndroidVersion(): number {
    if (typeof Platform.Version === 'number') {
      return Platform.Version;
    }

    const parsedVersion = Number(Platform.Version);
    return Number.isNaN(parsedVersion) ? 0 : parsedVersion;
  }

  private getAndroidNotificationPermission(): Permission {
    return (PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS ||
      ANDROID_NOTIFICATION_PERMISSION) as Permission;
  }

  async getPermissionStatus(): Promise<NotificationPermissionStatus> {
    if (this.getAndroidVersion() < 33) {
      return 'granted';
    }

    try {
      const granted = await PermissionsAndroid.check(
        this.getAndroidNotificationPermission(),
      );
      return granted ? 'granted' : 'denied';
    } catch {
      return 'unavailable';
    }
  }

  async requestPermission(): Promise<NotificationPermissionStatus> {
    if (this.getAndroidVersion() < 33) {
      return 'granted';
    }

    try {
      const result = await PermissionsAndroid.request(
        this.getAndroidNotificationPermission(),
      );

      return result === PermissionsAndroid.RESULTS.GRANTED
        ? 'granted'
        : 'denied';
    } catch {
      return 'unavailable';
    }
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
