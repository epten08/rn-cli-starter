import { config } from '@config/app.config';
import * as Sentry from '@sentry/react-native';
import { Logger } from '@utils/logger';

type SentryErrorContext = {
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
};

let isInitialized = false;

export const initializeSentry = () => {
  if (isInitialized) {
    return;
  }

  if (!config.features.crashReporting) {
    Logger.info('Sentry disabled: crash reporting feature flag is off');
    return;
  }

  if (!config.sentry.dsn) {
    Logger.warn('Sentry disabled: SENTRY_DSN is missing');
    return;
  }

  Sentry.init({
    dsn: config.sentry.dsn,
    environment: config.sentry.environment,
    tracesSampleRate: config.sentry.tracesSampleRate,
    debug: __DEV__,
  });

  isInitialized = true;
  Logger.info('Sentry initialized');
};

export const captureError = (
  error: unknown,
  context?: SentryErrorContext,
): void => {
  if (!isInitialized) {
    return;
  }

  Sentry.withScope(scope => {
    if (context?.tags) {
      Object.entries(context.tags).forEach(([key, value]) => {
        scope.setTag(key, value);
      });
    }

    if (context?.extra) {
      Object.entries(context.extra).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
    }

    Sentry.captureException(error);
  });
};

export const setSentryUser = (
  user: { id: string; email?: string } | null,
): void => {
  if (!isInitialized) {
    return;
  }

  if (!user) {
    Sentry.setUser(null);
    return;
  }

  Sentry.setUser({
    id: user.id,
    email: user.email,
  });
};
