import Config from 'react-native-config';

interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    analytics: boolean;
    crashReporting: boolean;
    logs: boolean;
  };
  app: {
    name: string;
    version: string;
  };
}

export const config: AppConfig = {
  api: {
    baseUrl: Config.API_BASE_URL,
    timeout: Number(Config.API_TIMEOUT) || 30000,
  },
  features: {
    analytics: Config.ENABLE_ANALYTICS === 'true',
    crashReporting: Config.ENABLE_CRASH_REPORTING === 'true',
    logs: Config.ENABLE_LOGS === 'true' || __DEV__,
  },
  app: {
    name: Config.APP_NAME || 'MyApp',
    version: Config.APP_VERSION || '1.0.0',
  },
};

export default config;
