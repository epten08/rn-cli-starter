// Define global variables for React Native
global.__DEV__ = true;

jest.mock('@react-native-community/netinfo', () => {
  const netInfoState = {
    type: 'wifi',
    isConnected: true,
    isInternetReachable: true,
    details: null,
  };

  return {
    __esModule: true,
    default: {
      addEventListener: jest.fn(callback => {
        callback(netInfoState);
        return jest.fn();
      }),
      fetch: jest.fn(() => Promise.resolve(netInfoState)),
    },
  };
});
