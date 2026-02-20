module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: [],
  testPathIgnorePatterns: [
    '/node_modules/',
    'babel.config.test.js',
    'babel.config.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-redux)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      { configFile: './babel.config.test.js' },
    ],
  },
  moduleNameMapper: {
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
    '^react-native-gesture-handler$':
      '<rootDir>/__mocks__/react-native-gesture-handler.js',
    '^react-native-safe-area-context$':
      '<rootDir>/__mocks__/react-native-safe-area-context.js',
    '^react-native-config$': '<rootDir>/__mocks__/react-native-config.js',
    '^@sentry/react-native$': '<rootDir>/__mocks__/sentry-react-native.js',
    '^@react-native-firebase/app$':
      '<rootDir>/__mocks__/react-native-firebase-app.js',
    '^@react-native-firebase/messaging$':
      '<rootDir>/__mocks__/react-native-firebase-messaging.js',
    '^react-native-vector-icons/(.*)$':
      '<rootDir>/__mocks__/react-native-vector-icons.js',
    '^react-native-encrypted-storage$':
      '<rootDir>/__mocks__/react-native-encrypted-storage.js',
    '^@react-native-async-storage/async-storage$':
      '<rootDir>/__mocks__/async-storage.js',
    '^@react-navigation/stack$':
      '<rootDir>/__mocks__/@react-navigation/stack.js',
    '^@react-navigation/bottom-tabs$':
      '<rootDir>/__mocks__/@react-navigation/bottom-tabs.js',
    '^@react-navigation/native$':
      '<rootDir>/__mocks__/@react-navigation/native.js',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@adapters/(.*)$': '<rootDir>/src/adapters/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@dto/(.*)$': '<rootDir>/src/dto/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@i18n/(.*)$': '<rootDir>/src/i18n/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@repositories/(.*)$': '<rootDir>/src/repositories/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@validations/(.*)$': '<rootDir>/src/validations/$1',
  },
};
