import { notificationService } from '@services/notification.service';
import {
  addNotification,
  setNotificationDeviceToken,
  setNotificationPermissionStatus,
  setNotificationsEnabled,
} from '@store/slices/app.slice';
import { Logger } from '@utils/logger';
import { useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';

import type {
  AppNotification,
  RemotePushMessage,
} from '../types/notification.types';

import { useAppDispatch, useAppSelector } from './useRedux';

const toAppNotification = (
  remoteMessage: RemotePushMessage,
): AppNotification => {
  return {
    id: remoteMessage.id,
    title: remoteMessage.title,
    body: remoteMessage.body,
    type: remoteMessage.type,
    read: false,
    createdAt: new Date(remoteMessage.sentTime).toISOString(),
  };
};

export const useRemoteNotifications = () => {
  const dispatch = useAppDispatch();
  const hasHandledInitialNotification = useRef(false);
  const { enabled, items } = useAppSelector(state => state.app.notifications);

  const registerDeviceToken = useCallback(async () => {
    try {
      const token = await notificationService.getDeviceToken();
      dispatch(setNotificationDeviceToken(token));
      return token;
    } catch (error) {
      Logger.warn('Failed to register notification token', error);
      dispatch(setNotificationDeviceToken(null));
      return null;
    }
  }, [dispatch]);

  const clearDeviceToken = useCallback(async () => {
    await notificationService.deleteDeviceToken();
    dispatch(setNotificationDeviceToken(null));
  }, [dispatch]);

  const refreshPermissionStatus = useCallback(async () => {
    const status = await notificationService.getPermissionStatus();
    dispatch(setNotificationPermissionStatus(status));

    if (status === 'granted') {
      await registerDeviceToken();
      return;
    }

    await clearDeviceToken();
    if (enabled) {
      dispatch(setNotificationsEnabled(false));
    }
  }, [clearDeviceToken, dispatch, enabled, registerDeviceToken]);

  const handleRemoteNotification = useCallback(
    (remoteMessage: RemotePushMessage) => {
      if (!enabled) {
        return;
      }

      const exists = items.some(item => item.id === remoteMessage.id);
      if (exists) {
        return;
      }

      dispatch(addNotification(toAppNotification(remoteMessage)));
    },
    [dispatch, enabled, items],
  );

  useEffect(() => {
    refreshPermissionStatus();

    const appStateSubscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        refreshPermissionStatus();
      }
    });

    return () => {
      appStateSubscription.remove();
    };
  }, [refreshPermissionStatus]);

  useEffect(() => {
    const unsubscribeForeground = notificationService.onMessage(
      handleRemoteNotification,
    );
    const unsubscribeOpened = notificationService.onNotificationOpenedApp(
      handleRemoteNotification,
    );

    if (!hasHandledInitialNotification.current) {
      hasHandledInitialNotification.current = true;
      notificationService
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            handleRemoteNotification(remoteMessage);
          }
        })
        .catch(error => {
          Logger.warn('Failed to process initial notification', error);
        });
    }

    return () => {
      unsubscribeForeground();
      unsubscribeOpened();
    };
  }, [handleRemoteNotification]);
};
