module.exports = {
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  ScrollView: 'ScrollView',
  FlatList: 'FlatList',
  TextInput: 'TextInput',
  KeyboardAvoidingView: 'KeyboardAvoidingView',
  Alert: {
    alert: jest.fn(),
  },
  StyleSheet: {
    create: styles => styles,
  },
  ActivityIndicator: 'ActivityIndicator',
  Platform: {
    OS: 'ios',
    select: obj => obj.ios,
  },
  Dimensions: {
    get: () => ({ width: 375, height: 812 }),
  },
  Animated: {
    View: 'Animated.View',
    Value: jest.fn(() => ({
      interpolate: jest.fn(() => 0),
    })),
    event: jest.fn(() => jest.fn()),
  },
  Linking: {
    openSettings: jest.fn(() => Promise.resolve()),
  },
  PermissionsAndroid: {
    PERMISSIONS: {
      POST_NOTIFICATIONS: 'android.permission.POST_NOTIFICATIONS',
    },
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
    },
    check: jest.fn(() => Promise.resolve(true)),
    request: jest.fn(() => Promise.resolve('granted')),
  },
  AppState: {
    addEventListener: jest.fn(() => ({
      remove: jest.fn(),
    })),
  },
};
