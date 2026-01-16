module.exports = {
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  ScrollView: 'ScrollView',
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
};
