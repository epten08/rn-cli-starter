import messaging, {
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import { notificationService } from '@services/notification.service';

const getMessagingInstance = () =>
  (
    messaging as unknown as {
      __instance: {
        hasPermission: jest.Mock;
        requestPermission: jest.Mock;
        getToken: jest.Mock;
        registerDeviceForRemoteMessages: jest.Mock;
        onMessage: jest.Mock;
        isDeviceRegisteredForRemoteMessages: boolean;
      };
    }
  ).__instance;

describe('notification service', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const messagingInstance = getMessagingInstance();
    messagingInstance.hasPermission.mockResolvedValue(
      AuthorizationStatus.AUTHORIZED,
    );
    messagingInstance.requestPermission.mockResolvedValue(
      AuthorizationStatus.AUTHORIZED,
    );
    messagingInstance.getToken.mockResolvedValue('test-fcm-token');
    messagingInstance.registerDeviceForRemoteMessages.mockResolvedValue(
      undefined,
    );
    messagingInstance.onMessage.mockImplementation(() => jest.fn());
    messagingInstance.isDeviceRegisteredForRemoteMessages = true;
  });

  it('maps granted permission correctly', async () => {
    const status = await notificationService.getPermissionStatus();

    expect(status).toBe('granted');
  });

  it('requests permission and maps denied status', async () => {
    const messagingInstance = getMessagingInstance();
    messagingInstance.requestPermission.mockResolvedValue(
      AuthorizationStatus.DENIED,
    );

    const status = await notificationService.requestPermission();

    expect(status).toBe('denied');
  });

  it('registers and returns an FCM token', async () => {
    const messagingInstance = getMessagingInstance();
    messagingInstance.isDeviceRegisteredForRemoteMessages = false;

    const token = await notificationService.getDeviceToken();

    expect(token).toBe('test-fcm-token');
    expect(
      messagingInstance.registerDeviceForRemoteMessages,
    ).toHaveBeenCalledTimes(1);
  });

  it('normalizes foreground remote messages', () => {
    const messagingInstance = getMessagingInstance();
    const listener = jest.fn();

    notificationService.onMessage(listener);
    const remoteListener = messagingInstance.onMessage.mock.calls[0][0];
    remoteListener({
      messageId: 'message-123',
      sentTime: 1739031700000,
      data: { type: 'message' },
      notification: {
        title: 'Hello',
        body: 'World',
      },
    });

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'message-123',
        title: 'Hello',
        body: 'World',
        type: 'message',
      }),
    );
  });
});
