export type NotificationPermissionStatus =
  | 'unknown'
  | 'granted'
  | 'denied'
  | 'unavailable';

export type NotificationType = 'system' | 'message' | 'reminder' | 'security';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  type: NotificationType;
}
