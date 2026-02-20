import messaging from '@react-native-firebase/messaging';
import {
  Linking,
  PermissionsAndroid,
  Platform,
  type Permission,
} from 'react-native';

import type {
  NotificationPermissionStatus,
  RemotePushMessage,
} from '../types/notification.types';

import {
  registerDeviceForRemoteMessagesIfNeeded,
  toRemotePushMessage,
} from './notification.helpers';

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

  async getDeviceToken(): Promise<string | null> {
    try {
      await registerDeviceForRemoteMessagesIfNeeded();
      return await messaging().getToken();
    } catch {
      return null;
    }
  }

  async deleteDeviceToken(): Promise<void> {
    try {
      await messaging().deleteToken();
    } catch {
      // no-op
    }
  }

  onMessage(listener: (message: RemotePushMessage) => void): () => void {
    return messaging().onMessage(remoteMessage => {
      listener(toRemotePushMessage(remoteMessage));
    });
  }

  onNotificationOpenedApp(
    listener: (message: RemotePushMessage) => void,
  ): () => void {
    return messaging().onNotificationOpenedApp(remoteMessage => {
      listener(toRemotePushMessage(remoteMessage));
    });
  }

  async getInitialNotification(): Promise<RemotePushMessage | null> {
    try {
      const remoteMessage = await messaging().getInitialNotification();
      if (!remoteMessage) {
        return null;
      }

      return toRemotePushMessage(remoteMessage);
    } catch {
      return null;
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
