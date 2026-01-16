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
};
