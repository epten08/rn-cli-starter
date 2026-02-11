import { Button } from '@components/ui/Button';
import { Screen } from '@components/ui/Screen';
import { useNotifications } from '@hooks/useNotifications';
import { useTranslation } from '@hooks/useTranslation';
import React, { useMemo } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type { AppNotification } from '../../types/notification.types';

type NotificationSection = {
  key: 'today' | 'yesterday' | 'earlier';
  title: string;
  items: AppNotification[];
};

const isSameDay = (left: Date, right: Date) =>
  left.getDate() === right.getDate() &&
  left.getMonth() === right.getMonth() &&
  left.getFullYear() === right.getFullYear();

const getNotificationIconName = (type: AppNotification['type']) => {
  switch (type) {
    case 'message':
      return 'chatbubble-ellipses-outline';
    case 'reminder':
      return 'time-outline';
    case 'security':
      return 'shield-checkmark-outline';
    case 'system':
    default:
      return 'notifications-outline';
  }
};

const formatTime = (dateValue: string) => {
  return new Date(dateValue).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const NotificationsScreen = () => {
  const { t } = useTranslation();
  const {
    notifications,
    unreadCount,
    notificationsEnabled,
    permissionStatus,
    addDemoNotification,
    clearAll,
    markAsRead,
    markAllAsRead,
    openNotificationSettings,
    toggleNotifications,
  } = useNotifications();

  const sections = useMemo<NotificationSection[]>(() => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const grouped = notifications.reduce(
      (accumulator, notification) => {
        const notificationDate = new Date(notification.createdAt);
        if (isSameDay(notificationDate, now)) {
          accumulator.today.push(notification);
        } else if (isSameDay(notificationDate, yesterday)) {
          accumulator.yesterday.push(notification);
        } else {
          accumulator.earlier.push(notification);
        }
        return accumulator;
      },
      {
        today: [] as AppNotification[],
        yesterday: [] as AppNotification[],
        earlier: [] as AppNotification[],
      },
    );

    return [
      {
        key: 'today',
        title: t('notifications.today'),
        items: grouped.today,
      },
      {
        key: 'yesterday',
        title: t('notifications.yesterday'),
        items: grouped.yesterday,
      },
      {
        key: 'earlier',
        title: t('notifications.earlier'),
        items: grouped.earlier,
      },
    ];
  }, [notifications, t]);

  const permissionLabel = useMemo(() => {
    switch (permissionStatus) {
      case 'granted':
        return t('notifications.permissionGranted');
      case 'denied':
        return t('notifications.permissionDenied');
      case 'unavailable':
        return t('notifications.permissionUnavailable');
      case 'unknown':
      default:
        return t('notifications.permissionUnknown');
    }
  }, [permissionStatus, t]);

  const handleToggleNotifications = async (value: boolean) => {
    const result = await toggleNotifications(value);

    if (!result.enabled && value) {
      Alert.alert(
        t('notifications.permissionTitle'),
        t('notifications.permissionDeniedDescription'),
        [
          {
            text: t('common.cancel'),
            style: 'cancel',
          },
          {
            text: t('notifications.openSettings'),
            onPress: () => {
              openNotificationSettings();
            },
          },
        ],
      );
    }
  };

  const handleClearAll = () => {
    Alert.alert(
      t('notifications.clearAll'),
      t('notifications.clearAllDescription'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: clearAll,
        },
      ],
    );
  };

  const renderNotificationItem = (notification: AppNotification) => {
    const iconName = getNotificationIconName(notification.type);

    return (
      <TouchableOpacity
        key={notification.id}
        style={[
          styles.notificationItem,
          !notification.read && styles.notificationItemUnread,
        ]}
        activeOpacity={0.8}
        onPress={() => markAsRead(notification.id)}
      >
        <View style={styles.notificationIconContainer}>
          <Icon name={iconName} size={20} color="#0ea5e9" />
        </View>

        <View style={styles.notificationTextContainer}>
          <View style={styles.notificationTitleRow}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            {!notification.read ? <View style={styles.unreadDot} /> : null}
          </View>
          <Text style={styles.notificationBody}>{notification.body}</Text>
          <Text style={styles.notificationTime}>
            {formatTime(notification.createdAt)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen safeArea={false} statusBarStyle="light-content">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.headerBackground}>
          <View style={styles.blob1} />
          <View style={styles.blob2} />
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.title}>{t('notifications.title')}</Text>
          <Text style={styles.subtitle}>{t('notifications.subtitle')}</Text>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.preferencesCard}>
            <View style={styles.preferenceHeader}>
              <View style={styles.preferenceLabelContainer}>
                <Text style={styles.preferenceTitle}>
                  {t('settings.enableNotifications')}
                </Text>
                <Text style={styles.preferenceMeta}>
                  {`${t('notifications.status')}: ${permissionLabel}`}
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleToggleNotifications}
                trackColor={{ false: '#d1d5db', true: '#7dd3fc' }}
                thumbColor={notificationsEnabled ? '#0ea5e9' : '#f9fafb'}
              />
            </View>

            {!notificationsEnabled && permissionStatus !== 'granted' ? (
              <Button
                title={t('notifications.openSettings')}
                variant="outline"
                size="sm"
                onPress={openNotificationSettings}
                style={styles.settingsButton}
              />
            ) : null}
          </View>

          <View style={styles.actionsRow}>
            <Button
              title={t('notifications.demoNotification')}
              variant="ghost"
              size="sm"
              onPress={addDemoNotification}
              leftIcon={
                <Icon name="add-circle-outline" size={18} color="#0ea5e9" />
              }
            />
            {unreadCount > 0 ? (
              <Button
                title={t('notifications.markAllRead')}
                variant="ghost"
                size="sm"
                onPress={markAllAsRead}
                leftIcon={
                  <Icon
                    name="checkmark-done-outline"
                    size={18}
                    color="#0ea5e9"
                  />
                }
              />
            ) : null}
            {notifications.length > 0 ? (
              <Button
                title={t('notifications.clearAll')}
                variant="ghost"
                size="sm"
                onPress={handleClearAll}
                textStyle={styles.clearAllButtonText}
                leftIcon={
                  <Icon name="trash-outline" size={18} color="#ef4444" />
                }
              />
            ) : null}
          </View>

          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon
                name="notifications-off-outline"
                size={48}
                color="#9ca3af"
              />
              <Text style={styles.emptyStateTitle}>
                {t('notifications.emptyStateTitle')}
              </Text>
              <Text style={styles.emptyStateDescription}>
                {t('notifications.emptyStateDescription')}
              </Text>
            </View>
          ) : (
            sections.map(section =>
              section.items.length > 0 ? (
                <View key={section.key} style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.items.map(renderNotificationItem)}
                </View>
              ) : null,
            )
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  actionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  blob1: {
    backgroundColor: '#38bdf8',
    borderRadius: 95,
    height: 190,
    opacity: 0.45,
    position: 'absolute',
    right: -70,
    top: -50,
    width: 190,
  },
  blob2: {
    backgroundColor: '#0284c7',
    borderRadius: 75,
    bottom: -45,
    height: 150,
    left: -25,
    opacity: 0.35,
    position: 'absolute',
    width: 150,
  },
  clearAllButtonText: {
    color: '#ef4444',
  },
  container: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
  content: {
    paddingBottom: 36,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
  },
  emptyStateDescription: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyStateTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 12,
  },
  headerBackground: {
    backgroundColor: '#0ea5e9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 170,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  headerContent: {
    marginBottom: 20,
    paddingHorizontal: 24,
    paddingTop: 60,
    zIndex: 1,
  },
  mainContent: {
    paddingHorizontal: 24,
    zIndex: 1,
  },
  notificationBody: {
    color: '#4b5563',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationIconContainer: {
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginRight: 12,
    width: 40,
  },
  notificationItem: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 14,
  },
  notificationItemUnread: {
    borderColor: '#bae6fd',
    borderWidth: 1,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTime: {
    color: '#9ca3af',
    fontSize: 12,
  },
  notificationTitle: {
    color: '#111827',
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    marginRight: 8,
  },
  notificationTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 4,
  },
  preferenceHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  preferenceLabelContainer: {
    flex: 1,
    marginRight: 8,
  },
  preferenceMeta: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 2,
  },
  preferenceTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
  preferencesCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  settingsButton: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  subtitle: {
    color: '#e0f2fe',
    fontSize: 14,
    marginTop: 6,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
  },
  unreadDot: {
    backgroundColor: '#0ea5e9',
    borderRadius: 4,
    height: 8,
    width: 8,
  },
});

export default NotificationsScreen;
