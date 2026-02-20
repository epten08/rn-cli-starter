/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import { store } from './src/store';
import { addNotification } from './src/store/slices/app.slice';

const mapRemoteMessageToNotification = remoteMessage => {
  const sentTime = remoteMessage?.sentTime || Date.now();
  const remoteType = remoteMessage?.data?.type;
  const type =
    remoteType === 'message' ||
    remoteType === 'reminder' ||
    remoteType === 'security' ||
    remoteType === 'system'
      ? remoteType
      : 'system';

  return {
    id:
      remoteMessage?.messageId ||
      `bg-remote-${sentTime}-${Math.random().toString(36).slice(2, 8)}`,
    title:
      remoteMessage?.notification?.title ||
      remoteMessage?.data?.title ||
      'Notification',
    body: remoteMessage?.notification?.body || remoteMessage?.data?.body || '',
    type,
    read: false,
    createdAt: new Date(sentTime).toISOString(),
  };
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const state = store.getState();
  const notificationsState = state?.app?.notifications;
  const nextNotification = mapRemoteMessageToNotification(remoteMessage);

  if (!notificationsState?.enabled) {
    return;
  }

  const alreadyExists = notificationsState.items.some(
    notification => notification.id === nextNotification.id,
  );

  if (alreadyExists) {
    return;
  }

  store.dispatch(addNotification(nextNotification));
});

AppRegistry.registerComponent(appName, () => App);
