import Config from 'react-native-config';

const DEFAULT_API_BASE_URL = 'http://localhost:3000/api/v1';

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
  sentry: {
    dsn: string;
    environment: string;
    tracesSampleRate: number;
  };
}

const rawSentrySampleRate = Number(Config.SENTRY_TRACES_SAMPLE_RATE);
const sentrySampleRate = Number.isFinite(rawSentrySampleRate)
  ? rawSentrySampleRate
  : 0.2;

export const config: AppConfig = {
  api: {
    baseUrl: Config.API_BASE_URL || DEFAULT_API_BASE_URL,
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
  sentry: {
    dsn: Config.SENTRY_DSN || '',
    environment:
      Config.SENTRY_ENVIRONMENT || (__DEV__ ? 'development' : 'production'),
    tracesSampleRate: sentrySampleRate,
  },
};

export default config;
