const messagingInstance = {
  hasPermission: jest.fn(() => Promise.resolve(1)),
  requestPermission: jest.fn(() => Promise.resolve(1)),
  getToken: jest.fn(() => Promise.resolve('test-fcm-token')),
  deleteToken: jest.fn(() => Promise.resolve()),
  onMessage: jest.fn(() => jest.fn()),
  onNotificationOpenedApp: jest.fn(() => jest.fn()),
  getInitialNotification: jest.fn(() => Promise.resolve(null)),
  registerDeviceForRemoteMessages: jest.fn(() => Promise.resolve()),
  unregisterDeviceForRemoteMessages: jest.fn(() => Promise.resolve()),
  isDeviceRegisteredForRemoteMessages: true,
  setBackgroundMessageHandler: jest.fn(),
};

const messaging = jest.fn(() => messagingInstance);

const AuthorizationStatus = {
  NOT_DETERMINED: -1,
  DENIED: 0,
  AUTHORIZED: 1,
  PROVISIONAL: 2,
  EPHEMERAL: 3,
};

messaging.__instance = messagingInstance;
messaging.AuthorizationStatus = AuthorizationStatus;

module.exports = messaging;
module.exports.default = messaging;
module.exports.AuthorizationStatus = AuthorizationStatus;
