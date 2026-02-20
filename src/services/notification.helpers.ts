import messaging, {
  AuthorizationStatus,
  type FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

import type {
  NotificationPermissionStatus,
  NotificationType,
  RemotePushMessage,
} from '../types/notification.types';

const isNotificationType = (value: string): value is NotificationType => {
  return ['system', 'message', 'reminder', 'security'].includes(value);
};

const normalizeRemoteData = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): Record<string, string> => {
  const rawData = remoteMessage.data || {};

  return Object.entries(rawData).reduce<Record<string, string>>(
    (accumulator, [key, value]) => {
      accumulator[key] =
        typeof value === 'string' ? value : JSON.stringify(value);
      return accumulator;
    },
    {},
  );
};

const getNotificationType = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): NotificationType => {
  const remoteType = normalizeRemoteData(remoteMessage).type;
  if (remoteType && isNotificationType(remoteType)) {
    return remoteType;
  }

  return 'system';
};

export const mapAuthorizationStatusToPermissionStatus = (
  status: number,
): NotificationPermissionStatus => {
  if (
    status === AuthorizationStatus.AUTHORIZED ||
    status === AuthorizationStatus.PROVISIONAL ||
    status === AuthorizationStatus.EPHEMERAL
  ) {
    return 'granted';
  }

  if (status === AuthorizationStatus.DENIED) {
    return 'denied';
  }

  if (status === AuthorizationStatus.NOT_DETERMINED) {
    return 'unknown';
  }

  return 'unavailable';
};

export const toRemotePushMessage = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): RemotePushMessage => {
  const sentTime = remoteMessage.sentTime ?? Date.now();
  const data = normalizeRemoteData(remoteMessage);

  return {
    id:
      remoteMessage.messageId ??
      `remote-${sentTime}-${Math.random().toString(36).slice(2, 8)}`,
    title: remoteMessage.notification?.title ?? data.title ?? 'Notification',
    body: remoteMessage.notification?.body ?? data.body ?? '',
    type: getNotificationType(remoteMessage),
    sentTime,
    data,
  };
};

export const registerDeviceForRemoteMessagesIfNeeded = async () => {
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }
};
