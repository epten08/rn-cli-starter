import { notificationService } from '@services/notification.service';
import {
  addNotification,
  clearAllNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  setNotificationPermissionStatus,
  setNotificationsEnabled,
} from '@store/slices/app.slice';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppState } from 'react-native';

import type {
  AppNotification,
  NotificationPermissionStatus,
  NotificationType,
} from '../types/notification.types';

import { useAppDispatch, useAppSelector } from './useRedux';

interface CreateNotificationParams {
  title: string;
  body: string;
  type?: NotificationType;
}

interface ToggleNotificationsResult {
  enabled: boolean;
  permissionStatus: NotificationPermissionStatus;
}

const createNotificationId = () =>
  `notification-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { enabled, badge, items, permissionStatus } = useAppSelector(
    state => state.app.notifications,
  );

  const notifications = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [items],
  );

  const refreshPermissionStatus = useCallback(async () => {
    try {
      const status = await notificationService.getPermissionStatus();
      dispatch(setNotificationPermissionStatus(status));

      if (status !== 'granted' && enabled) {
        dispatch(setNotificationsEnabled(false));
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, enabled]);

  const requestPermission = useCallback(async () => {
    const status = await notificationService.requestPermission();
    dispatch(setNotificationPermissionStatus(status));
    dispatch(setNotificationsEnabled(status === 'granted'));
    return status;
  }, [dispatch]);

  const toggleNotifications = useCallback(
    async (nextEnabled: boolean): Promise<ToggleNotificationsResult> => {
      if (!nextEnabled) {
        dispatch(setNotificationsEnabled(false));
        return { enabled: false, permissionStatus };
      }

      if (permissionStatus === 'granted') {
        dispatch(setNotificationsEnabled(true));
        return { enabled: true, permissionStatus: 'granted' };
      }

      const updatedStatus = await requestPermission();
      return {
        enabled: updatedStatus === 'granted',
        permissionStatus: updatedStatus,
      };
    },
    [dispatch, permissionStatus, requestPermission],
  );

  const createNotification = useCallback(
    ({ title, body, type = 'system' }: CreateNotificationParams) => {
      const notification: AppNotification = {
        id: createNotificationId(),
        title,
        body,
        type,
        read: false,
        createdAt: new Date().toISOString(),
      };

      dispatch(addNotification(notification));
      return notification;
    },
    [dispatch],
  );

  const addDemoNotification = useCallback(() => {
    return createNotification({
      title: 'Test notification',
      body: 'Your notifications are working correctly.',
      type: 'system',
    });
  }, [createNotification]);

  const markAsRead = useCallback(
    (notificationId: string) => {
      dispatch(markNotificationAsRead(notificationId));
    },
    [dispatch],
  );

  const markAllAsRead = useCallback(() => {
    dispatch(markAllNotificationsAsRead());
  }, [dispatch]);

  const clearAll = useCallback(() => {
    dispatch(clearAllNotifications());
  }, [dispatch]);

  const openNotificationSettings = useCallback(async () => {
    return notificationService.openSettings();
  }, []);

  useEffect(() => {
    refreshPermissionStatus();

    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        refreshPermissionStatus();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [refreshPermissionStatus]);

  return {
    isLoading,
    notifications,
    unreadCount: badge,
    notificationsEnabled: enabled,
    permissionStatus,
    refreshPermissionStatus,
    requestPermission,
    toggleNotifications,
    createNotification,
    addDemoNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    openNotificationSettings,
  };
};
