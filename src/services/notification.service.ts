import messaging from '@react-native-firebase/messaging';
import { Linking } from 'react-native';

import type {
  NotificationPermissionStatus,
  RemotePushMessage,
} from '../types/notification.types';

import {
  mapAuthorizationStatusToPermissionStatus,
  registerDeviceForRemoteMessagesIfNeeded,
  toRemotePushMessage,
} from './notification.helpers';

class NotificationService {
  async getPermissionStatus(): Promise<NotificationPermissionStatus> {
    try {
      const status = await messaging().hasPermission();
      return mapAuthorizationStatusToPermissionStatus(status);
    } catch {
      return 'unavailable';
    }
  }

  async requestPermission(): Promise<NotificationPermissionStatus> {
    try {
      const status = await messaging().requestPermission();
      return mapAuthorizationStatusToPermissionStatus(status);
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
